/* global $ */

import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from 'moment'
import AuthService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import DatePickRange from "../../components/Datepicker";
import ReactPaginate from "react-paginate";
import StatusBadge from "../../components/StatusBadge";
import ViewInvoice from '../../components/ViewInvoice';
import Message from '../../components/Message';
import { Modal } from "react-bootstrap";


function UserDetails() {
  const [adminlistData, setAdminListData] = useState({});
  const [activeLink, setActiveLink] = useState(1);
  const [communication, setCommunication] = useState([])

  const [message, setMessage] = useState([]);

  const { id } = useParams();
  const userId = id;

  const fetchAll = () => {
    requestsServiceService.viewOneUser(userId).then((res) => {
      setAdminListData(res.data.data);
    });
  };

  useEffect(() => {
    fetchAll();
    fetchCommunication();
  }, []);


  let clientId = AuthService.getClientId()

  const fetchCommunication = () => {
    requestsServiceService.getEntityCommunication(userId, 0, 5, "USER", clientId).then((res) => {
      setCommunication(res.data.data)
    })

  }

  const [messageData, setMessageData] = useState({})
  let modalMessage = Object.keys(messageData)?.length > 0 && JSON.parse(messageData?.data);


  // * ==============================
  // invoice stuff   
  // * ==============================
  const [invoices, setinvoices] = useState([]);
  const [activeInvoice, setActiveInvoice] = useState({});
  const [size3, setSize3] = useState(10);
  const [pageCount3, setPageCount3] = useState(0);
  const [page3, setPage3] = useState(0);
  const [status, setStatus] = useState("");
  const [startDate3, setStartDate3] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate3, setEndDate3] = useState(
    moment(new Date()).add(3, "M").format("YYYY-MM-DD")
  );

  const [invoice_show, setinvoice_show] = useState(false);
  const showInvoice = () => setinvoice_show(true);
  const [transaction, settransaction] = useState({});
  const [paymentItems, setpaymentItems] = useState([]);


  const closeInvoice = () => {
    setinvoice_show(false);
  };

  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [date, setDate] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });

 
  const handleCallback = (sD, eD) => {
    setStartDate3(moment(sD).format("YYYY-MM-DD"))
    setEndDate3(moment(eD).format("YYYY-MM-DD"))
  };


  useEffect(() => {
    getInvoices();
  }, [size3, page3, activeInvoice, transaction, paymentItems]);

  const sort2 = (event) => {

    event.preventDefault();
    let data = {
      startDate: startDate3,
      endDate: endDate3,
      // size: size,
      // page: page,
      userId: parseInt(userId),
      search: searchTerm,
    };
    requestsServiceService.getSortedInvoices(page3, size3, data).then((res) => {
      setPageCount3(res.data.totalPages);
      setinvoices(res.data.data);
    });
  };
  const sortSize2 = (e) => {
    setSize3(e.target.value);
    setPage3(0);
  };
  const getInvoices = () => {
    let data = {
      startDate: startDate3,
      endDate: endDate3,
      userId: parseInt(userId),
      search: searchTerm.trim(),
    };
    requestsServiceService.getSortedInvoices(page3, size3, data).then((res) => {
      setPageCount3(res.data.totalPages);
      setinvoices(res.data.data);
      setStatus('')
      window.scrollTo(0, 0);
    });
  };
  const handlePageClick3 = (data) => {
    console.log(data);
    let d = data.selected;
    setPage3(d);
  };

  const total = () => {
    let sum = 0;
    let paid = 0;
    paymentItems.map((item) => {
      sum += item.billAmount;
      paid += item.billPaidAmount;
    });
    return { sum: sum, paid: paid, balance: sum - paid };
  };
  const reset = () => {
    setSize3(100);
    setPage3(1);
  };
  const getOneInvoice = (id) => {
    let one = invoices.find(one => one.transactionItemId === id)
    setActiveInvoice(one)
    showInvoice();
  };

  // MESSAGE TEST
  const [details, setDetails] = useState({
    message: "",
    contact: "",
    recipientName: "",
    entity: null,
    clientName: JSON.parse(AuthService.getCurrentUserName()).client?.name,
    clientId: parseInt(AuthService.getClientId()),
    entityType: "USER",
    createdBy: "",
    senderId: "",
    subject: "Invoice Payment",
  });
  const [mode, setmode] = useState("");
  const handleModeChange = (mode) => {
    setmode(mode);
  };
  const handleClicked = (inv, mod) => {
    let mes = `Dear ${inv.transactionCustomerName}, your invoice ${inv.billerBillNo
      } balance is ${formatCurrency.format(
        inv.billAmount - inv.billPaidAmount
      )}. Click here to pay for it`;
    let senderId =
      JSON.parse(AuthService.getCurrentUserName()).client?.senderId === null
        ? "REVENUESURE"
        : JSON.parse(AuthService.getCurrentUserName()).client?.senderId;
    setDetails({
      ...details,
      message: mes,
      contact:
        mod === "Email"
          ? inv.transactionCustomerEmail
          : inv.transaction?.tenancy?.tenant?.phoneNumber,
      entity: inv.transaction?.tenancy?.id,
      recipientName: inv.transactionCustomerName,
      createdBy: inv.createdBy,
      senderId: senderId,
      subject: "Invoice Payment",
    });
    $(".email-overlay").removeClass("d-none");
    setTimeout(function () {
      $(".the-message-maker").addClass("email-overlay-transform");
    }, 0);
  };
  useEffect(() => { }, [details, mode]);

  const clear2 = () => {
    setDetails({
      ...details,
      message: "",
      contact: "",
      recipientName: "",
      entity: null,
      clientName: JSON.parse(AuthService.getCurrentUserName()).client?.name,
      clientId: parseInt(AuthService.getClientId()),
      entityType: "USER",
      createdBy: "",
      senderId: "",
      subject: "Invoice Payment",
    });
  };


  // * ==============================
  //  ! STATEMENTS PART   
  // * ==============================
  const [currentStatements, setCurrentStatements] = useState([]);
  const [viewStatement, setViewStatement] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [statementdate, setstatementdate] = useState({
    startDate: new Date(new Date().getFullYear(), 0),
    endDate: new Date(),
  });
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  // PAGINATION
  const statsortSize = (e) => {
    setstatSize(e.target.value);
  };
  const [statpage, setStatPage] = useState(0);
  const [statsize, setstatSize] = useState(10);
  const [statpageCount, setstatPageCount] = useState(1);

  const [invoice_show2, setinvoice_show2] = useState(false);
  const showInvoice2 = () => setinvoice_show2(true);
  const closeInvoice2 = () => setinvoice_show2(false);

  const handleStatPageClick = (event) => {
    // const newOffset = (event.selected * size) % statements.length;
    // setItemOffset(newOffset);
    setStatPage(event.selected);
  };
  const getOneStatement = (bill) => {
    let acc = currentStatements.find((statement) => statement.id === bill);
    setActiveInvoice(acc);
    showInvoice2()
  };

  useEffect(() => {
    getLanlordStatements();
  }, [statpage, statsize]);

  const getLanlordStatements = () => {
    let data = { startDate: moment(statementdate.startDate).format("YYYY/MM/DD"), endDate: moment(statementdate.endDate).format("YYYY/MM/DD"), page: statpage, size: statsize, id: userId, entityType: "USER" };
    requestsServiceService.getLandlordStatements(data).then((res) => {
      setCurrentStatements(res.data.data);
      setstatPageCount(res.data.totalPages)
    });
  };

  const handleCallback2 = (sD, eD) => {
    setstatementdate({
      ...statementdate,
      startDate: moment(sD).format("YYYY-MM-DD"),
      endDate: moment(eD).format("YYYY-MM-DD")
    }
    )
  };

  // ! utilizing part 

  const [utilData, setUtilData] = useState({
    newBillNo: "",
    statementId: "",
    tenantId: "",
  });

  const setUtilizeValues = (statementId, tenantId) => {
    setUtilData({
      ...utilData,
      newBillNo: "",
      statementId: statementId,
      tenantId: tenantId,
    });
  };

  const searchBillNo = async (e) => {
    e.preventDefault();
    handleClose();

    await requestsServiceService
      .viewTransactionItem(utilData.newBillNo)
      .then((res) => {
        console.log(res.data);
        if (res.data.paymentStatus !== "PAID" && res.data.status === true) {
          utilize();
        } else {
          setError({
            ...error,
            message: "ERROR: Bill is already paid",
            color: "danger",
          });
        }
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
        }, 2000);
      });
  };

  const utilize = () => {
    requestsServiceService.utilize(utilData).then((res) => {
      if (res.data.status === true) {
        setError({
          ...error,
          message: res.data.message,
          color: "success",
        });
      } else {
        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
      }
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: "",
        });
      }, 2000);
    });
  };



  return (
    <div className=''>
      <div className=' page-content'>
        <div className='container-fluid'>

          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">System administrators</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">    <Link to='/'>Dashboard </Link></li>
                    <li class="breadcrumb-item"><Link to='/adminlist'> System Users</Link></li>
                    <li class="breadcrumb-item active"> {adminlistData.user && adminlistData?.user.firstName} {adminlistData.user && adminlistData?.user.lastName}</li>

                  </ol>

                </div>

              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body pt-2 pb-3">
                  <nav class="navbar navbar-expand-md navbar-white bg-white py-2">
                    <button class="navbar-toggler btn btn-sm px-3 font-size-16 header-item waves-effect h-auto text-primary" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="mdi mdi-menu"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                      <div class="navbar-nav">
                        {/* <a class="nav-item nav-link" >User's Profile<span class="sr-only">(current)</span></a> */}

                        <a
                          onClick={() => setActiveLink(1)}
                          class={
                            activeLink === 1
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          User's Profile

                        </a>



                        <a
                          onClick={() => setActiveLink(2)}
                          class={
                            activeLink === 2
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Communication
                        </a>
                        <a
                          onClick={() => setActiveLink(3)}
                          class={
                            activeLink === 3
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Invoices
                        </a>
                        <a
                          onClick={() => setActiveLink(4)}
                          class={
                            activeLink === 4
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Statements
                        </a>
                        {/* <a class="nav-item nav-link" >All Logs</a> */}

                      </div>

                    </div>
                  </nav>
                </div>
              </div>

            </div>
          </div>

          {activeLink === 1 && (
            <div class="row">
              <div class="col-xl-4">
                <div class="card calc-h-3px">
                  <div class="card-body pb-5">

                    <div>
                      <div class="mb-4 me-3">
                        <i class="mdi mdi-account-circle text-primary h1"></i>
                      </div>
                      <div>
                        <h5>                           {adminlistData.user && adminlistData.user.firstName} {adminlistData.user && adminlistData.user.lastName}
                          {/* <span class="badge badge-pill badge-soft-success font-size-11">Active</span> */}

                          {adminlistData.user && adminlistData.user.active ? (
                            <span class="badge-soft-success badge">
                              Active
                            </span>
                          ) : (
                            <span class="badge-soft-danger badge">
                              Inactive
                            </span>
                          )}
                        </h5>
                        <p class="text-muted mb-0">
                          <span> {adminlistData.user && adminlistData.user.role.name}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card-body border-top">
                    <p class="text-muted mb-0 d-flex align-items-center">
                      <a href="tel:0704549859" class="d-flex align-items-center"><i class="mdi mdi-phone me-2 font-size-18"></i> {adminlistData.user && adminlistData.user.phoneNumber}</a> <span class="px-3 px-3">|</span>
                      <a class="d-flex align-items-center" href="mailto:email@email.com"><i class="mdi mdi-email-outline font-size-18 me-2"></i>  {adminlistData.user && adminlistData.user.email}</a>
                    </p>
                  </div>
                  <div class="card-body border-top">
                    <p class="p-0 m-0"><span class="text-muted"> {adminlistData.user && adminlistData.user.status}</span> <span class="text-success">Online</span></p>

                  </div>

                  <div class="card-body border-top pb-2 pt-3">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="text-muted">
                          <table class="table table-borderless mb-3 table-sm table-striped">
                            <tbody>
                              <tr>
                                <td class="pl-0 pb-0 text-muted"><i class="mdi mdi-circle-medium align-middle text-primary me-1"></i>Last edited</td>
                                <td class="pb-0"><span class="text-black">{moment(adminlistData.user && adminlistData.user.lastModifiedDate).format("DD/MM/YYYY")}</span></td>
                              </tr>
                              <tr>
                                <td class="pl-0 pb-0 text-muted"><i class="mdi mdi-circle-medium align-middle text-primary me-1"></i>Last edited by</td>
                                <td class="pb-0"><span class="text-black">{adminlistData.user && adminlistData.user.lastModifiedBy}</span></td>
                              </tr>
                              <tr>
                                <td class="pl-0 pb-0 text-muted"><i class="mdi mdi-circle-medium align-middle text-primary me-1"></i>Date registered</td>
                                <td class="pb-0"><span class="text-black">{moment(adminlistData.user && adminlistData.user.dateTimeCreated).format("DD/MM/YYYY")}</span></td>
                              </tr>
                              <tr>
                                <td class="pl-0 pb-0 text-muted"><i class="mdi mdi-circle-medium align-middle text-primary me-1"></i>Registered By</td>
                                <td class="pb-0"><span class="text-black">{adminlistData.user && adminlistData.user.createdBy}</span></td>
                              </tr>

                              <tr class="bg-white d-none">
                                <td colspan="2" class="pl-0 pb-0 text-muted bg-white">
                                  <hr />
                                </td>
                              </tr>
                              <tr>
                                <td class="pl-0 pb-0 text-muted"><i class="mdi mdi-circle-medium align-middle text-primary me-1"></i>Gender</td>
                                <td class="pb-0"><span class="text-black">Male</span></td>
                              </tr>

                              <tr>
                                <td class="pl-0 pb-0 text-muted"><i class="mdi mdi-circle-medium align-middle text-primary me-1"></i>Company Role</td>
                                <td class="pb-0"><span class="text-black">{adminlistData.user && adminlistData.user.role.name}</span></td>
                              </tr>



                            </tbody>
                          </table>

                        </div>
                      </div>
                      <br /><br />

                    </div>
                  </div>


                </div>
              </div>





              <div class="col-xl-8">
                <div class="card">
                  <div>
                    <div class="row">
                      <div class="col-12">
                        <div class="p-4">
                          <h5 class="">Recent Logs</h5>
                          <span class="d-none">last logged in 20 Min Ago</span>
                          <div class="row">
                            <div class="col-12">
                              <table class="table align-middle table-nowrap table-hover dt-responsive contacts-table" id="datatable-buttons">
                                <thead class="table-light">
                                  <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Details</th>

                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td><span class="fw-semibold">3 Jan 2023 2023 06:45 AM</span></td>
                                    <td>Wrote 203 SMSs messages for 25 Contacts</td>
                                  </tr>

                                  <tr>
                                    <td><span class="fw-semibold">3 Jan 2023 03:23 AM</span></td>
                                    <td>Logged into the system</td>
                                  </tr>
                                  <tr>
                                    <td><span class="fw-semibold">3 Jan 2023 03:23 AM</span></td>
                                    <td>Moved 33 contacts to the trash</td>
                                  </tr>

                                  <tr>
                                    <td><span class="fw-semibold">3 Jan 2023 03:23 AM</span></td>
                                    <td>Moved 33 contacts to the trash</td>
                                  </tr>

                                  <tr>
                                    <td><span class="fw-semibold">3 Jan 2023 03:23 AM</span></td>
                                    <td>Moved 33 contacts to the trash</td>
                                  </tr>

                                  <tr>
                                    <td><span class="fw-semibold">3 Jan 2023 03:23 AM</span></td>
                                    <td>Moved 33 contacts to the trash</td>
                                  </tr>

                                </tbody>
                              </table>
                            </div>
                          </div>


                        </div>
                      </div>

                    </div>
                  </div>
                </div>


              </div>
              {/* <!-- end col --> */}



            </div>

          )}

          {activeLink === 2 && (
            <div>



              <div class="container-fluid">

                {/* <!-- start page title --> */}
                <div class="row">
                  <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                      <h4 class="mb-sm-0 font-size-18">All Messages</h4>


                    </div>
                  </div>
                </div>
                {/* <!-- end page title --> */}

                <div class="row">
                  <div class="col-12">

                    {/* <!-- Right Sidebar --> */}
                    <div class="mb-3">

                      <div class="card">
                        <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                          <div class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100" role="toolbar">

                            <div class="d-flex align-items-center flex-grow-1">




                            </div>



                          </div>
                        </div>
                        <div class="card-body the-inbox">
                          <table id="emailDataTable-btns" class="table   nowrap w-100 table-hover mt-0 mb-0">
                            <thead>
                              <tr class="d-none">
                                <th>Mode</th>
                                <th>
                                  {/* <!-- this is where the index is stored --> */}
                                </th>
                                <th>Status</th>
                                <th>Name</th>
                                <th>Message Content</th>
                                <th>Date</th>

                              </tr>
                            </thead>

                            <tbody class="table-hover">
                              {communication?.map((com, index) => {

                                let message = JSON.parse(com.data)

                                return (
                                  <tr key={com.id} onClick={() => setMessageData(communication[index])} class="text-nowrap" data-toggle="modal" data-target="#messageDetails">

                                    <td>{index + 1}</td>
                                    {/* <tr class="text-nowrap" data-toggle="modal" data-target="#messageDetails"> */}
                                    <td class="">
                                      {/* <!-- put the index here --> */}

                                      <div class="flex-shrink-0 align-self-center m-0 p-0 d-flex d-md-none">
                                        <div class="avatar-xs m-0">
                                          <span class="avatar-title rounded-circle bg-success bg-orange text-white">
                                            AW
                                          </span>
                                        </div>

                                      </div>


                                      <span class=" font-size-18 d-none d-md-flex">
                                        {com.communicationType !== "EMAIL" ? <i class="mdi mdi-chat-outline text-info pr-2"><span class="d-none">Email</span></i> :
                                          <i class="mdi mdi-email-check-outline text-info pr-2"><span class="d-none">Sms</span></i>}

                                      </span>
                                      <span class=" font-size-18 d-flex d-md-none">
                                        <br />
                                        <i class="mdi mdi-chat-outline text-info pr-2"><span class="d-none">{com.communicationType}</span></i>
                                        {/* <i class="mdi mdi-email-check-outline text-info pr-2"><span class="d-none">email</span></i> */}

                                      </span>



                                    </td>

                                    <td class="d-none"><span class="d-none">0</span></td>

                                    <td class="text-capitalize d-none d-md-table-cell">{com.createdBy}</td>

                                    <td class="the-msg the-msg-2">
                                      <span>{message?.model?.message}</span>

                                    </td>
                                    <td class="text-capitalize d-none d-md-table-cell">{moment(com.dateTimeCreated).format("ddd MMM DD")}</td>
                                  </tr>
                                )
                              }
                              )}

                            </tbody>

                          </table>

                        </div>


                      </div>



                    </div>
                    {/* <!-- end Col-9 --> */}

                  </div>

                </div>
                {/* <!-- End row --> */}

              </div>
              {/* <!-- container-fluid --> */}


              {/* <!-- message details modal --> */}
              <div class="modal fade" id="messageDetails" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content border-radius-0">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenterTitle">Email Details</h5>
                      <span class="close font-28 cursor-pointer" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </span>
                    </div>

                    {messageData.communicationType === "EMAIL" &&
                      <div class="modal-body">
                        <div class="row">
                          <div class="col-12">
                            <div >
                              <div>
                                <div class="flex-grow-1  d-flex justify-content-between  mb-1 chat-user-box">
                                  <p class="user-title m-0 text-capitalize"> <strong>Created by: </strong>{messageData?.createdBy}</p>
                                  <p class="text-muted  pb-0"> <strong><i class="mdi mdi-email me-1" ></i> </strong>{messageData?.contact + " "}</p>
                                </div>
                              </div>

                              <div>
                                <div class="flex-grow-1  d-flex justify-content-between mb-3 chat-user-box">
                                  <p class="user-title m-0 text-capitalize text-muted"><strong>from: </strong> {modalMessage?.from}</p>
                                  <p class="text-muted  pb-0"> <strong>To: </strong>{modalMessage?.to}</p>
                                </div>
                              </div>
                            </div>
                            <div class="flex-grow-1">
                              {/* <h5 class="font-size-14">Subject :</h5> */}
                              <p class="text-mute my-2 p-0 font-12px text-uppercase">{modalMessage?.subject} </p>
                              {/* <h5 class="font-size-14 my-2">Message :</h5> */}
                              <p class="text-muted m-0 p-0 font-12px">{modalMessage?.model?.message} </p>

                              <p class="text-muted mt-3"><strong>Signature :</strong> {modalMessage?.model?.signature}</p>
                              <p class="text-muted mt-0"><strong>Name :</strong> {modalMessage?.model?.name}</p>
                              <p class="text-muted mt-2"><strong>Created on :</strong> {moment(messageData?.dateTimeCreated).format("dddd MMM DD YYYY")}</p>
                            </div>
                          </div>
                        </div>

                      </div>
                    }

                    {messageData.communicationType !== "EMAIL" &&
                      <div class="modal-body">
                        <div class="row">
                          <div class="col-12">
                            <div >
                              <div>
                                <div class="flex-grow-1  d-flex align-items-center justify-content-between mb-3 chat-user-box">
                                  <p class="user-title m-0 text-capitalize">{messageData?.createdBy}</p>
                                  <p class="text-muted mt-1 pb-0"> <i class="mdi mdi-phone me-1"></i> {messageData?.contact}</p>
                                </div>
                              </div>
                            </div>
                            <div class="flex-grow-1">
                              <h5 class="font-size-14">Message</h5>
                              <p class="text-muted m-0 p-0 font-12px">{modalMessage} </p>
                              <p class="text-muted mt-3"> {moment(messageData.dateTimeCreated).format("dddd MMM DD YYYY")}</p>
                            </div>
                          </div>
                        </div>

                      </div>
                    }

                  </div>
                </div>
              </div>




            </div>


          )
          }

          {activeLink === 3 && (
            <>

              <div className="">
                <div className="container-fluid">
                  <Message details={details} mode={mode} clear={clear2} />
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                          <div
                            className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                            role="toolbar"
                          >
                            <h4 className="card-title text-capitalize mb-0 ">
                              All rent and Bills invoices
                            </h4>

                            <div className="d-flex justify-content-end align-items-center align-items-center pr-3">
                              <div>
                                <form className="app-search d-none d-lg-block p-2">
                                  <div className="position-relative">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Search..."
                                      onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <span className="bx bx-search-alt"></span>
                                  </div>
                                </form>
                              </div>
                              <div
                                className="input-group d-flex justify-content-end align-items-center"
                                id="datepicker1"
                              >
                                <div
                                  style={{
                                    backgroundColor: "#fff",
                                    color: "#2C2F33",
                                    cursor: " pointer",
                                    padding: "7px 10px",
                                    border: "2px solid #ccc",
                                    width: " 100%",
                                  }}
                                >
                                  <DatePickRange
                                    onCallback={handleCallback}
                                    startDate={moment(startDate3).format(
                                      "YYYY-MM-DD"
                                    )}
                                    endDate={moment(endDate3).format("YYYY-MM-DD")}
                                  />
                                </div>
                              </div>
                              <button className="btn btn-primary" onClick={sort2}>
                                filter
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table
                              className="table align-middle table-hover  contacts-table table-striped "

                            >
                              <thead className="table-light">
                                <tr className="table-light">
                                  <th>Invoice No</th>
                                  <th>Bill Ref</th>
                                  <th>Tenant</th>
                                  <th>Properties</th>
                                  <th>Hse/Unit</th>
                                  <th>Charge Name</th>
                                  <th>Bill Amount</th>
                                  <th>Paid Amount</th>
                                  <th>Total Balance</th>
                                  <th>Due Date</th>
                                  <th>Payment Status</th>
                                  <th>Date Created</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoices.length > 0 &&
                                  invoices?.map((invoice, index) => (
                                    <tr data-id={index} key={index}>
                                      <td>{invoice.transactionItemId}</td>
                                      <td>{invoice.billerBillNo}</td>
                                      <td>{invoice.transaction?.tenantName}</td>
                                      <td>{invoice.transaction.premiseName}</td>
                                      <td>{invoice.transaction.premiseUnitName}</td>
                                      <td>{invoice.applicableChargeName}</td>
                                      <td>
                                        {formatCurrency.format(invoice.billAmount)}
                                      </td>
                                      <td>
                                        {formatCurrency.format(invoice.billPaidAmount)}
                                      </td>
                                      <td className={"text-right"}>
                                        <span
                                          className={
                                            invoice.billPaidAmount > invoice.billAmount
                                              ? "fw-semibold text-success"
                                              : "fw-semibold text-danger"
                                          }
                                        >
                                          {formatCurrency.format(
                                            invoice.billAmount - invoice.billPaidAmount
                                          )}
                                        </span>
                                      </td>
                                      <td>
                                        {moment(invoice?.invoiceDate).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </td>
                                      <td>
                                        <StatusBadge type={invoice?.paymentStatus} />
                                      </td>
                                      <td>
                                        {moment(invoice.dateTimeCreated).format(
                                          "YYYY-MM-DD HH:mm"
                                        )}
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
                                            <div className="dropdown-menu dropdown-menu-end ">
                                              <a
                                                className="dropdown-item cursor-pointer"
                                                onClick={() => {
                                                  getOneInvoice(
                                                    invoice.transactionItemId
                                                  );
                                                }}
                                              >
                                                <i className="font-size-15 mdi mdi-eye me-3 "></i>
                                                View
                                              </a>
                                              <a
                                                className="dropdown-item cursor-pointer"
                                                onClick={() => {
                                                  handleModeChange("Email");
                                                  handleClicked(invoice, "Email");
                                                }}
                                              >
                                                <i className="font-size-15 mdi mdi-email me-3 "></i>
                                                Email Tenant
                                              </a>
                                              <a
                                                className="dropdown-item cursor-pointer"
                                                onClick={() => {
                                                  handleModeChange("SMS");
                                                  handleClicked(invoice, "SMS");
                                                }}
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

                            </table>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            {pageCount3 !== 0 && (
                              <>
                                <select
                                  className="btn btn-md btn-primary"
                                  title="Select A range"
                                  onChange={(e) => sortSize2(e)}
                                  value={size3}
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
                                    pageCount={pageCount3}
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
                                    onPageChange={(data) => handlePageClick3(data)}
                                    forcePage={page3}
                                  />
                                </nav>
                              </>
                            )}
                          </div>
                          {pageCount3 !== 0 && (
                            <p className="font-medium  text-muted">
                              showing page{" "}
                              <span className="text-primary">
                                {setPageCount3 === 0 ? page3 : page3 + 1}
                              </span>{" "}
                              of<span className="text-primary"> {pageCount3}</span> pages
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*VIEW INVOICE*/}
              <ViewInvoice show={invoice_show} closeInvoice={closeInvoice} activeInvoice={activeInvoice} />

            </>
          )}

          {activeLink === 4 && (
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
                          landlord Statements
                        </h4>
                        <div className="d-flex justify-content-end align-items-center align-items-center pr-3">

                          <div
                            className="input-group d-flex justify-content-end align-items-center"
                            id="datepicker1"
                          >
                            <div
                              style={{
                                backgroundColor: "#fff",
                                color: "#2C2F33",
                                cursor: " pointer",
                                padding: "7px 10px",
                                border: "2px solid #ccc",
                                width: " 100%",
                              }}
                            >
                              <DatePickRange
                                onCallback={handleCallback2}
                                startDate={moment(statementdate.startDate).format(
                                  "YYYY-MM-DD"
                                )}
                                endDate={moment(statementdate.endDate).format("YYYY-MM-DD")}
                              />
                            </div>
                          </div>
                          <button className="btn btn-primary" onClick={getLanlordStatements}>
                            filter
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive overflow-visible">
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
                              <th>Bill No</th>
                              <th>Receipt Amount</th>
                              <th>Pay Reference No</th>
                              <th>Payment Mode</th>
                              <th>Paid By</th>
                              <th>Tenant Name</th>
                              <th>Utilized Amount</th>
                              <th>Date Created</th>
                              <th className="text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentStatements?.length > 0 &&
                              currentStatements?.map((statement, index) => (
                                <tr data-id={index} key={index}>
                                  <td>
                                    {
                                      JSON.parse(statement.response).billNo

                                    }
                                  </td>
                                  <td>
                                    {formatCurrency.format(statement.receiptAmount)}
                                  </td>
                                  <td>{statement.payReferenceNo}</td>
                                  <td>{statement.paymentMode}</td>
                                  <td>{statement.paidBy}</td>
                                  <td>
                                    {statement?.tenant?.tenantType ===
                                      "INDIVIDUAL" ? (
                                      <>
                                        {statement?.tenant?.firstName}{" "}
                                        {statement?.tenant?.lastName}
                                      </>
                                    ) : (
                                      <>{statement?.tenant?.companyName}</>
                                    )}
                                  </td>
                                  <td>
                                    {formatCurrency.format(
                                      statement.utilisedAmount
                                    )}
                                  </td>
                                  <td>
                                    {moment(statement.dateTimeCreated).format(
                                      "YYYY-MM-DD HH:mm"
                                    )}
                                  </td>

                                  <td>
                                    <div className="d-flex justify-content-end">
                                      <div className="dropdown">
                                        <a
                                          className="text-muted font-size-16 cursor-pinter"
                                          role="button"
                                          data-bs-toggle="dropdown"
                                          aria-haspopup="true"
                                        >
                                          <i className="bx bx-dots-vertical-rounded"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end ">
                                          <span
                                            className="dropdown-item cursor-pinter"
                                            onClick={() =>
                                              getOneStatement(statement.id)
                                            }
                                          >
                                            <i className="font-size-15 mdi mdi-eye me-3 "></i>
                                            View
                                          </span>
                                          {statement.utilisedAmount <
                                            statement.receiptAmount && (
                                              <a
                                                className="dropdown-item  cursor-pointer"
                                                onClick={() => {
                                                  handleShow();
                                                  setUtilizeValues(
                                                    statement?.id,
                                                    statement?.tenant?.id
                                                  );
                                                }}
                                              >
                                                <i className="font-size-15 mdi mdi-account-check me-3 "></i>
                                                Utilize
                                              </a>
                                            )}
                                        </div>
                                      </div>
                                    </div>
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
                                {currentStatements && currentStatements?.length}{" "}
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
                          {statpageCount !== 0 && (
                            <>
                              <select
                                className="btn btn-md btn-primary"
                                title="Select A range"
                                onChange={(e) => statsortSize(e)}
                                value={statsize}
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
                                  pageCount={statpageCount}
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
                                  onPageChange={(data) => handleStatPageClick(data)}
                                />
                              </nav>
                            </>
                          )}
                        </div>
                        {statpageCount !== 0 && (
                          <p className="font-medium  text-muted">
                            showing page{" "}
                            <span className="text-primary">
                              {statpageCount === 0 ? statpage : statpage + 1}
                            </span>{" "}
                            of
                            <span className="text-primary"> {statpageCount}</span> pages
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*VIEW INVOICE*/}
              <Modal show={invoice_show2} onHide={closeInvoice2} size="lg" centered>
                <Modal.Header closeButton>
                  <h5 className="modal-title" id="myLargeModalLabel">
                    Statement Details
                  </h5>
                </Modal.Header>
                <Modal.Body>
                  <div className="col-12">
                  </div>
                  <div className="col-12">
                    <div className="py-2 mt-3">
                      <h3 className="font-size-15 fw-bold">
                        Statement Details ({" "}
                        <span className="text-primary fw-medium">
                          {activeInvoice?.receiptNo}
                        </span>{" "}
                        )
                      </h3>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="table-responsive">
                      <table className="table table-nowrap">
                        <thead>
                          <tr>
                            <th>Bill No</th>
                            <th>Receipt Amount</th>
                            <th>Pay Reference No</th>
                            <th>Payment Mode</th>
                            <th>Paid By</th>
                            <th>Utilized Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{activeInvoice?.billNo}</td>
                            <td>
                              {formatCurrency.format(activeInvoice?.receiptAmount)}
                            </td>
                            <td>{activeInvoice?.payReferenceNo}</td>
                            <td>{activeInvoice?.paymentMode}</td>
                            <td>{activeInvoice?.paidBy}</td>
                            <td>
                              {formatCurrency.format(activeInvoice?.utilisedAmount)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
              {/* LOOK FOR BILL */}

              <Modal show={show} onHide={handleClose} size="md" centered>
                <Modal.Header closeButton>
                  <h5 className="modal-title" id="myLargeModalLabel">
                    Search for Bill to utilize
                  </h5>
                </Modal.Header>
                <form onSubmit={(e) => searchBillNo(e)}>
                  <Modal.Body>
                    <div className="form-group  justify-content-center d-flex flex-column">
                      <label htmlFor="">BILL NO</label>
                      <input
                        type="text"
                        className="form-control"
                        value={utilData.newBillNo}
                        onChange={(e) =>
                          setUtilData({ ...utilData, newBillNo: e.target.value })
                        }
                        placeholder="Enter Bill No "
                        required
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div>
                      <button className="btn btn-sm btn-primary" type="submit">
                        Search
                      </button>
                    </div>
                  </Modal.Footer>
                </form>
              </Modal>
            </>
          )

          }

        </div>
      </div>

      <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <script>
                document.write(new Date().getFullYear())
              </script> © RevenueSure.
            </div>
            <div class="col-sm-6">
              <div class="text-sm-end d-sm-block">
                Developed by Nouveta LTD.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default UserDetails