import axios from "axios";

export const createLocation = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/Location`,
    values
  );
};

export const listLocation= async() => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/Alllocations`
    );
  };

  export const getLocationById = async (id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/locations/${id}`
    );
  };

  export const UpdateLocationByID = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/put/locations/${_id}`,
      values
    );
  };
  
  export const removelocation = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/delete/locationById/${_id}`
    );
  };

  export const createDoctorManagement = async (values) => {

    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/CreateDoctorManagement`,
      values,
    )}
    export const getDoctorById = async (_id) => {
      return await axios.get(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/getdoctorbyid/${_id}`
      );
    };