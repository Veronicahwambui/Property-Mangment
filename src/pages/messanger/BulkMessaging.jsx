/* global $ */
import React, { useState, useEffect } from "react";
import requestsServiceService from "../../services/requestsService.service";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Modal, ModalFooter } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
function BulkMessaging() {
  const [recipient, setRecipient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedItems, setselectedItems] = useState([]);
  const [cont, setContinue] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {};
    console.log(data);
  };
  const selectItems = (e, x) => {
    if (e.target.checked) {
      setselectedItems((selectedItems) => [...selectedItems, x]);
    } else {
      removeItems(x.id);
    }
  };
  useEffect(() => {
    console.log(selectedItems);
  }, [recipient, selectedItems]);
  const removeItems = (x) => {
    setselectedItems([...selectedItems.filter((item) => item.id !== x)]);
  };

  const searchItems = () => {
    setselectedItems([]);
    setloading(true);
    let dates = {
      dateCreatedEnd: moment("12/12/2022").format(),
      dateCreatedStart: moment("07/07/2022").format(),
    };
    if (recipient === "TENANT") {
      let s = {
        tenantName: searchTerm,
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
    setSearchTerm("");
  };

  const getLandlords = (x) => {
    setloading2(true);
    requestsServiceService.getMessagingLandlords(x).then((res) => {
      setSearchResults(res.data.data);
      setloading(false);
      setloading2(false);
    });
  };
  const getPremises = (x) => {
    setloading2(true);

    requestsServiceService.getMessagingPremises(x).then((res) => {
      setSearchResults(res.data.data);
      setloading(false);
      setloading2(false);
    });
  };
  const getTenants = (x) => {
    setloading2(true);
    requestsServiceService.getMessagingTenants(x).then((res) => {
      setSearchResults(res.data.data);
      setloading(false);
      setloading2(false);
    });
  };
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  const [show, setshow] = useState(true);
  const showTenantModal = () => setshow(true);
  const closeTenantModal = () => setshow(false);
  const [loading2, setloading2] = useState(false);
  const [loaded, setloaded] = useState(false);
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
        <Modal.Header>
          {/*<CloseButton aria-label="Hide" onClick={redirectToInvoices} />*/}
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4 pt-2">
            <div className="avatar-md mx-auto mb-4 ">
              <div className="avatar-title bg-light rounded-circle text-primary h1 ">
                <i className="mdi mdi-account-details "></i>
              </div>
            </div>
            <div className="row justify-content-center ">
              <div className="col-xl-10 ">
                <h4 className="text-primary ">
                  Search for Tenant{" "}
                  <span style={{ marginLeft: "10px" }}>
                    {loading && <i className="fa fa-refresh fa-spin" />}
                    {loaded && (
                      <>
                        <i className="fa fa-check" />
                      </>
                    )}
                  </span>
                </h4>
                <p className="text-muted font-size-14 mb-4 ">
                  Search for the tenant and proceed with creating the invoice
                </p>
                <div className="row text-capitalize">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="">Recipient</label>
                      <select
                        name=""
                        id=""
                        value={recipient}
                        onChange={(e) => {
                          setSearchResults([]);
                          setRecipient(e.target.value);
                        }}
                      >
                        {/*<option value="TENANT">tenant</option>*/}
                        <option value="LANDLORD">landlord</option>
                        <option value="PREMISE">premises</option>
                      </select>
                    </div>
                    <div>
                      <form
                        id={"invoice-tenant-form"}
                        className="app-search d-none d-lg-block p-2 d-flex"
                      >
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <span className="bx bx-search-alt"></span>
                        </div>
                      </form>
                    </div>
                    <div className="form-group">
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="text-end">
                          <button
                            // form={"invoice-tenant-form"}
                            disabled={loading2}
                            onClick={searchItems}
                            className="btn btn-primary btn-rounded"
                            type="submit"
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
                    <div className={"mt-2 mb-2"}>
                      {searchTerm !== "" && searchResults.length < 1 && (
                        <span className={"text-danger"}>No records found!</span>
                      )}
                      <span className={"text-" + error.color}>
                        {error.message}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"alert alert-grey d-flex"}>
                {selectedItems.length > 0 &&
                  selectedItems?.map((item) => (
                    <span>
                      <i>{item.premiseName + ", "}</i>
                    </span>
                  ))}
              </div>
              <div className="overflow-visible">
                {!cont && (
                  <table
                    className="table align-middle table-hover contacts-table table-striped "
                    id="datatable-buttons"
                  >
                    <thead className="table-light">
                      {searchResults.length > 0 && searchResults.length <= 5 && (
                        <>
                          {recipient === "PREMISE" && (
                            <>
                              <tr>
                                <th width="8px">Select</th>
                                <th span={"col-6"}>Premise Name</th>
                                <th span={"col-3"}>Premise Type</th>
                                <th span={"col-3"}>Premise Use Type</th>
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
                                              // onChange={() => {
                                              //   autofill(tenant.id);
                                              // }}
                                              // checked={
                                              //   loaded && tenant.id === tenantId
                                              // }
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
                                      <td>{item.premiseUseType?.name}</td>
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
                )}
                <button onClick={() => setContinue(!cont)}>
                  {cont ? <>Go back</> : <>Continue</>}
                </button>
                {/*<div*/}
                {/*  className="col-12 d-flex justify-content-end"*/}
                {/*  style={{ minHeight: "40px", maxHeight: "50px" }}*/}
                {/*>*/}
                {/*  {loaded && (*/}
                {/*    <button*/}
                {/*      className="btn btn-primary cursor-pointer"*/}
                {/*      type={"button"}*/}
                {/*      onClick={closeTenantModal}*/}
                {/*    >*/}
                {/*      Continue*/}
                {/*    </button>*/}
                {/*  )}*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
          {cont && (
            <>
              <div className="form-group">
                <label htmlFor="">Enter message</label>
                <textarea name="" id="" cols="30" rows="10"></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="">Bulk balance reminder </label>
                <div className="d-flex">
                  <div>
                    <label htmlFor="">%</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label htmlFor="">Of</label>
                    <select name="" id="">
                      <option value="">VALUE</option>
                      <option value="">VALUE</option>
                      <option value="">VALUE</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="">Charge</label>
                <input type="text" />
              </div>
            </>
          )}
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
    </>
  );
}

export default BulkMessaging;
