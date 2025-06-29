import { userLogin, registerUser, adminLogin, adminRegister } from "../controllers/userController.js";
import express from "express";

const router=express.Router();

router.post('/login',userLogin)

router.post('/register',registerUser)

router.post('/admin',adminLogin)

export default router;