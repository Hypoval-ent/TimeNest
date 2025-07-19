"use client";
import React from "react";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Timetable from "@/app/timetable/Timetable";
import Formwrapper from "@/components/Formwrapper";
const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login"); // or show a toast, etc
    }
  }, [status, session, router]);
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <nav className="flex justify-around">
          <span className="text-white text-5xl">TimeNest</span>

          {session && (
            <span className="flex gap-3">
              <button
                type="button"
                className="text-gray-900 bg-white  hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 font-light flex items-center gap-2"
              >
                <Image
                  className="inline"
                  src={session.user.image}
                  width={20}
                  height={20}
                  alt="Picture of the author"
                />
                {session.user.name}
              </button>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                }}
                type="button"
                className="text-gray-900 bg-white  hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 font-light"
              >
                SignOut
              </button>
            </span>
          )}
        </nav>
        <div className="flex w-full h-full pt-5 gap-5">
          <div className="w-1/4 text-white">
            <h2 className="text-xl font-semibold text-center mb-1.5">Create Your Schedule</h2>
              <Formwrapper />
          </div>
          <div className="w-3/4">
            <Timetable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
