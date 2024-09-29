const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const {
  createAdminUser,
  listAdminUser,
  listAdminUserByParams,
  getAdminUser,
  updateAdminUser,
  removeAdminUser,
  userLoginAdmin,
  updatePassword,
  getAdminUserall
} = require("../controllers/Auth/User/AdminUsers");
const uploadDirectory = "uploads/userImages";
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
router.post("/auth/create/adminUser",upload.single('ProfilePhoto'), catchAsync(createAdminUser));
router.put("/auth/update/adminUser", catchAsync(updatePassword));

router.get("/auth/list/adminUser", catchAsync(listAdminUser));

router.post("/auth/listByparams/adminUser", catchAsync(listAdminUserByParams));

router.get("/auth/get/adminUser/:_id", catchAsync(getAdminUser));

router.put("/auth/update/adminUser/:_id",upload.single('ProfilePhoto'), catchAsync(updateAdminUser));

router.delete("/auth/remove/adminUser/:_id", catchAsync(removeAdminUser));

router.post("/adminLogin", catchAsync(userLoginAdmin));
router.get("/auth/get/adminUserall", catchAsync(getAdminUserall));

module.exports = router;
