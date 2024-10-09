import React from 'react'
import Jobs from './Jobs'
import { IoLocationSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { authuseraction } from '../../../store'
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
function Job() {
  const dispatch = useDispatch()
  const { states, alljob } = useSelector(store => store.authuser)
  const datalocal = localStorage.getItem("states")
  datalocal == null ? dispatch(authuseraction.updatestate(undefined)) : dispatch(authuseraction.updatestate("true"))
  const [jobdetail,setjobdetail] = useState()

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/salon/getalljobs').then((res) => {
      dispatch(authuseraction.toupdatesjobs(res.data.allJob))
      console.log(res)
    })
  }, [])

  return (
    <div className='mt-10 relative '>
      <div className="border-b">
        <h1 className='text-center text-3xl font-bold'>Job feed</h1>
      </div>
      <div className=' w-4/5 absolute right-40 mt-4'>
        <h1>job bades on your acitivity</h1>
        <div className='flex justify-between'>
          <div className='w-1/2 '>
            {alljob.map((item) => <Link key={item._id} to={`/`} onClick={()=>{setjobdetail(item)}} >< Jobs  salonname={item.salonname} jobtitle={item.Jobtitle} salary={item.salary} skill={item.skill} responsibility={item.responsibility} education={item.education} address={item.address}/></Link> )}
          </div>

          {jobdetail && <div className=' border rounded w-1/2 h-full  sticky right-0 top-10'>
            <div className='p-4'>
              <h1 className='text-3xl font-bold'>{jobdetail.Jobtitle}</h1>
              <p>{jobdetail.salonname} | Ujjain, Madhay Pradesh </p>
              <div className="mt-4 border-b mb-2 py-2">
                <Link className='bg-pink-500 text-xl p-2 rounded-md    font-bold text-white' to={`${states == "true" ? "/applicationform" : "/login"}`}>
                  Apply now
                </Link>
              </div>
              <div className="icon flex items-center mt-6">
                <IoLocationSharp />
                <p className='border-b pl-2 '> { jobdetail.address}</p>
              </div>
              <div className="description mt-4">
                <h1 className='text-3xl font-bold py-4'>Full Description</h1>
                {jobdetail.responsibility}
              </div>
            </div>
          </div> }
        </div>
      </div>
    </div>

  )
}

export default Job
