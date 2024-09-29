import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, Card, Container, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackToTopButton from "../Components/Arrow";

const KnowledgeBase = () => {
  const [knowledge, setKnowledgeBase] = useState([]);

  const getKnowledge = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/knowledgebase`
      );
      setKnowledgeBase(response.data);
    } catch (error) {
      console.error("Error fetching knowledge base data:", error);
    }
  };

  useEffect(() => {
    getKnowledge();
  }, []);

  return (
    <>
      <div className="pbmit-title-bar-wrapper">
        <Container>
          <div className="pbmit-title-bar-content">
            <div className="pbmit-title-bar-content-inner">
              <div className="pbmit-tbar">
                <div className="pbmit-tbar-inner container">
                  <h1 className="pbmit-tbar-title">Knowledge Base</h1>
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
                    <Link title="Services" to="/knowledge" className="home">
                      <span>Knowledge Base</span>
                    </Link>
                  </span>
                </div>
              </div>{" "}
            </div>
          </div>
        </Container>
      </div>
      <div className="page-content">
        <section className="sec-padding">
          <Container>
            <Row className="g-0 align-items-center">
              <Col md={12} lg={12} xl={12}>
                <div className="faq-left_box m-0">
                  <div className="pbmit-heading-subheading">
                    <h4 className="pbmit-subtitle mt-5">Knowledge Base</h4>
                    <h2 className="pbmit-title">General Questions</h2>
                  </div>
                  <Accordion defaultActiveKey="0">
                    {knowledge.map((item, index) => (
                      <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header>
                          <span className="pbmit-accordion-icon pbmit-accordion-icon-right">
                            <span className="pbmit-accordion-icon-closed">
                              <i className="fa fa-angle-up"></i>
                            </span>
                            <span className="pbmit-accordion-icon-opened">
                              <i className="fa fa-angle-down"></i>
                            </span>
                          </span>
                          <span className="pbmit-accordion-title">
                            <span className="pbmit-global-color">
                              {index + 1}.
                            </span>{" "}
                            {item.Title}
                          </span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div
                            dangerouslySetInnerHTML={{ __html: item.Detail }}
                          />
                          {item.UploadFile && (
                            <Image
                              src={`${process.env.REACT_APP_API_URL_SHELDON}/${item.UploadFile}`}
                              alt="Image"
                            />
                          )}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <BackToTopButton />
    </>
  );
};

export default KnowledgeBase;
