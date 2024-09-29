const { log } = require("console");
// const booking = require("../../models/Booking/Booking");
const BookingManagement =require("../../models/BookingManagement/BookingManagement");
const fs = require("fs");
const SpecialityManagement = require("../../models/SpecialityManagement/SpecialityManagement");
exports.createBookingManagement = async (req, res) => {
  try {
  
    let {
      BookingNo,BookingDate, Email, Phone, Name, LabelSpecialityName, SpecialityName, Alloted, DoctorName, AllotmentDate, AllotmentTime,Message
    } = req.body;
   console.log("Body",req.body);
    console.log("Speciality isss", SpecialityName);
    console.log("Speciality isss", BookingNo);
    console.log("thisi s", req.body);
    
    let selectedDate = new Date(BookingDate);
  
    // Add 1 day to the selected date
    selectedDate.setDate(selectedDate.getDate() + 1);
    BookingDate = selectedDate;

    // let selectedAllotmentDate = new Date(AllotmentDate);
    // selectedAllotmentDate.setDate(selectedAllotmentDate.getDate() + 1);
    // AllotmentDate = selectedAllotmentDate;

    const newBookingManagement = new BookingManagement({BookingNo,SpecialityName, Name, LabelSpecialityName, Phone, Email, BookingDate, Alloted, DoctorName, AllotmentDate, AllotmentTime,Message });
    const savedBookingManagement = await newBookingManagement.save();
    return res.json({ success: true, data: savedBookingManagement });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};



  exports.getBookingManagement= async (req, res) => {
    try {
        // Fetch only the _id field from all bookings
        const find = await BookingManagement.findOne({ _id: req.params._id })
        .populate('SpecialityName','SpecialityName')
        .exec();
        // console.log("specialites backenddd",bookingIds);
res.json(find);
        // Send the bookingIds as a response


        // res.json(bookingIds);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching booking IDs:', error);
        res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
    }
   
  };
exports.getBookingManagementReport = async (req, res) => {
  try {
    // Fetch the booking by ID
    const booking = await BookingManagement.findOne({ _id: req.params.id })
      .populate('SpecialityName', 'SpecialityName')
      .exec();

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Wrap the booking in an array before sending the response
    res.json([booking]);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'An error occurred while fetching booking' });
  }
};




  exports.listBookingManagement_noParams = async (req, res) => {
    try {
      const list = await BookingManagement.find()
      .populate('SpecialityName','SpecialityName').sort({ createdAt: -1 }).exec();
      if (list.length === 0) {
        // If no entries found, send a response with appropriate message
        return res.json({ message: "No entries found." });
      }
      res.json(list);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };
//   exports.listBookingManagement = async (req, res) => {
//     try {
//         const { page, per_page, sorton, sortdir, match } = req.body;
//         console.log("req body", req.body);

//         let pipeline = [];

//         // Handle match parameter
//         if (match) {
//             pipeline.push({
//                 $lookup: {
//                     from: "SpecialityManagement", // Assuming this is the name of the collection storing SpecialityManagement documents
//                     localField: "SpecialityName",
//                     foreignField: "_id",
//                     as: "speciality"
//                 }
//             });
//             pipeline.push({
//                 $match: {
//                     "speciality._id": { $regex: match, $options: "i" }
//                 }
//             });
//         }
//         pipeline.push({
//           $addFields: {
//               "PopulatedSpecialityName": {
//                   $arrayElemAt: ["$speciality.SpecialityName", 0]
//               }
//           }
//       });
//         // Handle sorton and sortdir parameters
//         let sort = {};
//         if (sorton && sortdir) {
//             sort[sorton] = sortdir === "desc" ? -1 : 1;
//         } else {
//             // Default sorting if no sort parameters provided
//             sort = { createdAt: -1 }; // Assuming default sorting by createdAt
//         }
//         pipeline.push({ $sort: sort });

//         let skip = 0;
//         if (page !== undefined && per_page !== undefined) {
//             skip = (page - 1) * per_page;
//             pipeline.push({ $skip: skip });
//             pipeline.push({ $limit: per_page });
//         }

//         const list = (await BookingManagement.aggregate(pipeline))
        
//         res.json(list);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// exports.listBookingManagement = async (req, res) => {
//   try {
//       const { page, per_page, sorton, sortdir, match } = req.body;
//       console.log("req body", req.body);

//       let pipeline = [];

//       // Handle match parameter
//       if (match) {
//           pipeline.push({
//               $match: {
//                   $or: [
//                       { Name: { $regex: match, $options: "i" } },
//                       // Add more fields if needed for matching
//                   ],
//               },
//           });
//       }

//       // Handle sorton and sortdir parameters
//       let sort = {};
//       if (sorton && sortdir) {
//           sort[sorton] = sortdir === "desc" ? -1 : 1;
//       } else {
//           // Default sorting if no sort parameters provided
//           sort = { createdAt: -1 }; // Assuming default sorting by createdAt
//       }
//       pipeline.push({ $sort: sort });

//       // Paginate results
//       let skip = 0;
//       if (page !== undefined && per_page !== undefined) {
//           skip = (page - 1) * per_page;
//           pipeline.push({ $skip: skip });
//           pipeline.push({ $limit: per_page });
//       }

//       const specialities = await BookingManagement.aggregate(pipeline);

//       // Populate the SpecialityName field
//       const populatedList = await BookingManagement.populate(specialities, [
//           { path: 'SpecialityName', select: 'SpecialityName' },
//       ]);

//       res.json(populatedList);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };
exports.getAllBookings= async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
      fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
    }
      const bookingIds = await BookingManagement.find();
      console.log("specialites backenddd DoctorManagement management",bookingIds);

      // Send the bookingIds as a response
      res.json(bookingIds);
  } catch (error) {
      // Handle any errors
      console.error('Error fetching booking IDs:', error);
      res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
  }
};

