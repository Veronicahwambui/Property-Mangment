import React, { useEffect ,useState } from 'react'
import authService from '../../services/auth.service';
import requestsServiceService from '../../services/requestsService.service'
import {Button, Modal} from "react-bootstrap";

function LandLordAgreementTypes() {
  const [agreementTypes , setAgreementTypes ]= useState([])
  const [agreementTypeName , setagreementTypeName ]= useState('')
  const [clients, setClients] = useState([]);
  const [selectedClient, setselectedClient] = useState({});
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

  const getClients = () => {
    const client  = {
      name: requestsServiceService.getCurrentUserClient().name,
      id: requestsServiceService.getCurrentUserClient().id
    }

    setselectedClient(client);

    requestsServiceService.getClients().then((res) => {
      setClients(res.data.data);
    });
  };
  // console.log(agreementTypes);
  // create agreementType
  const [error, setError] = useState({
    message: "",
    color: ""
  });
  const [show, setShow] = useState(false);
  const [editshow, seteditShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const editShow = () => seteditShow(true);
  const editClose = () => seteditShow(false);
  const createAgreementType = (event)=>{
    event.preventDefault();
    let data = JSON.stringify({
      active: true,
      clientId: selectedClient.id,
      id: null,
      name: agreementTypeName,
    })
    requestsServiceService.createAgreementType(data).then((res)=>{
      console.log(res);
      if (res.data.status===false) {
        setError({
          ...error,
          message: res.data.message,
          color: "danger"
        })
      } else {
        setError({
          ...error,
          message: res.data.message,
          color: "success"
        });
        getAgreementTypes();
        handleClose()
      }
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: ""
        });
      }, 2000)
    }).catch((err) => {
      setError({
        ...error,
        message: err.data.message,
        color: "danger"
      });
    })
  }

  // get all agreementTypes

  const getAgreementTypes =()=>{
    requestsServiceService.getAllAgreementTypes().then((res)=>{
      setAgreementTypes(res.data.data)
    })
  }


  // update agreementType

  const getOneAgreementType = (id) => {
    let agreementType = agreementTypes.find(aT => aT.id === id);
    setEditAgreementTypeName(agreementType.name)
    setEditId(id);
    editShow();
  }

  const updateAgreementType = (event)=>{
    event.preventDefault()
    let data = JSON.stringify({
      active: true,
      clientId: parseInt(authService.getClientId()) ,
      id: activeId,
      name: editAgreementTypeName,
    })
    requestsServiceService.editAgreementType(data).then((res)=>{
      let message = res.data.message;
      if (res.data.status===false) {
        setError({
          ...error,
          message: message,
          color: "danger"
        })
      } else {
        setError({
          ...error,
          message: message,
          color: "success"
        });
        editClose()
        getAgreementTypes()
      }
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: ""
        });
      }, 2000)
    }).catch((err)=> {
      setError({
        ...error,
        message: err.data.message,
        color: "success"
      });
    })
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
                    role="toolbar">
                    <div class="d-flex align-items-center flex-grow-1">
                      <h4 class="mb-0  bg-transparent  p-0 m-0">
                        Agreement Type Register
                      </h4>
                    </div>
                    <div class="d-flex">
                      <button
                        onClick={handleShow}
                        type="button"
                        class="btn btn-primary waves-effect btn-label waves-light me-3"
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
                      { agreementTypes?.map((aT, num)=>{

                        return (
                          <tr data-id="1">
                            <td style={{ width: "80px" }}>{num + 1}</td>
                            <td data-field="unit-num ">{aT.name}</td>
                            <td data-field="unit-num ">{aT.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span> }</td>
                            <td class="text-right cell-change text-nowrap ">
                              <div className="d-flex">
                                <a onClick={() => {getOneAgreementType(aT.id); setActiveId(aT.id)}} data-bs-toggle="modal"
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

      {/*ADD MODAL*/}
      <Modal show={show} onHide={handleClose} className={"modal fade"} centered>
        <form onSubmit={createAgreementType}>
          <Modal.Header closeButton>
            <Modal.Title>Add agreement type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              {error.color !== "" &&
              <div className={"alert alert-" + error.color} role="alert">
                {error.message}
              </div>
              }
              <div className="col-12">
                <div className="form-group mb-4">
                  <label htmlFor="">Agreement type name. <strong className="text-danger ">*</strong></label>
                  <input type="text" className="form-control" value={agreementTypeName} onChange={(e) => setagreementTypeName(e.target.value)} placeholder="Enter agreement type name" required={true}/>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className={"btn btn-grey"} onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className={"btn btn-primary"} type={"submit"}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {/*EDIT MODAL*/}
      <Modal show={editshow} onHide={editClose} className={"modal fade"} centered>
        <form onSubmit={updateAgreementType}>
          <Modal.Header closeButton>
            <Modal.Title>Update agreement type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              {error.color !== "" &&
              <div className={"alert alert-" + error.color} role="alert">
                {error.message}
              </div>
              }
              <div className="col-12">
                <div className="form-group mb-4">
                  <label htmlFor="">Agreement type name. <strong className="text-danger ">*</strong></label>
                  <input type="text" className="form-control" value={editAgreementTypeName} onChange={(e) => setEditAgreementTypeName(e.target.value)} placeholder="Enter agreement type name" required={true}/>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className={"btn btn-grey"} onClick={editClose}>
              Close
            </Button>
            <Button variant="primary" className={"btn btn-primary"} type={"submit"}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

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
                <h5>Deactivate this Agreement Type ?</h5>
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
    </>
  )
}

export default LandLordAgreementTypes;





