import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import  {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom'
import requestsServiceService from '../../services/requestsService.service'


function PremisesRegister() {
    const [premises , setPremises] = useState([])
    const [activeId , setActiveId] = useState('')


    useEffect(()=>{
       fetchAll()
    },[])

    const fetchAll = ()=>{
        requestsServiceService.getAllpremises().then((res)=>{
            setPremises(res.data.data)
        })
    }

    const deactivate = ()=>{
        requestsServiceService.togglePremiseStatus(activeId).then(()=>{
            fetchAll()
        })
    }
  return (
    <div class="page-content">
    <div class="container-fluid">

        {/* <!-- start page title --> */}
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">All Registered Premises</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="index.html">Dashboards</a></li>
                            <li class="breadcrumb-item active">Property Register</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
        {/* <!-- end page title --> */}

        {/* <!-- quick stast end --> */}





        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">

                        <div class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100" role="toolbar">
                            <div class="d-flex align-items-center flex-grow-1">
                                <div class="btn-group pr-3 d-none" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" class="btn-check" name="msg-type-filter" value="" id="btn-allmsgs" autocomplete="off" checked=""/>
                                    <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-allmsgs"><span class="d-inline">All</span></label>

                                    <input type="radio" class="btn-check" value="SMS" name="msg-type-filter" id="btn-sms" autocomplete="off" />
                                    <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-sms"><i class="mdi mdi-home-account  font-size-16"></i><span class="pl-1 d-none d-lg-inline d-md-inline">Residential</span></label>

                                    <input type="radio" class="btn-check" value="Email" name="msg-type-filter" id="btn-email" autocomplete="off" />
                                    <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-email"><i class="mdi mdi-home-currency-usd   font-size-16"></i><span class="pl-1 d-none d-lg-inline d-md-inline">Commercial</span></label>

                                    <input type="radio" class="btn-check" value="WhatsApp" name="msg-type-filter" id="btn-whatsApp" autocomplete="off" />
                                    <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-whatsApp"><i class="mdi mdi-store font-size-16"></i> <span class="pl-1 d-none d-lg-inline d-md-inline">Commercial/Residential</span></label>

                                </div>

                                <div class="btn-group mr-15px option-selector-cont d-none">
                                    <button type="button" class="btn btn-secondary dropdown-toggle option-selector" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="mdi mdi-file-document-outline font-size-16"></i> <span class="pl-1 d-none d-sm-inline">Agreement Type</span>  <i class="mdi mdi-chevron-down"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#"><i class="mdi mdi-checkbox-blank text-white"></i><span class="pl-1">All Premises</span></a>
                                        <a class="dropdown-item" href="#"><i class="mdi mdi-checkbox-blank text-info"></i><span class="pl-1">Lease Agreement</span></a>
                                        <a class="dropdown-item" href="#"><i class="mdi mdi-checkbox-blank text-dark opacity-25"></i><span class="pl-1">Management Agreement</span></a>

                                    </div>
                                </div>


                            </div>
                            <div class="d-flex">

                                <Link to="/addpremises" type="button" class="btn btn-primary dropdown-toggle option-selector">
                                    <i class="dripicons-plus font-size-16"></i> <span class="pl-1 d-md-inline">Add A Premises</span>
                                </Link>
                            </div>


                        </div>
                      
                    </div>
                    <div class="card-body">
                        <table class="table align-middle table-nowrap table-hover dt-responsive contacts-table" id="datatable-buttons">
                            <thead class="table-light">
                                <tr>

                                    <th scope="col">
                                        <div class="the-mail-checkbox pr-4">
                                            <label for="selectAll" class="d-none">Select All</label>
                                            <input class="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="selectAll" />

                                        </div>
                                    </th>
                                    <th scope="col">#</th>
                                    <th scope="col">Premises</th>
                                    <th scope="col">Premises type</th>
                                    <th scope="col">Premises use type</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Estate</th>
                                    <th scope="col">Zone</th>
                                    <th scope='col'>County</th>
                                    <th scope="col">File No</th>
                                    <th scope="col">Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {premises.map((premise , index)=>{
                                    let premiseType = premise.premiseType
                                    let premiseUseType = premise.premiseUseType
                                    let estate = premise.estate
                                    let zone = premise.estate.zone
                                    let county = premise.estate.zone.clientCounty.county
                                    
                                    return (
                                        <tr key={index}>

                                    <td>
                                        <div class="d-flex  align-items-center">
                                            <div class="the-mail-checkbox pr-4">
                                                <input class="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1" />
                                            </div>

                                        </div>
                                    </td>
                                    <td class="text-capitalize">{index + 1}</td>
                                    <td class="text-capitalize">
                                        <a href="property-details.html" title="View Details">
                                            {premise.premiseName}
                                        </a>
                                    </td>
                                    <td>
                                        <h5 class="font-size-14 mb-1"><a href="landlord-details.html" class="text-dark">{premiseType.name}</a></h5>

                                    </td>
                                    <td className="text-capitalize">
                                        <span class="badge badge-soft-warning font-size-11 m-1 text-capitalize">{premiseUseType.name}</span>
                                    </td>
                                    <td className='text-capitalize'>{premise.address}</td>
                                    <td className="text-capitalize">
                                        {estate.name}
                                    </td>
                                    <td className="text-capitalize">{zone.name}</td>
                                    <td className="text-capitalize">{county.name.toLowerCase()}</td>
                                    <td class="text-danger">
                                        {premise.fileNumber}
                                    </td>
                                    <td >{premise.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span> }</td>
                                    
                                    <td>
                                        <div class="dropdown">
                                            <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-end">
                                                <Link class="dropdown-item" to={`/premise/${premise.id}`} ><i class="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed view</Link>
                                                {/* <a class="dropdown-item" href="property-units.html"><i class="font-size-15 mdi mdi-home-variant me-3"></i>Units</a> */}
                                                {/* <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a> */}
                                                {/* <a class="dropdown-item" href="#"> <i class="font-size-15  mdi-file-document-multiple mdi me-3 text-info"> </i> Change ownership</a> */}
                                                <a onClick={()=>{setActiveId(premise.id); deactivate()}} class="dropdown-item" href="#"><i class="font-size-15  dripicons-wrong me-3 text-danger"></i>{premise.active ? "Deactivate": "Activate"  }</a>
                                            </div>
                                        </div>
                                    </td>
                                        </tr>
                                    )
                                })}
                              {/* <tr></tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* <!-- end col --> */}
        </div>

        {/* <!-- end row --> */}
    </div>
    {/* <!-- container-fluid --> */}

   
</div>
  )
}

export default PremisesRegister