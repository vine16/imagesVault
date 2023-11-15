import { promiseImpl } from "ejs";
import { body, validationResult } from "express-validator";
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
    body("imageURL").isURL().withMessage("Invalid url"),
  ];

  //2.
  //for each rule create a promise
  //it can be async operation
  await Promise.all(rules.map((rule) => rule.run(req)));

  let validationErrors = validationResult(req);

  console.log(validationErrors);
  //3.
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }
  next();
}
