// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Simple local connection - no extra options needed in Mongoose 6+
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/servicesdb');

    console.log(`MongoDB Connected Locally!`);
    console.log(`Database: ${conn.connection.db.databaseName}`);
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Port: ${conn.connection.port}`);
  } catch (err) {
    console.error('MongoDB connection FAILED:', err.message);
    // In development, don't exit - just log so you can fix without restarting
  }
};

module.exports = connectDB;