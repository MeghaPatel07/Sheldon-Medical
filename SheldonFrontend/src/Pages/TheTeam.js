import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import doc from "../assets/img/doc.jpg";
import BackToTopButton from "../Components/Arrow";

export default function TheTeam() {
  const [spec, setSpec] = useState([]);
  const [specificdoctor, setSpecificSDoctor] = useState([]);
  const [specialityheading, setSpecicialityHeading] = useState("All");
  const [specialityDesc, setSpecialityDesc] = useState("Description for All");
  const [cat, setCat] = useState([]);

  const getspecialities = async () => {
    try {
      const spec1 = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/specialities`
      );
      const updatedSpec = [...spec1.data];
      if (updatedSpec.length > 0) {
        updatedSpec.unshift({ SpecialityName: "All", _id: null });
        setSpec(updatedSpec);
        setSpecicialityHeading(updatedSpec[0].SpecialityName);
        setSpecialityDesc(updatedSpec[0].Detail);
        const specificdoctor1 = await axios.get(
          `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/doctorsbyspeciality/${updatedSpec[0]._id}`
        );
        setSpecificSDoctor(specificdoctor1.data);
      }
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };

  const getdoctors = async () => {
    try {
      const spec1 = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/doctorsall`
      );
      console.log("byeeeeeeeeee", spec1);
      setSpecificSDoctor(spec1.data);
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };

  const getdoctors1 = async () => {
    try {
      const spec1 = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/doctorsall`
      );
      console.log("byeeeeeeeeee", spec1);
      const doctorsData = spec1.data.map((doctor) => ({
        id: doctor.SpecialityName,
        category: doctor.specialityNameOther,
        doctorName: doctor.DoctorName,
        doctorPhoto: `${process.env.REACT_APP_API_URL_SHELDON}/${doctor.photo}`,
      }));
      const uniqueCategories = [
        ...new Set(doctorsData.map((item) => item.category)),
      ];
      setCat(doctorsData);
      console.log("cat", cat);
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };

  const handleSpecialityClick = async (specialityId) => {
    let specificdoctor;
    if (specialityId === null) {
      specificdoctor = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/doctorsall`
      );
      console.log("bwdwnfijnwidijwddko", specificdoctor.data);
    } else {
      specificdoctor = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/doctorsbyspeciality/${specialityId}`
      );
      console.log(specificdoctor.data[0]);
    }
    setSpecificSDoctor(specificdoctor.data);
  };

  useEffect(() => {
    getspecialities();
    getdoctors();
    getdoctors1();
  }, []);

  return (
    <>
      <div className="pbmit-title-bar-wrapper">
        <Container>
          <div className="pbmit-title-bar-content">
            <div className="pbmit-title-bar-content-inner">
              <div className="pbmit-tbar">
                <Container className="pbmit-tbar-inner">
                  <h1 className="pbmit-tbar-title">Our Team Member</h1>
                </Container>
              </div>
              <div className="pbmit-breadcrumb">
                <div className="pbmit-breadcrumb-inner">
                  <span>
                    <Link to="/" className="home">
                      <span>Home</span>
                    </Link>
                  </span>
                  <span className="sep">
                    <i className="pbmit-base-icon-angle-double-right"></i>
                  </span>
                  <span>
                    <span className="post-root post post-post current-item">
                      {" "}
                      Our Team Member
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <BackToTopButton />
      </div>
      <section className="pbmit-team-single pbmit-sticky-section">
        <Container className="p-5">
          <div className="pbmit-team-single-info">
            <Row>
              <Col
                lg={3}
                xl={3}
                className="service-left-col sidebars site_content service_details"
              >
                <aside className="service-sidebars">
                  <aside className="widget post-list">
                    <h2 className="widget-title">Our Team Members</h2>
                    <div className="all-post-list">
                      <ul
                        className="nav nav-tabs"
                        id="serviceTabs"
                        role="tablist"
                      >
                        {[
                          ...new Set(
                            cat.map((speciality) => speciality.category)
                          ),
                        ].map((category, index) => {
                          const uniqueItem = cat.find(
                            (item) => item.category === category
                          );
                          console.log("uniqqqq", uniqueItem);
                          return (
                            <li
                              className="nav-item"
                              role="presentation"
                              key={index}
                            >
                              <a
                                className={`nav-link ${
                                  specialityheading === uniqueItem.category
                                    ? "active"
                                    : ""
                                } ${
                                  specialityheading === "All" && index === 0
                                    ? "active"
                                    : ""
                                } border-0 nav-link`}
                                id={`${
                                  index === 0
                                    ? "All"
                                    : uniqueItem.category.replace(/\s+/g, "")
                                }Tab`}
                                data-toggle="tab"
                                href="#All"
                                role="tab"
                                aria-controls={`${
                                  index === 0
                                    ? "All"
                                    : uniqueItem.category.replace(/\s+/g, "")
                                }`}
                                aria-selected={index === 0}
                                onClick={() => {
                                  handleSpecialityClick(
                                    index === 0 ? null : uniqueItem.id
                                  ); // Pass null for 'All' option
                                  setSpecicialityHeading(uniqueItem.category);
                                  setSpecialityDesc(
                                    index === 0
                                      ? "Description for All"
                                      : uniqueItem.detail
                                  ); // Set description for 'All'
                                }}
                              >
                                {index === 0 ? "All" : uniqueItem.category}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </aside>
                </aside>
              </Col>
              <Col md={12} xl={9} lg={9}>
                <div className="tab-content" id="serviceTabsContent">
                  <div
                    className="tab-pane fade show active"
                    id="All"
                    role="tabpanel"
                    aria-labelledby="AllTab"
                  >
                    <Row className="pbmit-element-posts-wrapper">
                      {specificdoctor.map((doctor, index) => (
                        <article
                          className="pbmit-team-style-1 col-md-6 col-lg-3"
                          key={index}
                        >
                          <div className="pbminfotech-post-item">
                            <div className="pbmit-featured-wrap">
                              <div className="pbmit-featured-img-wrapper">
                                <div className="pbmit-featured-wrapper">
                                  <img
                                    src={
                                      doctor.photo
                                        ? `${process.env.REACT_APP_API_URL_SHELDON}/${doctor.photo}`
                                        : doc
                                    }
                                    alt="Doctors"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="pbminfotech-box-content">
                              <div className="pbminfotech-box-content-inner">
                                <div className="pbminfotech-box-team-position">
                                  {doctor.specialityNameOther}
                                </div>
                                <h3 className="pbmit-team-title">
                                  {doctor.DoctorName}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
}
