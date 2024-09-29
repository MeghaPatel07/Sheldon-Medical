const DoctorManagementNew = require("../../models/DoctorManagement/DoctorManagementNew");
const LocationManagement = require("../../models/DoctorManagement/Location");
const mongoose = require("mongoose");
const fs = require("fs");
const multer = require("multer");
// const catchAsync = require("../utils/catchAsync");
// Controller function to add a new location
// exports.addLocation = async (req, res) => {
//   try {
//     const {where, when } = req.body;
//     console.log("where",where);
//     console.log("when",when);

//     // Create a new location document
//     const Location = new LocationManagement({
//       Where:where,
//       When:when
//     });

//     // Save the new location to the database
//     const savedLocation = await Location.save();

//     res.status(201).json(savedLocation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
exports.getAllLocations = async (req, res) => {
    try {
      const locations = await LocationManagement.find();
      res.json(locations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
exports.getLocationById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const location = await LocationManagement.findById(id);
  
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }
  
      res.json(location);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  // exports.updateLocationID = async (req, res) => {
  //   const editloc  = req.params.id;
  //   const {where,when} = req.body;
  //   console.log("locidddd editing issss",editloc);
  //   console.log("where editing isss",req.body);
  //   console.log("when editing isss",when);
  
  //   try {
  //     const location = await LocationManagement.findById(editloc);
  
  //     if (!location) {
  //       return res.status(404).json({ error: "Location not found" });
  //     }
  
  //     location.Where = where;
  //     location.When = when;
  
  //     await location.save();
  
  //     res.json(location);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // };
  // exports.deleteLocation=async (req, res) => {
  //   const locationId = req.params.id;
  
  //   try {
  //     // Find the location by ID and delete it
  //     const deletedLocation = await LocationManagement.findByIdAndDelete(locationId);
      
  //     if (!deletedLocation) {
  //       // If the location with the given ID is not found, return 404 Not Found
  //       return res.status(404).json({ message: 'Location not found' });
  //     }
  
  //     // Return a success message
  //     res.json({ message: 'Location deleted successfully', deletedLocation });
  //   } catch (error) {
  //     // If an error occurs, return 500 Internal Server Error
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // };

  exports.createDoctorManagement = async (req, res) => {
    try {
      if (!fs.existsSync(`${__basedir}/uploads/newKnowledgeBase`)) {
        fs.mkdirSync(`${__basedir}/uploads/newKnowledgeBase`);
      }
      let photo = req.file
      ? `uploads/newKnowledgeBase/${req.file.filename}`
:null;
console.log(photo);
      
      const { SpecialityName, docname, detail,Location,specialityNameOther} = req.body;
      // const photo = req.file ? req.file.path : null;
      console.log("imagepath",photo);
      console.log("docname",docname);
      console.log("SpecialityName",SpecialityName);
      console.log("location",Location);
      
      // const docimg = req.file.path; // Assuming storing image path in database
  
      // const uploadFile = req.file.path;
      
       const locationIds = Location.split(",");
      //   // const { Types } = mongoose; // Destructure Types from mongoose
      //   console.log("This is",locationIds)
        // const loc =locationIds.map((location) =>location._id)
        // console.log(loc)
      const add = await new DoctorManagementNew({
        SpecialityName: SpecialityName,
        name: docname,
        detail: detail,
        Location: Location, // Convert string ids to ObjectIds
        photo: photo,
        specialityNameOther: specialityNameOther,
      }).save();
      
      res.status(200).json({ isOk: true, data: add, message: "insserted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };
// Controller function to add a new doctor management entry
// exports.addDoctorManagement = async (req, res) => {
//   try {
//     const { SpecialityName, name, detail, Location, photo, specialityNameOther } = req.body;

//     // Create a new doctor management document
//     const DoctorManagementNew = new DoctorManagementNew({
//       SpecialityName,
//       name,
//       detail,
//       Location,
//       photo,
//       specialityNameOther,
//     });

//     // Save the new doctor management entry to the database
//     const savedDoctor = await DoctorManagementNew.save();

//     res.status(201).json(savedDoctor);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
