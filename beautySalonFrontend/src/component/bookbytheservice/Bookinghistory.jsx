/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import apiUrl from "../../config/config";
export default function BasicTable() {
  const [bookDetail, setBookingDetail] = React.useState([]);
  const token = localStorage.getItem("jwt");

  const fetchAllBookingHistory = async () => {
    const result = await axios.get(
      `${apiUrl}/api/v1/booked/getbookingHistory`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBookingDetail(result.data.bookHistory);
    console.log(result);
  };

  useEffect(() => {
    fetchAllBookingHistory();
  }, []);

  return (
    <div className=" ">
      <div className="hidden sm:block sm:w-full sm:flex sm:justify-center sm:mt-20">
        <div className="w-11/12">
          <h1 className="bg-rose-700 text-center  text-2xl font-bold py-5 text-white">
            Booking History
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span className="text-lg font-bold">Service Name</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-lg font-bold">Price</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-lg font-bold">Payment method</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-lg font-bold">Salon Name</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-lg font-bold">Date and Time</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookDetail?.map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.serviceName}
                    </TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">
                      {item.ispayment ? (
                        <span className="text-green-500">Online pament</span>
                      ) : (
                        <span className="text-rose-500">Cash payment</span>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {item.salonID.salonName}
                    </TableCell>
                    <TableCell align="right">
                      {item.serviceDateAndTime?.split("T")[0]} |{" "}
                      {item?.serviceDateAndTime?.split("T")[1]?.slice(0, 5)}{" "}
                      <span>
                        {item.serviceDateAndTime
                          ?.split("T")[1]
                          ?.slice(0, 5)
                          ?.split(":")[0] >= 12
                          ? "PM"
                          : "AM"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="sm:hidden block mt-20">
        <h1 className="bg-rose-700 text-center  text-2xl font-bold py-5 text-white">
          Booking History
        </h1>
        <div className=" w-full h-full flex justify-center ">
          <div className="w-11/12  flex justify-center">
            <List sx={{ width: "90%", maxWidth: 360 }}>
              {bookDetail.map((item) => (
                <div className="border-b-2 border-rose-500" key={item._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={item?.salonID?.salonName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            <span className="text-base font-semibold text-rose-600">
                              {item?.serviceName}-{" "}
                            </span>
                          </Typography>
                          <span className="text-lg font-semibold">
                            <span className="pl-5">&#8377;</span>
                            {` ${item?.price}`}
                          </span>{" "}
                          <br />
                          <span className=" ">
                            <span className="text-rose-600 font-semibold">
                              Date and Time -{" "}
                            </span>{" "}
                            {item.serviceDateAndTime?.split("T")[0]} |{" "}
                            {item.serviceDateAndTime
                              ?.split("T")[1]
                              ?.slice(0, 5)}
                          </span>{" "}
                          <span>
                            {item.serviceDateAndTime
                              ?.split("T")[1]
                              ?.slice(0, 5)
                              ?.split(":")[0] >= 12
                              ? "PM"
                              : "AM"}
                          </span>{" "}
                          <br />
                          <span className="text-sm  font-bold text-rose-600">
                            Payment Method:{" "}
                            <span>
                              {item.ispayment ? (
                                <span className="text-green-700">
                                  Online pament
                                </span>
                              ) : (
                                <span className="text-black ">
                                  Cash payment
                                </span>
                              )}
                            </span>{" "}
                          </span>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </div>
              ))}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
}
