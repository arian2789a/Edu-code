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
// log in
$(document).ready(function() {
    checkViewport();
    $(window).on('resize', function() {
        checkViewport();
    });
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        $('#loginMessages').empty();
        if (validateLoginForm(email, password)) {
            loginUser(email, password);
        }
    });
    $('#forgotPassword').on('click', function(e) {
        e.preventDefault();
        showForgotPasswordModal();
    });
    $('.input-group input').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass('focused');
        }
    });
    if (isMobileDevice()) {
        $('input').attr('autocapitalize', 'none');
        $('input[type="email"]').attr('inputmode', 'email');
        $('input[type="password"]').attr('autocomplete', 'current-password');
    }
});
function checkViewport() {
    const width = $(window).width();
    const height = $(window).height();
    if (width <= 480) {
        $('body').addClass('mobile-view').removeClass('tablet-view desktop-view');
    } else if (width <= 768) {
        $('body').addClass('tablet-view').removeClass('mobile-view desktop-view');
    } else {
        $('body').addClass('desktop-view').removeClass('mobile-view tablet-view');
    }
    if (height < 500 && width > height) {
        $('body').addClass('landscape-mode');
    } else {
        $('body').removeClass('landscape-mode');
    }
}
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function validateLoginForm(email, password) {
    let isValid = true;
    $('.input-error').removeClass('input-error');
    $('.error-message').remove();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        $('#loginEmail').addClass('input-error')
            .after('<div class="error-message">ایمیل معتبر نیست</div>');
        isValid = false;
    }
    if (password.length < 6) {
        $('#loginPassword').addClass('input-error')
            .after('<div class="error-message">رمز عبور باید حداقل ۶ حرف باشد</div>');
        isValid = false;
    }
    return isValid;
}
function loginUser(email, password) {
    $('#loginMessages').html('<div class="loading">🔄 در حال ورود...</div>');
    const submitBtn = $('.login-btn');
    submitBtn.prop('disabled', true).text('در حال ورود...');
    setTimeout(() => {
        if (email === "test@example.com" && password === "123456") {
            $('#loginMessages').html('<div class="success-message">✅ ورود موفق! در حال انتقال...</div>');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            $('#loginMessages').html('<div class="error-message">❌ ایمیل یا رمز عبور اشتباه است</div>');
            submitBtn.prop('disabled', false).text('ورود');
        }
    }, 1500);
}
function showForgotPasswordModal() {
    const isMobile = $(window).width() <= 480;
    const modalContent = `
        <div class="modal-overlay">
            <div class="modal" style="${isMobile ? 'max-width: 95%;' : ''}">
                <h3>بازیابی رمز عبور</h3>
                <input type="email" placeholder="ایمیل خود را وارد کنید" id="recoveryEmail">
                <button id="sendRecovery">ارسال لینک بازیابی</button>
                <button class="close-modal">بستن</button>
            </div>
        </div>
    `;
    $('body').append(modalContent);
    $('.close-modal').on('click', function() {
        $('.modal-overlay').remove();
    });
    $('#sendRecovery').on('click', function() {
        const email = $('#recoveryEmail').val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && emailRegex.test(email)) {
            alert('لینک بازیابی به ایمیل ' + email + ' ارسال شد');
            $('.modal-overlay').remove();
        } else {
            alert('لطفا یک ایمیل معتبر وارد کنید');
        }
    });
    $('.modal-overlay').on('click', function(e) {
        if (e.target === this) {
            $(this).remove();
        }
    });
    $(document).on('keyup', function(e) {
        if (e.key === 'Escape') {
            $('.modal-overlay').remove();
        }
    });
}
// sign up
$(document).ready(function() {
    checkViewport();
    $(window).on('resize', function() {
        checkViewport();
    });
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        
        const userData = {
            fullname: $('#fullname').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            confirmPassword: $('#confirmPassword').val(),
            programmingLevel: $('#programmingLevel').val(),
            terms: $('#terms').is(':checked')
        };
        $('#registerMessages').empty();
        
        if (validateRegisterForm(userData)) {
            registerUser(userData);
        }
    });
    $('#password, #confirmPassword').on('keyup', function() {
        validatePasswordMatch();
    });
    $('.input-group input, .level-select').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass('focused');
        }
    });
    $('#password').on('keyup', function() {
        showPasswordStrength($(this).val());
    });
    if (isMobileDevice()) {
        $('input').attr('autocapitalize', 'none');
        $('input[type="email"]').attr('inputmode', 'email');
        $('input[type="password"]').attr('autocomplete', 'new-password');
        $('input[type="text"]').attr('autocomplete', 'name');
    }
    $('input, select').on('focus', function() {
        if (isMobileDevice()) {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    });
});
function checkViewport() {
    const width = $(window).width();
    const height = $(window).height();
    if (width <= 480) {
        $('body').addClass('mobile-view').removeClass('tablet-view desktop-view');
    } else if (width <= 768) {
        $('body').addClass('tablet-view').removeClass('mobile-view desktop-view');
    } else {
        $('body').addClass('desktop-view').removeClass('mobile-view tablet-view');
    }
    if (height < 500 && width > height) {
        $('body').addClass('landscape-mode');
    } else {
        $('body').removeClass('landscape-mode');
    }
}
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function validateRegisterForm(userData) {
    let isValid = true;
    $('.input-error').removeClass('input-error');
    $('.error-message').remove();
    if (userData.fullname.length < 3) {
        showError('fullname', 'نام باید حداقل ۳ حرف باشد');
        isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        showError('email', 'ایمیل معتبر نیست');
        isValid = false;
    }
    if (userData.password.length < 6) {
        showError('password', 'رمز عبور باید حداقل ۶ حرف باشد');
        isValid = false;
    }
    if (userData.password !== userData.confirmPassword) {
        showError('confirmPassword', 'رمزهای عبور مطابقت ندارند');
        isValid = false;
    }
    if (!userData.programmingLevel) {
        showError('programmingLevel', 'لطفا سطح خود را انتخاب کنید');
        isValid = false;
    }
    if (!userData.terms) {
        $('#terms').addClass('input-error');
        $('#registerMessages').html('<div class="error-message">لطفا قوانین و شرایط را بپذیرید</div>');
        isValid = false;
    } else {
        $('#terms').removeClass('input-error');
    }
    return isValid;
}
function showError(fieldId, message) {
    $('#' + fieldId).addClass('input-error');
    $('#' + fieldId).after('<div class="error-message">' + message + '</div>');
}
function validatePasswordMatch() {
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    $('.password-match-message').remove();
    if (confirmPassword && password !== confirmPassword) {
        $('#confirmPassword').addClass('input-error');
        $('#confirmPassword').after('<div class="error-message password-match-message">❌ رمزهای عبور مطابقت ندارند</div>');
    } else if (confirmPassword && password === confirmPassword) {
        $('#confirmPassword').removeClass('input-error');
        $('#confirmPassword').after('<div class="success-message password-match-message">✅ رمزهای عبور مطابقت دارند</div>');
    }
}
function showPasswordStrength(password) {
    $('.password-strength').remove();
    let strength = 'ضعیف';
    let strengthClass = 'weak';
    let emoji = '🔴';
    if (password.length >= 8) {
        strength = 'متوسط';
        strengthClass = 'medium';
        emoji = '🟡';
    }
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
        strength = 'قوی';
        strengthClass = 'strong';
        emoji = '🟢';
    }
    if (password) {
        $('#password').after(`<div class="password-strength ${strengthClass}">${emoji} قدرت رمز: ${strength}</div>`);
    }
}
function registerUser(userData) {
    $('#registerMessages').html('<div class="loading">🔄 در حال ثبت‌نام...</div>');
    const submitBtn = $('.register-btn');
    submitBtn.prop('disabled', true).text('در حال ثبت‌نام...');
    setTimeout(() => {
        $('#registerMessages').html(`
            <div class="success-message">
                <strong>✅ ثبت‌نام موفق!</strong><br>
                به صفحه ورود منتقل می‌شوید...
            </div>
        `);
        setTimeout(() => {
            window.location.href = 'login.html?registered=true';
        }, 3000);
    }, 2000);
}
$(document).on('visibilitychange', function() {
    if (!document.hidden) {
        const submitBtn = $('.register-btn');
        if (submitBtn.prop('disabled')) {
            setTimeout(() => {
                submitBtn.prop('disabled', false).text('ثبت‌نام');
                $('#registerMessages').html('<div class="error-message">اتصال خود را بررسی کنید</div>');
            }, 1000);
        }
    }
});