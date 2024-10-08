import mongoose from "mongoose";

const jobpostSchema = new mongoose.Schema({
    salonname: {
        type: String,
        required: true
    },
    Jobtitle: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    responsibility: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    bypostjob:{
        type:mongoose.Schema.ObjectId,
        ref:'Salon'
    }
}, { timestamps: true })


export const  Jobpost = mongoose.model('Jobpost', jobpostSchema);