/* global $ */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from 'moment'
import requestsServiceService from "../../services/requestsService.service";
import StatusBadge from "../../components/StatusBadge";
import authService from "../../services/auth.service";
import Message from "../../components/Message";
import authLoginService from "../../services/authLogin.service";

function AdminList() {
  const [userList, setUserList] = useState([]);
  const [userType, setUserType] = useState(null);
  const [type, setType] = useState([]);



  const getData = () => {
    // e.preventDefault()
    if (userType != null)
      requestsServiceService.getData(userType).then((res) => {
        setUserList(res.data.data);
      });
  };

  const getType = () => {

    requestsServiceService.userTypeData().then((res) => {
      setType(res.data);

      if (res.data.length>0)
      setUserType(res.data[0].name)

    });
  };
  
  useEffect(() => {
    getType();
  }, []);


  useEffect(() => {
    getData();
  }, [userType]);

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
      contact:
        mod === "Email"
          ? inv?.email
          : inv?.phoneNumber,
      entity: inv.id,
      recipientName: inv?.firstName,
      createdBy: authService.getCurrentUserName(),
      senderId: senderId,
      subject: "Invoice Payment"
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
  // LOADER ANIMATION
  useEffect(() => {
    $("#spinner").removeClass("d-none");
    setTimeout(() => {
      $("#spinner").addClass("d-none");
    }, 1000);
  }, [userType])
  return (
    <div className="">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
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
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">User List</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to='/'>Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">
                      <Link to='/adminlist'> System Users</Link>
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
                  UserList
                </h4>
              </div>
              <div class="d-flex">

                <div className="form-group">
                  <label htmlFor="">UserType</label>
                  <select
                    class="form-control"
                    data-live-search="true"
                    title="Select TenancyStatus"
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option className="text-black font-semibold ">
                      --Select UserType
                    </option>

                    {type?.map((use, index) => {
                      return (
                        <option key={index} value={use.name}>
                          {use.name.toLowerCase()}
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
                  <div className="" >
                    <table
                      className="table no-wrap nowrap w-100 table-striped"
                      id="datatable-buttons"
                    >
                      <thead className="table-dark">
                        <tr>
                          <th></th>
                          <th>Names</th>
                          <th>UserName</th>
                          <th>Email</th>
                          <th>PhoneNumber</th>
                          <th>RoleName</th>
                          <th>Enabled</th>
                          <th>Account Blocked</th>
                          <th>DateCreated</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody className="table-striped">
                        {userList !== null &&
                          userList.map((list, index) => {
                            return (
                              <>
                                <tr>
                                  <td className="">
                                    <div className="d-flex align-items-center"></div>
                                  </td>

                                  <td>
                                    <p className="mb-0">
                                      {list.user.firstName + "  " + list.user.lastName}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="mb-0">{list.user.userName}</p>
                                  </td>
                                  <td>
                                    <p className="mb-0">{list.user.email}</p>
                                  </td>
                                  <td>
                                    <p className="mb-0">{list.user.phoneNumber}</p>
                                  </td>
                                  <td>
                                    <p className="mb-0">{list.user.role.name}</p>
                                  </td>

                                  <td>
                                    {(list.authAccount && list.authAccount.correlator != undefined) ? (
                                      <StatusBadge type="True" />
                                    ) : (
                                      <StatusBadge type="False" />
                                    )}
                                  </td>

                                  <td>
                                    {(list.authAccount && list.authAccount.blocked) ? (
                                      <StatusBadge type="True" />
                                    ) : (
                                      <StatusBadge type="False" />
                                    )}
                                  </td>
                                  <td>
                                    <p className="mb-0">{moment(list.user.dateTimeCreated).format("YYYY-MM-DD HH:mm")}</p>
                                  </td>

                                  <td>
                                    {/* <!-- Button trigger modal --> */}
                                    <div className="dropdown">
                                      <a
                                        className="text-muted font-size-16"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                      >
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                      </a>

                                      <div className="dropdown-menu dropdown-menu-end text-capitalize">
                                        <Link to={"/adminlist/edit/" + list.user.id}>
                                          <a
                                            className="dropdown-item"
                                            href="tenant-new.html"
                                          >
                                            edit user
                                          </a>
                                        </Link>

                                        {list.authAccount && list.authAccount.correlator != undefined ? (
                                          <button
                                            data-id={list.user.id}
                                            className="dropdown-item disableUser"
                                          >
                                            Deactivate User
                                          </button>
                                        ) : (
                                          <button
                                            data-id={list.user.userName}
                                            className="dropdown-item enableUser"
                                          >
                                            Activate User
                                          </button>
                                        )}

                                        {list.authAccount && list.authAccount.blocked && (
                                          <button
                                            data-id={list.user.id}
                                            className="dropdown-item unlockUser"
                                          >
                                            UnBlock User Account
                                          </button>
                                        )}

                                        <Link class="dropdown-item" to={"/adminlist/view/" + list.user.id}>
                                          View user
                                        </Link>

                                        <a className="dropdown-item "
                                          onClick={() => {
                                            handleModeChange("Email");
                                            handleClicked(list.user, "Email");
                                          }}>
                                          <i className="font-size-15 mdi mdi-email me-3 "></i>
                                          Email User
                                        </a>
                                        <a className="dropdown-item "
                                          onClick={() => {
                                            handleModeChange("SMS");
                                            handleClicked(list.user, "SMS");
                                          }}>
                                          <i className="font-size-15 mdi mdi-chat me-3 "></i>
                                          SMS User
                                        </a>
                                      </div>
                                    </div>
                                  </td>
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

export default AdminList;
