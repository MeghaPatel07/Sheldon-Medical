import axios from "axios";

export const getUserShippingAddress = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/userShippingAddress/${_id}`
  );
};
