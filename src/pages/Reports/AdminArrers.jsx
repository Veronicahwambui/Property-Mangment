/* global $*/
import React, { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";

export default function AdminArrears() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [clientCountyName, setclientCountyName] = useState(
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
  const [reports, setreports] = useState({});
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
    console.log(date);
  }, [date]);

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

  // useEffect(() => {
  //   fetchFiltered(countyId, zoneId, estateId);
  // }, [countyId]);

  const fetchFiltered = (x, y, z) => {
    requestsServiceService.getReportData(x, y, z).then((res) => {
      setreports(res.data.data);
      setmonths(
        res.data.data?.ageReportModels?.map((item) => item.invoicePeriod)
      );
      $("#spinner").addClass("d-none");
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
  const getZones = () => {
    requestsServiceService.getAllZones().then((res) => {
      setzones(res.data.data);
    });
  };

  useEffect(() => {
    getEstates(zoneId);
  }, [zoneId]);

  useEffect(() => {
    fetchAll();
    getZones();
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
              {reports !== {} ? (
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
                                      onChange={(e) =>
                                        setCounty(e.target.value)
                                      }
                                    >
                                      <option value="">Select County</option>
                                      {clientcounties?.map((item) => (
                                        <option
                                          value={item.id}
                                          key={item.id}
                                          selected={
                                            item.county.name ===
                                            clientCountyName
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
                                      onChange={(e) =>
                                        setZoneId(e.target.value)
                                      }
                                    >
                                      <option value=""> Select zone...</option>
                                      {zones?.map((zone) => (
                                        <>
                                          {zone.clientCounty?.county?.name ===
                                            clientCountyName && (
                                            <option
                                              key={zone.id}
                                              value={zone.id}
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
                                      onChange={(e) =>
                                        setestateId(e.target.value)
                                      }
                                    >
                                      <option value="">
                                        {" "}
                                        Select estate...
                                      </option>
                                      {estates?.map((estate) => (
                                        <option
                                          key={estate.id}
                                          value={estate.id}
                                        >
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
                                  {months?.map((item) => (
                                    <option
                                      value={item}
                                      key={item}
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
                                    {reports !== {} &&
                                      reports.ageReportModels?.map(
                                        (item, index) => (
                                          <>
                                            {item.invoicePeriod === month && (
                                              <tr data-id={index} key={index}>
                                                <td
                                                  className={"text-capitalize"}
                                                >
                                                  {item.demography}
                                                </td>
                                                <td>{item.invoicePeriod}</td>
                                                <td>{item.countAll}</td>
                                                <td>
                                                  {formatCurrency(item.sum)}
                                                </td>
                                                <td>
                                                  {formatCurrency(item.paid)}
                                                </td>
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
                                        )
                                      )}
                                  </tbody>
                                </table>
                              </div>
                              <div className="mt-4 mb-0 flex justify-between px-8"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={"alert alert-danger"}>No records found</div>
                </>
              )}
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
