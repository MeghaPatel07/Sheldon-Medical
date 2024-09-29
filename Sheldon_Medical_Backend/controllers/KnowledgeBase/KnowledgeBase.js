const KnowledgeBase = require("../../models/KnowledgeBase/KnowledgeBase");
const fs = require("fs");
exports.getKnowledgeBaseManagement = async (req, res) => {
  try {
    const find = await KnowledgeBase.findOne({ _id: req.params._id }).exec();
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.createKnowledgeBaseManagement = async (req, res) => {
    try {
      if (!fs.existsSync(`${__basedir}/uploads/newKnowledgeBase`)) {
        fs.mkdirSync(`${__basedir}/uploads/newKnowledgeBase`);
      }
      let uploadFile = req.file
      ? `uploads/newKnowledgeBase/${req.file.filename}`
:null;
  
      console.log(uploadFile);
      
      // Extract data from request body
      const { Title, Detail } = req.body;
  
      // Create a new instance of SpecialityManagement model
      const newKnowledgeBase = new KnowledgeBase({
        Title,
        Detail,
        UploadFile:uploadFile
      });
  
      // Save the new instance to the database
      const savedSpeciality = await newKnowledgeBase.save();
  
      // Send success response
      res.status(201).json({
        success: true,
        message: "KnowledgeBase entry created successfully",
        data: savedSpeciality
      });
    } catch (error) {
      // Handle errors
      console.error("Error creating KnowledgeBase entry:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create KnowledgeBase entry",
        error: error.message
      });
    }
  };

  exports.listonlyKnowledgeBaseManagement = async (req, res) => {
    try {
      const list = await KnowledgeBase.find().sort({ createdAt: -1 }).exec();
      res.json(list);
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  exports.updateKnowledgeBaseManagement = async (req, res) => {
    try {
      const id = req.params;
      console.log("hchjchjch", req.params);
      const updates = req.body;
      const product = await KnowledgeBase.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!product) {
        return res.status(404).json({ isOk: false, error: " not found" });
      }
      // Remove old files if new files are uploaded
      if (req.file) {
        fs.unlinkSync(product.UploadFile);
        product.UploadFile = `uploads/newKnowledgeBase/${req.file.filename}`;
      }
      // if (req.files["UploadHomeIcon"]) {
      //   fs.unlinkSync(product.UploadHomeIcon);
      //   product.UploadHomeIcon = `uploads/newServiceManagament/${req.files['UploadHomeIcon'][0].filename}`;
      // }
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
  exports.listKnowledgeBaseManagement = async (req, res) => {
    try {
      const { page, per_page, sorton, sortdir, match } = req.body;
      console.log("req body", req.body);
  
      let pipeline = [];
  
      // Handle match parameter
      if (match) {
        pipeline.push({
          $match: {
            $or: [
              { Title: { $regex: match, $options: "i" } },
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
  
      const specialities = await KnowledgeBase.aggregate(pipeline);
      res.json(specialities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  exports.removeKnowledgeBaseManagement = async (req, res) => {
    try {
      const delTL = await KnowledgeBase.findOneAndRemove({
        _id: req.params._id,
      });
      res.json(delTL);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  exports.listNewKnowledgeBasebyParams = async (req, res) => {
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
                  Title: { $regex: match, $options: "i" },
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
  
      const list = await KnowledgeBase.aggregate(query);
  
      res.json(list);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  exports.getKnowldgeBase= async (req, res) => {
    try {
      if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
        fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
      }
        const knows = await KnowledgeBase.find();
        console.log("doctors backenddd DoctorManagement management",knows);
  
        // Send the bookingIds as a response
        res.json(knows);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching booking IDs:', error);
        res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
    }
  };