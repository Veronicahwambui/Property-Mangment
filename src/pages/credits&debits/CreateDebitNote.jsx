/* global $ */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, ModalFooter } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import StatusBadge from "../../components/StatusBadge";

function CreateDebitNote() {
  const [creditTenancy, setCreditTenancy] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setselectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [landlords, setLandlords] = useState([]);
  // error handling
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  // navigation
  const navigate = useNavigate();

  // tenant details
  const [landlordId, setlandlordId] = useState(undefined);
  const [tenantName, setTenantName] = useState("");
  const [custname, setcustname] = useState("");
  const [tenantEmail, settenantEmail] = useState("");
  const [tenantPhone, settenantPhone] = useState("");
  const [tenancies, settenancies] = useState([]);
  const [tenancyId, settenancyId] = useState(undefined);
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");

  // modals and loaders
  const [invoice_show, setinvoice_show] = useState(false);
  const showInvoice = () => setinvoice_show(true);
  const [show, setshow] = useState(true);
  const showCreditModal = () => setshow(true);
  const closeCreditModal = () => setshow(false);
  const closeInvoice = () => setinvoice_show(false);

  const [loading, setloading] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [fetched, setfetched] = useState(false);
  // check ischecked
  const [isChecked, setIsChecked] = useState(false);
  const [premises, setPremises] = useState([]);

  const getLandlords = () => {
    let page = 0,
      size = 100;
    let data = {
      dateCreatedEnd: new Date(),
      dateCreatedStart: moment(new Date()).startOf("year").format(),
      search: searchTerm?.trim(),
    };
    setloading2(true);
    requestsServiceService.getLandLords(page, size, data).then((res) => {
      setLandlords(res.data.data);
      setloading(false);
      setloading2(false);
      setloaded(true);
      setfetched(true);
    });
  };
  const [transactions, settransactions] = useState([]);
  const [transactionId, settransactionId] = useState(undefined);
  // fetch invoices
  const getInvoice = (invoiceNumber) => {
    requestsServiceService.getParentInvoice(invoiceNumber).then((res) => {
      console.log(res.data.data);
      if (res.data.status === true) {
        setloading(false);
        setloaded(true);
        setfetched(true);
        setloading2(false);
        // settransactions(res.data.data);
        settransactionId(res.data.data?.transaction?.transactionId);
      } else {
        setloading(false);
        setloaded(true);
        setloading2(false);
        setfetched(true);
      }
    });
  };
  const [tItem, setTitem] = useState("");
  useEffect(() => {
    console.log(tItem);
    getInvoice(tItem);
  }, [tItem]);
  // get tenancies etc
  const getPremises = (x) => {
    let startdate = moment(new Date()).startOf("year").format("YYYY/MM/DD");
    let enddate = moment(new Date()).format("YYYY/MM/DD");
    let data = {
      dateCreatedEnd: moment(enddate).format(),
      dateCreatedStart: moment(startdate).format(),
      search: x.fileNumber.trim(),
    };
    requestsServiceService
      .getLandLordPremises(data)
      .then((res) => {
        console.log(res.data.data);
        let temp = res.data.data;
        if (res.data?.data?.length > 0) {
          setPremises(temp);
          setloading(false);
          setloaded(true);
          setIsChecked(true);
          setError({
            ...error,
            message: "",
            color: "",
          });
        } else {
          setloading(false);
          setError({
            ...error,
            message: "Landlord has no properties!",
            color: "danger",
          });
        }
      })
      .catch((err) => {
        setloading(false);
        setError({
          ...error,
          message: "Landlord has no properties!",
          color: "danger",
        });
      });
  };

  const getTransactions = () => {
    let data = {
      startDate: moment().startOf("year").toISOString(),
      endDate: moment(new Date()).toISOString(),
      tenancyId: parseInt(tenancyId),
    };
    requestsServiceService.getTransactions(data).then((res) => {
      settransactions(res.data.data);
    });
  };

  // autofill
  const autofill = (x) => {
    setlandlordId(x.id);
    setfetched(false);
    setloaded(false);
    setloading(true);
    getPremises(x);
  };

  function selectItems() {}

  function removeItems() {}

  // search for invoice/tenant
  const handleSubmit = (e) => {
    e.preventDefault();
    setfetched(false);
    setError({
      ...error,
      message: "",
      color: "",
    });
    setloaded(false);
    setloading2(true);
    getLandlords();
  };

  const total = () => {
    let sum = 0;
    let paid = 0;
    transactions?.transactionItems?.map((item) => {
      sum += item.billAmount;
      paid += item.billPaidAmount;
    });
    return { sum: sum, paid: paid, balance: sum - paid };
  };

  const formatCurrency = (x) => {
    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    });
    return formatCurrency.format(x);
  };

  const [datas, setdatas] = useState([]);
  const [dat, setdat] = useState([]);

  function handleForm(e, i, t) {
    setdat((dat) => [...dat, i]);
    if (!dat.some((y) => y === i)) {
      let x = {
        code: t.transactionItemId,
        name: t.applicableChargeName,
        value: parseInt(e.target.value),
      };
      setdatas((datas) => [...datas, x]);
    } else {
      let newArr = [...datas];
      newArr[i] = {
        code: t.transactionItemId,
        name: t.applicableChargeName,
        value: parseInt(e.target.value),
      };
      setdatas(newArr);
    }
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
  useEffect(() => {
    console.log(!(tenancyId !== "" || amount !== ""));
  });

  const handleFinalSubmit = () => {
    if (recipient === "TENANT") {
      var data = {
        amount: parseInt(amount),
        creditTenancy: creditTenancy,
        noteFor: recipient,
        parentInvoiceNumber: "",
        reason: reason,
        tenancyId: parseInt(tenancyId),
        transactionValues: datas,
      };
    }
    if (recipient === "INVOICE") {
      var data = {
        amount: parseInt(amount),
        creditTenancy: creditTenancy,
        noteFor: recipient,
        parentInvoiceNumber: transactionId,
        reason: reason,
        tenancyId: "",
        transactionValues: datas,
      };
    }
    requestsServiceService
      .createCreditNote(data)
      .then((res) => {
        if (res.data.status === true) {
          setError({
            ...error,
            color: "success",
            message: res.data.message,
          });
          setTimeout(() => {
            navigate("/notes", { replace: true });
          }, 2500);
        } else {
          setError({
            ...error,
            color: "danger",
            message: res.data.message,
          });
        }
      })
      .catch((err) => {
        setError({
          ...error,
          color: "danger",
          message: err.message,
        });
      });
  };

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18 text-capitalize">
                  Credit Note
                </h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">Credit & Debit Notes</li>
                    <li className="breadcrumb-item active">
                      Create Credit note
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
              <div className="card p-5">
                <div className="card-body ">
                  <div className="row d-flex align-items-center justify-content-center ">
                    <div className="col-sm-12 col-md-7 col-lg-8">
                      <div className="d-flex justify-items-center align-items-center">
                        <div className="card-body border-1 invoice-form credit-form p-5">
                          <h4 className="card-title mb-4">
                            Enter the details below
                          </h4>
                          <div className="row">
                            <div className=" col-12 ">
                              <div className="mb-4 ">
                                <label className="text-capitalize ">
                                  Whats this credit note for?
                                </label>
                                <div className="row ">
                                  <div className="col-auto ">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input"
                                        value="tenant"
                                        type="radio"
                                        name="credit"
                                        checked={recipient == "TENANT"}
                                        disabled
                                      />
                                      <label
                                        className="form-check-label"
                                        for="landlord-credit"
                                      >
                                        Tenancy credit
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-auto ">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input"
                                        value="invoice"
                                        type="radio"
                                        name="credit"
                                        checked={recipient == "INVOICE"}
                                        disabled
                                      />
                                      <label
                                        className="form-check-label"
                                        for="invoice-credit"
                                      >
                                        An Existing invoice
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className=" col-12 ">
                              <div className="mb-4 ">
                                <label className="text-capitalize ">
                                  Whats this credit note for?
                                </label>
                                <div className="row ">
                                  <div className="col-auto ">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input"
                                        value="TENANT"
                                        type="radio"
                                        name="credit"
                                        onChange={(e) =>
                                          setRecipient(e.target.value)
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="landlord-credit"
                                      >
                                        Tenancy credit
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-auto ">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input"
                                        value="INVOICE"
                                        type="radio"
                                        name="credit"
                                        onChange={(e) =>
                                          setRecipient(e.target.value)
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="invoice-credit"
                                      >
                                        An Existing invoice
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <!-- landlord's credit note --> */}
                          <div className="row">
                            <div className="col-7">
                              <div className="mb-4 ">
                                <label htmlFor="agreement-type">
                                  Select tenant's premises
                                </label>
                                <select
                                  className="form-control"
                                  title="Select tenant"
                                  required={true}
                                  disabled
                                >
                                  {tenancies?.map((item, index) => (
                                    <option
                                      value={parseInt(item.id)}
                                      key={item.id}
                                      defaultValue={item.id === tenancyId}
                                    >
                                      {item.premiseUnit?.premise?.premiseName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="col-5 ">
                              <div className="mb-4 ">
                                <label htmlFor="agreement-type">
                                  Hse/Unit No.
                                </label>
                                <select className="form-control " disabled>
                                  {tenancies.map((item, index) => (
                                    <option
                                      value={parseInt(item.id)}
                                      key={item.id}
                                      defaultValue={item.id === tenancyId}
                                    >
                                      {item.premiseUnit?.unitName +
                                        " - " +
                                        item.premiseUnit?.unitType.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* debit amount to  */}
                            <div className=" col-12 ">
                              <div className="mb-1 ">
                                <label className="text-capitalize ">
                                  Debit this amount to the landlord
                                </label>
                                <div className="row ">
                                  <div className="col-auto ">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="debit"
                                        checked={creditTenancy}
                                        disabled
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="debit-yes"
                                      >
                                        Yes
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-auto ">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="debit"
                                        checked={!creditTenancy}
                                        disabled
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="debit-no"
                                      >
                                        No
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <!-- invoices credit note --> */}
                          <div className="row">
                            <div className="mb-4">
                              <label
                                htmlFor=""
                                className="form-label text-capitalize"
                              >
                                Invoice Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={transactionId}
                                disabled
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 ">
                              <div className="mb-4 ">
                                <label
                                  for="agreement-type "
                                  className="text-capitalize"
                                >
                                  Reason for creating the credit Note
                                </label>
                                <textarea
                                  name=" "
                                  placeholder="Enter the reason"
                                  id=""
                                  cols="30"
                                  rows="3"
                                  className="form-control"
                                  required={true}
                                  maxLength="255"
                                  onChange={(e) => setReason(e.target.value)}
                                ></textarea>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                  Amount To Credit
                                </label>
                                <input
                                  type="text"
                                  className="form-control credit-amount"
                                  id=""
                                  placeholder="KES"
                                  onChange={(e) => setAmount(e.target.value)}
                                  required={true}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="">
                              <button
                                type="button"
                                onClick={showInvoice}
                                disabled={amount === "" || reason === ""}
                                className="btn btn-success w-md"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- end card body --> */}
              </div>
              {/* <!-- end card --> */}
            </div>
            {/* <!-- end col --> */}
          </div>

          {/* <!-- end row --> */}
        </div>
        {/* <!-- container-fluid --> */}
      </div>
      {/* <!-- End Page-content --> */}

      {/* <!-- Debiting amount to the tenant --> */}
      <Modal show={invoice_show} onHide={closeInvoice} size="lg" centered>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Distribute the Debited amount to the correct invoice accounts
          </h5>
        </Modal.Header>
        <Modal.Body>
          <StatusBadge type={transactions?.transaction?.paymentStatus} />
          <div className="col-12">
            <address>
              <strong>Billed To:</strong>
              <br />
              {transactions?.transaction?.tenantName} <br />
              {/*{activeInvoice?.transactionCustomerEmail}<br/>*/}
              {transactions?.transaction?.premiseName} -{" "}
              {transactions?.transaction?.premiseUnitName}
              <br />
              <br />
              {moment(transactions?.transaction?.invoiceDate).format(
                "dddd, MMMM Do YYYY, h:mm a"
              )}
            </address>
            {/*<p>Title: {activeInvoice?.transactionTitle}</p>*/}
            <p>
              Description: {transactions?.transaction?.invoicePeriodDescription}
            </p>
          </div>
          <div className="col-12">
            <div className="py-2 mt-3">
              <h3 className="font-size-15 fw-bold">
                Charges Breakdown ({" "}
                <span className="text-primary fw-medium">
                  {transactions?.transaction?.transactionId}
                </span>{" "}
                )
              </h3>
            </div>
          </div>
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: "70px" }}>No.</th>
                  <th>Charge name</th>
                  <th>Quantity</th>
                  <th>Unit Cost</th>
                  <th>Paid Amount</th>
                  <th></th>
                  <th className={"text-end"}>Bill Amount</th>
                  <th className="" style={{ width: "150px" }}>
                    Assign Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions?.length > 0 &&
                  transactions?.map((item, index) => (
                    <tr data-id={item.id} key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.applicableChargeName}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.unitCost)}</td>
                      <td>{formatCurrency(item.billPaidAmount)}</td>
                      <td></td>
                      <td className="text-end">
                        {formatCurrency(item.billAmount)}
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
                  <td className="text-end fw-bold">{formatCurrency(amount)}</td>
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
                    {formatCurrency(parseInt(amount) - debitTotal())}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td colSpan={"2"} className="text-end"></td>
                  <td className="text-end fw-bold text-danger">
                    {debitTotal() > amount ? (
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
          <div className="col-12">
            <div className="alert alert-warning" role="alert">
              <i className="mdi mdi-alert-outline me-2 "></i> A debit note with
              these details will be created and information will be sent to the
              tenant on the same via SMS
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="float-end">
            <button
              onClick={handleFinalSubmit}
              // disabled={amount === "" && reason === ""}
              className="btn btn-primary w-md waves-effect waves-light submit-credit-details"
            >
              Submit Details
            </button>
          </div>
          {error.color !== "" && (
            <div className={"alert alert-" + error.color} role="alert">
              {error.message}
            </div>
          )}
        </Modal.Footer>
      </Modal>

      <div
        className="modal fade debit-tenant-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-capitalize"
                id="myLargeModalLabel"
              >
                Distribute the Debited amount to the correct invoice accounts
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="col-12">
                <address>
                  <strong>Debit to:</strong>
                  <br />
                  Kelvin Njuguna
                  <br />
                  email@mail.com, 0704 549 859
                  <br />
                  Hse No. 410, 90 Degrees By Tsavo
                  <br />
                  <br />
                  <span className="date-today"> 1 Mar 2022, 10:20 AM</span>
                </address>
              </div>
              <div className="col-12">
                <div className="py-2 mt-3">
                  <h3 className="font-size-15 fw-bold">Balances Breakdown</h3>
                </div>
              </div>
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-nowrap invoice-table">
                    <thead>
                      <tr>
                        <th style={{ width: "70px" }}>No.</th>
                        <th>Item</th>
                        <th className="text-end">Amount</th>
                        <th className="" style={{ width: "150px" }}>
                          Assign Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Monthly Rent</td>
                        <td className="text-end">KES 24,500</td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm text-right"
                            placeholder="KES"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>02</td>
                        <td>Surcharge</td>
                        <td className="text-end">KES 2,450</td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm text-right"
                            placeholder="KES"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>03</td>
                        <td>Visitation Fee</td>
                        <td className="text-end">KES 500</td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm text-right"
                            placeholder="KES"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-end">
                          Total
                        </td>
                        <td className="text-end fw-bold the-total">
                          KES 27,450
                        </td>
                        <td className="text-end fw-bold debited-amount">
                          KES 0.00
                        </td>
                      </tr>

                      <tr>
                        <td colSpan="2" className="border-0 text-end">
                          <strong>Remaining Balance</strong>
                        </td>
                        <td className="border-0 text-end">
                          <h5 className="m-0 text-uppercase fw-bold the-debit-balance">
                            KES 0.00
                          </h5>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-12">
                <div className="alert alert-warning" role="alert">
                  <i className="mdi mdi-alert-outline me-2 "></i> A debit note
                  with this details will be created and information will be sent
                  to the tenant on the same via SMS
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="float-end">
                <a
                  href="javascript: void(0);"
                  className="btn btn-primary w-md waves-effect waves-light submit-credit-details"
                >
                  Submit Details
                </a>
              </div>
            </div>
          </div>
          {/* <!-- /.modal-content --> */}
        </div>
        {/* <!-- /.modal-dialog --> */}
      </div>
      {/* <!-- debiting amoun to tenant --> */}

      {/* <!-- loader --> */}
      <div
        className="modal fade"
        id="creditNoteModalLoad"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 d-none">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body loading-cont">
              <div className="row">
                <div className="col-12 mt-5 mb-5">
                  <div className="d-flex justify-content-center align-items-center justify-content-center flex-column">
                    <div
                      className="spinner-border text-info m-1 mb-4"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                    <div className="text-center">
                      <h4 className="text-uppercase text-info">loading</h4>
                      <p>Please wait as your request is being processed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body d-none">
              <div className="text-center mt-5 mb-5">
                <div className="avatar-md mx-auto mb-4 ">
                  <div className="avatar-title bg-light rounded-circle text-success h1 ">
                    <i className="mdi mdi-check-bold "></i>
                  </div>
                </div>

                <div className="row justify-content-center ">
                  <div className="col-xl-10 ">
                    <h4 className="text-success text-uppercase">
                      Created successfully
                    </h4>
                    <p className="text-muted  mb-4 ">
                      The credit note has been created successfully
                    </p>
                  </div>
                  <div className="col-10">
                    <a
                      href="src/pages/credits&debits/CreateDebitNote#"
                      type="button"
                      className="btn btn-primary waves-effect waves-light w-100 text-capitalize"
                    >
                      <i className="mdi mdi-printer font-size-18 align-middle me-2"></i>{" "}
                      Print Credit Note
                    </a>
                    <a
                      href="src/pages/credits&debits/CreateDebitNote#"
                      type="button"
                      className="btn btn-primary waves-effect waves-light w-100 text-capitalize mt-3"
                    >
                      <i className="mdi mdi-printer font-size-18 align-middle me-2"></i>{" "}
                      Print Debit Note
                    </a>

                    <button
                      type="button"
                      className="btn btn-outline-secondary waves-effect waves-light w-100 mt-3 text-capitalize stay-on-page"
                    >
                      <i className="mdi mdi-window-close font-size-18 align-middle me-2"></i>{" "}
                      Close this section
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*MODAL START*/}
      <Modal
        show={show}
        onHide={closeCreditModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Create Debit Note
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-12">
            <div className="card-body p-2">
              <h4 className="card-title mb-4">Enter the debit note details</h4>
              <div className="row">
                <div className="text-center pt-2">
                  <div className="row justify-content-end">
                    <div className="col-xl-12">
                      <div className="row">
                        <div className="col-12">
                          <>
                            <form
                              onSubmit={handleSubmit}
                              id={"debit-search-form"}
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
                            </form>
                            <div className="form-group">
                              <div className="d-flex align-items-center justify-content-center">
                                <div className="text-end">
                                  <button
                                    form={"debit-search-form"}
                                    type="submit"
                                    disabled={loading2 || searchTerm === ""}
                                    className="btn btn-primary btn-rounded"
                                  >
                                    {loading2 && (
                                      <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                      />
                                    )}
                                    {loading2 && (
                                      <>
                                        <span className="d-none d-sm-inline-block me-2">
                                          Searching...
                                        </span>
                                      </>
                                    )}
                                    {!loading2 && (
                                      <>
                                        <span className="d-none d-sm-inline-block me-2">
                                          Search
                                        </span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        </div>
                        <>
                          <div className={"mt-2 mb-2"}>
                            {fetched && landlords.length < 1 && (
                              <span className={"text-danger"}>
                                Landlord not found!
                              </span>
                            )}
                            {fetched && landlords.length > 5 && (
                              <span className={"text-danger"}>
                                Too many results. Specify a landlord name
                              </span>
                            )}
                            <span className={"text-" + error.color}>
                              {error.message}
                            </span>
                          </div>
                          <div className="overflow-visible">
                            <table className="table align-middle table-hover contacts-table table-striped ">
                              <thead className="table-light">
                                {landlords.length > 0 && landlords.length <= 5 && (
                                  <tr>
                                    <th width="8px">Select</th>
                                    <th span={"col-6"}>Tenant Type</th>
                                    <th span={"col-3"}>Name</th>
                                    <th span={"col-3"}>Email</th>
                                  </tr>
                                )}
                              </thead>
                              <tbody>
                                {landlords.length > 0 && (
                                  <>
                                    {landlords.length <= 5 && (
                                      <>
                                        {landlords?.map((item) => (
                                          <tr key={item.id}>
                                            <td>
                                              <div className="d-flex  align-items-center">
                                                <div className="the-mail-checkbox pr-4">
                                                  <input
                                                    className="form-check-input mt-0 pt-0 form-check-dark"
                                                    type="checkbox"
                                                    id="formCheck1"
                                                    onChange={() => {
                                                      autofill(item);
                                                    }}
                                                    checked={
                                                      loaded &&
                                                      item.id === landlordId
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </td>
                                            <td>{item.landLordType}</td>
                                            <td className="text-capitalize">
                                              <a href="javascript:void(0)">
                                                {item.firstName} {item.lastName}
                                              </a>
                                            </td>
                                            <td>{item.email}</td>
                                          </tr>
                                        ))}
                                      </>
                                    )}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-12 ">
                <div className="mb-1 ">
                  <label className="text-capitalize ">
                    Debit this amount to the tenant
                  </label>
                  <div className="row ">
                    <div className="col-auto ">
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={creditTenancy}
                          onChange={() => setCreditTenancy(true)}
                        />
                        <label className="form-check-label" htmlFor="debit-yes">
                          Yes
                        </label>
                      </div>
                    </div>

                    <div className="col-auto ">
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={!creditTenancy}
                          onChange={(e) => setCreditTenancy(false)}
                        />
                        <label className="form-check-label" htmlFor="debit-no">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {creditTenancy && (
                <div className="row">
                  <div className="col-7">
                    <div className="mb-4 ">
                      <label htmlFor="agreement-type">
                        Select tenant's premises
                      </label>
                      <select
                        className="form-control"
                        title="Select tenant"
                        value={tenancyId}
                        onChange={(e) => settenancyId(e.target.value)}
                        required={true}
                      >
                        <option value="">Select premises..</option>
                        {premises?.map((item, index) => (
                          <option value={parseInt(item.id)} key={item.id}>
                            {item.premiseName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-5 ">
                    <div className="mb-4 ">
                      <label htmlFor="agreement-type">Hse/Unit No.</label>
                      <select
                        className="form-control"
                        title="Select tenant"
                        required={true}
                      >
                        <option value="">Select units...</option>
                        {premises.map((item, index) => (
                          <option value={parseInt(item.id)} key={item.id}>
                            {item.premiseUnit?.unitName +
                              " - " +
                              item.premiseUnit?.unitType.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-12">
                <div
                  className="col-12 d-flex justify-content-end"
                  style={{
                    minHeight: "40px",
                    maxHeight: "50px",
                  }}
                >
                  <button
                    className="btn btn-primary cursor-pointer"
                    type={"button"}
                    onClick={closeCreditModal}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateDebitNote;
