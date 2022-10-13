/* global $ */
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import ReactPaginate from "react-paginate";



function LandlordStatements() {
    const [statements, setstatements] = useState([]);
    const [startDate, setStartDate] = useState("01/12/2022");
    const [endDate, setEndDate] = useState("12/12/2022");
    let formatCurrency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      });
    const sortSize = (e) => {
        setSize(e.target.value);
      };
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [pageCount, setPageCount] = useState(1);
    const [itemOffset, setItemOffset] = useState(0);
    const [error, setError] = useState({
        message: "",
        color: "",
      });
    
    useEffect(() => {
        getStatements();
    }, []);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * size) % statements.length;
        setItemOffset(newOffset);
        setPage(event.selected);
      };

    const getStatements = () => {
    requestsServiceService.getAllSettlements(page, size , startDate ,endDate).then((res) => {
      setstatements(res.data.data !== null ? res.data.data : []);
      setPage(res.data.page)
      setSize(res.data.size)
      setPageCount(res.data.totalPages)
      $("#spinner").addClass("d-none");
    });
  };

  return (
    <div className="page-content">
    <div id="spinner">
      <div id="status">
        <div className="spinner-chase">
          <div className="chase-dot"></div>
          <div className="chase-dot"></div>
          <div className="chase-dot"></div>
          <div className="chase-dot"></div>
          <div className="chase-dot"></div>
          <div className="chase-dot"></div>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Statements</h4>

            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboards</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Statements</a>
                </li>
                <li className="breadcrumb-item active">All Statements</li>
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
                  LandLord Statements
                </h4>
                <div className="d-flex justify-content-end align-items-center">
                  <div>
                    <div>
                   <NavLink to="/settlements">
                   <button
                          className={"btn btn-primary"}
                        >
                          Create New Settlement
                        </button>
                   </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive overflow-visile">
                {error.color !== "" && (
                  <div
                    className={"alert alert-" + error.color}
                    role="alert"
                  >
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
                  <tbody>
                    {statements?.length > 0 &&
                      statements?.map((statement, index) => (
                       <tr key={index}>
                         <td className="text-nowrap">{statement.reference}</td>
                         <td className="text-capitalize">{statement.premise.premiseName}</td>
                         <td className="text-capitalize text-nowrap">{statement.landLord.firstName} {statement.landLord.lastName}</td>
                         <td className="text-nowrap">{statement.landLordAgreementType.name}</td>
                         <td>{statement.clientCommissionRate} % </td>
                         <td>{formatCurrency.format(statement.clientCommission)}</td>
                         <td>{formatCurrency.format(statement.totalDebitNotes)}</td>
                         <td>{formatCurrency.format(statement.amountPaidOut)}</td>
                         <td className="text-right text-nowrap">
                            <Link to={"/landord-statements/"+ statement.reference}>
                              <button type="button"
                                      className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                              >
                                View Details
                              </button>
                            </Link>
                          </td>
                       </tr>
                      ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr>
                      <th
                        className="text-capitalize text-nowrap"
                        colSpan="3"
                      >
                        {statements && statements?.length}{" "}
                        Statements
                      </th>
                      <td className="text-nowrap text-right" colSpan="7">
                        <span className="fw-semibold">
                          {/*{formatCurrency.format(total())}*/}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="d-flex justify-content-between align-items-center">
                  {pageCount !== 0 && (
                    <>
                      <select
                        className="btn btn-md btn-primary"
                        title="Select A range"
                        onChange={(e) => sortSize(e)}
                        value={size}
                      >
                        <option className="bs-title-option" value="">
                          Select A range
                        </option>
                        <option value="10">10 Rows</option>
                        <option value="30">30 Rows</option>
                        <option value="50">50 Rows</option>
                      </select>
                      <nav
                        aria-label="Page navigation comments"
                        className="mt-4"
                      >
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
                    </>
                  )}
                </div>
                {pageCount !== 0 && (
                  <p className="font-medium  text-muted">
                    showing page{" "}
                    <span className="text-primary">
                      {pageCount === 0 ? page : page + 1}
                    </span>{" "}
                    of
                    <span className="text-primary"> {pageCount}</span> pages
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LandlordStatements