import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import testi from "../assets/img/testi.png";
import { Container, Image } from "react-bootstrap";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  const getTestimonials = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/testimonials`
      );
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  // const truncateText = (text, maxLines, maxCharsPerLine) => {
  //   const maxLength = maxLines * maxCharsPerLine;
  //   return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  // };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
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
        <div className="position-relative">
          <div className="pbmit-heading-subheading animation-style2">
            <div className="knowledgeDiv">
            <h4 className="pbmit-subtitle">Testimonials</h4>
            </div>
            <h2 className="pbmit-title">Client Feedbacks</h2>
          </div>
          {/* React Slick Slider */}
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div className="swiper-slide" key={index}>
                <article className="pbmit-testimonial-style-1">
                  <div className="pbminfotech-post-item">
                    <div className="pbmit-box-content-wrap">
                      <div className="pbminfotech-box-star-ratings">
                        {/* {Array(testimonial.rating)
                          .fill()
                          .map((_, i) => (
                            <i
                              key={i}
                              className="pbmit-base-icon-star-1 pbmit-active"
                            ></i>
                          ))} */}
                        <i className="pbmit-base-icon-star-1 pbmit-active"></i>
                        <i className="pbmit-base-icon-star-1 pbmit-active"></i>
                        <i className="pbmit-base-icon-star-1 pbmit-active"></i>
                        <i className="pbmit-base-icon-star-1 pbmit-active"></i>
                        <i className="pbmit-base-icon-star-1 pbmit-active"></i>
                      </div>
                      <div className="pbminfotech-box-desc">
                        <blockquote className="pbminfotech-testimonial-text">
                          <p>{testimonial.Testimonial}</p>
                        </blockquote>
                      </div>
                      <div className="pbminfotech-box-author d-flex align-items-center">
                        <div className="pbminfotech-box-img">
                          <div className="pbmit-featured-img-wrapper">
                            <div className="pbmit-featured-wrapper">
                              <Image
                                src={testimonial.image || testi}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="pbmit-auther-content">
                          <h3 className="pbminfotech-box-title">
                            {testimonial.ClientName}
                          </h3>
                          <div className="pbminfotech-testimonial-detail"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
