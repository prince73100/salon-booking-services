/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sercomponents } from '../service/Servicepage';
import { useDispatch, useSelector } from 'react-redux';
import { customeraction } from '../../../store/customerStore';
import RatingComponent from '../rating/RatingComponent';
import apiUrl from '../../config/config';
import Comment from './Comment';

function Salonpage() {
    const { profilename, comment } = useSelector(store => store.user)
    const dispatch = useDispatch();
    const token = localStorage.getItem('jwt');
    const { salonId } = useParams();
    const [salon, setSalon] = useState({});
    const [services, setServices] = useState([]);
    const [rating, setRating] = useState(0);
    const [showrating, setshowrating] = useState(false)

    // Function to fetch salon data
    const fetchSalonData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/v1/salon/getsalonById/${salonId}`);
            setSalon(response.data.salonbyId);
        } catch (error) {
            console.error('Error fetching salon data:', error);
        }
    };

    // Function to fetch services data
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/v1/salon/getservices/${salonId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setServices(response.data.allServices);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    // Function to handle rating change
    const handleRatingChange = async (numRating) => {
        const data = { rating: numRating };
        console.log(data)
        try {
            const response = await axios.post(`${apiUrl}/api/v1/rating/postrating/${salonId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Rating response:', response);
            dispatch(customeraction.toupdaterating(numRating));
        } catch (error) {
            console.error('Error posting rating:', error);
        }
    };

    // Function to get rating by ID
    const fetchRatingById = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/v1/rating/getrating/${salonId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response)
            const salonRating = response.data.rating;
            const ratingValue = salonRating ? salonRating.rating : 0;
            setRating(ratingValue);
            setshowrating(response?.data?.rating?.israting)
            dispatch(customeraction.toupdaterating(ratingValue));
        } catch (error) {
            console.error('Error fetching rating:', error);
        }
    };

    // Fetch salon data and services on initial load
    useEffect(() => {
        fetchSalonData();
        fetchServices();
    }, []);

    useEffect(() => {
        fetchRatingById();
    }, [rating, showrating]);

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    console.log(rating)
    return (
        <div className="w-full">
            <div className="top_service_banner  flex justify-center ">
                <h1 className="py-4 sm:py-8 w-11/12 text-center bg-rose-500 text-base sm:text-3xl font-bold font-serif text-white">
                    Welcome to - {salon?.salonName}
                </h1>
            </div>
            <div>
                <div className="flex justify-center">
                    <div className="w-11/12 bg-rose-100 mt-5 lg:flex lg:gap-x-30">
                        {/* Salon Info Section */}
                        <div className="lg:w-1/2">
                            <img src={salon?.imageofSalon} alt="Salon" style={{ width: '100%' }} />
                            <div className="px-5 py-10">
                                <p className="font-semibold font-serif">
                                    <span className="text-rose-700">Email: </span>
                                    {salon?.owner?.email}
                                </p>
                                <p className="font-semibold font-serif">
                                    <span className="text-rose-700">Mobile No.: +91 </span>
                                    {salon?.phone}
                                </p>
                                <p className="font-semibold font-serif">
                                    <span className="text-rose-700">Owner: </span>
                                    {salon?.owner?.firstname} {salon?.owner?.lastname}
                                </p>
                                <p className="font-semibold font-serif">
                                    <span className="text-rose-700">Location: </span>
                                    {salon?.address}
                                </p>
                                <p className="font-semibold font-serif">
                                    <span className="text-rose-700">City: </span>
                                    {salon?.city}
                                </p>
                            </div>
                            
                            {/* Rating  */}
                            <div className='px-5'>
                                < RatingComponent postrating={handleRatingChange} showrating={showrating} rating={rating} />
                            </div>

                            < Comment salonId={salonId} token={token} />
                        </div>
                        {/* Services Section */}
                        <div className="lg:w-1/2">
                            <h1 className="text-center font-bold text-xl font-serif">Provide Services</h1>
                            <div className="services-container flex px-5 flex-wrap justify-center gap-x-5">
                                {services.map((serviceItem, index) => (
                                    <Sercomponents
                                        item={serviceItem}
                                        key={index}
                                        textSize="text-xs"
                                        ispriceDisplay={true}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Salonpage;
