import jwt from "jsonwebtoken"

function adminAuth(req,res,next){
    try{
        const {token}=req.headers;
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        if(token && decode.id===process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            next();
        }
        else{
            return res.status(401).json({success:false,message:"Unauthorized"});
        }
    }
    catch(err){
        res.status(500).json({success:false,message:"something went wrong"});
    }
}
export default adminAuth;