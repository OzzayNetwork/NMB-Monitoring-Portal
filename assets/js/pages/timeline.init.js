$("#timeline-carousel").owlCarousel({
    items: 1,
    loop: !1,
    margin: 0,
    nav: !0,
    navText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"],
    dots: !1,
    responsive: {
        576: {
            items: 2
        },
        768: {
            items: 4
        }
    },
    startPosition: -1 // display the last item first
});