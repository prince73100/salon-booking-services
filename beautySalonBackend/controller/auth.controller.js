import { User } from "../model/user.model.js"
import Apierror from "../utility/Apierror.js"
import asyncfunhandler from "../utility/asyncFunction.js"
import { genToken } from '../utility/genreateToken.js'
import sendEmail from "../utility/sendEmail.js"
import crypto from 'crypto'

const handleSignUp = asyncfunhandler(async (req, res, next) => {
    console.log(req.body)
    const { firstname, lastname, phone, email, address, password, confirmPassword } = req.body
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
        role: req.body.role || 'user',
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
    if (email === "" && password === "") {
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

// forget password

const forgetPassword = asyncfunhandler(async (req, res, next) => {
    // 1.get user by email
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new Apierror('this user not exist or invalid user', 404))
    }
    // 2. then create a reset token which store in DB in encrypt version and return actual reset token in the email
    const resetToken = user.createResetToken()
    await user.save({ validateBeforeSave: false });
    const resetUrl = `http://localhost:5173/resetpassword/${resetToken}`;
    const message = `Forget your password?Submit a patch request with your new password and passwordConfirm to ${resetUrl}.\n IF you did not forget your password,please ingnore this email`;
    const html = `<a href=${resetUrl}>click here to reset password</a>`
    try {
        sendEmail({
            email: user.email,
            subject: 'This token is valid for 10 min',
            message,
            html
        })
        res.status(200).json({
            status: 'success',
            message: 'Reset token send to email. Click link for reset password'
        })
    } catch (error) {
        user.passwordResetToken = undefined
        user.resetTokenExpireIn = undefined
        await user.save({ validateBeforeSave: false })
        return next(new Apierror('there was an error for sending mail', 500))
    }
})

const resetPassword = asyncfunhandler(async (req, res, next) => {
    const resetToken = req.params.token;
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    const user = await User.findOne({ passwordResetToken: hashedToken, resetTokenExpireIn: { $gt: Date.now() } })
    if (!user) {
        return next(new Apierror('User not found or token are expired'))
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.resetTokenExpireIn = undefined;
    await user.save()
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

export {
    handleSignUp,
    handlelogin,
    forgetPassword,
    resetPassword
}