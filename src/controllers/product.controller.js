import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "product.html")
    // );
    //no need to specify the complete path here as we have already specified that in "views"
    //if we don't specify layout name, it will look for "layout.ejs" file
    return res.render("product", {
      products: products,
    });
  }

  getAddForm(req, res) {
    return res.render("new-product", { errorMessage: null });
  }

  addNewProduct(req, res) {
    ProductModel.add(req.body);
    let products = ProductModel.get();
    //without body parser
    // let rawData = "";
    // req.on("data", (chunk) => {
    //   rawData += chunk;
    // });
    // req.on("end", () => {
    //   console.log(rawData);
    //   // Process the raw form data here
    // });
    res.render("product", { products: products });
  }

  getUpdateProductView(req, res, next) {
    //1. if product exist then return view
    //2. else return error
    const { id } = req.body;
    const productFound = ProductModel.getById(id);

    if (productFound) {
      res.render("update-product");
    } else {
      res.status(401).send("Product not found");
    }
  }
}
