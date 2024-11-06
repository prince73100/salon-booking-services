/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import axios from 'axios'
function Bookinghistory() {
    const token = localStorage.getItem('jwt');
    const fetchAllBookingHistory = async () => {
        const result = await axios.get(`http://localhost:3000/api/v1/booked/getbookingHistory`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(result)
    }
useEffect(()=>{
    fetchAllBookingHistory();
},[])

    return (
        <div>

        </div>
    )
}

export default Bookinghistory
