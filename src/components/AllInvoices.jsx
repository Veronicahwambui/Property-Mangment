/* global $ */
import React, { useState, useEffect } from "react";
import requestsServiceService from "../services/requestsService.service";
import { Modal } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from "react-paginate";
import DatePickRange from "./Datepicker";
import ViewInvoice from "./ViewInvoice";

import StatusBadge from "./StatusBadge";
import AuthService from "../services/auth.service";
import Message from "./Message";



function AllInvoices({ entityType, id  }){


// * ==============================
  // invoice stuff
  // * ==============================
  const [invoices, setinvoices] = useState([]);
  const [activeInvoice, setActiveInvoice] = useState({});
  const [size3, setSize3] = useState(10);
  const [pageCount3, setPageCount3] = useState(0);
  const [page3, setPage3] = useState(0);
  const [status, setStatus] = useState("");
  const [startDate3, setStartDate3] = useState(
    moment("2022-01-01").startOf("month").format("YYYY-MM-DD")
  );
  const [endDate3, setEndDate3] = useState(
    moment(new Date()).add(3, "M").format("YYYY-MM-DD")
  );

  const [invoice_show, setinvoice_show] = useState(false);
  const showInvoice = () => setinvoice_show(true);
  const [transaction, settransaction] = useState({});
  const [paymentItems, setpaymentItems] = useState([]);
  const [page, setPage] = useState(0);

  const closeInvoice = () => {
    setinvoice_show(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    getInvoices();
  }, [size3, page3, activeInvoice, transaction, paymentItems]);

  const sort2 = (event) => {
    event.preventDefault();
    let data = {
      startDate: startDate3,
      endDate: endDate3,
      // size: size,
      // page: page,
      landlordId: parseInt(id),
      search: searchTerm,
    };
    requestsServiceService.getSortedInvoices(page3, size3, data).then((res) => {
      setPageCount3(res.data.totalPages);
      setinvoices(res.data.data);
    });
  };
  const sortSize2 = (e) => {
    setSize3(e.target.value);
    setPage3(0);
  };
  const getInvoices = () => {
    let data = {
      startDate: startDate3,
      endDate: endDate3,
      landlordId: parseInt(id),
      search: searchTerm.trim(),
    };
    requestsServiceService.getSortedInvoices(page3, size3, data).then((res) => {
      setPageCount3(res.data.totalPages);
      setinvoices(res.data.data);
      setStatus("");
      window.scrollTo(0, 0);
    });
  };
  const handlePageClick3 = (data) => {
    console.log(data);
    let d = data.selected;
    setPage3(d);
  };
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  
  const [mode, setmode] = useState("");
  const handleModeChange = (mode) => {
    setmode(mode);
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
    setSize3(100);
    setPage3(1);
  };
  const getOneInvoice = (id) => {
    let one = invoices.find((one) => one.transactionItemId === id);
    setActiveInvoice(one);
    showInvoice();
  };
   
  const [details, setDetails] = useState({
    message: "",
    contact: "",
    recipientName: "",
    entity: null,
    clientName: JSON.parse(AuthService.getCurrentUserName()).client?.name,
    clientId: parseInt(AuthService.getClientId()),
    entityType: entityType,
    createdBy: "",
    senderId: "",
    subject: "Invoice Payment",
  });
  useEffect(() => { }, [details, mode]);

  const clear2 = () => {
    setDetails({
      ...details,
      message: "",
      contact: "",
      recipientName: "",
      entity: null,
      clientName: JSON.parse(AuthService.getCurrentUserName()).client?.name,
      clientId: parseInt(AuthService.getClientId()),
      entityType: entityType,
      createdBy: "",
      senderId: "",
      subject: "Invoice Payment",
    });
  };
  const handleClicked = (inv, mod) => {
    let mes = `Dear ${inv.transactionCustomerName}, your invoice ${inv.billerBillNo
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
      entity: inv.transaction?.landLord?.id,
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
 
return(
    <>
    <div className="">
      <div className="container-fluid">
        <Message details={details} mode={mode} clear={clear2} />
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

                  <div className="d-flex justify-content-end align-items-center align-items-center pr-3">
                    <div>
                      <form className="app-search d-none d-lg-block p-2">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            onChange={(e) =>
                              setSearchTerm(e.target.value)
                            }
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
                        <DatePickRange
                          onCallback={handleCallback}
                          startDate={moment(date.startDate).format(
                            "YYYY-MM-DD"
                          )}
                          endDate={moment(date.endDate).format(
                            "YYYY-MM-DD"
                          )}
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={sort2}
                    >
                      filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table align-middle table-hover  contacts-table table-striped ">
                    <thead className="table-light">
                      <tr className="table-light">
                        <th>Invoice No</th>
                        <th>Bill Ref</th>
                        <th className="text-capitalize">{entityType.toLowerCase()}</th>
                        <th>Properties</th>
                        <th>Hse/Unit</th>
                        <th>Charge Name</th>
                        <th>Bill Amount</th>
                        <th>Paid Amount</th>
                        <th>Total Balance</th>
                        <th>Due Date</th>
                        <th>Payment Status</th>
                        <th>Date Created</th>
                        <th>Actions</th>
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
                            <td>
                              {invoice.transaction.premiseUnitName}
                            </td>
                            <td>{invoice.applicableChargeName}</td>
                            <td>
                              {formatCurrency.format(
                                invoice.billAmount
                              )}
                            </td>
                            <td>
                              {formatCurrency.format(
                                invoice.billPaidAmount
                              )}
                            </td>
                            <td className={"text-right"}>
                              <span
                                className={
                                  invoice.billPaidAmount >
                                    invoice.billAmount
                                    ? "fw-semibold text-success"
                                    : "fw-semibold text-danger"
                                }
                              >
                                {formatCurrency.format(
                                  invoice.billAmount -
                                  invoice.billPaidAmount
                                )}
                              </span>
                            </td>
                            <td>
                              {moment(invoice?.invoiceDate).format(
                                "DD-MM-YYYY"
                              )}
                            </td>
                            <td>
                              <StatusBadge
                                type={invoice?.paymentStatus}
                              />
                            </td>
                            <td>
                              {moment(invoice.dateTimeCreated).format(
                                "YYYY-MM-DD HH:mm"
                              )}
                            </td>
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
                                    <a
                                      className="dropdown-item cursor-pointer"
                                      onClick={() => {
                                        handleModeChange("Email");
                                        handleClicked(
                                          invoice,
                                          "Email"
                                        );
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
                  </table>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  {pageCount3 !== 0 && (
                    <>
                      <select
                        className="btn btn-md btn-primary"
                        title="Select A range"
                        onChange={(e) => sortSize2(e)}
                        value={size3}
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
                          pageCount={pageCount3}
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
                          onPageChange={(data) =>
                            handlePageClick3(data)
                          }
                          forcePage={page3}
                        />
                      </nav>
                    </>
                  )}
                </div>
                {pageCount3 !== 0 && (
                  <p className="font-medium  text-muted">
                    showing page{" "}
                    <span className="text-primary">
                      {pageCount3 === 0 ? page : page3 + 1}
                    </span>{" "}
                    of
                    <span className="text-primary">
                      {" "}
                      {pageCount3}
                    </span>{" "}
                    pages
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/*VIEW INVOICE*/}
    <ViewInvoice
      show={invoice_show}
      closeInvoice={closeInvoice}
      activeInvoice={activeInvoice}
    />
  </>
)
                }
export default AllInvoices;