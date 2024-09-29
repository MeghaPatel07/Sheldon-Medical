const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
const InquiryManagementSchema = new mongoose.Schema(
  {
    Name:{
      type:String
    },
    Email: {
      type: String
      // required: true,
    },
    Phone:{
      type:String
    },
    Subject: {
      type: String,
      // required: true,
    },
    Message: {
      type: String,
      // required: true,
    },
    InquiryDate: {
        type: String,
        // required: true,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", InquiryManagementSchema);
