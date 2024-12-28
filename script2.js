document.addEventListener('DOMContentLoaded', () => {
    // Sidebar toggle logic
    const sidebar = document.getElementById('sidebar');
    const contentsToggle = document.getElementById('contents-toggle');
    const closeSidebar = document.getElementById('close-sidebar');

    contentsToggle.addEventListener('click', () => {
        sidebar.style.transform = 'translateX(0)';
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.style.transform = 'translateX(-100%)';
    });

    // Glow effect logic
    function addGlowEffect(event) {
        event.target.classList.add('glow');
    }

    function removeGlowEffect(event) {
        event.target.classList.remove('glow');
    }

    // Add glow effect to all text and buttons
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, ul li, .sidebar-button, .contents-link, .profile-icon');

    textElements.forEach((element) => {
        element.addEventListener('mouseover', addGlowEffect);
        element.addEventListener('mouseout', removeGlowEffect);
    });

    // Glow effect for profile dropdown buttons
    const profileDropdownItems = document.querySelectorAll('.profile-menu li a');

    profileDropdownItems.forEach((item) => {
        item.addEventListener('mouseover', addGlowEffect);
        item.addEventListener('mouseout', removeGlowEffect);
    });

    // Glow effect for chatbot
    const chatbotContainer = document.getElementById('chatbot-container-1');
    const chatbotToggle = document.getElementById('chatbot-toggle-1');

    chatbotContainer.addEventListener('mouseover', addGlowEffect);
    chatbotContainer.addEventListener('mouseout', removeGlowEffect);

    chatbotToggle.addEventListener('mouseover', addGlowEffect);
    chatbotToggle.addEventListener('mouseout', removeGlowEffect);
});
