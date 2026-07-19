import React from "react";
// import { Signup } from "./Signup/Signup";
import { useState } from "react";
import { Link } from "react-router";

export const Authform = ({type, onSubmit}) => {
  const isSignup = type == "signup";
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = isSignup
      ? { name: data.name, email: data.email, password: data.password }
      : { email: data.email, password: data.password };
      onSubmit(payload)
  };

  return (
    <div className=" xl:px-10 xl:w-full py-7 mb-10 mt-10 ">
      <div className="bg-[#04101f] border border-secondary xl:px-20 xl:py-10 p-7 w-[80%] mx-auto xl:mt-10 rounded-lg flex flex-col gap-10">
        <div>
          <h2 className="text-xl lg:text-3xl font-bold mb-3">Sign In</h2>
          <p className="text-sm text-s-primary sm:text-lg">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {isSignup && (
            <>
              <label className=" text-lg sm:text-xl ml-2 mb-1" htmlFor="">
                Name:
              </label>
              <input
                value={data.name || ""}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
                className="px-2 py-3 border rounded-md border-secondary bg-[#061628] outline-0 mb-5"
                type="text"
                placeholder="Enter your email"
              />
            </>
          )}
          <label className=" text-lg sm:text-xl ml-2 mb-1" htmlFor="">
            Email:
          </label>
          <input
            value={data.email || ""}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            className="px-2 py-3 border rounded-md border-secondary bg-[#061628] outline-0 mb-5"
            type="email"
            placeholder="Enter your email"
          />
          <label className="text-lg sm:text-xl ml-2 mb-1" htmlFor="">
            Password:
          </label>
          <input
            value={data.password || ""}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            className="px-2 py-3 border rounded-md border-secondary bg-[#061628] outline-0"
            type="password"
            placeholder="Enter your password"
          />
          {isSignup ? (
            <button
              type="submit"
              className="bg-primary mt-6 text-white px-4 py-2 rounded-sm hover:bg-primary/80"
            >
              Sign In
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary mt-6 text-white px-4 py-2 rounded-sm hover:bg-primary/80"
            >
              Sign In
            </button>
          )}
        </form>
        <p>
          {!isSignup
            ? `Don't have an account?${" "}`
            : `Already have an account?${" "}`}

          {isSignup ? (
            <Link className="text-primary" to="/login">
              Log in
            </Link>
          ) : (
            <Link className="text-primary" to="/signup">
              Sign up
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};
