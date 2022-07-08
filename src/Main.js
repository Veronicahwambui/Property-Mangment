import React, { useEffect } from "react";
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/Header';
import SideBar from './components/SideBar';
import {Helmet} from 'react-helmet'
import Dashboard from './pages/Dashboard';
import Landlords from './pages/Landlords';
import PremisesRegister from './pages/premises/PremisesRegister';
import AddPremises from './pages/premises/AddPremises';
import AllTenants from './pages/tenants/AllTenants';
import AddTenant from './pages/tenants/AddTenant';
import ApplicableCharges from './pages/setups/ApplicableCharges';
import Estate from './pages/setups/Estate';
import HouseTypes from './pages/setups/HouseTypes';
import Zones from './pages/setups/Zones';
import AttachableDocs from './pages/setups/AttachableDocs';
import CreateInvoice from './pages/invoices/CreateInvoice';
import Receipts from './pages/Receipts';
import Transactions from './pages/Transactions';
import AdminList from './pages/admins/AdminList';
import AddAdmin from './pages/admins/AddAdmin';
import CreateUser from './pages/setups/CreateUser';
import Login from './pages/auth/Login';
import RecoverPassword from './pages/auth/RecoverPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AuthService from './services/auth.service';

function Main() {
  // useEffect(() => {
  //   setTimeout(function () {
  //     localStorage.clear();
  //     window.location.reload();
  //
  //   }, new Date(AuthService.getUserLoggedInAt()) - Math.floor(Date.now()));
  //
  // }, []);

  return (
    <BrowserRouter>
      <div className="container-fluid p-0">
        {AuthService.getCurrentUserAccessToken() === null ?
          <div className="">
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/recoverpassword" element={<RecoverPassword />} />
              <Route exact path="/resetpassword" element={<ResetPassword />} />

              <Route path="*" element={<Navigate to="/login" />}></Route>

            </Routes>
          </div>
          :
          <>
            <div id={"layout-wrapper"}>
              <SideBar/>
              <Header/>
              <div className="main-content">
                <Routes>
                  {/* dashboard */}
                  <Route path='/' element={<Dashboard/>} />
                  {/* landlords */}
                  <Route path='/landlords' element={<Landlords/>} />
                  {/* premises */}
                  <Route path='/premisesregister' element={<PremisesRegister/>} />
                  <Route path='/addpremises' element={<AddPremises/>} />
                  {/* tenants  */}
                  <Route path='/alltenants' element={<AllTenants/>} />
                  <Route path='/addtenant' element={<AddTenant/>} />
                  {/* set ups  */}
                  <Route path='/applicablecharges' element={<ApplicableCharges/>} />
                  <Route path='/estates' element={<Estate/>} />
                  <Route path='/housetypes' element={<HouseTypes/>} />
                  <Route path='/zones' element={<Zones/>} />
                  <Route path='/attachabledocs' element={<AttachableDocs/>} />
                  {/* invoices */}
                  <Route path='/createinvoice' element={<CreateInvoice/>} />
                  {/* receipts */}
                  <Route path='/receipts' element={<Receipts/>} />
                  {/* transactions  */}
                  <Route path='/trasactions' element={<Transactions/>} />
                  {/* stystem users */}
                  <Route path='/adminlist' element={<AdminList/>} />
                  <Route path='/addadmin' element={<AddAdmin/>} />
                  <Route path='/createuser' element={<CreateUser/>} />
                  <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
              </div>
            </div>
            </>
        }
      </div>
      <Helmet>
    {/* <!-- App js --> */}
      <script src="./assets/js/app.js "></script>
      <script src="./assets/js/custom.js "></script>
      </Helmet>
    </BrowserRouter>
  );
}

export default Main;
