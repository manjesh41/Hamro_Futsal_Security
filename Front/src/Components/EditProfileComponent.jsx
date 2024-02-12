import axios from "axios";
import React, { useEffect, useState } from "react";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch the current user's data when the component mounts
    const fetchUserData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get("http://127.0.0.1:3001/users/usersId", {
          headers,
        });

        const userData = response.data.data[0];
        setFirstName(userData.fname || "");
        setLastName(userData.lname || "");
        setEmail(userData.email || "");
        setPhoneNumber(userData.phoneNum || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(
        "http://127.0.0.1:3001/users/edit-profile",
        {
          fname: firstName,
          lname: lastName,
          email,
          phoneNum: phoneNumber,
        },
        { headers }
      );

      if (response.status === 200) {
        // Profile successfully updated, set success message and clear error message
        setSuccessMessage("Profile updated successfully");
        setErrorMessage("");
      } else {
        // Show an error message to the user
        setSuccessMessage("");
        setErrorMessage("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      // Handle error scenarios and show an error message to the user
      setSuccessMessage("");
      setErrorMessage("Failed to update profile");
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-green-300">
      <div className="w-full max-w-md">
      
        <h1 className="text-3xl text-center font-bold mb-6">Edit Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-bold mb-2"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              data-testid="firstName"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              data-testid="lastName"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
