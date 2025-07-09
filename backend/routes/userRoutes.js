import { userLogin, registerUser, adminLogin, adminRegister, userMessage,sendmessages,deleteMessage } from "../controllers/userController.js";
import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";
const router=express.Router();

router.use(upload.none())
router.post('/login',userLogin)

router.post('/register',registerUser)


router.post('/admin/register',adminRegister)

router.post('/admin',adminLogin)    

router.post('/message',userMessage);

router.get('/message',adminAuth,sendmessages)


router.delete('/message/:id',adminAuth,deleteMessage)


router.get('/admin/checkAuth',adminAuth,(req,res)=>{
    res.status(200).json({success:true,message:'Autherisation success'});
});

router.get('/profile',userAuth,(req,res)=>{
   return res.status(200).json({success:true,user:req.user})
})
export default router;