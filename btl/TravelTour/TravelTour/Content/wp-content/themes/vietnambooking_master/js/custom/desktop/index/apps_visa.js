var APPS_VISA = {
    init: function () {

        // FORM VISA
        this.get_data_search_dai_su_quan_visa();

        this.search_dai_su_quan();
        this.tabs_type_visa();

        this.get_data_query_visa_country();

        this.load_data_when_action_tab_visa();
    },
    websocket_update_order_visa: function (data) {
        var socket = io("https://vnbk.herokuapp.com");
        socket.emit("emit_query_update_order_visa_vnbk", data);
    },
    get_data_query_visa_country: function () {
        "use strict";
        $(document).ready(function () {
            $('.slc-visa-country li').click(function () {
                var txt_visa_country = $(this).html();
                $('.txt-visa-country').val(txt_visa_country);
            });

            $('.txt-visa-country').click(function () {
                $(this).val('');
            });

        });
    },

    // VISA FORM
    // VISA TABS
    tabs_type_visa: function () {
        "use strict";
        $(document).ready(function () {

            $('.visa-box-choose-radio input').click(function () {
                var val_checked = $('.visa-box-choose-radio input:checked').val();
                if (val_checked == 'rad_list_embassy') {
                    $('.box-list-visa').addClass('hidden');
                    $('.box-list-embassy').removeClass('hidden');
                    $('.box-register-visa').addClass('hidden');

                }
                else if (val_checked == 'rad_list_visa') {
                    $('.box-list-visa').removeClass('hidden');
                    $('.box-list-embassy').addClass('hidden');
                    $('.box-register-visa').addClass('hidden');
                }
                else {
                    $('.box-list-visa').addClass('hidden');
                    $('.box-list-embassy').addClass('hidden');
                    $('.box-register-visa').removeClass('hidden');
                }
            });

        });
    },
    search_dai_su_quan: function () {
        "use strict";
        $(document).ready(function () {

            $('.btn-search-dai-su-quan').click(function () {
                var dai_su_quan = $('.txt-dai-su-quan').val();
                var tai_nuoc = $('.txt-country-dai-su-quan').val();
                dai_su_quan = dai_su_quan.split(' (');
                dai_su_quan = $.trim(dai_su_quan[0]);
                tai_nuoc = tai_nuoc.split(' (');
                tai_nuoc = $.trim(tai_nuoc[0]);

                $('.box-loadding').removeClass('hidden');
                $('.box-result-dai-su-quan .box-result-dai-su-quan-inner').html('');
                $.ajax({
                    url: adminurl,
                    type: 'post',
                    data: { action: 'ajax_get_dai_su_quan', dai_su_quan: dai_su_quan, tai_nuoc: tai_nuoc },
                    success: function (data) {
                        $('.box-loadding').addClass('hidden');
                        $('.box-result-dai-su-quan .box-result-dai-su-quan-inner').html(data);
                    },
                    error: function (data, response) {

                    }
                });
            });
        });
    },
    load_map_google: function (str_id, content1, lat1, lng1, image1) {
        "use strict";
        var map = new google.maps.Map(document.getElementById(str_id), {
            zoom: 17,
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
    load_data_when_action_tab_visa: function () {
        "use strict";
        $(document).ready(function () {
            var chk_load_data_visa = $("ul.nav.nav-tabs li.active a[aria-controls='form-visa']").text();
            chk_load_data_visa += $(".form-box-controller-tabs ul li.active a[aria-controls='form-box-default-visa']").text();
            $.cookie("load_data_visa", chk_load_data_visa, { path: '/' });
            if ($.cookie("load_data_visa") != '') {
                APPS_VISA.typeahead_custom_visa();
                APPS.ajax_get_captcha('.box-img-captcha-visa', '.prefix-cap-visa');
            }
            $("ul.nav.nav-tabs li,.form-box-controller-tabs ul li").click(function () {
                if ($.cookie("load_data_visa") == '') {
                    setTimeout(function () {
                        chk_load_data_visa = $("ul.nav.nav-tabs li.active a[aria-controls='form-visa']").text();
                        chk_load_data_visa += $(".form-box-controller-tabs ul li.active a[aria-controls='form-box-default-visa']").text();
                        $.cookie("load_data_visa", chk_load_data_visa, { path: '/' });
                        if ($.cookie("load_data_visa") != '') {
                            APPS_VISA.typeahead_custom_visa();
                            APPS.ajax_get_captcha('.box-img-captcha-visa', '.prefix-cap-visa');
                        }
                    }, 300);
                }
            });
        });
    },
    typeahead_custom_visa: function () {
        function loadedSourceHandler(query, syncResults, type, str_type) {
            if (!jsHelper.isBlank(query)) {
                query = prepareQuery(query);

                if (str_type == 'country') { return matcher_country(query, type, syncResults); }
                if (str_type == 'list_visa') { return matcher_list_visa(query, type, syncResults); }

            }
        }
        function matcher_country(query, data, syncResults) {
            if (!jsHelper.isBlank(query)) {
                var matches = [];
                $.each(data, function (i, object) {
                    if (fullTextCompare(query, object.country)) {
                        matches.push(object);
                    }
                });
                syncResults(matches);
            }
        }
        function matcher_list_visa(query, data, syncResults) {
            if (!jsHelper.isBlank(query)) {
                var matches = [];
                $.each(data, function (i, object) {
                    if (fullTextCompare(query, object.title)) {
                        matches.push(object);
                    }
                });
                syncResults(matches);
            }
        }

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




        var country = [];
        $.getJSON(url_link_bloginfo + "/libs/data_json/visa/list_country.json",
            function (data) {
                country = data;
            });
        var list_visa = [];
        $.getJSON(url_link_bloginfo + "/libs/data_json/visa/list_visa.json",
            function (data) {
                list_visa = data;
            });
        $(document).ready(function () {
            $('.txt-dai-su-quan,.txt-country-dai-su-quan,.txt-visa-country').typeahead(
                { hint: false, highlight: true, minLength: 0, },
                {
                    displayKey: 'country',
                    name: 'country',
                    source: function (query, process) {
                        var locations_data = loadedSourceHandler(query, process, country, 'country');
                        process(locations_data);
                    }
                }
            );

            $('.search-visa-text').typeahead(
                { hint: false, highlight: true, minLength: 0, },
                {
                    displayKey: 'title',
                    name: 'list_visa',
                    source: function (query, process) {
                        var locations_data = loadedSourceHandler(query, process, list_visa, 'list_visa');
                        process(locations_data);
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

        });
    },
    get_data_search_dai_su_quan_visa: function () {
        "use strict";
        $(document).ready(function () {
            $('.slc-dai-su-quan li').click(function () {
                var txt_dai_su_quan = $(this).html();
                $('.txt-dai-su-quan').val(txt_dai_su_quan);



            });
            $('.slc-country-dai-su-quan li').click(function () {
                var slc_dai_su_quan = $(this).html();
                $('.txt-country-dai-su-quan').val(slc_dai_su_quan);

            });


            $('.txt-dai-su-quan').click(function () {
                $(this).val('');
            });
            $('.txt-country-dai-su-quan').click(function () {
                $(this).val('');
            });

        });
    },

};
APPS_VISA.init();
