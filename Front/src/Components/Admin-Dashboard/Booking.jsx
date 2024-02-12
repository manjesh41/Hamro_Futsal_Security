import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MyBooking() {
  const [booking, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      // Retrieve the token from local storage
      const token = window.localStorage.getItem("token");

      // Set the headers with the authentication token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        "http://127.0.0.1:3001/booking/allbooking",
        { headers }
      );

      setBookings(response.data.data); // Use response.data.data to get the actual bookings array
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.put(
        `http://127.0.0.1:3001/booking/${id}/accept`,
        {},
        { headers }
      );

      // Update the status in the state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? { ...booking, status: "accepted" } : booking
        )
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async (id) => {
    console.log(id)
    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.put(
        `http://127.0.0.1:3001/booking/${id}/decline`,
        {},
        { headers }
      );

      // Update the status in the state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? { ...booking, status: "declined" } : booking
        )
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="p-4 justify-center flex">
        <h1 className="text-4xl text-center font-bold">Booking Request</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <div className="overflow-x-auto">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-5 bg-black text-white">Name</th>
                <th className="text-left p-3 px-5 bg-black text-white">
                  Email
                </th>
                <th className="text-left p-3 px-5 bg-black text-white">
                  Phone
                </th>
                <th className="text-left p-3 px-5 bg-black text-white">Date</th>
                <th className="text-left p-3 px-5 bg-black text-white">
                  Starting Time
                </th>
                <th className="text-left p-3 px-5 bg-black text-white">
                  End Time
                </th>
                <th className="text-left p-3 px-5 bg-black text-white">
                  Decision
                </th>
                <th className="text-left p-3 px-5 bg-black text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {booking.map((booking, index) => (
                <tr
                  key={booking.id}
                  className={
                    booking.status === "pending"
                      ? "bg-blue-200"
                      : booking.status === "canceled"
                      ? "bg-red-200"
                      : "bg-green-200"
                  }
                >
                  <td className="p-3 px-5">{booking.fullname}</td>
                  <td className="p-3 px-5">{booking.email}</td>
                  <td className="p-3 px-5">{booking.phoneNum}</td>
                  <td className="p-3 px-5">{booking.bookingDate}</td>
                  <td className="p-3 px-5">{booking.startTime}</td>
                  <td className="p-3 px-5">{booking.endTime}</td>
                  <td className="p-3 px-5">
                    {booking.status === "pending" ? (
                      <span className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Pending
                      </span>
                    ) : booking.status === "declined" ? (
                      <span className="bg-red-500 text-white font-bold py-2 px-4 rounded">
                        Declined
                      </span>
                    ) : (
                      <span className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                        Accepted
                      </span>
                    )}
                  </td>
                  <td className="p-3 px-5">
                    {booking.status === "pending" && (
                      <>
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleAccept(booking.id)}
                        >
                          Accept
                        </button>

                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDecline(booking.id)}
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
