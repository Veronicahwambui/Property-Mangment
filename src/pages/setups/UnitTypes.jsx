/* global $ */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import Zones from "./Zones";
import moment from "moment";
import ReactPaginate from "react-paginate";

function UnitTypes() {
  const [listUnit, setListUnit] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [createNam, setCreateNam] = useState("");
  const [updateNam, setUpdateNam] = useState("");
  const [chargeTypes, setChargeTypes] = useState([]);
  const [selectedChargeTypes, setSelectedChargeTypes] = useState([]);
  const [chargeType, setChargeType] = useState("");
  const [createArr, setCreateArr] = useState();
  const [updateArr, setUpdateArr] = useState([]);
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [purpose, setPurpose] = useState("");
  const [squarage, setSquarage] = useState("");
  const [monthCountForTenancyRenewal, setMonthCountForTenancyRenewal] =
    useState("");

  useEffect(() => {
    localStorage.setItem("activeId", activeId);
  }, [activeId]);

  useEffect(() => {
    fetchTypes();
    fetchAllUnit();
    let oldId = localStorage.getItem("activeId");
    setActiveId(oldId);
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
  const [unitTypes, setUnitTypes] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setUnitTypes(listUnit.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listUnit.length / size));
  }, [itemOffset, size, listUnit]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * size) % listUnit.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  // fetch list function
  const fetchAllUnit = () => {
    requestsServiceService.allUnitTypes().then((res) => {
      setListUnit(res.data.data);
    });
  };

  const fetchTypes = () => {
    requestsServiceService.allApplicableCharges().then((res) => {
      setChargeTypes(res.data.data);
    });
  };

  // create function
  const createUnit = () => {
    let data = JSON.stringify({
      active: true,
      clientId: parseInt(authService.getClientId()),
      id: null,
      monthCountForTenancyRenewal: monthCountForTenancyRenewal,
      name: createNam,
      numberOfRooms: numberOfRooms,
      purpose: purpose,
      squarage: squarage,
      unitTypeApplicableCharges: selectedChargeTypes,
    });

    requestsServiceService
      .createUnitTypes(data)
      .then((res) => {
        fetchAllUnit();
        $("#add-new-unit").modal("hide");

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
        $("#add-new-unit").modal("hide");

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

  const clear = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };

  // toggle function
  const toggleStat = () => {
    requestsServiceService.toogleUnitType(activeId).then((res) => {
      fetchAllUnit();
    });
  };

  // update function
  const UpdateUnit = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: activeId,
      monthCountForTenancyRenewal: monthCountForTenancyRenewal,
      name: updateNam,
      numberOfRooms: numberOfRooms,
      purpose: purpose,
      squarage: squarage,
      unitTypeApplicableCharges: selectedChargeTypes,
    });
    requestsServiceService
      .updateUnitType(data)
      .then((res) => {
        $("#update-unit").modal("hide");

        fetchAllUnit();

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
        $("#update-unit").modal("hide");

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

  const setChargeTypes1 = (el) => {
    let options = el.target.options;
    let userGroups = [];

    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        console.log("option ++ " + options[i].value);
        userGroups.push(parseInt(options[i].value));
      }
    }

    setSelectedChargeTypes(userGroups);
  };

  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Registered unit types </h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">Set Ups</li>
                    <li class="breadcrumb-item active">Unit types</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div className="card-body">
                  {error.color !== "" && (
                    <div className={"alert alert-" + error.color} role="alert">
                      {error.message}
                    </div>
                  )}
                  <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                    <div
                      class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                      role="toolbar"
                    >
                      <div class="d-flex align-items-center flex-grow-1">
                        <h4 class="mb-0  bg-transparent  p-0 m-0">
                          Unit Types
                        </h4>
                      </div>
                      <div class="d-flex">
                        <button
                          onClick={() => {
                            setMonthCountForTenancyRenewal("");
                            setPurpose("");
                            setNumberOfRooms("");
                            setSquarage("");
                          }}
                          type="button"
                          class="btn btn-primary waves-effect btn-label waves-light me-3"
                          data-bs-toggle="modal"
                          data-bs-target="#add-new-zone"
                        >
                          <i class="mdi mdi-plus label-icon"></i> Add Unit Type
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive table-responsive-md">
                      <table class="table table-editable align-middle table-edits">
                        <thead class="table-light">
                          <tr class="text-uppercase table-dark">
                            <th>#</th>
                            <th>Unit Type</th>
                            <th>purpose</th>
                            <th>no of rooms</th>
                            <th>unit size</th>
                            <th>months to renewal</th>
                            <th>Status</th>
                            <th>Date Created</th>

                            <th class="text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unitTypes &&
                            unitTypes?.map((val, index) => {
                              return (
                                <tr data-id="1" key={index}>
                                  <td style={{ width: "80px" }}>{index + 1}</td>
                                  <td
                                    data-field="unit-num "
                                    className="text-capitalize"
                                  >
                                    {val.name}
                                  </td>
                                  <td className="text-capitalize">
                                    {val.purpose}
                                  </td>
                                  <td>{val.numberOfRooms} rooms</td>
                                  <td>
                                    {val.squarage} M <sup>2</sup>
                                  </td>
                                  <td>{val.monthCountForTenancyRenewal}</td>
                                  <td data-field="unit-num ">
                                    {val.active ? (
                                      <span class="badge-soft-success badge">
                                        Active
                                      </span>
                                    ) : (
                                      <span class="badge-soft-danger badge">
                                        Inactive
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    {moment(val.dateTimeCreated).format(
                                      "YYYY-MM-DD HH:mm"
                                    )}
                                  </td>

                                  <td class="text-center cell-change text-nowrap ">
                                    <div class="d-flex align-items-center justify-content-between">
                                      <a
                                        onClick={() => {
                                          setActiveId(val.id);
                                          setUpdateNam(val.name);
                                          setMonthCountForTenancyRenewal(
                                            val.monthCountForTenancyRenewal
                                          );
                                          setPurpose(val.purpose);
                                          setNumberOfRooms(val.numberOfRooms);
                                          setSquarage(val.squarage);
                                        }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#update-unit"
                                        class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                                        title="Edit "
                                      >
                                        <i class="bx bx-edit-alt "></i>
                                      </a>

                                      {val.active ? (
                                        <button
                                          class="btn btn-danger btn-sm btn-rounded text-uppercase px-2 mx-3"
                                          title="deactivate"
                                          data-bs-toggle="modal"
                                          data-bs-target="#confirm-deactivate"
                                          onClick={() => setActiveId(val.id)}
                                        >
                                          Deactivate
                                        </button>
                                      ) : (
                                        <button
                                          class="btn btn-success btn-sm  btn-rounded text-uppercase px-3 py-0 mx-3"
                                          title="deactivate"
                                          data-bs-toggle="modal"
                                          data-bs-target="#confirm-activate"
                                          onClick={() => setActiveId(val.id)}
                                        >
                                          Activate
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
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
                          <span className="text-primary">
                            {" "}
                            {pageCount}
                          </span>{" "}
                          pages
                        </p>
                      )}
                    </div>
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

      {/* <!-- modals --> */}

      {/* create modal */}
      <div
        class="modal fade"
        id="add-new-unit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createUnit();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  New Unit Type
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
                        Unit Type Name <strong class="text-danger">*</strong>
                      </label>
                      <input
                        required
                        value={createNam}
                        onChange={(e) => setCreateNam(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Enter unit type name"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="">
                      Charge Type <strong class="text-danger">*</strong>{" "}
                    </label>
                    <select
                      class=" form-control"
                      multiple
                      onChange={(e) => setChargeTypes1(e)}
                    >
                      {chargeTypes &&
                        chargeTypes
                          .sort((a, b) => a.name.localeCompare(b.name))
                          ?.map((charge, index) => {
                            return (
                              <option
                                key={index}
                                value={charge.id}
                                selected={selectedChargeTypes.includes(
                                  charge.name
                                )}
                              >
                                {charge.name}
                              </option>
                            );
                          })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="">
                      Purpose <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={purpose}
                      className="form-control"
                      onChange={(event) => setPurpose(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      Number of Rooms <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={numberOfRooms}
                      className="form-control"
                      onChange={(event) => setNumberOfRooms(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      unit size in M<sup>2</sup>{" "}
                      <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={squarage}
                      className="form-control"
                      onChange={(event) => setSquarage(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="">
                      Months to renewal <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={monthCountForTenancyRenewal}
                      className="form-control"
                      onChange={(event) =>
                        setMonthCountForTenancyRenewal(event.target.value)
                      }
                    />
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
                <button type="submit" class="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* update modal  */}
      <div
        class="modal fade"
        id="update-unit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                UpdateUnit();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Update Unit Type
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
                        {" "}
                        Unit Type Name <strong class="text-danger">*</strong>
                      </label>
                      <input
                        required
                        value={updateNam}
                        onChange={(e) => setUpdateNam(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Enter update name"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="">
                      Charge Type <strong class="text-danger">*</strong>{" "}
                    </label>
                    <select
                      class="form-control"
                      data-live-search="true"
                      title="Select Applicable Charge Type"
                      multiple
                      onChange={(e) => setChargeTypes1(e)}
                    >
                      {chargeTypes &&
                        chargeTypes.map((charge, index) => {
                          return (
                            <option
                              key={index}
                              value={charge.id}
                              selected={selectedChargeTypes.includes(
                                charge.name
                              )}
                              className="text-capitalize"
                            >
                              {charge.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="">
                      Purpose <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={purpose}
                      className="form-control"
                      onChange={(event) => setPurpose(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      Number of Rooms <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={numberOfRooms}
                      className="form-control"
                      onChange={(event) => setNumberOfRooms(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      unit size in M<sup>2</sup>{" "}
                      <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={squarage}
                      className="form-control"
                      onChange={(event) => setSquarage(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="">
                      Months to renewal <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={monthCountForTenancyRenewal}
                      className="form-control"
                      onChange={(event) =>
                        setMonthCountForTenancyRenewal(event.target.value)
                      }
                    />
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
                <button type="submit" class="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* confirm deactivate  */}
      <div
        class="modal fade"
        id="confirm-deactivate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <center>
                <h5>Deactivate this Unit type?</h5>
              </center>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => toggleStat()}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* confirm dactivate  */}
      <div
        class="modal fade"
        id="confirm-activate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <center>
                <h5>Activate this Unit type?</h5>
              </center>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => toggleStat()}
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

export default UnitTypes;
