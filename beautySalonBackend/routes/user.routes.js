import { Router } from "express";
import {  getUser, updateAccount } from "../controller/user.controller.js";
import authenticate from "../middleware/authentication.js";
import { forgetPassword, handlelogin, handleSignUp, resetPassword } from "../controller/auth.controller.js";

const router = Router()

router.route('/signup').post(handleSignUp)
router.route('/login').post(handlelogin)
router.route('/forgetPassword').post(forgetPassword)
router.route('/resetpassword/:token').patch(resetPassword)


router.route('/profile').get(authenticate,getUser)
router.route('/updateMe').post(authenticate,updateAccount)

export default router;