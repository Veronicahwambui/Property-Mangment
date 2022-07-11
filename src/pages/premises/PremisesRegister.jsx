import React from 'react'

function PremisesRegister() {
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

        {/* <!-- quick property statitistics --> */}
        <div class="row">
            <div class="col-lg-12 px-sm-30px">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-2 col-md-3 col-md-3">
                                <div class="d-flex">

                                    <div class="flex-grow-1 align-self-center">
                                        <div class="text-muted">
                                            <p class="mb-2 d-none">Property<br />Stats.</p>
                                            <h5 class="mb-1">All Premises Stats</h5>
                                            <br />
                                            <p class="mb-0">Quick stats on the registered Premises.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-10 col-md-9 align-self-center">
                                <div class="text-lg-left mt-4 mt-lg-0">
                                    <div class="row">
                                        <div class="col-sm-3 col-md-2">
                                            <div>
                                                <div class="avatar-xs-2 mb-3">
                                                    <span class="avatar-title rounded-circle bg-info font-size-24">
                                                            <i class="mdi mdi-home-city-outline text-white"></i>
                                                        </span>
                                                </div>
                                                <p class="text-muted text-truncate mb-2">Premises</p>
                                                <h5 class="mb-0">48</h5>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-md-2">
                                            <div>
                                                <div class="avatar-xs-2 mb-3">
                                                    <span class="avatar-title bg-info rounded-circle font-size-24">
                                                            <i class="mdi mdi-home-outline text-white"></i>
                                                        </span>
                                                </div>
                                                <p class="text-muted text-truncate mb-2">No. Of Units</p>
                                                <h5 class="mb-0">6,503</h5>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-md-2">
                                            <div>
                                                <div class="avatar-xs-2 mb-3">
                                                    <span class="avatar-title rounded-circle bg-danger font-size-24">
                                                            <i class="mdi mdi-home-export-outline text-white"></i>
                                                        </span>
                                                </div>
                                                <p class="text-muted text-truncate mb-2">Vacant Units</p>
                                                <h5 class="mb-0">180</h5>

                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-md-2 ">
                                            <div>
                                                <div class="avatar-xs-2 mb-3">
                                                    <span class="avatar-title rounded-circle bg-success font-size-24">
                                                            <i class="mdi mdi-home-import-outline text-white"></i>
                                                        </span>
                                                </div>
                                                <p class="text-muted text-truncate mb-2">Occupied Units</p>
                                                <h5 class="mb-0">23,203</h5>

                                            </div>
                                        </div>

                                        <div class="col-sm-3 col-md-2 d-md-flex">
                                            <div>
                                                <div class="avatar-xs-2 mb-3">
                                                    <span class="avatar-title rounded-circle bg-info font-size-24">
                                                            <i class="mdi  mdi-home-currency-usd text-white"></i>
                                                        </span>
                                                </div>
                                                <p class="text-muted text-truncate mb-2">Commercial units</p>
                                                <h5 class="mb-0">103.2</h5>

                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-md-2 d-md-flex">
                                            <div>
                                                <div class="avatar-xs-2  mb-3">
                                                    <span class="avatar-title rounded-circle bg-info font-size-24">
                                                            <i class="mdi mdi-home-account text-white"></i>
                                                        </span>
                                                </div>
                                                <p class="text-muted text-truncate mb-2">Residential units</p>
                                                <h5 class="mb-0">103.2</h5>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                        {/* <!-- end row --> */}
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- quick stast end --> */}





        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">

                        <div class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100" role="toolbar">
                            <div class="d-flex align-items-center flex-grow-1">
                                <div class="btn-group pr-3" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" class="btn-check" name="msg-type-filter" value="" id="btn-allmsgs" autocomplete="off" checked=""/>
                                    <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-allmsgs"><span class="d-inline">All</span></label>

                                    <input type="radio" class="btn-check" value="SMS" name="msg-type-filter" id="btn-sms" autocomplete="off" />
                                    <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-sms"><i class="mdi mdi-home-account  font-size-16"></i><span class="pl-1 d-none d-lg-inline d-md-inline">Residential</span></label>

                                    <input type="radio" class="btn-check" value="Email" name="msg-type-filter" id="btn-email" autocomplete="off" />
                                    <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-email"><i class="mdi mdi-home-currency-usd   font-size-16"></i><span class="pl-1 d-none d-lg-inline d-md-inline">Commercial</span></label>

                                    <input type="radio" class="btn-check" value="WhatsApp" name="msg-type-filter" id="btn-whatsApp" autocomplete="off" />
                                    <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-whatsApp"><i class="mdi mdi-store font-size-16"></i> <span class="pl-1 d-none d-lg-inline d-md-inline">Commercial/Residential</span></label>

                                </div>

                                <div class="btn-group mr-15px option-selector-cont">
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

                                <a href="property-new.html" type="button" class="btn btn-primary dropdown-toggle option-selector">
                                    <i class="dripicons-plus font-size-16"></i> <span class="pl-1 d-md-inline">Add A Premises</span>
                                </a>

                            </div>


                        </div>
                        <div class="btn-toolbar p-3 align-items-center d-none animated delete-tool-bar" role="toolbar">

                            <button type="button" class="btn btn-primary waves-effect btn-label waves-light me-3"><i class="bx  bx-trash label-icon"></i> Delete Premises</button>
                            <button type="button" class="btn btn-primary waves-effect btn-label waves-light me-3"><i class="mdi mdi-plus label-icon"></i> Message property Tenants</button>
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
                                    <th scope="col">Owner</th>
                                    <th scope="col">Agreement type</th>
                                    <th scope="col">Premises type</th>
                                    <th>tenants</th>
                                    <th scope="col">Units</th>
                                    <th scope="col">Vacant</th>
                                    <th scope="col">Occupied</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                    <td>
                                        <div class="d-flex  align-items-center">
                                            <div class="the-mail-checkbox pr-4">
                                                <input class="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1" />
                                            </div>

                                        </div>
                                    </td>
                                    <td class="text-capitalize">1</td>
                                    <td class="text-capitalize">
                                        <a href="property-details.html" title="View Details">Savannah lands</a>
                                    </td>
                                    <td>
                                        <h5 class="font-size-14 mb-1"><a href="landlord-details.html" class="text-dark">Mark Ellison</a></h5>

                                    </td>
                                    <td>
                                        Management
                                    </td>
                                    <td>
                                        <span class="badge badge-soft-warning font-size-11 m-1">Commercial/Residential</span>
                                    </td>
                                    <td>15</td>
                                    <td>50</td>
                                    <td class="text-danger">
                                        32
                                    </td>
                                    <td class="text-success">
                                        19
                                    </td>

                                    <td>
                                        <div class="dropdown">
                                            <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="property-details.html"><i class="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed view</a>
                                                <a class="dropdown-item" href="property-units.html"><i class="font-size-15 mdi mdi-home-variant me-3"></i>Units</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-chat-plus me-3"></i>Message All Tenants</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  dripicons-wrong me-3 text-danger"></i>Deactivate property</a>
                                                <a class="dropdown-item" href="#"> <i class="font-size-15  mdi-file-document-multiple mdi me-3 text-info"> </i> Rent Statements</a>
                                                <a class="dropdown-item" href="property-tenant-schedule.html"><i class="font-size-15  mdi-file-clock mdi me-3 text-info"></i>Rent Schedule</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>

                                    <td>
                                        <div class="d-flex  align-items-center">
                                            <div class="the-mail-checkbox pr-4">
                                                <input class="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1" />
                                            </div>

                                        </div>
                                    </td>
                                    <td class="text-capitalize">2</td>
                                    <td class="text-capitalize">
                                        <a href="property-details.html" title="View Details">Commercial House</a>
                                    </td>
                                    <td>
                                        <h5 class="font-size-14 mb-1"><a href="landlord-details.html" class="text-dark">Jane Muthoni</a></h5>

                                    </td>
                                    <td>
                                        Management
                                    </td>
                                    <td>
                                        <span class="badge badge-soft-info font-size-11 m-1">Residential</span>
                                    </td>
                                    <td>13</td>
                                    <td>40</td>
                                    <td class="text-danger">
                                        36
                                    </td>
                                    <td class="text-success">
                                        20
                                    </td>

                                    <td>
                                        <div class="dropdown">
                                            <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="property-details.html"><i class="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed view</a>
                                                <a class="dropdown-item" href="property-units.html"><i class="font-size-15 mdi mdi-home-variant me-3"></i>Units</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-chat-plus me-3"></i>Message All Tenants</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  dripicons-wrong me-3 text-danger"></i>Deactivate property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  mdi-file-document-multiple mdi me-3 text-info"></i>Rent Statements</a>
                                                <a class="dropdown-item" href="property-tenant-schedule.html"><i class="font-size-15  mdi-file-clock mdi me-3 text-info"></i>Rent Schedule</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>

                                    <td>
                                        <div class="d-flex  align-items-center">
                                            <div class="the-mail-checkbox pr-4">
                                                <input class="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1"/>
                                            </div>

                                        </div>
                                    </td>
                                    <td class="text-capitalize">3</td>
                                    <td class="text-capitalize">
                                        <a href="property-details.html" title="View Details">BrookHouse</a>
                                    </td>
                                    <td>
                                        <h5 class="font-size-14 mb-1"><a href="landlord-details.html" class="text-dark">Dancan Kamau</a></h5>

                                    </td>
                                    <td>
                                        lease
                                    </td>
                                    <td>
                                        <span class="badge badge-soft-warning font-size-11 m-1">Commercial/Residential</span>
                                    </td>
                                    <td>10</td>
                                    <td>22</td>
                                    <td class="text-danger">
                                        32
                                    </td>
                                    <td class="text-success">
                                        14
                                    </td>

                                    <td>
                                        <div class="dropdown">
                                            <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="property-details.html"><i class="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed view</a>
                                                <a class="dropdown-item" href="property-units.html"><i class="font-size-15 mdi mdi-home-variant me-3"></i>Units</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-chat-plus me-3"></i>Message All Tenants</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  dripicons-wrong me-3 text-danger"></i>Deactivate property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  mdi-file-document-multiple mdi me-3 text-info"></i>Rent Statements</a>
                                                <a class="dropdown-item" href="property-tenant-schedule.html"><i class="font-size-15  mdi-file-clock mdi me-3 text-info"></i>Rent Schedule</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>

                                    <td>
                                        <div class="d-flex  align-items-center">
                                            <div class="the-mail-checkbox pr-4">
                                                <input class="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1" />
                                            </div>

                                        </div>
                                    </td>
                                    <td class="text-capitalize">4</td>
                                    <td class="text-capitalize">
                                        <a href="property-details.html" title="View Details">Airtel</a>
                                    </td>
                                    <td>
                                        <h5 class="font-size-14 mb-1"><a href="landlord-details.html" class="text-dark">James Mwangi</a></h5>

                                    </td>
                                    <td>
                                        Lease
                                    </td>
                                    <td>
                                        <span class="badge badge-soft-success font-size-11 m-1">Commercial</span>
                                    </td>
                                    <td>16</td>
                                    <td>56</td>
                                    <td class="text-danger">
                                        19
                                    </td>
                                    <td class="text-success">
                                        22
                                    </td>

                                    <td>
                                        <div class="dropdown">
                                            <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="property-details.html"><i class="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed view</a>
                                                <a class="dropdown-item" href="property-units.html"><i class="font-size-15 mdi mdi-home-variant me-3"></i>Units</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-chat-plus me-3"></i>Message All Tenants</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  dripicons-wrong me-3 text-danger"></i>Deactivate property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  mdi-file-document-multiple mdi me-3 text-info"></i>Rent Statements</a>
                                                <a class="dropdown-item" href="property-tenant-schedule.html"><i class="font-size-15  mdi-file-clock mdi me-3 text-info"></i>Rent Schedule</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>

                                    <td>
                                        <div class="d-flex  align-items-center">
                                            <div class="the-mail-checkbox pr-4">
                                                <input class="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1"/>
                                            </div>

                                        </div>
                                    </td>
                                    <td class="text-capitalize">5</td>
                                    <td class="text-capitalize">
                                        <a href="property-details.html" title="View Details">Union towers</a>
                                    </td>
                                    <td>
                                        <h5 class="font-size-14 mb-1"><a href="landlord-details.html" class="text-dark">Angela Wanjiru</a></h5>

                                    </td>
                                    <td>
                                        Management
                                    </td>
                                    <td>
                                        <span class="badge badge-soft-info font-size-11 m-1">Residential</span>
                                    </td>
                                    <td>19</td>
                                    <td>44</td>
                                    <td class="text-danger">
                                        30
                                    </td>
                                    <td class="text-success">
                                        16
                                    </td>

                                    <td>
                                        <div class="dropdown">
                                            <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="property-details.html"><i class="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed view</a>
                                                <a class="dropdown-item" href="property-units.html"><i class="font-size-15 mdi mdi-home-variant me-3"></i>Units</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-chat-plus me-3"></i>Message All Tenants</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  dripicons-wrong me-3 text-danger"></i>Deactivate property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  mdi-file-document-multiple mdi me-3 text-info"></i>Rent Statements</a>
                                                <a class="dropdown-item" href="property-tenant-schedule.html"><i class="font-size-15  mdi-file-clock mdi me-3 text-info"></i>Rent Schedule</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>

                                    <td>
                                        <div class="d-flex  align-items-center">
                                            <div class="the-mail-checkbox pr-4">
                                                <input class="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1"/>
                                            </div>

                                        </div>
                                    </td>
                                    <td class="text-capitalize">6</td>
                                    <td class="text-capitalize">
                                        <a href="property-details.html" title="View Details">Generam Motors</a>
                                    </td>
                                    <td>
                                        <h5 class="font-size-14 mb-1"><a href="landlord-details.html" class="text-dark">Elias Karanja</a></h5>

                                    </td>
                                    <td>
                                        Management
                                    </td>
                                    <td>
                                        <span class="badge badge-soft-warning font-size-11 m-1">Commercial/Residential</span>
                                    </td>
                                    <td>11</td>
                                    <td>16</td>
                                    <td class="text-danger">
                                        33
                                    </td>
                                    <td class="text-success">
                                        15
                                    </td>

                                    <td>
                                        <div class="dropdown">
                                            <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="property-details.html"><i class="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed view</a>
                                                <a class="dropdown-item" href="property-units.html"><i class="font-size-15 mdi mdi-home-variant me-3"></i>Units</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-chat-plus me-3"></i>Message All Tenants</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  dripicons-wrong me-3 text-danger"></i>Deactivate property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  mdi-file-document-multiple mdi me-3 text-info"></i>Rent Statements</a>
                                                <a class="dropdown-item" href="property-tenant-schedule.html"><i class="font-size-15  mdi-file-clock mdi me-3 text-info"></i>Rent Schedule</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>

                                    <td>
                                        <div class="d-flex  align-items-center">
                                            <div class="the-mail-checkbox pr-4">
                                                <input class="form-check-input mt-0 pt-0 form-check-dark" type="checkbox" id="formCheck1" />
                                            </div>

                                        </div>
                                    </td>
                                    <td class="text-capitalize">7</td>
                                    <td class="text-capitalize">
                                        <a href="property-details.html" title="View Details">The Standard</a>
                                    </td>
                                    <td>
                                        <h5 class="font-size-14 mb-1"><a href="landlord-details.html" class="text-dark">Mary Wangare</a></h5>

                                    </td>
                                    <td>
                                        Management
                                    </td>
                                    <td>
                                        <span class="badge badge-soft-info font-size-11 m-1">Residential</span>
                                    </td>
                                    <td>18</td>
                                    <td>27</td>
                                    <td class="text-danger">
                                        14
                                    </td>
                                    <td class="text-success">
                                        22
                                    </td>

                                    <td>
                                        <div class="dropdown">
                                            <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="property-details.html"><i class="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed view</a>
                                                <a class="dropdown-item" href="property-units.html"><i class="font-size-15 mdi mdi-home-variant me-3"></i>Units</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-chat-plus me-3"></i>Message All Tenants</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  dripicons-wrong me-3 text-danger"></i>Deactivate property</a>
                                                <a class="dropdown-item" href="#"><i class="font-size-15  mdi-file-document-multiple mdi me-3 text-info"></i>Rent Statements</a>
                                                <a class="dropdown-item" href="property-tenant-schedule.html"><i class="font-size-15  mdi-file-clock mdi me-3 text-info"></i>Rent Schedule</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>







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