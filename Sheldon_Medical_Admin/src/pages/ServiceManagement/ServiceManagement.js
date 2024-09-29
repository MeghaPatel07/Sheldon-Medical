
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
const ServiceManagement = () => {
  const [serialNumber, setserialNumber] = useState("");
  const [code, setcode] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [productName, setproductName] = useState("");
const [ServiceName,setServiceName]=useState("");
  const [solarrooftype, setsolarrooftype] = useState("");
  // const [capacity,setcapacity]=useState("");

  const [productImage, setproductImage] = useState("");
  const [productImage1, setproductImage1] = useState("");
  const [productPDF, setProductPDF] = useState("");
  const [description, setdescription] = useState("");
//   const [description, setdescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [SpecialityName, setSpecialityName] = useState("");
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
 const[Thumbnail,setThumbnail]=useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [blogs, setBlogs] = useState([]);

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
  
  const Editvalidate=(ServiceName)=>{
    const errors={};
    if (!/^[A-Za-z\s]+$/.test(ServiceName)) {
      errors.ServiceName = "ServiceName should contain only alphabets";
      setEditSN(true);
    }  
    if (ServiceName === "") {
      
      errors.ServiceName = "ServiceName is required";
      setEditSN(true);
    }
    // console.log("error in " , errors.SpecialityName);
    else{ setEditSN(false);}
    return errors;
    
    }

    const [errSN , setErrSN]= useState(false);
    const [errEditSN, setEditSN]=useState(false);
    const validServiceName =
    errSN && isSubmit ? "form-control is-invalid" : "form-control";

    const validEditServiceName =
    errEditSN && isSubmit ? "form-control is-invalid" : "form-control";

const validate=(ServiceName)=>{
const errors={};
if (!/^[A-Za-z\s]+$/.test(ServiceName)) {
errors.ServiceName = "SpecialityName should contain only alphabets";
setErrSN(true);
}  
if (ServiceName === "") {

errors.ServiceName = "ServiceName is required";
setErrSN(true);
}
// console.log("error in " , errors.ServiceName);
else{ setErrSN(false);}

return errors;

}
  const [modal_edit, setmodal_edit] = useState(false);
  
  
  const handleTog_edit = (_id) => {
      // setmodal_edit(!modal_edit);
      setIsSubmit(false);
      setUpdateForm(true);

      setIsSubmit(false);
      set_Id(_id);
      getServiceManagement(_id)
        .then((res) => {
          console.log("res", res);
   setServiceName(res.ServiceName);
   setThumbnail(res.Thumbnail);
          setDetail(res.Detail);
          setproductImage(res.UploadHomeIcon);
          setproductImage1(res.UploadIcon);


        })
        .catch((err) => {
          console.log(err);
        });
    };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let errors = validate(
   ServiceName
    );
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
    const formdata = new FormData();

    formdata.append("ServiceName", ServiceName);

    formdata.append("Detail", Detail);
    formdata.append("Thumbnail",Thumbnail);
    // formdata.append("capacity",setcapacity)
    console.log(productImage)
    console.log(productImage1)
    formdata.append("UploadHomeIcon", productImage);
    formdata.append("UploadIcon", productImage1);



    console.log("append", formdata);
    createServiceManagement(formdata)
      .then((res) => {
        console.log(res);
        // setmodal_list(!modal_list);
        setShowForm(false); 
        setServiceName("");
        setDetail("");
        setSpecialityName("");
      setThumbnail("");
    setproductImage("")
    setproductImage1("")
        setViews(0);
        setIsSubmit(false);
     
        setFormErrors({});
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

    const handleDelete = (e) => {
      e.preventDefault();
      removeServiceManagement(remove_id)
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
   let errors = Editvalidate(ServiceName)
      setFormErrors(errors);
      setIsSubmit(true);
      // const likesString = JSON.stringify(likes);
      // const commentString = JSON.stringify(comments);

      // console.log("likess", likes);
      if (Object.keys(errors).length === 0) {
      const formdata = new FormData();

    
      formdata.append("ServiceName", ServiceName);
      formdata.append("Thumbnail",Thumbnail)
      formdata.append("Detail", Detail);
      // formdata.append("capacity",setcapacity)
      console.log(productImage)
      console.log(productImage1)
      formdata.append("UploadHomeIcon", productImage);
      formdata.append("UploadIcon", productImage1);
  

      updateServiceManagement(_id, formdata)
        .then((res) => {
          // setmodal_edit(!modal_edit);
          setPhotoAdd("");
          setPhotoAdd1("");
          setUpdateForm(false);
setServiceName("");
setDetail("");
// photoAdd("");
setPhotoAdd("");
setPhotoAdd1("");
setThumbnail("");



          setCheckImagePhoto(false);
          setCheckImagePhoto1(false);
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
          setblogThumnailDesc("");
          setdescription("");
          setViews(0);
          setproductImage("");
          setproductImage1("");
          setProductPDF("");
          fetchCategories();
        })
        .catch((err) => {
          console.log(err);
        });
      }
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
    const defaultSortDirection = "asc";
    const defaultColumn = "ServiceName"; 

    const response=await axios
      .post(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list-by-params/servicemanagement`,
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

    setServiceName("");

    setproductImage("")
    setproductImage1("")
    setPhotoAdd(""); 
    setDetail("");
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
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);
    setblogThumnailDesc("");
    setdescription("");
    setViews(0);
    setCheckImagePhoto(false);
    setCheckImagePhoto1(false);
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
    setSpecialityName("");
    setDetail("");
    setServiceName("")
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
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);
    setblogThumnailDesc("");
    setdescription("");
    setViews(0);
    setCheckImagePhoto(false);
    setCheckImagePhoto1(false);
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
    setSpecialityName("");
    setDetail("");
    setServiceName("")
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
      name: "Service Name",
      cell: (row) => row.ServiceName,
      sortable: true,
      sortField: "ServiceName",
      minWidth: "150px",
    },
    {
      name: "Thumbnail Description",
      cell: (row) => row.Thumbnail,
      sortable: true,
      sortField: "ServiceName",
      minWidth: "150px",
    },

    // {
    //   name: "Home Icon",
    //   cell: (row) => renderImage(row.UploadHomeIcon),
    //   sortable: true,
    //   sortField: "serialNumber",
    //   minWidth: "150px",
    // },
    // {
    //   name: "Icon",
    //   cell: (row) => renderImage(row.UploadIcon),
    //   sortable: true,
    //   sortField: "serialNumber",
    //   minWidth: "150px",
    // },

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

  document.title = "Sheldon Medical | Service Management";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Service Management" title="Service Management" pageTitle="Service Management" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Service Management</h2>
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
                                      setServiceName(""); 
                                      setproductImage("")
                                              setproductImage1("")
                                      // setFileId(Math.random() * 100000);
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
                                    setServiceName("");
                                    setproductName("");
                                    setsolarrooftype("");
                                    //setcapacity("");
                                    setShortDescription("");
                                    setlikes([]);
                                    setcomments([]);
                                    setuserId("");
                                    setIsActive(false);
                                    setproductImage("");
                                    setProductPDF("");
                                    setShowForm(false);
                                    setUpdateForm(false);
                                    // setFileId(Math.random() * 100000);
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
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        // key={"productName_" + _id}
                                        type="text"
                                        className={validServiceName}
                                        placeholder="Enter blog title"
                                        required
                                        name="solarrooftype"
                                        value={ServiceName}
                                        onChange={(e) => {
                                          setServiceName(e.target.value);
                                        }}
                                      />
                                      <Label>
                                        Service Name{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ServiceName}
                                        </p>
                                      )}
                                    </div>
                                    <div className="form-floating mb-3">
                                      <Input
                                        // key={"productName_" + _id}
                                        type="text"
                                        // className={validServiceName}
                                        placeholder="Enter blog title"
                                        required
                                        name="solarrooftype"
                                        value={Thumbnail}
                                        onChange={(e) => {
                                          setThumbnail(e.target.value);
                                        }}
                                      />
                                      <Label>
                                        Thumbnail Description{" "}
                                      </Label>
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ServiceName}
                                        </p>
                                      )} */}
                                    </div>
                                  </Col>

                                

                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                        Service Description
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"description_" + _id} // Ensures the component reinitializes with new data when _id changes
                                          editor={ClassicEditor} // Specifies the editor build to use
                                          data={Detail} // Loads the initial content into the editor from the description state
                                          config={{
                                            extraPlugins: [uploadPlugin], // Integrates the custom uploadPlugin for handling image uploads
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData(); // Retrieves the current content from the editor
                                            setDetail(data); // Updates the description state with the new content
                                            console.log(
                                              "jvjfvjjv",
                                              Detail
                                            ); // Logs the current state (might log the previous state due to setState's asynchronous nature)
                                          }}
                                        />

                                        {/* {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.description}
                                          </p>
                                        )} */}
                                      </CardBody>
                                    </Card>
                                  </Col>

                                  <Col lg={6}>
                                    <label>
                                      Upload Home Icon{" "} 
                                    </label>

                                    <Input
                                      //   key={"productImage_" + _id}
                                      type="file"
                                      name="productImage"
                                      className={validClassBI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {/* {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.productImage}
                                      </p>
                                    )} */}
                                    {checkImagePhoto ? (
                                      <img
                                        //   src={image ?? myImage}
                                        className="m-2"
                                        src={photoAdd}
                                        alt="Profile"
                                        width="180"
                                        height="200"
                                      />
                                    ) : null}
                                  </Col>
                                  <Col lg={6}>
                                    <label>
                                      Upload Icon{" "} 
                                    </label>

                                    <Input
                                      //   key={"productImage_" + _id}
                                      type="file"
                                      name="productImage"
                                      className={validClassBI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload1}
                                    />
                                    {/* {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.productImage}
                                      </p>
                                    )} */}
                                    {checkImagePhoto1 ? (
                                      <img
                                        //   src={image ?? myImage}
                                        className="m-2"
                                        src={photoAdd1}
                                        alt="Profile"
                                        width="180"
                                        height="200"
                                      />
                                    ) : null}
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
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className={validEditServiceName}
                                        placeholder="Enter Service Name"
                                        required
                                        name="ServiceName"
                                        value={ServiceName}
                                        onChange={(e) => {
                                          setServiceName(e.target.value);
                                        }}
                                      />
                                      <Label>
                                        Service Name{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ServiceName}
                                        </p>
                                      )}
                                    </div>
                                    <div className="form-floating mb-3">
                                      <Input
                                        // key={"productName_" + _id}
                                        type="text"
                                        // className={validServiceName}
                                        placeholder="Enter blog title"
                                        required
                                        name="solarrooftype"
                                        value={Thumbnail}
                                        onChange={(e) => {
                                          setThumbnail(e.target.value);
                                        }}
                                      />
                                      <Label>
                                        Thumbnail Description{" "}
                                      </Label>
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ServiceName}
                                        </p>
                                      )} */}
                                    </div>
                                  </Col>
                                  

                            

                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                      Service Description
                                       
                                      </Label>
                                      <CardBody>
                                        <CKEditor
                                          key={"description_" + _id}
                                          editor={ClassicEditor}
                                          data={Detail}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData(); // Retrieves the current content from the editor
                                            setDetail(data); // Updates the description state with the new content
                                            console.log("hiii", Detail); // Logs the current state (might log the previous state due to setState's asynchronous nature)
                                          }}
                                        />

                                        {/* {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.Detail}
                                          </p>
                                        )} */}
                                      </CardBody>
                                    </Card>
                                  </Col>

                                  <Col lg={6}>
                                    <label>
                                      Upload Home Icon{" "}
                                      
                                    </label>

                                    <Input
                                      key={"productImage_" + _id}
                                      type="file"
                                      name="productImage"
                                      className={validClassBI}
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {/* {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.productImage}
                                      </p>
                                    )} */}
                                    {console.log("sss",photoAdd)}
                                    {console.log("Hiii",productImage)}
                                    {console.log("Hiii12",`${process.env.REACT_APP_API_URL_SHELDON}/${productImage}`)}
                                    {productImage || photoAdd ? (
                                      <img
                                        className="m-2"
                                        src={
                                          checkImagePhoto
                                            ? photoAdd
                                            : `${process.env.REACT_APP_API_URL_SHELDON}/${productImage}`
                                        }
                                        width="180"
                                        height="200"
                                      />
                                    ) : null}
                                  </Col>
                                  <Col lg={6}>
                                    <label>
                                      Upload Icon{" "}
                                     
                                    </label>

                                    <Input
                                      key={"productImage_" + _id}
                                      type="file"
                                      name="productImage1"
                                      className={validClassBI}
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload1}
                                    />
                                    {/* {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.productImage}
                                      </p>
                                    )} */}
                                    {productImage1 || photoAdd1 ? (
                                      <img
                                        className="m-2"
                                        src={
                                          checkImagePhoto1
                                            ? photoAdd1
                                            : `${process.env.REACT_APP_API_URL_SHELDON}/${productImage1}`
                                        }
                                        width="180"
                                        height="200"
                                      />
                                    ) : null}
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

                {/* UPDATE FORM  */}

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
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove Service Management</span>
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

export default ServiceManagement;
