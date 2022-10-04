import React, { useEffect } from "react";
import { Route, Routes, Navigate, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Landlords from "./pages/landlords/Landlords";
import PremisesRegister from "./pages/premises/PremisesRegister";
import AddPremises from "./pages/premises/AddPremises";
import AllTenants from "./pages/tenants/AllTenants";
import AddTenant from "./pages/tenants/AddTenant";
import ApplicableCharges from "./pages/setups/ApplicableCharges";
import Estate from "./pages/setups/Estate";
import Zones from "./pages/setups/Zones";
import CreateInvoice from "./pages/invoices/CreateInvoice";
import Receipts from "./pages/statements/Receipts";
import Transactions from "./pages/Transactions";
import AdminList from "./pages/admins/AdminList";
import AddAdmin from "./pages/admins/AddAdmin";

import AllRoles from "./pages/setups/AllRoles";
import ClientCounties from "./pages/setups/ClientCounties";
import Login from "./pages/auth/Login";
import RecoverPassword from "./pages/auth/RecoverPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AuthService from "./services/auth.service";
import ClientType from "./pages/clients/ClientType";
import Clients from "./pages/clients/Clients";

import UpdateUser from "./pages/admins/UpdateUser";
import UserTypes from "./pages/admins/UserTypes";
import PremiseTypes from "./pages/setups/PremiseTypes";
import PremiseUseTypes from "./pages/setups/PremiseUseTypes";
import UnitTypes from "./pages/setups/UnitTypes";
import DocumentTypes from "./pages/setups/DocumentTypes";
import OnePremise from "./pages/premises/OnePremise";
import OneTenant from "./pages/tenants/OneTenant";
import LandLordAgreementTypes from "./pages/setups/LandLordAgreementTypes";
import AddLandlord from "./pages/landlords/AddLandlord";
import ViewLandlord from "./pages/landlords/ViewLandlord";
import NewClient from "./pages/clients/NewClient";
import { Helmet } from "react-helmet";
import OnePremiseUnit from "./pages/premises/OnePremiseUnit";
import ViewClient from "./pages/clients/ViewCLient";
import Invoices from "./pages/invoices/Invoices";
import PremiseTenancy from "./pages/premises/PremiseTenancy";
import UserDetails from "./pages/admins/UserDetails";
import InvoiceParent from "./pages/invoices/InvoicesParent";
import Statements from "./pages/statements/Statements";
import CreateIssueTypes from "./pages/setups/CreateIssueTypes";
import IssuesTypes from "./pages/setups/IssuesTypes";
import IssueType from "./pages/setups/IssueType";
import Messages from "./pages/messanger/Messages";
import MessageTemplates from "./pages/messanger/MessageTemplates";
import Emails from "./pages/messanger/Emails";
import Uploads from "./pages/Uploads";
import CustomMessage from "./pages/messanger/CustomMessage";
import BulkMessaging from "./pages/messanger/BulkMessaging";
import BulkInvoiving from "./pages/invoices/BulkInvoiving";
import BulkInvoices from "./pages/invoices/BulkInvoices";
import BulkMessagesList from "./pages/messanger/BulkMessagesList";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import AdminArrears from "./pages/Reports/AdminArrers";
import NewUnitsExpectedIncomeReport from "./pages/Reports/NewUnitsExpectedIncomeReport";
import OccupancyReport from "./pages/Reports/OccupancyReport";
import CreateDebitNote from "./pages/creditsDebits/CreateDebitNote";
import CreateCreditNote from "./pages/creditsDebits/CreateCreditNote";
import AllNotes from "./pages/creditsDebits/AllNotes";
import LandlordStatements from "./pages/statements/LandlordStatements";
import ViewLandlordStatement from "./pages/statements/ViewLandlordStatement";
import Settlements from "./pages/statements/Settlements";
import CreateStatement from "./pages/statements/CreateStatement";
import authLoginService from "./services/authLogin.service";
import UnallocatedPayments from "./pages/statements/UnallocatedPayments";

function Main() {
  useEffect(() => {
    setTimeout(function () {
      if (AuthService.getCurrentUserAccessToken() != null) {
        localStorage.clear();
        window.location.reload();
      }
    }, new Date(AuthService.getUserLoggedInAt()).getTime() - Date.now());
  }, []);

  return (
    <HashRouter>
      <div className="container-fluid p-0">
        {AuthService.getCurrentUserAccessToken() === null ? (
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/recoverpassword"
              element={<RecoverPassword />}
            />
            <Route
              exact
              path="/resetpassword/:id"
              element={<ResetPassword />}
            />

            <Route path="*" element={<Navigate to="/login" />}></Route>
          </Routes>
        ) : (
          <>
            {AuthService.getCurrentUserType() === "USER" && <SideBar />}
            <Header />
            <div className="main-content">
              {(AuthService.getCurrentUserType() === "LANDLORD" ||
                AuthService.getCurrentUserType() === "TENANT" ||
                AuthService.getCurrentUserType() === "USER") && (
                <Routes>
                  {/* dashboard */}
                  {AuthService.getCurrentUserType() === "USER" && (
                    <>
                      <Route path="/" element={<Dashboard />} />
                      {JSON.parse(localStorage.getItem("user"))?.userType
                        ?.name === "ADMIN" && (
                        <Route
                          path="/adminDashboard"
                          element={<AdminDashboard />}
                        />
                      )}
                      {/* landlords */}
                      <Route path="/landlords" element={<Landlords />} />
                      {/* premises */}
                      <Route
                        path="/premisesregister"
                        element={<PremisesRegister />}
                      />
                      <Route path="/addpremises" element={<AddPremises />} />
                      <Route path="/premise/:id" element={<OnePremise />} />
                      <Route
                        path="/premise/:id/:one"
                        element={<OnePremiseUnit />}
                      />
                      <Route
                        path="/premise/:id/:one"
                        element={<OnePremiseUnit />}
                      />
                      {/* tenants  */}
                      <Route path="/alltenants" element={<AllTenants />} />
                      <Route path="/addtenant" element={<AddTenant />} />
                      {/* set ups  */}
                      <Route
                        path="/applicablecharges"
                        element={<ApplicableCharges />}
                      />
                      <Route path="/estates" element={<Estate />} />
                      <Route path="/zones" element={<Zones />} />
                      <Route path="/premisetypes" element={<PremiseTypes />} />
                      <Route
                        path="/premiseusetypes"
                        element={<PremiseUseTypes />}
                      />
                      <Route path="/unit-types" element={<UnitTypes />} />
                      <Route
                        path="/document-types"
                        element={<DocumentTypes />}
                      />
                      {/* credit and debit notes  */}
                      <Route
                        path="/create-debit-note"
                        element={<CreateDebitNote />}
                      />
                      <Route
                        path="/create-credit-note"
                        element={<CreateCreditNote />}
                      />
                      <Route path="/notes" element={<AllNotes />} />
                      {/* invoices */}
                      <Route
                        path="/createinvoice"
                        element={<CreateInvoice />}
                      />
                      <Route path="/invoices" element={<Invoices />} />
                      <Route
                        path="/monthly-invoices"
                        element={<InvoiceParent />}
                      />
                      <Route path="/bulk-invoices" element={<BulkInvoices />} />
                      <Route
                        path="/bulk-invoicing"
                        element={<BulkInvoiving />}
                      />
                      {/* receipts */}
                      <Route path="/receipts" element={<Receipts />} />
                      {/* transactions  */}
                      <Route path="/trasactions" element={<Transactions />} />
                      {/* stystem users */}
                      <Route exact path="/adminlist" element={<AdminList />} />
                      <Route
                        exact
                        path="/adminlist/edit/:id"
                        element={<UpdateUser />}
                      />
                      <Route
                        exact
                        path="/adminlist/view/:id"
                        element={<UserDetails />}
                      />
                      <Route
                        exact
                        path="/userdetails/edit/:id"
                        element={<UserDetails />}
                      />
                      <Route path="/addadmin" element={<AddAdmin />} />
                      <Route path="/usertypes" element={<UserTypes />} />
                      <Route path="/allroles" element={<AllRoles />} />
                      {/* setup */}
                      <Route
                        path="/clientcounties"
                        element={<ClientCounties />}
                      />
                      <Route path="/clienttype" element={<ClientType />} />
                      <Route path="/adminlist" element={<AdminList />} />
                      <Route path="/addadmin" element={<AddAdmin />} />
                      <Route path="/clienttypes" element={<ClientType />} />
                      <Route path="/clients" element={<Clients />} />
                      <Route
                        path="/agreementtypes"
                        element={<LandLordAgreementTypes />}
                      />
                      <Route path="/addlandlord" element={<AddLandlord />} />
                      <Route path="/landlord/:id" element={<ViewLandlord />} />
                      <Route path="/addclient/" element={<NewClient />} />
                      <Route path="/client/:id" element={<ViewClient />} />
                      <Route path="/clients" element={<Clients />} />
                      <Route
                        path="/agreementtypes"
                        element={<LandLordAgreementTypes />}
                      />
                      <Route path="/addlandlord" element={<AddLandlord />} />
                      <Route path="/statements" element={<Statements />} />
                      <Route
                        path="/landord-statements"
                        element={<LandlordStatements />}
                      />
                      <Route
                        path="/create-issue-type"
                        element={<CreateIssueTypes />}
                      />
                      <Route path="/issuestypes" element={<IssuesTypes />} />
                      <Route path="/issuestypes/:id" element={<IssueType />} />
                      <Route path="/uploads" element={<Uploads />} />
                      {/* messageer  */}
                      <Route path="/messages" element={<Messages />} />
                      <Route
                        path="/createTemplate"
                        element={<MessageTemplates />}
                      />
                      <Route path="/emails" element={<Emails />} />
                      <Route
                        path="/custommessages"
                        element={<CustomMessage />}
                      />
                      <Route
                        path="/bulkmessaging"
                        element={<BulkMessaging />}
                      />
                      <Route
                        path="/bulkmessages"
                        element={<BulkMessagesList />}
                      />
                      <Route path="/admin-reports" element={<AdminArrears />} />
                      <Route
                        path="/newunits-reports"
                        element={<NewUnitsExpectedIncomeReport />}
                      />
                      <Route
                        path="/occupancy-reports"
                        element={<OccupancyReport />}
                      />
                      <Route path="/settlements" element={<Settlements />} />
                      <Route
                        path="/new-statement"
                        element={<CreateStatement />}
                      />{" "}
                      <Route
                        path="/unallocated-payments"
                        element={<UnallocatedPayments />}
                      />
                    </>
                  )}

                  {(AuthService.getCurrentUserType() === "TENANT" ||
                    AuthService.getCurrentUserType() === "USER") && (
                    <>
                      <Route path="/tenant/:id" element={<OneTenant />} />

                      <Route
                        path="/premise/tenant/:id"
                        element={<PremiseTenancy />}
                      />
                    </>
                  )}

                  {(AuthService.getCurrentUserType() === "LANDLORD" ||
                    AuthService.getCurrentUserType() === "USER") && (
                    <>
                      <Route
                        path="/landord-statements/:id"
                        element={<ViewLandlordStatement />}
                      />
                      <Route
                        exact
                        path="/landlord/:id"
                        element={<ViewLandlord />}
                      />
                    </>
                  )}

                  {AuthService.getCurrentUserType() === "USER" ? (
                    <Route path="*" element={<Navigate to="/" />}></Route>
                  ) : (
                    <>
                      {AuthService.getCurrentUserType() === "LANDLORD" ? (
                        <Route
                          path="*"
                          element={
                            <Navigate
                              to={
                                "/landlord/" +
                                authLoginService.getCurrentUserId()
                              }
                            />
                          }
                        />
                      ) : (
                        <Route
                          path="*"
                          element={
                            <Navigate
                              to={
                                "/tenant/" + authLoginService.getCurrentUserId()
                              }
                            />
                          }
                        />
                      )}
                    </>
                  )}
                </Routes>
              )}
            </div>
          </>
        )}
      </div>
      <Helmet>
        {/* the popper makes sure the bootstrap select works with bootstrap 5 */}
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js "
          integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49 "
          crossorigin="anonymous "
        ></script>

        {/* date picker plugin */}
        <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js "></script>

        {/* <!-- Bootstrap select --> */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js "></script>

        {/* <!-- Table Editable plugin --> */}
        <script src="./assets/libs/table-edits/build/table-edits.min.js "></script>
        <script src="./assets/js/pages/table-editable.int.js "></script>

        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin
        ></script>
        {/* data table plugin */}
        {/* <script src="assets/js/pages/datatables.init.js"></script> */}

        {/* <!-- jquery step --> */}
        <script src="./assets/libs/jquery-steps/build/jquery.steps.min.js"></script>
        <script src="./assets/js/pages/form-wizard.init.js"></script>

        {/* <!-- App js --> */}
        <script src="./assets/js/app.js "></script>
        <script src="./assets/js/custom.js "></script>
      </Helmet>
    </HashRouter>
  );
}

export default Main;
