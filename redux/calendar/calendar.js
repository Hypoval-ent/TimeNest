// redux/events/events.js
import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "events",
  initialState: {
    generatedEvents: [],
  },
  reducers: {
    setGeneratedEvents(state, action) {
      state.generatedEvents = action.payload;
    },
  },
});

export const { setGeneratedEvents } = eventSlice.actions;
export default eventSlice.reducer;
