import express from "express";
import path from "path";
const server = express();
import ejsLayouts from "express-ejs-layouts";

// const ProductController = require("./src/controllers/product.controller");
import ProductController from "./src/controllers/product.controller.js";

// else we have to write data type like this res.render('example.ejs', { data: someData });
server.set("view engine", "ejs");
//by default express will look for 'views' directory
server.set("views", path.resolve("src", "views"));
server.use(ejsLayouts);

const port = 3000;

//instance of product controller
const productController = new ProductController();
// it serves the files within that directory directly, but it does not include the directory name itself in the URL.
// server.use(express.static(path.join(__dirname, "src", "views")));
server.use(express.static("src/views"));
server.get("/", productController.getProducts);

server.listen(port, () => {
  console.log("server is listening on port", port);
});
