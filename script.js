(() => {
  const pageKey = document.body.dataset.page || "home";
  const feedbackEnabled = document.body.dataset.feedback !== "false";

  function renderSiteShell() {
    const navItems = [
      { key: "home", label: "Home", href: "index.html" },
      { key: "about", label: "About Me", href: "about.html" },
      { key: "cyber", label: "Cybersecurity/IT", href: "cybersecurity.html" },
      { key: "gamedev", label: "Game Development", href: "gamedev.html" },
      { key: "web", label: "Web Page Design", href: "web.html" },
      { key: "contact", label: "Contact", href: pageKey === "home" ? "#contact" : "index.html#contact" }
    ];

    const navMarkup = navItems.map((item) => {
      const isActive = item.key === pageKey;
      const currentAttr = isActive ? ' aria-current="page"' : "";
      const activeClass = isActive ? " active" : "";
      return `<a class="nav-link${activeClass}" href="${item.href}"${currentAttr}>${item.label}</a>`;
    }).join("");

    const headerMarkup = `
<header class="site-header">
  <div class="container header-row">
    <div class="brand">
      <div>
        <h1 class="name">Adel Marcano</h1>
        <p class="tagline">IT &bull; Cybersecurity &bull; Game Development &bull; Web Design</p>
      </div>

      <nav class="nav" aria-label="Primary navigation">
        ${navMarkup}
      </nav>
    </div>

    <div class="controls" aria-label="Site controls">
      ${feedbackEnabled ? '<button id="feedbackOpen" class="btn" type="button">Feedback</button>' : ""}
      <button id="themeToggle" class="btn" type="button" aria-label="Toggle theme">Moon</button>
      <button id="textSmall" class="btn" type="button" aria-label="Smaller text">A-</button>
      <button id="textNormal" class="btn" type="button" aria-label="Normal text">A</button>
      <button id="textLarge" class="btn" type="button" aria-label="Larger text">A+</button>
    </div>
  </div>
</header>`;

    const footerMarkup = `
<footer class="site-footer">
  <div class="container">
    <p>&copy; <span id="year"></span> Adel Marcano</p>
  </div>
</footer>`;

    const modalMarkup = feedbackEnabled ? `
<div id="feedbackModal" class="modal hidden" role="dialog" aria-modal="true" aria-labelledby="feedbackTitle">
  <div class="modal-card">
    <button id="feedbackClose" class="modal-close" type="button" aria-label="Close">&times;</button>

    <h2 id="feedbackTitle">Quick Feedback</h2>
    <p class="modal-sub">What did you like, what did you view, and what can I improve?</p>

    <form
      name="website-feedback"
      method="POST"
      action="thanks.html"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="website-feedback" />

      <p class="hidden">
        <label>Don't fill this out: <input name="bot-field" /></label>
      </p>

      <label class="field">
        What did you like most?
        <select name="liked_most" required>
          <option value="" selected disabled>Select one</option>
          <option>Design / Layout</option>
          <option>Cybersecurity / IT content</option>
          <option>Game Development content</option>
          <option>Web Page Design content</option>
          <option>Overall professionalism</option>
        </select>
      </label>

      <fieldset class="field">
        <legend>Which pages did you view?</legend>

        <div class="check-grid">
          <label class="check">
            <input type="checkbox" name="viewed_pages" value="Home" />
            <span>Home</span>
          </label>

          <label class="check">
            <input type="checkbox" name="viewed_pages" value="About" />
            <span>About</span>
          </label>

          <label class="check">
            <input type="checkbox" name="viewed_pages" value="Cybersecurity/IT" />
            <span>Cybersecurity/IT</span>
          </label>

          <label class="check">
            <input type="checkbox" name="viewed_pages" value="Game Development" />
            <span>Game Development</span>
          </label>

          <label class="check">
            <input type="checkbox" name="viewed_pages" value="Web Page Design" />
            <span>Web Page Design</span>
          </label>
        </div>
      </fieldset>

      <label class="field">
        Comment (optional)
        <textarea
          name="comment"
          rows="4"
          placeholder="One suggestion that would make this site better..."
        ></textarea>
      </label>

      <button type="submit" class="card-btn">Send</button>

      <p class="modal-foot">
        This form is handled by Netlify. Thanks for helping me improve.
      </p>
    </form>
  </div>
</div>` : "";

    const headerTarget = document.querySelector("[data-site-header]");
    if (headerTarget) {
      headerTarget.outerHTML = headerMarkup;
    }

    const footerTarget = document.querySelector("[data-site-footer]");
    if (footerTarget) {
      footerTarget.outerHTML = footerMarkup;
    }

    const modalTarget = document.querySelector("[data-site-modal]");
    if (modalTarget) {
      modalTarget.outerHTML = modalMarkup;
    }
  }

  renderSiteShell();

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      if (link.closest(".nessus-gallery")) return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });

  const gallery = document.querySelector(".nessus-gallery");
  if (gallery) {
    const slides = Array.from(gallery.querySelectorAll(".ness-slide"));
    const ids = slides.map((slide) => slide.id).filter(Boolean);

    function showSlideById(id) {
      const safeId = ids.includes(id) ? id : (ids[0] || "");
      slides.forEach((slide) => {
        slide.style.display = slide.id === safeId ? "block" : "none";
      });
    }

    function getHashId() {
      return (window.location.hash || "").replace("#", "");
    }

    showSlideById(getHashId() || ids[0]);

    gallery.querySelectorAll('a[href^="#"]').forEach((button) => {
      button.addEventListener("click", (event) => {
        const href = button.getAttribute("href");
        const id = (href || "").replace("#", "");
        if (!id) return;

        event.preventDefault();
        history.pushState(null, "", `#${id}`);
        showSlideById(id);
      });
    });

    window.addEventListener("hashchange", () => {
      showSlideById(getHashId() || ids[0]);
    });
  }

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

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        index = (index + 1) % slides.length;
        updateCarousel();
      } else if (event.key === "ArrowLeft") {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
      }
    });

    updateCarousel();
  }

  const themeToggle = document.getElementById("themeToggle");
  const textSmall = document.getElementById("textSmall");
  const textNormal = document.getElementById("textNormal");
  const textLarge = document.getElementById("textLarge");

  const savedTheme = localStorage.getItem("theme");
  const savedFont = localStorage.getItem("fontSize");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  if (savedFont) {
    document.documentElement.style.setProperty("--base-font", savedFont);
  }

  function updateThemeButton() {
    if (!themeToggle) return;
    themeToggle.textContent = document.body.classList.contains("dark") ? "Sun" : "Moon";
  }

  updateThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
      updateThemeButton();
    });
  }

  function setFontSize(value) {
    document.documentElement.style.setProperty("--base-font", value);
    localStorage.setItem("fontSize", value);
  }

  if (textSmall) textSmall.addEventListener("click", () => setFontSize("18px"));
  if (textNormal) textNormal.addEventListener("click", () => setFontSize("20px"));
  if (textLarge) textLarge.addEventListener("click", () => setFontSize("24px"));

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

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
    modal.addEventListener("click", (event) => {
      const card = modal.querySelector(".modal-card");
      if (card && !card.contains(event.target)) closeModal();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
})();
