import express from "express";
import path from "path";
const server = express();
import ejsLayouts from "express-ejs-layouts";

//parse form data and put inside req.body object
//extended: true, can parse(from URLencoded) complex objects like arrays also
server.use(express.urlencoded({ extended: true }));

// const ProductController = require("./src/controllers/product.controller");
import ProductController from "./src/controllers/product.controller.js";
import validateAddProductFormData from "./src/middlewares/validation.middleware.js";

// else we have to write data type like this res.render('example.ejs', { data: someData });
server.set("view engine", "ejs");
//by default express will look for 'views' directory
server.set("views", path.resolve("src", "views"));
server.use(ejsLayouts);

const PORT = 2000;

//instance of product controller
const productController = new ProductController();
// it serves the files within that directory directly, but it does not include the directory name itself in the URL.
// server.use(express.static(path.join(__dirname, "src", "views")));

// server.post("/", validateAddProductFormData);

server.use(express.static("src/views"));
server.get("/", productController.getProducts);

server.get("/new", productController.getAddForm);

//1. one task per module
//2. loosly coupled (codes performing diff tasks should be completely seperated)
server.post("/", validateAddProductFormData, productController.addNewProduct);

server.listen(PORT, () => {
  console.log("server is listening on PORT", PORT);
});
