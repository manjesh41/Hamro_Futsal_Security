import React, { useState } from "react";
import Booking from "../Components/Admin-Dashboard/Booking";
import Gallery from "../Components/Admin-Dashboard/Gallery";
import Reviews from "../Components/Admin-Dashboard/Reviews";
import SideNavBar from "../Components/Admin-Dashboard/SideNavBar";
import User from "../Components/Admin-Dashboard/User";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("User");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const tabConfig = {
 
    User: {
      body: <User />,
    },
    Booking: {
      body: <Booking />,
    },
    Reviews: {
      body: <Reviews />,
    },
    Gallery: {
      body: <Gallery />,
    },
  };

  const { body } = tabConfig[activeTab];

  return (
    <div className="flex">
      <SideNavBar activeTab={activeTab} handleTabClick={handleTabClick} />

      <div className="c-9" style={{width:'100%'}}>{body}</div>
    </div>
  );
}
