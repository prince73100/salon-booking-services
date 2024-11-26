import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        require:true
    },
    salon:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    commentby:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const Comment = mongoose.model('Comment',commentSchema)