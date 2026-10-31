/*
  Priyojit's contact details are configured below.
  Add an Instagram URL only if you want that optional link enabled.
*/
const PROFILE = {
  email: "priyojitchowdhury2001@gmail.com",
  github: "https://github.com/priyojit04",
  linkedin: "https://www.linkedin.com/in/priyojit-chowdhury-506694252/",
  instagram: ""
};

// EmailJS configuration. Service, template and public key configured from your dashboard.
// The Public Key is designed for browser use; NEVER put a Private Key here.
const EMAILJS_CONFIG = {
  publicKey: "2vbE_rIu0WDBpftTU",
  serviceId: "service_a09if3u",
  templateId: "template_38wan0a"
};

const isEmailJSConfigured = Object.values(EMAILJS_CONFIG).every(value =>
  typeof value === "string" && value.trim() && !value.startsWith("YOUR_EMAILJS_")
);

let emailJSReady = false;
if (isEmailJSConfigured && window.emailjs) {
  try {
    window.emailjs.init({
      publicKey: EMAILJS_CONFIG.publicKey,
      limitRate: {
        id: "priyojit-portfolio-contact",
        throttle: 10000
      }
    });
    emailJSReady = true;
  } catch (error) {
    console.error("EmailJS initialisation failed:", error);
  }
}

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// Mobile navigation
const menuToggle = $("#menuToggle");
const primaryNav = $("#primaryNav");
if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });
  $$("a", primaryNav).forEach(link => link.addEventListener("click", () => {
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }));
}

// Dark / light theme with saved preference
const themeToggle = $("#themeToggle");
try {
  const savedTheme = localStorage.getItem("priyojit-portfolio-theme");
  if (savedTheme === "light") document.body.classList.add("light-theme");
} catch (_) { /* local storage may be disabled; default theme still works */ }
function updateThemeButton() {
  const isLight = document.body.classList.contains("light-theme");
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    themeToggle.setAttribute("title", isLight ? "Switch to dark theme" : "Switch to light theme");
  }
}
updateThemeButton();
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    updateThemeButton();
    try {
      localStorage.setItem("priyojit-portfolio-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
    } catch (_) { /* no-op */ }
  });
}

// Typing text
const typedRole = $("#typedRole");
const roleWords = ["Developer", "CSE Student", "Problem Solver", "Tech Enthusiast"];
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function typeNext() {
  if (!typedRole) return;
  const word = roleWords[wordIndex];
  letterIndex += isDeleting ? -1 : 1;
  typedRole.textContent = word.slice(0, letterIndex);
  let delay = isDeleting ? 45 : 85;
  if (!isDeleting && letterIndex === word.length) {
    isDeleting = true;
    delay = 1250;
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % roleWords.length;
    delay = 300;
  }
  window.setTimeout(typeNext, delay);
}
if (typedRole) {
  if (reduceMotion) typedRole.textContent = roleWords[0];
  else window.setTimeout(typeNext, 500);
}

// Scroll reveal (fallback: display content if IntersectionObserver is unavailable)
const revealItems = $$(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

// Small animated background stars
const starField = $("#starField");
if (starField && !reduceMotion) {
  const count = window.innerWidth < 600 ? 14 : 28;
  for (let i = 0; i < count; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${12 + Math.random() * 20}s`;
    star.style.animationDelay = `${-Math.random() * 25}s`;
    star.style.opacity = `${0.15 + Math.random() * 0.4}`;
    starField.appendChild(star);
  }
}

// Page reading progress
const pageProgress = $("#pageProgress");
function updatePageProgress() {
  if (!pageProgress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  pageProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}
window.addEventListener("scroll", updatePageProgress, { passive: true });
updatePageProgress();

// Active navigation section
const navLinks = $$(".nav-link");
const observedSections = $$("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  observedSections.forEach(section => sectionObserver.observe(section));
}

// Social profile links: set real URLs in PROFILE above. Empty links remain safe.
const toast = $("#toast");
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}
$$("[data-profile-link]").forEach(link => {
  const key = link.dataset.profileLink;
  if (PROFILE[key]) {
    link.href = PROFILE[key];
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.addEventListener("click", event => {
      event.preventDefault();
      showToast(`Add your ${key} profile URL in script.js to activate this link.`);
    });
  }
});

// Contact form sends directly from the website through EmailJS.
// The recipient address is fixed in the EmailJS template, not supplied by visitors.
const contactForm = $("#contactForm");
const formHint = $("#formHint");
if (contactForm) {
  contactForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!isEmailJSConfigured) {
      const message = "The contact form is not connected yet. Complete the three EmailJS settings in script.js and follow EMAILJS-SETUP.md.";
      if (formHint) formHint.textContent = message;
      showToast("EmailJS setup is required before messages can be sent.");
      return;
    }

    if (!window.emailjs || !emailJSReady) {
      const message = "The email service could not load. Check your internet connection and refresh the page.";
      if (formHint) formHint.textContent = message;
      showToast("Email service unavailable. Please try again.");
      return;
    }

    const submitButton = $("button[type='submit']", contactForm);
    const originalButtonHTML = submitButton ? submitButton.innerHTML : "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
    if (formHint) formHint.textContent = "Sending your message securely...";

    try {
      await window.emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        contactForm
      );
      contactForm.reset();
      if (formHint) formHint.textContent = "Thanks! Your message was sent successfully.";
      showToast("Message sent successfully. Thank you!");
    } catch (error) {
      console.error("EmailJS send failed:", error);
      if (formHint) formHint.textContent = "Your message could not be sent. Please try again later or email priyojitchowdhury2001@gmail.com directly.";
      showToast("Message not sent. Please try again.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
      }
    }
  });
}

// Current year
const currentYear = $("#currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();


// =====================================
// Invisible Portfolio Background Music
// =====================================

(() => {
  const music = new Audio(
    "./assets/background-music.mp3.mp3"
  );

  music.loop = true;
  music.volume = 0.25;

  let musicStarted = false;

  function startMusic() {
    if (musicStarted) return;

    musicStarted = true;

    music.play().catch(() => {
      musicStarted = false;
    });
  }

  // Start music on the visitor's first interaction
  document.addEventListener("click", startMusic, {
    once: true
  });

  // Stop music when visitor switches tabs
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      music.pause();
    } else if (musicStarted) {
      music.play().catch(() => {});
    }
  });

  // Stop when leaving the page
  window.addEventListener("pagehide", () => {
    music.pause();
  });
})();
