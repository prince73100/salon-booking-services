import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import crypto from 'crypto';
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Name must be require"]
    },
    lastname: {
        type: String,
        required: [true, "last name must be require"]
    },
    phone: {
        type: String,
        required: true,
        unique: [true, "this phone number already exist"]
    },
    email: {
        type: String,
        required: [true, "Email must be require"],
        unique: [true, 'This email id is already exist'],
        validate: [validator.isEmail, 'please enter a valid mail']
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin", "artist", "salon"],
        default: "user"
    },
    password: {
        type: String,
        required: [true, 'password must be require']
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: function (el) {
            return el === this.password
        }
    },
    passwordResetToken: String,
    resetTokenExpireIn: Date
})

// hashed password
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) next()
    this.password = await bcrypt.hash(this.password, 10)
    this.confirmPassword = undefined
    next()
})
userSchema.methods.isCorrectPassword = function (newPassword) {
    return bcrypt.compare(newPassword, this.password)
}

userSchema.methods.createResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetTokenExpireIn = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

export const User = mongoose.model('User', userSchema)