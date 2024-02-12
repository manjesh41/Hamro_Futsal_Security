import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function MyBooking() {
  const [booking, setBookings] = useState({});

  const navigate = useNavigate();

  const getMyBookings = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        "http://127.0.0.1:3001/booking/BookingById",
        {
          headers,
        }
      );
      console.log(response.data);

      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMyBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`http://127.0.0.1:3001/booking/${id}`, {
        headers,
      });

      // Update the state to remove the deleted booking
      setBookings((prevBookings) => ({
        ...prevBookings,
        response: prevBookings.response.filter((booking) => booking.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{minHeight:"50vh"}}>
      <div className="p-4 justify-center flex ">
        <h1 className="text-4xl text-center font-bold">My Bookings</h1>
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
                <th className="text-left p-3 px-5 bg-black text-white"></th>
              </tr>
            </thead>
            <tbody>
              {booking.response == null ? (
                <h1>No Boking Found</h1>
              ) : (
                booking.response.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className={
                      booking.status === "pending"
                        ? "bg-blue-200"
                        : booking.status === "accepted"
                        ? "bg-green-200"
                        : "bg-red-200"
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
                        <span className="bg-blue-400 text-white font-bold py-2 px-4 rounded">
                          Pending
                        </span>
                      ) : booking.status === "accepted" ? (
                        <span className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                          Accepted
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white font-bold py-2 px-4 rounded">
                          Declined
                        </span>
                      )}
                    </td>
                    <td className="p-3 px-5">
                      {booking.status === "pending" && (
                        <>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={
                            () => {
                              navigate(`/user-homepage/update-booking`);
                              localStorage.setItem("bookingId", booking.id);
                            }
                          } 
                          >
                            <AiFillEdit size={20} />
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDeleteBooking(booking.id)} 
                          >
                            <AiFillDelete size={20} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
