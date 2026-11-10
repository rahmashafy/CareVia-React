import { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { onAuthStateChanged, signOut } from 'firebase/auth';

import {
    collection,
    getDocs,
} from 'firebase/firestore';

import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebaseFunctions';


import { auth } from '../firebaseAuth';
import { db } from '../firebaseConfig';

// Admin UID
const ADMIN_UID = 'lz68LUbgHmT5P0dEbPs1DTuuZB32';

type UserData = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt?: any;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');

  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>(
    'newest'
  );

  const [adminEmail, setAdminEmail] = useState('');

  // Edit User States
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');

  // Fetch Users from Firebase
  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users'));

      const userList: UserData[] = snapshot.docs.map((document) => {
        const data = document.data();

        return {
          id: document.id,
          fullName: data.fullName || 'Unknown User',
          email: data.email || 'No email',
          phone: data.phone || 'No phone',
          createdAt: data.createdAt || data.timestamp,
        };
      });

      setUsers(userList);
    } catch (error) {
      console.log('Error fetching users:', error);

      Alert.alert(
        'Error',
        'Unable to load registered users. Please check your connection or permissions.'
      );
    }
  };

  // Admin Authentication
  useEffect(() => {
    let isActive = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || user.uid !== ADMIN_UID) {
        if (user) {
          await signOut(auth);
        }

        if (isActive) {
          router.replace('/admin-login');
        }

        return;
      }

      if (isActive) {
        setAdminEmail(user.email || '');
      }

      await fetchUsers();

      if (isActive) {
        setLoading(false);
      }
    });

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  // Edit User
  const handleEdit = (user: UserData) => {
    setEditingUser(user.id);
    setEditName(user.fullName);
    setEditEmail(user.email);
    setEditPhone(user.phone);
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditName('');
    setEditEmail('');
    setEditPhone('');
  };

  // Update User
