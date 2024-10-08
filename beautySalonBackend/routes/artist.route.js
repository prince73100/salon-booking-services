import { Router } from "express";
import { artistLogin, artistsignUp, logout, submittApplication } from "../controller/artist.controller.js";
import authenticate from "../middleware/authentication.js";

const router = Router()

router.route('/artistsignup').post(artistsignUp)
router.route('/artistlogin').post(artistLogin)
router.route('/artistlogout/:token').post(authenticate,logout)
router.route('/applicationsubmit/:token').post(authenticate,submittApplication)

export default router