import axios from "axios";
import { React, useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = ({ user, setUser }) => {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/users/register",
        {
          userName: username,
          password: password,
          email: email,
          phoneNum: phoneNum,
          fname: fname,
          lname: lname,
        }
      );
      if (response.data.status === "success") {
        setUser(response.data.user);
        console.log(user);

        alert("Registration Successful");
        window.location.assign("/");
      }

      if (response.data.status === "success") {
        setUser(response.data.user);
        console.log(user);

        alert("Registration Successful");
        window.location.assign("/");
      }
    } catch (error) {
      // Handle errors here
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.error); // This will log the error message from the server
        // Use the error message received from the server to display to the user
        // For example, set it in state to display it in your component
      } else if (error.request) {
        // The request was made but no response was received
        alert(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        alert("Error", error.message);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-green-100 justify-center items-center h-screen">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={require("../assets/img/back.png")} // Update the image path
          alt="Football Stadium"
          className="w-full max-w-md rounded-md hidden md:block" // Hide on small screens
        />
      </div>
      <div className="w-full md:w-1/2">
        <div className="bg-white p-8 shadow-md rounded-md max-w-sm mx-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-black">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="fname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="fname"
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                value={fname}
                placeholder="Enter your Firstname"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="lname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                value={lname}
                placeholder="Enter your Lastname"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                value={username}
                placeholder="Enter your Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                value={email}
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="phoneNum"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNum"
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                value={phoneNum}
                placeholder="Enter your number"
                onChange={(e) => setPhoneNum(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="text-sm text-red-600">
              {(!/\d/.test(password) ||
                !/[!@#$%^&*(),.?":{}|<>]/.test(password)) &&
                "Password must contain at least one capital letter and either a number or a special character"}
            </p>

            <div>
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
              >
                Register
              </button>

              <p className="mt-4 text-sm text-gray-600 text-center">
                Already have an account?
                <Link to="/" className="text-blue-500 hover:underline">
                  <a href="#">Sign In</a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
