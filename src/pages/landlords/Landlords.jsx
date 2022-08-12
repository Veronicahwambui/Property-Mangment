/* global $*/
import moment from 'moment'
import DatePicker from "react-datepicker";
import ReactPaginate from 'react-paginate';

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import requestsServiceService from '../../services/requestsService.service'

function Landlords() {
  const [landlords, setLandlords] = useState([])
  const [activeId, setActiveId] = useState('')
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {

    $("#spinner").addClass("d-none")

    getlandlords();
  }, [page, size, pageCount])

  const handleSubmit = (e) => {
    e.preventDefault()
    // $("#spinner").removeClass("d-none")

    getlandlords()
  }
  const handleRangeChange = (e) => {
    setSize(e.target.value);
    setPageCount(0);
    setPage(0)
  }
  const handlePageClick = (data) => {
    setPage(() => data.selected);
  };

  const getOneLandlord = () => {
  }
  const getlandlords = () => {

    let data = {
      "dateCreatedEnd": endDate,
      "dateCreatedStart": startDate,
      "search": searchTerm

    }
    requestsServiceService.getLandLords(page, size, data).then((res) => {
      setLandlords(res.data.data)
      setPage(res.data.page)
      setSize(res.data.size)
      setPageCount(res.data.totalPages)
      setSearchTerm(" ")

    });
  }
  const deactivate = (id) => {
    requestsServiceService.deactivateLandlord(id).then((res) => {
      getlandlords();
    })
  }
  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          {/* <!-- Loader --> */}
          <div id="spinner">
            <div id="status">
              <div class="spinner-chase">
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
                <div class="chase-dot"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Landlord Management</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to='/'>Dashboard </Link>
                    </li>
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


                  <div className="col-11 mx-auto  d-flex justify-content-between align-items-center">
                    <select className="btn btn-md btn-primary" title="Select A range" onChange={(e) => handleRangeChange(e)}>
                      <option className="bs-title-option" value="">Select A range</option>
                      <option value="5">10 Rows</option>
                      <option value="30">30 Rows</option>
                      <option value="50">50 Rows</option>
                      <option value="150">150 Rows</option>
                    </select>
                    <div class="page-title-right">
                      <form className="d-flex align-items-center justify-content-end">
                        <div>
                          <div>
                            <form className="app-search d-none d-lg-block mr-15px">
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search..."
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <span className="bx bx-search-alt"></span>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                          <div className="d-flex">
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              selectsStart
                              className="form-control cursor-pointer"
                              startDate={startDate}
                              endDate={endDate}
                              maxDate={new Date()}
                            />
                            <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                          </div>
                          <div className="d-flex" id='datepicker1'>
                      
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              selectsEnd
                              showMonthDropdown
                              showYearDropdown
                              className="form-control cursor-pointer"
                              calendarClassName="form-group"
                              startDate={startDate}
                              endDate={endDate}
                              minDate={startDate}
                              maxDate={new Date()}
                              type="text"
                           
                            />
                            <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>

                          </div>
                        </div>
                        <div className="d-flex">
                          <input
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            value="filter"
                          />
                        </div>

                      </form>
                    </div>

                  </div>
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
                            <td className="text-capitalize" data-field="estate">{l.firstName + " " + l.lastName}</td>
                            <td className="text-capitalize" >{l.phoneNumber}</td>
                            <td className="text-capitalize" >{l.landLordAgreementType.name?.toLowerCase()?.replace(/_/g, " ")}</td>
                            <td  >{l.fileNumber}</td>
                            <td className="text-capitalize" >{l.active ?
                              <span className="badge-soft-success badge">Active</span> :
                              <span className="badge-soft-danger badge">Inactive</span>}
                            </td>
                            <td data-field="unit-num ">{l.agreementPeriod + " months"}</td>
                            <td className="text-right cell-change text-nowrap">
                              <div className="d-flex align-items-center">
                                {l.active ? <button
                                  class="btn btn-danger btn-sm btn-rounded waves-effect waves-light"
                                  title="deactivate"
                                  data-bs-toggle="modal"
                                  data-bs-target="#confirm-deactivate"
                                  onClick={() => setActiveId(l.id)}
                                >
                                  Deactivate
                                </button> : <button
                                  class="btn btn-success btn-sm btn-rounded waves-effect waves-light"
                                  title="deactivate"
                                  data-bs-toggle="modal"
                                  data-bs-target="#confirm-activate"
                                  onClick={() => setActiveId(l.id)}
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
                                <Link to={"/landlord/" + l.id}> <button type="button"
                                  className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                                  data-bs-toggle="modal" data-bs-target="#edit"
                                  onClick={() => { }}
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
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="font-medium  text-muted mt-2">
                        showing page <span className="text-primary">{pageCount === 0 ? page : page + 1}</span> of<span className="text-primary"> {pageCount}</span>{" "} pages
                      </h5>

                      {pageCount !== 0 && pageCount > 1 && (
                        <nav aria-label="Page navigation comments" className="mt-4">
                          <ReactPaginate
                            previousLabel="<"
                            nextLabel=">"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={pageCount}
                            pageRangeDisplayed={4}
                            marginPagesDisplayed={2}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                            onPageChange={(data) => handlePageClick(data)}
                          />
                        </nav>
                      )}
                    </div>
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
