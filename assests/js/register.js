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