import { Booking } from "../model/booking.model.js";
import { razorpay } from "../index.js";
import asyncfunhandler from "../utility/asyncFunction.js";

const createBooking = asyncfunhandler(async (req, res, next) => {
    const { price } = req.body;
    console.log(req.body)
    const order = await razorpay.orders.create({
        amount: price,
        currency: 'INR'
    })
    res.json({
        razorpayOrderId: order.id,
        amount: order.amount,
        currency: order.currency
    })
})

const bookedConfirm = asyncfunhandler(async (req, res) => {
    console.log(req.body)

    const newBooking = new Booking({
        razorpayPaymentId: req.body.razorpayPaymentId,
        razorpayOrderId: req.body.razorpayOrderId,
        serviceName: req.body.bookedData.serviceName,
        price: req.body.bookedData.price,
    });

    await newBooking.save();

    res.json({ message: 'Booking confirmed!' });
})

export {
    createBooking,
    bookedConfirm
}