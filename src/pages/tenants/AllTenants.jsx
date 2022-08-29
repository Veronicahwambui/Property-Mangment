/* global $ */
import moment from "moment";
import DatePickRange from "../../components/Datepicker";
import ReactPaginate from "react-paginate";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import HelmetExport, { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import Message from "../../components/Message";
import authLoginService from "../../services/authLogin.service";

function AllTenants() {
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
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
  const [searchTerm, setSearchTerm] = useState("");

  const [premises, setPremises] = useState([]);
  const [failedLandlordUploads, setFailedLandlordUploads] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    $("#spinner").addClass("d-none");

    fetchAll();
  }, [page, size, pageCount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // $("#spinner").removeClass("d-none")
    fetchAll();
  };
  const sortSize = (e) => {
    setSize(e.target.value);
    setPage(0);
  };

  const handleRangeChange = (e) => {
    setSize(e.target.value);
    setPageCount(0);
    setPage(0);
  };
  const handlePageClick = (data) => {
    setPage(() => data.selected);
  };

  const fetchAll = () => {
    let data = {
      dateCreatedEnd: moment(date.endDate).format("YYYY-MM-DD"),
      dateCreatedStart: moment(date.startDate).format("YYYY-MM-DD"),
      search: searchTerm.trim(),
    };

    requestsServiceService
      .getAllTenants(searchTerm, page, size, data)
      .then((res) => {
        setPremises(res.data.data);
        setPage(res.data.page);
        setSize(res.data.size);
        setPageCount(res.data.totalPages);
        // setSearchTerm(" ")
      });
  };

  const deactivate = () => {
    requestsServiceService.toggleTenantStatus(activeId).then(() => {
      fetchAll();
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
    entityType: "TENANT",
    createdBy: "",
    senderId: "",
    subject: "Invoice Payment",
  });

  const [mode, setmode] = useState("");
  const handleModeChange = (mode) => {
    setmode(mode);
  };

  const handleClicked = (inv, mod) => {
    let mes = `Dear ${
      inv.tenantType === "COMPANY" ? inv.companyName : inv.firstName
    }, `;
    let senderId =
      JSON.parse(authService.getCurrentUserName()).client?.senderId === null
        ? "REVENUESURE"
        : JSON.parse(authService.getCurrentUserName()).client?.senderId;
    setDetails({
      ...details,
      message: mes,
      contact: mod === "Email" ? inv?.email : inv?.phoneNumber,
      entity: inv.id,
      recipientName:
        inv.tenantType === "COMPANY" ? inv.companyName : inv.firstName,
      createdBy: authLoginService.getCurrentUser(),
      senderId: senderId,
      subject: "",
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
      createdBy: authLoginService.getCurrentUser(),
      senderId: "",
      subject: "",
    });
  };

  return (
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
        {/* <!-- start page title --> */}
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">All Registered Tenants</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard </Link>
                  </li>
                  <li className="breadcrumb-item active">Tenants Register</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end page title --> */}

        {/* <!-- quick stast end --> */}

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                <div
                  className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                  role="toolbar"
                >
                  <div className="d-flex align-items-center flex-grow-1"></div>
                  <div className="d-flex">
                    <Link
                      to="/addtenant"
                      type="button"
                      className="btn btn-primary dropdown-toggle option-selector"
                    >
                      <i className="dripicons-plus font-size-16"></i>{" "}
                      <span className="pl-1 d-md-inline">Add A Tenant</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <h4 className="card-title text-capitalize mb-0 ">
                      All Tenants
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
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table  align-middle table-nowrap table-hover"
                    id="example"
                  >
                    <thead className="table-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Names</th>
                        <th scope="col">Tenant Type</th>
                        <th scope="col">Nationality</th>
                        <th scope="col">Contact Email</th>
                        <th scope="col">Contact Phone</th>
                        <th scope="col">Date Created</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {premises?.map((premise, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-capitalize">{index + 1}</td>
                            <td className="text-capitalize">
                              <Link to={"/tenant/" + premise.id}>
                                {premise.tenantType === "COMPANY"
                                  ? premise.companyName
                                  : premise.firstName + " " + premise.lastName}
                              </Link>
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {premise.tenantType === "COMPANY" ? (
                                  <span className="badge-soft-success badge">
                                    {premise.tenantType}
                                  </span>
                                ) : (
                                  <span className="badge-soft-primary badge">
                                    {premise.tenantType}
                                  </span>
                                )}
                              </h5>
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {premise.nationality}
                              </h5>
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {premise.email}
                              </h5>
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {premise.phoneNumber}
                              </h5>
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {moment(premise.dateTimeCreated).format(
                                  "YYYY-MM-DD HH:mm"
                                )}
                              </h5>
                            </td>

                            <td>
                              {premise.active ? (
                                <span className="badge-soft-success badge">
                                  Active
                                </span>
                              ) : (
                                <span className="badge-soft-danger badge">
                                  Inactive
                                </span>
                              )}
                            </td>

                            <td>
                              <div className="dropdown">
                                <a
                                  className="text-muted font-size-16"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                >
                                  <i className="bx bx-dots-vertical-rounded"></i>
                                </a>

                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link
                                    className="dropdown-item"
                                    to={"/tenant/" + premise.id}
                                  >
                                    <i className="font-size-15 mdi mdi-eye-plus-outline me-3"></i>
                                    Detailed View
                                  </Link>

                                  <a
                                    className="dropdown-item "
                                    onClick={() => {
                                      handleModeChange("Email");
                                      handleClicked(premise, "Email");
                                    }}
                                  >
                                    <i className="font-size-15 mdi mdi-email me-3 "></i>
                                    Email Tenant
                                  </a>
                                  <a
                                    className="dropdown-item "
                                    onClick={() => {
                                      handleModeChange("SMS");
                                      handleClicked(premise, "SMS");
                                    }}
                                  >
                                    <i className="font-size-15 mdi mdi-chat me-3 "></i>
                                    SMS Tenant
                                  </a>
                                  {/* <a className="dropdown-item" href="property-details.html"><i className="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed view</a> */}
                                  {/* <a className="dropdown-item" href="property-units.html"><i className="font-size-15 mdi mdi-home-variant me-3"></i>Units</a>
                                    <a className="dropdown-item" href="#"><i className="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a>
                                    <a className="dropdown-item" href="#"> <i className="font-size-15  mdi-file-document-multiple mdi me-3 text-info"> </i> Change ownership</a> */}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      <tr></tr>
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

              <Message details={details} mode={mode} clear={clear} />
            </div>
          </div>
        </div>
        {/* <!-- end col --> */}
      </div>
      <Helmet>
        <script src="assets/js/pages/datatables.init.js"></script>
      </Helmet>
      {/* <!-- end row --> */}
    </div>
  );
}

export default AllTenants;
