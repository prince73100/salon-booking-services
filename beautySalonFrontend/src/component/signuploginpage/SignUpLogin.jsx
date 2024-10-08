import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
function SignUpLogin() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const signUp = async (data) => {
        try {
            const user = await axios.post('http://localhost:3000/api/v1/user/signup', data)
            navigate("/login")
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return (
        <div className="form w-1/2 mt-8  ml-80  rounded-lg border-2 border-rose-500 ">
            <div className='p-10'>
                <div className="heading w-3/4 ml-60 pt-2">
                    <h1 className='font-serif font-bold text-2xl'>Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit(signUp)} className='ml-20 w-3/4'>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    placeholder='First Name'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                                    {...register('firstname', { required: true })}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="given-name"
                                    placeholder='Last Name'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                                    {...register('lastname', { required: true })}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="phone"
                                    id="contactnumber"
                                    autoComplete="given-name"
                                    placeholder='Contact Number'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                                    {...register('phone', { required: true })}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="given-name"
                                    placeholder='Email-Id'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                                    {...register('email', { required: true })}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="address"
                                    autoComplete="given-name"
                                    placeholder='Address'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                                    {...register('address', { required: true })}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="first-name"
                                    id="password"
                                    autoComplete="given-name"
                                    placeholder='Password'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                                    {...register('password', {
                                        required: true
                                    })}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="first-name"
                                    id="confirmpassword"
                                    autoComplete="given-name"
                                    placeholder='Confirm Password'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                                    {...register('confirmPassword', { required: true })}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <input
                                    type="submit"
                                    name="first-name"
                                    id="submit"
                                    autoComplete="given-name"
                                    className="block cursor-pointer w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 bg-pink-600 "
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="sm:col-span-full mt-10">
                    <p className='text-lg font-semibold'>Existing user? <Link to={'/login'} className='text-rose-500'>Login</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpLogin
