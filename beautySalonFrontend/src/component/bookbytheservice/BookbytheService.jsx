import FullCalendar from '@fullcalendar/react'
import daygidplugin from '@fullcalendar/daygrid'
import timegridplugin from '@fullcalendar/timegrid'
import interactionplugin from '@fullcalendar/interaction'
import { Link } from 'react-router-dom'

function BookbytheService() {

  const onclickdate = (data) => { console.log(data.date) }
  
  return (
    <div className='booking-detail-container bg-gradient-to-t from-rose-100 to-rose-400'>
      <div className="booking-subdetails-container py-10">
        <div className="bookheading">
          <h1 className='text-3xl font-bold text-white'>Body Massage</h1>
        </div>
        <hr />
        <div className="bookingdeatils flex flex-row justify-between">
          <div className="booking_timing">
            <div className="select-dateand-time text-xl font-bold border-b w-fit text-rose-500">
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
            />
          </div>
          <div className="salon-list bg-white ">
            <div className="select-dateand-time text-xl font-bold border-b w-fit text-rose-500 ml-5 mt-5">
              Select Salon
            </div>
            <select className='select-salon ml-5 mt-5' name="" id="">
              <option value="">--Select your favroit salon--</option>
              <option value="Balbeer">Baalbeer</option>
            </select>
          </div>
        </div>
        <hr />
        <div className="total-amount mt-20">
          <div className="heading flex justify-center">
            <div className='text-3xl font-bold border-b-2 border-rose-500 w-fit'>Total Amount</div>
          </div>

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
                Body Massage
              </div>
              <div className='amount text-gray-500 font-bold'>
                550
              </div>
            </div>
            <div className=" total_flex mt-20 border-t-2 border-rose-500">
              <div className="servicename  font-bold">
                Total
              </div>
              <div className='amount  font-bold'>
                550
              </div>
            </div>

            <div className="click_payment ml-10 mt-20">
              <Link to={'/paymentdeatails'} className='text-white bg-rose-500 p-4 rounded-3xl px-8 cursor-pointer font-bold'>Proceed</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookbytheService
