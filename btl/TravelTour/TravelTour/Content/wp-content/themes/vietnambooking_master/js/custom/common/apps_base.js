/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var APPS_BASE = {
    init: function () {

        this.base_input_maxlenght();
        this.base_system_tooltip();
        this.base_create_notify_browser();
        this.base_system_on_notification_all();
        this.base_counterup();

        this.base_donetying();
    },

    base_system_ajax_load_data: function (obj_query_data) {

        var str_action = obj_query_data.action;
        var str_tag_container = obj_query_data.tag_container;
        var str_arr_post = obj_query_data.arr_post;

        $(str_tag_container).html("<i class='fa fa-spin fa-spinner fa-2x'></i>");
        $(document).ready(function () {
            $.ajax({
                url: adminurl,
                type: 'post',
                dataType: 'json',
                data: { action: str_action, query_post: str_arr_post },
                success: function (data) {
                    $(str_tag_container).html(data.content);
                },
                error: function (data, response) {
                }
            });
        });

    },

    base_system_data_month: function (obj_query_data) {

        $(document).ready(function () {

            // load first time
            var info_query_flight = obj_query_data.info_query_flight;
            var str_month = info_query_flight.Month + '/' + info_query_flight.Year;
            $(".box-data-month-price .box-data-month-price-inner").html("<i class='fa fa-spin fa-spinner fa-2x'></i>").addClass("loadding");
            var obj_query = { code_from: info_query_flight.StartPoint, code_to: info_query_flight.EndPoint, str_month: str_month, str_airlines: info_query_flight.Airline, size_type: info_query_flight.size_type };
            $.ajax({
                url: adminurl,
                type: 'post',
                data: { action: 'index_flight_month_ajax_change_data_month', data_query: obj_query },
                success: function (data) {
                    $(".box-data-month-price .box-data-month-price-inner").html(data).removeClass("loadding");
                },
                error: function (data, response) { }
            });
            // end load first time

            var width_popup = (obj_query_data.width_popup != '') ? obj_query_data.width_popup : 620;
            var size_type = obj_query_data.size_type;
            $(document).on("click", ".box-data-month-price .box-content.type-date:not(.type-null)", function () {

                var data_date = $(this).data("date");
                var data_date_hidden = data_date.replace(/\//g, "");

                var str_code_from = $(this).data("code-from");
                var str_code_end = $(this).data("code-end");

                var str_name_from = $(this).data("name-from");
                var str_name_end = $(this).data("name-end");

                var num_adult = 9;
                var num_child = 8;
                var num_infant = 4;

                var str_option_adult = ''; var str_option_child = ''; var str_option_infant = '';
                for (var i = 0; i <= num_adult; i++) {
                    str_option_adult += (i == 0) ? '' : "<option value='" + i + "' > " + i + " </option>";
                    if (i <= num_child) { str_option_child += "<option value='" + i + "' > " + i + " </option>"; }
                    if (i <= num_infant) { str_option_infant += "<option value='" + i + "' > " + i + " </option>"; }


                }
                //rad_itinerary_data_month
                Swal.fire({
                    title: "VÃ© mÃ¡y bay tá»« " + str_name_from + "  Ä‘i " + str_name_end,
                    icon: '',
                    width: width_popup,
                    html:
                        '<table class="table tlb-data-popup-month">' +
                        '<tr>' +
                        '<td colspan="3"> <div class="box-type-itinerary"><label for="lbl-itinerary-data-month-oneway"><input checked id="lbl-itinerary-data-month-oneway" type="radio" name="rad_itinerary_data_month" value="Oneway" /> Má»™t chiá»u </label> <label for="lbl-itinerary-data-month-roundtrip"><input id="lbl-itinerary-data-month-roundtrip" type="radio" name="rad_itinerary_data_month" value="Roundtrip" /> Khá»© há»“i </label></div> </td>' +
                        '</tr>' +

                        '<tr>' +
                        '<td colspan="3">' +
                        '<div class="box-date-input">' +
                        '<div> <input class="txt-date-depart-data-month-hidden form-control" type="hidden" value="' + data_date_hidden + '" /> <label for="txt-date-depart-data-month">NgÃ y Ä‘i</label><input readonly id="txt-date-depart-data-month" class="txt-date-depart-data-month form-control"  value="' + data_date + '" /> </div> ' +
                        '<div> <input class="txt-date-return-data-month-hidden form-control" type="hidden" value="" /> <label for="txt-date-return-data-month">NgÃ y vá»</label>  <input readonly id="txt-date-return-data-month" class="txt-date-return-data-month form-control"  value="--/--/----" /> </div>' +
                        '</div> ' +
                        '</td>' +
                        '</tr>' +

                        '<tr>' +
                        '<td><label for="slc-adult-data-month" >NgÆ°á»i lá»›n</label> <select class="slc-adult-data-month form-control" >' + str_option_adult + '</select></td>' +
                        '<td><label for="slc-child-data-month" >Tráº» em</label> <select class="slc-child-data-month form-control" >' + str_option_child + '</select></td>' +
                        '<td><label for="slc-infant-data-month" >Em bÃ©</label> <select class="slc-infant-data-month form-control">' + str_option_infant + '</select></td>' +
                        '</tr>' +

                        '</tr>' +

                        '</table>',
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'TÃ¬m chuyáº¿n bay',
                    confirmButtonAriaLabel: 'TÃ¬m chuyáº¿n bay',
                    confirmButtonColor: '#ff5e1f',

                    //cancelButtonColor: '#fff',
                    cancelButtonText: 'Xem láº¡i',
                    cancelButtonAriaLabel: 'ÄÃ³ng',
                    onOpen: function () {
                        var obj_table_popup_data_month = $("table.tlb-data-popup-month");
                        obj_table_popup_data_month.find(".txt-date-depart-data-month").datepickerlunar({

                            dateFormat: "dd/mm/yy",
                            altField: ".txt-date-depart-data-month-hidden",
                            altFormat: "ddmmyy",
                            minDate: 0,
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

                                var str_itinerary_data = obj_table_popup_data_month.find("input[name='rad_itinerary_data_month']:checked").val();
                                if (str_itinerary_data == 'Roundtrip') {
                                    var date = $(this).datepickerlunar('getDate'),
                                        day = date.getDate(),
                                        month = date.getMonth() + 1,
                                        year = date.getFullYear();
                                    //                                  var date_luna_departure=GetDateString(day,month,year);
                                    //                                  $('.departureDateLunar-vi').text(date_luna_departure);
                                    $(".txt-date-return-data-month").datepickerlunar("option", "minDate", date);
                                }

                            },

                        });

                        obj_table_popup_data_month.find(".txt-date-return-data-month").datepickerlunar({
                            dateFormat: "dd/mm/yy",
                            altField: ".txt-date-return-data-month-hidden",
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
                                    var date_max_depart = $(this).datepickerlunar('getDate'),
                                        day = date_max_depart.getDate(),
                                        month = date_max_depart.getMonth() + 1,
                                        year = date_max_depart.getFullYear();
                                    //                                        var date_luna_departure=GetDateString(day,month,year);
                                    //                                        $('.return-date-lunar').show();
                                    //                                        $('.returnDateLunar-vi').text(date_luna_departure);
                                    $(".txt-date-depart-data-month").datepickerlunar("option", "maxDate", date_max_depart);
                                }
                            }
                        });


                    },
                    onAfterClose: function () {
                        var obj_table_popup_data_month = $("table.tlb-data-popup-month");
                        obj_table_popup_data_month.find(".txt-date-depart-data-month").datepickerlunar("destroy");
                        obj_table_popup_data_month.find(".txt-date-return-data-month").datepickerlunar("destroy");
                        //obj_table_popup_data_month.find(".txt-date-return-data-month").datepickerlunar( "destroy" );
                    },
                }).then(function (result) {
                    if (result.value) {

                        var obj_table_popup_data_month = $("table.tlb-data-popup-month");
                        //Itinerary=Oneway&Departure=SGN&Destination=HAN&DepartureDate=18112020&ReturnDate=&Adult=1&Child=0&
                        //Infant=0&device=desktop
                        var DepartureDate = obj_table_popup_data_month.find('.txt-date-depart-data-month-hidden').val();
                        var ReturnDate = obj_table_popup_data_month.find('.txt-date-return-data-month-hidden').val();
                        var Itinerary = obj_table_popup_data_month.find('input[name="rad_itinerary_data_month"]:checked').val();

                        var str_adult = obj_table_popup_data_month.find("select.slc-adult-data-month").val();
                        var str_child = obj_table_popup_data_month.find("select.slc-child-data-month").val();
                        var str_infant = obj_table_popup_data_month.find("select.slc-infant-data-month").val();

                        var str_params_query = new URLSearchParams({
                            Itinerary: Itinerary,
                            Departure: str_code_from,
                            Destination: str_code_end,
                            DepartureDate: DepartureDate,
                            ReturnDate: ReturnDate,
                            Adult: str_adult,
                            Child: str_child,
                            Infant: str_infant,
                        });
                        var full_link_query = url_link_home + '/flightsearch?' + str_params_query.toString();
                        window.location.href = full_link_query;

                    }
                });
            });



            $(".box-data-month-price .box-action-data-month select").change(function () {

                var obj_box_action = $(".box-data-month-price .box-action-data-month");
                var code_from = obj_box_action.find(".slc-code-from").val();
                var code_to = obj_box_action.find(".slc-code-to").val();
                var str_month = obj_box_action.find(".slc-month").val();
                var str_airlines = obj_box_action.find(".slc-airlines").val();

                $(".box-data-month-price .box-data-month-price-inner").html("<i class='fa fa-spin fa-spinner fa-2x'></i>").addClass("loadding");
                var obj_query = { code_from: code_from, code_to: code_to, str_month: str_month, str_airlines: str_airlines, size_type: size_type };
                $.ajax({
                    url: adminurl,
                    type: 'post',
                    data: { action: 'index_flight_month_ajax_change_data_month', data_query: obj_query },
                    success: function (data) {
                        $(".box-data-month-price .box-data-month-price-inner").html(data).removeClass("loadding");
                    },
                    error: function (data, response) { }
                });

            });
        });
    },

    base_onesingal_segment_page_visit: function (obj_data) {
        setTimeout(function () {
            if (typeof OneSignal != 'function') { return false; }
            OneSignal.log.setLevel("TRACE");

            var numVisitsTrigger = 0; /* Number of page visits before tagging user */
            var topic = obj_data.topic; /* The topic of the page */
            function tagUserWithPageTopic(key, value) {
                OneSignal.push(function () {
                    OneSignal.isPushNotificationsEnabled(function (isEnabled) {
                        //console.log("isEnabled: ", isEnabled);
                        if (isEnabled) {
                            OneSignal.sendTag(key, value, function (tagsSent) {
                                // Callback called when tags have finished sending
                                //console.log('tags sent: ', tagsSent);
                            });
                        }
                    });
                });
            }
            if (typeof localStorage !== "undefined") {
                var topicVisits = parseInt(localStorage.getItem(topic), 10);
                if (!isNaN(topicVisits)) { topicVisits += 1; }
                else { topicVisits = 0; }
                localStorage.setItem(topic, topicVisits)
                if (topicVisits >= numVisitsTrigger) { tagUserWithPageTopic(topic, topicVisits); }
            }
        }, 5000);


    },
    base_create_url_query: function (obj_data) {
        var ret = [];
        for (var d in obj_data) {
            //ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(obj_data[d]));
            ret.push(d + '=' + obj_data[d]);
        }
        return ret.join('&');
    },
    base_donetying: function () {
        $.fn.extend({
            donetyping: function (callback, timeout) {
                timeout = timeout || 1e3; // 1 second default timeout
                var timeoutReference,
                    doneTyping = function (el) {
                        if (!timeoutReference) return;
                        timeoutReference = null;
                        callback.call(el);
                    };
                return this.each(function (i, el) {
                    var $el = $(el);
                    // Chrome Fix (Use keyup over keypress to detect backspace)
                    // thank you @palerdot
                    $el.is(':input') && $el.on('keyup keypress paste input', function (e) {
                        // This catches the backspace button in chrome, but also prevents
                        // the event from triggering too preemptively. Without this line,
                        // using tab/shift+tab will make the focused element fire the callback.
                        if (e.type == 'keyup' && e.keyCode != 8) return;
                        // Check if timeout has been set. If it has, "reset" the clock and
                        // start over again.
                        if (timeoutReference) clearTimeout(timeoutReference);
                        timeoutReference = setTimeout(function () {
                            // if we made it here, our timeout has elapsed. Fire the
                            // callback
                            doneTyping(el);
                        }, timeout);
                    }).on('blur', function () {
                        // If we can, fire the event since we're leaving the field
                        doneTyping(el);
                    });
                });
            }
        });
    },
    base_return_param_url: function (sParam) {

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
    base_return_format_currency: function (val_currency_data) {

        var final_current_format = 0;
        if (val_currency_data >= 0) {
            var val_current = parseInt(val_currency_data);
            val_current = val_current.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            val_current = val_current.replace(/\...$/, '');
            final_current_format = val_current;
        }
        return final_current_format;
    },
    base_typeahead_custom: function (obj_data) {
        if (typeof $().typeahead != 'function') { return false; }

        var type_list = obj_data.type_list;
        var query_data = obj_data.query_data;
        var tag_input = obj_data.tag_input;
        var obj_data_json = obj_data.data;
        var display_key = obj_data.display_key;
        var obj_template = obj_data.obj_template;
        var obj_hidden_input = obj_data.obj_hidden_input;
        var obj_count = obj_data.obj_count;
        function loadedSourceHandler(query, syncResults, type) {
            if (!jsHelper.isBlank(query)) {
                query = prepareQuery(query);
                return matcher_data(query, type, syncResults, type_list);
            }
        }
        function matcher_data(query, data, syncResults) {
            if (!jsHelper.isBlank(query)) {
                var matches = [];
                $.each(data, function (i, object) {

                    var str_query = '';
                    $.each(query_data, function (j, object_j) {
                        str_query += object[object_j] + ' ';
                    });
                    if (fullTextCompare(query, str_query)) { matches.push(object); }
                });
                syncResults(matches);
            }
        }

        // ***************
        function fullTextCompare(queryStr, textToCompare) {
            textToCompare = jsHelper.remove_unicode($.trim(textToCompare.toLowerCase()));
            textToCompare = textToCompare.replace(/-/g, " ");

            queryStr = jsHelper.remove_unicode($.trim(queryStr.toLowerCase()));
            queryStr = queryStr.replace(/-/g, " ");
            queryStr = queryStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

            var arrWords = queryStr.split(" ");
            //Encapsulate your words inside regex groups
            arrWords = $.map(arrWords, function (n) {
                return ["(?=.*" + n + ")"];
            });
            //Create a regex pattern
            var sRegex = new RegExp("^" + arrWords.join("") + ".*$", "im");
            //Execute the regex match

            return (textToCompare.match(sRegex) === null ? false : true);
        }
        function prepareQuery(query) {
            query = jsHelper.remove_unicode($.trim(query.toLowerCase()));
            query = query.replace(/-/g, " ");
            var regExp = new RegExp("^(.*[^\s/][2-9]*[^\s/](ngay)[^\s/][1-9]*[^\s/](dem))*$", "gm");
            var regExp2 = new RegExp("^(.*[2-9]*(ngay)[1-9]*(dem))*$", "gm");
            var regExp3 = new RegExp("^(.*[2-9]*[^\s/](ngay|dem).*)*$", "gm");
            var result = regExp.test(query) || regExp2.test(query) || regExp3.test(query);

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

        $(document).ready(function () {

            if (obj_template == null) {
                $(tag_input).typeahead(
                    { hint: false, highlight: true, minLength: 0, },
                    {
                        displayKey: display_key,
                        name: type_list,
                        source: function (query, process) {
                            var locations_data = loadedSourceHandler(query, process, obj_data_json, type_list);
                            process(locations_data);
                        },
                    }
                );
            }
            else {
                var title = obj_template.title;
                $(tag_input).typeahead(
                    { hint: false, highlight: true, minLength: 0, },
                    {
                        displayKey: display_key,
                        name: type_list,
                        source: function (query, process) {
                            var locations_data = loadedSourceHandler(query, process, obj_data_json, type_list);
                            process(locations_data);
                        },
                        templates: {

                            header: '<h5 class="item-title-autocomplete"><span class="glyphicon glyphicon-map-marker"></span> ' + title + '</h5>',
                            suggestion: function (data) {
                                if (obj_template.image) {
                                    var image_base_url = obj_template.image_base_url;
                                    var image_key = obj_template.image_key;
                                    var str_image = image_base_url + '' + data[image_key];
                                    var template = '<div><img src="' + str_image + '" alt="' + data[image_key] + '" />' + data[display_key] + '</div>';
                                }
                                else { var template = '<div>' + data[display_key] + '</div>'; }

                                return template;
                            }
                        }
                    }
                ).on(
                    {
                        'typeahead:selected': function (e, data) {
                            if (obj_hidden_input != null) {
                                var tag_input_hidden = obj_hidden_input.tag_input;
                                var display_key_hidden = obj_hidden_input.display_key;
                                $(tag_input_hidden).val(data[display_key_hidden]);
                            }
                            if (obj_count != null) {
                                var tag_input_show = obj_count.tag_input_show;
                                $(tag_input_show).removeClass("hidden");
                                var tag_input_count = obj_count.tag_input;
                                var display_key_count = obj_count.display_key;
                                $(tag_input_count).text(data[display_key_count]);


                            }
                        },
                        'typeahead:autocompleted': function (e, data) { },
                        'typeahead:render': function (e, data) {
                            //$(".tt-suggestion").mark(mainQuery);
                        },
                        'keyup': function (e) { },
                    });
            }


        });
    },
    base_ajax_get_captcha: function (obj_data) {
        var tag_img = obj_data.tag_img;
        var tag_prefix = obj_data.tag_prefix;
        $(document).ready(function () {
            $.ajax({
                url: adminurl,
                type: 'post',
                dataType: 'json',
                data: { action: 'ajax_get_captcha' },
                success: function (data) {
                    $(tag_img).html(data.tag_img);
                    $(tag_prefix).val(data.prefix);
                },
                error: function (data, response) {
                }
            });
        });
    },
    base_owl_slider: function (obj_query_data) {
        if ($().owlCarousel) {
            var id_tag = obj_query_data.id_tag;
            var count_item = (obj_query_data.count_item == null) ? 1 : obj_query_data.count_item;
            var arrow_button = (obj_query_data.arrow_button == null) ? ["<div class='arrow-left-slider'><i class='fa fa-chevron-left fa-3x' aria-hidden='true'></i></div>", "<div class='arrow-right-slider'><i class='fa fa-chevron-right fa-3x' aria-hidden='true'></i></div>"] : obj_query_data.arrow_button;
            var auto_play = (obj_query_data.auto_play == null) ? 5000 : obj_query_data.auto_play;
            var speed_pagination = (obj_query_data.speed_pagination == null) ? 400 : obj_query_data.speed_pagination;
            var speed_slide = (obj_query_data.speed_slide == null) ? 300 : obj_query_data.speed_slide;
            var stagePadding = (obj_query_data.stagePadding == null) ? 0 : obj_query_data.stagePadding;
            var is_loop = (obj_query_data.is_loop == null) ? false : obj_query_data.is_loop;
            var is_nav = (obj_query_data.is_nav == null) ? true : obj_query_data.is_nav;
            $(id_tag).owlCarousel({
                items: count_item,
                nav: is_nav, // Show next and prev buttons
                navigationText: arrow_button,
                slideSpeed: speed_slide,
                paginationSpeed: speed_pagination,
                singleItem: false,
                loop: is_loop,
                autoPlay: auto_play,
                autoplayHoverPause: true,
                stagePadding: stagePadding
            });
        }
    },
    base_counterup: function () {

        if ($().counterUp) {
            $(document).ready(function () {
                $("[data-counter='counterup']").counterUp({
                    delay: 10,
                    time: 1e3
                });
            });
        }
    },

    base_show_notify_browser: function (obj_data_query) {
        var str_url = obj_data_query.url;
        var title = obj_data_query.title;
        var content = obj_data_query.content;
        var url_icon = obj_data_query.icon;
        var notify;
        if (Notification.permission == 'default') { }
        else {
            notify = new Notification(
                title,
                { body: content, icon: url_icon, tag: str_url }
            );
            notify.onclick = function () {
                //window.location.href = this.tag; 
                window.open(this.tag);
            }
        }
    },
    base_create_notify_browser: function () {

        if ($("body").hasClass("ui-mobile-viewport")) { return false; }
        if (!window.Notification) { }
        else {
            Notification.requestPermission(function (p) {
                if (p === 'denied') { }
                else { }
            });
        }
    },
    base_system_scroll_fixed: function (obj_query_data) {

        var class_scroll_fixed = obj_query_data.class_scroll_fixed;
        var class_box_limit = obj_query_data.class_box_limit;
        if (typeof $().scrollToFixed != 'function') { return false; }
        var zIndex = (obj_query_data.index == null) ? 999 : obj_query_data.index;

        $(document).ready(function () {

            $(class_scroll_fixed).scrollToFixed(
                {
                    //top:0,
                    limit: function () {

                        var count_position_scroll_fixed = $(class_scroll_fixed).offset().top;
                        var count_position_limit = $(class_box_limit).offset().top;
                        if (count_position_scroll_fixed < count_position_limit) { $(class_scroll_fixed).css({ visibility: 'visible' }); }
                        else { $(class_scroll_fixed).css({ visibility: 'hidden' }); }

                        return $(class_box_limit).offset().top;
                    },
                    preFixed: function () {
                        var count_top = ($('.header-box-full-top').hasClass('logged')) ? '82px' : '50px';
                        $(class_scroll_fixed).css({ 'margin-top': count_top, display: 'block' });
                    },
                    postFixed: function () {
                        var count_position_scroll_fixed = $(class_scroll_fixed).offset().top;
                        var count_position_limit = $(class_box_limit).offset().top;

                        if (count_position_scroll_fixed >= count_position_limit) { $(class_scroll_fixed).css({ visibility: 'hidden' }); }
                        else { $(class_scroll_fixed).css({ visibility: 'visible', 'margin-top': '0px' }); }
                    },
                    zIndex: zIndex
                });
            if ($(class_box_limit).length > 0) {


            }
        });
    },
    base_system_readmore: function (obj_query_data) {
        var class_click = obj_query_data.class_click;
        var class_active = obj_query_data.class_active;
        var title_open = (obj_query_data.title_open != '') ? obj_query_data.title_open : 'Xem thÃªm';
        var title_close = (obj_query_data.title_close != '') ? obj_query_data.title_close : 'Thu láº¡i';
        if (!$(class_active).hasClass("active")) { $(class_active).addClass("active"); $(class_click).text(title_close); }
        else { $(class_active).removeClass("active"); $(class_click).text(title_open); }
    },
    base_system_datatable: function (class_table, arr_column_query) {
        $(document).ready(function () {

            var arr_column_filter = null;
            var arr_column_formatted_num = null;
            var arr_num_row = null;
            if (arr_column_query != null) {
                arr_column_filter = arr_column_query.arr_column_filter;
                arr_column_formatted_num = arr_column_query.arr_column_formatted_num;
                arr_num_row = arr_column_query.arr_num_row;
            }

            $(class_table).DataTable({
                columnDefs: [{ targets: arr_column_filter, orderable: false }, { type: 'formatted-num', targets: arr_column_formatted_num }],
                initComplete: function () {
                    if (arr_column_filter != null) {
                        var count_column = 0;
                        this.api().columns().every(function () {

                            var chk_select = arr_column_filter.indexOf(count_column);
                            if (chk_select >= 0) {
                                var column = this;
                                var select = $('<select class="form-control"><option value=""></option></select>')
                                    .appendTo($(column.header()).empty())
                                    .on('change', function () {
                                        var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                        column.search(val ? '^' + val + '$' : '', true, false).draw();
                                    });
                                column.data().unique().sort().each(function (d, j) {
                                    var d_format = d.replace(/(<([^>]+)>)/ig, "");
                                    select.append('<option value="' + d_format + '">' + d_format + '</option>')
                                });
                            }
                            count_column++;
                        });
                    }
                }
                ,
                lengthMenu: (arr_num_row != null) ? arr_num_row : [-1, 10, 25, 50, 100],
                language: {
                    "lengthMenu": "Hiá»‡n thá»‹ _MENU_ hÃ ng trong má»—i trang",
                    "zeroRecords": "Xin lá»—i, KhÃ´ng tÃ¬m tháº¥y dá»¯ liá»‡u",
                    "info": "Äang hiá»‡n thá»‹ _PAGE_ cá»§a _PAGES_ trang",
                    "infoEmpty": "KhÃ´ng cÃ³ dá»¯ liá»‡u",
                    "infoFiltered": "(lá»c tá»« _MAX_ toÃ n bá»™ dá»¯ liá»‡u)",
                    "search": "TÃ¬m:",
                    "paginate": {
                        "first": "Äáº§u tiÃªn",
                        "last": "Sau cÃ¹ng",
                        "next": "Tiáº¿p",
                        "previous": "TrÆ°á»›c",
                    },
                },
                order: []
            });
        });
    },
    base_system_submit_form: function (obj_query_data) {

        if (typeof $().validate != 'function') { return false; }

        function base_ajax_update_submit_info(obj_query_data_form) {
            var str_data_form = obj_query_data_form.data_form;
            var str_action = obj_query_data_form.action;
            var str_id_form = obj_query_data_form.id_form;

            var datas = str_data_form.serializeArray(); var data = {};
            for (s in datas) { data[datas[s]['name']] = datas[s]['value'] }

            var obj_data = { action: str_action, data: data };
            var title_question = obj_query_data_form.title_question;
            title_question = (title_question != null) ? title_question : 'Báº¡n Ä‘á»“ng Ã½ vá»›i lá»±a chá»n nÃ y ?';

            var btn_confirm = obj_query_data_form.btn_confirm;
            btn_confirm = (btn_confirm != null) ? btn_confirm : 'Äá»“ng Ã½';

            var btn_cancel = obj_query_data_form.btn_cancel;
            btn_cancel = (btn_cancel != null) ? btn_cancel : 'Há»§y';

            var str_html = obj_query_data_form.str_html;
            str_html = (str_html != null) ? str_html : '';
            var str_icon = obj_query_data_form.icon;
            str_icon = (str_icon != null) ? str_icon : 'warning';

            var str_width = obj_query_data_form.width;
            str_width = (str_width != null) ? str_width : 320;

            var customClass = obj_query_data_form.customClass;
            Swal.fire({
                title: title_question,
                text: "",
                type: str_icon,
                html: str_html,
                width: str_width,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: btn_confirm,
                cancelButtonText: btn_cancel,
                customClass: customClass
            }).then(function (result) {

                if (result.value) {
                    $(str_id_form).find("button[type='submit']").append(" <i class='fa fa-spin fa-spinner'></i>");
                    var is_finished_data = false;
                    $.post(adminurl, obj_data, function () {
                        //success
                    })
                        .done(function () {
                            //second success
                            is_finished_data = true;
                        })
                        .fail(function (data_results) {
                            //error
                            is_finished_data = false;
                        })
                        .always(function (data_results) {
                            //finished
                            if (is_finished_data) {
                                var e = $(str_id_form),
                                    r = $(".alert-danger", e),
                                    i = $(".alert-success", e);
                                var obj_results = JSON.parse(data_results);
                                var str_text = obj_results.text;
                                if (obj_results.error == 0) {
                                    if (str_text == '') { i.show(), r.hide(), APPS_BASE.base_scrollTo(e, 1); }
                                    else { i.html(str_text).show(), r.hide(), APPS_BASE.base_scrollTo(e, 1); }
                                } // success
                                else {
                                    if (str_text == '') { i.hide(), r.show(), APPS_BASE.base_scrollTo(e, 1); }
                                    else { i.hide(), r.html(str_text).show(), APPS_BASE.base_scrollTo(e, 1); }
                                } // failed
                            }
                            $(str_id_form).find("button[type='submit']").find("i").remove();
                        });
                }
            });
        }

        var str_id_form = obj_query_data.id_form;
        var str_action = obj_query_data.action;
        var str_title_question = obj_query_data.title_question;
        var str_html = obj_query_data.html;
        var btn_confirm = obj_query_data.button_confirm;
        var btn_cancel = obj_query_data.button_cancel;
        var icon = obj_query_data.icon;
        var width = obj_query_data.width;
        var customClass = obj_query_data.customClass;

        var e = $(str_id_form),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);

        $(document).ready(function () {
            $(str_id_form).validate({
                errorElement: "span",
                errorClass: "help-block help-block-error",
                focusInvalid: !1,
                ignore: "",
                messages: {}
                , rules: {}
                , invalidHandler: function (e, t) { i.hide(), r.show(), APPS_BASE.base_scrollTo(r, -200) }
                , errorPlacement: function (e, r) { r.is(":checkbox") ? e.insertAfter(r.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline")) : r.is(":radio") ? e.insertAfter(r.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline")) : e.insertAfter(r) }
                , highlight: function (e) { $(e).closest(".form-group").addClass("has-error") }
                , unhighlight: function (e) { $(e).closest(".form-group").removeClass("has-error") }
                , success: function (e) { e.closest(".form-group").removeClass("has-error") }
                , submitHandler: function (e) {
                    var obj_query_data_form = {
                        data_form: $(e).closest("form"),
                        id_form: str_id_form,
                        action: str_action,
                        title_question: str_title_question,
                        str_html: str_html,
                        btn_confirm: btn_confirm,
                        btn_cancel: btn_cancel,
                        icon: icon,
                        width: width,
                        customClass: customClass

                    };
                    base_ajax_update_submit_info(obj_query_data_form);
                }
            });
        });
    },
    base_system_typeahead_data: function (obj_query_data) {
        if (typeof $().typeahead != 'function') { return false; }
        $(document).ready(function () {
            var url_source = obj_query_data.url_source;
            var class_click = obj_query_data.class_click;
            var class_hidden = obj_query_data.class_hidden;
            var title = obj_query_data.title;
            var fitler_by = obj_query_data.fitler_by;
            var data_source = [];
            $.getJSON(url_source, function (data) { data_source = data; });

            $(class_click).typeahead(
                { hint: false, highlight: true, minLength: 0, },
                {
                    displayKey: fitler_by,
                    name: 'data_source',
                    source: function (query, process) {
                        mainQuery = query;
                        var locations_data = loadedSourceHandler(query, process, data_source, fitler_by);
                        process(locations_data);
                    },
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><span class="glyphicon glyphicon-map-marker"></span> ' + title + '</h5>',
                        suggestion: function (data) {
                            var data_count = '<span class="pull-right vcolor-gray-dark "> <b>' + '</b></span>';
                            var template = '<div>' + data[fitler_by] + data_count + '</div>';
                            return template;
                        }
                    }
                }
            ).on({
                'typeahead:selected': function (e, data) {
                    $(class_hidden).val(data.id_post);
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
                query = query.replace(/-/g, " ");
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
                textToCompare = textToCompare.replace(/-/g, " ");

                queryStr = jsHelper.remove_unicode($.trim(queryStr.toLowerCase()));
                queryStr = queryStr.replace(/-/g, " ");
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
            function matcher(query, data, syncResults, fitler_by) {
                if (!jsHelper.isBlank(query)) {
                    var matches = [];
                    $.each(data, function (i, object) {
                        if (fullTextCompare(query, object[fitler_by])) {
                            matches.push(object);
                        }
                    });
                    syncResults(matches);
                }
            }
            function loadedSourceHandler(query, syncResults, type, fitler_by) {
                if (!jsHelper.isBlank(query)) {
                    query = prepareQuery(query);
                    return matcher(query, type, syncResults, fitler_by);
                }
            }
        });
    },
    base_system_tooltip: function () {
        if (typeof $().tooltip == 'function') {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        }


    },
    base_system_copy: function (obj_data) {
        var text_copy = obj_data.text;
        function fallbackCopyTextToClipboard(text) {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            //textArea.focus();
            textArea.select();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                if (msg == 'successful') {
                    APPS_BASE.base_toastr({ type: "success", content: "Báº¡n Ä‘Ã£ copied.", title: "Sao chÃ©p!" });
                }
                //console.log('Fallback: Copying text command was ' + msg);
            } catch (err) {
                //console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
        }
        fallbackCopyTextToClipboard(text_copy);

    },
    base_scrollTo: function (t, e) {
        var o = t && t.size() > 0 ? t.offset().top : 0;
        t && ($("body").hasClass("page-header-fixed") ? o -= $(".page-header").height() : $("body").hasClass("page-header-top-fixed") ? o -= $(".page-header-top").height() : $("body").hasClass("page-header-menu-fixed") && (o -= $(".page-header-menu").height()), o += e ? e : -1 * t.height()), $("html,body").animate({
            scrollTop: o
        }, "slow");
    },
    base_input_maxlenght: function () {
        $(document).ready(function () {
            if (typeof $().maxlength === 'function') {
                $('input[maxlength]:not(.is-show-length),textarea[maxlength]:not(.is-show-length)').maxlength();
                $('input[maxlength].is-show-length,textarea[maxlength].is-show-length').maxlength({ alwaysShow: true });
            }

        });
    },
    base_toastr: function (obj_data, obj_data_param) {
        var type_notification = obj_data.type;
        var str_content = obj_data.content;
        var str_title = obj_data.title;

        var positionClass = 'toast-top-right';
        if (obj_data_param != null) {
            positionClass = obj_data_param.positionClass;
        }

        $(document).ready(function () {
            if (typeof toastr === 'object') {
                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": positionClass,
                    "preventDuplicates": false,
                    //                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "4000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                toastr[type_notification](str_content, str_title);
            }

        });
    },
    base_system_on_notification_all: function () {
        //var _0x730b=["\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x76\x6E\x62\x6B\x2E\x68\x65\x72\x6F\x6B\x75\x61\x70\x70\x2E\x63\x6F\x6D","\x73\x65\x72\x76\x65\x72\x5F\x63\x6F\x6D\x6D\x6F\x6E\x5F\x70\x75\x73\x68\x5F\x6E\x6F\x74\x69\x66\x79","\x74\x79\x70\x65\x5F\x6E\x6F\x74\x69\x66\x79","\x6D\x61\x72\x6B\x65\x74\x69\x6E\x67\x5F\x77\x65\x62\x5F\x70\x75\x73\x68\x5F\x64\x61\x74\x61","\x62\x61\x73\x65\x5F\x73\x68\x6F\x77\x5F\x6E\x6F\x74\x69\x66\x79\x5F\x62\x72\x6F\x77\x73\x65\x72","\x6F\x6E"];if( typeof io!= _0x730b[0]){return false};var socket=io(_0x730b[1]);socket[_0x730b[6]](_0x730b[2],function(_0xd8ebx2){if(_0xd8ebx2[_0x730b[3]]=== _0x730b[4]){APPS_BASE[_0x730b[5]](_0xd8ebx2)}})
        if (typeof io != 'function') { return false; }
        var socket = io("https://vnbk.herokuapp.com");
        socket.on("server_common_push_notify", function (data) {
            if (data.type_notify === 'marketing_web_push_data') {
                APPS_BASE.base_show_notify_browser(data);
            }
        });

    },
    base_system_listen_notification: function (data) {
        if (typeof io != 'function') { return false; }
        var socket = io("https://vnbk.herokuapp.com");
        socket.emit("emit_common_push_notify", data);
    },
    base_return_datetime_now: function () {
        var date_current = new Date();
        var ngay_current = date_current.getDate() + '';
        ngay_current = (ngay_current.length == 1) ? '0' + ngay_current : ngay_current;
        // ***************************
        var month = new Array();
        month[0] = "01"; month[1] = "02"; month[2] = "03"; month[3] = "04"; month[4] = "05"; month[5] = "06"; month[6] = "07"; month[7] = "08"; month[8] = "09"; month[9] = "10"; month[10] = "11"; month[11] = "12";
        var thang_current = month[date_current.getMonth()];
        var nam_current = date_current.getFullYear();
        var gio_current = date_current.getHours() + '';
        gio_current = (gio_current.length == 1) ? '0' + gio_current : gio_current;
        var phut_current = date_current.getMinutes() + '';
        phut_current = (phut_current.length == 1) ? '0' + phut_current : phut_current;
        var giay_current = date_current.getSeconds() + '';
        giay_current = (giay_current.length == 1) ? '0' + giay_current : giay_current;
        var str_datetime = nam_current + '-' + thang_current + '-' + ngay_current + ' ' + gio_current + ':' + phut_current + ':' + giay_current;
        return str_datetime;
    },

}
APPS_BASE.init()
