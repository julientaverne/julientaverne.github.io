const data = window.PROFILE_DATA;

const escapeText = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");
const plusIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>';
const missionDetailHeadings = new Map([
  ["principales réalisations", "Principales réalisations"],
  ["compétences développées / approfondies", "Compétences développées / approfondies"],
  ["périmètre", "Périmètre"],
  ["chef de projet", "Chef de projet"],
  ["accompagnement des équipes", "Accompagnement des équipes"],
  ["audit et recrutement", "Audit et recrutement"],
  ["socle applicatif et mentoring", "Socle applicatif et mentoring"],
  ["business activity monitoring", "Business Activity Monitoring"],
  ["environnements technico fonctionnels", "Environnements technico-fonctionnels"],
  ["outils", "Outils"],
  ["langages / frameworks", "Langages / Frameworks"],
  ["os", "Systèmes d’exploitation"],
]);
const missionTechHeadings = new Set([
  "environnements technico fonctionnels",
  "outils",
  "langages / frameworks",
  "os",
]);

function renderMissionDetails(rawDetails, container) {
  const lines = rawDetails
    .split(/\n+/)
    .map((line) => line.replace(/\u00a0/g, " ").trim())
    .filter(Boolean);
  let currentList = null;
  let listType = "bullets";

  const startList = (type) => {
    const list = document.createElement("ul");
    list.className = type === "tech" ? "mission__tech-list" : "mission__bullet-list";
    container.append(list);
    currentList = list;
    return list;
  };

  lines.forEach((line) => {
    const normalized = line.replace(/\s*:\s*$/, "").toLowerCase();
    const heading = missionDetailHeadings.get(normalized);

    if (heading) {
      const title = document.createElement("h3");
      title.textContent = heading;
      container.append(title);
      listType = missionTechHeadings.has(normalized) ? "tech" : "bullets";
      currentList = null;
      return;
    }

    if (listType === "tech" || line.includes("\t")) {
      if (!currentList || !currentList.classList.contains("mission__tech-list")) {
        currentList = startList("tech");
      }
      line.split(/\t+/).map((item) => item.trim()).filter(Boolean).forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        currentList.append(listItem);
      });
      return;
    }

    if (!currentList || !currentList.classList.contains("mission__bullet-list")) {
      currentList = startList("bullets");
    }
    const listItem = document.createElement("li");
    const separator = line.indexOf(":");

    if (separator > 0 && separator < 90) {
      const label = document.createElement("strong");
      label.textContent = `${line.slice(0, separator).trim()} :`;
      listItem.append(label, document.createTextNode(` ${line.slice(separator + 1).trim()}`));
    } else {
      listItem.textContent = line;
    }
    currentList.append(listItem);
  });
}

function renderIdentity() {
  const roles = document.querySelector("[data-roles]");
  if (roles) {
    data.identity.roles.forEach((role) => {
      const item = document.createElement("li");
      item.textContent = role;
      roles.append(item);
    });
  }
}

function renderQuantities() {
  const experience = data.metrics.find((metric) => metric.label.toLowerCase().includes("année"))?.value;
  const marketedSkillTotal = data.metrics.find((metric) => metric.label.toLowerCase().includes("compétence"))?.value;
  const values = [
    ["[data-experience-count]", experience, false],
    ["[data-service-count]", data.services.length, true],
    ["[data-skill-total]", marketedSkillTotal, false],
    ["[data-mission-count]", data.missions.length, true],
    ["[data-company-count]", data.companies.length, false],
    ["[data-testimonial-count]", data.testimonials.length, true],
  ];

  values.forEach(([selector, value, padded]) => {
    const element = document.querySelector(selector);
    if (element && Number.isFinite(value)) {
      element.textContent = padded ? String(value).padStart(2, "0") : String(value);
    }
  });
}

function renderMetrics() {
  const container = document.querySelector("[data-metrics]");
  if (!container) return;
  data.metrics.forEach((metric) => {
    const item = document.createElement("div");
    item.className = "metric reveal";
    const value = document.createElement("strong");
    value.textContent = metric.value;
    const label = document.createElement("span");
    label.textContent = metric.label;
    item.append(value, label);
    container.append(item);
  });
}

