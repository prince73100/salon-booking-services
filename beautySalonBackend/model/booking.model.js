import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    serviceName: {
        type: String
    },
    price: {
        type: String
    },
    serviceDateAndTime: {
        type: Date
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'cancel', 'confirem']
    },
    ispayment: {
        type: Boolean,
        default: false
    },
    salonID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Salonregistered'
    },
    bookedBy: {
        type: mongoose.Schema.ObjectId,             // for  user id whhich represent user which is book
        ref: 'User'
    },
    razorpayPaymentId:{
        type:String
    },
    razorpayOrderId:{
        type:String
    }
}, { timestamps: true })


export const Booking = mongoose.model('Booking', bookingSchema)



/*
1. which service
2. which date
3. which time
4. which salon 
5. 
*/