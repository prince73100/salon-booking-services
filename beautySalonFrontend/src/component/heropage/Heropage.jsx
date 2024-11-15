/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import salonbanner from '../../assets/sevicepic/image.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sercomponent from '../service/Sercomponent.jsx'
import SalonContainers from '../salonBox/SalonContainers.jsx'
import verifypersion from '../../assets/icon/verify-icon-removebg-preview.png'
import bookingicon from '../../assets/icon/booking-icon-removebg-preview.png'
import paymenticon from '../../assets/icon/paymentIcon-removebg-preview.png'
import wideRangeIcon from '../../assets/icon/widerangeService-removebg-preview.png'
import calendericon from '../../assets/icon/calendericon.png'
import enjoyicon from '../../assets/icon/enjoyicon.png'
import selecticon from '../../assets/icon/selecticon.png'
import Testinomials from '../Testinomial/Testinomials.jsx'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { customeraction } from '../../../store/customerStore.js'
import axios from 'axios'



const Boxchooseus = ({ image, context }) => {
  return <>
    <div className="bg-white w-fit shadow-inner  hover:-translate-y-1 hover:scale-110 hover:bg-rose-100 duration-300">
      <div className="imag  flex justify-center py-2">
        <img src={image} alt="c" className='w-20' />
      </div>
      <div className="des flex justify-center">
        <p className='text-center'>{context}</p>
      </div>
    </div>
  </>
}

