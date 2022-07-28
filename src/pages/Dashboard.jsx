import React, { useEffect, useState } from "react";
import requestsServiceService from "../services/requestsService.service";
import moment from "moment";

function Dashboard() {
  const [premises, setpremises] = useState([]);
  const [units, setunits] = useState([]);
  const [landlords, setlandlords] = useState([]);
  const [tenants, settenants] = useState([]);
  const [invoices, setinvoices] = useState([]);
  useEffect(() => {
    requestsServiceService.getAllpremises().then((res) => {
      setpremises(res.data.data);
    });
    requestsServiceService.getAllTenants().then((res) => {
      settenants(res.data.data);
    });
    requestsServiceService.getLandLords().then((res) => {
      setlandlords(res.data.data);
    });
    getInvoices();
  }, []);
  const getInvoices = () => {
    let data = {
      startDate: moment().startOf("month").format("YYYY-MM-DD"),
      endDate: moment().endOf("month").format("YYYY-MM-DD"),
      size: 1000,
      page: 0,
    };
    requestsServiceService.getInvoices(data).then((res) => {
      setinvoices(res.data.data);
    });
  };
  const total = () => {
    let sum = 0;
    let paid = 0;
    invoices.map((item) => {
      sum += item.billAmount;
      paid += item.billPaidAmount;
    });
    return sum - paid;
  };

  return (
    <div className="page-content">
      <div>Dashboard</div>
      <div class="container-fluid">
        {/* <!-- start page title --> */}
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0 font-size-18">Dashboard</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        {/* <!-- end page title --> */}

        {/* <!-- quick company stats --> */}
        <div class="row">
          <div class="col-xl-4">
            <div class="card">
              <div class="card-body">
                <div class="">
                  <div class="flex-shrink-0 me-3">
                    <img
                      src="assets/images/users/avatar-1.png"
                      alt="your Logo"
                      class="avatar-md rounded-circle img-thumbnail"
                    />
                  </div>
                  <div class="flex-grow-1 align-self-center">
                    <div class="text-muted mt-2">
                      <h5 class="mb-1">Muigai Commercial Agencies LTD</h5>
                      <p class="mb-0">RevenueSure Property Management</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-body border-top">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="mt-0 pt-0">
                      <p class="mb-2">
                        <i class="mdi mdi-circle align-middle font-size-10 me-2 text-danger"></i>
                        Units serving notice
                      </p>
                      <h5>
                        <span>32 Units/Houses</span>
                      </h5>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="mt-2 pt-0">
                      <p class="mb-2">
                        <i class="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i>{" "}
                        Agreements to be renewed this month
                      </p>
                      <h5>23 Units</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-8">
            <div class="row">
              <div class="col-lg-12 px-sm-30px">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-lg-12 align-self-center">
                        <div class="text-lg-left mt-4 mt-lg-0">
                          <div class="row">
                            <div class="col-4 col-sm-4 col-md-2">
                              <div>
                                <div class="avatar-xs mb-3">
                                  <span class="avatar-title rounded-circle bg-secondary font-size-16">
                                    <i class="mdi mdi-office-building-outline text-white"></i>
                                  </span>
                                </div>
                                <p class="text-muted text-truncate mb-2">
                                  Properties
                                </p>
                                <h5 class="mb-0">{invoices?.length}</h5>
                              </div>
                            </div>
                            <div class="col-4 col-sm-4 col-md-2">
                              <div>
                                <div class="avatar-xs mb-3">
                                  <span class="avatar-title bg-secondary rounded-circle font-size-16">
                                    <i class="mdi mdi-chat-outline text-white"></i>
                                  </span>
                                </div>
                                <p class="text-muted text-truncate mb-2">
                                  Units
                                </p>
                                <h5 class="mb-0">16,503</h5>
                              </div>
                            </div>
                            <div class="col-4 col-sm-4 col-md-2">
                              <div>
                                <div class="avatar-xs mb-3">
                                  <span class="avatar-title rounded-circle bg-secondary font-size-16">
                                    <i class="mdi mdi-shield-home text-white"></i>
                                  </span>
                                </div>
                                <p class="text-muted text-truncate mb-2">
                                  Landlords
                                </p>
                                <h5 class="mb-0">{landlords?.length}</h5>
                              </div>
                            </div>
                            <div class="col-4 col-sm-4 col-md-2">
                              <div>
                                <div class="avatar-xs mb-3">
                                  <span class="avatar-title rounded-circle bg-secondary font-size-16">
                                    <i class="mdi mdi-account-key text-white"></i>
                                  </span>
                                </div>
                                <p class="text-muted text-truncate mb-2">
                                  Tenants
                                </p>
                                <h5 class="mb-0">{tenants?.length}</h5>
                              </div>
                            </div>
                            {/*<div class="col-3 col-sm-3 col-md-2">*/}
                            {/*  <div>*/}
                            {/*    <div class="avatar-xs mb-3">*/}
                            {/*      <span class="avatar-title rounded-circle bg-danger font-size-16">*/}
                            {/*        <i class="mdi mdi-home-export-outline  text-white"></i>*/}
                            {/*      </span>*/}
                            {/*    </div>*/}
                            {/*    <p class="text-muted text-truncate mb-2">*/}
                            {/*      vacant Houses*/}
                            {/*    </p>*/}
                            {/*    <h5 class="mb-0">232</h5>*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end row --> */}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-12">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                          <div class="avatar-xs-2 me-3">
                            <span class="avatar-title rounded-circle bg-danger bg-soft text-danger  font-size-18">
                              <i class="mdi  mdi-cash-remove h2 mb-0 pb-0 text-danger"></i>
                            </span>
                          </div>
                          <div class="d-flex flex-column">
                            <span>Total arrears</span>
                            <div class="btn-group">
                              <button
                                class="btn btn-link dropdown-toggle btn-sm px-0 text-left pt-0 card-month-filter"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Feb 2022 <i class="mdi mdi-chevron-down"></i>
                              </button>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">
                                  Feb 2022
                                </a>
                                <a class="dropdown-item" href="#">
                                  Jan 2022
                                </a>
                                <a class="dropdown-item" href="#">
                                  Dec 2021
                                </a>
                                <a class="dropdown-item" href="#">
                                  Nov 2021
                                </a>
                                <a class="dropdown-item" href="#">
                                  Oct 2021
                                </a>
                                <a class="dropdown-item" href="#">
                                  Sep 2021
                                </a>
                                <a class="dropdown-item" href="#">
                                  Aug 2021
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="text-muted mt-4">
                          <h4>
                            {total()}
                            <i class="mdi mdi-chevron-up ms-1 text-success"></i>
                          </h4>
                          <div class="d-flex">
                            <span class="text-truncate">
                              From 32 Unpaid Invoices
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                          <div class="avatar-xs-2 me-3">
                            <span class="avatar-title rounded-circle bg-info bg-soft text-primary font-size-18">
                              <i class="mdi mdi-calendar-month  h2 text-info p-0 m-0"></i>
                            </span>
                          </div>
                          <div class="d-flex flex-column">
                            <span>Monthly Revenue</span>
                            <div class="btn-group">
                              <button
                                class="btn btn-link dropdown-toggle btn-sm px-0 text-left pt-0 card-month-filter"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Feb 2022 <i class="mdi mdi-chevron-down"></i>
                              </button>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">
                                  Feb 2022
                                </a>
                                <a class="dropdown-item" href="#">
                                  Jan 2022
                                </a>
                                <a class="dropdown-item" href="#">
                                  Dec 2021
                                </a>
                                <a class="dropdown-item" href="#">
                                  Nov 2021
                                </a>
                                <a class="dropdown-item" href="#">
                                  Oct 2021
                                </a>
                                <a class="dropdown-item" href="#">
                                  Sep 2021
                                </a>
                                <a class="dropdown-item" href="#">
                                  Aug 2021
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="text-muted mt-4">
                          <h4 class="text-uppercase">
                            kes 2,325
                            <i class="mdi mdi-chevron-up ms-1 text-success"></i>
                          </h4>
                          <div class="d-flex">
                            <span class="badge badge-soft-success font-size-12">
                              {" "}
                              + 0.2%{" "}
                            </span>
                            <span class="ms-2 text-truncate">
                              From previous period
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                          <div class="avatar-xs-2 me-3">
                            <span class="avatar-title rounded-circle bg-success bg-soft text-primary font-size-18">
                              <i class="mdi mdi mdi-calendar-text  h2 mb-0 pb-0 text-success"></i>
                            </span>
                          </div>
                          <div class="d-flex flex-column">
                            <span>Yearly revenue</span>
                            <div class="btn-group">
                              <button
                                class="btn btn-link dropdown-toggle btn-sm px-0 text-left pt-0 card-month-filter"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                2022 <i class="mdi mdi-chevron-down"></i>
                              </button>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">
                                  2021
                                </a>
                                <a class="dropdown-item" href="#">
                                  2020
                                </a>
                                <a class="dropdown-item" href="#">
                                  2019
                                </a>
                                <a class="dropdown-item" href="#">
                                  2018
                                </a>
                                <a class="dropdown-item" href="#">
                                  2017
                                </a>
                                <a class="dropdown-item" href="#">
                                  2016
                                </a>
                                <a class="dropdown-item" href="#">
                                  2015
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="text-muted mt-4">
                          <h4 class="text-uppercase">
                            KES 2,321,326
                            <i class="mdi mdi-chevron-up ms-1 text-success"></i>
                          </h4>

                          <div class="d-flex">
                            <span class="badge badge-soft-success font-size-12">
                              {" "}
                              2%{" "}
                            </span>
                            <span class="ms-2 text-truncate">
                              From previous period
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- end row --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end oc company stats --> */}

        <div class="row">
          <div class="col-xl-7 px-sm-30px">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <div class="d-sm-flex flex-wrap">
                      <div class="d-flex flex-column">
                        <h4 class="card-title mb-0">Rent collection Summary</h4>
                        <p class="text-muted mb-4">
                          2022 Rent collections summary{" "}
                        </p>
                      </div>
                      <div class="ms-auto d-none">
                        <ul class="nav nav-pills">
                          <li class="nav-item">
                            <a class="nav-link" href="#">
                              Week
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="#">
                              Month
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link active" href="#">
                              Year
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div id="revenue-chart" class="apex-charts" dir="ltr"></div>
                  </div>
                </div>
              </div>
              <div class="col-6 d-none">
                <div class="card">
                  <div class="card-header bg-transparent border-bottom">
                    <h4 class="card-title mb-0">Collection by Zone</h4>
                  </div>
                  <div class="card-body pt-1">
                    <div class="mt-0">
                      <div data-simplebar="init" style={{ maxHeight: "240px" }}>
                        <div
                          class="simplebar-wrapper"
                          style={{ margin: "0px" }}
                        >
                          <div class="simplebar-height-auto-observer-wrapper">
                            <div class="simplebar-height-auto-observer"></div>
                          </div>
                          <div class="simplebar-mask">
                            <div
                              class="simplebar-offset"
                              style={{ right: "-17px", bottom: "0px" }}
                            >
                              <div
                                class="simplebar-content-wrapper"
                                style={{
                                  height: "auto",
                                  overflow: "hidden scroll",
                                }}
                              >
                                <div
                                  class="simplebar-content"
                                  style={{ padding: "0px" }}
                                >
                                  <ul class="list-group list-group-flush">
                                    <li class="list-group-item py-3">
                                      <div class="d-flex">
                                        <div class="align-self-center overflow-hidden me-auto">
                                          <div>
                                            <h5 class="font-size-14 text-truncate">
                                              <a
                                                href="javascript: void(0);"
                                                class="text-dark"
                                              >
                                                Zone A (Nairobi)
                                              </a>
                                            </h5>
                                            <p class="text-muted mb-0">
                                              22 units
                                            </p>
                                          </div>
                                        </div>

                                        <div class="dropdown ms-0 text-right fw-semibold">
                                          KES 256,362
                                        </div>
                                      </div>
                                    </li>
                                    <li class="list-group-item py-3">
                                      <div class="d-flex">
                                        <div class="align-self-center overflow-hidden me-auto">
                                          <div>
                                            <h5 class="font-size-14 text-truncate">
                                              <a
                                                href="javascript: void(0);"
                                                class="text-dark"
                                              >
                                                Zone B (Nakuru)
                                              </a>
                                            </h5>
                                            <p class="text-muted mb-0">
                                              78 units
                                            </p>
                                          </div>
                                        </div>

                                        <div class="dropdown ms-0 text-right fw-semibold">
                                          KES 256,362
                                        </div>
                                      </div>
                                    </li>
                                    <li class="list-group-item py-3">
                                      <div class="d-flex">
                                        <div class="align-self-center overflow-hidden me-auto">
                                          <div>
                                            <h5 class="font-size-14 text-truncate">
                                              <a
                                                href="javascript: void(0);"
                                                class="text-dark"
                                              >
                                                Zone c (Nakuru)
                                              </a>
                                            </h5>
                                            <p class="text-muted mb-0">
                                              26 units
                                            </p>
                                          </div>
                                        </div>

                                        <div class="dropdown ms-0 text-right fw-semibold">
                                          KES 202,325
                                        </div>
                                      </div>
                                    </li>
                                    <li class="list-group-item py-3">
                                      <div class="d-flex">
                                        <div class="align-self-center overflow-hidden me-auto">
                                          <div>
                                            <h5 class="font-size-14 text-truncate">
                                              <a
                                                href="javascript: void(0);"
                                                class="text-dark"
                                              >
                                                Zone T (Nairobi)
                                              </a>
                                            </h5>
                                            <p class="text-muted mb-0">
                                              64 Units
                                            </p>
                                          </div>
                                        </div>

                                        <div class="dropdown ms-0 text-right fw-semibold">
                                          KES 145,526
                                        </div>
                                      </div>
                                    </li>
                                    <li class="list-group-item py-3">
                                      <div class="d-flex">
                                        <div class="align-self-center overflow-hidden me-auto">
                                          <div>
                                            <h5 class="font-size-14 text-truncate">
                                              <a
                                                href="javascript: void(0);"
                                                class="text-dark"
                                              >
                                                Zone 24 (Nakuru)
                                              </a>
                                            </h5>
                                            <p class="text-muted mb-0">
                                              123 units
                                            </p>
                                          </div>
                                        </div>

                                        <div class="dropdown ms-0 text-right fw-semibold">
                                          KES 45,562
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="simplebar-placeholder"
                            style={{ width: "auto", height: "457px" }}
                          ></div>
                        </div>
                        <div
                          class="simplebar-track simplebar-horizontal"
                          style={{ visibility: "hidden" }}
                        >
                          <div
                            class="simplebar-scrollbar"
                            style={{
                              transform: "translate3d(0px, 0px, 0px)",
                              display: "none",
                            }}
                          ></div>
                        </div>
                        <div
                          class="simplebar-track simplebar-vertical"
                          style={{ visibility: "visible" }}
                        >
                          <div
                            class="simplebar-scrollbar"
                            style={{
                              height: "136px",
                              transform: "translate3d(0px, 0px, 0px)",
                              display: "block",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="card">
                  <div class="card-header bg-transparent border-bottom">
                    <div class="d-flex flex-wrap align-items-start">
                      <div class="me-2">
                        <h5 class="card-title mt-1 mb-0">
                          Revenue by Hse Type
                        </h5>
                        <div></div>
                      </div>
                      <ul
                        class="nav nav-tabs nav-tabs-custom card-header-tabs ms-auto"
                        role="tablist"
                      >
                        <li class="mr-3 me-3">
                          <select
                            class="form-control selectpicker"
                            data-live-search="true"
                            data-style="btn-primary btn-sm"
                            title="Select Month"
                          >
                            <option value="Jan 2022" selected>
                              Jan 2022
                            </option>
                            <option value="Feb 2022">Feb 2022</option>
                            <option value="Mar 2022">Mar 2022</option>
                            <option value="Apr 2022">Apr 2022</option>
                            <option value="May 2022">May 2022</option>
                            <option value="Jun 2022">Jun 2022</option>
                            <option value="Jul 2022">Jul 2022</option>
                          </select>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            data-bs-toggle="tab"
                            href="#by-all"
                            role="tab"
                          >
                            All Counties
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-bs-toggle="tab"
                            href="#by-nairobi"
                            role="tab"
                          >
                            Nairobi
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-bs-toggle="tab"
                            href="#by-nakuru"
                            role="tab"
                          >
                            Nakuru
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="card-body">
                    <div data-simplebar="init" style={{ maxHeight: "410px" }}>
                      <div class="simplebar-wrapper" style={{ margin: "0px" }}>
                        <div class="simplebar-height-auto-observer-wrapper">
                          <div class="simplebar-height-auto-observer"></div>
                        </div>
                        <div class="simplebar-mask">
                          <div
                            class="simplebar-offset"
                            style={{ right: "-16.8px", bottom: "0px" }}
                          >
                            <div
                              class="simplebar-content-wrapper"
                              style={{
                                height: "auto",
                                overflow: "hidden scroll",
                              }}
                            >
                              <div
                                class="simplebar-content"
                                style={{ padding: "0px" }}
                              >
                                {/* <!-- Tab panes --> */}
                                <div class="tab-content">
                                  <div
                                    class="tab-pane active"
                                    id="by-all"
                                    role="tabpanel"
                                  >
                                    <ul class="list-group list-group-flush">
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  One Bedrooms
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                21 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 216,362
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  One Bedrooms
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                18 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 251,362
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  Two Bedrooms
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                16 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 202,321
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  Bed Sitters
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                61 Units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 145,526
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  Four Bedrooms
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                113 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 45,162
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  {/* <!-- end tab pane --> */}
                                  <div
                                    class="tab-pane"
                                    id="by-nairobi"
                                    role="tabpanel"
                                  >
                                    <ul class="list-group list-group-flush">
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  One Bedrooms
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                22 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 256,362
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  One Bedrooms
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                78 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 256,362
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  Two Bedrooms
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                26 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 202,325
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  Bed Sitters
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                64 Units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 145,526
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  Four Bedrooms
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                123 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 45,562
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  {/* <!-- end tab pane --> */}

                                  <div
                                    class="tab-pane"
                                    id="by-nakuru"
                                    role="tabpanel"
                                  >
                                    <ul class="list-group list-group-flush">
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  Bed sitter
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                66 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 145,560
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  One Bedrooms
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                54 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 654,458
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  Two Bedrooms
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                212 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 63,548
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  Three Bedroom
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                122 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 256,362
                                          </div>
                                        </div>
                                      </li>
                                      <li class="list-group-item py-3">
                                        <div class="d-flex">
                                          <div class="align-self-center overflow-hidden me-auto">
                                            <div>
                                              <h5 class="font-size-14 text-truncate">
                                                <a
                                                  href="javascript: void(0);"
                                                  class="text-dark"
                                                >
                                                  One Bedrooms
                                                </a>
                                              </h5>
                                              <p class="text-muted mb-0">
                                                315 units
                                              </p>
                                            </div>
                                          </div>

                                          <div class="dropdown ms-0 text-right fw-semibold">
                                            KES 74,125
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  {/* <!-- end tab pane --> */}
                                </div>
                                {/* <!-- end tab content --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="simplebar-placeholder"
                          style={{ width: "auto", height: "350px" }}
                        ></div>
                      </div>
                      <div
                        class="simplebar-track simplebar-horizontal"
                        style={{ visibility: "hidden;" }}
                      >
                        <div
                          class="simplebar-scrollbar"
                          style={{
                            transform: "translate3d(0px, 0px, 0px)",
                            display: "none",
                          }}
                        ></div>
                      </div>
                      <div
                        class="simplebar-track simplebar-vertical"
                        style={{ visibility: "visible" }}
                      >
                        <div
                          class="simplebar-scrollbar"
                          style={{
                            height: "269px",
                            transform: "translate3d(0px, 26px, 0px)",
                            display: "block",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-5 px-sm-30px">
            <div class="card">
              <div class="card-body">
                <div class="float-end">
                  <select class="form-select form-select-sm ms-2">
                    <option value="2022" selected>
                      2022
                    </option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                  </select>
                </div>
                <h4 class="card-title mb-0">Collections by unit Purpose</h4>
                <div class="row">
                  <div class="col-sm-7">
                    <div>
                      <div id="unit-types" class="apex-charts"></div>
                    </div>
                  </div>
                  <div class="col-sm-5 align-self-center">
                    <div>
                      <p class="mb-2">
                        <i class="mdi mdi-circle align-middle font-size-10 me-2 text-primary"></i>{" "}
                        Residential
                      </p>
                      <h5>
                        KES 22,562 <br />
                        <span class="text-muted font-size-12">23 Contacts</span>
                      </h5>
                    </div>

                    <div class="mt-4 pt-2">
                      <p class="mb-2">
                        <i class="mdi mdi-circle align-middle font-size-10 me-2 text-pink"></i>{" "}
                        Commercial
                      </p>
                      <h5>
                        KES 632,230 <br />
                        <span class="text-muted font-size-12">75 Units</span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="float-end">
                  <select
                    class="form-control selectpicker"
                    data-live-search="true"
                    data-style="btn-primary btn-sm"
                    title="Select Month"
                  >
                    <option value="Jan 2022" selected>
                      Jan 2022
                    </option>
                    <option value="Feb 2022">Feb 2022</option>
                    <option value="Mar 2022">Mar 2022</option>
                    <option value="Apr 2022">Apr 2022</option>
                    <option value="May 2022">May 2022</option>
                    <option value="Jun 2022">Jun 2022</option>
                    <option value="Jul 2022">Jul 2022</option>
                  </select>
                </div>
                <h4 class="card-title mb-4">Collection By Revenue Type</h4>

                <div>
                  <div
                    id="agrement-type"
                    class="apex-charts revenue-type"
                  ></div>
                </div>

                <div class="text-center text-muted">
                  <div class="row">
                    <div class="col-4">
                      <div class="mt-4 text-left">
                        <p class="mb-2 text-truncate text-left">
                          <i class="mdi mdi-circle text-primary me-1"></i>
                          Agreement Fees
                        </p>
                        <h5>KES 202,132</h5>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="mt-4 text-left">
                        <p class="mb-2 text-truncate">
                          <i class="mdi mdi-circle text-danger me-1"></i>
                          Surcharge
                        </p>
                        <h5>KES 21,763</h5>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="mt-4 text-left">
                        <p class="mb-2 text-truncate text-left">
                          <i class="mdi mdi-circle text-primary me-1"></i>
                          Commission
                        </p>
                        <h5>KES 30,256</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="float-end">
                  <select
                    class="form-control selectpicker"
                    data-live-search="true"
                    data-style="btn-primary btn-sm"
                    title="Select Month"
                  >
                    <option value="Jan 2022" selected>
                      Jan 2022
                    </option>
                    <option value="Feb 2022">Feb 2022</option>
                    <option value="Mar 2022">Mar 2022</option>
                    <option value="Apr 2022">Apr 2022</option>
                    <option value="May 2022">May 2022</option>
                    <option value="Jun 2022">Jun 2022</option>
                    <option value="Jul 2022">Jul 2022</option>
                  </select>
                </div>
                <h4 class="card-title mb-4">
                  Revenue Transaction Modes comparison
                </h4>

                <div class="table-responsive mt-4">
                  <table class="table align-middle mb-0">
                    <tbody>
                      <tr>
                        <td>
                          <h5 class="font-size-14 mb-1">MPESA</h5>
                          <p class="text-muted mb-0">KES 253,630</p>
                        </td>

                        <td>
                          <div id="radialchart-1" class="apex-charts"></div>
                        </td>
                        <td>
                          <p class="text-muted mb-1">Transactions</p>
                          <h5 class="mb-0">47 %</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h5 class="font-size-14 mb-1">CASH</h5>
                          <p class="text-muted mb-0">KES 192,360</p>
                        </td>

                        <td>
                          <div id="radialchart-2" class="apex-charts"></div>
                        </td>
                        <td>
                          <p class="text-muted mb-1">Transactions</p>
                          <h5 class="mb-0">32 %</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h5 class="font-size-14 mb-1">BANK</h5>
                          <p class="text-muted mb-0">KES 100,500</p>
                        </td>

                        <td>
                          <div id="radialchart-3" class="apex-charts"></div>
                        </td>
                        <td>
                          <p class="text-muted mb-1">Transactions</p>
                          <h5 class="mb-0">21 %</h5>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end row --> */}
      </div>
    </div>
  );
}

export default Dashboard;
