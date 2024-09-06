const multer = require('multer');
const path = require('path');

// Define storage for multer to temporarily save files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use a temporary folder to store files
    const uploadPath = path.join(__dirname, '..', 'src/uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with timestamp
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});

// Create the multer instance with the defined storage
const upload = multer({ storage: storage });

module.exports = { upload };
