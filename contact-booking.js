document.querySelectorAll("[data-booking]").forEach((booking) => {
  booking.addEventListener("toggle", () => {
    if (!booking.open || booking.dataset.loaded) return;
    booking.dataset.loaded = "true";
    const calendar = booking.querySelector("[data-booking-calendar]");
    const status = booking.querySelector("[data-booking-status]");
    calendar.classList.add("calendly-inline-widget");
    calendar.dataset.url = "https://calendly.com/alliancia-solutions/echange-avec-julien";
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.addEventListener("error", () => {
      status.textContent = "Le calendrier ne peut pas être chargé ici. ";
      calendar.hidden = true;
    });
    document.body.append(script);
  });
});
