import { Router } from "express";
import { bookedConfirm, createBooking } from "../controller/booking.controller.js";
const router = Router()

router.route('/order').post(createBooking)
router.route('/confirm').post(bookedConfirm)

export default router