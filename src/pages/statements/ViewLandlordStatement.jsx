/* global $ */
import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import StatusBadge from "../../components/StatusBadge";


function ViewLandlordStatement() {
    const [activeLink, setActiveLink] = useState(2);
    const [statement, setStatement] = useState([]);
    const [landlordAccounts, setLandlordAccounts] = useState([])
    const [landlordId, setLandlordId] = useState()
    const [error, setError] = useState({
        message: "",
        color: ""
    });
    const { id } = useParams()

    const formatCurrency = (x) => {
        let formatCurrency = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "KES",
        });
        return formatCurrency.format(x);
    };

    useEffect(() => {
        getOneStateMent();
    }, [])


    const getOneStateMent = () => {
        requestsServiceService.getOneSettlement(id).then((res) => {
            setStatement(res.data.data)
            setLandlordId(res.data.data.clientSettlement.landLord.id)
            requestsServiceService.getLandLordByFileNumber(res.data.data.clientSettlement.landLord.fileNumber).then((res) => {
                setLandlordAccounts(res.data.data.accounts)
            })
        })
    }

    const [settlement_show, setsettlementshow] = useState(false);
    const showSettlement = () => setsettlementshow(true);
    const hideSettlement = () => setsettlementshow(false);

    const [payoutData, setPayoutData] = useState({
        amount: '',
        payoutAccountNumber: '',
        payoutMethod: '',
        payoutReference: '',
    })

    const handleChange = (e) => {
        setPayoutData({
            ...payoutData, [e.target.name]: e.target.value
        })
    }

    const createPayout = (e) => {
        e.preventDefault();

        let data = JSON.stringify({
            "amount": payoutData.amount,
            "done": true,
            "payoutAccountNumber": payoutData.payoutAccountNumber,
            "payoutMethod": payoutData.payoutMethod,
            "payoutReference": payoutData.payoutReference,
            "reference": null,
            "settlementReference": id
        })

        requestsServiceService.createSettlementPayouts(data).then((res) => {
            getOneStateMent()
            setError({
                ...error,
                message: res.data?.message,
                color: "success"
            })

            setTimeout(() => {
                hideSettlement()
                clear()
            }, 1500)
        })

    }

    const clear = () => {
        setError({
            ...error,
            message: "",
            color: ""
        });
    }


    return (
        <div className="page-content">
            <div className="content-fluid">
                {/* page tittle  */}
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0 font-size-18"></h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item">
                                        <a href="">Dashboards</a>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <a href="">LandLord Statements</a>
                                    </li>
                                    <li class="breadcrumb-item active">Statement</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                {/* statisticsc */}
                <div class="row">
                    <div class="col-lg-12 px-sm-30px">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-10">
                                        <div class="d-flex">
                                            <div class="flex-grow-1 align-self-center">
                                                <div class="text-muted">
                                                    <h5 class="mb-3"> Quick Overview on {statement?.clientSettlement?.reference}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12 align-self-center">
                                        <div class="row">
                                            <div class="col-10">
                                                <div class="text-lg-left mt-4 mt-lg-0">
                                                    <div class="row">
                                                        <div class="col-sm-4 col-md-2 mx-3  text-capitalize text-nowrap">
                                                            <div>
                                                                <div class="avatar-xs-2 mb-3">
                                                                    <span class="avatar-title bg-info rounded-circle font-size-24">
                                                                        <i class="mdi mdi-account-group text-white"></i>
                                                                    </span>
                                                                </div>
                                                                <p class="text-muted  mb-2">Client Commission</p>
                                                                <h5 class="mb-0"> {formatCurrency(statement?.clientSettlement?.clientCommission)}</h5>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3 col-md-2   mx-3 text-capitalize text-nowrap">
                                                            <div>
                                                                <div class="avatar-xs-2 mb-3">
                                                                    <span class="avatar-title rounded-circle bg-danger font-size-24">
                                                                        <i class="mdi mdi-account-cash text-white"></i>
                                                                    </span>
                                                                </div>
                                                                <p class="text-muted  mb-2">Commission Rate</p>
                                                                <h5 class="mb-0"> {statement?.clientSettlement?.clientCommissionRate} % </h5>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3 col-md-2  mx-3 text-capitalize text-nowrap ">
                                                            <div>
                                                                <div class="avatar-xs-2 mb-3">
                                                                    <span class="avatar-title rounded-circle bg-primary font-size-24">
                                                                        <i class="mdi mdi-account-cash text-white"></i>
                                                                    </span>
                                                                </div>
                                                                <p class="text-muted  mb-2">Period Alias</p>
                                                                <h5 class="mb-0"> {statement?.clientSettlement?.periodAlias} </h5>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3 col-md-2  mx-2 text-capitalize text-nowrap">
                                                            <div>
                                                                <div class="avatar-xs-2 mb-3">
                                                                    <span class="avatar-title rounded-circle bg-danger font-size-24">
                                                                        <i class="mdi mdi-account-cash text-white"></i>
                                                                    </span>
                                                                </div>
                                                                <p class="text-muted  mb-2">Total Debit Notes</p>
                                                                <h5 class="mb-0 text-nowrap"> {formatCurrency(statement?.clientSettlement?.totalDebitNotes)}  </h5>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3 col-md-2 text-capitalize text-nowrap">
                                                            <div>
                                                                <div class="avatar-xs-2 mb-3">
                                                                    <span class="avatar-title rounded-circle bg-primary font-size-24">
                                                                        <i class="mdi mdi-account-cash text-white"></i>
                                                                    </span>
                                                                </div>
                                                                <p class="text-muted  mb-2">Amount Paid Out</p>
                                                                <h5 class="mb-0 text-nowrap"> {formatCurrency(statement?.clientSettlement?.amountPaidOut)}  </h5>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/* <!-- end row --> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* toolbar  */}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body pt-2 pb-3">
                                <nav className="navbar navbar-expand-md navbar-white bg-white py-2">
                                    <button
                                        className="navbar-toggler btn btn-sm px-3 font-size-16 header-item waves-effect h-auto text-primary"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#navbarNavAltMarkup"
                                        aria-controls="navbarNavAltMarkup"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="mdi mdi-menu" />
                                    </button>
                                    <div
                                        className="collapse navbar-collapse justify-content-between"
                                        id="navbarNavAltMarkup"
                                    >
                                        <div className="navbar-nav">

                                            <a
                                                onClick={() => setActiveLink(2)}
                                                className={
                                                    activeLink === 2
                                                        ? "nav-item nav-link active cursor-pointer"
                                                        : "nav-item cursor-pointer nav-link"
                                                }
                                            >
                                                Payouts Done
                                            </a>
                                            <a
                                                onClick={() => setActiveLink(3)}
                                                className={
                                                    activeLink === 3
                                                        ? "nav-item nav-link active cursor-pointer"
                                                        : "nav-item cursor-pointer nav-link"
                                                }
                                            >
                                                Invoices Raised
                                            </a>
                                            <a
                                                onClick={() => setActiveLink(4)}
                                                className={
                                                    activeLink === 4
                                                        ? "nav-item nav-link active cursor-pointer"
                                                        : "nav-item cursor-pointer nav-link"
                                                }
                                            >
                                                Debit Notes Raised
                                            </a>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                {/* active link start  */}


                {activeLink === 2 && (
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
                                                Payouts
                                            </h4>
                                            <div className="d-flex justify-content-end align-items-center">
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={() => showSettlement()}
                                                        className="btn btn-primary dropdown-toggle option-selector"
                                                    >
                                                        <i class="mdi mdi-account-edit font-size-16 align-middle me-2"></i>
                                                        New Payout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div class="table-responsive table-responsive-md">
                                            <table class="table">
                                                <thead class="table-light">
                                                    <tr className="table-light text-uppercase">
                                                        <th className="text-nowrap">reference Id</th>
                                                        <th className="text-nowrap">Payout Method</th>
                                                        <th className="text-nowrap">Account Number</th>
                                                        <th className="text-nowrap">Mpesa Reference</th>
                                                        <th className="text-nowrap">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="table-striped">
                                                    {statement?.payouts?.map((invoice, index) => (
                                                        <tr data-id={index} key={index}>
                                                            <td className="text-nowrap">{invoice.reference}</td>
                                                            <td className="text-capitalize">{invoice.payoutMethod?.toLowerCase()?.replace(/_/g, " ")}</td>
                                                            <td>{invoice.payoutAccountNumber}</td>
                                                            <td>{invoice.payoutReference}</td>
                                                            <td>
                                                                {formatCurrency(invoice.amount)}
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <Modal show={settlement_show} onHide={hideSettlement} size="md" centered>
                            {error.color !== "" &&
                                <div className={"alert alert-" + error.color} role="alert">
                                    {error.message}
                                </div>
                            }
                            <Modal.Header closeButton>
                                <h5 className="modal-title" id="myLargeModalLabel">
                                    Create New Payout
                                </h5>
                            </Modal.Header>
                            <form onSubmit={(e) => createPayout(e)}>
                                <Modal.Body>
                                    <div className="form-group  justify-content-center d-flex flex-column">
                                        <label htmlFor=""> Payment Method</label>
                                        <select className="form-control" name="payoutMethod" onChange={(e) => handleChange(e)} >
                                            <option value=""></option>
                                            <option value="MPESA">Mpesa</option>
                                            <option value="BANK">Bank</option>
                                        </select>
                                    </div>

                                    {payoutData.payoutMethod === "MPESA" && <div className="form-group">
                                        <label htmlFor="">Payout Reference</label>
                                        <input type="text" className="form-control" name='payoutReference' onChange={(e) => handleChange(e)} />
                                    </div>}

                                    {payoutData.payoutMethod === "BANK" && <div className="form-group  justify-content-center d-flex flex-column">
                                        <label htmlFor="">Account Number</label>

                                        {landlordAccounts?.length >= 1 && <select className="form-control" name="payoutAccountNumber" onChange={(e) => handleChange(e)}>
                                            <option value=""></option>
                                            {landlordAccounts?.map((unit) => (
                                                <option value={unit.bankAccountNumber}> {unit.bank?.bankName === "NCBA" ? "National Bank of Kenya" : unit.bank?.bankName?.toLowerCase()?.replace(/_/g, " ")} - {unit.bankAccountNumber} </option>
                                            ))}
                                            {/* <option value="MPESA">Mpesa</option> */}
                                        </select>}
                                        {landlordAccounts?.length === 0 && <input type="text" className="form-control" name="payoutAccountNumber" onChange={(e) => handleChange(e)} />}
                                    </div>}

                                    <div className="form-group">
                                        <label htmlFor="">Amount</label>
                                        <input type="text" className="form-control" name="amount" onChange={(e) => handleChange(e)} />
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div>
                                        <button className="btn btn-sm btn-primary" type="submit">
                                            Create
                                        </button>
                                    </div>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </>
                )}

                {activeLink === 3 && (
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div class="table-responsive table-responsive-md">
                                        <table class="table">
                                            <thead class="table-light">
                                                <tr className="table-light text-uppercase">
                                                    <th className="text-nowrap">Invoice No</th>
                                                    <th className="text-nowrap">Bill Ref</th>
                                                    <th className="text-nowrap">Tenant</th>
                                                    <th className="text-nowrap">Properties</th>
                                                    <th className="text-nowrap">Hse/Unit</th>
                                                    <th className="text-nowrap">Charge Name</th>
                                                    <th className="text-nowrap">Bill Amount</th>
                                                    <th className="text-nowrap">Paid Amount</th>
                                                    <th className="text-nowrap">Total Balance</th>
                                                    <th className="text-nowrap">Due Date</th>
                                                    <th className="text-nowrap">Payment Status</th>
                                                    <th className="text-nowrap">Date Created</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-striped">
                                                {statement?.transactions?.map((invoice, index) => (
                                                    <tr data-id={index} key={index}>
                                                        <td className="text-nowrap">{invoice.transactionItemId}</td>
                                                        <td>{invoice.billerBillNo}</td>
                                                        <td>{invoice.transaction?.tenantName}</td>
                                                        <td>{invoice.transaction.premiseName}</td>
                                                        <td>{invoice.transaction.premiseUnitName}</td>
                                                        <td>{invoice.applicableChargeName}</td>
                                                        <td>
                                                            {formatCurrency(invoice.billAmount)}
                                                        </td>
                                                        <td>
                                                            {formatCurrency(invoice.billPaidAmount)}
                                                        </td>
                                                        <td className={"text-right"}>
                                                            <span
                                                                className={
                                                                    invoice.billPaidAmount > invoice.billAmount
                                                                        ? "fw-semibold text-success"
                                                                        : "fw-semibold text-danger"
                                                                }
                                                            >
                                                                {formatCurrency(
                                                                    invoice.billAmount - invoice.billPaidAmount
                                                                )}
                                                            </span>
                                                        </td>
                                                        <td className="text-nowrap">
                                                            {moment(invoice?.invoiceDate).format(
                                                                "DD-MM-YYYY"
                                                            )}
                                                        </td>
                                                        <td>
                                                            <StatusBadge type={invoice?.paymentStatus} />
                                                        </td>
                                                        <td className="text-nowrap">
                                                            {moment(invoice.dateTimeCreated).format(
                                                                "YYYY-MM-DD HH:mm"
                                                            )}
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeLink === 4 && (
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div class="table-responsive table-responsive-md">
                                        <table class="table">
                                            <thead class="table-light">
                                                <tr class="text-uppercase">
                                                    <th>#</th>
                                                    <th>Note Ref</th>
                                                    <th>Type</th>
                                                    <th>For</th>
                                                    <th>Created on</th>
                                                    <th>Reason</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-striped">
                                                {statement?.debitNotes?.map((list, index) => (
                                                    <tr key={list.id}>
                                                        <td className=""> {index + 1}</td>
                                                        <td>
                                                            <p className="mb-0">{list.reference}</p>
                                                        </td>
                                                        <td>{list.noteType}</td>
                                                        <td>
                                                            <Link
                                                                to={"/landlord/" + list.landLord?.id}
                                                            >
                                                                {list.landLord?.landLordType ===
                                                                    "COMPANY"
                                                                    ? list.landLord?.companyName
                                                                    : list.landLord?.firstName +
                                                                    " " +
                                                                    list.landLord?.lastName}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {moment(list.dateTimeCreated).format(
                                                                "YYYY-MM-DD HH:mm"
                                                            )}
                                                        </td>
                                                        <td>
                                                            {list.reason.substring(0, 70) + "..."}
                                                        </td>
                                                        <td>{formatCurrency(list.amount)}</td>

                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ViewLandlordStatement