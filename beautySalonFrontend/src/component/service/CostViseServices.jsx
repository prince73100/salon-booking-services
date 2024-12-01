/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Sercomponents } from "./Servicepage";


function CostViseServices() {
  const { services_provide, AllSerivces } = useSelector((store) => store.user);
  const firstSelectitem = localStorage.getItem("selectItem");
  const salonid = JSON.parse(localStorage.getItem("salonId"));
  const [category, setCategory] = useState([]);
  const [bgColor, setbgColor] = useState("");

  console.log(firstSelectitem);

  const handleFilterServices = (selectitem) => {
    const filteredService = JSON.parse(
      localStorage.getItem("servceswithinrange")
    )?.filter((el) => el.serviceName === selectitem);
    // const filteredService = AllSerivces?.filter((el) => el.serviceName === servicename)
    console.log(filteredService);
    setCategory(filteredService);
    setbgColor(selectitem);
  };

  useEffect(() => {
    const firstfiltercateroyproduct = (firstSelectitem) => {
      const filteredService = JSON.parse(
        localStorage.getItem("servceswithinrange")
      )?.filter((el) => el.serviceName === firstSelectitem);
      // const filteredService = AllSerivces?.filter((el) => el.serviceName === servicename)
      console.log(filteredService);
      setCategory(filteredService);
      setbgColor(firstSelectitem);
    };
    firstfiltercateroyproduct(firstSelectitem);
    window.scrollTo(0, 0);
  }, []);

  console.log(category);
  return (
    <div className="w-full bg-rose-100 pb-5">
      <div className="top_service_banner bg-rose-500">
        <h1 className="py-8 text-center text-4xl font-bold  text-white">
          Our Services
        </h1>
      </div>
      {/* <h1 className='pt-5 text-center text-5xl   pb-3'>Our Services</h1> */}
      <div className=" flex justify-center my-8">
        <div className=" lg:w-11/12 md:w-11/12 sm:w-11/12   lg:flex lg:justify-between md:flex md:justify-between sm:flex sm:justify-between">
          <div className="hidden lg:w-1/4 lg:bg-white lg:flex lg:justify-center lg:shadow-2xl lg:min-h-96 md:w-1/4 md:bg-white md:flex md:justify-center md:shadow-2xl md:min-h-96   sm:w-1/4 sm:bg-white sm:flex sm:justify-center sm:shadow-2xl sm:min-h-96">
            <ul className="w-10/12">
              {services_provide.map((el, index) => (
                <li
                  key={index}
                  className={`${
                    bgColor === el.serviceName ? "bg-rose-500 text-white" : ""
                  }  side-bar-list  py-1 px-2 my-4 font-blod  text-base cursor-pointer`}
                  onClick={() => handleFilterServices(el.serviceName)}
                >
                  {el.serviceName}
                </li>
              ))}
            </ul>
          </div>

          <div className="block lg:hidden md:hidden sm:hidden mt-10">
            <select
              name="Services"
              id="services"
              className=" py-2 border-none outline-none w-full "
              onChange={(e) => handleFilterServices(e.target.value)}
            >
              <option value="" disabled>
                --Select Services--
              </option>
              {services_provide.map((el, index) => (
                <option
                  className="  active:bg-rose-700 focus:bg-rose-600"
                  value={el.serviceName}
                  key={index}
                >
                  {el.serviceName}
                </option>
              ))}
            </select>
          </div>

          <div className=" w-full lg:w-2/3 md:w-2/3 sm:w-2/3  lg:flex lg:justify-start md:flex md:justify-start sm:flex sm:justify-start flex-wrap gap-x-5 ">
            {category.map((el, index) => (
              <Sercomponents
                key={index}
                item={el}
                ispriceDisplay={true}
                isSalonnameDisplay={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CostViseServices;
