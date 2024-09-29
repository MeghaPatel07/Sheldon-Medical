import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Service = () => {
  const [services, setServices] = useState([]);

  const getServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/services`
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <section className="pbmit-sticky-section section-xl">
      <Container>
        <Row>
          <Col md={12} lg={5}>
            <div className="pbmit-ele-header-area">
              <div className="pbmit-heading-subheading">
                <div className="knowledgeDiv">
                <h4 className="pbmit-subtitle">Services</h4>
                </div>
                <h2 className="pbmit-title">
                  Your health matters. Trust our compassionate expertise.
                </h2>
                <div className="pbmit-heading-desc">
                  Our primary care physicians are your first point of contact
                  for managing your overall health and well-being. From
                  preventive care to managing chronic conditions, we are here to
                  address your general healthcare needs.
                </div>
              </div>
              <Link to="/" className="pbmit-btn">
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
                  <Link
                    to="/services"
                    className="pbmit-button-text"
                    style={{ color: "white" }}
                  >
                    Read More
                  </Link>
                </span>
              </Link>
            </div>
          </Col>
          <Col md={12} lg={7} className="pbmit-servicebox-right">
            {services.map((service, index) => (
              <article key={index} className="pbmit-service-style-4">
                <div className="pbminfotech-post-item">
                  <div className="pbminfotech-box-content">
                    <div className="pbmit-box-content-wrap">
                      <div className="pbmit-featured-img-wrapper">
                        <div className="pbmit-featured-wrapper">
                          <img
                            className="img-fluid"
                            src={`${process.env.REACT_APP_API_URL_SHELDON}/${service.UploadHomeIcon}`}
                            alt={service.ServiceName}
                          />
                        </div>
                      </div>
                      <div className="pbmit-box-content-inner">
                        <div className="pbmit-content-inner-wrap">
                          <div className="pbmit-contant-box">
                            <div class="pbmit-serv-cat">
                              <Link to="/" rel="tag">
                                Service
                              </Link>
                            </div>
                            <div className="pbmit-serv-cat"></div>
                            <h3 className="pbmit-service-title">
                              <a href="/services">{service.ServiceName}</a>
                            </h3>
                          </div>
                          <div className="pbmit-service-icon">
                          <Image
                              className="img-fluid"
                              src={`${process.env.REACT_APP_API_URL_SHELDON}/${service.UploadIcon}`}
                              alt={service.ServiceName}
                            />
                          </div>
                        </div>
                        <div className="pbmit-service-description">
                          {service.Thumbnail}
                        </div>
                      </div>
                    </div>
                    <Link
                      className="pbmit-service-btn"
                      to="/services"
                      state={{ serviceId: service._id }}
                      title={service.ServiceName}
                    >
                      <span className="pbmit-button-icon-wrapper">
                        <span className="pbmit-button-icon">
                          <i className="pbmit-base-icon-black-arrow-1"></i>
                        </span>
                      </span>
                    </Link>
                  </div>
                  {/* <a className="pbmit-link" href="#"></a> */}
                </div>
              </article>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Service;
