var APPS_FLIGHT = {
    init: function () {

        // DEFAULT

        // GET PRICE MONTH LCC
        this.find_flight_by_price_month();
        this.search_next_pre_data_month();
        this.get_airports_date_data_month();
        this.submit_search_data_month();
        // GET PRICE MONTH GDS
        this.index_select_item_price_table_week_gds();
        this.index_submit_search_flight_week_gds();
        this.index_hover_item_price_table_week_gds();
        this.index_choose_search_book_week();

        // page TIM CHUYEN BAY
        this.options_flight();
        this.pop_map_toogle();
        this.ajax_system_filter_item_domestic();
        this.ajax_system_filter_item_internation();
        this.event_next_infomation_flight();

        // CONFIRM BOX
        this.options_confirm();
        this.handing_bag_food_insure_confim();
        // step 0
        //this.toggle_change_form_flight(); -- change for new
        //this.loading_process_flight();

        // 
        this.apps_flight_load_data_when_action_tab_flight();

    },

    websocket_update_order_flight: function (data) {
        var socket = io("https://vnbk.herokuapp.com");
        socket.emit("emit_query_update_order_flight_vnbk", data);
    },
    loading_process_flight: function () {
        "use strict";
        $(document).ready(function () {
            var dem = 0;
            var chk_interval = setInterval(function () {
                dem++;
                if (dem <= 98) {
                    $('.box-progress-loading-flight .progress-bar').css({ 'width': dem + '%' });

                }
                if (dem == 98) { clearInterval(chk_interval); }
            }, 300);

        });
    },
    toggle_change_form_flight: function () {
        "use strict";
        $(document).ready(function () {
            $('.btn-toggle-change-flight').click(function () {
                $('.box-form-flight-toggle').toggle("slow");
                if ($(this).find('i').hasClass("fa-chevron-right")) {
                    $(this).find('i').removeClass('fa-chevron-right');
                    $(this).find('i').addClass('fa-chevron-down');
                }
                else {
                    $(this).find('i').addClass('fa-chevron-right');
                    $(this).find('i').removeClass('fa-chevron-down');
                }

            });
        });
    },

    // CONFIRM BOX
    rad_change_payment_flight: function () {
        "use strict";
        $(document).ready(function () {

            //$(document).on('change','input[name="rad_type_payment"]',function(){
            $('input[name="rad_type_payment"]').change(function () {
                var val_rad = $(this).val();
                if (val_rad == 'payment_office') {
                    $('.box-home').addClass('hidden');
                    $('.box-bank').addClass('hidden');
                    $('.box-office').removeClass('hidden');
                    $('.box-atm-pay-online').addClass('hidden');
                }
                else if (val_rad == 'payment_home') {
                    $('.box-home').removeClass('hidden');
                    $('.box-bank').addClass('hidden');
                    $('.box-office').addClass('hidden');
                    $('.box-atm-pay-online').addClass('hidden');
                }
                else if (val_rad == 'payment_bank') {
                    $('.box-home').addClass('hidden');
                    $('.box-bank').removeClass('hidden');
                    $('.box-office').addClass('hidden');
                    $('.box-atm-pay-online').addClass('hidden');
                }
                else if (val_rad == 'payment_atm_pay_online') {
                    $('.box-home').addClass('hidden');
                    $('.box-bank').addClass('hidden');
                    $('.box-office').addClass('hidden');
                    $('.box-atm-pay-online').removeClass('hidden');
                }
            });
        });
    },
    handing_bag_food_insure_confim: function () {
        "use strict";
        $(document).ready(function () {

            // INSURE
            $(document).on('change', 'input[name="rad_travel_care"]', function () {

                /* 123 pay */
                var type_pay_online = '';
                var val_type_payment = $('.box-change-type-payment input[name="rad_type_payment"]:checked').val();
                if (val_type_payment == 'payment_atm_pay_online') {
                    type_pay_online = $('input[name="rad_item_pay_online"]:checked').val();
                    if (type_pay_online == undefined) { type_pay_online = ''; }
                }
                /* end 123 pay */

                var rad_val = $(this).val();
                var price_format = $(this).attr('data-price-format');
                // get list bag
                var arr_price = new Array();
                $('.slc-list-bag').each(function () {
                    var price = $(this).find('option:selected').attr('data-price');
                    arr_price.push(price);
                });
                var count_length = arr_price.length;
                var str_query_bag = '';
                for (var i = 0; i < count_length; i++) {
                    str_query_bag += arr_price[i] + ',';
                }
                str_query_bag = str_query_bag.replace(/,$/g, '');

                $('table.tlb-total-prices-flights').addClass('loadding');

                var code_voucher = $('.txt-code-voucher').val();

                var chk_food = $('.table.tlb-food input').hasClass('chk-list-food');
                if (chk_food == false) {
                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        cache: false,
                        dataType: 'JSON',
                        data: { action: 'ajax_prices_form_confirm', type_pay_online: type_pay_online, arr_data_bag: str_query_bag, rad_insure: rad_val, code_voucher: code_voucher },
                        success: function (data) {
                            $('.total-fee-insure').text(price_format);
                            $('table.tlb-total-prices-flights').removeClass('loadding');
                            $('table.tlb-total-prices-flights tr td.td-total-prices').html(data.total_format);
                            $('table.tlb-total-prices-flights tr.tr-box-voucher td:last-child').html(data.value_voucher_format);

                            if (type_pay_online != '') {
                                /* onepay */
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online').removeClass('hidden');
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online td:last-child').html(data.total_fee_pay_online_format);
                                $('.box-atm-pay-online .box-fee-trade').removeClass('hidden');
                                $('.box-atm-pay-online .box-fee-trade').html('PhÃ­ tiá»‡n Ã­ch: ' + data.total_fee_pay_online_format);
                                /* end onepay */
                            }

                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            //alert(xhr.status);
                            //alert(thrownError);
                        }
                    });
                } // NOT FOOD
                else {
                    // GET LIST FOOD
                    var arr_price_food = new Array();
                    $('table.tlb-food .chk-list-food:checked').each(function () {
                        var price = $(this).attr('data-price');
                        arr_price_food.push(price);
                    });
                    var count_length = arr_price_food.length;
                    var str_query_food = '';
                    for (var i = 0; i < count_length; i++) {
                        str_query_food += arr_price_food[i] + ',';
                    }
                    str_query_food = str_query_food.replace(/,$/g, '');

                    var code_voucher = $('.txt-code-voucher').val();
                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        cache: false,
                        dataType: 'JSON',
                        data: { action: 'ajax_prices_form_confirm', type_pay_online: type_pay_online, code_voucher: code_voucher, arr_data_bag: str_query_bag, arr_data_food: str_query_food, rad_insure: rad_val },
                        success: function (data) {

                            $('.total-fee-insure').text(price_format);
                            $('table.tlb-total-prices-flights').removeClass('loadding');
                            $('table.tlb-total-prices-flights tr td.td-total-prices').html(data.total_format);
                            $('table.tlb-total-prices-flights tr.tr-box-voucher td:last-child').html(data.value_voucher_format);

                            if (type_pay_online != '') {
                                /* onepay */
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online').removeClass('hidden');
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online td:last-child').html(data.total_fee_pay_online_format);
                                $('.box-atm-pay-online .box-fee-trade').removeClass('hidden');
                                $('.box-atm-pay-online .box-fee-trade').html('PhÃ­ tiá»‡n Ã­ch: ' + data.total_fee_pay_online_format);
                                /* end onepay */
                            }

                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            //alert(xhr.status);
                            //alert(thrownError);
                        }
                    });

                }

            });

            // SELECT OPTION LIST BAG
            // food
            $(document).on('change', 'table.tlb-food .chk-list-food', function () {

                /* 123 pay */
                var type_pay_online = '';
                var val_type_payment = $('.box-change-type-payment input[name="rad_type_payment"]:checked').val();
                if (val_type_payment == 'payment_atm_pay_online') {
                    type_pay_online = $('input[name="rad_item_pay_online"]:checked').val();
                    if (type_pay_online == undefined) { type_pay_online = ''; }
                }
                /* end 123 pay */

                // HANDING SUBMIT
                var data_type = $(this).attr('data-type');
                var data_iti = $(this).attr('data-iti');

                var val_checked = '';
                $('.chk-list-food[data-type="' + data_type + '"][data-iti="' + data_iti + '"]:checked').each(function () {
                    val_checked += $(this).val() + ',';
                });
                $('.txt-list-food-' + data_iti + '-' + data_type).val(val_checked);
                // END HANDING SUBMIT

                // ********
                var rad_val = '';
                var chk_insure = $('input[name="rad_travel_care"]:checked').val();
                if (chk_insure == 'yes') { rad_val = 'yes'; }

                var type_food = $(this).attr('data-type');
                var iti_food = 'return';

                var arr_price_food = new Array();
                $('table.tlb-food .chk-list-food:checked').each(function () {
                    var price = $(this).attr('data-price');
                    arr_price_food.push(price);
                });

                var str_name_food = '';
                var str_price = 0;
                $('table.tlb-food .chk-list-food[data-type="' + type_food + '"]:checked').each(function () {
                    var price = $(this).attr('data-price');
                    str_price = parseFloat(str_price) + parseFloat(price);
                    str_name_food += $(this).parent().text() + ',';
                });
                var chk_usd = str_price + '';
                chk_usd = chk_usd.indexOf(".");
                var number = (chk_usd >= 0) ? 2 : 0;
                str_price = str_price.toFixed(number).replace(/./g, function (c, i, a) {
                    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
                });
                var price_format_food = str_price;

                var count_length = arr_price_food.length;
                var str_query_food = '';
                for (var i = 0; i < count_length; i++) {
                    str_query_food += arr_price_food[i] + ',';
                }
                str_query_food = str_query_food.replace(/,$/g, '');
                str_name_food = str_name_food.replace(/,$/g, '');


                // GET LIST BAG
                var arr_price = new Array();
                $('.slc-list-bag').each(function () {
                    var price = $(this).find('option:selected').attr('data-price');
                    arr_price.push(price);
                });
                var count_length = arr_price.length;
                var str_query_bag = '';
                for (var i = 0; i < count_length; i++) {
                    str_query_bag += arr_price[i] + ',';
                }
                str_query_bag = str_query_bag.replace(/,$/g, '');

                var code_voucher = $('.txt-code-voucher').val();
                $('table.tlb-total-prices-flights').addClass('loadding');
                $.ajax({
                    url: adminurl,
                    type: 'post',
                    cache: false,
                    dataType: 'JSON',
                    data: { action: 'ajax_prices_form_confirm', type_pay_online: type_pay_online, code_voucher: code_voucher, arr_data_food: str_query_food, arr_data_bag: str_query_bag, rad_insure: rad_val },
                    success: function (data) {
                        $('table.tlb-total-prices-flights').removeClass('loadding');
                        $('table.tlb-total-prices-flights tr td.td-total-prices').html(data.total_format);
                        $('table.tlb-total-prices-flights tr.tr-box-voucher td:last-child').html(data.value_voucher_format);

                        $('tr.tr-list-service-customer.type-' + type_food).removeClass('hidden');
                        $('tr.tr-list-service-customer.type-' + type_food + ' table.table.' + iti_food + ' span.name-food').text(str_name_food);
                        $('tr.tr-list-service-customer.type-' + type_food + ' table.table.' + iti_food + ' span.price-food').text(price_format_food);

                        if (type_pay_online != '') {
                            /* onepay */
                            $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online').removeClass('hidden');
                            $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online td:last-child').html(data.total_fee_pay_online_format);
                            $('.box-atm-pay-online .box-fee-trade').removeClass('hidden');
                            $('.box-atm-pay-online .box-fee-trade').html('PhÃ­ tiá»‡n Ã­ch: ' + data.total_fee_pay_online_format);
                            /* end onepay */
                        }


                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        //alert(xhr.status);
                        //alert(thrownError);
                    }
                });

            });

            // bag
            $(document).on('change', '.slc-list-bag', function () {

                /* 123 pay */
                var type_pay_online = '';
                var val_type_payment = $('.box-change-type-payment input[name="rad_type_payment"]:checked').val();
                if (val_type_payment == 'payment_atm_pay_online') {
                    type_pay_online = $('input[name="rad_item_pay_online"]:checked').val();
                    if (type_pay_online == undefined) { type_pay_online = ''; }
                }
                /* end 123 pay */

                var rad_val = '';
                var chk_insure = $('input[name="rad_travel_care"]:checked').val();
                if (chk_insure == 'yes') { rad_val = 'yes'; }

                var type = $(this).attr('data-type');
                var iti = $(this).attr('data-iti');
                var price_format = $(this).find('option:selected').attr('data-price-format');
                var weight = $(this).find('option:selected').attr('data-weight');


                var arr_price = new Array();
                $('.slc-list-bag').each(function () {
                    var price = $(this).find('option:selected').attr('data-price');
                    arr_price.push(price);
                });
                var count_length = arr_price.length;
                var str_query_bag = '';
                for (var i = 0; i < count_length; i++) {
                    str_query_bag += arr_price[i] + ',';
                }
                str_query_bag = str_query_bag.replace(/,$/g, '');
                $('table.tlb-total-prices-flights').addClass('loadding');


                var code_voucher = $('.txt-code-voucher').val();
                var chk_food = $('.table.tlb-food input').hasClass('chk-list-food');
                if (chk_food == false) {
                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        cache: false,
                        dataType: 'JSON',
                        data: { action: 'ajax_prices_form_confirm', type_pay_online: type_pay_online, code_voucher: code_voucher, arr_data_bag: str_query_bag, rad_insure: rad_val },
                        success: function (data) {
                            $('table.tlb-total-prices-flights').removeClass('loadding');
                            $('table.tlb-total-prices-flights tr td.td-total-prices').html(data.total_format);
                            $('table.tlb-total-prices-flights tr.tr-box-voucher td:last-child').html(data.value_voucher_format);

                            $('tr.tr-list-service-customer.type-' + type).removeClass('hidden');
                            $('tr.tr-list-service-customer.type-' + type + ' table.table.' + iti + ' span.weight-bag').text(weight);
                            $('tr.tr-list-service-customer.type-' + type + ' table.table.' + iti + ' span.price-bag').text(price_format);

                            if (type_pay_online != '') {
                                /* onepay */
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online').removeClass('hidden');
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online td:last-child').html(data.total_fee_pay_online_format);
                                $('.box-atm-pay-online .box-fee-trade').removeClass('hidden');
                                $('.box-atm-pay-online .box-fee-trade').html('PhÃ­ tiá»‡n Ã­ch: ' + data.total_fee_pay_online_format);
                                /* end onepay */
                            }

                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            //alert(xhr.status);
                            //alert(thrownError);
                        }
                    });
                } // NOT FOOD
                else {
                    // GET LIST FOOD
                    var arr_price_food = new Array();
                    $('table.tlb-food .chk-list-food:checked').each(function () {
                        var price = $(this).attr('data-price');
                        arr_price_food.push(price);
                    });
                    var count_length = arr_price_food.length;
                    var str_query_food = '';
                    for (var i = 0; i < count_length; i++) {
                        str_query_food += arr_price_food[i] + ',';
                    }
                    str_query_food = str_query_food.replace(/,$/g, '');
                    var code_voucher = $('.txt-code-voucher').val();
                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        cache: false,
                        dataType: 'JSON',
                        data: { action: 'ajax_prices_form_confirm', type_pay_online: type_pay_online, code_voucher: code_voucher, arr_data_bag: str_query_bag, arr_data_food: str_query_food, rad_insure: rad_val },
                        success: function (data) {
                            $('table.tlb-total-prices-flights').removeClass('loadding');
                            $('table.tlb-total-prices-flights tr td.td-total-prices').html(data.total_format);
                            $('table.tlb-total-prices-flights tr.tr-box-voucher td:last-child').html(data.value_voucher_format);

                            $('tr.tr-list-service-customer.type-' + type).removeClass('hidden');
                            $('tr.tr-list-service-customer.type-' + type + ' table.table.' + iti + ' span.weight-bag').text(weight);
                            $('tr.tr-list-service-customer.type-' + type + ' table.table.' + iti + ' span.price-bag').text(price_format);

                            if (type_pay_online != '') {
                                /* onepay */
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online').removeClass('hidden');
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online td:last-child').html(data.total_fee_pay_online_format);
                                $('.box-atm-pay-online .box-fee-trade').removeClass('hidden');
                                $('.box-atm-pay-online .box-fee-trade').html('PhÃ­ tiá»‡n Ã­ch: ' + data.total_fee_pay_online_format);
                                /* end onepay */
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            //alert(xhr.status);
                            //alert(thrownError);
                        }
                    });
                }
            });

            // voucher
            $(document).on('blur', '.txt-code-voucher', function () {

                /* 123 pay */
                var type_pay_online = '';
                var val_type_payment = $('.box-change-type-payment input[name="rad_type_payment"]:checked').val();
                if (val_type_payment == 'payment_atm_pay_online') {
                    type_pay_online = $('input[name="rad_item_pay_online"]:checked').val();
                    if (type_pay_online == undefined) { type_pay_online = ''; }
                }
                /* end 123 pay */


                var code_voucher = $(this).val();
                $('.txt-code-voucher-hidden').val(code_voucher);
                var rad_val = '';
                var chk_insure = $('input[name="rad_travel_care"]:checked').val();
                if (chk_insure == 'yes') { rad_val = 'yes'; }

                var type = $('.slc-list-bag').attr('data-type');
                var iti = $('.slc-list-bag').attr('data-iti');
                var price_format = $('.slc-list-bag').find('option:selected').attr('data-price-format');
                var weight = $('.slc-list-bag').find('option:selected').attr('data-weight');


                var arr_price = new Array();
                $('.slc-list-bag').each(function () {
                    var price = $(this).find('option:selected').attr('data-price');
                    arr_price.push(price);
                });
                var count_length = arr_price.length;
                var str_query_bag = '';
                for (var i = 0; i < count_length; i++) {
                    str_query_bag += arr_price[i] + ',';
                }
                str_query_bag = str_query_bag.replace(/,$/g, '');
                $('table.tlb-total-prices-flights').addClass('loadding');

                var chk_food = $('.table.tlb-food input').hasClass('chk-list-food');
                if (chk_food == false) {
                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        cache: false,
                        dataType: 'JSON',
                        data: { action: 'ajax_prices_form_confirm', type_pay_online: type_pay_online, code_voucher: code_voucher, arr_data_bag: str_query_bag, rad_insure: rad_val },
                        success: function (data) {


                            $('table.tlb-total-prices-flights').removeClass('loadding');
                            $('table.tlb-total-prices-flights tr td.td-total-prices').html(data.total_format);


                            $('table.tlb-total-prices-flights tr.tr-box-voucher td:last-child').html(data.value_voucher_format);
                            if ($.trim(code_voucher) == '') {
                                $('.error-code-voucher').html('');
                            }
                            else {
                                $('.error-code-voucher').html(data.error_code_voucher);
                            }

                            if (type_pay_online != '') {
                                /* onepay */
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online').removeClass('hidden');
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online td:last-child').html(data.total_fee_pay_online_format);
                                $('.box-atm-pay-online .box-fee-trade').removeClass('hidden');
                                $('.box-atm-pay-online .box-fee-trade').html('PhÃ­ tiá»‡n Ã­ch: ' + data.total_fee_pay_online_format);
                                /* end onepay */
                            }

                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            //alert(xhr.status);
                            //alert(thrownError);
                        }
                    });

                } // NOT FOOD
                else {
                    // GET LIST FOOD
                    var arr_price_food = new Array();
                    $('table.tlb-food .chk-list-food:checked').each(function () {
                        var price = $(this).attr('data-price');
                        arr_price_food.push(price);
                    });
                    var count_length = arr_price_food.length;
                    var str_query_food = '';
                    for (var i = 0; i < count_length; i++) {
                        str_query_food += arr_price_food[i] + ',';
                    }
                    str_query_food = str_query_food.replace(/,$/g, '');
                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        cache: false,
                        dataType: 'JSON',
                        data: { action: 'ajax_prices_form_confirm', type_pay_online: type_pay_online, code_voucher: code_voucher, arr_data_bag: str_query_bag, rad_insure: rad_val, arr_data_food: str_query_food },
                        success: function (data) {


                            $('table.tlb-total-prices-flights').removeClass('loadding');
                            $('table.tlb-total-prices-flights tr td.td-total-prices').html(data.total_format);

                            $('table.tlb-total-prices-flights tr.tr-box-voucher td:last-child').html(data.value_voucher_format);

                            if ($.trim(code_voucher) == '') {
                                $('.error-code-voucher').html('');
                            }
                            else {
                                $('.error-code-voucher').html(data.error_code_voucher);
                            }

                            if (type_pay_online != '') {
                                /* onepay */
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online').removeClass('hidden');
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online td:last-child').html(data.total_fee_pay_online_format);
                                $('.box-atm-pay-online .box-fee-trade').removeClass('hidden');
                                $('.box-atm-pay-online .box-fee-trade').html('PhÃ­ tiá»‡n Ã­ch: ' + data.total_fee_pay_online_format);
                                /* end onepay */
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            //alert(xhr.status);
                            //alert(thrownError);
                        }
                    });

                } // YES FOOD


            });

            // fee trade onepay
            $(document).on('change', 'input[name="rad_item_pay_online"]', function () {
                if ($('input[name="rad_item_pay_online"]:checked').is(':checked')) {
                    var type_pay_online = $('input[name="rad_item_pay_online"]:checked').val();
                    var rad_val = '';
                    var chk_insure = $('input[name="rad_travel_care"]:checked').val();
                    if (chk_insure == 'yes') { rad_val = 'yes'; }

                    var type = $('.slc-list-bag').attr('data-type');
                    var iti = $('.slc-list-bag').attr('data-iti');
                    var price_format = $('.slc-list-bag').find('option:selected').attr('data-price-format');
                    var weight = $('.slc-list-bag').find('option:selected').attr('data-weight');


                    var arr_price = new Array();
                    $('.slc-list-bag').each(function () {
                        var price = $(this).find('option:selected').attr('data-price');
                        arr_price.push(price);
                    });
                    var count_length = arr_price.length;
                    var str_query_bag = '';
                    for (var i = 0; i < count_length; i++) {
                        str_query_bag += arr_price[i] + ',';
                    }
                    str_query_bag = str_query_bag.replace(/,$/g, '');
                    $('table.tlb-total-prices-flights').addClass('loadding');

                    var chk_food = $('.table.tlb-food input').hasClass('chk-list-food');
                    var code_voucher = $('.txt-code-voucher').val();
                    if (chk_food == false) {
                        $.ajax({
                            url: adminurl,
                            type: 'post',
                            cache: false,
                            dataType: 'JSON',
                            data: { action: 'ajax_prices_form_confirm', type_pay_online: type_pay_online, code_voucher: code_voucher, arr_data_bag: str_query_bag, rad_insure: rad_val },
                            success: function (data) {
                                $('table.tlb-total-prices-flights').removeClass('loadding');
                                $('table.tlb-total-prices-flights tr td.td-total-prices').html(data.total_format);

                                /* voucher */
                                $('table.tlb-total-prices-flights tr.tr-box-voucher td:last-child').html(data.value_voucher_format);
                                if ($.trim(code_voucher) == '') { $('.error-code-voucher').html(''); }
                                else { $('.error-code-voucher').html(data.error_code_voucher); }
                                /* end voucher */

                                /* onepay */
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online').removeClass('hidden');
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online td:last-child').html(data.total_fee_pay_online_format);
                                $('.box-atm-pay-online .box-fee-trade').removeClass('hidden');
                                $('.box-atm-pay-online .box-fee-trade').html('PhÃ­ tiá»‡n Ã­ch: ' + data.total_fee_pay_online_format);
                                /* end onepay */
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                //alert(xhr.status);
                                //alert(thrownError);
                            }
                        });

                    } // NOT FOOD
                    else {
                        // GET LIST FOOD
                        var arr_price_food = new Array();
                        $('table.tlb-food .chk-list-food:checked').each(function () {
                            var price = $(this).attr('data-price');
                            arr_price_food.push(price);
                        });
                        var count_length = arr_price_food.length;
                        var str_query_food = '';
                        for (var i = 0; i < count_length; i++) {
                            str_query_food += arr_price_food[i] + ',';
                        }
                        str_query_food = str_query_food.replace(/,$/g, '');
                        $.ajax({
                            url: adminurl,
                            type: 'post',
                            cache: false,
                            dataType: 'JSON',
                            data: { action: 'ajax_prices_form_confirm', type_pay_online: type_pay_online, code_voucher: code_voucher, arr_data_bag: str_query_bag, rad_insure: rad_val, arr_data_food: str_query_food },
                            success: function (data) {
                                $('table.tlb-total-prices-flights').removeClass('loadding');
                                $('table.tlb-total-prices-flights tr td.td-total-prices').html(data.total_format);
                                /* voucher */
                                $('table.tlb-total-prices-flights tr.tr-box-voucher td:last-child').html(data.value_voucher_format);
                                if ($.trim(code_voucher) == '') { $('.error-code-voucher').html(''); }
                                else { $('.error-code-voucher').html(data.error_code_voucher); }
                                /* end voucher */

                                /* onepay */
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online').removeClass('hidden');
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online td:last-child').html(data.total_fee_pay_online_format);
                                $('.box-atm-pay-online .box-fee-trade').removeClass('hidden');
                                $('.box-atm-pay-online .box-fee-trade').html('PhÃ­ tiá»‡n Ã­ch: ' + data.total_fee_pay_online_format);
                                /* end onepay */
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                //alert(xhr.status);
                                //alert(thrownError);
                            }
                        });

                    } // YES FOOD
                }
            });

            $(document).on('change', '.box-change-type-payment input[name="rad_type_payment"]', function () {
                var val_type_payment = $(this).val();
                if (val_type_payment == 'payment_atm_pay_online') {
                    $('input[name="rad_item_pay_online"]:checked').trigger('change');
                }
                else {
                    var type_pay_online = 'not onepay';
                    var rad_val = '';
                    var chk_insure = $('input[name="rad_travel_care"]:checked').val();
                    if (chk_insure == 'yes') { rad_val = 'yes'; }

                    var type = $('.slc-list-bag').attr('data-type');
                    var iti = $('.slc-list-bag').attr('data-iti');
                    var price_format = $('.slc-list-bag').find('option:selected').attr('data-price-format');
                    var weight = $('.slc-list-bag').find('option:selected').attr('data-weight');


                    var arr_price = new Array();
                    $('.slc-list-bag').each(function () {
                        var price = $(this).find('option:selected').attr('data-price');
                        arr_price.push(price);
                    });
                    var count_length = arr_price.length;
                    var str_query_bag = '';
                    for (var i = 0; i < count_length; i++) {
                        str_query_bag += arr_price[i] + ',';
                    }
                    str_query_bag = str_query_bag.replace(/,$/g, '');
                    $('table.tlb-total-prices-flights').addClass('loadding');

                    var chk_food = $('.table.tlb-food input').hasClass('chk-list-food');
                    var code_voucher = $('.txt-code-voucher').val();
                    if (chk_food == false) {
                        $.ajax({
                            url: adminurl,
                            type: 'post',
                            cache: false,
                            dataType: 'JSON',
                            data: { action: 'ajax_prices_form_confirm', type_pay_online: type_pay_online, code_voucher: code_voucher, arr_data_bag: str_query_bag, rad_insure: rad_val },
                            success: function (data) {
                                $('table.tlb-total-prices-flights').removeClass('loadding');
                                $('table.tlb-total-prices-flights tr td.td-total-prices').html(data.total_format);

                                /* voucher */
                                $('table.tlb-total-prices-flights tr.tr-box-voucher td:last-child').html(data.value_voucher_format);
                                if ($.trim(code_voucher) == '') { $('.error-code-voucher').html(''); }
                                else { $('.error-code-voucher').html(data.error_code_voucher); }
                                /* end voucher */

                                /* onepay */
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online').addClass('hidden');
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online td:last-child').html(data.total_fee_pay_online_format);
                                $('.box-atm-pay-online .box-fee-trade').addClass('hidden');
                                $('.box-atm-pay-online .box-fee-trade').html('PhÃ­ tiá»‡n Ã­ch: ' + data.total_fee_pay_online_format);
                                /* end onepay */
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                //alert(xhr.status);
                                //alert(thrownError);
                            }
                        });

                    } // NOT FOOD
                    else {
                        // GET LIST FOOD
                        var arr_price_food = new Array();
                        $('table.tlb-food .chk-list-food:checked').each(function () {
                            var price = $(this).attr('data-price');
                            arr_price_food.push(price);
                        });
                        var count_length = arr_price_food.length;
                        var str_query_food = '';
                        for (var i = 0; i < count_length; i++) {
                            str_query_food += arr_price_food[i] + ',';
                        }
                        str_query_food = str_query_food.replace(/,$/g, '');
                        $.ajax({
                            url: adminurl,
                            type: 'post',
                            cache: false,
                            dataType: 'JSON',
                            data: { action: 'ajax_prices_form_confirm', type_pay_online: type_pay_online, code_voucher: code_voucher, arr_data_bag: str_query_bag, rad_insure: rad_val, arr_data_food: str_query_food },
                            success: function (data) {
                                $('table.tlb-total-prices-flights').removeClass('loadding');
                                $('table.tlb-total-prices-flights tr td.td-total-prices').html(data.total_format);
                                /* voucher */
                                $('table.tlb-total-prices-flights tr.tr-box-voucher td:last-child').html(data.value_voucher_format);
                                if ($.trim(code_voucher) == '') { $('.error-code-voucher').html(''); }
                                else { $('.error-code-voucher').html(data.error_code_voucher); }
                                /* end voucher */

                                /* onepay */
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online').addClass('hidden');
                                $('table.tlb-total-prices-flights tr.tr-box-fee-trade-pay-online td:last-child').html(data.total_fee_pay_online_format);
                                $('.box-atm-pay-online .box-fee-trade').addClass('hidden');
                                $('.box-atm-pay-online .box-fee-trade').html('PhÃ­ tiá»‡n Ã­ch: ' + data.total_fee_pay_online_format);
                                /* end onepay */
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                //alert(xhr.status);
                                //alert(thrownError);
                            }
                        });

                    } // YES FOOD
                }

            });


        });
    },
    options_confirm: function () {
        "use strict";
        $(document).ready(function () {

            $(document).on('change', '.chk-export-bill', function () {

                // EXPORT BILL
                var chk_export_bill = $(this).is(':checked');
                if (chk_export_bill == true) {
                    $('.box-info-bill').removeClass('hidden');
                    $('.box-info-bill input').attr('required', 'required');
                }
                else {
                    $('.box-info-bill').addClass('hidden');
                    $('.box-info-bill input').removeAttr('required');
                }

            });

        });

    },

    // BOX PAGE  SEARCH FLIGHTS
    event_next_infomation_flight: function () {
        "use strict";
        $(document).ready(function () {
            $(document).on('click', '.box-next-details .btn-next-details', function () {

                var data_type = $(this).attr('data-type');
                var itinerary = '';
                var departure = '';
                var destination = '';
                var departureDate = '';
                var returnDate = '';
                var adult = '';
                var child = '';
                var infant = '';

                var link_current_app = link_current.replace(/^.*tim-chuyen-bay\?/, '');
                var arr_link_current = link_current_app.split('&');
                var arr_itinerary = arr_link_current[0].split("=");
                itinerary = arr_itinerary[1];
                var arr_departure = arr_link_current[1].split("=");
                departure = arr_departure[1];
                var arr_destination = arr_link_current[2].split("=");
                destination = arr_destination[1];
                var arr_departuredate = arr_link_current[3].split("=");
                departureDate = arr_departuredate[1];
                var arr_returndate = (itinerary == 'Oneway') ? '' : arr_link_current[4].split("=");
                returnDate = arr_returndate[1];
                var arr_adult = arr_link_current[5].split("=");
                adult = arr_adult[1];
                var arr_child = arr_link_current[6].split("=");
                child = arr_child[1];
                var arr_infant = arr_link_current[7].split("=");
                infant = arr_infant[1];


                setTimeout(function () {
                    if (data_type == 'domestic') {
                        if (itinerary == 'Oneway') {
                            var val_item_depart = $.cookie('depart_item');
                            var chk_str_depart = typeof val_item_depart;
                            if (val_item_depart != '' && chk_str_depart == 'string') {
                                $('.box-column-content-flight').addClass('hidden');
                                $('.box-full-confirm').removeClass('hidden');

                                $('.box-item-step .box-step .box-step-1-2 .step-1').removeClass('active');
                                $('.box-item-step .box-step .box-step-1-2').addClass('active');

                                // LOADING INFO CONFIRM
                                $('.loadding-data-confirm').removeClass('hidden');
                                $('.box-system-filter-flight').addClass('hidden');
                                $('.box-title-step-flight .box-title.step-1').addClass('hidden');
                                $('.box-title-step-flight .box-title.step-2').removeClass('hidden');


                                $.ajax({
                                    url: adminurl,
                                    type: 'post',
                                    cache: false,
                                    data: { action: 'ajax_get_info_flight_confirm' },
                                    success: function (data) {
                                        $('.loadding-data-confirm').addClass('hidden');
                                        $('.content-full-confirm').html(data);
                                    },
                                    error: function (xhr, ajaxOptions, thrownError) {
                                        //alert(xhr.status);
                                        //alert(thrownError);
                                    }
                                });

                            }
                            else {

                                if (val_item_depart == '' || chk_str_depart != 'string') {
                                    var height_depart = $('.box-title-depart.search-flight').offset().top;
                                    $('body,html').animate({ scrollTop: height_depart }, '500', 'swing', function () { });
                                }
                            }
                        }
                        else {
                            var val_item_depart = $.trim($.cookie('depart_item'));
                            var chk_str_depart = $.trim(typeof val_item_depart);

                            var val_item_return = $.cookie('return_item');
                            var chk_str_return = typeof val_item_return;

                            if (val_item_depart != '' && chk_str_depart == 'string' && val_item_return != '' && chk_str_return == 'string') {
                                $('.box-column-content-flight').addClass('hidden');
                                $('.box-full-confirm').removeClass('hidden');

                                $('.box-item-step .box-step .box-step-1-2 .step-1').removeClass('active');
                                $('.box-item-step .box-step .box-step-1-2').addClass('active');
                                // LOADING INFO CONFIRM
                                $('.loadding-data-confirm').removeClass('hidden');
                                $('.box-system-filter-flight').addClass('hidden');
                                $('.box-title-step-flight .box-title.step-1').addClass('hidden');
                                $('.box-title-step-flight .box-title.step-2').removeClass('hidden');

                                $.ajax({
                                    url: adminurl,
                                    type: 'post',
                                    cache: false,
                                    data: { action: 'ajax_get_info_flight_confirm' },
                                    success: function (data) {
                                        $('.loadding-data-confirm').addClass('hidden');
                                        $('.content-full-confirm').html(data);
                                    },
                                    error: function (xhr, ajaxOptions, thrownError) {
                                        //alert(xhr.status);
                                        //alert(thrownError);
                                    }
                                });

                            }
                            else {
                                if (val_item_depart == '' || chk_str_depart != 'string') {
                                    var height_depart = $('.box-title-depart.search-flight').offset().top;
                                    //$('body,html').animate({scrollTop:height_depart}, '500', 'swing', function() {});
                                    $('.box-container-results.box-return .tlb-return tr.item').addClass('hidden');
                                    $('.box-container-results.box-return .tlb-return tr.item.selected').removeClass('hidden');

                                }
                                else if (val_item_return == '' || chk_str_return != 'string') {
                                    var height_return = $('.box-title-return.search-flight').offset().top;
                                    //$('body,html').animate({scrollTop:height_return}, '500', 'swing', function() {});    
                                    $('.box-container-results.box-depart .tlb-depart tr.item').addClass('hidden');
                                    $('.box-container-results.box-depart .tlb-depart tr.item.selected').removeClass('hidden');
                                }

                            }
                        }
                    }
                    else if (data_type == 'internation') {
                        if (itinerary == 'Oneway') {
                            var val_item_depart = $.cookie('depart_item');
                            var chk_str_depart = typeof val_item_depart;
                            if (val_item_depart != '' && chk_str_depart == 'string') {
                                $('.box-column-content-flight').addClass('hidden');
                                $('.box-full-confirm').removeClass('hidden');

                                $('.box-item-step .box-step .box-step-1-2 .step-1').removeClass('active');
                                $('.box-item-step .box-step .box-step-1-2').addClass('active');
                                // LOADING INFO CONFIRM
                                $('.loadding-data-confirm').removeClass('hidden');
                                $('.box-system-filter-flight').addClass('hidden');
                                $('.box-title-step-flight .box-title.step-1').addClass('hidden');
                                $('.box-title-step-flight .box-title.step-2').removeClass('hidden');

                                $.ajax({
                                    url: adminurl,
                                    type: 'post',
                                    cache: false,
                                    data: { action: 'ajax_get_info_flight_confirm' },
                                    success: function (data) {
                                        $('.loadding-data-confirm').addClass('hidden');
                                        $('.content-full-confirm').html(data);
                                    },
                                    error: function (xhr, ajaxOptions, thrownError) {
                                        //alert(xhr.status);
                                        //alert(thrownError);
                                    }
                                });

                            }
                            else {

                                if (val_item_depart == '' || chk_str_depart != 'string') {
                                    var height_depart = $('.box-title-depart.search-flight').offset().top;
                                    $('body,html').animate({ scrollTop: height_depart }, '500', 'swing', function () { });
                                }
                            }
                        }
                        else {
                            var val_item_depart = $.trim($.cookie('depart_item'));
                            var chk_str_depart = $.trim(typeof val_item_depart);

                            var val_item_return = $.cookie('return_item');
                            var chk_str_return = typeof val_item_return;

                            if (val_item_return != '' && chk_str_return == 'string') {
                                $('.box-column-content-flight').addClass('hidden');
                                $('.box-full-confirm').removeClass('hidden');

                                $('.box-item-step .box-step .box-step-1-2 .step-1').removeClass('active');
                                $('.box-item-step .box-step .box-step-1-2').addClass('active');
                                // LOADING INFO CONFIRM
                                $('.loadding-data-confirm').removeClass('hidden');
                                $('.box-system-filter-flight').addClass('hidden');
                                $('.box-title-step-flight .box-title.step-1').addClass('hidden');
                                $('.box-title-step-flight .box-title.step-2').removeClass('hidden');

                                $.ajax({
                                    url: adminurl,
                                    type: 'post',
                                    cache: false,
                                    data: { action: 'ajax_get_info_flight_confirm' },
                                    success: function (data) {
                                        $('.loadding-data-confirm').addClass('hidden');
                                        $('.content-full-confirm').html(data);
                                    },
                                    error: function (xhr, ajaxOptions, thrownError) {
                                        //alert(xhr.status);
                                        //alert(thrownError);
                                    }
                                });
                            }
                            else {
                                if (val_item_depart == '' || chk_str_depart != 'string') {
                                    var height_depart = $('.box-title-depart.search-flight').offset().top;
                                    $('body,html').animate({ scrollTop: height_depart }, '500', 'swing', function () { });
                                }
                                else if (val_item_return == '' || chk_str_return != 'string') {
                                    var height_return = $('.box-title-return.search-flight').offset().top;
                                    $('body,html').animate({ scrollTop: height_return }, '500', 'swing', function () { });
                                }

                            }
                        }
                    }

                }, 50);



            });
        });
    },
    options_flight: function () {
        "use strict";
        $(document).ready(function () {

            // CHECKED RADIO
            $(document).on('click', '.box-container-results.box-depart table tr.item', function () {

                var val_item = $(this).find('a.a-details-flight').attr('data-id-airlines');
                if (val_item == null) {
                    val_item = $(this).find('a.a-details-flight-internation').attr('data-id-airlines');
                }
                $.cookie('depart_item', val_item);

                $('.box-container-results table.tlb-depart tr.item').removeClass('selected');
                $('.box-container-results table.tlb-depart tr.item span.img-selected').removeClass('glyphicon-check');
                $('.box-container-results table.tlb-depart tr.item span.img-selected').addClass('glyphicon-unchecked');
                $(this).addClass('selected');
                $(this).find('span.img-selected').removeClass('glyphicon-unchecked');
                $(this).find('span.img-selected').addClass('glyphicon-check');

            });
            $(document).on('click', '.box-container-results.box-return table tr.item', function () {

                var val_item = $(this).find('a.a-details-flight').attr('data-id-airlines');
                if (val_item == null) {
                    val_item = $(this).find('a.a-details-flight-internation').attr('data-id-airlines');
                }
                $.cookie('return_item', val_item);

                $('.box-container-results table.tlb-return tr.item').removeClass('selected');
                $('.box-container-results table.tlb-return tr.item span.img-selected').removeClass('glyphicon-check');
                $('.box-container-results table.tlb-return tr.item span.img-selected').addClass('glyphicon-unchecked');
                $(this).addClass('selected');
                $(this).find('span.img-selected').removeClass('glyphicon-unchecked');
                $(this).find('span.img-selected').addClass('glyphicon-check');

            });

            // DETAILS FLIGHTS DOMESTIC
            $(document).on('click', '.a-details-flight', function () {
                var chk_class = $(this).find('span').attr('class');
                var find = chk_class.indexOf('right');
                var id = $(this).attr('data-id-airlines');

                if (find > 0) {
                    $(this).find('span').removeClass('glyphicon-chevron-right');
                    $(this).find('span').addClass('glyphicon-chevron-down');
                    $('.tr-details.' + id).removeClass('hidden');
                }
                else {
                    $(this).find('span').removeClass('glyphicon-chevron-down');
                    $(this).find('span').addClass('glyphicon-chevron-right');
                    $('.tr-details.' + id).addClass('hidden');
                }


                var id_airlines = $(this).attr('data-id-airlines');
                var link_airlines = $(this).attr('data-link-airlines');
                var itinerary = $(this).attr('data-itinerary');
                var type_airlines = $(this).attr('data-type-airlines');

                var chk_content = $.trim($('.tr-details.' + id).find('.content-details').text());
                if (chk_content == '') {
                    $('.tr-details.' + id).find('.content-details .loadding-data-details-airlines').removeClass('hidden');
                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        cache: false,
                        data: { action: 'ajax_get_info_details_flight_domestic', itinerary: itinerary, link_airlines: link_airlines, id_airlines: id_airlines, type_airlines: type_airlines, },
                        success: function (data) {
                            $('.tr-details.' + id).find('.content-details .loadding-data-details-airlines').addClass('hidden');
                            $('.tr-details.' + id).find('.content-details').html(data);
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            //alert(xhr.status);
                            //alert(thrownError);
                        }
                    });
                }


            });
            // DETAILS FLIGHTS INTERNATION


            $(document).on('click', '.a-details-flight-internation', function () {
                var chk_class = $(this).find('span').attr('class');
                var find = chk_class.indexOf('right');
                var id = $(this).attr('data-id-airlines');

                if (find > 0) {
                    $(this).find('span').removeClass('glyphicon-chevron-right');
                    $(this).find('span').addClass('glyphicon-chevron-down');
                    $('.tr-details.' + id).removeClass('hidden');
                }
                else {
                    $(this).find('span').removeClass('glyphicon-chevron-down');
                    $(this).find('span').addClass('glyphicon-chevron-right');
                    $('.tr-details.' + id).addClass('hidden');
                }


                var id_airlines = $(this).attr('data-id-airlines');
                var link_airlines = $(this).attr('data-link-airlines');
                var itinerary = $(this).attr('data-itinerary');
                var type_airlines = $(this).attr('data-type-airlines');

                var chk_content = $.trim($('.tr-details.' + id).find('.content-details').text());
                if (chk_content == '') {
                    $('.tr-details.' + id).find('.content-details .loadding-data-details-airlines').removeClass('hidden');
                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        cache: false,
                        data: { action: 'ajax_get_info_details_flight_internation', itinerary: itinerary, link_airlines: link_airlines, id_airlines: id_airlines, type_airlines: type_airlines, },
                        success: function (data) {
                            $('.tr-details.' + id).find('.content-details .loadding-data-details-airlines').addClass('hidden');
                            $('.tr-details.' + id).find('.content-details').html(data);
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            //alert(xhr.status);
                            //alert(thrownError);
                        }
                    });
                }


            });


        });
    },
    count_flight: function () {
        "use strict";
        $(document).ready(function () {

            var count_tr_depart = $('.tlb-depart tr.item').length;
            $('.box-title-depart.search-flight span.number-flights').text(count_tr_depart);

            var count_tr_return = $('.tlb-return tr.item').length;
            $('.box-title-return.search-flight span.number-flights').text(count_tr_return);

        });
    },
    pop_map_toogle: function () {
        "use strict";
        $(document).ready(function () {

            $(document).on('click', '.view-map-airports', function () {
                var airports = $(this).attr('data-airports');
                $('.info-map-airports').text(airports);

            });
        });
    },
    clear_cookie_flights_item: function () {
        "use strict";
        $(document).ready(function () {

            $.cookie('depart_item', '');
            $.cookie('return_item', '');
        });
    },
    scroll_result_flight: function () {
        "use strict";
        $(document).ready(function () {

            $('.box-continue').scrollToFixed({
                bottom: 0,
                limit: $('.box-continue').offset().top,
                preFixed: function () { $('.box-continue .title-continue').css('display', 'block'); $(this).css('background', "url('http:/admin.vietnambooking.com/wp-content/themes/admin_vietnambooking/images/form/paperRoll.png') no-repeat top right"); },
                postFixed: function () { $('.box-continue .title-continue').css('display', 'none'); $(this).css('background', 'transparent'); },
            });

        });
    },

    //DOMESTIC  
    filter_change_domestic: function () {
        "use strict";
        $(document).ready(function () {

            var rad_display_prices = '';
            var rad_list_sort = '';
            var chk_list_airlines_1 = ''; var chk_list_airlines_2 = ''; var chk_list_airlines_3 = '';
            var chk_stop_point_0 = ''; var chk_stop_point_1 = ''; var chk_stop_point_2 = '';
            var slider_time_start_0 = ''; var slider_time_start_1 = '';
            var slider_time_end_0 = ''; var slider_time_end_1 = '';

            var itinerary = '';
            var departure = '';
            var destination = '';
            var departuredate = '';
            var returndate = '';
            var adult = '';
            var child = '';
            var infant = '';
            var filter_airlines = '';

            var link_current_app = link_current.replace(/^.*tim-chuyen-bay\?/, '');
            var arr_link_current = link_current_app.split('&');
            var arr_itinerary = arr_link_current[0].split("=");
            itinerary = arr_itinerary[1];
            var arr_departure = arr_link_current[1].split("=");
            departure = arr_departure[1];
            var arr_destination = arr_link_current[2].split("=");
            destination = arr_destination[1];
            var arr_departuredate = arr_link_current[3].split("=");
            departuredate = arr_departuredate[1];
            var arr_returndate = arr_link_current[4].split("=");
            returndate = arr_returndate[1];
            var arr_adult = arr_link_current[5].split("=");
            adult = arr_adult[1];
            var arr_child = arr_link_current[6].split("=");
            child = arr_child[1];
            var arr_infant = arr_link_current[7].split("=");
            infant = arr_infant[1];



            rad_display_prices = $('input[name="rad_mode_display"]:checked').val();
            if (rad_display_prices === 'display_base_price') { $("font.title-price").text('GiÃ¡ vÃ© chÆ°a bao gá»“m thuáº¿ vÃ  phá»¥ phÃ­'); }
            else { $("font.title-price").text('GiÃ¡ vÃ© Ä‘Ã£ bao gá»“m thuáº¿ vÃ  phá»¥ phÃ­'); }


            rad_list_sort = $('input[name="rad_list_sort"]:checked').val();


            chk_list_airlines_1 = $('input#chk-list-airlines-1').is(':checked');
            if (chk_list_airlines_1 == true) {
                chk_list_airlines_1 = 'yes';
            }
            chk_list_airlines_2 = $('input#chk-list-airlines-2').is(':checked');
            if (chk_list_airlines_2 == true) {
                chk_list_airlines_2 = 'yes';
            }
            chk_list_airlines_3 = $('input#chk-list-airlines-3').is(':checked');
            if (chk_list_airlines_3 == true) {
                chk_list_airlines_3 = 'yes';
            }

            chk_stop_point_0 = $('#chk-list-stop-point-0').is(':checked');
            chk_stop_point_1 = $('#chk-list-stop-point-1').is(':checked');
            chk_stop_point_2 = $('#chk-list-stop-point-2').is(':checked');


            var slider_time_start = $('.info-time-depart span').text();
            slider_time_start = slider_time_start.split('-');

            slider_time_start_0 = $.trim(slider_time_start[0]);
            slider_time_start_0 = slider_time_start_0.replace('h', '');
            slider_time_start_1 = $.trim(slider_time_start[1]);
            slider_time_start_1 = slider_time_start_1.replace('h', '');

            var slider_time_end = $('.info-time-return span').text();
            slider_time_end = slider_time_end.split('-');

            slider_time_end_0 = $.trim(slider_time_end[0]);
            slider_time_end_0 = slider_time_end_0.replace('h', '');
            slider_time_end_1 = $.trim(slider_time_end[1]);
            slider_time_end_1 = slider_time_end_1.replace('h', '');


            $('.box-container-results').addClass('loadding');
            $.ajax({
                url: adminurl,
                type: 'post',
                cache: false,
                dataType: 'json',
                data: { action: 'ajax_system_filter_item_domestic', slider_time_end_1: slider_time_end_1, slider_time_end_0: slider_time_end_0, slider_time_start_1: slider_time_start_1, slider_time_start_0: slider_time_start_0, chk_stop_point_2: chk_stop_point_2, chk_stop_point_1: chk_stop_point_1, chk_stop_point_0: chk_stop_point_0, chk_list_airlines_3: chk_list_airlines_3, chk_list_airlines_2: chk_list_airlines_2, chk_list_airlines_1: chk_list_airlines_1, rad_list_sort: rad_list_sort, rad_display_prices: rad_display_prices, itinerary: itinerary, adult: adult, child: child, infant: infant, departure: departure, destination: destination, departureDate: departuredate, returnDate: returndate },
                success: function (data) {

                    $('.box-container-results').removeClass('loadding');

                    if (itinerary === 'Oneway') {
                        $('.box-container-results.box-depart .tlb-depart').html(data.depart);
                        $('.box-continue').remove();
                        // $('.box-container-results.box-depart .tlb-depart').after('<div class="box-continue"><table><tr><td><span class="title-continue">'+data.title_results+'</span></td><td><a href="javascript:void(0);" data-type="domestic" class="link-continue btn btn-info">'+data.str_continue+' <span class="glyphicon glyphicon-share-alt"></span></a></td></tr></table></div>');
                        APPS_FLIGHT.count_flight();
                    }
                    if (itinerary === 'Roundtrip') {
                        $('.box-container-results.box-depart .tlb-depart').html(data.depart);
                        $('.box-container-results.box-return .tlb-return').html(data.return);
                        $('.box-continue').remove();
                        // $('.box-container-results.box-return .tlb-return').after('<div class="box-continue"><table><tr><td><span class="title-continue">'+data.title_results+'</span></td><td><a href="javascript:void(0);" data-type="domestic" class="link-continue btn btn-info">'+data.str_continue+' <span class="glyphicon glyphicon-share-alt"></span></a></td></tr></table></div>');
                        APPS_FLIGHT.count_flight();
                    }

                    APPS_FLIGHT.clear_cookie_flights_item();
                    // APPS_FLIGHT.scroll_result_flight();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //alert(xhr.status);
                    //alert(thrownError);
                }
            });


        });
    },
    ajax_system_filter_item_domestic: function () {
        "use strict";
        $(document).ready(function () {
            $(document).on('change', 'input[name="rad_mode_display"],input[name="rad_list_sort"],input#chk-list-airlines-1,input#chk-list-airlines-2,input#chk-list-airlines-3', function () {
                APPS_FLIGHT.filter_change_domestic();
            });

        });
    },
    time_slider_filter_domestic: function () {
        "use strict";
        $(document).ready(function () {

            // TIME DEPART
            $("#slider-range.time-depart-slider").slider({
                range: true,
                min: 0,
                max: 24,
                values: [0, 24],
                slide: function (event, ui) {
                    $(".info-time-depart span").text(ui.values[0] + "h" + " - " + ui.values[1] + "h");
                },
                change: function (event, ui) { APPS_FLIGHT.filter_change_domestic(); }
            });

            // TIME RETURN
            $("#slider-range.time-return-slider").slider({
                range: true,
                min: 0,
                max: 24,
                values: [0, 24],
                slide: function (event, ui) {
                    $(".info-time-return span").text(ui.values[0] + "h" + " - " + ui.values[1] + "h");
                },
                change: function (event, ui) { APPS_FLIGHT.filter_change_domestic(); }
            });

        });
    },
    // GET DATA DOMESTIC
    ajax_results_flights_domestic: function () {
        "use strict";
        $(document).ready(function () {

            var itinerary = '';
            var departure = '';
            var destination = '';
            var departureDate = '';
            var returnDate = '';
            var adult = '';
            var child = '';
            var infant = '';
            var filter_airlines = '';
            var link_current_app = link_current.replace(/^.*tim-chuyen-bay\?/, '');
            var arr_link_current = link_current_app.split('&');
            var arr_itinerary = arr_link_current[0].split("=");
            itinerary = arr_itinerary[1];
            var arr_departure = arr_link_current[1].split("=");
            departure = arr_departure[1];
            var arr_destination = arr_link_current[2].split("=");
            destination = arr_destination[1];
            var arr_departuredate = arr_link_current[3].split("=");
            departureDate = arr_departuredate[1];
            var arr_returndate = (itinerary == 'Oneway') ? '' : arr_link_current[4].split("=");
            returnDate = arr_returndate[1];
            var arr_adult = arr_link_current[5].split("=");
            adult = arr_adult[1];
            var arr_child = arr_link_current[6].split("=");
            child = arr_child[1];
            var arr_infant = arr_link_current[7].split("=");
            infant = arr_infant[1];

            var count_arr_link_current = arr_link_current.length - 1;
            var arr_filter_airlines = arr_link_current[count_arr_link_current].split("=");
            if (arr_filter_airlines[0] == 'filter_airlines') {
                filter_airlines = arr_filter_airlines[1];
            }
            else {
                filter_airlines = '';
            }

            $('.box-loadding-flights').removeClass('hidden');

            $.cookie('s_l', 's_l');
            $.ajax({
                url: adminurl,
                type: 'post',
                cache: false,
                dataType: 'json',
                data: { action: 'ajax_results_flights_domestic', itinerary: itinerary, adult: adult, child: child, infant: infant, departure: departure, destination: destination, departureDate: departureDate, returnDate: returnDate, filter_airlines: filter_airlines },
                success: function (data) {

                    $.cookie('s_l', '');
                    $('.box-loadding-flights').addClass('hidden');
                    $('.box-info-flight .btn-toggle-change-flight').removeClass('hidden');
                    $('.box-loadding-search-flight').addClass('hidden');
                    $('.box-main-content-flight').removeClass('hidden');

                    if (itinerary === 'Oneway') {
                        if ($.trim(data.check_status) == '') {
                            $.ajax({
                                url: adminurl,
                                type: 'post',
                                cache: false,
                                data: { action: 'ajax_get_form_email_flight_empty', itinerary: itinerary, adult: adult, child: child, infant: infant, departure: departure, destination: destination, departureDate: departureDate, returnDate: returnDate },
                                success: function (data) {
                                    $('.box-container-results.box-depart .tlb-depart').html(data);
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    //alert(xhr.status);
                                    //alert(thrownError);
                                }
                            });

                        }
                        else {
                            $('.box-container-results.box-depart .tlb-depart').html(data.depart);
                            $('.tlb-filter-airlines.filter-airlines span.price-airlines.JQ').html(data.min_price_jq);
                            $('.tlb-filter-airlines.filter-airlines span.price-airlines.VJ').html(data.min_price_vj);
                            $('.tlb-filter-airlines.filter-airlines span.price-airlines.VN').html(data.min_price_vn);
                            //    $('.box-container-results.box-depart .tlb-depart').after('<div class="box-continue"><table><tr><td><span class="title-continue">'+data.title_results+'</span></td><td><a href="javascript:void(0);" data-type="domestic" class="link-continue btn btn-info">'+data.str_continue+' <span class="glyphicon glyphicon-share-alt"></span></a></td></tr></table></div>');
                            APPS_FLIGHT.count_flight();
                        }
                    }
                    if (itinerary === 'Roundtrip') {
                        if ($.trim(data.check_status) == '') {
                            $.ajax({
                                url: adminurl,
                                type: 'post',
                                cache: false,
                                data: { action: 'ajax_get_form_email_flight_empty', itinerary: itinerary, adult: adult, child: child, infant: infant, departure: departure, destination: destination, departureDate: departureDate, returnDate: returnDate },
                                success: function (data) {
                                    $('.box-container-results.box-depart .tlb-depart').html(data);
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    //alert(xhr.status);
                                    //alert(thrownError);
                                }
                            });

                        }
                        else {
                            $('.box-container-results.box-depart .tlb-depart').html(data.depart);
                            $('.box-container-results.box-return .tlb-return').html(data.return);

                            $('.tlb-filter-airlines.filter-airlines span.price-airlines.JQ').html(data.min_price_jq);
                            $('.tlb-filter-airlines.filter-airlines span.price-airlines.VJ').html(data.min_price_vj);
                            $('.tlb-filter-airlines.filter-airlines span.price-airlines.VN').html(data.min_price_vn);
                            // $('.box-container-results.box-return .tlb-return').after('<div class="box-continue"><table><tr><td><span class="title-continue">'+data.title_results+'</span></td><td><a href="javascript:void(0);" data-type="domestic" class="link-continue btn btn-info">'+data.str_continue+' <span class="glyphicon glyphicon-share-alt"></span></a></td></tr></table></div>');
                            APPS_FLIGHT.count_flight();
                        }
                    }

                    APPS_FLIGHT.clear_cookie_flights_item();
                    APPS.system_info_account();
                    //  APPS_FLIGHT.scroll_result_flight();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //alert(xhr.status);
                    //alert(thrownError);
                    $.cookie('s_l', '');
                }
            });
        });
    },

    //  INTERNATION
    filter_change_internation: function () {
        "use strict";
        $(document).ready(function () {

            var rad_display_prices = '';
            var rad_list_sort = '';
            var chk_list_airlines = '';
            var chk_stop_point = '';
            var slider_time_start_0 = ''; var slider_time_start_1 = '';
            var slider_time_end_0 = ''; var slider_time_end_1 = '';

            var itinerary = '';
            var departure = '';
            var destination = '';
            var departuredate = '';
            var returndate = '';
            var adult = '';
            var child = '';
            var infant = '';

            var link_current_app = link_current.replace(/^.*tim-chuyen-bay\?/, '');
            var arr_link_current = link_current_app.split('&');
            var arr_itinerary = arr_link_current[0].split("=");
            itinerary = arr_itinerary[1];
            var arr_departure = arr_link_current[1].split("=");
            departure = arr_departure[1];
            var arr_destination = arr_link_current[2].split("=");
            destination = arr_destination[1];
            var arr_departuredate = arr_link_current[3].split("=");
            departuredate = arr_departuredate[1];
            var arr_returndate = arr_link_current[4].split("=");
            returndate = arr_returndate[1];
            var arr_adult = arr_link_current[5].split("=");
            adult = arr_adult[1];
            var arr_child = arr_link_current[6].split("=");
            child = arr_child[1];
            var arr_infant = arr_link_current[7].split("=");
            infant = arr_infant[1];



            rad_display_prices = $('input[name="rad_mode_display_internation"]:checked').val();
            if (rad_display_prices === 'display_base_price') { $("font.title-price").text('GiÃ¡ vÃ© chÆ°a bao gá»“m thuáº¿ vÃ  phá»¥ phÃ­'); }
            else { $("font.title-price").text('GiÃ¡ vÃ© Ä‘Ã£ bao gá»“m thuáº¿ vÃ  phá»¥ phÃ­'); }

            rad_list_sort = $('input[name="rad_list_sort_internation"]:checked').val();


            chk_list_airlines = '';
            $('.tlb-filter-airlines.filter-airlines-internation  .chk-list-airlines-internation:checked').each(function () {
                chk_list_airlines += $(this).val() + ',';
            });
            chk_list_airlines = chk_list_airlines.replace(/,$/i, '');


            chk_stop_point = '';
            $('.tlb-filter-stop-point .chk-list-stop-point:checked').each(function () {

                chk_stop_point += $(this).val() + ',';
            });
            chk_stop_point = chk_stop_point.replace(/,$/i, '');


            var slider_time_start = $('.info-time-depart-internation span').text();
            slider_time_start = slider_time_start.split('-');

            slider_time_start_0 = $.trim(slider_time_start[0]);
            slider_time_start_0 = slider_time_start_0.replace('h', '');
            slider_time_start_1 = $.trim(slider_time_start[1]);
            slider_time_start_1 = slider_time_start_1.replace('h', '');


            var slider_time_end = $('.info-time-return-internation span').text();
            slider_time_end = slider_time_end.split('-');

            slider_time_end_0 = $.trim(slider_time_end[0]);
            slider_time_end_0 = slider_time_end_0.replace('h', '');
            slider_time_end_1 = $.trim(slider_time_end[1]);
            slider_time_end_1 = slider_time_end_1.replace('h', '');



            $('.box-container-results').addClass('loadding');
            $.ajax({
                url: adminurl,
                type: 'post',
                cache: false,
                dataType: 'json',
                data: {
                    action: 'ajax_system_filter_item_internation',
                    slider_time_end_1: slider_time_end_1,
                    slider_time_end_0: slider_time_end_0,
                    slider_time_start_1: slider_time_start_1,
                    slider_time_start_0: slider_time_start_0,
                    chk_stop_point: chk_stop_point,
                    chk_list_airlines: chk_list_airlines,
                    rad_list_sort: rad_list_sort,
                    rad_display_prices: rad_display_prices,
                    itinerary: itinerary, adult: adult, child: child, infant: infant, departure: departure, destination: destination, departureDate: departuredate, returnDate: returndate
                },
                success: function (data) {

                    $('.box-container-results').removeClass('loadding');

                    if (itinerary === 'Oneway') {
                        $('.box-container-results.box-depart .tlb-depart').html(data.depart);
                        $('.box-continue').remove();
                        //    $('.box-container-results.box-depart .tlb-depart').after('<div class="box-continue"><table><tr><td><span class="title-continue">'+data.title_results+'</span></td><td><a href="javascript:void(0);" data-type="internation" class="link-continue btn btn-info">'+data.str_continue+' <span class="glyphicon glyphicon-share-alt"></span></a></td></tr></table></div>');
                        APPS_FLIGHT.count_flight();
                    }
                    if (itinerary === 'Roundtrip') {
                        $('.box-container-results.box-return .tlb-return').html(data.return);
                        $('.box-continue').remove();
                        //  $('.box-container-results.box-return .tlb-return').after('<div class="box-continue"><table><tr><td><span class="title-continue">'+data.title_results+'</span></td><td><a href="javascript:void(0);" data-type="internation" class="link-continue btn btn-info">'+data.str_continue+' <span class="glyphicon glyphicon-share-alt"></span></a></td></tr></table></div>');
                        APPS_FLIGHT.count_flight();
                    }

                    APPS_FLIGHT.clear_cookie_flights_item();
                    //  APPS_FLIGHT.scroll_result_flight();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //alert(xhr.status);
                    //alert(thrownError);
                }
            });


        });
    },
    ajax_system_filter_item_internation: function () {
        "use strict";
        $(document).ready(function () {
            $(document).on('change', 'input[name="rad_mode_display_internation"],input[name="rad_list_sort_internation"],input.chk-list-airlines-internation,input.chk-list-stop-point', function () {
                APPS_FLIGHT.filter_change_internation()();
            });
        });
    },
    time_slider_filter_internation: function () {
        "use strict";
        $(document).ready(function () {

            // INTERNATION
            $("#slider-range-internation.time-depart-slider-internation").slider({
                range: true,
                min: 0,
                max: 24,
                values: [0, 24],
                slide: function (event, ui) {
                    $(".info-time-depart-internation span").text(ui.values[0] + "h" + " - " + ui.values[1] + "h");
                },
                change: function (event, ui) { APPS_FLIGHT.filter_change_internation(); }
            });

            // TIME RETURN
            $("#slider-range-internation.time-return-slider-internation").slider({
                range: true,
                min: 0,
                max: 24,
                values: [0, 24],
                slide: function (event, ui) {
                    $(".info-time-return-internation span").text(ui.values[0] + "h" + " - " + ui.values[1] + "h");
                },
                change: function (event, ui) { APPS_FLIGHT.filter_change_internation(); }
            });

        });
    },
    // GET DATA INTERNATION
    ajax_results_flights_internation: function () {
        "use strict";
        $(document).ready(function () {
            var itinerary = '';
            var departure = '';
            var destination = '';
            var departureDate = '';
            var returnDate = '';
            var adult = '';
            var child = '';
            var infant = '';
            var filter_airlines = '';

            var link_current_app = link_current.replace(/^.*tim-chuyen-bay\?/, '');
            var arr_link_current = link_current_app.split('&');
            var arr_itinerary = arr_link_current[0].split("=");
            itinerary = arr_itinerary[1];
            var arr_departure = arr_link_current[1].split("=");
            departure = arr_departure[1];
            var arr_destination = arr_link_current[2].split("=");
            destination = arr_destination[1];
            var arr_departuredate = arr_link_current[3].split("=");
            departureDate = arr_departuredate[1];
            var arr_returndate = (itinerary == 'Oneway') ? '' : arr_link_current[4].split("=");
            returnDate = arr_returndate[1];
            var arr_adult = arr_link_current[5].split("=");
            adult = arr_adult[1];
            var arr_child = arr_link_current[6].split("=");
            child = arr_child[1];
            var arr_infant = arr_link_current[7].split("=");
            infant = arr_infant[1];


            var count_arr_link_current = arr_link_current.length - 1;
            var arr_filter_airlines = arr_link_current[count_arr_link_current].split("=");
            if (arr_filter_airlines[0] == 'filter_airlines') {
                filter_airlines = arr_filter_airlines[1];
            }
            else {
                filter_airlines = '';
            }


            $('.box-loadding-flights').removeClass('hidden');
            $.cookie('s_l', 's_l');
            $.ajax({
                url: adminurl,
                type: 'post',
                cache: false,
                dataType: 'json',
                data: { action: 'ajax_results_flights_internation', itinerary: itinerary, adult: adult, child: child, infant: infant, departure: departure, destination: destination, departureDate: departureDate, returnDate: returnDate, filter_airlines: filter_airlines },
                success: function (data) {

                    $.cookie('s_l', '');
                    $('.box-loadding-flights').addClass('hidden');

                    $('.box-info-flight .btn-toggle-change-flight').removeClass('hidden');

                    $('.box-loadding-search-flight').addClass('hidden');
                    $('.box-main-content-flight').removeClass('hidden');

                    if (itinerary === 'Oneway') {
                        if (data.check_status == null) {
                            $.ajax({
                                url: adminurl,
                                type: 'post',
                                cache: false,
                                data: { action: 'ajax_get_form_email_flight_empty', itinerary: itinerary, adult: adult, child: child, infant: infant, departure: departure, destination: destination, departureDate: departureDate, returnDate: returnDate },
                                success: function (data) {
                                    $('.box-container-results.box-depart .tlb-depart').html(data);
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    //alert(xhr.status);
                                    //alert(thrownError);
                                }
                            });
                            $('.tlb-filter-airlines.filter-airlines-internation').html('');
                            $('.tlb-filter-stop-point.filter-point-internation').html('');
                        }
                        else {
                            $('.box-container-results.box-depart .tlb-depart').html(data.depart);
                            //  $('.box-container-results.box-depart .tlb-depart').after('<div class="box-continue"><table><tr><td><span class="title-continue">'+data.title_results+'</span></td><td><a href="javascript:void(0);" data-type="internation" class="link-continue btn btn-info">'+data.str_continue+' <span class="glyphicon glyphicon-share-alt"></span></a></td></tr></table></div>');

                            // list airlines
                            $.ajax({
                                url: adminurl,
                                type: 'post',
                                cache: false,
                                data: { action: 'ajax_get_list_checkbox_airlines', list_airlines: data.list_airlines },
                                success: function (data) {
                                    $('.tlb-filter-airlines.filter-airlines-internation').html(data);
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    //alert(xhr.status);
                                    //alert(thrownError);
                                }
                            });
                            // list stop point
                            $.ajax({
                                url: adminurl,
                                type: 'post',
                                cache: false,
                                data: { action: 'ajax_get_list_checkbox_stop_point', list_stop_point: data.list_stop_point },
                                success: function (data) {
                                    $('.tlb-filter-stop-point.filter-point-internation').html(data);
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    //alert(xhr.status);
                                    //alert(thrownError);
                                }
                            });

                            // **********************

                            APPS_FLIGHT.count_flight();
                        }
                    }
                    if (itinerary === 'Roundtrip') {
                        if (data.check_status == null) {
                            $.ajax({
                                url: adminurl,
                                type: 'post',
                                cache: false,
                                data: { action: 'ajax_get_form_email_flight_empty', itinerary: itinerary, adult: adult, child: child, infant: infant, departure: departure, destination: destination, departureDate: departureDate, returnDate: returnDate },
                                success: function (data) {
                                    $('.box-container-results.box-return .tlb-return').html(data);
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    //alert(xhr.status);
                                    //alert(thrownError);
                                }
                            });
                            $('.tlb-filter-airlines.filter-airlines-internation').html('');
                            $('.tlb-filter-stop-point.filter-point-internation').html('');
                        }
                        else {
                            // $('.box-container-results.box-depart .tlb-depart').html(data.depart);
                            $('.box-container-results.box-return .tlb-return').html(data.return);
                            //  $('.box-container-results.box-return .tlb-return').after('<div class="box-continue"><table><tr><td><span class="title-continue">'+data.title_results+'</span></td><td><a href="javascript:void(0);" data-type="internation" class="link-continue btn btn-info">'+data.str_continue+' <span class="glyphicon glyphicon-share-alt"></span></a></td></tr></table></div>');
                            $.ajax({
                                url: adminurl,
                                type: 'post',
                                cache: false,
                                data: { action: 'ajax_get_list_checkbox_airlines', list_airlines: data.list_airlines },
                                success: function (data) {
                                    $('.tlb-filter-airlines.filter-airlines-internation').html(data);
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    //alert(xhr.status);
                                    //alert(thrownError);
                                }
                            });

                            // list stop point
                            $.ajax({
                                url: adminurl,
                                type: 'post',
                                cache: false,
                                data: { action: 'ajax_get_list_checkbox_stop_point', list_stop_point: data.list_stop_point },
                                success: function (data) {
                                    $('.tlb-filter-stop-point.filter-point-internation').html(data);
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    //alert(xhr.status);
                                    //alert(thrownError);
                                }
                            });
                            APPS_FLIGHT.count_flight();
                        }
                    }

                    APPS_FLIGHT.clear_cookie_flights_item();
                    APPS.system_info_account();
                    //  APPS_FLIGHT.scroll_result_flight();



                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //alert(xhr.status);
                    //alert(thrownError);
                    $.cookie('s_l', '');

                }
            });
        });
    },


    //**** GET PRICE MONTH
    // GET TABLE PRICE LOWEST INTERNATION
    index_choose_search_book_week: function () {
        $(document).ready(function () {
            $("#chk-box-book-week").change(function () {
                var chk_val = $(this).val();
                var str_book_week = url_link_home + '/book-week';
                var str_tim_chuyen_bay = url_link_home + '/flightsearch';

                if (chk_val == 'false') { $(this).val("true"); $(".frm-box-full-flight").attr("action", str_book_week); }
                else { $(this).val("false"); $(".frm-box-full-flight").attr("action", str_tim_chuyen_bay); }
            });
        });
    },
    index_hover_item_price_table_week_gds: function () {
        "user_strict";
        $(document).ready(function () {
            $(document).on("mouseenter", ".tlb-booking-week-gds tr td.item-price", function () {

                $(".tlb-booking-week-gds tr td,.tlb-booking-week-gds tr th").removeClass("item-hover");

                var index_row = parseInt($(this).attr("data-index-row"));
                var index_column = parseInt($(this).attr("data-index-column")) + 2;
                for (var i = 1; i <= index_column; i++) { $(this).parent().find("td:nth-child(" + i + ")").addClass("item-hover"); }
                $(".tlb-booking-week-gds tr th:nth-child(" + index_column + ")").addClass("item-hover");
                for (var j = 0; j <= index_row; j++) { $(".tlb-booking-week-gds tr td[data-index-row=" + j + "]:nth-child(" + index_column + ")").addClass("item-hover"); }

            }).on("mouseenter", ".tlb-booking-week-gds tr td:nth-child(1),.tlb-booking-week-gds tr:nth-child(1)", function () {
                $(".tlb-booking-week-gds tr td,.tlb-booking-week-gds tr th").removeClass("item-hover");
            });

        });
    },
    index_ajax_get_list_price_table_week_gds: function (Itinerary, Departure, Destination, DepartureDate, ReturnDate, Adult, Child, Infant, type_device) {
        "user_strict";
        $.ajax({
            url: adminurl,
            type: 'post',
            cache: false,
            data: { action: 'index_ajax_get_list_price_table_week_gds', Itinerary: Itinerary, Departure: Departure, Destination: Destination, DepartureDate: DepartureDate, ReturnDate: ReturnDate, Adult: Adult, Child: Child, Infant: Infant, type_device: type_device },
            success: function (data) {
                $(".box-loading-book-week").addClass("hidden");
                $(".box-container-ajax-book-week").html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //alert(xhr.status);
                //alert(thrownError);
            }
        });

    },
    index_submit_search_flight_week_gds: function () {
        "user_strict";
        $(document).ready(function () {
            $(document).on("click", ".btn-submit-search-flight-week-gds", function () {
                //$('.frm-change-book-week').attr("action","./tim-chuyen-bay");
                $("form.frm-change-book-week").submit();
                //                $(".btn-search-form-vi").click(function(){
                //                    var itinerary_checked = $(".box-rad-way input[name='Itinerary']:checked").val();
                //                    var chk_date_roundtrip = $.trim($("#ngayveTem_vi").val());
                //                    if(itinerary_checked=='Oneway')
                //                    {
                //                        $(this).find("i").removeClass(".fa-search").addClass("fa-spin").addClass("fa-spinner");
                //                    }
                //                    else if(itinerary_checked=='Roundtrip' && chk_date_roundtrip!='')
                //                    {
                //                        $(this).find("i").removeClass(".fa-search").addClass("fa-spin").addClass("fa-spinner");
                //                    }
                //
                //                });
                //$(".btn-search-form-vi").trigger("click");
            });
        });
    },
    index_select_item_price_table_week_gds: function () {
        "user_strict";
        $(document).ready(function () {
            $(document).on("click", "table.tlb-booking-week-gds tr td.item-price", function () {
                var index_row = parseInt($(this).attr("data-index-row")) + 2;
                var index_column = parseInt($(this).attr("data-index-column")) + 2;

                $("table.tlb-booking-week-gds tr td,table.tlb-booking-week-gds tr th").removeClass("actived");

                $(this).addClass("actived");
                $("table.tlb-booking-week-gds tr th:nth-child(" + index_column + ")").addClass("actived");
                $("table.tlb-booking-week-gds tr:nth-child(" + index_row + ") td:nth-child(1)").addClass("actived");

                var str_date_return = $("table.tlb-booking-week-gds tr th:nth-child(" + index_column + ") span.column-date-of-week").text();
                var str_date_depart = $("table.tlb-booking-week-gds tr:nth-child(" + index_row + ") td:nth-child(1) span.row-date-of-week").text();
                $(".date-depart-book-week").text(str_date_depart);
                $(".date-return-book-week").text(str_date_return);

                $("#ngaydiTem_vi").val(str_date_depart);
                var str_date_depart_format = str_date_depart.replace(/\//g, "");
                $("#ngaydi_vi").val(str_date_depart_format);

                $("#ngayveTem_vi").val(str_date_return);
                var str_date_return_format = str_date_return.replace(/\//g, "");
                $("#ngayve_vi").val(str_date_return_format);

            });

        });

    },


    // GET PRICE LOWEST DOMESTIC
    create_class_price_month: function () {
        "use strict";
        var minPrice = 0;
        var maxPrice = 0;
        $('table.table-price-month tbody tr td div span.price').each(function () {

            var chk_td = $(this).parent().parent().attr("class");
            if (chk_td != 'disabled') {
                var text = $(this).text();
                if (text != "") {
                    var price = parseInt($.trim(text.replace(/\./g, '').replace(/ .*/g, '')));
                    if (price != 0) { $(this).closest('td').addClass('type-normal'); }
                    if (minPrice == 0) { minPrice = price; }
                    if (maxPrice == 0) { maxPrice = price; }
                    else {
                        if (minPrice > price) { minPrice = price; }
                        if (maxPrice < price) { maxPrice = price; }
                    }
                }
            }

        });

        $('table.table-price-month tbody tr td div span.price').each(function () {
            var chk_td = $(this).parent().parent().attr("class");
            if (chk_td != 'disabled') {
                var text = $(this).text();
                var price = parseInt($.trim(text.replace(/\./g, '').replace(/ .*/g, '')));
                if (price == minPrice) {
                    $(this).closest('td').removeClass("type-normal").addClass("type-lowest");
                }
                if (price == maxPrice) {
                    $(this).closest('td').removeClass("type-normal").addClass("type-highest");
                }
            }
        });

    },

    submit_search_data_month: function () {
        "use strict";
        $(document).ready(function () {
            $(document).on('click', '.btn-form-search-data-month', function () {

                var str_depart = $('input.txt-val-airports-depart-data-month').val();
                var str_return = $('input.txt-val-airports-return-data-month').val();
                var str_device = $('input.txt-device-data-month').val();
                var str_type = $('input.txt-type-data-month').val();
                var str_date_depart = $('input.txt-val-date-depart-data-month').val();
                var str_date_return = $('input.txt-date-return-data-month').val();
                var str_url = $('input.txt-url-data-month').val();
                var str_type_airlines = $('input.txt-type-airlines-data-month').val();
                if (str_type === '0') {
                    APPS_FLIGHT.get_price_month(str_url, str_type, str_device, str_depart, str_return, str_date_depart, str_date_return, str_type_airlines);
                }
            });
        });
    },
    // option selection airports, date
    get_airports_date_data_month: function () {
        "use strict";
        $(document).ready(function () {
            $(document).on('click', '.box-select-date.from ul li a', function () {
                var code_date = $(this).attr('data-month');
                var str_airports = $(this).text();
                $('.box-select-date.from .title-date-depart').text(str_airports);
                $('.box-select-date.from input.txt-val-date-depart-data-month').val(code_date);
            }); // END SELECTION DATE DEPART

            $(document).on('click', '.box-select-airports.from ul li a', function () {
                var code_airports = $(this).attr('data-code');
                var str_airports = $(this).text();
                $('.box-select-airports.from .title-airports-depart').text(str_airports);
                $('.box-select-airports.from input.txt-val-airports-depart-data-month').val(code_airports);
            }); // END SELECTION AIRPORTS DEPART

            $(document).on('click', '.box-select-airports.to ul li a', function () {
                var code_airports = $(this).attr('data-code');
                var str_airports = $(this).text();
                $('.box-select-airports.to .title-airports-return').text(str_airports);
                $('.box-select-airports.to input.txt-val-airports-return-data-month').val(code_airports);
            }); // END SELECTION AIRPORTS RETURN

        });
    },
    // button next pre month
    search_next_pre_data_month: function () {
        "use strict";
        $(document).ready(function () {
            $(document).on('click', 'a.next-month,a.back-month', function () {
                var str_month_year_depart = $(this).attr('data-date-month-depart');
                var data_depart = $(this).attr('data-depart');
                var data_return = $(this).attr('data-return');
                var data_url = $(this).attr('data-url');
                var data_type = $(this).attr('data-type');
                var data_device = $(this).attr('data-device');
                var data_type_airlines = $(this).attr('data-type-airlines');
                $('.title-date-depart').html(str_month_year_depart.replace('-', '/'));
                if (data_type === '0') {
                    APPS_FLIGHT.get_price_month(data_url, data_type, data_device, data_depart, data_return, str_month_year_depart, '', data_type_airlines);

                }

            });
        });
    },
    // submit to flight month
    find_flight_by_price_month: function () {
        "use strict";
        $(document).ready(function () {
            $(document).on('click', '.box-item-day', function () {

                var chk_td = $(this).parent().attr("class");
                if (chk_td != 'disabled') {
                    var item_day = $(this).find('.item-day').html().replace('ngÃ y ', '').replace(/<span.*/g, '');
                    item_day = (item_day.length === 1) ? '0' + item_day : item_day;
                    var str_month_year_depart = $(this).find('.item-day').attr('data-date-depart');
                    var str_full_date_depart = item_day + str_month_year_depart;
                    var data_depart = $(this).find('.item-day').attr('data-depart');
                    var data_return = $(this).find('.item-day').attr('data-return');
                    var data_url = $(this).find('.item-day').attr('data-url');
                    var data_type = ($(this).find('.item-day').attr('data-type') === '0') ? 'Oneway' : 'Roundtrip';
                    var data_device = $(this).find('.item-day').attr('data-device');

                    var str_full_link = data_url + '/tim-chuyen-bay?Itinerary=' + data_type + '&Departure=' + data_depart + '&Destination=' + data_return + '&DepartureDate=' + str_full_date_depart + '&ReturnDate=&Adult=1&Child=0&Infant=0&device=' + data_device;
                    if (data_type == 'Oneway') {
                        top.location.href = str_full_link;
                    }
                }


            });
        });
    }, // end submit to flight month
    get_price_month_tet: function (device, str_depart, str_return, date_depart) {
        "use strict";
        $(document).ready(function () {
            $('.loadding-data-price-month').removeClass('hidden');
            $.ajax({
                url: adminurl,
                type: 'post',
                cache: false,
                data: { action: 'ajax_get_table_price_month_domestic_tet', depart: str_depart, return: str_return, date_depart: date_depart, device: device },
                success: function (data) {
                    $('.data-month').html(data);
                    $('.loadding-data-price-month').addClass('hidden');
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //alert(xhr.status);
                    //alert(thrownError);

                }
            });
        });
    },
    get_price_month: function (url, type, device, str_depart, str_return, date_depart, date_return, type_airlines) {
        "use strict";
        $(document).ready(function () {
            $('.loadding-data-price-month').removeClass('hidden');
            $.ajax({
                url: adminurl,
                type: 'post',
                cache: false,
                data: { action: 'ajax_get_table_price_month', url: url, type: type, depart: str_depart, return: str_return, date_depart: date_depart, date_return: date_return, device: device, type_airlines: type_airlines },
                success: function (data) {
                    $('.loadding-data-price-month').addClass('hidden');
                    data = data.replace(/flynow.vn/g, 'vietnambooking');
                    data = data.replace(/Failed.*/, '');
                    $('.data-month').html(data);
                    APPS_FLIGHT.create_class_price_month();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //alert(xhr.status);
                    //alert(thrownError);

                }
            });
        });
    },
    // END GET PRICE MONTH

    // AJAX GET INFO COOKIES FLIGHTS
    apps_flight_load_data_when_action_tab_flight: function () {
        "use strict";
        $(document).ready(function () {
            var chk_load_data_flight = $("ul.nav.nav-tabs li.active a[aria-controls='form-flights']").text();
            chk_load_data_flight += $(".form-box-controller-tabs ul li.active a[aria-controls='form-box-default-flight']").text();
            $.cookie("load_data_flight", chk_load_data_flight, { path: '/' });
            if ($.cookie("load_data_flight") != '') {
                APPS_FLIGHT.apps_flight_system_form();
            }
            $("ul.nav.nav-tabs li,.form-box-controller-tabs ul li").click(function () {
                if ($.cookie("load_data_flight") == '') {
                    setTimeout(function () {
                        chk_load_data_flight = $("ul.nav.nav-tabs li.active a[aria-controls='form-flights']").text();
                        chk_load_data_flight += $(".form-box-controller-tabs ul li.active a[aria-controls='form-box-default-flight']").text();
                        $.cookie("load_data_flight", chk_load_data_flight, { path: '/' });
                        if ($.cookie("load_data_flight") != '') {
                            APPS_FLIGHT.apps_flight_system_form();
                        }
                    }, 300);
                }
            });
        });
    },

    apps_flight_system_form: function () {
        "use strict";
        APPS_FLIGHT.apps_flight_date_form();
        $(document).ready(function () {
            // EXCHANGE AIRPORT
            $(document).on('click', '.btn-exchange-airports', function () {
                var diemdi = $('#txt-input-diemdi-vi').val();
                var diemden = $('#txt-input-diemden-vi').val();
                var code_diemdi = $('.departure').val();
                var code_diemden = $('.destination').val();

                $('#txt-input-diemdi-vi').val(diemden);
                $('#txt-input-diemden-vi').val(diemdi);
                $('.departure').val(code_diemden);
                $('.destination').val(code_diemdi);
            });

            // RADIO TOGGLE

            $(".box-toggle-radio").click(function () {
                var toggle_on = $(this).find("i").hasClass("fa-toggle-on");
                if (toggle_on) { $('label[for="onewaytravel_vi"]').trigger("click"); }
                else { $('label[for="returntravel_vi"]').trigger("click"); }
            });

            $('.direction_vi').change(function () {
                var chk_val = $(this).val();
                var str_book_week = url_link_home + '/book-week';
                var str_tim_chuyen_bay = url_link_home + '/flightsearch';

                if (chk_val == 'Roundtrip') {
                    $(".box-toggle-radio i").removeClass("fa-toggle-off").addClass("fa-toggle-on");
                    $(".form-box-date-return").removeClass("hidden");
                    $('#ngayveTem_vi').attr('required', 'required');
                    $('#ngayve_vi').attr('required', 'required');

                    $(".lbl-box-book-week").removeClass("hidden");
                    if ($("#chk-box-book-week").val() == 'true') { $(".frm-box-full-flight").attr("action", str_book_week); }

                }
                else {
                    $(".box-toggle-radio i").removeClass("fa-toggle-on").addClass("fa-toggle-off");
                    $(".form-box-date-return").addClass("hidden");
                    $('#ngayveTem_vi').removeAttr('required');

                    $('#ngayve_vi').removeAttr('required');

                    $(".frm-box-full-flight").attr("action", str_tim_chuyen_bay);
                    $(".lbl-box-book-week").addClass("hidden");

                }

            });

            $('.direction_en').change(function () {
                var chk_val = $(this).val();
                if (chk_val == 'Roundtrip') {
                    $('#ngayveTem_en').removeClass('hidden').attr('required', 'required');
                    $('#ngayve_en').attr('required', 'required');
                }
                else {
                    $('#ngayveTem_en').addClass('hidden').removeAttr('required');
                    $('#ngayve_en').removeAttr('required');
                }

            });


            // CLEAR TEXT INPUT
            $('#txt-input-diemdi-vi,#txt-input-diemden-vi,#txt-input-diemdi-en,#txt-input-diemden-en').click(function () {
                $(this).val('');
                //$(this).focus();
                $(this).typeahead('val', null);
                //                $('#from').val(datum.Code);
                //                $('#to').val(null);
            });

        });


        $(function () {
            var configs = {
                getAllPlaceURL: url_link_bloginfo + '/libs/data_json/flight/list_airport.json'
            };
            var popularPlaces = [], allPlaces = [], toPlaces = [], toPopularPlaces = [], isMobile = false, getLocationRetry = 2, mainQuery = "";
            var bOpenDepartDate = false, bOpenReturnDate = false;
            var old_search_flight = localStorage.getItem('storage_form_flight_info');
            var old_search_flight_exp = localStorage.getItem('storage_form_flight_expire');
            old_search_flight_exp = (old_search_flight_exp != '') ? parseInt(old_search_flight_exp) : null;

            var onload = function () {
                if (old_search_flight != null) {
                    old_search_flight = JSON.parse(old_search_flight);
                    old_search_flight.DepartureDate = old_search_flight.NameDepartureDate.replace(/\//g, "");
                    old_search_flight.ReturnDate = old_search_flight.NameReturnDate.replace(/\//g, "");

                    if (old_search_flight != null && old_search_flight.Departure != null) {
                        if ($("form.frm-box-full-flight").hasClass("airport-single-post") === false) {
                            $('#txt-input-diemdi-vi').val(old_search_flight.NameDeparture);
                            $('#from').val(old_search_flight.Departure);
                            $('#txt-input-diemden-vi').val(old_search_flight.NameDestination);
                            $('#to').val(old_search_flight.Destination);
                        }

                        $("#nguoilon_vi").val(old_search_flight.Adult);
                        $("#treem_vi").val(old_search_flight.Child);
                        $("#embe_vi").val(old_search_flight.Infant);

                        $("#box-info-people .count-people.count-adult").text(old_search_flight.Adult);
                        $("#box-info-people .count-people.count-child").text(old_search_flight.Child);
                        $("#box-info-people .count-people.count-infant").text(old_search_flight.Infant);

                        $(".box-people.type-adult .btn-value").text(old_search_flight.Adult);
                        $(".box-people.type-child .btn-value").text(old_search_flight.Child);
                        $(".box-people.type-infant .btn-value").text(old_search_flight.Infant);

                        if (old_search_flight.Itinerary == 'Roundtrip') {
                            $('label[for="returntravel_vi"]').trigger("click");
                            $("#ngayve_vi").val(old_search_flight.ReturnDate);
                            $("#ngayveTem_vi").val(old_search_flight.NameReturnDate);
                            $(".box-info-input-last .box-toggle-radio i").removeClass("fa-toggle-off").addClass("fa-toggle-on");
                            $(".box-info-input-last .form-box-date-return").removeClass("hidden");
                            setTimeout(100, function () {
                                $(".box-info-input-last .box-toggle-radio").trigger("click");
                            });

                        }

                    }
                } // VALID  AIRPORT PEOPLE
                else {
                    if ($("form.frm-box-full-flight").hasClass("airport-single-post") === false) {
                        $('#txt-input-diemdi-vi').val("Há»“ ChÃ­ Minh, Viá»‡t Nam (SGN)");
                        $('#from').val("SGN");
                        $('#txt-input-diemden-vi').val("HÃ  Ná»™i, Viá»‡t Nam (HAN)");
                        $('#to').val("HAN");
                    }

                } // VALID AIRPORT PEOPLE

                if (old_search_flight_exp != null && (old_search_flight_exp + 43200000 > (new Date().getTime()))) {
                    //>12 hours
                    $("#ngaydi_vi").val(old_search_flight.DepartureDate);
                    $("#ngaydiTem_vi").val(old_search_flight.NameDepartureDate);
                } // VALID DATE
                else {
                    var today = new Date(); today.setDate(today.getDate() + 10); var dd = today.getDate(); var mm = today.getMonth() + 1; var yyyy = today.getFullYear();
                    var str_mm = (mm <= 9) ? '0' + mm : mm;
                    var str_dd = (dd <= 9) ? '0' + dd : dd;
                    var str_date_hidden = str_dd + '' + str_mm + '' + yyyy;
                    var str_date_show = str_dd + '/' + str_mm + '/' + yyyy;
                    $("#ngaydi_vi").val(str_date_hidden);
                    $("#ngaydiTem_vi").val(str_date_show);
                } // VALID DATE
            }

            var getAllPlace = function () {
                $.ajax({
                    type: "GET",
                    url: configs.getAllPlaceURL,
                    async: true,
                    success: function (data) {
                        allPlaces = data;
                        popularPlaces = [];
                        for (var i = 0; i < allPlaces.length; i++) {
                            allPlaces[i].Name = allPlaces[i].City + (allPlaces[i].Country ? (', ' + allPlaces[i].Country) : '') + (allPlaces[i].Airport ? (' - ' + allPlaces[i].Airport) : '') + ' (' + allPlaces[i].Code + ')';
                            //allPlaces[i].Name = allPlaces[i].City + (allPlaces[i].Country ? (', ' + allPlaces[i].Country) : '') + ' (' + allPlaces[i].Code + ')';
                            allPlaces[i].NameRaw = cleanWords(allPlaces[i].Name);
                            if (i < 10) {
                                popularPlaces.push(allPlaces[i]);
                            }
                        }
                        if (old_search_flight != null && old_search_flight.Departure != null) {
                            changeDataSourceToPlace(old_search_flight.Departure);
                        }
                        else { changeDataSourceToPlace('SGN'); }

                    },
                    complete: function () {
                    },
                    error: function () {
                        if (getLocationRetry > 0) { // Retry 2 times when we have any errors
                            getLocationRetry--;
                            getLocations();
                        }
                    }
                })
            }

            var cleanWords = function (stringToClean) {
                stringToClean = jsHelper.remove_unicode($.trim(stringToClean.toLowerCase()));
                stringToClean = stringToClean.replaceAll('-', ' ');
                stringToClean = stringToClean.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                return stringToClean;
            }

            var fullTextCompare = function (queryStr, textToCompare) {
                textToCompare = jsHelper.remove_unicode($.trim(textToCompare.toLowerCase()));
                textToCompare = textToCompare.replaceAll('-', ' ');

                queryStr = jsHelper.remove_unicode($.trim(queryStr.toLowerCase()));
                queryStr = queryStr.replaceAll('-', ' ');
                queryStr = queryStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                var arrWords = queryStr.split(" ");
                //Encapsulate your words inside regex groups
                arrWords = $.map(arrWords, function (n) {
                    return ["(?=.*" + n + ")"];
                });
                //Create a regex pattern
                sRegex = new RegExp("^" + arrWords.join("") + ".*$", "im");
                //Execute the regex match

                return (textToCompare.match(sRegex) === null ? false : true);
            }

            var matcher = function (query, data, syncResults) {
                if (!jsHelper.isBlank(query)) {
                    var matches = [];
                    query = cleanWords(query);
                    var substrRegex = new RegExp(query, 'i');

                    $.each(data, function (i, object) {
                        var name = object.NameRaw;
                        if (substrRegex.test(name)) {
                            matches.push(object);
                        }
                    });
                    syncResults(matches);
                }
            }

            var mainQuery = "";

            if ($("#detectMobileDiv").css("display") == "none") {
                isMobile = true;
            }

            var changeDataSourceToPlace = function (fromPlaceCode) {
                toPlaces = [];
                toPopularPlaces = [];
                if (fromPlaceCode != null) {
                    for (var i = 0; i < allPlaces.length; i++) {
                        if (allPlaces[i].Code != fromPlaceCode) {
                            toPlaces.push(allPlaces[i]);
                            if (toPopularPlaces.length < 10) {
                                toPopularPlaces.push(allPlaces[i]);
                            }
                        }
                    }
                }
                setTypeAheadToPlace();
            }

            var setTypeAheadToPlace = function () {
                $('#txt-input-diemden-vi')
                    .typeahead("destroy")
                    .typeahead({
                        hint: false,
                        highlight: false,
                        minLength: 0
                    },
                        {
                            displayKey: 'Name',
                            name: 'toPopularPlaces',
                            source: function (query, syncResults) {
                                if (jsHelper.isBlank(query)) {
                                    syncResults(toPopularPlaces);
                                }
                            },
                            limit: 10,
                            templates: {
                                header: '<h5 class="dataTitle">Äá»‹a Ä‘iá»ƒm phá»• biáº¿n</h5>',
                                suggestion: function (data) {
                                    var template = '<div><b class="typeahead-flightcode v-margin-right-5">' + data.Code + '</b> <span>' + data.City + (data.Country ? (', ' + data.Country) : '') + (data.Airport ? (' - ' + data.Airport) : '') + '</span></div>';
                                    //var template = '<div><b class="typeahead-flightcode v-margin-right-5">' + data.Code + '</b> <span>' + data.City + (data.Country ? (', ' + data.Country) : '') + '</span></div>';
                                    return template;
                                }
                            }
                        },
                        {
                            displayKey: 'Name',
                            name: 'toPlaces',
                            source: function (query, syncResults) {
                                if (!jsHelper.isBlank(query)) {
                                    mainQuery = query;
                                    matcher(query, toPlaces, syncResults);
                                }
                            },
                            limit: 10,
                            templates: {
                                header: '<h5 class="dataTitle">Äá»‹a Ä‘iá»ƒm</h5>',
                                suggestion: function (data) {
                                    var template = '<div><b class="typeahead-flightcode v-margin-right-5">' + data.Code + '</b> <span>' + data.City + (data.Country ? (', ' + data.Country) : '') + (data.Airport ? (' - ' + data.Airport) : '') + '</span></div>';
                                    //var template = '<div><b class="typeahead-flightcode v-margin-right-5">' + data.Code + '</b> <span>' + data.City + (data.Country ? (', ' + data.Country) : '') + '</span></div>';
                                    return template;
                                }
                            }
                        })
                    .on({
                        'typeahead:selected typeahead:autocompleted': function (e, datum) {
                            $('#to').val(datum.Code);
                            if (!bOpenDepartDate) {
                                bOpenDepartDate = true;
                                $('#ngaydiTem_vi').focus();
                            }
                            //else $('.searchButton').focus();
                        },
                        'change': function (e) {
                            if (e.target.value == null || e.target.value == '') {
                                $('#to').val(null);
                            }
                        },
                        'typeahead:render': function (e, datum) {
                            $(".tt-suggestion").mark(mainQuery);
                        },
                        'keyup': function (e) { }
                    });
            }

            var setTypeAheadFromPlace = function () {
                $('#txt-input-diemdi-vi')
                    .typeahead({
                        hint: false,
                        highlight: false,
                        minLength: 0,
                    },
                        {
                            displayKey: 'Name',
                            name: 'popularplaces',
                            source: function (query, syncResults) {
                                if (jsHelper.isBlank(query)) {
                                    syncResults(popularPlaces);
                                }
                            },
                            limit: 10,
                            templates: {
                                header: '<h5 class="dataTitle">Äá»‹a Ä‘iá»ƒm phá»• biáº¿n</h5>',
                                suggestion: function (data) {
                                    var template = '<div><b class="typeahead-flightcode v-margin-right-5">' + data.Code + '</b> <span>' + data.City + (data.Country ? (', ' + data.Country) : '') + (data.Airport ? (' - ' + data.Airport) : '') + '</span></div>';
                                    //var template = '<div><b class="typeahead-flightcode v-margin-right-5">' + data.Code + '</b> <span>' + data.City + (data.Country ? (', ' + data.Country) : '') + '</span></div>';
                                    return template;
                                }
                            }
                        },
                        {
                            displayKey: 'Name',
                            name: 'allPlaces',
                            source: function (query, syncResults) {
                                if (!jsHelper.isBlank(query)) {
                                    mainQuery = query;
                                    matcher(query, allPlaces, syncResults);
                                }

                            },
                            limit: 10,
                            templates: {
                                header: '<h5 class="dataTitle">Äá»‹a Ä‘iá»ƒm</h5>',
                                suggestion: function (data) {
                                    var template = '<div><b class="typeahead-flightcode v-margin-right-5">' + data.Code + '</b> <span>' + data.City + (data.Country ? (', ' + data.Country) : '') + (data.Airport ? (' - ' + data.Airport) : '') + '</span></div>';
                                    //var template = '<div><b class="typeahead-flightcode v-margin-right-5">' + data.Code + '</b> <span>' + data.City + (data.Country ? (', ' + data.Country) : '') + '</span></div>';
                                    return template;
                                }
                            }
                        })
                    .on({
                        'typeahead:selected typeahead:autocompleted': function (e, datum) {
                            var fromPlaceCode;
                            var bFocusOnToPlace = false;
                            if (datum.Type == "flight") {
                                $('#txt-input-diemdi-vi').typeahead('val', datum.Origin.Name);
                                $('#txt-input-diemden-vi').typeahead('val', datum.Destination.Name);
                                $('#from').val(datum.Origin.Code);
                                $('#to').val(datum.Destination.Code);
                                fromPlaceCode = datum.Origin.Code;

                            }
                            else if (datum.Type == "place") {
                                $('#txt-input-diemden-vi').typeahead('val', null);
                                $('#from').val(datum.Code);
                                $('#to').val(null);
                                fromPlaceCode = datum.Code;
                                bFocusOnToPlace = true;
                            }
                            changeDataSourceToPlace(fromPlaceCode);
                            if (bFocusOnToPlace) $('#txt-input-diemden-vi').focus();
                            else if (!bOpenDepartDate) {
                                bOpenDepartDate = true;
                                $('#ngaydiTem_vi').focus();
                            }
                            //else $('.searchButton').focus();

                        },
                        'change': function (e) {
                            if (e.target.value == null || e.target.value == '') {
                                toPlaces = [];
                                toPopularPlaces = [];
                                $('#txt-input-diemden-vi').typeahead('val', null);
                                $('#from').val(null);
                                $('#to').val(null);
                                changeDataSourceToPlace(null);
                            }
                        },
                        'typeahead:render': function (e, datum) {

                            $(".tt-suggestion").mark(mainQuery);
                        },
                        'keyup': function (e) { }
                    })
            }

            String.prototype.replaceAll = function (search, replacement) {
                var target = this;
                return target.replace(new RegExp(search, 'g'), replacement);
            };

            onload();
            getAllPlace();

            setTypeAheadFromPlace();
            setTypeAheadToPlace();

            $(".btn-submit-form-flight").click(function () {
                var isValid = true;
                if (jsHelper.isBlank($('#from').val())) {
                    $('#txt-input-diemdi-vi').focus();
                    isValid = false;
                }
                if (isValid && jsHelper.isBlank($('#to').val())) {
                    $('#txt-input-diemden-vi').focus();
                    isValid = false;
                }
                var chk_itinerary = $('input[name="Itinerary"]:checked').val();
                if (chk_itinerary === 'Roundtrip' && isValid && jsHelper.isBlank($('#ngayve_vi').val())) {
                    $('#ngayveTem_vi').focus();
                    isValid = false;
                }
                var adult = parseInt($('#nguoilon_vi').val());
                var child = parseInt($('#treem_vi').val());
                var infant = parseInt($('#embe_vi').val());
                if (adult + child + infant > 9 || infant > adult) {
                    isValid = false;
                    swal({
                        title: 'Sá»‘ khÃ¡ch khÃ´ng há»£p lá»‡',
                        text: 'Vietnam Booking phá»¥c vá»¥ tá»‘i Ä‘a 9 hÃ nh khÃ¡ch vÃ  má»—i ngÆ°á»i lá»›n chá»‰ Ä‘i kÃ¨m 1 em bÃ©',
                        showConfirmButton: true,
                        showLoaderOnConfirm: false,
                        allowEscapeKey: true,
                        allowOutsideClick: true
                    });
                }
                if (isValid) {
                    $(this).find("i").removeClass("fa-search").addClass("fa-spin").addClass("fa-spinner");
                    localStorage.setItem('storage_form_flight_info', JSON.stringify(jsHelper.getFormData($(this).closest('form'))));
                    localStorage.setItem('storage_form_flight_expire', new Date().getTime());

                    $(this).closest('form').submit();
                }
            });


            // SELECT INPUT
            //            $("#txt-input-diemdi-vi").focus(function () {
            //                setTimeout(function () {
            //                    document.getElementById("txt-input-diemdi-vi").setSelectionRange(0, 9999);
            //                }, 1);
            //            });
            // SELECT INPUT
            //            $("#txt-input-diemden-vi").focus(function () {
            //                setTimeout(function () {
            //                    document.getElementById("txt-input-diemden-vi").setSelectionRange(0, 9999);
            //                }, 1);
            //            });
        });

    },
    apps_flight_date_form: function () {
        "use strict";
        $(document).ready(function () {

            if ($.datepicker != undefined) {
                $.datepicker.setDefaults($.datepicker.regional['vn']);
            }

            // GET TEXT  LUNAR CHOOSE DEPART
            var date_depart = $('#ngaydiTem_vi').val();
            if ($.trim(date_depart) != '') {
                var arr_date_depart = date_depart.split("/");
                var month_depart = arr_date_depart[1].split("0");
                if (month_depart[1] != '') { month_depart = month_depart[1]; }
                else { month_depart = arr_date_depart[1]; }
                var date_luna_depart = GetDateString(parseInt(arr_date_depart[0]), parseInt(arr_date_depart[1]), parseInt(arr_date_depart[2]));
                $('.departureDateLunar-vi,.departureDateLunar-en').text(date_luna_depart);

            }



            // GET TEXT  LUNAR CHOOSE RETURN
            var date_return = $('#ngayveTem_vi').val();
            if ($.trim(date_return) != '') {
                var arr_date_return = date_return.split("/");
                var month_return = arr_date_return[1].split("0");
                if (month_return[1] != '') { month_return = month_return[1]; }
                else { month_return = arr_date_return[1]; }
                var date_luna_return = GetDateString(parseInt(arr_date_return[0]), parseInt(arr_date_return[1]), parseInt(arr_date_return[2]));
                $('.returnDateLunar-vi,.returnDateLunar-en').text(date_luna_return);
            }

            var d = new Date();
            var min_date = (d.getHours() >= 21) ? 1 : 0;

            // VIETNAMESE
            $("#ngaydiTem_vi").datepickerlunar({

                dateFormat: "dd/mm/yy",
                altField: "#ngaydi_vi",
                altFormat: "ddmmyy",
                minDate: min_date,
                numberOfMonths: 1,
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass('ui-helper-hidden-accessible');
                    if ($(input).prop('disabled')) { return false; }
                    $('#ui-datepicker-div').addClass("flight-box-date");
                },
                onSelect: function (datetext, inst) {
                    //console.log(inst);
                },
                onClose: function (datetext, inst) {
                    //$(this).trigger('change');
                    //   alert(inst.dpDiv);
                    var date = $(this).datepickerlunar('getDate'),
                        day = date.getDate(),
                        month = date.getMonth() + 1,
                        year = date.getFullYear();
                    var date_luna_departure = GetDateString(day, month, year);
                    $('.departureDateLunar-vi').text(date_luna_departure);
                    $("#ngayveTem_vi").datepickerlunar("option", "minDate", date);
                },

            });
            // ngay ve
            $("#ngayveTem_vi").datepickerlunar({
                dateFormat: "dd/mm/yy",
                altField: "#ngayve_vi",
                altFormat: "ddmmyy",
                numberOfMonths: 1,
                minDate: 0,
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass('ui-helper-hidden-accessible');
                    if ($(input).prop('disabled')) { return false; }
                    $('#ui-datepicker-div').addClass("flight-box-date");
                },
                onSelect: function (datetext, inst) {
                    //console.log(inst);
                },
                onClose: function (datetext, inst) {

                    if ($(this).val() != '') {
                        var date = $(this).datepickerlunar('getDate'),
                            day = date.getDate(),
                            month = date.getMonth() + 1,
                            year = date.getFullYear();
                        var date_luna_departure = GetDateString(day, month, year);
                        $('.return-date-lunar').show();
                        $('.returnDateLunar-vi').text(date_luna_departure);

                        $("#ngaydiTem_vi").datepickerlunar("option", "maxDate", date);
                    }

                }
            });

            // ENGLISH
            $("#ngaydiTem_en").datepickerlunar({

                dateFormat: "dd/mm/yy",
                altField: "#ngaydi_en",
                altFormat: "ddmmyy",
                minDate: 0,
                numberOfMonths: 1,
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass('ui-helper-hidden-accessible');

                    if ($(input).prop('disabled')) {
                        return false;
                    }
                },
                onSelect: function (datetext, inst) {
                    //console.log(inst);
                },
                onClose: function (datetext, inst) {
                    //$(this).trigger('change');
                    //   alert(inst.dpDiv);
                    var date = $(this).datepickerlunar('getDate'),
                        day = date.getDate(),
                        month = date.getMonth() + 1,
                        year = date.getFullYear();
                    var date_luna_departure = GetDateString(day, month, year);
                    $('.departureDateLunar-en').text(date_luna_departure);

                    $("#ngayveTem_en").datepickerlunar("option", "minDate", date);
                },

            });
            // ngay ve
            $("#ngayveTem_en").datepickerlunar({
                dateFormat: "dd/mm/yy",
                altField: "#ngayve_en",
                altFormat: "ddmmyy",
                numberOfMonths: 1,
                minDate: 0,
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass('ui-helper-hidden-accessible');

                    if ($(input).prop('disabled')) {
                        return false;
                    }
                },
                onSelect: function (datetext, inst) {
                    //console.log(inst);
                },
                onClose: function (selectedDate) {
                    if ($(this).val() != '') {
                        var date = $(this).datepickerlunar('getDate'),
                            day = date.getDate(),
                            month = date.getMonth() + 1,
                            year = date.getFullYear();
                        var date_luna_departure = GetDateString(day, month, year);
                        $('.return-date-lunar').show();
                        $('.returnDateLunar-en').text(date_luna_departure);

                        $("#ngaydiTem_en").datepickerlunar("option", "maxDate", date);
                    }

                }
            });

        });
    },
    // COUNT PEPOLE
    apps_flight_count_people_form: function (cls_box_parent) {
        $(document).ready(function () {
            $(cls_box_parent + " button.type-button").click(function () {
                var num_people_current = $(cls_box_parent).find("input").val();
                var num_people_count = parseInt(num_people_current);



                var num_adult = parseInt($("#nguoilon_vi").val());
                var num_child = parseInt($("#treem_vi").val());
                var num_infant = parseInt($("#embe_vi").val());
                var total_people = num_adult + num_child + num_infant;

                var chk_type = $(this).hasClass("type-plus");
                if (chk_type) {

                    var temp_num_adult = num_adult + 1;
                    var temp_num_child = num_child + 1;
                    var temp_num_infant = num_infant + 1;

                    var temp_num_people_count = total_people + 1;
                    var chk_adult = $(cls_box_parent).hasClass("type-adult");
                    var chk_child = $(cls_box_parent).hasClass("type-child");
                    var chk_infant = $(cls_box_parent).hasClass("type-infant");
                    if (temp_num_people_count <= 11) {
                        if (temp_num_infant <= 4 && chk_infant) { num_people_count = num_people_count + 1; }
                        else if (temp_num_adult <= 7 && chk_adult) { num_people_count = num_people_count + 1; }
                        else if (chk_child && temp_num_child <= 6) { num_people_count = num_people_count + 1; }

                    }
                } // TYPE PLUS
                else {
                    var chk_adult = $(cls_box_parent).hasClass("type-adult");
                    if (num_people_current > 0) {
                        if (num_people_current == 1 && chk_adult) { }
                        else {
                            num_people_count = parseInt(num_people_current) - 1;
                        }

                    }

                } // TYPE MINUS

                var chk_adult = $(cls_box_parent).hasClass("type-adult");
                if (chk_adult) { $("#box-info-people .box-title-user").find(".count-people.count-adult").text(num_people_count); }

                var chk_child = $(cls_box_parent).hasClass("type-child");
                if (chk_child) { $("#box-info-people .box-title-user").find(".count-people.count-child").text(num_people_count); }

                var chk_infant = $(cls_box_parent).hasClass("type-infant");
                if (chk_infant) { $("#box-info-people .box-title-user").find(".count-people.count-infant").text(num_people_count); }

                $(cls_box_parent).find(".btn-value").text(num_people_count);
                $(cls_box_parent).find("input").val(num_people_count);


            });
        });
    },

    apps_flight_ajax_data_airport_depart_location: function (arr_data) {
        $(document).ready(function () {

            var data_obj = { flight_code_depart: arr_data.flight_code_depart, flight_code_return: arr_data.flight_code_return };
            $.ajax({
                url: adminurl,
                type: 'post',
                cache: false,
                dataType: 'JSON',
                data: { action: 'api_flight_support_ajax_data_airport_depart_location', data_obj: data_obj },
                success: function (data) {
                    if (data.full_depart != null) {
                        var full_depart = data.full_depart;
                        var code_depart = data.code_depart;
                        $('#txt-input-diemdi-vi').val(full_depart);
                        $('#from').val(code_depart);
                    }


                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //alert(xhr.status);
                    //alert(thrownError);
                }
            });
        });
    }
};
APPS_FLIGHT.init();
