import { Router } from "express";
import {
    findSalonWith_in,
    getAllposted,
    getAllSalon,
    getSalonById,
    getServices,
    getUniqueServices,
    haldleDeleteServices,
    handleAddServices,
    handlePostjob,
    handleRegistered,
} from "../controller/salon.controller.js";
import authenticate from "../middleware/authentication.js";
import { upload } from "../middleware/multer.js";


const router = Router()


router.route('/getalljobs').get(getAllposted)
router.route('/getservice/:salonID').get(getServices)
router.route('/getservices').get(authenticate,getServices)
router.route('/getservices/:salonID').get(authenticate,getServices)


// GET salon by id
router.route('/getsalonById/:salonId').get(getSalonById)
//find unique services uniqueServices
router.route('/uniqueServices').get(getUniqueServices)
// find salon with in range 
router.route('/findSalon_with-in/distance/:distance/center/:latlng').get(findSalonWith_in)
// for post job route
router.route('/postingjob').post(authenticate,handlePostjob)
router.route('/getallsalon').get(getAllSalon)
// Registered salon route         authenticate
router.route('/rgistered').post(authenticate,upload.single('image'),handleRegistered)   
router.route('/addServices').post(authenticate,upload.single('image'),handleAddServices)
// delete Services
router.route('/deleteservices/:serviceId').delete(authenticate,haldleDeleteServices)

export default router;