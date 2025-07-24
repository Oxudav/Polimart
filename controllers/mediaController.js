const path = require('path');
const fs = require('fs');
const Media = require('../models/Media');
const multer = require('multer');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Upload media
exports.uploadMedia = (req, res, next) => {
  upload.single('file')(req, res, async (err) => {
    if (err || !req.file)
      return res.status(400).json({ msg: 'File upload failed.' });

    try {
      const newMedia = await Media.create({
        filename: req.file.filename,
        type: req.file.mimetype,
        size: req.file.size,
        uploadedBy: req.userId
      });

      res.status(201).json({ msg: 'File uploaded', media: newMedia });
    } catch (err) {
      next(err);
    }
  });
};

// List user media
exports.getMediaList = async (req, res, next) => {
  try {
    const media = await Media.find({ uploadedBy: req.userId });
    res.json(media);
  } catch (err) {
    next(err);
  }
};

// Download media
exports.downloadMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ msg: 'File not found' });

    const filePath = path.join(__dirname, '..', 'uploads', media.filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ msg: 'File missing' });

    res.download(filePath);
  } catch (err) {
    next(err);
  }
};
