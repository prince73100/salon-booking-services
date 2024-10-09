import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
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
        enum: ["User", "Admin", "Artist", "Salon"],
        default: "User"
    },
    password: {
        type: String,
        required: [true, 'password must be require']
    },
    confirmPassword: {
        type: String,
        required:true,
        validate: function(el){
            return el === this.password
        }
    }
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

export const User = mongoose.model('User', userSchema)