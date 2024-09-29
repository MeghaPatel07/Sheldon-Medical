import axios from "axios";

export const createTestimonial = async (ClientName,Testimonial,ClientImage) => {
  const form=new FormData();
  form.append("ClientName",ClientName);
  form.append("Testimonial",Testimonial);
  form.append("ClientImage",ClientImage);
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/create/testimonialmanagement`,
    form,{headers: {
      "Content-Type": "multipart/form-data",
    },}
  )}

export const removeTestimonial = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/delete/testimonialmanagement/${_id}`
  );
};

export const listTestimonial = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/list/testimonialmanagementr`
  );
};

export const updateTestimonial = async (_id, ClientName,Testimonial,ClientImage) => {
  const form=new FormData();
  form.append("ClientName",ClientName);
  form.append("Testimonial",Testimonial);
  form.append("ClientImage",ClientImage);
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/update/testimonialmanagement/${_id}`,
    form,{headers: {
      "Content-Type": "multipart/form-data",
    },}
  );
};

export const getTestimonial = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/testimonialmanagement/${_id}`
  );
};
