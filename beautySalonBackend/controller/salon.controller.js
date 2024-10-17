import { Jobpost } from "../model/jobpost.model.js"
import { Salon } from "../model/salon.model.js"
import asyncfunhandler from "../utility/asyncFunction.js"
import { Salonregistered } from "../model/salonregistered.model.js"
import { Services } from "../model/services.model.js"
import Apierror from "../utility/Apierror.js"




// Add services 
const addServices = async (req, res) => {
    try {
        const data = req.body
        const userId = req.user.id
        const sservices = await Service.findOne({ salonrefc: userId })
        if (sservices) {
            const servicename = sservices.servicesname
            const response = await Service.findOneAndUpdate({ salonrefc: userId }, {
                servicesname: [...servicename, ...data]
            }, { new: true })
            return res.json({
                message: "ADD",
                response
            })
        }
        const resultServices = await Service.create({
            servicesname: data,
            salonrefc: req.user.id
        })
        res.status(200).json({
            message: "add",
            resultServices
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
// get all salon
const getSalon = async (req, res) => {
    try {
        const salon = await Salon.find()
        return res.status(200).json({
            message: "Get all salon ",
            salon
        })
    } catch (error) {

    }
}


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
        allServices = await Services.find({ servicesCreatedBy: req.params.salonID }).select('serviceName price image')
    } else {
        const currentSalon = await Salonregistered.find({ owner: req.user._id })
        allServices = await Services.find({ servicesCreatedBy: currentSalon[0]._id }).select('serviceName price image')
    }
    res.status(200).json({
        status: 'success',
        allServices
    })
})
// handle Registered methods
const handleRegistered = asyncfunhandler(async (req, res, next) => {
    req.body.owner = req.user.id
    const registeredSalon = await Salonregistered.create(req.body);
    res.status(201).json({
        status: 'success',
        registeredSalon
    })
})
// add service
const handleAddServices = asyncfunhandler(async (req, res, next) => {
    const currentSalon = await Salonregistered.find({ owner: req.user._id })
    const newServices = await Services.create({
        serviceName: req.body.serviceName,
        price: req.body.price,
        image: req.file.filename,
        servicesCreatedBy: currentSalon[0]._id
    })
    res.status(201).json({
        status: 'success',
        newServices
    })
})
// delete Services
const haldleDeleteServices=asyncfunhandler(async(req,res,next)=>{
    const result = await Services.findByIdAndDelete(req.params.serviceId)
    res.status(200).json({
        status:'success',
        result:null
    })
})

export {
    addServices,
    getSalon,
    handlePostjob,
    getAllposted,



    getServices,
    handleRegistered,
    handleAddServices,
    getAllSalon,
    haldleDeleteServices
}

