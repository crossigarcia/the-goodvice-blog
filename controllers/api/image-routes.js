const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');

var fileStorageEngine = multer.diskStorage ({
    destination: (req, file, cb) => {
      cb(null, './images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    },
  });
   
  var multer_Upload = multer({ storage: fileStorageEngine });
  
  router.post('/', multer_Upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send("Upload Complete");
  });

  module.exports = router;
