import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors/safe.js";

import users from "./data/users.js";
import products from "./data/products.js";
import User from "./model/userModel.js";
import Product from "./model/productModel.js";
import Order from "./model/orderModel.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const importData = async () => {
  await connectDB();

  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    await mongoose.disconnect();

    console.log(colors.green.inverse("Data Imported!"));
  } catch (error) {
    console.error(colors.red.inverse(`${error.message}`));
    process.exit(1);
  }
};

const destroyData = async () => {
  await connectDB();

  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    await mongoose.disconnect();

    console.log(colors.red.inverse("Data Destroyed!"));
  } catch (error) {
    console.error(colors.red.inverse(`${error.message}`));
    process.exit(1);
  }
};

if (!process.argv[2]) {
  importData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
