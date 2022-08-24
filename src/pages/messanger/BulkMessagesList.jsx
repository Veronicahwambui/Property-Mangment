/* global $*/
import React, { useEffect, useState } from "react";
import requestsServiceService from "../../services/requestsService.service";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";

export default function BulkMessagesList() {
  const [messages, setmessages] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const [totalMessages, setTotalMessages] = useState([]);

  const sortSize = (e) => {
    setSize(e.target.value);
  };
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setmessages(totalMessages.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(totalMessages.length / size));
  }, [itemOffset, size]);

  useEffect(() => {
    getBulkMessages();
  }, []);

  const getBulkMessages = () => {
    var data = {};
    var ds = [];
    requestsServiceService.getBulkMessages().then((res) => {
      res.data.data?.map((item) => {
        ds.push(
          Object.assign(
            data,
            { d: JSON.parse(item.data) },
            { bulkRef: item.bulkReference },
            { done: item.done }
          )
        );
      });
      setTotalMessages(ds);
    });
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * size) % totalMessages.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  const [activeMessage, setActiveMessage] = useState({});

  function getOneBulkmessage(mes) {
    setActiveMessage(mes);
  }

  useEffect(() => {
    getBulkMessages();
    console.log(activeMessage);
  }, [activeMessage]);

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18 text-capitalize">
                  Bulk Messaging
                </h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/">Messages</a>
                    </li>
                    <li className="breadcrumb-item active">Bulk Messages</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
              <>
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                        <div
                          className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                          role="toolbar"
                        >
                          <h4 className="card-title text-capitalize mb-0 ">
                            All Bulk Messages
                          </h4>
                        </div>
                        <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                          <div
                            className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                            role="toolbar"
                          >
                            <div className="d-flex align-items-center flex-grow-1"></div>
                            <div className="d-flex">
                              <Link to="/bulkmessaging">
                                <button
                                  type="button"
                                  className="btn btn-primary waves-effect btn-label waves-light me-3"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-new-client"
                                >
                                  <i className="mdi mdi-plus label-icon"></i>{" "}
                                  Create bulk Message
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table
                            className="table align-middle table-hover  contacts-table table-striped "
                            id="datatable-buttons"
                          >
                            <thead className="table-light">
                              <tr className="table-light">
                                <th>Bulk Reference</th>
                                <th>Recipient</th>
                                <th>Message Type</th>
                                <th>Communication Channel</th>
                                <th>Who to Charge</th>
                                <th>Time Period</th>
                                <th>Date Created</th>
                                <th className="text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {messages.length > 0 &&
                                messages?.map((message, index) => (
                                  <tr data-id={index} key={index}>
                                    <td>{message.bulkRef}</td>
                                    <td>{message.d?.sendTo}</td>
                                    <td>{message.d?.messageKind}</td>
                                    <td>{message.d?.messageType}</td>
                                    <td>
                                      {message.d?.whoToCharge === ""
                                        ? "N/A"
                                        : message.d?.whoToCharge}
                                    </td>
                                    <td>{message.d?.period + " days"}</td>
                              <td>{moment(message.dateTimeCreated).format("YYYY-MM-DD HH:mm")}</td>

                                    <td>
                                      <div className="d-flex justify-content-end">
                                        {/*<button type="button"*/}
                                        {/*        className="btn btn-primary btn-sm waves-effect waves-light text-nowrap me-3"*/}
                                        {/*        // onClick={() => getOnemessage(message?.transaction.transactionId)}*/}
                                        {/*        >Receive Payment*/}
                                        {/*</button>*/}

                                        <div className="dropdown">
                                          <a
                                            className="text-muted font-size-16"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                          >
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                          </a>
                                          <div className="dropdown-menu dropdown-menu-end ">
                                            <a
                                              className="dropdown-item cursor-pointer"
                                              onClick={() => {
                                                getOneBulkmessage(message);
                                              }}
                                            >
                                              <i className="font-size-15 mdi mdi-eye me-3 "></i>
                                              View
                                            </a>
                                            <a className="dropdown-item">
                                              <i className="font-size-15 mdi mdi-printer me-3 "></i>
                                              Print
                                            </a>
                                            <a
                                              className="dropdown-item cursor-pointer"
                                              // onClick={() => {
                                              //   handleModeChange("Email");
                                              //   handleClicked(message, "Email");
                                              // }}
                                            >
                                              <i className="font-size-15 mdi mdi-email me-3 "></i>
                                              Email Tenant
                                            </a>
                                            <a
                                              className="dropdown-item cursor-pointer"
                                              // onClick={() => {
                                              //   handleModeChange("SMS");
                                              //   handleClicked(message, "SMS");
                                              // }}
                                            >
                                              <i className="font-size-15 mdi mdi-chat me-3"></i>
                                              Send as SMS
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                            <tfoot className="table-dark">
                              <tr>
                                <th
                                  className="text-capitalize text-nowrap"
                                  colSpan="3"
                                >
                                  {messages && messages.length} messages
                                </th>
                                <td
                                  className="text-nowrap text-right"
                                  colSpan="6"
                                >
                                  <span className="fw-semibold">
                                    {/*{formatCurrency.format(total())}*/}
                                  </span>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                        <div className="mt-4 mb-0 flex justify-between px-8">
                          <div>
                            <select
                              className={"btn btn-primary"}
                              name=""
                              id=""
                              value={size}
                              onChange={(e) => sortSize(e)}
                            >
                              <option value={parseInt(5)}>5 rows</option>
                              <option value={parseInt(10)}>10 rows</option>
                              <option value={parseInt(20)}>20 rows</option>
                            </select>
                          </div>
                          {pageCount !== 0 && (
                            <p className=" font-medium text-xs text-gray-700">
                              {" "}
                              showing page{" "}
                              <span className="text-green-700 text-opacity-100 font-bold text-sm">
                                {page + 1}
                              </span>{" "}
                              of{" "}
                              <span className="text-sm font-bold text-black">
                                {pageCount}
                              </span>{" "}
                              pages
                            </p>
                          )}

                          {pageCount !== 0 && (
                            <ReactPaginate
                              previousLabel={"prev"}
                              nextLabel={"next"}
                              breakLabel={"..."}
                              pageCount={pageCount} // total number of pages needed
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={1}
                              onPageChange={handlePageClick}
                              breakClassName={"page-item"}
                              breakLinkClassName={"page-link"}
                              containerClassName={"pagination"}
                              pageClassName={"page-item"}
                              pageLinkClassName={"page-link"}
                              previousClassName={"page-item"}
                              previousLinkClassName={"page-link"}
                              nextClassName={"page-item"}
                              nextLinkClassName={"page-link"}
                              activeClassName={"active"}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
           
          </div>

          <footer className="footer ">
            <div className="container-fluid ">
              <div className="row ">
                <div className="col-sm-6 ">
                  <script>document.write(new Date().getFullYear())</script>©
                  RevenueSure
                </div>
                <div className="col-sm-6 ">
                  <div className="text-sm-end d-sm-block ">
                    A product of Nouveta LTD
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
