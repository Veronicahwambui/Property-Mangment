$(window).on('load', function() {
    setTimeout(function() {
        $("#subscribeModal").modal("show")
    }, 0);

    $('body').on('click', '.upload-the-contacts', function() {
        $('.selected-contacts-message').removeClass('d-none')

    })
    $('body').on('click', '.write-msg-btn', function() {
        $('.email-overlay').removeClass('d-none')
        setTimeout(function() {
            $('.the-message-maker').addClass('email-overlay-transform');
        }, 0)

    });
    $('body').on('click', '.close-message-maker', function() {
        $('.the-message-maker').removeClass('email-overlay-transform')
        setTimeout(function() {
            $('.email-overlay').addClass('d-none');
        }, 200);

    });

    $('body').on('click', '.minimize', function() {
        $(this).parent().parent().parent().parent().siblings().toggleClass('d-none');
    });
    $("body").on('change', '.contacts-table tbody input', function() {
        var theTable = $(this).parent().parent().parent().parent().parent();
        if ($(this).is(':checked')) {
            $('.delete-tool-bar').removeClass('d-none').prev().addClass('d-none');

            $(theTable).children('tr').each(function(index) {
                //console.log(index + ": " + $(this).text());
                var theColumn = $(this).children('td').eq(0).find('input');
                if (theColumn.is(':checked')) {
                    // alert('checked');
                    $('#selectAll').prop('checked', true);
                } else {
                    $('#selectAll').prop('checked', false);
                    return false
                }
            });
        } else {
            $('#selectAll').prop('checked', false);
        }
    })
    $('body').on('change', '#selectAll', function() {
        var theTable = $(this).parent().parent().parent().parent().siblings('tbody');

        if ($(this).is(':checked')) {
            $('.delete-tool-bar').removeClass('d-none').prev().addClass('d-none')
            $(theTable).children('tr').each(function(index) {
                //console.log(index + ": " + $(this).text());
                var theColumn = $(this).children('td').eq(0).find('input');
                theColumn.prop('checked', true)
            });

        } else {
            $('.delete-tool-bar').addClass('d-none').prev().removeClass('d-none');
            $(theTable).children('tr').each(function(index) {
                //console.log(index + ": " + $(this).text());
                var theColumn = $(this).children('td').eq(0).find('input');
                theColumn.prop('checked', false);
            });
        }
    })
    $("body").on('change', '[name="letting-nature"]', function() {
        var theVal = $(this).val();
        if (theVal != 1) {
            // alert('checked');
            $('.per-commision').removeClass('d-none')
        }
        if (theVal == 2) {
            $('.per-commision').addClass('d-none')
        }

    });

    $("body").on('change', '[name="roomamte"]', function() {
        var theVal = $(this).val();
        if (theVal == "yes") {
            // alert('checked');
            $('.has-roomate').slideDown().removeClass('d-none');
        } else {
            $('.has-roomate').slideUp().addClass('d-none');
        }

    });

    showDayInput();
    chargeNatureInput()

    function showDayInput() {
        var theVal = $('[name="invoice-period"]').val();
        if (theVal != 'random-day') {
            // alert('checked');
            $('.invoicing-day').removeClass('d-none')
        } else {
            $('.invoicing-day').addClass('d-none')
        }
    }

    function chargeNatureInput() {
        var theVal1 = $('[name="fee-nature"]').val();
        //alert(theVal1)
        if (theVal1 != 'random-fee') {
            // alert('checked');
            $('.charge-determiner').slideDown();
        } else {
            $('.charge-determiner').slideUp();
        }


    }
    $('body').on('change', '[name="check-constant"]', function() {
        var theVal = $(this).val();
        if (theVal == "constant-yes") {
            $('.amount-entries').slideDown();

        } else {
            $('.amount-entries').slideUp();
        }
    })

    $("body").on('change', '[name="fee-nature"]', function() {
        var theVal1 = $(this).val();
        if (theVal1 != 'random-fee') {
            $('.charge-determiner').slideDown();
        } else {
            $('.charge-determiner').slideUp();

        }

        if (theVal1 == "per-on-rent") {
            $('.percentage-fee-input').slideDown().siblings().slideUp();
        }
        if (theVal1 == "multiple-on-rent") {
            $('.multiplier-fee-input').slideDown().siblings().slideUp();
        }
        if (theVal1 == "fixed-amount") {
            $('.fixed-fee-input').slideDown().siblings().slideUp();
        }

        if (theVal1 == "fixed-amount") {
            $('.constant-checker').slideUp();
            $('[name="check-constant"]').val('constant-yes');
        } else {
            $('.constant-checker').slideDown();
        }
    });

    $('body').on('change', '#tenant-type', function() {
        var theVal = $(this).val();
        if (theVal == "individual") {
            $('.tenant-indidual-type').removeClass('d-none').siblings('.tenant-company-type').addClass('d-none')

        } else {
            $('.tenant-company-type').removeClass('d-none').siblings('.tenant-indidual-type').addClass('d-none')
        }
    })

    $("body").on('change', '[name="invoice-period"]', function() {
        var theVal = $(this).val();
        if (theVal != 'random-day') {
            // alert('checked');
            $('.invoicing-day').slideDown();
        } else {
            $('.invoicing-day').slideUp()
        }

    })

    $('body').on('click', '.clone-fileds', function() {

        $('.selectpicker').each(function(index) {
            $(this).selectpicker('destroy');

        });
        var theParent = $(this).parent().parent().siblings('.clone-cont');
        var cloneMe = theParent.children('.clone-me').eq(0);
        cloneMe.clone().appendTo(theParent)

        $('select.form-control').each(function(index) {
            $(this).selectpicker('render').addClass('selectpicker');

        });
    })

    // calculating rent totals
    $('.rent-invoicing td input').on('keyup', function() {
        // alert("changed");
        var monthlyFee = 0;
        var depositFee = 0;
        var theval = $(this).val();
        var theIndex = $(this).parent('td').index();
        var theBody = $(this).parent().parent().parent();
        // alert(theIndex);

        $(theBody).children('tr').each(function(index) {
            var invoiceItemName = $(this).children('td').eq(theIndex).attr('invoice-item-name');
            var isMonthlyItem = $(this).children('td').eq(theIndex).attr('invoice-permonth');
            var isDepositItem = $(this).children('td').eq(theIndex).attr('deposit-amount');
            var theCell = $(this).children('td').eq(theIndex);
            var theAdditionalVal;

            if (theCell.find('input').length) {
                theAdditionalVal = parseFloat(theCell.children('input').val())
            } else {
                theCell.attr('the-val')
                theAdditionalVal = parseFloat(theCell.attr('the-val'))
                console.log(theAdditionalVal);
                if (theCell.attr('per-of')) {
                    // alert("yes it is a percentage")
                    var percentageOff = theCell.attr('per-of');
                    var theOutput;
                    var thePer = theAdditionalVal

                    $(theBody).children('tr').each(function(index) {
                        var theInputName = $(this).children('td').eq(theIndex).attr('invoice-item-name');
                        var thePricipleVal;
                        if ($(this).children('td').eq(theIndex).find('input').length) {
                            thePricipleVal = parseFloat($(this).children('td').eq(theIndex).children('input').val())
                        } else {
                            thePricipleVal = parseFloat($(this).children('td').eq(theIndex).attr('the-val'))
                        }
                        if (theInputName == percentageOff) {
                            // alert("we found a match");
                            theOutput = (thePer / 100) * thePricipleVal;
                            console.log("the tax percentage was " + thePer + "% The Principle value was " + thePricipleVal + " The calculated intrest was " + theOutput);
                            // alert(theOutput)
                            theAdditionalVal = theOutput;

                        }

                    });
                    $(this).children('td').eq(theIndex).text("KES " + numeral(theAdditionalVal).format('0,0') + " (" + thePer + "%)")
                }
            }

            if (isMonthlyItem == "true") {
                monthlyFee = theAdditionalVal + parseFloat(monthlyFee);
            }
            if (isDepositItem == "true") {
                depositFee = theAdditionalVal + parseFloat(depositFee);
            }

            function findingPerVal(thePerVal) {
                var percentageOff = theCell.attr('per-of');
                var theOutput;
                var thePer = thePerVal

                $(theBody).children('tr').each(function(index) {
                    var theInputName = $(this).children('td').eq(theIndex).attr('invoice-item-name');
                    var thePricipleVal;
                    if ($(this).children('td').eq(theIndex).find('input').length) {
                        thePricipleVal = parseFloat($(this).children('td').eq(theIndex).children('input').val())
                    } else {
                        thePricipleVal = parseFloat($(this).children('td').eq(theIndex).attr('the-val'))
                    }
                    if (theInputName == percentageOff) {
                        // alert("we found a match");
                        theOutput = (thePer / 100) * thePricipleVal;
                        console.log("the tax percentage was " + thePer + "% The Principle value was " + thePricipleVal + " The calculated intrest was " + theOutput);

                    } else {
                        theOutput = thePricipleVal
                    }
                    return theOutput;

                });
            }

        });
        $('.rent-invoicing tfoot').children('tr.deposit-fee').children('th').eq(theIndex).text("KES " + numeral(depositFee).format('0,0'));
        $('.rent-invoicing tfoot').children('tr.monthly-fee').children('th').eq(theIndex).text("KES " + numeral(monthlyFee).format('0,0'));

        console.log(depositFee)
            // alert(monthlyFee);


    });
    $('.create-property').on('click', 'a', function() {

        if ($(this).attr("href") == "#finish") {
            $("#createdModal").modal("show");
            setTimeout(function() {
                $('.loading-cont').addClass('d-none').siblings('.modal-body').removeClass('d-none')
            }, 4000);
        }


    });
    $('body').on('click', '.stay-on-page', function() {


        window.location.reload();
    });
    $('.payment-metho').on('change', function() {
        var theMethod = $(this).val();
        alert(theMethod);
        if (theMethod == "MPESA") {
            $('.phone-num').removeClass('d-none');

        } else {
            $('.phone-num').addClass('d-none');
        }
    });
    $('.payment-method').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
        if (clickedIndex == 1) {
            $('.phone-num').removeClass('d-none');

        } else {
            $('.phone-num').addClass('d-none');
        }
    });

    $('#agreement-type').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
        var theVal = $(this).val();
        // alert(theVal);
        if (theVal == "Unit Letting") {
            $('.unit-letting-option').removeClass('d-none');
            //alert("it is unt letting")

        } else {
            $('.unit-letting-option').addClass('d-none')
        }
    });

    $('.premises-name-select').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue, dataContent) {
        var theVal = e.target.value;
        //alert(theVal)
        $('.prem-name').text(theVal)

    })


    $('.house-num').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue, dataContent) {
        var theVal = e.target.value;
        var dataTypeAttribute = $('option:selected', this).attr("data-content");
        console.log(dataTypeAttribute);

        var url = '/Controller/Action?id=11112&value=4444';
        //alert(dataTypeAttribute.split('</span>')[1]);
        dataTypeAttribute = dataTypeAttribute.split("tenant d-none'>")[1];
        dataTypeAttribute = dataTypeAttribute.split("</span>")[0];
        $('.the-tenant-is').text(dataTypeAttribute).parent().removeClass('d-none')
        $('.hse-num').text(theVal)

    })

    $('.occupation-type').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
        var theVal = $(this).val();


        if (theVal == "employed") {
            $('.employed').removeClass('d-none')
            $('.employed').slideDown().siblings().slideUp();
            //alert("we are here")

        }
        if (theVal == "student") {
            $('.parents').removeClass('d-none').slideDown().siblings().slideUp()

        }
        if (theVal == "self employed") {
            $('.self-employed').removeClass('d-none').slideDown().siblings().slideUp()

        }
        if (theVal == "pension") {
            $('.self-employed').slideUp().siblings().slideUp()

        }
        if (theVal == "unemployed") {
            $('.self-employed').slideUp().siblings().slideUp()

        }
    });

    $('.water-servicing').on('change', function(e) {
        var theVal = $(this).val();
        // alert(theVal);
        if (theVal == "3") {
            $('.rate-perunit-water').removeClass('d-none');
            //alert("it is unt letting")
            $('.rate-per-unit').attr("focus", true)

        } else {
            $('.rate-perunit-water').addClass('d-none')
        }
    });

    $('#landlord-type').on('change', function() {
        var theSeledtedValue = $(this).val();
        if (theSeledtedValue == "company") {
            $('.individual-landlord').removeClass('d-none').next().addClass('d-none');

        } else {
            $('.individual-landlord').addClass('d-none').next().removeClass('d-none');

        }
    });

    $('.invoice-table').on('keyup', 'input', function() {
        var theAdditionalValue;
        var total = 0;
        var theTable = $(this).parent().parent().parent().parent();
        console.log(theTable)
        $(theTable).children('tbody').find('input').each(function(index) {

            var theVal = $(this).val();
            if ($(this).val() == "") {
                theVal = 0;
            }
            total = parseFloat(theVal) + parseFloat(total);
            console.log(total);
            //alert("hhghj")
        });

        var remainingBal = $('.the-balance').text();
        remainingBal = parseFloat(remainingBal.replace(/[^0-9]/g, ''));
        remainingBal = remainingBal - total;
        $('.the-balance').text("KES " + numeral(remainingBal).format('0,0'));



        $('.invoiceTotalPay').val("KES " + numeral(total).format('0,0'))
        $('.text-total').text("KES " + numeral(total).format('0,0'));

    });

    $("body").on('change', '[name="debit-this"]', function() {
        var theVal = $(this).val();
        if (theVal == "yes") {
            // alert('checked');
            $('.debit-tenant-list').removeClass('d-none');
            $('.debit-tenant-button').removeClass('d-none').siblings().addClass('d-none');
        } else {
            $('.debit-tenant-list').addClass('d-none')
            $('.debit-tenant-button').addClass('d-none').siblings().removeClass('d-none');
        }

    });

    $("body").on('change', '[name="credit-for"]', function() {
        var theVal = $(this).val();
        if (theVal == "tenant") {
            // alert('checked');
            $('.landlord-credit-colection').removeClass('d-none').siblings('.credit-options').addClass('d-none');
        }
        if (theVal == "invoice") {
            $('.invoice-credit-colection').removeClass('d-none').siblings('.credit-options').addClass('d-none');
            $('#debit-no').prop("checked", true);
            $('.debit-tenant-list').addClass('d-none')
            $('.debit-tenant-button').addClass('d-none').siblings().removeClass('d-none');

        }
    });

    // creating invoices
    $("body").on('change', '[name="invoice-for"]', function() {
        var theVal = $(this).val();
        if (theVal == "tenant") {
            // alert('checked');
            $('.tenant-invoice-container').removeClass('d-none').siblings('.invoice-options').addClass('d-none');
        }
        if (theVal == "other") {
            $('.others-invoice-container').removeClass('d-none').siblings('.invoice-options').addClass('d-none');
        }
    });


    $('body').on('keyup', '.credit-amount', function() {
        var theAmount = $(this).val();
        theAmount = parseFloat(theAmount);
        $('.debited-amount').text("KES " + numeral(theAmount).format('0,0'));

        var remainingBal = $('.the-total').text();
        remainingBal = remainingBal.replace(/[^0-9]/g, '');
        remainingBal = parseFloat(remainingBal);
        var NewBal = remainingBal - theAmount;
        $('.the-debit-balance').text("KES " + numeral(NewBal).format('0,0'));



    });

    // closing the creditnote details modal
    $('.submit-credit-details').on('click', function() {
        $('.debit-tenant-modal').modal('hide');
        setTimeout(function() {
            $("#creditNoteModalLoad").modal("show")
        }, 100);

        setTimeout(function() {
            $('#creditNoteModalLoad .loading-cont').addClass('d-none')
            $('#creditNoteModalLoad .loading-cont').next().removeClass('d-none')
                //$("#creditNoteModalLoad").modal("show")
        }, 2000);
    })




    function find_max(nums) {

        let max_num = Number.NEGATIVE_INFINITY; // smaller than all other numbers

        for (let num of nums) {

            if (num > max_num) {
                // (Fill in the missing line here)

            }

        }

        return max_num;

    }


});

