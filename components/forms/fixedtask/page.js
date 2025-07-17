// Highest priority
// object : Event title , start time and end time
"use client";
import { useState } from "react";
import React from "react";
import { useDispatch} from "react-redux";
import { increment } from "@/redux/formcounter/counter";
export default function FixedTaskForm() {
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch()
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!eventTitle || !startTime || !endTime) return;

    setEvents([
      ...events,
      {
        id: Date.now(),
        title: eventTitle,
        start: startTime,
        end: endTime,
      },
    ]);

    // Clear inputs
    setEventTitle("");
    setStartTime("");
    setEndTime("");
  };
  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleNext = () => {
    console.log("Submitting events:", events);
    // Dispatch increment action to move to the next form
    dispatch(increment());
  };

  return (
    <main className="h-[70vh] flex flex-col gap-2">
      {/* Header for Fixed Task Form */}
      <h2 className="text-center bg-amber-300 p-5 text-xl font-semibold text-black">
        Step-1 Add your fixed task
      </h2>
      {/* Form for Adding Fixed Tasks */}
      <form
        onSubmit={handleAddEvent}
        className="flex flex-col items-center gap-2"
      >
        <div className="h-[50vh] border-2 border-gray-300 w-[90%] p-5">
          {/* Event Form */}
          <div className=" mb-2">
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="border border-gray-400 rounded px-3 py-2 w-full sm:w-1/3"
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border border-gray-400 rounded px-3 py-2 w-full sm:w-1/3"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border border-gray-400 rounded px-3 py-2 w-full sm:w-1/3"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full block mt-2"
            >
              Add
            </button>
          </div>
          <h6 className="text-xl mb-1">
            ------------- Your Events -----------
          </h6>
          {/* List of Events */}
          <div className="h-[28vh] overflow-y-auto [scrollbar-gutter:stable]">
            <ul className="space-y-2">
              {[...events]
                .sort((a, b) => a.start.localeCompare(b.start))
                .map((event) => (
                  <li
                    key={event.id}
                    className="border border-gray-300 py-2 rounded bg-gray-100 flex justify-around items-center px-2"
                  >
                    <span className="font-semibold w-1/3 text-center">
                      {event.title}
                    </span>
                    <span className="w-1/3 text-center">
                      {event.start} - {event.end}
                    </span>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-800 font-semibold w-1/3 text-center"
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={handleNext}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-2xl w-1/3 p-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Next
        </button>
      </form>
    </main>
  );
}
