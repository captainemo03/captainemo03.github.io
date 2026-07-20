const quoteForm = document.querySelector("#insuranceQuoteForm");
const quoteOutput = document.querySelector("#quoteOutput");
const coverageOutput = document.querySelector("#coverageOutput");
const claimOutput = document.querySelector("#claimOutput");
const companyOutput = document.querySelector("#companyOutput");
const referralOutput = document.querySelector("#referralOutput");
const comparisonOutput = document.querySelector("#comparisonOutput");
const glossaryOutput = document.querySelector("#insuranceGlossary");
const premiumStatus = document.querySelector("#premiumStatus");
const premiumStatusNote = document.querySelector("#premiumStatusNote");
const riskStatus = document.querySelector("#riskStatus");
const riskStatusNote = document.querySelector("#riskStatusNote");
const deductibleStatus = document.querySelector("#deductibleStatus");
const deductibleStatusNote = document.querySelector("#deductibleStatusNote");
const decisionStatus = document.querySelector("#decisionStatus");
const decisionStatusNote = document.querySelector("#decisionStatusNote");
const exportStatus = document.querySelector("#exportStatus");
const downloadQuoteTxt = document.querySelector("#downloadQuoteTxt");
const downloadQuotePdf = document.querySelector("#downloadQuotePdf");
const downloadEmailDraft = document.querySelector("#downloadEmailDraft");
const downloadInsuranceReportTop = document.querySelector("#downloadInsuranceReportTop");

let lastQuote = null;

const cargoProfiles = {
  coal: { label: "Coal", risk: 48, multiplier: 1.16, note: "Moisture, self-heating, hold cleanliness and rain evidence matter." },
  grain: { label: "Grain", risk: 44, multiplier: 1.1, note: "Shifting, fumigation, shortage and weather exposure must be checked." },
  ironOre: { label: "Iron ore", risk: 56, multiplier: 1.22, note: "Density, tanktop stress, TML and liquefaction exposure matter." },
  container: { label: "Container", risk: 42, multiplier: 1.12, note: "Stack, reefer, IMDG and transshipment risks should be reviewed." },
  crudeOil: { label: "Crude oil", risk: 68, multiplier: 1.42, note: "Pollution, vetting, terminal acceptance and pumping risk are key." },
  lng: { label: "LNG", risk: 72, multiplier: 1.5, note: "Boil-off, terminal compatibility and high-value exposure are material." },
  chemicals: { label: "Chemicals", risk: 78, multiplier: 1.58, note: "MSDS, coating, segregation and pollution exposure drive underwriting." },
  projectCargo: { label: "Project cargo", risk: 82, multiplier: 1.72, note: "Heavy-lift, lashing, center of gravity and survey evidence matter." }
};

const coverageProfiles = {
  "Hull & Machinery": { baseRate: 0.0065, risk: 22, note: "Physical loss/damage to hull, machinery and equipment, subject to class and survey conditions." },
  "P&I": { baseRate: 0.0042, risk: 18, note: "Third-party liabilities, crew, pollution and collision exposures normally reviewed under club rules." },
  "Cargo Insurance": { baseRate: 0.0038, risk: 20, note: "Cargo loss/damage terms depend on Institute Cargo Clauses, packaging, stowage and transit risk." },
  "War Risk": { baseRate: 0.0085, risk: 36, note: "War, piracy and hostile act exposure. Breach areas and additional premium must be checked." },
  "Kidnap & Ransom": { baseRate: 0.0078, risk: 34, note: "Security-focused extension for piracy/kidnap exposure; route and BMP compliance matter." },
  "Charterers Liability": { baseRate: 0.0028, risk: 16, note: "Charterer exposures: cargo, bunkers, port damage, demurrage disputes and indemnities." },
  "Freight, Demurrage & Defence": { baseRate: 0.0019, risk: 14, note: "Legal cost support for freight, demurrage, charter party and claim disputes." },
  "Pollution Liability": { baseRate: 0.0055, risk: 30, note: "Pollution exposure depends on cargo, bunker quantity, trading area and local regulation." },
  "Port Risk Cover": { baseRate: 0.0035, risk: 18, note: "Useful for port stay, repair period, lay-up or restricted movement exposure." }
};

