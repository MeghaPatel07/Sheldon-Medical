const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");
// const {
//   createInquiry,
// } = require("../controllers/Category/CategoryMaster");
const { createInquiryManagement, getInquiries, listInquiries } = require("../controllers/InquiryManagement/InquiryManagement");

router.post("/auth/create/inquiry", catchAsync(createInquiryManagement));

router.post("/auth/get/inquiriesByParams", catchAsync(listInquiries));


module.exports = router;