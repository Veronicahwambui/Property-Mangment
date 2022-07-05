import {HashRouter } from 'react-router-dom'
import Header from './components/Header';
import SideBar from './components/SideBar';
import {Helmet} from 'react-helmet'

function Main() {
  return (
    <HashRouter>

      <div id="layout-wrapper" >
       <Header />
       <SideBar /> 
      <div className="main-content">

      </div>
      </div>
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

    {/* <!-- numerals number formater --> */}
    <script src="assets/libs/numeral/numeral.js "></script>

    {/* <!-- apexcharts --> */}
    <script src="assets/libs/apexcharts/apexcharts.min.js "></script>


    {/* <!-- dashboard init --> */}
    <script src="assets/js/pages/index-dashboard.init.js "></script>

    {/* <!-- Saas dashboard init --> */}
    <script src="assets/js/pages/saas-dashboard.init.js"></script>



    {/* <!-- App js --> */}
   
      <script src="./assets/js/app.js "></script>
      <script src="./assets/js/custom.js "></script>
      </Helmet>
    </HashRouter>
  );
}

export default Main;
