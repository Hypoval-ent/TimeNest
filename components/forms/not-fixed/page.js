"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFixedTaskSchema } from "@/components/forms/schema";
import {
  setMustDoTask,
  deleteMustDoTask,
  setAllMustDoTasks,
} from "@/redux/tasks/task";
import { increment, decrement } from "@/redux/formcounter/counter";

const NotFixedTaskForm = () => {
  const dispatch = useDispatch();
  const mustDoTasks = useSelector((state) => state.tasks.mustDoTasks);
  const [isInitialized, setIsInitialized] = useState(false);
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
    if (isInitialized) {
      localStorage.setItem("mustDoTasks", JSON.stringify(mustDoTasks));
    }
  }, [mustDoTasks, isInitialized]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(notFixedTaskSchema),
  });
  const handleAddEvent = (data) => {
    const newEvent = {
      title: data.title,
      minTime: data.minTime,
    };
    dispatch(setMustDoTask(newEvent));
    reset();
  };
  const handleDelete = (title) => {
    dispatch(deleteMustDoTask(title));
  };
  const handleNext = () => {
    dispatch(increment());
  };

  const handleBack = () => {
    dispatch(decrement());
  };

  return (
    <main className=" text-white flex flex-col  mt-7">
      <h2 className="text-center text-lg font-semibold">
        Step-2 Add your not fixed task
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
          <div className="w-1/2 flex-1 mx-2">
            <label
              htmlFor="min-duration"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Minimum Duration (in minutes):
            </label>
            <input
              type="number"
              {...register("minTime")}
              id="min-duration"
              placeholder="e.g., 30"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {errors.minTime && (
              <p className="text-red-600 ml-2 mt-1">{errors.minTime.message}</p>
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
          {[...mustDoTasks].map((event) => (
            <li
              key={event.title}
              className="border border-gray-300 py-2 rounded bg-gray-100 flex justify-around items-center px-2 mx-2"
            >
              <span className="font-semibold w-1/3 text-center">
                {event.title}
              </span>
              <span className="w-1/3 text-center">{event.minTime} min</span>
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
      {/* Display previous and next buttons */}
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
            onClick={handleNext}
            className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                 hover:bg-teal-600  
                 bg-teal-600 
                 text-teal-100 
                border duration-200 ease-in-out 
                 border-teal-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFixedTaskForm;
