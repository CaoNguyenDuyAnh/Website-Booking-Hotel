import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js";
import { verifyAdmin } from "../untils/veryfyToken.js";
const router=express.Router();


//Create
router.post("/:hotelid",verifyAdmin, createRoom); 
//Updat
router.put("/:id",verifyAdmin, updateRoom); 
//delete
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom); 
//Get
router.get("/:id",verifyAdmin, getRoom); 
//Get All
router.get("/",verifyAdmin, getRooms); 

export default router
