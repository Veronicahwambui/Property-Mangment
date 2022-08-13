/* global $ */
import React, { useState, useEffect } from "react";
import requestsServiceService from "../../services/requestsService.service";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function CreateInvoice() {
  const [tenants, setTenants] = useState([]);

  // tenant details
  const [tenantId, settenantId] = useState(null);
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
  const [tenancyId, settenancyId] = useState(null);
  const [applicableChargeName, setapplicableChargeName] = useState("");
  const [applicableCharges, setapplicableCharges] = useState([]);
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  const navigate = useNavigate();

  setTimeout(function() {
    $("#subscribeModal").modal("show")
}, 0);

  useEffect(() => {
    getTenants();
    requestsServiceService.allApplicableCharges().then((res) => {
      setapplicableCharges(res.data.data);
    });
  }, [tenancyId]);
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
    };
    requestsServiceService.getAllTenants(page, size, data).then((res) => {
      console.log(res);
      setTenants(res.data.data);
    });
  };
  const getId = (y) => {
    requestsServiceService.getTenant(y).then((res) => {
      let temp = res.data.data.tenancies;
      settenancies(temp);
    });
  };

  const autofill = (x) => {
    getId(x);
    let sel = tenants.find((tenant) => tenant.id === parseInt(x));
    let email = sel?.email;
    let phone = sel?.phoneNumber;
    let name = sel?.firstName;
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
    console.log(data);
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
      <div>
      {/* the tenant modal */}
      <div className="modal fade" id="subscribeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
            <div className="modal-header border-bottom-0 d-none">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
                <div className="text-center mb-4 pt-2">
                    <div className="avatar-md mx-auto mb-4 ">
                        <div className="avatar-title bg-light rounded-circle text-primary h1 ">
                            <i className="mdi mdi-account-details "></i>
                        </div>
                    </div>

                    <div className="row justify-content-center ">
                        <div className="col-xl-10 ">
                            <h4 className="text-primary ">Search for Tenant</h4>
                            <p className="text-muted font-size-14 mb-4 ">
                              Search for the tenant and procede with creating the invoice                           
                            </p>

                            <form>
                                <div className="row text-capitalize">
                                    <div className="col-12">
                                        <div className="mb-3 ">
                                            <label for="digit1-input " className="visually-hidden ">First Name.</label>
                                            <input type="text " className="form-control form-control-lg  text-center two-step " placeholder="Enter first Name"/>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="mb-3 ">
                                            <label for="digit1-input " className="visually-hidden ">Other Names.</label>
                                            <input type="text " className="form-control form-control-lg  text-center two-step " placeholder="Enter the other names"/>
                                        </div>
                                    </div>
                                    
                                </div>
                                <button className="btn btn-primary btn-block mt-3 text-center w-100 d-flex  align-items-center justify-content-center">
                                    <i className="mdi mdi-account-search font-size-20 align-middle me-2 "></i>
                                    Search
                                </button>


                            </form>


                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-body d-none">
            <h4 className="pb-4 pt-2">Seacrh Results</h4>
            <table className="table align-middle table-nowrap table-hover dt-responsive contacts-table" id="datatable-buttons">
              <thead className="table-light">
                  <tr>

                      <th width="8px" scope="col">
                          
                      </th>
                      <th scope="col">#</th>
                      <th scope="col">Tenant</th>
                      <th scope="col">Premises</th>
                      <th scope="col">Hse/Unit No.</th>           
                  </tr>
              </thead>
                <tbody>
                    <tr>

                      <td>
                          <div className="d-flex  align-items-center">
                              <div className="the-mail-checkbox pr-4">
                                  <input className="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1"/>
                              </div>

                          </div>
                      </td>
                      <td className="text-capitalize">1</td>
                      <td className="text-capitalize">
                          <a href="property-details.html" title="View Details">Kelvin Thuku</a>
                      </td>
                      <td>
                          <h5 className="font-size-14 mb-1"><a href="landlord-details.html" className="text-dark">Mania Apartments</a></h5>

                      </td>
                      <td>
                          410
                      </td>
                      
                      
                    </tr>
                    <tr>

                      <td>
                          <div className="d-flex  align-items-center">
                              <div className="the-mail-checkbox pr-4">
                                  <input className="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1"/>
                              </div>

                          </div>
                      </td>
                      <td className="text-capitalize">2</td>
                      <td className="text-capitalize">
                          <a href="property-details.html" title="View Details">Kelvin Thuku</a>
                      </td>
                      <td>
                          <h5 className="font-size-14 mb-1"><a href="landlord-details.html" className="text-dark">Mania Apartments</a></h5>

                      </td>
                      <td>
                          410
                      </td>
                      
                      
                    </tr>
                    <tr>

                      <td>
                          <div className="d-flex  align-items-center">
                              <div className="the-mail-checkbox pr-4">
                                  <input className="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1"/>
                              </div>

                          </div>
                      </td>
                      <td className="text-capitalize">3</td>
                      <td className="text-capitalize">
                          <a href="property-details.html" title="View Details">Kelvin Thuku</a>
                      </td>
                      <td>
                          <h5 className="font-size-14 mb-1"><a href="landlord-details.html" className="text-dark">Mania Apartments</a></h5>

                      </td>
                      <td>
                          410
                      </td>
                      
                      
                    </tr>
                    <tr>

                      <td>
                          <div className="d-flex  align-items-center">
                              <div className="the-mail-checkbox pr-4">
                                  <input className="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1"/>
                              </div>

                          </div>
                      </td>
                      <td className="text-capitalize">4</td>
                      <td className="text-capitalize">
                          <a href="property-details.html" title="View Details">Kelvin Thuku</a>
                      </td>
                      <td>
                          <h5 className="font-size-14 mb-1"><a href="landlord-details.html" className="text-dark">Mania Apartments</a></h5>

                      </td>
                      <td>
                          410
                      </td>
                      
                      
                    </tr>
                </tbody>
                </table>
                <div className="col-12 d-flex justify-content-end">
                  <button className="btn btn-primary">Continue</button>
                </div>
              </div>
          </div>
      </div>
  </div>

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
                                    {tenants && (
                                      <div className="form-group mb-4">
                                        <select
                                          class="form-control"
                                          title="Select tenant"
                                          data-live-search="true"
                                          value={tenantId}
                                          onChange={(e) =>
                                            autofill(e.target.value)
                                          }
                                          required={true}
                                        >
                                          <option className="text-black font-semibold ">
                                            select tenant...
                                          </option>
                                          {tenants.map((item, index) => (
                                            <option value={parseInt(item.id)}>
                                              {check(item)}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
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
                                    {tenancies && (
                                      <div className="form-group mb-4">
                                        <select
                                          class="form-control"
                                          title="Select tenant"
                                          data-live-search="true"
                                          value={tenancyId}
                                          onChange={(e) =>
                                            settenancyId(e.target.value)
                                          }
                                          required={true}
                                        >
                                          <option className="text-black font-semibold ">
                                            select tenancy
                                          </option>
                                          {tenancies.map((item, index) => (
                                            <option value={parseInt(item.id)}>
                                              {item.premiseUnit?.unitName +
                                                " - " +
                                                item.premiseUnit?.unitType.name}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-12">
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
                                          data-live-search="true"
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
                                              <option value={item.name}>
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
                                    Title.{" "}
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
                                    placeholder="Enter invoice title"
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
                                  onChange={(e) =>
                                    setdescription(e.target.value)
                                  }
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
                                  <div className="mb-3">
                                    <label
                                      htmlFor="formrow-password-input"
                                      className="form-label"
                                    >
                                      Unit cost.{" "}
                                      <strong className="text-danger">*</strong>
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
                                  <div className="mb-4">
                                    <label htmlFor="" className="">
                                      Due date
                                    </label>
                                    <div
                                      className="input-group"
                                      id="datepicker1"
                                    >
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
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="formrow-password-input"
                                      className="form-label"
                                    >
                                      Invoice amount.{" "}
                                      <strong className="text-danger">*</strong>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control invoice-amount"
                                      value={"KES " + total}
                                      onChange={(e) => settotal(e.target.value)}
                                      id="formrow-password-input"
                                      placeholder="KES"
                                      required={true}
                                      disabled={true}
                                    />
                                  </div>
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

export default CreateInvoice;
