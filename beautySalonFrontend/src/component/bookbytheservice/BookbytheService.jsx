/* eslint-disable no-unused-vars   */
import FullCalendar from "@fullcalendar/react";
import daygidplugin from "@fullcalendar/daygrid";
import timegridplugin from "@fullcalendar/timegrid";
import interactionplugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { customeraction } from "../../../store/customerStore";
import axios from "axios";
import apiUrl from "../../config/config";
import "./bookbyservicestitle.css";

function BookbytheService() {
  const { salon_with_in_range } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { price, serviceName, salonNames, salonId } = useParams();
  const [dates, setdates] = useState();
  const [booking, setbooking] = useState([]);
  const navigation = useNavigate();
  // run after click on the calender
  const onclickdate = (data) => {
    const date = new Date(data.dateStr);
    if (date.getTime() < Date.now()) {
      alert("Please not select previous time");
      return;
    }
    window.scrollTo(0, 700);
    setdates(data.dateStr);
  };
  const handleServices = () => {
    const serivcesData = {
      date: dates,
      salonNames,
      price,
      serviceName,
      salonId,
    };
    console.log(serivcesData);
    if (serivcesData.date === undefined) {
      alert("Please Enter All detail");
      return;
    }
    dispatch(customeraction.handlebookData(serivcesData));
    navigation("/paymentdeatails");
  };

  const fetchBookingDetailForSalon = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/v1/booked/getSalon/${salonId}`
      );
      const scheduleArray = res.data.bookingDetails.map((el) => {
        const obj = {};
        (obj.title = "Booked"), (obj.start = el.serviceDateAndTime);
        obj.color = "#ff0001";
        return obj;
      });
      setbooking(scheduleArray);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // fetchSalonWithIn();
    fetchBookingDetailForSalon();
  }, []);

  return (
    <div className="booking-detail-container bg-gradient-to-t from-rose-100 to-rose-400">
      <div className="booking-subdetails-container py-10">
        <div className="bookheading">
          <h1 className="text-3xl font-bold text-white">{serviceName}</h1>
        </div>
        <hr />
        <div className="bookingdeatils flex flex-row justify-between">
          <div className="booking_timing">
            <div className="select-dateand-time text-xl font-bold border-b  text-rose-500">
              Select Date
            </div>
            <FullCalendar
              plugins={[daygidplugin, timegridplugin, interactionplugin]}
              initialView="timeGridDay"
              headerToolbar={{
                start: "title",
                center: "today,prev,next",
                // end: 'dayGridMonth,timeGridWeek,timeGridDay'
                end: "timeGridWeek,timeGridDay",
              }}
              dateClick={onclickdate}
              height={400}
              validRange={{
                start: new Date().toISOString().split("T")[0], // Disable past dates
              }}
              events={booking}
            />
          </div>
        </div>
        <hr />
        <div className="total-amount mt-10">
          <div className="heading flex justify-center">
            <div className="text-3xl  font-bold border-b-2 border-rose-500 w-fit">
              Book Summary
            </div>
          </div>
          <div className=" lg:flex lg:justify-between md:flex md:justify-between sm:flex sm:justify-between mt-12">
            <div className=" mt-12 lg:w-1/2 md:w-1/3 sm:w-1/3">
              <div className="flex justify-between   ">
                <div className="  text-xl font-bold border-b-2 border-rose-500">
                  Service Name
                </div>
                <div className="  text-xl font-bold border-b-2 border-rose-500">
                  Amount
                </div>
              </div>
              <div className="flex justify-between  mt-5">
                <div className="servicename  text-gray-500  font-bold">
                  {serviceName}
                </div>
                <div className="amount  text-gray-500 font-bold">{price}</div>
              </div>
              <div className="flex justify-between  mt-20 border-t-2 border-rose-500">
                <div className="servicename  font-bold">Total</div>
                <div className="amount  font-bold">{price}</div>
              </div>
            </div>
            <div className="mt-12 lg:w-1/3 md:w-1/2 sm:w-1/2 ">
              <span className="text-xl  font-bold border-rose-500  border-b-2 ">
                Summary
              </span>
              <div className="mt-5">
                <p>
                  <span className="font-bold ">Date and Time</span> :
                  {dates?.split("T")[0]}-[{dates?.split("T")[1].slice(0, 5)}]{" "}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-bold ">Salon Name </span>: {salonNames}
                </p>
              </div>
            </div>
          </div>
          <div className="click_payment  mt-20">
            <button
              className="text-white bg-rose-500  py-3 rounded-3xl px-8 cursor-pointer font-bold"
              onClick={handleServices}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookbytheService;
