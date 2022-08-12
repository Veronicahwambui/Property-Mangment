/* global $*/
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import requestsServiceService from '../../services/requestsService.service'


function PremisesRegister() {
    const [premises, setPremises] = useState([])
    const [activeId, setActiveId] = useState('')
    const [failedLandlordUploads, setFailedLandlordUploads] = useState([])


    useEffect(() => {
        fetchAll()
    }, [])

    const fetchAll = () => {
        requestsServiceService.getAllpremises().then((res) => {
            setPremises(res.data.data);
            $("#spinner").addClass("d-none");
            $(".table").bootstrapTable();

        })
    }

    const deactivate = () => {
        requestsServiceService.togglePremiseStatus(activeId).then(() => {
            fetchAll()
        })
    }

    const csvToArray = (str, delimiter = ",") => {
        // slice from start of text to the first \n index
        // use split to create an array from string by delimiter
        const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

        // slice from \n index + 1 to the end of the text
        // use split to create an array of each csv value row
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");

        // Map the rows
        // split values from each row into an array
        // use headers.reduce to create an object
        // object properties derived from headers:values
        // the object passed as an element of the array
        const arr = rows.map(function (row) {
            const values = row.split(delimiter);
            const el = headers.reduce(function (object, header, index) {
                object[header] = values[index];
                return object;
            }, {});
            return el;
        });

        // return the array
        return arr;
    }

    const submitFile = (e) => {
        e.preventDefault();

        const csvFile = document.getElementById("csvFile");

        const input = csvFile.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;

            let data = csvToArray(text, ",");
            console.log(data);
            let newData = [];
            for (let counter = 0; counter < data.length; counter++) {

                let data1 = {
                    "active": true,
                    "address": data[counter]["postal_address"],
                    "town": data[counter]["Town"],
                    "country": data[counter]["Country"],
                    "estateId": 1,
                    "fileNumber": data[counter]["RC No"]+data[counter]["Property No"],
                    "id": undefined,
                    "landLordId": [],
                    "landlordFileNumber": [],
                    "plotNumber": undefined,
                    "premiseName": data[counter].name,
                    "premiseTypeId": 1,
                    "premiseUseTypeId": 1,
                    "unitVacancyRestrictionStatus": "CLOSED",
                    "chargeFrequencyName": "MONTH",
                    "premiseLandLord": [{
                        "active": true,
                        "agreementPeriod": 12,
                        "id": undefined,
                        "landLordAgreementTypeId": 1,
                        "landLordId": data[counter]["landlord id"],
                        "premiseId": undefined,
                        "remunerationPercentage": parseFloat(data[counter]["pcommission"])
                    }]
                };


                let dara = {
                    "premise": data1,
                    "premiseCaretakerDTO": null,
                    "premiseDocuments": [],
                    "premiseUnitTypeCharges": [],
                    "premiseUnits": []
                };
                newData.push(dara);
                // if (newData.length == 1)
                    handleSubmitting(dara);
            }
            console.log(newData.length);
            console.log(newData);

        };

        console.log(csvToArray(reader.readAsText(input), ";"));

    }


    const handleSubmitting = (data) => {

        requestsServiceService.createPremise(data)
            .then((res) => {
                if (res.data.status === true) {

                    // fetchAll();
                } else {
                    let dat = {
                        name: data.premise.premiseName,
                        failureReason: res.data.message
                    }

                    setFailedLandlordUploads(failedLandlordUploads => [dat, ...failedLandlordUploads]);
                }
            })
            .catch((error) => {

                let err = "";
                if (error.response) {
                    err = error.response.data.message.substring(0, 130);
                } else if (error.request) {
                    // The request was made but no response was received
                    err = error.request;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    err = error.message;
                }
                let dat = {
                    name: data.premise.premiseName,
                    failureReason: err
                }

                setFailedLandlordUploads(failedLandlordUploads => [dat, ...failedLandlordUploads]);
            });
    };


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

                <body>
                    <form id="myForm" className='row card-body'>
                        <input type="file" id="csvFile" accept=".csv" />
                        <br />
                        <input type="button" onClick={submitFile} value="Submit" />
                    </form>
                    <div className='row'>
                        <p>A total of {failedLandlordUploads.length} could not be uploaded, including.. </p>
                        <ul>
                            {failedLandlordUploads.map((failed, index) => <>{<li className='alert alert-danger danger-alert'> {failed.name + " => " + failed.failureReason}</li>}</>)}
                        </ul>
                    </div>
                </body>




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