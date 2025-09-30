import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js'; // We need a user to associate products with
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id; // The first user in users.js is our admin

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

connectDB().then(() => {
  if (process.argv[2] === '-d') {
    destroyData();
  } else {
    importData();
  }
});