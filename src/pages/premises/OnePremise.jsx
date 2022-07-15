import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import axios from "axios";

function OnePremise() {
  const [activeLink, setActiveLink] = useState(1);
  const [premiseData, setPremiseData] = useState({});
  const [docName , setDocName]= useState('')
  const [ premiseUnits , setPremiseUnits ]= useState([])
  const [caretakers ,setCaretakers] = useState([])
  const [caretakerId ,setCaretakerId] = useState('')
  const [update , setUpdate]= useState({
    premType: '',
    premUseType: '',
    estate: '',
    fileNo: '',
    plotNo: '',
    address: '',
    premNmae: '',
  })
 

  const { id } = useParams();
  const userId = id;

  const fetchAll = () => {
    requestsServiceService.viewPremise(userId).then((res) => {
      setPremiseData(res.data.data);
      setPremiseUnits(res.data.data.premiseUnits)
      setCaretakers(res.data.data.premiseCaretakers)
      setUpdate({...update , 
      
        premType: res.data.data.premise.premiseType.id,
        premUseType: res.data.data.premise.premiseUseType.id,
        estate: res.data.data.premise.estate.id,
        fileNo: res.data.data.premise.fileNumber,
        plotNo: res.data.data.premise.plotNumber,
        address: res.data.data.premise.address,
        premNmae: res.data.data.premise.premiseName,
      })
    });
  };
 
  const download =()=>{
       
     requestsServiceService.download(docName).then((res)=>{
        console.log(res);
     })
  }

  useEffect(() => {
    fetchAll();
    caretakerTypes()
  }, []);

  const [PremiseTypes ,setPremiseTypes] = useState([])
  const [PremiseUseTypes ,setPremiseUseTypes] = useState([])
  const [Estates ,setEstates] = useState([])

  const fetchUpdateData = () => {
     
    requestsServiceService.allPremiseTypes().then((res)=>{
            setPremiseTypes(res.data.data)
    })
    requestsServiceService.allPremiseUseTypes().then((res)=>{
            setPremiseUseTypes(res.data.data)
    })
    requestsServiceService.getAllEstates().then((res)=>{
            setEstates(res.data.data)
    })
  }




 const  handleChange =(event)=>{
  setUpdate({
    ...update , [event.target.name]: event.target.value
  })
 }

 console.log(update);
 
 const updatePrem = () => {
   let data = JSON.stringify({
    
      active: premiseData.premise.active,
      address: update.address,
      estateId: update.estate,
      fileNumber: update.fileNo,
      id: userId,
      landLordId: [
        
      ],
      landlordFileNumber: [
        
      ],
      plotNumber: update.plotNo,
      premiseName: update.premNmae,
      premiseTypeId: update.premType,
      premiseUseTypeId: update.premUseType
    
   })
  requestsServiceService.updatePremise( userId ,data).then(()=>{
    fetchAll()
  })
 }


  // premise caretakers stuff


  const [caretypes , setCareTypes]= useState()
  
   const [newCaretaker , setNewCaretaker] = useState(  {
    caretakerTypeName: '',
    email: "",
    firstName: "",
    gender: "",
    idNumber: "",
    lastName: "",
    otherName: "",
    phoneNumber: "",

  })

   const [updateCaretaker , setUpdateCaretaker] = useState(  {
    caretakerTypeName: 'SELF_COMMISSIONED',
    email: "q@gmail.com",
    firstName: "res",
    gender: "res",
    idNumber: "2424",
    lastName: "rere",
    otherName: "sf",
    phoneNumber: "dgd",
  })

  const updateUpdate = (a ,b, c, d, i ,f ,e , g, h)=>{
    setUpdateCaretaker({
      ...updateCaretaker ,

      caretakerTypeName: a,
      email: b,
      firstName: c,
      gender: d,
      idNumber: i,
      lastName: f,
      otherName: g,
      phoneNumber: h,
    })
  }
 
  const hadleUpdateCaretaker = (event)=>{
    setUpdateCaretaker({
      ...updateCaretaker , [event.target.name] : event.target.value
    })
  }
  
  
  const hadleCaretaker = (event)=>{
    setNewCaretaker({
      ...newCaretaker , [event.target.name] : event.target.value
    })
  }
  
 console.log(newCaretaker);
  const caretakerTypes = ()=>{
    requestsServiceService.caretakerTypes().then((res)=>{
      setCareTypes(res.data.data)
    })
  }

  const  getCaretakers = ()=>{
    requestsServiceService.allCareTakers(userId).then((res)=>{
       setCaretakers( res.data.data )
    })
  }

  const createCaretaker = ()=>{  

    let data = JSON.stringify(
      {
        active: true,
        caretakerTypeName: newCaretaker.caretakerTypeName,
        email: newCaretaker.email,
        firstName: newCaretaker.firstName,
        gender: newCaretaker.gender,
        id: null,
        idNumber: newCaretaker.idNumber,
        lastName: newCaretaker.lastName,
        otherName: newCaretaker.otherName,
        phoneNumber: newCaretaker.phoneNumber,
        premiseId: userId
      }
    )
    requestsServiceService.createCaretaker(userId , data ).then(()=>{
        getCaretakers()
    })
  }
  
   const toggleCare = ()=>{
     requestsServiceService.toggleCaretaker(userId, caretakerId).then(()=>{
      getCaretakers()   
     })
   }
 
   const updateCare = ()=>{  

    let data = JSON.stringify(
      {
        active: true,
        caretakerTypeName: updateCaretaker.caretakerTypeName,
        email: updateCaretaker.email,
        firstName: updateCaretaker.firstName,
        gender: updateCaretaker.gender,
        id: caretakerId,
        idNumber: updateCaretaker.idNumber,
        lastName: updateCaretaker.lastName,
        otherName: updateCaretaker.otherName,
        phoneNumber: updateCaretaker.phoneNumber,
        premiseId: userId
      }
    )
    requestsServiceService.updateCaretaker(userId , caretakerId , data ).then(()=>{
        getCaretakers()
    })
  }


  // premise unit stuff 


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
                          Quick Stats on{" "}
                          {premiseData.premise &&
                            premiseData.premise.premiseName}
                          <span className="badge badge-pill badge-soft-success font-size-11">
                            Active
                          </span>
                        </h4>
                      </div>
                      <div className="d-flex align-items-center flex-grow-1"></div>
                      <div className="d-flex">
                        <button
                          type="button"
                          onClick={fetchUpdateData}
                          data-bs-toggle="modal"
                          data-bs-target="#edit-premise-detail"
                          className="btn btn-primary dropdown-toggle option-selector"
                        >
                          <i className="dripicons-plus font-size-16"></i>{" "}
                          <span className="pl-1 d-md-inline">
                            Edit Premise details
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3">
                          <label htmlFor="">Type</label>
                          <div>
                            <span>
                              {premiseData.premise &&
                                premiseData.premise.premiseType.name}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Use Type</label>
                          <div>
                            <span>
                              {premiseData.premise &&
                                premiseData.premise.premiseUseType.name}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Estate</label>
                          <div>
                            <span>
                              {premiseData.premise &&
                                premiseData.premise.estate.name}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Zone</label>
                          <div>
                            <span>
                              {premiseData.premise &&
                                premiseData.premise.estate.zone.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-3">
                          <label htmlFor="">File Number</label>
                          <div>
                            <span>
                              {premiseData.premise &&
                                premiseData.premise.fileNumber}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Plot Number </label>
                          <div>
                            <span>
                              {premiseData.premise &&
                                premiseData.premise.plotNumber}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Physical Address</label>
                          <div>
                            <span>
                              {premiseData.premise &&
                                premiseData.premise.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="modal fade"
              id="edit-premise-detail"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              role="dialog"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div class="modal-content">
                  <div class="modal-body">
                    <div className="row">
                      <div className="form-group">
                        <label htmlFor="">Premise Name</label>
                        <input
                          type="text"
                          className="form-control" 
                          value={update.premNmae}
                          onChange={handleChange}
                          name="premName"
                        />
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="">Premise Type</label>
                          <select
                            className="form-control"
                            onChange={handleChange}
                            name="premType"
                            
                          >
                          
                            {PremiseTypes.map((prem) => (
                              <option
                                value={prem.id}
                                className="text-black font-semibold "
                                selected={ prem.id === update.premType ? "selected" : ''}
                              >
                                {prem.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Premise Use Type</label>
                          <select
                            className="form-control"
                            onChange={handleChange}
                            name="premUseType"
                          >
                          
                            {PremiseUseTypes.map((prem) => (
                              <option
                                value={prem.id}
                                className="text-black font-semibold "
                                selected={ prem.id === update.premUseType ? "selected" : ''}
                              >
                                {prem.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Estate</label>
                          <select
                            className="form-control"
                            onChange={handleChange}
                            name="estate"
                          >
                            <option className="text-black font-semibold ">
                              {premiseData.premise &&
                                premiseData.premise.estate.name}
                            </option>
                            {Estates.map((prem) => (
                              <option
                                value={prem.id}
                                className="text-black font-semibold "
                              >
                                {prem.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="">File Number</label>
                          <input
                            type="text"
                            className="form-control"
                          value={update.fileNo}

                            onChange={handleChange}
                            name="fileNo"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Plot Number</label>
                          <input
                            type="text"
                            className="form-control"
                          value={update.plotNo}

                            onChange={handleChange}
                            name="plotNo"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Address</label>
                          <input
                            type="text"
                            className="form-control"
                          value={update.address}
                            
                            onChange={handleChange}
                            name="address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() => updatePrem()}
                    >
                      Update
                    </button>
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
                        <table
                          class="table align-middle table-edits rent-invoicing dt-responsive"
                          id="data-table"
                        >
                          <thead>
                            <tr class="text-uppercase table-dark">
                              <th>#</th>
                              <th>Name</th>
                              <th>Unit Type</th>
                              <th>Status</th>
                              <th className="text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {premiseUnits &&
                              premiseUnits.map((unit, index) => (
                                <tr data-id="1">
                                  <td>{index + 1}</td>
                                  <td>{unit.unitName}</td>
                                  <td>{unit.unitType.name}</td>
                                  <td>
                                    {" "}
                                    {unit.active ? (
                                      <span class="badge-soft-success badge">
                                        Active
                                      </span>
                                    ) : (
                                      <span class="badge-soft-danger badge">
                                        Inactive
                                      </span>
                                    )}
                                  </td>
                                  <td className="text-right cell-change">
                                    {" "}
                                    <a
                                      className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-premise-unit"
                                      title="Edit"
                                    >
                                      <i className="bx bx-edit-alt " />
                                    </a>
                                  </td>
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

        {activeLink === 2 && (
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
                        <h4 class="mb-0 m-0 bg-transparent">LandLords</h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="col-12">
                      <div className="table-responsive">
                        <table
                          class="table align-middle table-edits rent-invoicing dt-responsive"
                          id="data-table"
                        >
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
                            {premiseData.landLords &&
                              premiseData.landLords.map((unit, index) => (
                                <tr data-id="1">
                                  <td>{index + 1}</td>
                                  <td>
                                    {unit.firstName} {unit.lastName}
                                  </td>
                                  <td className="text-capitalize">
                                    {unit.landLordType.toLowerCase()}
                                  </td>
                                  <td>{unit.phoneNumber}</td>
                                  <td>{unit.email}</td>
                                  <td>{unit.fileNumber}</td>
                                  <td>{unit.landLordAgreementType.name}</td>
                                  <td>
                                    {unit.remunerationPercentage} {"%"}
                                  </td>
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
                        <h4 class="mb-0 m-0 bg-transparent">Documents</h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="col-12">
                      <div className="table-responsive">
                        <table
                          class="table align-middle table-edits rent-invoicing dt-responsive"
                          id="data-table"
                        >
                          <thead>
                            <tr class="text-uppercase table-dark">
                              <th>#</th>
                              <th>Name</th>
                              <th>Type</th>
                              <th>Owner type</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {premiseData.premiseDocuments &&
                              premiseData.premiseDocuments.map(
                                (unit, index) => (
                                  <tr data-id="1">
                                    <td>{index + 1}</td>
                                    <td className="active nav-link cursor-pointer">
                                      <a onClick={() => download}>
                                        {" "}
                                        {unit.docName}
                                      </a>
                                    </td>
                                    <td>{unit.documentType.name}</td>
                                    <td className="text-capitalize">
                                      {unit.documentOwnerType.toLowerCase()}
                                    </td>
                                  </tr>
                                )
                              )}
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
                        <h4 class="mb-0 m-0 bg-transparent">Caretakers</h4>
                      </div>
                      <div className="d-flex align-items-center flex-grow-1"></div>
                      <div className="d-flex">
                        <button
                          type="button"
                          //  onClick={fetchUpdateData}
                          data-bs-toggle="modal"
                          data-bs-target="#edit-caretaker"
                          className="btn btn-primary dropdown-toggle option-selector"
                        >
                          <i className="dripicons-plus font-size-16"></i>{" "}
                          <span className="pl-1 d-md-inline">
                            New Caretaker
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="col-12">
                      <div className="table-responsive">
                        <table
                          class="table align-middle table-edits rent-invoicing dt-responsive"
                          id="data-table"
                        >
                          <thead>
                            <tr class="text-uppercase table-dark">
                              <th>#</th>
                              <th>Name</th>
                              <th>Type</th>
                              <th>Phone No</th>
                              <th>Email</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {caretakers &&
                              caretakers.map((unit, index) => (
                                <tr data-id="1">
                                  <td>{index + 1}</td>
                                  <td>
                                    {unit.firstName} {unit.lastName}
                                  </td>
                                  <td className="text-capitalize">
                                    {unit.caretakerType}
                                  </td>
                                  <td>{unit.phoneNumber}</td>
                                  <td>{unit.email}</td>
                                  <td>
                                    {" "}
                                    {unit.active ? (
                                      <span class="badge-soft-success badge">
                                        Active
                                      </span>
                                    ) : (
                                      <span class="badge-soft-danger badge">
                                        Inactive
                                      </span>
                                    )}
                                  </td>
                                  <td class="text-right cell-change text-nowrap ">
                                    <div className="d-flex">
                                      <a
                                        class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-care"
                                        title="Edit"
                                        onClick={() =>{
                                          setCaretakerId(unit.id); updateUpdate(unit.caretakerType, unit.email,unit.firstName ,unit.gender,unit.idNumber ,unit.lastName ,unit.otherName ,unit.phoneNumber )}
                                        }
                                      >
                                        <i class="bx bx-edit-alt "></i>
                                      </a>
                                      {unit.active ? (
                                        <button
                                          class="btn btn-danger btn-sm  text-uppercase px-2 mx-3"
                                          title="deactivate"
                                          data-bs-toggle="modal"
                                          data-bs-target="#confirm-deactivate"
                                          onClick={() =>{
                                            setCaretakerId(unit.id); toggleCare()}
                                          }
                                        >
                                          Deactivate
                                        </button>
                                      ) : (
                                        <button
                                          class="btn btn-success btn-sm w-5 text-uppercase px-3 mx-3"
                                          title="deactivate"
                                          data-bs-toggle="modal"
                                          data-bs-target="#confirm-activate"
                                          onClick={() => {
                                            setCaretakerId(unit.id); toggleCare()}
                                          }
                                        >
                                          Activate
                                        </button>
                                      )}
                                    </div>
                                  </td>
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

            {/* modals  */}
            <div
              class="modal fade"
              id="edit-caretaker"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              role="dialog"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <div className="row">
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor=""> First Name</label>
                          <input type="text"  className="form-control"  value={newCaretaker.firstName} onChange={hadleCaretaker} name="firstName"/>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor=""> Last Name</label>
                          <input type="text" className="form-control"  value={newCaretaker.lastName} onChange={hadleCaretaker} name='lastName' />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor="">Other Name</label>
                          <input type="text" className="form-control" value={newCaretaker.otherName} onChange={hadleCaretaker} name='otherName' />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor=""> Phone No</label>
                          <input type="text" className="form-control" value={newCaretaker.phoneNumber} onChange={hadleCaretaker} name="phoneNumber" />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor=""> ID No</label>
                          <input type="text" className="form-control" value={newCaretaker.idNumber} onChange={hadleCaretaker} name='idNumber' />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor="">Email</label>
                          <input type="text" className="form-control" value={newCaretaker.email} onChange={hadleCaretaker} name="email" />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="">Caretaker Type</label>
                          <select name="caretakerTypeName"  className="form-control" onChange={hadleCaretaker }>
                            <option value=""> Select Type</option>
                            { caretypes && caretypes.map((type)=>(
                            <option value={type}> {type} </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <label htmlFor="" className="">
                          Gender: <strong className="text-danger">*</strong>
                        </label>
                        <div className="d-flex mt-2">
                          <div className="form-check mb-3 pr-15px">
                            <input
                              className="form-check-input"
                              type="radio"
                              value="Male"
                              name="gender"
                              id="formRadios1"
                              onChange={hadleCaretaker }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="formRadios1"
                            >
                              Male
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value="Female"
                              name="gender"
                              id="formRadios2"
                              onChange={hadleCaretaker }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="formRadios2"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      // onClick={()=>deactivate(activeId)}
                      onClick={createCaretaker}
                    >
                      create
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* updte modal */}

            <div
              class="modal fade"
              id="edit-care"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              role="dialog"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <div className="row">
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor=""> First Name</label>
   
                          <input type="text"  className="form-control"  value={updateCaretaker.firstName} onChange={hadleUpdateCaretaker } name="firstName"/>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor=""> Last Name</label>
                          <input type="text" className="form-control"  value={updateCaretaker.lastName} onChange={hadleUpdateCaretaker } name='lastName' />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor="">Other Name</label>
                          <input type="text" className="form-control" value={updateCaretaker.otherName} onChange={hadleUpdateCaretaker } name='otherName' />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor=""> Phone No</label>
                          <input type="text" className="form-control" value={updateCaretaker.phoneNumber} onChange={hadleUpdateCaretaker } name="phoneNumber" />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor=""> ID No</label>
                          <input type="text" className="form-control" value={updateCaretaker.idNumber} onChange={hadleUpdateCaretaker } name='idNumber' />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor="">Email</label>
                          <input type="text" className="form-control" value={updateCaretaker.email} onChange={hadleUpdateCaretaker } name="email" />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="">Caretaker Type</label>
                          <select name="caretakerTypeName" id="" className="form-control" onChange={hadleUpdateCaretaker }>
                            { caretypes && caretypes.map((type)=>(

                            <option  selected={ type === updateCaretaker.caretakerTypeName ? "selected" : ''}  value={type} >{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <label htmlFor="" className="">
                          Gender: <strong className="text-danger">*</strong>
                        </label>
                        <div className="d-flex mt-2">
                          <div className="form-check mb-3 pr-15px">
                            <input
                              className="form-check-input"
                              type="radio"
                              value="Male"
                              name="gender"
                              id="formRadios1"
                              onChange={hadleUpdateCaretaker}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="formRadios1"
                            >
                              Male
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value="Female"
                              name="gender"
                              id="formRadios2"
                              onChange={hadleUpdateCaretaker}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="formRadios2"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      // onClick={()=>deactivate(activeId)}
                      onClick={updateCare}
                    >
                      create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      <Helmet>
        {/* <!-- Table Editable plugin --> */}
        <script src="./assets/libs/table-edits/build/table-edits.min.js "></script>
        <script src="./assets/js/pages/table-editable.int.js "></script>

        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin
        ></script>
        {/* data table plugin */}
        <script src="./assets/js/pages/datatables.init.js"></script>

        {/* <!-- jquery step --> */}
        <script src="./assets/libs/jquery-steps/build/jquery.steps.min.js"></script>
        <script src="./assets/js/pages/form-wizard.init.js"></script>

        {/* <!-- App js --> */}
        <script src="./assets/js/app.js "></script>
        <script src="./assets/js/custom.js "></script>
      </Helmet>
    </div>
  );
}

export default OnePremise;
