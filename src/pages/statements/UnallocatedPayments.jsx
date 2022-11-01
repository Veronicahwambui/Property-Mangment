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
        // LOADER ANIMATION  
        $("#spinner").removeClass("d-none");
        setTimeout(() => {
            $("#spinner").addClass("d-none");
        }, 500);
  };

  // allocations
  const [allocateModal, setallocateModal] = useState(false);
  const showallocateModal = (x) => {
    setStatmentId(x);
    setallocateModal(true);
  };
  const hideallocateModal = () => setallocateModal(false);

  // fetch
  const [entityType, setEntityType] = useState("");
  const [entityId, setEntityId] = useState("");
  const [statementId, setStatmentId] = useState("");
  // calls
  const [recipients, setRecipients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getTenants = () => {
    let page = 0,
      size = 100;
    let data = {
      dateCreatedStart: moment().startOf("year").format("YYYY-MM-DD"),
      dateCreatedEnd: moment(new Date()).format("YYYY-MM-DD"),
      search: searchTerm?.toLowerCase().trim(),
    };
    requestsServiceService
      .getAllTenants(searchTerm, page, size, data)
      .then((res) => {
        setRecipients(res.data.data);
      });
  };

  const getLandlords = () => {
    let page = 0,
      size = 100;
    let data = {
      dateCreatedStart: moment().startOf("year").format("YYYY-MM-DD"),
      dateCreatedEnd: moment(new Date()).format("YYYY-MM-DD"),
      search: searchTerm?.toLowerCase().trim(),
    };
    requestsServiceService.getLandLords(page, size, data).then((res) => {
      setRecipients(res.data.data);
    });
  };
  // end calls

  const searchRecipient = (e) => {
    console.log(entityType);
    e.preventDefault();
    if (entityType === "LANDLORD") {
      getLandlords();
    }
    if (entityType === "TENANT") {
      getTenants();
    }
    if (entityType === "USER") {
      requestsServiceService.getData("AUCTIONEER").then((res) => {
        setRecipients(res.data.data);
      });
    }
  };

  const [error, setError] = useState({
    message: "",
    color: "",
  });
  // allocate Payment
  const allocatePayment = () => {
    let data = {
      entityType: entityType,
      entityId: parseInt(entityId),
      statementId: parseInt(statementId),
    };
    requestsServiceService
      .allocatePayment(data)
      .then((res) => {
        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
          setTimeout(() => {
            hideallocateModal();
          }, 3000);
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "danger",
          });
        }
      })
      .catch((err) => {
        setError({
          ...error,
          message: err.message,
          color: "danger",
        });
      });
  };
   // LOADER ANIMATION
   useEffect(()=>{
    $("#spinner").removeClass("d-none");
    setTimeout(() => {
        $("#spinner").addClass("d-none");
    }, 1000);
   },[])
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
                                <button
                                  className="btn btn-danger btn-sm btn-rounded"
                                  title="deactivate"
                                  onClick={() =>
                                    showallocateModal(statement.id)
                                  }
                                >
                                  Allocate
                                </button>
                                {/*<div className="dropdown">*/}
                                {/*  <a*/}
                                {/*    className="text-muted font-size-16 cursor-pinter"*/}
                                {/*    role="button"*/}
                                {/*    data-bs-toggle="dropdown"*/}
                                {/*    aria-haspopup="true"*/}
                                {/*  >*/}
                                {/*    <i className="bx bx-dots-vertical-rounded"></i>*/}
                                {/*  </a>*/}
                                {/*  <div className="dropdown-menu dropdown-menu-end ">*/}
                                {/*    /!*<span className="dropdown-item cursor-pinter">*!/*/}
                                {/*    /!*  <i className="font-size-15 mdi mdi-eye me-3 "></i>*!/*/}
                                {/*    /!*  View*!/*/}
                                {/*    /!*</span>*!/*/}
                                {/*    <a*/}
                                {/*      className="dropdown-item  cursor-pointer"*/}
                                {/*      onClick={() =>*/}
                                {/*        showallocateModal(statement.id)*/}
                                {/*      }*/}
                                {/*    >*/}
                                {/*      <i className="font-size-15 mdi mdi-account-check me-3 "></i>*/}
                                {/*      Allocate*/}
                                {/*    </a>*/}
                                {/*  </div>*/}
                                {/*</div>*/}
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
          <div className="form-group justify-content-center d-flex flex-column">
            <div className="col-12">
              <div className="form-group mb-3">
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) => setEntityType(e.target.value)}
                >
                  <option value="">Select Recipient type </option>
                  <option value="TENANT">Tenant</option>
                  <option value="LANDLORD">Landlord</option>
                  <option value="USER">User</option>
                </select>
              </div>
              <form onSubmit={searchRecipient}>
                <label htmlFor="" className={"mt-3 mb-3"}>
                  Search Recipient
                </label>
                <strong className="text-danger">*</strong>
                <div className="app-search d-none d-lg-block d-flex">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={"Search.."}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="bx bx-search-alt"></span>
                  </div>
                </div>
                <button
                  type={"submit"}
                  className={"btn btn-primary mt-2 btn-sm"}
                >
                  Search
                </button>
              </form>
            </div>
            <div className="col-12 mt-3">
              {recipients?.length < 5 && (
                <>
                  {entityType === "LANDLORD" && (
                    <>
                      {recipients?.map((item) => (
                        <>
                          <div className={"mt-2 text-capitalize"} key={item.id}>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                setEntityId(item.id);
                              }}
                              checked={item.id === entityId}
                              style={{ marginRight: "5px" }}
                            />
                            <label
                              className={"form-check-label"}
                              style={{ marginLeft: "5px" }}
                            >
                              <>
                                {item?.landLordType === "INDIVIDUAL" ? (
                                  <>
                                    {item.firstName + " "}
                                    {item.lastName + " "} {item.otherName}
                                  </>
                                ) : (
                                  <>{item.companyName + " "}</>
                                )}
                              </>
                            </label>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                  {entityType === "TENANT" && (
                    <>
                      {recipients?.map((item) => (
                        <>
                          <div className={"mt-2 text-capitalize"} key={item.id}>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                setEntityId(item.id);
                              }}
                              checked={item.id === entityId}
                              style={{ marginRight: "5px" }}
                            />
                            <label
                              className={"form-check-label"}
                              style={{ marginLeft: "5px" }}
                            >
                              <>
                                {item?.tenantType === "INDIVIDUAL" ? (
                                  <>
                                    {item.firstName + " "}
                                    {item.lastName + " "} {item.otherName}
                                  </>
                                ) : (
                                  <>{item.companyName + " "}</>
                                )}
                              </>
                            </label>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                  {entityType === "USER" && (
                    <>
                      {recipients?.map((item) => (
                        <>
                          <div className={"mt-2"} key={item.id}>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                setEntityId(item.user.id);
                              }}
                              checked={item.user.id === entityId}
                              style={{ marginRight: "5px" }}
                            />
                            <label
                              className={"form-check-label"}
                              style={{ marginLeft: "5px" }}
                            >
                              {item?.user.firstName} {item?.user.lastName}
                            </label>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
            {error.color !== "" && (
              <div
                className={"mt-3 mb-4 alert alert-" + error.color}
                role="alert"
              >
                {error.message}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button
              className="btn btn-sm btn-primary"
              type="submit"
              onClick={allocatePayment}
            >
              Allocate
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UnallocatedPayments;
