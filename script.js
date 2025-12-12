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

  document.getElementById("nextBtn").addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });

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
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  }
  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    updateThemeIcon();
  });

  function setFontSize(value) {
    document.documentElement.style.setProperty("--base-font", value);
    localStorage.setItem("fontSize", value);
  }

  textSmall.addEventListener("click", () => setFontSize("18px"));
  textNormal.addEventListener("click", () => setFontSize("20px"));
  textLarge.addEventListener("click", () => setFontSize("24px"));

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
})();
