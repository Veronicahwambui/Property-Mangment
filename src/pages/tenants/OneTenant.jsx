import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";

function OneTenant() {
  const [activeLink, setActiveLink] = useState(1);
  const [tenantData, setTenantData] = useState({});
  const [docName, setDocName] = useState("");

  const { id } = useParams();
  const userId = id;

  const fetchAll = () => {
    requestsServiceService.viewTenant(userId).then((res) => {
      setTenantData(res.data.data);
    });
  };

  const download = () => {
    requestsServiceService.download(docName).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="page-content">
      <div className="content-fluid">
        {/* <!-- start page title --> */}
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0 font-size-18">
              {tenantData.tenant && tenantData.tenant.firstName}
              </h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="index.html">Dashboards</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="property-list.html">All Properties</a>
                  </li>
                  <li class="breadcrumb-item active">
                    {tenantData.tenant && tenantData.tenant.firstName}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end page title --> */}

        {/* <!-- tool bar --> */}
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body pt-2 pb-3">
                <nav class="navbar navbar-expand-md navbar-white bg-white py-2">
                  <button
                    class="navbar-toggler btn btn-sm px-3 font-size-16 header-item waves-effect h-auto text-primary"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="mdi mdi-menu"></span>
                  </button>
                  <div
                    class="collapse navbar-collapse justify-content-between"
                    id="navbarNavAltMarkup"
                  >
                    <div class="navbar-nav">
                      <a
                        onClick={() => setActiveLink(1)}
                        class={
                          activeLink === 1
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Tenant Details<span class="sr-only"></span>
                      </a>
                      <a
                        onClick={() => setActiveLink(2)}
                        class={
                          activeLink === 2
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Tenancies
                      </a>
                      <a
                        onClick={() => setActiveLink(3)}
                        class={
                          activeLink === 3
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                      Contact persons
                      </a>
                    
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end of tool bar --> */}

        {activeLink === 1 && (
          <div>
            <div className="row">
              <div className="col-xl-12">
                <div className="card calc-h-3px">
                  <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                    <div
                      class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                      role="toolbar"
                    >
                      <div class="d-flex align-items-center flex-grow-1">
                        <h4 class="mb-0 m-0 bg-transparent">
                          Quick Stats on{" "}
                          {tenantData.tenant &&
                            tenantData.tenant.firstName}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3">
                          <label htmlFor="">Type</label>
                          <div className="text-capitalize">
                            <span>
                              {tenantData.tenant &&
                                tenantData.tenant.tenantType?.toLowerCase()?.replace(/_/g , " ")}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">First Name</label>
                          <div>
                            <span>
                              {tenantData.tenant &&
                                tenantData.tenant.firstName}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Last Name</label>
                          <div>
                            <span>
                              {tenantData.tenant &&
                               tenantData.tenant.lastName}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Email</label>
                          <div>
                            <span>
                              {tenantData.tenant &&
                                tenantData.tenant.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-3">
                          <label htmlFor="">Id Number</label>
                          <div>
                            <span>
                            {tenantData.tenant &&
                                tenantData.tenant.idNumber}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Company Name</label>
                          <div>
                            <span>
                            {tenantData.tenant &&
                                tenantData.tenant.companyName}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Company Incorporation Number</label>
                          <div>
                            <span>
                            {tenantData.tenant &&
                                tenantData.tenant.companyIncorporationNumber}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Nationality</label>
                          <div>
                            <span>
                            {tenantData.tenant &&
                                tenantData.tenant.nationality}  
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeLink === 2 && (
          <div>
          <div className="row">
            <div className="col-xl-12">
              <div className="card calc-h-3px">
                <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <div class="d-flex align-items-center flex-grow-1">
                      <h4 class="mb-0 m-0 bg-transparent">Tenancies</h4>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-12">
                    <div className="table-responsive">
                      <table
                        class="table align-middle table-edits rent-invoicing dt-responsive"
                        id="data-table"
                      >
                        <thead>
                        <tr class=" text-uppercase ">
                                                        <th>#</th>
                                                        <th>premise name </th>
                                                        <th>unit name </th>
                                                        <th>tenant name</th>
                                                        <th>phone no</th>
                                                        <th>condition</th>
                                                        <th>start Date</th>
                                                       <th>renewal date</th>
                                                        <th>tenancy status</th>
                                                        <th>status</th>
                                                        <th>Actions</th>
                                                    </tr>
                        </thead>
                        <tbody>
                          {tenantData.tenancies &&
                            tenantData.tenancies.map((unit, index) => (
                              <tr data-id="1">
                                <td>{index + 1}</td>
                                <td className="text-capitalize">
                                  {unit.premiseUnit.premise.premiseName}
                                </td>
                                <td>
                                  {unit.premiseUnit.unitName}
                                </td>
                                <td>{unit.tenant.lastName} {unit.tenant.lastName}</td>
                                {/* <td className="text-capitalize">
                                {unit.premiseUnit.unitType.name}  
                                </td> */}
                                <td>{unit.tenant.phoneNumber}</td>
                               
                                <td className="text-capitalize">{unit.unitCondition?.toLowerCase()?.replace(/_/g , " ")}</td>
                                <td>
                                  {moment(unit.startDate).format("MMM Do YYYY")}
                                </td>
                                <td>
                                  {moment(unit?.tenancyRenewalDate).format("MMM Do YYYY")}
                                </td>
                                <td className="text-capitalize">{unit.tenancyStatus?.toLowerCase()?.replace(/_/g , " ")}</td>
                                <td> { unit.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span>  }</td>
                                <td>
                                <Link class="dropdown-item" to={`/premise/tenant/${unit.tenant.id}`}><i class="font-size-15 mdi mdi-eye-plus-outline cursor-pinter me-3"></i>view</Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {activeLink === 3 && (
          <div>
          <div className="row">
            <div className="col-xl-12">
              <div className="card calc-h-3px">
                <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <div class="d-flex align-items-center flex-grow-1">
                      <h4 class="mb-0 m-0 bg-transparent">Tenancies</h4>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-12">
                    <div className="table-responsive">
                      <table
                        class="table align-middle table-edits rent-invoicing dt-responsive"
                        id="data-table"
                      >
                        <thead>
                          <tr class="text-uppercase table-dark">
                            <th>#</th>
                            <th>Name (s) </th>
                            <th>Type</th>
                            <th>Relationship</th>
                            <th>phone No</th>
                            <th>Status</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                          {tenantData.contactPeople &&
                            tenantData.contactPeople.map((unit, index) => (
                              <tr data-id="1">
                                <td>{index + 1}</td>
                                <td>
                                  {unit.firstName}   {unit.lastName}   {unit.otherName}
                                </td>
                                <td className="text-capitalize">
                                  {unit.contactPersonType.toLowerCase().replace(/_/g," ")}
                                </td>
                               <td>{unit.relationship}</td>
                               <td>{unit.phoneNumber1}</td>
                                <td> { unit.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span>  }</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

  
      </div>
    </div>
  );
}

export default OneTenant;
