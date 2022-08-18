/* global $ */
import React, { useState, useEffect } from "react";
import requestsServiceService from "../../services/requestsService.service";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Modal, ModalFooter } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

function BulkMessaging() {
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
  const [show, setshow] = useState(true);
  const showTenantModal = () => setshow(true);
  const closeTenantModal = () => {
    clearModal();
    setshow(false);
  };
  const [loading2, setloading2] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [bulkMessage, setbulkMessage] = useState({
    aplicableChargeId: undefined,
    landlordIds: [],
    paid: "string",
    percentOf: "string",
    percentage: undefined,
    premiseIds: [],
    sendTo: "string",
    templatedMessage: "string",
    tenantIds: [],
    whoToCharge: "string",
  });
  useEffect(() => {
    console.log(bulkMessage);
  }, [selectedItems]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      aplicableChargeId: bulkMessage.aplicableChargeId,
      landlordIds: [],
      paid: bulkMessage.paid,
      percentOf: percentOf,
      percentage: parseInt(bulkMessage.percentage),
      premiseIds: [],
      sendTo: recipient,
      templatedMessage: "string",
      tenantIds: [],
      whoToCharge: wtc,
    };
    let result = selectedItems.map((a) => a.id);
    if (recipient === "TENANT") {
      Object.assign(data, { tenantIds: result });
      createBulkMessage(data);
    } else if (recipient === "LANDLORD") {
      Object.assign(data, { landlordIds: result });
      createBulkMessage(data);
    } else if (recipient === "PREMISE") {
      Object.assign(data, { premiseIds: result });
      createBulkMessage(data);
    }
  };
  const createBulkMessage = (x) => {
    requestsServiceService
      .createBulkMessage(x)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    console.log(selectedItems.some((el) => el.id === x.id));
    if (e.target.checked) {
      setselectedItems((selectedItems) => [...selectedItems, x]);
    } else {
      removeItems(x.id);
    }
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
    let dates = {
      dateCreatedEnd: moment("12/12/2022").format(),
      dateCreatedStart: moment("07/07/2022").format(),
    };
    if (recipient === "TENANT") {
      let s = {
        search: searchTerm,
      };
      let data = Object.assign(dates, s);
      getTenants(data);
    } else if (recipient === "LANDLORD") {
      let s = {
        landlordName: searchTerm,
      };
      let data = Object.assign(dates, s);
      getLandlords(data);
    } else if (recipient === "PREMISE") {
      let s = {
        premiseName: searchTerm,
      };
      let data = Object.assign(dates, s);
      getPremises(data);
    }
  };

  const getLandlords = (x) => {
    setloading2(true);
    requestsServiceService.getMessagingLandlords(x).then((res) => {
      setSearchResults(res.data.data);
      setloading(false);
      setloading2(false);
      setloaded(true);
    });
  };
  const getPremises = (x) => {
    setloading2(true);

    requestsServiceService.getMessagingPremises(x).then((res) => {
      setSearchResults(res.data.data);
      setloading(false);
      setloading2(false);
      setloaded(true);
    });
  };
  const getTenants = (x) => {
    setloading2(true);
    requestsServiceService.getMessagingTenants(x).then((res) => {
      setSearchResults(res.data.data);
      setloading(false);
      setloading2(false);
      setloaded(true);
    });
  };
  useEffect(() => {}, [loaded]);

  function handleChange(e) {
    setbulkMessage({
      ...bulkMessage,
      [e.target.name]: e.target.value,
    });
  }
  const [wtc, setWtc] = useState("");
  const [percentOf, setPercentOf] = useState("");

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
                    <li className="breadcrumb-item active">Bulk Messages</li>
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
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-primary waves-effect btn-label waves-light me-3"
                        onClick={showTenantModal}
                      >
                        <i className="mdi mdi-plus label-icon"></i> Send bulk
                        message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={closeTenantModal}
          backdrop="static"
          keyboard={false}
          size="lg"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div id="kev-step-form">
              <nav className="navbar navbar-expand-lg navbar-light bg-light d-none">
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
                        1. Landlord details{" "}
                        <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link">2. Account details</a>
                    </li>
                  </ul>
                </div>
              </nav>
              <section className={"step-cont active-step"}>
                <div className="text-center mb-4 pt-2">
                  <div className="avatar-md mx-auto">
                    <div className="avatar-title bg-light rounded-circle text-primary h1 ">
                      <i className="mdi mdi-email "></i>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-xl-10">
                      <h4 className="text-primary ">
                        Bulk Messaging
                        {/*<span style={{ marginLeft: "10px" }}>*/}
                        {/*  {loading && <i className="fa fa-refresh fa-spin" />}*/}
                        {/*  {loaded && (*/}
                        {/*    <>*/}
                        {/*      <i className="fa fa-check" />*/}
                        {/*    </>*/}
                        {/*  )}*/}
                        {/*</span>*/}
                      </h4>
                    </div>
                  </div>
                </div>
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
                      Recipient. <strong className="text-danger">*</strong>
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
                        <option className="text-black font-semibold " value="">
                          Select..
                        </option>
                        {["TENANT", "LANDLORD", "PREMISE"].map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
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
                              <div className="form-group">
                                <div className="d-flex align-items-center justify-content-center">
                                  <div className="text-end">
                                    <button
                                      type="button"
                                      onClick={searchItems}
                                      disabled={loading2 || recipient === ""}
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
                                      {" " + recipient.toLowerCase()} name!
                                    </span>
                                  )}
                                  <span className={"text-" + error.color}>
                                    {error.message}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={
                              "alert alert-grey d-flex align-items-center"
                            }
                          >
                            {selectedItems.length > 0 && (
                              <>
                                <Button variant="primary">
                                  Selected
                                  <Badge bg="light" className="ml-7px">
                                    ({selectedItems.length})
                                  </Badge>
                                </Button>
                              </>
                            )}
                            {selectedItems.length > 0 &&
                              selectedItems?.map((item) => (
                                <>
                                  {recipient === "LANDLORD" && (
                                    <>
                                      <div className="ml-7px" key={item.id}>
                                        <Badge bg="success">
                                          {item.firstName + " " + item.lastName}
                                        </Badge>
                                      </div>
                                    </>
                                  )}
                                  {recipient === "TENANT" && (
                                    <>
                                      <div className="ml-7px" key={item.id}>
                                        <Badge bg="success">
                                          {item.tenantType === "COMPANY" ? (
                                            <>{item.companyName}</>
                                          ) : (
                                            <>
                                              {item.firstName +
                                                " " +
                                                item.lastName}
                                            </>
                                          )}
                                        </Badge>
                                      </div>
                                    </>
                                  )}
                                  {recipient === "PREMISE" && (
                                    <>
                                      <div className="ml-7px" key={item.id}>
                                        <Badge bg="success">
                                          {item.premiseName}
                                        </Badge>
                                      </div>
                                    </>
                                  )}
                                </>
                              ))}
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
                                            <th span={"col-6"}>Premise Name</th>
                                            <th span={"col-3"}>Premise Type</th>
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
                                                          selectItems(e, item)
                                                        }
                                                        checked={selectedItems.some(
                                                          (el) =>
                                                            el.id === item.id
                                                        )}
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td>{item.landLordType}</td>
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
                                                          selectItems(e, item)
                                                        }
                                                        checked={selectedItems.some(
                                                          (el) =>
                                                            el.id === item.id
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
                                                    {item.premiseType?.name}
                                                  </a>
                                                </td>
                                                <td>
                                                  {item.premiseUseType?.name}
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
                                                          selectItems(e, item)
                                                        }
                                                        checked={selectedItems.some(
                                                          (el) =>
                                                            el.id === item.id
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
                                        ))}
                                      </>
                                    )}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                        <option value="ALLCURRENT">All Current</option>
                        <option value="CHARGECONSTRAINT">
                          Charge Constraint
                        </option>
                      </select>
                    </div>
                  </div>
                  {wtc === "CHARGECONSTRAINT" && (
                    <div className="row g-3 align-items-center">
                      <div className="col-auto">
                        <label className="col-form-label">Have paid:</label>
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
                          onChange={(e) => setPercentOf(e.target.value)}
                        >
                          <option>select..</option>
                          {["Full Period", "Specific Charge"].map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {percentOf === "Specific Charge" && (
                    <div className="col-12 mt-3">
                      <div className="row g-3 align-items-center">
                        <div className="col-auto">
                          <label className="col-form-label">
                            Charge <strong className="text-danger ">*</strong>
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
                </div>
              </section>
              <section className="step-cont d-none">
                <div className="col-12">
                  <div className="bg-primary border-2 bg-soft p-3 mb-4">
                    <p className="fw-semibold mb-0 pb-0 text-uppercase">
                      Message Template
                    </p>
                  </div>
                </div>
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
                disabled={recipient === "" || selectedItems.length === 0}
              >
                Next <i className="mdi mdi-arrow-right font-16px ms-2 me-2"></i>
              </button>
              <button
                type="button"
                className="btn btn-success kev-submit me-2 d-none"
                onClick={handleSubmit}
                // form={"my-form"}
              >
                Submit <i className="mdi mdi-check-all me-2 font-16px"></i>
              </button>
            </div>
          </Modal.Body>
        </Modal>
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
