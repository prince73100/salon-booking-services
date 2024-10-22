import mongoose from "mongoose";
import { Salonregistered } from "../model/salonregistered.model.js";
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})
mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`).then(() => {
    console.log("Database connnect is successfully ");
}).catch((err) => {
    console.log(err.message);
})

const salonRegistered = JSON.parse(fs.readFileSync('salon.dev.data/registeredsalon.json', 'utf-8'));

const importData = async () => {
    try {
        await Salonregistered.create(salonRegistered)
    } catch (error) {
        console.log(error)
    }
    process.exit();
}



const deleteData = async () => {
    try {
        await Salonregistered.deleteMany()
        console.log('delete successfully')
    } catch (error) {
        console.log(error)
    }
    process.exit()
}


if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}