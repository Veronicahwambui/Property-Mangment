/* global $ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import ReactPaginate from "react-paginate";

function UnallocatedPayments() {
  const [error, setError] = useState({
    ...error,
    message: "",
    color: "",
  });
  return (
    <div className="page-content">
      {/*<div id="spinner">*/}
      {/*  <div id="status">*/}
      {/*    <div className="spinner-chase">*/}
      {/*      <div className="chase-dot"></div>*/}
      {/*      <div className="chase-dot"></div>*/}
      {/*      <div className="chase-dot"></div>*/}
      {/*      <div className="chase-dot"></div>*/}
      {/*      <div className="chase-dot"></div>*/}
      {/*      <div className="chase-dot"></div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">Unallocated Payments</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Dashboards</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Statements</a>
                  </li>
                  <li className="breadcrumb-item active">
                    Unallocated Payments
                  </li>
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
                    Unallocated Payments
                  </h4>
                  <div className="d-flex justify-content-end align-items-center">
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive overflow-visile">
                  {error.color !== "" && (
                    <div className={"alert alert-" + error.color} role="alert">
                      {error.message}
                    </div>
                  )}
                  <table
                    className="table align-middle table-hover  contacts-table table-striped "
                    id="datatable-buttons"
                  >
                    <thead className="table-light">
                      <tr className="table-dark">
                        <th>RC No</th>
                        <th>Premises</th>
                        <th>LandLord</th>
                        <th className="text-nowrap">Agreement Type</th>
                        <th className="text-nowrap">Client % share</th>
                        <th className="text-nowrap">Client Commission</th>
                        <th className="text-nowrap">Total Debits</th>
                        <th className="text-nowrap">Amount Paid</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnallocatedPayments;
