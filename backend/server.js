import express from "express";
import cors from "cors";
import multer from 'multer'
import connectDB from "./config/mongodb.js";
import dotenv from 'dotenv';
import connectCloudinary from "./config/cloudinary.js";
import userRoutes from "./routes/userRoutes.js";

// qapp configurations
dotenv.config();  // loading env variables from .env file
connectDB(); // connecting to mongodb
connectCloudinary(); // connecting to cloudinary
const app = express(); // creating express app
const port=process.env.port||4000; // port number
const upload=multer(); // multer for handling multipart/form-data, which is used for uploading files2

//middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json()); // parses body of request to json
app.use(upload.none()); // parses form multipart/formdata
app.use(express.urlencoded({extended:true})) // parses traditional html form


//end points
app.get("/", (req, res) => {
  res.send("<h1>Hello from Server</h1>");
});

app.use('/user',userRoutes);


// Handle non-existent routes (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
// starting the server
app.listen(port, "localhost", () => {
  console.log("server started on port 4000");
});
