import axios from "axios";

export const createNewProject = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/newproject`,
    values
  );
};

export const uploadproductImage = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/ckeditor/imageupload`,
      body
    );
  };

  export const getNewProjectByParam = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list-by-params/newproject`,
      body
    );
  };  