const handleUpdate = async () => {
  if (!editingUser) return;

  if (!editName.trim() || !editEmail.trim() || !editPhone.trim()) {
    Alert.alert('Validation Error', 'Please fill in all fields.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(editEmail.trim())) {
    Alert.alert('Invalid Email', 'Please enter a valid email address.');
    return;
  }

  try {
    await httpsCallable(functions, 'updateUserAccount')({
      userId: editingUser,
      fullName: editName.trim(),
      email: editEmail.trim().toLowerCase(),
      phone: editPhone.trim(),
    });

    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === editingUser
          ? {
              ...user,
              fullName: editName.trim(),
              email: editEmail.trim().toLowerCase(),
              phone: editPhone.trim(),
            }
          : user
      )
    );

    handleCancelEdit();

    Alert.alert('Success', 'User details updated successfully.');
  } catch (error) {
    console.log('Update error:', error);
    Alert.alert('Error', 'Unable to update user details.');
  }
};

  // Delete User
  const handleDelete = (userId: string) => {
    const deleteUser = async () => {
      try {
        await httpsCallable(functions, 'deleteUserAccount')({
          userId: userId,
        });

        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );

        if (Platform.OS === 'web') {
          window.alert('User deleted successfully!');
        } else {
          Alert.alert('Success', 'User deleted successfully!');
        }
      } catch (error) {
        console.log('Delete Error:', error);
        Alert.alert('Error', 'Unable to delete user.');
      }
    };

    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'Are you sure you want to delete this user?'
      );

      if (confirmed) {
        deleteUser();
      }
    } else {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this user?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: deleteUser },
        ]
      );
    }
  };
  
  // Admin Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/admin-login');
    } catch (error) {
      Alert.alert('Error', 'Unable to logout.');
    }
  };

  // Convert Date into Milliseconds
  const getTime = (date: any) => {
    if (date?.toMillis) {
      return date.toMillis();
    }

    if (date) {
      const time = new Date(date).getTime();
      return Number.isNaN(time) ? 0 : time;
    }

    return 0;
  };

  // Search and Sort Users
  const filteredUsers = users
    .filter((user) => {
      const searchText = search.toLowerCase().trim();

      return (
        user.fullName.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText)
      );
    })
    .sort((a, b) => {
      return sortOrder === 'newest'
        ? getTime(b.createdAt) - getTime(a.createdAt)
        : getTime(a.createdAt) - getTime(b.createdAt);
    });

  // Current Date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Loading Screen
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#087F8C" />

        <Text style={styles.loadingText}>
          Loading Dashboard...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Welcome Section */}

        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>
            Welcome back, Admin! 👋
          </Text>

          <Text style={styles.welcomeSubtitle}>
            Here's what's happening with your Carevia platform today.
          </Text>

          <Text style={styles.dateText}>
            {currentDate}
          </Text>
        </View>

        {/* Total Users */}

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {users.length}
          </Text>

          <Text style={styles.statLabel}>
            Total Registered Users
          </Text>
        </View>

        {/* Admin Profile */}

        <Text style={styles.sectionTitle}>
          Admin Profile
        </Text>

        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>
              A
            </Text>
          </View>

          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>
              Administrator
            </Text>

            <Text style={styles.profileEmail}>
              {adminEmail}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* Registered Users */}

        <View style={styles.usersSection}>

          <Text style={styles.sectionTitle}>
            Registered Users
          </Text>

          {/* Edit User Form */}

          {editingUser && (
            <View style={styles.editCard}>

              <Text style={styles.editTitle}>
                Edit User Details
              </Text>

              <TextInput
                style={styles.editInput}
                placeholder="Full Name"
                value={editName}
                onChangeText={setEditName}
              />

              <TextInput
                style={styles.editInput}
                placeholder="Email"
                value={editEmail}
                onChangeText={setEditEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.editInput}
                placeholder="Phone"
                value={editPhone}
                onChangeText={setEditPhone}
                keyboardType="phone-pad"
              />

              <View style={styles.editActions}>

                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={handleUpdate}
                >
                  <Text style={styles.updateButtonText}>
                    Update
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.cancelButtonText}>
                    Cancel
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
          )}

          {/* Search and Sorting */}

          <View style={styles.searchRow}>

            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or email..."
              placeholderTextColor="#7A9295"
              value={search}
              onChangeText={setSearch}
            />

            <TouchableOpacity
              style={styles.sortButton}
              onPress={() =>
                setSortOrder(
                  sortOrder === 'newest' ? 'oldest' : 'newest'
                )
              }
            >
              <Text style={styles.sortText}>
                {sortOrder === 'newest' ? 'Newest ↓' : 'Oldest ↑'}
              </Text>
            </TouchableOpacity>

          </View>

          {/* User Count */}

          <Text style={styles.userCount}>
            Showing {filteredUsers.length} of {users.length} users
          </Text>

          {/* Users Table */}

          {filteredUsers.length === 0 ? (

            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                No users found.
              </Text>
            </View>

          ) : (

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              style={styles.tableScroll}
            >

              <View style={styles.tableContainer}>

                {/* Table Header */}

                <View style={styles.tableHeader}>

                  <Text style={[styles.tableHeaderText, styles.idColumn]}>
                    User ID
                  </Text>

                  <Text style={[styles.tableHeaderText, styles.nameColumn]}>
                    Full Name
                  </Text>

                  <Text style={[styles.tableHeaderText, styles.emailColumn]}>
                    Email
                  </Text>

                  <Text style={[styles.tableHeaderText, styles.phoneColumn]}>
                    Phone
                  </Text>

                  <Text style={[styles.tableHeaderText, styles.dateColumn]}>
                    Registered Date
                  </Text>

                  <Text style={[styles.tableHeaderText, styles.actionColumn]}>
                    Actions
                  </Text>

                </View>

                {/* Table Rows */}

                {filteredUsers.map((user, index) => (

                  <View
                    key={user.id}
                    style={[
                      styles.tableRow,
                      index % 2 === 0 && styles.alternateRow,
                    ]}
                  >

                    <Text style={[styles.tableCell, styles.idColumn]}>
                      {index + 1}
                    </Text>

                    <Text style={[styles.tableCell, styles.nameColumn]}>
                      {user.fullName}
                    </Text>

                    <Text style={[styles.tableCell, styles.emailColumn]}>
                      {user.email}
                    </Text>

                    <Text style={[styles.tableCell, styles.phoneColumn]}>
                      {user.phone}
                    </Text>

                    <Text style={[styles.tableCell, styles.dateColumn]}>
                      {user.createdAt
                        ? new Date(
                            getTime(user.createdAt)
                          ).toLocaleDateString()
                        : 'N/A'}
                    </Text>

                    {/* Edit and Delete Buttons */}

                    <View style={styles.actionColumn}>
                      <View style={styles.rowActions}>

                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => handleEdit(user)}
                        >
                          <Text style={styles.editButtonText}>
                            Edit
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => handleDelete(user.id)}
                        >
                          <Text style={styles.deleteButtonText}>
                            Delete
                          </Text>
                        </TouchableOpacity>

                      </View>
                    </View>

                  </View>

                ))}

              </View>

            </ScrollView>
          )}

        </View>

        {/* Footer */}

        <Text style={styles.footer}>
          Carevia Admin Dashboard © 2026
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

