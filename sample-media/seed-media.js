const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const User = require('../models/User');
const Media = require('../models/Media');

dotenv.config();

const SAMPLE_DIR = __dirname; // points to sample-media/
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

const seedMedia = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' Connected to DB');

    const user = await User.findOne({ email: 'test@example.com' });
    if (!user) {
      console.error(' Dummy user not found. Run seed-user.js first.');
      process.exit(1);
    }

    const files = fs.readdirSync(SAMPLE_DIR).filter(file =>
      /\.(jpg|jpeg|png|mp4)$/i.test(file)
    );

    if (files.length === 0) {
      console.warn(' No sample media files found in /sample-media');
      return;
    }

    for (const file of files) {
      const srcPath = path.join(SAMPLE_DIR, file);
      const destPath = path.join(UPLOAD_DIR, file);
      const stat = fs.statSync(srcPath);

      const alreadyExists = await Media.findOne({ filename: file });
      if (alreadyExists) {
        console.log(` Skipping ${file} (already exists)`);
        continue;
      }

      // Guess file type from extension
      const ext = path.extname(file).toLowerCase();
      const mimeType =
        ext === '.mp4' ? 'video/mp4' :
        ext === '.png' ? 'image/png' :
        ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
        'application/octet-stream';

      // Copy file into uploads folder
      fs.copyFileSync(srcPath, destPath);

      await Media.create({
        filename: file,
        type: mimeType,
        size: stat.size,
        uploadedBy: user._id
      });

      console.log(`Seeded: ${file}`);
    }

    console.log(' All sample media seeded!');
    mongoose.disconnect();
  } catch (err) {
    console.error(' Error seeding media:', err);
    process.exit(1);
  }
};

seedMedia();
