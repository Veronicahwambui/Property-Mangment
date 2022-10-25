/* global $ */
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterTenant() {
  const [showNewContactPeronModal, setShowNewContactPeronModal] =
    useState(false);
  const [activeInvoice, setActiveInvoice] = useState({});
  const [showAssignUnits, setShowAssignUnits] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const [premises, setPremises] = useState([]);
  const [units, setUnits] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // getAllPremises();
    onPremiseChange();
    getAllDocumentTypes();
  }, []);

  const getAllPremises = () => {
    requestsServiceService
      .allPremises()
      .then((res) => setPremises(res.data.data));
  };
  const getAllDocumentTypes = () => {
    requestsServiceService
      .allDocumentTypes("TENANT", true)
      .then((res) => setDocumentTypes(res.data.data));
  };

  const onPremiseChange = (event) => {
    // let vals = event.target.value.split(":");

    requestsServiceService
      .findVacatPremise(6)
      .then((res) => setUnits(res.data.data));

    setTenancyBody({ ...tenancyBody, premise: 6 });
    setTenancyBody({ ...tenancyBody, premiseName: "School of Nursing" });
  };

  const [tenantDocuments, setTenantDocuments] = useState([]);
  const [docBody, setDocBody] = useState({
    docName: undefined,
    document: undefined,
    documentOwnerTypeName: undefined,
    documentTypeId: undefined,
    id: undefined,
    ownerEntityId: undefined,
  });
  const tenancyChargeBody = {
    active: true,
    premiseUnitTypeChargeId: undefined,
    value: undefined,
  };

  const updateDoB = (date) => {
    setTenantDto({
      ...tenantDto,
      dob: moment(date.target.value).format("YYYY-MM-DD"),
    });
  };

  const updateCompanyDateOfRegistration = (date) => {
    setTenantDto({
      ...tenantDto,
      companyDateOfRegistration: moment(date.target.value).format("YYYY-MM-DD"),
    });
  };

  $(document).on("change", ".startdate", updateCompanyDateOfRegistration);
  $(document).on("change", ".enddate", updateDoB);

  const [tenancyDTOS, setTenancyDTOS] = useState([]);
  const [tenantKins, setTenantKins] = useState([]);
  const [tenantReferees, setTenantReferees] = useState([]);
  const [tenantDependents, setTenantDependents] = useState([]);
  const [tenantRoommates, setTenantRoommates] = useState([]);

  const [contactPersonBody, setContactPersonBody] = useState({
    active: true,
    contactPersonTypeName: undefined,
    firstName: undefined,
    id: undefined,
    lastName: undefined,
    otherName: undefined,
    phoneNumber1: undefined,
    phoneNumber2: undefined,
    relationship: undefined,
    tenantId: undefined,
  });

  const [tenancyBody, setTenancyBody] = useState({
    active: true,
    id: undefined,
    monthsToTenancyRenewal: undefined,
    premiseUnitId: undefined,
    startDate: new Date(),
    tenancyCharges: [],
    tenancyDocuments: [],
    tenancyStatusName: "CURRENT",
    tenantId: undefined,
    unitCondition: undefined,
  });

  const addTenancy = () => {
    let bod = tenancyBody;
    let tenant = [];
    tenant.push(bod);
    setTenancyDTOS(tenant);
    toogleShowAssignUnits();
  };

  const addDocument = () => {
    let data = docBody;
    if (data.documentOwnerTypeName === "TENANT") {
      let kins = tenantDocuments;
      kins.push(data);
      setTenantDocuments(kins);
    } else if (data.documentOwnerTypeName === "TENANCY") {
      let kins = tenancyDTOS;
      kins[0].tenancyDocuments.push(data);
      setTenancyDTOS(kins);
    }

    toogleShowNewDocumentModal();
    setDocBody({
      docName: undefined,
      document: undefined,
      documentOwnerTypeName: undefined,
      documentTypeId: undefined,
      id: undefined,
      ownerEntityId: undefined,
    });
  };

  // modals
  const [showKins, setShowKins] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);

  const toogleshowKins = (event) => {
    setShowKins(!showKins);
  };
  const toogleshowEducation = (event) => {
    setShowEducation(!showEducation);
  };
  const toogleshowWork = (event) => {
    setShowWork(!showWork);
  };
  const toogleshowEnroll = (event) => {
    setShowEnroll(!showEnroll);
  };

  const addContactPersonData = (el) => {
    el.preventDefault();
    let data = contactPersonBody;
    if (data.contactPersonTypeName === "NEXT_OF_KIN") {
      let kins = tenantKins;
      kins.push(data);
      setTenantKins(kins);
      toogleshowKins();
    } else if (data.contactPersonTypeName === "DEPENDANT") {
      let kins = tenantDependents;
      kins.push(data);
      setTenantDependents(kins);
    } else if (
      data.contactPersonTypeName === "GUARDIAN" ||
      data.contactPersonTypeName === "REFEREE"
    ) {
      let kins = tenantReferees;
      kins.push(data);
      setTenantReferees(kins);
    } else if (data.contactPersonTypeName === "ROOMMATE") {
      let kins = tenantRoommates;
      kins.push(data);
      setTenantRoommates(kins);
    }
    hideModals(data.contactPersonTypeName);
    setContactPersonBody({
      active: true,
      contactPersonTypeName: undefined,
      firstName: undefined,
      id: undefined,
      lastName: undefined,
      otherName: undefined,
      phoneNumber1: undefined,
      phoneNumber2: undefined,
      relationship: undefined,
      tenantId: undefined,
    });
  };

  const [tenantDto, setTenantDto] = useState({
    active: true,
    clientId: parseInt(authService.getClientId()),
    companyAddress: undefined,
    companyDateOfRegistration: undefined,
    companyIncorporationNumber: undefined,
    companyName: undefined,
    dob: undefined,
    email: undefined,
    firstName: undefined,
    gender: undefined,
    id: undefined,
    idNumber: undefined,
    lastName: undefined,
    maritalStatus: undefined,
    nationality: undefined,
    occupation: undefined,
    otherName: undefined,
    phoneNumber: undefined,
    tenantTypeName: "INDIVIDUAL",
  });

  const submit = (event) => {
    console.log(event);
    event.preventDefault();

    let contacts = [];
    let referees = [];
    for (let i = 0; i < tenantReferees.length; i++) {
      let data = tenantReferees[i];
      if (
        data.contactPersonTypeName === "GUARDIAN" ||
        data.contactPersonTypeName === "REFEREE"
      )
        data.contactPersonTypeName = "REFEREE";

      referees.push(data);
    }
    contacts.push.apply(contacts, referees);
    contacts.push.apply(contacts, tenantDependents);
    contacts.push.apply(contacts, tenantRoommates);
    contacts.push.apply(contacts, tenantKins);

    let dara = JSON.stringify({
      tenancyDTOS: tenancyDTOS,
      tenantContactPersons: contacts,
      tenantDTO: tenantDto,
      tenantDocuments: tenantDocuments,
    });
    requestsServiceService
      .createTenant(dara)
      .then((res) => {
        if (res.data.status == true) {
          confirmAlert({
            message: res.data.message,
            buttons: [
              {
                label: "OK",
                onClick: (e) => navigate("/alltenants", { replace: true }),
              },
            ],
          });
        } else {
          confirmAlert({
            message: res.data.message,
            buttons: [{ label: "OK" }],
          });
        }
      })
      .catch((err) => {
        confirmAlert({
          message: err.data.message,
          buttons: [{ label: "OK" }],
        }).catch((err) => {
          confirmAlert({
            message: err.message,
            buttons: [{ label: "OK" }],
          });
        });
      });
  };
  const newContactPerson = (event) => {
    setContactPersonBody({
      ...contactPersonBody,
      contactPersonTypeName: event.target.dataset.id,
    });
    hideModals(event.target.dataset.id);
  };

  const hideModals = (modalName) => {
    if (modalName === "NEXT_OF_KIN") toogleshowKins();
    else if (modalName === "REFEREE") toogleshowWork();
    else if (modalName === "DEPENDANT") toogleshowEducation();
  };

  const newDocument = (event) => {
    setDocBody({ ...docBody, documentOwnerTypeName: event.target.dataset.id });

    toogleShowNewDocumentModal();
  };

  const toogleShowNewContactPeronModal = (event) => {
    setShowNewContactPeronModal(!showNewContactPeronModal);
  };

  const toogleShowNewDocumentModal = (event) => {
    setShowDocumentModal(!showDocumentModal);
  };

  const handleTenantDtoChange = (event) => {
    if (event.target.name === "tenantTypeName")
      setTenantDto({
        ...tenantDto,
        [event.target.name]: event.target.value.toUpperCase(),
      });
    else
      setTenantDto({ ...tenantDto, [event.target.name]: event.target.value });
  };

  const handleContactPersonBodyChange = (event) => {
    setContactPersonBody({
      ...contactPersonBody,
      [event.target.name]: event.target.value,
    });
  };

  const handleDocumentChange = (event) => {
    if (event.target.name === "file") {
      let filereader = new FileReader();

      filereader.readAsDataURL(event.target.files[0]);

      filereader.onload = function () {
        setDocBody({ ...docBody, document: filereader.result });
      };
      filereader.onerror = function (error) {
        console.log("Error: ", error);
      };
    } else setDocBody({ ...docBody, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    console.log(docBody);
  }, [docBody, tenantDocuments]);

  const isIdFilled = tenantDocuments.length > 1;

  const handleidchange = (event) => {
    if (event.target.name === "file") {
      let filereader = new FileReader();

      filereader.readAsDataURL(event.target.files[0]);

      filereader.onload = function () {
        let data = {
          document: filereader.result,
          docName: "ID CARD FRONT",
          documentOwnerTypeName: "TENANT",
        };
        tenantDocuments.push(data);
        setDocBody({ data });
      };
      filereader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };
  const handleidchange2 = (event) => {
    if (event.target.name === "file") {
      let filereader = new FileReader();

      filereader.readAsDataURL(event.target.files[0]);

      filereader.onload = function () {
        let data = {
          document: filereader.result,
          docName: "ID CARD BACK",
          documentOwnerTypeName: "TENANT",
        };
        tenantDocuments.push(data);
        setDocBody({ data });
      };
      filereader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  const handleAssignmentChange = (event) => {
    if (event.target.name === "premiseUnitId") {
      let vals = event.target.value.split(":");
      let bod = tenancyBody;
      bod["premiseUnitId"] = vals[0];
      bod["unitName"] = vals[1];
      setTenancyBody(bod);
    } else if (event.target.name === "startDate") {
      setTenancyBody({
        ...tenancyBody,
        [event.target.name]: moment(event.target.value).format("YYYY-MM-DD"),
      });
    } else
      setTenancyBody({
        ...tenancyBody,
        [event.target.name]: event.target.value,
      });
  };

  const toogleShowAssignUnits = () => {
    setShowAssignUnits(!showAssignUnits);
  };

  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });

  const [error, setError] = useState({
    message: "",
    color: "",
  });

  const [phonenumber, setphonenumber] = useState("");

  const sendSTK = (event) => {
    event.preventDefault();
    let invoiceNoo = activeInvoice;
    let formData = new FormData();
    formData.append("PayBillNumber", "175555");
    formData.append("Amount", parseInt(activeInvoice.billAmount));
    formData.append("PhoneNumber", phonenumber);
    formData.append("AccountReference", invoiceNoo.billerBillNo);
    formData.append("TransactionDesc", invoiceNoo.transactionDescription);
    formData.append("FullNames", `${invoiceNoo.transactionCustomerName}`);
    formData.append("function", "CustomerPayBillOnline");

    let config = {
      method: "post",
      url: "https://payme.revenuesure.co.ke/index.php",
      data: formData,
    };
    axios(config).then((res) => {
      if (typeof res.data === "string") {
        setError({
          ...error,
          message: "Invalid Phone Number",
          color: "danger",
        });
      } else {
        let message = res.data.CustomerMessage;
        setError({
          ...error,
          message: message,
          color: "success",
        });
      }
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: "",
        });
      }, 4000);
    });
  };

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18 text-capitalize">
              New Application{" "}
            </h4>

            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="tenants.html">Applications</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <p>
                Fill in the form correctly. Fields with an Asterisk{" "}
                <strong className="text-danger">*</strong> are mandatory fields.
              </p>
              {/* step form starts here */}
              <div id="kev-step-form">
                {/* step form navigation container */}
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <a className="nav-link active">
                          1.Student Details{" "}
                          <span className="sr-only">(current)</span>
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link">2. Next Of Kin </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link">3. Education Background</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link">4. Working Experience</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link">5. Student Enrollment</a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link">
                          6. Student Document attachments
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link">7. Payment</a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link">8. Confirm details</a>
                      </li>
                    </ul>
                  </div>
                </nav>

                {/* navigation bar end */}
                <form id="tenant-form" onSubmit={submit}>
                  <div className="step-cont active-step">
                    <h3>Student Details</h3>
                    <section>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="mb-3">
                              <label htmlFor="id-front">
                                <i className="font-14px mdi mdi-paperclip"></i>{" "}
                                ID FRONT{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                name="file"
                                onChange={(e) => handleidchange(e)}
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="mb-3">
                              <label htmlFor="id-front">
                                <i className="font-14px mdi mdi-paperclip"></i>{" "}
                                ID BACK{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                name="file"
                                onChange={(e) => handleidchange2(e)}
                                required={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {tenantDto.tenantTypeName === "INDIVIDUAL" && (
                        <div className="row">
                          <div className="col-12">
                            <div className="row">
                              <div className="col-4">
                                <div className="row">
                                  <div className="col-12"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row">
                              <div className="col-lg-4 col-md-6">
                                <div className="mb-4">
                                  <label htmlFor="basicpill-firstname-input">
                                    ID Num/ Birth Cert Num
                                    <strong className="text-danger">*</strong>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => handleTenantDtoChange(e)}
                                    id="basicpill-firstname-input"
                                    name="idNumber"
                                    placeholder="Enter Id no "
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="row">
                                  <label htmlFor="" className="">
                                    Gender:{" "}
                                    <strong className="text-danger">*</strong>
                                  </label>
                                  <div className="d-flex">
                                    <div className="form-check mb-3 pr-15px">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="Male"
                                        onChange={(e) =>
                                          handleTenantDtoChange(e)
                                        }
                                        name="gender"
                                        id="formRadios1"
                                        required
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="formRadios1"
                                      >
                                        Male
                                      </label>
                                    </div>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="Female"
                                        onChange={(e) =>
                                          handleTenantDtoChange(e)
                                        }
                                        name="gender"
                                        id="formRadios2"
                                        required
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="formRadios2"
                                      >
                                        Female
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">
                                First name{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="basicpill-firstname-input"
                                onChange={(e) => handleTenantDtoChange(e)}
                                name="firstName"
                                placeholder="Enter Your First Name"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-lastname-input">
                                Last Name{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="basicpill-lastname-input"
                                onChange={(e) => handleTenantDtoChange(e)}
                                name="lastName"
                                placeholder="Enter Your Last Name"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="">Other Name(s)</label>
                              <input
                                type="text"
                                className="form-control"
                                id=""
                                placeholder="Enter Your Last Name"
                                onChange={(e) => handleTenantDtoChange(e)}
                                name="otherName"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4 col-sm-12">
                            <div className="mb-4">
                              <label htmlFor="" className="">
                                Date of Birth
                                <strong className="text-danger">*</strong>
                              </label>
                              <div className="input-group" id="datepicker1">
                                <input
                                  type="text"
                                  className="form-control mouse-pointer enddate"
                                  name="dob"
                                  placeholder="Select Date"
                                  readOnly
                                  data-date-format="dd M, yyyy"
                                  data-date-container="#datepicker1"
                                  data-provide="datepicker"
                                  data-date-autoclose="true"
                                />

                                <span className="input-group-text">
                                  <i className="mdi mdi-calendar"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-lastname-input">
                                Nationality{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <select
                                className="form-control"
                                data-live-search="true"
                                title="Select nationality"
                                onChange={(e) => handleTenantDtoChange(e)}
                                name="nationality"
                                required={true}
                              >
                                <option></option>
                                <option value="Kenya">Kenyan</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-lastname-input">
                                Marital Status{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <select
                                className="form-control"
                                data-live-search="true"
                                title="Select Marital status"
                                onChange={(e) => handleTenantDtoChange(e)}
                                name="maritalStatus"
                                required
                              >
                                <option></option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">
                                Email.{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="Enter tenants email address"
                                placeholder="Enter email address"
                                onChange={(e) => handleTenantDtoChange(e)}
                                name="email"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">
                                Phone.{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="Enter tenants Phone Number"
                                placeholder="Enter phone No."
                                onChange={(e) => handleTenantDtoChange(e)}
                                name="phoneNumber"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">
                                Occupation{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <select
                                className="form-control "
                                data-live-search="true"
                                title="Select occupation"
                                onChange={(e) => handleTenantDtoChange(e)}
                                name="occupation"
                                required
                              >
                                <option value="employed">Employed</option>
                                <option value="student">Student</option>
                                <option value="pension">Pension</option>
                                <option value="self employed">
                                  Self employed
                                </option>
                                <option value="unemployed">Unemployed</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-12">
                            {/* <div className="row">
                              <label htmlFor="" className="">
                                This student  has a roommate?{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <div className="d-flex">
                                <div className="form-check mb-3 pr-15px">
                                  <input
                                    className="form-check-input"
                                    value="no"
                                    onChange={(e) => handleTenantDtoChange(e)}
                                    type="radio"
                                    name="roomamte"
                                    id=""
                                    required
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="no-roomate"
                                  >
                                    No
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    value="yes"
                                    onChange={(e) => handleTenantDtoChange(e)}
                                    type="radio"
                                    name="roomamte"
                                    id=""
                                    required
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="roomate-yes"
                                  >
                                    Yes
                                  </label>
                                </div>
                              </div>
                            </div> */}
                          </div>
                          {tenantDto.roomamte === "yes" && (
                            <div className="col-12">
                              <div className="row">
                                <div className="col-12">
                                  <div className="bg-primary border-2 bg-soft p-3 mb-4">
                                    <p className="fw-semibold mb-0 pb-0">
                                      Roommates
                                    </p>
                                  </div>
                                </div>

                                <div className="table-responsive table-responsive-md mb-4">
                                  <table className="table table-editable-3 align-middle table-edits">
                                    <thead className="table-light">
                                      <tr className="text-uppercase table-dark">
                                        <th>#</th>
                                        <th>First name</th>
                                        <th className="">Middle name</th>
                                        <th className="">other names</th>
                                        <th className="">Relationship</th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {tenantRoommates?.map(
                                        (dependent, index) => (
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>{dependent.firstName}</td>
                                            <td>{dependent.otherName}</td>
                                            <td>{dependent.lastName}</td>
                                            <td>{dependent.relationship}</td>
                                            <td></td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                    <tfoot>
                                      <tr
                                        className=""
                                        data-id="ROOMMATE"
                                        onClick={newContactPerson}
                                      >
                                        <td
                                          colspan="7"
                                          class="bg-light  cursor-pointer"
                                        >
                                          <span class="d-flex align-items-center ">
                                            <i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                            <span class="pl-5 ">Add New</span>
                                          </span>
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </section>
                  </div>

                  <div className="step-cont d-none">
                    <h3>Next of Kin</h3>
                    <section>
                      <div className="row">
                        <div className="col-12">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0">
                              Next of Kin details
                            </p>
                          </div>
                        </div>

                        <div className="table-responsive table-responsive-md mb-4">
                          <table className="table table-editable-2 align-middle table-edits">
                            <thead className="table-light">
                              <tr className="text-uppercase table-dark">
                                <th>#</th>
                                <th>Names</th>
                                <th className="">Relationship</th>
                                <th>Contact</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {tenantKins &&
                                tenantKins.map((dependent, index) => (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                      {dependent.firstName +
                                        " " +
                                        dependent.otherName +
                                        " " +
                                        dependent.lastName}
                                    </td>
                                    <td>{dependent.relationship}</td>
                                    <td>{dependent.phoneNumber1}</td>
                                    <td></td>
                                  </tr>
                                ))}
                            </tbody>
                            <tfoot>
                              <tr className="">
                                <td
                                  colSpan="7"
                                  className="bg-light  cursor-pinter "
                                >
                                  <span class="d-flex align-items-center ">
                                    <i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                    <span
                                      class="pl-5 "
                                      data-id="NEXT_OF_KIN"
                                      onClick={newContactPerson}
                                    >
                                      Add New
                                    </span>
                                  </span>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="step-cont d-none">
                    <h3>Applicant Education Background </h3>
                    <section>
                      <div className="row">
                        <div className="col-12">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0">
                              Education Background
                            </p>
                          </div>
                        </div>
                        <div className="table-responsive table-responsive-md">
                          <table className="table table-editable-1 align-middle table-edits">
                            <thead className="table-light">
                              <tr className="text-uppercase table-dark">
                                <th>#</th>
                                <th>School Name</th>
                                <th className="">Discipline</th>
                                <th className="">Grade /qualification</th>
                                <th className="">Graduation Year</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {tenantDependents &&
                                tenantDependents.map((dependent, index) => (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{dependent.firstName}</td>
                                    <td>{dependent.otherName}</td>
                                    <td>{dependent.lastName}</td>
                                    <td>{dependent.relationship}</td>
                                    <td></td>
                                  </tr>
                                ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td
                                  colSpan="7"
                                  className="bg-light  cursor-pointer"
                                >
                                  <span class="d-flex align-items-center ">
                                    <i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                    <span
                                      class="pl-5 "
                                      data-id="DEPENDANT"
                                      onClick={newContactPerson}
                                    >
                                      Add Background
                                    </span>
                                  </span>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="step-cont d-none">
                    <h3>Working Experience</h3>
                    <section>
                      <div className="row">
                        <div className="col-12">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0">Experience</p>
                          </div>
                        </div>

                        <div className="table-responsive table-responsive-md mb-4">
                          <table className="table table-editable-3 align-middle table-edits">
                            <thead className="table-light">
                              <tr className="text-uppercase table-dark">
                                <th>#</th>
                                <th>Employer </th>
                                <th className="">Department </th>
                                <th className="">Position</th>
                                <th className="">Relationship</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {tenantReferees &&
                                tenantReferees.map((dependent, index) => (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{dependent.firstName}</td>
                                    <td>{dependent.otherName}</td>
                                    <td>{dependent.lastName}</td>
                                    <td>{dependent.relationship}</td>
                                    <td></td>
                                  </tr>
                                ))}
                            </tbody>
                            <tfoot>
                              <tr
                                className=""
                                data-id="REFEREE"
                                onClick={newContactPerson}
                              >
                                <td
                                  colspan="7"
                                  class="bg-light  cursor-pointer"
                                >
                                  <span class="d-flex align-items-center ">
                                    <i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                    <span
                                      class="pl-5 "
                                      data-id="REFEREE"
                                      onClick={newContactPerson}
                                    >
                                      Add New
                                    </span>
                                  </span>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="step-cont d-none">
                    <h3>Student Enrollment</h3>
                    <section>
                      <div className="row clone-cont">
                        <div className="col-12 clone-me">
                          <div className="row ">
                            <div className="table-responsive table-responsive-md mb-4">
                              <table className="table table-editable-date align-middle table-edits">
                                <thead className="table-light">
                                  <tr className="text-uppercase table-dark">
                                    <th>#</th>
                                    <th>Faculty</th>
                                    <th className="">Course</th>
                                    {/* <th>Unit Condition</th> */}
                                    {/* <th className="">Rent</th>
                                    <th className="">Deposit</th> */}
                                    <th className="">Start Date</th>
                                    {/* <th className="">Renewal Months</th> */}
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tenancyDTOS.length > 0 &&
                                    tenancyDTOS.map((dependent, index) => (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{dependent.premiseName}</td>
                                        <td>{dependent.unitName}</td>
                                        {/* <td>{dependent.unitCondition}</td> */}
                                        <td>
                                          {moment(dependent.startDate).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </td>
                                        {/* <td>
                                            {dependent.monthsToTenancyRenewal}
                                          </td> */}
                                        <td></td>
                                      </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                  <tr
                                    className=""
                                    onClick={toogleShowAssignUnits}
                                  >
                                    <td
                                      colspan="7"
                                      class="bg-light  cursor-pointer"
                                    >
                                      <span class="d-flex align-items-center ">
                                        <i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                        <span class="pl-5 ">
                                          Enroll Student
                                        </span>
                                      </span>
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="step-cont d-none">
                    <h3> Document attachments</h3>
                    <section>
                      <div className="table-responsive table-responsive-md ">
                        <table className="table table-editable-file align-middle table-edits ">
                          <thead className="table-light ">
                            <tr className="text-uppercase table-dark ">
                              <th className="vertical-align-middle ">#</th>
                              <th className="vertical-align-middle ">
                                Document Type
                              </th>
                              <th className="vertical-align-middle ">
                                Document Name
                              </th>
                              <th className="vertical-align-middle ">
                                Actions
                              </th>
                              <th className="text-right "></th>
                            </tr>
                          </thead>
                          <tbody>
                            {tenantDocuments &&
                              tenantDocuments.map((dependent, index) => (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{dependent.documentOwnerTypeName}</td>
                                  <td>{dependent.docName}</td>
                                  <td></td>
                                </tr>
                              ))}
                          </tbody>
                          <tfoot>
                            <tr
                              className=""
                              data-id="TENANT"
                              onClick={newDocument}
                            >
                              <td colspan="7" class="bg-light  cursor-pointer">
                                <span class="d-flex align-items-center ">
                                  <i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                  <span class="pl-5 ">
                                    Add Student Documents
                                  </span>
                                </span>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </section>
                  </div>

                  <div className="step-cont d-none d-flex justify-content-center">
                    <section className="col-sm-6">
                      <h3>Application Fee Payment</h3>
                      <div className="row clone-cont">
                        <div className="col-12 clone-me">
                          <div className="row ">
                            <div className="col-12">
                              <div className="py-2 mt-3"></div>
                            </div>
                            <div className="col-12">
                              <div className="table-responsive">
                                <table className="table table-nowrap">
                                  <thead>
                                    <tr>
                                      <th style={{ width: "70px" }}>No.</th>
                                      <th>Item</th>
                                      <th>Quantity</th>
                                      <th>Unit Cost</th>
                                      <th className="text-end">Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>01</td>
                                      <td>
                                        {activeInvoice?.applicableChargeName}
                                      </td>
                                      <td>
                                        {formatCurrency.format(
                                          activeInvoice.quantity
                                        )}
                                      </td>
                                      <td>
                                        {formatCurrency.format(
                                          activeInvoice?.unitCost
                                        )}
                                      </td>
                                      <td className="text-end">
                                        KES.{" "}
                                        {formatCurrency.format(
                                          activeInvoice?.billAmount
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td colSpan="2" className="text-end">
                                        Total
                                      </td>
                                      <td className="text-end fw-bold">
                                        {formatCurrency.format(
                                          activeInvoice?.billAmount
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td colSpan="2" className="text-end">
                                        Paid
                                      </td>
                                      <td className="text-end  fw-bold">
                                        {formatCurrency.format(
                                          activeInvoice?.billPaidAmount
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td
                                        colSpan="2"
                                        className="border-0 text-end"
                                      >
                                        <strong>Balance</strong>
                                      </td>
                                      <td className="border-0 text-end">
                                        <h5 className="m-0 text-uppercase fw-bold">
                                          {" "}
                                          {formatCurrency.format(
                                            activeInvoice?.billAmount -
                                              activeInvoice?.billPaidAmount
                                          )}
                                        </h5>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div className="col-12">
                                  <div className="table-resposive p-4 px-2 pt-2 overflow-visible">
                                    <form onSubmit={sendSTK}>
                                      <table className="w-100">
                                        <tbody>
                                          <tr data-id="1">
                                            <td>
                                              <label htmlFor="" className="">
                                                Payment Method
                                              </label>
                                              <select
                                                className="form-control"
                                                title="Select payment Method"
                                                disabled={true}
                                              >
                                                <option value="Mpesa">
                                                  MPESA
                                                </option>
                                                <option value="Cash">
                                                  CASH
                                                </option>
                                              </select>
                                            </td>
                                            <td className="px-3 ">
                                              <div className="phone-num">
                                                <label htmlFor="">
                                                  Phone No.
                                                </label>
                                                <input
                                                  className="form-control w-100 d-flex"
                                                  spellCheck="false"
                                                  onChange={(event) =>
                                                    setphonenumber(
                                                      event.target.value
                                                    )
                                                  }
                                                  data-ms-editor="true"
                                                  type="tel"
                                                  id="phone"
                                                  name="phone"
                                                  placeholder="07XXXXXXXX"
                                                  pattern="[0]{1}[0-9]{9}"
                                                  required={true}
                                                />
                                              </div>
                                            </td>
                                            {/*<td className="px-3">*/}
                                            {/*  <label htmlFor="">Amount To Be Paid</label>*/}
                                            {/*  <input*/}
                                            {/*      type="text "*/}
                                            {/*      className="form-control w-100 d-flex"*/}
                                            {/*      placeholder="KES"*/}
                                            {/*      spellCheck="false"*/}
                                            {/*      data-ms-editor="true"*/}
                                            {/*  />*/}
                                            {/*</td>*/}
                                            <td className="text-right float-right">
                                              <div className="d-flex flex-column">
                                                <label className="opacity-0">
                                                  Something
                                                </label>
                                                <button
                                                  type="submit"
                                                  className="btn btn-primary w-md waves-effect waves-light"
                                                >
                                                  Submit
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <br />
                                      {error.color !== "" && (
                                        <div
                                          className={
                                            "alert alert-" + error.color
                                          }
                                          role="alert"
                                        >
                                          {error.message}
                                        </div>
                                      )}
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="step-cont d-none d-flex justify-content-center">
                    <section className="col-sm-6">
                      <h3>Confirm Detail</h3>
                      <div className="row clone-cont">
                        <div className="col-12 clone-me">
                          <div className="row "></div>
                        </div>
                      </div>
                    </section>
                  </div>
                </form>
                {/* the buttons container */}
                <div className="button-navigators">
                  <button
                    disabled
                    className="btn btn-primary waves-effect kev-prev me-3"
                  >
                    <i className="mdi-arrow-left mdi font-16px ms-2 me-2"></i>{" "}
                    Previous{" "}
                  </button>
                  <button
                    className="btn btn-primary waves-effect kev-nxt me-3"
                    disabled={!isIdFilled}
                  >
                    Next{" "}
                    <i className="mdi mdi-arrow-right font-16px ms-2 me-2"></i>
                  </button>
                  <button
                    type="submit"
                    form={"tenant-form"}
                    className="btn btn-success kev-submit me-3 d-none"
                  >
                    Submit <i className="mdi mdi-check-all me-2 font-16px"></i>
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-success d-none"
                onClick={submit}
              >
                SUBMIT
              </button>

              <Modal show={showWork}>
                <form id="newContactPersonForm" onSubmit={addContactPersonData}>
                  <ModalHeader className="justify-content">
                    <h3>Add Employment History</h3>
                    <span onClick={toogleshowWork}>X</span>
                  </ModalHeader>
                  <ModalBody className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="mb-12">
                        <label htmlFor="basicpill-firstname-input">
                          Employer <strong className="text-danger">*</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basicpill-firstname-input"
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="firstName"
                          placeholder=" Employer Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="mb-12">
                        <label htmlFor="basicpill-lastname-input">
                          Workstation / Department{" "}
                          <strong className="text-danger">*</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basicpill-lastname-input"
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="lastName"
                          placeholder=" Enter department"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="mb-12">
                        <label htmlFor="">Position</label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          placeholder="Enter position"
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="otherName"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">From (Year) </label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          placeholder="from"
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="phoneNumber1"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">To (Year)</label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          placeholder="To"
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="relationship"
                          required
                        />
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      className="btn btn-basic"
                      type="button"
                      onClick={toogleshowWork}
                    >
                      Close
                    </button>
                    <button className="btn btn-success" type="submit">
                      Add Employment History
                    </button>
                  </ModalFooter>
                </form>
              </Modal>

              {/* next of kins modal */}
              <Modal show={showKins}>
                <form id="newContactPersonForm" onSubmit={addContactPersonData}>
                  <ModalHeader className="justify-content">
                    <h3>Add Next of Kin</h3>
                    <span onClick={toogleshowKins}>X</span>
                  </ModalHeader>
                  <ModalBody className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="basicpill-firstname-input">
                          FirstName <strong className="text-danger">*</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basicpill-firstname-input"
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="firstName"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="basicpill-lastname-input">
                          LastName <strong className="text-danger">*</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basicpill-lastname-input"
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="lastName"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">OtherName</label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="otherName"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">Phone Number </label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="phoneNumber1"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">RelationShip</label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="relationship"
                          required
                        />
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      className="btn btn-basic"
                      type="button"
                      onClick={toogleshowKins}
                    >
                      Close
                    </button>
                    <button className="btn btn-success" type="submit">
                      Add Next of Kin
                    </button>
                  </ModalFooter>
                </form>
              </Modal>

              {/* toogleshowEducation */}
              <Modal show={showEducation}>
                <form id="newContactPersonForm" onSubmit={addContactPersonData}>
                  <ModalHeader className="justify-content">
                    <h3>Add Education History</h3>
                    <span onClick={toogleshowEducation}>X</span>
                  </ModalHeader>
                  <ModalBody className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="mb-12">
                        <label htmlFor="basicpill-firstname-input">
                          School name <strong className="text-danger">*</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basicpill-firstname-input"
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="firstName"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="mb-12">
                        <label htmlFor="basicpill-lastname-input">
                          Discipline <strong className="text-danger">*</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="basicpill-lastname-input"
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="lastName"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="mb-6">
                        <label htmlFor="">From (Year)</label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="otherName"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="mb-6">
                        <label htmlFor="">To (Year) </label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="phoneNumber1"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="mb-6">
                        <label htmlFor="">Grade / Qualification</label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          onChange={(e) => handleContactPersonBodyChange(e)}
                          name="relationship"
                          required
                        />
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      className="btn btn-basic"
                      type="button"
                      onClick={toogleshowEducation}
                    >
                      Close
                    </button>
                    <button className="btn btn-success" type="submit">
                      Add
                    </button>
                  </ModalFooter>
                </form>
              </Modal>
              {/*  */}

              <Modal show={showAssignUnits}>
                <form id="newContactPersonForm">
                  <ModalHeader className="justify-content">
                    <h3>Enroll a Student</h3>
                    <span onClick={toogleShowAssignUnits}>X</span>
                  </ModalHeader>
                  <ModalBody className="row">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="basicpill-lastname-input">
                          Unit <strong className="text-danger">*</strong>
                        </label>
                        <select
                          className="form-control"
                          onChange={handleAssignmentChange}
                          name="premiseUnitId"
                          required
                        >
                          <option></option>
                          {units &&
                            units.map((prem, index) => (
                              <option value={prem.id + ":" + prem.unitName}>
                                {prem.unitName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      className="btn btn-basic"
                      type="button"
                      onClick={toogleShowAssignUnits}
                    >
                      Close
                    </button>
                    <button className="btn btn-success" type="submit">
                      Add
                    </button>
                  </ModalFooter>
                </form>
              </Modal>

              <Modal show={showDocumentModal}>
                <ModalHeader className="justify-content">
                  <h3>New {docBody.documentOwnerTypeName} Document</h3>
                  <span onClick={toogleShowNewDocumentModal}>X</span>
                </ModalHeader>
                <ModalBody>
                  <form id="newContactPersonForm" className="row">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="basicpill-firstname-input">
                          Document Type
                          <strong className="text-danger">*</strong>
                        </label>

                        <select
                          className="form-control"
                          onChange={handleDocumentChange}
                          name="documentTypeId"
                          required
                        >
                          <option></option>
                          {documentTypes &&
                            documentTypes.map((prem, index) => (
                              <option value={prem.id}>{prem.name}</option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">Doc Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          placeholder=""
                          onChange={(e) => handleDocumentChange(e)}
                          name="docName"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label
                        className="input-group-text bg-info text-white cursor-pointer"
                        htmlFor="id-front"
                      >
                        <i className="font-14px mdi mdi-paperclip"></i> Document
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        name="file"
                        onChange={(e) => handleDocumentChange(e)}
                        required
                      />
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <button
                    className="btn btn-basic"
                    type="button"
                    onClick={toogleShowNewDocumentModal}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={addDocument}
                  >
                    Add
                  </button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterTenant;
