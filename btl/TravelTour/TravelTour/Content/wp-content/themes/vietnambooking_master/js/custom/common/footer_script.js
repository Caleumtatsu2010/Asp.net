//Tawk.to
// VISA
var url_visa = "https://embed.tawk.to/5f179b95a45e787d128be25a/default";
// TOUR
var url_tour = "https://embed.tawk.to/5f179b2ca45e787d128be256/default";
// HOTEL
var url_hotel = "https://embed.tawk.to/5f179bbd7258dc118beeb0a1/default";
// FLIGHT
var url_flight = "https://embed.tawk.to/5f179b6f7258dc118beeb0a0/default";
// DEFAULT
var url_default = "https://embed.tawk.to/5c7dc9d8a726ff2eea5a9614/default";

var url_using = url_default;
if (link_current.indexOf("/ve-may-bay") >= 0) { url_using = url_flight; }
else if (link_current.indexOf("/du-lich") >= 0) { url_using = url_tour; }
else if (link_current.indexOf("/khach-san") >= 0) { url_using = url_hotel; }
else if (link_current.indexOf("/visa") >= 0) { url_using = url_visa; }
else if (link_current.indexOf("/combo") >= 0) { url_using = url_hotel; }
else { url_using = url_default; }
url_using = url_default;
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date(); (function () { var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0]; s1.async = true; s1.src = url_using; s1.charset = 'UTF-8'; s1.setAttribute('crossorigin', '*'); s0.parentNode.insertBefore(s1, s0); })();

// onesignal.com
window.OneSignal = window.OneSignal || []; OneSignal.push(function () { OneSignal.init({ appId: "de9b8d06-7215-4ccb-a77e-e487a51534f7", notifyButton: { enable: false, }, }); });
