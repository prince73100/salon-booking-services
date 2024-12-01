import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import daygidplugin from "@fullcalendar/daygrid";
import timegridplugin from "@fullcalendar/timegrid";
import interactionplugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { customeraction } from "../../../store/customerStore";
function Servicebookdetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onclickdate = (data) => {
    console.log(data.date);
    dispatch(customeraction.toUpdateAppoinrment(data));
    navigate("/appoitment");
  };

  return (
    <div className="stepbar">
      <div className="sub-step-bar bg-pink-700 h-20">
        <div className="ml-10 text-white">
          <span className="">
            {" "}
            <Link to={"/"}>Home</Link>{" "}
          </span>{" "}
          / Book <br />
          <div className="booking mt-3 font-bold">Booking</div>
        </div>
      </div>
      <FullCalendar
        plugins={[daygidplugin, timegridplugin, interactionplugin]}
        initialView="timeGridDay"
        headerToolbar={{
          start: "title",
          center: "today,prev,next",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dateClick={onclickdate}
        height={400}
        validRange={{
          start: new Date().toISOString().split("T")[0], // Disable past dates
        }}
        events={[
          {
            title: "Booked",
            start: "2024-10-15T10:00:00", // Booked start time
            end: "2024-10-15T11:00:00", // Booked end time
            color: "#ff0000", // Red color to highlight booked slots
          },
        ]}
      />
    </div>
  );
}

export default Servicebookdetail;
