(() => {
  // Smooth scroll for anchor links
  // IMPORTANT: Do NOT hijack gallery navigation hashes (nessus arrows)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      // If the link is inside the Nessus gallery, let the gallery handler manage it
      if (link.closest(".nessus-gallery")) return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });

  // ===== Nessus Gallery (fix refresh issue) =====
  const gallery = document.querySelector(".nessus-gallery");
  if (gallery) {
    const slides = Array.from(gallery.querySelectorAll(".ness-slide"));
    const ids = slides.map(s => s.id).filter(Boolean);

    function showSlideById(id) {
      // fallback to first if unknown
      const safeId = ids.includes(id) ? id : (ids[0] || "");
      slides.forEach((s) => {
        s.style.display = (s.id === safeId) ? "block" : "none";
      });
    }

    function getHashId() {
      return (window.location.hash || "").replace("#", "");
    }

    // Initial render
    const initial = getHashId();
    showSlideById(initial || ids[0]);

    // Handle arrow clicks
    gallery.querySelectorAll('a[href^="#"]').forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const href = btn.getAttribute("href");
        const id = (href || "").replace("#", "");
        if (!id) return;

        e.preventDefault();
        // Update URL + show immediately
        history.pushState(null, "", `#${id}`);
        showSlideById(id);
      });
    });

    // If user manually changes hash (or uses back/forward)
    window.addEventListener("hashchange", () => {
      const id = getHashId();
      showSlideById(id || ids[0]);
    });
  }

  // ===== Carousel (safe on pages without carousel) =====
  let index = 0;
  const track = document.getElementById("carouselTrack");
  const slides = document.querySelectorAll(".hero-slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  function updateCarousel() {
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if (track && slides.length && nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        index = (index + 1) % slides.length;
        updateCarousel();
      } else if (e.key === "ArrowLeft") {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
      }
    });

    updateCarousel();
  }

  // ===== Theme + Text size (safe on pages without controls) =====
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

  // Footer year (safe)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Feedback modal open/close =====
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

  if (modal) {
    modal.addEventListener("click", (e) => {
      const card = modal.querySelector(".modal-card");
      if (card && !card.contains(e.target)) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();
