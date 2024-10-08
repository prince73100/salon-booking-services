import React from 'react'
import { Link } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import daygidplugin from '@fullcalendar/daygrid'
import timegridplugin from '@fullcalendar/timegrid'
import interactionplugin from '@fullcalendar/interaction'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { customeraction } from '../../../store/customerStore'
function Servicebookdetail() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onclickdate=(data)=>{
        console.log(data)
        dispatch(customeraction.toUpdateAppoinrment(data))
        navigate("/appoitment")
    }
    return (
        <div className='stepbar'>
            <div className="sub-step-bar bg-pink-700 h-20">
                <div className='ml-10 text-white'>
                    <span className=''> <Link to={'/'}>Home</Link> </span> / Book <br />
                    <div className="booking mt-3 font-bold">
                        Booking
                    </div>
                </div>
            </div>
            <  FullCalendar
                plugins={[daygidplugin, timegridplugin, interactionplugin]}
                initialView='timeGridDay'
                headerToolbar={{
                    start: 'title', 
                    center: 'today,prev,next',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay' 
                }}
                dateClick={onclickdate}
                height={400}
            />
        </div>
    )
}

export default Servicebookdetail
