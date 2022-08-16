import React from 'react'








function Auctioneers() {
  return (
    // <div>Auctioneers</div>

    <div class="page-content">
                <div class="container-fluid">

               
                    <div class="row">
                        <div class="col-12">
                            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 class="mb-sm-0 font-size-18">Add an auctioneer</h4>

                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item"><a href="index.html">Dashboards</a></li>
                                        
                                        <li class="breadcrumb-item active">Add an auctioneer</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                 
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">


                                        <div class="col-7">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="mb-4">
                                                        <label for="basicpill-firstname-input">Auctioneer's Name <strong class="text-danger">*</strong></label>
                                                        <input type="text" class="form-control" id="" placeholder="Enter the auctioneering company name"/>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="mb-4">
                                                        <label for="basicpill-firstname-input">Email <strong class="text-danger">*</strong></label>
                                                        <input type="email" class="form-control" id="" placeholder="email@email.com"/>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="mb-4">
                                                        <label for="basicpill-firstname-input">Telephone Number <strong class="text-danger">*</strong></label>
                                                        <input type="email" class="form-control" id="" placeholder="Phone number"/>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="mb-4">
                                                        <label for="basicpill-firstname-input">Contact person <strong class="text-danger">*</strong></label>
                                                        <input type="email" class="form-control" id="" placeholder="Enter Your First Name"/>
                                                    </div>
                                                </div>
                                                <div class="col-8">
                                                    <div class="mb-4">
                                                        <label for="basicpill-firstname-input">Postal Address <strong class="text-danger">*</strong></label>
                                                        <input type="text" class="form-control" id="" placeholder="Enter the personal address"/>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="mb-4">
                                                        <label for="basicpill-firstname-input">Town <strong class="text-danger">*</strong></label>
                                                        <input type="text" class="form-control" id="" placeholder="Enter town name"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-5">
                                            <div class=" mb-4 ">
                                                <label class="text-capitalize " for="basicpill-firstname-input ">Location<strong class="text-danger ">*</strong></label>
                                                <textarea name=" " class="form-control " id=" " cols="30 " rows="10" placeholder="Enter the physical address"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-12 ">
                                            <button type="button " class="btn btn-primary waves-effect waves-light ">
                                                <i class="mdi mdi-check-all font-size-16 align-middle me-2 "></i> Add Auctioneer
                                            </button>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
             
                    </div>

               
                </div>
             
            </div>

  )
}

export default Auctioneers