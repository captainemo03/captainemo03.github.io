(() => {
  "use strict";

  const body = document.body;
  const main = document.querySelector("main");
  if (!body || !main) return;
  body.classList.add("site-shell-ready");

  if (!main.id) main.id = "main-content";

  const skipLink = document.createElement("a");
  skipLink.className = "site-skip-link";
  skipLink.href = `#${main.id}`;
  skipLink.textContent = "Skip to main content";
  body.prepend(skipLink);

  const progress = document.createElement("div");
  progress.className = "site-scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  body.appendChild(progress);

  const topButton = document.createElement("button");
  topButton.type = "button";
  topButton.className = "site-back-to-top";
  topButton.textContent = "Top";
  topButton.setAttribute("aria-label", "Back to top");
  body.appendChild(topButton);

  const updateScrollUi = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.setProperty("--site-scroll", `${Math.min(100, (window.scrollY / max) * 100)}%`);
    topButton.classList.toggle("visible", window.scrollY > 700);
  };

  window.addEventListener("scroll", updateScrollUi, { passive: true });
  window.addEventListener("resize", updateScrollUi, { passive: true });
  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  updateScrollUi();

  const connectionStatus = document.createElement("div");
  connectionStatus.className = "site-connection-status";
  connectionStatus.setAttribute("role", "status");
  body.appendChild(connectionStatus);
  const updateConnection = () => {
    connectionStatus.hidden = navigator.onLine;
    connectionStatus.textContent = navigator.onLine ? "" : "Offline mode: saved pages remain available";
  };
  window.addEventListener("online", updateConnection);
  window.addEventListener("offline", updateConnection);
  updateConnection();

  const pageNav = document.querySelector("[data-page-nav]");
  if (!pageNav) return;

  const sidebar = pageNav.closest(".sidebar");
  const brand = sidebar?.querySelector(".brand");
  if (brand && !document.querySelector("#mobileNavToggle")) {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.id = "mobileNavToggle";
    toggle.className = "mobile-nav-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "focuseaPrimaryNav");
    toggle.textContent = "Menu";
    pageNav.id = "focuseaPrimaryNav";
    brand.appendChild(toggle);
    toggle.addEventListener("click", () => {
      const open = sidebar.classList.toggle("mobile-nav-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
    pageNav.addEventListener("click", (event) => {
      if (!event.target.closest("a") || window.innerWidth > 900) return;
      sidebar.classList.remove("mobile-nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    });
  }

  const palette = document.createElement("dialog");
  palette.className = "site-command-palette";
  palette.innerHTML = `
    <form method="dialog" class="site-command-shell">
      <div class="site-command-heading">
        <div><span>Focusea Navigator</span><strong>Open any workspace or tool</strong></div>
        <button type="submit" aria-label="Close navigator">Close</button>
      </div>
      <label class="site-command-search"><span>Search</span><input type="search" placeholder="Try laytime, ports, insurance, stability..." autocomplete="off" /></label>
      <div class="site-command-results" role="listbox"></div>
      <small>Shortcut: Ctrl+K or /</small>
    </form>`;
  body.appendChild(palette);

  const links = [...pageNav.querySelectorAll("a")].map((link) => ({
    label: link.textContent.trim(),
    href: link.getAttribute("href") || "#dashboard",
    external: link.target === "_blank"
  }));
  const input = palette.querySelector("input");
  const results = palette.querySelector(".site-command-results");

  const renderResults = (query = "") => {
    const normalized = query.trim().toLowerCase();
    const matches = links.filter((item) => !normalized || item.label.toLowerCase().includes(normalized)).slice(0, 12);
    results.innerHTML = matches.length
      ? matches.map((item, index) => `<a role="option" href="${item.href}" ${item.external ? 'target="_blank" rel="noopener"' : ""}><span>${item.label}</span><small>${item.external ? "Side site" : "Workspace"}</small></a>`).join("")
      : `<p>No matching tool. Try a broader maritime term.</p>`;
    results.querySelector("a")?.setAttribute("data-first-result", String(Boolean(matches.length)));
  };

  const openPalette = () => {
    renderResults("");
    palette.showModal();
    window.setTimeout(() => input.focus(), 30);
  };

  input.addEventListener("input", () => renderResults(input.value));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const first = results.querySelector("a");
      if (first) {
        event.preventDefault();
        first.click();
      }
    }
  });
  results.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    const href = link?.getAttribute("href") || "";
    if (href.startsWith("#")) {
      const originalLink = pageNav.querySelector(`a[href="${href}"]`);
      if (originalLink) {
        event.preventDefault();
        originalLink.click();
      }
    }
    palette.close();
  });

  document.addEventListener("keydown", (event) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "");
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openPalette();
    } else if (event.key === "/" && !typing) {
      event.preventDefault();
      openPalette();
    }
  });

  const bottomNav = document.createElement("nav");
  bottomNav.className = "site-mobile-dock";
  bottomNav.setAttribute("aria-label", "Mobile quick navigation");
  bottomNav.innerHTML = `
    <a href="#dashboard">News</a>
    <a href="#workbench">Work</a>
    <a href="#market">Market</a>
    <a href="stability.html">Stability</a>
    <button type="button" data-open-site-command>More</button>`;
  body.classList.add("has-site-mobile-dock");
  body.appendChild(bottomNav);
  bottomNav.querySelector("[data-open-site-command]").addEventListener("click", openPalette);
  bottomNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    const href = link?.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    const originalLink = pageNav.querySelector(`a[href="${href}"]`);
    if (!originalLink) return;
    event.preventDefault();
    originalLink.click();
  });
})();
