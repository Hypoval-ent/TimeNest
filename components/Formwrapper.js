"use client";
import React from "react";
import FixedTaskForm from "./forms/fixedtask/page";
import Notfixed from "./forms/not-fixed/page";
import Daily from "./forms/daily/page";
import Rough from "./forms/Rough/page";
import { useState, useEffect } from "react";
import { setcounter } from "@/redux/formcounter/counter";
import { useSelector, useDispatch } from "react-redux";
const Formwrapper = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [isCounterLoaded, setIsCounterLoaded] = useState(false);

  // ✅ Load counter from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("counter");
    if (stored) {
      const parsed = Number(stored);
      if (!isNaN(parsed)) {
        dispatch(setcounter(parsed));
      } else {
        console.error("Invalid counter in localStorage");
      }
    }
    setIsCounterLoaded(true);
  }, [dispatch]);

  // ✅ Update localStorage whenever count changes
  useEffect(() => {
    localStorage.setItem("counter", JSON.stringify(count));
  }, [count]);

  // ✅ Render nothing until counter is loaded
  if (!isCounterLoaded) return null;
  return (
    <>
      <div className="mx-auto p-1">
        <div className="flex items-center">
          {/* Step 1 */}
          <div className="flex items-center relative">
            <div
              className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 
        ${
          count >= 0
            ? "bg-teal-600 border-teal-600 text-white"
            : "border-gray-300 text-gray-500"
        }`}
            >
              {/* User Icon */}
              <svg
                className="w-full h-full"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <div
              className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                count >= 0 ? "text-teal-600" : "text-gray-500"
              }`}
            >
              Step-1
            </div>
          </div>

          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
              count > 0 ? "border-teal-600" : "border-gray-300"
            }`}
          ></div>

          {/* Step 2 */}
          <div className="flex items-center relative">
            <div
              className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 
        ${
          count >= 1
            ? "bg-teal-600 border-teal-600 text-white"
            : "border-gray-300 text-gray-500"
        }`}
            >
              {/* Mail Icon */}
              <svg
                className="w-full h-full"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div
              className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                count >= 1 ? "text-teal-600" : "text-gray-500"
              }`}
            >
              Step-2
            </div>
          </div>

          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
              count > 1 ? "border-teal-600" : "border-gray-300"
            }`}
          ></div>

          {/* Step 3 */}
          <div className="flex items-center relative">
            <div
              className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 
        ${
          count >= 2
            ? "bg-teal-600 border-teal-600 text-white"
            : "border-gray-300 text-gray-500"
        }`}
            >
              {/* DB Icon */}
              <svg
                className="w-full h-full"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
            </div>
            <div
              className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                count >= 2 ? "text-teal-600" : "text-gray-500"
              }`}
            >
              Step-3
            </div>
          </div>
        </div>
      </div>
      {count === 0 && <FixedTaskForm />}
      {count === 1 && <Notfixed />}
      {count === 2 && <Daily />}
    </>
  );
};

export default Formwrapper;
