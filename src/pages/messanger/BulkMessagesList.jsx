/* global $*/
import React, { useEffect, useState } from "react";
import requestsServiceService from "../../services/requestsService.service";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";
import StatusBadge from "../../components/StatusBadge";

export default function BulkMessagesList() {
  const [messages, setmessages] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
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
  }, [itemOffset, size, totalMessages]);

  useEffect(() => {
    getBulkMessages();
  }, []);

  const getBulkMessages = () => {
    var data = {};
    var ds = [];
    requestsServiceService.getBulkMessages().then((res) => {
      console.log(res.data.data);
      setTotalMessages(res.data.data);
      $("#spinner").addClass("d-none");
      let x = 0;
      let d = [];
      res.data.data.forEach((message, index) => {
        d.push({
          data: JSON.parse(message.data),
          bulkReference: message.bulkReference,
          done: message.done,
        });
        setTotalMessages(d);
      });
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
                              <th>Status</th>
                              <th className="text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {messages.length > 0 &&
                              messages?.map((message, index) => (
                                <tr data-id={index} key={index}>
                                  <td>{message.bulkReference}</td>
                                  <td>{message.data.sendTo}</td>
                                  <td>{message.data.messageKind}</td>
                                  <td>{message.data.messageType}</td>
                                  <td>
                                    {message.data.whoToCharge === ""
                                      ? "N/A"
                                      : message.data.whoToCharge}
                                  </td>
                                  <td>{message.data.period + " days"}</td>
                                  <td>
                                    {moment(message.dateTimeCreated).format(
                                      "YYYY-MM-DD HH:mm"
                                    )}
                                  </td>
                                  <td>
                                    <StatusBadge
                                      type={
                                        message?.done ? "Done" : "In-Progress"
                                      }
                                    />
                                  </td>
                                  <td>
                                    <div className="d-flex justify-content-end">
                                      <div className="dropdown">
                                        <a
                                          className="text-muted font-size-16"
                                          role="button"
                                          data-bs-toggle="dropdown"
                                          aria-haspopup="true"
                                        >
                                          <i className="bx bx-dots-vertical-rounded"></i>
                                        </a>
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
                            of<span className="text-primary"> {pageCount}</span>{" "}
                            pages
                          </p>
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
