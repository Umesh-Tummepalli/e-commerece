import express from "express";
import userModel from "../models/userModel.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.use(userAuth);

router.get("/", async (req, res) => {
  try {
    const { user } = req;
    const userCart = await userModel.findById(user._id, { cartData: 1 });
    const { cartData } = userCart;
    if (cartData) {
      res.status(200).json({  
        success: true,
        cartData,
        message: "cart data fetched successfully",
      });
    } else {
      console.log("sending cart is empty", cartData);
      res
        .status(200)
        .json({ success: true, cartData: {}, message: "cart is empty" });
    }
  } catch (err) {
    console.log("error in cartRoutes", err);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err.message,
    });
  }
});

router.post("/:prodId", async (req, res) => {
  try {
    const { prodId } = req.params;
    const { user } = req;
    const { size, type } = req.query;

    // Validate inputs
    if (!prodId || !type || !size) {
      return res.status(400).json({
        success: false,
        message: "Please provide product id, type, and size",
      });
    }

    // Fetch user from DB
    const userData = await userModel.findById(user._id);
    const cartData = userData.cartData || {};

    // Force consistent key formatting
    const normalizedSize = size.trim().toUpperCase(); // optional cleanup

    // Ensure product entry exists
    if (!cartData[prodId]) {
      cartData[prodId] = {};
    }

    // If size already exists
    if (typeof cartData[prodId][normalizedSize] === "number") {
      if (type === "add") {
        cartData[prodId][normalizedSize] += 1;
      } else if (type === "remove") {
        cartData[prodId][normalizedSize] -= 1;

        // Remove size if 0 or less
        if (cartData[prodId][normalizedSize] <= 0) {
          delete cartData[prodId][normalizedSize];
        }
      }

      // Remove product if no sizes left
      if (Object.keys(cartData[prodId]).length === 0) {
        delete cartData[prodId];
      }
    } else {
      // Size doesn't exist, add new
      cartData[prodId][normalizedSize] = 1;
    }

    // Save updated cart
    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();
    // Send response
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartData,
    });
  } catch (err) {
    console.log("Error in cartRoutes:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.delete("/:prodId", async (req, res) => {
  try {
    const { user } = req;
    const { prodId } = req.params;
    const {size}=req.query;
    if (!prodId) {
      return res.status(400).json({ success: false, message: "send prodId" });
    }
    const userData = await userModel.findById(user._id);
    const cartData = userData.cartData || {};
    if (cartData) {
      delete cartData[prodId][size];
    }
    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: Err.message,
    });
    console.log("error in cartRoutes", Err);
  }
});
export default router;
