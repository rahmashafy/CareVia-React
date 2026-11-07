import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "./firebase";
import Navbar from "./Navbar";
import "./Registration.css";
function Registration() {

    const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccessMessage("");

  // Name validation
  if (fullName.trim().length < 3) {
    alert("Name must be at least 3 characters");
    return;
  }

  // Email validation
  if (!email.includes("@")) {
    alert("Please enter a valid email");
    return;
  }

  // Phone validation
  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Phone number must contain 10 digits");
    return;
  }

  // Password validation
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      fullName: fullName,
      email: email,
      phone: phone,
      gender: gender,
      timestamp: new Date()
    });

    setSuccessMessage("Registration successful!");

setFullName("");
setEmail("");
setPhone("");
setGender("");
setPassword("");
setConfirmPassword("");

  } catch (error) {
    console.error("Registration error:", error);
    alert(error.message);
  }
};
  return (
    <div className="registration-page">
        <Navbar />

      <div className="registration-container">

        <div className="registration-header">
          <h1>Create Your Account</h1>
          <p>Join CareVia and take care of your health.</p>
        </div>

{successMessage && (
  <div className="success-message">
    {successMessage}
  </div>
)}
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>
            <input
  type="text"
  placeholder="Enter your full name"
  value={fullName}
  onChange={(e) => {
  setFullName(e.target.value);
  setSuccessMessage("");
}}
  required
/> </div>

          <div className="form-group">
            <label>Email</label>
            <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => {
  setEmail(e.target.value);
  setSuccessMessage("");
}}
  required
/>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
  type="tel"
  placeholder="Enter your phone number"
  value={phone}
  onChange={(e) => {
  setPhone(e.target.value);
  setSuccessMessage("");
}}
  required
/>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
  value={gender}
 onChange={(e) => {
  setGender(e.target.value);
  setSuccessMessage("");
}}
  required
>
  <option value="">Select your gender</option>
  <option value="Female">Female</option>
  <option value="Male">Male</option>
  <option value="Other">Other</option>
</select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
  type="password"
  placeholder="Create a password"
  value={password}
 onChange={(e) => {
  setPassword(e.target.value);
  setSuccessMessage("");
}}
  required
/>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
  type="password"
  placeholder="Confirm your password"
  value={confirmPassword}
 onChange={(e) => {
  setConfirmPassword(e.target.value);
  setSuccessMessage("");
}}
  required
/>
          </div>

          <button type="submit" className="register-button">
            Create Account
          </button>

          <p className="login-text">
            Already have an account? <a href="#login">Login</a>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Registration;