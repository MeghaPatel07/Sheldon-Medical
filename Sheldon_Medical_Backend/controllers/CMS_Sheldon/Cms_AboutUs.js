const Cms_AboutUs = require('../../models/CMS_Sheldon/Cms_AboutUs'); // Assuming your schema file is named 'Cms.js'
const fs = require("fs");
 

exports.createCmsAboutUs = async (req, res) => {
  try {
    const { AboutUsDetail } = req.body;

    // Create a new instance of your CMS model
    const newCmsContent = new Cms({
      AboutUsDetail,
     
    });

    // Save the new CMS content to the database
    await newCmsContent.save();

    res.status(201).json({ message: 'CMS content created successfully', cmsContent: newCmsContent });
  } catch (error) {
    console.error('Error in creating CMS content:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.editCmsAboutUsContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { AboutUsDetail } = req.body;

    let cmsAboutUsContent = await Cms_AboutUs.findById(id);

    if (!cmsAboutUsContent) {
      return res.status(404).json({ message: 'About Us content not found' });
    }

    cmsAboutUsContent.AboutUsDetail = AboutUsDetail;

    await cmsAboutUsContent.save();

    res.status(200).json({ message: 'About Us content updated successfully', cmsAboutUsContent });
  } catch (error) {
    console.error('Error in editing About Us content:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.getCmsAboutUsById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the About Us content by ID
    const cmsAboutUsContent = await Cms_AboutUs.findById(id);

    if (!cmsAboutUsContent) {
      return res.status(404).json({ message: 'About Us content not found' });
    }

    res.status(200).json({ cmsAboutUsContent });
  } catch (error) {
    console.error('Error in getting About Us content:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.getCmsAboutus= async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
      fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
    }
      const cmsaboutus = await Cms_AboutUs.find();
      console.log("doctors backenddd DoctorManagement management",cmsaboutus);

      // Send the bookingIds as a response
      res.json(cmsaboutus);
  } catch (error) {
      // Handle any errors
      console.error('Error fetching booking IDs:', error);
      res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
  }
};

