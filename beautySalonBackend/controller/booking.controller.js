import { Booking } from "../model/booking.model.js";
import { razorpay } from "../index.js";
import asyncfunhandler from "../utility/asyncFunction.js";
import sendEmail from "../utility/sendEmail.js";

const createBooking = asyncfunhandler(async (req, res, next) => {
  const { price } = req.body;
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

  const newBooking = new Booking({
    razorpayPaymentId: req.body.razorpayPaymentId || "",
    razorpayOrderId: req.body.razorpayOrderId || "",
    serviceName: req.body.bookedData.serviceName,
    price: req.body.bookedData.price,
    salonID: req.body.bookedData.salonId,
    bookedBy: req.user.id,
    serviceDateAndTime: req.body.bookedData.date,
    ispayment: req.body.razorpayPaymentId ? true : false
  });

  await newBooking.save();
  const bookingDetail = await Booking.findById(newBooking._id).populate('salonID')
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Salon Booking Confirmation</title>
  <style>
    /* General styling for email */
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #5a2e8a;
      text-align: center;
    }
    .content {
      font-size: 16px;
      line-height: 1.6;
      color: #333;
    }
    .details {
      background-color: #f3f3f3;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .details p {
      margin: 5px 0;
      font-weight: bold;
    }
    .details span {
      font-weight: normal;
      color: #555;
    }
    .footer {
      font-size: 14px;
      color: #666;
      text-align: center;
      margin-top: 20px;
    }
    .footer a {
      color: #5a2e8a;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h2>✨ Your Salon Appointment is Confirmed! ✨</h2>

    <div class="content">
      <p>Hi ${req.user.firstname},</p>
      <p>Thank you for booking with <strong>${bookingDetail.salonID.salonName}</strong>! We’re excited to pamper you and help you look and feel your best.</p>
      
      <div class="details">
        <p>Date: <span>${req.body.bookedData.date.split('T')[0]}</span></p>
        <p>Time: <span>${req.body.bookedData.date.split('T')[1].split('+')[0]}</span></p>
        <p>Service(s): <span>${req.body.bookedData.serviceName}</span></p>
        <p>Price: <span>${req.body.bookedData.price}</span></p>
        <p>Payment Status: <span>${bookingDetail.ispayment === true ? `Paid` : `Pending`}</span></p>
        <p>Location: <span><a href="[Google Maps link]" target="_blank">[Salon Address]</a></span></p>
      </div>

      <p><strong>Appointment Reminders:</strong></p>
      <ul>
        <li>Please arrive 10 minutes early to ensure your session starts on time.</li>
        <li>If you need to reschedule, let us know at least 24 hours in advance.</li>
      </ul>

      <p><strong>Contact Us:</strong></p>
      <p>Phone: <span>${bookingDetail.salonID.phone}</span></p>
    </div>

    <div class="footer">
      <p>Looking forward to seeing you at <strong>${bookingDetail.salonID.salonName}</strong>!</p>
      <p>P.S. Don’t forget to check out our website for more tips and exclusive offers: <a href="[Salon Website URL]" target="_blank">[Salon Website URL]</a></p>
    </div>
  </div>
</body>
</html>
`
  try {
    sendEmail({
      email: req.user.email,
      subject: 'Your Booking is confirmed',
      message: "booking",
      html
    })
    res.json({ status: 'success', message: 'Booking confirmed!' });
  } catch (error) {
    return next(new Apierror('there was an error for sending mail', 500))
  }
})

// booking detail by salon id
const getBookingDetailById = asyncfunhandler(async (req, res, next) => {
  const bookingDetails = await Booking.find({ salonID: req.params.salonid });
  res.status(200).json({
    status: 'success',
    bookingDetails
  })
})


// booking detail by userID
const bookingByUserId = asyncfunhandler(async (req, res, next) => {
  const bookHistory = await Booking.find({ bookedBy: req.user._id }).populate('salonID').sort('-serviceDateAndTime')
  res.status(200).json({
    status: 'success',
    bookHistory
  })
})

export {
  createBooking,
  bookedConfirm,
  getBookingDetailById,
  bookingByUserId
}