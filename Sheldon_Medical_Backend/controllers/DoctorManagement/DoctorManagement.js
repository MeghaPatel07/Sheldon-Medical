// const { log } = require("console");
// const DoctorManagement = require("../../models/DoctorManagement/DoctorManagement");
// const SpecialityManagement = require("../../models/SpecialityManagement/SpecialityManagement");
// const LocationManagement = require("../../models/DoctorManagement/Location");
// const fs = require("fs");
// // const locations = require("../../models/Doctor/locations");



// exports.createDoctor = async (req, res) => {
//   try {
//     if (!fs.existsSync(`${__basedir}/uploads/doctorimages`)) {
//       fs.mkdirSync(`${__basedir}/uploads/doctorimages`);
//     }

//     const { SpecialityName, docname, detail,location,specialityNameOther} = req.body;
//     const photo = req.file ? req.file.path : null;
    
//     console.log("imagepath",photo);
//     console.log("docname",docname);
//     console.log("SpecialityName",SpecialityName);
//     console.log("location",location);
      
//       // const docimg = req.file.path; // Assuming storing image path in database
//       let locationIds=[]
//       // const uploadFile = req.file.path;
//       if(location.length >0){
//         locationIds = location.split(",");
//         console.log("loc ids",locationIds);
//       }
//       else if(location.length==0)
//       {
//         const locationIds=[]
//       }
       
    
//     // const docimg = req.file.path; // Assuming storing image path in database

//     // const uploadFile = req.file.path;
    
//     const add = await new DoctorManagement({
//       SpecialityName: SpecialityName,
//       DoctorName: docname,
//       detail: detail,
//       Location:locationIds, 
//       photo:photo,
//       specialityNameOther:specialityNameOther,
//     }).save();
//     res.status(200).json({ isOk: true, data: add, message: "insserted successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send(err);
//   }
// };
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
// exports.deleteDoctor = async (req, res) => {
//   try {
//     const delTL = await DoctorManagement.findOneAndRemove({
//       _id: req.params.id,
//     });
//     res.json(delTL);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };
// exports.updateDoctorManagement = async (req, res) => {
//   try {
//     if (!fs.existsSync(`${__basedir}/uploads/doctorimages`)) {
//       fs.mkdirSync(`${__basedir}/uploads/doctorimages`);
//     }
//     const id=req.params._id;
//     let photo1=req.body.photo;
//     console.log("photo on not update!",photo1);
//     const {SpecialityName, docname, detail,Location,specialityNameOther} = req.body;
//     // const photo = req.file ? req.file.path : null;
//     let photo = req.file ? req.file.path:photo1;
  
//     // const id=req.params.id;
//     console.log("iddd",id);
//     console.log("Location updatedddd",Location);
    
//     // console.log("imagepath",photo);
//     console.log("docname",req.file);
//     console.log("SpecialityName",SpecialityName);
    
//     // const docimg = req.file.path; // Assuming storing image path in database

//     // const uploadFile = req.file.path;
    
//     const add = await DoctorManagement.findByIdAndUpdate(id,{
//       SpecialityName: SpecialityName,
//       DoctorName: docname,
//       detail: detail,
//       Location:Location.split(","),
//       photo:photo,
//       specialityNameOther:specialityNameOther,
//     }, {
//       new: true,
//     });
//     // if (req.file["photo"]) {
//     //   fs.unlinkSync(add.photo);
//     //   add.photo= req.file.path;
//     // }
//     res.status(200).json({ isOk: true, data: add, message: "updated successfully" });
//   } catch (err) {
//     console.log(err);
//     res.json({ message: "No loc" });

//   }
// };
// exports.getDoctors = async (req, res) => {
//   try {
//     let { skip, per_page, sorton, sortdir, match } = req.body;
//     // const specialities = await DoctorManagement.find({}).populate('SpecialityName','SpecialityName').exec();

//     let query = [
//       {
//         $lookup: {
//           from: "specialitymanagements", // Assuming the DoctorName of the specialty collection is "specialties"
//           localField:"SpecialityName",
//           foreignField: "_id",
//           as: "specialtyInfo"
//         },
        
//       },
//       {
//         $unwind: {
//           path: "$specialitymanagements",
//           preserveNullAndEmptyArrays: true,
//         },
//       },{
//         $lookup: {
//           from: "locationmanagements", // Assuming the DoctorName of the specialty collection is "specialties"
//           localField:"Location",
//           foreignField: "_id",
//           as: "locationInfo"
//         },
        
