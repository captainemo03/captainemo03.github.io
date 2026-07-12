(() => {
  "use strict";

  const storageKey = "focusea-color-theme";
  const supportedThemes = new Set(["dark", "light"]);
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)");

  function readStoredTheme() {
    try {
      const value = window.localStorage.getItem(storageKey);
      return supportedThemes.has(value) ? value : "";
    } catch (error) {
      return "";
    }
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      // The selected theme still applies for this session when storage is unavailable.
    }
  }

  function syncThemeControls(theme) {
    document.querySelectorAll("[data-theme-value]").forEach((button) => {
      const active = button.dataset.themeValue === theme;
      button.setAttribute("aria-pressed", String(active));
      button.dataset.active = String(active);
    });
  }

  function applyTheme(theme, persist = false) {
    const nextTheme = supportedThemes.has(theme) ? theme : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = nextTheme === "light" ? "#eef3f8" : "#09091f";
    if (persist) storeTheme(nextTheme);
    syncThemeControls(nextTheme);
  }

  const initialTheme = readStoredTheme() || (systemTheme.matches ? "light" : "dark");
  applyTheme(initialTheme);

  function bindThemeControls() {
    syncThemeControls(document.documentElement.dataset.theme || initialTheme);
    document.querySelectorAll("[data-theme-value]").forEach((button) => {
      button.addEventListener("click", () => applyTheme(button.dataset.themeValue, true));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindThemeControls, { once: true });
  } else {
    bindThemeControls();
  }

  systemTheme.addEventListener?.("change", (event) => {
    if (!readStoredTheme()) applyTheme(event.matches ? "light" : "dark");
  });

  window.FocuseaTheme = Object.freeze({
    get: () => document.documentElement.dataset.theme || initialTheme,
    set: (theme) => applyTheme(theme, true)
  });
})();
