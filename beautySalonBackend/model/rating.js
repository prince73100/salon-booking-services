import mongoose from 'mongoose';
const ratingSchema = new mongoose.Schema({
    rating:{
        type:Number,
        default:0
    },
    israting:{
        type:Boolean,
        default:false
    },
    salon:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    ratedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const Rating = mongoose.model('Rating',ratingSchema)