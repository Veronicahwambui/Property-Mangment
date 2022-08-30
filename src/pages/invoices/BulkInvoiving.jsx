/* global $ */
import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import requestsServiceService from '../../services/requestsService.service';

function BulkInvoiving() {
  const [error, setError] = useState(undefined)
  const [invoiceFor, setInvoiceFor] = useState('')
  const [whoToCharge, setWhoToCharge] = useState(undefined)
  const [loading, setloading] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [premisesId, setPremisesId] = useState([]);
  // const [landlords, setLandlords] = useState([]);
  const [landlordsId, setLandlordsId] = useState([]);
  const [invoices, setInvoices] = useState([]);
  // const [tenants, setTenants] = useState([]);
  const [tenantsId, setTenantsID] = useState([]);
  const [tenancyList, setTenancyList] = useState([]);
  const [tenancies, setTenancies] = useState([]);
  const [selected, setSelected] = useState([]);
  const [paid, setPaid] = useState(undefined)
  const [periodStart, setPeriodStart] = useState(0)
  const [periodEnd, setPeriodEnd] = useState(30)
  const [next, setNext] = useState(true)
  const [percentage, setPercentage] = useState(undefined)
  const [percentOf, setPercentOf] = useState(undefined)
  const [aplicableCharges, setAplicableCharges] = useState([])
  const [aplicableChargeId, setAplicableChargeId] = useState(undefined)


  const [quantity, setquantity] = useState(0);
  const [billAmount, setbillAmount] = useState('');
  const [unitCost, setunitCost] = useState('');
  const [invoiceDate, setinvoiceDate] = useState('');
  const [invoiceTitle, setinvoiceTitle] = useState('');
  const [applicableChargeName, setApplicableChargeName] = useState('');


  useEffect(() => {
    requestsServiceService.allApplicableCharges().then((res) => {
      setAplicableCharges(res.data.data)
    })
  }, [])


  useEffect(() => {
    setbillAmount(unitCost * quantity);
  }, [unitCost, quantity])

  const handleInvoiceFor = (e) => {
    setInvoiceFor(e.target.value);

  }

  if (invoiceFor !== "") {
    $('#invoiceFor').attr('disabled', 'disabled');
  } else {
    $('#invoiceFor').removeAttr('disabled');

  }

  const search = () => {
    setloading(true)
    let endDate = new Date()
    let startDate = "2022-01-01"
    let page = 0
    let size = 10


    if (invoiceFor == "PREMISE") {
      // SEARCH PREMISE
      let data = {
        "dateCreatedEnd": moment(endDate).format("YYYY-MM-DD"),
        "dateCreatedStart": moment(startDate).format("YYYY-MM-DD"),
        "search": searchTerm.trim()
      }
      requestsServiceService.getAllpremises(page, size, data).then((res) => {
        setResults(res.data.data)
        setloaded(true)
        setloading(false)
      })

    } else if (invoiceFor == "LANDLORD") {
      // SEARCH LANDLORD
      let data = {
        "dateCreatedEnd": moment(endDate).format("YYYY-MM-DD"),
        "dateCreatedStart": moment(startDate).format("YYYY-MM-DD"),
        "search": searchTerm.trim()
      }
      requestsServiceService.getLandLords(page, size, data).then((res) => {
        setResults(res.data.data)
        setloaded(true)
        setloading(false)
      });
    } else if (invoiceFor == "TENANT") {
      // SEARCH TENANT
      let data = {
        "dateCreatedEnd": moment(endDate).format("YYYY-MM-DD"),
        "dateCreatedStart": moment(startDate).format("YYYY-MM-DD"),
        "search": searchTerm.trim()
      }
      requestsServiceService.getAllTenants(searchTerm, page, size, data).then((res) => {
        setResults(res.data.data)
        setloaded(true)
        setloading(false)
      })
    }
    setSearchTerm('')
  }




  const filter = (id) => {
    setSelected(
      selected.filter((select) => select.id !== id)
    )


  }

  const handleWhoToCharge = (e) => {
    setWhoToCharge(e.target.value);

    if (e.target.value === "CHARGECONSTRAINT")
      setPaid('');
    setPercentage('');
    setPercentOf('');
    setAplicableChargeId('')
  }


  const sendData = () => {
    setError(undefined)
    if (tenancies.length <= 0) {
      let data = JSON.stringify({
        "aplicableChargeId": aplicableChargeId,
        "invoiceFor": invoiceFor,
        "landlordIds": landlordsId,
        "paid": paid,
        "percentOf": percentOf,
        "percentage": percentage,
        "premiseIds": premisesId,
        "period": periodStart + "-" + periodEnd,
        "tenancyList": [],
        "tenantIds": tenantsId,
        "whoToCharge": whoToCharge
      })
      requestsServiceService.createBulkInvoice(data).then((res) => {
        if (res.data.status == true) {
          setInvoices(res.data.data);
          setTenancyList(res.data.data?.map(invoice => invoice.id))
        } else {

          setError(res.data.message)
        }
      })

    } else if (invoiceFor !== "" && invoices?.length > 0 && unitCost != "" && quantity >= 0 && invoiceDate != "" && applicableChargeName != "") {


      if (invoiceFor === "TENANT") {
        setTenantsID(() => selected?.map((a) => a.id))
      } else if (invoiceFor === "LANDLORD") {
        setLandlordsId(() => selected?.map((a) => a.id))
      } else if (invoiceFor === "PREMISE") {
        setPremisesId(() => selected?.map((a) => a.id))
      }

      let data = JSON.stringify({
        "aplicableChargeId": aplicableChargeId,
        "invoiceFor": invoiceFor,
        "landlordIds": landlordsId,
        "paid": paid,
        "period": periodStart + "-" + periodEnd,
        "percentOf": percentOf,
        "percentage": percentage,
        "premiseIds": premisesId,
        "tenancyIds": tenancies,
        "tenantIds": tenantsId,
        "chargeId": applicableChargeName,
        "whoToCharge": whoToCharge,
        "quantity": quantity,
        "billAmount": billAmount,
        "unitCost": unitCost,
        "invoiceDate": invoiceDate,
        "invoiceTitle": invoiceTitle
      });


      requestsServiceService.createBulkInvoice(data).then((res) => {
        if (res.data.status == true)
          redirectToInvoices();
        else {
          setError(res.data.message)
        }
      }).catch((err) => {
        // setError(err.response.data.map(err.field + err.essage))}
      })

    }

  }

  const redirectToInvoices = () => {
    window.location.href = "/#/bulk-invoices";
  };

  const filterList = (index, event) => {
    const { checked, value } = event.target;
    if (checked) {
      setTenancyList([...tenancyList, invoices[index].tenancy])
      setTenancies([...tenancies, invoices[index].tenancy.id])
    } else {
      setTenancyList(() => tenancyList.filter((tenant) => tenant !== invoices[index].tenancy));
      setTenancies(() => tenancies.filter((tenant) => tenant !== invoices[index].tenancy.id));
    }

  }

  const handleChange = (index, event) => {
    const { checked, value } = event.target;

    if (checked) {
      setSelected([...selected, results[index]])
    } else {
      setSelected(
        selected.filter((select) => select.id !== results[index].id)
      )
    }
  };






  const addDate = (date) => {
    setinvoiceDate(new Date(date.target.value).toISOString());
  };

  $(document).on("change", ".enddate", addDate);

  return (
    <div className='page-content'>
      <div className="content-fluid">
        {/* page title  */}
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18 text-capitalize">
                New Bulk Invoice
              </h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/invoices">Invoices</a>
                  </li>
                  <li className="breadcrumb-item active">Bulk Invoice</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* actual data */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="create-property" id="kev-step-form">
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
                            1. Customer details
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">2. Details Summary</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">3. confirm and submit</a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                  {/*section add landlord details*/}
                  <form id="my-form">
                    <section className={"step-cont active-step"}>
                      <p>
                        Fill in the form correctly. Fields with an Asterisk{" "}
                        <strong className="text-danger">*</strong> are
                        mandatory fields.
                      </p>
                      <div className="col-12">
                        <div className="bg-primary border-2 bg-soft p-3 mb-4">
                          <p className="fw-semibold mb-0 pb-0 text-uppercase">
                            Invoice details
                          </p>
                        </div>
                      </div>

                      <div className="card">
                        <div class="row g-3 mb-4 align-items-center">
                          <div class="col-3">
                            <label class="col-form-label">Create an invoice for <strong className="text-danger">*</strong> </label>
                          </div>
                          <div class="col-4">
                            <select class="form-control" aria-label="Default select example" onChange={(e) => handleInvoiceFor(e)} id="invoiceFor">
                              <option ></option>
                              <option value="CURRENT">Current Tenancies</option>
                              <option value="LANDLORD">Landlord</option>
                              <option value="TENANT">Tenant</option>
                              <option value="PREMISE">Property</option>
                            </select>
                          </div>
                        </div>
                        {invoiceFor !== "CURRENT" && invoiceFor !== "" && <div class="row g-3 align-items-center">
                          <div class="col-3">
                            <label class="col-form-label">Search for {invoiceFor?.toLowerCase()?.replace(/_/g, " ")}  <strong className="text-danger">*</strong></label>
                          </div>
                          <div class="col-auto">
                            <div className="app-search d-lg-block mr-15px">
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search..."
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <span className="bx bx-search-alt"></span>
                              </div>
                            </div>
                          </div>
                          {!loading && <div class="col-auto">
                          <button
                            onClick={search}
                            form={"bulk-search-form"}
                            disabled={
                              loading 
                            }
                            className="btn btn-primary btn-rounded"
                          >
                            { loading && (
                              <i
                                className="fa fa-refresh fa-spin"
                                style={{ marginRight: "5px" }}
                              />
                            )}
                            { loading && (
                              <>
                                <span className="d-inline-block me-2">
                                  Searching...
                                </span>
                              </>
                            )}
                            {!loading && (
                              <>
                                <span className="d-sm-inline-block me-2">
                                  Search
                                </span>
                              </>
                            )}
                          </button>
                          </div> }

                         

                        </div>}

                        {invoiceFor !== "" && invoiceFor !== "CURRENT" && results?.length > 0 && <div class="row g-3 mb-4 align-items-center">
                          <strong> Select {invoiceFor?.toLowerCase()}s to invoice for <strong className='text-danger'>*</strong> </strong>
                          {invoiceFor === 'PREMISE' && results?.length > 0 &&
                            results?.map((prem, index) => (
                              <div class="col-4" key={prem.id}>
                                <div class="form-check mb-3">
                                  <input class="form-check-input" onChange={(event) =>
                                    handleChange(index, event)
                                  } type="checkbox" id="formCheck1"
                                    checked={selected.some(
                                      (el) =>
                                        el.id ===
                                        prem.id
                                    )} />
                                  <label class="form-check-label" for="formCheck1">
                                    {prem.premiseName}
                                  </label>
                                </div>
                              </div>

                            ))
                          }

                          {invoiceFor === 'LANDLORD' && results?.length > 0 &&
                            results?.map((lord, index) => (
                              <div class="col-4" key={lord.id}>
                                <div class="form-check mb-3">
                                  <input class="form-check-input" onChange={(event) =>
                                    handleChange(index, event)
                                  } type="checkbox" id="formCheck1"
                                    checked={selected.some(
                                      (el) =>
                                        el.id ===
                                        lord.id
                                    )} />
                                  <label class="form-check-label" for="formCheck1">
                                    {lord.firstName} {lord.lastName}  {lord.otherName}
                                  </label>
                                </div>
                              </div>

                            ))
                          }

                          {invoiceFor === 'TENANT' && results?.length > 0 &&
                            results?.map((tenant, index) => (
                              <div class="col-4" key={tenant.id}>
                                <div class="form-check mb-3">
                                  <input class="form-check-input" onChange={(event) =>
                                    handleChange(index, event)
                                  } type="checkbox" id="formCheck1"
                                    checked={selected.some(
                                      (el) =>
                                        el.id ===
                                        tenant.id
                                    )} />
                                  <label class="form-check-label" for="formCheck1">
                                    {tenant.tenantType != 'COMPANY' ? <>{tenant.firstName} {tenant.lastName}  {tenant.otherName}</> :
                                      <>{tenant.companyName}</>
                                    }
                                  </label>
                                </div>
                              </div>

                            ))
                          }

                        </div>
                        }

                        {loaded && results.length < 1 && (
                          <>
                            <span className={"text-danger"}>
                              No records found!
                            </span>
                          </>
                        )}


                        {selected.length > 0 && (
                          <div
                            className={
                              "alert alert-warning d-flex align-items-center"
                            }
                          >
                            {selected.length > 0 && (
                              <>
                                <Button variant="primary">
                                  Selected
                                  <Badge
                                    bg="light"
                                    className="ml-7px"
                                  >
                                    <b>{selected.length}</b>
                                  </Badge>
                                </Button>
                              </>
                            )}
                            {selected.length > 0 &&
                              selected?.map((item) => (
                                <>
                                  {invoiceFor === "LANDLORD" && (
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
                                            filter(item.id)
                                          }
                                        ></i>
                                      </h5>
                                    </>
                                  )}
                                  {invoiceFor === "TENANT" && (
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
                                            filter(item.id)
                                          }
                                        ></i>
                                      </h5>
                                    </>
                                  )}
                                  {invoiceFor === "PREMISE" && (
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
                                            filter(item.id)
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

                      <div className="card">
                        <div className="col-12">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0 text-uppercase">
                              charging rule
                            </p>
                          </div>
                        </div>

                        <div class="row g-3 mb-3 align-items-center">
                          <div class="col-auto">
                            <label for="inputPassword6" class="col-form-label">Who to charge : </label>
                          </div>
                          <div class="col-4">
                            <select class="form-control" aria-label="Default select example" onChange={(e) => handleWhoToCharge(e)}>
                              <option >Select who to charge</option>
                              <option value="ALLCURRENT">All Current</option>
                              <option value="CHARGECONSTRAINT">Charge Constraint</option>

                            </select>
                          </div>
                        </div>
                        {whoToCharge === "CHARGECONSTRAINT" && <div class="row g-3 align-items-center">
                          <div class="col-auto">
                            <label class="col-form-label">Have paid:</label>
                          </div>
                          <div class="col-3 col-auto">
                            <select class="form-control" aria-label="Default select example" onChange={(e) => setPaid(e.target.value)}>
                              <option>select..</option>
                              <option value="above">Over</option>
                              <option value="below">Below</option>
                            </select>
                          </div>
                          <div class="col-3 d-flex align-items-center gap-1">
                            <input type="number" className='form-control' maxLength={3} max={100} min={1} placeholder="Enter number (1-100)" onChange={(e) => setPercentage(e.target.value)} />
                            <strong>{" "} %</strong>
                          </div>
                          <div class="col-auto d-flex  align-items-center gap-1">
                            <strong> of </strong>
                            <select class="form-control" aria-label="Default select example" onChange={(e) => setPercentOf(e.target.value)}>
                              <option>select..</option>
                              <option value="FULL_PERIOD">Full Period</option>
                              <option value="SPECIFIC_CHARGE">Specific Charge</option>
                            </select>
                          </div>
                        </div>}
                        {percentOf === "SPECIFIC_CHARGE" && whoToCharge === "CHARGECONSTRAINT" && <div class="row g-3 mb-3 mt-2 align-items-center">
                          <div class="col-auto">
                            <label for="inputPassword6" class="col-form-label">Charge : </label>
                          </div>

                          <div class="col-3">
                            <select class="form-control" aria-label="Default select example" onChange={(e) => setAplicableChargeId(e.target.value)}>
                              <option >Select a charge</option>
                              {aplicableCharges.map((charge) => (
                                <option value={charge.id}> {charge.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        }

                        {whoToCharge === "CHARGECONSTRAINT" &&
                          <div class="row g-3 mb-3 mt-2 align-items-center">
                            <div class="col-auto">
                              <label for="inputPassword6" class="col-form-label">Over the period : </label>
                            </div>

                            <div class="col-6 gap-1">
                              <strong>{" "} Day </strong> <small>(Example: 0-30)</small>
                              <input type="number" className='form-control' maxLength={3} max={100} min={1} value={periodStart} placeholder="Enter number (1-100)" onChange={(e) => setPeriodStart(e.target.value)} />

                              <strong>{" "} - </strong>
                              <strong>{" "} Day </strong>
                              <input type="number" className='form-control' maxLength={3} max={100} min={1} value={periodEnd} placeholder="Enter number (1-100)" onChange={(e) => setPeriodEnd(e.target.value)} />
                            </div>
                          </div>
                        }

                      </div>
                    </section>

                    {/*add bank accounts*/}
                    <section className={"step-cont d-none"}>
                      <div className="col-12">
                        <div className="">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0 text-uppercase">
                              invoice breakdown
                            </p>
                          </div>
                          <table
                            className="table align-middle table-hover contacts-table table-striped "
                            id="datatable-buttons"
                          >
                            <thead className="table-light">
                              {invoices?.length > 0 && invoices?.length > 0 && (
                                <tr>
                                  <th width="8px">Select</th>
                                  <th span={"col-6"}>Tenant Type</th>
                                  <th span={"col-3"}>Name</th>
                                  <th span={"col-3"}>Total Invoices</th>
                                  <th span={"col-3"}>Total Paid Invoices</th>
                                  <th span={"col-3"}> Invoice Count</th>
                                  <th span={"col-3"}> Outstanding Balance</th>
                                </tr>
                              )}
                            </thead>
                            <tbody>
                              {invoices?.length > 0 && (
                                <>
                                  {invoices?.length > 0 && (
                                    <>
                                      {invoices?.map((tenant, index) => {
                                        return (
                                          <tr key={tenant.tenancy.tenant.id}>
                                            <td>
                                              <div className="d-flex  align-items-center">
                                                <div className="the-mail-checkbox pr-4">
                                                  <input
                                                    className="form-check-input mt-0 pt-0 form-check-dark"
                                                    type="checkbox"
                                                    id="formCheck1"
                                                    onChange={(e) => {
                                                      filterList(index, e);
                                                    }}
                                                    checked={
                                                      tenancies.some((id) => tenant.tenancy.id === id)
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </td>
                                            <td className="text-capitalize">{tenant.tenancy.tenant?.tenantType?.toLowerCase()?.replace(/_/g, " ")}</td>
                                            <td className="text-capitalize">
                                              <a href="javascript:void(0)">
                                                {tenant?.tenancy?.tenant?.tenantType === "INDIVIDUAL" ? (
                                                  <>
                                                    {tenant.tenancy.tenant.firstName + " "}
                                                    {tenant.tenancy.tenant.lastName + " "}{" "}
                                                    {tenant.tenancy.tenant.otherName}
                                                  </>
                                                ) : (
                                                  <>{tenant.tenancy.tenant.companyName + " "}</>
                                                )}
                                              </a>
                                            </td>
                                            <td>{tenant.sum}</td>
                                            <td>{tenant.paid}</td>
                                            <td>{tenant.countAll}</td>
                                            <td>{tenant.sum - tenant.paid}</td>
                                          </tr>
                                        )
                                      })}
                                    </>
                                  )}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </section>

                    {/*add documents */}
                    <section className={"step-cont d-none"}>
                      <div className="col-12">
                        <div className="bg-primary border-2 bg-soft p-3 mb-4">
                          <h4>Create Invoice</h4>
                          <div className='row'>

                            <div className="row">
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-email-input"
                                    className="form-label"
                                  >
                                    Invoice Title.{" "}
                                    <strong className="text-danger">*</strong>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={invoiceTitle}
                                    min="1"
                                    onChange={(e) =>
                                      setinvoiceTitle(e.target.value)
                                    }
                                    placeholder="Enter title"
                                    required={true}
                                  />
                                </div>
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
                                {aplicableCharges && (
                                  <div className="form-group mb-4">
                                    <select
                                      class="form-control"
                                      title="Select tenant"
                                      data-live-search="true"
                                      value={applicableChargeName}
                                      onChange={(e) =>
                                        setApplicableChargeName(
                                          e.target.value
                                        )
                                      }
                                      required={true}
                                    >
                                      <option className="text-black font-semibold ">
                                        select applicable charge
                                      </option>
                                      {aplicableCharges.map(
                                        (item, index) => (
                                          <option
                                            value={item.id}
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
                                  value={unitCost}
                                  min="1"
                                  onChange={(e) =>
                                    setunitCost(e.target.value)
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
                                  value={"KES " + billAmount}
                                  onChange={(e) => setbillAmount(e.target.value)}
                                  id="formrow-password-input"
                                  placeholder="KES"
                                  required={true}
                                  disabled={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </form>
                  <div className="button-navigators">
                    <button
                      disabled
                      className="btn btn-primary waves-effect kev-prev me-3"
                    >
                      <i className="mdi-arrow-left mdi font-16px ms-2 me-3"></i>{" "}
                      Previous{" "}
                    </button>
                    {invoiceFor !== "" && <button
                      className="btn btn-primary waves-effect kev-nxt me-3"
                      onClick={sendData}
                    // disabled = { next ? "" : "disabled"}
                    >
                      Next
                      <i className="mdi mdi-arrow-right font-16px ms-2 me-3"></i>
                    </button>}
                    <button
                      type="button"
                      onClick={sendData}
                      className="btn btn-success kev-submit me-3 d-none"
                      form={"my-form"}
                    >
                      Submit{" "}
                      <i className="mdi mdi-check-all me-3 font-16px"></i>
                    </button>
                  </div>

                  {error != undefined &&
                    <div className='alert alert-danger'>
                      <span>{error}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BulkInvoiving