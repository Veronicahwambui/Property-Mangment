/* global $*/
import moment from 'moment'
import DatePicker from "react-datepicker";
import ReactPaginate from 'react-paginate';

import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import requestsServiceService from '../../services/requestsService.service'
import authService from '../../services/auth.service';


function PremisesRegister() {
    let date = new Date()
    const [premises, setPremises] = useState([])
    const [activeId, setActiveId] = useState('')
    const [size, setSize] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [startDate, setStartDate] = useState(new Date(date.getFullYear(), 0, 1));
    const [endDate, setEndDate] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState("");



    useEffect(() => {
        $("#spinner").addClass("d-none")

        fetchAll()
    }, [page, size, pageCount])

    const handleSubmit = (e) => {
        e.preventDefault()
        // $("#spinner").removeClass("d-none")

        fetchAll()
    }

    const handlePageClick = (data) => {
        setPage(() => data.selected);
    };

    const handleRangeChange = (e) => {
        setSize(e.target.value);
        setPageCount(0);
        setPage(0)
    }

    const fetchAll = () => {

        let data = {
            "dateCreatedEnd": moment(endDate).format("YYYY-MM-DD"),
            "dateCreatedStart": moment(startDate).format("YYYY-MM-DD"),
            "search": searchTerm.trim()
        }
        requestsServiceService.getAllpremises(page, size, data).then((res) => {
            setPremises(res.data.data);
            setPage(res.data.page);
            setSize(res.data.size);
            setPageCount(res.data.totalPages)
        })
    }

    const deactivate = () => {
        requestsServiceService.togglePremiseStatus(activeId).then(() => {
            fetchAll()
        })
    }


    return (
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
                {/* <!-- start page title --> */}
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0 font-size-18">All Registered Premises</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item">
                                        <Link to='/'>Dashboard </Link>
                                    </li>
                                    <li class="breadcrumb-item active">Property Register</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                {/* <!-- end page title --> */}

                {/* <!-- quick stast end --> */}



                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">

                                <div class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100" role="toolbar">
                                    <div class="d-flex align-items-center flex-grow-1">
                                        <div class="btn-group pr-3 d-none" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check" name="msg-type-filter" value="" id="btn-allmsgs" autocomplete="off" checked="" />
                                            <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-allmsgs"><span class="d-inline">All</span></label>

                                            <input type="radio" class="btn-check" value="SMS" name="msg-type-filter" id="btn-sms" autocomplete="off" />
                                            <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-sms"><i class="mdi mdi-home-account  font-size-16"></i><span class="pl-1 d-none d-lg-inline d-md-inline">Residential</span></label>

                                            <input type="radio" class="btn-check" value="Email" name="msg-type-filter" id="btn-email" autocomplete="off" />
                                            <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-email"><i class="mdi mdi-home-currency-usd   font-size-16"></i><span class="pl-1 d-none d-lg-inline d-md-inline">Commercial</span></label>

                                            <input type="radio" class="btn-check" value="WhatsApp" name="msg-type-filter" id="btn-whatsApp" autocomplete="off" />
                                            <label class="btn btn-primary mb-0 waves-light waves-effect" for="btn-whatsApp"><i class="mdi mdi-store font-size-16"></i> <span class="pl-1 d-none d-lg-inline d-md-inline">Commercial/Residential</span></label>

                                        </div>

                                        <div class="btn-group mr-15px option-selector-cont d-none">
                                            <button type="button" class="btn btn-secondary dropdown-toggle option-selector" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="mdi mdi-file-document-outline font-size-16"></i> <span class="pl-1 d-none d-sm-inline">Agreement Type</span>  <i class="mdi mdi-chevron-down"></i>
                                            </button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="#"><i class="mdi mdi-checkbox-blank text-white"></i><span class="pl-1">All Premises</span></a>
                                                <a class="dropdown-item" href="#"><i class="mdi mdi-checkbox-blank text-info"></i><span class="pl-1">Lease Agreement</span></a>
                                                <a class="dropdown-item" href="#"><i class="mdi mdi-checkbox-blank text-dark opacity-25"></i><span class="pl-1">Management Agreement</span></a>

                                            </div>
                                        </div>


                                    </div>
                                    <div class="d-flex">

                                        <Link to="/addpremises" type="button" class="btn btn-primary dropdown-toggle option-selector">
                                            <i class="dripicons-plus font-size-16"></i> <span class="pl-1 d-md-inline">Add A Premises</span>
                                        </Link>
                                    </div>


                                </div>

                            </div>

                            <div className=" d-flex justify-content-between align-items-center pr-3">
                                <div></div>
                                <form className="d-flex align-items-center">
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
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="flex p-2">
                                            <span class="input-group-text"><i class="mdi mdi-calendar">Start Date:</i></span>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                selectsStart
                                                className="form-control cursor-pointer"
                                                startDate={startDate}
                                                endDate={endDate}
                                                maxDate={new Date()}
                                            />
                                        </div>
                                        <div className="flex p-2" id='datepicker1'>

                                            <span class="input-group-text"><i class="mdi mdi-calendar">End Date:</i></span>
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

                                        </div>
                                    </div>
                                    <div className="d-flex mb-2">
                                        <input
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={handleSubmit}
                                            value="filter"
                                        />
                                    </div>

                                </form>
                            </div>

                            <div class="card-body">
                                <div className="table-responsive">
                                    <table class="table  table-nowrap table-hover overflow-visible contacts-table">
                                        <thead class="table-light">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Premises</th>
                                                <th scope="col">Premises type</th>
                                                <th scope="col">Premises use type</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Estate</th>
                                                <th scope="col">Zone</th>
                                                <th scope='col'>County</th>
                                                <th scope="col">File No</th>
                                                <th scope="col">Status</th>
                                            <th>Date Created</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {premises?.map((premise, index) => {
                                                let premiseType = premise.premiseType
                                                let premiseUseType = premise.premiseUseType
                                                let estate = premise.estate
                                                let zone = premise.estate.zone
                                                let county = premise.estate.zone.clientCounty.county

                                                return (
                                                    <tr key={index}>

                                                        <td class="text-capitalize">{index + 1}</td>
                                                        <td class="text-capitalize">
                                                            <Link to={`/premise/${premise.id}`} title="View Details">
                                                                {premise.premiseName}
                                                            </Link>
                                                        </td>
                                                        <td className="text-capitalize">
                                                            <h5 class="font-size-14 mb-1"><a href="landlord-details.html" class="text-dark">{premiseType.name}</a></h5>

                                                        </td>
                                                        <td className="text-capitalize">
                                                            <span class="badge badge-soft-warning font-size-11 m-1 text-capitalize">{premiseUseType.name}</span>
                                                        </td>
                                                        <td className='text-capitalize'>{premise.address}</td>
                                                        <td className="text-capitalize">
                                                            {estate.name}
                                                        </td>
                                                        <td className="text-capitalize">{zone.name}</td>
                                                        <td className="text-capitalize">{county.name.toLowerCase()}</td>
                                                        <td class="text-danger">
                                                            {premise.fileNumber}
                                                        </td>
                                                        <td >{premise.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span>}</td>
<td>{moment(premise.dateTimeCreated).format("YYYY-MM-DD HH:mm")}</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                                    <i class="bx bx-dots-vertical-rounded"></i>
                                                                </a>

                                                                <div class="dropdown-menu dropdown-menu-end">
                                                                    <Link class="dropdown-item" to={`/premise/${premise.id}`} ><i class="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Detailed view</Link>
                                                                    {/* <a class="dropdown-item" href="property-units.html"><i class="font-size-15 mdi mdi-home-variant me-3"></i>Units</a> */}
                                                                    {/* <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a> */}
                                                                    {/* <a class="dropdown-item" href="#"> <i class="font-size-15  mdi-file-document-multiple mdi me-3 text-info"> </i> Change ownership</a> */}
                                                                    <a onClick={() => { setActiveId(premise.id); deactivate() }} class="dropdown-item" href="#"><i class="font-size-15  dripicons-wrong me-3 text-danger"></i>{premise.active ? "Deactivate" : "Activate"}</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            {/* <tr></tr> */}
                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-between align-items-center">

                                        <select className="btn btn-md btn-primary" title="Select A range" onChange={(e) => handleRangeChange(e)}
                                            value={size}>
                                            <option className="bs-title-option" value="">Select A range</option>
                                            <option value="10">10 Rows</option>
                                            <option value="30">30 Rows</option>
                                            <option value="50">50 Rows</option>
                                        </select>

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
                                    <h5 className="font-medium  text-muted mt-2">
                                        showing page <span className="text-primary">{pageCount === 0 ? page : page + 1}</span> of<span className="text-primary"> {pageCount}</span>{" "} pages
                                    </h5>
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
    )
}

export default PremisesRegister