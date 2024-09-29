const CompanyAddress = require("../../models/CompanyAdress/CompanyAddress");

exports.getCompanyAddressbyId = async (req, res) => {
  try {
    const find = await CompanyAddress.findOne({ _id: req.params._id }).exec();
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};
exports.getCompanyAddresses= async (req, res) => {
    try {
      const find = await CompanyAddress.find().exec();
      res.json(find);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

exports.createCompanyAddress = async (req, res) => {
  try {
    console.log("req.bodydyd",req.body);
    const {CompanyLocation}=req.body;
    console.log("cookmppmompm",CompanyAddress);
    const add = await new CompanyAddress({
     CompanyAddress:CompanyLocation
    }).save();
    res.json(add);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
exports.updateCompanyAddress = async (req, res) => {
    try {
        console.log("req.bodydyd",req.body);
    const {CompanyLocation}=req.body;
    console.log("updatfetyeft",req.params._id);
      const update = await CompanyAddress.findByIdAndUpdate(req.params._id,
       {
        CompanyAddress:CompanyLocation
       }, {
        new: true,
      }
      );
      res.json(update);
    } catch (err) {
     console.log(err);
      res.status(400).send(err);
    }
  };
exports.listAddressByParams= async (req, res) => {
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
                  CompanyAddress: { $regex: match, $options: "i" },
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
  
      const list = await CompanyAddress.aggregate(query);
  
      res.json(list);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  exports.removeCompanyAddress = async (req, res) => {
    try {
      console.log("erererer",req.params.id);
      const delTL = await CompanyAddress.findByIdAndDelete(req.params.id);
      res.json(delTL);
    } catch (err) {
      console.log("ererererer",err);
      res.status(400).send(err);
    }
  };