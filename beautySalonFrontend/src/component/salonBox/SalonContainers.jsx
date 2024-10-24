/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
function SalonContainers({item}) {
    return (
        <div className="salon-container" style={{maxWidth:'250px'}}>
            <div className="salon-img">
                <img src={item.imageofSalon} alt="image 1" style={{height:"300px"}} />
            </div>
            <div className="salon-content">
                <p className='text-xl font-bold'>
                    {item.salonName}
                </p>
                <p className="address mb-5">
                    {item.address}
                </p>
                <Link className='bg-rose-500 font-serif p-3 px-5 text-white font-bold transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-300'>Book Now</Link>
            </div>
        </div>
    )
}

export default SalonContainers
