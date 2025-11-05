// cms-script.js
$(document).ready(function() {
    // Initialize CMS
    initCMS();
    
    // Page Navigation
    $('.menu-item').on('click', function() {
        const pageId = $(this).data('page');
        navigateToPage(pageId);
    });
    
    // Sidebar Toggle
    $('.sidebar-toggle').on('click', function() {
        $('.sidebar').toggleClass('active');
    });
    
    // Theme Toggle
    $('.theme-toggle').on('click', function() {
        $('body').toggleClass('dark-mode');
        $(this).find('i').toggleClass('fa-moon fa-sun');
    });
    
    // Modal Management
    $('.modal-close, .btn-secondary').on('click', function() {
        closeAllModals();
    });
    
    // Add Post Button
    $('#add-post-btn').on('click', function() {
        $('#post-modal').addClass('active');
    });
    
    // Add Category Button
    $('#add-category-btn').on('click', function() {
        showNotification('افزودن دسته‌بندی جدید', 'info');
    });
    
    // Add User Button
    $('#add-user-btn').on('click', function() {
        showNotification('افزودن کاربر جدید', 'info');
    });
    
    // Upload Media Button
    $('#upload-media-btn').on('click', function() {
        showNotification('آپلود فایل جدید', 'info');
    });
    
    // Settings Tabs
    $('.tab-btn').on('click', function() {
        const tabId = $(this).data('tab');
        switchSettingsTab(tabId);
    });
    
    // Filter Tabs
    $('.filter-tab').on('click', function() {
        $('.filter-tab').removeClass('active');
        $(this).addClass('active');
    });
    
    // Form Submissions
    $('.settings-form').on('submit', function(e) {
        e.preventDefault();
        showNotification('تنظیمات با موفقیت ذخیره شد', 'success');
    });
    
    $('#post-form').on('submit', function(e) {
        e.preventDefault();
        showNotification('مقاله با موفقیت ذخیره شد', 'success');
        closeAllModals();
    });
    
    // Table Actions
    $('.action-buttons .edit').on('click', function() {
        const itemName = $(this).closest('tr').find('td:eq(1)').text();
        showNotification(`ویرایش ${itemName}`, 'info');
    });
    
    $('.action-buttons .delete').on('click', function() {
        const itemName = $(this).closest('tr').find('td:eq(1)').text();
        if (confirm(`آیا از حذف "${itemName}" اطمینان دارید؟`)) {
            showNotification(`${itemName} با موفقیت حذف شد`, 'success');
        }
    });
    
    $('.action-buttons .view').on('click', function() {
        const itemName = $(this).closest('tr').find('td:eq(1)').text();
        showNotification(`مشاهده ${itemName}`, 'info');
    });
    
    // Comment Actions
    $('.comment-actions .btn-success').on('click', function() {
        $(this).closest('.comment-item').find('.comment-status')
            .text('تایید شده')
            .removeClass('pending')
            .addClass('approved');
        showNotification('نظر با موفقیت تایید شد', 'success');
    });
    
    $('.comment-actions .btn-danger').on('click', function() {
        if (confirm('آیا از رد این نظر اطمینان دارید؟')) {
            $(this).closest('.comment-item').remove();
            showNotification('نظر با موفقیت رد شد', 'success');
        }
    });
    
    // Select All Checkbox
    $('#select-all').on('change', function() {
        const isChecked = $(this).is(':checked');
        $('.data-table tbody input[type="checkbox"]').prop('checked', isChecked);
    });
    
    // Search Functionality
    $('.search-box input, .search-filter input').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        const table = $(this).closest('.filters').next('.table-container');
        
        if (table.length) {
            table.find('tbody tr').each(function() {
                const rowText = $(this).text().toLowerCase();
                $(this).toggle(rowText.includes(searchTerm));
            });
        }
    });
    
    // Initialize Charts
    initCharts();
    
    // Initialize Statistics
    initStatistics();
});

// CMS Initialization
function initCMS() {
    console.log('CMS System Initialized');
    
    // Set active page from URL hash
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateToPage(hash);
    }
    
    // Load user data
    loadUserData();
    
    // Initialize tooltips
    initTooltips();
}

// Page Navigation
function navigateToPage(pageId) {
    // Hide all pages
    $('.page').removeClass('active');
    
    // Show target page
    $(`#${pageId}`).addClass('active');
    
    // Update active menu item
    $('.menu-item').removeClass('active');
    $(`.menu-item[data-page="${pageId}"]`).addClass('active');
    
    // Update page title
    const pageTitle = $(`.menu-item[data-page="${pageId}"] span`).text();
    $('#page-title').text(pageTitle);
    
    // Update URL hash
    window.location.hash = pageId;
    
    // Log page view
    console.log(`Navigated to: ${pageTitle}`);
}

// Modal Management
function closeAllModals() {
    $('.modal').removeClass('active');
}

function openModal(modalId) {
    closeAllModals();
    $(`#${modalId}`).addClass('active');
}

