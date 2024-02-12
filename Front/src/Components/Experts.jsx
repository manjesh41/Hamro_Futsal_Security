import React, { memo } from "react";
import { Link } from "react-router-dom";
import bakd from "../assets/img/bakd .png";

export default memo(function Experts() {
  return (
    <div className="max-w-[1240px] my-10 mx-auto p-2 md:grid grid-cols-3">
      <div className=" col-span-1 md:w-[80%] text-center">
        <img src={bakd} alt="" className="inline" />
      </div>
      <div className=" col-span-2 flex flex-col justify-center">
        <h1 className="text-[#00df9a] font-bold m-2 text-3xl ">My Bookings</h1>
        <p className="m-2 text-2xl ">
          Futsal enthusiasts and fans can explore this gallery to relive
          thrilling game highlights, memorable goals, skillful player
          performances, and the vibrant atmosphere surrounding futsal
          competitions.
        </p>
        <Link to="/user-homepage/booknow/mybooking">
          <button className="w-[30%] bg-black text-white p-3 hover:bg-[#16a34a] hover:text-black rounded inline">
            My Bookings
          </button>
        </Link>
      </div>
    </div>
  );
});
