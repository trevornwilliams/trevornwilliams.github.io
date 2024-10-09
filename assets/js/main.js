document.addEventListener('DOMContentLoaded', (event) => {
  "use strict";

  const header = document.querySelector('#header');
  const content = document.querySelector('#content');
  const navMenu = document.querySelector('.nav-menu');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overly');
  let headerHeight;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function updateHeaderHeight() {
    headerHeight = header.offsetHeight;
    if (isMobile()) {
      content.style.paddingTop = `${headerHeight}px`;
      header.classList.add('mobile-view');
    } else {
      content.style.paddingTop = '0';
      header.classList.remove('mobile-view');
    }
  }

  function handleScroll() {
    if (window.pageYOffset > 100 && !isMobile()) {
      header.classList.add('header-top');
    } else if (!isMobile()) {
      header.classList.remove('header-top');
    }
  }

  function handleNavigation(e) {
    e.preventDefault();
    let hash = this.hash;
    
    if (hash === "#header") {
      // Home button clicked
      header.classList.remove('header-top');
      content.classList.remove('content-show');
      document.querySelectorAll('section').forEach(section => {
        section.classList.remove('section-show');
      });
    } else if (hash !== "") {
      let target = document.querySelector(hash);
      
      if (target) {
        header.classList.add('header-top');
        content.classList.add('content-show');
        
        document.querySelectorAll('section').forEach(section => {
          section.classList.remove('section-show');
        });
        
        target.classList.add('section-show');
      }
    }

    // Update active class
    document.querySelectorAll('.nav-menu .active, .mobile-nav .active').forEach(item => {
      item.classList.remove('active');
    });
    this.closest('li').classList.add('active');

    // Close mobile nav if open
    if (document.body.classList.contains('mobile-nav-active')) {
      document.body.classList.remove('mobile-nav-active');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
      mobileNavOverlay.style.display = 'none';
    }

    // Scroll to top on mobile
    if (isMobile()) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // Attach click event to all navigation links
  document.querySelectorAll('.nav-menu a, .mobile-nav a').forEach(link => {
    link.addEventListener('click', handleNavigation);
  });

  // Mobile Navigation Toggle
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      document.body.classList.toggle('mobile-nav-active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
      mobileNavOverlay.style.display = 
        mobileNavOverlay.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Click outside of mobile nav to close it
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target) && document.body.classList.contains('mobile-nav-active')) {
      document.body.classList.remove('mobile-nav-active');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
      mobileNavOverlay.style.display = 'none';
    }
  });

  // Handle window events
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', function() {
    updateHeaderHeight();
    handleScroll();
    if (!isMobile()) {
      document.body.classList.remove('mobile-nav-active');
      mobileNavToggle.classList.remove('bi-x');
      mobileNavToggle.classList.add('bi-list');
      mobileNavOverlay.style.display = 'none';
      header.classList.remove('header-top');
      content.classList.remove('content-show');
    }
  });

  // Initial setup
  updateHeaderHeight();
  handleScroll();

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    let initial_nav = document.querySelector(window.location.hash);
    if (initial_nav) {
      header.classList.add('header-top');
      document.querySelectorAll('.nav-menu .active, .mobile-nav .active').forEach(item => {
        item.classList.remove('active');
      });
      document.querySelector(`.nav-menu a[href*='${window.location.hash}']`).parentElement.classList.add('active');
      document.querySelector(`.mobile-nav a[href*='${window.location.hash}']`).parentElement.classList.add('active');
      setTimeout(() => {
        initial_nav.classList.add('section-show');
      }, 350);
    }
  }
});