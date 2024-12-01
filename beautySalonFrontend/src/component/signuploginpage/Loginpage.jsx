/* eslint-disable no-unused-vars */
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { customeraction } from "../../../store/customerStore";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import apiUrl from "../../config/config";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Loginpage() {
  const { isregistered } = useSelector((store) => store.salon);

  const { register, handleSubmit } = useForm();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const login = async (data) => {
    setOpen(true);
    console.log(data);
    try {
      const res = await axios.post(`${apiUrl}/api/v1/user/login`, data);
      if (res.data.status === "success") {
        setOpen(false);
        const expireIn = Date.now() + 1 * 24 * 60 * 60 * 1000;
        const token = res.data.token;
        localStorage.setItem("jwt", token);
        localStorage.setItem("exipreIn", expireIn);
        localStorage.setItem("role", res.data.user.role);
        // for web socket
        // dispatch
        dispatch(customeraction.toUpdatestate(true));
        if (res.data.user.role === "artist") {
          navigation("/jobs");
        } else if (res.data.user.role === "salon") {
          navigation("/salonbusiness");
        } else if (res.data.user.role === "admin") {
          navigation("#");
        } else {
          navigation("/");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setOpen(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top (x, y)
  }, []);
  return (
    <div className="form flex justify-center mt-10 rounded-lg  ">
      <div className="shadow-lg shadow-rose-600/100 mt-8 w-full lg:w-1/2 md:w-3/4 sm:w-11/12">
        <div className="heading  pt-2 ">
          <h1 className=" text-center font-bold text-2xl">Login</h1>
        </div>
        <form onSubmit={handleSubmit(login)} className="flex justify-center">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-3/4 ">
            <div className="sm:col-span-6">
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="first-name"
                  autoComplete="given-name"
                  placeholder="Email-Id"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  {...register("email", { required: true })}
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <div className="mt-2 mb-4">
                <input
                  type="password"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  placeholder="Password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  {...register("password", { required: true })}
                />
              </div>
              <Link
                className="text-rose-500  font-bold my-10"
                to={"/forgetPassword"}
              >
                Forget your password?
              </Link>
            </div>
            <div className="sm:col-span-6">
              <div className="mt-2">
                <input
                  type="submit"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="  font-bold block cursor-pointer w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 bg-rose-500 "
                />
              </div>
            </div>
          </div>
        </form>
        <div className="sm:col-span-full mt-10 px-8 py-10">
          <p className="text-lg font-bold ">
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className="text-rose-500">
              Sign Up
            </Link>{" "}
          </p>
        </div>

        {/*  backdrop*/}
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* toaster */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Loginpage;
