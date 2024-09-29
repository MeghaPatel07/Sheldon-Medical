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

// import {
//   createNewProject, uploadproductImage,
// } from "../../functions/NewProject/Projectfunc";
import {
    // createSpecialityManagement,uploadproductImage,removeSpecialityManagement,listSpecialityManagement,updateSpecialityManagement,getSpecialityManagement,
    getNewSpecialityByParam,getNewServiceByParam,getServiceManagement,updateServiceManagement,listServiceManagement,removeServiceManagement,createServiceManagement,uploadproductImage
    
} from "../../functions/ServiceManagement/ServiceManagement"
const Inquiry= () => {
    
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [productImage, setproductImage] = useState("");
  const [productImage1, setproductImage1] = useState("");
//   const [description, setdescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [SpecialityName, setSpecialityName] = useState("");
  const [SpecialityValue, setSpecialityValue] = useState(""); 

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [inquiries,setInquiries]=useState([]);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");
   

  const [blogs, setBlogs] = useState([]);
  const [Name,setName] =useState("");
  const [Phone, setphone] =useState("");
  const [Email,setEmail] =useState("");
  const [BookingDate,setDate] =useState("")
  const [Alloted,setAlloted] =useState(false)
  const [DoctorName,SetDoctorName]= useState('')
  const [AllotedId,setAllotedId]=useState("")
  const[AllotmentDate,setAllotmentDate]=useState('')
  const[AllotmentTime,setAllotmentTime]=useState('')
  const [LabelSpecialityName, setLabelSpecialityName]=useState('')
  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handlePageChange = (page) => {
    setPageNo(page);
  };
    useEffect(() => {
        fetchInquiries();
      }, [pageNo, perPage, column, sortDirection, query, filter]);
    const fetchInquiries= async () => {
        setLoading(true);
        let skip = (pageNo - 1) * perPage;
        if (skip < 0) {
          skip = 0;
        }
        const defaultSortDirection = "asc";
        const defaultColumn = "Name"; 
    
        await axios
          .post(
            `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/inquiriesByParams`,
            {
              skip: skip,
              per_page: perPage,
              sorton: column || defaultColumn, // Use column or defaultColumn if column is undefined
              sortdir: sortDirection || defaultSortDirection, // Use sortDirection or defaultSortDirection if sortDirection is undefined
              match: query,
            }
          )
       
          .then((response) => {
            if (response.message!=="No entries found.") {
              console.log(response)
    
              let res = response[0];

             console.log(res)
                setLoading(false);
                setInquiries(res.data);
                setTotalRows(res.count);
         
              
             
            } else {
              setBlogs([]);
         
            }
            // console.log(res);
          });
    
        setLoading(false);
      };
      const col = [
        {
          name: "Sr No.",
          selector:(row,index)=>index+1,
          
          minWidth: "150px",
        },
        {
          name: "Name",
          cell: (row) => row.Name,
          sortable: true,
          sortField: "blogTitle",
          minWidth: "150px",
        },
        {
          name: "Email",
          cell: (row) => row.Email,
          sortable: true,
          sortField: "Speciality Name",
          minWidth: "150px",
        },
        {
          name: "Phone",
          cell: (row) =>  row.Phone,
          sortable: true,
          sortField: "blogTitle",
          minWidth: "150px",
        },
        {
          name: "Message",
          cell: (row) => row.Message,
          sortable: true,
          sortField: "serialNumber",
          minWidth: "150px",
        },
    
      ];

      return (
        <React.Fragment>
          <div className="page-content">
            <Container fluid>
              <BreadCrumb
                maintitle="Inquiry Management"
                title="Inquiry Management"
                pageTitle="Inquiry Management"
              />
      
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardHeader>
                      <Row className="g-4 mb-1">
                        <Col className="col-sm" lg={4} md={6} sm={6}>
                          <h2 className="card-title mb-0 fs-4 mt-2">
                            Inquiry Management
                          </h2>
                        </Col>
                        {/* Rest of the header content */}
                      </Row>
                    </CardHeader>
      
                    {/* ADD FORM */}
                    {/* Update and list sections */}
                  </Card>
                </Col>
              </Row>
      
              {/* DataTable section */}
              <div className="table-responsive table-card mt-1 mb-1 text-right">
                <DataTable
                  columns={col}
                  data={inquiries}
                  progressPending={loading}
                  sortServer
                  onSort={(column, sortDirection, sortedRows) => {
                    handleSort(column, sortDirection);
                  }}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRows}
                  paginationRowsPerPageOptions={[10, 50, 100, totalRows]}
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                />
              </div>
      
              {/* Remove Modal */}
              {/* Modal section */}
            </Container>
          </div>
      
          {/* Remove Modal */}
        </React.Fragment>
      );
}
export default Inquiry;
