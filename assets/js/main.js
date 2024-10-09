document.addEventListener('DOMContentLoaded', (event) => {
  "use strict";

  const header = document.querySelector('#header');
  const content = document.querySelector('#content');
  const navMenu = document.querySelector('.nav-menu');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overly');
  let headerHeight;

  function updateHeaderHeight() {
    headerHeight = header.offsetHeight;
    if (window.innerWidth <= 768) {  // Mobile view
      content.style.paddingTop = `${headerHeight}px`;
      header.classList.add('mobile-view');
    } else {  // Desktop view
      content.style.paddingTop = '0';
      header.classList.remove('mobile-view');
    }
  }

  function handleScroll() {
    if (window.pageYOffset > 100 && window.innerWidth > 768) {
      header.classList.add('header-top');
    } else {
      header.classList.remove('header-top');
    }
  }

  window.addEventListener('scroll', () => {
    handleScroll();
    updateHeaderHeight();
  });

  window.addEventListener('resize', () => {
    updateHeaderHeight();
    handleScroll();
  });

  // Initial check for header state and height
  updateHeaderHeight();
  handleScroll();

  // Smooth scroll for navigation links
  document.querySelectorAll('.nav-menu a, .mobile-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      let hash = this.hash;
      
      if (hash === "#header") {
        // Home button clicked
        header.classList.remove('header-top');
        document.querySelectorAll('section').forEach(section => {
          section.classList.remove('section-show');
        });
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else if (hash !== "") {
        let target = document.querySelector(hash);
        
        if (target) {
          header.classList.add('header-top');
          
          // Remove 'section-show' from all sections
          document.querySelectorAll('section').forEach(section => {
            section.classList.remove('section-show');
          });
          
          // Add 'section-show' to the target section
          target.classList.add('section-show');

          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
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
        mobileNavToggle.classList.toggle('fa-bars');
        mobileNavToggle.classList.toggle('fa-times');
        mobileNavOverlay.style.display = 'none';
      }
    });
  });

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
        document.querySelectorAll('section').forEach(section => {
          section.classList.remove('section-show');
        });
        initial_nav.classList.add('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      document.body.classList.toggle('mobile-nav-active');
      this.classList.toggle('fa-bars');
      this.classList.toggle('fa-times');
      mobileNavOverlay.style.display = 
        mobileNavOverlay.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Click outside of mobile nav to close it
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target) && document.body.classList.contains('mobile-nav-active')) {
      document.body.classList.remove('mobile-nav-active');
      mobileNavToggle.classList.toggle('fa-bars');
      mobileNavToggle.classList.toggle('fa-times');
      mobileNavOverlay.style.display = 'none';
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 992) {
      document.body.classList.remove('mobile-nav-active');
      mobileNavToggle.classList.remove('fa-times');
      mobileNavToggle.classList.add('fa-bars');
      mobileNavOverlay.style.display = 'none';
    }
    updateHeaderHeight();
  });
});