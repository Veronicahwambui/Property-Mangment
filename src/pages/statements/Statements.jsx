/* global $ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

function Statements() {
  const [statements, setstatements] = useState([]);
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
    });
  };
  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Statements</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Dashboards</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Statements</a>
                    </li>
                    <li className="breadcrumb-item active">All Statements</li>
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
                      Tenant Statements
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
                <div className="card-body">
                  <div className="table-responsive overflow-visible">
                    <table
                      className="table align-middle table-hover  contacts-table table-striped "
                      id="datatable-buttons"
                    >
                      <thead className="table-light">
                        <tr className="table-dark">
                          <th scope="col">
                            <div className="the-mail-checkbox pr-4">
                              <label htmlFor="selectAll" className="d-none">
                                Select All
                              </label>
                              <input
                                className="form-check-input mt-0 pt-0 form-check-dark"
                                type="checkbox"
                                id="selectAll"
                              />
                            </div>
                          </th>
                          <th>Bill No</th>
                          <th>Receipt Amount</th>
                          <th>Pay Reference No</th>
                          <th>Payment Mode</th>
                          <th>Paid by</th>
                          <th>Utilized Amount</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {statements && statements.length > 0 &&
                          statements?.map((statement, index) => (
                            <tr data-id={index} key={index}>
                              <td>
                                <div className="d-flex  align-items-center">
                                  <div className="the-mail-checkbox pr-4">
                                    <input
                                      className="form-check-input mt-0 pt-0 form-check-dark"
                                      type="checkbox"
                                      id="formCheck1"
                                    />
                                  </div>
                                </div>
                              </td>
                              <td>
                                {
                                  JSON.parse(statement.response).receiptInfo
                                    .clientAccountNo
                                }
                              </td>
                              <td>
                                {formatCurrency.format(statement.receiptAmount)}
                              </td>
                              <td>{statement.payReferenceNo}</td>
                              <td>{statement.paymentMode}</td>
                              <td>{statement.paidBy}</td>
                              <td>
                                {formatCurrency.format(
                                  statement.utilisedAmount
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
                                        // onClick={() =>
                                        //   getOneInvoice(
                                        //     invoice.transactionItemId
                                        //   )
                                        // }
                                      >
                                        <i className="font-size-15 mdi mdi-eye me-3 "></i>
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
                      <tfoot className="table-light">
                        <tr>
                          <th
                            className="text-capitalize text-nowrap"
                            colSpan="3"
                          >
                            {statements && statements.length} Statements
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
    </>
  );
}

export default Statements;
