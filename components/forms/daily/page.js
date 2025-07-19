"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { dailyTaskSchema } from "../schema";
import {
  setDailyTask,
  deleteDailyTask,
  setAllDailyTasks,
  setAllFixedTasks,
  setAllMustDoTasks,
} from "@/redux/tasks/task";
import { decrement } from "@/redux/formcounter/counter";
import { setGeneratedEvents } from "@/redux/calendar/calendar";
import { generateSchedule } from "@/lib/useGeminischedule";
import { buildPrompt } from "@/lib/propmtbuilder";

const DailyTaskForm = () => {
  const dispatch = useDispatch();
  const dailyTasks = useSelector((state) => state.tasks.dailyTasks);
  const fixedTasks = useSelector((state) => state.tasks.fixedTasks);
  const mustDoTasks = useSelector((state) => state.tasks.mustDoTasks);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("fixedTasks");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch(setAllFixedTasks(parsed));
      } catch (e) {
        console.error("Invalid fixedTasks in localStorage");
      }
    }
    setIsInitialized(true);
  }, [dispatch]);
  useEffect(() => {
    const stored = localStorage.getItem("mustDoTasks");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch(setAllMustDoTasks(parsed));
      } catch (e) {
        console.error("Invalid mustDoTasks in localStorage");
      }
    }
    setIsInitialized(true);
  }, [dispatch]);
  useEffect(() => {
    const stored = localStorage.getItem("dailyTasks");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch(setAllDailyTasks(parsed));
      } catch (e) {
        console.error("Invalid dailyTasks in localStorage");
      }
    }
    setIsInitialized(true);
  }, [dispatch]);
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
    }
  }, [dailyTasks, isInitialized]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dailyTaskSchema),
  });

  const handleAddEvent = (data) => {
    const newEvent = {
      title: data.title,
      afterTime: data.afterTime,
    };
    dispatch(setDailyTask(newEvent));
    reset();
  };
  const handleDelete = (title) => {
    dispatch(deleteDailyTask(title));
  };
  const handleBack = () => {
    dispatch(decrement());
  };
  const handleGenerate = async () => {
    setLoading(true);

    // Cleaner function to strip Markdown wrapping
    const cleanGeminiJsonOutput = (text) => {
      if (!text || typeof text !== "string") return null;

      return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    };

    try {
      const prompt = buildPrompt(fixedTasks, mustDoTasks, dailyTasks);
      const geminiResponse = await generateSchedule(prompt);
      const cleaned = cleanGeminiJsonOutput(geminiResponse);
      if (!cleaned) {
        throw new Error("Gemini response is empty or invalid");
      }
      let parsedEvents;
      try {
        parsedEvents = JSON.parse(cleaned);
      } catch (err) {
        console.error("❌ JSON.parse failed:", err);
        console.warn("💥 Cleaned Response Was:", cleaned);
        throw new Error("Failed to parse Gemini output. Check format.");
      }
      dispatch(setGeneratedEvents(parsedEvents));
      alert("✅ Schedule generated!");
    } catch (error) {
      console.error("❌ Schedule generation error:", error);
      alert("⚠️ Schedule generation failed. See console.");
    }

    setLoading(false);
  };
  return (
    <main className=" text-white flex flex-col  mt-7">
      <h2 className="text-center text-lg font-semibold">
        Step-3 Add your daily tasks
      </h2>
      <form onSubmit={handleSubmit(handleAddEvent)}>
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex-1 mx-2 svelte-1l8159u">
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
              <input
                type="text"
                {...register("title")}
                placeholder="Event Title"
                className="p-1 appearance-none outline-none w-full text-gray-800"
              />
              {errors.title && (
                <p className="text-red-600 ml-2">{errors.title.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row ">
          <div className="w-1/2 flex-1 mx-2 ">
            <label
              htmlFor="start-time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              After (any point of day)
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
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                {...register("afterTime")}
                id="start-time"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            {errors.afterTime && (
              <p className="text-red-600 ml-2 mt-1">
                {errors.afterTime.message}
              </p>
            )}
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
      </form>
      <div className="flex items-center mx-2 mb-2">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-xl">Your Events</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <div className="h-[26vh] overflow-y-auto [scrollbar-gutter:stable]">
        <ul className="space-y-2 text-black">
          {[...dailyTasks].map((event) => (
            <li
              key={event.title}
              className="border border-gray-300 py-2 rounded bg-gray-100 flex justify-around items-center px-2 mx-2"
            >
              <span className="font-semibold w-1/3 text-center">
                {event.title}
              </span>
              <span className="w-1/3 text-center">{event.afterTime}</span>
              <button
                onClick={() => handleDelete(event.title)}
                className="text-red-600 hover:text-red-800 font-semibold w-1/3 text-center"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Display Generate and next buttons */}
      <div className="flex p-2 mt-4">
        <button
          onClick={handleBack}
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
            onClick={handleGenerate}
            className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                 hover:bg-teal-600  
                 bg-teal-600 
                 text-teal-100 
                border duration-200 ease-in-out 
                 border-teal-600 transition"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default DailyTaskForm;
