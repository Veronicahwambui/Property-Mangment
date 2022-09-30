/* global $ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import DatePicker from "react-datepicker";
import { Modal, Badge, Button } from "react-bootstrap";

export default function CreateStatement() {
  const [sDate, setsdate] = useState(new Date());
  const [eDate, setedate] = useState(new Date());
  const [chargeId, setchargeId] = useState(undefined);
  const [lids, setlids] = useState([]);

  useEffect(() => {
    getCharges();
  }, []);
  const [charges, setcharges] = useState([]);
  const getCharges = () => {
    requestsServiceService.allApplicableCharges().then((res) => {
      setcharges(res.data.data);
    });
  };

  //settlement modals
  function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max - 5;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  }
  const yearArray = generateArrayOfYears();

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [settlement_show, setsettlementshow] = useState(true);
  const showSettlement = () => setsettlementshow(true);
  const hideSettlement = () => setsettlementshow(false);
  const [check, setCheck] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [landlords, setlandlords] = useState([]);
  const [auctioneers, setAuctioneers] = useState([]);
  useEffect(() => {
    let x = new Date(`01 ${month} ${year}`);
    setsdate(moment(x).startOf("month").format("YYYY-MM-DD"));
    setedate(moment(x).endOf("month").format("YYYY-MM-DD"));
  }, [year, month]);
  const [selectedItems, setselectedItems] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    getLandlords();
  };
  const selectItems = (e, x) => {
    if (e.target.checked) {
      setselectedItems((selectedItems) => [...selectedItems, x]);
    } else {
      removeItems(x.id);
    }
  };
  const removeItems = (x) => {
    setselectedItems([...selectedItems.filter((item) => item.id !== x)]);
  };

  // const removeItems = (x) => {
  //   setlids([...lids.filter((item) => item !== x)]);
  // };
  const getLandlords = () => {
    let page = 0,
      size = 100;
    let data = {
      dateCreatedEnd: new Date(),
      dateCreatedStart: moment(new Date()).startOf("year").format(),
      search: searchTerm?.trim(),
    };
    requestsServiceService.getLandLords(page, size, data).then((res) => {
      setlandlords(res.data.data);
    });
  };
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  useEffect(() => {
    setlids(selectedItems?.map((a) => a.id));
  }, [selectedItems]);

  const submitSettlement = () => {
    let data = {
      chargeId: parseInt(chargeId),
      endDate: moment(eDate).format(),
      landlordId: lids,
      periodAlias: month + " " + year,
      startDate: moment(sDate).format(),
    };
    requestsServiceService
      .createSettlements(data)
      .then((response) => {
        if (response.data.status === true) {
          setError({
            ...error,
            message: response.data.message,
            color: "success",
          });
        } else {
          setError({
            ...error,
            message: response.data.message,
            color: "danger",
          });
        }
      })
      .catch((err) => {});
  };
  const months = [
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
  const [palias, setpalias] = useState("");

  // TEST CODE
  const [show, setshow] = useState(false);
  const showModal = () => setshow(true);
  const hideModal = () => setshow(false);
  const [recipient, setrecipient] = useState("");
  const [searchrecipient, setSearchRecipient] = useState("");
  const [foundRecipients, setfoundRecipients] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const [unpaidCharges, setunpaidCharges] = useState([]);
  const searchRecipient = (e) => {
    e.preventDefault();
    setfoundRecipients([]);
    setunpaidCharges([]);
    var size = 10;
    var page = 0;
    var dates = {
      dateCreatedEnd: new Date(),
      dateCreatedStart: moment(new Date()).startOf("year").format(),
    };
    if (recipient === "TENANT") {
      let s = {
        search: searchrecipient.trim(),
      };
      let data = Object.assign(dates, s);
      getTenants(searchTerm, page, size, data);
    } else if (recipient === "LANDLORD") {
      let s = {
        search: searchrecipient.trim(),
      };
      let data = Object.assign(dates, s);
      getLandlords2(page, size, data);
    }
    if (recipient === "INVOICE") {
      getInvoices(searchrecipient);
    }
    if (recipient === "AUCTIONEER") {
      getAuctioneer();
    }
  };
  const getTenants = (w, x, y, z) => {
    requestsServiceService.getAllTenants(w, x, y, z).then((res) => {
      setfoundRecipients(res.data.data);
    });
  };
  const getLandlords2 = (x, y, z) => {
    requestsServiceService.getLandLords(x, y, z).then((res) => {
      setfoundRecipients(res.data.data);
    });
  };
  const getInvoices = (x) => {
    requestsServiceService.getParentInvoice(x).then((res) => {
      setfoundRecipients(res.data.data);
    });
  };
  const getAuctioneer = () => {
    requestsServiceService.getData(recipient).then((res) => {
      setfoundRecipients(res.data.data);
    });
  };

  useEffect(() => {
    if (recipientId !== "") {
      getUnpaidCharges();
      getEntityDetails();
    }
  }, [recipientId]);

  useEffect(() => {
    console.log(foundRecipients);
  }, []);

  const [receivedData, setRECEIVEDDATA] = useState([]);
  const [tenancies, setTenancies] = useState([]);
  const [tenancyId, setTenancyId] = useState("");
  const getEntityDetails = () => {
    setunpaidCharges([]);
    setRECEIVEDDATA([]);
    if (recipient === "TENANT") {
      requestsServiceService.viewTenant(recipientId).then((res) => {
        setRECEIVEDDATA(res.data.data);
        setTenancies(res.data.data.tenancies);
      });
    }
    if (recipient === "USER") {
      requestsServiceService.getData(recipientId).then((res) => {
        setRECEIVEDDATA(res.data.data);
      });
    }
    if (recipient === "LANDLORD") {
      requestsServiceService.getLandlord(recipientId).then((res) => {
        setRECEIVEDDATA(res.data.data);
      });
    }
    if (recipient === "INVOICE") {
    }
  };

  const getUnpaidCharges = () => {
    if (recipientId !== "") {
      requestsServiceService
        .fetchEntityPendingTotals(recipient, recipientId)
        .then((res) => {
          console.log(res.data.data);
          setunpaidCharges(res.data.data);
        });
    }
  };

  const [datas, setdatas] = useState([]);
  function handleForm(e, index, transaction) {
    let newArr = [...datas];
    newArr[index] = {
      code: transaction.all,
      name: transaction.status,
      value: parseInt(e.target.value),
    };
    setdatas(newArr);
  }
  const debitTotal = () => {
    let sum = 0;
    datas?.map((item) => {
      sum += parseInt(item.value);
    });
    return sum;
  };

  useEffect(() => {
    debitTotal();
  }, [datas]);
  const formatCurrency = (x) => {
    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    });
    return formatCurrency.format(x);
  };

  const total = (x) => {
    if (x !== []) {
      let sum = 0;
      x?.map((item) => {
        sum += item.balance;
      });
      return sum;
    }
  };

  const createStatement = () => {
    let d = {
      allocations: datas,
      billNo: "string",
      landLordFileNumber: "string",
      paidBy: "string",
      payReferenceNo: uuid().toString().toUpperCase(),
      paymentMode: "CASH",
      receiptAmount: "string",
      receiptNo: "string",
      tenancyFileNumber: "",
      tenantNumber: "string",
      userName: "",
    };
    console.log(d);
  };
  function uuid() {
    return "XXXXXXXXXXX".replace(/[XY]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "X" ? r : (r & 0x7) | 0x10;
      v = v.toString(16);
      return v.toUpperCase();
    });
  }
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">New Statement</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboards</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Statements</a>
                  </li>
                  <li className="breadcrumb-item active">Create Statements</li>
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
                    {/*Statements*/}
                  </h4>
                  <div className="d-flex justify-content-end align-items-center">
                    <div>
                      <div>
                        <button
                          className={"btn btn-primary"}
                          onClick={showModal}
                        >
                          Create New Statement
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="form-group">
                    <label htmlFor="">Select recipient</label>
                    <select
                      name=""
                      id=""
                      onChange={(e) => setrecipient(e.target.value)}
                      className={"form-control"}
                    >
                      <option value={""}>--Select--</option>
                      <option value="TENANT">TENANT</option>
                      <option value="LANDLORD">LANDLORD</option>
                      {/*<option value="AUCTIONEER ">AUCTIONEER</option>*/}
                    </select>
                  </div>
                  <div className="form-group mt-2">
                    <br />

                    <form onSubmit={searchRecipient}>
                      <label htmlFor="">Search recipient</label>
                      {recipient !== "AUCTIONEER" && (
                        <input
                          type="text"
                          className={"form-control"}
                          onChange={(e) => setSearchRecipient(e.target.value)}
                          placeholder={"search..."}
                        />
                      )}
                      <button
                        type={"submit"}
                        className={"btn btn-primary mt-2 btn-sm"}
                      >
                        Search
                      </button>
                    </form>
                  </div>
                  <br />
                  <>
                    <div className={"row"}>
                      <div className="col-6">
                        {foundRecipients.length < 5 && (
                          <>
                            {foundRecipients?.map((item) => (
                              <>
                                <div className={"mt-2"}>
                                  <input
                                    type="checkbox"
                                    onChange={(e) => setRecipientId(item.id)}
                                    checked={item.id === recipientId}
                                    style={{ marginRight: "5px" }}
                                  />
                                  <label
                                    className={"form-check-label"}
                                    style={{ marginLeft: "5px" }}
                                  >
                                    {item?.firstName} {item?.lastName}
                                  </label>
                                </div>
                              </>
                            ))}
                          </>
                        )}
                      </div>
                      {recipient === "TENANT" && (
                        <div className="col-6 alert alert-info">
                          <p>Tenancies ({tenancies?.length})</p>
                          {recipient === "TENANT" && (
                            <>
                              {tenancies?.map((item) => (
                                <>
                                  <div className={"mt-2"}>
                                    <input
                                      type="checkbox"
                                      onChange={(e) => setTenancyId(item.id)}
                                      checked={item.id === tenancyId}
                                      style={{ marginRight: "5px" }}
                                    />
                                    <label
                                      className={"form-check-label"}
                                      style={{ marginLeft: "5px" }}
                                    >
                                      {item?.premiseUnit?.premise?.premiseName}{" "}
                                    </label>
                                  </div>
                                </>
                              ))}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                </div>
                {unpaidCharges?.length > 0 && (
                  <div className="row">
                    <div className="alert alert-info mt-3">
                      <span>Charges ({unpaidCharges?.length})</span>
                    </div>
                    <div className="col-12">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th style={{ width: "70px" }}>No.</th>
                            <th>Charge name</th>
                            <th>Invoices</th>
                            <th>Balance</th>
                            <th>Total Paid</th>
                            <th></th>
                            <th className={"text-end"}>Bill Amount</th>
                            <th className="" style={{ width: "150px" }}>
                              Assign Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {unpaidCharges?.length > 0 &&
                            unpaidCharges?.map((item, index) => (
                              <tr data-id={item.id} key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.status}</td>
                                <td>{item.all}</td>
                                <td>{formatCurrency(item.sum)}</td>
                                <td>{formatCurrency(item.balance)}</td>
                                {/*<td>{formatCurrency(item.billPaidAmount)}</td>*/}
                                <td></td>
                                <td className="text-end">
                                  {formatCurrency(item.sum - item.balance)}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm text-right"
                                    // placeholder="Input amount"
                                    placeholder="KES"
                                    onChange={(e) => handleForm(e, index, item)}
                                  />
                                </td>
                              </tr>
                            ))}
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colSpan="2" className="text-end">
                              Total
                            </td>
                            <td className="text-end fw-bold">
                              {formatCurrency(total(unpaidCharges))}
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colSpan="2" className="text-end">
                              Paid
                            </td>
                            <td className="text-end fw-bold">
                              {formatCurrency(debitTotal())}
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colSpan="2" className="text-end">
                              <strong>Balance</strong>
                            </td>
                            <td className="text-end fw-bold">
                              {formatCurrency(
                                total(unpaidCharges) - debitTotal()
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colSpan={"2"} className="text-end"></td>
                            <td className="text-end fw-bold text-danger">
                              {debitTotal() > total(unpaidCharges) ? (
                                <>
                                  <span>Amount exceeded!</span>
                                </>
                              ) : (
                                <></>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="primary"
              onClick={createStatement}
              disabled={debitTotal() > total(unpaidCharges)}
            >
              Create Statement
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
