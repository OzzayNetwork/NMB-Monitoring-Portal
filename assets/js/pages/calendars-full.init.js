! function (g) {
    "use strict";

    function e() {}
    e.prototype.init = function () {
        var l = g("#event-modal"),
            t = g("#modal-title"),
            a = g("#form-event"),
            i = null,
            r = null,
            s = document.getElementsByClassName("needs-validation"),
            i = null,
            r = null,
            e = new Date,
            n = e.getDate(),
            d = e.getMonth(),
            o = e.getFullYear();
        new FullCalendarInteraction.Draggable(document.getElementById("external-events"), {
            itemSelector: ".external-event",
            eventData: function (e) {
                return {
                    title: e.innerText,
                    className: g(e).data("class")
                }
            }
        });
        var c = [{
            title: "REVENUE: KES 74,320,540",
            start: new Date(o, d, 3),
            className: "bg-success fw-bold"
        }, {
            title: "PATIENTS: 120",
            start: new Date(o, d, 3),
            className: "bg-warning fw-bold"
        }, 
        {
            title: "UNPAID INVOICES: 120",
            start: new Date(o, d, 3),
            className: "bg-dark fw-bold fw-uppercase"
        }, 
        {
            title: "REVENUE: KES 45,890,230",
            start: new Date(o, d, 4),
            className: "bg-success fw-bold"
        }, {
            title: "PATIENTS: 65",
            start: new Date(o, d, 4),
            className: "bg-warning fw-bold"
        }, 
        {
            title: "UNPAID INVOICES: 80",
            start: new Date(o, d, 4),
            className: "bg-dark fw-bold fw-uppercase"
        }, 
        {
            title: "REVENUE: KES 89,670,910",
            start: new Date(o, d, 5),
            className: "bg-success fw-bold"
        }, {
            title: "PATIENTS: 142",
            start: new Date(o, d, 5),
            className: "bg-warning fw-bold"
        },
        {
            title: "UNPAID INVOICES: 135",
            start: new Date(o, d, 5),
            className: "bg-dark fw-bold fw-uppercase"
        },
        {
            title: "REVENUE: KES 32,480,000",
            start: new Date(o, d, 6),
            className: "bg-success fw-bold"
        }, {
            title: "PATIENTS: 78",
            start: new Date(o, d, 6),
            className: "bg-warning fw-bold"
        },
        {
            title: "UNPAID INVOICES: 75",
            start: new Date(o, d, 6),
            className: "bg-dark fw-bold fw-uppercase"
        },
        {
            title: "REVENUE: KES 66,230,120",
            start: new Date(o, d, 7),
            className: "bg-success fw-bold"
        }, {
            title: "PATIENTS: 95",
            start: new Date(o, d, 7),
            className: "bg-warning fw-bold"
        },
        {
            title: "UNPAID INVOICES: 90",
            start: new Date(o, d, 7),
            className: "bg-dark fw-bold fw-uppercase"
        },
        {
            title: "REVENUE: KES 52,110,700",
            start: new Date(o, d, 8),
            className: "bg-success fw-bold"
        }, {
            title: "PATIENTS: 88",
            start: new Date(o, d, 8),
            className: "bg-warning fw-bold"
        },
        {
            title: "UNPAID INVOICES: 85",
            start: new Date(o, d, 8),
            className: "bg-dark fw-bold fw-uppercase"
        }],        
            v = (document.getElementById("external-events"), document.getElementById("calendar"));

        function u(e) {
            l.modal("show"), a.removeClass("was-validated"), a[0].reset(), g("#event-title").val(), g("#event-category").val(), t.text("Add Event"), r = e
        }
        var m = new FullCalendar.Calendar(v, {
            plugins: ["bootstrap", "interaction", "dayGrid", "timeGrid"],
            editable: !0,
            droppable: !0,
            selectable: !0,
            defaultView: "dayGridMonth",
            themeSystem: "bootstrap",
            header: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
            },
            eventClick: function (e) {
                l.modal("show"), a[0].reset(), i = e.event, g("#event-title").val(i.title), g("#event-category").val(i.classNames[0]), r = null, t.text("DETAILS FOR 12 JAN 2024"), r = null
            },
            dateClick: function (e) {
                // u(e)
            },
            events: c
        });
        m.render(), g(a).on("submit", function (e) {
            e.preventDefault();
            g("#form-event :input");
            var t, a = g("#event-title").val(),
                n = g("#event-category").val();
            !1 === s[0].checkValidity() ? (event.preventDefault(), event.stopPropagation(), s[0].classList.add("was-validated")) : (i ? (i.setProp("title", a), i.setProp("classNames", [n])) : (t = {
                title: a,
                start: r.date,
                allDay: r.allDay,
                className: n
            }, m.addEvent(t)), l.modal("hide"))
        }), g("#btn-delete-event").on("click", function (e) {
            i && (i.remove(), i = null, l.modal("hide"))
        }), g("#btn-new-event").on("click", function (e) {
            u({
                date: new Date,
                allDay: !0
            })
        })
    }, g.CalendarPage = new e, g.CalendarPage.Constructor = e
}(window.jQuery),
function () {
    "use strict";
    window.jQuery.CalendarPage.init()
}();