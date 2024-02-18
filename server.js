import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./index.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true, // Ensure compatibility with modern MongoDB drivers
    useUnifiedTopology: true, // Use the latest MongoDB driver topology
  })
  .then(() => console.log("DB connection successfull"));
// .catch(err => console.log('ERROR'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
