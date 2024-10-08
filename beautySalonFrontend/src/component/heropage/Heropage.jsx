import React from 'react'
import Artiestdetail from '../artistdeatail/Artiestdetail'
import data from '../../../artistdata.js'
import salonbanner from '../../assets/salon_banner.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaSearch } from "react-icons/fa";
import Sercomponent from '../service/Sercomponent.jsx'
function Heropage() {
  const { state, services_provide } = useSelector(store => store.customerSlice)
  return (
    <>
      {/* banner page */}
      <div className=' containers main-banner'>
        <div className="banner ">
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
        </div>
      </div>
      {/* top trending services */}
      <div className="containers top-trending-services  ">
        <div className="top-sub-trending-services  ">
          <div className="service-heading flex justify-center">
            <div className='text-center font-serif text-4xl font-bold'> Top Trending Services</div>
          </div>
          <div className="services-box   ">
            {services_provide.map((item) => <Sercomponent item={item} />)}
          </div>
        </div>
      </div>
      {/* top artist */}
      <div className='main-heropage relative top-10 containers'>
        <div className='hero-image'>
          <h1 className='text-center font-serif text-4xl font-bold mt-4' >Some famous Artist</h1>
        </div>
        <div className="artist_center">
          <Link to={'/artistdetail'} className='artist-photo py-5 flex justify-center flex-row flex-wrap gap-x-14 gap-y-10 mt-10 '>
            {data.map(artiest => <Artiestdetail artiest={artiest} key={Math.random()} />)}
          </Link>
        </div>
      </div>
      {/* our respected salon */}

      <div className='containers mt-8'>
        <div className='hero-image'>
          <h1 className='text-center font-serif text-4xl font-bold mt-4' >Our Respected Salon</h1>
        </div>
        <div className="artist_center">
          
        </div>
      </div>
    </>

  )
}

export default Heropage
