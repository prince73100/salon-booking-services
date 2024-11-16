import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Reviewpplication() {
    const { appdata } = useSelector(store => store.authuser)
    const navigate = useNavigate()

    const onsubmitform = async () => {
        const token = localStorage.getItem('token')
        const res = await axios.post(`http://localhost:4000/api/v1/artist/applicationsubmit/${token}`, appdata)
        console.log(res);
        alert(res.data.message)
        navigate('/')
    }

    return (
        <div className='w-3/5 absolute top-28 left-60'>
            <div className="">
                <h1 className=' text-3xl font-bold mb-8 underline'>Application Review</h1>
                <div className="my-4">
                    <b>Full Name-</b> <span>{appdata.fullname}</span>
                </div>
                <div className="my-4">
                    <b>Email-</b> <span>{appdata.email}</span>
                </div>
                <div className="my-4">
                    <b>Experience-</b> <span>{appdata.experience}</span>
                </div>
                <div className="my-4">
                    <b>Current Location-</b> <span>{appdata.currentLocation}</span>
                </div>
                <div className="my-4">
                    <b>Past Barber-</b> <span>{appdata.pastbarber}</span>
                </div>
                <div className="my-4">
                    <b>Education-</b> <span>{appdata.education}</span>
                </div>
                <div className="my-4">
                    <b>Expected Salary-</b> <span>{appdata.expectedsalary}</span>
                </div>
                <div className="my-4">
                    <b>Phone Number-</b> <span>{appdata.phonenumber}</span>
                </div>
                <div className="btn flex justify-between mt-28">
                    <button className='bg-pink-500 text-xl py-2 px-4 rounded-md    font-bold text-white'
                        onClick={() => navigate("/applicationform")}
                    >
                        Back
                    </button>
                    <button className='bg-pink-500 text-xl py-2 px-4 rounded-md    font-bold text-white'
                        onClick={onsubmitform}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Reviewpplication
