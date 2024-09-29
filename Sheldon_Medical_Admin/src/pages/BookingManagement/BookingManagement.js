
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
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

import {listSpecialityManagement,createBookingManagement,removeBookingManagement,updateBookingManagement
  ,getBookingManagement,
  createBookingAllotment,
  listDoctorManagement,
  getBookingManagementbyParams} from "../../functions/BookingManagement/BookingManagement"
import { closingDeals } from "../../common/data";
const BookingManagement = () => { 
  // const [capacity,setcapacity]=useState("");
 
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
const bookno=20900;
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
  const [BookingNo, setBookingNo] = useState("");

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
  const [modal_Booking, setmodal_Booking] = useState(false);

  const [spec,setspec]=useState("");

  const [SelectDocName,setDocName] = useState("")

  const tog_Booking = (_id) => {
    try{
    setmodal_Booking(!modal_Booking);
    

    console.log("Selected id",_id);
    set_Id(_id);
    
    // Fetch the specialty from Booking Management
    getBookingManagement(_id).then((res) => {
      const speciltyId = res.SpecialityName
      console.log("selected entry",res)
      console.log("Specialty ID:", speciltyId._id);
      setBookingNo(res.BookingNo);
      setspec(res.SpecialityName.SpecialityName)
  
      // Fetch the list of doctors
      const listDocPromise = listDoctorManagement();
      console.log("all doc",listDocPromise)
      listDocPromise.then((listDoc) => {
        // Filter doctors whose SpecialityName matches the fetched specialty ID
        const filteredDoctors = listDoc.filter(
          (doc) => doc.SpecialityName === speciltyId._id
        );
  
        console.log("Doctors with matching Specialty:", filteredDoctors);
        const Docnames = filteredDoctors.map((item)=>({
          value:item._id , label :item.DoctorName,
        }


        
       ));
       setDocName(Docnames)

       setDoctorlabel()
       setAlloted(true);
       setSpecialityName(res.SpecialityName._id);
       setLabelSpecialityName(res.SpecialityName.SpecialityName)
          setName(res.Name);
          setphone(res.Phone);
          setEmail(res.Email);
          let selectedDate = new Date(res.BookingDate);
          selectedDate.setDate(selectedDate.getDate() - 1);
          setDate(selectedDate);
          console.log(BookingDate)
          // setDate(res.BookingDate);
          setAllotmentTime(res.AllotmentTime)
          setAllotmentDate(res.BookingDate)
      });
    });
  }
  catch(err){
    console.log("errorrrr",err);
  }};
  
 
  const [modal_edit, setmodal_edit] = useState(false);

const[new1,setnew]=useState(false);

    const handle_Check_Allotment = (_id) =>{
      getBookingManagement(_id)
      
      .then((res) => {
      
        if(res.Alloted === false){
          handleTog_edit(_id)
        }
        else{

          alert("You cant edit the Speciality Name")
          setnew(true);
          handleTog_edit(_id)
          console.log("already appointed Doctor");
        }
      })
      .catch((err) => {
        console.log(err);
      });
     
      
    }
//  console.log(new1)

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
          setLabelSpecialityName(res.SpecialityName.SpecialityName)
          setName(res.Name);
          setphone(res.Phone);
          setEmail(res.Email);
          // setDate(res.BookingDate);
          let selectedDate = new Date(res.BookingDate);
          selectedDate.setDate(selectedDate.getDate() - 1);
          setDate(selectedDate);
          console.log(BookingDate)
          setAlloted(res.Alloted) 

        })
        .catch((err) => {
          console.log(err);
        });
    };


    const [errSN, setErrSN] = useState(false);
    const [errphone, setErrPhone] = useState(false);
    const [errEmail, setErrEmail] = useState(false);
    const [errDate, setErrDate] = useState(false);
    const [errname, setErrName]= useState(false);

    const [errEditSN, setEditSN] = useState(false);
    const [errEditphone, setEditPhone] = useState(false);
    const [errEditEmail, setEditEmail] = useState(false);
    const [errEditDate, setEditDate] = useState(false);
    const [errEditName, setEditName]= useState(false);

    const validSpecialityName =
    errSN && isSubmit ? " h-0 p-0 form-control is-invalid p-0" : "h-0 p-0 form-control";
    const validPhone =
    errphone && isSubmit ? "form-control is-invalid" : "form-control";
    const validName =
    errname && isSubmit ? "form-control is-invalid" : "form-control";
   
    const validEmail =
    errEmail && isSubmit ? "form-control is-invalid" : "form-control";
    const validDate =
    errDate && isSubmit ? " p-0 form-control is-invalid p-0" : "p-0 form-control";
    
    const validEditSpecialityName =
    errEditSN && isSubmit ? " h-0 p-0 form-control is-invalid p-0" : "h-0 p-0 form-control";
    const validEditPhone =
    errEditphone && isSubmit ? "form-control is-invalid" : "form-control";
    const validEditEmail =
    errEditEmail && isSubmit ? "form-control is-invalid" : "form-control";
    const validEditDate =
    errEditDate && isSubmit ? " p-0 form-control is-invalid p-0" : " p-0 form-control";
       const validEditName =
    errEditName && isSubmit ? "form-control is-invalid" : "form-control";
    

    const validate=(values)=>{
      const errors={};
      if (values.SpecialityName.trim() === "") {
        errors.SpecialityName = "Speciality Name is required";
        setErrSN(true);
      }
      else{setErrSN(false)}
  // if (!/^[A-Za-z\s]+$/.test(values.Name)) {
  //   errors.Name = "Name should contain only alphabets";
  //   setErrName(true); // Assuming setEditSN is the setter function for the error state
  // }  
  if (values.Name.trim() === "") {
    errors.Name = "Name is required";
    setErrName(true);
  }
  else{
    setErrName(false);
  }
  // Validate Phone
  if (values.Phone.trim() === "") {
    errors.Phone = "Enter phone number";
    // Assuming you have a setter function for the error state of Phone field
    setErrPhone(true); 
  }
  if (!/^\d{10}$/.test(values.Phone)) {
    errors.Phone = "Innvalid Phone Number";
    // Assuming you have a setter function for the error state of Phone field
    setErrPhone(true); 
  }
  else{
    setErrPhone(false);
  }
  // Validate Email
  if (!/\S+@\S+\.\S+/.test(values.Email)) {
    errors.Email = "Invalid Email Id";
    // Assuming you have a setter function for the error state of Email field
    setErrEmail(true);
  }
  else{
    setErrEmail(false);
  }

  // Validate BookingDate
  // You can customize the validation as per your requirements
  if (values.BookingDate==="") {
    errors.BookingDate = "Booking Date is required";
    // Assuming you have a setter function for the error state of BookingDate field
    setErrDate(true);
      }
      else{
        setErrDate(false);
      }
      return errors;
      
      }


