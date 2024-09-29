import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import BackToTopButton from "../Components/Arrow";

const Service = () => {
  const [service, setService] = useState([]);
  const { state } = useLocation();
  let location = useLocation();
  const serviceId = location.state ? location.state.serviceId : null;
  const [specificservice, setSpecificService] = useState([]);
  const [link, setLink] = useState("");
  const [serviceheading, setServiceHeading] = useState("");
  const [author, setAuthor] = useState("");
  const [serviceimg, setServiceImg] = useState("");
  const [serviceDesc, setServiceDesc] = useState([]);
  const [textBeforeImage, setBeforeImageText] = useState("");
  const [blockquote, setBlockQuote] = useState("");
  const [h2, setH2] = useState("");
  const [textAfterImage, setAfterImageText] = useState("");

  const getServices = async () => {
    const spec1 = await axios.get(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/services`
    );
    setService(spec1.data);
    console.log(spec1.data);
    if (serviceId) {
      const spec = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/servicemanagement/${serviceId}`
      );
      console.log(spec);
      setServiceHeading(spec.data.ServiceName);

      setServiceDesc(spec.data.Detail);
      setServiceImg(extractImageUrl(spec.data.Detail));
      setLink(extractLink(spec.data.Detail));
      console.log(spec);
      setBlockQuote(extractBlockQuote(spec.data.Detail));
      const textBeforeImage = extractTextBeforeImage(spec.data.Detail);
      const textAfterImage = extractTextAfterImage(spec.data.Detail);
      setBeforeImageText(textBeforeImage);
      setAfterImageText(textAfterImage);
      setH2(extracth2(spec.data.Detail));
    } else {
      setServiceHeading(spec1.data[0].ServiceName);

      setServiceDesc(spec1.data[0].Detail);
      setServiceHeading(spec1.data[0].ServiceName);
      setServiceImg(extractImageUrl(spec1.data[0].Detail));
      setLink(extractLink(spec1.data[0].Detail));
      setBlockQuote(extractBlockQuote(spec1.data[0].Detail));
      const textBeforeImage = extractTextBeforeImage(spec1.data[0].Detail);
      const textAfterImage = extractTextAfterImage(spec1.data[0].Detail);
      setBeforeImageText(textBeforeImage);
      setAfterImageText(textAfterImage);
      setH2(extracth2(spec1.data[0].Detail));
      console.log(service);
    }
  };
  useEffect(() => {
    console.log("serrrrrvvvviiiiiiiccccceeeee", serviceId);
    getServices();
    console.log(service);
    console.log(serviceDesc);
    console.log(serviceheading);
    // }
  }, []);

  const handleServiceClick = async (specialityId) => {
    try {
      const specificdoctor = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/servicemanagement/${specialityId}`
      );
      const specificServiceData = specificdoctor.data;
      setSpecificService(specificServiceData);
      setServiceDesc(specificServiceData.Detail);
      setServiceHeading(specificServiceData.ServiceName);
      const textBeforeImage = extractTextBeforeImage(
        specificServiceData.Detail
      );
      const textAfterImage = extractTextAfterImage(specificServiceData.Detail);
      console.log(extractImageUrl(specificServiceData.Detail));
      console.log("anchor", extractLink(specificServiceData.Detail));
      setServiceImg(extractImageUrl(specificServiceData.Detail));
      setLink(extractLink(specificServiceData.Detail));
      setBlockQuote(extractBlockQuote(specificServiceData.Detail));
      setBeforeImageText(textBeforeImage);
      setAfterImageText(textAfterImage);
      setH2(extracth2(specificServiceData.Detail));
    } catch (error) {
      console.log(error);
    }
  };
  const extractTextBeforeImage = (htmlContent) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlContent;
    const imgElement = tempElement.querySelector("img");

    console.log(imgElement);

    if (!imgElement) return [];

    const paragraphs = [];
    let sibling = imgElement.parentElement.previousSibling;
    console.log("sibling bhaiss", sibling);

    while (sibling !== null) {
      if (sibling.tagName && sibling.tagName.toLowerCase() === "p") {
        paragraphs.unshift(sibling.textContent.trim());
        console.log("sibling bhai", sibling);
      }
      sibling = sibling.previousSibling;
    }
    console.log("paras", paragraphs);
    return paragraphs;
  };
  const extractTextAfterImage = (htmlContent) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlContent;
    const imgElement = tempElement.querySelector("img");

    if (!imgElement) return [];

    const paragraphs = [];
    let sibling = imgElement.parentNode.nextSibling;
    console.log("dusra sibling bhai ka", sibling);

    while (sibling !== null) {
      if (sibling.tagName && sibling.tagName.toLowerCase() === "p") {
        paragraphs.push(sibling.textContent.trim());
      }
      sibling = sibling.nextSibling;
    }

    return paragraphs;
  };

  const extractLink = (htmlContent) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlContent;
    const anchorElement = tempElement.querySelector("a");

    return anchorElement ? anchorElement.getAttribute("href") : null;
  };
  const extracth2 = (htmlContent) => {
    try {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = htmlContent;

      const h2Content = tempElement
        .querySelector("h2 i strong")
        .textContent.trim();
      return h2Content;
    } catch (err) {
      console.log("errorro", err);
    }
  };
  const extractImageUrl = (htmlContent) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlContent;
    const imgElement = tempElement.querySelector("img");
    return imgElement ? imgElement.getAttribute("src") : null;
  };
  const extractBlockQuote = (htmlContent) => {
    try {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = htmlContent;
      const imgElement = tempElement.querySelector("img");

      console.log(imgElement);

      if (!imgElement) return [];

      const paragraphs = [];
      let sibling = imgElement.parentElement.previousSibling;
      console.log("sibling bhaiss", sibling);

      while (sibling !== null) {
        if (sibling.tagName && sibling.tagName.toLowerCase() === "blockquote") {
          paragraphs.unshift(sibling.textContent.trim());
          console.log("sibling bhai", sibling);
        }
        sibling = sibling.previousSibling;
      }
      console.log("paras", paragraphs);
      if (paragraphs) {
        const blockquoteContent = paragraphs[0];
        setAuthor(blockquoteContent.split("-")[1]);
      }
      let paragraphs1 = paragraphs[0].split("-")[0];

      return paragraphs1;
    } catch (error) {
      console.error("Error extracting blockquote:", error);
      return null;
    }
  };
  const renderHtmlContent = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    const blockquoteElements = tempElement.querySelectorAll("blockquote");
    const imgelements = tempElement.querySelectorAll("img");

    imgelements.forEach((imgele) => {
      imgele.classList.add("serviceimg1");
    });
    blockquoteElements.forEach((blockquoteElement) => {
      blockquoteElement.classList.add("blockquote1");
      let blockquoteText = blockquoteElement.textContent.trim();
      const authorIndex = blockquoteText.lastIndexOf("-");
      blockquoteText = blockquoteText.replace("-", "").trim();

      if (authorIndex !== -1) {
        const authorText = blockquoteText.slice(authorIndex + 1).trim();
        blockquoteElement.innerHTML = blockquoteText.replace(
          authorText,
          `<cite style="color: blue; font-size: 14px;font-weight: 500;color: var(--pbmit-global-color);display: block;line-height: 24px;margin-top: 15px;">-<span>&nbsp</span>${authorText}</cite>`
        );
      }
    });

    return { __html: tempElement.innerHTML };
  };
  return (
    <>
      <div className="pbmit-title-bar-wrapper">
        <Container>
          <div className="pbmit-title-bar-content">
            <div className="pbmit-title-bar-content-inner">
              <div className="pbmit-tbar">
                <div className="pbmit-tbar-inner">
                  <h1 className="pbmit-tbar-title">Services</h1>
                </div>
              </div>
              <div className="pbmit-breadcrumb">
                <div className="pbmit-breadcrumb-inner">
                  <span>
                    <Link title="Home" to="/" className="home">
                      <span>Home</span>
                    </Link>
                  </span>
                  <span className="sep">
                    <i className="pbmit-base-icon-angle-double-right"></i>
                  </span>
                  <span>
                    <Link title="Services" to="/services" className="home">
                      <span>Services</span>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <BackToTopButton />
      </div>
      <div className="page-content">
        <section className="pbmit-team-single pbmit-sticky-section">
          <Container className="p-5">
            <div className="pbmit-team-single-info">
              <Row>
                <Col
                  lg={3}
                  // xl={3}
                  className="service-left-col sidebars site_content service_details"
                >
                  <aside className="service-sidebars">
                    <aside className="widget post-list">
                      <h2 className="widget-title">Services</h2>
                      <div className="all-post-list">
                        <ul
                          className="nav nav-tabs"
                          id="serviceTabs"
                          role="tablist"
                        >
                          {service.map((item, index) => (
                            <li
                              className="nav-item"
                              role="presentation"
                              key={index}
                            >
                              <a
                                className={
                                  index === 0
                                    ? "border-0 nav-link  "
                                    : "border-0 nav-link"
                                }
                                id={`serviceTab${index}`}
                                data-toggle="tab"
                                href="#cont_Id"
                                role="tab"
                                aria-controls={`service${index}`}
                                aria-selected={index === 0 ? "true" : "false"}
                                onClick={() => handleServiceClick(item._id)}
                              >
                                {item.ServiceName}
                              </a>
                            </li>
                          ))}{" "}
                        </ul>
                      </div>
                    </aside>
                  </aside>
                </Col>

                <Col md={12}  lg={9} className="p-5">
                  <div className="tab-content blog-details">
                    <div
                      className="tab-pane fade show active"
                      id="cont_Id"
                      role="tabpanel"
                      aria-labelledby="ChronicDiseaseManagementTab"
                    >
                      <Col
                        lg={9}
                        className="service-right-col pbmit-entry-content"
                      >
                        <div className="pbmit-entry-content ">
                          <div>
                            <p className="pbmit-firstletter">
                              {serviceDesc && (
                                <div
                                  dangerouslySetInnerHTML={renderHtmlContent(
                                    serviceDesc
                                  )}
                                />
                              )}
                            </p>
                          </div>
                        </div>
                      </Col>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default Service;
