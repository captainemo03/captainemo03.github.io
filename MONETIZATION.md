# Focusea AdSense activation

The site is monetization-ready but intentionally sends no Google ad request until a real AdSense publisher account and a Google-certified CMP are ready.

## Current installation state

- Publisher ID `ca-pub-8225865281154040` is installed in the configuration and homepage verification meta tag.
- The root `ads.txt` declaration is installed for publisher `pub-8225865281154040`.
- Google's three-choice CMP is configured for the site.
- Ad requests remain disabled until AdSense for web shows the site as ready.

## Activate after Google approval

1. Apply at <https://adsense.google.com/start/> with a domain that AdSense can review.
2. In AdSense, configure Google's CMP or another Google-certified TCF CMP for EEA, UK and Switzerland traffic.
3. Copy the exact `ca-pub-0000000000000000` publisher ID into `monetization-config.js`.
4. Create responsive ad units for News, Academy and Ports. Copy each numeric slot ID into the matching placement.
5. Set `certifiedCmpReady` and `enabled` to `true` only after those steps are complete.
6. Copy `ads.txt.example` to `ads.txt`, replace the sample publisher ID, and confirm `/ads.txt` returns HTTP 200.

Example configuration:

```js
window.FOCUSEA_MONETIZATION = Object.freeze({
  enabled: true,
  publisherId: "ca-pub-1234567890123456",
  certifiedCmpReady: true,
  autoAds: true,
  placements: Object.freeze({
    news: Object.freeze({ slot: "1111111111", format: "auto", responsive: true }),
    academy: Object.freeze({ slot: "2222222222", format: "auto", responsive: true }),
    ports: Object.freeze({ slot: "3333333333", format: "auto", responsive: true })
  })
});
```

## Preview without Google requests

Open `index.html?adpreview=1#dashboard`. Preview blocks are clearly labelled and do not contact Google.

## Important deployment note

Focusea is deployed at the root-level `https://captainemo03.github.io/` URL so AdSense can review a path-free site address. GitHub Pages should not become the long-term host for a commercial SaaS product.

Google documents nonce-based strict CSP as the supported AdSense CSP approach because advertising domains can change. The current static deployment uses a constrained Google-domain allowlist. Before production activation, move CSP to a host that can issue a fresh nonce per response, or test the final AdSense code against Google's current CSP guidance.

## Official references

- <https://support.google.com/adsense/answer/7584263>
- <https://support.google.com/adsense/answer/13554020>
- <https://support.google.com/adsense/answer/16283098>
- <https://support.google.com/adsense/answer/12171244>
