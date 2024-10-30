import dotenv from 'dotenv'
import express from 'express'
dotenv.config({
    path: './.env'
})
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes.js'
import artistRoutes from './routes/artist.route.js'
import salonRoutes from './routes/salon.route.js'
import bookingRoutes from './routes/booking.route.js'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import { globalerrorHandler } from './controller/error.controller.js'
import Apierror from './utility/Apierror.js'
import Razorpay from 'razorpay';

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// razorpay initialization

export const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET
})

mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`).then(() => {
    console.log("Database connnect is successfully ");
}).catch((err) => {
    console.log(err.message);
    process.exit(1);
})
app.use(express.json())
app.use(cookieparser())
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/artist', artistRoutes)
app.use('/api/v1/salon', salonRoutes)
app.use('/api/v1/booked',bookingRoutes)

// handle unhandled routes 

app.all('*', (req, res, next) => {
    return next(new Apierror(`can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalerrorHandler)

app.listen(process.env.PORT, (err) => {
    console.log(`Server is runing at ${process.env.PORT}`);
})
