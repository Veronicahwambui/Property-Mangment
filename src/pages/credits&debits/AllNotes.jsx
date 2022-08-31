/* global $ */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";
import requestsServiceService from "../../services/requestsService.service";
import StatusBadge from "../../components/StatusBadge";
import authService from "../../services/auth.service";
import Message from "../../components/Message";
import authLoginService from "../../services/authLogin.service";

function AllNotes() {
  const [notes, setnotes] = useState([]);
  const [noteType, setnoteType] = useState("CREDIT");
  const formatCurrency = (x) => {
    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    });
    return formatCurrency.format(x);
  };

  const getData = () => {
    // e.preventDefault()
    requestsServiceService.getNotes(noteType).then((res) => {
      setnotes(res.data.data);
      $("#spinner").addClass("d-none");
    });
  };
  useEffect(() => {
    getData();
  }, [noteType]);

  const confirmDeactivateUser = (el) => {
    el.preventDefault();
    let id = el.target.dataset.id;

    confirmAlert({
      message: "Are you sure you want to deactivate user id " + id,
      buttons: [
        {
          label: "Cancel",
        },
        {
          label: "OK",
          onClick: () =>
            requestsServiceService
              .deactivateUser(id)
              .then((res) => {
                getData();
                confirmAlert({
                  message: res.data.message,
                  buttons: [
                    {
                      label: "OK",
                    },
                  ],
                });
              })
              .catch((err) => {
                confirmAlert({
                  message: err.data.message,
                  buttons: [
                    {
                      label: "OK",
                    },
                  ],
                });
              }),
        },
      ],
    });
  };
  const confirmActivateUser = (el) => {
    el.preventDefault();
    let id = el.target.dataset.id;
    confirmAlert({
      message: "Are you sure you want to activate user " + id,
      buttons: [
        {
          label: "Cancel",
        },
        {
          label: "OK",
          onClick: () =>
            requestsServiceService
              .activateUser(id)
              .then((res) => {
                getData();
                confirmAlert({
                  message: res.data.message,
                  buttons: [
                    {
                      label: "OK",
                    },
                  ],
                });
              })
              .catch((err) => {
                confirmAlert({
                  message: err.data.message,
                  buttons: [
                    {
                      label: "OK",
                    },
                  ],
                });
              }),
        },
      ],
    });
  };
  const confirmUnlockUserAccount = (el) => {
    el.preventDefault();
    let id = el.target.dataset.id;

    confirmAlert({
      message: "Are you sure you want to unblock user id " + id,
      buttons: [
        {
          label: "Cancel",
        },
        {
          label: "OK",
          onClick: () =>
            requestsServiceService
              .unlockUserAccount(id)
              .then((res) => {
                getData();
                confirmAlert({
                  message: res.data.message,
                  buttons: [
                    {
                      label: "OK",
                    },
                  ],
                });
              })
              .catch((err) => {
                confirmAlert({
                  message: err.data.message,
                  buttons: [
                    {
                      label: "OK",
                    },
                  ],
                });
              }),
        },
      ],
    });
  };

  $("body").on("click", ".disableUser", confirmDeactivateUser);
  $("body").on("click", ".enableUser", confirmActivateUser);
  $("body").on("click", ".unlockUser", confirmUnlockUserAccount);

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
    subject: "I",
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
      entity: inv.id,
      recipientName: inv?.firstName,
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
      entityType: "USER",
      createdBy: authLoginService.getCurrentUser(),
      senderId: "",
      subject: "",
    });
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
          <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
            <div
              class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
              role="toolbar"
            >
              <div class="d-flex align-items-center flex-grow-1">
                <h4 class="mb-0  bg-transparent  p-0 m-0">
                  {noteType} Notes List
                </h4>
              </div>
              <div class="d-flex">
                <div className="form-group">
                  <label htmlFor="">Note Type</label>
                  <select
                    class="form-control"
                    title="Select TenancyStatus"
                    onChange={(e) => setnoteType(e.target.value)}
                  >
                    <option className="text-black font-semibold ">
                      --Select note type
                    </option>

                    {["CREDIT", "DEBIT"]?.map((t, index) => {
                      return (
                        <option key={t} value={t}>
                          {t.toLowerCase()}
                        </option>
                      );
                    })}
                  </select>
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
                          <th></th>
                          <th>Note Ref</th>
                          <th>For</th>
                          <th>Created on</th>
                          <th>Invoice</th>
                          <th>Reason</th>
                          <th>Amount</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody className="table-striped">
                        {notes !== null &&
                          notes?.map((list, index) => {
                            return (
                              <>
                                <tr key={list.id}>
                                  <td className="">
                                    <div className="d-flex align-items-center"></div>
                                  </td>

                                  <td>
                                    <p className="mb-0">{list.reference}</p>
                                  </td>
                                  {noteType === "CREDIT" && (
                                    <td>
                                      <p className="mb-0">
                                        {list.tenancy?.tenant?.firstName}{" "}
                                        {list.tenancy?.tenant?.lastName}
                                      </p>
                                    </td>
                                  )}
                                  {noteType === "DEBIT" && (
                                    <td>
                                      <p className="mb-0">
                                        {list.landLord?.firstName}{" "}
                                        {list.landLord?.lastName}
                                      </p>
                                    </td>
                                  )}
                                  <td>
                                    {moment(list.dateTimeCreated).format(
                                      "YYYY-MM-DD HH:mm"
                                    )}
                                  </td>
                                  {noteType === "CREDIT" && (
                                    <td>
                                      <p className="mb-0">
                                        {
                                          list.tenancy?.premiseUnit?.premise
                                            ?.premiseName
                                        }
                                      </p>
                                    </td>
                                  )}
                                  {noteType === "DEBIT" && (
                                    <td>
                                      <p className="mb-0">{list.noteType}</p>
                                    </td>
                                  )}
                                  <td>
                                    {list.reason.substring(0, 50) + "...."}
                                  </td>
                                  <td>{formatCurrency(list.amount)}</td>
                                </tr>
                              </>
                            );
                          })}
                      </tbody>
                    </table>

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
