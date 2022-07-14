import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import requestsServiceService from '../../services/requestsService.service'



function AllTenants() {
  const [premises, setPremises] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = () => {
    requestsServiceService.getAllTenants().then((res) => {
      setPremises(res.data.data)
    })
  }

  const deactivate = () => {
    requestsServiceService.toggleTenantStatus(activeId).then(() => {
      fetchAll()
    })
  }
  return (
    <div className="page-content">
      <div className="container-fluid">

        {/* <!-- start page title --> */}
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">All Registered Tenants</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><a href="index.html">Dashboards</a></li>
                  <li className="breadcrumb-item active">Tenants Register</li>
                </ol>
              </div>

            </div>
          </div>
        </div>
        {/* <!-- end page title --> */}

        {/* <!-- quick stast end --> */}





        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">

                <div className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100" role="toolbar">
                  <div className="d-flex align-items-center flex-grow-1">



                  </div>
                  <div className="d-flex">

                    <Link to="/addtenant" type="button" className="btn btn-primary dropdown-toggle option-selector">
                      <i className="dripicons-plus font-size-16"></i> <span className="pl-1 d-md-inline">Add A Tenant</span>
                    </Link>
                  </div>


                </div>

              </div>
              <div className="card-body">
                <table className="table align-middle table-nowrap table-hover dt-responsive contacts-table" id="datatable-buttons">
                  <thead className="table-light">
                    <tr>

                      <th scope="col">#</th>
                      <th scope="col">Names</th>
                      <th scope="col">Tenant Type</th>
                      <th scope="col">Nationality</th>
                      <th scope="col">Contact Email</th>
                      <th scope="col">Contact Phone</th>
                      <th scope="col">Date Created</th>
                      <th scope="col">Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {premises.map((premise, index) => {

                      return (
                        <tr key={index}>
                          <td className="text-capitalize">{index + 1}</td>
                          <td className="text-capitalize">
                            <Link to={"/tenant/" + premise.id}>
                              {premise.tenantType === "COMPANY" ? premise.companyName : (premise.firstName + " " + premise.otherName)}
                            </Link>
                          </td>
                          <td>
                            <h5 className="font-size-14 mb-1">{premise.tenantType === "COMPANY" ? <span className="badge-soft-success badge">{premise.tenantType}</span> : <span className="badge-soft-primary badge">{premise.tenantType}</span>}</h5>

                          </td>
                          <td>
                            <h5 className="font-size-14 mb-1">{premise.nationality}</h5>

                          </td>
                          <td>
                            <h5 className="font-size-14 mb-1">{premise.email}</h5>

                          </td>
                          <td>
                            <h5 className="font-size-14 mb-1">{premise.phoneNumber}</h5>

                          </td>
                          <td>
                            <h5 className="font-size-14 mb-1">{premise.dateTimeCreated}</h5>

                          </td>

                          <td >{premise.active ? <span className="badge-soft-success badge">Active</span> : <span className="badge-soft-danger badge">Inactive</span>}</td>

                          <td>
                            <div className="dropdown">
                              <a className="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </a>

                              <div className="dropdown-menu dropdown-menu-end">

                                <Link className="dropdown-item" to={"/tenant/" + premise.id}>
                                  <i className="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed View
                                </Link>

                                {/* <a className="dropdown-item" href="property-details.html"><i className="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed view</a> */}
                                {/* <a className="dropdown-item" href="property-units.html"><i className="font-size-15 mdi mdi-home-variant me-3"></i>Units</a>
                                <a className="dropdown-item" href="#"><i className="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a>
                                <a className="dropdown-item" href="#"> <i className="font-size-15  mdi-file-document-multiple mdi me-3 text-info"> </i> Change ownership</a> */}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <!-- end col --> */}
        </div>

        {/* <!-- end row --> */}
      </div>
      {/* <!-- container-fluid --> */}

    </div>
  )
}

export default AllTenants