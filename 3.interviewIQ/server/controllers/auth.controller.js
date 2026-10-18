import genToken from "../config/token.js"
import User from "../models/user.model.js"


export const googleAuth = async (req,res) => {
    try {
        const {name , email} = req.body

        if (!email) {
            return res.status(400).json({ message: "Email is required for authentication" })
        }

        const userName = (name && name.trim()) || email.split("@")[0] || "User"

        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                name: userName, 
                email
            })
        }

        let token = await genToken(user._id)

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }

        res.cookie("token" , token , cookieOptions)

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({message:`Google auth error ${error.message || error}`})
    }
}

export const logOut = async (req,res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        })
        return res.status(200).json({message:"LogOut Successfully"})
    } catch (error) {
         return res.status(500).json({message:`Logout error ${error.message || error}`})
    }
}