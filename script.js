(() => {
  const key = document.body.dataset.page || 'home';
  const feedbackEnabled = document.body.dataset.feedback !== 'false';
  const readPreference = (name) => { try { return localStorage.getItem(name); } catch { return null; } };
  const savePreference = (name, value) => { try { localStorage.setItem(name, value); } catch { /* Preferences remain usable without storage. */ } };
  const navItems = [['home','Home','index.html'],['about','About','about.html'],['cyber','IT & security','cybersecurity.html'],['gamedev','Games','gamedev.html'],['web','Web','web.html']];
  const header = document.querySelector('[data-site-header]');
  if (header) header.outerHTML = `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container site-shell"><a class="brand" href="index.html" aria-label="Adel Marcano home"><span class="brand-mark" aria-hidden="true">am</span>Adel Marcano</a><button class="btn menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="siteMenu" type="button">Menu</button><div class="header-panel" id="siteMenu"><nav class="nav" aria-label="Primary navigation">${navItems.map(([id,label,url])=>`<a class="nav-link${key===id?' active':''}" href="${url}"${key===id?' aria-current="page"':''}>${label}</a>`).join('')}</nav><a class="button header-resume" href="resume.html"${key==='resume'?' aria-current="page"':''}>Resume <span aria-hidden="true">↗</span></a><details class="display-settings"><summary aria-label="Display settings" title="Display settings"><span aria-hidden="true">◐</span></summary><div class="display-popover"><p>APPEARANCE</p><button class="btn" id="themeToggle" type="button">Dark mode</button><p style="margin-top:16px">TEXT SIZE</p><div class="text-size-group" role="group" aria-label="Text size"><button class="btn" type="button" data-font="16px" aria-label="Smaller text">A−</button><button class="btn" type="button" data-font="17px" aria-label="Default text size">A</button><button class="btn" type="button" data-font="20px" aria-label="Larger text">A+</button></div></div></details></div></div></header>`;
  const footer = document.querySelector('[data-site-footer]');
  if (footer) footer.outerHTML = `<footer class="site-footer"><div class="container footer-inner"><p>© ${new Date().getFullYear()} Adel Marcano · Norfolk, Virginia</p><div class="footer-links"><a href="mailto:adeljevan@gmail.com">Email</a><a href="https://www.linkedin.com/in/adel-marcano-000429379">LinkedIn ↗</a><a href="https://github.com/Mardymars">GitHub ↗</a>${feedbackEnabled?'<button class="footer-feedback" id="feedbackOpen" type="button">Share feedback</button>':''}</div></div></footer>`;
  const modalTarget = document.querySelector('[data-site-modal]');
  if (modalTarget) modalTarget.outerHTML = feedbackEnabled ? `<dialog id="feedbackModal" aria-labelledby="feedbackTitle"><button id="feedbackClose" class="modal-close" type="button" aria-label="Close feedback">×</button><h2 id="feedbackTitle">A fresh perspective.</h2><p class="modal-sub">What worked for you, and what could be better?</p><form name="website-feedback" method="POST" action="/thanks.html" data-netlify="true" data-netlify-honeypot="bot-field"><input type="hidden" name="form-name" value="website-feedback"><p hidden><label>Leave this empty: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p><label class="field">What stood out?<select name="liked_most" required><option value="" selected disabled>Select one</option><option>Design / Layout</option><option>Cybersecurity / IT content</option><option>Game Development content</option><option>Web Page Design content</option><option>Overall professionalism</option></select></label><label class="field">Which page did you view?<select name="viewed_pages"><option>Home</option><option>About</option><option>Cybersecurity/IT</option><option>Game Development</option><option>Web Page Design</option><option>Resume</option></select></label><label class="field">Your suggestion (optional)<textarea name="comment" rows="4" maxlength="5000" placeholder="I'd love to hear your thoughts."></textarea></label><button class="button" type="submit">Send feedback ↗</button><p class="modal-foot">Thanks for taking a look at my work.</p></form></dialog>` : '';

  const siteHeader = document.querySelector('.site-header');
  const menu = document.getElementById('menuToggle');
  function setMenu(open) { siteHeader?.classList.toggle('menu-open',open);menu?.setAttribute('aria-expanded',String(open));if(menu)menu.textContent=open?'Close':'Menu'; }
  menu?.addEventListener('click',()=>setMenu(!siteHeader.classList.contains('menu-open')));
  const breakpoint=matchMedia('(max-width:900px)');
  breakpoint.addEventListener('change',()=>setMenu(false));
  document.querySelectorAll('.nav-link').forEach(link=>link.addEventListener('click',()=>setMenu(false)));

  const theme=document.getElementById('themeToggle');
  const savedTheme=readPreference('theme');
  document.body.classList.toggle('dark',savedTheme==='dark');
  function updateTheme(){const dark=document.body.classList.contains('dark');theme.textContent=dark?'Light mode':'Dark mode';theme.setAttribute('aria-pressed',String(dark));}
  updateTheme();
  theme.addEventListener('click',()=>{document.body.classList.toggle('dark');savePreference('theme',document.body.classList.contains('dark')?'dark':'light');updateTheme();});
  const savedFont=readPreference('fontSize');
  if(['16px','17px','18px','20px','24px'].includes(savedFont))document.documentElement.style.setProperty('--base-font',savedFont);
  document.querySelectorAll('[data-font]').forEach(button=>button.addEventListener('click',()=>{document.documentElement.style.setProperty('--base-font',button.dataset.font);savePreference('fontSize',button.dataset.font);}));
  const display=document.querySelector('.display-settings');
  document.addEventListener('click',event=>{if(display&&!display.contains(event.target))display.open=false;});

  const dialog=document.getElementById('feedbackModal');
  document.getElementById('feedbackOpen')?.addEventListener('click',()=>dialog.showModal());
  document.getElementById('feedbackClose')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(display)display.open=false;if(siteHeader?.classList.contains('menu-open')){setMenu(false);menu.focus();}}});

  const gallery=document.querySelector('.nessus-gallery');
  if(gallery){const slides=[...gallery.querySelectorAll('.ness-slide')];function show(){const selected=slides.find(slide=>`#${slide.id}`===location.hash)||slides[0];slides.forEach(slide=>slide.style.display=slide===selected?'block':'none');}gallery.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();history.pushState(null,'',link.getAttribute('href'));show();}));window.addEventListener('hashchange',show);window.addEventListener('popstate',show);show();}
})();