$(document).ready(function() {

    $('.invoice-btn').on('click', function() {
        var tenantemail
        var tenantPhone

        var selectedOption = $('[name="invoice-for').val();
        var tenantName;
        if (selectedOption == "tenant") {
            tenantName = $('.tenant-name-option').selectpicker('val');
            tenantemail = "email@email.com";
            tenantPhone = "0701234567";

        } else {
            tenantName = $('.entered-name').val();
            tenantemail = $('.tenant-email').val();
            tenantPhone = $('.tenant-phone').val();
        }


        var invoiceItem = $('.invoice-title-val').selectpicker('val');
        var tenantDescription = $('.tenant-description').val();
        var invoiceDate = $('.invoice-date').val();
        var invoiceAmt = $('.invoice-amount').val();


        $('.the-debit-balance').text("KES " + numeral(invoiceAmt).format('0,0'));
        $('.tenant-name').text(tenantName);
        $('.the-email').text(tenantemail);
        $('.the-phone').text(tenantPhone);
        $('.invoice-item').text(invoiceItem);
        $('.the-inv-description').text(tenantDescription);
        $('.invoice-item-price').text(invoiceAmt);
    })
    $('.selectpicker').selectpicker();
    $('.selectpicker').selectpicker('render');

    $('#send-msg-land').on('click', function() {

        $('#send-modal').modal('hide');

        setTimeout(function() {
            $('#liveToast').show();
        }, 1000);

        setTimeout(function() {
            location.reload();
        }, 5000);

    });

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date();
    let name = month[d.getMonth()];

    const mwaka = new Date();
    let huuMwaka = mwaka.getFullYear()

    $(".this-month").text(name + " " + huuMwaka);
});