/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import salonbanner from '../../assets/salon_banner.jpg'
import Sercomponent from './Sercomponent.jsx'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './service.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { customeraction } from '../../../store/customerStore.js'

export function Sercomponents({ item, ispriceDisplay = false, textSize = 'text-xl', isSalonnameDisplay }) {
    const { state } = useSelector(store => store.user)
    return (
        <div className='Service-infos  min-h-80  mt-4' >
            <div className="service-image " >
                <img src={`${item?.image}`} alt="" style={{ width: '250px', height: '160px' }} className='transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-300' />
            </div>
            <div className="service-content">
                {isSalonnameDisplay && <div className="servicename  mt-4 mb-4 ml-5">
                    <span className='font-bold text-lg'>  {item?.servicesCreatedBy?.salonName}</span> | <span className='text-sm'> {item?.servicesCreatedBy?.phone}</span>
                </div>}
                <div className={`${textSize} servicename  mt-2 mb-2 ml-5 font-serif  font-bold text-pink-700`}>
                    {item?.serviceName}
                </div>
                {ispriceDisplay && <div className="servicename  mt-2 mb-2 ml-5 font-serif text-xl font-bold text-green-600">
                    {item?.price}
                </div>}
                <div className="book-now w-3/5 mt-5 mb-4 ml-5">
                    {ispriceDisplay && <Link to={`${state === true ? `/bookingService/${item?._id}/${item?.serviceName}/${item.price}/${item?.servicesCreatedBy?._id}/${item?.servicesCreatedBy?.salonName}` : '/login'}`} className='bg-rose-500 font-serif p-3 px-5 text-white font-bold transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-300'>Book</Link>}

                    {!ispriceDisplay && <Link to={`${state === true ? `/select-one-service` : '/login'}`} className='bg-rose-500 font-serif p-3 px-5 text-white font-bold transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-300'>Continue</Link>}
                </div>
            </div>
        </div>
    )
}

function Servicepage() {
    const dispatch = useDispatch();
    const { services_provide, salon_with_in_range } = useSelector(store => store.user)

    const find_all_service_withInRange = async () => {
        try {
            const services = await axios.get('http://localhost:3000/api/v1/salon/uniqueServices')
            const salonId = salon_with_in_range.map(el => el?._id)
            const servces_with_in_range = []
            services.data.services.forEach((el) => {
                if (salonId.includes(el.servicesCreatedBy?._id)) {
                    servces_with_in_range.push(el)
                }
            })
            const unique_Array_with_in_range = servces_with_in_range.reduce((acc, currentv) => {
                if (!acc.find(item => item?.serviceName === currentv?.serviceName)) {
                    acc.push(currentv)
                }
                return acc
            }, [])
            dispatch(customeraction.handleAllServices(services.data.services))
            dispatch(customeraction.handleShowServices(unique_Array_with_in_range))
        } catch (error) {
            console.log("Error=>", error)
        }

    }

    useEffect(() => {
        find_all_service_withInRange();
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
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
                    {services_provide.map((item, index) => <Sercomponents key={index} item={item} />)}
                </div>
            </div>
        </div>
    )
}

export default Servicepage
