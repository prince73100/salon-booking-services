/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
function Payment() {
    const token = localStorage.getItem('jwt')
    const { bookedData } = useSelector(store => store.user)
    const [paymentmethod, setpaymentmethod] = useState('upi')
    console.log(paymentmethod)
    const handlePayment = async () => {
        try {
            if (paymentmethod === 'upi') {
                // 1. create order
                const orderResponse = await axios.post('http://localhost:3000/api/v1/booked/order', bookedData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(orderResponse)
                //2. Open Razorpay payment modal with order_id and other details

                const options = {
                    key: "rzp_test_jQ97VLuhTDd5xp",
                    amount: orderResponse.data.amount * 100,
                    currency: orderResponse.data.currency,
                    order_id: orderResponse.data.razorpayOrderId,
                    handler: async function (response) {
                        const paymentId = response.razorpay_payment_id;
                        const orderId = response.razorpay_order_id;
                        const res = await axios.post('http://localhost:3000/api/v1/booked/confirm', {
                            razorpayPaymentId: paymentId,
                            razorpayOrderId: orderId,
                            bookedData
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        console.log(res)
                        alert('Payment Successful!');
                    },
                    theme: {
                        color: "#F37254",
                    },
                }
                const rzp = new window.Razorpay(options);
                rzp.open();
                console.log(orderResponse)
            }
            else {
                const res = await axios.post('http://localhost:3000/api/v1/booked/confirm', {
                    bookedData
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.data.status === 'success') {
                    alert('Your Booking is confirm')
                }
            }
        } catch (error) {
            console.log("ERROR:", error)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='payment    '>
            <div className="sub-step-bar bg-rose-700 h-20">
                <div className='ml-10 text-white'>
                    <span className=''> <Link to={'/'}>Home</Link> </span> / Checkout <br />
                    <div className="booking mt-3 font-bold">
                        Checkout
                    </div>
                </div>
            </div>
            <div className="lg:flex lg:justify-between lg:mx-14 lg:mt-4 personal-informaatin  ">
                <div className="booking-summary mx-10 ">
                    <div className="">
                        <h3 className='font-serif font-bold text-xl'>Booking Summary</h3>
                    </div>
                    {/* {bookedData?.selectserviceforbook?.map((item, index) => <div className="service_name mt-5 flex justify-between" key={index}>
                        <div>{item?.service}</div>
                        <div>{item?.price}</div>
                    </div>
                    )} */}
                    <div className="service_name mt-5 flex justify-between">
                        <div>{bookedData.serviceName}</div>
                        <div>{bookedData.price}</div>
                    </div>

                    {/* <div className="service_name mt-1 flex justify-between">
                        <div>Discount</div>
                        <div>- 500</div>
                    </div> */}
                    <div className="service_name mt-5 border-t-2 border-b-2 flex justify-between">
                        <div>Payble Amonut</div>
                        <div>{bookedData.price}</div>
                    </div>
                    <div className="promo_code mt-10 flex">
                        <input type="number" placeholder='Enter Your Promo code' className=' promocode_input' />
                        <button className='bg-rose-700 promo_btn'>Apply Code</button>
                    </div>
                </div>

                <div className='hidden verticle_line lg:block'>

                </div>
                <div className='w-1/2 mx-10 '>
                    <div className="pament-detail">
                        <h1 className='text-xl font-serif font-bold'>Choose payment method</h1>
                        <div className="otheer-option flex my-5">
                            <input id="upi" type="radio" className='mr-5' name='payment' value={'upi'} onChange={(e) => setpaymentmethod(e.target.value)} />
                            <label htmlFor='upi' className='font-serif text-base'>UPI</label>
                        </div>
                        <div className="otheer-option flex my-5">
                            <input id='cash' type="radio" className='mr-5' name='payment' value={'cash'} onChange={(e) => setpaymentmethod(e.target.value)} />
                            <label htmlFor='cash' className='font-serif text-base'>Cash Payment</label>
                        </div>
                        <div className="check-term-condition font-serif font-bold">
                            <input id='t&c' type="checkbox" />
                            <label htmlFor="t&c"> I have read and accept  <a href="" className='text-pink-700'>Terms & conditions</a> </label>
                        </div>
                    </div>
                    <div className='my-8'>
                        <button className='bg-rose-700 text-white font-serif font-bold px-5 py-2  rounded-lg' onClick={handlePayment}> {paymentmethod === 'upi' ? `Confirm and Pay` : `Click to Book`} </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment




// bookingService/${item?._id}/${item?.serviceName}/${item.price}/${item?.servicesCreatedBy?._id}/${item?.servicesCreatedBy?.salonName}` : '/login'