/* global $ */
import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import requestsServiceService from '../../services/requestsService.service';

function BulkInvoiving() {
  const [invoiceFor, setInvoiceFor] = useState('')
  const [whoToCharge, setWhoToCharge] = useState(undefined)
  const [loading, setloading] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [premises, setPremises] = useState([]);
  const [premisesId, setPremisesId] = useState([]);
  const [landlords, setLandlords] = useState([]);
  const [landlordsId, setLandlordsId] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [tenantsId, setTenantsID] = useState([]);
  const [tenancyList, setTenancyList] = useState([]);
  const [tenancies, setTenancies] = useState([]);
  const [selected, setSelected] = useState([]);
  const [paid, setPaid] = useState(undefined)
  const [next, setNext] = useState(true)
  const [percentage, setPercentage] = useState(undefined)
  const [percentOf, setPercentOf] = useState(undefined)
  const [aplicableCharges, setAplicableCharges] = useState([])
  const [aplicableChargeId, setAplicableChargeId] = useState(undefined)


  useEffect(() => {
    requestsServiceService.allApplicableCharges().then((res) => {
      setAplicableCharges(res.data.data)
    })
  }, [])

  const handleInvoiceFor = (e) => {
    setInvoiceFor(e.target.value);
    setLandlords([]);
    setTenants([]);
    setPremises([])
  }

  if (invoiceFor !== "") {
    $('#invoiceFor').attr('disabled', 'disabled');
  } else {
    $('#invoiceFor').removeAttr('disabled');

  }
  const search = () => {
    let endDate = new Date()
    let startDate = "2022-01-01T23:50:21.817Z"
    let page = 0
    let size = 9

    if (invoiceFor == "PREMISE") {
      // SEARCH PREMISE
      let data = {
        "dateCreatedEnd": moment(endDate).format("YYYY-MM-DD"),
        "dateCreatedStart": moment(startDate).format("YYYY-MM-DD"),
        "search": searchTerm.trim()
      }
      requestsServiceService.getAllpremises(page, size, data).then((res) => {
        setPremises(res.data.data)
      })

    } else if (invoiceFor == "LANDLORD") {
      // SEARCH LANDLORD
      let data = {
        "dateCreatedEnd": moment(endDate).format("YYYY-MM-DD"),
        "dateCreatedStart": moment(startDate).format("YYYY-MM-DD"),
        "search": searchTerm.trim()
      }
      requestsServiceService.getLandLords(page, size, data).then((res) => {
        setLandlords(res.data.data)
      });
    } else if (invoiceFor == "TENANT") {
      // SEARCH TENANT
      let data = {
        "dateCreatedEnd": moment(endDate).format("YYYY-MM-DD"),
        "dateCreatedStart": moment(startDate).format("YYYY-MM-DD"),
        "search": searchTerm.trim()
      }
      requestsServiceService.getAllTenants(searchTerm, page, size, data).then((res) => {
        setTenants(res.data.data)
      })
    }
    setSearchTerm('')
  }

  const handlePremiseChange = (index, event) => {
    const { checked, value } = event.target;
    if (checked) {
      setPremisesId([...premisesId, premises[index].id]);
      setSelected([...selected, premises[index]])
    } else {
      setPremisesId(
        premisesId.filter((prem) => prem !== premises[index].id)
      );
      setSelected(
        selected.filter((select) => select.id !== premises[index].id)
      )
    }
  };
  const handleTenantChange = (index, event) => {
    const { checked, value } = event.target;

    if (checked) {
      setTenantsID([...tenantsId, tenants[index].id]);
      setSelected([...selected, tenants[index]])
    } else {
      setTenantsID(
        tenantsId.filter((prem) => prem !== tenants[index].id)
      );
      setSelected(
        selected.filter((select) => select.id !== tenants[index].id)
      )
    }
  };

  const filter = (id) => {
    setSelected(
      selected.filter((select) => select.id !== id)
    )


  }

  const handleLandlordChange = (index, event) => {
    const { checked, value } = event.target;

    if (checked) {
      setLandlordsId([...landlordsId, landlords[index].id]);
      setSelected([...selected, landlords[index]])
    } else {
      setLandlordsId(
        landlordsId.filter((prem) => prem !== landlords[index].id)
      );
      setSelected(
        selected.filter((select) => select.id !== landlords[index].id)
      )
    }
  };

  const handleWhoToCharge = (e) => {
    setWhoToCharge(e.target.value);

    if (e.target.value === "CHARGECONSTRAINT")
      setPaid('');
    setPercentage('');
    setPercentOf('');
    setAplicableChargeId('')
  }


  const sendData = () => {
    if (invoiceFor !== "" && invoices?.length <= 0) {
      //  setNext(false)
      let data = JSON.stringify({
        "aplicableChargeId": aplicableChargeId,
        "invoiceFor": invoiceFor,
        "landlordIds": landlordsId,
        "paid": paid,
        "percentOf": percentOf,
        "percentage": percentage,
        "premiseIds": premisesId,
        "tenancyList": [],
        "tenantIds": tenantsId,
        "whoToCharge": whoToCharge
      })
      requestsServiceService.createBulkInvoice(data).then((res) => {
        setInvoices(res.data.data); 
        setTenancyList(res.data.data?.map(invoice=>invoice.id))
      })
 
    }

    if (invoiceFor !== "" && invoices?.length > 0) {
      //  setNext(false)
      let data = JSON.stringify({
        "aplicableChargeId": aplicableChargeId,
        "invoiceFor": invoiceFor,
        "landlordIds": landlordsId,
        "paid": paid,
        "percentOf": percentOf,
        "percentage": percentage,
        "premiseIds": premisesId,
        "tenancyList": tenancyList,
        "tenantIds": tenantsId,
        "whoToCharge": whoToCharge
      })
      requestsServiceService.createBulkInvoice(data).then((res) => {
        // setInvoices(res.data.data);
        console.log(res.data); 
        // setTenancyList(res.data.data?.map(invoice=>invoice.id))
      })
 
    }
  
  }

  const filterList = (index, event)=> {
    const { checked, value } = event.target;
    if (checked) {
      setTenancyList([...tenancyList, invoices[index].id])
    } else {
      setTenancyList(()=> tenancyList.filter((tenant)=> tenant !== invoices[index].id)
      ) 
    }
  
  }

console.log(tenancyList);
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
                            1. Landlord details
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
                              <option value="CURRENT">Current</option>
                              <option value="LANDLORD">Landlord</option>
                              <option value="TENANT">Tenant</option>
                              <option value="PREMISE">Premise</option>
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
                          {searchTerm !== "" && <div class="col-auto">
                            <button onClick={search} className="btn btn-md bg-primary text-white">
                              Search
                              <span style={{ marginLeft: "10px" }}>
                                {loading && <i className="fa fa-refresh fa-spin" />}
                                {loaded && (
                                  <>
                                    <i className="fa fa-check" />
                                  </>
                                )}
                              </span>
                            </button>
                          </div>}

                        </div>}

                        {invoiceFor !== "" && invoiceFor !== "CURRENT" && <div class="row g-3 mb-4 align-items-center">
                          <strong> Select {invoiceFor?.toLowerCase()}s to invoice for <strong className='text-danger'>*</strong> </strong>
                          {invoiceFor === 'PREMISE' && premises?.length > 0 &&
                            premises?.map((prem, index) => (
                              <div class="col-4" key={prem.id}>
                                <div class="form-check mb-3">
                                  <input class="form-check-input" onChange={(event) =>
                                    handlePremiseChange(index, event)
                                  } type="checkbox" id="formCheck1" />
                                  <label class="form-check-label" for="formCheck1">
                                    {prem.premiseName}
                                  </label>
                                </div>
                              </div>

                            ))
                          }

                          {invoiceFor === 'LANDLORD' && landlords?.length > 0 &&
                            landlords?.map((lord, index) => (
                              <div class="col-4" key={lord.id}>
                                <div class="form-check mb-3">
                                  <input class="form-check-input" onChange={(event) =>
                                    handleLandlordChange(index, event)
                                  } type="checkbox" id="formCheck1" />
                                  <label class="form-check-label" for="formCheck1">
                                    {lord.firstName} {lord.lastName}  {lord.otherName}
                                  </label>
                                </div>
                              </div>

                            ))
                          }

                          {invoiceFor === 'TENANT' && tenants?.length > 0 &&
                            tenants?.map((tenant, index) => (
                              <div class="col-4" key={tenant.id}>
                                <div class="form-check mb-3">
                                  <input class="form-check-input" onChange={(event) =>
                                    handleTenantChange(index, event)
                                  } type="checkbox" id="formCheck1" />
                                  <label class="form-check-label" for="formCheck1">
                                    {tenant.firstName} {tenant.lastName}  {tenant.otherName}
                                  </label>
                                </div>
                              </div>

                            ))
                          }

                        </div>}
                        {selected?.length > 0 && invoiceFor !== "PREMISE" &&
                          <div class="row g-3 mb-4 align-items-center">
                            <h4 className="text-center">Selected {invoiceFor?.toLowerCase()?.replace(/_/g, " ")}s</h4>
                            <div className="row">
                              {selected && selected.map((one) => (
                                <div className="col-4 d-flex align-items-baseline gap-4 ">
                                  <p><i class="bx bx-check text-primary font-18px"></i> {one.firstName}</p>
                                  <i class="bx bx-trash text-primary font-18px" onClick={() => filter(one.id)}></i>
                                </div>
                              ))
                              }

                            </div>
                          </div>
                        }

                        {selected?.length > 0 && invoiceFor === "PREMISE" &&
                          <div class="row g-3 mb-4 align-items-center">
                            <h4 className="text-center">Selected {invoiceFor?.toLowerCase()?.replace(/_/g, " ")}s</h4>
                            <div className="row">
                              {selected && selected.map((one) => (
                                <div className="col-4 d-flex align-items-baseline gap-4 ">
                                  <p><i class="bx bx-check text-primary font-18px"></i> {one.firstName}</p>
                                  <i class="bx bx-trash text-primary font-18px" onClick={() => filter(one.id)}></i>
                                </div>
                              ))
                              }

                            </div>
                          </div>
                        }
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
                          <div class="col-auto">
                            <select class="form-control" aria-label="Default select example" onChange={(e) => setPaid(e.target.value)}>
                              <option>select..</option>
                              <option value="over">Over</option>
                              <option value="below">Below</option>
                            </select>
                          </div>
                          <div class="col-3 d-flex align-items-center gap-1">
                            <input type="number" className='form-control' max={100} min={1} placeholder="Enter number (1-100)" onChange={(e) => setPercentage(e.target.value)} />
                            <strong>{" "} %</strong>
                          </div>
                          <div class="col-auto d-flex  align-items-center gap-1">
                            <strong>of</strong>
                            <select class="form-control" aria-label="Default select example" onChange={(e) => setPercentOf(e.target.value)}>
                              <option>select..</option>
                              <option value="fullPeriod">Full Period</option>
                              <option value="specificCharge">Specific Charge</option>
                            </select>
                          </div>
                        </div>}
                        {percentOf === "specificCharge" && whoToCharge === "CHARGECONSTRAINT" && <div class="row g-3 mb-3 mt-2 align-items-center">
                          <div class="col-auto">
                            <label for="inputPassword6" class="col-form-label">Charge : </label>
                          </div>

                          <div class="col-4">
                            <select class="form-control" aria-label="Default select example" onChange={(e) => setAplicableChargeId(e.target.value)}>
                              <option >Select a charge</option>
                              {aplicableCharges.map((charge) => (
                                <option value={charge.id}> {charge.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>}
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
                                  <th span={"col-3"}>Email</th>
                                </tr>
                              )}
                            </thead>
                            <tbody>
                              {invoices?.length > 0 &&  (
                                <>
                                  {invoices?.length > 0 && (
                                    <>
                                      {invoices?.map((tenant ,index) =>{ 
                                        return(
                                        <tr key={tenant.tenant.id}>
                                          <td>
                                            <div className="d-flex  align-items-center">
                                              <div className="the-mail-checkbox pr-4">
                                                <input
                                                  className="form-check-input mt-0 pt-0 form-check-dark"
                                                  type="checkbox"
                                                  id="formCheck1"
                                                  onChange={(e) => {
                                                    filterList(index,e);
                                                  }}
                                                  checked={
                                                     tenancyList.some((id)=> tenant.id == id )
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </td>
                                          <td className="text-capitalize">{tenant.tenant?.tenantType?.toLowerCase()?.replace(/_/g , " ")}</td>
                                          <td className="text-capitalize">
                                            <a href="javascript:void(0)">
                                              {tenant?.tenant?.tenantType === "INDIVIDUAL" ? (
                                                <>
                                                  {tenant.tenant.firstName + " "}
                                                  {tenant.tenant.lastName + " "}{" "}
                                                  {tenant.tenant.otherName}
                                                </>
                                              ) : (
                                                <>{tenant.tenant.companyName + " "}</>
                                              )}
                                            </a>
                                          </td>
                                          <td>{tenant.tenant.email}</td>
                                        </tr>
                                      )})}
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
                          <p className="fw-semibold mb-0 pb-0 text-uppercase">
                            {/* Document Attachments{" "} */}
                          </p>
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
                      type="submit"
                      className="btn btn-success kev-submit me-3 d-none"
                      form={"my-form"}
                    >
                      Submit{" "}
                      <i className="mdi mdi-check-all me-3 font-16px"></i>
                    </button>
                  </div>
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