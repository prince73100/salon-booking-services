import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs'

const salonSchema = new mongoose.Schema({
    salonname: {
        type: String,
        required: true
    },
    salontype: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    states:{
        type:Boolean,
        default:false
    },
    gpslocation: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: [Number],
        name: String
    }
}, { timestamps: true })


salonSchema.pre('save', async function(next){
    if(!this.isModified("password")) next() 
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

salonSchema.methods.isCorrectPassword = function(newpassword){
    return bcrypt.compare(newpassword,this.password)
}

export const Salon = mongoose.model('Salon', salonSchema);