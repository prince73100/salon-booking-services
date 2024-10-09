/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

function Jobs({salonname,jobtitle,address,salary,responsibility}) {
    return (
        <div className='w-3/4 mt-8   border rounded '>
            <h1 className='text-2xl font-bold pl-2 mt-2'>{jobtitle}</h1>
            <p className='px-2'>{salonname}</p>
            <p className='  p-2 '><span className='font-bold'>Location:</span> {address}</p>
            <div className='flex gap-4'>
                <p className='bg-slate-300 w-28 rounded ml-2 p-2'>{salary}</p>
                <p className='bg-slate-300 bg-green-200 p-2'>Full Time</p>
            </div>
            <div className='ml-2 py-2 text-wrap  px-2'>
                    <p className='text-sm'>{responsibility}</p>
            </div>
            <div className="mt-2 ml-2">
                <p className='text-sm pb-2' >Active 4 day ago</p>
            </div>
        </div>

    )
}

export default Jobs
