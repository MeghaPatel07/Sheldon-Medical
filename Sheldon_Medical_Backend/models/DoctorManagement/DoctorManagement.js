// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const DoctorManagementSchema = new mongoose.Schema(
//   {
//     SpecialityName: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref:"SpecialityManagement"
//     },
//     DoctorName: {
//       type: String,
//       // required: true,
//     },
//     detail: {
//       type: String,
//       // required: true,
//     },
//     where: [{ type: String }], 
//     when: [{ type: String }], 
//     photo: {
//         type: String,
//         // required: true,
//       },
//       specialityNameOther:{
//         type: String,
//       }
//   },
//   { timestamps: true }
// ); 

// module.exports = mongoose.model("DoctorManagement", DoctorManagementSchema);
const mongoose = require("mongoose");
const { Schema } = mongoose;
const DoctorManagementSchema = new mongoose.Schema(
  {
    SpecialityName: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"SpecialityManagement"
    },
    DoctorName: {
      type: String,
      // required: true,
    },
    detail: {
      type: String,
      // required: true,
    },
    Location: [
      {
     type:  mongoose.Schema.Types.ObjectId, // Array of Location objects
     ref:'LocationManagement',
      },
    ],
    photo: {
        type: String,
        // required: true,
      },
      specialityNameOther:{
        type: String,
      }
  },
  { timestamps: true }
); 

module.exports = mongoose.model("DoctorManagement", DoctorManagementSchema);