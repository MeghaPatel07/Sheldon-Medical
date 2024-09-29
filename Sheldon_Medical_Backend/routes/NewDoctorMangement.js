const express = require('express');
const router = express.Router();

const fs = require("fs");
const multer = require("multer");
const catchAsync = require("../utils/catchAsync");
const {getAllLocations,getLocationById,updateLocationID,createDoctorManagement,addLocation,deleteLocation} = require("../controllers/DoctorManagement/NewDoctorManagement")

const uploadDirectory = "uploads/newKnowledgeBase";
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
router.get("/auth/list/Alllocations", catchAsync(getAllLocations));
router.post('/auth/create/CreateDoctorManagement',upload.single("photo"),catchAsync(createDoctorManagement));
// router.post('/auth/create/Location',catchAsync(addLocation)) 
// router.get("/auth/get/locations/:id", catchAsync(getLocationById));
// router.put("/auth/edit/location/:id",catchAsync(updateLocationID));
// router.delete("/auth/delete/locationById/:id",catchAsync(deleteLocation))
module.exports = router;