/* global $ */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import requestsServiceService from '../../services/requestsService.service';

function AdminDashboard() {

    const [adminAgedArrears, setAdminAgedArrears] = useState({})
    const [occupancyReport, setOccupancyReport] = useState({})
    const [newUnitsIncomeReport, setNewUnitsIncomeReport] = useState({})
    const [adminAgedArrearsMonth, setAdminAgedArrearsMonth] = useState("undefined")
    const [occupancyReportCounty, setOccupancyReportCounty] = useState("undefined")
    const [newUnitsIncomeReportCounty, setNewUnitsIncomeReportCounty] = useState("undefined")

    useEffect(() => {
        getAdminAgedArrearsReports();
        getOccupancyReport();
        grtNewUnitsExpectedIncomeReportResponse();
    }, [])



    const getAdminAgedArrearsReports = () => {
        requestsServiceService.adminAgedArrearsReports().then((res) => {
            setAdminAgedArrears(res.data.data);
        })
    }

    const getOccupancyReport = () => {
        requestsServiceService.occupancyReport().then((res) => {
            setOccupancyReport(res.data.data);
        })
    }

    const grtNewUnitsExpectedIncomeReportResponse = () => {
        requestsServiceService.newUnitsExpectedIncomeReportResponse().then((res) => {
            setNewUnitsIncomeReport(res.data.data);
        })
    }



    return (
        <>
            <div className='conatainer-fluid'>

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-white pt-0  p-3 d-flex justify-content-between align-items-center w-100 border-bottom">
                            <div>
                                    <h4>Arrears Report</h4>
                                 </div>
                                <div className="select my-3">
                                    <select name="" id="" className='form-control select2-container' onChange={(e) => setAdminAgedArrearsMonth(e.target.value)}>
                                        <option value={"undefined"}>Select Month </option>
                                        {adminAgedArrears?.ageReportModels?.map((model) => (
                                            <option value={model.invoicePeriod}>{model.invoicePeriod}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div class="card-body">
                                <div className="table-responsive">
                                    <table class="table  table-nowrap table-hover overflow-visible contacts-table">
                                        <thead class="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>County</th>
                                                <th>Month</th>
                                                <th>Invoices</th>
                                                <th>Collection Rate</th>
                                                <th>Total collected amount </th>
                                                <th>Total invoiced amount</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {adminAgedArrearsMonth === "undefined" ? adminAgedArrears?.ageReportModels?.map((model, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{model.demography}</td>
                                                        <td>{model.invoicePeriod}</td>
                                                        <td>{model.countAll}</td>
                                                        <td>{model.collectionRate}</td>
                                                        <td>{model.paid}</td>
                                                        <td>KSH {model.sum?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                        <td>
                                                            <button type="button" class=" btn btn-md btn-primary">
                                                            <span class=""> View </span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }) :
                                                adminAgedArrears?.ageReportModels?.filter((one) => one.invoicePeriod === adminAgedArrearsMonth).map((model, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{model.demography}</td>
                                                            <td>{model.invoicePeriod}</td>
                                                            <td>{model.countAll}</td>
                                                            <td>{model.collectionRate}</td>
                                                            <td>{model.paid}</td>
                                                            <td>KSH {model.sum?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                            <td>
                                                            <button type="button" class=" btn btn-md btn-primary">
                                                            <span class=""> View </span>
                                                            </button>
                                                        </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {/* <tr></tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-white pt-0 p-3 d-flex justify-content-between align-items-center w-100 border-bottom">
                                 <div>
                                    <h4> Occupancy Report</h4>
                                 </div>
                                <div className="select my-3">
                                    <select name="" id="" className='form-control select2-container' onChange={(e) => setOccupancyReportCounty(e.target.value)}>
                                        <option value={"undefined"}>Select county </option>
                                        {occupancyReport?.occupancyResponses?.map((model) => (
                                            <option value={model.demography}>{model.demography}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                            <div class="card-body">
                                <div className="table-responsive">
                                    <table class="table  table-nowrap table-hover overflow-visible contacts-table">
                                        <thead class="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>County</th>
                                                <th>Premises</th>
                                                <th>All Units</th>
                                                <th>New Units</th>
                                                <th>Unit Summary</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { occupancyReportCounty === "undefined" ?  occupancyReport?.occupancyResponses?.map((model, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{model.demography}</td>
                                                            <td>{model.premiseCount}</td>
                                                            <td>{model.allUnits}</td>
                                                            <td>{model.newUnits}</td>
                                                            <td>{model.countPremiseUnitByStatus?.map(one => (
                                                                <div className="d-flex justify-content-start gap-3">
                                                                    <strong>{one.sum}</strong>
                                                                    <span>{one.status} </span>
                                                                </div>
                                                            )) }</td>
                                                            <td>
                                                            <button type="button" class=" btn btn-md btn-primary">
                                                            <span class=""> View </span>
                                                            </button>
                                                        </td>
                                                        </tr>
                                                    )
                                                }) : 
                                              occupancyReport?.occupancyResponses?.filter(one => one.demography === occupancyReportCounty )?.map((model, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{model.demography}</td>
                                                            <td>{model.premiseCount}</td>
                                                            <td>{model.allUnits}</td>
                                                            <td>{model.newUnits}</td>
                                                            <td>{model.countPremiseUnitByStatus?.map(one => (
                                                                <div className="d-flex justify-content-start gap-3">
                                                                    <strong>{one.sum}</strong>
                                                                    <span>{one.status} </span>
                                                                </div>
                                                            )) }</td>
                                                            <td>
                                                            <button type="button" class=" btn btn-md btn-primary">
                                                            <span class=""> View </span>
                                                            </button>
                                                        </td>
                                                        </tr>
                                                    )
                                                })
                                            
                                            }
                                            {/* <tr></tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-white pt-0 p-3 d-flex justify-content-between align-items-center w-100 border-bottom">
                                 <div>
                                    <h4>New Units Expected Income Report </h4>
                                 </div>
                                <div className="select my-3">
                                    <select name="" id="" className='form-control select2-container' onChange={(e) => setNewUnitsIncomeReportCounty(e.target.value)}>
                                        <option value={"undefined"}>Select county </option>
                                        {newUnitsIncomeReport?.unitIncomeModels?.map((model) => (
                                            <option value={model.demography}>{model.demography}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                            <div class="card-body">
                                <div className="table-responsive">
                                    <table class="table  table-nowrap table-hover overflow-visible contacts-table">
                                        <thead class="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>County</th>
                                                <th>New Units</th>
                                                <th>Total Expected Income</th>
                                                <th>commission Income</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { newUnitsIncomeReportCounty === "undefined" ?  newUnitsIncomeReport?.unitIncomeModels?.map((model, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{model.demography}</td>
                                                            <td>{model.newUnits}</td>
                                                            <td>{model.totalExpectedIncome}</td>
                                                            <td>{model.commissionIncome}</td>
                                                            <td>
                                                            <button type="button" class=" btn btn-md btn-primary">
                                                            <span class=""> View </span>
                                                            </button>
                                                        </td>
                                                        </tr>
                                                    )
                                                }) : 
                                                newUnitsIncomeReport?.unitIncomeModels?.filter(one => one.demography === newUnitsIncomeReportCounty )?.map((model, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{model.demography}</td>
                                                            <td>{model.newUnits}</td>
                                                            <td>{model.totalExpectedIncome}</td>
                                                            <td>{model.commissionIncome}</td>
                                                            <td>
                                                            <button type="button" class=" btn btn-md btn-primary">
                                                            <span class=""> View </span>
                                                            </button>
                                                        </td>
                                                        </tr>
                                                    )
                                                })
                                            
                                            }
                                            {/* <tr></tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Helmet>
                <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
                <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
                <script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap5.min.js"></script>
            </Helmet>
        </>

    )
}

export default AdminDashboard