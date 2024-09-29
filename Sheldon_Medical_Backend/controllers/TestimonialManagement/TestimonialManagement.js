// const User = require("../../../models/Auth/User/AdminUsers");
const path = require('path');
const fs = require("fs");
const TestimonialManagement = require("../../models/TestimonialManagement/TestimonialManagement");
exports.createTestimonial = async (req, res) => {
    try {
      const uploadDir = path.join(__basedir, 'uploads', 'TestimonialManagement');
  
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      
      const { ClientName,Testimonial } = req.body;
      // const photo = req.file ? req.file.P : null;
       console.log("ggedgsrgegwefwg",req.file);
    
        let profilePhotoPath = null;
        if (req.file) {
          profilePhotoPath = req.file.path;
          console.log("few3rfafada",profilePhotoPath);
          // fs.renameSync(req.file.path, profilePhotoPath);
        }
        
            else{
            console.log("no imgggggw");
        }
  
        const newUser = new TestimonialManagement({
        ClientName,
        Testimonial ,
        ClientImage: profilePhotoPath,
        });
  
        const savedUser = await newUser.save();
        return res.status(200).json({
          isOk: true,
          data: savedUser,
        });
      
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        msg: 'We are updating',
        data: {
          datetime: new Date().toISOString(),
          message: err.message,
          stack: err.stack,
        },
      });
    }
  };
  exports.updateTestimonial = async (req, res) => {
    try {
      const uploadDir = path.join(__basedir, 'uploads', 'TestimonialManagement');
  
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      let profilePhotoPath = null;
      if (req.file) {
        profilePhotoPath = req.file.path;
        // fs.renameSync(req.file.path, profilePhotoPath);
      }
      let _id=req.params._id;
  
      const { ClientName,Testimonial } = req.body;
      const update = await TestimonialManagement.findByIdAndUpdate(
        _id,
        {
            ClientName:ClientName,
            Testimonial:Testimonial,
          ClientImage:profilePhotoPath,
  
  
        },
        { new: true }
      );
      res.json(update);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  exports.removeTestimonial= async (req, res) => {
    try {
      const del = await TestimonialManagement.findOneAndRemove({
        _id: req.params._id,
      });
      res.json(del);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  exports.listTestmonialByParams = async (req, res) => {
    try {
      let { skip, per_page, sorton, sortdir, match, IsActive } = req.body;
  
      let query = [
        {
          $match: { IsActive: IsActive },
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
                  ClientName: { $regex: match, $options: "i" },
                },
                {
                  Testimonial: { $regex: match, $options: "i" },
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
  
      const list = await TestimonialManagement.aggregate(query);
  
      res.json(list);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
  exports.listTestimonial = async (req, res) => {
    try {
      const list = await TestimonialManagement.find().sort({ createdAt: -1 }).exec();
      res.json(list);
    } catch (error) {
      return res.status(400).send(error);
    }
  };
  exports.getTestimonialById = async (req, res) => {
    try {
      const find = await TestimonialManagement.findOne({ _id: req.params._id }).exec();
      res.json(find);
    } catch (error) {
      return res.status(500).send(error);
    }
  };