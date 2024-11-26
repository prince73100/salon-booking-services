import { Router } from "express";
import authenticate from "../middleware/authentication.js";
import { createNewComment, getAllComment } from "../controller/ratingController.js";
const router = Router()

router.route('/postcomment/:salonId').post(authenticate,createNewComment)
router.route('/gelAllComment/:salonId').get(authenticate,getAllComment)


export default router