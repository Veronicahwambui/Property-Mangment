/* global $*/
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import Chart from "react-apexcharts";
import numeral from "numeral"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import requestsServiceService from '../services/requestsService.service'
import { Link } from 'react-router-dom';

function Dashboard() {
   const colors = [ '#3399ff','#ff7f50' ,'#00ff00', '#00a591', '#ecdb54' ,'#6b5b95','#944743' ,'#dc4c46', '#034f84', '#edf1ff']

    const [dashboardData, setDashboardData] = useState({})
    const [radioBarData, setRadioBarData] = useState([])
    const [radioBarData2, setRadioBarData2] = useState([])
    const [pieChartData, setPieChartData] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [transactionModesData, setTransactionModesData] = useState([])
    const [monthlyCollectionSummaryRevenue, setMonthlyCollectionSummaryRevenue] = useState([])

    useEffect(() => {
        fetchDashData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        $("#spinner").removeClass("d-none")

        fetchDashData()

    }
    const fetchDashData = () => {

        requestsServiceService.getClientDashboardGraphs(moment(startDate).format("YYYY/MM/DD"), moment(endDate).format("YYYY/MM/DD")).then((res) => {
            $("#spinner").addClass("d-none")

            setRadioBarData(res.data.data.collectionSummaryByPremiseUseType)
            setRadioBarData2(res.data.data.collectionSummaryByUnitType)
            setPieChartData(res.data.data.collectionSummaryByApplicableCharge)
            setTransactionModesData(res.data.data.collectionSummaryByPaymentMode)
            setMonthlyCollectionSummaryRevenue(res.data.data.monthlyCollectionSummaryRevenue)
        })
        requestsServiceService.getClientDashboard(moment(startDate).format("YYYY/MM/DD"), moment(endDate).format("YYYY/MM/DD")).then((res) => {
            setDashboardData(res.data.data)
        })
    }
    // --------------------------
    // CHARTS START HERE 
    // --------------------------

    var walletOptions = {
        series: radioBarData?.map(x => x.variance),
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
                    image: void 0
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
                        opacity: .5
                    }
                },
                dataLabels: {
                    name: {
                        show: !0,
                        fontSize: "16px",
                        fontWeight: 600,
                        offsetY: -10
                    },
                    value: { show: !0, fontSize: "14px", offsetY: 4, formatter: function (e) { return e + "%" } },
                    total: {
                        show: !0,
                        label: "Total",
                        color: "#373d3f",
                        fontSize: "16px",
                        fontFamily: void 0,
                        fontWeight: 600,
                        formatter: function (e) {
                            return e.globals.seriesTotals.reduce(function (e, t) {
                                return e + t
                            }, 0) + "%"
                        }
                    }
                }
            }
        },
        stroke: { lineCap: "round" },
        colors: colors,
        labels: radioBarData.map(x => x.item),
        legend: { show: !1 }
    };

    // premie type 
    var walletOptions2 = {
        series: radioBarData2?.map(x => x.variance),
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
                    image: void 0
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
                        opacity: .5
                    }
                },
                dataLabels: {
                    name: {
                        show: !0,
                        fontSize: "16px",
                        fontWeight: 600,
                        offsetY: -10
                    },
                    value: { show: !0, fontSize: "14px", offsetY: 4, formatter: function (e) { return e + "%" } },
                    total: {
                        show: !0,
                        label: "Total",
                        color: "#373d3f",
                        fontSize: "14px",
                        fontFamily: void 0,
                        fontWeight: 600,
                        formatter: function (e) {
                            return e.globals.seriesTotals.reduce(function (e, t) {
                                return e + t
                            }, 0) + "%"
                        }
                    }
                }
            }
        },
        stroke: { lineCap: "round" },
        colors: colors,
        labels: radioBarData2.map(x => x.item),
        legend: { show: !1 }
    };

    // line graph 
    var options = {
        chart: {
            height: 360,
            type: "bar",
            stacked: !1,
            toolbar: {
                show: !1
            },
            zoom: {
                enabled: !0
            },

        },
        plotOptions: {
            bar: {
                horizontal: !1,
                columnWidth: "40%",
                // endingShape: "rounded"
            }
        },
        dataLabels: {
            enabled: !1,
        },
        stroke: { show: !0, width: 2, colors: ["transparent"] },

        yaxis: {
            labels: {
                formatter: function (value) {
                    // return "KES " + value;
                    return numeral(value).format('0,0 a')
                },
                // formatter: function(val, index) {

                //     return numeral(val).format('0,0')
                // },



            },
            title: {
                text: "Amount in KES",
            }
        },
        series: [{
            name: "Amount Invoiced",
            data: monthlyCollectionSummaryRevenue?.map(x => x.variance)
        }, {
            name: "Amount Paid",
            data: monthlyCollectionSummaryRevenue?.map(x => x.value)
        }],
        xaxis: {
            categories: monthlyCollectionSummaryRevenue?.map(x => x.item)
        },
        colors: ["#f46a6a", "#556ee6"],
        legend: {
            position: "bottom"
        },
        fill: {
            opacity: 1
        },

        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

                return '<ul>' +
                    '<li><b>Price</b>: ' + data.x + '</li>' +
                    '<li><b>Number</b>: ' + data.y + '</li>' +
                    '<li><b>Product</b>: \'' + data.product + '\'</li>' +
                    '<li><b>Info</b>: \'' + data.info + '\'</li>' +
                    '<li><b>Site</b>: \'' + data.site + '\'</li>' +
                    '</ul>';
            }
        },

        tooltip: {
            y: {
                formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                    return "KES " + numeral(value).format('0,0')

                }
            }
        },
        tooltip: {
            y: [{ title: { formatter: function (e) { return e + " (mins)" } } },
            { title: { formatter: function (e) { return e + " per session" } } },
            { title: { formatter: function (e) { return e } } }
            ]
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
                fontSize: '12px',
                fontFamily: undefined

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
                formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                    let currentTotal = 0
                    series.forEach((s) => {
                        currentTotal += s[dataPointIndex]
                    })
                    return "<span class='text-right w-100 d-flex' > KES " + numeral(value).format('0,0') + "</span> "

                }
            }
        }

    }
    // pie chart 

    const pieChart = {
        series: pieChartData.map(x => x.variance),
        chart: { type: "donut", height: 250 },
        labels: pieChartData.map(x => x.item),
        colors: colors,
        legend: { show: !1 },
        plotOptions: { pie: { donut: { size: "40%" } } }
    };

    // small chart\
    var radialoptions1 = {
        series: [99],
        chart: {
            type: "radialBar",
            width: 60,
            height: 60,
            sparkline: {
                enabled: !0
            }
        },
        dataLabels: {
            enabled: !1
        },
        colors: ["#556ee6"],
        labels: ["ngbfds"],
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: "60%"
                },
                track: {
                    margin: 0
                },
                dataLabels: {
                    show: !1
                }
            }
        }
    }

    let formatCurrency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      });


    return (
        <div className="page-content">

            <div class="container-fluid">

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
                            <h4 class="mb-sm-0 font-size-18">Dashboard</h4>

                            <div class="page-title-right">
                                <form className="d-flex align-items-center">
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="d-flex">
                                            <label className="">
                                                Start Date
                                            </label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                selectsStart
                                                className="form-control mouse-pointer sdate"

                                                startDate={startDate}
                                                endDate={endDate}
                                                maxDate={new Date()}
                                            />
                                        </div>
                                        <div className="d-flex">
                                            <label className="">
                                                End Date
                                            </label>
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => setEndDate(date)}
                                                selectsEnd
                                                className="form-control mouse-pointer sdate"

                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                                maxDate={new Date()}
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
                </div>
                {/* <!-- end page title --> */}

                {/* <!-- quick company stats --> */}
                <div class="row">
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="">
                                    <div class="flex-shrink-0 me-3">
                                        <img src="assets/images/users/avatar-1.png" alt="your Logo" class="avatar-md rounded-circle img-thumbnail" />
                                    </div>
                                    <div class="flex-grow-1 align-self-center">
                                        <div class="text-muted mt-2">
                                            <h5 class="mb-1">{dashboardData?.clientName}</h5>
                                            <p class="mb-0">RevenueSure Property Management</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="card-body border-top opacity-0">
                                <div class="row h-5 my-5 py-3">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-8">
                        <div class="row">
                            <div class="col-lg-12 px-sm-30px">
                                <div class="card">
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
                                                                <p class="text-muted text-truncate mb-2">Premises</p>
                                                                <h5 class="mb-0">{dashboardData?.premiseCount}</h5>
                                                            </div>
                                                        </div>
                                                        <div class="col-4 col-sm-3 col-md-2 d-none">
                                                            <div>
                                                                <div class="avatar-xs mb-3">
                                                                    <span class="avatar-title bg-secondary rounded-circle font-size-16">
                                                                        <i class="mdi mdi-chat-outline text-white"></i>
                                                                    </span>
                                                                </div>
                                                                <p class="text-muted text-truncate mb-2 ">Units</p>
                                                                <h5 class="mb-0">{dashboardData?.premiseCount}</h5>
                                                            </div>
                                                        </div>
                                                        <div class="col-4 col-sm-3 col-md-2">
                                                            <div>
                                                                <div class="avatar-xs mb-3">
                                                                    <span class="avatar-title rounded-circle bg-secondary font-size-16">
                                                                        <i class="mdi mdi-shield-home text-white"></i>
                                                                    </span>
                                                                </div>
                                                                <p class="text-muted text-truncate mb-2">Landlords</p>
                                                                <h5 class="mb-0">{dashboardData?.landlordsCount}</h5>

                                                            </div>
                                                        </div>
                                                        <div class="col-4 col-sm-3 col-md-2">
                                                            <div>
                                                                <div class="avatar-xs mb-3">
                                                                    <span class="avatar-title rounded-circle bg-secondary font-size-16">
                                                                        <i class="mdi mdi-account-key text-white"></i>
                                                                    </span>
                                                                </div>
                                                                <p class="text-muted text-truncate mb-2">Tenants</p>
                                                                <h5 class="mb-0">{dashboardData?.tenantsCount}</h5>

                                                            </div>
                                                        </div>
                                                        {dashboardData?.premiseUnitsSummary?.map((item) => (
                                                            <div class="col-4 col-sm-3 col-md-2">
                                                                <div>
                                                                    <div class="avatar-xs mb-3">
                                                                        <span class="avatar-title rounded-circle bg-danger font-size-16">
                                                                            <i class="mdi mdi-home-export-outline  text-white"></i>
                                                                        </span>
                                                                    </div>
                                                                    <p class="text-muted text-truncate mb-2 text-capitalize">{item.item?.toLowerCase()?.replace(/-/g, " ")} Units</p>
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
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="row">
                                    {dashboardData?.collectionSummaryByPaymentStatus?.map((item) => (
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
                                                            <span className='text-capitalize'>{item.item?.toLowerCase()?.replace(/-/g, " ")}</span>
                                                        </div>
                                                    </div>
                                                    <div class="text-muted mt-4">
                                                        <h4>{formatCurrency.format(item.value)}<i class="mdi mdi-chevron-up ms-1 text-success"></i></h4>
                                                        <div class="d-flex">
                                                            <span class="text-truncate text-capitalize">From {item.count} {item.item?.toLowerCase()?.replace(/-/g, " ")} Invoices</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}



                                </div>
                                {/* <!-- end row --> */}
                            </div>
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
                                                <p class="text-muted mb-4"> Rent collections summary </p>
                                            </div>
                                            <div class="ms-auto d-none">
                                                <ul class="nav nav-pills">
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#">Week</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#">Month</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link active" href="#">Year</a>
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

                                        <h4 class="card-title mb-4">Collection By Applicable Charge</h4>

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
                                                {pieChartData?.map((item , index) => (
                                                    <div class="col-4">
                                                        <div class="mt-4 text-left">
                                                            <p class="mb-2 text-truncate text-left text-capitalize"><i class="mdi mdi-circle me-1" style={{color: "" + colors[index] + "" }}></i>{item.item}</p>
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
                                <h4 class="card-title mb-0">Collections by Premise Use Type</h4>
                                <div class="row">
                                    <div class="col-sm-7">
                                        <div>
                                            <div id="unit-types" >
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
                                        {radioBarData?.map((item ,index) => (
                                            <div class="">
                                                <div class="mt-4 text-left">
                                                    <p class="mb-2 text-truncate text-left text-capitalize"><i class="mdi mdi-circle me-1 " style={{color: "" + colors[index] + "" }}></i>{item.item}</p>
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
                                <h4 class="card-title mb-0">Collections by Premise Type</h4>
                                <div class="row">
                                    <div class="col-sm-7">
                                        <div>
                                            <div id="unit-types" >
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
                                        {radioBarData2?.map((item,index) => (
                                            <div>
                                                <p class="mb-2 text-capitalize"><i class="mdi mdi-circle align-middle font-size-10 me-2 " style={{color: "" + colors[index] + "" }}></i> {item.item}</p>
                                                <h5>{formatCurrency.format(item.value)} <br /><span class="text-muted font-size-12 d-none"> Contacts</span></h5>
                                            </div>
                                        ))}


                                    </div>
                                </div>
                            </div>
                        </div>



                        <div class="card">
                            <div class="card-body">

                                <h4 class="card-title mb-4">Revenue Transaction Modes comparison</h4>

                                <div class="table-responsive mt-4">
                                    <table class="table align-middle mb-0">
                                        <tbody>
                                            {transactionModesData?.map((item) => (
                                                <tr>
                                                    <td>
                                                        <h5 class="font-size-14 mb-1">{item.item}</h5>
                                                        <p class="text-muted mb-0">{formatCurrency.format(item.value)}</p>
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
                {/* <!-- end row --> */}



            </div>
            <Helmet>
                <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
                <script src="https://cdn.jsdelivr.net/npm/react-apexcharts"></script>
                {/* <!-- numerals number formater --> */}
                <script src="./assets/libs/numeral/numeral.js "></script>

                {/* <!-- apexcharts --> */}
                <script src="./assets/libs/apexcharts/apexcharts.min.js "></script>
            </Helmet>
        </div>
    )
}

export default Dashboard;
