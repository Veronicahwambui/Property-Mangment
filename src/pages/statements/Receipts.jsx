/* global $ */
import React, { useState, useEffect , useRef } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import { useReactToPrint } from 'react-to-print';
import moment from "moment";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import authService from "../../services/auth.service";
import Message from "../../components/Message";

function Receipts() {
  const [statements, setstatements] = useState([]);
  const [activeInvoice, setactiveInvoice] = useState({});
  const [activeInvoiceItems, setactiveInvoiceItems] = useState([]);
  const [startDate, setStartDate] = useState("01/12/2022");
  const [endDate, setEndDate] = useState("12/12/2022");
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });

  useEffect(() => {
    getStatements();
  }, []);
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
    const newOffset = (event.selected * size) % statements.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

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
  const getOneInvoice = (id ) => {

    requestsServiceService.getOneStatement(id).then((res) => {
      setactiveInvoice(res.data.data.paymentStatement);
      setactiveInvoiceItems(res.data.data.items);
      showInvoice();
      $("#spinner").addClass("d-none");
    }).catch((err)=>{
       showInvoice();
    })

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
    let mes = `Dear ${inv.paidBy}, your payment for invoice ${
      inv.billNo
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
      contact: mod === "Email" ? inv?.tenant?.email : inv?.tenant?.phoneNumber,
      entity: inv.tenant != undefined ? inv.tenant.id : inv.id,
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
      entityType: "TENANT",
      createdBy: "",
      senderId: "",
      subject: "Customer Receipt",
    });
  };

        // ^============ printing section   =====================

        const componentRef = useRef(null);

        const handlePrint = useReactToPrint({
          content: () => componentRef.current,
        });
      

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
                  </div>
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
                          <th>ReceiptNo</th>
                          <th>Paid by</th>
                          <th>Tenant</th>
                          <th>Receipt Amount</th>
                          <th>Utilised Amount</th>
                          <th>Utilised By</th>
                          <th>Payment mode</th>
                          <th>Payment ref</th>
                          <th>Date Created</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentStatements?.length > 0 &&
                          currentStatements?.map((statement, index) => (
                            <tr data-id={index} key={index}>
                              <td>{ JSON.parse(statement.response).receiptNo}</td>
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
                                  statement.receiptAmount
                                )}
                              </td>
                              <td>
                                {formatCurrency.format(
                                  statement.utilisedAmount
                                )}
                              </td>
                              <td>{statement.utilisedBy}</td>
                              <td>{statement.paymentMode}</td>
                              <td>{statement.payReferenceNo}</td>
                              <td>
                                {moment(statement.dateTimeCreated).format(
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
                                    <div className="dropdown-menu dropdown-menu-end cursor-pointer">
                                      <a
                                        className="dropdown-item cursor-pointer"
                                        onClick={() =>
                                          getOneInvoice(statement.id)
                                        }
                                      >
                                        <i className="font-size-15 mdi mdi-eye me-3 "></i>
                                        View
                                      </a>
                                     
                                      <a
                                        className="dropdown-item "
                                        onClick={() => {
                                          handleModeChange("Email");
                                          handleClicked(statement, "Email");
                                        }}
                                      >
                                        <i className="font-size-15 mdi mdi-email me-3 "></i>
                                        Email Tenant
                                      </a>
                                      <a
                                        className="dropdown-item "
                                        onClick={() => {
                                          handleModeChange("SMS");
                                          handleClicked(statement, "SMS");
                                        }}
                                      >
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
                            {currentStatements && currentStatements?.length}{" "}
                            Receipts
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
      </div>

      <Modal show={invoice_show} onHide={closeInvoice} size="lg" centered>
        <div  ref={componentRef} className="print-div" >
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Receipt Details
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12">
            <address>
              <strong>Paid By : </strong>
              {activeInvoice?.paidBy}
              <br />
              <br />
              <p>
               <strong>Issue date : </strong> {" "}
                {moment(activeInvoice.dateTimeCreated).format("DD-MM-YYYY")}
              </p>
             
            </address>
          </div>
          <div className="col-12">
            <div className="py-2 mt-3">
              <h3 className="font-size-15 fw-bold">
                Statement Details ({"Receipt No : "}
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
                    <th>Payment Mode</th>
                    <th>Payment Ref</th>
                    <th>Receipt Amount</th>
                    <th>Utilised Amount</th>
                    <th>Utilised By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>

                    <td>{activeInvoice?.paymentMode}</td>
                    <td>{activeInvoice?.payReferenceNo}</td>
                    <td>{formatCurrency.format(activeInvoice?.receiptAmount)}</td>
                    <td>{formatCurrency.format(activeInvoice?.utilisedAmount)}</td>
                    <td>{activeInvoice?.utilisedBy}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-12 mt-4">
          <h3 className="font-size-15 fw-bold">Receipt Items</h3>
            <div className="table-responsive">
              <table className="table table-nowrap">
                <thead>
                  <tr>
                    <th>Item Id</th>
                    <th>Title</th>
                    <th>Decription</th>
                    <th>Bill Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {activeInvoiceItems?.map((item)=>(
                  <tr key={item.id}>
                    <td>{item.transactionItemId}</td>
                    <td>{item.transactionTitle}</td>
                    <td>{item.transactionDescription}</td>
                    <td>{formatCurrency.format(item.amount)}</td>
                    
                  </tr>

                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button className="btn btn-success print-btn" onClick={handlePrint}>Print Receipt</button>

        </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default Receipts;
