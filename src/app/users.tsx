import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth } from '@/firebaseAuth';
import { db } from '@/firebaseConfig';

export default function UsersScreen() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          setError('Please register to view your details.');
          return;
        }

        const userRef = doc(db, 'users', currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
        } else {
          setError('User details not found.');
        }
      } catch (err) {
        setError('Unable to load user details.');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>
          Your Carevia registration details
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#087F8C" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <View style={styles.card}>
            <Text style={styles.heading}>Personal Information</Text>

            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{userData.fullName}</Text>

            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.value}>{userData.email}</Text>

            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>{userData.phone}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FAFA',
  },
  content: {
    padding: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#12343B',
  },
  subtitle: {
    fontSize: 15,
    color: '#647B7E',
    marginTop: 8,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 16,
    elevation: 3,
  },
  heading: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#087F8C',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#647B7E',
    marginTop: 15,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#12343B',
    marginTop: 5,
  },
  error: {
    color: 'red',
    fontSize: 15,
  },
});