// exports.listBookingManagement = async (req, res) => {
//   try {
//       let { skip, per_page, sorton, sortdir, match } = req.body;
//       // const { id } = req.params;

//       let query = [
//           {
//               $facet: {
//                   stage1: [
//                       {
//                           $group: {
//                               _id: null,
//                               count: {
//                                   $sum: 1,
//                               },
//                           },
//                       },
//                   ],
//                   stage2: [
//                       {
//                           $skip: skip,
//                       },
//                       {
//                           $limit: per_page,
//                       },
//                   ],
//               },
//           },
//           {
//               $unwind: {
//                   path: "$stage1",
//               },
//           },
//           {
//               $project: {
//                   count: "$stage1.count",
//                   data: "$stage2",
//               },
//           },
//       ];

//       if (match) {
//           query = [
//               {
//                   $match: {
//                       $or: [
//                           {
//                               Name: { $regex: match, $options: "i" },
//                           },{
//                             DoctorName: { $regex: match, $options: "i" },
//                           }, {
//                             LabelSpecialityName: { $regex: match, $options: "i" },
//                           },
//                       ],
//                   },
//               },
//           ].concat(query);
//       }

//       if (sorton && sortdir) {
//           let sort = {};
//           sort[sorton] = sortdir == "desc" ? -1 : 1;
//           query = [
//               {
//                   $sort: sort,
//               },
//           ].concat(query);
//       } else {
//           let sort = {};
//           sort["BookingNo"] = -1;
//           query = [
//               {
//                   $sort: sort,
//               },
//           ].concat(query);
//       }

//       const list = await BookingManagement.aggregate(query);
//       if (list.length === 0) {
//         // If no entries found, send a response with appropriate message
//         return res.json({ message: "No entries found." });
//       }
// console.log(list)
//       // Populate the SpecialityName field
//       const populatedList = await BookingManagement.populate(list, [
//         { path: 'SpecialityName', model: SpecialityManagement },
//       ]);

//       res.json(list);
//   } catch (error) {
//       res.status(500).send(error);
//   }
// };
exports.listBookingManagement = async (req, res) => {
  try {
    let { skip, per_page, sorton, sortdir, match } = req.body;

    let query = [
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
              $skip: skip,
            },
            {
              $limit: per_page,
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$stage1",
        },
      },
      {
        $project: {
          count: "$stage1.count",
          data: "$stage2",
        },
      },
    ];

    if (match) {
      query = [
        {
          $match: {
            $or: [
              { Name: { $regex: match, $options: "i" } },
              { DoctorName: { $regex: match, $options: "i" } },
              { LabelSpecialityName: { $regex: match, $options: "i" } },
            ],
          },
        },
      ].concat(query);
    }

    // Always sort by BookingNo in descending order
    let sort = { BookingNo: -1 };

    query = [{ $sort: sort }].concat(query);

    const list = await BookingManagement.aggregate(query);

    if (list.length === 0) {
      return res.json({ message: "No entries found." });
    }

    // Populate the SpecialityName field
    const populatedList = await BookingManagement.populate(list, [
      { path: 'SpecialityName', model: SpecialityManagement },
    ]);

    res.json(populatedList);
  } catch (error) {
    res.status(500).send(error);
  }
};



  exports.removeBookingManagement = async (req, res) => {
    try {
      const delTL = await BookingManagement.findOneAndRemove({
        _id: req.params._id,
      });
      res.json(delTL);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  exports.updateBookingManagement = async (req, res) => {
    try {
      let {
        BookingDate, Email, Phone, Name, LabelSpecialityName, SpecialityName, Alloted, DoctorName, AllotmentDate, AllotmentTime
      } = req.body;
  
      let selectedDate = new Date(BookingDate);
      selectedDate.setDate(selectedDate.getDate() + 1);
      BookingDate = selectedDate;
  
      if (AllotmentDate !== undefined) { // Check if AllotmentDate is not empty
        console.log('Allotment date', AllotmentDate)
        let selectedAllotmentDate = new Date(AllotmentDate);
        selectedAllotmentDate.setDate(selectedAllotmentDate.getDate() + 1);
        AllotmentDate = selectedAllotmentDate;
      }
  
      const updatedBookingManagement = await BookingManagement.findByIdAndUpdate(
        req.params._id,
        { BookingDate, Email, Phone, Name, LabelSpecialityName, SpecialityName, Alloted, DoctorName, AllotmentDate, AllotmentTime },
        { new: true }
      );
  
      if (!updatedBookingManagement) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      return res.json({ success: true, data: updatedBookingManagement });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
