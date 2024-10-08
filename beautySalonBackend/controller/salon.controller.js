import { Jobpost } from "../model/jobpost.model.js"
import { Salon } from "../model/salon.model.js"
import { Service } from "../model/services.model.js"
import { genToken } from "../utility/genreateToken.js"

const salonsignup = async (req, res) => {
    const { salonname, salontype, address, email, phonenumber, password, gpslocation } = req.body
    try {
        const existUser = await Salon.findOne({ email })
        if (existUser) {
            return res.json({
                message: "user already exist",
                status: 409
            })
        }
        const user = await Salon.create({
            salonname,
            salontype,
            email,
            address,
            phonenumber,
            gpslocation,
            password
        })
        if (!user) {
            return res.json({
                message: "usernot not created! Check all field all correct",
                status: 400
            })
        }
        res.status(201).json({
            user,
            message: "New user created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const salonLogin = async (req, res) => {
    try {
        const { phonenumber, password } = req.body
        if (phonenumber == " " && password == "") {
            return res.json({
                message: "Both feild are require",
                status: 409
            })
        }
        const salon = await Salon.findOne({ phonenumber })
        if (!salon) {
            return res.json({
                message: "user is not exist",
                status: 404
            })
        }

        const iscorrect = await salon.isCorrectPassword(password)
        if (!iscorrect) {
            return res.json({
                message: "Invalid Password",
                status: 409
            })
        }
        const activeSalon = await Salon.findOneAndUpdate({ phonenumber }, { states: true }, { new: true }).select('-password')
        const token = genToken(salon._id)

        const option = {
            httpOnly: true,
            secure: true
        }

        return res.cookie('token', token, option).status(200).json({
            message: "Sucessfully Login",
            token,
            activeSalon
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const salonLogout = async (req, res) => {
    try {
        const artist = await Salon.findByIdAndUpdate(req.user.id, { states: false }, { new: true }).select("-password")
        res.status(200).json({
            message: "User Logout",
            artist
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
// POSTING A JOB

const handlePostjob = async (req, res) => {
    try {
        const { Jobtitle, salary, address, responsibility, education, jobtitle, skill } = req.body
        const salobPostJobs = await Salon.findById({_id:req.user.id})
        console.log(salobPostJobs);
        
        const job = await Jobpost.create({
            salonname:salobPostJobs.salonname,
            Jobtitle,
            salary,
            address,
            responsibility,
            education,
            jobtitle,
            skill,
            bypostjob: req.user.id
        })

        if (!job) {
            return res.json({
                message: "some thing wrong try again",
                status: 400
            })
        }

        res.status(200).json({
            message: "Application Apply Successfully",
            job
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

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
// service for a salon
const getServices = async (req, res) => {
    try {
        const salondata = await Salon.findOne({ salonname: req.params.salonname })
        const services = await Service.findOne({ salonrefc: salondata._id })
        if (!services) {
            return res.json({
                message: "Not add any services",
                status: 404
            })
        }
        res.status(200).json({
            message: "ok",
            services
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//  get All Job posted by any salon

const getAllposted = async(req,res)=>{
    try {
        const allJob = await Jobpost.find();
        if(!allJob){
            return res.json({
                message:"Not have any job post now",
                status:404
            })
        }
        res.status(200).json({
            message:"All jobs",
            allJob
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}



export {
    getServices,
    salonsignup,
    salonLogin,
    addServices,
    getSalon,
    salonLogout,
    handlePostjob,
    getAllposted
}