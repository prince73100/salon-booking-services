import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
const sendEmail = async option => {
    //1. tranporter
    const tranporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOSTNAME,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    // 2. options
    const mailOption = {
        from: "prince <princepjng85@gmail.com>",
        to: option.email,
        subject: option.subject,
        text: option.message,
        html: option.html
    }
    // 3. send mail
    await tranporter.sendMail(mailOption)
}

export default sendEmail;