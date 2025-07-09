import jwt from "jsonwebtoken"
import adminModel from "../models/adminModel.js";
async function adminAuth(req,res,next){
    try{
        const {token}=req.headers;
        if(!token) return res.status(401).json({success:false,message:"Unauthorized"});
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        const {id}=decode;
        const adminDets=await adminModel.findById(id,{password:0});
        if(!adminDets){
            return res.status(401).json({success:false,message:"Unauthorized"});
        }
        req.admin=adminDets;
         next();
    }
    catch(err){
        res.status(400).json({success:false,message:"Unauthorized"});
        console.log('error in adminAuth',err)
    }
}
export default adminAuth;