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