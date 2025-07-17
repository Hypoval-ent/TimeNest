"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "@/redux/formcounter/counter";

const Rough = () => {
  const dispatch = useDispatch();
  const [eventTitle, setEventTitle] = useState("");
  const [minTime, setMinTime] = useState("");

  const handleNext = () => {
    // You can add validation here if needed
    dispatch(increment());
  };

  const handleBack = () => {
    dispatch(decrement());
  };

  return (
    <main className="h-[70vh] bg-white text-black flex flex-col gap-2">
      <h2 className="text-center bg-amber-300 p-5 text-xl font-semibold">
        Step-2 Add your not fixed task
      </h2>
      <form className="flex flex-col items-center gap-2">
        <div className="h-[50vh] border-2 border-gray-300 w-[90%] p-5">
          <input
            type="text"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2 w-full sm:w-1/2"
          />
          <input
            type="time"
            placeholder="Min Time (minutes)"
            value={minTime}
            onChange={(e) => setMinTime(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2 w-full sm:w-1/2"
            min={1}
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-2xl w-1/2 p-2"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-2xl w-1/2 p-2"
          >
            Next
          </button>
        </div>
      </form>
    </main>
  );
};

export default Rough;