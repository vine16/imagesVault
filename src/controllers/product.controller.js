import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "product.html")
    // );
    //no need to specify the complete path here as we have already specified that in "views"
    return res.render("product", {
      products: products,
    });
  }
}
