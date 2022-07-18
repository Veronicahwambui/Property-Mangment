import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import requestsServiceService from "../../services/requestsService.service";


function UserDetails() {
     const [adminlistData, setAdminListData] = useState({});
    
     const { id } = useParams();
     const userId = id;
   
     const fetchAll = () => {
       requestsServiceService. viewOneUser(userId).then((res) => {
         setAdminListData(res.data.data);
       });
     };

     useEffect(() => {
        fetchAll();
      }, []);
    

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
                                        <li class="breadcrumb-item"><a href="index.html">Dashboards</a></li>
                                        <li class="breadcrumb-item"><a href="admin-list.html">System user's</a></li>
                                        <li class="breadcrumb-item active">Kelvin Thuku</li>
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
                                            <a class="nav-item nav-link" href="user-details.html">User's Profile<span class="sr-only">(current)</span></a>
                                                <a class="nav-item nav-link" href="user-logs.html">All Logs</a>

                                            </div>
                                            <div class="navbar-nav">
                                                <a href="collector-new.html" type="button" class="btn btn-primary waves-effect waves-light text-white">
                                                    <i class="bx bx bxs-edit-alt font-size-16 align-middle me-2">
                                                  
                                                     Edit Account
                                                   
                                                     </i>
                                                </a>
                                            </div>

                                        </div>
                                    </nav>
                                </div>
                            </div>

                        </div>
                    </div>

                  
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
<span class="badge badge-pill badge-soft-success font-size-11">Active</span></h5>
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
                                                            <td class="pb-0"><span class="text-black">22 Feb 2022</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="pl-0 pb-0 text-muted"><i class="mdi mdi-circle-medium align-middle text-primary me-1"></i>Last edited by</td>
                                                            <td class="pb-0"><span class="text-black">Edwin Shanikwa</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="pl-0 pb-0 text-muted"><i class="mdi mdi-circle-medium align-middle text-primary me-1"></i>Date registered</td>
                                                            <td class="pb-0"><span class="text-black">22 Mar 2021</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="pl-0 pb-0 text-muted"><i class="mdi mdi-circle-medium align-middle text-primary me-1"></i>Registered By</td>
                                                            <td class="pb-0"><span class="text-black">Mabata Mapengo</span></td>
                                                        </tr>

                                                         <tr class="bg-white d-none">
                                                            <td colspan="2" class="pl-0 pb-0 text-muted bg-white">
                                                                <hr/>
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
                                        <br/><br/>

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