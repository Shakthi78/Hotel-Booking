import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'

export const createRoom = async (req, res, next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push: {rooms: savedRoom._id}}, {new: true})
        } catch (error) {
        next(error)           
        }
        res.json(savedRoom)

    } catch (error) {
        next(error)
    }
}

export const updateRoom = async(req,res,next)=>{
    try {       
        const updateRoom = await Room.findByIdAndUpdate(req.params.id , { $set: req.body }, {new:true})
        res.json(updateRoom)

    } catch (error) {
        next(error)
    }
}

export const updateRoomAvailability = async(req,res,next)=>{
    try {       
        const updateRoom = await Room.updateOne(
            {"roomNumbers._id": req.params.id}, 
            {$push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
            })
        res.json(updateRoom)

    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid;
    try {       
        const deleteRoom = await Room.findByIdAndDelete(req.params.id)     
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull: {rooms: req.params.id}}, {new: true})
            res.json(deleteRoom)
        } catch (error) {
        next(error)           
        }   
        res.json("Room has been deleted")

    } catch (error) {
        next(error)
    }
}

export const getRoom = async(req,res,next)=>{
    try {       
        const getRoom = await Room.findById(req.params.id)       
        res.json(getRoom)

    } catch (error) {
        next(error)
    }
}

export const getRooms = async(req,res,next)=>{
    try {       
        const getAllRoom = await Room.find()       
        res.json(getAllRoom)

    } catch (error) {
        next(error)
    }
}
