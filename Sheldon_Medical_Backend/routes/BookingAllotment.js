const express = require('express');
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const {updateBookingAllotment,removeBookingAllotment,listNewBookingAllotmentbyParams,listBookingAllotment,getBookingAllotment,createBookingAllotment} =require("../controllers/BookingAllotment/BookingAllotment")


// POST route to create a new SpecialityManagement entry
router.post('/auth/create/bookingallotment',catchAsync(createBookingAllotment));
router.get('/auth/get/bookingallotment/:_id', catchAsync(getBookingAllotment));
router.get('/auth/list/bookingallotment', catchAsync(listBookingAllotment));
router.put('/auth/update/bookingallotment/:_id', catchAsync(updateBookingAllotment));
router.delete('/auth/delete/bookingallotment/:_id', catchAsync(removeBookingAllotment));
router.post("/auth/list-by-params/bookingallotment", catchAsync(listNewBookingAllotmentbyParams));


module.exports = router;
