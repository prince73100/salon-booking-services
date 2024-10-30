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

const bookedConfirm = asyncfunhandler(async (req, res, next) => {
    console.log(req.body)

    const newBooking = new Booking({
        razorpayPaymentId: req.body.razorpayPaymentId,
        razorpayOrderId: req.body.razorpayOrderId,
        serviceName: req.body.bookedData.serviceName,
        price: req.body.bookedData.price,
        salonID: req.body.bookedData.salonId,
        bookedBy: req.user.id,
        serviceDateAndTime: req.body.bookedData.date
    });

    await newBooking.save();
    res.json({ message: 'Booking confirmed!' });
})


const getBookingDetailById = asyncfunhandler(async (req, res, next) => {
    const bookingDetails = await Booking.find({ salonID: req.params.salonid });
    res.status(200).json({
        status: 'success',
        bookingDetails
    })
})

export {
    createBooking,
    bookedConfirm,
    getBookingDetailById
}