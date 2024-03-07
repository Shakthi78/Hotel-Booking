import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createHotel = async(req,res,next)=>{
    try {       
        const newHotel = new Hotel(req.body)
        const savedHotel = await newHotel.save()
        res.json(savedHotel)

    } catch (error) {
       next(error)
    }
}

export const updateHotel = async(req,res,next)=>{
    try {       
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id , { $set: req.body }, {new:true})
        res.json(updateHotel)

    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async(req,res,next)=>{
    try {       
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id)        
        res.json(deleteHotel)

    } catch (error) {
        next(error)
    }
}

export const getHotel = async(req,res,next)=>{
    try {       
        const getHotel = await Hotel.findById(req.params.id)       
        res.json(getHotel)

    } catch (error) {
        next(error)
    }
}

export const getHotels = async(req,res,next)=>{
    try {      
        const {limit, min, max, ...others}  = req.query
        const getAllHotel = await Hotel.find({
            ...others,
            cheapestPrice: {$gt: min | 1 , $lt: max | 300 },
        }).limit(limit)      
        res.json(getAllHotel)

    } catch (error) {
        next(error)
    }
}

export const getAllHotels = async(req,res,next)=>{
    try {      
        const {limit, ...others} = req.query
        const getAllHotel = await Hotel.find({...others}).limit(limit)      
        res.json(getAllHotel)

    } catch (error) {
        next(error)
    }
}

export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try {       
        const list = await Promise.all(cities.map((city)=>{
            return Hotel.countDocuments({city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

export const getHotelRooms = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(
            hotel.rooms.map((room)=>{
            return Room.findById(room)
        }))
        res.json(list)
    } catch (error) {
        next(error)
    }
}  