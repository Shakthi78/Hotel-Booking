import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req,res,next)=>{
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({ ...req.body, password: hash})
        const saved = await newUser.save()
        res.json(saved)

    } catch (error) {
        next(error)
    }
}
export const login = async (req,res,next)=>{
    try {       
        let user = await User.findOne({username: req.body.username})
        if(!user){
            return res.status(400).json({error:"User does not exist"})
        }

        //Checking if the password is correct
        const passwordCompare = await bcrypt.compare(req.body.password, user.password)
        if(!passwordCompare){
        return res.status(401).json({error:"Wrong password"})
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)
        const { password, isAdmin, ...otherDetails} = user._doc
        res.cookie("access_token", token, {
            httpOnly: true,
        }).json({ details: {...otherDetails}, isAdmin})

    } catch (error) {
        next(error)
    }
}