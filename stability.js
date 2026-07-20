const forms = {
  cargo: document.querySelector("#cargoForm"),
  gm: document.querySelector("#gmForm"),
  trim: document.querySelector("#trimForm"),
  draft: document.querySelector("#draftForm"),
  hold: document.querySelector("#holdForm"),
  heel: document.querySelector("#heelForm"),
  limits: document.querySelector("#limitsForm")
};

const results = {
  cargo: document.querySelector("#cargoResult"),
  gm: document.querySelector("#gmResult"),
  trim: document.querySelector("#trimResult"),
  draft: document.querySelector("#draftResult"),
  hold: document.querySelector("#holdResult"),
  heel: document.querySelector("#heelResult"),
  limits: document.querySelector("#limitsResult")
};

const statusEls = {
  gmValue: document.querySelector("#gmStatusValue"),
  gmNote: document.querySelector("#gmStatusNote"),
  draftValue: document.querySelector("#draftStatusValue"),
  draftNote: document.querySelector("#draftStatusNote"),
  holdValue: document.querySelector("#holdStatusValue"),
  holdNote: document.querySelector("#holdStatusNote"),
  heelValue: document.querySelector("#heelStatusValue"),
  heelNote: document.querySelector("#heelStatusNote")
};

const reportBox = document.querySelector("#stabilityReport");
const downloadButtons = [
  document.querySelector("#downloadStabilityReport"),
  document.querySelector("#downloadStabilityReportBottom")
].filter(Boolean);

const labState = {
  cargo: null,
  gm: null,
  trim: null,
  draft: null,
  hold: null,
  heel: null,
  limits: null
};

function num(form, name) {
  return Number(new FormData(form).get(name)) || 0;
}

function fmt(value, decimals = 2) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function mt(value) {
  return `${fmt(value, 0)} mt`;
}

function m(value) {
  return `${fmt(value, 2)} m`;
}

function riskClass(level) {
  if (level === "OK") return "ok";
  if (level === "ALERT") return "danger";
  return "watch";
}

function metric(label, value) {
  return `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`;
}

function riskBadge(level, note) {
  return `<div class="risk ${riskClass(level)}">${level}: ${note}</div>`;
}

const stabilityEnglishSnippets = [
  [" ve ", " and "],
  ["Komur / Coal", "Coal"],
  ["Tahil / Grain", "Grain"],
  ["Demir cevheri / Iron ore", "Iron ore"],
  ["Konteyner / Containers", "Containers"],
  ["stability criteria ve ballast", "stability criteria and ballast"],
  ["ve warning", "and warning"],
  ["Sistem hesap sonucuna gore operasyonel tavsiye uretir.", "The system generates operational recommendations from the calculation result."],
  ["Trim, heel, GM ve tanktop riskine gore uygulanabilir duzeltme onerisi.", "Actionable correction suggestions based on trim, heel, GM and tanktop risk."],
  ["Plan major limit icinde.", "The plan is inside the major limit."],
  ["Ballast tanklari ile kucuk trim/heel fine-tune yap.", "Use ballast tanks for small trim/heel fine-tuning."],
  ["Risk neden olustu?", "Why did the risk appear?"],
  ["GM, trim, heel, tanktop ve draft sebebini sade aciklar.", "Plain explanation of GM, trim, heel, tanktop and draft causes."],
  ["GM dengeli.", "GM is balanced."],
  ["Trim operasyonel bantta:", "Trim is inside the operating band:"],
  ["Sancak-iskele dengesi iyi:", "Port-starboard balance is good:"],
  ["Ballast tank haritasi", "Ballast tank map"],
  ["Fore/aft, double bottom ve wing tank doluluklarini tek planda izle.", "Track fore/aft, double bottom and wing tank filling in one plan."],
  ["Egitim ve demo icin hazir operasyon senaryolari.", "Ready operation scenarios for training and demos."],
  ["Plan riskini acikla, trim azalt, rapor veya broker notu hazirla.", "Explain plan risk, reduce trim, prepare a report or broker note."],
  ["Bu plan neden riskli?", "Why is this plan risky?"],
  ["Trim'i azalt", "Reduce trim"],
  ["Load plan raporu hazirla", "Prepare load plan report"],
  ["Broker maili yaz", "Write broker mail"],
  ["PDF indirildikce rapor kaydi, risk sonucu ve tekrar indirme.", "Every PDF download is logged with risk result and re-download access."],
  ["ve ruzgar momentini gir", "and enter wind moment"],
  ["Kullanım Koşulları", "Terms of Use"],
  ["Gizlilik", "Privacy"],
  ["Güvenlik", "Security"],
  ["yük", "cargo"],
  ["Yük", "Cargo"],
  ["gemi", "vessel"],
  ["Gemi", "Vessel"],
  ["stabilite", "stability"],
  ["Stabilite", "Stability"]
];

