document.addEventListener('DOMContentLoaded', () => {
    // Glow effect for text
    function addGlowEffect(event) {
        if (['P', 'H1', 'H2', 'H3', 'H4', 'H5'].includes(event.target.tagName)) {
            event.target.classList.add('glow');
        }
    }

    function removeGlowEffect(event) {
        if (['P', 'H1', 'H2', 'H3', 'H4', 'H5'].includes(event.target.tagName)) {
            event.target.classList.remove('glow');
        }
    }

    // Add glow effect to all text elements
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5');

    textElements.forEach((element) => {
        element.addEventListener('mouseover', addGlowEffect);
        element.addEventListener('mouseout', removeGlowEffect);
    });

    // Highlight specific content
    const projectDescription = document.querySelector('.project-description');

    if (projectDescription) {
        projectDescription.addEventListener('mouseover', () => {
            projectDescription.classList.add('glow');
        });

        projectDescription.addEventListener('mouseout', () => {
            projectDescription.classList.remove('glow');
        });
    }

    // Add click-to-enlarge effect for images
    const images = document.querySelectorAll('img');

    images.forEach((image) => {
        image.style.transition = 'transform 0.3s ease-in-out';

        image.addEventListener('mouseover', () => {
            image.style.transform = 'scale(1.05)';
        });

        image.addEventListener('mouseout', () => {
            image.style.transform = 'scale(1)';
        });

        image.addEventListener('click', () => {
            const isEnlarged = image.classList.toggle('enlarged');
            image.style.transform = isEnlarged ? 'scale(2)' : 'scale(1)';
        });
    });
});
