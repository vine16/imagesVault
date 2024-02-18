import mongoose from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const imageSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter you email"],
    unique: [true, "Email already exits"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
    minLength: 8,
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

userSchema.pre("save", async function (next) {
  //just updated the password or created new
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async (
  userEnteredPassword,
  hashedPassword
) => {
  const result = await bcrypt.compare(userEnteredPassword, hashedPassword);
  return result;
};

const User = mongoose.model("User", userSchema);
const Image = mongoose.model("Image", imageSchema);

export { User, Image };
