const multer = require('multer');
const path = require('path');

// Configure Multer for CSV uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads/'), // Save in 'uploads' folder
        filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv') cb(null, true);
        else cb(new Error('Only CSV files are allowed!'));
    }
});

module.exports = upload;
