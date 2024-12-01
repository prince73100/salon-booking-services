/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch } from "react-redux";
import { customeraction } from "../../../store/customerStore";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Divider from "@mui/material/Divider";
import { LuLogOut } from "react-icons/lu";

function Profile({ name, lastname, email }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const onLogout = () => {
    dispatch(customeraction.toUpdatestate(undefined));
    dispatch(customeraction.toUpdateToken(""));
    localStorage.removeItem("jwt");
    localStorage.removeItem("exipreIn");
    localStorage.removeItem("role");
    localStorage.removeItem("currentuser");
    navigation("/login");
  };

  return (
    <div className="bg-slate-50 w-72 text-center rounded-lg">
      <div className="border-t-4 border-rose-700 py-4 px-5">
        <Link
          className="flex justify-start items-center gap-x-5 py-2 hover:cursor-pointer"
          to={"/profile"}
        >
          <CgProfile />
          <p>Profile</p>
        </Link>
        <Divider />
        <div
          className="flex justify-start items-center gap-x-5 py-2 hover:cursor-pointer"
          onClick={onLogout}
        >
          <LuLogOut />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
