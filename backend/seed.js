// seed.js
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'unilearnxyz@gmail.com';

    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log('Admin already exists — skipping creation');
    } else {
      await User.create({
        email: adminEmail,
        password: '87654321', // ← will be auto-hashed by pre-save hook
      });
      console.log('Admin user created successfully');
    }
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  } finally {
    // Clean up connection (good practice in one-time scripts)
    await mongoose.connection.close().catch(console.error);
    console.log('Database connection closed');
  }
};

seedAdmin();