const companyProfiles = {
  london: {
    label: "London Market Syndicate",
    appetite: "Broad blue-water appetite with strong referral discipline.",
    multiplier: 1.08,
    capacity: 15000000,
    strengths: "Complex H&M, war extensions, layered placements and high-value risks.",
    conditions: "Subject to sanctions, class, claims record, route warranty and final slip wording."
  },
  piClub: {
    label: "International P&I Club",
    appetite: "Liability-led appetite focused on member quality and operational controls.",
    multiplier: 0.96,
    capacity: 25000000,
    strengths: "P&I, pollution, crew, collision, cargo liability and FDD-style disputes.",
    conditions: "Subject to club rules, entered vessel status, trading limits and calls history."
  },
  cargoSpecialist: {
    label: "Cargo Specialist Insurer",
    appetite: "Cargo-first appetite with strong packaging, stowage and survey requirements.",
    multiplier: 1.02,
    capacity: 12000000,
    strengths: "Project cargo, containers, bulk cargo damage and warehouse-to-warehouse transits.",
    conditions: "Subject to packing declaration, survey, lashing plan, ICC wording and loss history."
  },
  warRisk: {
    label: "War Risk Underwriter",
    appetite: "Selective appetite for breach areas, piracy zones and geopolitical exposure.",
    multiplier: 1.34,
    capacity: 8000000,
    strengths: "War AP, piracy, K&R coordination, breach notices and security warranties.",
    conditions: "Subject to voyage declaration, listed areas, BMP compliance and security plan."
  },
  regional: {
    label: "Regional Marine Insurer",
    appetite: "Practical regional appetite for lower complexity port and coastal risks.",
    multiplier: 0.9,
    capacity: 5000000,
    strengths: "Port risk, smaller cargo placements, local voyages and agency-backed files.",
    conditions: "Subject to local law, survey, documents, deductible and restricted trading area."
  }
};

