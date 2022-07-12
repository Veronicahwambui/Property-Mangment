import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";

function OnePremise() {
  const [activeLink, setActiveLink] = useState(1);
  const [premiseData, setPremiseData] = useState({});
  const [docName , setDocName]= useState('')

  const { id } = useParams();
  const userId = id;

  const fetchAll = () => {
    requestsServiceService.viewPremise(userId).then((res) => {
      setPremiseData(res.data.data);
    });
  };
 
  const download =()=>{
       
     requestsServiceService.download(docName).then((res)=>{
        console.log(res);
     })
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="page-content">
      <div className="content-fluid">
        {/* <!-- start page title --> */}
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0 font-size-18">
                {premiseData.premise && premiseData.premise.premiseName}
              </h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="index.html">Dashboards</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="property-list.html">All Properties</a>
                  </li>
                  <li class="breadcrumb-item active">
                    {premiseData.premise && premiseData.premise.premiseName}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end page title --> */}

        {/* <!-- tool bar --> */}
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body pt-2 pb-3">
                <nav class="navbar navbar-expand-md navbar-white bg-white py-2">
                  <button
                    class="navbar-toggler btn btn-sm px-3 font-size-16 header-item waves-effect h-auto text-primary"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="mdi mdi-menu"></span>
                  </button>
                  <div
                    class="collapse navbar-collapse justify-content-between"
                    id="navbarNavAltMarkup"
                  >
                    <div class="navbar-nav">
                      <a
                        onClick={() => setActiveLink(1)}
                        class={
                          activeLink === 1
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Premises Details<span class="sr-only">urrent</span>
                      </a>
                      <a
                        onClick={() => setActiveLink(5)}
                        class={
                          activeLink === 5
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Units
                      </a>
                      <a
                        onClick={() => setActiveLink(2)}
                        class={
                          activeLink === 2
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Landlords
                      </a>
                      <a
                        onClick={() => setActiveLink(3)}
                        class={
                          activeLink === 3
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Documents
                      </a>
                      <a
                        onClick={() => setActiveLink(4)}
                        class={
                          activeLink === 4
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Caretakers
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end of tool bar --> */}

        {activeLink === 1 && (
             <div>
             <div className="row">
               <div className="col-xl-12">
                 <div className="card calc-h-3px">
                   <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                     <div
                       class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                       role="toolbar"
                     >
                       <div class="d-flex align-items-center flex-grow-1">
                         <h4 class="mb-0 m-0 bg-transparent">
                         Quick Stats on  {premiseData.premise && premiseData.premise.premiseName}
                         </h4>
                       </div>
                     
                     </div>
                   </div>
                   <div className="card-body">
                     <div className="col-12">
                      <div className="row">
                       <div className="col-3">
                        <label htmlFor="">Type</label>
                        <div>
                        <span>{premiseData.premise && premiseData.premise.premiseType.name}</span>
                        </div>
                       </div>
                       <div className="col-3">
                        <label htmlFor="">Use Type</label>
                        <div>
                        <span>{premiseData.premise && premiseData.premise.premiseUseType.name}</span>
                        </div>
                       </div>
                       <div className="col-3">
                        <label htmlFor="">Estate</label>
                        <div>
                        <span>{premiseData.premise && premiseData.premise.estate.name}</span>
                        </div>
                       </div>
                       <div className="col-3">
                        <label htmlFor="">Zone</label>
                        <div>
                        <span>{premiseData.premise && premiseData.premise.estate.zone.name}</span>
                        </div>
                       </div>
                     
                      </div>
                      <div className="row mt-5">
                       <div className="col-3">
                        <label htmlFor="">File Number</label>
                        <div>
                        <span>{premiseData.premise && premiseData.premise.fileNumber}</span>
                        </div>
                       </div>
                       <div className="col-3">
                        <label htmlFor="">Plot Number </label>
                        <div>
                        <span>{premiseData.premise && premiseData.premise.plotNumber}</span>
                        </div>
                       </div>
                       <div className="col-3">
                        <label htmlFor="">Physical Address</label>
                        <div>
                        <span>{premiseData.premise && premiseData.premise.address}</span>
                        </div>
                       </div>
                       <div className="col-3">
                        <label htmlFor="">Status</label>
                        <div>
                        <span>Active</span>
                        </div>
                       </div>
                     
                      </div>
                     </div>
                       </div>
                 </div>
               </div>
             </div>
           </div>
        )}

        {activeLink === 5 && (
          <div>
            <div className="row">
              <div className="col-xl-12">
                <div className="card calc-h-3px">
                  <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                    <div
                      class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                      role="toolbar"
                    >
                      <div class="d-flex align-items-center flex-grow-1">
                        <h4 class="mb-0 m-0 bg-transparent">
                          Charges and Unit types
                        </h4>
                      </div>
                    
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="col-12">
                      <div className="table-responsive">
                       <table class="table align-middle table-edits rent-invoicing dt-responsive" id="data-table">
                       <thead>
                           <tr class="text-uppercase table-dark">
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Unit Type</th>
                                                    <th>Status</th>
                                                </tr>
                                </thead>
                          <tbody>
                            {premiseData.premiseUnits && premiseData.premiseUnits.map((unit , index)=>(
                                  <tr data-id="1">
                                  <td>{index + 1}</td>
                                  <td>{unit.unitName}</td>
                                  <td>{unit.unitType.name}</td>
                                  <td>active</td>
                        </tr>
                            ))}
                        
                          </tbody>
                        </table>
                      </div>
                    </div>
                      </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeLink ===2 && (
             <div>
             <div className="row">
               <div className="col-xl-12">
                 <div className="card calc-h-3px">
                   <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                     <div
                       class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                       role="toolbar"
                     >
                       <div class="d-flex align-items-center flex-grow-1">
                         <h4 class="mb-0 m-0 bg-transparent">
                          LandLords
                         </h4>
                       </div>
                     
                     </div>
                   </div>
                   <div className="card-body">
                     <div className="col-12">
                       <div className="table-responsive">
                        <table class="table align-middle table-edits rent-invoicing dt-responsive" id="data-table">
                        <thead>
                            <tr class="text-uppercase table-dark">
                                                     <th>#</th>
                                                     <th>Name</th>
                                                     <th>Type</th>
                                                     <th>Phone No</th>
                                                     <th>Email</th>
                                                     <th>File No</th>
                                                     <th>Agreement Type</th>
                                                     <th>Percentage</th>
                                                     <th>Period</th>
                                                 </tr>
                                 </thead>
                           <tbody>
                             {premiseData.landLords && premiseData.landLords.map(( unit , index)=>(
                                   <tr data-id="1">
                                   <td>{index + 1}</td>
                                   <td>{unit.firstName}{" "}{ unit.lastName}</td>
                                   <td className="text-capitalize">{unit.landLordType.toLowerCase()}</td>
                                   <td>{unit.phoneNumber}</td>
                                   <td>{unit.email}</td>
                                   <td>{unit.fileNumber}</td>
                                   <td>{unit.landLordAgreementType.name}</td>
                                   <td>{unit.remunerationPercentage} {'%'}</td>
                                   <td>{unit.agreementPeriod}</td>
                         </tr>
                             ))}
                         
                           </tbody>
                         </table>
                       </div>
                     </div>
                       </div>
                 </div>
               </div>
             </div>
           </div>
        )}

        {activeLink === 3 && (
             <div>
             <div className="row">
               <div className="col-xl-12">
                 <div className="card calc-h-3px">
                   <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                     <div
                       class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                       role="toolbar"
                     >
                       <div class="d-flex align-items-center flex-grow-1">
                         <h4 class="mb-0 m-0 bg-transparent">
                          Documents
                         </h4>
                       </div>
                     
                     </div>
                   </div>
                   <div className="card-body">
                     <div className="col-12">
                       <div className="table-responsive">
                        <table class="table align-middle table-edits rent-invoicing dt-responsive" id="data-table">
                        <thead>
                            <tr class="text-uppercase table-dark">
                                                     <th>#</th>
                                                     <th>Name</th>
                                                     <th>Type</th>
                                                     <th>Owner type</th>
                                                 </tr>
                                 </thead>
                           <tbody>
                             {premiseData.premiseDocuments && premiseData.premiseDocuments.map(( unit , index)=>(
                                   <tr data-id="1">
                                   <td>{index + 1}</td>
                                   <td onClick={download} className="active nav-link cursor-pointer"><a> {unit.docName}</a></td>
                                   <td >{unit.documentType.name}</td>
                                   <td className="text-capitalize">{unit.documentOwnerType.toLowerCase()}</td>
                                   
                         </tr>
                             ))}
                         
                           </tbody>
                         </table>
                       </div>
                     </div>
                       </div>
                 </div>
               </div>
             </div>
           </div>
        )}

  {activeLink === 4 && (
             <div>
             <div className="row">
               <div className="col-xl-12">
                 <div className="card calc-h-3px">
                   <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                     <div
                       class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                       role="toolbar"
                     >
                       <div class="d-flex align-items-center flex-grow-1">
                         <h4 class="mb-0 m-0 bg-transparent">
                          Caretakers
                         </h4>
                       </div>
                     
                     </div>
                   </div>
                   <div className="card-body">
                     <div className="col-12">
                       <div className="table-responsive">
                        <table class="table align-middle table-edits rent-invoicing dt-responsive" id="data-table">
                        <thead>
                            <tr class="text-uppercase table-dark">
                                                     <th>#</th>
                                                     <th>Name</th>
                                                     <th>Type</th>
                                                     <th>Phone No</th>
                                                     <th>Email</th>
                                                     <th>Status</th>
                                                 </tr>
                                 </thead>
                           <tbody>
                             {premiseData.premiseCaretakers && premiseData.premiseCaretakers.map(( unit , index)=>(
                                   <tr data-id="1">
                                   <td>{index + 1}</td>
                                   <td>{unit.firstName}{" "}{ unit.lastName}</td>
                                   <td className="text-capitalize">{unit.landLordType}</td>
                                   <td>{unit.phoneNumber}</td>
                                   <td>{unit.email}</td>
                                   <td>{'Active'}</td>
                                  
                         </tr>
                             ))}
                         
                           </tbody>
                         </table>
                       </div>
                     </div>
                       </div>
                 </div>
               </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}

export default OnePremise;
