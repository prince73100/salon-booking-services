import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
    servicesname:[String],
    salonrefc:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Salon"
    }
},{timestamps:true})


export const Service=  mongoose.model('Service',serviceSchema);