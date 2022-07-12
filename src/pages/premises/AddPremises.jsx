/* global $ */

import React, { useState } from "react";
import { useEffect } from "react";
import requestsServiceService from "../../services/requestsService.service";

function AddPremises() {
  const [landlordFileNo, setLandlordFileNo] = useState("");

  const [general, setGeneral] = useState({
    fileNo: "",
    plotNo: "",
    premiseName: "",
    estate: "",
    premiseType: "",
    premiseUseType: "",
    registrationDate: "",
  });
 
  const handleGeneral = (event) => {
    setGeneral({ ...general, [event.target.name]: event.target.value });
  };


  const [caretaker, setCaretaker] = useState({
    idNo: "",
    firstName: "",
    lastName: "",
    otherName: "",
    caretakerType: "",
    gender: "",
    phone: "",
    email: "",
  });

  const handleCaretaker = (event) => {
    setCaretaker({ ...caretaker, [event.target.name]: event.target.value });
  };

  console.log(caretaker);
 
  const [estates , setEstates] = useState([])
  const getEstates = ()=>{
    requestsServiceService.getAllEstates().then((res)=>{
        setEstates(res.data.data)
    })
  }
  const [premiseTypes ,setPremiseTypes]= useState([])
  const getPremiseTypes = ()=>{
    requestsServiceService.allPremiseTypes().then((res)=>{
        setPremiseTypes(res.data.data)
    })
  }
  const [premiseUseTypes ,setPremiseUseTypes]= useState([])
  const getPremiseUseTypes = ()=>{
    requestsServiceService.allPremiseUseTypes().then((res)=>{
        setPremiseTypes(res.data.data)
    })
  }
  useEffect(()=>{
     getEstates()
     getPremiseTypes()
     getPremiseUseTypes()
  },[])
  


  $("#landlord-type").on("change", function () {
    var theSeledtedValue = $(this).val();
    if (theSeledtedValue == "company") {
      $(".individual-landlord").removeClass("d-none").next().addClass("d-none");
    } else {
      $(".individual-landlord").addClass("d-none").next().removeClass("d-none");
    }
  });

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
                  <div className="create-property" id="basic-example">
                 
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
                                value={general.fileNo}
                                onChange={handleGeneral}
                                name="fileNo"
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
                                value={general.plotNo}
                                name='plotNo'
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
                                class=" selectpicker form-control "
                                data-live-search="true "
                                title="Select estate "
                                onChange={handleGeneral}
                              >
                                {estates.map((estate)=>{
                                    return (
                                        <option value={estate.id} name='estate' > {estate.name} - {estate.zone.name} - {estate.zone.clientCounty.name} </option>
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
                                class="form-control selectpicker "
                                title="Select Building type "
                                data-live-search="true "
                                onChange={handleGeneral}
                                
                              >
                                {premiseTypes.map((type)=>(
                                <option value={type.id} name='premiseType'> {type.name}</option>
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
                                class="form-control selectpicker "
                                title="Select Property use type "
                                data-live-search="true "

                              >
                               {premiseUseTypes.map((type)=>(
                                <option value={type.id} name='premiseUseType'> {type.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div class="col-md-6 col-lg-4 col-sm-12 ">
                            <div class="mb-4 ">
                              <label for=" " class=" ">
                                Registration Date
                                <strong class="text-danger ">*</strong>
                              </label>
                              <div class="input-group" id="datepicker2">
                                <input
                                  type="text"
                                  class="form-control"
                                  name="registrationDate"
                                  onChange={handleGeneral}
                                  value={general.registrationDate}
                                  placeholder="Select date"
                                  data-date-format="dd M, yyyy"
                                  data-date-container="#datepicker2"
                                  data-provide="datepicker"
                                  data-date-autoclose="true"
                                />

                                <span class="input-group-text">
                                  <i class="mdi mdi-calendar"></i>
                                </span>
                              </div>
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
                                value={caretaker.idNo}
                                onChange={handleCaretaker}
                                name="idNo"
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
                                name= "firstName"
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
                                        class="form-control selectpicker"
                                        data-live-search="true"
                                        title="Select caretaker type"
                                      >
                                        <option value="Commissioned by MCA">
                                          Commissioned by MCA
                                        </option>
                                        <option value="Brought by the landlord">
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
                                            name="caretaker-gender"
                                            id="caretaker-male"
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
                                            class="form-check-input"
                                            type="radio"
                                            name="caretaker-gender"
                                            id="caretaker-female"
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
                              <tr data-id="1">
                                <td style={{ width: "80px" }}>1.</td>
                                <td>
                                  <select
                                    class="form-control selectpicker"
                                    data-live-search="true"
                                    title="Select hse/unit type"
                                  >
                                    <option value="">Bed sitter</option>
                                    <option value="">Two bedroom</option>
                                    <option value="">three bedroom</option>
                                    <option value="">Four bedroom</option>
                                  </select>
                                </td>
                                <td class="">
                                  <input
                                    type="number"
                                    class="form-control "
                                    placeholder="Rooms"
                                    spellcheck="false"
                                    data-ms-editor="true"
                                  />
                                </td>
                                <td
                                  class=""
                                  title="Select number of months after which the tenancy agreement should be renewed"
                                >
                                  <input
                                    type="number"
                                    class="form-control "
                                    placeholder="Size (MSQ)"
                                    spellcheck="false"
                                    data-ms-editor="true"
                                  />
                                </td>

                                <td>
                                  <select
                                    class="form-control selectpicker"
                                    data-live-search="true"
                                    title="Select unit purpose"
                                  >
                                    <option value="">Residential</option>
                                    <option value="">Commercial</option>
                                  </select>
                                </td>
                                <td class="">
                                  <input
                                    type="number"
                                    class="form-control "
                                    placeholder="No. of months for agreement Renewal"
                                    spellcheck="false"
                                    data-ms-editor="true"
                                  />
                                </td>
                                <td></td>
                              </tr>
                              <tr class="cloneCharges d-none">
                                <td
                                  style={{ width: "80px" }}
                                  class="categoryIndex "
                                >
                                  #
                                </td>

                                <td>
                                  <select
                                    class="form-control selectpicker"
                                    data-live-search="true"
                                    title="Select hse/unit type"
                                  >
                                    <option value="">Bed sitter</option>
                                    <option value="">Two bedroom</option>
                                    <option value="">three bedroom</option>
                                    <option value="">Four bedroom</option>
                                  </select>
                                </td>
                                <td class="">
                                  <input
                                    type="number"
                                    class="form-control "
                                    placeholder="No. of Rooms"
                                    spellcheck="false"
                                    data-ms-editor="true"
                                  />
                                </td>
                                <td
                                  class=""
                                  title="Select number of months after which the tenancy agreement should be renewed"
                                >
                                  <input
                                    type="number"
                                    class="form-control "
                                    placeholder="Size (MSQ)"
                                    spellcheck="false"
                                    data-ms-editor="true"
                                  />
                                </td>

                                <td>
                                  <select
                                    class="form-control selectpicker"
                                    data-live-search="true"
                                    title="Select unit purpose"
                                  >
                                    <option value="">Residential</option>
                                    <option value="">Commercial</option>
                                  </select>
                                </td>
                                <td class="">
                                  <input
                                    type="number"
                                    class="form-control "
                                    placeholder="No. of months for agreement Renewal"
                                    spellcheck="false"
                                    data-ms-editor="true"
                                  />
                                </td>

                                <td class="text-right d-flex align-items-center justify-content-end">
                                  <a
                                    class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent cancel-new-category-2 "
                                    title="Cancel "
                                  >
                                    <i class="bx bx-x "></i>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <td
                                  colspan="7"
                                  class="bg-light add-field-2 cursor-pointer"
                                >
                                  <span class="d-flex align-items-center ">
                                    <i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                    <span class="pl-5 ">Add A Unit</span>
                                  </span>
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
                                <div class="col-6">
                                  <div class="form-check form-check-primary mb-3">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      id="monthlyRent"
                                      checked=""
                                    />
                                    <label
                                      class="form-check-label"
                                      for="monthlyRent"
                                    >
                                      Monthly Rent
                                    </label>
                                  </div>
                                </div>
                                <div class="col-6">
                                  <div class="form-check form-check-primary mb-3">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      id="rentTax"
                                      checked=""
                                    />
                                    <label
                                      class="form-check-label"
                                      for="rentTax"
                                    >
                                      18% Rent Tax
                                    </label>
                                  </div>
                                </div>
                                <div class="col-6">
                                  <div class="form-check form-check-primary mb-3">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      id="waterBill"
                                      checked=""
                                    />
                                    <label
                                      class="form-check-label"
                                      for="waterBill"
                                    >
                                      Water Bills
                                    </label>
                                  </div>
                                </div>
                                <div class="col-6">
                                  <div class="form-check form-check-primary mb-3">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      id="electricityBill"
                                      checked=""
                                    />
                                    <label
                                      class="form-check-label"
                                      for="electricityBill"
                                    >
                                      Electricity Bills
                                    </label>
                                  </div>
                                </div>
                                <div class="col-6">
                                  <div class="form-check form-check-primary mb-3">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      id="garbageCollection"
                                      checked=""
                                    />
                                    <label
                                      class="form-check-label"
                                      for="garbageCollection"
                                    >
                                      Garbage collection
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-4 col-md-4 col-sm-12 h-100">
                              <p class="text-decoration-underline">
                                <i>Deposits</i>
                              </p>
                              <div class="row border-right-1">
                                <div class="col-6">
                                  <div class="form-check form-check-secondary mb-3">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      id="rentDeposit"
                                      checked=""
                                    />
                                    <label
                                      class="form-check-label"
                                      for="rentDeposit"
                                    >
                                      Rent deposit
                                    </label>
                                  </div>
                                </div>
                                <div class="col-6">
                                  <div class="form-check form-check-secondary mb-3">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      id="agencyDeposit"
                                    />
                                    <label
                                      class="form-check-label"
                                      for="agencyDeposit"
                                    >
                                      Utility deposit
                                    </label>
                                  </div>
                                </div>
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
                                  <th>Bed sitter</th>
                                  <th>one Bedroom</th>
                                  <th>Two Bedroom</th>
                                </tr>
                              </thead>

                              <tfoot class="table-light">
                                <tr class="text-capitalize deposit-fee boarder-bottom">
                                  <th></th>
                                  <th>Total security Deposit</th>

                                  <th>First Month only</th>
                                  <th class="deposit-fee">-</th>
                                  <th class="deposit-fee">-</th>
                                  <th class="deposit-fee">-</th>
                                </tr>
                                <tr class="text-capitalize monthly-fee">
                                  <th></th>
                                  <th>Least Monthly Invoice Amount</th>

                                  <th>Monthly</th>
                                  <th class="monthly-fee">-</th>
                                  <th class="monthly-fee">-</th>
                                  <th class="monthly-fee">-</th>
                                </tr>
                              </tfoot>
                              <tbody>
                                <tr data-id="1">
                                  <td>1.</td>
                                  <td>Monthly Rent</td>
                                  <td>Monthly</td>
                                  <td
                                    invoice-permonth="true"
                                    deposit-amount="true"
                                    invoice-item-name="rent"
                                  >
                                    <input
                                      type="text "
                                      class="form-control "
                                      placeholder="Enter Amount"
                                      spellcheck="false"
                                      data-ms-editor="true"
                                    />
                                  </td>
                                  <td
                                    invoice-permonth="true"
                                    deposit-amount="true"
                                    invoice-item-name="rent"
                                  >
                                    <input
                                      type="text "
                                      class="form-control "
                                      placeholder="Enter Amount"
                                      spellcheck="false"
                                      data-ms-editor="true"
                                    />
                                  </td>
                                  <td
                                    invoice-permonth="true"
                                    deposit-amount="true"
                                    invoice-item-name="rent"
                                  >
                                    <input
                                      type="text "
                                      class="form-control "
                                      placeholder="Enter Amount"
                                      spellcheck="false"
                                      data-ms-editor="true"
                                    />
                                  </td>
                                </tr>
                                <tr data-id="1">
                                  <td style={{ width: "80px" }}>2</td>
                                  <td>Rent VAT</td>
                                  <td>Monthly</td>
                                  <td
                                    invoice-permonth="true"
                                    invoice-item-name="rent VAT"
                                    deposit-amount="false"
                                    per-of="rent"
                                    the-val="18>18% of rent"
                                  >
                                    {" "}
                                  </td>
                                  <td
                                    invoice-permonth="true"
                                    invoice-item-name="rent VAT"
                                    deposit-amount="false"
                                    per-of="rent"
                                    the-val="18>18% of rent"
                                  >
                                    {" "}
                                  </td>
                                  <td
                                    invoice-permonth="true"
                                    invoice-item-name="rent VAT"
                                    deposit-amount="false"
                                    per-of="rent"
                                    the-val="18>18% of rent"
                                  >
                                    {" "}
                                  </td>
                                </tr>
                                <tr data-id=" 1 ">
                                  <td style={{ width: "80px" }}>3</td>
                                  <td>Rent Deposit</td>
                                  <td>First Month only</td>
                                  <td
                                    invoice-permonth="false"
                                    deposit-amount="true"
                                  >
                                    <input
                                      type="text "
                                      class="form-control "
                                      placeholder="Enter Amount "
                                      spellcheck="false "
                                      data-ms-editor="true "
                                    />
                                  </td>
                                  <td
                                    invoice-permonth="false"
                                    deposit-amount="true"
                                  >
                                    <input
                                      type="text "
                                      class="form-control "
                                      placeholder="Enter Amount "
                                      spellcheck="false "
                                      data-ms-editor="true "
                                    />
                                  </td>
                                  <td
                                    invoice-permonth="false"
                                    deposit-amount="true"
                                  >
                                    <input
                                      type="text "
                                      class="form-control "
                                      placeholder="Enter Amount "
                                      spellcheck="false "
                                      data-ms-editor="true "
                                    />
                                  </td>
                                </tr>
                                <tr data-id="1 ">
                                  <td style={{ width: "80px" }}>4</td>
                                  <td>Surcharge</td>
                                  <td>Day 10 of each month</td>
                                </tr>
                                <tr data-id="1 ">
                                  <td style={{ width: "80px" }}>5</td>
                                  <td>Utility Deposit</td>
                                  <td>First month only</td>
                                </tr>
                                <tr data-id="1 ">
                                  <td style={{ width: "80px" }}>6</td>
                                  <td>Auctioneer Fees</td>
                                  <td>Random date</td>
                                </tr>
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
                          Upload document and don't forget to specify whose the
                          document is for. ie{" "}
                          <strong>Landlord or Premises</strong>
                        </h6>
                        <div class="table-responsive table-responsive-md">
                          <table class="table table-editable-file align-middle table-edits">
                            <thead class="table-light">
                              <tr class="text-uppercase table-dark">
                                <th class="vertical-align-middle">#</th>
                                <th class="vertical-align-middle">
                                  Document Name
                                </th>
                                <th class="vertical-align-middle">
                                  Document For
                                </th>
                                <th class="vertical-align-middle">
                                  Document Number
                                </th>
                                <th class="vertical-align-middle">
                                  Attach the file
                                </th>
                                <th class="text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr data-id="1">
                                <td style={{ width: "80px" }}>1.</td>

                                <td class="">Certificate of incorporation</td>
                                <td class="">The premises</td>
                                <td
                                  class=""
                                  title="Select number of months after which the tenancy agreement should be renewed"
                                >
                                  <input
                                    type="text"
                                    class="form-control "
                                    placeholder="Document's Unique No."
                                    spellcheck="false"
                                    data-ms-editor="true"
                                  />
                                </td>
                                <td
                                  class=""
                                  title="Select number of months after which the tenancy agreement should be renewed"
                                >
                                  <div class="input-group mb-0">
                                    <label
                                      class="input-group-text bg-info text-white cursor-pointer"
                                      for="document1-1"
                                    >
                                      <i class="font-14px mdi mdi-paperclip"></i>{" "}
                                      Attach File
                                    </label>
                                    <input
                                      type="file"
                                      class="form-control"
                                      id="document1-1"
                                    />
                                  </div>
                                </td>
                                <td></td>
                              </tr>
                              <tr data-id="2">
                                <td style={{ width: "80px" }}>2.</td>

                                <td class="">KRA Pin</td>
                                <td class="">The Landlord</td>
                                <td
                                  class=""
                                  title="Select number of months after which the tenancy agreement should be renewed"
                                >
                                  <input
                                    type="text"
                                    class="form-control "
                                    placeholder="Document's Unique No."
                                    spellcheck="false"
                                    data-ms-editor="true"
                                  />
                                </td>
                                <td
                                  class=""
                                  title="Select number of months after which the tenancy agreement should be renewed"
                                >
                                  <div class="input-group mb-0">
                                    <label
                                      class="input-group-text bg-info text-white cursor-pointer"
                                      for="document1-1"
                                    >
                                      <i class="font-14px mdi mdi-paperclip"></i>{" "}
                                      Attach File
                                    </label>
                                    <input
                                      type="file"
                                      class="form-control"
                                      id="document1-1"
                                    />
                                  </div>
                                </td>
                                <td></td>
                              </tr>
                              <tr data-id="3">
                                <td style={{ width: "80px" }}>3.</td>

                                <td class="">Landlord & MCA agreement</td>
                                <td class="">The Premises</td>
                                <td
                                  class=""
                                  title="Select number of months after which the tenancy agreement should be renewed"
                                >
                                  <input
                                    type="text"
                                    class="form-control "
                                    placeholder="Document's Unique No."
                                    spellcheck="false"
                                    data-ms-editor="true"
                                  />
                                </td>
                                <td
                                  class=""
                                  title="Select number of months after which the tenancy agreement should be renewed"
                                >
                                  <div class="input-group mb-0">
                                    <label
                                      class="input-group-text bg-info text-white cursor-pointer"
                                      for="document1-1"
                                    >
                                      <i class="font-14px mdi mdi-paperclip"></i>{" "}
                                      Attach File
                                    </label>
                                    <input
                                      type="file"
                                      class="form-control"
                                      id="document1-1"
                                    />
                                  </div>
                                </td>
                                <td></td>
                              </tr>
                              <tr data-id="3">
                                <td style={{ width: "80px" }}>4.</td>

                                <td class="">
                                  <select
                                    class="form-control selectpicker"
                                    data-live-search="true"
                                    title="Select the Document"
                                  >
                                    <option value="">ID Card</option>
                                    <option value="">
                                      Certificate of incorporation
                                    </option>
                                    <option value="">KRA Pin</option>
                                  </select>
                                </td>
                                <td class="">
                                  <select
                                    class="form-control selectpicker"
                                    data-live-search="true"
                                    title="The document is for?"
                                  >
                                    <option value="">The premises</option>
                                    <option value="">The landlord</option>
                                  </select>
                                </td>
                                <td
                                  class=""
                                  title="Select number of months after which the tenancy agreement should be renewed"
                                >
                                  <input
                                    type="text"
                                    class="form-control "
                                    placeholder="Document's Unique No."
                                    spellcheck="false"
                                    data-ms-editor="true"
                                  />
                                </td>
                                <td
                                  class=""
                                  title="Select number of months after which the tenancy agreement should be renewed"
                                >
                                  <div class="input-group mb-0">
                                    <label
                                      class="input-group-text bg-info text-white cursor-pointer"
                                      for="document1-1"
                                    >
                                      <i class="font-14px mdi mdi-paperclip"></i>{" "}
                                      Attach File
                                    </label>
                                    <input
                                      type="file"
                                      class="form-control"
                                      id="document1-1"
                                    />
                                  </div>
                                </td>
                                <td></td>
                              </tr>

                              <tr class="cloneCharges d-none">
                                <td
                                  style={{ width: "80px" }}
                                  class="categoryIndex "
                                >
                                  #
                                </td>

                                <td>
                                  <select
                                    class="form-control selectpicker"
                                    data-live-search="true"
                                    title="Select the Document"
                                  >
                                    <option value="">ID Card</option>
                                    <option value="">
                                      Certificate of incorporation
                                    </option>
                                    <option value="">KRA Pin</option>
                                  </select>
                                </td>
                                <td class="">
                                  <select
                                    class="form-control selectpicker"
                                    data-live-search="true"
                                    title="The document is for?"
                                  >
                                    <option value="">The premises</option>
                                    <option value="">The landlord</option>
                                  </select>
                                </td>
                                <td class="">
                                  <input
                                    type="text"
                                    class="form-control "
                                    placeholder="Document's Unique No."
                                    spellcheck="false"
                                    data-ms-editor="true"
                                  />
                                </td>
                                <td
                                  class=""
                                  title="Select number of months after which the tenancy agreement should be renewed"
                                >
                                  <div class="input-group mb-0">
                                    <label
                                      class="input-group-text bg-info text-white cursor-pointer"
                                      for="document"
                                    >
                                      <i class="font-14px mdi mdi-paperclip"></i>{" "}
                                      Attach File
                                    </label>
                                    <input
                                      type="file"
                                      class="form-control the-document"
                                      id="document"
                                    />
                                  </div>
                                </td>

                                <td class="text-right d-flex align-items-center justify-content-end">
                                  <a
                                    class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent cancel-new-category-file "
                                    title="Cancel "
                                  >
                                    <i class="bx bx-x "></i>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <td
                                  colspan="7"
                                  class="bg-light add-field-file cursor-pointer"
                                >
                                  <span class="d-flex align-items-center ">
                                    <i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                    <span class="pl-5 ">Add A Unit</span>
                                  </span>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </form>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- enter landlord's id modal --> */}
      <div
        class="modal fade"
        id="subscribeModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-bottom-0">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body ">
              <div class="text-center mb-4 ">
                <div class="avatar-md mx-auto mb-4 ">
                  <div class="avatar-title bg-light rounded-circle text-primary h1 ">
                    <i class="mdi mdi-card-account-details-outline "></i>
                  </div>
                </div>

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
                              value={landlordFileNo}
                              onChange={(e) =>
                                setLandlordFileNo(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div class="col-3 ">
                          <button
                            data-bs-dismiss="modal"
                            class="btn btn-primary btn-block w-100 btn-lg"
                          >
                            <i class="bx bx-search-alt-2 font-size-16 align-middle me-2 "></i>
                            <div class="d-none">Search</div>
                          </button>
                        </div>
                      </div>
                      <button
                        data-bs-dismiss="modal"
                        class="btn btn-secondary btn-block mt-3 text-center w-100"
                      >
                        <i class="mdi mdi-account-multiple-plus font-size-16 align-middle me-2 "></i>
                        Its a new landlord
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end of ID modal --> */}
    </>
  );
}

export default AddPremises;
