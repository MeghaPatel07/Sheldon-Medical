import axios from "axios";

export const createCompanyAddress = async (CompanyLocation) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/CompanyAddress`,
    {CompanyLocation}
  );
};

export const removeCompanyAddress = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/delete/CompanyAddress/${_id}`
  );
};
export const getCompanyAddresses = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/CompanyAddressAll`
  );
};


export const listAdminUser = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/adminUser`
  );
};

export const updateCompanyAddress = async (_id, CompanyLocation) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/update/CompanyAddressById/${_id}`,
    {CompanyLocation}
  );
};

export const getCompanyAddressById = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/CompanyAddressById/${_id}`
  );
};
