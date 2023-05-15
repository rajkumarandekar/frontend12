import ProtectedRoute from "./components/ProtectedRoute";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";

const App = () => {
  const [auth, setAuth] = useState(false);

  const logout = () => {
    // Clear authentication state and token
    setAuth(false);
    localStorage.removeItem("token");
  };
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Verify token validity
          await axios.get("/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAuth(true);
        } catch (error) {
          console.error("Token verification failed:", error);
          logout();
        }
      }
    };

    // Check authentication status on component mount

    checkAuth();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/userdetails">User Details</Link>
            </li>
            {auth && (
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/signup" element={<Signup setAuth={setAuth} />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route
            path="/userdetails"
            element={<ProtectedRoute component={UserDetails} auth={auth} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
