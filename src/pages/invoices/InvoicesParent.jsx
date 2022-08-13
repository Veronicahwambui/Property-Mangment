/* global $ */
import React, { useState, useEffect } from "react";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

function InvoicesParent() {
  const [invoices, setinvoices] = useState([]);
  const [activeInvoice] = useState({});
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).add(3, "M").format("YYYY-MM-DD")
  );
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
      startDate: startDate,
      endDate: endDate,
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
      startDate: startDate,
      endDate: endDate,
      size: size,
      page: page,
      search: status.trim(),
    };
    requestsServiceService.getParentInvoices(data).then((res) => {
      setPageCount(res.data.totalPages);
      setinvoices(res.data.data);
      setStatus('')
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
  const addDate = (date) => {
    setStartDate(new Date(date.target.value));
  };
  const addDate2 = (date) => {
    setEndDate(new Date(date.target.value));
  };

  $(document).on("change", ".sdate", addDate);
  $(document).on("change", ".edate", addDate2);

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
                    <div className="d-flex justify-content-end align-items-center">
                      <div>
                        <form className="app-search d-none d-lg-block">
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
                        <tr className="table-dark">
                    
                          <th>Invoice Number</th>
                          <th>Tenant</th>
                          <th>Premises</th>
                          <th>Hse/Unit</th>
                          <th>Date Issued</th>
                          <th>Payment Status</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.length > 0 &&
                          invoices?.map((invoice, index) => (
                            <tr data-id={index} key={index}>
                              
                              <td
                              >
                                {invoice.transactionId}
                              </td>
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
                                      <a className="dropdown-item " href="# ">
                                        <i className="font-size-15 mdi mdi-email me-3 "></i>
                                        Email Tenant
                                      </a>
                                      <a className="dropdown-item " href="# ">
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
