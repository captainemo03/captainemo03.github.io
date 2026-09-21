const fs = require("fs");
const path = require("path");

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules", "__pycache__", "teslim"]);
const ignoredFiles = new Set(["sinop_home.html"]);
const htmlFiles = walk(root).filter((file) => file.endsWith(".html") && !ignoredFiles.has(path.basename(file)));
const requiredPublicPages = [
  "index.html",
  "maritime-broker-tools.html",
  "voyage-estimate.html",
  "laytime-calculator.html",
  "demurrage-calculator.html",
  "port-intelligence.html",
  "stability.html",
  "insurance.html",
  "deal-surgeon.html",
  "privacy-policy.html",
  "terms-of-use.html",
  "advertising-policy.html",
  "about.html",
  "contact.html",
  "site-health.html"
];

const issues = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (ignoredDirs.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function addIssue(type, file, detail) {
  issues.push({ type, file, detail });
}

function stripQueryAndHash(ref) {
  return ref.split("#")[0].split("?")[0];
}

function isExternal(ref) {
  return /^(https?:|mailto:|tel:|data:|blob:|javascript:)/i.test(ref);
}

for (const page of requiredPublicPages) {
  const pagePath = path.join(root, page);
  if (!fs.existsSync(pagePath)) {
    addIssue("missing-page", page, "Required public page is missing.");
    continue;
  }
  const source = fs.readFileSync(pagePath, "utf8");
  if (!source.includes("site-shell.css")) addIssue("missing-site-shell", page, "site-shell.css is not linked.");
  if (!source.includes("institutional.css")) addIssue("missing-institutional-style", page, "institutional.css is not linked.");
  if (!source.includes("site-shell.js")) addIssue("missing-site-shell", page, "site-shell.js is not linked.");
}

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, "utf8");
  const fileRel = rel(file);
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  [...new Set(duplicates)].forEach((id) => addIssue("duplicate-id", fileRel, `Duplicate id: ${id}`));

  for (const match of source.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].trim();
    if (!raw || raw.startsWith("#") || isExternal(raw)) continue;
    const clean = stripQueryAndHash(raw);
    if (!clean) continue;
    const target = path.resolve(path.dirname(file), clean);
    if (!target.startsWith(root) || !fs.existsSync(target)) addIssue("missing-local-ref", fileRel, raw);
  }

  for (const match of source.matchAll(/href="#([^"]+)"/g)) {
    const anchor = match[1];
    if (!ids.includes(anchor) && fileRel === "index.html") {
      const pageLink = new RegExp(`data-page-link="${anchor}"`);
      if (!pageLink.test(source)) addIssue("missing-anchor", fileRel, `#${anchor}`);
    }
  }
}

const sitemapPath = path.join(root, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const page of requiredPublicPages) {
    const url = page === "index.html" ? "https://captainemo03.github.io/" : `https://captainemo03.github.io/${page}`;
    if (!sitemap.includes(url)) addIssue("sitemap-missing", "sitemap.xml", url);
  }
} else {
  addIssue("missing-file", "sitemap.xml", "Sitemap file is missing.");
}

const swPath = path.join(root, "service-worker.js");
if (fs.existsSync(swPath)) {
  const sw = fs.readFileSync(swPath, "utf8");
  const assets = [...sw.matchAll(/"\.\/([^"]*)"/g)].map((match) => match[1]).filter(Boolean);
  for (const asset of assets) {
    if (!fs.existsSync(path.join(root, asset))) addIssue("service-worker-missing-asset", "service-worker.js", asset);
  }
  if (!/focusea-free-data-1/.test(sw)) addIssue("service-worker-cache", "service-worker.js", "Cache name is not on the latest expected version.");
} else {
  addIssue("missing-file", "service-worker.js", "Service worker file is missing.");
}

if (issues.length) {
  console.error("Focusea site audit failed:");
  for (const issue of issues) console.error(`- [${issue.type}] ${issue.file}: ${issue.detail}`);
  process.exit(1);
}

console.log(`Focusea site audit passed: ${htmlFiles.length} HTML files checked, ${requiredPublicPages.length} public pages verified.`);