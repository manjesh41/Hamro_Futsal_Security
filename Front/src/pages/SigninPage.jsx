import axios from "axios";
import React, { useEffect, useState } from "react";

import back from "../assets/img/back.png";

import { Link } from "react-router-dom";

const SigninPage = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };
    console.log(user);

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:3001/users/login", {
        userName: username,
        password: password,
      });

      const token = response.data.token; // Extract the token from the response

      // Check the role to determine the destination dashboard
      if (username === "admin" && password === "admin") {
        // Navigate to Admin Dashboard
        window.location.assign("/Admin-Dashboard");
      } else {
        // Navigate to User Dashboard
        window.location.assign("/user-homepage");
      }

      window.localStorage.setItem("token", token);

      console.log(user);
    } catch (err) {
      if (err.response) {
        const errorResponse = err.response.data;

        if (
          errorResponse.error === "Account is locked. Please try again later."
        ) {
          // Handle account lock here, display appropriate message to the user
          alert("Your account is locked. Please try again later.");
          // You can optionally redirect the user to a different page or show a message accordingly
        } else {
          // Handle other errors (e.g., invalid credentials)
          alert(errorResponse.error); // Show the specific error message received from the backend
        }
      } else if (err.request) {
        alert("Request failed. Please try again."); // Alert for failed request
      } else {
        alert("Error occurred:", err.message); // General error alert
      }
    }

    // Add your sign-in logic here
  };

  return (
    <div className="flex flex-col md:flex-row bg-green-100 justify-center items-center h-screen">
      {!isSmallDevice && (
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={back}
            alt="Football Stadium"
            className="w-full max-w-md rounded-md"
          />
        </div>
      )}
      <div className="w-full md:w-1/2">
        <div className="bg-white p-8 shadow-md rounded-md max-w-sm mx-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-black">
            Hamro Futsal
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <input
                type="checkbox"
                id="showPassword"
                className="mr-2"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label
                htmlFor="showPassword"
                className="text-sm font-medium text-gray-700"
              >
                Show password
              </label>
              <div className="w-1/2 border-b border-gray-300"></div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-black text-white py-3 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
              >
                Sign In
              </button>
              <p className="mt-4 text-sm text-gray-600 text-center">
                Don't have an account?
                <Link to="/signup" className="text-blue-500 hover:underline">
                  {" "}
                  <a href="#">Create one</a>
                </Link>
              </p>
            </div>
          </form>
          <button
            // onClick={handleGuestLogin}
            className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 w-full mt-4"
          >
            <Link to="/user-homepage">Login as Guest</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
