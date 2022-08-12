/* global $ */

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import authService from "../../services/auth.service";
import { Modal, Button } from "react-bootstrap";
import { baseUrl } from "../../services/API";

function OnePremise() {
  const [activeLink, setActiveLink] = useState(JSON.parse(sessionStorage.getItem('activeId')));
  const [failedLandlordUploads, setFailedLandlordUploads] = useState([])
  const [premiseData, setPremiseData] = useState({});
  const [premiseUnits, setPremiseUnits] = useState([])
  const [landlordData, setLandlordData] = useState('')
  const [premiseCharges, setPremiseCharges] = useState([])
  const [caretakers, setCaretakers] = useState([])
  const [caretakerId, setCaretakerId] = useState('')
  const [update, setUpdate] = useState({
    premType: '',
    premUseType: '',
    estate: '',
    fileNo: '',
    plotNo: '',
    address: '',
    premNmae: '',
    premStatus: '',
    freq: ''
  })
  const [error, setError] = useState({
    message: "",
    color: ""
  });

  // document details
  const [docName, setdocName] = useState("")
  const [userDocument, setdocument] = useState("")
  const [documentTypeId, setdocumentTypeId] = useState(null)
  const [stat, setStat] = useState('')
  //modals
  const [show, setShow] = useState(false);
  const [docShow, setdocShow] = useState(false);
  const [documentTypes, setdocumentTypes] = useState([])


  const [editAccountShow, seteditAccountShow] = useState(false);
  const [editDocShow, seteditDocShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDocShow = () => setdocShow(true);
  const handleDocClose = () => setdocShow(false);

  const handleEditShow = () => seteditDocShow(true);
  const handleEditClose = () => seteditDocShow(false);


  // doc 

  const handleDocumentSubmit = (event) => {
    event.preventDefault();

    handleDocClose();
  }

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setdocument(base64);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  // setting active id
  const use = () => {
    sessionStorage.setItem("activeId", activeLink)
  }
  const setIS = () => {
    let id = JSON.parse(sessionStorage.getItem('activeId'))
    if (id === null) {
      setActiveLink(1)
    } else {
      setActiveLink(id)
    }
  }

  useEffect(() => {

    use()
    setIS()
    return () => {
      sessionStorage.setItem("activeId", 1)
    }
  }, [activeLink])
  // setting active id end 

  const { id } = useParams();
  const userId = id;



  const download = () => {

    requestsServiceService.download(docName).then((res) => {
      console.log(res);
    })
  }

  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    fetchAll();
    caretakerTypes();
    findUnitTypes();
    findAllCharges();
    findAllPremiseUnits();
    getchargeConstraint();
    fetchApplicableCharges();
    getClientAccounts();
    requestsServiceService.getTenancyStatuses().then((res) => {
      setStatuses(res.data.data)
    })

    requestsServiceService.getDocumentTypes().then((res) => {
      setdocumentTypes(res.data.data);
    })

  }, []);

  const fetchAll = () => {
    requestsServiceService.viewPremise(userId).then((res) => {
      setPremiseData(res.data.data);
      setPremiseUnits(res.data.data.premiseUnits)
      setPremiseCharges(res.data.data.defaultpPremiseUnitTypeCharges)
      setCaretakers(res.data.data.premiseCaretakers)
      setUpdate({
        ...update,
        premType: res.data.data.premise.premiseType.id,
        premUseType: res.data.data.premise.premiseUseType.id,
        estate: res.data.data.premise.estate.id,
        fileNo: res.data.data.premise.fileNumber,
        plotNo: res.data.data.premise.plotNumber,
        address: res.data.data.premise.address,
        premNmae: res.data.data.premise.premiseName,
      })
      setLandlordData(res.data.data.landLords[0].landLord.fileNumber)
    })
  };


  const [PremiseTypes, setPremiseTypes] = useState([])
  const [PremiseUseTypes, setPremiseUseTypes] = useState([])
  const [Estates, setEstates] = useState([])

  const fetchUpdateData = () => {

    requestsServiceService.allPremiseTypes().then((res) => {
      setPremiseTypes(res.data.data)
    })
    requestsServiceService.allPremiseUseTypes().then((res) => {
      setPremiseUseTypes(res.data.data)
    })
    requestsServiceService.getAllEstates().then((res) => {
      setEstates(res.data.data)
    })
  }


  const togglePrem = () => {
    requestsServiceService.toggleThePremise(userId).then(() => {
      fetchAll();
    })
  }



  const handleChange = (event) => {
    setUpdate({
      ...update, [event.target.name]: event.target.value
    })
  }


  const updatePrem = () => {

    let data = JSON.stringify({

      active: premiseData.premise.active,
      address: update.address,
      chargeFrequencyName: update.freq,
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
      premiseUseTypeId: update.premUseType,
      unitVacancyRestrictionStatus: update.premStatus
    })
    requestsServiceService.updatePremise(userId, data).then((res) => {
      fetchAll()
      $("#edit-premise-detail").modal("hide");

      if (res.data.status) {
        setError({
          ...error,
          message: res.data.message,
          color: "success"
        })
      } else {

        setError({
          ...error,
          message: res.data.message,
          color: "warning"
        })
      }

      setTimeout(() => {
        clear()
      }, 3000)

    }).catch((res) => {
      $("#edit-premise-detail").modal("hide");


      setError({
        ...error,
        message: res.data.message,
        color: "danger"
      })

    })
  }
  // premise caretakers stuff


  const [caretypes, setCareTypes] = useState()

  const [newCaretaker, setNewCaretaker] = useState({
    caretakerTypeName: '',
    email: "",
    firstName: "",
    gender: "",
    idNumber: "",
    lastName: "",
    otherName: "",
    phoneNumber: "",

  })

  const [updateCaretaker, setUpdateCaretaker] = useState({
    caretakerTypeName: 'SELF_COMMISSIONED',
    email: "q@gmail.com",
    firstName: "res",
    gender: "res",
    idNumber: "2424",
    lastName: "rere",
    otherName: "sf",
    phoneNumber: "dgd",
  })

  const updateUpdate = (a, b, c, d, i, f, g, h) => {
    setUpdateCaretaker({
      ...updateCaretaker,

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

  const hadleUpdateCaretaker = (event) => {
    setUpdateCaretaker({
      ...updateCaretaker, [event.target.name]: event.target.value
    })
  }


  const hadleCaretaker = (event) => {
    setNewCaretaker({
      ...newCaretaker, [event.target.name]: event.target.value
    })
  }

  const caretakerTypes = () => {
    requestsServiceService.caretakerTypes().then((res) => {
      setCareTypes(res.data.data)
    })
  }

  const getCaretakers = () => {
    requestsServiceService.allCareTakers(userId).then((res) => {
      setCaretakers(res.data.data)
    })
  }

  const createCaretaker = () => {

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
    requestsServiceService.createCaretaker(userId, data).then(() => {
      $("#edit-caretaker").modal("hide");
      getCaretakers()

    })
  }

  const toggleCare = () => {
    requestsServiceService.toggleCaretaker(userId, caretakerId).then(() => {
      getCaretakers()
    })
  }

  const updateCare = () => {

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
    requestsServiceService.updateCaretaker(userId, caretakerId, data).then((res) => {
      getCaretakers()
    })
  }


  // premise unit stuff 

  const [activeUnitId, setActiveUnitId] = useState('')
  const [unittypes, setUnittypes] = useState([])
  const [unittype, setUnittype] = useState(null)
  const [unitName, setUnitName] = useState('')
  const [numberOfRooms, setNumberOfRooms] = useState('')
  const [purpose, setPurpose] = useState('')
  const [squarage, setSquarage] = useState('')

  const findAllPremiseUnits = () => {
    requestsServiceService.findPremiseUnits(userId).then((res) => {
      setPremiseUnits(res.data.data)
    })
  }

  const togglePremiseUnitStatus = (id) => {
    requestsServiceService.tooglePremiseUnitStatus(userId, id).then(() => {
      findAllPremiseUnits()
    })
  }
  const findUnitTypes = () => {
    requestsServiceService.allUnitTypes().then((res) => {
      setUnittypes(res.data.data)
    })
  }

  const editPremiseType = () => {
    let data = {
      active: true,
      id: activeUnitId,
      premiseId: userId,
      unitName: unitName,
      unitTypeId: unittype
    }

    requestsServiceService.updatePremiseUnit(userId, data).then((res) => {
      findAllPremiseUnits()
      $("#edit-premise-unit").modal("hide");
      if (res.data.status) {
        setError({
          ...error,
          message: res.data.message,
          color: "success"
        })
      } else {

        setError({
          ...error,
          message: res.data.message,
          color: "warning"
        })
      }

      setTimeout(() => {
        clear()
      }, 3000)

    }).catch((error, res) => {
      $("#edit-premise-unit").modal("hide");

      setError({
        ...error,
        message: error.message,
        color: "danger"
      })

    })
  }

  const clear = () => {
    setError({
      ...error,
      message: "",
      color: ""
    });
  }


  const createPremiseType = (res) => {
    let data = JSON.stringify({
      active: true,
      id: null,
      premiseId: userId,
      unitName: unitName,
      unitTypeId: unittype
    })
    requestsServiceService.createPremiseUnit(userId, data).then(() => {
      findAllPremiseUnits()
      $("#create-premise-unit").modal("hide");

      if (res.data.status) {
        setError({
          ...error,
          message: res.data.message,
          color: "success"
        })
      } else {

        setError({
          ...error,
          message: res.data.message,
          color: "warning"
        })
      }

      setTimeout(() => {
        clear()
      }, 3000)

    }).catch((res) => {
      $("#create-premise-unit").modal("hide");

      setError({
        ...error,
        message: res.data.message,
        color: "danger"
      })

    })
  }

  //  premise unit Charges Stuff
  const [rateCharge, setRateCharge] = useState("false")
  const [applicableCharge, setApplicableCharge] = useState('')
  const [applicableCharges, setApplicableCharges] = useState([])
  const [chargeConstraints, setChargeConstraints] = useState([])
  const [chargeConstraint, setChargeConstraint] = useState("ZERO_BALANCE")
  const [collectionaccount, setCollectionaccount] = useState('landlord')
  const [value, setValue] = useState('')
  const [clientAccounts, setClientAccounts] = useState([])
  const [landlordAccounts, setLandlordAccounts] = useState([])
  const [clientAccount, setClientAccount] = useState(null)
  const [clientAccountState, setClientAccountState] = useState("false")
  const [landlordAccount, setLandlordAccount] = useState(null)
  const [invoiceDay, setInvoiceDay] = useState('')
  const [constraintChargeId, setConstraintChargeId] = useState(null)

  const fetchApplicableCharges = () => {
    requestsServiceService.allApplicableCharges().then((res) => {
      setApplicableCharges(res.data.data)
    })
  }

  const findAllCharges = () => {
    requestsServiceService.findPremiseUnitTypeCharges(userId).then((res) => {
      setPremiseCharges(res.data.data)
    })
  }

  let clientChargeId = authService.getClientId()

  const getClientAccounts = () => {
    requestsServiceService.getClientAccounts(clientChargeId).then((res) => {
      setClientAccounts(res.data.data)
    })
  }


  const getLandLordAccounts = () => {

    requestsServiceService.getLandLordByFileNumber(landlordData).then((res) => {
      setLandlordAccounts(res.data.data.accounts)
    })
  }
  const toggleChargeStatus = (id) => {
    requestsServiceService.toggleChargeunitStatuses(id).then(() => {
      findAllCharges()
    })
  }

  const getchargeConstraint = () => {
    requestsServiceService.getChargeConstraints().then((res) => {
      setChargeConstraints(res.data.data)
    })
  }
  const handleConstraintChange = (event) => {

    let vals = event.target.value.split(':');
    setChargeConstraint(vals[0]);
    setRateCharge(vals[1]);
  }

  const handleChargeSubmit = (e) => {
    e.preventDefault()
    try {

      if (collectionaccount === "landlord" && landlordAccount === null) {
        throw new Error("landlord account null");
      };

      if (collectionaccount === "client") {
        setClientAccountState('true')
      } else {
        setClientAccountState('false')
      }


      if (unittype === null) {
        // setClientAccountState('true')
        throw new Error("unit type cannot be null");
      };

      if (collectionaccount === "client" && clientAccount === null) {
        throw new Error("client account null");
      };



      let data = JSON.stringify({
        active: true,
        applicableChargeId: applicableCharge,
        chargeConstraint: chargeConstraint,
        clientCollectionAccountId: clientAccount,
        collectedToClientAccount: clientAccountState,
        constraintChargeId: constraintChargeId,
        id: null,
        invoiceDay: invoiceDay,
        landlordCollectionAccountId: landlordAccount,
        premiseId: userId,
        rateCharge: rateCharge,
        unitCost: value,
        unitTypeId: unittype,
        value: value
      })

      requestsServiceService.createPremiseUnitTypeCharges(data).then((res) => {
        // console.log(res);
        fetchAll()
        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success"
          })
        } else {

          setError({
            ...error,
            message: res.data.message,
            color: "warning"
          })
        }
        setTimeout(() => {
          clear()
          $("#create-premise-unit").modal("hide");
        }, 1500)

      }).catch((err) => {


        setError({
          ...error,
          message: err.message,
          color: "danger"
        })

        setTimeout(() => {
          $("#create-premise-unit").modal("hide");
          clear()

        }, 1500)
      })



    } catch (err) {
      setError({
        ...error,
        message: err.message,
        color: "danger"
      })

      setTimeout(() => {
        clear()
      }, 3000)

    }




  }

  // documents struff 

  const createDocs = () => {
    setdocShow(!docShow)

    let data = JSON.stringify({
      docName: docName,
      document: userDocument,
      documentOwnerTypeName: "PREMISE",
      documentTypeId: documentTypeId,
      id: 0,
      ownerEntityId: userId
    })
    requestsServiceService.createDocuments(data).then(() => {
      fetchAll()
    })

  }


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
                    <Link to='/'>Dashboard </Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link to='/premisesregister'>All Premises</Link>

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
                        onClick={() => setActiveLink(6)}
                        class={
                          activeLink === 6
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Charges And Unit Types
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
                    <div class="navbar-nav">
                      {premiseData.premise && premiseData.premise.active ?
                        <a href="#" data-toggle="modal" data-target="#deactivate-modal" type="button" class="btn btn-outline-danger waves-effect waves-light">
                          <i class="bx dripicons-wrong font-size-16 align-middle me-2"></i> Deactivate Premise
                        </a> :
                        <a href="#" data-toggle="modal" data-target="#deactivate-modal" type="button" class="btn btn-outline-success waves-effect waves-light">
                          <i class="bx dripicons-wrong font-size-16 align-middle me-2"></i> Activate Premise
                        </a>
                      }

                      {/* <!-- Modal --> */}
                      <div class="modal fade" id="deactivate-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content ">
                            <div class="modal-header">
                              <h5 class="modal-title" id="composemodalTitle">Deactivate the Premise</h5>
                              <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <div>
                                <ul class="no-list-style p-0 mb-3">

                                  <li class="pb-3">
                                    <a href="javascript: void(0);">
                                      <div class="d-flex">

                                        <div class="flex-shrink-0 align-self-center me-3">
                                          <div class="avatar-xs">
                                            <span class="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                              <i class="mdi mdi-office-building-outline font-18px"></i>
                                            </span>
                                          </div>
                                        </div>

                                        <div class="flex-grow-1 overflow-hidden">
                                          <p class="text-truncate mb-1">Premises Name</p>
                                          <h5 class="text-truncate font-size-14 mb-0 text-capitalize"> {premiseData.premise && premiseData.premise.premiseName}</h5>

                                        </div>

                                      </div>
                                    </a>
                                  </li>
                                </ul>

                              </div>

                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              {premiseData.premise && premiseData.premise.active ?
                                (<button onClick={() => togglePrem()} type="button" class="btn btn-danger" data-dismiss="modal" id="send-msg-land"><i class="bx dripicons-wrong me-1"></i> Deactivate </button>) :
                                (<button onClick={() => togglePrem()} type="button" class="btn btn-success" data-dismiss="modal" id="send-msg-land"><i class="bx dripicons-wrong me-1"></i> Activate </button>)}
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end of tool bar --> */}
        {error.color !== "" &&
          <div className={"alert alert-" + error.color} role="alert">
            {error.message}
          </div>
        }
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

                          {premiseData.premise && premiseData.premise.active ? <span className="badge-soft-success badge m-3">Active</span> : <span class="badge-soft-danger badge m-3">Inactive</span>}

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
                            Edit Premise Details
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
                            <span className="text-capitalize">
                              {premiseData.premise &&
                                premiseData.premise.premiseType.name}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Use Type</label>
                          <div>
                            <span className="text-capitalize">
                              {premiseData.premise &&
                                premiseData.premise.premiseUseType.name}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Estate</label>
                          <div>
                            <span className="text-capitalize">
                              {premiseData.premise &&
                                premiseData.premise.estate.name}
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <label htmlFor="">Zone</label>
                          <div>
                            <span className="text-capitalize">
                              {premiseData.premise &&
                                premiseData.premise.estate.zone.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-3">
                          <label htmlFor="">County</label>
                          <div>
                            <span className="text-capitalize">
                              {premiseData.premise &&
                                premiseData.premise.estate.zone.clientCounty.county.name.toLowerCase()}
                            </span>
                          </div>
                        </div>
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
                            <span className="text-capitalize">
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
                  <form onSubmit={(e) => { e.preventDefault(); updatePrem() }}>

                    <div class="modal-body">

                      <div className="row">

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="">Premise Name</label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              value={update.premNmae}
                              onChange={handleChange}
                              name="premNmae"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="">Premise status</label>
                            <select
                              className="form-control"
                              onChange={handleChange}
                              name="premStatus"
                            >
                              <option value="">Select status</option>
                              {statuses && statuses.sort((a, b) => a.localeCompare(b)).map((prem) => (
                                <option
                                  value={prem}
                                  className="text-black font-semibold text-capitalize"
                                  selected={prem === update ? "selected" : ''}
                                >
                                  {prem && prem.toLowerCase().replace(/_/g, " ")}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="">Premise Type</label>
                            <select
                              className="form-control text-capitalize"
                              onChange={handleChange}
                              name="premType"

                            >

                              {PremiseTypes && PremiseTypes.sort((a, b) => a.name.localeCompare(b.name)).map((prem) => (
                                <option
                                  value={prem.id}
                                  className="text-black font-semibold text-capitalize"
                                  selected={prem.id === update.premType ? "selected" : ''}
                                >
                                  {prem.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="">Premise Use Type</label>
                            <select
                              className="form-control text-capitalize"
                              onChange={handleChange}
                              name="premUseType"
                            >

                              {PremiseUseTypes && PremiseUseTypes.sort((a, b) => a.name.localeCompare(b.name)).map((prem) => (
                                <option
                                  value={prem.id}
                                  className="text-black font-semibold "
                                  selected={prem.id === update.premUseType ? "selected" : ''}
                                >
                                  {prem.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-6">

                          <div className="form-group">
                            <label htmlFor="">Charge frequency</label>
                            <select
                              className="form-control"
                              onChange={handleChange}
                              name="freq"
                            >
                              <option value="YEAR"> Select frequency</option>
                              <option value="MONTH">Monthly</option>
                              <option value="YEAR">Yearly</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-6">

                          <div className="form-group">
                            <label htmlFor="">Estate</label>
                            <select
                              className="form-control text-capitalize"
                              onChange={handleChange}
                              name="estate"
                            >
                              <option className="text-black font-semibold ">
                                {premiseData.premise &&
                                  premiseData.premise.estate.name}
                              </option>

                              {Estates && Estates.sort((a, b) => a.name.localeCompare(b.name)).map((prem) => (
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
                              required
                              className="form-control"
                              value={update.fileNo}

                              onChange={handleChange}
                              name="fileNo"
                            />
                          </div>
                        </div>
                        <div className="col-6">

                          <div className="form-group">
                            <label htmlFor="">Plot Number</label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              value={update.plotNo}

                              onChange={handleChange}
                              name="plotNo"
                            />
                          </div>
                        </div>
                        <div className="col-6">

                          <div className="form-group">
                            <label htmlFor="">Address</label>
                            <input
                              type="text"
                              required
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
                        type="submit"
                        class="btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeLink === 5 && (
          <div>
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <div className="d-flex justify-content-between">
                      <h4 class="card-title text-capitalize mb-3">Property units</h4>
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#create-premise-unit"
                        className="btn btn-primary dropdown-toggle option-selector mb-3 mt-0"
                        onClick={() => { setUnitName(''); unittypes && setUnittype(unittypes[0].id); }}
                      >
                        <i className="dripicons-plus font-size-16"></i>{" "}
                        <span className="pl-1 d-md-inline">
                          New Premise Unit
                        </span>
                      </button>
                    </div>

                    <div class="table-responsive table-responsive-md overflow-visible">

                      <table class="table table-editable align-middle table-edits" >
                        <thead class="table-light" >
                          <tr class=" text-uppercase ">
                            <th>#</th>
                            <th>Name</th>
                            <th class=" ">Hse Type</th>
                            <th>purpose</th>
                            <th>no of rooms</th>
                            <th>unit size</th>
                            <th>months to renewal</th>
                            <th class=" ">Status</th>
                            <th>Active</th>
                            <th class="text-right w-220px">Actions</th>
                          </tr>
                        </thead>
                        <tbody>

                          {premiseUnits && premiseUnits.map((unit, index) => (
                            <tr data-id="1 ">
                              <td style={{ width: "80px" }}>{index + 1}</td>
                              <td>
                                <Link onMouseOver={() => setActiveUnitId(unit.id)} to={`/premise/${userId}/${activeUnitId}`}>{unit.unitName}</Link>
                              </td>
                              <td className="text-capitalize">{unit.unitType.name}</td>
                              <td className="text-capitalize">{unit.unitType.purpose}</td>
                              <td className="text-capitalize">{unit.unitType.numberOfRooms} rooms</td>
                              <td className="text-capitalize">{unit.unitType.squarage} M <sup>2</sup></td>
                              <td>{unit.unitType.monthCountForTenancyRenewal}</td>
                              <td className="text-capitalize">{unit.status?.toLowerCase()}</td>

                              <td> {unit.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span>}</td>
                              <td class="text-right cell-change d-flex align-items-center float-right justify-content-end">
                                <a onClick={() => { setUnitName(unit.unitName); setUnittype(unit.unitType.id); setActiveUnitId(unit.id); }} data-bs-toggle="modal"
                                  data-bs-target="#edit-premise-unit" class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit " title="Edit "><i class="bx bx-edit-alt "></i></a>
                                <div class="dropdown">
                                  <a onClick={() => setActiveUnitId(unit.id)} class="text-muted font-size-16 ml-7px" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                  </a>

                                  <div class="dropdown-menu dropdown-menu-end">
                                    <Link class="dropdown-item" to={`/premise/${userId}/${activeUnitId}`}><i class="font-size-15 mdi mdi-eye-plus-outline cursor-pinter me-3"></i>Detailed view</Link>
                                    {unit.active ? <a onClick={() => togglePremiseUnitStatus(unit.id)} class="dropdown-item cursor-pinter"><i class="font-size-15 mdi mdi-home-remove text-danger me-3"></i>Deactivate unit</a> :
                                      <a onClick={() => togglePremiseUnitStatus(unit.id)} class="dropdown-item cursor-pinter"><i class="font-size-15 mdi mdi-home-remove text-success me-3"></i>Activate unit</a>}
                                  </div>
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
              {/* <!-- end col --> */}
            </div>
            {/* modals edit-premise-unit */}
            <div
              class="modal fade"
              id="edit-premise-unit"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              role="dialog"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <form onSubmit={(e) => { e.preventDefault(); editPremiseType() }}>

                    <div
                      className="modal-body">
                      <div className="form-group">
                        <label htmlFor="">update Name</label>
                        <input type="text" required value={unitName} className="form-control" onChange={(event) => setUnitName(event.target.value)} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="">Unit Type</label>
                        <select name="" id="" className="form-control" onChange={(event) => setUnittype(event.target.value)}>
                          {unittypes && unittypes.sort((a, b) => a.name.localeCompare(b.name)).map((unit) => (
                            <option value={unit.id} selected={unit.id === unittype ? "selected" : ''}> {unit.name}</option>
                          ))}
                        </select>
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
                        type="submit"
                        class="btn btn-primary"
                      >
                        update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* premise unit create  */}
            <div
              class="modal fade"
              id="create-premise-unit"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              role="dialog"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <form onSubmit={(e) => { e.preventDefault(); createPremiseType() }}>

                    <div
                      className="modal-body">
                      <div className="form-group">
                        <label htmlFor="">Unit Name</label>
                        <input type="text" required placeholder="Enter Unit Name" value={unitName} className="form-control" onChange={(event) => setUnitName(event.target.value)} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="">Unit Type</label>
                        <select name="" id="" className="form-control text-capitalize" onChange={(event) => setUnittype(event.target.value)}>
                          <option value="">Select unit type</option>
                          {unittypes && unittypes.sort((a, b) => a.name.localeCompare(b.name)).map((unit) => (
                            <option value={unit.id}> {unit.name}</option>
                          ))}
                        </select>
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
                        type="submit"
                        class="btn btn-primary"
                      >
                        create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeLink === 6 && (
          <div>
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">

                    <div className="d-flex justify-content-between">
                      <h4 class="card-title text-capitalize mb-3">Charges And Unit Types </h4>
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#create-premise-unit"
                        className="btn btn-primary dropdown-toggle option-selector mb-3 mt-0"
                        onClick={() => {
                          setUnittype(null); getLandLordAccounts();
                        }}
                      >
                        <i className="dripicons-plus font-size-16"></i>{" "}
                        <span className="pl-1 d-md-inline">
                          New Charge
                        </span>
                      </button>
                    </div>

                    <div class="table-responsive table-responsive-md overflow-visible">
                      <table class="table table-editable align-middle table-edits" >
                        <thead class="table-light" >
                          <tr class=" text-uppercase ">
                            <th>#</th>
                            <th class="">UNit type</th>
                            <th class=" ">NO of Rooms</th>
                            <th class=" ">UNIT SIZE M<sup>2</sup></th>
                            <th>TENANCY RENEWAL</th>
                            <th>charge constraint</th>
                            <th>rate charge</th>
                            <th>applicable charge </th>
                            <th>applicable charge type </th>
                            <th>invoice day</th>
                            <th>amount </th>
                            <th>status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {premiseCharges && premiseCharges.map((unit, index) => (
                            <tr data-id="1 ">
                              <td style={{ width: "80px" }}>{index + 1}</td>
                              <td className="text-capitalize">{unit.unitType.name && unit.unitType.name}</td>
                              <td className="text-capitalize">{unit.unitType.numberOfRooms} rooms</td>
                              <td className="text-capitalize">{unit.unitType.squarage} m<sup>2</sup> </td>
                              <td className="text-capitalize">{unit.unitType.monthCountForTenancyRenewal} months</td>
                              <td className="text-capitalize">{unit.chargeConstraint?.toLowerCase()?.replace(/_/g, " ")}</td>
                              <td className="text-capitalize">{unit.rateCharge ? "true" : "false"}</td>
                              <td className="text-capitalize">{unit.applicableCharge.name}</td>
                              <td className="text-capitalize">{unit.applicableCharge.applicableChargeType?.toLowerCase()?.replace(/_/g, " ")}</td>
                              <td className="text-capitalize">{unit.invoiceDay}</td>
                              <td className="text-capitalize">KSH {unit.value}</td>
                              <td> {unit.active ? <span class="badge-soft-success badge">Active</span> : <span class="badge-soft-danger badge">Inactive</span>}</td>

                              <td class="text-right d-flex align-items-center float-right justify-content-end">
                                <div class="dropdown">
                                  <a onClick={() => setActiveUnitId(unit.id)} class="text-muted font-size-16 ml-7px" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                  </a>

                                  <div class="dropdown-menu dropdown-menu-end">
                                    <Link class="dropdown-item" to={`/premise/${userId}/${unit.id}`}><i class="font-size-15 mdi mdi-eye-plus-outline cursor-pinter me-3"></i>Detailed view</Link>
                                    {unit.active ? <a onClick={() => toggleChargeStatus(unit.id)} class="dropdown-item cursor-pinter"><i class="font-size-15 mdi mdi-home-remove text-danger me-3"></i>Deactivate charge</a> : " "}
                                  </div>
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
              {/* <!-- end col --> */}
            </div>

            {/* premise unit create  */}
            <div
              class="modal fade"
              id="create-premise-unit"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              role="dialog"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <form onSubmit={(e) => handleChargeSubmit(e)}>
                    {error.color !== "" &&
                      <div className={"alert alert-" + error.color} role="alert">
                        {error.message}
                      </div>
                    }
                    <div
                      className="modal-body">

                      <div className="form-group mb-2">
                        <label htmlFor="">Unit type</label>
                        <select name="" id="" className="form-control text-capitalize" onChange={(event) => setUnittype(event.target.value)}>
                          <option value={null}>Select unit type</option>
                          {unittypes && unittypes?.sort((a, b) => a.name.localeCompare(b.name)).map((unit) => (
                            <option value={unit.id}> {unit.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group mb-2">
                        <label htmlFor="">Applicable charge</label>
                        <select name="" id="" className="form-control text-capitalize" onChange={(event) => setApplicableCharge(event.target.value)}>
                          <option value="">Select applicable type</option>
                          {applicableCharges && applicableCharges.sort((a, b) => a.name.localeCompare(b.name)).map((unit) => (
                            <option value={unit.id}> {unit.name} - {unit.applicableChargeType?.toLowerCase()?.replace(/_/g, " ")}</option>
                          ))}
                        </select>
                      </div>


                      <div className="form-group mb-2">
                        <label htmlFor="">Charge constraint</label>
                        <select name="" id="" className="form-control" onChange={(e) => handleConstraintChange(e)}>
                          <option value={null}>Select charge constraint</option>
                          <option value={"ZERO_BALANCE" + ":" + "false"}> Zero Balance</option>
                          <option value={"RATE_OF_CHARGE" + ":" + "true"}>Rate Charge</option>

                        </select>
                      </div>

                      {chargeConstraint !== 'ZERO_BALANCE' && <div className="form-group mb-2">
                        <label htmlFor="">charge required</label>
                        <select name="" id="" className="form-control text-capitalize" onChange={(event) => setConstraintChargeId(event.target.value)}>
                          <option value="">Select  charge </option>
                          {premiseCharges && premiseCharges.map((unit) => (
                            <option value={unit.id} className={unit.active ? "" : "d-none"}  >{unit.unitType.name} - KSH {unit.value}</option>
                          ))}
                        </select>
                      </div>}


                      <div className="form-group mb-2">
                        <label htmlFor="">select collection account type</label>
                        <select name="" id="" className="form-control" onChange={(event) => setCollectionaccount(event.target.value)}>
                          <option value="landlord">Landlord collection</option>
                          <option value="client">Client collection</option>
                        </select>
                      </div>

                      {collectionaccount === 'client' && <div className="form-group mb-2">
                        <label htmlFor="">client account</label>
                        <select name="" id="" className="form-control text-capitalize" onChange={(event) => setClientAccount(event.target.value)}>
                          <option value={null} >Select  client account</option>
                          {clientAccounts && clientAccounts.sort((a, b) => a.bank.bankName.localeCompare(b.bank.bankName)).map((unit) => (
                            <option value={unit.id}> {unit.bank.bankName?.toLowerCase()?.replace(/_/g, " ")} - {unit.bankAccountNumber}</option>
                          ))}
                        </select>
                      </div>}


                      {collectionaccount === 'landlord' && <div className="form-group mb-2">
                        <label htmlFor="">landlord account</label>
                        <select name="" id="" className="form-control text-capitalize" onChange={(event) => setLandlordAccount(event.target.value)}>
                          <option value={null}>Select landlord account</option>
                          {landlordAccounts && landlordAccounts.sort((a, b) => a.bank.bankName.localeCompare(b.bank.bankName)).map((unit) => (
                            <option value={unit.id}> {unit.bank?.bankName?.toLowerCase()?.replace(/_/g, " ")} - {unit.bankAccountNumber} </option>
                          ))}
                        </select>
                      </div>}

                      <div className="form-group mb-2">
                        <label htmlFor="">Invoice day (1-31) </label>
                        <input type="number" max="31" min="1" placeholder="Enter invoice day" value={invoiceDay} className="form-control" onChange={(event) => setInvoiceDay(event.target.value)} />
                      </div>

                      <div className="form-group mb-2">
                        <label htmlFor="">value </label>
                        <input type="number" placeholder="Enter the value" value={value} className="form-control" onChange={(event) => setValue(event.target.value)} />
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
                        type="submit"
                        class="btn btn-primary"
                      >
                        create
                      </button>
                    </div>
                  </form>
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
                              premiseData?.landLords.map((unit, index) => (
                                <tr data-id="1">
                                  <td>{index + 1}</td>
                                  <td className="text-capitalize">
                                    {unit?.landLord?.firstName} {unit?.landlord?.lastName} {unit?.landlord?.otherName}
                                  </td>
                                  <td className="text-capitalize">
                                    {unit.landLord.landLordType?.toLowerCase()}
                                  </td>
                                  <td>{unit.landLord.phoneNumber}</td>
                                  <td>{unit.landLord.email}</td>
                                  <td>{unit.landLord.fileNumber}</td>
                                  <td className="text-capitalize">{unit.landLord.landLordAgreementType.name?.toLowerCase()?.replace(/_/g, " ")}</td>
                                  <td>
                                    {unit.landLord.remunerationPercentage} {"%"}
                                  </td>
                                  <td>{unit.landLord.agreementPeriod}</td>
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
                      <div onClick={handleDocShow}>
                        <button
                          type="button"
                          className="btn align-items-center d-flex btn-primary dropdown-toggle option-selector mb-3 mt-0"
                        >
                          <i className="dripicons-plus font-size-16 mt-1"></i>{" "}
                          <span className="pl-1 d-md-inline">
                            New document
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
                              <th>Owner type</th>
                              <th>actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {premiseData.premiseDocuments &&
                              premiseData.premiseDocuments.map(
                                (unit, index) => (
                                  <tr data-id="1">
                                    <td>{index + 1}</td>
                                    <td className=" nav-link cursor-pointer">


                                      {unit.docName}

                                    </td>
                                    <td className="text-capitalize">{unit.documentType.name?.toLowerCase()?.replace(/_/g, " ")}</td>
                                    <td className="text-capitalize">
                                      {unit.documentOwnerType.toLowerCase()}
                                    </td>
                                    <td>
                                      <a href={baseUrl + "/documents/download?docName=" + `${unit.docName}`}
                                        className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit"
                                        target="_blank"><i className="bx bx-download" />
                                      </a>
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
            {/*document attachment modal*/}

            <div>
              <Modal show={docShow} onHide={handleDocClose} className={"modal fade"} centered>
                <form onSubmit={createDocs}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Documents</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group mb-4">
                          <label htmlFor="">Select Document Type. <strong className="text-danger ">*</strong></label>
                          <select
                            className="form-control text-capitalize"
                            onChange={(e) => {
                              setdocumentTypeId(e.target.value);
                            }}
                            name="document type"
                            required={true}
                          >
                            <option className="text-black font-semibold ">
                              select..
                            </option>
                            {documentTypes && documentTypes.sort((a, b) => a.name.localeCompare(b.name))?.map((dT) => {
                              return (
                                <option
                                  key={dT.id}
                                  value={dT.id}
                                >
                                  {dT.name?.toLowerCase().replace(/_/g, " ")}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="">Document Name. <strong className="text-danger ">*</strong></label>
                          <input type="text" className="form-control" value={docName} onChange={(e) => setdocName(e.target.value)} placeholder="Enter document name" required={true} />
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="">Document Upload. <strong className="text-danger ">*</strong></label>
                          <div className="input-group mb-0">
                            <label className="input-group-text bg-info text-white cursor-pointer"
                              htmlFor="document1-1">
                              <i className="font-14px mdi mdi-paperclip"></i> Attach File
                            </label>
                            <input type="file" className="form-control" id="document1-1" onChange={e => handleFileRead(e)} required={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" className={"btn btn-grey"} onClick={handleDocClose}>
                      Close
                    </Button>
                    <Button variant="primary" className={"btn btn-primary"} type={"submit"}>
                      Add Document
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>
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
                      <div className="table-responsive overflow-visible">
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
                                  <td className="text-capitalize">
                                    {unit?.firstName} {unit?.lastName}
                                  </td>
                                  <td className="text-capitalize">
                                    {unit.caretakerType?.toLowerCase()?.replace(/_/g, " ")}
                                  </td>
                                  <td>{unit?.phoneNumber}</td>
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
                                    <div className="d-flex justify-content-center align-items-center">
                                      <a
                                        class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-care"
                                        title="Edit"
                                        onClick={() => {
                                          setCaretakerId(unit.id); updateUpdate(unit.caretakerType, unit.email, unit.firstName, unit.gender, unit.idNumber, unit.lastName, unit.otherName, unit.phoneNumber)
                                        }
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
                                          onClick={() => {
                                            setCaretakerId(unit.id); toggleCare()
                                          }
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
                                            setCaretakerId(unit.id); toggleCare()
                                          }
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
                  <form onSubmit={(e) => { e.preventDefault(); createCaretaker() }}>

                    <div class="modal-body">
                      <div className="row">
                        <div className="col-4">
                          <div className="form-group">
                            <label htmlFor=""> First Name <strong className="text-danger">*</strong></label>
                            <input type="text" required placeholder="Enter first name" className="form-control" value={newCaretaker.firstName} onChange={hadleCaretaker} name="firstName" />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label htmlFor=""> Last Name <strong className="text-danger">*</strong></label>
                            <input type="text" required placeholder="Enter last name" className="form-control" value={newCaretaker.lastName} onChange={hadleCaretaker} name='lastName' />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label htmlFor="">Other Name </label>
                            <input type="text" placeholder="Enter other name" className="form-control" value={newCaretaker.otherName} onChange={hadleCaretaker} name='otherName' />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-4">
                          <div className="form-group">
                            <label htmlFor=""> Phone No <strong className="text-danger">*</strong></label>
                            <input type="text" required placeholder="Enter phone no" className="form-control" value={newCaretaker.phoneNumber} onChange={hadleCaretaker} name="phoneNumber" />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label htmlFor=""> ID No <strong className="text-danger">*</strong></label>
                            <input type="text" required placeholder="Enter Id No" className="form-control" value={newCaretaker.idNumber} onChange={hadleCaretaker} name='idNumber' />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label htmlFor="">Email <strong className="text-danger">*</strong></label>
                            <input type="text" required placeholder="Enter your email" className="form-control" value={newCaretaker.email} onChange={hadleCaretaker} name="email" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <div className="form-group text-capitalize">
                            <label htmlFor="">Caretaker Type <strong className="text-danger">*</strong></label>
                            <select name="caretakerTypeName" className="form-control" onChange={hadleCaretaker}>
                              <option value="" className="text-capitalize"> Select Type</option>
                              {caretypes && caretypes.sort((a, b) => a.localeCompare(b)).map((type) => (
                                <>{<option className="text-capitalize" value={type}> {type?.toLowerCase()?.replace(/_/g, " ")} </option>}</>
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
                                onChange={hadleCaretaker}
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
                                onChange={hadleCaretaker}
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
                        type="submit"
                        class="btn btn-primary"
                      >
                        Add caretaker
                      </button>
                    </div>
                  </form>
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

                          <input type="text" className="form-control" value={updateCaretaker.firstName} onChange={hadleUpdateCaretaker} name="firstName" />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor=""> Last Name</label>
                          <input type="text" className="form-control" value={updateCaretaker.lastName} onChange={hadleUpdateCaretaker} name='lastName' />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor="">Other Name</label>
                          <input type="text" className="form-control" value={updateCaretaker.otherName} onChange={hadleUpdateCaretaker} name='otherName' />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor=""> Phone No</label>
                          <input type="text" className="form-control" value={updateCaretaker.phoneNumber} onChange={hadleUpdateCaretaker} name="phoneNumber" />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor=""> ID No</label>
                          <input type="text" className="form-control" value={updateCaretaker.idNumber} onChange={hadleUpdateCaretaker} name='idNumber' />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor="">Email</label>
                          <input type="text" className="form-control" value={updateCaretaker.email} onChange={hadleUpdateCaretaker} name="email" />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-6">
                        <div className="form-group text-capitalize">
                          <label htmlFor="">Caretaker Type</label>
                          <select name="caretakerTypeName" id="" className="form-control" onChange={hadleUpdateCaretaker}>
                            {caretypes && caretypes.sort((a, b) => a.localeCompare(b)).map((type) => (

                              <option className="text-capitalize" selected={type === updateCaretaker.caretakerTypeName ? "selected" : ''} value={type} >{type?.toLowerCase()?.replace(/_/g, " ")}</option>
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
                      Update caretaker
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
