const express = require('express');
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
// const {createSpecialityManagement,getSpecialityManagement,listSpecialityManagement,updateSpecialityManagement,removeSpecialityManagement,listNewSpecialitybyParams} = require('../controllers/SpecialityManagement/SpecialityManagement');
const {createBookingManagement,getBookingManagement,listBookingManagement,
    listNewBookingbyParams,removeBookingManagement,updateBookingManagement,
    getBookingManagementReport, listBookingManagement_noParams} =require("../controllers/BookingManagement/BookingManagement")

// const uploadDirectory = "uploads/newProjectImages";
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// Generalized Multer storage configuration
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       // Set the destination directory for the image file
//       cb(null, uploadDirectory);
//     },
//     filename: (req, file, cb) => {
//       // Generate a unique filename for the uploaded file
//       cb(null, Date.now() + "_" + file.originalname);
//     },
//   });
//   const upload = multer({ storage: multerStorage });

// POST route to create a new SpecialityManagement entry
router.post('/auth/create/bookingmanagement',catchAsync(createBookingManagement));
router.get('/auth/get/bookingmanagement/:_id', catchAsync(getBookingManagement));
router.get('/auth/get/report/:id', catchAsync(getBookingManagementReport));
router.post('/auth/list/bookingmanagement', catchAsync(listBookingManagement));
router.put('/auth/update/bookingmanagement/:_id', catchAsync(updateBookingManagement));
router.delete('/auth/delete/bookingmanagement/:_id', catchAsync(removeBookingManagement));
router.post("/auth/list-by-params/bookingmanagement", catchAsync(listBookingManagement));
router.get('/auth/get/listBookingManagement_noParams',catchAsync(listBookingManagement_noParams));

module.exports = router;
