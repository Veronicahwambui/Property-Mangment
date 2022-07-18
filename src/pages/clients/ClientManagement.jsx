import React, { useState, useEffect } from 'react'
import requestsServiceService from '../../services/requestsService.service'
import moment from 'moment';

function ClientManagement() {
  const [clientTypes, setClientTypes] = useState([])
  const [clients, setClients] = useState([]);
  const [email, setEmail] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [othername, setOtherName] = useState("")
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("")
  const [clientUrl, setClientUrl] = useState("")
  const [clientTypeId, setClientTypeId] = useState(null)
  const [clientAdd, setClientAdd] = useState(true)
  const [clientType, setClientType] = useState({
    name: "",
    id: ""
  })
  const [client, setClient] = useState({})
  // edits
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editUrl, setEditUrl] = useState('')
  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editUsername, setEditUsername] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editClientTypeId, setEditClientTypeId] = useState(0)
  const [editOtherName, setEditOtherName] = useState('')
  const [ID, setId] = useState(0)
  const [name, setName] = useState("")

  const [error, setError] = useState({
    message: "",
    color: ""
  });

  useEffect(() => {
    getClientTypes()
    getAllClients()
    console.log(isChecked)
  }, [clientAdd])

  const getClientTypes = () => {
    requestsServiceService.getClientTypes().then((res) => {
      if (res.status === 200) {
        setClientTypes(res.data.data)
      }
    }).catch(err => console.log(err));
  }
  const getAllClients = () => {
    requestsServiceService.getClients().then((res) => {
      if (res.status === 200) {
        setClients(res.data.data)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const addClient = () => {
    const data = JSON.stringify(
      {
        adminEmail: email,
        adminFirstName: firstname,
        adminLastName: lastname,
        adminOtherName: othername,
        adminPhoneNumber: phone,
        adminUserName: username,
        clientBaseUrl: clientUrl,
        clientTypeId: clientTypeId,
        createAdminUser: isChecked,
        name: name,
        id: null,
        status: true
      }
    );
    requestsServiceService.createClient(data, isChecked).then((res) => {
      if (res.data.status === false) {
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
        getAllClients();
        setIsChecked(!isChecked);
      }
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: ""
        });
      }, 2000)
    }).catch((err) => {
      console.log(err)
      setError({
        ...error,
        message: err.message,
        color: "danger"
      })
      getAllClients();
      setTimeout(() => {
        clear()
      }, 3000)
    }).finally(() => {
      setClientType({
        clientType,
        name: '',
        id: ''
      })
      getAllClients();
      setIsChecked(true)
    })
    setClientAdd(!clientAdd);
    getAllClients();
  }

  const getOneClient = (id) => {
    if (clients.length > 0) {
      let cl = clients.find((item) => item.id === id)
      if(cl) {
        setClient(cl)
        setClientType({
          ...clientType,
          name: cl.clientType.name,
          id: cl.clientType.id
        })
        setEditClientTypeId(cl.clientType.id);
        setEditName(cl.name)
        setEditUrl(cl.clientBaseUrl)
        setId(cl.id)
      }
    }
  }

  const updateClient = () => {
    const data = JSON.stringify({
      adminEmail: "",
      adminFirstName: "",
      adminLastName: "",
      adminOtherName: "",
      adminPhoneNumber: "",
      adminUserName: "",
      clientBaseUrl: editUrl,
      clientTypeId: editClientTypeId,
      createAdminUser: false,
      name: editName,
      id: ID,
      status: true
    })
    requestsServiceService.updateClient(data).then((res) => {
      if (res.data.status === false) {
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
        getAllClients();
        setIsChecked(!isChecked);
      }
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: ""
        });
      }, 2000)
    }).catch((err) => {
      console.log(err)
      setError({
        ...error,
        message: err.message,
        color: "danger"
      })
    }).finally(() => {
      setClientType({
        clientType,
        name: '',
        id: ''
      })
    })
    setClientAdd(!clientAdd);
  }

  const clear = () => {
    setEditName("")
    setEditUrl("")
    setEditUrl("")
    setError({
      ...error,
      message: "",
      color: ""
    });
    setName("")
    setClientType({
      ...clientType,
      name: ''
    });
    setClientUrl("")
  }

  const [isChecked, setIsChecked] = useState(true);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Client Management</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="index.html">Dashboards</a></li>
                    <li class="breadcrumb-item"><a href="#">Clients</a></li>
                    <li class="breadcrumb-item active">All Clients</li>
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
                    </div>
                    <div class="d-flex">

                      <button type="button" class="btn btn-primary waves-effect btn-label waves-light me-3" data-bs-toggle="modal" data-bs-target="#add-new-client" onClick={isChecked}>
                        <i class="mdi mdi-plus label-icon"></i> Add A Client
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
                          <th>Name</th>
                          <th>Client Type</th>
                          <th>URL</th>
                          <th>Created on</th>
                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map((client, index) => (
                          <tr data-id={index} key={index}>
                            <td style={{ width: "80px" }}>{index + 1}</td>
                            <td data-field="estate">{client.name}</td>
                            <td data-field="unit-num ">{client.clientType.name.toUpperCase()}</td>
                            <td data-field="unit-num ">{client.clientBaseUrl}</td>
                            <td data-field="unit-num ">{moment(client.dateTimeCreated).format('MMMM Do YYYY')}</td>
                            <td className="text-right cell-change ">

                              <a className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit" data-bs-toggle="modal" data-bs-target="#edit-client"
                                title="Edit" onClick={() => getOneClient(client.id)}><i className="bx bx-edit-alt " /></a>
                              <button className="btn btn-primary btn-sm text-uppercase px-3 save-tbl-btn mx-3 d-none "
                                title="save ">Save
                              </button>
                              <a
                                className="btn btn-light btn-circle waves-effect font-18px btn-transparent cancel-changes d-none "
                                title="Cancel "><i className="bx bx-x "></i></a>
                              <button type="button"
                                className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                                data-bs-toggle="modal" data-bs-target="#edit"
                                onClick={() => getOneClient(client.id)}
                                style={{ marginLeft: "8px" }}
                              >
                                View Details
                              </button>
                            </td>
                            <td>

                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- adding clients modal --> */}
      <div class="modal fade" id="add-new-client" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <form>
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">New Client</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mb-4">
                      <label htmlFor=""></label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setClientTypeId(parseInt(e.target.value));
                        }}
                      >
                        <option className="text-black font-semibold ">
                          Select client type
                        </option>
                        {clientTypes.map((client) => {
                          return (
                            <option
                              key={client.id}
                              value={
                                parseInt(client.id)
                              }
                            >
                              {client.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control"
                        placeholder="Enter client name" required />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">URL</label>
                      <input type="url" value={clientUrl} onChange={(e) => setClientUrl(e.target.value)}
                        className="form-control"
                        placeholder="Enter client url" required />
                    </div>
                    <div className="result">
                    </div>
                    <div>
                      <input type="checkbox" checked={isChecked} onChange={handleOnChange}/> Create admin
                    </div>
                  </div>
                  {isChecked &&
                  <div className="row">
                    <div className="modal-header">
                      <h1 className="modal-title" id="staticBackdropLabel"></h1>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-4">
                        <label htmlFor="">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                               className="form-control"
                               placeholder="Enter admin email" required />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                               className="form-control"
                               placeholder="Enter admin username" required />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="">Other Name</label>
                        <input type="text" value={othername} onChange={(e) => setOtherName(e.target.value)}
                               className="form-control"
                               placeholder="Enter admin username" required />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-4">
                        <label htmlFor="">Phone Number</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                               className="form-control"
                               placeholder="Enter admin phone number" required />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="">First Name</label>
                        <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)}
                               className="form-control"
                               placeholder="Enter admin first name" required />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="">Last Name</label>
                        <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)}
                               className="form-control"
                               placeholder="Enter admin lastname" required />
                      </div>
                    </div>
                  </div>
                  }
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addClient}>Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <!-- view one client modal --> */}
      <div className="modal fade transaction-detailModal" id={"edit"} tabIndex="-1" role="dialog"
        aria-labelledby="transaction-detailModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          {client &&
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="transaction-detailModalLabel"><b>{client.name}</b></h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="table-responsive mt-4">
                  <table className="table align-middle table-nowrap">
                    <tbody>
                      <tr>
                        <td style={{ width: "30%" }}>
                          <p className="mb-0">Name</p>
                        </td>
                        <td style={{ width: "25%" }}>
                          <h5 className="mb-0 text-uppercase">{client.name}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-0">Client Type</p>
                        </td>
                        <td>
                          <h5 className="mb-0">{clientType.name}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-0">URL</p>
                        </td>
                        <td>
                          <h5 className="mb-0"><a href={client.clientBaseUrl}>{client.clientBaseUrl}</a></h5>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>

          }
        </div>
      </div>

      {/*edit client modal */}
      <div className="modal fade" id="edit-client" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
           role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Update Client {client.name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mb-4">
                      <label htmlFor=""></label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setEditClientTypeId(parseInt(e.target.value));
                        }}
                        name="clientType"
                      >
                        <option className="text-black font-semibold ">
                          {clientType.name}
                        </option>
                        {clientTypes.map((c) => {
                          return (
                            <option
                              value={
                                parseInt(c.id)
                              }
                            >
                              {c.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">Name</label>
                      <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="form-control"
                             placeholder="Enter client name" required/>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">URL</label>
                      <input type="url" value={editUrl} onChange={(e) => setEditUrl(e.target.value)}
                             className="form-control"
                             placeholder="Enter client url" required/>
                    </div>
                    <div className="result">
                    </div>
                    {/*<div>*/}
                    {/*  <input type="checkbox" checked={isChecked} onChange={handleOnChange}/> Create admin*/}
                    {/*</div>*/}
                  </div>
                  {isChecked &&
                  <div className="row">
                    {/*<div className="col-6">*/}
                    {/*  <div className="form-group mb-4">*/}
                    {/*    <label htmlFor="">Email</label>*/}
                    {/*    <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)}*/}
                    {/*           className="form-control"*/}
                    {/*           placeholder="Enter admin email" required/>*/}
                    {/*  </div>*/}
                    {/*  <div className="form-group mb-4">*/}
                    {/*    <label htmlFor="">Username</label>*/}
                    {/*    <input type="text" value={editUsername} onChange={(e) => setEditUsername(e.target.value)}*/}
                    {/*           className="form-control"*/}
                    {/*           placeholder="Enter admin username" required/>*/}
                    {/*  </div>*/}
                    {/*  <div className="form-group mb-4">*/}
                    {/*    <label htmlFor="">Other Name</label>*/}
                    {/*    <input type="text" value={editOtherName} onChange={(e) => setEditOtherName(e.target.value)}*/}
                    {/*           className="form-control"*/}
                    {/*           placeholder="Enter admin othername" required/>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                    {/*<div className="col-6">*/}
                    {/*  <div className="form-group mb-4">*/}
                    {/*    <label htmlFor="">Phone Number</label>*/}
                    {/*    <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)}*/}
                    {/*           className="form-control"*/}
                    {/*           placeholder="Enter admin phone number" required/>*/}
                    {/*  </div>*/}
                    {/*  <div className="form-group mb-4">*/}
                    {/*    <label htmlFor="">First Name</label>*/}
                    {/*    <input type="text" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)}*/}
                    {/*           className="form-control"*/}
                    {/*           placeholder="Enter admin first name" required/>*/}
                    {/*  </div>*/}
                    {/*  <div className="form-group mb-4">*/}
                    {/*    <label htmlFor="">Last Name</label>*/}
                    {/*    <input type="text" value={editLastName} onChange={(e) => setEditLastName(e.target.value)}*/}
                    {/*           className="form-control"*/}
                    {/*           placeholder="Enter admin lastname" required/>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                  </div>
                  }
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={clear}>Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateClient}>Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default ClientManagement