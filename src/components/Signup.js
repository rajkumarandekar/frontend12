import React, { useState } from "react";

import axios from "axios";
import "./Signup.css";
// Component for Signup
const Signup = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data); // Log response data
      setAuth(true); // Set authentication status to true
      window.alert("Signup successful!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
export default Signup;
