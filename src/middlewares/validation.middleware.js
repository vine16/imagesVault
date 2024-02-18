import { body, validationResult } from "express-validator";
export default async function validateAddImageFormData(req, res, next) {
  //1
  const rules = [
    body("caption").not().isEmpty().withMessage("Description is required"),
    body("imageURL").custom((value, { req }) => {
      if (!req.files) {
        throw new Error("Image is required");
      }

      return true;
    }),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  let validationErrors = validationResult(req);

  //3.
  if (!validationErrors.isEmpty()) {
    // Check the route and render the appropriate view
    //we are using this middleware for two different routes
    // Assuming the default route is "/"
    return res.render("new-image", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }
  next();
}
