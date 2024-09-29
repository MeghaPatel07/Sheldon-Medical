const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const CmsSchema_AboutUs = new mongoose.Schema(
  {
    AboutUsDetail: {
      type: String,
    },
    
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("CmsSchema_AboutUs", CmsSchema_AboutUs);