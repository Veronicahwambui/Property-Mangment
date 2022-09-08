/* global $ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import DatePicker from "react-datepicker";

function Settlements() {
  const [sDate, setsdate] = useState(new Date());
  const [eDate, setedate] = useState(new Date());
  const [palias, setpalias] = useState("");
  const [chargeId, setchargeId] = useState(undefined);
  const [lids, setlids] = useState([]);

  useEffect(() => {
    getCharges();
  }, []);
  const [charges, setcharges] = useState([]);
  const getCharges = () => {
    requestsServiceService.allApplicableCharges().then((res) => {
      setcharges(res.data.data);
    });
  };

  //settlement modals
  const [settlement_show, setsettlementshow] = useState(true);
  const showSettlement = () => setsettlementshow(true);
  const hideSettlement = () => setsettlementshow(false);
  const [check, setCheck] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [landlords, setlandlords] = useState([]);
  const handleSearch = (e) => {
    e.preventDefault();
    getLandlords();
    console.log();
  };
  const selectItems = (e, x) => {
    if (e.target.checked) {
      setlids((lids) => [...lids, x]);
    } else {
      removeItems(x);
    }
  };

  const removeItems = (x) => {
    setlids([...lids.filter((item) => item !== x)]);
  };
  const getLandlords = () => {
    let page = 0,
      size = 100;
    let data = {
      dateCreatedEnd: new Date(),
      dateCreatedStart: moment(new Date()).startOf("year").format(),
      search: searchTerm?.trim(),
    };
    requestsServiceService.getLandLords(page, size, data).then((res) => {
      setlandlords(res.data.data);
    });
  };
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  const submitSettlement = () => {
    let data = {
      chargeId: parseInt(chargeId),
      endDate: moment(eDate).format(),
      landlordId: lids,
      periodAlias: palias,
      startDate: moment(sDate).format(),
    };
    requestsServiceService
      .createSettlements(data)
      .then((response) => {
        if (response.data.status === true) {
          setError({
            ...error,
            message: response.data.message,
            color: "success",
          });
        } else {
          setError({
            ...error,
            message: response.data.message,
            color: "danger",
          });
        }
      })
      .catch((err) => {
        // setError({
        //   ...error,
        //   message: err.message,
        //   color: "danger",
        // });
      });
  };
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">Settlements</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Dashboards</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Settlements</a>
                  </li>
                  <li className="breadcrumb-item active">Create Settlements</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                <div
                  className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                  role="toolbar"
                >
                  <h4 className="card-title text-capitalize mb-0 ">
                    Settlements
                  </h4>
                  <div className="d-flex justify-content-end align-items-center">
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="col-12">
                  <div className="row">
                    <label htmlFor="">Select a landlord?</label>
                    <div className="d-flex align-items-center flex-grow-1">
                      <div className="form-group d-flex">
                        <div
                          className={"form-check mb-3"}
                          style={{ marginRight: "1em" }}
                        >
                          <input
                            className="form-check-input"
                            value="Credit"
                            type="checkbox"
                            checked={check}
                            onChange={() => setCheck(true)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="debit-yes"
                          >
                            Yes
                          </label>
                        </div>
                        <div className={"form-check mb-3"}>
                          <input
                            className="form-check-input"
                            value="Credit"
                            type="checkbox"
                            checked={!check}
                            onChange={() => setCheck(false)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="debit-no"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <>
                      <div className="col-12">
                        {check && (
                          <form
                            onSubmit={handleSearch}
                            id={"credit-search-form"}
                          >
                            <div className="app-search d-none d-lg-block d-flex">
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={"Search Landlord"}
                                  required={true}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                />
                                <span className="bx bx-search-alt"></span>
                              </div>
                            </div>
                            <button
                              className="btn btn-primary btn-sm btn-rounded"
                              type="submit"
                            >
                              Search
                            </button>
                          </form>
                        )}
                      </div>
                      <div className="col-12">
                        <div className="row">
                          {check && landlords?.length < 5 && (
                            <>
                              {landlords?.map((landlord) => (
                                <>
                                  <div className="p-2 d-flex">
                                    <input
                                      type="checkbox"
                                      onChange={(e) =>
                                        selectItems(e, landlord.id)
                                      }
                                      checked={lids.some(
                                        (el) => el === landlord.id
                                      )}
                                    />
                                    <span>{landlord.firstName}</span>
                                  </div>
                                </>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <>
                          <div className="form-group">
                            <label htmlFor="">Applicable Charges</label>
                            <select
                              name=""
                              id=""
                              onChange={(e) => setchargeId(e.target.value)}
                              value={chargeId}
                              className={"form-control"}
                            >
                              <option>Select charge...</option>
                              {charges?.map((charge) => (
                                <option key={charge.id} value={charge.id}>
                                  {charge.name.toUpperCase()}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Period</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Period"
                              onChange={(e) => setpalias(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Start Date</label>
                            <DatePicker
                              selected={sDate}
                              onChange={(date) => setsdate(date)}
                              selectsStart
                              className="form-control cursor-pointer"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">End Date</label>
                            <DatePicker
                              selected={eDate}
                              onChange={(date) => setedate(date)}
                              selectsStart
                              className="form-control cursor-pointer"
                            />
                          </div>
                        </>
                      </div>
                    </>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    onClick={submitSettlement}
                  >
                    Submit
                  </button>
                  {error.color !== "" && (
                    <div className={"alert alert-" + error.color} role="alert">
                      {error.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settlements;
