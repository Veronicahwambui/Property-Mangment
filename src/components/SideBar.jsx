/* global $ */

import React from 'react'
import { NavLink } from 'react-router-dom'

function SideBar() {
    return (
        <div className="vertical-menu">

            <div data-simplebar className="h-100">

                {/* <!--- Sidemenu --> */}
                <div id="sidebar-menu">
                    {/* <!-- Left Menu Start --> */}
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title d-none" key="t-menu">Muigai Commercial Agencies</li>

                        <li>
                            <NavLink to='/' className="waves-effect">
                                <i className="bx bx-home-circle"></i><span>Dashboards</span>
                            </NavLink>
                        </li>
                        <li>
                            <a href="javascript: void(0)" className="waves-effect has-arrow">
                                <i className="mdi mdi mdi-shield-home"></i>
                                <span>Landlord</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><NavLink to="/landlords">All landlords</NavLink></li>
                                <li><NavLink to="/addlandlord">Add a landlord</NavLink></li>
                            </ul>
                        </li>

                        <li>
                            <a href="javascript: void(0)" className="waves-effect has-arrow">
                                <i className="mdi mdi-office-building-outline"></i>
                                <span>Premises</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><NavLink to="/premisesregister">Premises Register</NavLink></li>
                                <li><NavLink to="/addpremises">Add a premises</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript: void(0)" className="waves-effect has-arrow">
                                <i className="mdi mdi-account-key"></i>
                                <span>Tenants</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><NavLink to="/alltenants">All Tenants</NavLink></li>
                                <li><NavLink to="/addtenant">Add a tenant</NavLink></li>
                            </ul>
                        </li>

                      

                        <li>
                            <a href="javascript: void(0)" className="waves-effect has-arrow">
                                <i className="bx bx-receipt"></i>
                                <span>Invoices</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><NavLink to="/createinvoice">Create an Invoice</NavLink></li>
                                <li><NavLink to="/invoices">Invoices</NavLink></li>
                                <li><NavLink to="/monthly-invoices">Monthly Invoices</NavLink></li>
                            </ul>
                        </li>

                      <li>
                        <a href="javascript: void(0);" className="waves-effect has-arrow">
                          <i className="bx bx-calculator"></i>
                          <span>Statements</span>
                        </a>
                        <ul className="sub-menu" aria-expanded="false">
                          <li><NavLink to="/statements">Tenant Statements</NavLink></li>
                        </ul>
                      </li>


                        {/* <li>
                            <NavLink to="/receipts" className="waves-effect">
                                <i className="mdi mdi-receipt"></i><span>Receipts</span>
                            </NavLink>
                        </li> */}

                        {/* <li>
                            <NavLink to="/trasactions" className="waves-effect">
                                <i className="mdi mdi-cash-multiple"></i>
                                <span>Transactions</span>
                            </NavLink>
                        </li> */}
                        <li>
                            <a href="javascript: void(0)" className="waves-effect has-arrow">
                                <i className="mdi mdi-shield-account-outline"></i>
                                <span>System Users</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><NavLink to="/adminlist">Users List</NavLink></li>
                                <li><NavLink to="/addadmin">Add a User</NavLink></li>
                                {/* <li><NavLink to="/updateuser">Update User</NavLink></li> */}
                                <li><NavLink to="/usertypes"> UserTypes</NavLink></li>
                            </ul>
                        </li>
                        {/* <li>
                            <a href="javascript: void(0)" className="waves-effect has-arrow">
                                <i className="bx bx-buildings"></i>
                                <span>Clients</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><NavLink to="/clienttypes">Client types</NavLink></li>
                            </ul>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><NavLink to="/clients">Clients</NavLink></li>
                            </ul>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><NavLink to="/addclient">Add a client</NavLink></li>
                            </ul>
                        </li> */}
                          <li>
                            <a href="javascript: void(0)" className="waves-effect has-arrow">
                                <i className="mdi mdi-cog-outline"></i>
                                <span>Set ups</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><NavLink to="/applicablecharges">Applicable Charges</NavLink></li>
                                <li><NavLink to="/premisetypes">Premise Types</NavLink></li>
                                <li><NavLink to="/premiseusetypes">Premise Use Types</NavLink></li>
                                <li><NavLink to="/unit-types">Unit Types</NavLink></li>
                                <li><NavLink to="/document-types">Attachable Documents</NavLink></li>
                                <li><NavLink to="/allroles">All roles </NavLink></li>
                                <li><NavLink to="/clientcounties">client Counties</NavLink></li>
                                <li><NavLink to="/zones">Zones</NavLink></li>
                                <li><NavLink to="/estates">Estate</NavLink></li>
                                <li><NavLink  to="/agreementtypes">Agreement Types</NavLink></li>
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