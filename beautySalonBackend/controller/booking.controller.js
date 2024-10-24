import { Booking } from "../model/booking.model";
import asyncfunhandler from "../utility/asyncFunction";

const createBooking = asyncfunhandler(async (req, res, next) => {
    const { date, price, serviceName, salonId } = req.body;
    const bookingRes = await Booking.create({
        serviceName: serviceName,
        serviceDateAndTime: date,
        price: price,
        salonID: salonId,
        bookedBy: req.user.id
    })
    res.status(201).json({
        status: 'success',
        bookingRes
    })
})

export {
    createBooking
}