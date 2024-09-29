const ServiceManagement = require("../../models/ServiceManagement/ServiceManagement");
const fs = require("fs");
exports.getServiceManagement = async (req, res) => {
  try {
    const find = await ServiceManagement.findOne({ _id: req.params._id }).exec();
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.createServiceManagement = async (req, res) => {
    try {
      if (!fs.existsSync(`${__basedir}/uploads/newServiceManagament`)) {
        fs.mkdirSync(`${__basedir}/uploads/newServiceManagament`);
      }
      // Extract data from request body
      console.log("Thus us",req.files['UploadIcon'])
      let uploadIcon = req.files['UploadIcon'] ? `uploads/newServiceManagament/${req.files['UploadIcon'][0].filename}` : null;
      console.log(uploadIcon);
      let uploadHomeIcon = req.files['UploadHomeIcon'] ? `uploads/newServiceManagament/${req.files['UploadHomeIcon'][0].filename}` : null;
      const { ServiceName, Detail,Thumbnail} = req.body;
      console.log("trt3r3rr",Thumbnail);
      // Create a new instance of SpecialityManagement model
      const newService = new ServiceManagement({
        ServiceName,
        Thumbnail,
        Detail,
        UploadIcon:uploadIcon,
        UploadHomeIcon:uploadHomeIcon
      });
  
      // Save the new instance to the database
      const savedServiceManagement = await newService.save();
  
      // Send success response
      res.status(201).json({
        success: true,
        message: "ServiceManagement entry created successfully",
        data: savedServiceManagement
      });
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

  // exports.listSpecialityManagement = async (req, res) => {
  //   try {
  //     const list = await ServiceManagement.find().sort({ createdAt: -1 }).exec();
  //     res.json(list);
  //   } catch (error) {
  //     return res.status(400).send(error);
  //   }
  // };
  exports.listServiceManagement = async (req, res) => {
    try {
      const { page, per_page, sorton, sortdir, match } = req.body;
      console.log("req body", req.body);
  
      let pipeline = [];
  
      // Handle match parameter
      if (match) {
        pipeline.push({
          $match: {
            $or: [
              { ServiceName: { $regex: match, $options: "i" } },
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
  
      const specialities = await ServiceManagement.aggregate(pipeline);
      res.json(specialities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // exports.updateSpecialityManagement = async (req, res) => {
  //   try {
  //     const update = await ServiceManagement.findOneAndUpdate(
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
      const id = req.params;
      console.log("hchjchjch", req.params);
      console.log("trt3r3rr",req.body);
      const updates = req.body;
      const product = await ServiceManagement.findByIdAndUpdate(id, updates, {
        new: true,
      });
  
      if (!product) {
        return res.status(404).json({ isOk: false, error: " not found" });
      }
  
      // Update UploadIcon if new file is uploaded
      if (req.files["UploadIcon"]) {
        const newUploadIconPath = `uploads/newServiceManagament/${req.files['UploadIcon'][0].filename}`;
        if (product.UploadIcon && fs.existsSync(product.UploadIcon)) {
          fs.unlinkSync(product.UploadIcon);
        }
        product.UploadIcon = newUploadIconPath;
      }
  
      // Update UploadHomeIcon if new file is uploaded
      if (req.files["UploadHomeIcon"]) {
        const newUploadHomeIconPath = `uploads/newServiceManagament/${req.files['UploadHomeIcon'][0].filename}`;
        if (product.UploadHomeIcon && fs.existsSync(product.UploadHomeIcon)) {
          fs.unlinkSync(product.UploadHomeIcon);
        }
        product.UploadHomeIcon = newUploadHomeIconPath;
      }
  
      // Save the updated product document
      await product.save();
  
      res.status(200).json({ isOk: true, product });
  
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  exports.removeSpecialityManagement = async (req, res) => {
    try {
      const delTL = await ServiceManagement.findOneAndRemove({
        _id: req.params._id,
      });
      res.json(delTL);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  exports.listNewServicebyParams = async (req, res) => {
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
                  ServiceName: { $regex: match, $options: "i" },
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
  
      const list = await ServiceManagement.aggregate(query);
  
      res.json(list);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  exports.getServices= async (req, res) => {
    try {
      if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
        fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
      }
        const services = await ServiceManagement.find();
        console.log("doctors backenddd DoctorManagement management",services);
  
        // Send the bookingIds as a response
        res.json(services);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching booking IDs:', error);
        res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
    }
  };