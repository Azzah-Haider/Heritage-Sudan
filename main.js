// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Collection filtering functionality
    setupCollectionFiltering();

    // Smooth scrolling for navigation links
    setupSmoothScrolling();

    // Form submission handling
    setupContactForm();

    // Museum card interaction
    setupMuseumCards();

    // Timeline animation on scroll
    setupTimelineAnimation();
});

// Collection filtering function
function setupCollectionFiltering() {
    const filterButtons = document.querySelectorAll('#collections [data-filter]');
    const artifactItems = document.querySelectorAll('.artifact-item');

    if (filterButtons.length > 0 && artifactItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter artifacts
                artifactItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');

                // Scroll to element
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form submission
function setupContactForm() {
    const contactForm = document.querySelector('#contact form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('inputName').value,
                email: document.getElementById('inputEmail').value,
                subject: document.getElementById('inputSubject').value,
                message: document.getElementById('inputMessage').value
            };

            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // In a real application, you would send this to a server
            console.log('Form submitted:', formData);

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }
}

// Museum card interaction
function setupMuseumCards() {
    const museumCards = document.querySelectorAll('.museum-card-minimal');

    museumCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add additional hover effect
            this.style.transition = 'all 0.3s ease';
        });

        // Add click event to "View Details" links
        const viewDetailsLink = card.querySelector('a[href="#"]');
        if (viewDetailsLink) {
            viewDetailsLink.addEventListener('click', function(e) {
                e.preventDefault();
                const museumTitle = card.querySelector('.card-title').textContent;
                alert(`You clicked on "${museumTitle}". This would open a detailed museum page.`);
            });
        }
    });
}

// Timeline animation on scroll
function setupTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item-modern');

    // Create an Intersection Observer to animate items when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Set initial state and observe each timeline item
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
}
 // add nav bar
 // js/navbar.js

 document.addEventListener('DOMContentLoaded', function() {
     // كود HTML لشريط التنقل
     const navbarHTML = `
         <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
             <div class="container">
                 <a class="navbar-brand fw-bold text-heritage" href="index.html">
                     <i class="fas fa-landmark me-2"></i>
                     Heritage Museum
                 </a>
                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                         aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                 </button>
                 <div class="collapse navbar-collapse" id="navbarNav">
                     <ul class="navbar-nav ms-auto">
                         <li class="nav-item mx-2">
                             <a class="nav-link" href="index.html">
                                 <i class="fas fa-home me-1"></i> Home
                             </a>
                         </li>
                         <li class="nav-item mx-2">
                             <a class="nav-link" href="museum.html">
                                 <i class="fas fa-landmark me-1"></i> Museums
                             </a>
                         </li>
                         <li class="nav-item mx-2">
                             <a class="nav-link" href="collection.html">
                                 <i class="fas fa-palette me-1"></i> Collections
                             </a>
                         </li>
                         <li class="nav-item mx-2">
                             <a class="nav-link" href="history.html">
                                 <i class="fas fa-scroll me-1"></i> History
                             </a>
                         </li>
                         <li class="nav-item mx-2">
                             <a class="nav-link" href="visit.html">
                                 <i class="fas fa-ticket-alt me-1"></i> Visit
                             </a>
                         </li>
                         <li class="nav-item mx-2">
                             <a class="nav-link btn btn-heritage text-white rounded-pill px-4" href="contact.html">
                                 <i class="fas fa-envelope me-1"></i> Contact
                             </a>
                         </li>
                     </ul>
                 </div>
             </div>
         </nav>
     `;

     // إدراج شريط التنقل في الصفحة
     const navbarPlaceholder = document.getElementById('navbar-placeholder');
     if (navbarPlaceholder) {
         navbarPlaceholder.innerHTML = navbarHTML;

         // تفعيل الصفحة النشطة
         setActivePage();
     }
 });

 // دالة تفعيل الصفحة النشطة
 function setActivePage() {
     // الحصول على اسم الصفحة الحالية
     const currentPage = window.location.pathname.split('/').pop() || 'index.html';

     // إضافة كلاس active للرابط المطابق
     const navLinks = document.querySelectorAll('.nav-link');
     navLinks.forEach(link => {
         const href = link.getAttribute('href');
         if (href === currentPage) {
             link.classList.add('active');
             link.setAttribute('aria-current', 'page');
         } else {
             link.classList.remove('active');
             link.removeAttribute('aria-current');
         }
     });
 }
// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        navbar.style.transition = 'box-shadow 0.3s ease';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}
// Timeline Animation - Fade in on scroll
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item-modern');

    // Observer options
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe each timeline item
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', initTimelineAnimation);

// Listen for scroll events to update active nav link
window.addEventListener('scroll', updateActiveNavLink);

// Initialize when page loads
updateActiveNavLink();


// navbar.js for all pages

document.addEventListener('DOMContentLoaded', function() {
    // كود HTML لشريط التنقل
    const navbarHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
            <div class="container">
                <a class="navbar-brand text-dark" href="index.html">
                    <i class="bi bi-columns-gap"></i> Heritage Sudan
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="index.html">
                                <i class="bi bi-house-door me-1"></i> Home
                            </a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="museum.html">
                                <i class="fas fa-landmark me-1"></i> Museums
                            </a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="collection.html">
                                <i class="fas fa-layer-group me-1"></i> Collections
                            </a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="history.html">
                                <i class="fas fa-scroll me-1"></i> History
                            </a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="visit.html">
                                <i class="fas fa-ticket-alt me-1"></i> Visit
                            </a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link btn btn-heritage text-white rounded-pill px-4" href="contact.html">
                                <i class="fas fa-envelope me-1"></i> Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    // إدراج شريط التنقل في الصفحة
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = navbarHTML;

        // تفعيل الصفحة النشطة
        setActivePage();
    }
});

// دالة تفعيل الصفحة النشطة
function setActivePage() {
    // الحصول على اسم الصفحة الحالية
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // إضافة كلاس active للرابط المطابق
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // إزالة active من جميع الروابط
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        // إضافة active للصفحة الحالية
        if (href === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}



