// Highest priority
// object : Event title , start time and end time
"use client";
import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { increment } from "@/redux/formcounter/counter";
export default function FixedTaskForm() {
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
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
    <>
      <div className="p-5">
        <div className="mt-8 p-4">
          <form>
            <div>
              <div className="flex flex-col md:flex-row">
                <div className="w-full flex-1 mx-2 svelte-1l8159u">
                  <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                    <input
                      placeholder="Event Title"
                      className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />{" "}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row ">
                <div className="w-1/2 flex-1 mx-2 ">
                  <label
                    for="start-time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start time:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id="start-time"
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="09:00"
                      max="18:00"
                      value="00:00"
                      required
                    />
                  </div>
                </div>
                <div className="w-1/2 flex-1 mx-2 ">
                  <label
                    for="end-time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End time:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id="end-time"
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="09:00"
                      max="18:00"
                      value="00:00"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white  rounded w-full block  px-4 py-2 "
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <h6 className="text-xl p-2 mb-1">
            ------------- Your Events ----------
          </h6>
          <div className="flex p-2 mt-4">
            <button
              className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                 hover:bg-gray-200  
                 bg-gray-100 
                 text-gray-700 
                  border duration-200 ease-in-out 
                 border-gray-600 transition"
            >
              Previous
            </button>
            <div className="flex-auto flex flex-row-reverse">
              <button
                className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                 hover:bg-teal-600  
                 bg-teal-600 
                 text-teal-100 
                border duration-200 ease-in-out 
                 border-teal-600 transition"
              >
                Next
              </button>
              <button
                className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-200  
        bg-teal-100 
        text-teal-700 
        border duration-200 ease-in-out 
        border-teal-600 transition"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
