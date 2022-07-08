import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import requestsServiceService from "../../services/requestsService.service";

function AdminList() {
  const [userList, setUserList] = useState([]);

  const getData = () => {
    // e.preventDefault()
    requestsServiceService.getData().then((res) => {
      setUserList(res.data.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const confirmDeactivateUser = (e, id) => {
    e.preventDefault();

    confirmAlert({
      message: "Are you sure you want to deactivate user id " + id,
      buttons: [
        {
          label: "Cancel",
        },
        {
          label: "OK",
          onClick: requestsServiceService
            .deactivateUser(id)
            .then((res) => {})
            .catch((err) => {}),
        },
      ],
    });
  };

  return (
    <div className="">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">System administrators</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Dashboards</a>
                    </li>
                    <li className="breadcrumb-item active">
                      System administrators
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title -->

        <!-- eTransactions table --> */}

          <div className="card-body">
            <table
              className="table align-middle table-nowrap table-hover dt-responsive contacts-table"
              id="datatable-buttons"
            >
              <thead className="table-dark">
                <tr>
                  <th>Admin</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>UserName</th>
                  <th>OtherNames</th>
                  <th>Email</th>
                  <th>PhoneNumber</th>
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
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-xs">
                                  <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                    <strong></strong>
                                  </span>
                                </div>
                              </div>

                              <div className="flex-grow-1">
                                <h5 className="font-size-14 mb-0">
                                  {list.firstName}
                                </h5>
                              </div>
                            </div>
                          </td>
                          <td>
                            <td>
                              <p className="mb-0">
                                <a href="mailto:martinokesh40@email.com">
                                  {list.firstName}
                                </a>
                              </p>
                            </td>
                            <p className="mb-0">
                              <a href="mailto:martinokesh40@email.com">
                                {list.lastName}
                              </a>
                            </p>
                          </td>
                          <td>
                            <p className="mb-0">
                              <a href="mailto:martinokesh40@email.com">
                                {list.userName}
                              </a>
                            </p>
                          </td>
                          <td>
                            <p className="mb-0">
                              <a href="mailto:martinokesh40@email.com">
                                {list.otherName}
                              </a>
                            </p>
                          </td>
                          <td>
                            <p className="mb-0">{list.email}</p>
                          </td>
                          <td>
                            <p className="mb-0">{list.phoneNumber}</p>
                          </td>
                          <td>
                            <p className="mb-0">
                              <a href="tel:0704003859"></a>
                              {list.staffId}
                            </p>
                          </td>

                          <td>
                            {/* <!-- Button trigger modal --> */}
                            <div class="dropdown">
                              <a
                                class="text-muted font-size-16"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                              >
                                <i class="bx bx-dots-vertical-rounded"></i>
                              </a>

                              <div class="dropdown-menu dropdown-menu-end text-capitalize">
                                <Link to={"/adminlist/edit/" + list.id}>
                                  <a
                                    class="dropdown-item"
                                    href="tenant-new.html"
                                  >
                                    <i class="font-size-15 mdi mdi-account-cash me-3"></i>
                                    edit user
                                  </a>
                                </Link>

                                {list.accountLocked === "true" && (
                                  <button
                                    className="dropdown-item"
                                    onClick={(e) =>
                                      confirmUnlockUserAccount(e, list.id)
                                    }
                                  >
                                    <i class="font-size-15 mdi mdi-account-cash me-3"></i>
                                    Unlock User
                                  </button>
                                )
                                  }
                                {list.enabled === "true" ? (
                                  <button
                                    className="dropdown-item"
                                    onClick={(e) =>
                                      confirmDeactivateUser(e, list.id)
                                    }
                                  >
                                    <i class="font-size-15 mdi mdi-account-cash me-3"></i>
                                    Deactivate User
                                  </button>
                                ) : (
                                  <button
                                    className="dropdown-item"
                                    onClick={(e) =>
                                      confirmActivateUser(e, list.id)
                                    }
                                  >
                                    <i class="font-size-15 mdi mdi-account-cash me-3"></i>
                                    Activate User
                                  </button>
                                )}
                                
                                {/* <a class="dropdown-item" href="tenant-new.html">
                                  <i class="font-size-15 mdi mdi-account-cash me-3"></i>
                                  Deactive User
                                </a> */}
                                <a
                                  class="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target=".notice-modal"
                                  href="#"
                                >
                                  <i class="font-size-15 mdi mdi-file-cancel me-3"></i>
                                  View User
                                </a>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target=".statements-modal"
                                >
                                  <i class="font-size-15  mdi mdi-cash-multiple me-3"></i>
                                  Get Statements
                                </a>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target=".distress-modal"
                                >
                                  <i class="font-size-15 mdi mdi-chevron-double-right me-3"></i>
                                  Move to distress Letter stage
                                </a>
                                <a class="dropdown-item write-msg-btn" href="#">
                                  <i class="font-size-15  mdi mdi-chat me-3 "></i>
                                  Message Tenant
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

          {/* <!-- end row --> */}
        </div>
        {/* <!-- container-fluid -->
</div> */}
        {/* <!-- End Page-content --> */}

        {/* <!-- Transaction Modal --> */}
        <div
          className="modal fade transaction-detailModa1-1"
          tabindex="-1"
          role="dialog"
          aria-labelledby="transaction-detailModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="transaction-detailModalLabel">
                  Transactions Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="table-responsive mt-4">
                  <table className="table align-middle table-nowrap">
                    <tbody>
                      <tr>
                        <td style={{ width: "30%" }}>
                          <p className="mb-0">Car Plate Number</p>
                        </td>
                        <td style={{ width: "25%" }}>
                          <h5 className="mb-0 text-uppercase">UAG 1235p</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-0">Vehicle Category</p>
                        </td>
                        <td>
                          <h5 className="mb-0">Salon Car</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-0">Payment Date</p>
                        </td>
                        <td>
                          <h5 className="mb-0">22 Apr 2022 06:54PM</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-0">San Diego</p>
                        </td>
                        <td>
                          <h5 className="mb-0">1,026</h5>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <p className="mb-0 pb-0">Amount Paid</p>
                          <h3>UGX 2,000</h3>
                        </td>
                      </tr>

                      <td col-span="2">
                        <p className="mb-2">
                          Attended By
                          <span className="text-primary"> Alex Sebeye</span>
                        </p>
                        <p className="mb-4">
                          Toll taker's No.{" "}
                          <span className="text-primary">0704549859</span>
                        </p>
                      </td>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end modal --> */}

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
    </div>
  );
}

export default AdminList;
