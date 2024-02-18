import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { promisify } from "util";
export const auth = async function (req, res, next) {
  // 1. Check if the token exists in the cookie

  if (!req.cookies || !req.cookies.jwt) {
    return res.render("login", {
      errorMessage:
        "You need to log in to access this page. If you don't have an account, please sign up.",
    });
  }
  const token = req.cookies.jwt;
  // 2. Verify the JWT token
  // .verify() will return the decoded payload
  const fn = promisify(jwt.verify);
  let decoded;
  try {
    decoded = await fn(token, process.env.JWT_SECRET);
    // Continue with the rest of the code
  } catch (error) {
    return res.render("login", {
      errorMessage: "Invalid token. Please log in again.",
    });
  }

  // Here, we are sure 'ID' is not changed
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return res.render("register", {
      errorMessage: "Please consider signing up for a new account",
    });
  }

  // Set the user object on the request for future middleware to access
  req.user = freshUser;
  next();
};
