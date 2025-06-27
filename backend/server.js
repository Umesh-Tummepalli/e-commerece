import express from "express";
import cors from "cors";
import multer from 'multer'
const app = express();
const port=process.env.port||4000;
const upload=multer();
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
app.get("/", (req, res) => {
  res.send("<h1>Hello from Server</h1>");
});

app.listen(port, "localhost", () => {
  console.log("server started on port 4000");
});
