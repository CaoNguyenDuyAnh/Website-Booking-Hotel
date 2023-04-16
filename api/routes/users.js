import express from "express";
import { updateUser,deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../untils/veryfyToken.js";

const router = express.Router();


// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//      res.send("hello user, you are logged in");
// })
 
// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete you acount");
// })
// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("hello admin, you are logged in and you can delete all acounts");
// })

//updat
router.put("/:id",verifyUser, updateUser); 
//delete
router.delete("/:id",verifyUser, deleteUser); 
//Get
router.get("/:id",verifyUser, getUser); 
//Get All
router.get("/",verifyAdmin, getUsers); 
export default router;
