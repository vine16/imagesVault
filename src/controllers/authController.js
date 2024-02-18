import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

function createSendToken(user, statusCode, res) {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true, the cookie will only be sent over HTTPS connections.
    // httpOnly: true, //can't be modified by the user
  };
  res.cookie("jwt", token, cookieOptions);
  return res.status(statusCode).render("login", {
    errorMessage: null,
    status: "success",
    token,
  });
}

export const signup = async (req, res, next) => {
  // const newUser = await User.create(req.body);
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    createSendToken(newUser, 201, res);
  } catch (error) {
    // Handle the error, e.g., by rendering an error page or sending a JSON response.
    console.log(error);
    return res
      .status(500)
      .render("signup", { errorMessage: "Internal Server Error" });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  //2. check if user exixts && password is correct
  const user = await User.findOne({ email });
  try {
    const isMatched = await user.comparePassword(password, user.password);
    if (!isMatched) {
      return res.render("login", {
        errorMessage: "Email or password is incorrect",
      });
    }
  } catch (error) {
    // Handle the error, e.g., by rendering an error page or sending a JSON response.
    console.log(error);
    return res
      .status(500)
      .render("login", { errorMessage: "Internal Server Error" });
  }

  //3. if everything ok, send token to client
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true, the cookie will only be sent over HTTPS connections.
    httpOnly: true, //can't be modified by the user
  };
  res.cookie("jwt", token, cookieOptions);

  return res.status(200).redirect("/");
};

export const logout = (req, res, next) => {
  // Assuming your JWT cookie is named 'jwt'
  res.clearCookie("jwt");

  // Redirect to the login page or perform any other action
  res.redirect("/login");
};
