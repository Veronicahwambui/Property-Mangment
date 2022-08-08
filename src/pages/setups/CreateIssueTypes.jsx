import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import AuthService from "../../services/auth.service";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import requestsServiceService from "../../services/requestsService.service";

function CreateIssueTypes() {
  const [initialStatus, setInitialStatus] = useState("");
  const [applicableCharges, setApplicableCharges] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState("");
  const [resolveStatus, setResolveStatus] = useState("");
  const [stateActionName, setstateActionName] = useState("");
  const [issueTypeStateDTOS, setissueTypeStateDTOS] = useState([]);
  const [status, setStatus] = useState("");
  const [daysToNextStep, setdaysToNextStep] = useState("");
  const [nextStatus, setNextStatus] = useState("");
  const [applicableChargeId, setapplicableChargeId] = useState("");
  const [templateName, setTemplateName] = useState("");
  const navigate = useNavigate();
  const clientId = AuthService.getClientId();
  useEffect(() => {
    requestsServiceService.allApplicableCharges().then((res) => {
      setApplicableCharges(res.data.data);
    });
    requestsServiceService.getTemplateNames(clientId).then((res) => {
      setTemplates(res.data.data);
    });
  }, []);

  const handleAction = (text) => {
    setstateActionName(text);
  };

  const [isChecked, setIsChecked] = useState(true);

  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const submit = (e) => {
    e.preventDefault();
    showModal();
  };
  const [tempstatus, settempstatus] = useState("");
  const [complete, setComplete] = useState(false);
  const [alert, setAlert] = useState("");
  const addIssueState = (e) => {
    let clientId = AuthService.getClientId();
    e.preventDefault();
    if (status === nextStatus) {
      setAlert("state already added!");
    } else {
      setAlert("");
      if (nextStatus === resolveStatus) {
        setStatus(resolveStatus);
        let data = {
          active: true,
          chargeable: isChecked,
          clientId: clientId,
          daysToNextStep: daysToNextStep,
          id: null,
          nextStatus: "",
          applicableChargeId: applicableChargeId,
          status: resolveStatus.toUpperCase(),
          templateName: templateName,
          stateActionName: stateActionName,
        };
        setissueTypeStateDTOS((issueTypeStateDTOS) => [
          ...issueTypeStateDTOS,
          data,
        ]);
        setComplete(true);
        setNextStatus("");
        hideModal();
      } else {
        if (stateActionName === "DECLINE") {
          let data = {
            active: true,
            chargeable: isChecked,
            clientId: clientId,
            daysToNextStep: daysToNextStep,
            id: null,
            nextStatus: "",
            applicableChargeId: applicableChargeId,
            status: tempstatus.toUpperCase(),
            templateName: templateName,
            stateActionName: stateActionName,
          };
          setissueTypeStateDTOS((issueTypeStateDTOS) => [
            ...issueTypeStateDTOS,
            data,
          ]);
          setstateActionName("");
          setdaysToNextStep("");
          setTemplateName("");
          setNextStatus("");
        } else {
          setStatus(nextStatus);
          let data = {
            active: true,
            chargeable: isChecked,
            clientId: clientId,
            daysToNextStep: daysToNextStep,
            id: null,
            nextStatus: nextStatus.toUpperCase(),
            applicableChargeId: applicableChargeId,
            status: status.toUpperCase(),
            templateName: templateName,
            stateActionName: stateActionName,
          };
          setissueTypeStateDTOS((issueTypeStateDTOS) => [
            ...issueTypeStateDTOS,
            data,
          ]);
          setNextStatus("");
        }
      }
    }
  };
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  const finalSubmit = () => {
    let clientId = AuthService.getClientId();
    let data = {
      active: true,
      clientId: clientId,
      id: null,
      initialStatus: initialStatus,
      issueTypeStateDTOS: issueTypeStateDTOS,
      name: name,
      resolveStatus: resolveStatus,
    };
    requestsServiceService
      .createTenancyIssuesTypes(data)
      .then((res) => {
        let message = res.data.message;
        if (res.data.status === false) {
          setError({
            ...error,
            message: message,
            color: "danger",
          });
        } else {
          setError({
            ...error,
            message: message,
            color: "success",
          });
          setTimeout(() => {
            setError({
              ...error,
              message: "",
              color: "",
            });
            navigate("/issuestypes", { replace: true });
          }, 1000);
        }
      })
      .catch((err) => {
        setError({
          ...error,
          message: err.data.message,
          color: "success",
        });
      });
  };
  useEffect(() => { }, [issueTypeStateDTOS, status, nextStatus]);

  return (
    <>
      <div className="page-content">
        <div className="content-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Issue Types</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li className="breadcrumb-item">Set Ups</li>
                    <li className="breadcrumb-item active">
                      Create Issue types
                    </li>
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
                    <div className="d-flex align-items-center flex-grow-1">
                      <h4 className="mb-0  bg-transparent  p-0 m-0">
                        Add an Issue Type
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="bg-primary border-2 bg-soft p-3 mb-4">
                    <p className="fw-semibold mb-0 pb-0 text-uppercase">
                      Issue Type Details
                    </p>
                  </div>
                  <form onSubmit={submit}>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <label
                              htmlFor="initial status"
                              className="form-label"
                            >
                              Initial Status{" "}
                              <strong className="text-danger">*</strong>
                            </label>
                            <input
                              type="text"
                              className={"form-control"}
                              name="initialstatus"
                              onChange={(e) => {
                                setInitialStatus(e.target.value);
                                setStatus(e.target.value);
                              }}
                              placeholder={"Enter initial status"}
                              required={true}
                              disabled={complete}
                            />
                            <Alert variant={"warning"}>
                              Initial status. Must be first status
                            </Alert>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <label
                              htmlFor="initial status"
                              className="form-label"
                            >
                              Name <strong className="text-danger">*</strong>
                            </label>
                            <input
                              type="text"
                              className={"form-control"}
                              onChange={(e) => setName(e.target.value)}
                              required={true}
                              placeholder={"Enter issue type name"}
                              disabled={complete}
                            />
                            <Alert variant={"warning"}>
                              Name of the issue type
                            </Alert>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <label
                              htmlFor="initial status"
                              className="form-label"
                            >
                              Resolve status{" "}
                              <strong className="text-danger">*</strong>
                            </label>
                            <input
                              type="text"
                              className={"form-control"}
                              onChange={(e) => setResolveStatus(e.target.value)}
                              required={true}
                              placeholder={"Enter resolve status"}
                              disabled={complete}
                            />
                            <Alert variant={"warning"}>
                              Status to show when the issue is resolved. Must be
                              the final status
                            </Alert>
                          </div>
                        </div>
                        <div className="mb-3">
                          {!complete && (
                            <button
                              className={"btn btn-primary float-end"}
                              type={"submit"}
                            >
                              Add Issue Type
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                  {issueTypeStateDTOS.length > 0 && (
                    <div className="col-12">
                      <div className="bg-primary border-2 bg-soft p-3 mb-4">
                        <p className="fw-semibold mb-0 pb-0 text-uppercase">
                          Issue Type States
                        </p>
                      </div>
                      <div className="table-responsive table-responsive-md">
                        <table className="table table-editable-1 align-middle table-edits">
                          <thead className="table-light">
                            <tr className="text-uppercase table-light">
                              <th>#</th>
                              <th>Days 2 Next</th>
                              <th>Status</th>
                              <th>Next Status</th>
                              <th>stateActionName</th>
                              <th>Template Name</th>
                              <th>State</th>
                            </tr>
                          </thead>
                          <tbody>
                            {issueTypeStateDTOS.length > 0 &&
                              issueTypeStateDTOS.map((item, index) => {
                                return (
                                  <tr data-id="1" key={index}>
                                    <td style={{ width: "80px" }}>
                                      {index + 1}
                                    </td>
                                    <td>{item.daysToNextStep}</td>
                                    <td>{item.status}</td>
                                    <td>{item.nextStatus}</td>
                                    <td>{item.stateActionName}</td>
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
                        {error.color !== "" && (
                          <div
                            className={"alert alert-" + error.color}
                            role="alert"
                          >
                            {error.message}
                          </div>
                        )}
                        <div className={"text-end"}>
                          {" "}
                          {status !== "" && status === resolveStatus && (
                            <button
                              type="button"
                              onClick={finalSubmit}
                              className="btn btn-success kev-submit me-3"
                            >
                              Submit{" "}
                              <i className="mdi mdi-check-all me-2 font-16px"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={hideModal} centered>
          <form onSubmit={(e) => addIssueState(e)}>
            <Modal.Header closeButton>
              <Modal.Title>Add State</Modal.Title>
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
                  {isChecked &&
                    <div className="form-group mb-4">
                      <label htmlFor="">Charges</label> <br />
                      {applicableCharges.length > 0 && (
                        <div className="form-group mb-4">
                          <select
                            className="form-control text-capitalize"
                            value={applicableChargeId}
                            onChange={(e) =>
                              setapplicableChargeId(e.target.value)
                            }
                            required={true}
                          >
                            <option value="">select action name</option>

                            {applicableCharges?.map((item, index) => (
                              <option value={item.id} key={index}>
                                {item?.name.toLowerCase()?.replace(/_/g, " ")}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>}
                  <div className="form-group mb-4">
                    <label htmlFor="">
                      {stateActionName === "DECLINE" ? (
                        <>Previous status</>
                      ) : (
                        <>Status</>
                      )}
                    </label>
                    <input
                      type="text"
                      className={"form-control"}
                      value={status}
                      disabled
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">State Action Name</label>
                    <select
                      className="form-control text-capitalize"
                      value={stateActionName}
                      onChange={(e) => handleAction(e.target.value)}
                      required={true}
                    >
                      <option value="">select action name</option>
                      <option value="APPROVE">APPROVE</option>
                      <option value="DECLINE">DECLINE</option>
                    </select>
                  </div>
                  {stateActionName === "DECLINE" ? (
                    <>
                      {" "}
                      <div className="form-group mb-4">
                        <label htmlFor="">Status</label>
                        <input
                          type="text"
                          className={"form-control"}
                          value={tempstatus}
                          onChange={(e) => settempstatus(e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="form-group mb-4">
                        <label htmlFor="">Next Status</label>
                        <input
                          type="text"
                          className={"form-control"}
                          value={nextStatus}
                          onChange={(e) => setNextStatus(e.target.value)}
                          required={true}
                        />
                        <span className="text-danger">{alert}</span>
                      </div>
                    </>
                  )}
                  <div className="form-group mb-4">
                    {" "}
                    <label htmlFor="">Days to next step</label>
                    <input
                      type="number"
                      value={daysToNextStep}
                      className={"form-control"}
                      onChange={(e) => setdaysToNextStep(e.target.value)}
                      required={true}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">Template Name</label>
                    <br />
                    {applicableCharges.length > 0 && (
                      <div className="form-group mb-4">
                        <select
                          className="form-control text-capitalize"
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          required={true}
                        >
                          <option className="text-black font-semibold ">
                            select template name
                          </option>
                          {templates?.map((item, index) => (
                            <option value={item.templateName} key={index}>
                              {item.templateName}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p></p>
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
                Add State
                <span
                  className={"p-1"}
                >{`(${issueTypeStateDTOS.length})`}</span>
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default CreateIssueTypes;
