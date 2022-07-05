// tenants invoices and payments chart
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
                formatter: function(value) {
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
            data: [520000, 596000, 245000, 125000, 250000, 475000, 595000, 236000, 526000, 125600, 222000, 452000]
        }, {
            name: "Amount Paid",
            data: [510000, 520000, 241500, 105000, 150000, 475000, 271500, 475000, 360259, 100000, 271900, 475000]
        }],
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        colors: ["#f46a6a", "#556ee6"],
        legend: {
            position: "bottom"
        },
        fill: {
            opacity: 1
        },

        tooltip: {
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
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
                formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                    return "KES " + numeral(value).format('0,0')

                }
            }
        },
        tooltip: {
            y: [{ title: { formatter: function(e) { return e + " (mins)" } } },
                { title: { formatter: function(e) { return e + " per session" } } },
                { title: { formatter: function(e) { return e } } }
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
            // custom: function({ series, seriesIndex, dataPointIndex, w }) {
            //     let currentTotal = 0
            //     series.forEach((s) => {
            //         currentTotal += s[dataPointIndex]
            //     })
            //     return '<div class="custom-tooltip">' +
            //         '<span><b>Total: </b>' + currentTotal + '</span>' +
            //         '</div>'
            // },
            y: {
                formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                    let currentTotal = 0
                    series.forEach((s) => {
                        currentTotal += s[dataPointIndex]
                    })
                    return "<span class='text-right w-100 d-flex' > KES " + numeral(value).format('0,0') + "</span> "

                }
            }
        }

    },
    chart = new ApexCharts(document.querySelector("#revenue-chart"), options);
chart.render();

//Bundle usage summary
var walletOptions = {
    series: [76, 24],
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
                strokeWidth: "97%",
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
                value: { show: !0, fontSize: "14px", offsetY: 4, formatter: function(e) { return e + "%" } },
                total: {
                    show: !0,
                    label: "Total",
                    color: "#373d3f",
                    fontSize: "16px",
                    fontFamily: void 0,
                    fontWeight: 600,
                    formatter: function(e) {
                        return e.globals.seriesTotals.reduce(function(e, t) {
                            return e + t
                        }, 0) + "%"
                    }
                }
            }
        }
    },
    stroke: { lineCap: "round" },
    colors: ["#556ee6", "#e83e8c", "#00a884"],
    labels: ["Residential", "Commercial"],
    legend: { show: !1 }
};
(chart = new ApexCharts(document.querySelector("#unit-types"), walletOptions)).render();
options = {
    series: [56, 20, 24],
    chart: { type: "donut", height: 250 },
    labels: ["Agreement Fee", "Commission", "Surcharge"],
    colors: ["#556ee6", "#34c38f", "#f46a6a"],
    legend: { show: !1 },
    plotOptions: { pie: { donut: { size: "40%" } } }
};
(chart = new ApexCharts(document.querySelector("#agrement-type"), options)).render();


// revenue collection mode comparisons
radialchart1 = new ApexCharts(document.querySelector("#radialchart-1"), radialoptions1);
radialchart1.render();
var radialoptions2 = {
    series: [72],
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
    colors: ["#34c38f"],
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
var radialoptions1 = {
        series: [37],
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
    },
    radialchart1 = new ApexCharts(document.querySelector("#radialchart-1"), radialoptions1);
radialchart1.render();
var radialoptions2 = {
        series: [72],
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
        colors: ["#34c38f"],
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
    },
    radialchart2 = new ApexCharts(document.querySelector("#radialchart-2"), radialoptions2);
radialchart2.render();
var radialoptions3 = {
        series: [54],
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
        colors: ["#f46a6a"],
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
    },
    radialchart3 = new ApexCharts(document.querySelector("#radialchart-3"), radialoptions3);
radialchart3.render();