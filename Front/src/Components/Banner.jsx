import React from "react";
import { Link } from "react-router-dom";
import Typed from "react-typed";

export default function Banner() {
  const token = window.localStorage.getItem("token");
  return (
    <div>
      <div className="bg-green-300 w-full  py-[100px]">
        {/*for whole screen h-screen */}
        <div className="max-w-[1240px] my-[100] mx-auto text-center">
          <div className="text-2xl md:text-4xl font-bold mt-4">
            Hamro Futsal
          </div>
          <div className="text-white md:p-[24] font-bold text-3xl md:text-5xl mt-4">
            Experience futsal like never before with Hamro Futsal.
          </div>
          <div className="text-[20px] md:text-[40px] md:p-[24] text-white font-bold mt-4">
            <Typed
              className="p-4"
              strings={[" Lets Unleash your skills..."]}
              typeSpeed={100}
              loop={true}
              backSpeed={100}
            />
          </div>
          <div className="text-white text-xl md:text-2xl font-bold mt-10 ">
            {token ? (
              <Link to="/user-homepage/booknow">
                <button className="bg-black px-4 py-2 rounded-md hover:bg-white hover:text-black">
                  Book Now
                </button>
              </Link>
            ) : (
              <Link to="/error">
                <button className="bg-black px-4 py-2 rounded-md hover:bg-white hover:text-black">
                  Book Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
