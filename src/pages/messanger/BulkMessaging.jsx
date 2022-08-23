/* global $ */
import React, { useEffect, useState } from "react";
import requestsServiceService from "../../services/requestsService.service";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import authService from "../../services/auth.service";
import authLoginService from "../../services/authLogin.service";

function BulkMessaging() {
  const [periodStart, setPeriodStart] = useState("0");
  const [periodEnd, setPeriodEnd] = useState("30");
  const [recipient, setRecipient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [applicableCharges, setAc] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedItems, setselectedItems] = useState([]);
  const [cont, setContinue] = useState(false);
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  const [wtc, setWtc] = useState("");
  const [percentOf, setPercentOf] = useState("");
  const [subject, setSubject] = useState("");
  const [loading2, setloading2] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [responseData, setresponseData] = useState([]);
  const [validIds, setVID] = useState([]);
  const [bulkMessage, setbulkMessage] = useState({
    aplicableChargeId: undefined,
    landlordIds: [],
    paid: "",
    percentOf: "",
    percentage: undefined,
    mailModels: [],
    messageModels: [],
    premiseIds: [],
    sendTo: "",
    period: periodStart + "-" + periodEnd,
    templatedMessage: "",
    tenantIds: [],
    whoToCharge: "",
    messageKind: "",
    messageType: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(/.*{.*}.*/.test(bulkMessage.templatedMessage));
  }, [bulkMessage.templatedMessage]);

  // SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    var templateString = bulkMessage.templatedMessage;

    var params = templateString.match(/{{(.*?)}}/g);

    if (params != null && params.length > 0) {
      var paramsText = params.toString();
      var paramsWithoutBraces = paramsText.replace(/{{|}}/gi, "");
    }
    // clientId: clientId,
    //   id: null,
    //   language: "ENG",
    //   parameterList: paramsWithoutBraces,
    //   template: template,
    //   templateName: templateName?.toLocaleUpperCase(),
    //   templateType: "SMS"
    let data = {
      aplicableChargeId: bulkMessage.aplicableChargeId,
      landlordIds: [],
      paid: bulkMessage.paid,
      percentOf: percentOf,
      percentage: parseInt(bulkMessage.percentage),
      premiseIds: [],
      mailModels: [],
      messageModels: [],
      sendTo: recipient,
      templatedMessage: bulkMessage.templatedMessage,
      tenantIds: [],
      whoToCharge: wtc,
      period: periodStart + "-" + periodEnd,
      messageKind: bulkMessage.messageKind,
      messageType: bulkMessage.messageType,
    };

    if (recipient === "TENANT") {
      Object.assign(data, { tenantIds: selectedItems.map((a) => a.id) });
    } else if (recipient === "LANDLORD") {
      Object.assign(data, { landlordIds: selectedItems.map((a) => a.id) });
    } else if (recipient === "PREMISE") {
      Object.assign(data, { premiseIds: selectedItems.map((a) => a.id) });
    }

    if (bulkMessage.templatedMessage !== "") {
      if (bulkMessage.messageType !== "SMS") {
        Object.assign(data, {
          mailModels: selectedItems.map((a) => ({
            templateName: "mail/email-template",
            portalName: JSON.parse(authService.getCurrentUserName()).client
              .name,
            from: "nouveta.tech@outlook.com",
            to: a.email,
            subject: subject,
            model: {
              balance: paramsWithoutBraces,
              message: bulkMessage.templatedMessage,
            },
            attachments: [],
            entityType:
              bulkMessage.messageKind === "BALANCE_REMINDER"
                ? "TENANCY"
                : "TENANT",
            createdBy: authLoginService.getCurrentUser(),
            entityId: a.id,
          })),
        });
      } else {
        Object.assign(data, {
          messageModels: selectedItems.map((a) => ({
            contact: a.phoneNumber,
            entityType:
              bulkMessage.messageKind === "BALANCE_REMINDER"
                ? "TENANCY"
                : "TENANT",
            createdBy: authLoginService.getCurrentUser(),
            message: bulkMessage.templatedMessage,
            templateName: undefined,
            senderId: JSON.parse(authService.getCurrentUserName()).client
              .senderId,
            model: {
              balance: paramsWithoutBraces,
              message: bulkMessage.templatedMessage,
            },
            entityId: a.id,
          })),
        });
      }
    } else {
    }
    console.log(JSON.stringify(data));
    createBulkMessage(data);
  };

  const createBulkMessage = (x) => {
    if (bulkMessage.templatedMessage !== "") {
      requestsServiceService
        .createBulkMessage(x)
        .then((response) => {
          if (response.data.status === true) {
            setError({
              ...error,
              message: response.data.message,
              color: "success",
            });
            setTimeout(() => {
              navigate("/bulkmessages", { replace: true });
            }, 2000);
          } else {
            setError({
              ...error,
              message: response.data.message,
              color: "danger",
            });
          }

          if (x.messageModels.length > 0 && x.mailModels.length > 0) {
          }
        })
        .catch((err) => {
          // setError({
          //   ...error,
          //   message: err.message,
          //   color: "danger",
          // });
        });
    } else {
      requestsServiceService
        .createBulkMessage(x)
        .then((response) => {
          setresponseData(response.data.data);
          if (bulkMessage.messageKind === "CUSTOM") {
            setVID(response.data?.data?.map((a) => a.id));
          }
          if (bulkMessage.messageKind === "BALANCE_REMINDER") {
            setVID(response.data?.data?.map((a) => a.tenancy?.tenant?.id));
          }
          if (response.status === true) {
            // setError({
            //   ...error,
            //   message: response.data.message,
            //   color: "success",
            // });
          } else {
            // setError({
            //   ...error,
            //   message: response.data.message,
            //   color: "danger",
            // });
          }

          if (x.messageModels.length > 0 && x.mailModels.length > 0) {
          }
        })
        .catch((err) => {
          // setError({
          //   ...error,
          //   message: err.message,
          //   color: "danger",
          // });
        });
    }
  };

  useEffect(() => {
    console.log(validIds);
  }, [responseData]);

  const clearModal = () => {
    setRecipient("");
    setloaded(false);
    setloading(false);
    setloading2(false);
    setSearchResults([]);
    setError({
      error,
      message: "",
      color: "",
    });
    setSearchTerm("");
    setselectedItems([]);
    setWtc("");
  };

  useEffect(() => {
    getApplicableCharges();
  }, []);

  const getApplicableCharges = () => {
    requestsServiceService.allApplicableCharges().then((res) => {
      setAc(res.data.data);
    });
  };

  const selectItems = (e, x) => {
    if (e.target.checked) {
      setselectedItems((selectedItems) => [...selectedItems, x]);
    } else {
      removeItems(x.id);
    }
  };
  const selectResponseItems = (e, x) => {
    console.log(x);
    if (e.target.checked) {
      setVID((validIds) => [...validIds, x]);
    } else {
      removeResponseItems(x);
    }
  };
  useEffect(() => {
    console.log(validIds);
  }, [validIds]);
  const removeResponseItems = (x) => {
    setVID([...validIds.filter((item) => item !== x)]);
  };
  const removeItems = (x) => {
    setselectedItems([...selectedItems.filter((item) => item.id !== x)]);
  };

  const searchItems = (e) => {
    $("#bulk-form").trigger("reset");
    setloaded(false);
    setSearchResults([]);
    e.preventDefault();
    setloading(true);
    var size = 10;
    var page = 0;
    var dates = {
      dateCreatedEnd: new Date(),
      dateCreatedStart: moment(new Date()).startOf("year").format(),
    };
    if (recipient === "TENANT") {
      let s = {
        search: searchTerm.trim(),
      };
      let data = Object.assign(dates, s);
      getTenants(searchTerm, page, size, data);
    } else if (recipient === "LANDLORD") {
      let s = {
        search: searchTerm.trim(),
      };
      let data = Object.assign(dates, s);
      getLandlords(page, size, data);
    } else if (recipient === "PREMISE") {
      let s = {
        search: searchTerm.trim(),
      };
      let data = Object.assign(dates, s);
      getPremises(page, size, data);
    }
  };

  const getLandlords = (x, y, z) => {
    setloading2(true);
    requestsServiceService.getLandLords(x, y, z).then((res) => {
      setSearchResults(res.data.data);
      setloading(false);
      setloading2(false);
      setloaded(true);
    });
  };

  const getPremises = (x, y, z) => {
    setloading2(true);

    requestsServiceService.getAllpremises(x, y, z).then((res) => {
      setSearchResults(res.data.data);
      setloading(false);
      setloading2(false);
      setloaded(true);
    });
  };

  const getTenants = (w, x, y, z) => {
    setloading2(true);
    requestsServiceService.getAllTenants(w, x, y, z).then((res) => {
      setSearchResults(res.data.data);
      setloading(false);
      setloading2(false);
      setloaded(true);
    });
  };
  const regex = new RegExp(/\{{(balance)\}}/g);
  useEffect(() => {
    console.log(bulkMessage.templatedMessage);
    console.log(regex.test(bulkMessage.templatedMessage));
  }, [bulkMessage.templatedMessage]);

  const handleChange = (e) => {
    setbulkMessage({
      ...bulkMessage,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18 text-capitalize">
                  Bulk Messaging
                </h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/">Messages</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Create Bulk Messages
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {error.color !== "" && (
              <div className={"alert alert-" + error.color} role="alert">
                {error.message}
              </div>
            )}
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  {/*<div className="text-center mb-4 pt-2">*/}
                  {/*  <div className="avatar-md mx-auto">*/}
                  {/*    <div className="avatar-title bg-light rounded-circle text-primary h1 ">*/}
                  {/*      <i className="mdi mdi-email "></i>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*  <div className="row justify-content-center">*/}
                  {/*    <div className="col-xl-10">*/}
                  {/*      <h4 className="text-primary ">*/}
                  {/*        Bulk Messaging*/}
                  {/*        /!*<span style={{ marginLeft: "10px" }}>*!/*/}
                  {/*        /!*  {loading && <i className="fa fa-refresh fa-spin" />}*!/*/}
                  {/*        /!*  {loaded && (*!/*/}
                  {/*        /!*    <>*!/*/}
                  {/*        /!*      <i className="fa fa-check" />*!/*/}
                  {/*        /!*    </>*!/*/}
                  {/*        /!*  )}*!/*/}
                  {/*        /!*</span>*!/*/}
                  {/*      </h4>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  <div id="kev-step-form">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                      >
                        <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                            <a className="nav-link active">
                              1. Recipient details
                              <span className="sr-only">(current)</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link">2. Message</a>
                          </li>
                        </ul>
                      </div>
                    </nav>
                    <section className={"step-cont active-step"}>
                      <div className="col-12">
                        <div className="bg-primary border-2 bg-soft p-3 mb-4">
                          <p className="fw-semibold mb-0 pb-0 text-uppercase">
                            Recipient details
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label htmlFor="landlord-type" className="form-label">
                            Recipient.{" "}
                            <strong className="text-danger">*</strong>
                          </label>
                          <div className="form-group mb-4">
                            <select
                              name=""
                              id=""
                              className="form-control text-capitalize"
                              onChange={(e) => {
                                setSearchResults([]);
                                setRecipient(e.target.value);
                              }}
                              disabled={recipient !== ""}
                            >
                              <option
                                className="text-black font-semibold "
                                value=""
                              >
                                Select..
                              </option>
                              {["TENANT", "LANDLORD", "PREMISE"].map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <label htmlFor=" " className=" ">
                              Message Type:{" "}
                              <strong className="text-danger ">*</strong>
                            </label>
                            <div className="d-flex ">
                              <div className="form-check me-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="messageType"
                                  value={"SMS"}
                                  onChange={(e) => handleChange(e)}
                                />
                                <label className="form-check-label">SMS</label>
                              </div>
                              <div className="form-check me-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="messageType"
                                  value={"EMAIL"}
                                  onChange={(e) => handleChange(e)}
                                />
                                <label className="form-check-label">
                                  EMAIL
                                </label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="landlord-type"
                              className="form-label"
                            >
                              Message Kind.{" "}
                              <strong className="text-danger">*</strong>
                            </label>
                            <div className="form-group mb-4">
                              <select
                                name="messageKind"
                                id=""
                                className="form-control text-capitalize"
                                onChange={(e) => handleChange(e)}
                              >
                                <option
                                  className="text-black font-semibold "
                                  value=""
                                >
                                  Select..
                                </option>
                                {["CUSTOM", "BALANCE_REMINDER"].map((item) => (
                                  <option
                                    key={item}
                                    value={item}
                                    disabled={
                                      recipient === "LANDLORD" &&
                                      item === "BALANCE_REMINDER"
                                    }
                                  >
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="bg-primary border-2 bg-soft p-3">
                              <p className="fw-semibold mb-0 pb-0 text-uppercase">
                                Search {recipient.toLowerCase()}
                              </p>
                            </div>
                          </div>
                          <div className="text-center pt-2">
                            <div className="row justify-content-end">
                              <div className="col-xl-12">
                                <div className="row">
                                  <div className="col-12">
                                    <form
                                      onSubmit={searchItems}
                                      id={"bulk-search-form"}
                                    >
                                      <div className="app-search d-none d-lg-block d-flex">
                                        <div className="position-relative">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder={
                                              "Search " +
                                              recipient.toLowerCase() +
                                              " by name"
                                            }
                                            required={true}
                                            onChange={(e) =>
                                              setSearchTerm(e.target.value)
                                            }
                                          />
                                          <span className="bx bx-search-alt"></span>
                                        </div>
                                      </div>
                                    </form>
                                    <div className="form-group">
                                      <div className="d-flex align-items-center justify-content-center">
                                        <div className="text-end">
                                          <button
                                            type="submit"
                                            form={"bulk-search-form"}
                                            disabled={
                                              loading2 || searchTerm === ""
                                            }
                                            className="btn btn-primary btn-rounded"
                                          >
                                            {loading2 && (
                                              <i
                                                className="fa fa-refresh fa-spin"
                                                style={{ marginRight: "5px" }}
                                              />
                                            )}
                                            {loading2 && (
                                              <>
                                                <span className="d-none d-sm-inline-block me-2">
                                                  Searching...
                                                </span>
                                              </>
                                            )}
                                            {!loading2 && (
                                              <>
                                                <span className="d-none d-sm-inline-block me-2">
                                                  Search
                                                </span>
                                              </>
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="text-center mb-1 mt-2">
                              {loaded && searchResults.length < 1 && (
                                <>
                                  <span className={"text-danger"}>
                                    No records found!
                                  </span>
                                </>
                              )}
                              <div className="row justify-content-center">
                                <div className="col-xl-10 ">
                                  <div className="row">
                                    <div className="col-12">
                                      <div className={"mt-2 mb-2"}>
                                        {loaded && searchResults.length > 5 && (
                                          <span className={"text-danger"}>
                                            Too many results. Specify a{" "}
                                            {" " + recipient.toLowerCase()}{" "}
                                            name!
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="overflow-visible">
                                  <table
                                    className="table align-middle table-hover contacts-table table-striped "
                                    id="datatable-buttons"
                                  >
                                    <thead className="table-light">
                                      {searchResults.length > 0 &&
                                        searchResults.length <= 5 && (
                                          <>
                                            {recipient === "PREMISE" && (
                                              <>
                                                <tr>
                                                  <th width="8px">Select</th>
                                                  <th span={"col-6"}>
                                                    Premise Name
                                                  </th>
                                                  <th span={"col-3"}>
                                                    Premise Type
                                                  </th>
                                                  <th span={"col-3"}>
                                                    Premise Use Type
                                                  </th>
                                                </tr>
                                              </>
                                            )}
                                            {recipient === "LANDLORD" && (
                                              <>
                                                <tr>
                                                  <th width="8px">Select</th>
                                                  <th span={"col-6"}>
                                                    Landlord Type
                                                  </th>
                                                  <th span={"col-3"}>Name</th>
                                                  <th span={"col-3"}>Email</th>
                                                </tr>
                                              </>
                                            )}
                                            {recipient === "TENANT" && (
                                              <>
                                                <tr>
                                                  <th width="8px">Select</th>
                                                  <th span={"col-6"}>
                                                    Tenant Type
                                                  </th>
                                                  <th span={"col-3"}>Name</th>
                                                  <th span={"col-3"}>Email</th>
                                                </tr>
                                              </>
                                            )}
                                          </>
                                        )}
                                    </thead>
                                    <tbody>
                                      {searchResults.length > 0 && (
                                        <>
                                          {searchResults.length <= 5 && (
                                            <>
                                              {searchResults?.map((item) => (
                                                <>
                                                  {recipient === "LANDLORD" && (
                                                    <tr key={item.id}>
                                                      <td>
                                                        <div className="d-flex  align-items-center">
                                                          <div className="the-mail-checkbox pr-4">
                                                            <input
                                                              className="form-check-input mt-0 pt-0 form-check-dark"
                                                              type="checkbox"
                                                              id="formCheck1"
                                                              onChange={(e) =>
                                                                selectItems(
                                                                  e,
                                                                  item
                                                                )
                                                              }
                                                              checked={selectedItems.some(
                                                                (el) =>
                                                                  el.id ===
                                                                  item.id
                                                              )}
                                                            />
                                                          </div>
                                                        </div>
                                                      </td>
                                                      <td>
                                                        {item.landLordType}
                                                      </td>
                                                      <td className="text-capitalize">
                                                        <a href="javascript:void(0)">
                                                          {item.firstName}{" "}
                                                          {item.lastName}
                                                        </a>
                                                      </td>
                                                      <td>{item.email}</td>
                                                    </tr>
                                                  )}
                                                  {recipient === "PREMISE" && (
                                                    <tr key={item.id}>
                                                      <td>
                                                        <div className="d-flex  align-items-center">
                                                          <div className="the-mail-checkbox pr-4">
                                                            <input
                                                              className="form-check-input mt-0 pt-0 form-check-dark"
                                                              type="checkbox"
                                                              id="formCheck1"
                                                              onChange={(e) =>
                                                                selectItems(
                                                                  e,
                                                                  item
                                                                )
                                                              }
                                                              checked={selectedItems.some(
                                                                (el) =>
                                                                  el.id ===
                                                                  item.id
                                                              )}
                                                            />
                                                          </div>
                                                        </div>
                                                      </td>
                                                      <td>
                                                        <a href="javascript:void(0)">
                                                          {item.premiseName}
                                                        </a>
                                                      </td>
                                                      <td className="text-capitalize">
                                                        <a href="javascript:void(0)">
                                                          {
                                                            item.premiseType
                                                              ?.name
                                                          }
                                                        </a>
                                                      </td>
                                                      <td>
                                                        {
                                                          item.premiseUseType
                                                            ?.name
                                                        }
                                                      </td>
                                                    </tr>
                                                  )}
                                                  {recipient === "TENANT" && (
                                                    <tr key={item.id}>
                                                      <td>
                                                        <div className="d-flex  align-items-center">
                                                          <div className="the-mail-checkbox pr-4">
                                                            <input
                                                              className="form-check-input mt-0 pt-0 form-check-dark"
                                                              type="checkbox"
                                                              id="formCheck1"
                                                              onChange={(e) =>
                                                                selectItems(
                                                                  e,
                                                                  item
                                                                )
                                                              }
                                                              checked={selectedItems.some(
                                                                (el) =>
                                                                  el.id ===
                                                                  item.id
                                                              )}
                                                            />
                                                          </div>
                                                        </div>
                                                      </td>
                                                      <td>{item.tenantType}</td>
                                                      <td className="text-capitalize">
                                                        <a href="javascript:void(0)">
                                                          {item?.tenantType ===
                                                          "INDIVIDUAL" ? (
                                                            <>
                                                              {item.firstName +
                                                                " "}
                                                              {item.lastName +
                                                                " "}{" "}
                                                              {item.otherName}
                                                            </>
                                                          ) : (
                                                            <>
                                                              {item.companyName +
                                                                " "}
                                                            </>
                                                          )}
                                                        </a>
                                                      </td>
                                                      <td>{item.email}</td>
                                                    </tr>
                                                  )}
                                                </>
                                              ))}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </tbody>
                                  </table>
                                  {selectedItems.length > 0 && (
                                    <div
                                      className={
                                        "alert alert-warning d-flex align-items-center"
                                      }
                                    >
                                      {selectedItems.length > 0 && (
                                        <>
                                          <Button variant="primary">
                                            Selected
                                            <Badge
                                              bg="light"
                                              className="ml-7px"
                                            >
                                              <b>{selectedItems.length}</b>
                                            </Badge>
                                          </Button>
                                        </>
                                      )}
                                      {selectedItems.length > 0 &&
                                        selectedItems?.map((item) => (
                                          <>
                                            {recipient === "LANDLORD" && (
                                              <>
                                                <h5
                                                  className="ml-7px"
                                                  key={item.id}
                                                >
                                                  <Badge bg="success">
                                                    {item.firstName +
                                                      " " +
                                                      item.lastName}
                                                  </Badge>
                                                  <br />
                                                  <i
                                                    className="fa fa-trash cursor-pointer text-danger mt-1"
                                                    onClick={() =>
                                                      removeItems(item.id)
                                                    }
                                                  ></i>
                                                </h5>
                                              </>
                                            )}
                                            {recipient === "TENANT" && (
                                              <>
                                                <h5
                                                  className="ml-7px"
                                                  key={item.id}
                                                >
                                                  <Badge bg="success">
                                                    {item.tenantType ===
                                                      "COMPANY" ? (
                                                      <>{item.companyName}</>
                                                    ) : (
                                                      <>
                                                        {item.firstName +
                                                          " " +
                                                          item.lastName}
                                                      </>
                                                    )}
                                                  </Badge>
                                                  <br />
                                                  <i
                                                    className="fa fa-trash cursor-pointer text-danger mt-1"
                                                    onClick={() =>
                                                      removeItems(item.id)
                                                    }
                                                  ></i>
                                                </h5>
                                              </>
                                            )}
                                            {recipient === "PREMISE" && (
                                              <>
                                                <h5
                                                  className="ml-7px"
                                                  key={item.id}
                                                >
                                                  <Badge bg="success">
                                                    {item.premiseName}
                                                  </Badge>
                                                  <br />
                                                  <i
                                                    className="fa fa-trash cursor-pointer text-danger mt-1"
                                                    onClick={() =>
                                                      removeItems(item.id)
                                                    }
                                                  ></i>
                                                </h5>
                                              </>
                                            )}
                                          </>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {selectedItems.length > 0 &&
                        bulkMessage.messageKind === "BALANCE_REMINDER" && (
                          <div className="row">
                            <div className="col-12">
                              <div className="bg-primary border-2 bg-soft p-3 mb-2">
                                <p className="fw-semibold mb-0 pb-0 text-uppercase">
                                  Charging Rule
                                </p>
                              </div>
                            </div>
                            <div className="row g-3 mb-3 align-items-center">
                              <div className="col-auto">
                                <label
                                  htmlFor="inputPassword6"
                                  className="col-form-label"
                                >
                                  Who to charge:
                                </label>
                              </div>
                              <div className="col-4">
                                <select
                                  className="form-control"
                                  aria-label="Default select example"
                                  onChange={(e) => setWtc(e.target.value)}
                                >
                                  <option>Select who to charge</option>
                                  <option value="ALLCURRENT">
                                    All Current
                                  </option>
                                  <option value="CHARGECONSTRAINT">
                                    Charge Constraint
                                  </option>
                                </select>
                              </div>
                            </div>
                            {wtc === "CHARGECONSTRAINT" && (
                              <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                  <label className="col-form-label">
                                    Have paid:
                                  </label>
                                </div>
                                <div className="col-auto">
                                  <select
                                    className="form-control"
                                    name={"paid"}
                                    aria-label="Default select example"
                                    onChange={(e) => handleChange(e)}
                                  >
                                    <option>Select..</option>
                                    {["Over", "Below"].map((item) => (
                                      <option key={item} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-4 d-flex align-items-center gap-1">
                                  <input
                                    type="text"
                                    name={"percentage"}
                                    className="form-control"
                                    placeholder="Enter number (1-100)"
                                    onChange={(e) => handleChange(e)}
                                  />
                                  <strong> % </strong>
                                </div>
                                <div className="col-4 d-flex align-items-center gap-1">
                                  <strong>of</strong>
                                  <select
                                    className="form-control"
                                    aria-label="Default select example"
                                    onChange={(e) =>
                                      setPercentOf(e.target.value)
                                    }
                                  >
                                    <option>select..</option>
                                    {["SPECIFIC_CHARGE", "FULL_PERIOD"].map(
                                      (item) => (
                                        <option key={item} value={item}>
                                          {item}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                              </div>
                            )}
                            {wtc === "CHARGECONSTRAINT" &&
                              percentOf === "SPECIFIC_CHARGE" && (
                                <div className="col-12 mt-3">
                                  <div className="row g-3 align-items-center">
                                    <div className="col-auto">
                                      <label className="col-form-label">
                                        Charge{" "}
                                        <strong className="text-danger ">
                                          *
                                        </strong>
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <select
                                        className="form-control text-capitalize"
                                        required={true}
                                        name={"aplicableChargeId"}
                                        onChange={(e) => handleChange(e)}
                                      >
                                        <option className="text-black font-semibold">
                                          select charge
                                        </option>
                                        {applicableCharges.map((aT) => {
                                          return (
                                            <option key={aT.id} value={aT.id}>
                                              {aT.name}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              )}

                            {wtc === "CHARGECONSTRAINT" && (
                              <div class="row g-3 mb-3 mt-2 align-items-center">
                                <div class="col-auto">
                                  <label
                                    for="inputPassword6"
                                    class="col-form-label"
                                  >
                                    Over the period :{" "}
                                  </label>
                                </div>

                                <div class="col-6 gap-1">
                                  <strong> Day </strong>{" "}
                                  <small>(Example: 0-30)</small>
                                  <input
                                    type="number"
                                    className="form-control"
                                    maxLength={3}
                                    max={100}
                                    min={1}
                                    value={periodStart}
                                    placeholder="Enter number (1-100)"
                                    onChange={(e) =>
                                      setPeriodStart(e.target.value)
                                    }
                                  />
                                  <strong> - </strong>
                                  <strong> Day </strong>
                                  <input
                                    type="number"
                                    className="form-control"
                                    maxLength={3}
                                    max={100}
                                    min={1}
                                    value={periodEnd}
                                    placeholder="Enter number (1-100)"
                                    onChange={(e) =>
                                      setPeriodEnd(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                    </section>
                    <section className="step-cont d-none">
                      <div className="row">
                        <div className="overflow-visible">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0 text-uppercase">
                              Recipient List
                            </p>
                          </div>
                          {responseData.length === 0 && (
                            <div className={"alert alert-danger text-danger"}>
                              <p>No valid recipients !</p>
                            </div>
                          )}
                          <table
                            className="table align-middle table-hover contacts-table table-striped "
                            id="datatable-buttons"
                          >
                            <thead className="table-light">
                              {responseData.length > 0 &&
                                responseData.length <= 5 && (
                                  <>
                                    {recipient === "PREMISE" && (
                                      <>
                                        <tr>
                                          <th width="8px">Select</th>
                                          <th span={"col-6"}>Tenant Type</th>
                                          <th span={"col-3"}>Name</th>
                                          <th span={"col-3"}>Email</th>
                                        </tr>
                                      </>
                                    )}
                                    {recipient === "LANDLORD" && (
                                      <>
                                        <tr>
                                          <th width="8px">Select</th>
                                          <th span={"col-6"}>Landlord Type</th>
                                          <th span={"col-3"}>Name</th>
                                          <th span={"col-3"}>Email</th>
                                        </tr>
                                      </>
                                    )}
                                    {recipient === "TENANT" && (
                                      <>
                                        <tr>
                                          <th width="8px">Select</th>
                                          <th span={"col-6"}>Tenant Type</th>
                                          <th span={"col-3"}>Name</th>
                                          <th span={"col-3"}>Email</th>
                                        </tr>
                                      </>
                                    )}
                                  </>
                                )}
                            </thead>
                            <tbody>
                              {responseData?.length > 0 && (
                                <>
                                  <>
                                    {responseData?.map((item) => (
                                      <>
                                        {recipient === "LANDLORD" && (
                                          <tr key={item.id}>
                                            <td>
                                              <div className="d-flex  align-items-center">
                                                <div className="the-mail-checkbox pr-4">
                                                  <input
                                                    className="form-check-input mt-0 pt-0 form-check-dark"
                                                    type="checkbox"
                                                    id="formCheck1"
                                                    onChange={(e) =>
                                                      selectResponseItems(
                                                        e,
                                                        item.id
                                                      )
                                                    }
                                                    checked={validIds.some(
                                                      (el) => el === item.id
                                                    )}
                                                  />
                                                </div>
                                              </div>
                                            </td>
                                            <td>{item.landLordType}</td>
                                            <td className="text-capitalize">
                                              <a href="javascript:void(0)">
                                                {item.firstName} {item.lastName}
                                              </a>
                                            </td>
                                            <td>{item.email}</td>
                                          </tr>
                                        )}
                                        {recipient === "PREMISE" && (
                                          <>
                                            {bulkMessage.messageKind ===
                                              "BALANCE_REMINDER" && (
                                              <tr
                                                key={item?.tenancy?.tenant?.id}
                                              >
                                                <td>
                                                  <div className="d-flex  align-items-center">
                                                    <div className="the-mail-checkbox pr-4">
                                                      <input
                                                        className="form-check-input mt-0 pt-0 form-check-dark"
                                                        type="checkbox"
                                                        id="formCheck1"
                                                        onChange={(e) =>
                                                          selectResponseItems(
                                                            e,
                                                            item?.tenancy
                                                              ?.tenant?.id
                                                          )
                                                        }
                                                        checked={validIds.some(
                                                          (el) =>
                                                            el ===
                                                            item?.tenancy
                                                              ?.tenant?.id
                                                        )}
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td>
                                                  {
                                                    item?.tenancy?.tenant
                                                      ?.tenantType
                                                  }
                                                </td>
                                                <td className="text-capitalize">
                                                  <a href="javascript:void(0)">
                                                    {item?.tenancy?.tenant
                                                      ?.tenantType ===
                                                    "INDIVIDUAL" ? (
                                                      <>
                                                        {item?.tenancy?.tenant
                                                          ?.firstName + " "}
                                                        {item?.tenancy?.tenant
                                                          ?.lastName + " "}{" "}
                                                        {
                                                          item?.tenancy?.tenant
                                                            ?.otherName
                                                        }
                                                      </>
                                                    ) : (
                                                      <>
                                                        {item?.tenancy?.tenant
                                                          ?.companyName + " "}
                                                      </>
                                                    )}
                                                  </a>
                                                </td>
                                                <td>
                                                  {item?.tenancy?.tenant?.email}
                                                </td>
                                              </tr>
                                            )}
                                          </>
                                        )}
                                        {recipient === "PREMISE" && (
                                          <>
                                            {bulkMessage.messageKind ===
                                              "CUSTOM" && (
                                              <tr key={item.id}>
                                                <td>
                                                  <div className="d-flex  align-items-center">
                                                    <div className="the-mail-checkbox pr-4">
                                                      <input
                                                        className="form-check-input mt-0 pt-0 form-check-dark"
                                                        type="checkbox"
                                                        id="formCheck1"
                                                        onChange={(e) =>
                                                          selectResponseItems(
                                                            e,
                                                            item.id
                                                          )
                                                        }
                                                        checked={validIds.some(
                                                          (el) => el === item.id
                                                        )}
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td>{item.tenantType}</td>
                                                <td className="text-capitalize">
                                                  <a href="javascript:void(0)">
                                                    {item?.tenantType ===
                                                    "INDIVIDUAL" ? (
                                                      <>
                                                        {item.firstName + " "}
                                                        {item.lastName +
                                                          " "}{" "}
                                                        {item.otherName}
                                                      </>
                                                    ) : (
                                                      <>
                                                        {item.companyName + " "}
                                                      </>
                                                    )}
                                                  </a>
                                                </td>
                                                <td>{item.email}</td>
                                              </tr>
                                            )}
                                          </>
                                        )}
                                        {recipient === "TENANT" && (
                                          <>
                                            {bulkMessage.messageKind ===
                                              "BALANCE_REMINDER" && (
                                              <tr
                                                key={item?.tenancy?.tenant?.id}
                                              >
                                                <td>
                                                  <div className="d-flex  align-items-center">
                                                    <div className="the-mail-checkbox pr-4">
                                                      <input
                                                        className="form-check-input mt-0 pt-0 form-check-dark"
                                                        type="checkbox"
                                                        id="formCheck1"
                                                        onChange={(e) =>
                                                          selectResponseItems(
                                                            e,
                                                            item?.tenancy
                                                              ?.tenant?.id
                                                          )
                                                        }
                                                        checked={validIds.some(
                                                          (el) =>
                                                            el ===
                                                            item?.tenancy
                                                              ?.tenant?.id
                                                        )}
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td>
                                                  {
                                                    item?.tenancy?.tenant
                                                      ?.tenantType
                                                  }
                                                </td>
                                                <td className="text-capitalize">
                                                  <a href="javascript:void(0)">
                                                    {item?.tenancy?.tenant
                                                      ?.tenantType ===
                                                    "INDIVIDUAL" ? (
                                                      <>
                                                        {item?.tenancy?.tenant
                                                          ?.firstName + " "}
                                                        {item?.tenancy?.tenant
                                                          ?.lastName + " "}{" "}
                                                        {
                                                          item?.tenancy?.tenant
                                                            ?.otherName
                                                        }
                                                      </>
                                                    ) : (
                                                      <>
                                                        {item?.tenancy?.tenant
                                                          ?.companyName + " "}
                                                      </>
                                                    )}
                                                  </a>
                                                </td>
                                                <td>
                                                  {item?.tenancy?.tenant?.email}
                                                </td>
                                              </tr>
                                            )}
                                          </>
                                        )}
                                        {recipient === "TENANT" && (
                                          <>
                                            {bulkMessage.messageKind ===
                                            "CUSTOM" ? (
                                              <>
                                                <tr key={item.id}>
                                                  <td>
                                                    <div className="d-flex  align-items-center">
                                                      <div className="the-mail-checkbox pr-4">
                                                        <input
                                                          className="form-check-input mt-0 pt-0 form-check-dark"
                                                          type="checkbox"
                                                          id="formCheck1"
                                                          onChange={(e) =>
                                                            selectResponseItems(
                                                              e,
                                                              item.id
                                                            )
                                                          }
                                                          checked={validIds.some(
                                                            (el) =>
                                                              el === item.id
                                                          )}
                                                        />
                                                      </div>
                                                    </div>
                                                  </td>
                                                  <td>{item.tenantType}</td>
                                                  <td className="text-capitalize">
                                                    <a href="javascript:void(0)">
                                                      {item?.tenantType ===
                                                      "INDIVIDUAL" ? (
                                                        <>
                                                          {item.firstName + " "}
                                                          {item.lastName +
                                                            " "}{" "}
                                                          {item.otherName}
                                                        </>
                                                      ) : (
                                                        <>
                                                          {item.companyName +
                                                            " "}
                                                        </>
                                                      )}
                                                    </a>
                                                  </td>
                                                  <td>{item.email}</td>
                                                </tr>
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </>
                                        )}
                                      </>
                                    ))}
                                  </>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="bg-primary border-2 bg-soft p-3 mb-4">
                          <p className="fw-semibold mb-0 pb-0 text-uppercase">
                            Message Template
                          </p>
                        </div>
                      </div>
                      {bulkMessage.messageType !== "SMS" && (
                        <div className="col-lg-12">
                          <div className="mb3">
                            <label
                              htmlFor="landlord-type"
                              className="form-label"
                            >
                              Email Subject.{" "}
                              <strong className="text-danger">*</strong>
                            </label>
                            <div className="form-group mb-4">
                              <input
                                placeholder="Write your subject"
                                id={"subject"}
                                name={"subject"}
                                className="form-control"
                                onChange={(e) => setSubject(e.target.value)}
                                required={true}
                              ></input>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="col-lg-12">
                        <div className="mb3">
                          <label htmlFor="landlord-type" className="form-label">
                            Message Template.{" "}
                            <strong className="text-danger">*</strong>
                          </label>
                          <div className="form-group mb-4">
                            <textarea
                              placeholder="Write your message"
                              id=""
                              cols="30"
                              rows="5"
                              name={"templatedMessage"}
                              className="form-control"
                              onChange={(e) => handleChange(e)}
                              required={true}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className="button-navigators mt-3">
                    <button
                      disabled
                      className="btn btn-primary waves-effect kev-prev me-2"
                    >
                      <i className="mdi-arrow-left mdi font-16px ms-2 me-2"></i>
                      Previous
                    </button>
                    <button
                      className="btn btn-primary waves-effect kev-nxt me-2"
                      disabled={recipient === ""}
                      onClick={handleSubmit}
                    >
                      Next{" "}
                      <i className="mdi mdi-arrow-right font-16px ms-2 me-2"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-success kev-submit me-2 d-none"
                      disabled={!regex.test(bulkMessage.templatedMessage)}
                      onClick={handleSubmit}
                    >
                      Submit
                      <i className="mdi mdi-check-all me-2 font-16px"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {error.color !== "" && (
            <div className={"alert alert-" + error.color} role="alert">
              {error.message}
            </div>
          )}
        </div>
        <footer className="footer ">
          <div className="container-fluid ">
            <div className="row ">
              <div className="col-sm-6 ">
                <script>document.write(new Date().getFullYear())</script>©
                RevenueSure
              </div>
              <div className="col-sm-6 ">
                <div className="text-sm-end d-sm-block ">
                  A product of Nouveta LTD
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default BulkMessaging;
