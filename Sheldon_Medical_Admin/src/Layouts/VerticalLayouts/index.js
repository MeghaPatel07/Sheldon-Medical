import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Collapse } from "reactstrap";
import { Navigate } from "react-router-dom";
// Import Data
import navdata from "../LayoutMenuData";
//i18n
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/Common/withRouter";

const VerticalLayout = (props) => {
  const navigate =useNavigate();
  const [locationSetup, setLocationSetup] = useState(false);
  const [setup, setSetup] = useState(false);
  const [params, setParams] = useState(false);
  const[booking,setbooking]=useState(false)
  const [product, setproduct] = useState(false);
  const [order, setOrder] = useState(false);
  const [category, setCategory] = useState(false);
  const [subs, setSubs] = useState(false);
  const [inquiry, setInquiry] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [cms, setCMS] = useState(false);
  const [cmsmaster, setCMSMaster] = useState(false);
  const [parameters, setParameters] = useState(false);
  const navData = navdata().props.children;
  const path = props.router.location.pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + path;
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === "vertical") {
      initMenu();
    }
  }, [path, props.layoutType]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        if (
          parentCollapseDiv.parentElement.closest(".collapse")
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.classList.add("active");
        if (
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
        ) {
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .classList.add("show");
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .previousElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  return (
    <React.Fragment>
      {/* menu Items */}
      <li className="menu-title">
        <span data-key="t-menu">Menu</span>
      </li>

      {/* <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setSetup(!setup);
          }}
        >
          <span data-key="t-apps"> SpecialityManagement </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={setup}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/company-details" className="nav-link">
                Company Details
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin-user" className="nav-link">
                Admin Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/#" className="nav-link">
                Roles
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="#"
                data-bs-toggle="collapse"
                onClick={() => {
                  setLocationSetup(!locationSetup);
                }}
              >
                <span data-key="t-apps"> Location Setup </span>
              </Link>
              <Collapse
                className="menu-dropdown"
                isOpen={locationSetup}
                //   id="sidebarApps"
              >
                <ul className="nav nav-sm flex-column test">
                  <li className="nav-item">
                    <Link to="/country" className="nav-link">
                      Country
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/state" className="nav-link">
                      State
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/city" className="nav-link">
                      City
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/location" className="nav-link">
                      Company Location
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
        </Collapse>
      </li> */}
      {/* <li className="nav-item">
  <Link
    className="nav-link menu-link"
    to="/Dashboard" // Specify the desired destination here
    onClick={(e) => {
      navigate("/Dashboard") // Prevent default link behavior
    }}
  >
    <span data-key="t-apps">Dashboard</span>
  </Link>
</li> */}

<li className="nav-item">
  <Link
    className="nav-link menu-link"
    to="/admin-user" // Specify the desired destination here
    onClick={(e) => {
      navigate("/admin-user") // Prevent default link behavior
    }}
  >
    <span data-key="t-apps">Admin User</span>
  </Link>
</li>
<li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
           setSetup(!setup)
          }}
        >
          <span data-key="t-apps"> setup </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={setup}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="/company-details"
                data-bs-toggle="collapse"
               
              >
                <span data-key="t-apps"> Company Details</span>
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
<li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
           setParameters(!parameters)
          }}
        >
          <span data-key="t-apps"> Parameters </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={parameters}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              {/* <Link
                className="nav-link menu-link"
                to="/company-details"
                data-bs-toggle="collapse"
               
              >
                <span data-key="t-apps"> Company Details</span>
              </Link> */}
              <li>
              <Link
                className="nav-link menu-link"
                to="/speciality-management"
                data-bs-toggle="collapse"
               
              >
                <span data-key="t-apps"> Speciality Management</span>
              </Link>
              </li>

             <li>
             <Link
                className="nav-link menu-link"
                to="/doctormanagement"
                data-bs-toggle="collapse"
                
              >
                <span data-key="t-apps">Doctor Management</span>
              </Link>
             </li>
             <li>
             <Link
                className="nav-link menu-link"
                to="/service-management"
                data-bs-toggle="collapse"
                
              >
                <span data-key="t-apps">Service Management</span>
              </Link>
             </li>
            </li>
          </ul>
        </Collapse>
      </li>

