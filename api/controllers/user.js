import User from "../models/User.js"

export const updateUser = async(req,res,next)=>{
    try {      
        
        const updateUser = await User.findByIdAndUpdate(req.params.id , { $set: req.body }, {new:true})
        res.json(updateUser)

    } catch (error) {
        next(error)
    }
}
export const deleteUser = async(req,res,next)=>{
    try {       
        const deleteUser = await User.findByIdAndDelete(req.params.id)        
        res.json(deleteUser)

    } catch (error) {
        next(error)
    }
}
export const getUser = async(req,res,next)=>{
    try {       
        const getUser = await User.findById(req.params.id)       
        res.json(getUser)

    } catch (error) {
        next(error)
    }
}
export const getUsers = async(req,res,next)=>{
    try {       
        const getAllUser = await User.find()       
        res.json(getAllUser)

    } catch (error) {
        next(error)
    }
}