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

    // Counter Animation Function
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 100; // Lower number = faster animation (changed from 200 to 100)

        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const increment = target / speed;
            let count = 0;

            // Reset counter to 0 before starting animation
            counter.innerText = '0';

            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    // Handle decimal numbers (like 4.9)
                    if (target % 1 !== 0) {
                        counter.innerText = Math.min(count, target).toFixed(1);
                    } else {
                        counter.innerText = Math.floor(Math.min(count, target));
                    }
                    setTimeout(updateCounter, 5); // Faster update interval (changed from 10 to 5)
                } else {
                    // Ensure final value is exactly the target
                    if (target % 1 !== 0) {
                        counter.innerText = target.toFixed(1);
                    } else {
                        counter.innerText = target;
                    }
                }
            };

            updateCounter();
        });
    }

    // Skill Progress Bar Animation Function
    function animateSkillBars() {
        console.log('Starting skill bar animation...'); // Debug log
        const progressBars = document.querySelectorAll('.skill-progress-bar');
        
        progressBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width');
            
            if (targetWidth) {
                console.log(`Animating bar ${index + 1} to ${targetWidth}%`); // Debug log
                
                // Reset the width to 0
                bar.style.width = '0%';
                bar.style.transition = 'none';
                
                // Force a reflow to ensure the width is set to 0
                bar.offsetHeight;
                
                // Animate to target width with staggered delay
                setTimeout(() => {
                    bar.style.transition = 'width 2s ease-out';
                    bar.style.width = targetWidth + '%';
                }, index * 150); // 150ms delay between each bar
            }
        });
    }

    // Intersection Observer for Counter Animation
    const statsSection = document.querySelector('#stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger animation every time the section comes into view
                    setTimeout(() => {
                        animateCounters();
                    }, 300);
                } else {
                    // Reset counters to 0 when section goes out of view
                    const counters = document.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        counter.innerText = '0';
                    });
                }
            });
        }, {
            threshold: 0.3, // Trigger when 30% of the section is visible
            rootMargin: '0px'
        });

        statsObserver.observe(statsSection);
    }

    // Intersection Observer for Skills Progress Bars Animation
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay to ensure the section is properly visible
                    setTimeout(() => {
                        console.log('Animating skill bars...'); // Debug log
                        animateSkillBars();
                    }, 300);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the section is visible (more sensitive)
            rootMargin: '0px'
        });

        skillsObserver.observe(skillsSection);
        
        // Also trigger animation on page load if skills section is already visible
        setTimeout(() => {
            const rect = skillsSection.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            if (isVisible) {
                console.log('Skills section visible on load, animating...'); // Debug log
                animateSkillBars();
            }
        }, 1000);
    }

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
