import React from "react";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-[1240px]  mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-white">
        <div>
          <h1 className="w-full text-3xl font-bold text-[#059669]">
            Hamro Futsal.
          </h1>
          <p className="py-4">
            futsal is a thrilling and skillful sport that combines the
            excitement of football with the intensity of indoor competition..
          </p>
          <div className="flex justify-between md:w-[75%] my-6">
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
          </div>
        </div>
        <div className="lg:col-span-2 flex justify-between mt-6">
          <div>
            <h6 className="font-medium text-[#059669]">Solutions</h6>
            <ul>
              <li className="py-2 text-sm">Analytics</li>
              <li className="py-2 text-sm">Marketing</li>
              <li className="py-2 text-sm">Commerce</li>
              <li className="py-2 text-sm">Insights</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-[#059669]">Support</h6>
            <ul>
              <li className="py-2 text-sm">Practice</li>
              <li className="py-2 text-sm">Training</li>
              <li className="py-2 text-sm">Events</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-[#059669]">Company</h6>
            <ul>
              <li className="py-2 text-sm">About us</li>
              <li className="py-2 text-sm">Gallary</li>
              <li className="py-2 text-sm">Booking</li>
              <li className="py-2 text-sm">Press</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-[#059669]">Legal</h6>
            <ul>
              <li className="py-2 text-sm">Claim</li>
              <li className="py-2 text-sm">Policy</li>
              <li className="py-2 text-sm">Terms</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
