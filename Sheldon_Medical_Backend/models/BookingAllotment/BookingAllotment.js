const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const BookingAllotmentSchema = new mongoose.Schema(
  {
    DoctorName: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"DoctorManagement"
      // required: true,
    },
    AllotedId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"BookingManagement"
      // required: true,
    },
    AllotmentDate: {
      type: Date,
      // required: true,
    },
    AllotmentTime:{
        type:String
    },

   
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookingAllotment", BookingAllotmentSchema);