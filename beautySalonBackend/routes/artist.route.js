import { Router } from "express";
import {  submittApplication } from "../controller/artist.controller.js";
import authenticate from "../middleware/authentication.js";

const router = Router()


router.route('/applicationsubmit/:token').post(authenticate,submittApplication)

export default router