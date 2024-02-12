import { DatePicker, TimePicker } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Book() {
  const [fullName, setFullName] = useState("");
  const [bookingDate, setBookingDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

  const bookingId = localStorage.getItem("bookingId");

  useEffect(() => {
    // Fetch the booking data for the specified booking ID
    const fetchBookingData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
          };

        const response = await axios.get(
          `http://127.0.0.1:3001/booking/${bookingId}`, 
            { headers }
        );

        const bookingData = response.data;
        console.log(bookingData);
        setFullName(bookingData.fullname || "");
        setPhoneNum(bookingData.phoneNum || "");
        setEmail(bookingData.email || "");
        
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setErrorMessage("Failed to fetch booking data");
      }
    };

    fetchBookingData();
  }, [bookingId]);


  // Custom function to disable past dates in the date picker
  const disabledDate = (current) => {
    // Get the current date
    const currentDate = new Date();
    // Set hours, minutes, seconds, and milliseconds to 0 to compare dates without time
    currentDate.setHours(0, 0, 0, 0);
    // Disable dates before the current date
    return current && current < currentDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `http://127.0.0.1:3001/booking/${bookingId}`,
        {
          fullname: fullName,
          bookingDate: bookingDate,
          startTime: startTime,
          endTime: endTime,
          phoneNum: phoneNum,
          email: email,
        },
        { headers }
      );

      if (response.status === 200) {
        // Booking successfully updated, set success message and clear error message
        setSuccessMessage("Booking updated successfully");
        setErrorMessage("");
      } else {
        // Show an error message to the user
        setSuccessMessage("");
        setErrorMessage("Failed to update booking");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      // Handle error scenarios and show an error message to the user
      setSuccessMessage("");
      setErrorMessage("Failed to update booking");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-green-300"
      style={{ zIndex: 0 }}
    >
      <h3 className="text-2xl font-bold mb-4">Update Booking</h3>
      <div className="w-full max-w-lg md:max-w-xl bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
            {
                errorMessage && (
                    <div className="bg-red-100 mb-2 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                ) 
            }

            {
                successMessage && (
                    <div className="bg-green-100 mb-2 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Success! </strong>
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )
            }

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name:
          </label>
          <input
            type="text"
            className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-black-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Booking Date:
          </label>
          <DatePicker
            className="w-full p-3 text-black border border-gray-300 rounded-lg sm:text-md focus:border-black-500"
            format="DD-MM-YYYY"
            value={bookingDate}
            onChange={(date) => setBookingDate(date)}
            required
            disabledDate={disabledDate} // Add the disabledDate prop
          />
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Start Time:
            </label>
            <TimePicker
              className="w-full p-3 text-black border border-gray-300 rounded-lg sm:text-md focus:border-black-500"
              format="HH:mm"
              value={startTime}
              onChange={(time) => setStartTime(time)}
              minuteStep={60}
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              End Time:
            </label>
            <TimePicker
              className="w-full p-3 text-black border border-gray-300 rounded-lg sm:text-md focus:border-black-500"
              format="HH:mm"
              value={endTime}
              onChange={(time) => setEndTime(time)}
              minuteStep={60}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number:
          </label>
          <input
            type="tel"
            className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-black-500"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            required
            pattern="[0-9]*"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-md font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-black-500 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center">
          <Link to="/user-homepage/booknow/mybooking">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              My Bookings
            </button>
          </Link>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Update Booking
          </button>
        </div>
      </div>
    </div>
  );
}
