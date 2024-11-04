document.addEventListener('DOMContentLoaded', (event) => {
  "use strict";

  const header = document.querySelector('#header');
  const content = document.querySelector('#content');
  const navMenu = document.querySelector('.nav-menu');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overly');

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function updateLayout() {
    if (isMobile()) {
      header.classList.add('mobile-view');
      header.classList.remove('header-top');
      content.style.paddingTop = header.offsetHeight + 'px'; // Ensure content starts after header
    } else {
      header.classList.remove('mobile-view');
      header.classList.remove('compact');
      content.style.paddingTop = '0';
    }
  }
  
  function handleScroll() {
    if (!isMobile() && window.pageYOffset > 100) {
      header.classList.add('header-top');
    } else {
      header.classList.remove('header-top');
    }
  }
  
  function handleNavigation(e) {
    e.preventDefault();
    let hash = this.hash;
    
    if (hash === "#header") {
      header.classList.remove('compact');
      content.classList.remove('content-show');
    } else if (hash !== "") {
      let target = document.querySelector(hash);
      
      if (target) {
        if (isMobile()) {
          header.classList.add('compact');
        } else {
          header.classList.add('header-top');
        }
        content.classList.add('content-show');
        
        document.querySelectorAll('section').forEach(section => {
          section.classList.remove('section-show');
        });
        
        target.classList.add('section-show');
      }
    }
  
    // Smooth scroll
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Attach click event to all navigation links
  document.querySelectorAll('.nav-menu a, .mobile-nav a').forEach(link => {
    link.addEventListener('click', handleNavigation);
  });

  // Mobile Navigation Toggle
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      document.body.classList.toggle('mobile-nav-active');
      document.body.style.overflow = document.body.classList.contains('mobile-nav-active') ? 'hidden' : ''; // Prevent scrolling
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
      mobileNavOverlay.classList.toggle('visible'); // Use class for styling instead of style property
    });
  }

  // Click outside of mobile nav to close it
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target) && document.body.classList.contains('mobile-nav-active')) {
      document.body.classList.remove('mobile-nav-active');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
      mobileNavOverlay.classList.remove('visible');
    }
  });  

  // Handle window events
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', function() {
    updateLayout();
    handleScroll();
  });

  // Initial setup
  updateLayout();
  handleScroll();

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    let initial_nav = document.querySelector(window.location.hash);
    if (initial_nav) {
      if (isMobile()) {
        header.classList.add('compact');
      } else {
        header.classList.add('header-top');
      }
      content.classList.add('content-show');
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
}
);