{/* <li className="nav-item">
  <Link
    className="nav-link menu-link"
    to="/speciality-management" // Specify the desired destination here
    onClick={(e) => {
      navigate("/speciality-management") // Prevent default link behavior
    }}
  >
    <span data-key="t-apps">Speciality Management</span>
  </Link>
</li>
<li className="nav-item">
  <Link
    className="nav-link menu-link"
    to="/doctormanagement" // Specify the desired destination here
    onClick={(e) => {
      navigate("/doctormanagement") // Prevent default link behavior
    }}
  >
    <span data-key="t-apps">Doctor Management</span>
  </Link>
</li> */}
{/* <li className="nav-item">
  <Link
    className="nav-link menu-link"
    to="/clock" // Specify the desired destination here
    onClick={(e) => {
      navigate("/clock") // Prevent default link behavior
    }}
  >
    <span data-key="t-apps">clock</span>
  </Link>
</li> */}
{/* <li className="nav-item">
  <Link
    className="nav-link menu-link"
    to="/add-doctormanagement" // Specify the desired destination here
  
  >
    <span data-key="t-apps">Add Doctor Management</span>
  </Link>
</li> */}
{/* <li className="nav-item">
  <Link
    className="nav-link menu-link"
    to="/service-management" // Specify the desired destination here
    onClick={(e) => {
      navigate("/service-management") // Prevent default link behavior
    }}
  >
    <span data-key="t-apps">Service Management</span>
  </Link>
</li> */}
{/* <li className="nav-item">
  <Link
    className="nav-link menu-link"
    to="/knowledge-base" // Specify the desired destination here
    onClick={(e) => {
      navigate("/knowledge-base") // Prevent default link behavior
    }}
  >
    <span data-key="t-apps">Knowledge Base</span>
  </Link>
</li> */}
<li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
           setbooking(!booking)
          }}
        >
          <span data-key="t-apps"> Booking Management </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={booking}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="/booking-management"
                data-bs-toggle="collapse"
               
              >
                <span data-key="t-apps"> Add/View/Edit</span>
              </Link>
             <li>
             <Link
                className="nav-link menu-link"
                to="/report"
                data-bs-toggle="collapse"
                
              >
                <span data-key="t-apps"> Report</span>
              </Link>
             </li>
            </li>
          </ul>
        </Collapse>
      </li>


      {/* <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setParams(!params);
          }}
        >
          <span data-key="t-apps"> Parameters </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={params}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="#"
                data-bs-toggle="collapse"
                onClick={() => {
                  setCategory(!category);
                }}
              >
                <span data-key="t-apps"> Category Master</span>
              </Link>
              <Collapse className="menu-dropdown" isOpen={category}>
                <ul className="nav nav-sm flex-column test">
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/category">
                      <span data-key="t-apps">Products Category </span>
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setproduct(!product);
          }}
        >
          <span data-key="t-apps"> Product Master </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={product}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/product-details" className="nav-link">
                Product Details
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setPolicy(!policy);
          }}
        >
          <span data-key="t-apps"> Policy and Promos</span>
        </Link>
        <Collapse className="menu-dropdown" isOpen={policy}>
          <ul className="nav nav-sm flex-column test"></ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/promocode-master" className="nav-link">
                Promocode Master
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test"></ul>
        </Collapse>
      {/* </li> */}

      {/* <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setCMS(!cms);
          }}
        >
          <span data-key="t-apps"> CMS </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={cms}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/blogs">
                <span data-key="t-apps">Blogs </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/banner">
                <span data-key="t-apps">Banner </span>
              </Link>
            </li>
          </ul>
        </Collapse>
      </li> */}
      {/* <li className="nav-item">
  <Link
    className="nav-link menu-link"
    to="/cms-sheldon" // Specify the desired destination here
    // onClick={(e) => {
    //   navigate("/cms-sheldon") // Prevent default link behavior
    // }}
  >
    <span data-key="t-apps">CMS</span>
  </Link>
</li> */}
{/* <li className="nav-item">
  <Link
    className="nav-link menu-link"
    to="/Apps" // Specify the desired destination here
    // onClick={(e) => {
    //   navigate("/cms-sheldon") // Prevent default link behavior
    // }}
  >
    <span data-key="t-apps">Apps</span>
  </Link>
</li> */}
<li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
           setCMSMaster(!cmsmaster)
          }}
        >
          <span data-key="t-apps"> CMS Master </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={cmsmaster}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="/knowledge-base"
                data-bs-toggle="collapse"
               
              >
                <span data-key="t-apps">Knowledge Base</span>
              </Link>
             <li>
             <Link
                className="nav-link menu-link"
                to="/cms-sheldon"
                data-bs-toggle="collapse"
                
              >
                <span data-key="t-apps"> CMS</span>
              </Link>
             </li>
            </li>
          </ul>
        </Collapse>
        <li>
             <Link
                className="nav-link menu-link"
                to="/inquiry"
                data-bs-toggle="collapse"
                
              >
                <span data-key="t-apps">Inquiries</span>
              </Link>
             </li>
             <li>
             <Link
                className="nav-link menu-link"
                to="/Locations"
                data-bs-toggle="collapse"
                
              >
                <span data-key="t-apps">Location Management</span>
              </Link>
             </li>
             <li>
             <Link
                className="nav-link menu-link"
                to="/Testimonial"
                data-bs-toggle="collapse"
                
              >
                <span data-key="t-apps">Testimonial Management</span>
              </Link>
             </li>
      </li>
    </React.Fragment>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(VerticalLayout));
