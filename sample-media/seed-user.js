const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seedUser = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = 'test@example.com';
  const password = 'test123';
  const hashed = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ email });
  if (existing) {
    existing.password = hashed;
    await existing.save();
    console.log('Dummy user updated');
  } else {
    await User.create({ email, password: hashed });
    console.log('Dummy user created');
  }

  mongoose.disconnect();
};

seedUser();
