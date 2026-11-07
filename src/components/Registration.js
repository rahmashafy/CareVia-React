import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "./firebase";
import Navbar from "./Navbar";
import "./Registration.css";
function Registration() {
  return (
    <div className="registration-page">
        <Navbar />

      <div className="registration-container">

        <div className="registration-header">
          <h1>Create Your Account</h1>
          <p>Join CareVia and take care of your health.</p>
        </div>

        <form>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select>
              <option value="">Select your gender</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" />
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