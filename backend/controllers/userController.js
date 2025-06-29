import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}
export function userLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const user=userModel.findOne({email:email});
  if(!user){
    return res.status(400).json({ message: "User with this email does not exist" });
  }
}

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const exist = await userModel.exists({ email: email });
    if (exist) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    //salting and hashing the password
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: passHash,
    });
    const createdUser = await newUser.save();

    const token = createToken(createdUser._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
    console.log("error in userController", err);
  }
}

export async function adminLogin() {}

export async function adminRegister() {}
