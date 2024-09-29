import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Image } from "react-bootstrap";
import a1 from "../assets/img/a-1.jpg";
import a2 from "../assets/img/a-2.jpg";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [aboutUsSections, setAboutUsSections] = useState([]);
  const isTablet = useMediaQuery({ maxWidth:768 });
  const getAboutUsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/cms/get/aboutus/65f12f48250203b664ab84ea`
      );
      const cmsAboutUsContent = response.data.cmsAboutUsContent;
      const textSections = cmsAboutUsContent.AboutUsDetail.replace(
        /<img.*?\/?>/g,
        ""
      ).split("</p>");
      setAboutUsSections(textSections.filter((section) => section.trim()));
    } catch (error) {
      console.error("Error fetching about us data:", error);
    }
  };
  useEffect(() => {
    getAboutUsData();
  }, []);

  return (
    <section>
      <Container>
        {isTablet ?  
        (
         <Row className="g-0 align-items-center">
          <Col md={12} lg={6}>
            <div className="about-us-three_leftbox">
              <div className="pbmit-heading-subheading">
                <div className="knowledgeDiv">
                <h4 className="pbmit-subtitle">About Us</h4>
                </div>
                <h2 className="pbmit-title">Welcome to Sheldon Medical Care</h2>
                <div className="about-us-three_imgbox">
              <div className="pbmit-animation-style4 ">
                <Image src={a1} className="img-fluid" alt="About Us" />
              </div>
              <div className="pbmit-animation-style3 about-img_2">
                <Image src={a2} className="img-fluid" alt="About Us" />
              </div>
            </div>
                <div className="pbmit-heading-desc">
                  {aboutUsSections.map((section, index) => (
                    <div
                      className="about-us-content"
                      key={index}
                      dangerouslySetInnerHTML={{ __html: section }}
                    />
                  ))}
                </div>
              </div>
              <Link to="/about" className="pbmit-btn">
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
                  <span className="pbmit-button-text">Know More</span>
                </span>
              </Link>
            </div>
          </Col>
          {/* <Col md={12} lg={6}>
            <div className="about-us-three_imgbox">
              <div className="pbmit-animation-style4 ">
                <Image src={a1} className="img-fluid" alt="About Us" />
              </div>
              <div className="pbmit-animation-style3 about-img_2">
                <Image src={a2} className="img-fluid" alt="About Us" />
              </div>
            </div>
          </Col> */}
        </Row>
        )
        :
        (
          <Row className="g-0 align-items-center">
           <Col md={12} lg={6}>
             <div className="about-us-three_leftbox">
               <div className="pbmit-heading-subheading">
                 <div className="knowledgeDiv">
                 <h4 className="pbmit-subtitle">About Us</h4>
                 </div>
                 <h2 className="pbmit-title">Welcome to Sheldon Medical Care</h2>
                 <div className="pbmit-heading-desc">
                   {aboutUsSections.map((section, index) => (
                     <div
                       className="about-us-content"
                       key={index}
                       dangerouslySetInnerHTML={{ __html: section }}
                     />
                   ))}
                 </div>
               </div>
               <Link to="/about" className="pbmit-btn">
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
                   <span className="pbmit-button-text">Know More</span>
                 </span>
               </Link>
             </div>
           </Col>
           <Col md={12} lg={6}>
             <div className="about-us-three_imgbox">
               <div className="pbmit-animation-style4 ">
                 <Image src={a1} className="img-fluid" alt="About Us" />
               </div>
               <div className="pbmit-animation-style3 about-img_2">
                 <Image src={a2} className="img-fluid" alt="About Us" />
               </div>
             </div>
           </Col>
         </Row>
        )
           
         }
     
      </Container>
    </section>
  );
};

export default AboutUs;
