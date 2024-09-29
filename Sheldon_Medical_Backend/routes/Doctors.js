const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const {
  createDoctor

} = require("../controllers/Doctors/Doctors");

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/doctorimages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: multerStorage });

router.post(
    "/auth/create/doctor",
    upload.single("docimg"),
    catchAsync(createDoctor)
  );
module.exports = router;
