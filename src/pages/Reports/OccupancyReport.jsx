/* global $*/
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import ReactPaginate from "react-paginate";
import moment from "moment";
import DatePicker from "react-datepicker";
import Chart from "react-apexcharts";

export default function OccupancyReport() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const clientCountyName = searchParams.get("county");
  const [clientCountyName, setclientCountyName] = useState("KIAMBU");
  const [reports, setreports] = useState({});
  const [zones, setzones] = useState([]);
  const [estates, setestates] = useState([]);
  const [zoneId, setZoneId] = useState("");
  const [estateId, setestateId] = useState("");
  const [clientcounties, setClientCounties] = useState([]);
  const [countyId, setCounty] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fetchAll = () => {
    // requestsServiceService.getOccupancyReport().then((res) => {
    //   setreports(res.data.data?.occupancyResponses);
    // });
    requestsServiceService.getClientCounties().then((res) => {
      setClientCounties(res.data.data);
    });
  };
  useEffect(() => {
    console.log(reports);
  }, [reports]);

  useEffect(() => {
    let x = clientcounties.filter(
      (item) => item?.county?.name === clientCountyName
    );
    if (x[0] !== undefined) {
      setCounty(x[0].id);
    }
    fetchFiltered(countyId, zoneId, estateId);
  }, [clientcounties]);

  const sort = () => {
    fetchFiltered(countyId, zoneId, estateId);
    setZoneId("");
    setestateId("");
  };

  useEffect(() => {
    fetchFiltered(countyId, zoneId, estateId);
  }, [countyId]);

  const fetchFiltered = (x, y, z) => {
    console.log(startDate, endDate);
    let sD = moment(startDate).format("YYYY/MM/DD");
    let eD = moment(endDate).format("YYYY/MM/DD");
    requestsServiceService
      .filterOccupancyReport(x, y, z, sD, eD)
      .then((res) => {
        setreports(res.data.data);
      });
  };

  const getEstates = (zoneId) => {
    requestsServiceService.getAllEstates().then((res) => {
      let resp = res.data.data;
      let es = resp.filter(
        (item) => parseInt(item.zone?.id) === parseInt(zoneId)
      );
      setestates(es);
    });
  };
  const getZones = (c) => {
    requestsServiceService.getAllZones().then((res) => {
      setzones(
        res.data.data?.filter(
          (z) => z?.clientCounty?.county?.id === parseInt(c)
        )
      );
    });
  };
  useEffect(() => {
    getEstates(zoneId);
  }, [zoneId]);

  useEffect(() => {
    fetchAll();
  }, []);

  const formatCurrency = (x) => {
    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    });
    return formatCurrency.format(x);
  };
  return (
    <>
      <>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0 font-size-18 text-capitalize">
                    Occupancy Reports
                  </h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="/">Reports</a>
                      </li>
                      <li className="breadcrumb-item active">
                        Occupancy Reports
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <>
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                        <div
                          className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                          role="toolbar"
                        >
                          <h4 className="card-title text-capitalize mb-0 ">
                            Occupancy Reports
                          </h4>
                        </div>
                        <div>
                          {/*<div className="card-body d-flex gap-4">*/}
                          {/*  <p className="p-0 m-0">*/}
                          {/*    <strong className="text-muted">Plot No. </strong>*/}
                          {/*    {premiseData?.premise?.plotNumber}*/}
                          {/*  </p>*/}
                          {/*  <p className="p-0 m-0">*/}
                          {/*    <strong className="text-muted">File No.</strong>*/}
                          {/*    {premiseData?.premise?.plotNumber}*/}
                          {/*  </p>*/}
                          {/*</div>*/}
                          {/*<div className="card-body d-flex gap-4 align-items-center">*/}
                          {/*  <p className="p-0 m-0">*/}
                          {/*    <span className="mdi mdi-map-marker me-2 font-18px"></span>{" "}*/}
                          {/*    {premiseData?.premise?.estate?.name}*/}
                          {/*  </p>*/}
                          {/*  <p className="p-0 m-0">*/}
                          {/*    <strong className="text-muted">County </strong>{" "}*/}
                          {/*    {premiseData.premise &&*/}
                          {/*      premiseData.premise.estate.zone.clientCounty.county.name.toLowerCase()}*/}
                          {/*  </p>*/}
                          {/*  <p className="p-0 m-0">*/}
                          {/*    <strong className="text-muted">Estate </strong>{" "}*/}
                          {/*    {premiseData.premise &&*/}
                          {/*      premiseData.premise.estate.name}*/}
                          {/*  </p>*/}
                          {/*  <p className="p-0 m-0">*/}
                          {/*    <strong className="text-muted">Zone </strong>{" "}*/}
                          {/*    {premiseData.premise &&*/}
                          {/*      premiseData.premise.estate.zone.name}*/}
                          {/*  </p>*/}
                          {/*</div>*/}
                          {/*<div className="card-body">*/}
                          {/*  <h4 className="text-capitalize font-14px">*/}
                          {/*    <a>*/}
                          {/*      {" "}*/}
                          {/*      {landlordDetail?.firstName}{" "}*/}
                          {/*      {landlordDetail?.lastName}{" "}*/}
                          {/*      {landlordDetail?.otherName} (Landlord)*/}
                          {/*    </a>*/}
                          {/*  </h4>*/}
                          {/*  <p className="text-muted mb-0 d-flex align-items-center">*/}
                          {/*    <a className="d-flex align-items-center">*/}
                          {/*      <i className="mdi mdi-phone me-2 font-size-18"></i>*/}
                          {/*      {landlordDetail?.phoneNumber}*/}
                          {/*    </a>{" "}*/}
                          {/*    <span className="px-3 px-3">|</span>*/}
                          {/*    <a className="d-flex align-items-center">*/}
                          {/*      <i className="mdi mdi-email-outline font-size-18 me-2"></i>{" "}*/}
                          {/*      {landlordDetail?.email}*/}
                          {/*    </a>*/}
                          {/*  </p>*/}
                          {/*</div>*/}
                        </div>
                        <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                          <div
                            className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                            role="toolbar"
                          >
                            <div className="d-flex align-items-center flex-grow-1"></div>
                            <div className="d-flex justify-content-end align-items-center align-items-center pr-3">
                              <div>
                                <select
                                  className={"form-control"}
                                  name=""
                                  id=""
                                  onChange={(e) => setCounty(e.target.value)}
                                >
                                  <option value="">Select County</option>
                                  {clientcounties?.map((item) => (
                                    <option
                                      value={item.id}
                                      key={item.id}
                                      selected={
                                        item.county.name === clientCountyName
                                      }
                                    >
                                      {item.county.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select
                                  className={"form-control"}
                                  onChange={(e) => setZoneId(e.target.value)}
                                >
                                  <option value=""> Select zone...</option>
                                  {zones?.map((zone) => (
                                    <>
                                      {zone.clientCounty?.county?.name ===
                                        clientCountyName && (
                                        <option key={zone.id} value={zone.id}>
                                          {zone.name}
                                        </option>
                                      )}
                                    </>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select
                                  className={"form-control"}
                                  onChange={(e) => setestateId(e.target.value)}
                                >
                                  <option value=""> Select estate...</option>
                                  {estates?.map((estate) => (
                                    <option key={estate.id} value={estate.id}>
                                      {estate.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <button
                                className="btn btn-primary"
                                onClick={sort}
                              >
                                filter
                              </button>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="flex p-2">
                                <span className="input-group-text">
                                  <i className="mdi mdi-calendar">
                                    Start Date:
                                  </i>
                                </span>
                                <DatePicker
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  selectsStart
                                  className="form-control cursor-pointer"
                                  startDate={startDate}
                                  endDate={endDate}
                                />
                              </div>
                              <div className="flex p-2" id="datepicker1">
                                <span className="input-group-text">
                                  <i className="mdi mdi-calendar">End Date:</i>
                                </span>
                                <DatePicker
                                  selected={endDate}
                                  onChange={(date) => setEndDate(date)}
                                  selectsEnd
                                  showMonthDropdown
                                  showYearDropdown
                                  className="form-control cursor-pointer"
                                  calendarClassName="form-group"
                                  startDate={startDate}
                                  endDate={endDate}
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center pr-3">
                          <div className="d-flex">
                            <div className="text-start"></div>
                          </div>
                        </div>
                        {reports !== {} && (
                          <div className="row">
                            <div className="col-2">
                              <div className="card">
                                <div className="card-body">
                                  <div className="d-flex align-items-center text-capitalize">
                                    <div className="mb-0 me-3 font-35px">
                                      <i className="mdi mdi-home-city-outline  text-primary h1"></i>
                                    </div>
                                    <div className="d-flex justify-content-between col-10">
                                      <div>
                                        <h5 className="text-capitalize mb-0 pb-0"></h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-body d-flex gap-4">
                                  <p className="p-0 m-0">
                                    <span className="mdi mdi-map-marker me-2 font-18px"></span>
                                  </p>
                                  <p className="p-0 m-0">
                                    <strong className="text-muted">
                                      County:
                                    </strong>
                                    <br />
                                    {reports?.county}
                                  </p>
                                </div>
                                <div className="card-body d-flex gap-4">
                                  <p className="p-0 m-0">
                                    <span className="mdi mdi-map-marker me-2 font-18px"></span>
                                  </p>
                                  <p className="p-0 m-0">
                                    <strong className="text-muted">
                                      Zone:
                                    </strong>
                                    <br />
                                    {reports?.zone}
                                  </p>
                                </div>
                                <div className="card-body d-flex gap-4 align-items-center">
                                  <p className="p-0 m-0">
                                    <span className="mdi mdi-home-group me-2 font-18px"></span>
                                  </p>
                                  <p className="p-0 m-0">
                                    <strong className="text-muted">
                                      Estate
                                    </strong>
                                    <br />
                                    {reports?.estate}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-10">
                              <>
                                <div className="table-responsive">
                                  <table
                                    className="table align-middle table-hover  contacts-table table-striped "
                                    id="datatable-buttons"
                                  >
                                    <thead className="table-light">
                                      <tr className="table-light">
                                        <th>Demography</th>
                                        <th>Premises</th>
                                        <th>Units</th>
                                        <th>New Units</th>
                                        <th>Unit Summary</th>
                                        <th className="text-right">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {reports !== {} &&
                                        reports?.occupancyResponses?.map(
                                          (item, index) => (
                                            <tr data-id={index} key={index}>
                                              <td>{item.demography}</td>
                                              <td>{item.premiseCount}</td>
                                              <td>{item.allUnits}</td>
                                              <td>{item.newUnits}</td>
                                              <td>
                                                {item.countPremiseUnitByStatus?.map(
                                                  (one) => (
                                                    <div className="d-flex justify-content-start gap-3">
                                                      <strong>{one.sum}</strong>
                                                      <span>{one.status} </span>
                                                    </div>
                                                  )
                                                )}
                                              </td>
                                              <td>
                                                <div className="d-flex justify-content-end">
                                                  <div className="dropdown">
                                                    <a
                                                      className="text-muted font-size-16"
                                                      role="button"
                                                      data-bs-toggle="dropdown"
                                                      aria-haspopup="true"
                                                    >
                                                      <i className="bx bx-dots-vertical-rounded"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end ">
                                                      <a
                                                        className="dropdown-item cursor-pointer"
                                                        onClick={() => {
                                                          // getOneBulkmessage(item);
                                                        }}
                                                      >
                                                        <i className="font-size-15 mdi mdi-eye me-3 "></i>
                                                        View
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="mt-4 mb-0 flex justify-between px-8">
                                  {/*<div>*/}
                                  {/*  <select*/}
                                  {/*    className={"btn btn-primary"}*/}
                                  {/*    name=""*/}
                                  {/*    id=""*/}
                                  {/*    // value={size}*/}
                                  {/*    // onChange={(e) => sortSize(e)}*/}
                                  {/*  >*/}
                                  {/*    <option value={parseInt(5)}>5 rows</option>*/}
                                  {/*    <option value={parseInt(10)}>10 rows</option>*/}
                                  {/*    <option value={parseInt(20)}>20 rows</option>*/}
                                  {/*  </select>*/}
                                  {/*</div>*/}
                                  {/*{pageCount !== 0 && (*/}
                                  {/*  <p className=" font-medium text-xs text-gray-700">*/}
                                  {/*    {" "}*/}
                                  {/*    showing page{" "}*/}
                                  {/*    <span className="text-green-700 text-opacity-100 font-bold text-sm">*/}
                                  {/*      {page + 1}*/}
                                  {/*    </span>{" "}*/}
                                  {/*    of{" "}*/}
                                  {/*    <span className="text-sm font-bold text-black">*/}
                                  {/*      {pageCount}*/}
                                  {/*    </span>{" "}*/}
                                  {/*    pages*/}
                                  {/*  </p>*/}
                                  {/*)}*/}

                                  {/*{pageCount !== 0 && (*/}
                                  {/*  <ReactPaginate*/}
                                  {/*    previousLabel={"prev"}*/}
                                  {/*    nextLabel={"next"}*/}
                                  {/*    breakLabel={"..."}*/}
                                  {/*    pageCount={pageCount} // total number of pages needed*/}
                                  {/*    marginPagesDisplayed={2}*/}
                                  {/*    pageRangeDisplayed={1}*/}
                                  {/*    onPageChange={handlePageClick}*/}
                                  {/*    breakClassName={"page-item"}*/}
                                  {/*    breakLinkClassName={"page-link"}*/}
                                  {/*    containerClassName={"pagination"}*/}
                                  {/*    pageClassName={"page-item"}*/}
                                  {/*    pageLinkClassName={"page-link"}*/}
                                  {/*    previousClassName={"page-item"}*/}
                                  {/*    previousLinkClassName={"page-link"}*/}
                                  {/*    nextClassName={"page-item"}*/}
                                  {/*    nextLinkClassName={"page-link"}*/}
                                  {/*    activeClassName={"active"}*/}
                                  {/*  />*/}
                                  {/*)}*/}
                                </div>
                              </>
                            </div>
                          </div>
                        )}
                        {reports === {} && (
                          <div className="alert alert-danger">
                            No records found
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>

            <footer className="footer ">
              <div className="container-fluid ">
                <div className="row ">
                  <div className="col-sm-6 ">
                    <script>document.write(new Date().getFullYear())</script>©
                    RevenueSure
                  </div>
                  <div className="col-sm-6 ">
                    <div className="text-sm-end d-sm-block ">
                      A product of Nouveta LTD
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </>
    </>
  );
}
