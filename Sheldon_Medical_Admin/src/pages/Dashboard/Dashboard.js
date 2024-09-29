import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ background: "white", padding: "10px",marginTop:"30px"}}>
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem active>Dashboard</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  );
}

export default DashboardPage;
