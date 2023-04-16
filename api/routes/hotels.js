import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../untils/error.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../untils/veryfyToken.js";
const router = express.Router();
//New
router.post("/",verifyAdmin, createHotel);

//Update
router.put("/:id",verifyAdmin, updateHotel);

//delete
router.delete("/:id",verifyAdmin, deleteHotel);
//Get
router.get("/find/:id", getHotel);
//Getall
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
export default router
