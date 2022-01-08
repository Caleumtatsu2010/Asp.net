var APPS_FLIGHT_MASTER = {
    init: function () {


        this.api_flight_loading_process_flight();
        this.api_flight_toggle_change_form_flight();
        this.api_flight_system_filter();
        this.api_flight_system_lowest_price();
        this.api_flight_system_count_price_date();
        this.api_flight_system_toggle_tab_info_flight();
        this.api_flight_system_process_flight_RT();
        this.api_flight_system_process_selected_flight();

        this.api_flight_system_page_booking();

        this.api_flight_system_page_payment();

        this.api_flight_system_page_order_confirmation();

    },

    // order confirmation
    api_flight_system_websocket_update_order_flight: function (data) {
        var socket = io("https://vnbk.herokuapp.com");
        socket.emit("emit_query_update_order_flight_vnbk", data);
    },
    api_flight_system_page_order_confirmation: function () {

        $(document).ready(function () {
            $(".box-title-item.type-action").click(function () {
                var data_type = $(this).data("type");
                var chk_active = $(this).hasClass("active");
                if (chk_active) {
                    $(this).removeClass("active");
                    $(".box-content-item.type-" + data_type).addClass("hidden");
                }
                else {
                    $(this).addClass("active");
                    $(".box-content-item.type-" + data_type).removeClass("hidden");
                }


            });
        });
    },

    // page payment
    api_flight_system_get_param_url: function (sParam) {

        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    },

    api_flight_system_count_down_time: function (sParam) {
        var time_remain_limit = sParam.time_remain_limit;
        var arr_time = time_remain_limit.split(":");
        var today = new Date();
        today.setHours(today.getHours() + parseInt(arr_time[0]));
        today.setMinutes(today.getMinutes() + parseInt(arr_time[1]));
        today.setSeconds(today.getSeconds() + parseInt(arr_time[2]));

        var str_id_tag = sParam.id_tag;
        var countDownDate = new Date(today).getTime();
        // Update the count down every 1 second
        var x = setInterval(function () {
            // Get today's date and time
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            var str_seconds = (seconds < 10) ? '0' + seconds : seconds;
            var str_minutes = (minutes < 10) ? '0' + minutes : minutes;
            // Display the result in the element with id="demo"
            document.getElementById(str_id_tag).innerHTML = '0' + hours + ":"
                + str_minutes + ":" + str_seconds + "";

            // If the count down is finished, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById(str_id_tag).innerHTML = "00:00:00";

                $(document).ready(function () {
                    $("#" + str_id_tag).parents(".tab-pane").find(".box-content").addClass("hidden");
                    $("#" + str_id_tag).parents(".tab-pane").find(".box-expired-payment").removeClass("hidden");
                    $("#" + str_id_tag).parents(".tab-pane").find(".box-count-down-time").addClass("hidden");
                });

            }
        }, 100);

    },

    api_flight_system_page_payment: function () {

        function process_export_promo_voucher_payment(arr_query_promo_voucher_payment) {
            var chk_type_input = true;
            var type = arr_query_promo_voucher_payment.type;
            var chk_toggle_promo_voucher = $(".box-promo-voucher.type-" + type).find(".box-input-voucher").hasClass("hidden");
            var arr_promo_voucher = new Array();
            if (!chk_toggle_promo_voucher) {
                var val_promo_voucher = $.trim($(".box-promo-voucher.type-" + type).find(".box-input-voucher input").val());
                if (val_promo_voucher == '') {
                    chk_type_input = false;
                    $(".box-promo-voucher.type-" + type).find(".box-note-voucher").addClass("active");
                    $(".box-promo-voucher.type-" + type).find(".box-note-voucher").text("Xin vui lÃ²ng nháº­p thÃ´ng tin");
                    $(".box-promo-voucher.type-" + type).find(".box-input-voucher input").focus();
                }
                var chk_promo_voucher_active = $(".box-promo-voucher-active.type-" + type).hasClass("hidden");
                if (val_promo_voucher != '' && chk_promo_voucher_active) {
                    chk_type_input = false;
                    $(".box-promo-voucher.type-" + type).find(".box-note-voucher").addClass("active");
                    $(".box-promo-voucher.type-" + type).find(".box-note-voucher").text("Xin vui lÃ²ng click Ã¡p dá»¥ng.");
                    $(".box-promo-voucher.type-" + type).find(".box-input-voucher input").focus();
                }
                arr_promo_voucher = { code_voucher: val_promo_voucher };

            }
            var arr_info_promo_voucher = { info: arr_promo_voucher, is_valid: chk_type_input }
            return arr_info_promo_voucher;
        }
        function process_export_order_payment(arr_query_export_order) {
            var chk_type_input = true;
            var type = arr_query_export_order.type;
            var chk_export_order_home = $("#chk-export-order-" + type).is(":checked");
            var arr_export_order = {};
            if (chk_export_order_home) {
                $(".box-export-order-item.type-" + type + " .type-value").each(function () {
                    var str_this = $(this);
                    var name = str_this.data("name");
                    arr_export_order[name] = str_this.val();

                    var is_valid = APPS_FLIGHT_MASTER.api_flight_process_valid_return_data(str_this);
                    if (!is_valid) { chk_type_input = false; }

                });
            }
            var arr_info_export_order = { info: arr_export_order, is_valid: chk_type_input };

            return arr_info_export_order;
        }

        $(document).ready(function () {

            $(".btn-submit-complete-payment.type-bank-transfer").click(function () {
                $(this).attr("disabled", "disabled");
                var auth = APPS_FLIGHT_MASTER.api_flight_system_get_param_url("auth");
                var id = APPS_FLIGHT_MASTER.api_flight_system_get_param_url("id");
                var iid = APPS_FLIGHT_MASTER.api_flight_system_get_param_url("iid");
                var arr_query = { auth: auth, id: id, iid: iid };

                $.ajax({
                    url: adminurl,
                    type: 'post',
                    cache: false,
                    dataType: "json",
                    data: { action: 'api_flight_select_payment_ajax_update_method_bank_transfer', arr_query: arr_query },
                    success: function (data) {
                        if (data.is_error == false) {
                            swal.fire({
                                title: "Lá»±a chá»n thanh toÃ¡n hoÃ n táº¥t.",
                                text: "ChÃºng tÃ´i Ä‘ang chuyá»ƒn báº¡n qua trang xÃ¡c nháº­n!",
                                type: "success",
                                button: "OK",
                            }).then(function () {
                                window.location.href = data.url_full_link;
                            });
                            setTimeout(function () { window.location.href = data.url_full_link; }, 10000);
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        //alert(xhr.status);
                        //alert(thrownError);
                    }
                });

            });

            $(".btn-cancel-using-voucher").click(function () {
                var str_box_parents = $(this).parents(".box-container-promo-voucher");
                str_box_parents.find(".box-promo-voucher").removeClass("hidden");
                str_box_parents.find(".box-promo-voucher-active").addClass("hidden");

                var str_tabpane_parents = $(this).parents(".tab-pane");
                str_tabpane_parents.find(".box-content.type-price .tr-promo-voucher").addClass("hidden");
                var total_price_format = str_tabpane_parents.find(".box-content.type-price .box-total-price").data("price-format");
                str_tabpane_parents.find(".box-content.type-price .box-total-price div:last-child").text(total_price_format + ' VND');
            });
            $(".box-input-voucher button").click(function () {

                var str_tabpane_parents = $(this).parents(".tab-pane");
                var str_box_parents = $(this).parents(".box-container-promo-voucher");
                var str_input = $(this).parents(".box-input-voucher").find("input");
                var str_box_note_voucher = $(this).parents(".box-promo-voucher").find(".box-note-voucher");
                var code_voucher = $.trim(str_input.val());
                if (code_voucher != '') {
                    var id_booking = APPS_FLIGHT_MASTER.api_flight_system_get_param_url("id");
                    var auth = APPS_FLIGHT_MASTER.api_flight_system_get_param_url("auth");

                    var total_price = str_tabpane_parents.find(".box-content.type-price .box-total-price").data("price");
                    var arr_query = { code_voucher: code_voucher, total_price: total_price, id_booking: id_booking, auth: auth };
                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        cache: false,
                        dataType: "json",
                        data: { action: 'api_flight_select_payment_ajax_info_voucher', arr_query: arr_query },
                        success: function (data) {
                            if (data.error == 0) {
                                str_box_parents.find(".box-promo-voucher").addClass("hidden");
                                str_box_parents.find(".box-promo-voucher-active").removeClass("hidden");
                                str_box_parents.find(".box-promo-voucher-active .name-voucher").text("-" + data.info_voucher.value_voucher_format);
                                str_tabpane_parents.find(".box-content.type-price .tr-promo-voucher").removeClass("hidden");
                                str_tabpane_parents.find(".box-content.type-price .tr-promo-voucher td:last-child").text("-" + data.info_voucher.value_voucher_format);
                                str_tabpane_parents.find(".box-content.type-price .box-total-price div:last-child").text(data.info_voucher.total_price_format);
                            }
                            else if (data.error == 1) { str_input.focus(); str_box_note_voucher.addClass("active").text(data.note_error); }

                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            //alert(xhr.status);
                            //alert(thrownError);
                        }
                    });

                }
                else { str_input.focus(); str_box_note_voucher.addClass("active").text("Xin vui lÃ²ng nháº­p thÃ´ng tin"); }
            });

            $(document).on("input", ".box-promo-voucher .box-input-voucher input", function () {
                $(this).parents(".box-promo-voucher").find(".box-note-voucher").removeClass("active");
            });

            $(".chk-agree-rules").change(function () {
                var chk_rule = $(this).is(":checked");
                if (chk_rule) { $(this).parents(".box-rules").find(".note-rules").removeClass("active"); }
            });

            $(".btn-submit-payment-flight").click(function () {
                var type_data = $(this).data("type");

                var arr_query_export_order = { type: type_data };
                var arr_export_order = process_export_order_payment(arr_query_export_order);
                var is_valid_export_order = arr_export_order.is_valid;
                var info_export_order = arr_export_order.info;

                var arr_query_promo_voucher = { type: type_data };
                var arr_promo_voucher = process_export_promo_voucher_payment(arr_query_promo_voucher);
                var is_valid_promo_voucher = arr_promo_voucher.is_valid;
                var info_promo_voucher = arr_promo_voucher.info;

                var chk_agree_rule = $(this).parents(".box-content.type-price").find("#chk-agree-rules-" + type_data).is(":checked");
                if (!chk_agree_rule) { $(this).parents(".box-content.type-price").find(".box-rules .note-rules").addClass("active").text("Xin vui lÃ²ng Ä‘á»“ng Ã½ vá»›i Ä‘iá»u khoáº£n"); }

                var chk_type_input = true; var arr_info_data = null;
                if (type_data == 'home') {
                    var info_received = {};
                    $(".box-content.type-home .box-info-received .type-value").each(function () {
                        var str_this = $(this);
                        var name = $(this).data("name");
                        info_received[name] = str_this.val();

                        var is_valid = APPS_FLIGHT_MASTER.api_flight_process_valid_return_data(str_this);
                        if (!is_valid) { chk_type_input = false; }
                    });
                    arr_info_data = { type: "home", info_received: info_received, info_export_order: info_export_order, info_promo_voucher: info_promo_voucher };
                }
                else if (type_data == 'offcial') {
                    arr_info_data = { type: "offcial", info_export_order: info_export_order, info_promo_voucher: info_promo_voucher };
                }
                else if (type_data == 'bank-transfer') {
                    var name_bank = $("ul.list-bank.type-bank-transfer li input[type='radio']:checked").val();
                    arr_info_data = { type: "bank_transfer", name_bank: name_bank, info_export_order: info_export_order, info_promo_voucher: info_promo_voucher };
                }
                else if (type_data == 'atm-internation') {
                    arr_info_data = { type: "atm_internation", info_export_order: info_export_order, info_promo_voucher: info_promo_voucher };
                }
                else if (type_data == 'atm-domestic') {
                    arr_info_data = { type: "atm_domestic", info_export_order: info_export_order, info_promo_voucher: info_promo_voucher };
                }
                else if (type_data == 'momo-pay') {
                    arr_info_data = { type: "momo_pay", info_export_order: info_export_order, info_promo_voucher: info_promo_voucher };
                }
                else if (type_data == 'shop') {
                    arr_info_data = { type: "shop", info_export_order: info_export_order, info_promo_voucher: info_promo_voucher };
                }
                if (chk_type_input && is_valid_export_order && is_valid_promo_voucher && chk_agree_rule) {
                    $(this).attr("disabled", "disabled");

                    var id_booking = APPS_FLIGHT_MASTER.api_flight_system_get_param_url("id");
                    var auth = APPS_FLIGHT_MASTER.api_flight_system_get_param_url("auth");
                    arr_info_data["id_booking"] = id_booking; arr_info_data["auth"] = auth;
                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        cache: false,
                        dataType: "json",
                        data: { action: 'api_flight_select_payment_ajax_update_method_payment', arr_query: arr_info_data },
                        success: function (data) {
                            if (data.is_error == false && data.type == 1 || data.type == 2) {
                                swal.fire({
                                    title: "Lá»±a chá»n thanh toÃ¡n hoÃ n táº¥t.",
                                    text: "ChÃºng tÃ´i Ä‘ang chuyá»ƒn báº¡n qua trang xÃ¡c nháº­n!",
                                    type: "success",
                                    button: "OK",
                                }).then(function () {
                                    window.location.href = data.url_full_link;
                                });
                                setTimeout(function () { window.location.href = data.url_full_link; }, 10000);
                            }
                            else if (data.is_error == false && (data.type == 3 || data.type == 6)) {
                                window.location.href = data.url_full_link;
                            }
                            else if (data.is_error == false && data.type == 4 || data.type == 5 || data.type == 7) {
                                window.location.href = data.url_full_link;
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            //alert(xhr.status);
                            //alert(thrownError);
                        }
                    });
                }

            });

            $(".box-export-order-and-rules .chk-export-order").change(function () {
                var chk_checked = $(this).is(":checked");
                if (chk_checked) { $(this).parents(".box-export-order").find(".box-export-order-item").removeClass("hidden"); }
                else { $(this).parents(".box-export-order").find(".box-export-order-item").addClass("hidden"); }
            });

            $(".box-promo-voucher .box-toggle-checkbox").click(function () {
                var chk_toggle_off = $(this).find("i").hasClass("fa-toggle-off");
                if (chk_toggle_off) {
                    $(this).find("i").removeClass("fa-toggle-off");
                    $(this).find("i").addClass("fa-toggle-on");
                    $(this).parents(".box-promo-voucher").find(".box-input-voucher").removeClass("hidden");
                }
                else {
                    $(this).find("i").addClass("fa-toggle-off");
                    $(this).find("i").removeClass("fa-toggle-on");
                    $(this).parents(".box-promo-voucher").find(".box-input-voucher").addClass("hidden");

                }
            });

            $(".btn-action-next-payment").click(function () {
                $(this).attr("disabled", "disabled");
                var arr_data_info_deputy_passenger = JSON.parse($.cookie("flight_data_info_deputy_passenger"));

                var arr_data_bag = null;
                if ($("select").hasClass("slc-item-bag")) {
                    var bag_id_depart = '', bag_id_return = '';
                    $(".box-item-panel.panel-flight select.slc-item-bag.type-bag").each(function (e, i) {
                        var str_type = ($(this).hasClass("type-depart")) ? 'type-depart' : 'type-return';
                        var str_val = $(this).val();
                        if (str_val > 0) {
                            if (str_type == 'type-depart') { bag_id_depart += str_val + ','; }
                            if (str_type == 'type-return') { bag_id_return += str_val + ','; }
                        }
                    });

                    arr_data_bag = { bag_id_depart: bag_id_depart, bag_id_return: bag_id_return };
                    //var str_data_bag = JSON.stringify(arr_data_bag);
                    //$.cookie("flight_data_bag",str_data_bag);
                } // END BAG
                var arr_data_food = null;
                if ($("ul").hasClass("ul-list-food")) {
                    var food_id_depart = new Array(), food_id_return = new Array();
                    if ($("ul.ul-list-food").hasClass("type-depart")) {
                        $("ul.ul-list-food.type-food.type-depart li").each(function (e, i) {
                            var count_item_food = parseInt($.trim($(this).find(".box-action-food span.count-item-food").text()));
                            var str_key = $.trim($(this).find(".box-action-food span.count-item-food").data("key"));
                            var data_depart = new Array();

                            if (count_item_food > 0) {
                                data_depart['key_' + str_key] = count_item_food;
                                var str_data_depart_food = str_key + ':' + count_item_food;
                                food_id_depart.push(str_data_depart_food);
                            }
                        });
                    }
                    if ($("ul.ul-list-food").hasClass("type-return")) {
                        $("ul.ul-list-food.type-food.type-return li").each(function (e, i) {
                            var count_item_food = parseInt($.trim($(this).find(".box-action-food span.count-item-food").text()));
                            var str_key = $.trim($(this).find(".box-action-food span.count-item-food").data("key"));
                            var data_return = new Array();
                            if (count_item_food > 0) {
                                data_return['key_' + str_key] = count_item_food;
                                var str_data_return_food = str_key + ':' + count_item_food;
                                food_id_return.push(str_data_return_food);
                            }
                        });
                    }

                    arr_data_food = { food_id_depart: food_id_depart, food_id_return: food_id_return };
                    //var str_data_food = JSON.stringify(arr_data_food);
                    //$.cookie("flight_data_food",str_data_food);
                } // END FOOD

                var arr_data_insure = null;
                if ($("button").hasClass("btn-toggle-choose-insure")) {
                    var insure_id_depart = 0, insure_id_return = 0;
                    $("button.btn-toggle-choose-insure").each(function (e, i) {
                        var chk_type = ($(this).hasClass("type-depart")) ? 'depart' : 'return';
                        if (!$(this).hasClass("active")) {
                            if (chk_type == 'depart') { insure_id_depart = 1; }
                            if (chk_type == 'return') { insure_id_return = 1; }
                        }
                    });

                    arr_data_insure = { insure_id_depart: insure_id_depart, insure_id_return: insure_id_return };
                    //                    var str_data_insure = JSON.stringify(arr_data_insure);
                    //                    $.cookie("flight_data_insure",str_data_insure);

                } // END INSURE

                var arr_data_lounge = null;
                if ($("button").hasClass("btn-toggle-choose-lounge")) {
                    var lounge_id_depart = 0, lounge_id_return = 0;
                    $("button.btn-toggle-choose-lounge").each(function (e, i) {
                        var chk_type = ($(this).hasClass("type-depart")) ? 'depart' : 'return';
                        if (!$(this).hasClass("active")) {
                            if (chk_type == 'depart') { lounge_id_depart = 1; }
                            if (chk_type == 'return') { lounge_id_return = 1; }
                        }
                    });

                    arr_data_lounge = { lounge_id_depart: lounge_id_depart, lounge_id_return: lounge_id_return };
                    //                    var str_data_lounge = JSON.stringify(arr_data_lounge);
                    //                    $.cookie("flight_data_lounge",str_data_lounge);

                } // END LOUNGE

                var id_booking = APPS_FLIGHT_MASTER.api_flight_system_get_param_url("id");
                var arr_query = { id_booking: id_booking, info_deputy_passenger: arr_data_info_deputy_passenger, services: { insure: arr_data_insure, food: arr_data_food, bag: arr_data_bag, lounge: arr_data_lounge } }

                $(this).html("<i class='fa fa-spin fa-spinner'></i> ÄÃ£ chÃ­nh xÃ¡c, tiáº¿n hÃ nh thanh toÃ¡n");
                $.ajax({
                    url: adminurl,
                    type: 'post',
                    cache: false,
                    dataType: "json",
                    data: { action: 'api_flight_select_payment_ajax_create', arr_query: arr_query },
                    success: function (data) {
                        window.location.href = data.link_redirect;
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        //alert(xhr.status);
                        //alert(thrownError);
                    }
                });

            });

            $(".box-link-details-full.type-payment").click(function () {
                var data_info_flight = $(".box-details-info-flight.type-popup").html();
                $("#popup-details-item-flight .modal-body").html(data_info_flight);
                if (!$(".title-tab-flight.title-details-flight").hasClass("active")) {
                    $(".title-tab-flight.title-details-flight").trigger('click');
                    $(".title-tab-flight.title-details-flight").addClass("active");
                }
            }); // POPUP DETAILS PAYMENT

        });
    },
    // page payment

    // page booking
    api_flight_system_page_booking: function () {

        APPS_FLIGHT_MASTER.api_flight_system_input_valid();

        $(document).ready(function () {

            function count_prices_all_serivces() {
                var sum_price_all_base = parseInt($(".sum_price_all.type-booking").val());
                var arr_data_bag = count_prices_bag_select();
                var total_money_bag = arr_data_bag.total_money;
                var arr_data_insure = count_prices_insure_select();
                var total_money_insure = arr_data_insure.sum_price_insure;
                var arr_data_food = count_prices_food_select();
                var total_money_food = arr_data_food.total_money;

                var arr_data_lounge = count_prices_lounge_select();
                var total_money_lounge = arr_data_lounge.sum_price_lounge;

                var total_money = sum_price_all_base + total_money_bag + total_money_insure + total_money_food + total_money_lounge;
                var total_money_format = (total_money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                total_money_format = total_money_format.replace(/\..*/g, '');
                //$(".tr-total-price").find("td:last-child").html(total_money_format+' VND');
                $(".box-item-panel.panel-flight .box-title span.item-action span").html(total_money_format + ' VND');
            } // COUNT ALL SERVICES

            // COUNT FOOD
            function count_prices_food_select() {
                var total_money = 0, total_money_depart = 0, total_money_return = 0;
                var exists_food_depart = false; $(".tr-type-food.type-depart").addClass("hidden");
                var exists_food_return = false; $(".tr-type-food.type-return").addClass("hidden");
                $("ul.ul-list-food.type-food.type-depart li").each(function (e, i) {
                    var count_item_food = parseInt($.trim($(this).find(".box-action-food span.count-item-food").text()));
                    var count_item_price = count_item_food * parseInt($.trim($(this).find(".box-action-food span.count-item-food").data("price")));
                    if (count_item_food > 0) {
                        exists_food_depart = true;
                        total_money_depart += count_item_price;
                    }
                });
                $("ul.ul-list-food.type-food.type-return li").each(function (e, i) {
                    var count_item_food = parseInt($.trim($(this).find(".box-action-food span.count-item-food").text()));
                    var count_item_price = count_item_food * parseInt($.trim($(this).find(".box-action-food span.count-item-food").data("price")));
                    if (count_item_food > 0) {
                        exists_food_return = true;
                        total_money_return += count_item_price;
                    }
                });

                total_money = total_money_depart + total_money_return;
                if (exists_food_depart) {
                    $(".tr-type-food.type-depart").removeClass("hidden");

                    var total_money_depart_format = (total_money_depart).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    total_money_depart_format = total_money_depart_format.replace(/\..*/g, '');
                    $(".tr-type-food.type-depart").find("td:last-child").html(total_money_depart_format + " VND");
                }
                if (exists_food_return) {
                    $(".tr-type-food.type-return").removeClass("hidden");

                    var total_money_return_format = (total_money_return).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    total_money_return_format = total_money_return_format.replace(/\..*/g, '');
                    $(".tr-type-food.type-return").find("td:last-child").html(total_money_return_format + " VND");
                }

                var info_return = { exists_food_depart: exists_food_depart, exists_food_return: exists_food_return, total_money: total_money, total_money_depart: total_money_depart, total_money_return: total_money_return };
                return info_return;
            }
            $(document).on("click", ".box-action-food button.type-food", function () {
                var data_type = $(this).data("type");
                var data_max = $(this).parents(".btn-group").find("span.count-item-food").data("max");
                var data_num = parseInt($.trim($(this).parents(".btn-group").find("span.count-item-food").text()));
                if (data_type === 'minus' && data_num > 0) {
                    data_num--;
                } // minus
                else if (data_type === 'plus' && data_num < data_max) {
                    data_num++;
                } // plus
                $(this).parents(".btn-group").find("span.count-item-food").text(data_num);
                count_prices_all_serivces();
            });
            // END COUNT FOOD


            // COUNT BAG
            function count_prices_bag_select() {
                var is_hidden_bag_depart = true, is_hidden_bag_return = true;
                var sum_price_bag_depart = 0, sum_price_bag_return = 0;
                var type_price = 'VND';
                $(".box-item-panel.panel-flight select.slc-item-bag.type-bag").each(function (e, i) {
                    var str_type = ($(this).hasClass("type-depart")) ? 'type-depart' : 'type-return';
                    var str_val = $(this).val();
                    var var_price = parseInt($(this).find("option:selected").data("price"));
                    var var_type_price = $(this).find("option:selected").data("type-price");
                    type_price = var_type_price;
                    if (str_val > 0) {
                        if (str_type == 'type-depart') {
                            is_hidden_bag_depart = false;
                            sum_price_bag_depart += var_price;
                        }
                        if (str_type == 'type-return') {
                            is_hidden_bag_return = false;
                            sum_price_bag_return += var_price;
                        }
                    }
                });

                var sum_price_bag_depart_format = '', sum_price_bag_return_format = '';
                if (sum_price_bag_depart > 0) {
                    var sum_price_bag_depart_format = (sum_price_bag_depart).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    sum_price_bag_depart_format = sum_price_bag_depart_format.replace(/\..*/g, '');
                }
                if (sum_price_bag_return > 0) {
                    var sum_price_bag_return_format = (sum_price_bag_return).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    sum_price_bag_return_format = sum_price_bag_return_format.replace(/\..*/g, '');
                }

                var total_money = sum_price_bag_depart + sum_price_bag_return;

                var arr_data = {
                    is_hidden_bag_depart: is_hidden_bag_depart,
                    is_hidden_bag_return: is_hidden_bag_return,
                    sum_price_bag_depart: sum_price_bag_depart, sum_price_bag_depart_format: sum_price_bag_depart_format,
                    sum_price_bag_return: sum_price_bag_return, sum_price_bag_return_format: sum_price_bag_return_format,
                    type_price: type_price,
                    total_money: total_money
                };

                return arr_data;
            }
            $(document).on("change", ".box-item-panel.panel-flight select.slc-item-bag.type-bag", function () {
                var arr_data_bag = count_prices_bag_select();
                //console.log(arr_data_bag);
                if (arr_data_bag.is_hidden_bag_depart) { $(".tr-type-bag.type-depart").addClass("hidden"); }
                else {

                    $(".tr-type-bag.type-depart").removeClass("hidden");
                    $(".tr-type-bag.type-depart td:last-child").html(arr_data_bag.sum_price_bag_depart_format + ' ' + arr_data_bag.type_price);
                }

                if (arr_data_bag.is_hidden_bag_return) { $(".tr-type-bag.type-return").addClass("hidden"); }
                else {
                    $(".tr-type-bag.type-return").removeClass("hidden");
                    $(".tr-type-bag.type-return td:last-child").html(arr_data_bag.sum_price_bag_return_format + ' ' + arr_data_bag.type_price);
                }

                count_prices_all_serivces();

            });
            // END COUNT BAG

            // COUNT INSURE
            function count_prices_insure_select() {
                var sum_price_insure = 0;

                $(".box-item-insure.type-insure .btn-toggle-choose-insure").each(function () {
                    var data_price = $(this).data('price');
                    var chk_active = ($(this).hasClass("active")) ? true : false;

                    if (!chk_active) {
                        sum_price_insure += parseInt(data_price);
                    }
                });

                var info_return = { sum_price_insure: sum_price_insure };
                return info_return;
            }
            $(".box-item-insure.type-insure .box-price button.btn-toggle-choose-insure").click(function () {
                var price_insure = $(this).parents(".box-price").find(".input-insure").val();
                var chk_active = $(this).parents(".box-price").find(".input-insure").hasClass("active");
                var str_type = ($(this).hasClass("type-return")) ? 'type-return' : 'type-depart';
                if (chk_active) {
                    $(this).text("Chá»n báº£o hiá»ƒm");
                    $(this).addClass("active");
                    $(this).parents(".box-price").find(".input-insure").removeClass("active");
                    $(this).parents(".box-price").find("span").text("KhÃ´ng chá»n");

                    $(".tr-type-insure." + str_type).addClass('hidden');
                }
                else {
                    $(this).text("Bá» chá»n báº£o hiá»ƒm");
                    $(this).removeClass("active");
                    $(this).parents(".box-price").find(".input-insure").addClass("active");
                    $(this).parents(".box-price").find("span").text(price_insure);

                    $(".tr-type-insure." + str_type).removeClass('hidden');
                }
                count_prices_all_serivces();

            }); // ACTION INSURE


            // COUNT LOUNGE
            function count_prices_lounge_select() {
                var sum_price_lounge = 0;

                $(".box-item-lounge.type-lounge .btn-toggle-choose-lounge").each(function () {
                    var data_price = $(this).data('price');
                    var chk_active = ($(this).hasClass("active")) ? true : false;

                    if (!chk_active) {
                        sum_price_lounge += parseInt(data_price);
                    }
                });

                var info_return = { sum_price_lounge: sum_price_lounge };
                return info_return;
            }
            $(".box-item-lounge.type-lounge .box-price button.btn-toggle-choose-lounge").click(function () {
                var price_lounge = $(this).parents(".box-price").find(".input-lounge").val();
                var chk_active = $(this).parents(".box-price").find(".input-lounge").hasClass("active");
                var str_type = ($(this).hasClass("type-return")) ? 'type-return' : 'type-depart';
                if (chk_active) {
                    $(this).text("Chá»n phÃ²ng khÃ¡ch");
                    $(this).addClass("active");
                    $(this).parents(".box-price").find(".input-lounge").removeClass("active");
                    $(this).parents(".box-price").find("span").text("KhÃ´ng chá»n");

                    $(".tr-type-lounge." + str_type).addClass('hidden');
                }
                else {
                    $(this).text("Bá» chá»n phÃ²ng khÃ¡ch");
                    $(this).removeClass("active");
                    $(this).parents(".box-price").find(".input-lounge").addClass("active");
                    $(this).parents(".box-price").find("span").text(price_lounge);

                    $(".tr-type-lounge." + str_type).removeClass('hidden');
                }
                count_prices_all_serivces();

            }); // ACTION LOUNGE

            var storage_flight_info_deputy = localStorage.getItem('storage_flight_info_deputy');
            if ($('.box-item-panel.panel-flight').hasClass('type-contact') && storage_flight_info_deputy != null) {
                var obj_flight_info_deputy = JSON.parse(storage_flight_info_deputy);
                //                console.log(obj_flight_info_deputy);

                obj_flight_info_deputy.map(function (e, i) {
                    Object.keys(e).forEach(function (k) {

                        if (k == 'genus_deputy') { $(".item-group-input select[data-name='" + k + "']").val(e[k]) }
                        else { $(".item-group-input input[data-name='" + k + "']").val(e[k]).addClass("fl-valid"); }

                    });
                });
            } // localStorage INFO DEPUTY

            $(".box-link-details-full.type-booking").click(function () {
                var data_info_flight = $(".box-details-info-flight.type-popup").html();
                $("#popup-details-item-flight .modal-body").html(data_info_flight);
                if (!$(".title-tab-flight.title-details-flight").hasClass("active")) {
                    $(".title-tab-flight.title-details-flight").trigger('click');
                    $(".title-tab-flight.title-details-flight").addClass("active");
                }
            }); // POPUP DETAILS BOOKING
        });
    },
    // end page booking

    api_flight_system_date_select_custom: function (obj_info) {
        $(document).ready(function () {
            var type_date = obj_info.type_date;
            var tag_id_date = obj_info.id_date;

            if (type_date == 'birthday') {
                var min_date = obj_info.min_date;
                var max_date = obj_info.max_date;
                var arr_max_date = max_date.split(",");
                var arr_min_date = min_date.split(",");
                $(tag_id_date).datepickerlunar({

                    dateFormat: "dd/mm/yy",
                    minDate: new Date(arr_min_date[0], arr_min_date[1], arr_min_date[2]),
                    maxDate: new Date(arr_max_date[0], arr_max_date[1], arr_max_date[2]),
                    numberOfMonths: 1,
                    changeYear: true,
                    changeMonth: true,
                    beforeShow: function (input, inst) {
                        inst.dpDiv.removeClass('ui-helper-hidden-accessible');
                        if ($(input).prop('disabled')) { return false; }
                        $('#ui-datepicker-div').addClass("flight-box-date");
                    },
                    onSelect: function (datetext, inst) {
                        //console.log(inst);
                        //$(tag_id_date).val(datetext);
                        $(tag_id_date).addClass("fl-valid");
                        $(this).parents(".item-group-input").find(".note-error").html("");
                    },
                    onClose: function (datetext, inst) {
                    },

                });
            }

        });
    },
    api_flight_process_save_info_data: function (arr_info) {
        $(document).ready(function () {
            arr_info.map(function (e, i) {
                Object.keys(e).forEach(function (k) {
                    $(".content-item[data-name='" + k + "']").html(e[k]);
                    $(".item-group-input[data-name='" + k + "']").val(e[k]);
                });
            });

        });
    },
    api_flight_process_valid_return_data: function (str_this) {
        var chk_type_input = true;
        $(document).ready(function () {

            var data_name = str_this.data("name");
            $(this).parents(".item-group-input").find(".note-error").html("");
            var data_val = str_this.val();

            var chk_required = str_this.hasClass("required");
            var chk_invalid = str_this.hasClass("fl-invalid");
            if ($.trim(data_val) == '' && chk_required) {
                str_this.parents(".item-group-input").find(".note-error").html("Xin vui lÃ²ng khÃ´ng Ä‘á»ƒ trá»‘ng má»¥c nÃ y!");
                chk_type_input = false;
            }
            if (chk_invalid && chk_required) {
                str_this.parents(".item-group-input").find(".note-error").html("Xin vui lÃ²ng nháº­p thÃ´ng tin há»£p lá»‡!");
                chk_type_input = false;
            }
        });
        return chk_type_input;
    },
    api_flight_system_input_valid: function () {
        $(document).ready(function () {

            $(".box-item-panel.panel-flight .box-title span.item-action").click(function () {

                if ($(this).hasClass("toggle")) {
                    var data_type = $(this).data("type");
                    if ($(this).hasClass("active")) {
                        $(this).find("i").css({ transform: 'rotate(180deg)' });
                        $(this).removeClass("active");
                        $(".box-item-panel.panel-flight .box-content." + data_type).addClass("collapse");
                    }
                    else {
                        $(this).addClass("active")
                        $(this).find("i").css({ transform: 'rotate(0deg)' });

                        $(".box-item-panel.panel-flight .box-content." + data_type).removeClass("collapse");

                    }
                }
                else {
                    if ($(this).hasClass("action-save")) {
                        var chk_type_input = true;
                        var arr_info = new Array();
                        $(this).parents(".box-item-panel.panel-flight").find("div.type-init .type-value").each(function () {
                            var str_this = $(this);
                            var is_valid = APPS_FLIGHT_MASTER.api_flight_process_valid_return_data(str_this);
                            if (!is_valid) { chk_type_input = false; }

                            var data_name = str_this.data("name");
                            var data_val = str_this.val();
                            var obj_info = {};
                            obj_info[data_name] = data_val;
                            arr_info.push(obj_info);

                        }); // loop value

                        if (chk_type_input) {
                            APPS_FLIGHT_MASTER.api_flight_process_save_info_data(arr_info);
                            $(this).text("Thay Ä‘á»•i");
                            $(this).removeClass("action-save");

                            $(this).parents(".box-item-panel.panel-flight").find("div.type-init").addClass("hidden");
                            $(this).parents(".box-item-panel.panel-flight").find("div.type-reconfirm").removeClass("hidden");
                        }
                    }
                    else {
                        $(this).text("LÆ°u láº¡i");
                        $(this).addClass("action-save");

                        $(this).parents(".box-item-panel.panel-flight").find("div.type-init").removeClass("hidden");
                        $(this).parents(".box-item-panel.panel-flight").find("div.type-reconfirm").addClass("hidden");

                    }
                } // save
            }); // action save panel DEPUTY

            $('.container-content-info-flight .box-btn-continue .btn-continue').click(function () {
                var data_type = $(this).data('type');
                var arr_info_deputy = new Array();
                var arr_info_passenger = new Array();
                var obj_info_passenger_compact = new Array();
                if (data_type == 'type-contact') {
                    var chk_type_input = true;
                    $('.box-info-contact.type-contact .item-group-input .type-value,.box-info-passenger.type-passenger .item-group-input .type-value').each(function (i, e) {
                        var str_this = $(this);
                        var is_valid = APPS_FLIGHT_MASTER.api_flight_process_valid_return_data(str_this);
                        if (!is_valid) { chk_type_input = false; }

                        var data_name = str_this.data("name");
                        var data_val = str_this.val();
                        if (str_this.parents(".item-group-input").hasClass("type-contact-deputy")) {
                            var obj_info_deputy = {};
                            obj_info_deputy[data_name] = data_val;
                            arr_info_deputy.push(obj_info_deputy);
                        } //  type contact deputy
                        else if (str_this.parents(".item-group-input").hasClass("type-passenger")) {
                            var obj_info_passenger = {};
                            obj_info_passenger[data_name] = data_val;
                            arr_info_passenger.push(obj_info_passenger);

                            var str_type = str_this.parents("tr.tr-item-group-input").data("type");
                            //obj_info_passenger[str_type+'__'+data_name] = data_val;


                        } //  type passenger

                    }); // INFO PASSENGER, TYPE DEPUTY

                    $(".box-info-passenger.type-passenger tr.tr-item-group-input").each(function () {
                        var str_type = $(this).data("type");
                        var type_genus = $(this).find("select.type-genus.type-select").val();
                        var str_fullname = $(this).find("input.type-input.type-fullname").val();
                        if (str_type == 'adult') {
                            obj_info_passenger_compact.push({ type: str_type, type_genus: type_genus, fullname: str_fullname });
                        }
                        else {
                            var str_birthday = $(this).find("input.type-input.type-birthday").val();
                            obj_info_passenger_compact.push({ type: str_type, type_genus: type_genus, fullname: str_fullname, birthday: str_birthday });
                        }
                    }); // GET INFO PASSENGER COMPACT

                    if (chk_type_input == true) {
                        var arr_data_info = { info_deputy: arr_info_deputy, info_passenger: obj_info_passenger_compact };
                        var str_json_data_flight = JSON.stringify(arr_data_info);
                        $.cookie("flight_data_info_deputy_passenger", str_json_data_flight);
                        var obj_data = JSON.parse(str_json_data_flight);
                        var json_info_deputy = JSON.stringify(arr_info_deputy);

                        //console.log(arr_info_passenger);
                        //$.cookie("flight_info_deputy",json_info_deputy);
                        localStorage.setItem('storage_flight_info_deputy', json_info_deputy);
                        // if ok let go
                        //console.log("ok let go",obj_data);

                        $(".box-item-panel.panel-flight.type-contact .box-title .item-action").removeClass("hidden");
                        $(".box-item-panel.panel-flight.type-passenger .box-title .item-action").removeClass("hidden");

                        $(".box-info-contact.type-contact.type-init").addClass("hidden");
                        $(".box-info-contact.type-contact.type-reconfirm").removeClass("hidden");

                        $(".box-info-passenger.type-passenger.type-init").addClass("hidden");
                        $(".box-info-passenger.type-passenger.type-reconfirm").removeClass("hidden");

                        $(".container-info-bag.page-booking").removeClass("hidden");
                        $(".container-info-food.page-booking").removeClass("hidden");
                        $(".container-info-insure.page-booking").removeClass("hidden");
                        $(".container-info-lounge.page-booking").removeClass("hidden");

                        $(".container-info-price-summary.page-booking").removeClass("hidden");

                        APPS_FLIGHT_MASTER.api_flight_process_save_info_data(arr_info_deputy);
                        APPS_FLIGHT_MASTER.api_flight_process_save_info_data(arr_info_passenger);

                        if ($(this).hasClass("next-step-2")) { $(".btn-popup-next-step-2").trigger("click"); }
                        else { $(this).addClass("next-step-2"); }

                    } // valid next

                } // type contact

            }); // BTN CONTINUE BOOKING

            $(document).on("blur", ".item-group-input input", function () {
                var txt_input = $(this).val();
                if (txt_input == '') {
                    $(this).removeClass("fl-valid");
                    $(this).removeClass("fl-invalid");
                }
            }); // blur input
            $(document).on("input", ".item-group-input input", function () {
                var txt_input = $(this).val();
                var type_input = $(this).attr('type');
                $(this).parents(".item-group-input").find(".note-error").html("");
                if (type_input === 'text') {
                    chk_valid = true;
                    var type_name = $(this).data("name");

                    if (type_name == 'phone_deputy' && (txt_input.length <= 9 || txt_input.length >= 13)) { chk_valid = false; }
                    if (type_name == 'phone_deputy' && isNaN(txt_input)) { chk_valid = false; }

                    if (chk_valid == true) {
                        $(this).addClass("fl-valid");
                        $(this).removeClass("fl-invalid");
                    }
                    else if (chk_valid == false) {
                        $(this).removeClass("fl-valid");
                        $(this).addClass("fl-invalid");
                    }
                }
                else if (type_input === 'email' && txt_input != null) {
                    var chk_valid = true;
                    var re_dot = /\.../i;
                    var chk_dot_email = txt_input.match(re_dot);
                    if (chk_dot_email == null) { chk_valid = false; }

                    var re_special = /\@[^\.]./i;
                    var chk_special_email = txt_input.match(re_special);
                    if (chk_special_email == null) { chk_valid = false; }

                    if (chk_valid == true) {
                        $(this).addClass("fl-valid");
                        $(this).removeClass("fl-invalid");
                    }
                    else if (chk_valid == false) {
                        $(this).removeClass("fl-valid");
                        $(this).addClass("fl-invalid");
                    }
                }

            }); // input valid
        });
    },

    // SYSTEM SEARCH FLIGHT
    api_flight_reset_cookie_info_flight: function () {
        $(document).ready(function () {
            $.cookie("flight_info_selected", '');
        });
    },
    api_flight_system_cookie_info_flight: function (obj_flight) {
        var flight_info_selected = $.cookie("flight_info_selected");
        var obj_coookie_flight = null;
        if (flight_info_selected != '') {
            var chk_depart = (obj_flight.depart != null) ? 1 : 0;
            var chk_return = (obj_flight.return != null) ? 1 : 0;
            var chk_full = (obj_flight.full != null) ? 1 : 0;

            var cookie_current = $.cookie("flight_info_selected");

            obj_coookie_flight = JSON.parse(cookie_current);
            if (chk_depart == 1) { delete obj_coookie_flight.full; obj_coookie_flight.depart = obj_flight.depart; }
            else if (chk_return == 1) { delete obj_coookie_flight.full; obj_coookie_flight.return = obj_flight.return; }
            else if (chk_full == 1) { delete obj_coookie_flight.return; delete obj_coookie_flight.depart; obj_coookie_flight.full = obj_flight.full; }

        } // cookie exists
        else { obj_coookie_flight = obj_flight; }

        var str_cookie_flight = JSON.stringify(obj_coookie_flight);
        $.cookie("flight_info_selected", str_cookie_flight);

    },
    api_flight_system_process_selected_flight: function () {

        $(document).ready(function () {



            $(document).on("click", "li.item-flight .box-description .box-link-details", function () {
                var data_html = $(this).parents("li.item-flight.selected").find(".info-bottom").html();
                $("#popup-details-item-flight .modal-body").html(data_html);
                $("#popup-details-item-flight .modal-body .nav-list-tab-info-flight .title-tab-flight.title-details-flight").trigger('click');
            });

            $(document).on("click", "li.item-flight.selected .box-button-change", function () {

                $('.box-item-filter .box-button-filter').removeClass("active");
                $(".box-list-lowest-price-flight").addClass("hidden");
                var chk_depart = $(this).hasClass("type-depart");
                var cookie_current = $.cookie("flight_info_selected");

                var obj_coookie_flight = JSON.parse(cookie_current);

                if (chk_depart) {
                    delete obj_coookie_flight.depart;
                    $(".box-column-content-flight-content.type-depart.type-RT").addClass("active");

                    $(".box-column-content-flight-content.type-return.type-RT").removeClass("active");
                    $(".box-column-content-flight-content.type-depart.type-RT").removeClass("selected");
                    $(this).parents("li.item-flight").removeClass("selected");

                    $(".box-column-content-flight-content.type-return.type-RT ul li").removeClass("hidden");
                } // depart
                else {
                    delete obj_coookie_flight.return;
                    $(".box-column-content-flight-content.type-return.type-RT").addClass("active");
                    $(".box-column-content-flight-content.type-depart.type-RT").removeClass("active");
                    $(".box-column-content-flight-content.type-return.type-RT").removeClass("selected");
                    $(".box-column-content-flight-content.type-return.type-RT ul.list-item-flight li").removeClass("selected");

                    $(".box-column-content-flight-content.type-depart.type-RT ul li").removeClass("hidden");
                } //return

                var str_cookie_flight = JSON.stringify(obj_coookie_flight);
                $.cookie("flight_info_selected", str_cookie_flight);
            }); // CHANGE ITEM FLIGHT

            $(document).on("click", ".box-content.box-details-roundtrip .box-menu-tabs .menu-item span.item-details", function () {
                var str_type = $(this).data("type");
                $(".box-content.box-details-roundtrip .box-info-details .box-content-item:not(.type-" + str_type + ")").addClass("hidden");
                $(".box-content.box-details-roundtrip .box-menu-tabs .menu-item span.item-details").removeClass("active");

                var check_hidden = $(".box-content.box-details-roundtrip .box-info-details .box-content-item.type-" + str_type).hasClass("hidden");
                if (check_hidden) {
                    $(".box-content.box-details-roundtrip .box-info-details .box-content-item.hidden.type-" + str_type).removeClass("hidden");
                    $(this).addClass("active");
                }
                else { $(".box-content.box-details-roundtrip .box-info-details .box-content-item.type-" + str_type).addClass("hidden"); $(this).removeClass("active"); }
            });

            $(document).on("click", ".box-select-item .btn-selecte-item", function () {
                var chk_RT = $(this).parents(".box-column-content-flight-content").hasClass("type-RT");

                $('.box-item-filter .box-button-filter').removeClass("active");
                $(".box-list-lowest-price-flight").addClass("hidden");

                var data_flight = $(this).data("id-flight");
                var obj_flight = null;
                var cookie_current = $.cookie("flight_info_selected");
                var obj_cookie = (cookie_current != '') ? JSON.parse(cookie_current) : '';
                var from = $(".box-input-info-flight input.txt-flight-departure").val();
                var to = $(".box-input-info-flight input.txt-flight-destination").val();
                var date_from = $(".box-input-info-flight input.txt-flight-departuredate").val();
                var date_to = $(".box-input-info-flight input.txt-flight-returndate").val();
                var adult = $(".box-input-info-flight input.txt-flight-adult").val();
                var child = $(".box-input-info-flight input.txt-flight-child").val();
                var infant = $(".box-input-info-flight input.txt-flight-infant").val();

                if (chk_RT) {
                    var chk_depart = $(this).hasClass("type-depart");

                    var str_option_key = $(this).data("option-key");
                    var str_info_key = $(this).data("info-key");

                    if (chk_depart) {
                        obj_flight = {
                            depart: {
                                type: "RT", data_name: "depart", data_flight: data_flight,
                                from: from, to: to, date_from: date_from,
                                date_to: date_to, adult: adult, child: child, infant: infant
                            }
                        };

                        APPS_FLIGHT_MASTER.api_flight_system_cookie_info_flight(obj_flight);
                        if (obj_cookie.return == null) {
                            $(".box-column-content-flight-content.type-depart").removeClass("active");
                            $(".box-column-content-flight-content.type-return").addClass("active");
                            $(this).parents(".box-column-content-flight-content").addClass("selected");

                            $(this).parents("ul.list-item-flight").find("li").removeClass("selected");
                            $(this).parents("li.item-flight").addClass("selected");

                            var height_top_flight = $('.box-column-content-flight-content.type-depart.type-RT').offset().top;
                            $('body,html').animate({ scrollTop: height_top_flight - 50 }, '500', 'swing', function () { });


                            if (str_option_key != '' && str_info_key != '') {
                                var obj_info_key = str_info_key.split(",");
                                $(".box-column-content-flight-content.type-return ul.list-item-flight li").addClass("hidden");
                                obj_info_key.map(function (e, i) {
                                    $(".box-column-content-flight-content.type-return ul.list-item-flight li." + e).removeClass("hidden");
                                });
                            }

                        }  // change tab
                        else {
                            var str_id_flight_depart = data_flight;
                            var str_id_flight_return = obj_cookie.return.data_flight;

                            var html_depart_flight_info_top = $(".list-item-flight.desktop.type-depart .item-flight.type-depart[data-id-flight='" + str_id_flight_depart + "'] .info-top").html();
                            var html_return_flight_info_top = $(".list-item-flight.desktop.type-return .item-flight.type-return[data-id-flight='" + str_id_flight_return + "'] .info-top").html();

                            var html_depart_flight_info_details = $(".list-item-flight.desktop.type-depart .item-flight.type-depart[data-id-flight='" + str_id_flight_depart + "'] .info-bottom .tab-flight.content-details-flight").html();
                            var html_return_flight_info_details = $(".list-item-flight.desktop.type-return .item-flight.type-return[data-id-flight='" + str_id_flight_return + "'] .info-bottom .tab-flight.content-details-flight").html();

                            var html_depart_flight_ticket_details = $(".list-item-flight.desktop.type-depart .item-flight.type-depart[data-id-flight='" + str_id_flight_depart + "'] .info-bottom .tab-flight.content-price-flight").html();
                            var html_return_flight_ticket_details = $(".list-item-flight.desktop.type-return .item-flight.type-return[data-id-flight='" + str_id_flight_return + "'] .info-bottom .tab-flight.content-price-flight").html();
                            var str_url_booking = url_link_home + '/booking';
                            //window.location.href=str_url_booking;
                            Swal.fire({
                                title: '',
                                html:
                                    '<div class="box-title type-popup-details-roundtrip">ThÃ´ng tin chuyáº¿n bay Ä‘Ã£ chá»n </div>' +
                                    '<div class="box-content box-details-roundtrip">' +
                                    '<div class="box-info box-depart"> <div class="box-title">Chuyáº¿n Ä‘i</div> <div class="box-content"> ' + html_depart_flight_info_top + '</div> </div>' +
                                    '<div class="box-info box-return"> <div class="box-title">Chuyáº¿n vá»</div> <div class="box-content">' + html_return_flight_info_top + '</div> </div>' +
                                    '<div class="box-info-details">' +
                                    '<div class="box-menu-tabs">' +
                                    '<div class="menu-item"> <span data-type="flight-details" class="item-details"> Chi tiáº¿t chuyáº¿n bay </span></div>' +
                                    '<div class="menu-item"> <span data-type="ticket-details" class="item-details"> Chi tiáº¿t vÃ© </span></div>' +
                                    '<div class="menu-item"> <a href="' + str_url_booking + '">Äáº·t vÃ©</a> </div>' +
                                    '</div>' +
                                    '<div class="box-content-item type-flight-details hidden">' +
                                    '<h3>Chuyáº¿n Ä‘i</h3> <div class="flight-info">' + html_depart_flight_info_details + '</div>' +
                                    '<h3 class="title-return">Chuyáº¿n vá»</h3> <div class="flight-info">' + html_return_flight_info_details + '</div>' +
                                    '</div>' +
                                    '<div class="box-content-item type-ticket-details hidden">' +
                                    '<h3>Chuyáº¿n Ä‘i</h3> <div class="ticket-info">' + html_depart_flight_ticket_details + '</div>' +
                                    '<h3 class="title-return">Chuyáº¿n vá»</h3> <div class="ticket-info">' + html_return_flight_ticket_details + '</div>' +
                                    '</div>' +

                                    '</div>' +
                                    '</div>' +
                                    '',
                                showCloseButton: true,
                                showCancelButton: false,
                                focusConfirm: false,
                                showConfirmButton: false,
                                width: '750px',
                                padding: "0rem"
                            });
                        }

                    }// depart
                    else {
                        obj_flight = {
                            return: {
                                type: "RT", data_name: "return", data_flight: data_flight,
                                from: from, to: to, date_from: date_from,
                                date_to: date_to, adult: adult, child: child, infant: infant
                            }
                        };
                        APPS_FLIGHT_MASTER.api_flight_system_cookie_info_flight(obj_flight);
                        if (obj_cookie.depart == null) {
                            $(".box-column-content-flight-content.type-return").removeClass("active");
                            $(".box-column-content-flight-content.type-depart").addClass("active");
                            $(this).parents(".box-column-content-flight-content").addClass("selected");
                            $(this).parents("ul.list-item-flight").find("li").removeClass("selected");
                            $(this).parents("li.item-flight").addClass("selected");

                            var height_top_flight = $('.box-column-content-flight-content.type-depart.type-RT').offset().top;
                            $('body,html').animate({ scrollTop: height_top_flight - 50 }, '500', 'swing', function () { });

                            // get filter flight
                            if (str_option_key != '' && str_info_key != '') {
                                var obj_info_key = str_info_key.split(",");
                                $(".box-column-content-flight-content.type-depart ul.list-item-flight li").addClass("hidden");
                                obj_info_key.map(function (e, i) {
                                    $(".box-column-content-flight-content.type-depart ul.list-item-flight li." + e).removeClass("hidden");
                                });
                            }

                        } // change tab
                        else {
                            var str_id_flight_depart = obj_cookie.depart.data_flight;
                            var str_id_flight_return = data_flight;
                            var html_depart_flight_info_top = $(".list-item-flight.desktop.type-depart .item-flight.type-depart[data-id-flight='" + str_id_flight_depart + "'] .info-top").html();

                            var html_return_flight_info_top = $(".list-item-flight.desktop.type-return .item-flight.type-return[data-id-flight='" + str_id_flight_return + "'] .info-top").html();

                            var html_depart_flight_info_details = $(".list-item-flight.desktop.type-depart .item-flight.type-depart[data-id-flight='" + str_id_flight_depart + "'] .info-bottom .tab-flight.content-details-flight").html();
                            var html_return_flight_info_details = $(".list-item-flight.desktop.type-return .item-flight.type-return[data-id-flight='" + str_id_flight_return + "'] .info-bottom .tab-flight.content-details-flight").html();

                            var html_depart_flight_ticket_details = $(".list-item-flight.desktop.type-depart .item-flight.type-depart[data-id-flight='" + str_id_flight_depart + "'] .info-bottom .tab-flight.content-price-flight").html();
                            var html_return_flight_ticket_details = $(".list-item-flight.desktop.type-return .item-flight.type-return[data-id-flight='" + str_id_flight_return + "'] .info-bottom .tab-flight.content-price-flight").html();
                            var str_url_booking = url_link_home + '/booking';
                            //window.location.href=str_url_booking;
                            Swal.fire({
                                title: '',
                                html:
                                    '<div class="box-title type-popup-details-roundtrip">ThÃ´ng tin chuyáº¿n bay Ä‘Ã£ chá»n </div>' +
                                    '<div class="box-content box-details-roundtrip">' +
                                    '<div class="box-info box-depart"> <div class="box-title">Chuyáº¿n Ä‘i</div> <div class="box-content"> ' + html_depart_flight_info_top + '</div> </div>' +
                                    '<div class="box-info box-return"> <div class="box-title">Chuyáº¿n vá»</div> <div class="box-content">' + html_return_flight_info_top + '</div> </div>' +
                                    '<div class="box-info-details">' +
                                    '<div class="box-menu-tabs">' +
                                    '<div class="menu-item"> <span data-type="flight-details" class="item-details"> Chi tiáº¿t chuyáº¿n bay </span></div>' +
                                    '<div class="menu-item"> <span data-type="ticket-details" class="item-details"> Chi tiáº¿t vÃ© </span></div>' +
                                    '<div class="menu-item"> <a href="' + str_url_booking + '">Äáº·t vÃ©</a> </div>' +
                                    '</div>' +
                                    '<div class="box-content-item type-flight-details hidden">' +
                                    '<h3>Chuyáº¿n Ä‘i</h3> <div class="flight-info">' + html_depart_flight_info_details + '</div>' +
                                    '<h3 class="title-return">Chuyáº¿n vá»</h3> <div class="flight-info">' + html_return_flight_info_details + '</div>' +
                                    '</div>' +
                                    '<div class="box-content-item type-ticket-details hidden">' +
                                    '<h3>Chuyáº¿n Ä‘i</h3> <div class="ticket-info">' + html_depart_flight_ticket_details + '</div>' +
                                    '<h3 class="title-return">Chuyáº¿n vá»</h3> <div class="ticket-info">' + html_return_flight_ticket_details + '</div>' +
                                    '</div>' +

                                    '</div>' +
                                    '</div>' +
                                    '',
                                showCloseButton: true,
                                showCancelButton: false,
                                focusConfirm: false,
                                showConfirmButton: false,
                                width: '750px',
                                padding: "0rem"
                            });

                            //                            
                        } // next page

                    } // return

                } // RT
                else {
                    obj_flight = {
                        full: {
                            type: "OW", data_name: "depart", data_flight: data_flight,
                            from: from, to: to, date_from: date_from,
                            date_to: date_to, adult: adult, child: child, infant: infant
                        }
                    };
                    APPS_FLIGHT_MASTER.api_flight_system_cookie_info_flight(obj_flight);

                    var str_url_booking = url_link_home + '/booking';
                    window.location.href = str_url_booking;
                } // OW

            }); // ACTION SELECT ITEM FLIGHT
        });
    },
    api_flight_system_process_flight_RT: function () {
        $(document).ready(function () {
            $(".box-column-content-flight-content.type-RT").click(function () {
                var chk_active = $(this).hasClass("active");
                var chk_selected = $(this).hasClass("selected");
                var chk_active_depart = $(this).hasClass("type-depart");


                if (!chk_active && !chk_selected) {
                    // TOOGLE LISTDATE
                    if (chk_active_depart) { $(".box-info-common.type-return .box-button-filter").removeClass("active"); $(".box-list-lowest-price-flight.type-return").addClass("hidden"); }
                    else { $(".box-info-common.type-depart .box-button-filter").removeClass("active"); $(".box-list-lowest-price-flight.type-depart").addClass("hidden"); }
                    // END TOOGLE LISTDATE
                    // ************
                    // TOGGLE LIST DATA FLIGHT
                    $(".box-column-content-flight-content.type-RT").removeClass("active");
                    $(this).addClass("active");
                    // END TOGGLE LIST DATA FLIGHT
                }

            }); // change tabs flight RT
        });
    },
    api_flight_system_toggle_tab_info_flight: function () {

        $(document).ready(function () {
            $(document).on("click", ".nav-list-tab-info-flight .title-tab-flight", function () {

                var data_type = $(this).data("type");
                var data_id = $(this).data("id");
                var data_tab = $(this).data("tab");

                var str_tag_selected = '.content-' + data_tab + '.' + data_id + '.' + data_type;
                $(".box-tabs-flight .tab-flight." + data_type + '.' + data_id).addClass("hidden");


                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(str_tag_selected).addClass("hidden");
                }
                else {
                    $(".nav-list-tab-info-flight." + data_type + '.' + data_id + ' .title-tab-flight').removeClass("active");
                    $(this).addClass("active");
                    $(str_tag_selected).removeClass("hidden");
                }

            });
        });

    },
    api_flight_ajax_system_filter_flight: function (info_search) {

        $(document).ready(function () {
            $(document).on("change", ".box-filter-flight input", function () {

                var data_name = $(this).parents(".box-filter-flight").data("name");
                var info_data = new Array();
                $(".box-filter-flight." + data_name + " input:checked").each(function () {
                    var type_data = $(this).parents(".box-filter-flight").data("type");
                    var val_data = $(this).val();
                    info_data.push({ type_data: type_data, val_data: val_data });
                });

                $(".box-column-content-flight-inner.type-depart").addClass("disabled");
                $.ajax({
                    url: adminurl,
                    type: 'post',
                    cache: false,
                    dataType: "json",
                    data: { action: 'api_flight_ajax_system_filter_flight', info_data: info_data, info_search: info_search },
                    success: function (data) {
                        if (data_name == 'type-depart' || data_name == 'type-full') {
                            var depart_html_data_flight = data.data_flight_html.depart_html_data_flight;
                            $('.box-column-content-flight-inner.type-depart').html(depart_html_data_flight);
                            $(".box-column-content-flight-inner.type-depart").removeClass("disabled");
                            setTimeout(function () { $(".box-info-middle .bar-plane").addClass("active"); }, 100);
                        }
                        else {
                            var return_html_data_flight = data.data_flight_html.return_html_data_flight;
                            $('.box-column-content-flight-inner.type-return').html(return_html_data_flight);
                            $(".box-column-content-flight-inner.type-return").removeClass("disabled");
                            setTimeout(function () { $(".box-info-middle .bar-plane").addClass("active"); }, 100);
                        }

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        //alert(xhr.status);
                        //alert(thrownError);
                    }
                });

            });
        });
    },
    api_flight_ajax_system_search_flight: function () {
        $('.btn-toggle-change-flight').addClass("hidden");
        $(".box-system-filter-flight ").addClass('hidden');
        $('.box-loadding-search-flight ').removeClass("hidden");
        var adult = $(".box-input-info-flight .txt-flight-adult").val();
        var child = $(".box-input-info-flight .txt-flight-child").val();
        var infant = $(".box-input-info-flight .txt-flight-infant").val();
        var device = $(".box-input-info-flight .txt-flight-device").val();
        var itinerary = $(".box-input-info-flight .txt-flight-itinerary").val();
        var departure = $(".box-input-info-flight .txt-flight-departure").val();
        var destination = $(".box-input-info-flight .txt-flight-destination").val();
        var departuredate = $(".box-input-info-flight .txt-flight-departuredate").val();
        var returndate = $(".box-input-info-flight .txt-flight-returndate").val();
        var info_search = { adult: adult, child: child, infant: infant, device: device, itinerary: itinerary, departure: departure, destination: destination, departuredate: departuredate, returndate: returndate };
        APPS_FLIGHT_MASTER.api_flight_reset_cookie_info_flight();
        $.ajax({
            url: adminurl,
            type: 'post',
            cache: false,
            dataType: "json",
            data: { action: 'api_flight_ajax_system_search_flight', info_search: info_search },
            success: function (data) {
                if (data.form_flight_empty != null) {
                    $('.btn-toggle-change-flight').removeClass("hidden");
                    $('.box-loadding-search-flight ').addClass("hidden");
                    $('.box-column-content-flight-inner.type-depart').html(data.form_flight_empty);
                }
                else {
                    var str_type_depart = (itinerary == 'Roundtrip') ? 'type-depart' : 'type-full';
                    var data_filter_airlines_depart = data.data_flight_html.depart_html_filter_airlines_flight;
                    $(".box-filter-flight.type-airlines." + str_type_depart + " .box-content").html(data_filter_airlines_depart);
                    var depart_html_data_flight = data.data_flight_html.depart_html_data_flight;
                    $('.box-column-content-flight-inner.type-depart').html(depart_html_data_flight);

                    if (itinerary == 'Roundtrip') {
                        var data_filter_airlines_return = data.data_flight_html.return_html_filter_airlines_flight;
                        $(".box-filter-flight.type-airlines.type-return .box-content").html(data_filter_airlines_return);
                        var return_html_data_flight = data.data_flight_html.return_html_data_flight;
                        $('.box-column-content-flight-inner.type-return').html(return_html_data_flight);
                    }

                    setTimeout(function () { $(".box-info-middle .bar-plane").addClass("active"); }, 100);
                    $('.btn-toggle-change-flight').removeClass("hidden");
                    $(".box-system-filter-flight ").removeClass('hidden');
                    $('.box-loadding-search-flight ').addClass("hidden");
                    APPS_FLIGHT_MASTER.api_flight_ajax_system_filter_flight(info_search);

                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //alert(xhr.status);
                //alert(thrownError);
            }
        });
    },
    api_flight_count_summary_price: function (info_date_summary) {
        var tag_list_date = info_date_summary.list_date;
        var data_name = info_date_summary.data_name;


        var str_depart = $(".box-input-info-flight input.txt-flight-departure").val();
        var str_return = $(".box-input-info-flight input.txt-flight-destination").val();

        var str_temp_depart = str_depart;
        if (data_name == 'return') { str_depart = str_return; str_return = str_temp_depart; }

        var info_date = new Array();

        $(tag_list_date).find(".item-date").each(function () {
            var chk_disabled = ($(this).hasClass("disabled")) ? 1 : 0;
            var date_base = $(this).attr('data-date-base');
            var mid_day = ($(this).hasClass("mid-day")) ? 1 : 0;
            info_date.push({ disabled: chk_disabled, date_base: date_base, mid_day: mid_day });
        });
        //$(this).addClass("loading-price");
        $('.btn-next-date-lowest-price.type-' + data_name).addClass("loading-price");
        $('.btn-prev-date-lowest-price.type-' + data_name).addClass("loading-price");
        var chk_full_flight = $(".box-list-lowest-price-flight").hasClass("type-full");
        var str_vnd = (chk_full_flight) ? 'VND' : '';
        $.ajax({
            url: adminurl,
            type: 'post',
            cache: false,
            dataType: "json",
            data: { action: 'api_flight_ajax_summary_price', info_date: info_date, str_depart: str_depart, str_return: str_return },
            success: function (data) {
                $('.btn-next-date-lowest-price.type-' + data_name).removeClass("loading-price");
                $('.btn-prev-date-lowest-price.type-' + data_name).removeClass("loading-price");
                data.map(function (element, index) {
                    var chk_disabled = $(tag_list_date).find(".item-date").eq(index).hasClass("disabled");
                    if (!chk_disabled) {
                        var str_price = (element != 0) ? element + ' ' + str_vnd : '-';
                        $(tag_list_date).find(".item-date").eq(index).find("span.price").html(str_price);
                    }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //alert(xhr.status);
                //alert(thrownError);
            }
        });

    },
    api_flight_system_count_price_date: function () {
        $(document).ready(function () {

            $(document).on("click", '.btn-toggle-price-week', function () {

                var obj_this = $(this);
                var data_name = $(this).data("type-name");

                var tag_list_date = ".list-lowest-price-flight.type-" + data_name;
                $(tag_list_date).find(".item-date").each(function () {
                    var chk_disabled = $(this).hasClass("disabled");
                    if (chk_disabled) { $(this).find("span.price").html('-'); }
                    else { }
                });

                setTimeout(function () {
                    var chk_td_active = obj_this.parent().hasClass("active");
                    if (chk_td_active) {
                        var info_date_summary = { list_date: tag_list_date, data_name: data_name };
                        APPS_FLIGHT_MASTER.api_flight_count_summary_price(info_date_summary);
                    }

                }, 100);

            });
        });

    },
    api_flight_system_lowest_price: function () {

        var arr_month = new Array();
        arr_month[0] = "01"; arr_month[1] = "02"; arr_month[2] = "03"; arr_month[3] = "04"; arr_month[4] = "05"; arr_month[5] = "06";
        arr_month[6] = "07"; arr_month[7] = "08"; arr_month[8] = "09"; arr_month[9] = "10"; arr_month[10] = "11"; arr_month[11] = "12";

        var weekday = new Array();
        weekday[0] = "CN"; weekday[1] = "Thá»© 2"; weekday[2] = "Thá»© 3"; weekday[3] = "Thá»© 4"; weekday[4] = "Thá»© 5"; weekday[5] = "Thá»© 6"; weekday[6] = "Thá»© 7";

        Date.prototype.addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        function format_date_return_data(arr_date_format, minus) {
            var date_format = arr_date_format['date_format'];
            var type_itinerary = arr_date_format['type_itinerary'];
            var itinerary = (arr_date_format['itinerary'] == 'Oneway') ? 'OW' : 'RT';
            var date_limit = arr_date_format['date_limit'];
            var type_direct = arr_date_format['type_direct'];

            var date_current = new Date().addDays(-1);
            var date_valid_year = new Date().addDays(350);

            var arr_data = new Array();
            var arr_list_date = new Array();
            var stop_date = 0;
            for (var i = 1; i <= 7; i++) {
                var chk_mid_day = (i == 4) ? 1 : 0;
                var count_i = (minus === 'minus') ? -i : i;
                var last_date_format = date_format.addDays(count_i);
                var ngay_current = last_date_format.getDate() + '';
                ngay_current = (ngay_current.length == 1) ? '0' + ngay_current : ngay_current;
                var thang_current = arr_month[last_date_format.getMonth()];
                var nam_current = last_date_format.getFullYear();
                var str_weekday = weekday[last_date_format.getDay()];
                var fulldate_base = ngay_current + thang_current + nam_current;

                if (type_direct === 'next' && date_limit != '' && itinerary === 'RT' && type_itinerary == 'type-depart' && last_date_format.getTime() > date_limit.getTime()) { stop_date = 1; }
                else if (type_direct === 'prev' && date_limit != '' && itinerary === 'RT' && type_itinerary == 'type-return' && last_date_format.getTime() < date_limit.getTime()) { stop_date = 1; }

                if (date_current.getTime() > last_date_format.getTime()) { stop_date = 1; }
                else if (date_valid_year.getTime() < last_date_format.getTime()) { stop_date = 1; }

                var obj_data = { weekday: str_weekday, day: ngay_current, month: thang_current, year: nam_current, stop: stop_date, mid_day: chk_mid_day, fulldate_base: fulldate_base };

                arr_list_date.push(obj_data);
            }
            if (minus === 'minus') { arr_list_date.reverse(); }
            arr_data["first_date"] = arr_list_date[0];
            arr_data["last_date"] = arr_list_date[6];
            arr_data["list_date"] = arr_list_date;
            arr_data["stop"] = stop_date;
            return arr_data;
        }

        function format_date_return_first_last_date(arr_date) {
            var day_date = arr_date.day;
            var month_date = arr_date.month;
            var year_date = arr_date.year;
            var str_full_date = year_date + '-' + month_date + '-' + day_date;
            return str_full_date;
        }

        $(document).ready(function () {

            $(".btn-next-date-lowest-price").click(function () {

                var str_loading_price = $(this).hasClass("loading-price");
                var data_name = $(this).data('name');
                var str_data_name = '.type-' + data_name;
                var chk_stop_next = $(this).hasClass("disabled");
                if (!chk_stop_next && !str_loading_price) {
                    var last_date = $(this).attr("data-last-date");
                    var last_date_format = new Date(last_date);

                    var arr_date_info = new Array();
                    arr_date_info["date_format"] = last_date_format;
                    arr_date_info["type_itinerary"] = 'type-' + data_name;
                    arr_date_info["itinerary"] = $('.box-input-info-flight input.txt-flight-itinerary').val();
                    arr_date_info["type_direct"] = "next";
                    var date_limit = $('.box-input-info-flight input.txt-flight-returndate-format').val();
                    var date_limit_format = (date_limit != '') ? new Date(date_limit) : '';
                    arr_date_info["date_limit"] = date_limit_format;

                    var arr_date_format = format_date_return_data(arr_date_info);
                    //console.log(arr_date_format);
                    $(".btn-prev-date-lowest-price" + str_data_name).removeClass("disabled");
                    if (arr_date_format['stop'] == 1) { $(this).addClass("disabled"); }
                    else { $(this).removeClass("disabled"); }

                    var obj_first_date = arr_date_format["first_date"];
                    var str_full_first_date = format_date_return_first_last_date(obj_first_date);
                    $(".btn-prev-date-lowest-price" + str_data_name).attr("data-first-date", str_full_first_date);

                    var obj_last_date = arr_date_format["last_date"];
                    var str_full_last_date = format_date_return_first_last_date(obj_last_date);
                    $(this).attr("data-last-date", str_full_last_date);

                    var obj_list_date = arr_date_format["list_date"];

                    var date_selected = $(".list-lowest-price-flight" + str_data_name).attr('data-date-selected') + '';

                    $(".list-lowest-price-flight" + str_data_name).animate({
                        left: "-900",
                        //height: "toggle"
                    }, 200,
                        function () {
                            var str_data = '';
                            $(".list-lowest-price-flight" + str_data_name).css({ left: "0px" }).html("");
                            obj_list_date.map(function (element, index) {

                                var str_week_day = element.weekday;
                                var str_day = element.day;
                                var str_month = element.month;
                                var str_year = element.year;
                                var str_stop = (element.stop == "1") ? 'disabled' : '';
                                var str_date_current = element.fulldate_base;
                                var str_active = (str_date_current === date_selected) ? 'active' : '';
                                var str_stop_loadding = (element.stop == "1") ? '-' : '<i class="fa fa-spin fa-spinner"></i>';
                                var str_mid_day = (element.mid_day == 1) ? 'mid-day' : '';
                                str_data += '<div data-date-base="' + str_date_current + '" class="item-date ' + str_mid_day + ' ' + str_stop + ' ' + str_active + '" >' + str_week_day + ', ' + str_day + '/' + str_month + '<span class="price">' + str_stop_loadding + '</span></div>';
                            });
                            $(".list-lowest-price-flight" + str_data_name).html(str_data);
                            var info_date_summary = { list_date: ".list-lowest-price-flight" + str_data_name, data_name: data_name };
                            APPS_FLIGHT_MASTER.api_flight_count_summary_price(info_date_summary);
                        });
                }
            }); // BTN NEXT

            $(".btn-prev-date-lowest-price").click(function () {

                var data_name = $(this).data('name');
                var str_data_name = '.type-' + data_name;
                var chk_stop_prev = $(this).hasClass("disabled");
                var str_loading_price = $(this).hasClass("loading-price");

                if (!chk_stop_prev && !str_loading_price) {
                    var first_date = $(this).attr("data-first-date");
                    var first_date_format = new Date(first_date);

                    var arr_date_info = new Array();
                    arr_date_info["date_format"] = first_date_format;
                    arr_date_info["type_itinerary"] = 'type-' + data_name;
                    arr_date_info["itinerary"] = $('.box-input-info-flight input.txt-flight-itinerary').val();
                    arr_date_info["type_direct"] = "prev";
                    var date_limit = $('.box-input-info-flight input.txt-flight-departuredate-format').val();
                    var date_limit_format = (date_limit != '') ? new Date(date_limit) : '';
                    arr_date_info["date_limit"] = date_limit_format;

                    var arr_date_format = format_date_return_data(arr_date_info, 'minus');
                    //console.log(arr_date_format);
                    $(".btn-next-date-lowest-price" + str_data_name).removeClass("disabled");
                    if (arr_date_format['stop'] == 1) { $(this).addClass("disabled"); }
                    else { $(this).removeClass("disabled"); }

                    var obj_first_date = arr_date_format["first_date"];
                    var str_full_first_date = format_date_return_first_last_date(obj_first_date);
                    $(this).attr("data-first-date", str_full_first_date);

                    var obj_last_date = arr_date_format["last_date"];
                    var str_full_last_date = format_date_return_first_last_date(obj_last_date);
                    $(".btn-next-date-lowest-price" + str_data_name).attr("data-last-date", str_full_last_date);

                    var obj_list_date = arr_date_format["list_date"];

                    var date_selected = $(".list-lowest-price-flight" + str_data_name).attr('data-date-selected') + '';
                    $(".list-lowest-price-flight" + str_data_name).animate({
                        left: "900",
                        //height: "toggle"
                    }, 200,
                        function () {
                            //$(this).css({left:'0px'});
                            var str_data = '';
                            $(".list-lowest-price-flight" + str_data_name).css({ left: "0px" }).html("");
                            obj_list_date.map(function (element, index) {

                                var str_week_day = element.weekday;
                                var str_day = element.day;
                                var str_month = element.month;
                                var str_stop = (element.stop == "1") ? 'disabled' : '';
                                var str_date_current = element.fulldate_base;
                                var str_active = (str_date_current === date_selected) ? 'active' : '';
                                var str_stop_loadding = (element.stop == "1") ? '-' : '<i class="fa fa-spin fa-spinner"></i>';
                                var str_mid_day = (element.mid_day == 1) ? 'mid-day' : '';
                                str_data += '<div data-date-base="' + str_date_current + '" class="item-date ' + str_mid_day + ' ' + str_stop + ' ' + str_active + '" >' + str_week_day + ', ' + str_day + '/' + str_month + '<span class="price">' + str_stop_loadding + '</span></div>';
                            });

                            $(".list-lowest-price-flight" + str_data_name).html(str_data);
                            var info_date_summary = { list_date: ".list-lowest-price-flight" + str_data_name, data_name: data_name };
                            APPS_FLIGHT_MASTER.api_flight_count_summary_price(info_date_summary);
                        });
                }
            }); // BTN PREV

            $(document).on('click', '.list-lowest-price-flight .item-date:not(.disabled)', function () {
                var chk_itinerary_depart = $(this).parent().hasClass("type-depart");
                var chk_itinerary_full = $(this).parent().hasClass("type-full");
                var adult = $('.box-input-info-flight input.txt-flight-adult').val();
                var child = $('.box-input-info-flight input.txt-flight-child').val();
                var infant = $('.box-input-info-flight input.txt-flight-infant').val();
                var device = $('.box-input-info-flight input.txt-flight-device').val();
                var itinerary = $('.box-input-info-flight input.txt-flight-itinerary').val();
                var departure = $('.box-input-info-flight input.txt-flight-departure').val();
                var destination = $('.box-input-info-flight input.txt-flight-destination').val();
                var departuredate = $('.box-input-info-flight input.txt-flight-departuredate').val();
                var returndate = $('.box-input-info-flight input.txt-flight-returndate').val();

                if (chk_itinerary_depart || chk_itinerary_full) { departuredate = $(this).attr('data-date-base'); }
                else { returndate = $(this).attr('data-date-base'); }
                var link = url_link_home + '/flightsearch?Itinerary=' + itinerary + '&Departure=' + departure + '&Destination=' + destination + '&DepartureDate=' + departuredate + '&ReturnDate=' + returndate + '&Adult=' + adult + '&Child=' + child + '&Infant=' + infant + '&device=' + device;
                window.location.href = link;
            }); // GET LINK

            $('.btn-toggle-price-week').click(function () {

                var chk_RT = $(this).hasClass("type-RT");
                if (chk_RT) {
                    var chk_data_name = $(this).hasClass("type-depart");
                    if (chk_data_name) {
                        if ($(this).parent().hasClass("active")) {
                            $(this).parent().removeClass("active");
                            $(".box-list-lowest-price-flight.type-depart").addClass("hidden");
                        }
                        else {
                            $(this).parent().addClass("active");
                            $(".box-list-lowest-price-flight.type-depart").removeClass("hidden");
                        }
                    } // depart
                    else {
                        if ($(this).parent().hasClass("active")) {
                            $(this).parent().removeClass("active");
                            $(".box-list-lowest-price-flight.type-return").addClass("hidden");
                        }
                        else {
                            $(this).parent().addClass("active");
                            $(".box-list-lowest-price-flight.type-return").removeClass("hidden");
                        }

                    } // return
                }
                else {
                    if ($(this).parent().hasClass("active")) {
                        $(this).parent().removeClass("active");
                        $(".box-list-lowest-price-flight").addClass("hidden");
                    }
                    else {
                        $(this).parent().addClass("active");
                        $(".box-list-lowest-price-flight").removeClass("hidden");
                    }
                }


            }); // toggle table lowest price

        });
    },
    api_flight_system_filter: function () {
        $(document).ready(function () {

            var arr_class = ["type-time", "type-airlines", "type-display-mode", "type-sort"];
            arr_class.map(function (element, index) {
                $(document).on("click", ".btn-popup." + element, function () {
                    var chk_type_time = $(".box-filter-flight." + element).hasClass("hidden");
                    if (chk_type_time) { $(".box-filter-flight." + element).removeClass("hidden"); }
                    else { $(".box-filter-flight." + element).addClass("hidden"); }
                });
            });
            //$('[data-toggle="popover"]').popover();
            $('body').on('click', function (e) {

                if ($(e.target).data('toggle') !== 'popup-filter'
                    && $(e.target).parents('.box-filter-flight').length === 0) {
                    $(".box-filter-flight").addClass("hidden");
                }

                //            //only buttons
                //            if ($(e.target).data('toggle') !== 'popover'
                //                && $(e.target).parents('.popover.in').length === 0) { 
                //                $('[data-toggle="popover"]').popover('hide');
                //            }
                //            
            });
        });

    },
    api_flight_loading_process_flight: function () {
        "use strict";
        $(document).ready(function () {

            function getRndInteger(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            var dem = 0;
            var coun_inverval = getRndInteger(50, 500);
            var chk_interval = setInterval(function () {
                dem++;
                if (dem <= 98) {
                    $('.box-progress-loading-flight .progress-bar').css({ 'width': dem + '%' });
                    $(".box-title-loadding-flight span").html("(" + dem + "%)");
                    coun_inverval = getRndInteger(50, 500);
                }
                if (dem == 98) { clearInterval(chk_interval); }
            }, coun_inverval);

        });
    },
    api_flight_toggle_change_form_flight: function () {
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

};
APPS_FLIGHT_MASTER.init();
