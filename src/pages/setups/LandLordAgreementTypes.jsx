import React, { useEffect ,useState } from 'react'
import requestsServiceService from '../../services/requestsService.service'

function LandLordAgreementTypes() {
  const [agreementTypes , setAgreementTypes ]= useState([])
  const [agreementTypeName , setagreementTypeName ]= useState('')
  const [clients, setClients] = useState([]);
  const [selectedClient, setselectedClient] = useState("");
  const [activeId , setActiveId] = useState('')
  const [editAgreementTypeName, setEditAgreementTypeName] = useState('')
  const [editSelectedClient, setEditSelectedClient] = useState('')
  const [editId, setEditId] = useState("")
  const [editName, setEditName] = useState('')
  const [editClientId, setEditClientId] = useState('');
  const [editType, setEditType] = useState({
    name: '',
    id: ''
  })

  useEffect(()=>{
    getAgreementTypes()
    getClients()
  },[])


  // get client counties
  const getClients = () => {
    requestsServiceService.getClients().then((res) => {
      setClients(res.data.data);
    });
    console.log(clients)
  };
  // console.log(agreementTypes);
  // create agreementType

  const createAgreementType = ()=>{
    let data = JSON.stringify({
      active: true,
      clientId: selectedClient,
      id: null,
      name: agreementTypeName,
    })
    console.log(data)
    requestsServiceService.createAgreementType(data).then((res)=>{
      if (res) {
        console.log(res)
        getAgreementTypes()
      }
      console.log(res.data);
    }).catch((err) => {
      console.log(err)
      getAgreementTypes()
    })
  }

  // get all agreementTypes

  const getAgreementTypes =()=>{
    requestsServiceService.getAllAgreementTypes().then((res)=>{
      console.log("Agreement Types", res)
      setAgreementTypes(res.data.data)
    })
  }


  // update agreementType

  const getOneAgreementType = (id) => {
    if (agreementTypes.length > 0) {
      let cl = agreementTypes.find((item) => item.id === id)
      console.log(cl)
      if(cl) {
        console.log(cl)
        setEditType({
          ...editType,
          name: cl.client.clientType.name,
          id: cl.client.clientType.id
        })
        setEditClientId(cl.client.clientType.id);
        setEditName(cl.name)
        setEditId(cl.id)
      }
    }
  }

  const updateAgreementType = ()=>{
    let data = JSON.stringify({
      active: true,
      clientId: editType.id,
      id: editId,
      name: editName,
    })
    requestsServiceService.editAgreementType(data).then((res)=>{
      getAgreementTypes()
    }).catch((err)=> {
      console.log(err)
    })
    getAgreementTypes()
  }
  let num = 0;

  //   const deactivate

  const deactivate = (id)=> {
    requestsServiceService.deactivateAgreementType(id).then((res)=>{
      getAgreementTypes()
    })
  }

  const handleEdit = (id, name) => {
    setEditName(name)
    setEditId(id);
    console.log(name, editId)
  }

  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Registered Agreement Types</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboards</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">Set Ups</a>
                    </li>
                    <li class="breadcrumb-item active">Registered Agreement Types</li>
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
                        Agreement Type Register
                      </h4>
                    </div>
                    <div class="d-flex">
                      <button
                        onClick={getClients}
                        type="button"
                        class="btn btn-primary waves-effect btn-label waves-light me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-agreementType"
                      >
                        <i class="mdi mdi-plus label-icon"></i> Add Agreement Type
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
                        <th>Agreement Type</th>
                        <th>Status</th>
                        <th class="text-right">Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      { agreementTypes.map((aT, num)=>{

                        return (
                          <tr data-id="1">
                            <td style={{ width: "80px" }}>{num + 1}</td>
                            <td data-field="unit-num ">{aT.name}</td>
                            <td data-field="unit-num ">{aT.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span> }</td>
                            <td class="text-right cell-change text-nowrap ">
                              <div className="d-flex">
                                <a onClick={() => getOneAgreementType(aT.id)} data-bs-toggle="modal"
                                   data-bs-target="#update-modal"
                                   className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                                   title="Edit "><i className="bx bx-edit-alt "></i></a>
                                {aT.active ?  <button
                                  class="btn btn-danger btn-sm  text-uppercase px-2 mx-3"
                                  title="deactivate"
                                  data-bs-toggle="modal"
                                  data-bs-target="#confirm-deactivate"
                                  onClick={()=> setActiveId(aT.id)}
                                >
                                  Deactivate
                                </button>:  <button
                                  class="btn btn-success btn-sm w-5 text-uppercase px-3 mx-3"
                                  title="deactivate"
                                  data-bs-toggle="modal"
                                  data-bs-target="#confirm-activate"
                                  onClick={()=> setActiveId(aT.id)}
                                >
                                  Activate
                                </button> }
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
      <div
        class="modal fade"
        id="add-new-agreementType"
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
                New agreementType
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <div class="form-group mb-4">
                    <label for="">Name</label>
                    <input value={agreementTypeName} onChange={ (e)=> setagreementTypeName(e.target.value)} type="text" class="form-control" placeholder="Enter agreement type name" />
                  </div>
                </div>
                <div class="col-12">
                  <label for="">Client</label>
                  <select
                    class="form-control"
                    data-live-search="true"
                    title="Select client"
                    onChange={(e) => setselectedClient(e.target.value)}
                  >
                    { clients.map((c , index) =>{
                      return (
                        <option  key={index} value={c.id}>{c.name}</option>
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
                onClick={createAgreementType}
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
                <h5>Deactivate this agreementType ?</h5>
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
                <h5>Activate this Agreement Type ?</h5>
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

      <div
        className="modal fade"
        id="update-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Update Agreement Type
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <div className="form-group mb-4">
                    <label htmlFor="">Name</label>
                    <input value={editName} onChange={(e) => setEditName(e.target.value)} type="text"
                           className="form-control" placeholder="Enter agreement type name"/>
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="">Client</label>
                  <select
                    className="form-control"
                    data-live-search="true"
                    title="Select client"
                    onChange={(e) => setEditSelectedClient(e.target.value)}
                  >
                    <option className="text-black font-semibold ">
                      {editType.name}
                    </option>
                    {clients.map((c, index) => {
                      return (
                        <option key={index} value={c.id}>{c.name}</option>
                      )
                    })}
                  </select>

                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={updateAgreementType}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandLordAgreementTypes;





