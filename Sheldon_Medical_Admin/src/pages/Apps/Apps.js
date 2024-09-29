
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import axios from "axios";
import DataTable from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";




import "../New.css"
const Apps = () => {



  document.title = "Sheldon Medical | Knowledge Base";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Apps" title="Apps"  />

          <Row>
            <Col lg={12}>
              <Card className="p-3">
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Apps</h2>
                    </Col>
                    
                 
                  </Row>
                  <Row style={{marginTop:'40px', gap:'10px'}}>
                    
                            <Col >
                                <Row className="row-class">
                                    <Col lg={3}>
                                    <div class="app-cover"><img src="https://app-registry-assets.screencloudapp.com/icons/img_app_icon_clock.png" className="h-100 w-100" /></div>
                                    </Col>
                                    <Col lg={9}>
                                    <div class="app-title"><h3 class="title">Clock</h3><div data-testid="Clock-instance-count" class="instance-count"><span>1 instance added</span></div></div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col >
                                <Row className="row-class">
                                    <Col lg={3}>
                                    <div class="app-cover"><img src="https://app-registry-assets.screencloudapp.com/icons/img_app_icon_weather.png" className="h-100 w-100" /></div>
                                    </Col>
                                    <Col lg={9}>
                                    <div class="app-title"><h3 class="title">Weather</h3><div data-testid="Clock-instance-count" class="instance-count"><span>1 instance added</span></div></div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col >
                                <Row className="row-class">
                                    <Col lg={3}>
                                    <div class="app-cover"><img src="https://screencloud.cdn.prismic.io/screencloud/133045c2-86b3-4510-a5de-35baa234c848_Youtube.svg" className="h-100 w-100" /></div>
                                    </Col>
                                    <Col lg={9}>
                                    <div class="app-title"><h3 class="title">Youtube</h3><div data-testid="Clock-instance-count" class="instance-count"><span>1 instance added</span></div></div>
                                    </Col>
                                </Row>
                            </Col>
                           <Row>
                             <Col  lg={4}>
                                <Row className="row-class">
                                    <Col lg={3}>
                                    <div class="app-cover"><img src="https://screencloud.cdn.prismic.io/screencloud/204d2f58-f478-4ae9-b9ba-7acb272f49d7_Embed+App.svg" className="h-100 w-100" /></div>
                                    </Col>
                                    <Col lg={9}>
                                    <div class="app-title"><h3 class="title">Embedded Apps</h3><div data-testid="Clock-instance-count" class="instance-count"><span>1 instance added</span></div></div>
                                    </Col>
                                </Row>
                            </Col>
                         
                           </Row>
                        
                  </Row>
                </CardHeader>

                {/* ADD FORM  */}
              
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
     
    </React.Fragment>
  );
};

export default Apps;
