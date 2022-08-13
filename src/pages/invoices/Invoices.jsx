/* global $ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from "react-paginate";
import axios from "axios";
import StatusBadge from "../../components/StatusBadge";
import Message from "../../components/Message";
import AuthService from "../../services/auth.service";

function Invoices() {
  const [invoices, setinvoices] = useState([]);
  const [activeInvoice, setactiveInvoice] = useState({});
  const [transaction, setTransaction] = useState({});
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  // MODAL
  const [invoice_show, setinvoice_show] = useState(false);
  const showInvoice = () => setinvoice_show(true);
  const closeInvoice = () => setinvoice_show(false);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).add(3, "M").format("YYYY-MM-DD")
  );
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  useEffect(() => {
    getInvoices();
  }, [page, size, pageCount, searchTerm]);

  const sort = (event) => {
    event.preventDefault();
    let data = {
      startDate: startDate,
      endDate: endDate,
      size: size,
      page: page,
      search: searchTerm,
    };
    requestsServiceService
      .getInvoices(data)
      .then((res) => {
        setPageCount(res.data.totalPages);
        setinvoices(res.data.data);
      })
      .then(() => {});
  };
  const sortSize = (e) => {
    setSize(e.target.value);
    setPage(0);
  };
  const reset = () => {
    setSize(10);
    setPage(1);
  };

  const getInvoices = () => {
    let data = {
      startDate: startDate,
      endDate: endDate,
      size: size,
      page: page,
      applicableChargeName: searchTerm,
    };
    requestsServiceService.getInvoices(data).then((res) => {
      setPageCount(res.data.totalPages);
      setinvoices(res.data.data);
      window.scrollTo(0, 0);
    });
  };
  const handlePageClick = (data) => {
    let d = data.selected;
    setPage(d);
    // setPage(() => data.selected);
    // console.log(page)
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
  const getOneInvoice = (id) => {
    console.log(id);
    let acc = invoices.find((invoice) => invoice.transactionItemId === id);
    setactiveInvoice(acc);
    showInvoice();
  };
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  const addDate = (date) => {
    setStartDate(new Date(date.target.value));
  };
  const addDate2 = (date) => {
    setEndDate(new Date(date.target.value));
  };

  $(document).on("change", ".sdate", addDate);
  $(document).on("change", ".edate", addDate2);
  const [phonenumber, setphonenumber] = useState("");

  const sendSTK = (event) => {
    event.preventDefault();
    let invoiceNoo = activeInvoice;
    let formData = new FormData();
    formData.append("PayBillNumber", "4081125");
    formData.append("Amount", parseInt(activeInvoice.billAmount));
    formData.append("PhoneNumber", phonenumber);
    formData.append("AccountReference", invoiceNoo.billerBillNo);
    formData.append("TransactionDesc", invoiceNoo.transactionDescription);
    formData.append("FullNames", `${invoiceNoo.transactionCustomerName}`);
    formData.append("function", "CustomerPayBillOnline");

    let config = {
      method: "post",
      url: "https://payme.revenuesure.co.ke/index.php",
      data: formData,
    };
    axios(config).then((res) => {
      if (typeof res.data === "string") {
        setError({
          ...error,
          message: "Invalid Phone Number",
          color: "danger",
        });
      } else {
        let message = res.data.CustomerMessage;
        setError({
          ...error,
          message: message,
          color: "success",
        });
      }
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: "",
        });
      }, 4000);
    });
  };

  // MESSAGE TEST
  const [details, setDetails] = useState({
    message: "",
    contact: "",
    recipientName: "",
    entity: null,
    clientName: JSON.parse(AuthService.getCurrentUserName()).client?.name,
    clientId: parseInt(AuthService.getClientId()),
    entityType: "TENANCY",
    createdBy: "",
    senderId: "",
    subject: "Invoice Payment",
  });
  const [mode, setmode] = useState("");
  const handleModeChange = (mode) => {
    setmode(mode);
  };
  const handleClicked = (inv, mod) => {
    let mes = `Dear ${inv.transactionCustomerName}, your invoice ${
      inv.billerBillNo
    } balance is ${formatCurrency.format(
      inv.billAmount - inv.billPaidAmount
    )}. Click here to pay for it`;
    let senderId =
      JSON.parse(AuthService.getCurrentUserName()).client?.senderId === null
        ? "REVENUESURE"
        : JSON.parse(AuthService.getCurrentUserName()).client?.senderId;
    setDetails({
      ...details,
      message: mes,
      contact:
        mod === "Email"
          ? inv.transactionCustomerEmail
          : inv.transaction?.tenancy?.tenant?.phoneNumber,
      entity: inv.transaction?.tenancy?.id,
      recipientName: inv.transactionCustomerName,
      createdBy: inv.createdBy,
      senderId: senderId,
      subject: "Invoice Payment",
    });
    $(".email-overlay").removeClass("d-none");
    setTimeout(function () {
      $(".the-message-maker").addClass("email-overlay-transform");
    }, 0);
  };
  useEffect(() => {}, [details, mode]);

  const clear = () => {
    setDetails({
      ...details,
      message: "",
      contact: "",
      recipientName: "",
      entity: null,
      clientName: JSON.parse(AuthService.getCurrentUserName()).client?.name,
      clientId: parseInt(AuthService.getClientId()),
      entityType: "TENANCY",
      createdBy: "",
      senderId: "",
      subject: "Invoice Payment",
    });
  };

  return (
    <>
      <div className="page-content">
        <Message details={details} mode={mode} clear={clear} />

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Rent & Bills invoices</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/invoices"> All Invoices </Link>
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
                      All rent and Bills invoices
                    </h4>
                    <div className="d-flex justify-content-end align-items-center">
                      <div>
                        <div>
                          <form className="app-search d-none d-lg-block">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <span className="bx bx-search-alt"></span>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div>
                        <select
                          className={"btn btn-primary"}
                          name=""
                          id=""
                          value={size}
                          onChange={(e) => sortSize(e)}
                        >
                          <option value={parseInt(100)}>100</option>
                          <option value={parseInt(20)}>20</option>
                          <option value={parseInt(10)}>10</option>
                          <option value={parseInt(5)}>5</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <div className="input-group" id="datepicker1">
                          <input
                            type="text"
                            className="form-control mouse-pointer sdate"
                            placeholder={`${startDate}`}
                            name="dob"
                            readOnly
                            data-date-format="dd M, yyyy"
                            data-date-container="#datepicker1"
                            data-provide="datepicker"
                            data-date-autoclose="true"
                            data-date-end-date="+0d"
                          />
                          <span className="input-group-text">
                            <i className="mdi mdi-calendar"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control mouse-pointer edate"
                            name="dob"
                            placeholder={`${endDate}`}
                            readOnly
                            data-date-format="dd M, yyyy"
                            data-date-container="#datepicker1"
                            data-provide="datepicker"
                            data-date-autoclose="true"
                          />
                          <span className="input-group-text">
                            <i className="mdi mdi-calendar"></i>
                          </span>
                          <button className="btn btn-primary" onClick={sort}>
                            filter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<div className="btn-toolbar p-3 align-items-center d-none animated delete-tool-bar"*/}
                  {/*     role="toolbar">*/}
                  {/*  <button type="button"*/}
                  {/*          className="btn btn-primary waves-effect btn-label waves-light me-3"><i*/}
                  {/*    className="mdi mdi-printer label-icon"></i> Print Selected Invoices*/}
                  {/*  </button>*/}
                  {/*</div>*/}
                </div>
                <div className="card-body">
                  <div className="table-responsive overflow-visible">
                    <table
                      className="table align-middle table-hover  contacts-table table-striped "
                      id="datatable-buttons"
                    >
                      <thead className="table-light">
                        <tr className="table-light">
                          <th>Invoice Number</th>
                          <th>Bill Reference No</th>
                          <th>Tenant</th>
                          <th>Premises</th>
                          <th>Hse/Unit</th>
                          <th>Charge Name</th>
                          <th>Bill Amount</th>
                          <th>Paid Amount</th>
                          <th>Total Balance</th>
                          <th>Due Date</th>
                          <th>Payment Status</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.length > 0 &&
                          invoices?.map((invoice, index) => (
                            <tr data-id={index} key={index}>
                              <td>{invoice.transactionItemId}</td>
                              <td>{invoice.billerBillNo}</td>
                              <td>{invoice.transaction?.tenantName}</td>
                              <td>{invoice.transaction.premiseName}</td>
                              <td>{invoice.transaction.premiseUnitName}</td>
                              <td>{invoice.applicableChargeName}</td>
                              <td>
                                {formatCurrency.format(invoice.billAmount)}
                              </td>
                              <td>
                                {formatCurrency.format(invoice.billPaidAmount)}
                              </td>
                              <td>
                                <span className="fw-semibold ">
                                  {formatCurrency.format(
                                    invoice.billAmount - invoice.billPaidAmount
                                  )}
                                </span>
                              </td>
                              <td>
                                {moment(invoice?.invoiceDate).format(
                                  "DD-MM-YYYY"
                                )}
                              </td>
                              <td>
                                <StatusBadge type={invoice?.paymentStatus} />
                              </td>
                              <td>
                                <div className="d-flex justify-content-end">
                                  {/*<button type="button"*/}
                                  {/*        className="btn btn-primary btn-sm waves-effect waves-light text-nowrap me-3"*/}
                                  {/*        // onClick={() => getOneInvoice(invoice?.transaction.transactionId)}*/}
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
                                          getOneInvoice(
                                            invoice.transactionItemId
                                          );
                                        }}
                                      >
                                        <i className="font-size-15 mdi mdi-eye me-3 "></i>
                                        View
                                      </a>
                                      <a className="dropdown-item">
                                        <i className="font-size-15 mdi mdi-printer me-3 "></i>
                                        Print
                                      </a>
                                      <a
                                        className="dropdown-item cursor-pointer"
                                        onClick={() => {
                                          handleModeChange("Email");
                                          handleClicked(invoice, "Email");
                                        }}
                                      >
                                        <i className="font-size-15 mdi mdi-email me-3 "></i>
                                        Email Tenant
                                      </a>
                                      <a
                                        className="dropdown-item cursor-pointer"
                                        onClick={() => {
                                          handleModeChange("SMS");
                                          handleClicked(invoice, "SMS");
                                        }}
                                      >
                                        <i className="font-size-15 mdi mdi-chat me-3"></i>
                                        Send as SMS
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot className="table-dark">
                        <tr>
                          <th
                            className="text-capitalize text-nowrap"
                            colSpan="3"
                          >
                            {invoices && invoices.length} Invoices
                          </th>
                          <td className="text-nowrap text-right" colSpan="6">
                            <span className="fw-semibold">
                              {formatCurrency.format(total())}
                            </span>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="mt-4 mb-0 flex justify-between px-8">
                    {pageCount !== 0 && (
                      <p className=" font-medium text-xs text-gray-700">
                        {" "}
                        showing page{" "}
                        <span className="text-green-700 text-opacity-100 font-bold text-sm">
                          {page + 1}
                        </span>{" "}
                        of{" "}
                        <span className="text-sm font-bold text-black">
                          {pageCount}
                        </span>{" "}
                        pages
                      </p>
                    )}

                    {pageCount !== 0 && (
                      <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount} // total number of pages needed
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={1}
                        onPageChange={handlePageClick}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*VIEW INVOICE*/}
      <Modal show={invoice_show} onHide={closeInvoice} size="lg" centered>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Invoice Details
          </h5>
        </Modal.Header>
        <Modal.Body>
          <StatusBadge type={activeInvoice?.transaction?.paymentStatus} />
          <div className="col-12">
            <address>
              <strong>Billed To:</strong>
              <br />
              {activeInvoice?.transaction?.tenantName} <br />
              {activeInvoice?.transactionCustomerEmail}
              <br />
              {activeInvoice?.transaction?.premiseName + " , "}
              {activeInvoice?.transaction?.premiseUnitName}
              <br />
              <br />
              <p>
                Issue date:{" "}
                {moment(activeInvoice.dateTimeCreated).format("DD-MM-YYYY")}
              </p>
              <p>
                Due date:{" "}
                {moment(activeInvoice.invoiceDate).format("DD-MM-YYYY")}
              </p>
            </address>
            <p>Title: {activeInvoice?.transactionTitle}</p>
            <p>Description: {activeInvoice?.transactionDescription}</p>
          </div>
          <div className="col-12">
            <div className="py-2 mt-3">
              <h3 className="font-size-15 fw-bold">
                Invoice Details ({" "}
                <span className="text-primary fw-medium">
                  {activeInvoice?.transactionItemId}
                </span>{" "}
                )
              </h3>
            </div>
          </div>
          <div className="col-12">
            <table className="table table-nowrap">
              <thead>
                <tr>
                  <th style={{ width: "70px" }}>No.</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Unit Cost</th>
                  <th className="text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>{activeInvoice?.applicableChargeName}</td>
                  <td>{formatCurrency.format(activeInvoice.quantity)}</td>
                  <td>{formatCurrency.format(activeInvoice?.unitCost)}</td>
                  <td className="text-end">
                    KES. {formatCurrency.format(activeInvoice?.billAmount)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colSpan="2" className="text-end">
                    Total
                  </td>
                  <td className="text-end fw-bold">
                    {formatCurrency.format(activeInvoice?.billAmount)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colSpan="2" className="text-end">
                    Paid
                  </td>
                  <td className="text-end  fw-bold">
                    {formatCurrency.format(activeInvoice?.billPaidAmount)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colSpan="2" className="border-0 text-end">
                    <strong>Balance</strong>
                  </td>
                  <td className="border-0 text-end">
                    <h5 className="m-0 text-uppercase fw-bold">
                      {" "}
                      {formatCurrency.format(
                        activeInvoice?.billAmount -
                          activeInvoice?.billPaidAmount
                      )}
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-12">
            <form onSubmit={sendSTK}>
              <table className="w-100">
                <tbody>
                  <tr data-id="1">
                    <td>
                      <label htmlFor="" className="">
                        Payment Method
                      </label>
                      <select
                        className="form-control"
                        title="Select payment Method"
                        disabled={true}
                      >
                        <option value="Mpesa">MPESA</option>
                        <option value="Cash">CASH</option>
                      </select>
                    </td>
                    <td className="px-3">
                      <div className="phone-num">
                        <label htmlFor="">Phone No.</label>
                        <input
                          className="form-control w-100 d-flex"
                          spellCheck="false"
                          onChange={(event) =>
                            setphonenumber(event.target.value)
                          }
                          data-ms-editor="true"
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="07XXXXXXXX"
                          pattern="[0]{1}[0-9]{9}"
                          required={true}
                        />
                      </div>
                    </td>
                    <td className="text-right float-right">
                      <div className="d-flex flex-column">
                        <label className="opacity-0">Something</label>
                        <button
                          type="submit"
                          className="btn btn-primary w-md waves-effect waves-light"
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              {error.color !== "" && (
                <div className={"alert alert-" + error.color} role="alert">
                  {error.message}
                </div>
              )}
            </form>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Invoices;
