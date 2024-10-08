import React from 'react'
import { Link } from 'react-router-dom'
function Payment() {
    return (
        <div className='payment '>
            <div className="sub-step-bar bg-pink-700 h-20">
                <div className='ml-10 text-white'>
                    <span className=''> <Link to={'/'}>Home</Link> </span> / Checkout <br />
                    <div className="booking mt-3 font-bold">
                        Checkout
                    </div>
                </div>
            </div>
            <div className="personal-informaatin mx-14 mt-4 flex justify-between">
                <div className='w-2/3'>
                    <div className="heading">
                        <div className="subheading">
                            <h3 className='font-serif font-bold text-xl'>Personal Information</h3>
                        </div>
                        <div className="input-field mt-4 grid grid-rows-2 grid-cols-2 gap-5 ">
                            <div className='border rounded-lg border-gray-800'>
                                <input type="text" placeholder=' First Name' style={{ outline: 'none', border: "none", padding: '5px' }} />
                            </div>
                            <div className='border rounded-lg border-gray-800'>
                                <input type="text" placeholder=' Last Name' style={{ outline: 'none', border: "none", padding: '5px' }} />
                            </div>
                            <div className='border rounded-lg border-gray-800'>
                                <input type="email" placeholder='email' style={{ outline: 'none', border: "none", padding: '5px' }} />
                            </div>
                            <div className='border rounded-lg border-gray-800'>
                                <input type="text" placeholder='Phone' style={{ outline: 'none', border: "none", padding: '5px' }} />
                            </div>
                            <div className="askloginornot font-serif text-lg">
                                Existing Customer ? <span className='text-pink-700'>Click here to login</span>
                            </div>
                        </div>
                    </div>
                    <hr className='my-5' />
                    <div className="pament-detail">
                        <div className="pay-heading">
                            <h3 className='font-serif font-bold text-xl'>Payment method</h3>
                            <div className="radio-btn mt-4">
                                <input type="radio" className='mr-4' />
                                <span className='font-serif font-bold'>Credit Card</span>
                            </div>
                        </div>
                        <div className="card-detail">
                            <div className="grid grid-cols-2  gap-x-12 my-4">
                                <div className='border border-neutral-950 rounded-lg'>
                                    <input type="text" placeholder='Cardname' style={{ padding: '5px', outline: 'none' }} />
                                </div>
                                <div className='border border-neutral-950 rounded-lg'>
                                    <input type="number" placeholder='Card number' style={{ padding: '5px', outline: "none" }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 my-4 gap-5">
                                <div className='border border-neutral-950 rounded-lg'>
                                    <input type="text" placeholder='Expire month' style={{ padding: '5px', outline: 'none' }} />
                                </div>
                                <div className='border border-neutral-950 rounded-lg'>
                                    <input type="text" placeholder='Expire Year' style={{ padding: '5px', outline: 'none' }} />
                                </div>
                                <div className='border border-neutral-950 rounded-lg'>
                                    <input type="number" placeholder='CVV' style={{ padding: '5px', outline: 'none' }} />
                                </div>
                            </div>
                        </div>
                        <div className="otheer-option flex my-5">
                            <input type="radio" className='mr-5' />
                            <h3 className='font-serif font-bold'>Paypal</h3>
                        </div>
                        <div className="check-term-condition font-serif font-bold">
                            <input type="checkbox" />
                            <label htmlFor=""> I have read and accept  <a href="" className='text-pink-700'>Terms & conditions</a> </label>
                        </div>
                    </div>
                    <div className='my-8'>
                        <Link to={'/continuetopay'} className='bg-pink-700 text-white font-serif font-bold p-5 rounded-lg'> Confirm and Pay</Link>
                    </div>
                </div>

                <div className='verticle_line'>
                    
                </div>

                <div className="booking-summary mr-28">
                    <div className="">
                        <h3 className='font-serif font-bold text-xl'>Booking Summary</h3>
                    </div>
                    <div className="service_name mt-10 flex justify-between">
                       <div>Body Massage</div>
                       <div>500</div>
                    </div>
                    <div className="service_name mt-10 flex justify-between">
                       <div>Total</div>
                       <div>500</div>
                    </div>
                    <div className="service_name mt-1 flex justify-between">
                       <div>Discount</div>
                       <div>- 500</div>
                    </div>
                    <div className="service_name mt-5 border-t-2 border-b-2 flex justify-between">
                       <div>Payble Amonut</div>
                       <div>- 500</div>
                    </div>
                    <div className="promo_code mt-10 flex">
                        <input type="number" placeholder='Enter Your Promo code' className=' promocode_input' />
                        <button className='bg-rose-500 promo_btn'>Apply Code</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
