// NEW HEADER FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuIcon = document.getElementById("mobile-menu-icon");
  const newNavLinks = document.getElementById("new-nav-links");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      newNavLinks.classList.toggle("active");
      const isOpen = newNavLinks.classList.contains("active");
      mobileMenuIcon.setAttribute(
        "class",
        isOpen ? "ri-close-line" : "ri-menu-line",
      );
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close menu when clicking links
    newNavLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        newNavLinks.classList.remove("active");
        mobileMenuIcon.setAttribute("class", "ri-menu-line");
        document.body.style.overflow = "";
      }
    });
  }

  // Header scroll effect
  const newHeader = document.querySelector(".new-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      newHeader.classList.add("scrolled");
    } else {
      newHeader.classList.remove("scrolled");
    }
  });

  // FIXED: Active link highlighting
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".new-nav-links a");

  function setActiveLink() {
    let scrollPosition = window.scrollY + 100; // Offset for header height + buffer

    // Special handling for footer/contact section
    const footer = document.getElementById("contact");
    if (footer) {
      const footerTop = footer.offsetTop;
      const footerHeight = footer.clientHeight;
      const windowHeight = window.innerHeight;

      // If we're near the bottom of the page or in the footer section
      if (
        scrollPosition + windowHeight >=
          document.documentElement.scrollHeight - 100 ||
        (scrollPosition >= footerTop - 100 &&
          scrollPosition <= footerTop + footerHeight)
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#contact") {
            link.classList.add("active");
          }
        });
        return;
      }
    }

    // Regular section handling
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Set initial active link
  setActiveLink();

  // Update active link on scroll
  window.addEventListener("scroll", setActiveLink);

  // Also update active link on click
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // If clicking a link, scroll to section
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Close mobile menu if open
          if (newNavLinks.classList.contains("active")) {
            newNavLinks.classList.remove("active");
            mobileMenuIcon.setAttribute("class", "ri-menu-line");
            document.body.style.overflow = "";
          }

          // Scroll to element with offset for fixed header
          const headerHeight =
            document.querySelector(".new-header").offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Update URL hash without scrolling
          history.pushState(null, null, href);
        }
      }
    });
  });

  // Initialize date inputs
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const checkInInput = document.getElementById("check-in");
  const checkOutInput = document.getElementById("check-out");

  if (checkInInput && checkOutInput) {
    checkInInput.value = today;
    checkInInput.min = today;
    checkOutInput.value = tomorrowStr;
    checkOutInput.min = today;

    // Update check-out min date when check-in changes
    checkInInput.addEventListener("change", () => {
      checkOutInput.min = checkInInput.value;
      if (new Date(checkOutInput.value) < new Date(checkInInput.value)) {
        checkOutInput.value = checkInInput.value;
      }
    });
  }

  // Form submission
  const bookingForm = document.querySelector(".booking__form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML =
        '<i class="ri-loader-4-line animate-spin"></i> Checking...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert(
          "Thank you! We're checking availability and will contact you shortly.",
        );
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Add loading animation style
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `;
  document.head.appendChild(style);
});

// Scroll reveal animations
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
  interval: 100,
};

// Initialize ScrollReveal
if (typeof ScrollReveal !== "undefined") {
  // Hero content
  ScrollReveal().reveal(".hero-subtitle", {
    ...scrollRevealOption,
    delay: 300,
  });

  ScrollReveal().reveal(".hero-title", {
    ...scrollRevealOption,
    delay: 500,
  });

  ScrollReveal().reveal(".hero-description", {
    ...scrollRevealOption,
    delay: 700,
  });

  ScrollReveal().reveal(".hero-cta", {
    ...scrollRevealOption,
    delay: 900,
  });

  // About section
  ScrollReveal().reveal(".about__content", {
    ...scrollRevealOption,
    origin: "left",
  });

  ScrollReveal().reveal(".about__image", {
    ...scrollRevealOption,
    origin: "right",
    delay: 300,
  });

  // Room cards
  ScrollReveal().reveal(".room__card", {
    ...scrollRevealOption,
    interval: 200,
  });

  // Service items
  ScrollReveal().reveal(".service__list li", {
    ...scrollRevealOption,
    interval: 200,
    origin: "right",
  });

  // Banner cards
  ScrollReveal().reveal(".banner__card", {
    ...scrollRevealOption,
    interval: 200,
  });
}
