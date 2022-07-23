/* global $ */
import React, {useState, useEffect} from 'react';
import requestsServiceService from '../../services/requestsService.service';
import {useNavigate} from "react-router-dom";

function CreateInvoice() {
  const [tenants, setTenants] = useState([]);

  // tenant details
  const [tenantId, settenantId] = useState(null);
  const [tenantEmail, settenantEmail] = useState("");
  const [tenantPhone, settenantPhone] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [total, settotal] = useState("");
  const [unitcost, setunitcost] = useState("");
  const [chargetitle, setchargetitle] = useState("");
  const [quantity, setquantity] = useState("");
  const [custname, setcustname] = useState("");
  const [tenancies, settenancies] = useState([]);
  const [tenancyId, settenancyId] = useState(null);
  const [applicableChargeName, setapplicableChargeName] = useState("");
  const [applicableCharges, setapplicableCharges] = useState([]);
  const [error, setError] = useState({
    message: "",
    color: ""
  });
  const navigate = useNavigate();


  useEffect(() => {
    getTenants()
    requestsServiceService.allApplicableCharges().then((res) => {
      setapplicableCharges(res.data.data);
    })
  }, [])

  const getTenants = () => {
    requestsServiceService.getAllTenants().then((res) => {
      setTenants(res.data.data);
    })
  }
  const getId = (y) => {
    requestsServiceService.getTenant(y).then((res) => {
      let temp = res.data.data.tenancies;
      console.log(tenancies)
      settenancies(temp)
    })
  }

  const autofill = (x) => {
    getId(x);
    let sel = tenants.find((tenant) => tenant.id === parseInt(x))
    let email = sel?.email;
    let phone = sel?.phoneNumber;
    let name = sel?.firstName;
    settenantId(x);
    settenantEmail(email);
    settenantPhone(phone);
    setcustname(name);
  }

  const submitInvoice = (event) => {
    event.preventDefault();
    let data = {
      "applicableChargeName": applicableChargeName,
      "billAmount": parseInt(total),
      "invoiceDate": date,
      "parentTransactionId": null,
      "quantity": parseInt(quantity),
      "tenancyId": parseInt(tenancyId),
      "transactionCustomerEmail": tenantEmail,
      "transactionCustomerName": custname,
      "transactionDescription": description,
      "transactionTitle": chargetitle,
      "unitCost": parseInt(unitcost)
    };
    requestsServiceService.createInvoice(data).then((res) => {
      if (res.data.status === true) {
        setError({
          ...error,
          message: res.data.message,
          color: "success"
        });
        setTimeout(() => {
          navigate('/invoices', {replace: true})
        }, 2000);
      } else {
        setError({
          ...error,
          message: res.data.message,
          color: "danger"
        })
      }
    }).catch((err) => {
      console.log(err);
      setError({
        ...error,
        message: err.response.data.message,
        color:"danger"
      })
    })
    setTimeout(() => {
      setError({
        ...error,
        message: "",
        color: ""
      })
    }, 3500);
  }

  const addDate = (date) => {
    setdate(new Date(date.target.value).toISOString());
  }
  const check = (x) => {
    if (x.tenantType === "INDIVIDUAL") {
      return x.firstName + " " + x.lastName
    } else {
      return x.companyName
    }
  }
  $(document).on("change", ".enddate", addDate);

  return (
    <>
      <div>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0 font-size-18 text-capitalize">New Invoice</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item"><a href="/">Home</a></li>
                      <li className="breadcrumb-item"><a href="/">Invoices</a></li>
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
                            <h4 className="card-title mb-4">Enter the invoice details below</h4>
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
                                    <label htmlFor="formrow-firstname-input"
                                           className="form-label">Tenant. <strong className="text-danger">*</strong></label>
                                    {tenants &&
                                    <div className="form-group mb-4">
                                      <select class="form-control"
                                              title="Select tenant" data-live-search="true" value={tenantId} onChange={(e) => autofill(e.target.value)} required={true}>
                                        <option className="text-black font-semibold ">
                                          select tenant...
                                        </option>
                                        {
                                          tenants.map((item, index) => (
                                            <option value={parseInt(item.id)}>{check(item)}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                    }
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor=""
                                           className="form-label">Tenant's Email</label>
                                    <input type={"text"} className="form-control"
                                           value={tenantEmail}
                                           placeholder={`${tenantEmail}`} readOnly/>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="formrow-password-input"
                                           className="form-label">Tenant's Phone</label>
                                    <input type="text" className="form-control"
                                           id="formrow-password-input"
                                           value={tenantPhone}
                                           placeholder={`${tenantPhone}`}
                                           readOnly/>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input"
                                           className="form-label">Tenancy. <strong className="text-danger">*</strong></label>
                                    {tenancies &&
                                    <div className="form-group mb-4">
                                      <select class="form-control"
                                              title="Select tenant" data-live-search="true" value={tenancyId} onChange={(e) => settenancyId(e.target.value)} required={true}>
                                        <option className="text-black font-semibold ">
                                          select tenancy
                                        </option>
                                        {
                                          tenancies.map((item, index) => (
                                            <option value={parseInt(item.id)}>{item.premiseUnit?.unitName + " - " + item.premiseUnit?.unitType.name}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                    }
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input"
                                           className="form-label">Applicable charge. <strong className="text-danger">*</strong></label>
                                    {applicableCharges &&
                                    <div className="form-group mb-4">
                                      <select class="form-control"
                                              title="Select tenant" data-live-search="true" value={applicableChargeName} onChange={(e) => setapplicableChargeName(e.target.value)} required={true}>
                                        <option className="text-black font-semibold ">
                                          select applicable charge
                                        </option>
                                        {
                                          applicableCharges.map((item, index) => (
                                            <option value={item.name}>{item.name}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="mb-3">
                                  <label htmlFor="formrow-email-input"
                                         className="form-label">Title. <strong className="text-danger">*</strong></label>
                                  <input type="text" className="form-control"
                                         id="formrow-email-input"
                                         value={chargetitle}
                                         onChange={(e) => setchargetitle(e.target.value)}
                                         placeholder="Enter invoice title"
                                         required={true}
                                  />
                                </div>
                              </div>
                              <div className="mb-3">
                                <label htmlFor="formrow-firstname-input tenant-description"
                                       className="form-label">Description. <strong className="text-danger">*</strong></label>
                                <textarea name="" id="" cols="30" rows="5"  placeholder="Enter description" value={description} onChange={(e) => setdescription(e.target.value)} className="form-control"  required={true}/>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="formrow-email-input"
                                           className="form-label">Quantity. <strong className="text-danger">*</strong></label>
                                    <input type="number" className="form-control"
                                           value={quantity}
                                           onChange={(e) => setquantity(e.target.value)}
                                           placeholder="Enter quantity" required={true}/>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="formrow-password-input"
                                           className="form-label">Unit cost. <strong className="text-danger">*</strong></label>
                                    <input type="number" className="form-control"
                                           value={unitcost}
                                           onChange={(e) => setunitcost(e.target.value)}
                                           placeholder="Enter cost"
                                           required={true}
                                           />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-4">
                                    <label htmlFor="" className="">Due date</label>
                                    <div className="input-group" id="datepicker1">
                                      <input type="text" className="form-control mouse-pointer enddate"
                                             name="dob" placeholder="Select Date" readOnly data-date-format="dd M, yyyy" data-date-container='#datepicker1' data-provide="datepicker" data-date-autoclose="true" />
                                      <span className="input-group-text"><i className="mdi mdi-calendar"></i></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="formrow-password-input"
                                           className="form-label">Invoice amount. <strong className="text-danger">*</strong></label>
                                    <input type="text"
                                           className="form-control invoice-amount"
                                           value={total}
                                           onChange={(e) => settotal(e.target.value)}
                                           id="formrow-password-input" placeholder="KES" required={true}/>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <button type="submit" className="btn btn-primary w-md invoice-btn">Submit</button>
                              </div>
                              <br/>
                              {error.color !== "" &&
                              <div className={"alert alert-" + error.color} role="alert">
                                {error.message}
                              </div>
                              }
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
                <script>
                  document.write(new Date().getFullYear())
                </script>
                © RevenueSure
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
  )
}

export default CreateInvoice