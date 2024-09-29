const { log } = require("console");
// const booking = require("../../models/Booking/Booking");
const InquiryManagement =require("../../models/InquiryManagement/InquiryManagement");
const nodemailer = require('nodemailer');
const fs = require("fs");
exports.createInquiryManagement = async (req, res) => {
    try {
    
      let {
        Name, Email, Phone, Subject,Message,InquiryDate
      } = req.body;
     console.log("Body",req.body);
    //   console.log("Speciality isss", SpecialityName);
    //   console.log("Speciality isss", BookingNo);
      console.log("thisi s", req.body);
      
    //   let selectedDate = new Date(BookingDate);
    
      // Add 1 day to the selected date
    //   selectedDate.setDate(selectedDate.getDate() + 1);
    //   BookingDate = selectedDate;
  
      // let selectedAllotmentDate = new Date(AllotmentDate);
      // selectedAllotmentDate.setDate(selectedAllotmentDate.getDate() + 1);
      // AllotmentDate = selectedAllotmentDate;
  
      const newInquiry = new InquiryManagement({ Name, Email,Phone,Subject,Message,InquiryDate });
      const savedInquiry = await newInquiry.save();
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'marwiz.tech@gmail.com',
          pass: 'abuoxineboamaqkm',
        },
      });
      const htmlContent = `
<div bgcolor="#FFFFFF" marginwidth="0" marginheight="0">
    <table width="900" border="5" align="center" cellpadding="0" cellspacing="0" style="border-color: #0a0f4e; padding: 10px">
        <tr>
            <td>
                <table width="900" style="padding: 5px">
                    <tbody>
                        <tr>
                            <td style="width: 200px;">
                                <img src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/hxcm9oqhvui25zspusoy" alt="Your Logo" style="max-width: 150px;">
                            </td>
                            <td style="width: 700px; text-align: right;">
                                <h5 style="font-size: 15px;">Date: ${new Date().toLocaleDateString()}</h5>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h2>Inquiry Details</h2>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <td>${Name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>${Email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>${Phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Subject</th>
                                        <td>${Subject}</td>
                                    </tr>
                                    <tr>
                                        <th>Message</th>
                                        <td>${Message}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                Sheldon Medical Care
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <span style="font-size: 11px; color: #0a0f4e">
                                    <b>Please do not reply to this email address as this is an automated email.</b>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>
</div>`;
    const htmlContent1 = `
    <div bgcolor="#FFFFFF" marginwidth="0" marginheight="0">
    <table width="900" border="5" align="center" cellpadding="0" cellspacing="0" style="border-color: #0a0f4e; padding: 10px">
        <tr>
            <td>
                <table width="900" style="padding: 5px">
                    <tbody>
                        <tr>
                            <td style="width: 200px;">
                                <img src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/hxcm9oqhvui25zspusoy" alt="Your Logo" style="max-width: 150px;">
                            </td>
                            <td style="width: 700px; text-align: right;">
                                <h5 style="font-size: 15px;">Date: ${new Date().toLocaleDateString()}</h5>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h2>Acknowledgement of inquiry</h2>
                            </td>
                        </tr>
                      
                      
                        <tr>
                            <td colspan="2">
                                <span style="font-size: 11px; color: #0a0f4e">
                                Hello ${Name},Thank you for your inquiry. We will get back to you soon.\n\nBest regards,\nThe Admin
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>
</div>`;

  
      // Compose email options
      const mailOptions = {
        from: Email,
        to: 'dhruvshah.bweb@gmail.com',
        subject: Subject,
        text: Message,
        html:htmlContent
      };
  
      // Send the email
      const info = await transporter.sendMail(mailOptions);
  
      console.log('Email sent:', info.response);
      const mailOptions1 = {
        from: 'dhruvshah.bweb@gmail.com',
        to: Email,
        subject: 'Inquiry Received',
        text: `Hello ${Name},Thank you for your inquiry. We will get back to you soon.\n\nBest regards,\nThe Admin`,
        html:htmlContent1
      };
  
      await transporter.sendMail(mailOptions1);
      console.log('Acknowledgment email sent successfully!');
      return res.json({ success: true, data: savedInquiry });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };
//   exports.getInquiries= async (req, res) => {
//     try {
//       if (!fs.existsSync(`${__basedir}/uploads/serviceImages`)) {
//         fs.mkdirSync(`${__basedir}/uploads/serviceImages`);
//       }
//         const inquiries = await InquiryManagement.find();
//         console.log("Inquiries backenddd DoctorManagement management",inquiries);
//         console.log("all lists inquiriries",inquiries);
  
//         // Send the bookingIds as a response
//         res.json(inquiries);
//     } catch (error) {
//         // Handle any errors
//         console.error('Error fetching booking IDs:', error);
//         res.status(500).json({ error: 'An error occurred while fetching booking IDs' });
//     }
//   };
exports.listInquiries = async (req, res) => {
    try {
        let { skip, per_page, sorton, sortdir, match } = req.body;
        // const { id } = req.params;
  
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
                                Name: { $regex: match, $options: "i" },
                            },{
                              DoctorName: { $regex: match, $options: "i" },
                            }, {
                              LabelSpecialityName: { $regex: match, $options: "i" },
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
  
        const list = await InquiryManagement.aggregate(query);
        if (list.length === 0) {
          // If no entries found, send a response with appropriate message
          return res.json({ message: "No entries found." });
        }
  console.log(list)
        // Populate the SpecialityName field
       
  
        res.json(list);
    } catch (error) {
        res.status(500).send(error);
    }
  };
  