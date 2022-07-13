import React, { useState, useEffect } from 'react'
import requestsServiceService from '../../services/requestsService.service'

function Landlords() {
  const [landlords, setLandlords] = useState([])

  useEffect(() =>{
    requestsServiceService.getLandLords().then((res) => {
      setLandlords(res.data.data)
    });
  })

  const getOneLandlord = () => {
  }
  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Landlord Management</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="index.html">Dashboards</a></li>
                    <li class="breadcrumb-item"><a href="#">Landlords</a></li>
                    <li class="breadcrumb-item active">All Landlords</li>
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

                      <button type="button" class="btn btn-primary waves-effect btn-label waves-light me-3" data-bs-toggle="modal" data-bs-target="#add-new-client">
                        <i class="mdi mdi-plus label-icon"></i> Add a Landlord
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  {/*{error.color !== "" &&*/}
                  {/*<div className={"alert alert-" + error.color} role="alert">*/}
                  {/*  {error.message}*/}
                  {/*</div>*/}
                  {/*}*/}
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                      <tr class="text-uppercase table-dark">
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Agreement Type</th>
                        <th>File Number</th>
                        <th>Agreement Period</th>
                        <th class="text-right">Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {landlords.map((l, index) => (
                        <tr data-id={index} key={index}>
                          <td style={{ width: "80px" }}>{index + 1}</td>
                          <td data-field="estate">{l.firstName + " " + l.lastName}</td>
                          <td data-field="unit-num ">{l.phoneNumber}</td>
                          <td data-field="unit-num ">{l.landLordAgreementType.name}</td>
                          <td data-field="unit-num ">{l.fileNumber}</td>
                          <td data-field="unit-num ">{l.agreementPeriod + " months"}</td>
                          <td className="text-right cell-change ">

                            <a className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit" data-bs-toggle="modal" data-bs-target="#edit-client"
                               title="Edit" onClick={() => getOneLandlord(l.id)}><i className="bx bx-edit-alt " /></a>
                            <button className="btn btn-primary btn-sm text-uppercase px-3 save-tbl-btn mx-3 d-none "
                                    title="save ">Save
                            </button>
                            <a
                              className="btn btn-light btn-circle waves-effect font-18px btn-transparent cancel-changes d-none "
                              title="Cancel "><i className="bx bx-x "></i></a>
                            <button type="button"
                                    className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                                    data-bs-toggle="modal" data-bs-target="#edit"
                                    onClick={() => {}}
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
      </>
  )
}

export default Landlords