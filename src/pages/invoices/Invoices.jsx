/* global $ */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from "react-paginate";
import axios from "axios";
import StatusBadge from "../../components/StatusBadge";
import Message from "../../components/Message";
import AuthService from "../../services/auth.service";
import DatePickRange from "../../components/Datepicker";
import DatePicker from "react-datepicker";

function Invoices() {
  const [invoices, setinvoices] = useState([]);
  const [activeInvoice, setactiveInvoice] = useState({});
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  // MODAL
  const [invoice_show, setinvoice_show] = useState(false);
  const [invoice_Date_show, setinvoice_Date_show] = useState(false);
  const [receive_payment, setreceive_payment] = useState(false);
  const [receivepaymentInvoice, setreceivepaymentInvoices] = useState([]);
  const showInvoice = () => setinvoice_show(true);
  const closeInvoice = () => setinvoice_show(false);

  const showInvoiceDate = () => setinvoice_Date_show(true);
  const closeInvoiceDate = () => setinvoice_Date_show(false);

  const showReceivePayment = () => setreceive_payment(true);
  const closeReceivePayment = () => setreceive_payment(false);

  const [billamount, setbillAmount] = useState("");
  const [receivePaymentData, setReceivePaymentData] = useState({
    approvalStatus: "NEUTRAL",
    billAmount: "5.0",
    billBalance: "0.0",
    billId: 7317,
    billNo: "BC2208-235869",
    childAdminId: 47278,
    clientAccountNo: "TR-I00016141",
    clientPhoneNo: "0700000",
    createdBy: 3,
    dateCreated: "2022-08-23T08:15:48.000Z",
    dateModified: null,
    grandChildAdminId: 472781386,
    incomeType: 1,
    incomeTypeDescription: "BASIC CLASSES",
    isActive: 1,
    modifiedBy: 3,
    paidBy: "-",
    paidFor: 0,
    parentAdminId: 47,
    payReferenceNo: uuid().toString().toUpperCase(),
    paymentId: 415,
    paymentMode: "CASH",
    printCount: 0,
    printable: true,
    receiptAmount: billamount,
    receiptDate: null,
    receiptInfoId: 27,
    receiptNo: "22010823000026",
    receiptSecurityCode:
      "3ce0b2f5bedfdce52aeb98cf24dcf79682d7d9880b5d0223f03a35f54b5cf9dd",
    receiptStatus: "1",
    sessionCode: null,
    subSystemUserId: "123",
    subSystemUserName: "Test User",
  });
  const receiveOnePayment = (item) => {
    setreceivepaymentInvoices(item);
    setReceivePaymentData({
      ...receivePaymentData,
      billAmount: item.billAmount,
      billBalance: item.billAmount - item.billPaidAmount,
      billNo: item.billerBillNo,
      clientAccountNo: item.transactionItemId,
      receiptNo: undefined,
      payReferenceNo: uuid().toString(),
      clientPhoneNo: item.transaction.tenancy.tenant.phoneNumber,
    });
    showReceivePayment();
  };

  const handleReceivePayment = (e) => {
    e.preventDefault();
    let paymentdata = receivePaymentData;
    let d = {
      receiptAmount: parseInt(billamount),
    };
    let finalPaymentData = Object.assign(paymentdata, d);
    let finalData = {
      status: 200,
      message: 1,
      data: [
        {
          receiptInfo: finalPaymentData,
        },
      ],
    };
    requestsServiceService
      .receivePayment(finalData)
      .then((res) => {
        setError({
          ...error,
          message: res.data.message,
          color: "success",
        });
        getInvoices();
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
          closeReceivePayment();
        }, 2000);
      })
      .catch((err) => {
        setError({
          ...error,
          message: err.data.message,
          color: "danger",
        });
      });
  };
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
  const [oldInvoiceDate, setOldInvoiceDate] = useState(new Date());
  const [newInvoiceDate, setNewInvoiceDate] = useState(new Date());
  const [newInvoiceId, setNewInvoiceId] = useState(undefined);

  const [error, setError] = useState({
    message: "",
    color: "",
  });

  useEffect(() => {
    getInvoices();
  }, []);

  useEffect(() => {
    getInvoices();
  }, [page, size]);

  const sort = (event) => {
    event.preventDefault();
    let data = {
      startDate: moment(date.startDate).format("YYYY-MM-DD"),
      endDate: moment(date.endDate).format("YYYY-MM-DD"),
      size: size,
      page: page,
      search: searchTerm?.toLowerCase().trim(),
    };
    requestsServiceService
      .getInvoices(data)
      .then((res) => {
        setPageCount(res.data.totalPages);
        setinvoices(res.data.data);
        $("#spinner").addClass("d-none");
      })
      .then(() => {});
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
      searchTerm: searchTerm.trim(),
    };
    requestsServiceService.getInvoices(data).then((res) => {
      setPageCount(res.data.totalPages);
      setinvoices(res.data.data);
      $("#spinner").addClass("d-none");
      window.scrollTo(0, 0);
    });
  };
  const handlePageClick = (data) => {
    let d = data.selected;
    setPage(d);
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
    let acc = invoices.find((invoice) => invoice.transactionItemId === id);
    setactiveInvoice(acc);
    showInvoice();
  };
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
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

  const extendInvoiceDay = (id, date) => {
    showInvoiceDate();
    setNewInvoiceId(id);
    setNewInvoiceDate(new Date(date));
    setOldInvoiceDate(new Date(date));
  };

  const extendDay = () => {
    requestsServiceService
      .adjustPaymentTransactionItemDueDate(
        newInvoiceId,
        moment(newInvoiceDate).format("YYYY/MM/DD")
      )
      .then((res) => {
        getInvoices();
        setError({
          ...error,
          message: res.data.message,
          color: "success",
        });

        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });

          closeInvoiceDate();
        }, 4000);
      });
  };

  function uuid() {
    return "XXXXXXXXXXX".replace(/[XY]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "X" ? r : (r & 0x7) | 0x10;
      v = v.toString(16);
      return v.toUpperCase();
    });
  }
  const generateBillNo = () => {
    console.log("");
  };
  return (
    <>
      <div className="page-content">
        <Message details={details} mode={mode} clear={clear} />

        <div className="container-fluid">
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

                    <div className="d-flex justify-content-end align-items-center align-items-center pr-3">
                      <div>
                        <form className="app-search d-none d-lg-block p-2">
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
                            endDate={moment(date.endDate).format("YYYY-MM-DD")}
                          />
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={sort}>
                        filter
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table align-middle table-hover  contacts-table table-striped "
                      id="datatable-buttons"
                    >
                      <thead className="table-light">
                        <tr className="table-light">
                          <th>Invoice No</th>
                          <th>Bill Ref</th>
                          <th>Tenant</th>
                          <th>Properties</th>
                          <th>Hse/Unit</th>
                          <th>Charge Name</th>
                          <th>Bill Amount</th>
                          <th>Paid Amount</th>
                          <th>Total Balance</th>
                          <th>Due Date</th>
                          <th>Payment Status</th>
                          <th>Date Created</th>
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
                              <td className={"text-right"}>
                                <span
                                  className={
                                    invoice.billPaidAmount > invoice.billAmount
                                      ? "fw-semibold text-success"
                                      : "fw-semibold text-danger"
                                  }
                                >
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
                                      {(invoice?.paymentStatus ===
                                        "Partially-Paid" ||
                                        invoice?.paymentStatus ===
                                          "PENDING") && (
                                        <a
                                          className="dropdown-item cursor-pointer"
                                          onClick={() =>
                                            extendInvoiceDay(
                                              invoice.transactionItemId,
                                              invoice.invoiceDate
                                            )
                                          }
                                        >
                                          <i className="font-size-15 mdi mdi-calendar-arrow-right me-3"></i>
                                          Extend Invoice Dates
                                        </a>
                                      )}
                                      {invoice.billerBillNo === null && (
                                        <a
                                          className="dropdown-item cursor-pointer"
                                          onClick={() => {
                                            generateBillNo(invoice);
                                          }}
                                        >
                                          <i className="font-size-15 mdi mdi-cog me-3"></i>
                                          Generate Bill No
                                        </a>
                                      )}
                                      {invoice.billerBillNo !== null && (
                                        <a
                                          className="dropdown-item cursor-pointer"
                                          onClick={() => {
                                            receiveOnePayment(invoice);
                                          }}
                                        >
                                          <i className="font-size-15 mdi mdi-cash-multiple me-3 "></i>
                                          Receive Payment
                                        </a>
                                      )}
                                      {/*<a className="dropdown-item">*/}
                                      {/*  <i className="font-size-15 mdi mdi-printer me-3 "></i>*/}
                                      {/*  Print*/}
                                      {/*</a>*/}
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
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
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
                            forcePage={page}
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
                  <td>{activeInvoice.quantity}</td>
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
        {(activeInvoice.paymentStatus === "PENDING" ||
          activeInvoice.paymentStatus === "Partially-Paid") && (
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
                            placeholder="0XXXXXXXXX"
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
        )}
      </Modal>

      {/* INVOICE DATE  */}
      <Modal
        show={invoice_Date_show}
        onHide={closeInvoiceDate}
        size="sm"
        centered
      >
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Extend Invoice Dates
          </h5>
        </Modal.Header>
        <Modal.Body>
          {error.color !== "" && (
            <div className={"alert alert-" + error.color} role="alert">
              {error.message}
            </div>
          )}
          <DatePicker
            selected={newInvoiceDate}
            onChange={(date) => setNewInvoiceDate(date)}
            className="form-control cursor-pointer"
            calendarClassName="form-group"
            minDate={oldInvoiceDate}
            // type="text"
          />
        </Modal.Body>
        <Modal.Footer>
          <center>
            <button className="btn btn-primary" onClick={extendDay}>
              Submit
            </button>
          </center>
        </Modal.Footer>
      </Modal>

      {/*RECEIVE PAYMENT */}
      <Modal
        show={receive_payment}
        onHide={closeReceivePayment}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Receive Payment
          </h5>
        </Modal.Header>
        <Modal.Body>
          <StatusBadge type={receivepaymentInvoice?.paymentStatus} />
          <div className="col-12">
            <address>
              <strong>Billed To:</strong>
              <br />
              {receivepaymentInvoice?.transaction?.tenantName} <br />
              {receivepaymentInvoice?.transactionCustomerEmail}
              <br />
              {receivepaymentInvoice?.transaction?.premiseName + " , "}
              {receivepaymentInvoice?.transaction?.premiseUnitName}
              <br />
              <br />
              <p>
                Issue date:{" "}
                {moment(receivepaymentInvoice.dateTimeCreated).format(
                  "DD-MM-YYYY"
                )}
              </p>
              <p>
                Due date:{" "}
                {moment(receivepaymentInvoice.invoiceDate).format("DD-MM-YYYY")}
              </p>
            </address>
            <p>Title: {receivepaymentInvoice?.transactionTitle}</p>
            <p>Description: {receivepaymentInvoice?.transactionDescription}</p>
          </div>
          <div className="col-12">
            <div className="py-2 mt-3">
              <h3 className="font-size-15 fw-bold">
                Invoice Details ({" "}
                <span className="text-primary fw-medium">
                  {receivepaymentInvoice?.transactionItemId}
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
                  <td>{receivepaymentInvoice?.applicableChargeName}</td>
                  <td>
                    {formatCurrency.format(receivepaymentInvoice.quantity)}
                  </td>
                  <td>
                    {formatCurrency.format(receivepaymentInvoice?.unitCost)}
                  </td>
                  <td className="text-end">
                    KES.{" "}
                    {formatCurrency.format(receivepaymentInvoice?.billAmount)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colSpan="2" className="text-end">
                    Total
                  </td>
                  <td className="text-end fw-bold">
                    {formatCurrency.format(receivepaymentInvoice?.billAmount)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colSpan="2" className="text-end">
                    Paid
                  </td>
                  <td className="text-end  fw-bold">
                    {formatCurrency.format(
                      receivepaymentInvoice?.billPaidAmount
                    )}
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
                        receivepaymentInvoice?.billAmount -
                          receivepaymentInvoice?.billPaidAmount
                      )}
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        {receivepaymentInvoice?.paymentStatus !== "Paid" && (
          <Modal.Footer>
            <div className="col-12">
              <form onSubmit={(e) => handleReceivePayment(e)}>
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
                          {/*<option value="Mpesa">MPESA</option>*/}
                          <option value="Cash">CASH</option>
                        </select>
                      </td>
                      <td className="px-3">
                        <div className="phone-num">
                          <label htmlFor="">Amount.</label>
                          <input
                            className="form-control w-100 d-flex"
                            spellCheck="false"
                            onChange={(event) =>
                              setbillAmount(event.target.value)
                            }
                            placeholder="Enter amount"
                            data-ms-editor="true"
                            type="text"
                            id="billamount"
                            name="billamount"
                            required={true}
                          />
                        </div>
                      </td>
                      <td className="text-right float-right">
                        <div className="d-flex flex-column">
                          <label className="opacity-0">Something</label>
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
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
        )}
      </Modal>
    </>
  );
}

export default Invoices;
