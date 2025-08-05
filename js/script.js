// Main JavaScript file for portfolio functionality

document.addEventListener('DOMContentLoaded', function() {
    // Simple Mobile menu toggle
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (toggleBtn && menu && menuIcon && closeIcon) {
        toggleBtn.addEventListener('click', function() {
            // Toggle menu visibility
            menu.classList.toggle('hidden');
            
            // Toggle icons
            if (menu.classList.contains('hidden')) {
                // Menu is closed - show menu icon, hide close icon
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                document.body.style.overflow = 'auto';
            } else {
                // Menu is open - hide menu icon, show close icon
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close mobile menu when clicking a link
        const mobileLinks = menu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typewriter effect for homepage
    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement) {
        const text = "Prabesh Acharya";
        let index = 0;
        let isDeleting = false;

        function typeEffect() {
            typewriterElement.innerText = text.substring(0, index);

            if (!isDeleting && index < text.length) {
                index++;
            } else if (isDeleting && index > 0) {
                index--;
            }

            if (index === text.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1000); // Pause before deleting
                return;
            }

            if (index === 0 && isDeleting) {
                isDeleting = false;
            }

            setTimeout(typeEffect, isDeleting ? 80 : 120);
        }

        typeEffect();
    }

    // Contact form handling (static version - just validation)
    const contactForm = document.querySelector('form[action*="messages"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const message = this.querySelector('[name="message"]').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // For static version, show success message
            alert('Thank you for your message! Since this is a static version, the message cannot be sent. Please contact me directly via email: prabesh11100@gmail.com');
            
            // Reset form
            this.reset();
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add scroll animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Add some utility functions for enhanced interactivity
function highlightActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href && href.includes(currentPage.replace('.html', ''))) {
            item.classList.add('active');
        }
    });
}

// Call this function when page loads
document.addEventListener('DOMContentLoaded', highlightActiveNavItem);
