(function () {
  const form = document.querySelector("#loadicatorForm");
  const scene = document.querySelector(".loadicator-scene");
  const fallbackShip = document.querySelector("#fallbackShip");
  const fallbackCargo = document.querySelector("#fallbackCargo");
  const shipStowageLayer = document.querySelector("#shipStowageLayer");
  const shipAxisOverlay = document.querySelector("#shipAxisOverlay");
  const shipViewButtons = Array.from(document.querySelectorAll("[data-ship-view]"));
  const seaDraftReadout = document.querySelector("#seaDraftReadout");
  const metrics = document.querySelector("#loadicatorMetrics");
  const loadicatorSummaryGrid = document.querySelector("#loadicatorSummaryGrid");
  const loadicatorSourceNote = document.querySelector("#loadicatorSourceNote");
  const riskPill = document.querySelector("#loadicatorRisk");
  const holdLabel = document.querySelector("#loadicatorHoldLabel");
  const liveTrim = document.querySelector("#loadicatorLiveTrim");
  const resetButton = document.querySelector("#resetLoadicator");
  const quickLoadTarget = document.querySelector("#quickLoadTarget");
  const quickHoldButtons = Array.from(document.querySelectorAll("[data-hold]"));
  const quickLoadButtons = Array.from(document.querySelectorAll("[data-load-step]"));
  const quickLoadClear = document.querySelector("[data-load-clear]");
  const cargoExampleButtons = Array.from(document.querySelectorAll("[data-cargo-preset]"));
  const cargoPaletteStatus = document.querySelector("#cargoPaletteStatus");
  const cargoPlacementSummary = document.querySelector("#cargoPlacementSummary");
  const professionalPlanStatus = document.querySelector("#professionalPlanStatus");
  const parcelTemplateButtons = Array.from(document.querySelectorAll("[data-parcel-template]"));
  const holdDropZones = Array.from(document.querySelectorAll("[data-plan-hold]"));
  const parcelEditorForm = document.querySelector("#parcelEditorForm");
  const selectedParcelName = document.querySelector("#selectedParcelName");
  const duplicateParcelButton = document.querySelector("#duplicateParcel");
  const deleteParcelButton = document.querySelector("#deleteParcel");
  const applyParcelEditButton = document.querySelector("#applyParcelEdit");
  const cargoPlanTable = document.querySelector("#cargoPlanTable");
  const holdEvaluationGrid = document.querySelector("#holdEvaluationGrid");
  const shearCurveLine = document.querySelector("#shearCurveLine");
  const bendingCurveLine = document.querySelector("#bendingCurveLine");
  const stressStatusText = document.querySelector("#stressStatusText");
  const ballastPlanForm = document.querySelector("#ballastPlanForm");
  const ballastSummary = document.querySelector("#ballastSummary");
  const criteriaList = document.querySelector("#criteriaList");
  const loadAdviceList = document.querySelector("#loadAdviceList");
  const downloadLoadPlanReport = document.querySelector("#downloadLoadPlanReport");
  const autoBalancePanel = document.querySelector("#autoBalancePanel");
  const applyAutoBalanceButton = document.querySelector("#applyAutoBalance");
  const refreshAutoBalanceButton = document.querySelector("#refreshAutoBalance");
  const riskReasonList = document.querySelector("#riskReasonList");
  const loadingSequenceList = document.querySelector("#loadingSequenceList");
  const ballastTankMap = document.querySelector("#ballastTankMap");
  const cargoCompatibilityMatrix = document.querySelector("#cargoCompatibilityMatrix");
  const scenarioModeButtons = Array.from(document.querySelectorAll("[data-scenario]"));
  const scenarioModeOutput = document.querySelector("#scenarioModeOutput");
  const copilotActionButtons = Array.from(document.querySelectorAll("[data-copilot-action]"));
  const loadicatorCopilotOutput = document.querySelector("#loadicatorCopilotOutput");
  const loadPlanReportHistory = document.querySelector("#loadPlanReportHistory");
  const transverseForm = document.querySelector("#transverseForm");
  const transverseStatus = document.querySelector("#transverseStatus");
  const transverseMetrics = document.querySelector("#transverseMetrics");
  const crossSectionHull = document.querySelector("#sectionHull");
  const sectionCg = document.querySelector("#sectionCg");
  const sectionPortLoad = document.querySelector("#sectionPortLoad");
  const sectionStbdLoad = document.querySelector("#sectionStbdLoad");
  const heelDirectionLabel = document.querySelector("#heelDirectionLabel");
  const heelAngleLabel = document.querySelector("#heelAngleLabel");
  const gzCurveLine = document.querySelector("#gzCurveLine");
  const heelMarkerLine = document.querySelector("#heelMarkerLine");
  const gzPeakLabel = document.querySelector("#gzPeakLabel");

  if (!form || !scene || !fallbackShip || !fallbackCargo) return;

  const vesselProfiles = {
    handyBulker: {
      label: "Handy / Supramax Bulker",
      visual: "bulker",
      note: "Flexible geared dry bulk loading plan",
      baseDisplacement: 38200,
      baseKg: 8.1,
      km: 10.55,
      fsc: 0.18,
      mctc: 520,
      lbp: 180,
      tpc: 42,
      draftBase: 9.4,
      summerDwt: 56000,
      lightweight: 11200,
      maxCargo: 9000,
      capacity: 56000,
      width: "min(600px, 84%)",
      hull: "#4269e8",
      lower: "#7b255f",
      deck: "#95a8ff"
    },
    panamaxBulker: {
      label: "Panamax Bulker",
      visual: "bulker",
      note: "5 hold dry bulk stability envelope",
      baseDisplacement: 65000,
      baseKg: 8.4,
      km: 10.9,
      fsc: 0.22,
      mctc: 820,
      lbp: 225,
      tpc: 62,
      draftBase: 11.6,
      summerDwt: 82000,
      lightweight: 12800,
      maxCargo: 12000,
      capacity: 76000,
      width: "min(660px, 86%)",
      hull: "#2f4fb5",
      lower: "#8d2d68",
      deck: "#7d8cf1"
    },
    aframaxTanker: {
      label: "Aframax Tanker",
      visual: "tanker",
      note: "Liquid cargo with free surface sensitivity",
      baseDisplacement: 88000,
      baseKg: 9.15,
      km: 11.65,
      fsc: 0.34,
      mctc: 1080,
      lbp: 245,
      tpc: 76,
      draftBase: 12.8,
      summerDwt: 115000,
      lightweight: 18500,
      maxCargo: 15000,
      capacity: 118000,
      width: "min(700px, 88%)",
      hull: "#314485",
      lower: "#8d2d68",
      deck: "#d7deef"
    },
    feederContainer: {
      label: "Feeder Container Ship",
      visual: "container",
      note: "Deck stack KG and lashing risk focus",
      baseDisplacement: 24500,
      baseKg: 9.25,
      km: 10.75,
      fsc: 0.08,
      mctc: 360,
      lbp: 165,
      tpc: 31,
      draftBase: 8.1,
      summerDwt: 27500,
      lightweight: 7600,
      maxCargo: 6200,
      capacity: 34000,
      width: "min(570px, 82%)",
      hull: "#2450c2",
      lower: "#9d386e",
      deck: "#f5d36b"
    },
    lngCarrier: {
      label: "LNG Carrier",
      visual: "lng",
      note: "Membrane / spherical tank loading envelope",
      baseDisplacement: 112000,
      baseKg: 10.8,
      km: 13.35,
      fsc: 0.12,
      mctc: 1320,
      lbp: 285,
      tpc: 86,
      draftBase: 11.9,
      summerDwt: 82000,
      lightweight: 32000,
      maxCargo: 13000,
      capacity: 170000,
      width: "min(720px, 90%)",
      hull: "#1f6f9f",
      lower: "#17416e",
      deck: "#e8fbff"
    },
    mpv: {
      label: "MPV / Project Carrier",
      visual: "mpv",
      note: "Heavy lift, deck cargo and point load checks",
      baseDisplacement: 18500,
      baseKg: 7.7,
      km: 9.8,
      fsc: 0.14,
      mctc: 290,
      lbp: 145,
      tpc: 26,
      draftBase: 7.4,
      summerDwt: 18000,
      lightweight: 6200,
      maxCargo: 4500,
      capacity: 22000,
      width: "min(540px, 80%)",
      hull: "#5c3d9d",
      lower: "#7b255f",
      deck: "#f5d36b"
    }
  };

  const cargoProfiles = {
    coal: {
      label: "Coal / bulk",
      visual: "bulk",
      note: "Moderate SF, hold cleanliness and ventilation watch",
      kg: 8.5,
      sf: 1.35,
      color: "linear-gradient(180deg, #39f8d2, #109d95)",
      colorHex: 0x2df1ca,
      recommended: ["handyBulker", "panamaxBulker"],
      limited: ["mpv"]
    },
    grain: {
      label: "Grain",
      visual: "bulk",
      note: "High SF, trimming, shifting and fumigation checks",
      kg: 9.2,
      sf: 1.55,
      color: "linear-gradient(180deg, #ffe18a, #c98c1f)",
      colorHex: 0xf5d36b,
      recommended: ["handyBulker", "panamaxBulker"],
      limited: ["mpv"]
    },
    ironOre: {
      label: "Iron ore",
      visual: "ore",
      note: "Dense cargo: stress, tanktop and hold distribution critical",
      kg: 6.6,
      sf: 0.48,
      color: "linear-gradient(180deg, #b9b1a7, #6e6158)",
      colorHex: 0xa48c76,
      recommended: ["panamaxBulker", "handyBulker"],
      limited: []
    },
    containers: {
      label: "Containers",
      visual: "container",
      note: "Deck stack KG, lashing, wind and bay plan risk",
      kg: 12.4,
      sf: 2.15,
      color: "linear-gradient(180deg, #f5d36b, #d95f3e)",
      colorHex: 0xf5d36b,
      recommended: ["feederContainer"],
      limited: ["mpv"]
    },
    crudeOil: {
      label: "Crude oil",
      visual: "liquid",
      note: "Free surface, tank sequence and sloshing watch",
      kg: 7.4,
      sf: 1.18,
      color: "linear-gradient(180deg, #ff80ae, #7b255f)",
      colorHex: 0xff6b9c,
      recommended: ["aframaxTanker"],
      limited: []
    },
    lng: {
      label: "LNG",
      visual: "gas",
      note: "Cryogenic cargo: tank filling limits and heel sensitivity",
      kg: 10.5,
      sf: 2.55,
      color: "linear-gradient(180deg, #e8fbff, #7eefff 58%, #1f6f9f)",
      colorHex: 0x7eefff,
      recommended: ["lngCarrier"],
      limited: []
    },
    chemicals: {
      label: "Chemicals",
      visual: "chemical",
      note: "Segregation, coating, heating and free surface checks",
      kg: 7.8,
      sf: 1.08,
      color: "linear-gradient(180deg, #a8ffbf, #29a36a)",
      colorHex: 0x65e89a,
      recommended: ["aframaxTanker"],
      limited: ["mpv"]
    },
    projectCargo: {
      label: "Project cargo",
      visual: "project",
      note: "Point load, lashing, deck strength and GM impact",
      kg: 11.2,
      sf: 2.8,
      color: "linear-gradient(180deg, #b49cff, #5c3d9d)",
      colorHex: 0x9f7cff,
      recommended: ["mpv"],
      limited: ["feederContainer", "handyBulker"]
    }
  };

  const readouts = {
    vesselType: document.querySelector("#vesselTypeReadout"),
    cargoType: document.querySelector("#cargoTypeReadout"),
    cargoWeight: document.querySelector("#cargoWeightReadout"),
    longitudinal: document.querySelector("#longReadout"),
    transverse: document.querySelector("#transReadout"),
    cargoKg: document.querySelector("#cargoKgReadout"),
    cargoSf: document.querySelector("#cargoSfReadout")
  };

  const intel = {
    vesselName: document.querySelector("#vesselProfileName"),
    vesselNote: document.querySelector("#vesselProfileNote"),
    cargoName: document.querySelector("#cargoProfileName"),
    cargoNote: document.querySelector("#cargoProfileNote"),
    compatibilityValue: document.querySelector("#compatibilityValue"),
    compatibilityNote: document.querySelector("#compatibilityNote")
  };

  const holdNames = {
    "-72": "Hold 1 / forward",
    "-36": "Hold 2",
    "0": "Hold 3 / midship",
    "36": "Hold 4",
    "72": "Hold 5 / aft",
    custom: "Custom cargo position"
  };

  const holdClasses = ["hold-1", "hold-2", "hold-3", "hold-4", "hold-5"];
  const holdCenters = [-72, -36, 0, 36, 72];
  const holdDefs = [
    { value: "-72", name: "H1", label: "Forward", x: -72, capacity: 0.2, volume: 0.18, tanktop: 0.18 },
    { value: "-36", name: "H2", label: "Fwd-mid", x: -36, capacity: 0.22, volume: 0.21, tanktop: 0.22 },
    { value: "0", name: "H3", label: "Midship", x: 0, capacity: 0.24, volume: 0.22, tanktop: 0.25 },
    { value: "36", name: "H4", label: "Aft-mid", x: 36, capacity: 0.22, volume: 0.21, tanktop: 0.22 },
    { value: "72", name: "H5", label: "Aft", x: 72, capacity: 0.2, volume: 0.18, tanktop: 0.18 }
  ];
  const shipHoldVisuals = {
    "-72": { left: 84, label: "H1 FWD" },
    "-36": { left: 70, label: "H2" },
    0: { left: 56, label: "H3 MID" },
    36: { left: 42, label: "H4" },
    72: { left: 28, label: "H5 AFT" }
  };
  const planTemplates = {
    container20: {
      label: "20ft container",
      cargoKey: "containers",
      vesselKey: "feederContainer",
      weight: 24,
      kg: 13.2,
      sf: 1.65,
      z: 0,
      note: "High KG unit. Keep stack height and wind exposure under watch."
    },
    container40: {
      label: "40ft container",
      cargoKey: "containers",
      vesselKey: "feederContainer",
      weight: 30,
      kg: 14.1,
      sf: 2.15,
      z: 0,
      note: "Deck/bay parcel with lashing and high KG sensitivity."
    },
    coalParcel: {
      label: "Coal parcel",
      cargoKey: "coal",
      vesselKey: "panamaxBulker",
      weight: 1200,
      kg: 8.5,
      sf: 1.35,
      z: 0,
      note: "Bulk parcel. Watch ventilation, self-heating and hold cleanliness."
    },
    grainParcel: {
      label: "Grain parcel",
      cargoKey: "grain",
      vesselKey: "panamaxBulker",
      weight: 950,
      kg: 9.2,
      sf: 1.55,
      z: 0,
      note: "High SF parcel. Check trimming, shifting boards and fumigation."
    },
    ironOreParcel: {
      label: "Iron ore parcel",
      cargoKey: "ironOre",
      vesselKey: "panamaxBulker",
      weight: 1500,
      kg: 6.6,
      sf: 0.48,
      z: 0,
      note: "Dense parcel. Tanktop and local stress are the key risks."
    },
    projectCargoParcel: {
      label: "Project cargo",
      cargoKey: "projectCargo",
      vesselKey: "mpv",
      weight: 180,
      kg: 11.2,
      sf: 2.8,
      z: 0,
      note: "Point load parcel. Lashing, deck strength and lifting plan required."
    },
    liquidTankParcel: {
      label: "Liquid tank parcel",
      cargoKey: "crudeOil",
      vesselKey: "aframaxTanker",
      weight: 900,
      kg: 7.4,
      sf: 1.18,
      z: 0,
      note: "Liquid parcel. Free surface and tank sequence drive the risk."
    }
  };
  let cargoPlan = [
    { id: "P-001", templateKey: "coalParcel", hold: "0", label: "Coal parcel", cargoKey: "coal", weight: 1200, kg: 8.5, sf: 1.35, z: 0 },
    { id: "P-002", templateKey: "grainParcel", hold: "-36", label: "Grain parcel", cargoKey: "grain", weight: 950, kg: 9.2, sf: 1.55, z: -2 },
    { id: "P-003", templateKey: "ironOreParcel", hold: "36", label: "Iron ore parcel", cargoKey: "ironOre", weight: 1500, kg: 6.6, sf: 0.48, z: 2 }
  ];
  let selectedParcelId = cargoPlan[0]?.id || null;
  let parcelSequence = 4;
  let latestProfessionalPlan = null;
  let activeShipView = "side";
  let latestAutoBalanceAction = null;
  let latestRiskReasons = [];
  let latestReportLines = [];
  let reportHistory = loadReportHistory();

  const cargoCompatibilityProfiles = {
    coal: {
      vessel: "Bulk carrier / geared handy to Panamax",
      cleanliness: "Holds dry, bilges clean, coal residue managed",
      moisture: "Self-heating and ventilation watch",
      heating: "No heating, temperature monitoring recommended",
      imdg: "Usually non-IMDG, check coal declaration",
      segregation: "Keep away from moisture-sensitive cargo",
      score: 88
    },
    grain: {
      vessel: "Bulk carrier with grain fittings / shifting prevention",
      cleanliness: "Grain clean, odor-free, fumigation ready",
      moisture: "Moisture and infestation sensitive",
      heating: "No heating",
      imdg: "Non-dangerous, phytosanitary docs critical",
      segregation: "Avoid contamination, previous cargo check",
      score: 84
    },
    ironOre: {
      vessel: "Bulk carrier with strong tanktop/local strength",
      cleanliness: "Hold strength and residues checked",
      moisture: "TML / liquefaction certificates critical",
      heating: "No heating",
      imdg: "IMSBC cargo declaration required",
      segregation: "Split dense parcels between strong holds",
      score: 76
    },
    containers: {
      vessel: "Container feeder / cellular container ship",
      cleanliness: "Bay slots, lashing bridges, twistlocks",
      moisture: "Container condition and IMDG segregation",
      heating: "Reefer slots if required",
      imdg: "IMDG segregation by class",
      segregation: "Bay-row-tier and dangerous goods plan",
      score: 82
    },
    crudeOil: {
      vessel: "Tanker with suitable tanks and cargo pumps",
      cleanliness: "Tank cleanliness / previous cargo compatibility",
      moisture: "Water content and ROB control",
      heating: "Heating may be required by grade",
      imdg: "Liquid bulk dangerous cargo procedures",
      segregation: "Tank sequence, coating and vapor control",
      score: 80
    },
    lng: {
      vessel: "LNG carrier / cryogenic containment",
      cleanliness: "Tank readiness, cooldown and heel management",
      moisture: "Cryogenic contamination control",
      heating: "Cryogenic temperature control",
      imdg: "Gas carrier code compliance",
      segregation: "Tank filling limits and boil-off management",
      score: 78
    },
    chemicals: {
      vessel: "Chemical tanker with compatible coating",
      cleanliness: "Wall wash, coating certificate, previous cargo",
      moisture: "Cargo-specific water sensitivity",
      heating: "Often cargo-specific heating required",
      imdg: "Dangerous chemical cargo controls",
      segregation: "Coating, heating, toxicity and segregation plan",
      score: 74
    },
    projectCargo: {
      vessel: "MPV / heavy lift with deck strength approval",
      cleanliness: "Deck/hold point load and lashing plan",
      moisture: "Weather protection if sensitive",
      heating: "Normally no heating",
      imdg: "Check package/cargo specific class",
      segregation: "Lashing, lifting, center of gravity and deck load",
      score: 72
    }
  };

  const scenarioPresets = {
    coalIndonesia: {
      label: "Coal loading at Indonesia",
      vesselType: "panamaxBulker",
      cargoType: "coal",
      ballast: { forePeak: 520, aftPeak: 430, dbPort: 780, dbStbd: 780, wingPort: 360, wingStbd: 360 },
      parcels: [
        { templateKey: "coalParcel", hold: "-36", weight: 1400, kg: 8.4, sf: 1.35, z: -1 },
        { templateKey: "coalParcel", hold: "0", weight: 1600, kg: 8.5, sf: 1.35, z: 0 },
        { templateKey: "coalParcel", hold: "36", weight: 1300, kg: 8.6, sf: 1.35, z: 1 }
      ],
      note: "Moderate bulk plan with ventilation and rain watch."
    },
    grainBrazil: {
      label: "Grain loading at Brazil",
      vesselType: "panamaxBulker",
      cargoType: "grain",
      ballast: { forePeak: 600, aftPeak: 520, dbPort: 850, dbStbd: 850, wingPort: 440, wingStbd: 440 },
      parcels: [
        { templateKey: "grainParcel", hold: "-72", weight: 900, kg: 9.1, sf: 1.55, z: 0 },
        { templateKey: "grainParcel", hold: "0", weight: 1150, kg: 9.3, sf: 1.55, z: -1 },
        { templateKey: "grainParcel", hold: "72", weight: 880, kg: 9.2, sf: 1.55, z: 1 }
      ],
      note: "High SF cargo. Shifting and fumigation checks are prominent."
    },
    ironOreAustralia: {
      label: "Iron ore loading at Australia",
      vesselType: "panamaxBulker",
      cargoType: "ironOre",
      ballast: { forePeak: 420, aftPeak: 690, dbPort: 920, dbStbd: 920, wingPort: 500, wingStbd: 500 },
      parcels: [
        { templateKey: "ironOreParcel", hold: "-36", weight: 1700, kg: 6.5, sf: 0.48, z: 0 },
        { templateKey: "ironOreParcel", hold: "0", weight: 1800, kg: 6.6, sf: 0.48, z: 0 },
        { templateKey: "ironOreParcel", hold: "36", weight: 1650, kg: 6.7, sf: 0.48, z: 0 }
      ],
      note: "Dense cargo. Tanktop/local strength is the training focus."
    },
    containerFeeder: {
      label: "Container feeder loading",
      vesselType: "feederContainer",
      cargoType: "containers",
      ballast: { forePeak: 260, aftPeak: 320, dbPort: 520, dbStbd: 520, wingPort: 260, wingStbd: 260 },
      parcels: [
        { templateKey: "container40", hold: "-36", weight: 34, kg: 14.1, sf: 2.15, z: -4 },
        { templateKey: "container40", hold: "0", weight: 30, kg: 14.1, sf: 2.15, z: 0 },
        { templateKey: "container20", hold: "36", weight: 26, kg: 13.2, sf: 1.65, z: 4 }
      ],
      note: "High KG and port/stbd lashing balance scenario."
    },
    tankerPartial: {
      label: "Tanker partial loading",
      vesselType: "aframaxTanker",
      cargoType: "crudeOil",
      ballast: { forePeak: 300, aftPeak: 900, dbPort: 650, dbStbd: 450, wingPort: 300, wingStbd: 900 },
      parcels: [
        { templateKey: "liquidTankParcel", hold: "-36", weight: 2800, kg: 8.9, sf: 0.95, z: -6 },
        { templateKey: "liquidTankParcel", hold: "0", weight: 3400, kg: 9.1, sf: 0.95, z: 4 },
        { templateKey: "liquidTankParcel", hold: "36", weight: 2600, kg: 9.0, sf: 0.95, z: 8 }
      ],
      note: "Slack tank/free-surface case with deliberate port-starboard imbalance."
    },
    projectHeavyLift: {
      label: "Project cargo heavy lift",
      vesselType: "mpv",
      cargoType: "projectCargo",
      ballast: { forePeak: 450, aftPeak: 250, dbPort: 300, dbStbd: 500, wingPort: 180, wingStbd: 380 },
      parcels: [
        { templateKey: "projectCargoParcel", hold: "-36", weight: 240, kg: 11.8, sf: 2.4, z: -4 },
        { templateKey: "projectCargoParcel", hold: "0", weight: 320, kg: 12.5, sf: 2.4, z: 0 },
        { templateKey: "projectCargoParcel", hold: "36", weight: 180, kg: 10.9, sf: 2.4, z: 6 }
      ],
      note: "Heavy lift training case with high KG, point-load and lashing focus."
    }
  };

  function number(name) {
    return Number(new FormData(form).get(name)) || 0;
  }

  function transverseNumber(name) {
    if (!transverseForm) return 0;
    return Number(new FormData(transverseForm).get(name)) || 0;
  }

  function value(name) {
    return new FormData(form).get(name);
  }

  function setValue(name, nextValue) {
    const field = form.elements[name];
    if (field) field.value = nextValue;
  }

  function fmt(value, decimals) {
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function planNumber(name) {
    if (!ballastPlanForm) return 0;
    return Number(new FormData(ballastPlanForm).get(name)) || 0;
  }

  function holdDefFor(value) {
    return holdDefs.find((hold) => hold.value === String(value)) || holdDefs[2];
  }

  function cargoProfileForKey(key) {
    return cargoProfiles[key] || cargoProfiles.coal;
  }

  function planTemplateFor(key) {
    return planTemplates[key] || planTemplates.coalParcel;
  }

  function selectedParcel() {
    return cargoPlan.find((parcel) => parcel.id === selectedParcelId) || null;
  }

  function selectedHoldValue() {
    const holdValue = String(form.elements.hold.value || "0");
    if (holdValue !== "custom") return holdValue;
    const longitudinal = number("longitudinal");
    return holdDefs.reduce((best, hold) => (
      Math.abs(longitudinal - hold.x) < Math.abs(longitudinal - best.x) ? hold : best
    ), holdDefs[2]).value;
  }

  function holdTotalWeight(holdValue) {
    return cargoPlan
      .filter((parcel) => parcel.hold === String(holdValue))
      .reduce((sum, parcel) => sum + parcel.weight, 0);
  }

  function templateKeyForCargo(cargoKey) {
    return {
      containers: "container40",
      coal: "coalParcel",
      grain: "grainParcel",
      ironOre: "ironOreParcel",
      projectCargo: "projectCargoParcel",
      crudeOil: "liquidTankParcel",
      chemicals: "liquidTankParcel",
      lng: "liquidTankParcel"
    }[cargoKey] || "coalParcel";
  }

  function selectHoldTarget(holdValue, selectExisting = true) {
    const target = holdDefFor(holdValue);
    form.elements.hold.value = target.value;
    form.elements.longitudinal.value = target.x;
    if (!selectExisting) return null;

    const existing = cargoPlan.find((parcel) => parcel.hold === target.value) || null;
    selectedParcelId = existing?.id || null;
    if (existing) {
      setSingleLoadFromParcel(existing);
    } else {
      form.elements.cargoWeight.value = 0;
    }
    return existing;
  }

  function quickParcelForHold(holdValue, preferSameCargo = true) {
    const target = String(holdValue);
    const selected = selectedParcel();
    if (selected?.hold === target) return selected;
    const currentCargoKey = currentCargo().key;
    if (preferSameCargo) {
      const sameCargo = cargoPlan.find((parcel) => parcel.hold === target && parcel.cargoKey === currentCargoKey);
      if (sameCargo) return sameCargo;
    }
    return cargoPlan
      .filter((parcel) => parcel.hold === target)
      .sort((a, b) => b.weight - a.weight)[0] || null;
  }

  function createQuickParcel(holdValue, weight) {
    const cargo = currentCargo();
    const parcel = createParcel(templateKeyForCargo(cargo.key), holdValue, {
      cargoKey: cargo.key,
      label: cargo.label,
      vesselKey: currentVessel().key,
      weight: Math.max(weight, 0),
      kg: number("cargoKg") || cargo.kg,
      sf: number("cargoSf") || cargo.sf,
      z: number("transverse")
    });
    return parcel;
  }

  function nextParcelId() {
    const id = `P-${String(parcelSequence).padStart(3, "0")}`;
    parcelSequence += 1;
    return id;
  }

  function parcelVisual(parcel) {
    const profile = cargoProfileForKey(parcel.cargoKey);
    return profile.visual || "bulk";
  }

  function cargoShortName(parcel) {
    const visual = parcelVisual(parcel);
    if (parcel.templateKey === "container20") return "20";
    if (parcel.templateKey === "container40") return "40";
    if (parcel.cargoKey === "coal") return "COAL";
    if (parcel.cargoKey === "grain") return "GRN";
    if (parcel.cargoKey === "ironOre") return "ORE";
    if (parcel.cargoKey === "projectCargo") return "PRJ";
    if (["crudeOil", "chemicals"].includes(parcel.cargoKey)) return "TANK";
    if (parcel.cargoKey === "lng") return "LNG";
    return visual.slice(0, 4).toUpperCase();
  }

  function parcelPositionStyle(parcel, index, totalInHold) {
    const visual = parcelVisual(parcel);
    const row = Math.min(Math.floor(index / 3), 2);
    const column = index % 3;
    const normalizedOffset = clamp(parcel.z / 16, -1, 1);
    const sideShift = normalizedOffset * 16;
    const stackShift = (column - 1) * (totalInHold > 1 ? 14 : 0);
    const densityScale = clamp(parcel.weight / Math.max(planTemplateFor(parcel.templateKey).weight || 1, 1), 0.72, 1.55);
    const baseWidth = visual === "container"
      ? parcel.templateKey === "container40" ? 46 : 30
      : visual === "project" ? 62
        : ["liquid", "gas", "chemical"].includes(visual) ? 50
          : 56;
    const baseHeight = visual === "container"
      ? 18
      : visual === "project" ? 24
        : ["liquid", "gas", "chemical"].includes(visual) ? 34
          : 20;
    const width = clamp(baseWidth * (visual === "container" ? 1 : densityScale), 26, 82);
    const height = clamp(baseHeight * densityScale, 14, 48);
    const left = clamp(50 + sideShift + stackShift - width / 2, 4, 96 - width);
    const bottom = 12 + row * 23;
    return `--parcel-left:${left}%;--parcel-bottom:${bottom}px;--parcel-width:${width}%;--parcel-height:${height}px;`;
  }

  function holdLevelFromEvaluation(evaluation) {
    if (!evaluation) return "ok";
    return evaluation.level || "ok";
  }

  function createParcel(templateKey, holdValue, overrides = {}) {
    const template = planTemplateFor(templateKey);
    const parcel = {
      id: nextParcelId(),
      templateKey,
      hold: String(holdValue ?? form.elements.hold.value ?? "0"),
      label: template.label,
      cargoKey: template.cargoKey,
      vesselKey: template.vesselKey,
      weight: template.weight,
      kg: template.kg,
      sf: template.sf,
      z: template.z || 0,
      ...overrides
    };
    cargoPlan.push(parcel);
    selectedParcelId = parcel.id;
    setSingleLoadFromParcel(parcel);
    renderProfessionalPlan(calculateModel());
    return parcel;
  }

  function setSingleLoadFromParcel(parcel) {
    if (!parcel) return;
    const template = planTemplateFor(parcel.templateKey);
    const vesselKey = parcel.vesselKey || template.vesselKey;
    if (vesselKey && form.elements.vesselType.value !== vesselKey) {
      form.elements.vesselType.value = vesselKey;
      applyVesselPreset();
    }
    form.elements.cargoType.value = parcel.cargoKey;
    applyCargoPreset();
    form.elements.cargoWeight.value = clamp(parcel.weight, Number(form.elements.cargoWeight.min) || 0, Number(form.elements.cargoWeight.max) || currentVessel().maxCargo);
    form.elements.cargoKg.value = parcel.kg;
    form.elements.cargoSf.value = parcel.sf;
    form.elements.hold.value = parcel.hold;
    form.elements.longitudinal.value = holdDefFor(parcel.hold).x;
    form.elements.transverse.value = parcel.z;
  }

  function applyEditorToParcel() {
    const parcel = selectedParcel();
    if (!parcel || !parcelEditorForm) return;
    const data = new FormData(parcelEditorForm);
    parcel.weight = Math.max(Number(data.get("parcelWeight")) || 0, 0);
    parcel.kg = Math.max(Number(data.get("parcelKg")) || 0, 0);
    parcel.sf = Math.max(Number(data.get("parcelSf")) || 0, 0.01);
    parcel.z = clamp(Number(data.get("parcelOffset")) || 0, -16, 16);
    setSingleLoadFromParcel(parcel);
    sync();
  }

  function syncParcelEditor() {
    const parcel = selectedParcel();
    if (!parcelEditorForm || !selectedParcelName) return;
    if (!parcel) {
      selectedParcelName.textContent = "No parcel selected";
      parcelEditorForm.querySelectorAll("input").forEach((input) => {
        input.disabled = true;
      });
      return;
    }
    parcelEditorForm.querySelectorAll("input").forEach((input) => {
      input.disabled = false;
    });
    selectedParcelName.textContent = `${parcel.id} / ${parcel.label} / ${holdDefFor(parcel.hold).name}`;
    parcelEditorForm.elements.parcelWeight.value = parcel.weight;
    parcelEditorForm.elements.parcelKg.value = parcel.kg;
    parcelEditorForm.elements.parcelSf.value = parcel.sf;
    parcelEditorForm.elements.parcelOffset.value = parcel.z;
  }

  function ballastLoads() {
    return [
      { label: "Fore peak", weight: planNumber("forePeak"), x: -90, z: 0, kg: 1.7 },
      { label: "Aft peak", weight: planNumber("aftPeak"), x: 90, z: 0, kg: 1.7 },
      { label: "DB port", weight: planNumber("dbPort"), x: 0, z: -9, kg: 1.2 },
      { label: "DB stbd", weight: planNumber("dbStbd"), x: 0, z: 9, kg: 1.2 },
      { label: "Wing port", weight: planNumber("wingPort"), x: 0, z: -14, kg: 3.1 },
      { label: "Wing stbd", weight: planNumber("wingStbd"), x: 0, z: 14, kg: 3.1 }
    ];
  }

  function calculateProfessionalPlan(singleModel) {
    const vessel = currentVessel();
    const baseDisplacement = Math.max(number("baseDisplacement"), 1);
    const baseKg = number("baseKg");
    const km = number("km");
    const fsc = number("fsc");
    const mctc = Math.max(number("mctc"), 1);
    const lbp = Math.max(number("lbp"), 1);
    const summerDwt = Math.max(number("summerDwt"), 1);
    const lightweight = Math.max(number("lightweight"), 1);
    const constants = Math.max(number("constants"), 0);
    const fuelRob = Math.max(number("fuelRob"), 0);
    const freshWater = Math.max(number("freshWater"), 0);
    const storesRob = Math.max(number("storesRob"), 0);
    const nonCargoWeight = constants + fuelRob + freshWater + storesRob;
    const ballast = ballastLoads();
    const ballastWeight = ballast.reduce((sum, item) => sum + item.weight, 0);
    const cargoWeight = cargoPlan.reduce((sum, parcel) => sum + parcel.weight, 0);
    const cargoVolume = cargoPlan.reduce((sum, parcel) => sum + parcel.weight * parcel.sf, 0);
    const cargoKgMoment = cargoPlan.reduce((sum, parcel) => sum + parcel.weight * parcel.kg, 0);
    const ballastKgMoment = ballast.reduce((sum, item) => sum + item.weight * item.kg, 0);
    const displacement = baseDisplacement + cargoWeight + ballastWeight;
    const kg = (baseDisplacement * baseKg + cargoKgMoment + ballastKgMoment) / Math.max(displacement, 1);
    const liquidPenalty = cargoPlan
      .filter((parcel) => ["crudeOil", "lng", "chemicals"].includes(parcel.cargoKey))
      .reduce((sum, parcel) => sum + parcel.weight * 0.000012, 0);
    const correctedGm = km - kg - fsc - liquidPenalty;
    const cargoLongMoment = cargoPlan.reduce((sum, parcel) => sum + parcel.weight * holdDefFor(parcel.hold).x, 0);
    const ballastLongMoment = ballast.reduce((sum, item) => sum + item.weight * item.x, 0);
    const cargoTransMoment = cargoPlan.reduce((sum, parcel) => sum + parcel.weight * parcel.z, 0);
    const ballastTransMoment = ballast.reduce((sum, item) => sum + item.weight * item.z, 0);
    const trimCm = (cargoLongMoment + ballastLongMoment) / mctc;
    const trimMeters = trimCm / 100;
    const heelMoment = cargoTransMoment + ballastTransMoment;
    const heelRad = Math.atan(heelMoment / (displacement * Math.max(correctedGm, 0.05)));
    const heelDeg = heelRad * 180 / Math.PI;
    const meanDraft = vessel.draftBase + ((cargoWeight + ballastWeight - Math.min(4200, vessel.maxCargo * 0.42)) / vessel.tpc / 100);
    const fwdDraft = meanDraft - trimMeters / 2;
    const aftDraft = meanDraft + trimMeters / 2;
    const loadicatorDisplacement = Math.max(lightweight + cargoWeight + ballastWeight + nonCargoWeight, displacement);
    const dwtUsed = ((cargoWeight + ballastWeight + nonCargoWeight) / summerDwt) * 100;
    const dwtRemaining = summerDwt - cargoWeight - ballastWeight - nonCargoWeight;
    const fscApplied = fsc + liquidPenalty;
    const holdEvaluations = holdDefs.map((hold) => {
      const parcels = cargoPlan.filter((parcel) => parcel.hold === hold.value);
      const load = parcels.reduce((sum, parcel) => sum + parcel.weight, 0);
      const volume = parcels.reduce((sum, parcel) => sum + parcel.weight * parcel.sf, 0);
      const maxWeight = Math.max(vessel.maxCargo * hold.capacity, 1);
      const maxVolume = Math.max(vessel.capacity * hold.volume, 1);
      const denseLoad = parcels
        .filter((parcel) => ["ironOre", "projectCargo"].includes(parcel.cargoKey))
        .reduce((sum, parcel) => sum + parcel.weight, 0);
      const tanktopLimit = Math.max(vessel.maxCargo * hold.tanktop, 1);
      const loadPct = load / maxWeight * 100;
      const volumePct = volume / maxVolume * 100;
      const tanktopPct = denseLoad / tanktopLimit * 100;
      const level = loadPct > 105 || volumePct > 105 || tanktopPct > 100
        ? "danger"
        : loadPct > 88 || volumePct > 88 || tanktopPct > 82
          ? "watch"
          : "ok";
      return { hold, parcels, load, volume, maxWeight, maxVolume, tanktopLimit, denseLoad, loadPct, volumePct, tanktopPct, level };
    });
    const stationResults = calculateStressCurve(vessel, cargoPlan, ballast, cargoWeight + ballastWeight);
    const criteria = buildCriteria({
      correctedGm,
      heelDeg,
      trimMeters,
      cargoVolume,
      vessel,
      holdEvaluations,
      stressRatio: stationResults.ratio,
      singleModel
    });
    const overallLevel = criteria.some((item) => item.level === "danger") || holdEvaluations.some((item) => item.level === "danger")
      ? "danger"
      : criteria.some((item) => item.level === "watch") || holdEvaluations.some((item) => item.level === "watch")
        ? "watch"
        : "ok";
    const advice = buildAdvice({ cargoWeight, cargoVolume, trimMeters, heelDeg, correctedGm, holdEvaluations, stressRatio: stationResults.ratio, ballast, vessel });

    return {
      vessel,
      cargoWeight,
      ballastWeight,
      cargoVolume,
      displacement,
      loadicatorDisplacement,
      summerDwt,
      lightweight,
      constants,
      fuelRob,
      freshWater,
      storesRob,
      nonCargoWeight,
      dwtUsed,
      dwtRemaining,
      kg,
      correctedGm,
      fscApplied,
      slackTankWarning: liquidPenalty > 0 || fscApplied > 0.3,
      trimCm,
      trimMeters,
      heelDeg,
      heelMoment,
      fwdDraft,
      aftDraft,
      meanDraft,
      holdEvaluations,
      stationResults,
      criteria,
      advice,
      overallLevel,
      ballast
    };
  }

  function calculateStressCurve(vessel, parcels, ballast, planWeight) {
    const stations = [-90, -72, -54, -36, -18, 0, 18, 36, 54, 72, 90];
    const weights = stations.map((station) => {
      const cargo = parcels.reduce((sum, parcel) => {
        const distance = Math.abs(holdDefFor(parcel.hold).x - station);
        return sum + (distance <= 18 ? parcel.weight * (1 - distance / 24) : 0);
      }, 0);
      const ballastWeight = ballast.reduce((sum, item) => {
        const distance = Math.abs(item.x - station);
        return sum + (distance <= 18 ? item.weight * (1 - distance / 24) : 0);
      }, 0);
      return Math.max(cargo + ballastWeight, 0);
    });
    const totalDistributed = weights.reduce((sum, weight) => sum + weight, 0) || 1;
    const buoyancyPerStation = totalDistributed / stations.length;
    let shear = 0;
    let bending = 0;
    const points = weights.map((weight, index) => {
      shear += weight - buoyancyPerStation;
      bending += shear * 0.18;
      return { station: stations[index], shear, bending };
    });
    const maxShear = Math.max(...points.map((point) => Math.abs(point.shear)), 1);
    const maxBending = Math.max(...points.map((point) => Math.abs(point.bending)), 1);
    const shearLimit = Math.max(vessel.maxCargo * 0.28, 1);
    const bendingLimit = Math.max(vessel.maxCargo * 0.42, 1);
    const ratio = Math.max(maxShear / shearLimit, maxBending / bendingLimit, planWeight / Math.max(vessel.maxCargo, 1) * 0.72);
    return { stations, weights, points, maxShear, maxBending, shearLimit, bendingLimit, ratio };
  }

  function buildCriteria(data) {
    const volumeUse = data.cargoVolume / Math.max(data.vessel.capacity, 1) * 100;
    const worstHold = Math.max(...data.holdEvaluations.map((hold) => Math.max(hold.loadPct, hold.volumePct, hold.tanktopPct)), 0);
    const deckMargin = (data.singleModel?.pitchRad || 0) < 0 ? 14 - Math.abs(data.trimMeters) : 14 - Math.abs(data.trimMeters);
    return [
      {
        label: "Corrected GM",
        value: `${fmt(data.correctedGm, 2)} m`,
        note: "Target >= 0.70 m for planning screen",
        level: data.correctedGm < 0.55 ? "danger" : data.correctedGm < 0.7 ? "watch" : "ok"
      },
      {
        label: "Heel angle",
        value: `${fmt(Math.abs(data.heelDeg), 2)} deg`,
        note: "Target <= 2.5 deg, hard watch over 5 deg",
        level: Math.abs(data.heelDeg) > 5 ? "danger" : Math.abs(data.heelDeg) > 2.5 ? "watch" : "ok"
      },
      {
        label: "Trim",
        value: `${fmt(data.trimMeters, 2)} m`,
        note: "Target within 1.5 m for normal port operations",
        level: Math.abs(data.trimMeters) > 2.5 ? "danger" : Math.abs(data.trimMeters) > 1.5 ? "watch" : "ok"
      },
      {
        label: "Cargo volume",
        value: `${fmt(volumeUse, 1)}%`,
        note: "Hold volume planning limit 95%",
        level: volumeUse > 100 ? "danger" : volumeUse > 90 ? "watch" : "ok"
      },
      {
        label: "Hold / tanktop",
        value: `${fmt(worstHold, 0)}%`,
        note: "Worst hold load, volume or dense cargo stress",
        level: worstHold > 105 ? "danger" : worstHold > 88 ? "watch" : "ok"
      },
      {
        label: "SF / BM",
        value: `${fmt(data.stressRatio * 100, 0)}%`,
        note: "Approximate shear force / bending moment envelope",
        level: data.stressRatio > 1 ? "danger" : data.stressRatio > 0.82 ? "watch" : "ok"
      },
      {
        label: "Deck margin",
        value: `${fmt(deckMargin, 1)} deg`,
        note: "Planning proxy for deck edge / trim margin",
        level: deckMargin < 5 ? "danger" : deckMargin < 8 ? "watch" : "ok"
      }
    ];
  }

  function buildAdvice(data) {
    const advice = [];
    const worstHold = data.holdEvaluations.reduce((worst, hold) => {
      const score = Math.max(hold.loadPct, hold.volumePct, hold.tanktopPct);
      const worstScore = Math.max(worst.loadPct, worst.volumePct, worst.tanktopPct);
      return score > worstScore ? hold : worst;
    }, data.holdEvaluations[0]);
    const forwardLoad = data.holdEvaluations[0].load + data.holdEvaluations[1].load;
    const aftLoad = data.holdEvaluations[3].load + data.holdEvaluations[4].load;
    const containerWeight = cargoPlan.filter((parcel) => parcel.cargoKey === "containers").reduce((sum, parcel) => sum + parcel.weight, 0);
    const oreWeight = cargoPlan.filter((parcel) => parcel.cargoKey === "ironOre").reduce((sum, parcel) => sum + parcel.weight, 0);

    if (Math.abs(data.trimMeters) > 1.5) {
      advice.push({
        level: Math.abs(data.trimMeters) > 2.5 ? "danger" : "watch",
        title: data.trimMeters > 0 ? "Stern trim high" : "Bow trim high",
        text: data.trimMeters > 0
          ? "Move part of H5/H4 cargo toward H3 or add fore peak ballast before finalizing."
          : "Move part of H1/H2 cargo toward H3 or add aft peak ballast before finalizing."
      });
    }
    if (Math.abs(data.heelDeg) > 2.5) {
      advice.push({
        level: Math.abs(data.heelDeg) > 5 ? "danger" : "watch",
        title: data.heelDeg > 0 ? "Starboard heel high" : "Port heel high",
        text: data.heelDeg > 0
          ? "Shift selected cargo to port offset or add port wing ballast to reduce starboard heel."
          : "Shift selected cargo to starboard offset or add starboard wing ballast to reduce port heel."
      });
    }
    if (worstHold && Math.max(worstHold.loadPct, worstHold.volumePct, worstHold.tanktopPct) > 88) {
      advice.push({
        level: worstHold.level,
        title: `${worstHold.hold.name} near limit`,
        text: `Review ${worstHold.hold.name}: load ${fmt(worstHold.loadPct, 0)}%, volume ${fmt(worstHold.volumePct, 0)}%, tanktop ${fmt(worstHold.tanktopPct, 0)}%. Move parcel to adjacent hold if possible.`
      });
    }
    if (data.stressRatio > 0.82) {
      advice.push({
        level: data.stressRatio > 1 ? "danger" : "watch",
        title: "SF/BM envelope tight",
        text: "Balance end holds against midship cargo. Avoid concentrating dense parcels in one hold."
      });
    }
    if (containerWeight > 0 && data.correctedGm < 0.9) {
      advice.push({
        level: "watch",
        title: "Container KG sensitivity",
        text: "Container plan has high KG. Reduce upper stack, lower heavy units or add low ballast."
      });
    }
    if (oreWeight > 0) {
      advice.push({
        level: worstHold?.level === "danger" ? "danger" : "watch",
        title: "Iron ore dense cargo",
        text: "Keep ore parcels split between strong holds and check tanktop/local strength before approval."
      });
    }
    if (Math.abs(forwardLoad - aftLoad) > Math.max(data.cargoWeight * 0.28, 600)) {
      advice.push({
        level: "watch",
        title: "Forward/aft balance",
        text: "Forward and aft groups differ materially. Try moving one parcel closer to H3."
      });
    }
    if (!advice.length) {
      advice.push({
        level: "ok",
        title: "Plan looks balanced",
        text: "No major planning warning. Keep final approval with vessel booklet and class loadicator."
      });
    }
    return advice;
  }

  function currentVessel() {
    const key = value("vesselType") || "panamaxBulker";
    return { key, ...vesselProfiles[key] };
  }

  function currentCargo() {
    const key = value("cargoType") || "coal";
    return { key, ...cargoProfiles[key] };
  }

  function compatibilityFor(vessel, cargo) {
    if (cargo.recommended.includes(vessel.key)) {
      return {
        level: "Matched",
        className: "ok",
        note: "Cargo and vessel type are aligned",
        score: 96
      };
    }
    if (cargo.limited.includes(vessel.key)) {
      return {
        level: "Limited",
        className: "watch",
        note: "Possible with special planning and approvals",
        score: 68
      };
    }
    return {
      level: "Mismatch",
      className: "danger",
      note: "Select a more suitable vessel or treat as exception",
      score: 35
    };
  }

  function classify(model) {
    if (model.compatibility.className === "danger" || model.correctedGm < 0.55 || Math.abs(model.heelDeg) > 5 || Math.abs(model.trimMeters) > 2 || model.capacityUse > 96) {
      return { level: "ALERT", note: "Review loading plan before approval", className: "danger" };
    }
    if (model.compatibility.className === "watch" || model.correctedGm < 0.85 || Math.abs(model.heelDeg) > 2.5 || Math.abs(model.trimMeters) > 1.2 || model.capacityUse > 86) {
      return { level: "WATCH", note: "Workable but needs loadicator check", className: "watch" };
    }
    return { level: "OK", note: "Planning values inside quick limits", className: "ok" };
  }

  function applyVesselPreset() {
    const vessel = currentVessel();
    setValue("baseDisplacement", vessel.baseDisplacement);
    setValue("baseKg", vessel.baseKg);
    setValue("km", vessel.km);
    setValue("fsc", vessel.fsc);
    setValue("mctc", vessel.mctc);
    setValue("lbp", vessel.lbp);
    setValue("summerDwt", vessel.summerDwt || Math.round(vessel.capacity * 0.78));
    setValue("lightweight", vessel.lightweight || Math.round(vessel.baseDisplacement * 0.2));
    setValue("constants", vessel.visual === "lng" ? 620 : 350);
    setValue("fuelRob", vessel.visual === "lng" ? 2200 : vessel.visual === "tanker" ? 1900 : 1450);
    setValue("freshWater", vessel.visual === "container" ? 180 : 280);
    setValue("storesRob", vessel.visual === "mpv" ? 120 : 180);

    const cargoWeight = form.elements.cargoWeight;
    if (cargoWeight) {
      cargoWeight.max = vessel.maxCargo;
      if (Number(cargoWeight.value) > vessel.maxCargo) cargoWeight.value = vessel.maxCargo;
    }
  }

  function applyCargoPreset() {
    const cargo = currentCargo();
    setValue("cargoKg", cargo.kg);
    setValue("cargoSf", cargo.sf);
  }

  function calculateModel() {
    const vessel = currentVessel();
    const cargo = currentCargo();
    const cargoWeight = number("cargoWeight");
    const x = number("longitudinal");
    const z = number("transverse");
    const cargoKg = number("cargoKg");
    const cargoSf = number("cargoSf") || cargo.sf;
    const baseDisplacement = Math.max(number("baseDisplacement"), 1);
    const baseKg = number("baseKg");
    const km = number("km");
    const fsc = number("fsc");
    const mctc = Math.max(number("mctc"), 1);
    const lbp = Math.max(number("lbp"), 1);
    const summerDwt = Math.max(number("summerDwt"), 1);
    const lightweight = Math.max(number("lightweight"), 1);
    const constants = Math.max(number("constants"), 0);
    const fuelRob = Math.max(number("fuelRob"), 0);
    const freshWater = Math.max(number("freshWater"), 0);
    const storesRob = Math.max(number("storesRob"), 0);
    const nonCargoWeight = constants + fuelRob + freshWater + storesRob;
    const liquidCargoPenalty = ["crudeOil", "lng", "chemicals"].includes(cargo.key) ? cargoWeight * 0.000012 : 0;
    const fscApplied = fsc + liquidCargoPenalty;
    const displacement = baseDisplacement + cargoWeight;
    const kg = ((baseDisplacement * baseKg) + (cargoWeight * cargoKg)) / displacement;
    const correctedGm = km - kg - fscApplied;
    const trimCm = (cargoWeight * x) / mctc;
    const trimMeters = trimCm / 100;
    const heelMoment = cargoWeight * z;
    const heelRad = Math.atan(heelMoment / (displacement * Math.max(correctedGm, 0.05)));
    const heelDeg = heelRad * 180 / Math.PI;
    const pitchRad = Math.atan(trimMeters / lbp);
    const meanDraft = vessel.draftBase + ((cargoWeight - Math.min(4200, vessel.maxCargo * 0.42)) / vessel.tpc / 100);
    const fwdDraft = meanDraft - trimMeters / 2;
    const aftDraft = meanDraft + trimMeters / 2;
    const loadicatorDisplacement = Math.max(lightweight + cargoWeight + nonCargoWeight, displacement);
    const dwtUsed = ((cargoWeight + nonCargoWeight) / summerDwt) * 100;
    const dwtRemaining = summerDwt - cargoWeight - nonCargoWeight;
    const cargoVolume = cargoWeight * cargoSf;
    const capacityUse = vessel.capacity > 0 ? cargoVolume / vessel.capacity * 100 : 0;
    const compatibility = compatibilityFor(vessel, cargo);
    const risk = classify({ correctedGm, heelDeg, trimMeters, capacityUse, compatibility });

    return {
      vessel,
      cargo,
      compatibility,
      cargoWeight,
      x,
      z,
      cargoKg,
      cargoSf,
      cargoVolume,
      capacityUse,
      displacement,
      loadicatorDisplacement,
      summerDwt,
      lightweight,
      constants,
      fuelRob,
      freshWater,
      storesRob,
      nonCargoWeight,
      dwtUsed,
      dwtRemaining,
      kg,
      correctedGm,
      fscApplied,
      slackTankWarning: liquidCargoPenalty > 0 || fscApplied > 0.3,
      trimCm,
      trimMeters,
      heelMoment,
      heelRad,
      heelDeg,
      pitchRad,
      fwdDraft,
      aftDraft,
      meanDraft,
      risk
    };
  }

  function setReadouts(model) {
    readouts.vesselType.textContent = model.vessel.label;
    readouts.cargoType.textContent = model.cargo.label;
    readouts.cargoWeight.textContent = `${fmt(model.cargoWeight, 0)} mt`;
    readouts.longitudinal.textContent = `${fmt(model.x, 0)} m ${model.x < 0 ? "fwd" : model.x > 0 ? "aft" : "mid"}`;
    readouts.transverse.textContent = `${fmt(Math.abs(model.z), 1)} m ${model.z < 0 ? "port" : model.z > 0 ? "stbd" : "center"}`;
    readouts.cargoKg.textContent = `${fmt(model.cargoKg, 1)} m`;
    readouts.cargoSf.textContent = `${fmt(model.cargoSf, 2)} m3/mt`;
    const selectedHold = holdNames[form.elements.hold.value] || "Custom cargo position";
    const targetHold = selectedHoldValue();
    const targetTotal = holdTotalWeight(targetHold);
    holdLabel.textContent = selectedHold;
    if (quickLoadTarget) {
      quickLoadTarget.textContent = `${holdNames[targetHold]} / hold total ${fmt(targetTotal, 0)} mt`;
    }
    quickHoldButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.hold === targetHold);
    });
    liveTrim.textContent = `Trim ${fmt(model.trimMeters, 2)} m ${model.trimMeters < 0 ? "by head" : "by stern"}`;
  }

  function renderIntel(model) {
    intel.vesselName.textContent = model.vessel.label;
    intel.vesselNote.textContent = model.vessel.note;
    intel.cargoName.textContent = model.cargo.label;
    intel.cargoNote.textContent = model.cargo.note;
    intel.compatibilityValue.textContent = `${model.compatibility.level} / ${model.compatibility.score}%`;
    intel.compatibilityNote.textContent = model.compatibility.note;
  }

  function renderMetrics(model) {
    metrics.innerHTML = [
      ["Corrected GM", `${fmt(model.correctedGm, 2)} m`, `KG ${fmt(model.kg, 2)} m / FSC ${fmt(model.fscApplied, 2)} m`],
      ["Trim change", `${fmt(model.trimCm, 1)} cm`, `${model.trimMeters < 0 ? "Bow down" : "Stern down"} visualized`],
      ["Heel angle", `${fmt(model.heelDeg, 2)} deg`, `${model.z < 0 ? "Port" : model.z > 0 ? "Starboard" : "No transverse offset"}`],
      ["Draft F / A", `${fmt(model.fwdDraft, 2)} / ${fmt(model.aftDraft, 2)} m`, `Disp. ${fmt(model.loadicatorDisplacement, 0)} mt`],
      ["Cargo volume", `${fmt(model.cargoVolume, 0)} m3`, `SF ${fmt(model.cargoSf, 2)} / cap ${fmt(model.capacityUse, 1)}%`],
      ["Vessel match", model.compatibility.level, model.compatibility.note]
    ].map(([label, metricValue, note]) => `
      <article>
        <span>${label}</span>
        <strong>${metricValue}</strong>
        <small>${note}</small>
      </article>
    `).join("");

    riskPill.className = `scene-status ${model.risk.className}`;
    riskPill.textContent = `${model.risk.level} - ${model.risk.note}`;
    renderLoadicatorSummary(model, latestProfessionalPlan);
  }

  function summaryLevel(value, watchLimit, dangerLimit, absolute = true) {
    const check = absolute ? Math.abs(value) : value;
    if (check >= dangerLimit) return "danger";
    if (check >= watchLimit) return "watch";
    return "ok";
  }

  function renderLoadicatorSummary(model, plan) {
    if (!loadicatorSummaryGrid) return;
    const stressRatio = plan?.stationResults?.ratio || 0;
    const worstHold = (plan?.holdEvaluations || []).reduce((worst, item) => {
      if (!worst) return item;
      return item.loadPct > worst.loadPct ? item : worst;
    }, null);
    const ballastWeight = plan?.ballastWeight || 0;
    const summaryCards = [
      ["Displacement", `${fmt(model.loadicatorDisplacement, 0)} mt`, `Lightship ${fmt(model.lightweight, 0)} / ROB+constants ${fmt(model.nonCargoWeight, 0)} mt`, "ok"],
      ["DWT used", `${fmt(model.dwtUsed, 1)}%`, `${fmt(Math.max(model.dwtRemaining, 0), 0)} mt remaining`, summaryLevel(model.dwtUsed, 82, 96, false)],
      ["Draft F / A", `${fmt(model.fwdDraft, 2)} / ${fmt(model.aftDraft, 2)} m`, `Mean ${fmt(model.meanDraft, 2)} m`, summaryLevel(Math.max(model.fwdDraft, model.aftDraft), model.vessel.draftBase + 1.2, model.vessel.draftBase + 2.2, false)],
      ["Trim", `${fmt(model.trimMeters, 2)} m`, model.trimMeters < 0 ? "By head" : "By stern", summaryLevel(model.trimMeters, 1.2, 2)],
      ["Heel", `${fmt(model.heelDeg, 2)} deg`, model.z < 0 ? "Port side moment" : model.z > 0 ? "Starboard side moment" : "Centerline", summaryLevel(model.heelDeg, 2.5, 5)],
      ["KG / KM / GM", `${fmt(model.kg, 2)} / ${fmt(model.vessel.km, 2)} / ${fmt(model.correctedGm, 2)}`, "Corrected GM after FSC", model.correctedGm < 0.55 ? "danger" : model.correctedGm < 0.85 ? "watch" : "ok"],
      ["Free surface", `${fmt(model.fscApplied, 2)} m`, model.slackTankWarning ? "Slack/liquid tank warning" : "No major slack warning", model.slackTankWarning ? "watch" : "ok"],
      ["Ballast", `${fmt(ballastWeight, 0)} mt`, "Fore/aft and P/S tank plan", summaryLevel(ballastWeight, 4500, 7500, false)],
      ["Stress envelope", `${fmt(stressRatio, 0)}%`, "SF/BM simplified limit", summaryLevel(stressRatio, 72, 92, false)],
      ["Worst hold", worstHold ? `${worstHold.hold.name} ${fmt(worstHold.loadPct, 0)}%` : "--", worstHold ? `Tanktop ${fmt(worstHold.tanktopPct, 0)}% / volume ${fmt(worstHold.volumePct, 0)}%` : "No parcels yet", worstHold ? worstHold.level : "ok"]
    ];

    loadicatorSummaryGrid.innerHTML = summaryCards.map(([label, valueText, note, level]) => `
      <article class="${level}">
        <span>${label}</span>
        <strong>${valueText}</strong>
        <small>${note}</small>
      </article>
    `).join("");

    if (loadicatorSourceNote) {
      const status = model.risk.level === "ALERT" ? "Class-approved loadicator required before approval." : model.risk.level === "WATCH" ? "Review the warnings before fixing the plan." : "Training envelope looks clean.";
      loadicatorSourceNote.innerHTML = `<strong>${status}</strong> Engineering training estimate only; final operations require the vessel's approved stability booklet, loading computer and master/class confirmation.`;
    }
  }

  function renderCargoPalette(model) {
    const selectedHold = holdNames[form.elements.hold.value] || "Custom cargo position";
    cargoExampleButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.cargoPreset === model.cargo.key);
    });

    if (cargoPaletteStatus) {
      cargoPaletteStatus.textContent = `${model.cargo.label} / ${model.vessel.label}`;
    }

    if (cargoPlacementSummary) {
      cargoPlacementSummary.className = `cargo-placement-summary ${model.risk.className}`;
      cargoPlacementSummary.innerHTML = `
        <span>${selectedHold} / ${fmt(model.cargoWeight, 0)} mt / ${model.compatibility.level}</span>
        <strong>GM ${fmt(model.correctedGm, 2)} m / Trim ${fmt(model.trimMeters, 2)} m / Heel ${fmt(model.heelDeg, 2)} deg</strong>
      `;
    }
  }

  function renderProfessionalPlan(singleModel) {
    if (!cargoPlanTable || !holdEvaluationGrid) return;
    latestProfessionalPlan = calculateProfessionalPlan(singleModel);
    const plan = latestProfessionalPlan;

    syncParcelEditor();
    renderHoldDropZones();
    renderShipStowageLayer(plan);
    renderShipAxisOverlay(singleModel, plan);
    renderCargoPlanTable();
    renderHoldEvaluations(plan);
    renderStressChart(plan.stationResults);
    renderBallastSummary(plan);
    renderCriteria(plan.criteria);
    renderAdvice(plan.advice);
    renderDecisionSupport(singleModel, plan);
    renderLoadicatorSummary(singleModel, plan);

    if (professionalPlanStatus) {
      const statusLabel = plan.overallLevel === "danger" ? "ALERT" : plan.overallLevel === "watch" ? "WATCH" : "OK";
      professionalPlanStatus.className = `scene-status ${plan.overallLevel}`;
      professionalPlanStatus.textContent = `${statusLabel} - ${fmt(plan.cargoWeight, 0)} mt cargo / ${fmt(plan.ballastWeight, 0)} mt ballast`;
    }
  }

  function renderHoldDropZones() {
    holdDropZones.forEach((zone) => {
      const holdValue = zone.dataset.planHold;
      const body = zone.querySelector("div");
      const parcels = cargoPlan.filter((parcel) => parcel.hold === holdValue);
      if (!body) return;
      body.innerHTML = parcels.length
        ? parcels.map((parcel) => {
          const activeClass = parcel.id === selectedParcelId ? " active" : "";
          const visual = parcelVisual(parcel);
          return `
            <button type="button" class="parcel-pill${activeClass}" draggable="true" data-parcel-id="${parcel.id}" data-visual="${visual}">
              <strong>${parcel.id} ${parcel.label}</strong>
              <span>${fmt(parcel.weight, 0)} mt / KG ${fmt(parcel.kg, 1)} / ${parcel.z < 0 ? "port" : parcel.z > 0 ? "stbd" : "center"}</span>
            </button>
          `;
        }).join("")
        : `<span class="drop-empty">Drop cargo here</span>`;
    });

    document.querySelectorAll("[data-parcel-id]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedParcelId = button.dataset.parcelId;
        setSingleLoadFromParcel(selectedParcel());
        sync();
      });
      button.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", `parcel:${button.dataset.parcelId}`);
      });
    });
  }

  function renderShipStowageLayer(plan) {
    if (!shipStowageLayer) return;
    const evaluationsByHold = new Map((plan?.holdEvaluations || []).map((evaluation) => [String(evaluation.hold.value), evaluation]));

    shipStowageLayer.innerHTML = holdDefs.map((hold) => {
      const visualHold = shipHoldVisuals[hold.value] || { left: 50, label: hold.name };
      const parcels = cargoPlan.filter((parcel) => parcel.hold === hold.value);
      const evaluation = evaluationsByHold.get(hold.value);
      const load = evaluation
        ? evaluation.load
        : parcels.reduce((sum, parcel) => sum + parcel.weight, 0);
      const level = holdLevelFromEvaluation(evaluation);
      const loadPct = evaluation ? clamp(evaluation.loadPct, 0, 140) : 0;

      return `
        <div class="ship-stowage-bay ${parcels.length ? "loaded" : "empty"} ${level}" data-ship-hold="${hold.value}" style="left:${visualHold.left}%;--bay-load:${loadPct}%;">
          <div class="ship-stowage-bay-frame">
            <span class="ship-bay-label">${visualHold.label}</span>
            <span class="ship-bay-load">${fmt(load, 0)} mt</span>
            <span class="ship-bay-guide port">P</span>
            <span class="ship-bay-guide stbd">S</span>
            <i class="ship-bay-centerline"></i>
            <i class="ship-bay-fill"></i>
            <i class="ship-slot-line line-a"></i>
            <i class="ship-slot-line line-b"></i>
          </div>
          ${parcels.map((parcel, index) => {
            const visual = parcelVisual(parcel);
            const selectedClass = parcel.id === selectedParcelId ? " selected" : "";
            const side = parcel.z < -0.2 ? "PORT" : parcel.z > 0.2 ? "STBD" : "CTR";
            return `
              <button type="button" class="ship-parcel-block${selectedClass}" draggable="true" data-ship-parcel="${parcel.id}" data-visual="${visual}" style="${parcelPositionStyle(parcel, index, parcels.length)}" title="${parcel.id} ${parcel.label}">
                <strong>${cargoShortName(parcel)}</strong>
                <span>${fmt(parcel.weight, 0)}t</span>
                <em>${side}</em>
              </button>
            `;
          }).join("")}
        </div>
      `;
    }).join("");

    shipStowageLayer.querySelectorAll("[data-ship-parcel]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        selectedParcelId = button.dataset.shipParcel;
        setSingleLoadFromParcel(selectedParcel());
        sync();
      });
      button.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", `parcel:${button.dataset.shipParcel}`);
      });
    });

    shipStowageLayer.querySelectorAll("[data-ship-hold]").forEach((bay) => {
      bay.addEventListener("dragover", (event) => {
        event.preventDefault();
        bay.classList.add("drag-over");
      });
      bay.addEventListener("dragleave", () => {
        bay.classList.remove("drag-over");
      });
      bay.addEventListener("drop", (event) => {
        event.preventDefault();
        bay.classList.remove("drag-over");
        const payload = event.dataTransfer.getData("text/plain");
        const holdValue = bay.dataset.shipHold;
        if (payload.startsWith("parcel:")) {
          const parcelId = payload.replace("parcel:", "");
          const parcel = cargoPlan.find((item) => item.id === parcelId);
          if (parcel) {
            parcel.hold = holdValue;
            selectedParcelId = parcel.id;
            setSingleLoadFromParcel(parcel);
          }
        } else if (payload) {
          createParcel(payload, holdValue);
        }
        sync();
      });
    });
  }

  function axisParcelStyle(parcel, index, totalInHold, mode) {
    const visual = parcelVisual(parcel);
    const offset = clamp(parcel.z / 16, -1, 1);
    const stagger = ((index % 3) - 1) * (totalInHold > 1 ? 8 : 0);
    const weightScale = clamp(parcel.weight / Math.max(planTemplateFor(parcel.templateKey).weight || 1, 1), 0.68, 1.7);

    if (mode === "iso") {
      const width = clamp(36 + weightScale * 18, 30, visual === "project" ? 72 : 62);
      const height = visual === "container" ? 18 : clamp(16 + weightScale * 8, 16, 34);
      const left = clamp(50 + offset * 25 + stagger - width / 2, 3, 97 - width);
      const top = 16 + Math.min(index, 3) * 18;
      return `--axis-left:${left}%;--axis-top:${top}px;--axis-width:${width}%;--axis-height:${height}px;`;
    }

    const width = visual === "container"
      ? parcel.templateKey === "container40" ? 42 : 28
      : visual === "project" ? 58
        : ["liquid", "gas", "chemical"].includes(visual) ? 48
          : clamp(34 + weightScale * 16, 34, 62);
    const height = visual === "container" ? 22 : clamp(18 + weightScale * 6, 18, 34);
    const left = clamp(50 + offset * 34 + stagger - width / 2, 4, 96 - width);
    const top = clamp(18 + Math.floor(index / 2) * 27, 14, 76);
    return `--axis-left:${left}%;--axis-top:${top}%;--axis-width:${width}%;--axis-height:${height}px;`;
  }

  function renderAxisParcelButton(parcel, index, totalInHold, mode) {
    const visual = parcelVisual(parcel);
    const selectedClass = parcel.id === selectedParcelId ? " selected" : "";
    return `
      <button type="button" class="axis-parcel${selectedClass}" data-axis-parcel="${parcel.id}" data-visual="${visual}" style="${axisParcelStyle(parcel, index, totalInHold, mode)}" title="${parcel.id} ${parcel.label}">
        <strong>${cargoShortName(parcel)}</strong>
        <span>${fmt(parcel.weight, 0)}t</span>
      </button>
    `;
  }

  function renderTopAxis(plan) {
    const evaluationsByHold = new Map((plan?.holdEvaluations || []).map((evaluation) => [String(evaluation.hold.value), evaluation]));
    const orderedHolds = [...holdDefs].reverse();
    return `
      <div class="axis-shell top-axis">
        <div class="axis-heading">
          <span>Top / deck plan</span>
          <strong>Bow right / port upper side / stbd lower side</strong>
        </div>
        <div class="axis-top-hull">
          <span class="axis-bow-mark">BOW</span>
          <span class="axis-stern-mark">STERN</span>
          <i class="axis-center-line"></i>
          ${orderedHolds.map((hold) => {
            const parcels = cargoPlan.filter((parcel) => parcel.hold === hold.value);
            const evaluation = evaluationsByHold.get(hold.value);
            const level = holdLevelFromEvaluation(evaluation);
            const loadPct = evaluation ? clamp(evaluation.loadPct, 0, 130) : 0;
            return `
              <section class="axis-hold ${level}" data-axis-hold="${hold.value}" style="--axis-load:${loadPct}%;">
                <header><strong>${hold.name}</strong><span>${hold.label}</span></header>
                <em class="axis-side-label port">PORT</em>
                <em class="axis-side-label stbd">STBD</em>
                <i class="axis-hold-load"></i>
                ${parcels.map((parcel, index) => renderAxisParcelButton(parcel, index, parcels.length, "top")).join("")}
              </section>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderCrossAxis(model, plan) {
    const parcel = selectedParcel();
    const hold = holdDefFor(parcel?.hold || form.elements.hold.value || "0");
    const parcels = cargoPlan.filter((item) => item.hold === hold.value);
    const evaluation = plan?.holdEvaluations?.find((item) => item.hold.value === hold.value);
    const portLoad = parcels.filter((item) => item.z < -0.2).reduce((sum, item) => sum + item.weight, 0);
    const stbdLoad = parcels.filter((item) => item.z > 0.2).reduce((sum, item) => sum + item.weight, 0);
    const centerLoad = parcels.filter((item) => Math.abs(item.z) <= 0.2).reduce((sum, item) => sum + item.weight, 0);
    const heelVisual = clamp(model.heelDeg * -1.3, -12, 12);
    const cgX = clamp(50 + model.heelDeg * 2.2, 18, 82);
    const waterTilt = clamp(model.heelDeg * 0.8, -8, 8);

    return `
      <div class="axis-shell cross-axis">
        <div class="axis-heading">
          <span>Cross / transverse section</span>
          <strong>${hold.name} ${hold.label} / ${fmt(evaluation?.load || 0, 0)} mt in hold</strong>
        </div>
        <div class="axis-cross-body">
          <div class="axis-cross-hull" style="--axis-heel:${heelVisual}deg;--axis-cg:${cgX}%;--axis-water-tilt:${waterTilt}deg;">
            <i class="axis-cross-water"></i>
            <i class="axis-cross-deck"></i>
            <i class="axis-cross-centerline"></i>
            <i class="axis-cross-cg">G</i>
            <span class="axis-cross-label port">PORT</span>
            <span class="axis-cross-label stbd">STBD</span>
            ${parcels.map((item, index) => renderAxisParcelButton(item, index, parcels.length, "top")).join("")}
          </div>
          <div class="axis-cross-metrics">
            <article><span>Port load</span><strong>${fmt(portLoad, 0)} mt</strong></article>
            <article><span>Center</span><strong>${fmt(centerLoad, 0)} mt</strong></article>
            <article><span>Stbd load</span><strong>${fmt(stbdLoad, 0)} mt</strong></article>
            <article><span>Heel</span><strong>${fmt(model.heelDeg, 2)} deg</strong></article>
            <article><span>GM</span><strong>${fmt(model.correctedGm, 2)} m</strong></article>
            <article><span>Draft F/A</span><strong>${fmt(model.fwdDraft, 2)} / ${fmt(model.aftDraft, 2)} m</strong></article>
          </div>
        </div>
      </div>
    `;
  }

  function renderIsoAxis(model, plan) {
    const evaluationsByHold = new Map((plan?.holdEvaluations || []).map((evaluation) => [String(evaluation.hold.value), evaluation]));
    const orderedHolds = [...holdDefs].reverse();
    return `
      <div class="axis-shell iso-axis">
        <div class="axis-heading">
          <span>Iso / engineering perspective</span>
          <strong>Trim ${fmt(model.trimMeters, 2)} m / Heel ${fmt(model.heelDeg, 2)} deg / GM ${fmt(model.correctedGm, 2)} m</strong>
        </div>
        <div class="axis-iso-deck">
          ${orderedHolds.map((hold, holdIndex) => {
            const parcels = cargoPlan.filter((parcel) => parcel.hold === hold.value);
            const evaluation = evaluationsByHold.get(hold.value);
            const level = holdLevelFromEvaluation(evaluation);
            return `
              <section class="axis-iso-hold ${level}" style="--axis-depth:${holdIndex};">
                <header>${hold.name}</header>
                <i></i>
                ${parcels.map((parcel, index) => renderAxisParcelButton(parcel, index, parcels.length, "iso")).join("")}
              </section>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderShipAxisOverlay(model, plan) {
    if (!shipAxisOverlay) return;
    scene.dataset.shipView = activeShipView;
    shipViewButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.shipView === activeShipView);
    });

    if (activeShipView === "side") {
      shipAxisOverlay.innerHTML = "";
      return;
    }

    shipAxisOverlay.innerHTML = activeShipView === "top"
      ? renderTopAxis(plan)
      : activeShipView === "cross"
        ? renderCrossAxis(model, plan)
        : renderIsoAxis(model, plan);

    shipAxisOverlay.querySelectorAll("[data-axis-parcel]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        selectedParcelId = button.dataset.axisParcel;
        setSingleLoadFromParcel(selectedParcel());
        sync();
      });
    });
  }

  function renderCargoPlanTable() {
    if (!cargoPlanTable) return;
    if (!cargoPlan.length) {
      cargoPlanTable.innerHTML = `<div class="plan-row"><span>No cargo parcels yet. Select a parcel from the cargo library.</span></div>`;
      return;
    }
    cargoPlanTable.innerHTML = `
      <div class="plan-row header">
        <span>Parcel</span><span>Hold</span><span>Weight</span><span>KG</span><span>Offset</span>
      </div>
      ${cargoPlan.map((parcel) => {
        const hold = holdDefFor(parcel.hold);
        return `
          <button type="button" class="plan-row${parcel.id === selectedParcelId ? " active" : ""}" data-plan-row="${parcel.id}">
            <span>${parcel.id} ${parcel.label}</span>
            <span>${hold.name}</span>
            <span>${fmt(parcel.weight, 0)} mt</span>
            <span>${fmt(parcel.kg, 1)} m</span>
            <span>${parcel.z < 0 ? "P" : parcel.z > 0 ? "S" : "C"} ${fmt(Math.abs(parcel.z), 1)} m</span>
          </button>
        `;
      }).join("")}
    `;

    cargoPlanTable.querySelectorAll("[data-plan-row]").forEach((row) => {
      row.addEventListener("click", () => {
        selectedParcelId = row.dataset.planRow;
        setSingleLoadFromParcel(selectedParcel());
        sync();
      });
    });
  }

  function renderHoldEvaluations(plan) {
    holdEvaluationGrid.innerHTML = plan.holdEvaluations.map((item) => {
      const maxPct = Math.max(item.loadPct, item.volumePct, item.tanktopPct);
      const statusText = item.level === "danger" ? "Limit" : item.level === "watch" ? "Watch" : "OK";
      return `
        <article class="hold-eval-card ${item.level}">
          <div class="hold-eval-top"><strong>${item.hold.name}</strong><span>${statusText}</span></div>
          <div class="eval-bars">
            <div title="Load"><i style="width:${Math.min(item.loadPct, 120)}%"></i></div>
            <div title="Volume"><i style="width:${Math.min(item.volumePct, 120)}%"></i></div>
            <div title="Tanktop"><i style="width:${Math.min(item.tanktopPct, 120)}%"></i></div>
          </div>
          <small>${fmt(item.load, 0)} mt / vol ${fmt(item.volumePct, 0)}% / tanktop ${fmt(item.tanktopPct, 0)}%</small>
        </article>
      `;
    }).join("");
  }

  function renderStressChart(results) {
    if (!shearCurveLine || !bendingCurveLine || !stressStatusText) return;
    const maxShear = Math.max(results.maxShear, results.shearLimit, 1);
    const maxBending = Math.max(results.maxBending, results.bendingLimit, 1);
    const shearPoints = results.points.map((point, index) => {
      const x = 48 + (index / Math.max(results.points.length - 1, 1)) * 636;
      const y = 110 - (point.shear / maxShear) * 62;
      return `${fmt(x, 1)},${fmt(clamp(y, 28, 190), 1)}`;
    }).join(" ");
    const bendingPoints = results.points.map((point, index) => {
      const x = 48 + (index / Math.max(results.points.length - 1, 1)) * 636;
      const y = 220 - (point.bending / maxBending) * 70;
      return `${fmt(x, 1)},${fmt(clamp(y, 126, 238), 1)}`;
    }).join(" ");

    shearCurveLine.setAttribute("points", shearPoints);
    bendingCurveLine.setAttribute("points", bendingPoints);
    stressStatusText.textContent = `${results.ratio > 1 ? "ALERT" : results.ratio > 0.82 ? "WATCH" : "OK"} / Envelope ${fmt(results.ratio * 100, 0)}%`;
  }

  function renderBallastSummary(plan) {
    if (!ballastSummary) return;
    const fore = plan.ballast.find((item) => item.label === "Fore peak")?.weight || 0;
    const aft = plan.ballast.find((item) => item.label === "Aft peak")?.weight || 0;
    const port = plan.ballast.filter((item) => item.z < 0).reduce((sum, item) => sum + item.weight, 0);
    const stbd = plan.ballast.filter((item) => item.z > 0).reduce((sum, item) => sum + item.weight, 0);
    const trimHelp = aft > fore ? "aft ballast increases stern trim" : fore > aft ? "fore ballast increases bow trim" : "fore/aft ballast balanced";
    const heelHelp = stbd > port ? "stbd ballast adds starboard moment" : port > stbd ? "port ballast adds port moment" : "port/stbd ballast balanced";
    ballastSummary.textContent = `${fmt(plan.ballastWeight, 0)} mt ballast / ${trimHelp} / ${heelHelp}. Current plan trim ${fmt(plan.trimMeters, 2)} m, heel ${fmt(plan.heelDeg, 2)} deg.`;
  }

  function renderCriteria(criteria) {
    if (!criteriaList) return;
    criteriaList.innerHTML = criteria.map((item) => `
      <article class="criteria-item ${item.level}">
        <b>${item.level === "ok" ? "OK" : item.level === "watch" ? "!" : "X"}</b>
        <div><strong>${item.label}</strong><span>${item.note}</span></div>
        <em>${item.value}</em>
      </article>
    `).join("");
  }

  function renderAdvice(advice) {
    if (!loadAdviceList) return;
    loadAdviceList.innerHTML = advice.map((item) => `
      <article class="advice-item ${item.level}">
        <strong>${item.title}</strong>
        <span>${item.text}</span>
      </article>
    `).join("");
  }

  function loadReportHistory() {
    try {
      const raw = window.localStorage?.getItem("focuseaLoadPlanReports");
      return raw ? JSON.parse(raw).slice(0, 10) : [];
    } catch (error) {
      return [];
    }
  }

  function saveReportHistory() {
    try {
      window.localStorage?.setItem("focuseaLoadPlanReports", JSON.stringify(reportHistory.slice(0, 10)));
    } catch (error) {
      // Local storage can be unavailable in restricted browser modes.
    }
  }

  function addReportHistoryEntry(lines, plan) {
    const entry = {
      id: `LP-${Date.now()}`,
      date: new Date().toISOString(),
      vessel: plan.vessel.label,
      cargo: `${fmt(plan.cargoWeight, 0)} mt cargo`,
      risk: plan.overallLevel.toUpperCase(),
      gm: fmt(plan.correctedGm, 2),
      trim: fmt(plan.trimMeters, 2),
      heel: fmt(plan.heelDeg, 2),
      lines
    };
    reportHistory = [entry, ...reportHistory].slice(0, 10);
    saveReportHistory();
    renderReportHistory();
  }

  function renderReportHistory() {
    if (!loadPlanReportHistory) return;
    if (!reportHistory.length) {
      loadPlanReportHistory.innerHTML = `<div class="empty-mini">No reports yet. Download a load plan PDF to save history.</div>`;
      return;
    }
    loadPlanReportHistory.innerHTML = reportHistory.map((entry) => `
      <article class="history-item ${entry.risk.toLowerCase()}">
        <div>
          <strong>${entry.risk} / ${entry.vessel}</strong>
          <span>${new Date(entry.date).toLocaleString("en-US")} / ${entry.cargo}</span>
          <small>GM ${entry.gm} m / Trim ${entry.trim} m / Heel ${entry.heel} deg</small>
        </div>
        <button type="button" data-report-download="${entry.id}">PDF</button>
        <button type="button" data-report-delete="${entry.id}">Del</button>
      </article>
    `).join("");

    loadPlanReportHistory.querySelectorAll("[data-report-download]").forEach((button) => {
      button.addEventListener("click", () => {
        const entry = reportHistory.find((item) => item.id === button.dataset.reportDownload);
        if (entry) {
          downloadBlob(`${entry.id.toLowerCase()}-load-plan.pdf`, buildSimplePdf(entry.lines), "application/pdf");
        }
      });
    });

    loadPlanReportHistory.querySelectorAll("[data-report-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        reportHistory = reportHistory.filter((item) => item.id !== button.dataset.reportDelete);
        saveReportHistory();
        renderReportHistory();
      });
    });
  }

  function buildRiskReasons(model, plan) {
    const reasons = [];
    const worstHold = plan.holdEvaluations.reduce((worst, item) => {
      const score = Math.max(item.loadPct, item.volumePct, item.tanktopPct);
      const worstScore = Math.max(worst.loadPct, worst.volumePct, worst.tanktopPct);
      return score > worstScore ? item : worst;
    }, plan.holdEvaluations[0]);
    const denseHold = plan.holdEvaluations.reduce((worst, item) => item.tanktopPct > worst.tanktopPct ? item : worst, plan.holdEvaluations[0]);

    reasons.push({
      level: plan.correctedGm < 0.55 ? "danger" : plan.correctedGm < 0.75 ? "watch" : "ok",
      title: "GM / KG",
      text: plan.correctedGm < 0.75
        ? `GM dusuk cunku yuk KG momenti yuksek. Corrected GM ${fmt(plan.correctedGm, 2)} m.`
        : `GM dengeli. Corrected GM ${fmt(plan.correctedGm, 2)} m.`
    });
    reasons.push({
      level: Math.abs(plan.trimMeters) > 2.5 ? "danger" : Math.abs(plan.trimMeters) > 1.2 ? "watch" : "ok",
      title: "Trim",
      text: Math.abs(plan.trimMeters) > 1.2
        ? `${plan.trimMeters > 0 ? "Stern" : "Bow"} trim yuksek. Yuk agirligi ${plan.trimMeters > 0 ? "aft" : "forward"} tarafa moment uretiyor.`
        : `Trim operasyonel bantta: ${fmt(plan.trimMeters, 2)} m.`
    });
    reasons.push({
      level: Math.abs(plan.heelDeg) > 5 ? "danger" : Math.abs(plan.heelDeg) > 2.2 ? "watch" : "ok",
      title: "Heel / port-stbd",
      text: Math.abs(plan.heelDeg) > 2.2
        ? `${plan.heelDeg > 0 ? "Starboard" : "Port"} heel yuksek. Offsetli yuk veya ballast farki heeling moment uretiyor.`
        : `Sancak-iskele dengesi iyi: ${fmt(plan.heelDeg, 2)} deg.`
    });
    reasons.push({
      level: denseHold.tanktopPct > 100 ? "danger" : denseHold.tanktopPct > 82 ? "watch" : "ok",
      title: "Tanktop / dense cargo",
      text: denseHold.tanktopPct > 82
        ? `${denseHold.hold.name} tanktop riski ${fmt(denseHold.tanktopPct, 0)}%. Dense cargo parcelleri bolustur.`
        : `Tanktop envelope normal; worst ${denseHold.hold.name} ${fmt(denseHold.tanktopPct, 0)}%.`
    });
    reasons.push({
      level: Math.abs(plan.fwdDraft - plan.aftDraft) > 2.5 ? "danger" : Math.abs(plan.fwdDraft - plan.aftDraft) > 1.5 ? "watch" : "ok",
      title: "Draft F/A",
      text: `F/A draft ${fmt(plan.fwdDraft, 2)} / ${fmt(plan.aftDraft, 2)} m. Difference ${fmt(Math.abs(plan.fwdDraft - plan.aftDraft), 2)} m.`
    });
    reasons.push({
      level: worstHold.level,
      title: "Hold envelope",
      text: `${worstHold.hold.name} worst hold: load ${fmt(worstHold.loadPct, 0)}%, volume ${fmt(worstHold.volumePct, 0)}%, tanktop ${fmt(worstHold.tanktopPct, 0)}%.`
    });
    return reasons;
  }

  function renderRiskReasons(reasons) {
    latestRiskReasons = reasons;
    if (!riskReasonList) return;
    riskReasonList.innerHTML = reasons.map((item) => `
      <article class="risk-reason ${item.level}">
        <b>${item.level === "ok" ? "OK" : item.level === "watch" ? "!" : "X"}</b>
        <div><strong>${item.title}</strong><span>${item.text}</span></div>
      </article>
    `).join("");
  }

  function buildAutoBalanceAction(model, plan) {
    const worstHold = plan.holdEvaluations.reduce((worst, item) => {
      const score = Math.max(item.loadPct, item.volumePct, item.tanktopPct);
      const worstScore = Math.max(worst.loadPct, worst.volumePct, worst.tanktopPct);
      return score > worstScore ? item : worst;
    }, plan.holdEvaluations[0]);

    if (Math.abs(plan.trimMeters) > 1.2) {
      const sourceHolds = plan.trimMeters > 0 ? ["72", "36"] : ["-72", "-36"];
      const targetHold = plan.trimMeters > 0 ? "0" : "0";
      const parcel = cargoPlan
        .filter((item) => sourceHolds.includes(item.hold))
        .sort((a, b) => b.weight - a.weight)[0];
      if (parcel) {
        return {
          type: "moveHold",
          parcelId: parcel.id,
          nextHold: targetHold,
          title: plan.trimMeters > 0 ? "Stern trim correction" : "Bow trim correction",
          text: `${parcel.id} ${parcel.label} ${holdDefFor(parcel.hold).name}'den H3'e tasinirse longitudinal moment azalir.`
        };
      }
    }

    if (Math.abs(plan.heelDeg) > 2.2) {
      const sign = plan.heelDeg > 0 ? 1 : -1;
      const parcel = cargoPlan
        .filter((item) => Math.sign(item.z) === sign)
        .sort((a, b) => Math.abs(b.z * b.weight) - Math.abs(a.z * a.weight))[0];
      if (parcel) {
        return {
          type: "offset",
          parcelId: parcel.id,
          nextZ: clamp(parcel.z - sign * 6, -16, 16),
          title: plan.heelDeg > 0 ? "Starboard heel correction" : "Port heel correction",
          text: `${parcel.id} offset ${fmt(parcel.z, 1)} m'den merkeze yaklastirilir.`
        };
      }
    }

    if (plan.correctedGm < 0.75) {
      const parcel = cargoPlan.filter((item) => item.kg > 9).sort((a, b) => b.kg - a.kg)[0];
      if (parcel) {
        return {
          type: "lowerKg",
          parcelId: parcel.id,
          nextKg: clamp(parcel.kg - 1.2, 1, parcel.kg),
          title: "GM recovery",
          text: `${parcel.id} KG ${fmt(parcel.kg, 1)} m'den ${fmt(clamp(parcel.kg - 1.2, 1, parcel.kg), 1)} m'ye dusurulerek GM iyilestirilir.`
        };
      }
    }

    if (worstHold.level !== "ok" && worstHold.parcels.length) {
      const parcel = [...worstHold.parcels].sort((a, b) => b.weight - a.weight)[0];
      const targetHold = worstHold.hold.x < 0 ? "0" : worstHold.hold.x > 0 ? "0" : "-36";
      return {
        type: "moveHold",
        parcelId: parcel.id,
        nextHold: targetHold,
        title: "Hold envelope correction",
        text: `${worstHold.hold.name} envelope yuksek. ${parcel.id} daha guvenli holda kaydirilir.`
      };
    }

    return {
      type: "ballast",
      title: "Fine ballast trim",
      text: "Plan major limit icinde. Ballast tanklari ile kucuk trim/heel fine-tune yap.",
      forePeak: plan.trimMeters > 0 ? 100 : 0,
      aftPeak: plan.trimMeters < 0 ? 100 : 0
    };
  }

  function renderAutoBalance(action, plan) {
    latestAutoBalanceAction = action;
    if (!autoBalancePanel) return;
    autoBalancePanel.innerHTML = `
      <article class="auto-balance-action ${plan.overallLevel}">
        <strong>${action.title}</strong>
        <span>${action.text}</span>
        <small>Current: GM ${fmt(plan.correctedGm, 2)} m / Trim ${fmt(plan.trimMeters, 2)} m / Heel ${fmt(plan.heelDeg, 2)} deg</small>
      </article>
    `;
    if (applyAutoBalanceButton) applyAutoBalanceButton.disabled = !action;
  }

  function applyAutoBalanceAction() {
    const action = latestAutoBalanceAction;
    if (!action) return;

    if (action.type === "moveHold") {
      const parcel = cargoPlan.find((item) => item.id === action.parcelId);
      if (parcel) {
        parcel.hold = action.nextHold;
        selectedParcelId = parcel.id;
        setSingleLoadFromParcel(parcel);
      }
    }
    if (action.type === "offset") {
      const parcel = cargoPlan.find((item) => item.id === action.parcelId);
      if (parcel) {
        parcel.z = action.nextZ;
        selectedParcelId = parcel.id;
        setSingleLoadFromParcel(parcel);
      }
    }
    if (action.type === "lowerKg") {
      const parcel = cargoPlan.find((item) => item.id === action.parcelId);
      if (parcel) {
        parcel.kg = action.nextKg;
        selectedParcelId = parcel.id;
        setSingleLoadFromParcel(parcel);
      }
    }
    if (action.type === "ballast" && ballastPlanForm) {
      ballastPlanForm.elements.forePeak.value = Number(ballastPlanForm.elements.forePeak.value || 0) + (action.forePeak || 0);
      ballastPlanForm.elements.aftPeak.value = Number(ballastPlanForm.elements.aftPeak.value || 0) + (action.aftPeak || 0);
    }
    sync();
  }

  function calculateSequenceState(parcels, ballastWeight = 0) {
    const vessel = currentVessel();
    const baseDisplacement = Math.max(number("baseDisplacement"), 1);
    const baseKg = number("baseKg");
    const km = number("km");
    const fsc = number("fsc");
    const mctc = Math.max(number("mctc"), 1);
    const cargoWeight = parcels.reduce((sum, item) => sum + item.weight, 0);
    const displacement = baseDisplacement + cargoWeight + ballastWeight;
    const kgMoment = parcels.reduce((sum, item) => sum + item.weight * item.kg, 0);
    const kg = (baseDisplacement * baseKg + kgMoment + ballastWeight * 1.8) / Math.max(displacement, 1);
    const correctedGm = km - kg - fsc;
    const trimMeters = parcels.reduce((sum, item) => sum + item.weight * holdDefFor(item.hold).x, 0) / mctc / 100;
    const heelDeg = Math.atan(parcels.reduce((sum, item) => sum + item.weight * item.z, 0) / (displacement * Math.max(correctedGm, 0.05))) * 180 / Math.PI;
    return { cargoWeight, correctedGm, trimMeters, heelDeg, vessel };
  }

  function renderLoadingSequence(plan) {
    if (!loadingSequenceList) return;
    const ordered = [...cargoPlan].sort((a, b) => Math.abs(holdDefFor(a.hold).x) - Math.abs(holdDefFor(b.hold).x));
    const ballastWeight = plan.ballastWeight;
    let running = [];
    const steps = ordered.map((parcel, index) => {
      running = [...running, parcel];
      const state = calculateSequenceState(running, index > 0 ? ballastWeight * 0.35 : 0);
      return {
        title: `Step ${index + 1}: ${holdDefFor(parcel.hold).name} ${fmt(parcel.weight, 0)} mt`,
        note: `${parcel.label} / ${parcel.z < 0 ? "port" : parcel.z > 0 ? "stbd" : "center"}`,
        state
      };
    });
    if (ordered.length > 1) {
      const state = calculateSequenceState(ordered, ballastWeight);
      steps.push({
        title: `Step ${steps.length + 1}: ballast adjust`,
        note: `Apply ${fmt(ballastWeight, 0)} mt ballast plan and re-check final condition`,
        state
      });
    }
    loadingSequenceList.innerHTML = steps.map((step) => `
      <article class="sequence-step">
        <strong>${step.title}</strong>
        <span>${step.note}</span>
        <small>GM ${fmt(step.state.correctedGm, 2)} m / Trim ${fmt(step.state.trimMeters, 2)} m / Heel ${fmt(step.state.heelDeg, 2)} deg</small>
      </article>
    `).join("");
  }

  function renderBallastTankMap(plan) {
    if (!ballastTankMap) return;
    const tanks = ballastLoads();
    const maxTank = Math.max(...tanks.map((tank) => tank.weight), 1);
    ballastTankMap.innerHTML = `
      <div class="tank-map-shell">
        ${tanks.map((tank) => {
          const pct = clamp(tank.weight / maxTank * 100, 0, 100);
          const side = tank.z < 0 ? "port" : tank.z > 0 ? "stbd" : "center";
          return `
            <article class="tank-cell ${side}" style="--tank-fill:${pct}%;">
              <strong>${tank.label}</strong>
              <span>${fmt(tank.weight, 0)} mt</span>
              <i></i>
            </article>
          `;
        }).join("")}
      </div>
      <small>Total ballast ${fmt(plan.ballastWeight, 0)} mt / effect included in GM, trim and heel.</small>
    `;
  }

  function renderCompatibilityMatrix(model) {
    if (!cargoCompatibilityMatrix) return;
    const profile = cargoCompatibilityProfiles[model.cargo.key] || cargoCompatibilityProfiles.coal;
    const compatibilityScore = clamp((profile.score + model.compatibility.score) / 2, 0, 100);
    const rows = [
      ["Vessel fit", profile.vessel, `${compatibilityScore.toFixed(0)}%`],
      ["Hold / tank cleanliness", profile.cleanliness, model.compatibility.level],
      ["Moisture / cargo risk", profile.moisture, "Check"],
      ["Heating", profile.heating, model.cargo.key === "crudeOil" || model.cargo.key === "chemicals" ? "May apply" : "Normally no"],
      ["IMDG / code", profile.imdg, ["chemicals", "lng", "crudeOil", "containers"].includes(model.cargo.key) ? "High control" : "Standard"],
      ["Segregation", profile.segregation, "Required"]
    ];
    cargoCompatibilityMatrix.innerHTML = rows.map(([label, detail, status]) => `
      <article>
        <span>${label}</span>
        <strong>${status}</strong>
        <small>${detail}</small>
      </article>
    `).join("");
  }

  function renderDecisionSupport(model, plan) {
    renderRiskReasons(buildRiskReasons(model, plan));
    renderAutoBalance(buildAutoBalanceAction(model, plan), plan);
    renderLoadingSequence(plan);
    renderBallastTankMap(plan);
    renderCompatibilityMatrix(model);
    renderReportHistory();
  }

  function loadScenario(key) {
    const scenario = scenarioPresets[key];
    if (!scenario) return;
    form.elements.vesselType.value = scenario.vesselType;
    applyVesselPreset();
    form.elements.cargoType.value = scenario.cargoType;
    applyCargoPreset();
    if (ballastPlanForm) {
      Object.entries(scenario.ballast).forEach(([field, amount]) => {
        if (ballastPlanForm.elements[field]) ballastPlanForm.elements[field].value = amount;
      });
    }
    cargoPlan = scenario.parcels.map((parcel, index) => {
      const template = planTemplateFor(parcel.templateKey);
      return {
        id: `P-${String(index + 1).padStart(3, "0")}`,
        label: template.label,
        cargoKey: template.cargoKey,
        sf: template.sf,
        ...parcel
      };
    });
    parcelSequence = cargoPlan.length + 1;
    selectedParcelId = cargoPlan[0]?.id || null;
    setSingleLoadFromParcel(selectedParcel());
    if (scenarioModeOutput) {
      scenarioModeOutput.innerHTML = `
        <strong>${scenario.label}</strong>
        <span>${scenario.note}</span>
        <small>${cargoPlan.length} parcels loaded / ${fmt(cargoPlan.reduce((sum, item) => sum + item.weight, 0), 0)} mt cargo</small>
      `;
    }
    sync();
  }

  function buildCopilotAnswer(action) {
    const model = calculateModel();
    const plan = latestProfessionalPlan || calculateProfessionalPlan(model);
    const reasons = latestRiskReasons.length ? latestRiskReasons : buildRiskReasons(model, plan);
    const worst = reasons.find((item) => item.level === "danger") || reasons.find((item) => item.level === "watch") || reasons[0];
    const auto = latestAutoBalanceAction || buildAutoBalanceAction(model, plan);
    const cargoFit = cargoCompatibilityProfiles[model.cargo.key] || cargoCompatibilityProfiles.coal;

    if (action === "whyRisk") {
      return `
        <strong>Risk brief</strong>
        <span>${worst.title}: ${worst.text}</span>
        <small>Overall ${plan.overallLevel.toUpperCase()} / GM ${fmt(plan.correctedGm, 2)} m / Trim ${fmt(plan.trimMeters, 2)} m / Heel ${fmt(plan.heelDeg, 2)} deg.</small>
      `;
    }
    if (action === "reduceTrim") {
      return `
        <strong>Trim reduction plan</strong>
        <span>${auto.title}: ${auto.text}</span>
        <small>Use Apply suggestion, then re-check draft F/A and shear force envelope.</small>
      `;
    }
    if (action === "cargoFit") {
      return `
        <strong>Cargo fit</strong>
        <span>${model.cargo.label}: ${cargoFit.vessel}</span>
        <small>${cargoFit.cleanliness}. ${cargoFit.segregation}.</small>
      `;
    }
    if (action === "report") {
      latestReportLines = buildLoadPlanLines();
      return `
        <strong>Report ready</strong>
        <span>${latestReportLines.slice(0, 6).join(" / ")}</span>
        <small>Use Load Plan PDF Indir to save and add it to Report History.</small>
      `;
    }
    if (action === "brokerMail") {
      return `
        <strong>Broker note draft</strong>
        <span>Dear all, please find preliminary load plan: ${fmt(plan.cargoWeight, 0)} mt cargo, GM ${fmt(plan.correctedGm, 2)} m, trim ${fmt(plan.trimMeters, 2)} m, heel ${fmt(plan.heelDeg, 2)} deg. Current status ${plan.overallLevel.toUpperCase()}; final approval subject vessel class-approved loadicator/master confirmation.</span>
        <small>Attach load plan PDF and hold distribution before sending.</small>
      `;
    }
    return `<strong>Copilot ready</strong><span>Select an action.</span>`;
  }

  function buildLoadPlanLines() {
    const plan = latestProfessionalPlan || calculateProfessionalPlan(calculateModel());
    const lines = [
      "FOCUSEA LOAD PLAN REPORT",
      `Generated: ${new Date().toLocaleString("en-US")}`,
      "",
      `Vessel: ${plan.vessel.label}`,
      `Total cargo: ${fmt(plan.cargoWeight, 0)} mt`,
      `Total ballast: ${fmt(plan.ballastWeight, 0)} mt`,
      `Displacement: ${fmt(plan.loadicatorDisplacement || plan.displacement, 0)} mt`,
      `Summer DWT: ${fmt(plan.summerDwt || 0, 0)} mt`,
      `DWT used: ${fmt(plan.dwtUsed || 0, 1)}%`,
      `DWT remaining: ${fmt(plan.dwtRemaining || 0, 0)} mt`,
      `ROB/constants: fuel ${fmt(plan.fuelRob || 0, 0)} mt, fresh water ${fmt(plan.freshWater || 0, 0)} mt, stores/lube ${fmt(plan.storesRob || 0, 0)} mt, constants ${fmt(plan.constants || 0, 0)} mt`,
      `Corrected GM: ${fmt(plan.correctedGm, 2)} m`,
      `Free surface correction: ${fmt(plan.fscApplied || 0, 2)} m`,
      `Trim: ${fmt(plan.trimMeters, 2)} m`,
      `Heel: ${fmt(plan.heelDeg, 2)} deg`,
      `Draft F/A: ${fmt(plan.fwdDraft, 2)} / ${fmt(plan.aftDraft, 2)} m`,
      "",
      "CARGO LIST"
    ];

    cargoPlan.forEach((parcel) => {
      const hold = holdDefFor(parcel.hold);
      lines.push(`${parcel.id} | ${parcel.label} | ${hold.name} ${hold.label} | ${fmt(parcel.weight, 0)} mt | KG ${fmt(parcel.kg, 1)} m | SF ${fmt(parcel.sf, 2)} | offset ${fmt(parcel.z, 1)} m`);
    });

    lines.push("", "HOLD DISTRIBUTION");
    plan.holdEvaluations.forEach((item) => {
      lines.push(`${item.hold.name}: load ${fmt(item.load, 0)} mt (${fmt(item.loadPct, 0)}%), volume ${fmt(item.volumePct, 0)}%, tanktop ${fmt(item.tanktopPct, 0)}%, status ${item.level.toUpperCase()}`);
    });

    lines.push("", "STABILITY CRITERIA");
    plan.criteria.forEach((item) => {
      lines.push(`${item.level.toUpperCase()} | ${item.label}: ${item.value} | ${item.note}`);
    });

    lines.push("", "RECOMMENDATIONS");
    plan.advice.forEach((item) => {
      lines.push(`${item.level.toUpperCase()} | ${item.title}: ${item.text}`);
    });

    lines.push("", "Planning estimate only. Use vessel-approved stability booklet and class-approved loadicator for real operations.");
    return lines;
  }

  function pdfEscape(text) {
    return String(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }

  function buildSimplePdf(lines) {
    const pageLineCount = 34;
    const pages = [];
    for (let index = 0; index < lines.length; index += pageLineCount) {
      pages.push(lines.slice(index, index + pageLineCount));
    }

    const objects = [];
    const addObject = (content) => {
      objects.push(content);
      return objects.length;
    };
    const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
    const pagesId = addObject("__PAGES__");
    const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
    const pageIds = [];
    const contentIds = [];

    pages.forEach((pageLines, pageIndex) => {
      const content = [
        "BT",
        "/F1 11 Tf",
        "48 792 Td",
        "14 TL",
        ...pageLines.map((line, lineIndex) => `${lineIndex === 0 ? "" : "T*"} (${pdfEscape(line)}) Tj`),
        "ET"
      ].join("\n");
      const contentId = addObject(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
      const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`);
      contentIds.push(contentId);
      pageIds.push(pageId);
    });

    objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

    let pdf = "%PDF-1.4\n";
    const offsets = [0];
    objects.forEach((object, index) => {
      offsets.push(pdf.length);
      pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });
    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.slice(1).forEach((offset) => {
      pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    return pdf;
  }

  function downloadBlob(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => {
      link.remove();
      URL.revokeObjectURL(url);
    }, 2500);
  }

  function downloadProfessionalReport() {
    const filename = "focusea-load-plan-report.pdf";
    const lines = buildLoadPlanLines();
    const pdf = buildSimplePdf(lines);
    latestReportLines = lines;
    window.focuseaLastPdfReport = {
      filename,
      bytes: pdf.length,
      signature: pdf.slice(0, 8)
    };
    downloadBlob(filename, pdf, "application/pdf");
    if (latestProfessionalPlan) addReportHistoryEntry(lines, latestProfessionalPlan);
    if (professionalPlanStatus && latestProfessionalPlan) {
      const statusLabel = latestProfessionalPlan.overallLevel === "danger" ? "ALERT" : latestProfessionalPlan.overallLevel === "watch" ? "WATCH" : "OK";
      professionalPlanStatus.textContent = `${statusLabel} - PDF report generated`;
    }
  }

  function calculateTransverse(model) {
    const portCargo = transverseNumber("portCargo");
    const stbdCargo = transverseNumber("stbdCargo");
    const portBallast = transverseNumber("portBallast");
    const stbdBallast = transverseNumber("stbdBallast");
    const portArm = Math.max(transverseNumber("portArm"), 0);
    const stbdArm = Math.max(transverseNumber("stbdArm"), 0);
    const beam = Math.max(transverseNumber("beam"), 1);
    const freeboard = Math.max(transverseNumber("freeboard"), 0.1);
    const windMoment = transverseNumber("windMoment");
    const downfloodingAngle = Math.max(transverseNumber("downfloodingAngle"), 1);
    const portTotal = portCargo + portBallast;
    const stbdTotal = stbdCargo + stbdBallast;
    const sideMoment = (stbdTotal * stbdArm) - (portTotal * portArm);
    const cargoMoment = model.heelMoment || 0;
    const totalMoment = sideMoment + cargoMoment + windMoment;
    const denominator = model.displacement * Math.max(model.correctedGm, 0.05);
    const heelRad = Math.atan(totalMoment / denominator);
    const heelDeg = heelRad * 180 / Math.PI;
    const heelDirection = heelDeg > 0.05 ? "Starboard down" : heelDeg < -0.05 ? "Port down" : "Upright";
    const meanDraft = (model.fwdDraft + model.aftDraft) / 2;
    const transverseDraftDiff = beam * Math.tan(Math.abs(heelRad));
    const stbdDraft = meanDraft + (heelDeg >= 0 ? transverseDraftDiff / 2 : -transverseDraftDiff / 2);
    const portDraft = meanDraft - (heelDeg >= 0 ? transverseDraftDiff / 2 : -transverseDraftDiff / 2);
    const deckEdgeAngle = Math.atan(freeboard / (beam / 2)) * 180 / Math.PI;
    const deckMargin = deckEdgeAngle - Math.abs(heelDeg);
    const downfloodingMargin = downfloodingAngle - Math.abs(heelDeg);
    const heelingArm = totalMoment / Math.max(model.displacement, 1);
    const gzPoints = [];
    let peakGz = -Infinity;
    let peakAngle = 0;

    for (let angle = 0; angle <= 60; angle += 3) {
      const rad = angle * Math.PI / 180;
      const deckPenalty = angle > deckEdgeAngle ? (angle - deckEdgeAngle) * 0.012 : 0;
      const gz = Math.max(0, model.correctedGm * Math.sin(rad) * Math.cos(rad * 0.42) - deckPenalty);
      const residual = gz - Math.abs(heelingArm) * Math.cos(rad);
      gzPoints.push({ angle, gz, residual });
      if (gz > peakGz) {
        peakGz = gz;
        peakAngle = angle;
      }
    }

    const limitAngle = Math.min(deckEdgeAngle, downfloodingAngle);
    const level = model.correctedGm < 0.55 || Math.abs(heelDeg) > 5 || downfloodingMargin < 5 || deckMargin < 3
      ? "ALERT"
      : Math.abs(heelDeg) > 2.5 || downfloodingMargin < 10 || deckMargin < 7
        ? "WATCH"
        : "OK";

    return {
      portCargo,
      stbdCargo,
      portBallast,
      stbdBallast,
      portTotal,
      stbdTotal,
      sideMoment,
      cargoMoment,
      windMoment,
      totalMoment,
      heelingArm,
      heelRad,
      heelDeg,
      heelDirection,
      beam,
      freeboard,
      meanDraft,
      portDraft,
      stbdDraft,
      transverseDraftDiff,
      deckEdgeAngle,
      deckMargin,
      downfloodingAngle,
      downfloodingMargin,
      limitAngle,
      peakGz,
      peakAngle,
      gzPoints,
      level
    };
  }

  function renderGzCurve(result) {
    if (!gzCurveLine || !heelMarkerLine || !gzPeakLabel) return;
    const maxGz = Math.max(result.peakGz, 0.25);
    const points = result.gzPoints.map((point) => {
      const x = 34 + (point.angle / 60) * 308;
      const y = 132 - (point.gz / maxGz) * 100;
      return `${fmt(x, 1)},${fmt(y, 1)}`;
    }).join(" ");
    const markerX = 34 + (Math.min(Math.abs(result.heelDeg), 60) / 60) * 308;

    gzCurveLine.setAttribute("points", points);
    heelMarkerLine.setAttribute("x1", markerX);
    heelMarkerLine.setAttribute("x2", markerX);
    gzPeakLabel.textContent = `Peak ${fmt(result.peakGz, 2)} m @ ${fmt(result.peakAngle, 0)} deg`;
  }

  function renderTransverse(model) {
    if (!transverseForm || !transverseMetrics) return;
    const result = calculateTransverse(model);
    const absHeel = Math.abs(result.heelDeg);
    const directionNote = result.totalMoment > 0 ? "positive to starboard" : result.totalMoment < 0 ? "positive to port" : "balanced";
    const statusClass = result.level === "ALERT" ? "danger" : result.level === "WATCH" ? "watch" : "ok";

    transverseStatus.className = `scene-status ${statusClass}`;
    transverseStatus.textContent = `${result.level} - ${result.heelDirection}`;
    transverseMetrics.innerHTML = [
      ["Heeling moment", `${fmt(Math.abs(result.totalMoment), 0)} mt-m`, directionNote],
      ["Equilibrium heel", `${fmt(absHeel, 2)} deg`, result.heelDirection],
      ["Port / stbd draft", `${fmt(result.portDraft, 2)} / ${fmt(result.stbdDraft, 2)} m`, `Difference ${fmt(result.transverseDraftDiff, 2)} m`],
      ["Deck-edge margin", `${fmt(result.deckMargin, 2)} deg`, `Deck edge ${fmt(result.deckEdgeAngle, 2)} deg`],
      ["Downflooding margin", `${fmt(result.downfloodingMargin, 2)} deg`, `Limit ${fmt(result.downfloodingAngle, 0)} deg`],
      ["GZ peak", `${fmt(result.peakGz, 2)} m`, `Approx. at ${fmt(result.peakAngle, 0)} deg`],
      ["Port total", `${fmt(result.portTotal, 0)} mt`, "Cargo + ballast"],
      ["Stbd total", `${fmt(result.stbdTotal, 0)} mt`, "Cargo + ballast"]
    ].map(([label, metricValue, note]) => `
      <article>
        <span>${label}</span>
        <strong>${metricValue}</strong>
        <small>${note}</small>
      </article>
    `).join("");

    if (crossSectionHull) crossSectionHull.style.setProperty("--section-heel", `${clamp(result.heelDeg * -1, -14, 14)}deg`);
    if (sectionCg) sectionCg.style.setProperty("--cg-x", `${clamp(50 + result.heelDeg * 1.7, 18, 82)}%`);
    if (sectionPortLoad) sectionPortLoad.style.setProperty("--load-height", `${clamp(18 + result.portTotal / 120, 14, 78)}px`);
    if (sectionStbdLoad) sectionStbdLoad.style.setProperty("--load-height", `${clamp(18 + result.stbdTotal / 120, 14, 78)}px`);
    if (heelDirectionLabel) heelDirectionLabel.textContent = result.heelDirection;
    if (heelAngleLabel) heelAngleLabel.textContent = `${fmt(absHeel, 2)} deg`;

    renderGzCurve(result);
    window.focuseaTransverseStability = { result, update: () => renderTransverse(calculateModel()) };
  }

  function updateFallbackShip(model) {
    const trimAngle = clamp(model.trimMeters * 1.7, -8, 8);
    const heelAngle = clamp(model.heelDeg * -0.42, -10, 10);
    const cargoX = clamp(58 - (model.x / 90) * 34, 24, 88);
    const cargoZ = clamp(model.z * 1.1, -18, 18);
    const cargoScale = clamp(0.62 + model.cargoWeight / Math.max(model.vessel.maxCargo, 1), 0.42, 1.92);
    const loadRatio = clamp(model.cargoWeight / Math.max(model.vessel.maxCargo, 1), 0, 1.08);
    const meanDraft = (model.fwdDraft + model.aftDraft) / 2;
    const draftDelta = meanDraft - model.vessel.draftBase;
    const shipSink = clamp(4 + loadRatio * 18 + Math.max(draftDelta, 0) * 4.8, 0, 30);
    const waterlineY = clamp(72 + loadRatio * 22 + Math.max(draftDelta, 0) * 6, 66, 112);
    const wavePower = clamp(0.42 + loadRatio * 0.58 + Math.abs(model.trimMeters) * 0.08 + Math.abs(model.heelDeg) * 0.025, 0.34, 1.22);
    const wakeShift = clamp(model.trimMeters * 10, -24, 24);
    const wakeShiftBack = wakeShift * -0.6;
    const trimDisplayAngle = trimAngle * 0.35;

    scene.dataset.vessel = model.vessel.visual;
    scene.dataset.cargo = model.cargo.visual;
    scene.classList.toggle("stowage-mode", cargoPlan.length > 0);
    scene.style.setProperty("--ship-sink", `${shipSink}px`);
    scene.style.setProperty("--wave-power", wavePower.toFixed(2));
    scene.style.setProperty("--wake-shift", `${wakeShift}px`);
    scene.style.setProperty("--wake-shift-back", `${wakeShiftBack}px`);
    scene.style.setProperty("--trim-display-angle", `${trimDisplayAngle}deg`);
    scene.style.setProperty("--sea-swell-opacity", clamp(0.2 + wavePower * 0.24, 0.24, 0.52).toFixed(2));
    scene.style.setProperty("--sea-foam-opacity", clamp(0.26 + wavePower * 0.24, 0.3, 0.58).toFixed(2));
    scene.style.setProperty("--bow-foam-opacity", clamp(0.34 + wavePower * 0.34, 0.4, 0.76).toFixed(2));
    scene.style.setProperty("--stern-wake-opacity", clamp(0.28 + wavePower * 0.3, 0.34, 0.68).toFixed(2));
    scene.style.setProperty("--bow-foam-soft-opacity", clamp(0.3 + wavePower * 0.3, 0.36, 0.68).toFixed(2));
    scene.style.setProperty("--bow-foam-strong-opacity", clamp(0.42 + wavePower * 0.34, 0.48, 0.84).toFixed(2));
    fallbackShip.style.setProperty("--trim-angle", `${trimAngle}deg`);
    fallbackShip.style.setProperty("--heel-angle", `${heelAngle}deg`);
    fallbackShip.style.setProperty("--cargo-x", `${cargoX}%`);
    fallbackShip.style.setProperty("--cargo-z", `${cargoZ}px`);
    fallbackShip.style.setProperty("--cargo-scale", cargoScale.toFixed(2));
    fallbackShip.style.setProperty("--ship-width", model.vessel.width);
    fallbackShip.style.setProperty("--waterline-y", `${waterlineY}px`);
    fallbackCargo.style.background = model.risk.level === "ALERT"
      ? "linear-gradient(180deg, #ff80ae, #c83170)"
      : model.risk.level === "WATCH"
        ? "linear-gradient(180deg, #ffe18a, #c98c1f)"
        : model.cargo.color;
    fallbackCargo.dataset.load = `${fmt(model.cargoWeight, 0)} mt`;
    fallbackCargo.dataset.cargo = model.cargo.label;

    scene.style.setProperty("--vessel-hull", model.vessel.hull);
    scene.style.setProperty("--vessel-lower", model.vessel.lower);
    scene.style.setProperty("--vessel-deck", model.vessel.deck);
    if (seaDraftReadout) {
      seaDraftReadout.textContent = `Draft F/A ${fmt(model.fwdDraft, 2)} / ${fmt(model.aftDraft, 2)} m`;
    }

    const nearestIndex = holdCenters.reduce((best, center, index) => {
      return Math.abs(model.x - center) < Math.abs(model.x - holdCenters[best]) ? index : best;
    }, 0);

    holdClasses.forEach((className, index) => {
      const hold = fallbackShip.querySelector(`.${className}`);
      if (hold) hold.classList.toggle("active", index === nearestIndex);
    });

    scene.classList.add("basic-ready");
  }

  function sync() {
    const model = calculateModel();
    setReadouts(model);
    renderIntel(model);
    renderMetrics(model);
    renderCargoPalette(model);
    renderTransverse(model);
    updateFallbackShip(model);
    renderProfessionalPlan(model);
    window.focuseaLoadicatorBasic = {
      model,
      vesselProfiles,
      cargoProfiles,
      cargoCompatibilityProfiles,
      cargoPlan,
      latestProfessionalPlan,
      latestAutoBalanceAction,
      latestRiskReasons,
      reportHistory,
      shipStowageLayer,
      activeShipView,
      setShipView: (view) => {
        if (["side", "top", "cross", "iso"].includes(view)) {
          activeShipView = view;
          sync();
        }
      },
      calculate: calculateModel,
      update: sync,
      loadScenario,
      applyAutoBalanceAction,
      buildLoadPlanLines,
      applyVesselPreset,
      applyCargoPreset
    };
  }

  form.addEventListener("input", (event) => {
    const parcel = selectedParcel();
    if (parcel) {
      if (event.target.name === "cargoWeight") parcel.weight = number("cargoWeight");
      if (event.target.name === "cargoKg") parcel.kg = number("cargoKg");
      if (event.target.name === "cargoSf") parcel.sf = number("cargoSf");
      if (event.target.name === "transverse") parcel.z = number("transverse");
    }
    if (event.target.name === "longitudinal") form.elements.hold.value = "custom";
    sync();
  });

  if (transverseForm) {
    transverseForm.addEventListener("input", sync);
  }

  if (ballastPlanForm) {
    ballastPlanForm.addEventListener("input", sync);
  }

  form.elements.vesselType.addEventListener("change", () => {
    applyVesselPreset();
    sync();
  });

  form.elements.cargoType.addEventListener("change", () => {
    applyCargoPreset();
    const parcel = selectedParcel();
    if (parcel) {
      const cargo = currentCargo();
      parcel.cargoKey = cargo.key;
      parcel.label = cargo.label;
      parcel.kg = cargo.kg;
      parcel.sf = cargo.sf;
      parcel.templateKey = Object.keys(planTemplates).find((key) => planTemplates[key].cargoKey === cargo.key) || parcel.templateKey;
      setSingleLoadFromParcel(parcel);
    }
    sync();
  });

  form.elements.hold.addEventListener("change", () => {
    const nextValue = form.elements.hold.value;
    if (nextValue !== "custom") {
      selectHoldTarget(nextValue);
    }
    sync();
  });

  quickHoldButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextValue = button.dataset.hold;
      selectHoldTarget(nextValue);
      sync();
    });
  });

  quickLoadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const step = Number(button.dataset.loadStep) || 0;
      const holdValue = selectedHoldValue();
      let parcel = quickParcelForHold(holdValue, step > 0);

      if (step > 0) {
        if (!parcel || parcel.cargoKey !== currentCargo().key) {
          parcel = createQuickParcel(holdValue, step);
        } else {
          parcel.weight = Math.max(parcel.weight + step, 0);
          selectedParcelId = parcel.id;
          setSingleLoadFromParcel(parcel);
        }
      } else if (parcel) {
        parcel.weight = Math.max(parcel.weight + step, 0);
        if (parcel.weight <= 0) {
          cargoPlan = cargoPlan.filter((item) => item.id !== parcel.id);
          selectedParcelId = cargoPlan.find((item) => item.hold === holdValue)?.id || null;
          const nextParcel = selectedParcel();
          if (nextParcel) setSingleLoadFromParcel(nextParcel);
          else selectHoldTarget(holdValue, false);
        } else {
          selectedParcelId = parcel.id;
          setSingleLoadFromParcel(parcel);
        }
      }
      sync();
    });
  });

  if (quickLoadClear) {
    quickLoadClear.addEventListener("click", () => {
      const holdValue = selectedHoldValue();
      cargoPlan = cargoPlan.filter((parcel) => parcel.hold !== holdValue);
      selectedParcelId = null;
      selectHoldTarget(holdValue, false);
      form.elements.cargoWeight.value = 0;
      sync();
    });
  }

  shipViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeShipView = button.dataset.shipView || "side";
      sync();
    });
  });

  cargoExampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cargoKey = button.dataset.cargoPreset;
      const vesselKey = button.dataset.vesselPreset;
      const cargoWeight = Number(button.dataset.weight);

      if (vesselKey && form.elements.vesselType.value !== vesselKey) {
        form.elements.vesselType.value = vesselKey;
        applyVesselPreset();
      }

      if (cargoKey) {
        form.elements.cargoType.value = cargoKey;
        applyCargoPreset();
      }

      if (!Number.isNaN(cargoWeight)) {
        const field = form.elements.cargoWeight;
        const min = Number(field.min) || 0;
        const max = Number(field.max) || currentVessel().maxCargo;
        field.value = clamp(cargoWeight, min, max);
      }

      sync();
    });
  });

  parcelTemplateButtons.forEach((button) => {
    button.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", button.dataset.parcelTemplate);
    });
    button.addEventListener("click", () => {
      createParcel(button.dataset.parcelTemplate, form.elements.hold.value || "0");
      sync();
    });
  });

  holdDropZones.forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", () => {
      zone.classList.remove("drag-over");
    });
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("drag-over");
      const payload = event.dataTransfer.getData("text/plain");
      const holdValue = zone.dataset.planHold;
      if (payload.startsWith("parcel:")) {
        const parcelId = payload.replace("parcel:", "");
        const parcel = cargoPlan.find((item) => item.id === parcelId);
        if (parcel) {
          parcel.hold = holdValue;
          selectedParcelId = parcel.id;
          setSingleLoadFromParcel(parcel);
        }
      } else if (payload) {
        createParcel(payload, holdValue);
      }
      sync();
    });
  });

  if (applyParcelEditButton) {
    applyParcelEditButton.addEventListener("click", applyEditorToParcel);
  }

  if (parcelEditorForm) {
    parcelEditorForm.addEventListener("change", applyEditorToParcel);
  }

  if (duplicateParcelButton) {
    duplicateParcelButton.addEventListener("click", () => {
      const parcel = selectedParcel();
      if (!parcel) return;
      createParcel(parcel.templateKey, parcel.hold, {
        label: parcel.label,
        cargoKey: parcel.cargoKey,
        weight: parcel.weight,
        kg: parcel.kg,
        sf: parcel.sf,
        z: parcel.z
      });
      sync();
    });
  }

  if (deleteParcelButton) {
    deleteParcelButton.addEventListener("click", () => {
      const parcel = selectedParcel();
      if (!parcel) return;
      cargoPlan = cargoPlan.filter((item) => item.id !== parcel.id);
      selectedParcelId = cargoPlan[0]?.id || null;
      setSingleLoadFromParcel(selectedParcel());
      sync();
    });
  }

  if (downloadLoadPlanReport) {
    downloadLoadPlanReport.addEventListener("click", downloadProfessionalReport);
  }

  if (applyAutoBalanceButton) {
    applyAutoBalanceButton.addEventListener("click", applyAutoBalanceAction);
  }

  if (refreshAutoBalanceButton) {
    refreshAutoBalanceButton.addEventListener("click", sync);
  }

  scenarioModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      loadScenario(button.dataset.scenario);
    });
  });

  copilotActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (loadicatorCopilotOutput) {
        loadicatorCopilotOutput.innerHTML = buildCopilotAnswer(button.dataset.copilotAction);
      }
    });
  });

  resetButton.addEventListener("click", () => {
    form.reset();
    applyVesselPreset();
    applyCargoPreset();
    cargoPlan = [
      { id: "P-001", templateKey: "coalParcel", hold: "0", label: "Coal parcel", cargoKey: "coal", weight: 1200, kg: 8.5, sf: 1.35, z: 0 },
      { id: "P-002", templateKey: "grainParcel", hold: "-36", label: "Grain parcel", cargoKey: "grain", weight: 950, kg: 9.2, sf: 1.55, z: -2 },
      { id: "P-003", templateKey: "ironOreParcel", hold: "36", label: "Iron ore parcel", cargoKey: "ironOre", weight: 1500, kg: 6.6, sf: 0.48, z: 2 }
    ];
    selectedParcelId = cargoPlan[0]?.id || null;
    parcelSequence = 4;
    if (scenarioModeOutput) scenarioModeOutput.textContent = "Select a scenario to load a professional training case.";
    if (loadicatorCopilotOutput) loadicatorCopilotOutput.textContent = "Copilot ready.";
    sync();
  });

  applyVesselPreset();
  applyCargoPreset();
  sync();
})();
