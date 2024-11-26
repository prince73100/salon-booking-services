import { Comment } from "../model/comment.model.js";
import { Rating } from "../model/rating.js";
import Apierror from "../utility/Apierror.js";
import asyncfunhandler from "../utility/asyncFunction.js";

const ratingCreate = asyncfunhandler(async (req, res, next) => {
    if (await Rating.findOne({ ratedBy: req.user._id, salon: req.params.salonId })) {
        return res.status(200).json({
            status: 'fail',
            message: 'You cannot give more than one rating'
        })
    }
    const newRating = await Rating.create({
        rating: req.body.rating,
        israting: true,
        salon: req.params.salonId,
        ratedBy: req.user._id
    })
    res.status(200).json({
        status: 'success',
        newRating
    })
})

const ratingById = asyncfunhandler(async (req, res, next) => {
    const salonid = req.params.salonId
    const rating = await Rating.findOne({ ratedBy: req.user._id, salon: salonid }).select('rating israting')
    res.status(200).json({
        status: 'success',
        rating
    })
})

// ----------------------COMMENT -----------------------------------

const createNewComment = asyncfunhandler(async(req,res,next)=>{
    const newComment = await Comment.create({
        comment:req.body.comment,
        salon:req.params.salonId,
        commentby:req.user._id
    })

    res.status(201).json({
        status:'success',
        newComment
    })
})

const getAllComment = asyncfunhandler(async(req,res,next)=>{
    const q = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page-1)*limit;

    const allComment = await Comment.find({salon:req.params.salonId}).skip(skip).limit(limit).sort("-createdAt").populate('commentby')
    res.status(200).json({
        status:'success',
        allComment
    })
})


export {
    ratingCreate,
    ratingById,
    createNewComment,
    getAllComment
}