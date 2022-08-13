/* global $ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";

function Statements() {
  const [statements, setstatements] = useState([]);
  const [activeInvoice, setactiveInvoice] = useState({});
  const [startDate, setStartDate] = useState("01/12/2022");
  const [endDate, setEndDate] = useState("12/12/2022");
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });

  const [show, setShow] = useState(false);
  // const [billNo, setBillNo] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
  const [error, setError] = useState({
    message: "",
    color: "",
  });

const [utilData,setUtilData] = useState( {
  newBillNo: '',
  statementId: '',
  tenantId: '',
})

const setUtilizeValues = (statementId,tenantId)=>{
  setUtilData({
    ...utilData ,
    newBillNo: '',
    statementId: statementId,
    tenantId: tenantId,
  })
}

const searchBillNo = async (e)=>{
  e.preventDefault();
  handleClose()

await requestsServiceService.viewTransactionItem(utilData.newBillNo).then((res)=>{
   console.log(res.data);
   if( res.data.paymentStatus !== "PAID"){
     utilize();
  }else {
    setError({
      ...error,
      message: 'ERROR: Bill is already paid',
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
  
})
}

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
                        <div></div>
                      </div>
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
                          <th>Paid By</th>
                          <th>Tenant Name</th>
                          <th>Utilized Amount</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {statements &&
                          statements?.length > 0 &&
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
                                          onClick={()=>{ handleShow();setUtilizeValues(  statement?.id, statement?.tenant?.id)}}
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
                            {statements && statements?.length} Statements
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
        <form onSubmit={ (e) => searchBillNo(e)}>
        <Modal.Body>
           <div className="form-group  justify-content-center d-flex flex-column">
             <label htmlFor="">BILL NO</label>
             <input type="text" className="form-control"  value={utilData.newBillNo} onChange={e => setUtilData({...utilData ,newBillNo: e.target.value})} placeholder='Enter Bill No ' required/>
           </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
           <button className="btn btn-sm btn-primary" type="submit">Search</button>
          </div>
        </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Statements;
