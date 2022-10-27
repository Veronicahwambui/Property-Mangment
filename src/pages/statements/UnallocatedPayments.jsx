/* global $ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { Modal } from "react-bootstrap";

function UnallocatedPayments() {
  const [statements, setstatements] = useState([]);

  useEffect(() => {
    getUnallocatedPayments();
  }, []);
  const getUnallocatedPayments = () => {
    requestsServiceService.getUnallocatedStatements().then((res) => {
      setstatements(res.data.data);
      $("#spinner").addClass("d-none");
    });
  };
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  const parseJSON = (x) => {
    return JSON.parse(x);
  };
  // PAGINATION
  const sortSize = (e) => {
    setSize(e.target.value);
  };
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentStatements, setCurrentStatements] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setCurrentStatements(statements?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(statements?.length / size));
  }, [itemOffset, size, statements]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * size) % statements?.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  // allocations
  const [allocateModal, setallocateModal] = useState(false);
  const showallocateModal = () => setallocateModal(true);
  const hideallocateModal = () => setallocateModal(false);

  return (
    <div className="page-content">
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">Unallocated Payments</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Dashboards</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Statements</a>
                  </li>
                  <li className="breadcrumb-item active">
                    Unallocated Payments
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
                    Unallocated Payments
                  </h4>
                  <div className="d-flex justify-content-end align-items-center">
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive overflow-visible">
                  <table className="table align-middle table-hover  contacts-table table-striped text-capitalize">
                    <thead className="table-light">
                      <tr className="table-dark">
                        <th>Bill No</th>
                        <th>Receipt Amount</th>
                        <th>Pay Reference No</th>
                        <th>Payment Mode</th>
                        <th>Paid By</th>
                        <th>Utilized Amount</th>
                        <th>Date Created</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStatements?.length > 0 &&
                        currentStatements?.map((statement, index) => (
                          <tr data-id={index} key={index}>
                            <td>{statement.billNo}</td>
                            <td>
                              {statement.receiptAmount
                                ? formatCurrency.format(statement.receiptAmount)
                                : statement.receiptAmount}
                            </td>
                            <td>{statement.payReferenceNo}</td>
                            <td>{statement.paymentMode}</td>
                            <td>{statement.paidBy}</td>
                            <td>
                              {formatCurrency.format(statement.utilisedAmount)}
                            </td>
                            <td>
                              {moment(statement.dateTimeCreated).format(
                                "YYYY-MM-DD HH:mm"
                              )}
                            </td>

                            <td>
                              <div className="d-flex justify-content-end">
                                <div className="dropdown">
                                  <a
                                    className="text-muted font-size-16 cursor-pinter"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                  >
                                    <i className="bx bx-dots-vertical-rounded"></i>
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-end ">
                                    {/*<span className="dropdown-item cursor-pinter">*/}
                                    {/*  <i className="font-size-15 mdi mdi-eye me-3 "></i>*/}
                                    {/*  View*/}
                                    {/*</span>*/}
                                    <a
                                      className="dropdown-item  cursor-pointer"
                                      onClick={showallocateModal}
                                    >
                                      <i className="font-size-15 mdi mdi-account-check me-3 "></i>
                                      Allocate
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
                        <th className="text-capitalize text-nowrap" colSpan="3">
                          {currentStatements && currentStatements?.length}{" "}
                          Statements
                        </th>
                        <td className="text-nowrap text-right" colSpan="7">
                          <span className="fw-semibold">
                            {/*{formatCurrency.format(total())}*/}
                          </span>
                        </td>
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
                    <p className="font-medium  text-muted">
                      showing page{" "}
                      <span className="text-primary">
                        {pageCount === 0 ? page : page + 1}
                      </span>{" "}
                      of
                      <span className="text-primary"> {pageCount}</span> pages
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={allocateModal} onHide={hideallocateModal} size="md" centered>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Allocate Payment
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group justify-content-center d-flex flex-column"></div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button className="btn btn-sm btn-primary" type="submit">
              Allocate
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UnallocatedPayments;
