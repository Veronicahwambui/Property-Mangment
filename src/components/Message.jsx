/* global $*/
import React, { useState, useEffect } from "react";

export default function Message(props) {
  const [mode, setmode] = useState("Email");
  const [mes, setmes] = useState(props.contact?.message);
  const [messageBody, setmessageBody] = useState({
    attachments: [
      {
        code: "string",
        name: "string",
        value: "string",
      },
    ],
    to: props.contact?.email,
    message: props.contact?.message,
    subject: "",
    templateName: "GREETING",
    from: "LANDLORD",
    model: {},
    portalName: "string",
  });

  const handleChange = (e) => {
    setmessageBody({ ...messageBody, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(messageBody);
    setmessageBody({
      to: "",
      message: "",
      contact: "",
      subject: "",
    });
  };

  useEffect(() => {
    setmessageBody({
      ...messageBody,
      to: props.contact?.email,
      message: props.contact?.message,
    });
    console.log(messageBody);
  }, [mes, props]);
  $("body").on("click", ".close-message-maker", function () {
    setmes("");
    $(".the-message-maker").removeClass("email-overlay-transform");
    setTimeout(function () {
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
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title text-white" id="composemodalTitle">
                Upload New Contacts
              </h5>
              <button
                type="button"
                className="btn-close text-white"
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
                            <i className="display-4 text-muted bx bxs-cloud-upload"></i>
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
          <div className="card-header bg-primary text-white py-0">
            <div className="d-flex justify-content-between align-items-center text-white">
              <h4 className="mb-0 p-0 m-0">New message</h4>
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
                      <div>
                        <label htmlFor="">Send as?</label>
                        <select
                          name=""
                          id=""
                          value={mode}
                          onChange={(e) => setmode(e.target.value)}
                        >
                          <option value="Email">Email</option>
                          <option value="SMS">sms</option>
                        </select>
                      </div>
                      <span className=" ">
                        <strong>To:</strong>
                      </span>
                      {mode === "Email" ? (
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
                {mode === "Email" ? (
                  <>
                    <div className="col-12">
                      <br />
                      <div className="form-group">
                        <label htmlFor="">Subject</label>"
                        <input
                          type="text"
                          placeholder="Subject"
                          name={"subject"}
                          className="form-control mb-3"
                          onChange={(e) => handleChange(e)}
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
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-end">
                  <button
                    type="submit"
                    className="btn btn-primary btn-rounded chat-send w-md waves-effect waves-light"
                  >
                    <span className="d-none d-sm-inline-block me-2">Send</span>{" "}
                    <i className="mdi mdi-send"></i>
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
