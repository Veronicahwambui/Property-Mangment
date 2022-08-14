/* global $*/
import React, { useState, useEffect } from "react";
import authLoginService from "../services/authLogin.service";
import requestsServiceService from "../services/requestsService.service";

export default function Message(props) {
  const [mode, setmode] = useState("");
  const [mes, setmes] = useState(props.details?.message);
  const [messageBody, setmessageBody] = useState({
    to: props.contact,
    message: props.details?.message,
    subject: props.details?.subject,
  });

  const handleChange = (e) => {
    setmessageBody({ ...messageBody, [e.target.name]: e.target.value });
  };
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  const [loading, setloading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    var data = {
      contact: messageBody.to,
      entity: props.details.entity,
      client: props.details.clientId,
      entityType: props.details.entityType,
      createdBy: authLoginService.getCurrentUser(),
    };
    if (props.mode === "Email") {
      let m = {
        "templateName": "mail/email-template",
        "portalName": "CLIENT NAME PORTAL",
        "from": "developers@nouveta.tech",
        "to": "kelvinthuku@nouveta.tech",
        "subject": "SUBJECT",
        "model": {
          "signature": "CLIENT NAME Admin",
          "name": "RECEPIENT NAME",
          "message": "MESSAGE kelvinthuku@nouveta.tech",
          "token": ""
        },
        "attachments": [ ]
      }
      // {
      //   templateName: "mail/email-template",
      //   portalName: `${props.details.clientName} PORTAL`,
      //   from: "nouveta.tech@outlook.com",
      //   to: messageBody.to,
      //   subject: messageBody.subject,
      //   model: {
      //     signature: `${props.details.clientName} Admin`,
      //     name: props.details.recipientName,
      //     message: messageBody.message,
      //     token: "",
      //   },
      //   attachments: [],
      // };
      requestsServiceService
        .sendEmail(m, data)
        .then((res) => {
          console.log(res);
          setloading(false);
          if (res.message === "Success") {
            setError({
              ...error,
              message: res.message,
              color: "success",
            });
          } else {
            setError({
              ...error,
              message: res.message,
              color: "danger",
            });
          }
        })
        .catch((err) => {
          setloading(false);
          setError({
            ...error,
            message: err?.message,
            color: "danger",
          });
        });
    } else if (props.mode === "SMS") {
      let m = {
        model: {},
        senderId: props.details.senderId,
        templateName: null,
        text: messageBody.message,
      };
      requestsServiceService
        .sendSms(m, data)
        .then((res) => {
          setloading(false);
          console.log(res.data.message);
          if (res.data.message === "Success") {
            setError({
              ...error,
              message: res.data.message,
              color: "success",
            });
          } else {
            setError({
              ...error,
              message: res.data.message,
              color: "danger",
            });
          }
        })
        .catch((err) => {
          setloading(false);
          setError({
            ...error,
            message: err?.message,
            color: "danger",
          });
        });
    }
  };

  useEffect(() => {
    setmessageBody({
      ...messageBody,
      to: props.details?.contact,
      message: props.details?.message,
    });
  }, [props]);
  useEffect(() => {}, [messageBody, loading]);

  $("body").on("click", ".close-message-maker", function () {
    props.clear();

    $(".the-message-maker").removeClass("email-overlay-transform");
    setTimeout(function () {
      setmode("");
      setmessageBody({
        ...messageBody,
        to: props.contact,
        message: props.details?.message,
        subject: props.details?.subject,
      });
      setError({
        ...error,
        message: "",
        color: "",
      });
      $(".email-overlay").addClass("d-none");
    }, 200);
  });
  return (
    <>
      {/*ADD CONTACTS*/}
      <div
        className="modal fade upload-contacts"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id="upload-contacts"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="composemodalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary message-white">
              <h5 className="modal-title message-white" id="composemodalTitle">
                Upload New Contacts
              </h5>
              <button
                type="button"
                className="btn-close message-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-5">
                {/*<p>*/}
                {/*  <a href="">*/}
                {/*    <i className="mdi mdi-download mr-15px"></i>Download*/}
                {/*    contacts file sample for reference*/}
                {/*  </a>*/}
                {/*</p>*/}
                {/*<div className="form-group mb-4">*/}
                {/*  <label htmlFor="">Contacts title</label>*/}
                {/*  <input*/}
                {/*    type="text"*/}
                {/*    className="form-control"*/}
                {/*    placeholder="Enter The Tittle for the contacts you are to upload"*/}
                {/*  />*/}
                {/*</div>*/}
                <div className="p-4 bg-light">
                  <div className="row ">
                    <div className="col-12">
                      <form action="#" className="dropzone">
                        <div className="fallback">
                          <input name="file" type="file" className="mb-3" />
                        </div>
                        <div className="dz-message needsclick">
                          <div className="mb-3">
                            <i className="display-4 message-muted bx bxs-cloud-upload"></i>
                          </div>

                          <h6>Contacts excel file</h6>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success upload-the-contacts"
              >
                Save Contacts{" "}
                <i className="mdi mdi-account-details-outline  ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="email-overlay d-none">
        <div className="card the-message-maker">
          <div className="card-header bg-primary message-white py-0">
            <div className="d-flex justify-content-between align-items-center message-white">
              <h4 className="mb-0 p-0 m-0">New {props.mode} </h4>
              <div className="control-btns">
                <div className="dropdownd-lg-inline-block ms-1">
                  <button
                    type="button"
                    className="btn header-item noti-icon waves-effect close-message-maker"
                  >
                    <i className="mdi mdi-close"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={submit}>
            <div className="card-body">
              <div className="row">
                <div className="col-12 d-non selected-contacts-message">
                  <div className="row flex-nowrap">
                    <div className="col-12">
                      <span className=" ">
                        <strong>To:</strong>
                      </span>
                      {props.mode === "Email" ? (
                        <>
                          <input
                            className="form-control w-100 d-flex"
                            spellCheck="false"
                            data-ms-editor="true"
                            type="email"
                            name="to"
                            placeholder="email"
                            value={messageBody.to}
                            required={true}
                            onChange={(e) => handleChange(e)}
                          />
                        </>
                      ) : (
                        <>
                          {" "}
                          <input
                            className="form-control w-100 d-flex"
                            spellCheck="false"
                            data-ms-editor="true"
                            type="tel"
                            id="phone"
                            name="to"
                            placeholder="0XXXXXXXXX"
                            pattern="[0]{1}[0-9]{9}"
                            value={messageBody.to}
                            required={true}
                            onChange={(e) => handleChange(e)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/*<div className="col-12">*/}
                {/*  <div className="pb-3">*/}
                {/*    <button*/}
                {/*      type="button"*/}
                {/*      data-bs-toggle="modal"*/}
                {/*      data-bs-target="#upload-contacts"*/}
                {/*      className="btn btn-success waves-effect btn-label waves-light"*/}
                {/*    >*/}
                {/*      <i className="mdi-account-multiple-plus font-16px mdi label-icon"></i>{" "}*/}
                {/*      Upload Contacts*/}
                {/*    </button>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {props.mode === "Email" ? (
                  <>
                    <div className="col-12">
                      <br />
                      <div className="form-group">
                        <label htmlFor="">Subject</label>"
                        <input
                          type="text"
                          placeholder="Subject"
                          value={messageBody.subject}
                          name={"subject"}
                          className="form-control mb-3"
                          onChange={(e) => handleChange(e)}
                          required={true}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="col-12">
                  <label htmlFor="">Message</label>"
                  <textarea
                    name="message"
                    value={messageBody.message}
                    placeholder="Write your message"
                    id=""
                    cols="30"
                    rows="10"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    required={true}
                  ></textarea>
                </div>
              </div>
              <span className={"text-" + error.color}>{error.message}</span>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-end">
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn btn-primary btn-rounded chat-send w-md waves-effect waves-light"
                  >
                    {loading && (
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                      />
                    )}
                    {loading && (
                      <>
                        {" "}
                        <span className="d-none d-sm-inline-block me-2">
                          Sending...
                        </span>{" "}
                        <i className="mdi mdi-send"></i>
                      </>
                    )}
                    {!loading && (
                      <>
                        {" "}
                        <span className="d-none d-sm-inline-block me-2">
                          Send
                        </span>{" "}
                        <i className="mdi mdi-send"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
