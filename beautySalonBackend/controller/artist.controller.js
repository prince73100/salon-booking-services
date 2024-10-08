import { Artist } from "../model/artist.model.js"
import { ArtistApplication } from "../model/jobform.model.js"
import { genToken } from "../utility/genreateToken.js"

const artistsignUp = async (req, res) => {
    try {
        const { firstname, lastname, email, streetaddress, city, region, postalcode, phonenumber, experience, qualification, gender, password } = req.body
        if (firstname === "" || email === "") {
            return res.status(400).json({
                message: "Firstname and email must be require"
            })
        }
        const existUser = await Artist.findOne({ email })
        if (existUser) {
            return res.status(409).json({
                message: "user already exist"
            })
        }
        const user = await Artist.create({
            firstname,
            lastname,
            email,
            streetaddress,
            city,
            region,
            postalcode,
            phonenumber,
            experience,
            qualification,
            gender,
            password
        })


        if (!user) {
            return res.status(400).json({
                message: "usernot not created! Check all field all correct"
            })
        }

        res.status(201).json({
            user,
            message: "New user created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error
        })
    }
}

const artistLogin = async (req, res) => {
    try {
        const { phonenumber, password } = req.body
        const artist = await Artist.findOne({ phonenumber });
        if (!artist) {
            return res.json({
                message: "user not exist",
                status: 404
            })
        }
        const correctPassword = await artist.isCorrectPassword(password)
        if (!correctPassword) {
            return res.json({
                message: "Invalid credentials",
                status: 401
            })
        }
        const loginartist = await Artist.findOneAndUpdate({ phonenumber }, { status: true }, { new: true })
        const token = genToken(artist._id)
        res.status(200).json({
            token,
            status: 200,
            message: "Artist LogedIn"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const logout = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.user.id, { status: false }, { new: true }).select("-password")
        res.status(200).json({
            message: "User Logout",
            artist
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

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

export {
    artistsignUp,
    artistLogin,
    logout,
    submittApplication
} 









