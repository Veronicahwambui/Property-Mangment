/* global $ */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import moment from "moment";
import requestsServiceService from "../../services/requestsService.service";
import ReactPaginate from "react-paginate";

function ClientCounties() {
  const [allCounties, setAllCounties] = useState([]);
  const [clientCounties, setClientCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [activeId, setActiveId] = useState("");
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  useEffect(() => {
    getClientCounties();
    getCounties();
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
    setClientCounties(list?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / size));
  }, [itemOffset, size, list]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * size) % list.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  //   const deactivate

  const deactivate = (id) => {
    requestsServiceService.deactivateCounty(id).then((res) => {
      console.log(res);
      getClientCounties();
    });
  };

  // create client county
  const createCounty = () => {
    const data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      countyId: selectedCounty,
      id: 0,
    });

    requestsServiceService
      .createCounty(data)
      .then((res) => {
        getClientCounties();

        $("#add-new-zone").modal("hide");

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
        $("#add-new-zone").modal("hide");

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

  // get client counties
  const getClientCounties = () => {
    requestsServiceService.getClientCounties().then((res) => {
      setlist(res.data.data);
    });
  };
  //  get all counties
  const getCounties = () => {
    requestsServiceService.getAllCounties().then((res) => {
      setAllCounties(res.data.data);
    });
  };
  //  console.log(selectedCounty);

  //   create my own counties array

  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Registered Counties</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">Set Ups</li>
                    <li class="breadcrumb-item active">Registered Counties</li>
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
                        County Register
                      </h4>
                    </div>
                    <div class="d-flex">
                      <button
                        onClick={() => {
                          allCounties && setSelectedCounty(allCounties[0].id);
                        }}
                        type="button"
                        class="btn btn-primary waves-effect btn-label waves-light me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-zone"
                      >
                        <i class="mdi mdi-plus label-icon"></i> Add a county
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
                          <th>County</th>
                          <th>Status</th>
                          <th>Date Created</th>
                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientCounties &&
                          clientCounties?.map((cou, index) => {
                            let county = cou.county;
                            return (
                              <tr data-id="1" key={county.id}>
                                <td style={{ width: "80px" }}>{index + 1}</td>
                                <td data-field="unit-num ">{county.name}</td>
                                <td data-field="unit-num ">
                                  {cou.active ? (
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
                                  {moment(cou.dateTimeCreated).format(
                                    "YYYY-MM-DD HH:mm"
                                  )}
                                </td>

                                <td class=" align-items-center text-right cell-change text-nowrap ">
                                  {cou.active ? (
                                    <button
                                      class="btn btn-danger btn-sm btn-rounded  text-uppercase px-2 mx-3"
                                      title="deactivate"
                                      data-bs-toggle="modal"
                                      data-bs-target="#confirm-deactivate"
                                      onClick={() => setActiveId(county.id)}
                                    >
                                      Deactivate
                                    </button>
                                  ) : (
                                    <button
                                      class="btn btn-success btn-sm btn-rounded w-5 text-uppercase px-3 mx-3"
                                      title="deactivate"
                                      data-bs-toggle="modal"
                                      data-bs-target="#confirm-activate"
                                      onClick={() => setActiveId(county.id)}
                                    >
                                      Activate
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}

                        <tr class="cloneCharges d-none">
                          <td style={{ width: "80px" }} class="categoryIndex ">
                            #
                          </td>
                          <td>
                            <input
                              type="text "
                              class="form-control "
                              placeholder="estate Name"
                            />
                          </td>

                          <td>
                            <select
                              class="form-select"
                              style={{ width: "130px" }}
                            >
                              <option value="">Nairobi</option>
                              <option value="">Mombasa</option>
                              <option value="">Nakuru</option>
                            </select>
                          </td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>

                          <td class="text-right cell-change d-flex align-items-center justify-content-end">
                            <button
                              class="btn btn-primary btn-sm text-uppercase px-3 save-new-btn mx-3 "
                              title="save "
                            >
                              Add
                            </button>
                            <a
                              class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent cancel-new-category "
                              title="Cancel "
                            >
                              <i class="bx bx-x "></i>
                            </a>
                          </td>
                        </tr>
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

      {/* <!-- modals --> */}
      <div
        class="modal fade"
        id="add-new-zone"
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
                createCounty();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  New County
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
                    <label for="">County</label>
                    <select
                      class="form-control"
                      data-live-search="true"
                      title="Select county where the zone is"
                      onChange={(e) => setSelectedCounty(e.target.value)}
                    >
                      {allCounties &&
                        allCounties.map((county) => {
                          return (
                            <option key={county.id} value={county.id}>
                              {county.name}
                            </option>
                          );
                        })}
                    </select>
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
                  Save
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
                <h5>Deactivate this county?</h5>
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
                onClick={() => deactivate(activeId)}
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
                <h5>Activate this county?</h5>
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
                onClick={() => deactivate(activeId)}
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

export default ClientCounties;