let stabilityEnglishObserverReady = false;
let stabilityEnglishNormalizing = false;

function translateStabilityEnglish(value = "") {
  let text = String(value);
  stabilityEnglishSnippets.forEach(([snippet, replacement]) => {
    text = text.split(snippet).join(replacement);
  });
  return text;
}

function normalizeStabilityEnglish(root = document.body) {
  if (!root || stabilityEnglishNormalizing) return;
  stabilityEnglishNormalizing = true;
  try {
    document.documentElement.lang = "en";
    const walker = document.createTreeWalker(root, 4);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const tag = node.parentElement?.tagName;
      if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CANVAS", "SVG"].includes(tag)) return;
      const translated = translateStabilityEnglish(node.nodeValue);
      if (translated !== node.nodeValue) node.nodeValue = translated;
    });
  } finally {
    stabilityEnglishNormalizing = false;
  }
}

function setupStabilityEnglishObserver() {
  if (stabilityEnglishObserverReady || !document.body) return;
  stabilityEnglishObserverReady = true;
  let pending = 0;
  const observer = new MutationObserver(() => {
    if (stabilityEnglishNormalizing) return;
    clearTimeout(pending);
    pending = setTimeout(() => normalizeStabilityEnglish(), 50);
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

function setStatus(valueElement, noteElement, value, note) {
  if (!valueElement || !noteElement) return;
  valueElement.textContent = value;
  noteElement.textContent = note;
}

function renderResult(target, metrics, level, note, extra = "") {
  target.innerHTML = `
    <div class="result-grid">${metrics.map((item) => metric(item.label, item.value)).join("")}</div>
    ${riskBadge(level, note)}
    ${extra}
  `;
}

function calculateCargo() {
  const form = forms.cargo;
  const dwt = num(form, "dwt");
  const currentDisplacement = num(form, "currentDisplacement");
  const cargo = num(form, "cargo");
  const bunkers = num(form, "bunkers");
  const stores = num(form, "stores");
  const constants = num(form, "constants");
  const nonCargo = bunkers + stores + constants;
  const availableCargo = Math.max(dwt - nonCargo, 0);
  const margin = availableCargo - cargo;
  const dwtUse = dwt ? ((cargo + nonCargo) / dwt) * 100 : 0;
  const finalDisplacement = currentDisplacement + cargo + bunkers + stores + constants;
  const level = margin >= 1500 ? "OK" : margin >= 0 ? "WATCH" : "ALERT";
  const note = margin >= 0 ? `${mt(margin)} DWT margin remains` : `${mt(Math.abs(margin))} over planned DWT allowance`;

  labState.cargo = {
    title: "Cargo Intake Planner",
    lines: [
      `Available cargo allowance: ${mt(availableCargo)}`,
      `Planned cargo: ${mt(cargo)}`,
      `DWT utilization: ${fmt(dwtUse, 1)}%`,
      `Estimated final displacement: ${mt(finalDisplacement)}`,
      `Status: ${level} - ${note}`
    ]
  };

  renderResult(results.cargo, [
    { label: "Available cargo", value: mt(availableCargo) },
    { label: "DWT utilization", value: `${fmt(dwtUse, 1)}%` },
    { label: "Final displacement", value: mt(finalDisplacement) }
  ], level, note);
  updateReport();
}

function calculateGm() {
  const form = forms.gm;
  const rows = [
    { w: num(form, "lightship"), kg: num(form, "lightshipKg"), label: "Lightship" },
    { w: num(form, "cargo"), kg: num(form, "cargoKg"), label: "Cargo" },
    { w: num(form, "bunkers"), kg: num(form, "bunkersKg"), label: "Bunkers/stores" },
    { w: num(form, "ballast"), kg: num(form, "ballastKg"), label: "Ballast" }
  ];
  const displacement = rows.reduce((sum, row) => sum + row.w, 0);
  const moment = rows.reduce((sum, row) => sum + row.w * row.kg, 0);
  const kg = displacement ? moment / displacement : 0;
  const km = num(form, "km");
  const fsc = num(form, "fsc");
  const minGm = num(form, "minGm");
  const gm = km - kg;
  const corrected = gm - fsc;
  const margin = corrected - minGm;
  const level = corrected >= minGm + 0.25 ? "OK" : corrected >= minGm ? "WATCH" : "ALERT";
  const note = margin >= 0 ? `${m(margin)} above minimum GM` : `${m(Math.abs(margin))} below minimum GM`;

  labState.gm = {
    title: "Corrected GM Calculator",
    lines: [
      `Displacement: ${mt(displacement)}`,
      `KG: ${m(kg)}`,
      `Initial GM: ${m(gm)}`,
      `Free surface correction: ${m(fsc)}`,
      `Corrected GM: ${m(corrected)}`,
      `Minimum GM: ${m(minGm)}`,
      `Status: ${level} - ${note}`
    ]
  };

  setStatus(statusEls.gmValue, statusEls.gmNote, m(corrected), `${level} - ${note}`);
  renderResult(results.gm, [
    { label: "Displacement", value: mt(displacement) },
    { label: "KG", value: m(kg) },
    { label: "Corrected GM", value: m(corrected) }
  ], level, note);
  updateReport();
}

function calculateTrim() {
  const form = forms.trim;
  const draftFwd = num(form, "draftFwd");
  const draftAft = num(form, "draftAft");
  const lbp = Math.max(num(form, "lbp"), 1);
  const lcf = num(form, "lcf");
  const mctc = Math.max(num(form, "mctc"), 1);
  const shiftWeight = num(form, "shiftWeight");
  const shiftDistance = num(form, "shiftDistance");
  const trim = draftAft - draftFwd;
  const meanDraft = (draftAft + draftFwd) / 2;
  const shiftMoment = shiftWeight * shiftDistance;
  const trimChangeCm = shiftMoment / mctc;
  const aftChangeM = (trimChangeCm / 100) * ((lbp / 2 - lcf) / lbp);
  const fwdChangeM = -(trimChangeCm / 100) * ((lbp / 2 + lcf) / lbp);
  const newAft = draftAft + aftChangeM;
  const newFwd = draftFwd + fwdChangeM;
  const level = Math.abs(trim + trimChangeCm / 100) <= 1.2 ? "OK" : Math.abs(trim + trimChangeCm / 100) <= 2 ? "WATCH" : "ALERT";
  const note = `Estimated trim change ${fmt(trimChangeCm, 1)} cm from cargo shift`;

  labState.trim = {
    title: "Trim & Cargo Shift",
    lines: [
      `Present trim by stern: ${m(trim)}`,
      `Mean draft: ${m(meanDraft)}`,
      `Shift moment: ${fmt(shiftMoment, 0)} mt-m`,
      `Trim change: ${fmt(trimChangeCm, 1)} cm`,
      `Estimated new fwd/aft drafts: ${m(newFwd)} / ${m(newAft)}`,
      `Status: ${level} - ${note}`
    ]
  };

  renderResult(results.trim, [
    { label: "Present trim", value: m(trim) },
    { label: "Trim change", value: `${fmt(trimChangeCm, 1)} cm` },
    { label: "New fwd / aft", value: `${m(newFwd)} / ${m(newAft)}` }
  ], level, note);
  updateReport();
}

function calculateDraft() {
  const form = forms.draft;
  const fwd = (num(form, "fwdPort") + num(form, "fwdStbd")) / 2;
  const mid = (num(form, "midPort") + num(form, "midStbd")) / 2;
  const aft = (num(form, "aftPort") + num(form, "aftStbd")) / 2;
  const meanDraft = (fwd + 6 * mid + aft) / 8;
  const density = num(form, "density") || 1.025;
  const refDraft = num(form, "refDraft");
  const refDisplacement = num(form, "refDisplacement");
  const tpc = num(form, "tpc");
  const deductions = num(form, "deductions");
  const otherWeights = num(form, "otherWeights");
  const displacement = refDisplacement + (meanDraft - refDraft) * 100 * tpc;
  const densityCorrected = displacement * (density / 1.025);
  const netCargo = densityCorrected - deductions - otherWeights;
  const level = netCargo > 0 ? "OK" : "ALERT";
  const note = netCargo > 0 ? "Draft survey cargo estimate generated" : "Inputs produce negative cargo estimate";

  labState.draft = {
    title: "Draft Survey Cargo Estimate",
    lines: [
      `Fwd / mid / aft mean drafts: ${m(fwd)} / ${m(mid)} / ${m(aft)}`,
      `Quarter mean draft: ${m(meanDraft)}`,
      `Table displacement: ${mt(displacement)}`,
      `Density corrected displacement: ${mt(densityCorrected)}`,
      `Estimated net cargo: ${mt(netCargo)}`,
      `Status: ${level} - ${note}`
    ]
  };

  setStatus(statusEls.draftValue, statusEls.draftNote, mt(netCargo), `${level} - ${note}`);
  renderResult(results.draft, [
    { label: "Quarter mean", value: m(meanDraft) },
    { label: "Corrected displacement", value: mt(densityCorrected) },
    { label: "Estimated cargo", value: mt(netCargo) }
  ], level, note);
  updateReport();
}

function calculateHold() {
  const form = forms.hold;
  const loads = [1, 2, 3, 4, 5].map((i) => ({
    hold: i,
    load: num(form, `hold${i}`),
    max: Math.max(num(form, `max${i}`), 1)
  }));
  const total = loads.reduce((sum, item) => sum + item.load, 0);
  const maxTotal = loads.reduce((sum, item) => sum + item.max, 0);
  const maxUtil = Math.max(...loads.map((item) => item.load / item.max));
  const minLoad = Math.min(...loads.map((item) => item.load));
  const maxLoad = Math.max(...loads.map((item) => item.load));
  const imbalance = maxLoad - minLoad;
  const sf = num(form, "sf");
  const capacity = num(form, "capacity");
  const broken = num(form, "broken");
  const volumeRequired = total * sf * (1 + broken / 100);
  const volumeUse = capacity ? (volumeRequired / capacity) * 100 : 0;
  const level = maxUtil <= 0.92 && volumeUse <= 92 ? "OK" : maxUtil <= 1 && volumeUse <= 100 ? "WATCH" : "ALERT";
  const note = level === "OK" ? "Hold loads and volume look workable" : "Review hold limits, trim/stress and volume fit";
  const bars = `
    <div class="bar-list">
      ${loads.map((item) => {
        const pct = (item.load / item.max) * 100;
        return `<div class="bar-row"><span>Hold ${item.hold}</span><div class="bar-track"><i style="width:${Math.min(pct, 120)}%"></i></div><strong>${fmt(pct, 0)}%</strong></div>`;
      }).join("")}
    </div>
  `;

  labState.hold = {
    title: "Hold Distribution & Stowage",
    lines: [
      `Total cargo in holds: ${mt(total)}`,
      `Hold capacity total: ${mt(maxTotal)}`,
      `Highest hold utilization: ${fmt(maxUtil * 100, 1)}%`,
      `Max/min hold imbalance: ${mt(imbalance)}`,
      `Required volume incl. broken stowage: ${fmt(volumeRequired, 0)} m3`,
      `Bale capacity use: ${fmt(volumeUse, 1)}%`,
      `Status: ${level} - ${note}`
    ]
  };

  setStatus(statusEls.holdValue, statusEls.holdNote, `${fmt(volumeUse, 0)}%`, `${level} - ${note}`);
  renderResult(results.hold, [
    { label: "Total cargo", value: mt(total) },
    { label: "Highest hold use", value: `${fmt(maxUtil * 100, 1)}%` },
    { label: "Volume use", value: `${fmt(volumeUse, 1)}%` }
  ], level, note, bars);
  updateReport();
}

function calculateHeel() {
  const form = forms.heel;
  const displacement = Math.max(num(form, "displacement"), 1);
  const gm = num(form, "gm");
  const shiftWeight = num(form, "shiftWeight");
  const shiftDistance = num(form, "shiftDistance");
  const otherMoment = num(form, "otherMoment");
  const moment = shiftWeight * shiftDistance + otherMoment;
  const denominator = displacement * Math.max(gm, 0.01);
  const heelRad = Math.atan(moment / denominator);
  const heelDeg = heelRad * (180 / Math.PI);
  const level = gm <= 0 ? "ALERT" : heelDeg <= 2 ? "OK" : heelDeg <= 5 ? "WATCH" : "ALERT";
  const note = gm <= 0 ? "GM is zero or negative" : `Estimated heel angle ${fmt(heelDeg, 2)} deg`;

  labState.heel = {
    title: "Heel Angle Quick Check",
    lines: [
      `Heeling moment: ${fmt(moment, 0)} mt-m`,
      `Displacement x GM: ${fmt(denominator, 0)} mt-m`,
      `Estimated heel angle: ${fmt(heelDeg, 2)} deg`,
      `Status: ${level} - ${note}`
    ]
  };

  setStatus(statusEls.heelValue, statusEls.heelNote, `${fmt(heelDeg, 2)} deg`, `${level} - ${note}`);
  renderResult(results.heel, [
    { label: "Heeling moment", value: `${fmt(moment, 0)} mt-m` },
    { label: "Righting base", value: `${fmt(denominator, 0)} mt-m` },
    { label: "Heel angle", value: `${fmt(heelDeg, 2)} deg` }
  ], level, note);
  updateReport();
}

function calculateOperationalLimits() {
  const form = forms.limits;
  if (!form) return;
  const meanDraft = num(form, "meanDraft");
  const weightChange = num(form, "weightChange");
  const tpc = Math.max(num(form, "tpc"), 0.01);
  const waterDepth = num(form, "waterDepth");
  const requiredUkc = num(form, "requiredUkc");
  const airDraft = num(form, "airDraft");
  const clearance = num(form, "clearance");
  const density = num(form, "density") || 1.025;
  const beam = Math.max(num(form, "beam"), 0.01);
  const listAngle = num(form, "listAngle");

  const immersionCm = weightChange / tpc;
  const finalDraft = meanDraft + immersionCm / 100;
  const densityAllowance = finalDraft * (1.025 / density - 1);
  const saltEquivalentDraft = finalDraft + densityAllowance;
  const ukc = waterDepth - saltEquivalentDraft;
  const airDraftAfter = Math.max(airDraft - immersionCm / 100, 0);
  const airClearance = clearance - airDraftAfter;
  const listCorrection = (beam / 2) * Math.sin(Math.abs(listAngle) * Math.PI / 180);
  const deepestSideDraft = saltEquivalentDraft + listCorrection;
  const limitingUkc = waterDepth - deepestSideDraft;
  const level = limitingUkc >= requiredUkc && airClearance >= 0.5
    ? "OK"
    : limitingUkc >= requiredUkc * 0.75 && airClearance >= 0
      ? "WATCH"
      : "ALERT";
  const note = level === "OK"
    ? "UKC and air draft margins look workable"
    : level === "WATCH"
      ? "Margins are tight; verify tide, squat and terminal clearance"
      : "Operational limit exceeded or too close";

  labState.limits = {
    title: "Operational Limits & Hydrostatics",
    lines: [
      `Weight change immersion: ${fmt(immersionCm, 1)} cm`,
      `Estimated final draft: ${m(finalDraft)}`,
      `Density allowance: ${m(densityAllowance)}`,
      `Salt-equivalent draft: ${m(saltEquivalentDraft)}`,
      `List correction at ${fmt(listAngle, 1)} deg: ${m(listCorrection)}`,
      `Deepest side draft: ${m(deepestSideDraft)}`,
      `Limiting UKC: ${m(limitingUkc)}`,
      `Air draft after loading: ${m(airDraftAfter)}`,
      `Air clearance margin: ${m(airClearance)}`,
      `Status: ${level} - ${note}`
    ]
  };

  renderResult(results.limits, [
    { label: "Draft change", value: `${fmt(immersionCm, 1)} cm` },
    { label: "Deepest draft", value: m(deepestSideDraft) },
    { label: "Limiting UKC", value: m(limitingUkc) },
    { label: "Air clearance", value: m(airClearance) }
  ], level, note);
  updateReport();
}

function buildReportText() {
  const sections = Object.values(labState).filter(Boolean);
  if (!sections.length) return "Focusea Cargo & Stability Lab\nNo calculations run yet.";
  return [
    "Focusea Cargo & Stability Lab",
    `Generated: ${new Date().toLocaleString()}`,
    "Important: Planning estimate only. Use vessel-approved stability booklet/loadicator for operations.",
    "",
    ...sections.flatMap((section) => [
      section.title,
      "-".repeat(section.title.length),
      ...section.lines,
      ""
    ])
  ].join("\n");
}

function updateReport() {
  if (reportBox) reportBox.textContent = buildReportText();
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

function bind(form, handler) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handler();
  });
}

bind(forms.cargo, calculateCargo);
bind(forms.gm, calculateGm);
bind(forms.trim, calculateTrim);
bind(forms.draft, calculateDraft);
bind(forms.hold, calculateHold);
bind(forms.heel, calculateHeel);
bind(forms.limits, calculateOperationalLimits);

downloadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    downloadTextFile("focusea-cargo-stability-report.txt", buildReportText());
  });
});

calculateCargo();
calculateGm();
calculateTrim();
calculateDraft();
calculateHold();
calculateHeel();
calculateOperationalLimits();
normalizeStabilityEnglish();
setupStabilityEnglishObserver();
