import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserDetails.css";
const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/userdetails",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    fetchUserDetails();
    setClicked(true);
  };

  return (
    <div className={`user-details-container ${clicked ? "clicked" : ""}`}>
      <h2>User Details</h2>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <button
          className={`user-details-button ${clicked ? "hidden" : ""}`}
          onClick={handleButtonClick}
        >
          Get User Details
        </button>
      )}
    </div>
  );
};

export default UserDetails;
