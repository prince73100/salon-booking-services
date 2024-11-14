import twilio from 'twilio'
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const twiliophoneno = process.env.TWILIO_MOBILE_NO

const client = twilio(accountSid, authToken);

export const sendSmsFunction = (userPhoneNum, meesageBody) => {
    client.messages.create({
        body: meesageBody,
        from: twiliophoneno,
        to: `+91${userPhoneNum}`
    }).then(messages => console.log("welcome message send successfully", messages.sid)).catch(err => console.log("Error=>", err));
}

