const { log } = require("console");
const doctor = require("../../models/Doctor/Doctors");
const fs = require("fs");

exports.createDoctor = async (req, res) => {
    try {
      if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
        fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
      }
  
      let {
        speciality,docname,detail,where,when,docimg
      } = req.body;
      // const uploadFile = req.file.path;
      console.log("imagepath",docimg);
      const add = await new doctor({
        speciality: speciality,
        name: docname,
        detail: detail,
        where: where,
        when:when,
        docimg:uploadFile
      }).save();
      res.status(200).json({ isOk: true, data: add, message: "insserted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };