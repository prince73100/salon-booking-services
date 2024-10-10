import mongoose from 'mongoose'

const salonRegisteredSchema = new mongoose.Schema({
    salonName:{
        type:String,
        required:[true,"Name must be require"],
    },
    salonType:{
        type:String,
        required:[true,'Give a salon name']
    },
    phone:{
        type:String,
        unique:true,
        require:[true,'please enter a phone number']
    },
    address:{
        type:String,
        required:[true,'Enter your salon address']
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    location:{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        coordinates :[Number]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

export const Salonregistered  = mongoose.model('Salonregistered',salonRegisteredSchema)