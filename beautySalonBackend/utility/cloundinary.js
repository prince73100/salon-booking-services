import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECERET
});

const uploadOncloudinary = async (localpath) => {
    try {
        if (!localpath) return null
        // upload file
        const response = await cloudinary.uploader.upload(localpath, {
            resource_type: 'auto'
        })
        // console.log('file is uploaded on cloudinary', response.url)
        return response
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localpath) // remove the  locally saved tem file as the upload operation got failed
        return null
    }
}

export { uploadOncloudinary }