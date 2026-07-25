// ===== CURSOR SPOTLIGHT EFFECT =====
const createCursorSpotlight = () => {
  const spotlight = document.createElement("div");
  spotlight.classList.add("cursor-spotlight");
  document.body.appendChild(spotlight);

  let mouseX = 0;
  let mouseY = 0;
  let spotlightX = 0;
  let spotlightY = 0;

  // Update mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation loop
  const animateSpotlight = () => {
    spotlightX += (mouseX - spotlightX) * 0.2;
    spotlightY += (mouseY - spotlightY) * 0.2;

    spotlight.style.left = spotlightX + "px";
    spotlight.style.top = spotlightY + "px";

    requestAnimationFrame(animateSpotlight);
  };

  animateSpotlight();
};

// ===== INTERACTIVE CARD ANIMATIONS =====
const initCardAnimations = () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    // Stagger animation on page load
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);

    // Mouse move effect for depth
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) * 0.1;
      const rotateY = (centerX - x) * 0.1;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    });
  });
};

// ===== BUTTON RIPPLE EFFECT =====
const initButtonRipple = () => {
  const buttons = document.querySelectorAll(".btn, button");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.width = "0";
      ripple.style.height = "0";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.5)";
      ripple.style.pointerEvents = "none";
      ripple.style.animation = "rippleEffect 0.6s ease-out";

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
};

// ===== SCROLL REVEAL ANIMATIONS =====
const initScrollReveal = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease forwards";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".card, .features, .cta-section").forEach((el) => {
    observer.observe(el);
  });
};

// ===== FORM SUBMISSION =====
const initFormHandler = () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Success animation
      const btn = form.querySelector("button");
      const originalText = btn.textContent;

      btn.textContent = "✓ Sent Successfully!";
      btn.style.background =
        "linear-gradient(135deg, #10b981 0%, #34d399 100%)";

      setTimeout(() => {
        btn.textContent = originalText;
        form.reset();
      }, 2000);
    });
  }
};

// ===== SMOOTH SCROLL LINKS =====
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
};

// ===== RIPPLE ANIMATION KEYFRAMES =====
const addRippleStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes rippleEffect {
      to {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};
document.addEventListener("DOMContentLoaded", () => {
  // Check if glow element already exists; if not, create it dynamically
  let glow = document.getElementById("cursor-glow");
  if (!glow) {
    glow = document.createElement("div");
    glow.id = "cursor-glow";
    document.body.appendChild(glow);
  }

  // Track mouse cursor across all pages
  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
});

// ===== INITIALIZE ALL ON PAGE LOAD =====
document.addEventListener("DOMContentLoaded", () => {
  createCursorSpotlight();
  initCardAnimations();
  initButtonRipple();
  initScrollReveal();
  initFormHandler();
  initSmoothScroll();
  addRippleStyles();
});
