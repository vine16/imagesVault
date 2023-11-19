import { promiseImpl } from "ejs";
import { body, validationResult } from "express-validator";
import ProductModel from "../models/product.model.js";

//1. setup rules for validation
//2. run those rules
//check if there are any errors after running the rules
export default async function validateAddProductFormData(req, res, next) {
  //1
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a positive value"),
    body("imageURL").notEmpty().withMessage("You must select an image"),
  ];

  //2.
  //for each rule create a promise
  //it can be async operation
  await Promise.all(rules.map((rule) => rule.run(req)));

  let validationErrors = validationResult(req);
  console.log("validationerrors", req.body);

  //3.
  if (!validationErrors.isEmpty()) {
    // Check the route and render the appropriate view
    //we are using this middleware for two different routes
    if (req.path === "/update-product") {
      return res.render("update-product", {
        errorMessage: validationErrors.array()[0].msg,
        product: ProductModel.getById(req.body.id), //to show the pre-filled form with earlier information
      });
    } else {
      // Assuming the default route is "/"
      return res.render("new-product", {
        errorMessage: validationErrors.array()[0].msg,
      });
    }
  }
  next();
}
