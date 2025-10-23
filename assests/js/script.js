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
// consultation
$(document).ready(function() {
    $('#consultationForm').on('submit', function(e) {
        e.preventDefault();
        const formData = collectFormData();
        if (validateForm(formData)) {
            showConfirmationModal(formData);
        }
    });
    $('#phone').on('input', function() {
        validatePhoneNumber($(this).val());
    });
    $('#email').on('blur', function() {
        validateEmail($(this).val());
    });
    $('.form-group input, .form-group select, .form-group textarea').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        $(this).parent().removeClass('focused');
    });
    $('#message').on('input', function() {
        const length = $(this).val().length;
        $('.char-count').remove();
        
        if (length > 0) {
            $(this).after(`<div class="char-count" style="color: #667eea; font-size: 0.8rem; text-align: left; margin-top: 5px;">${length} کاراکتر</div>`);
        }
    });
    if (isMobileDevice()) {
        $('input, select, textarea').attr('autocapitalize', 'none');
    }
});
function collectFormData() {
    const selectedSkills = [];
    $('input[type="checkbox"]:checked').each(function() {
        selectedSkills.push($(this).val());
    });
    return {
        fullName: $('#fullName').val().trim(),
        email: $('#email').val().trim(),
        phone: $('#phone').val().trim(),
        experience: $('#experience').val(),
        skills: selectedSkills,
        goal: $('#goal').val(),
        time: $('#time').val(),
        message: $('#message').val().trim()
    };
}
function validateForm(formData) {
    let isValid = true;
    $('.input-error').removeClass('input-error');
    $('.error-message').remove();
    if (formData.fullName.length < 3) {
        showError('fullName', 'نام باید حداقل ۳ حرف باشد');
        isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showError('email', 'ایمیل معتبر نیست');
        isValid = false;
    }
    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(formData.phone)) {
        showError('phone', 'شماره تلفن معتبر نیست (مثال: 09123456789)');
        isValid = false;
    }
    if (!formData.experience) {
        showError('experience', 'لطفا سطح تجربه خود را انتخاب کنید');
        isValid = false;
    }
    if (formData.skills.length === 0) {
        showError('skills', 'حداقل یک زمینه مورد علاقه را انتخاب کنید');
        isValid = false;
    }
    if (!formData.goal) {
        showError('goal', 'لطفا هدف اصلی خود را انتخاب کنید');
        isValid = false;
    }
    if (!formData.time) {
        showError('time', 'لطفا زمان قابل اختصاص را انتخاب کنید');
        isValid = false;
    }
    return isValid;
}
function validatePhoneNumber(phone) {
    $('.phone-error').remove();
    
    const phoneRegex = /^09[0-9]{0,9}$/;
    if (phone && !phoneRegex.test(phone)) {
        $('#phone').after('<div class="error-message phone-error">شماره تلفن باید با 09 شروع شود و 11 رقمی باشد</div>');
        return false;
    }
    return true;
}
function validateEmail(email) {
    $('.email-error').remove();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        $('#email').after('<div class="error-message email-error">ایمیل معتبر نیست</div>');
        return false;
    }
    return true;
}
function showError(fieldId, message) {
    $('#' + fieldId).addClass('input-error');
    if (fieldId === 'skills') {
        $('.skills-checkbox').after('<div class="error-message">' + message + '</div>');
    } else {
        $('#' + fieldId).after('<div class="error-message">' + message + '</div>');
    }
}
function showConfirmationModal(formData) {
    const modal = `
        <div class="confirmation-modal">
            <div class="modal-content">
                <h3>تأیید درخواست مشاوره</h3>
                <p>آیا از اطلاعات وارد شده اطمینان دارید؟</p>
                
                <div style="text-align: right; margin: 20px 0; background: #f8faff; padding: 1.5rem; border-radius: 12px; border-right: 4px solid #667eea;">
                    <p><strong>نام:</strong> ${formData.fullName}</p>
                    <p><strong>ایمیل:</strong> ${formData.email}</p>
                    <p><strong>تلفن:</strong> ${formData.phone}</p>
                    <p><strong>سطح تجربه:</strong> ${getExperienceText(formData.experience)}</p>
                    <p><strong>زمینه‌های علاقه:</strong> ${formData.skills.map(skill => getSkillText(skill)).join('، ')}</p>
                    <p><strong>هدف:</strong> ${getGoalText(formData.goal)}</p>
                    <p><strong>زمان هفتگی:</strong> ${getTimeText(formData.time)}</p>
                </div>
                <div class="modal-buttons">
                    <button class="modal-btn confirm-btn" id="finalConfirm">تأیید و ارسال</button>
                    <button class="modal-btn cancel-btn" id="cancelSubmit">ویرایش اطلاعات</button>
                </div>
            </div>
        </div>
    `;
    $('body').append(modal);
    $('#finalConfirm').on('click', function() {
        submitConsultation(formData);
        $('.confirmation-modal').remove();
    });
    $('#cancelSubmit').on('click', function() {
        $('.confirmation-modal').remove();
    });
    $('.confirmation-modal').on('click', function(e) {
        if (e.target === this) {
            $(this).remove();
        }
    });
    $(document).on('keyup', function(e) {
        if (e.key === 'Escape') {
            $('.confirmation-modal').remove();
        }
    });
}
function getExperienceText(exp) {
    const experiences = {
        'beginner': 'تازه کار',
        'intermediate': 'متوسط',
        'advanced': 'پیشرفته'
    };
    return experiences[exp] || exp;
}
function getSkillText(skill) {
    const skills = {
        'web': 'توسعه وب',
        'mobile': 'توسعه موبایل',
        'ai': 'هوش مصنوعی',
        'game': 'توسعه بازی',
        'data': 'علم داده',
        'security': 'امنیت سایبری'
    };
    return skills[skill] || skill;
}
function getGoalText(goal) {
    const goals = {
        'job': 'اشتغال در شرکت',
        'freelance': 'فریلنسینگ',
        'startup': 'استارتاپ شخصی',
        'hobby': 'علاقه شخصی',
        'academic': 'تحصیل آکادمیک'
    };
    return goals[goal] || goal;
}
function getTimeText(time) {
    const times = {
        '5': 'کمتر از ۵ ساعت',
        '10': '۵-۱۰ ساعت',
        '15': '۱۰-۱۵ ساعت',
        '20': 'بیش از ۱۵ ساعت'
    };
    return times[time] || time;
}
function submitConsultation(formData) {
    $('#submitBtn').prop('disabled', true).text('در حال ارسال...');
    $('#formMessages').html('<div class="loading">🔄 در حال ارسال درخواست مشاوره...</div>');
    setTimeout(() => {
        $('#formMessages').html(`
            <div class="success-message">
                <h4>✅ درخواست مشاوره با موفقیت ثبت شد!</h4>
                <p>همکاران ما طی ۲۴ ساعت آینده با شما تماس خواهند گرفت.</p>
                <p>ایمیل تأیید به آدرس <strong>${formData.email}</strong> ارسال شد.</p>
            </div>
        `);
        $('#consultationForm')[0].reset();
        setTimeout(() => {
            $('#submitBtn').prop('disabled', false).text('درخواست مشاوره رایگان');
        }, 3000);
    }, 2000);
}
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
$(document).on('visibilitychange', function() {
    if (!document.hidden) {
        const submitBtn = $('#submitBtn');
        if (submitBtn.prop('disabled')) {
            setTimeout(() => {
                submitBtn.prop('disabled', false).text('درخواست مشاوره رایگان');
                $('#formMessages').html('<div class="error-message">اتصال خود را بررسی کنید و دوباره تلاش کنید</div>');
            }, 1000);
        }
    }
});