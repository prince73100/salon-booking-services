import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { serviceAction } from '../../../store';
function Signup() {
  const { register, handleSubmit } = useForm();
  const [status, setStatus] = useState('signup')
  const phoneRef = useRef()
  const passRef = useRef()
  const navigate = useNavigate()


  // for sign up handler
  const handleSubmits = async (data) => {
    try {
      const user = await axios.post('http://localhost:3000/api/v1/salon/signup', data)
      navigate('/login')
      console.log(user);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  const handleBgChange = () => {
    if (status === 'signup') {
      setStatus('signin')
    } else {
      setStatus('signup')
    }
  }

  const dispatch = useDispatch()
  const navigation = useNavigate()

  // for login handler
  const handleLogin = async () => {
    const contactNum = phoneRef.current.value
    const password = passRef.current.value

    if (contactNum === "" && password === "") {
      alert("Both field are require")
      return;
    }

    try {
      console.log(contactNum, password)
      await axios.post('http://localhost:3000/api/v1/salon/login', { phonenumber: contactNum, password: password })
        .then((res) => {
          const status = " " + res.data.status
          console.log(status)
          if (status.charAt(1) === '4') {
            alert(res.data.message)
          }
          else {
            dispatch(serviceAction.tosetstates("true"))
            localStorage.setItem('jwt_token', res.data.token);
            localStorage.setItem("states", true)
            navigation("/")
          }
        })
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className='flex justify-center bg-gray-200 '>
        <div className=' register-login flex mt-10  '>
          <div className={`${status === 'signin' ? 'bg-white' : 'bg-rose-500'}`}  >

            {status === 'signup' && <div className="welcombox relative top-60 left-20 w-3/4 font-serif font-bold">
              <h1 className='text-white text-5xl'>Welcome to our salon Network !</h1>
            </div>}
            {/* onSubmit={handleSubmit(handleLogin)} */}
            <div className="  p-4   " style={{ visibility: `${status === 'signin' ? '' : 'hidden'}` }} >
              <h2 className=" font-bold leading-7   text-4xl  font-serif"  >Sign In</h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className=" font-page-details sm:col-span-full">
                  <label htmlFor="contactnumber" className="block text-sm font-bold leading-6 text-gray-900">
                    Contact Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="contactnumber"
                      name="contactnumber"
                      type="text"
                      autoComplete="contactnumber"
                      placeholder='Enter your contact number '
                      // {...register('phonenumber', { required: true })}
                      ref={phoneRef}
                      className="block w-3/4 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-full font-page-details">
                  <label htmlFor="Password" className="block text-sm font-bold leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="Password"
                      name="Password"
                      type="password"
                      // {...register('password', { required: true })}
                      ref={passRef}
                      autoComplete="password"
                      placeholder='Enter your password'
                      className="block w-3/4 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <div className="mt-2">
                    <button className='block w-3/4 cursor-pointer text-white font-bold w-52 rounded-md border-0 py-1.5 px-4  shadow-sm   bg-rose-500' onClick={handleLogin}>submit</button>
                  </div>
                </div>
                <div className=' w-52'>
                  <p className='text-lg font-semibold'>New User ? <button className='text-rose-500' onClick={handleBgChange} >Sign Up</button></p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${status === 'signup' ? 'bg-white' : 'bg-rose-500'}`}>

            {status === 'signin' && <div className="welcombox relative top-60 left-20 w-3/4 font-serif font-bold">
              <h1 className='text-white text-5xl'>Sign in and enjoye your business!</h1>
            </div>}

            <form onSubmit={handleSubmit(handleSubmits)} className="  border-b p-4" style={{ visibility: `${status === 'signup' ? '' : 'hidden'}` }}  >
              <h2 className=" font-bold leading-7 text-gray-900 text-4xl font-serif">Registered</h2>
              <div className="font-page-details mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <label htmlFor="first-name" className="block text-sm font-bold leading-6 text-gray-900">
                    Salon Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      {...register('salonname', { required: true })}
                      autoComplete="given-name"
                      placeholder='Enter your Salon Name'
                      className="block w-3/4 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <label htmlFor="email" className="block text-sm font-bold leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      {...register('email', { required: true })}
                      autoComplete="email"
                      placeholder='Enter your Email Id'
                      className="block w-3/4 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <label htmlFor="contactnumbers" className="block text-sm font-bold leading-6 text-gray-900">
                    Contact Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="contactnumbers"
                      name="contactnumber"
                      type="text"
                      {...register('phonenumber', { required: true })}
                      autoComplete="contactnumber"
                      placeholder='Enter your phone number'
                      className="block w-3/4 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <label htmlFor="pass" className="block text-sm font-bold leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="pass"
                      name="contactnumber"
                      type="text"
                      {...register('password', { required: true })}
                      autoComplete="contactnumber"
                      placeholder='Enter your Password'
                      className="block w-3/4 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <label htmlFor="conpass" className="block text-sm font-bold leading-6 text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="conpass"
                      name="contactnumber"
                      type="text"
                      {...register('confirmpassword', { required: true })}
                      autoComplete="contactnumber"
                      placeholder='Enter Confirm Password'
                      className="block w-3/4 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="streetaddress" className="block text-sm font-bold leading-6 text-gray-900">
                    address
                  </label>
                  <div className="mt-2">
                    <input
                      id="streetaddress"
                      name="street-address"
                      type="text"
                      {...register('address', { required: true })}
                      autoComplete="street-address"
                      placeholder='Enter your Address'
                      className="block w-3/4 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-full">
                  <label htmlFor="country" className="block text-sm font-bold leading-6 text-gray-900">
                    Salon Type
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      {...register('salontype', { required: true })}
                      autoComplete="country-name"
                      className="block  w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Hair Salons</option>
                      <option>Nail Salons</option>
                      <option>Beauty Salons</option>
                      <option>Day Spas</option>
                      <option>Barber Shops</option>
                      <option>Massage Therapy Centers</option>
                      <option>Medical Spas (Medi-Spas)</option>
                      <option>Specialty Salons</option>
                      <option>Bridal Salons</option>
                      <option >Children’s Salons</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-full">
                  <div className="mt-2">
                    <input
                      id="submit"
                      name="street-address"
                      type="submit"
                      autoComplete="street-address"
                      className="block cursor-pointer font-semibold w-52 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 bg-rose-500"
                    />
                  </div>
                </div>
                <div className=' w-52'>
                  <p className='text-lg font-semibold'>Already Register? <button className='text-rose-500' onClick={handleBgChange}>Login</button></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}



export default Signup
