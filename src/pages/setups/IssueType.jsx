/* global $*/
import React, { useEffect, Fragment } from "react";
import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AuthService from "../../services/auth.service";
import moment from "moment";

function IssueType() {
  const location = useLocation();
  const id = useParams().id;

  const [issueType, setIssueType] = useState(location.state.issueType);
  const [issueStates, setIssueStates] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [sId, setsId] = useState(null);
  const [activeId, setActiveId] = useState("");
  const [issueTypeDetails, setIssueTypeDetails] = useState({
    active: true,
    applicableChargeId: undefined,
    chargeable: undefined,
    clientId: AuthService.getClientId(),
    daysToNextStep: undefined,
    id: id,
    nextStatus: undefined,
    status: undefined,
    templateName: undefined,
    stateActionName: undefined,
    previousStatus: undefined,
  });
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  const [applicableCharges, setApplicableCharges] = useState([]);
  const [templates, setTemplates] = useState([]);

  // modals
  const [show, setShow] = useState(false);
  const [editshow, seteditshow] = useState(false);
  const showModal = (x) => {
    setsId(x);
    setShow(true);
  };
  const [editState, seteditState] = useState({});
  const editshowModal = (x) => {
    console.log(x);
    let acc = issueStates.find((iS) => iS.id === x);
    console.log(acc);
    setapplicablechargeid(acc?.applicableCharge?.id);
    setstateActionName(acc?.stateAction);
    seteditState(acc);
    setsId(x);
    seteditshow(true);
  };
  const hideModal = () => setShow(false);
  const edithideModal = () => seteditshow(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    getIssueStates();
    requestsServiceService.allApplicableCharges("TENANT").then((res) => {
      setApplicableCharges(res.data.data);
    });
    requestsServiceService
      .getTemplateNames(AuthService.getClientId())
      .then((res) => {
        setTemplates(res.data.data);
      });
  }, [sId]);
  const getIssueStates = () => {
    requestsServiceService.getIssueStates(issueType.id).then((res) => {
      setIssueStates(res.data.data);
      $("#spinner").addClass("d-none");
    });
  };
  useEffect(() => {
    checks(issueStates);
  }, [issueStates, editState]);
  const [temp, settemp] = useState([]);
  const checks = (issueStates) => {
    let tp = [];
    if (issueStates?.length > 0) {
      issueStates?.forEach((state) => {
        let x = new Object({ status: state.status, action: state.stateAction });
        tp.push(x);
      });
      settemp(tp);
    }
  };

  //take input
  const handleChange = (event) => {
    console.log(event.target.value);
    if (event.target.name === "DECLINE") {
      setIssueTypeDetails({
        ...issueTypeDetails,
        stateActionName: event.target.value,
        nextStatus: "",
      });
    } else {
      setIssueTypeDetails({
        ...issueTypeDetails,
        [event.target.name]: event.target.value,
      });
    }
  };

  const [stateActionName, setstateActionName] = useState("");
  const handleAction = (text) => {
    text === "DECLINE"
      ? seteditState({
          ...editState,
          stateActionName: text,
          nextStatus: "",
        })
      : seteditState({
          ...editState,
          stateActionName: text,
        });
    setstateActionName(text);
  };
  const [applicablechargeid, setapplicablechargeid] = useState("");
  const handleEditChange = (event) => {
    console.log(event.target.name, event.target.value);
    event.target.name === "applicableChargeId"
      ? seteditState({
          ...editState,
          applicableChargeId: event.target.value,
        })
      : seteditState({
          ...editState,
          [event.target.name]: event.target.value,
        });
  };

  //create issue state
  const addIssueState = (e) => {
    console.log(id);
    e.preventDefault();
    let data = {
      active: true,
      applicableChargeId: parseInt(issueTypeDetails.applicableChargeId),
      chargeable: isChecked,
      clientId: parseInt(AuthService.getClientId()),
      daysToNextStep: parseInt(issueTypeDetails.daysToNextStep),
      id: null,
      nextStatus: issueTypeDetails.nextStatus,
      status: issueTypeDetails.status,
      templateName: issueTypeDetails.templateName,
      stateActionName: issueTypeDetails.stateActionName,
      previousStatus: issueTypeDetails.previousStatus,
    };
    requestsServiceService
      .createTenancyIssueStates(data, id)
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
          getIssueStates();
          setTimeout(() => {
            setError({
              ...error,
              message: "",
              color: "",
            });
            edithideModal();
          }, 1000);
        }
      })
      .catch((err) => {
        setError({
          ...error,
          message: err.message,
          color: "danger",
        });
      });
  };

  const editIssueState = (e) => {
    console.log(sId);
    e.preventDefault();
    let data = {
      active: true,
      applicableChargeId: parseInt(applicablechargeid),
      chargeable: isChecked,
      clientId: parseInt(AuthService.getClientId()),
      daysToNextStep: parseInt(editState.daysToNextStep),
      id: sId,
      previousStatus: editState.previousStatus,
      nextStatus: editState.nextStatus,
      status: editState.status,
      templateName: editState.templateName,
      stateActionName: stateActionName,
    };
    requestsServiceService
      .updateTenancyIssueStates(data, id)
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
          getIssueStates();
          setTimeout(() => {
            setError({
              ...error,
              message: "",
              color: "",
            });
            edithideModal();
          }, 1000);
        }
      })
      .catch((err) => {
        setError({
          ...error,
          message: err.message,
          color: "danger",
        });
      });
  };
  const deactivate = (x) => {
    requestsServiceService.toggleIssueState(x).then((res) => {
      if (res.data.status === true) {
        getIssueStates();
      }
    });
  };
  useEffect(() => {}, [temp, issueTypeDetails, editState]);

  return (
    <>
      <div className="page-content">
        <div className="content-fluid">
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
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18"></h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">
                      <Link to="/issuestypes">Issue Type</Link>
                    </li>
                    <li class="breadcrumb-item active">{issueType?.name}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className={"row"}>
            <div className="col-12">
              <div className="card calc-h-3px">
                <div>
                  <div className="row">
                    <div className="col-12">
                      <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                        <div
                          className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                          role="toolbar"
                        >
                          <div className="d-flex align-items-center flex-grow-1">
                            <h4 className="mb-0  bg-transparent  p-0 m-0">
                              Issue Type States
                            </h4>
                          </div>
                          <div className="d-flex">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect btn-label waves-light me-3"
                              onClick={() => showModal()}
                              data-bs-target="#add-new-agreementType"
                            >
                              <i className="mdi mdi-plus label-icon"></i> Add
                              State
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="row">
                          {/*{error.color !== "" && (*/}
                          {/*  <div*/}
                          {/*    className={"alert alert-" + error.color}*/}
                          {/*    role="alert"*/}
                          {/*  >*/}
                          {/*    {error.message}*/}
                          {/*  </div>*/}
                          {/*)}*/}
                          <div className="col-12">
                            <div className="bg-primary border-2 bg-soft p-3 mb-4">
                              <p className="fw-semibold mb-0 pb-0 text-uppercase">
                                {issueType?.name} States
                                {`   (${issueStates?.length})`}
                              </p>
                            </div>
                            <p className={"d-flex align-items-center"}>
                              {temp?.length > 0 &&
                                temp?.map((val, idx) => {
                                  return (
                                    <Fragment key={`${val.status}${idx}`}>
                                      <>
                                        <span
                                          className={
                                            val.action === "DECLINE"
                                              ? "text-danger"
                                              : ""
                                          }
                                        >
                                          {" "}
                                          <b>{val.status}</b>
                                        </span>
                                        {idx < temp?.length - 1 && (
                                          <i
                                            style={{
                                              fontSize: "18px",
                                              paddingLeft: "5px",
                                              margin: "0.5em",
                                            }}
                                            className={
                                              val.action === "DECLINE"
                                                ? "dripicons-warning mr-5 justify-content-center text-danger d-flex align-items-center"
                                                : "dripicons-arrow-thin-right mr-5 justify-content-center text-success d-flex align-items-center"
                                            }
                                          />
                                        )}
                                      </>
                                    </Fragment>
                                  );
                                })}
                            </p>
                            {/*<div>*/}
                            {/*  <p>{issueType?.name}</p>*/}
                            {/*  <p>{issueType?.initialStatus}</p>*/}
                            {/*  <p>{issueType?.resolveStatus}</p>*/}
                            {/*</div>*/}
                          </div>
                          <div className="col-12">
                            <div className="table-responsive table-responsive-md">
                              <table className="table table-editable-1 align-middle table-edits">
                                <thead className="table-light">
                                  <tr className="text-uppercase text-nowrap">
                                    <th>#</th>
                                    <th>Days to Next Status</th>
                                    <th>Previous Status</th>
                                    <th>Status</th>
                                    <th>Next Status</th>
                                    <th>Action</th>
                                    <th>Template Name</th>
                                    <th>State</th>
                                    <th>Date Created</th>

                                    <th className={"text-end"}>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {issueStates?.length > 0 &&
                                    issueStates?.map((item, index) => {
                                      return (
                                        <tr
                                          data-id="1"
                                          className={
                                            item.stateAction === "DECLINE"
                                              ? "text-uppercase table-danger"
                                              : "text-uppercase table-success"
                                          }
                                        >
                                          <td style={{ width: "80px" }}>
                                            {index + 1}
                                          </td>
                                          <td>{item.daysToNextStep}</td>
                                          <td>{item.previousStatus}</td>
                                          <td>{item.status}</td>
                                          <td>{item.nextStatus}</td>
                                          <td
                                            className={
                                              item.stateAction === "DECLINE"
                                                ? "text-danger"
                                                : "text-success"
                                            }
                                          >
                                            {item.stateAction}
                                          </td>
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
                                          <td>{moment(item.dateTimeCreated).format("YYYY-MM-DD HH:mm")}</td>

                                          <td className="text-right cell-change text-nowrap ">
                                            <div className="d-flex align-items-center">
                                              <a
                                                onClick={() =>
                                                  editshowModal(item.id)
                                                }
                                                className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                                                title="Edit "
                                              >
                                                <i className="bx bx-edit-alt "></i>
                                              </a>
                                              {item.active ? (
                                                <button
                                                  class="btn btn-danger btn-sm btn-rounded text-uppercase px-2 mx-3"
                                                  title="deactivate"
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#confirm-deactivate"
                                                  onClick={() =>
                                                    setActiveId(item.id)
                                                  }
                                                >
                                                  Deactivate
                                                </button>
                                              ) : (
                                                <button
                                                  class="btn btn-success btn-sm btn-rounded w-5 text-uppercase px-3 mx-3"
                                                  title="deactivate"
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#confirm-activate"
                                                  onClick={() =>
                                                    setActiveId(item.id)
                                                  }
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
                                {/*<tfoot>*/}
                                {/*  <tr>*/}
                                {/*    <td colSpan="7" onClick={showModal}>*/}
                                {/*      <span className="d-flex align-items-center cursor-pointer">*/}
                                {/*        <i className="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>*/}
                                {/*        <span className="pl-5 ">*/}
                                {/*          Add A State*/}
                                {/*        </span>*/}
                                {/*      </span>*/}
                                {/*    </td>*/}
                                {/*  </tr>*/}
                                {/*</tfoot>*/}
                              </table>
                              {/*{error.color !== "" && (*/}
                              {/*  <div*/}
                              {/*    className={"alert alert-" + error.color}*/}
                              {/*    role="alert"*/}
                              {/*  >*/}
                              {/*    {error.message}*/}
                              {/*  </div>*/}
                              {/*)}*/}
                              {/*<div className={"text-end"}>*/}
                              {/*  {" "}*/}
                              {/*  {status !== "" && status === resolveStatus && (*/}
                              {/*    <button*/}
                              {/*      variant="primary"*/}
                              {/*      type={"button"}*/}
                              {/*      className={"btn btn-primary"}*/}
                              {/*      onClick={finalSubmit}*/}
                              {/*    >*/}
                              {/*      Submit*/}
                              {/*    </button>*/}
                              {/*  )}*/}
                              {/*</div>*/}
                            </div>
                          </div>
                        </div>
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
            <Modal.Title>Add Issue State</Modal.Title>
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
               {isChecked&& <div className="form-group mb-4">
                  <label htmlFor="">Charges</label> <br />
                  {applicableCharges.length > 0 && (
                    <div className="form-group mb-4">
                      <select
                        className="form-control text-capitalize"
                        name={"applicableChargeId"}
                        onChange={(e) => handleChange(e)}
                        required={true}
                      >
                        {applicableCharges?.map((item, index) => (
                          <option value={item.id}>
                            {item?.name.toLowerCase()?.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>}
                <div className="form-group mb-4">
                  <label htmlFor="">Previous Status</label>
                  <input
                    type="text"
                    className={"form-control"}
                    name={"previousStatus"}
                    onChange={(e) => handleChange(e)}
                    required={true}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Status</label>
                  <input
                    type="text"
                    className={"form-control"}
                    name={"status"}
                    onChange={(e) => handleChange(e)}
                    required={true}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Next Status</label>
                  <input
                    type="text"
                    className={"form-control"}
                    name={"nextStatus"}
                    onChange={(e) => handleChange(e)}
                    required={true}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">State Action Name</label>
                  <select
                    className="form-control"
                    name={"stateActionName"}
                    onChange={(e) => handleChange(e)}
                    required={true}
                  >
                    {["APPROVE", "DECLINE"].map((item) => (
                      <option className="text-capitalize" value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Days to next step</label>
                  <input
                    type="number"
                    name={"daysToNextStep"}
                    className={"form-control"}
                    onChange={(e) => handleChange(e)}
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
                        name={"templateName"}
                        onChange={(e) => handleChange(e)}
                        required={true}
                      >
                        <option className="text-black font-semibold ">
                          select template name
                        </option>
                        {templates?.map((item, index) => (
                          <option value={item.templateName}>
                            {item.templateName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {error.color !== "" && (
              <div className={"alert alert-" + error.color} role="alert">
                {error.message}
              </div>
            )}
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
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal show={editshow} onHide={edithideModal} centered>
        <form onSubmit={editIssueState}>
          <Modal.Header closeButton>
            <Modal.Title>Edit State</Modal.Title>
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
                  {applicableCharges.length > 0 && (
                    <div className="form-group mb-4">
                      <select
                        className="form-control text-capitalize"
                        name={"applicableChargeId"}
                        value={applicablechargeid}
                        onChange={(e) => setapplicablechargeid(e.target.value)}
                        required={true}
                      >
                        {applicableCharges?.map((item, index) => (
                          <option
                            selected={
                              item.id === applicablechargeid ? "selected" : ""
                            }
                            value={item.id}
                          >
                            {item?.name.toLowerCase()?.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Previous Status</label>
                  <input
                    type="text"
                    className={"form-control"}
                    name={"previousStatus"}
                    value={editState?.previousStatus}
                    onChange={(e) => handleEditChange(e)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Status</label>
                  <input
                    type="text"
                    className={"form-control"}
                    name={"status"}
                    value={editState?.status}
                    onChange={(e) => handleEditChange(e)}
                    required={true}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">State Action Name</label>
                  <select
                    className="form-control"
                    name={"stateActionName"}
                    value={editState?.stateActionName}
                    onChange={(e) => handleAction(e.target.value)}
                    required={true}
                  >
                    {["APPROVE", "DECLINE"].map((item) => (
                      <option
                        className="text-capitalize"
                        selected={
                          item === editState?.stateAction ? "selected" : ""
                        }
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Next Status</label>
                  <input
                    type="text"
                    className={"form-control"}
                    value={editState?.nextStatus}
                    name={"nextStatus"}
                    onChange={(e) => handleEditChange(e)}
                    required={true}
                    disabled={stateActionName === "DECLINE"}
                  />
                </div>
                {issueTypeDetails?.stateActionName === "DECLINE" ? (
                  <></>
                ) : (
                  <>
                    <div className="form-group mb-4">
                      <label htmlFor="">Next Status</label>
                      <input
                        type="text"
                        className={"form-control"}
                        name={"nextStatus"}
                        onChange={(e) => handleEditChange(e)}
                        required={true}
                      />
                    </div>
                  </>
                )}
                <div className="form-group mb-4">
                  {" "}
                  <label htmlFor="">Days to next step</label>
                  <input
                    type="text"
                    name={"daysToNextStep"}
                    value={editState?.daysToNextStep}
                    className={"form-control"}
                    onChange={(e) => handleEditChange(e)}
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
                        name={"templateName"}
                        value={editState?.templateName}
                        onChange={(e) => handleEditChange(e)}
                        required={true}
                      >
                        {templates?.map((item, index) => (
                          <option
                            value={item.templateName}
                            selected={
                              item.templateName === editState?.templateName
                                ? "selected"
                                : ""
                            }
                          >
                            {item.templateName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {error.color !== "" && (
              <div className={"alert alert-" + error.color} role="alert">
                {error.message}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={"btn btn-grey"}
              onClick={edithideModal}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={"btn btn-primary"}
              type={"submit"}
            >
              Update State
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

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
                <h5>Deactivate this Status ?</h5>
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
                <h5>Activate this Status?</h5>
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

export default IssueType;
