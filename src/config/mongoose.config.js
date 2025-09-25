const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectDb() {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("DB connect ...");
  } catch (error) {
    console.log(error ?? "Failed DB connection");
  }
}
connectDb();
