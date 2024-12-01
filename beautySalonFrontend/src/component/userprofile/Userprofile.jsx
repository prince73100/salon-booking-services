/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import apiUrl from "../../config/config";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { customeraction } from "../../../store/customerStore";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Userprofile() {
  const { profilename } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("currentuser"));
  const token = localStorage.getItem("jwt");
  const [open, setOpen] = React.useState(false);
  const nameref = useRef();
  const emailref = useRef();
  const phoneref = useRef();

  const [open1, setOpen1] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdituserdata = async () => {
    setOpen1(true);
    const data = {
      firstname: nameref.current.value,
      email: emailref.current.value,
      phone: phoneref.current.value,
    };
    console.log(nameref.current.value);
    try {
      const updateUser = await axios.post(
        `${apiUrl}/api/v1/user/updateMe`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (updateUser.data.status === "success") {
        console.log(updateUser);
        setOpen1(false);
        setOpen(false);
        localStorage.setItem(
          "currentuser",
          JSON.stringify(updateUser.data.updateUser)
        );
        let firstchar = updateUser.data.updateUser.firstname
          .charAt(0)
          .toUpperCase();
        dispatch(customeraction.toupdateProfile(firstchar));
      }
    } catch (error) {
      setOpen1(false);
      alert(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="h-96 my-32 lg:h-96 lg:my-32 md:h-96 md:my-28 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-rose-200 rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-rose-700">
            <h2 className="text-xl text-black font-bold">Profile</h2>
            <button
              className="bg-rose-600 active:bg-rose-900 text-white px-4 py-2 rounded-md"
              onClick={handleClickOpen}
            >
              Edit Profile
            </button>
          </div>

          {/* Profile Details */}
          <div className="flex flex-col md:flex-row items-center md:items-start px-6 py-6">
            {/* Profile Picture and Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-black font-bold">
                  {profilename}
                </div>
                {/* <button className="absolute bottom-0 right-0 bg-gray-600 p-1 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M17.414 3.586a2 2 0 10-2.828-2.828l-9 9a2 2 0 00-.586 1.414V14a2 2 0 002 2h2a2 2 0 001.414-.586l9-9zM15 7l2 2M4 16h3" />
                                    </svg>
                                </button> */}
              </div>

              <h3 className="mt-4 text-lg font-bold">{currentUser.email}</h3>
              {/* <p className="mt-1 text-sm text-gray-400">Current POTD Streak</p> */}
              {/* <div className="mt-2 flex items-center gap-1 text-sm font-semibold">
                                <span className="text-green-400">00</span>/1209 days
                            </div> */}
            </div>

            {/* Institution and Stats */}
            <div className="flex-1 mt-6 md:mt-0 md:ml-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold text-black">
                    Baisc Information
                  </h4>
                  <p className="text-base font-medium mt-1">
                    Name: <span>{currentUser.firstname}</span>
                  </p>
                  <p className=" mt-1">
                    Role: <span>{currentUser.role}</span>
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-black">
                    Contact Information
                  </h4>
                  <p className=" mt-1">
                   <span> Email:</span> <span>{currentUser.email}</span>
                  </p>
                  <p className=" mt-1">
                    Mobile No: <span>{currentUser.phone}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontFamily: "serif", fontWeight: "700" }}
        >
          {"Edit your Profile"}
        </DialogTitle>
        <div className="w-full flex justify-center my-2">
          <div className="w-11/12">
            <Box sx={{ width: 500, maxWidth: "99%", margin: "10px 0" }}>
              <TextField
                fullWidth
                label="Name"
                id="fullWidth"
                defaultValue={currentUser.firstname}
                inputRef={nameref}
              />
            </Box>
            <Box sx={{ width: 500, maxWidth: "99%", margin: "10px 0" }}>
              <TextField
                fullWidth
                label="Email"
                id="fullWidth"
                defaultValue={currentUser.email}
                inputRef={emailref}
              />
            </Box>
            <Box sx={{ width: 500, maxWidth: "99%", margin: "10px 0" }}>
              <TextField
                fullWidth
                label="Mobile No"
                id="fullWidth"
                defaultValue={currentUser.phone}
                inputRef={phoneref}
              />
            </Box>
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: "#FF1E1D",
                  color: "white",
                  fontFamily: "serif",
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEdituserdata}
                sx={{
                  backgroundColor: "#F33A6A",
                  color: "white",
                  fontFamily: "serif",
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Edit
              </Button>
            </DialogActions>
          </div>
        </div>
      </Dialog>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open1}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Userprofile;

