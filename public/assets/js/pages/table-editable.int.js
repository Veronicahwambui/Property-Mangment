$(function() {
    // editing existing fields
    var e = {};
    $(".table-edits tr").editable({
            dropdowns: {
                gender: ["Male", "Female"],
                unit_purpose: ["Commercial", "Residential"],
                unit_type: ["Bed sitter", "One Bedroom", "Two Bedroom"],
            },

            keyboard: true,
            dblclick: false,
            button: true,
            maintainWidth: true,
            buttonSelector: ".edit,.save-tbl-btn, .cancel-changes",


            edit: function(t) {

                $(".edit i", this).removeClass("bx-edit-alt").addClass("bx-save").attr("title", "Save").parent().siblings().removeClass('d-none');
                $('.edit').addClass('d-none');
                $('.new-tenant').addClass('d-none');

            },
            save: function(t) {
                $(".edit i", this).removeClass("bx-save").addClass("bx-edit-alt").attr("title", "Edit"), this in e && (e[this].destroy(), delete e[this]);
                $(".save-tbl-btn", this).addClass("d-none").siblings('.cancel-changes').addClass('d-none'), this in e && (e[this].destroy(), delete e[this]);
                $('.edit').removeClass('d-none');
                $('.new-tenant').removeClass('d-none');

            },
            cancel: function(t) {
                $(".edit i", this).removeClass("bx-save").addClass("bx-edit-alt").attr("title", "Edit"), this in e && (e[this].destroy(), delete e[this]);
                $(".cancel-changes", this).addClass('d-none').siblings('.save-tbl-btn').addClass('d-none'), this in e && (e[this].destroy(), delete e[this]);
                $('.edit').removeClass('d-none');
                $('.new-tenant').removeClass('d-none');


            }
        })
        //fields with dates
    $('body').on('click', '.add-field-date', function() {
        //alert("field clicked")
        // $(this).addClass('d-none');
        var the_parent = $(this).parent().parent().parent();
        console.log(the_parent);
        $('.selectpicker').each(function(index) {
            $(this).selectpicker('destroy');

        });

        // $(this).slideToggle();
        //var currentIndex = $('.table-editable tbody tr').last().index();
        var currentIndex = the_parent.children('tbody').children('tr').last().index()
        var cloneItem = the_parent.find('.cloneCharges');
        // alert(currentIndex);

        //this area clones the new input fields
        $(cloneItem).eq(0).clone(true).appendTo('.table-editable-date tbody').removeClass('d-none');
        //$('.table-editable tbody tr').last().children('.categoryIndex').text(currentIndex + 1);
        the_parent.children('tbody').children('tr').last().children('.categoryIndex').text(currentIndex + 1);
        var newID = currentIndex + 1;
        the_parent.children('tbody').children('tr').last().find('.the-document').attr("id", "document" + newID).siblings('label').attr("for", "document" + newID);
        // $(cloneItem).eq(clickedIndex).removeClass('d-none');
        $('select.form-control').each(function(index) {
            $(this).selectpicker('render').addClass('selectpicker');

        });
    });

    // creating new fields

    $('body').on('click', '.add-field-2', function() {
        //alert("field clicked")
        // $(this).addClass('d-none');
        var the_parent = $(this).parent().parent().parent();
        console.log(the_parent);
        $('.selectpicker').each(function(index) {
            $(this).selectpicker('destroy');

        });

        // $(this).slideToggle();
        //var currentIndex = $('.table-editable tbody tr').last().index();
        var currentIndex = the_parent.children('tbody').children('tr').last().index()
        var cloneItem = the_parent.find('.cloneCharges');
        // alert(currentIndex);

        //this area clones the new input fields
        $(cloneItem).eq(0).clone(true).appendTo('.table-editable-2 tbody').removeClass('d-none');
        //$('.table-editable tbody tr').last().children('.categoryIndex').text(currentIndex + 1);
        the_parent.children('tbody').children('tr').last().children('.categoryIndex').text(currentIndex + 1);
        var newID = currentIndex + 1;
        the_parent.children('tbody').children('tr').last().find('.the-document').attr("id", "document" + newID).siblings('label').attr("for", "document" + newID);
        // $(cloneItem).eq(clickedIndex).removeClass('d-none');
        $('select.form-control').each(function(index) {
            $(this).selectpicker('render').addClass('selectpicker');

        });
    });

    // cloaning with file
    $('body').on('click', '.add-field-file', function() {
        //alert("field clicked")
        // $(this).addClass('d-none');
        var the_parent = $(this).parent().parent().parent();
        console.log(the_parent);
        $('.selectpicker').each(function(index) {
            $(this).selectpicker('destroy');

        });

        // $(this).slideToggle();
        //var currentIndex = $('.table-editable tbody tr').last().index();
        var currentIndex = the_parent.children('tbody').children('tr').last().index()
        var cloneItem = the_parent.find('.cloneCharges');
        // alert(currentIndex);

        //this area clones the new input fields
        $(cloneItem).eq(0).clone(true).appendTo('.table-editable-file tbody').removeClass('d-none');
        //$('.table-editable tbody tr').last().children('.categoryIndex').text(currentIndex + 1);
        the_parent.children('tbody').children('tr').last().children('.categoryIndex').text(currentIndex + 1);
        var newID = currentIndex + 1;
        the_parent.children('tbody').children('tr').last().find('.the-document').attr("id", "document" + newID).siblings('label').attr("for", "document" + newID);
        // $(cloneItem).eq(clickedIndex).removeClass('d-none');
        $('select.form-control').each(function(index) {
            $(this).selectpicker('render').addClass('selectpicker');

        });
    });
    $('body').on('click', '.add-field-1', function() {
        //alert("field clicked")
        // $(this).addClass('d-none');
        var the_parent = $(this).parent().parent().parent();
        console.log(the_parent);
        $('.selectpicker').each(function(index) {
            $(this).selectpicker('destroy');

        });

        // $(this).slideToggle();
        //var currentIndex = $('.table-editable tbody tr').last().index();
        var currentIndex = the_parent.children('tbody').children('tr').last().index()
        var cloneItem = the_parent.find('.cloneCharges');
        // alert(currentIndex);

        //this area clones the new input fields
        $(cloneItem).eq(0).clone(true).appendTo('.table-editable-1 tbody').removeClass('d-none');
        //$('.table-editable tbody tr').last().children('.categoryIndex').text(currentIndex + 1);
        the_parent.children('tbody').children('tr').last().children('.categoryIndex').text(currentIndex + 1);
        // $(cloneItem).eq(clickedIndex).removeClass('d-none');
        $('select.form-control').each(function(index) {
            $(this).selectpicker('render').addClass('selectpicker');

        });
    });

    //cloaning three
    $('body').on('click', '.add-field-3', function() {
        //alert("field clicked")
        // $(this).addClass('d-none');
        var the_parent = $(this).parent().parent().parent();
        console.log(the_parent);
        $('.selectpicker').each(function(index) {
            $(this).selectpicker('destroy');

        });

        // $(this).slideToggle();
        //var currentIndex = $('.table-editable tbody tr').last().index();
        var currentIndex = the_parent.children('tbody').children('tr').last().index()
        var cloneItem = the_parent.find('.cloneCharges');
        // alert(currentIndex);

        //this area clones the new input fields
        $(cloneItem).eq(0).clone(true).appendTo('.table-editable-3 tbody').removeClass('d-none');
        //$('.table-editable tbody tr').last().children('.categoryIndex').text(currentIndex + 1);
        the_parent.children('tbody').children('tr').last().children('.categoryIndex').text(currentIndex + 1);
        var newID = currentIndex + 1;
        the_parent.children('tbody').children('tr').last().find('.the-document').attr("id", "document" + newID).siblings('label').attr("for", "document" + newID);
        // $(cloneItem).eq(clickedIndex).removeClass('d-none');
        $('select.form-control').each(function(index) {
            $(this).selectpicker('render').addClass('selectpicker');

        });
    });

    // the trialcloaning
    $('body').on('click', '.add-field', function() {
        //alert("field clicked")
        // $(this).addClass('d-none');
        var the_parent = $(this).parent().parent().parent();
        console.log(the_parent);
        $('.selectpicker').each(function(index) {
            $(this).selectpicker('destroy');

        });

        $(this).slideToggle();
        //var currentIndex = $('.table-editable tbody tr').last().index();
        var currentIndex = the_parent.children('tbody').children('tr').last().index()
        var cloneItem = the_parent.find('.cloneCharges');
        //alert(currentIndex);

        //this area clones the new input fields
        $(cloneItem).eq(0).clone(true).appendTo('.table-editable tbody').removeClass('d-none');
        //$('.table-editable tbody tr').last().children('.categoryIndex').text(currentIndex + 1);
        the_parent.children('tbody').children('tr').last().children('.categoryIndex').text(currentIndex + 1);
        // $(cloneItem).eq(clickedIndex).removeClass('d-none');
        $('select.form-control').each(function(index) {
            $(this).selectpicker('render').addClass('selectpicker');

        });
    });

    $('body').on('click', '.cancel-new-category', function() {
        $(this).parent().parent().remove();
        $('.table-editable .add-field').slideToggle()
    });

    $('body').on('click', '.cancel-new-category-2', function() {
        $(this).parent().parent().remove();
        //$('.table-editable .add-field').slideToggle()
    });
    $('body').on('click', '.cancel-new-category-1', function() {
        $(this).parent().parent().remove();
        //$('.table-editable .add-field').slideToggle()
    });
    $('body').on('click', '.cancel-new-category-3', function() {
        $(this).parent().parent().remove();
        //$('.table-editable .add-field').slideToggle()
    });

    $('body').on('click', '.cancel-new-category-file', function() {
        $(this).parent().parent().remove();
        //$('.table-editable .add-field').slideToggle()
    });

    $('body').on('click', '.cancel-new-category-date', function() {
        $(this).parent().parent().remove();
        //$('.table-editable .add-field').slideToggle()
    });



});