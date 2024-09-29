import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Select from 'react-select';
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

import {
  createBlogs,
  getBlogs,
  removeBlogs,
  updateBlogs,
  uploadImage,
} from "../../functions/Blogs/Blogs";
// import { createServices } from "../../functions/Services/Services";
import { createDoctor,createLocation,editLocation, getDoctorById, removeDoctor, removeLocation, updateDoctorManagement } from "../../functions/DoctorManagement/DoctorManagement";
const init = {
  SpecialityName: "",
  docname: "",
  detail: "",
  where: "",
  when: "",
  specialityNameOther: ""
};

const CompanyDetails = () => {
  const [servicename, setServiceName] = useState("");
  const[editlocid,setEditLocId]=useState([]);
  const[editAddId,setEditAddId]=useState("");
  const[edituserid,setEditUserId]=useState("");
  const [temporaryData1,setTemporaryData1]=useState([]);
  const [SpecialityName, setSpeciality] = useState("");
  const [SpecialityValue, setSpecialityValue] = useState("");
  const [values, setValues] = useState(init);
  const [servicedetail, setServiceDetail] = useState("");
  const [uploadicon, setUploadIcon] = useState("");
  const [homeicon, setHomeIcon] = useState("");
  const [blogDesc, setblogDesc] = useState("");
  const [blogImage, setblogImage] = useState("");
  const [blogThumnailDesc, setblogThumnailDesc] = useState("");
  const [views, setViews] = useState(0);
  const [blogTitle, setblogTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [where, setWhere] = useState("");
  const [when, setWhen] = useState("");
  const [updatedIds,setUpdatedIds]=useState([]);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [docname, setDocname] = useState("");
  const [docimg, setDocimg] = useState("");
  const [specialityNameOther, setSpecialityNameOther] = useState("");
  const [editedValues, setEditedValues] = useState({
    where: '',
    when: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [whereEdit,setWhereEdit]=useState([]);
  const [whenEdit,setWhenEdit]=useState([]);



  const [loadingOption, setLoadingOption] = useState(false);

  const [likes, setlikes] = useState([]);
  const [comments, setcomments] = useState([]);
  const [userId, setuserId] = useState(localStorage.getItem("AdminUser"));
  const [IsActive, setIsActive] = useState(false);
  const [selectedspecialityId, setSelectedspecialityId] = useState('');
  const [doctors, setDoctors] = useState([]);
  let [where1, setWhere1] = useState("");
  let [when1, setWhen1] = useState("");
  const[stype,setStype]=useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [temporaryData, setTemporaryData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [whereData, setWhereData] = useState([]);
  const [whenData, setWhenData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [column, setcolumn] = useState();
  const [finalloc,setFinalLoc]=useState([]);
  const idsArray = [];
  const idsArray1=[];
  
  const [sortDirection, setsortDirection] = useState();

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [query, setQuery] = useState("");
  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [blogs, setBlogs] = useState([]);

  const getspecialities = async () => {
    const spec = await axios.get(`${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/specialitiesnames`);
    const specialities = spec.map(item => ({
      value: item._id, label: item.SpecialityName, id: item._id
    }));
    console.log("specialities", specialities);
    setOptions(specialities);
    // setSpeciality(specialities);

  }

  const stripHtmlTags = (html) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  };
  useEffect(() => {
    getspecialities();
  }
    , []);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);
  useEffect(() => {
    fetchUsers();
    console.log("doctors in useeffect",doctors);
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchUsers = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

  
   await axios
      .post(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/getdoctors`,
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
          console.log(response);
          let res=response[0];
          setDoctors(res.data);
          console.log("response in getdoctorsss doctorsss",doctors); 
          console.log("response in getdoctorsss",res);
          setLoading(false);
          setBlogs(response[0].data)
          setTotalRows(response[0].count);

        }
        else if (response.length === 0) {
          setBlogs([]);
          setDoctors([]);
        }
      })
         
    setLoading(false);
   };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file
            .then((file) => {
              body.append("uploadImg", file);
              uploadImage(body)
                .then((res) => {
                  console.log("res", res.url);
                  resolve({
                    default: `${process.env.REACT_APP_API_URL_SHELDON}/uploads/ServiceCKImages/${res.url}`,
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => reject(err));
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (_id) => {
    setWhereData("")
    setWhenData("")
    // setmodal_edit(!modal_edit);
    setIsSubmit(false);
    setUpdateForm(true);
    console.log("updare where", where);
    console.log("updare when", when);
    setPhotoAdd(photoAdd);

    setIsSubmit(false);
    set_Id(_id);
    getDoctorById(_id)
      .then((res) => {
        // console.log("res in doctor by id",idsArray);
        res.Location.forEach(location => {
          idsArray.push(location._id);
      });
      console.log("res in doctor by id",idsArray);
      
      // Output the idsArray
        setSpeciality(res.SpecialityName._id);
        setEditUserId(res._id);
        setEditLocId(idsArray);
        setSpecialityLabel(res.SpecialityName.SpecialityName)
        setSpecialityValue(res.SpecialityName.SpecialityName)
        setDocname(res.DoctorName);
        setDocimg(res.photo);
        setSpecialityNameOther(res.specialityNameOther);
        setDetail(res.detail);
        setTemporaryData1(res.Location);
        setWhereData([...whereData, res.Location.Where]);
        setWhenData([...whenData, res.Location.When]);
        console.log("temp data", temporaryData);
        console.log("where data", whereData);
        console.log("when data", whenData);
        console.log("updare where", values.where);
        console.log("updare when", values.when);
        // console.log("user idd to be edited issss",edituserid);
        // console.log("location idssss",editlocid);

        // setlikes(res.likes);
        // setcomments(res.comments);
        // setblogThumnailDesc(res.blogThumnailDesc);
        // setViews(res.views);
        // setuserId(res.userId);
        // setIsActive(res.IsActive);
      })
      .catch((err) => {
        console.log(err);
      });
     
  };

  //  Values({ ...values, where: [...values.when, newWhenValue] });
  // };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({ ...values, [name]: value });
  // };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.DoctorName]: e.target.value });
  };


  const handleLocationAddClick = () => {
    const index = temporaryData.findIndex(item => item.where === values.where && item.when === values.when);

    if (index !== -1) {
      // If record already exists, update it
      const updatedTemporaryData = [...temporaryData];
      // updatedTemporaryData[index] = { where: values.where, when: values.when };
      setTemporaryData(prevData => [...prevData, { where: where, when: when }]);
      setWhere(values.where);
      setWhen(values.when);
      // setTemporaryData(updatedTemporaryData);
    } else {
      // If record does not exist, add it
      setTemporaryData([...temporaryData, { where: values.where, when: values.when }]);
    }

    // Clear input fields
    setValues({ where: '', when: '' });
  };

  const handleDeleteClick = (index) => {
    // const updatedTemporaryData = [...temporaryData];
    // temporaryData.splice(index, 1); // Remove the record at the specified index
    // whereData.splice(index, 1); // Remove the record at the specified index
    // whenData.splice(index, 1); // Remove the record at the specified index
    const updatedTemporaryData = temporaryData.filter((_, i) => i !== index);
    const updatedWhereData = whereData.filter((_, i) => i !== index);
    const updatedWhenData = whenData.filter((_, i) => i !== index);

    setTemporaryData(updatedTemporaryData);
    setWhereData(updatedWhereData);
    setWhenData(updatedWhenData);
    removeLocation(finalloc[index]).then((res)=>{
      console.log("location deleted!",res);

    }).catch((err)=>{
      console.log("error in deleting location isss",err);
    });
    const finaldeleted=finalloc.filter((_, i) => i !== index);
    // const final=finalloc.splice(index, 1)
    setFinalLoc(finaldeleted);
    console.log("after delete", finalloc);
    console.log("after where delete", whereData);
    console.log("after when delete", whenData);
    // console.log("after delete",temporaryData);
    // console.log("after where delete",whereData);
    // console.log("after when delete",whenData);
};
const handleDeleteClick2 = (index) => {
  // const updatedTemporaryData = [...temporaryData];
  // temporaryData.splice(index, 1); // Remove the record at the specified index
  // whereData.splice(index, 1); // Remove the record at the specified index
  // whenData.splice(index, 1); // Remove the record at the specified index
  const updatedTemporaryData1 = temporaryData1.filter((_, i) => i !== index);
  const updatedWhereEdit = whereEdit.filter((_, i) => i !== index);
  const updatedWhenEdit = whenEdit.filter((_, i) => i !== index);

  setTemporaryData1(updatedTemporaryData1);
  setWhereEdit(updatedWhereEdit);
  setWhenEdit(updatedWhenEdit);
  removeLocation(editlocid[index]).then((res)=>{
    console.log("location deleted!",res);

  }).catch((err)=>{
    console.log("error in deleting location isss",err);
  });
  const editfinal=editlocid.filter((_, i) => i !== index);
  setEditLocId(editfinal);

  console.log("after delete", temporaryData);
  console.log("after where delete", whereData);
  console.log("after when delete", whenData);
  // console.log("after delete",temporaryData);
  // console.log("after where delete",whereData);
  // console.log("after when delete",whenData);
};
  const handleEditClick = (index) => {
    const record = temporaryData[index];
    setEditedValues({ where: record.where, when: record.when });
    setEditIndex(index);
    setModalOpen();
  };
  const handleLocation = (e) => {
    e.preventDefault();
    setFormErrors({});
    // const formdata = { When, Where };

    // const { SpecialityName, docname, detail, where, when, docimg } = values;



    // if (Object.keys(errors).length === 0) {

    // const formdata = new FormData();

    // formdata.append("SpecialityName", SpecialityName);
    values.where = where;
    values.when = when;

    console.log("whwere", values.where);
    console.log("when", values.when);
    // Add "where" and "when" values to temporaryData array
    console.log("data", whenData)
    console.log("data", whereData)
    setTemporaryData(prevData => [...prevData, { where: stripHtmlTags(where), when: stripHtmlTags(when) }]);
    // setWhereData(prevData => [...prevData, { where: stripHtmlTags(where)}]);
    // setWhenData(prevData => [...prevData, { when: stripHtmlTags(when) }]);
    setWhereData([...whereData, stripHtmlTags(values.where)]);
    setWhenData([...whenData, stripHtmlTags(values.when)]);

    console.log("temp data", temporaryData);
    console.log("where data", whereData);
    console.log("when data", whenData);



    values.where = stripHtmlTags(values.where);
    values.when = stripHtmlTags(values.when);
    console.log("values where", values.where);
    // const form=new FormData();
    // form.append("whereData",whereData);
    // form.append("whenData",whenData)  
 
    const formdata = { when, where }; 
    createLocation(formdata)
    .then((res) => {
      console.log(res);
      setFinalLoc([...finalloc, res._id]);
      // setFinalLoc(prevData => [...prevData,{location: res._id} ]);
      console.log("final location issss",finalloc);
      // setmodal_list(!modal_list);
      
      // setShowForm(false);
      // setLoadingOption(false);
    //   createLocation(whereData, whenData)
    // .then((res) => {
    //   console.log(res);
    //   // setmodal_list(!modal_list);
      
    //   setShowForm(false);
    //   setLoadingOption(false);

    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    })
    .catch((err) => {
      console.log(err);
    });

  };
  const handleLocation1 = (e) => {
    e.preventDefault();
    setFormErrors({});
    // const formdata = { When, Where };

    // const { SpecialityName, docname, detail, where, when, docimg } = values;



    // if (Object.keys(errors).length === 0) {

    // const formdata = new FormData();

    // formdata.append("SpecialityName", SpecialityName);
    values.where = where;
    values.when = when;

    console.log("whwere", values.where);
    console.log("when", values.when);
    // Add "where" and "when" values to temporaryData array
    console.log("data", whenData)
    console.log("data", whereData)
    // setTemporaryData1(prevData => [...prevData, {_id:, Where: stripHtmlTags(where), When: stripHtmlTags(when) }]);
    // setWhereData(prevData => [...prevData, { where: stripHtmlTags(where)}]);
    // setWhenData(prevData => [...prevData, { when: stripHtmlTags(when) }]);
    setWhereEdit([...whereEdit, stripHtmlTags(values.where)]);
    setWhenEdit([...whenEdit, stripHtmlTags(values.when)]);

    console.log("temp data", temporaryData1);
    console.log("where data", whereEdit);
    console.log("when data", whenEdit);



    values.where = stripHtmlTags(values.where);
    values.when = stripHtmlTags(values.when);
    console.log("values where", values.where);
    // const form=new FormData();
    // form.append("whereData",whereData);
    // form.append("whenData",whenData)  
   setWhen(stripHtmlTags(when));
   setWhere(stripHtmlTags(where));
  //  const when1=stripHtmlTags(when);
  //  const where1=stripHtmlTags(where);
    const formdata = { when, where}; 
    createLocation(formdata)
    .then((res) => {
      console.log(res);
      setFinalLoc([...finalloc, res._id]);
      setEditAddId(res._id);
      // idsArray.push(res._id);
      setEditLocId([...editlocid, res._id]);
      // setFinalLoc(prevData => [...prevData,{location: res._id} ]);
      console.log("final location issss",finalloc);
      setTemporaryData1(prevData => [...prevData, {_id:res._id, Where: stripHtmlTags(where), When: stripHtmlTags(when) }]);
      // setmodal_list(!modal_list);
      
      // setShowForm(false);
      // setLoadingOption(false);
    //   createLocation(whereData, whenData)
    // .then((res) => {
    //   console.log(res);
    //   // setmodal_list(!modal_list);
      
    //   setShowForm(false);
    //   setLoadingOption(false);

    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    })
    .catch((err) => {
      console.log(err);
    });

  };
  // const handleClick1 = (e) => {

  // }
  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});

    // const { SpecialityName, docname, detail, where, when, docimg } = values;
    let erros = validate(SpecialityName,docname);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {

    // const formdata = new FormData();

    // formdata.append("SpecialityName", SpecialityName);
    values.detail = stripHtmlTags(detail);
    //  values.where=where;
    //  values.when=when;

    console.log("docname", values);


    console.log("where data iisisis", whereData);

    console.log("final loc",finalloc);
    createDoctor(SpecialityName,docname,detail,finalloc,docimg,specialityNameOther)
      .then((res) => {
        console.log(res);
        // setmodal_list(!modal_list);
        
        setShowForm(false);
        setLoadingOption(false);
        setSpeciality("");
        setDocname("");
        setSpecialityLabel("");
        setTemporaryData([]);
        setWhere("");
        setWhen("");
        setSpecialityNameOther("");
        setDetail("");
        setDocimg("");
        setPhotoAdd("");
        setCheckImagePhoto(false);
        setFinalLoc([]);
        fetchUsers();
      //   createLocation(whereData, whenData)
      // .then((res) => {
      //   console.log(res);
      //   // setmodal_list(!modal_list);
        
      //   setShowForm(false);
      //   setLoadingOption(false);

      // })
      // .catch((err) => {
      //   console.log(err);
      // });
   
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setDocname(value);

    // You can perform validation or formatting here if needed
    setValues({
      ...values,
      docname: value // Assuming label is the property holding the SpecialityName value
    });
  };

  const handlespecialityNameOther = (event) => {
    const { value } = event.target;
    setSpecialityNameOther(value);

    // You can perform validation or formatting here if needed
    setValues({
      ...values,
      specialityNameOther: value // Assuming label is the property holding the SpecialityName value
    });
  };
  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
    setValues(init);
    setIsSubmit(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeDoctor(remove_id)
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
    let erros = validate(SpecialityName, docname);
    setFormErrors(erros);
    setIsSubmit(true);
    const likesString = JSON.stringify(likes);
    const commentString = JSON.stringify(comments);

    if (Object.keys(erros).length === 0) {

      const formdata = new FormData();

      formdata.append("my", blogImage);
      formdata.append("blogTitle", blogTitle);
      formdata.append("blogDesc", blogDesc);
      formdata.append("IsActive", IsActive);
      formdata.append("comments", commentString);
      formdata.append("views", views);
      formdata.append("blogThumnailDesc", blogThumnailDesc);
      formdata.append("likes", likesString);
      formdata.append("userId", userId);
      values.detail = stripHtmlTags(detail);
      temporaryData1.forEach(location => {
        idsArray1.push(location._id);
    });

      updateDoctorManagement(_id, SpecialityName, docname, stripHtmlTags(detail), editlocid, docimg, specialityNameOther)
        .then((res) => {
          if(res.message ==='No loc')
          {
            setUpdateForm(false);
            setShowForm(false);
            fetchUsers();

          }
          // setmodal_edit(!modal_edit);
          const formdata = new FormData();
          // setPhotoAdd("");
          // setPhotoAdd1("");
          // setUpdateForm(false);

          // setCheckImagePhoto(false);
          // setCheckImagePhoto1(false);
          // setDetail("");
          // setSpecialityName("");
          // setUploadHomeIcon("");
          // setUploadIcon("");
          // setValues(initialState);
           setUpdateForm(false);
           setShowForm(false);
           setSpeciality("");
           setCheckImagePhoto(false);
           setSpecialityLabel("");
           setWhere("");
           setWhen("");
        setDocname("");
        setSpecialityNameOther("");
        setDetail("");
        setEditLocId([]);
        setPhotoAdd("");
        setDocimg("");
           fetchUsers();

        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [errspeciality, setErrSpeciality] = useState(false);
  const [errBT, setErrBT] = useState(false);
  const [errBD, setErrBD] = useState(false);
  const [errBTD, setErrBTD] = useState(false);
  const [errBI, setErrBI] = useState(false);
  const [options, setOptions] = useState([]);
  const [errdocname, setErrDocname] = useState(false);
  const [errspecialityNameOther, setErrspecialityNameOther] = useState(false);

  const validate = (SpecialityName, docname) => {
    const errors = {};

    if (SpecialityName === "") {
      errors.SpecialityName = "category is required!";
      setErrSpeciality(true);
    }
    else{
      setErrSpeciality(false);
    }
    // if (SpecialityName !== "") {
    //   setErrSpeciality(false);
    // }

    if (docname === "") {
      errors.docname = "doctor name is required!";
      setErrDocname(true);
    }
    else{
      setErrDocname(false);
    }
    if (!/^[A-Za-z\s.,]+$/.test(docname)) {
      errors.docname = "Doctor Name should contain only alphabets, spaces, dots, and commas";
      setErrDocname(true);
    } else if (/\d/.test(docname)) {
      // Check if the docname contains numbers
      errors.docname = "Doctor Name should not contain numbers";
      setErrDocname(true);
    } else {
      setErrDocname(false);
    }


    return errors;
  };
  const validClassSP =
    errspeciality && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassName =
    errdocname && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassspecialityNameOther =
    errspecialityNameOther && isSubmit ? "form-control is-invalid" : "form-control";


  const validClassBT =
    errBT && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassBD =
    errBD && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassBTD =
    errBTD && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassBI =
    errBI && isSubmit ? "form-control is-invalid" : "form-control";

  const [loading, setLoading] = useState(false);
  // const [totalRows, setTotalRows] = useState(0);
  // const [perPage, setPerPage] = useState(10);
  // const [column, setcolumn] = useState();
  // const [sortDirection, setsortDirection] = useState();
  // const [pageNo, setPageNo] = useState(0);
  //   const [options, setOptions] = useState([]);
  //  const options = [
  //   { value: 'option1', label: 'Option 1' },
  //   { value: 'option2', label: 'Option 2' },
  //   { value: 'option3', label: 'Option 3' }
  // ];
  const [SpecialityLabel, setSpecialityLabel] = useState("");


  const handleSpecialityChange = (event) => {
    console.log(event)
    console.log("spe", event.value)
    setSelectedspecialityId(event.value);
    console.log("iddd isss", event.value);
    setSpecialityLabel(event.label);
    // setSpecialityValue(selectedOption.label);
    setSpeciality(event.value)
    setValues({
      ...values,
      SpecialityName: event.value // Assuming label is the property holding the SpecialityName value
    });
  };
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
  const showForm1 = () => {
    setShowForm(!showForm);
  }
  const fetchCategories = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list-by-params/blogs`,
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
  const handleSaveEdit = () => {
    const updatedTemporaryData = [...temporaryData];
    let where1=where;
    let when1=when;
    // setEditedValues({where1,when1})
    updatedTemporaryData[editIndex] = { where: stripHtmlTags(where1), when: stripHtmlTags(when1) };
    console.log("whereer",where1);
    console.log("wheneerer",when1);
    whereData[editIndex] = stripHtmlTags(where);
    whenData[editIndex] = stripHtmlTags(when);
    console.log("wheredata on edit", whereData);
    console.log("whendata on edit", whenData);
    console.log("where on edit", where1);
    console.log("when on edit", when1);
    setTemporaryData(updatedTemporaryData);
    console.log("temporaraydata on edittttt issssss",temporaryData);
    // setModalOpen(false);
    let editloc=finalloc[editIndex];
    editLocation(editloc,stripHtmlTags(where1),stripHtmlTags(when1)).then((res) => {
      console.log("response in handleeditlocation2",res);
      // setmodal_list(!modal_list);
      
      // setShowForm(false);
    //   createLocation(whereData, whenData)
    // .then((res) => {
    //   console.log(res);
    //   // setmodal_list(!modal_list);
      
    //   setShowForm(false);
    //   setLoadingOption(false);

    // })
    // .catch((err) => {
    //   console.log(err);
    // });
 
    })
    .catch((err) => {
      console.log(err);
    });
    setIsEditing(false); // Exit edit mode
  };
  const handleSaveEdit1 = () => {
    const updatedTemporaryData1 = [...temporaryData1];
    let where1=where;
    let when1=when;
    // setEditedValues({where1,when1})
    updatedTemporaryData1[editIndex] = { Where: stripHtmlTags(where1), When: stripHtmlTags(when1) };
    console.log("whereer",where1);
    console.log("wheneerer",when1);
    whereEdit[editIndex] = stripHtmlTags(where1);
    whenEdit[editIndex] = stripHtmlTags(when1);
    console.log("wheredata on edit", whereData);
    console.log("whendata on edit", whenEdit);
    console.log("where on edit", where1);
    console.log("when on edit", when1);
    setTemporaryData1(updatedTemporaryData1);
    console.log("temporaraydata on edittttt issssss",temporaryData1);
    // setModalOpen(false);
    let editloc=editlocid[editIndex];
    const formdata1={where1,when1}
    console.log("fomdata",formdata1);
    editLocation(editloc,stripHtmlTags(where1),stripHtmlTags(when1)).then((res) => {
      console.log("response in handleeditlocation2",res);
      // setmodal_list(!modal_list);
      
      // setShowForm(false);
    //   createLocation(whereData, whenData)
    // .then((res) => {
    //   console.log(res);
    //   // setmodal_list(!modal_list);
      
    //   setShowForm(false);
    //   setLoadingOption(false);

    // })
    // .catch((err) => {
    //   console.log(err);
    // });
 
    })
    .catch((err) => {
      console.log(err);
    });
    setIsEditing(false); // Exit edit mode
  };
  const handleCancelEdit = () => {
    setModalOpen(false);
  };
  const [photoAdd, setPhotoAdd] = useState("");
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);

  //   const PhotoUpload = (e) => {
  //     if (e.target.files.length > 0) {
  //       const image = new Image();

  //       let imageurl = URL.createObjectURL(e.target.files[0]);
  //       console.log("img", e.target.files[0]);

  //       setPhotoAdd(imageurl);
  //       // setValues({ ...values, blogImage: e.target.files[0] });
  //       setblogImage(e.target.files[0]);
  //       setCheckImagePhoto(true);
  //     }
  //   };
  const PhotoChange = (e) => {
    // if (e.target.files.length > 0) {
      if (e.target.files.length > 0) {
        const image = new Image();
  
        let imageurl = URL.createObjectURL(e.target.files[0]);
        console.log("img", e.target.files[0]);
  console.log(imageurl);
        setPhotoAdd(imageurl);
        // setValues({ ...values, blogImage: e.target.files[0] });
        setDocimg(e.target.files[0]);
        setCheckImagePhoto(true);
      }
    };
  
  const handleEditClick1 = (index) => {
    console.log("inside the edit ", index)
    setEditIndex(index);
    const { where, when } = temporaryData[index];
//     if (Array.isArray(where)) {
//       const singleString = where.join(' '); // You can specify a separator between elements if needed
//       setWhere(singleString);
//   }
//   if (Array.isArray(when)) {
//     const singleString = when.join(' '); // You can specify a separator between elements if needed
//     setWhen(singleString);
// }
    setWhere(stripHtmlTags(where));
    setWhen(stripHtmlTags(when));
    console.log("where on edit click isss", where);
    console.log("when on edit click isss", when);
    // setWhere(where);
    // setWhen(when);
    // where1=values.where;
    // when1=values.when;
    setEditedValues({ where, when });
    // setWhere(editedValues.where);
    // setWhen(editedValues.when);
    // whereData[editIndex]=editedValues.where;
    console.log("editteddddd where",editedValues.where);
    
    console.log("editteddddd when",editedValues.when);
    // setWhere();
    // setWhen(editedValues.when.data);
    // whenData[editIndex]=editedValues.when;
  //  setModalOpen(true);
  setIsEditing(true);
  };
  const handleEditClick2 = (index) => {
    console.log("inside the edit ", index)
    setEditIndex(index);
    const { Where, When } = temporaryData1[index];
//     if (Array.isArray(where)) {
//       const singleString = where.join(' '); // You can specify a separator between elements if needed
//       setWhere(singleString);
//   }
//   if (Array.isArray(when)) {
//     const singleString = when.join(' '); // You can specify a separator between elements if needed
//     setWhen(singleString);
// }
    setWhere(stripHtmlTags(Where));
    setWhen(stripHtmlTags(When));
    console.log("where on edit click isss", Where);
    console.log("when on edit click isss", When);
    console.log("loctidssssss in edit click2 ",editlocid);
    // setWhere(where);
    // setWhen(when);
    // where1=values.where;
    // when1=values.when;
    setEditedValues({ where, when });
    // setWhere(editedValues.where);
    // setWhen(editedValues.when);
    // whereData[editIndex]=editedValues.where;
   
    console.log("editteddddd where",editedValues.where);
    
    console.log("editteddddd when",editedValues.when);
   
    // setWhere();
    // setWhen(editedValues.when.data);
    // whenData[editIndex]=editedValues.when;
  //  setModalOpen(true);
  
  setIsEditing(true);
  };
  const handleChange1 = (e) => {
    const { DoctorName, value } = e.target;
    setEditedValues({ ...editedValues, [DoctorName]: value });
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
    setShowForm(false);
    setUpdateForm(false);
    setSpeciality("");
    setDocname("");
    setSpecialityLabel("");
    setTemporaryData([]);
    setWhere("");
    setWhen("");
    setSpecialityNameOther("");
    setDetail("");
    setDocimg("");
    setPhotoAdd("");
    setCheckImagePhoto(false);
    setFinalLoc([]);
    fetchUsers();
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
  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setUpdateForm(false);
    setShowForm(false);
    setSpeciality("");
    setSpecialityLabel("");
    setWhere("");
    setWhen("");
 setDocname("");
 setSpecialityNameOther("");
 setDetail("");
 setEditLocId([]);
 setPhotoAdd("");
 setDocimg("");
    fetchUsers();

  };

  const col = [
    {
      name: "Sr No.",
      selector:(row,index)=>index+1,
      
      minWidth: "50px",
    },
    {
      name: "Category",
      cell: (row) => row.specialityNameOther,
      sortable: true,
      sortField: "blogTitle",
      minWidth: "150px",
    },
    {
      name: "Doctor Name",
      cell: (row) => row.DoctorName,
      sortable: true,
      sortField: "Speciality Name",
      minWidth: "150px",
    },
    {
      name: "Speciality Name",
      cell: (row) =>  row.specialtyInfo.map((item)=>item.SpecialityName),
      sortable: true,
      sortField: "blogTitle",
      minWidth: "150px",
    },

    // {
    //   name: " Written By",
    //   cell: (row) => row.adminuser,
    //   sortable: true,
    //   sortField: "adminuser",
    //   minWidth: "150px",
    // },

    {
      name: "Profile Photo",
      cell: (row) => renderImage(row.photo),
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },

    {
      name: "Location",
      cell: (row) => (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Where</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
            {row.locationInfo.map((location, index) => (
            <tr key={index}>
              <td>{stripHtmlTags(location.Where)}</td>
              <td>{stripHtmlTags(location.When)}</td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      ),
      sortable: false,
      minWidth: "200px",
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

  document.title = "Add Speciality | Sheldon Medical";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Doctor Management" title="Doctor Management"  />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Doctor Management</h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      {/* <div
                        style={{
                          display: showForm || updateForm ? "none" : "",
                        }}
                      >
                        <div className="text-end mt-1">
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
                        </div>
                      </div> */}
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
                                      // setSpecialityName("");
                                      // setName("");
                                      // setphone("");
                                      // setDate("");
                                      // setEmail("");

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
                                    setblogDesc("");
                                    setblogTitle("");
                                    setlikes([]);
                                    setcomments([]);
                                    setuserId("");
                                    setIsActive(false);
                                    setblogImage("");
                                    setShowForm(false);
                                    setUpdateForm(false);
                                    // setFileId(Math.random() * 100000);
                                  }}
                                >
                                  <i class="ri-list-check align-bottom me-1"></i>{" "}
                                  View/List Records
                                </button>
                              </div>
                            </Col> 
                          </Row> 
                          </div>
                        {/* </div> */}

                        {/* search */}
                        <div
                          className="search-box ms-2"
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <input
                            className="form-control search"
                            placeholder="Search Doctor Name"
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
                                    <Label>
                                      Category{" "}
                                      <span class="text-danger">*</span>

                                    </Label>
                                    <Select
                                      placeholder={SpecialityLabel}
                                      name="Speciality"
                                      // className={validClassSP}
                                      id="Speciality"
                                      value={selectedspecialityId}
                                      options={options}
                                      onChange={handleSpecialityChange}
                                    />

                                    {/* <select
                                            id="Speciality"
                                            value={selectedspecialityId}
                                            onChange={handleSpecialityChange}
                                        >
                                            <option value="">Select a doctor</option>
                                            {SpecialityName.map(spec => (
                                                <option key={spec.id} value={spec.id}>
                                                    {spec.label}
                                                </option>
                                            ))}
                                        </select> */}



                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.SpecialityName}
                                      </p>
                                    )}

                                  </Col>
                                  <Col lg={4}>
                                    <Label>
                                      Doctor Name{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                      // key={"blogTitle_" + _id}
                                      type="text"
                                      className={validClassName}
                                      placeholder="Enter name"
                                      required
                                      name="docname"
                                      value={docname}
                                      onChange={handleNameChange}
                                    />

                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.docname}
                                      </p>
                                    )}

                                  </Col>
                                  <Col lg={4}>
                                    <Label>
                                      Speciality{" "}

                                    </Label>
                                    <Input
                                      // key={"blogTitle_" + _id}
                                      type="text"
                                      // className={validClassName}
                                      placeholder="Enter Speciality "
                                      required
                                      name="specialityNameOther"
                                      value={specialityNameOther}
                                      onChange={handlespecialityNameOther}
                                    />

                                    {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.errdocname}
                                        </p>
                                      )} */}

                                  </Col>



                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                        Detail
                                        {/* <span className="text-danger">*</span> */}
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"blogDesc_" + _id}
                                          editor={ClassicEditor}
                                          data={detail}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setDetail(data);
                                            console.log(detail);
                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.detail}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>
                                  <Label>
                                    Location Detail
                                    {/* <span className="text-danger">*</span> */}
                                  </Label>

                                  <Col lg={6}>

                                    <Card>
                                      <Label>
                                        where
                                        {/* <span className="text-danger">*</span> */}
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"blogDesc_" + _id}
                                          editor={ClassicEditor}
                                          data={where}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setWhere(data);
                                            console.log(where);


                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.blogDesc}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>
                                 
                                  <Col lg={6}>
                                    <Card>
                                      <Label>
                                        when
                                        {/* <span className="text-danger">*</span> */}
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"blogDesc_" + _id}
                                          editor={ClassicEditor}
                                          data={when}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setWhen(data);
                                            console.log(when);
                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.blogDesc}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>
                                  {/* {isEditing ? (
                    <button type="button" className="btn btn-success  m-1" onClick={handleSaveEdit}>Update Location</button>
                ) : (
                    <button type="button" className="btn btn-success  m-1" onClick={handleLocation}>Add Location</button>
                )} */}
                                  <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                    {isEditing ? (
                    <button type="button" className="btn btn-success  m-1" onClick={handleSaveEdit}>Update Location</button>
                ) : (
                    <button type="button" className="btn btn-success  m-1" onClick={handleLocation}>Add Location</button>
                )}

                                    </div>
                                  </Col>
                                  {/* <div className="mt-5">
                                    <Col lg={6}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"IsActive_" + _id}
                                          type="checkbox"
                                          name="IsActive"
                                          value={IsActive}
                                          // onChange={handleCheck}
                                          onChange={(e) => {
                                            setIsActive(e.target.checked);
                                          }}
                                          checked={IsActive}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          Is Active
                                        </Label>
                                      </div>
                                    </Col>
                                  </div> */}
                                  {/* <table>
        <thead>
          <tr>
            <th>Where</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          {temporaryData.map((data, index) => (
            <tr key={index}>
              <td>{stripHtmlTags(data.where)}</td>
              <td>{stripHtmlTags(data.when)}</td>
            </tr>
          ))}
          
        </tbody>
      </table> */}
                                  {/* <div>
      <label htmlFor="where">Where:</label>
      <input type="text" id="where" name="where" value={values.where} onChange={handleChange} />
      <label htmlFor="when">When:</label>
      <input type="text" id="when" name="when" value={values.when} onChange={handleChange} />
      <button onClick={handleLocationAddClick}>Add Location</button>

      <table>
        <thead>
          <tr>
            <th>Where</th>
            <th>When</th>
            <th>Actions</th> {/* Add a new column for actions }
          </tr>
        </thead>
        <tbody>
          {temporaryData.map((data, index) => (
            <tr key={index}>
              <td>{data.where}</td>
              <td>{data.when}</td>
              <td>
                {/* Add delete icon with onClick handler/}
                <button onClick={() => handleDeleteClick(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          </div> */}
                                  <div>

                                    <table className="table table-bordered">
                                      <thead>
                                        <tr>
                                          <th>Where</th>
                                          <th>When</th>
                                          <th>Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
  {temporaryData.map((data, index) => {
    // Checking if the data is an array and has more than 0 elements
    if (Array.isArray(data) && data.length > 0) {
      // Rendering multiple rows based on the length of the first element
      return data[0].map((whereData, rowIndex) => (
        <tr key={index + "-" + rowIndex}>
          <td>{stripHtmlTags(data[0])}</td>
          <td>{stripHtmlTags(data[1])}</td>
          <td>
            <Col lg={12}>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="submit"
                  className="btn btn-success m-1"
                  id="add-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditClick1(index);
                  }}
                >
                  Edit
                </button>
                <button
                  type="submit"
                  className="btn btn-danger m-1"
                  id="add-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteClick(index)}
                  }
                >
                  Delete
                </button>
              </div>
            </Col>
          </td>
        </tr>
      ));
    } else {
      // If data is not an array or has 0 elements, render a single row
      return (
        <tr key={index}>
          <td>{data.where}</td>
          <td>{data.when}</td>
          <td>
            <Col lg={12}>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="submit"
                  className="btn btn-success m-1"
                  id="add-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditClick1(index);
                  }}
                >
                  Edit
                </button>
                <button
                  type="submit"
                  className="btn btn-danger m-1"
                  id="add-btn"
                  onClick={(e) =>{ 
                    e.preventDefault();
                    handleDeleteClick(index)}}
                >
                  Delete
                </button>
              </div>
            </Col>
          </td>
        </tr>
      );
    }
  })}
