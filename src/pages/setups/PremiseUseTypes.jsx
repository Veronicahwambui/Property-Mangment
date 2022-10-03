/* global $ */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import ReactPaginate from "react-paginate";

function PremiseUseTypes() {
  const [lists, setLists] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [createNames, setCreateNames] = useState("");
  const [updateNames, setUpdateNames] = useState("");
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  // PAGINATION
  const sortSize = (e) => {
    setPage(0);
    setItemOffset(0);
    setSize(parseInt(e.target.value));
  };
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [premiseUseTypes, setPremiseUseTypes] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setPremiseUseTypes(lists.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(lists.length / size));
  }, [itemOffset, size, lists]);

  const handlePageClicks = (event) => {
    const newOffset = (event.selected * size) % lists.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // fetch list function
  const fetchAll = () => {
    requestsServiceService.allPremiseUseTypes().then((res) => {
      setLists(res.data.data);
    });
  };

  // create function
  const createPremise = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: 0,
      name: createNames,
    });

    requestsServiceService
      .createPremiseUseTypes(data)
      .then((res) => {
        fetchAll();
        $("#add-new-premise").modal("hide");

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
        $("#add-new-premise").modal("hide");

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

  // toggle function
  const toggleStatus = () => {
    requestsServiceService
      .tooglePremiseUse(activeId)
      .then((res) => {
        fetchAll();
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

  const clear = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };

  // update function
  const UpdatePremise = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: activeId,
      name: updateNames,
    });
    requestsServiceService
      .updatePremiseUseType(data)
      .then((res) => {
        fetchAll();
        $("#update-premise").modal("hide");

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
        $("#update-premise").modal("hide");

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

  

  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Registered  Property Use Type</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to='/'>Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">
                      Set Ups
                    </li>
                    <li class="breadcrumb-item active">Registered  Property Use Types</li>
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
                        Property Use Type Register
                      </h4>
                    </div>
                    <div class="d-flex">
                      <button
                        onClick={() => { setCreateNames(''); fetchAll() }}
                        type="button"
                        class="btn btn-primary waves-effect btn-label waves-light me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-premise"
                      >
                        <i class="mdi mdi-plus label-icon"></i> Add Property Use Type
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  {error.color !== "" &&
                    <div className={"alert alert-" + error.color} role="alert">
                      {error.message}
                    </div>
                  }
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                        <tr class="text-uppercase table-dark">
                          <th>#</th>
                          <th>Property Use Type</th>
                          <th>Status</th>
                          <th>Date Created</th>

                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {premiseUseTypes &&
                          premiseUseTypes?.map((val, index) => {
                            return (
                              <tr data-id="1" key={val.id}>
                                <td style={{ width: "80px" }}>{index + 1}</td>
                                <td
                                  data-field="unit-num "
                                  className="text-capitalize"
                                >
                                  {val.name}
                                </td>
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

                                <td class="text-right cell-change text-nowrap ">
                                  <div class="d-flex align-items-center">
                                    <a
                                      onClick={() => {
                                        setActiveId(val.id);
                                        setUpdateNames(val.name);
                                      }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#update-premise"
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
                                        class="btn btn-success btn-sm btn-rounded text-uppercase px-3 py-0 mx-3"
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
                              onPageChange={(data) => handlePageClicks(data)}
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

      {/* create modal */}
      <div
        class="modal fade"
        id="add-new-premise"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">

          <div class="modal-content">
<form 
 onSubmit={(e) =>{
  e.preventDefault();
              createPremise();
            
}} >
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                New  Property Use Type
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
                          Premise Use Type <strong class="text-danger">*</strong>
                        </label>
                        <input required
                          value={createNames}
                          onChange={(e) => setCreateNames(e.target.value)}
                          type="text"
                          class="form-control"
                          placeholder="Enter create name"
                        
                        />
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
      {/* edit modal  */}
      <div
        class="modal fade"
        id="update-premise"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <form onSubmit={(e) => { e.preventDefault(); UpdatePremise () }}>

              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Update  Premise Use Type
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
                      <label for="">Property Use Type <strong class="text-danger">*</strong></label>
                      <input required value={updateNames} onChange={(e) => setUpdateNames(e.target.value)} type="text" class="form-control" placeholder="Enter update name" />
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
                ></button>

                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Update Premise Use Type
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
                          Premise Use Type <strong class="text-danger">*</strong>
                        </label>
                        <input
                          required
                          value={updateNames}
                          onChange={(e) => setUpdateNames(e.target.value)}
                          type="text"
                          class="form-control"
                          placeholder="Enter update name"
                        />
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
                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </div>

              </div>
            </form>
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
                  <h5>Deactivate this  property use type?</h5>
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
                  onClick={() => toggleStatus()}
                >
                  Yes
                </button>
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
                    <h5>Activate this  property use type?</h5>
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
                    onClick={() => toggleStatus()}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default PremiseUseTypes;
