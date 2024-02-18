import { body, validationResult } from "express-validator";
export default async function validateRegisterForm(req, res, next) {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/
      )
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
      ),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.render("register", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  next();
}
