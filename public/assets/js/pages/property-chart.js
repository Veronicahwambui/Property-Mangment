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
    chart = new ApexCharts(document.querySelector("#property-chart"), options);
chart.render();