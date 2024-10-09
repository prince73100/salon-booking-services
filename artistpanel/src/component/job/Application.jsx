import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { authuseraction } from '../../../store'
import { useNavigate } from 'react-router-dom';
function Application() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(authuseraction.updateappdata(data))
    navigate('/review')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" w-4/5 absolute top-28 left-12 rounded  border border-gray-900/10 p-12">
      <h2 className="text-base  leading-7 text-gray-900 text-center text-4xl font-bold">Application Form</h2>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
            Full Name
          </label>
          <div className="mt-2">
            <input
              id="first-name"
              {...register("fullname", { required: true })}
              type="text"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...register("email", { required: true })}
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
            Experience
          </label>
          <div className="mt-2">
            <select
              id="country"
              {...register("experience", { required: true })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="fresher">Fresher</option>
              <option value="0-1 year">0-1 Year</option>
              <option value="1-10 year">1-10 Year</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
            Current Location
          </label>
          <div className="mt-2">
            <input
              id="street-address"
              {...register("currentLocation", { required: true })}
              type="text"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
           Phone Number
          </label>
          <div className="mt-2">
            <input
              id="street-address"
              {...register("phonenumber", { required: true })}
              type="text"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
            Past Barber
          </label>
          <div className="mt-2">
            <input
              id="city"
              {...register("pastbarber", { required: true })}
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
            Education
          </label>
          <div className="mt-2">
            <input
              id="region"
              {...register("education", { required: true })}
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        

        <div className="sm:col-span-2">
          <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
            Expected Salary
          </label>
          <div className="mt-2">
            <input
              id="postal-code"
              {...register("expectedsalary", { required: true })}
              type="text"
              autoComplete="postal-code"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div >
          <button className="bg-rose-500 px-4 py-2 text-lg font-bold text-white rounded-lg" type='submit'>Proceed</button>
        </div>
      </div>
    </form>
  )
}


export default Application
