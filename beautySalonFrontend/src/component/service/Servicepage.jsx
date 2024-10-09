import salonbanner from '../../assets/salon_banner.jpg'
import Sercomponent from './Sercomponent.jsx'
import { useSelector } from 'react-redux'



function Servicepage() {
    const {services_provide} = useSelector(store => store.user)
    
    return (
        <div className='main-service-page'>
            <div className="banner-service">
                <img src={salonbanner} alt="" style={{ width: '100%', height: '450px' }} />
            </div>
            <div className="service-heading absolute top-96 left-10">
                <h1 className='text-white font-serif text-3xl font-bold'>Service <span className='text-pink-600 font-serif text-3xl font-bold'>Provided</span></h1>
            </div>
            <div className="w-full flex justify-center  items-center mt-8  ">
                <div className="service-element w-11/12 ml-4 flex flex-row gap-8 justify-center flex-wrap">
                    {services_provide.map((item,index) => <Sercomponent key={index} item={item} />)}
                </div>
            </div>
        </div>
    )
}

export default Servicepage
