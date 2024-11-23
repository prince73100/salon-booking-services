/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import mainlogo from '../../assets/logo/logo.png'

import './footer.css'
function Footer() {
    const handlelogoRoute = () => {
        console.log(localStorage.getItem('role') === 'salon')
        if (localStorage.getItem('role') === 'salon') return "/salonbusiness"
        if (localStorage.getItem('role') === 'artist') return "/salonbusiness"
        if (localStorage.getItem('role') === 'user') return "/"
        if (!localStorage.getItem('role')) return "/"
      }
    return (
        <div className='footer '>
            <div className='footerContainer flex justify-center'>
                <div className="w-11/12 grid grid-cols-2 grid-x-10 lg:grid-cols-4 lg:gap-x-10 md:grid-cols-4 md:gap-x-10 sm:grid-cols-4 sm:gap-x-10    mt-5 ">
                    <div className='flex justify-center  '>
                        <div className='header_logo w-2/3'>
                            <Link to={handlelogoRoute()}><img src={mainlogo} alt="" width={250} /></Link>
                        </div>
                    </div>
                    <div className='footer_grid flex justify-center'>
                        <div className='w-2/3'>
                            <p className='footer_text'>Services</p>
                            <ul>
                                <li>Hair Cutting</li>
                                <li>Hand feet</li>
                                <li>Make Up</li>
                                <li>Skin Care</li>
                                <li>More...</li>
                            </ul>
                        </div>
                    </div>
                    <div className='footer_grid flex justify-center'>
                        <div className='w-2/3'>
                            <p className='footer_text'>Information</p>
                            <ul>
                                <li>About Us</li>
                                <li>Contact Us</li>
                                <li>Privacy Policy</li>
                                <li>Refund policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className='footer_grid flex justify-center'>
                        <div className='w-2/3'>
                            <p className='footer_text'>Cities</p>
                            <ul>
                                <li>Delhi</li>
                                <li>Lucknow</li>
                                <li>Noida</li>
                                <li>Gurugram</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom_fotter bg-rose-700">
                <p className='text-center text-white font-bold font-serif '>Copyright © 2024 The Parfois. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer

