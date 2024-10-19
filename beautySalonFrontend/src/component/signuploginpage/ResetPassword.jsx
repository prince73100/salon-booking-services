/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import axios from 'axios'
function ResetPassword() {
    const {token} = useParams()
    const passref = useRef()
    const conPass = useRef()

    const handleResetPassword=async()=>{
        const data = {
            password:passref.current.value,
            confirmPassword:conPass.current.value
        }
      const res =  await axios.patch(`http://localhost:3000/api/v1/user/resetpassword/${token}`,data)
      console.log(res)
    }
    console.log(token)
    return (
        <div className='mt-28 flex justify-center items-center h-full '>
            <div className=" w-3/4  h-full rounded flex flex-col items-center bg-rose-600 shadow-lg shadow-cyan-500/50">
                <h1 className='text-center py-4 text-3xl font-semibold font-serif text-white'>Reset your Password?</h1>
                <div className="w-1/3 bg-rose-200 flex justify-center border border-black my-4 rounded-xl">
                    <input type="Password" placeholder='Enter Password' className='text-black-700 w-full border-0 outline-0 py-2 px-2' ref={passref}/>
                </div>
                <div className="w-1/3 bg-rose-200 flex justify-center border border-black my-4 rounded-xl">
                    <input type="Password" placeholder='Enter Confirm Password' className='text-black-700 w-full border-0 outline-0 py-2 px-2' ref={conPass} />
                </div>
                <div className="w-1/3 bg-rose-400 flex justify-center border border-black rounded-xl mt-10 mb-10">
                    <button className='w-full border-0 outline-0 py-2 px-2 font-bold text-xl text-white' onClick={handleResetPassword}>continue</button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
