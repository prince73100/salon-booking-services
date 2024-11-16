/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { customeraction } from '../../../store/customerStore';
import apiUrl from '../../config/config';

function ResetPassword() {
    const navigation = useNavigate()
    const dispatch = useDispatch();
    const { token } = useParams()
    const passref = useRef()
    const conPass = useRef()

    const handleResetPassword = async () => {
        const data = {
            password: passref.current.value,
            confirmPassword: conPass.current.value
        }
        const res = await axios.patch(`${apiUrl}/api/v1/user/resetpassword/${token}`, data)
        if (res.data.status === 'success') {
            toast.success(`password updated and ${res.data.message}`, {
                position: "top-center"
            });
            const expireIn = Date.now() + 1 * 24 * 60 * 60 * 1000;
            const token = res.data.token
            localStorage.setItem('jwt', token)
            localStorage.setItem('exipreIn', expireIn)
            localStorage.setItem('role', res.data.user.role)
            dispatch(customeraction.toUpdatestate(true))
            if (res.data.user.role === "Artist") {
                navigation('/jobs')
            } else if (res.data.user.role === "Salon") {
                navigation('/salonbusiness')
            }
            else if (res.data.user.role === "Admin") {
                navigation('#')
            }
            else {
                navigation('/')
            }
        }
    }
    return (
        <div className='mt-28 flex justify-center items-center h-full '>
            <div className=" w-3/4  h-full rounded flex flex-col items-center bg-rose-600 shadow-lg shadow-cyan-500/50">
                <h1 className='text-center py-4 text-3xl font-semibold font-serif text-white'>Reset your Password?</h1>
                <div className="w-1/3 bg-rose-200 flex justify-center border border-black my-4 rounded-xl">
                    <input type="Password" placeholder='Enter Password' className='text-black-700 w-full border-0 outline-0 py-2 px-2' ref={passref} />
                </div>
                <div className="w-1/3 bg-rose-200 flex justify-center border border-black my-4 rounded-xl">
                    <input type="Password" placeholder='Enter Confirm Password' className='text-black-700 w-full border-0 outline-0 py-2 px-2' ref={conPass} />
                </div>
                <div className="w-1/3 bg-rose-400 flex justify-center border border-black rounded-xl mt-10 mb-10">
                    <button className='w-full border-0 outline-0 py-2 px-2 font-bold text-xl text-white' onClick={handleResetPassword}>continue</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ResetPassword
