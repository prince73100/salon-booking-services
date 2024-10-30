/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Sercomponents } from '../service/Servicepage';
function Salonpage() {
    const token = localStorage.getItem('jwt');
    const { salonId } = useParams();
    const [salon, setSalon] = useState({});
    const [service, setServices] = useState([])
    const fetchImage = async () => {
        const SingleSalon = await axios.get(`http://localhost:3000/api/v1/salon/getsalonById/${salonId}`)
        setSalon(SingleSalon.data.salonbyId)
    }
    useEffect(() => {
        fetchImage();
    }, [])


    const fetchServices = async () => {
        try {
            const servicesProvide = await axios.get(`http://localhost:3000/api/v1/salon/getservices/${salonId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(servicesProvide)
            setServices(servicesProvide.data.allServices)
        } catch (error) {
            console.log("Error=", error)
        }
    }
    useEffect(() => {
        fetchServices();
    }, [])
    return (
        <div className='w-full'>
            <div className="top_service_banner bg-rose-500">
                <h1 className='py-8 text-center text-4xl font-bold font-serif text-white'>Welcome to - {salon?.salonName}</h1>
            </div>
            <div>
                <div className="flex justify-center">
                    <div className="w-11/12 bg-rose-100 mt-5 flex gap-x-40">
                        <div className=' ' style={{ width: '40%' }}>
                            <div className="" >
                                <img src={salon?.imageofSalon} alt="" style={{ width: '100%' }} />
                                <div className='flex justify-between mt-5'>
                                    <p className="font-semibold font-serif">{salon?.salonName}</p>
                                    <p className=" font-serif">{salon.owner?.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className='' style={{ width: '40%' }}>
                            <h1 className='text-center font-bold text-xl font-serif'>Provide Services</h1>
                            <div className="services-container flex ">
                                {service.map((el, index) => <Sercomponents item={el} key={index} textSize={'text-xs'} ispriceDisplay={true} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Salonpage
