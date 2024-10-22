/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Sercomponent({ item }) {
  const { state } = useSelector(store => store.user)
  console.log(state)
  return (
    <div className='Service-info  min-h-80  mt-4' >
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
          <Link to={`${state === true ? '/bookingService' : '/login'}`} className='bg-pink-700 font-serif p-3 px-5 text-white font-bold transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-300'>Book now</Link>
        </div>
      </div>
    </div>
  )
}

export default Sercomponent
