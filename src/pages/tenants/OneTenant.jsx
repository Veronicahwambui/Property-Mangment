import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import UnitTypes from "../setups/UnitTypes";
import authService from "../../services/auth.service";

function OneTenant() {
  const [activeLink, setActiveLink] = useState(1);
  const [tenantData, setTenantData] = useState({});
  const [docName, setDocName] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [contactPerson, setContactPerson] = useState([]);

  //edit tenants-details
  const [type, setType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [nationality, setNatioality] = useState("");
  const [companyIncorporationNumber, setCompanyIncorporationNumber] =
    useState("");
  const [detailsId, setDetailsId] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyDateOfRegistration, setCompanyDateOfRegistration] =
    useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tenantTypeName, setTenantTypeName] = useState("");



  //company details
  
  const[certificateOfincorporation,setCertificateOfIncorporation]=useState("")
  const[companyLocation,setCompanyLocation]=useState("")
  

  // edit tenants
  const [unitTypeName, setUnitTypeName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [unitCondition, setUnitCondition] = useState("");
  const [tenancyStatus, setTenancyStatus] = useState("");
  const [tenancyRenewalDate, setTenancyRenewalDate] = useState("");
  const [tenancyRenewalNotificationDate, setTenancyRenewalNotificationDate] =
    useState("");
  const [premiseUnitId, setPremiseUnitId] = useState("");
  const [unitId, setUnitId] = useState("");

  //edit ContactPersons

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [relationship, setRelationship] = useState("");
  const [contactPersonId, setContactPersonId] = useState("");
  const [contactPersonTypeName, setContactPersonTypeName] = useState("");
  const [contactPersonType, setContactPersonType] = useState("");
  const [error, setError] = useState({
    message: "",
    color: ""
  });

  const { id } = useParams();
  const userId = id;

  const fetchAll = () => {
    requestsServiceService.viewTenant(userId).then((res) => {
      setTenantData(res.data.data);
    });
  };

  const editTenantsDetails = () => {
    let details = JSON.stringify({
      active: true,
      clientId: parseInt(authService.getClientId()),
      companyAddress: companyAddress,
      companyDateOfRegistration: companyDateOfRegistration,
      companyIncorporationNumber: companyIncorporationNumber,
      companyName: companyName,
      dob: dob,
      email: email,
      firstName: firstName,
      gender: gender,
      id: detailsId,
      idNumber: idNumber,
      lastName: lastName,
      maritalStatus: maritalStatus,
      nationality: nationality,
      occupation: occupation,
      otherName: otherName,
      phoneNumber: phoneNumber,
      tenantTypeName: tenantTypeName,

    });
    //  console.log(id)
    requestsServiceService.updateTenantsDetails(details).then((res) => {
     fetchAll()
    });

  };
  // console.log( editTenantsDetails)
  const handleChangeTenantsDetails = (
    detailsId,
    tenantTypeName,
    firstName,
    lastName,
    otherName,
    email,
    idNumber,
    companyName,
    nationality
    
  ) => {
    setDetailsId(detailsId);
    setTenantTypeName(tenantTypeName);
    setFirstName(firstName);
    setLastName(lastName);
    setOtherName(otherName);
    setEmail(email);
    setIdNumber(idNumber);
    setCompanyName(companyName);
    setNatioality(nationality);
  };

  const editTenant = () => {
    let data = JSON.stringify({
      active: true,
      id: userId,
      tenancyRenewalDate: tenancyRenewalDate,
      tenancyRenewalNotificationDate: tenancyRenewalNotificationDate,
      unitTypeName: unitTypeName,
      premiseUnitId: premiseUnitId,
      startDate: new Date(),
      tenancyCharges: [{}],
      tenancyDocuments: [{}],
      tenancyStatusName: tenancyStatus,
      tenantId: unitId,
      unitCondition: unitCondition,
    });
    requestsServiceService.updateTenant(data).then((res) => {
    
      fetchAll();
    });
  };
  const handleChange = (
    permiseUnitId,
    unitTypeName,
    startDate,
    unitCondition,
    tenancyRenewalDate,
    tenancyRenewalNotificationDate,
    unitId
  ) => {
    setPremiseUnitId(permiseUnitId);
    setUnitTypeName(unitTypeName);
    setStartDate(startDate);
    setUnitCondition(unitCondition);
    // setTenancyStatus(tenancyStatus);
    setTenancyRenewalDate(tenancyRenewalDate);
    setTenancyRenewalNotificationDate(tenancyRenewalNotificationDate);
    setUnitId(unitId);
  };

  const editContactPersons = () => {
    let contacts = JSON.stringify({
      active: true,

      firstName: firstName,
      id: contactPersonId,
      lastName: lastName,
      otherName: otherName,
      contactPersonTypeName: contactPersonTypeName,
      phoneNumber1: phoneNumber1,
      phoneNumber2: phoneNumber2,
      relationship: relationship,
      tenantId: tenantData.tenant.id,
    });
    // console.log(contacts);

    requestsServiceService.updateContactPersons(contacts).then((res) => {
      console.log(res);
      fetchAll();
    });
  };

  const handleChangeContacts = (
    contactPersonId,
    firstName,
    lastName,
    otherName,
    contactPersonTypeName,
    phoneNumber1,
    relationship
  ) => {
    setContactPersonId(contactPersonId);
    setFirstName(firstName);
    setLastName(lastName);
    setOtherName(otherName);
    setContactPersonTypeName(contactPersonTypeName);
    setPhoneNumber1(phoneNumber1);
    setRelationship(relationship);
  };

  const download = () => {
    requestsServiceService.download(docName).then((res) => {
      console.log(res);
    });
  };

  const getContactTypeName = () => {
    requestsServiceService.getContactpersons().then((res) => {
      setContactPerson(res.data.data);
    });
  };

  const addConctactPersons = () => {
    let contactPerson = JSON.stringify({
      active: true,

      firstName: firstName,
      id: id,
      lastName: lastName,
      otherName: otherName,
      contactPersonTypeName: contactPersonType,
      phoneNumber1: phoneNumber1,
      phoneNumber2: phoneNumber2,
      relationship: relationship,
      tenantId: tenantData.tenant.id,
    });
    // console.log(contactPerson);
    // console.log(id)

    requestsServiceService.createContactPerson(contactPerson).then((res) => {
      console.log(res);
      fetchAll();
      
      if(res.data.status){
        setError({
          ...error,
          message: res.data.message,
          color: "success"
        }) } else {
  
          setError({
            ...error,
            message: res.data.message,
            color: "warning"
          }) 
        }
        
        
        setTimeout(() => {
          clear()
        }, 3000)
    }).catch((res)=>{

      setError({
        ...error,
        message: res.data.message,
        color: "danger"
      })

      setTimeout(() => {
        clear()
      }, 3000)


    })
  }
  
  const clear = ()=> {
    setError({
      ...error,
      message: "",
      color: ""





    });
  };

  useEffect(() => {
    fetchAll();
    getContactTypeName();
  }, []);

  const deleteDeactivate = (id) => {
    requestsServiceService.deactivateTenancies(id).then((res) => {});
  };

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
                          {tenantData.tenant && tenantData.tenant.firstName}
                        </h4>
                      </div>
                      <div className="d-flex">
                        <button
                          type="button"
                          onClick={() =>
                            handleChangeTenantsDetails(
                              tenantData.tenant.id,
                              tenantData.tenant.tenantTypeName,
                              tenantData.tenant.firstName,
                              tenantData.tenant.lastName,
                              tenantData.tenant.otherName,
                              tenantData.tenant.email,
                              tenantData.tenant.idNumber,
                              tenantData.tenant.companyName,
                              tenantData.tenant.nationality
                            )
                          }
                          data-bs-toggle="modal"
                          data-bs-target="#edit-tenant-detail"
                          className="btn btn-primary dropdown-toggle option-selector"
                        >
                          <i className="dripicons-plus font-size-16"></i>{" "}
                          <span className="pl-1 d-md-inline">
                            Edit Tenants details
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3">
                          <label htmlFor="">Type</label>
                          <div>
                            <span>
                              {tenantData.tenant &&
                                tenantData.tenant.tenantType}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">First Name</label>
                          <div>
                            <span>
                              {tenantData.tenant && tenantData.tenant.firstName}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Last Name</label>
                          <div>
                            <span>
                              {tenantData.tenant && tenantData.tenant.lastName}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Email</label>
                          <div>
                            <span>
                              {tenantData.tenant && tenantData.tenant.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-3">
                          <label htmlFor="">Id Number</label>
                          <div>
                            <span>
                              {tenantData.tenant && tenantData.tenant.idNumber}
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
              <div className="col-12">
                <div className="card calc-h-3px">
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <div className="card-body bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                          <div
                            className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                            role="toolbar"
                          >
                            <div className="d-flex align-items-center flex-grow-1">
                              <h4 className="mb-0  bg-transparent  p-0 m-0">
                                Tenancies
                              </h4>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table align-middle table-nowrap table-hover mb-0">
                                <thead>
                                  <tr class="text-uppercase table-dark">
                                    <th>#</th>
                                    <th>Unit Name</th>
                                    <th>Unit Type</th>
                                    <th>Start Date</th>
                                    <th>Unit Condition</th>
                                    <th>Tenancy Status</th>
                                    <th>TenancyRenewalDate</th>
                                    <th>TenancyRenewalNotificationDate</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tenantData.tenancies &&
                                    tenantData.tenancies.map((unit, index) => (
                                      <tr data-id="1">
                                        <td>{index + 1}</td>
                                        <td>{unit.premiseUnit.unitName}</td>
                                        <td className="text-capitalize">
                                          {unit.premiseUnit.unitType.name}
                                        </td>
                                        <td>
                                          {unit.startDate.replace(/[TZ]/g, " ")}
                                        </td>
                                        <td>{unit.unitCondition}</td>
                                        <td>
                                          {unit.tenancyStatus.toLowerCase() ? (
                                            <span class="badge-soft-success badge">
                                              Closed
                                            </span>
                                          ) : (
                                            <span class="badge-soft-danger badge">
                                              Activate
                                            </span>
                                          )}
                                        </td>
                                        <td>{unit.tenancyRenewalDate}</td>
                                        <td>
                                          {unit.tenancyRenewalNotificationDate}
                                        </td>
                                        <td>
                                          {" "}
                                          {unit.active ? (
                                            <span class="badge-soft-success badge">
                                              Active
                                            </span>
                                          ) : (
                                            <span class="badge-soft-danger badge">
                                              Inactive
                                            </span>
                                          )}
                                        </td>

                                        <td className="text-right ">
                                          <div class="dropdown">
                                            <a
                                              class="text-muted font-size-16"
                                              role="button"
                                              data-bs-toggle="dropdown"
                                              aria-haspopup="true"
                                            >
                                              <i class="bx bx-dots-vertical-rounded"></i>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-end text-capitalize">
                                              <p
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit-tenant"
                                                class="dropdown-item"
                                                href="#"
                                                onClick={() =>
                                                  handleChange(
                                                    unit.premiseUnit.id,
                                                    unit.premiseUnit.unitName,
                                                    unit.startDate,
                                                    unit.unitCondition,

                                                    unit.tenancyRenewalDate,
                                                    unit.tenancyRenewalNotificationDate,
                                                    unit.id
                                                  )
                                                }
                                              >
                                                <i class="font-size-15 mdi mdi-pencil me-3"></i>
                                                Edit
                                              </p>

                                              <button
                                                class="dropdown-item "
                                                onClick={() =>
                                                  deleteDeactivate(unit.id)
                                                }
                                              >
                                                <i class="font-size-8 mdi mdi-close-circle me-3">
                                                  Deactivate
                                                </i>
                                              </button>
                                            </div>
                                          </div>
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
                                <td>
                                  {unit.premiseUnit.unitName}
                                </td>
                                <td>{unit.tenant.lastName} {unit.tenant.lastName}</td>
                                {/* <td className="text-capitalize">
                                {unit.premiseUnit.unitType.name}  
                                </td> */}
                                <td>{unit.tenant.phoneNumber}</td>
                               
                                <td>{unit.unitCondition}</td>
                                <td>
                                  {moment(unit.startDate).format("MMM Do YYYY")}
                                </td>
                                <td>
                                  {moment(unit.tenancyRenewalDate).format("MMM Do YYYY")}
                                </td>
                                <td>{unit.tenancyStatus.toLowerCase()}</td>
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
        )}

        <div
          class="modal fade"
          id="edit-tenant"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Tenant
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">UnitTypeName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter UnitTypeName"
                        onChange={(event) =>
                          setUnitTypeName(event.target.value)
                        }
                        value={unitTypeName}
                      />
                    </div>
                    <div class="form-group mb-4">
                      <label for="">StartDate</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter StartDate"
                        onChange={(event) => setStartDate(event.target.value)}
                        value={startDate}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">Unit Condition</label>
                      <input
                        type="text"
                        className="form-control"
                        value={unitCondition}
                        onChange={(e) => setUnitCondition(e.target.value)}
                        placeholder="Enter UnitCondition"
                        required={true}
                      />
                    </div>
                    {/* <div className="form-group mb-4">
                      <label htmlFor="">TenancyStatus</label>
                      <input
                        type="text"
                        className="form-control"
                        value={tenancyStatus}
                        onChange={(e) => setTenancyStatus(e.target.value)}
                        placeholder="Enter TenancyStatus"
                        required={true}
                      />
                    </div> */}
                    <div className="form-group mb-4">
                      <label htmlFor="">TenancyRenewalDate</label>
                      <input
                        type="text"
                        className="form-control"
                        value={tenancyRenewalDate}
                        onChange={(e) => setTenancyRenewalDate(e.target.value)}
                        placeholder="Enter TenancyRenewalDate"
                        required={true}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">MonthsToTenancyRenewal</label>
                      <input
                        type="text"
                        className="form-control"
                        value={tenancyRenewalNotificationDate}
                        onChange={(e) =>
                          setTenancyRenewalNotificationDate(e.target.value)
                        }
                        placeholder="TenancyRenewalNotificationDate"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={editTenant}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Modal */}

        <div
          class="modal fade"
          id="edit-contact"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Tenant
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">FirstName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter FirstName"
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                      />
                    </div>

                    <div class="form-group mb-4">
                      <label for="">LastName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter LastName"
                        onChange={(event) => setLastName(event.target.value)}
                        value={lastName}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">OtherName</label>
                      <input
                        type="text"
                        className="form-control"
                        value={otherName}
                        onChange={(e) => setOtherName(e.target.value)}
                        placeholder="Enter OtherName"
                        required={true}
                      />
                    </div>

                    <div class="form-group mb-4">
                      <label for="">Type</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Type"
                        onChange={(event) =>
                          setContactPersonTypeName(event.target.value)
                        }
                        value={contactPersonTypeName}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">PhoneNumber1</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phoneNumber1}
                        onChange={(e) => setPhoneNumber1(e.target.value)}
                        placeholder="Enter PhoneNumber1"
                        required={true}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">Relationship</label>
                      <input
                        type="text"
                        className="form-control"
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        placeholder="Enter Relationship"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => editContactPersons()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 

 //edit tenanant details */}
        <div
          class="modal fade"
          id="edit-tenant-detail"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-body">
             
                 {/* //Company */}


                <div className="row">
                  <div className="form-group">
                  <div className="mb-3">
                          <label className="form-label">Tenant type</label>
                          <select
                            onChange={(e) => setTenantTypeName(e.target.value)}
                            name="tenantTypeName"
                            className="form-control"
                          >
                            <option value="INDIVIDUAL" >Individual</option>
                            <option value="COMPANY">Company</option>
                          </select>
                        </div>
                  </div>

                  {tenantTypeName === "COMPANY" &&
                  <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">CompanyName</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setCompanyName(event.target.value)}
                        value={companyName}
                        placeholder="Enter CompanyName"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">CertificateOfIncorporation</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setCertificateOfIncorporation(event.target.value)}
                        value={certificateOfincorporation}
                        placeholder="Enter CertificateOfIncorporation"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">CompanyLocation</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setCompanyLocation(event.target.value)}
                        value={companyLocation}
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">PhoneNumber</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        value={phoneNumber}
                        placeholder="Enter PhoneNumber"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">CompanyDateOfRegistration </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setCompanyDateOfRegistration(event.target.value)}
                        value={companyDateOfRegistration}
                        placeholder="Enter CompanyDateOfRegistration "
                      />
                    </div>
                  </div>
                
                </div> }

          
                 
                {tenantTypeName!== "COMPANY" &&
              <div className="row">
                  <div className="form-group">
                
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">FirstName</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                        placeholder="Enter FirstName"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">LastName</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setLastName(event.target.value)}
                        value={lastName}
                        placeholder="Enter LastName"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">OtherName</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setOtherName(event.target.value)}
                        value={otherName}
                        placeholder="Enter OtherName"
                      />
                    </div>
               
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">Id Number</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setIdNumber(event.target.value)}
                        value={idNumber}
                        placeholder="Enter Id Number"
                      />
                    </div>
                  
                    <div className="form-group">
                      <label htmlFor="">Nationality</label>
                      <select className="form-control" data-live-search="true" title="Select nationality"
                                onChange={(e) => setNatioality(e.target.value)} value={nationality}>

                                <option></option>
                                <option value="Kenya">Kenya</option>

                              </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        placeholder="Enter Email"
                      />
                    </div>
              
            
                  </div>
                </div>}

              </div>


              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => editTenantsDetails()}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* // create ContactPerson */}

      
        <div
       class="modal fade"
       id="create-contact"
       data-bs-backdrop="static"
       data-bs-keyboard="false"
       role="dialog"
       aria-labelledby="staticBackdropLabel"
       aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="mod">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Tenant
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">FirstName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter FirstName"
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                      />
                    </div>

                    <div class="form-group mb-4">
                      <label for="">LastName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter LastName"
                        onChange={(event) => setLastName(event.target.value)}
                        value={lastName}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">OtherName</label>
                      <input
                        type="text"
                        className="form-control"
                        value={otherName}
                        onChange={(e) => setOtherName(e.target.value)}
                        placeholder="Enter OtherName"
                        required={true}
                      />
                    </div>

                    <div class="form-group mb-4">
                      <label for="">Type</label>
                      <select
                        class="form-control"
                        data-live-search="true"
                        title="Select ContactPersonTypeName"
                        onChange={(e) => setContactPersonType(e.target.value)}
                      >
                        <option className="text-black font-semibold ">
                          --Select ContactPersonTypeName--
                        </option>
                        {contactPerson &&
                          contactPerson.map((cont, index) => {
                            return (
                              <option key={index} value={cont}>
                                {cont}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">PhoneNumber1</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phoneNumber1}
                        onChange={(e) => setPhoneNumber1(e.target.value)}
                        placeholder="Enter PhoneNumber1"
                        required={true}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">Relationship</label>
                      <input
                        type="text"
                        className="form-control"
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        placeholder="Enter Relationship"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => addConctactPersons()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

    
    </div>
    <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <script>document.write(new Date().getFullYear())</script> ©
              RevenueSure.
            </div>
            <div class="col-sm-6">
              <div class="text-sm-end d-sm-block">
                Developed by Nouveta LTD.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default OneTenant;
