import { ArtistApplication } from "../model/jobform.model.js"
import { User } from "../model/user.model.js"





// const getAllArtist = asyncfunhandler(async(req,res,next)=>{
//     const artist = await User.find({role:'Artist'}).select('-__v -password -role')
//     res.status(200).json({
//         status:'success',
//         artist
//     })
// })


// subitt application
const submittApplication = async (req, res) => {
    const { fullname, email, experience, currentLocation, pastbarber, education, expectedsalary, phonenumber } = req.body

    const artistExist = await ArtistApplication.findOne({ email })
    if (artistExist) {
        return res.json({
            message: "you can fill only once",
            status: 409
        })
    }
    try {
        const application = await ArtistApplication.create({
            fullname,
            email,
            experience,
            location: currentLocation,
            pastBarber: pastbarber,
            education,
            phonenumber: phonenumber,
            expectedSalary: expectedsalary,
            artist: req.user.id
        })
        if (!application) {
            return res.json({
                message: "Some thing wrong",
                status: 401
            })
        }
        res.status(200).json({
            application,
            message: "Form Submitted successfully"
        })
    } catch (error) {
        res.status(500).json({
            mesaage: error.message
        })
    }
}


// GET ALL Artist

export {
    submittApplication
} 









