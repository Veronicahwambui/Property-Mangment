/* global $ */

import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { useEffect } from "react";
import requestsServiceService from "../../services/requestsService.service";
import { confirmAlert } from "react-confirm-alert";
import Badge from "react-bootstrap/Badge";
import authService from "../../services/auth.service";

function AddProperties() {
  const [landlordData, setLandlordData] = useState({
    active: true,
    agreementPeriod: undefined,
    landLordAgreementTypeId: undefined,
    landLordId: undefined,
    premiseId: undefined,
    remunerationPercentage: undefined,
  });

  const [landlordfileNumber, setLandlordfileNumber] = useState("");
  const [documentTypes, setDocumentTypes] = useState([]);
  const [applicableCharges, setApplicableCharges] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const [caretakerTypes, setCaretakerTypes] = useState([]);
  const [unitCharges, setUnitCharges] = useState([]);
  const [landLordAccounts, setLandLordAccounts] = useState([]);
  const [clientAccounts, setClientAccounts] = useState([]);
  const [landLordData, setLandLordData] = useState({});
  const [uniqueChargeId, setUniqueChargeIds] = useState([]);
  const [agreementTypes, setAgreementTypes] = useState([]);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [hasCaretaker, setHasCaretaker] = useState(false);
  const [newUnitTypeModal, setNewUnitTypeModal] = useState(false);
  const [showUnitTypeChargesModal, setShowUnitTypeChargesModal] =
    useState(false);
  const [fileNoShow, setFileNoShow] = useState(true);
  const [tenancyStatus, setTenancyStatus] = useState("");
  const [ac, setAC] = useState([]);
  const [selectedItems, setselectedItems] = useState([]);

  const [chargePropertyTax, setChargePropertyTax] = useState(false);
  const [collectElectricityDeposit, setCollectElectricityDeposit] =
    useState(false);

  const toogleShowUnitTypeChargesModal = () => {
    setShowUnitTypeChargesModal(!showUnitTypeChargesModal);
  };

  const [error, setError] = useState({
    message: "",
    color: "",
  });

  const redirectToCreateLandlord = () => {
    window.location.href = "/#/addlandlord";
  };

  const redirectToProperties = () => {
    window.location.href = "/#/premisesregister";
  };

  const saveLandLordFileNumber = () => {
    if (landlordfileNumber != "") {
      requestsServiceService
        .findByFile(landlordfileNumber)
        .then((res) => {
          if (res.data.status === false) {
            setError({
              ...error,
              message: res.data.message,
              color: "danger",
            });
          } else {
            setLandLordAccounts(res.data.data.accounts);
            setLandLordData(res.data.data.landLord);
            let data = landlordData;
            data.landLordId = res.data.data.landLord.id;
            setLandlordData(data);
            setLandlordData({
              active: true,
              agreementPeriod: res.data.data.landLord.agreementPeriod,
              landLordAgreementTypeId:
                res.data.data.landLord.landLordAgreementType.id,
              landLordId: res.data.data.landLord.id,
              premiseId: undefined,
              remunerationPercentage:
                res.data.data.landLord.remunerationPercentage,
            });

            setError({
              ...error,
              message: res.data.message,
              color: "success",
            });
            setTimeout(() => {
              setFileNoShow(false);
            }, 1500);
          }
        })
        .catch((err) => {
          setError({
            ...error,
            message: err.message,
            color: "danger",
          });
        });
    }
  };

  const removeUnitType = (el, index) => {
    let data = selectedunitTypes;
    data.splice(index, 1);
    const updatedUnits = data.filter((unit, idx) => idx != index);
    setSelectedUnitTypes(updatedUnits);
  };

  const [general, setGeneral] = useState({
    active: true,
    address: undefined,
    estateId: undefined,
    fileNumber: undefined,
    id: undefined,
    landLordId: [],
    landlordFileNumber: [],
    plotNumber: undefined,
    premiseName: undefined,
    premiseTypeId: undefined,
    chargePropertyTax: chargePropertyTax,
    managementType: undefined,
    collectElectricityDeposit: collectElectricityDeposit,
    premiseUseTypeId: undefined,
    unitVacancyRestrictionStatus: undefined,
    invoicePaymentPriority: undefined,
    chargeFrequencyName: undefined,
  });

  const handleGeneral = (event) => {
    if (
      event.target.name === "estateId" ||
      event.target.name === "premiseTypeId" ||
      event.target.name === "premiseUseTypeId"
    )
      setGeneral({
        ...general,
        [event.target.name]: parseInt(event.target.value),
      });
    else setGeneral({ ...general, [event.target.name]: event.target.value });
  };
  // console.log(general);

  const [caretaker, setCaretaker] = useState({
    idNumber: "",
    firstName: "",
    lastName: "",
    otherName: "",
    caretakerTypeName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    active: true,
  });

  const [unit, setUnit] = useState({
    active: true,
    id: undefined,
    premiseId: undefined,
    unitName: undefined,
    unitTypeId: undefined,
  });

  const [selectedApplicableCharges, setSelectedApplicableCharges] = useState(
    []
  );

  const [selectedunitTypes, setSelectedUnitTypes] = useState([]);

  const [unitType, setUnitType] = useState({
    unitTypeName: undefined,
    squarage: undefined,
    unitTypeId: undefined,
    monthCountForTenancyRenewal: undefined,
    numberOfRooms: undefined,
    purpose: undefined,
  });

  const [premiseUnitTypeCharges, setPremiseUnitTypeCharges] = useState([]);

  const handleChargechange = (event, index) => {
    if (event.target.name === "charge") {
      let unitAppCharge = [];
      let chargee = selectedApplicableCharges.find(
        (charge) => charge.id === parseInt(event.target.value)
      );
      for (var i = 0; i < selectedunitTypes.length; i++) {
        let chargeBody = {
          active: true,
          applicableChargeId: chargee.id,
          chargeConstraint: "ZERO_BALANCE",
          constraintChargeId: undefined,
          id: undefined,
          invoiceDay: undefined,

          applicableChargeName: chargee.name,
          applicableChargeType: chargee.applicableChargeType,

          unitTypeName: selectedunitTypes[i].name,
          landlordCollectionAccountId: undefined,
          monthCountForTenancyRenewal:
            selectedunitTypes[i].monthCountForTenancyRenewal,
          numberOfRooms: selectedunitTypes[i].numberOfRooms,
          premiseId: undefined,
          purpose: selectedunitTypes[i].purpose,
          rateCharge: undefined,
          squarage: selectedunitTypes[i].squarage,
          unitTypeId: selectedunitTypes[i].id,
          value: undefined,

          clientCollectionAccountId: clientAccounts[0]?.id,
          collectedToClientAccount: true,
        };
        unitAppCharge.push(chargeBody);
      }

      setUnitCharges(unitAppCharge);
    } else {
      let unitAppCharge = unitCharges;

      if (event.target.name === "collectedToClientAccount")
        unitAppCharge[index][event.target.name] =
          event.target.value === "client";
      else unitAppCharge[index][event.target.name] = event.target.value;

      setUnitCharges(unitAppCharge);
    }
  };

  const handlelandlordDataChange = (event) => {
    setLandlordData({
      ...landlordData,
      [event.target.name]: parseInt(event.target.value),
    });
  };

  const handleUnitTypeChange = (event) => {
    if (event.target.name === "unitTypeId") {
      let d = event.target.value.split(":");
      let type = unitType;
      type.unitTypeId = d[0];
      type.unitTypeName = d[1];
      setUnitType({ ...unitType, type });
    } else
      setUnitType({ ...unitType, [event.target.name]: event.target.value });
  };

  const handleCaretaker = (event) => {
    setCaretaker({ ...caretaker, [event.target.name]: event.target.value });
  };

  const selectedApplicableChargeChange = (event) => {
    console.log(event.target.value);
    let chargess = selectedApplicableCharges;

    let value = applicableCharges.find((x) => x.id == event.target.value);

    console.log(value);
    if (value != undefined) {
      if (event.target.checked) chargess.push(value);
      else chargess.splice(chargess.indexOf(value), 1);

      setSelectedApplicableCharges(chargess);
    }
  };

  // ADDING PREMISES

  const [premiseUnits, setPremiseUnits] = useState([]);
  const [modalId, setModalId] = useState("");
  const [unitsNumModal, setUnitsNumModal] = useState(false);

  const selectedUnitTypesChange = (event) => {
    let chargess = selectedunitTypes;
    let value = unitTypes.find((x) => x.id == event.target.value);
    if (value != undefined) {
      if (event.target.checked) {
        chargess.push(value);
        // modalId
        setModalId(value.id);
        setUnitsNumModal(true);
        //pop up modal
      } else {
        chargess.splice(chargess.indexOf(value), 1);
        setSelectedUnitTypes(chargess);
        setPremiseUnits(
          premiseUnits.filter((ob) => ob.unitTypeId !== value.id)
        );
        setModalId(" ");
      }
    }
  };

  const handleUnitsModal = (event) => {
    setPremiseUnits([
      ...premiseUnits,
      ...new Array(parseInt(event.target.value)).fill({
        active: true,
        unitTypeId: modalId,
        id: null,
        premiseId: null,
        status: "VACANT",
        unitName: "",
      }),
    ]);
  };

  const handleNames = (event, i) => {
    // console.log(premiseUnits);
    let ne = premiseUnits.map((obj, index) =>
      index == i ? { ...obj, unitName: event.target.value } : { ...obj }
    );


    setPremiseUnits(ne);
  };

  const handleRemoveUnit = (index) => {
    let newUnits = premiseUnits.filter((obj, i) => i !== Number(index));
    setPremiseUnits(newUnits);
  }

  const [newUnitId, setNewUnitId] = useState(null)

  const updateUnits = () => {

    if (newUnitId === null) {
      setError({
        ...error,
        message: "No Unit Selected",
        color: "warning",
      });
      setTimeout(() => {
        clears();
      }, 3000);
      return
    }

    $("#add-new-unit-premise").modal("hide");
    const newUnit = {
      active: true,
      unitTypeId: newUnitId,
      id: null,
      premiseId: null,
      status: "VACANT",
      unitName: "",
    }
    setPremiseUnits([...premiseUnits, newUnit]);
    setNewUnitId(null)
  }

  // console.log(premiseUnits);

  const [estates, setEstates] = useState([]);
  const getEstates = () => {
    requestsServiceService.getAllEstates().then((res) => {
      setEstates(res.data.data);
    });
  };
  const getAgreementTypes = () => {
    requestsServiceService.getAllAgreementTypes(true).then((res) => {
      setAgreementTypes(res.data.data);
    });
  };

  const getClientAccounts = () => {
    requestsServiceService
      .getClientAccounts(authService.getClientId())
      .then((res) => {
        setClientAccounts(res.data.data);
      });
  };

  const [premiseTypes, setPremiseTypes] = useState([]);
  const getPremiseTypes = () => {
    requestsServiceService.allPremiseTypes(true).then((res) => {
      setPremiseTypes(res.data.data);
    });
  };

  const [premiseUseTypes, setPremiseUseTypes] = useState([]);
  const getPremiseUseTypes = () => {
    requestsServiceService.allPremiseUseTypes(true).then((res) => {
      setPremiseUseTypes(res.data.data);
    });
  };

  const getAllDocumentTypes = () => {
    requestsServiceService.allDocumentTypes("PREMISE", true).then((res) => {
      let docs = res.data.data;
      setDocumentTypes(res.data.data);
    });
  };

  const getAllApplicableCharges = () => {
    requestsServiceService
      .allApplicableCharges("TENANT", true)
      .then((res) => setApplicableCharges(res.data.data));
  };

  const fetchTypes = () => {
    requestsServiceService.allApplicableCharges("TENANT", true).then((res) => {
      setChargeTypes(res.data.data);
    });
  };

  const getAllUnitTypes = () => {
    requestsServiceService
      .allUnitTypes(true)
      .then((res) => setUnitTypes(res.data.data));
  };
  const [tenancyStatuses, setTenancyStatuses] = useState([]);
  const getAllTenancyStatuses = () => {
    requestsServiceService.getTenancyStatuses().then((res) => {
      setTenancyStatuses(res.data.data);
    });
  };

  const [premiseDocuments, setPremiseDocuments] = useState([]);
  const [docBody, setDocBody] = useState({
    docName: undefined,
    document: undefined,
    documentOwnerTypeName: "PREMISE",
    documentTypeId: undefined,
    id: undefined,
    ownerEntityId: undefined,
  });

  useEffect(() => {
    requestsServiceService.allApplicableCharges("TENANT", true).then((res) => {
      setAC(res.data.data);
    });
    getEstates();
    getAgreementTypes();
    getPremiseTypes();
    getPremiseUseTypes();
    getAllDocumentTypes();
    getAllApplicableCharges();
    getAllUnitTypes();
    getAllTenancyStatuses();
    getCaretakerType();
    fetchTypes();
    getClientAccounts();
  }, []);

  const toogleShowNewDocumentModal = (event) => {
    setShowDocumentModal(!showDocumentModal);
  };

  const toogleNewUnitTypeModal = (event) => {
    setNewUnitTypeModal(!newUnitTypeModal);
  };

  const getCaretakerType = () => {
    requestsServiceService.getCaretakerTypes().then((res) => {
      setCaretakerTypes(res.data.data);
    });
  };
  const addAppCharge = (el) => {
    el.preventDefault();
    let unicahgsg = unitCharges;
    let premiseUnitType = premiseUnitTypeCharges;

    for (var i = 0; i < unicahgsg.length; i++)
      premiseUnitType.push(unicahgsg[i]);

    let vals = premiseUnitType.map((cha) => cha.applicableChargeId);

    setUniqueChargeIds(vals);

    setPremiseUnitTypeCharges(premiseUnitType);

    setUnitCharges([]);
    toogleShowUnitTypeChargesModal();
  };

  const addDocument = (el) => {
    el.preventDefault();
    let data = docBody;
    if (data.documentOwnerTypeName === "PREMISE") {
      let kins = premiseDocuments;
      kins.push(data);
      setPremiseDocuments(kins);
    }

    // console.log(premiseDocuments, docBody, data.documentOwnerTypeName);

    toogleShowNewDocumentModal();
    setDocBody({
      docName: undefined,
      document: undefined,
      documentOwnerTypeName: "PREMISE",
      documentTypeId: undefined,
      id: undefined,
      ownerEntityId: undefined,
    });
  };

  const addUnitType = (el) => {
    el.preventDefault();
    let data = unitType;

    let kins = selectedunitTypes;
    kins.push(data);
    setSelectedUnitTypes(kins);

    toogleNewUnitTypeModal();
    setUnitType({
      unitTypeName: undefined,
      unitTypeId: undefined,
    });
  };

  const handleDocumentChange = (event) => {
    if (event.target.name === "file") {
      let filereader = new FileReader();

      filereader.readAsDataURL(event.target.files[0]);

      filereader.onload = function () {
        setDocBody({ ...docBody, document: filereader.result });
      };
      filereader.onerror = function (error) {
        console.log("Error: ", error);
      };
    } else setDocBody({ ...docBody, [event.target.name]: event.target.value });
    
  


  };

  $("#landlord-type").on("change", function () {
    var theSeledtedValue = $(this).val();
    if (theSeledtedValue == "company") {
      $(".individual-landlord").removeClass("d-none").next().addClass("d-none");
    } else {
      $(".individual-landlord").addClass("d-none").next().removeClass("d-none");
    }
  });

  const submit = () => {
    let gen = general;
    gen.landlordFileNumber.push(landlordfileNumber);
    let landlords = [];
    landlords.push(landlordData);

    let manualCharges = [];
    for (
      let counter = 0;
      counter < selectedApplicableCharges.length;
      counter++
    ) {
      if (selectedApplicableCharges[counter].expectManualValues) {
        for (
          let unitCounter = 0;
          unitCounter < selectedunitTypes.length;
          unitCounter++
        ) {
          let chargeBody = {
            active: true,
            applicableChargeId: selectedApplicableCharges[counter].id,
            chargeConstraint: "ZERO_BALANCE",
            constraintChargeId: undefined,
            id: undefined,
            invoiceDay: 1,

            applicableChargeName: selectedApplicableCharges[counter].name,
            applicableChargeType:
              selectedApplicableCharges[counter].applicableChargeType,

            unitTypeName: selectedunitTypes[unitCounter].name,
            landlordCollectionAccountId: undefined,
            monthCountForTenancyRenewal:
              selectedunitTypes[unitCounter].monthCountForTenancyRenewal,
            numberOfRooms: selectedunitTypes[unitCounter].numberOfRooms,
            premiseId: undefined,
            purpose: selectedunitTypes[unitCounter].purpose,
            rateCharge: undefined,
            squarage: selectedunitTypes[unitCounter].squarage,
            unitTypeId: selectedunitTypes[unitCounter].id,
            value: undefined,

            clientCollectionAccountId:
              premiseUnitTypeCharges[0].clientCollectionAccountId,
            collectedToClientAccount: true,
          };

          manualCharges.push(chargeBody);
        }
      }
    }

    gen["premiseLandLord"] = landlords;
    let data = {};
    if (hasCaretaker)
      data = {
        premise: gen,
        premiseCaretakerDTO: caretaker,
        premiseDocuments: premiseDocuments,
        premiseUnitTypeCharges: [...premiseUnitTypeCharges, ...manualCharges],
        premiseUnits: premiseUnits,
      };
    else
      data = {
        premise: gen,
        premiseCaretakerDTO: null,
        premiseDocuments: premiseDocuments,
        premiseUnitTypeCharges: [...premiseUnitTypeCharges, ...manualCharges],
        premiseUnits: premiseUnits,
      };

    requestsServiceService
      .createPremise(data)
      .then((res) => {
        if (res.data.status == true) {
          confirmAlert({
            message: res.data.message,
            buttons: [
              {
                label: "OK",
                onClick: (e) => (window.location.href = "/#/premisesregister"),
              },
            ],
          });
        } else {
          confirmAlert({
            message: res.data.message,
            buttons: [{ label: "OK" }],
          });
        }
      })
      .catch((err) => {
        confirmAlert({
          message: err.message,
          buttons: [{ label: "OK" }],
        });
      });
  };

  const newUnitType = (event) => {
    toogleNewUnitTypeModal();
  };

  const newDocument = (event) => {
    toogleShowNewDocumentModal();
  };
  const onChangeGeneral = (e) => {
    if (e.target.name === "invoicePaymentPriority") {
      let id = e.target.value.split("-")[0];
      let name = e.target.value.split("-")[1];
      let d = {
        name: name,
        id: id,
      };
      if (selectedItems.some((item) => item.id === id)) {
        removeItems(id);
      } else {
        setselectedItems((selectedItems) => [...selectedItems, d]);
        setGeneral({
          ...general,
          invoicePaymentPriority:
            selectedItems.length > 0
              ? selectedItems
                .map((a) => a.id)
                .join("-")
                .toString()
              : "",
        });
      }
    } else {
      setGeneral({
        ...general,
        [e.target.name]: e.target.value,
      });
    }
  };
  const removeItems = (x) => {
    setselectedItems([...selectedItems.filter((item) => item.id !== x)]);
  };

  // =======Property==================

  const [createName, setCreateName] = useState("");
  const [createNames, setCreateNames] = useState("");

  // create function
  const create = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: 0,
      name: createName,
    });

    requestsServiceService
      .createPremiseTypes(data)
      .then((res) => {
        getPremiseTypes();
        $("#add-new-property").modal("hide");

        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "warning",
          });
        }

        setTimeout(() => {
          clears();
        }, 3000);
      })
      .catch((res) => {
        $("#add-new-property").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          clears();
        }, 3000);
      });
  };

  const clears = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };
  // create function
  const createPremise = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: 0,
      name: createNames,
    });

    requestsServiceService
      .createPremiseUseTypes(data)
      .then((res) => {
        getPremiseUseTypes();
        $("#add-new-premise").modal("hide");

        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "warning",
          });
        }

        setTimeout(() => {
          cleared();
        }, 3000);
      })
      .catch((res) => {
        $("#add-new-premise").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          cleared();
        }, 3000);
      });
  };
  const cleared = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };

  // ========Add Unit  types=======

  const [createNam, setCreateNam] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [purpose, setPurpose] = useState("");
  const [squarage, setSquarage] = useState("");
  const [monthCountForTenancyRenewal, setMonthCountForTenancyRenewal] =
    useState("");
  const [chargeTypes, setChargeTypes] = useState([]);
  const [selectedChargeTypes, setSelectedChargeTypes] = useState([]);

  // create function
  const createUnit = () => {
    let data = JSON.stringify({
      active: true,
      clientId: parseInt(authService.getClientId()),
      id: null,
      monthCountForTenancyRenewal: monthCountForTenancyRenewal,
      name: createNam,
      numberOfRooms: numberOfRooms,
      purpose: purpose,
      squarage: squarage,
      unitTypeApplicableCharges: selectedChargeTypes,
    });

    requestsServiceService
      .createUnitTypes(data)
      .then((res) => {
        getAllUnitTypes();
        $("#add-new-unit").modal("hide");

        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "warning",
          });
        }

        setTimeout(() => {
          cleareds();
        }, 3000);
      })
      .catch((res) => {
        $("#add-new-unit").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          cleareds();
        }, 3000);
      });
  };

  const cleareds = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };
  const setChargeTypes1 = (el) => {
    let options = el.target.options;
    let userGroups = [];

    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        console.log("option ++ " + options[i].value);
        userGroups.push(parseInt(options[i].value));
      }
    }

    setSelectedChargeTypes(userGroups);
  };

  return (
    <>
      <div className="page-content">
        <div className="content-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18 text-capitalize">
                  Properties Registration
                </h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="property-list.html">All Properties</a>
                    </li>
                    <li class="breadcrumb-item active">
                      Properties registration
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          {/* <!-- eTransactions table --> */}
          {Object.keys(landLordData)?.length > 0 && (
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="font-weight-bold">
                      The landlord chosen for this premise is{" "}
                    </h4>
                    <div className="row">
                      <div className="col-5">
                        <p>
                          <strong>Name :</strong> {landLordData?.firstName}{" "}
                          {landLordData?.lastName} {landLordData?.otherName}
                        </p>
                        <p>
                          <strong>Phone Number :</strong>{" "}
                          {landLordData?.phoneNumber}
                        </p>
                        <p>
                          <strong>File No :</strong> {landLordData?.fileNumber}
                        </p>
                      </div>
                      <div className="col-5">
                        <p>
                          <strong>Email :</strong> {landLordData?.email}
                        </p>
                        <p className="text-capitalize">
                          <strong>File No :</strong>{" "}
                          {landLordData?.landLordType?.toLowerCase()}
                        </p>
                        <p>
                          <strong>Agreement Period :</strong>{" "}
                          {landLordData?.agreementPeriod}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <p>
                    Fill in the form correctly. Fields with an Asterisk{" "}
                    <strong class="text-danger">*</strong> are mandatory fields.
                  </p>
                  <div className="create-property" id="kev-step-form">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span className="navbar-toggler-icon"></span>
                      </button>

                      <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                      >
                        <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                            <a className="nav-link active">
                              1. Property Details{" "}
                              <span className="sr-only">(current)</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link">2. Invoices Breakdown</a>
                          </li>

                          <li className="nav-item">
                            <a className="nav-link">3. Unit Addition</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link">4. Document attachments</a>
                          </li>
                        </ul>
                      </div>
                    </nav>

                    {/* <!-- Properties details --> */}
                    <section className="step-cont active-step">
                      <h3>Properties details</h3>
                      <form>
                        <div class="col-12">
                          <div class="bg-primary border-2 bg-soft p-3 mb-4">
                            <p class="fw-semibold mb-0 pb-0 text-uppercase">
                              General Information about the Properties
                            </p>
                          </div>
                        </div>
                        <div class="row mb-4 ">
                          <div class="col-4 col-md-6">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                File No. <strong class="text-danger ">*</strong>
                              </label>
                              <input
                                type="text "
                                value={general.fileNumber}
                                onChange={handleGeneral}
                                name="fileNumber"
                                class="form-control "
                                id="basicpill-firstname-input "
                                placeholder="Enter file No."
                              />
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                Plot No.
                              </label>
                              <input
                                type="text "
                                value={general.plotNumber}
                                name="plotNumber"
                                onChange={handleGeneral}
                                class="form-control "
                                id="basicpill-firstname-input "
                                placeholder="Plot No."
                              />
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                Properties Name{" "}
                                <strong class="text-danger ">*</strong>
                              </label>
                              <input
                                type="text text-capitalize"
                                class="form-control "
                                value={general.premiseName}
                                onChange={handleGeneral}
                                name="premiseName"
                                id="basicpill-firstname-input "
                                placeholder="Enter Your First Name "
                              />
                            </div>
                          </div>

                          <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-lastname-input ">
                                Location <strong class="text-danger ">*</strong>
                              </label>
                              <select
                                class="form-control text-capitalize"
                                title="Select estate "
                                name="estateId"
                                onChange={handleGeneral}
                              >
                                <option>Select location</option>
                                {estates &&
                                  estates
                                    ?.sort((a, b) =>
                                      a.name.localeCompare(b.name)
                                    )
                                    .map((estate) => {
                                      return (
                                        <option
                                          value={estate.id}
                                          className="text-capitalize"
                                        >
                                          {" "}
                                          {estate.name} - {estate.zone.name} -{" "}
                                          {estate.zone.clientCounty.county.name
                                            ?.toLowerCase()
                                            ?.replace(/_/g, " ")}{" "}
                                        </option>
                                      );
                                    })}
                              </select>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                Address{" "}
                              </label>
                              <input
                                type="text text-capitalize"
                                class="form-control "
                                value={general.address}
                                onChange={handleGeneral}
                                name="address"
                                id="basicpill-firstname-input "
                                placeholder="Enter Your Address "
                              />
                            </div>
                          </div>

                          <div class="col-lg-4 col-md-6">
                            <div className="d-flex gap-2 align-items-end w-100 justify-content-between">
                              <div className="w-75">
                                <label for="basicpill-lastname-input ">
                                  Properties Type{" "}
                                  <strong class="text-danger ">*</strong>
                                </label>

                                <select
                                  class="form-control text-capitalize"
                                  title="Select Building type "
                                  name="premiseTypeId"
                                  onChange={handleGeneral}
                                >
                                  <option>select property type </option>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>

                                  {premiseTypes &&
                                    premiseTypes
                                      ?.sort((a, b) =>
                                        a.name.localeCompare(b.name)
                                      )
                                      ?.map((type) => (
                                        <option
                                          value={type.id}
                                          className="text-capitalize"
                                        >
                                          {" "}
                                          {type.name}
                                        </option>
                                      ))}
                                </select>
                              </div>
                              <div className="">
                                <button
                                  className="btn btn-primary text-nowrap btn-sm py-2 w-100"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-new-property"
                                > <i class="mdi mdi-plus label-icon"></i>
                                  Property Type
                                </button>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-4 col-md-6 ">
                            <div className="d-flex gap-2 align-items-end justify-content-between w-100">
                              <div class="w-75">
                                <label for="basicpill-lastname-input ">
                                  Property Use type
                                  <strong class="text-danger ">*</strong>
                                </label>
                                <select
                                  class="form-control text-capitalize"
                                  title="Select Premise use type "
                                  name="premiseUseTypeId"
                                  onChange={handleGeneral}
                                >
                                  <option>Select property use type </option>
                                  {premiseUseTypes &&
                                    premiseUseTypes
                                      ?.sort((a, b) =>
                                        a.name.localeCompare(b.name)
                                      )
                                      ?.map((type) => (
                                        <option
                                          value={type.id}
                                          className="text-capitalize"
                                        >
                                          {" "}
                                          {type.name}
                                        </option>
                                      ))}
                                </select>
                              </div>
                              <div className="">
                                <button
                                  className="btn btn-primary text-nowrap btn-sm py-2 w-100 waves-effect btn-label waves-light me-3"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-new-premise"
                                ><i class="mdi mdi-plus label-icon"></i>

                                  Proprty Use Type
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-4 col-md-6 ">
                            <div className="mb-4 ">
                              <label htmlFor="basicpill-lastname-input ">
                                Unit vacancy restriction status
                                <strong className="text-danger ">*</strong>
                              </label>
                              <select
                                className="form-control text-capitalize "
                                title="Select restriction status "
                                name="unitVacancyRestrictionStatus"
                                onChange={handleGeneral}
                              >
                                <option> Select status</option>
                                {tenancyStatuses &&
                                  tenancyStatuses
                                    ?.sort((a, b) => a.localeCompare(b))
                                    ?.map((t) => (
                                      <option
                                        value={t}
                                        className="text-capitalize"
                                      >
                                        {" "}
                                        {t === "CURRENT"
                                          ? "Occupied"
                                          : t === "OPEN"
                                            ? "Vaccant"
                                            : t
                                              ?.toLowerCase()
                                              ?.replace(/_/g, " ")}
                                      </option>
                                    ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">Charge Duration</label>
                              <select
                                className="form-control"
                                onChange={handleGeneral}
                                name="chargeFrequencyName"
                              >
                                <option value="YEAR"> Select frequency</option>
                                <option value="MONTH">Monthly</option>
                                <option value="YEAR">Yearly</option>
                              </select>
                            </div>
                          </div>
                          {/* new */}
                          <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                Management Type{" "}
                              </label>
                              <select
                                className="form-control"
                                onChange={handleGeneral}
                                name="ManagementType"
                              >
                                <option value="LET">
                                  {" "}
                                  Select Management Type
                                </option>
                                <option value="MANAGE">Manage</option>
                                <option value="LET">let</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                Utility Management Type{" "}
                              </label>

                              <select
                                className="form-control"
                                onChange={handleGeneral}
                                name="UtilityManagementType"
                              >
                                <option value="LANDORD">
                                  {" "}
                                  Select UtilityManagement Type{" "}
                                </option>

                                <option value="LANDLORD">Landlord</option>
                                <option value="INRENT">InRent</option>
                                <option value="AGENT">Agent</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                Property Tax{" "}
                              </label>
                              <select
                                class="form-control"
                                data-live-search="true"
                                title=""
                                required="required"
                                onChange={(e) => {
                                  setChargePropertyTax(e.target.value);
                                }}
                              >
                                <option>Select Charge Property Tax </option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                Collect Electricity Deposit{" "}
                              </label>
                              <select
                                class="form-control"
                                data-live-search="true"
                                title=""
                                required="required"
                                onChange={(e) => {
                                  setCollectElectricityDeposit(e.target.value);
                                }}
                              >
                                <option>
                                  {" "}
                                  Select Collect Electricity Deposit{" "}
                                </option>
                                <option value="false">Yes</option>
                                <option value="true">No</option>
                              </select>
                            </div>
                          </div>
                          {/* <div class="col-lg-4 col-md-6 ">
                            <div class="mb-4 ">
                              <label for="basicpill-firstname-input ">
                                Properties Name{" "}
                                <strong class="text-danger ">*</strong>
                              </label>
                              <input
                                type="text text-capitalize"
                                class="form-control "
                                value={general.premiseName}
                                onChange={handleGeneral}
                                name='premiseName'
                                id="basicpill-firstname-input "
                                placeholder="Enter Your First Name "
                              />
                            </div>
                          </div>
                           */}

                          <div className="row">
                            <div className="col-12">
                              <div className="bg-primary border-2 bg-soft p-3 mb-4">
                                <p className="fw-semibold mb-0 pb-0 text-uppercase">
                                  INVOICE PAYMENT PRIORITY
                                </p>
                              </div>
                            </div>
                            <div className="mb-4">
                              <div className="col-lg-4">
                                <div className="mb-4">
                                  <label htmlFor="">Applicable charges</label>
                                  <br />
                                  <select
                                    name="invoicePaymentPriority"
                                    onChange={(e) => onChangeGeneral(e)}
                                    id=""
                                    className={"form-control"}
                                  >
                                    <option value="">
                                      Select Applicable Charge
                                    </option>
                                    {ac?.map((item) => (
                                      <option
                                        value={item.id + "-" + item.name}
                                        key={item.id}
                                      >
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              {selectedItems.length > 0 && (
                                <>
                                  <div className="alert alert-info bg-soft d-flex align-items-center text-capitalize">
                                    {selectedItems?.map((item, index) => (
                                      <>
                                        <h5
                                          className="ml-7px justify-content-center align-items-center"
                                          key={item.id}
                                        >
                                          <Badge
                                            className={
                                              "bg-primary border-2 bg-soft text-black"
                                            }
                                            style={{
                                              color: "black",
                                            }}
                                          >
                                            {item.name}
                                          </Badge>
                                          <br />
                                          <i
                                            className="fa fa-trash cursor-pointer text-danger mt-1 mr-auto ml-auto"
                                            onClick={() => removeItems(item.id)}
                                          ></i>
                                        </h5>
                                        {index < selectedItems?.length - 1 && (
                                          <i
                                            style={{
                                              fontSize: "20px",
                                              margin: "0.5em",
                                            }}
                                            className={
                                              "dripicons-arrow-thin-right mr-5 justify-content-center d-flex align-items-center"
                                            }
                                          />
                                        )}
                                      </>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="bg-primary border-2 bg-soft p-3 mb-4">
                            <p class="fw-semibold mb-0 pb-0 text-uppercase">
                              Caretaker details
                            </p>
                          </div>
                        </div>

                        {/* <!-- caretaker details --> */}

                        <div class="row mb-3">
                          <label for=" " class=" ">
                            Property has a Caretaker?{" "}
                            <strong class="text-danger ">*</strong>
                          </label>
                          <div class="d-flex ">
                            <div class="form-check me-3">
                              <input
                                class="form-check-input"
                                type="radio"
                                onChange={(e) => setHasCaretaker(true)}
                                name="gender"
                                value="true"
                              />
                              <label
                                class="form-check-label"
                                for="caretaker-male"
                              >
                                Yes
                              </label>
                            </div>

                            <div class="form-check me-3">
                              <input
                                onChange={(e) => setHasCaretaker(false)}
                                class="form-check-input"
                                type="radio"
                                name="gender"
                                value="false"
                              />
                              <label
                                class="form-check-label"
                                for="caretaker-female"
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                        {hasCaretaker && (
                          <div class="row">
                            <div class="col-lg-3 col-md-6 ">
                              <div class="mb-4 ">
                                <label for=" ">ID/PP Num.</label>
                                <input
                                  type="text "
                                  class="form-control "
                                  id=""
                                  value={caretaker.idNumber}
                                  onChange={handleCaretaker}
                                  name="idNumber"
                                  placeholder="Enter ID or PP Num. "
                                />
                              </div>
                            </div>
                            <div class="col-lg-3 col-md-6 ">
                              <div class="mb-4 ">
                                <label for="basicpill-firstname-input ">
                                  First name{" "}
                                  <strong class="text-danger ">*</strong>
                                </label>
                                <input
                                  type="text "
                                  class="form-control text-capitalize "
                                  value={caretaker.firstName}
                                  onChange={handleCaretaker}
                                  name="firstName"
                                  id="basicpill-firstname-input "
                                  placeholder="Enter Your First Name "
                                />
                              </div>
                            </div>
                            <div class="col-lg-3 col-md-6 ">
                              <div class="mb-4 ">
                                <label for="basicpill-lastname-input ">
                                  Last Name{" "}
                                  <strong class="text-danger ">*</strong>
                                </label>
                                <input
                                  type="text "
                                  class="form-control "
                                  value={caretaker.lastName}
                                  onChange={handleCaretaker}
                                  name="lastName"
                                  id="basicpill-lastname-input "
                                  placeholder="Enter Your Last Name "
                                />
                              </div>
                            </div>
                            <div class="col-lg-3 col-md-6 ">
                              <div class="mb-4 ">
                                <label for=" ">Other Name(s)</label>
                                <input
                                  type="text "
                                  class="form-control "
                                  id=" "
                                  onChange={handleCaretaker}
                                  value={caretaker.otherName}
                                  name="otherName"
                                  placeholder="Enter Your Last Name "
                                />
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="row ">
                                <div class="col-lg-4 ">
                                  <div class="row ">
                                    <div class="col-12 col-md-6 ">
                                      <div class="mb-4 ">
                                        <label for=" " class=" ">
                                          Caretaker type
                                          <strong class="text-danger ">
                                            *
                                          </strong>
                                        </label>
                                        <select
                                          onChange={handleCaretaker}
                                          class="form-control "
                                          name="caretakerTypeName"
                                          title="Select caretaker type"
                                        >
                                          <option value={null}>
                                            Select caretaker type
                                          </option>
                                          {caretakerTypes?.map((item) => (
                                            <option
                                              value={item}
                                              className="text-capitalize"
                                            >
                                              {item === "SELF_COMMISSIONED"
                                                ? "Agent Commissioned"
                                                : item
                                                    ?.toLowerCase()
                                                    ?.replace(/_/g, " ")}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                    <div class="col-12 col-md-6 ">
                                      <div class="row mb-3">
                                        <label for=" " class=" ">
                                          Gender:{" "}
                                          <strong class="text-danger ">
                                            *
                                          </strong>
                                        </label>
                                        <div class="d-flex ">
                                          <div class="form-check me-3">
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              onChange={handleCaretaker}
                                              name="gender"
                                              value="Male"
                                            />
                                            <label
                                              class="form-check-label"
                                              for="caretaker-male"
                                            >
                                              Male
                                            </label>
                                          </div>

                                          <div class="form-check me-3">
                                            <input
                                              onChange={handleCaretaker}
                                              class="form-check-input"
                                              type="radio"
                                              name="gender"
                                              value="Female"
                                            />
                                            <label
                                              class="form-check-label"
                                              for="caretaker-female"
                                            >
                                              Female
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-lg-8">
                                  <div class="row ">
                                    <div class="col-lg-6 col-md-6">
                                      <div class="mb-4 ">
                                        <label for="basicpill-phoneno-input ">
                                          Phone{" "}
                                          <strong class="text-danger ">
                                            *
                                          </strong>
                                        </label>
                                        <input
                                          type="text "
                                          class="form-control "
                                          value={caretaker.phone}
                                          name="phoneNumber"
                                          onChange={handleCaretaker}
                                          id="basicpill-phoneno-input "
                                          placeholder="Enter Your Phone No. "
                                        />
                                      </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                      <div class="mb-4 ">
                                        <label for="basicpill-email-input ">
                                          Email{" "}
                                        </label>
                                        <input
                                          type="email "
                                          class="form-control "
                                          onChange={handleCaretaker}
                                          name="email"
                                          value={caretaker.email}
                                          id="basicpill-email-input "
                                          placeholder="Enter Your Email ID "
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* <!-- caretaker details end --> */}

                        <div class="col-12">
                          <div class="bg-primary border-2 bg-soft p-3 mb-4">
                            <p class="fw-semibold mb-0 pb-0 text-uppercase">
                              Units/ Hse Types on offer At the properties
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setMonthCountForTenancyRenewal("");
                            setPurpose("");
                            setNumberOfRooms("");
                            setSquarage("");
                          }}
                          type="button"
                          className="btn btn-primary waves-effect btn-label waves-light me-3"
                          data-bs-toggle="modal"
                          data-bs-target="#add-new-unit"
                        >
                          <i class="mdi mdi-plus label-icon"></i> Unit Type
                        </button>

                        <div class="row">
                          {unitTypes &&
                            unitTypes
                              ?.sort((a, b) => a.name.localeCompare(b.name))
                              ?.map((prem, index) => (
                                <div class="col-4">
                                  <div class="form-check form-check-primary mb-3">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      name="selectedUnitTypes"
                                      value={prem.id}
                                      onChange={selectedUnitTypesChange}
                                    />
                                    <label
                                      class="form-check-label"
                                      for="monthlyRent"
                                    >
                                      {prem.name}
                                    </label>
                                  </div>
                                </div>
                              ))}
                        </div>

                        {/* <div class="table-responsive table-responsive-md mb-5">
                          <table class="table table-editable-2 align-middle table-edits ">
                            <thead class="table-light">
                              <tr class="text-uppercase table-dark">
                                <th class="vertical-align-middle">#</th>
                                <th class="vertical-align-middle">
                                  House type
                                </th>
                                <th class="vertical-align-middle">
                                  No. of rooms
                                </th>
                                <th class="vertical-align-middle">
                                  Unit size M <sup>2</sup>
                                </th>
                                <th class="vertical-align-middle">
                                  Unit purpose
                                </th>
                                <th style={{ width: "295px" }}>
                                  Tenancy Renewal
                                  <button
                                    type="button"
                                    data-toggle="modal"
                                    data-target=".tenancy-renewal-help"
                                    class="btn btn-link btn-rounded waves-effect font-16px "
                                  >
                                    <span class="mdi mdi-help-circle text-white"></span>
                                  </button>
                                </th>
                                <th class="text-right"></th>
                              </tr>
                            </thead>
                            <tbody>

                              {selectedunitTypes.length > 0 && selectedunitTypes.map((dependent, index) => (
                                <tr key={"unit type" + dependent.unitTypeName + index}>
                                  <td>{index + 1}</td>
                                  <td>{dependent.name}</td>
                                  <td>{dependent.numberOfRooms}</td>
                                  <td>{dependent.squarage}</td>
                                  <td>{dependent.purpose}</td>
                                  <td>{dependent.monthCountForTenancyRenewal}</td>
                                  <td onClick={(e) => removeUnitType(e, index)} >

                                    <a data-id={index} class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent close" title="Delete "><i class="bx bxs-trash "></i></a>
                                  </td>
                                </tr>
                              ))

                              }

                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="7 ">
                                  <button type="button" data-id="PREMISE" onClick={newUnitType}>Add A Unit Type</button>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div> */}

                        <div class="col-12">
                          <div class="bg-primary border-2 bg-soft p-3 mb-4">
                            <p class="fw-semibold mb-0 pb-0 text-uppercase">
                              Applicable charges for this properties
                            </p>
                          </div>
                          <p class="d-none">
                            <strong>
                              Check the correct charges that may be charged from
                              tenants at this property
                            </strong>
                          </p>
                        </div>
                        <div class="col-12 mb-5">
                          <div class="row">
                            <div class="col-4 col-md-5 col-sm-12 h-100">
                              <p class="text-decoration-underline">
                                <i>Applicable Charges</i>
                              </p>
                              <div class="row border-right-1">
                                {applicableCharges &&
                                  applicableCharges
                                    ?.sort((a, b) =>
                                      a.name.localeCompare(b.name)
                                    )
                                    ?.map((charge, index) => (
                                      <>
                                        {charge.applicableChargeType ===
                                          "MONTHLY_CHARGE" && (
                                            <div class="col-6">
                                              <div class="form-check form-check-primary mb-3">
                                                <input
                                                  class="form-check-input"
                                                  type="checkbox"
                                                  name="monthlyCharges"
                                                  value={charge.id}
                                                  onChange={
                                                    selectedApplicableChargeChange
                                                  }
                                                />
                                                <label
                                                  class="form-check-label"
                                                  for="monthlyRent"
                                                >
                                                  {charge.name}
                                                </label>
                                              </div>
                                            </div>
                                          )}
                                      </>
                                    ))}
                              </div>
                            </div>
                            <div class="col-4 col-md-4 col-sm-12 h-100">
                              <p class="text-decoration-underline">
                                <i>Deposits</i>
                              </p>
                              <div class="row border-right-1">
                                {applicableCharges &&
                                  applicableCharges
                                    ?.sort((a, b) =>
                                      a.name.localeCompare(b.name)
                                    )
                                    ?.map((charge, index) => (
                                      <>
                                        {charge.applicableChargeType ===
                                          "DEPOSIT_CHARGE" && (
                                            <div class="col-6">
                                              <div class="form-check form-check-primary mb-3">
                                                <input
                                                  class="form-check-input"
                                                  type="checkbox"
                                                  name="monthlyRent"
                                                  value={charge.id}
                                                  onChange={
                                                    selectedApplicableChargeChange
                                                  }
                                                />
                                                <label
                                                  class="form-check-label"
                                                  for="monthlyRent"
                                                >
                                                  {charge.name}
                                                </label>
                                              </div>
                                            </div>
                                          )}
                                      </>
                                    ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="row">
                            <div class="col-lg-3 col-md-4 col-sm-12">
                              <label for="agreement-type">Landlord MCA Agreement Type<strong class="text-danger ">*</strong></label>
                              <select class="form-control text-capitalize" id="agreement-type" title="Landlord MCA agreement type" name="landLordAgreementTypeId" onChange={handlelandlordDataChange}>
                                <option>select agreement type</option>
                                {agreementTypes?.sort((a, b) => a.name.localeCompare(b.name))?.map((type, index) => (
                                  <option value={type.id} className="text-capitalize">{type.name?.toLowerCase()?.replace(/_/g , " ")}</option>
                                ))
                                }
                              </select>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-12 per-commision">
                              <div class="mb-4 ">
                                <label for="basicpill-lastname-input ">Agreement Period in months<strong class="text-danger ">*</strong></label>
                                <input type="number " min="1" name="agreementPeriod" class="form-control " placeholder="No of months "  onChange={handlelandlordDataChange}/>
                              </div>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-12 per-commision">
                              <div class="mb-4 ">
                                <label for="basicpill-lastname-input ">Percentage commission<strong class="text-danger ">*</strong></label>
                                <input type="number " name="remunerationPercentage" min="1" max="100" class="form-control " placeholder="Remuneration Percentage"  onChange={handlelandlordDataChange}/>
                              </div>
                          </div>
                        </div> */}
                      </form>
                    </section>

                    {/* <!-- premises invoice breakdown --> */}
                    <section className="step-cont d-none">
                      <h3>Invoices breakdown</h3>
                      <div class="row justify-content-center">
                        <div class="col-12">
                          <div class="table-responsive">
                            <table
                              class="table align-middle table-edits rent-invoicing dt-responsive"
                              id="data-table"
                            >
                              <thead className="table-light">
                                <tr class="text-uppercase table-dark">
                                  {/* <th>#</th> */}
                                  <th>Item type</th>
                                  <th>When to Charge</th>
                                  <th>Unit Type</th>
                                  <th>Charge Value</th>
                                </tr>
                              </thead>

                              <tfoot class="table-light">
                                <tr
                                  className=""
                                  onClick={toogleShowUnitTypeChargesModal}
                                >
                                  <td
                                    colSpan="7"
                                    className="bg-light cursor-pointer"
                                  >
                                    <span className="d-flex align-items-center ">
                                      <i className="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                      <span className="pl-5 ">Add Charges</span>
                                    </span>
                                  </td>
                                </tr>
                              </tfoot>
                              <tbody>
                                {premiseUnitTypeCharges.length > 0 &&
                                  premiseUnitTypeCharges.map(
                                    (premiseUnitTypeCharge, index) => (
                                      <tr className="text-capitalize">
                                        {/* <td>
                                      {index + 1}
                                    </td> */}
                                        <td className="text-capitalize">
                                          {
                                            premiseUnitTypeCharge.applicableChargeName
                                          }
                                        </td>
                                        <td className="text-capitalize">
                                          {premiseUnitTypeCharge.applicableChargeType
                                            ?.toLowerCase()
                                            ?.replace(/_/g, " ")}
                                        </td>
                                        <td className="text-capitalize">
                                          {premiseUnitTypeCharge.unitTypeName
                                            ?.toLowerCase()
                                            ?.replace(/_/g, " ")}
                                        </td>
                                        <td>{premiseUnitTypeCharge.value}</td>
                                      </tr>
                                    )
                                  )}

                                {selectedApplicableCharges &&
                                  selectedApplicableCharges.map(
                                    (premiseUnitTypeCharge, indeewx) =>
                                      premiseUnitTypeCharge.expectManualValues &&

                                      <tr>
                                        {/* <td>
                                        {indeewx + 1}
                                      </td> */}
                                        <td>
                                          {premiseUnitTypeCharge.name}
                                        </td>
                                        <td>
                                          {
                                            premiseUnitTypeCharge.applicableChargeType
                                          }
                                        </td>

                                        <td>-</td>
                                        <td>-</td>
                                      </tr>
                                  )
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* adding premise units  */}
                    <section className="step-cont d-none">
                      <h3>Premise Units Addition </h3>
                      <div class="row justify-content-center">
                        <div class="col-12">
                          <div class="table-responsive">
                            <table
                              class="table align-middle table-edits rent-invoicing dt-responsive"
                              id="data-table"
                            >
                              <thead>
                                <tr class="text-uppercase table-light">
                                  <th>#</th>
                                  <th>Unit name</th>
                                  <th>Unit Type</th>
                                  <th className="text-center">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {premiseUnits.length > 0 &&
                                  premiseUnits.map((unit, index) => (
                                    <tr key={index}>
                                      <td>{index + 1} </td>
                                      <td>
                                        {" "}
                                        <input
                                          type="text"
                                          name=""
                                          id=""
                                          value={unit.unitName}
                                          onChange={(e) =>
                                            handleNames(e, index)
                                          }
                                        />
                                      </td>
                                      <td>
                                        <select name="" id="" disabled>
                                          <option>
                                            {
                                              unitTypes?.filter(
                                                (type) =>
                                                  type.id == unit.unitTypeId
                                              )[0].name
                                            }
                                          </option>
                                        </select>
                                      </td>
                                      <td className="text-center" onClick={(e) => handleRemoveUnit(index)}><h3 className="waves"><i className="bx bx-trash"></i></h3></td>
                                    </tr>
                                  ))}
                              </tbody>

                              <div class="d-flex mt-3">
                                <button
                                onClick={()=>  setError({
                                  ...error,
                                  message: "",
                                  color: "",
                                }) }
                                  type="button"
                                  class="btn btn-primary waves-effect btn-label waves-light me-3"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-new-unit-premise"
                                >
                                  <i class="mdi mdi-plus label-icon"></i> Add Unit

                                </button>
                              </div>

                            </table>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* <!-- Document attachments --> */}
                    <section className="step-cont d-none">
                      <h3>Document Attachments</h3>
                      <form>
                        <div class="table-responsive table-responsive-md">
                          <table className="table table-editable-file align-middle table-edits ">
                            <thead className="table-light ">
                              <tr className="text-uppercase table-dark ">
                                <th className="vertical-align-middle ">#</th>
                                <th className="vertical-align-middle ">
                                  Document Type
                                </th>
                                <th className="vertical-align-middle ">
                                  Document Name
                                </th>
                                <th className="vertical-align-middle ">
                                  Actions
                                </th>
                                <th className="text-right "></th>
                              </tr>
                            </thead>
                            <tbody>
                              {premiseDocuments &&
                                premiseDocuments.map((dependent, index) => (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{dependent.documentOwnerTypeName}</td>
                                    <td>{dependent.docName}</td>
                                    <td></td>
                                  </tr>
                                ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td
                                  colSpan="7"
                                  className="bg-light cursor-pointer"
                                  onClick={newDocument}
                                  data-id="PREMISE"
                                >
                                  <span className="d-flex align-items-center ">
                                    <i className="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                    <span className="pl-5 ">
                                      Add Property Documents
                                    </span>
                                  </span>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </form>
                    </section>
                    <div className="button-navigators">
                      <button
                        disabled
                        className="btn btn-primary waves-effect kev-prev me-2"
                      >
                        <i className="mdi-arrow-left mdi font-16px ms-2 me-2"></i>{" "}
                        Previous{" "}
                      </button>
                      <button className="btn btn-primary waves-effect kev-nxt me-2">
                        Next{" "}
                        <i className="mdi mdi-arrow-right font-16px ms-2 me-2"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-success kev-submit me-2 d-none"
                        onClick={submit}
                      >
                        Submit{" "}
                        <i className="mdi mdi-check-all me-2 font-16px"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* <button type='button' className='btn btn-success' onClick={submit}>SUBMIT</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={newUnitTypeModal}
        dialogClassName="my-modal"
        onHide={toogleNewUnitTypeModal}
        centered
      >
        <form onSubmit={addUnitType}>
          <ModalHeader className="justify-content" closeButton>
            <h3>New Unit Type</h3>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <label htmlFor="basicpill-firstname-input">
                    Unit Type<strong className="text-danger">*</strong>
                  </label>

                  <select
                    className="form-control"
                    required
                    onChange={handleUnitTypeChange}
                    name="unitTypeId"
                  >
                    <option></option>
                    {unitTypes &&
                      unitTypes.map((prem, index) => (
                        <option value={prem.id + ":" + prem.name}>
                          {prem.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-4">
                  <label htmlFor="">No. Of Rooms</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={handleUnitTypeChange}
                    name="numberOfRooms"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-4">
                  <label htmlFor="">
                    UNIT SIZE M<sup>2</sup>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={handleUnitTypeChange}
                    name="squarage"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-4">
                  <label htmlFor="">Purpose</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleUnitTypeChange}
                    name="purpose"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <label htmlFor="">TENANCY RENEWAL</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={handleUnitTypeChange}
                    name="monthCountForTenancyRenewal"
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-basic"
              type="button"
              onClick={toogleNewUnitTypeModal}
            >
              Close
            </button>
            <button className="btn btn-success" type="submit">
              Add
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* docs modal */}
      <Modal
        show={showDocumentModal}
        dialogClassName="my-modl"
        onHide={toogleShowNewDocumentModal}
        centered
      >
        <form id="newContactPersonForm" onSubmit={addDocument}>
          <ModalHeader className="justify-content" closeButton>
            <h3>
              New{" "}
              {docBody.documentOwnerTypeName?.toLowerCase()?.replace(/_/g, " ")}{" "}
              Document
            </h3>
          </ModalHeader>
          <ModalBody className="row">
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="basicpill-firstname-input">
                  Document Type<strong className="text-danger">*</strong>
                </label>

                <select
                  className="form-control text-capitalize"
                  onChange={handleDocumentChange}
                  name="documentTypeId"
                  required
                >
                  <option>select document type</option>
                  {documentTypes &&
                    documentTypes
                      ?.sort((a, b) => a.name.localeCompare(b.name))
                      ?.map((prem, index) => (
                        <option value={prem.id + "-" + prem.name} className="text-capitalize">
                          {prem.name?.toLowerCase()?.replace(/_/g, " ")}
                        </option>
                      ))}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="">Doc Name</label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder=""
                  required
                  onChange={(e) => handleDocumentChange(e)}
                  name="docName"
                />
              </div>
            </div>

            <div className="col-md-12">
              <label
                className="input-group-text bg-info text-white cursor-pointer"
                htmlFor="id-front"
              >
                <i className="font-14px mdi mdi-paperclip"></i> Document
              </label>
              <input
                type="file"
                className="form-control"
                name="file"
                required
                onChange={(e) => handleDocumentChange(e)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-basic"
              type="button"
              onClick={toogleShowNewDocumentModal}
            >
              Close
            </button>
            <button className="btn btn-success" type="submit">
              Add
            </button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal
        show={showUnitTypeChargesModal}
        onHide={toogleShowUnitTypeChargesModal}
        centered
        size={"lg"}
      >
        <form id="newContactPersonForm" onSubmit={addAppCharge}>
          <ModalHeader className="justify-content" closeButton>
            <h3>Invoice Breakdown</h3>
          </ModalHeader>
          <ModalBody className="row">
            <div className="col-md-4">
              <div className="mb-4">
                <label htmlFor="basicpill-firstname-input">
                  Applicable Charge Type
                  <strong className="text-danger">*</strong>
                </label>

                <select
                  className="form-control"
                  onChange={(e) => handleChargechange(e, 0)}
                  name="charge"
                  required
                >
                  <option></option>
                  {selectedApplicableCharges &&
                    selectedApplicableCharges
                      ?.sort((a, b) => a.name.localeCompare(b.name))
                      ?.map(
                        (prem, index) =>
                          !prem.expectManualValues && (
                            <option value={prem.id}>{prem.name}</option>
                          )
                      )}
                </select>
              </div>
            </div>
            <hr></hr>
            <h3>Charge Values</h3>

            {unitCharges &&
              unitCharges.map((unitCharge, index) => (
                <div className="card">
                  <div className="row card-body">
                    <div className="col-md-4">
                      <label htmlFor="">Unit Type</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder=""
                        required
                        disabled
                        value={unitCharge.unitTypeName}
                        name="docName"
                      />
                    </div>

                    <div className="col-md-4">
                      <label> Charge Value </label>
                      <input
                        type="number"
                        className="form-control"
                        name="value"
                        required
                        onChange={(e) => handleChargechange(e, index)}
                      />
                    </div>

                    <div className="col-md-4">
                      <label> Collected to: </label>
                      <select
                        className="form-control"
                        required
                        onChange={(e) => handleChargechange(e, index)}
                        name="collectedToClientAccount"
                        disabled={true}
                      >
                        {/* <option></option> */}
                        <option value="client">Client Account</option>
                        {/* <option value="landlord">LandLord Account</option> */}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label> Client Collection Acc </label>
                      <select
                        className="form-control"
                        required
                        onChange={(e) => handleChargechange(e, index)}
                        name="clientCollectionAccountId"
                      >
                        <option></option>
                        {clientAccounts &&
                          clientAccounts.map((prem, index) => (
                            <option value={prem.id}>
                              {prem.bankAccountNumber +
                                " - " +
                                prem.bank.bankName}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label> Invoice Day </label>
                      <input
                        type="number"
                        className="form-control"
                        name="invoiceDay"
                        required
                        min={1}
                        max={30}
                        onChange={(e) => handleChargechange(e, index)}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-basic"
              type="button"
              onClick={toogleShowUnitTypeChargesModal}
              Document
              Attachments
            >
              Close
            </button>
            <button className="btn btn-success" type="submit">
              Add
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* <!-- enter landlord's id modal --> */}

      <Modal show={fileNoShow} centered>
        <ModalBody>
          {error.color !== "" && (
            <div className={"alert alert-" + error.color} role="alert">
              {error.message}
            </div>
          )}
          <div class="text-center mb-4 ">
            <div class="avatar-md mx-auto mb-4 ">
              <div class="avatar-title bg-light rounded-circle text-primary h1 ">
                <i class="mdi mdi-card-account-details-outline "></i>
              </div>
            </div>

            <div class="row justify-content-center ">
              <div class="col-xl-10 ">
                <h4 class="text-primary ">Landlord's File No.</h4>
                <p class="text-muted font-size-14 mb-4 ">
                  Enter the landlords file number if the landlord is already
                  registered in the system. If this is a new landlord, click
                  cancel.
                </p>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div class="row ">
                    <div class="col-9">
                      <div class="mb-3 ">
                        <label for="digit1-input " class="visually-hidden ">
                          File No.
                        </label>
                        <input
                          type="text "
                          class="form-control form-control-lg text-center two-step "
                          placeholder="Enter file No."
                          value={landlordfileNumber}
                          onChange={(e) =>
                            setLandlordfileNumber(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div class="col-3 ">
                      <button
                        class="btn btn-primary btn-block w-100 btn-lg"
                        onClick={saveLandLordFileNumber}
                      >
                        <i class="bx bx-search-alt-2 font-size-16 align-middle me-2 "></i>
                        <div class="d-none">Search</div>
                      </button>
                    </div>

                    <div class="col-12 mb-2">
                      {/*<button class="btn btn-primary btn-block w-100 btn-lg" onClick={redirectToCreateLandlord}>*/}
                      {/*  <i class="bx bx-edit font-size-16 align-middle me-2 ">New Landlord</i>*/}
                      {/*</button>*/}
                      <button
                        className="btn btn-secondary btn-block mt-3 text-center w-100"
                        onClick={redirectToCreateLandlord}
                      >
                        <i className="mdi mdi-account-multiple-plus font-size-16 align-middle me-2 "></i>
                        Its a new landlord
                      </button>
                    </div>

                    <div class="col-12 ">
                      <button
                        class="btn btn-primary btn-block w-100 btn-lg"
                        onClick={redirectToProperties}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <!-- end of ID modal --> */}

      {/* adding a unit to premise  */}
      <Modal show={unitsNumModal} centered>
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUnitsNumModal(false);
            }}
          >
            <div className="form-group">
              <label> Enter number of units</label>
              <input
                type="number"
                required
                className="form-control"
                onChange={(e) => handleUnitsModal(e)}
              />
            </div>
            <button className="btn btn-primary btn-sm mt-4">Submit</button>
          </form>
        </ModalBody>
      </Modal>

      {/* /====Property model */}

      {/* create modal */}
      <div
        class="modal fade"
        id="add-new-property"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                create();
                setCreateName("");
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  New Property Type
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">
                        {" "}
                        Property Type <strong class="text-danger">
                          *
                        </strong>{" "}
                      </label>
                      <input
                        required
                        value={createName}
                        onChange={(e) => setCreateName(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Enter Property Type Name"
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
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="add-new-premise"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createPremise();
                setCreateNames("");
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  New Property Use Type
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">
                        {" "}
                        Property Use Type <strong class="text-danger">*</strong>
                      </label>
                      <input
                        required
                        value={createNames}
                        onChange={(e) => setCreateNames(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Enter Property Use Type Name"
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
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* create modal */}
      <div
        class="modal fade"
        id="add-new-unit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createUnit();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  New Unit Type
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">
                        Unit Type Name <strong class="text-danger">*</strong>
                      </label>
                      <input
                        required
                        value={createNam}
                        onChange={(e) => setCreateNam(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Enter unit type name"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="">
                      Charge Type <strong class="text-danger">*</strong>{" "}
                    </label>
                    <select
                      class=" form-control"
                      multiple
                      onChange={(e) => setChargeTypes1(e)}
                    >
                      {chargeTypes &&
                        chargeTypes
                          ?.sort((a, b) => a.name.localeCompare(b.name))
                          ?.map((charge, index) => {
                            return (
                              <option
                                key={index}
                                value={charge.id}
                                selected={selectedChargeTypes.includes(
                                  charge.name
                                )}
                              >
                                {charge.name}
                              </option>
                            );
                          })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="">
                      Purpose <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={purpose}
                      className="form-control"
                      onChange={(event) => setPurpose(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      Number of Rooms <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={numberOfRooms}
                      className="form-control"
                      onChange={(event) => setNumberOfRooms(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      unit size in M<sup>2</sup>{" "}
                      <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={squarage}
                      className="form-control"
                      onChange={(event) => setSquarage(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="">
                      Months to renewal <strong class="text-danger">*</strong>
                    </label>
                    <input
                      required
                      type="text"
                      value={monthCountForTenancyRenewal}
                      className="form-control"
                      onChange={(event) =>
                        setMonthCountForTenancyRenewal(event.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="add-new-unit-premise"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateUnits();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Add A New Unit
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                {error.color !== "" && (
                  <div className={"alert alert-" + error.color} role="alert">
                    {error.message}
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="true">Select Unit Type</label>
                  <select name="true" id="" className="form-control" onChange={e => setNewUnitId(e.target.value)}>
                    <option value="">select</option>
                    {selectedunitTypes?.map(one => (
                      <option value={one.id} selected={ newUnitId == one.id}>{one.name}</option>
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
                  Close
                </button>
                <button type="submit" class="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProperties;
