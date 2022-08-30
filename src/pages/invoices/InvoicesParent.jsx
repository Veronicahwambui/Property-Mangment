/* global $ */
import React, { useState, useEffect } from "react";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";
import authService from "../../services/auth.service";
import Message from "../../components/Message";
import DatePicker from "../../components/Datepicker";

function InvoicesParent() {
  const [invoices, setinvoices] = useState([]);
  const [activeInvoice] = useState({});
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });
  const handleCallback = (sD, eD) => {
    setDate({
      ...date,
      startDate: moment(sD).format("YYYY-MM-DD"),
      endDate: moment(eD).format("YYYY-MM-DD"),
    });
  };

  const [invoice_show, setinvoice_show] = useState(false);
  const showInvoice = () => setinvoice_show(true);
  const [transaction, settransaction] = useState({});
  const [paymentItems, setpaymentItems] = useState([]);
  useEffect(() => {}, [transaction]);
  useEffect(() => {}, [paymentItems]);
  const closeInvoice = () => {
    setpaymentItems([]);
    settransaction({});
    setinvoice_show(false);
  };

  useEffect(() => {
    getInvoices();
  }, [size, page, activeInvoice, transaction, paymentItems]);
  const sort = (event) => {
    event.preventDefault();
    let data = {
      startDate: moment(date.startDate).format("YYYY-MM-DD"),
      endDate: moment(date.endDate).format("YYYY-MM-DD"),
      size: size,
      page: page,
      search: status,
    };
    requestsServiceService.getParentInvoices(data).then((res) => {
      setPageCount(res.data.totalPages);
      setinvoices(res.data.data);
    });
  };
  const sortSize = (e) => {
    setSize(e.target.value);
    setPage(0);
  };
  const getInvoices = () => {
    let data = {
      startDate: date.startDate,
      endDate: date.endDate,
      size: size,
      page: page,
      search: status.trim(),
    };
    requestsServiceService.getParentInvoices(data).then((res) => {
      setPageCount(res.data.totalPages);
      setinvoices(res.data.data);
      $("#spinner").addClass("d-none");
      setStatus("");
      window.scrollTo(0, 0);
    });
  };
  const handlePageClick = (data) => {
    console.log(data);
    let d = data.selected;
    setPage(d);
  };

  const total = () => {
    let sum = 0;
    let paid = 0;
    paymentItems.map((item) => {
      sum += item.billAmount;
      paid += item.billPaidAmount;
    });
    return { sum: sum, paid: paid, balance: sum - paid };
  };
  const reset = () => {
    setSize(100);
    setPage(1);
  };
  const getOneInvoice = (id) => {
    requestsServiceService.getParentInvoice(id).then((res) => {
      settransaction(res.data.data.transaction);
      setpaymentItems(res.data.data.transactionItems);
    });
    setTimeout(() => {
      showInvoice();
    }, 800);
  };
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  // MESSAGE TEST
  const [details, setDetails] = useState({
    message: "",
    contact: "",
    recipientName: "",
    entity: null,
    clientName: JSON.parse(authService.getCurrentUserName()).client?.name,
    clientId: parseInt(authService.getClientId()),
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
    let mes = `Dear ${inv.tenantName}, your monthly invoice ${inv.transactionId} has been generated . Click here to pay for it`;
    let senderId =
      JSON.parse(authService.getCurrentUserName()).client?.senderId === null
        ? "REVENUESURE"
        : JSON.parse(authService.getCurrentUserName()).client?.senderId;
    setDetails({
      ...details,
      message: mes,
      contact:
        mod === "Email"
          ? inv?.tenancy?.tenant?.email
          : inv?.tenancy?.tenant?.phoneNumber,
      entity: inv?.tenancy?.id,
      recipientName: inv?.tenantName,
      createdBy: authService.getCurrentUserName(),
      senderId: senderId,
      subject: "Invoice Payment",
    });
    $(".email-overlay").removeClass("d-none");
    setTimeout(function () {
      $(".the-message-maker").addClass("email-overlay-transform");
    }, 0);
  };

  const clear = () => {
    setDetails({
      ...details,
      message: "",
      contact: "",
      recipientName: "",
      entity: null,
      clientName: JSON.parse(authService.getCurrentUserName()).client?.name,
      clientId: parseInt(authService.getClientId()),
      entityType: "TENANCY",
      createdBy: "",
      senderId: "",
      subject: "Invoice Payment",
    });
  };

  return (
    <>
      <div className="page-content">
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
                    <li className="breadcrumb-item active">Monthly Invoices</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
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
              <div className="card">
                <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <h4 className="card-title text-capitalize mb-0 ">
                      Monthly Invoices
                    </h4>

                    <div className="d-flex justify-content-end align-items-center align-items-center pr-3">
                      <div>
                        <form className="app-search d-none d-lg-block p-2">
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              onChange={(e) => setStatus(e.target.value)}
                            />
                            <span className="bx bx-search-alt"></span>
                          </div>
                        </form>
                      </div>
                      <div
                        className="input-group d-flex justify-content-end align-items-center"
                        id="datepicker1"
                      >
                        <div
                          style={{
                            backgroundColor: "#fff",
                            color: "#2C2F33",
                            cursor: " pointer",
                            padding: "7px 10px",
                            border: "2px solid #ccc",
                            width: " 100%",
                          }}
                        >
                          <DatePicker
                            onCallback={handleCallback}
                            startDate={moment(date.startDate).format(
                              "YYYY-MM-DD"
                            )}
                            endDate={moment(date.endDate).format("YYYY-MM-DD")}
                          />
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={sort}>
                        filter
                      </button>
                    </div>
                  </div>

                  <Message details={details} mode={mode} clear={clear} />
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
                        <tr className="table-dark">
                          <th>Invoice Number</th>
                          <th>Tenant</th>
                          <th>Properties</th>
                          <th>Hse/Unit</th>
                          <th>Date Issued</th>
                          <th>Payment Status</th>
                          <th>Date Created</th>

                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.length > 0 &&
                          invoices?.map((invoice, index) => (
                            <tr data-id={index} key={index}>
                              <td>{invoice.transactionId}</td>
                              <td>{invoice.tenantName}</td>
                              <td>{invoice.premiseName}</td>
                              <td>{invoice.premiseUnitName}</td>
                              <td>
                                {moment(invoice.invoiceDate).format(
                                  "MMMM Do YYYY"
                                )}
                              </td>
                              <td>
                                <StatusBadge type={invoice?.paymentStatus} />
                              </td>
                              <td>
                                {moment(invoice.dateTimeCreated).format(
                                  "YYYY-MM-DD HH:mm"
                                )}
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
                                      <span
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() =>
                                          getOneInvoice(invoice.transactionId)
                                        }
                                      >
                                        <i
                                          className="font-size-15 mdi mdi-eye me-3 "
                                          href="# "
                                        ></i>
                                        View
                                      </span>
                                      <a className="dropdown-item " href="# ">
                                        <i className="font-size-15 mdi mdi-printer me-3 "></i>
                                        Print
                                      </a>
                                      <a
                                        className="dropdown-item "
                                        onClick={() => {
                                          handleModeChange("Email");
                                          handleClicked(invoice, "Email");
                                        }}
                                      >
                                        <i className="font-size-15 mdi mdi-email me-3 "></i>
                                        Email Tenant
                                      </a>
                                      <a
                                        className="dropdown-item "
                                        onClick={() => {
                                          handleModeChange("SMS");
                                          handleClicked(invoice, "SMS");
                                        }}
                                      >
                                        <i className="font-size-15 mdi mdi-chat me-3 "></i>
                                        SMS Tenant
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
                            colSpan="12"
                          >
                            {invoices && invoices.length} Invoices
                          </th>
                        </tr>
                      </tfoot>
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
                            <option value="10">10 Rows</option>
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
                              onPageChange={(data) => handlePageClick(data)}
                            />
                          </nav>
                        </>
                      )}
                    </div>
                    {pageCount !== 0 && (
                      <p className="font-medium  text-muted mt-2">
                        showing page{" "}
                        <span className="text-primary">
                          {pageCount === 0 ? page : page + 1}
                        </span>{" "}
                        of<span className="text-primary"> {pageCount}</span>{" "}
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

      <Modal show={invoice_show} onHide={closeInvoice} size="lg" centered>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Invoice Details
          </h5>
        </Modal.Header>
        <Modal.Body>
          <StatusBadge type={transaction?.paymentStatus} />
          <div className="col-12">
            <address>
              <strong>Billed To:</strong>
              <br />
              {transaction?.tenantName} <br />
              {/*{activeInvoice?.transactionCustomerEmail}<br/>*/}
              {transaction?.premiseName} - {transaction?.premiseUnitName}
              <br />
              <br />
              {moment(transaction?.transaction?.invoiceDate).format(
                "dddd, MMMM Do YYYY, h:mm a"
              )}
            </address>
            {/*<p>Title: {activeInvoice?.transactionTitle}</p>*/}
            <p>Description: {transaction?.invoicePeriodDescription}</p>
          </div>
          <div className="col-12">
            <div className="py-2 mt-3">
              <h3 className="font-size-15 fw-bold">
                Charges Breakdown ({" "}
                <span className="text-primary fw-medium">
                  {transaction?.transactionId}
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
                  <th>Charge name</th>
                  <th>Quantity</th>
                  <th>Unit Cost</th>
                  <th>Paid Amount</th>
                  <th></th>
                  <th className={"text-end"}>Bill Amount</th>
                </tr>
              </thead>
              <tbody>
                {paymentItems?.length > 0 &&
                  paymentItems?.map((item, index) => (
                    <tr data-id={index} key={index}>
                      <td>{index + 1}</td>
                      <td>{item.applicableChargeName}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency.format(item.unitCost)}</td>
                      <td>{formatCurrency.format(item.billPaidAmount)}</td>
                      <td></td>
                      <td className="text-end">
                        {formatCurrency.format(item.billAmount)}
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
                    {formatCurrency.format(total().sum)}
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
                    {formatCurrency.format(total().paid)}
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
                    {formatCurrency.format(total().balance)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InvoicesParent;
