import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import axios from "axios";
import "animate.css"; // Import Animate.css
import BackToTopButton from "../Components/Arrow";

const AboutUs = () => {
  const [aboutUsSections, setAboutUsSections] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const getAboutUsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/cms/get/aboutus/65f12f48250203b664ab84ea`
      );
      const cmsAboutUsContent = response.data.cmsAboutUsContent;
      const sections = cmsAboutUsContent.AboutUsDetail.split("</p>");
      const images = cmsAboutUsContent.AboutUsDetail.match(
        /src="([^"]+)"/g
      ).map((match) => match.substring(5, match.length - 1));
      setAboutUsSections(sections.filter((section) => section.trim()));
      setImageUrls(images);
    } catch (error) {
      console.error("Error fetching about us data:", error);
    }
  };

  useEffect(() => {
    getAboutUsData();
  }, []);

  return (
    <>
      <div className="pbmit-title-bar-wrapper">
        <Container>
          <div className="pbmit-title-bar-content">
            <div className="pbmit-title-bar-content-inner">
              <div className="pbmit-tbar">
                <Container className="pbmit-tbar-inner">
                  <h1 className="pbmit-tbar-title">About Us</h1>
                </Container>
              </div>
              <div className="pbmit-breadcrumb">
                <div className="pbmit-breadcrumb-inner">
                  <span>
                    <a title="" href="/" className="home">
                      <span>Home</span>
                    </a>
                  </span>
                  <span className="sep">
                    <i className="pbmit-base-icon-angle-double-right"></i>
                  </span>
                  <span>
                    <span className="post-root post post-post current-item">
                      {" "}
                      About Us
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <BackToTopButton />
      </div>
      <div className="page-content">
        <section className="sec-padding">
          <Container>
            <Row className="g-0 align-items-center">
              <div class="pbmit-heading-subheading heading-1">
                <h4 class="pbmit-subtitle mt-5">About Us</h4>
                <h2 class="pbmit-title">
                  Start your healthy life today with us
                </h2>
              </div>

              {aboutUsSections.map((section, index) => (
                <div className="row g-0 align-items-center" key={index}>
                  {index % 2 === 0 ? (
                    <>
                      <Col
                        xl={6}
                        md={6}
                       
                        xs={12}
                       
                      >
                        <div className="about-us_img1 ">
                          <Image
                            src={imageUrls[index] || ""}
                            className="img-fluid animate__animated animate__fadeInLeft" // Animation class
                            alt=""
                          />
                        </div>
                      </Col>
                      <Col xl={6} md={6}>
                        <div className="pbmit-heading-desc">
                          {section
                            .replace(/<img.*?>/g, "")
                            .replace(/<figure.*?>(.*?)<\/figure>/g, "")
                            .replace(
                              /<strong>(.*?)<\/strong>/g,
                              function (match, content) {
                                return `${content}`;
                              }
                            )
                            .replace(/<p>(.*?)/g, "")
                            .replace(/&nbsp;/g, "")}
                        </div>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col xl={6} md={6} className="order-xl-0 order-md-0 col-12 order-1">
                        <div className="pbmit-heading-desc">
                          {section
                            .replace(/<img.*?>/g, "")
                            .replace(
                              /<figure.*?>(.*?)<\/figure>/g,
                              function (match, content) {
                                return content.replace(
                                  /<strong>(.*?)<\/strong>/g,
                                  '<strong style="font-weight: bold;">$1</strong>'
                                );
                              }
                            )
                            .replace(/<p>(.*?)/g, "")
                            .replace(/&nbsp;/g, "")}
                        </div>
                      </Col>
                      <Col md={6} xl={6}>
                        <div className="about-us_img1">
                          <Image
                            src={imageUrls[index] || ""}
                            className="img-fluid animate__animated animate__fadeInRight" // Animation class
                            alt=""
                          />
                        </div>
                      </Col>
                    </>
                  )}
                </div>
              ))}
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
