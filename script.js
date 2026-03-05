// script.js - Complete Working Version for LearnSmart Tutoring

// 1. Welcome message and year update
window.onload = function() {
    console.log("Welcome to LearnSmart Tutoring!");
    
    // Add current year to copyright
    const year = new Date().getFullYear();
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.innerHTML = `&copy; ${year} LearnSmart Tutoring. All rights reserved.`;
    }
};

// 2. Form validation for contact page
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop form from submitting
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert(`Thank you ${name}! Your message has been sent. We'll respond to ${email} within 24 hours.`);
        
        // Clear the form
        contactForm.reset();
    });
}

// 3. Add "Book Session" button to tutor profiles (only on tutors page)
const tutorProfiles = document.querySelectorAll('main div');
tutorProfiles.forEach((profile) => {
    // Only add button to divs that contain tutor info
    if (profile.querySelector('h3')) {
        const bookButton = document.createElement('button');
        bookButton.textContent = 'Book a Session';
        
        bookButton.addEventListener('click', function() {
            const tutorName = profile.querySelector('h3').textContent;
            alert(`Booking request sent for ${tutorName}. We'll contact you soon!`);
        });
        
        profile.appendChild(bookButton);
    }
});

// 4. Add search functionality for subjects page
const subjectsPage = document.querySelector('h2');
if (subjectsPage && subjectsPage.textContent === 'Subjects We Teach') {
    // Create search box
    const searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.placeholder = '🔍 Search subjects...';
    searchBox.className = 'search-box';
    
    // Insert after h2
    subjectsPage.insertAdjacentElement('afterend', searchBox);
    
    // Get all subject lists
    const subjectLists = document.querySelectorAll('main ul');
    
    // Add search functionality
    searchBox.addEventListener('keyup', function() {
        const searchTerm = searchBox.value.toLowerCase();
        
        subjectLists.forEach(list => {
            const items = list.getElementsByTagName('li');
            let hasVisibleItems = false;
            
            Array.from(items).forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Hide category if no visible items
            const category = list.previousElementSibling;
            if (category && category.tagName === 'H3') {
                if (hasVisibleItems) {
                    category.style.display = '';
                    list.style.display = '';
                } else {
                    category.style.display = 'none';
                    list.style.display = 'none';
                }
            }
        });
    });
}

// 5. Add "Back to Top" button to all pages
const backToTop = document.createElement('button');
backToTop.textContent = '↑ Back to Top';
backToTop.setAttribute('aria-label', 'Back to top');

document.body.appendChild(backToTop);

// Show/hide button based on scroll position
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Scroll to top when clicked
backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 6. Highlight current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.style.backgroundColor = '#3498db';
        link.style.borderRadius = '4px';
    }
});