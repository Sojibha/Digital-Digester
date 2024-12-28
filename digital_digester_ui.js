// JavaScript for enhanced interactivity, transitions, and visual effects with dynamic input styling

// Contact Us - Copy Number to Clipboard
document.querySelector('#contact-number span').addEventListener('click', function () {
    const phoneNumber = this.textContent;
    navigator.clipboard.writeText(phoneNumber).then(() => {
        alert('Phone number copied: ' + phoneNumber);
    }).catch(err => {
        alert('Failed to copy the phone number');
    });
});

// About Us - Redirect to ka1.html
document.querySelector('#about-us').addEventListener('click', function () {
    window.location.href = 'ka1.html';
});

// Toggle Sign Up Page
document.querySelector('.sign-up').addEventListener('click', function(event) {
    event.preventDefault();
    const signupSection = document.querySelector('.signup-section');
    signupSection.style.display = 'flex';
    signupSection.style.opacity = 0;
    signupSection.style.transition = 'opacity 0.5s ease';
    setTimeout(() => signupSection.style.opacity = 1, 0);
});

document.querySelector('.login-link').addEventListener('click', function(event) {
    event.preventDefault();
    const signupSection = document.querySelector('.signup-section');
    signupSection.style.transition = 'opacity 0.5s ease';
    signupSection.style.opacity = 0;
    setTimeout(() => signupSection.style.display = 'none', 500);
});

// Redirect to ka2.html with transition on successful login
document.querySelector('#login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Simple validation (you can replace this with server-side validation)
    if (email && password) {
        // Create transition effect
        const body = document.querySelector('body');
        body.style.transition = 'opacity 0.5s ease';
        body.style.opacity = 0;
        setTimeout(() => {
            window.location.href = 'ka2.html';
        }, 500);
    } else {
        alert('Please enter valid email and password');
    }
});

// Add hover transitions to social login buttons
document.querySelectorAll('.social-login').forEach(button => {
    button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = 'none';
    });
});

// Add fade-in animation for signup form
const signupSection = document.querySelector('.signup-section');
signupSection.style.opacity = 0;
signupSection.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => {
    signupSection.style.opacity = 1;
});

// Add transitions to primary buttons
document.querySelectorAll('.primary-button').forEach(button => {
    button.style.transition = 'background-color 0.3s ease, transform 0.3s ease';

    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});

// Animate login form and signup form input fields with focus and typing effect
const animateInputs = (selector) => {
    document.querySelectorAll(selector).forEach(input => {
        input.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';

        input.addEventListener('focus', () => {
            input.style.boxShadow = '0 0 8px rgba(60, 176, 67, 0.8)';
            input.style.transform = 'scale(1.05)';
        });

        input.addEventListener('blur', () => {
            input.style.boxShadow = 'none';
            input.style.transform = 'scale(1)';
        });

        input.addEventListener('input', () => {
            input.style.transform = 'scale(1.1)';
            input.style.boxShadow = '0 0 10px rgba(60, 176, 67, 1)';
        });
    });
};

// Apply animations to login and signup form inputs
animateInputs('#login-form input');
animateInputs('.signup-form input');
