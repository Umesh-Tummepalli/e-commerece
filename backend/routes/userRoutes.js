import { userLogin, registerUser, adminLogin, adminRegister, userMessage } from "../controllers/userController.js";
import express from "express";
import upload from "../middleware/multer.js";
const router=express.Router();

router.use(upload.none())
router.post('/login',userLogin)

router.post('/register',registerUser)

router.post('/admin',adminLogin)

router.post('/message',userMessage);

export default router;