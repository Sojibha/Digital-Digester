// Toggle Password Visibility
document.querySelectorAll('.toggle-password').forEach((toggleBtn) => {
  toggleBtn.addEventListener('click', function () {
    const passwordField = this.previousElementSibling;
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      this.textContent = '🙈';
    } else {
      passwordField.type = 'password';
      this.textContent = '👁️';
    }
  });
});

// Modal Functionality
const modal = document.getElementById('sign-in-modal');
const signInLink = document.querySelector('.sign-in-link');
const closeModal = document.querySelector('.close-btn');

// Show Modal on Click
signInLink.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'flex';
});


// Close Modal on Click of Close Button
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close Modal on Outside Click
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
