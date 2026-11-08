
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import "./Users.css";

const ADMIN_UID = "lz68LUbgHmT5P0dEbPs1DTuuZB32";

function Users() {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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

        <div className="table-wrapper">

          <table className="users-table">

            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
              </tr>
            </thead>

            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
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