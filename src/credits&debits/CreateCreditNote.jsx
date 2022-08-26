import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CreateCreditNote() {

    const [creditNoteFor ,setCreditNoteFor ] = useState("Tenancy")
    const [debitToLandlord ,setDebitToLandlord ] = useState(false)

    return (
    <>
            <div class="page-content">
                <div class="container-fluid">

                    {/* <!-- start page title --> */}
                    <div class="row">
                        <div class="col-12">
                            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 class="mb-sm-0 font-size-18 text-capitalize">Credit Note</h4>

                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                        <li class="breadcrumb-item">Credit & Debit Notes </li>
                                        <li class="breadcrumb-item active">Create Credit note</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <!-- end page title --> */}

                    {/* <!-- eTransactions table --> */}

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card p-5">
                                <div class="card-body ">
                                    <div class="row d-flex align-items-center justify-content-center ">
                                        <div class="col-sm-12 col-md-7 col-lg-8">
                                            <div class="d-flex justify-items-center align-items-center">
                                                <div class="card-body border-1 invoice-form credit-form p-5">
                                                    <h4 class="card-title mb-4">Enter the details below</h4>

                                                    <form>
                                                        <div class="row">
                                                            <div class=" col-12 ">
                                                                <div class="mb-4 ">
                                                                    <label class="text-capitalize ">Whats this credit note for?</label>
                                                                    <div class="row ">
                                                                        <div class="col-auto ">
                                                                            <div class="form-check mb-3">
                                                                                <input class="form-check-input" value="tenant" type="radio" name="credit" checked={ creditNoteFor == "Tenancy"}  onChange={(e)=> setCreditNoteFor(e.target.value)}/>
                                                                                    <label class="form-check-label" for="landlord-credit">
                                                                                        Tenancy credit
                                                                                    </label>
                                                                            </div>
                                                                        </div>


                                                                        <div class="col-auto ">
                                                                            <div class="form-check mb-3">
                                                                                <input class="form-check-input" value="invoice" type="radio" name="credit" checked={ creditNoteFor == "Existing"}  onChange={(e)=> setCreditNoteFor(e.target.value)}/>
                                                                                    <label class="form-check-label" for="invoice-credit">
                                                                                        An Existing invoice
                                                                                    </label>
                                                                            </div>
                                                                        </div>


                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* <!-- landlord's credit note --> */}
                                                        <div class="row">
                                                            <div class="col-7">
                                                                <div class="mb-4 ">
                                                                    <label for="agreement-type">Select tenant's premises</label>
                                                                    <select class="form-control">
                                                                        <option value="">select</option>
                                                                    </select>
                                                                </div>
                                                            </div>


                                                            <div class="col-5 ">
                                                                <div class="mb-4 ">
                                                                    <label for="agreement-type">Hse/Unit No.</label>
                                                                    <select class="form-control ">
                                                                        <option value="">select</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-12">
                                                                <div class="alert alert-warning badge-soft-info the-tenant-is" role="alert">
                                                                    <i class="mdi mdi-alert-outline me-2 "></i> Tenant not selected
                                                                </div>
                                                            </div>

                                                                {/* debit amount to  */}
                                                            <div class=" col-12 ">
                                                                <div class="mb-1 ">
                                                                    <label class="text-capitalize ">Debit this amount to the landlord</label>
                                                                    <div class="row ">
                                                                        <div class="col-auto ">
                                                                            <div class="form-check mb-3">
                                                                                <input class="form-check-input" value="yes" type="radio" name="debit" checked={debitToLandlord} onChange={()=> setDebitToLandlord(true)}  />
                                                                                    <label class="form-check-label" for="debit-yes">
                                                                                        Yes
                                                                                    </label>
                                                                            </div>
                                                                        </div>

                                                                        <div class="col-auto ">
                                                                            <div class="form-check mb-3">
                                                                                <input class="form-check-input" value="no" type="radio" name="debit" checked={!debitToLandlord} onChange={()=> setDebitToLandlord(false)} />
                                                                                    <label class="form-check-label" for="debit-no">
                                                                                        No
                                                                                    </label>
                                                                            </div>
                                                                        </div>


                                                                    </div>


                                                                </div>
                                                            </div>


                                                            <div class="col-12 d-non debit-tenant-list d-none">
                                                                <div class="alert alert-info mb-3" role="alert">
                                                                    The Landlord to this premises is <a href="javascript: void(0);" class="alert-link">Kelvin Njuguna</a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* <!-- invoices credit note --> */}
                                                        <div class="row">
                                                            <div class="mb-4">
                                                                <label for="" class="form-label text-capitalize">Invoice Number</label>
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-12 ">
                                                                <div class="mb-4 ">
                                                                    <label for="agreement-type " class="text-capitalize">Reason for creating the credit Note</label>
                                                                    <textarea name=" " placeholder="Enter the reason" id="" cols="30" rows="3" class="form-control"></textarea>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <div class="mb-3">
                                                                    <label for="" class="form-label">Amount To Credit</label>
                                                                    <input type="number" class="form-control credit-amount" id="" placeholder="KES"/>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div class="col-12">

                                                            <div class="">
                                                                <button type="button" data-bs-toggle="modal" data-bs-target=".debit-tenant-modal" class="btn btn-success w-md">Next</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/* <!-- end card body --> */}
                            </div>
                            {/* <!-- end card --> */}
                        </div>
                        {/* <!-- end col --> */}
                    </div>

                    {/* <!-- end row --> */}
                </div>
                {/* <!-- container-fluid --> */}
            </div>
            {/* <!-- End Page-content --> */}

            {/* <!-- Debiting amount to the tenant --> */}
            <div class="modal fade debit-tenant-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-capitalize" id="myLargeModalLabel">Distribute the Debited amount to the correct invoice accounts</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="col-12">
                                <address>
                                    <strong>Debit to:</strong><br/>
                                        Kelvin Njuguna<br/>
                                            email@mail.com, 0704 549 859<br/>
                                                Hse No. 410, 90 Degrees By Tsavo
                                                <br/><br/>
                                                    <span class="date-today"> 1 Mar 2022, 10:20 AM</span>
                                                </address>
                                                </div>
                                                <div class="col-12">
                                                    <div class="py-2 mt-3">
                                                        <h3 class="font-size-15 fw-bold">Balances Breakdown</h3>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="table-responsive">
                                                        <table class="table table-nowrap invoice-table">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{width: "70px"}}>No.</th>
                                                                    <th>Item</th>
                                                                    <th class="text-end">Amount</th>
                                                                    <th class="" style={{width: "150px"}}>Assign Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>01</td>
                                                                    <td>Monthly Rent</td>
                                                                    <td class="text-end">KES 24,500</td>
                                                                    <td>
                                                                        <input type="number" class="form-control form-control-sm text-right" placeholder="KES"/>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td>02</td>
                                                                    <td>Surcharge</td>
                                                                    <td class="text-end">KES 2,450</td>
                                                                    <td>
                                                                        <input type="number" class="form-control form-control-sm text-right" placeholder="KES"/>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td>03</td>
                                                                    <td>Visitation Fee</td>
                                                                    <td class="text-end">KES 500</td>
                                                                    <td>
                                                                        <input type="number" class="form-control form-control-sm text-right" placeholder="KES"/>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="2" class="text-end">Total</td>
                                                                    <td class="text-end fw-bold the-total">KES 27,450</td>
                                                                    <td class="text-end fw-bold debited-amount">KES 0.00</td>
                                                                </tr>


                                                                <tr>
                                                                    <td colspan="2" class="border-0 text-end">
                                                                        <strong>Remaining Balance</strong></td>
                                                                    <td class="border-0 text-end">
                                                                        <h5 class="m-0 text-uppercase fw-bold the-debit-balance">KES 0.00</h5>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="alert alert-warning" role="alert">
                                                        <i class="mdi mdi-alert-outline me-2 "></i> A debit note with this details will be created and information will be sent to the tenant on the same via SMS
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <div class="float-end">
                                                    <a href="javascript: void(0);" class="btn btn-primary w-md waves-effect waves-light submit-credit-details">Submit Details</a>
                                                </div>
                                            </div>

                                        </div>
                                        {/* <!-- /.modal-content --> */}
                                    </div>
                                    {/* <!-- /.modal-dialog --> */}
                            </div>
                            {/* <!-- debiting amoun to tenant --> */}

                            {/* <!-- loader --> */}
                            <div class="modal fade" id="creditNoteModalLoad" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header border-bottom-0 d-none">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body loading-cont">
                                            <div class="row">
                                                <div class="col-12 mt-5 mb-5">
                                                    <div class="d-flex justify-content-center align-items-center justify-content-center flex-column">
                                                        <div class="spinner-border text-info m-1 mb-4" role="status">
                                                            <span class="sr-only">Loading...</span>
                                                        </div>
                                                        <div class="text-center">
                                                            <h4 class="text-uppercase text-info">loading</h4>
                                                            <p>Please wait as your request is being processed</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-body d-none">
                                            <div class="text-center mt-5 mb-5">
                                                <div class="avatar-md mx-auto mb-4 ">
                                                    <div class="avatar-title bg-light rounded-circle text-success h1 ">
                                                        <i class="mdi mdi-check-bold "></i>
                                                    </div>
                                                </div>

                                                <div class="row justify-content-center ">
                                                    <div class="col-xl-10 ">
                                                        <h4 class="text-success text-uppercase">Created successfully</h4>
                                                        <p class="text-muted  mb-4 ">
                                                            The credit note has been created successfully
                                                        </p>

                                                    </div>
                                                    <div class="col-10">
                                                        <a href="#" type="button" class="btn btn-primary waves-effect waves-light w-100 text-capitalize">
                                                            <i class="mdi mdi-printer font-size-18 align-middle me-2"></i> Print Credit Note
                                                        </a>
                                                        <a href="#" type="button" class="btn btn-primary waves-effect waves-light w-100 text-capitalize mt-3">
                                                            <i class="mdi mdi-printer font-size-18 align-middle me-2"></i> Print Debit Note
                                                        </a>

                                                        <button type="button" class="btn btn-outline-secondary waves-effect waves-light w-100 mt-3 text-capitalize stay-on-page">
                                                            <i class="mdi mdi-window-close font-size-18 align-middle me-2"></i> Close this section
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                        )
}

                        export default CreateCreditNote