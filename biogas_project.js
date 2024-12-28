// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery hover effect with border and shadow
const galleryImages = document.querySelectorAll('.gallery img');
galleryImages.forEach(image => {
    image.style.border = '5px solid rgb(130, 144, 131)';
    image.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    image.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease';

    image.addEventListener('mouseover', () => {
        image.style.transform = 'scale(1.1)';
        image.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.4)';
    });

    image.addEventListener('mouseout', () => {
        image.style.transform = 'scale(1)';
        image.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    });
});

// Apply click effect to digester and impact images
const figureImages = [document.getElementById('digester'), document.getElementById('impact')];
figureImages.forEach(image => {
    image.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease';

    image.addEventListener('click', () => {
        image.style.transform = 'scale(1.3)';
        image.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.5)';
        setTimeout(() => {
            image.style.transform = 'scale(1)';
            image.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        }, 500);
    });
});

// Add text highlight effect on hover
const textElements = document.querySelectorAll('p, h1, h2, a');
textElements.forEach(text => {
    text.style.transition = 'color 0.3s ease, background-color 0.3s ease';

    text.addEventListener('mouseover', () => {
        text.style.color = '#fff';
        text.style.backgroundColor = '#3CB043';
        text.style.borderRadius = '5px';
        text.style.padding = '2px 5px';
    });

    text.addEventListener('mouseout', () => {
        text.style.color = '';
        text.style.backgroundColor = '';
        text.style.borderRadius = '';
        text.style.padding = '';
    });
});

// Add image modal functionality
galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        const modalImage = document.createElement('img');
        modalImage.src = image.src;
        modalImage.style.maxWidth = '90%';
        modalImage.style.maxHeight = '90%';
        modalImage.style.border = '5px solid white';
        modalImage.style.borderRadius = '10px';
        modalImage.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';

        modal.appendChild(modalImage);

        // Close modal on click
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        document.body.appendChild(modal);
    });
});

// Header shrink effect on scroll with color transition
const header = document.querySelector('header');
header.style.transition = 'padding 0.3s ease, background-color 0.3s ease';

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = '#2e8b57';
    } else {
        header.style.padding = '20px 0';
        header.style.backgroundColor = '#3CB043';
    }
});

// Add a fade-in animation to sections on scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    },
    { threshold: 0.3 }
);

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
    observer.observe(section);
});
