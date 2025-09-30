import path from 'path';
import express from 'express';
import multer from 'multer';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure Multer for file storage on disk
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // The folder where files will be saved
  },
  filename(req, file, cb) {
    // Create a unique filename to avoid naming conflicts
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Middleware to check if the file is an image
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// The upload route
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image file provided');
  }

  res.status(200).send({
    message: 'Image uploaded successfully',
    // We send back the path where the image was saved
    imageUrl: `/${req.file.path.replace(/\\/g, '/')}`,
  });
});

export default router;