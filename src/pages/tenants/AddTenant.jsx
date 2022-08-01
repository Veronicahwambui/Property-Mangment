/* global $ */
import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import authService from '../../services/auth.service';
import requestsServiceService from '../../services/requestsService.service';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";



function AddTenant() {
  // forceupdate()

  //  the stepper form jquerry
  // include("./assets/js/pages/table-editable.int.js")
  // $("#basic-example").steps({ 
  //   headerTag: "h3", bodyTag: "section", transitionEffect: "slide" 
  // })
  //  the stepper form jquerry


  const [showNewContactPeronModal, setShowNewContactPeronModal] = useState(false)
  const [showAssignUnits, setShowAssignUnits] = useState(false)
  const [showDocumentModal, setShowDocumentModal] = useState(false)


  const [premises, setPremises] = useState([])
  const [units, setUnits] = useState([])
  const [documentTypes, setDocumentTypes] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
    getAllPremises();
    getAllDocumentTypes()
  }, [])

  const getAllPremises = () => {
    requestsServiceService.allPremises().then((res) =>
      setPremises(res.data.data)
    )
  }
  const getAllDocumentTypes = () => {
    requestsServiceService.allDocumentTypes().then((res) =>
      setDocumentTypes(res.data.data)
    )
  }

  const onPremiseChange = (event) => {

    let vals = event.target.value.split(':');

    requestsServiceService.findVacatPremise(vals[0]).then((res) =>
      setUnits(res.data.data)
    )

    setTenancyBody({ ...tenancyBody, "premise": vals[0] });
    setTenancyBody({ ...tenancyBody, "premiseName": vals[1] });
  }

  const [tenantDocuments, setTenantDocuments] = useState([])
  const [docBody, setDocBody] = useState({
    "docName": undefined,
    "document": undefined,
    "documentOwnerTypeName": undefined,
    "documentTypeId": undefined,
    "id": undefined,
    "ownerEntityId": undefined
  })
  const tenancyChargeBody = {
    "active": true,
    "premiseUnitTypeChargeId": undefined,
    "value": undefined
  }


  const updateDoB = (date) => {

    setTenantDto({ ...tenantDto, "dob": moment(date.target.value).format("YYYY-MM-DD") });

  }

  const updateCompanyDateOfRegistration = (date) => {



    setTenantDto({ ...tenantDto, "companyDateOfRegistration": moment(date.target.value).format("YYYY-MM-DD") });

  }

  $(document).on("change", ".startdate", updateCompanyDateOfRegistration);
  $(document).on("change", ".enddate", updateDoB);

  const [tenancyDTOS, setTenancyDTOS] = useState([]);
  const [tenantKins, setTenantKins] = useState([])
  const [tenantReferees, setTenantReferees] = useState([])
  const [tenantDependents, setTenantDependents] = useState([])
  const [tenantRoommates, setTenantRoommates] = useState([])

  const [contactPersonBody, setContactPersonBody] = useState({
    "active": true,
    "contactPersonTypeName": undefined,
    "firstName": undefined,
    "id": undefined,
    "lastName": undefined,
    "otherName": undefined,
    "phoneNumber1": undefined,
    "phoneNumber2": undefined,
    "relationship": undefined,
    "tenantId": undefined
  }
  )

  const [tenancyBody, setTenancyBody] = useState(
    {
      "active": true,
      "id": undefined,
      "monthsToTenancyRenewal": undefined,
      "premiseUnitId": undefined,
      "startDate": undefined,
      "tenancyCharges": [],
      "tenancyDocuments": [],
      "tenancyStatusName": "CURRENT",
      "tenantId": undefined,
      "unitCondition": undefined
    }
  )

  const addTenancy = () => {
    let bod = tenancyBody;
    let tenant = []; tenant.push(bod);
    setTenancyDTOS(tenant);
    toogleShowAssignUnits();
  }


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
      "docName": undefined,
      "document": undefined,
      "documentOwnerTypeName": undefined,
      "documentTypeId": undefined,
      "id": undefined,
      "ownerEntityId": undefined
    });

  }

  const addContactPersonData = () => {
    let data = contactPersonBody;
    if (data.contactPersonTypeName === "NEXT_OF_KIN") {
      let kins = tenantKins;
      kins.push(data);
      setTenantKins(kins);
    } else if (data.contactPersonTypeName === "DEPENDANT") {

      let kins = tenantDependents;
      kins.push(data);
      setTenantDependents(kins);
    } else if (data.contactPersonTypeName === "REFEREE") {

      let kins = tenantReferees;
      kins.push(data);
      setTenantReferees(kins);
    } else if (data.contactPersonTypeName === "ROOMMATE") {

      let kins = tenantRoommates;
      kins.push(data);
      setTenantRoommates(kins);
    }
    toogleShowNewContactPeronModal();
    setContactPersonBody({
      "active": true,
      "contactPersonTypeName": undefined,
      "firstName": undefined,
      "id": undefined,
      "lastName": undefined,
      "otherName": undefined,
      "phoneNumber1": undefined,
      "phoneNumber2": undefined,
      "relationship": undefined,
      "tenantId": undefined
    });

  }


  const [tenantDto, setTenantDto] = useState({
    "active": true,
    "clientId": parseInt(authService.getClientId()),
    "companyAddress": undefined,
    "companyDateOfRegistration": undefined,
    "companyIncorporationNumber": undefined,
    "companyName": undefined,
    "dob": undefined,
    "email": undefined,
    "firstName": undefined,
    "gender": undefined,
    "id": undefined,
    "idNumber": undefined,
    "lastName": undefined,
    "maritalStatus": undefined,
    "nationality": undefined,
    "occupation": undefined,
    "otherName": undefined,
    "phoneNumber": undefined,
    "tenantTypeName": "INDIVIDUAL"
  });


  const submit = (event) => {
    event.preventDefault();

    let contacts = [];
    contacts.push.apply(contacts, tenantReferees);
    contacts.push.apply(contacts, tenantDependents);
    contacts.push.apply(contacts, tenantRoommates);
    contacts.push.apply(contacts, tenantKins);

    let dara = JSON.stringify({
      "tenancyDTOS": tenancyDTOS,
      "tenantContactPersons": contacts,
      "tenantDTO": tenantDto,
      "tenantDocuments": tenantDocuments
    })
    requestsServiceService.createTenant(dara).then((res) => {

      if (res.data.status == true) {
        confirmAlert({
          message: res.data.message,
          buttons: [{
            label: "OK",
            onClick: (e) => navigate("/alltenants", { replace: true })
          }
          ]
        })
      } else {
        confirmAlert({
          message: res.data.message,
          buttons: [{ label: "OK" }]
        })
      }
    }).catch((err) => {
      confirmAlert({
        message: err.data.message,
        buttons: [{ label: "OK" }]
      })
    })
  }


  const newContactPerson = (event) => {

    setContactPersonBody({ ...contactPersonBody, "contactPersonTypeName": event.target.dataset.id });
    toogleShowNewContactPeronModal();
  }


  const newDocument = (event) => {

    setDocBody({ ...docBody, "documentOwnerTypeName": event.target.dataset.id });

    toogleShowNewDocumentModal();
  }


  const toogleShowNewContactPeronModal = (event) => {
    setShowNewContactPeronModal(!showNewContactPeronModal);
  }

  const toogleShowNewDocumentModal = (event) => {
    setShowDocumentModal(!showDocumentModal);
  }

  const handleTenantDtoChange = (event) => {

    if (event.target.name === "tenantTypeName")
      setTenantDto({ ...tenantDto, [event.target.name]: event.target.value.toUpperCase() });
    else
      setTenantDto({ ...tenantDto, [event.target.name]: event.target.value });

  };

  const handleContactPersonBodyChange = (event) => {

    setContactPersonBody({ ...contactPersonBody, [event.target.name]: event.target.value });

  };

  const handleDocumentChange = (event) => {

    if (event.target.name === "file") {
      let filereader = new FileReader();

      filereader.readAsDataURL(event.target.files[0]);

      filereader.onload = function () {
        setDocBody({ ...docBody, document: filereader.result });
      };
      filereader.onerror = function (error) {
        console.log('Error: ', error);
      };

    }
    else
      setDocBody({ ...docBody, [event.target.name]: event.target.value });

  }
  useEffect(() => {
    console.log(docBody)
  }, [docBody])

  const handleidchange = (event) => {

    if (event.target.name === "file") {
      let filereader = new FileReader();

      filereader.readAsDataURL(event.target.files[0]);

      filereader.onload = function () {
        let data = {document: filereader.result, docName: "ID CARD FRONT", documentOwnerTypeName: "TENANT"}
        tenantDocuments.push(data);
        setDocBody({data});
      };
      filereader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }
  const handleidchange2 = (event) => {

    if (event.target.name === "file") {
      let filereader = new FileReader();

      filereader.readAsDataURL(event.target.files[0]);

      filereader.onload = function () {
        let data = {document: filereader.result, docName: "ID CARD BACK", documentOwnerTypeName: "TENANT"}
        tenantDocuments.push(data);
        setDocBody({data});
      };
      filereader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }


  }


  const handleAssignmentChange = (event) => {

    if (event.target.name === "premiseUnitId") {
      let vals = event.target.value.split(':');
      let bod = tenancyBody;
      bod["premiseUnitId"] = vals[0]
      bod["unitName"] = vals[1]
      setTenancyBody(bod);

    } else if (event.target.name === "startDate") {

      setTenancyBody({ ...tenancyBody, [event.target.name]: moment(event.target.value).format("YYYY-MM-DD") });
    }
    else
      setTenancyBody({ ...tenancyBody, [event.target.name]: event.target.value });

  };

  const toogleShowAssignUnits = () => {

    setShowAssignUnits(!showAssignUnits);
  }



  return (
    <div className="page-content">

      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18 text-capitalize">New Tenant</h4>

            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                <li className="breadcrumb-item"><a href="tenants.html">Tenants</a></li>
                <li className="breadcrumb-item active">Add Tenant</li>
              </ol>
            </div>

          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <p>Fill in the form correctly. Fields with an Asterisk <strong className="text-danger">*</strong> are mandatory fields.</p>
              {/* step form starts here */}
              <div id="kev-step-form">
                {/* step form navigation container */}
                <nav class="navbar navbar-expand-lg navbar-light bg-light">

                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <a className="nav-link active" href="#">1. Tenant Details <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">2. Kins, Referees & Dependents</a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="#">3. Unit Assignment</a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="#">4. Tenant Document attachments</a>
                      </li>

                    </ul>

                  </div>
                </nav>

                {/* navigation bar end */}




                <div className="step-cont active-step">
                  <h3>Tenant Details</h3>
                  <section>
                    <form>
                      <div className="col-12">
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <label className="form-label">Tenant type</label>
                            <select
                                onChange={handleTenantDtoChange}
                                name="tenantTypeName"
                                className="form-control"
                            >
                              <option value="individual" >Individual</option>
                              <option value="company">Company</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="input-group-text bg-info text-white cursor-pointer" htmlFor="id-front">
                            <i className="font-14px mdi mdi-paperclip"></i> ID FRONT
                          </label>
                          <input type="file" className="form-control" name="file"
                                 onChange={(e) => handleidchange(e)} />
                        </div>
                        <div className="col-lg-4">
                          <label className="input-group-text bg-info text-white cursor-pointer" htmlFor="id-front">
                            <i className="font-14px mdi mdi-paperclip"></i> ID BACK
                          </label>
                          <input type="file" className="form-control" name="file"
                                 onChange={(e) => handleidchange2(e)} />
                        </div>
                      </div>

                      {tenantDto.tenantTypeName === "COMPANY" ?
                        <div className="row">
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">Company Name<strong className="text-danger">*</strong></label>
                              <input type="text" className="form-control" id="" placeholder="Enter company's name" name="companyName"
                                onChange={(e) => handleTenantDtoChange(e)} />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">Certificate of incorporation<strong className="text-danger">*</strong></label>
                              <input type="text" className="form-control" id="basicpill-firstname-input" placeholder="Enter certificate No." name="companyIncorporationNumber"
                                onChange={(e) => handleTenantDtoChange(e)} />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">Company's location<strong className="text-danger">*</strong></label>
                              <input type="text" className="form-control" id="basicpill-firstname-input" placeholder="Enter physical address" name="companyAddress"
                                onChange={(e) => handleTenantDtoChange(e)} />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">Email. <strong className="text-danger">*</strong></label>
                              <input type="email" className="form-control" id="Enter tenants email address" placeholder="Enter property plot No." name="email"
                                onChange={(e) => handleTenantDtoChange(e)} />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">Phone. <strong className="text-danger">*</strong></label>
                              <input type="text" className="form-control" id="Enter tenants Phone Number" placeholder="Enter property plot No." name="phoneNumber"
                                onChange={(e) => handleTenantDtoChange(e)} />
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4 col-sm-12">
                            <div className="mb-4">
                              <label htmlFor="" className="">Date of Registration<strong className="text-danger">*</strong></label>
                              <div className="input-group" id="datepicker1">

                                <input type="text" className="form-control mouse-pointer startdate" placeholder="Select Date" name="companyDateOfRegistration"
                                  readOnly data-date-format="dd M, yyyy" data-date-container='#datepicker1' data-provide="datepicker" data-date-autoclose="true" />

                                <span className="input-group-text"><i className="mdi mdi-calendar"></i></span>
                              </div>
                            </div>
                          </div>
                        </div> :
                        <div className="row">
                          <div className="col-12">
                            <div className="row">
                              <div className="col-4">
                                <div className="row">
                                  <div className="col-12">
                                
                                  </div>


                                </div>
                              </div>

                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row">
                              <div className="col-lg-4 col-md-6">
                                <div className="mb-4">
                                  <label htmlFor="basicpill-firstname-input">ID Num/ PPT Num<strong className="text-danger">*</strong></label>
                                  <input type="text" className="form-control"
                                    onChange={(e) => handleTenantDtoChange(e)} id="basicpill-firstname-input" name='idNumber' placeholder="Enter Id no " />
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="row">
                                  <label htmlFor="" className="">Gender: <strong className="text-danger">*</strong></label>
                                  <div className="d-flex">
                                    <div className="form-check mb-3 pr-15px">
                                      <input className="form-check-input" type="radio" value="Male"
                                        onChange={(e) => handleTenantDtoChange(e)} name="gender" id="formRadios1" />
                                      <label className="form-check-label" htmlFor="formRadios1">
                                        Male
                                      </label>
                                    </div>
                                    <div className="form-check">
                                      <input className="form-check-input" type="radio" value="Female"
                                        onChange={(e) => handleTenantDtoChange(e)} name="gender" id="formRadios2" />
                                      <label className="form-check-label" htmlFor="formRadios2">
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
                              <label htmlFor="basicpill-firstname-input">First name <strong className="text-danger">*</strong></label>
                              <input type="text" className="form-control" id="basicpill-firstname-input"
                                onChange={(e) => handleTenantDtoChange(e)} name="firstName" placeholder="Enter Your First Name" />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-lastname-input">Last Name <strong className="text-danger">*</strong></label>
                              <input type="text" className="form-control" id="basicpill-lastname-input"
                                onChange={(e) => handleTenantDtoChange(e)} name="lastName" placeholder="Enter Your Last Name" />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="">Other Name(s)</label>
                              <input type="text" className="form-control" id="" placeholder="Enter Your Last Name"
                                onChange={(e) => handleTenantDtoChange(e)} name="otherName" />
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4 col-sm-12">
                            <div className="mb-4">
                              <label htmlFor="" className="">Date of Birth<strong className="text-danger">*</strong></label>
                              <div className="input-group" id="datepicker1">
                                <input type="text" className="form-control mouse-pointer enddate"
                                  name="dob" placeholder="Select Date" readOnly data-date-format="dd M, yyyy" data-date-container='#datepicker1' data-provide="datepicker" data-date-autoclose="true" />

                                <span className="input-group-text"><i className="mdi mdi-calendar"></i></span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-lastname-input">Nationality <strong className="text-danger">*</strong></label>
                              <select className="form-control" data-live-search="true" title="Select nationality"
                                onChange={(e) => handleTenantDtoChange(e)} name="nationality">

                                <option></option>
                                <option value="Kenya">Kenya</option>

                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-lastname-input">Marital Status <strong className="text-danger">*</strong></label>
                              <select className="form-control" data-live-search="true" title="Select Marital status"
                                onChange={(e) => handleTenantDtoChange(e)} name="maritalStatus">
                                <option></option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">Email. <strong className="text-danger">*</strong></label>
                              <input type="email" className="form-control" id="Enter tenants email address" placeholder="Enter property plot No."
                                onChange={(e) => handleTenantDtoChange(e)} name="email" />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">Phone. <strong className="text-danger">*</strong></label>
                              <input type="text" className="form-control" id="Enter tenants Phone Number" placeholder="Enter property plot No."
                                onChange={(e) => handleTenantDtoChange(e)} name="phoneNumber" />
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="basicpill-firstname-input">Occupation <strong className="text-danger">*</strong></label>
                              <select className="form-control " data-live-search="true" title="Select occupation"
                                onChange={(e) => handleTenantDtoChange(e)} name="occupation">
                                <option value="employed">Employed</option>
                                <option value="student">Student</option>
                                <option value="pension">Pension</option>
                                <option value="self employed">Self employed</option>
                                <option value="unemployed">Unemployed</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="row">
                              <label htmlFor="" className="">This tenant has a roommate? <strong className="text-danger">*</strong></label>
                              <div className="d-flex">
                                <div className="form-check mb-3 pr-15px">
                                  <input className="form-check-input" value="no" onChange={(e) => handleTenantDtoChange(e)} type="radio" name="roomamte" id="" />
                                  <label className="form-check-label" htmlFor="no-roomate">
                                    No
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" value="yes" onChange={(e) => handleTenantDtoChange(e)} type="radio" name="roomamte" id="" />
                                  <label className="form-check-label" htmlFor="roomate-yes">
                                    Yes
                                  </label>
                                </div>
                              </div>
                            </div>

                          </div>
                          {tenantDto.roomamte === "yes" &&
                            <div className="col-12">

                              <div className="row">

                                <div className="col-12">
                                  <div className="bg-primary border-2 bg-soft p-3 mb-4">
                                    <p className="fw-semibold mb-0 pb-0">Roommates</p>

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



                                      {
                                        tenantRoommates?.map((dependent, index) => (
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>{dependent.firstName}</td>
                                            <td>{dependent.otherName}</td>
                                            <td>{dependent.lastName}</td>
                                            <td>{dependent.relationship}</td>
                                            <td></td>
                                          </tr>
                                        ))
                                      }


                                    </tbody>
                                    <tfoot>
                                      <tr>
                                        <td colSpan="7" className="bg-light add-field-3 cursor-pinter ">
                                          <button type="button" data-id="ROOMMATE" onClick={newContactPerson}>Add New</button>

                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                              </div>

                            </div>
                          }

                        </div>
                      }
                    </form>
                  </section>
                </div>

                <div className="step-cont d-none">
                  <h3>Kins, Referees & Dependents</h3>
                  <section>
                    <form>
                      <div className="row">

                        <div className="col-12">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0">Referees</p>

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
                                ))
                              }


                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="7" className="bg-light add-field-3 cursor-pinter ">
                                  <button type="button" data-id="REFEREE" onClick={newContactPerson}>Add New</button>

                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>

                      <div className="row">

                        <div className="col-12">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0">Next of Kin details</p>

                          </div>
                        </div>


                        <div className="table-responsive table-responsive-md mb-4">
                          <table className="table table-editable-2 align-middle table-edits">
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


                              {tenantKins &&
                                tenantKins.map((dependent, index) => (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{dependent.firstName}</td>
                                    <td>{dependent.otherName}</td>
                                    <td>{dependent.lastName}</td>
                                    <td>{dependent.relationship}</td>
                                    <td></td>
                                  </tr>
                                ))
                              }


                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="7" className="bg-light add-field-2 cursor-pinter ">

                                  <button type="button" data-id="NEXT_OF_KIN" onClick={newContactPerson}>Add New</button>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0">Dependents details</p>

                          </div>
                        </div>
                        <div className="table-responsive table-responsive-md">
                          <table className="table table-editable-1 align-middle table-edits">
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
                                ))
                              }


                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="7" className="bg-light add-field-1 cursor-pointer">
                                  <button type="button" data-id="DEPENDANT" onClick={newContactPerson}>Add A Dependent</button>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                      </div>



                    </form>
                  </section>
                </div>

                <div className="step-cont d-none">
                  <h3>Unit assignment</h3>
                  <section>
                    <form>
                      <div className="row clone-cont">
                        <div className="col-12 clone-me">
                          <div className="row ">
                            <div className="table-responsive table-responsive-md mb-4">
                              <table className="table table-editable-date align-middle table-edits">
                                <thead className="table-light">
                                  <tr className="text-uppercase table-dark">
                                    <th>#</th>
                                    <th>Premises</th>
                                    <th className="">Unit No.</th>
                                    <th>Unit Condition</th>
                                    {/* <th className="">Rent</th>
                                    <th className="">Deposit</th> */}
                                    <th className="">Start Date</th>
                                    <th className="">Renewal Months</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>


                                  {tenancyDTOS &&
                                    tenancyDTOS.map((dependent, index) => (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{dependent.premiseName}</td>
                                        <td>{dependent.unitName}</td>
                                        <td>{dependent.unitCondition}</td>
                                        <td>{dependent.startDate}</td>
                                        <td>{dependent.monthsToTenancyRenewal}</td>
                                        <td></td>
                                      </tr>
                                    ))
                                  }

                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td colSpan="9">
                                      {tenancyDTOS.length < 1 &&
                                        <button type="button" onClick={toogleShowAssignUnits}>Add A Unit</button>

                                      }
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>

                              {tenancyDTOS.length > 0 &&

                                <section>
                                  Tenancy documents
                                  <div className="table-responsive table-responsive-md ">
                                    <table className="table table-editable-file align-middle table-edits ">
                                      <thead className="table-light ">
                                        <tr className="text-uppercase table-dark ">
                                          <th className="vertical-align-middle ">#</th>
                                          <th className="vertical-align-middle ">Document Type</th>
                                          <th className="vertical-align-middle ">Document Name</th>
                                          <th className="vertical-align-middle ">Actions</th>
                                          <th className="text-right "></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {tenancyDTOS[0].tenancyDocuments && tenancyDTOS[0].tenancyDocuments.map((dependent, index) => (
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>{dependent.documentOwnerTypeName}</td>
                                            <td>{dependent.docName}</td>
                                            <td></td>
                                          </tr>
                                        ))

                                        }

                                      </tbody>
                                      <tfoot>
                                        <tr>
                                          <td colSpan="7 " >
                                            <button type="button" data-id="TENANCY" onClick={newDocument}>Add Tenancy Documents</button>

                                          </td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                  </div>
                                </section>
                              }
                            </div>


                          </div>
                        </div>
                      </div>

                    </form>
                  </section>
                </div>

                <div className="step-cont d-none">
                  <h3>Tenant Document attachments</h3>
                  <section>
                    <div className="table-responsive table-responsive-md ">
                      <table className="table table-editable-file align-middle table-edits ">
                        <thead className="table-light ">
                          <tr className="text-uppercase table-dark ">
                            <th className="vertical-align-middle ">#</th>
                            <th className="vertical-align-middle ">Document Type</th>
                            <th className="vertical-align-middle ">Document Name</th>
                            <th className="vertical-align-middle ">Actions</th>
                            <th className="text-right "></th>
                          </tr>
                        </thead>
                        <tbody>
                          {tenantDocuments && tenantDocuments.map((dependent, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{dependent.documentOwnerTypeName}</td>
                              <td>{dependent.docName}</td>

                              <td></td>
                            </tr>
                          ))

                          }

                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="7 " >
                              <button type="button" data-id="TENANT" onClick={newDocument}>Add Tenant Documents</button>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </section>
                </div>


                {/* the buttons container */}
                <div className="button-navigators">
                  <button disabled className="btn btn-primary waves-effect kev-prev me-3"><i className="mdi-arrow-left mdi font-16px ms-2 me-2"></i> Previous </button>
                  <button className="btn btn-primary waves-effect kev-nxt me-3">Next <i className="mdi mdi-arrow-right font-16px ms-2 me-2"></i></button>
                  <button type='button' className="btn btn-success kev-submit me-3 d-none" onClick={submit}>Submit <i className="mdi mdi-check-all me-2 font-16px"></i></button>
                </div>

              </div>

              <button type='button' className='btn btn-success d-none' onClick={submit}>SUBMIT</button>

              <Modal show={showNewContactPeronModal}>
                <ModalHeader className='justify-content'>
                  <h3>Add a new {contactPersonBody.contactPersonTypeName}</h3>
                  <span onClick={toogleShowNewContactPeronModal}>X</span>
                </ModalHeader>
                <ModalBody>
                  <form id="newContactPersonForm" className='row'>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="basicpill-firstname-input">First name <strong className="text-danger">*</strong></label>
                        <input type="text" className="form-control" id="basicpill-firstname-input"
                          onChange={(e) => handleContactPersonBodyChange(e)} name="firstName" placeholder=" First Name" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="basicpill-lastname-input">Last Name <strong className="text-danger">*</strong></label>
                        <input type="text" className="form-control" id="basicpill-lastname-input"
                          onChange={(e) => handleContactPersonBodyChange(e)} name="lastName" placeholder=" Last Name" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">Other Name(s)</label>
                        <input type="text" className="form-control" id="" placeholder="Other Name"
                          onChange={(e) => handleContactPersonBodyChange(e)} name="otherName" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">Phone Number</label>
                        <input type="text" className="form-control" id="" placeholder="Other Name"
                          onChange={(e) => handleContactPersonBodyChange(e)} name="phoneNumber1" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">Relationship</label>
                        <input type="text" className="form-control" id="" placeholder="Other Name"
                          onChange={(e) => handleContactPersonBodyChange(e)} name="relationship" />
                      </div>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <button className='btn btn-basic' type="button" onClick={toogleShowNewContactPeronModal}>Close</button>
                  <button className='btn btn-success' type="button" onClick={addContactPersonData}>Add</button>
                </ModalFooter>
              </Modal>


              <Modal show={showAssignUnits}>
                <ModalHeader className='justify-content'>
                  <h3>Assign a Unit to the Tenant</h3>
                  <span onClick={toogleShowAssignUnits}>X</span>
                </ModalHeader>
                <ModalBody>
                  <form id="newContactPersonForm" className='row'>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="basicpill-firstname-input">Premises<strong className="text-danger">*</strong></label>

                        <select className='form-control' onChange={onPremiseChange} name="premise">
                          <option></option>
                          {premises?.map((prem, index) => <option value={prem.id + ':' + prem.premiseName}>{prem.premiseName}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="basicpill-lastname-input">Unit <strong className="text-danger">*</strong></label>
                        <select className='form-control' onChange={handleAssignmentChange} name="premiseUnitId">
                          <option></option>
                          {units && units.map((prem, index) => <option value={prem.id + ':' + prem.unitName}>{prem.unitName}</option>)}
                        </select>

                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">Unit Condition</label>
                        <input type="text" className="form-control" id="" placeholder=""
                          onChange={(e) => handleAssignmentChange(e)} name="unitCondition" />
                      </div>
                    </div>
                    <div className=" col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">Start Date</label>
                        <input type="text" className="form-control" id="" placeholder=""
                          onChange={(e) => handleAssignmentChange(e)} name="startDate" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">Months To Tenancy Renewal</label>
                        <input type="number" className="form-control" id="" placeholder=""
                          onChange={(e) => handleAssignmentChange(e)} name="monthsToTenancyRenewal" />
                      </div>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <button className='btn btn-basic' type="button" onClick={toogleShowAssignUnits}>Close</button>
                  <button className='btn btn-success' type="button" onClick={addTenancy}>Add</button>
                </ModalFooter>
              </Modal>


              <Modal show={showDocumentModal}>
                <ModalHeader className='justify-content'>
                  <h3>New {docBody.documentOwnerTypeName} Document</h3>
                  <span onClick={toogleShowNewDocumentModal}>X</span>
                </ModalHeader>
                <ModalBody>
                  <form id="newContactPersonForm" className='row'>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="basicpill-firstname-input">Document Type<strong className="text-danger">*</strong></label>

                        <select className='form-control' onChange={handleDocumentChange} name="documentTypeId">
                          <option></option>
                          {documentTypes && documentTypes.map((prem, index) => <option value={prem.id}>{prem.name}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="">Doc Name</label>
                        <input type="text" className="form-control" id="" placeholder=""
                          onChange={(e) => handleDocumentChange(e)} name="docName" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="input-group-text bg-info text-white cursor-pointer" htmlFor="id-front">
                        <i className="font-14px mdi mdi-paperclip"></i> Document
                      </label>
                      <input type="file" className="form-control" name="file"
                        onChange={(e) => handleDocumentChange(e)} />


                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <button className='btn btn-basic' type="button" onClick={toogleShowNewDocumentModal}>Close</button>
                  <button className='btn btn-success' type="button" onClick={addDocument}>Add</button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddTenant