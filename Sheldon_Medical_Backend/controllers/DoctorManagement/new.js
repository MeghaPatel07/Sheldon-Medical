exports.listProjectDetailByParams = async (req, res) => {
    try {
      let { skip, per_page, sorton, sortdir, match, IsActive } = req.body;
      console.log("Received skip:", skip);
      console.log("Received per_page:", per_page);
      console.log("Received IsActive:", IsActive);
  
      // if (!skip || !per_page || !IsActive) {
      //   return res.status(400).send("Skip, per_page, and IsActive are required");
      // }
  
      let query = [
        {
          $match: { IsActive: IsActive },
        },
        {
          $lookup: {
            from: "areatypeschemas",
            localField: "types",
            foreignField: "_id",
            as: "areas",
          },
        },
        {
          $unwind: {
            path: "$areas",
            preserveNullAndEmptyArrays: true,
          },
        },
        // {
        //   $set: {
        //     typeName: "$areaTypeDetails.types",
        //   },
        // },
        {
          $match: {
            $or: [
              {
                "areas.types": new RegExp(match, "i"),
              },
              {
                title: new RegExp(match, "i"),
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
  
      // if (match) {
      //   query.push({
      //     $match: {
      //       $or: [
      //         {
      //           "areaTypeDetails.types": { $regex: match, $options: "i" },
      //         },
      //         {
      //           title: { $regex: match, $options: "i" },
      //         },
      //       ],
      //     },
      //   });
      // }
  
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
  
      const list = await ProjectDetailSchema.aggregate(query);
      res.json(list);
    } catch (error) {
      console.error("Error in listProjectDetailByParams:", error);
      res.status(500).send("Internal Server Error");
    }
  };