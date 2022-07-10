import React, { useState, useEffect } from 'react';
import requestsServiceService from '../../services/requestsService.service';

export default function ClientType() {
  const [name, setName] = useState("")
  const [clientTypes, setClientTypes] = useState([])
  const [error, setError] = useState({
    message: "",
    color: ""
  });
  const [editName, setEditName] = useState('')
  const [id, setId] = useState('')
  const [created, setCreated] = useState(false)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    getClientTypes();
  }, []);

  const getClientTypes = () => {
    requestsServiceService.getClientTypes().then((res) => {
      setClientTypes(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value.toUpperCase());
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      name: name,
      id: null
    })
    requestsServiceService.createClientType(data).then((res) => {
      setError({
        ...error,
        message: res.data.message,
        color: "success"
      });
      getClientTypes();

      setTimeout(() => {
        setError({
          message: '',
          color: ''
        });
      }, 3000);
      setName("");
    }).catch((err) => {
      setError({
        ...error,
        message: err.response.data.message,
        color: "danger"
      });
    })
  }

  const clear = () => {
    setError({
      message: '',
      color: ''
    });
    setName("")
  }
  const isOpen = () => {
    setName("")
  }

  const handleEdit = (id, name) => {
    setId(id);
    setEditName(name);
  }

  const editClientType = () => {
    const data = JSON.stringify(
      {
        id: id,
        name: editName
      }
    )
    requestsServiceService.updateClientType(data).then((res) => {
      setError({
        ...error,
        message: res.data.message,
        color: "success"
      });
      getClientTypes()
      setTimeout(() => {
        setError({
          message: '',
          color: ''
        });
      }, 3000);
    }).catch((err) => {
      setError({
        ...error,
        message: err.data.message,
        color: "success"
      });
    })
    setError({
      message: '',
      color: ''
    });
    setName("")
    setEditName("")
    clear()
  }

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">Client Types</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><a href="index.html">Dashboards</a></li>
                  <li className="breadcrumb-item"><a href="#">Set Ups</a></li>
                  <li className="breadcrumb-item active">Client types</li>
                </ol>
              </div>

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div
                className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">

                <div className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                  role="toolbar">
                  <div className="d-flex align-items-center flex-grow-1">
                    <h4 className="mb-0  bg-transparent  p-0 m-0"></h4>
                  </div>
                  <div className="d-flex">

                    <button type="button" className="btn btn-primary waves-effect btn-label waves-light me-3"
                      data-bs-toggle="modal" data-bs-target="#add-client-type" onClick={isOpen}>
                      <i className="mdi mdi-plus label-icon"></i> Add Client Type
                    </button>

                  </div>

                </div>

              </div>
              <div className="card-body">
                {error.color !== "" &&
                <div className={"alert alert-" + error.color} role="alert">
                  {error.message}
                </div>
                }
                <div className="table-responsive table-responsive-md">
                  <table className="table table-editable align-middle table-edits">
                    <thead className="table-light">
                      <tr className="text-uppercase table-dark">
                        <th>#</th>
                        <th>Name</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        clientTypes.length > 0 && clientTypes.map((ct, index) => (
                          <tr>
                            <td>{ct.id}</td>
                            <td data-field="unit-num">{ct.name}</td>
                            <td className="text-right cell-change ">
                              <a className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit " data-bs-toggle="modal" data-bs-target="#edit-client-type"
                                title="Edit " onClick={() => handleEdit(ct.id, ct.name)}><i className="bx bx-edit-alt "></i></a>
                              <button className="btn btn-primary btn-sm text-uppercase px-3 save-tbl-btn mx-3 d-none "
                                title="save ">Save
                              </button>
                              <a
                                className="btn btn-light btn-circle waves-effect font-18px btn-transparent cancel-changes d-none "
                                title="Cancel "><i className="bx bx-x "></i></a>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*NEW CLIENT MODAL*/}
        <div className="modal fade" id="add-client-type" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
          role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">New Client Type</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group mb-4">
                          <label htmlFor="">Name</label>
                          <input type="text" className="form-control" onChange={handleChange} value={name} placeholder="Enter client type" required />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/*EDIT CLIENT MODAL*/}
        <div className="modal fade" id="edit-client-type" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
          role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Update Client Type</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    {error.color !== "" &&
                      <div className={"alert alert-" + error.color} role="alert">
                        {error.message}
                      </div>
                    }
                    <div className="form-group mb-4">
                      <form action="submit">
                        <label htmlFor="">Name</label>
                        <input type="text" className="form-control" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Enter client type" required />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={clear}>Close</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={editClientType}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}