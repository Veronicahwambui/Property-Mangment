/* global $ */

import React, { useEffect, useState } from 'react'
import authService from '../../services/auth.service'
import requestsServiceService from '../../services/requestsService.service'
import Zones from './Zones'

function UnitTypes() {
  const [list, setList] = useState([])
  const [activeId, setActiveId] = useState('')
  const [createName, setCreateName] = useState('')
  const [updateName, setUpdateName] = useState('')
  const [chargeTypes, setChargeTypes] = useState([])
  const [selectedChargeTypes, setSelectedChargeTypes] = useState([])
  const [chargeType, setChargeType] = useState('')
  const [createArr, setCreateArr] = useState()
  const [updateArr, setUpdateArr] = useState([])

  useEffect(() => {
    fetchTypes()
    fetchAll()
  }, [])



  // fetch list function 
  const fetchAll = () => {
    requestsServiceService.allUnitTypes().then((res) => {
       setList(res.data.data)
    })
  }

  const fetchTypes = () => {
    requestsServiceService.allApplicableChargeTypes().then((res) => {
      setChargeTypes(res.data.data)
    })
  }


  // create function 
  const create = () => {
    let data = JSON.stringify({
      active: true,
      clientId: parseInt(authService.getClientId()),
      id: null,
      name: createName,
      unitTypeApplicableCharges: selectedChargeTypes
    })

    requestsServiceService.createUnitTypes(data).then((res) => {
      fetchAll()
    })
  }

  // toggle function 
  const toggleStatus = () => {

    requestsServiceService.toogleUnitType(activeId).then((res) => {
      fetchAll()
    })
  }

  // update function 
  const Update = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: activeId,
      name: updateName,
      unitTypeApplicableCharges: selectedChargeTypes
    })
    requestsServiceService.updateApplicableCharges(data).then((res) => {

      fetchAll()
    })
  }
  console.log(selectedChargeTypes);


  const setChargeTypes1 = (el) => {
    let options = el.target.options;
    let userGroups  = [];

    for (var i = 0, l = options.length; i < l; i++) {


      if (options[i].selected) {
        userGroups.push(parseInt(options[i].value));
      }

    }

    setSelectedChargeTypes(userGroups);
  }

  

  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Registered unit types </h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboards</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">Set Ups</a>
                    </li>
                    <li class="breadcrumb-item active">Unit types</li>
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
                  <div
                    class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <div class="d-flex align-items-center flex-grow-1">
                      <h4 class="mb-0  bg-transparent  p-0 m-0">
                       Unit Types
                      </h4>
                    </div>
                    <div class="d-flex">
                      <button
                        type="button"
                        class="btn btn-primary waves-effect btn-label waves-light me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-zone"
                      >
                        <i class="mdi mdi-plus label-icon"></i> Add Unit Type
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
                          <th>Unit Type</th>
                          <th>Status</th>
                          <th class="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>

                        {list.map((val, index) => {

                          return (
                            <tr data-id="1" key={index}>
                              <td style={{ width: "80px" }}>{index + 1}</td>
                              <td data-field="unit-num " className='text-capitalize'>{val.name}</td>
                              <td data-field="unit-num ">{val.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span>}</td>
                              <td class="text-center cell-change text-nowrap ">
                                <div class="d-flex justify-content-between">

                                  <a onClick={() => { 
                                    setActiveId(val.id); 
                                  setUpdateName(val.name); 
                                  Zones(val.applicableChargeType) }} data-bs-toggle="modal"
                                    data-bs-target="#update-modal" class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit " title="Edit "><i class="bx bx-edit-alt "></i></a>

                                  {val.active ? <button
                                    class="btn btn-danger btn-sm text-uppercase px-2 mx-3"
                                    title="deactivate"
                                    data-bs-toggle="modal"
                                    data-bs-target="#confirm-deactivate"
                                    onClick={() => setActiveId(val.id)}
                                  >
                                    Deactivate
                                  </button> : <button
                                    class="btn btn-success btn-sm  text-uppercase px-3 py-0 mx-3"
                                    title="deactivate"
                                    data-bs-toggle="modal"
                                    data-bs-target="#confirm-activate"
                                    onClick={() => setActiveId(val.id)}
                                  >
                                    Activate
                                  </button>}

                                </div>


                              </td>
                            </tr>
                          )
                        })}

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

      {/* <!-- modals --> */}

      {/* create modal */}
      <div
        class="modal fade"
        id="add-new-zone"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                New Unit Type
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
                    <label for="">Unit Type Name </label>
                    <input value={createName} onChange={(e) => setCreateName(e.target.value)} type="text" class="form-control" placeholder="Enter unit type name" />
                  </div>
                </div>
                <div class="col-12">

                  <label for="">Charge Type </label>
                  <select
                    class=" form-control"
                    multiple
                    size="1"
                    onChange={(e) => setChargeTypes1(e)}
                  >
                    {chargeTypes.map((charge , index) => {
                      return (
                        <option
                          key={index}
                          value={charge}
                          selected={selectedChargeTypes.includes(charge)}
                        >
                          {charge}</option>
                      )
                    })}
                  </select>

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
              <button
                onClick={create}
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* update modal  */}
      <div
        class="modal fade"
        id="update-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Update Unit Type
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
                    <label for=""> Unit Type Name </label>
                    <input value={updateName} onChange={(e) => setUpdateName(e.target.value)} type="text" class="form-control" placeholder="Enter update name" />
                  </div>
                </div>
                <div class="col-12">

                  <label for="">Charge Type </label>
                  <select
                    class="form-control"
                    data-live-search="true"
                    title="Select Applicable Charge Type"
                    multiple
                    onChange={(e) => setChargeTypes1(e)}
                  >
                    {chargeTypes.map((charge , index) => {
                      return (
                        <option key={index} 

                    selected={selectedChargeTypes.includes(charge)}
                        value={charge.id} className="text-capitalize">{charge}</option>
                      )
                    })}
                  </select>

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
              <button
                onClick={Update}
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* confirm deactivate  */}
      <div
        class="modal fade"
        id="confirm-deactivate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <center>
                <h5>Deactivate this Unit type?</h5>
              </center>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => toggleStatus()}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* confirm dactivate  */}
      <div
        class="modal fade"
        id="confirm-activate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <center>
                <h5>Activate this  Unit type?</h5>
              </center>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => toggleStatus()}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UnitTypes