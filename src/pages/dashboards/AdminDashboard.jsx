/* global $ */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { createSearchParams, useSearchParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";


function AdminDashboard() {
  const [adminAgedArrears, setAdminAgedArrears] = useState({});
  const [occupancyReport, setOccupancyReport] = useState({});
  const [newUnitsIncomeReport, setNewUnitsIncomeReport] = useState({});
  const [adminAgedArrearsMonth, setAdminAgedArrearsMonth] =
    useState("undefined");
  const [occupancyReportCounty, setOccupancyReportCounty] =
    useState("undefined");
  const [newUnitsIncomeReportCounty, setNewUnitsIncomeReportCounty] =
    useState("undefined");

  useEffect(() => {
    getAdminDashboard();
  }, []);

  const navigate = useNavigate();

  const linkToArrears = (county) => {
    const params = { county: county };
    navigate({
      pathname: "/admin-reports",
      search: `?${createSearchParams(params)}`,
    });
  };

  const linkToNewUnits = (county) => {
    const params = { county: county };
    navigate({
      pathname: "/newunits-reports",
      search: `?${createSearchParams(params)}`,
    });
  };

  const linkToOccupancyReports = (county) => {
    const params = { county: county };
    navigate({
      pathname: "/occupancy-reports",
      search: `?${createSearchParams(params)}`,
    });
  };

  const getAdminDashboard = () => {
    requestsServiceService
      .adminDashboard()
      .then((res) => {
        $("#spinner").addClass("d-none");

        setAdminAgedArrears(res.data.data.agedArrearsReportResponse);
        setNewUnitsIncomeReport(
          res.data.data.newUnitsExpectedIncomeReportResponse
        );
        setOccupancyReport(res.data.data.occupancyReportResponse);
        let arr = res.data.data.agedArrearsReportResponse?.ageReportModels;
        setAdminAgedArrearsMonth(arr[arr.length - 1].invoicePeriod);
      })
      .finally(() => {
        $("#spinner").addClass("d-none");
      });
  };

  const formatCurrency = (x) => {
    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    });
    return formatCurrency.format(x);
  };

  return (
    <>
      <div className="page-content">
        <div className="conatainer-fluid">
          <div class="row">
            {/* <!-- Loader --> */}
            <div id="spinner">
              <div id="status">
                <div class="spinner-chase">
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Dashboard</h4>
                <div className="page-title-right">
                  <Link to="/">
                    <button className="btn btn-primary">Main Dashboard</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="row mx-auto">
            <div class="col-xl-3">
              <div class="card">
                <div class="card-body">
                  <div class="">
                    <div class="flex-shrink-0 me-3">
                      <span class="logo-lg">
                        <img
                          src="assets/images/logo-light.png"
                          alt=""
                          height="45"
                        />
                      </span>
                    </div>
                    <div class="flex-grow-1 align-self-center mt-5">
                      <div class="text-muted mt-2">
                        <h5 class="mb-1">Muigai Commercials</h5>
                        <p class="mb-0">RevenueSure Property Management</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-body border-top opacity-0">
                  <div class="row h-5 my-5 py-3"></div>
                </div>
              </div>
            </div>
            <div className="col-xl-1"></div>
            <div class="col-xl-7 mt-lg-2">
              <div class="card">
                <div class="card-header bg-white pt-0 p-3 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div>
                    <h4>New Units Expected Income Report </h4>
                  </div>
                  <div className="select my-3">
                    <select
                      name=""
                      id=""
                      className="form-control select2-container"
                      onChange={(e) =>
                        setNewUnitsIncomeReportCounty(e.target.value)
                      }
                    >
                      <option value={"undefined"}>Select county </option>
                      {newUnitsIncomeReport?.unitIncomeModels?.map((model) => (
                        <option value={model.demography}>
                          {model.demography}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="card-body">
                  <div className="table-responsive">
                    <table class="table  table-nowrap table-hover overflow-visible contacts-table">
                      <thead class="table-light">
                        <tr>
                          <th>#</th>
                          <th>County</th>
                          <th>New Units</th>
                          <th>Total Expected Income</th>
                          <th>commission Income</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newUnitsIncomeReportCounty === "undefined"
                          ? newUnitsIncomeReport?.unitIncomeModels?.map(
                              (model, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td className="text-capitalize">
                                      {model.demography
                                        ?.toLowerCase()
                                        ?.replace(/_/g, " ")}
                                    </td>
                                    <td>{model.newUnits}</td>
                                    <td>
                                      {formatCurrency(
                                        model.totalExpectedIncome
                                      )}
                                    </td>
                                    <td>
                                      {formatCurrency(model.commissionIncome)}
                                    </td>
                                    <td>
                                      <i
                                        onClick={() =>
                                          linkToNewUnits(model.demography)
                                        }
                                        className="font-size-20 mdi mdi-eye me-3 cursor-pinter "
                                      ></i>
                                    </td>
                                  </tr>
                                );
                              }
                            )
                          : newUnitsIncomeReport?.unitIncomeModels
                              ?.filter(
                                (one) =>
                                  one.demography === newUnitsIncomeReportCounty
                              )
                              ?.map((model, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td className="text-capitalize">
                                      {model.demography
                                        ?.toLowerCase()
                                        ?.replace(/_/g, " ")}
                                    </td>
                                    <td>{model.newUnits}</td>
                                    <td>{model.totalExpectedIncome}</td>
                                    <td>{model.commissionIncome}</td>
                                    <td>
                                      <i
                                        onClick={() =>
                                          linkToNewUnits(model.demography)
                                        }
                                        className="font-size-20 mdi mdi-eye me-3 cursor-pinter "
                                      ></i>
                                    </td>
                                  </tr>
                                );
                              })}
                        {/* <tr></tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* two tables */}
          <div class="row">
            <div class="col-xl-6">
              <div class="card">
                <div class="card-header bg-white pt-0  p-3 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div>
                    <h4>Arrears Report</h4>
                  </div>
                  <div className="select my-3">
                    <select
                      name=""
                      id=""
                      className="form-control select2-container"
                      onChange={(e) => setAdminAgedArrearsMonth(e.target.value)}
                    >
                      <option value={"undefined"}>Select Month </option>
                      {adminAgedArrears?.ageReportModels?.map((model) => (
                        <option
                          selected={
                            adminAgedArrearsMonth === model.invoicePeriod
                          }
                          value={model.invoicePeriod}
                        >
                          {model.invoicePeriod}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="card-body">
                  <div className="table-responsive">
                    <table class="table  table-nowrap table-hover overflow-visible contacts-table">
                      <thead class="table-light">
                        <tr>
                          <th>#</th>
                          <th>County</th>
                          <th>Month</th>
                          <th>Invoices</th>
                          <th>Invoiced</th>
                          <th>Paid</th>
                          <th>Collection Rate</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminAgedArrearsMonth === "undefined"
                          ? adminAgedArrears?.ageReportModels?.map(
                              (model, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td className="text-capitalize">
                                      {model.demography
                                        ?.toLowerCase()
                                        ?.replace(/_/g, " ")}
                                    </td>
                                    <td>{model.invoicePeriod}</td>
                                    <td>{model.countAll}</td>
                                    <td>
                                      KSH{" "}
                                      {model.sum
                                        ?.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      KSH{" "}
                                      {model.paid
                                        ?.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>{model.collectionRate}</td>
                                    <td>
                                      <i
                                        onClick={() =>
                                          linkToArrears(model.demography)
                                        }
                                        className="font-size-20 mdi mdi-eye me-3 cursor-pinter "
                                      ></i>
                                    </td>
                                  </tr>
                                );
                              }
                            )
                          : adminAgedArrears?.ageReportModels
                              ?.filter(
                                (one) =>
                                  one.invoicePeriod === adminAgedArrearsMonth
                              )
                              .map((model, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td className="text-capitalize">
                                      {model.demography
                                        ?.toLowerCase()
                                        ?.replace(/_/g, " ")}
                                    </td>
                                    <td>{model.invoicePeriod}</td>
                                    <td>{model.countAll}</td>
                                    <td>
                                      KSH{" "}
                                      {model.sum
                                        ?.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>
                                      KSH{" "}
                                      {model.paid
                                        ?.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                    <td>{model.collectionRate}</td>
                                    <td>
                                      <i
                                        onClick={() =>
                                          linkToArrears(model.demography)
                                        }
                                        className="font-size-20 mdi mdi-eye me-3 cursor-pinter "
                                      ></i>
                                    </td>
                                  </tr>
                                );
                              })}
                        {/* <tr></tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="card">
                <div class="card-header bg-white pt-0 p-3 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div>
                    <h4> Occupancy Report</h4>
                  </div>
                  <div className="select my-3">
                    <select
                      name=""
                      id=""
                      className="form-control select2-container"
                      onChange={(e) => setOccupancyReportCounty(e.target.value)}
                    >
                      <option value={"undefined"}>Select county </option>
                      {occupancyReport?.occupancyResponses?.map((model) => (
                        <option value={model.demography}>
                          {model.demography}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="card-body">
                  <div className="table-responsive">
                    <table class="table  table-nowrap table-hover overflow-visible contacts-table">
                      <thead class="table-light">
                        <tr>
                          <th>#</th>
                          <th>County</th>
                          <th>Premises</th>
                          <th>All Units</th>
                          <th>New Units</th>
                          <th>Unit Summary</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {occupancyReportCounty === "undefined"
                          ? occupancyReport?.occupancyResponses?.map(
                              (model, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td className="text-capitalize">
                                      {model.demography
                                        ?.toLowerCase()
                                        ?.replace(/_/g, " ")}
                                    </td>
                                    <td>{model.premiseCount}</td>
                                    <td>{model.allUnits}</td>
                                    <td>{model.newUnits}</td>
                                    <td>
                                      {model.countPremiseUnitByStatus?.map(
                                        (one) => (
                                          <div className="d-flex justify-content-start gap-3">
                                            <strong>{one.sum}</strong>
                                            <span className="text-capitalize">
                                              {one.status
                                                ?.toLowerCase()
                                                ?.replace(/_/g, " ")}{" "}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </td>
                                    <td>
                                      <i
                                        onClick={() =>
                                          linkToOccupancyReports(
                                            model.demography
                                          )
                                        }
                                        className="font-size-20 mdi mdi-eye me-3 cursor-pinter "
                                      ></i>
                                    </td>
                                  </tr>
                                );
                              }
                            )
                          : occupancyReport?.occupancyResponses
                              ?.filter(
                                (one) =>
                                  one.demography === occupancyReportCounty
                              )
                              ?.map((model, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td className="text-capitalize">
                                      {model.demography
                                        ?.toLowerCase()
                                        ?.replace(/_/g, " ")}
                                    </td>
                                    <td>{model.premiseCount}</td>
                                    <td>{model.allUnits}</td>
                                    <td>{model.newUnits}</td>
                                    <td>
                                      {model.countPremiseUnitByStatus?.map(
                                        (one) => (
                                          <div className="d-flex justify-content-start gap-3">
                                            <strong>{one.sum}</strong>
                                            <span>{one.status} </span>
                                          </div>
                                        )
                                      )}
                                    </td>
                                    <td>
                                      <i
                                        onClick={() =>
                                          linkToOccupancyReports(
                                            model.demography
                                          )
                                        }
                                        className="font-size-20 mdi mdi-eye me-3 cursor-pinter "
                                      ></i>
                                    </td>
                                  </tr>
                                );
                              })}
                        {/* <tr></tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Helmet>
        <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
        <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap5.min.js"></script>
      </Helmet>
    </>
  );
}

export default AdminDashboard;
