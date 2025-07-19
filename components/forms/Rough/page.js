// Highest priority
// object : Event title , start time and end time
"use client";
import { useState } from "react";
import React from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { fixedTaskSchema } from "@/components/forms/schema"; // Schema defined for my fixed task form
import { setFixedTask,deleteFixedTask } from "@/redux/tasks/task";

import { increment } from "@/redux/formcounter/counter";
export default function FixedTaskForm() {
  const dispatch = useDispatch();
  const fixedTasks = useSelector((state) => state.tasks.fixedTasks);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fixedTaskSchema),
  });
  const handleAddEvent = (data) => {
    const newEvent = { 
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
    };
    dispatch(setFixedTask(newEvent));
    reset();
  };
  const handleDelete = (title) => {
    dispatch(deleteFixedTask(title));
  };

  const handleNext = () => {
    console.log();
    dispatch(increment());
  };

  return (
    <>
      <div className="p-5">
        <div className="p-2">
          <form onSubmit={handleSubmit(handleAddEvent)} className="">
            <div>
              <div className="flex flex-col md:flex-row">
                <div className="w-full flex-1 mx-2 svelte-1l8159u">
                  <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                    <input
                      {...register("title")}
                      type="text"
                      placeholder="Event Title"
                      className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                    {errors.title && (
                      <p className="text-red-600 ml-2">
                        {errors.title.message}
                      </p>
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
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      {...register("startTime")}
                      id="start-time"
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  {errors.startTime && (
                    <p className="text-red-600 ml-2 mt-1">
                      {errors.startTime.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2 flex-1 mx-2 ">
                  <label
                    htmlFor="end-time"
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
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      {...register("endTime")}
                      id="end-time"
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  {errors.endTime && (
                    <p className="text-red-600 ml-2 mt-1">
                      {errors.endTime.message}
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
            </div>
          </form>
          <h6 className="text-xl p-2 mb-1">
            ------------ Your Events -----------
          </h6>
          <div className="h-[26vh] overflow-y-auto [scrollbar-gutter:stable]">
            <ul className="space-y-2 text-black">
              {[...fixedTasks]
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((event) => (
                  <li
                    key={event.title}
                    className="border border-gray-300 py-2 rounded bg-gray-100 flex justify-around items-center px-2 mx-2"
                  >
                    <span className="font-semibold w-1/3 text-center">
                      {event.title}
                    </span>
                    <span className="w-1/3 text-center">
                      {event.startTime} - {event.endTime}
                    </span>
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
        </div>
      </div>
    </>
  );
}
