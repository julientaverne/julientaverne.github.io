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

const offerDialogTriggers = [...document.querySelectorAll("[data-modal-dialog]")];
const offerDialogs = [...document.querySelectorAll(".offer-dialog")];
let activeDialogTrigger = null;
let restoreDialogFocus = true;

function closeOfferDialog(dialog) {
  if (!dialog?.hasAttribute("open")) return;
  if (typeof dialog.close === "function") {
    dialog.close();
    return;
  }
  dialog.removeAttribute("open");
  dialog.dispatchEvent(new Event("close"));
}

offerDialogTriggers.forEach((trigger) => {
  const dialogId = trigger.dataset.modalDialog;
  const dialog = document.getElementById(dialogId);
  if (!dialog) return;

  trigger.setAttribute("aria-controls", dialogId);
  trigger.addEventListener("click", () => {
    activeDialogTrigger = trigger;
    restoreDialogFocus = true;
    document.body.classList.add("modal-open");
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.classList.add("is-fallback");
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("open", "");
      dialog.querySelector("[data-dialog-close]")?.focus();
    }
    refreshBackToTop();
  });
});

offerDialogs.forEach((dialog) => {
  dialog.querySelectorAll("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", () => closeOfferDialog(dialog));
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeOfferDialog(dialog);
  });

  dialog.querySelectorAll("[data-dialog-contact]").forEach((link) => {
    link.addEventListener("click", () => {
      const contactNeed = contactForm?.elements.namedItem("need");
      if (contactNeed instanceof HTMLSelectElement && link.dataset.contactNeed) {
        contactNeed.value = link.dataset.contactNeed;
        contactNeed.dispatchEvent(new Event("change", { bubbles: true }));
      }
      restoreDialogFocus = false;
      closeOfferDialog(dialog);
    });
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    dialog.classList.remove("is-fallback");
    refreshBackToTop();
    if (restoreDialogFocus) activeDialogTrigger?.focus();
    activeDialogTrigger = null;
    restoreDialogFocus = true;
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const openFallbackDialog = document.querySelector(".offer-dialog.is-fallback[open]");
  if (openFallbackDialog) closeOfferDialog(openFallbackDialog);
});

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = String(new Date().getFullYear());
});

const backToTop = document.querySelector("[data-back-to-top]");

if (backToTop) {
  refreshBackToTop = () => {
    const shouldShow = !document.body.classList.contains("menu-locked")
      && !document.body.classList.contains("modal-open")
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
