document.addEventListener('DOMContentLoaded', (event) => {
  "use strict";

  // Smooth scroll for navigation links
  document.querySelectorAll('.nav-menu a, .mobile-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        let hash = this.hash;
        let target = document.querySelector(hash);
        if (target) {
          // Remove active class from all nav items
          document.querySelectorAll('.nav-menu .active, .mobile-nav .active').forEach(item => {
            item.classList.remove('active');
          });
          // Add active class to clicked nav item
          this.closest('li').classList.add('active');

          if (hash === '#header') {
            document.querySelector('#header').classList.remove('header-top');
            document.querySelectorAll('section').forEach(section => {
              section.classList.remove('section-show');
            });
            return;
          }

          if (!document.querySelector('#header').classList.contains('header-top')) {
            document.querySelector('#header').classList.add('header-top');
            setTimeout(function() {
              document.querySelectorAll('section').forEach(section => {
                section.classList.remove('section-show');
              });
              document.querySelector(hash).classList.add('section-show');
            }, 350);
          } else {
            document.querySelectorAll('section').forEach(section => {
              section.classList.remove('section-show');
            });
            document.querySelector(hash).classList.add('section-show');
          }

          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

          if (document.body.classList.contains('mobile-nav-active')) {
            document.body.classList.remove('mobile-nav-active');
            let navbarToggle = document.querySelector('.mobile-nav-toggle');
            navbarToggle.classList.toggle('fa-bars');
            navbarToggle.classList.toggle('fa-times');
            document.querySelector('.mobile-nav-overly').style.display = 'none';
          }
        }
      }
    });
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    let initial_nav = window.location.hash;
    if (document.querySelector(initial_nav)) {
      document.querySelector('#header').classList.add('header-top');
      document.querySelectorAll('.nav-menu .active, .mobile-nav .active').forEach(item => {
        item.classList.remove('active');
      });
      document.querySelector('.nav-menu a[href*=' + initial_nav + ']').parentElement.classList.add('active');
      document.querySelector('.mobile-nav a[href*=' + initial_nav + ']').parentElement.classList.add('active');
      setTimeout(function() {
        document.querySelectorAll('section').forEach(section => {
          section.classList.remove('section-show');
        });
        document.querySelector(initial_nav).classList.add('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  let mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      document.body.classList.toggle('mobile-nav-active');
      this.classList.toggle('fa-bars');
      this.classList.toggle('fa-times');
      document.querySelector('.mobile-nav-overly').style.display = 
        document.querySelector('.mobile-nav-overly').style.display === 'block' ? 'none' : 'block';
    });
  }

  // Click outside of mobile nav to close it
  document.addEventListener('click', function(e) {
    let selectMobile = document.querySelector('.mobile-nav, .mobile-nav-toggle');
    if (!selectMobile.contains(e.target) && document.body.classList.contains('mobile-nav-active')) {
      document.body.classList.remove('mobile-nav-active');
      let navbarToggle = document.querySelector('.mobile-nav-toggle');
      navbarToggle.classList.toggle('fa-bars');
      navbarToggle.classList.toggle('fa-times');
      document.querySelector('.mobile-nav-overly').style.display = 'none';
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 992) {
      document.body.classList.remove('mobile-nav-active');
      document.querySelector('.mobile-nav-toggle').classList.remove('fa-times');
      document.querySelector('.mobile-nav-toggle').classList.add('fa-bars');
      document.querySelector('.mobile-nav-overly').style.display = 'none';
    }
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  const header = document.querySelector('#header');
  const headerHeight = header.offsetHeight;
  const sections = document.querySelectorAll('section');

  function handleScroll() {
    if (window.pageYOffset > 100) {
      header.classList.add('header-top');
    } else {
      header.classList.remove('header-top');
    }
  }

  window.addEventListener('scroll', handleScroll);

  // Smooth scroll and section activation
  document.querySelectorAll('.nav-menu a, .mobile-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        let hash = this.hash;
        let target = document.querySelector(hash);
        
        if (target) {
          header.classList.add('header-top');
          
          window.scrollTo({
            top: target.offsetTop - header.offsetHeight,
            behavior: 'smooth'
          });

          // Update active class
          document.querySelectorAll('.nav-menu .active, .mobile-nav .active').forEach(item => {
            item.classList.remove('active');
          });
          this.closest('li').classList.add('active');
        }
      }
    });
  });

  // Initial check for header state
  handleScroll();
});