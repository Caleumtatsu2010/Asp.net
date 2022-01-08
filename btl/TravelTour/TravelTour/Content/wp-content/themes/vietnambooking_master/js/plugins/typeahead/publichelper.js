var PublicColorPalette = function () {
    function e() {
        this.colorGrayDark = "#4D4D4D", this.colorIndigo = "#3F51B5", this.colorPrimary = "#00467E", this.colorSuccess = "#5CB85C", this.colorSuccessDark = "#477A00",
            this.colorInfo = "#26BED6", this.colorWarning = "#F79321", this.colorWarningDark = "#FDBF65", this.colorDanger = "#D9534F", this.colorLink = "#40A6F2"
    }
    return e
}(),

    PublicHelper = function () {
        function e() {
            this.dateFormatter = "DD-MM-YYYY", this.minDate = "01-01-2015"
        }
        return e.prototype.getScreenSize = function () { return this.detectScreenSize($(window).width()) },
            e.prototype.randomNumber = function (e, t) { return Math.floor(Math.random() * (t - e + 1) + e) },
            e.prototype.detectScreenSize = function (e) { var t = "lg"; return 768 > e ? t = "xs" : e >= 1600 ? t = "slg" : e >= 1200 ? t = "lg" : e >= 992 ? t = "md" : e >= 768 && (t = "sm"), t },
            e.prototype.remove_unicode = function (e) {
                return e = e.toLowerCase(), e = e.replace(/Ã |Ã¡|áº¡|áº£|Ã£|Ã¢|áº§|áº¥|áº­|áº©|áº«|Äƒ|áº±|áº¯|áº·|áº³|áºµ/g, "a"),
                    e = e.replace(/Ã¨|Ã©|áº¹|áº»|áº½|Ãª|á»|áº¿|á»‡|á»ƒ|á»…/g, "e"),
                    e = e.replace(/Ã¬|Ã­|á»‹|á»‰|Ä©/g, "i"),
                    e = e.replace(/Ã²|Ã³|á»|á»|Ãµ|Ã´|á»“|á»‘|á»™|á»•|á»—|Æ¡|á»|á»›|á»£|á»Ÿ|á»¡/g, "o"),
                    e = e.replace(/Ã¹|Ãº|á»¥|á»§|Å©|Æ°|á»«|á»©|á»±|á»­|á»¯/g, "u"),
                    e = e.replace(/á»³|Ã½|á»µ|á»·|á»¹/g, "y"),
                    e = e.replace(/Ä‘/g, "d"),
                    e = e.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-"),
                    e = e.replace(/-+-/g, "-"),
                    e = e.replace(/^\-+|\-+$/g, "")
            },
            e.prototype.disableForm = function () {
                $("input.v-input-date").removeAttr("readonly"), $("form").prop("disabled", !0),
                $("input").prop("disabled", !0), $("button").prop("disabled", !0),
                $("select").prop("disabled", !0)
            },
            e.prototype.enableForm = function () {
                $("input.v-input-date").prop("readonly", !0),
                $("form").removeAttr("disabled"), $("input").removeAttr("disabled"), $("button").removeAttr("disabled"),
                $("select").removeAttr("disabled")
            },
            e.prototype.isEmpty = function (e) { return !e || 0 === e.length },
            e.prototype.isBlank = function (e) { return !e || /^\s*$/.test(e) },
            e.prototype.stripSpaces = function (e) { return this.isBlank(e) ? "" : $.trim(e.replace(/ /g, "")) },
            e.prototype.removeExtraSpaces = function (e) { return e = e.replace(/^\s+|\s+$/g, "") },
            e.prototype.getFormData = function (form) {
                var datas = form.serializeArray(); var data = {};
                for (s in datas) { data[datas[s]['name']] = datas[s]['value'] } return data;
            }, e
    }(),
    jsHelper = new PublicHelper,
    jsColor = new PublicColorPalette;