import React, { useState, useEffect } from "react";
import { Accordion, Card, Container, Image } from "react-bootstrap";
import axios from "axios";

const KnowledgeBase = () => {
  const [dataDesc, setDataDesc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/knowledgebase`
        );
        setDataDesc(response.data);
      } catch (error) {
        console.error("Error fetching knowledge base data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="section-lgb">
      <Container>
        <div className="pbmit-heading-subheading">
          <div className="knowledgeDiv">
          <h4 className="pbmit-subtitle">Knowledge Base</h4>
          </div>
          
          <h2 className="pbmit-title">Questions</h2>
        </div>
        <Accordion defaultActiveKey="0">
          {dataDesc.map((item, index) => (
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
                  <span className="pbmit-global-color">{index + 1}.</span>{" "}
                  {item.Title}
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <div dangerouslySetInnerHTML={{ __html: item.Detail }} />
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
      </Container>
    </section>
  );
};

export default KnowledgeBase;
