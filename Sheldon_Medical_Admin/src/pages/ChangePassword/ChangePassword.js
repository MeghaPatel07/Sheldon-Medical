
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
import Select from "react-select";
// import {
//   createNewProject, uploadproductImage,
// } from "../../functions/NewProject/Projectfunc";
import {
    createSpecialityManagement,removeSpecialityManagement,listSpecialityManagement,updateSpecialityManagement,getSpecialityManagement,getNewSpecialityByParam
} from "../../functions/SpecialityManagement/SpecialityManagement"

import {
  getCmsContactUsDetailById,getCmsAboutUsById,editCmsContactUsDetailContent,editCmsAboutUsContent,uploadproductImageAboutUs
} from "../../functions/CMS_Sheldon/cms_Sheldon"
const ChangePassword = () => {
  const [serialNumber, setserialNumber] = useState("");
  const [code, setcode] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [productName, setproductName] = useState("");

  const [solarrooftype, setsolarrooftype] = useState("");
  // const [capacity,setcapacity]=useState("");

  const [productImage, setproductImage] = useState("");
  const [productImage1, setproductImage1] = useState("");
  const [productPDF, setProductPDF] = useState("");
  const [description, setdescription] = useState("");
//   const [description, setdescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [SpecialityName, setSpecialityName] = useState("");
  const [UploadIcon,setUploadIcon]=useState("");
  const [UploadHomeIcon,setUploadHomeIcon]=useState("");
  const [Detail, setDetail] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
  const [blogThumnailDesc, setblogThumnailDesc] = useState("");
  const [views, setViews] = useState(0);

  const [likes, setlikes] = useState([]);
  const [comments, setcomments] = useState([]);
  const [userId, setuserId] = useState(localStorage.getItem("RCCoffeeAdmin"));
  const [IsActive, setIsActive] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [blogs, setBlogs] = useState([]);
  const handleChangeSpecilityName = (e) => {
    setSpecialityName(e.target.value);
  };
  const handleChangeDetail = (e) => {
    setDetail(e.target.value);
  };
  
  const handleImageChangeproductImage =(e)=>{
    setproductImage(e.target.files[0]);
  } 
  const handleImageChangeproductImage1 =(e)=>{
    setproductImage1(e.target.files[0]);
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  


  const [categories, setCategories] = useState([]);

  //   useEffect(() => {
  //     const fetchCategories = async () => {
  //       try {
  //         const result = await getallcategory();

  //         setCategories(result);
  //       } catch (error) {
  //         console.error("Error fetching categories:", error);
  //         // Optionally, set categories to an empty array in case of error
  //         setCategories([]);
  //       }
  //     };

  //     fetchCategories();
  //   }, []);

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);
    const handleTog_edit = (_id) => {
      setmodal_edit(!modal_edit);
      setIsSubmit(false);
      setUpdateForm(true);

      setIsSubmit(false);
      set_Id(_id);
      getSpecialityManagement(_id)
        .then((res) => {
          console.log("res", res);
          setSpecialityName(res.data.SpecialityName)
          console.log()
          // setserialNumber(res.data.serialNumber);
          // setcode(res.data.code);
          // setproductName(res.data.productName);
          // setCategoryID(res.data.categoryID);
          // setproductImage(res.data.productImage);
          // setProductPDF(res.data.productPDF);

          // setdescription(res.data.description);
          // setShortDescription(res.data.shortDescription);
        })
        .catch((err) => {
          console.log(err);
        });
    };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    // let errors = validate(
    //   serialNumber,
    //   categoryID,
    //   productImage,
    //   productPDF,
    //   productName,
    //   code
    // );
    // setFormErrors(errors);
    setIsSubmit(true);

    // if (Object.keys(errors).length === 0) {
    const formdata = new FormData();

    formdata.append("SpecialityName", SpecialityName);

    formdata.append("Detail", Detail);
    // formdata.append("capacity",setcapacity)
    console.log(productImage)
    console.log(productImage1)
    formdata.append("UploadHomeIcon", productImage1);
    formdata.append("UploadIcon", productImage);



    console.log("append", formdata);
    createSpecialityManagement(formdata)
      .then((res) => {
        console.log(res);
        // setmodal_list(!modal_list);
        setShowForm(false);
        // setValues(initialState);
        setCategoryID("");
        setserialNumber("");
        setsolarrooftype("");
    
        // setcapacity("");
        // setServiceName("");
        setSpecialityName("");
        setDetail("");
        setproductImage("");
        setproductImage1("");
        setCheckImagePhoto(false);
        setCheckImagePhoto1(false);
        setPhotoAdd("");
        setPhotoAdd1("");
        setcode("");
        setproductName("");
        setShortDescription("");
        setlikes([]);
        setcomments([]);
        setuserId("");
        setIsActive(false);
      
        setProductPDF("");
        setblogThumnailDesc("");
        setdescription("");
        setViews(0);
        setIsSubmit(false);
     
        setFormErrors({});
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

    const handleDelete = (e) => {
      e.preventDefault();
      removeSpecialityManagement(remove_id)
        .then((res) => {
          setmodal_delete(!modal_delete);
          fetchCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleUpdate = (e) => {
      e.preventDefault();
    
      setIsSubmit(true);
      const likesString = JSON.stringify(likes);
      const commentString = JSON.stringify(comments);
    
      const formdata = new FormData();
      console.log("logging ",SpecialityName,Detail,productImage1,productImage)
      formdata.append("SpecialityName", SpecialityName);
      formdata.append("Detail", Detail);
      formdata.append("UploadHomeIcon", productImage1);
      formdata.append("UploadIcon", productImage);
    
      updateSpecialityManagement(_id, formdata)
        .then((res) => {
          setmodal_edit(!modal_edit);
          setPhotoAdd("");
          setCheckImagePhoto(false);
          setCategoryID("");
          setserialNumber("");
          setcode("");
          setproductName("");
          setShortDescription("");
          setlikes([]);
          setcomments([]);
          setuserId("");
          setIsActive(false);
          setblogThumnailDesc("");
          setdescription("");
          setViews(0);
          setproductImage("");
          setProductPDF("");
          setSpecialityName(""); // Reset SpecialityName after update
          fetchCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
    

  const [errBT, setErrBT] = useState(false);
  const [errBD, setErrBD] = useState(false);
  const [errBTD, setErrBTD] = useState(false);
  const [errBI, setErrBI] = useState(false);

  //   const validate = (
  //     categoryID,
  //     serialNumber,
  //     productImage,
  //     productName,
  //     code,
  //     productPDF
  //   ) => {
  //     const errors = {};

  //     if (serialNumber === "") {
  //       errors.serialNumber = "Serial Number is required!";
  //       setErrBT(true);
  //     }
  //     if (serialNumber !== "") {
  //       setErrBT(false);
  //     }

  //     if (productName === "") {
  //       errors.productName = "Product Name is required!";
  //       setErrBT(true);
  //     }
  //     if (productName !== "") {
  //       setErrBT(false);
  //     }

  //     if (code === "") {
  //       errors.code = "Code is required!";
  //       setErrBT(true);
  //     }
  //     if (code !== "") {
  //       setErrBT(false);
  //     }

  //     if (categoryID === "") {
  //       errors.categoryID = "Category is required!";
  //       setErrBD(true);
  //     }
  //     if (categoryID !== "") {
  //       setErrBD(false);
  //     }
  //     if (blogThumnailDesc === "") {
  //       errors.blogThumnailDesc = "Blog Thumbnail Description is required!";
  //       setErrBTD(true);
  //     }
  //     if (blogThumnailDesc !== "") {
  //       setErrBTD(false);
  //     }

  //     if (productImage === "") {
  //       errors.productImage = "Product Image is required!";
  //       setErrBI(true);
  //     }
  //     if (productImage !== "") {
  //       setErrBI(false);
  //     }
  //     if (productPDF === "") {
  //       errors.productPDF = "Product Image is required!";
  //       setErrBI(true);
  //     }
  //     if (productPDF !== "") {
  //       setErrBI(false);
  //     }

  //     return errors;
  //   };

  const validClassBT =
    errBT && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassBD =
    errBD && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassBTD =
    errBTD && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassBI =
    errBI && isSubmit ? "form-control is-invalid" : "form-control";

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  useEffect(() => {
    // fetchUsers(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchCategories = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list-by-params/specialitymanagement`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
        }
      )
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setBlogs(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setBlogs([]);
        }
        // console.log(res);
      });

    setLoading(false);
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const [photoAdd, setPhotoAdd] = useState();
  const [photoAdd1, setPhotoAdd1] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);
  const [checkImagePhoto1, setCheckImagePhoto1] = useState(false);

  const PhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);
console.log(imageurl);
      setPhotoAdd(imageurl);
      // setValues({ ...values, blogImage: e.target.files[0] });
      setproductImage(e.target.files[0]);
      setCheckImagePhoto(true);
    }
  };
  const PhotoUpload1 = (e) => {
    if (e.target.files.length > 0) {
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      setPhotoAdd1(imageurl);
      // setValues({ ...values, blogImage: e.target.files[0] });
      setproductImage1(e.target.files[0]);
      setCheckImagePhoto1(true);
    }
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setCheckImagePhoto(false);
    setShowForm(false);
    setUpdateForm(false);
    setblogThumnailDesc("");
    setdescription("");
    setViews(0);
    // setValues(initialState);
    setCategoryID("");
    setserialNumber("");
    setcode("");
    setproductName("");
    setShortDescription("");
    setlikes([]);
    setcomments([]);
    setuserId("");
    setIsActive(false);
    setproductImage("");
    setproductImage1("");
    setProductPDF("");
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);
    setblogThumnailDesc("");
    setdescription("");
    setViews(0);
    setCheckImagePhoto(false);
    // setValues(initialState);
    setCategoryID("");
    setserialNumber("");
    setcode("");
    setproductName("");
    setShortDescription("");
    setlikes([]);
    setcomments([]);
    setuserId("");
    setIsActive(false);
    setproductImage("");
    setProductPDF("");
  };
  const renderImage = (uploadimage) => {
    const imageUrl = `${process.env.REACT_APP_API_URL_SHELDON}/${uploadimage}`;

    return (
      <img
        src={imageUrl}
        alt="Image"
        style={{ width: "75px", height: "75px", padding: "5px" }}
      />
    );
  };

  const col = [
    {
      name: "Sr No.",
      selector:(row,index)=>index+1,
      
      minWidth: "150px",
    },
    {
      name: "Speciality Name",
      cell: (row) => row.SpecialityName,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },

    {
      name: "Home Icon",
      cell: (row) => renderImage(row.UploadHomeIcon),
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },
    {
      name: "Icon",
      cell: (row) => renderImage(row.UploadIcon),
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },

    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="edit">
                <button
                  className="btn btn-sm btn-success edit-item-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                    onClick={() => handleTog_edit(row._id)}
                >
                  Edit
                </button>
              </div>

              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => tog_delete(row._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
      minWidth: "180px",
    },
  ];

  // const handleServiceChange = (selectedOption) => {
  //   console.log("Selected service:", selectedOption.name);
  //   // Do something with the selected service name
  //   setValues({ ...values, ServiceName: selectedOption.name });
  // };
 
const handleSubmitCms = async () => {
  try {
    if (speciality.value === 'AboutUs') {
      // Call editCmsAboutUsContent API
      const response = await editCmsAboutUsContent({
        _id: '65f12f48250203b664ab84ea', // Replace with the appropriate ID
        AboutUsDetail: Detail // Assuming Detail contains the data from CKEditor
      });
      if (response) {
        alert('Contact Us content updated successfully!');
      } else {
        alert('Failed to update Contact Us content.');
      }
      console.log('Response:', response);
      // Handle success or show a success message
    } else if (speciality.value === 'ContactUs') {
      // Call editCmsContactUsDetailContent API
      const response = await editCmsContactUsDetailContent({
        _id: '65f131a0028849922f0512ab', // Replace with the appropriate ID
        ContactUsDetail: Detail // Assuming Detail contains the data from CKEditor
      });if (response) {
        alert('Contact Us content updated successfully!');
      } else {
        alert('Failed to update Contact Us content.');
      }
      console.log('Response:', response);
      // Handle success or show a success message
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle error or show an error message
  }
};
  const [speciality,setSpeciality]=useState([]);
  const [values,setValues]=useState("")
  const options = [
    { value: 'AboutUs', label: 'About Us' },
    { value: 'ContactUs', label: 'ContactUs' },
   
  ];
  const handleSpecialityChange = (selectedOption) => {
    console.log("Selected speciality:", selectedOption);
    // setSpeciality(speciality);
     setSpeciality(selectedOption); // Update speciality state
     if (selectedOption.value === 'AboutUs') {
      // Fetch About Us data
      getCmsAboutUsById("65f12f48250203b664ab84ea").then((res) => {
        console.log("get", res);
        setDetail(res.cmsAboutUsContent.AboutUsDetail)
        
        
      })
    } else if (selectedOption.value === 'ContactUs') {
      // Fetch Contact Us data
      getCmsContactUsDetailById("65f131a0028849922f0512ab").then((res) => {
        console.log("get", res);
        setDetail(res.cmsContactUsDetailContent.ContactUsDetail)
        
        
      })
    }
    // Update values object with new speciality
    setValues({
        ...values,
        speciality: selectedOption.label // Assuming label is the property holding the speciality value
    });
   
}; 
  document.title = "Sheldon Medical | Speciality Management";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="CMS" title="CMS" pageTitle="CMS" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">CMS</h2>
                    </Col>
                   <Card>
                    <Row>
                      <Col lg={12}>
                      <label>
                                      Speciality{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    <div className="form-floating mb-3">
                                    <Select
                placeholder="-Select-"
                name="speciality"
                id="Speciality"
                value={speciality}
                // className={validClassSP}
                options={options}
                onChange={handleSpecialityChange}
              /> 
               {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.errspeciality}
                                        </p>
                                      )} */}
                                    </div>
                      </Col>
                    </Row>
                   <Row>
                   <Col lg={12}>
                                    
                                  </Col>
                      <Col lg={12}>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="submit"
                            className="btn btn-success  m-1"
                            id="add-btn"
                            onClick={handleSubmitCms}
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger m-1"
                            onClick={handleAddCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      </Col>
                   </Row>
                   </Card>
                    
                  </Row>
                </CardHeader>

               
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

    </React.Fragment>
  );
};

export default ChangePassword;
