/* eslint-disable no-unused-vars */
import React from 'react'
import { useRef } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import apiUrl from '../../config/config';

function ForgetpasswordPage() {
    const emailRef = useRef();

    const handleforgetPassword = async () => {
        const data = {
            email: emailRef.current.value
        }
        try {
            const res = await axios.post(`${apiUrl}/api/v1/user/forgetPassword`, data)
            if (res.data.status === 'success') {
                toast.success(res.data.message, {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='mt-28 flex justify-center items-center h-96 '>
            <div className=" w-11/12  h-72 rounded flex flex-col items-center bg-rose-600 shadow-lg shadow-cyan-500/50">
                <h1 className='text-center py-4 text-3xl font-semibold  text-white'>Forget your Password?</h1>
                <div className="w-3/4 lg:w-1/2 md:w-11/12 sm:w-11/12 bg-rose-200 flex justify-center border border-black my-4 rounded-xl">
                    <input type="email" placeholder='Enter your email Id' className='rounded-xl text-black-700 w-full border-0 outline-0 py-2 px-2' ref={emailRef} />
                </div>
                <div className="w-3/4 lg:w-1/2 md:w-11/12 sm:w-11/12 bg-rose-400 flex justify-center border border-black rounded-xl mt-10">
                    <button className='w-full border-0 outline-0 py-2 px-2 font-bold text-xl text-white' onClick={handleforgetPassword}>continue</button>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default ForgetpasswordPage
