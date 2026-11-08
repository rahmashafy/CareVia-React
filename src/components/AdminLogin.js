import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./AdminLogin.css";

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const ADMIN_UID = "lz68LUbgHmT5P0dEbPs1DTuuZB32";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user.uid === ADMIN_UID) {
        alert("Admin login successful!");
        navigate("/users");
      } else {
        await signOut(auth);
        alert("Access denied! Admin only.");
      }

    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        
         <div className="admin-icon">
  🔐

        </div>
      

        <h1>CareVia Admin</h1>

        <p className="admin-subtitle">
          Welcome back! Please login to your dashboard.
        </p>

        <form onSubmit={handleLogin}>

          <div className="admin-form-group">
            <label>Admin Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-login-button">
            Login
          </button>

        </form>

        <p className="admin-footer">
          CareVia Healthcare Management System
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;