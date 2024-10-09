import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authuseraction } from '../../../store'
import { useNavigate } from 'react-router-dom'
function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onLogOutartist = async () => {
    const token = localStorage.getItem("token")
    const resp = await axios.post(`http://localhost:3000/api/v1/artist/artistlogout/${token}`)
    localStorage.removeItem("token")
    localStorage.removeItem('states')
    dispatch(authuseraction.updatestate(undefined))
    navigate('/login')
  }
  return (
    <div className="bg-slate-50 w-72 h-32 text-center rounded-lg mt-10">
      <h1 className='text-lg font-bold '>Prince</h1>
      <h1>peincepjng85@gmail.com</h1>
      <div className="">
        <button className='bg-sky-500 absolute bottom-1.5 left-28 px-3 py-2 rounded-md' onClick={onLogOutartist}>Logout</button>
      </div>
    </div>
  )
}

export default Profile
