const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const DoctorSchema = new mongoose.Schema(
  {
    speciality: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    where: {
        type: String,
        required: true,
      },
    when: {
      type: String,
      required: true,
    },
    photo: {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
