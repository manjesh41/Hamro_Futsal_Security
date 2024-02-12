import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";

const User = () => {
  const [users, setUsers] = useState([]);
  const [showEditUserPopup, setShowEditUserPopup] = useState(false);
  const [showDeleteUserPopup, setShowDeleteUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getUsers = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `http://127.0.0.1:3001/users/allusers`,
        {
          headers,
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUserPopup(true);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:3001/users/${selectedUser.id}`,
        selectedUser
      );

      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      );
      setUsers(updatedUsers);
      setShowEditUserPopup(false);
      setSelectedUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    console.log(selectedUser);
    try {
      if (!selectedUser) return;

      const token = window.localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(
        `http://127.0.0.1:3001/users/deleteUsers/${selectedUser}`,
        {
          headers,
        }
      );

      // Update the state by filtering out the deleted user
      setUsers((prevUsers) => ({
        ...prevUsers,
        data: prevUsers.data.filter((user) => user.id !== selectedUser),
      }));

      setShowDeleteUserPopup(false);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 w-100%">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-3xl md:text-2xl lg:text-4xl text-center font-bold mb-8">
          Hamro Futsal Users
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-5 bg-black text-white">
                  User Name
                </th>
                <th className="text-left p-3 px-5 bg-black text-white">
                  First Name
                </th>
                <th className="text-left p-3 px-5 bg-black text-white">
                  Last Name
                </th>
                <th className="text-left p-3 px-5 bg-black text-white">
                  Email
                </th>
                <th className="text-left p-3 px-5 bg-black text-white">
                  Phone Number
                </th>
                {/* <th className="text-left p-3 px-5 bg-black text-white">
                  Password
                </th> */}
                <th className="text-left p-3 px-5 bg-black text-white"></th>
              </tr>
            </thead>
            <tbody>
              {users?.data == null ? (
                <tr>
                  <td className="p-3 px-5">No Users</td>
                </tr>
              ) : (
                users?.data.map((user, index) => (
                  <tr key={user.id}>
                    <td className="p-3 px-5">{user.userName}</td>
                    <td className="p-3 px-5">{user.fname}</td>
                    <td className="p-3 px-5">{user.lname}</td>
                    <td className="p-3 px-5">{user.email}</td>
                    <td className="p-3 px-5">{user.phoneNum}</td>
                    {/* <td className="p-3 px-5">{user.password}</td> */}
                    <td className="p-3 px-5">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setShowDeleteUserPopup(true);
                          setSelectedUser(user._id);
                        }}
                      >
                        <AiFillDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showEditUserPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold">Edit User</h1>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowEditUserPopup(false)}
                  >
                    <AiFillCloseCircle size={20} />
                  </button>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="p-2 border border-gray-300 rounded w-full"
                    placeholder="First Name"
                    value={selectedUser.firstName}
                    onChange={(e) =>
                      setSelectedUser((prevUser) => ({
                        ...prevUser,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="p-2 border border-gray-300 rounded w-full"
                    placeholder="Last Name"
                    value={selectedUser.lastName}
                    onChange={(e) =>
                      setSelectedUser((prevUser) => ({
                        ...prevUser,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="p-2 border border-gray-300 rounded w-full"
                    placeholder="Email"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser((prevUser) => ({
                        ...prevUser,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="p-2 border border-gray-300 rounded w-full"
                    placeholder="Phone Number"
                    value={selectedUser.phone}
                    onChange={(e) =>
                      setSelectedUser((prevUser) => ({
                        ...prevUser,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="p-2 border border-gray-300 rounded w-full"
                    placeholder="Password"
                    value={selectedUser.password}
                    onChange={(e) =>
                      setSelectedUser((prevUser) => ({
                        ...prevUser,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUpdateUser}
                >
                  Update User
                </button>
                <button
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowEditUserPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteUserPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold">Delete User</h1>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowDeleteUserPopup(false)}
                  >
                    <AiFillCloseCircle size={20} />
                  </button>
                </div>
                <p className="text-sm">
                  Are you sure you want to delete this user?
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteUser}
                >
                  Delete User
                </button>
                <button
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteUserPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
