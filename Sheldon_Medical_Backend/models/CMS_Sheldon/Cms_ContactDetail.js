const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const CmsSchema_ConatctUsDetail = new mongoose.Schema(
  {
    ContactUsDetail: {
      type: String,
    },
    
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("CmsSchema_ConatctUsDetail", CmsSchema_ConatctUsDetail);