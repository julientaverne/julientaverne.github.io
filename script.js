const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-locked");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    navigation.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-locked", willOpen);
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

document.querySelectorAll(".offer-range").forEach((range) => {
  range.addEventListener("toggle", (event) => {
    const opened = event.target;
    if (!(opened instanceof HTMLDetailsElement) || !opened.open) return;
    range.querySelectorAll("details[open]").forEach((details) => {
      if (details !== opened) details.open = false;
    });
  }, true);
});

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
