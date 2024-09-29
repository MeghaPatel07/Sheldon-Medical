const express = require('express');
const router = express.Router();
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const {getServiceManagement,createServiceManagement,listSpecialityManagement,updateSpecialityManagement,removeSpecialityManagement,listNewServicebyParams,listServiceManagement,getServices } = require('../controllers/ServiceManagement/ServiceManagement');
const multer = require("multer");
const { createTestimonial, getTestimonialById, listTestimonial, updateTestimonial, removeTestimonial, listTestmonialByParams } = require('../controllers/TestimonialManagement/TestimonialManagement');
const uploadDirectory = "uploads/TestimonialManagement";
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
router.post('/auth/create/testimonialmanagement',upload.single("ClientImage"),catchAsync(createTestimonial));
router.get('/auth/get/testimonialmanagement/:_id',catchAsync(getTestimonialById));
router.post('/auth/list/testimonialmanagement',catchAsync(listTestimonial ));
router.put('/auth/update/testimonialmanagement/:_id',upload.single("ClientImage"),catchAsync(updateTestimonial));
router.delete('/auth/delete/testimonialmanagement/:_id',catchAsync(removeTestimonial));
router.post("/auth/list-by-params/testimonialmanagement", catchAsync(listTestmonialByParams));
router.get('/auth/get/testimonials',catchAsync(listTestimonial));
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
