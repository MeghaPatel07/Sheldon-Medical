import axios from "axios";
export const getInquiries = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/inquiries`
    );
  };