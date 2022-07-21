import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import requestsServiceService from '../../services/requestsService.service';
import {Modal} from "react-bootstrap";
import moment from 'moment';

function Invoices() {
  const [invoices, setinvoices] = useState([]);
  const [activeInvoice, setactiveInvoice] = useState({});
  const [transaction, setTransaction] = useState({});
  // MODAL
  const [invoice_show, setinvoice_show] = useState(false);
  const showInvoice = () => setinvoice_show(true);
  const closeInvoice = () => setinvoice_show(false);

  useEffect(() =>{
    getInvoices();
  }, [])

  const getInvoices = () => {
    let data = {startDate:moment().startOf('year'),endDate:moment(new Date()).format("YYYY-MM-DD")}
    requestsServiceService.getInvoices(data).then((res) => {
      console.log(res);
      setinvoices(res.data.data)
    });
  }
  const total = () => {
    let sum = 0;
    let paid = 0
    invoices.map((item) => {
      sum += item.billAmount
      paid += item.billPaidAmount
    });
    return sum-paid
  }
  const getOneInvoice = (id) => {
    let acc = invoices.find(invoice => invoice.transaction.transactionId === id);
    setactiveInvoice(acc);
    showInvoice();
  }
  const addCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Rent & Bills invoices</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="index.html">Dashboards</a></li>
                    <li className="breadcrumb-item"><a href="#">Invoices</a></li>
                    <li className="breadcrumb-item active">All Invoices</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div
                  className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">

                  <div className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                       role="toolbar">
                    <h4 className="card-title text-capitalize mb-0 ">
                      All rent and Bills invoices
                    </h4>
                  </div>
                  {/*<div className="btn-toolbar p-3 align-items-center d-none animated delete-tool-bar"*/}
                  {/*     role="toolbar">*/}
                  {/*  <button type="button"*/}
                  {/*          className="btn btn-primary waves-effect btn-label waves-light me-3"><i*/}
                  {/*    className="mdi mdi-printer label-icon"></i> Print Selected Invoices*/}
                  {/*  </button>*/}
                  {/*</div>*/}
                </div>
                <div className="card-body">
                  <div className="table-responsive overflow-visible">

                    <table className="table align-middle table-hover  contacts-table table-striped "
                           id="datatable-buttons">
                      <thead className="table-light">
                      <tr className="table-dark">

                        <th scope="col">
                          <div className="the-mail-checkbox pr-4">
                            <label htmlFor="selectAll" className="d-none">Select All</label>
                            <input className="form-check-input mt-0 pt-0 form-check-dark"
                                   type="checkbox" id="selectAll"/>
                          </div>
                        </th>
                        <th>Tenant</th>
                        <th>Premises</th>
                        <th>Hse/Unit</th>
                        <th>Charge Name</th>
                        <th>Bill Amount</th>
                        <th>Paid Amount</th>
                        <th>Total Balance</th>
                        <th>Payment Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {invoices && invoices?.map((invoice, index) => (
                        <tr data-id={index} key={index}>
                          <td>
                            <div className="d-flex  align-items-center">
                              <div className="the-mail-checkbox pr-4">
                                <input
                                  className="form-check-input mt-0 pt-0 form-check-dark"
                                  type="checkbox" id="formCheck1"/>
                              </div>
                            </div>
                          </td>
                          <td>{invoice.transactionCustomerName}</td>
                          <td>{invoice.transaction.premiseName}</td>
                          <td>{invoice.transaction.premiseUnitName}</td>
                          <td>{invoice.applicableChargeName}</td>
                          <td>KES. {addCommas(invoice.billAmount)}</td>
                          <td>{addCommas(invoice.billPaidAmount)}</td>
                          <td><span className="fw-semibold ">KES. {addCommas(invoice.billAmount - invoice.billPaidAmount)}</span></td>
                          <td>{invoice.paymentStatus==="PENDING" ? <span class="badge-soft-danger badge">{invoice.paymentStatus}</span> : <span class="badge-soft-success badge">{invoice.paymentStatus}</span> }</td>
                          <td>
                            <div className="d-flex justify-content-end">
                              {/*<button type="button"*/}
                              {/*        className="btn btn-primary btn-sm waves-effect waves-light text-nowrap me-3"*/}
                              {/*        // onClick={() => getOneInvoice(invoice?.transaction.transactionId)}*/}
                              {/*        >Receive Payment*/}
                              {/*</button>*/}
                              <div className="dropdown">
                                <a className="text-muted font-size-16" role="button"
                                   data-bs-toggle="dropdown" aria-haspopup="true">
                                  <i className="bx bx-dots-vertical-rounded"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end ">
                                  <a className="dropdown-item" href="#" onClick={() => getOneInvoice(invoice.transaction.transactionId)}>
                                    <i className="font-size-15 mdi mdi-eye me-3 "></i>View
                                  </a>
                                  <a className="dropdown-item " href="# "><i
                                    className="font-size-15 mdi mdi-printer me-3 "></i>Print</a>
                                  <a className="dropdown-item " href="# "><i
                                    className="font-size-15 mdi mdi-email me-3 "></i>Email
                                    Tenant</a>
                                  <a className="dropdown-item " href="# "><i
                                    className="font-size-15 mdi mdi-chat me-3 "></i>Send
                                    as SMS</a>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                      }
                      </tbody>
                      <tfoot className="table-dark">
                      <tr>
                        <th className="text-capitalize text-nowrap" colSpan="3">{invoices && invoices.length} Invoices</th>
                        <th className="text-nowrap" colSpan="3">{}</th>
                        <th className="text-nowrap" colSpan="3">{}</th>
                        <td className="text-nowrap" colSpan="3">
                          <span className="fw-semibold ">KES. {addCommas(total())}</span>
                        </td>
                      </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*VIEW INVOICE*/}
        <Modal show={invoice_show} onHide={closeInvoice} size="lg" centered>
          <Modal.Header closeButton>
            <h5 className="modal-title" id="myLargeModalLabel">Invoice Details</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="col-12">
              <address>
                <strong>Billed To:</strong><br/>
                {activeInvoice?.transaction?.tenantName} <br/>
                {activeInvoice?.transactionCustomerEmail}<br/>
                {activeInvoice?.transaction?.premiseName + " , "}{activeInvoice?.transaction?.premiseUnitName}<br/>
                <br/>
                {moment(activeInvoice.dateTimeCreated).format("dddd, MMMM Do YYYY, h:mm a")}
              </address>
              <p>Title: {activeInvoice?.transactionTitle}</p>
              <p>Description: {activeInvoice?.transactionDescription}</p>
            </div>
            <div className="col-12">
              <div className="py-2 mt-3">
                <h3 className="font-size-15 fw-bold">Invoice Details ( <span
                  className="text-primary fw-medium">{activeInvoice?.transaction?.transactionId}</span> )</h3>
              </div>
            </div>
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-nowrap">
                  <thead>
                  <tr>
                    <th style={{width: "70px"}}>No.</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Unit Cost</th>
                    <th className="text-end">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>01</td>
                    <td>{activeInvoice?.applicableChargeName}</td>
                    <td>{addCommas(activeInvoice.quantity)}</td>
                    <td>{addCommas(activeInvoice?.unitCost) + ".00"}</td>
                    <td className="text-end">KES. {addCommas(activeInvoice?.billAmount) + ".00"}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td colSpan="2" className="text-end">Total</td>
                    <td className="text-end fw-bold">KES {addCommas(activeInvoice?.billAmount) + ".00"}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td colSpan="2" className="text-end">Paid</td>
                    <td className="text-end  fw-bold">KES {addCommas(activeInvoice?.billPaidAmount) + ".00"}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td colSpan="2" className="border-0 text-end">
                      <strong>Balance</strong>
                    </td>
                    <td className="border-0 text-end">
                      <h5 className="m-0 text-uppercase fw-bold">KES {addCommas(activeInvoice?.billAmount - activeInvoice?.billPaidAmount) + ".00"}</h5>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="col-12">
              <div className="table-resposive p-4 px-2 pt-2 overflow-visible">
                <table className="w-100">
                  <tbody>
                  <tr data-id="1">
                    <td>
                      <label htmlFor="" className="">Payment Method</label>
                      <select className="form-control selectpicker w-100 payment-method"
                              data-style="btn-secondary w-100" data-live-search="true"
                              title="Select payment Method">
                        <option value="Mpesa">MPESA</option>
                        <option value="Cash">CASH</option>
                      </select>
                    </td>
                    <td className="px-3 ">
                      <div className="phone-num d-none">
                        <label htmlFor="">Phone No.</label>
                        <input type="text " className="form-control w-100 d-flex "
                               placeholder="Phone No." spellCheck="false"
                               data-ms-editor="true"/>
                      </div>
                    </td>
                    <td className="px-3">
                      <label htmlFor="">Amount To Be Paid</label>
                      <input type="text " className="form-control w-100 d-flex"
                             placeholder="KES" spellCheck="false" data-ms-editor="true"/>
                    </td>
                    <td className="text-right float-right">
                      <div className="d-flex flex-column">
                        <label className="opacity-0">Something</label>
                        <a href="#"
                           className="btn btn-primary w-md waves-effect waves-light">Submit</a>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/*<div className="float-end">*/}
            {/*  <a href="javascript:window.print()"*/}
            {/*     className="btn btn-success waves-effect waves-light me-1"><i*/}
            {/*    className="mdi mdi-printer font-16px"></i></a>*/}
            {/*  <a href="javascript: void(0);"*/}
            {/*     className="btn btn-primary w-md waves-effect waves-light">Receive Payment</a>*/}
            {/*</div>*/}
          </Modal.Footer>
        </Modal>
    </>
  )
}

export default Invoices;
