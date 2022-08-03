import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function IssuesTypes() {
  const [issueTypes, setIssueTypes] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    getIssueTypes();
  }, []);

  const getIssueTypes = () => {
    requestsServiceService.getTenancyIssuesTypes().then((res) => {
      setIssueTypes(res.data.data);
    });
  };

  const deactivate = (x) => {
    requestsServiceService.toggleIssueType(x).then((res) => {
      if (res.data.status === true) {
        getIssueTypes();
      }
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
                <h4 class="mb-sm-0 font-size-18">Issue Types</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">Set Ups</li>
                    <li class="breadcrumb-item active">Issue Types</li>
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
                        {/*Issue Types Register*/}
                      </h4>
                    </div>
                    <div class="d-flex">
                      <Link to="/create-issue-type">
                        <button
                          type="button"
                          className="btn btn-primary waves-effect btn-label waves-light me-3"
                        >
                          <i className="mdi mdi-plus label-icon"></i> Add Issue
                          Type
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                        <tr class="text-uppercase table-light">
                          <th>#</th>
                          <th>Name</th>
                          <th>Initial Status</th>
                          <th>Resolved Status</th>
                          <th>Status</th>
                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {issueTypes?.map((iT, index) => {
                          return (
                            <tr data-id="1" key={index}>
                              <td style={{ width: "80px" }}>{index + 1}</td>
                              <td data-field="unit-num ">{iT.name}</td>
                              <td data-field="unit-num ">{iT.initialStatus}</td>
                              <td data-field="unit-num ">{iT.resolveStatus}</td>
                              <td data-field="unit-num ">
                                {iT.active ? (
                                  <span class="badge-soft-success badge">
                                    Active
                                  </span>
                                ) : (
                                  <span class="badge-soft-danger badge">
                                    Inactive
                                  </span>
                                )}
                              </td>
                              <td class="text-right cell-change text-nowrap ">
                                <div className="d-flex align-items-center">
                                  <Link
                                    to={`/issuestypes/${iT.id}`}
                                    state={{ issueType: iT }}
                                    className="btn btn-light btn-sm btn-rounded waves-effect btn-circle btn-transparent edit "
                                    title="Edit "
                                  >
                                    <i className="bx bx-show-alt "></i>
                                  </Link>
                                  {iT.active ? (
                                    <button
                                      class="btn btn-danger btn-sm btn-rounded text-uppercase px-2 mx-3"
                                      title="deactivate"
                                      data-bs-toggle="modal"
                                      data-bs-target="#confirm-deactivate"
                                      onClick={() => setActiveId(iT.id)}
                                    >
                                      Deactivate
                                    </button>
                                  ) : (
                                    <button
                                      class="btn btn-success btn-sm btn-rounded w-5 text-uppercase px-3 mx-3"
                                      title="deactivate"
                                      data-bs-toggle="modal"
                                      data-bs-target="#confirm-activate"
                                      onClick={() => setActiveId(iT.id)}
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

      {/*MODALS*/}
      {/*deactivate activate modals*/}
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
                <h5>Deactivate this Issue Type ?</h5>
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
                <h5>Activate this Issue Type?</h5>
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

export default IssuesTypes;
