const express = require('express');
const router = express.Router();
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const {getServiceManagement,createServiceManagement,listSpecialityManagement,updateSpecialityManagement,removeSpecialityManagement,listNewServicebyParams,listServiceManagement,getServices } = require('../controllers/ServiceManagement/ServiceManagement');
const multer = require("multer");
const { createCompanyAddress, getCompanyAddressbyId, listAddressByParams, removeCompanyAddress, updateCompanyAddress, getCompanyAddresses } = require('../controllers/CompanyAddress/CompanyAddress');
const { listCompanyDetails } = require('../controllers/Setup/CompanyDetails');
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
router.post('/auth/create/CompanyAddress',catchAsync(createCompanyAddress));
router.get('/auth/get/CompanyAddressById/:_id',catchAsync(getCompanyAddressbyId));
router.post('/auth/list-by-params/CompanyAddressManagement',catchAsync(listAddressByParams));
router.put('/auth/update/CompanyAddressById/:_id',catchAsync(updateCompanyAddress));
router.delete('/auth/delete/CompanyAddress/:id',catchAsync(removeCompanyAddress));
router.get('/auth/get/CompanyAddressAll',catchAsync(getCompanyAddresses));
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
