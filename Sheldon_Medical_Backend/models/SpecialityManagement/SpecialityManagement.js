const mongoose = require("mongoose");
const { Schema } = mongoose;
const SpecialityManagementSchema = new mongoose.Schema(
  {
    SpecialityName: {
      type: String,
      //required: true,
    },
    Detail: {
      type: String,
      // required: true,
    },
    DoctorSpeciality:{
      type:String
    },
    Location: {
      type: [{
        type: String,
        // You can add additional validations if needed
      }],
      default: [] // You can set a default value if needed
    },
   BlockQuote:{
    type:[{
      type:String,
    }],
    default: [] 
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

module.exports = mongoose.model("SpecialityManagement", SpecialityManagementSchema);
