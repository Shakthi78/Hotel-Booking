import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router  = express.Router();

// router.post('/checkauthentication', verifyToken, (req,res)=>{
//     res.send("lets go")
// })
// router.post('/checkuser/:id', verifyUser, (req,res)=>{
//     res.send("not to waste time")
// })
// router.post('/checkadmin/:id', verifyAdmin, (req,res)=>{
//     res.send("You are admin")
// })

// UPDATE
router.put("/:id", verifyUser, updateUser)

// DELETE
router.delete("/:id", deleteUser)

//GET
router.get("/:id",verifyUser, getUser)

//GET ALL
router.get("/", getUsers)

export default router