import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const InnerBox = () => {
  const [faxNumbers, setFaxNumbers] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [addressItems, setAddressItems] = useState([]);

  const getLocations = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/CompanyAddressAll`
      );
      setAddressItems(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const getContactUsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/cms/get/contactusdetail/65f131a0028849922f0512ab`
      );
      const contactUsDetail = response.data.cmsContactUsDetailContent;

      const faxNumberRegex = /FAX: (\d{3}-\d{3}-\d{4})/g;
      const phoneNumberRegex = /PH: (\d{3}-\d{3}-\d{4})/g;

      const faxNumbersArray = [];
      const phoneNumbersArray = [];

      let match;
      while (
        (match = faxNumberRegex.exec(contactUsDetail.ContactUsDetail)) !== null
      ) {
        faxNumbersArray.push(match[1]);
      }

      while (
        (match = phoneNumberRegex.exec(contactUsDetail.ContactUsDetail)) !==
        null
      ) {
        phoneNumbersArray.push(match[1]);
      }

      setFaxNumbers(faxNumbersArray);
      setPhoneNumbers(phoneNumbersArray);
    } catch (error) {
      console.error("Error fetching contact us data:", error);
    }
  };

  useEffect(() => {
    getContactUsData();
    getLocations();
  }, []);

  return (
    <section className="section-xl inner-box_area">
      <Container>
        <Row>
          <Col md={6} lg={4} className="position-relative">
            <div className="pbmit-widget_icon">
              <div className="pbmit_icon">
                <i class="pbmit-xcare-icon pbmit-xcare-icon-appointment"></i>{" "}
              </div>
            </div>
            <div className="inner-box_style inner-box_1">
              <div className="pbmit-heading_title">
                <h5>Schedule Hours</h5>
              </div>
              <ul className="pbmit-timelist-list">
                <li>
                  <span className="pbmit-timelist-li-title">
                    Monday to Friday
                  </span>
                  <span className="pbmit-timelist-li-value">
                    08:00 am - 05:00 pm
                  </span>
                </li>
                <li>
                  <span className="pbmit-timelist-li-title">
                    Saturday & Sunday
                  </span>
                  <span className="pbmit-timelist-li-value">Closed</span>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={6} lg={4} className="position-relative">
            <div className="pbmit-widget_icon">
              <div className="pbmit_icon">
                <i class="pbmit-xcare-icon pbmit-xcare-icon-placeholder"></i>{" "}
              </div>
            </div>
            <div className="inner-box_style inner-box_2">
              <div className="pbmit-heading_title">
                <h5>Our Location</h5>
              </div>
              {addressItems.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="pbmit-text_aditor">
                    Address: {index + 1} - {item.CompanyAddress}
                    <br />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </Col>
          <Col md={6} lg={4} className="position-relative">
            <div className="pbmit-widget_icon">
              <div className="pbmit_icon">
                <i class="pbmit-xcare-icon pbmit-xcare-icon-doctor"></i>{" "}
              </div>
            </div>
            <div className="inner-box_style inner-box_3">
              <div className="pbmit-bg_overlay"></div>
              <div className="pbmit-heading_title">
                <h5>Contact</h5>
              </div>
              <div className="pbmit-ihbox-style-19">
                <div className="pbmit-ihbox-box">
                  <div className="pbmit-text_aditor">
                  {phoneNumbers.map((detail, index) => (
                      <span key={index}>
                        <span>Number: {detail}</span><br />
                        <span>FAX: {faxNumbers[index]}</span><br/>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    
  );
};

export default InnerBox;
