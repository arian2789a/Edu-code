// header
$(window).scroll(function() {
    if ($(this).scrollTop() > 50){
        $('header').css('top','0');
    } else {
        $('header').css('top','0');
    }
});
// nav-hero
$(document).ready(function () {
    $("#header nav .btn.btn-nav").on("click", function () {
        $("#header nav ul").slideToggle()
    })

    function checkWidth() {
        if ($(window).width() < 992) {
            $("#header nav ul").css("display", "none")
        } else {
            $("#header nav ul").css("display", "flex")
        }
    }

    checkWidth()

    $(window).on("resize", function () {
        checkWidth()
    })
})

