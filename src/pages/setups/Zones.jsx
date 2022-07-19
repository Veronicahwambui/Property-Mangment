/* global $ */

import React, { useEffect ,useState } from 'react'
import requestsServiceService from '../../services/requestsService.service'

function Zones() {
   const [zones , setZones ]= useState([])
   const [zoneName , setZoneName ]= useState('')
   const [clientCounties, setClientCounties] = useState([]);
   const [selectedCounty, setSelectedCounty] = useState("");
   const [activeId , setActiveId] = useState('')
   const [error, setError] = useState({
    message: "",
    color: ""
  });
  const [editName , setEditName] = useState('')
  const [newCounty , setNewCounty] =useState('')
  const [zoneId , setZoneId] = useState('')

 const  handleEdit= (name ,id,zonId)=>{
    setEditName(name)
    setNewCounty(id)
    setZoneId(zonId)
 }

 console.log(newCounty);
  
  useEffect(()=>{
     getZones()
     getClientCounties()
  },[])
 

    // get client counties
    const getClientCounties = () => {
      requestsServiceService.getClientCounties().then((res) => {
        setClientCounties(res.data.data);
      });
  };
  // console.log(zones);
  // create zone 

  const createZone = ()=>{
     let data = JSON.stringify({
      active: true,
      clientCountyId: parseInt(selectedCounty),
      id: 0,
      name: zoneName,
    })
  
    requestsServiceService.createZone(data).then((res)=>{
        getZones()  
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

    })
  }

  const clear = ()=> {
    setError({
      ...error,
      message: "",
      color: ""
    });
  }
  // get all zones 

  const getZones =()=>{
    requestsServiceService.getAllZones().then((res)=>{
      console.log(res.data);
      setZones(res.data.data)
    })
  }

  // update zone 

  const updateZone = ()=>{
 let data = JSON.stringify({
  "active": true,
  "clientCountyId": newCounty,
  "id": zoneId,
  "name": editName
})

requestsServiceService.editZone(data).then((res)=>{
  // console.log(res.data);
  getZones()
  $("#edit-zone").modal("hide");

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
    $("#edit-zone").modal("hide");
    
    setError({
      ...error,
      message: res.data.message,
      color: "danger"
    })

  })
}

  //   const deactivate 

const deactivate = (id)=> {
  requestsServiceService.deactivateZone(id).then((res)=>{
      getZones()
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
              <h4 class="mb-sm-0 font-size-18">Registered Zones</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="index.html">Dashboards</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Set Ups</a>
                  </li>
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
                <div
                  class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                  role="toolbar"
                >
                  <div class="d-flex align-items-center flex-grow-1">
                    <h4 class="mb-0  bg-transparent  p-0 m-0">
                      Zone Register
                    </h4>
                  </div>
                  <div class="d-flex">
                    <button
                      onClick={()=>{ setZoneName(''); clientCounties && setSelectedCounty(clientCounties[0].id) ;getClientCounties()}}
                      type="button"
                      class="btn btn-primary waves-effect btn-label waves-light me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#add-new-zone"
                    >
                      <i class="mdi mdi-plus label-icon"></i> Add Zone
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
                        <th>Zone</th>
                        <th>Status</th>
                        <th class="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                  
                        
                      {zones &&  zones.map((zon, index)=>{

                          return (
                              <tr data-id="1" key={zon}>
                            <td style={{ width: "80px" }}>{index+ 1}</td>
                            <td data-field="unit-num ">{zon.name}</td>
                            <td data-field="unit-num ">{zon.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span> }</td>
                            <td class="text-right cell-change text-nowrap ">
                              <div className="d-flex align-items-center">
                              <a onClick={()=>{
                                handleEdit(zon.name , zon.clientCounty.id ,zon.id)
                              }} class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "  data-bs-toggle="modal"
                      data-bs-target="#edit-zone" title="Edit "><i class="bx bx-edit-alt "></i></a>
                            {zon.active ?  <button
                                class="btn btn-danger btn-sm  text-uppercase px-2 mx-3"
                                title="deactivate"
                                data-bs-toggle="modal"
                                data-bs-target="#confirm-deactivate"
                                onClick={()=> setActiveId(zon.id)}
                              >
                               Deactivate
                              </button>:  <button
                                class="btn btn-success btn-sm w-5 text-uppercase px-3 mx-3"
                                title="deactivate"
                                data-bs-toggle="modal"
                                data-bs-target="#confirm-activate"
                                onClick={()=> setActiveId(zon.id)}
                              >
                               Activate
                              </button> }

                        
                              </div>
                            </td>
                              </tr>
                            
                          )
                      })}

                      <tr class="cloneCharges d-none">
                        <td style={{ width: "80px" }} class="categoryIndex ">
                          #
                        </td>
                        <td>
                          <input
                            type="text "
                            class="form-control "
                            placeholder="estate Name"
                          />
                        </td>

                        <td>
                          <select
                            class="form-select"
                            style={{ width: "130px" }}
                          >
                            <option value="">Nairobi</option>
                            <option value="">Mombasa</option>
                            <option value="">Nakuru</option>
                          </select>
                        </td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>

                        <td class="text-right cell-change d-flex align-items-center justify-content-end">
                          <button
                            class="btn btn-primary btn-sm text-uppercase px-3 save-new-btn mx-3 "
                            title="save "
                          >
                            Add
                          </button>
                          <a
                            class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent cancel-new-category "
                            title="Cancel "
                          >
                            <i class="bx bx-x "></i>
                          </a>
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

    {/* <!-- modals --> */}
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
        <form onSubmit={(e) => { e.preventDefault(); createZone() }}>
           
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              New Zone
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
                                        <label for="">Zone Name</label>
                                        <input required value={zoneName} onChange={ (e)=> setZoneName(e.target.value)} type="text" class="form-control" placeholder="Enter zone name" />
                                    </div>
                                </div>
              <div class="col-12">
                  <label for="">County</label>
                  <select
                    class="form-control"
                    data-live-search="true"
                    title="Select county where the zone is"
                    onChange={(e) => setSelectedCounty(e.target.value)}
                  >
                    {clientCounties && clientCounties.map((cou , index) =>{ 
                       let county = cou.county
                      return (
                     <option key={index} value={cou.id}>{county.name}</option>
                    )})}
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
    {/* edit zone  */}
    <div
      class="modal fade"
      id="edit-zone"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <form onSubmit={(e) => { e.preventDefault(); updateZone() }}>

          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Edit Zone
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
                <label for="">Zone Name</label>
                  <input required value={editName} onChange={ (e)=> setEditName(e.target.value)} type="text" class="form-control" placeholder="Enter zone name" />
                  </div>
                </div>

              <div class="col-12">
                  <label for="">County</label>
                  <select
                    class="form-control"
                    data-live-search="true"
                    title="Select county where the zone is"
                    onChange={(e) => setNewCounty(e.target.value)}
                  >
                    {clientCounties && clientCounties.map((cou , index) =>{ 
                       let county = cou.county
                      return (
                     <option key={index} value={cou.id} selected={ cou.id === newCounty ? "selected" : ''}>{county.name}</option>
                    )})}
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
    {/* edit zone  */}
    <div
      class="modal fade"
      id="edit-zone"
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
              Edit Zone
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
                <label for="">Zone Name</label>
                  <input value={editName} onChange={ (e)=> setEditName(e.target.value)} type="text" class="form-control" placeholder="Enter zone name" />
                  </div>
                </div>

              <div class="col-12">
                  <label for="">County</label>
                  <select
                    class="form-control"
                    data-live-search="true"
                    title="Select county where the zone is"
                    onChange={(e) => setNewCounty(e.target.value)}
                  >
                    {clientCounties && clientCounties.map((cou , index) =>{ 
                       let county = cou.county
                      return (
                     <option key={index} value={cou.id} selected={ cou.id === newCounty ? "selected" : ''}>{county.name}</option>
                    )})}
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
              onClick={updateZone}
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
              <h5>Deactivate this Zone ?</h5>
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
              onClick={()=>deactivate(activeId)}
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
              <h5>Activate this Zone ?</h5>
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
              onClick={()=>deactivate(activeId)}
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

export default Zones





