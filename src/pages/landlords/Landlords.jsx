/* global $*/
import moment from "moment";
import DatePicker from "react-datepicker";
import ReactPaginate from "react-paginate";

import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import authService from "../../services/auth.service";
import Message from "../../components/Message";

function Landlords() {
  const [landlords, setLandlords] = useState([]);
  const [failedLandlordUploads, setFailedLandlordUploads] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    $("#spinner").addClass("d-none");

    getlandlords();
  }, [page, size, pageCount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // $("#spinner").removeClass("d-none")

    getlandlords();
  };
  const handleRangeChange = (e) => {
    setSize(e.target.value);
    setPageCount(0);
    setPage(0);
  };
  const handlePageClick = (data) => {
    setPage(() => data.selected);
  };

  const getOneLandlord = () => {};
  const getlandlords = () => {
    let data = {
      dateCreatedEnd: endDate,
      dateCreatedStart: startDate,
      search: searchTerm.trim(),
    };
    requestsServiceService.getLandLords(page, size, data).then((res) => {
      setLandlords(res.data.data);
      setPage(res.data.page);
      setSize(res.data.size);
      setPageCount(res.data.totalPages);
    });
  };
  const deactivate = (id) => {
    requestsServiceService.deactivateLandlord(id).then((res) => {
      getlandlords();
    });
  };

  // MESSAGE TEST
  const [details, setDetails] = useState({
    message: "",
    contact: "",
    recipientName: "",
    entity: null,
    clientName: JSON.parse(authService.getCurrentUserName()).client?.name,
    clientId: parseInt(authService.getClientId()),
    entityType: "LANDLORD",
    createdBy: "",
    senderId: "",
    subject: "Landlord Communication",
  });

  const [mode, setmode] = useState("");
  const handleModeChange = (mode) => {
    setmode(mode);
  };
  const handleClicked = (inv, mod) => {
    let mes = `Dear ${inv.firstName}, `;
    let senderId =
      JSON.parse(authService.getCurrentUserName()).client?.senderId === null
        ? "REVENUESURE"
        : JSON.parse(authService.getCurrentUserName()).client?.senderId;
    setDetails({
      ...details,
      message: mes,
      contact: mod === "Email" ? inv?.email : inv?.phoneNumber,
      entity: inv?.id,
      recipientName: inv?.firstName,
      createdBy: authService.getCurrentUserName(),
      senderId: senderId,
      subject: "Landlord Communication",
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
      entityType: "LANDLORD",
      createdBy: "",
      senderId: "",
      subject: "Invoice Payment",
    });
  };

  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          {/* <!-- Loader --> */}
          <div id="spinner">
            <div id="status">
              <div class="spinner-chase">
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Landlord Management</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item active">All Landlords</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <div class="d-flex align-items-center flex-grow-1"></div>
                    <div class="d-flex">
                      <Link to="/addlandlord">
                        <button
                          type="button"
                          className="btn btn-primary waves-effect btn-label waves-light me-3"
                          data-bs-toggle="modal"
                          data-bs-target="#add-new-client"
                        >
                          <i className="mdi mdi-plus label-icon"></i> Add a
                          Landlord
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div class="card-body">
                  <div className="d-flex justify-content-between align-items-center pr-3">
                    <div></div>
                    <form className="d-flex justify-content-between align-items-center">
                      <div>
                        <div>
                          <form className="app-search d-none d-lg-block mr-15px  p-2">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <span className="bx bx-search-alt"></span>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="flex p-2">
                          <span class="input-group-text">
                            <i class="mdi mdi-calendar">Start Date:</i>
                          </span>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            className="form-control cursor-pointer"
                            startDate={startDate}
                            endDate={endDate}
                            maxDate={new Date()}
                          />
                        </div>
                        <div className="flex p-2" id="datepicker1">
                          <span class="input-group-text">
                            <i class="mdi mdi-calendar">End Date:</i>
                          </span>
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            showMonthDropdown
                            showYearDropdown
                            className="form-control cursor-pointer"
                            calendarClassName="form-group"
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            maxDate={new Date()}
                            type="text"
                          />
                        </div>
                      </div>
                      <div>
                        <input
                          type="submit"
                          className="btn btn-primary"
                          onClick={handleSubmit}
                          value="filter"
                        />
                      </div>
                    </form>
                  </div>
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                        <tr class="text-uppercase table-dark">
                          <th>#</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Agreement Type</th>
                          <th>File Number</th>
                          <th>Status</th>
                          <th>Agreement Period</th>
                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {landlords?.map((l, index) => (
                          <tr data-id={index} key={index}>
                            <td style={{ width: "80px" }}>{index + 1}</td>

                            <td className="text-capitalize" data-field="estate">
                              <Link to={"/landlord/" + l.id}>
                                {l.firstName + " " + l.lastName}
                              </Link>
                            </td>
                            <td className="text-capitalize">{l.phoneNumber}</td>
                            <td className="text-capitalize">
                              {l.landLordAgreementType.name
                                ?.toLowerCase()
                                ?.replace(/_/g, " ")}
                            </td>
                            <td>{l.fileNumber}</td>
                            <td className="text-capitalize">
                              {l.active ? (
                                <span className="badge-soft-success badge">
                                  Active
                                </span>
                              ) : (
                                <span className="badge-soft-danger badge">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td data-field="unit-num ">
                              {l.agreementPeriod + " months"}
                            </td>
                            <td className="text-right cell-change text-nowrap">
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
                                    {l.active ? (
                                      <button
                                        class="btn btn-danger dropdown-item border border-danger"
                                        title="deactivate"
                                        data-bs-toggle="modal"
                                        data-bs-target="#confirm-deactivate"
                                        onClick={() => setActiveId(l.id)}
                                      >
                                        Deactivate
                                      </button>
                                    ) : (
                                      <button
                                        class="btn btn-success dropdown-item border border-success"
                                        title="deactivate"
                                        data-bs-toggle="modal"
                                        data-bs-target="#confirm-activate"
                                        onClick={() => setActiveId(l.id)}
                                      >
                                        Activate
                                      </button>
                                    )}

                                    <Link
                                      to={"/landlord/" + l.id}
                                      class="dropdown-item"
                                    >
                                      View LandLord
                                    </Link>

                                    <a
                                      className="dropdown-item "
                                      onClick={() => {
                                        handleModeChange("Email");
                                        handleClicked(l, "Email");
                                      }}
                                    >
                                      <i className="font-size-15 mdi mdi-email me-3 "></i>
                                      Email Landlord
                                    </a>
                                    <a
                                      className="dropdown-item "
                                      onClick={() => {
                                        handleModeChange("SMS");
                                        handleClicked(l, "SMS");
                                      }}
                                    >
                                      <i className="font-size-15 mdi mdi-chat me-3 "></i>
                                      SMS Landlord
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center">
                      <select
                        className="btn btn-md btn-primary"
                        title="Select A range"
                        onChange={(e) => handleRangeChange(e)}
                        value={size}
                      >
                        <option className="bs-title-option" value="">
                          Select A range
                        </option>
                        <option value="10">10 Rows</option>
                        <option value="30">30 Rows</option>
                        <option value="50">50 Rows</option>
                        <option value="150">150 Rows</option>
                      </select>

                      {pageCount !== 0 && pageCount > 1 && (
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
                      )}
                    </div>
                    <h5 className="font-medium  text-muted mt-2">
                      showing page{" "}
                      <span className="text-primary">
                        {pageCount === 0 ? page : page + 1}
                      </span>{" "}
                      of<span className="text-primary"> {pageCount}</span> pages
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="confirm-deactivate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <center>
                <h5>Deactivate this Landlord ?</h5>
              </center>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                className="btn btn-primary"
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

      <Message details={details} mode={mode} clear={clear} />
      <div
        className="modal fade"
        id="confirm-activate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <center>
                <h5>Activate this Landlord ?</h5>
              </center>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deactivate(activeId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landlords;
