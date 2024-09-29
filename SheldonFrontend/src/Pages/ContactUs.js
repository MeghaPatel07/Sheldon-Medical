import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import BackToTopButton from "../Components/Arrow";
const initialFormData = {
  Name: "",
  Email: "",
  Phone: "",
  Subject: "",
  Message: "",
  InquiryDate: "",
};
export default function Contact() {
  const [faxNumbers, setFaxNumbers] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [addressItems, setAddressItems] = useState([]);
  const [BookingNo, setBookingNo] = useState("");
  const [errphone, setErrPhone] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errDate, setErrDate] = useState(false);
  const [errname, setErrName] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const validPhone =
    errphone && isSubmit ? "form-control is-invalid" : "form-control";
  const validName =
    errname && isSubmit ? "form-control is-invalid" : "form-control";

  const validEmail =
    errEmail && isSubmit ? "form-control is-invalid" : "form-control";
  const validDate =
    errDate && isSubmit
      ? " p-0 form-control is-invalid p-0"
      : "p-0 form-control";
  const validate = (values) => {
    const errors = {};

    if (values.Name === "") {
      errors.Name = "required!";
      setErrName(true);
    } else {
      setErrName(false);
    }
    if (values.Phone === "") {
      errors.Phone = "required!";
      setErrPhone(true);
    } else if (!/^\d{10}$/.test(values.Phone)) {
      errors.Phone = "Invalid Phone Number";
      setErrPhone(true);
    } else if (values.Phone.length !== 10) {
      errors.Phone = "Phone number must be of 10 digits!";
      setErrPhone(true);
    } else {
      setErrPhone(false);
    }
    if (values.Email === "") {
      errors.Email = "required!";
      setErrEmail(true);
    } else if (!/\S+@\S+\.\S+/.test(values.Email)) {
      errors.Email = "Invalid Email Id";
      setErrEmail(true);
    } else {
      setErrEmail(false);
    }

    if (values.BookingDate === "") {
      errors.BookingDate = "required";
      setErrDate(true);
    } else {
      setErrDate(false);
    }
    return errors;
  };
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Subject: "",
    Message: "",
    InquiryDate: formatDate(new Date()),
  });
  const getLocations = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/CompanyAddressAll`
      )
      .then((response) => {
        setAddressItems(response.data);
      });
  };

  const getContactUsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/cms/get/contactusdetail/65f131a0028849922f0512ab`
      );
      const contactUsDetail = response.data.cmsContactUsDetailContent;
      const faxLines = contactUsDetail.ContactUsDetail.split("\n").filter(
        (line) => line.includes("FAX")
      );
      const faxNumberRegex = /FAX: (\d{3}-\d{3}-\d{4})/g;
      const faxNumbersArray = [];
      let match;
      while (
        (match = faxNumberRegex.exec(contactUsDetail.ContactUsDetail)) !== null
      ) {
        faxNumbersArray.push(match[1]);
      }
      setFaxNumbers(faxNumbersArray);
      const phoneNumberRegex = /PH: (\d{3}-\d{3}-\d{4})/g;
      const phoneNumbersArray = [];
      while (
        (match = phoneNumberRegex.exec(contactUsDetail.ContactUsDetail)) !==
        null
      ) {
        phoneNumbersArray.push(match[1]);
      }
      setPhoneNumbers(phoneNumbersArray);
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(
        contactUsDetail.ContactUsDetail,
        "text/html"
      );
    } catch (error) {
      console.error("Error fetching contact us data:", error);
    }
  };
  const getBookings = async () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/listBookingManagement_noParams`
      )
      .then((response) => {
        if (response.data.message !== "No entries found.") {
          let res = response.data;
          let maxBookingNo = Math.max(
            ...res.data.map((item) => item.BookingNo)
          );
          setBookingNo(maxBookingNo + 1);
          setFormData((prevState) => ({
            ...prevState,
            BookingNo: BookingNo,
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            BookingNo: 20900,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    getContactUsData();
    getLocations();
    getBookings();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    console.log("form", formData);
    try {
      const errors = validate(formData);
      setFormErrors(errors);
      setIsSubmit(true);
      console.log("errorsss", formErrors.Name);
      if (Object.keys(errors).length === 0) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/inquiry`,
          formData
        );
        toast.success("inquiry sent successfully!");
        setFormData(initialFormData);
        console.log("Response", response);
        return response;
      }
    } catch (error) {
      console.error("Error in creating booking:", error);
      throw error;
    }
  };

  return (
    <>
      <div class="pbmit-title-bar-wrapper">
        <Container>
          <div class="pbmit-title-bar-content">
            <div class="pbmit-title-bar-content-inner">
              <div class="pbmit-tbar">
                <div class="pbmit-tbar-inner container">
                  <h1 class="pbmit-tbar-title"> Contact Us</h1>
                </div>
              </div>
              <div class="pbmit-breadcrumb">
                <div class="pbmit-breadcrumb-inner">
                  <span>
                    <Link
                      to="/"
                      className="home"
                      style={{ textDecoration: "none" }}
                    >
                      Home
                    </Link>
                  </span>
                  <span class="sep">
                    <i class="pbmit-base-icon-right-1"></i>
                  </span>
                  <span>
                    <span class="post-root post post-post current-item">
                      {" "}
                      Contact Us
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <BackToTopButton />
      </div>

      <div class="page-content contact_us">
        <section class="section-xl">
          <Container fluid >
            <Row>
              <Col md={6} xl={4}>
                <div class="pbmit-ihbox-style-15">
                  <div class="pbmit-ihbox-box">
                    <div class="pbmit-icon-wrap d-flex align-items-center">
                      <div class="pbmit-ihbox-icon">
                        <div class="pbmit-ihbox-icon-wrapper">
                          <div class="pbmit-icon-wrapper pbmit-icon-type-icon">
                            <i class="pbmit-xcare-icon pbmit-xcare-icon-email"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h2 class="pbmit-element-title">Fax</h2>
                    <div class="pbmit-content-wrapper">
                      <div class="pbmit-heading-desc desc-1">
                        {faxNumbers.map((fax, index) => (
                          <React.Fragment key={index}>
                            FAX:{index + 1}-{fax}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="pbmit-ihbox-btn">
                    <a href="#">
                      <span class="pbmit-button-text">Read More</span>
                      <span class="pbmit-button-icon-wrapper">
                        <span class="pbmit-button-icon">
                          <i class="pbmit-base-icon-black-arrow-1"></i>
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </Col>
              <Col md={6} xl={4}>
                <div class="pbmit-ihbox-style-15">
                  <div class="pbmit-ihbox-box">
                    <div class="pbmit-icon-wrap d-flex align-items-center">
                      <div class="pbmit-ihbox-icon">
                        <div class="pbmit-ihbox-icon-wrapper">
                          <div class="pbmit-icon-wrapper pbmit-icon-type-icon">
                            <i class="pbmit-xcare-icon pbmit-xcare-icon-phone-call"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h2 class="pbmit-element-title">Call US</h2>
                    <div class="pbmit-content-wrapper">
                      <div class="pbmit-heading-desc desc-1">
                        {phoneNumbers.map((phone, index) => (
                          <React.Fragment key={index}>
                            Ph:{index + 1}-{phone}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="pbmit-ihbox-btn">
                    <a href="#">
                      <span class="pbmit-button-text">Read More</span>
                      <span class="pbmit-button-icon-wrapper">
                        <span class="pbmit-button-icon">
                          <i class="pbmit-base-icon-black-arrow-1"></i>
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </Col>
              <Col md={12} xl={4}>
                <div class="pbmit-ihbox-style-15">
                  <div class="pbmit-ihbox-box">
                    <div class="pbmit-icon-wrap d-flex align-items-center">
                      <div class="pbmit-ihbox-icon">
                        <div class="pbmit-ihbox-icon-wrapper">
                          <div class="pbmit-icon-wrapper pbmit-icon-type-icon">
                            <i class="pbmit-xcare-icon pbmit-xcare-icon-placeholder"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h2 class="pbmit-element-title">Our Locations</h2>
                    <div class="pbmit-content-wrapper">
                      <div class="pbmit-heading-desc desc-1">
                        {addressItems.map((item, index) => (
                          <React.Fragment key={index}>
                            Address:{index + 1}-{item.CompanyAddress}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="pbmit-ihbox-btn">
                    <a href="#">
                      <span class="pbmit-button-text">Read More</span>
                      <span class="pbmit-button-icon-wrapper">
                        <span class="pbmit-button-icon">
                          <i class="pbmit-base-icon-black-arrow-1"></i>
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="contact-form">
          <Container fluid >
            <Row>
              <Col md={12} xl={6}>
                <div className="contact-us-left_img"></div>
              </Col>
              <Col md={12} xl={6}>
                <div className="contact-form-one_right pbmit-bg-color-white">
                  <div className="pbmit-heading-subheading">
                    <h4 className="pbmit-subtitle">Contact Us</h4>
                    <h2 className="pbmit-title mb-5">
                      Make an appointment apply for treatments
                    </h2>
                  </div>
                  <Form
                    className="contact-form"
                    method="post"
                    id="contact-form"
                    action=""
                  >
                    <Row>
                      <Col lg={6}>
                        <Form.Control
                          type="text"
                          placeholder="Your Name *"
                          name="Name"
                          style={{ fontWeight: "normal" }}
                          onChange={handleChange}
                          value={formData.Name}
                          required
                          className={validName}
                        />
                        {isSubmit && (
                          <p className="text-danger">{formErrors.Name}</p>
                        )}
                      </Col>

                      <Col lg={6}>
                        <Form.Control
                          type="email"
                          placeholder="Your Email *"
                          name="Email"
                          style={{ fontWeight: "normal" }}
                          onChange={handleChange}
                          value={formData.Email}
                          required
                          className={validEmail}
                        />
                        {isSubmit && (
                          <p className="text-danger">{formErrors.Email}</p>
                        )}
                      </Col>

                      <Col lg={6}>
                        <Form.Control
                          type="tel"
                          placeholder="Your Phone *"
                          name="Phone"
                          style={{ fontWeight: "normal" }}
                          onChange={handleChange}
                          value={formData.Phone}
                          required
                          className={validPhone}
                        />
                        {isSubmit && (
                          <p className="text-danger">{formErrors.Phone}</p>
                        )}
                      </Col>

                      <Col lg={6}>
                        <Form.Control
                          type="text"
                          placeholder="Subject"
                          name="Subject"
                          style={{ fontWeight: "normal" }}
                          value={formData.Subject}
                          onChange={handleChange}
                          required
                        />
                      </Col>

                      <Col md={12}>
                        <Form.Control
                          as="textarea"
                          name="Message"
                          cols="40"
                          rows="10"
                          style={{ fontWeight: "normal" }}
                          placeholder="Message"
                          value={formData.Message}
                          onChange={handleChange}
                          required
                        ></Form.Control>
                      </Col>

                      <Col md={12}>
                        <Button className="pbmit-btn" onClick={handleSubmit}>
                          <span className="pbmit-button-content-wrapper">
                            <span className="pbmit-button-icon pbmit-align-icon-right">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22.76"
                                height="22.76"
                                viewBox="0 0 22.76 22.76"
                              ></svg>
                            </span>
                            <span className="pbmit-button-text">
                              Submit Now
                            </span>
                          </span>
                        </Button>
                      </Col>
                      <Col md={12} lg={12} className="message-status"></Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section class="iframe_section section-lgb">
          <Container fluid>
            <div class="iframe_box">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.43730267129!2d-73.90438642428181!3d40.86227642840269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f3881bf89a61%3A0xe74d64fd46b49763!2s2435%20Jerome%20Ave%2C%20Bronx%2C%20NY%2010468%2C%20USA!5e0!3m2!1sen!2sin!4v1711605866120!5m2!1sen!2sin"
                allowfullscreen=""
                loading="lazy"
                className="mt-5"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Container>
        </section>
        {/* <BackToTopButton/> */}
        <ToastContainer />
      </div>
    </>
  );
}
