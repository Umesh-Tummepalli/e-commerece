import multer from "multer";

const diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    return callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    // here we get req object, file object which hs the meta info of the file received and a callbakc functin which we want call
    callback(null, file.originalname); // the first parameter is fpr error , since we have no error here we pass null, the second parameter is the filename that we want to save as
  },
}); 
const upload = multer({ storage: diskStorage });
export default upload;
