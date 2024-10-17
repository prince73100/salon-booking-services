import mongoose from "mongoose";
const jobpostSchema = new mongoose.Schema({
    jobtitle: {
        type: String,
        required: [true,'Jobtitle must require']
    },
    salary: {
        type: Number,
        required: [true,'salary must be require']
    },
    location: {
        type: String,
        required: [true,'location must be require']
    },
    education: {
        type: String,
        required: [true,'education or qualification are require']
    },
    skill: {
        type: String,
        required: [true,'skill must be require']
    },
    jobdescription:{
        type:String,
        require:[true,'please give job decription']
    },
    bypostjob:{
        type:mongoose.Schema.ObjectId,
        ref:'Salonregistered'
    }
}, { timestamps: true })


export const  Jobpost = mongoose.model('Jobpost', jobpostSchema);