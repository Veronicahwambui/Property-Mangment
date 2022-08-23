/* global $ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import authService from "../../services/auth.service";
import Message from "../../components/Message";

function Receipts() {
  const [statements, setstatements] = useState([]);
  const [activeInvoice, setactiveInvoice] = useState({});
  const [startDate, setStartDate] = useState("01/12/2022");
  const [endDate, setEndDate] = useState("12/12/2022");
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  useEffect(() => {
    getStatements();
  }, []);

  const getStatements = () => {
    let data = { startDate: startDate, endDate: endDate };
    requestsServiceService.getStatements(data).then((res) => {
      setstatements(res.data.data);
      $("#spinner").addClass("d-none");
    });
  };
  const [invoice_show, setinvoice_show] = useState(false);
  const showInvoice = () => setinvoice_show(true);
  const closeInvoice = () => setinvoice_show(false);
  const getOneInvoice = (bill) => {
    let acc = statements.find((statement) => statement.billNo === bill);
    setactiveInvoice(acc);
    showInvoice();
  };



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
    let mes = `Dear ${inv.paidBy}, your payment for invoice ${inv.billNo
      } for KES ${formatCurrency.format(
        inv.receiptAmount
      )} has been received. Thank you`;
    let senderId =
      JSON.parse(authService.getCurrentUserName()).client?.senderId === null
        ? "REVENUESURE"
        : JSON.parse(authService.getCurrentUserName()).client?.senderId;
    setDetails({
      ...details,
      message: mes,
      contact:
        mod === "Email"
          ? inv?.tenant?.email
          : inv?.tenant?.phoneNumber,
      entity: inv.tenant !=undefined ? inv.tenant.id : inv.id,
      recipientName: inv?.tenantName,
      createdBy: authService.getCurrentUserName(),
      senderId: senderId,
      subject: "Invoice Payment"
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
      entityType: "TENANT",
      createdBy: "",
      senderId: "",
      subject: "Customer Receipt",
    });
  };


  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
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
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Receipts</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Dashboards</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Receipts</a>
                    </li>
                    <li className="breadcrumb-item active">All Receipts</li>
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
                      Receipts
                    </h4>
                    <div className="d-flex justify-content-end align-items-center">
                      <div>
                        <div>
                          {/*<form className="app-search d-none d-lg-block">*/}
                          {/*  <div className="position-relative">*/}
                          {/*    <input*/}
                          {/*      type="text"*/}
                          {/*      className="form-control"*/}
                          {/*      placeholder="Search..."*/}
                          {/*      // onChange={(e) => setSearchTerm(e.target.value)}*/}
                          {/*    />*/}
                          {/*    <span className="bx bx-search-alt"></span>*/}
                          {/*  </div>*/}
                          {/*</form>*/}
                        </div>
                      </div>
                      {/*<div>*/}
                      {/*  <select className={"btn btn-primary"} name="" id="">*/}
                      {/*    <option value={parseInt(100)}>100</option>*/}
                      {/*    <option value={parseInt(20)}>20</option>*/}
                      {/*    <option value={parseInt(10)}>10</option>*/}
                      {/*    <option value={parseInt(5)}>5</option>*/}
                      {/*  </select>*/}
                      {/*</div>*/}
                      {/*<div className="col-6">*/}
                      {/*  <div className="input-group" id="datepicker1">*/}
                      {/*    <input*/}
                      {/*      type="text"*/}
                      {/*      className="form-control mouse-pointer sdate"*/}
                      {/*      placeholder={`${startDate}`}*/}
                      {/*      name="dob"*/}
                      {/*      readOnly*/}
                      {/*      data-date-format="dd M, yyyy"*/}
                      {/*      data-date-container="#datepicker1"*/}
                      {/*      data-provide="datepicker"*/}
                      {/*      data-date-autoclose="true"*/}
                      {/*      data-date-end-date="+0d"*/}
                      {/*    />*/}
                      {/*    <span className="input-group-text">*/}
                      {/*      <i className="mdi mdi-calendar"></i>*/}
                      {/*    </span>*/}
                      {/*    <input*/}
                      {/*      type="text"*/}
                      {/*      className="form-control mouse-pointer edate"*/}
                      {/*      name="dob"*/}
                      {/*      placeholder={`${endDate}`}*/}
                      {/*      readOnly*/}
                      {/*      data-date-format="dd M, yyyy"*/}
                      {/*      data-date-container="#datepicker1"*/}
                      {/*      data-provide="datepicker"*/}
                      {/*      data-date-autoclose="true"*/}
                      {/*    />*/}
                      {/*    <span className="input-group-text">*/}
                      {/*      <i className="mdi mdi-calendar"></i>*/}
                      {/*    </span>*/}
                      {/*    <button className="btn btn-primary" onClick={sort}>*/}
                      {/*      filter*/}
                      {/*    </button>*/}
                      {/*  </div>*/}
                      {/*</div>*/}
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

                <Message details={details} mode={mode} clear={clear} />
                <div className="card-body">
                  <div className="table-responsive overflow-visible">
                    <table
                      className="table align-middle table-hover  contacts-table table-striped "
                      id="datatable-buttons"
                    >
                      <thead className="table-light">
                        <tr className="table-dark">

                          <th>receiptNo</th>
                          <th>paid by</th>
                          <th>bill amount</th>
                          <th>bill balance</th>
                          <th>payment mode</th>
                          <th>payment ref</th>
                          <th></th>
                          <th>Date Created</th>
                          <th className="text-right">Actions</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {statements &&
                          statements?.length > 0 &&
                          statements?.map((statement, index) => (
                            <tr data-id={index} key={index}>
                              <td>{statement.receiptNo}</td>
                              <td>{statement.paidBy}</td>
                              <td>
                                {statement?.tenant?.tenantType ===
                                  "INDIVIDUAL" ? (
                                  <>
                                    {statement?.tenant?.firstName}{" "}
                                    {statement?.tenant?.lastName}
                                  </>
                                ) : (
                                  <>{statement?.tenant?.companyName}</>
                                )}
                              </td>
                              <td>
                                {formatCurrency.format(
                                  JSON.parse(statement.response).receiptInfo
                                    .billAmount
                                )}
                              </td>
                              <td>
                                {formatCurrency.format(
                                  JSON.parse(statement.response).receiptInfo
                                    .billBalance
                                )}
                              </td>
                              <td>{statement.paymentMode}</td>
                              <td>{statement.payReferenceNo}</td>
                              <td>{moment(statement.dateTimeCreated).format("YYYY-MM-DD HH:mm")}</td>

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
                                      <span
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() =>
                                          getOneInvoice(statement.billNo)
                                        }
                                      >
                                        <i className="font-size-15 mdi mdi-eye me-3 "></i>
                                        View
                                      </span>
                                      <a className="dropdown-item " href="# ">
                                        <i className="font-size-15 mdi mdi-printer me-3 "></i>
                                        Print
                                      </a>
                                      <a className="dropdown-item "
                                        onClick={() => {
                                          handleModeChange("Email");
                                          handleClicked(statement, "Email");
                                        }}>
                                        <i className="font-size-15 mdi mdi-email me-3 "></i>
                                        Email Tenant
                                      </a>
                                      <a className="dropdown-item "
                                        onClick={() => {
                                          handleModeChange("SMS");
                                          handleClicked(statement, "SMS");
                                        }}>
                                        <i className="font-size-15 mdi mdi-chat me-3 "></i>
                                        Send as SMS
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot className="table-light">
                        <tr>
                          <th
                            className="text-capitalize text-nowrap"
                            colSpan="3"
                          >
                            {statements && statements?.length} Receipts
                          </th>
                          <td className="text-nowrap text-right" colSpan="7">
                            <span className="fw-semibold">
                              {/*{formatCurrency.format(total())}*/}
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  {/*<div className="mt-4 mb-0 flex justify-between px-8">*/}
                  {/*  {pageCount !== 0 && (*/}
                  {/*    <p className=" font-medium text-xs text-gray-700">*/}
                  {/*      {" "}*/}
                  {/*      showing page{" "}*/}
                  {/*      <span className="text-green-700 text-opacity-100 font-bold text-sm">*/}
                  {/*        {page + 1}*/}
                  {/*      </span>{" "}*/}
                  {/*      of{" "}*/}
                  {/*      <span className="text-sm font-bold text-black">*/}
                  {/*        {pageCount}*/}
                  {/*      </span>{" "}*/}
                  {/*      pages*/}
                  {/*    </p>*/}
                  {/*  )}*/}

                  {/*  {pageCount !== 0 && (*/}
                  {/*    <ReactPaginate*/}
                  {/*      previousLabel={"prev"}*/}
                  {/*      nextLabel={"next"}*/}
                  {/*      breakLabel={"..."}*/}
                  {/*      pageCount={pageCount} // total number of pages needed*/}
                  {/*      marginPagesDisplayed={2}*/}
                  {/*      pageRangeDisplayed={1}*/}
                  {/*      onPageChange={handlePageClick}*/}
                  {/*      breakClassName={"page-item"}*/}
                  {/*      breakLinkClassName={"page-link"}*/}
                  {/*      containerClassName={"pagination"}*/}
                  {/*      pageClassName={"page-item"}*/}
                  {/*      pageLinkClassName={"page-link"}*/}
                  {/*      previousClassName={"page-item"}*/}
                  {/*      previousLinkClassName={"page-link"}*/}
                  {/*      nextClassName={"page-item"}*/}
                  {/*      nextLinkClassName={"page-link"}*/}
                  {/*      activeClassName={"active"}*/}
                  {/*    />*/}
                  {/*  )}*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={invoice_show} onHide={closeInvoice} size="lg" centered>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Receipt Details
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12">
            <address>
              <strong>Billed To:</strong>
              {activeInvoice.tenant?.tenantType === "INDIVIDUAL" ? (
                <>
                  <div>
                    <br />
                    {activeInvoice?.tenant?.firstName}{" "}
                    {activeInvoice?.tenant?.lastName}
                    {activeInvoice?.tenant?.otherName}
                    <br />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <br />
                    {activeInvoice?.tenant?.companyName}{" "}
                    {activeInvoice?.tenant?.companyIncorporationNumber}{" "}
                    {activeInvoice?.tenant?.companyAddress}
                    <br />
                  </div>
                </>
              )}
              <br />
              {activeInvoice?.tenant?.email}
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
          </div>
          <div className="col-12">
            <div className="py-2 mt-3">
              <h3 className="font-size-15 fw-bold">
                Statement Details ({" "}
                <span className="text-primary fw-medium">
                  {activeInvoice?.receiptNo}
                </span>{" "}
                )
              </h3>
            </div>
          </div>
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-nowrap">
                <thead>
                  <tr>
                    <th>Receipt No</th>
                    <th>Paid By</th>
                    <th>Bill Amount</th>
                    <th>Bill Balance</th>
                    <th>Payment Mode</th>
                    <th>Payment Ref</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{activeInvoice?.receiptNo}</td>
                    <td>{activeInvoice?.paidBy}</td>
                    {Object.keys(activeInvoice).length > 0 ? (
                      <>
                        <td>
                          {formatCurrency.format(
                            JSON.parse(activeInvoice?.response).receiptInfo
                              .billAmount
                          )}
                        </td>
                        <td>
                          {formatCurrency.format(
                            JSON.parse(activeInvoice?.response).receiptInfo
                              .billBalance
                          )}
                        </td>
                      </>
                    ) : (
                      <></>
                    )}
                    <td>{activeInvoice?.paymentMode}</td>
                    <td>{activeInvoice?.payReferenceNo}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Receipts;
