/* 
 * Main JavaScript
 * JeffTech Electronics
 */

/**
 * Main Application Entry Point
 */
(function() {
    'use strict';
    
    /* ==========================================================================
       Mobile Navigation Toggle
       ========================================================================== */
    
    function initMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navToggle || !navMenu) return;
        
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('is-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-open');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-open');
            }
        });
    }
    
    /* ==========================================================================
       Smooth Scroll for Anchor Links
       ========================================================================== */
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update focus for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus({ preventScroll: true });
                }
            });
        });
    }
    
    /* ==========================================================================
       Active Navigation Link Highlighting
       ========================================================================== */
    
    function initActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(function(link) {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('nav-link--active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('nav-link--active');
                link.removeAttribute('aria-current');
            }
        });
    }
    
    /* ==========================================================================
       Form Validation Helper
       ========================================================================== */
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\d\s\-\+\(\)]{10,}$/;
        return re.test(phone);
    }
    
    function validateRequired(value) {
        return value.trim().length > 0;
    }
    
    /* ==========================================================================
       Initialize Form Validation
       ========================================================================== */
    
    function initFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(function(form) {
            // Real-time validation on blur
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(function(input) {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    // Clear error when user starts typing
                    const errorEl = this.parentElement.querySelector('.field-error');
                    if (errorEl) {
                        errorEl.remove();
                        this.removeAttribute('aria-invalid');
                    }
                });
            });
            
            form.addEventListener('submit', function(e) {
                let isValid = true;
                
                inputs.forEach(function(input) {
                    if (!validateField(input)) {
                        isValid = false;
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                }
            });
        });
    }
    
    function validateField(field) {
        const value = field.value;
        const type = field.type;
        let isValid = true;
        let message = '';
        
        // Check required
        if (field.hasAttribute('required') && !validateRequired(value)) {
            isValid = false;
            message = 'This field is required';
        }
        
        // Check email
        if (type === 'email' && value && !validateEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
        
        // Check phone
        if (type === 'tel' && value && !validatePhone(value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
        
        if (isValid) {
            removeFieldError(field);
        } else {
            showFieldError(field, message);
        }
        
        return isValid;
    }
    
    /* ==========================================================================
       Show/Remove Field Error
       ========================================================================== */
    
    function showFieldError(field, message) {
        field.setAttribute('aria-invalid', 'true');
        
        // Create error message element
        let errorEl = field.parentElement.querySelector('.field-error');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'field-error';
            errorEl.setAttribute('role', 'alert');
            field.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }
    
    function removeFieldError(field) {
        field.removeAttribute('aria-invalid');
        const errorEl = field.parentElement.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
    }
    
    /* ==========================================================================
       Lazy Loading for Images
       ========================================================================== */
    
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(function(img) {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback - load all images immediately
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(function(img) {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }
    
    /* ==========================================================================
       Back to Top Button
       ========================================================================== */
    
    function initBackToTop() {
        // Check if back-to-top button already exists
        if (document.querySelector('.back-to-top')) return;
        
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
        
        document.body.appendChild(backToTopBtn);
        
        // Show/hide button based on scroll position
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        function updateBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('is-visible');
            } else {
                backToTopBtn.classList.remove('is-visible');
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateBackToTop);
                ticking = true;
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    /* ==========================================================================
       Modal Component
       ========================================================================== */
    
    const Modal = {
        open: function(modalSelector) {
            const modal = document.querySelector(modalSelector);
            if (!modal) return;
            
            const backdrop = modal.closest('.modal-backdrop') || modal;
            backdrop.classList.add('is-open');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Focus trap
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
            
            // Set aria attributes
            modal.setAttribute('aria-modal', 'true');
        },
        
        close: function(modalSelector) {
            const modal = document.querySelector(modalSelector);
            if (!modal) return;
            
            const backdrop = modal.closest('.modal-backdrop') || modal;
            backdrop.classList.remove('is-open');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Remove aria attributes
            modal.removeAttribute('aria-modal');
        },
        
        init: function() {
            // Open modal triggers
            document.querySelectorAll('[data-modal-target]').forEach(function(trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    const modalSelector = this.getAttribute('data-modal-target');
                    Modal.open(modalSelector);
                });
            });
            
            // Close modal triggers
            document.querySelectorAll('[data-modal-close], .modal-backdrop').forEach(function(element) {
                element.addEventListener('click', function(e) {
                    if (e.target === this) {
                        const modal = this.classList.contains('modal-backdrop') 
                            ? this.querySelector('.modal') 
                            : this.closest('.modal-backdrop, .modal');
                        if (modal) {
                            const selector = '#' + modal.id;
                            Modal.close(selector);
                        }
                    }
                });
            });
            
            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    const openModal = document.querySelector('.modal-backdrop.is-open .modal');
                    if (openModal) {
                        const selector = '#' + openModal.id;
                        Modal.close(selector);
                    }
                }
            });
        }
    };
    
    /* ==========================================================================
       Toast Notifications
       ========================================================================== */
    
    const Toast = {
        container: null,
        
        createContainer: function() {
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.className = 'toast-container';
                document.body.appendChild(this.container);
            }
            return this.container;
        },
        
        show: function(options) {
            const container = this.createContainer();
            const toast = document.createElement('div');
            toast.className = 'toast toast--' + (options.type || 'success');
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'polite');
            
            toast.innerHTML = `
                <div class="toast__content">
                    <div class="toast__title">${options.title || ''}</div>
                    <div class="toast__message">${options.message || ''}</div>
                </div>
                <button class="toast__close" aria-label="Close">&times;</button>
            `;
            
            container.appendChild(toast);
            
            // Auto dismiss
            if (options.duration !== false) {
                setTimeout(function() {
                    Toast.dismiss(toast);
                }, options.duration || 5000);
            }
            
            // Close button
            toast.querySelector('.toast__close').addEventListener('click', function() {
                Toast.dismiss(toast);
            });
            
            return toast;
        },
        
        dismiss: function(toast) {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(function() {
                toast.remove();
            }, 300);
        },
        
        success: function(message, title) {
            return this.show({ type: 'success', message: message, title: title });
        },
        
        error: function(message, title) {
            return this.show({ type: 'error', message: message, title: title });
        },
        
        warning: function(message, title) {
            return this.show({ type: 'warning', message: message, title: title });
        },
        
        info: function(message, title) {
            return this.show({ type: 'info', message: message, title: title });
        }
    };
    
    /* ==========================================================================
       Pill Dismiss
       ========================================================================== */
    
    function initPillDismiss() {
        document.querySelectorAll('.pill--dismissible, .pill [data-dismiss]').forEach(function(pill) {
            const dismissBtn = pill.querySelector('[data-dismiss]') || pill;
            
            dismissBtn.addEventListener('click', function() {
                pill.style.animation = 'fadeOut 0.2s ease forwards';
                setTimeout(function() {
                    pill.remove();
                }, 200);
            });
        });
    }
    
    /* ==========================================================================
       Tabs Component
       ========================================================================== */
    
    function initTabs() {
        document.querySelectorAll('.tabs').forEach(function(tabs) {
            const tabList = tabs.querySelector('.tabs__list');
            const tabsBtn = tabList.querySelectorAll('.tabs__tab');
            const panels = tabs.querySelectorAll('.tabs__panel');
            
            tabsBtn.forEach(function(btn, index) {
                btn.addEventListener('click', function() {
                    // Remove active from all tabs
                    tabsBtn.forEach(function(b) {
                        b.classList.remove('tabs__tab--active');
                        b.removeAttribute('aria-selected');
                        b.setAttribute('tabindex', '-1');
                    });
                    
                    // Hide all panels
                    panels.forEach(function(p) {
                        p.classList.remove('is-open');
                        p.hidden = true;
                    });
                    
                    // Activate clicked tab
                    this.classList.add('tabs__tab--active');
                    this.setAttribute('aria-selected', 'true');
                    this.setAttribute('tabindex', '0');
                    
                    // Show corresponding panel
                    const panelId = this.getAttribute('data-tab');
                    const panel = tabs.querySelector('#' + panelId);
                    if (panel) {
                        panel.classList.add('is-open');
                        panel.hidden = false;
                    }
                });
                
                // Keyboard navigation
                btn.addEventListener('keydown', function(e) {
                    let targetIndex;
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        targetIndex = (index + 1) % tabsBtn.length;
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        targetIndex = (index - 1 + tabsBtn.length) % tabsBtn.length;
                    }
                    
                    if (targetIndex !== undefined) {
                        tabsBtn[targetIndex].focus();
                        tabsBtn[targetIndex].click();
                    }
                });
            });
            
            // Activate first tab by default
            if (tabsBtn.length > 0 && !tabList.querySelector('[aria-selected="true"]')) {
                tabsBtn[0].click();
            }
        });
    }
    
    /* ==========================================================================
       Alert Dismiss
       ========================================================================== */
    
    function initAlertDismiss() {
        document.querySelectorAll('.alert[data-dismissible], .alert-banner[data-dismissible]').forEach(function(alert) {
            const dismissBtn = alert.querySelector('.alert__dismiss, .alert-banner__close, [data-dismiss-alert]');
            if (dismissBtn) {
                dismissBtn.addEventListener('click', function() {
                    alert.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(function() {
                        alert.remove();
                    }, 300);
                });
            }
        });
    }
    
    /* ==========================================================================
       Hero Slider Component
       ========================================================================== */
    
    const HeroSlider = {
        init: function() {
            const sliders = document.querySelectorAll('.hero-slider');
            
            sliders.forEach(function(slider) {
                HeroSlider.createSlider(slider);
            });
        },
        
        createSlider: function(slider) {
            const slides = slider.querySelectorAll('.hero-slider__slide');
            const prevBtn = slider.querySelector('.hero-slider__control--prev');
            const nextBtn = slider.querySelector('.hero-slider__control--next');
            const indicators = slider.querySelectorAll('.hero-slider__indicator');
            
            let currentSlide = 0;
            const totalSlides = slides.length;
            
            function showSlide(index) {
                // Wrap around
                if (index >= totalSlides) index = 0;
                if (index < 0) index = totalSlides - 1;
                
                // Update slides
                slides.forEach(function(slide, i) {
                    slide.classList.toggle('is-active', i === index);
                    slide.setAttribute('aria-hidden', i !== index);
                });
                
                // Update indicators
                indicators.forEach(function(indicator, i) {
                    indicator.classList.toggle('is-active', i === index);
                    indicator.setAttribute('aria-selected', i === index);
                });
                
                currentSlide = index;
            }
            
            function nextSlide() {
                showSlide(currentSlide + 1);
            }
            
            function prevSlide() {
                showSlide(currentSlide - 1);
            }
            
            // Event listeners
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    prevSlide();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    nextSlide();
                });
            }
            
            indicators.forEach(function(indicator, index) {
                indicator.addEventListener('click', function() {
                    showSlide(index);
                });
            });
            
            // Keyboard navigation
            slider.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            });
        }
    };
    
    /* ==========================================================================
       Initialize Application
       ========================================================================== */
    
    function init() {
        initMobileNav();
        initSmoothScroll();
        initActiveNavLink();
        initFormValidation();
        initLazyLoading();
        initBackToTop();
        initPillDismiss();
        initTabs();
        initAlertDismiss();
        Modal.init();
        HeroSlider.init();
        
        // Make Modal, Toast, and HeroSlider available globally
        window.Modal = Modal;
        window.Toast = Toast;
        window.HeroSlider = HeroSlider;
        
        console.log('JeffTech Electronics website initialized');
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
