import axios from "axios";

export const createAdminUser = async (firstName,lastName,email,password,ProfilePhoto,IsActive) => {
  const form=new FormData();
  form.append("firstName",firstName);
  form.append("lastName",lastName);
  form.append("email",email);
  form.append("password",password);
  form.append("ProfilePhoto",ProfilePhoto);
  form.append("IsActive",IsActive);
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/adminUser`,
    form,{headers: {
      "Content-Type": "multipart/form-data",
    },}
  )}

export const removeAdminUser = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/remove/adminUser/${_id}`
  );
};

export const listAdminUser = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/adminUser`
  );
};

export const updateAdminUser = async (_id, firstName,lastName,email,password,ProfilePhoto,IsActive) => {
  const form=new FormData();
  form.append("firstName",firstName);
  form.append("lastName",lastName);
  form.append("email",email);
  form.append("password",password);
  form.append("ProfilePhoto",ProfilePhoto);
  form.append("IsActive",IsActive);
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/update/adminUser/${_id}`,
    form,{headers: {
      "Content-Type": "multipart/form-data",
    },}
  );
};

export const getAdminUser = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/adminUser/${_id}`
  );
};
