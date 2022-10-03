/* global $*/
import moment from "moment";
import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import { Button, Modal } from "react-bootstrap";
import { Link,useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";

import ReactPaginate from "react-paginate";

function IssuesTypes() {
  const [issueTypes, setIssueTypes] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [activeLink, setActiveLink] = useState(1);
  const [error, setError] = useState({
    message: "",
    color: "",
  });



  useEffect(() => {
    getIssueTypes();
    getAll ()
    getApplicable();
  }, []);

  // PAGINATION
  const sortSize = (e) => {
    setSize(parseInt(e.target.value));
    setPage(0);
    setItemOffset(0);
  };
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [list, setlist] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setIssueTypes(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / size));
  }, [itemOffset, size, list]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * size) % list.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  const getIssueTypes = () => {
    requestsServiceService.getTenancyIssuesTypes().then((res) => {
      setlist(res.data.data);
      $("#spinner").addClass("d-none");
    });
  };

  const deactivate = (x) => {
    requestsServiceService.toggleIssueType(x).then((res) => {
      if (res.data.status === true) {
        getIssueTypes();
      }
    });
  };

//  general  settings


const[bouncedChequeChargeId,setBouncedChequeChargeId]=useState("")
const[chequeProcessingPeriod,setChequeProcessingPeriod]=useState("")
const[invoicePaymentPriority,setInvoicePaymentPriority]=useState("")
const[landlordSettlementChargeId,setLandlordSettlementChargeId]=useState("")
const[penaltyChargeId,setPenaltyChargeId]=useState("")
const[penaltyChargeRate,setpenaltyChargeRate]=useState("")
const[propertyTaxChargeId,setPropertyTaxChargeId]=useState("")
const[senderId,setSenderId]=useState("")
const[propertyTaxRate,setPropertyTaxRate]=useState("")
const[settlementPeriod,setsettlementPeriod]=useState("")
const[visitationChargeDay,setvisitationChargeDay]=useState("")
const[visitationChargeId,setvisitationChargeId]=useState("")
const[invo,setInvo]= useState([])
const [client, setClient] = useState([]);


