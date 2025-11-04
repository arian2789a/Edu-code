// contact us
$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        const name = $('#name').val().trim();
        if (name === '') {
            $('#nameError').show();
            isValid = false;
        } else {
            $('#nameError').hide();
        }
        const email = $('#email').val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailPattern.test(email)) {
            $('#emailError').show();
            isValid = false;
        } else {
            $('#emailError').hide();
        }
        const subject = $('#subject').val().trim();
        if (subject === '') {
            $('#subjectError').show();
            isValid = false;
        } else {
            $('#subjectError').hide();
        }
        const message = $('#message').val().trim();
        if (message === '') {
            $('#messageError').show();
            isValid = false;
        } else {
            $('#messageError').hide();
        }
        if (isValid) {
            $(this).hide();
            $('#successMessage').fadeIn();
            console.log({
                name: name,
                email: email,
                subject: subject,
                message: message
            });
        }
    });
    $(window).on('scroll', function() {
        $('.info-item').each(function() {
            const position = $(this).offset().top;
            const scrollPosition = $(window).scrollTop() + $(window).height() * 0.8;
            
            if (position < scrollPosition) {
                $(this).addClass('animated');
            }
        });
    });
    $(window).trigger('scroll');
    $('<style>')
        .text(`
            .info-item {
                opacity: 0;
                transform: translateX(50px);
                transition: all 0.6s ease;
            }
            .info-item.animated {
                opacity: 1;
                transform: translateX(0);
            }
        `)
        .appendTo('head');
});