const Editvalidate = (values) => {
  const errors = {};

  // Validate Name
  if (!/^[A-Za-z\s]+$/.test(values.Name)) {
    errors.Name = "Name should contain only alphabets";
    setEditName(true); // Assuming setEditSN is the setter function for the error state
  }  
  if (values.Name.trim() === "") {
    errors.Name = "Name is required";
    setEditName(true);
  }
  else{ setEditName(false);}
  // Validate Phone
  if (!/^\d{10}$/.test(values.Phone)) {
    errors.Phone = "Phone number should be 10 digits";
    // Assuming you have a setter function for the error state of Phone field
    setEditPhone(true); 
  }
  else{ setEditPhone(false);}
  // Validate Email
  if (!/\S+@\S+\.\S+/.test(values.Email)) {
    errors.Email = "Email address is invalid";
    // Assuming you have a setter function for the error state of Email field
    setEditEmail(true);
  }
  else{ setEditEmail(false);}
  // Validate BookingDate
  // You can customize the validation as per your requirements
  if (!values.BookingDate) {
    errors.BookingDate = "BookingDate is required";
    // Assuming you have a setter function for the error state of BookingDate field
    setEditDate(true);
  }
  else{ setEditDate(false);}
  return errors;
};
const [ErrDN, setErrDN] = useState(false);
const validDoctor =
ErrDN && isSubmit ? " h-0 p-0 form-control is-invalid p-0" : "h-0 p-0 form-control";


