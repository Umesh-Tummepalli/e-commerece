import {
  addProduct,
  listProducts,
  removeProduct,
  productInfo,
  listAdminProducts
} from "../controllers/productController.js";
import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();

router.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 }, // this fetches the files from the feild name image1 and puts into an array into req.files object with key as image1 , in the second feild we are mentioning th e maximum no of files accepted
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
router.get("/list", listProducts);
router.delete("/remove",adminAuth, removeProduct);
router.get("/admin/list",adminAuth,listAdminProducts);
router.get("/info", productInfo);

export default router;
