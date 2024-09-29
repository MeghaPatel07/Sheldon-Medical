import axios from "axios";

export const createServiceManagement = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/servicemanagement`,
    values
  );
};

export const removeServiceManagement = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/delete/servicemanagement/${_id}`
  );
};

export const listServiceManagement = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/servicemanagement`
  );
};

export const updateServiceManagement = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/update/servicemanagement/${_id}`,
    values
  );
};

export const getServiceManagement = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/servicemanagement/${_id}`
  );
};

// export const uploadImage = async (body) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/servicemanagement/image-upload`,
//     body
//   );
// };
export const uploadproductImage = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/ckeditorservice/imageupload`,
      body
    );
  };

  export const getNewServiceByParam = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHELDON}/auth/list-by-params/servicemanagement`,
      body
    );
  };  
