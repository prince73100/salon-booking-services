/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../config/config';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { customeraction } from '../../../store/customerStore';


function Payment() {
    const token = localStorage.getItem('jwt')
    const { bookedData } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const [paymentmethod, setpaymentmethod] = useState('upi')
    const [open, setOpen] = React.useState(false);

    const [ischeck, setIscheck] = useState(false)

    const handlePayment = async () => {
        setOpen(true)
        try {
            if (ischeck) {
                console.log("thid check tand c")
                if (paymentmethod === 'upi') {
                    console.log("thiccheckmethod")
                    // 1. create order
                    const orderResponse = await axios.post(`${apiUrl}/api/v1/booked/order`, bookedData, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    //2. Open Razorpay payment modal with order_id and other details
                    if (orderResponse.status === 200) {
                        setOpen(false)
                        const options = {
                            key: "rzp_test_jQ97VLuhTDd5xp",
                            amount: orderResponse.data.amount * 100,
                            currency: orderResponse.data.currency,
                            order_id: orderResponse.data.razorpayOrderId,
                            handler: async function (response) {
                                const paymentId = response.razorpay_payment_id;
                                const orderId = response.razorpay_order_id;
                                const res = await axios.post(`${apiUrl}/api/v1/booked/confirm`, {
                                    razorpayPaymentId: paymentId,
                                    razorpayOrderId: orderId,
                                    bookedData
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                });
                                if (res.data.status === 'success') {
                                    dispatch(customeraction.toaddBookingHistory(res.data.bookingDetail))
                                    navigation('/history')
                                }
                                console.log(res)
                            },
                            theme: {
                                color: "#F33A6A",
                            },
                        }
                        const rzp = new window.Razorpay(options);
                        rzp.open();
                    } else {
                        alert("issue during payment")
                    }
                }
                else {
                    const res = await axios.post(`${apiUrl}/api/v1/booked/confirm`, {
                        bookedData
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log(res)
                    if (res.data.status === 'success') {
                        navigation('/history')
                        setOpen(false)
                    }
                }
            } else {
                alert('please check t&c')
                setOpen(false)
            }
        } catch (error) {
            console.log("ERROR:", error)
            setOpen(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log(ischeck)
    return (
        <div className=''>
            <div className="flex justify-center h-20 mt-24">
                <div className='w-11/12 bg-rose-600  px-5 text-white'>
                    <span className=''> <Link to={'/'}>Home</Link> </span> / Checkout <br />
                    <div className="booking mt-3 font-bold">
                        Checkout
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className="w-11/12 lg:flex lg:justify-between  mt-4   ">
                    <div className="booking-summary lg:mt-1 ">
                        <div className="">
                            <h3 className=' font-bold text-xl'>Booking Summary</h3>
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
                            <button className='bg-rose-600 promo_btn text-sm'>Apply Code</button>
                        </div>
                    </div>

                    <div className='hidden verticle_line lg:block'>

                    </div>
                    <div className=' lg:w-1/2 lg:mt-1 mt-5'>
                        <div className="pament-detail ">
                            <h1 className='text-xl  font-bold '>Choose payment method</h1>
                            <div className="otheer-option flex my-5">
                                <input id="upi" type="radio" className='mr-5' name='payment' value={'upi'} onChange={(e) => setpaymentmethod(e.target.value)} />
                                <label htmlFor='upi' className=' text-base'>UPI</label>
                            </div>
                            <div className="otheer-option flex my-5">
                                <input id='cash' type="radio" className='mr-5' name='payment' value={'cash'} onChange={(e) => setpaymentmethod(e.target.value)} />
                                <label htmlFor='cash' className=' text-base'>Cash Payment</label>
                            </div>
                            <div className="check-term-condition w-full  font-bold ">
                                <input id='t&c' type="checkbox" onChange={() => setIscheck((prev) => !prev)} />
                                <label htmlFor="t&c" className=''> I have read and accept  <a href="" className='text-rose-700 '>Terms & conditions</a> </label>
                            </div>
                        </div>
                        <div className='my-8'>
                            <button className='bg-rose-600 text-white  font-bold px-5 py-2  rounded-lg' onClick={handlePayment}> {paymentmethod === 'upi' ? `Confirm and Pay` : `Click to Book`} </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*  backdrop*/}
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Payment




// bookingService/${item?._id}/${item?.serviceName}/${item.price}/${item?.servicesCreatedBy?._id}/${item?.servicesCreatedBy?.salonName}` : '/login'