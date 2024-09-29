const { log } = require("console");
// const booking = require("../../models/Booking/Booking");
const BookingManagement =require("../../models/BookingManagement/BookingManagement");
const BookingAllotment =require("../../models/BookingAllotment/BookingAllotment")
const fs = require("fs");
const SpecialityManagement = require("../../models/SpecialityManagement/SpecialityManagement");

exports.createBookingAllotment = async (req, res) => {
  console.log(req.body)
    try {
    
      let {
        DoctorName,
        AllotedId,
        AllotmentDate:dateStr,
        AllotmentTime
       
      } = req.body;
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid date format' });
      }
      // console.log("Speciality isss",SpecialityName);
      const newBookingAllotment = new BookingAllotment({ DoctorName,AllotedId ,AllotmentDate:date,AllotmentTime });
      const savedBookingAllotment = await newBookingAllotment.save();
      return res.json({success : true , data : savedBookingAllotment});
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };

  exports.getBookingAllotment= async (req, res) => {
    try {
        // Fetch only the _id field from all bookings
        const find = await BookingAllotment.findOne({ _id: req.params._id })
        
        .exec();
        // console.log("specialites backenddd",bookingIds);
res.json(find);
        // Send the bookingIds as a response


        // res.json(bookingIds);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching booking IDs:', error);
        res.status(500).json({ error: 'An error occurred while fetching Allotments for Booking ' });
    }
   
  };


  exports.listBookingAllotment = async (req, res) => {
    try {
      const list = await BookingAllotment.find().sort({ createdAt: -1 }).exec();
      res.json(list);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };

  exports.listNewBookingAllotmentbyParams = async (req, res) => {
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
                {
                  solarrooftype: { $regex: match, $options: "i" },
                },
              ],
            },
          },
        ].concat(query);
      }
  
      if (sorton && sortdir) {
        let sort = {};
        sort[sorton] = sortdir == "desc" ? -1 : 1;
        query = [
          {
            $sort: sort,
          },
        ].concat(query);
      } else {
        let sort = {};
        sort["createdAt"] = -1;
        query = [
          {
            $sort: sort,
          },
        ].concat(query);
      }
  
      const list = await BookingAllotment.aggregate(query);
  
      res.json(list);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  exports.removeBookingAllotment = async (req, res) => {
    try {
      const delTL = await BookingAllotment.findOneAndRemove({
        _id: req.params._id,
      });
      res.json(delTL);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  exports.updateBookingAllotment = async (req, res) => {
    try {
      // const  id  = req.params.id;
      let {
        DoctorName,
        AllotedId,
        AllotmentDate,
        AllotmentTime
      } = req.body;
  
      const updatedBookingAllotement= await BookingAllotment.findByIdAndUpdate(
        req.params._id,
        {
         
          DoctorName, AllotedId,
          AllotmentDate,
          AllotmentTime
        },
        { new: true }
      );
  
      if (!updatedBookingAllotement) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
       return res.json({success:true, data : updatedBookingAllotement});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };