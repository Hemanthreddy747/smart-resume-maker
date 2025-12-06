import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <div className="home-container">
      <main className="home-main">
        <div className="user-details">
          <h3>User Information</h3>
          <div className="user-detail-item">
            <strong>Email:</strong> {currentUser?.email}
          </div>
          <div className="user-detail-item">
            <strong>User ID:</strong> {currentUser?.uid}
          </div>
          <div className="user-detail-item">
            <strong>Email Verified:</strong>{" "}
            {currentUser?.emailVerified ? "Yes" : "No"}
          </div>
          <div className="user-detail-item">
            <strong>Account Created:</strong>{" "}
            {currentUser?.metadata.creationTime}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
