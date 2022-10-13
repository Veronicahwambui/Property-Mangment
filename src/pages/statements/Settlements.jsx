/* global $ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Modal } from "react-bootstrap";
function Settlements() {
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

  // SLEEPING PILLS CODE
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
    } else if (recipient === "USER") {
      let s = {
        search: searchrecipient.trim(),
      };
      let data = Object.assign(dates, s);
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
  useEffect(() => {
    getUnpaidCharges();
    getEntityDetails();
  }, [recipientId]);

  const [receivedData, setRECEIVEDDATA] = useState([]);
  const getEntityDetails = () => {
    if (recipient === "TENANT") {
      requestsServiceService.viewTenant(recipientId).then((res) => {
        setRECEIVEDDATA(res.data.data);
      });
    }
    if (recipient === "USER") {
    }
    if (recipient === "LANDLORD") {
      requestsServiceService.getLandlord(recipientId).then((res) => {
        setRECEIVEDDATA(res.data.data);
      });
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
      code: transaction.transactionItemId,
      name: transaction.applicableChargeName,
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
      allocations: [
        {
          code: "string",
          name: "string",
          value: "string",
        },
      ],
      billNo: "string",
      landLordFileNumber: "string",
      paidBy: "string",
      payReferenceNo: "string",
      paymentMode: "CASH",
      receiptAmount: "string",
      receiptNo: "string",
      tenancyFileNumber: "string",
      tenantNumber: "string",
      userName: "string",
    };
  };
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">Settlements</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Dashboards</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Settlements</a>
                  </li>
                  <li className="breadcrumb-item active">Create Settlements</li>
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
                    Settlements
                  </h4>
                  <div className="d-flex justify-content-end align-items-center">
                    <div>
                      <div>
                        {/* <button
                          className={"btn btn-primary"}
                          onClick={showModal}
                        >
                          Create New Statement
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="col-12">
                  <div className="row">
                    <label htmlFor="">Landlords</label>
                    <div className="d-flex align-items-center flex-grow-1">
                      <div className="form-group d-flex">
                        <div
                          className={"form-check mb-3"}
                          style={{ marginRight: "1em" }}
                        >
                          <input
                            className="form-check-input"
                            value="Credit"
                            type="checkbox"
                            checked={check}
                            onChange={() => setCheck(true)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="debit-yes"
                          >
                            Specific
                          </label>
                        </div>
                        <div className={"form-check mb-3"}>
                          <input
                            className="form-check-input"
                            value="Credit"
                            type="checkbox"
                            checked={!check}
                            onChange={() => {
                              setCheck(false);
                              setselectedItems([]);
                              setSearchTerm("");
                              setlandlords([]);
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="debit-no"
                          >
                            All
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <>
                      <div className="col-12">
                        {check && (
                          <form
                            onSubmit={handleSearch}
                            id={"credit-search-form"}
                          >
                            <div className="app-search d-none d-lg-block d-flex">
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={"Search Landlord"}
                                  required={true}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                />
                                <span className="bx bx-search-alt"></span>
                              </div>
                            </div>
                            <button
                              className="btn btn-primary btn-sm btn-rounded"
                              type="submit"
                            >
                              Search
                            </button>
                          </form>
                        )}
                      </div>
                      <div className="col-12">
                        <div className="row justify-content-center">
                          <div className="overflow-visible">
                            {check && (
                              <table className="table align-middle table-hover contacts-table table-striped ">
                                <thead className="table-light">
                                  <tr>
                                    <th width="8px">Select</th>
                                    <th span={"col-6"}>Landlord Type</th>
                                    <th span={"col-3"}>Name</th>
                                    <th span={"col-3"}>Email</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {check && landlords?.length < 5 && (
                                    <>
                                      {landlords?.map((landlord) => (
                                        <>
                                          <tr key={landlord.id}>
                                            <td>
                                              <div className="d-flex  align-items-center">
                                                <div className="the-mail-checkbox pr-4">
                                                  <input
                                                    className="form-check-input mt-0 pt-0 form-check-dark"
                                                    type="checkbox"
                                                    id="formCheck1"
                                                    onChange={(e) =>
                                                      selectItems(e, landlord)
                                                    }
                                                    checked={selectedItems.some(
                                                      (el) =>
                                                        el.id === landlord.id
                                                    )}
                                                  />
                                                </div>
                                              </div>
                                            </td>
                                            <td>{landlord.landLordType}</td>
                                            <td className="text-capitalize">
                                              <a href="javascript:void(0)">
                                                {landlord.firstName}{" "}
                                                {landlord.lastName}
                                              </a>
                                            </td>
                                            <td>{landlord.email}</td>
                                          </tr>
                                        </>
                                      ))}
                                    </>
                                  )}
                                </tbody>
                              </table>
                            )}
                            {selectedItems.length > 0 && (
                              <div
                                className={
                                  "alert alert-warning d-flex align-items-center"
                                }
                              >
                                {selectedItems.length > 0 && (
                                  <>
                                    <Button variant="primary">
                                      Selected
                                      <Badge bg="light" className="ml-7px">
                                        <b>{selectedItems.length}</b>
                                      </Badge>
                                    </Button>
                                  </>
                                )}
                                {selectedItems.length > 0 &&
                                  selectedItems?.map((item) => (
                                    <>
                                      <>
                                        <h5 className="ml-7px" key={item.id}>
                                          <Badge bg="success">
                                            {item.firstName +
                                              " " +
                                              item.lastName}
                                          </Badge>
                                          <br />
                                          <i
                                            className="fa fa-trash cursor-pointer text-danger mt-1"
                                            onClick={() => removeItems(item.id)}
                                          ></i>
                                        </h5>
                                      </>
                                    </>
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <>
                          <div className="form-group mb-3">
                            <label htmlFor="">Applicable Charges</label>
                            <select
                              name=""
                              id=""
                              onChange={(e) => setchargeId(e.target.value)}
                              value={chargeId}
                              className={"form-control"}
                            >
                              <option>Select charge...</option>
                              {charges?.map((charge) => (
                                <option key={charge.id} value={charge.id}>
                                  {charge.name.toUpperCase()}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="">Time Period</label>
                            <div className="d-flex">
                              <div className="form-group m-2">
                                <label htmlFor="">Select year</label>
                                <select
                                  value={year}
                                  name=""
                                  id=""
                                  onChange={(e) => setYear(e.target.value)}
                                  className={"form-control"}
                                >
                                  {yearArray?.map((year) => (
                                    <option value={year} key={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="form-group m-2">
                                <label htmlFor="">Select Month</label>
                                <select
                                  name=""
                                  id=""
                                  value={month}
                                  onChange={(e) => setMonth(e.target.value)}
                                  className={"form-control"}
                                >
                                  {months?.map((month) => (
                                    <option value={month} key={month}>
                                      {month}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Start Date</label>
                            <input
                              type="text"
                              className={"form-control"}
                              value={moment(sDate).format("LL")}
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">End Date</label>
                            <input
                              type="text"
                              className={"form-control"}
                              value={moment(eDate).format("LL")}
                              disabled
                            />
                          </div>
                        </>
                      </div>
                    </>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={submitSettlement}
                  >
                    Submit
                  </button>
                  {error.color !== "" && (
                    <div
                      className={"mt-3 alert alert-" + error.color}
                      role="alert"
                    >
                      {error.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={hideModal} centered size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <option value="USER">AUCTIONEER</option>
              </select>
            </div>
            <div className="form-group mt-2">
              <br />
              <form onSubmit={searchRecipient}>
                <label htmlFor="">Search recipient</label>
                <input
                  type="text"
                  className={"form-control"}
                  onChange={(e) => setSearchRecipient(e.target.value)}
                  placeholder={"search..."}
                  required
                />
                <button
                  type={"submit"}
                  className={"btn btn-primary mt-2 btn-sm"}
                >
                  Search
                </button>
              </form>
            </div>
            <div>
              <>
                {foundRecipients.length < 5 && (
                  <>
                    {foundRecipients?.map((item) => (
                      <div className={"d-flex"}>
                        <input
                          type="checkbox"
                          onClick={(e) => setRecipientId(item.id)}
                          checked={item.id === recipientId}
                        />
                        <p>
                          {item?.firstName} {item?.lastName}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </>
            </div>
          </div>
          <div className="row">
            <div className="alert alert-info">
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
                      {formatCurrency(total(unpaidCharges) - debitTotal())}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={createStatement}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Settlements;