function renderAbout() {
  const container = document.querySelector("[data-about]");
  if (!container) return;
  data.about.forEach((paragraph) => {
    const element = document.createElement("p");
    element.textContent = paragraph;
    container.append(element);
  });
}

function renderServices() {
  const container = document.querySelector("[data-services]");
  if (!container) return;
  data.services.forEach((service) => {
    const article = document.createElement("article");
    article.className = "service reveal";
    article.innerHTML = `
      <span class="service__number">${String(service.index).padStart(2, "0")}</span>
      <h3>${escapeText(service.title)}</h3>
      <p>${escapeText(service.description)}</p>
    `;
    container.append(article);
  });
}

let activeSkillFilter = "Tous";

function renderSkills() {
  const filters = document.querySelector("[data-skill-filters]");
  const list = document.querySelector("[data-skills]");
  const count = document.querySelector("[data-skill-count]");
  if (!filters || !list || !count) return;

  const levels = ["Tous", "Expert", "Maîtrise", "Autonome", "Fondamentaux acquis"];
  levels.forEach((level) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `skill-filter${level === "Tous" ? " is-active" : ""}`;
    button.textContent = level;
    button.dataset.filter = level;
    button.setAttribute("aria-pressed", String(level === "Tous"));
    filters.append(button);
  });

  data.skills.forEach((skill) => {
    const item = document.createElement("div");
    item.className = "skill-item";
    item.dataset.level = skill.level;
    const name = document.createElement("strong");
    name.textContent = skill.name;
    const level = document.createElement("span");
    level.className = "skill-item__ribbon";
    level.textContent = skill.level;
    item.append(name, level);
    list.append(item);
  });

  const update = (filter) => {
    activeSkillFilter = filter;
    let visible = 0;
    list.querySelectorAll(".skill-item").forEach((item) => {
      const show = filter === "Tous" || item.dataset.level === filter;
      item.hidden = !show;
      if (show) visible += 1;
    });
    filters.querySelectorAll(".skill-filter").forEach((button) => {
      const selected = button.dataset.filter === filter;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    count.textContent = `${visible} compétence${visible > 1 ? "s" : ""} affichée${visible > 1 ? "s" : ""}`;
  };

  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".skill-filter");
    if (button) update(button.dataset.filter);
  });

  update(activeSkillFilter);
}

function renderMissions() {
  const container = document.querySelector("[data-missions]");
  if (!container) return;

  data.missions.forEach((mission) => {
    const article = document.createElement("article");
    article.className = "mission reveal";
    const detailId = `mission-details-${mission.index}`;
    article.innerHTML = `
      <button class="mission__button" type="button" aria-expanded="false" aria-controls="${detailId}">
        <span class="mission__index">${String(mission.index).padStart(2, "0")}</span>
        <span class="mission__role">${escapeText(mission.role)}</span>
        <span class="mission__company">${escapeText(mission.company)}</span>
        <span class="mission__duration">${escapeText(mission.duration)}</span>
        <span class="mission__toggle">${plusIcon}</span>
      </button>
      <div class="mission__details" id="${detailId}">
        <div class="mission__details-inner"></div>
      </div>
    `;
    renderMissionDetails(mission.details, article.querySelector(".mission__details-inner"));
    container.append(article);
  });

  container.addEventListener("click", (event) => {
    const button = event.target.closest(".mission__button");
    if (!button) return;
    const expanded = button.getAttribute("aria-expanded") === "true";
    container.querySelectorAll(".mission__button").forEach((otherButton) => otherButton.setAttribute("aria-expanded", "false"));
    container.querySelectorAll(".mission__details").forEach((details) => details.classList.remove("is-open"));
    if (!expanded) {
      button.setAttribute("aria-expanded", "true");
      document.getElementById(button.getAttribute("aria-controls"))?.classList.add("is-open");
    }
  });
}

function renderCompanies() {
  const container = document.querySelector("[data-companies]");
  if (!container) return;
  data.companies.forEach((company) => {
    const article = document.createElement("article");
    article.className = "company reveal";
    article.innerHTML = `
      <div class="company__logo"><img src="${company.logo}" alt="Logo ${escapeText(company.name)}" loading="lazy" decoding="async" /></div>
      <h3>${escapeText(company.name)}</h3>
      <p>${escapeText(company.role)}</p>
    `;
    container.append(article);
  });
}

