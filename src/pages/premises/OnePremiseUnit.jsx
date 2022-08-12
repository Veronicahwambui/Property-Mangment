import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import moment from 'moment'
import requestsServiceService from '../../services/requestsService.service'
import useTabs from '../../hooks/useTabs'



function OnePremiseUnit() {
    const [activeLink, setActiveLink] = useTabs()
    const [unitDetails, setUnitDetails] = useState({})
    const [tenancy, setTenancy] = useState([])
    const [premiseCharges, setPremiseCharges] = useState([])
    const[newStatus,setNewStatus]=useState("")
    const[premiseStatuses,setPremiseStatuses]=useState([])

    const { id, one } = useParams()
    let premId = id
    let unitId = one

    const fetchAll = () => {
        requestsServiceService.viewOnePremiseUnit(premId, unitId).then((res) => {
            setTenancy(res.data.data.unitTenancy)
            setUnitDetails(res.data.data)
            setPremiseCharges(res.data.data.defaultPremiseUnitTypeCharges)
        })
    }

    const editStatus=()=>{
        let data=JSON.stringify({
            newStatus: newStatus,
            premiseId: premId,
            premiseUnitId: unitId

        })
        requestsServiceService.updateStatus(premId, data).then((res)=>{
            console.log(res.data)
            // setUnitDetails(res.data.data)
        fetchAll()
           
           
          }
          ) 
    }
    const getStatus =()=>{
        requestsServiceService.getTenantStatus().then((res)=>{
          setPremiseStatuses(res.data.data)
          fetchAll()
        })
      }
      

    useEffect(() => {
        fetchAll()
        getStatus()
    }, [])




    return (
        <div className='page-content'>
            <div className="content-fluid">
                <div class="row">
                    <div class="col-12">
                        {/* <!-- Left sidebar --> */}
                        <div class="email-leftbar card calc-h-3px-md">
                            {/* <button type="button" class="btn btn-danger btn-block waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".issue-modal">
                                Report An Issues
                            </button> */}
                  
                            <div class="mail-list mt-4">
                                <a onClick={() => setActiveLink(1)} className={activeLink === 1 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-home-outline me-2"></i> Unit Details</a>
                                <a onClick={() => setActiveLink(2)} className={activeLink === 2 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-account-clock me-2"></i>Occupation History</a>
                                <a onClick={() => setActiveLink(3)} className={activeLink === 3 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-tools me-2"></i> Default Charges </a>
                            </div>
                            <div>
                            <button type="button" class="btn btn-primary waves-effect btn-label waves-light me-3" data-bs-toggle="modal" data-bs-target="#updateStatus-modal"  
                                 >
                                Change Status
                            </button>
        </div>


{/* updateSTATUS */}
                            <div
        class="modal fade"
        id="updateStatus-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        centered="true"
        
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Edit Status
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
                    <label for="">NewStatus</label>
                 
                             <select
                        class="form-control"
                        data-live-search="true"
                        title="Select TenancyStatus"
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        <option className="text-black font-semibold ">
                          --Select TenancyStatus--
                        </option>
                        {premiseStatuses&&
                        premiseStatuses.map((tenant, index) => {
                            return (
                              <option key={index} value={tenant}>
                                {tenant}
                              </option>
                            );
                          })}
                      </select>
                   
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
                data-bs-dismiss="modal" onClick={editStatus} >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
                        </div>
                        {/* <!-- End Left sidebar --> */}


                        {/* <!-- Right Sidebar --> */}
                        {activeLink === 1 && <div class="email-rightbar mb-3">

                            <div class="card">
                                <div class="card-body">
                                    <div>
                                        <div class="row mb-3">
                                            <div class="col-12">
                                                <div class="mt-2">
                                                    <h5>Unit Details</h5>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-4 col-sm-6">
                                            <div class="card shadow-none border">
                                                <div class="card-body p-3">
                                                    <div class="">

                                                        <div class="avatar-xs me-3 mb-3">
                                                            <div class="avatar-title bg-transparent rounded">
                                                                <i class="mdi mdi-home-currency-usd font-size-24 text-success"></i>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex">
                                                            <div class="overflow-hidden me-auto">
                                                                <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Name</a></h5>
                                                                <p class="text-muted text-truncate mb-0 text-uppercase">{Object.keys(unitDetails).length > 0 && unitDetails.unit.unitName}</p>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* <!-- end col --> */}


                                        {/* <!-- end col --> */}
                                        <div class="col-xl-4 col-sm-6">
                                            <div class="card shadow-none border">
                                                <div class="card-body p-3">
                                                    <div class="">

                                                        <div class="avatar-xs me-3 mb-3">
                                                            <div class="avatar-title bg-transparent rounded">
                                                                <i class="mdi mdi-floor-plan font-size-24 text-secondary"></i>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex">
                                                            <div class="overflow-hidden me-auto">
                                                                <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">No. Of Rooms</a></h5>
                                                                <p class="text-muted text-truncate mb-0">{Object.keys(unitDetails).length > 0 && unitDetails.unit.unitType.numberOfRooms} Rooms</p>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        {/* <!-- end col --> */}
                                        <div class="col-xl-4 col-sm-6">
                                            <div class="card shadow-none border">
                                                <div class="card-body p-3">
                                                    <div class="">

                                                        <div class="avatar-xs me-3 mb-3">
                                                            <div class="avatar-title bg-transparent rounded">
                                                                <i class="mdi mdi-home-variant font-size-24 text-secondary"></i>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex">
                                                            <div class="overflow-hidden me-auto">
                                                                <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">House Type</a></h5>
                                                                <p class="text-muted text-truncate mb-0">{Object.keys(unitDetails).length > 0 && unitDetails.unit.unitType.name}</p>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* <!-- end col --> */}
                                        <div class="col-xl-4 col-sm-6 d-none">
                                            <div class="card shadow-none border">
                                                <div class="card-body p-3">
                                                    <div class="">

                                                        <div class="avatar-xs me-3 mb-3">
                                                            <div class="avatar-title bg-transparent rounded">
                                                                <i class="mdi mdi-calendar-edit font-size-24 text-warning"></i>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex">
                                                            <div class="overflow-hidden me-auto">
                                                                <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Last Edited</a></h5>
                                                                <p class="text-muted text-truncate mb-0">12 May 2014</p>
                                                            </div>
                                                            <div class="align-self-end ms-2">
                                                                <p class="text-muted mb-0">By Alex wanjala</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        {/* <!-- end col --> */}

                                        <div class="col-xl-4 col-sm-6">
                                            <div class="card shadow-none border">
                                                <div class="card-body p-3">
                                                    <div class="">

                                                        <div class="avatar-xs me-3 mb-3">
                                                            <div class="avatar-title bg-transparent rounded">
                                                                <i class="bx bx-expand font-size-24 text-black"></i>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex">
                                                            <div class="overflow-hidden me-auto">
                                                                <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Unit Size</a></h5>
                                                                <p class="text-muted text-truncate mb-0">{Object.keys(unitDetails).length > 0 && unitDetails.unit.unitType.squarage} M <sup>2</sup></p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        {/* <!-- end col --> */}

                                        <div class="col-xl-4 col-sm-6">
                                            <div class="card shadow-none border">
                                                <div class="card-body p-3">
                                                    <div class="">

                                                        <div class="avatar-xs me-3 mb-3">
                                                            <div class="avatar-title bg-transparent rounded">
                                                                <i class="mdi mdi-folder-home font-size-24 text-info"></i>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex">
                                                            <div class="overflow-hidden me-auto text-capitalize">
                                                                <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Unit Purpose</a></h5>
                                                                <p class="text-muted text-truncate mb-0">{Object.keys(unitDetails).length > 0 && unitDetails.unit.unitType.purpose}</p>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-sm-6">
                                            <div class="card shadow-none border">
                                                <div class="card-body p-3">
                                                    <div class="">

                                                        <div class="avatar-xs me-3 mb-3">
                                                            <div class="avatar-title bg-transparent rounded">
                                                                <i class="mdi mdi-floor-plan font-size-24 text-secondary"></i>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex">
                                                            <div class="overflow-hidden me-auto">
                                                                <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Status</a></h5>
                                                                <p class="text-muted text-truncate mb-0">{Object.keys(unitDetails).length > 0 && unitDetails.unit.status}</p>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                        {/* <!-- end col --> */}
                                        <div class="col-xl-4 col-sm-6">
                                            <div class="card shadow-none border">
                                                <div class="card-body p-3">
                                                    <div class="">

                                                        <div class="avatar-xs me-3 mb-3">
                                                            <div class="avatar-title bg-transparent rounded">
                                                                <i class="mdi mdi-account-group font-size-24 text-warning"></i>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex">
                                                            <div class="overflow-hidden me-auto">
                                                                <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Rented to</a></h5>
                                                                <p class="text-muted text-truncate mb-0">{Object.keys(unitDetails).length > 0 && tenancy.length} Tenants</p>
                                                            </div>
                                                            <div class="align-self-end ms-2">
                                                                <p class="text-muted mb-0">Since {Object.keys(unitDetails).length > 0 && moment(unitDetails.unit.dateTimeCreated).format("dddd DD MM YYYY")}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        {/* <!-- end col --> */}


                                    </div>
                                </div>
                            </div>
                            {/* <!-- card --> */}


                        </div>}
                        {/* <!-- end Col-9 --> */}
                        {activeLink === 2 &&
                            <div className='email-rightbar mb-3'>
                                <div className="card">
                                    <div className="card-body">
                                        <div class="table-responsive table-responsive-md ">
                                            <table class="table table-editable align-middle table-edits overflow-visible" >
                                                <thead class="table-light" >
                                                    <tr class=" text-uppercase ">
                                                        <th>#</th>
                                                        <th>unit name </th>
                                                        <th>tenant name</th>
                                                        <th>phone no</th>
                                                        <th>condition</th>
                                                        <th>start Date</th>
                                                        <th>notification date </th>
                                                       <th>renewal date</th>
                                                        <th>tenancy status</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tenancy && tenancy.map((unit, index) => (
                                                        <tr data-id="1">
                                                            <td style={{ width: "80px" }}>{index + 1}</td>
                                                            <td>{unit.premiseUnit.unitName}</td>
                                                            <td className='text-capitalize'>{unit.tenant.firstName} {unit.tenant.lastName} </td>
                                                            <td>{unit.tenant.phoneNumber}</td>
                                                            <td className='text-capitalize'>{unit.unitCondition}</td>
                                                            <td> {moment(unit.startDate).format("MMM Do YYYY")}</td>
                                                            <td> { unit?.tenancyRenewalDate && moment(unit?.tenancyRenewalNotificationDate).format("MMM Do YYYY")}</td>
                                                            <td> { unit?.tenancyRenewalDate && moment(unit?.tenancyRenewalDate).format("MMM Do YYYY")}</td>
                                                            <td className="text-capitalize">{unit.tenancyStatus?.toLowerCase()?.replace(/_/g , " ")}</td>
                                                            
                                                            <td class="text-right d-flex align-items-center float-right justify-content-end">

                                                                <div class="dropdown">
                                                                    <a class="text-muted font-size-16 ml-7px" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                                        <i class="bx bx-dots-vertical-rounded"></i>
                                                                    </a>

                                                                    <div class="dropdown-menu dropdown-menu-end">
                                                                    <Link class="dropdown-item" to={`/premise/tenant/${unit.id}`}><i class="font-size-15 mdi mdi-eye-plus-outline cursor-pinter me-3"></i>Detailed view</Link>

                                                                        <a class="dropdown-item cursor-pinter"><i class="font-size-15 mdi mdi-home-remove text-danger me-3"></i>Deactivate unit</a>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {activeLink === 3 && 
                            <div class="row">
                            <div class="col-12">
                              <div class="card">
                                <div class="card-body">
                              
                                  <div className="d-flex justify-content-between">
                                    <h4 class="card-title text-capitalize mb-3">Default charges  </h4>

                                  </div>
              
                                  <div class="table-responsive table-responsive-md">
                                    <table class="table table-editable align-middle table-edits" >
                                      <thead class="table-light" >
                                        <tr class=" text-uppercase ">
                                          <th>#</th>
                                          <th class="">UNit type</th>
                                          <th class=" ">NO of Rooms</th>
                                          <th class=" ">UNIT SIZE M<sup>2</sup></th>
                                          <th>TENANCY RENEWAL</th>
                                          <th>charge constraint</th>
                                          <th>rate charge</th>
                                          <th>applicable charge </th>
                                          <th>applicable charge type </th>
                                          <th>invoice day</th>
                                          <th>amount </th>
                                          <th>status</th>
                                          <th></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {premiseCharges && premiseCharges.map((unit, index) => (
                            <tr data-id="1 ">
                              <td style={{ width: "80px" }}>{index + 1}</td>
                              <td className="text-capitalize" >{unit.unitType.name && unit.unitType.name}</td>
                              <td className="text-capitalize">{unit.unitType.numberOfRooms} rooms</td>
                              <td className="text-capitalize">{unit.unitType.squarage} m<sup>2</sup> </td>
                              <td className="text-capitalize">{unit.unitType.monthCountForTenancyRenewal} months</td>
                              <td className="text-capitalize">{unit.chargeConstraint?.toLowerCase()?.replace(/_/g , " ")}</td>
                              <td className="text-capitalize">{unit.rateCharge ? "true" : "false"}</td>
                              <td className="text-capitalize">{unit.applicableCharge.name}</td>
                              <td className="text-capitalize">{unit.applicableCharge.applicableChargeType?.toLowerCase()?.replace(/_/g , " ")}</td>
                              <td className="text-capitalize">{unit.invoiceDay}</td>
                              <td className="text-capitalize">{unit.value}</td>
                              <td className="text-capitalize"> {unit.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span>}</td>
                            </tr>
                          ))}
                                      </tbody>
              
                                    </table>
                                  </div>
              
                                </div>
                              </div>
                            </div>
                            {/* <!-- end col --> */}


      
                          </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OnePremiseUnit