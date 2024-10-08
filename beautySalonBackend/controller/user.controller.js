import { User } from "../model/user.model.js"
import asyncfunhandler from "../utility/asyncFunction.js"
import Apierror from "../utility/Apierror.js"




const updateAccount = asyncfunhandler(async (req, res, next) => {
    // allow only email or  phone number to be updated
    const allowObject = {}
    Object.keys(req.body).forEach(el => {
        if (['email', 'phone'].includes(el)) allowObject[el] = req.body[el]
    })
    const updateUser = await User.findByIdAndUpdate(req.user.id, allowObject, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        status: 'success',
        updateUser
    })
})


// allowObject[el] = req.body.email;
const getUser = asyncfunhandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        return next(new Apierror('user not login or session expire', 404))
    }
    res.status(200).json({
        status: 'success',
        user
    })
})


export {
    getUser,
    updateAccount
}
