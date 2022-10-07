/* global $ */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import DatePicker from "react-datepicker";
import { Modal, Badge, Button } from "react-bootstrap";

export default function CreateStatement() {
  const navigate = useNavigate();
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
  };

  useEffect(() => {
    if (recipient === "USER") {
      getAuctioneer();
    }
  }, [recipient === "USER"]);
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
  const getAuctioneer = () => {
    requestsServiceService.getData("AUCTIONEER").then((res) => {
      setfoundRecipients(res.data.data);
    });
  };

  useEffect(() => {
    if (recipientId !== "") {
      getUnpaidCharges();
      getEntityDetails();
    }
  }, [recipientId]);

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
  };

  const getUnpaidCharges = () => {
    requestsServiceService
      .fetchEntityPendingTotals(recipient, recipientId)
      .then((res) => {
        console.log(res.data.data);
        setunpaidCharges(res.data.data);
      });
  };

  const [datas, setdatas] = useState([]);
  function handleForm(e, index, transaction) {
    let newArr = [...datas];
    newArr[index] = {
      code: transaction.status,
      name: "",
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
        sum += parseInt(item.balance);
      });
      return sum;
    }
  };

  const createStatement = (e) => {
    e.preventDefault();
    var data = {
      allocations: datas,
      billNo: invoicePresent ? invNo : uuid().toString().toUpperCase(),
      landLordFileNumber: null,
      paidBy: null,
      payReferenceNo: null,
      paymentMode: paymentMode,
      receiptAmount: null,
      receiptNo: receiptNo === "" ? uuid().toString().toUpperCase() : receiptNo,
      tenancyFileNumber: null,
      tenantNumber: null,
      userName: null,
    };
    if (recipient === "USER") {
      let d = {
        userName: recipientPerson.userName,
      };
      var x = Object.assign(data, d);
    }
    if (recipient === "LANDLORD") {
      let d = {
        landLordFileNumber: recipientPerson.fileNumber,
      };
      var x = Object.assign(data, d);
    }
    if (recipient === "TENANT") {
      let d = {
        tenantNumber: recipientPerson.fileNumber,
        tenancyFileNumber: tenancyFileNo,
      };
      var x = Object.assign(data, d);
    }
    requestsServiceService
      .createStatements(x)
      .then((res) => {
        if (res.data.status === true) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
          setTimeout(() => {
            navigate("/unallocated-payments", { replace: true });
          }, 2000);
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "danger",
          });
        }
      })
      .catch((err) => {
        setError({
          ...error,
          message: err.response.data.error,
          color: "danger",
        });
      });
    setTimeout(() => {
      setError({
        ...error,
        message: "",
        color: "",
      });
    }, 3500);
  };
  function uuid() {
    return "XXXXXXXXXXX".replace(/[XY]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "X" ? r : (r & 0x7) | 0x10;
      v = v.toString(16);
      return v.toUpperCase();
    });
  }

  const [invoicePresent, setInvoicePresent] = useState(false);
  const [invNo, setinvNo] = useState("");
  const [paymentMode, setpaymentMode] = useState("");
  const [recipientPerson, setrecipientPerson] = useState({});
  const [receiptAmount, setreceiptAmount] = useState("");
  const [payerName, setpayerName] = useState("");
  const [receiptNo, setreceiptNo] = useState("");
  const [tenancyFileNo, setTenancyFileNo] = useState("");

  useEffect(() => {
    console.log(recipientPerson);
  }, [recipientPerson]);
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
                        {/*<button*/}
                        {/*  className={"btn btn-primary"}*/}
                        {/*  onClick={showModal}*/}
                        {/*>*/}
                        {/*  Create New Statement*/}
                        {/*</button>*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="bg-primary border-2 bg-soft p-3 mb-4">
                      <p className="fw-semibold mb-0 pb-0 text-uppercase">
                        Select Recipient Type
                      </p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Select recipient</label>
                    <strong className="text-danger">*</strong>
                    <select
                      name=""
                      id=""
                      onChange={(e) => setrecipient(e.target.value)}
                      className={"form-control"}
                      disabled={recipient !== ""}
                    >
                      <option value={""}>--Select--</option>
                      <option value="TENANT">TENANT</option>
                      <option value="LANDLORD">LANDLORD</option>
                      <option value="USER">AUCTIONEER</option>
                    </select>
                  </div>
                  <div className="col-12">
                    {recipient !== "USER" && (
                      <>
                        <form onSubmit={searchRecipient}>
                          <label htmlFor="" className={"mt-3 mb-3"}>
                            Search Recipient
                          </label>
                          <strong className="text-danger">*</strong>
                          <div className="app-search d-none d-lg-block d-flex">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={"Search.."}
                                required={true}
                                onChange={(e) =>
                                  setSearchRecipient(e.target.value)
                                }
                              />
                              <span className="bx bx-search-alt"></span>
                            </div>
                          </div>
                          <button
                            type={"submit"}
                            disabled={recipient === ""}
                            className={"btn btn-primary mt-2 btn-sm"}
                          >
                            Search
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                  <br />
                  <>
                    <div className="col-12">
                      <div className="bg-primary border-2 bg-soft p-3 mb-2 mt-4">
                        <p className="fw-semibold mb-0 pb-0 text-uppercase">
                          Select Recipient
                        </p>
                      </div>
                    </div>
                    <div className={"row mt-2"}>
                      <div className="col-6">
                        {foundRecipients.length < 5 && (
                          <>
                            {recipient === "USER" ? (
                              <>
                                {foundRecipients?.map((item) => (
                                  <>
                                    <div className={"mt-2"}>
                                      <input
                                        type="checkbox"
                                        onChange={(e) => {
                                          setRecipientId(item.user.id);
                                          setrecipientPerson(item.user);
                                        }}
                                        checked={item.user.id === recipientId}
                                        style={{ marginRight: "5px" }}
                                      />
                                      <label
                                        className={"form-check-label"}
                                        style={{ marginLeft: "5px" }}
                                      >
                                        {item?.user.firstName}{" "}
                                        {item?.user.lastName}
                                      </label>
                                    </div>
                                  </>
                                ))}
                              </>
                            ) : (
                              <>
                                {foundRecipients?.map((item) => (
                                  <>
                                    <div className={"mt-2 text-capitalize"}>
                                      <input
                                        type="checkbox"
                                        onChange={(e) => {
                                          setRecipientId(item.id);
                                          setrecipientPerson(item);
                                        }}
                                        checked={item.id === recipientId}
                                        style={{ marginRight: "5px" }}
                                      />
                                      <label
                                        className={"form-check-label"}
                                        style={{ marginLeft: "5px" }}
                                      >
                                        {recipient === "TENANT" && (
                                          <>
                                            {item?.tenantType ===
                                            "INDIVIDUAL" ? (
                                              <>
                                                {item.firstName + " "}
                                                {item.lastName + " "}{" "}
                                                {item.otherName}
                                              </>
                                            ) : (
                                              <>{item.companyName + " "}</>
                                            )}
                                          </>
                                        )}
                                        {recipient !== "TENANT" && (
                                          <>
                                            {item?.firstName} {item?.lastName}
                                          </>
                                        )}
                                      </label>
                                    </div>
                                  </>
                                ))}
                              </>
                            )}
                          </>
                        )}
                      </div>
                      {recipient === "TENANT" && tenancies?.length > 0 && (
                        <div className="col-6">
                          <div className="bg-primary border-2 bg-soft p-3 mb-2 mt-4">
                            <p className="fw-semibold mb-0 pb-0 text-uppercase">
                              Tenancies ({tenancies?.length})
                            </p>
                          </div>
                          {recipient === "TENANT" && (
                            <>
                              {tenancies?.map((item) => (
                                <>
                                  <div className={"mt-2"}>
                                    <input
                                      type="checkbox"
                                      onChange={(e) => {
                                        setTenancyId(item.id);
                                        setTenancyFileNo(item.fileNumber);
                                      }}
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
                <br />
                <div className="col-12">
                  <div className="bg-primary border-2 bg-soft p-3 mb-2 mt-4">
                    <p className="fw-semibold mb-0 pb-0 text-uppercase">
                      Payment Information
                    </p>
                  </div>
                </div>
                <form onSubmit={createStatement} id={"create-statements"}>
                  <div className="col-12">
                    <div className={"mt-3"}>
                      <input
                        type="checkbox"
                        onChange={(e) => setInvoicePresent(!invoicePresent)}
                        checked={invoicePresent}
                        style={{ marginRight: "5px" }}
                      />
                      <label
                        className={"form-check-label"}
                        style={{ marginLeft: "5px" }}
                      >
                        Invoice Present?
                      </label>
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    {invoicePresent && (
                      <>
                        <div className="">
                          <label htmlFor="">Enter Invoice Number</label>
                          <input
                            type="text"
                            placeholder={"Enter Invoice Number"}
                            onChange={(e) => setinvNo(e.target.value)}
                            className={"form-control"}
                            required={invoicePresent ? true : false}
                          />
                        </div>
                        <br />
                      </>
                    )}
                  </div>
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="">Select Payment Mode</label>
                      <strong className="text-danger">*</strong>
                      <select
                        name=""
                        id=""
                        onChange={(e) => setpaymentMode(e.target.value)}
                        className={"form-control"}
                      >
                        <option value={"CASH"}>--Select--</option>
                        <option value="CASH">CASH</option>
                        <option value="BANK">BANK</option>
                        <option value="EFT">EFT</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <>
                      <label htmlFor="">Amount</label>
                      <strong className="text-danger">*</strong>
                      <input
                        type="text"
                        placeholder={"Enter Amount"}
                        onChange={(e) => setreceiptAmount(e.target.value)}
                        className={"form-control"}
                        required
                      />
                      <br />
                      <label htmlFor="">ReceiptNo</label>
                      <input
                        type="text"
                        placeholder={"Enter Receipt No"}
                        onChange={(e) => setreceiptNo(e.target.value)}
                        className={"form-control"}
                      />
                    </>
                  </div>
                  {unpaidCharges?.length > 0 && (
                    <>
                      <div className="bg-primary border-2 bg-soft p-3 mb-2 mt-4">
                        <p className="fw-semibold mb-0 pb-0 text-uppercase">
                          Applicable Charges ({unpaidCharges?.length})
                        </p>
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
                                  <td>{formatCurrency(item.balance)}</td>
                                  <td>{formatCurrency(item.sum)}</td>
                                  {/*<td>{formatCurrency(item.billPaidAmount)}</td>*/}
                                  <td></td>
                                  <td className="text-end">
                                    {formatCurrency(item.balance - item.sum)}
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control form-control-sm text-right"
                                      // placeholder="Input amount"
                                      placeholder="KES"
                                      onChange={(e) =>
                                        handleForm(e, index, item)
                                      }
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
                                {total(unpaidCharges) - debitTotal() > 0 ? (
                                  <>
                                    <strong className={"text-danger"}>
                                      Balance
                                    </strong>
                                  </>
                                ) : (
                                  <>
                                    <strong className={"text-success"}>
                                      Balance
                                    </strong>
                                  </>
                                )}
                              </td>
                              <td className="text-end fw-bold">
                                {total(unpaidCharges) - debitTotal() > 0 ? (
                                  <>
                                    <strong className={"text-danger"}>
                                      {formatCurrency(
                                        total(unpaidCharges) - debitTotal()
                                      )}
                                    </strong>
                                  </>
                                ) : (
                                  <>
                                    <strong className={"text-success"}>
                                      {formatCurrency(
                                        total(unpaidCharges) - debitTotal()
                                      )}
                                    </strong>
                                  </>
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
                    </>
                  )}
                </form>
                <div className="col-12">
                  {error.color !== "" && (
                    <div
                      className={"mt-3 mb-4 alert alert-" + error.color}
                      role="alert"
                    >
                      {error.message}
                    </div>
                  )}
                </div>
                <div className={"col-3"}>
                  <div>
                    <Button
                      variant="primary"
                      type={"submit"}
                      form={"create-statements"}
                      className={"mt-3"}
                      disabled={foundRecipients.length < 1}
                    >
                      Create Statement
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
