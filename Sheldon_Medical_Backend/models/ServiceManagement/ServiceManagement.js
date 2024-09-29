const mongoose = require("mongoose");
const { Schema } = mongoose;
const ServiceManagementSchema = new mongoose.Schema(
  {
    ServiceName: {
      type: String,
      required: true,
    },
    Thumbnail:{
type:String
    },
    Detail: {
      type: String,
      // required: true,
    },
   UploadIcon: {
      type: String,
     
    },
    UploadHomeIcon: {
      type:String,
      
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceManagement", ServiceManagementSchema);
