const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
let refreshBackToTop = () => {};

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-locked");
  refreshBackToTop();
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    navigation.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-locked", willOpen);
    refreshBackToTop();
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const navigationLinks = [...document.querySelectorAll(".navigation a[href^='#']")];
const navigationSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNavigation(sectionId) {
  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    if (isActive) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
}

if (navigationSections.length) {
  let navigationFrame = 0;
  const updateActiveNavigation = () => {
    const headerHeight = document.querySelector("[data-header]")?.offsetHeight || 0;
    const marker = window.scrollY + Math.max(headerHeight + 20, window.innerHeight * 0.22);
    const activeSection = navigationSections.reduce((active, section) => (
      section.offsetTop <= marker ? section : active
    ), navigationSections[0]);
    setActiveNavigation(activeSection.id);
  };
  const requestNavigationUpdate = () => {
    if (navigationFrame) return;
    navigationFrame = window.requestAnimationFrame(() => {
      updateActiveNavigation();
      navigationFrame = 0;
    });
  };

  updateActiveNavigation();
  window.addEventListener("scroll", requestNavigationUpdate, { passive: true });
  window.addEventListener("resize", requestNavigationUpdate);
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

  revealItems.forEach((item) => observer.observe(item));
}

const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");
const contactSubmit = document.querySelector("[data-contact-submit]");
const contactSubmitLabel = document.querySelector("[data-contact-submit-label]");

if (contactForm && contactStatus && contactSubmit && contactSubmitLabel) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    contactSubmit.disabled = true;
    contactSubmitLabel.textContent = "Envoi en cours…";
    contactStatus.classList.remove("is-error");
    contactStatus.textContent = "Votre demande est en cours d’envoi.";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Formspree request failed");

      contactForm.reset();
      contactStatus.textContent = "Merci. Votre message a bien été envoyé. Je vous répondrai rapidement.";
      contactSubmitLabel.textContent = "Message envoyé";
    } catch (error) {
      contactStatus.classList.add("is-error");
      contactStatus.textContent = "L’envoi n’a pas abouti. Vérifiez votre connexion puis réessayez, ou contactez-moi depuis un autre canal.";
      contactSubmitLabel.textContent = "Réessayer";
    } finally {
      contactSubmit.disabled = false;
    }
  });
}

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = String(new Date().getFullYear());
});

const backToTop = document.querySelector("[data-back-to-top]");

if (backToTop) {
  refreshBackToTop = () => {
    const shouldShow = !document.body.classList.contains("menu-locked")
      && window.scrollY > Math.max(640, window.innerHeight * 0.75);
    backToTop.classList.toggle("is-visible", shouldShow);
    backToTop.setAttribute("aria-hidden", String(!shouldShow));
    backToTop.tabIndex = shouldShow ? 0 : -1;
  };

  refreshBackToTop();
  window.addEventListener("scroll", refreshBackToTop, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
}
