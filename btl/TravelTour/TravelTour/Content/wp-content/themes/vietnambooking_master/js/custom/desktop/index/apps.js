"use strict";
var APPS = {
    init: function () {
        // ANIMATE 
        //        this.active_frontpage_animate();
        // AJAX EMAIL NEWSLETTER
        //this.ajax_register_email_newsletter();
        // CATEGORY SLIDER
        this.info_slider();
        // LOG
        this.show_console_log();


        // GET MAP
        this.get_map_company();
        // GET INFO BANK
        this.get_info_bank();

        // BACK TOP TOP
        this.getBacktotop();
        // get ip data
        this.get_ip_data();

        // popover toggle
        this.popover_toggle();

        this.unset_cookie_form_vnbk();

        this.career_ajax_search_form();

        this.pushy_menu();

        this.popup_box_support();

        this.scroll_to_anchor();

        this.scroll_menu_header();


        this.apps_shortcode_system();
        this.apps_img_lazy();

    },
    apps_base_countdown_time: function (obj_query_data) {

        $(document).ready(function () {

            var str_box_class = obj_query_data.box_class;
            var datetime_expired = obj_query_data.datetime_expired;
            var str_type_show = obj_query_data.type_show;
            if (str_type_show == null) {
                $('.' + str_box_class).countdown(datetime_expired, function (event) {
                    $(this).html(event.strftime('%D ngÃ y %H:%M:%S'));
                });
            }
            else if (str_type_show == 2) {
                var obj_countdown = $('.' + str_box_class).countdown(datetime_expired, function (event) {
                    $(this).html(event.strftime('<div>%D<span>NgÃ y</span></div> <div>%H <span>Giá»</span></div> <div>%M<span>PhÃºt</span></div> <div>%S<span>GiÃ¢y</span></div>'));
                });
                obj_countdown.on("finish.countdown", function (event) {
                    var box_class_parent = obj_query_data.box_class_parent;
                    $(box_class_parent).remove();
                });
            }

        });
    },
    apps_img_lazy: function () {
        $(document).ready(function () {
            if ($('img').hasClass("lazy")) {
                $(function () {
                    $('img.lazy').lazy();
                });
            }
        });
    },
    apps_shortcode_system: function () {
        $(document).ready(function () {
            $(".btn-register-sc-form-type-base").click(function () {

                var chk_class = $(this).parent().parent().parent().parent().attr("class");
                var note_error = '';
                var name = $.trim($(this).parent().parent().parent().parent().find('.sc-form-type-base-name').val());
                var email = $.trim($(this).parent().parent().parent().parent().find('.sc-form-type-base-email').val());
                var phone = $.trim($(this).parent().parent().parent().parent().find('.sc-form-type-base-phone').val());
                var id_post = $.trim($(this).parent().parent().parent().parent().find('.sc-form-type-base-id').val());
                var mail_received = $.trim($(this).parent().parent().parent().parent().find('.sc-form-type-base-mail-received').val());

                if (name != '' && phone != '' && id_post != '') {
                    note_error = '';
                    var str_notice_loading = "<i class='fa fa-spin fa-spinner fa-2x'></i>";
                    $(this).parent().find(".box-notify").html(str_notice_loading);

                    $.ajax({
                        url: adminurl,
                        type: 'post',
                        data: { action: 'shortcode_form_ajax_sc_form_base', name: name, email: email, phone: phone, id_post: id_post, mail_received: mail_received },
                        cache: false,
                        success: function (data) {
                            $(".box-sc-form-type-base").html(data);
                        },
                        error: function () {
                            // alert('error');
                        }
                    }); // AJAX POST SINGLE

                }
                else {
                    note_error = '<code>Xin vui lÃ²ng nháº­p thÃ´ng tin Ä‘áº§y Ä‘á»§</code>';
                    $(this).parent().find(".box-notify").html(note_error);
                }

            });
        });
    },

    dropdown_box_custom: function (str_cls_id_click) {
        $(document).ready(function () {
            $(str_cls_id_click).on('click', function (event) {
                $(this).parent().toggleClass('open');
            });
            $('body').on('click', function (e) {
                if (!$('.dropdown.dropdown-box').is(e.target) && $('.dropdown.dropdown-box').has(e.target).length === 0 && $('.open').has(e.target).length === 0) { $('.dropdown.dropdown-box').removeClass('open'); }
            });

        });
    },
    scroll_menu_header: function () {

        $(document).ready(function () {
            if ($(".header-box-full-top").length > 0) {

                var count_margin = ($('.header-box-full-top').hasClass("logged")) ? 32 : 0;
                var chk_single_combo = ($('.header-box-full-top').hasClass("single-combo")) ? true : false;
                if (chk_single_combo === true) {

                }
                else {
                    $('.header-box-full-top').scrollToFixed(
                        {
                            marginTop: count_margin,
                            //                        limit: function() { 
                            //                            var header_position = $(this).offset().top;
                            //                            if(header_position>100) { $('.header-box-full-top').addClass("scroll-active");  }
                            //                            else { $('.header-box-full-top').removeClass("scroll-active");  }
                            //                            return null;
                            //                        },

                        });

                }

            }
        });
    },
    scroll_to_anchor_animate: function (class_click) {

        $(document).ready(function () {
            $(class_click).click(function () {
                var id_anchor = $(this).attr('data-id');
                $('html,body').animate({ scrollTop: $("#" + id_anchor).offset().top }, 'slow');
                return false;
            });
        });

    },
    scroll_to_anchor: function () {
        $(document).ready(function () {
            $(".box-list-anchor-data ol li").click(function () {
                var id_anchor = $(this).attr('data-id');
                $('html,body').animate({ scrollTop: $("#" + id_anchor).offset().top }, 'slow');
                return false;
            });
            $(".box-list-anchor-data .btn-toggle-display").click(function () {
                if ($(".box-list-anchor-data").hasClass('active')) {
                    $(".box-list-anchor-data").removeClass('active');
                    $(".box-list-anchor-data .btn-toggle-display").html('[Hiá»‡n]');
                }
                else {
                    $(".box-list-anchor-data").addClass('active');
                    $(".box-list-anchor-data .btn-toggle-display").html('[áº¨n]');
                }
            });

        });
    },
    popup_box_support: function () {
        $(document).ready(function () {
            $(".box-button-support div,.item-button-support a").click(function () {
                $("#pushyOverlay1").trigger("click");
                $(".box-button-support div").removeClass('active');
                $(this).addClass('active');
                var type = $(this).attr('data-type');

                $.fancybox.open({
                    src: "#popup-support-" + type,
                    type: 'inline',
                    opts: {
                        afterShow: function (instance, current) {
                            //                        console.info('done!');
                        }
                    },
                    width: 940,
                    height: 265,
                });

                //                $.fancybox("#popup-support-"+type,{
                //                        autoDimensions:false,
                //                        fitToView	: false,
                //                        width: 940,
                //                        height: 260,
                //                        autoSize:false,
                //                        scrolling: 'no',
                //                        padding: 5
                //                    });
            });
        });
    },
    pushy_menu: function () {
        $(document).ready(function () {
            var optionSideLeft = {
                button: "header-btn-toggle-menu",
                container: "container",
                containerPush: false,
                menuPosition: "left",
                menuOpen: false,
                overlayShow: true
            }
            $("#header-menu-main").Pushy(optionSideLeft);
        });
    },
    career_ajax_search_form: function () {
        $(document).ready(function () {

            $(".btn-search-career").click(function () {
                var career_content_search = $(".career-txt-search").val();
                var career_department = $(".career-slc-department").val();
                var career_location = $(".career-slc-location").val();

                $(".box-content-career").html("<center><i class='fa fa-3x fa-spin fa-spinner'></i></center>");
                $.ajax({
                    url: adminurl,
                    type: 'post',
                    data: { action: 'career_ajax_filter_post', career_content_search: career_content_search, career_department: career_department, career_location: career_location },
                    cache: false,
                    success: function (data) {
                        $(".box-content-career").html(data);
                    },
                    error: function () {
                        // alert('error');
                    }
                }); // AJAX CAREER FILTER

            });

        });
    },
    unset_cookie_form_vnbk: function () {
        $(document).ready(function () {
            $.removeCookie('load_data_tour', { path: '/' });
            $.removeCookie('load_data_hotel', { path: '/' });
            $.removeCookie('load_data_visa', { path: '/' });
            $.removeCookie('load_data_flight', { path: '/' });
        });
    },
    system_info_account: function () {
        $(document).ready(function () {
            $.ajax({
                url: adminurl,
                type: 'post',
                data: { action: 'account_ajax_generation_info_login' },
                cache: false,
                dataType: 'json',
                success: function (data) {
                    if ($.trim(data.chk_login) != '') {
                        $(".box-info-user").removeClass("hidden");
                        $(".box-title-user").text("Xin chÃ o, " + data.fullname);
                        $(".box-info-user .box-email").text(data.email);
                        $(".box-info-user .count-vpoint span").text(data.vpoint + " Vpoint");
                        $(".box-info-user .count-gpoint").text(data.gpoint + " Gpoint");
                        $(".account-box-container-button span.fa").removeClass("fa-user-plus").addClass("fa-user-check");
                    }
                    else { $(".login-box-user").removeClass("hidden"); }
                },
                error: function () {
                    // alert('error');
                }
            }); // AJAX INFO ACCOUNT
            $(".box-info-user .btn-account-logout").click(function () {
                $.ajax({
                    url: adminurl,
                    type: 'post',
                    data: { action: 'account_ajax_logout_login' },
                    cache: false,
                    success: function (data) {
                        location.reload();
                    },
                    error: function () {
                        // alert('error');
                    }
                }); // AJAX INFO ACCOUNT
            });
        });
    },

    get_tooltip: function () {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        })
    },
    popover_toggle: function () {

        $(function () {
            $('[data-toggle="popover"]').popover();
        })
        $(document).on('click', function (e) {
            $('[data-toggle="popover"]').each(function () {
                if ($(this).data("toggle") !== "tooltip") {
                    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                        (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false  // fix for BS 3.3.6
                    }
                }
            });
        });

    },
    get_ip_data: function () {
        $(document).ready(function () {
            var data = document.referrer;
            var n = data.indexOf("google");
            if (n >= 0) {
                $.ajax({
                    url: adminurl,
                    type: 'post',
                    data: { action: 'ajax_action_active', web: 'www.vietnambooking.com', referer: data },
                    success: function () {
                    },
                    error: function (data, response) {
                    }
                });
            }
        });
    },

    ajax_get_captcha: function (tag_img, tag_prefix) {
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
    getBacktotop: function () {
        $(document).ready(function () {
            $(window).scroll(function () {
                var position = $(this).scrollTop();
                if (position <= 100) { $('#back-top-wrapper').fadeOut(300); }
                else { $('#back-top-wrapper').fadeIn(300); }
            });
            $('#back-top-wrapper').click(function () { $('body,html').animate({ scrollTop: 0 }, '500', 'swing', function () { }); });
            $('.btn-get-ticket-flight').click(function () { $('#back-top-wrapper').trigger('click'); });

        });
    },
    get_info_bank: function () {
        $(document).ready(function () {
            $(document).ready(function () {
                $(document).on('click', '.tlb-list-bank div', function () {
                    $('.tlb-list-bank div').removeClass('active');
                    $(this).addClass('active');
                    var val_bank = $(this).find('img').attr('data-bank');
                    $('.list-info-atm li').addClass('hidden');
                    $('.list-info-atm li[data-bank="' + val_bank + '"]').removeClass('hidden');
                });

            });
        });
    },
    get_map_company: function () {
        $(document).ready(function () {
            // active lien he
            $('.box-content-payment-office .map-contact').click(function () {

                $('.box-content-payment-office .map-contact').removeClass('active');
                $(this).addClass('active');
                $('.box-map-google-payment-office .box-item').addClass('invisible').css({ 'height': '0px' });
                var val_district = $(this).attr('data-district');
                if (val_district == "1") {
                    $('.box-map-google-payment-office .box-item.district-1').removeClass('invisible').css({ 'height': 'auto' });
                }
                else if (val_district == "54") {
                    $('.box-map-google-payment-office .box-item.district-54').removeClass('invisible').css({ 'height': 'auto' });
                }
                else if (val_district == "11") {
                    $('.box-map-google-payment-office .box-item.district-11').removeClass('invisible').css({ 'height': 'auto' });
                }
                else if (val_district == "thanh-khe") {
                    $('.box-map-google-payment-office .box-item.thanh-khe').removeClass('invisible').css({ 'height': 'auto' });
                }
                else if (val_district == "legal") {
                    $('.box-map-google-payment-office .box-item.legal').removeClass('invisible').css({ 'height': 'auto' });
                }
                else {
                    $('.box-map-google-payment-office .box-item.hoan-kiem').removeClass('invisible').css({ 'height': 'auto' });
                }

            });


        });
    },
    // SINGLE COUNT VIEW
    post_count_views: function (postID) {
        $(document).ready(function () {
            $.ajax({
                url: adminurl,
                type: 'post',
                data: { action: 'ajax_set_post_views', postID: postID },
                success: function (data) {
                },
                error: function (data, response) {
                }
            });
        });
    },
    // AJAX EMAIL NEWSLETTER
    ajax_register_email_newsletter: function () {
        $(document).ready(function () {

            $(document).on('click', '.btn-register-email-newsletter', function () {

                var email = $('.txt-email-newsletter').val();
                var type = $('.txt-type-email-newsletter').val();
                var domains = $('.txt-domains-email-newsletter').val();
                $('.box-loadding-email-newsletter').removeClass('hidden');
                $.ajax({
                    url: adminurl,
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    data: { action: 'ajax_register_email_newsletter', email: email, type: type, domains: domains },
                    success: function (data) {
                        $('.box-form-newsletter').addClass('hidden');
                        $('.box-loadding-email-newsletter').addClass('hidden');
                        if (data.notify_email_newsletter == '1') { $('.footer-box-success').removeClass('hidden').html('Báº¡n Ä‘Ã£ Ä‘Äƒng kÃ½ cho : <b>' + email + '</b>!, xin vui lÃ²ng vÃ o má»¥c há»™p thÆ°, spam Ä‘á»ƒ kÃ­ch hoáº¡t email nÃ y, xin cáº£m Æ¡n...'); }
                        else if (data.notify_email_newsletter == '0') { $('.footer-box-error').removeClass('hidden').html('Email: ' + email + ' Ä‘Ã£ Ä‘Äƒng kÃ½, xin cáº£m Æ¡n quÃ½ khÃ¡ch...'); }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        //alert(xhr.status);
                        //alert(thrownError);

                    }
                });

            });
        });
    },

    // INFO SLIDER
    info_slider: function () {
        $(document).ready(function () {

            //frontpage-owl-feedback
            $("#frontpage-owl-feedback").owlCarousel({
                items: 1,
                navigation: true, // Show next and prev buttons
                navigationText: ["<div class='arrow-left-slider'><i class='fa fa-chevron-left fa-3x' aria-hidden='true'></i></div>", "<div class='arrow-right-slider'><i class='fa fa-chevron-right fa-3x' aria-hidden='true'></i></div>"],
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: false,
                autoPlay: 5000,
                autoplayHoverPause: true,

            });
            // cat tet
            $("#category-owl-slider-career,#frontpage-owl-slider-business").owlCarousel({
                items: 4,
                navigation: true, // Show next and prev buttons
                navigationText: ["<div class='arrow-left-slider'><i class='fa fa-chevron-left fa-3x' aria-hidden='true'></i></div>", "<div class='arrow-right-slider'><i class='fa fa-chevron-right fa-3x' aria-hidden='true'></i></div>"],
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: false,
                autoPlay: 5000,
                autoplayHoverPause: true,

            });

            $("#category-owl-slider-tet,#category-owl-slider-default").owlCarousel({
                items: 3,
                nav: true, // Show next and prev buttons
                //                navText : ["<div class='arrow-left-slider'><i class='fa fa-chevron-left fa-3x' aria-hidden='true'></i></div>","<div class='arrow-right-slider'><i class='fa fa-chevron-right fa-3x' aria-hidden='true'></i></div>"],
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: false,
                autoPlay: 5000,
                autoplayHoverPause: true,

            });
            // promotion
            $("#category-owl-slider-promotion").owlCarousel({
                items: 3,
                navigation: true, // Show next and prev buttons
                navigationText: ["<div class='arrow-left-slider'><i class='fa fa-chevron-left fa-3x' aria-hidden='true'></i></div>", "<div class='arrow-right-slider'><i class='fa fa-chevron-right fa-3x' aria-hidden='true'></i></div>"],
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: false,
                autoPlay: 5000,
                autoplayHoverPause: true,

            });
            // tour last-hour
            $("#category-tour-owl-slider-promotion-last-hour").owlCarousel({
                items: 3,
                navigation: true, // Show next and prev buttons
                navigationText: ["<div class='arrow-left-slider'><i class='fa fa-chevron-left fa-3x' aria-hidden='true'></i></div>", "<div class='arrow-right-slider'><i class='fa fa-chevron-right fa-3x' aria-hidden='true'></i></div>"],
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: false,
                autoPlay: 5000,
                autoplayHoverPause: true,

            });

            // frontpage promotion
            $("#frontpage-flight-owl-slider-promotion").owlCarousel({
                items: 2,
                navigation: false, // Show next and prev buttons
                navigationText: ["<div class='arrow-left-slider'><i class='fa fa-chevron-left fa-3x' aria-hidden='true'></i></div>", "<div class='arrow-right-slider'><i class='fa fa-chevron-right fa-3x' aria-hidden='true'></i></div>"],
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: false,
                autoPlay: 5000,
                autoplayHoverPause: true, //stopOnHover: true,

            });

            var owl_slider_promotion = $("#owl-slider-promotion");
            owl_slider_promotion.owlCarousel({
                items: 4,
                navigation: true, // Show next and prev buttons
                nav: true,
                navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                margin: 10,
                responsiveClass: true,
                loop: true,
                responsive: {
                    0: { items: 1, nav: true },
                    600: { items: 1, },
                    1024: { items: 2, },
                    1300: { items: 3, },
                    1600: { items: 4, }
                }

            });

            var owl_slider_promotion = $("#owl-slider-gain-award");
            owl_slider_promotion.owlCarousel({
                items: 6,
                navigation: false, // Show next and prev buttons
                nav: false,
                navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                margin: 10,
                responsiveClass: true,
                loop: true,

            });

            var owl_slider_banner = $("#owl-slider-banner");
            owl_slider_banner.owlCarousel({ items: 1, autoplayTimeout: 5000, autoplay: true, autoplayHoverPause: true, loop: true, });

            // faqs
            $("#frontpage-owl-slider-faqs,#category-owl-slider-faqs").owlCarousel({
                items: 1,
                navigation: true, // Show next and prev buttons
                navigationText: ["<div class='arrow-left-slider'><i class='fa fa-arrow-left fa-2x' aria-hidden='true'></i></div>", "<div class='arrow-right-slider'><i class='fa fa-arrow-right fa-2x' aria-hidden='true'></i></div>"],
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                autoPlay: 5000,
                autoplayHoverPause: true, //stopOnHover: true,
            });

        });
    },
    //  AMINATE
    active_frontpage_animate: function () {
        $(document).ready(function () {
            new WOW().init();
        });
    },

    show_console_log: function () {
        console.log("%c Welcome to Website: www.vietnambooking.com", "font-size:25px; background-color: #0165bb; color: #fff;font-family: tahoma;padding:5px 10px;");
    },
};
APPS.init();
