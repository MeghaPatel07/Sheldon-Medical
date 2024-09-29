const SpecialityManagement = require("../../models/SpecialityManagement/SpecialityManagement");
const BookingManagement =require("../../models/BookingManagement/BookingManagement");
const DoctorManagement =require("../../models/DoctorManagement/DoctorManagement");
const fs = require("fs");
exports.getSpecialityManagement = async (req, res) => {
  try {
    const find = await SpecialityManagement.findOne({ _id: req.params._id }).exec();
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};
 exports.listSpecialityManagement = async (req, res) => {
    try {
      const list = await SpecialityManagement.find().sort({ createdAt: -1 }).exec();
      res.json(list);
    } catch (error) {
      return res.status(400).send(error);
    }
  };

exports.createSpecialityManagement = async (req, res) => {
    try {
      if (!fs.existsSync(`${__basedir}/uploads/newProjectImages`)) {
        fs.mkdirSync(`${__basedir}/uploads/newProjectImages`);
      }
      console.log(req.body);
      // let uploadIcon = req.body.UploadIcon;
      // let uploadHomeIcon = req.body.UploadHomeIcon;
  // console.log("Hiii",req.file)
      // Adjust file paths based on uploaded files
      // let serviceIcon = req.file ? `uploads/newProjectImages/${req.file.filename}` : null;
      console.log("Thus us",req.files['UploadIcon'])
      let uploadIcon = req.files['UploadIcon'] ? `uploads/newProjectImages/${req.files['UploadIcon'][0].filename}` : null;
      console.log(uploadIcon);
      let uploadHomeIcon = req.files['UploadHomeIcon'] ? `uploads/newProjectImages/${req.files['UploadHomeIcon'][0].filename}` : null;
      
  
      // Extract data from request body
      const { SpecialityName,DoctorSpeciality,Detail,Location,BlockQuote } = req.body;
  
      // Create a new instance of ServiceManagement model
      const newService = await new SpecialityManagement({
        SpecialityName,
        DoctorSpeciality,
        Location,
        BlockQuote,
        Detail,
        UploadHomeIcon:uploadHomeIcon,
        UploadIcon:uploadIcon,
      }).save();
  
      res.status(200).json({ isOk: true, data: newService, message: "Service created successfully" });
  
    } catch (error) {
      // Handle errors
      console.error("Error creating ServiceManagement entry:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create ServiceManagement entry",
        error: error.message
      });
    }
  };

  exports.listSpecialityManagement = async (req, res) => {
    try {
      const { page, per_page, sorton, sortdir, match } = req.body;
      console.log("req body", req.body);
  
      let pipeline = [];
  
      // Handle match parameter
      if (match) {
        pipeline.push({
          $match: {
            $or: [
              { SpecialityName: { $regex: match, $options: "i" } },
              // Add more fields if needed for matching
            ],
          },
        });
      }
  
      // Handle sorton and sortdir parameters
      let sort = {};
      if (sorton && sortdir) {
        sort[sorton] = sortdir === "desc" ? -1 : 1;
      } else {
        // Default sorting if no sort parameters provided
        sort = { createdAt: -1 }; // Assuming default sorting by createdAt
      }
      pipeline.push({ $sort: sort });
  
      let skip = 0;
      if (page !== undefined && per_page !== undefined) {
        skip = (page - 1) * per_page;
        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: per_page });
      }
  
      const specialities = await SpecialityManagement.aggregate(pipeline);
      res.json(specialities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // exports.updateSpecialityManagement = async (req, res) => {
  //   try {
  //     const update = await SpecialityManagement.findOneAndUpdate(
  //       { _id: req.params._id },
  //       req.body,
  //       { new: true }
  //     );
  //     res.json(update);
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
  // };
  exports.updateSpecialityManagement = async (req, res) => {
    try {
      const id = req.params;  // Correctly accessing the id from req.params
      console.log("hchjchjch", req.params);
      const updates = req.body;
      const loc = req.body.BlockQuote;
      console.log("loccccc", loc);
  
      const product = await SpecialityManagement.findByIdAndUpdate(id, updates, { new: true });
      if (!product) {
        return res.status(404).json({ isOk: false, error: "Product not found" });
      }
  
      // Update UploadIcon if new file is uploaded
      if (req.files["UploadIcon"]) {
        const newUploadIconPath = `uploads/newProjectImages/${req.files['UploadIcon'][0].filename}`;
        if (product.UploadIcon && fs.existsSync(product.UploadIcon)) {
          fs.unlinkSync(product.UploadIcon);
        }
        product.UploadIcon = newUploadIconPath;
      }
  
      // Update UploadHomeIcon if new file is uploaded
      if (req.files["UploadHomeIcon"]) {
        const newUploadHomeIconPath = `uploads/newProjectImages/${req.files['UploadHomeIcon'][0].filename}`;
        if (product.UploadHomeIcon && fs.existsSync(product.UploadHomeIcon)) {
          fs.unlinkSync(product.UploadHomeIcon);
        }
        product.UploadHomeIcon = newUploadHomeIconPath;
      }
  
      // Save the updated product document
      await product.save();
  
      res.status(200).json({
        isOk: true,
        data: product,
        message: "Product updated successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ isOk: false, error: "Internal server error" });
    }
  };
  
  
  exports.removeSpecialityManagement = async (req, res) => {
    try {
      
      const delTL = await SpecialityManagement.findOneAndRemove({
        _id: req.params._id,
      });
      res.json(delTL);
      await BookingManagement.deleteMany({ SpecialityName: req.params._id });
      await DoctorManagement.deleteMany({ SpecialityName: req.params._id });
    } catch (err) {
      res.status(400).send(err);
    }
  };
  exports.listNewSpecialitybyParams = async (req, res) => {
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
                  SpecialityName: { $regex: match, $options: "i" },
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
  
      const list = await SpecialityManagement.aggregate(query);
  
      res.json(list);
    } catch (error) {
      res.status(500).send(error);
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