/* global $ */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";
import requestsServiceService from "../../services/requestsService.service";
import StatusBadge from "../../components/StatusBadge";
import authService from "../../services/auth.service";
import Message from "../../components/Message";
import authLoginService from "../../services/authLogin.service";
import ReactPaginate from "react-paginate";

function AllNotes() {
  const [notes, setnotes] = useState([]);
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [noteType, setnoteType] = useState("Credit");
  const [loading, setloading] = useState(false);
  const formatCurrency = (x) => {
    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    });
    return formatCurrency.format(x);
  };
  const getData = () => {
    $("#spinner").removeClass("d-none");
    requestsServiceService.getNotes(noteType.toUpperCase(), page , size).then((res) => {
      setnotes( res.data.data != null? res.data.data:[]);
      setPage(res.data.page);
      setSize(res.data.size);
      setPageCount(res.data.totalPages);
      $("#spinner").addClass("d-none");
    });
  };
  useEffect(() => {
    // setnotes([]);
    getData();
  }, [page , size ,noteType]);

  // MESSAGE TEST
  const [details, setDetails] = useState({
    message: "",
    contact: "",
    recipientName: "",
    entity: null,
    clientName: JSON.parse(authService.getCurrentUserName()).client?.name,
    clientId: parseInt(authService.getClientId()),
    entityType: "USER",
    createdBy: authLoginService.getCurrentUser(),
    senderId: "",
    subject: `${noteType} notification message`,
  });
  const total = () => {
    let sum = 0;
    let paid = 0;
    notes?.map((item) => {
      sum += item.amount;
    });
    return sum;
  };

  const [mode, setmode] = useState("");
  const handleModeChange = (mode) => {
    setmode(mode);
  };

  const handleClicked = (inv, mod) => {
    var senderId =
      JSON.parse(authService.getCurrentUserName()).client?.senderId === null
        ? "REVENUESURE"
        : JSON.parse(authService.getCurrentUserName()).client?.senderId;
    if (inv.noteType === "DEBIT") {
      let mes = `Dear ${inv.landLord.firstName} ${inv.landLord.lastName}, your DEBIT balance is ${inv.amount}`;
      setDetails({
        ...details,
        message: mes,
        contact:
          mod === "Email" ? inv?.landLord.email : inv?.landLord.phoneNumber,
        entity: inv.landLord.id,
        recipientName: inv?.landLord.firstName,
        createdBy: authService.getCurrentUserName(),
        senderId: senderId,
        subject: `${noteType} note notification`,
      });
    }
    if (inv.noteType === "CREDIT") {
      let tenantName =
        inv.tenancy?.tenant?.tenantType === "COMPANY"
          ? inv.tenancy?.tenant?.companyName
          : inv.tenancy?.tenant?.firstName +
            " " +
            inv.tenancy?.tenant?.lastName;
      let mes = `Dear ${tenantName}, your DEBIT balance is ${inv.amount} for note reference ${inv.reference}`;
      setDetails({
        ...details,
        message: mes,
        contact:
          mod === "Email"
            ? inv.tenancy?.tenant?.email
            : inv.tenancy?.tenant?.phoneNumber,
        entity: inv.tenancy?.tenant?.id,
        recipientName: tenantName,
        createdBy: authService.getCurrentUserName(),
        senderId: senderId,
        subject: `${noteType} note notification`,
      });
    }

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
      entityType: "USER",
      createdBy: authLoginService.getCurrentUser(),
      senderId: "",
      subject: "",
    });
  };
  
  
  const sortSize = (e) => {
    setSize(e.target.value);
    setPage(0);
  };

  const handlePageClick = (data) => {
    setPage(() => data.selected);
  };

  return (
    <div className="">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
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
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Credit & Debit Notes</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">
                      <Link to="/notes"> All Notes</Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div class="card-header bg-white pt-0 pr-0 p-0 justify-content-between align-items-center w-100 border-bottom">
            <div
              className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
              role="toolbar"
            >
              <h4 className="card-title text-capitalize mb-0 ">
                {noteType} Notes
                {/*<span className="today-month">March 2022</span>*/}
              </h4>

              <div className="d-flex">
                <Link to={`/create-${noteType}-note`}>
                  <button className="btn btn-primary dropdown-toggle option-selector me-3">
                    <i className="mdi mdi-plus-circle-outline  font-size-16"></i>{" "}
                    <span className="pl-1 d-md-inline">
                      Create A {noteType} Note
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <div
              class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
              role="toolbar"
            >
              <div class="d-flex align-items-center flex-grow-1">
                <div className="form-group d-flex">
                  <div
                    className={"form-check mb-3"}
                    style={{ marginRight: "1em" }}
                  >
                    <input
                      className="form-check-input"
                      value="Credit"
                      type="checkbox"
                      checked={noteType === "Credit"}
                      onChange={() => setnoteType("Credit")}
                    />
                    <label className="form-check-label" htmlFor="debit-yes">
                      Credit
                    </label>
                  </div>
                  <div className={"form-check mb-3"}>
                    <input
                      className="form-check-input"
                      value="Credit"
                      type="checkbox"
                      checked={noteType === "Debit"}
                      onChange={() => setnoteType("Debit")}
                    />
                    <label className="form-check-label" htmlFor="debit-no">
                      Debit
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- end page title -->

        <!-- eTransactions table --> */}

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div className="">
                    <table className="table no-wrap nowrap w-100 table-striped">
                      <thead className="table-dark">
                        <tr>
                          {noteType === "Credit" ? (
                            <>
                              <th></th>
                              <th>Note Ref</th>
                              <th>Type</th>
                              <th>For</th>
                              <th>Created on</th>
                              <th>Invoice</th>
                              <th>Reason</th>
                              <th>Credit Amount</th>
                              <th>Actions</th>
                            </>
                          ) : (
                            <>
                              <th></th>
                              <th>Note Ref</th>
                              <th>Type</th>
                              <th>For</th>
                              <th>Created on</th>
                              <th>Reason</th>
                              <th>Amount</th>
                              <th>Actions</th>
                            </>
                          )}
                        </tr>
                      </thead>

                      <tbody className="table-striped">
                        <div className="loader-container">
                          <div className="spinner"></div>
                        </div>
                        {notes !== null &&
                          notes?.map((list, index) => {
                            return (
                              <>
                                {noteType === "Credit" ? (
                                  <>
                                    <tr key={list.id}>
                                      <td className="">
                                        <div className="d-flex align-items-end"></div>
                                      </td>
                                      <td>
                                        <p className="mb-0">{list.reference}</p>
                                      </td>
                                      <td>{list.noteType}</td>
                                      <td>
                                        <Link
                                          to={
                                            "/tenant/" +
                                            list.tenancy?.tenant?.id
                                          }
                                        >
                                          {list.tenancy?.tenant?.tenantType ===
                                          "COMPANY"
                                            ? list.tenancy?.tenant?.companyName
                                            : list.tenancy?.tenant?.firstName +
                                              " " +
                                              list.tenancy?.tenant?.lastName}
                                        </Link>
                                      </td>
                                      <td>
                                        {moment(list.dateTimeCreated).format(
                                          "YYYY-MM-DD HH:mm"
                                        )}
                                      </td>
                                      <td>
                                        <p className="mb-0">
                                          {
                                            list.tenancy?.premiseUnit?.premise
                                              ?.premiseName
                                          }
                                        </p>
                                      </td>
                                      <td>
                                        {list.reason.substring(0, 50) + "...."}
                                      </td>
                                      <td>{formatCurrency(list.amount)}</td>
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
                                              {/*<a*/}
                                              {/*  className="dropdown-item "*/}
                                              {/*  href="# "*/}
                                              {/*>*/}
                                              {/*  <i className="font-size-15 mdi mdi-printer me-3 "></i>*/}
                                              {/*  Print Credit Note*/}
                                              {/*</a>*/}
                                              <a
                                                className="dropdown-item cursor-pointer"
                                                onClick={() => {
                                                  handleModeChange("Email");
                                                  handleClicked(list, "Email");
                                                }}
                                              >
                                                <i className="font-size-15 mdi mdi-email me-3 "></i>
                                                Email {noteType} note
                                              </a>
                                              <a
                                                className="dropdown-item cursor-pointer"
                                                onClick={() => {
                                                  handleModeChange("SMS");
                                                  handleClicked(list, "SMS");
                                                }}
                                              >
                                                <i className="font-size-15 mdi mdi-chat me-3"></i>
                                                SMS {noteType} note
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    <tr key={list.id}>
                                      <td className="">
                                        <div className="d-flex align-items-end"></div>
                                      </td>
                                      <td>
                                        <p className="mb-0">{list.reference}</p>
                                      </td>
                                      <td>{list.noteType}</td>
                                      <td>
                                        <Link
                                          to={"/landlord/" + list.landLord?.id}
                                        >
                                          {list.landLord?.landLordType ===
                                          "COMPANY"
                                            ? list.landLord?.companyName
                                            : list.landLord?.firstName +
                                              " " +
                                              list.landLord?.lastName}
                                        </Link>
                                      </td>
                                      <td>
                                        {moment(list.dateTimeCreated).format(
                                          "YYYY-MM-DD HH:mm"
                                        )}
                                      </td>
                                      <td>
                                        {list.reason.substring(0, 70) + "..."}
                                      </td>
                                      <td>{formatCurrency(list.amount)}</td>
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
                                              {/*<a*/}
                                              {/*  className="dropdown-item "*/}
                                              {/*  href="# "*/}
                                              {/*>*/}
                                              {/*  <i className="font-size-15 mdi mdi-printer me-3 "></i>*/}
                                              {/*  Print Credit Note*/}
                                              {/*</a>*/}
                                              <a
                                                className="dropdown-item cursor-pointer"
                                                onClick={() => {
                                                  handleModeChange("Email");
                                                  handleClicked(list, "Email");
                                                }}
                                              >
                                                <i className="font-size-15 mdi mdi-email me-3 "></i>
                                                Email {noteType} note
                                              </a>
                                              <a
                                                className="dropdown-item cursor-pointer"
                                                onClick={() => {
                                                  handleModeChange("SMS");
                                                  handleClicked(list, "SMS");
                                                }}
                                              >
                                                <i className="font-size-15 mdi mdi-chat me-3"></i>
                                                SMS {noteType} note
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </>
                            );
                          })}
                      </tbody>
                      <tfoot className="table-dark">
                        <tr>
                          <th
                            className="text-capitalize text-nowrap"
                            colSpan="3"
                          >
                            { notes && notes?.length} {noteType} notes
                          </th>
                          <td className="text-nowrap text-right" colSpan="6">
                            <span className="fw-semibold">
                              {formatCurrency(total())}
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
                          // value={size}
                        >
                         
                          <option value={10}>10 Rows</option>
                          <option value={30}>30 Rows</option>
                          <option value={50}>50 Rows</option>
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
                    <Message details={details} mode={mode} clear={clear} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- end row --> */}
        </div>
        {/* <!-- container-fluid --> */}
      </div>
      {/* <!-- End Page-content --> */}

      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <script>document.write(new Date().getFullYear())</script> ©
              RevenueSure.
            </div>
            <div className="col-sm-6">
              <div className="text-sm-end d-sm-block">
                Developed by Nouveta LTD.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AllNotes;
