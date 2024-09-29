import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Image } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import doc from "../assets/img/doc.jpg";

const Team = () => {
  const [specificdoctor, setSpecificSDoctor] = useState([]);

  const getDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/doctorsall`
      );
      setSpecificSDoctor(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="section-xl sec-1">
      <Container>
        <div className=" pbmit-heading-subheading text-center">
          <h4 className="pbmit-subtitle btn">Our Team</h4>
          <h2 className="pbmit-title">
            How We help you stay <br /> strong
          </h2>
        </div>
        <Slider {...settings}>
          {specificdoctor.map((member, index) => (
            <div
              key={member.id}
              className="pbmit-miconheading-style-18 swiper-slide"
            >
              <div className="pbmit-ihbox-style-18">
                <div className="pbmit-ihbox-headingicon">
                  <div className="pbmit-icon-wrap">
                    <div className="pbmit-ihbox-wrapper">
                      <div className="pbmit-ihbox-icon-type-image">
                        <Image
                          style={{ height:"325px" }}
                          src={
                            member.photo
                              ? `${process.env.REACT_APP_API_URL_SHELDON}/${member.photo}`
                              : doc
                          }
                        />
                      </div>
                    </div>
                    <div className="pbmit-ihbox-box-number">{index + 1}</div>
                  </div>
                  <div className="pbmit-ihbox-contents">
                    <h2
                      className="pbmit-element-title"
                      style={{ textTransform: "capitalize" }}
                    >
                      {member.DoctorName}
                    </h2>
                    {/* <div className="pbmit-heading-desc">{member.detail}</div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Team;
