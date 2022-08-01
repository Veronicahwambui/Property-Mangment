import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import AuthService from "../../services/auth.service";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Issues() {
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
    setTimeout(() => {
      showModal();
    }, 1500);
  };

  const addIssueState = (e) => {
    e.preventDefault();
    setStatus(nextStatus);
    if (nextStatus === resolveStatus) {
      alert("FILLED");
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
    console.log(data);
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
                    <li className="breadcrumb-item active">Issues</li>
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
                                Name of the issue
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={hideModal} centered>
        <form onSubmit={addIssueState}>
          <Modal.Header closeButton>
            <Modal.Title>Add Issue</Modal.Title>
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
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
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
                    <option value="tname1">T 1</option>
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
            {status !== "" && status === resolveStatus && (
              <button
                variant="primary"
                type={"button"}
                className={"btn btn-primary"}
                onClick={finalSubmit}
              >
                Final Submit
              </button>
            )}
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Issues;
