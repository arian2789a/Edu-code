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