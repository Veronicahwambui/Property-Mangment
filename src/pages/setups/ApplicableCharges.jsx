/* global $ */

import React, { useEffect, useState } from 'react'
import authService from '../../services/auth.service'
import requestsServiceService from '../../services/requestsService.service'

function ApplicableCharges() {

  const [list , setList]=useState([])
  const [activeId, setActiveId] = useState('')
  const [createName, setCreateName]= useState('')
  const [updateName, setUpdateName]= useState('')
  const [chargeTypes , setChargeTypes]= useState([])
  const [chargeType, setChargeType]= useState('')
  const [updateChargeType, setUpdateChargeType]= useState('')
    const [isChecked, setIsChecked] = useState(false);
    const [updateCheck, setUpdateCheck] = useState(false);

    const [error, setError] = useState({
    message: "",
    color: ""
  });
  const [manualVal ,setManualVal] = useState(false)
  const [ newManualVal ,setNewManualVal] = useState(false)
  


  useEffect(()=>{
    fetchTypes()
    fetchAll()
  },[])

  // fetch list function 
  const fetchAll = ()=>{
    requestsServiceService.allApplicableCharges().then((res)=>{
       setList(res.data.data)
    })
  }

  const fetchTypes = ()=>{
    requestsServiceService.applicableChargeTypes().then((res)=>{
       setChargeTypes(res.data.data)
    })
  }

  // create function 
  const create = ()=>{
   let data = JSON.stringify({
    active: true,
    applicableChargeTypeName: chargeType,
    clientId: authService.getClientId(),
    expectManualValues: manualVal,
    id: null,
    name: createName,
       refundable: isChecked,
  })
   requestsServiceService.createApplicableCharges(data).then((res)=>{
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
  const toggleStatus = ()=>{
    
    requestsServiceService.toogleApplicableCharge(activeId).then((res)=>{
      fetchAll()
    })
  }
 
  // update function 
  const Update = ()=>{
     let data = JSON.stringify({
      active: true,
      applicableChargeTypeName  : updateChargeType,
      clientId: authService.getClientId(),
      expectManualValues: newManualVal,
      id: activeId,
      name: updateName,
         refundable:updateCheck
    })
    requestsServiceService.updateApplicableCharges(data).then((res)=>{
     fetchAll()
     $("#update-modal").modal("hide");

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
   const handleOnChange = () => {
        setIsChecked(!isChecked);
       setUpdateCheck(!updateCheck)
    };



  return (
    <>
    <div class="page-content">
      <div class="container-fluid">
        {/* <!-- start page title --> */}
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0 font-size-18">Applicable Charges</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a  href="index.html">Dashboards</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Set Ups</a>
                  </li>
                  <li class="breadcrumb-item active">Applicable Charges</li>
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
                      Applicable Charges
                    </h4>
                  </div>
                  <div class="d-flex">
                    <button
                      onClick={()=>{setManualVal(true);chargeTypes && setChargeType(chargeTypes[0]); fetchTypes();}}
                      type="button"
                      class="btn btn-primary waves-effect btn-label waves-light me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#add-new-zone"
                    >
                      <i class="mdi mdi-plus label-icon"></i> Add Applicable Charge
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
                        <th>Premise Type</th>
                        <th>Charge type</th>
                        <th>Accept Manual Values</th>
                        <th>Status</th>
                        <th class="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                  
                        {list &&  list.map(( val , index)=>{
                          return(
                            <tr data-id="1" key={val}>
                            <td style={{ width: "80px" }}>{index+ 1}</td>
                            <td className='text-capitalize'>{val.name}</td>
                            <td className='text-capitalize'>{val.applicableChargeType != null && val.applicableChargeType.toLowerCase().replace(/_/g," ")}</td>
                            <td>{ val.expectManualValues ? "Yes": "No" } </td>
                            <td data-field="unit-num ">{val.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span> }</td>
                            <td class="text-center cell-change text-nowrap ">
                            <div class="d-flex align-items-center justify-content-between">
                           
                            <a  onClick={()=> {setActiveId(val.id); setUpdateName(val.name); setUpdateChargeType(val.applicableChargeType) ; setNewManualVal(val.expectManualValues)}}   data-bs-toggle="modal"
                                             data-bs-target="#update-modal" class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit " title="Edit "><i class="bx bx-edit-alt "></i></a>
                            
                            {val.active ?  <button
                                class="btn btn-danger btn-sm text-uppercase px-2 mx-3"
                                title="deactivate"
                                data-bs-toggle="modal"
                                data-bs-target="#confirm-deactivate"
                                onClick={()=> setActiveId(val.id)}
                              >
                               Deactivate
                              </button>:  <button
                                class="btn btn-success btn-sm  text-uppercase px-3 py-0 mx-3"
                                title="deactivate"
                                data-bs-toggle="modal"
                                data-bs-target="#confirm-activate"
                                onClick={()=> setActiveId(val.id)}
                              >
                               Activate
                              </button> }

                              </div>

                             
                            </td>
                              </tr>
                        )})}

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
                New Applicable Charge
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
                  <label for="">Applicable Charge Name </label>
                    <input required value={createName} onChange={ (e)=> setCreateName(e.target.value)} type="text" class="form-control" placeholder="Enter applicable charge name" />
                  </div>
            </div>
                <div class="col-12">
               
                    <label for="">Accept Manual charges </label>
                    <select
                      class="form-control"
                      data-live-search="true"
                      title=""
                      required="required"
                      onChange={(e) =>{ setManualVal(e.target.value)}}
                    >
                      <option value="true" >True</option>
                      <option value="false">False</option>
                    </select>                 
                </div>
                <div class="col-12">
               
                    <label for="">Charge Type </label>
                    <select
                      class="form-control"
                      data-live-search="true"
                      required="required"
                      title="Select Applicable Charge Type"
                      onChange={(e) =>{  setChargeType(e.target.value);}}
                    >
                      {chargeTypes &&  chargeTypes.map((charge) =>{ return (
                       <option key={charge}  value={charge}>{charge.toLowerCase().replace(/_/g ," ")}</option>
                      )})}
                    </select>
                  
                </div>
                  <div className="col-12 p-4">
                          <input type="checkbox" checked={isChecked} onChange={handleOnChange}/> Refundable?
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
                Update Applicable Charges
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
                  <label for=""> Applicable Charge Name </label>
                    <input value={updateName} onChange={ (e)=> setUpdateName(e.target.value)} type="text" class="form-control" placeholder="Enter create name" required />
                  </div>
            </div>
            <div class="col-12">
               
               <label for="">Accept Manual charges </label>
               <select
                 class="form-control"
                 data-live-search="true"
                 title=""
                 onChange={(e)=> setNewManualVal(e.target.value)}
               >
                 <option value="true" selected={ newManualVal ? "selected" : '' } >True</option>
                 <option value="false" selected={ !newManualVal ? "selected" : '' }>False</option>
               </select>                 
           </div>

                <div class="col-12">
               
                    <label for="">Charge Type </label>
                    <select
                      class="form-control"
                      data-live-search="true"
                      title="Select Applicable Charge Type"
                      onChange={(e) => setUpdateChargeType(e.target.value)}
                    >
                      {chargeTypes &&  chargeTypes.map((charge) =>{ return (
                       <option key={charge} value={charge} selected={ charge === updateChargeType ? "selected" : '' } className="text-capitalize">{charge.toLowerCase().replace(/_/g ," ")}</option>
                      )})}
                    </select>
                  
                </div>
                  <div className="col-12 p-4">
                      <input type="checkbox" checked={updateCheck} onChange={handleOnChange}/> Refundable?
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
              <h5>Deactivate this  premise type?</h5>
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
              onClick={()=>toggleStatus()}
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
              <h5>Activate this  premise type?</h5>
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
              onClick={()=>toggleStatus()}
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

export default ApplicableCharges