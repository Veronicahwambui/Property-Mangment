import React, { useEffect } from "react";
import { Route, Routes, Navigate, HashRouter } from 'react-router-dom'
import Header from './components/Header';
import SideBar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import Landlords from './pages/landlords/Landlords';
import PremisesRegister from './pages/premises/PremisesRegister';
import AddPremises from './pages/premises/AddPremises';
import AllTenants from './pages/tenants/AllTenants';
import AddTenant from './pages/tenants/AddTenant';
import ApplicableCharges from './pages/setups/ApplicableCharges';
import Estate from './pages/setups/Estate';
import Zones from './pages/setups/Zones';
import CreateInvoice from './pages/invoices/CreateInvoice';
import Receipts from './pages/Receipts';
import Transactions from './pages/Transactions';
import AdminList from './pages/admins/AdminList';
import AddAdmin from './pages/admins/AddAdmin';
import AllRoles from './pages/setups/AllRoles';
import ClientCounties from './pages/setups/ClientCounties';
import Login from './pages/auth/Login';
import RecoverPassword from './pages/auth/RecoverPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AuthService from './services/auth.service';
import ClientType from './pages/clients/ClientType';
import Clients from './pages/clients/Clients';

import UpdateUser from './pages/admins/UpdateUser';
import UserTypes from './pages/admins/UserTypes';
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

function Main() {

  useEffect(() => {
    setTimeout(function () {

      if (AuthService.getCurrentUserAccessToken() != null) {
        localStorage.clear();
        window.location.reload();
      }
    }, AuthService.getUserLoggedInAt() - Math.floor(Date.now()));

    console.log(Math.floor(Date.now()) - AuthService.getUserLoggedInAt());
  }, []);

  return (
    <HashRouter>
      <div className="container-fluid p-0">
        {AuthService.getCurrentUserAccessToken() === null
          ?
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/recoverpassword" element={<RecoverPassword />} />
            <Route exact path="/resetpassword/:id" element={<ResetPassword />} />

            <Route path="*" element={<Navigate to="/login" />}></Route>

          </Routes>
          :
          <>
            <SideBar />
            <Header />
            <div className="main-content">
              <Routes>
                {/* dashboard */}
                <Route path='/' element={<Dashboard />} />
                {/* landlords */}
                <Route path='/landlords' element={<Landlords />} />
                <Route exact path='/landlord/:id' element={<ViewLandlord />} />
                {/* premises */}
                <Route path='/premisesregister' element={<PremisesRegister />} />
                <Route path='/addpremises' element={<AddPremises />} />
                <Route path='/premise/:id' element={<OnePremise />} />
                <Route path='/premise/:id/:one' element={<OnePremiseUnit />} />
                <Route path='/premise/tenant/:id' element={<PremiseTenancy />} />
                <Route path='/premise/:id/:one' element={<OnePremiseUnit />} />

                {/* tenants  */}
                <Route path='/alltenants' element={<AllTenants />} />
                <Route path='/addtenant' element={<AddTenant />} />
                <Route path='/tenant/:id' element={<OneTenant />} />

                {/* set ups  */}
                <Route path='/applicablecharges' element={<ApplicableCharges />} />
                <Route path='/estates' element={<Estate />} />
                <Route path='/zones' element={<Zones />} />
                <Route path='/premisetypes' element={<PremiseTypes />} />
                <Route path='/premiseusetypes' element={<PremiseUseTypes />} />
                <Route path='/unit-types' element={<UnitTypes />} />
                <Route path='/document-types' element={<DocumentTypes />} />
                {/* invoices */}
                <Route path='/createinvoice' element={<CreateInvoice />} />
                <Route path='/invoices' element={<Invoices />} />
                <Route path='/monthly-invoices' element={<InvoiceParent />} />
                {/* receipts */}
                <Route path='/receipts' element={<Receipts />} />
                {/* transactions  */}
                <Route path='/trasactions' element={<Transactions />} />

                {/* stystem users */}

                <Route exact path='/adminlist' element={<AdminList />} />
                <Route exact path='/adminlist/edit/:id' element={<UpdateUser />} />
                <Route exact path='/adminlist/view/:id' element={<UserDetails />} />
                <Route exact path='/userdetails/edit/:id' element={<UserDetails />} />
                <Route path='/addadmin' element={<AddAdmin />} />
                <Route path='/usertypes' element={<UserTypes />} />

                <Route path='/allroles' element={<AllRoles />} />

                {/* setup */}
                <Route path='/clientcounties' element={<ClientCounties />} />

                <Route path='/clienttype' element={<ClientType />} />

                <Route path='/adminlist' element={<AdminList />} />
                <Route path='/addadmin' element={<AddAdmin />} />
                <Route path='/clienttypes' element={<ClientType />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/agreementtypes' element={<LandLordAgreementTypes />} />
                <Route path='/addlandlord' element={<AddLandlord />} />
                <Route path='/landlord/:id' element={<ViewLandlord />} />
                <Route path='/addclient/' element={<NewClient />} />
                <Route path='/client/:id' element={<ViewClient />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/agreementtypes' element={<LandLordAgreementTypes />} />
                <Route path='/addlandlord' element={<AddLandlord />} />
                <Route path='/landlord/:id' element={<ViewLandlord />} />

                <Route path="*" element={<Navigate to="/" />}></Route>
              </Routes>
            </div>
          </>
        }
      </div >

      <Helmet>


        {/* the popper makes sure the bootstrap select works with bootstrap 5 */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js " integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49 " crossorigin="anonymous "></script>

        {/* date picker plugin */}
        <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js "></script>

        {/* <!-- Bootstrap select --> */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js "></script>


        {/* <!-- Table Editable plugin --> */}
        <script src="./assets/libs/table-edits/build/table-edits.min.js "></script>
        <script src="./assets/js/pages/table-editable.int.js "></script>

        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin></script>
        {/* data table plugin */}
        <script src="./assets/js/pages/datatables.init.js"></script>

        {/* <!-- jquery step --> */}
        <script src="./assets/libs/jquery-steps/build/jquery.steps.min.js"></script>
        <script src="./assets/js/pages/form-wizard.init.js"></script>


        {/* <!-- App js --> */}
        <script src="./assets/js/app.js "></script>
        <script src="./assets/js/custom.js "></script>
      </Helmet>

    </HashRouter >
  );
}

export default Main;
