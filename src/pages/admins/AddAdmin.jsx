import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import requestsServiceService from "../../services/requestsService.service";

function AddAdmin() {
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

  const addUser = (ev) => {
    ev.preventDefault();
    const data = JSON.stringify({
      clientKey: "4798a842c8984e078540bc6ba75c2994",
      email: email,
      enabled: true,
      firstName: firstName,
      id: null,
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
      .addUser(data)
      .then((res) => {
        console.log(res.data);
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

  useEffect(() => {
    getUserRoles();
    getAllPreviledges();
  }, []);

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

  const onRoleChange = (val) => {
    setRole(val);

    requestsServiceService.ViewOneRole(val).then((res) => {
      setPrivilegeNames(res.data.data.permissions.map(pem => pem.name));
    });
  }

  // console.log(UserPermissionsIds);

  return (
    <div className="">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Create User</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Dashboards</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">System user</a>
                    </li>
                    <li className="breadcrumb-item active">Create User</li>
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
                  <form onSubmit={addUser}>
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
                          className="form-select"
                          onChange={(e) => {
                            onRoleChange(e.target.value);
                          }}
                          title="System role"
                        >
                          <option className="text-black font-semibold " disabled>--Select Role--
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
                      <h5 className="font-weight-bold">
                        User privilages and permissions
                      </h5>
                    </div>

                    <div className="row mt-5">
                      {privileges.map((priv, index) => (
                        <div className="col-4">
                          <div className="checkbox" key={priv.id}>
                            <input
                              checked={priveledgeNames.includes(priv.name)}
                              type="checkbox"
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
                        <button type="submit" className="btn btn-primary w-100">
                          <i className="mdi mdi-account-plus-outline me-1"></i>
                          Register Admin
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
      {/* <!-- End Page-content --> */}
      {/* 
<!-- Transaction Modal --> */}


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

export default AddAdmin;
