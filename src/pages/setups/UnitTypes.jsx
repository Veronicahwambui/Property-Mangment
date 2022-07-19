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
  const [error, setError] = useState({
    message: "",
    color: ""
  });
  const [numberOfRooms ,setNumberOfRooms ] = useState('')
  const [purpose ,setPurpose] = useState('')
  const [squarage ,setSquarage] = useState('')
  const [monthCountForTenancyRenewal ,setMonthCountForTenancyRenewal] = useState('')

  useEffect(() => {
    fetchTypes();
    fetchAll();
  }, [])



  // fetch list function 
  const fetchAll = () => {
    requestsServiceService.allUnitTypes().then((res) => {
       setList(res.data.data)
    })
  }

  const fetchTypes = () => {
    requestsServiceService.allApplicableCharges().then((res) => {
      setChargeTypes(res.data.data)
    })
  }


  // create function 
  const create = () => {
    let data = JSON.stringify({
      active: true,
      clientId: parseInt(authService.getClientId()),
      id: null,
      monthCountForTenancyRenewal: monthCountForTenancyRenewal,
      name: createName,
      numberOfRooms: numberOfRooms,
      purpose: purpose,
      squarage: squarage,
      unitTypeApplicableCharges: selectedChargeTypes
    })

    requestsServiceService.createUnitTypes(data).then((res) => {
      fetchAll()
     $("#add-new-zone").modal("hide");

      if(res.data.status){
        setError({
          ...error,
          message: res.data.message,
          color: "success"
        }) } else {
  
          setError({
            ...error,
            message: res.data.message,
            color: "warning"
          }) 
        }
        
        
        setTimeout(() => {
          clear()
        }, 3000)
  
     }).catch((res)=>{
    $("#add-new-zone").modal("hide");
        
        setError({
          ...error,
          message: res.data.message,
          color: "danger"
        })
  
        setTimeout(() => {
          clear()
        }, 3000)
  
  
      })
    }
    
    const clear = ()=> {
      setError({
        ...error,
        message: "",
        color: ""
      });
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
      monthCountForTenancyRenewal: monthCountForTenancyRenewal,
      name: updateName,
      numberOfRooms: numberOfRooms,
      purpose: purpose,
      squarage: squarage,
      unitTypeApplicableCharges: selectedChargeTypes
    })
    requestsServiceService.updateUnitType(data).then((res) => {
    $("#update-modal").modal("hide");
       
      fetchAll() 

      if(res.data.status){
        setError({
          ...error,
          message: res.data.message,
          color: "success"
        }) } else {
  
          setError({
            ...error,
            message: res.data.message,
            color: "warning"
          }) 
        }
        
        
        setTimeout(() => {
          clear()
        }, 3000)
  
      }).catch((res)=>{
        $("#update-modal").modal("hide");
  
        setError({
          ...error,
          message: res.data.message,
          color: "danger"
        })
  
        setTimeout(() => {
          clear()
        }, 3000)
  
  
      })
    }
    


  const setChargeTypes1 = (el) => {
    let options = el.target.options;
    let userGroups  = [];

    for (var i = 0, l = options.length; i < l; i++) {

      if (options[i].selected) {
        console.log( "option ++ " +options[i].value)
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
                        onClick={()=>{ setMonthCountForTenancyRenewal('');
                          setPurpose('');
                        setNumberOfRooms('');
                       setSquarage('')}}
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
                {error.color !== "" &&
                  <div className={"alert alert-" + error.color} role="alert">
                    {error.message}
                  </div>
                  }
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                        <tr class="text-uppercase table-dark">
                          <th>#</th>
                          <th>Unit Type</th>
                          <th>purpose</th>
                          <th>no of rooms</th>
                          <th>unit size</th>
                          <th>months to renewal</th>
                          <th>Status</th>
                          <th class="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>

                        {list && list.map((val, index) => {

                          return (
                            <tr data-id="1" key={index}>
                              <td style={{ width: "80px" }}>{index + 1}</td>
                              <td data-field="unit-num " className='text-capitalize'>{val.name}</td>
                                <td>{val.purpose}</td>
                              <td>{val.numberOfRooms} rooms</td>
                              <td>{val.squarage} M <sup>2</sup></td>
                              <td>{val.monthCountForTenancyRenewal}</td>
                              <td data-field="unit-num ">{val.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span>}</td>
                              <td class="text-center cell-change text-nowrap ">
                                <div class="d-flex align-items-center justify-content-between">

                                  <a onClick={() => { 
                                    setActiveId(val.id); 
                                  setUpdateName(val.name); 
                                  Zones(val.applicableChargeType);
                                  setMonthCountForTenancyRenewal(val.monthCountForTenancyRenewal);
                                  setPurpose(val.purpose);
                                setNumberOfRooms(val.numberOfRooms);
                               setSquarage(val.squarage)
                              }} data-bs-toggle="modal"
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
        <form onSubmit={(e) => { e.preventDefault(); create() }}>

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
                    <input required value={createName} onChange={(e) => setCreateName(e.target.value)} type="text" class="form-control" placeholder="Enter unit type name" />
                  </div>
                </div>
                <div class="col-12">

                  <label for="">Charge Type </label>
                  <select
                    class=" form-control"
                    multiple
                    onChange={(e) => setChargeTypes1(e)}
                  >
                    {chargeTypes && chargeTypes.map((charge , index) => {
                      return (
                        <option
                          key={index}
                          value={charge.id}
                          selected={selectedChargeTypes.includes(charge.name)}
                        >
                          {charge.name}</option>
                      )
                    })}
                  </select>

                </div>

                <div className="form-group">
                      <label htmlFor="">Purpose</label>
                      <input required type="text" value={purpose} className="form-control" onChange={(event) => setPurpose(event.target.value)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Number of Rooms</label>
                      <input required type="text" value={numberOfRooms} className="form-control" onChange={(event) => setNumberOfRooms(event.target.value)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">unit size in M<sup>2</sup></label>
                      <input required type="text" value={squarage} className="form-control" onChange={(event) => setSquarage(event.target.value)} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="">Months to renewal </label>
                      <input required type="text" value={monthCountForTenancyRenewal} className="form-control" onChange={(event) => setMonthCountForTenancyRenewal(event.target.value)} />
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
                type="submit"
                class="btn btn-primary"
              >
                Create
              </button>
            </div>
            </form>
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
        <form onSubmit={(e) => { e.preventDefault(); Update() }}>

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
                    <input required value={updateName} onChange={(e) => setUpdateName(e.target.value)} type="text" class="form-control" placeholder="Enter update name" />
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
                    {chargeTypes && chargeTypes.map((charge , index) => {
                      return (
                        <option key={index} 

                        value={charge.id}
                        selected={selectedChargeTypes.includes(charge.id)}
                         className="text-capitalize">
                          {charge.name}</option>
                      )
                    })}
                  </select>

                </div>

                <div className="form-group">
                      <label htmlFor="">Purpose</label>
                      <input required type="text" value={purpose} className="form-control" onChange={(event) => setPurpose(event.target.value)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Number of Rooms</label>
                      <input required type="text" value={numberOfRooms} className="form-control" onChange={(event) => setNumberOfRooms(event.target.value)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">unit size in M<sup>2</sup></label>
                      <input required type="text" value={squarage} className="form-control" onChange={(event) => setSquarage(event.target.value)} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="">Months to renewal </label>
                      <input required type="text" value={monthCountForTenancyRenewal} className="form-control" onChange={(event) => setMonthCountForTenancyRenewal(event.target.value)} />
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
                type="submit"
                class="btn btn-primary"
              >
                Update
              </button>
            </div>
            </form>
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