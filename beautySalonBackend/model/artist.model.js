import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const artistSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"Name must be require"],
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"Email must be require"],
        unique:[true,'This email id is already exist']
    },
    streetaddress:{
        type:String,
        required:true
    },
    city:{
        type:String
    },
    region:{
        type:String
    },
    postalcode:{
        type:String     
    },
    experience:{
        type:String
    },
    qualification:{
        type:String
    },
    gender:{
        type:String
    },
    phonenumber:{
        type:String,
        required:true,
        unique:[true,"this phone number already exist"]
    },
    status:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:[true,'password must be require']
    }
})

artistSchema.pre('save', async function(next){
    if(!this.isModified("password")) next() 
    this.password = await bcrypt.hash(this.password, 10)
    this.confirmPassword = undefined
    next()
})

artistSchema.methods.isCorrectPassword = function(newPassword){
    return bcrypt.compare(newPassword,this.password)
}


export const Artist  = mongoose.model('Artist',artistSchema)