import { Router } from "express";
import {
    addServices,
    getAllposted,
    getAllSalon,
    getSalon,
    getServices,
    handleAddServices,
    handlePostjob,
    handleRegistered,
} from "../controller/salon.controller.js";
import authenticate from "../middleware/authentication.js";
import { upload } from "../middleware/multer.js";


const router = Router()


router.route('/addservice/:token').post(authenticate, addServices)
router.route('/postjob/:token').post(authenticate, handlePostjob)
router.route('/getalljobs').get(getAllposted)


router.route('/getservice/:salonID').get(getServices)
router.route('/getservices').get(authenticate,getServices)

router.route('/getallsalon').get(getAllSalon)
// Registered salon route         authenticate
router.route('/rgistered').post(authenticate,handleRegistered)   
router.route('/addServices').post(authenticate,upload.single('image'),handleAddServices)

export default router;