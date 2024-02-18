import multer from "multer"; //cb = callback
import path from "path";

//store in disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(path.resolve("public"), "🔥🔥");
    cb(null, path.join("public", "images")); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Specify the file name
  },
});

const upload = multer({ storage: storage });
export default upload;
