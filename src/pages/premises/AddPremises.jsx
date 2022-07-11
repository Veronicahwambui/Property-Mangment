import React, { useState } from 'react'
import  {Helmet} from 'react-helmet'

function AddPremises() {
    const [landlordFileNo , setLandlordFileNo] = useState('')

  return (
    <>
    <div className="page-content">
       <div className="content-fluid">
       {/* <!-- start page title --> */}
                    <div class="row">
                        <div class="col-12">
                            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 class="mb-sm-0 font-size-18 text-capitalize">Premises Registration</h4>

                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                        <li class="breadcrumb-item"><a href="property-list.html">All Premies</a></li>
                                        <li class="breadcrumb-item active">Premises registration</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
        {/* <!-- end page title --> */}

        {/* <!-- eTransactions table --> */}

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
                <div className="card-body">
                <p>Fill in the form correctly. Fields with an Asterisk <strong class="text-danger">*</strong> are mandatory fields.</p>
                <div className="create-property" id="basic-example">
                {/* <!-- Landlord details --> */}
                <h3>Landlord details</h3>
                <section>
                 <form>
                                                {/* <!-- landolord type selection --> */}
                                                <div class="col-lg-4">
                                                    <div class="mb-3">
                                                        <label for="landlord-type" class="form-label">Landlord type</label>
                                                        <select id="landlord-type" class="form-select">
                                                            <option value="individual" selected="">Individual</option>
                                                            <option value="company">Company</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* <!-- company details --> */}
                                                <div class="row individual-landlord d-none">
                                                    <div class="col-12">
                                                        <div class="bg-primary border-2 bg-soft p-3 mb-4">
                                                            <p class="fw-semibold mb-0 pb-0 text-uppercase">Company Details</p>

                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for=" ">Company's Name</label>
                                                            <input type="text " class="form-control " id=" " placeholder="Enter company's name" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for=" ">KRA pin</label>
                                                            <input type="text " class="form-control " id=" " placeholder="Enter KRA pin Number" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for=" ">Certificate of incorporation</label>
                                                            <input type="text " class="form-control " id=" " placeholder="Enter certificate No." />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for=" ">Contact Person</label>
                                                            <input type="text " class="form-control " id=" " placeholder="Enter full name" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for=" ">Phone</label>
                                                            <input type="text " class="form-control " id=" " placeholder="Enter phone No." />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for=" ">Email</label>
                                                            <input type="email" class="form-control " id=" " placeholder="Enter email Address" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 ">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-address-input ">Postal Address</label>
                                                            <textarea id="basicpill-address-input " class="form-control " rows="5 " placeholder="Enter Your Address "></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <div class="mb-4 ">
                                                            <label for=" " class=" ">Registration Date<strong class="text-danger ">*</strong></label>
                                                            <div class="input-group" id="datepicker202">
                                                                <input type="text" class="form-control" placeholder="Select date" data-date-format="dd M, yyyy" data-date-container='#datepicker202' data-provide="datepicker" data-date-autoclose="true" />

                                                                <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                {/* <!-- personal details --> */}
                                                <div class="row personal-landlord ">
                                                    <div class="col-12">
                                                        <div class="bg-primary border-2 bg-soft p-3 mb-4">
                                                            <p class="fw-semibold mb-0 pb-0 text-uppercase">Personal details</p>

                                                        </div>
                                                    </div>



                                                    <div class="col-lg-3 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for=" ">ID/PP Num.</label>
                                                            <input type="text " class="form-control " id=" " placeholder="Enter ID or PP Num. " />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-firstname-input ">First name <strong class="text-danger ">*</strong></label>
                                                            <input type="text " class="form-control " id="basicpill-firstname-input " placeholder="Enter Your First Name " />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-lastname-input ">Last Name <strong class="text-danger ">*</strong></label>
                                                            <input type="text " class="form-control " id="basicpill-lastname-input " placeholder="Enter Your Last Name " />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for=" ">Other Name(s)</label>
                                                            <input type="text " class="form-control " id=" " placeholder="Enter Your Last Name " />
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="row ">
                                                            <div class="col-lg-4 ">
                                                                <div class="row ">
                                                                    <div class="col-12 ">
                                                                        <div class="mb-4 ">
                                                                            <label for=" " class=" ">Registration Date<strong class="text-danger ">*</strong></label>
                                                                            <div class="input-group" id="datepicker22">
                                                                                <input type="text" class="form-control" placeholder="Select date" data-date-format="dd M, yyyy" data-date-container='#datepicker22' data-provide="datepicker" data-date-autoclose="true" />

                                                                                <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12 ">
                                                                        <div class="row ">
                                                                            <label for=" " class=" ">Gender: <strong class="text-danger ">*</strong></label>
                                                                            <div class="d-flex ">

                                                                                <div class="form-check me-3">
                                                                                    <input class="form-check-input" type="radio" name="gender" id="gender-male" />
                                                                                    <label class="form-check-label" for="gender-male">
                                                                                        Male
                                                                                    </label>
                                                                                </div>

                                                                                <div class="form-check me-3">
                                                                                    <input class="form-check-input" type="radio" name="gender" id="gender-female" />
                                                                                    <label class="form-check-label" for="gender-female">
                                                                                        Female
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>


                                                                </div>

                                                            </div>
                                                            <div class="col-lg-4 ">
                                                                <div class="row ">
                                                                    <div class="col-lg-12 ">
                                                                        <div class="mb-4 ">
                                                                            <label for="basicpill-phoneno-input ">Phone <strong class="text-danger ">*</strong></label>
                                                                            <input type="text " class="form-control " id="basicpill-phoneno-input " placeholder="Enter Your Phone No. " />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-lg-12 ">
                                                                        <div class="mb-4 ">
                                                                            <label for="basicpill-email-input ">Email <strong class="text-danger ">*</strong></label>
                                                                            <input type="email " class="form-control " id="basicpill-email-input " placeholder="Enter Your Email ID " />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div class="col-lg-4 ">
                                                                <div class="mb-4 ">
                                                                    <label for="basicpill-address-input ">Postal Address</label>
                                                                    <textarea id="basicpill-address-input " class="form-control " rows="5 " placeholder="Enter Your Address "></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="col-12">
                                                    <div class="bg-primary border-2 bg-soft p-3 mb-4">
                                                        <p class="fw-semibold mb-0 pb-0 text-uppercase">Banking details and Landlord MCA Property agreement</p>

                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="agreement-type">Agreement Type<strong class="text-danger ">*</strong></label>
                                                            <select class="form-control selectpicker " id="agreement-type" title="Landlord MCA agreement type">
                                                                <option value="Property Management">Property Management</option>
                                                                <option value="Unit Letting">Unit Letting</option>
                                                                <option value="Service charge collection only">Service charge collection only</option>
                                                          </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-4 col-sm-12 per-commision">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-lastname-input ">Percentage commission<strong class="text-danger ">*</strong></label>
                                                            <input type="text " class="form-control " placeholder="Percentage Commision % " />
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-4">
                                                        <div class="mb-4 ">
                                                            <label for=" " class=" ">Payment Date<strong class="text-danger ">*</strong></label>
                                                            <div class="input-group" id="datepicker2022">
                                                                <select name="" id="" class="form-select form-control">
                                                                    <option selected value="1">1st</option>
                                                                    <option value="1">2nd</option>
                                                                    <option value="1">3rd</option>
                                                                    <option value="1">4th</option>
                                                                    <option value="1">5th</option>
                                                                    <option value="1">6th</option>
                                                                    <option value="1">7th</option>
                                                                    <option value="1">8th</option>
                                                                    <option value="1">9th</option>
                                                                    <option value="1">10th</option>
                                                                    <option value="1">11th</option>
                                                                    <option value="1">12th</option>
                                                                    <option value="1">13th

                                                                    </option>
                                                                    <option value="1">14th</option>
                                                                    <option value="1">15th</option>
                                                                    <option value="1">16th</option>
                                                                    <option value="1">17th</option>
                                                                    <option value="1">18th</option>
                                                                    <option value="1">19th</option>
                                                                    <option value="1">20th</option>
                                                                    <option value="1">21st</option>
                                                                    <option value="1">22nd</option>

                                                                    <option value="1">23rd</option>
                                                                    <option value="1">24th</option>
                                                                    <option value="1">25th</option>
                                                                    <option value="1">26th</option>
                                                                    <option value="1">27th</option>
                                                                    <option value="1">28th</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>


                                                  
                                                    <div class="col-12">
                                                        <div class="table-responsive table-responsive-md">
                                                            <table class="table table-editable-1 align-middle table-edits">
                                                                <thead class="table-light">
                                                                    <tr class="text-uppercase table-dark">
                                                                        <th>#</th>
                                                                        <th>Bank</th>
                                                                        <th class="">Bank Acc</th>
                                                                        <th class="">Percentage Remuneration</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr data-id="1">
                                                                        <td style={{width: "80px"}}>1.</td>
                                                                        <td>
                                                                            <select class="form-control selectpicker" data-live-search="true" title="Select the bank">
                                                                                <option value="">Equity</option>
                                                                                <option value="">KCB</option>   
                                                                                <option value="">National Bank</option>                                                                
                                                                        </select>
                                                                        </td>
                                                                        <td class="">
                                                                            <input type="text " class="form-control " placeholder="Acc No." spellcheck="false" data-ms-editor="true" />
                                                                        </td>
                                                                        <td class="">
                                                                            <input type="text " class="form-control " placeholder="Percentage" spellcheck="false" data-ms-editor="true" />
                                                                        </td>

                                                                        <td></td>

                                                                    </tr>

                                                                    <tr class="cloneCharges d-none">
                                                                        <td style={{width: "80px"}} class="categoryIndex ">#</td>

                                                                        <td>
                                                                            <select class="form-control selectpicker" data-live-search="true" title="Select the bank">
                                                                                <option value="">Equity</option>
                                                                                <option value="">KCB</option>   
                                                                                <option value="">National Bank</option>                                                                
                                                                        </select>
                                                                        </td>
                                                                        <td class="">
                                                                            <input type="text " class="form-control " placeholder="Acc No." spellcheck="false" data-ms-editor="true" />
                                                                        </td>
                                                                        <td class="">
                                                                            <input type="text " class="form-control " placeholder="Percentage" spellcheck="false" data-ms-editor="true" />
                                                                        </td>


                                                                        <td class="text-right cell-change d-flex align-items-center justify-content-end">
                                                                            <a class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent cancel-new-category-2 " title="Cancel "><i class="bx bx-x "></i></a>
                                                                        </td>
                                                                    </tr>


                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <td colspan="7" class="bg-light add-field-1 cursor-pointer">
                                                                            <span class="d-flex align-items-center "><i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i><span class="pl-5 ">Add A Bank</span></span>
                                                                        </td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="row d-none">
                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-pancard-input ">Bank</label>
                                                            <input type="text " class="form-control " id=" " placeholder="Enter Bank Name " />
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for=" ">Account No.</label>
                                                            <input type="text " class="form-control " id=" " placeholder="Enter Bank Account Number " />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="agreement-type">Agreement Type<strong class="text-danger ">*</strong></label>
                                                            <select class="form-control selectpicker " id="agreement-type" title="Landlord MCA agreement type" >
                                                                <option value="Property Management">Property Management</option>
                                                                <option value="Unit Letting">Unit Letting</option>
                                                                <option value="Service charge collection only">Service charge collection only</option>
                                                          </select>
                                                        </div>
                                                    </div>


                                                    <div class="col-lg-12 d-none unit-letting-option">
                                                        <div class="row ">
                                                            <label for=" " class=" ">Nature of letting commission<strong class="text-danger ">*</strong></label>
                                                            <div class="col-12 ">
                                                                <div class="d-flex w-100 ">

                                                                    <div class="form-check pr-15px ">
                                                                        <input class="form-check-input " type="radio" value="1" name="letting-nature" id="formRadios2" checked />
                                                                        <label class="form-check-label " for="formRadios2">
                                                                        Specified % Cut on rent
                                                                    </label>
                                                                    </div>


                                                                    <div class="form-check mb-3 pr-15px ">
                                                                        <input class="form-check-input " type="radio" value="2" name="letting-nature" id="formRadios1" />
                                                                        <label class="form-check-label " for="formRadios1">
                                                                        100% 1st Month Rent
                                                                    </label>
                                                                    </div>

                                                                    <div class="form-check ">
                                                                        <input class="form-check-input " type="radio" value="3" name="letting-nature" id="formRadios3" />
                                                                        <label class="form-check-label" for="formRadios3">
                                                                        Specified  % Cut on total rent collection
                                                                    </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-4 col-sm-12 per-commision">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-lastname-input ">Percentage commission<strong class="text-danger ">*</strong></label>
                                                            <input type="text " class="form-control " placeholder="Percentage Commision % " />
                                                        </div>
                                                    </div>

                                                </div>

                 </form>
                </section>
                {/* <!-- Premises details --> */}
                 <h3>Premises details</h3>
                  <section>
                                            <form>
                                                <div class="col-12">
                                                    <div class="bg-primary border-2 bg-soft p-3 mb-4">
                                                        <p class="fw-semibold mb-0 pb-0 text-uppercase">General Information about the Premises</p>

                                                    </div>
                                                </div>
                                                <div class="row mb-4">
                                                    <div class="col-2">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-firstname-input ">File No.<strong class="text-danger ">*</strong></label>
                                                            <input type="text " class="form-control " id="basicpill-firstname-input " placeholder="Enter file No." />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2 col-md-2">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-firstname-input ">Plot No. <strong class="text-danger ">*</strong></label>
                                                            <input type="text " class="form-control " id="basicpill-firstname-input " placeholder="Plot No." />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-firstname-input ">Premises Name <strong class="text-danger ">*</strong></label>
                                                            <input type="text " class="form-control " id="basicpill-firstname-input " placeholder="Enter Your First Name " />
                                                        </div>
                                                    </div>



                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-lastname-input ">Estate <strong class="text-danger ">*</strong></label>
                                                            <select class=" selectpicker form-control " data-live-search="true " title="Select estate ">
                                                                <option value=" ">Bahati</option>
                                                                <option value=" ">KITI</option>
                                                                <option value=" ">London</option>
                                                                <option value=" ">Area 58</option>
                                                          </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-lastname-input ">Premises Type <strong class="text-danger ">*</strong></label>
                                                            <select class="form-control selectpicker " title="Select Building type " data-live-search="true ">
                                                                <option value=" ">Apartment</option>
                                                                <option value=" ">Mansionate</option>
                                                                <option value=" ">Town House</option>
                                                                <option value=" ">Discover</option>
                                                          </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-lastname-input ">Property Use type<strong class="text-danger ">*</strong></label>
                                                            <select class="form-control selectpicker " title="Select Property use type " data-live-search="true ">
                                                                <option value=" ">Commercial property</option>
                                                                <option value=" ">Residential Property</option>
                                                                <option value=" ">Residential/Commercial</option>
                                                                
                                                          </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6 col-lg-4 col-sm-12 ">
                                                        <div class="mb-4 ">
                                                            <label for=" " class=" ">Registration Date<strong class="text-danger ">*</strong></label>
                                                            <div class="input-group" id="datepicker2">
                                                                <input type="text" class="form-control" placeholder="Select date" data-date-format="dd M, yyyy" data-date-container='#datepicker2' data-provide="datepicker" data-date-autoclose="true" />

                                                                <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-4">
                                                        <div class="row ">
                                                            <label for=" " class=" ">Is renting payable on <strong>Pro Rata Basis?</strong><strong class="text-danger ">*</strong></label>
                                                            <div class="col-12 ">
                                                                <div class="d-flex w-100 ">

                                                                    <div class="form-check pr-15px ">
                                                                        <input class="form-check-input " type="radio" value="yes-prorater" name="prorater" id="yes-prorater" checked />
                                                                        <label class="form-check-label " for="yes-prorater">
                                                                        Yes, it's Pro Rata
                                                                    </label>
                                                                    </div>


                                                                    <div class="form-check mb-3 pr-15px ">
                                                                        <input class="form-check-input" type="radio" value="no-prorater" name="prorater" id="no-prorater" />
                                                                        <label class="form-check-label " for="no-prorater">
                                                                       No, its not
                                                                    </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="water-servicing">How is water serviced to the units <strong class="text-danger ">*</strong></label>
                                                            <select class="form-select water-servicing" title="Select from options provided" data-live-search="true " id="water-servicing">
                                                                <option value="1">Each unit has its own unique meter No. provided by NAWASCO</option>
                                                                <option value="2">Each unit has its own unique meter No. provided by NAWASCO</option>
                                                                <option value="3">Each unit has its own unique meter No. and water is provided from a borehole</option>
                                                                <option value="4">The premises has one meter and the bill is to be shared equally amongst the Tenants</option>
                                                                <option value="5">Not applicable for this premises</option>
                                                          </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-3 col-4 d-none rate-perunit-water">
                                                        <div class="mb-4 ">
                                                            <label for="rate-per-unit">Rate per unit for water<strong class="text-danger ">*</strong></label>
                                                            <input type="text " class="form-control rate-per-unit" id="rate-per-unit" placeholder="KES" />
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-4 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="water-servicing">How is Electricity serviced to the units <strong class="text-danger ">*</strong></label>
                                                            <select class="form-select" title="Select from options provided" data-live-search="true " id="water-servicing">
                                                                <option value=" ">Each unit has its own unique KPLC meter</option>
                                                                <option value=" ">The premises has only one KPLC meter number and the monthly bill is to be shared equaly amongest all tenants</option>
                                                                <option value=" ">The units are on Pre Pay</option>
                                                                <option value=" ">Not applicable for this premises</option>
                                                          </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <div class="bg-primary border-2 bg-soft p-3 mb-4">
                                                        <p class="fw-semibold mb-0 pb-0 text-uppercase">Caretaker details</p>

                                                    </div>
                                                </div>

                                                {/* <!-- caretaker details --> */}
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for=" ">ID/PP Num.</label>
                                                            <input type="text " class="form-control " id=" " placeholder="Enter ID or PP Num. " />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-firstname-input ">First name <strong class="text-danger ">*</strong></label>
                                                            <input type="text " class="form-control " id="basicpill-firstname-input " placeholder="Enter Your First Name " />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for="basicpill-lastname-input ">Last Name <strong class="text-danger ">*</strong></label>
                                                            <input type="text " class="form-control " id="basicpill-lastname-input " placeholder="Enter Your Last Name " />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-6 ">
                                                        <div class="mb-4 ">
                                                            <label for=" ">Other Name(s)</label>
                                                            <input type="text " class="form-control " id=" " placeholder="Enter Your Last Name " />
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="row ">
                                                            <div class="col-lg-4 ">
                                                                <div class="row ">
                                                                    <div class="col-12 ">
                                                                        <div class="mb-4 ">
                                                                            <label for=" " class=" ">Caretaker type<strong class="text-danger ">*</strong></label>
                                                                            <select class="form-control selectpicker" data-live-search="true" title="Select caretaker type">
                                                                                <option value="Commissioned by MCA">Commissioned by MCA</option>
                                                                                <option value="Brought by the landlord">Brought by the landlord</option>   
                                                                                                                                        
                                                                          </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12 ">
                                                                        <div class="row mb-3">
                                                                            <label for=" " class=" ">Gender: <strong class="text-danger ">*</strong></label>
                                                                            <div class="d-flex ">

                                                                                <div class="form-check me-3">
                                                                                    <input class="form-check-input" type="radio" name="caretaker-gender" id="caretaker-male" />
                                                                                    <label class="form-check-label" for="caretaker-male">
                                                                                        Male
                                                                                    </label>
                                                                                </div>

                                                                                <div class="form-check me-3">
                                                                                    <input class="form-check-input" type="radio" name="caretaker-gender" id="caretaker-female" />
                                                                                    <label class="form-check-label" for="caretaker-female">
                                                                                        Female
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>


                                                                </div>

                                                            </div>
                                                            <div class="col-lg-8">
                                                                <div class="row ">
                                                                    <div class="col-lg-6 ">
                                                                        <div class="mb-4 ">
                                                                            <label for="basicpill-phoneno-input ">Phone <strong class="text-danger ">*</strong></label>
                                                                            <input type="text " class="form-control " id="basicpill-phoneno-input " placeholder="Enter Your Phone No. " />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-lg-6 ">
                                                                        <div class="mb-4 ">
                                                                            <label for="basicpill-email-input ">Email <strong class="text-danger ">*</strong></label>
                                                                            <input type="email " class="form-control " id="basicpill-email-input " placeholder="Enter Your Email ID " />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- caretaker details end --> */}



                                                <div class="col-12">
                                                    <div class="bg-primary border-2 bg-soft p-3 mb-4">
                                                        <p class="fw-semibold mb-0 pb-0 text-uppercase">Units/ Hse Types on offer At the premises</p>

                                                    </div>
                                                </div>
                                                <div class="table-responsive table-responsive-md mb-5">
                                                    <table class="table table-editable-2 align-middle table-edits ">
                                                        <thead class="table-light">
                                                            <tr class="text-uppercase table-dark">
                                                                <th class="vertical-align-middle">#</th>
                                                                <th class="vertical-align-middle">House type</th>
                                                                <th class="vertical-align-middle">No. of rooms</th>
                                                                <th class="vertical-align-middle">Unit size M <sup>2</sup></th>
                                                                <th class="vertical-align-middle">Unit purpose</th>
                                                                <th style={{width: "295px"}}>Tenancy Renewal
                                                                    <button type="button" data-toggle="modal" data-target=".tenancy-renewal-help" class="btn btn-link btn-rounded waves-effect font-16px "><span class="mdi mdi-help-circle text-white"></span></button></th>
                                                                <th class="text-right"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr data-id="1">
                                                                <td style={{width: "80px"}}>1.</td>
                                                                <td>
                                                                    <select class="form-control selectpicker" data-live-search="true" title="Select hse/unit type">
                                                                        <option value="">Bed sitter</option>
                                                                        <option value="">Two bedroom</option>   
                                                                        <option value="">three bedroom</option>
                                                                        <option value="">Four bedroom</option>                                                                
                                                                  </select>
                                                                </td>
                                                                <td class="">
                                                                    <input type="number" class="form-control " placeholder="Rooms" spellcheck="false" data-ms-editor="true" />
                                                                </td>
                                                                <td class="" title="Select number of months after which the tenancy agreement should be renewed">
                                                                    <input type="number" class="form-control " placeholder="Size (MSQ)" spellcheck="false" data-ms-editor="true" />
                                                                </td>

                                                                <td>
                                                                    <select class="form-control selectpicker" data-live-search="true" title="Select unit purpose">
                                                                        <option value="">Residential</option>
                                                                        <option value="">Commercial</option>   
                                                                  </select>
                                                                </td>
                                                                <td class="">
                                                                    <input type="number" class="form-control " placeholder="No. of months for agreement Renewal" spellcheck="false" data-ms-editor="true" />
                                                                </td>
                                                                <td></td>

                                                            </tr>
                                                            <tr class="cloneCharges d-none">
                                                                <td style={{width: "80px"}} class="categoryIndex ">#</td>

                                                                <td>
                                                                    <select class="form-control selectpicker" data-live-search="true" title="Select hse/unit type">
                                                                        <option value="">Bed sitter</option>
                                                                        <option value="">Two bedroom</option>   
                                                                        <option value="">three bedroom</option>
                                                                        <option value="">Four bedroom</option>                                                                
                                                                  </select>
                                                                </td>
                                                                <td class="">
                                                                    <input type="number" class="form-control " placeholder="No. of Rooms" spellcheck="false" data-ms-editor="true" />
                                                                </td>
                                                                <td class="" title="Select number of months after which the tenancy agreement should be renewed">
                                                                    <input type="number" class="form-control " placeholder="Size (MSQ)" spellcheck="false" data-ms-editor="true" />
                                                                </td>

                                                                <td>
                                                                    <select class="form-control selectpicker" data-live-search="true" title="Select unit purpose">
                                                                        <option value="">Residential</option>
                                                                        <option value="">Commercial</option>   
                                                                  </select>
                                                                </td>
                                                                <td class="">
                                                                    <input type="number" class="form-control " placeholder="No. of months for agreement Renewal" spellcheck="false" data-ms-editor="true" />
                                                                </td>

                                                                <td class="text-right d-flex align-items-center justify-content-end">
                                                                    <a class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent cancel-new-category-2 " title="Cancel "><i class="bx bx-x "></i></a>
                                                                </td>
                                                            </tr>


                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td colspan="7" class="bg-light add-field-2 cursor-pointer">
                                                                    <span class="d-flex align-items-center "><i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i><span class="pl-5 ">Add A Unit</span></span>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>

                                                <div class="col-12">
                                                    <div class="bg-primary border-2 bg-soft p-3 mb-4">
                                                        <p class="fw-semibold mb-0 pb-0 text-uppercase">Applicable charges for this premises</p>

                                                    </div>
                                                    <p class="d-none"><strong>Check the correct charges that may be charged from tenants at this premises</strong></p>
                                                </div>
                                                <div class="col-12 mb-5">
                                                    <div class="row">
                                                        <div class="col-4 col-md-5 col-sm-12 h-100">
                                                            <p class="text-decoration-underline"><i>Applicable Charges</i></p>
                                                            <div class="row border-right-1">
                                                                <div class="col-6">
                                                                    <div class="form-check form-check-primary mb-3">
                                                                        <input class="form-check-input" type="checkbox" id="monthlyRent" checked="" />
                                                                        <label class="form-check-label" for="monthlyRent">
                                                                            Monthly Rent
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="form-check form-check-primary mb-3">
                                                                        <input class="form-check-input" type="checkbox" id="rentTax" checked="" />
                                                                        <label class="form-check-label" for="rentTax">
                                                                            18% Rent Tax
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="form-check form-check-primary mb-3">
                                                                        <input class="form-check-input" type="checkbox" id="waterBill" checked="" />
                                                                        <label class="form-check-label" for="waterBill">
                                                                            Water Bills
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="form-check form-check-primary mb-3">
                                                                        <input class="form-check-input" type="checkbox" id="electricityBill" checked="" />
                                                                        <label class="form-check-label" for="electricityBill">
                                                                            Electricity Bills
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="form-check form-check-primary mb-3">
                                                                        <input class="form-check-input" type="checkbox" id="garbageCollection" checked="" />
                                                                        <label class="form-check-label" for="garbageCollection">
                                                                            Garbage collection
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div class="col-4 col-md-4 col-sm-12 h-100">
                                                            <p class="text-decoration-underline"><i>Deposits</i></p>
                                                            <div class="row border-right-1">
                                                                <div class="col-6">
                                                                    <div class="form-check form-check-secondary mb-3">
                                                                        <input class="form-check-input" type="checkbox" id="rentDeposit" checked="" />
                                                                        <label class="form-check-label" for="rentDeposit">
                                                                            Rent deposit
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="form-check form-check-secondary mb-3">
                                                                        <input class="form-check-input" type="checkbox" id="agencyDeposit" />
                                                                        <label class="form-check-label" for="agencyDeposit">
                                                                            Utility deposit
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>



                                                </div>

                                            </form>
                  </section>
                  
                {/* <!-- premises invoice breakdown --> */}
                 <h3>Invoices breakdown</h3>
                 <section>
                 <div class="row justify-content-center">
                 <div class="col-12">
                 <div class="table-responsive">
                                                        <table class="table align-middle table-edits rent-invoicing dt-responsive" id="data-table">
                                                            <thead>
                                                                <tr class="text-uppercase table-light">
                                                                    <th>#</th>
                                                                    <th>Item type</th>
                                                                    <th>When to Charge</th>
                                                                    <th>Bed sitter</th>
                                                                    <th>one Bedroom</th>
                                                                    <th>Two Bedroom</th>
                                                                </tr>
                                                            </thead>

                                                            <tfoot class="table-light">
                                                                <tr class="text-capitalize deposit-fee boarder-bottom">
                                                                    <th></th>
                                                                    <th>Total security Deposit</th>

                                                                    <th>First Month only</th>
                                                                    <th class="deposit-fee">-</th>
                                                                    <th class="deposit-fee">-</th>
                                                                    <th class="deposit-fee">-</th>
                                                                </tr>
                                                                <tr class="text-capitalize monthly-fee">
                                                                    <th></th>
                                                                    <th>Least Monthly Invoice Amount</th>

                                                                    <th>Monthly</th>
                                                                    <th class="monthly-fee">-</th>
                                                                    <th class="monthly-fee">-</th>
                                                                    <th class="monthly-fee">-</th>

                                                                </tr>
                                                            </tfoot>
                                                            <tbody>
                                                                <tr data-id="1">
                                                                    <td>1.</td>
                                                                    <td>Monthly Rent</td>
                                                                    <td>Monthly</td>
                                                                    <td invoice-permonth="true" deposit-amount="true" invoice-item-name="rent">
                                                                        <input type="text " class="form-control " placeholder="Enter Amount" spellcheck="false" data-ms-editor="true" />
                                                                    </td>
                                                                    <td invoice-permonth="true" deposit-amount="true" invoice-item-name="rent">
                                                                        <input type="text " class="form-control " placeholder="Enter Amount" spellcheck="false" data-ms-editor="true" />
                                                                    </td>
                                                                    <td invoice-permonth= "true" deposit-amount="true" invoice-item-name="rent">
                                                                        <input type="text " class="form-control " placeholder="Enter Amount" spellcheck="false" data-ms-editor="true" />
                                                                    </td>

                                                                </tr>
                                                                <tr data-id="1">
                                                                    <td style={{width: "80px"}}>2</td>
                                                                    <td>Rent VAT</td>
                                                                    <td>Monthly</td>
                                                                    <td invoice-permonth="true" invoice-item-name="rent VAT" deposit-amount="false" per-of="rent" the-val="18>18% of rent"> </td>
                                                                    <td invoice-permonth="true" invoice-item-name="rent VAT" deposit-amount="false" per-of="rent" the-val="18>18% of rent"> </td>
                                                                    <td invoice-permonth="true" invoice-item-name="rent VAT" deposit-amount="false" per-of="rent" the-val="18>18% of rent"> </td>

                                                                </tr>
                                                                <tr data-id=" 1 ">
                                                                    <td style={{width: "80px"}}>3</td>
                                                                    <td>Rent Deposit</td>
                                                                    <td>First Month only</td>
                                                                    <td invoice-permonth="false" deposit-amount="true">
                                                                        <input type="text " class="form-control " placeholder="Enter Amount " spellcheck="false " data-ms-editor="true " />
                                                                    </td>
                                                                    <td invoice-permonth="false" deposit-amount="true">
                                                                        <input type="text " class="form-control " placeholder="Enter Amount " spellcheck="false " data-ms-editor="true " />
                                                                    </td>
                                                                    <td invoice-permonth="false" deposit-amount="true">
                                                                        <input type="text " class="form-control " placeholder="Enter Amount " spellcheck="false " data-ms-editor="true " />
                                                                    </td>

                                                                </tr>
                                                                <tr data-id="1 ">
                                                                    <td style={{width: "80px"}}>4</td>
                                                                    <td>Surcharge</td>
                                                                    <td>Day 10 of each month</td>
                                
                                                                </tr>
                                                                <tr data-id="1 ">
                                                                    <td style={{width: "80px"}}>5</td>
                                                                    <td>Utility Deposit</td>
                                                                    <td>First month only</td>
                                                   
                                                                </tr>
                                                                <tr data-id="1 ">
                                                                    <td style={{width: "80px"}}>6</td>
                                                                    <td>Auctioneer Fees</td>
                                                                    <td>Random date</td>
                                                     

                                                                </tr>
                                                            </tbody>

                                                        </table>
                                                    </div>
                 </div> 
                 </div>
                 </section>
   
                 {/* <!-- Document attachments --> */}
                  <h3>Document Attachments</h3>
                  <section>
                                            <form>
                                                <h6>Upload document and don't forget to specify whose the document is for. ie <strong>Landlord or Premises</strong></h6>
                                                <div class="table-responsive table-responsive-md">
                                                    <table class="table table-editable-file align-middle table-edits">
                                                        <thead class="table-light">
                                                            <tr class="text-uppercase table-dark">
                                                                <th class="vertical-align-middle">#</th>
                                                                <th class="vertical-align-middle">Document Name</th>
                                                                <th class="vertical-align-middle">Document For</th>
                                                                <th class="vertical-align-middle">Document Number</th>
                                                                <th class="vertical-align-middle">Attach the file</th>
                                                                <th class="text-right"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr data-id="1">
                                                                <td style={{width: "80px"}}>1.</td>

                                                                <td class="">
                                                                    Certificate of incorporation
                                                                </td>
                                                                <td class="">
                                                                    The premises
                                                                </td>
                                                                <td class="" title="Select number of months after which the tenancy agreement should be renewed">
                                                                    <input type="text" class="form-control " placeholder="Document's Unique No." spellcheck="false" data-ms-editor="true" />
                                                                </td>
                                                                <td class="" title="Select number of months after which the tenancy agreement should be renewed">
                                                                    <div class="input-group mb-0">
                                                                        <label class="input-group-text bg-info text-white cursor-pointer" for="document1-1">
                                                                            <i class="font-14px mdi mdi-paperclip"></i> Attach File
                                                                        </label>
                                                                        <input type="file" class="form-control" id="document1-1" />
                                                                    </div>
                                                                </td>
                                                                <td></td>

                                                            </tr>
                                                            <tr data-id="2">
                                                                <td style={{width: "80px"}}>2.</td>

                                                                <td class="">
                                                                    KRA Pin
                                                                </td>
                                                                <td class="">
                                                                    The Landlord
                                                                </td>
                                                                <td class="" title="Select number of months after which the tenancy agreement should be renewed">
                                                                    <input type="text" class="form-control " placeholder="Document's Unique No." spellcheck="false" data-ms-editor="true" />
                                                                </td>
                                                                <td class="" title="Select number of months after which the tenancy agreement should be renewed">
                                                                    <div class="input-group mb-0">
                                                                        <label class="input-group-text bg-info text-white cursor-pointer" for="document1-1">
                                                                            <i class="font-14px mdi mdi-paperclip"></i> Attach File
                                                                        </label>
                                                                        <input type="file" class="form-control" id="document1-1" />
                                                                    </div>
                                                                </td>
                                                                <td></td>

                                                            </tr>
                                                            <tr data-id="3">
                                                                <td style={{width: "80px"}}>3.</td>

                                                                <td class="">
                                                                    Landlord & MCA agreement
                                                                </td>
                                                                <td class="">
                                                                    The Premises
                                                                </td>
                                                                <td class="" title="Select number of months after which the tenancy agreement should be renewed">
                                                                    <input type="text" class="form-control " placeholder="Document's Unique No." spellcheck="false" data-ms-editor="true" />
                                                                </td>
                                                                <td class="" title="Select number of months after which the tenancy agreement should be renewed">
                                                                    <div class="input-group mb-0">
                                                                        <label class="input-group-text bg-info text-white cursor-pointer" for="document1-1">
                                                                            <i class="font-14px mdi mdi-paperclip"></i> Attach File
                                                                        </label>
                                                                        <input type="file" class="form-control" id="document1-1" />
                                                                    </div>
                                                                </td>
                                                                <td></td>

                                                            </tr>
                                                            <tr data-id="3">
                                                                <td style={{width: "80px"}}>4.</td>

                                                                <td class="">
                                                                    <select class="form-control selectpicker" data-live-search="true" title="Select the Document">
                                                                        <option value="">ID Card</option>
                                                                        <option value="">Certificate of incorporation</option>   
                                                                        <option value="">KRA Pin</option>
                                                                  </select>
                                                                </td>
                                                                <td class="">
                                                                    <select class="form-control selectpicker" data-live-search="true" title="The document is for?">
                                                                        <option value="">The premises</option>
                                                                        <option value="">The landlord</option>   
                                                                  </select>
                                                                </td>
                                                                <td class="" title="Select number of months after which the tenancy agreement should be renewed">
                                                                    <input type="text" class="form-control " placeholder="Document's Unique No." spellcheck="false" data-ms-editor="true" />
                                                                </td>
                                                                <td class="" title="Select number of months after which the tenancy agreement should be renewed">
                                                                    <div class="input-group mb-0">
                                                                        <label class="input-group-text bg-info text-white cursor-pointer" for="document1-1">
                                                                            <i class="font-14px mdi mdi-paperclip"></i> Attach File
                                                                        </label>
                                                                        <input type="file" class="form-control" id="document1-1" />
                                                                    </div>
                                                                </td>
                                                                <td></td>

                                                            </tr>

                                                            <tr class="cloneCharges d-none">
                                                                <td style={{width: "80px"}} class="categoryIndex ">#</td>

                                                                <td>
                                                                    <select class="form-control selectpicker" data-live-search="true" title="Select the Document">
                                                                        <option value="">ID Card</option>
                                                                        <option value="">Certificate of incorporation</option>   
                                                                        <option value="">KRA Pin</option>
                                                                  </select>
                                                                </td>
                                                                <td class="">
                                                                    <select class="form-control selectpicker" data-live-search="true" title="The document is for?">
                                                                        <option value="">The premises</option>
                                                                        <option value="">The landlord</option>   
                                                                  </select>
                                                                </td>
                                                                <td class="">
                                                                    <input type="text" class="form-control " placeholder="Document's Unique No." spellcheck="false" data-ms-editor="true" />
                                                                </td>
                                                                <td class="" title="Select number of months after which the tenancy agreement should be renewed">
                                                                    <div class="input-group mb-0">
                                                                        <label class="input-group-text bg-info text-white cursor-pointer" for="document">
                                                                            <i class="font-14px mdi mdi-paperclip"></i> Attach File
                                                                        </label>
                                                                        <input type="file" class="form-control the-document" id="document" />
                                                                    </div>
                                                                </td>


                                                                <td class="text-right d-flex align-items-center justify-content-end">
                                                                    <a class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent cancel-new-category-file " title="Cancel "><i class="bx bx-x "></i></a>
                                                                </td>
                                                            </tr>


                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td colspan="7" class="bg-light add-field-file cursor-pointer">
                                                                    <span class="d-flex align-items-center "><i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i><span class="pl-5 ">Add A Unit</span></span>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </form>
                  </section>

                </div>
                </div>
            </div>   
          </div>
        </div>

       </div>
    </div>
    {/* <!-- enter landlord's id modal --> */}
            <div class="modal fade" id="subscribeModal" data-bs-backdrop="static" data-bs-keyboard="false"  role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-bottom-0">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body ">
                            <div class="text-center mb-4 ">
                                <div class="avatar-md mx-auto mb-4 ">
                                    <div class="avatar-title bg-light rounded-circle text-primary h1 ">
                                        <i class="mdi mdi-card-account-details-outline "></i>
                                    </div>
                                </div>

                                <div class="row justify-content-center ">
                                    <div class="col-xl-10 ">
                                        <h4 class="text-primary ">Landlord's File No.</h4>
                                        <p class="text-muted font-size-14 mb-4 ">
                                            Enter the landlords file number if the landlord is already registered in the system. If this is a new landlord, click cancel.
                                        </p>

                                        <form onSubmit={(e)=> e.preventDefault()}>
                                            <div class="row ">
                                                <div class="col-9">
                                                    <div class="mb-3 ">
                                                        <label for="digit1-input " class="visually-hidden ">File No.</label>
                                                        <input type="text " class="form-control form-control-lg text-center two-step " placeholder="Enter file No." value={landlordFileNo} onChange={(e)=>setLandlordFileNo(e.target.value)}/>
                                                    </div>
                                                </div>
                                                <div class="col-3 ">
                                                    <button data-bs-dismiss="modal" class="btn btn-primary btn-block w-100 btn-lg">
                                                        <i class="bx bx-search-alt-2 font-size-16 align-middle me-2 "></i>
                                                    <div class="d-none">Search</div>
                                                    </button>
                                                </div>
                                            </div>
                                            <button data-bs-dismiss="modal" class="btn btn-secondary btn-block mt-3 text-center w-100">
                                                <i class="mdi mdi-account-multiple-plus font-size-16 align-middle me-2 "></i>
                                                Its a new landlord
                                            </button>


                                        </form>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- end of ID modal --> */}

    <Helmet>
    {/* <!-- JAVASCRIPT --> */}
    <script src="assets/libs/jquery/jquery.min.js "></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js " integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49 " crossorigin="anonymous "></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js " integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy " crossorigin="anonymous "></script>
    <script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js "></script>
    <script src="assets/libs/metismenu/metisMenu.min.js "></script>
    <script src="assets/libs/simplebar/simplebar.min.js "></script>
    <script src="assets/libs/node-waves/waves.min.js "></script>

    {/* <!-- Bootstrap select --> */}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js "></script>
    {/* <!-- Table Editable plugin --> */}
    <script src="assets/libs/table-edits/build/table-edits.min.js"></script>
    <script src="assets/js/pages/table-editable.int.js"></script>
    <script src="assets/libs/select2/js/select2.min.js "></script>
    <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js "></script>
    <script src="assets/libs/spectrum-colorpicker2/spectrum.min.js "></script>
    <script src="assets/libs/bootstrap-timepicker/js/bootstrap-timepicker.min.js "></script>
    <script src="assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js "></script>
    <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js "></script>
    <script src="assets/libs/%40chenfengyuan/datepicker/datepicker.min.js "></script>

    {/* <!-- numerals number formater --> */}
    <script src="assets/libs/numeral/numeral.js "></script>
    {/* <!-- jquery step --> */}
    <script src="assets/libs/jquery-steps/build/jquery.steps.min.js "></script>

    {/* <!-- form wizard init --> */}
    <script src="assets/js/pages/form-wizard.init.js "></script>
    {/* <!-- Datatable init js --> */}
    <script src="assets/js/pages/datatables.init.js "></script>

    {/* <!-- App js --> */}
    <script src="../../js/app.js"></script>
    <script src="../../js/custom.js "></script>
    </Helmet>
    </>
  )
}

export default AddPremises