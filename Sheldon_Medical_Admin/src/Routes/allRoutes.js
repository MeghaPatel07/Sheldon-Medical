import React from "react";
import { Navigate } from "react-router-dom";

import Country from "../pages/LocationSetUp/Country/Country";
import City from "../pages/LocationSetUp/City/City";
import State from "../pages/LocationSetUp/State/State";
import CompanyLocation from "../pages/LocationSetUp/CompanyLocation";
import Login from "../pages/Authentication/Login";
import CategoryMaster from "../pages/Category/CategoryMaster";
import Blogs from "../pages/Blogs/Blogs";
import "./../pages/Clock/clock"
import PromocodeMaster from "../pages/Subscription/PromocodeMaster";
import ProductDetails from "../pages/Products/ProductsDetails";
import UserProfile from "../pages/Authentication/user-profile";
import Banner from "../pages/CMS/Banner";
import CompanyDetails from "../pages/Setup/CompanyDetails";
import AdminUser from "../pages/Auth/AdminUser";
import SpecialityManagement from "../pages/SpecialityManagement/SpecialityManagement"
import ServiceManagement from "../pages/ServiceManagement/ServiceManagement";
import KnowledgeBase from "../pages/KnowledgeBase/KnowledgeBase";
import BookingManagement from "../pages/BookingManagement/BookingManagement";
import DashboardPage from "../pages/Dashboard/Dashboard";
import Report from "../pages/Report/Report";
import DoctorManagement from "../pages/DoctorManagement/DoctorManagement";
import Cms from "../pages/CMS_Sheldon/Cms";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import Clock from "../pages/Clock/clock";
import Apps from "../pages/Apps/Apps";
import Inquiry from "../pages/Inquiry/Inquiry";
import LocationManagement from "../pages/LocationManagement/LocationManagement";
import TestimonialManagement from "../pages/TestimonialManagement/TestimonialManagement";
const authProtectedRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/profile", component: <UserProfile /> },
  { path: "/country", component: <Country /> },
  { path: "/city", component: <City /> },
  { path: "/state", component: <State /> },
  { path: "/location", component: <CompanyLocation /> },
  { path: "/admin-user", component: <AdminUser /> },
  { path: "/company-details", component: <CompanyDetails /> },

  { path: "/category", component: <CategoryMaster /> },

  { path: "/blogs", component: <Blogs /> },
  { path: "/banner", component: <Banner /> },
  { path: "/promocode-master", component: <PromocodeMaster /> },

  { path: "/product-details", component: <ProductDetails /> },
  { path: "/speciality-management", component: <SpecialityManagement /> },
  { path: "/service-management", component: <ServiceManagement /> },
  { path: "/knowledge-base", component: <KnowledgeBase /> },
  { path: "/booking-management", component: <BookingManagement /> },
  { path: "/Dashboard", component: <DashboardPage /> },
  {path :'/report' , component :<Report />},
  {path : '/doctormanagement', component:<DoctorManagement/>},
  {path : "/cms-sheldon", component:<Cms />},
  {path : "/change-password", component:<ChangePassword />},
  {path : "/clock", component:<Clock/>},
  {path : "/Apps", component:<Apps/>},
  {path : "/inquiry", component:<Inquiry/>},
  {path : "/company-details", component:<CompanyDetails/>},
  {path : "/Locations", component:<LocationManagement/>},
  {path : "/Testimonial", component:<TestimonialManagement/>},

  {
    path: "/",
    exact: true,
    component: <Navigate to="/category" />,
  },
  { path: "*", component: <Navigate to="/category" /> },
];

const publicRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/", component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
