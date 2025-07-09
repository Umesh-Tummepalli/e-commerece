import express from "express";
import mongoose from "mongoose";
import ordersModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import productModel from "../models/productModel.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.get("/user", userAuth, async (req, res) => {
  const id = req.user._id;
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!id || !valid) {
    return res.status(400).json({ success: false, message: "Inavlid user id" });
  }
  try {
    const userOrders = await ordersModel.find({ uid: id });
    return res.status(200).json({ success: true, orders:userOrders });
  } catch (Err) {
    console.log(Err.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/admin", adminAuth, async (req, res) => {
  const id = req?.admin?._id || null;
  try {
    const adminOrders = await ordersModel.find({ sellerId: id });
    return res.status(200).json({ success: true, orders: adminOrders });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/payment/:mode", userAuth, async (req, res) => {
  const id = req.user._id;
  const user = await userModel.findById(id);
  const { mode } = req.params;
  const modes=['cod','stripe','razorpay']
  if(!modes.includes(mode)){
    return res.status(400).json({success:false,message:'Invalid payment mode'});
  }
  const {address}=req.body;
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  if (!user.cartData || Object.keys(user.cartData).length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }
  const cart = user.cartData;
  const orderId = new mongoose.Types.ObjectId();
  const prodIds = Object.keys(cart);
  const prodPrices = {};
  const prodSeller={};
  try {
    const prods = await productModel.find({ _id: { $in: prodIds } });
    for (const prod of prods) {
      prodPrices[prod._id.toString()] = prod.price;
      prodSeller[prod._id.toString()]=prod.admin;
    }
  } catch (err) {
    console.log("Error fetching product prices",err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
  const orders = [];
  for (const prodId in cart) {
    for (const size in cart[prodId]) {
      const orderObject = {
        uid: id,
        prodId,
        prodSize: size,
        address:address,
        paymentMode: mode,
        sellerId: prodSeller[prodId],
        status: 'pending',
        orderGroupId: orderId,
        payementStatus: mode==='cod'?'pending':'success',
        amount: prodPrices[prodId] * Number(cart[prodId][size]),
      };
      orders.push(orderObject);
    }
  }
  try{
    const orderSave=ordersModel.insertMany(orders);
    user.cartData={};
    user.markModified('cartData');
    await user.save();
    return res.status(200).json({ success: true, message: "Order placed" });
  }
  catch(err){
    console.log("Error in placing order while saving in db",err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/price", userAuth, async (req, res) => {
  try {
    const id = req.user._id;
    const valid = mongoose.Types.ObjectId.isValid(id);
    const user = await userModel.findById(id, { cartData: 1 });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (!user.cartData || Object.keys(user.cartData).length === 0) {
      return res.status(400).json({ success: true, message: "Cart is empty" });
    }
    let totalPrice = 0;
    const cart = user.cartData;
    for (const prodId in cart) {
      const prod = await productModel.findById(prodId, { price: 1, name: 1 });
      if (!prod) {
        return res
          .status(404)
          .json({ success: false, message: `${name} not found` });
      }
      totalPrice += prod.price * Object.keys(cart[prodId]).length;
    }
    res.status(200).json({ success: true, totalPrice: totalPrice + 10 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
export default router;
