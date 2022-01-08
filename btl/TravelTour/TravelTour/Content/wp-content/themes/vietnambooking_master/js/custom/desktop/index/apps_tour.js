var APPS_TOUR = {
    init: function () {
        // TOURS

        this.single_tour_slider_feature();

        this.select_people_change_price_tour();

        this.load_data_when_action_tab_tour();

    },
    websocket_update_order_tour: function (data) {
        var socket = io("https://vnbk.herokuapp.com");
        socket.emit("emit_query_update_order_tour_vnbk", data);
    },
    tour_ajax_load_viewed_recent: function () {
        "use strict";
        $(document).ready(function () {
            $.ajax({
                url: adminurl,
                type: 'post',
                data: { action: 'ajax_load_post_viewed_recent' },
                success: function (data) {
                    $('.box-content-tour-viewed-recent').html(data);
                },
                error: function (data, response) {
                }
            });
        });
    },
    // SINGLE COOKIE VIEWED RECENT TOUR
    tour_post_viewed_recent: function (postID) {
        "use strict";
        $(document).ready(function () {
            $.ajax({
                url: adminurl,
                type: 'post',
                data: { action: 'ajax_cookie_post_viewed_recent', postID: postID },
                success: function (data) {
                },
                error: function (data, response) {
                }
            });
        });
    },
    scroll_fixed_form_tour_sidebar: function () {
        "use strict";
        $(document).ready(function () {
            if ($(".box-form-price-tour.horizontal").length > 0) {

                $('.sidebar-box-tour').scrollToFixed(
                    {
                        //top:0,
                        limit: function () {
                            return $('.box-form-price-tour.horizontal').offset().top;
                        },
                        preFixed: function () {
                            var count_top = ($('.header-box-full-top').hasClass('logged')) ? '82px' : '50px';

                            $('.box-form-price-tour.vertical').css({ 'margin-top': count_top, display: 'block' });
                            $(".sidebar-box-tour .sidebar-box-item").css({ display: 'block' });
                        },
                        postFixed: function () {

                            var count_position_vertical = $('.box-form-price-tour.vertical').offset().top;
                            var count_position_horizontal = $('.box-form-price-tour.horizontal').offset().top;

                            if (count_position_vertical >= count_position_horizontal) {
                                $('.box-form-price-tour.vertical').css({ display: 'none' });
                                $(".sidebar-box-tour .sidebar-box-item").css({ display: 'none' });
                            }
                            else { $('.box-form-price-tour.vertical').css({ display: 'block' }); $(".sidebar-box-tour .sidebar-box-item").css({ display: 'block' }); }

                        },
                    });
            }

        });
    },
    // change price tour
    select_people_change_price_tour: function () {
        "use strict";
        function addCommas(nStr) {
            nStr += '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }

        $(document).ready(function () {
            $('.slc-tour-people').change(function () {
                var price = $(this).attr('data-price');
                var number_people = $(this).val();
                var savedIndex = $(this).prop('selectedIndex');
                $(".slc-tour-people").prop('selectedIndex', savedIndex);
                if (isNaN(price) == false && isNaN(price) == false) {
                    var total_price = price * number_people;
                    var str_total_price = addCommas(total_price);
                    $('.title-price-tour').html('GiÃ¡ ' + number_people + ' ngÆ°á»i');
                    $('.price-tour').html(str_total_price);
                }

            });
        });

    },
    // chane payment tour
    rad_change_payment_page_set_tour: function () {
        "use strict";
        $(document).ready(function () {
            $('input[name="rad_type_payment"').change(function () {
                var val_rad = $(this).val();
                if (val_rad == 'van_phong') {
                    $('.box-thu-tien-tan-noi').addClass('hidden');
                    $('.box-chuyen-khoan').addClass('hidden');
                    $('.box-van-phong').removeClass('hidden');
                }
                else if (val_rad == 'thu_tien_tan_noi') {
                    $('.box-thu-tien-tan-noi').removeClass('hidden');
                    $('.box-chuyen-khoan').addClass('hidden');
                    $('.box-van-phong').addClass('hidden');
                }
                else if (val_rad == 'chuyen_khoan') {
                    $('.box-thu-tien-tan-noi').addClass('hidden');
                    $('.box-chuyen-khoan').removeClass('hidden');
                    $('.box-van-phong').addClass('hidden');
                }


            });
        });
    },
    // SINGLE TOUR SLIDER 
    single_tour_slider_feature: function () {
        "use strict";
        $(document).ready(function () {
            $("#owl-slider-tour-single-feature").owlCarousel({
                items: 1,
                navigation: true, // Show next and prev buttons
                navigationText: ["<div class='arrow-left-slider'></div>", "<div class='arrow-right-slider'></div>"],
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                autoplay: true,
                autoplayTimeout: 5000,
                stopOnHover: true,
                afterMove: function (elem) {
                    var current = this.currentItem;
                    $('.tlb-control-slider tr td img').removeClass('active');
                    $('.tlb-control-slider tr td img').eq(current).addClass('active');
                }
            });
        });
    },
    // TOUR FORM
    load_data_when_action_tab_tour: function () {
        "use strict";
        $(document).ready(function () {
            var chk_load_data_tour = $("ul.nav.nav-tabs li.active a[aria-controls='form-tour']").text();
            chk_load_data_tour += $(".form-box-controller-tabs ul li.active a[aria-controls='form-box-default-tour']").text();
            $.cookie("load_data_tour", chk_load_data_tour, { path: '/' });
            if ($.cookie("load_data_tour") != '') {
                APPS_TOUR.autocomplete_search_form_tours();
            }
            $("ul.nav.nav-tabs li,.form-box-controller-tabs ul li").click(function () {
                if ($.cookie("load_data_tour") == '') {
                    setTimeout(function () {
                        chk_load_data_tour = $("ul.nav.nav-tabs li.active a[aria-controls='form-tour']").text();
                        chk_load_data_tour += $(".form-box-controller-tabs ul li.active a[aria-controls='form-box-default-tour']").text();
                        $.cookie("load_data_tour", chk_load_data_tour, { path: '/' });
                        if ($.cookie("load_data_tour") != '') {
                            APPS_TOUR.autocomplete_search_form_tours();
                        }
                    }, 300);
                }
            });
        });
    },
    autocomplete_search_form_tours: function () {
        $(document).ready(function () {

            var locations = [];
            var popularLocations = [];
            var tours = [];
            var mainQuery = "";
            var handleBarsPopularLocationItemTemplate = Handlebars.compile($("#handleBarsPopularLocationItem").html());

            $.getJSON(url_link_bloginfo + "/libs/data_json/tours/list_tour.json",
                function (data) {
                    locations = data;
                });

            $.getJSON(url_link_bloginfo + "/libs/data_json/tours/hotdestination.json",
                function (data) {
                    popularLocations = data;
                });

            $.getJSON(url_link_bloginfo + "/libs/data_json/tours/list_tour_all.json",
                function (data) {
                    tours = data;
                });


            $('.search-tour-text').typeahead(
                { hint: true, highlight: true, minLength: 0, },
                {
                    displayKey: 'name',
                    name: 'locations',
                    source: function (query, process) {
                        mainQuery = query;
                        var locations_data = loadedSourceHandler(query, process, locations);
                        process(locations_data);
                    },
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><span class="glyphicon glyphicon-map-marker"></span> Äá»ŠA ÄIá»‚M</h5>',
                        suggestion: function (data) {
                            var tourCountStr = "";
                            tourCountStr = '<span class="pull-right vcolor-gray-dark "> <b>' + data.count + ' tours</b></span>';
                            var template = '<div><img src="' + data.image + '" alt="' + data.name + '"/>' + data.name + tourCountStr + '</div>';
                            return template;
                        }
                    }
                },
                {
                    displayKey: 'name',
                    name: 'tours',
                    source: function (query, process) {
                        mainQuery = query;
                        var locations_data = loadedSourceHandler(query, process, tours);
                        process(locations_data);
                    },
                    limit: 10,
                    templates: {
                        header: '<h5 class="item-title-autocomplete"><span class="glyphicon glyphicon-map-marker"></span> TOURS</h5>',
                        suggestion: function (data) {
                            var tourCountStr = "";
                            var str_price = (isNaN(data.price) === false) ? parseInt(data.price) : 0;
                            var total_price_format = (str_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                            total_price_format = total_price_format.replace(/\..*/g, '') + ' VND';
                            var str_html_price_format = (str_price > 0) ? '<div style="white-space: nowrap;">' + total_price_format + '</div>' : '';
                            //tourCountStr = '<span class="pull-right vcolor-gray-dark "> <b>' + data.parent + '</b></span>';
                            var template = '<div style="display:flex;"><div style="width:100%;padding-right: 15px;"><img src="' + data.image + '" alt="' + data.name + '"/>' + data.name + tourCountStr + '</div>' + str_html_price_format + '</div>';
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
                                str_count = "<b>" + data.count + "</b> " + (data.count > 1 ? "tours" : "tour");
                            }

                            var img_url1 = data.image;
                            var img_url2 = img_url1;
                            if (!jsHelper.isBlank(img_url1)) {
                                img_url2 = img_url1.replace("120x120", "180x180");
                            }
                            var context = { name: data.name, description: str_count, image_url: img_url1, image_url1: img_url2 };
                            var template = '<ul class="list-tour-top">' + handleBarsPopularLocationItemTemplate(context) + '</ul>';
                            //var template = '<div>' + data.Name + tourStr + '</div>';
                            return template;
                        },
                        footer: function (data) {
                            return "<div class='row'></div>";
                        },
                    }

                }
            ).on({
                'typeahead:selected': function (e, data) {
                    window.location.href = data.url;
                    //console.log(data.url);
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
                    query = query.replace(/[<>*%&:\\\?]/g, '');
                    window.location.href = url_link_home + '/tim-tour?t=' + encodeURIComponent(query);
                }
                else {
                    window.location.href = url_link_home + '/du-lich';
                }
            }
            $('.btn-search-tour').click(function () {
                doSearch();
            });


        });

    },
    // ******* END  SYSTEM TOUR

};
APPS_TOUR.init();
