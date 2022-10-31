/* global $ */
import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useParams } from "react-router-dom";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";

function UpdateUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [idNo, setIdNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [staffNo, setStaffNo] = useState("");
  const [userRoles, setUserRoles] = useState([]);
  const [roleIds, SetRoleIds] = useState([]);
  const [userName, setUserName] = useState("");

  const [role, setRole] = useState("");
  const [privileges, setPrivileges] = useState([]);
  const [priveledgeNames, setPrivilegeNames] = useState([]);

  let { id } = useParams();
  let userId = id;
  useEffect(() => {

    getUserRoles();
    getAllPreviledges();

    // fetch use details
    requestsServiceService
      .getUser(userId)
      .then((res) => {
        setFirstName(res.data.data.user.firstName);
        setLastName(res.data.data.user.lastName);
        setOtherName(res.data.data.user.otherName);
        setEmail(res.data.data.user.email);
        setIdNo(res.data.data.user.idNumber);
        setPhoneNo(res.data.data.user.phoneNumber);
        setUserName(res.data.data.user.userName);
        setStaffNo(res.data.data.user.staffId);
        setRole(res.data.data.user.role.id);
        setPrivilegeNames(res.data.data.permissions)

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const editUserDetails = (ev) => {
    ev.preventDefault();
    const data = JSON.stringify({
      clientKey: authService.getAppKey(),
      email: email,
      enabled: true,
      firstName: firstName,
      id: parseInt(userId),
      idNumber: idNo,
      lastName: lastName,
      otherName: otherName,
      phoneNumber: phoneNo,
      role: role,
      staffId: staffNo,
      userName: userName,
      userPermissions: priveledgeNames,
    });

    requestsServiceService
      .editUserDetails(data)
      .then((res) => {
        confirmAlert({
          message: res.data.message,
          buttons: [{ label: "OK", onClick: (e) => window.location.href = '/adminlist' }]
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserRoles = () => {
    requestsServiceService.getUserRoles().then((res) => {
      setUserRoles(res.data.data);
    });
  };

  const getAllPreviledges = () => {
    requestsServiceService.getAllPreviledges().then((res) => {
      setPrivileges(res.data.data);
    });
  };

  const handleRoleChange1 = (val) => {
    setRole(val);

    if (val != undefined)
      requestsServiceService.ViewOneRole(val).then((res) => {
        setPrivilegeNames(res.data.data.permissions.map(pem => pem.name));
      });
  }

  const handleRoleChange = (index, event) => {
    const { checked, value } = event.target;

    if (checked) {
      setPrivilegeNames([...priveledgeNames, privileges[index].name]);
    } else {
      setPrivilegeNames(
        priveledgeNames.filter(
          (priveledgeId) => priveledgeId !== privileges[index].name
        )
      );
    }
  };

  // LOADER ANIMATION
  useEffect(() => {
    $("#spinner").removeClass("d-none");
    setTimeout(() => {
      $("#spinner").addClass("d-none");
    }, 1000);
  }, [])

  return (
    <div className="">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
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
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Add an Admin</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to='/'>Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">
                      <Link to='/adminlist'> System Users</Link>
                    </li>
                    <li className="breadcrumb-item active">Add an admin</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          {/* <!-- eTransactions table --> */}

          <div className="row">
            <div className="col-12">
              <div className="card p-4">
                <div className="card-body">
                  <h4 className="card-title text-capitalize">
                    Register a new System administrator
                  </h4>

                  <hr className="mb-5" />
                  <form onSubmit={editUserDetails}>
                    {/* <!-- the names --> */}
                    <div className="row  mb-4 pb-2 align-items-center">
                      <label htmlFor="" className="col-form-label col-lg-2">
                        First name <strong className="text-danger">*</strong>
                      </label>
                      <div className="col-lg-4">
                        <input
                          type="text"
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                          className="form-control"
                          placeholder="Enter first name "
                          required
                        />
                      </div>

                      <label htmlFor="" className="col-form-label col-lg-2">
                        Last name <strong className="text-danger">*</strong>
                      </label>
                      <div className="col-lg-4">
                        <input
                          type="text"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                          className="form-control"
                          placeholder="Enter first name "
                          required
                        />
                      </div>
                    </div>
                    <div className="row  mb-4 pb-2 align-items-center">
                      <label htmlFor="" className="col-form-label col-lg-2">
                        Other Name(s) <strong className="text-danger">*</strong>
                      </label>
                      <div className="col-lg-4">
                        <input
                          type="text"
                          value={otherName}
                          onChange={(event) => setOtherName(event.target.value)}
                          className="form-control"
                          placeholder="Enter the other name(s)"
                          required
                        />
                      </div>
                      <label htmlFor="" className="col-form-label col-lg-2">
                        UserName(s) <strong className="text-danger">*</strong>
                      </label>
                      <div className="col-lg-4">
                        <input
                          type="text"
                          value={userName}
                          onChange={(event) => setUserName(event.target.value)}
                          className="form-control"
                          placeholder="Enter the Username"
                          required
                        />
                      </div>
                    </div>

                    {/* <!-- Identification --> */}
                    <div className="row  mb-4 pb-2 align-items-center">
                      <label htmlFor="" className="col-form-label col-lg-2">
                        ID Number
                        <strong className="text-danger">*</strong>
                      </label>
                      <div className="col-lg-4">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(event) => setIdNo(event.target.value)}
                          value={idNo}
                          placeholder="ID No."
                          required
                        />
                      </div>

                      <label htmlFor="" className="col-form-label col-lg-2">
                        Staff ID Number
                        <strong className="text-danger">*</strong>
                      </label>
                      <div className="col-lg-4">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(event) => setStaffNo(event.target.value)}
                          value={staffNo}
                          placeholder="Staff ID"
                          required
                        />
                      </div>
                    </div>

                    {/* <!-- contact information --> */}

                    <div className="row mb-4 pb-2 align-items-center">
                      <label htmlFor="" className="col-form-label col-lg-2">
                        Email address <strong className="text-danger">*</strong>
                      </label>
                      <div className="col-lg-4">
                        <input
                          id="input-email"
                          className="form-control input-mask"
                          data-inputmask="'alias': 'email'"
                          type="text"
                          onChange={(event) => setEmail(event.target.value)}
                          value={email}
                          placeholder="Enter the email address"
                          required
                        />
                        <span className="text-muted">_@_._</span>
                      </div>

                      <label for="" className="col-form-label col-lg-2">
                        Phone Number<strong className="text-danger">*</strong>
                      </label>
                      <div className="col-lg-4">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(event) => setPhoneNo(event.target.value)}
                          value={phoneNo}
                          placeholder="Enter user's phone number"
                          required
                        />
                      </div>
                    </div>
                    {/* <!-- system roles --> */}

                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>
                          <strong>
                            Role
                            <strong className="text-danger">*</strong>
                          </strong>
                        </label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            handleRoleChange1(e.target.value);
                          }}
                          value={role}
                          title="System role"
                        >
                          <option value={undefined}>
                            Roles
                          </option>

                          {userRoles.map((role) => {
                            return (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="">
                      <div className="col-form-label col-lg-3">

                        <strong> User Privilages and Permissions</strong>

                      </div>
                    </div>

                    <div className="row mt-5">
                      {privileges.map((priv, index) => (
                        <div className="col-4">
                          <div className="checkbox" key={priv.id}>
                            <input
                              type="checkbox"
                              checked={priveledgeNames.includes(priv.name)}
                              id={index}
                              onChange={(event) => handleRoleChange(index, event)}
                            />
                            <label className="checkbox__label" htmlFor={index}>
                              {priv.name.toLowerCase().replace(/_/g, "  ")}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="row justify-content-end">
                      <div className="col-lg-10">
                        <button onClick={editUserDetails} type="submit" className="btn btn-primary w-100">
                          <i className="mdi mdi-account-plus-outline me-1"></i>
                          Edit Admin
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <!-- end col --> */}
          </div>

          {/* <!-- end row --> */}
        </div>
        {/* <!-- container-fluid --> */}
      </div>

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

export default UpdateUser;
