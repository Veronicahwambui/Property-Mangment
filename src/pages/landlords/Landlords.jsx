import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import requestsServiceService from '../../services/requestsService.service'

function Landlords() {
  const [landlords, setLandlords] = useState([])
  const [activeId , setActiveId] = useState('')

  useEffect(() =>{
    getlandlords();
  }, [])

  const getOneLandlord = () => {
  }
  const getlandlords = () => {
    requestsServiceService.getLandLords().then((res) => {
      setLandlords(res.data.data)
    });
  }
  const deactivate = (id)=> {
    requestsServiceService.deactivateLandlord(id).then((res)=>{
      getlandlords();
    })
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
                      <Link to="/addlandlord" >
                        <button type="button" className="btn btn-primary waves-effect btn-label waves-light me-3"
                                data-bs-toggle="modal" data-bs-target="#add-new-client">
                          <i className="mdi mdi-plus label-icon"></i> Add a Landlord
                        </button>
                      </Link>
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
                        <th>Status</th>
                        <th>Agreement Period</th>
                        <th class="text-right">Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {landlords?.map((l, index) => (
                        <tr data-id={index} key={index}>
                          <td style={{ width: "80px" }}>{index + 1}</td>
                          <td data-field="estate">{l.firstName + " " + l.lastName}</td>
                          <td data-field="unit-num ">{l.phoneNumber}</td>
                          <td data-field="unit-num ">{l.landLordAgreementType.name}</td>
                          <td data-field="unit-num ">{l.fileNumber}</td>
                          <td data-field="unit-num ">{l.active ?
                            <span className="badge-soft-success badge">Active</span> :
                            <span className="badge-soft-danger badge">Inactive</span>}
                          </td>
                          <td data-field="unit-num ">{l.agreementPeriod + " months"}</td>
                          <td className="text-right cell-change text-nowrap">
                            <div className="d-flex">
                              {l.active ?  <button
                                class="btn btn-danger btn-sm btn-rounded waves-effect waves-light"
                                title="deactivate"
                                data-bs-toggle="modal"
                                data-bs-target="#confirm-deactivate"
                                onClick={()=> setActiveId(l.id)}
                              >
                                Deactivate
                              </button>:  <button
                                class="btn btn-success btn-sm btn-rounded waves-effect waves-light"
                                title="deactivate"
                                data-bs-toggle="modal"
                                data-bs-target="#confirm-activate"
                                onClick={()=> setActiveId(l.id)}
                              >
                                Activate
                              </button>
                              }
                              <button className="btn btn-primary btn-sm text-uppercase px-3 save-tbl-btn mx-3 d-none "
                                      title="save ">Save
                              </button>
                              <a
                                className="btn btn-light btn-circle waves-effect font-18px btn-transparent cancel-changes d-none "
                                title="Cancel "><i className="bx bx-x "></i></a>
                              <Link to={"/landlord/"+l.id}> <button type="button"
                                                                    className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                                                                    data-bs-toggle="modal" data-bs-target="#edit"
                                                                    onClick={() => {}}
                                                                    style={{ marginLeft: "8px" }}
                              >
                                View Details
                              </button>
                              </Link>
                            </div>
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
      <div
        className="modal fade"
        id="confirm-deactivate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <center>
                <h5>Deactivate this Landlord ?</h5>
              </center>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deactivate(activeId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* confirm dactivate  */}
      <div
        className="modal fade"
        id="confirm-activate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <center>
                <h5>Activate this Landlord ?</h5>
              </center>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deactivate(activeId)}
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

export default Landlords
