/* global $ */

import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { baseUrl } from "../../services/API";
import moment from "moment";
import AuthService from "../../services/auth.service";
import StatusBadge from "../../components/StatusBadge";
import ReactPaginate from "react-paginate";
import useTabs from "../../hooks/useTabs";
import { Helmet } from "react-helmet";
import Chart from "react-apexcharts";
import numeral from "numeral";
import DatePicker from "react-datepicker";

function ViewLandlord() {
  const [activeLink, setActiveLink] = useState(1);
  const [landlord, setLandlord] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [agreementtypes, setAgreementTypes] = useState([]);
  const [landlordtypes, setLandlordTypes] = useState([]);
  const [banks, setBanks] = useState([]);
  const [documentTypes, setdocumentTypes] = useState([]);

  const { id } = useParams();
  const userId = id;

  //landlord edits
  const [editlandlordemail, seteditlandlordemail] = useState("");
  const [editlandlordgender, seteditlandlordgender] = useState("");
  const [editlandlordidnumber, seteditlandlordidnumber] = useState("");
  const [editlandlordfilenumber, seteditlandlordfilenumber] = useState("");
  const [editlandlordfirstname, seteditlandlordfirstname] = useState("");
  const [editlandlordlastname, seteditlandlordlastname] = useState("");
  const [editlandlordphonenumber, seteditlandlordphonenumber] = useState("");
  const [editlandlordagreementtype, seteditlandlordagreementtype] =
    useState("");
  const [editlandlordothername, seteditlandlordothername] = useState("");
  const [editlandlordremuneration, seteditlandlordremuneration] =
    useState(null);
  const [editagreementperiod, seteditagreementperiod] = useState(null);
  const [editlandlordtypename, seteditlandlordtypename] = useState("");

  //document edits
  const [editdocumentname, seteditdocumentname] = useState("");
  const [editdocumenttypeid, seteditdocumenttypeid] = useState(null);
  const [editdocument, seteditdocument] = useState("");

  //communication

  const [communication, setCommunication] = useState([]);
  //  const [typeMes, setTypeMes] = useState("TENANT");  const[message,setMessage]=useState([]);

  //documents create
  const [docName, setdocName] = useState("");
  const [document, setdocument] = useState("");
  const [documentTypeId, setdocumentTypeId] = useState(null);

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
  // const seteditbankAccountDetails = (value) => {
  //   seteditbankid(value.split(":")[0]);
  //   seteditbankname(value.split(":")[1]);
  // };
  //modals

  const [show_landlord, setshowlandlord] = useState(false);
  const [show_doc, set_show_doc] = useState(false);
  const [show_acc, set_show_acc] = useState(false);
  const [edittypename, setedittypename] = useState("");

  const landlordshow = () => {
    seteditlandlordemail(landlord.email);
    seteditlandlordgender(landlord.gender);
    seteditlandlordidnumber(landlord.idNumber);
    seteditlandlordfilenumber(landlord.fileNumber);
    seteditlandlordfirstname(landlord.firstName);
    seteditlandlordlastname(landlord.lastName);
    seteditlandlordphonenumber(landlord.phoneNumber);
    setedittypename(landlord.landLordAgreementType?.name);
    seteditlandlordagreementtype(landlord.landLordAgreementType?.id);
    seteditlandlordothername(landlord.otherName);
    seteditlandlordremuneration(landlord.remunerationPercentage);
    seteditagreementperiod(landlord.agreementPeriod);
    seteditlandlordtypename(landlord.landLordType);
    setshowlandlord(true);
  };
  const landlordclose = () => setshowlandlord(false);
  const docshow = () => set_show_doc(true);
  const docclose = () => set_show_doc(false);

  const accshow = (id) => {
    let acc = accountsData.find((account) => account.id === id);
    setEditBankName(acc.bank.bankName);
    setEditPercentageRemuneration(acc.percentageRemuneration);
    setEditBankAccount(acc.bankAccountNumber);
    setEditBankId(acc.bank.id);
    setacc_id(id);
    set_show_acc(true);
  };
  const accclose = () => set_show_acc(false);

  useEffect(() => {
    getlandlords();
    getPremises();
    requestsServiceService.getAllAgreementTypes().then((res) => {
      setAgreementTypes(res.data.data);
    });
    requestsServiceService.getLandlordTypes().then((res) => {
      setLandlordTypes(res.data.data);
    });
    requestsServiceService.getBanks().then((res) => {
      setBanks(res.data.data);
    });
    requestsServiceService.getDocumentTypes().then((res) => {
      setdocumentTypes(res.data.data);
    });
    fetchCommunication();
  }, []);

  const getlandlords = () => {
    requestsServiceService.getLandlord(userId).then((res) => {
      console.log(res.data.data);
      setLandlord(res.data.data.landLord);
      setAccountsData(res.data.data.accounts);
      setDocuments(res.data.data.documents);
    });
  };

  // PREMISES UPDATE
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [premises, setPremises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getPremises = () => {
    let startdate = moment(new Date()).startOf("year").format("YYYY/MM/DD");
    let enddate = moment(endDate).format("YYYY/MM/DD");
    let data = {
      dateCreatedEnd: moment(endDate).format(),
      dateCreatedStart: moment(startDate).format(),
      landlordEmail: landlord?.email,
    };
    requestsServiceService.getLandLordPremises(data).then((res) => {
      setPremises(res.data.data);
    });
  };
  useEffect(() => {
    getPremises();
  }, []);
  const handlePageClick = (data) => {
    let d = data.selected;
    setPage(d);
    // setPage(() => data.selected);
    // console.log(page)
  };
  const handleRangeChange = (e) => {
    console.log(e.target.value);
    setSize(e.target.value);
    setPageCount(0);
    setPage(0);
  };
  const deactivate2 = () => {
    requestsServiceService.togglePremiseStatus(activeId).then(() => {
      getPremises();
    });
  };
  const sort = (event) => {
    console.log(startDate, endDate);
    event.preventDefault();

    let startdate = moment(startDate).format("YYYY/MM/DD");
    let enddate = moment(endDate).format("YYYY/MM/DD");
    requestsServiceService
      .getLandlordDashboard(userId, startdate, enddate)
      .then((res) => {
        console.log(res);
        // $("#spinner").addClass("d-none");
        setDashboardData(res.data.data);
      });
    requestsServiceService
      .getLandlordGraph(userId, startdate, enddate)
      .then((res) => {
        console.log(res);
        setRadioBarData(res.data.data.collectionSummaryByPremiseUseType);
        setRadioBarData2(res.data.data.collectionSummaryByUnitType);
        setPieChartData(res.data.data.collectionSummaryByApplicableCharge);
        setTransactionModesData(res.data.data.collectionSummaryByPaymentMode);
        setMonthlyCollectionSummaryRevenue(
          res.data.data.monthlyCollectionSummaryRevenue
        );
      });
    // let data = {
    //   dateCreatedEnd: "2022-07-01",
    //   dateCreatedStart: "2022-08-15",
    //   landlordEmail: landlord?.email,
    // };
    // requestsServiceService.getAllpremises(page, size, data).then((res) => {
    //   setPremises(res.data.data);
    // });
  };
  const sortSize = (e) => {
    setSize(e.target.value);
    setPage(0);
  };
  const addDate = (date) => {
    console.log(date);
    setStartDate(new Date(date.target.value));
  };
  const addDate2 = (date) => {
    console.log(date);
    setEndDate(new Date(date.target.value));
  };

  $(document).on("change", ".sdate", addDate);
  $(document).on("change", ".edate", addDate2);
  // PREMISES END

  const download = (x) => {
    requestsServiceService.downloadDocuments(x).then((res) => {
      console.log(res);
    });
  };
  //modals
  const showEditLandLord = () => {
    console.log("clicked");
  };
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  const handlelandlordsubmit = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      active: true,
      agreementPeriod: editagreementperiod,
      email: editlandlordemail,
      fileNumber: editlandlordfilenumber,
      firstName: editlandlordfirstname,
      gender: editlandlordgender,
      id: userId,
      idNumber: editlandlordidnumber,
      landLordAgreementTypeId: editlandlordagreementtype,
      landLordTypeName: editlandlordtypename,
      lastName: editlandlordlastname,
      otherName: editlandlordothername,
      phoneNumber: editlandlordphonenumber,
      remunerationPercentage: editlandlordremuneration,
    });
    console.log(data);

    requestsServiceService
      .updateLandLord(data)
      .then((res) => {
        console.log(res);
        setError({
          ...error,
          message: res.data.message,
          color: "success",
        });
        landlordclose();
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
        }, 3000);
        getlandlords();
      })
      .catch((err) => {
        setError({
          ...error,
          message: err.response.data.message,
          color: "danger",
        });
      });
  };

  const handleaccountsubmit = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      id: acc_id,
      active: true,
      bankAccountNumber: editBankAccount,
      bankId: editBankId,
      landLordId: userId,
      percentageRemuneration: editpercentageRemuneration,
      bankName: editBankName,
    });
    requestsServiceService.updateLandLordAccounts(data).then((res) => {
      setError({
        ...error,
        message: res.data.message,
        color: "success",
      });
      accclose();
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: "",
        });
      }, 3000);
      getlandlords();
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
      landLordId: userId,
      percentageRemuneration: percentageRemuneration,
    };
    requestsServiceService.createLandLordAccounts(data).then((res) => {
      setError({
        ...error,
        message: res.data.message,
        color: "success",
      });
      getlandlords();
      docclose();
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: "",
        });
      }, 3000);
    });
  };
  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setdocument(base64);
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
  const [docShow, setdocShow] = useState(false);
  const handleDocShow = () => setdocShow(true);
  const handleDocClose = () => setdocShow(false);

  const handleDocumentSubmit = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      docName: docName,
      document: document,
      documentOwnerTypeName: "LANDLORD",
      documentTypeId: documentTypeId,
      id: null,
      ownerEntityId: userId,
    });
    requestsServiceService
      .createDocuments(data)
      .then((res) => {
        setError({
          ...error,
          message: res.data.message,
          color: "success",
        });
        handleDocClose();
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
        }, 3000);
        getlandlords();
      })
      .catch((err) => {
        console.log(err);
        setError({
          ...error,
          message: err.message,
          color: "danger",
        });
        handleDocClose();
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
        }, 3000);
      });
  };
  const [activeId, setActiveId] = useState("");

  const deactivate = (id) => {
    let docOwnerType = "LANDLORD";
    let entity = userId;
    let documentId = id;
    requestsServiceService
      .deactivateDocuments(docOwnerType, entity, documentId)
      .then((res) => {
        getlandlords();
      });
  };
  const deactivateAcc = (id) => {
    requestsServiceService.deactivateAccounts(id).then((res) => {
      getlandlords();
    });
  };

  let clientId = AuthService.getClientId();

  const fetchCommunication = () => {
    requestsServiceService
      .getEntityCommunication(userId, 0, 5, "LANDLORD", clientId)
      .then((res) => {
        setCommunication(res.data.data);
      });
  };

  // LANDLORD DASHBOARD
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
  }, [userId, landlord]);
  // fetch data
  const fetchDashData = () => {
    let startdate = moment(new Date()).startOf("month").format("YYYY/MM/DD");
    let enddate = moment(endDate).format("YYYY/MM/DD");
    requestsServiceService
      .getLandlordDashboard(userId, startdate, enddate)
      .then((res) => {
        console.log(res);
        // $("#spinner").addClass("d-none");
        setDashboardData(res.data.data);
      });
    requestsServiceService
      .getLandlordGraph(userId, startdate, enddate)
      .then((res) => {
        console.log(res);
        setRadioBarData(res.data.data.collectionSummaryByPremiseUseType);
        setRadioBarData2(res.data.data.collectionSummaryByUnitType);
        setPieChartData(res.data.data.collectionSummaryByApplicableCharge);
        setTransactionModesData(res.data.data.collectionSummaryByPaymentMode);
        setMonthlyCollectionSummaryRevenue(
          res.data.data.monthlyCollectionSummaryRevenue
        );
      });
  };
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  useEffect(() => {
    console.log(dashboardData);
  }, [dashboardData]);

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
  //pie chart
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
  return (
    <>
      <div className="page-content">
        <div className="content-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            {/*<div id="spinner">*/}
            {/*  <div id="status">*/}
            {/*    <div className="spinner-chase">*/}
            {/*      <div className="chase-dot"></div>*/}
            {/*      <div className="chase-dot"></div>*/}
            {/*      <div className="chase-dot"></div>*/}
            {/*      <div className="chase-dot"></div>*/}
            {/*      <div className="chase-dot"></div>*/}
            {/*      <div className="chase-dot"></div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18"></h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">
                      <Link to="/landlords">All Landlords</Link>
                    </li>
                    <li class="breadcrumb-item active">
                      {landlord.firstName && landlord.lastName}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body pt-2 pb-3 align-items-center d-flex">
                  <nav className="navbar navbar-expand-md navbar-white bg-white py-2 w-100">
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
                          Landlord Details<span className="sr-only"></span>
                        </a>
                        <a
                          onClick={() => setActiveLink(2)}
                          className={
                            activeLink === 2
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Landlord Accounts
                        </a>
                        <a
                          onClick={() => setActiveLink(3)}
                          className={
                            activeLink === 3
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Landlord Documents
                        </a>
                        <a
                          onClick={() => setActiveLink(4)}
                          className={
                            activeLink === 4
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Communication
                        </a>
                        <a
                          onClick={() => setActiveLink(5)}
                          className={
                            activeLink === 5
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Premises
                        </a>
                      </div>
                    </div>
                  </nav>
                  <div className="text-end">
                    <button
                      type="button"
                      onClick={() => landlordshow()}
                      className="btn btn-primary dropdown-toggle option-selector"
                    >
                      <i class="mdi mdi-account-edit font-size-16 align-middle me-2"></i>
                      Edit Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {error.color !== "" && (
              <div className={"alert alert-" + error.color} role="alert">
                {error.message}
              </div>
            )}

            {/*LANDLORD DETAILS*/}
          </div>
          {activeLink === 1 && (
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
                            {landlord?.firstName} {landlord?.lastName}
                            {landlord?.otherName}
                            {landlord.active ? (
                              <span className="badge badge-pill badge-soft-success font-size-11">
                                Active
                              </span>
                            ) : (
                              <span className="badge badge-pill badge-soft-success font-size-11">
                                Inactive
                              </span>
                            )}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="card-body border-top">
                      <p className="text-muted mb-0 d-flex align-items-center">
                        <a
                          href={`tel:${landlord?.phoneNumber}`}
                          className="d-flex align-items-center"
                        >
                          <i className="mdi mdi-phone me-2 font-size-18"></i>{" "}
                          {landlord?.phoneNumber}
                        </a>
                        <span className="px-3 px-3">|</span>
                        <a
                          className="d-flex align-items-center"
                          href={"mailto:" + landlord?.email}
                        >
                          <i className="mdi mdi-email-outline font-size-18 me-2" />
                          {landlord?.email}
                        </a>
                      </p>
                    </div>
                    <div className="card-body border-top">
                      <p className="p-2 m-0">
                        <span className="text-muted">National ID No.</span>{" "}
                        {landlord.idNumber}
                      </p>
                      <p className="p-2 m-0">
                        <span className="text-muted">File Number. </span>
                        {landlord.fileNumber}
                      </p>
                      <p className="p-2 m-0">
                        <span className="text-muted">Landlord Type. </span>
                        {landlord.landLordType
                          ?.toLowerCase()
                          ?.replace(/_/g, " ")}
                      </p>
                      <p className="p-2 m-0">
                        <span className="text-muted">Remuneration. </span>
                        {landlord.remunerationPercentage} %
                      </p>
                      <p className="p-2 m-0">
                        <span className="text-muted">Agreement Period. </span>
                        {landlord.agreementPeriod} months
                      </p>
                      <p className="p-2 m-0">
                        <span className="text-muted">Agreement Type. </span>
                        {landlord?.landLordAgreementType?.name
                          ?.toLowerCase()
                          ?.replace(/_/g, " ")}
                      </p>
                    </div>
                    <div className="card-body border-top pb-2 pt-3">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="text-muted">
                            <table className="table table-borderless mb-0 table-sm table-striped">
                              <tbody>
                                <tr>
                                  <td className="pl-0 pb-0 text-muted">
                                    <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>
                                    Gender
                                  </td>
                                  <td className="pb-0">
                                    <span className="text-black">
                                      {landlord.gender}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="pl-0 pb-0 text-muted">
                                    <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>
                                    Date of Registration
                                  </td>
                                  <td className="pb-0">
                                    <span className="text-black">
                                      {moment(landlord.dateTimeCreated).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <br />
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
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
                                      <div className="col-4 col-sm-3 col-md-2 d-none">
                                        <div>
                                          <div className="avatar-xs mb-3">
                                            <span className="avatar-title bg-secondary rounded-circle font-size-16">
                                              <i className="mdi mdi-chat-outline text-white"></i>
                                            </span>
                                          </div>
                                          <p className="text-muted text-truncate mb-2 ">
                                            Units
                                          </p>
                                          <h5 className="mb-0">
                                            {dashboardData?.premiseCount}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="col-4 col-sm-3 col-md-2">
                                        <div>
                                          <div className="avatar-xs mb-3">
                                            <span className="avatar-title rounded-circle bg-secondary font-size-16">
                                              <i className="mdi mdi-account-key text-white"></i>
                                            </span>
                                          </div>
                                          <p className="text-muted text-truncate mb-2">
                                            Tenants
                                          </p>
                                          <h5 className="mb-0">
                                            {dashboardData?.tenantsCount}
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
                                <div className="col-sm-4">
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
                      <h4 className="card-title mb-0">
                        Collections by Premise Use Type
                      </h4>
                      <div className="row">
                        <div className="col-sm-7">
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
                        <div className="col-sm-5 align-self-center">
                          {radioBarData?.map((item, index) => (
                            <div className="">
                              <div className="mt-4 text-left">
                                <p className="mb-2 text-truncate text-left text-capitalize">
                                  <i
                                    className="mdi mdi-circle me-1 "
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
                <div className="col-xl-8">
                  <div className="card">
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
                              </div>
                            </div>
                          </div>
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
                      <h4 className="card-title mb-0">
                        Collections by Premise Type
                      </h4>
                      <div className="row">
                        <div className="col-sm-7">
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
                        <div className="col-sm-5 align-self-center">
                          {radioBarData2?.map((item, index) => (
                            <div>
                              <p className="mb-2 text-capitalize">
                                <i
                                  className="mdi mdi-circle align-middle font-size-10 me-2 "
                                  style={{ color: "" + colors[index] + "" }}
                                ></i>{" "}
                                {item.item}
                              </p>
                              <h5>
                                {formatCurrency.format(item.value)} <br />
                                <span className="text-muted font-size-12 d-none">
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
                </div>
                <div className="col-xl-4">
                  {" "}
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title mb-4">
                        Revenue Transaction Modes comparison
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
                                  <div
                                    id="radialchart-1"
                                    className="apex-charts"
                                  >
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
                                  <p className="text-muted mb-1">
                                    Transactions
                                  </p>
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
              </div>
            </>
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
                                Landlord Accounts
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
                            {error.color !== "" && (
                              <div
                                className={"alert alert-" + error.color}
                                role="alert"
                              >
                                {error.message}
                              </div>
                            )}
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
                                    {accountsData
                                      ?.sort((a, b) =>
                                        a.bank.bankName.localeCompare(
                                          b.bank.bankName
                                        )
                                      )
                                      ?.map((acc, index) => (
                                        <tr data-id={index} key={index}>
                                          <td style={{ width: "80px" }}>
                                            {index + 1}
                                          </td>
                                          <td
                                            data-field="estate"
                                            className="text-capitalize"
                                          >
                                            {acc.bank.bankName
                                              ?.toLowerCase()
                                              ?.replace(/_/g, " ")}
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
                                                <i className="bx bx-edit-alt " />
                                              </a>
                                              {acc.active ? (
                                                <button
                                                  className="btn btn-danger btn-sm btn-rounded waves-effect waves-light"
                                                  title="deactivate"
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#confirm-acc-deactivate"
                                                  style={{ marginLeft: "8px" }}
                                                  onClick={() =>
                                                    setActiveId(acc.id)
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
                                                    setActiveId(acc.id)
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
                <div className="card">
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
                                    Landlord Documents
                                  </h4>
                                </div>
                                <div className="d-flex">
                                  <button
                                    type="button"
                                    className="btn btn-primary waves-effect btn-label waves-light me-3"
                                    data-bs-toggle="modal"
                                    onClick={handleDocShow}
                                    data-bs-target="#add-new-agreementType"
                                  >
                                    <i className="mdi mdi-plus label-icon"></i>{" "}
                                    Add Document
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="row">
                                {error.color !== "" && (
                                  <div
                                    className={"alert alert-" + error.color}
                                    role="alert"
                                  >
                                    {error.message}
                                  </div>
                                )}
                                <div className="col-12">
                                  <div className="table-responsive">
                                    <table className="table align-middle table-nowrap table-hover mb-0">
                                      <thead>
                                        <tr className="text-uppercase table-dark">
                                          <th scope="col">#</th>
                                          <th scope="col">Document Name</th>
                                          <th scope="col">Document Type</th>
                                          <th scope="col">Status</th>
                                          <th className="text-right">
                                            Actions
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {documents?.map((doc, index) => (
                                          <tr data-id={index} key={index}>
                                            <td style={{ width: "80px" }}>
                                              {index + 1}
                                            </td>
                                            <td data-field="estate">
                                              <a
                                                href={
                                                  baseUrl +
                                                  "/documents/download?docName=" +
                                                  `${doc.docName}`
                                                }
                                              >
                                                {" "}
                                                {doc.docName}
                                              </a>
                                            </td>
                                            <td
                                              data-field="unit-num "
                                              className="text-capitalize"
                                            >
                                              {doc.documentType?.name?.toLowerCase()}
                                            </td>
                                            <td data-field="unit-num ">
                                              {doc.active ? (
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
                                                  href={
                                                    baseUrl +
                                                    "/documents/download?docName=" +
                                                    `${doc.docName}`
                                                  }
                                                  className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit"
                                                  target="_blank"
                                                >
                                                  <i className="bx bx-download" />
                                                </a>
                                                {doc.active ? (
                                                  <button
                                                    className="btn btn-danger btn-sm btn-rounded waves-effect waves-light"
                                                    title="deactivate"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#confirm-deactivate"
                                                    style={{
                                                      marginLeft: "8px",
                                                    }}
                                                    onClick={() =>
                                                      setActiveId(doc.id)
                                                    }
                                                  >
                                                    Deactivate
                                                  </button>
                                                ) : (
                                                  <button
                                                    className="btn btn-success btn-sm btn-rounded waves-effect waves-light"
                                                    title="deactivate"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#confirm-activate"
                                                    style={{
                                                      marginLeft: "8px",
                                                    }}
                                                    onClick={() =>
                                                      setActiveId(doc.id)
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
              </div>
            </div>
          )}

          {activeLink === 4 && (
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
                                        <span class="d-none">Sms</span>
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
                                  <td class="the-msg the-msg-2"></td>
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
          )}

          {activeLink === 5 && (
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                      <div
                        className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                        role="toolbar"
                      >
                        <h4 className="card-title text-capitalize mb-0 ">
                          Landlord Premises
                        </h4>
                      </div>
                      {/*<div className="btn-toolbar p-3 align-items-center d-none animated delete-tool-bar"*/}
                      {/*     role="toolbar">*/}
                      {/*  <button type="button"*/}
                      {/*          className="btn btn-primary waves-effect btn-label waves-light me-3"><i*/}
                      {/*    className="mdi mdi-printer label-icon"></i> Print Selected Invoices*/}
                      {/*  </button>*/}
                      {/*</div>*/}
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table  table-nowrap table-hover overflow-visible contacts-table">
                          <thead className="table-light">
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Premises</th>
                              <th scope="col">Premises type</th>
                              <th scope="col">Premises use type</th>
                              <th scope="col">Address</th>
                              <th scope="col">Estate</th>
                              <th scope="col">Zone</th>
                              <th scope="col">County</th>
                              <th scope="col">File No</th>
                              <th scope="col">Status</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {premises?.map((premise, index) => {
                              let premiseType = premise.premiseType;
                              let premiseUseType = premise.premiseUseType;
                              let estate = premise.estate;
                              let zone = premise.estate.zone;
                              let county =
                                premise.estate.zone.clientCounty.county;

                              return (
                                <tr key={index}>
                                  <td className="text-capitalize">
                                    {index + 1}
                                  </td>
                                  <td className="text-capitalize">
                                    <Link
                                      to={`/premise/${premise.id}`}
                                      title="View Details"
                                    >
                                      {premise.premiseName}
                                    </Link>
                                  </td>
                                  <td className="text-capitalize">
                                    <h5 className="font-size-14 mb-1">
                                      <a
                                        href="landlord-details.html"
                                        className="text-dark"
                                      >
                                        {premiseType.name}
                                      </a>
                                    </h5>
                                  </td>
                                  <td className="text-capitalize">
                                    <span className="badge badge-soft-warning font-size-11 m-1 text-capitalize">
                                      {premiseUseType.name}
                                    </span>
                                  </td>
                                  <td className="text-capitalize">
                                    {premise.address}
                                  </td>
                                  <td className="text-capitalize">
                                    {estate.name}
                                  </td>
                                  <td className="text-capitalize">
                                    {zone.name}
                                  </td>
                                  <td className="text-capitalize">
                                    {county.name.toLowerCase()}
                                  </td>
                                  <td className="text-danger">
                                    {premise.fileNumber}
                                  </td>
                                  <td>
                                    {premise.active ? (
                                      <span className="badge-soft-success badge">
                                        Active
                                      </span>
                                    ) : (
                                      <span className="badge-soft-danger badge">
                                        Inactive
                                      </span>
                                    )}
                                  </td>

                                  <td>
                                    <div className="dropdown">
                                      <a
                                        className="text-muted font-size-16"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                      >
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                      </a>

                                      <div className="dropdown-menu dropdown-menu-end">
                                        <Link
                                          class="dropdown-item"
                                          to={`/premise/${premise.id}`}
                                        >
                                          <i className="font-size-15 mdi mdi-eye-plus-outline me-3"></i>
                                          Detailed view
                                        </Link>
                                        {/* <a class="dropdown-item" href="property-units.html"><i class="font-size-15 mdi mdi-home-variant me-3"></i>Units</a> */}
                                        {/* <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-home-edit me-3"></i>Edit property</a> */}
                                        {/* <a class="dropdown-item" href="#"> <i class="font-size-15  mdi-file-document-multiple mdi me-3 text-info"> </i> Change ownership</a> */}
                                        <a
                                          onClick={() => {
                                            setActiveId(premise.id);
                                            deactivate2();
                                          }}
                                          className="dropdown-item cursor-pointer"
                                        >
                                          <i className="font-size-15  dripicons-wrong me-3 text-danger"></i>
                                          {premise.active
                                            ? "Deactivate"
                                            : "Activate"}
                                        </a>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                            {/* <tr></tr> */}
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-between align-items-center">
                          <select
                            className="btn btn-md btn-primary"
                            title="Select A range"
                            onChange={(e) => handleRangeChange(e)}
                            value={size}
                          >
                            <option className="bs-title-option" value="">
                              Select A range
                            </option>
                            <option value="10">10 Rows</option>
                            <option value="30">30 Rows</option>
                            <option value="50">50 Rows</option>
                          </select>

                          {pageCount !== 0 && pageCount > 1 && (
                            <nav
                              aria-label="Page navigation comments"
                              className="mt-4"
                            >
                              <ReactPaginate
                                previousLabel="<"
                                nextLabel=">"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                pageCount={pageCount}
                                pageRangeDisplayed={4}
                                marginPagesDisplayed={2}
                                containerClassName="pagination justify-content-center"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                activeClassName="active"
                                onPageChange={(data) => handlePageClick(data)}
                              />
                            </nav>
                          )}
                        </div>
                        <h5 className="font-medium  text-muted mt-2">
                          showing page{" "}
                          <span className="text-primary">
                            {pageCount === 0 ? page : page + 1}
                          </span>{" "}
                          of<span className="text-primary"> {pageCount}</span>{" "}
                          pages
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/*edit landlord modals*/}
          <Modal
            show={show_landlord}
            onHide={landlordclose}
            className={"modal fade"}
            centered
          >
            <form onSubmit={handlelandlordsubmit}>
              <Modal.Header closeButton onClick={() => landlordclose()}>
                <Modal.Title>Update Landlord</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Landlord Type{" "}
                        <strong className="text-danger ">*</strong>
                      </label>
                      <select
                        className="form-control text-capitalize"
                        value={editlandlordtypename}
                        onChange={(e) =>
                          seteditlandlordtypename(e.target.value)
                        }
                        required={true}
                      >
                        <option className="text-black font-semibold ">
                          {editlandlordtypename
                            ?.toLowerCase()
                            ?.replace(/_/g, " ")}
                        </option>
                        {landlordtypes
                          .sort((a, b) => a.localeCompare(b))
                          ?.map((item, index) => (
                            <option value={item}>
                              {item?.toLowerCase()?.replace(/_/g, " ")}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Agreement Type.{" "}
                        <strong className="text-danger ">*</strong>
                      </label>
                      <select
                        className="form-control text-capitalize"
                        value={editlandlordagreementtype}
                        onChange={(e) =>
                          seteditlandlordagreementtype(e.target.value)
                        }
                        required={true}
                      >
                        <option className="text-black font-semibold ">
                          {edittypename?.toLowerCase()?.replace(/_/g, " ")}
                        </option>
                        {agreementtypes
                          .sort((a, b) => a.name.localeCompare(b.name))
                          ?.map((item, index) => (
                            <option value={item.id}>
                              {item.name?.toLowerCase()?.replace(/_/g, " ")}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        File Num. <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="text"
                        value={editlandlordfilenumber}
                        onChange={(e) =>
                          seteditlandlordfilenumber(e.target.value)
                        }
                        className="form-control"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Remuneration %.{" "}
                        <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="number"
                        value={editlandlordremuneration}
                        onChange={(e) =>
                          seteditlandlordremuneration(e.target.value)
                        }
                        className="form-control"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Agreement Period.{" "}
                        <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="number"
                        value={editagreementperiod}
                        onChange={(e) => seteditagreementperiod(e.target.value)}
                        className="form-control"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor=" " className=" ">
                        Gender: <strong className="text-danger ">*</strong>
                      </label>
                      <div className="d-flex ">
                        <div className="form-check me-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            checked={editlandlordgender === "male"}
                            value={"male"}
                            onChange={(e) =>
                              seteditlandlordgender(e.target.value)
                            }
                            id="gender-male"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="gender-male"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check me-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            checked={editlandlordgender === "female"}
                            value={"female"}
                            onChange={(e) =>
                              seteditlandlordgender(e.target.value)
                            }
                            id="gender-female"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="gender-female"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        ID Num. <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="text"
                        value={editlandlordidnumber}
                        onChange={(e) =>
                          seteditlandlordidnumber(e.target.value)
                        }
                        className="form-control"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        First Name. <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="text"
                        value={editlandlordfirstname}
                        onChange={(e) =>
                          seteditlandlordfirstname(e.target.value)
                        }
                        className="form-control"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Last Name. <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="text"
                        value={editlandlordlastname}
                        onChange={(e) =>
                          seteditlandlordlastname(e.target.value)
                        }
                        className="form-control"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">Other Name</label>
                      <input
                        type="text"
                        value={editlandlordothername}
                        onChange={(e) =>
                          seteditlandlordothername(e.target.value)
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Email. <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="email"
                        value={editlandlordemail}
                        onChange={(e) => seteditlandlordemail(e.target.value)}
                        className="form-control"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Phone Number.{" "}
                        <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="text"
                        value={editlandlordphonenumber}
                        onChange={(e) =>
                          seteditlandlordphonenumber(e.target.value)
                        }
                        className="form-control"
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
                  onClick={landlordclose}
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
          {/*edit accounts modal*/}
          <Modal
            show={show_acc}
            onHide={accclose}
            className={"modal fade"}
            centered
          >
            <form onSubmit={handleaccountsubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Edit account details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Select Bank/ <strong className="text-danger ">*</strong>
                      </label>
                      <select
                        className="form-control text-capitalize"
                        onChange={(e) => {
                          editBankAccountDetails(e.target.value);
                        }}
                        name="bank account"
                        required={true}
                      >
                        <option className="text-black font-semibold ">
                          {editBankName}
                        </option>
                        {banks
                          .sort((a, b) => a.bankName.localeCompare(b.bankName))
                          ?.map((bank) => {
                            return (
                              <option
                                key={bank.id}
                                value={bank.id + ":" + bank.bankName}
                              >
                                {bank.bankName
                                  ?.toLowerCase()
                                  ?.replace(/_/g, " ")}
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
                  onClick={() => accclose()}
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
        </div>
        {/*add accounts modal*/}
        <Modal
          show={show_doc}
          onHide={docclose}
          className={"modal fade"}
          centered
        >
          <form onSubmit={handleAccountSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Add account details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <div className="form-group mb-4">
                    <label htmlFor="">
                      Select Bank. <strong className="text-danger ">*</strong>
                    </label>
                    <select
                      className="form-control text-capitalize"
                      onChange={(e) => {
                        setbankAccountDetails(e.target.value);
                      }}
                      name="bank account"
                      required={true}
                    >
                      <option className="text-black font-semibold ">
                        select..
                      </option>
                      {banks
                        .sort((a, b) => a.bankName.localeCompare(b.bankName))
                        ?.map((bank) => {
                          return (
                            <option
                              key={bank.id}
                              value={bank.id + ":" + bank.bankName}
                            >
                              {bank.bankName?.toLowerCase()?.replace(/_/g, " ")}
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
                      onChange={(e) =>
                        setPercentageRemuneration(e.target.value)
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
        {/*add documents*/}
        <Modal
          show={docShow}
          onHide={handleDocClose}
          className={"modal fade"}
          centered
        >
          <form onSubmit={handleDocumentSubmit}>
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
                        setdocumentTypeId(e.target.value);
                      }}
                      name="document type"
                      required={true}
                    >
                      <option className="text-black font-semibold ">
                        select document type..
                      </option>
                      {documentTypes
                        .sort((a, b) => a.name.localeCompare(b.name))
                        ?.map((dT) => {
                          return (
                            <option key={dT.id} value={dT.id}>
                              {dT.name?.toLowerCase()?.replace(/_/g, " ")}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">
                      Document Name. <strong className="text-danger ">*</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={docName}
                      onChange={(e) => setdocName(e.target.value)}
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
                        <i className="font-14px mdi mdi-paperclip" /> Attach
                        File
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
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        <div
          className="modal fade"
          id="confirm-deactivate"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          centered="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <center>
                  <h5>Deactivate Document ?</h5>
                </center>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  no
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => deactivate(activeId)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* confirm dactivate  */}
        <div
          className="modal fade"
          id="confirm-activate"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          centered="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <center>
                  <h5>Activate Document ?</h5>
                </center>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  no
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => deactivate(activeId)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* confirm ACCOUNT  */}
        <div
          className="modal fade"
          id="confirm-acc-activate"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          centered="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <center>
                  <h5>Activate Account ?</h5>
                </center>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  no
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => deactivateAcc(activeId)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* confirm dactivate  */}
        <div
          className="modal fade"
          id="confirm-acc-deactivate"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          centered="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <center>
                  <h5>Deactivate Account ?</h5>
                </center>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  no
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => deactivateAcc(activeId)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <script src="https://cdn.jsdelivr.net/npm/react-apexcharts"></script>
        {/* <!-- numerals number formater --> */}
        <script src="./assets/libs/numeral/numeral.js "></script>

        {/* <!-- apexcharts --> */}
        <script src="./assets/libs/apexcharts/apexcharts.min.js "></script>
      </Helmet>
    </>
  );
}

export default ViewLandlord;
