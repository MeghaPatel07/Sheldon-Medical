const mongoose = require("mongoose");
const { Schema } = mongoose;
const LocationSchema = new mongoose.Schema(
  { 
    Where: {
      type: String,
      // required: true,
    },
    When: {
      type: String,
      // required: true,
    },
   
  },
  { timestamps: true }
); 

module.exports = mongoose.model("LocationManagement", LocationSchema);