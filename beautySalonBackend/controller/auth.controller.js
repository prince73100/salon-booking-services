import { User } from "../model/user.model.js"
import Apierror from "../utility/Apierror.js"
import asyncfunhandler from "../utility/asyncFunction.js"
import {genToken} from '../utility/genreateToken.js'

const handleSignUp = asyncfunhandler(async (req, res, next) => {
    const { firstname, lastname, phone, email, address, password,confirmPassword } = req.body
    if (firstname === "" || email === "") {
        return next(new Apierror('Firstname and email must be require', 400))
    }
    const existUser = await User.findOne({ email })
    if (existUser) {
        return next(new Apierror('user already exist', 409))
    }
    const user = await User.create({
        firstname,
        lastname,
        phone,
        email,
        role:req.body.role || 'user',
        password,
        confirmPassword
    })
    res.status(201).json({
        status: 'success',
        message: "New user created successfully",
        user
    })
})


const handlelogin = asyncfunhandler(async (req, res, next) => {
    const { email, password } = req.body
    if (email === "" && password ==="") {
        return next(new Apierror('Email and password must be require', 400))
    }
    const user = await User.findOne({ email })
    if (!user) {
        return next(new Apierror('User not exist or invalid', 404))
    }
    const isCheckPassword = await user.isCorrectPassword(password)
    if (!isCheckPassword) {
        return next(new Apierror('Incorrect Password', 404))
    }
    const token = genToken(user._id)
    const option = {
        httpOnly: true,
        secure: true
    }
    res.cookie('token', token, option).status(200).json({
        status: 'success',
        message: "User Loged In",
        token,
        user 
    })
})


export{
    handleSignUp,
    handlelogin
}