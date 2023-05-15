// Component for Login

import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Import the Login.css file

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data); // Log response data
      const token = response.data.token;
      localStorage.setItem("token", token);
      setAuth(true); // Set authentication status to true
      setLoggedIn(true);
      window.alert("successfully login");
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    setAuth(false);
    setLoggedIn(false);
    window.alert("Successfully logged out");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {loggedIn ? (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      )}
    </div>
  );
};
export default Login;