//       },
//       {
//         $unwind: {
//           path: "$locationmanagements",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $match: {
//           $or: [
//             {
//               "specialtyInfo.0.SpecialityName": new RegExp(match, "i"),
//             },
//             {
//               detail: new RegExp(match, "i"),
//             },   {
//               DoctorName: new RegExp(match, "i"),
//             },   {
//               specialityNameOther: new RegExp(match, "i"),
//             },
//           ],
//         },
//       },
//       {
//         $sort: { createdAt: -1 },
//       },
     

     
//       {
//         $facet: {
//           stage1: [
//             {
//               $group: {
//                 _id: null,
//                 count: {
//                   $sum: 1,
//                 },
//               },
//             },
//           ],
//           stage2: [
//             {
//               $skip: parseInt(skip),
//             },
//             {
//               $limit: parseInt(per_page),
//             },
//           ],
//         },
//       },
//       {
//         $unwind: "$stage1"
//       },
      
     
//       {
//         $project: {
//           count: "$stage1.count",
//           data: "$stage2",
//           specialtyInfo: { $arrayElemAt: ["$specialtyInfo", 0] }, // Transform array to object
//           locationInfo: { $arrayElemAt: ["$locationInfo", 0] } // Transform array to object
//         },
//       },
//     ];
   
     

    

//     if (sorton && sortdir) {
//       let sort = {};
//       sort[sorton] = sortdir == "desc" ? -1 : 1;
//       query.unshift({
//         $sort: sort,
//       });
//     } else {
//       let sort = {};
//       sort["createdAt"] = -1;
//       query.unshift({
//         $sort: sort,
//       });
//     }

//     const list = await DoctorManagement.aggregate(query);
   

   
    
//     res.json(list);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// };
 
// exports.When= async (req, res) => {
// try {
//   // if (!fs.existsSync(${__basedir}/uploads/serviceImages)) {
//   //   fs.mkdirSync(${__basedir}/uploads/serviceImages);
//   // }

//   const { where,when } = req.body;
//   console.log("where",where);
//   // const docimg = req.file.path; // Assuming storing image path in database

//   // const uploadFile = req.file.path;
  
//   const add = await new DoctorManagement({
//     where,
//     when
//   }).save();
//   res.status(200).json({ isOk: true, data: add, message: "insserted successfully" });
// } catch (err) {
//   console.log(err);
//   return res.status(500).send(err);
// }
// };
// exports.getDoctorById = async (req, res) => {
//   try {
//     const find = await DoctorManagement.findById(req.params.id).populate('SpecialityName','SpecialityName').populate('Location','Where When');
//     res.json(find);
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// };


// exports.getSpecialities= async (req, res) => {
//   try {
//     if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
//       fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
//     }
//       const bookingIds = await SpecialityManagement.find();
//       console.log("specialites backenddd DoctorManagement management",bookingIds);

//       // Send the bookingIds as a response
//       res.json(bookingIds);
//   } catch (error) {
//       // Handle any errors
//       console.error('Error fetching booking IDs:', error);
//       res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
//   }
// };
// exports.listDoctorManagement = async (req, res) => {
//   try {
//     const list = await DoctorManagement.find().sort({ createdAt: -1 }).exec();
//     res.json(list);
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// };
// exports.getDoctors= async (req, res) => {
//   try {
//     if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
//       fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
//     }
//       const doctors = await DoctorManagement.find();
//       console.log("doctors backenddd DoctorManagement management",doctors);

//       // Send the bookingIds as a response
//       res.json(doctors);
//   } catch (error) {
//       // Handle any errors
//       console.error('Error fetching booking IDs:', error);
//       res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
//   }
// };
// exports.getDoctorsBySpec= async (req, res) => {
//   try {
//     if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
//       fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
//     }
//     const id=req.params.id;
//       const doctors = await DoctorManagement.find({SpecialityName:id}).populate('Location');
//       console.log("doctors backenddd DoctorManagement management",doctors);

//       // Send the bookingIds as a response
//       res.json(doctors);
//   } catch (error) {
//       // Handle any errors
//       console.error('Error fetching booking IDs:', error);
//       res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
//   }
// };
const { log } = require("console");
const DoctorManagement = require("../../models/DoctorManagement/DoctorManagement");
const SpecialityManagement = require("../../models/SpecialityManagement/SpecialityManagement");
const LocationManagement = require("../../models/DoctorManagement/Location");
const fs = require("fs");
// const locations = require("../../models/Doctor/locations");