// Settings Tabs
function switchSettingsTab(tabId) {
    $('.tab-btn').removeClass('active');
    $(`.tab-btn[data-tab="${tabId}"]`).addClass('active');
    
    $('.tab-pane').removeClass('active');
    $(`#${tabId}`).addClass('active');
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = $(`
        <div class="notification ${type}">
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `);
    
    $('body').append(notification);
    
    // Add show class after a delay for animation
    setTimeout(() => {
        notification.addClass('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button
    notification.find('.notification-close').on('click', function() {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.removeClass('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Chart Initialization
function initCharts() {
    const ctx = document.getElementById('trafficChart');
    if (ctx) {
        // Simple chart implementation (in real project, use Chart.js)
        ctx.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #6b7280;">
                <i class="fas fa-chart-bar" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>نمودار آمار بازدیدها</p>
                <small>برای نمایش نمودار واقعی از کتابخانه Chart.js استفاده کنید</small>
            </div>
        `;
    }
}

// Statistics
function initStatistics() {
    // Animate statistics counters
    $('.stat-info h3').each(function() {
        const $this = $(this);
        const target = parseInt($this.text().replace(/,/g, ''));
        
        if (!isNaN(target)) {
            $this.prop('Counter', 0).animate({
                Counter: target
            }, {
                duration: 2000,
                easing: 'swing',
                step: function(now) {
                    $this.text(Math.ceil(now).toLocaleString());
                }
            });
        }
    });
}

// User Data Management
function loadUserData() {
    // Simulate loading user data
    setTimeout(() => {
        console.log('User data loaded successfully');
    }, 1000);
}

// Tooltips
function initTooltips() {
    $('[title]').each(function() {
        const title = $(this).attr('title');
        $(this).removeAttr('title');
        
        $(this).hover(
            function() {
                $('<div class="tooltip"></div>')
                    .text(title)
                    .appendTo('body')
                    .fadeIn('fast');
            },
            function() {
                $('.tooltip').remove();
            }
        ).mousemove(function(e) {
            $('.tooltip')
                .css('top', (e.pageY - 10) + 'px')
                .css('left', (e.pageX + 20) + 'px');
        });
    });
}

// Data Export
function exportData(type) {
    showNotification(`در حال آماده‌سازی ${type} برای دانلود...`, 'info');
    
    setTimeout(() => {
        showNotification(`${type} با موفقیت دانلود شد`, 'success');
    }, 2000);
}

// Bulk Actions
function bulkAction(action) {
    const selectedItems = $('.data-table tbody input[type="checkbox"]:checked').length;
    
    if (selectedItems === 0) {
        showNotification('لطفاً حداقل یک آیتم را انتخاب کنید', 'warning');
        return;
    }
    
    const actions = {
        'delete': 'حذف',
        'publish': 'انتشار',
        'draft': 'پیش‌نویس'
    };
    
    if (confirm(`آیا از ${actions[action]} ${selectedItems} آیتم انتخاب شده اطمینان دارید؟`)) {
        showNotification(`${selectedItems} آیتم با موفقیت ${actions[action]} شد`, 'success');
        
        // Uncheck all checkboxes
        $('.data-table tbody input[type="checkbox"]').prop('checked', false);
        $('#select-all').prop('checked', false);
    }
}

// Search and Filter
function applyFilters() {
    const category = $('#category-filter').val();
    const status = $('#status-filter').val();
    const search = $('.search-filter input').val().toLowerCase();
    
    $('.data-table tbody tr').each(function() {
        const $row = $(this);
        const rowCategory = $row.find('td:eq(2)').text();
        const rowStatus = $row.find('td:eq(5) .status').text();
        const rowText = $row.text().toLowerCase();
        
        const categoryMatch = !category || rowCategory === category;
        const statusMatch = !status || rowStatus === status;
        const searchMatch = !search || rowText.includes(search);
        
        $row.toggle(categoryMatch && statusMatch && searchMatch);
    });
}

// Event Listeners for Filters
$('#category-filter, #status-filter').on('change', applyFilters);
$('.search-filter input').on('input', applyFilters);

// Keyboard Shortcuts
$(document).on('keydown', function(e) {
    // Ctrl + / for search focus
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        $('.search-box input').focus();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Responsive Helpers
function checkMobile() {
    return window.innerWidth <= 768;
}

// Initialize on window resize
$(window).on('resize', function() {
    if (checkMobile()) {
        $('.sidebar').removeClass('active');
    }
});

// Add CSS for notifications and tooltips
$('head').append(`
    <style>
        .notification {
            position: fixed;
            top: 20px;
            left: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border-right: 4px solid #667eea;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 10000;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-right-color: #10b981;
        }
        
        .notification.error {
            border-right-color: #ef4444;
        }
        
        .notification.warning {
            border-right-color: #f59e0b;
        }
        
        .notification.info {
            border-right-color: #667eea;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
            padding: 0.25rem;
            margin-right: auto;
        }
        
        .tooltip {
            position: absolute;
            background: #1f2937;
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            font-size: 0.875rem;
            z-index: 10000;
            display: none;
        }
        
        .dark-mode {
            background: #111827;
            color: #f9fafb;
        }
        
        .dark-mode .top-header,
        .dark-mode .stat-card,
        .dark-mode .chart-section,
        .dark-mode .recent-section,
        .dark-mode .table-container,
        .dark-mode .category-card,
        .dark-mode .media-item,
        .dark-mode .comment-item,
        .dark-mode .settings-tabs,
        .dark-mode .modal-content {
            background: #1f2937;
            color: #f9fafb;
        }
        
        .dark-mode .data-table th {
            background: #374151;
            color: #f9fafb;
        }
        
        .dark-mode .form-control {
            background: #374151;
            border-color: #4b5563;
            color: #f9fafb;
        }
        
        .dark-mode .search-box input {
            background: #374151;
            border-color: #4b5563;
            color: #f9fafb;
        }
    </style>
`);

console.log('CMS Script Loaded Successfully! 🚀');