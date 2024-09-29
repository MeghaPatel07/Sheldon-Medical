const mongoose = require("mongoose");
const { Schema } = mongoose;
const CompanyAddressSchema = new mongoose.Schema(
  { 
    CompanyAddress:{
        type:String,
    }
   
  },
  { timestamps: true }
); 

module.exports = mongoose.model("CompanyAddress", CompanyAddressSchema);