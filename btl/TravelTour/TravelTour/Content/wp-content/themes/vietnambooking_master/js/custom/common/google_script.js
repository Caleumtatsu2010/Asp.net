// analytics
window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments) }; gtag('js', new Date()); gtag('config', 'UA-106895544-1');
//Google Tag Manager
(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'dataLayer', 'GTM-523HDNP');
//Google Ads: 748195809
window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'AW-748195809');
// facebook
//window.fbAsyncInit = function() { FB.init({ appId      : '653126594761547', xfbml      : true, version    : 'v2.4' }); FB.AppEvents.logPageView(); }; (function(d, s, id){ var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/sdk.js"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));
// search google
var cse_renderSearchElement = function () { google.search.cse.element.render({ div: "cse_default", tag: 'search' }); google.search.cse.element.render({ div: "test", attributes: { disableWebSearch: true, enableHistory: true }, tag: 'search' }); };
var cse_myCallback = function () {
    if (document.readyState == 'complete') { cse_renderSearchElement(); }
    else { google.setOnLoadCallback(cse_renderSearchElement, true); }
};
window.__gcse = { parsetags: 'explicit', callback: cse_myCallback };
var cse_loadElements = function () {
    var cx = '007901955284766212267:lkrk2ani294';
    var gcse = document.createElement('script'); gcse.type = 'text/javascript';
    gcse.async = true; gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);

    $(".swal2-actions").css({ 'z-index': 0 });
    setInterval(function () { $(".gsc-adBlock").css({ 'display': 'none' }); }, 100);

}
function cse_popup_form_search() {
    Swal.fire({
        type: '',
        html: "<div style='text-align:left;' id='cse_default'></div>"
    });
    cse_loadElements();
}
