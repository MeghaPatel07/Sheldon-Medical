const Cms_ContactUsDetail = require('../../models/CMS_Sheldon/Cms_ContactDetail'); // Assuming your schema file is named 'Cms.js'

exports.createCmsContactUs = async (req, res) => {
  try {
    const { ContactUsDetail } = req.body;

    // Create a new instance of your CMS model
    const newCmsContent = new Cms({
        ContactUsDetail,
     
    });

    // Save the new CMS content to the database
    await newCmsContent.save();

    res.status(201).json({ message: 'CMS content created successfully', cmsContent: newCmsContent });
  } catch (error) {
    console.error('Error in creating CMS content:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.editCmsContactUsDetailContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { ContactUsDetail } = req.body;

    let cmsContactUsDetailContent = await Cms_ContactUsDetail.findById(id);

    if (!cmsContactUsDetailContent) {
      return res.status(404).json({ message: 'Contact Us Detail content not found' });
    }

    cmsContactUsDetailContent.ContactUsDetail = ContactUsDetail;

    await cmsContactUsDetailContent.save();

    res.status(200).json({ message: 'Contact Us Detail content updated successfully', cmsContactUsDetailContent });
  } catch (error) {
    console.error('Error in editing Contact Us Detail content:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCmsContactUsDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Contact Us Detail content by ID
    const cmsContactUsDetailContent = await Cms_ContactUsDetail.findById(id);

    if (!cmsContactUsDetailContent) {
      return res.status(404).json({ message: 'Contact Us Detail content not found' });
    }

    res.status(200).json({ cmsContactUsDetailContent });
  } catch (error) {
    console.error('Error in getting Contact Us Detail content:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.getCmsContactUs= async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
      fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
    }
      const cmscontactus = await Cms_ContactUsDetail.find();
      console.log("doctors backenddd DoctorManagement management",cmscontactus);

      // Send the bookingIds as a response
      res.json(cmscontactus);
  } catch (error) {
      // Handle any errors
      console.error('Error fetching booking IDs:', error);
      res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
  }
};