function Heropage() {
  const { state, services_provide, salon_with_in_range, currentLocation, distance } = useSelector(store => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          customeraction.toupdateCurrentLocation([
            position.coords.longitude,
            position.coords.latitude,
          ])
        );
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);
  console.log(currentLocation)

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top (x, y)
  }, []);

  const boxContent = [
    {
      image: verifypersion,
      content: 'Professional and verified artists.'
    },
    {
      image: bookingicon,
      content: 'Easy and fast booking process.'
    },
    {
      image: wideRangeIcon,
      content: 'Wide range of salons and services.'
    },
    {
      image: paymenticon,
      content: 'Flexible payment options.'
    }
  ]
  const bookContent = [
    {
      image: selecticon,
      content: 'Select a Service.'
    },
    {
      image: calendericon,
      content: 'Select Your Date & Time.'
    },
    {
      image: bookingicon,
      content: 'Confirm Your Booking.'
    },
    {
      image: enjoyicon,
      content: 'Enjoy Service Your Door Step.'
    }
  ]

  const fetchSalonWithIn = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/salon/findSalon_with-in/distance/${distance}/center/${currentLocation[1]},${currentLocation[0]}`)
      localStorage.setItem('salon_with_inrange',JSON.stringify(res.data.response))
      dispatch(customeraction.tosalonhandle(res.data.response))
    } catch (error) {
      console.log(error.message)
    }
  }

  const find_all_service_withInRange = async () => {
    try {
      const services = await axios.get('http://localhost:3000/api/v1/salon/uniqueServices')
      const salonId = salon_with_in_range.map(el => el?._id)
      console.log(salon_with_in_range)
      const servces_with_in_range = []
      services.data.services.forEach((el) => {
        if (salonId.includes(el.servicesCreatedBy?._id)) {
          servces_with_in_range.push(el)
        }
      })
      const unique_Array_with_in_range = servces_with_in_range.reduce((acc, currentv) => {
        if (!acc.find(item => item.serviceName === currentv.serviceName)) {
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
    window.scrollTo(0, 0); // Scrolls to the top (x, y)
  }, []);
  useEffect(() => {
    fetchSalonWithIn()
  }, [currentLocation, distance]);
  useEffect(() => {
    find_all_service_withInRange();
  }, [salon_with_in_range])

  return (
    <>
      {/* banner page */}
      <div className=' containers main-banner flex justify-center' style={{ marginTop: '70px' }}>
        <div className='w-11/12 bg-rose-100 '>
          <div className="lg:flex ">
            <div className=' lg:w-1/2 '>
              <div className=''>
                <h1 className='text-2xl px-5 pt-5 lg:px-10 lg:text-4xl md:px-10 sm:px-10  font-bold font-serif text-centers md:text-4xl sm:text-3xl'>Effortless Beauty, Anytime.</h1>
                <p className='text-justify pt-10 px-5'>"Discover a seamless booking experience with our beauty salon platform. Effortlessly find and book appointments at top salons with just a few clicks, choosing from a range of skilled and professional artists dedicated to delivering the best in beauty services."</p>
                <div className=' w-1/2 mt-10'>
                  <p className='text-center pb-4'>(For professional)</p>
                  <div className='  flex justify-center'>
                    <Link className='bg-rose-500 font-serif p-3  text-white font-bold transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-300'>Join as Artist/Salon</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className=' lg:w-1/2 flex justify-center'>
              <img src={salonbanner} alt="" />
            </div>
          </div>

          <hr className='bg-rose-500  h-1' />
          <div className="welcome_1">
            <h1 className='text-2xl lg:text-4xl md:text-3xl pt-10 px-2 font-bold font-serif text-center '>Welcome to Parfois – Where Beauty Meets Convenience</h1>
            <div className='flex justify-center py-5'>
              <div className='w-11/12'>
                <p className=' text-center text-sm lg:text-base'>Discover a world of luxury, relaxation, and personal care at your fingertips. Whether you're looking to book your next salon visit, connect with talented beauty artists, or offer your own professional services, [Your Website Name] is here to make it easy.</p>
                <p className=' text-center pt-5 pb-10 text-sm lg:text-base'>Indulge in a seamless booking experience with trusted salons and artists in your area. From haircuts to makeup and spa treatments, we’ve got all your beauty needs covered. Your journey to effortless beauty starts here!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* our respected salon */}

      <div className='containers mt-12 mb-20 h-fit'>
        <div className='hero-image flex justify-center'>
          <h1 className='text-center font-serif text-4xl font-bold mb-5 pb-10 w-11/12' >Nearest Salon for you</h1>
        </div>
        <div className='flex justify-center mb-5'>
          <div className='w-11/12'>
            <div>
              <label htmlFor="distance" className='font-serif font-bold text-lg'>Distance- <span className='text-rose-600'>[{distance} KM]</span></label><br />
              <select name="cars" id="distance" style={{ border: '1px solid black' }} onChange={(e) => dispatch(customeraction.toupdateDistance(e.target.value))} >
                <option value="" disabled>--Select Distance--</option>
                <option value="1">0-1 km</option>
                <option value="5">2-5 km</option>
                <option value="8">5-8 km</option>
              </select>
            </div>
          </div>
        </div>
        <div className="salon_partner">
          {
            salon_with_in_range?.length === 0 ? <div className='salon-sup-container w-11/12 flex justify-center gap-x-20 gap-y-10 flex-wrap'>
              <p className='text-rose-600 font-bold text-2xl'>No Any Salon Near By......</p>
            </div> : <div className="salon-sup-container w-11/12 flex justify-center gap-x-20 gap-y-10 flex-wrap">
              {salon_with_in_range?.map((item, index) => <SalonContainers key={index} item={item} />)}
            </div>
          }
        </div>
      </div>

      {/* top trending services */}
      <div className="service-heading flex justify-center mt-12">
        <div className='text-center font-serif text-4xl font-bold w-11/12 pb-10'> Top Trending Services</div>
      </div>
      <div className="containers top-trending-services mb-20 ">
        <div className="top-sub-trending-services w-11/12 ">
          {
            services_provide.length === 0 ? <div className="services-box  serive-2 flex justify-center ">
              <h1 className='text-center text-xl font-bold text-rose-500'>
                Not found Any Services.........
              </h1>
            </div> : <div className="services-box  serive-2 ">
              {services_provide?.map((item, index) => <Sercomponent key={index} item={item} />)}
            </div>
          }

        </div>
      </div>
      {/* top artist */}
      {/* <div className='main-heropage relative top-10 containers mb-20'>
        <div className='hero-image flex justify-center'>
          <h1 className='text-center font-serif text-4xl font-bold mt-4 pb-10 w-11/12' >Some famous Artist</h1>
        </div>
        <div className="artist_center">
          <Link to={'/artistdetail'} className='artist-photo  flex justify-between flex-row flex-wrap  gap-y-5 mt-5 w-11/12'>
            {data.map(artiest => <Artiestdetail artiest={artiest} key={Math.random()} />)}
          </Link>
        </div>
      </div> */}

      {/* why chhose us */}
      <div className='mt-10 mb-20'>
        <div className='flex justify-center'>
          <h1 className='text-center font-serif text-4xl font-bold mt-4 pb-10 w-11/12'>Why Choose Us?</h1>
        </div>
        <div className="containers main-banner  flex justify-center mt-5">
          <div className="w-11/12">
            <div className='grid grid-cols-2 gap-x-10 gap-y-5 lg:grid-cols-4 lg:gap-x-5 md:grid-cols-4 md:gap-x-5 sm:grid-cols-4 sm:gap-x-5'>
              {boxContent.map((item, index) => <Boxchooseus key={index} image={item.image} context={item.content} />)}
            </div>
          </div>
        </div>
      </div>

      {/* how to your book your services */}
      <div className='mt-10'>
        <div className='flex justify-center'>
          <h1 className='text-center font-serif text-4xl font-bold mt-4  pb-10 w-11/12'>How to book your service?</h1>
        </div>
        <div className="containers main-banner  flex justify-center">
          <div className="w-11/12   mt-5">
            <div className='grid grid-cols-2 gap-x-10 gap-y-5 lg:grid-cols-4 lg:gap-x-5 md:grid-cols-4 md:gap-x-5 sm:grid-cols-4 sm:gap-x-5'>
              {bookContent.map((item, index) => <Boxchooseus key={index} image={item.image} context={item.content} />)}
            </div>
          </div>
        </div>
      </div>

      {/* our testinomial */}
      <div className='mt-10'>
        <div className='flex justify-center'>
          <h1 className='text-center font-serif text-4xl font-bold mt-4 pb-10   w-11/12'>Our Testinomials</h1>
        </div>
        <div className="containers main-banner  flex justify-center">
          <div className="w-11/12  ">
            <div className='grid grid-cols lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-2'>
              <Testinomials />
              <Testinomials />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}




export default Heropage


/*<div className="banner ">
<img src={salonbanner} alt="Banner" style={{ width: '100%', height: '450px' }} />
</div>
<div className="serchBar">
  <div className="searchlogo">
    <FaSearch color='white' />
  </div>
  <input type="search" placeholder='Serach here salon' />
</div>
<div className="book-button absolute top-96 left-10">
  <Link to={`${state === true ? "/bookingdetail" : "/login"}`} className='text-white bg-rose-600 p-4 rounded-3xl px-8 cursor-pointer font-bold'>Book Appoitment</Link>
</div>*/