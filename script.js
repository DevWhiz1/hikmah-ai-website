// ===========================
// Hikma AI - Main JavaScript
// ===========================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 100
    });

    // ===========================
    // Mobile Menu Toggle
    // ===========================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ===========================
    // Smooth Scrolling for Anchor Links
    // ===========================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Get the offset for fixed header
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================
    // Scroll to Top Button
    // ===========================
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===========================
    // Navbar Background on Scroll
    // ===========================
    const navbar = document.querySelector('nav');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        });
    }

    // ===========================
    // Active Navigation Highlighting
    // ===========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-emerald-600', 'font-semibold');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-emerald-600', 'font-semibold');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);

    // ===========================
    // Counter Animation for Stats
    // ===========================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        
        const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = formatNumber(target);
                clearInterval(counter);
            } else {
                element.textContent = formatNumber(Math.floor(start));
            }
        }, 16);
    }
    
    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num + '+';
    }
    
    // Trigger counter animation when stats section is in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.text-3xl');
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                    animateCounter(counter, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.grid.grid-cols-3.gap-6');
    if (statsSection) {
        statsObserver.observe(statsSection.parentElement);
    }

    // ===========================
    // Feature Cards Tilt Effect (3D)
    // ===========================
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ===========================
    // Parallax Effect for Hero Section
    // ===========================
    const heroSection = document.querySelector('#home');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = heroSection.querySelectorAll('[data-aos]');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // ===========================
    // Form Validation (for future contact forms)
    // ===========================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Add to forms when implemented
    window.validateEmail = validateEmail;

    // ===========================
    // Toast Notification System (for future use)
    // ===========================
    window.showToast = function(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} text-${type === 'success' ? 'emerald' : 'red'}-600 mr-3 text-xl"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    };

    // ===========================
    // Lazy Loading Images
    // ===========================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // ===========================
    // Typing Effect for Hero Text (Optional Enhancement)
    // ===========================
    function typeWriter(element, text, speed = 50) {
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
    
    // Uncomment to enable typing effect
    // const heroTitle = document.querySelector('#home h1 span:first-child');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText);
    // }

    // ===========================
    // Keyboard Navigation Enhancement
    // ===========================
    document.addEventListener('keydown', function(e) {
        // Press 'Escape' to close mobile menu
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // Press 'Home' to scroll to top
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // ===========================
    // Performance Optimization: Debounce Function
    // ===========================
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Use debounce for scroll events
    window.addEventListener('scroll', debounce(function() {
        // Your scroll handler code here
    }));

    // ===========================
    // Print Page Functionality
    // ===========================
    window.printPage = function() {
        window.print();
    };

    // ===========================
    // Copy to Clipboard Function (for future use)
    // ===========================
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
            showToast('Copied to clipboard!', 'success');
        }, function() {
            showToast('Failed to copy', 'error');
        });
    };

    // ===========================
    // Share Functionality (for future social sharing)
    // ===========================
    window.shareContent = function(platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            whatsapp: `https://wa.me/?text=${title}%20${url}`
        };
        
        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    };

    // ===========================
    // Error Handling for Images
    // ===========================
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Fallback to placeholder if image fails to load
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%2310b981" width="400" height="300"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EHikma AI%3C/text%3E%3C/svg%3E';
        });
    });

    // ===========================
    // Console Welcome Message
    // ===========================
    console.log('%c🌙 Welcome to Hikma AI', 'color: #10b981; font-size: 20px; font-weight: bold;');
    console.log('%cYour Intelligent Islamic Companion', 'color: #059669; font-size: 14px;');
    console.log('%cBuilt with ❤️ by Cyber Mujahideen Ai Skillbridge', 'color: #047857; font-size: 12px;');

    // ===========================
    // Analytics Tracking (Placeholder)
    // ===========================
    function trackEvent(category, action, label) {
        // Implement analytics tracking here
        // Example: Google Analytics, Mixpanel, etc.
        console.log('Event tracked:', category, action, label);
    }
    
    // Track button clicks
    document.querySelectorAll('a[href*="vercel.app"]').forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('CTA', 'Click', 'Get Started Button');
        });
    });

    // ===========================
    // Service Worker Registration (for PWA)
    // ===========================
    if ('serviceWorker' in navigator) {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    }

    // ===========================
    // Accessibility: Focus Trap for Mobile Menu
    // ===========================
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }
    
    if (mobileMenu) {
        trapFocus(mobileMenu);
    }

    // ===========================
    // Initialization Complete
    // ===========================
    console.log('✅ Hikma AI initialized successfully');
});

// ===========================
// Failsafe: Handle JavaScript Errors Gracefully
// ===========================
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.message);
    // Log error to monitoring service if implemented
    // Ensure site remains functional despite errors
});

// ===========================
// Handle Unhandled Promise Rejections
// ===========================
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

