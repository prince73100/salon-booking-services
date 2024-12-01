/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { serviceAction } from "../../../../store/salonSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiUrl from "../../../config/config.js";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { BallTriangle } from "react-loader-spinner";
import uploadimgaria from "../../../assets/upload_area.svg";
import { LiaEditSolid } from "react-icons/lia";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Addservices() {
  const { service, isupdate } = useSelector((store) => store.salon);
  const [open, setOpen] = React.useState(false);
  const [isload, setisload] = useState(false);
  const [dataforEdit, setDataforEdit] = useState({});
  // console.log(service)
  const token = localStorage.getItem("jwt");
  const serviceRef = useRef();
  const priceRef = useRef();
  const [imagePath, setImagePath] = useState("");
  const forupdateref = useRef();

  const [enadleeditdialog, setEnadleeditdialog] = React.useState(false);

  const languages = [
    "Waxing",
    "Hair Cuts",
    "Hair Color",
    "Facial",
    "Bleach",
    "Hair Spa",
    "Botox Treatment",
    "Cut",
    "Balayage",
  ];

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value.length > 0) {
      const filteredSuggestions = languages.filter((language) =>
        language.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const handleDeleteServices = async (serviceId) => {
    setOpen(true);
    try {
      if (serviceId) {
        const res = await axios.delete(
          `${apiUrl}/api/v1/salon/deleteservices/${serviceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === "success") {
          setOpen(false);
          dispatch(serviceAction.deleteServices(serviceId));
        }
      } else {
        alert("please provide service id");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddService = async () => {
    setOpen(true);
    const services = serviceRef.current.value;
    const price = priceRef.current.value;
    let isexist = false;
    if (!imagePath) {
      alert("Please select an image file.");
      setOpen(false);
      return;
    }
    service.forEach((element) => {
      if (element.serviceName === services) {
        isexist = true;
      }
    });
    if (!isexist) {
      const formdata = new FormData();
      formdata.append("serviceName", services);
      formdata.append("price", price);
      formdata.append("image", imagePath);
      const servicesResult = await axios.post(
        `${apiUrl}/api/v1/salon/addServices`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      serviceRef.current.value = "";
      priceRef.current.value = "";
      if (servicesResult.data.status === "success") {
        setQuery("");
        setImagePath("");
        setOpen(false);
        dispatch(serviceAction.addService(servicesResult.data.newServices));
      }
    } else {
      serviceRef.current.value = "";
      priceRef.current.value = "";
      setQuery("");
      setImagePath("");
      setOpen(false);
      toast.error(`${services} is already added in the list.`);
    }
  };

  const fetchAllServices = async () => {
    setisload(true);
    const res = await axios.get(`${apiUrl}/api/v1/salon/getservices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.status === "success") {
      setisload(false);
      dispatch(serviceAction.handleAllServices(res.data.allServices));
    }
  };
  useEffect(() => {
    fetchAllServices();
  }, [service.length, isupdate]);

  const handleClickOpen = (id, price) => {
    setDataforEdit({ id, price });
    setEnadleeditdialog(true);
  };

  const handleClose = () => {
    setEnadleeditdialog(false);
  };

  const handleEditpriceorImages = async () => {
    const data = {
      price: forupdateref.current.value,
      id: dataforEdit.id,
    };
    const response = await axios.post(
      `${apiUrl}/api/v1/salon/updateserviceprice`,
      data
    );
    setEnadleeditdialog(false);
    dispatch(serviceAction.handleIsupdate(!isupdate));
  };
  return (
    <>
      <div className="registered-business-container mt-20">
        <div className="flex justify-center">
          <h1 className="w-11/12 py-2 sm:w-full bg-rose-500 text-center  text-4xl font-bold sm:py-5 text-white">
            My Services
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="w-10/12 lg:flex lg:justify-evenly md:flex md:justify-evenly gap-x-20">
            <div className=" lg:w-1/3 md:w-1/3  ">
              <h1 className="lg:text-start lg:text-start text-center text-3xl  lg:text-3xl md:text-3xl  font-bold pt-10">
                My Services
              </h1>

              <div className="flex justify-center mt-10">
                {isload && (
                  <BallTriangle
                    height={80}
                    width={100}
                    radius={5}
                    color="#FF007F"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                )}
              </div>

              {!isload && (
                <div>
                  {service?.length === 0 && (
                    <div className="mt-10  font-semibold lg:text-start lg:text-start text-center">
                      No any services add yet
                    </div>
                  )}
                  {service.map((ser, index) => (
                    <div
                      className="flex justify-between items-center mt-5"
                      key={index}
                    >
                      <img
                        src={ser.image}
                        alt="image"
                        style={{ width: "50px", height: "50px" }}
                      />
                      <h1 className=" text-xl font-bold">{ser.serviceName}</h1>
                      <h2 className=" text-xl font-bold">{ser.price}</h2>
                      <div className="flex justify-center items-center gap-x-2">
                        <LiaEditSolid
                          size={24}
                          color="green"
                          className="cursor-pointer"
                          onClick={() => handleClickOpen(ser._id, ser.price)}
                        />
                        <RiDeleteBin5Line
                          size={24}
                          className="cursor-pointer"
                          color="red"
                          onClick={() => handleDeleteServices(ser._id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className=" lg:w-1/3 md:w-1/3">
              <h1 className="   text-3xl font-bold pt-10 lg:text-start lg:text-start text-center ">
                Enter Services
              </h1>
              <div className="relative form-content mt-5">
                <label htmlFor="serviceName" className=" text-xl font-bold">
                  Services
                </label>
                <div className="mt-2  bg-white rounded mb-2 border">
                  <input
                    type="text"
                    placeholder="Enter services name"
                    className="px-4 py-2 outline-none border-0"
                    onChange={handleChange}
                    value={query}
                    ref={serviceRef}
                  />
                </div>
                {suggestions.length > 0 && (
                  <ul className="absolute w-full mt-2 border-2 border-rose-300 rounded bg-white   ">
                    {suggestions.map((suggestion, index) => (
                      <li
                        className=" hover:cursor-pointer hover:bg-rose-400 px-8 py-2"
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
                <label htmlFor="serviceName" className=" text-xl font-bold">
                  Price
                </label>
                <div className="mt-2  bg-white rounded border mb-4">
                  <input
                    type="number"
                    placeholder="Enter Price"
                    className="px-4 py-2 outline-none border-0"
                    ref={priceRef}
                  />
                </div>
                <label htmlFor="serviceName" className=" text-xl font-bold">
                  Upload Image
                </label>
                <div className="mt-2 bg-white rounded">
                  <label htmlFor="upload-image">
                    <img
                      src={
                        imagePath
                          ? URL.createObjectURL(imagePath)
                          : uploadimgaria
                      }
                      alt=""
                      width={70}
                      height={50}
                      className="cursor-pointer"
                    />
                  </label>
                  <input
                    type="file"
                    placeholder="Enter Price"
                    className=" py-2 outline-none border-0"
                    onChange={(e) => setImagePath(e.target.files[0])}
                    id="upload-image"
                    hidden
                  />
                </div>
                <button
                  className="mt-10 px-20 block cursor-pointer rounded-md border-0 py-1.5 text-white sm:text-sm sm:leading-6  bg-rose-500"
                  onClick={handleAddService}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* loader */}
      {/*  backdrop*/}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* toaster */}
      <ToastContainer />

      {/* dialog box */}

      <Dialog
        open={enadleeditdialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Price"}</DialogTitle>
        <div className="w-full flex justify-center my-2">
          <div className="w-11/12">
            <Box sx={{ width: 500, maxWidth: "99%", margin: "10px 0" }}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                id="fullWidth"
                defaultValue={dataforEdit.price}
                inputRef={forupdateref}
              />
            </Box>

            {/* <Box sx={{ width: 500, maxWidth: "99%", margin: "10px 0" }}>
              <TextField
                fullWidth
                type="file"
                id="fullWidth"
                defaultValue={""}
                inputRef={""}
              />
            </Box> */}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEditpriceorImages} autoFocus>
                Edit
              </Button>
            </DialogActions>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Addservices;
