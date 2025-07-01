import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";
import fs from "fs/promises";
async function cleanCloudinary(publicIds) {
  for (const pubId of publicIds) {
    try {
      await cloudinary.uploader.destroy(pubId);
    } catch (e) {
      console.warn("Failed to delete image from Cloudinary:", pubId);
    }
  }
}
async function cleanupLocalFiles(imageArr) {
  for (const imageItem of imageArr) {
    try {
      await fs.unlink(imageItem.path);
    } catch {
      console.warn("File already deleted or not found:", imageItem.path);
    }
  }
}
export async function addProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !subCategory ||
      !sizes ||
      !bestSeller
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const image1 = req?.files?.image1?.[0];
    const image2 = req?.files?.image2?.[0];
    const image3 = req?.files?.image3?.[0];
    const image4 = req?.files?.image4?.[0];

    const imageArr = [image1, image2, image3, image4].filter(Boolean);
    const imageUrl = [];
    const imagePublicIds = [];

    for (const imageItem of imageArr) {
      try {
        const uploadDets = await cloudinary.uploader.upload(imageItem.path, {
          resource_type: "image",
        });
        imageUrl.push(uploadDets.secure_url);
        imagePublicIds.push(uploadDets.public_id);
      } catch (err) {
        console.log("Cloudinary Uploading error:", err);
        await cleanCloudinary(imagePublicIds); // Rollback uploaded images
        return res
          .status(500)
          .json({ success: false, message: "Image Uploading failed" });
      }
    }

    // Cleanup local files after successful uploads
    await cleanupLocalFiles(imageArr);
    const prodData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true",
      images: imageUrl,
      imagePublicIds
    };
    try {
      const newProduct = new Product(prodData);
      await newProduct.save();
    } catch (err) {
      console.log("Error in DB upload");
      return res
        .status(500)
        .json({ success: false, message: "DB upload failed" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.log("Error from addProduct:", err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
}

export async function listProducts(req, res) {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, products });
  } catch (err) {
    console.log("Error from listProducts", err);
    return res.status(500).json({ success: false, message: "something went wrong" });
  }
}

export async function removeProduct(req, res) {
  try{
    const {id}=req.body;
    const prodInfo=await Product.findById(id);
    if(prodInfo){
      const cloudinaryImages=prodInfo.imagePublicIds;
      await Product.findByIdAndDelete(id);
      await cleanCloudinary(cloudinaryImages);
      res.status(200).json({success:true,message:"Product removed successfully"});
    }
  }catch(err){
    console.log("Error from removeProduct", err);
    return res.status(500).json({ success: false, message: "something went wrong" });
  }
}

export async function productInfo(req, res) {
  try{
    const {id}=req.query;
    const prodInfo=await Product.findById(id);
    if(prodInfo){
      return res.status(200).json({success:true,prodInfo});
    }
    else{
      return res.status(404).json({success:false,message:"Product not found"});
    }
  }
  catch(err){
    console.log('Error from productInfo',err);
    return res.status(500).json({success:false,message:'something went wrong'});
  }
}
