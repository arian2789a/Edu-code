// services
$(document).ready(function() {

    const serviceDetails = {
        web: {
            title: "توسعه وب اپلیکیشن",
            description: "ما وب اپلیکیشن‌های مدرن و scalable طراحی و توسعه می‌دهیم که نیازهای کسب و کار شما را به طور کامل پوشش می‌دهند.",
            features: [
                "توسعه Frontend با React, Vue, Angular",
                "توسعه Backend با Node.js, Django, Laravel",
                "پایگاه داده‌های MongoDB, PostgreSQL, MySQL",
                "API Development و Microservices",
                "پیاده‌سازی Real-time Features",
                "بهینه‌سازی SEO و Performance"
            ],
            technologies: ["React", "Vue.js", "Node.js", "Python", "MongoDB", "PostgreSQL"],
            price: "شروع از ۵,۰۰۰,۰۰۰ تومان",
            duration: "۴-۸ هفته",
            delivery: "کد منبع + داکیومنت + پشتیبانی ۶ ماهه"
        },
        mobile: {
            title: "توسعه اپلیکیشن موبایل",
            description: "اپلیکیشن‌های native و cross-platform با بهترین performance و UX برای پلتفرم‌های iOS و Android.",
            features: [
                "توسعه Cross-platform با React Native/Flutter",
                "توسعه Native با Swift و Kotlin",
                "پیاده‌سازی Push Notifications",
                "یکپارچه‌سازی با Web Services",
                "App Store Optimization",
                "تست و دیباگ کامل"
            ],
            technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
            price: "شروع از ۱۰,۰۰۰,۰۰۰ تومان",
            duration: "۶-۱۰ هفته",
            delivery: "فایل نصب + کد منبع + پشتیبانی ۱ ساله"
        },
        ai: {
            title: "هوش مصنوعی و یادگیری ماشین",
            description: "پیاده‌سازی راهکارهای هوش مصنوعی و مدل‌های پیش‌بین برای تحلیل داده و اتوماسیون فرآیندها.",
            features: [
                "تحلیل داده و پیش‌بینی",
                "پردازش زبان طبیعی (NLP)",
                "بینایی کامپیوتر و تشخیص تصویر",
                "سیستم‌های توصیه‌گر",
                "Chatbot های هوشمند",
                "مدل‌های Deep Learning"
            ],
            technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"],
            price: "شروع از ۱۵,۰۰۰,۰۰۰ تومان",
            duration: "۸-۱۲ هفته",
            delivery: "مدل نهایی + داکیومنت + API"
        },
        ecommerce: {
            title: "فروشگاه اینترنتی",
            description: "طراحی و توسعه فروشگاه‌های آنلاین با امکانات کامل و درگاه‌های پرداخت ایرانی و بین‌المللی.",
            features: [
                "سیستم مدیریت محصولات و دسته‌بندی",
                "درگاه پرداخت زرین‌پال و دیگر درگاه‌ها",
                "سیستم مدیریت موجودی و انبار",
                "پنل مدیریت پیشرفته",
                "سیستم نظرات و امتیازدهی",
                "بهینه‌سازی برای موتورهای جستجو"
            ],
            technologies: ["WordPress", "WooCommerce", "Laravel", "React", "MySQL"],
            price: "شروع از ۸,۰۰۰,۰۰۰ تومان",
            duration: "۶-۱۰ هفته",
            delivery: "فروشگاه کامل + آموزش + پشتیبانی ۱ ساله"
        },
        cms: {
            title: "سیستم مدیریت محتوا",
            description: "توسعه CMS های اختصاصی با امکانات مورد نیاز کسب و کار شما و رابط کاربری کاربرپسند.",
            features: [
                "پنل مدیریت کاملاً فارسی",
                "ویرایشگر WYSIWYG پیشرفته",
                "مدیریت کاربران و سطوح دسترسی",
                "سیستم بکاپ خودکار",
                "امنیت بالا و به‌روزرسانی",
                "پشتیبانی از چند زبانه"
            ],
            technologies: ["WordPress", "Laravel", "Django", "Vue.js", "PostgreSQL"],
            price: "شروع از ۶,۰۰۰,۰۰۰ تومان",
            duration: "۴-۸ هفته",
            delivery: "سیستم کامل + آموزش + پشتیبانی ۱ ساله"
        },
        consulting: {
            title: "مشاوره فنی و معماری",
            description: "مشاوره تخصصی در زمینه معماری نرم‌افزار، انتخاب تکنولوژی‌stack و بهینه‌سازی سیستم‌های موجود.",
            features: [
                "تحلیل و بررسی نیازهای فنی",
                "معماری نرم‌افزار و طراحی سیستم",
                "بررسی امکان‌سنجی پروژه",
                "مشاوره در انتخاب تکنولوژی",
                "بهینه‌سازی عملکرد و scalability",
                "مشاوره مستمر در طول پروژه"
            ],
            technologies: ["System Design", "Cloud Architecture", "DevOps", "Security"],
            price: "ساعتی ۱۵۰,۰۰۰ تومان",
            duration: "بر اساس نیاز پروژه",
            delivery: "مستندات فنی + جلسات مشاوره + گزارش"
        }
    };

    $('.service-btn').on('click', function() {
        const serviceType = $(this).data('service');
        showServiceModal(serviceType);
    });

    function showServiceModal(serviceType) {
        const service = serviceDetails[serviceType];
        
        const modalContent = `
            <div class="modal-header">
                <h3>${service.title}</h3>
            </div>
            
            <div class="modal-body">
                <p class="modal-description">${service.description}</p>
                
                <div class="modal-section">
                    <h4>🛠️ ویژگی‌های اصلی</h4>
                    <ul class="modal-features">
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h4>🔧 تکنولوژی‌های مورد استفاده</h4>
                    <div class="tech-tags">
                        ${service.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-info-grid">
                    <div class="info-card">
                        <div class="info-icon">💰</div>
                        <div class="info-content">
                            <strong>هزینه</strong>
                            <span>${service.price}</span>
                        </div>
                    </div>
                    <div class="info-card">
                        <div class="info-icon">⏱️</div>
                        <div class="info-content">
                            <strong>مدت زمان</strong>
                            <span>${service.duration}</span>
                        </div>
                    </div>
                    <div class="info-card">
                        <div class="info-icon">📦</div>
                        <div class="info-content">
                            <strong>تحویل</strong>
                            <span>${service.delivery}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="consultation-btn" onclick="requestConsultation('${serviceType}')">
                    درخواست مشاوره رایگان
                </button>
                <button class="order-btn" onclick="placeOrder('${serviceType}')">
                    ثبت سفارش
                </button>
            </div>
        `;

        $('#modalContent').html(modalContent);
        $('#serviceModal').fadeIn();
        
        $('body').css('overflow', 'hidden');
    }

    $('.close-modal').on('click', function() {
        closeModal();
    });

    $(window).on('click', function(e) {
        if ($(e.target).is('#serviceModal')) {
            closeModal();
        }
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        $('#serviceModal').fadeOut();
        $('body').css('overflow', 'auto');
    }

    function animateServices() {
        $('.service-card').each(function() {
            const cardPosition = $(this).offset().top;
            const screenPosition = $(window).scrollTop() + $(window).height() * 0.8;
            
            if (cardPosition < screenPosition) {
                $(this).addClass('animated');
            }
        });
    }

    $(window).on('scroll', function() {
        animateServices();
    });

    $(window).trigger('scroll');

    $('<style>')
        .text(`
            .modal-header {
                text-align: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #e2e8ff;
            }
            
            .modal-header h3 {
                background: linear-gradient(135deg, #667eea, #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 1.8rem;
                font-weight: 700;
            }
            
            .modal-description {
                color: #4a5568;
                line-height: 1.8;
                margin-bottom: 2rem;
                text-align: justify;
            }
            
            .modal-section {
                margin-bottom: 2rem;
            }
            
            .modal-section h4 {
                color: #764ba2;
                margin-bottom: 1rem;
                font-size: 1.2rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .modal-features {
                list-style: none;
                background: linear-gradient(135deg, #f8faff, #eef2ff);
                padding: 1.5rem;
                border-radius: 12px;
                border-right: 4px solid #667eea;
            }
            
            .modal-features li {
                padding: 0.5rem 0;
                padding-right: 1.5rem;
                position: relative;
                color: #5a67d8;
                font-weight: 500;
            }
            
            .modal-features li::before {
                content: '✓';
                position: absolute;
                right: 0;
                color: #667eea;
                font-weight: bold;
            }
            
            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .tech-tag {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 500;
            }
            
            .modal-info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin: 2rem 0;
            }
            
            .info-card {
                background: linear-gradient(135deg, #f8faff, #eef2ff);
                padding: 1.5rem;
                border-radius: 12px;
                text-align: center;
                border-right: 3px solid #667eea;
            }
            
            .info-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            
            .info-content {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .info-content strong {
                color: #764ba2;
                font-size: 0.9rem;
            }
            
            .info-content span {
                color: #5a67d8;
                font-weight: 600;
                font-size: 1rem;
            }
            
            .modal-footer {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
            }
            
            .consultation-btn, .order-btn {
                flex: 1;
                padding: 1rem 2rem;
                border: none;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .consultation-btn {
                background: #e2e8ff;
                color: #667eea;
            }
            
            .order-btn {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
            }
            
            .consultation-btn:hover, .order-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            }
            
            @media (max-width: 768px) {
                .modal-info-grid {
                    grid-template-columns: 1fr;
                }
                
                .modal-footer {
                    flex-direction: column;
                }
            }
        `)
        .appendTo('head');
});

function requestConsultation(serviceType) {
    alert(`درخواست مشاوره برای سرویس ${serviceDetails[serviceType].title} ثبت شد!\nمشاوران ما به زودی با شما تماس خواهند گرفت.`);
    $('#serviceModal').fadeOut();
    $('body').css('overflow', 'auto');
}

function placeOrder(serviceType) {
    alert(`سفارش ${serviceDetails[serviceType].title} ثبت شد!\nبرای تکمیل فرآیند سفارش، همکاران ما با شما تماس خواهند گرفت.`);
    $('#serviceModal').fadeOut();
    $('body').css('overflow', 'auto');
}