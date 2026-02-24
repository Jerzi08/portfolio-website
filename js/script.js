// ========== INITIALIZATION ==========
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initAOS();
    initEmailJS();
    initDarkMode();
    initMobileNav();
    initScrollEffects();
    initContactForm();
    initNewsletterForm();
    initSkillBars();
    initBackToTop();
    initActiveNav();
});

// ========== LOADER ==========
function initLoader() {
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });
}

// ========== AOS ANIMATION ==========
function initAOS() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

// ========== EMAIL JS INIT ==========
function initEmailJS() {
    // Initialize EmailJS with your public key
    // Sign up at https://www.emailjs.com/ to get your keys
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key
}

// ========== DARK MODE ==========
function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = toggleBtn.querySelector('i');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Add rotation animation
        icon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 300);
        
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ========== MOBILE NAVIGATION ==========
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========== SCROLL EFFECTS ==========
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        // Navbar background change
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNav();
    });
}

// ========== ACTIVE NAVIGATION ==========
function initActiveNav() {
    updateActiveNav();
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========== SKILL BARS ANIMATION ==========
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const formStatus = document.getElementById('formStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showFormMessage('Mohon lengkapi semua field dengan benar', 'error');
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Disable form
        toggleFormDisabled(true);
        showFormMessage('Mengirim pesan...', 'info');
        
        try {
            // Send email using EmailJS
            // Uncomment and configure with your EmailJS credentials
            /*
            const response = await emailjs.send(
                'YOUR_SERVICE_ID', // Replace with your service ID
                'YOUR_TEMPLATE_ID', // Replace with your template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'jerzi.bp@gmail.com'
                }
            );
            */
            
            // Simulate success (remove this when using EmailJS)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            showFormMessage('✓ Terima kasih! Pesan Anda telah terkirim.', 'success');
            form.reset();
            
            // Optional: Save to localStorage
            saveToLocalStorage(formData);
            
        } catch (error) {
            console.error('Error sending email:', error);
            showFormMessage('✗ Gagal mengirim pesan. Silakan coba lagi.', 'error');
        } finally {
            toggleFormDisabled(false);
        }
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const errorElement = field.parentElement.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';
        
        // Remove error class
        field.classList.remove('error');
        
        if (!value) {
            isValid = false;
            errorMessage = 'Field ini wajib diisi';
        } else if (field.type === 'email' && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Format email tidak valid';
        } else if (field.id === 'message' && value.length < 10) {
            isValid = false;
            errorMessage = 'Pesan minimal 10 karakter';
        }
        
        if (!isValid) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
        } else {
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function toggleFormDisabled(disabled) {
        inputs.forEach(input => input.disabled = disabled);
        submitBtn.disabled = disabled;
        
        if (disabled) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
        } else {
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
        }
    }
    
    function showFormMessage(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        
        if (type === 'success') {
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }
    }
    
    function saveToLocalStorage(data) {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        // Keep only last 10 submissions
        if (submissions.length > 10) {
            submissions.shift();
        }
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    }
}

// ========== NEWSLETTER FORM ==========
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value.trim();
        const button = form.querySelector('button');
        const originalIcon = button.innerHTML;
        
        if (!isValidEmail(email)) {
            alert('Masukkan email yang valid');
            return;
        }
        
        // Show loading
        button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
        button.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Success
            button.innerHTML = '<i class="fas fa-check"></i>';
            form.reset();
            
            setTimeout(() => {
                button.innerHTML = originalIcon;
                button.disabled = false;
            }, 2000);
            
        } catch (error) {
            button.innerHTML = '<i class="fas fa-times"></i>';
            
            setTimeout(() => {
                button.innerHTML = originalIcon;
                button.disabled = false;
            }, 2000);
        }
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ========== BACK TO TOP ==========
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, href);
            }
        }
    });
});

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event
window.addEventListener('scroll', debounce(() => {
    // Scroll-related tasks that don't need to run too frequently
}, 100));

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// ========== EXPOSE DEBUG FUNCTIONS (DEVELOPMENT ONLY) ==========
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debug = {
        toggleDarkMode: () => document.getElementById('darkModeToggle').click(),
        clearStorage: () => {
            localStorage.clear();
            console.log('Storage cleared');
        },
        getFormData: () => {
            const form = document.getElementById('contactForm');
            return {
                name: form?.name?.value,
                email: form?.email?.value,
                subject: form?.subject?.value,
                message: form?.message?.value
            };
        }
    };
}