let activeTestimonial = 0;

function renderTestimonials() {
  const quote = document.querySelector("[data-testimonial-quote]");
  const name = document.querySelector("[data-testimonial-name]");
  const role = document.querySelector("[data-testimonial-role]");
  const date = document.querySelector("[data-testimonial-date]");
  const position = document.querySelector("[data-testimonial-position]");
  const selector = document.querySelector("[data-testimonial-selector]");
  const previous = document.querySelector("[data-testimonial-prev]");
  const next = document.querySelector("[data-testimonial-next]");
  if (!quote || !name || !role || !date || !position || !selector) return;

  data.testimonials.forEach((testimonial, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "testimonial-choice";
    button.dataset.testimonial = index;
    button.setAttribute("aria-label", `Afficher l’avis de ${testimonial.name}`);
    button.innerHTML = `
      <img src="${testimonial.portrait}?v=16" alt="" width="56" height="56" loading="lazy" decoding="async" />
      <span><strong>${escapeText(testimonial.name)}</strong><small>${escapeText(testimonial.role)}</small></span>
      <span>${String(index + 1).padStart(2, "0")}</span>
    `;
    selector.append(button);
  });

  const update = (index) => {
    activeTestimonial = (index + data.testimonials.length) % data.testimonials.length;
    const testimonial = data.testimonials[activeTestimonial];
    quote.textContent = testimonial.quote;
    name.textContent = testimonial.name;
    role.textContent = testimonial.role;
    date.dateTime = testimonial.date;
    date.textContent = `Avis du ${new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${testimonial.date}T12:00:00`))}`;
    position.textContent = `${String(activeTestimonial + 1).padStart(2, "0")} / ${String(data.testimonials.length).padStart(2, "0")}`;
    selector.querySelectorAll(".testimonial-choice").forEach((button, choiceIndex) => {
      const selected = choiceIndex === activeTestimonial;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  selector.addEventListener("click", (event) => {
    const button = event.target.closest(".testimonial-choice");
    if (button) update(Number(button.dataset.testimonial));
  });
  previous?.addEventListener("click", () => update(activeTestimonial - 1));
  next?.addEventListener("click", () => update(activeTestimonial + 1));
  update(0);
}

function setupMenu() {
  const header = document.querySelector("[data-header]");
  const button = document.querySelector(".menu-toggle");
  if (!header || !button) return;

  const close = () => {
    header.classList.remove("menu-open");
    document.body.classList.remove("menu-locked");
    button.setAttribute("aria-expanded", "false");
  };

  button.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    document.body.classList.toggle("menu-locked", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
  });
  document.querySelectorAll(".navigation a").forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-contact-status]");
  const submit = document.querySelector("[data-contact-submit]");
  const submitLabel = document.querySelector("[data-contact-submit-label]");
  if (!form || !status || !submit || !submitLabel) return;

  const idleMessage = status.textContent.trim();
  const setStatus = (message, state = "") => {
    status.textContent = message;
    status.dataset.state = state;
  };

  form.addEventListener("input", () => {
    if (status.dataset.state) setStatus(idleMessage);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    submitLabel.textContent = "Envoi en cours…";
    setStatus("Votre message est en cours d’envoi.");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Formspree submission failed");

      form.reset();
      setStatus("Merci, votre message a bien été envoyé. Je vous répondrai rapidement.", "success");
    } catch {
      setStatus(
        "L’envoi n’a pas abouti. Vérifiez votre connexion puis réessayez dans quelques instants.",
        "error"
      );
    } finally {
      submit.disabled = false;
      form.removeAttribute("aria-busy");
      submitLabel.textContent = "Envoyer le message";
    }
  });
}

function setupReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -5%" }
  );
  elements.forEach((element) => observer.observe(element));
}

function init() {
  if (!data) return;
  renderIdentity();
  renderQuantities();
  renderMetrics();
  renderAbout();
  renderServices();
  renderSkills();
  renderMissions();
  renderCompanies();
  renderTestimonials();
  setupMenu();
  setupContactForm();
  setupReveals();
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
}

init();
