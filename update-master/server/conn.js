const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

try {
  // Connect to the MongoDB database
  mongoose.connect(process.env.db);
  console.log("Connecting to the MongoDB database...");
} catch (error) {
  console.log(error);
}
