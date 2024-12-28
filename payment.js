// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("paymentForm");
  
    // Handle form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
  
      if (name) {
        alert(`Thanks For Purchasing, ${name}! 😀`);
        form.reset();
      }
    });
  });
  
  // Flip animation for fish and birds
  function flipElement(element) {
    element.style.transition = "transform 1s";
    element.style.transform = "rotate(180deg)";
    setTimeout(() => {
      element.style.transform = "rotate(0deg)";
    }, 1000);
  }
  function handleSupportClick() {
    console.log("Redirecting to Contact Support...");
    // Any other logic you want to add before the redirection
  }
  
  
  