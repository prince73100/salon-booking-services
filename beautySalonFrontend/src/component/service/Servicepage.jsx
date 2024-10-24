/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import salonbanner from '../../assets/salon_banner.jpg'
import Sercomponent from './Sercomponent.jsx'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './service.css'
import { useEffect } from 'react'

function Sercomponents({ item }) {
    const { state } = useSelector(store => store.user)
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top (x, y)
    }, []);
    return (
        <div className='Service-infos  min-h-80  mt-4' >
            <div className="service-image ml-5" >
                <img src={item.imgSrc} alt="" style={{ width: '250px', height: '160px' }} className='transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-300' />
            </div>
            <div className="service-content">
                <div className="servicename  mt-4 mb-4 ml-5 font-serif text-xl font-bold text-pink-700">
                    {item.services}
                </div>
                <div className="stylist mb-4 ml-5 font-serif text-xl font-bold text-stone-400">
                    {item.price}
                </div>
                <div className="book-now w-3/5 mt-5 mb-4 ml-5">
                    <Link to={`${state === true ? `/bookingService/${item?._id}/${item.services}/${item.price}` : '/login'}`} className='bg-rose-500 font-serif p-3 px-5 text-white font-bold transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-300'>Book now</Link>
                </div>
            </div>
        </div>
    )
}

function Servicepage() {
    const { services_provide } = useSelector(store => store.user)

    return (
        <div className='main-service-page'>
            <div className="top_service_banner bg-rose-500">
                <h1 className='py-8 text-center text-4xl font-bold font-serif text-white'>Our Services</h1>
            </div>
            <div>
                <h1 className='py-8 text-center text-5xl  font-serif'>Our Services</h1>
                <div className='flex justify-center'>
                    <p className='text-center w-11/12'>From the amazing world of Salon services, we offer the following services to you at competitive prices. We have selected only the best for you, do check out our deals and offers of the day to avail the best. Availing the offers and services is simple, just Add the services you want to avail for a pampered day and check those services out. Post checking out you would be receiving an email with the confirmation of the order.</p>
                </div>
            </div>
            <div className="w-full flex justify-center  items-center mt-8  ">
                <div className="service-element w-11/12 ml-4 flex flex-row gap-8 justify-start flex-wrap">
                    {services_provide.map((item,index) => <Sercomponents key={index} item={item} />)}
                </div>
            </div>
        </div>
    )
}

export default Servicepage
