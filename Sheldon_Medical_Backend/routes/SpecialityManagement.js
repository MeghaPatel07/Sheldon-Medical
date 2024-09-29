const express = require('express');
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {createSpecialityManagement,getSpecialityManagement,listSpecialityManagement,updateSpecialityManagement,removeSpecialityManagement,listNewSpecialitybyParams,getSpecialities,listonlyKnowledgeBaseManagement} = require('../controllers/SpecialityManagement/SpecialityManagement');

const uploadDirectory = "uploads/newProjectImages";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Generalized Multer storage configuration
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Set the destination directory for the image file
      cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded file
      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  const upload = multer({ storage: multerStorage });

// POST route to create a new SpecialityManagement entry
router.post('/auth/create/specialitymanagement',upload.fields([{ name: 'UploadHomeIcon', maxCount: 1 }, { name: 'UploadIcon', maxCount: 1 }]),catchAsync(createSpecialityManagement));
const multerStorageCK = multer.diskStorage({
    destination: (req, file, cb) => {
      const dest = "uploads/descriptionCKImages";
      // Ensure the directory exists
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  const uploadCk = multer({ storage: multerStorageCK });
  router.post(
    "/auth/ckeditorspeciality/imageupload",
    uploadCk.single("uploadImage"),
    async (req, res) => {
      console.log(req.file.filename);
      res.json({ url: req.file.filename });
    }
  );
router.get('/auth/get/specialitymanagement/:_id', catchAsync(getSpecialityManagement));
router.post('/auth/list/specialitymanagement', catchAsync(listSpecialityManagement));
router.put('/auth/update/specialitymanagement/:_id',upload.fields([{ name: 'UploadHomeIcon', maxCount: 1 }, { name: 'UploadIcon', maxCount: 1 }]), catchAsync(updateSpecialityManagement));
router.delete('/auth/delete/specialitymanagement/:_id', catchAsync(removeSpecialityManagement));
router.post("/auth/list-by-params/specialitymanagement", catchAsync(listNewSpecialitybyParams));
router.get('/auth/get/specialities', catchAsync(getSpecialities));
module.exports = router;
