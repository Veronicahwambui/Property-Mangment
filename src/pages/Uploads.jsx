/* global $*/
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import requestsServiceService from '../services/requestsService.service';
import authService from '../services/auth.service';
import moment from 'moment';


function Uploads() {
  const [failedLandlordUploads, setFailedLandlordUploads] = useState([])

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

  const submitLandlordsFile = (e) => {
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
          active: true,
          agreementPeriod: 12,
          email: "",
          fileNumber: data[counter]["RC Number"],
          firstName: data[counter]["First name"],
          gender: "",
          id: null,
          idNumber: "",
          landLordAgreementTypeId: 1,
          landLordTypeName: "INDIVIDUAL",
          lastName: data[counter]["Last name"],
          otherName: data[counter]["Middle"],
          phoneNumber: "",
          postalAddress: data[counter]["postal_address"],
          town: data[counter]["Town"],
          country: data[counter]["Country"],
          remunerationPercentage: parseFloat(data[counter].commission),
        };
        let new_t = {
          documents: [],
          landLord: data1,
          landLordAccounts: [],
        };
        newData.push(new_t);
        if (newData.length > 0)
          handleLandlordSubmitting(new_t);
      }

      console.log(newData.length);
      console.log(newData);

    };

    console.log(csvToArray(reader.readAsText(input), ";"));


  }

  const handleLandlordSubmitting = (data) => {
    requestsServiceService
      .createLandLord(data)
      .then((res) => {
        if (res.data.status === true) {

          // getlandlords();
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


  const submitPremiseFile = (e) => {
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
          "fileNumber": data[counter]["RC No"] + data[counter]["Property No"],
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
        handlePremiseSubmitting(dara);
      }
      console.log(newData.length);
      console.log(newData);

    };

    console.log(csvToArray(reader.readAsText(input), ";"));

  }


  const handlePremiseSubmitting = (data) => {

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


  const submitTenantFile = (e) => {
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
          handleTenantSubmitting(dara, counter);
        }
        else break;
      }
      console.log(newData.length);
      console.log(newData);

    };

    console.log(csvToArray(reader.readAsText(input), ","));


  }


  const handleTenantSubmitting = (data, index) => {
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



  const submitUnitFile = (e) => {
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

        if (counter <= 7999) continue;
        else if (counter > 7999 && counter < 9000) {
          if (data[counter]["New Property_No"] != "") {
            let dara = {
              active: true,
              id: null,
              premiseId: parseInt(data[counter]["New Property_No"]),
              unitName: data[counter].name + " " + data[counter]["house number"] + " " + data[counter]["property number"],
              unitTypeId: 1,
              chargeDTO: {
                active: true,
                applicableChargeId: 1,
                chargeConstraint: "ZERO_BALANCE",
                clientCollectionAccountId: 1,
                collectedToClientAccount: true,
                constraintChargeId: null,
                id: null,
                invoiceDay: 1,
                landlordCollectionAccountId: null,
                premiseId: parseInt(data[counter]["New Property_No"]),
                rateCharge: false,
                unitCost: parseInt(data[counter]["rent"]),
                unitTypeId: 1,
                value: parseInt(data[counter]["rent"])
              }
            };

            newData.push(dara);

            handleUnitSubmitting(dara);
          }
        }
        else break;
      }
      console.log(newData.length);
      console.log(newData);

    };

    console.log(csvToArray(reader.readAsText(input), ";"));


  }


  const handleUnitSubmitting = (data) => {

    requestsServiceService.createPremiseUnit(1, data).then((res) => {
      if (res.data.status === true) {

        // fetchAll();
      } else {
        let dat = {
          name: data.unitName,
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

        let failures = failedLandlordUploads;
        let dat = {
          name: data.unitName,
          failureReason: err
        }
        failures.push(dat);
        setFailedLandlordUploads(failures);
      });
  };


  const submitLeaseFile = (e) => {
    e.preventDefault();
    console.log("JSON.stringify(failedLandlordUploads)");
    console.log(JSON.stringify(failedLandlordUploads));

    const csvFile = document.getElementById("csvFile");

    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;

      let data = csvToArray(text, ",");
      console.log(data);
      let newData = [];
      for (let counter = 0; counter < data.length; counter++) {

        if (counter <= 3999) continue;
        else if (counter > 3999 && counter < 5000) {
          if (data[counter]["property id"] != "") {
            let dara = {
              active: true,
              premiseUnitId: parseInt(data[counter]["New Unit ID"]),
              startDate: moment(data[counter]["date_occupied"]).format("YYYY-MM-DD"),
              tenancyCharges: [{
                active: true,
                premiseUnitTypeChargeId: null,
                applicableChargeId: 1,
                chargeConstraintName: "ZERO_BALANCE",
                constraintChargeId: null,
                id: null,
                invoiceDay: 1,
                rateCharge: false,
                unitCost: parseFloat(data[counter]["monthly rent"]),
                value: parseFloat(data[counter]["monthly rent"])
              }],
              oldTenantId: parseInt(data[counter]["old tenant id"]),
              oldUnitId: parseInt(data[counter]["old unitid"]),
              tenancyDocuments: [],
              tenancyRenewalDate: moment(new Date()).add(1, 'years').format("YYYY-MM-DD"),
              tenancyRenewalNotificationDate: moment(new Date()).add(9, 'months').format("YYYY-MM-DD"),
              tenancyStatusName: "CURRENT",
              tenantId: parseInt(data[counter]["New tenant ID"]),
              unitCondition: "Great"
            };


            newData.push(dara);

            // if (newData.length == 1)
            if (dara.startDate != "Invalid date")
              handleLeaseSubmitting(dara, counter);
            else {
              let dat = {
                name: "Invalid date erroor at index " + counter,
                failureReason: "NEW unit id => " + parseInt(data[counter]["New Unit ID"]) + " cound not be created due to invalid start date",
              }

              setFailedLandlordUploads(failedLandlordUploads => [dat, ...failedLandlordUploads]);
            }
          }
        }
        else break;
      }
      console.log(newData.length);
      console.log(newData);

    };

    console.log(csvToArray(reader.readAsText(input), ";"));


  }


  const handleLeaseSubmitting = (data,index) => {

    requestsServiceService.createTenancies(data).then((res) => {
      if (res.data.status === true) {

        // fetchAll();
      } else {
        let dat = {
          name: data.unitName,
          failureReason: res.data.message +" at index " + index
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

        let failures = failedLandlordUploads;
        let dat = {
          name: data.unitName +" at index " + index,
          failureReason: err
        }
        failures.push(dat);
        setFailedLandlordUploads(failures);
      });
  };


  $("#spinner").addClass("d-none")
  
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
                <h4 class="mb-sm-0 font-size-18">Data Management</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to='/'>Uploads </Link>
                    </li>
                    <li class="breadcrumb-item active">Uploads</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="card">

                <h3>Landlords Upload</h3>

                <div class="card-body">
                  <body>
                    <form id="myForm" className='row card-body'>
                      <input type="file" id="csvFile" accept=".csv" />
                      <br />
                      <input type="button" onClick={submitLandlordsFile} value="Submit" />
                    </form>
                    {failedLandlordUploads.length > 0 && <div className='row'>
                      <p>A total of {failedLandlordUploads.length} could not be uploaded, including.. </p>
                      <ul>
                        {failedLandlordUploads.map((failed, index) => <li className=' alert danger danger-alert alert-danger danger-alert'> {failed.name + " => " + failed.failureReason}</li>)}
                      </ul>
                    </div>}
                  </body>

                </div>
              </div>
            </div>





            <div class="col-12">
              <div class="card">

                <h3>Premise Upload</h3>

                <div class="card-body">
                  <body>
                    <form id="myForm" className='row card-body'>
                      <input type="file" id="csvFile" accept=".csv" />
                      <br />
                      <input type="button" onClick={submitPremiseFile} value="Submit" />
                    </form>
                    {failedLandlordUploads.length > 0 && <div className='row'>
                      <p>A total of {failedLandlordUploads.length} could not be uploaded, including.. </p>
                      <ul>
                        {failedLandlordUploads.map((failed, index) => <li className=' alert danger danger-alert alert-danger danger-alert'> {failed.name + " => " + failed.failureReason}</li>)}
                      </ul>
                    </div>}
                  </body>

                </div>
              </div>
            </div>





            <div class="col-12">
              <div class="card">

                <h3>Tenants Upload</h3>

                <div class="card-body">
                  <body>
                    <form id="myForm" className='row card-body'>
                      <input type="file" id="csvFile" accept=".csv" />
                      <br />
                      <input type="button" onClick={submitTenantFile} value="Submit" />
                    </form>
                    {failedLandlordUploads.length > 0 && <div className='row'>
                      <p>A total of {failedLandlordUploads.length} could not be uploaded, including.. </p>
                      <ul>
                        {failedLandlordUploads.map((failed, index) => <li className=' alert danger danger-alert alert-danger danger-alert'> {failed.name + " => " + failed.failureReason}</li>)}
                      </ul>
                    </div>}
                  </body>

                </div>
              </div>
            </div>





            <div class="col-12">
              <div class="card">

                <h3>Units Upload</h3>

                <div class="card-body">
                  <body>
                    <form id="myForm" className='row card-body'>
                      <input type="file" id="csvFile" accept=".csv" />
                      <br />
                      <input type="button" onClick={submitUnitFile} value="Submit" />
                    </form>
                    {failedLandlordUploads.length > 0 && <div className='row'>
                      <p>A total of {failedLandlordUploads.length} could not be uploaded, including.. </p>
                      <ul>
                        {failedLandlordUploads.map((failed, index) => <li className=' alert danger danger-alert alert-danger danger-alert'> {failed.name + " => " + failed.failureReason}</li>)}
                      </ul>
                    </div>}
                  </body>

                </div>
              </div>
            </div>






            <div class="col-12">
              <div class="card">

                <h3>Leases Upload</h3>

                <div class="card-body">
                  <body>
                    <form id="myForm" className='row card-body'>
                      <input type="file" id="csvFile" accept=".csv" />
                      <br />
                      <input type="button" onClick={submitLeaseFile} value="Submit" />
                    </form>
                    {failedLandlordUploads.length > 0 && <div className='row'>
                      <p>A total of {failedLandlordUploads.length} could not be uploaded, including.. </p>
                      <ul>
                        {failedLandlordUploads.map((failed, index) => <li className=' alert danger danger-alert alert-danger danger-alert'> {failed.name + " => " + failed.failureReason}</li>)}
                      </ul>
                    </div>}
                  </body>

                </div>
              </div>
            </div>





            <div class="col-12">
              <div class="card">

                <h3>Landlords Upload</h3>

                <div class="card-body">
                  <body>
                    <form id="myForm" className='row card-body'>
                      <input type="file" id="csvFile" accept=".csv" />
                      <br />
                      <input type="button" onClick={submitLandlordsFile} value="Submit" />
                    </form>
                    {failedLandlordUploads.length > 0 && <div className='row'>
                      <p>A total of {failedLandlordUploads.length} could not be uploaded, including.. </p>
                      <ul>
                        {failedLandlordUploads.map((failed, index) => <li className=' alert danger danger-alert alert-danger danger-alert'> {failed.name + " => " + failed.failureReason}</li>)}
                      </ul>
                    </div>}
                  </body>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Uploads
