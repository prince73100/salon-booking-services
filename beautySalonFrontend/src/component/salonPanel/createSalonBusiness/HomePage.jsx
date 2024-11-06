/* eslint-disable react/no-unescaped-entities */
import heroImage from '../../../assets/salonimg/salonimage.png'
import { Link } from 'react-router-dom'

import clientmanagement from '../../../assets/salonimg/Client-Managment-Card.jpg'
import marketingimg from '../../../assets/salonimg/marketing-Tools-cards.jpg'
import onlineimg from '../../../assets/salonimg/Online-booking-cards.jpg'
import paymentimg from '../../../assets/salonimg/Payment-gateways-cards.jpg'

const offerpage = [
    {
        imgname: clientmanagement
    },
    {
        imgname: marketingimg
    },
    {
        imgname: onlineimg
    },
    {
        imgname: paymentimg
    }
]


function Herosection() {
    return (
        <div className='containers hero-page flex justify-center bg-rose-100 h-full py-20'>
            <div className="sub-hero-page mt-5 w-9/12">
                <div className="lg:flex lg:justify-center lg:items-center headn-hearo   ">
                    <div className='lg:w-1/2'>
                        <div className="lg:text-4xl md:text-3xl font-serif text-2xl font-bold">
                            Join Our Salon Network & Grow Your Business!
                        </div>
                        <p className='lg:text-xl md:text-lg text-base font-serif text-justify mt-10'>"Expand your reach and attract more clients by joining a platform designed to help salons succeed. Simplify your bookings, manage your clients, and thrive."</p>
                        <div className="hero-btn mt-10">
                            <Link to={'/regiteredbusiness'} className='bg-rose-500 text-white font-serif font-bold p-5 rounded-lg'>Join Now</Link>
                        </div>
                    </div>
                    <div className="image-geader ">
                        <img src={heroImage} alt="" width={500} />
                    </div>
                </div>

                <div className="featured-highlights mt-20 ">
                    <div className="offers font-serif text-5xl font-bold text-center ">
                        We Are Offers
                    </div>
                    <div className="offers-box flex flex-row flex-wrap justify-center gap-20 mt-20">
                        {offerpage.map((imgsrc, index) => {
                            return <div className="offers-sub-box " key={index} >
                                <img src={imgsrc.imgname} alt="" width={400} className='hover:rotate-180' />
                            </div>
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Herosection
