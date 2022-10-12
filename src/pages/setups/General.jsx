/* global $*/
import moment from "moment";
import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
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
    getAll()
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
    setIssueTypes(list?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list?.length / size));
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


  const [bouncedChequeChargeId, setBouncedChequeChargeId] = useState("")
  const [chequeProcessingPeriod, setChequeProcessingPeriod] = useState("")
  const [invoicePaymentPriority, setInvoicePaymentPriority] = useState("")
  const [landlordSettlementChargeId, setLandlordSettlementChargeId] = useState("")
  const [penaltyChargeId, setPenaltyChargeId] = useState("")
  const [penaltyChargeRate, setpenaltyChargeRate] = useState("")
  const [propertyTaxChargeId, setPropertyTaxChargeId] = useState("")
  const [senderId, setSenderId] = useState("")
  const [propertyTaxRate, setPropertyTaxRate] = useState("")
  const [settlementPeriod, setsettlementPeriod] = useState("")
  const [visitationChargeDay, setvisitationChargeDay] = useState("")
  const [visitationChargeId, setvisitationChargeId] = useState("")
  const [invo, setInvo] = useState([])
  const [client, setClient] = useState([]);


  const [] = useState("")
  const createGeneral = () => {
    let data = JSON.stringify({

      bouncedChequeChargeId: parseInt(bouncedChequeChargeId),
      chequeProcessingPeriod: chequeProcessingPeriod,
      id: clientId,
      invoicePaymentPriority: invoicePaymentPriority,
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
  let clientId = AuthService.getClientId()
  const getApplicable = () => {
    requestsServiceService.allApplicableCharges("TENANT").then((res) => {
      setInvo(res.data.data)


    })
  }
  const getAll = () => {
    requestsServiceService.getClient(clientId).then((res) => {
      setClient(res.data.data.client);
    });
  }
  const [ac, setAC] = useState([]);
  const [tmp, stmp] = useState([]);
  const [chargeNames, setChargeNames] = useState([]);
  const handleACchange = (e, i) => {
    let id = e.target.value.split("-")[0];
    let name = e.target.value.split("-")[1];
    if (tmp?.includes(id)) {
      //
    } else {
      stmp([...tmp, id]);
    }
    if (chargeNames.includes(name)) {
    } else {
      setChargeNames([...chargeNames, name]);
    }
  };


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
                <h4 class="mb-sm-0 font-size-18">General Settings</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">Set Ups</li>
                    <li class="breadcrumb-item active">General</li>
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
              {activeLink === 1 && (

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
                                              onClick={() => { }}
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
                    <div className="col-12 row">
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






                      <div class="col-sm-4">
                        <div class="card">
                          <div class="card-body">
                            <div class="d-flex align-items-center mb-3">

                              <div class="avatar-xs-2 me-3">
                                <span class="avatar-title rounded-circle bg-danger bg-soft text-danger font-size-18">
                                  <i class="mdi mdi-wrench h2 mb-0 pb-0 text-danger"></i>
                                </span>
                              </div>

                              <div class="d-flex flex-column">
                                <span className='text-capitalize'>Bounced Cheque Settings</span>
                              </div>
                            </div>
                            <div class=" mt-4">
                              <span>Charge Name : {client?.bouncedChequeCharge?.name}</span>
                              <br />
                              <span>Processing Period : {client?.chequeProcessingPeriod} Days</span>
                            </div>
                          </div>
                        </div>
                      </div>




                      <div class="col-sm-4">
                        <div class="card">
                          <div class="card-body">
                            <div class="d-flex align-items-center mb-3">

                              <div class="avatar-xs-2 me-3">
                                <span class="avatar-title rounded-circle bg-danger bg-soft text-danger font-size-18">
                                  <i class="mdi mdi-wrench h2 mb-0 pb-0 text-danger"></i>
                                </span>
                              </div>

                              <div class="d-flex flex-column">
                                <span className='text-capitalize'>Landlord Settlement Settings</span>
                              </div>
                            </div>
                            <div class=" mt-4">
                              <span>
                                Settlement(Rent) Charge Name : {client?.landlordSettlementCharge?.name}
                              </span>

                              <br />

                              <span>
                                Settlement Period : {client?.settlementPeriod}ly
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div class="col-sm-4">
                        <div class="card">
                          <div class="card-body">
                            <div class="d-flex align-items-center mb-3">

                              <div class="avatar-xs-2 me-3">
                                <span class="avatar-title rounded-circle bg-danger bg-soft text-danger font-size-18">
                                  <i class="mdi mdi-wrench h2 mb-0 pb-0 text-danger"></i>
                                </span>
                              </div>

                              <div class="d-flex flex-column">
                                <span className='text-capitalize'>Surcharge Settings</span>
                              </div>
                            </div>
                            <div class=" mt-4">
                              <span>Surcharge(Penalty) Charge Name : {client?.penaltyCharge?.name}
                              </span>
                              <br />
                              <span>Penalty Charge Rate : {client?.penaltyChargeRate} Days</span>
                              <br />
                              <br />
                              <span>Visitation Charge :  {client?.visitationCharge?.name}</span>
                              <br />
                              <span>Visitation Charge Day :  Day {client?.visitationChargeDay}</span>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div class="col-sm-4">
                        <div class="card">
                          <div class="card-body">
                            <div class="d-flex align-items-center mb-3">

                              <div class="avatar-xs-2 me-3">
                                <span class="avatar-title rounded-circle bg-danger bg-soft text-danger font-size-18">
                                  <i class="mdi mdi-wrench h2 mb-0 pb-0 text-danger"></i>
                                </span>
                              </div>

                              <div class="d-flex flex-column">
                                <span className='text-capitalize'>Tenant Invoice Payment Priority Settings</span>
                              </div>
                            </div>
                            <div class=" mt-4">
                              <span>
                                {client?.invoicePaymentPriority?.split(",").map((m, index) =>
                                  <>
                                    {invo?.map((item) => (
                                      item.id == m &&
                                      <span>
                                        {index + 1 < client?.invoicePaymentPriority.split(",").length ?
                                          item.name + " => "
                                          :
                                          item.name
                                        }
                                      </span>
                                    )

                                    )}
                                  </>
                                )
                                }
                              </span>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>





                      <div class="col-sm-4">
                        <div class="card">
                          <div class="card-body">
                            <div class="d-flex align-items-center mb-3">

                              <div class="avatar-xs-2 me-3">
                                <span class="avatar-title rounded-circle bg-danger bg-soft text-danger font-size-18">
                                  <i class="mdi mdi-wrench h2 mb-0 pb-0 text-danger"></i>
                                </span>
                              </div>

                              <div class="d-flex flex-column">
                                <span className='text-capitalize'>Property Tax Settings</span>
                              </div>
                            </div>
                            <div class=" mt-4">
                              <span>
                                Property Tax Charge : {client?.propertyTaxCharge?.name}
                              </span>
                              <br />
                              <span>
                                Property Tax Rate : {client?.propertyTaxRate} %
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>





                      <div class="col-sm-4">
                        <div class="card">
                          <div class="card-body">
                            <div class="d-flex align-items-center mb-3">

                              <div class="avatar-xs-2 me-3">
                                <span class="avatar-title rounded-circle bg-danger bg-soft text-danger font-size-18">
                                  <i class="mdi mdi-wrench h2 mb-0 pb-0 text-danger"></i>
                                </span>
                              </div>

                              <div class="d-flex flex-column">
                                <span className='text-capitalize'>Messaging Settings</span>
                              </div>
                            </div>
                            <div class=" mt-4">
                              <span>
                                SenderID : {client?.senderId}
                              </span>
                              <br />

                            </div>
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
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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
                          Bounced Cheque Charge  <strong class="text-danger">*</strong>
                        </label>
                        <select
                          class="form-control text-capitalize"
                          title="Select Applicable Charge Type"
                          onChange={(e) => {
                            setBouncedChequeChargeId(e.target.value);
                          }}
                          value={client?.bouncedChequeCharge?.id}
                        >
                          <option>-------Select Bounced Cheque Charge -------</option>
                          {invo?.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.name}</option>
                          ))}
                        </select>
                      </div>
                      <div class="col-12">
                        <div class="form-group mb-4">
                          <label for="">
                            Cheque Processing Period{" "}
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

                      <div className="col-12">

                        <label htmlFor=""> Invoice Payment Priority</label>
                        <br />
                        <select
                          name=""
                          onChange={(e) => handleACchange(e)}
                          id=""
                          className={"form-control"}
                        >
                          <option>Select Applicable Charges</option>
                          {invo?.map((item) => (
                            <option value={item.id + "-" + item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>

                      </div>
                      <div className="row">
                        <div className="mb-4">
                          <label htmlFor="basicpill-lastname-input ">
                            Charges
                          </label>
                          <div className="alert alert-info bg-soft">
                            {chargeNames.length > 0
                              ? chargeNames.join("  -->  ")
                              : chargeNames}
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <label for="">
                          Base(Rent) Charge<strong class="text-danger">*</strong>
                        </label>
                        <select
                          class="form-control text-capitalize"
                          title="Select Applicable Charge Type"
                          onChange={(e) => {
                            setLandlordSettlementChargeId(e.target.value);
                          }}
                          value={client?.landlordSettlementCharge?.id}
                        >
                          <option>---Select  Base(rent)Charge-----</option>
                          {invo?.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.name}</option>
                          ))}
                        </select>
                      </div>


                      <div class="col-12">
                        <label for="">
                          Sur-Charge <strong class="text-danger">*</strong>
                        </label>
                        <select
                          class="form-control text-capitalize"
                          title="Select Applicable Charge Type"
                          onChange={(e) => {
                            setPenaltyChargeId(e.target.value)
                              (e.target.value);
                          }}
                          value={client?.penaltyCharge?.id}
                        >
                          <option>---Select  Sur-Charge-----</option>
                          {invo?.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.name}</option>
                          ))}
                        </select>
                      </div>
                      <div class="col-12">
                        <div class="form-group mb-4">
                          <label for="">Sur-Charge Rate</label>
                          <input
                            type="number"
                            min="1"
                            max="30"
                            class="form-control"
                            placeholder="Enter PenaltyChargeRate"
                            onChange={(event) =>
                              setpenaltyChargeRate(event.target.value)
                            }
                            value={client?.penaltyChargeRate}
                          />
                        </div>
                      </div>


                      <div class="col-12">
                        <label for="">
                          Property Tax <strong class="text-danger">*</strong>
                        </label>
                        <select
                          class="form-control text-capitalize"
                          title="Select Applicable Charge Type"
                          onChange={(e) => {
                            setPropertyTaxChargeId(e.target.value)
                              (e.target.value);
                          }}
                          value={client?.propertyTaxCharge?.id}
                        >
                          <option value="">Select PropertyTaxCharge --</option>
                          {invo?.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.name}</option>
                          ))}
                        </select>
                      </div>
                      <div class="col-12">
                        <div class="form-group mb-4">
                          <label for="">Property Tax Rate</label>
                          <input
                            type="number"
                            min="1"
                            max="30"
                            class="form-control"
                            placeholder="Enter PropertyTaxRate"
                            onChange={(event) =>
                              setPropertyTaxRate(event.target.value)
                            }
                            value={client?.propertyTaxRate}
                          />
                        </div>
                      </div>
                      <div class="col-12">
                        <label for="">
                          Visitation Charge<strong class="text-danger">*</strong>
                        </label>
                        <select
                          class="form-control text-capitalize"
                          title="Select VisitationChargeId"
                          onChange={(e) => {
                            setvisitationChargeId(e.target.value)
                              (e.target.value);
                          }}
                          value={client?.visitationCharge?.id}
                        >
                          <option>Select VisitationCharge ----</option>
                          {invo
                            ?.map((item) => (
                              <option value={item.id} key={item.id}>
                                {item.name}</option>
                            ))}
                        </select>
                      </div>
                      <div class="col-12">
                        <div class="form-group mb-4">
                          <label for="">Visitation Charge Day</label>
                          <input
                            type="number" min={1} max={31}
                            class="form-control"
                            placeholder="Enter SettlementPeriod"
                            onChange={(event) =>
                              setvisitationChargeDay(event.target.value)
                            }
                            value={client?.visitationChargeDay}
                          />
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-group mb-4">
                          <label for="">Settlement Period</label>

                          <select
                            className="form-control"
                            onChange={(e) => {
                              setsettlementPeriod(e.target.value)
                                (e.target.value);
                            }}
                            name="settlementPeriod"
                            value={client?.landlordSettlementPeriod}
                          >
                            <option value="YEAR"> Select settlementPeriod </option>
                            <option value="MONTH">Monthly</option>
                            <option value="YEAR">Yearly</option>
                          </select>


                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group mb-4">
                          <label for="">SMS SenderId</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter SenderId"
                            onChange={(event) =>
                              setSenderId(event.target.value)
                            }
                            value={client?.senderId}
                          />
                        </div>
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
