import React, { useState } from "react";
import { Container, Nav, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo1 from "../assets/img/logo-1.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="site-header header-style-2">
        <Container fluid>
          <div className="pbmit-header-content d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="site-navigation">
                <nav className="main-menu navbar-expand-xl navbar-light">
                  <div className="navbar-header">
                    <button
                      className="navbar-toggler"
                      type="button"
                      onClick={toggleMenu}
                    >
                      <i className="pbmit-base-icon-menu-1"></i>
                    </button>
                  </div>
                  <div className="pbmit-mobile-menu-bg"></div>
                  <div
                    className={`collapse navbar-collapse clearfix ${
                      isOpen ? "show" : ""
                    }`}
                    id="pbmit-menu"
                  >
                    <div className="pbmit-menu-wrap">
                      <ul className="navigation clearfix">
                        <li className="dropdown">
                          <NavLink to="/" exact activeClassName="active-link">
                            Home
                          </NavLink>
                        </li>
                        <li className="dropdown">
                          <NavLink to="/about" activeClassName="active-link">
                            About Us
                          </NavLink>
                        </li>
                        <li className="dropdown">
                          <NavLink to="/team" activeClassName="active-link">
                            The Team
                          </NavLink>
                        </li>
                        <li className="dropdown">
                          <NavLink
                            to="/specialty"
                            activeClassName="active-link"
                          >
                            Specialty
                          </NavLink>
                        </li>
                        <li className="dropdown">
                          <NavLink to="/services" activeClassName="active-link">
                            Services
                          </NavLink>
                        </li>
                        <li className="dropdown">
                          <NavLink
                            to="/knowledge"
                            activeClassName="active-link"
                          >
                            Knowledge Base
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/contact" activeClassName="active-link">
                            Contact Us
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
            <div className="pbmit-logo-menuarea d-flex align-items-center">
              <div className="site-branding">
                <h1 className="site-title">
                  <Link to="/">
                    <img className="pbmit-sticky-logo" src={logo1} alt="Yoge" />
                  </Link>
                </h1>
              </div>
            </div>
            <div className="pbmit-right-box d-flex align-items-center">
              <div className="pbmit-button-box-second">
                <a className="pbmit-btn" href="/bookanAppoinment">
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
                    <span className="pbmit-button-text">
                      <Link
                        to="/bookanAppoinment"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Make An Appointment
                      </Link>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </header>
      {/* Mobile menu */}
      <header className="site-header header-style-2">
        <Container fluid>
          <div className="pbmit-header-content d-flex justify-content-between align-items-center">
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
              <div className="sidebar-header">
                <Button className="close-button" onClick={toggleMenu}>
                  &times;
                </Button>
              </div>
              <Nav className="flex-column">
                <Nav.Item>
                  <NavLink
                    to="/"
                    exact
                    activeClassName="active-link"
                    onClick={toggleMenu}
                  >
                    Home
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/about"
                    activeClassName="active-link"
                    onClick={toggleMenu}
                  >
                    About Us
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/team"
                    activeClassName="active-link"
                    onClick={toggleMenu}
                  >
                    The Team
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/specialty"
                    activeClassName="active-link"
                    onClick={toggleMenu}
                  >
                    Specialty
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/services"
                    activeClassName="active-link"
                    onClick={toggleMenu}
                  >
                    Services
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/knowledge"
                    activeClassName="active-link"
                    onClick={toggleMenu}
                  >
                    Knowledge Base
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/contact"
                    activeClassName="active-link"
                    onClick={toggleMenu}
                  >
                    Contact Us
                  </NavLink>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
