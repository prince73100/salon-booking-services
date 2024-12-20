/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function SalonContainers({ item }) {
    const { state } = useSelector(store => store.user)
    console.log(state)
    return (
        <div className="salon-container" style={{ maxWidth: '250px' }}>
            <div className="salon-img">
                <img src={item.imageofSalon} alt="image 1" style={{ height: "300px" }} />
            </div>
            <div className="salon-content">
                <p className='text-xl font-bold'>
                    {item.salonName}
                </p>
                <p className="address">
                    {item.address}
                </p>
                <p className='mb-5 font-bold text-xl text-gray-500'>
                    <span className='text-rose-500'>+91</span> {item.phone}
                </p>
                <Link to={`${state === true  ? `salon-page/${item._id}` : `/login`}`} className='bg-rose-500  p-3 px-5 text-white font-bold transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-300'>Book Now</Link>
            </div>
        </div>
    )
}

export default SalonContainers