const[]=useState("")
const createGeneral =() =>{
  let data = JSON.stringify({

   bouncedChequeChargeId: parseInt(bouncedChequeChargeId),
  chequeProcessingPeriod: chequeProcessingPeriod,
  id: clientId,
  invoicePaymentPriority:invoicePaymentPriority,
  landlordSettlementChargeId: landlordSettlementChargeId,
  penaltyChargeId: penaltyChargeId,
  penaltyChargeRate: penaltyChargeRate,
  propertyTaxChargeId: propertyTaxChargeId,
  propertyTaxRate: propertyTaxRate,
  senderId: senderId,
  settlementPeriod: settlementPeriod,
  visitationChargeDay: visitationChargeDay,
  visitationChargeId: visitationChargeId,
  });
  // console.log(data)
  requestsServiceService.createSettings(data).then((res) => {
    getAll()
    $("#add-new-settings").modal("hide");

        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "warning",
          });
        }

        setTimeout(() => {
          clear();
        }, 3000);
      })
      .catch((res) => {
        $("#add-new-settings").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          clear();
        }, 3000);
      });
  };

  const clear = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
   

  

}
let clientId= AuthService.getClientId()
const getApplicable =() => {
  requestsServiceService.allApplicableCharges("TENANT").then((res) => {
    setInvo(res.data.data)
    
  
  })
}
const getAll = () => {
  requestsServiceService.getClient(clientId).then((res) => {
    setClient(res.data.data.client);
  });
}




  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          <div id="spinner" className={""}>
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
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Issue Types</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">Set Ups</li>
                    <li class="breadcrumb-item active">Issue Types</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
          <div class="card">
                <div class="card-body pt-2 pb-3 align-items-center d-flex">
                  <div
                    class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                                    <nav class="navbar navbar-expand-md navbar-white bg-white py-2">

                  
                      <div
                      className="collapse navbar-collapse justify-content-between"
                      id="navbarNavAltMarkup"
                    >
                      <div className="navbar-nav">
                        <a
                          onClick={() => setActiveLink(1)}
                          className={
                            activeLink === 1
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Issues Types<span className="sr-only"></span>
                        </a>
                       
                        <a
                          onClick={() => setActiveLink(2)}
                          className={
                            activeLink === 2
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          General 
                        </a>
                        
                      </div>
                    </div>
                </nav>
                  </div>
                </div>
              </div>
          {/* <!-- end page title --> */}
          {activeLink === 1 &&(

        <div>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <div class="d-flex align-items-center flex-grow-1">
                      <h4 class="mb-0  bg-transparent  p-0 m-0">
                        {/*Issue Types Register*/}
                      </h4>
                    </div>
                    <div class="d-flex">
                      <Link to="/create-issue-type">
                        <button
                          type="button"
                          className="btn btn-primary waves-effect btn-label waves-light me-3"
                        >
                          <i className="mdi mdi-plus label-icon"></i> Add Issue
                          Type
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits table-striped">
                      <thead class="table-light">
                        <tr class="text-uppercase table-light">
                          <th>#</th>
                          <th>Name</th>
                          <th>Initial Status</th>
                          <th>Resolved Status</th>
                          <th>Status</th>
                          <th>Date Created</th>

                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {issueTypes?.map((iT, index) => {
                          return (
                            <tr
                              data-id="1"
                              key={index}
                              className={"text-uppercase"}
                            >
                              <td style={{ width: "80px" }}>{index + 1}</td>
                              <td data-field="unit-num ">{iT.name}</td>
                              <td data-field="unit-num ">{iT.initialStatus}</td>
                              <td data-field="unit-num ">{iT.resolveStatus}</td>
                              <td data-field="unit-num ">
                                {iT.active ? (
                                  <span class="badge-soft-success badge">
                                    Active
                                  </span>
                                ) : (
                                  <span class="badge-soft-danger badge">
                                    Inactive
                                  </span>
                                )}
                              </td>
                              <td>
                                {moment(iT.dateTimeCreated).format(
                                  "YYYY-MM-DD HH:mm"
                                )}
                              </td>

                              <td class="text-right cell-change text-nowrap ">
                                <div className="d-flex align-items-center">
                                  <Link
                                    to={`/issuestypes/${iT.id}`}
                                    state={{ issueType: iT }}
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      onClick={() => {}}
                                      style={{ marginLeft: "8px" }}
                                    >
                                      View Details
                                    </button>
                                  </Link>
                                  {iT.active ? (
                                    <button
                                      class="btn btn-danger btn-sm btn-rounded text-uppercase px-2 mx-3"
                                      title="deactivate"
                                      data-bs-toggle="modal"
                                      data-bs-target="#confirm-deactivate"
                                      onClick={() => setActiveId(iT.id)}
                                    >
                                      Deactivate
                                    </button>
                                  ) : (
                                    <button
                                      class="btn btn-success btn-sm btn-rounded w-5 text-uppercase px-3 mx-3"
                                      title="deactivate"
                                      data-bs-toggle="modal"
                                      data-bs-target="#confirm-activate"
                                      onClick={() => setActiveId(iT.id)}
                                    >
                                      Activate
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
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
                        of
                        <span className="text-primary"> {pageCount}</span> pages
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end col --> */}
          </div>
          </div>
            )}


            {activeLink === 2 && (
              <div>
                            <div className="row">
              <div className="col-12">
                <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <div className="d-flex align-items-center flex-grow-1">
                      <h4 className="mb-0  bg-transparent  p-0 m-0">
                        
                      </h4>
                    </div>
                    <div className="d-flex align-items-center flex-grow-1"></div>
                    <div className="d-flex">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-settings"
                     
                        className="btn btn-primary dropdown-toggle option-selector"
                      >
                        <i className="dripicons-plus font-size-16"></i>{" "}
                        <span className="pl-1 d-md-inline">
                       Add General Settings
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card calc-h-3px">
                  <div className={"d-flex"}>
                    <div className="card-body border-top">
                      <p className="p-0 m-0">
                        <span className="text-muted">BouncedChequeChargeId :</span>
                        {client?.bouncedChequeCharge.name}
                      </p>
                    </div>
                    <div className="card-body border-top">
                      <p className="p-0 m-0">
 ChequeProcessingPeriod :
                        <span className="text-muted"></span>
                        {client?.chequeProcessingPeriod}
                      </p>
                    </div>
                    <div className="card-body border-top">
                      <p className="p-0 m-0">
                        <span className="text-muted">
                        InvoicePaymentPriority:{" "}
                        </span>
                        {client?. invoicePaymentPriority}
                      </p>
                    </div>
                   
                  </div>
                  <div className={"d-flex"}>
                  <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted">  LandlordSettlementChargeId:
 </span>
                        {client?.landlordSettlementCharge.name}
                      </p>
                    </div>
                    <div className="card-body ">
                      <p className="p-0 m-0">
                      PenaltyChargeId:
                        <span className="text-muted"></span>
                        {client?.penaltyCharge.name}
                    
                      </p>
                    </div>
                    <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted">
                        PenaltyChargeRate:{" "}
                        </span>
                        {client?.penaltyChargeRate}
                      </p>
                    </div>
                    </div>


                    <div className={"d-flex"}>
                  <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted"> PropertyTaxCharge:
 </span>
                        {client?.propertyTaxCharge.name}
                      </p>
                    </div>
                    <di v className="card-body ">
                      <p className="p-0 m-0">
                      Sender:
                        <span className="text-muted"></span>
                        {client?.senderId}
                    
                      </p>
                    </di>
                    <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted">
                        PropertyTaxRate:{" "}
                        </span>
                        {client?.propertyTaxRate}
                      </p>
                    </div>
                    </div>

                    <div className={"d-flex"}>
                  <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted"> SettlementPeriod:
 </span>
                        {client?.settlementPeriod}
                      </p>
                    </div>
                    <di v className="card-body ">
                      <p className="p-0 m-0">
                      VisitationChargeDay:
                        <span className="text-muted"></span>
                        {client?.visitationChargeDay}
                    
                      </p>
                    </di>
                    <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted">
                        VisitationCharge :{" "}
                        </span>
                        {client?.visitationCharge.name}
                      </p>
                    </div>
                    </div>
                    
                   
                   
                  </div>
                </div>
              </div>
            </div>







                       
            )}
          {/* <!-- end row --> */}
        </div>
        {/* <!-- container-fluid --> */}
      </div>

      {/*MODALS*/}

  {/* create modal */}
  <div
        class="modal fade"
        id="add-new-settings"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createGeneral();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  General Settings
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  
                  <div class="col-12">
                    <label for="">
                    BouncedChequeChargeId <strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control text-capitalize"
                                           title="Select Applicable Charge Type"
                      onChange={(e) => {
                        setBouncedChequeChargeId(e.target.value);
                      }}
                    >
                      <option>-------Select BouncedChequeChargeId -------</option>
                      {invo?.map((item) => (
                        <option value={item.id} key={item.id}>
                        {item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">
                      ChequeProcessingPeriod{" "}
                        <strong class="text-danger">*</strong>{" "}
                      </label>
                      <input
                        required
                        min="1"
                        max="30"
                        value={chequeProcessingPeriod}
                        onChange={(e) => setChequeProcessingPeriod(e.target.value)}
                        type="number"
                        class="form-control"
                        placeholder="Enter  ChequeProcessingPeriod"
                      />
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="">
                    InvoicePaymentPriority <strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control text-capitalize"
                                           title="Select Applicable Charge Type"
                      onChange={(e) => {
                        setInvoicePaymentPriority(e.target.value);
                      }}
                    >
                      <option>Select  InvoicePaymentPriority-----</option>
                      {invo?.map((item) => (
                        <option value={item.id} key={item.id}>
                        {item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div class="col-12">
                    <label for="">
                    landlordSettlementChargeId <strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control text-capitalize"
                                           title="Select Applicable Charge Type"
                      onChange={(e) => {
                        setLandlordSettlementChargeId(e.target.value);
                      }}
                    >
                      <option>---Select  LandlordSettlementChargeId-----</option>
                      {invo?.map((item) => (
                        <option value={item.id} key={item.id}>
                        {item.name}</option>
                      ))}
                    </select>
                  </div>
                
              
                  <div class="col-12">
                    <label for="">
                   PenaltyChargeId <strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control text-capitalize"
                                           title="Select Applicable Charge Type"
                      onChange={(e) => {
                        setPenaltyChargeId(e.target.value)
                        (e.target.value);
                      }}
                    >
                      <option>---Select  PenaltyChargeId-----</option>
                      {invo?.map((item) => (
                        <option value={item.id} key={item.id}>
                        {item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">PropertyTaxRate</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        class="form-control"
                        placeholder="Enter PropertyTaxRate"
                        onChange={(event) =>
                          setPropertyTaxRate(event.target.value)
                        }
                        value={propertyTaxRate}
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">PenaltyChargeRate</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        class="form-control"
                        placeholder="Enter PenaltyChargeRate"
                        onChange={(event) =>
                          setpenaltyChargeRate(event.target.value)
                        }
                        value={penaltyChargeRate}
                      />
                    </div>
                  </div>
                
                  <div class="col-12">
                    <label for="">
                    PropertyTaxChargeId <strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control text-capitalize"
                                           title="Select Applicable Charge Type"
                      onChange={(e) => {
                        setPropertyTaxChargeId(e.target.value)
                        (e.target.value);
                      }}
                    >
                      <option value="">Select Applicable Charge Type --</option>
                      {invo?.map((item) => (
                        <option value={item.id} key={item.id}>
                        {item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">SenderId</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter SenderId"
                        onChange={(event) =>
                          setSenderId(event.target.value)
                        }
                        value={senderId}
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">SettlementPeriod</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter SettlementPeriod"
                        onChange={(event) =>
                          setsettlementPeriod(event.target.value)
                        }
                        value={settlementPeriod}
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">visitationChargeDay</label>
                      <input
                        type="number"
                        max="30"
                        min="1"
                        class="form-control"
                        placeholder="Enter visitationChargeDay"
                        onChange={(event) =>
                          setvisitationChargeDay(event.target.value)
                        }
                        value={visitationChargeDay}
                      />
                    </div>
                  </div>

                 
                  
                  <div class="col-12">
                    <label for="">
                    visitationChargeId<strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control text-capitalize"
                                           title="Select VisitationChargeId"
                      onChange={(e) => {
                        setvisitationChargeId(e.target.value)
                        (e.target.value);
                      }}
                    >
                      <option>Select VisitationChargeId ----</option>
                      {invo
                      ?.map((item) => (
                        <option value={item.id} key={item.id}>
                        {item.name}</option>
                      ))}
                    </select>
                  </div>

                 
                
                 
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>






      {/*deactivate activate modals*/}
      {/* confirm deactivate  */}
      <div
        class="modal fade"
        id="confirm-deactivate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <center>
                <h5>Deactivate this Issue Type ?</h5>
              </center>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deactivate(activeId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* confirm dactivate  */}
      <div
        class="modal fade"
        id="confirm-activate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <center>
                <h5>Activate this Issue Type?</h5>
              </center>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deactivate(activeId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default IssuesTypes;
