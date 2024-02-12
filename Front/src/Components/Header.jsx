import React, { useState } from "react";

import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
  RiEdit2Line,
  RiLockPasswordLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Header() {
  // const { user } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const token = window.localStorage.getItem("token");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header>
      <div className="bg-[#f8fafc] p-4" style={{ zIndex: 20 }}>
        <div className="max-w-[1240px] py-[12px] flex justify-between mx-auto">
          <div className="text-4xl font-bold">Hamro Futsal</div>
          {toggle ? (
            <AiOutlineClose
              onClick={() => setToggle(!toggle)}
              className="text-black text-4xl md:hidden block items-center"
            />
          ) : (
            <AiOutlineMenu
              onClick={() => setToggle(!toggle)}
              className="text-black text-4xl md:hidden block items-center"
            />
          )}

          <ul className="hidden md:flex text-black gap-5 items-center">
            <Link to="/user-homepage">
              <li>
                <a
                  href="#"
                  className="nav-link hover:text-[#15803d] text-xl transition duration-2000"
                >
                  Home
                </a>
              </li>
            </Link>

            {token ? (
              <Link to="/user-homepage/booknow">
                <li>
                  <a
                    href="#"
                    className="nav-link hover:text-[#15803d] text-xl transition duration-2000"
                  >
                    Book Now
                  </a>
                </li>
              </Link>
            ) : (
              <Link to="/error">
                <li>
                  <a
                    href="#"
                    className="nav-link hover:text-[#15803d] text-xl transition duration-2000"
                  >
                    Book Now
                  </a>
                </li>
              </Link>
            )}

            <Link to="/user-homepage/reviews">
              <li>
                <a
                  href="#"
                  className="nav-link hover:text-[#15803d] text-xl transition duration-2000"
                >
                  Reviews
                </a>
              </li>
            </Link>

            <Link to="/user-homepage/aboutus">
              <li>
                <a
                  href="#"
                  className="nav-link hover:text-[#15803d] text-xl transition duration-2000"
                >
                  About Us
                </a>
              </li>
            </Link>
            {token ? (
              <li>
                {showDropdown ? (
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="nav-link hover:text-[#15803d] text-xl transition duration-2000 font-bold focus:outline-none"
                    >
                      <IoPersonCircleOutline className="mr-2" size={24} />
                    </button>
                    <ul className="absolute right-0 mt-2 bg-white border rounded shadow-md p-2">
                      <Link to="/user-homepage/Edit-Profile">
                        <li>
                          <a
                            href="#"
                            className="flex items-center px-4 py-2 hover:bg-gray-200"
                          >
                            <RiEdit2Line className="mr-2" size={20} />
                            Edit Profile
                          </a>
                        </li>
                      </Link>

                      <Link to="/user-homepage/change-Password">
                        <li>
                          <a
                            href="#"
                            className="flex items-center px-4 py-2 hover:bg-gray-200"
                          >
                            <RiLockPasswordLine className="mr-2" size={20} />
                            Change Password
                          </a>
                        </li>
                      </Link>

                      <li>
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 hover:bg-gray-200"
                          onClick={handleLogout}
                        >
                          <RiLogoutBoxLine className="mr-2" size={20} />
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <button
                    onClick={toggleDropdown}
                    className="nav-link hover:text-[#15803d] text-xl transition duration-2000 font-bold"
                  >
                    <AiOutlineUser className="mr-2" size={24} />
                  </button>
                )}
              </li>
            ) : (
              <Link to={"/"}>
                <li>
                  <a
                    href="/"
                    className="bg-black text-white py-3 font-bold  px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                  >
                    Log In
                  </a>
                </li>
              </Link>
            )}
          </ul>

          {/* Responsive menu */}
          <div
            style={{ zIndex: 200 }}
            className={`md:hidden duration-300 w-full h-screen text-white fixed bg-black items-center flex flex-col top-[90px] ${
              toggle ? "top-0 left-0" : " left-[-100%]"
            }`}
          >
            <ul className="flex flex-col items-center justify-center h-full">
              <Link to="/user-homepage">
                <li className="p-5">
                  <a
                    href="#"
                    className="nav-link hover:text-black hover:bg-white transition duration-4000"
                  >
                    Home
                  </a>
                </li>
              </Link>

              <Link to="/user-homepage/booknow">
                <li className="p-5">
                  <a
                    href="#"
                    className="nav-link hover:text-black hover:bg-white transition duration-2000"
                  >
                    Book Now
                  </a>
                </li>
              </Link>

              <Link to="/user-homepage/reviews">
                <li className="p-5">
                  <a
                    href="#"
                    className="nav-link hover:text-black hover:bg-white transition duration-2000"
                  >
                    Reviews
                  </a>
                </li>
              </Link>

              <Link to="/user-homepage/aboutus">
                <li className="p-5">
                  <a
                    href="#"
                    className="nav-link hover:text-black hover:bg-white transition duration-2000"
                  >
                    About Us
                  </a>
                </li>
              </Link>
              {token ? (
                <li className="p-5">
                  {showDropdown ? (
                    <div className="relative">
                      <button
                        onClick={toggleDropdown}
                        className="nav-link hover:text-[#15803d] text-xl transition duration-2000 font-bold focus:outline-none"
                      >
                        <IoPersonCircleOutline className="mr-2" size={24} />
                      </button>
                      <ul className="absolute right-0 mt-2 bg-[#15803d] border rounded shadow-md p-2">
                        <li>
                          <a
                            href="#"
                            className="flex items-center px-4 py-2 hover:bg-black"
                          >
                            <RiEdit2Line className="mr-2" size={20} />
                            Edit Profile
                          </a>
                        </li>
                        <Link to="/user-homepage/change-password">
                          <li>
                            <a
                              href="#"
                              className="flex items-center px-4 py-2 hover:bg-black"
                            >
                              <RiLockPasswordLine className="mr-2" size={20} />
                              Change Password
                            </a>
                          </li>
                        </Link>

                        <li>
                          <a
                            href="#"
                            className="flex items-center px-4 py-2 hover:bg-gray-200"
                            onClick={handleLogout}
                          >
                            <RiLogoutBoxLine className="mr-2" size={20} />
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <button
                      onClick={toggleDropdown}
                      className="nav-link hover:text-[#15803d] text-xl transition duration-2000 font-bold"
                    >
                      <AiOutlineUser className="mr-2" size={24} />
                    </button>
                  )}
                </li>
              ) : (
                <button className="bg-black text-white py-3 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full">
                  <Link to={"/"}>Login</Link>
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
