(() => {
  // Smooth scroll for anchor links (tabs + Learn More)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });

  // Carousel
  let index = 0;
  const track = document.getElementById("carouselTrack");
  const slides = document.querySelectorAll(".hero-slide");

  function updateCarousel() {
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (!slides.length) return;
      index = (index + 1) % slides.length;
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (!slides.length) return;
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  }

  // Keyboard nav
  document.addEventListener("keydown", (e) => {
    if (!slides.length) return;
    if (e.key === "ArrowRight") {
      index = (index + 1) % slides.length;
      updateCarousel();
    } else if (e.key === "ArrowLeft") {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    }
  });

  updateCarousel();

  // Theme + Text size
  const themeToggle = document.getElementById("themeToggle");
  const textSmall = document.getElementById("textSmall");
  const textNormal = document.getElementById("textNormal");
  const textLarge = document.getElementById("textLarge");

  const savedTheme = localStorage.getItem("theme");
  const savedFont = localStorage.getItem("fontSize");

  if (savedTheme === "dark") document.body.classList.add("dark");
  if (savedFont) document.documentElement.style.setProperty("--base-font", savedFont);

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  }
  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
      updateThemeIcon();
    });
  }

  function setFontSize(value) {
    document.documentElement.style.setProperty("--base-font", value);
    localStorage.setItem("fontSize", value);
  }

  if (textSmall) textSmall.addEventListener("click", () => setFontSize("18px"));
  if (textNormal) textNormal.addEventListener("click", () => setFontSize("20px"));
  if (textLarge) textLarge.addEventListener("click", () => setFontSize("24px"));

  // Feedback popup (Netlify Form)
  const modal = document.getElementById("feedbackModal");
  const closeBtn = document.getElementById("feedbackClose");

  function openModal() {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  // Show after 20 seconds, only once per day
  const shown = localStorage.getItem("feedbackShownAt");
  const oneDay = 24 * 60 * 60 * 1000;

  if (!shown || (Date.now() - Number(shown)) > oneDay) {
    setTimeout(() => {
      openModal();
      localStorage.setItem("feedbackShownAt", String(Date.now()));
    }, 20000);
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
