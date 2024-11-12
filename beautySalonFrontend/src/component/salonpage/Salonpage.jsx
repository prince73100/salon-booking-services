/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Sercomponents } from '../service/Servicepage';
import { CgMail } from "react-icons/cg";
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
                    <div className="w-11/12 bg-rose-100 mt-5  lg:flex lg:gap-x-30">
                        <div className='lg:w-1/2'>
                            <div className="" >
                                <img src={salon?.imageofSalon} alt="" style={{ width: '100%' }} />
                            </div>

                            <div className='px-5 py-10'>
                                <p className="font-semibold font-serif">
                                    <span className='text-rose-700'>Email.: </span>{salon?.owner?.email}
                                </p>
                                <p className="font-semibold font-serif">
                                    <span className='text-rose-700'>Mobile No.:  +91 </span>{salon?.phone}
                                </p>
                                <p className="font-semibold font-serif">
                                    <span className='text-rose-700'>Owner.: </span>{salon?.owner?.firstname} {salon?.owner?.lastname}
                                </p>
                                <p className="font-semibold font-serif">
                                    <span className='text-rose-700'>Location: </span>{salon?.address}
                                </p>
                                <p className="font-semibold font-serif">
                                    <span className='text-rose-700'>City: </span>{salon?.city}
                                </p>
                            </div>
                        </div>
                        <div className=' lg:w-1/2'>
                            <h1 className='text-center font-bold text-xl font-serif'>Provide Services</h1>
                            <div className="services-container flex px-5 flex-wrap justify-center gap-x-5 ">
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
