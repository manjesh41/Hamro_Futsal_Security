import axios from "axios";
import React, { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(
        "http://127.0.0.1:3001/users/change-password",
        {
          currentPassword: oldPassword,
          newPassword,
          confirmPassword,
        },
        { headers }
      );

      if (response.status === 204) {
        // Password successfully updated, clear the form inputs
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordMismatch(false);
        // Show a success message to the user
        setSuccessMessage("Password updated successfully");
        setErrorMessage("");
      } else {
        // Show an error message to the user
        setSuccessMessage("");
        setErrorMessage("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error.response.data.error);
  
      if (error.response.status === 400) {
        // Handle specific status codes if needed
        // For example, you can check for a specific error message and set a custom error message
        if (error.response.data.error === "New password must be different from the current password") {
          setErrorMessage("New password must be different from the current password");
        } else {
          setErrorMessage("Failed to update password");
        }
      } else {
        // Handle other status codes or generic error messages
        setErrorMessage("Failed to update password");
      }
    
      // Handle other error scenarios and show an error message to the user
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-300">
      <div className="bg-white p-8 shadow-md rounded-md max-w-m mx-auto">
      {passwordMismatch && (
          <p className="text-red-500 text-sm mb-4">Passwords do not match</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <h2 className="text-3xl font-bold text-center mb-4 text-black">
          Change Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              data-testid="oldPassword"
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              data-testid="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              data-testid="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
