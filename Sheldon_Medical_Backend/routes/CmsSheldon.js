const express = require('express');
const router = express.Router();

const multer = require("multer");
const fs = require("fs");

const catchAsync = require("../utils/catchAsync");
const {createCmsAboutUs,editCmsAboutUsContent,getCmsAboutUsById,getCmsAboutus} = require("../controllers/CMS_Sheldon/Cms_AboutUs")
const {createCmsContactUs,editCmsContactUsDetailContent,getCmsContactUsDetailById,getCmsContactUs} = require ("../controllers/CMS_Sheldon/Cms_ContactUs")

router.post('/auth/create/createCmsContactUS',catchAsync(createCmsContactUs));
router.get('/cms/get/contactusdetail/:id',catchAsync (getCmsContactUsDetailById));
router.put('/cms/edit/contactusdetail/:id', catchAsync(editCmsContactUsDetailContent));
router.get('/auth/get/aboutus',catchAsync(getCmsAboutus));
router.get('/cms/get/contactus',catchAsync (getCmsContactUs));


const multerStorageCK = multer.diskStorage({
    destination: (req, file, cb) => {
      const dest = "uploads/AboutUS";
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
    "/auth/ckeditorAboutUs/imageupload",
    uploadCk.single("uploadImage"),
    async (req, res) => {
      console.log(req.file.filename);
      res.json({ url: req.file.filename });
    }
  );

router.put('/cms/edit/aboutus/:id',catchAsync (editCmsAboutUsContent));
router.post('/auth/create/createCmsAboutUS',catchAsync(createCmsAboutUs));
router.get('/cms/get/aboutus/:id',catchAsync (getCmsAboutUsById));
    
// router.get('/auth/get/specialitymanagement/:_id', catchAsync(getSpecialityManagement));
// router.get('/auth/list/specialitymanagement', catchAsync(listSpecialityManagement));
// router.put('/auth/update/specialitymanagement/:_id', catchAsync(updateSpecialityManagement));
// router.delete('/auth/delete/specialitymanagement/:_id', catchAsync(removeSpecialityManagement));
// router.post("/auth/list-by-params/specialitymanagement", catchAsync(listNewSpecialitybyParams));

module.exports = router;