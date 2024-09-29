// // const express = require('express');
// // const router = express.Router();
// // const catchAsync = require("../utils/catchAsync");
// // const {createDoctor,getSpecialities,getDoctors,listDoctorManagement} = require('../controllers/DoctorManagement/DoctorManagement');

// // // POST route to create a new SpecialityManagement entry
// // // router.post('/auth/add/doctormanagement',createDoctorManagement);
// // // router.get('/auth/get/doctormanagement/:_id',getDoctorManagement);
// // // router.get('/auth/list/doctormanagement',listLocation);
// // // router.put('/auth/update/doctormanagement/:_id',updateDoctorManagement);
// // // router.delete('/auth/delete/doctormanagement/:_id',removeDoctorManagement);
// // // router.get('auth/get/doctormanagement',getDoctorManagement);

// // const multer = require("multer");

// // const multerStorage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/doctorimages");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + "_" + file.originalname);
// //   },
// // });

// // const upload = multer({ storage: multerStorage });

// // router.post( "/auth/create/doctorManagement", upload.single("photo"), catchAsync(createDoctor)
// //   );
// //   // router.post(
// //   //   "/auth/create/location",
// //   //   catchAsync(createLocation)
// //   // );
// //   router.get("/auth/get/specialitiesnames", catchAsync(getSpecialities)
// //   );
// //   router.post( "/auth/get/getdoctors", catchAsync(getDoctors)
// //   );



// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const fs = require("fs");
// const catchAsync = require("../utils/catchAsync");
// const {listDoctorManagement,createDoctor,getSpecialities,getDoctors,getDoctorById,updateDoctorManagement,deleteDoctor,addLocation,updateLocationID,deleteLocation,getDoctorsBySpec} = require('../controllers/DoctorManagement/DoctorManagement');

// router.get('/auth/list/listAllDoctorManagement',catchAsync(listDoctorManagement))
// // POST route to create a new SpecialityManagement entry
// // router.post('/auth/add/doctormanagement',createDoctorManagement);
// // router.get('/auth/get/doctormanagement/:_id',getDoctorManagement);
// // router.get('/auth/list/doctormanagement',listLocation);
// // router.put('/auth/update/doctormanagement/:_id',updateDoctorManagement);
// // router.delete('/auth/delete/doctormanagement/:_id',removeDoctorManagement);
// // router.get('auth/get/doctormanagement',getDoctorManagement);

// const multer = require("multer");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/doctorimages");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: multerStorage });
// const uploadDirectory = "uploads/newDoctorImages";
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// router.post( "/auth/create/doctorManagement", upload.single("photo"), catchAsync(createDoctor)
//   );
//   // router.post(
//   //   "/auth/create/location",
//   //   catchAsync(createLocation)
//   // );
//   router.get("/auth/get/specialitiesnames", catchAsync(getSpecialities)
//   );
//   router.post( "/auth/get/getdoctors", catchAsync(getDoctors)
//   );


//   router.get("/auth/getdoctorbyid/:id",catchAsync(getDoctorById));
//   router.put('/auth/update/doctormanagement/:_id',upload.single("photo"), catchAsync(updateDoctorManagement));
  
//   router.delete("/auth/delete/doctor/:id",catchAsync(deleteDoctor)
//   );
  

//   // router.get('/auth/list/listAllDoctorManagement',catchAsync(listDo));
//   router.post('/auth/create/location',catchAsync(addLocation)) ;
//   router.put("/auth/edit/location/:id",catchAsync(updateLocationID));
//   router.delete("/auth/delete/location/:id",catchAsync(deleteLocation));
//   router.get("/auth/get/doctors", catchAsync(getDoctors));
//   router.get( "/auth/get/doctorsbyspeciality/:id",catchAsync(getDoctorsBySpec));
  
// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const catchAsync = require("../utils/catchAsync");
// const {createDoctor,getSpecialities,getDoctors,listDoctorManagement} = require('../controllers/DoctorManagement/DoctorManagement');

// // POST route to create a new SpecialityManagement entry
// // router.post('/auth/add/doctormanagement',createDoctorManagement);
// // router.get('/auth/get/doctormanagement/:_id',getDoctorManagement);
// // router.get('/auth/list/doctormanagement',listLocation);
// // router.put('/auth/update/doctormanagement/:_id',updateDoctorManagement);
// // router.delete('/auth/delete/doctormanagement/:_id',removeDoctorManagement);
// // router.get('auth/get/doctormanagement',getDoctorManagement);

// const multer = require("multer");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/doctorimages");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: multerStorage });

// router.post( "/auth/create/doctorManagement", upload.single("photo"), catchAsync(createDoctor)
//   );
//   // router.post(
//   //   "/auth/create/location",
//   //   catchAsync(createLocation)
//   // );
//   router.get("/auth/get/specialitiesnames", catchAsync(getSpecialities)
//   );
//   router.post( "/auth/get/getdoctors", catchAsync(getDoctors)
//   );



// module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const {listDoctorManagement,createDoctor,getSpecialities,getDoctors,getDoctorById,updateDoctorManagement,deleteDoctor,addLocation,updateLocationID,deleteLocation, getDoctorsall, getDoctorsBySpec, getDoctorSpecialityById} = require('../controllers/DoctorManagement/DoctorManagement');

router.get('/auth/list/listAllDoctorManagement',catchAsync(listDoctorManagement))
// POST route to create a new SpecialityManagement entry
// router.post('/auth/add/doctormanagement',createDoctorManagement);
// router.get('/auth/get/doctormanagement/:_id',getDoctorManagement);
// router.get('/auth/list/doctormanagement',listLocation);
// router.put('/auth/update/doctormanagement/:_id',updateDoctorManagement);
// router.delete('/auth/delete/doctormanagement/:_id',removeDoctorManagement);
// router.get('auth/get/doctormanagement',getDoctorManagement);

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/doctorimages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: multerStorage });
const uploadDirectory = "uploads/newDoctorImages";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

router.post( "/auth/create/doctorManagement", upload.single("photo"), catchAsync(createDoctor)
  );
  // router.post(
  //   "/auth/create/location",
  //   catchAsync(createLocation)
  // );
  router.get("/auth/get/specialitiesnames", catchAsync(getSpecialities)
  );
  router.post("/auth/get/getdoctors", catchAsync(getDoctors)
  );


  router.get("/auth/getdoctorbyid/:id",catchAsync(getDoctorById));
  router.get("/auth/getDoctorSpecialityById/:id",catchAsync(getDoctorSpecialityById));
  router.put('/auth/update/doctormanagement/:_id',upload.single("photo"), catchAsync(updateDoctorManagement));
  
  router.delete("/auth/delete/doctor/:id",catchAsync(deleteDoctor)
  );
  

  // router.get('/auth/list/listAllDoctorManagement',catchAsync(listDo));
  router.post('/auth/create/location',catchAsync(addLocation)) ;
  router.put("/auth/edit/location/:id",catchAsync(updateLocationID));
  router.delete("/auth/delete/location/:id",catchAsync(deleteLocation));

  router.get("/auth/get/doctorsall", catchAsync(getDoctorsall));
  router.get("/auth/get/doctorsbyspeciality/:id",catchAsync(getDoctorsBySpec));
module.exports = router;