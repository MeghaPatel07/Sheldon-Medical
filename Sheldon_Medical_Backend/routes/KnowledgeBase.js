const express = require('express');
const router = express.Router();
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const {listNewKnowledgeBasebyParams,removeKnowledgeBaseManagement,updateKnowledgeBaseManagement,listKnowledgeBaseManagement,createKnowledgeBaseManagement,getKnowledgeBaseManagement,getKnowledgeBase,listonlyKnowledgeBaseManagement} = require('../controllers/KnowledgeBase/KnowledgeBase');
const multer = require("multer");
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
// POST route to create a new SpecialityManagement entry
router.post('/auth/create/knowledgebase',upload.single("UploadFile"),catchAsync(createKnowledgeBaseManagement));
router.get('/auth/get/knowledgebase/:_id',catchAsync(getKnowledgeBaseManagement));
router.post('/auth/list/knowledgebase',catchAsync(listKnowledgeBaseManagement));
router.get('/auth/get/knowledgebase',catchAsync(listonlyKnowledgeBaseManagement));
router.put('/auth/update/knowledgebase/:_id',upload.single('UploadFile'),catchAsync(updateKnowledgeBaseManagement));
router.delete('/auth/delete/knowledgebase/:_id',catchAsync(removeKnowledgeBaseManagement));
router.post("/auth/list-by-params/knowledgebase", catchAsync(listNewKnowledgeBasebyParams));
router.get('/auth/get/knowledgebase',catchAsync(getKnowledgeBase));
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
    "/auth/ckeditorknowledgebase/imageupload",
    uploadCk.single("uploadImage"),
    async (req, res) => {
      console.log(req.file.filename);
      res.json({ url: req.file.filename });
    }
  );

module.exports = router;
