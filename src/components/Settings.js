import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "./ConfirmModal";
import "./Settings.css";

const Settings = () => {
  const { currentUser, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      navigate("/");
    } catch (error) {
      alert(
        "Failed to delete account. Please try logging in again and try again."
      );
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-content">
        <h1>Settings</h1>
        <div className="settings-section">
          <h2>User Information</h2>
          <div className="user-info">
            <p>
              <strong>Name:</strong> {currentUser?.displayName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {currentUser?.email}
            </p>
            <p>
              <strong>Account Created:</strong>{" "}
              {currentUser?.metadata?.creationTime
                ? new Date(
                    currentUser.metadata.creationTime
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="settings-section">
          <h2>Account Settings</h2>
          <p>Manage your account preferences</p>
        </div>
        <div className="settings-section danger-zone">
          <h2>Danger Zone</h2>
          <p>Irreversible actions</p>
          <button
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account and Data
          </button>
        </div>
        <ConfirmModal
          show={showDeleteModal}
          title="Delete Account"
          message="Are you sure you want to delete your account and all associated data? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
        />
      </div>
    </div>
  );
};

export default Settings;
