import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, getHotels, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router  = express.Router();

//CREATE
router.post("/",  createHotel)

// UPDATE
router.put("/:id",verifyAdmin, updateHotel)

// DELETE
router.delete("/:id",verifyAdmin, deleteHotel)

//GET
router.get("/:id", getHotel)

//GET ALL
router.get("/", getAllHotels)
router.get("/filter/every", getHotels)
router.get("/find/countByCity", countByCity)
router.get("/find/countByType", countByType)
router.get("/find/room/:id", getHotelRooms)

export default router