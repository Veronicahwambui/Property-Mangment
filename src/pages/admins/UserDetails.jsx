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

    // * ==============================
    // invoice stuff   
    // * ==============================
    const [invoices, setinvoices] = useState([]);
    const [activeInvoice] = useState({});
    const [size, setSize] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState(
        moment().startOf("month").format("YYYY-MM-DD")
    );
    const [endDate, setEndDate] = useState(
        moment(new Date()).add(3, "M").format("YYYY-MM-DD")
    );

    const [startDate2, setStartDate2] = useState(
        moment().startOf("month").format("YYYY-MM-DD")
    );
    const [endDate2, setEndDate2] = useState(
        moment(new Date()).add(3, "M").format("YYYY-MM-DD")
    );
    const [invoice_show, setinvoice_show] = useState(false);
    const showInvoice = () => setinvoice_show(true);
    const [transaction, settransaction] = useState({});
    const [paymentItems, setpaymentItems] = useState([]);
    useEffect(() => { }, [transaction]);
    useEffect(() => { }, [paymentItems]);
    const closeInvoice = () => {
        setpaymentItems([]);
        settransaction({});
        setinvoice_show(false);
    };
    const [searchTerm, setSearchTerm] = useState("");

    const [date, setDate] = useState({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date(),
    });

    const handleCallback = (sD, eD) => {
        setDate({
            ...date,
            startDate: moment(sD).format("YYYY-MM-DD"),
            endDate: moment(eD).format("YYYY-MM-DD"),
        });
    };


    useEffect(() => {
        getInvoices();
    }, [size, page, activeInvoice, transaction, paymentItems]);
    const sort = (event) => {
        event.preventDefault();
        let data = {
            startDate: startDate,
            endDate: endDate,
            // size: size,
            // page: page,
            userId: parseInt(clientId),
            search: searchTerm,
        };
        requestsServiceService.getSortedInvoices(page, size, data).then((res) => {
            setPageCount(res.data.totalPages);
            setinvoices(res.data.data);
        });
    };
    const sortSize = (e) => {
        setSize(e.target.value);
        setPage(0);
    };
    const getInvoices = () => {
        let data = {
            startDate: startDate2,
            endDate: endDate2,
            userId: parseInt(clientId),
            search: searchTerm.trim(),
        };
        requestsServiceService.getSortedInvoices(page, size, data).then((res) => {
            setPageCount(res.data.totalPages);
            setinvoices(res.data.data);
            setStatus('')
            window.scrollTo(0, 0);
        });
    };
    const handlePageClick = (data) => {
        console.log(data);
        let d = data.selected;
        setPage(d);
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
        setSize(100);
        setPage(1);
    };
    const getOneInvoice = (id) => {
        requestsServiceService.getParentInvoice(id).then((res) => {
            settransaction(res.data.data.transaction);
            setpaymentItems(res.data.data.transactionItems);
        });
        setTimeout(() => {
            showInvoice();
        }, 800);
    };
    let formatCurrency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
    });
    const addDate = (date) => {
        setStartDate(new Date(date.target.value));
    };
    const addDate2 = (date) => {
        setEndDate(new Date(date.target.value));
    };

    $(document).on("change", ".sdate", addDate);
    $(document).on("change", ".edate", addDate2);

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
                                                                    <tr data-id="1">
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
                                                                                <i class="mdi mdi-chat-outline text-info pr-2"><span class="d-none">Email</span></i>
                                                                                <i class="mdi mdi-email-check-outline text-info pr-2"><span class="d-none">Sms</span></i>

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
                                                                            <span>{message.text}</span>

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






                        </div>


                    )
                    }

                    {activeLink === 3 && (
                        <div className="">
                            <div className="container-fluid">

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
                                                                    startDate={moment(date.startDate).format(
                                                                        "YYYY-MM-DD"
                                                                    )}
                                                                    endDate={moment(date.endDate).format("YYYY-MM-DD")}
                                                                />
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-primary" onClick={sort}>
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
                                                                    </tr>
                                                                ))}
                                                        </tbody>

                                                    </table>
                                                </div>
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
                                                                    forcePage={page}
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
                                                        of<span className="text-primary"> {pageCount}</span> pages
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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