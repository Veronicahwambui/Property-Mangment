/* global $ */
import React, { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import StatusBadge from "../../components/StatusBadge";


function ViewLandlordStatement() {
    const [activeLink, setActiveLink] = useState(1);
    const [statement, setStatement] = useState([]);
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
        })
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
                                                onClick={() => setActiveLink(1)}
                                                className={
                                                    activeLink === 1
                                                        ? "nav-item nav-link active cursor-pointer"
                                                        : "nav-item cursor-pointer nav-link"
                                                }
                                            >
                                                Details
                                            </a>
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

                {activeLink === 1 && (
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div class="table-responsive table-responsive-md">
                                        <table class="table">
                                            <thead class="table-light">
                                                <tr class="text-uppercase">
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Client Type</th>
                                                    <th>URL</th>
                                                    <th>Created on</th>
                                                    <th class="text-right">Actions</th>
                                                </tr>
                                            </thead>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeLink === 2 && (
                    <div className="row"></div>
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
                                                    <th className="text-right">Actions</th>
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

                                                        <td> Actions </td>
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
                                                    <th>Actions</th>
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
                                                        <td>
                                                            Actions
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

            </div>
        </div>
    )
}

export default ViewLandlordStatement