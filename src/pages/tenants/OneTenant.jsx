/* global $*/
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { ModalBody } from "react-bootstrap";

import { baseUrl } from "../../services/API";
import AuthService from "../../services/auth.service";
import Message from "../../components/Message";
import Chart from "react-apexcharts";
import numeral from "numeral";
import DatePicker from "react-datepicker";

function OneTenant() {
  const [activeLink, setActiveLink] = useState(1);
  const [tenantData, setTenantData] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  const [tenantId, setTenantId] = useState("");
  const [contactPerson, setContactPerson] = useState([]);
  //edit tenants-details
  const [type, setType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [companyIncorporationNumber, setCompanyIncorporationNumber] =
    useState("");
  const [detailsId, setDetailsId] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyDateOfRegistration, setCompanyDateOfRegistration] =
    useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tenantTypeName, setTenantTypeName] = useState("");
  const [premiseData, setPremiseData] = useState([]);

  //company details

  const [premises, setPremises] = useState([]);
  const [units, setUnits] = useState([]);
  const [premId, setPremId] = useState("");

  const [companyLocation, setCompanyLocation] = useState("");
  //documents

  const [docName, setDocName] = useState("");
  const [docs, setDocs] = useState("");
  const [documentTypeId, setDocumentTypeId] = useState(null);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [tenantDocs, setTenantDocs] = useState([]);
  //modals
  const [show, setShow] = useState(false);
  const [docShow, setdocShow] = useState(true);

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
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setDocs(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // edit tenants
  const [unitTypeName, setUnitTypeName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [unitCondition, setUnitCondition] = useState("");
  const [tenancyStatus, setTenancyStatus] = useState("");
  const [tenancyRenewalDate, setTenancyRenewalDate] = useState("");
  const [tenancyRenewalNotificationDate, setTenancyRenewalNotificationDate] = useState("");
  const [premiseUnitId, setPremiseUnitId] = useState("");
  const [tenantStatuses, setTenantStatuses] = useState([]);
  const [unitId, setUnitId] = useState("");
  const [endReason, setEndReason] = useState("");

  //edit ContactPersons

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [relationship, setRelationship] = useState("");
  const [contactPersonId, setContactPersonId] = useState("");
  const [contactPersonTypeName, setContactPersonTypeName] = useState("");
  const [contactPersonType, setContactPersonType] = useState("");
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  const { id } = useParams();
  const userId = id;

  //communication

  const [communication, setCommunication] = useState([]);
  //  const [typeMes, setTypeMes] = useState("TENANT");
  const [message, setMessage] = useState([]);

  const fetchAll = () => {
    requestsServiceService.viewTenant(userId).then((res) => {
      setTenantData(res.data.data);
      setTenantTypeName(res.data.data.tenant.tenantType);
    });
  };

  const editTenantsDetails = () => {
    let details = JSON.stringify({
      active: true,
      clientId: parseInt(authService.getClientId()),
      companyAddress: companyAddress,
      companyDateOfRegistration: new Date(companyDateOfRegistration),
      companyIncorporationNumber: companyIncorporationNumber,
      companyName: companyName,
      dob: dob,
      email: email,
      firstName: firstName,
      gender: null,
      id: detailsId,
      idNumber: idNumber,
      lastName: lastName,
      maritalStatus: maritalStatus,
      nationality: nationality,
      occupation: null,
      otherName: otherName,
      phoneNumber: phoneNumber,
      tenantTypeName: tenantTypeName,
    });
    //  console.log(id)
    requestsServiceService.updateTenantsDetails(details).then((res) => {
      fetchAll();
    });

    // console.log(details)
  };
  // console.log( editTenantsDetails)
  const handleChangeTenantsDetails = (
    detailsId,
    tenantTypeName,
    firstName,
    lastName,
    otherName,
    phoneNumber,
    email,
    idNumber,
    companyName,
    nationality,
    companyAddress,
    companyDateOfRegistration
  ) => {
    setDetailsId(detailsId);
    setTenantTypeName(tenantTypeName);
    setFirstName(firstName);
    setLastName(lastName);
    setOtherName(otherName);
    setPhoneNumber(phoneNumber);
    setEmail(email);
    setIdNumber(idNumber);
    setCompanyName(companyName);
    setNationality(nationality);
    setCompanyAddress(companyAddress);
    setCompanyDateOfRegistration(companyDateOfRegistration);
  };

  const editTenant = () => {
    let data = JSON.stringify({
      active: true,
      id: userId,
      tenancyRenewalDate: tenancyRenewalDate,
      tenancyRenewalNotificationDate: tenancyRenewalNotificationDate,
      unitTypeName: unitTypeName,
      premiseUnitId: premiseUnitId,
      startDate: new Date(),
      tenancyCharges: [{}],
      tenancyDocuments: [{}],
      tenancyStatusName: tenancyStatus,
      tenantId: unitId,
      unitCondition: unitCondition,
    });
    requestsServiceService.updateTenant(data).then((res) => {
      fetchAll();
    });
  };
  const handleChange = (
    permiseUnitId,
    unitTypeName,
    startDate,
    unitCondition,
    tenancyStatus,
    tenancyRenewalDate,
    tenancyRenewalNotificationDate,
    unitId
  ) => {
    setPremiseUnitId(permiseUnitId);
    setUnitTypeName(unitTypeName);
    setStartDate(startDate);
    setUnitCondition(unitCondition);
    setTenancyStatus(tenancyStatus);
    setTenancyRenewalDate(tenancyRenewalDate);
    setTenancyRenewalNotificationDate(tenancyRenewalNotificationDate);
    setUnitId(unitId);
  };

  const editContactPersons = () => {
    let contacts = JSON.stringify({
      active: true,

      firstName: firstName,
      id: contactPersonId,
      lastName: lastName,
      otherName: otherName,
      contactPersonTypeName: contactPersonTypeName,
      phoneNumber1: phoneNumber1,
      phoneNumber2: phoneNumber2,
      relationship: relationship,
      tenantId: tenantData.tenant.id,
    });
    // console.log(contacts);

    requestsServiceService.updateContactPersons(contacts).then((res) => {
      // console.log(res);

      fetchAll();
    });
  };

  const handleChangeContacts = (
    contactPersonId,
    firstName,
    lastName,
    otherName,
    contactPersonTypeName,
    phoneNumber1,
    relationship
  ) => {
    setContactPersonId(contactPersonId);
    setFirstName(firstName);
    setLastName(lastName);
    setOtherName(otherName);
    setContactPersonTypeName(contactPersonTypeName);
    setPhoneNumber1(phoneNumber1);
    setRelationship(relationship);
  };

  const download = () => {
    requestsServiceService.download(docName).then((res) => {
      // console.log(res);
    });
  };

  const getContactTypeName = () => {
    requestsServiceService.getContactpersons().then((res) => {
      setContactPerson(res.data.data);
    });
  };

  const addConctactPersons = () => {
    let contactPerson = JSON.stringify({
      active: true,

      firstName: firstName,
      id: id,
      lastName: lastName,
      otherName: otherName,
      contactPersonTypeName: contactPersonType,
      phoneNumber1: phoneNumber1,
      phoneNumber2: phoneNumber2,
      relationship: relationship,
      tenantId: tenantData.tenant.id,
    });
    // console.log(contactPerson);
    // console.log(id)

    requestsServiceService
      .createContactPerson(contactPerson)
      .then((res) => {
        // console.log(res);
        fetchAll();

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
          setError({
            ...error,
            message: "",
            color: "",
          });
        }, 3000);
      })
      .catch((res) => {
        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
        }, 3000);
      });
  };

  const addTenancies = () => {
    let data = JSON.stringify({
      active: true,
      // id:0,
      premiseUnitId: premiseUnitId,
      startDate: new Date(),
      tenancyCharges: [],
      tenancyDocuments: [],
      tenancyRenewalDate: tenancyRenewalDate,
      tenancyRenewalNotificationDate: tenancyRenewalNotificationDate,
      tenancyStatusName: "CURRENT",
      tenantId: tenantData.tenant.id,
      unitCondition: unitCondition,
    });

    requestsServiceService
      .createTenancies(data)
      .then((res) => {
        console.log(res);
        fetchAll();
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

  let searchDate = new Date();
  const startingDate = new Date("2022-01-17T03:24:00");


  const getPremises = () => {
    let page = 0
    let size = 10
    let date = new Date()

    let data = {
      "dateCreatedEnd": new Date(),
      "dateCreatedStart": moment(new Date(date.getFullYear(), 0, 1)).format("YYYY-MM-DD"),
      // "search": searchTerm.trim()
    }
    requestsServiceService.getAllpremises(page, size, data).then((res) =>
      setPremises(res.data.data)
    )
  }

  const onPremiseChange = (event) => {
    let vals = event.target.value.split(":");

    requestsServiceService
      .findVacatPremise(vals[0])
      .then((res) => setUnits(res.data.data));
  };
  const premiseUnitChange = (event) => {
    setPremiseUnitId(event.target.value);
  };

  const getStatus = () => {
    requestsServiceService.getTenantStatus().then((res) => {
      setTenantStatuses(res.data.data);
    });
  };

  //documents create
  const createDoc = () => {
    setdocShow(!docShow);

    let data = JSON.stringify({
      docName: docName,
      document: docs,
      documentOwnerTypeName: "TENANT",
      documentTypeId: documentTypeId,
      id: null,
      ownerEntityId: userId,
    });

    requestsServiceService.createDocuments(data).then((res) => {
      // setTenantDocs(res.data.data)
      getDocument();
    });
  };

  const getDocument = () => {
    requestsServiceService.fetchDocuments("TENANT", id).then((res) => {
      setTenantDocs(res.data.data);
    });
  };
  useEffect(() => {
    fetchAll();
    getContactTypeName();
    //  getAllpremises()
    getStatus();
    createDoc();
    createDocumentTypes();
    getDocument();
    fetchCommunication();
    // fetchMessages()
  }, []);

  const createDocumentTypes = (id) => {
    requestsServiceService.getDocumentTypes(id).then((res) => {
      setDocumentTypes(res.data.data);
    });
  };

  const deleteDeactivate = () => {
    requestsServiceService
      .deactivateTenancies(id, endReason)
      .then((res) => {
        console.log(res.data);
        fetchAll();

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
          clearTenant();
        }, 3000);
      })
      .catch((res) => {
        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          clearTenant();
        }, 3000);
      });
  };

  const clearTenant = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };

  // const vacantTenant =(premiseId)=>{
  //   requestsServiceService.findVacatPremise(premiseId).then(()=>{

  //   }
  //   )
  // }
  // console.log(tenancyRenewalDate)


  //communication

  let clientId = AuthService.getClientId();

  const fetchCommunication = () => {


    requestsServiceService
      .getEntityCommunication(userId, 0, 10, "TENANT", clientId)
      .then((res) => {
        setCommunication(res.data.data);
      });
  };

  const date2 = (date) => {
    setTenancyRenewalNotificationDate(new Date(date.target.value));
  };
  const date3 = (date) => {
    setTenancyRenewalDate(new Date(date.target.value));
  };
  $(document).on("change", ".date2", date2);
  $(document).on("change", ".date3", date3);

  // tenant updates=============================
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  const [statements, setStatements] = useState([]);
  const [activeInvoice, setactiveInvoice] = useState({});
  const [invoice_show, setinvoice_show] = useState(false);
  const showInvoice = () => setinvoice_show(true);
  const [activeModal, setActiveModal] = useState(0);
  const closeInvoice = () => {
    setActiveModal(0);
    setinvoice_show(false);
  };
  const getTenantStatements = () => {
    let startdate = moment(startDate).format("YYYY/MM/DD");
    let enddate = moment(endDate).format("YYYY/MM/DD");
    requestsServiceService
      .getTenantStatements(userId, startdate, enddate)
      .then((res) => {
        setStatements(res.data.data);
      });
  };
  useEffect(() => {
    getTenantStatements();
  }, []);
  const getOneInvoice = (bill) => {
    let acc = statements.find((statement) => statement.billNo === bill);
    setactiveInvoice(acc);
    showInvoice();
  };

  const [utilData, setUtilData] = useState({
    newBillNo: "",
    statementId: "",
    tenantId: "",
  });

  const setUtilizeValues = (statementId, tenantId) => {
    setUtilData({
      ...utilData,
      newBillNo: "",
      statementId: statementId,
      tenantId: tenantId,
    });
  };

  const searchBillNo = async (e) => {
    e.preventDefault();
    handleClose();

    await requestsServiceService
      .viewTransactionItem(utilData.newBillNo)
      .then((res) => {
        console.log(res.data);
        if (res.data.paymentStatus !== "PAID") {
          utilize();
        } else {
          setError({
            ...error,
            message: "ERROR: Bill is already paid",
            color: "danger",
          });
        }
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
        }, 2000);
      });
  };

  const utilize = () => {
    requestsServiceService.utilize(utilData).then((res) => {
      if (res.data.status === true) {
        setError({
          ...error,
          message: res.data.message,
          color: "success",
        });
      } else {
        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
      }
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: "",
        });
      }, 2000);
    });
  };

  // MESSAGE TEST
  const [details, setDetails] = useState({
    message: "",
    contact: "",
    recipientName: "",
    entity: null,
    clientName: JSON.parse(authService.getCurrentUserName()).client?.name,
    clientId: parseInt(authService.getClientId()),
    entityType: "TENANCY",
    createdBy: "",
    senderId: "",
    subject: "Invoice Payment",
  });

  const [mode, setmode] = useState("");
  const handleModeChange = (mode) => {
    setmode(mode);
  };
  const handleClicked = (inv, mod) => {
    let mes = `Dear ${inv.paidBy}, your payment for invoice ${inv.billNo
      } for KES ${formatCurrency.format(
        inv.receiptAmount
      )} has been received. Thank you`;
    let senderId =
      JSON.parse(authService.getCurrentUserName()).client?.senderId === null
        ? "REVENUESURE"
        : JSON.parse(authService.getCurrentUserName()).client?.senderId;
    setDetails({
      ...details,
      message: mes,
      contact: mod === "Email" ? inv?.tenant?.email : inv?.tenant?.phoneNumber,
      entity: inv.tenant != undefined ? inv.tenant.id : inv.id,
      recipientName: inv?.tenantName,
      createdBy: authService.getCurrentUserName(),
      senderId: senderId,
      subject: "Invoice Payment",
    });

    $(".email-overlay").removeClass("d-none");
    setTimeout(function () {
      $(".the-message-maker").addClass("email-overlay-transform");
    }, 0);
  };
  const clear = () => {
    setDetails({
      ...details,
      message: "",
      contact: "",
      recipientName: "",
      entity: null,
      clientName: JSON.parse(authService.getCurrentUserName()).client?.name,
      clientId: parseInt(authService.getClientId()),
      entityType: "TENANT",
      createdBy: "",
      senderId: "",
      subject: "Customer Receipt",
    });
  };
  // end tenant updates=============================================

  // Tenant graphs =================================================
  const colors = [
    "#3399ff",
    "#ff7f50",
    "#00ff00",
    "#00a591",
    "#ecdb54",
    "#6b5b95",
    "#944743",
    "#dc4c46",
    "#034f84",
    "#edf1ff",
  ];

  const [dashboardData, setDashboardData] = useState({});
  const [radioBarData, setRadioBarData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [radioBarData2, setRadioBarData2] = useState([]);
  const [transactionModesData, setTransactionModesData] = useState([]);
  const [monthlyCollectionSummaryRevenue, setMonthlyCollectionSummaryRevenue] =
    useState([]);
  useEffect(() => {
    fetchDashData();
  }, [userId, tenantData]);
  // fetch data
  const fetchDashData = () => {
    let startdate = moment(new Date()).startOf("month").format("YYYY/MM/DD");
    let enddate = moment(new Date()).format("YYYY/MM/DD");
    requestsServiceService
      .getTenantDashboard(userId, startdate, enddate)
      .then((res) => {
        // $("#spinner").addClass("d-none");
        setDashboardData(res.data.data);
      });
    requestsServiceService
      .getTenantGraph(userId, startdate, enddate)
      .then((res) => {
        setRadioBarData(res.data.data.collectionSummaryByPremiseUseType);
        setRadioBarData2(res.data.data.collectionSummaryByUnitType);
        setPieChartData(res.data.data.collectionSummaryByApplicableCharge);
        setTransactionModesData(res.data.data.collectionSummaryByPaymentMode);
        setMonthlyCollectionSummaryRevenue(
          res.data.data.monthlyCollectionSummaryRevenue
        );
      });
  };

  // graphs
  var options = {
    chart: {
      height: 360,
      type: "bar",
      stacked: !1,
      toolbar: {
        show: !1,
      },
      zoom: {
        enabled: !0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: "40%",
        // endingShape: "rounded"
      },
    },
    dataLabels: {
      enabled: !1,
    },
    stroke: { show: !0, width: 2, colors: ["transparent"] },

    yaxis: {
      labels: {
        formatter: function (value) {
          // return "KES " + value;
          return numeral(value).format("0,0 a");
        },
        // formatter: function(val, index) {

        //     return numeral(val).format('0,0')
        // },
      },
      title: {
        text: "Amount in KES",
      },
    },
    series: [
      {
        name: "Amount Invoiced",
        data: monthlyCollectionSummaryRevenue?.map((x) => x.variance),
      },
      {
        name: "Amount Paid",
        data: monthlyCollectionSummaryRevenue?.map((x) => x.value),
      },
    ],
    xaxis: {
      categories: monthlyCollectionSummaryRevenue?.map((x) => x.item),
    },
    colors: ["#f46a6a", "#556ee6"],
    legend: {
      position: "bottom",
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

        return (
          "<ul>" +
          "<li><b>Price</b>: " +
          data.x +
          "</li>" +
          "<li><b>Number</b>: " +
          data.y +
          "</li>" +
          "<li><b>Product</b>: '" +
          data.product +
          "'</li>" +
          "<li><b>Info</b>: '" +
          data.info +
          "'</li>" +
          "<li><b>Site</b>: '" +
          data.site +
          "'</li>" +
          "</ul>"
        );
      },
    },

    tooltip: {
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return "KES " + numeral(value).format("0,0");
        },
      },
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (e) {
              return e + " (mins)";
            },
          },
        },
        {
          title: {
            formatter: function (e) {
              return e + " per session";
            },
          },
        },
        {
          title: {
            formatter: function (e) {
              return e;
            },
          },
        },
      ],
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      fillSeriesColor: false,
      theme: "light",
      marker: {
        show: true,
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          let currentTotal = 0;
          series.forEach((s) => {
            currentTotal += s[dataPointIndex];
          });
          return (
            "<span class='text-right w-100 d-flex' > KES " +
            numeral(value).format("0,0") +
            "</span> "
          );
        },
      },
    },
  };

  // pie chart
  var walletOptions = {
    series: radioBarData?.map((x) => x.variance),
    chart: { height: 250, type: "radialBar" },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "35%",
          background: "transparent",
          image: void 0,
        },
        track: {
          show: !0,
          startAngle: void 0,
          endAngle: void 0,
          background: "#f2f2f2",
          strokeWidth: "98%",
          opacity: 1,
          margin: 12,
          dropShadow: {
            enabled: !1,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5,
          },
        },
        dataLabels: {
          name: {
            show: !0,
            fontSize: "16px",
            fontWeight: 600,
            offsetY: -10,
          },
          value: {
            show: !0,
            fontSize: "14px",
            offsetY: 4,
            formatter: function (e) {
              return e + "%";
            },
          },
          total: {
            show: !0,
            label: "Total",
            color: "#373d3f",
            fontSize: "16px",
            fontFamily: void 0,
            fontWeight: 600,
            formatter: function (e) {
              return (
                e.globals.seriesTotals.reduce(function (e, t) {
                  return e + t;
                }, 0) + "%"
              );
            },
          },
        },
      },
    },
    stroke: { lineCap: "round" },
    colors: colors,
    labels: radioBarData.map((x) => x.item),
    legend: { show: !1 },
  };
  // premise type
  var walletOptions2 = {
    series: radioBarData2?.map((x) => x.variance),
    chart: { height: 250, type: "radialBar" },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "18%",
          background: "transparent",
          image: void 0,
        },
        track: {
          show: !0,
          startAngle: void 0,
          endAngle: void 0,
          background: "#f2f2f2",
          strokeWidth: "92%",
          opacity: 1,
          margin: 12,
          dropShadow: {
            enabled: !1,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5,
          },
        },
        dataLabels: {
          name: {
            show: !0,
            fontSize: "16px",
            fontWeight: 600,
            offsetY: -10,
          },
          value: {
            show: !0,
            fontSize: "14px",
            offsetY: 4,
            formatter: function (e) {
              return e + "%";
            },
          },
          total: {
            show: !0,
            label: "Total",
            color: "#373d3f",
            fontSize: "14px",
            fontFamily: void 0,
            fontWeight: 600,
            formatter: function (e) {
              return (
                e.globals.seriesTotals.reduce(function (e, t) {
                  return e + t;
                }, 0) + "%"
              );
            },
          },
        },
      },
    },
    stroke: { lineCap: "round" },
    colors: colors,
    labels: radioBarData2.map((x) => x.item),
    legend: { show: !1 },
  };
  const pieChart = {
    series: pieChartData.map((x) => x.variance),
    chart: { type: "donut", height: 250 },
    labels: pieChartData.map((x) => x.item),
    colors: colors,
    legend: { show: !1 },
    plotOptions: { pie: { donut: { size: "40%" } } },
  };
  // small chart
  var radialoptions1 = {
    series: [99],
    chart: {
      type: "radialBar",
      width: 60,
      height: 60,
      sparkline: {
        enabled: !0,
      },
    },
    dataLabels: {
      enabled: !1,
    },
    colors: ["#556ee6"],
    labels: ["ngbfds"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "60%",
        },
        track: {
          margin: 0,
        },
        dataLabels: {
          show: !1,
        },
      },
    },
  };
  // Tenant graphs end =============================================
  const handleSubmit = (event) => {
    event.preventDefault();
    getTenantStatements();
  };
  return (
    <div className="page-content">
      <div className="content-fluid">
        {/* <!-- start page title --> */}
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0 font-size-18">
                {tenantData?.tenant?.firstName}
              </h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <Link to="/">Dashboard </Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link to="/alltenants">All Tenants</Link>
                  </li>
                  <li class="breadcrumb-item active">
                    {tenantData?.tenant?.firstName}
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
                        Tenant Details<span class="sr-only"></span>
                      </a>
                      <a
                        onClick={() => setActiveLink(2)}
                        class={
                          activeLink === 2
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Tenancies
                      </a>
                      <a
                        onClick={() => setActiveLink(3)}
                        class={
                          activeLink === 3
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Contact persons
                      </a>
                      <a
                        onClick={() => setActiveLink(4)}
                        class={
                          activeLink === 4
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Document Attachments
                      </a>
                      <a
                        onClick={() => setActiveLink(5)}
                        class={
                          activeLink === 5
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Communication
                      </a>
                      <a
                        onClick={() => setActiveLink(6)}
                        className={
                          activeLink === 6
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Statements
                      </a>
                      <a
                        onClick={() => setActiveLink(7)}
                        className={
                          activeLink === 7
                            ? "nav-item nav-link active cursor-pointer"
                            : "nav-item cursor-pointer nav-link"
                        }
                      >
                        Receipts
                      </a>
                    </div >
                  </div >
                </nav >
              </div >
            </div >
          </div >
        </div >
        {/* <!-- end of tool bar --> */}

        {
          activeLink === 1 && (
            <>
              <div className="row">
                <div className="col-xl-4">
                  <div className="card calc-h-3px">
                    <div className="card-body pb-1">
                      <div>
                        <div className="mb-4 me-3">
                          <i className="mdi mdi-account-circle text-primary h1"></i>
                        </div>
                        <div>
                          <h5 className="text-capitalize">
                            {dashboardData?.clientName}
                            {tenantData?.tenant?.active ? (
                              <span className="badge badge-pill badge-soft-success font-size-11 mr-7px">
                                Active
                              </span>
                            ) : (
                              <span className="badge badge-pill badge-soft-success font-size-11 mr-7px">
                                Inactive
                              </span>
                            )}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="card-body border-top">
                      {tenantTypeName === "INDIVIDUAL" ? (
                        <>
                          <p className="text-muted mb-0 d-flex align-items-center">
                            <a
                              href={`tel:${tenantData?.tenant?.phoneNumber}`}
                              className="d-flex align-items-center"
                            >
                              <i className="mdi mdi-phone me-2 font-size-18"></i>{" "}
                              {tenantData?.tenant?.phoneNumber}
                            </a>
                            <span className="px-3 px-3">|</span>
                            <a
                              className="d-flex align-items-center"
                              href={"mailto:" + tenantData?.tenant?.email}
                            >
                              <i className="mdi mdi-email-outline font-size-18 me-2" />
                              {tenantData?.tenant?.email}
                            </a>
                          </p>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="card-body border-top">
                      {tenantTypeName === "INDIVIDUAL" ? (
                        <>
                          <p className="p-2 m-0">
                            <span className="text-muted">National ID No.</span>
                            {tenantData?.tenant?.idNumber}
                          </p>
                          <p className="p-2 m-0">
                            <span className="text-muted">Nationality. </span>
                            {tenantData?.tenant?.nationality}
                          </p>
                          <p className="p-2 m-0">
                            <span className="text-muted">Tenant Type. </span>
                            {tenantData?.tenant?.tenantType
                              ?.toLowerCase()
                              ?.replace(/_/g, " ")}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="p-2 m-0">
                            <span className="text-muted">
                              Company Incorporation Number
                            </span>
                            {tenantData?.tenant?.companyIncorporationNumber}
                          </p>
                          <p className="p-2 m-0">
                            <span className="text-muted">Company Address </span>
                            {tenantData?.tenant?.companyAddress}
                          </p>
                          <p className="p-2 m-0">
                            <span className="text-muted">
                              Company Date Of Registration
                            </span>
                            {moment(
                              tenantData?.tenant?.companyDateOfRegistration
                            ).format("DD /MM /YYYY")}
                          </p>
                        </>
                      )}
                    </div>
                  </div >
                </div >
                <div className="col-xl-8">
                  <div className="row">
                    <div className="col-xl-8">
                      <div className="row">
                        <div className="col-lg-12 px-sm-30px">
                          <div className="card">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-lg-12 align-self-center">
                                  <div className="text-lg-left mt-4 mt-lg-0">
                                    <div className="row ">
                                      <div className="col-4 col-sm-3 col-md-2">
                                        <div>
                                          <div className="avatar-xs mb-3">
                                            <span className="avatar-title rounded-circle bg-secondary font-size-16">
                                              <i className="mdi mdi-office-building-outline text-white"></i>
                                            </span>
                                          </div>
                                          <p className="text-muted text-truncate mb-2">
                                            Premises
                                          </p>
                                          <h5 className="mb-0">
                                            {dashboardData?.premiseCount}
                                          </h5>
                                        </div>
                                      </div>
                                      {dashboardData?.premiseUnitsSummary?.map(
                                        (item) => (
                                          <div className="col-4 col-sm-3 col-md-2">
                                            <div>
                                              <div className="avatar-xs mb-3">
                                                <span className="avatar-title rounded-circle bg-danger font-size-16">
                                                  <i className="mdi mdi-home-export-outline  text-white"></i>
                                                </span>
                                              </div>
                                              <p className="text-muted text-truncate mb-2 text-capitalize">
                                                {item.item
                                                  ?.toLowerCase()
                                                  ?.replace(/-/g, " ")}{" "}
                                                Units
                                              </p>
                                              <h5 className="mb-0">
                                                {item.count}
                                              </h5>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <!-- end row --> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="row">
                            {dashboardData?.collectionSummaryByPaymentStatus?.map(
                              (item) => (
                                <div className="col-sm-6">
                                  <div className="card">
                                    <div className="card-body">
                                      <div className="d-flex align-items-center mb-3">
                                        <div className="avatar-xs-2 me-3">
                                          <span className="avatar-title rounded-circle bg-danger bg-soft text-danger  font-size-18">
                                            <i className="mdi  mdi-cash-remove h2 mb-0 pb-0 text-danger"></i>
                                          </span>
                                        </div>
                                        <div className="d-flex flex-column">
                                          <span className="text-capitalize">
                                            {item.item
                                              ?.toLowerCase()
                                              ?.replace(/-/g, " ")}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="text-muted mt-4">
                                        <h4>
                                          {formatCurrency.format(item.value)}
                                          <i className="mdi mdi-chevron-up ms-1 text-success"></i>
                                        </h4>
                                        <div className="d-flex">
                                          <span className="text-truncate text-capitalize">
                                            From {item.count}{" "}
                                            {item.item
                                              ?.toLowerCase()
                                              ?.replace(/-/g, " ")}{" "}
                                            Invoices
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                          {/* <!-- end row --> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title mb-4">
                        Bill Payment Mode Comparison
                      </h4>

                      <div className="table-responsive mt-4">
                        <table className="table align-middle mb-0">
                          <tbody>
                            {transactionModesData?.map((item) => (
                              <tr>
                                <td>
                                  <h5 className="font-size-14 mb-1">
                                    {item.item}
                                  </h5>
                                  <p className="text-muted mb-0">
                                    {formatCurrency.format(item.value)}
                                  </p>
                                </td>

                                <td>
                                  <div id="radialchart-1" className="apex-charts">
                                    <Chart
                                      class="apex-charts"
                                      options={radialoptions1}
                                      plotOptions={radialoptions1.plotOptions}
                                      series={[item.variance]}
                                      labels={radialoptions1.labels}
                                      type="radialBar"
                                      height="60"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <p className="text-muted mb-1">Transactions</p>
                                  <h5 className="mb-0">{item.variance} %</h5>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8">
                  <div className="card">
                    <div>
                      <div className="row">
                        <div className="col-12">
                          <div className="p-4">
                            <h5 className="text-primary mb-0 pb-0">
                              Rent collection summary
                            </h5>
                            <span>Rent collection summary for tenant </span>
                            <div className="row">
                              <div className="col-12">
                                <div
                                  id="revenue-chart"
                                  className="apex-charts"
                                  dir="ltr"
                                >
                                  <Chart
                                    class="apex-charts revenue-type"
                                    options={options}
                                    plotOptions={options.plotOptions}
                                    series={options.series}
                                    type="bar"
                                    height="360"
                                    xaxis={options.xaxis}
                                  />
                                </div>{" "}
                              </div>
                            </div>
                          </div>
                        </div >
                      </div >
                    </div >
                  </div >
                </div >
              </div >
            </>
          )
        }

        {
          activeLink === 2 && (
            <div>
              <div className="row">
                <div className="col-12">
                  <div className="card calc-h-3px">
                    <div>
                      <div className="row">
                        <div className="col-12">
                          <div className="card-body bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                            <div
                              className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                              role="toolbar"
                            >
                              <div className="d-flex align-items-center flex-grow-1">
                                <h4 className="mb-0  bg-transparent  p-0 m-0">
                                  Tenancies
                                </h4>
                              </div>
                              <div className="d-flex">
                                <button
                                  type="button"
                                  className="btn btn-primary waves-effect btn-label waves-light me-3"
                                  data-bs-toggle="modal"
                                  data-bs-target="#create-tenancies"
                                >
                                  <i
                                    className="mdi mdi-plus label-icon"
                                    onClick={() => setSearchTerm("")}
                                  ></i>{" "}
                                  Add Tenancies
                                </button>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="card-body">
                              {error.color !== "" && (
                                <div
                                  className={"alert alert-" + error.color}
                                  role="alert"
                                >
                                  {error.message}
                                </div>
                              )}
                              <div className="table-responsive table-responsive-vontainer">
                                <table
                                  className="table align-middle table-nowrap table-hover"
                                  id="datatable-buttons"
                                >
                                  <thead>
                                    <tr class="text-uppercase table-dark">
                                      <th>#</th>
                                      <th>Unit Name</th>
                                      <th>Premise Name</th>
                                      <th>Unit Type</th>
                                      <th>Start Date</th>
                                      <th>Unit Condition</th>
                                      <th>Tenancy Status</th>
                                      <th>TenancyRenewalDate</th>
                                      <th>TenancyRenewalNotificationDate</th>
                                      <th>Status</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tenantData.tenancies &&
                                      tenantData.tenancies.map((unit, index) => (
                                        <tr data-id="1">
                                          <td>{index + 1}</td>
                                          <td>{unit.premiseUnit.unitName}</td>
                                          <td>
                                            {unit.premiseUnit.premise.premiseName}
                                          </td>

                                          <td className="text-capitalize">
                                            {unit.premiseUnit.unitType.name}
                                          </td>
                                          <td>
                                            {moment(
                                              unit.startDate &&
                                              unit.startDate.replace(
                                                /[TZ]/g,
                                                " "
                                              )
                                            ).format("DD /MM /YYYY")}
                                          </td>
                                          <td>{unit.unitCondition}</td>
                                          <td>
                                            <span className="badge-soft-success badge">
                                              {" "}
                                              {unit.tenancyStatus.toLowerCase()}
                                            </span>
                                          </td>
                                          <td>
                                            {unit.tenancyRenewalDate &&
                                              moment(
                                                unit.tenancyRenewalDate
                                              ).format("DD/ MM/ YYYY")}
                                          </td>
                                          <td>
                                            {unit.tenancyRenewalNotificationDate &&
                                              moment(
                                                unit.tenancyRenewalNotificationDate
                                              ).format("DD /MM/ YYYY")}
                                          </td>

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

                                          <td className="text-right ">
                                            <div class="dropdown">
                                              <a
                                                class="text-muted font-size-16"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                              >
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                              </a>

                                              <div class="dropdown-menu dropdown-menu-end text-capitalize">
                                                <p
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#edit-tenant"
                                                  class="dropdown-item"
                                                  href="#"
                                                  onClick={() =>
                                                    handleChange(
                                                      unit.premiseUnit.id,
                                                      unit.premiseUnit.unitName,
                                                      unit.startDate,
                                                      unit.unitCondition,
                                                      unit.tenancyStatus,
                                                      unit.tenancyRenewalDate,
                                                      unit.tenancyRenewalNotificationDate,
                                                      unit.id
                                                    )
                                                  }
                                                >
                                                  <i class="font-size-15 mdi mdi-pencil me-3"></i>
                                                  Edit
                                                </p>
                                                <p>
                                                  <Link
                                                    class="dropdown-item"
                                                    to={`/premise/tenant/${unit.id}`}
                                                  >
                                                    <i class="font-size-15 mdi mdi-eye-plus-outline cursor-pinter me-3"></i>
                                                    view
                                                  </Link>
                                                </p>

                                                <button
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#vacate-modal"
                                                  class="dropdown-item "
                                                  onClick={() => setEndReason("")}
                                                >
                                                  <i class="font-size-8 mdi mdi-close-circle me-3">
                                                    Vacate Tenant
                                                  </i>
                                                </button>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {
          activeLink === 3 && (
            <div>
              <div className={"row"}>
                <div className="col-12">
                  <div className="card calc-h-3px">
                    <div>
                      <div className="row">
                        <div className="col-12">
                          <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                            <div
                              className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                              role="toolbar"
                            >
                              <div className="d-flex align-items-center flex-grow-1">
                                <h4 className="mb-0  bg-transparent  p-0 m-0">
                                  Contact Persons
                                </h4>
                              </div>
                              <div className="d-flex">
                                <button
                                  type="button"
                                  className="btn btn-primary waves-effect btn-label waves-light me-3"
                                  data-bs-toggle="modal"
                                  data-bs-target="#create-contact"
                                >
                                  <i className="mdi mdi-plus label-icon"></i> Add
                                  ContactPerson
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="row">
                              <div className="col-12">
                                <div
                                  className={"alert alert-" + error.color}
                                  role="alert"
                                >
                                  {error.message}
                                </div>
                                <div className="table-responsive">
                                  <table className="table align-middle table-nowrap table-hover mb-0">
                                    <thead>
                                      <tr class="text-uppercase table-dark">
                                        <th>#</th>
                                        <th>Name (s) </th>
                                        <th>Type</th>
                                        <th>Relationship</th>
                                        <th>phone No</th>
                                        <th>Status</th>
                                        <th className="text-right">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {tenantData.contactPeople &&
                                        tenantData.contactPeople.map(
                                          (unit, index) => (
                                            <tr data-id="1">
                                              <td>{index + 1}</td>
                                              <td>
                                                {unit.firstName} {unit.lastName}{" "}
                                                {unit.otherName}
                                              </td>
                                              <td className="text-capitalize">
                                                {unit.contactPersonType
                                                  .toLowerCase()
                                                  .replace(/_/g, " ")}
                                              </td>
                                              <td>{unit.relationship}</td>
                                              <td>{unit.phoneNumber1}</td>
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

                                              <td className="text-right cell-change ">
                                                <a
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#edit-contact"
                                                  className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit"
                                                  onClick={() =>
                                                    handleChangeContacts(
                                                      unit.id,

                                                      unit.firstName,
                                                      unit.lastName,
                                                      unit.otherName,
                                                      unit.contactPersonType,
                                                      unit.phoneNumber1,
                                                      unit.relationship
                                                    )
                                                  }
                                                >
                                                  <i className="bx bx-edit-alt " />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {
          activeLink === 4 && (
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
                            <span className="pl-1 d-md-inline">New document</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card-body" onSubmit={createDoc}>
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
                                <th>Own type</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tenantDocs &&
                                tenantDocs.map((unit, index) => (
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
                                    <td>
                                      <a
                                        href={
                                          baseUrl +
                                          "/documents/download?docName=" +
                                          `${unit.docName}`
                                        }
                                        className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit"
                                        target="_blank"
                                      >
                                        <i className="bx bx-download" />
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

              {/*document attachment modal*/}

              <div>
                <Modal
                  show={docShow}
                  onHide={handleDocClose}
                  className={"modal fade"}
                  centered
                >
                  <form onSubmit={createDoc}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Documents</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group mb-4">
                            <label htmlFor="">
                              Select Document Type.{" "}
                              <strong className="text-danger ">*</strong>
                            </label>
                            <select
                              className="form-control text-capitalize"
                              onChange={(e) => {
                                setDocumentTypeId(e.target.value);
                              }}
                              name="document type"
                              required={true}
                            >
                              <option className="text-black font-semibold ">
                                select..
                              </option>
                              {documentTypes &&
                                documentTypes
                                  .sort((a, b) => a.name.localeCompare(b.name))
                                  ?.map((dT) => {
                                    return (
                                      <option key={dT.id} value={dT.id}>
                                        {dT.name
                                          ?.toLowerCase()
                                          .replace(/_/g, " ")}
                                      </option>
                                    );
                                  })}
                            </select>
                          </div>
                          <div className="form-group mb-4">
                            <label htmlFor="">
                              Document Name.{" "}
                              <strong className="text-danger ">*</strong>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={docName}
                              onChange={(e) => setDocName(e.target.value)}
                              placeholder="Enter document name"
                              required={true}
                            />
                          </div>
                          <div className="form-group mb-4">
                            <label htmlFor="">
                              Document Upload.{" "}
                              <strong className="text-danger ">*</strong>
                            </label>
                            <div className="input-group mb-0">
                              <label
                                className="input-group-text bg-info text-white cursor-pointer"
                                htmlFor="document1-1"
                              >
                                <i className="font-14px mdi mdi-paperclip"></i>{" "}
                                Attach File
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                id="document1-1"
                                onChange={(e) => handleFileRead(e)}
                                required={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        className={"btn btn-grey"}
                        onClick={handleDocClose}
                      >
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        className={"btn btn-primary"}
                        type={"submit"}
                      >
                        Add Document
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal>
              </div>
            </div>
          )
        }

        {
          activeLink === 5 && (
            <div>
              <div class="container-fluid">
                {/* <!-- start page title --> */}
                <div class="row">
                  <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                      <h4 class="mb-sm-0 font-size-18">All Messages</h4>
                    </div>
                  </div>
                </div>
                {/* <!-- end page title --> */}

                <div class="row">
                  <div class="col-12">
                    {/* <!-- Right Sidebar --> */}
                    <div class="mb-3">
                      <div class="card">
                        <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                          <div
                            class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                            role="toolbar"
                          >
                            <div class="d-flex align-items-center flex-grow-1"></div>
                          </div>
                        </div>
                        <div class="card-body the-inbox">
                          <table
                            id="emailDataTable-btns"
                            class="table   nowrap w-100 table-hover mt-0 mb-0"
                          >
                            <thead>
                              <tr class="d-none">
                                <th>Mode</th>
                                <th>
                                  {/* <!-- this is where the index is stored --> */}
                                </th>
                                <th>Status</th>
                                <th>Name</th>
                                <th>Message Content</th>
                                <th>Date</th>
                              </tr>
                            </thead>

                            <tbody class="table-hover">
                              {communication?.map((com, index) => (
                                

                                <tr data-id="1">
                                  <td>{index + 1}</td>
                                  {/* <tr class="text-nowrap" data-toggle="modal" data-target="#messageDetails"> */}
                                  <td class="">
                                    {/* <!-- put the index here --> */}

                                    <div class="flex-shrink-0 align-self-center m-0 p-0 d-flex d-md-none">
                                      <div class="avatar-xs m-0">
                                        <span class="avatar-title rounded-circle bg-success bg-orange text-white">
                                          AW
                                        </span>
                                      </div>
                                    </div>

                                    <span class=" font-size-18 d-none d-md-flex">
                                      <i class="mdi mdi-chat-outline text-info pr-2">
                                        <span class="d-none">Email</span>
                                      </i>
                                      <i class="mdi mdi-email-check-outline text-info pr-2">
                                        <span class="d-none">sms</span>
                                      </i>
                                    </span>
                                    <span class=" font-size-18 d-flex d-md-none">
                                      <br />
                                      <i class="mdi mdi-chat-outline text-info pr-2">
                                        <span class="d-none">
                                          {com.communicationType}
                                        </span>
                                      </i>
                                      {/* <i class="mdi mdi-email-check-outline text-info pr-2"><span class="d-none">email</span></i> */}
                                    </span>
                                  </td>

                                  <td class="d-none">
                                    <span class="d-none">0</span>
                                  </td>

                                  <td class="text-capitalize d-none d-md-table-cell">
                                    {com.createdBy}
                                  </td>
                                  <td class="the-msg the-msg-2">
                                  <span>{JSON.parse(com.data).text}</span>
                                           
                                            </td>                                                

                                  <td class="text-capitalize d-none d-md-table-cell">
                                    {moment(com.dateTimeCreated).format(
                                      "ddd MMM DD"
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end Col-9 --> */}
                  </div>
                </div>
                {/* <!-- End row --> */}
              </div>
              {/* <!-- container-fluid --> */}
            </div>
          )
        }

        {
          activeLink === 6 && (
            <div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                      <div
                        className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                        role="toolbar"
                      >
                        <h4 className="card-title text-capitalize mb-0 ">
                          Tenant Statements
                        </h4>
                        <div className=" d-flex justify-content-between align-items-center pr-3">
                          <form className="d-flex align-items-center">
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="flex p-2">
                                <span className="input-group-text">
                                  <i className="mdi mdi-calendar">Start Date:</i>
                                </span>
                                <DatePicker
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  selectsStart
                                  className="form-control cursor-pointer"
                                  startDate={startDate}
                                  endDate={endDate}
                                  maxDate={new Date()}
                                />
                              </div>
                              <div className="flex p-2" id="datepicker1">
                                <span className="input-group-text">
                                  <i className="mdi mdi-calendar">End Date:</i>
                                </span>
                                <DatePicker
                                  selected={endDate}
                                  onChange={(date) => setEndDate(date)}
                                  selectsEnd
                                  showMonthDropdown
                                  showYearDropdown
                                  className="form-control cursor-pointer"
                                  calendarClassName="form-group"
                                  startDate={startDate}
                                  endDate={endDate}
                                  maxDate={new Date()}
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <input
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                value="filter"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive overflow-visible">
                        {error.color !== "" && (
                          <div
                            className={"alert alert-" + error.color}
                            role="alert"
                          >
                            {error.message}
                          </div>
                        )}
                        <table
                          className="table align-middle table-hover  contacts-table table-striped "
                          id="datatable-buttons"
                        >
                          <thead className="table-light">
                            <tr className="table-dark">
                              <th>Bill No</th>
                              <th>Receipt Amount</th>
                              <th>Pay Reference No</th>
                              <th>Payment Mode</th>
                              <th>Paid By</th>
                              <th>Tenant Name</th>
                              <th>Utilized Amount</th>
                              <th className="text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {statements &&
                              statements?.length > 0 &&
                              statements?.map((statement, index) => (
                                <tr data-id={index} key={statement.id}>
                                  <td>{statement.billNo}</td>
                                  <td>
                                    {formatCurrency.format(
                                      statement.receiptAmount
                                    )}
                                  </td>
                                  <td>{statement.payReferenceNo}</td>
                                  <td>{statement.paymentMode}</td>
                                  <td>{statement.paidBy}</td>
                                  <td>
                                    {statement?.tenant?.tenantType ===
                                      "INDIVIDUAL" ? (
                                      <>
                                        {statement?.tenant?.firstName}{" "}
                                        {statement?.tenant?.lastName}
                                      </>
                                    ) : (
                                      <>{statement?.tenant?.companyName}</>
                                    )}
                                  </td>
                                  <td>
                                    {formatCurrency.format(
                                      statement.utilisedAmount
                                    )}
                                  </td>
                                  <td>
                                    <div className="d-flex justify-content-end">
                                      <div className="dropdown">
                                        <a
                                          className="text-muted font-size-16 cursor-pinter"
                                          role="button"
                                          data-bs-toggle="dropdown"
                                          aria-haspopup="true"
                                        >
                                          <i className="bx bx-dots-vertical-rounded"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end ">
                                          <span
                                            className="dropdown-item cursor-pinter"
                                            onClick={() => {
                                              setActiveModal(1);
                                              getOneInvoice(statement.billNo);
                                            }}
                                          >
                                            <i className="font-size-15 mdi mdi-eye me-3 "></i>
                                            View
                                          </span>

                                          {statement.utilisedAmount <
                                            statement.receiptAmount && (
                                              <a
                                                className="dropdown-item  cursor-pointer"
                                                onClick={() => {
                                                  handleShow();
                                                  setUtilizeValues(
                                                    statement?.id,
                                                    statement?.tenant?.id
                                                  );
                                                }}
                                              >
                                                <i className="font-size-15 mdi mdi-account-check me-3 "></i>
                                                Utilize
                                              </a>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                          <tfoot className="table-light">
                            <tr>
                              <th
                                className="text-capitalize text-nowrap"
                                colSpan="3"
                              >
                                {statements?.length} Statements
                              </th>
                              <td className="text-nowrap text-right" colSpan="7">
                                <span className="fw-semibold">
                                  {/*{formatCurrency.format(total())}*/}
                                </span>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {
          activeLink === 7 && (
            <div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                      <div
                        className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                        role="toolbar"
                      >
                        <h4 className="card-title text-capitalize mb-0 ">
                          Receipts
                        </h4>
                        <div className=" d-flex justify-content-between align-items-center pr-3">
                          <form className="d-flex align-items-center">
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="flex p-2">
                                <span className="input-group-text">
                                  <i className="mdi mdi-calendar">Start Date:</i>
                                </span>
                                <DatePicker
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  selectsStart
                                  className="form-control cursor-pointer"
                                  startDate={startDate}
                                  endDate={endDate}
                                  maxDate={new Date()}
                                />
                              </div>
                              <div className="flex p-2" id="datepicker1">
                                <span className="input-group-text">
                                  <i className="mdi mdi-calendar">End Date:</i>
                                </span>
                                <DatePicker
                                  selected={endDate}
                                  onChange={(date) => setEndDate(date)}
                                  selectsEnd
                                  showMonthDropdown
                                  showYearDropdown
                                  className="form-control cursor-pointer"
                                  calendarClassName="form-group"
                                  startDate={startDate}
                                  endDate={endDate}
                                  maxDate={new Date()}
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <input
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                value="filter"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <Message details={details} mode={mode} clear={clear} />
                    <div className="card-body">
                      <div className="table-responsive overflow-visible">
                        <table
                          className="table align-middle table-hover  contacts-table table-striped "
                          id="datatable-buttons"
                        >
                          <thead className="table-light">
                            <tr className="table-dark">
                              <th>receiptNo</th>
                              <th>paid by</th>
                              <th>Tenant</th>
                              <th>bill amount</th>
                              <th>bill balance</th>
                              <th>payment mode</th>
                              <th>payment ref</th>
                              <th className="text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {statements &&
                              statements?.length > 0 &&
                              statements?.map((statement, index) => (
                                <tr data-id={index} key={index}>
                                  <td>{statement.receiptNo}</td>
                                  <td>{statement.paidBy}</td>
                                  <td>
                                    {statement?.tenant?.tenantType ===
                                      "INDIVIDUAL" ? (
                                      <>
                                        {statement?.tenant?.firstName}{" "}
                                        {statement?.tenant?.lastName}
                                      </>
                                    ) : (
                                      <>{statement?.tenant?.companyName}</>
                                    )}
                                  </td>
                                  <td>
                                    {formatCurrency.format(
                                      JSON.parse(statement.response).receiptInfo
                                        .billAmount
                                    )}
                                  </td>
                                  <td>
                                    {formatCurrency.format(
                                      JSON.parse(statement.response).receiptInfo
                                        .billBalance
                                    )}
                                  </td>
                                  <td>{statement.paymentMode}</td>
                                  <td>{statement.payReferenceNo}</td>
                                  <td>
                                    <div className="d-flex justify-content-end">
                                      <div className="dropdown">
                                        <a
                                          className="text-muted font-size-16"
                                          role="button"
                                          data-bs-toggle="dropdown"
                                          aria-haspopup="true"
                                        >
                                          <i className="bx bx-dots-vertical-rounded"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end ">
                                          <span
                                            className="dropdown-item cursor-pointer"
                                            onClick={() => {
                                              setActiveModal(2);
                                              getOneInvoice(statement.billNo);
                                            }}
                                          >
                                            <i className="font-size-15 mdi mdi-eye me-3 "></i>
                                            View
                                          </span>
                                          <a className="dropdown-item " href="# ">
                                            <i className="font-size-15 mdi mdi-printer me-3 "></i>
                                            Print
                                          </a>
                                          <a
                                            className="dropdown-item cursor-pointer"
                                            onClick={() => {
                                              handleModeChange("Email");
                                              handleClicked(statement, "Email");
                                            }}
                                          >
                                            <i className="font-size-15 mdi mdi-email me-3 "></i>
                                            Email Tenant
                                          </a>
                                          <a
                                            className="dropdown-item cursor-pointer"
                                            onClick={() => {
                                              handleModeChange("SMS");
                                              handleClicked(statement, "SMS");
                                            }}
                                          >
                                            <i className="font-size-15 mdi mdi-chat me-3 "></i>
                                            Send as SMS
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                          <tfoot className="table-light">
                            <tr>
                              <th
                                className="text-capitalize text-nowrap"
                                colSpan="3"
                              >
                                {statements?.length} Receipts
                              </th>
                              <td className="text-nowrap text-right" colSpan="7">
                                <span className="fw-semibold">
                                  {/*{formatCurrency.format(total())}*/}
                                </span>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      {/*<div className="mt-4 mb-0 flex justify-between px-8">*/}
                      {/*  {pageCount !== 0 && (*/}
                      {/*    <p className=" font-medium text-xs text-gray-700">*/}
                      {/*      {" "}*/}
                      {/*      showing page{" "}*/}
                      {/*      <span className="text-green-700 text-opacity-100 font-bold text-sm">*/}
                      {/*        {page + 1}*/}
                      {/*      </span>{" "}*/}
                      {/*      of{" "}*/}
                      {/*      <span className="text-sm font-bold text-black">*/}
                      {/*        {pageCount}*/}
                      {/*      </span>{" "}*/}
                      {/*      pages*/}
                      {/*    </p>*/}
                      {/*  )}*/}

                      {/*  {pageCount !== 0 && (*/}
                      {/*    <ReactPaginate*/}
                      {/*      previousLabel={"prev"}*/}
                      {/*      nextLabel={"next"}*/}
                      {/*      breakLabel={"..."}*/}
                      {/*      pageCount={pageCount} // total number of pages needed*/}
                      {/*      marginPagesDisplayed={2}*/}
                      {/*      pageRangeDisplayed={1}*/}
                      {/*      onPageChange={handlePageClick}*/}
                      {/*      breakClassName={"page-item"}*/}
                      {/*      breakLinkClassName={"page-link"}*/}
                      {/*      containerClassName={"pagination"}*/}
                      {/*      pageClassName={"page-item"}*/}
                      {/*      pageLinkClassName={"page-link"}*/}
                      {/*      previousClassName={"page-item"}*/}
                      {/*      previousLinkClassName={"page-link"}*/}
                      {/*      nextClassName={"page-item"}*/}
                      {/*      nextLinkClassName={"page-link"}*/}
                      {/*      activeClassName={"active"}*/}
                      {/*    />*/}
                      {/*  )}*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        <div
          class="modal fade"
          id="edit-tenant"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Tenancies
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
                      <label for="">UnitName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter UnitTypeName"
                        onChange={(event) =>
                          setUnitTypeName(event.target.value)
                        }
                        value={unitTypeName}
                      />
                    </div>
                    <div class="form-group mb-4" id="datepicker12">
                      <label for="">StartDate</label>
                      <input
                        type="text"
                        class="form-control mouse-pointer enddate"
                        placeholder="Enter StartDate"
                        readOnly
                        data-date-format="dd M, yyyy"
                        data-date-container="#datepicker12"
                        data-provide="datepicker"
                        data-date-autoclose="true"
                        onChange={(event) => setStartDate(event.target.value)}
                        value={startDate}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">Unit Condition</label>
                      <input
                        type="text"
                        className="form-control "
                        value={unitCondition}
                        onChange={(e) => setUnitCondition(e.target.value)}
                        placeholder="Enter UnitCondition"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">TenancyStatus</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter TenancyStatus"
                        onChange={(e) => setTenancyStatus(e.target.value)}
                        value={tenancyStatus}
                      />
                    </div>

                    <div className="form-group mb-4" id="datepicker14">
                      <label htmlFor="">TenancyRenewalDate</label>
                      <input
                        type="text"
                        className="form-control mouse-pointer enddate"
                        value={tenancyRenewalDate}
                        onChange={(e) => setTenancyRenewalDate(e.target.value)}
                        placeholder="Enter TenancyRenewalDate"
                        readOnly
                        data-date-format="dd M, yyyy"
                        data-date-container="#datepicker14"
                        data-provide="datepicker"
                        data-date-autoclose="true"
                        required={true}
                      />
                    </div>

                    <div className="form-group mb-4" id="datepicker151">
                      <label htmlFor="">TenancyRenewalNotificationDate</label>
                      <input
                        type="text"
                        className="form-control mouse-pointer enddate"
                        value={tenancyRenewalNotificationDate}
                        onChange={(e) =>
                          setTenancyRenewalNotificationDate(e.target.value)
                        }
                        placeholder="TenancyRenewalNotificationDate"
                        readOnly
                        data-date-format="dd M, yyyy"
                        data-date-container="#datepicker151"
                        data-provide="datepicker"
                        data-date-autoclose="true"
                        required={true}
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
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={editTenant}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Modal */}

        <div
          class="modal fade"
          id="edit-contact"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Tenant
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
                      <label for="">FirstName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter FirstName"
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                      />
                    </div>

                    <div class="form-group mb-4">
                      <label for="">LastName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter LastName"
                        onChange={(event) => setLastName(event.target.value)}
                        value={lastName}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">OtherName</label>
                      <input
                        type="text"
                        className="form-control"
                        value={otherName}
                        onChange={(e) => setOtherName(e.target.value)}
                        placeholder="Enter OtherName"
                        required={true}
                      />
                    </div>

                    <div class="form-group mb-4">
                      <label for="">Type</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Type"
                        onChange={(event) =>
                          setContactPersonTypeName(event.target.value)
                        }
                        value={contactPersonTypeName}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">PhoneNumber1</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phoneNumber1}
                        onChange={(e) => setPhoneNumber1(e.target.value)}
                        placeholder="Enter PhoneNumber1"
                        required={true}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">Relationship</label>
                      <input
                        type="text"
                        className="form-control"
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        placeholder="Enter Relationship"
                        required={true}
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
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => editContactPersons()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 

      //edit tenanant details */}
        <div
          class="modal fade"
          id="edit-tenant-detail"
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
                {/* //Company */}

                <div className="row">
                  <div className="form-group">
                    <div className="mb-3">
                      <label className="form-label">Tenant type</label>
                      <select
                        onChange={(e) => setTenantTypeName(e.target.value)}
                        name="tenantTypeName"
                        className="form-control"
                      >
                        <option value="INDIVIDUAL">Individual</option>
                        <option value="COMPANY">Company</option>
                      </select>
                    </div>
                  </div>

                  {tenantTypeName === "INDIVIDUAL" && (
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="">FirstName</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                              setFirstName(event.target.value)
                            }
                            value={firstName}
                            placeholder="Enter FirstName"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">LastName</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                            value={lastName}
                            placeholder="Enter LastName"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="">OtherName</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                              setOtherName(event.target.value)
                            }
                            value={otherName}
                            placeholder="Enter OtherName"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">PhoneNumber</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                              setPhoneNumber(event.target.value)
                            }
                            value={phoneNumber}
                            placeholder="Enter Phone Number"
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="">Id Number</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                              setIdNumber(event.target.value)
                            }
                            value={idNumber}
                            placeholder="Enter Id Number"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="">Nationality</label>
                          <select
                            className="form-control"
                            data-live-search="true"
                            title="Select nationality"
                            onChange={(e) => setNationality(e.target.value)}
                            value={nationality}
                          >
                            <option></option>
                            <option value="Kenya">Kenyan</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            placeholder="Enter Email"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {tenantTypeName !== "INDIVIDUAL" && (
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="">CompanyName</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                              setCompanyName(event.target.value)
                            }
                            value={companyName}
                            placeholder="Enter CompanyName"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">CompanyIncorporationNumber</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                              setCompanyIncorporationNumber(event.target.value)
                            }
                            value={companyIncorporationNumber}
                            placeholder="Enter CompanyIncorporationNumber"
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="">CompanyAddress</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                              setCompanyAddress(event.target.value)
                            }
                            value={companyAddress}
                            placeholder="EnterCompanyAddress"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">CompanyDateOfRegistration </label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                              setCompanyDateOfRegistration(event.target.value)
                            }
                            value={companyDateOfRegistration}
                            placeholder="Enter CompanyDateOfRegistration "
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
                    onClick={() => editTenantsDetails()}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* // create ContactPerson */}

        <div
          class="modal fade"
          id="create-contact"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="mod">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Contact Person
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
                      <label for="">FirstName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter FirstName"
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                      />
                    </div>

                    <div class="form-group mb-4">
                      <label for="">LastName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter LastName"
                        onChange={(event) => setLastName(event.target.value)}
                        value={lastName}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">OtherName</label>
                      <input
                        type="text"
                        className="form-control"
                        value={otherName}
                        onChange={(e) => setOtherName(e.target.value)}
                        placeholder="Enter OtherName"
                        required={true}
                      />
                    </div>

                    <div class="form-group mb-4">
                      <label for="">Type</label>
                      <select
                        class="form-control"
                        data-live-search="true"
                        title="Select ContactPersonTypeName"
                        onChange={(e) => setContactPersonType(e.target.value)}
                      >
                        <option className="text-black font-semibold ">
                          --Select ContactPersonTypeName--
                        </option>
                        {contactPerson &&
                          contactPerson.map((cont, index) => {
                            return (
                              <option key={index} value={cont}>
                                {cont}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">PhoneNumber1</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phoneNumber1}
                        onChange={(e) => setPhoneNumber1(e.target.value)}
                        placeholder="Enter PhoneNumber1"
                        required={true}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">Relationship</label>
                      <input
                        type="text"
                        className="form-control"
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        placeholder="Enter Relationship"
                        required={true}
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
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => addConctactPersons()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* //add Tenant */}

        <div
          class="modal fade"
          id="create-tenancies"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="mod">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Tenancies
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
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-4">
                        <label htmlFor=""> Premise Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div class="col-3 ">
                        <button class="btn btn-primary btn-block w-100 btn-lg">
                          <i class="bx bx-search-alt-2 font-size-16 align-middle me-2 "></i>
                          <div class="d-none">Search</div>
                        </button>
                      </div>
                    </form>
                    <div class="form-group mb-4">
                      <label for="">Premises</label>
                      <select
                        className="form-control"
                        onChange={onPremiseChange}
                        name="premise"
                      >
                        <option> --Select Premises--</option>
                        {premises?.map((prem, index) => (
                          <option value={prem.id + ":" + prem.premiseName}>
                            {prem.premiseName}
                          </option>
                        ))}
                      </select>
                    </div >
                    <div class="form-group mb-4">
                      <label for="">Unit</label>
                      <select
                        className="form-control"
                        onChange={premiseUnitChange}
                        name="premiseUnitId"
                      >
                        <option> --Select Unit--</option>
                        {units?.map((prem, index) => (
                          <option value={prem.id}>{prem?.unitName}</option>
                        ))}
                      </select>
                    </div>

                    <div class="form-group mb-4">
                      <label for="">Unit Condition</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter UnitCondition"
                        onChange={(event) =>
                          setUnitCondition(event.target.value)
                        }
                        value={unitCondition}
                      />
                    </div>

                    <div className="form-group mb-4" id="datepicker198">
                      <label htmlFor="">StartDate</label>
                      <input
                        type="text"
                        className="form-control mouse-pointer enddate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Enter StartDate"
                        readOnly
                        data-date-format="dd M, yyyy"
                        data-date-container="#datepicker198"
                        data-provide="datepicker"
                        data-date-autoclose="true"
                        data-date-start-date="+0d"
                        required={true}
                      />
                    </div>

                    <div className="form-group mb-4 " id="datepicker1">
                      <label htmlFor="">TenancyRenewalDate</label>
                      <input
                        type="text"
                        className="form-control mouse-pointer date3"
                        value={tenancyRenewalDate}
                        onChange={(e) => setTenancyRenewalDate(e.target.value)}
                        placeholder="Enter TenancyRenewalDate "
                        readOnly
                        data-date-format="dd M, yyyy"
                        data-date-container="#datepicker1"
                        data-provide="datepicker"
                        data-date-autoclose="true"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4" id="datepicker1">
                      <label htmlFor="">TenancyRenewalNotificationDate</label>
                      <input
                        type="text"
                        className="form-control mouse-pointer date2"
                        value={tenancyRenewalNotificationDate}
                        onChange={(e) =>
                          setTenancyRenewalNotificationDate(e.target.value)
                        }
                        placeholder="Enter TenancyRenewalNotificationDate"
                        readOnly
                        data-date-format="dd M, yyyy"
                        data-date-container="#datepicker1"
                        data-provide="datepicker"
                        data-date-autoclose="true"
                        required={true}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">TenancyStatus</label>
                      <select
                        className="form-control"
                        onChange={onPremiseChange}
                        name="premise"
                      >
                        <option> --Select Premises--</option>
                        {premises?.map((prem, index) => (
                          <option value={prem.id + ":" + prem.premiseName}>
                            {prem.premiseName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div >
                </div >
              </div >

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => addTenancies()}
                >
                  Save
                </button>
              </div>
            </div >
          </div >
        </div >

        {/* //vacantTenant */}

        < div
          class="modal fade"
          id="vacate-modal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          centered="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Edit Status
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
                      <label for="">Reason</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter name"
                        onChange={(event) => setEndReason(event.target.value)}
                        value={endReason}
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
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => deleteDeactivate()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div >
        {/* </div > */}
        {/*VIEW INVOICE*/}
        < Modal show={invoice_show} onHide={closeInvoice} size="lg" centered >
          {activeModal === 1 && (
            <>
              <Modal.Header closeButton>
                <h5 className="modal-title" id="myLargeModalLabel">
                  Statement Details
                </h5>
              </Modal.Header>
              <Modal.Body>
                <div className="col-12">
                  <address>
                    <strong>Billed To:</strong>
                    {activeInvoice.tenant?.tenantType === "INDIVIDUAL" ? (
                      <>
                        <div>
                          <br />
                          {activeInvoice?.tenant?.firstName}{" "}
                          {activeInvoice?.tenant?.lastName}
                          {activeInvoice?.tenant?.otherName}
                          <br />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <br />
                          {activeInvoice?.tenant?.companyName}{" "}
                          {activeInvoice?.tenant?.companyIncorporationNumber}{" "}
                          {activeInvoice?.tenant?.companyAddress}
                          <br />
                        </div>
                      </>
                    )}
                    <br />
                    {activeInvoice?.tenant?.email}
                    <br />
                    <p>
                      Issue date:{" "}
                      {moment(activeInvoice?.dateTimeCreated).format(
                        "DD-MM-YYYY"
                      )}
                    </p>
                    <p>
                      Due date:{" "}
                      {moment(activeInvoice?.invoiceDate).format("DD-MM-YYYY")}
                    </p>
                  </address>
                </div>
                <div className="col-12">
                  <div className="py-2 mt-3">
                    <h3 className="font-size-15 fw-bold">
                      Statement Details ({" "}
                      <span className="text-primary fw-medium">
                        {activeInvoice?.receiptNo}
                      </span>{" "}
                      )
                    </h3>
                  </div>
                </div>
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table table-nowrap">
                      <thead>
                        <tr>
                          <th>Bill No</th>
                          <th>Receipt Amount</th>
                          <th>Pay Reference No</th>
                          <th>Payment Mode</th>
                          <th>Paid By</th>
                          <th>Utilized Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{activeInvoice?.billNo}</td>
                          <td>
                            {formatCurrency.format(activeInvoice?.receiptAmount)}
                          </td>
                          <td>{activeInvoice?.payReferenceNo}</td>
                          <td>{activeInvoice?.paymentMode}</td>
                          <td>{activeInvoice?.paidBy}</td>
                          <td>
                            {formatCurrency.format(activeInvoice?.utilisedAmount)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Modal.Body>
            </>
          )}
          {
            activeModal === 2 && (
              <>
                <Modal.Header closeButton>
                  <h5 className="modal-title" id="myLargeModalLabel">
                    Receipt Details
                  </h5>
                </Modal.Header>
                <Modal.Body>
                  <div className="col-12">
                    <address>
                      <strong>Billed To:</strong>
                      {activeInvoice.tenant?.tenantType === "INDIVIDUAL" ? (
                        <>
                          <div>
                            <br />
                            {activeInvoice?.tenant?.firstName}{" "}
                            {activeInvoice?.tenant?.lastName}
                            {activeInvoice?.tenant?.otherName}
                            <br />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <br />
                            {activeInvoice?.tenant?.companyName}{" "}
                            {activeInvoice?.tenant?.companyIncorporationNumber}{" "}
                            {activeInvoice?.tenant?.companyAddress}
                            <br />
                          </div>
                        </>
                      )}
                      <br />
                      {activeInvoice?.tenant?.email}
                      <br />
                      <p>
                        Issue date:{" "}
                        {moment(activeInvoice.dateTimeCreated).format("DD-MM-YYYY")}
                      </p>
                      <p>
                        Due date:{" "}
                        {moment(activeInvoice.invoiceDate).format("DD-MM-YYYY")}
                      </p>
                    </address>
                  </div>
                  <div className="col-12">
                    <div className="py-2 mt-3">
                      <h3 className="font-size-15 fw-bold">
                        Statement Details ({" "}
                        <span className="text-primary fw-medium">
                          {activeInvoice?.receiptNo}
                        </span>{" "}
                        )
                      </h3>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="table-responsive">
                      <table className="table table-nowrap">
                        <thead>
                          <tr>
                            <th>Receipt No</th>
                            <th>Paid By</th>
                            <th>Bill Amount</th>
                            <th>Bill Balance</th>
                            <th>Payment Mode</th>
                            <th>Payment Ref</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{activeInvoice?.receiptNo}</td>
                            <td>{activeInvoice?.paidBy}</td>
                            {Object.keys(activeInvoice).length > 0 ? (
                              <>
                                <td>
                                  {formatCurrency.format(
                                    JSON.parse(activeInvoice?.response).receiptInfo
                                      .billAmount
                                  )}
                                </td>
                                <td>
                                  {formatCurrency.format(
                                    JSON.parse(activeInvoice?.response).receiptInfo
                                      .billBalance
                                  )}
                                </td>
                              </>
                            ) : (
                              <></>
                            )}
                            <td>{activeInvoice?.paymentMode}</td>
                            <td>{activeInvoice?.payReferenceNo}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Modal.Body>
              </>
            )
          }
        </Modal >
        {/* LOOK FOR BILL */}

        <Modal show={show} onHide={handleClose} size="md" centered >
          <Modal.Header closeButton>
            <h5 className="modal-title" id="myLargeModalLabel">
              Search for Bill to utilize
            </h5>
          </Modal.Header>
          <form onSubmit={(e) => searchBillNo(e)}>
            <Modal.Body>
              <div className="form-group  justify-content-center d-flex flex-column">
                <label htmlFor="">BILL NO</label>
                <input
                  type="text"
                  className="form-control"
                  value={utilData.newBillNo}
                  onChange={(e) =>
                    setUtilData({ ...utilData, newBillNo: e.target.value })
                  }
                  placeholder="Enter Bill No "
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div>
                <button className="btn btn-sm btn-primary" type="submit">
                  Search
                </button>
              </div>
            </Modal.Footer>
          </form>
        </Modal >
        <footer class="footer">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6">
                <script>document.write(new Date().getFullYear())</script> ©
                RevenueSure.
              </div>
              <div class="col-sm-6">
                <div class="text-sm-end d-sm-block">
                  Developed by Nouveta LTD.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div >
    </div >
  );
}
export default OneTenant;
