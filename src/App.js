import React from "react";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CalenderPage from "./component/CalenderPage";
import { Route, Routes } from "react-router-dom";
import BookingPage from "./component/BookingPage";
import HeadingPage from "./component/HeadingPage";
import FooterPage from "./component/FooterPage";

const App = () => {
  return (
    <>
      <HeadingPage />
      <Routes>
        <Route exact path="/" element={<CalenderPage />} />
        <Route path="/Booking" element={<BookingPage />} />
      </Routes>
      <FooterPage />
    </>
  );
};

export default App;
