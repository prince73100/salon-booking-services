/* eslint-disable no-unused-vars   */
import FullCalendar from '@fullcalendar/react'
import daygidplugin from '@fullcalendar/daygrid'
import timegridplugin from '@fullcalendar/timegrid'
import interactionplugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { customeraction } from '../../../store/customerStore'
import axios from 'axios'

function BookbytheService() {
  const { salon_with_in_range } = useSelector(store => store.user)
  const dispatch = useDispatch()
  const { price, serviceName, salonNames } = useParams()
  const [dates, setdates] = useState()
  const [salonName, setsalonName] = useState('')
  const navigation = useNavigate()

  // run after click on the calender
  const onclickdate = (data) => {
    const date = new Date(data.dateStr)
    if (date.getTime() < Date.now()) {
      alert("Please not select previous time")
      return
    }
    setdates(data.dateStr)
    console.log(data)
  }
  const handleServices = () => {
    const serivcesData = {
      date: dates,
      salonNames,
      price,
      serviceName
    }
    if (serivcesData.date === "") {
      alert("Please Enter All detail")
      return
    }
    dispatch(customeraction.handlebookData(serivcesData))
    navigation('/paymentdeatails')
  }
  // fetch all salon with in range
  const fetchSalonWithIn = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/salon/findSalon_with-in/distance/5/center/27.2072704,78.0468224`)
      dispatch(customeraction.tosalonhandle(res.data.response))
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top (x, y)
  }, []);

  useEffect(() => {
    fetchSalonWithIn()
  }, []);

  return (
    <div className='booking-detail-container bg-gradient-to-t from-rose-100 to-rose-400'>
      <div className="booking-subdetails-container py-10">
        <div className="bookheading">
          <h1 className='text-3xl font-bold text-white'>{serviceName}</h1>
        </div>
        <hr />
        <div className="bookingdeatils flex flex-row justify-between">
          <div className="booking_timing">
            <div className="select-dateand-time text-xl font-bold border-b  text-rose-500">
              Select Date
            </div>
            <  FullCalendar
              plugins={[daygidplugin, timegridplugin, interactionplugin]}
              initialView='timeGridDay'
              headerToolbar={{
                start: 'title',
                center: 'today,prev,next',
                end: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              dateClick={onclickdate}
              height={400}
              validRange={{
                start: new Date().toISOString().split("T")[0], // Disable past dates
              }}
            />
          </div>
          {/* <div className="salon-list bg-white ">
            <div className="select-dateand-time text-xl font-bold border-b w-fit text-rose-500 ml-5 mt-5">
              Select Salon
            </div>
            <select className='select-salon ml-5 mt-5' name="" id="" onChange={(e) => setsalonName(JSON.parse(e.target.value).salonName)}>
              <option value="--Select your favroit salon--">--Select your favroit salon--</option>
              {salon_with_in_range?.map((item, index) => <option key={index} value={JSON.stringify({ id: item._id, salonName: item.salonName })}>{item.salonName}</option>)}
            </select>

          </div> */}
        </div>
        <hr />
        <div className="total-amount mt-10">
          <div className="heading flex justify-center">
            <div className='text-3xl font-bold border-b-2 border-rose-500 w-fit'>Book Summary</div>
          </div>
          <div className='flex justify-between mt-10'>
            <div className="total_amount_details">
              <div className="total_flex ">
                <div className="servicename text-xl font-bold border-b-2 border-rose-500">
                  Service Name
                </div>
                <div className='amount text-xl font-bold border-b-2 border-rose-500'>
                  Amount
                </div>
              </div>
              <div className="total_amount total_flex mt-5">
                <div className="servicename text-gray-500  font-bold">
                  {serviceName}
                </div>
                <div className='amount text-gray-500 font-bold'>
                  {price}
                </div>
              </div>
              <div className=" total_flex mt-20 border-t-2 border-rose-500">
                <div className="servicename  font-bold">
                  Total
                </div>
                <div className='amount  font-bold'>
                  {price}
                </div>
              </div>

              <div className="click_payment ml-10 mt-20">
                <button className='text-white bg-rose-500 p-4 rounded-3xl px-8 cursor-pointer font-bold' onClick={handleServices}>Proceed</button>
              </div>
            </div>
            <div className=''>
              <h1 className='text-xl font-bold border-b-2 border-rose-500'>Summary</h1>
              <div className='mt-5'>
                <p><span className='font-bold'>Date and Time</span> :{dates?.split('T')[0]}-[{dates?.split('T')[1].slice(0, 5)}] </p>
              </div>
              <div>
                <p><span className='font-bold'>Salon Name </span>: {salonNames}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookbytheService
