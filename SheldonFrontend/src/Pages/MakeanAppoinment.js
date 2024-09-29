import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackToTopButton from "../Components/Arrow";

export default function MakeanAppoinment() {
  const [BookingNo, setBookingNo] = useState(20900);
  const [SpecialityName, setSpecialityName] = useState("");
  const [SpecialityValue, setSpecialityValue] = useState("");
  const [LabelSpecialityName, setLabelSpecialityName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [new1, setNew1] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    BookingDate: "",
    BookingNo: 20900,
    Message: "",
  });

  const [Selectoptions, setOptions] = useState([]);

  const selectDropdown = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/specialitymanagement`
      );
      const names = response.data.map((item) => ({
        value: item._id,
        label: item.SpecialityName,
      }));
      setOptions(names);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    selectDropdown();
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/listBookingManagement_noParams`
      );
      if (response.data.message !== "No entries found.") {
        const maxBookingNo = Math.max(
          ...response.data.map((item) => item.BookingNo)
        );
        setBookingNo(maxBookingNo + 1);
        setFormData((prevState) => ({
          ...prevState,
          BookingNo: maxBookingNo + 1,
        }));
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSpecialityChange = (selectedOption) => {
    setSpecialityName(selectedOption.value);
    setSpecialityValue(selectedOption.label);
    setLabelSpecialityName(selectedOption.label);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.Name.trim()) {
      errors.Name = "Name is required";
    }
    if (!values.Phone.trim()) {
      errors.Phone = "Enter phone number";
    } else if (!/^\d{10}$/.test(values.Phone)) {
      errors.Phone = "Invalid Phone Number";
    }
    if (!values.Email.trim()) {
      errors.Email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(values.Email)) {
      errors.Email = "Invalid Email Id";
    }
    if (!values.BookingDate.trim()) {
      errors.BookingDate = "Booking Date is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const errors = validate(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const updatedFormData = {
          ...formData,
          BookingNo,
          SpecialityName,
          LabelSpecialityName,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/bookingmanagement`,
          updatedFormData
        );
        setFormData({
          Name: "",
          Email: "",
          Phone: "",
          BookingDate: "",
          SpecialityName: "",
          Message: "",
        });
        toast.success("Details submitted successfully!");
        return response;
      } catch (error) {
        console.error("Error in creating booking:", error);
      }
    }
  };

  return (
    <>
      <div className="pbmit-title-bar-wrapper">
        <Container>
          <div className="pbmit-title-bar-content">
            <div className="pbmit-title-bar-content-inner">
              <div className="pbmit-tbar">
                <Container className="pbmit-tbar-inner">
                  <h1 className="pbmit-tbar-title">Book An Appointment</h1>
                </Container>
              </div>
              <div className="pbmit-breadcrumb">
                <div className="pbmit-breadcrumb-inner">
                  <span>
                    <Link title="" to="/" className="home">
                      <span>Home</span>
                    </Link>
                  </span>
                  <span className="sep">
                    <i className="pbmit-base-icon-angle-double-right"></i>
                  </span>
                  <span>
                    <span className="post-root post post-post current-item">
                      {" "}
                      Book An Appointment{" "}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <BackToTopButton/>
      </div>
      <section>
        <Container>
          <Row>
            <Col md={6}>
              <h4>Location-1</h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.43730267127!2d-73.9043864244937!3d40.86227642840312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f3881bf89a61%3A0xe74d64fd46b49763!2s2435%20Jerome%20Ave%2C%20Bronx%2C%20NY%2010468%2C%20USA!5e0!3m2!1sen!2sin!4v1710496350131!5m2!1sen!2sin"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="location_map"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <h4>Location-2</h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.2593167637083!2d-73.92712152449357!3d40.86618302816315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f3f81ea226dd%3A0x2de1986f135e32a5!2s651%20Academy%20St%2C%20New%20York%2C%20NY%2010034%2C%20USA!5e0!3m2!1sen!2sin!4v1710496712322!5m2!1sen!2sin"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="location_map"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>

            <Col md={12} xl={6} className="mt-4 mt-xl-0">
              <div className="contact-form-one_right pbmit-bg-color-white">
                <div className="pbmit-heading-subheading">
                  <h4 className="pbmit-subtitle">Reach Us</h4>
                  <h2 className="pbmit-title mt-2">Book an appointment</h2>
                </div>
                <Form
                  className="contact-form"
                  method="post"
                  id="contact-form"
                  action="send.php"
                  onSubmit={handleSubmit}
                >
                  <Row>
                    <Col md={6}>
                      <input
                        className="form-control"
                        placeholder="Date"
                        type="date"
                        name="BookingDate"
                        value={formData.BookingDate}
                        onChange={handleChange}
                      />
                      {isSubmit && formErrors.BookingDate && (
                        <p className="text-danger">{formErrors.BookingDate}</p>
                      )}
                    </Col>
                    <Col md={6}>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.Name ? "is-invalid" : ""
                        }`}
                        placeholder="Your Name *"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        required
                      />
                      {isSubmit && formErrors.Name && (
                        <p className="text-danger">{formErrors.Name}</p>
                      )}
                    </Col>
                    <Col md={6}>
                      <input
                        type="email"
                        className={`form-control ${
                          formErrors.Email ? "is-invalid" : ""
                        }`}
                        placeholder="Your Email *"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                      />
                      {isSubmit && formErrors.Email && (
                        <p className="text-danger">{formErrors.Email}</p>
                      )}
                    </Col>
                    <Col md={6}>
                      <input
                        type="tel"
                        className={`form-control ${
                          formErrors.Phone ? "is-invalid" : ""
                        }`}
                        placeholder="Your Phone *"
                        name="Phone"
                        value={formData.Phone}
                        onChange={handleChange}
                        required
                      />
                      {isSubmit && formErrors.Phone && (
                        <p className="text-danger">{formErrors.Phone}</p>
                      )}
                    </Col>
                    <Col md={6} style={{ zIndex: 999, marginBottom: "17px" }}>
                      <Select
                        isDisabled={new1}
                        className={`h-100 ${
                          formErrors.SpecialityName ? "is-invalid" : ""
                        }`}
                        placeholder={LabelSpecialityName || "Select Speciality"}
                        name="SpecialityName"
                        id="SpecialityName"
                        value={Selectoptions.find(
                          (option) => option.value === SpecialityName
                        )}
                        options={Selectoptions}
                        onChange={handleSpecialityChange}
                      />
                      {isSubmit && formErrors.SpecialityName && (
                        <p className="text-danger">
                          {formErrors.SpecialityName}
                        </p>
                      )}
                    </Col>
                    <Col md={12}>
                      <textarea
                        name="Message"
                        cols="40"
                        rows="10"
                        className="form-control"
                        placeholder="Message"
                        value={formData.Message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </Col>
                    <Col md={12}>
                      <button className="pbmit-btn" type="submit">
                        <span className="pbmit-button-content-wrapper">
                          <span className="pbmit-button-icon pbmit-align-icon-right">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22.76"
                              height="22.76"
                              viewBox="0 0 22.76 22.76"
                            >
                              <title>black-arrow</title>
                              <path
                                d="M22.34,1A14.67,14.67,0,0,1,12,5.3,14.6,14.6,0,0,1,6.08,4.06,14.68,14.68,0,0,1,1.59,1"
                                transform="translate(-0.29 -0.29)"
                                fill="none"
                                stroke="#000"
                                strokeWidth="2"
                              ></path>
                              <path
                                d="M22.34,1a14.67,14.67,0,0,0,0,20.75"
                                transform="translate(-0.29 -0.29)"
                                fill="none"
                                stroke="#000"
                                strokeWidth="2"
                              ></path>
                              <path
                                d="M22.34,1,1,22.34"
                                transform="translate(-0.29 -0.29)"
                                fill="none"
                                stroke="#000"
                                strokeWidth="2"
                              ></path>
                            </svg>
                          </span>
                          <span className="pbmit-button-text">Submit Now</span>
                        </span>
                      </button>
                    </Col>
                    <Col md={12} lg={12} className="message-status"></Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer />
    </>
  );
}
