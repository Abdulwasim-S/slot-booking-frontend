import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { setBookings } from "../helper/redux/Reducer/bookings.reducer";
import { useNavigate } from "react-router-dom";

const CalenderPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [bookedTimes, setBookedTime] = useState([]);
  const dispatch = useDispatch();
  const navTo = useNavigate();
  const { status, three, six, nine, twelve } = useSelector(
    (state) => state.bookingReducer
  );
  const updateSelectedDate = (date) => {
    let temp = [];
    if (three.includes(date)) {
      temp.push(3);
    }
    if (six.includes(date)) {
      temp.push(6);
    }
    if (nine.includes(date)) {
      temp.push(9);
    }
    if (twelve.includes(date)) {
      temp.push(12);
    }
    setBookedTime(temp);
    setSelectedDate(date);
  };
  const getData = async () => {
    const response = await axios.get(
      "https://slot-booking-backend.vercel.app/booking"
    );
    dispatch(setBookings(response.data.booked_dates));
  };
  useEffect(() => {
    getData();
  }, []);

  const tiledisabled = ({ activeStartDate, date, view }) => {
    let calender_date = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    let check1 = three.includes(calender_date);
    let check2 = six.includes(calender_date);
    let check3 = nine.includes(calender_date);
    let check4 = twelve.includes(calender_date);
    if (check1 && check2 && check3 && check4) {
      return true;
    }

    if (date.getDate() === new Date().getDate()) {
      return false;
    }
    if (date < new Date()) {
      return true;
    }
    return date < new Date();
  };
  const handleBooking = (booking_date, booking_time) => {
    if (!booking_date) {
      return alert("Please select a date");
    }
    const booking_data = { booking_date, booking_time };
    localStorage["slot-booking-data"] = JSON.stringify(booking_data);
    navTo("/booking");
  };
  if (!status) {
    return (
      <div className="calender-loading-page">
        <h1 className="text-center text-secondary">Loading</h1>
      </div>
    );
  }
  return (
    <div className="row calender-page">
      <Calendar
        className="col-sm-8 calender-container border border-white p-3"
        tileDisabled={tiledisabled}
        onChange={(e) =>
          updateSelectedDate(
            `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`
          )
        }
      />

      <div className="col-sm-4 time-container border border-white">
        <button
          className={"btn btn-primary "}
          disabled={bookedTimes.includes(9)}
          onClick={() => handleBooking(selectedDate, 9)}
        >
          09.00 am
        </button>
        <button
          className={"btn btn-primary "}
          disabled={bookedTimes.includes(12)}
          onClick={() => handleBooking(selectedDate, 12)}
        >
          12.00 pm
        </button>
        <button
          className={"btn btn-primary "}
          disabled={bookedTimes.includes(3)}
          onClick={() => handleBooking(selectedDate, 3)}
        >
          03.00 pm
        </button>
        <button
          className={"btn btn-primary "}
          disabled={bookedTimes.includes(6)}
          onClick={() => handleBooking(selectedDate, 6)}
        >
          06.00 pm
        </button>
      </div>
    </div>
  );
};

export default CalenderPage;
