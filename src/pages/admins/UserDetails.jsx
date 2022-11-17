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
import ViewMessage from '../../components/ViewMessage';
import Statement from '../../components/Statement';
import AllInvoices from "../../components/AllInvoices";


function UserDetails() {
  const [adminlistData, setAdminListData] = useState({});
  const [activeLink, setActiveLink] = useState(1);
  const [communication, setCommunication] = useState([])

  const [message, setMessage] = useState([]);

  const { id } = useParams();
  const userId = id;
  let clientId = AuthService.getClientId();

  const fetchAll = () => {
    requestsServiceService.viewOneUser(userId).then((res) => {
      setAdminListData(res.data.data);
      clientId = res.data.data.authAccount?.client?.id;
    });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    fetchCommunication();
  }, [adminlistData]);



  const fetchCommunication = () => {
    requestsServiceService.getEntityCommunication(userId, 0, 5, "USER", clientId).then((res) => {
      setCommunication(res.data.data)
    })

  }

  const [messageData, setMessageData] = useState({})
  const [showMessage, setShowMessage] = useState(false)
  const closeMessage = () => setShowMessage(false)

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


  // LOADER ANIMATION
  useEffect(() => {
    $("#spinner").removeClass("d-none");
    setTimeout(() => {
      $("#spinner").addClass("d-none");
    }, 1000);
  }, [])
  
  return (
    <div className=''>
      <div className=' page-content'>
        <div className='container-fluid'>

          {/* <!-- start page title --> */}
          <div class="row">
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
                                  <tr key={com.id} onClick={() => { setMessageData(communication[index]); setShowMessage(true) }} class="text-nowrap" data-toggle="modal" data-target="#messageDetails">
                                    <td>{index + 1}</td>
                                    {/* <tr class="text-nowrap" data-toggle="modal" data-target="#messageDetails"> */}
                                    <td class="">
                                      {/* <!-- put the index here --> */}
                                      <span class=" font-size-18 d-none d-md-flex">
                                        {com.communicationType !== "EMAIL" ? <i class="mdi mdi-chat-outline text-info pr-2"><span class="d-none">Email</span></i> :
                                          <i class="mdi mdi-email-check-outline text-info pr-2"><span class="d-none">Sms</span></i>}
                                      </span>
                                      <span class=" font-size-18 d-flex d-md-none">
                                        <br />
                                        <i class="mdi mdi-chat-outline text-info pr-2"><span class="d-none">{com.communicationType}</span></i>
                                      </span>
                                    </td>
                                    <td class="text-capitalize d-none d-md-table-cell">{com.createdBy}</td>
                                    {com.communicationType == "EMAIL" &&
                                      <td class="the-msg the-msg-2">
                                        <span>{message?.model?.message}</span>
                                      </td>}
                                    {com.communicationType == "SMS" &&
                                      <td class="the-msg the-msg-2 md-the-msg">
                                        <span>{message?.text}</span>
                                      </td>}
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
              <ViewMessage show={showMessage} messageData={messageData} closeMessage={closeMessage} />





            </div>


          )
          }

          {activeLink === 3 && (
          <AllInvoices id={userId }entityType={"USER"}/>
          )}

          {activeLink === 4 && (
          <Statement id={userId} entityType={"USER"} />
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