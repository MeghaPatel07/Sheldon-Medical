const express = require('express');
const router = express.Router();
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const {getServiceManagement,createServiceManagement,listSpecialityManagement,updateSpecialityManagement,removeSpecialityManagement,listNewServicebyParams,listServiceManagement,getServices } = require('../controllers/ServiceManagement/ServiceManagement');
const multer = require("multer");
const uploadDirectory = "uploads/newServiceManagament";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

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
router.post('/auth/create/servicemanagement',upload.fields([{ name: 'UploadHomeIcon', maxCount: 1 }, { name: 'UploadIcon', maxCount: 1 }]),catchAsync(createServiceManagement));
router.get('/auth/get/servicemanagement/:_id',catchAsync(getServiceManagement));
router.post('/auth/list/servicemanagement',catchAsync(listServiceManagement ));
router.put('/auth/update/servicemanagement/:_id',upload.fields([{ name: 'UploadHomeIcon', maxCount: 1 }, { name: 'UploadIcon', maxCount: 1 }]),catchAsync(updateSpecialityManagement));
router.delete('/auth/delete/servicemanagement/:_id',catchAsync(removeSpecialityManagement));
router.post("/auth/list-by-params/servicemanagement", catchAsync(listNewServicebyParams));
router.get('/auth/get/services',catchAsync(getServices));
// router.get('auth/get/doctormanagement',getDoctorManagement);
const multerStorageCK = multer.diskStorage({
    destination: (req, file, cb) => {
      const dest = "uploads/descriptionCKImages";
      fs.mkdirSync(dest, {recursive:true});
      cb(null,dest);
      
  
    },
    filename: (req, file, cb) => {
      // const ext = file.mimetype.split("/")[1];
      // cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  const uploadCk = multer({ storage: multerStorageCK });
  router.post(
    "/auth/ckeditorservice/imageupload",
    uploadCk.single("uploadImage"),
    async (req, res) => {
      console.log(req.file.filename);
      res.json({ url: req.file.filename });
    }
  );

module.exports = router;
