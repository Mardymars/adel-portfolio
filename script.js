(() => {
  // Smooth scroll for anchor links (only for # links)
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
      index = (index + 1) % slides.length;
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  }

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

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ===== Feedback Modal (manual open button + close) =====
  const modal = document.getElementById("feedbackModal");
  const openBtn = document.getElementById("feedbackOpen");
  const closeBtn = document.getElementById("feedbackClose");

  function openModal() {
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.classList.add("open");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.classList.add("hidden");
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // close when clicking the dark backdrop
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Optional: auto popup after some time (turn on if you want)
  // setTimeout(openModal, 15000); // 15 seconds
})();
