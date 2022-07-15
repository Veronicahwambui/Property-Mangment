/* global $ */

import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { useEffect } from "react";
import requestsServiceService from "../../services/requestsService.service";
import { confirmAlert } from "react-confirm-alert";

function AddPremises() {
  const [landlordfileNumber, setLandlordfileNumber] = useState("");
  const [documentTypes, setDocumentTypes] = useState([]);
  const [applicableCharges, setApplicableCharges] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const [unitCharges, setUnitCharges] = useState([]);
  const [landLordAccounts, setLandLordAccounts] = useState([]);
  const [uniqueChargeId, setUniqueChargeIds] = useState([]);
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [newUnitTypeModal, setNewUnitTypeModal] = useState(false)
  const [showUnitTypeChargesModal, setShowUnitTypeChargesModal] = useState(false)

  const toogleShowUnitTypeChargesModal = () => {
    setShowUnitTypeChargesModal(!showUnitTypeChargesModal);
  }

  const saveLandLordFileNumber = () => {

    if (landlordfileNumber != "") {
      requestsServiceService.getLandLordByFileNumber(landlordfileNumber).then((res) => {

        setLandLordAccounts(res.data.data.accounts);

      }).catch((err) => {

      })



    }
  }


  const [general, setGeneral] = useState({
    "active": true,
    "address": undefined,
    "estateId": undefined,
    "fileNumber": undefined,
    "id": undefined,
    "landLordId": [],
    "landlordFileNumber": [],
    "plotNumber": undefined,
    "premiseName": undefined,
    "premiseTypeId": undefined,
    "premiseUseTypeId": undefined
  });

  const handleGeneral = (event) => {
    if (event.target.name === "estateId" ||
      event.target.name === "premiseTypeId" ||
      event.target.name === "premiseUseTypeId")
      setGeneral({ ...general, [event.target.name]: parseInt(event.target.value) });
    else
      setGeneral({ ...general, [event.target.name]: event.target.value });
  };


  const [caretaker, setCaretaker] = useState({
    idNumber: "",
    firstName: "",
    lastName: "",
    otherName: "",
    caretakerTypeName: "",
    gender: "",
    phone: "",
    email: "",
    active: true
  });


  const [premiseUnits, setPremiseUnits] = useState([])

  const [unit, setUnit] = useState({
    "active": true,
    "id": undefined,
    "premiseId": undefined,
    "unitName": undefined,
    "unitTypeId": undefined
  })

  const [selectedApplicableCharges, setSelectedApplicableCharges] = useState([]);

  const [selectedunitTypes, setSelectedUnitTypes] = useState([])

  const [unitType, setUnitType] = useState({
    "unitTypeName": undefined,
    "squarage": undefined,
    "unitTypeId": undefined,
    "monthCountForTenancyRenewal": undefined,
    "numberOfRooms": undefined,
    "purpose": undefined,
  })


  const [premiseUnitTypeCharges, setPremiseUnitTypeCharges] = useState([])

  const handleChargechange = (event, index) => {
    if (event.target.name === "charge") {
      let unitAppCharge = [];
      let chargee = selectedApplicableCharges.find(charge => charge.id === parseInt(event.target.value));
      for (var i = 0; i < selectedunitTypes.length; i++) {
        let chargeBody = {
          "active": true,
          "applicableChargeId": chargee.id,
          "chargeConstraint": "ZERO_BALANCE",
          "constraintChargeId": undefined,
          "id": undefined,
          "invoiceDay": undefined,

          "applicableChargeName": chargee.name,
          "applicableChargeType": chargee.applicableChargeType,

          "unitTypeName": selectedunitTypes[i].unitTypeName,
          "landlordCollectionAccountId": undefined,
          "monthCountForTenancyRenewal": selectedunitTypes[i].monthCountForTenancyRenewal,
          "numberOfRooms": selectedunitTypes[i].numberOfRooms,
          "premiseId": undefined,
          "purpose": selectedunitTypes[i].purpose,
          "rateCharge": undefined,
          "squarage": selectedunitTypes[i].squarage,
          "unitTypeId": selectedunitTypes[i].unitTypeId,
          "value": undefined
        }
        unitAppCharge.push(chargeBody);
      }

      setUnitCharges(unitAppCharge);
    } else {
      let unitAppCharge = unitCharges;
      unitAppCharge[index][event.target.name] = event.target.value;

      setUnitCharges(unitAppCharge);
    }
    console.log(unitCharges)
  };

  const handleUnitChange = (event) => {
    setUnit({ ...unit, [event.target.name]: event.target.value });
  };

  const handleUnitTypeChange = (event) => {
    if (event.target.name === "unitTypeId") {
      let d = event.target.value.split(':');
      let type = unitType;
      type.unitTypeId = d[0];
      type.unitTypeName = d[1];
      setUnitType({ ...unitType, type });
    } else
      setUnitType({ ...unitType, [event.target.name]: event.target.value });
  };

  const handleCaretaker = (event) => {
    setCaretaker({ ...caretaker, [event.target.name]: event.target.value });
  };

  const selectedApplicableChargeChange = (event) => {

    console.log(event.target.value);
    let chargess = selectedApplicableCharges;

    let value = applicableCharges.find(x => x.id == event.target.value);

    console.log(value)
    if (value != undefined) {

      if (event.target.checked)
        chargess.push(value);
      else
        chargess.splice(chargess.indexOf(value), 1);

      setSelectedApplicableCharges(chargess);

    }
  };


  const [estates, setEstates] = useState([])
  const getEstates = () => {
    requestsServiceService.getAllEstates().then((res) => {
      setEstates(res.data.data)
    })
  }

  const [premiseTypes, setPremiseTypes] = useState([])
  const getPremiseTypes = () => {
    requestsServiceService.allPremiseTypes().then((res) => {
      setPremiseTypes(res.data.data)
    })
  }

  const [premiseUseTypes, setPremiseUseTypes] = useState([])
  const getPremiseUseTypes = () => {
    requestsServiceService.allPremiseUseTypes().then((res) => {
      setPremiseUseTypes(res.data.data)
    })
  }

  const getAllDocumentTypes = () => {
    requestsServiceService.allDocumentTypes().then((res) =>
      setDocumentTypes(res.data.data)
    )
  }

  const getAllApplicableCharges = () => {
    requestsServiceService.allApplicableCharges().then((res) =>
      setApplicableCharges(res.data.data)
    )
  }

  const getAllUnitTypes = () => {
    requestsServiceService.allUnitTypes().then((res) =>
      setUnitTypes(res.data.data)
    )
  }

  const [premiseDocuments, setPremiseDocuments] = useState([])
  const [docBody, setDocBody] = useState({
    "docName": undefined,
    "document": undefined,
    "documentOwnerTypeName": undefined,
    "documentTypeId": undefined,
    "id": undefined,
    "ownerEntityId": undefined
  })

  useEffect(() => {
    getEstates()
    getPremiseTypes()
    getPremiseUseTypes()
    getAllDocumentTypes()
    getAllApplicableCharges()
    getAllUnitTypes()
  }, [])

  const toogleShowNewDocumentModal = (event) => {
    setShowDocumentModal(!showDocumentModal);
  }

  const toogleNewUnitTypeModal = (event) => {
    setNewUnitTypeModal(!newUnitTypeModal);
  }


  const addAppCharge = () => {
    let unicahgsg = unitCharges;
    let premiseUnitType = premiseUnitTypeCharges;

    for (var i = 0; i < unicahgsg.length; i++)
      premiseUnitType.push(unicahgsg[i]);



    let vals = premiseUnitType.map(cha => cha.applicableChargeId)

    setUniqueChargeIds(vals);

    setPremiseUnitTypeCharges(premiseUnitType);

    setUnitCharges([]);
    toogleShowUnitTypeChargesModal();
  }


  const addDocument = () => {
    let data = docBody;
    if (data.documentOwnerTypeName === "PREMISE") {

      let kins = premiseDocuments;
      kins.push(data);
      setPremiseDocuments(kins);

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

  const addUnitType = () => {
    let data = unitType;

    let kins = selectedunitTypes;
    kins.push(data);
    setSelectedUnitTypes(kins);

    toogleNewUnitTypeModal();
    setUnitType({
      "unitTypeName": undefined,
      "unitTypeId": undefined
    });

  }


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


  $("#landlord-type").on("change", function () {
    var theSeledtedValue = $(this).val();
    if (theSeledtedValue == "company") {
      $(".individual-landlord").removeClass("d-none").next().addClass("d-none");
    } else {
      $(".individual-landlord").addClass("d-none").next().removeClass("d-none");
    }
  });

  const submit = () => {
    let gen = general;
    gen.landlordFileNumber.push(landlordfileNumber)
    let data = {
      "premise": gen,
      "premiseCaretakerDTO": caretaker,
      "premiseDocuments": premiseDocuments,
      "premiseUnitTypeCharges": premiseUnitTypeCharges,
      "premiseUnits": premiseUnits
    }

    requestsServiceService.createPremise(data).then((res) => {

      if (res.data.status == true) {
        confirmAlert({
          message: res.data.message,
          buttons: [{
            label: "OK",
            onClick: (e) => window.location.href = "/premisesregister"
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
        message: err.message,
        buttons: [{ label: "OK" }]
      })
    })
  }

  const newUnitType = (event) => {
    toogleNewUnitTypeModal();
  }


  const newDocument = (event) => {

    setDocBody({ ...docBody, "documentOwnerTypeName": event.target.dataset.id });

    toogleShowNewDocumentModal();
  }


  return (
    <>
      <div className="page-content">
        <div className="content-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18 text-capitalize">
                  Premises Registration
                </h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="property-list.html">All Premies</a>
                    </li>
                    <li class="breadcrumb-item active">
                      Premises registration
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          {/* <!-- eTransactions table --> */}

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <p>
                    Fill in the form correctly. Fields with an Asterisk{" "}
                    <strong class="text-danger">*</strong> are mandatory fields.
                  </p>
                  <div className="create-property" id="basic">

                    {/* <!-- Premises details --> */}
                    <h3>Premises details</h3>
                    <section>
                      <form>
                        <div class="col-12">
                          <div class="bg-primary border-2 bg-soft p-3 mb-4">
                            <p class="fw-semibold mb-0 pb-0 text-uppercase">
                              General Information about the Premises
                            </p>
                          </div>
                        </div>
                        <div class="row mb-4">
                          <div class="col-2">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                File No.<strong class="text-danger ">*</strong>
                              </label>
                              <input
                                type="text "
                                value={general.fileNumber}
                                onChange={handleGeneral}
                                name="fileNumber"
                                class="form-control "
                                id="basicpill-firstname-input "
                                placeholder="Enter file No."
                              />
                            </div>
                          </div>
                          <div class="col-lg-2 col-md-2">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                Plot No. <strong class="text-danger ">*</strong>
                              </label>
                              <input
                                type="text "
                                value={general.plotNumber}
                                name='plotNumber'
                                onChange={handleGeneral}
                                class="form-control "
                                id="basicpill-firstname-input "
                                placeholder="Plot No."
                              />
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                Premises Name{" "}
                                <strong class="text-danger ">*</strong>
                              </label>
                              <input
                                type="text "
                                class="form-control "
                                value={general.premiseName}
                                onChange={handleGeneral}
                                name='premiseName'
                                id="basicpill-firstname-input "
                                placeholder="Enter Your First Name "
                              />
                            </div>
                          </div>

                          <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-lastname-input ">
                                Estate <strong class="text-danger ">*</strong>
                              </label>
                              <select
                                class="form-control "
                                title="Select estate "
                                name="estateId"
                                onChange={handleGeneral}
                              >
                                {estates.map((estate) => {
                                  return (
                                    <option value={estate.id} > {estate.name} - {estate.zone.name} - {estate.zone.clientCounty.name} </option>
                                  )
                                })}

                              </select>
                            </div>
                          </div>

                          <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-lastname-input ">
                                Premises Type{" "}
                                <strong class="text-danger ">*</strong>
                              </label>
                              <select
                                class="form-control "
                                title="Select Building type "
                                name='premiseTypeId'
                                onChange={handleGeneral}

                              >
                                {premiseTypes.map((type) => (
                                  <option value={type.id}> {type.name}</option>
                                ))}

                              </select>
                            </div>
                          </div>

                          <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-lastname-input ">
                                Property Use type
                                <strong class="text-danger ">*</strong>
                              </label>
                              <select
                                class="form-control "
                                title="Select Property use type "
                                name='premiseUseTypeId'
                                onChange={handleGeneral}

                              >
                                {premiseUseTypes.map((type) => (
                                  <option value={type.id}> {type.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                        </div>

                        <div class="col-12">
                          <div class="bg-primary border-2 bg-soft p-3 mb-4">
                            <p class="fw-semibold mb-0 pb-0 text-uppercase">
                              Caretaker details
                            </p>
                          </div>
                        </div>

                        {/* <!-- caretaker details --> */}
                        <div class="row">
                          <div class="col-lg-3 col-md-6 ">
                            <div class="mb-4 ">
                              <label for=" ">ID/PP Num.</label>
                              <input
                                type="text "
                                class="form-control "
                                id=""
                                value={caretaker.idNumber}
                                onChange={handleCaretaker}
                                name="idNumber"
                                placeholder="Enter ID or PP Num. "
                              />
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                First name{" "}
                                <strong class="text-danger ">*</strong>
                              </label>
                              <input
                                type="text "
                                class="form-control "
                                value={caretaker.firstName}
                                onChange={handleCaretaker}
                                name="firstName"
                                id="basicpill-firstname-input "
                                placeholder="Enter Your First Name "
                              />
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-lastname-input ">
                                Last Name{" "}
                                <strong class="text-danger ">*</strong>
                              </label>
                              <input
                                type="text "
                                class="form-control "
                                value={caretaker.lastName}
                                onChange={handleCaretaker}
                                name="lastName"
                                id="basicpill-lastname-input "
                                placeholder="Enter Your Last Name "
                              />
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-6 ">
                            <div class="mb-4 ">
                              <label for=" ">Other Name(s)</label>
                              <input
                                type="text "
                                class="form-control "
                                id=" "
                                onChange={handleCaretaker}
                                value={caretaker.otherName}
                                name="otherName"
                                placeholder="Enter Your Last Name "
                              />
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="row ">
                              <div class="col-lg-4 ">
                                <div class="row ">
                                  <div class="col-12 ">
                                    <div class="mb-4 ">
                                      <label for=" " class=" ">
                                        Caretaker type
                                        <strong class="text-danger ">*</strong>
                                      </label>
                                      <select
                                        onChange={handleCaretaker}
                                        class="form-control "
                                        name="caretakerTypeName"
                                        title="Select caretaker type"
                                      >
                                        <option value="SELF_COMMISSIONED">
                                          Commissioned by MCA
                                        </option>
                                        <option value="LANDLORD_COMMISSIONED">
                                          Brought by the landlord
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="col-12 ">
                                    <div class="row mb-3">
                                      <label for=" " class=" ">
                                        Gender:{" "}
                                        <strong class="text-danger ">*</strong>
                                      </label>
                                      <div class="d-flex ">
                                        <div class="form-check me-3">
                                          <input
                                            class="form-check-input"
                                            type="radio"
                                            onChange={handleCaretaker}
                                            name="gender"
                                            value="Male"
                                          />
                                          <label
                                            class="form-check-label"
                                            for="caretaker-male"
                                          >
                                            Male
                                          </label>
                                        </div>

                                        <div class="form-check me-3">
                                          <input
                                            onChange={handleCaretaker}
                                            class="form-check-input"
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                          />
                                          <label
                                            class="form-check-label"
                                            for="caretaker-female"
                                          >
                                            Female
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-8">
                                <div class="row ">
                                  <div class="col-lg-6 ">
                                    <div class="mb-4 ">
                                      <label for="basicpill-phoneno-input ">
                                        Phone{" "}
                                        <strong class="text-danger ">*</strong>
                                      </label>
                                      <input
                                        type="text "
                                        class="form-control "
                                        value={caretaker.phone}
                                        name="phone"
                                        onChange={handleCaretaker}

                                        id="basicpill-phoneno-input "
                                        placeholder="Enter Your Phone No. "
                                      />
                                    </div>
                                  </div>
                                  <div class="col-lg-6 ">
                                    <div class="mb-4 ">
                                      <label for="basicpill-email-input ">
                                        Email{" "}
                                        <strong class="text-danger ">*</strong>
                                      </label>
                                      <input
                                        type="email "
                                        class="form-control "
                                        onChange={handleCaretaker}
                                        name="email"
                                        value={caretaker.email}
                                        id="basicpill-email-input "
                                        placeholder="Enter Your Email ID "
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- caretaker details end --> */}

                        <div class="col-12">
                          <div class="bg-primary border-2 bg-soft p-3 mb-4">
                            <p class="fw-semibold mb-0 pb-0 text-uppercase">
                              Units/ Hse Types on offer At the premises
                            </p>
                          </div>
                        </div>
                        <div class="table-responsive table-responsive-md mb-5">
                          <table class="table table-editable-2 align-middle table-edits ">
                            <thead class="table-light">
                            <tr class="text-uppercase table-dark">
                              <th class="vertical-align-middle">#</th>
                              <th class="vertical-align-middle">
                                House type
                              </th>
                              <th class="vertical-align-middle">
                                No. of rooms
                              </th>
                              <th class="vertical-align-middle">
                                Unit size M <sup>2</sup>
                              </th>
                              <th class="vertical-align-middle">
                                Unit purpose
                              </th>
                              <th style={{ width: "295px" }}>
                                Tenancy Renewal
                                <button
                                  type="button"
                                  data-toggle="modal"
                                  data-target=".tenancy-renewal-help"
                                  class="btn btn-link btn-rounded waves-effect font-16px "
                                >
                                  <span class="mdi mdi-help-circle text-white"></span>
                                </button>
                              </th>
                              <th class="text-right"></th>
                            </tr>
                            </thead>
                            <tbody>

                            {selectedunitTypes.length > 0 && selectedunitTypes.map((dependent, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{dependent.unitTypeName}</td>
                                <td>{dependent.numberOfRooms}</td>
                                <td>{dependent.squarage}</td>
                                <td>{dependent.purpose}</td>
                                <td>{dependent.monthCountForTenancyRenewal}</td>
                                <td></td>
                              </tr>
                            ))

                            }

                            </tbody>
                            <tfoot>
                            <tr>
                              <td colSpan="7 ">
                                <button type="button" data-id="PREMISE" onClick={newUnitType}>Add A Unit Type</button>
                              </td>
                            </tr>
                            </tfoot>
                          </table>
                        </div>

                        <div class="col-12">
                          <div class="bg-primary border-2 bg-soft p-3 mb-4">
                            <p class="fw-semibold mb-0 pb-0 text-uppercase">
                              Applicable charges for this premises
                            </p>
                          </div>
                          <p class="d-none">
                            <strong>
                              Check the correct charges that may be charged from
                              tenants at this premises
                            </strong>
                          </p>
                        </div>
                        <div class="col-12 mb-5">
                          <div class="row">
                            <div class="col-4 col-md-5 col-sm-12 h-100">
                              <p class="text-decoration-underline">
                                <i>Applicable Charges</i>
                              </p>
                              <div class="row border-right-1">
                                {applicableCharges.length > 0 && applicableCharges.map((charge, index) => (
                                  <>
                                    {charge.applicableChargeType === "MONTHLY_CHARGE" &&
                                    <div class="col-6">
                                      <div class="form-check form-check-primary mb-3">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          name="monthlyCharges"
                                          value={charge.id}
                                          onChange={selectedApplicableChargeChange}
                                        />
                                        <label
                                          class="form-check-label"
                                          for="monthlyRent"
                                        >
                                          {charge.name}
                                        </label>
                                      </div>
                                    </div>
                                    }
                                  </>
                                ))
                                }
                              </div>
                            </div>
                            <div class="col-4 col-md-4 col-sm-12 h-100">
                              <p class="text-decoration-underline">
                                <i>Deposits</i>
                              </p>
                              <div class="row border-right-1">
                                {applicableCharges.length > 0 && applicableCharges.map((charge, index) => (
                                  <>
                                    {charge.applicableChargeType === "DEPOSIT_CHARGE" && <div class="col-6">
                                      <div class="form-check form-check-primary mb-3">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          name="monthlyRent"
                                          value={charge.id}
                                          onChange={selectedApplicableChargeChange}
                                        />
                                        <label
                                          class="form-check-label"
                                          for="monthlyRent"
                                        >
                                          {charge.name}
                                        </label>
                                      </div>
                                    </div>}
                                  </>
                                ))
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </section>

                    {/* <!-- premises invoice breakdown --> */}
                    <h3>Invoices breakdown</h3>
                    <section>
                      <div class="row justify-content-center">
                        <div class="col-12">
                          <div class="table-responsive">
                            <table
                              class="table align-middle table-edits rent-invoicing dt-responsive"
                              id="data-table"
                            >
                              <thead>
                              <tr class="text-uppercase table-light">
                                <th>#</th>
                                <th>Item type</th>
                                <th>When to Charge</th>
                                <th>Unit Type</th>
                                <th>Charge Value</th>
                              </tr>
                              </thead>

                              <tfoot class="table-light">
                              <tr >

                                <button type="button" onClick={toogleShowUnitTypeChargesModal}>Add Charges</button>
                              </tr>
                              </tfoot>
                              <tbody>
                              {/* {premiseUnitTypeCharges.length > 0 && selectedApplicableCharges.map((charge, indweex) => (
                                  <>{uniqueChargeId.map((id, indeex) => (
                                    <>
                                      {charge.id == id &&
                                        <tr>
                                          <td>{indeex + 1}</td>

                                          <td>
                                            {charge.name}
                                          </td>

                                          <td>
                                            {charge.applicableChargeType}
                                          </td>

                                          {selectedunitTypes.map((selectedUnitType, indeexw) => (
                                            <>

                                              {premiseUnitTypeCharges.map((premiseUnitTypeCharge, indeewx) => (
                                                <>
                                                  {selectedUnitType.unitTypeName === premiseUnitTypeCharge.unitTypeName && premiseUnitTypeCharge.applicableChargeId == id &&
                                                    <td>
                                                      {premiseUnitTypeCharge.value}
                                                    </td>
                                                  }
                                                </>
                                              ))}

                                            </>
                                          ))}

                                        </tr>
                                      }
                                    </>
                                  ))
                                  }
                                  </>
                                ))

                                } */}

                              {premiseUnitTypeCharges.map((premiseUnitTypeCharge, indeewx) => (
                                <tr>
                                  <td>
                                    {indeewx + 1}
                                  </td>
                                  <td>
                                    {premiseUnitTypeCharge.applicableChargeName}
                                  </td>
                                  <td>
                                    {premiseUnitTypeCharge.applicableChargeType}
                                  </td>
                                  <td>
                                    {premiseUnitTypeCharge.unitTypeName}
                                  </td>
                                  <td>
                                    {premiseUnitTypeCharge.value}
                                  </td>
                                </tr>
                              ))}

                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* <!-- Document attachments --> */}
                    <h3>Document Attachments</h3>
                    <section>
                      <form>
                        <h6>
                          Upload documents
                        </h6>
                        <div class="table-responsive table-responsive-md">
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

                            {premiseDocuments.length > 0 && premiseDocuments.map((dependent, index) => (
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
                              <td colSpan="7">
                                <button type="button" data-id="PREMISE" onClick={newDocument}>Add Premise Documents</button>
                              </td>
                            </tr>
                            </tfoot>
                          </table>

                        </div>
                      </form>
                    </section>
                  </div>
                </div>

                <button type='button' className='btn btn-success' onClick={submit}>SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal show={newUnitTypeModal}>
        <ModalHeader className='justify-content'>
          <h3>New Unit Type</h3>
          <span onClick={toogleNewUnitTypeModal}>X</span>
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <label htmlFor="basicpill-firstname-input">Unit Type<strong className="text-danger">*</strong></label>

                  <select
                    className='form-control'
                    onChange={handleUnitTypeChange}
                    name="unitTypeId">
                    <option></option>
                    {unitTypes.length > 0 && unitTypes.map((prem, index) =>
                      <option value={prem.id + ':' + prem.name}>{prem.name}</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-4">
                  <label htmlFor="">No. Of Rooms</label>
                  <input type="number" className="form-control"
                         onChange={handleUnitTypeChange} name="numberOfRooms" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-4">
                  <label htmlFor="">UNIT SIZE M<sup>2</sup></label>
                  <input type="number" className="form-control"
                         onChange={handleUnitTypeChange} name="squarage" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-4">
                  <label htmlFor="">Purpose</label>
                  <input type="text" className="form-control"
                         onChange={handleUnitTypeChange} name="purpose" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <label htmlFor="">TENANCY RENEWAL</label>
                  <input type="number" className="form-control"
                         onChange={handleUnitTypeChange} name="monthCountForTenancyRenewal" />
                </div>
              </div>
            </div>

          </form>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-basic' type="button" onClick={toogleNewUnitTypeModal}>Close</button>
          <button className='btn btn-success' type="button" onClick={addUnitType}>Add</button>
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
                  {documentTypes.length > 0 && documentTypes.map((prem, index) => <option value={prem.id}>{prem.name}</option>)}
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



      <Modal show={showUnitTypeChargesModal}>
        <ModalHeader className='justify-content'>
          <h3>Invoice Breakdown</h3>
          <span onClick={toogleShowUnitTypeChargesModal}>X</span>
        </ModalHeader>
        <ModalBody>
          <form id="newContactPersonForm" className='row'>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="basicpill-firstname-input">Applicable Charge Type<strong className="text-danger">*</strong></label>

                <select className='form-control' onChange={(e) => handleChargechange(e, 0)} name="charge">
                  <option></option>
                  {selectedApplicableCharges.length > 0 && selectedApplicableCharges.map((prem, index) => <option value={prem.id}>{prem.name}</option>)}
                </select>
              </div>
            </div>
            <hr></hr>
            <h3>Charge Values</h3>

            {unitCharges.length > 0 && unitCharges.map((unitCharge, index) => (<>
                <div className="col-md-6">
                  <label htmlFor="">Unit Type</label>
                  <input type="text" className="form-control" id="" placeholder=""
                         disabled value={unitCharge.unitTypeName} name="docName" />
                </div>

                <div className="col-md-6">
                  <label> Charge Value </label>
                  <input type="number" className="form-control" name="value"
                         onChange={(e) => handleChargechange(e, index)} />
                </div>

                <div className="col-md-6">
                  <label> Collection Acc </label>
                  <select className='form-control' onChange={(e) => handleChargechange(e, 0)} name="landlordCollectionAccountId">
                    <option></option>
                    {landLordAccounts.length > 0 && landLordAccounts.map((prem, index) => <option value={prem.id}>{prem.bankAccountNumber + ' - ' + prem.bank.bankName}</option>)}
                  </select>
                </div>

                <div className="col-md-6">
                  <label> Invoice Day </label>
                  <input type="number" className="form-control" name="invoiceDay"
                         onChange={(e) => handleChargechange(e, index)} />
                </div>

              </>
            ))
            }
          </form>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-basic' type="button" onClick={toogleShowUnitTypeChargesModal}>Close</button>
          <button className='btn btn-success' type="button" onClick={addAppCharge}>Add</button>
        </ModalFooter>
      </Modal>

      {/* <!-- enter landlord's id modal --> */}

      <Modal show={landLordAccounts.length < 1}>
        <ModalBody>
          <div class="row justify-content-center ">
            <div class="col-xl-10 ">
              <h4 class="text-primary ">Landlord's File No.</h4>
              <p class="text-muted font-size-14 mb-4 ">
                Enter the landlords file number if the landlord is already
                registered in the system. If this is a new landlord, click
                cancel.
              </p>

              <form onSubmit={(e) => e.preventDefault()}>
                <div class="row ">
                  <div class="col-9">
                    <div class="mb-3 ">
                      <label for="digit1-input " class="visually-hidden ">
                        File No.
                      </label>
                      <input
                        type="text "
                        class="form-control form-control-lg text-center two-step "
                        placeholder="Enter file No."
                        value={landlordfileNumber}
                        onChange={(e) =>
                          setLandlordfileNumber(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div class="col-3 ">
                    <button
                      data-bs-dismiss="modal"
                      class="btn btn-primary btn-block w-100 btn-lg"
                      onClick={saveLandLordFileNumber}
                    >
                      <i class="bx bx-search-alt-2 font-size-16 align-middle me-2 "></i>
                      <div class="d-none">Search</div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <!-- end of ID modal --> */}
    </>
  );
}

export default AddPremises;