import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true
    },
    pastBarber:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    expectedSalary:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Schema.ObjectId,
        ref:'Artist'
    }

    //
    // },
    // jobpostref:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:'Jobpost'
    // }
},{timestamps:true})


export const ArtistApplication = mongoose.model('ArtistApplication',applicationSchema)