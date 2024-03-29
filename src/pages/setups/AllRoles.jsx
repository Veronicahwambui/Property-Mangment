/* global $ */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import requestsServiceService from "../../services/requestsService.service";
import ReactPaginate from "react-paginate";
function AllRoles() {
  const [allRoles, setAllRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [oneRole, setOneRole] = useState([]);
  const [editName, setEditName] = useState("");
  const [privileges, setPrivileges] = useState([]);
  const [roleAdd, setRoleAdd] = useState(true);
  const [priveledgeNames, setPrivilegeNames] = useState([]);
  const [rolePriveledges, setRolePriveledges] = useState([]);
  const [editPriveledges, setEditPriveledges] = useState([]);
  const [roleID, setRoleID] = useState("");
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  useEffect(() => {
    getAllRoles();
    getAllPreviledges();
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
    setAllRoles(list?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / size));
  }, [itemOffset, size, list]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * size) % list.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  useEffect(() => {
    getAllRoles();
    //    getAllPreviledges()
  }, [roleAdd]);

  // get all priveledges
  const getAllPreviledges = () => {
    requestsServiceService
      .getAllPreviledges()
      .then((res) => {
        // console.log(res.data.data);
        setPrivileges(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    getOneRole(id);

    setRoleID(id);
  };

  // add a new role
  const AddARole = () => {
    const data = JSON.stringify({
      id: null,
      name: roleName,
      permissions: priveledgeNames,
    });

    requestsServiceService
      .AddRole(data)
      .then((res) => {
        setPrivilegeNames([]);
        getAllRoles();

        $("#add-new-role").modal("hide");
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
        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          clear();
        }, 3000);
      });

    setRoleAdd(!roleAdd);
    setPrivilegeNames([]);
    setRoleName("");
  };

  const clear = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };

  // fetch one role
  const getOneRole = (iD) => {
    requestsServiceService
      .getOneRole(iD)
      .then((res) => {
        setOneRole(res.data.data);
        setRolePriveledges(res.data.data.permissions);
        setEditPriveledges(res.data.data.permissions);
        setEditName(res.data.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   get all roles

  const getAllRoles = () => {
    requestsServiceService
      .getAllRoles()
      .then((res) => {
        setlist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  edit a role
  const editARole = () => {
    const data = JSON.stringify({
      id: roleID,
      name: editName,
      permissions: editPriveledges,
    });
    requestsServiceService
      .EditRole(data)
      .then((res) => {
        getAllRoles();
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
  const handleRoleChange = (index, event) => {
    const { checked, value } = event.target;

    if (checked) {
      setPrivilegeNames([...priveledgeNames, privileges[index].name]);
    } else {
      setPrivilegeNames(
        priveledgeNames.filter(
          (priveledgeName) => priveledgeName !== privileges[index].name
        )
      );
    }
  };

  const handleEditRole = (index, event) => {
    const { checked, value } = event.target;

    if (checked) {
      setEditPriveledges([...editPriveledges, privileges[index].name]);
    } else {
      setEditPriveledges(
        editPriveledges.filter(
          (priveledgeName) => priveledgeName !== privileges[index].name
        )
      );
    }
  };

  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Roles and Permissions</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">Set Ups</li>
                    <li class="breadcrumb-item active">Registered Zones</li>
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
                    <div class="d-flex align-items-center flex-grow-1">
                      <h4 class="mb-0  bg-transparent  p-0 m-0">
                        Permissions Register
                      </h4>
                    </div>
                    <div class="d-flex">
                      <button
                        type="button"
                        class="btn btn-primary waves-effect btn-label waves-light me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-role"
                      >
                        <i class="mdi mdi-plus label-icon"></i> Add A role
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  {error.color !== "" && (
                    <div className={"alert alert-" + error.color} role="alert">
                      {error.message}
                    </div>
                  )}
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                        <tr class="text-uppercase table-dark">
                          <th>#</th>
                          <th>Role Name</th>
                          <th>Status</th>
                          <th>Date Created</th>
                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allRoles &&
                          allRoles?.map((role, index) => (
                            <tr data-id={index} key={index}>
                              <td style={{ width: "80px" }}>{index + 1}</td>
                              <td data-field="estate">{role.name}</td>
                              <td data-field="unit-num ">
                                <span class="badge-soft-success badge">
                                  Active
                                </span>
                              </td>
                              <td>
                                {moment(role.dateTimeCreated).format(
                                  "YYYY-MM-DD HH:mm"
                                )}
                              </td>

                              <td class="text-right">
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
                                    <p
                                      onClick={() => getOneRole(role.id)}
                                      class="dropdown-item"
                                      data-bs-toggle="modal"
                                      data-bs-target="#role-permissions"
                                      href="#"
                                    >
                                      <i class="font-size-15 mdi mdi-eye-outline me-3"></i>
                                      View Permissions
                                    </p>
                                    <p
                                      onClick={() => handleEdit(role.id)}
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-role"
                                      class="dropdown-item"
                                      href="#"
                                    >
                                      <i class="font-size-15 mdi mdi-pencil me-3"></i>
                                      Edit
                                    </p>
                                    {/* <a class="dropdown-item text-danger" href="#"><i class="font-size-15 mdi mdi-close-circle me-3"></i>Deactivate</a> */}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
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
          {/* <!-- end row --> */}
        </div>
        {/* <!-- container-fluid --> */}
      </div>
      {/* <!-- End Page-content --> */}

      {/* <!-- modals --> */}

      {/* <!-- Roles permission Modal --> */}
      {/* <!-- modals --> */}
      <div
        class="modal fade"
        id="role-permissions"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Role Permissions
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {rolePriveledges.length !== 0 && (
              <div class="modal-body">
                <h6 class="text-info font-14px mb-2">
                  {oneRole.name !== undefined && oneRole.name}
                </h6>
                <div class="plan-features">
                  <div className="row">
                    {rolePriveledges &&
                      rolePriveledges.map((prive) => (
                        <div className="col-4">
                          <p key={prive}>
                            <i class="bx bx-check text-primary"></i>{" "}
                            {prive.toLowerCase().replace(/_/g, "  ")}{" "}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            <div class="modal-footer">
              <button
                onClick={() => setRolePriveledges([])}
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- adding roles modal --> */}
      <div
        class="modal fade"
        id="add-new-role"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                AddARole();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  New Role
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
                    <div class="form-group mb-4">
                      <label for="">
                        Role Name <strong class="text-danger">*</strong>
                      </label>
                      <input
                        type="text"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        class="form-control"
                        placeholder="Enter the role Name"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-12 text-capitalize">
                    <div class="form-group mb-0">
                      <h6 class="font-16px text-info">
                        Select permissions Specific to the role{" "}
                        <strong class="text-danger">*</strong>
                      </h6>
                    </div>
                  </div>
                  <div class="col-12 text-capitalize">
                    <div class="row">
                      {privileges &&
                        privileges.map((priv, index) => (
                          <div class="col-4" key={priv.id}>
                            <div class="form-check mb-3">
                              <input
                                class="form-check-input"
                                onChange={(event) =>
                                  handleRoleChange(index, event)
                                }
                                type="checkbox"
                                id="formCheck1"
                              />
                              <label class="form-check-label" for="formCheck1">
                                {priv.name.toLowerCase().replace(/_/g, " ")}
                              </label>
                            </div>
                          </div>
                        ))}
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
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modavxbxcvd"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- editing roles modal --> */}

      <div
        class="modal fade"
        id="edit-role"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editARole();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Edit Role
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
                    <div class="form-group mb-4">
                      <label for="">
                        Role Name <strong class="text-danger">*</strong>
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        class="form-control"
                        placeholder="Enter the role Name"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-12 text-capitalize">
                    <div class="form-group mb-0">
                      <h6 class="font-16px text-info">
                        Edit permissions Specific to the role{" "}
                        <strong class="text-danger">*</strong>
                      </h6>
                    </div>
                  </div>
                  <div class="col-12 text-capitalize">
                    <div class="row">
                      {privileges &&
                        privileges.map((priv, index) => (
                          <div className="col-4">
                            <div className="checkbox" key={priv.id}>
                              <input
                                checked={editPriveledges.includes(priv.name)}
                                type="checkbox"
                                id={index}
                                onChange={(event) =>
                                  handleEditRole(index, event)
                                }
                              />
                              <label
                                className="checkbox__label"
                                htmlFor={index}
                              >
                                {priv.name.toLowerCase().replace(/_/g, " ")}
                              </label>
                            </div>
                          </div>
                        ))}
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
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- modals end --> */}
      {/* <!-- modals end --> */}
    </>
  );
}

export default AllRoles;
