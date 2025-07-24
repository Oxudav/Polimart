const express = require('express');
const {
  uploadMedia,
  getMediaList,
  downloadMedia
} = require('../controllers/mediaController');

const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/upload', authMiddleware, uploadMedia);
router.get('/', authMiddleware, getMediaList);
router.get('/:id', authMiddleware, downloadMedia);

module.exports = router;
