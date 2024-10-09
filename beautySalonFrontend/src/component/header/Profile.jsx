/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useDispatch } from 'react-redux'
import { customeraction } from '../../../store/customerStore'
import { useNavigate } from 'react-router-dom'
function Profile({name,lastname,email}) {
const dispatch = useDispatch()
const navigation = useNavigate()

    const onLogout = ()=>{
        dispatch(customeraction.toUpdatestate(undefined))
        dispatch(customeraction.toUpdateToken(""))
        localStorage.removeItem('jwt')
        localStorage.removeItem('exipreIn')
        navigation('/login')
    }

    return (

        <div className="bg-slate-50 w-72 h-32 text-center rounded-lg">
            <h1 className='text-lg font-bold '>{name + " " +lastname}</h1>
            <h1>{email}</h1>
            <div className="">
                <button className='bg-sky-500 absolute bottom-1.5 left-28 px-3 py-2 rounded-md' onClick={onLogout}>Logout</button>
            </div>
        </div>

    )
}

export default Profile
