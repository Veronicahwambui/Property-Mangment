/* global $ */
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AuthService from "../../services/auth.service";
import StatusBadge from "../../components/StatusBadge";
import Message from "../../components/Message";
import authService from "../../services/auth.service";
import authLoginService from "../../services/authLogin.service";
import useTabs from "../../hooks/useTabs";
import moment from "moment";
import numeral from "numeral";
import Chart from "react-apexcharts";
import axios from "axios";
import { baseUrl } from "../../services/API";



function ViewClient() {
  const location = useLocation();
  const clientId = useParams().id;
  const [clientTypes, setClientTypes] = useState([]);
  const [client, setClient] = useState({});
  const [tenancyStatuses, setTenancyStatuses] = useState([]);
  const [clientType, setClientType] = useState({
    name: "",
    id: "",
  });
  const [clientUsers, setclientUsers] = useState([]);

  const [activeLink, setActiveLink] = useTabs(1);
  const [accountsData, setAccountsData] = useState([]);
  const [banks, setBanks] = useState([]);

  //accounts edit
  const [editBankId, setEditBankId] = useState(null);
  const [editBankName, setEditBankName] = useState("");
  const [editBankAccount, setEditBankAccount] = useState("");
  const [editpercentageRemuneration, setEditPercentageRemuneration] =
    useState(null);
  const [acc_id, setacc_id] = useState(null);

  const editBankAccountDetails = (value) => {
    setEditBankId(value.split(":")[0]);
    setEditBankName(value.split(":")[1]);
  };
  //accounts create
  const [bankname, setbankname] = useState("");
  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [bankId, setbankId] = useState(null);
  const [percentageRemuneration, setPercentageRemuneration] = useState(null);

  const setbankAccountDetails = (value) => {
    setbankId(value.split(":")[0]);
    setbankname(value.split(":")[1]);
  };

  const [show_doc, set_show_doc] = useState(false);
  const [editAccountShow, seteditAccountShow] = useState(false);
  const handleEditAccountShow = () => seteditAccountShow(true);
  const handleEditAccountClose = () => seteditAccountShow(false);
  const docshow = () => set_show_doc(true);
  const docclose = () => set_show_doc(false);

  const accshow = (id) => {
    let acc = accountsData.find((account) => account.id === id);
    setEditBankName(acc.bank.bankName);
    setEditPercentageRemuneration(acc.percentageRemuneration);
    setEditBankAccount(acc.bankAccountNumber);
    setEditBankId(acc.bank.id);
    setacc_id(id);
    handleEditAccountShow();
  };
  useEffect(() => {
    getAll();
    requestsServiceService.getBanks().then((res) => {
      setBanks(res.data.data);
    });
    requestsServiceService.getClientAccounts(clientId).then((res) => { });
    requestsServiceService.getClientTypes().then((res) => {
      setClientTypes(res.data.data);
    });
    requestsServiceService.getTenancyStatuses().then((res) => {
      setTenancyStatuses(res.data.data);
    });
  }, []);

  const [error, setError] = useState({
    message: "",
    color: "",
  });
  
 

  const getAll = () => {
    requestsServiceService.getClient(clientId).then((res) => {
      setClient(res.data.data.client);
      let ct = res.data.data.client.clientType;
      setClientType({
        ...clientType,
        name: ct.name,
        id: ct.id,
      });
      setclientUsers(res.data.data.users);
      setAccountsData(res.data.data.allByClient);
      fetchDashData(res.data.data.client.appKey)
    })
  };

  const handleEditAccount = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      active: true,
      bankAccountNumber: editBankAccount,
      bankId: editBankId,
      clientId: clientId,
      id: acc_id,
      percentageRemuneration: editpercentageRemuneration,
      bankName: editBankName,
    });
    requestsServiceService.updateClientAccount(data).then((res) => {
      if (res.data.status === true) {
        setError({
          ...error,
          message: res.data.message,
          color: "success",
        });
        getAll();
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
          handleEditAccountClose();
        }, 1000);
      } else {
        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
        getAll();
      }
    });
  };
  const handleAccountSubmit = (event) => {
    event.preventDefault();
    let data = {
      bankName: bankname,
      active: true,
      bankAccountNumber: bankAccountNumber,
      bankId: bankId,
      id: null,
      clientId: clientId,
      percentageRemuneration: percentageRemuneration,
    };
    requestsServiceService.createClientAccount(data).then((res) => {
      if (res.data.status === true) {
        setError({
          ...error,
          message: res.data.message,
          color: "success",
        });
        getAll();
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
          docclose();
        }, 1000);
      } else {
        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
        getAll();
        docclose();
      }
    });
  };
  const deactivateAcc = (id) => {
    requestsServiceService.deactivateClientAccount(id).then((res) => {
      getAll();
    });
  };
  const [showclient, setshowclient] = useState(false);
  const showClient = () => setshowclient(true);
  const closeClient = () => setshowclient(false);

  const [ID, setId] = useState(0);
  const [editName, setEditName] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editClientTypeId, setEditClientTypeId] = useState(0);
  const [editTenancy, setEditTenancy] = useState("");

  const clientShow = () => {
    console.log(client);
    setClientType({
      ...clientType,
      name: client.clientType.name,
      id: client.clientType.id,
    });
    setEditClientTypeId(clientType.id);
    setEditName(client.name);
    setEditUrl(client.clientBaseUrl);
    setId(client.id);
    setEditTenancy(client.unitVacancyRestrictionStatus);
    showClient();
  };
  const updateClient = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      adminEmail: "",
      adminFirstName: "",
      adminLastName: "",
      adminOtherName: "",
      adminPhoneNumber: "",
      adminUserName: "",
      clientBaseUrl: editUrl,
      clientTypeId: editClientTypeId,
      createAdminUser: false,
      unitVacancyRestrictionStatus: editTenancy,
      name: editName,
      id: ID,
      status: true,
    });
    requestsServiceService
      .updateClient(data)
      .then((res) => {
        if (res.data.status === false) {
          setError({
            ...error,
            message: res.data.message,
            color: "danger",
          });
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
          getAll();
          setTimeout(() => {
            closeClient();
            setError({
              ...error,
              message: "",
              color: "",
            });
          }, 1000);
        }
      })
      .catch((err) => {
        setError({
          ...error,
          message: err.message,
          color: "danger",
        });
      });
    setTimeout(() => {
      setError({
        ...error,
        message: "",
        color: "",
      });
    }, 2000);
  };
  //messages
  const [details, setDetails] = useState({
    message: "",
    contact: "",
    recipientName: "",
    entity: null,
    clientName: JSON.parse(authService.getCurrentUserName()).client?.name,
    clientId: parseInt(authService.getClientId()),
    entityType: "USER",
    createdBy: authLoginService.getCurrentUser(),
    senderId: "",
    subject: "I",
  });
  const [mode, setmode] = useState("");
  const handleModeChange = (mode) => {
    setmode(mode);
  };

  const handleClicked = (inv, mod) => {
    let mes = `Dear ${inv.firstName}, `;
    let senderId =
      JSON.parse(authService.getCurrentUserName()).client?.senderId === null
        ? "REVENUESURE"
        : JSON.parse(authService.getCurrentUserName()).client?.senderId;
    setDetails({
      ...details,
      message: mes,
      contact: mod === "Email" ? inv?.email : inv?.phoneNumber,
      entity: inv.id,
      recipientName: inv?.firstName,
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
      entityType: "USER",
      createdBy: authLoginService.getCurrentUser(),
      senderId: "",
      subject: "",
    });
  };

  // LOADER ANIMATION
  useEffect(() => {
    $("#spinner").removeClass("d-none");
    setTimeout(() => {
      $("#spinner").addClass("d-none");
    }, 1000);
  }, [])

  // DASHBOARD SUFF 
  // ++++++++++++++++++++++
  // ============================================================================

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
  let date = new Date();
  const [dashboardData, setDashboardData] = useState({});
  const [radioBarData, setRadioBarData] = useState([]);
  const [radioBarData2, setRadioBarData2] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(date.getFullYear(), 0, 1)
  );
  const [endDate, setEndDate] = useState(
    new moment().endOf("month").format("YYYY-MM-DD")
  );
  const [transactionModesData, setTransactionModesData] = useState([]);
  const [adminDashboardData, setAdminDashboardData] = useState({});
  const [monthlyCollectionSummaryRevenue, setMonthlyCollectionSummaryRevenue] = useState([]);



  const handleSubmit = (e) => {
    e.preventDefault();
    $("#spinner").removeClass("d-none");
    fetchDashData();
  };
  const fetchDashData = (key) => {

    let url1 = baseUrl + "/reports/dashboard/graphs?startDate=" + moment(startDate).format("YYYY/MM/DD") + "&endDate=" + moment(endDate).format("YYYY/MM/DD")
    let basicConfig = {
      headers : {
        'Authorization': 'Bearer ' + authService.getCurrentUserAccessToken(),
        'Content-Type': 'application/json',
        'App-Key': key ,
      }   
    }

    axios.get( url1 , basicConfig ).then((res) => {
      $("#spinner").addClass("d-none");
      setRadioBarData(res.data.data.collectionSummaryByPremiseUseType);
      setRadioBarData2(res.data.data.collectionSummaryByUnitType);
      setPieChartData(res.data.data.collectionSummaryByApplicableCharge);
      setTransactionModesData(res.data.data.collectionSummaryByPaymentMode);
      setMonthlyCollectionSummaryRevenue(
        res.data.data.monthlyCollectionSummaryRevenue
      );
    })
    .finally(() => {
      $("#spinner").addClass("d-none");
    });
 let url2 =  baseUrl +"/reports/dashboard?startDate=" +  moment(startDate).format("YYYY/MM/DD") + "&endDate=" +  moment(endDate).format("YYYY/MM/DD")
   axios.get( url2, basicConfig ).then((res) => {
    setDashboardData(res.data.data);
  });
    
  };

  // --------------------------
  // CHARTS START HERE
  // --------------------------

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

  // premie type
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

  // line graph
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

  const pieChart = {
    series: pieChartData.map((x) => x.variance),
    chart: { type: "donut", height: 250 },
    labels: pieChartData.map((x) => x.item),
    colors: colors,
    legend: { show: !1 },
    plotOptions: { pie: { donut: { size: "40%" } } },
  };

  // small chart\
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

  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });


  return (
    <>
      <div className="page-content">
        <div className="content-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            {/* <!-- Loader --> */}
            <div id="spinner">
              <div id="status">
                <div class="spinner-chase">
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18"></h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="">Dashboards</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="">All CLients</a>
                    </li>
                    <li class="breadcrumb-item active">{client.name}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body pt-2 pb-3">
                  <nav className="navbar navbar-expand-md navbar-white bg-white py-2">
                    <button
                      className="navbar-toggler btn btn-sm px-3 font-size-16 header-item waves-effect h-auto text-primary"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarNavAltMarkup"
                      aria-controls="navbarNavAltMarkup"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="mdi mdi-menu" />
                    </button>
                    <div
                      className="collapse navbar-collapse justify-content-between"
                      id="navbarNavAltMarkup"
                    >
                      <div className="navbar-nav">
                        <a
                          onClick={() => setActiveLink(1)}
                          className={
                            activeLink === 1
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Client Details<span className="sr-only"></span>
                        </a>
                        <a
                          onClick={() => setActiveLink(2)}
                          className={
                            activeLink === 2
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Client Accounts
                        </a>
                        <a
                          onClick={() => setActiveLink(3)}
                          className={
                            activeLink === 3
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Users
                        </a>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>

            {/*CLIENT DETAILS*/}
          </div>
          {activeLink === 1 && (
            <div className="row">
              <div className="col-12">
                <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <div className="d-flex align-items-center flex-grow-1">
                      <h4 className="mb-0  bg-transparent  p-0 m-0">
                        Client Details
                      </h4>
                    </div>
                    <div className="d-flex align-items-center flex-grow-1"></div>
                    <div className="d-flex">
                      <button
                        type="button"
                        onClick={() => clientShow()}
                        className="btn btn-primary dropdown-toggle option-selector"
                      >
                        <i className="dripicons-plus font-size-16"></i>{" "}
                        <span className="pl-1 d-md-inline">
                          Edit client details
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                 {/* <!-- quick company stats --> */}
        <div class="row">
          <div class="col-xl-4">
            <div class="card">
              <div class="card-body">
                <div class="">
                  <div class="flex-shrink-0 me-3">
                    <span class="logo-lg">
                      <img
                        src="assets/images/logo-light.png"
                        alt=""
                        height="45"
                      />
                    </span>
                  </div>
                  <div class="flex-grow-1 align-self-center">
                    <div class="text-muted mt-2">
                      <h5 class="mb-1">{dashboardData?.clientName}</h5>

                      <p class="mb-0">
                        Revenue Collection and Property management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-body border-top opacity-0">
                <div class="row h-5 my-5 py-3"></div>
              </div>
            </div>
          </div>

          <div class="col-xl-8">
            <div class="row gap-1">
              {/* <div class="col-lg-12 px-sm-30px"> */}
              <div class="card  px-sm-30px">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12 align-self-center">
                      <div class="text-lg-left mt-4 mt-lg-0">
                        <div class="row ">
                          <div class="col-4 col-sm-3 col-md-2">
                            <div>
                              <div class="avatar-xs mb-3">
                                <span class="avatar-title rounded-circle bg-secondary font-size-16">
                                  <i class="mdi mdi-office-building-outline text-white"></i>
                                </span>
                              </div>
                              <p class="text-muted text-truncate mb-2">
                                Properties
                              </p>
                              <h5 class="mb-0">
                                {dashboardData?.premiseCount}
                              </h5>
                            </div>
                          </div>
                          <div class="col-4 col-sm-3 col-md-2 d-none">
                            <div>
                              <div class="avatar-xs mb-3">
                                <span class="avatar-title bg-secondary rounded-circle font-size-16">
                                  <i class="mdi mdi-chat-outline text-white"></i>
                                </span>
                              </div>
                              <p class="text-muted text-truncate mb-2 ">
                                Units
                              </p>
                              <h5 class="mb-0">
                                {dashboardData?.premiseCount}
                              </h5>
                            </div>
                          </div>
                          <div class="col-4 col-sm-3 col-md-2">
                            <div>
                              <div class="avatar-xs mb-3">
                                <span class="avatar-title rounded-circle bg-secondary font-size-16">
                                  <i class="mdi mdi-shield-home text-white"></i>
                                </span>
                              </div>
                              <p class="text-muted text-truncate mb-2">
                                Landlords
                              </p>
                              <h5 class="mb-0">
                                {dashboardData?.landlordsCount}
                              </h5>
                            </div>
                          </div>
                          <div class="col-4 col-sm-3 col-md-2">
                            <div>
                              <div class="avatar-xs mb-3">
                                <span class="avatar-title rounded-circle bg-secondary font-size-16">
                                  <i class="mdi mdi-account-key text-white"></i>
                                </span>
                              </div>
                              <p class="text-muted text-truncate mb-2">
                                Tenants
                              </p>
                              <h5 class="mb-0">
                                {dashboardData?.tenantsCount}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- end row --> */}
                </div>
              </div>
              <div class="card  px-sm-30px">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12 align-self-center">
                      <div class="text-lg-left mt-4 mt-lg-0">
                        <div class="row ">
                          {dashboardData?.premiseUnitsSummary?.map((item) => (
                            <div class="col-4 col-sm-3 col-md-2">
                              <div>
                                <div class="avatar-xs mb-3">
                                  <span class="avatar-title rounded-circle bg-danger font-size-16">
                                    <i class="mdi mdi-home-export-outline  text-white"></i>
                                  </span>
                                </div>
                                <p class="text-muted text-truncate mb-2 text-capitalize">
                                  {" "}
                                  {item.item === "CLOSED"
                                    ? "Occupied"
                                    : item.item
                                        ?.toLowerCase()
                                        ?.replace(/-/g, " ")}{" "}
                                  Units
                                </p>
                                <h5 class="mb-0">{item.count}</h5>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- end row --> */}
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12">
              <div class="row">
                {dashboardData?.collectionSummaryByPaymentStatus?.map(
                  (item) => (
                    <div class="col-sm-4">
                      <div class="card">
                        <div class="card-body">
                          <div class="d-flex align-items-center mb-3">
                            <div class="avatar-xs-2 me-3">
                              <span class="avatar-title rounded-circle bg-danger bg-soft text-danger  font-size-18">
                                <i class="mdi  mdi-cash-remove h2 mb-0 pb-0 text-danger"></i>
                              </span>
                            </div>
                            <div class="d-flex flex-column">
                              <span className="text-capitalize">
                                {item.item?.toLowerCase()?.replace(/-/g, " ")}
                              </span>
                            </div>
                          </div>
                          <div class="text-muted mt-4">
                            <h4>
                              {formatCurrency.format(item.value)}
                              <i class="mdi mdi-chevron-up ms-1 text-success"></i>
                            </h4>
                            <div class="d-flex">
                              <span class="text-truncate text-capitalize">
                                From{" "}
                                {item.count
                                  ?.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                {item.item?.toLowerCase()?.replace(/-/g, " ")}{" "}
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
        {/* <!-- end oc company stats --> */}

        <div class="row">
          <div class="col-xl-7 px-sm-30px">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <div class="d-sm-flex flex-wrap">
                      <div class="d-flex flex-column">
                        <h4 class="card-title mb-0">Rent collection Summary</h4>
                        <p class="text-muted mb-4">
                          {" "}
                          Rent collections summary{" "}
                        </p>
                      </div>
                      <div class="ms-auto d-none">
                        <ul class="nav nav-pills">
                          <li class="nav-item">
                            <a class="nav-link" href="#">
                              Week
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="#">
                              Month
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link active" href="#">
                              Year
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div id="revenue-chart" class="apex-charts" dir="ltr">
                      <Chart
                        class="apex-charts revenue-type"
                        options={options}
                        plotOptions={options.plotOptions}
                        series={options.series}
                        type="bar"
                        height="360"
                        xaxis={options.xaxis}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title mb-4">
                      Collection By Applicable Charge
                    </h4>

                    <div>
                      <div id="agrement-type" class="apex-charts revenue-type">
                        <Chart
                          class="apex-charts revenue-type"
                          options={pieChart}
                          plotOptions={walletOptions.plotOptions}
                          series={pieChart.series}
                          type="donut"
                          height="250"
                          labels={pieChart.labels}
                        />
                      </div>
                    </div>

                    <div class="text-center text-muted">
                      <div class="row">
                        {pieChartData?.map((item, index) => (
                          <div class="col-4">
                            <div class="mt-4 text-left">
                              <p class="mb-2 text-truncate text-left text-capitalize">
                                <i
                                  class="mdi mdi-circle me-1"
                                  style={{ color: "" + colors[index] + "" }}
                                ></i>
                                {item.item}
                              </p>
                              <h5>{formatCurrency.format(item.value)}</h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-5 px-sm-30px">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title mb-0">
                  Collections by Property Use Type
                </h4>
                <div class="row">
                  <div class="col-sm-7">
                    <div>
                      <div id="unit-types">
                        <Chart
                          class="apex-charts"
                          options={walletOptions}
                          plotOptions={walletOptions.plotOptions}
                          series={walletOptions.series}
                          type="radialBar"
                          height="300"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-5 align-self-center">
                    {radioBarData?.map((item, index) => (
                      <div class="">
                        <div class="mt-4 text-left">
                          <p class="mb-2 text-truncate text-left text-capitalize">
                            <i
                              class="mdi mdi-circle me-1 "
                              style={{ color: "" + colors[index] + "" }}
                            ></i>
                            {item.item}
                          </p>
                          <h5>{formatCurrency.format(item.value)}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <h4 class="card-title mb-0">Collections by Property Type</h4>
                <div class="row">
                  <div class="col-sm-7">
                    <div>
                      <div id="unit-types">
                        <Chart
                          class="apex-charts"
                          options={walletOptions2}
                          plotOptions={walletOptions2.plotOptions}
                          series={walletOptions2.series}
                          type="radialBar"
                          height="400"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-5 align-self-center">
                    {radioBarData2?.map((item, index) => (
                      <div>
                        <p class="mb-2 text-capitalize">
                          <i
                            class="mdi mdi-circle align-middle font-size-10 me-2 "
                            style={{ color: "" + colors[index] + "" }}
                          ></i>{" "}
                          {item.item}
                        </p>
                        <h5>
                          {formatCurrency.format(item.value)} <br />
                          <span class="text-muted font-size-12 d-none">
                            {" "}
                            Contacts
                          </span>
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <h4 class="card-title mb-4">
                  Revenue Transaction Modes comparison
                </h4>

                <div class="table-responsive mt-4">
                  <table class="table align-middle mb-0">
                    <tbody>
                      {transactionModesData?.map((item) => (
                        <tr>
                          <td>
                            <h5 class="font-size-14 mb-1">{item.item}</h5>
                            <p class="text-muted mb-0">
                              {formatCurrency.format(item.value)}
                            </p>
                          </td>

                          <td>
                            <div id="radialchart-1" class="apex-charts">
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
                            <p class="text-muted mb-1">Transactions</p>
                            <h5 class="mb-0">{item.variance} %</h5>
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
                                Client Accounts
                              </h4>
                            </div>
                            <div className="d-flex">
                              <button
                                type="button"
                                className="btn btn-primary waves-effect btn-label waves-light me-3"
                                data-bs-toggle="modal"
                                onClick={() => docshow()}
                                data-bs-target="#add-new-agreementType"
                              >
                                <i className="mdi mdi-plus label-icon"></i> Add
                                Account
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="row">
                            <div className="col-12">
                              <div className="table-responsive">
                                <table className="table align-middle table-nowrap table-hover mb-0">
                                  <thead>
                                    <tr className="text-uppercase table-dark">
                                      <th scope="col">#</th>
                                      <th scope="col">Bank</th>
                                      <th scope="col">Account No</th>
                                      <th scope="col">% Remuneration</th>
                                      <th scope="col">Status</th>
                                      <th className="text-right">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {accountsData?.map((acc, index) => (
                                      <tr data-id={index} key={index}>
                                        <td style={{ width: "80px" }}>
                                          {index + 1}
                                        </td>
                                        <td data-field="estate">
                                          {acc.bank.bankName}
                                        </td>
                                        <td data-field="unit-num ">
                                          {acc.bankAccountNumber}
                                        </td>
                                        <td data-field="unit-num ">
                                          {acc.percentageRemuneration}
                                        </td>
                                        <td data-field="unit-num ">
                                          {acc.active ? (
                                            <span className="badge-soft-success badge">
                                              Active
                                            </span>
                                          ) : (
                                            <span className="badge-soft-danger badge">
                                              Inactive
                                            </span>
                                          )}
                                        </td>
                                        <td className="text-right cell-change ">
                                          <div className="d-flex align-items-center">
                                            <a
                                              className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit"
                                              data-bs-toggle="modal"
                                              data-bs-target="#edit-client"
                                              title="Edit"
                                              onClick={() => accshow(acc.id)}
                                            >
                                              <i className="bx bx-edit-alt" />
                                            </a>
                                            {acc.active ? (
                                              <button
                                                className="btn btn-danger btn-sm btn-rounded waves-effect waves-light"
                                                title="deactivate"
                                                data-bs-toggle="modal"
                                                data-bs-target="#confirm-acc-deactivate"
                                                style={{ marginLeft: "8px" }}
                                                onClick={() =>
                                                  deactivateAcc(acc.id)
                                                }
                                              >
                                                Deactivate
                                              </button>
                                            ) : (
                                              <button
                                                className="btn btn-success btn-sm btn-rounded waves-effect waves-light"
                                                title="deactivate"
                                                data-bs-toggle="modal"
                                                data-bs-target="#confirm-acc-activate"
                                                style={{ marginLeft: "8px" }}
                                                onClick={() =>
                                                  deactivateAcc(acc.id)
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
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeLink === 3 && (
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
                                Client Users
                              </h4>
                            </div>
                            <div className="d-flex">
                              <Link to="/addadmin">
                                <button
                                  type="button"
                                  className="btn btn-primary waves-effect btn-label waves-light me-3"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-new-agreementType"
                                >
                                  <i className="mdi mdi-plus label-icon"></i>{" "}
                                  Add User
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="row">
                            <div className="col-12">
                              <div className="card">
                                <div className="card-body">
                                  <div className="">
                                    <table
                                      className="table no-wrap nowrap w-100 table-striped"
                                      id="datatable-buttons"
                                    >
                                      <thead className="table-dark">
                                        <tr>
                                          <th></th>
                                          <th>Names</th>
                                          <th>UserName</th>
                                          <th>Email</th>
                                          <th>PhoneNumber</th>
                                          <th>RoleName</th>
                                          <th>Enabled</th>
                                          <th>Account Blocked</th>
                                          <th>Actions</th>
                                        </tr>
                                      </thead>

                                      <tbody className="table-striped">
                                        {clientUsers !== null &&
                                          clientUsers?.map((list, index) => {
                                            return (
                                              <>
                                                <tr>
                                                  <td className="">
                                                    <div className="d-flex align-items-center"></div>
                                                  </td>

                                                  <td>
                                                    <p className="mb-0">
                                                      {list.firstName +
                                                        "  " +
                                                        list.lastName}
                                                    </p>
                                                  </td>
                                                  <td>
                                                    <p className="mb-0">
                                                      {list.userName}
                                                    </p>
                                                  </td>
                                                  <td>
                                                    <p className="mb-0">
                                                      {list.email}
                                                    </p>
                                                  </td>
                                                  <td>
                                                    <p className="mb-0">
                                                      {list.phoneNumber}
                                                    </p>
                                                  </td>
                                                  <td>
                                                    <p className="mb-0">
                                                      {list.role.name}
                                                    </p>
                                                  </td>

                                                  <td>
                                                    {list.authAccount &&
                                                      list.authAccount
                                                        .correlator !==
                                                      undefined ? (
                                                      <StatusBadge type="True" />
                                                    ) : (
                                                      <StatusBadge type="False" />
                                                    )}
                                                  </td>

                                                  <td>
                                                    {list.authAccount &&
                                                      list.authAccount.blocked ? (
                                                      <StatusBadge type="True" />
                                                    ) : (
                                                      <StatusBadge type="False" />
                                                    )}
                                                  </td>

                                                  <td>
                                                    {/* <!-- Button trigger modal --> */}
                                                    <div className="dropdown">
                                                      <a
                                                        className="text-muted font-size-16"
                                                        role="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-haspopup="true"
                                                      >
                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                      </a>

                                                      <div className="dropdown-menu dropdown-menu-end text-capitalize">
                                                        <Link
                                                          to={
                                                            "/adminlist/edit/" +
                                                            list.id
                                                          }
                                                          className="dropdown-item"
                                                        >
                                                          edit user
                                                        </Link>

                                                        {list.authAccount &&
                                                          list.authAccount
                                                            .correlator !==
                                                          undefined ? (
                                                          <button
                                                            data-id={list.id}
                                                            className="dropdown-item disableUser"
                                                          >
                                                            Deactivate User
                                                          </button>
                                                        ) : (
                                                          <button
                                                            data-id={
                                                              list.userName
                                                            }
                                                            className="dropdown-item enableUser"
                                                          >
                                                            Activate User
                                                          </button>
                                                        )}

                                                        {list.authAccount &&
                                                          list.authAccount
                                                            .blocked && (
                                                            <button
                                                              data-id={list.id}
                                                              className="dropdown-item unlockUser"
                                                            >
                                                              UnBlock User
                                                              Account
                                                            </button>
                                                          )}

                                                        <Link
                                                          class="dropdown-item"
                                                          to={
                                                            "/adminlist/view/" +
                                                            list.id
                                                          }
                                                        >
                                                          View user
                                                        </Link>

                                                        <a
                                                          className="dropdown-item "
                                                          onClick={() => {
                                                            handleModeChange(
                                                              "Email"
                                                            );
                                                            handleClicked(
                                                              list,
                                                              "Email"
                                                            );
                                                          }}
                                                        >
                                                          <i className="font-size-15 mdi mdi-email me-3 "></i>
                                                          Email User
                                                        </a>
                                                        <a
                                                          className="dropdown-item "
                                                          onClick={() => {
                                                            handleModeChange(
                                                              "SMS"
                                                            );
                                                            handleClicked(
                                                              list,
                                                              "SMS"
                                                            );
                                                          }}
                                                        >
                                                          <i className="font-size-15 mdi mdi-chat me-3 "></i>
                                                          SMS User
                                                        </a>
                                                      </div>
                                                    </div>
                                                  </td>
                                                </tr>
                                              </>
                                            );
                                          })}
                                      </tbody>
                                    </table>

                                    <Message
                                      details={details}
                                      mode={mode}
                                      clear={clear}
                                    />
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
            </div>
          )}
        </div>
      </div>
      {/*UPDATE CLIENT MODAL*/}
      <Modal show={showclient} onHide={closeClient} centered>
        <form onSubmit={updateClient}>
          <Modal.Header>
            <h5 className="modal-title" id="staticBackdropLabel">
              Update Client {client.name}
            </h5>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              {error.color !== "" && (
                <div className={"alert alert-" + error.color} role="alert">
                  {error.message}
                </div>
              )}
              <div className="col-12">
                <div className="form-group mb-4">
                  <label htmlFor="">
                    Client type.<strong className="text-danger">*</strong>
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setEditClientTypeId(parseInt(e.target.value));
                    }}
                    name="clientType"
                  >
                    <option className="text-black font-semibold ">
                      {clientType.name}
                    </option>
                    {clientTypes.map((c) => {
                      return <option value={parseInt(c.id)}>{c.name}</option>;
                    })}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="landlord-type" className="form-label">
                    Unit tenancy restriction status.{" "}
                    <strong className="text-danger">*</strong>
                  </label>
                  {tenancyStatuses && (
                    <div className="form-group mb-4">
                      <select
                        className="form-control"
                        onChange={(e) => setEditTenancy(e.target.value)}
                        required={true}
                      >
                        <option className="text-black font-semibold ">
                          {editTenancy}
                        </option>
                        {tenancyStatuses?.map((t, index) => (
                          <option value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">
                    Name. <strong className="text-danger">*</strong>
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="form-control"
                    placeholder="Enter client name"
                    required={true}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">
                    URL. <strong className="text-danger">*</strong>
                  </label>
                  <input
                    type="url"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    className="form-control"
                    placeholder="Enter client url"
                    required={true}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={"btn btn-grey"}
              onClick={() => closeClient()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={"btn btn-primary"}
              type={"submit"}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {/*CREATE ACCOUNT ACCOUNT*/}
      <Modal
        show={show_doc}
        onHide={docclose}
        className={"modal fade"}
        centered
      >
        <form onSubmit={handleAccountSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add client account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              {error.color !== "" && (
                <div className={"alert alert-" + error.color} role="alert">
                  {error.message}
                </div>
              )}
              <div className="col-12">
                <div className="form-group mb-4">
                  <label htmlFor="">
                    Select Bank/ <strong className="text-danger ">*</strong>
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setbankAccountDetails(e.target.value);
                    }}
                    name="bank account"
                    required={true}
                  >
                    <option className="text-black font-semibold ">
                      {bankname}
                    </option>
                    {banks.map((bank) => {
                      return (
                        <option
                          key={bank.id}
                          value={bank.id + ":" + bank.bankName}
                        >
                          {bank.bankName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">
                    Bank account number.{" "}
                    <strong className="text-danger ">*</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={bankAccountNumber}
                    onChange={(e) => setbankAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                    required={true}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">
                    Percentage renumeration.{" "}
                    <strong className="text-danger ">*</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={percentageRemuneration}
                    onChange={(e) => setPercentageRemuneration(e.target.value)}
                    placeholder="Enter % renumeration"
                    required={true}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={"btn btn-grey"}
              onClick={() => docclose()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={"btn btn-primary"}
              type={"submit"}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {/*EDIT ACCOUNT MODALS*/}
      <Modal
        show={editAccountShow}
        onHide={handleEditAccountClose}
        className={"modal fade"}
        centered
      >
        <form onSubmit={handleEditAccount}>
          <Modal.Header closeButton>
            <Modal.Title>Edit account details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              {error.color !== "" && (
                <div className={"alert alert-" + error.color} role="alert">
                  {error.message}
                </div>
              )}
              <div className="col-12">
                <div className="form-group mb-4">
                  <label htmlFor="">
                    Select Bank/ <strong className="text-danger ">*</strong>
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      editBankAccountDetails(e.target.value);
                    }}
                    name="bank account"
                    required={true}
                  >
                    <option className="text-black font-semibold ">
                      {editBankName}
                    </option>
                    {banks.map((bank) => {
                      return (
                        <option
                          key={bank.id}
                          value={bank.id + ":" + bank.bankName}
                        >
                          {bank.bankName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">
                    Bank account number.{" "}
                    <strong className="text-danger ">*</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editBankAccount}
                    onChange={(e) => setEditBankAccount(e.target.value)}
                    placeholder="Enter account number"
                    required={true}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">
                    Percentage renumeration.{" "}
                    <strong className="text-danger ">*</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editpercentageRemuneration}
                    onChange={(e) =>
                      setEditPercentageRemuneration(e.target.value)
                    }
                    placeholder="Enter % renumeration"
                    required={true}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className={"btn btn-grey"}
              onClick={() => handleEditAccountClose()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className={"btn btn-primary"}
              type={"submit"}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ViewClient;
