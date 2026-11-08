
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import "./Users.css";

const ADMIN_UID = "lz68LUbgHmT5P0dEbPs1DTuuZB32";

function Users() {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingUser, setEditingUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    try {
      await deleteDoc(doc(db, "users", id));

      setUsers(users.filter((user) => user.id !== id));

      alert("User deleted successfully!");

    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user.");
    }
  }
};


const handleEdit = (user) => {
  setEditingUser(user);
  setFullName(user.fullName);
  setEmail(user.email);
  setPhone(user.phone);
}; 

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const userRef = doc(db, "users", editingUser.id);

    await updateDoc(userRef, {
      fullName: fullName,
      email: email,
      phone: phone
    });

    setUsers(users.map((user) =>
      user.id === editingUser.id
        ? { ...user, fullName, email, phone }
        : user
    ));

    setEditingUser(null);
    alert("User updated successfully!");

  } catch (error) {
    console.error("Error updating user:", error);
    alert("Error updating user.");
  }
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (user && user.uid === ADMIN_UID) {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));

          const usersList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));

          setUsers(usersList);

        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    return sortOrder === "asc"
      ? a.fullName.localeCompare(b.fullName)
      : b.fullName.localeCompare(a.fullName);
  });

  return (
    <div className="users-page">

      <div className="users-container">

        <h1 className="users-title">Registered Users</h1>

        <p className="users-subtitle">
          Manage and view all CareVia registered users.
        </p>

        <div className="users-controls">

          <input
            type="text"
            className="search-input"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Name: A to Z</option>
            <option value="desc">Name: Z to A</option>
          </select>

        </div>
{editingUser && (
  <div className="edit-modal-overlay">
    <div className="edit-form">

    <h3>Update User Details</h3>

    <form onSubmit={handleUpdate}>

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <button type="submit" className="btn btn-primary">
        Update User
      </button>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setEditingUser(null)}
      >
        Cancel
      </button>

    </form>

  </div>
  </div>
)}

        <div className="table-wrapper">

          <table className="users-table">

            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td>
  <button
    className="btn btn-primary btn-sm"
    onClick={() => handleEdit(user)}
  >
    Edit
  </button>

  <button
    className="btn btn-danger btn-sm"
    onClick={() => handleDelete(user.id)}
  >
    Delete
  </button>
</td>
                </tr>
              ))}
            </tbody>

          </table>

          {sortedUsers.length === 0 && (
            <p className="no-users">No users found.</p>
          )}

        </div>

        <p className="users-count">
          Total Registered Users: {sortedUsers.length}
        </p>

      </div>

    </div>
  );
}

export default Users;