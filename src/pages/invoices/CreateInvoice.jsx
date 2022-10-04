/* global $ */
import React, { useState, useEffect } from "react";
import requestsServiceService from "../../services/requestsService.service";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Modal, ModalFooter } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
function CreateInvoice() {
  const [tenants, setTenants] = useState([]);

  // tenant details
  const [tenantId, settenantId] = useState(undefined);
  const [tenantEmail, settenantEmail] = useState("");
  const [tenantPhone, settenantPhone] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [total, settotal] = useState("");
  const [unitcost, setunitcost] = useState(0);
  const [chargetitle, setchargetitle] = useState("");
  const [quantity, setquantity] = useState(0);
  const [custname, setcustname] = useState("");
  const [tenancies, settenancies] = useState([]);
  const [tenancyId, settenancyId] = useState(undefined);
  const [applicableChargeName, setapplicableChargeName] = useState("");
  const [applicableCharges, setapplicableCharges] = useState([]);
  const [expectManualValues, setexpectManualValues] = useState(true);
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [auctioneers, setAuctioneers] = useState([]);
  const [invoiceFor, setInvoiceFor] = useState(undefined);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setloaded(false);
    setError({
      ...error,
      message: "",
      color: "",
    });
  };
  useEffect(() => {
    requestsServiceService.allApplicableCharges().then((res) => {
      setapplicableCharges(res.data.data);
    });
    requestsServiceService.getAuctioneer().then(({ data }) => {
      setAuctioneers(data.data);
    });
  }, []);
  useEffect(() => {
    if (invoiceFor) {
      requestsServiceService.allApplicableCharges(invoiceFor).then((res) => {
        setapplicableCharges(res.data.data);
      });
    }
  }, [invoiceFor]);

  useEffect(() => {
    let found = applicableCharges.find((x) => x.name === applicableChargeName);
    if (found !== undefined) setexpectManualValues(found.expectManualValues);
  }, [applicableChargeName]);

  useEffect(() => {
    getTotalKsh();
  }, [quantity, unitcost]);

  const getTotalKsh = () => {
    if (quantity && unitcost) {
      settotal(quantity * unitcost);
    }
  };

  const getTenants = () => {
    let page = 0,
      size = 100;
    let data = {
      dateCreatedStart: moment().startOf("year").format("YYYY-MM-DD"),
      dateCreatedEnd: moment(new Date()).format("YYYY-MM-DD"),
      search: tenantName?.toLowerCase().trim(),
    };
    requestsServiceService
      .getAllTenants(tenantName, page, size, data)
      .then((res) => {
        setTenants(res.data.data);
        setloading2(false);
        setfetched(true);
      });
  };

  const [show, setshow] = useState(true);
  const showTenantModal = () => setshow(true);
  const closeTenantModal = () => setshow(false);
  const [loading, setloading] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [fetched, setfetched] = useState(false);

  const getId = (y) => {
    requestsServiceService
      .getTenant(y)
      .then((res) => {
        let temp = res.data.data.tenancies;
        if (res.data?.data?.tenancies?.length > 0) {
          if (temp.length === 1) {
            settenancyId(res.data.data.tenancies[0]?.id);
            settenancies(temp);
            setloading(false);
            setloaded(true);
            setIsChecked(true);
          } else {
            settenancies(temp);
            setloading(false);
            setloaded(true);
            setIsChecked(true);
            setError({
              ...error,
              message: "",
              color: "",
            });
          }
        } else {
          setloading(false);
          setError({
            ...error,
            message: "Tenant has no tenancies!",
            color: "danger",
          });
        }
      })
      .catch((err) => {
        setloading(false);
        setError({
          ...error,
          message: "Tenant has no tenancies!",
          color: "danger",
        });
      });
  };
  const handleSubmit = (e) => {
    setfetched(false);
    e.preventDefault();
    setError({
      ...error,
      message: "",
      color: "",
    });
    setloaded(false);
    setloading2(true);
    getTenants();
  };
  const redirectToInvoices = () => {
    window.location.href = "/#/invoices";
  };
  const [tenantName, setTenantName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {}, [tenants, isChecked, custname]);
  const autofill = (x) => {
    setfetched(false);
    setloaded(false);
    setloading(true);
    getId(x);
    let sel = tenants.find((tenant) => tenant.id === parseInt(x));
    let email = sel?.email;
    let phone = sel?.phoneNumber;
    let name =
      sel.tenantType === "INDIVIDUAL"
        ? sel?.firstName + sel?.lastName
        : sel?.companyName;
    settenantId(x);
    settenantEmail(email);
    settenantPhone(phone);
    setcustname(name);
  };

  const submitInvoice = (event) => {
    event.preventDefault();
    let data = {
      applicableChargeName: applicableChargeName,
      billAmount: total,
      invoiceDate: date,
      parentTransactionId: null,
      quantity: parseInt(quantity),
      tenancyId: parseInt(tenancyId),
      transactionCustomerEmail: tenantEmail,
      transactionCustomerName: custname,
      transactionDescription: description,
      transactionTitle: chargetitle,
      unitCost: unitcost,
    };
    requestsServiceService
      .createInvoice(data)
      .then((res) => {
        if (res.data.status === true) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
          setTimeout(() => {
            navigate("/invoices", { replace: true });
          }, 2000);
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "danger",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setError({
          ...error,
          message: err.response.data.message,
          color: "danger",
        });
      });
    setTimeout(() => {
      setError({
        ...error,
        message: "",
        color: "",
      });
    }, 3500);
  };

  const addDate = (date) => {
    setdate(new Date(date.target.value).toISOString());
  };
  const check = (x) => {
    if (x.tenantType === "INDIVIDUAL") {
      return x.firstName + " " + x.lastName;
    } else {
      return x.companyName;
    }
  };
  $(document).on("change", ".enddate", addDate);
  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18 text-capitalize">
                  New Invoice
                </h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/">Invoices</a>
                    </li>
                    <li className="breadcrumb-item active">Create Invoice</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 ">
              <div className="card p-5">
                <div className="card-body ">
                  <div className="row d-flex align-items-center justify-content-center ">
                    <div className="col-sm-12 col-md-7 col-lg-6">
                      <div className="d-flex justify-items-center align-items-center">
                        <div className="card-body border-1 invoice-form p-5">
                          <h4 className="card-title mb-4">
                            Enter the invoice details below
                          </h4>
                          <form onSubmit={submitInvoice}>
                            {/*<div className="row">*/}
                            {/*  <div className=" col-12 ">*/}
                            {/*    <div className="mb-4 ">*/}
                            {/*      <label className="text-capitalize ">Whose is this*/}
                            {/*        invoice for?</label>*/}
                            {/*      <div className="row ">*/}
                            {/*        <div className="col-auto ">*/}
                            {/*          <div className="form-check mb-3">*/}
                            {/*            <input className="form-check-input"*/}
                            {/*                   value="tenant" type="radio"*/}
                            {/*                   name="invoice-for"*/}
                            {/*                   id="tenant-invoice"/>*/}
                            {/*              <label className="form-check-label"*/}
                            {/*                     htmlFor="tenant-invoice">*/}
                            {/*                A Tenant*/}
                            {/*              </label>*/}
                            {/*          </div>*/}
                            {/*        </div>*/}
                            {/*      </div>*/}
                            {/*    </div>*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                            <div className="row tenant-invoice-container invoice-options">
                              <div className="col-12">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-firstname-input"
                                    className="form-label"
                                  >
                                    Tenant.{" "}
                                    <strong className="text-danger">*</strong>
                                  </label>
                                  <div className="form-group mb-4">
                                    <input
                                      type="text"
                                      disabled={true}
                                      className="form-control"
                                      value={custname}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="" className="form-label">
                                    Tenant's Email
                                  </label>
                                  <input
                                    type={"text"}
                                    className="form-control"
                                    value={tenantEmail}
                                    placeholder={`${tenantEmail}`}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-password-input"
                                    className="form-label"
                                  >
                                    Tenant's Phone
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-password-input"
                                    value={tenantPhone}
                                    placeholder={`${tenantPhone}`}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-firstname-input"
                                    className="form-label"
                                  >
                                    Tenancy.{" "}
                                    <strong className="text-danger">*</strong>
                                  </label>
                                  {tenancies?.length === 1 && (
                                    <>
                                      <div className="form-group mb-4">
                                        <select
                                          className="form-control"
                                          value={tenancyId}
                                          required={true}
                                          disabled
                                        >
                                          {tenancies?.map((item, index) => (
                                            <>
                                              {item.active && (
                                                <option
                                                  value={parseInt(item.id)}
                                                  key={item.id}
                                                >
                                                  {item.premiseUnit?.unitName +
                                                    " - " +
                                                    item.premiseUnit?.unitType
                                                      .name}
                                                </option>
                                              )}
                                            </>
                                          ))}
                                        </select>
                                      </div>
                                    </>
                                  )}
                                  {tenancies?.length > 1 && (
                                    <div className="form-group mb-4">
                                      <select
                                        class="form-control"
                                        title="Select tenant"
                                        value={tenancyId}
                                        onChange={(e) =>
                                          settenancyId(e.target.value)
                                        }
                                        required={true}
                                      >
                                        <option className="text-black font-semibold ">
                                          select tenancy
                                        </option>
                                        {tenancies?.map((item, index) => (
                                          <>
                                            {item.active && (
                                              <option
                                                value={parseInt(item.id)}
                                                key={item.id}
                                              >
                                                {item.premiseUnit?.unitName +
                                                  " - " +
                                                  item.premiseUnit?.unitType
                                                    .name}
                                              </option>
                                            )}
                                          </>
                                        ))}
                                      </select>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="row col-12">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-firstname-input"
                                    className="form-label"
                                  >
                                    Applicable charge.{" "}
                                    <strong className="text-danger">*</strong>
                                  </label>
                                  {applicableCharges && (
                                    <div className="form-group mb-4">
                                      <select
                                        class="form-control"
                                        title="Select tenant"
                                        value={applicableChargeName}
                                        onChange={(e) =>
                                          setapplicableChargeName(
                                            e.target.value
                                          )
                                        }
                                        required={true}
                                      >
                                        <option className="text-black font-semibold ">
                                          select applicable charge
                                        </option>
                                        {applicableCharges.map(
                                          (item, index) => (
                                            <option
                                              value={item.name}
                                              key={index}
                                            >
                                              {item.name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="mb-3">
                                <label
                                  htmlFor="formrow-email-input"
                                  className="form-label"
                                >
                                  Invoice Period.{" "}
                                  <strong className="text-danger">*</strong>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="formrow-email-input"
                                  value={chargetitle}
                                  onChange={(e) =>
                                    setchargetitle(e.target.value)
                                  }
                                  placeholder="Enter Invoice Period"
                                  required={true}
                                />
                              </div>
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="formrow-firstname-input tenant-description"
                                className="form-label"
                              >
                                Description.{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <textarea
                                name=""
                                id=""
                                cols="30"
                                rows="5"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                                className="form-control"
                                required={true}
                              />
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-email-input"
                                    className="form-label"
                                  >
                                    Quantity.{" "}
                                    <strong className="text-danger">*</strong>
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={quantity}
                                    min="1"
                                    onChange={(e) =>
                                      setquantity(e.target.value)
                                    }
                                    placeholder="Enter quantity"
                                    required={true}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-4">
                                  <label htmlFor="" className="">
                                    Due date
                                  </label>
                                  <div className="input-group" id="datepicker1">
                                    <input
                                      type="text"
                                      className="form-control mouse-pointer enddate"
                                      name="dob"
                                      placeholder="Select Date"
                                      readOnly
                                      data-date-format="dd M, yyyy"
                                      data-date-container="#datepicker1"
                                      data-provide="datepicker"
                                      data-date-autoclose="true"
                                    />
                                    <span className="input-group-text">
                                      <i className="mdi mdi-calendar"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                {expectManualValues && (
                                  <>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="formrow-password-input"
                                          className="form-label"
                                        >
                                          Unit cost.{" "}
                                          <strong className="text-danger">
                                            *
                                          </strong>
                                        </label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          value={unitcost}
                                          min="1"
                                          onChange={(e) =>
                                            setunitcost(e.target.value)
                                          }
                                          placeholder="Enter cost"
                                          required={true}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="formrow-password-input"
                                          className="form-label"
                                        >
                                          Invoice amount.{" "}
                                          <strong className="text-danger">
                                            *
                                          </strong>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control invoice-amount"
                                          value={"KES " + total}
                                          onChange={(e) =>
                                            settotal(e.target.value)
                                          }
                                          id="formrow-password-input"
                                          placeholder="KES"
                                          required={true}
                                          disabled={true}
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}{" "}
                                {applicableChargeName != "" &&
                                expectManualValues ? (
                                  <span className="alert alert-warning">
                                    This charge expects a unit cost entry
                                  </span>
                                ) : (
                                  <span className="alert alert-warning">
                                    This charge will charge the default values
                                    set for the property
                                  </span>
                                )}
                              </div>
                            </div>
                            <div>
                              <button
                                type="submit"
                                className="btn btn-primary w-md invoice-btn"
                              >
                                Submit
                              </button>
                            </div>
                            <br />
                            {error.color !== "" && (
                              <div
                                className={"alert alert-" + error.color}
                                role="alert"
                              >
                                {error.message}
                              </div>
                            )}
                          </form>
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

      <Modal
        show={show}
        onHide={closeTenantModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header>
          <CloseButton aria-label="Hide" onClick={redirectToInvoices} />
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4 pt-2">
            <div className="avatar-md mx-auto mb-4 ">
              <div className="avatar-title bg-light rounded-circle text-primary h1 ">
                <i className="mdi mdi-account-details "></i>
              </div>
            </div>
            <div className="row justify-content-center ">
              <div className="col-xl-10">
                <h4 className="text-primary">Create invoice for</h4>

                <div className="form-group col-6 mx-auto app-search">
                  <select
                    name=""
                    id=""
                    className="form-control"
                    onChange={(e) => setInvoiceFor(e.target.value)}
                  >
                    <option value="">select invoice type </option>
                    <option value="TENANT">Tenant</option>
                    <option value="LANDLORD">Landlord</option>
                    <option value="AUCTIONEER">Auctioneer</option>
                  </select>
                </div>
              </div>
              {/* SEARCHING FUNCTIONALITY  */}
              {invoiceFor !== "AUCTIONEER" && invoiceFor !== "" && (
                <div className="col-xl-10 mb-0">
                  <h4 className="text-primary ">
                    Search for {invoiceFor}
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
                    Search for the {invoiceFor} and proceed with creating the
                    invoice
                  </p>
                  <div className="row text-capitalize">
                    <div className="col-12">
                      <div>
                        <form
                          id={"invoice-tenant-form"}
                          onSubmit={handleSubmit}
                          className="app-search d-lg-block p-2 d-block"
                        >
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search..."
                              onChange={(e) => setTenantName(e.target.value)}
                              required={true}
                            />
                            <span className="bx bx-search-alt"></span>
                          </div>
                        </form>
                      </div>
                      <div className="form-group">
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="text-end">
                            <button
                              form={"invoice-tenant-form"}
                              disabled={loading2}
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
                        {fetched && tenants.length < 1 && (
                          <span className={"text-danger"}>
                            Tenant not found!
                          </span>
                        )}
                        {fetched && tenants.length > 5 && (
                          <span className={"text-danger"}>
                            Too many results. Specify a tenant name
                          </span>
                        )}
                        <span className={"text-" + error.color}>
                          {error.message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {invoiceFor === "AUCTIONEER" && (
                <div className="col-8">
                  <div className="form-group app-search">
                    <label htmlFor="" className="text-primary">
                      {" "}
                      Auctioneer to Invoice{" "}
                    </label>
                    <select name="" id="" className="form-control mt-2">
                      <option value="">Select</option>
                    </select>
                  </div>
                </div>
              )}
              <div className="overflow-visible">
                <table
                  className="table align-middle table-hover contacts-table table-striped "
                  id="datatable-buttons"
                >
                  <thead className="table-light">
                    {tenants.length > 0 && tenants.length <= 5 && (
                      <tr>
                        <th width="8px">Select</th>
                        <th span={"col-6"}>Tenant Type</th>
                        <th span={"col-3"}>Name</th>
                        <th span={"col-3"}>Email</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {tenants.length > 0 && (
                      <>
                        {tenants.length <= 5 && (
                          <>
                            {tenants?.map((tenant) => (
                              <tr key={tenant.id}>
                                <td>
                                  <div className="d-flex  align-items-center">
                                    <div className="the-mail-checkbox pr-4">
                                      <input
                                        className="form-check-input mt-0 pt-0 form-check-dark"
                                        type="checkbox"
                                        id="formCheck1"
                                        onChange={() => {
                                          autofill(tenant.id);
                                        }}
                                        checked={
                                          loaded && tenant.id === tenantId
                                        }
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td>{tenant.tenantType}</td>
                                <td className="text-capitalize">
                                  <a href="javascript:void(0)">
                                    {tenant?.tenantType === "INDIVIDUAL" ? (
                                      <>
                                        {tenant.firstName + " "}
                                        {tenant.lastName + " "}{" "}
                                        {tenant.otherName}
                                      </>
                                    ) : (
                                      <>{tenant.companyName + " "}</>
                                    )}
                                  </a>
                                </td>
                                <td>{tenant.email}</td>
                              </tr>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
                <div
                  className="col-12 d-flex justify-content-end"
                  style={{ minHeight: "40px", maxHeight: "50px" }}
                >
                  {loaded && (
                    <button
                      className="btn btn-primary cursor-pointer"
                      type={"button"}
                      onClick={closeTenantModal}
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            </div>
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
    </>
  );
}

export default CreateInvoice;
