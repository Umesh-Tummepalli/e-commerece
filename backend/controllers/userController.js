import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userMessageModel from "../models/userMessage.js";
import mongoose from "mongoose"
import adminModel from "../models/adminModel.js";
function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}
export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with this email does not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      return res.status(200).json({ success: true, token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "something went wrong" });
    console.log("error in userLogin", err);
  }
}

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const exist = await userModel.exists({ email: email });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    //salting and hashing the password
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: passHash,
      cartData:{}
    });
    const createdUser = await newUser.save();

    const token = createToken(createdUser._id);
    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "something went wrong" });
    console.log("error in userController", err);
  }
}

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email does not exist",
      });
    }
    const match =await  bcrypt.compare(password, admin.password);
    if(match){
     const token= createToken(admin._id);
      return res.status(200).json({success:true,message:'Admin logged in successfully',token});
    }
    else{
      return res.status(400).json({success:false,message:'Invalid credentials'});
    }
  }
  catch(err){
    console.log('error from adminLogin',err);
    return res.status(500).json({success:false,message:'something went wrong try again'})
  }
}

export async function userMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const newMessage = new userMessageModel({
      name,
      email,
      subject,
      message,
    });
    await newMessage.save();
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "something went wrong" });
    console.log("error in useMessage", err);
  }
}

export async function sendmessages(req, res) {
  try {
    const messageData = await userMessageModel.find({});
    return res.status(200).json({ success: true, messages: messageData });
  } catch (err) {
    res.status(500).json({ success: false, message: "something went wrong" });
  }
}


export async function deleteMessage(req,res){
    const {id}=req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) res.status(400).json({success:false,message:'Invalid Id'})  
    try{
        await userMessageModel.findByIdAndDelete(id);
        res.status(200).json({success:true,message:'Message deleted successfully'})
    }
    catch(Err){
        res.status(500).json({success:false,message:Err.message})
    }
}
export async function adminRegister(req,res) {
  const {name,password,email}=req.body;
  if(!name || !password || !email){
    return res.status(400).json({success:false,message:'Please fill all the fields'});
  }
  const exist=await adminModel.exists({email:email});
  if(exist){
    return res.status(400).json({success:false,message:'Admin with this email already exists'});
  }
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(password, salt);
  try{
    await new adminModel({name,email,password:passHash}).save();
    res.status(200).json({success:true,message:'Admin registered successfully'});
  }
  catch(err){
    console.log('error in saving admin in db');
    return res.status(500).json({success:false,message:'something went wrong'});
  }
}
