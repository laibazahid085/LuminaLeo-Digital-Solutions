document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Terminate Loading Environment After Dom Complete
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        });
    }

    // 2. High-Performance Native Scroll Reveal Engine
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Optimize resources after reveal completes
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Responsive Navigation Interface Engine
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Dismiss menu interface immediately on anchor selection
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
            });
        });
    }

    // 4. Dynamic Metric Counter Module
    const counters = document.querySelectorAll('.counter-num');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'), 10);
                let startValue = 0;
                const totalDuration = 1500; // Milliseconds duration
                const intervals = Math.ceil(totalDuration / 16); // Calculation mapping to frame rates
                const incrementalStep = endValue / intervals;

                const counterTimer = setInterval(() => {
                    startValue += incrementalStep;
                    if (startValue >= endValue) {
                        target.textContent = endValue;
                        clearInterval(counterTimer);
                    } else {
                        target.textContent = Math.floor(startValue);
                    }
                }, 16);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.8 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 5. Native Accordion Engine (FAQ Mechanism)
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            const content = trigger.nextElementSibling;
            const isActive = parent.classList.contains('active');

            // Reset adjacent nodes to achieve unified layout experience
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-content').style.maxHeight = null;
            });

            if (!isActive) {
                parent.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // 6. Active Navigation Component Syncer
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentActiveSectionId = '';
        sections.forEach(section => {
            const topOffset = section.offsetTop - 120;
            if (window.scrollY >= topOffset) {
                currentActiveSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === currentActiveSectionId) {
                item.classList.add('active');
            }
        });
    });
});
// Append directly within the existing DOMContentLoaded execution scope
const targetTiers = document.querySelectorAll('.tier-card');

targetTiers.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Refined subtle tilt for detailed list objects
        const rotX = (y * -6).toFixed(2);
        const rotY = (x * 6).toFixed(2);
        
        card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.01, 1.01, 1.01)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});
// About Section Skill Accordion Trigger Flow
const skillTriggers = document.querySelectorAll('.skill-trigger');

skillTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const parentItem = trigger.parentElement;
        const targetContent = trigger.nextElementSibling;
        const isItemActive = parentItem.classList.contains('active');

        // Reset sibling components for unified interactive display
        document.querySelectorAll('.skill-accordion-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.skill-content').style.maxHeight = null;
        });

        if (!isItemActive) {
            parentItem.classList.add('active');
            targetContent.style.maxHeight = targetContent.scrollHeight + 'px';
        }
    });
});
// ===============================
// Initialize EmailJS
// ===============================
emailjs.init({
    publicKey: "jLY37yNT3KWtWlHa6"
});

// ===============================
// Contact Form
// ===============================
const contactForm = document.getElementById("portfolio-contact");
const statusMessage = document.getElementById("form-status");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        // Show Sending Status
        statusMessage.className = "form-status sending";
        statusMessage.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending your message...';

        emailjs.send("service_5b7u1jj", "template_4bx8c2q", {
            from_name: document.getElementById("name").value,
            from_email: document.getElementById("email").value,
            message: document.getElementById("message").value
        })

        .then(() => {

            statusMessage.className = "form-status success";
            statusMessage.innerHTML =
                '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will contact you as soon as possible.';

            contactForm.reset();

            // Hide success message after 6 seconds
            setTimeout(() => {
                statusMessage.className = "form-status";
                statusMessage.innerHTML = "";
            }, 6000);

        })

        .catch((error) => {

            console.error("EmailJS Error:", error);

            statusMessage.className = "form-status error";
            statusMessage.innerHTML =
                '<i class="fa-solid fa-circle-xmark"></i> Sorry! Your message could not be sent. Please try again later.';

            // Hide error message after 6 seconds
            setTimeout(() => {
                statusMessage.className = "form-status";
                statusMessage.innerHTML = "";
            }, 6000);

        });

    });

}