import { configureStore } from "@reduxjs/toolkit";
import bookingslice from "./Reducer/bookings.reducer";

const store = configureStore({
  reducer: {
    bookingReducer: bookingslice,
  },
});
export default store;
