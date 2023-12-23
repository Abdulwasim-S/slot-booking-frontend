import { createSlice } from "@reduxjs/toolkit";

const bookingslice = createSlice({
  name: "slot booking",
  initialState: {
    status: false,
    three: [],
    six: [],
    nine: [],
    twelve: [],
  },
  reducers: {
    // For Booking
    setBookings(state, action) {
      state.three = action.payload.three;
      state.six = action.payload.six;
      state.nine = action.payload.nine;
      state.twelve = action.payload.twelve;
      state.status = true;
    },
    // For Updating
    updateBooking(state, action) {
      if (action.payload.time === "three") {
        state.three = [...state.three, action.payload.date];
      }
      if (action.payload.time === "six") {
        state.six = [...state.six, action.payload.date];
      }
      if (action.payload.time === "nine") {
        state.nine = [...state.nine, action.payload.date];
      }
      if (action.payload.time === "twelve") {
        state.twelve = [...state.twelve, action.payload.date];
      }
      state.status = true;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
export const { setBookings, updateBooking, setStatus } = bookingslice.actions;
export default bookingslice.reducer;
