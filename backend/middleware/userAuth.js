import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
export default async function userAuth(req, res, next) {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
      const isValidtoken = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      const { id } = isValidtoken;
      const userDets =await userModel.findById(id);
      if (!userDets) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      req.user=userDets;
      next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
}
