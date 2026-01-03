document.addEventListener('DOMContentLoaded', () => {
  const aboutLink = document.getElementById('about-link');
  const aboutOverlay = document.getElementById('about-overlay');
  const closeAbout = document.getElementById('close-about');
  const logoContainer = document.getElementById('logo-container');
  const logoImg = document.getElementById('logo-img');

  // Open the About box
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Hide the logo
    logoContainer.style.display = 'none';
    // Show the about overlay
    aboutOverlay.classList.remove('hidden');
  });

 // Toggle about overlay on logo click
  logoImg.addEventListener('click', (e) => {
    e.preventDefault();
    if (aboutOverlay.classList.contains('hidden')) {
      // Open: hide logo, show overlay
      logoContainer.style.display = 'none';
      aboutOverlay.classList.remove('hidden');
    } else {
      // Close: show logo, hide overlay
      logoContainer.style.display = 'block';
      aboutOverlay.classList.add('hidden');
    }
  });

  // Close the About box
  closeAbout.addEventListener('click', () => {
    // Show the logo again
    logoContainer.style.display = 'block';
    // Hide the about overlay
    aboutOverlay.classList.add('hidden');
  });
});