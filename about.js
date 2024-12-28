// Country and State Data
const countries = {
    "United States": ["Alabama", "Alaska", "California", "New York"],
    Canada: ["Ontario", "Quebec", "British Columbia"],
    Australia: ["Victoria", "Queensland", "New South Wales"]
  };
  
  // Populate Country Dropdown
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");
  
  Object.keys(countries).forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  });
  
  // Populate State Dropdown
  function populateStates() {
    stateSelect.innerHTML = '<option value="">Select State</option>';
    const selectedCountry = countrySelect.value;
  
    if (selectedCountry && countries[selectedCountry]) {
      countries[selectedCountry].forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
      });
    }
  }
  
  // Preview uploaded photo
  function previewPhoto() {
    const fileInput = document.getElementById("photo-upload-input");
    const preview = document.getElementById("photo-preview");
  
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Photo">`;
      };
      reader.readAsDataURL(file);
    }
  }
  
  // Create stars in the background
  const starsContainer = document.getElementById("stars");
  
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    starsContainer.appendChild(star);
  }
  