import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import UpdateBooking from "./Components/UpdateBooking";
import Aboutus from "./pages/Aboutus";
import AdminDashboard from "./pages/AdminDashboard";
import Booknow from "./pages/Booknow";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import EditProfilePage from "./pages/EditProfilePage";
import GalleryPage from "./pages/GalleryPage";
import MyBookingPage from "./pages/MyBookingPage";
import Reviews from "./pages/Reviews";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import UserHomepage from "./pages/UserHomepage";
import ErrorPage from "./Components/ErrorPage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when the app loads
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/usersId",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.data[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    // Render a loading indicator or skeleton while fetching user data
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <UserHomepage user={user} /> : <SigninPage user={user} />
          }
        />
        <Route
          path="/signup"
          element={
            user ? <UserHomepage user={user} /> : <SignupPage user={user} setUser={setUser} />
          }
        />
        <Route path="/user-homepage" element={<UserHomepage user={user} />} />
        <Route path="/user-homepage/gallery" element={<GalleryPage />} />
        <Route path="/user-homepage/reviews" element={<Reviews />} />
        <Route path="/user-homepage/booknow" element={<Booknow />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="/user-homepage/update-booking"
          element={<UpdateBooking />}
        />
        <Route path="/user-homepage/aboutus" element={<Aboutus />} />
        <Route
          path="/user-homepage/booknow/mybooking"
          element={<MyBookingPage />}
        />
        <Route
          path="/user-homepage/change-password"
          element={<ChangePasswordPage />}
        />
        <Route
          path="/user-homepage/edit-profile"
          element={<EditProfilePage />}
        />

        <Route
          path="/Admin-Dashboard"
          element={
            user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <UserHomepage user={user} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
