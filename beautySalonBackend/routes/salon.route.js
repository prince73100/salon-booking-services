import { Router } from "express";
import {
    addServices,
    getAllposted,
    getSalon,
    getServices,
    handlePostjob,
    handleRegistered,
    salonLogin,
    salonLogout,
    salonsignup
} from "../controller/salon.controller.js";
import authenticate from "../middleware/authentication.js";

const router = Router()

router.route('/signup').post(salonsignup)
router.route('/login').post(salonLogin)
router.route('/logout/:token').post(authenticate, salonLogout)
router.route('/getallsalon').get(getSalon)
router.route('/addservice/:token').post(authenticate, addServices)
router.route('/getservices/:salonname').get(getServices)
router.route('/postjob/:token').post(authenticate, handlePostjob)
router.route('/getalljobs').get(getAllposted)


// Registered salon route         authenticate
router.route('/rgistered').post(authenticate,handleRegistered)

export default router;