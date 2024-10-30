import { Jobpost } from "../model/jobpost.model.js"
import { Salon } from "../model/salon.model.js"
import asyncfunhandler from "../utility/asyncFunction.js"
import { Salonregistered } from "../model/salonregistered.model.js"
import { Services } from "../model/services.model.js"
import Apierror from "../utility/Apierror.js"
import { uploadOncloudinary } from "../utility/cloundinary.js"


// get salon by SalonID
const getSalonById = asyncfunhandler(async (req, res, next) => {
    const salonbyId = await Salonregistered.findById(req.params.salonId).select('-location -__v').populate('owner')
    res.status(200).json({
        status: 'success',
        salonbyId
    })
})

// get All Service but unique 
const getUniqueServices = asyncfunhandler(async (req, res, next) => {
    // 1. get all salon 
    let services = await Services.find().populate('servicesCreatedBy')
    let uniqueServices = [];
    res.status(201).json({
        status: 'success',
        result: services.length,
        services
    })
})

// find salon within range        findSalon_with-in/distance/:distance/center/:latlng
const findSalonWith_in = asyncfunhandler(async (req, res, next) => {
    const { distance, latlng } = req.params;
    const [lat, lng] = latlng.split(',');
    const lnglat = [lng, lat];
    const radius = distance / 6378.1;
    const response = await Salonregistered.find({ location: { $geoWithin: { $centerSphere: [lnglat, radius] } } })
    res.status(200).json({
        status: 'success',
        result: response.length,
        response
    })
})

//  get All Job posted by any salon
const getAllposted = asyncfunhandler(async (req, res, next) => {
    const allJob = await Jobpost.find();
    if (!allJob) {
        return next(new Apierror('Not have any job post now', 404))
    }
    res.status(200).json({
        status: 'success',
        allJob
    })
})

// handle posting a job
const handlePostjob = asyncfunhandler(async (req, res, next) => {
    console.log(req.user)
    const currentSalon = await Salonregistered.find({ owner: req.user._id })
    if (!currentSalon) {
        return next(new Apierror('Salon is not registered', 401))
    }
    const job = await Jobpost.create({
        jobtitle: req.body.jobtitle,
        salary: req.body.salary,
        location: req.body.location,
        education: req.body.education,
        skill: req.body.skill,
        jobdescription: req.body.jobdec,
        bypostjob: currentSalon[0]._id
    })
    res.status(200).json({
        Status: 'success',
        job
    })
})

// GET ALL Registered SALON
const getAllSalon = asyncfunhandler(async (req, res, next) => {
    const getAllSalon = await Salonregistered.find().populate('owner')
    res.status(200).json({
        status: 'success',
        result: getAllSalon.length,
        getAllSalon
    })
})
//GET service for a salon
const getServices = asyncfunhandler(async (req, res) => {
    let allServices;
    if (req.params.salonID) {
        allServices = await Services.find({ servicesCreatedBy: req.params.salonID }).populate('servicesCreatedBy')
    } else {
        const currentSalon = await Salonregistered.find({ owner: req.user._id })
        allServices = (await Services.find({ servicesCreatedBy: currentSalon[0]._id })).populate('servicesCreatedBy')
    }
    res.status(200).json({
        status: 'success',
        allServices
    })
})
// handle Registered methods
const handleRegistered = asyncfunhandler(async (req, res, next) => {
    const paths = await uploadOncloudinary(req.file.path)
    const registeredSalon = await Salonregistered.create({
        salonName: req.body.salonName,
        salonType: req.body.salonType,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        location: {
            coordinates: [Number(req.body.location.split(',')[0]), Number(req.body.location.split(',')[1])]
        },
        imageofSalon: paths.url,
        owner: req.user.id
    })
    res.status(201).json({
        status: 'success',
        message: 'Your Business Registered Successfully',
        registeredSalon
    })
})
// add service
const handleAddServices = asyncfunhandler(async (req, res, next) => {
    const path = await uploadOncloudinary(req.file.path)
    const currentSalon = await Salonregistered.find({ owner: req.user._id })
    const newServices = await Services.create({
        serviceName: req.body.serviceName,
        price: req.body.price,
        image: path.url,
        servicesCreatedBy: currentSalon[0]._id
    })
    res.status(201).json({
        status: 'success',
        newServices
    })
})
// delete Services
const haldleDeleteServices = asyncfunhandler(async (req, res, next) => {
    const result = await Services.findByIdAndDelete(req.params.serviceId)
    res.status(200).json({
        status: 'success',
        result: null
    })
})






export {
    handlePostjob,
    getAllposted,
    getServices,
    handleRegistered,
    handleAddServices,
    getAllSalon,
    haldleDeleteServices,
    findSalonWith_in,
    getUniqueServices,
    getSalonById
}

