import path from "path";
import { Image, User } from "../models/userModel.js";
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
dotenv.config({ path: "./example.env" });

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRETACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

console.log(process.env.S3_ACCESS_KEY, "🫂🫂🫂");

const upload = (bucketname) => {
  return multer({
    storage: multerS3({
      s3,
      bucket: bucketname,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        console.log(file, "🚋");
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  });
};

export default class ImageController {
  async getImages(req, res) {
    // // Find the user and populate the 'images' field to get image details
    const user = await User.findById(req.user._id).populate("images");

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    const images = user.images;

    return res.render("images", {
      images: images,
      userEmail: req.user.email,
    });
  }

  getAddForm(req, res) {
    return res.render("new-image", {
      errorMessage: null,
      userEmail: req.user.email,
    });
  }
  async addNewImage(req, res) {
    try {
      const uploadSingle = upload("user-gallery-images").single("imageURL");
      // const { caption } = req.body;
      // const imagePath = "images/" + req.file.filename;
      await new Promise((resolve, reject) => {
        uploadSingle(req, res, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      const { caption } = req.body;
      const imagePath = req.file.location;
      const newImage = await Image.create({ caption, path: imagePath });
      // Find the user and push the new image ID to their images array
      const userId = req.user._id; // Replace with the actual user ID
      const user = await User.findById(userId);
      user.images.push(newImage._id);
      await user.save();
      return res.status(201).redirect("/");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
