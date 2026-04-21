document.addEventListener('DOMContentLoaded', () => {
  const aboutLink = document.getElementById('about-link');
  const aboutOverlay = document.getElementById('about-overlay');
  const closeAbout = document.getElementById('close-about');
  const logoContainer = document.getElementById('logo-container');
  const logoImg = document.getElementById('logo-img');

  const openAbout = () => {
    logoContainer.classList.add('hidden');
    aboutOverlay.classList.remove('hidden');
  };

  const closeAboutBox = () => {
    logoContainer.classList.remove('hidden');
    aboutOverlay.classList.add('hidden');
  };

  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    openAbout();
  });

  logoImg.addEventListener('click', (e) => {
    e.preventDefault();
    if (aboutOverlay.classList.contains('hidden')) {
      openAbout();
    } else {
      closeAboutBox();
    }
  });

  closeAbout.addEventListener('click', () => {
    closeAboutBox();
  });

  aboutOverlay.addEventListener('click', (e) => {
    if (e.target === aboutOverlay) {
      closeAboutBox();
    }
  });
});