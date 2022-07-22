import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import moment from 'moment'
import requestsServiceService from '../../services/requestsService.service'



function OnePremiseUnit() {
    const [activeTab, setActiveTab] = useState(1)
    const [unitDetails, setUnitDetails] = useState({})
    const [tenancy, setTenancy] = useState([])


    const { id, one } = useParams()
    let premId = id
    let unitId = one

    const fetchAll = () => {
        requestsServiceService.viewOnePremiseUnit(premId, unitId).then((res) => {
            setTenancy(res.data.data.unitTenancy)
            setUnitDetails(res.data.data)
        })
    }

    useEffect(() => {
        fetchAll()
    }, [])




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
                                <a onClick={() => setActiveTab(1)} className={activeTab === 1 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-home-outline me-2"></i> Unit Details</a>
                                <a onClick={() => setActiveTab(2)} className={activeTab === 2 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-account-clock me-2"></i>Occupation History</a>
                                <a onClick={() => setActiveTab(3)} className={activeTab === 3 ? "active cursor-pointer" : 'cursor-pointer'}><i class="mdi mdi-tools me-2"></i>Reported Issues</a>
                            </div>
                        </div>
                        {/* <!-- End Left sidebar --> */}


                        {/* <!-- Right Sidebar --> */}
                        {activeTab === 1 && <div class="email-rightbar mb-3">

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
                                                                <p class="text-muted text-truncate mb-0">{Object.keys(unitDetails).length > 0 && unitDetails.unit.numberOfRooms} Rooms</p>
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
                                                                <p class="text-muted text-truncate mb-0">{Object.keys(unitDetails).length > 0 && unitDetails.unit.squarage} M <sup>2</sup></p>
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
                                                                <p class="text-muted text-truncate mb-0">{Object.keys(unitDetails).length > 0 && unitDetails.unit.purpose}</p>
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
                                                                <p class="text-muted mb-0">Since {Object.keys(unitDetails).length > 0 && unitDetails.unit.dateTimeCreated}</p>
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
                        {activeTab === 2 &&
                            <div className='email-rightbar mb-3'>
                                <div className="card">
                                    <div className="card-body">
                                        <div class="table-responsive table-responsive-md overflow-visible">
                                            <table class="table table-editable align-middle table-edits" >
                                                <thead class="table-light" >
                                                    <tr class=" text-uppercase ">
                                                        <th>#</th>
                                                        <th>unit name </th>
                                                        <th>tenant name</th>
                                                        <th>phone no</th>
                                                        <th>condition</th>
                                                        <th>start Date</th>
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
                                                            <td>{unit.tenant.firstName} {unit.tenant.lastName} </td>
                                                            <td>{unit.tenant.phoneNumber}</td>
                                                            <td>{unit.unitCondition}</td>
                                                            <td> {moment(unit.startDate).format("MMM Do YYYY")}</td>
                                                            <td> {moment(unit.tenancyRenewalDate).format("MMM Do YYYY")}</td>
                                                            <td>{unit.tenancyStatus}</td>
                                                            
                                                            <td class="text-right d-flex align-items-center float-right justify-content-end">

                                                                <div class="dropdown">
                                                                    <a class="text-muted font-size-16 ml-7px" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                                        <i class="bx bx-dots-vertical-rounded"></i>
                                                                    </a>

                                                                    <div class="dropdown-menu dropdown-menu-end">
                                                                    <Link class="dropdown-item" to={`/premise/tenant/${unit.tenant.id}`}><i class="font-size-15 mdi mdi-eye-plus-outline cursor-pinter me-3"></i>Detailed view</Link>

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
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OnePremiseUnit