import axios from "axios";

export const createBookingManagement = async (values) => {
  try{
    console.log(values)
    const response =await axios.post(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/bookingmanagement`,
      values
    )

  console.log("Response",response)
  return response;
  } catch (error) {
    console.error("Error in createVisaCateory:", error);
    throw error; // Re-throw the error to propagate it to the calling code
  }
};

export const removeBookingManagement = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/delete/bookingmanagement/${_id}`
  );
};

export const listBookingManagement = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/bookingmanagement`
  );
};

export const listBookingManagement_noParams = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/listBookingManagement_noParams`
  );
};


 
export const updateBookingManagement = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/update/bookingmanagement/${_id}`,
    values
  );
};

export const getBookingManagement = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/bookingmanagement/${_id}`
  );
};
export const getBookingReport = async (id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/report/${id}`
  );
};

// export const uploadImage = async (body) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/servicemanagement/image-upload`,
//     body
//   );
// };


  export const getBookingManagementbyParams = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHELDON}/auth/list-by-params/bookingmanagement`,
      body
    );
  };  
  export const listSpecialityManagement = async () => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/specialitymanagement`
    );
  };

  export const createBookingAllotment = async (values) => {
    try{
      console.log(values)
      const response =await axios.post(
        `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/bookingallotment`,
        values
      )
  
    console.log("Response",response)
    return response;
    } catch (error) {
      console.error("Error in createVisaCateory:", error);
      throw error; // Re-throw the error to propagate it to the calling code
    }
  }
  

  export const listDoctorManagement = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/listAllDoctorManagement`
    );
  };