(() => {
  "use strict";

  const config = window.FOCUSEA_MONETIZATION || {};
  const placements = [...document.querySelectorAll("[data-ad-placement]")];
  const statusElement = document.querySelector("#advertisingStatus");
  const publisherElement = document.querySelector("#advertisingPublisherStatus");
  const cmpElement = document.querySelector("#advertisingCmpStatus");
  const requestElement = document.querySelector("#advertisingRequestStatus");
  const dialog = document.querySelector("#adPrivacyDialog");
  const settingsButton = document.querySelector("#adPrivacySettings");
  const previewMode = new URLSearchParams(window.location.search).get("adpreview") === "1";
  const validPublisher = /^ca-pub-[0-9]{16}$/.test(String(config.publisherId || ""));
  const cmpReady = config.certifiedCmpReady === true;
  const monetizationReady = config.enabled === true && validPublisher && cmpReady;
  let adScriptState = "not requested";

  function updateStatus() {
    if (statusElement) {
      statusElement.textContent = previewMode
        ? "Preview mode - no Google ad request sent"
        : monetizationReady
          ? "AdSense enabled"
          : config.enabled
            ? "Activation blocked"
            : "Advertising not active";
    }
    if (publisherElement) publisherElement.textContent = validPublisher ? "Publisher ID valid" : "Publisher ID required";
    if (cmpElement) cmpElement.textContent = cmpReady ? "Certified CMP marked ready" : "Google-certified CMP required";
    if (requestElement) requestElement.textContent = adScriptState;
  }

  function placementLabel(name) {
    return {
      news: "Maritime news sponsor placement",
      academy: "Academy sponsor placement",
      ports: "Port intelligence sponsor placement"
    }[name] || "Focusea sponsor placement";
  }

  function renderPreview() {
    placements.forEach((placement) => {
      const name = placement.dataset.adPlacement || "sponsor";
      placement.hidden = false;
      placement.classList.add("ad-placement-preview");
      placement.innerHTML = `
        <div class="ad-preview-shell">
          <span>Advertisement preview</span>
          <strong>${placementLabel(name)}</strong>
          <small>No advertising request is sent in preview mode.</small>
        </div>
      `;
    });
    adScriptState = "preview only";
    updateStatus();
  }

  function renderManualPlacements() {
    placements.forEach((placement) => {
      const name = placement.dataset.adPlacement || "";
      const placementConfig = config.placements?.[name] || {};
      const slot = String(placementConfig.slot || "").trim();
      if (!/^[0-9]+$/.test(slot)) {
        placement.hidden = true;
        return;
      }
      placement.hidden = false;
      placement.classList.remove("ad-placement-preview");
      placement.innerHTML = `
        <span class="ad-disclosure">Advertisement</span>
        <ins class="adsbygoogle"
          data-ad-client="${config.publisherId}"
          data-ad-slot="${slot}"
          data-ad-format="${placementConfig.format || "auto"}"
          data-full-width-responsive="${placementConfig.responsive === false ? "false" : "true"}"></ins>
      `;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        placement.hidden = true;
      }
    });
  }

  function loadAdSense() {
    if (!monetizationReady || document.querySelector("script[data-focusea-adsense]")) return;
    adScriptState = "loading";
    updateStatus();
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.focuseaAdsense = "true";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(config.publisherId)}`;
    script.addEventListener("load", () => {
      adScriptState = "Google ad code loaded";
      renderManualPlacements();
      updateStatus();
    });
    script.addEventListener("error", () => {
      adScriptState = "blocked or unavailable";
      placements.forEach((placement) => { placement.hidden = true; });
      updateStatus();
    });
    document.head.append(script);
  }

  function openAdvertisingStatus() {
    updateStatus();
    if (typeof dialog?.showModal === "function") dialog.showModal();
  }

  placements.forEach((placement) => { placement.hidden = true; });
  settingsButton?.addEventListener("click", openAdvertisingStatus);
  dialog?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => dialog.close());
  });

  window.FocuseaAdvertising = Object.freeze({
    getStatus: () => ({
      enabled: config.enabled === true,
      publisherIdValid: validPublisher,
      certifiedCmpReady: cmpReady,
      previewMode,
      adScriptState
    })
  });

  if (previewMode) renderPreview();
  else if (monetizationReady) loadAdSense();
  else updateStatus();
})();
