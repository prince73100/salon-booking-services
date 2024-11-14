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

export {
    ratingCreate,
    ratingById
}