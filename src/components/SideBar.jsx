import React from 'react'
import {  NavLink } from 'react-router-dom'

function SideBar() {
  return (
    <div class="vertical-menu">

            <div data-simplebar class="h-100">

                {/* <!--- Sidemenu --> */}
                <div id="sidebar-menu">
                    {/* <!-- Left Menu Start --> */}
                    <ul class="metismenu list-unstyled" id="side-menu">
                        <li class="menu-title d-none" key="t-menu">Muigai Commercial Agencies</li>

                        <li>
                            <NavLink to='/' class="waves-effect">
                                <i class="bx bx-home-circle"></i><span>Dashboards</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="landlords" class="waves-effect">
                                <i class="mdi mdi-shield-home"></i><span>Landlord</span>
                            </NavLink>
                        </li>

                        <li>
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-office-building-outline"></i>
                                <span>Premises</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">
                                <li><NavLink to="/premisesregister">Premises Register</NavLink></li>
                                <li><NavLink to="/addpremises">Add a premises</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-account-key"></i>
                                <span>Tenants</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">
                                <li><NavLink to="/alltenants">All Tenants</NavLink></li>
                                <li><NavLink to="/addtenant">Add a tenant</NavLink></li>
                            </ul>
                        </li>
                    
                        <li>
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-cog-outline"></i>
                                <span>Set ups</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">
                                <li><NavLink  to="/applicablecharges">Applicable Charges</NavLink></li>
                                <li><NavLink  to="/estates">Estate</NavLink></li>
                                <li><NavLink  to="/housetypes">House types</NavLink></li>
                                <li><NavLink  to="/zones">Zones</NavLink></li>
                                <li><NavLink  to="/attachabledocs">Attachable Documents</NavLink></li>
                                <li><NavLink  to="/createuser">Create User </NavLink></li>
                            </ul>
                        </li>
              
                  

                          <li>
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="bx bx-receipt"></i>
                                <span>Invoices</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">
                                <li><NavLink  to="/createinvoice">Create an Invoice</NavLink></li>
                            </ul>
                        </li>
                 

                        <li>
                            <NavLink  to="/receipts" class="waves-effect">
                                <i class="mdi mdi-receipt"></i><span>Receipts</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/trasactions" class="waves-effect">
                                <i class="mdi mdi-cash-multiple"></i>
                                <span>Transactions</span>
                            </NavLink>
                        </li>
                        <li>
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-shield-account-outline"></i>
                                <span>System Users</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">
                                <li><NavLink to="/adminlist">Admins list</NavLink></li>
                                <li><NavLink to="/addadmin">Add an admin</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript: void(0);" className="waves-effect has-arrow">
                                <i className="mdi mdi-shield-account-outline"></i>
                                <span>Clients</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><NavLink to="/clienttype">New client type</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                {/* <!-- Sidebar --> */}
            </div>
        </div>
  )
}

export default SideBar