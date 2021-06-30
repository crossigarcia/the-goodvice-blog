const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });

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
    cloudinary.uploader.upload(req.file.path, function(error, result) {
        console.log("File Name: ", result.original_filename, "\nCreated at: ", result.created_at, "\n Secure url: ", result.secure_url,
        "\nSignature: ", result.signature);

        fs.writeFileSync('./images/path.txt', result.secure_url);
    });

    console.log("Result:");

    res.send("Upload Complete");
  });

  module.exports = router;
