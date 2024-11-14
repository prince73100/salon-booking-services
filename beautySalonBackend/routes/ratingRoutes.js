import { Router } from "express";
import { ratingById, ratingCreate } from "../controller/ratingController.js";
import authenticate from "../middleware/authentication.js";
const router = Router()

router.route('/postrating/:salonId').post(authenticate,ratingCreate)
router.route('/getrating/:salonId').get(authenticate,ratingById)



export default router