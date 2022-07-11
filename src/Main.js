import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/Header';
import SideBar from './components/SideBar';
import { Helmet } from 'react-helmet'
import Dashboard from './pages/Dashboard';
import Landlords from './pages/Landlords';
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
import ClientManagement from './pages/clients/ClientManagement';

import UpdateUser from './pages/admins/UpdateUser';
import UserTypes from './pages/admins/UserTypes';
import PremiseTypes from "./pages/setups/PremiseTypes";
import PremiseUseTypes from "./pages/setups/PremiseUseTypes";
import UnitTypes from "./pages/setups/UnitTypes";
import DocumentTypes from "./pages/setups/DocumentTypes";
function Main() {

  useEffect(() => {
    setTimeout(function () {
      localStorage.clear();
      window.location.reload();

    }, AuthService.getUserLoggedInAt() - Math.floor(Date.now()));

  }, []);

  return (
    <BrowserRouter>
      <div className="container-fluid p-0">
        {AuthService.getCurrentUserAccessToken() === null
          ?
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/recoverpassword" element={<RecoverPassword />} />
              <Route exact path="/resetpassword" element={<ResetPassword />} />
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
                  {/* premises */}
                  <Route path='/premisesregister' element={<PremisesRegister />} />
                  <Route path='/addpremises' element={<AddPremises />} />
                  {/* tenants  */}
                  <Route path='/alltenants' element={<AllTenants />} />
                  <Route path='/addtenant' element={<AddTenant />} />
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
                  {/* receipts */}
                  <Route path='/receipts' element={<Receipts />} />
                  {/* transactions  */}
                  <Route path='/trasactions' element={<Transactions />} />

                  {/* stystem users */}
                  <Route exact path='/adminlist' element={<AdminList />} />
                  <Route path='/addadmin' element={<AddAdmin />} />
                  <Route path='/allroles' element={<AllRoles />} />

                  {/* setup */}
                  <Route path='/clientcounties' element={<ClientCounties />} />

                  <Route exact path='/adminlist/edit/:id' element={<UpdateUser />} />
                  <Route path='/usertypes' element={<UserTypes />} />
                  <Route path='/clienttype' element={<ClientType/>} />

                  <Route path='/adminlist' element={<AdminList/>} />
                  <Route path='/addadmin' element={<AddAdmin/>} />
                  <Route path='/clienttypes' element={<ClientType/>} />
                  <Route path='/clients' element={<ClientManagement/>} />
                  <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
              </div>
          </>       
        }
      </div >
      <Helmet>
        {/* <!-- App js --> */}
        <script src="./assets/js/app.js "></script>
        <script src="./assets/js/custom.js "></script>
      </Helmet>
    </BrowserRouter >
  );
}

export default Main;
