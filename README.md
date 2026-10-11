# Adel Marcano's portfolio

Static HTML, CSS, and JavaScript portfolio for IT support, cybersecurity, application development, and Unity projects.

## Pages and shared components

- `index.html`: introduction, featured projects, and contact information.
- `about.html`: background and links to the current resume.
- `resume.html`: accessible browser version of the October 2026 help desk resume.
- `cybersecurity.html`, `gamedev.html`, and `web.html`: project details and evidence.
- `script.js`: shared navigation/footer, display preferences, feedback dialog, and screenshot gallery.
- `style.css`: responsive light/dark layouts, enlarged text, reduced motion, and print styles.

The approved resume is available at `assets/adel-marcano-help-desk-2026-10.pdf`. The older `assets/resume_adel_marcano.pdf` address serves the same PDF to preserve existing links. When updating a resume, update both PDF paths and the browser version together.

## Preview and publish

No build step or package installation is required. Serve this directory with a local static HTTP server. The Netlify site is connected to the `main` branch of this repository; publishing a commit triggers its deployment.

Keep the `_headers` policy and the static `website-feedback` form definition in `index.html`. The form definition allows Netlify to recognize the feedback form that the shared script displays. Theme and text-size preferences are stored locally in the visitor's browser.

## October 2026 refresh

Replaced the oversized carousel/header with a compact navigation bar and a project-focused homepage. Added FieldFlow, direct resume access, an updated About page, and responsive resume reading. Existing project screenshots, video, page URLs, and the original resume download URL are retained.
