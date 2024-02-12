import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { FiFolder } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineReviews } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const SideNavBar = ({ activeTab, handleTabClick }) => {
  const menus = [
    {
      name: "User",
      icon: AiOutlineUser,
      component: <div></div>,
    },
    {
      name: "Booking",
      icon: BsFillBookmarkPlusFill,
      margin: true,
      component: <div></div>,
    },
    {
      name: "Gallery",
      icon: FiFolder,
      margin: true,
      component: <div></div>,
    },
    {
      name: "Reviews",
      icon: MdOutlineReviews,
      component: <div></div>,
    },
    {
      name: "Logout",
      icon: RiLogoutBoxLine,
      margin: true,
      component: <div></div>,
    },
  ];
  const [open, setOpen] = useState(true);
  const [selectedButton, setSelectedButton] = useState("Dashboard");

  useEffect(() => {
    const currentPath = window.location.pathname;
    const selectedItem = menus.find((menu) => menu.link === currentPath);
    if (selectedItem) {
      setSelectedButton(selectedItem.name);
    }
  }, []);

  const handleButtonClick = (name) => {
    if (name === "Logout") {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      setSelectedButton(name);
      handleTabClick(name);
    }
  };

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <NavLink
              key={i}
              className={`${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              activeClassName="bg-gray-800"
              onClick={() => handleButtonClick(menu?.name)}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </NavLink>
          ))}
        </div>
      </div>
      {/* <div className="m-3 text-xl text-gray-900 font-semibold">
        {menus.map((menu, i) =>
          selectedButton === menu.name ? (
            <div key={i}>{menu.component}</div>
          ) : null
        )}
      </div> */}
    </section>
  );
};

export default SideNavBar;
