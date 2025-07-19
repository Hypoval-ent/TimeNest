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
      state.fixedTasks = state.fixedTasks.filter(
        (task) => task.title !== action.payload
      );
    },
    setAllFixedTasks: (state, action) => {
      state.fixedTasks = action.payload;
    },
    setMustDoTask: (state, action) => {
      state.mustDoTasks.push(action.payload);
    },
    deleteMustDoTask: (state, action) => {
      state.mustDoTasks = state.mustDoTasks.filter(
        (task) => task.title !== action.payload
      );
    },
    setAllMustDoTasks: (state, action) => {
      state.mustDoTasks = action.payload;
    },
    setDailyTask: (state, action) => {
      state.dailyTasks.push(action.payload);
    },
    deleteDailyTask: (state, action) => {
      state.dailyTasks = state.dailyTasks.filter(
        (task) => task.title !== action.payload
      );
    },
    setAllDailyTasks: (state, action) => {
      state.dailyTasks = action.payload;
    },
    clearAllTasks: (state) => {
      state.fixedTasks = [];
      state.mustDoTasks = [];
      state.dailyTasks = [];
    },
  },
});

export const {
  setFixedTask,
  deleteFixedTask,
  setAllFixedTasks,
  setMustDoTask,
  deleteMustDoTask,
  setAllMustDoTasks,
  setDailyTask,
  deleteDailyTask,
  setAllDailyTasks,
  clearAllTasks,
} = formDataSlice.actions;

export default formDataSlice.reducer;
