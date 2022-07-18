/* global $ */
import React, {useState, useEffect} from 'react';
import requestsServiceService from '../../services/requestsService.service';

function CreateInvoice() {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setselectedTenant] = useState({});

  // tenant details
  const [tenantId, settenantId] = useState(null);
  const [tenantEmail, settenantEmail] = useState("");
  const [tenantPhone, settenantPhone] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState(new Date());
  const [total, settotal] = useState("");
  const [unitcost, setunitcost] = useState("");
  const [chargename, setchargename] = useState("");
  const [chargetitle, setchargetitle] = useState("");
  const [quantity, setquantity] = useState("");
  const [custname, setcustname] = useState("");
  const [tenancies, settenancies] = useState([]);
  const [tenancyId, settenancyId] = useState(null);
  const [applicableChargeName, setapplicableChargeName] = useState("");
  const [applicableCharges, setapplicableCharges] = useState([]);

  useEffect(() => {
    getTenants()
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
      settenancies(temp)
      console.log(temp.premiseUnit.unitName)
      console.log(temp.premiseUnit.unitType.name);
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
      "invoiceDate": date.toISOString(),
      "parentTransactionId": null,
      "quantity": parseInt(quantity),
      "tenancyId": parseInt(tenancyId),
      "transactionCustomerEmail": tenantEmail,
      "transactionCustomerName": custname,
      "transactionDescription": description,
      "transactionTitle": chargetitle,
      "unitCost": parseInt(unitcost)
    };
    console.log(data)
    requestsServiceService.createInvoice(data).then((res) => {
      console.log(res);
    })
  }

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
                            <h4 className="card-title mb-4">Enter the invoice details beow</h4>
                            <form onSubmit={submitInvoice}>
                              <div className="row">
                                <div className=" col-12 ">
                                  <div className="mb-4 ">
                                    <label className="text-capitalize ">Whose is this
                                      invoice for?</label>
                                    <div className="row ">
                                      <div className="col-auto ">
                                        <div className="form-check mb-3">
                                          <input className="form-check-input"
                                                 value="tenant" type="radio"
                                                 name="invoice-for"
                                                 id="tenant-invoice"/>
                                            <label className="form-check-label"
                                                   htmlFor="tenant-invoice">
                                              A Tenant
                                            </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row tenant-invoice-container invoice-options">
                                <div className="col-12">
                                  <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input"
                                           className="form-label">Tenant</label>
                                    {tenants &&
                                    <div className="form-group mb-4">
                                      <select class="form-control"
                                              title="Select tenant" data-live-search="true" value={tenantId} onChange={(e) => autofill(e.target.value)} required={true}>
                                        <option className="text-black font-semibold ">
                                          select tenant
                                        </option>
                                        {
                                          tenants.map((item, index) => (
                                            <option value={parseInt(item.id)}>{item.firstName}</option>
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
                                           className="form-label">Tenancy</label>
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
                                           className="form-label">Applicable charge</label>
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
                              </div>
                              <div className="col-12">
                                <div className="mb-3">
                                  <label htmlFor="formrow-email-input"
                                         className="form-label">Title</label>
                                  <input type="text" className="form-control"
                                         id="formrow-email-input"
                                         value={chargetitle}
                                         onChange={(e) => setchargetitle(e.target.value)}
                                         placeholder=""/>
                                </div>
                              </div>
                              <div className="mb-3">
                                <label htmlFor="formrow-firstname-input tenant-description"
                                       className="form-label">Description</label>
                                <textarea name="" id="" cols="30" rows="5"  placeholder="Enter description" value={description} onChange={(e) => setdescription(e.target.value)} className="form-control"/>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="formrow-email-input"
                                           className="form-label">Quantity</label>
                                    <input type="number" className="form-control"
                                           value={quantity}
                                           onChange={(e) => setquantity(e.target.value)}
                                           placeholder="quantity"/>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="formrow-password-input"
                                           className="form-label">Unit cost</label>
                                    <input type="number" className="form-control"
                                           value={unitcost}
                                           onChange={(e) => setunitcost(e.target.value)}
                                           placeholder="Enter cost"
                                           />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="formrow-inputCity"
                                           className="form-label">Due Date</label>
                                    <div className="input-group" id="datepicker2">
                                      {/*<DatePicker className="form-control" selected={date} onChange={(date) => setdate(date)}>*/}
                                      {/*</DatePicker>*/}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="formrow-password-input"
                                           className="form-label">Invoice amount</label>
                                    <input type="text"
                                           className="form-control invoice-amount"
                                           value={total}
                                           onChange={(e) => settotal(e.target.value)}
                                           id="formrow-password-input" placeholder="KES"/>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <button type="submit" className="btn btn-primary w-md invoice-btn">Submit</button>
                              </div>
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