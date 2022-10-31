/* global $*/
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import ReactPaginate from "react-paginate";

export default function AdminArrears() {
  const [ searchParams ] = useSearchParams();
  const [clientCountyName ] = useState(
    searchParams.get("county")
  );
  var mL = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [reports, setreports] = useState([]);
  const [zones, setzones] = useState([]);
  const [estates, setestates] = useState([]);
  const [zoneId, setZoneId] = useState("");
  const [estateId, setestateId] = useState("");
  const [clientcounties, setClientCounties] = useState([]);
  const [month, setmonth] = useState(mL[new Date().getMonth()]);
  const [countyId, setCounty] = useState("");
  const [months, setmonths] = useState([]);

  const fetchAll = () => {
    requestsServiceService.getClientCounties().then((res) => {
      setClientCounties(res.data.data);
    });
  };

  const [date, setDate] = useState({
    startDate: moment().subtract(7, "d").format("DD-MM-YYYY"),
    endDate: "",
  });

  const handleCallback = (sD, eD) => {
    let sd = moment(sD).format("YYYY/MM/DD");
    let ed = moment(eD).format("YYYY/MM/DD");
    setDate({
      ...date,
      startDate: sd,
      endDate: ed,
    });
  };

  useEffect(() => {
    if (searchParams.get("county") === null) {
      fetchFiltered(countyId, zoneId, estateId);
      setactiveshit("COUNTIES");
    } else {
      setactiveshit("ZONES");
      let x = clientcounties.filter(
        (item) => item?.county?.name === clientCountyName
      );
      if (x[0] !== undefined) {
        setCounty(x[0].id);
        fetchFiltered(x[0].id, zoneId, estateId);
      }
    }
  }, [clientcounties]);

  const sort = () => {
    fetchFiltered(countyId, zoneId, estateId);
    setestateId("");
  };

  const [reportData, setreportData] = useState({});
  const [reportInfo, setreportInfo] = useState([]);

  const fetchFiltered = (x, y, z) => {
    requestsServiceService.getReportData(x, y, z).then((res) => {
      let v = res.data.data;
      let tempdata = {
        county: v.county,
        estate: v.estate,
        zone: v.zone,
        premise: v.premise,
      };
      setmonths(
        res.data.data?.ageReportModels?.map((item) => item.invoicePeriod)
      );
      setreportData(tempdata);
      setreportInfo(v.ageReportModels);
    });
  };

  const getEstates = () => {
    requestsServiceService.getAllEstates().then((res) => {
      setestates(res.data.data);
    });
  };
  const getZones = () => {
    requestsServiceService.getAllZones().then((res) => {
      setzones(res.data.data);
    });
  };
  useEffect(() => {
    fetchAll();
    getZones();
    getEstates();
  }, []);

  const formatCurrency = (x) => {
    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    });
    return formatCurrency.format(x);
  };
  const [activeshit, setactiveshit] = useState("");
  function doShit(item) {
    if (window.location.href.toString().includes("county")) {
      if (countyId && !zoneId) {
        let x = zones.find((z) => z.name === item.demography);
        setZoneId(x.id);
        setactiveshit("ESTATES");
        fetchFiltered(countyId, x.id, estateId);
      }
      if (zoneId) {
        let x = estates.find((z) => z.name === item.demography);
        setestateId(x.id);
        setactiveshit("PREMISES");
        fetchFiltered(countyId, zoneId, x.id);
      }
    } else {
      if (countyId === "") {
        let x = clientcounties.find((z) => z.county?.name === item.demography);
        setCounty(x.id);
        setactiveshit("ZONES");
        fetchFiltered(x.id, zoneId, estateId);
      }
      if (searchParams.get("county") === null && countyId && !zoneId) {
        let x = zones.find((z) => z.name === item.demography);
        setZoneId(x.id);
        setactiveshit("ESTATES");
        fetchFiltered(countyId, x.id, estateId);
      }
      if (countyId && zoneId) {
        let x = estates.find((z) => z.name === item.demography);
        setestateId(x.id);
        setactiveshit("PREMISES");
        fetchFiltered(countyId, zoneId, x.id);
      }
    }
  }

  function undoShit(item) {
    if (window.location.href.toString().includes("county")) {
      setestateId("");
      setZoneId("");
      let x = clientcounties.filter(
        (item) => item?.county?.name === clientCountyName
      );
      if (x[0] !== undefined) {
        setCounty(x[0].id);
        fetchFiltered(x[0].id, "", "");
      }
    } else {
      setCounty("");
      setZoneId("");
      setactiveshit("COUNTIES");
      fetchFiltered("", "", "");
    }
  }

  // PAGINATION
  const sortSize = (e) => {
    setSize(e.target.value);
  };
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setreports(reportInfo.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(reportInfo.length / size));
  }, [itemOffset, size, reportInfo]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * size) % reportInfo.length;
    setItemOffset(newOffset);
    setPage(event.selected);
        // LOADER ANIMATION  
        $("#spinner").removeClass("d-none");
        setTimeout(() => {
            $("#spinner").addClass("d-none");
        }, 500);
  };

   // LOADER ANIMATION
   useEffect(()=>{
    $("#spinner").removeClass("d-none");
    setTimeout(() => {
        $("#spinner").addClass("d-none");
    }, 1000);
   },[])

  return (
    <>
      <>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div id="spinner">
                <div id="status">
                  <div className="spinner-chase">
                    <div className="chase-dot"></div>
                    <div className="chase-dot"></div>
                    <div className="chase-dot"></div>
                    <div className="chase-dot"></div>
                    <div className="chase-dot"></div>
                    <div className="chase-dot"></div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0 font-size-18 text-capitalize">
                    Arrears Reports
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
                        Arrears Reports
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                    <div
                      className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                      role="toolbar"
                    >
                      <h4 className="card-title text-capitalize mb-0 ">
                        Admin Reports
                      </h4>
                    </div>
                    <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                      <div
                        className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                        role="toolbar"
                      >
                        <div className="d-flex align-items-center flex-grow-1"></div>
                        <div className="d-flex">
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
                                    {parseInt(zone.clientCounty?.id) ===
                                      parseInt(countyId) && (
                                      <option
                                        key={zone.id}
                                        value={zone.id}
                                        selected={zone.id === zoneId}
                                      >
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
                                  <>
                                    {parseInt(estate.zone?.id) ===
                                      parseInt(zoneId) && (
                                      <option
                                        key={estate.id}
                                        value={estate.id}
                                        selected={estate.id === estateId}
                                      >
                                        {estate.name}
                                      </option>
                                    )}
                                  </>
                                ))}
                              </select>
                            </div>
                            <button className="btn btn-primary" onClick={sort}>
                              filter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center pr-3">
                      <div className="d-flex">
                        <div className="text-start">
                          <select
                            className={"form-control"}
                            name=""
                            id=""
                            onChange={(e) => setmonth(e.target.value)}
                          >
                            <option value="">Select month</option>
                            {months?.map((item, index) => (
                              <option
                                value={item}
                                key={index}
                                selected={mL[new Date().getMonth()]}
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
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
                              <strong className="text-muted">County:</strong>
                              <br />
                              {reportData?.county}
                            </p>
                          </div>
                          <div className="card-body d-flex gap-4">
                            <p className="p-0 m-0">
                              <span className="mdi mdi-map-marker me-2 font-18px"></span>
                            </p>
                            <p className="p-0 m-0">
                              <strong className="text-muted">Zone:</strong>
                              <br />
                              {reportData?.zone}
                            </p>
                          </div>
                          <div className="card-body d-flex gap-4 align-items-center">
                            <p className="p-0 m-0">
                              <span className="mdi mdi-home-group me-2 font-18px"></span>
                            </p>
                            <p className="p-0 m-0">
                              <strong className="text-muted">Estate</strong>
                              <br />
                              {reportData?.estate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-10">
                        <div className="table-responsive">
                          <table
                            className="table align-middle table-hover  contacts-table table-striped "
                            id="datatable-buttons"
                          >
                            <thead className="table-light">
                              <tr className="table-light">
                                <th>Demography</th>
                                <th>Invoice Period</th>
                                <th>Invoice Count</th>
                                <th>Invoice Sum</th>
                                <th>Paid Amount</th>
                                <th>Collection Rate</th>
                                <th className="text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reports.length > 0 &&
                                reports?.map((item) => (
                                  <>
                                    {item.invoicePeriod === month && (
                                      <tr data-id={item.id} key={item.id}>
                                        <td className={"text-capitalize"}>
                                          {item.demography}
                                        </td>
                                        <td>{item.invoicePeriod}</td>
                                        <td>{item.countAll}</td>
                                        <td>{formatCurrency(item.sum)}</td>
                                        <td>{formatCurrency(item.paid)}</td>
                                        <td>{item.collectionRate}</td>
                                        <td>
                                          <div className="d-flex justify-content-end">
                                            {/*<button type="button"*/}
                                            {/*        className="btn btn-primary btn-sm waves-effect waves-light text-nowrap me-3"*/}
                                            {/*        // onClick={() => getOnemessage(item?.transaction.transactionId)}*/}
                                            {/*        >Receive Payment*/}
                                            {/*</button>*/}
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
                                                    doShit(item);
                                                  }}
                                                >
                                                  <i className="font-size-15 mdi mdi-eye me-3 "></i>
                                                  View {item.demography}
                                                </a>
                                                <a
                                                  className="dropdown-item cursor-pointer"
                                                  onClick={() => {
                                                    undoShit(item);
                                                  }}
                                                >
                                                  <i className="font-size-15 mdi mdi-refresh me-3 "></i>
                                                  Reset
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </>
                                ))}
                            </tbody>
                          </table>
                          <div className="d-flex justify-content-between align-items-center">
                            {pageCount !== 0 && (
                              <>
                                <select
                                  className="btn btn-md btn-primary"
                                  title="Select A range"
                                  onChange={(e) => sortSize(e)}
                                  value={size}
                                >
                                  <option className="bs-title-option" value="">
                                    Select A range
                                  </option>
                                  <option value="1">10 Rows</option>
                                  <option value="30">30 Rows</option>
                                  <option value="50">50 Rows</option>
                                </select>
                                <nav
                                  aria-label="Page navigation comments"
                                  className="mt-4"
                                >
                                  <ReactPaginate
                                    previousLabel="<"
                                    nextLabel=">"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    pageCount={pageCount}
                                    pageRangeDisplayed={4}
                                    marginPagesDisplayed={2}
                                    containerClassName="pagination justify-content-center"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    activeClassName="active"
                                    onPageChange={(data) =>
                                      handlePageClick(data)
                                    }
                                  />
                                </nav>
                              </>
                            )}
                          </div>
                          {pageCount !== 0 && (
                            <p className="font-medium  text-muted">
                              showing page{" "}
                              <span className="text-primary">
                                {pageCount === 0 ? page : page + 1}
                              </span>{" "}
                              of
                              <span className="text-primary">
                                {" "}
                                {pageCount}
                              </span>{" "}
                              pages
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
