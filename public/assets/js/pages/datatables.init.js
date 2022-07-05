$(document).ready(function() {

    var theTable
    theTable = $("#datatable").DataTable(), $("#datatable-buttons").DataTable({
        lengthChange: !1,
        buttons: ["copy", "print", "excel", "csv", "pdf", "colvis"],
        language: {
            searchPlaceholder: "Search through Records ...",
            search: "",
            lengthMenu: ` <select name='length_change' class="form-control selectpicker table-rows-selector show-tick" data-style="btn-primary" id='length_change' title="Select A range">
                            <option value='15'>15 Rows</option>
                            <option value='50' selected="true">50 Rows</option>
                            <option value='100'>100 Rows</option>
                            <option value='150'>150 Rows</option>
                            <option value='200'>200 Rows</option>
                            <option value='-1'>All Rows</option>
                        </select>`

        },
        "pageLength": 15,
        lengthChange: 15,
        sDom: 'f<"dataTables__top"lfB>rt<"dataTables__bottom"ip><"clear">',

        //this functon is fired once the datatable is drawn 
        "fnDrawCallback": function(oSettings) {
            var isEmpty = $('.dataTable tr td').hasClass('dataTables_empty');
            if (isEmpty == true) {
                $('.dataTable tbody tr td').text("");
                $('.dataTable tr').removeClass('odd');
                $('.dataTable tbody tr td').append(`  <div class="row justify-content-center mt-5 w-100">
                                                        <div class="col-sm-4 col-md-6 p-4 mb-0">
                                                            <img src="assets/images/empty.svg" alt=" " class="img-fluid mx-auto d-block">
                                                        </div>
                                                        <div class="col-12 text-center mb-3">
                                                            <h2 class="mt-3 text-capitalize">No data available in table</h2>
                                                            <p class="text-muted"><strong>Sorry!!!</strong>, we are afraid there are no results to be displayed for that search. Try something else</p>
                                                        </div>
                                                    </div>`);

            }
        }
    }).buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)"), $('#datatable-buttons_wrapper .dt-buttons').append('<button type="button" class="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#dt__filter" aria-controls="offcanvasRight"><i class="mdi mdi-filter-variant font-size-16 align-middle me-2"></i><span class="d-none d-xxl-inline">Filter</span></button>'), $('.dataTables_length > label').addClass(''), $('.dataTables_length select btn-sm').addClass('form-control selectpicker show-tick table-rows-selector d-flex'), $('.dataTables_filter').eq(1).addClass('d-none d-xl-flex'), $('.dataTables_filter').eq(0).addClass('d-xl-none'), $('.dataTables_length select').attr("data-style", "btn-primary"), $('.dataTables__top').addClass('pr-0 pl-0 d-flex align-items-center w-100'), $('.dataTables_filter input').addClass('emailSearch w-100'), $('#datatable-buttons_filter').addClass('mb-3 d-xl-none'), $('.buttons-copy').prepend('<span class="bx bx-copy font-size-16 align-middle me-2"></span>').children('span').eq(1).addClass('d-none d-xxl-inline'), $('.buttons-pdf').addClass('d-none'), $('.buttons-csv').addClass('d-none'), $('.buttons-excel').addClass('d-none'), $('.buttons-print').prepend('<span class="bx bx-printer font-size-16 align-middle me-2"></span>'), $('#datatable-buttons_wrapper .dt-buttons').prepend(`<div class="dropdown m-0 d-flex">
    <a href="#" class="btn btn-secondary dropdown-toggle boarder-right-0 d-flex" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="bx bxs-download font-size-16 align-middle me-2"></i> <span class="d-none d-xxl-inline">Download</span><i class="mdi mdi-chevron-down"></i>
    </a>

    <div class="dropdown-menu" style="">
        <a class="dropdown-item" data-table-action="pdf" href="#">Download as PDF</a>
        <a class="dropdown-item buttons-html5" data-table-action="excel" aria-controls="datatable-buttons" tabindex="0"  href="#">Download as Excel File</a>
        <a class="dropdown-item" data-table-action="csv" href="#">Download as CSV file</a>
    </div>
</div>`), $('.buttons-print').children('span').eq(1).addClass('d-none d-xxl-inline'), $('.buttons-colvis').prepend('<span class="mdi mdi-eye-check-outline font-size-16 align-middle me-2"></span>').children('span').eq(1).addClass('d-none d-xxl-inline');


    var emailTable;
    emailTable = $("#emailDataTable").DataTable(), $("#emailDataTable-btns").DataTable({
        order: [
            [1, "desc"]
        ],
        lengthMenu: [
            [15, 30, 50, -1],
            ["15 Rows", "30 Rows", "50 Rows", "Everything"],

        ],

        language: {
            searchPlaceholder: "Search through Records ...",
            search: "",
            lengthMenu: ` <select name='length_change' class="form-control selectpicker table-rows-selector show-tick" data-style="btn-primary" id='length_change' title="Select A range">
                            <option value='5'>10 Rows</option>
                            <option value='50' selected="true">50 Rows</option>
                            <option value='100'>100 Rows</option>
                            <option value='150'>150 Rows</option>
                            <option value='200'>200 Rows</option>
                            <option value='-1'>All Rows</option>
                        </select>`

        },
        "pageLength": 50,
        lengthChange: 50,
        sDom: 'f<"dataTables__top"lfB>rt<"dataTables__bottom"ip><"clear">',
        buttons: ["copy", "print", "excel", "csv", "pdf", "colvis"],
        //this functon is fired once the datatable is drawn 
        "fnDrawCallback": function(oSettings) {
            var isEmpty = $('.dataTable tr td').hasClass('dataTables_empty');
            if (isEmpty == true) {
                $('.dataTable tbody tr td').text("");
                $('.dataTable tr').removeClass('odd');
                $('.dataTable tbody tr td').append(`  <div class="row justify-content-center mt-5 w-100">
                                                        <div class="col-sm-4 col-md-6 p-4 mb-0">
                                                            <img src="assets/images/empty.svg" alt=" " class="img-fluid mx-auto d-block">
                                                        </div>
                                                        <div class="col-12 text-center mb-3">
                                                            <h2 class="mt-3 text-capitalize">No data available in table</h2>
                                                            <p class="text-muted"><strong>Sorry!!!</strong>, we are afraid there are no results to be displayed for that search. Try something else</p>
                                                        </div>
                                                    </div>`);

            }
        },
        "initComplete": function() {
            var api = this.api();
            $('body').on('click', '.option-selector-cont .dropdown-menu a', function() {
                var theFilter
                var theSelectedption = $(this).children("span").text();
                theFilter = theSelectedption;
                if (theSelectedption == "All Messages") {
                    theFilter = ""
                }
                var theActiveOption = $(this).parent().siblings().find("span").text(theSelectedption);
                filterTableByColumn(2, theFilter)
            });

            //filter by MSG type
            $('input[name$="msg-type-filter"]').on('change', function() {
                var theValue = $(this).val();
                filterTableByColumn(0, theValue)

            })

            //Filter by delivery status
            function filterTableByColumn(i, theValue) {
                api.column(i).search(
                    theValue
                ).draw();

            }
        }


    }).buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)"), $('.dataTables_length > label').addClass(''), $('.dataTables_length select btn-sm').addClass('form-control selectpicker show-tick table-rows-selector d-flex'), $('.dataTables_filter').eq(1).addClass('d-none d-xl-flex'), $('.dataTables_filter').eq(0).addClass('d-xl-none'), $('.dataTables_length select').attr("data-style", "btn-primary"), $('.the-inbox .dataTables__top').addClass('pr-15px pl-15px d-flex align-items-center w-100'), $('.dataTables_filter input').addClass('emailSearch w-100'), $('#emailDataTable-btns_filter').addClass('mb-3 d-xl-none'), $('.the-inbox .buttons-copy').prepend('<span class="bx bx-copy font-size-16 align-middle me-2"></span>').children('span').eq(1).addClass('d-none d-xxl-inline'), $('.the-inbox .buttons-pdf').addClass('d-none'), $('.the-inbox .buttons-csv').addClass('d-none'), $('.the-inbox .buttons-excel').addClass('d-none'), $('.the-inbox .buttons-print').prepend('<span class="bx bx-printer font-size-16 align-middle me-2"></span>'), $('#emailDataTable-btns_wrapper .dt-buttons').prepend(`<div class="dropdown m-0 d-flex">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <a href="#" class="btn btn-secondary dropdown-toggle boarder-right-0 d-flex" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <i class="bx bxs-download font-size-16 align-middle me-2"></i> <span class="d-none d-xxl-inline">Download</span><i class="mdi mdi-chevron-down"></i>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </a>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <div class="dropdown-menu" style="">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <a class="dropdown-item" data-table-action="pdf" href="#">Download as PDF</a>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <a class="dropdown-item buttons-html5" data-table-action="excel" aria-controls="emailDataTable-btns" tabindex="0"  href="#">Download as Excel File</a>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <a class="dropdown-item" data-table-action="csv" href="#">Download as CSV file</a>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>`), $('.the-inbox .buttons-print').children('span').eq(1).addClass('d-none d-xxl-inline'), $('.the-inbox .buttons-colvis').prepend('<span class="mdi mdi-eye-check-outline font-size-16 align-middle me-2"></span>').children('span').eq(1).addClass('d-none d-xxl-inline');

    $("body").on("click", "[data-table-action]", function(a) {
        // alert("clicked")
        a.preventDefault();
        var b = $(this).data("table-action");
        if ("excel" === b && $(this).closest(".dataTables_wrapper").find(".buttons-excel").trigger("click"), "csv" === b && $(this).closest(".dataTables_wrapper").find(".buttons-csv").trigger("click"), "pdf" === b && $(this).closest(".dataTables_wrapper").find(".buttons-pdf ").trigger("click"), "print" === b && $(this).closest(".dataTables_wrapper").find(".buttons-print").trigger("click"), "fullscreenData" === b) {
            var c = $(this).parent().parent().parent().parent().parent().parent().parent()
            c.hasClass("card--fullscreen") ? (c.removeClass("card--fullscreen"), $("body").removeClass("data-table-toggled")) : (c.addClass("card--fullscreen"), $("body").addClass("data-table-toggled"))
        }
    })

    $('#emailDataTable-btns').on('draw.dt', function() {
        // alert('Table redrawn');
    });

    var theUnitTable
    theTable = $("#unit-datatable").DataTable(), $("#unit-datatable-buttons").DataTable({
        lengthChange: !1,
        buttons: ["copy", "print", "excel", "csv", "pdf"],
        language: {
            searchPlaceholder: "Search through Records ...",
            search: "",
            lengthMenu: ` <select name='length_change' class="form-control selectpicker table-rows-selector show-tick" data-style="btn-primary" id='length_change' title="Select A range">
                            <option value='15'>15 Rows</option>
                            <option value='50' selected="true">50 Rows</option>
                            <option value='100'>100 Rows</option>
                            <option value='150'>150 Rows</option>
                            <option value='200'>200 Rows</option>
                            <option value='-1'>All Rows</option>
                        </select>`

        },
        "pageLength": -1,
        lengthChange: -1,
        sDom: 'f<"dataTables__top"lfB>rt<"dataTables__bottom"ip><"clear">',

        //this functon is fired once the datatable is drawn 
        "fnDrawCallback": function(oSettings) {
            var isEmpty = $('.dataTable tr td').hasClass('dataTables_empty');
            if (isEmpty == true) {
                $('.dataTable tbody tr td').text("");
                $('.dataTable tr').removeClass('odd');
                $('.dataTable tbody tr td').append(`  <div class="row justify-content-center mt-5 w-100">
                                                        <div class="col-sm-4 col-md-6 p-4 mb-0">
                                                            <img src="assets/images/empty.svg" alt=" " class="img-fluid mx-auto d-block">
                                                        </div>
                                                        <div class="col-12 text-center mb-3">
                                                            <h2 class="mt-3 text-capitalize">No data available in table</h2>
                                                            <p class="text-muted"><strong>Sorry!!!</strong>, we are afraid there are no results to be displayed for that search. Try something else</p>
                                                        </div>
                                                    </div>`);

            }
        }
    }).buttons().container().appendTo("#unit-datatable-buttons_wrapper .col-md-6:eq(0)"), $('#unit-datatable-buttons_wrapper .dt-buttons').append('<button type="button" class="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#dt__filter" aria-controls="offcanvasRight"><i class="mdi mdi-filter-variant font-size-16 align-middle me-2"></i><span class="d-none d-xxl-inline">Filter</span></button>'), $('#unit-datatable-buttons_wrapper .dataTables_length > label').addClass(''), $('.dataTables_length select btn-sm').addClass('form-control selectpicker show-tick table-rows-selector d-flex'), $('.dataTables_filter').eq(1).addClass('d-none d-xl-flex'), $('.dataTables_filter').eq(0).addClass('d-xl-none'), $('.dataTables_length select').attr("data-style", "btn-primary"), $('.dataTables__top').addClass('pr-0 pl-0 d-flex align-items-center w-100'), $('.dataTables_filter input').addClass('emailSearch w-100'), $('#unit-datatable-buttons_filter').addClass('mb-3 d-xl-none'), $('#unit-datatable-buttons_wrapper .buttons-copy').prepend('<span class="bx bx-copy font-size-16 align-middle me-2"></span>').children('span').eq(1).addClass('d-none d-xxl-inline'), $('.buttons-pdf').addClass('d-none'), $('.buttons-csv').addClass('d-none'), $('.buttons-excel').addClass('d-none'), $('#unit-datatable-buttons_wrapper .buttons-print').prepend('<span class="bx bx-printer font-size-16 align-middle me-2"></span>'), $('#unit-datatable-buttons_wrapper .dt-buttons').prepend(`<div class="dropdown m-0 d-flex">
    <a href="#" class="btn btn-secondary dropdown-toggle boarder-right-0 d-flex" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="bx bxs-download font-size-16 align-middle me-2"></i> <span class="d-none d-xxl-inline">Download</span><i class="mdi mdi-chevron-down"></i>
    </a>

    <div class="dropdown-menu" style="">
        <a class="dropdown-item" data-table-action="pdf" href="#">Download as PDF</a>
        <a class="dropdown-item buttons-html5" data-table-action="excel" aria-controls="unit-datatable-buttons" tabindex="0"  href="#">Download as Excel File</a>
        <a class="dropdown-item" data-table-action="csv" href="#">Download as CSV file</a>
    </div>
</div>`), $('.buttons-print').children('span').eq(1).addClass('d-none d-xxl-inline'), $('#unit-datatable-buttons_wrapper .buttons-colvis').prepend('<span class="mdi mdi-eye-check-outline font-size-16 align-middle me-2"></span>').children('span').eq(1).addClass('d-none d-xxl-inline');






    $('#inputSearch').keyup(function() {

        emailTable.search($(this).val()).draw();

        emailTable.destroy();
        alert("Table destroyed");

    });

    function filterColumn(i) {
        $('#tableResponse').DataTable().column(i).search(
            $('#colNameSearch_filter').val()
        ).draw();
    }

    $('#length_change').change(function() {
        emailTable.page.len($(this).val()).draw();
    });

    $('body').on('keyup', '#inputSearch', function() {
        var theNewVal = $(this).val()
        $('#emailDataTable-btns_filter input').val(theNewVal)
    });
    $('body').on('keyup', '#emailDataTable-btns_filter input', function() {
        var theNewVal = $(this).val()
        $('#inputSearch').val(theNewVal)
    });
    $('.dt-buttons').removeClass('flex-wrap');
    $('#datatable-buttons_wrapper .dt-buttons');

});