/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
function Footer() {
    return (
        <div className='footer '>
            <div className='footerContainer flex justify-center'>
                <div className="w-11/12 grid grid-cols-2 grid-x-10 lg:grid-cols-4 lg:gap-x-10 md:grid-cols-4 md:gap-x-10 sm:grid-cols-4 sm:gap-x-10    mt-5 ">
                    <div className='header_logo'>
                        <Link to={'/'}><img src="https://res2.weblium.site/res/5c938446fb27710024481fb9/5cd055827ec61c0023cabda8_optimized.webp" alt="" width={250} /></Link>
                    </div>
                    <div className='footer_grid '>
                        <p className='footer_text'>Services</p>
                        <ul>
                            <li>Hair Cutting</li>
                            <li>Hand feet</li>
                            <li>Make Up</li>
                            <li>Skin Care</li>
                            <li>More...</li>
                        </ul>
                    </div>
                    <div className='footer_grid'>
                        <p className='footer_text'>Information</p>
                        <ul>
                            <li>About Us</li>
                            <li>Contact Us</li>
                            <li>Privacy Policy</li>
                            <li>Refund policy</li>
                        </ul>
                    </div>
                    <div className='footer_grid'>
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
            <div className="bottom_fotter bg-rose-500">
                <p className='text-center text-white font-bold font-serif '>Copyright © 2024 The Parfois. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer

/*
<div className="footerSuBcontainer">
                <div className='header-logo'>
                    <Link to={'/'}><img src="https://res2.weblium.site/res/5c938446fb27710024481fb9/5cd055827ec61c0023cabda8_optimized.webp" alt="" /></Link>
                </div>
                <div>
                   <div><Link>Home</Link></div>
                   <div><Link>Service</Link></div>
                </div>
            </div>
*/