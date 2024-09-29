const mongoose = require("mongoose");

const CompanyDetailsSchema = new mongoose.Schema(
  {
    CompanyName: {
      type: String,
      required: true,
    },
    ContactPersonName: {
      type: String,
      required: true,
    },
    CountryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    StateID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    Address1: {
      type: String,
      required: true,
    },
    Pincode1: {
      type: Number,
      required: true,
    },
    Address2: {
      type: String,
      required: true,
    },
    Pincode2: {
      type: Number,
      required: true,
    },
    FAX1: {
      type: String,
      // required: true,
    },
    FAX2: {
      type: String,
      // required: true,
    },
    PHONE: {
      type: String,
      // required: true,
    },
    MOBILE: {
      type: String,
      // required: true,
    },
    EmailID_Office: {
      type: String,
      // required: true,
    },
    EmailID_Support: {
      type: String,
      // required: true,
    },
    EmailID_Sales: {
      type: String,
      // required: true,
    },
    Website1: {
      type: String,
      // required: true,
    },
    Website2: {
      type: String,
    },
    Favicon: {
      type: String,
    },
    Icon: {
      type: String,
    },
    Logo: {
      type: String,
    },
    DigitalSignature: {
      type: String,
    },
    GSTNo: {
      type: String,
      // required: true,
    },
    IsActive: {
      type: Boolean,
      default: true,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanyDetails", CompanyDetailsSchema);
