import React from "react";
import { Container, Row, Col, Nav, Image } from "react-bootstrap";
import logo1 from "../assets/img/logo-1.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="pbmit-footer-big-area-wrapper">
        <div className="footer-wrap pbmit-footer-big-area">
          <Container>
            <Row>
              <Col md={12} xl={4}></Col>
              <Col md={12} xl={8} className="pbmit-footer-right">
                <h3 className="pbmit-title">
                  From routine check-ups to advanced treatments, your health is
                  our priority.
                </h3>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="pbmit-footer-widget-area">
        <Container>
          <Row>
            <Col md={6} lg={3} className="pbmit-footer-widget-col-1">
              <aside className="widget widget_text">
                <div className="textwidget">
                  <div className="pbmit-footer-logo">
                    <Link to="/"><Image src={logo1} alt="" /></Link>
                  </div>
                  <div className="pbmit-footer-text">
                    At Sheldone Medical Care, your well-being is our priority.
                    Experience compassionate healthcare tailored to your needs.
                    Trust our dedicated team for expert medical attention.
                  </div>
                </div>
              </aside>
            </Col>
            <Col md={6} lg={3} className="pbmit-footer-widget-col-2">
              <div class="widget">
                <h2 class="widget-title">Useful Link</h2>
                <div class="textwidget">
                  <ul>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/team">Team</Link>
                    </li>
                    <li>
                      <Link to="/specialty">Speciality</Link>
                    </li>
                    <li>
                      <Link to="/services">Services</Link>
                    </li>
                    <li>
                      <Link to="/knowledge">Knowledge Base</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} className="pbmit-footer-widget-col-3">
              <div className="widget">
                <h2 className="widget-title">Working Time</h2>
                <div className="pbmit-timelist-wrapper">
                  <ul className="pbmit-timelist-list">
                    <li>
                      <span className="pbmit-timelist-li-title">
                        Monday to Friday - 08:00 am - 05:00 pm
                      </span>
                    </li>
                    <li>
                      <span className="pbmit-timelist-li-title">
                        Saturday & Sunday - Holiday
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} className="pbmit-footer-widget-col-4">
              <aside className="widget">
                <h2 className="widget-title">Our address</h2>
                <div className="pbmit-contact-widget-line pbmit-contact-widget-address">
                  Address 1: 2435 JEROME AVE, BRONX, NY 10468
                </div>
                <div className="pbmit-contact-widget-line pbmit-contact-widget-address">
                  Address 2: 651 ACADEMY ST, NEW YORK, NY 10034
                </div>
              </aside>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="pbmit-footer-text-area">
        <Container>
          <div className="pbmit-footer-text-inner">
            <Row>
              <Col md={6}>
                <div className="pbmit-footer-copyright-text-area">
                  Designed By:{" "}
                  <a
                    href="https://www.barodaweb.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Barodaweb: The E-Catalogue Designer
                  </a>
                </div>
              </Col>
              <Col md={6}>
                <div className="pbmit-footer-copyright-text-area copyright-custom">
                  Copyright © 2024 <Link to="/">Sheldon Medical Care</Link>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
