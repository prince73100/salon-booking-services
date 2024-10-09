import { Link } from 'react-router-dom'
import salimg from '../../assets/salonimg/image.png'
function SalonContainers() {
    return (
        <div className="salon-container w-1/4 ">
            <div className="salon-img">
                <img src={salimg} alt="image 1" />
            </div>
            <div className="salon-content">
                <p className='text-xl font-bold'>
                    salon testing first
                </p>
                <p className="address mb-5">
                    Ambedkar nagar
                </p>
                <Link className='bg-rose-500 font-serif p-3 px-5 text-white font-bold transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-300'>Book Now</Link>
            </div>
        </div>
    )
}

export default SalonContainers