</tbody>

                                    </table>
                                  </div>

                                  {loadingOption && (
                                    <div className="d-flex justify-content-center">
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                      <h6 className="p-2">
                                        Wait for a few seconds.This process
                                        might take some time.
                                      </h6>
                                    </div>
                                  )}
                                  <Col lg={6}>
                                    <label>
                                      upload Photo{" "}

                                    </label>

                                    <Input
                                      key={"blogImage_" + _id}
                                      type="file"
                                      name="photo"
                                      className={validClassBI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoChange}
                                    />
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.blogImage}
                                      </p>
                                    )}
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
                                  <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        id="add-btn"
                                        onClick={handleClick}
                                      >
                                        Add
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
                          {/* <PreviewCardHeader title="Billing Product Form" /> */}
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                  <Col lg={4}>
                                    <Label>
                                      Speciality{" "}
                                      <span class="text-danger">*</span>

                                    </Label>
                                    <Select
                                      placeholder={SpecialityLabel}
                                      name="Speciality"
                                      id="Speciality"
                                      value={SpecialityName}
                                      options={options}
                                      onChange={handleSpecialityChange}
                                    />

                                    {/* <select
                                            id="Speciality"
                                            value={selectedspecialityId}
                                            onChange={handleSpecialityChange}
                                        >
                                            <option value="">Select a doctor</option>
                                            {SpecialityName.map(spec => (
                                                <option key={spec.id} value={spec.id}>
                                                    {spec.label}
                                                </option>
                                            ))}
                                        </select> */}



                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.SpecialityName}
                                      </p>
                                    )}

                                  </Col>
                                  <Col lg={4}>
                                    <Label>
                                      Doctor Name{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                      // key={"blogTitle_" + _id}
                                      type="text"
                                      className={validClassName}
                                      placeholder="Enter name"
                                      required
                                      name="docname"
                                      value={docname}
                                      onChange={handleNameChange}
                                    />

                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.docname}
                                      </p>
                                    )}

                                  </Col>
                                  <Col lg={4}>
                                    <Label>
                                      Speciality{" "}

                                    </Label>
                                    <Input
                                      // key={"blogTitle_" + _id}
                                      type="text"
                                      // className={validClassName}
                                      placeholder="Enter Speciality "
                                      required
                                      name="specialityNameOther"
                                      value={specialityNameOther}
                                      onChange={handlespecialityNameOther}
                                    />

                                    {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.errdocname}
                                        </p>
                                      )} */}

                                  </Col>



                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                        Detail
                                        {/* <span className="text-danger">*</span> */}
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"blogDesc_" + _id}
                                          editor={ClassicEditor}
                                          data={detail}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setDetail(data);
                                            console.log(detail);
                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.detail}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>
                                  <Label>
                                    Location Detail
                                    {/* <span className="text-danger">*</span> */}
                                  </Label>

                                  <Col lg={6}>

                                    <Card>
                                      <Label>
                                        where
                                        {/* <span className="text-danger">*</span> */}
                                      </Label>
                                      <CardBody>
                                        {console.log(where)}
                                        {console.log(when)}

                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"blogDesc_" + _id}
                                          editor={ClassicEditor}
                                          data={where}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setWhere(data);
                                            console.log("where issss",where);


                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.blogDesc}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>
                                  <Col lg={6}>
                                    <Card>
                                      <Label>
                                        when
                                        {/* <span className="text-danger">*</span> */}
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"blogDesc_" + _id}
                                          editor={ClassicEditor}
                                          data={when}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setWhen(data);
                                            console.log(when);
                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.blogDesc}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>
                                  <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                    {isEditing ? (
                    <button type="button" className="btn btn-success  m-1" onClick={handleSaveEdit1}>Update Location</button>
                ) : (
                    <button type="button" className="btn btn-success  m-1" onClick={handleLocation1}>Add Location</button>
                )}

                                    </div>
                                  </Col>
                                  {/* <div className="mt-5">
                                    <Col lg={6}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"IsActive_" + _id}
                                          type="checkbox"
                                          name="IsActive"
                                          value={IsActive}
                                          // onChange={handleCheck}
                                          onChange={(e) => {
                                            setIsActive(e.target.checked);
                                          }}
                                          checked={IsActive}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          Is Active
                                        </Label>
                                      </div>
                                    </Col>
                                  </div> */}
                                  {/* <table>
        <thead>
          <tr>
            <th>Where</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          {temporaryData.map((data, index) => (
            <tr key={index}>
              <td>{stripHtmlTags(data.where)}</td>
              <td>{stripHtmlTags(data.when)}</td>
            </tr>
          ))}
          
        </tbody>
      </table> */}  <div>
                                    

                                    <table className="table table-bordered">
                                      <thead>
                                        <tr>
                                          <th>Where</th>
                                          <th>When</th>
                                          <th>Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {/* <button type="submit">Update</button> */}
                                      {/* {whereData.map((when, index) => (
        <div key={index}>{when}</div>
      ))} */}
  {temporaryData1.map((location, index) => (
  <tr key={index}>
    <td>{stripHtmlTags(location.Where)}</td>
    <td>{stripHtmlTags(location.When)}</td>
    <td>
      <Col lg={12}>
        <div className="hstack gap-2 justify-content-end">
          <button
            type="submit"
            className="btn btn-success m-1"
            id="add-btn"
            onClick={(e) => {
              e.preventDefault();
              handleEditClick2(index);
            }}
          >
            Edit
          </button>
          <button
            type="submit"
            className="btn btn-danger m-1"
            id="add-btn"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteClick2(index);
            }}
          >
            Delete
          </button>
        </div>
      </Col>
    </td>
  </tr>
))}

