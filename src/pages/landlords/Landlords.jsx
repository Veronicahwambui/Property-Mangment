/* global $*/
import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import requestsServiceService from '../../services/requestsService.service'

function Landlords() {
  const [landlords, setLandlords] = useState([])
  const [failedLandlordUploads, setFailedLandlordUploads] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    getlandlords();
  }, [])

  const getOneLandlord = () => {
  }
  const getlandlords = () => {
    requestsServiceService.getLandLords().then((res) => {
      setLandlords(res.data.data)
      $("#spinner").addClass("d-none")

    });
  }
  const deactivate = (id) => {
    requestsServiceService.deactivateLandlord(id).then((res) => {
      getlandlords();
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

      let data = csvToArray(text, ";");
      console.log(data);
      let newData = [];
      for (let counter = 0; counter < data.length; counter++) {

        let data1 = {
          active: true,
          agreementPeriod: 12,
          email: "",
          fileNumber: data[counter].file_number,
          firstName: data[counter].first_name,
          gender: "",
          id: null,
          idNumber: data[counter].id_number,
          landLordAgreementTypeId: data[counter].landlord_agreement_id,
          landLordTypeName: "INDIVIDUAL",
          lastName: data[counter].last_name,
          otherName: data[counter].other_name,
          phoneNumber: "",
          remunerationPercentage: data[counter].percentage_renumeration,
        };
        let new_t = {
          documents: [],
          landLord: data1,
          landLordAccounts: [],
        };
        newData.push(new_t);

        handleSubmitting(new_t);
      }
      console.log(newData.length);

    };

    console.log(csvToArray(reader.readAsText(input), ";"));


  }


  const handleSubmitting = (data) => {
    requestsServiceService
      .createLandLord(data)
      .then((res) => {
        if (res.data.status === true) {

          getlandlords();
        } else {
          let dat = {
            name: data.landLord.firstName,
            failureReason: res.data.message
          }
          // setFailedLandlordUploads([...failedLandlordUploads, dat]);
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
          name: data.landLord.firstName,
          failureReason: err
        }
        setFailedLandlordUploads(failedLandlordUploads => [dat, ...failedLandlordUploads]);
        // setFailedLandlordUploads([...failedLandlordUploads, dat]);
      });
  };
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

                <body>
                  <form id="myForm" className='row card-body'>
                    <input type="file" id="csvFile" accept=".csv" />
                    <br />
                    <input type="button" onClick={submitFile} value="Submit" />
                  </form>
                   {failedLandlordUploads.length>0 && <div className='row'>
                      <p>A total of {failedLandlordUploads.length} could not be uploaded, including.. </p>
                      <ul>
                        {failedLandlordUploads.map((failed, index) => <li className=' alert danger danger-alert alert-danger danger-alert'> {failed.name + " => " + failed.failureReason}</li>)}
                      </ul>
                    </div>}
                </body>

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
