const mongoose = require("mongoose");
const { Schema } = mongoose; 

const DoctorManagementSchemaNew = new mongoose.Schema(
  {
    SpecialityName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpecialityManagement"
    },
    name: {
      type: String,
    },
    detail: {
      type: String,
    },
    Location: [
      {
      type:  mongoose.Schema.Types.ObjectId, // Array of Location objects
     ref:'LocationManagement'
      },
    ],
    photo: {
      type: String,
    },
    specialityNameOther: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoctorManagementNew", DoctorManagementSchemaNew);
