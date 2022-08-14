/* global $ */

import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { useEffect } from "react";
import readXlsxFile from 'read-excel-file'
import requestsServiceService from "../../services/requestsService.service";
import { confirmAlert } from "react-confirm-alert";

function CustomMessage() {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setselectedFile] = useState('');
  const [columnNames, setcolumnNames] = useState([]);
  const [dataObjects, setdataObjects] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [formData, setformData] = useState({
    message: "",
    paramValues: "",
    parameterValues: "",
    recipients: []
  });

  useEffect(() => {
    onFileChange();
  }, [selectedFile]);


  const onFileChange = (event) => {

    let objects = [];
    readXlsxFile(selectedFile).then((rows) => {

      let columns = rows.shift();
      setcolumnNames(columns);

      if (!columns.includes("Phone")) {

        setUploading(false);

        confirmAlert({

          title: 'Upload File Failed',
          message: 'The file you uploaded does not have column "Phone"',
          buttons: [
            {
              label: 'ok',
            }
          ]
        });
      } else {
        // each row being an array of cells.
        rows.forEach((row) => {
          const obj = {};
          row.forEach((cell, i) => {
            obj[columnNames[i]] = cell;
          });
          objects.push(obj);
        });
        console.log(objects);

        setUploading(false);
        setdataObjects(objects);

      }

    });
  }

  const complete = (strComplete) => {
    var val = document.getElementById("message").value.substring(0, document.getElementById("message").value.indexOf('@')) + "{{" + strComplete + "}} ";
    document.getElementById("message").value = val;
  }

  const downloadTemplate = () => {
    requestsServiceService.getCustomerUploadFile().then(response => {
      console.log(response.data);

    }).catch(error => {

      confirmAlert({
        title: 'Error occurred',
        message: error.message,
        buttons: [
          {
            label: 'ok',
          }
        ]
      });
    })
  }

  const startsWith = (str, word) => {
    return str.lastIndexOf(word, 0) === 0;
  }

  const handleChange = (el) => {
    let inputName = el.target.name;
    let inputValue = el.target.value;

    if (inputName === "message") {

      var templateString = inputValue;
      var lastString = templateString.substr(templateString.lastIndexOf(" "));

      if (startsWith(lastString, " @")) {
        var val = lastString.substr(2);
        console.log("finding suggestions for " + val);

        var objList = document.createElement("ul");
        if (val.length > 1) {
          var found = false;
          for (var i = 0; i < columnNames.length; i++) {
            var word = columnNames[i];
            var wordPart = word.substring(0, val.length)
            if ((word.length > val.length && wordPart.toLowerCase() === val.toLowerCase())) { // check if the words are matching
              // if they do create a list entry
              found = true;
              var objListEntity = document.createElement("li");
              objListEntity.onclick = complete(word);
              objListEntity.innerHTML = word;
              objList.appendChild(objListEntity);
            }
          }
          if (found != true) {
            console.log("not found any matching word")
            for (var i = 0; i < columnNames.length; i++) {
              var word = columnNames[i]
              var objListEntity = document.createElement("li");
              objListEntity.onclick = complete(word);
              objListEntity.innerHTML = word;
              objList.appendChild(objListEntity);
            }
          }
        } else {
          console.log("not found any matching word")
          for (var i = 0; i < columnNames.length; i++) {
            var word = columnNames[i]
            var objListEntity = document.createElement("li");
            // objListEntity.setAttribute("onclick", "complete('" + word + "', '" + strSuggestionsDivId + "');");
            objListEntity.onclick = function () { complete(word); }.bind(this);

            objListEntity.innerHTML = word;
            objList.appendChild(objListEntity);
          }
          // show the suggestionList
        }
        // show the suggestionList

        setformData(...formData, ["message"], inputValue);

      } else {
        var params = templateString.match(/{{(.*?)}}/g);

        if (params != null && params.length > 0) {

          var paramsText = params.toString();
          var paramsWithoutBraces = paramsText.replace(/{{|}}/gi, "");


          setformData({ ...formData, [inputName]: inputValue });
          setformData({ ...formData, ["message"]: inputValue });
          setformData({ ...formData, ["parameterValues"]: paramsWithoutBraces.split(",") });

        } else {
          setformData({ ...formData, ["message"]: inputValue });
        }
      }

      setformData({ ...formData, ["message"]: inputValue });
    }
    else
      setformData({ ...formData, [inputName]: inputValue });
  }


  const submit = (event) => {

    event.preventDefault();
    let send = false;

    if (formData.parameterValues.length < 1) {
      send = false;
      alert("Please set the value of the parameter you want to send");

    }


    let founAllParams = true;
    let notFoundParams = "";

    var data = dataObjects[0];
    var keys = Object.keys(data);

    for (var m = 0; m < keys.length; m++) {
      keys[m] = keys[m].toLowerCase();
    }

    for (var i = 0; i < formData.parameterValues.length; i++) {

      if (!keys.includes(formData.parameterValues[i].toLowerCase())) {

        if (notFoundParams.indexOf(formData.parameterValues[i]) < 0)
          notFoundParams += formData.parameterValues[i] + ",";
        founAllParams = false;
      }
    }

    if (!founAllParams) {
      send = false;
      confirmAlert({
        title: 'Error',
        message: "Sorry. Some of the params on the message could not be found in your uploaded data. Params : " + notFoundParams,
        buttons: [
          {
            label: 'ok',
          }
        ]
      });

    }

    if (founAllParams)
      send = true;

    if (send) {
      var values = [];
      for (var i = 0; i < formData.parameterValues.length; i++) {

        var paramValues = [];

        for (var m = 0; m < dataObjects.length; m++) {
          var data = dataObjects[m];
          Object.keys(data).map(key => {
            // if (data.hasOwnProperty(key)) {
            if (key.toLowerCase() == formData.parameterValues[i].toLowerCase())
              paramValues.push(data[key])
            // }
          });
        }
        var obj = {
          parameter: formData.parameterValues[i],
          values: paramValues
        };
        values.push(obj);
      }

      formData.parameters = values;

      var numbers = [];
      for (var m = 0; m < dataObjects.length; m++) {
        var data = dataObjects[m];
        Object.keys(data).map(key => {
          if (data.hasOwnProperty(key)) {
            if (key == "Phone") {
              console.log(data[key]);
              numbers.push(data[key]);
            }
          }
        });
      }


      console.log("formData => " + JSON.stringify(formData));


      requestsServiceService.createCustomMessage(formData).then(response => {
        console.log(response.data.data);

        if (response.data.successStatus == "success") {

          setSentMessages(response.data.body != null ? response.data.body : []);

          // moveNext();

        } else {
          confirmAlert({
            title: 'Error sending messages',
            message: response.data.message,
            buttons: [
              {
                label: 'ok',
              }
            ]
          });
        }

      }).catch(error => {
        confirmAlert({
          title: 'Error occurred',
          message: error.message,
          buttons: [
            {
              label: 'ok',
            }
          ]
        });
      });

    }


  }


  return (
    <>
      <div className="page-content">
        <div className="content-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18 text-capitalize">
                  Custom Message
                </h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="property-list.html">Messages</a>
                    </li>
                    <li class="breadcrumb-item active">
                      Custom Message
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          {/* <!-- eTransactions table --> */}

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <p>
                    Fill in the form correctly. Fields with an Asterisk{" "}
                    <strong class="text-danger">*</strong> are mandatory fields.
                  </p>
                  <div className="create-property" id="kev-step-form">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                      <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>

                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                            <a className="nav-link active">1. Excel File Upload <span
                              className="sr-only">(current)</span></a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link">2. Message</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link">3. Preview</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link">4. Results</a>
                          </li>
                        </ul>

                      </div>
                    </nav>

                    {/* <!-- Excel File Upload --> */}
                    <section className="step-cont active-step">
                      <h3>Excel File Upload</h3>
                      <div className="tab-pane active" id="tab1">


                        <div className=" padding pt-0 pb-0">

                          <div className="p-4 bg-light">
                            <div className="row ">
                              <div className="col-12">
                                <form action="#" className="dropzone p-4">
                                  <div className="fallback">
                                    <input name="file" type="file"
                                      onChange={(e) => setselectedFile(e.target.files[0])} className="mb-3" />
                                  </div>
                                  <div className="dz-message needsclick">
                                    <div className="mb-3">
                                      <i className="display-4 message-muted bx bxs-cloud-upload"></i>
                                    </div>

                                    <h6>Messages excel file</h6>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>


                        </div>
                        {/* </form> */}
                      </div>
                      <p>The fields we have gotten on your document include:
                        {columnNames != "" && columnNames.map((column, index) => (
                          <span key={index}><strong>{column},</strong></span>
                        ))
                        }.
                      </p>
                    </section>

                    {/* <!-- Message --> */}
                    <section className="step-cont d-none">
                      <h3>Message</h3>
                      <div className=" padding pt-0 pb-0">
                        <p>The fields we have gotten on your document include:
                          {columnNames != "" && columnNames.map((column, index) => (
                            <span key={index}><strong>{column},</strong></span>
                          ))
                          }.
                        </p>
                        <form className="form pb-3">
                          Create the message to send to all<hr></hr>
                          <p>Sample: If the excel column headers are Phone,name and balance, then you will type the message as: Dear @name, you balance is @balance. This message will be sent to all the numbers on column [Phone]</p>


                          <div
                            className="col-12 form-group">
                            <label>Message</label>
                            <textarea
                              name="message"
                              className="form-control"
                              id="message"
                              data-parsley-required="true"
                              data-parsley-trigger="keyup" data-parsley-minlength="1" data-parsley-maxlength="1000"
                              onChange={handleChange}
                              placeholder="If the excel column headers are Phone,name and balance, then you will type the message as: Dear @name, you balance is @balance "
                              cols="10"
                              rows="10">
                            </textarea>
                          </div>
                        </form>

                      </div>
                    </section>

                    {/* <!-- Document attachments --> */}
                    <section className="step-cont d-none">
                      <h3>Preview</h3>

                    </section>

                    <section className="step-cont d-none">
                      <h3>Results</h3>

                    </section>

                    <div className="button-navigators">
                      <button disabled className="btn btn-primary waves-effect kev-prev me-2"><i className="mdi-arrow-left mdi font-16px ms-2 me-2"></i> Previous </button>
                      {columnNames.includes("Phone") && <button className="btn btn-primary waves-effect kev-nxt me-2">Next <i className="mdi mdi-arrow-right font-16px ms-2 me-2"></i></button>
                      } <button type='button' className="btn btn-success kev-submit me-2 d-none" onClick={submit}>Submit <i className="mdi mdi-check-all me-2 font-16px"></i></button>
                    </div>
                  </div>
                </div>

                {/* <button type='button' className='btn btn-success' onClick={submit}>SUBMIT</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomMessage;