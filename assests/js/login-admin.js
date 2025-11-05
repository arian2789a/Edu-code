$(document).ready(function() {
    // مدیریت نمایش/مخفی کردن رمز عبور
    $('#passwordToggle').on('click', function() {
        const passwordInput = $('#password');
        const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
        passwordInput.attr('type', type);
        $(this).text(type === 'password' ? '👁️' : '🙈');
    });

    $('#adminLoginForm').on('submit', function(e) {
        e.preventDefault();
        
        if (validateLoginForm()) {
            simulateLogin();
        }
    });

    function validateLoginForm() {
        let isValid = true;
        const username = $('#username').val().trim();
        if (username === '') {
            showError('usernameError', 'لطفاً نام کاربری را وارد کنید');
            $('#username').addClass('input-error');
            isValid = false;
        } else if (username.length < 3) {
            showError('usernameError', 'نام کاربری باید حداقل ۳ کاراکتر باشد');
            $('#username').addClass('input-error');
            isValid = false;
        } else {
            hideError('usernameError');
            $('#username').removeClass('input-error');
        }
        
        const password = $('#password').val();
        if (password === '') {
            showError('passwordError', 'لطفاً رمز عبور را وارد کنید');
            $('#password').addClass('input-error');
            isValid = false;
        } else if (password.length < 6) {
            showError('passwordError', 'رمز عبور باید حداقل ۶ کاراکتر باشد');
            $('#password').addClass('input-error');
            isValid = false;
        } else {
            hideError('passwordError');
            $('#password').removeClass('input-error');
        }
        
        return isValid;
    }

    function simulateLogin() {
        const loginBtn = $('#loginBtn');
        const btnText = $('.btn-text');
        const btnLoading = $('.btn-loading');
        
        loginBtn.prop('disabled', true);
        btnText.hide();
        btnLoading.show();
        
        setTimeout(function() {
            const username = $('#username').val().trim();
            const password = $('#password').val();
            
            if (username === 'admin' && password === 'admin123') {
                showSuccess('ورود موفق! در حال انتقال به پنل مدیریت...');
                
                setTimeout(function() {
                    window.location.href = 'admin-dashboard.html';
                }, 2000);
            } else {
                showError('passwordError', 'نام کاربری یا رمز عبور اشتباه است');
                $('#username').addClass('input-error');
                $('#password').addClass('input-error');
                
                loginBtn.prop('disabled', false);
                btnText.show();
                btnLoading.hide();
            }
        }, 2000);
    }

    function showError(elementId, message) {
        $('#' + elementId).text(message).show();
    }

    function hideError(elementId) {
        $('#' + elementId).hide();
    }

    function showSuccess(message) {
        $('.success-message').remove();
        
        const successMsg = $('<div class="success-message"></div>').text(message);
        $('#adminLoginForm').append(successMsg);
        successMsg.show();
    }

    $('.forgot-password').on('click', function(e) {
        e.preventDefault();
        $('#forgotPasswordModal').fadeIn();
        $('body').css('overflow', 'hidden');
    });

    $('.close-modal').on('click', function() {
        $('#forgotPasswordModal').fadeOut();
        $('body').css('overflow', 'auto');
    });

    $(window).on('click', function(e) {
        if ($(e.target).is('#forgotPasswordModal')) {
            $('#forgotPasswordModal').fadeOut();
            $('body').css('overflow', 'auto');
        }
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('#forgotPasswordModal').fadeOut();
            $('body').css('overflow', 'auto');
        }
    });

    $('#forgotPasswordForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#recoveryEmail').val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '' || !emailPattern.test(email)) {
            alert('لطفاً یک ایمیل معتبر وارد کنید');
            return;
        }
        
        const recoveryBtn = $('.recovery-btn');
        const originalText = recoveryBtn.text();
        
        recoveryBtn.prop('disabled', true).text('در حال ارسال...');
        
        setTimeout(function() {
            alert(`لینک بازیابی رمز عبور به ${email} ارسال شد`);
            $('#forgotPasswordModal').fadeOut();
            $('body').css('overflow', 'auto');
            $('#forgotPasswordForm')[0].reset();
            recoveryBtn.prop('disabled', false).text(originalText);
        }, 1500);
    });

    $('#username, #password').on('input', function() {
        const field = $(this);
        field.removeClass('input-error');
        
        if (field.attr('id') === 'username') {
            hideError('usernameError');
        } else if (field.attr('id') === 'password') {
            hideError('passwordError');
        }
    });

    function addAnimations() {
        $('.login-card').addClass('animated');
        
    
        const usernamePlaceholders = [
            "نام کاربری خود را وارد کنید",
            "مثال: admin",
            "admin"
        ];
        
        let currentIndex = 0;
        setInterval(function() {
            $('#username').attr('placeholder', usernamePlaceholders[currentIndex]);
            currentIndex = (currentIndex + 1) % usernamePlaceholders.length;
        }, 3000);
    }
    addAnimations();

    $('<style>')
        .text(`
            .login-card.animated {
                animation: slideUp 0.8s ease-out;
            }
            
            .form-group input:valid {
                border-color: #38a169;
            }
            
            .form-group input:valid + .input-icon {
                color: #38a169;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .login-btn:focus {
                animation: pulse 0.5s ease;
            }
            
            /* افکت برای المان‌های focus */
            .form-group input:focus {
                animation: inputFocus 0.3s ease;
            }
            
            @keyframes inputFocus {
                0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
                100% { box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
            }
        `)
        .appendTo('head');
});

function quickLogin() {
    $('#username').val('admin');
    $('#password').val('admin123');
    $('#adminLoginForm').submit();
}

console.log('🎯 اطلاعات تست برای توسعه:');
console.log('👤 نام کاربری: admin');
console.log('🔐 رمز عبور: admin123');
console.log('💡 نکته: برای لاگین سریع، quickLogin() را در کنسول اجرا کنید');