</tbody>

                                    </table>
                                  </div>

                                  {loadingOption && (
                                    <div className="d-flex justify-content-center">
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                      <h6 className="p-2">
                                        Wait for a few seconds.This process
                                        might take some time.
                                      </h6>
                                    </div>
                                  )}
                                  <Col lg={6}>
                                    <label>
                                      upload Photo{" "}

                                    </label>

                                    <Input
                                      //   key={"blogImage_" + _id}
                                      type="file"
                                      name="photo"
                                      className={validClassBI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoChange}
                                    />
                                    {/* {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.blogImage}
                                      </p>
                                    )} */}
                                    {docimg||photoAdd ? (
                                      <img
                                        className="m-2"
                                        src={
                                          checkImagePhoto
                                            ? photoAdd
                                            : `${process.env.REACT_APP_API_URL_SHELDON}/${docimg}`
                                        }
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
                                        onClick={handleUpdate}
                                      >
                                        update
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
                          </CardBody>{" "}
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
                          data={doctors}
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
      {/* <Modal
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
          Add Banner
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                // className={validClassTT}
                placeholder="Enter code "
                required
                name="Title"
                value={where1}
                onChange={(e) => {
                 setWhere1(e.target.value)
                }}
              />
              <Label>
                Where<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Title}</p>}
            </div>

            <div className="form-floating mb-3">
              <Input
                type="text"
                // className={validClassKW}
                placeholder="Enter keyWord "
                required
                name="keyWord"
                value={when1}
                onChange={(event) => {

                  setWhen1(event.target.value);
                  console.log(when1);
                }}
              />
              <Label>
                When<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.keyWord}</p>}
            </div>

         

        

          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={handleClick1}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setmodal_list(false);
                  setValues(init);
                  setIsSubmit(false);
                  setCheckImagePhoto(false);
                  setPhotoAdd("");
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal> 
       
              </div>*
  );
};*/}
      {<Modal isOpen={modalOpen}>
        <div>
          Editing Record:
          <label htmlFor="editWhere">Where:</label>
          <input type="text" id="editWhere" name="where" value={editedValues.where} onChange={handleChange1} />
          <label htmlFor="editWhen">When:</label>
          <input type="text" id="editWhen" name="when" value={editedValues.when} onChange={handleChange1} />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
      }


      {/* // In the table, add buttons to trigger edit functionality */}
      {/* {temporaryData.map((record, index) => (
  <tr key={index}>
    <td>{record.where}</td>
    <td>{record.when}</td>
    <td>
      <button onClick={() => handleEditClick(index)}>Edit</button>
    </td>
  </tr>
))} */}


      {/*Remove Modal*/}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
          // setValues([]);
          setblogDesc("");
          setblogTitle("");
          setlikes([]);
          setcomments([]);
          setuserId("");
          setIsActive(false);
          setblogImage("");
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove Blog</span>
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

export default CompanyDetails;

