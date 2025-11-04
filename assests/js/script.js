// home-script.js
$(document).ready(function() {
    function animateOnScroll() {
        $('.feature-card, .course-card, .stat-item').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate');
            }
        });
    }

    $(window).on('scroll', function() {
        animateOnScroll();
        if ($(window).scrollTop() > 100) {
            $('.home-header').css({
                'background': 'rgba(255, 255, 255, 0.98)',
                'box-shadow': '0 4px 30px rgba(118, 75, 162, 0.3)'
            });
        } else {
            $('.home-header').css({
                'background': 'rgba(255, 255, 255, 0.95)',
                'box-shadow': '0 2px 20px rgba(118, 75, 162, 0.2)'
            });
        }
    });

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    $('.btn').on('click', function(e) {
        const btnText = $(this).text();
        console.log('کلیک روی دکمه:', btnText);
        $(this).css('transform', 'scale(0.95)');
        setTimeout(() => {
            $(this).css('transform', '');
        }, 150);
    });

    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.text(target + '+');
                clearInterval(timer);
            } else {
                element.text(Math.floor(current) + '+');
            }
        }, 16);
    }

    function initCounters() {
        $('.stat-item h3').each(function() {
            const $this = $(this);
            const text = $this.text();
            const target = parseInt(text.replace('+', ''));
            
            if (!isNaN(target)) {
                $this.text('0+');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateCounter($this[0], target);
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe($this[0]);
            }
        });
    }

    $('.feature-card, .course-card').on('mouseenter', function() {
        $(this).css('transform', 'translateY(-10px)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'translateY(0)');
    });

    function handleResponsiveMenu() {
        if ($(window).width() <= 768) {
            $('.nav-links').addClass('mobile-menu');
        } else {
            $('.nav-links').removeClass('mobile-menu');
        }
    }

    animateOnScroll();
    initCounters();
    handleResponsiveMenu();

    $(window).on('resize', handleResponsiveMenu);

    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        $('.hero-section').css('transform', `translateY(${scrolled * 0.5}px)`);
    });

    console.log('صفحه خانه با موفقیت لود شد! 🚀');
});

function showNotification(message, type = 'success') {
    const notification = $(`
        <div class="notification ${type}">
            ${message}
        </div>
    `);
    
    $('body').append(notification);
    
    setTimeout(() => {
        notification.addClass('show');
    }, 100);
    
    setTimeout(() => {
        notification.removeClass('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}