import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import AuthService from "../../services/auth.service";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import requestsServiceService from "../../services/requestsService.service";

function IssueTypes() {
  const [initialStatus, setInitialStatus] = useState("");
  const [name, setName] = useState("");
  const [resolveStatus, setResolveStatus] = useState("");
  const [issueTypeStateDTOS, setissueTypeStateDTOS] = useState([]);
  const [status, setStatus] = useState("");
  const [daysToNextStep, setdaysToNextStep] = useState("");
  const [nextStatus, setNextStatus] = useState("");
  const [premiseUnitTypeChargeId, setpremiseUnitTypeChargeId] = useState("");
  const [templateName, setTemplateName] = useState("");

  const [isChecked, setIsChecked] = useState(true);
  const [filled, setFilled] = useState(false);

  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const submit = (e) => {
    e.preventDefault();
    setFilled(true);
    showModal();
  };
  const [complete, setComplete] = useState(false);
  const addIssueState = (e) => {
    e.preventDefault();
    setStatus(nextStatus);
    if (nextStatus === resolveStatus) {
      setComplete(true);
      hideModal();
    } else {
      let data = {
        active: true,
        chargeable: isChecked,
        clientId: 0,
        daysToNextStep: daysToNextStep,
        id: 0,
        nextStatus: nextStatus,
        premiseUnitTypeChargeId: premiseUnitTypeChargeId,
        status: status,
        templateName: templateName,
      };
      issueTypeStateDTOS.push(data);
    }
  };
  const [error, setError] = useState({
    message: "",
    color: ""
  });
  const finalSubmit = () => {
    let data = {
      active: true,
      clientId: AuthService.getClientId(),
      id: 0,
      initialStatus: initialStatus,
      issueTypeStateDTOS: issueTypeStateDTOS,
      name: name,
      resolveStatus: resolveStatus,
    };
    requestsServiceService.createTenancyIssuesTypes(data).then((res) => {
      let message = res.data.message;
      if (res.data.status===false) {
        setError({
          ...error,
          message: message,
          color: "danger"
        })
      } else {
        setError({
          ...error,
          message: message,
          color: "success"
        });
      }
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: ""
        });
      }, 2000)
    }).catch((err)=> {
      setError({
        ...error,
        message: err.data.message,
        color: "success"
      });
    })
  };
  useEffect(() => {}, [issueTypeStateDTOS, status]);

  return (
    <>
      <div className="page-content">
        <div className="content-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Issues</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li className="breadcrumb-item">Set Ups</li>
                    <li className="breadcrumb-item active">Issue types</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <div className="d-flex align-items-center flex-grow-1"></div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-12">
                    <div>
                      <form onSubmit={submit}>
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <label
                              htmlFor="initial status"
                              className="form-label"
                            >
                              Initial Status{" "}
                              <strong className="text-danger">*</strong>
                            </label>
                            <div className="form-group mb-4">
                              <input
                                type="text"
                                className={"form-control"}
                                name="initialstatus"
                                onChange={(e) => {
                                  setInitialStatus(e.target.value);
                                  setStatus(e.target.value);
                                }}
                              />
                              <Alert variant={"warning"}>
                                Initial status. Must be first status
                              </Alert>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="initial status"
                              className="form-label"
                            >
                              Name <strong className="text-danger">*</strong>
                            </label>
                            <div className="form-group mb-4">
                              <input
                                type="text"
                                className={"form-control"}
                                onChange={(e) => setName(e.target.value)}
                              />
                              <Alert variant={"warning"}>
                                Name of the issue type
                              </Alert>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="initial status"
                              className="form-label"
                            >
                              Resolve status{" "}
                              <strong className="text-danger">*</strong>
                            </label>
                            <div className="form-group mb-4">
                              <input
                                type="text"
                                className={"form-control"}
                                onChange={(e) =>
                                  setResolveStatus(e.target.value)
                                }
                              />
                              <Alert variant={"warning"}>
                                Status to show when the issue is resolved.Must
                                be the final status
                              </Alert>
                            </div>
                          </div>
                        </div>
                        <button type={"submit"}>Add</button>
                      </form>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="table-responsive table-responsive-md">
                      <table className="table table-editable-1 align-middle table-edits">
                        <thead className="table-light">
                          <tr className="text-uppercase table-light">
                            <th>#</th>
                            <th>Days 2 Next</th>
                            <th>Status</th>
                            <th>Next Status</th>
                            <th>Template Name</th>
                            <th>State</th>
                          </tr>
                        </thead>
                        <tbody>
                          {issueTypeStateDTOS.length > 0 &&
                            issueTypeStateDTOS.map((item, index) => {
                              return (
                                <tr data-id="1">
                                  <td style={{ width: "80px" }}>{index + 1}</td>
                                  <td>{item.daysToNextStep}</td>
                                  <td>{item.status}</td>
                                  <td>{item.nextStatus}</td>
                                  <td>{item.templateName}</td>
                                  <td data-field="unit-num ">
                                    {item.active ? (
                                      <span className="badge-soft-success badge">
                                        Active
                                      </span>
                                    ) : (
                                      <span className="badge-soft-danger badge">
                                        Inactive
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                        {/*<tfoot>*/}
                        {/*  <tr>*/}
                        {/*    <td colSpan="7" onClick={showModal}>*/}
                        {/*      <span className="d-flex align-items-center ">*/}
                        {/*        <i className="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>*/}
                        {/*        <span className="pl-5 ">Add A State</span>*/}
                        {/*      </span>*/}
                        {/*    </td>*/}
                        {/*  </tr>*/}
                        {/*</tfoot>*/}
                      </table>
                      {error.color !== "" &&
                          <div className={"alert alert-" + error.color} role="alert">
                            {error.message}
                          </div>
                      }
                      <div className={"text-end"}>
                        {" "}
                        {status !== "" && status === resolveStatus && (
                          <button
                            variant="primary"
                            type={"button"}
                            className={"btn btn-primary"}
                            onClick={finalSubmit}
                          >
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={hideModal} centered>
        <form onSubmit={addIssueState}>
          <Modal.Header closeButton>
            <Modal.Title>Add Issue Type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="form-group mb-4">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleOnChange}
                  />{" "}
                  Chargeable
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Charges</label> <br />
                  <select
                    id=""
                    onChange={(e) => {
                      setpremiseUnitTypeChargeId(e.target.value);
                    }}
                  >
                    <option value="CHARGE 1">CHARGE 1</option>
                    <option value="CHARGE 2">CHARGE 2</option>
                    <option value="CHARGE 3">CHARGE 3</option>
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Status</label>
                  <input
                    type="text"
                    className={"form-control"}
                    value={status}
                    disabled
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Next Status</label>
                  <input
                    type="text"
                    className={"form-control"}
                    value={nextStatus}
                    onChange={(e) => setNextStatus(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  {" "}
                  <label htmlFor="">Days to next step</label>
                  <input
                    type="number"
                    value={daysToNextStep}
                    className={"form-control"}
                    onChange={(e) => setdaysToNextStep(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Template Name</label>
                  <br />
                  <select
                    name="templateName"
                    id=""
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  >
                    <option value="template_name_1">T 1</option>
                    <option value="tname2">T 2</option>
                    <option value="tname3">T 3</option>
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={"btn btn-grey"}
              onClick={hideModal}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={"btn btn-primary"}
              type={"submit"}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default IssueTypes;
