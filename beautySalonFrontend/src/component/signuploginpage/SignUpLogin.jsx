import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import apiUrl from '../../config/config';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function SignUpLogin() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);

    const signUp = async (data) => {
        setOpen(true)
        try {
            // eslint-disable-next-line no-unused-vars
            const user = await axios.post(`${apiUrl}/api/v1/user/signup`, data)
            if (user.data.status === 'success') {
                setOpen(false)
                navigate("/login")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top (x, y)
    }, []);
    return (
        <div className='flex justify-center'>
            <div className="form w-full  mt-8 rounded-lg  shadow-lg shadow-rose-500/100  lg:w-1/2 md:w-3/4 ">
                <div className=''>
                    <div className="heading  pt-2">
                        <h1 className='font-serif text-center font-bold text-3xl'>Create an account</h1>
                    </div>
                    <form onSubmit={handleSubmit(signUp)} className=' flex justify-center '>
                        <div className="w-3/4 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                            <div className="sm:col-span-3">
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
                            <div className="sm:col-span-3">
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

                            <div className="sm:col-span-3">
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
                            <div className="sm:col-span-3">
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
                            <div className="sm:col-span-3">
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        {...register('role', { required: true })}
                                        autoComplete="country-name"
                                        className="block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option disabled>--Select role--</option>
                                        <option>user</option>
                                        <option>artist</option>
                                        <option>salon</option>
                                        <option>admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <div className="mt-2">
                                    <input
                                        type="submit"
                                        name="first-name"
                                        id="submit"
                                        autoComplete="given-name"
                                        className="block cursor-pointer w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 bg-rose-500 "
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="sm:col-span-full mt-10 py-10 px-8">
                        <p className='text-lg font-semibold font-serif'>Already have an account? <Link to={'/login'} className='text-rose-500'>Login</Link> </p>
                    </div>
                    {/* loader */}
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    {/* toaster */}
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default SignUpLogin
