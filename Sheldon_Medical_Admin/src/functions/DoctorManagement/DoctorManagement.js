import axios from "axios";

export const createDoctor = async (SpecialityName,docname,detail,location,photo,specialityNameOther) => {
  const form=new FormData();
  form.append("SpecialityName",SpecialityName);
  form.append("docname",docname);
  form.append("detail",detail);
  form.append("location",location);
  form.append("photo",photo);
  form.append("specialityNameOther",specialityNameOther);
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/doctorManagement`,
    form,{headers: {
      "Content-Type": "multipart/form-data",
    },}
  )}

  export const createLocation = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/Location`,
      values
    );
  };
    export const editLocation = async (locid,where,when) => {
      const form=new FormData();
      // form.append("locid",locid);
      // form.append("where",where);
      // form.append("when",when);
      return await axios.put(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/edit/location/${locid}`,
        {where,when}
      )}
    
  export const getDoctorById = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/getdoctorbyid/${_id}`
    );
  };
  export const removeDoctor = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/delete/doctor/${_id}`
    );
  };
  export const removeLocation = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/delete/location/${_id}`
    );
  };
  export const updateDoctorManagement = async (_id, SpecialityName,docname,detail,Location,photo,specialityNameOther) => {
    const form=new FormData();
  //  form.append("id",_id); 
  form.append("SpecialityName",SpecialityName);
  form.append("docname",docname);
  form.append("detail",detail);
  form.append("Location",Location);
  form.append("photo",photo);
  form.append("specialityNameOther",specialityNameOther);
    return await axios.put(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/update/doctormanagement/${_id}`,
      form,{headers: {
        "Content-Type": "multipart/form-data",
      },}
    );
  };

//   export const createLocation = async (data) => {
//     return await axios.post(
//       `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/location`,
//       { data } // Send an array of objects
//     );
//   };