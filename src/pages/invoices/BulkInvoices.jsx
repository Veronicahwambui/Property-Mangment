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

function BulkInvoices() {
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
  useEffect(() => { }, [transaction]);
  useEffect(() => { }, [paymentItems]);
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
    requestsServiceService.getBulkInvoices().then((res) => {
      setinvoices(res.data.data!=null?res.data.data:[]);
      setPage(res.data.page);
      setSize(res.data.size);
      setPageCount(res.data.totalPages);
      window.scrollTo(0, 0);
    });
  };
  const sortSize = (e) => {
    setSize(e.target.value);
    setPage(0);
  };
  const getInvoices = () => {
    requestsServiceService.getBulkInvoices(page ,size).then((res) => {
      setinvoices(res.data.data!=null?res.data.data:[]);
      setPage(res.data.page);
      setSize(res.data.size);
      setPageCount(res.data.totalPages);
      window.scrollTo(0, 0);
    });
  };

  
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  

  const handlePageClick = (data) => {
    setPage(() => data.selected);
  };

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Invoices</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/invoices"> All Invoices </Link>
                    </li>
                    <li className="breadcrumb-item active">Bulk Invoices</li>
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
                      Bulk Invoices
                    </h4>

                    <Link to="/bulk-invoicing" >
                      <button type="button" className="btn btn-primary waves-effect btn-label waves-light me-3"
                              data-bs-toggle="modal" data-bs-target="#add-new-client">
                        <i className="mdi mdi-plus label-icon"></i> New Bulk Invoice
                      </button>
                    </Link>
                    
                  </div>

                </div>
                <div className="card-body">
                  <div className="table-responsive overflow-visible">
                    <table
                      className="table align-middle table-hover  contacts-table table-striped "
                      id="datatable-buttons"
                    >
                      <thead className="table-light">
                        <tr className="table-dark">

                          <th>Bulk Reference</th>
                          <th>Invoice Title</th>
                          <th>Quantity</th>
                          <th>Unit Cost</th>
                          <th>Bill Amount</th>
                          <th>Invoice Date</th>
                          
                          <th>Status</th>
                          <th>Date Created</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.length > 0 &&
                          invoices?.map((invoice, index) => (
                            <tr data-id={index} key={index}>

                              <td>
                                {invoice.bulkReference}
                              </td>
                              <td>{invoice.invoiceTitle}</td>
                              <td>{invoice.quantity}</td>
                              <td>{formatCurrency.format(invoice.unitCost)}</td>
                              <td>{formatCurrency.format(invoice.billAmount)}</td>
                              <td>
                                {moment(invoice.invoiceDate).format(
                                  "MMMM Do YYYY"
                                )}
                              </td>
                              <td>
                                <StatusBadge type={invoice?.done ? "Done" : "In-Progress"} />
                              </td>
                              
                              <td>{moment(invoice.dateTimeCreated).format("YYYY-MM-DD HH:mm")}</td>

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
                    <p className="font-medium  text-muted">
                      showing page{" "}
                      <span className="text-primary">
                        {pageCount === 0 ? page : page + 1}
                      </span>{" "}
                      of<span className="text-primary"> {pageCount}</span> pages
                    </p>
                  )}
                  </div>
               
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default BulkInvoices;
