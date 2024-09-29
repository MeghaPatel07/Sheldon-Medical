const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
const BookingManagementSchema = new mongoose.Schema(
  {
    BookingNo:{
      type:Number
    },
    SpecialityName: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"SpecialityManagement"
      // required: true,
    },
    LabelSpecialityName:{
      type:String
    },
    Name: {
      type: String,
      // required: true,
    },
    Phone: {
      type: String,
      // required: true,
    },
    Email: {
        type: String,
        // required: true,
      },
    BookingDate: {
      type: Date,
      // required: true,
    },
    Alloted:{
      type:Boolean,
      default:false,
    },
    DoctorName: {
      type: String,
      // ref:"DoctorManagement",
      // default: () => mongoose.Types.ObjectId()
      // required: true,
    },
    AllotmentDate: {
      type: Date,
      // default:Date.now
    },
    AllotmentTime:{
        type:String,
        // default: getCurrentTime
    },
    Message:{
      type:String
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("BookingSchema", BookingManagementSchema);
