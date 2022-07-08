import React from 'react'

function Zones() {
  return (
    <>
       <div class="page-content">
                <div class="container-fluid">

                    {/* <!-- start page title --> */}
                    <div class="row">
                        <div class="col-12">
                            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 class="mb-sm-0 font-size-18">Registered Zones</h4>

                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item"><a href="index.html">Dashboards</a></li>
                                        <li class="breadcrumb-item"><a href="#">Set Ups</a></li>
                                        <li class="breadcrumb-item active">Registered Zones</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <!-- end page title --> */}
                    <div class="row">
                        <div class="col-12">
                            <div class="card">

                                <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">

                                    <div class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100" role="toolbar">
                                        <div class="d-flex align-items-center flex-grow-1">
                                            <h4 class="mb-0  bg-transparent  p-0 m-0">Zones Register</h4>
                                        </div>
                                        <div class="d-flex">

                                            <button type="button" class="btn btn-primary waves-effect btn-label waves-light me-3" data-bs-toggle="modal" data-bs-target="#add-new-zone">
                                                <i class="mdi mdi-plus label-icon"></i> Add Zone
                                            </button>

                                        </div>

                                    </div>

                                </div>
                                <div class="card-body">
                                    <div class="table-responsive table-responsive-md">
                                        <table class="table table-editable align-middle table-edits">
                                            <thead class="table-light">
                                                <tr class="text-uppercase table-dark">
                                                    <th>#</th>
                                                    <th>Zone Name</th>
                                                    <th>County</th>
                                                    <th>Tot. Estates</th>
                                                    <th>Agent In charge</th>
                                                    <th class="text-nowrap">Total Premises</th>
                                                    <th class="text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr data-id="1">
                                                    <td style="width: 80px">1.</td>
                                                    <td data-field="estate">Zone A</td>
                                                    <td data-field="unit-num ">Nakuru</td>
                                                    <td data-field="unit-num ">22</td>
                                                    <td data-field="unit-num ">Alex Kibicho</td>
                                                    <td class="">22</td>
                                                    <td class="text-right cell-change text-nowrap ">
                                                        <div class="d-flex">
                                                            <a class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit " title="Edit "><i class="bx bx-edit-alt "></i></a>
                                                            <button class="btn btn-primary btn-sm text-uppercase px-3 save-tbl-btn mx-3 d-none " title="save ">Save</button>
                                                            <a class="btn btn-light btn-circle waves-effect font-18px btn-transparent cancel-changes d-none " title="Cancel "><i class="bx bx-x "></i></a>
                                                            <button class="btn btn-success btn-sm text-uppercase px-3 mx-3" title="save ">Change Estate agent</button>

                                                        </div>

                                                    </td>
                                                </tr>
                                                <tr data-id="2">
                                                    <td style="width: 80px">2.</td>
                                                    <td data-field="estate">Zone A</td>
                                                    <td data-field="unit-num ">Nakuru</td>
                                                    <td data-field="unit-num ">22</td>
                                                    <td data-field="unit-num ">Alex Kibicho</td>
                                                    <td class="">22</td>
                                                    <td class="text-right cell-change text-nowrap ">
                                                        <div class="d-flex">
                                                            <a class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit " title="Edit "><i class="bx bx-edit-alt "></i></a>
                                                            <button class="btn btn-primary btn-sm text-uppercase px-3 save-tbl-btn mx-3 d-none " title="save ">Save</button>
                                                            <a class="btn btn-light btn-circle waves-effect font-18px btn-transparent cancel-changes d-none " title="Cancel "><i class="bx bx-x "></i></a>
                                                            <button class="btn btn-success btn-sm text-uppercase px-3 mx-3" title="save ">Change Estate agent</button>

                                                        </div>

                                                    </td>
                                                </tr>
                                                <tr data-id="3">
                                                    <td style="width: 80px">3.</td>
                                                    <td data-field="estate">Zone A</td>
                                                    <td data-field="unit-num ">Nakuru</td>
                                                    <td data-field="unit-num ">22</td>
                                                    <td data-field="unit-num ">Alex Kibicho</td>
                                                    <td class="">22</td>
                                                    <td class="text-right cell-change text-nowrap ">
                                                        <div class="d-flex">
                                                            <a class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit " title="Edit "><i class="bx bx-edit-alt "></i></a>
                                                            <button class="btn btn-primary btn-sm text-uppercase px-3 save-tbl-btn mx-3 d-none " title="save ">Save</button>
                                                            <a class="btn btn-light btn-circle waves-effect font-18px btn-transparent cancel-changes d-none " title="Cancel "><i class="bx bx-x "></i></a>
                                                            <button class="btn btn-success btn-sm text-uppercase px-3 mx-3" title="save ">Change Estate agent</button>

                                                        </div>

                                                    </td>
                                                </tr>


                                                <tr class="cloneCharges d-none">
                                                    <td style="width: 80px " class="categoryIndex ">#</td>
                                                    <td>
                                                        <input type="text " class="form-control " placeholder="estate Name" />
                                                    </td>

                                                    <td>
                                                        <select class="form-select" style="width:130px">
                                                            <option value="">Nairobi</option>
                                                            <option value="">Mombasa</option>
                                                            <option value="">Nakuru</option>
                                                      </select>
                                                    </td>
                                                    <td>
                                                        -
                                                    </td>
                                                    <td>
                                                        -
                                                    </td>
                                                    <td>
                                                        -
                                                    </td>

                                                    <td class="text-right cell-change d-flex align-items-center justify-content-end">
                                                        <button class="btn btn-primary btn-sm text-uppercase px-3 save-new-btn mx-3 " title="save ">Save</button>
                                                        <a class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent cancel-new-category " title="Cancel "><i class="bx bx-x "></i></a>

                                                    </td>
                                                </tr>


                                            </tbody>                                       
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* <!-- end col --> */}
                    </div>
                    {/* <!-- end row --> */}


                </div>
                {/* <!-- container-fluid --> */}
       </div>
    </>
  )
}

export default Zones