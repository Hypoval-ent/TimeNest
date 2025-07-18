import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fixedTasks: [],
  mustDoTasks: [],
  dailyTasks: [],
};

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setFixedTask: (state, action) => {
      state.fixedTasks.push(action.payload);
    },
    deleteFixedTask: (state, action) => {
      state.fixedTasks = state.fixedTasks.filter((task) => task.title !== action.payload);
    },
    setMustDoTask: (state, action) => {
      state.mustDoTasks.push(action.payload);
    },
    setDailyTask: (state, action) => {
      state.dailyTasks.push(action.payload);
    },
    clearAllTasks: (state) => {
      state.fixedTasks = [];
      state.mustDoTasks = [];
      state.dailyTasks = [];
    },
  },
});

export const { setFixedTask, deleteFixedTask, setMustDoTask, setDailyTask, clearAllTasks } =
  formDataSlice.actions;

export default formDataSlice.reducer;
