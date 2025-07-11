import React from "react";

const Login = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <main className="">
        <h1 className="h-[120px]"></h1>
        <div className="container flex mx-auto w-[60vw] h-[50vh] text-white">
          <div className="w-1/2 flex flex-col justify-center p-6 gap-5">
            <h1 className="font-bold text-5xl">Your day,perfectly planned.</h1>
            <p className="text-2xl">
              Plan smarter, live better. TimeNest creates your perfect day using
              AI.
            </p>
          </div>
          <div className=" w-1/2 flex items-center justify-center">
            <div>Login Username Password</div>
            <div>
              Sign in with google
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
