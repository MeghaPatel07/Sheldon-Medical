import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Select from "react-select";
import "../Clock.css";

const Clock = () => {
  const optionsClock = [
    
    { value: "simple", label: "Simple" },
    { value: "digital", label: "Digital" },

  ];  
  const optionsLanguage = [
    { value: " English ", label: "English" }
 
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentTime, setCurrentTime] = useState(moment().format("hh:mm:ss A"));

  const handleSpecialityChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("hh:mm:ss A"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  document.title = "Sheldon Medical | Clock";

  // Define styles for the clocks
  const digitalClockStyle = {
    paddingTop:"100px",
    fontSize: "100px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#1a1a1a",
    fontFamily: "Roboto, sans-serif",

    
  };

  const simpleClockStyle = {
    paddingTop:"100px",
    fontSize: "100px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#1a1a1a",
    fontFamily: "Arial, sans-serif",
  };

  // Render digital clock
  const renderDigitalClock = () => {
    return (
      <div style={digitalClockStyle}>
        {currentTime}
      </div>
    );
  };

  // Render simple clock
  const renderSimpleClock = () => {
    return (
      <div style={simpleClockStyle}>
        {moment().format("hh:mm A")}
      </div>
    );
  };

  // Render clock based on selected option
  const renderClock = () => {
    if (selectedOption && selectedOption.value === "digital") {
      return renderDigitalClock();
    } 
    else if (selectedOption && selectedOption.value === "simple") {
      return renderSimpleClock();
    } 
    else {
      return renderDigitalClock();
    }
  };

  return (
    <React.Fragment>
     <div className="page-content" style={{ backgroundColor: "white", height: "650px" }}>
        <Container fluid>
          <BreadCrumb maintitle="Clock" title="Clock" pageTitle="Clock" />

          <Row className="justify-content-center" >
            <Col lg={5} >
              <Card className="h-100 bg-transparent" >
                <CardHeader>
                  <h2 className="card-title mb-0 fs-4 mt-2">Clock</h2>
                </CardHeader>
                <CardBody className="bg-transparent">
                  <Row className="mb-4">
                    <Col lg={12}>
                      <Label>Clock Style*</Label>
                      <Select
                       
                        name="opt"
                        id="opt"
                        value={selectedOption}
placeholder="Digital"
                        options={optionsClock}
                        onChange={handleSpecialityChange}
                      />
                    </Col>
                    <Col lg={12}>
                      <Label>Language</Label>
                      <Select
                        placeholder="Select option"
                        name="opt"
                        id="opt"
                        value={selectedLanguage}
                        options={optionsLanguage}
                        onChange={handleLanguageChange}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg={7}>
              
                  <Row className="mb-4">
                    <Col lg={12} className="digital-clock-container">
                      {/* Render clock based on selected option */}
                    
                      {renderClock()}
                    </Col>
                  </Row>
               
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Clock;
