/* global $*/
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import UnitTypes from "../setups/UnitTypes";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import moment from 'moment'
import { Modal, Button } from "react-bootstrap";
import { baseUrl } from "../../services/API";



function OneTenant() {
  const [activeLink, setActiveLink] = useState(1);
  const [tenantData, setTenantData] = useState({});

  const [tenantId, setTenantId] = useState("");
  const [contactPerson, setContactPerson] = useState([]);
  // $( "#datepicker198" ).datepicker({ minDate: new Date().getDay() });
  // $('#datepicker198').datepicker({
  //   format:'mm-dd-yyyy',
  //   startDate:'+0d',
  //   autoclose:true
  // })
  //edit tenants-details
  const [type, setType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [nationality, setNationality] = useState("");
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
  const [premiseData, setPremiseData] = useState([])


  //company details


  const [premises, setPremises] = useState([])
  const [units, setUnits] = useState([])
  const [premId, setPremId] = useState("")




  const [companyLocation, setCompanyLocation] = useState("")
  //documents

  const [docName, setDocName] = useState("")
  const [docs, setDocs] = useState("")
  const [documentTypeId, setDocumentTypeId] = useState(null)
  const [documentTypes, setDocumentTypes] = useState([])
  const [tenantDocs, setTenantDocs] = useState([])
  //modals
  const [show, setShow] = useState(false);
  const [docShow, setdocShow] = useState(true);



  const [editAccountShow, seteditAccountShow] = useState(false);
  const [editDocShow, seteditDocShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDocShow = () => setdocShow(true);
  const handleDocClose = () => setdocShow(false);

  const handleEditShow = () => seteditDocShow(true);
  const handleEditClose = () => seteditDocShow(false);

  // doc 

  const handleDocumentSubmit = (event) => {
    event.preventDefault();

    handleDocClose();
  }

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setDocs(base64);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }




  // edit tenants
  const [unitTypeName, setUnitTypeName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [unitCondition, setUnitCondition] = useState("");
  const [tenancyStatus, setTenancyStatus] = useState("");
  const [tenancyRenewalDate, setTenancyRenewalDate] = useState("");
  const [tenancyRenewalNotificationDate, setTenancyRenewalNotificationDate] =
    useState("");
  const [premiseUnitId, setPremiseUnitId] = useState("");
  const [tenantStatuses, setTenantStatuses] = useState([])
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
      setTenantTypeName(res.data.data.tenant.tenantType);
    });
  };

  const editTenantsDetails = () => {
    let details = JSON.stringify({
      active: true,
      clientId: parseInt(authService.getClientId()),
      companyAddress: companyAddress,
      companyDateOfRegistration: new Date(companyDateOfRegistration),
      companyIncorporationNumber: companyIncorporationNumber,
      companyName: companyName,
      dob: dob,
      email: email,
      firstName: firstName,
      gender: null,
      id: detailsId,
      idNumber: idNumber,
      lastName: lastName,
      maritalStatus: maritalStatus,
      nationality: nationality,
      occupation: null,
      otherName: otherName,
      phoneNumber: phoneNumber,
      tenantTypeName: tenantTypeName,

    });
    //  console.log(id)
    requestsServiceService.updateTenantsDetails(details).then((res) => {
      fetchAll()

    });

    // console.log(details)
  };
  // console.log( editTenantsDetails)
  const handleChangeTenantsDetails = (
    detailsId,
    tenantTypeName,
    firstName,
    lastName,
    otherName,
    phoneNumber,
    email,
    idNumber,
    companyName,
    nationality,
    companyAddress,
    companyDateOfRegistration,

  ) => {
    setDetailsId(detailsId);
    setTenantTypeName(tenantTypeName);
    setFirstName(firstName);
    setLastName(lastName);
    setOtherName(otherName);
    setPhoneNumber(phoneNumber)
    setEmail(email);
    setIdNumber(idNumber);
    setCompanyName(companyName);
    setNationality(nationality);
    setCompanyAddress(companyAddress);
    setCompanyDateOfRegistration(companyDateOfRegistration);
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
    tenancyStatus,
    tenancyRenewalDate,
    tenancyRenewalNotificationDate,
    unitId
  ) => {
    setPremiseUnitId(permiseUnitId);
    setUnitTypeName(unitTypeName);
    setStartDate(startDate);
    setUnitCondition(unitCondition);
    setTenancyStatus(tenancyStatus);
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

      if (res.data.status) {
        setError({
          ...error,
          message: res.data.message,
          color: "success"
        })
      } else {

        setError({
          ...error,
          message: res.data.message,
          color: "warning"
        })
      }


      setTimeout(() => {
        clear()
      }, 3000)
    }).catch((res) => {

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

  const clear = () => {
    setError({
      ...error,
      message: "",
      color: ""
    });
  };


  const addTenancies = () => {

    let data = JSON.stringify({
      active: true,
      // id:0,
      premiseUnitId: premiseUnitId,
      startDate: new Date(),
      tenancyCharges: [],
      tenancyDocuments: [],
      tenancyRenewalDate: tenancyRenewalDate,
      tenancyRenewalNotificationDate: tenancyRenewalNotificationDate,
      tenancyStatusName: tenancyStatus,
      tenantId: tenantData.tenant.id,
      unitCondition: unitCondition

    })

    requestsServiceService.createTenancies(data).then((res) => {
      console.log(res)
      fetchAll()
      if (res.data.status) {
        setError({
          ...error,
          message: res.data.message,
          color: "success"
        })
      } else {

        setError({
          ...error,
          message: res.data.message,
          color: "warning"
        })
      }


      setTimeout(() => {
        cleared()
      }, 3000)
    }).catch((res) => {

      setError({
        ...error,
        message: res.data.message,
        color: "danger"
      })

      setTimeout(() => {
        cleared()
      }, 3000)


    })
  }

  const cleared = () => {
    setError({
      ...error,
      message: "",
      color: ""

    })

  }
  const getPremises = () => {
    requestsServiceService.allPremises().then((res) =>
      setPremises(res.data.data)
    )
  }

  const onPremiseChange = (event) => {

    let vals = event.target.value.split(':');

    requestsServiceService.findVacatPremise(vals[0]).then((res) =>
      setUnits(res.data.data)
    )
  }
  const premiseUnitChange = (event) => {
    setPremiseUnitId(event.target.value)
  }

  const getStatus = () => {
    requestsServiceService.getTenantStatus().then((res) => {
      setTenantStatuses(res.data.data)
    })
  }

  //documents create
  const createDoc = () => {

    setdocShow(!docShow)

    let data = JSON.stringify({
      docName: docName,
      document: docs,
      documentOwnerTypeName: "TENANT",
      documentTypeId: documentTypeId,
      id: null,
      ownerEntityId: userId
    })

    requestsServiceService.createDocuments(data).then((res) => {
      // setTenantDocs(res.data.data)
      getDocument()


    })
  }

  const getDocument = () => {
    requestsServiceService.fetchDocuments("TENANT", id).then((res) => {
      setTenantDocs(res.data.data)


    }
    )
  }
  useEffect(() => {
    fetchAll();
    getContactTypeName();
    getPremises();
    getStatus()
    createDoc();
    createDocumentTypes()
    getDocument()



  }, []);

  const createDocumentTypes = (id) => {
    requestsServiceService.getDocumentTypes(id).then((res) => {
      setDocumentTypes(res.data.data);

    })
  }


  const deleteDeactivate = (id) => {
    requestsServiceService.deactivateTenancies(id).then((res) => {
      fetchAll()
    }

    );


  };
  // console.log(tenancyRenewalDate)






  const date2 = (date) => {
    setTenancyRenewalNotificationDate(new Date(date.target.value));
  }
  const date3 = (date) => {
    setTenancyRenewalDate(new Date(date.target.value));
  }
  $(document).on("change", ".date2", date2)
  $(document).on("change", ".date3", date3)


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
                    <Link to='/'>Dashboard </Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link to='/alltenants'>All Tenants</Link>
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
                      <a
                        onClick={() => setActiveLink(4)}
                        class={
                          activeLink === 4
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Document Attachments
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
                              tenantData.tenant.tenantType,
                              tenantData.tenant.firstName,
                              tenantData.tenant.lastName,
                              tenantData.tenant.otherName,
                              tenantData.tenant.phoneNumber,
                              tenantData.tenant.email,
                              tenantData.tenant.idNumber,
                              tenantData.tenant.companyName,
                              tenantData.tenant.nationality,
                              tenantData.tenant.companyAddress,
                              tenantData.tenant.companyDateOfRegistration
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
                        {tenantTypeName === "INDIVIDUAL" &&
                          <div className="row mt-5">

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
                            <div className="col-3">
                              <label htmlFor="">Id Number</label>
                              <div>
                                <span>
                                  {tenantData.tenant && tenantData.tenant.idNumber}
                                </span>
                              </div>
                            </div>



                            <div className="row mt-5">
                              <div className="col-3">
                                <label htmlFor="">PhoneNumber</label>
                                <div>
                                  <span>
                                    {tenantData.tenant && tenantData.tenant.phoneNumber}
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


                          </div>}
                      </div>

                      {tenantTypeName === "COMPANY" &&
                        <div className="row mt-5">

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
                            <label htmlFor="">Company Address</label>
                            <div>
                              <span>
                                {tenantData.tenant &&
                                  tenantData.tenant.companyAddress}
                              </span>
                            </div>
                          </div>


                          <div className="row mt-5">


                            <div className="col-3">
                              <label htmlFor="">CompanyDateOfRegistration</label>
                              <div>
                                <span>
                                  {moment(tenantData.tenant &&
                                    tenantData.tenant.companyDateOfRegistration).format("DD /MM /YYYY")}
                                </span>
                              </div>
                            </div>
                          </div>

                        </div>}


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
                            <div className="d-flex">
                              <button
                                type="button"
                                className="btn btn-primary waves-effect btn-label waves-light me-3"
                                data-bs-toggle="modal"
                                data-bs-target="#create-tenancies"
                              >
                                <i className="mdi mdi-plus label-icon"></i> Add
                                Tenancies
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="card-body">
                            {error.color !== "" &&
                              <div className={"alert alert-" + error.color} role="alert">
                                {error.message}
                              </div>
                            }
                            <div className="table-responsive">
                              <table className="table align-middle table-nowrap table-hover mb-0">
                                <thead>
                                  <tr class="text-uppercase table-dark">
                                    <th>#</th>
                                    <th>Unit Name</th>
                                    <th>Premise Name</th>
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
                                        <td>{unit.premiseUnit.premise.premiseName}</td>

                                        <td className="text-capitalize">
                                          {unit.premiseUnit.unitType.name}
                                        </td>
                                        <td>
                                          {moment(unit.startDate.replace(/[TZ]/g, " ")).format("DD /MM /YYYY")}
                                        </td>
                                        <td>{unit.unitCondition}</td>
                                        <td>
                                          <span className="badge-soft-success badge">  {unit.tenancyStatus.toLowerCase()


                                          }</span>
                                        </td>
                                        <td>{moment(unit.tenancyRenewalDate).format
                                          ("DD/ MM/ YYYY")
                                        }</td>
                                        <td>
                                          {moment(unit.tenancyRenewalNotificationDate).format("DD /MM/ YYYY")}
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
                                                    unit.tenancyStatus,
                                                    unit.tenancyRenewalDate,
                                                    unit.tenancyRenewalNotificationDate,
                                                    unit.id


                                                  )
                                                }
                                              >
                                                <i class="font-size-15 mdi mdi-pencil me-3"></i>
                                                Edit
                                              </p>
                                              <p>
                                                <Link class="dropdown-item" to={`/premise/tenant/${unit.tenant.id}`}><i class="font-size-15 mdi mdi-eye-plus-outline cursor-pinter me-3"></i>view</Link>
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
              </div>
            </div>
          </div>
        )}

        {activeLink === 3 && (
          <div>
            <div className={"row"}>
              <div className="col-12">
                <div className="card calc-h-3px">
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                          <div
                            className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                            role="toolbar"
                          >
                            <div className="d-flex align-items-center flex-grow-1">
                              <h4 className="mb-0  bg-transparent  p-0 m-0">
                                Contact Persons
                              </h4>
                            </div>
                            <div className="d-flex">
                              <button
                                type="button"
                                className="btn btn-primary waves-effect btn-label waves-light me-3"
                                data-bs-toggle="modal"
                                data-bs-target="#create-contact"
                              >
                                <i className="mdi mdi-plus label-icon"></i> Add
                                ContactPerson
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="row">


                            <div className="col-12">
                              <div className={"alert alert-" + error.color} role="alert">
                                {error.message}
                              </div>
                              <div className="table-responsive">
                                <table className="table align-middle table-nowrap table-hover mb-0">
                                  <thead>
                                    <tr class="text-uppercase table-dark">
                                      <th>#</th>
                                      <th>Name (s) </th>
                                      <th>Type</th>
                                      <th>Relationship</th>
                                      <th>phone No</th>
                                      <th>Status</th>
                                      <th className="text-right">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tenantData.contactPeople &&
                                      tenantData.contactPeople.map(
                                        (unit, index) => (
                                          <tr data-id="1">
                                            <td>{index + 1}</td>
                                            <td>
                                              {unit.firstName} {unit.lastName}{" "}
                                              {unit.otherName}
                                            </td>
                                            <td className="text-capitalize">
                                              {unit.contactPersonType
                                                .toLowerCase()
                                                .replace(/_/g, " ")}
                                            </td>
                                            <td>{unit.relationship}</td>
                                            <td>{unit.phoneNumber1}</td>
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

                                            <td className="text-right cell-change ">
                                              <a
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit-contact"
                                                className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit"
                                                onClick={() =>
                                                  handleChangeContacts(
                                                    unit.id,

                                                    unit.firstName,
                                                    unit.lastName,
                                                    unit.otherName,
                                                    unit.contactPersonType,
                                                    unit.phoneNumber1,
                                                    unit.relationship
                                                  )
                                                }
                                              >
                                                <i className="bx bx-edit-alt " />
                                              </a>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
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

        {activeLink === 4 && (
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
                        <h4 class="mb-0 m-0 bg-transparent">Documents</h4>
                      </div>
                      <div onClick={handleDocShow}>
                        <button
                          type="button"
                          className="btn align-items-center d-flex btn-primary dropdown-toggle option-selector mb-3 mt-0"
                        >
                          <i className="dripicons-plus font-size-16 mt-1"></i>{" "}
                          <span className="pl-1 d-md-inline">
                            New document
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card-body" onSubmit={createDoc}>
                    <div className="col-12">
                      <div className="table-responsive">
                        <table
                          class="table align-middle table-edits rent-invoicing dt-responsive"
                          id="data-table"
                        >
                          <thead>
                            <tr class="text-uppercase table-dark">
                              <th>#</th>
                              <th>Name</th>
                              <th>Type</th>
                              <th>Own type</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tenantDocs &&
                              tenantDocs.map(
                                (unit, index) => (
                                  <tr data-id="1">
                                    <td>{index + 1}</td>
                                    <td className="active nav-link cursor-pointer">
                                      <a onClick={() => download}>
                                        {" "}
                                        {unit.docName}
                                      </a>
                                    </td>
                                    <td>{unit.documentType.name}</td>
                                    <td className="text-capitalize">
                                      {unit.documentOwnerType.toLowerCase()}
                                    </td>
                                    <td>
                                      <a href={baseUrl + "/documents/download?docName=" + `${unit.docName}`}
                                        className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit"
                                        target="_blank"><i className="bx bx-download" />
                                      </a>
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*document attachment modal*/}

            <div>
              <Modal show={docShow} onHide={handleDocClose} className={"modal fade"} centered>
                <form onSubmit={createDoc}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Documents</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group mb-4">
                          <label htmlFor="">Select Document Type. <strong className="text-danger ">*</strong></label>
                          <select
                            className="form-control text-capitalize"
                            onChange={(e) => {
                              setDocumentTypeId(e.target.value);
                            }}
                            name="document type"
                            required={true}
                          >
                            <option className="text-black font-semibold ">
                              select..
                            </option>
                            {documentTypes && documentTypes.sort((a, b) => a.name.localeCompare(b.name))?.map((dT) => {
                              return (
                                <option
                                  key={dT.id}
                                  value={dT.id}
                                >
                                  {dT.name?.toLowerCase().replace(/_/g, " ")}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="">Document Name. <strong className="text-danger ">*</strong></label>
                          <input type="text" className="form-control" value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Enter document name" required={true} />
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="">Document Upload. <strong className="text-danger ">*</strong></label>
                          <div className="input-group mb-0">
                            <label className="input-group-text bg-info text-white cursor-pointer"
                              htmlFor="document1-1">
                              <i className="font-14px mdi mdi-paperclip"></i> Attach File
                            </label>
                            <input type="file" className="form-control" id="document1-1" onChange={e => handleFileRead(e)} required={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" className={"btn btn-grey"} onClick={handleDocClose}>
                      Close
                    </Button>
                    <Button variant="primary" className={"btn btn-primary"} type={"submit"}>
                      Add Document
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>

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
                  Tenancies
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
                      <label for="">UnitName</label>
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
                    <div class="form-group mb-4" id="datepicker12">
                      <label for="">StartDate</label>
                      <input
                        type="text"
                        class="form-control mouse-pointer enddate"
                        placeholder="Enter StartDate"
                        readOnly data-date-format="dd M, yyyy" data-date-container='#datepicker12' data-provide="datepicker" data-date-autoclose="true"
                        onChange={(event) => setStartDate(event.target.value)}
                        value={startDate}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">Unit Condition</label>
                      <input
                        type="text"
                        className="form-control "
                        value={unitCondition}
                        onChange={(e) => setUnitCondition(e.target.value)}
                        placeholder="Enter UnitCondition"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">TenancyStatus</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter TenancyStatus"


                        onChange={(e) => setTenancyStatus(e.target.value)}
                        value={tenancyStatus}

                      />

                    </div>


                    <div className="form-group mb-4" id="datepicker14">
                      <label htmlFor="">TenancyRenewalDate</label>
                      <input
                        type="text"
                        className="form-control mouse-pointer enddate"
                        value={tenancyRenewalDate}
                        onChange={(e) => setTenancyRenewalDate(e.target.value)}
                        placeholder="Enter TenancyRenewalDate"
                        readOnly data-date-format="dd M, yyyy" data-date-container='#datepicker14' data-provide="datepicker" data-date-autoclose="true"

                        required={true}
                      />
                    </div>

                    <div className="form-group mb-4" id="datepicker151">
                      <label htmlFor="">TenancyRenewalNotificationDate</label>
                      <input
                        type="text"
                        className="form-control mouse-pointer enddate"
                        value={tenancyRenewalNotificationDate}
                        onChange={(e) =>
                          setTenancyRenewalNotificationDate(e.target.value)
                        }
                        placeholder="TenancyRenewalNotificationDate"
                        readOnly data-date-format="dd M, yyyy" data-date-container='#datepicker151' data-provide="datepicker" data-date-autoclose="true"

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



                  {tenantTypeName === "INDIVIDUAL" &&

                    <div className="row">

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
                        <div className="form-group">
                          <label htmlFor="">PhoneNumber</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            value={phoneNumber}
                            placeholder="Enter Phone Number"
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
                            onChange={(e) => setNationality(e.target.value)} value={nationality}>

                            <option></option>
                            <option value="Kenya">Kenyan</option>

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



                  {tenantTypeName !== "INDIVIDUAL" &&
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
                          <label htmlFor="">CompanyIncorporationNumber</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) => setCompanyIncorporationNumber(event.target.value)}
                            value={companyIncorporationNumber}
                            placeholder="Enter CompanyIncorporationNumber"
                          />
                        </div>



                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="">CompanyAddress</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) => setCompanyAddress(event.target.value)}
                            value={companyAddress}
                            placeholder="EnterCompanyAddress"
                          />
                        </div>
                        <div className="form-group" >
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
                  Contact Person
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


        {/* //add Tenant */}



        <div
          class="modal fade"
          id="create-tenancies"
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
                  Tenancies
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
                      <label for="">Premises</label>
                      <select className='form-control' onChange={onPremiseChange} name="premise">
                        <option> --Select Premises--</option>
                        {premises?.map((prem, index) => <option value={prem.id + ':' + prem.premiseName}>{prem.premiseName}</option>)}
                      </select>
                    </div>
                    <div class="form-group mb-4">
                      <label for="">Unit</label>
                      <select className='form-control' onChange={premiseUnitChange} name="premiseUnitId">
                        <option> --Select Unit--</option>
                        {units?.map((prem, index) => <option value={prem.id}>{prem?.unitName}</option>)}
                      </select>
                    </div>


                    <div class="form-group mb-4">
                      <label for="">Unit Condition</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter UnitCondition"
                        onChange={(event) => setUnitCondition(event.target.value)}
                        value={unitCondition}
                      />
                    </div>

                    <div className="form-group mb-4" id="datepicker198">
                      <label htmlFor="">StartDate</label>
                      <input
                        type="text"
                        className="form-control mouse-pointer enddate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Enter StartDate"
                        readOnly data-date-format="dd M, yyyy" data-date-container='#datepicker198' data-provide="datepicker" data-date-autoclose="true" data-date-start-date="+0d"
                        required={true}

                      />

                    </div>

                    <div className="form-group mb-4 " id="datepicker1">
                      <label htmlFor="">TenancyRenewalDate</label>
                      <input
                        type="text"
                        className="form-control mouse-pointer date3"
                        value={tenancyRenewalDate}
                        onChange={(e) => setTenancyRenewalDate(e.target.value)}
                        placeholder="Enter TenancyRenewalDate "
                        readOnly data-date-format="dd M, yyyy" data-date-container='#datepicker1' data-provide="datepicker" data-date-autoclose="true"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4" id="datepicker1">
                      <label htmlFor="">TenancyRenewalNotificationDate</label>
                      <input
                        type="text"
                        className="form-control mouse-pointer date2"
                        value={tenancyRenewalNotificationDate}
                        onChange={(e) => setTenancyRenewalNotificationDate(e.target.value)}
                        placeholder="Enter TenancyRenewalNotificationDate"
                        readOnly data-date-format="dd M, yyyy" data-date-container='#datepicker1' data-provide="datepicker" data-date-autoclose="true"

                        required={true}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">TenancyStatus</label>
                      <select
                        class="form-control"
                        data-live-search="true"
                        title="Select TenancyStatus"
                        onChange={(e) => setTenancyStatus(e.target.value)}
                      >
                        <option className="text-black font-semibold ">
                          --Select TenancyStatus--
                        </option>
                        {tenantStatuses &&
                          tenantStatuses.map((tenant, index) => {
                            return (
                              <option key={index} value={tenant}>
                                {tenant}
                              </option>
                            );
                          })}
                      </select>
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
                  onClick={() => addTenancies()}
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
