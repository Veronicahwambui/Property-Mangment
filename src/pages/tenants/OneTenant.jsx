import React, { useEffect } from "react";
import { useState,  } from "react";
import { useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";

function OneTenant() {
  const [activeLink, setActiveLink] = useState(1);
  const [tenantData, setTenantData] = useState({});
  const [docName, setDocName] = useState("");
 


// edit tenants
const[startDate, setStartDate]=useState("")
const[unitCondition, setUnitCondition]=useState("")
const[tenancyStatus,setTenancyStatus]=useState("")
const[monthsToTenancyRenewal, setMonthsToTenancyRenewal]=useState("")


//edit ContactPersons

const[firstName,setFirstName]=useState("")
const[lastName, setLastName]=useState("")
const[otherName,setOtherName]=useState("")
const[phoneNumber1,setPhoneNumber1]=useState("")
const[phoneNumber2,setPhoneNumber2]=useState("")
const[ relationship,setRelationship]=useState("")
const[contactPersonId, setContactPersonId]=useState("")

  const { id } = useParams();
  const userId = id;

  const fetchAll = () => {
    requestsServiceService.viewTenant(userId).then((res) => {
      setTenantData(res.data.data);
    });
  };
  const editTenant=()=>{
   let data=JSON.stringify({
    // id:id,
    // startDate: startDate,
    // unitCondition: unitCondition,
    // tenancyStatus:"Current",
    // monthsToTenancyRenewal: monthsToTenancyRenewal,

    
      active: true,
      id: id,
      monthsToTenancyRenewal: monthsToTenancyRenewal,
      "premiseUnitId": 0,
      startDate: startDate,
      "tenancyCharges": [
        {
          "active": true,
          "premiseUnitTypeChargeId": 0,
          "value": 0
        }
      ],
      "tenancyDocuments": [
        {
          "docName": "string",
          "document": "string",
          "documentOwnerTypeName": "string",
          "documentTypeId": 0,
          "id": 0,
          "ownerEntityId": 0
        }
      ],
      tenancyStatusName: "string",
      "tenantId": 0,
      unitCondition: unitCondition
    





   })
  requestsServiceService. updateTenant(data).then((res)=>{
    console.log(res)
  
    
    
  }
  )
  }
  const handleChange =(startDate,unitCondition,tenancyStatus,monthsToTenancyRenewal)=>{
    setStartDate(startDate)
    setUnitCondition(unitCondition)
    setTenancyStatus(tenancyStatus)
    setMonthsToTenancyRenewal(monthsToTenancyRenewal)

  }
// console.log(tenantData)
  const editContactPersons=()=>{

    let data = tenantData.contactPeople.find(x=>x.id == contactPersonId);


    data["active"]=true;
    data.firstName=firstName;
    data.lastName=lastName;
    data.otherName=otherName;
  
    data.phoneNumber1=phoneNumber1;
    data.relationship=relationship;

  console.log(data)

    requestsServiceService. updateContactPersons(data).then((res)=>{
      console.log(res)
      
      
    }
    )
  }
  const handleChangeContacts=( contactPersonId,firstName,lastName,otherName,phoneNumber1,relationship)=>{
    setContactPersonId(contactPersonId)
    setFirstName(firstName)
    setLastName(lastName)
    setOtherName(otherName)
    setPhoneNumber1(phoneNumber1)
    setRelationship(relationship)

  }


  const download = () => {
    requestsServiceService.download(docName).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {

    fetchAll();
   
  }, []);

  return (
    <div className="page-content">
      <div className="content-fluid">
        {/* <!-- start page title --> */}
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0 font-size-18">
                {tenantData.tenant && tenantData.tenant.firstName}
              </h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="index.html">Dashboards</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="property-list.html">All Properties</a>
                  </li>
                  <li class="breadcrumb-item active">
                    {tenantData.tenant && tenantData.tenant.firstName}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end page title --> */}

        {/* <!-- tool bar --> */}
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body pt-2 pb-3">
                <nav class="navbar navbar-expand-md navbar-white bg-white py-2">
                  <button
                    class="navbar-toggler btn btn-sm px-3 font-size-16 header-item waves-effect h-auto text-primary"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="mdi mdi-menu"></span>
                  </button>
                  <div
                    class="collapse navbar-collapse justify-content-between"
                    id="navbarNavAltMarkup"
                  >
                    <div class="navbar-nav">
                      <a
                        onClick={() => setActiveLink(1)}
                        class={
                          activeLink === 1
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Tenant Details<span class="sr-only"></span>
                      </a>
                      <a
                        onClick={() => setActiveLink(2)}
                        class={
                          activeLink === 2
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Tenancies
                      </a>
                      <a
                        onClick={() => setActiveLink(3)}
                        class={
                          activeLink === 3
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Contact persons
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end of tool bar --> */}

        {activeLink === 1 && (
          <div>
            <div className="row">
              <div className="col-xl-12">
                <div className="card calc-h-3px">
                  <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                    <div
                      class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                      role="toolbar"
                    >
                      <div class="d-flex align-items-center flex-grow-1">
                        <h4 class="mb-0 m-0 bg-transparent">
                          Quick Stats on{" "}
                          {tenantData.tenant && tenantData.tenant.firstName}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3">
                          <label htmlFor="">Type</label>
                          <div>
                            <span>
                              {tenantData.tenant &&
                                tenantData.tenant.tenantType}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">First Name</label>
                          <div>
                            <span>
                              {tenantData.tenant && tenantData.tenant.firstName}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Last Name</label>
                          <div>
                            <span>
                              {tenantData.tenant && tenantData.tenant.lastName}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Email</label>
                          <div>
                            <span>
                              {tenantData.tenant && tenantData.tenant.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-3">
                          <label htmlFor="">Id Number</label>
                          <div>
                            <span>
                              {tenantData.tenant && tenantData.tenant.idNumber}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Company Name</label>
                          <div>
                            <span>
                              {tenantData.tenant &&
                                tenantData.tenant.companyName}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Company Incorporation Number</label>
                          <div>
                            <span>
                              {tenantData.tenant &&
                                tenantData.tenant.companyIncorporationNumber}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Nationality</label>
                          <div>
                            <span>
                              {tenantData.tenant &&
                                tenantData.tenant.nationality}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeLink === 2 && (
          <div>
            <div className={"row"}>
              <div className="col-12">
                <div className="card calc-h-3px">
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <div className="card-body bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                          <div
                            className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                            role="toolbar"
                          >
                            <div className="d-flex align-items-center flex-grow-1">
                              <h4 className="mb-0  bg-transparent  p-0 m-0">
                                Tenancies
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="row">
                            <div className="col-12">
                              <div>
                                <table className="table align-middle table-nowrap table-hover mb-0">
                                  <thead>
                                    <tr class="text-uppercase table-dark">
                                      <th>#</th>
                                      <th>Unit Name</th>
                                      <th>Unit Type</th>
                                      <th>Start Date</th>
                                      <th>Unit Condition</th>
                                      <th>Tenancy Status</th>
                                      <th>Months to renewal</th>
                                      <th>Status</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tenantData.tenancies &&
                                    tenantData.tenancies.map(
                                        (unit, index) => (
                                          <tr data-id="1">
                                            <td>{index + 1}</td>
                                            <td>{unit.premiseUnit.unitName}</td>
                                            <td className="text-capitalize">
                                              {unit.premiseUnit.unitType.name}
                                            </td>
                                            <td>
                                              {unit.startDate.replace(
                                                /[TZ]/g,
                                                " "
                                              )}
                                            </td>
                                            <td>{unit.unitCondition}</td>
                                            <td>
                                              {unit.tenancyStatus.toLowerCase()}
                                            </td>
                                            <td>
                                              {unit.monthsToTenancyRenewal}
                                            </td>
                                            <td>
                                              {" "}
                                              {unit.active ? (
                                                <span class="badge-soft-success badge">
                                                  Active
                                                </span>
                                              ) : (
                                                <span class="badge-soft-danger badge">
                                                  Inactive
                                                </span>
                                              )}
                                            </td>

                                            <td className="text-right ">
                                              <div class="dropdown">
                                                <a
                                                  class="text-muted font-size-16"
                                                  role="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-haspopup="true"
                                                >
                                                  <i class="bx bx-dots-vertical-rounded"></i>
                                                </a>

                                                <div class="dropdown-menu dropdown-menu-end text-capitalize">
                                                
                                                  <p
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#edit-tenant"
                                                    class="dropdown-item"
                                                    href="#" onClick={()=> handleChange(unit.startDate.replace(
                                                      /[TZ]/g,), unit.unitCondition,unit.tenancyStatus.toLowerCase(), unit.monthsToTenancyRenewal)}
                                                  >
                                                    <i class="font-size-15 mdi mdi-pencil me-3"></i>
                                                    Edit
                                                  </p>
                                                
                                                  <p
                                            class="dropdown-item text-danger"
                                           >
                                        <i class="font-size-15 mdi mdi-close-circle me-3" ></i>

                                        Deactivate
                                      </p> 
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                  </tbody>
                                </table>
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
          </div>
       


        )}

        {activeLink === 3 && (
          <div>
            <div className={"row"}>
              <div className="col-12">
                <div className="card calc-h-3px">
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                          <div
                            className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                            role="toolbar"
                          >
                            <div className="d-flex align-items-center flex-grow-1">
                              <h4 className="mb-0  bg-transparent  p-0 m-0">
                                Contact Persons
                              </h4>
                            </div>
                            <div className="d-flex">
                              <button
                                type="button"
                                className="btn btn-primary waves-effect btn-label waves-light me-3"
                                data-bs-toggle="modal"
                                data-bs-target="#add-new-agreementType"
                              >
                                <i className="mdi mdi-plus label-icon"></i> Add
                                Account
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="row">
                            {/* <div className={"alert alert-" + error.color} role="alert">
                {error.message}
              </div> */}

                            <div className="col-12">
                              <div className="table-responsive">
                                <table className="table align-middle table-nowrap table-hover mb-0">
                                  <thead>
                                    <tr class="text-uppercase table-dark">
                                      <th>#</th>
                                      <th>Name (s) </th>
                                      <th>Type</th>
                                      <th>Relationship</th>
                                      <th>phone No</th>
                                      <th>Status</th>
                                      <th className="text-right">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tenantData.contactPeople &&
                                      tenantData.contactPeople.map(
                                        (unit, index) => (
                                          <tr data-id="1">
                                            <td>{index + 1}</td>
                                            <td>
                                              {unit.firstName} {unit.lastName}{" "}
                                              {unit.otherName}
                                            </td>
                                            <td className="text-capitalize">
                                              {unit.contactPersonType
                                                .toLowerCase()
                                                .replace(/_/g, " ")}
                                            </td>
                                            <td>{unit.relationship}</td>
                                            <td>{unit.phoneNumber1}</td>
                                            <td>
                                              {" "}
                                              {unit.active ? (
                                                <span class="badge-soft-success badge">
                                                  Active
                                                </span>
                                              ) : (
                                                <span class="badge-soft-danger badge">
                                                  Inactive
                                                </span>
                                              )}
                                            </td>

                                            <td className="text-right cell-change ">
                                              <a
                                                className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit"
                                                data-bs-toggle="modal" data-bs-target="#Edit-contact"
                                                onClick={()=>handleChangeContacts( unit.contactPersonId,unit.firstName,unit.lastName ,unit.otherName,unit.phoneNumber1,unit.relationship)}
                                              >
                                                <i className="bx bx-edit-alt " />
                                              </a>
                                            
                                            </td>
                                          </tr>
                                        )
                                      )}
                                  </tbody>
                                </table>
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
          </div>
        )}

      
      <div
        class="modal fade"
        id="edit-tenant"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Tenant
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <div class="form-group mb-4">
                    <label for="">StartDate</label>
                    <input

                      type="text"
                      class="form-control"
                      placeholder="Enter StartDate"
                      onChange={(event) =>setStartDate(event.target.value)}
                      value={startDate}
                    />
                    
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">Unit Condition</label>
                    <input type="text" className="form-control" value={unitCondition} onChange={(e) => setUnitCondition(e.target.value)} placeholder="Enter account number" required={true}/>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">TenancyStatus</label>
                    <input type="text" className="form-control" value={tenancyStatus} onChange={(e) => setTenancyStatus(e.target.value)} placeholder="Enter account number" required={true}/>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">MonthsToTenancyRenewal</label>
                    <input type="text" className="form-control" value={monthsToTenancyRenewal} onChange={(e) => setMonthsToTenancyRenewal(e.target.value)} placeholder="Enter MonthsToTenancyRenewal" required={true}/>
                  </div>

                </div>
 
       
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" 
                data-bs-dismiss="modal" onClick={editTenant} >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Modal */}

      <div
        class="modal fade"
        id="Edit-contact"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Tenant
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <div class="form-group mb-4">
                    <label for="">FirstName</label>
                    <input

                      type="text"
                      class="form-control"
                      placeholder="Enter FirstName"
                      onChange={(event) =>setFirstName(event.target.value)}
                      value={firstName}
                    />
                    
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">LastName</label>
                    <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter LastName" required={true}/>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">OtherName</label>
                    <input type="text" className="form-control" value={otherName} onChange={(e) => setOtherName(e.target.value)} placeholder="Enter OtherName" required={true}/>
                  </div>
               
                  <div className="form-group mb-4">
                    <label htmlFor="">PhoneNumber1</label>
                    <input type="text" className="form-control" value={phoneNumber1} onChange={(e) => setPhoneNumber1(e.target.value)} placeholder="Enter PhoneNumber1" required={true}/>
                  </div>
           
                  <div className="form-group mb-4">
                    <label htmlFor="">Relationship</label>
                    <input type="text" className="form-control" value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="Enter Relationship" required={true}/>
                  </div>

                </div>
 
       
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" 
                data-bs-dismiss="modal" onClick={editContactPersons} >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
     
      </div>
    </div>



  );
}

export default OneTenant;
