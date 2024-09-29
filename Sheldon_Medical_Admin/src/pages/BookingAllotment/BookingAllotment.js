
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
import Select from 'react-select';
import Flatpickr from "react-flatpickr";
// import {
//   createNewProject, uploadproductImage,
// } from "../../functions/NewProject/Projectfunc";
import {
    createSpecialityManagement,uploadproductImage,removeSpecialityManagement,updateSpecialityManagement,getSpecialityManagement,getNewSpecialityByParam
} from "../../functions/SpecialityManagement/SpecialityManagement"

import {listSpecialityManagement,createBookingManagement,removeBookingManagement,updateBookingManagement,getBookingManagement,getBookingManagementbyParams} from "../../functions/BookingManagement/BookingManagement"
import { closingDeals } from "../../common/data";
const BookingAllotment = () => {
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
  const [SpecialityValue, setSpecialityValue] = useState("");
  // const [UploadIcon,setUploadIcon]=useState("");
  // const [UploadHomeIcon,setUploadHomeIcon]=useState("");
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
  const [Name,setName] =useState("");
  const [Phone, setphone] =useState("");
  const [Email,setEmail] =useState("");
  const [Date,setDate] =useState("")
  const [Alloted,setAlloted] =useState(false)

  useEffect(() => {
   
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
    
  }, [formErrors, isSubmit]);

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return loader.file.then((file) => {
          const body = new FormData();
          body.append("uploadImage", file);

          // Using uploadImage function that uses Axios for the HTTP request
          return uploadproductImage(body)
            .then((response) => {
              console.log("response123456789", response);
              // Accessing the 'url' property from the response's 'data'
              const Url = response.url; // Adjusted to access 'data.url'
              console.log("Upload response URL:", Url);

              return {
                default: `${process.env.REACT_APP_API_URL_SHELDON}/uploads/descriptionCKImages/${Url}`,
              };
            })
            .catch((err) => {
              console.error("Upload error:", err);
              throw err; // Reject the promise to signal an upload error
            });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const [categories, setCategories] = useState([]);

    // useEffect(() => {
    //   const fetchCategories = async () => {
    //     try {
    //       const result = await listSpecialityManagement();

    //       setCategories(result);
    //     } catch (error) {
    //       console.error("Error fetching categories:", error);
    //       // Optionally, set categories to an empty array in case of error
    //       setCategories([]);
    //     }
    //   };

    //   fetchCategories();
    // }, []);

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);



    const handleTog_edit = (_id) => {
      //setmodal_edit(!modal_edit);
      setIsSubmit(false);
      setUpdateForm(true);

      setIsSubmit(false);
      set_Id(_id);
      getBookingManagement(_id)
        .then((res) => {
          console.log("res", res);
          setSpecialityValue(res.SpecialityName.SpecialityName)
          console.log(SpecialityValue)
          setSpecialityName(res.SpecialityName._id);
          setName(res.Name);
          setphone(res.Phone);
          setEmail(res.Email);
          setDate(res.Date);
          setAlloted(res.Alloted)
          // setserialNumber(res.data.serialNumber);
          // setcode(res.data.code);
          // setproductName(res.data.productName);
          // setCategoryID(res.data.categoryID);
          // setproductImage(res.data.productImage);
          // setProductPDF(res.data.productPDF);

          // setdescription(res.data.description);
          // setShortDescription(res.data.shortDescription);
          // console.log(res.UploadHomeIcon)
          // setSpecialityName(res.SpecialityName);
          // setDetail(res.Detail);
          // // setUploadHomeIcon(res.UploadHomeIcon);
          // setproductImage(res.UploadHomeIcon);
          // setproductImage1(res.UploadIcon);
          // // setUploadIcon(res.UploadIcon);

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
    const formdata = {
      SpecialityName,
      Name,
      Phone,
      Email,
      Date,
      Alloted
    }
console.log("megdumb",SpecialityName.value)
 

    console.log("append", formdata);
    createBookingManagement(formdata) 
      .then((res) => {
        console.log("this is ",res);
        // setmodal_list(!modal_list);
        setShowForm(false);
        // setValues(initialState);
         
        // setcapacity("");
        // setServiceName("");
        setSpecialityName("");
         setName("");
         setphone("");
         setDate("");
         setEmail("");
         setAlloted(false)
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
      removeBookingManagement(remove_id)
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
   
      // setFormErrors(erros);
      setIsSubmit(true);
      const formdata = {
        SpecialityName,
        Name,
        Phone,
        Email,
        Date,
        Alloted
      }
  console.log("megdumb",SpecialityName.value)
 
  
  
      console.log("append", formdata);

      updateBookingManagement(_id, formdata)
        .then((res) => {
          setIsSubmit(false);
          setShowForm(false);  
    setUpdateForm(false);
          // setmodal_edit(!modal_edit);
          setName("");
          setEmail("");
          setphone("");
          setDate("");  
          setAlloted(false)
          setSpecialityName("");
          fetchCategories();

        })
        .catch((err) => {
          console.log(err);
        });
      // }
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
    selectDropdown();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchCategories = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/bookingmanagement`,
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
          console.log(response)
          let res = response;
          setLoading(false);
          setBlogs(res);
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
    setCheckImagePhoto1(false);
    setShowForm(false);
    setUpdateForm(false);
    setName("");
    setEmail("");
    setphone("");
    setDate("");  
    setAlloted(false)
    setSpecialityName("");
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    
    setUpdateForm(false);
    setShowForm(false);
    setName("");
    setEmail("");
    setphone("");
    setDate("");  
    setAlloted(false)
    setSpecialityName("");
    
    // setUploadHomeIcon("");
    // setUploadIcon("");
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
      
      minWidth: "50px",
    },
    {
      name: "Alloted",
      cell: (row) => (
        row.Alloted ? <i className="ri-check-line"></i> : <i className="ri-close-line"></i>
      ),
      sortable: true,
      sortField: "Alloted",
      minWidth: "50px",
    },
    
    
    

    {
      name: "Speciality Name",
      cell: (row) => row.SpecialityName.SpecialityName,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },
    
    {
      name: "Request Date",
      cell: (row) => row.Date,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },
    {
      name: "Patient Details",
      cell: (row) => (
        <div>
          <div>Name: {row.Name}</div>
          <div>Email: {row.Email}</div>
          <div>Phone: {row.Phone}</div>
        </div>
      ),
      sortable: false, // Assuming you don't want to sort by this column
      minWidth: "300px", // Adjust width as needed
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
  const [Selectoptions,setOptions] = useState("")
  // const getloc = async () => {
  //   const response = await GetallLocation();

  //   console.log(">>>>", response);

  //   const names = response.data.filter((item) => item.isActive).map((item) => ({
  //       value: item._id,
  //       label: item.name,
  //       id: item._id,
  //     }));

  //     setOptions(names);
  // };
 const  selectDropdown  = async () =>{
    try {
      const response = await listSpecialityManagement()
      const names = response.map((item)=>({
        value:item._id , label :item.SpecialityName,
      }
     ));
     setOptions(names)
      console.log('Response:', response);
     
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const [speciality,setSpeciality]=useState([]);
  const [values,setValues]=useState("");
  // const options = [
  //   { value: 'option1', label: 'Option 1' },
  //   { value: 'option2', label: 'Option 2' },
  //   { value: 'option3', label: 'Option 3' }
  // ];  
  const handleSpecialityChange = (selectedOption) => {
    console.log("Selected speciality:", selectedOption);
    // Update speciality state with the selected option's value
    setSpecialityName(selectedOption.value);
    setSpecialityValue(selectedOption.label);
};

  document.title = "Sheldon Medical | Speciality Management";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Booking Management" title="Booking Management" pageTitle="Booking Management" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Booking Management</h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div
                        style={{
                          display: showForm || updateForm ? "none" : "",
                        }}
                      >
                        {/* <div className="text-end mt-1">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            name="filter"
                            value={filter}
                            defaultChecked={true}
                            onChange={handleFilter}
                          
                          />
                          <Label className="form-check-label ms-2">
                            Active
                          </Label>
                        </div> */}
                      </div>
                    </Col>
                    <Col className="col-sm-auto" lg={4} md={12} sm={12}>
                      <div className="d-flex justify-content-sm-end">
                        {/* add btn */}
                        <div
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="d-flex justify-content-sm-end">
                                <div>
                                  <Button
                                    color="success"
                                    className="add-btn me-1"
                                    onClick={() => {
                                      setShowForm(!showForm);
                                      // setValues(initialState);
                                          setSpecialityName("");
                                          setName("");
                                          setphone("");
                                          setDate("");
                                          setEmail("");
                                          setAlloted(false)
                                    }}
                                    // onClick={() => tog_list()}
                                    // id="create-btn"
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        {/* update list btn */}

                        <div
                          style={{
                            display: showForm || updateForm ? "" : "none",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="text-end">
                                <button
                                  className="btn bg-success text-light mb-3 "
                                  onClick={() => {
                                    // setValues(initialState);
                                    setCategoryID("");
                                    setserialNumber("");
                                    setcode("");
                                    setproductName("");
                                    setsolarrooftype("");
                                    //setcapacity("");
                                    setShortDescription("");
                                    setlikes([]);
                                    setcomments([]);
                                    setuserId("");
                                    setIsActive(false);
                                    // setSpecialityName("");
                                    setDetail("");

                                    setproductImage("");
                                    setproductImage1("");

                                    setProductPDF("");
                                    setShowForm(false);
                                    setUpdateForm(false);
                                    // setFileId(Math.random() * 100000);

                                    selectDropdown();
                                    setSpecialityName("");
                                    setName("");
                                    setphone("");
                                    setDate("");
                                    setEmail("");
                                    setAlloted(false)
                                  }}
                                >
                                  <i class="ri-list-check align-bottom me-1"></i>{" "}
                                  List
                                </button>
                              </div>
                            </Col>
                          </Row>
                          {/* </div> */}
                        </div>

                        {/* search */}
                        <div
                          className="search-box ms-2"
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <input
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon "></i>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                {/* ADD FORM  */}
                <div
                  style={{
                    display: showForm && !updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12}>
                        <Card className="">
                          {/* <PreviewCardHeader title="Billing Product Form" /> */}
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                <Col lg={4}>
                                <label>
                                SpecialityName{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    <div className="form-floating mb-3">
                                    <Select
                                          placeholder={SpecialityValue}
                                          name="SpecialityName"
                                          id="SpecialityName"
                                          value={SpecialityName}
                                          options={Selectoptions}
                                          onChange={handleSpecialityChange}
                                        />

                        
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.errspeciality}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Phone
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="number"
                                        className={validClassBT}
                                        placeholder="Enter Phone"
                                        required
                                        name="Phone"
                                        value={Phone}
                                        onChange={(e) => {
                                          setphone(e.target.value);
                                        }}
                                      />
                                      
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.serialNumber}
                                        </p>
                                      )} */} 
                                  </Col>
                                  
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Name 
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="text"
                                        className={validClassBT}
                                        placeholder="Enter  Name"
                                        required
                                        name="Name"
                                        value={Name}
                                        onChange={(e) => {
                                          setName(e.target.value);
                                        }}
                                      />
                                      
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.serialNumber}
                                        </p>
                                      )} */} 
                                  </Col>
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Email 
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="email"
                                        className={validClassBT}
                                        placeholder="Enter Email"
                                        required
                                        name="Email"
                                        value={Email}
                                        onChange={(e) => {
                                          setEmail(e.target.value);
                                        }}
                                      />
                                      
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.serialNumber}
                                        </p>
                                      )} */} 
                                  </Col>
                                  <Col lg={4}>
                      
                          <Label > Date</Label>
                          <Flatpickr
                          // value={date}
                            className="form-control"
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              dateFormat: "d-m-Y",
                            }}
                            onChange={(selectedDates) => {
                              setDate(selectedDates[0]); // Assuming you want to set a single date
                          }}
                          />
                        
                              </Col>
                                  <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        id="add-btn"
                                        onClick={handleClick}
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
                              </Form>
                            </div>
                          </CardBody>{" "}
                        </Card>
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>

                {/* UPDATE FORM  */}
                <div
                  style={{
                    display: !showForm && updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12}>
                        <Card className="">
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                <Col lg={4}>
                                <label>
                                SpecialityName{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    <div className="form-floating mb-3">
                                    <Select
                                          placeholder={SpecialityValue}
                                          name="SpecialityName"
                                          id="SpecialityName"
                                          value={SpecialityName}
                                          options={Selectoptions}
                                          onChange={handleSpecialityChange}
                                        />

                        
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.errspeciality}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Phone
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="number"
                                        className={validClassBT}
                                        placeholder="Enter Phone"
                                        required
                                        name="Phone"
                                        value={Phone}
                                        onChange={(e) => {
                                          setphone(e.target.value);
                                        }}
                                      />
                                      
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.serialNumber}
                                        </p>
                                      )} */} 
                                  </Col>
                                  
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Name 
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="text"
                                        className={validClassBT}
                                        placeholder="Enter  Name"
                                        required
                                        name="Name"
                                        value={Name}
                                        onChange={(e) => {
                                          setName(e.target.value);
                                        }}
                                      />
                                      
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.serialNumber}
                                        </p>
                                      )} */} 
                                  </Col>
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Email 
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="email"
                                        className={validClassBT}
                                        placeholder="Enter Email"
                                        required
                                        name="Email"
                                        value={Email}
                                        onChange={(e) => {
                                          setEmail(e.target.value);
                                        }}
                                      />
                                      
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.serialNumber}
                                        </p>
                                      )} */} 
                                  </Col>
                                  <Col lg={4}>
                      
                          <Label > Date</Label>
                          <Flatpickr 
    // placeholder="Select Date" // Remove placeholder
    value={Date} // Use value prop to display selected date
    className="form-control"
    options={{
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    }}
    onChange={(selectedDates) => {
        setDate(selectedDates[0]); // Assuming you want to set a single date
    }}
/>

                        
                              </Col>

                                  <Col lg={12}>
                                    <div className="text-end">
                                      <button
                                        type="submit"
                                        className=" btn btn-success m-1"
                                        id="add-btn"
                                        onClick={handleUpdate}
                                      >
                                        Update
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleUpdateCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>
                {/* list */}
                <div
                  style={{
                    display: showForm || updateForm ? "none" : "block",
                  }}
                >
                  <CardBody>
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={col}
                          data={blogs}
                          progressPending={loading}
                          sortServer
                          onSort={(column, sortDirection, sortedRows) => {
                            handleSort(column, sortDirection);
                          }}
                          pagination
                          paginationServer
                          paginationTotalRows={totalRows}
                          paginationRowsPerPageOptions={[
                            10,
                            50,
                            100,
                            totalRows,
                          ]}
                          onChangeRowsPerPage={handlePerRowsChange}
                          onChangePage={handlePageChange}
                        />
                      </div>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      

      {/* {/Remove Modal/} */}
     <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
          // setValues([]);
          setCategoryID("");
          setserialNumber("");
          setcode("");
          setproductName("");
          setlikes([]);
          setcomments([]);
          setuserId("");
          setIsActive(false);
          setproductImage("");
          setSpecialityName("");
          setName("");
          setphone("");
          setDate("");
          setEmail("");
          setAlloted(false)
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove Booking Details</span>
        </ModalHeader>

        <form>
          <ModalBody>
            <div className="mt-2 text-center">
              <lord-icon
                src="https://cdn.lordicon.com/gsqxdxog.json"
                trigger="loop"
                colors="primary:#f7b84b,secondary:#f06548"
                style={{ width: "100px", height: "100px" }}
              ></lord-icon>
              <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>Are you sure ?</h4>
                <p className="text-muted mx-4 mb-0">
                  Are you Sure You want to Remove this Record ?
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-danger"
                id="add-btn"
                onClick={handleDelete}
              >
                Remove
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setmodal_delete(false)}
              >
                Close
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default BookingAllotment;
