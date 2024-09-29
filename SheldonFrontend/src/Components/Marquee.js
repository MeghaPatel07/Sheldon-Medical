import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { Container } from "react-bootstrap";

const SpecialtiesSlider = () => {
  return (
    <section>
      <Container className="fluid p-0">
        <div className="swiper-slider marquee">
          <div className="swiper-wrapper">
            {/* <!-- Slide1 --> */}
            <div className="swiper-slide">
              <article className="pbmit-marquee-effect-style-1">
                <div className="pbmit-tag-wrapper">
                  <h2 className="pbmit-element-title" data-text="Cardiology">
                    Cardiology
                  </h2>
                </div>
              </article>
            </div>
            {/* <!-- Slide2 --> */}
            <div className="swiper-slide">
              <article className="pbmit-marquee-effect-style-1">
                <div className="pbmit-tag-wrapper">
                  <h2 className="pbmit-element-title" data-text="	Urology">
                    Urology
                  </h2>
                </div>
              </article>
            </div>
            {/* <!-- Slide3 --> */}
            <div className="swiper-slide">
              <article className="pbmit-marquee-effect-style-1">
                <div className="pbmit-tag-wrapper">
                  <h2 className="pbmit-element-title" data-text="Ophthalmology">
                    Ophthalmology
                  </h2>
                </div>
              </article>
            </div>
            {/* <!-- Slide4 --> */}
            <div className="swiper-slide">
              <article className="pbmit-marquee-effect-style-1">
                <div className="pbmit-tag-wrapper">
                  <h2 className="pbmit-element-title" data-text="Podiatry">
                    Podiatry
                  </h2>
                </div>
              </article>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SpecialtiesSlider;
