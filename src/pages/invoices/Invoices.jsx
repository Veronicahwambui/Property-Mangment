import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import requestsServiceService from '../../services/requestsService.service'

function Invoices() {
  const [invoices, setinvoices] = useState([])
  // const [activeId , setActiveId] = useState('')

  useEffect(() =>{
    getInvoices();
  }, [])

  const getOneLandlord = () => {
  }
  const getInvoices = () => {
    requestsServiceService.getInvoices().then((res) => {
      console.log(res.data.data);
      setinvoices(res.data.data)
    });
  }
  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Invoices</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="index.html">Dashboards</a></li>
                    <li class="breadcrumb-item"><a href="#">Invoices</a></li>
                    <li class="breadcrumb-item active">All Invoices</li>
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
                      {/*<Link to="/addlandlord" >*/}
                      {/*  <button type="button" className="btn btn-primary waves-effect btn-label waves-light me-3"*/}
                      {/*          data-bs-toggle="modal" data-bs-target="#add-new-client">*/}
                      {/*    <i className="mdi mdi-plus label-icon"></i> Add a Landlord*/}
                      {/*  </button>*/}
                      {/*</Link>*/}
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
                        <th>Charge name</th>
                        <th>Charge type</th>
                        <th>Bill amount</th>
                        <th>Tenant</th>
                        <th>Payment status</th>
                        <th>Premises</th>
                        {/*<th class="text-right">Actions</th>*/}
                      </tr>
                      </thead>
                      <tbody>
                      {invoices?.map((l, index) => (
                        <tr data-id={index} key={index}>
                          <td style={{ width: "80px" }}>{index + 1}</td>
                          <td data-field="estate">{l.applicableChargeName}</td>
                          <td data-field="unit-num ">{l.applicableChargeType}</td>
                          <td data-field="unit-num ">{l.billAmount}</td>
                          <td data-field="unit-num ">{l.transaction.tenantName}</td>
                          <td data-field="unit-num ">{l.paymentStatus === "PENDING" ?
                            <span className="badge-soft-danger badge">{l.paymentStatus}</span> :
                            <span className="badge-soft-success badge">{l.paymentStatus}</span>}
                          </td>
                          <td data-field={"unit-num"}>{l.transaction?.premiseName}</td>
                          <td className="text-right cell-change text-nowrap">
                            {/*<div className="d-flex">*/}
                            {/*  {l.active ?  <button*/}
                            {/*    class="btn btn-danger btn-sm btn-rounded waves-effect waves-light"*/}
                            {/*    title="deactivate"*/}
                            {/*    data-bs-toggle="modal"*/}
                            {/*    data-bs-target="#confirm-deactivate"*/}
                            {/*    onClick={()=> setActiveId(l.id)}*/}
                            {/*  >*/}
                            {/*    Deactivate*/}
                            {/*  </button>:  <button*/}
                            {/*    class="btn btn-success btn-sm btn-rounded waves-effect waves-light"*/}
                            {/*    title="deactivate"*/}
                            {/*    data-bs-toggle="modal"*/}
                            {/*    data-bs-target="#confirm-activate"*/}
                            {/*    onClick={()=> setActiveId(l.id)}*/}
                            {/*  >*/}
                            {/*    Activate*/}
                            {/*  </button>*/}
                            {/*  }*/}
                            {/*  <button className="btn btn-primary btn-sm text-uppercase px-3 save-tbl-btn mx-3 d-none "*/}
                            {/*          title="save ">Save*/}
                            {/*  </button>*/}
                            {/*  <a*/}
                            {/*    className="btn btn-light btn-circle waves-effect font-18px btn-transparent cancel-changes d-none "*/}
                            {/*    title="Cancel "><i className="bx bx-x "></i></a>*/}
                            {/*  <Link to={"/landlord/"+l.id}> <button type="button"*/}
                            {/*                                        className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"*/}
                            {/*                                        data-bs-toggle="modal" data-bs-target="#edit"*/}
                            {/*                                        onClick={() => {}}*/}
                            {/*                                        style={{ marginLeft: "8px" }}*/}
                            {/*  >*/}
                            {/*    View Details*/}
                            {/*  </button>*/}
                            {/*  </Link>*/}
                            {/*</div>*/}
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

export default Invoices;