function money(value, digits = 0) {
  return `$${Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: digits })}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(Number(value) || 0, min), max);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function collectFormValues(form) {
  return Object.fromEntries([...new FormData(form).entries()].map(([key, value]) => {
    const numberValue = Number(value);
    return [key, value !== "" && Number.isFinite(numberValue) ? numberValue : value];
  }));
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function downloadPdfLikeFile(filename, title, body) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>body{font-family:Arial,sans-serif;padding:28px;line-height:1.5;color:#102133}pre{white-space:pre-wrap}</style></head><body><h1>${escapeHtml(title)}</h1><pre>${escapeHtml(body)}</pre></body></html>`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.replace(/\.pdf$/i, ".html");
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function riskZoneProfile(zone = "") {
  const text = String(zone).toLowerCase();
  if (text.includes("sanctions")) return { multiplier: 1.9, score: 34, note: "Sanctions-sensitive route: compliance review and counterparty screening required." };
  if (text.includes("war") || text.includes("piracy")) return { multiplier: 1.75, score: 32, note: "War/piracy watch: underwriter referral likely." };
  if (text.includes("weather")) return { multiplier: 1.28, score: 18, note: "Weather-exposed voyage: routing, lashing and delay evidence matter." };
  if (text.includes("congested") || text.includes("strait")) return { multiplier: 1.18, score: 14, note: "Congested strait/port exposure: collision, delay and port damage risk." };
  return { multiplier: 1, score: 6, note: "Normal trading area based on user input." };
}

function vesselTypeMultiplier(type = "") {
  const text = String(type).toLowerCase();
  if (text.includes("lng")) return 1.45;
  if (text.includes("tanker")) return 1.32;
  if (text.includes("container")) return 1.14;
  if (text.includes("ro-ro")) return 1.12;
  if (text.includes("general")) return 1.08;
  return 1;
}

function complianceProfile(values = {}) {
  const sanctions = String(values.sanctionsStatus || "").toLowerCase();
  const survey = String(values.surveyStatus || "").toLowerCase();
  let score = 0;
  const notes = [];
  if (sanctions.includes("blocked")) {
    score += 60;
    notes.push("Sanctions status blocks quotation until cleared.");
  } else if (sanctions.includes("possible")) {
    score += 30;
    notes.push("Possible sanctions match requires compliance clearance.");
  } else if (sanctions.includes("pending")) {
    score += 12;
    notes.push("Sanctions screening is still pending.");
  } else {
    notes.push("Sanctions screening marked clear by user input.");
  }
  if (survey.includes("deficiency")) {
    score += 26;
    notes.push("Reported deficiency requires survey or exclusion.");
  } else if (survey.includes("required") || survey.includes("pending")) {
    score += 14;
    notes.push("Class/survey evidence must be completed before binding.");
  } else {
    notes.push("Class confirmation entered.");
  }
  return { score, notes };
}

function insurerBadgeClass(score) {
  if (score >= 75) return "danger";
  if (score >= 50) return "warning";
  return "";
}

function calculateQuote(values = {}) {
  const coverage = coverageProfiles[values.coverageType] || coverageProfiles["Hull & Machinery"];
  const cargo = cargoProfiles[values.cargoType] || cargoProfiles.grain;
  const company = companyProfiles[values.insuranceCompany] || companyProfiles.london;
  const zone = riskZoneProfile(values.riskZone);
  const compliance = complianceProfile(values);
  const age = Math.max(new Date().getFullYear() - (Number(values.buildYear) || new Date().getFullYear()), 0);
  const ageMultiplier = age > 25 ? 1.42 : age > 18 ? 1.24 : age > 10 ? 1.1 : 1;
  const typeMultiplier = vesselTypeMultiplier(values.vesselType);
  const claimMultiplier = 1 + Math.min(Number(values.claims) || 0, 5) * 0.12;
  const deductibleRatio = (Number(values.deductible) || 0) / Math.max(Number(values.insuredValue) || 1, 1);
  const deductibleCredit = deductibleRatio >= 0.02 ? 0.88 : deductibleRatio >= 0.01 ? 0.94 : 1;
  const lineSize = Number(values.lineSize) || company.capacity;
  const policyLimit = Number(values.policyLimit) || 0;
  const capacityPressure = policyLimit > lineSize ? 1.16 : policyLimit > lineSize * 0.75 ? 1.06 : 1;
  const reinsuranceMultiplier = String(values.reinsuranceNeeded || "").toLowerCase().includes("yes") ? 1.08 : 1;
  const premium = (Number(values.insuredValue) || 0) * coverage.baseRate * zone.multiplier * ageMultiplier * typeMultiplier * cargo.multiplier * claimMultiplier * deductibleCredit * company.multiplier * capacityPressure * reinsuranceMultiplier;
  const riskScore = clamp(Math.round(coverage.risk + zone.score + cargo.risk * 0.26 + age * 0.9 + (Number(values.claims) || 0) * 8 + compliance.score + (capacityPressure > 1 ? 8 : 0)), 0, 100);
  const decision = riskScore >= 82 ? "Do not bind / executive referral" : riskScore >= 72 ? "Refer to Underwriter" : riskScore >= 58 ? "High / senior review" : riskScore >= 40 ? "Medium / review terms" : "Low / quoteable";
  const recommendedDeductible = Math.max(Number(values.deductible) || 0, (Number(values.insuredValue) || 0) * (riskScore >= 70 ? 0.012 : riskScore >= 45 ? 0.008 : 0.005));
  const companyShare = premium * (clamp(Number(values.coinsuranceShare) || 100, 1, 100) / 100);
  const expiresAt = new Date(Date.now() + (Number(values.quoteValidity) || 7) * 86400000);
  return { coverage, cargo, company, zone, compliance, age, premium, riskScore, decision, recommendedDeductible, ageMultiplier, typeMultiplier, claimMultiplier, deductibleCredit, capacityPressure, reinsuranceMultiplier, companyShare, expiresAt };
}

function referralChecklist(values, quote) {
  const items = [
    { label: "Sanctions and counterparty screening", status: /clear/i.test(values.sanctionsStatus || "") ? "clear" : "required", note: quote.compliance.notes[0] || "Compliance status needed." },
    { label: "Class, survey and vessel condition", status: /confirmed/i.test(values.surveyStatus || "") ? "clear" : "required", note: quote.compliance.notes[1] || "Survey status needed." },
    { label: "Claims record", status: Number(values.claims) > 2 ? "required" : "clear", note: Number(values.claims) > 2 ? "High claim frequency needs loss run review." : "Claims count acceptable for indication." },
    { label: "Capacity / line size", status: Number(values.policyLimit) > Number(values.lineSize) ? "required" : "clear", note: Number(values.policyLimit) > Number(values.lineSize) ? "Requested limit exceeds company line; reinsurance or co-insurance needed." : "Requested limit sits within entered line." },
    { label: "Route warranty", status: quote.zone.score >= 30 ? "required" : "clear", note: quote.zone.note },
    { label: "Cargo conditions", status: quote.cargo.risk >= 70 ? "required" : "clear", note: quote.cargo.note }
  ];
  return items;
}

function comparisonScenarios(values, quote) {
  const base = quote.premium;
  return [
    { name: "Standard quote", premium: base, deductible: quote.recommendedDeductible, note: "Current input, company appetite and selected risk zone." },
    { name: "Higher deductible", premium: base * 0.92, deductible: quote.recommendedDeductible * 1.4, note: "Lower premium indication with more assured retention." },
    { name: "Senior referral terms", premium: base * 1.18, deductible: quote.recommendedDeductible * 1.15, note: "Stronger terms for sanctions, war, older vessel or heavy claim history." }
  ];
}

function claimRisks(values, quote) {
  const cargo = quote.cargo.label;
  return [
    { name: "Cargo damage", score: clamp(quote.riskScore * 0.62 + (cargo === "Project cargo" ? 24 : 8), 0, 100), note: "Packaging, stowage, survey and cargo nature drive exposure." },
    { name: "Delay / demurrage exposure", score: clamp(24 + quote.riskScore * 0.36, 0, 100), note: "FDD or charterers liability may be relevant for dispute cost." },
    { name: "Weather damage", score: /weather|war|piracy|congested/i.test(values.riskZone || "") ? 68 : 34, note: "Routing, lashing, sea state and port delay evidence matter." },
    { name: "Pollution", score: /tanker|lng/i.test(values.vesselType || "") || ["Crude oil", "Chemicals", "LNG"].includes(cargo) ? 76 : 34, note: "Cargo/bunker pollution exposure and local law sensitivity." },
    { name: "Machinery breakdown", score: clamp(quote.age * 3 + (values.vesselType === "LNG" ? 18 : 10), 0, 100), note: "Age, maintenance records and class status must be checked." },
    { name: "General average", score: clamp(30 + quote.riskScore * 0.42, 0, 100), note: "High-value cargo and casualty response can trigger GA contributions." }
  ];
}

function quoteText(values = collectFormValues(quoteForm), quote = calculateQuote(values)) {
  const risks = claimRisks(values, quote);
  return [
    "FOCUSEA MARINE INSURANCE QUOTE",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    "ASSURED / VESSEL",
    `Assured: ${values.assuredName || "-"}`,
    `Broker: ${values.brokerCompany || "-"}`,
    `Vessel: ${values.vesselName || "-"} / IMO ${values.imo || "-"}`,
    `Type: ${values.vesselType || "-"} / Flag: ${values.flag || "-"} / Class: ${values.classSociety || "-"}`,
    `Build year: ${values.buildYear || "-"} / Age: ${quote.age} years / DWT: ${values.dwt || "-"} / GT: ${values.gt || "-"}`,
    "",
    "VOYAGE / COVER",
    `Insurance company: ${quote.company.label}`,
    `Load port: ${values.loadPort || "-"}`,
    `Discharge port: ${values.dischargePort || "-"}`,
    `Route: ${values.route || "-"}`,
    `Cargo: ${quote.cargo.label}`,
    `Coverage: ${values.coverageType || "-"}`,
    `Policy limit: ${money(values.policyLimit || 0)} / company line: ${money(values.lineSize || quote.company.capacity)}`,
    `Co-insurance share: ${values.coinsuranceShare || 100}% / company share premium: ${money(quote.companyShare)}`,
    `Risk zone: ${values.riskZone || "-"}`,
    "",
    "INDICATION",
    `Insured value: ${money(values.insuredValue || 0)}`,
    `Estimated premium: ${money(quote.premium)}`,
    `Recommended deductible: ${money(quote.recommendedDeductible)}`,
    `Risk score: ${quote.riskScore}/100`,
    `Decision: ${quote.decision}`,
    `Quote valid until: ${quote.expiresAt.toLocaleDateString()}`,
    "",
    "UNDERWRITER NOTES",
    `Company appetite: ${quote.company.appetite}`,
    `Company strengths: ${quote.company.strengths}`,
    quote.coverage.note,
    quote.zone.note,
    `Cargo note: ${quote.cargo.note}`,
    `Broker / underwriter note: ${values.underwriterNote || "-"}`,
    "",
    "CLAIM RISK PANEL",
    ...risks.map((risk) => `- ${risk.name}: ${Math.round(risk.score)}/100 - ${risk.note}`),
    "",
    "REFERRAL CHECKLIST",
    ...referralChecklist(values, quote).map((item) => `- ${item.label}: ${item.status.toUpperCase()} - ${item.note}`),
    "",
    "DISCLAIMER",
    "This is an educational indication only. Binding insurance terms require licensed insurer/underwriter approval."
  ].join("\n");
}

function emailDraft(values = collectFormValues(quoteForm), quote = calculateQuote(values)) {
  return [
    `Subject: Marine insurance indication - ${values.vesselName || "Vessel"} / ${values.coverageType || "Cover"}`,
    "",
    "Dear Underwriting Team,",
    "",
    "Please find below an indicative marine insurance quote request generated in Focusea:",
    "",
    `Vessel: ${values.vesselName || "-"} / IMO ${values.imo || "-"}`,
    `Assured / broker: ${values.assuredName || "-"} / ${values.brokerCompany || "-"}`,
    `Type / flag / class: ${values.vesselType || "-"} / ${values.flag || "-"} / ${values.classSociety || "-"}`,
    `Voyage: ${values.loadPort || "-"} to ${values.dischargePort || "-"} (${values.route || "-"})`,
    `Cargo: ${quote.cargo.label}`,
    `Coverage: ${values.coverageType || "-"}`,
    `Proposed insurer: ${quote.company.label}`,
    `Policy limit / line: ${money(values.policyLimit || 0)} / ${money(values.lineSize || quote.company.capacity)}`,
    `Insured value: ${money(values.insuredValue || 0)}`,
    `Deductible: ${money(values.deductible || 0)} / suggested ${money(quote.recommendedDeductible)}`,
    `Estimated premium indication: ${money(quote.premium)}`,
    `Company share premium: ${money(quote.companyShare)}`,
    `Risk result: ${quote.decision} (${quote.riskScore}/100)`,
    "",
    `Broker / underwriter note: ${values.underwriterNote || "Please review terms, exclusions and subjectivities."}`,
    "",
    "Subject to underwriter review, sanctions screening, claims record, class confirmation and final policy wording.",
    "",
    "Best regards,"
  ].join("\n");
}

function renderGlossary() {
  const terms = [
    ["Institute Cargo Clauses", "Standard cargo insurance wording sets for cargo risks."],
    ["Deductible", "Amount retained by assured before insurer pays."],
    ["Total Loss", "Actual loss where ship or cargo is completely lost or irrecoverable."],
    ["Constructive Total Loss", "Loss where recovery/repair cost may exceed insured value threshold."],
    ["General Average", "Shared contribution after extraordinary sacrifice or expenditure for common safety."],
    ["Salvage", "Reward/cost related to saving ship or cargo from peril."],
    ["Subrogation", "Insurer's right to recover from responsible third parties after paying claim."],
    ["Sue and Labour", "Assured's duty/costs to minimize loss after casualty."],
    ["Breach Area", "War-risk area requiring notice or additional premium."]
  ];
  glossaryOutput.innerHTML = terms.map(([term, detail]) => `<div><strong>${escapeHtml(term)}</strong><span>${escapeHtml(detail)}</span></div>`).join("");
}

function renderQuote() {
  if (!quoteForm) return;
  const values = collectFormValues(quoteForm);
  const quote = calculateQuote(values);
  lastQuote = { values, quote, text: quoteText(values, quote), email: emailDraft(values, quote) };

  premiumStatus.textContent = money(quote.premium);
  premiumStatusNote.textContent = `${(quote.coverage.baseRate * 100).toFixed(2)}% base rate`;
  riskStatus.textContent = `${quote.riskScore}/100`;
  riskStatusNote.textContent = quote.zone.note;
  deductibleStatus.textContent = money(quote.recommendedDeductible);
  deductibleStatusNote.textContent = "Suggested retention";
  decisionStatus.textContent = quote.decision;
  decisionStatusNote.textContent = quote.riskScore >= 78 ? "Senior approval required" : "Quote indication";

  quoteOutput.innerHTML = `
    <div class="metric-grid">
      <div><span>Estimated premium</span><strong>${money(quote.premium)}</strong></div>
      <div><span>Risk score</span><strong>${quote.riskScore}/100</strong></div>
      <div><span>Decision</span><strong>${escapeHtml(quote.decision)}</strong></div>
      <div><span>Recommended deductible</span><strong>${money(quote.recommendedDeductible)}</strong></div>
      <div><span>Cargo</span><strong>${escapeHtml(quote.cargo.label)}</strong></div>
      <div><span>Coverage rate</span><strong>${(quote.coverage.baseRate * 100).toFixed(2)}%</strong></div>
      <div><span>Company</span><strong>${escapeHtml(quote.company.label)}</strong></div>
      <div><span>Company share</span><strong>${money(quote.companyShare)}</strong></div>
      <div><span>Valid until</span><strong>${escapeHtml(quote.expiresAt.toLocaleDateString())}</strong></div>
    </div>
  `;

  if (companyOutput) {
    const badge = insurerBadgeClass(quote.riskScore);
    companyOutput.innerHTML = `
      <div class="company-grid">
        <div class="company-card"><span>Selected company</span><strong>${escapeHtml(quote.company.label)}</strong><em class="quote-badge ${badge}">${escapeHtml(quote.decision)}</em></div>
        <div class="company-card"><span>Appetite</span><strong>${escapeHtml(quote.company.appetite)}</strong></div>
        <div class="company-card"><span>Capacity</span><strong>${money(quote.company.capacity)} model capacity</strong></div>
        <div class="company-card"><span>Line pressure</span><strong>${quote.capacityPressure > 1 ? "Capacity pressure detected" : "Within entered line"}</strong></div>
        <div class="company-card"><span>Strengths</span><strong>${escapeHtml(quote.company.strengths)}</strong></div>
        <div class="company-card"><span>Conditions</span><strong>${escapeHtml(quote.company.conditions)}</strong></div>
      </div>
    `;
  }

  if (referralOutput) {
    referralOutput.innerHTML = `<div class="referral-grid">${referralChecklist(values, quote).map((item) => `
      <div class="referral-card"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.status === "clear" ? "Clear" : "Required")}</strong><em class="quote-badge ${item.status === "clear" ? "" : "warning"}">${escapeHtml(item.status)}</em><span>${escapeHtml(item.note)}</span></div>
    `).join("")}</div>`;
  }

  coverageOutput.innerHTML = `
    <div class="coverage-list">
      <div><span>${escapeHtml(values.coverageType || "Coverage")}</span><strong>${escapeHtml(quote.coverage.note)}</strong></div>
      <div><span>Route watch</span><strong>${escapeHtml(quote.zone.note)}</strong></div>
      <div><span>Broker / underwriter note</span><strong>${escapeHtml(values.underwriterNote || "No note entered.")}</strong></div>
      <div><span>Exclusions to review</span><strong>War breach, sanctions, wear and tear, unseaworthiness, improper packing, late notice, undeclared dangerous cargo.</strong></div>
    </div>
  `;

  claimOutput.innerHTML = `<div class="risk-bars">${claimRisks(values, quote).map((risk) => `
    <div><span>${escapeHtml(risk.name)}</span><strong>${Math.round(risk.score)}/100</strong><em style="width:${clamp(risk.score, 0, 100)}%"></em><small>${escapeHtml(risk.note)}</small></div>
  `).join("")}</div>`;

  if (comparisonOutput) {
    comparisonOutput.innerHTML = `<div class="comparison-grid">${comparisonScenarios(values, quote).map((scenario) => `
      <div class="comparison-card"><span>${escapeHtml(scenario.name)}</span><strong>${money(scenario.premium)}</strong><span>Deductible: ${money(scenario.deductible)}</span><span>${escapeHtml(scenario.note)}</span></div>
    `).join("")}</div>`;
  }

  renderGlossary();
}

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  renderQuote();
});
quoteForm?.addEventListener("input", renderQuote);
quoteForm?.addEventListener("change", renderQuote);

function ensureQuote() {
  if (!lastQuote) renderQuote();
  return lastQuote;
}

downloadQuoteTxt?.addEventListener("click", () => {
  const quote = ensureQuote();
  downloadTextFile("focusea-marine-insurance-quote.txt", quote.text);
  exportStatus.textContent = "Downloaded quote TXT.";
});

downloadQuotePdf?.addEventListener("click", () => {
  const quote = ensureQuote();
  downloadPdfLikeFile("focusea-marine-insurance-printable-pack.html", "Focusea Marine Insurance Quote", quote.text);
  exportStatus.textContent = "Downloaded printable quote pack.";
});

downloadEmailDraft?.addEventListener("click", () => {
  const quote = ensureQuote();
  downloadTextFile("focusea-marine-insurance-email-draft.txt", quote.email);
  exportStatus.textContent = "Downloaded underwriter email draft.";
});

downloadInsuranceReportTop?.addEventListener("click", () => {
  const quote = ensureQuote();
  downloadTextFile("focusea-marine-insurance-report.txt", quote.text);
});

renderQuote();
