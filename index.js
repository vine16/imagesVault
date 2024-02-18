import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";
import { dirname } from "path";
import upload from "./src/middlewares/file-upload.middleware.js";
import ImageController from "./src/controllers/image.controller.js";
import validateAddImageFormData from "./src/middlewares/validation.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import validateRegisterForm from "./src/middlewares/validate.register.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { signup, signin, logout } from "./src/controllers/authController.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });
// import expressfileupload from "express-fileupload";

const app = express();

// app.use(expressfileupload());
//parse form data and put inside req.body object
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(ejsLayouts);

//instance of image controller
const imageController = new ImageController();
// it serves the files within that directory directly, but it does not include the directory name itself in the URL.

const userController = new UserController();

app.get("/", auth, imageController.getImages);

app.get("/new", auth, imageController.getAddForm);

//1. one task per module
//2. loosly coupled (codes performing diff tasks should be completely seperated)
app.post(
  "/",
  auth,

  imageController.addNewImage
);

//register new user
app.get("/register", userController.getRegister);
app.get("/login", userController.getLogin);
app.post("/register", validateRegisterForm, signup);
app.post("/login", signin);

app.get("/logout", logout);

export default app;
