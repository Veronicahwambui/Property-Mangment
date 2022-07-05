import {BrowserRouter, Route, Routes } from 'react-router-dom'
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

function Main() {
  return (
    <BrowserRouter>

      <div id="layout-wrapper" >
       <Header />
       <SideBar /> 
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
         </Routes>
      </div>
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
