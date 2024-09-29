import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
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

import {
  createAdminUser,
  getAdminUser,
  removeAdminUser,
  updateAdminUser,
} from "../../functions/Auth/AdminUser";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  ProfilePhoto:"",
  IsActive: false,
};

const AdminUser = () => {
  const [values, setValues] = useState(initialState);
  const {
    firstName,
    lastName,
    // email,
    // password,
    ProfilePhoto,
    IsActive,
  } = values;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [photo,setPhoto]=useState("");
  const [password,setPassword]=useState("");
  const[email,setEmail]=useState("");
  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [Adminuser, setAdminuser] = useState([]);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const [modal_list, setmodal_list] = useState(false);
  const [firstname,setFirstName]=useState("");
  const [lastname,setLastName]=useState("");

  const tog_list = () => {
    setmodal_list(!modal_list);
    setValues(initialState);
    setIsSubmit(false);
  };
 const handleFisrtNameChange=(event)=>{
    const { value } = event.target;
    setFirstName(value);

    // You can perform validation or formatting here if needed
    setValues({
      ...values,
      firstName: value // Assuming label is the property holding the SpecialityName value
    });
 
 }
 const handlePasswordChange=(event)=>{
  const { value } = event.target;
  setPassword(value);

  // You can perform validation or formatting here if needed
  setValues({
    ...values,
    password: value // Assuming label is the property holding the SpecialityName value
  });

}
const handleEmailChange=(event)=>{
  const { value } = event.target;
  setEmail(value);

  // You can perform validation or formatting here if needed
  setValues({
    ...values,
    email: value // Assuming label is the property holding the SpecialityName value
  });

}
 const handlelastNameChange=(event)=>{
  const { value } = event.target;
  setFirstName(value);

  // You can perform validation or formatting here if needed
  setValues({
    ...values,
    lastName: value // Assuming label is the property holding the SpecialityName value
  });

}
  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };
 const baseimg=`${process.env.REACT_APP_API_URL_SHELDON}/${photo}`;
  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (_id) => {
    setmodal_edit(!modal_edit);
    setIsSubmit(false);
    set_Id(_id);
    getAdminUser(_id)
      .then((res) => {
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setEmail(res.email);
        setPassword(res.password);
        setPhoto(res.ProfilePhoto)
        setValues({
          ...values,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          password: res.password,
         
          IsActive: res.IsActive,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {
    createAdminUser(firstName,lastName,email,password,photo,IsActive)
      .then((res) => {
        console.log("valuessssss imagaga",values.ProfilePhoto);
        console.log("res", res);
        if (res.isOk) {
          setmodal_list(!modal_list);
          setValues(initialState);
          setIsSubmit(false);
          setFormErrors({});
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          fetchUsers();
        } else {
          setErrEM(true);
          setFormErrors({ email: "Email already exists!" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeAdminUser(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);
    

    if (Object.keys(erros).length === 0) {
      updateAdminUser(_id, firstName,lastName,email,password,photo,IsActive)
        .then((res) => {
          setmodal_edit(!modal_edit);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          fetchUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [errFN, setErrFN] = useState(false);
  const [errLN, setErrLN] = useState(false);
  const [errEM, setErrEM] = useState(false);
  const [errPA, setErrPA] = useState(false);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email === "") {
      errors.email = "Email is required!";
      setErrEM(true);
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email address!";
      setErrEM(true);
    } else {
      setErrEM(false);
    }
    if (values.firstName === "") {
      errors.firstName = "First Name is required!";
      setErrFN(true);
    }
    if (values.firstName !== "") {
      setErrFN(false);
    }

    if (values.lastName === "") {
      errors.lastName = "Last Name is required!";
      setErrLN(true);
    }
    if (values.lastName !== "") {
      setErrLN(false);
    }


    if (values.password === "") {
      errors.password = "password is required!";
      setErrPA(true);
    }
    if (values.password !== "") {
      setErrPA(false);
    }
   
   
    return errors;
  };

  const validClassFN =
    errFN && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassLN =
    errLN && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassEM =
    errEM && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPA =
    errPA && isSubmit ? "form-control is-invalid" : "form-control";

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
    fetchUsers();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchUsers = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/listByparams/adminUser`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
          IsActive: filter,
        }
      )
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setAdminuser(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setAdminuser([]);
        }
        // console.log(res);
      });

    setLoading(false);
  };
  const handlePhotoChange = (e) => {
    // if (e.target.files.length > 0) {
      if (e.target.files.length > 0) {
        const image = new Image();
  
        let imageurl = URL.createObjectURL(e.target.files[0]);
        console.log("img", e.target.files[0]);
  console.log(imageurl);
        // setPhotoAdd(imageurl);
        // setValues({ ...values, blogImage: e.target.files[0] });
        setPhoto(e.target.files[0]);
      }
    };
//  const handlePhotoChange=(e)=>{
//    const file=e.target.files[0];
//    setPhoto(file);
//   //  values.ProfilePhoto=file;
//    setValues({ ...values, ProfilePhoto: e.target.files[0] });
//    console.log("profile phototktt",values);
//  }
  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };
  const col = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
      sortField: "firstName",
      minWidth: "150px",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
      sortField: "lastName",
      minWidth: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      sortField: "email",
      minWidth: "150px",
    },

    {
      name: "Password",
      selector: (row) => row.password,
      sortable: true,
      sortField: "password",
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

  document.title = "Admin Users | Sheldon Medical";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Setup" title="Admin Users" pageTitle="Setup" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Admin Users</h2>
                    </Col>

                    <Col sm={6} lg={4} md={6}>
                      <div className="text-end mt-2">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          name="filter"
                          value={filter}
                          defaultChecked={true}
                          onChange={handleFilter}
                        />
                        <Label className="form-check-label ms-2">Active</Label>
                      </div>
                    </Col>
                    <Col className="col-sm-auto" sm={12} lg={4} md={12}>
                      <div className="d-flex justify-content-sm-end">
                        <div className="ms-2">
                          <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Add
                          </Button>
                        </div>
                        <div className="search-box ms-2">
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <div id="customerList">
                    <div className="table-responsive table-card mt-1 mb-1 text-right">
                      <DataTable
                        columns={col}
                        data={Adminuser}
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
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_list(false);
            setIsSubmit(false);
          }}
        >
          Add Admin
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassFN}
                placeholder="Enter first Name"
                required
                name="firstName"
                value={firstName}
                onChange={handleFisrtNameChange}
              />
              <Label>
                First Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.firstName}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassLN}
                placeholder="Enter last Name"
                required
                name="lastName"
                value={lastName}
                onChange={handlelastNameChange}
              />
              <Label>
                Last Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.lastName}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassEM}
                placeholder="Enter email "
                required
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              <Label>
                Email <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.email}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassPA}
                placeholder="Enter password"
                required
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Label>
                Password <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.password}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="file"
                // className={validClassPA}
                // placeholder="Enter password"
                // required
                name="ProfilePhoto"
                // value={password}
                onChange={handlePhotoChange}
              />
              <Label>
                Profile Photo 
              </Label>
            
            </div>

            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Is Active</Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={handleClick}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setmodal_list(false);
                  setValues(initialState);
                  setIsSubmit(false);
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={modal_edit}
        toggle={() => {
          handleTog_edit();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_edit(false);
            setIsSubmit(false);
          }}
        >
          Edit Admin Users
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassFN}
                placeholder="Enter first Name"
                required
                name="firstName"
                value={firstName}
                onChange={handleFisrtNameChange}
              />
              <Label>
                First Name<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.firstName}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassLN}
                placeholder="Enter last Name"
                required
                name="lastName"
                value={lastName}
                onChange={handlelastNameChange}
              />
              <Label>
                Last Name<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.lastName}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassEM}
                placeholder="Enter email "
                required
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              <Label>
                Email <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.email}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassPA}
                placeholder="Enter password"
                required
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Label>
                Password <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.password}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="file"
                // className={validClassPA}
                // placeholder="Enter password"
                // required
                name="ProfilePhoto"
                // value={password}
                onChange={handlePhotoChange}
              />
              <Label>
                Profile Photo 
              </Label>
              <img src={photo} width={"50%"} height={"50%"}/>
            </div>
         
            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                checked={IsActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Is Active</Label>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={handleUpdate}
              >
                Update
              </button>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setmodal_edit(false);
                  setIsSubmit(false);
                  setFormErrors({});
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(false);
          }}
        >
          Remove Admin
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
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default AdminUser;
