(() => {
  const STATE_KEY = "focusea-stability-realism-v1";

  const vesselTypes = {
    bulk: {
      name: "Handymax Bulk Carrier",
      loa: 189,
      beam: 32.2,
      lightship: 11800,
      baseKg: 8.7,
      km: 10.85,
      lcb: 94.5,
      tpc: 48,
      mctc: 820,
      holds: [
        { id: "H1", label: "Hold 1 / forward", lcg: 28, tcg: 0, max: 8200, volume: 10100, tanktop: 18 },
        { id: "H2", label: "Hold 2", lcg: 62, tcg: 0, max: 9800, volume: 12100, tanktop: 20 },
        { id: "H3", label: "Hold 3 / midship", lcg: 96, tcg: 0, max: 10500, volume: 13000, tanktop: 21 },
        { id: "H4", label: "Hold 4", lcg: 130, tcg: 0, max: 9800, volume: 12100, tanktop: 20 },
        { id: "H5", label: "Hold 5 / aft", lcg: 163, tcg: 0, max: 7800, volume: 9600, tanktop: 17 }
      ]
    },
    container: {
      name: "Feeder Container Vessel",
      loa: 171,
      beam: 27.6,
      lightship: 9200,
      baseKg: 9.6,
      km: 11.25,
      lcb: 86,
      tpc: 38,
      mctc: 610,
      holds: [
        { id: "BAY12", label: "Bay 12 / forward", lcg: 32, tcg: 0, max: 3200, volume: 4200, tanktop: 14 },
        { id: "BAY22", label: "Bay 22", lcg: 58, tcg: 0, max: 3900, volume: 5100, tanktop: 15 },
        { id: "BAY34", label: "Bay 34 / midship", lcg: 86, tcg: 0, max: 4400, volume: 5800, tanktop: 16 },
        { id: "BAY46", label: "Bay 46", lcg: 114, tcg: 0, max: 3900, volume: 5100, tanktop: 15 },
        { id: "BAY58", label: "Bay 58 / aft", lcg: 140, tcg: 0, max: 3000, volume: 3900, tanktop: 13 }
      ]
    },
    tanker: {
      name: "Product / Chemical Tanker",
      loa: 183,
      beam: 32,
      lightship: 10500,
      baseKg: 8.2,
      km: 10.4,
      lcb: 91,
      tpc: 44,
      mctc: 760,
      holds: [
        { id: "1P/S", label: "Cargo tank 1 P/S", lcg: 32, tcg: 0, max: 6400, volume: 7600, tanktop: 16 },
        { id: "2P/S", label: "Cargo tank 2 P/S", lcg: 64, tcg: 0, max: 7600, volume: 8900, tanktop: 17 },
        { id: "3C", label: "Cargo tank 3 center", lcg: 92, tcg: 0, max: 8200, volume: 9600, tanktop: 18 },
        { id: "4P/S", label: "Cargo tank 4 P/S", lcg: 120, tcg: 0, max: 7600, volume: 8900, tanktop: 17 },
        { id: "5P/S", label: "Cargo tank 5 P/S", lcg: 150, tcg: 0, max: 5800, volume: 6800, tanktop: 15 }
      ]
    }
  };

  const cargoTypes = {
    container20: { label: "20ft Containers", kg: 10.8, sf: 1.4, density: 0.72, crane: "STS gantry crane or mobile harbour crane", risk: "High stack KG; watch lashing and tier limits." },
    container40: { label: "40ft Containers", kg: 11.7, sf: 1.6, density: 0.63, crane: "STS gantry crane", risk: "Large windage and upper-tier KG sensitivity." },
    coal: { label: "Coal parcel", kg: 7.7, sf: 1.25, density: 0.8, crane: "Grab crane + trimming dozer", risk: "Self-heating, moisture and trimming quality." },
    grain: { label: "Grain parcel", kg: 8.1, sf: 1.38, density: 0.72, crane: "Grain loader / spout", risk: "Shifting risk; check grain stability and trimming." },
    ironOre: { label: "Iron ore parcel", kg: 6.2, sf: 0.48, density: 2.08, crane: "Heavy grab / shiploader", risk: "Dense cargo; tanktop and bending moment critical." },
    project: { label: "Project cargo", kg: 13.4, sf: 2.2, density: 0.45, crane: "Heavy-lift shore crane / floating crane", risk: "High TCG/LCG sensitivity and securing plan required." },
    liquid: { label: "Liquid parcel", kg: 7.2, sf: 1.1, density: 0.91, crane: "Terminal loading arms / hose manifold", risk: "Free surface if slack tank; coating and segregation checks." }
  };

  const craneTypes = {
    auto: { label: "Auto select", swl: 0, outreach: 0, rate: 0 },
    shipCrane: { label: "Ship crane", swl: 36, outreach: 28, rate: 420 },
    mobileHarbour: { label: "Mobile harbour crane", swl: 125, outreach: 48, rate: 900 },
    sts: { label: "STS gantry crane", swl: 65, outreach: 66, rate: 1250 },
    shiploader: { label: "Bulk shiploader", swl: 45, outreach: 55, rate: 1800 },
    heavyLift: { label: "Floating heavy-lift crane", swl: 800, outreach: 70, rate: 180 },
    terminalArm: { label: "Terminal loading arm", swl: 999, outreach: 38, rate: 1100 }
  };

  const ballastTanks = [
    { id: "FP", label: "Fore peak", lcg: 12, tcg: 0, kg: 2.4, max: 900 },
    { id: "DBP", label: "Double bottom port", lcg: 82, tcg: -7.5, kg: 1.8, max: 1200 },
    { id: "DBS", label: "Double bottom starboard", lcg: 82, tcg: 7.5, kg: 1.8, max: 1200 },
    { id: "WTP", label: "Wing tank port", lcg: 112, tcg: -12, kg: 4.6, max: 850 },
    { id: "WTS", label: "Wing tank starboard", lcg: 112, tcg: 12, kg: 4.6, max: 850 },
    { id: "AP", label: "Aft peak", lcg: 171, tcg: 0, kg: 2.6, max: 1000 }
  ];

  const defaultState = {
    vesselType: "bulk",
    cargoType: "coal",
    selectedHold: "H3",
    side: "center",
    nextWeight: 750,
    craneType: "auto",
    liftWeight: 28,
    craneOutreach: 24,
    sequenceStep: 0,
    cargoes: [
      { id: "C1", cargoType: "coal", holdId: "H3", weight: 1800, side: "center" },
      { id: "C2", cargoType: "coal", holdId: "H2", weight: 1200, side: "port" },
      { id: "C3", cargoType: "coal", holdId: "H4", weight: 1200, side: "starboard" }
    ],
    ballast: { FP: 250, DBP: 500, DBS: 500, WTP: 150, WTS: 150, AP: 350 }
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STATE_KEY)) || {};
      return {
        ...defaultState,
        ...stored,
        ballast: { ...defaultState.ballast, ...(stored.ballast || {}) },
        cargoes: (Array.isArray(stored.cargoes) ? stored.cargoes : defaultState.cargoes).map((item) => ({ ...item }))
      };
    } catch {
      return { ...defaultState, ballast: { ...defaultState.ballast }, cargoes: defaultState.cargoes.map((item) => ({ ...item })) };
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch {
      // Browser storage can be unavailable; the live calculator still works.
    }
  }

  function activeVessel(state) {
    return vesselTypes[state.vesselType] || vesselTypes.bulk;
  }

  function cargoProfile(key) {
    return cargoTypes[key] || cargoTypes.coal;
  }

  function holdById(vessel, id) {
    return vessel.holds.find((hold) => hold.id === id) || vessel.holds[Math.floor(vessel.holds.length / 2)];
  }

  function sideTcg(side, beam) {
    if (side === "port") return -beam * 0.22;
    if (side === "starboard") return beam * 0.22;
    return 0;
  }

  function evaluate(state) {
    const vessel = activeVessel(state);
    const baseMoment = vessel.lightship * vessel.baseKg;
    const baseLongMoment = vessel.lightship * vessel.lcb;
    let weight = vessel.lightship;
    let verticalMoment = baseMoment;
    let longMoment = baseLongMoment;
    let transMoment = 0;
    let freeSurface = 0;

    const holdLoads = vessel.holds.map((hold) => ({ ...hold, weight: 0, usedVolume: 0, maxVolume: hold.volume, port: 0, starboard: 0, stress: 0 }));

    state.cargoes.forEach((cargo) => {
      const profile = cargoProfile(cargo.cargoType);
      const hold = holdById(vessel, cargo.holdId);
      const row = holdLoads.find((item) => item.id === hold.id);
      const cargoWeight = Number(cargo.weight) || 0;
      const tcg = sideTcg(cargo.side, vessel.beam);
      weight += cargoWeight;
      verticalMoment += cargoWeight * profile.kg;
      longMoment += cargoWeight * hold.lcg;
      transMoment += cargoWeight * tcg;
      row.weight += cargoWeight;
      row.usedVolume += cargoWeight * profile.sf;
      if (cargo.side === "port") row.port += cargoWeight;
      if (cargo.side === "starboard") row.starboard += cargoWeight;
      row.stress = Math.max(row.stress, cargoWeight / Math.max(1, hold.tanktop));
    });

    ballastTanks.forEach((tank) => {
      const amount = clamp(Number(state.ballast?.[tank.id]) || 0, 0, tank.max);
      const fill = amount / tank.max;
      weight += amount;
      verticalMoment += amount * tank.kg;
      longMoment += amount * tank.lcg;
      transMoment += amount * tank.tcg;
      if (fill > 0.08 && fill < 0.92) freeSurface += tank.max * 0.00034 * Math.abs(tank.tcg || 4);
    });

    const kg = verticalMoment / weight;
    const correctedGm = vessel.km - kg - freeSurface;
    const lcg = longMoment / weight;
    const trim = ((lcg - vessel.lcb) * weight) / Math.max(1, vessel.mctc) / 100;
    const heel = Math.atan2(transMoment, Math.max(1, weight * Math.max(0.25, correctedGm))) * (180 / Math.PI);
    const draftMean = 4.1 + (weight - vessel.lightship) / Math.max(1, vessel.tpc * 100);
    const draftForward = draftMean - trim / 2;
    const draftAft = draftMean + trim / 2;
    const stressMax = Math.max(...holdLoads.map((hold) => hold.weight / hold.max));
    const volumeMax = Math.max(...holdLoads.map((hold) => hold.usedVolume / Math.max(1, hold.maxVolume)));
    const sfbm = vessel.holds.map((hold, index) => {
      const local = holdLoads[index].weight;
      const ahead = holdLoads.slice(0, index + 1).reduce((sum, item) => sum + item.weight, 0);
      const shear = ((ahead - (state.cargoes.reduce((sum, cargo) => sum + (Number(cargo.weight) || 0), 0) * ((index + 1) / vessel.holds.length))) / 120).toFixed(1);
      const bending = ((local * Math.abs(hold.lcg - vessel.lcb)) / 1000).toFixed(1);
      return { station: hold.id, shear: Number(shear), bending: Number(bending) };
    });

    const gzMax = Math.max(0, correctedGm * 0.92);
    const angleMaxGz = clamp(28 + correctedGm * 3.5 - Math.abs(heel), 18, 48);
    const downflooding = clamp(32 + correctedGm * 4 - Math.abs(trim) * 1.4, 18, 52);
    const gzArea = Math.max(0, gzMax * angleMaxGz / 220);
    const imoPass = correctedGm >= 0.7 && gzArea >= 0.08 && downflooding >= 25 && Math.abs(heel) <= 5;
    const warnings = [];
    if (correctedGm < 0.7) warnings.push("Corrected GM is low; lower high-KG cargo or reduce slack tanks.");
    if (Math.abs(trim) > 1.2) warnings.push(`Trim is high (${Math.abs(trim).toFixed(2)} m); adjust fore/aft ballast or move cargo toward midship.`);
    if (Math.abs(heel) > 2.5) warnings.push(`Heel is high (${Math.abs(heel).toFixed(2)} deg); balance port/starboard loads or wing tanks.`);
    if (stressMax > 0.95) warnings.push("At least one hold/tank is near maximum weight capacity.");
    if (volumeMax > 0.95) warnings.push("At least one hold/tank is near maximum volume capacity.");
    holdLoads.forEach((hold) => {
      if (Math.abs(hold.port - hold.starboard) > 900) warnings.push(`${hold.id} has port/starboard imbalance above 900 mt.`);
      if (hold.stress > 520) warnings.push(`${hold.id} tanktop stress is high for the selected parcel.`);
    });
    if (!warnings.length) warnings.push("Plan is inside demo limits. Verify with class-approved loadicator before real operations.");

    return { vessel, weight, kg, correctedGm, trim, heel, draftMean, draftForward, draftAft, freeSurface, holdLoads, sfbm, warnings, gzMax, angleMaxGz, downflooding, gzArea, imoPass };
  }

  function recommendedCraneKey(cargoType) {
    if (cargoType === "container20" || cargoType === "container40") return "sts";
    if (cargoType === "coal" || cargoType === "grain" || cargoType === "ironOre") return "shiploader";
    if (cargoType === "project") return "heavyLift";
    if (cargoType === "liquid") return "terminalArm";
    return "mobileHarbour";
  }

  function craneAssessment(state) {
    const recommendedKey = recommendedCraneKey(state.cargoType);
    const selectedKey = state.craneType === "auto" ? recommendedKey : state.craneType;
    const crane = craneTypes[selectedKey] || craneTypes.mobileHarbour;
    const liftWeight = Math.max(0.1, Number(state.liftWeight) || 0.1);
    const outreach = Math.max(0, Number(state.craneOutreach) || 0);
    const liquidMode = state.cargoType === "liquid";
    const overload = !liquidMode && liftWeight > crane.swl;
    const reachFail = outreach > crane.outreach;
    const wrongMethod = state.craneType !== "auto" && selectedKey !== recommendedKey;
    const status = overload || reachFail ? "danger" : wrongMethod ? "watch" : "safe";
    const cycles = liquidMode ? 1 : Math.max(1, Math.ceil((Number(state.nextWeight) || 0) / liftWeight));
    const hours = crane.rate > 0 ? (Number(state.nextWeight) || 0) / crane.rate : 0;
    return {
      selectedKey, recommendedKey, crane, liftWeight, outreach, cycles, hours, status,
      notes: [
        overload ? `Lift weight exceeds SWL by ${(liftWeight - crane.swl).toFixed(1)} mt.` : `SWL margin ${liquidMode ? "not applicable to pumped cargo" : `${Math.max(0, crane.swl - liftWeight).toFixed(1)} mt`}.`,
        reachFail ? `Required outreach exceeds crane limit by ${(outreach - crane.outreach).toFixed(1)} m.` : `Outreach margin ${Math.max(0, crane.outreach - outreach).toFixed(1)} m.`,
        wrongMethod ? `${craneTypes[recommendedKey].label} is the preferred handling method for this cargo.` : "Handling method matches the cargo profile."
      ]
    };
  }

  function sequenceModel(state) {
    const vessel = activeVessel(state);
    const ordered = [...state.cargoes].sort((left, right) => {
      const leftHold = holdById(vessel, left.holdId);
      const rightHold = holdById(vessel, right.holdId);
      return Math.abs(leftHold.lcg - vessel.lcb) - Math.abs(rightHold.lcg - vessel.lcb);
    });
    return ordered.map((cargo, index) => {
      const partialState = { ...state, cargoes: ordered.slice(0, index + 1) };
      return { cargo, result: evaluate(partialState), index };
    });
  }

  function gzCurveSvg(result) {
    const maxAngle = 60;
    const chartWidth = 330;
    const chartHeight = 112;
    const baseline = 126;
    const maxGz = Math.max(0.35, result.gzMax * 1.2);
    const points = [];
    for (let angle = 0; angle <= maxAngle; angle += 5) {
      const radians = angle * Math.PI / 180;
      const decay = clamp(1 - Math.max(0, angle - result.angleMaxGz) / Math.max(12, result.downflooding), 0, 1);
      const gz = angle > result.downflooding ? 0 : Math.max(0, result.correctedGm * Math.sin(radians) * decay);
      const x = 18 + (angle / maxAngle) * chartWidth;
      const y = baseline - (gz / maxGz) * chartHeight;
      points.push(`${x.toFixed(1)},${clamp(y, 8, baseline).toFixed(1)}`);
    }
    const downfloodX = 18 + (clamp(result.downflooding, 0, maxAngle) / maxAngle) * chartWidth;
    return `
      <svg class="realism-gz-chart" viewBox="0 0 370 165" role="img" aria-label="Approximate righting lever curve">
        <line x1="18" y1="${baseline}" x2="354" y2="${baseline}" class="realism-chart-axis" />
        <line x1="18" y1="8" x2="18" y2="${baseline}" class="realism-chart-axis" />
        <line x1="${downfloodX.toFixed(1)}" y1="8" x2="${downfloodX.toFixed(1)}" y2="${baseline}" class="realism-chart-limit" />
        <polyline points="${points.join(" ")}" class="realism-chart-line" />
        <text x="20" y="157">0 deg</text><text x="315" y="157">60 deg</text>
        <text x="${clamp(downfloodX - 35, 24, 290).toFixed(1)}" y="20">Downflooding</text>
      </svg>
    `;
  }
  function optionList(items, selected, labelKey = "label") {
    return items.map((item) => `<option value="${item.id || item[0]}" ${(item.id || item[0]) === selected ? "selected" : ""}>${item[labelKey] || item[1]}</option>`).join("");
  }

  function renderShell(target) {
    target.innerHTML = `
      <section class="realism-lab" aria-label="Focusea realistic loadicator layer">
        <div class="realism-header">
          <div>
            <p class="eyebrow">Loadicator Realism Layer</p>
            <h2>Live cargo, ballast, trim, heel, GM and structural stress model</h2>
            <p>Educational decision-support model. Real loading requires the vessel's approved stability booklet and class-approved loadicator.</p>
          </div>
          <button type="button" class="ghost-button small" data-realism-report>Download Load Plan Report</button>
        </div>

        <div class="realism-layout">
          <form class="realism-controls" data-realism-form>
            <label><span>Vessel type</span><select name="vesselType"></select></label>
            <label><span>Cargo type</span><select name="cargoType"></select></label>
            <label><span>Hold / tank</span><select name="selectedHold"></select></label>
            <label><span>Port / starboard</span><select name="side"><option value="center">Center</option><option value="port">Port</option><option value="starboard">Starboard</option></select></label>
            <label><span>Parcel weight mt</span><input name="nextWeight" type="number" min="50" step="50" /></label>
            <label><span>Handling equipment</span><select name="craneType"></select></label>
            <label><span>Lift / grab weight mt</span><input name="liftWeight" type="number" min="0.1" step="0.5" /></label>
            <label><span>Required outreach m</span><input name="craneOutreach" type="number" min="0" step="1" /></label>
            <div class="button-row">
              <button type="button" data-realism-add>Add cargo</button>
              <button type="button" class="ghost-button small" data-realism-balance>Auto balance</button>
              <button type="button" class="ghost-button small" data-realism-reset>Reset</button>
            </div>
          </form>

          <div class="realism-ship-card">
            <div class="realism-ship" data-realism-ship></div>
            <div class="realism-metrics" data-realism-metrics></div>
          </div>
        </div>

        <div class="realism-grid">
          <article><div class="mini-heading"><span>Hold / Tank Loading</span><strong>weight, volume, imbalance</strong></div><div data-realism-holds></div></article>
          <article><div class="mini-heading"><span>Stowage Manifest</span><strong>remove or review parcels</strong></div><div data-realism-manifest></div></article>
          <article><div class="mini-heading"><span>Ballast Tanks</span><strong>trim and heel correction</strong></div><div data-realism-ballast></div></article>
          <article><div class="mini-heading"><span>SF / BM Envelope</span><strong>demo longitudinal strength</strong></div><div data-realism-structure></div></article>
          <article><div class="mini-heading"><span>Warnings and Recommendations</span><strong>what to fix</strong></div><div data-realism-warnings></div></article>
          <article><div class="mini-heading"><span>Loading Sequence</span><strong>crane and operation order</strong></div><div data-realism-sequence></div></article>
          <article><div class="mini-heading"><span>Cargo Intelligence</span><strong>cargo-specific risks</strong></div><div data-realism-cargo></div></article>
          <article><div class="mini-heading"><span>IMO / GZ Criteria</span><strong>righting lever model</strong></div><div data-realism-criteria></div></article>
          <article><div class="mini-heading"><span>Hydrostatic Snapshot</span><strong>TPC / MCTC / LCB</strong></div><div data-realism-hydro></div></article>
        </div>
      </section>
    `;
  }

  function render() {
    const target = document.querySelector("#realisticStabilityLab") || document.querySelector("main") || document.body;
    if (!target.dataset.realismReady) {
      if (!document.querySelector("#realisticStabilityLab")) {
        const wrapper = document.createElement("section");
        wrapper.id = "realisticStabilityLab";
        const main = document.querySelector("main") || document.body;
        main.appendChild(wrapper);
      }
      renderShell(document.querySelector("#realisticStabilityLab"));
      target.dataset.realismReady = "true";
    }

    const root = document.querySelector("#realisticStabilityLab");
    const state = loadState();
    const vessel = activeVessel(state);
    const result = evaluate(state);
    const form = root.querySelector("[data-realism-form]");
    const vesselSelect = form.elements.vesselType;
    const cargoSelect = form.elements.cargoType;
    const holdSelect = form.elements.selectedHold;
    const craneSelect = form.elements.craneType;
    vesselSelect.innerHTML = Object.entries(vesselTypes).map(([key, value]) => `<option value="${key}" ${key === state.vesselType ? "selected" : ""}>${value.name}</option>`).join("");
    cargoSelect.innerHTML = Object.entries(cargoTypes).map(([key, value]) => `<option value="${key}" ${key === state.cargoType ? "selected" : ""}>${value.label}</option>`).join("");
    holdSelect.innerHTML = optionList(vessel.holds, state.selectedHold);
    craneSelect.innerHTML = Object.entries(craneTypes).map(([key, value]) => `<option value="${key}" ${key === state.craneType ? "selected" : ""}>${value.label}</option>`).join("");
    form.elements.side.value = state.side;
    form.elements.nextWeight.value = state.nextWeight;
    form.elements.liftWeight.value = state.liftWeight;
    form.elements.craneOutreach.value = state.craneOutreach;

    root.querySelector("[data-realism-ship]").innerHTML = `
      <div class="realism-water"></div>
      <div class="realism-hull" style="transform: rotate(${clamp(result.trim * 1.8, -5, 5)}deg) skewY(${clamp(result.heel * 0.16, -2, 2)}deg);">
        ${result.holdLoads.map((hold) => {
          const pct = clamp(hold.weight / hold.max, 0, 1);
          return `<button type="button" data-realism-hold="${hold.id}" class="${state.selectedHold === hold.id ? "active" : ""}" style="--fill:${Math.round(pct * 100)}%"><span>${hold.id}</span><strong>${Math.round(hold.weight)} mt</strong></button>`;
        }).join("")}
      </div>
      <div class="realism-draft-line">FWD ${result.draftForward.toFixed(2)} m · AFT ${result.draftAft.toFixed(2)} m</div>
    `;

    root.querySelector("[data-realism-metrics]").innerHTML = [
      ["Displacement", `${Math.round(result.weight).toLocaleString()} mt`],
      ["KG / KM", `${result.kg.toFixed(2)} / ${result.vessel.km.toFixed(2)} m`],
      ["Corrected GM", `${result.correctedGm.toFixed(2)} m`],
      ["Trim", `${Math.abs(result.trim).toFixed(2)} m ${result.trim >= 0 ? "by stern" : "by head"}`],
      ["Heel", `${Math.abs(result.heel).toFixed(2)} deg ${result.heel >= 0 ? "starboard" : "port"}`],
      ["FSE correction", `${result.freeSurface.toFixed(2)} m`]
    ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");

    root.querySelector("[data-realism-holds]").innerHTML = result.holdLoads.map((hold) => {
      const weightPct = clamp((hold.weight / hold.max) * 100, 0, 130);
      const volumePct = clamp((hold.usedVolume / Math.max(1, hold.maxVolume)) * 100, 0, 130);
      return `<div class="realism-row"><span>${hold.label}</span><strong>${Math.round(hold.weight)} / ${hold.max} mt</strong><em style="--bar:${weightPct}%"></em><small>Volume ${volumePct.toFixed(0)}% · P/S diff ${Math.round(hold.starboard - hold.port)} mt</small></div>`;
    }).join("");

    root.querySelector("[data-realism-ballast]").innerHTML = ballastTanks.map((tank) => {
      const amount = clamp(Number(state.ballast?.[tank.id]) || 0, 0, tank.max);
      return `<label class="realism-tank"><span>${tank.label}</span><input data-realism-tank="${tank.id}" type="range" min="0" max="${tank.max}" value="${amount}" /><strong>${Math.round(amount)} / ${tank.max} mt</strong></label>`;
    }).join("");

    const selectedCargo = cargoProfile(state.cargoType);
    const craneCheck = craneAssessment(state);
    const sequence = sequenceModel(state);
    const sequenceIndex = sequence.length ? clamp(Number(state.sequenceStep) || 0, 0, sequence.length - 1) : 0;
    const activeSequence = sequence[sequenceIndex];

    root.querySelector("[data-realism-manifest]").innerHTML = state.cargoes.length ? state.cargoes.map((cargo) => `
      <div class="realism-manifest-row">
        <div><span>${cargoProfile(cargo.cargoType).label} - ${cargo.holdId}</span><strong>${cargo.side}</strong></div>
        <label><span>Weight mt</span><input data-realism-cargo-weight="${cargo.id}" type="number" min="0" step="50" value="${Number(cargo.weight) || 0}" /></label>
        <label><span>Side</span><select data-realism-cargo-side="${cargo.id}"><option value="center" ${cargo.side === "center" ? "selected" : ""}>Center</option><option value="port" ${cargo.side === "port" ? "selected" : ""}>Port</option><option value="starboard" ${cargo.side === "starboard" ? "selected" : ""}>Starboard</option></select></label>
        <button type="button" class="ghost-button small" data-realism-remove="${cargo.id}">Remove</button>
      </div>
    `).join("") : `<div class="realism-warning">No cargo parcels yet. Add one from the loading controls.</div>`;

    root.querySelector("[data-realism-structure]").innerHTML = result.sfbm.map((item) => `<div class="realism-structure-row"><span>${item.station}</span><em style="--sf:${clamp(Math.abs(item.shear) * 3, 4, 100)}%;--bm:${clamp(Math.abs(item.bending) * 0.9, 4, 100)}%"></em><strong>SF ${item.shear} - BM ${item.bending}</strong></div>`).join("");
    root.querySelector("[data-realism-warnings]").innerHTML = result.warnings.map((warning) => `<div class="realism-warning">${warning}</div>`).join("");

    root.querySelector("[data-realism-sequence]").innerHTML = sequence.length ? `
      <div class="realism-sequence-controls">
        <button type="button" class="ghost-button small" data-realism-sequence-prev ${sequenceIndex === 0 ? "disabled" : ""}>Previous</button>
        <strong>Step ${sequenceIndex + 1} / ${sequence.length}</strong>
        <button type="button" class="ghost-button small" data-realism-sequence-next ${sequenceIndex === sequence.length - 1 ? "disabled" : ""}>Next</button>
      </div>
      <div class="realism-sequence-card">
        <span>${cargoProfile(activeSequence.cargo.cargoType).label} to ${activeSequence.cargo.holdId}</span>
        <strong>${Number(activeSequence.cargo.weight).toLocaleString()} mt - ${activeSequence.cargo.side}</strong>
        <div class="realism-sequence-metrics">
          <small>GM ${activeSequence.result.correctedGm.toFixed(2)} m</small>
          <small>Trim ${activeSequence.result.trim.toFixed(2)} m</small>
          <small>Heel ${activeSequence.result.heel.toFixed(2)} deg</small>
          <small>Draft ${activeSequence.result.draftMean.toFixed(2)} m</small>
        </div>
      </div>
    ` : `<div class="realism-warning">Add cargo to generate a step-by-step loading sequence.</div>`;

    root.querySelector("[data-realism-cargo]").innerHTML = `
      <div class="realism-warning"><strong>${selectedCargo.label}</strong><br>${selectedCargo.risk}</div>
      <div class="realism-warning">Stowage factor: ${selectedCargo.sf.toFixed(2)} m3/mt - Model KG: ${selectedCargo.kg.toFixed(2)} m - Density: ${selectedCargo.density.toFixed(2)} mt/m3</div>
      <div class="realism-crane-check ${craneCheck.status}">
        <span>${craneCheck.crane.label}</span><strong>${craneCheck.status.toUpperCase()}</strong>
        <small>${craneCheck.cycles} cycles - ${craneCheck.hours.toFixed(1)} estimated hours - ${craneCheck.crane.rate} mt/h nominal rate</small>
        ${craneCheck.notes.map((note) => `<em>${note}</em>`).join("")}
      </div>
    `;

    root.querySelector("[data-realism-criteria]").innerHTML = `
      ${gzCurveSvg(result)}
      <div class="realism-criteria-grid">
        <div><span>Max GZ</span><strong>${result.gzMax.toFixed(2)} m</strong></div>
        <div><span>Angle at max GZ</span><strong>${result.angleMaxGz.toFixed(1)} deg</strong></div>
        <div><span>GZ area model</span><strong>${result.gzArea.toFixed(3)} m.rad</strong></div>
        <div><span>Downflooding</span><strong>${result.downflooding.toFixed(1)} deg</strong></div>
      </div>
      <div class="realism-verdict ${result.imoPass ? "safe" : "danger"}">${result.imoPass ? "DEMO CRITERIA PASS" : "DEMO CRITERIA FAIL"}</div>
    `;

    root.querySelector("[data-realism-hydro]").innerHTML = [
      ["TPC", `${result.vessel.tpc.toFixed(1)} mt/cm`],
      ["MCTC", `${result.vessel.mctc.toFixed(0)} mt-m/cm`],
      ["LCB", `${result.vessel.lcb.toFixed(1)} m`],
      ["Mean draft", `${result.draftMean.toFixed(2)} m`],
      ["Draft difference", `${Math.abs(result.draftAft - result.draftForward).toFixed(2)} m`],
      ["Free surface", `${result.freeSurface.toFixed(2)} m`]
    ].map(([label, value]) => `<div class="realism-hydro-row"><span>${label}</span><strong>${value}</strong></div>`).join("");
    root.querySelectorAll("[data-realism-hold]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = loadState();
        next.selectedHold = button.dataset.realismHold;
        saveState(next);
        render();
      });
    });
  }

  function reportText() {
    const state = loadState();
    const result = evaluate(state);
    return [
      "FOCUSEA LOADICATOR REALISM REPORT",
      `Generated: ${new Date().toLocaleString()}`,
      `Vessel: ${result.vessel.name}`,
      `Displacement: ${Math.round(result.weight)} mt`,
      `KG/KM/GM: ${result.kg.toFixed(2)} / ${result.vessel.km.toFixed(2)} / ${result.correctedGm.toFixed(2)} m`,
      `Draft F/A: ${result.draftForward.toFixed(2)} / ${result.draftAft.toFixed(2)} m`,
      `Trim: ${result.trim.toFixed(2)} m`,
      `Heel: ${result.heel.toFixed(2)} deg`,
      `GZ max / area: ${result.gzMax.toFixed(2)} m / ${result.gzArea.toFixed(3)} m.rad`,
      `Downflooding angle: ${result.downflooding.toFixed(1)} deg`,
      `Demo criteria: ${result.imoPass ? "PASS" : "FAIL"}`,
      `Handling equipment: ${craneAssessment(state).crane.label}`,
      "Warnings:",
      ...result.warnings.map((warning) => `- ${warning}`),
      "Cargo list:",
      ...state.cargoes.map((cargo) => `- ${cargoProfile(cargo.cargoType).label}: ${cargo.weight} mt in ${cargo.holdId} (${cargo.side})`),
      "Disclaimer: educational decision-support only; use approved vessel data for real loading."
    ].join("\n");
  }

  function bind() {
    const root = document.querySelector("#realisticStabilityLab");
    if (!root) return;
    root.addEventListener("input", (event) => {
      if (!event.target.matches("[data-realism-tank]")) return;
      const state = loadState();
      state.ballast[event.target.dataset.realismTank] = Number(event.target.value) || 0;
      saveState(state);
      if (event.target.nextElementSibling) event.target.nextElementSibling.textContent = event.target.value + " / " + event.target.max + " mt";
    });

    root.addEventListener("change", (event) => {
      const state = loadState();
      const form = root.querySelector("[data-realism-form]");
      if (event.target.matches("[data-realism-tank]")) {
        state.ballast[event.target.dataset.realismTank] = Number(event.target.value) || 0;
      } else if (event.target.matches("[data-realism-cargo-weight]")) {
        const cargo = state.cargoes.find((item) => item.id === event.target.dataset.realismCargoWeight);
        if (cargo) cargo.weight = Math.max(0, Number(event.target.value) || 0);
      } else if (event.target.matches("[data-realism-cargo-side]")) {
        const cargo = state.cargoes.find((item) => item.id === event.target.dataset.realismCargoSide);
        if (cargo) cargo.side = event.target.value;
      } else if (form && event.target.closest("[data-realism-form]")) {
        const values = new FormData(form);
        const previousVessel = activeVessel(state);
        const nextVesselType = String(values.get("vesselType") || state.vesselType);
        if (nextVesselType !== state.vesselType) {
          const nextVesselProfile = vesselTypes[nextVesselType] || vesselTypes.bulk;
          state.cargoes = state.cargoes.map((cargo) => {
            const oldIndex = Math.max(0, previousVessel.holds.findIndex((hold) => hold.id === cargo.holdId));
            const mappedHold = nextVesselProfile.holds[clamp(oldIndex, 0, nextVesselProfile.holds.length - 1)];
            return { ...cargo, holdId: mappedHold.id };
          });
        }
        state.vesselType = nextVesselType;
        state.cargoType = String(values.get("cargoType") || state.cargoType);
        state.selectedHold = String(values.get("selectedHold") || state.selectedHold);
        state.side = String(values.get("side") || state.side);
        state.nextWeight = Number(values.get("nextWeight")) || state.nextWeight;
        state.craneType = String(values.get("craneType") || state.craneType);
        state.liftWeight = Number(values.get("liftWeight")) || state.liftWeight;
        state.craneOutreach = Number(values.get("craneOutreach")) || state.craneOutreach;
        const nextVessel = activeVessel(state);
        if (!nextVessel.holds.some((hold) => hold.id === state.selectedHold)) {
          state.selectedHold = nextVessel.holds[Math.floor(nextVessel.holds.length / 2)].id;
        }
      }
      state.sequenceStep = 0;
      saveState(state);
      render();
    });
    root.addEventListener("click", (event) => {
      const state = loadState();
      const sequencePrev = event.target.closest("[data-realism-sequence-prev]");
      const sequenceNext = event.target.closest("[data-realism-sequence-next]");
      if (sequencePrev || sequenceNext) {
        const maxStep = Math.max(0, sequenceModel(state).length - 1);
        state.sequenceStep = clamp((Number(state.sequenceStep) || 0) + (sequenceNext ? 1 : -1), 0, maxStep);
        saveState(state);
        render();
        return;
      }
      if (event.target.matches("[data-realism-add]")) {
        state.cargoes = [...state.cargoes, {
          id: `C${Date.now()}`,
          cargoType: state.cargoType,
          holdId: state.selectedHold,
          side: state.side,
          weight: state.nextWeight
        }];
        saveState(state);
        render();
      }
      const removeButton = event.target.closest("[data-realism-remove]");
      if (removeButton) {
        state.cargoes = state.cargoes.filter((cargo) => cargo.id !== removeButton.dataset.realismRemove);
        saveState(state);
        render();
      }
      if (event.target.matches("[data-realism-reset]")) {
        saveState({ ...defaultState, ballast: { ...defaultState.ballast }, cargoes: defaultState.cargoes.map((item) => ({ ...item })) });
        render();
      }
      if (event.target.matches("[data-realism-balance]")) {
        state.ballast.DBP = state.ballast.DBS = 650;
        state.ballast.WTP = state.ballast.WTS = 250;
        state.ballast.FP = Math.max(150, state.ballast.FP - 100);
        state.ballast.AP = Math.max(150, state.ballast.AP - 100);
        state.cargoes = state.cargoes.map((cargo, index) => ({ ...cargo, side: index % 2 ? "port" : "starboard" }));
        saveState(state);
        render();
      }
      if (event.target.matches("[data-realism-report]")) {
        const blob = new Blob([reportText()], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "focusea-loadicator-realism-report.txt";
        link.click();
        URL.revokeObjectURL(url);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();
    bind();
  });
})();
