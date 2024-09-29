import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import doc from "../assets/img/doc.jpg";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import BackToTopButton from "../Components/Arrow";

export default function Speciality() {
  const [spec, setSpec] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [paras, setParas] = useState([]);
  const [blockquote, setBlockQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [specid, setSpecid] = useState("");
  const [specificdoctor, setSpecificSDoctor] = useState([]);
  const [BookingNo, setBookingNo] = useState("");
  const [bq, setBQ] = useState([]);
  const [specialityheading, setSpecicialityHeading] = useState("");
  const [specialityDesc, setSpecialityDesc] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [details1, setDetails1] = useState([]);
  const [LabelSpecialityName, setLabelSpecialityName] = useState("");
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    BookingDate: "",
    BookingNo: 20900,
    SpecialityName: "",
    Message: "",
  });
  const [faxNumbers, setFaxNumbers] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [addressItems, setAddressItems] = useState([]);
  const [errphone, setErrPhone] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errDate, setErrDate] = useState(false);
  const [Message, setErrMsg] = useState(false);

  const [errname, setErrName] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [compDetails, setCompDetails] = useState([]);
  const validPhone =
    errphone && isSubmit ? "form-control is-invalid" : "form-control";
  const validName =
    errname && isSubmit ? "form-control is-invalid" : "form-control";
  const ValidMsg =
    Message && isSubmit ? "form-control is-invalid" : "form-control";

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
      errors.Phone = "required";

      setErrPhone(true);
    } else if (!/^\d{10}$/.test(values.Phone)) {
      errors.Phone = "Innvalid Phone Number";

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
      errors.BookingDate = "required!";

      setErrDate(true);
    } else {
      setErrDate(false);
    }
    if (values.Message === "") {
      errors.Message = "required!";

      setErrMsg(true);
    } else {
      setErrMsg(false);
    }

    return errors;
  };
  const getCompanyDetails = async () => {
    const resp = axios
      .get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/CompanyAddressAll`
      )
      .then((response) => {
        setCompDetails(response.data);
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
      const allLiItems = htmlDoc.querySelectorAll("li");
      const filteredAddresses = Array.from(allLiItems)
        .map((li) => li.textContent)
        .filter(
          (content) => !content.includes("FAX") && !content.includes("PH")
        );
      setAddressItems(filteredAddresses);
    } catch (error) {
      console.error("Error fetching contact us data:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const getBookings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/listBookingManagement_noParams`
      );
      if (response.data.message !== "No entries found.") {
        const maxBookingNo = Math.max(
          ...response.data.map((item) => item.BookingNo)
        );
        console.log(maxBookingNo);
        setBookingNo(maxBookingNo + 1);
      } else {
        setBookingNo(20900);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);

      setBookingNo(20900);
    }
  };
  const renderHtmlContent = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    const blockquoteElements = tempElement.querySelectorAll("blockquote");

    blockquoteElements.forEach((blockquoteElement) => {
      blockquoteElement.classList.add("blockquote1");
      let blockquoteText = blockquoteElement.textContent.trim();
      const authorIndex = blockquoteText.lastIndexOf("-");
      if (authorIndex !== -1) {
        const authorText = blockquoteText.slice(authorIndex + 1).trim();

        blockquoteElement.innerHTML = blockquoteText.replace(
          authorText,
          `<cite style="color: blue; font-size: 14px;font-weight: 500;color: var(--pbmit-global-color);display: block;line-height: 24px;margin-top: 15px;">-<span>&nbsp</span>${authorText}</cite>`
        );
      }
    });

    return { __html: tempElement.innerHTML };
  };

  const getspecialities = async () => {
    try {
      const spec1 = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/specialities`
      );
      console.log(spec1.data);
      setSpec(spec1.data);
      setSpecicialityHeading(spec1.data[0].SpecialityName);
      setBQ(JSON.parse(spec1.data[0].BlockQuote));
      setSpecialityDesc(spec1.data[0].Detail);
      const specificdoctor1 = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/doctorsbyspeciality/${spec1.data[0]._id}`
      );
      if (specificdoctor.length === 0) {
        setDetails1(JSON.parse(spec1.data[0].Location));
      }
      setSpecificSDoctor(specificdoctor1.data);
      setSpecid(spec1.data[0]._id);
      console.log(spec);
    } catch (err) {
      console.log(err);
    }
  };
  const extractBlockQuote = (htmlContent) => {
    try {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = htmlContent;
      const blockquoteElements = tempElement.querySelectorAll("blockquote");

      const quotes = [];
      const authors = [];
      const paragraphs = [];

      blockquoteElements.forEach((blockquoteElement) => {
        const content = blockquoteElement.textContent.trim();
        const splitContent = content.split("-");
        for (let i = 0; i < splitContent.length; i++) {
          if (i % 2 === 0) {
            quotes.push(splitContent[i].trim());
          } else {
            authors.push(splitContent[i].trim());
          }
        }

        const paragraphContents = [];
        blockquoteElement.querySelectorAll("p").forEach((pElement) => {
          paragraphContents.push(pElement.textContent.trim());
        });
        paragraphs.push(paragraphContents);
      });

      return paragraphs;
    } catch (error) {
      console.error("Error extracting blockquote:", error);
      return { quotes: [], authors: [] };
    }
  };

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    setFormData({
      ...formData,
      phoneNumber: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      date: e.target.value,
    });
  };

  const handleMessageChange = (e) => {
    setFormData({
      ...formData,
      message: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    console.log("form", formData);
    console.log("uchuhcucucuuybyubyyy", specid);
    try {
      const updatedFormData = {
        ...formData,
        BookingNo: BookingNo,
        SpecialityName: specid,
        LabelSpecialityName: specialityheading,
      };
      const errors = validate(updatedFormData);
      setFormErrors(errors);
      setIsSubmit(true);
      console.log("errorsss", formErrors.Name);
      if (Object.keys(errors).length === 0) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/bookingmanagement`,
          updatedFormData
        );

        console.log("Response", response);
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
      }
    } catch (error) {
      console.error("Error in creating booking:", error);
      throw error;
    }
  };
  const extractWordsAfterHyphens = (quote) => {
    const matches = quote.match(/(?<=-)\b\w+\b/g);
    return matches || [];
  };

  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };
  const baseimg = `${process.env.REACT_APP_API_URL_SHELDON}`;
  const getdoctors = async () => {
    const spec1 = await axios.get(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/doctorsall`
    );
    console.log("noooooooo", spec1.data);
  };
  const handleSpecialityClick = async (specialityId) => {
    try {
      const specificdoctor = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/doctorsbyspeciality/${specialityId}`
      );
      if (specificdoctor.data.length === 0) {
        const resp = await axios
          .get(
            `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/getDoctorSpecialityById/${specialityId}`
          )
          .then((response) => {
            console.log("rreessspsosnsee", response);
            setDetails1(JSON.parse(response.data.Location));
          });
        setSpecificSDoctor([]);
        setBlockQuote("");

        setParas([]);
      } else {
        setSpecificSDoctor(specificdoctor.data);
        setBlockQuote(
          extractBlockQuote(specificdoctor.data[0].SpecialityName.Detail)
        );

        const paragraphs = extractBlockQuote(
          specificdoctor.data[0].SpecialityName.Detail
        );
        setQuotes(quotes);
        setAuthors(authors);
        setParas(paragraphs);
      }
      setSpecid(specialityId);
    } catch (err) {
      console.log(err);
    }
  };
  const renderImage = (uploadimage) => {
    const imageUrl = `${baseimg}/${uploadimage}`;

    return (
      <img
        src={imageUrl}
        alt="Image"
        height={"401px"}
        width={"326px"}
        style={{ padding: "10px", marginLeft: "-50px" }}
      />
    );
  };
  useEffect(() => {
    getspecialities();
    getCompanyDetails();
    getBookings();
    getContactUsData();

    console.log(spec);
    console.log(specialityDesc);
    console.log(specialityheading);
  }, []);
  useEffect(() => {
    getdoctors();
  }, []);
  return (
    <>
      <div className="pbmit-title-bar-wrapper">
        <ToastContainer />
        <Container>
          <div className="pbmit-title-bar-content">
            <div className="pbmit-title-bar-content-inner">
              <div className="pbmit-tbar">
                <div className="pbmit-tbar-inner container">
                  <h1 className="pbmit-tbar-title">Specialty</h1>
                </div>
              </div>
              <div className="pbmit-breadcrumb">
                <div className="pbmit-breadcrumb-inner">
                  <span>
                    <Link
                      to="/"
                      className="home"
                      style={{ textDecoration: "none" }}
                    >
                      Home
                    </Link>
                  </span>
                  <span className="sep">
                    <i className="pbmit-base-icon-angle-double-right"></i>
                  </span>
                  <span>
                    <a title="" href="#" className="home">
                      <span>Specialty</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <BackToTopButton />
      </div>

      <div class="page-content">
        <section class="pbmit-team-single pbmit-sticky-section">
          <div class="container-fluid ">
            <div class="pbmit-team-single-info">
              <Row>
                <Col
               
                  lg={3}
                  md={12}
                  className="service-left-col sidebars site_content service_details"
                >
                  <aside class="service-sidebars">
                    <aside class="widget post-list">
                      <h2 class="widget-title">Specialty</h2>
                      <div class="all-post-list" style={{ border: "0px" }}>
                        <ul
                          class="bg-white pt-4 p-3 nav nav-tabs"
                          id="serviceTabs"
                          role="tablist"
                        >
                          {spec.map((speciality, index) => (
                            <li
                              className="nav-item"
                              role="presentation"
                              key={index}
                            >
                              <a
                                className={
                                  index === 0
                                    ? "border-0 nav-link  "
                                    : "border-0 nav-link"
                                }
                                id={`${speciality.SpecialityName.replace(
                                  /\s+/g,
                                  ""
                                )}Tab`}
                                data-toggle="tab"
                                href={`#${speciality.SpecialityName.replace(
                                  /\s+/g,
                                  ""
                                )}`}
                                role="tab"
                                aria-controls={`${speciality.SpecialityName.replace(
                                  /\s+/g,
                                  ""
                                )}`}
                                aria-selected={index === 0 ? "true" : "false"}
                                onClick={() => {
                                  handleSpecialityClick(speciality._id);
                                  setSpecicialityHeading(
                                    speciality.SpecialityName
                                  );
                                  setSpecialityDesc(speciality.Detail);
                                  setBQ(JSON.parse(speciality.BlockQuote));
                                }}
                                style={{ color: "#333", fontWeight: "bold" }}
                              >
                                {speciality.SpecialityName}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </aside>
                  </aside>
                </Col>
                <Col  lg={9}  md={12}>
                  <div class="tab-content" id="serviceTabsContent">
                    <div
                      class="tab-pane fade show active"
                      id={`${specialityheading.replace(/\s+/g, "")}`}
                      role="tabpanel"
                      aria-labelledby="CardiologyTab"
                    >
                      <div class="pbmit-entry-content">
                        <div class="pbmit-heading animation-style2">
                          <h3 class="pbmit-title mb-3">{specialityheading}</h3>
                        </div>
                        <div>
                          {specialityDesc && (
                            <div
                              dangerouslySetInnerHTML={renderHtmlContent(
                                specialityDesc
                              )}
                            />
                          )}
                        </div>
                        <Col lg={12} xl={12}>
                          {specificdoctor.map((doctor, index) => (
                            <>
                              {doctor && (
                                <Row className="align-items-center" key={index}>
                                  <Col xl={5}>
                                    <Row>
                                      <div className="pbmit-ihbox-style-18">
                                        <div className="pbmit-ihbox-headingicon">
                                          <div className="pbmit-icon-wrap">
                                            <div className="pbmit-ihbox-wrapper">
                                              <div className="pbmit-ihbox-icon-type-image">
                                                <Image
                                                  src={
                                                    doctor.photo
                                                      ? `${process.env.REACT_APP_API_URL_SHELDON}/${doctor.photo}`
                                                      : doc
                                                  }
                                                  alt="Doctors"
                                                />
                                              </div>
                                            </div>
                                            <div className="pbmit-ihbox-box-number">
                                              0{index + 1}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Row>
                                  </Col>
                                  <Col xl={7}>
                                    <Row>
                                      <h2 className="pbmit-team-designation">
                                        {doctor.specialityNameOther.toUpperCase()}
                                      </h2>
                                      <h4 className="pbmit-team-title">
                                        {doctor.DoctorName}
                                      </h4>
                                    </Row>
                                    <Col
                                      xl={12}
                                      className="location"
                                      style={{ textAlign: "justify" }}
                                    >
                                      {doctor.Location.map((location, i) => (
                                        <Col xl={6} key={i}>
                                          <h5 >Location-{i + 1}</h5>
                                          <p>{stripHtmlTags(location.Where)}</p>
                                          {/* <p>{stripHtmlTags(location.When)}</p> */}
                                        </Col>
                                      ))}
                                    </Col>
                                  </Col>
                                </Row>
                              )}
                            </>
                          ))}

                          {specificdoctor.length === 0 && (
                            <>
                              <Col
                                xl={12}
                                className="location"
                                style={{ textAlign: "justify" }}
                              >
                                <h4>Location</h4>
                                {details1.length > 0 ? (
                                  details1.map((detail, index) => (
                                    <div key={index}>
                                      <p>{detail.address}</p>
                                    </div>
                                  ))
                                ) : (
                                  <>
                                    {compDetails.map((detail, index) => (
                                      <div key={index}>
                                        <p>{detail.CompanyAddress}</p>
                                      </div>
                                    ))}
                                  </>
                                )}
                              </Col>
                            </>
                          )}
                          {console.log("bbbbqbbqbqbqq", bq)}
                          {bq.length === 0 ? (
                            ""
                          ) : (
                            <div className="blockquote1">
                              {bq.map((item, index) => (
                                <div key={index}>
                                  {item.blockquote.split("-")[0]}
                                  <div>-{item.blockquote.split("-")[1]}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </Col>

                        <div class="comment-respond">
                          <div class="pbmit-heading animation-style2">
                            <h3 class="pbmit-title mb-3">
                              Book An Appointment
                            </h3>
                          </div>
                          <div class="comment-form">
                            <Form>
                              <Row>
                                <Col md={6}>
                                  <input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name *"
                                    class="form-control"
                                    style={{ fontWeight: "normal" }}
                                    name="Name"
                                    className={validName}
                                    value={formData.Name}
                                    onChange={handleChange}
                                  />
                                  {isSubmit && (
                                    <p className="text-danger">
                                      {formErrors.Name}
                                    </p>
                                  )}
                                </Col>
                                <Col md={6}>
                                  <input
                                    id="email"
                                    class="form-control"
                                    placeholder="Your Email *"
                                    type="email"
                                    name="Email"
                                    style={{ fontWeight: "normal" }}
                                    className={validEmail}
                                    value={formData.Email}
                                    onChange={handleChange}
                                  />
                                  {isSubmit && (
                                    <p className="text-danger">
                                      {formErrors.Email}
                                    </p>
                                  )}
                                </Col>
                                <Col md={6}>
                                  <input
                                    id="phone"
                                    class="form-control"
                                    placeholder="Your Phone *"
                                    type="text"
                                    name="Phone"
                                    style={{ fontWeight: "normal" }}
                                    className={validPhone}
                                    value={formData.Phone}
                                    onChange={handleChange}
                                  />
                                  {isSubmit && (
                                    <p className="text-danger">
                                      {formErrors.Phone}
                                    </p>
                                  )}
                                </Col>
                                <Col md={6}>
                                  <input
                                    class="form-control"
                                    placeholder="Date"
                                    type="date"
                                    style={{ fontWeight: "normal" }}
                                    name="BookingDate"
                                    value={formData.BookingDate}
                                    onChange={handleChange}
                                  />
                                  {/* {isSubmit && (
                                    <p className="text-danger">
                                      {formErrors.BookingDate}
                                    </p>
                                  )} */}
                                </Col>
                                <Col md={12}>
                                  <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    placeholder="Message"
                                    className="textareaDiv"
                                    rows="3"
                                    style={{ fontWeight: "normal" }}
                                    name="Message"
                                    value={formData.Message}
                                    onChange={handleChange}
                                  >
                                    {/* {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.Message}
                                      </p>
                                    )} */}
                                  </textarea>
                                </Col>
                                <Col md={12}>
                                <div className="pbmitDiv">
                                  <button
                                    class="pbmit-btn"
                                    onClick={handleSubmit}
                                  >
                                    <span class="pbmit-button-content-wrapper">
                                      <span class="pbmit-button-icon pbmit-align-icon-right">
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
                                            stroke-width="2"
                                          ></path>
                                          <path
                                            d="M22.34,1a14.67,14.67,0,0,0,0,20.75"
                                            transform="translate(-0.29 -0.29)"
                                            fill="none"
                                            stroke="#000"
                                            stroke-width="2"
                                          ></path>
                                          <path
                                            d="M22.34,1,1,22.34"
                                            transform="translate(-0.29 -0.29)"
                                            fill="none"
                                            stroke="#000"
                                            stroke-width="2"
                                          ></path>
                                        </svg>
                                      </span>
                                      <div>
                                      <span class="pbmit-button-text">
                                        Submit Now
                                      </span>
                                      </div>
                                    
                                    </span>
                                  </button>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </section>
        {/* <BackToTopButton /> */}
      </div>
    </>
  );
}