exports.createDoctor = async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/doctorimages`)) {
      fs.mkdirSync(`${__basedir}/uploads/doctorimages`);
    }

    const { SpecialityName, docname, detail,location,specialityNameOther} = req.body;
    const photo = req.file ? req.file.path : null;
    
    console.log("imagepath",photo);
    console.log("docname",docname);
    console.log("SpecialityName",SpecialityName);
    console.log("location",location);
      
      // const docimg = req.file.path; // Assuming storing image path in database
      let locationIds=[]
      // const uploadFile = req.file.path;
      if(location.length >0){
        locationIds = location.split(",");
        console.log("loc ids",locationIds);
      }
      else if(location.length==0)
      {
        const locationIds=[]
      }
       
    
    // const docimg = req.file.path; // Assuming storing image path in database

    // const uploadFile = req.file.path;
    
    const add = await new DoctorManagement({
      SpecialityName: SpecialityName,
      DoctorName: docname,
      detail: detail,
      Location:locationIds, 
      photo:photo,
      specialityNameOther:specialityNameOther,
    }).save();
    res.status(200).json({ isOk: true, data: add, message: "insserted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
exports.addLocation = async (req, res) => {
  try {
    const {where, when } = req.body;
    console.log("where",where);
    console.log("when",when);

    // Create a new location document
    const Location = new LocationManagement({
      Where:where,
      When:when
    });

    // Save the new location to the database
    const savedLocation = await Location.save();

    res.status(201).json(savedLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateLocationID = async (req, res) => {
  const editloc  = req.params.id;
  const {where,when} = req.body;
  console.log("locidddd editing issss",editloc);
  console.log("where editing isss",req.body);
  console.log("when editing isss",when);

  try {
    const location = await LocationManagement.findById(editloc);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    location.Where = where;
    location.When = when;

    await location.save();

    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteLocation=async (req, res) => {
  const locationId = req.params.id;

  try {
    // Find the location by ID and delete it
    const deletedLocation = await LocationManagement.findByIdAndDelete(locationId);
    
    if (!deletedLocation) {
      // If the location with the given ID is not found, return 404 Not Found
      return res.status(404).json({ message: 'Location not found' });
    }

    // Return a success message
    res.json({ message: 'Location deleted successfully', deletedLocation });
  } catch (error) {
    // If an error occurs, return 500 Internal Server Error
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.deleteDoctor = async (req, res) => {
  try {
    const delTL = await DoctorManagement.findOneAndRemove({
      _id: req.params.id,
    });
    res.json(delTL);
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.updateDoctorManagement = async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/doctorimages`)) {
      fs.mkdirSync(`${__basedir}/uploads/doctorimages`);
    }
    const id=req.params._id;
    let photo1=req.body.photo;
    console.log("photo on not update!",photo1);
    const {SpecialityName, docname, detail,Location,specialityNameOther} = req.body;
    // const photo = req.file ? req.file.path : null;
    let photo = req.file ? req.file.path:photo1;
  
    // const id=req.params.id;
    console.log("iddd",id);
    console.log("Location updatedddd",Location);
    
    // console.log("imagepath",photo);
    console.log("docname",req.file);
    console.log("SpecialityName",SpecialityName);
    
    // const docimg = req.file.path; // Assuming storing image path in database

    // const uploadFile = req.file.path;
    
    const add = await DoctorManagement.findByIdAndUpdate(id,{
      SpecialityName: SpecialityName,
      DoctorName: docname,
      detail: detail,
      Location:Location.split(","),
      photo:photo,
      specialityNameOther:specialityNameOther,
    }, {
      new: true,
    });
    // if (req.file["photo"]) {
    //   fs.unlinkSync(add.photo);
    //   add.photo= req.file.path;
    // }
    res.status(200).json({ isOk: true, data: add, message: "updated successfully" });
  } catch (err) {
    console.log(err);
    res.json({ message: "No loc" });

  }
};
exports.getDoctors = async (req, res) => {
  try {
    let { skip, per_page, sorton, sortdir, match } = req.body;
    // const specialities = await DoctorManagement.find({}).populate('SpecialityName','SpecialityName').exec();

    let query = [
      {
        $lookup: {
          from: "specialitymanagements", // Assuming the DoctorName of the specialty collection is "specialties"
          localField:"SpecialityName",
          foreignField: "_id",
          as: "specialtyInfo"
        },
        
      },
      {
        $unwind: {
          path: "$specialitymanagements",
          preserveNullAndEmptyArrays: true,
        },
      },{
        $lookup: {
          from: "locationmanagements", // Assuming the DoctorName of the specialty collection is "specialties"
          localField:"Location",
          foreignField: "_id",
          as: "locationInfo"
        },
        
      },
      {
        $unwind: {
          path: "$locationmanagements",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            {
              "specialtyInfo.0.SpecialityName": new RegExp(match, "i"),
            },
            {
              detail: new RegExp(match, "i"),
            },   {
              DoctorName: new RegExp(match, "i"),
            },   {
              specialityNameOther: new RegExp(match, "i"),
            },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
     

     
      {
        $facet: {
          stage1: [
            {
              $group: {
                _id: null,
                count: {
                  $sum: 1,
                },
              },
            },
          ],
          stage2: [
            {
              $skip: parseInt(skip),
            },
            {
              $limit: parseInt(per_page),
            },
          ],
        },
      },
      {
        $unwind: "$stage1"
      },
      
     
      {
        $project: {
          count: "$stage1.count",
          data: "$stage2",
          specialtyInfo: { $arrayElemAt: ["$specialtyInfo", 0] }, // Transform array to object
          locationInfo: { $arrayElemAt: ["$locationInfo", 0] } // Transform array to object
        },
      },
    ];
   
     

    

    if (sorton && sortdir) {
      let sort = {};
      sort[sorton] = sortdir == "desc" ? -1 : 1;
      query.unshift({
        $sort: sort,
      });
    } else {
      let sort = {};
      sort["createdAt"] = -1;
      query.unshift({
        $sort: sort,
      });
    }

    const list = await DoctorManagement.aggregate(query);
   
  console.log("lists",list);
   
    
    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
 
exports.When= async (req, res) => {
try {
  // if (!fs.existsSync(${__basedir}/uploads/serviceImages)) {
  //   fs.mkdirSync(${__basedir}/uploads/serviceImages);
  // }

  const { where,when } = req.body;
  console.log("where",where);
  // const docimg = req.file.path; // Assuming storing image path in database

  // const uploadFile = req.file.path;
  
  const add = await new DoctorManagement({
    where,
    when
  }).save();
  res.status(200).json({ isOk: true, data: add, message: "insserted successfully" });
} catch (err) {
  console.log(err);
  return res.status(500).send(err);
}
};
exports.getDoctorById = async (req, res) => {
  try {
    const find = await DoctorManagement.findById(req.params.id).populate('SpecialityName','SpecialityName').populate('Location','Where When');
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};
exports.getDoctorSpecialityById = async (req, res) => {
  try {
    const find = await SpecialityManagement.findById(req.params.id);
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};


exports.getSpecialities= async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
      fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
    }
      const bookingIds = await SpecialityManagement.find();
      console.log("specialites backenddd DoctorManagement management",bookingIds);

      // Send the bookingIds as a response
      res.json(bookingIds);
  } catch (error) {
      // Handle any errors
      console.error('Error fetching booking IDs:', error);
      res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
  }
};
exports.listDoctorManagement = async (req, res) => {
  try {
    const list = await DoctorManagement.find().sort({ createdAt: -1 }).exec();
    res.json(list);
  } catch (error) {
    return res.status(400).send(error);
  }
};
exports.getDoctorsall= async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
      fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
    }
      const doctors = await DoctorManagement.find();
      console.log("doctors backenddd DoctorManagement management",doctors);
      console.log("all lists",doctors);

      // Send the bookingIds as a response
      res.json(doctors);
  } catch (error) {
      // Handle any errors
      console.error('Error fetching booking IDs:', error);
      res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
  }
};
exports.getDoctorsBySpec= async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
      fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
    }
    const id=req.params.id;
      const doctors = await DoctorManagement.find({SpecialityName:id}).populate('Location').populate('SpecialityName','SpecialityName').populate("SpecialityName","Detail").populate("SpecialityName","BlockQuote");
      console.log("doctors backenddd DoctorManagement management",doctors);

      // Send the bookingIds as a response
      res.json(doctors);
  } catch (error) {
      // Handle any errors
      console.error('Error fetching booking IDs:', error);
      res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
  }
};

