// script.js
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

// Mobile menu toggle
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
  document.body.style.overflow = isOpen ? "hidden" : "";
});

// Close menu when clicking links
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
    document.body.style.overflow = "";
  }
});

// Initialize date inputs
document.addEventListener("DOMContentLoaded", () => {
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

      const submitBtn = bookingForm.querySelector("button[type='submit']");
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
  // Header content
  ScrollReveal().reveal(".header-subtitle", {
    ...scrollRevealOption,
    delay: 300,
  });

  ScrollReveal().reveal(".header__container h1", {
    ...scrollRevealOption,
    delay: 500,
  });

  ScrollReveal().reveal(".header-cta", {
    ...scrollRevealOption,
    delay: 700,
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

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
    nav.style.backdropFilter = "blur(10px)";
  } else {
    nav.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
    nav.style.backdropFilter = "blur(10px)";
  }
});
