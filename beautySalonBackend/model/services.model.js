import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema({
    serviceName:{
        type:String,
        require:[true,"Service Name must Eneter"]
    },
    price:{
        type:String,
        require:[true,"Price must be enter"]
    },
    image:{
        type:String
    },
    servicesCreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Salonregistered'
    }
},{timestamps:true})

export const Services = mongoose.model('Services',serviceSchema)