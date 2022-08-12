/* global $ */
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import authService from '../../services/auth.service'
import requestsServiceService from '../../services/requestsService.service'


function AllTenants() {



  const [premises, setPremises] = useState([])
  const [failedLandlordUploads, setFailedLandlordUploads] = useState([])
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

        if (counter <= 5999) continue;
        else if (counter > 5999 && counter < 7000) {
          let data1 = {
            active: true,
            clientId: parseInt(authService.getClientId()),
            companyAddress: undefined,
            companyDateOfRegistration: undefined,
            companyIncorporationNumber: undefined,
            companyName: undefined,
            dob: undefined,
            email: undefined,
            firstName: data[counter]["First name"],
            gender: undefined,
            id: undefined,
            idNumber: undefined,
            lastName: data[counter]["last name"],
            maritalStatus: undefined,
            nationality: undefined,
            occupation: undefined,
            otherName: data[counter]["middle name"],
            phoneNumber: undefined,
            tenantTypeName: "INDIVIDUAL",
          };


          let dara = {
            "tenancyDTOS": [],
            "tenantContactPersons": [],
            "tenantDTO": data1,
            "tenantDocuments": []
          };
          newData.push(dara);
          handleSubmitting(dara, counter);
        }
        else break;
      }
      console.log(newData.length);
      console.log(newData);

    };

    console.log(csvToArray(reader.readAsText(input), ","));


  }


  const handleSubmitting = (data, index) => {
    requestsServiceService.createTenant(data)
      .then((res) => {
        if (res.data.status === true) {

          // fetchAll();
        } else {
          let dat = {
            name: data.tenantDTO.firstName,
            failureReason: res.data.message + " at index " + index
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
          name: data.tenantDTO.firstName,
          failureReason: err
        }
        setFailedLandlordUploads(failedLandlordUploads => [dat, ...failedLandlordUploads]);
      });
  };

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
                  <li className="breadcrumb-item"><Link to='/'>Dashboard </Link></li>
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

              <body>
                <form id="myForm" className='row card-body'>
                  <input type="file" id="csvFile" accept=".csv" />
                  <br />
                  <input type="button" onClick={submitFile} value="Submit" />
                </form>
                <div className='row'>
                  <p>A total of {failedLandlordUploads.length} could not be uploaded, including.. </p>
                  <ul>
                    {failedLandlordUploads.map((failed, index) => <>{index < 5 && <li className='danger-alert'> {failed.name + " => " + failed.failureReason}</li>}</>)}
                  </ul>
                </div>
              </body>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table  align-middle table-nowrap table-hover" id="datatable-buttons">
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
                        <th scope='col'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {premises?.map((premise, index) => {

                        return (
                          <tr key={index}>
                            <td className="text-capitalize">{index + 1}</td>
                            <td className="text-capitalize">
                              <Link to={"/tenant/" + premise.id}>
                                {premise.tenantType === "COMPANY" ? premise.companyName : (premise.firstName + " " + premise.lastName)}
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
                              <h5 className="font-size-14 mb-1">{moment(premise.dateTimeCreated).format("MMM DD YYYY")}</h5>

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
          </div>
        </div>
        {/* <!-- end col --> */}
      </div>

      {/* <!-- end row --> */}
    </div>
  )
}

export default AllTenants