/* global $ */
import React, { useState, useEffect } from "react";
import requestsServiceService from "../services/requestsService.service";
import { Modal } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from "react-paginate";
import DatePickRange from "./Datepicker";


function Statement({ entityType , id  }) { 

  const [statements, setstatements] = useState([]);
  const [activeInvoice, setactiveInvoice] = useState({});
  
  const [date, setDate] = useState({
    startDate: moment(new Date(new Date().getFullYear(), 0)).format("MM/DD/YYYY"),
    endDate: moment(new Date()).format("MM/DD/YYYY"),
  });
  const handleCallback = (sD, eD) => {
    setDate({
      ...date,
      startDate: moment(sD).format("MM/DD/YYYY"),
      endDate: moment(eD).format("MM/DD/YYYY"),
    });
  };
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });

  const [show, setShow] = useState(false);
  // const [billNo, setBillNo] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  // PAGINATION
  const sortSize = (e) => {
    setSize(e.target.value);
  };
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentStatements, setCurrentStatements] = useState([]);

  useEffect(()=>{ getStatements() },[]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setCurrentStatements(statements.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(statements.length / size));
  }, [itemOffset ,page , size, statements ]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * size) % statements.length;
    setItemOffset(newOffset);
    setPage(event.selected);
        // LOADER ANIMATION  
        $("#spinner").removeClass("d-none");
        setTimeout(() => {
            $("#spinner").addClass("d-none");
        }, 500);
  };

  const getStatement = (e) => {
    e.preventDefault();
    getStatements();
  }
  const getStatements= () => {
   let data = {}
   if ( entityType == undefined || id == undefined ) {
     data = {
       startDate: date.startDate,
       endDate: date.endDate,
       id: id,
       entityType: entityType,
       page: page,
       size: size,
    }

    requestsServiceService.getLandlordStatements(data).then((res) => {
      setstatements(res.data.data);
    });

      }else {
         data = {
          startDate: date.startDate,
          endDate: date.endDate,
          page: page,
          size: size,
       }

       requestsServiceService.getStatements(data).then((res) => {
        setstatements(res.data.data);
      });
      }
   
     
    
  };
  const [invoice_show, setinvoice_show] = useState(false);
  const showInvoice = () => setinvoice_show(true);
  const closeInvoice = () => setinvoice_show(false);
  const getOneInvoice = (bill) => {
    let acc = statements.find((statement) => statement.billNo === bill);
    setactiveInvoice(acc);
    showInvoice();
  };
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  const [utilData, setUtilData] = useState({
    newBillNo: "",
    statementId: "",
    tenantId: "",
  });

  const setUtilizeValues = (statementId, tenantId) => {
    setUtilData({
      ...utilData,
      newBillNo: "",
      statementId: statementId,
      tenantId: tenantId,
    });
  };

  const searchBillNo = async (e) => {
    e.preventDefault();
    handleClose();

    await requestsServiceService
      .viewTransactionItem(utilData.newBillNo)
      .then((res) => {
        console.log(res.data);
        if (res.data.paymentStatus !== "PAID" && res.data.status === true) {
          utilize();
        } else {
          setError({
            ...error,
            message: "ERROR: Bill is already paid",
            color: "danger",
          });
        }
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
        }, 2000);
      });
  };

  const utilize = () => {
    requestsServiceService.utilize(utilData).then((res) => {
      if (res.data.status === true) {
        setError({
          ...error,
          message: res.data.message,
          color: "success",
        });
      } else {
        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
      }
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: "",
        });
      }, 2000);
    });
  };


  return (
    <>
      <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <h4 className="card-title text-capitalize mb-0 ">
                      { entityType } Statements
                    </h4>
                   
                    <div className="d-flex justify-content-end align-items-center align-items-center pr-3">
                     
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
                      <button className="btn btn-primary" onClick={getStatement}>
                        filter
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive overflow-visible">
                    {error.color !== "" && (
                      <div
                        className={"alert alert-" + error.color}
                        role="alert"
                      >
                        {error.message}
                      </div>
                    )}
                    <table
                      className="table align-middle table-hover  contacts-table table-striped "
                      id="datatable-buttons"
                    >
                      <thead className="table-light">
                        <tr className="table-dark">
                          <th>Bill No</th>
                          <th>Receipt Amount</th>
                          <th>Pay Reference No</th>
                          <th>Payment Mode</th>
                          <th>Paid By</th>
                          <th>Tenant Name</th>
                          <th>Utilized Amount</th>
                          <th>Date Created</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentStatements?.length > 0 &&
                          currentStatements?.map((statement, index) => (
                            <tr data-id={index} key={index}>
                              <td>
                                {
                                  JSON.parse(statement.response).billNo

                                }
                              </td>
                              <td>
                                {formatCurrency.format(statement.receiptAmount)}
                              </td>
                              <td>{statement.payReferenceNo}</td>
                              <td>{statement.paymentMode}</td>
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
                                  statement.utilisedAmount
                                )}
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
                                      <span
                                        className="dropdown-item cursor-pinter"
                                        onClick={() =>
                                          getOneInvoice(statement.billNo)
                                        }
                                      >
                                        <i className="font-size-15 mdi mdi-eye me-3 "></i>
                                        View
                                      </span>
                                      {statement.utilisedAmount <
                                        statement.receiptAmount && (
                                          <a
                                            className="dropdown-item  cursor-pointer"
                                            onClick={() => {
                                              handleShow();
                                              setUtilizeValues(
                                                statement?.id,
                                                statement?.tenant?.id
                                              );
                                            }}
                                          >
                                            <i className="font-size-15 mdi mdi-account-check me-3 "></i>
                                            Utilize
                                          </a>
                                        )}
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
                            Statements
                          </th>
                          <td className="text-nowrap text-right" colSpan="7">
                            <span className="fw-semibold">
                              {/{formatCurrency.format(total())}/}
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
      {/VIEW INVOICE/}
      <Modal show={invoice_show} onHide={closeInvoice} size="lg" centered>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Statement Details
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
                {moment(activeInvoice?.dateTimeCreated).format("DD-MM-YYYY")}
              </p>
              <p>
                Due date:{" "}
                {moment(activeInvoice?.invoiceDate).format("DD-MM-YYYY")}
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
                    <th>Bill No</th>
                    <th>Receipt Amount</th>
                    <th>Pay Reference No</th>
                    <th>Payment Mode</th>
                    <th>Paid By</th>
                    <th>Utilized Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{activeInvoice?.billNo}</td>
                    <td>
                      {formatCurrency.format(activeInvoice?.receiptAmount)}
                    </td>
                    <td>{activeInvoice?.payReferenceNo}</td>
                    <td>{activeInvoice?.paymentMode}</td>
                    <td>{activeInvoice?.paidBy}</td>
                    <td>
                      {formatCurrency.format(activeInvoice?.utilisedAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* LOOK FOR BILL */}

      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Search for Bill to utilize
          </h5>
        </Modal.Header>
        <form onSubmit={(e) => searchBillNo(e)}>
          <Modal.Body>
            <div className="form-group  justify-content-center d-flex flex-column">
              <label htmlFor="">BILL NO</label>
              <input
                type="text"
                className="form-control"
                value={utilData.newBillNo}
                onChange={(e) =>
                  setUtilData({ ...utilData, newBillNo: e.target.value })
                }
                placeholder="Enter Bill No "
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <button className="btn btn-sm btn-primary" type="submit">
                Search
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Statement;