import React, { useState, useEffect } from 'react'
import requestsServiceService from '../../services/requestsService.service'
import moment from 'moment';
import {Link} from "react-router-dom";

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getAllClients()
  }, [])

  const getAllClients = () => {
    requestsServiceService.getClients().then((res) => {
      setClients(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }
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
                    <Link to="/addclient" >
                      <button type="button" className="btn btn-primary waves-effect btn-label waves-light me-3"
                              data-bs-toggle="modal" data-bs-target="#add-new-client">
                        <i className="mdi mdi-plus label-icon"></i> Add a client
                      </button>
                    </Link>
                  </div>
                </div>
                <div class="card-body">
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
                            <Link to={"/client/"+client.id}>
                              <button type="button"
                                      className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                                      data-bs-toggle="modal" data-bs-target="#edit"
                                      style={{ marginLeft: "8px" }}
                              >
                                View Details
                              </button>
                            </Link>
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
    </>
  )
}

export default Clients;