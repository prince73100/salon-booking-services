import { Router } from "express";
import { bookedConfirm, createBooking, getBookingDetailById } from "../controller/booking.controller.js";
import authenticate from "../middleware/authentication.js";
const router = Router()

router.route('/order').post(authenticate, createBooking)
router.route('/confirm').post(authenticate, bookedConfirm)
router.route('/getSalon/:salonid').get(getBookingDetailById)

export default router