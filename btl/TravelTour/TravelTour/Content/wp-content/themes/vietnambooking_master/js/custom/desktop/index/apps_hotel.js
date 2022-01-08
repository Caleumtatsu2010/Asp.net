var APPS_HOTEL = {
    init: function () {

        // FORM HOTEL

        this.autocomplete_date_start_and_end_domestic();
        this.autocomplete_date_start_and_end_internation();
        this.submit_search_form_hotel();
        // END FORM HOTEL


        // SYSTEM HOTEL FILTER POST
        this.system_hotel_filter_post();
        this.hotel_filter_sort_list_hotels();

        // SYSTEM HOTEL SEARCH PRICE ROOM
        this.system_search_price_room();
        // 
        this.system_get_option_hotel_room();
        this.system_order_book_option_hotel_room();

        this.load_data_when_action_tab_hotel();

        // HOTEL EVENT & BEST PRICE SYSTEM
        this.index_hotel_system_hotel_event();
        this.index_hotel_system_best_price();
    },
    // HOTEL BEST PRICE SYSTEM
    index_hotel_system_best_price: function () {
        $(document).ready(function () {
            // process data best price
            //box-form-received-best-price
            $(document).on("click", ".btn-popup-received-best-price", function () {
                var id_hotel = $(this).data("id-hotel");
                var id_hotel_room_type = $(this).data("id-hotel-room-type");

                $(".box-form-received-best-price .txt-id-hotel").val(id_hotel);
                $(".box-form-received-best-price .txt-id-hotel-room-type").val(id_hotel_room_type);

            });

            $(document).on("click", ".box-form-received-best-price .btn-hotel-best-price-submit", function () {
                var obj_best_price = $(".box-form-received-best-price");
                var str_id_hotel = obj_best_price.find(".txt-id-hotel").val();
                var str_id_hotel_room_type = obj_best_price.find(".txt-id-hotel-room-type").val();
                var str_date_start = obj_best_price.find(".txt-hotel-best-price-date-start").val();
                var str_date_end = obj_best_price.find(".txt-hotel-best-price-date-end").val();
                var str_email = obj_best_price.find(".txt-hotel-best-price-email").val();
                var str_phone = obj_best_price.find(".txt-hotel-best-price-phone").val();
                var prefix_captcha = obj_best_price.find(".prefix-cap-hotel-best-price").val();
                var captcha_best_price = obj_best_price.find(".txt-captcha-best-price").val();

                var is_valid = true;
                if (str_id_hotel == '' || str_id_hotel_room_type == '' || str_date_start == '' || str_date_end == '' || str_email == '' || str_phone == '' || prefix_captcha == '' || captcha_best_price == '') { is_valid = false; }
                if (is_valid) {
                    var obj_data = {
                        id_hotel: str_id_hotel, id_hotel_room_type: str_id_hotel_room_type,
                        date_start: str_date_start, date_end: str_date_end, email: str_email, phone: str_phone,
                        prefix_captcha: prefix_captcha, captcha_best_price: captcha_best_price
                    };
                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        data: { action: 'api_hotel_ajax_received_best_price', obj_data: obj_data },
                        success: function (data) {
                            if (data == 1) {
                                $(".box-form-received-best-price").html("<div class='alert alert-success'>Báº¡n Ä‘Ã£ gá»­i thÃ nh cÃ´ng, chÃºng tÃ´i sáº½ liÃªn há»‡ báº¡n sá»›m!</div>");
                            }
                            else {
                                alert("CÃ³ lá»—i sáº£y ra, xin vui lÃ²ng kiá»ƒm tra láº¡i.");
                            }

                        },
                        error: function (data, response) { }
                    });
                }
                else { alert("Xin vui lÃ²ng Ä‘iá»n Ä‘áº§y Ä‘á»§ trÆ°á»›c khi gá»­i"); }

            });


            var hotel_date_start = $.cookie("hotel_date_start");
            var hotel_date_end = $.cookie("hotel_date_end");
            if (hotel_date_start != '' && hotel_date_end != '') {
                $(".txt-hotel-best-price-date-start").val(hotel_date_start);
                $(".txt-hotel-best-price-date-end").val(hotel_date_end);
            }
            $(".txt-hotel-best-price-date-start").datepickerlunar({
                dateFormat: "dd/mm/yy",
                minDate: 0,
                changeMonth: false,
                numberOfMonths: 1,
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass('ui-helper-hidden-accessible');
                    //if($(input).prop('disabled')){return false;}
                    $('#ui-datepicker-div').addClass("flight-box-date");

                },
                onSelect: function (datetext, inst) {
                    //console.log(inst);
                },
                onClose: function (datetext, inst) {
                    if (datetext != '') {
                        var date = $(this).datepickerlunar('getDate');
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getFullYear();
                        var max_date = new Date(year, month, day);

                        var day_next = date.getDate() + 1;
                        var month_next = date.getMonth();
                        var year_next = date.getFullYear();
                        var min_date_next = new Date(year_next, month_next, day_next);

                        $(".txt-hotel-best-price-date-end").datepickerlunar("option", "minDate", min_date_next);
                        $(".txt-hotel-best-price-date-end").datepickerlunar("option", "maxDate", max_date);

                    }
                },

            });

            $(".txt-hotel-best-price-date-end").datepickerlunar({
                dateFormat: "dd/mm/yy",
                maxDate: '+1M',
                changeMonth: false,
                numberOfMonths: 1,
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass('ui-helper-hidden-accessible');
                    //if($(input).prop('disabled')){return false;}
                    $('#ui-datepicker-div').addClass("flight-box-date");
                },
                onSelect: function (datetext, inst) {
                    //console.log(inst);
                },
                onClose: function (datetext, inst) {
                },
            });
        });
    },
    // HOTEL EVENT SYSTEM
    index_hotel_system_hotel_event: function () {
        "use strict";
        $(document).ready(function () {

            $("#hotel-event-box-popup").on("change", ".box-list-age-child select", function () {
                count_info_room_peopole();
            });

            function count_info_room_peopole() {
                var num_room = parseInt($(".box-hotel-event-select-option .num-room").text());
                var num_adult = parseInt($(".box-hotel-event-select-option .num-adult").text());
                var num_child = parseInt($(".box-hotel-event-select-option .num-child").text());

                var str_age_child = "";
                if (num_child > 0) {
                    $(".box-list-age-child select").each(function (i, e) {
                        var val_selected = $(this).find("option:selected").val();
                        str_age_child += val_selected + ",";

                    });
                }
                str_age_child = (str_age_child == "") ? "0" : str_age_child.replace(/,$/, "");

                $(".txt-hotel-event-info-room-people").val(num_adult + " ngÆ°á»i lá»›n, " + num_child + " tráº» em");
                $(".txt-hotel-event-info-room-people-hidden").val(num_room + "," + num_adult + "," + num_child + "," + str_age_child);

            }

            // POPUP HOTEL EVENT
            $("#hotel-event-box-popup").on("click", '.box-hotel-event-select-option .box-system-room span', function () {
                var str_type = $(this).attr("data-type");
                var num_room = parseInt($(".box-hotel-event-select-option .num-room").text());
                var num_adult = parseInt($(".box-hotel-event-select-option .num-adult").text());
                if (str_type == 'plus') {
                    if (num_room < 9) {
                        num_room = num_room + 1;
                        if (num_adult < num_room && num_adult < 50) { num_adult = num_adult + 1; }
                    }
                }
                else if (str_type == 'minus') { if (num_room > 1) { num_room = num_room - 1; } }
                if (str_type == 'plus' || str_type == 'minus') {
                    $(".box-hotel-event-select-option .num-room").text(num_room);
                    $(".box-hotel-event-select-option .num-adult").text(num_adult);
                    count_info_room_peopole();
                }



            });

            $("#hotel-event-box-popup").on("click", '.box-hotel-event-select-option .box-system-adult span', function () {
                var str_type = $(this).attr("data-type");
                var num_adult = parseInt($(".box-hotel-event-select-option .num-adult").text());
                if (str_type == 'plus') {
                    if (num_adult < 50) {
                        num_adult = num_adult + 1;
                    }
                }
                else if (str_type == 'minus') { if (num_adult > 1) { num_adult = num_adult - 1; } }
                if (str_type == 'plus' || str_type == 'minus') {
                    $(".box-hotel-event-select-option .num-adult").text(num_adult);
                    count_info_room_peopole();
                }


            });

            $("#hotel-event-box-popup").on("click", '.box-hotel-event-select-option .box-system-child span', function () {
                var str_type = $(this).attr("data-type");
                var num_child = parseInt($(".box-hotel-event-select-option .num-child").text());
                if (str_type == 'plus') {
                    if (num_child < 12) {
                        num_child = num_child + 1;
                    }
                }
                else if (str_type == 'minus') { if (num_child > 0) { num_child = num_child - 1; } }
                if (str_type == 'plus' || str_type == 'minus') {
                    $(".box-hotel-event-select-option .num-child").text(num_child);
                    if (num_child > 0 && num_child <= 12) {
                        $(".box-hotel-event-select-option .box-info-child").removeClass("hidden");
                        var str_html_option_num_child = '';
                        for (var i = 1; i <= num_child; i++) {
                            str_html_option_num_child += '<select name="slc_age_child_' + i + '" class="slc-age-child">';
                            for (var j = 0; j <= 17; j++) {
                                var str_j = (j == 0) ? "<1" : j;
                                var str_selected = (j == 7) ? 'selected' : '';
                                str_html_option_num_child += '<option ' + str_selected + ' value="' + j + '">' + str_j + '</option>';
                            }
                            str_html_option_num_child += '</select>';
                        }
                        $(".box-hotel-event-select-option .box-info-child div.box-list-age-child").html(str_html_option_num_child);
                    }
                    else if (num_child == 0) {
                        $(".box-hotel-event-select-option .box-info-child div.box-list-age-child").html("");
                        $(".box-hotel-event-select-option .box-info-child").addClass("hidden");
                    }

                    count_info_room_peopole();
                }

            });


            $("#hotel-event-box-popup").on('click', function (e) {
                if (e.target.id === 'box-hotel-event-select-option' || e.target.id === 'txt-hotel-event-info-room-people') { }
                else {
                    if ($('#box-hotel-event-select-option').hasClass("hidden") == false && $('#box-hotel-event-select-option').text() != "" && e.target.offsetParent != null) {
                        var str_className = $.trim(e.target.offsetParent.className);
                        var arr_box_popup = ["box-hotel-event-select-option", "input-group-btn", "btn btn-default", ""];
                        if (arr_box_popup.indexOf(str_className) === -1) { $('#box-hotel-event-select-option').addClass("hidden"); }
                    }
                }

            });
            $(document).on("click", ".txt-hotel-event-info-room-people", function () {
                if ($('.box-hotel-event-select-option').hasClass("hidden")) {
                    $('.box-hotel-event-select-option').removeClass("hidden");
                }
                else { $('.box-hotel-event-select-option').addClass("hidden"); }

            });
            // BOOK HOTEL EVENT
            $('.btn-popup-book-hotel-event').click(function () {
                $("#hotel-event-box-popup .modal-body").html("<i class='fa fa-spin fa-spinner'></i>");
                var id_post = $("#hotel-event-box-popup").attr("data-id");
                $.ajax({
                    url: adminurl,
                    type: 'post',
                    data: { action: 'index_hotel_ajax_generation_form_book_hotel_event', id_post: id_post, type_device: "desktop" },
                    success: function (data) {
                        $("#hotel-event-box-popup .modal-body").html(data);
                    },
                    error: function (data, response) { }
                });


            });

        });
    },

    //**************
    websocket_update_order_hotel: function (data) {
        var socket = io("https://vnbk.herokuapp.com");
        socket.emit("emit_query_update_order_hotel_vnbk", data);
    },
    system_order_book_option_hotel_room: function () {
        "use strict";
        $(document).ready(function () {

            $(".hotel-content-note-special input.chk-toggle-note-special").click(function () {

                var str_content = '';
                $(".hotel-content-note-special input.chk-toggle-note-special").each(function () {
                    var chk_checked = $(this).is(":checked");
                    if (chk_checked === true) { str_content += $(this).val() + ', '; }

                });
                str_content = str_content.replace(/, $/i, '');
                $(".hotel-content-note-special textarea").val(str_content);
            });


            $(document).on("click", ".hotel-content-export-bill .chk-toggle-export-bill", function () {
                var chk_toggle = $(this).is(":checked");
                if (chk_toggle == true) {
                    $(".hotel-content-export-bill input[type='text']").attr("required", "required");
                    $(".hotel-content-export-bill input[type='text'].txt-address-receive-export-bill").removeAttr("required");
                }
                else { $(".hotel-content-export-bill input[type='text']").removeAttr("required"); }
            });

            $('.box-change-type-payment.hotel-payment input[name="rad_type_payment"]').change(function () {
                var val_rad = $(this).val();
                if (val_rad == 'van_phong') { $('.box-tai-nha').addClass('hidden'); $('.box-chuyen-khoan').addClass('hidden'); $('.box-van-phong').removeClass('hidden'); }
                else if (val_rad == 'tai_nha') { $('.box-tai-nha').removeClass('hidden'); $('.box-chuyen-khoan').addClass('hidden'); $('.box-van-phong').addClass('hidden'); }
                else if (val_rad == 'chuyen_khoan') { $('.box-tai-nha').addClass('hidden'); $('.box-chuyen-khoan').removeClass('hidden'); $('.box-van-phong').addClass('hidden'); }

            }); //rad_change_payment_page_booking_hotel

            $(document).on('click', ".btn-toggle-export-bill,.btn-toggle-note-special", function () {

                var data_type = $(this).attr("data-type");
                var val_class = $(this).attr("class");
                if (val_class === 'btn-toggle-export-bill') {
                    if (data_type === 'closed') {
                        $(this).attr("data-type", "open");
                        $(".btn-toggle-note-special").attr("data-type", 'closed');

                        $(this).find("i").removeClass("fa-plus-circle").addClass("fa-minus-circle");
                        $('.btn-toggle-note-special').find("i").removeClass("fa-minus-circle").addClass("fa-plus-circle");

                        $(".hotel-content-export-bill").removeClass("hidden");
                        $(".hotel-content-note-special").addClass("hidden");
                    }
                    else {
                        $(this).attr("data-type", "closed");
                        $(".btn-toggle-note-special").attr("data-type", 'closed');

                        $(this).find("i").removeClass("fa-minus-circle").addClass("fa-plus-circle");
                        $('.btn-toggle-note-special').find("i").removeClass("fa-minus-circle").addClass("fa-plus-circle");

                        $(".hotel-content-export-bill").addClass("hidden");
                        $(".hotel-content-note-special").addClass("hidden");
                    }
                }
                else if (val_class === 'btn-toggle-note-special') {
                    if (data_type === 'closed') {
                        $(this).attr("data-type", "open");
                        $(".btn-toggle-export-bill").attr("data-type", 'closed');

                        $(this).find("i").removeClass("fa-plus-circle").addClass("fa-minus-circle");

                        $('.btn-toggle-export-bill').find("i").removeClass("fa-minus-circle").addClass("fa-plus-circle");
                        $(".hotel-content-note-special").removeClass("hidden");
                        $(".hotel-content-export-bill").addClass("hidden");
                    }
                    else {
                        $(this).attr("data-type", "closed");
                        $(".btn-toggle-export-bill").attr("data-type", 'closed');

                        $(this).find("i").removeClass("fa-minus-circle").addClass("fa-plus-circle");

                        $('.btn-toggle-export-bill').find("i").removeClass("fa-minus-circle").addClass("fa-plus-circle");
                        $(".hotel-content-note-special").addClass("hidden");
                        $(".hotel-content-export-bill").addClass("hidden");
                    }
                }

            });
        });
    },
    system_get_option_hotel_room: function () {
        "use strict";
        $(document).ready(function () {
            $(document).on("click", ".box-check-room-bed input", function () {
                var id_index = $(this).parent().parent().parent().attr("data-index");
                var id_room_type = $(this).parent().parent().parent().attr("data-room-type");
                var dem = 0;
                $(this).parent().parent().parent().find("input:checked").each(function () { dem++; });
                if (dem > 0) { $(".txt-bed-extra-room-hotel.type-index-" + id_index + ".room-type-" + id_room_type).val(dem); }
                else { $(".txt-bed-extra-room-hotel.type-index-" + id_index + ".room-type-" + id_room_type).val(""); }
            });

            $(document).on("click", ".btn-readmore-room-hotel", function () {
                var chk_toggle = $(this).attr("data-toggle");
                var count_row = $(this).attr("data-total-row");
                var id_room_type = $(this).attr("data-room-type");
                if (chk_toggle === 'less') {
                    $(this).attr("data-toggle", 'open');
                    $(this).html('<i class="fa fa-chevron-up"></i> Thu gá»n');
                    $(".hotel-tlb-list-room[data-room-type='" + id_room_type + "']").find("td[rowspan='2']").attr("rowspan", count_row);
                    $(".hotel-tlb-list-room[data-room-type='" + id_room_type + "']").find(".toggle-readmore").removeClass("hidden");
                }
                else if (chk_toggle === 'open') {
                    $(this).attr("data-toggle", 'less');
                    $(this).html('<i class="fa fa-chevron-down"></i> Xem thÃªm');
                    $(".hotel-tlb-list-room[data-room-type='" + id_room_type + "']").find("td[rowspan='" + count_row + "']").attr("rowspan", "2");
                    $(".hotel-tlb-list-room[data-room-type='" + id_room_type + "']").find(".toggle-readmore").addClass("hidden");
                }
            });
            function active_room_slider() {

                var owl_slider_hotel_box_slider = $(".hotel-room-box-slider .hotel-room-box-slider-inner .owl-carousel");
                owl_slider_hotel_box_slider.owlCarousel({
                    items: 1,
                    navigation: true, // Show next and prev buttons
                    nav: true,
                    navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
                    autoplay: true,
                    autoplayTimeout: 5000,
                    //                autoWidth:true,
                    stopOnHover: true,
                    margin: 10,

                }); // SLIDER TYPE THEME

                //                $(".hotel-room-box-slider .hotel-room-box-slider-inner .owl-carousel").owlCarousel({
                //                    navigation : true, // Show next and prev buttons
                //                    navigationText : ["<div class='arrow-left-slider'><i class='fa fa-chevron-left fa-5x' aria-hidden='true'></i></div>","<div class='arrow-right-slider'><i class='fa fa-chevron-right fa-5x' aria-hidden='true'></i></div>"],
                //                    slideSpeed : 300,
                //                    paginationSpeed : 400,
                //                    singleItem:true,
                //                    autoPlay: 5000,
                //                    stopOnHover: true,
                //                });
            }

            $(document).on("click", ".box-column-right-room-hotel", function () {

                $("#modal-hotel-room-img-and-services .modal-content").addClass("active");
                $("#modal-hotel-room-img-and-services .modal-content .modal-content-left").addClass("active");
                $("#modal-hotel-room-img-and-services .modal-content .modal-content-right").addClass("active");

                var content_right = $(this).find(".box-content-hotel-room-policy").html();
                $("#modal-hotel-room-img-and-services .modal-content .modal-content-right").html(content_right);

                var id_room_type = $(this).attr("data-room-type");

                var str_item = '';
                $(".box-img-hotel-room-type-" + id_room_type + " img").each(function () {
                    var img_src = $(this).attr("data-img");
                    str_item += '<div class="item"><div class="box-img"><img src="' + img_src + '" /></div></div>';
                });
                $(".hotel-room-box-slider .hotel-room-box-slider-inner").html('<div class="owl-carousel">' + str_item + '</div>');
                active_room_slider();

                var name_hotel_room_type = $('.box-column-left-room-hotel[data-room-type="' + id_room_type + '"]').find(".txt-name-hotel-room-type").val();
                var area_hotel_room = $('.box-column-left-room-hotel[data-room-type="' + id_room_type + '"]').find(".box-area-hotel-room").html();
                var direction_hotel_room = $('.box-column-left-room-hotel[data-room-type="' + id_room_type + '"]').find(".box-direction-hotel-room").html();
                var bed_hotel_room = $('.box-column-left-room-hotel[data-room-type="' + id_room_type + '"]').find(".box-bed-hotel-room").html();
                var list_room_services = $('.box-column-left-room-hotel[data-room-type="' + id_room_type + '"]').find(".box-list-room-services").html();

                var str_hotel_room_type = "<div class='box-title-modal'>" + name_hotel_room_type + "</div>";
                var str_option_header = "<ul><li>" + area_hotel_room + "</li><li>" + direction_hotel_room + "</li><li>" + bed_hotel_room + "</li></ul>";
                $("#modal-hotel-room-img-and-services .box-info-header-modal").html(str_hotel_room_type + str_option_header);
                $("#modal-hotel-room-img-and-services .box-content-data-footer").html(list_room_services);


            });

            $(document).on("click", ".box-column-left-room-hotel", function () {

                $("#modal-hotel-room-img-and-services .modal-content").removeClass("active");
                $("#modal-hotel-room-img-and-services .modal-content .modal-content-left").removeClass("active");
                $("#modal-hotel-room-img-and-services .modal-content .modal-content-right").html("");
                $("#modal-hotel-room-img-and-services .modal-content .modal-content-right").removeClass("active");

                var id_room_type = $(this).attr("data-room-type");

                var str_item = '';
                $(".box-img-hotel-room-type-" + id_room_type + " img").each(function () {
                    var img_src = $(this).attr("data-img");
                    str_item += '<div class="item"><div class="box-img"><img src="' + img_src + '" /></div></div>';

                });
                $(".hotel-room-box-slider .hotel-room-box-slider-inner").html('<div class="owl-carousel">' + str_item + '</div>');
                active_room_slider();


                var name_hotel_room_type = $(this).find(".txt-name-hotel-room-type").val();
                var area_hotel_room = $(this).find(".box-area-hotel-room").html();
                var direction_hotel_room = $(this).find(".box-direction-hotel-room").html();
                var bed_hotel_room = $(this).find(".box-bed-hotel-room").html();
                var list_room_services = $(this).find(".box-list-room-services").html();

                var str_hotel_room_type = "<div class='box-title-modal'>" + name_hotel_room_type + "</div>";
                var str_option_header = "<ul><li>" + area_hotel_room + "</li><li>" + direction_hotel_room + "</li><li>" + bed_hotel_room + "</li></ul>";
                $("#modal-hotel-room-img-and-services .box-info-header-modal").html(str_hotel_room_type + str_option_header);
                $("#modal-hotel-room-img-and-services .box-content-data-footer").html(list_room_services);
            });

            $(document).on("change", ".slc-number-room-hotel", function () {
                var id_room_type = $(this).attr("data-room-type");
                var id_index = $(this).attr("data-index");
                var val_number_room = $(this).val();

                $(".txt-total-room-hotel.type-index-" + id_index + ".room-type-" + id_room_type).val(val_number_room);

                var str_option_room = '';
                for (var i = 1; i <= val_number_room; i++) { str_option_room += '<label><input type="checkbox" value="' + i + '" /> ThÃªm vÃ o phÃ²ng ' + i + '</label>'; }
                $(".box-check-room-bed.type-index-" + id_index + "[data-room-type='" + id_room_type + "'] form").html(str_option_room);
            }); // END GET NUMBER ROOM
        });
    },
    system_get_cookie_hotel_room: function () {
        "use strict";
        var hotel_date_start = $.cookie("hotel_date_start");
        var hotel_date_end = $.cookie("hotel_date_end");

        var hotel_total_room = $.cookie("hotel_total_room");
        var hotel_total_adult = $.cookie("hotel_total_adult");
        var hotel_total_child = $.cookie("hotel_total_child");
        var hotel_total_age_child = $.cookie("hotel_total_age_child");
        if (hotel_date_start != null && hotel_date_end != null) {
            $(".txt-hotel-box-search-date-start").val(hotel_date_start);
            $(".txt-hotel-box-search-date-end").val(hotel_date_end);
        }
        if (hotel_total_room != null) {
            $(".txt-item-number-room").val(hotel_total_room);
            $(".txt-item-number-adult").val(hotel_total_adult);
            $(".txt-item-number-child").val(hotel_total_child);
            $(".txt-item-number-age-child").val(hotel_total_age_child);
            var chk_age_child = false;
            var full_select_age = '';
            if (hotel_total_age_child != '') {
                chk_age_child = true;
                var max_age_child = $(".txt-max-age-child").val();
                var str_select_age = '<select class="form-control slc-item-age-child"><option value="0"><1</option>';
                for (var i = 1; i <= max_age_child; i++) { str_select_age += '<option value="' + i + '">' + i + '</option>'; }
                str_select_age = str_select_age + '</select>';

                var arr_age_child = hotel_total_age_child.split(",");
                for (var i = 0; i < arr_age_child.length; i++) {
                    var str_query = 'value="' + arr_age_child[i] + '"';
                    var str_select_age_selected = str_select_age.replace(str_query, str_query + " selected='selected'");
                    full_select_age += str_select_age_selected;
                }
            }

            $(".box-number-person-room-night .number-adult").text(hotel_total_adult);
            $(".box-number-person-room-night .number-child").text(hotel_total_child);
            $(".box-number-person-room-night .number-room").text(hotel_total_room);

            //box-details-age-child hidden
            var content_dropmenu = $(".btn-dropdown-number-person-room-night").attr("data-content");
            content_dropmenu = content_dropmenu.replace(/item-number-room.* PhÃ²ng/, 'item-number-room">' + hotel_total_room + "<\/span> PhÃ²ng");
            if (chk_age_child === true) { content_dropmenu = content_dropmenu.replace(/box-details-age-child hidden/, 'box-details-age-child'); }
            content_dropmenu = content_dropmenu.replace(/item-number-adult.* NgÆ°á»i lá»›n/, 'item-number-adult">' + hotel_total_adult + "<\/span> NgÆ°á»i lá»›n");
            content_dropmenu = content_dropmenu.replace(/input-group">/, 'input-group">' + full_select_age);
            var content_dropmenu_format = content_dropmenu.replace(/item-number-child.* Tráº» em/, 'item-number-child">' + hotel_total_child + "<\/span> Tráº» em");
            $(".btn-dropdown-number-person-room-night").attr("data-content", content_dropmenu_format);

        }

        setTimeout(function () { $(".btn-hotel-search-room").trigger("click"); }, 1000);

    },
    system_search_price_room: function () {
        "use strict";
        $(document).ready(function () {

            $(".btn-hotel-search-room").click(function () {

                $(this).attr("disabled", "disabled");
                $(".box-full-list-hotel-room").html('');
                $(".box-loading-hotel-room").removeClass("hidden");
                var date_start = $(".txt-hotel-box-search-date-start").val();
                var date_end = $(".txt-hotel-box-search-date-end").val();
                var total_room = $(".txt-item-number-room").val();
                var total_adult = $(".txt-item-number-adult").val();
                var total_child = $(".txt-item-number-child").val();
                var total_age_child = $(".txt-item-number-age-child").val();


                var id_hotel = $(".txt-item-id-hotel").val();

                $.cookie("hotel_date_start", date_start);
                $.cookie("hotel_date_end", date_end);

                $.cookie("hotel_total_room", total_room);
                $.cookie("hotel_total_adult", total_adult);
                $.cookie("hotel_total_child", total_child);
                $.cookie("hotel_total_age_child", total_age_child);


                $.ajax({
                    url: adminurl,
                    type: 'post',
                    data: { action: 'index_ajax_get_list_hotel_room', id_hotel: id_hotel, date_start: date_start, date_end: date_end, total_room: total_room, total_adult: total_adult, total_child: total_child, total_age_child: total_age_child },
                    cache: false,
                    success: function (data) {
                        $('.box-full-list-hotel-room').html(data);
                        $(".box-loading-hotel-room").addClass("hidden");
                        $(".btn-hotel-search-room").removeAttr("disabled");
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        //alert(xhr.status);
                        //alert(thrownError);
                    }
                });

            });

            $(document).on("change", ".popover-content .box-details-age-child .input-group select", function () {
                var str_age_value = '';

                $(this).find("option:selected").attr("selected", "selected");

                $(".popover-content .box-details-age-child .input-group select").each(function () {
                    str_age_value += $(this).val() + ',';
                });
                str_age_value = str_age_value.replace(/,$/, '');
                $('.txt-item-number-age-child').val(str_age_value);

                var data_html = $(".popover-content .number-person-room-night.dropdown-menu-default").html();
                $('.box-data-temp').html("<div class='number-person-room-night dropdown-menu-default'>" + data_html + "</div>");
                var data_temp = $('.box-data-temp').html();
                $('.btn-dropdown-number-person-room-night').attr("data-content", data_temp);
            });

            $(document).on('click', '.popover-content .tlb-details-number-person-room button.btn-item', function () {
                var name_class = $.trim($(this).attr('class').replace("btn btn-default btn-item", ""));

                var curren_number_room = parseInt($('.txt-item-number-room').val());
                var curren_number_adult = parseInt($('.txt-item-number-adult').val());
                var curren_number_child = parseInt($('.txt-item-number-child').val());
                if (name_class == 'btn-plus-number-room' || name_class == 'btn-minus-number-room') {
                    var dem_room = (name_class == 'btn-plus-number-room') ? 1 : -1;
                    if (curren_number_room <= 9 && curren_number_room >= 1) {
                        var total_room = curren_number_room + dem_room;
                        if (total_room < 10 && total_room > 0) {
                            $('.txt-item-number-room').val(total_room);
                            $('span.item-number-room').text(total_room);
                            $('span.number-room').text(total_room);
                            if (total_room > curren_number_adult) {
                                $('.txt-item-number-adult').val(total_room);
                                $('span.item-number-adult').text(total_room);
                                $('span.number-adult').text(total_room);
                            }
                        }

                    }

                }
                else if (name_class == 'btn-minus-number-adult' || name_class == 'btn-plus-number-adult') {
                    var dem_adult = (name_class == 'btn-plus-number-adult') ? 1 : -1;

                    var curren_number_room = parseInt($('.txt-item-number-room').val());

                    if (curren_number_adult <= 36 && curren_number_adult >= 1) {
                        var total_adult = curren_number_adult + dem_adult;
                        if (total_adult < 37 && total_adult > 0 && total_adult >= curren_number_room) {
                            $('.txt-item-number-adult').val(total_adult);
                            $('span.item-number-adult').text(total_adult);
                            $('span.number-adult').text(total_adult);
                        }
                    }

                }
                else if (name_class == 'btn-minus-number-child' || name_class == 'btn-plus-number-child') {
                    var dem_child = (name_class == 'btn-plus-number-child') ? 1 : -1;

                    if (curren_number_child <= 12 && curren_number_child >= 0) {
                        var total_child = curren_number_child + dem_child;
                        var max_age = $(".txt-max-age-child").val();

                        var str_option_age = '<option value="0"><1</option>';
                        for (var i = 1; i <= max_age; i++) { str_option_age += '<option value="' + i + '">' + i + '</option>'; }
                        var str_select_age = '<select class="form-control slc-item-age-child">' + str_option_age + '</select>';

                        if (total_child < 13 && total_child >= 0) {
                            $('.txt-item-number-child').val(total_child);
                            $('span.item-number-child').text(total_child);
                            $('span.number-child').text(total_child);

                            if (total_child > 0) {
                                $(".popover-content .box-details-age-child").removeClass('hidden');
                                if (dem_child == 1) {
                                    $(".popover-content .box-details-age-child .input-group").append(str_select_age);

                                    var str_age_value = '';
                                    $(".popover-content .box-details-age-child .input-group select").each(function () {
                                        str_age_value += $(this).val() + ',';
                                    });
                                    str_age_value = str_age_value.replace(/,$/, '');
                                    $('.txt-item-number-age-child').val(str_age_value);
                                }
                                else {
                                    $(".popover-content .box-details-age-child .input-group select:last-child").remove();

                                    var str_age_value = '';
                                    $(".popover-content .box-details-age-child .input-group select").each(function () {
                                        str_age_value += $(this).val() + ',';
                                    });
                                    str_age_value = str_age_value.replace(/,$/, '');
                                    $('.txt-item-number-age-child').val(str_age_value);
                                }

                            }
                            else { $(".popover-content .box-details-age-child").addClass('hidden'); $(".popover-content .box-details-age-child .input-group select").remove(); }
                        }
                    }
                }


                var data_html = $(".popover-content .number-person-room-night.dropdown-menu-default").html();
                $('.box-data-temp').html("<div class='number-person-room-night dropdown-menu-default'>" + data_html + "</div>");
                var data_temp = $('.box-data-temp').html();
                $('.btn-dropdown-number-person-room-night').attr("data-content", data_temp);



            });

            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var arr_weekday = new Array(7);
            arr_weekday[0] = "Chá»§ nháº­t"; arr_weekday[1] = "Thá»© hai"; arr_weekday[2] = "Thá»© ba"; arr_weekday[3] = "Thá»© tÆ°"; arr_weekday[4] = "Thá»© nÄƒm"; arr_weekday[5] = "Thá»© sÃ¡u"; arr_weekday[6] = "Thá»© báº£y";

            var hotel_date_start = $.cookie("hotel_date_start");
            var hotel_date_end = $.cookie("hotel_date_end");
            if (hotel_date_start != null && hotel_date_end != null) {

                var arr_date_start = hotel_date_start.split("/");
                var arr_date_end = hotel_date_end.split("/");

                var d_start = new Date(arr_date_start[2], arr_date_start[1] - 1, arr_date_start[0]);
                var d_end = new Date(arr_date_end[2], arr_date_end[1] - 1, arr_date_end[0]);


                $(".full-name-week-start").text(arr_weekday[d_start.getDay()]);
                $(".full-name-week-end").text(arr_weekday[d_end.getDay()]);

                var diffDays = Math.round(Math.abs((d_end.getTime() - d_start.getTime()) / (oneDay)));
                $(".box-number-person-room-night .number-night").text(diffDays);
            }
            else {

                var hotel_current_date = new Date();
                var hotel_current_day = hotel_current_date.getDate();
                var hotel_current_month = hotel_current_date.getMonth();
                var month = new Array(); month[0] = "01"; month[1] = "02"; month[2] = "03"; month[3] = "04"; month[4] = "05"; month[5] = "06"; month[6] = "07"; month[7] = "08"; month[8] = "09"; month[9] = "10"; month[10] = "11"; month[11] = "12";
                var hotel_current_month_format = month[hotel_current_month];
                var hotel_current_fullyear = hotel_current_date.getFullYear();
                $(".txt-hotel-box-search-date-start").val(hotel_current_day + "/" + hotel_current_month_format + "/" + hotel_current_fullyear);

                var day_of_week_start = arr_weekday[hotel_current_date.getDay()];
                $(".full-name-week-start").text(day_of_week_start);

                var hotel_current_next_date = new Date();
                hotel_current_next_date.setDate(hotel_current_next_date.getDate() + 1);



                var hotel_current_next_day = hotel_current_next_date.getDate();
                var hotel_current_next_month = hotel_current_next_date.getMonth();
                var hotel_current_next_month_format = month[hotel_current_next_month];
                var hotel_current_next_fullyear = hotel_current_next_date.getFullYear();
                $(".txt-hotel-box-search-date-end").val(hotel_current_next_day + "/" + hotel_current_next_month_format + "/" + hotel_current_next_fullyear);

                var day_of_week_end = arr_weekday[hotel_current_next_date.getDay()];
                $(".full-name-week-end").text(day_of_week_end);


                var diffDays = Math.round(Math.abs((hotel_current_next_date.getTime() - hotel_current_date.getTime()) / (oneDay)));
                $(".box-number-person-room-night .number-night").text(diffDays);
            }

            $("#hotel-box-search-date-start").datepickerlunar({
                dateFormat: "dd/mm/yy",
                minDate: 0,
                changeMonth: false,
                numberOfMonths: 1,
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass('ui-helper-hidden-accessible');
                    //if($(input).prop('disabled')){return false;}
                    $('#ui-datepicker-div').addClass("flight-box-date");

                },
                onSelect: function (datetext, inst) {
                    //console.log(inst);
                },
                onClose: function (datetext, inst) {
                    //$(this).trigger('change');
                    //alert(inst.dpDiv);
                    if (datetext != '') {
                        var date = $(this).datepickerlunar('getDate');
                        var day_of_week = arr_weekday[date.getDay()];
                        $(".full-name-week-start").text(day_of_week);
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getFullYear();
                        var max_date = new Date(year, month, day);

                        var day_next = date.getDate() + 1;
                        var month_next = date.getMonth();
                        var year_next = date.getFullYear();
                        var min_date_next = new Date(year_next, month_next, day_next);

                        $(".txt-hotel-box-search-date-end").datepickerlunar("option", "minDate", min_date_next);
                        $(".txt-hotel-box-search-date-end").datepickerlunar("option", "maxDate", max_date);

                        var date_end = $('#hotel-box-search-date-end').datepickerlunar('getDate');
                        var day_of_week_end = arr_weekday[date_end.getDay()];
                        $(".full-name-week-end").text(day_of_week_end);

                        var diffDays = Math.round(Math.abs((date_end.getTime() - date.getTime()) / (oneDay)));
                        $(".box-number-person-room-night .number-night").text(diffDays);
                    }
                },

            });

            if (($('#hotel-box-search-date-start').val() != null)) {
                var date_next = $('#hotel-box-search-date-start').datepickerlunar('getDate');
                var day = date_next.getDate() + 1;
                var month = date_next.getMonth();
                var year = date_next.getFullYear();
                var min_date_next = new Date(year, month, day);
                $("#hotel-box-search-date-end").datepickerlunar({
                    dateFormat: "dd/mm/yy",
                    minDate: min_date_next,
                    maxDate: '+1M',
                    changeMonth: false,
                    numberOfMonths: 1,
                    beforeShow: function (input, inst) {
                        inst.dpDiv.removeClass('ui-helper-hidden-accessible');
                        //if($(input).prop('disabled')){return false;}
                        $('#ui-datepicker-div').addClass("flight-box-date");
                    },
                    onSelect: function (datetext, inst) {
                        //console.log(inst);
                    },
                    onClose: function (datetext, inst) {
                        //$(this).trigger('change');
                        //alert(inst.dpDiv);
                        var date = $(this).datepickerlunar('getDate');
                        var day_of_week = arr_weekday[date.getDay()];
                        $(".full-name-week-end").text(day_of_week);

                        var date_start = $('#hotel-box-search-date-start').datepickerlunar('getDate');
                        var diffDays = Math.round(Math.abs((date.getTime() - date_start.getTime()) / (oneDay)));
                        $(".box-number-person-room-night .number-night").text(diffDays);
                    },

                });
            }


        });

    },


    category_popup_map_google: function (arr_coordinates) {

        "use strict";
        $(document).ready(function () {
            $('.btn-category-pupup-map-hotel').click(function () {
                setTimeout(function () {
                    var mapZoom = 13;
                    var LatLng = new google.maps.LatLng(arr_coordinates[0][1], arr_coordinates[0][2]);

                    var mapOptions = { zoom: mapZoom, center: LatLng, streetViewControl: false, scrollwheel: true, navigationControl: true, mapTypeControl: true, scaleControl: true, keyboardShortcuts: true };
                    var map = new google.maps.Map(document.getElementById('category-box-popup-map-hotel'), mapOptions);

                    var infoWindow = new google.maps.InfoWindow;
                    // open info window
                    var onMarkerClick = function () {
                        var marker = this;
                        infoWindow.setContent(marker.details);
                        infoWindow.open(map, marker);
                        //mkmap.lastmarkeropened = marker;
                    };
                    google.maps.event.addListener(map, 'click', function () { infoWindow.close(); }); // close the info window

                    var marker = [];
                    for (var i = 0; i < arr_coordinates.length; i++) {

                        var arr_coord = arr_coordinates[i];

                        var count_star = arr_coord[3];
                        var str_star = '';
                        for (var j = 0; j < count_star; j++) { str_star += '<i class="fa fa-star" aria-hidden="true"></i>'; }
                        var hotel_image = arr_coord[4];
                        var hotel_address = arr_coord[5];
                        var hotel_link = arr_coord[6];
                        var str_details = '<table class="tlb-map-hotel-item">';
                        str_details += '<tr>';
                        str_details += '<td>';
                        str_details += '<img src="' + hotel_image + '" alt="' + arr_coord[0] + '" />';
                        str_details += '</td>';
                        str_details += '<td>';
                        str_details += '<div class="box-title"><a href="' + hotel_link + '">' + arr_coord[0] + '</a><span>' + str_star + '</span></div>';
                        str_details += '<div class="box-address">' + hotel_address + '</div>';
                        str_details += '</td>';
                        str_details += '</tr>';
                        str_details += '</table>';

                        marker[i] = new google.maps.Marker({
                            position: { lat: arr_coord[1], lng: arr_coord[2] },
                            map: map,
                            //icon: image,
                            draggable: false,
                            details: str_details
                        });
                        var myOptions = {
                            content: arr_coord[0],
                            boxStyle: {
                                border: "none", //1px solid black"
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "bold",
                                //width: "150px",
                                color: "#C70E20",
                            },
                            disableAutoPan: false,
                            pixelOffset: new google.maps.Size(5, -10),
                            position: new google.maps.LatLng(arr_coord[1], arr_coord[2]),
                            closeBoxURL: "",
                            isHidden: false,
                            pane: "mapPane",
                            enableEventPropagation: true
                        };
                        var ibLabel = new InfoBox(myOptions);
                        ibLabel.open(map);
                        marker[i].bindTo('map', ibLabel);
                        marker[i].bindTo('position', ibLabel);
                        google.maps.event.addListener(marker[i], 'click', onMarkerClick);
                    }


                }, 500);

            });
        });
    },
    system_hotel_filter_post: function () {
        "use strict";
        $(document).ready(function () {

            var hotel_type = APPS_HOTEL.hotel_get_url_parameter('type');
            var hotel_child = APPS_HOTEL.hotel_get_url_parameter('child');
            var hotel_district = APPS_HOTEL.hotel_get_url_parameter('district');
            var hotel_area = APPS_HOTEL.hotel_get_url_parameter('area');
            var hotel_sort = APPS_HOTEL.hotel_get_url_parameter('sort');

            var str_child_url = '';
            if (hotel_child != null) { str_child_url = '&child=' + hotel_child; }
            else if (hotel_district != null) { str_child_url = '&district=' + hotel_district; }
            else if (hotel_area != null) { str_child_url = '&area=' + hotel_area; }

            //if(hotel_sort!='index' || hotel_sort!=null) { str_child_url+='&sort='+hotel_sort;}

            $(document).on("click", ".category-hotel-box-sort .btn-hotel-filter-sort", function () {
                var filter_sort_type = $(this).attr('data-type');
                if (filter_sort_type != 'index' || hotel_sort != null) {
                    str_child_url += '&sort=' + filter_sort_type;
                    $('.list-rate-star li input').trigger('change');
                }
                else { $('.list-rate-star li input').trigger('change'); }

            });


            $(document).on("change", ".list-rate-star li input,.list-district li input,.list-area li input,.list-type-home li input", function () {

                var val_rate_star = '';
                $('.list-rate-star li input:checked').each(function (index) { val_rate_star += $(this).val() + ','; });
                val_rate_star = val_rate_star.replace(/,$/, '');

                var val_district = '';
                $('.list-district li input:checked').each(function (index) { val_district += $(this).val() + ','; });
                val_district = val_district.replace(/,$/, '');

                var val_area = '';
                $('.list-area li input:checked').each(function (index) { val_area += $(this).val() + ','; });
                val_area = val_area.replace(/,$/, '');

                var val_type_home = '';
                $('.list-type-home li input:checked').each(function (index) { val_type_home += $(this).val() + ','; });
                val_type_home = val_type_home.replace(/,$/, '');

                var url_current = url_link_home + '/khach-san?type=' + hotel_type + str_child_url;
                var str_query_filter = '';
                if (val_rate_star != '') { str_query_filter = '&filter_star=' + val_rate_star; }
                if (val_district != '') { str_query_filter += '&filter_district=' + val_district; }
                if (val_area != '') { str_query_filter += '&filter_area=' + val_area; }
                if (val_type_home != '') { str_query_filter += '&filter_type_home=' + val_type_home; }
                //if(hotel_sort!=null){ str_query_filter +='&sort='+hotel_sort; }

                var url_current_full = url_current + str_query_filter;
                window.location.href = url_current_full;

            }); // END FILTER RATE STAR HOTEL
        });
    },
    hotel_filter_sort_list_hotels: function () {
        "use strict";
        function hotel_return_link_filter_hotel(str_child_url) {
            var val_rate_star = hotel_return_params_filter_hotel('.hotels-list-rate-star li input:checked');
            var val_district = hotel_return_params_filter_hotel('.hotels-list-district li input:checked');
            var val_area = hotel_return_params_filter_hotel('.hotels-list-area li input:checked');
            var val_type_home = hotel_return_params_filter_hotel('.hotels-list-type-home li input:checked');
            var val_services = hotel_return_params_filter_hotel('.hotels-list-services li input:checked');

            var url_current_base = window.location.href.replace(/\.html.*/, ".html");

            var str_ask = (str_child_url != '') ? '?' : '';
            var url_current = url_current_base + str_ask + str_child_url;
            var str_query_filter = '';
            if (val_rate_star != '') { str_query_filter = '&filter_star=' + val_rate_star; }
            if (val_district != '') { str_query_filter += '&filter_district=' + val_district; }
            if (val_area != '') { str_query_filter += '&filter_area=' + val_area; }
            if (val_type_home != '') { str_query_filter += '&filter_type_home=' + val_type_home; }
            if (val_services != '') { str_query_filter += '&filter_services=' + val_services; }
            //if(hotel_sort!=null){ str_query_filter +='&sort='+hotel_sort; }

            var str_ask_filter = (str_child_url != '') ? '' : '?';
            var url_current_full = url_current + str_ask_filter + str_query_filter;

            var str_url_current_full = url_current_full;
            var id_hotel = $(".txt-id-post-hotel-product").val();

            var number_pagination = $(".pagination-customer.type-hotels span.page-numbers.current").text();
            var str_number_pagination = (number_pagination == '1' || number_pagination == '') ? '' : '&paging=' + number_pagination;
            str_url_current_full = str_url_current_full + str_number_pagination;
            str_url_current_full = str_url_current_full.replace(/\.html\?&/, ".html?");

            window.history.pushState({ url_info: str_url_current_full }, '', str_url_current_full);

            $(".category-hotel-box-content").html("<i class='fa fa-spin fa-spinner fa-4x'></i>");
            $.ajax({
                url: adminurl,
                type: 'post',
                dataType: "json",
                data: { action: 'index_hotel_ajax_filter_data_hotel_product', info_url: str_url_current_full, id_hotel: id_hotel },
                success: function (data_json) {
                    $(".category-hotel-box-content.type-hotels").html(data_json.hotel);
                    $(".pagination-customer.type-hotels").html(data_json.pagination);
                },
                error: function (data, response) { }
            });
        }

        function hotel_return_params_filter_hotel(input_filter) {
            var val_data = '';
            $(input_filter).each(function (index) { val_data += $(this).val() + ','; });
            val_data = val_data.replace(/,$/, '');
            return val_data;
        }
        $(document).ready(function () {

            $(document).on("click", ".hotels-category-hotel-box-sort .hotels-btn-hotel-filter-sort", function () {

                $(".hotels-category-hotel-box-sort .hotels-btn-hotel-filter-sort").removeClass("btn-info");
                $(this).removeClass("btn-default");
                $(this).addClass("btn-info");

                var str_child_url = '';
                var filter_sort_type = $(this).attr('data-type');
                if (filter_sort_type != 'index') {
                    str_child_url = 'sort=' + filter_sort_type;
                    hotel_return_link_filter_hotel(str_child_url);
                }
                else { str_child_url = ""; hotel_return_link_filter_hotel(str_child_url); }
            });

            $(document).on("change", ".hotels-list-services li input,.hotels-list-rate-star li input,.hotels-list-district li input,.hotels-list-area li input,.hotels-list-type-home li input", function () {
                var val_date_type = $(".hotels-category-hotel-box-sort .hotels-btn-hotel-filter-sort.btn-info").attr("data-type");
                var str_child_url = (val_date_type != 'index') ? 'sort=' + val_date_type : "";
                hotel_return_link_filter_hotel(str_child_url);
            }); // END FILTER RATE STAR HOTEL

        });
    },

    // SLIDER HOTEL
    hotel_get_list_image_slider: function (id_hotel, alt_title) {
        "use strict";
        $(document).ready(function () {
            $.ajax({
                url: 'https://cdn1.vietnambooking.com/wp-admin/admin-ajax.php',
                type: 'post',
                data: { action: 'ajax_index_get_list_hotel_images_slider', id_hotel: id_hotel, alt_title: alt_title },
                cache: false,
                success: function (data) {
                    $(".hotel-box-list-image-slider").html(data);
                    if (data != '') { APPS_HOTEL.hotel_slider(); }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //alert(xhr.status);
                    //alert(thrownError);
                }
            });
        });
    },
    hotel_slider: function () {
        $(document).ready(function () {
            var _SlideshowTransitions =
                [{
                    $Duration: 1200, x: 0.3,
                    $During: { $Left: [0.3, 0.7] },
                    $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2
                }];
            var options =
            {
                $AutoPlay: !1,
                $AutoPlayInterval: 1500,
                $PauseOnHover: 1,
                $DragOrientation: 3,
                $ArrowKeyNavigation: !0,
                $SlideDuration: 0,
                $SlideshowOptions:
                {
                    $Class: $JssorSlideshowRunner$,
                    $Transitions: _SlideshowTransitions,
                    $TransitionsOrder: 1,
                    $ShowLink: !0
                },
                $ArrowNavigatorOptions: { $Class: $JssorArrowNavigator$, $ChanceToShow: 1 },
                $ThumbnailNavigatorOptions:
                {
                    $Class: $JssorThumbnailNavigator$,
                    $ChanceToShow: 2,
                    $ActionMode: 1,
                    $SpacingX: 5,
                    $DisplayPieces: 9,
                    $ParkingPosition: 425
                }
            };
            if ($("#slider_hotel").length > 0) {
                var hoteldetailslider = new $JssorSlider$("slider_hotel", options);
                function ScaleSlider() {
                    var parentWidth = hoteldetailslider.$Elmt.parentNode.clientWidth;
                    if (parentWidth) {
                        hoteldetailslider.$ScaleWidth(Math.max(Math.min(parentWidth, 850), 850));

                    }
                    else window.setTimeout(ScaleSlider, 30);

                }
                ScaleSlider();
                $(window).bind("load", ScaleSlider);
                $(window).bind("resize", ScaleSlider);
                $(window).bind("orientationchange", ScaleSlider);
            }
        });
    },

    // SINGLE COOKIE VIEWED RECENT TOUR
    hotel_ajax_load_viewed_recent: function () {
        "use strict";
        $(document).ready(function () {
            $.ajax({
                url: adminurl,
                type: 'post',
                data: { action: 'index_ajax_load_post_hotel_viewed_recent' },
                success: function (data) {
                    $('.box-post-hotel-viewd-recent').html(data);
                },
                error: function (data, response) {
                }
            });
        });
    },
    hotel_post_viewed_recent: function (postID) {
        "use strict";
        $(document).ready(function () {
            $.ajax({
                url: adminurl,
                type: 'post',
                data: { action: 'index_ajax_cookie_post_hotel_viewed_recent', postID: postID },
                success: function (data) {
                },
                error: function (data, response) {
                }
            });
        });
    },

    //  FORM HOTEL
    submit_search_form_hotel: function () {
        "use strict";
        $(document).ready(function () {

            $(".box-search-hotel .ul-list-hotel li").click(function () {
                var hotel_type = $(this).attr('data-hotel-type');
                $.cookie("tab_cookie_hotel_type", hotel_type);
            });
            var cookie_hotel_type = $.cookie("tab_cookie_hotel_type");
            if (cookie_hotel_type != null) {
                if (cookie_hotel_type == 'domestic') {
                    $(".box-search-hotel .ul-list-hotel li:eq(0)").addClass('active');
                    $(".box-search-hotel .ul-list-hotel li:eq(1)").removeClass('active');

                    $(".box-search-hotel #hotel-domestic").addClass("active");
                    $(".box-search-hotel #hotel-internation").removeClass("active");
                }
                else {
                    $(".box-search-hotel .ul-list-hotel li:eq(1)").addClass('active');
                    $(".box-search-hotel .ul-list-hotel li:eq(0)").removeClass('active');

                    $(".box-search-hotel #hotel-domestic").removeClass("active");
                    $(".box-search-hotel #hotel-internation").addClass("active");
                }

            }
            $(".btn-search-hotel.hotel-domestic").click(function () {

                $(".hotel-search-text-notify-error.hotel-domestic").html('');
                $(this).find('i').removeClass('glyphicon-search').removeClass('glyphicon').addClass('fa').addClass('fa-spinner').addClass('fa-spin');
                var hotel_date_start = $.trim($(".txt-hotel-date-start.hotel-domestic").val());
                var hotel_date_end = $.trim($(".txt-hotel-date-end.hotel-domestic").val());
                var hotel_full_url_link = $.trim($(".txt-full-url-link.hotel-domestic").val());

                if (hotel_date_start != '' && hotel_date_end != '' && hotel_full_url_link != '' && hotel_date_start != hotel_date_end) {
                    $.cookie("hotel_date_start", hotel_date_start);
                    $.cookie("hotel_date_end", hotel_date_end);
                    var hotel_full_url_link_format = hotel_full_url_link;
                    window.location.href = hotel_full_url_link_format;
                }
                else {
                    $(this).find('i').addClass('glyphicon-search').addClass('glyphicon').removeClass('fa').removeClass('fa-spinner').removeClass('fa-spin');
                    if (hotel_full_url_link == '') { $(".hotel-search-text-notify-error.hotel-domestic").html('<code>Xin vui lÃ²ng nháº­p Ä‘iá»ƒm Ä‘áº¿n, khÃ¡ch sáº¡n trÆ°á»›c.</code>'); }
                    else if (hotel_date_start == hotel_date_end) { $(".hotel-search-text-notify-error.hotel-domestic").html('<code>Lá»—i: NgÃ y tráº£ phÃ²ng Ã­t nháº¥t 1 ngÃ y.</code>'); }
                    else if (hotel_date_start == '') { $(".hotel-search-text-notify-error.hotel-domestic").html('<code>NgÃ y nháº­n phÃ²ng lá»—i.</code>'); }
                    else if (hotel_date_end == '') { $(".hotel-search-text-notify-error.hotel-domestic").html('<code>NgÃ y tráº£ phÃ²ng lá»—i.</code>'); }
                }
            }); // END SUBMIT SEARCH FORM HOTEL DOMESTIC

            $(".btn-search-hotel.hotel-internation").click(function () {

                $(".hotel-search-text-notify-error.hotel-internation").html('');
                $(this).find('i').removeClass('glyphicon-search').removeClass('glyphicon').addClass('fa').addClass('fa-spinner').addClass('fa-spin');
                var hotel_date_start = $.trim($(".txt-hotel-date-start.hotel-internation").val());
                var hotel_date_end = $.trim($(".txt-hotel-date-end.hotel-internation").val());
                var hotel_full_url_link = $.trim($(".txt-full-url-link.hotel-internation").val());

                if (hotel_date_start != '' && hotel_date_end != '' && hotel_full_url_link != '' && hotel_date_start != hotel_date_end) {
                    $.cookie("hotel_date_start", hotel_date_start);
                    $.cookie("hotel_date_end", hotel_date_end);
                    var hotel_full_url_link_format = hotel_full_url_link;
                    window.location.href = hotel_full_url_link_format;
                }
                else {
                    $(this).find('i').addClass('glyphicon-search').addClass('glyphicon').removeClass('fa').removeClass('fa-spinner').removeClass('fa-spin');
                    if (hotel_full_url_link == '') { $(".hotel-search-text-notify-error.hotel-internation").html('<code>Xin vui lÃ²ng nháº­p Ä‘iá»ƒm Ä‘áº¿n, khÃ¡ch sáº¡n trÆ°á»›c.</code>'); }
                    else if (hotel_date_start == hotel_date_end) { $(".hotel-search-text-notify-error.hotel-internation").html('<code>Lá»—i: NgÃ y tráº£ phÃ²ng Ã­t nháº¥t 1 ngÃ y.</code>'); }
                    else if (hotel_date_start == '') { $(".hotel-search-text-notify-error.hotel-internation").html('<code>NgÃ y nháº­n phÃ²ng lá»—i.</code>'); }
                    else if (hotel_date_end == '') { $(".hotel-search-text-notify-error.hotel-internation").html('<code>NgÃ y tráº£ phÃ²ng lá»—i.</code>'); }
                }
            }); // END SUBMIT SEARCH FORM HOTEL DOMESTIC
        });
    },
    load_data_when_action_tab_hotel: function () {
        "use strict";
        $(document).ready(function () {
            var chk_load_data_hotel = $("ul.nav.nav-tabs li.active a[aria-controls='form-hotel']").text();
            chk_load_data_hotel += $(".form-box-controller-tabs ul li.active a[aria-controls='form-box-default-hotel']").text();
            $.cookie("load_data_hotel", chk_load_data_hotel, { path: '/' });
            if ($.cookie("load_data_hotel") != '') {
                APPS_HOTEL.autocomplete_search_form_hotel_domestic();
                APPS_HOTEL.autocomplete_search_form_hotel_internation();
            }
            $("ul.nav.nav-tabs li,.form-box-controller-tabs ul li").click(function () {
                if ($.cookie("load_data_hotel") == '') {
                    setTimeout(function () {
                        chk_load_data_hotel = $("ul.nav.nav-tabs li.active a[aria-controls='form-hotel']").text();
                        chk_load_data_hotel += $(".form-box-controller-tabs ul li.active a[aria-controls='form-box-default-hotel']").text();
                        $.cookie("load_data_hotel", chk_load_data_hotel, { path: '/' });
                        if ($.cookie("load_data_hotel") != '') {
                            APPS_HOTEL.autocomplete_search_form_hotel_domestic();
                            APPS_HOTEL.autocomplete_search_form_hotel_internation();
                        }
                    }, 300);
                }
            });
        });
    },
    autocomplete_search_form_hotel_domestic: function () {
        $(document).ready(function () {

            var locations = [];
            var popularLocations = [];
            var hotels = [];
            var districts = [];
            var areas = [];

            $.getJSON(url_link_bloginfo + "/libs/data_json/hotel/list_hotel_district_domestic.json",
                function (data) { districts = data; });

            //            $.getJSON(url_link_bloginfo+"/libs/data_json/hotel/list_hotel_area_domestic.json",
            //                function(data) { areas = data; });

            $.getJSON(url_link_bloginfo + "/libs/data_json/hotel/list_hotel_province_country_domestic.json",
                function (data) { locations = data; });

            $.getJSON(url_link_bloginfo + "/libs/data_json/hotel/list_hotel_domestic.json",
                function (data) { hotels = data; });

            $.getJSON(url_link_bloginfo + "/libs/data_json/hotel/list_hotel_hot_domestic.json",
                function (data) { popularLocations = data; });


            var mainQuery = "";
            var handleBarsPopularLocationItemTemplate = Handlebars.compile($("#handleBarsPopularLocationItem").html());
            $('.search-hotel-text.hotel-domestic').typeahead(
                { hint: true, highlight: true, minLength: 0, },
                {
                    displayKey: 'name',
                    name: 'locations',
                    limit: 5,
                    source: function (query, process) {
                        mainQuery = query;
                        var locations_data = loadedSourceHandler(query, process, locations);
                        process(locations_data);
                    },
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><span class="glyphicon glyphicon-map-marker"></span> Äá»ŠA ÄIá»‚M</h5>',
                        suggestion: function (data) {
                            var hotelCountStr = "";
                            hotelCountStr = '<span class="pull-right badge ">' + data.count + '</span>';
                            var template = '<div>' + data.name + hotelCountStr + '</div>';
                            return template;
                        }
                    }
                },

                {
                    displayKey: 'name',
                    name: 'districts',
                    source: function (query, process) {
                        mainQuery = query;
                        var locations_data = loadedSourceHandler(query, process, districts);
                        process(locations_data);
                    },
                    limit: 5,
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><span class="glyphicon glyphicon-map-marker"></span> Quáº­n/huyá»‡n</h5>',
                        suggestion: function (data) {
                            var hotelCountStr = "";
                            hotelCountStr = '<span class="pull-right vcolor-gray-dark "> <b>' + data.province_country + '</b></span>';
                            var template = '<div>' + data.name + hotelCountStr + '</div>';
                            return template;
                        }
                    }
                },
                {
                    displayKey: 'name',
                    name: 'areas',
                    source: function (query, process) {
                        mainQuery = query;
                        var locations_data = loadedSourceHandler(query, process, areas);
                        process(locations_data);
                    },
                    limit: 5,
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><span class="glyphicon glyphicon-map-marker"></span> Khu vá»±c</h5>',
                        suggestion: function (data) {
                            var hotelCountStr = "";
                            hotelCountStr = '<span class="pull-right vcolor-gray-dark "> <b>' + data.district + '</b></span>';
                            var template = '<div>' + data.name + hotelCountStr + '</div>';
                            return template;
                        }
                    }
                },
                {
                    displayKey: 'name',
                    name: 'hotels',
                    source: function (query, process) {
                        mainQuery = query;
                        var locations_data = loadedSourceHandler(query, process, hotels);
                        process(locations_data);
                    },
                    limit: 10,
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><i class="fa fa-bed" aria-hidden="true"></i> KhÃ¡ch sáº¡n</h5>',
                        suggestion: function (data) {
                            var hotelCountStr = "";
                            var str_province_country = data.province_country.replace("KhÃ¡ch sáº¡n", "");
                            hotelCountStr = '<span class="pull-right vcolor-gray-dark "> <b>' + str_province_country + '</b></span>';
                            var template = '<div>' + data.name + hotelCountStr + '</div>';
                            return template;
                        }
                    }
                },
                {
                    displayKey: 'name',
                    name: 'popularLocation',
                    source: function (query, process) {
                        if (jsHelper.isBlank(query)) {
                            mainQuery = query;
                            process(popularLocations);
                        }
                    },
                    limit: 30,
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><span class="glyphicon glyphicon-map-marker"></span> Äá»ŠA ÄIá»‚M HOT</h5>',
                        suggestion: function (data) {

                            var str_count = "";
                            if (data.count > 0) {
                                str_count = "<b>" + data.count + "</b> " + (data.count > 1 ? "hotels" : "hotel");
                            }

                            //var img_url1 = url_link_home+data.image;
                            var img_url1 = data.image;
                            var img_url2 = img_url1;
                            if (!jsHelper.isBlank(img_url1)) {
                                img_url2 = img_url1.replace("120x120", "180x180");
                            }
                            var context = { name: data.name, description: str_count, image_url: img_url1, image_url1: img_url2 };
                            var template = '<ul class="list-hotel-top">' + handleBarsPopularLocationItemTemplate(context) + '</ul>';
                            //var template = '<div>' + data.Name + hotelStr + '</div>';

                            return template;

                        },
                        footer: function (data) {
                            return "<div class='row'></div>";
                        },
                    }

                }
            ).on({
                'typeahead:selected': function (e, data) {
                    //window.location.href = data.url;
                    $(".txt-full-url-link.hotel-domestic").val(data.url);
                },
                'typeahead:autocompleted': function (e, data) {

                },
                'typeahead:render': function (e, data) {
                    //$(".tt-suggestion").mark(mainQuery);
                },
                'keyup': function (e) {
                },
            });

            String.prototype.replaceAll = function (search, replacement) {
                var target = this;
                return target.replace(new RegExp(search, 'g'), replacement);
            };

            function prepareQuery(query) {
                query = jsHelper.remove_unicode($.trim(query.toLowerCase()));
                query = query.replaceAll('-', ' ');
                var regExp = new RegExp("^(.*[^\s/][2-9]*[^\s/](ngay)[^\s/][1-9]*[^\s/](dem))*$", "gm");
                var regExp2 = new RegExp("^(.*[2-9]*(ngay)[1-9]*(dem))*$", "gm");
                var regExp3 = new RegExp("^(.*[2-9]*[^\s/](ngay|dem).*)*$", "gm");
                result = regExp.test(query) || regExp2.test(query) || regExp3.test(query);

                if (result) {
                    var getParamsRegExp = /(?:^|\s)([2-9 ]+ngay[1-9 ]+dem)(?:\s|$)/g;
                    var getParamsRegExp2 = /(?:^|\s)([2-9 ]+ngay)(?:\s|$)/g;
                    var getParamsRegExp3 = /(?:^|\s)([2-9 ]+dem)(?:\s|$)/g;

                    var match = getParamsRegExp.exec(query);
                    var stripped = "";
                    if (match !== undefined && match !== null && match.length >= 1) {
                        stripped = jsHelper.stripSpaces(match[1]);
                        query = query.replace(match[1], stripped);
                    } else {
                        var match2 = getParamsRegExp2.exec(query);
                        var match3 = getParamsRegExp3.exec(query);

                        if (match2 !== undefined && match2 !== null && match2.length >= 1) {
                            stripped = jsHelper.stripSpaces(match2[1]);
                            if (!jsHelper.isBlank(stripped)) {
                                query = query.replace(match2[1], stripped);
                            }
                        }

                        if (match3 !== undefined && match3 !== null && match3.length >= 1) {
                            stripped = jsHelper.stripSpaces(match3[1]);
                            if (!jsHelper.isBlank(stripped)) {
                                query = query.replace(match3[1], stripped);
                            }
                        }
                    }

                    query = query.replace("ngay", "N").replace("dem", "D");
                }

                return query;
            }
            function fullTextCompare(queryStr, textToCompare) {
                textToCompare = jsHelper.remove_unicode($.trim(textToCompare.toLowerCase()));
                textToCompare = textToCompare.replaceAll('-', ' ');

                queryStr = jsHelper.remove_unicode($.trim(queryStr.toLowerCase()));
                queryStr = queryStr.replaceAll('-', ' ');
                queryStr = queryStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                arrWords = queryStr.split(" ");
                //Encapsulate your words inside regex groups
                arrWords = $.map(arrWords, function (n) {
                    return ["(?=.*" + n + ")"];
                });
                //Create a regex pattern
                sRegex = new RegExp("^" + arrWords.join("") + ".*$", "im");
                //Execute the regex match

                return (textToCompare.match(sRegex) === null ? false : true);
            }
            function matcher(query, data, syncResults) {
                if (!jsHelper.isBlank(query)) {
                    var matches = [];
                    $.each(data, function (i, object) {

                        var str_query = '';
                        str_query = object.name + ' ' + object.name_en;
                        if (fullTextCompare(query, str_query)) {
                            matches.push(object);
                        }
                    });

                    syncResults(matches);

                }
            }
            function loadedSourceHandler(query, syncResults, type) {
                if (!jsHelper.isBlank(query)) {
                    query = prepareQuery(query);
                    return matcher(query, type, syncResults);

                }
            }

            doSearch = function () {
                var query = mainQuery;
                if (query != null && $.trim(query) != '') {
                    //query = query.replace(/[<>*%&:\\\?]/g, '');
                    //window.location.href = url_link_home+'/tim-hotel?t=' + encodeURIComponent(query);
                }
                else {
                    //window.location.href = url_link_home+'/tat-ca-diem-den';
                }
            }
            $('.btn-search-hotel').click(function () {
                //doSearch();
            });


        });
    }, // END HOTEL SEARCH COMPLETE DOMESTIC
    autocomplete_search_form_hotel_internation: function () {
        $(document).ready(function () {

            var popularLocations = [];
            var hotels = [];
            var country = [];
            var areas = [];

            $.getJSON(url_link_bloginfo + "/libs/data_json/hotel/list_hotel_province_country_internation.json",
                function (data) { country = data; });

            $.getJSON(url_link_bloginfo + "/libs/data_json/hotel/list_hotel_area_internation.json",
                function (data) { areas = data; });

            $.getJSON(url_link_bloginfo + "/libs/data_json/hotel/list_hotel_internation.json",
                function (data) { hotels = data; });

            $.getJSON(url_link_bloginfo + "/libs/data_json/hotel/list_hotel_hot_internation.json",
                function (data) { popularLocations = data; });


            var mainQuery = "";
            var handleBarsPopularLocationItemTemplate = Handlebars.compile($("#handleBarsPopularLocationItem").html());
            $('.search-hotel-text.hotel-internation').typeahead(
                { hint: true, highlight: true, minLength: 0, },
                {
                    displayKey: 'name',
                    name: 'districts',
                    source: function (query, process) {
                        mainQuery = query;
                        var locations_data = loadedSourceHandler(query, process, country);
                        process(locations_data);
                    },
                    limit: 5,
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><span class="glyphicon glyphicon-map-marker"></span> Äá»‹a Ä‘iá»ƒm</h5>',
                        suggestion: function (data) {
                            var hotelCountStr = "";
                            hotelCountStr = '<span class="pull-right badge ">' + data.count + '</span>';
                            var template = '<div>' + data.name + hotelCountStr + '</div>';
                            return template;

                        }
                    }
                },
                {
                    displayKey: 'name',
                    name: 'areas',
                    source: function (query, process) {
                        mainQuery = query;
                        var locations_data = loadedSourceHandler(query, process, areas);
                        process(locations_data);
                    },
                    limit: 5,
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><span class="glyphicon glyphicon-map-marker"></span> Khu vá»±c</h5>',
                        suggestion: function (data) {
                            var hotelCountStr = "";
                            hotelCountStr = '<span class="pull-right vcolor-gray-dark "> <b>' + data.district + '</b></span>';
                            var template = '<div>' + data.name + hotelCountStr + '</div>';
                            return template;
                        }
                    }
                },
                {
                    displayKey: 'name',
                    name: 'hotels',
                    source: function (query, process) {
                        mainQuery = query;
                        var locations_data = loadedSourceHandler(query, process, hotels);
                        process(locations_data);
                    },
                    limit: 10,
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><i class="fa fa-bed" aria-hidden="true"></i> KhÃ¡ch sáº¡n</h5>',
                        suggestion: function (data) {
                            var hotelCountStr = "";
                            var str_province_country = data.province_country.replace("KhÃ¡ch sáº¡n", "");
                            hotelCountStr = '<span class="pull-right vcolor-gray-dark "> <b>' + str_province_country + '</b></span>';
                            var template = '<div>' + data.name + hotelCountStr + '</div>';
                            return template;
                        }
                    }
                },
                {
                    displayKey: 'name',
                    name: 'popularLocation',
                    source: function (query, process) {
                        if (jsHelper.isBlank(query)) {
                            mainQuery = query;
                            process(popularLocations);
                        }
                    },
                    limit: 30,
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><span class="glyphicon glyphicon-map-marker"></span> Äá»ŠA ÄIá»‚M HOT</h5>',
                        suggestion: function (data) {

                            var str_count = "";
                            if (data.count > 0) {
                                //str_count = "<b>" + data.count + "</b> " + (data.count > 1 ? "hotels" : "hotel");
                            }

                            var img_url1 = url_link_home + data.image;
                            var img_url2 = img_url1;
                            if (!jsHelper.isBlank(img_url1)) {
                                img_url2 = img_url1.replace("120x120", "180x180");
                            }
                            var context = { name: data.name, description: str_count, image_url: img_url1, image_url1: img_url2 };
                            var template = '<ul class="list-hotel-top">' + handleBarsPopularLocationItemTemplate(context) + '</ul>';
                            //var template = '<div>' + data.Name + hotelStr + '</div>';

                            return template;

                        },
                        footer: function (data) {
                            return "<div class='row'></div>";
                        },
                    }

                }
            ).on({
                'typeahead:selected': function (e, data) {
                    //window.location.href = data.url;
                    $(".txt-full-url-link.hotel-internation").val(data.url);
                },
                'typeahead:autocompleted': function (e, data) {

                },
                'typeahead:render': function (e, data) {
                    //$(".tt-suggestion").mark(mainQuery);
                },
                'keyup': function (e) {
                },
            });

            String.prototype.replaceAll = function (search, replacement) {
                var target = this;
                return target.replace(new RegExp(search, 'g'), replacement);
            };

            function prepareQuery(query) {
                query = jsHelper.remove_unicode($.trim(query.toLowerCase()));
                query = query.replaceAll('-', ' ');
                var regExp = new RegExp("^(.*[^\s/][2-9]*[^\s/](ngay)[^\s/][1-9]*[^\s/](dem))*$", "gm");
                var regExp2 = new RegExp("^(.*[2-9]*(ngay)[1-9]*(dem))*$", "gm");
                var regExp3 = new RegExp("^(.*[2-9]*[^\s/](ngay|dem).*)*$", "gm");
                result = regExp.test(query) || regExp2.test(query) || regExp3.test(query);

                if (result) {
                    var getParamsRegExp = /(?:^|\s)([2-9 ]+ngay[1-9 ]+dem)(?:\s|$)/g;
                    var getParamsRegExp2 = /(?:^|\s)([2-9 ]+ngay)(?:\s|$)/g;
                    var getParamsRegExp3 = /(?:^|\s)([2-9 ]+dem)(?:\s|$)/g;

                    var match = getParamsRegExp.exec(query);
                    var stripped = "";
                    if (match !== undefined && match !== null && match.length >= 1) {
                        stripped = jsHelper.stripSpaces(match[1]);
                        query = query.replace(match[1], stripped);
                    } else {
                        var match2 = getParamsRegExp2.exec(query);
                        var match3 = getParamsRegExp3.exec(query);

                        if (match2 !== undefined && match2 !== null && match2.length >= 1) {
                            stripped = jsHelper.stripSpaces(match2[1]);
                            if (!jsHelper.isBlank(stripped)) {
                                query = query.replace(match2[1], stripped);
                            }
                        }

                        if (match3 !== undefined && match3 !== null && match3.length >= 1) {
                            stripped = jsHelper.stripSpaces(match3[1]);
                            if (!jsHelper.isBlank(stripped)) {
                                query = query.replace(match3[1], stripped);
                            }
                        }
                    }

                    query = query.replace("ngay", "N").replace("dem", "D");
                }

                return query;
            }
            function fullTextCompare(queryStr, textToCompare) {
                textToCompare = jsHelper.remove_unicode($.trim(textToCompare.toLowerCase()));
                textToCompare = textToCompare.replaceAll('-', ' ');

                queryStr = jsHelper.remove_unicode($.trim(queryStr.toLowerCase()));
                queryStr = queryStr.replaceAll('-', ' ');
                queryStr = queryStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                arrWords = queryStr.split(" ");
                //Encapsulate your words inside regex groups
                arrWords = $.map(arrWords, function (n) {
                    return ["(?=.*" + n + ")"];
                });
                //Create a regex pattern
                sRegex = new RegExp("^" + arrWords.join("") + ".*$", "im");
                //Execute the regex match

                return (textToCompare.match(sRegex) === null ? false : true);
            }
            function matcher(query, data, syncResults) {
                if (!jsHelper.isBlank(query)) {
                    var matches = [];
                    $.each(data, function (i, object) {
                        if (fullTextCompare(query, object.name)) {
                            matches.push(object);
                        }
                    });

                    syncResults(matches);

                }
            }
            function loadedSourceHandler(query, syncResults, type) {
                if (!jsHelper.isBlank(query)) {
                    query = prepareQuery(query);
                    return matcher(query, type, syncResults);

                }
            }

            doSearch = function () {
                var query = mainQuery;
                if (query != null && $.trim(query) != '') {
                    //query = query.replace(/[<>*%&:\\\?]/g, '');
                    //window.location.href = url_link_home+'/tim-hotel?t=' + encodeURIComponent(query);
                }
                else {
                    //window.location.href = url_link_home+'/tat-ca-diem-den';
                }
            }
            $('.btn-search-hotel').click(function () {
                //doSearch();
            });


        });
    }, // END HOTEL SEARCH COMPLETE DOMESTIC

    autocomplete_date_start_and_end_domestic: function () {
        "use strict";

        if (typeof $().datepickerlunar != 'function') { return false; }
        $(document).ready(function () {

            // VIETNAMESE
            var hotel_date_start = $.cookie("hotel_date_start");
            var hotel_date_end = $.cookie("hotel_date_end");
            if (hotel_date_start != null && hotel_date_end != null) {
                $(".txt-hotel-date-start.hotel-domestic").val(hotel_date_start);
                $(".txt-hotel-date-end.hotel-domestic").val(hotel_date_end);
            }
            else {
                var hotel_current_date = new Date();
                var hotel_current_day = hotel_current_date.getDate();
                var hotel_current_month = hotel_current_date.getMonth();
                var month = new Array(); month[0] = "01"; month[1] = "02"; month[2] = "03"; month[3] = "04"; month[4] = "05"; month[5] = "06"; month[6] = "07"; month[7] = "08"; month[8] = "09"; month[9] = "10"; month[10] = "11"; month[11] = "12";
                var hotel_current_month_format = month[hotel_current_month];
                var hotel_current_fullyear = hotel_current_date.getFullYear();
                $(".txt-hotel-date-start.hotel-domestic").val(hotel_current_day + "/" + hotel_current_month_format + "/" + hotel_current_fullyear);

                var hotel_current_next_date = new Date();
                hotel_current_next_date.setDate(hotel_current_next_date.getDate() + 1);
                var hotel_current_next_day = hotel_current_next_date.getDate();
                var hotel_current_next_month = hotel_current_next_date.getMonth();
                var hotel_current_next_month_format = month[hotel_current_next_month];
                var hotel_current_next_fullyear = hotel_current_next_date.getFullYear();
                $(".txt-hotel-date-end.hotel-domestic").val(hotel_current_next_day + "/" + hotel_current_next_month_format + "/" + hotel_current_next_fullyear);
            }



            $(".txt-hotel-date-start.hotel-domestic").datepickerlunar({
                dateFormat: "dd/mm/yy",
                minDate: 0,
                changeMonth: false,
                numberOfMonths: 1,
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass('ui-helper-hidden-accessible');
                    //if($(input).prop('disabled')){return false;}
                    $('#ui-datepicker-div').addClass("flight-box-date");

                },
                onSelect: function (datetext, inst) {
                    //console.log(inst);
                    //$( ".txt-hotel-date-end.hotel-domestic" ).trigger("click");

                },
                onClose: function (datetext, inst) {
                    //$(this).trigger('change');
                    //alert(inst.dpDiv);
                    if (datetext != '') {
                        var date = $(this).datepickerlunar('getDate');
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getFullYear();
                        var max_date = new Date(year, month, day);
                        $(".txt-hotel-date-end.hotel-domestic").datepickerlunar("option", "minDate", date);
                        $(".txt-hotel-date-end.hotel-domestic").datepickerlunar("option", "maxDate", max_date);

                        setTimeout(function () {
                            $(".txt-hotel-date-end.hotel-domestic").datepickerlunar("show");
                        }, 500);

                    }
                },

            });

            $(".txt-hotel-date-end.hotel-domestic").datepickerlunar({
                dateFormat: "dd/mm/yy",
                numberOfMonths: 1,
                minDate: 0,
                changeMonth: false,
                maxDate: '+1M',
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass('ui-helper-hidden-accessible');
                    //if($(input).prop('disabled')){return false;}
                    $('#ui-datepicker-div').addClass("flight-box-date");

                },
                onSelect: function (datetext, inst) {
                    //console.log(inst);
                },
                onClose: function (datetext, inst) {

                }
            });
        });
    },
    autocomplete_date_start_and_end_internation: function () {
        "use strict";
        $(document).ready(function () {

            // VIETNAMESE
            var hotel_date_start = $.cookie("hotel_date_start");
            var hotel_date_end = $.cookie("hotel_date_end");
            if (hotel_date_start != null && hotel_date_end != null) {
                $(".txt-hotel-date-start.hotel-internation").val(hotel_date_start);
                $(".txt-hotel-date-end.hotel-internation").val(hotel_date_end);
            }
            else {
                var hotel_current_date = new Date();
                var hotel_current_day = hotel_current_date.getDate();
                var hotel_current_month = hotel_current_date.getMonth();
                var month = new Array(); month[0] = "01"; month[1] = "02"; month[2] = "03"; month[3] = "04"; month[4] = "05"; month[5] = "06"; month[6] = "07"; month[7] = "08"; month[8] = "09"; month[9] = "10"; month[10] = "11"; month[11] = "12";
                var hotel_current_month_format = month[hotel_current_month];
                var hotel_current_fullyear = hotel_current_date.getFullYear();
                $(".txt-hotel-date-start.hotel-internation").val(hotel_current_day + "/" + hotel_current_month_format + "/" + hotel_current_fullyear);

                var hotel_current_next_date = new Date();
                hotel_current_next_date.setDate(hotel_current_next_date.getDate() + 1);
                var hotel_current_next_day = hotel_current_next_date.getDate();
                var hotel_current_next_month = hotel_current_next_date.getMonth();
                var hotel_current_next_month_format = month[hotel_current_next_month];
                var hotel_current_next_fullyear = hotel_current_next_date.getFullYear();
                $(".txt-hotel-date-end.hotel-internation").val(hotel_current_next_day + "/" + hotel_current_next_month_format + "/" + hotel_current_next_fullyear);
            }



            $(".txt-hotel-date-start.hotel-internation").datepickerlunar({
                dateFormat: "dd/mm/yy",
                minDate: 0,
                changeMonth: false,
                numberOfMonths: 1,
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass('ui-helper-hidden-accessible');
                    //if($(input).prop('disabled')){return false;}
                    $('#ui-datepicker-div').addClass("flight-box-date");

                },
                onSelect: function (datetext, inst) {
                    //console.log(inst);
                },
                onClose: function (datetext, inst) {
                    //$(this).trigger('change');
                    //alert(inst.dpDiv);
                    if (datetext != '') {
                        var date = $(this).datepickerlunar('getDate');
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getFullYear();
                        var max_date = new Date(year, month, day);
                        $(".txt-hotel-date-end.hotel-internation").datepickerlunar("option", "minDate", date);
                        $(".txt-hotel-date-end.hotel-internation").datepickerlunar("option", "maxDate", max_date);
                    }


                },

            });

            $(".txt-hotel-date-end.hotel-internation").datepickerlunar({
                dateFormat: "dd/mm/yy",
                numberOfMonths: 1,
                minDate: 0,
                changeMonth: false,
                maxDate: '+1M',
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass('ui-helper-hidden-accessible');
                    //if($(input).prop('disabled')){return false;}
                    $('#ui-datepicker-div').addClass("flight-box-date");
                },
                onSelect: function (datetext, inst) {
                    //console.log(inst);
                },
                onClose: function (datetext, inst) {

                }
            });
        });
    },

    // DEFAULT
    hotel_readmore: function (tag_class, box_summary) {
        "use strict";
        $(document).ready(function () {
            $(tag_class).click(function (e) {
                e.preventDefault();
                if ($(box_summary).hasClass('less')) {
                    $(box_summary).removeClass('less');
                    $(this).html('Thu gá»n <i class="fa fa-chevron-up" aria-hidden="true"></i>');
                }
                else {
                    $(box_summary).addClass('less');
                    $(this).html('Má»Ÿ rá»™ng <i class="fa fa-chevron-down" aria-hidden="true"></i>');
                }
                return false;
            });
        });
    },
    hotel_load_map_google: function (str_id, content1, lat1, lng1, image1) {
        "use strict";
        var map = new google.maps.Map(document.getElementById(str_id), {
            zoom: 15,
            center: { lat: lat1, lng: lng1 }
        });

        var image = { url: image1, size: new google.maps.Size(32, 32), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(0, 32) };
        if (image1 != '') {
            var marker = new google.maps.Marker({
                map: map,
                title: content1,
                draggable: true,
                animation: google.maps.Animation.DROP,
                icon: image,
                position: { lat: lat1, lng: lng1 },

            });
        }
        else {
            var marker = new google.maps.Marker({
                map: map,
                title: content1,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: { lat: lat1, lng: lng1 },

            });
        }
        var infowindow = new google.maps.InfoWindow({
            content: '<b>' + content1 + '</b>',

        });
        infowindow.open(map, marker);
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    },
    hotel_get_url_parameter: function (sParam) {
        "use strict";
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
};
APPS_HOTEL.init();