const User = require("../../../models/Auth/User/AdminUsers");
const path = require('path');
const fs = require("fs");

exports.getAdminUser = async (req, res) => {
  try {
    const find = await User.findOne({ _id: req.params._id }).exec();
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};
exports.getAdminUserall = async (req, res) => {
  try {
    const find = await User.find().exec();
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.createAdminUser = async (req, res) => {
  try {
    const uploadDir = path.join(__basedir, 'uploads', 'userImages');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const emailExists = await User.findOne({ email: req.body.email }).exec();
    const { firstName, lastName, email, password, IsActive } = req.body;
    // const photo = req.file ? req.file.P : null;
     console.log(req.file);
    if (emailExists) {
      return res.status(200).json({
        isOk: false,
        message: 'Email already exists',
      });
    } else {
      let profilePhotoPath = null;
      if (req.file) {
        profilePhotoPath = req.file.path;
        // fs.renameSync(req.file.path, profilePhotoPath);
      }

      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        ProfilePhoto: profilePhotoPath,
        IsActive,
      });

      const savedUser = await newUser.save();
      return res.status(200).json({
        isOk: true,
        data: savedUser,
      });
    }
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

exports.listAdminUser = async (req, res) => {
  try {
    const list = await User.find().sort({ createdAt: -1 }).exec();
    res.json(list);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.listAdminUserByParams = async (req, res) => {
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
                firstName: { $regex: match, $options: "i" },
              },
              {
                lastName: { $regex: match, $options: "i" },
              },
              {
                email: { $regex: match, $options: "i" },
              },
              {
                password: { $regex: match, $options: "i" },
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

    const list = await User.aggregate(query);

    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.updateAdminUser = async (req, res) => {
  try {
    const uploadDir = path.join(__basedir, 'uploads', 'userImages');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    let profilePhotoPath = null;
    if (req.file) {
      profilePhotoPath = req.file.path;
      // fs.renameSync(req.file.path, profilePhotoPath);
    }
    let _id=req.params._id;

    const { firstName, lastName, email, password, IsActive } = req.body;
    const update = await User.findByIdAndUpdate(
      _id,
      {
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password,
        ProfilePhoto:profilePhotoPath,
        IsActive:IsActive,


      },
      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.removeAdminUser = async (req, res) => {
  try {
    const del = await User.findOneAndRemove({
      _id: req.params._id,
    });
    res.json(del);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.userLoginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usermp = await User.findOne({ email: email }).exec();
    if (usermp) {
      if (usermp.password !== password) {
        return res.status(200).json({
          isOk: false,
          filed: 1,
          message: "Authentication Failed",
        });
      } else {
        res.status(200).json({
          isOk: true,
          message: "Authentication Successfull",
          data: usermp,
        });
      }
    } else {
      res.status(200).json({
        isOk: false,
        message: "Admin User not Found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(200).json({
      isOk: false,
      message: "An error occurred while logging in adminpanel",
    });
  }
};
exports.updatePassword = async (req, res) => {
  const user = await User.findById(req.body.id);
  const { oldPassword, newPassword, id } = req.body;

  if (!user) {
    return res.send({
      success: false,
      msg: "Person not found, please sign up",
    });
  }

  // Validate
  if (!oldPassword || !newPassword) {
    return res.send({ success: false, msg: "Please add old and new password" });
  }

  // Compare plain text passwords
  if (oldPassword !== user.password) {
    return res.send({ success: false, msg: "Old password is incorrect" });
  }

  if (oldPassword === newPassword) {
    return res.send({
      success: false,
      msg: "New Password cannot be the same as the Old password",
    });
  } else {
    // Update password as plain text
    await User.findByIdAndUpdate(id, {
      password: newPassword,
    });

    return res.send({ success: true, msg: "Password changed successfully" });
  }
};
