import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import requestsServiceService from '../../services/requestsService.service'

function OnePremiseUnit() {


 const {id ,one } = useParams()
 let premId = id 
 let unitId = one 

  useEffect(()=>{
    requestsServiceService.viewOnePremiseUnit(premId ,unitId).then((res)=>{
        console.log(res.data);
    })
  })
    

 
  return (
    <div className='page-content'>
        <div className="content-fluid">
        <div class="row">
                        <div class="col-12">
                            {/* <!-- Left sidebar --> */}
                            <div class="email-leftbar card calc-h-3px-md">
                                <button type="button" class="btn btn-danger btn-block waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".issue-modal">
                                    Report An Issues
                                </button>

                                <div class="mail-list mt-4">
                                    <a href="property-unit-details.html" class="active"><i class="mdi mdi-home-outline me-2"></i> Unit Details</a>
                                    <a href="property-unit-history.html"><i class="mdi mdi-account-clock me-2"></i>Occupation History</a>
                                    <a href="property-unit-charges-history.html"><i class="mdi mdi-cash-refund me-2"></i>Charges History</a>
                                    <a href="property-unit-issues.html"><i class="mdi mdi-tools me-2"></i>Reported Issues</a>
                                    <a class="" href="property-unit-logs.html"><i class="mdi mdi-calendar-clock me-2"></i>Unit Logs</a>
                                </div>
                            </div>
                            {/* <!-- End Left sidebar --> */}


                            {/* <!-- Right Sidebar --> */}
                            <div class="email-rightbar mb-3">

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
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Monthly Rent</a></h5>
                                                                    <p class="text-muted text-truncate mb-0 text-uppercase">KES 12,000</p>
                                                                </div>
                                                                <div class="align-self-end ms-2">
                                                                    <p class="text-muted mb-0">Per Month</p>
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
                                                                    <i class="mdi mdi-water font-size-24 text-info"></i>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Water Meter No.</a></h5>
                                                                    <p class="text-muted text-truncate mb-0">1234589</p>
                                                                </div>
                                                                <div class="align-self-end ms-2">
                                                                    <p class="text-muted mb-0">On Site</p>
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
                                                                    <i class="mdi mdi-lightning-bolt font-size-24 text-danger"></i>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">KPLC Meter No.</a></h5>
                                                                    <p class="text-muted text-truncate mb-0">12345</p>
                                                                </div>
                                                                <div class="align-self-end ms-2">
                                                                    <p class="text-muted mb-0">Post Pay</p>
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
                                                                    <i class="mdi mdi-floor-plan font-size-24 text-secondary"></i>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">No. Of Rooms</a></h5>
                                                                    <p class="text-muted text-truncate mb-0">2 Rooms</p>
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
                                                                    <p class="text-muted text-truncate mb-0">Bedsitter</p>
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
                                                                    <i class="mdi mdi-calendar font-size-24 text-black"></i>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Registered On</a></h5>
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
                                                                    <p class="text-muted text-truncate mb-0">120 M <sup>2</sup></p>
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
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Unit Purpose</a></h5>
                                                                    <p class="text-muted text-truncate mb-0">Residential unit</p>
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
                                                                    <i class="mdi-home-account mdi font-size-24 text-primary"></i>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="overflow-hidden me-auto">
                                                                    <h5 class="font-size-14 text-truncate mb-1"><a href="javascript: void(0);" class="text-body">Current Occupant</a></h5>
                                                                    <p class="text-muted text-truncate mb-0">Kelvin Njuguna</p>
                                                                </div>
                                                                <div class="align-self-end ms-2">
                                                                    <p class="text-muted mb-0">Since 20/3/2020</p>
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
                                                                    <p class="text-muted text-truncate mb-0">8 Tenants</p>
                                                                </div>
                                                                <div class="align-self-end ms-2">
                                                                    <p class="text-muted mb-0">Since 3 Mar 2015</p>
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


                            </div>
                            {/* <!-- end Col-9 --> */}

                        </div>

                    </div>
        </div>
    </div>
  )
}

export default OnePremiseUnit