// Styles

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F2FAFA',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2FAFA',
  },

  loadingText: {
    marginTop: 12,
    color: '#12343B',
  },

  // Welcome Section

  welcomeCard: {
    backgroundColor: '#087F8C',
    padding: 24,
    borderRadius: 18,
    marginBottom: 20,
  },

  welcomeTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },

  welcomeSubtitle: {
    fontSize: 14,
    color: '#E5F8F8',
    lineHeight: 21,
  },

  dateText: {
    color: '#FFFFFF',
    marginTop: 18,
    fontSize: 13,
  },

  // Statistics

  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 15,
    marginBottom: 25,
    borderLeftWidth: 5,
    borderLeftColor: '#087F8C',
  },

  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#087F8C',
  },

  statLabel: {
    color: '#12343B',
    fontSize: 14,
    marginTop: 5,
  },

  // Section Title

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#12343B',
    marginBottom: 15,
    marginTop: 10,
  },

  // Admin Profile

  profileCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D9F1F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIconText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#087F8C',
  },

  profileDetails: {
    flex: 1,
    marginLeft: 12,
  },

  profileName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#12343B',
  },

  profileEmail: {
    fontSize: 11,
    color: '#647C80',
    marginTop: 4,
  },

  logoutButton: {
    backgroundColor: '#FCEAEA',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  logoutText: {
    color: '#C0392B',
    fontWeight: 'bold',
    fontSize: 12,
  },

  // Registered Users

  usersSection: {
    marginTop: 5,
  },

  // Edit Form

  editCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D6E5E5',
  },

  editTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#12343B',
    marginBottom: 15,
  },

  editInput: {
    backgroundColor: '#F2FAFA',
    borderWidth: 1,
    borderColor: '#D6E5E5',
    borderRadius: 9,
    padding: 13,
    fontSize: 14,
    color: '#12343B',
    marginBottom: 12,
  },

  editActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },

  updateButton: {
    flex: 1,
    backgroundColor: '#087F8C',
    padding: 13,
    borderRadius: 9,
    alignItems: 'center',
  },

  updateButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  cancelButton: {
    flex: 1,
    backgroundColor: '#E8EEEE',
    padding: 13,
    borderRadius: 9,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#12343B',
    fontWeight: 'bold',
  },

  // Search and Sorting

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6E5E5',
    borderRadius: 10,
    padding: 13,
    fontSize: 13,
    color: '#12343B',
  },

  sortButton: {
    backgroundColor: '#087F8C',
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  sortText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  userCount: {
    color: '#647C80',
    fontSize: 12,
    marginBottom: 12,
  },

  // Table Design

  tableScroll: {
    marginBottom: 15,
  },

  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D6E5E5',
    minWidth: 945,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#087F8C',
    paddingVertical: 16,
  },

  tableHeaderText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },

  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EEEE',
  },

  alternateRow: {
    backgroundColor: '#F2FAFA',
  },

  tableCell: {
    color: '#12343B',
    fontSize: 12,
    paddingHorizontal: 10,
  },

  idColumn: {
    width: 85,
  },

  nameColumn: {
    width: 170,
  },

  emailColumn: {
    width: 220,
  },

  phoneColumn: {
    width: 140,
  },

  dateColumn: {
    width: 150,
  },

  actionColumn: {
    width: 180,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },

  rowActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  editButton: {
    backgroundColor: '#087F8C',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 6,
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#FCEAEA',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  deleteButtonText: {
    color: '#C0392B',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Empty State

  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
  },

  emptyText: {
    color: '#647C80',
    fontSize: 14,
  },

  // Footer

  footer: {
    textAlign: 'center',
    color: '#84999B',
    fontSize: 12,
    marginTop: 30,
  },

});