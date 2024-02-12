import React from "react";
import About from "../Components/About";
import Banner from "../Components/Banner";
import Experts from "../Components/Experts";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const UserHomepage = () => {
  return (
    <div className="main-body">
      <Header />
      <Banner />
      <Experts />
      <About />
      <Footer />
    </div>
  );
};

export default UserHomepage;
