import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../assets/img/banner-1.jpg";
import banner2 from "../assets/img/banner-2.jpg";
import banner3 from "../assets/img/banner-3.jpg";
import InnerBox from "./InnerBox";
import AboutUs from "./AboutUs";
import Marquee from "./Marquee";
import Service from "./Service";
import Team from "./Team";
import Testimonial from "./Testimonial";
import KnowledgeBase from "./KnowledgeBase";
import ContactSection from "./ContactSection";
import "../assets/css/responsive.css";
import BackToTopButton from "./Arrow";

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <div className="header-style-2">
        <div className="pbmit-slider-area pbmit-slider-one">
          <Slider {...settings}>
            <div className="pbmit-slider-item">
              <div
                className="pbmit-slider-bg"
                style={{ backgroundImage: `url(${banner1})` }}
              ></div>
              <Container>
                <Row className="text-center">
                  <Col md={12}>
                    <div className="pbmit-slider-content">
                      <h5 className="pbmit-sub-title transform-top transform-delay-1">
                        Welcome to Sheldon Medical Care
                      </h5>
                      <h2 className="pbmit-title transform-bottom transform-delay-2">
                        We provide a wide range of services: Primary Care,
                        Specialty Care, Employment and Immigration Medical Exam{" "}
                        <br />
                        <strong>Primary Care</strong>
                      </h2>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>

            <div className="pbmit-slider-item">
              <div
                className="pbmit-slider-bg"
                style={{ backgroundImage: `url(${banner2})` }}
              ></div>
              <Container>
                <Row className="text-center">
                  <Col md={12}>
                    <div className="pbmit-slider-content">
                      <h5 className="pbmit-sub-title transform-top transform-delay-1">
                        Welcome to Sheldon Medical Care
                      </h5>
                      <h2 className="pbmit-title transform-bottom transform-delay-2">
                        We accept WALK INS at both locations!!
                      </h2>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>

            <div className="pbmit-slider-item">
              <div
                className="pbmit-slider-bg"
                style={{ backgroundImage: `url(${banner3})` }}
              ></div>
              <Container>
                <Row className="text-center">
                  <Col md={12}>
                    <div className="pbmit-slider-content">
                      <h5 className="pbmit-sub-title transform-top transform-delay-1">
                        Welcome to Sheldon Medical Care
                      </h5>
                      <h2 className="pbmit-title transform-bottom transform-delay-2">
                        “Your Health is our Priority!
                      </h2>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Slider>
        </div>
      </div>

      <InnerBox />
      <AboutUs />
      <Marquee />
      <Service />
      <Team />

      <Testimonial />
      <KnowledgeBase />
      <ContactSection />
      <BackToTopButton />
    </>
  );
};

export default SliderComponent;
