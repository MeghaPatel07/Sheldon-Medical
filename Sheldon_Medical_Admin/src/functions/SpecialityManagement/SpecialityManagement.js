import axios from "axios";

export const createSpecialityManagement = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/specialitymanagement`,
    values
  );
};

export const removeSpecialityManagement = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/delete/specialitymanagement/${_id}`
  );
};

export const listSpecialityManagement = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/specialitymanagement`
  );
};

export const updateSpecialityManagement = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/update/specialitymanagement/${_id}`,
    values
  );
};

export const getSpecialityManagement = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/specialitymanagement/${_id}`
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
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/ckeditorspeciality/imageupload`,
      body
    );
  };

  export const getNewSpecialityByParam = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHELDON}/auth/list-by-params/specialitymanagement`,
      body
    );
  };  
