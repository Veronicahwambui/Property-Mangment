/* global $ */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import requestsServiceService from "../../services/requestsService.service";
import StatusBadge from "../../components/StatusBadge";

function AdminList() {
  const [userList, setUserList] = useState([]);
  const [viewUser, setViewUser] = useState([]);

  const getData = () => {
    // e.preventDefault()
    requestsServiceService.getData().then((res) => {
      setUserList(res.data.data);
    });
  };

  const oneUser = () => {
    requestsServiceService.viewOneUser().then((res) => {
      setViewUser(res.data.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

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

  return (
    <div className="">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">User List</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboards</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">System user</a>
                    </li>
                    <li class="breadcrumb-item active">User List</li>
                  </ol>
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
                  <div className="table-responsive">
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
                                      {list.firstName + "  " + list.lastName}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="mb-0">{list.userName}</p>
                                  </td>
                                  <td>
                                    <p className="mb-0">{list.email}</p>
                                  </td>
                                  <td>
                                    <p className="mb-0">{list.phoneNumber}</p>
                                  </td>
                                  <td>
                                    <p className="mb-0">{list.role.name}</p>
                                  </td>

                                  <td>
                                    {list.enabled ? (
                                      <StatusBadge type="True" />
                                    ) : (
                                      <StatusBadge type="False" />
                                    )}
                                  </td>

                                  <td>
                                    {list.blocked ? (
                                      <StatusBadge type="True" />
                                    ) : (
                                      <StatusBadge type="False" />
                                    )}
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
                                        <Link to={"/adminlist/edit/" + list.id}>
                                          <a
                                            className="dropdown-item"
                                            href="tenant-new.html"
                                          >
                                            edit user
                                          </a>
                                        </Link>

                                        {list.enabled ? (
                                          <button
                                            data-id={list.id}
                                            className="dropdown-item disableUser"
                                          >
                                            Deactivate User
                                          </button>
                                        ) : (
                                          <button
                                            data-id={list.userName}
                                            className="dropdown-item enableUser"
                                          >
                                            Activate User
                                          </button>
                                        )}

                                        {list.blocked && (
                                          <button
                                            data-id={list.id}
                                            className="dropdown-item unlockUser"
                                          >
                                            UnBlock User Account
                                          </button>
                                        )}

                                        <a
                                          class="dropdown-item"
                                          href="tenant-new.html"
                                          data-bs-toggle="modal"
                                          data-bs-target="#add-new"
                                          onClick={() => viewUser(list.id)}
                                        >
                                          View user
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
