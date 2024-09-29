const mongoose = require("mongoose");
const { Schema } = mongoose;
const TestimonialManagementSchema = new mongoose.Schema(
  {
    ClientName: {
      type: String,
    //   required: true,
    },
    Testimonial:{
type:String
    },
   ClientImage: {
      type: String,
     
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestimonialManagement", TestimonialManagementSchema);
