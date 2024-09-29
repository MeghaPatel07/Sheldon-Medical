import axios from "axios";

export const createKnowlegeBase = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/knowledgebase`,
    values
  );
};

export const removeKnowlegeBase = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/delete/knowledgebase/${_id}`
  );
};

export const listKnowlegeBase = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/knowledgebase`
  );
};

export const updateKnowlegeBase = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/update/knowledgebase/${_id}`,
    values
  );
};

export const getKnowlegeBase = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/knowledgebase/${_id}`
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
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/ckeditorknowledgebase/imageupload`,
      body
    );
  };

  export const getNewKnowlegeBase = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHELDON}/auth/list-by-params/knowledgebase`,
      body
    );
  };  
