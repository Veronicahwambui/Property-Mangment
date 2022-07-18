/* global $ */

import React, { useEffect, useState } from 'react'
import authService from '../../services/auth.service'
import requestsServiceService from '../../services/requestsService.service'

function PremiseUseTypes() {
  const [list , setList]=useState([])
  const [activeId, setActiveId] = useState('')
  const [createName, setCreateName]= useState('')
  const [updateName, setUpdateName]= useState('')
  const [error, setError] = useState({
    message: "",
    color: ""
  });


  useEffect(()=>{

    fetchAll()
  },[])

  // fetch list function 
  const fetchAll = ()=>{
    requestsServiceService.allPremiseUseTypes().then((res)=>{
       setList(res.data.data)
    })
  }

  // create function 
  const create = ()=>{
   let data = JSON.stringify({
    active: true,
    clientId: authService.getClientId(),
    id: 0,
    name: createName
  })
   
   requestsServiceService.createPremiseUseTypes(data).then((res)=>{
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

  
  
  // toggle function 
  const toggleStatus = ()=>{
    
    requestsServiceService.tooglePremiseUse(activeId).then((res)=>{
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
  
 
  // update function 
  const Update = ()=>{
     let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: activeId,
      name: updateName
    })
    requestsServiceService.updatePremiseUseType(data).then((res)=>{
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
  
  return (
    <>
    <div class="page-content">
      <div class="container-fluid">
        {/* <!-- start page title --> */}
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0 font-size-18">Registered  Premise use Type</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="index.html">Dashboards</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Set Ups</a>
                  </li>
                  <li class="breadcrumb-item active">Registered  Premise Use Types</li>
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
                      Premise Use Type Register
                    </h4>
                  </div>
                  <div class="d-flex">
                    <button
                      onClick={()=>{ setCreateName('');fetchAll()}}
                      type="button"
                      class="btn btn-primary waves-effect btn-label waves-light me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#add-new-zone"
                    >
                      <i class="mdi mdi-plus label-icon"></i> Add Premise Use Type
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
                        <th>Premise Use Type</th>
                        <th>Status</th>
                        <th class="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                  
                        {list && list.map(( val , index)=>{
                          return(
                            <tr data-id="1" key={val}>
                            <td style={{ width: "80px" }}>{index+ 1}</td>
                            <td data-field="unit-num ">{val.name}</td>
                            <td data-field="unit-num ">{val.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span> }</td>
                            <td class="text-right cell-change text-nowrap ">
                            <div class="d-flex align-items-center">
                           
                            <a    onClick={()=>{setActiveId(val.id); setUpdateName(val.name)}}   data-bs-toggle="modal"
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
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              New  Premise Use Type
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
                                        <label for=""> Premise Use Type </label>
                                        <input value={createName} onChange={ (e)=> setCreateName(e.target.value)} type="text" class="form-control" placeholder="Enter create name" />
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
            <button
              onClick={create}
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* edit modal  */}
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
          Update  Premise Use Type
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
                                        <label for="">Premise Use Type</label>
                                        <input required value={updateName} onChange={ (e)=> setUpdateName(e.target.value)} type="text" class="form-control" placeholder="Enter update name" />
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
            <button
              type="submit"
              class="btn btn-primary"
            >
              Save
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
              <h5>Deactivate this  premise use type?</h5>
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
              <h5>Activate this  premise use type?</h5>
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

export default PremiseUseTypes