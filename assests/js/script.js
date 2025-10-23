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
});
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
    $('#loginMessages').html('<div class="loading">در حال ورود...</div>');
    $.ajax({
        url: 'login.php',
        type: 'POST',
        data: {
            email: email,
            password: password
        },
        success: function(response) {
            if (response.success) {
                $('#loginMessages').html('<div class="success-message">ورود موفق! در حال انتقال...</div>');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                $('#loginMessages').html('<div class="error-message">' + response.message + '</div>');
            }
        },
        error: function() {
            $('#loginMessages').html('<div class="error-message">خطا در ارتباط با سرور</div>');
        }
    });
}
function showForgotPasswordModal() {
    const modal = `
        <div class="modal-overlay">
            <div class="modal">
                <h3>بازیابی رمز عبور</h3>
                <input type="email" placeholder="ایمیل خود را وارد کنید" id="recoveryEmail">
                <button id="sendRecovery">ارسال لینک بازیابی</button>
                <button class="close-modal">بستن</button>
            </div>
        </div>
    `;
    $('body').append(modal);
    $('.close-modal').on('click', function() {
        $('.modal-overlay').remove();
    });
    $('#sendRecovery').on('click', function() {
        const email = $('#recoveryEmail').val();
        if (email) {
            alert('لینک بازیابی به ایمیل ' + email + ' ارسال شد');
            $('.modal-overlay').remove();
        }
    });
}
// sign up
$(document).ready(function() {
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
});
function validateRegisterForm(userData) {
    let isValid = true;
    $('.input-error').removeClass('input-error');
    $('.error-message').remove();
    if (userData.fullname.length < 3) {
        $('#fullname').addClass('input-error')
            .after('<div class="error-message">نام باید حداقل ۳ حرف باشد</div>');
        isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        $('#email').addClass('input-error')
            .after('<div class="error-message">ایمیل معتبر نیست</div>');
        isValid = false;
    }
    if (userData.password.length < 6) {
        $('#password').addClass('input-error')
            .after('<div class="error-message">رمز عبور باید حداقل ۶ حرف باشد</div>');
        isValid = false;
    }
    if (userData.password !== userData.confirmPassword) {
        $('#confirmPassword').addClass('input-error')
            .after('<div class="error-message">رمزهای عبور مطابقت ندارند</div>');
        isValid = false;
    }
    if (!userData.programmingLevel) {
        $('#programmingLevel').addClass('input-error')
            .after('<div class="error-message">لطفا سطح خود را انتخاب کنید</div>');
        isValid = false;
    }
    if (!userData.terms) {
        $('#terms').addClass('input-error');
        alert('لطفا قوانین و شرایط را بپذیرید');
        isValid = false;
    }
    return isValid;
}
function validatePasswordMatch() {
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    if (confirmPassword && password !== confirmPassword) {
        $('#confirmPassword').addClass('input-error');
    } else {
        $('#confirmPassword').removeClass('input-error');
    }
}
function showPasswordStrength(password) {
    $('.password-strength').remove();
    let strength = 'ضعیف';
    let strengthClass = 'weak';
    if (password.length >= 8) {
        strength = 'متوسط';
        strengthClass = 'medium';
    }
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
        strength = 'قوی';
        strengthClass = 'strong';
    }
    if (password) {
        $('#password').after(`<div class="password-strength ${strengthClass}">قدرت رمز: ${strength}</div>`);
    }
}
function registerUser(userData) {
    $('#registerMessages').html('<div class="loading">در حال ثبت‌نام...</div>');
    $.ajax({
        url: 'register.php',
        type: 'POST',
        data: {
            fullname: userData.fullname,
            email: userData.email,
            password: userData.password,
            programming_level: userData.programmingLevel
        },
        success: function(response) {
            if (response.success) {
                $('#registerMessages').html('<div class="success-message">ثبت‌نام موفق! ایمیل تایید ارسال شد</div>');
                setTimeout(() => {
                    window.location.href = 'login.html?registered=true';
                }, 3000);
            } else {
                $('#registerMessages').html('<div class="error-message">' + response.message + '</div>');
            }
        },
        error: function() {
            $('#registerMessages').html('<div class="error-message">خطا در ارتباط با سرور</div>');
        }
    });
}