const Appointvalidate=(DoctorName,AllotmentTime,AllotmentDate)=>{
  const errors = {};
  if (DoctorName.trim() === "") {
    errors.DoctorName = "Doctor Name is required";
    setErrDN(true);
  }
  else{setErrDN(false)}
  if (!AllotmentDate) {
    errors.AllotmentDate = "AllotmentDate is required";
    // Assuming you have a setter function for the error state of BookingDate field
    setEditDate(true);
  }
  else{ setEditDate(false);}
  if (!AllotmentTime) {
    errors.AllotmentTime = "AllotmentTime is required";
    // Assuming you have a setter function for the error state of BookingDate field
    setErrBT(true);
  }
  else{ setErrBT(false);}
  return errors;
}


  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({}); 
    setIsSubmit(true); 
    console.log(BookingNo);
    const formdata = {
      BookingNo,
      SpecialityName,
      LabelSpecialityName,
      Name,
      Phone,
      Email,
      BookingDate,
      Alloted,
      DoctorName,
      AllotmentDate,
      AllotmentTime
      
    } 
    const errors = validate(formdata);
      setFormErrors(errors);
    setIsSubmit(true);
  if (Object.keys(errors).length === 0) {
    console.log("append", formdata);
    createBookingManagement(formdata) 
      .then((res) => {
        console.log("this is ",res.data.SpecialityName);
        // setAlloted(res.data._id)
        // console.log("this is alloted id ",AllotedId)
        const formdataAllotment={
          DoctorName,AllotmentDate,AllotmentTime,
         
          AllotmentTime
         }
         console.log("alloted formdata",formdataAllotment)
        //  setAllotedId(res.data._id)
        //  console.log("alloted id ",AllotedId)

         
        //  createBookingAllotment(formdataAllotment)
        // setmodal_list(!modal_list);
        setShowForm(false);

        // setValues(initialState);
         
        // setcapacity("");
        // setServiceName("");
        setSpecialityName("");
 setSpecialityValue("");
        setLabelSpecialityName("")
         setName("");
         setphone("");
         setDate("");
         setEmail("");
         setAlloted(false)
       setAllotmentTime(""); setnew(false);
       SetDoctorName("");
       setAllotmentDate("");
        setIsSubmit(false);
        
        setFormErrors({});
        
        setDoctorlabel("");
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
    }
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
   
      
      
      const formdata = {
        SpecialityName,
        LabelSpecialityName,
        Name,
        Phone,
        Email,
        BookingDate,
        Alloted,
      }
      let errors = Editvalidate(formdata);
      setFormErrors(errors);
      setIsSubmit(true);
      setIsSubmit(true);


      console.log("append", formdata);
      if (Object.keys(errors).length === 0) {
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
 setSpecialityValue("");
          setLabelSpecialityName("")
          SetDoctorName("");
        setDoctorlabel("");
          setAllotmentDate("");
          setAllotmentTime(""); setnew(false);
          fetchCategories();
          

        })
        .catch((err) => {
          console.log(err);
        });
      }
    };


    const handleAppoint = (e) => {
      e.preventDefault();
   
    
      setIsSubmit(true);
      const formdata = {
        SpecialityName,
        LabelSpecialityName,
        Name,
        Phone,
        Email,
        BookingDate,
        Alloted,
        AllotmentDate,
        AllotmentTime,
        DoctorName
      }
      let errors = Appointvalidate(DoctorName,AllotmentTime,AllotmentDate);
      setFormErrors(errors);
      if (Object.keys(errors).length === 0){

      
      console.log("append", formdata);

      updateBookingManagement(_id, formdata)
        .then((res) => {
          setIsSubmit(false);
          setShowForm(false);  
          setUpdateForm(false);
          setmodal_Booking(false)
          // setmodal_edit(!modal_edit);
          setName("");
          setEmail("");
          setphone("");
          setDate("");  
          setAlloted(false)
          setSpecialityName("");
 setSpecialityValue("");
          setLabelSpecialityName("")
          SetDoctorName("");
          setAllotmentDate("");
          setAllotmentTime(""); setnew(false);
          setDoctorlabel("");
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
    const defaultSortDirection = "asc";
    const defaultColumn = "Name"; 

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/bookingmanagement`,
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
          let maxBookingNo = Math.max(...res.data.map((item) => item.BookingNo)); // Find the highest BookingNo
         console.log(res)
            setLoading(false);
            setBlogs(res.data);
            setTotalRows(res.count);
            if (res.data.length > 0) {
        setBookingNo(maxBookingNo + 1);
            } else  {
              // If there are no records in the response, set BookingNo to 1
              setBookingNo(20900);
            }
          
         
        } else {
          setBlogs([]);
          setBookingNo(20900);
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
    setDoctorlabel("");
    setEmail("");
    setphone("");
    setDate("");  
    setAlloted(false)
    SetDoctorName("");
    setAllotmentDate("");
    setAllotmentTime(""); setnew(false);
    setSpecialityName("");
 setSpecialityValue("");
    setLabelSpecialityName("")
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
 setSpecialityValue("");
    setLabelSpecialityName("")
    SetDoctorName("");
    setDoctorlabel("");
    setAllotmentDate("");
    setAllotmentTime(""); setnew(false);
    
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
      name: "Booking No.",
      selector:(row)=>row.BookingNo,
      sortable: true,
      sortField: "Booking No.",
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
    
    
    

    // {
    //   name: "Speciality Name",
    //   cell: (row) => row.SpecialityName.SpecialityName,
    //   sortable: true,
    //   sortField: "serialNumber",
    //   minWidth: "150px",
    // },
    {
      name: "SpecialityName",
      cell: (row) => row.LabelSpecialityName,
      sortable: true,
      sortField: "LabelSpecialityName",
      minWidth: "150px",
    },
    {
      name: "Request BookingDate",
      cell: (row) => row.BookingDate?row.BookingDate.split('T')[0]:"-",
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },
    {
      name: "Allotment Details",
      cell: (row) => (
        <div>
          <div>DocName: <b>{row.DoctorName || "-"}</b></div>
          <div>Date: <b>{row.AllotmentDate?row.AllotmentDate.split('T')[0]: "-"}</b></div>
          <div>Time: <b>{row.AllotmentTime || "-"}</b></div> {/* Display dash if AllotmentTime is falsy */}
        </div>
      ),
      sortable: false,
      minWidth: "150px",
    },
    {
      name: "Patient Details",
      cell: (row) => (
        <div>
        <div>Name: <b>{row.Name}</b></div>
        <div>Email: <b>{row.Email}</b> </div>
        <div>Phone: <b>{row.Phone}</b> </div>
      </div>
      ),
      sortable: false, // Assuming you don't want to sort by this column
      minWidth: "300px", // Adjust width as needed
    },
    {
      name: "Message",
      cell: (row) => (
        <div>
          {row.Message}
        {/* <div>Name: <b>{row.Name}</b></div>
        <div>Email: <b>{row.Email}</b> </div>
        <div>Phone: <b>{row.Phone}</b> </div> */}
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
                  title="Edit Record"
                    onClick={() => handle_Check_Allotment(row._id)
                      }
                >
                <i className=" ri-pencil-fill"></i>
                </button>
              </div>

              {/* <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => tog_delete(row._id)}
                >
                 <i className=" ri-delete-bin-line"></i>
                </button>
              </div> */}
              <div className="appoint">
                <button
                  className="btn btn-sm btn-warning remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  title="Appoint Doctor"
                  onClick={() => tog_Booking(row._id)}
                  
                >
                <i className="ri-edit-box-line"></i> 
                </button>
              </div>
              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  title="Delete Record"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => tog_delete(row._id)}
                >
                 <i className=" ri-delete-bin-line"></i>
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
    console.log("Selected Specilty:", selectedOption);
    // Update speciality state with the selected option's value
    setSpecialityName(selectedOption.value);
    setSpecialityValue(selectedOption.label);
    setLabelSpecialityName(selectedOption.label);
};
const [Doctorlabel, setDoctorlabel] = useState(""); 
const handleDoctorChange = (selectedOption) => {
  console.log("Selected Doc:", selectedOption);
  // Update speciality state with the selected option's value
  SetDoctorName(selectedOption.label);
  setDoctorlabel(selectedOption.label);
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
 setSpecialityValue("");
                                          setLabelSpecialityName("")
                                          setName("");
                                          setphone("");
                                          setDate(""); 
                                          setEmail("");
                                          setAlloted(false)
                                          SetDoctorName("");
                                          setAllotmentDate("");
                                          setAllotmentTime(""); setnew(false);
                                          SetDoctorName("");
                                          setDoctorlabel("");
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
                        
                                    // setProductPDF("");
                                    setShowForm(false);
                                    setUpdateForm(false);
                                    // setFileId(Math.random() * 100000);

                                    selectDropdown();
                                    setSpecialityName("");
 setSpecialityValue("");
                                    setLabelSpecialityName("")
                                    setName("");
                                    setphone("");
                                    setDate("");
                                    setEmail("");
                                    setAlloted(false)
                                    SetDoctorName("");
                                    setDoctorlabel("");
                                    setAllotmentDate("");
                                    setAllotmentTime(""); setnew(false);
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
                            placeholder="Search Patient Name..."
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
                                    <div className="form-floating ">
                                    <Select
                                    isDisabled={new1}
                                    className={validSpecialityName}
                                          placeholder={SpecialityValue}
                                          name="SpecialityName"
                                          id="SpecialityName"
                                          value={SpecialityName}
                                          options={Selectoptions}
                                          onChange={handleSpecialityChange}
                                        />

                        
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.SpecialityName}
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
                                        className={validPhone}
                                        placeholder="Enter Phone"
                                        required
                                        name="Phone"
                                        value={Phone}
                                        onChange={(e) => {
                                          setphone(e.target.value);
                                        }}
                                      />
                                      
                                        {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Phone}
                                        </p>
                                      )}   
                                  </Col>
                                  
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Name 
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="text"
                                        className={validName}
                                        placeholder="Enter  Name"
                                        required
                                        name="Name"
                                        value={Name}
                                        onChange={(e) => {
                                          setName(e.target.value);
                                        }}
                                      />
                                      
                                        {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Name}
                                        </p>
                                      )}   
                                  </Col>
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Email 
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="email"
                                        className={validEmail}
                                        placeholder="Enter Email"
                                        required
                                        name="Email"
                                        value={Email}
                                        onChange={(e) => {
                                          setEmail(e.target.value);
                                        }}
                                      />
                                      
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Email}
                                        </p>
                                      )}  
                                  </Col>
                                  <Col lg={4}>
                      
                          <Label > Date  <span className="text-danger">*</span></Label>
                          <div  className={validDate}>
                          <Flatpickr
                          value={BookingDate}
                                       
                            className="form-control"
                            options={{
                              // altInput: true,
                              altFormat: "F j, Y",
                              dateFormat: "d-m-Y",
                            }}
                            onChange={(selectedDates) => {
                              setDate(selectedDates[0]);
                              console.log(selectedDates[0]);
                              // setAllotmentDate(selectedDates[0]); // Assuming you want to set a single date
                          }}
                         
                          /> </div> {isSubmit && (
                            <p className="text-danger">
                              {formErrors.BookingDate}
                            </p>
                          )} 
                          
                         
                        
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
                                    {/* {console.log("hioii")} */}
                                    <Select
                                  isDisabled={new1}
                                    className={validEditSpecialityName}
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
                                        className={validEditPhone}
                                        placeholder="Enter Phone"
                                        required
                                        name="Phone"
                                        value={Phone}
                                        onChange={(e) => {
                                          setphone(e.target.value);
                                        }}
                                      />
                                      
                                       {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Phone}
                                        </p>
                                      )}  
                                  </Col>
                                  
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Name 
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="text"
                                        className={validEditName}
                                        placeholder="Enter  Name"
                                        required
                                        name="Name"
                                        value={Name}
                                        onChange={(e) => {
                                          setName(e.target.value);
                                        }}
                                      />
                                      
                                        {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Name}
                                        </p>
                                      )}   
                                  </Col>
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Email 
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="email"
                                        className={validEditEmail}
                                        placeholder="Enter Email"
                                        required
                                        name="Email"
                                        value={Email}
                                        onChange={(e) => {
                                          setEmail(e.target.value);
                                        }}
                                      />
                                      
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Email}
                                        </p>
                                      )}   
                                  </Col>
                                  <Col lg={4}>
                      
                          <Label > Date  <span className="text-danger">*</span></Label>
                          <div className={validEditDate}>
                          <Flatpickr 
    // placeholder="Select Date" // Remove placeholder
    value={BookingDate} // Use value prop to display selected date
    className="form-control"
    options={{
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    }}
    onChange={(selectedDates) => {
        setDate(selectedDates[0]); // Assuming you want to set a single date
        console.log(selectedDates[0]);
    }}
/>
                          </div>
                           
                          {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.BookingDate}
                                        </p>
                                      )}   
                         

                        
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
          // tog_Booking(); 
          setproductImage("");
          setSpecialityName("");
 setSpecialityValue("");
          setLabelSpecialityName("")
          setName("");
          setphone("");
          setDate("");
          setEmail("");
          setAlloted(false)
          SetDoctorName("");
          setDoctorlabel("");
          setAllotmentDate("");
          setAllotmentTime(""); setnew(false);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove Booking Management</span>
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
      <Modal className="width"
        style={{width:"700px "}}
        isOpen={modal_Booking}
        toggle={() => {
          // tog_delete();
          tog_Booking(); 
          setproductImage("");
          setSpecialityName("");
 setSpecialityValue("");
          setLabelSpecialityName("")
          setName("");
          setphone("");
          setDate("");
          setEmail("");
          setAlloted(false)
          SetDoctorName("");
          setDoctorlabel("");
          setAllotmentDate("");
          setAllotmentTime(""); setnew(false);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_Booking(!modal_Booking);
          }}
        >
          <span style={{ marginRight: "210px" }}>Booking no:<span></span>{BookingNo}</span>
          <p>Speciality : {spec}</p>
        </ModalHeader>

        <form>
          <ModalBody>
            <Row>
              <Col lg={4}>
                <label>
                  Doctor{" "}
                  <span class="text-danger">*</span>
          
                </label>
                <div className="form-floating mb-3">
                  <Select
                   className={validDoctor}
                    placeholder={Doctorlabel}
                    name="DoctorName"
                    id="DoctorName"
                    value={DoctorName}
                    options={SelectDocName}
                    onChange={handleDoctorChange}
                  />
                


                  {isSubmit && (
                    <p className="text-danger">
                      {formErrors.DoctorName}
                    </p>
                  )}
                </div>
              </Col>
              <Col lg={4}>

                <Label > Date  <span className="text-danger">*</span></Label>
                <div className={validEditDate}>
                <Flatpickr
                  value={AllotmentDate}
                  className="form-control"
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "d-m-Y",
                  }}
                  onChange={(selectedDates) => {
                    setAllotmentDate(selectedDates[0]); // Assuming you want to set a single date
                  }}
                />
                </div>
                
                 {isSubmit && (
                    <p className="text-danger">
                      {formErrors.AllotmentDate}
                    </p>
                  )}
              </Col>
              <Col lg={4}>
                                    
                                    <Label>
                                        Time
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="time"
                                        className={validClassBT}
                                        placeholder="Enter time"
                                        required
                                        name="time"
                                        value={AllotmentTime}
                                        onChange={(e) => {
                                          setAllotmentTime(e.target.value);
                                        }}
                                      />
                                      
                                       {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.AllotmentTime}
                                        </p>
                                      )} 
                                  </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={handleAppoint}
              >
               Appoint
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setmodal_Booking(false)}
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

export default BookingManagement;
