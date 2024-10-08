import mongoose from "mongoose";

const artistsalonSchema =  new mongoose.Schema({
    artistRef:{
        type:mongoose.Schema.ObjectId,
        ref:'Artist'
    },
    salonRef:{
        type:mongoose.Schema.ObjectId,
        ref:'Salon'
    }
},{timestamps:true})

export const Artistsalon = mongoose.model("Artistsalon",artistsalonSchema)