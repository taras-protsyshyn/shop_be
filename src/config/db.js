import mongoose from "mongoose";
import colors from "colors/safe.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(colors.cyan.underline(`Mongo DB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(colors.red.bold(`Error: ${error.message}`));
    process.exit(1);
  }
};
