const multer = require('multer');

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

// Configuration de Multer avec les options de stockage
const upload = multer({ storage: storage });

module.exports = upload;
