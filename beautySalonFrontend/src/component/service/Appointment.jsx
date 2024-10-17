/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { customeraction } from '../../../store/customerStore'
import { useId } from 'react'

function Appointment() {
  const { register, handleSubmit } = useForm()
  const { appointmentData, salon, services, selectserviceforbook, totalbookprice } = useSelector(store => store.user)
  const dispatch = useDispatch()

  const onhandleSubmit = (data) => {
    // console.log( typeof JSON.parse(data))
    console.log(data)
  }

  // handle get all services a salon 
  const onandleChange = (e) => {
    const salonid = e.target.value
    axios.get(`http://localhost:3000/api/v1/salon/getservice/${salonid}`).then((res) => {
      dispatch(customeraction.toserviceHandle(res.data.allServices))
    })
  }

  // for add services
  const onhandleSelectService = (e) => {
    dispatch(customeraction.toAddServiceforbooking(JSON.parse(e.target.value)))
  }

// Remove select services
  const hanleremoveService = (id, price) => {
    dispatch(customeraction.toRemoveService({ id: id, price: price }))
  }
 // For fetch all Salon
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/salon/getallsalon').then((res) => {
      dispatch(customeraction.tosalonhandle(res.data.getAllSalon))
    })
  }, [])

  return (
    <form onSubmit={handleSubmit(onhandleSubmit)} className="border-b relative left-10 border-gray-900/10 pb-12 mt-20 w-11/12">
      <h2 className=" font-bold leading-7 text-gray-900 text-center text-4xl border-b-2 pb-4">Book Appointment</h2>
      <div className="dtae mt-4 relative left-10 ">
        <h2 className='text-xl font-bold'>{appointmentData.dateStr?.substr(0, 10)}</h2>
      </div>
      <div className="flex justify-between">
        <div className=" w-1/2 mt-10 relative left-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Start-time
            </label>
            <div className="mt-2">
              <input
                id="first-name"
                name="starttime"
                type="Date"
                value={appointmentData.dateStr?.substr(0, 10)}
                {...register("starttime", { required: true })}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Select Salon
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="selectsalon"
                autoComplete="country-name"
                {...register("selectsalon", { required: true })}
                onChange={onandleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="">--select--</option>
                {salon.map((item) => <option key={item.salonName} value={item._id}>{item.salonName}</option>)}
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Duration
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="duration"
                autoComplete="country-name"
                {...register("duration", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>30 min</option>
                <option>1 hr</option>
                <option>2 hr</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Services
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="Service"
                {...register("Service", { required: true })}
                onChange={onhandleSelectService}
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="">--select--</option>
                {services?.map((item, index) => <option key={index} value={JSON.stringify({
                  id: Math.floor(Math.random()*100 + 1), service: item.serviceName
                  , price: item.price
                })} >{item.serviceName}</option>)}
              </select>
            </div>
          </div>
          <div className="sm:col-span-full sm:col-start-1">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              Appointment Notes
            </label>
            <div className="mt-2">
              <textarea
                id="city"
                name="appointment"
                type="text"
                {...register("appointment", { required: true })}
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2 sm:col-start-1">
            <div className="mt-2">
              <input
                id="city"
                name="appointment"
                type="submit"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-pink-700 text-white font-serif font-bold p-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="vertical ml-5  bg-slate-600 w-0.5" style={{ height: "425px", position: "absolute", top: "45px", left: "670px" }}>

        </div>
        <div className="appointmentreview w-2/5">
          <div className="paymentHeading">
            <h1 className='text-lg font-bold text-xl text-center border-b-4 border-black-300'>Total Amount</h1>
          </div>
          <div className="amountdetail grid grid-cols-3 mt-5">
            <div className="service font-bold text-xl">
              Service
            </div>
            <div className="amount font-bold text-xl">
              Amount
            </div>
          </div>
          {
            selectserviceforbook.map((item, index) => (
              <div className="amountdetail grid grid-cols-3 mt-5" key={index} >
                <div className="service  text-base">
                  {item.service}
                </div>
                <div className="amount  text-base">
                  {item.price}
                </div>
                <div className="deleteservice" style={{ color: 'red', cursor: 'pointer' }} onClick={() => hanleremoveService(item.id, item.price)} >X</div>
              </div>
            ))
          }
          <hr className='border-b mt-5' />
          <div className="totalcalculate">
            <div className="amountdetail grid grid-cols-2 mt-5">
              <div className="service  text-xl font-bold">
                Total
              </div>
              <div className="amount  text-xl">
                {totalbookprice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Appointment
