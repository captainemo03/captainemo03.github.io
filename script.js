const vessels = {
  orion: {
    name: "MV Orion",
    speed: "17.8 kn",
    flag: "Panama",
    imo: "9387421",
    destination: "Singapore",
    eta: "14 days"
  },
  atlas: {
    name: "MT Atlas",
    speed: "13.2 kn",
    flag: "Marshall Islands",
    imo: "9441186",
    destination: "Rotterdam",
    eta: "8 days"
  },
  nova: {
    name: "LNG Nova",
    speed: "19.4 kn",
    flag: "Liberia",
    imo: "9734507",
    destination: "Istanbul",
    eta: "5 days"
  }
};

const scenarios = [
  {
    title: "Fırtına rotanın üzerinde.",
    text: "Bengal Körfezi'nde fırtına hattı oluştu. Kısa rota riskli, güvenli rota ise 18 saat uzatıyor.",
    options: [
      { label: "Güvenli rotaya dön", profit: -8, safety: 14, delay: 18, fuel: 32 },
      { label: "Kısa rotada kal", profit: 9, safety: -22, delay: 2, fuel: -8 }
    ]
  },
  {
    title: "Limanda sıra bekleme riski var.",
    text: "Varış limanında yoğunluk arttı. Hızlanırsan beklemede yakıt yakabilirsin, yavaşlarsan ETA uzar.",
    options: [
      { label: "Eco speed uygula", profit: 7, safety: 4, delay: 10, fuel: -42 },
      { label: "Tam hız devam et", profit: -12, safety: -4, delay: -5, fuel: 58 }
    ]
  },
  {
    title: "COLREGS: karşıdan gelen gemi.",
    text: "Radar iki geminin çakışan rotaya girdiğini gösteriyor. Manevra kararın güvenlik skorunu belirleyecek.",
    options: [
      { label: "Sancağa net manevra", profit: 0, safety: 18, delay: 1, fuel: 4 },
      { label: "Rotayı koru", profit: 5, safety: -28, delay: 0, fuel: 0 }
    ]
  },
  {
    title: "Yakıt ikmali seçimi.",
    text: "Bir sonraki limanda yakıt daha ucuz ama mevcut stok düşük. Şimdi ikmal etmek güvenli, beklemek kârlı.",
    options: [
      { label: "Şimdi ikmal et", profit: -10, safety: 12, delay: 4, fuel: 20 },
      { label: "Sonraki limanı bekle", profit: 16, safety: -12, delay: 0, fuel: -18 }
    ]
  }
];

const calculators = {
  eta: {
    fields: [
      { id: "distance", label: "Mesafe (nautical mile)", value: 1200 },
      { id: "speed", label: "Hız (knot)", value: 15 }
    ],
    calculate: ({ distance, speed }) => {
      const hours = distance / speed;
      return `Tahmini varış: ${hours.toFixed(1)} saat (${(hours / 24).toFixed(1)} gün).`;
    }
  },
  bunker: {
    fields: [
      { id: "consumption", label: "Günlük tüketim (ton)", value: 28 },
      { id: "days", label: "Seyir süresi (gün)", value: 12 },
      { id: "price", label: "Ton fiyatı ($)", value: 620 }
    ],
    calculate: ({ consumption, days, price }) => {
      const total = consumption * days * price;
      return `Yakıt maliyeti: $${total.toLocaleString("en-US")}.`;
    }
  },
  demurrage: {
    fields: [
      { id: "delay", label: "Gecikme (saat)", value: 18 },
      { id: "rate", label: "Demurrage günlük ($)", value: 15000 }
    ],
    calculate: ({ delay, rate }) => {
      const total = (delay / 24) * rate;
      return `Demurrage: $${total.toLocaleString("en-US", { maximumFractionDigits: 0 })}.`;
    }
  }
};

let scenarioIndex = 0;
let score = {
  profit: 82,
  safety: 78,
  delay: 6,
  fuel: 410
};

const vesselInfo = document.querySelector("#vesselInfo");
const shipButtons = document.querySelectorAll(".ship");
const decisionButtons = document.querySelector("#decisionButtons");
const scenarioStep = document.querySelector("#scenarioStep");
const scenarioTitle = document.querySelector("#scenarioTitle");
const scenarioText = document.querySelector("#scenarioText");
const calculatorForm = document.querySelector("#calculatorForm");
const calculatorResult = document.querySelector("#calculatorResult");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatWindow = document.querySelector("#chatWindow");

function setVessel(id) {
  const vessel = vessels[id];
  shipButtons.forEach((button) => button.classList.toggle("selected", button.dataset.ship === id));
  vesselInfo.innerHTML = `
    <p class="eyebrow">Selected Vessel</p>
    <h2>${vessel.name}</h2>
    <div class="metric-list">
      <div><span>Speed</span><strong>${vessel.speed}</strong></div>
      <div><span>Flag</span><strong>${vessel.flag}</strong></div>
      <div><span>IMO</span><strong>${vessel.imo}</strong></div>
      <div><span>Destination</span><strong>${vessel.destination}</strong></div>
      <div><span>ETA</span><strong>${vessel.eta}</strong></div>
    </div>
  `;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateScores() {
  document.querySelector("#profitScore").textContent = `$${score.profit}K`;
  document.querySelector("#safetyScore").textContent = String(clamp(score.safety, 0, 100));
  document.querySelector("#delayScore").textContent = `${Math.max(score.delay, 0)} saat`;
  document.querySelector("#fuelScore").textContent = `${Math.max(score.fuel, 0)} t`;
  document.querySelector("#scoreBar").style.width = `${clamp(score.safety, 8, 100)}%`;
}

function renderScenario() {
  const scenario = scenarios[scenarioIndex];
  scenarioStep.textContent = `Senaryo ${scenarioIndex + 1} / ${scenarios.length}`;
  scenarioTitle.textContent = scenario.title;
  scenarioText.textContent = scenario.text;
  decisionButtons.innerHTML = "";

  scenario.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.label;
    button.addEventListener("click", () => {
      score.profit += option.profit;
      score.safety += option.safety;
      score.delay += option.delay;
      score.fuel += option.fuel;
      scenarioIndex = (scenarioIndex + 1) % scenarios.length;
      updateScores();
      renderScenario();
    });
    decisionButtons.append(button);
  });
}

function resetSimulation() {
  scenarioIndex = 0;
  score = { profit: 82, safety: 78, delay: 6, fuel: 410 };
  updateScores();
  renderScenario();
}

function renderCalculator(type) {
  const calculator = calculators[type];
  calculatorForm.innerHTML = "";

  calculator.fields.forEach((field) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field";
    wrapper.innerHTML = `
      <label for="${field.id}">${field.label}</label>
      <input id="${field.id}" name="${field.id}" type="number" min="0" step="0.1" value="${field.value}" />
    `;
    calculatorForm.append(wrapper);
  });

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Hesapla";
  calculatorForm.append(button);
  calculatorForm.dataset.calc = type;
  calculatorResult.textContent = "Değerleri gir ve hesapla.";
}

function answerQuestion(question) {
  const normalized = question.toLowerCase();

  if (normalized.includes("demurrage")) {
    return "Demurrage, geminin izin verilen laytime süresini aşması halinde kiracıya yansıyan gecikme bedelidir.";
  }

  if (normalized.includes("laytime")) {
    return "Laytime, yükleme veya tahliye için charter party içinde tanımlanan izinli süredir. Gecikme bu süre aşıldığında hesaplanır.";
  }

  if (normalized.includes("colreg")) {
    return "COLREGS denizde çatışmayı önleme kurallarıdır. Karşılıklı gelişte genellikle iki gemi de sancağa manevra yapar.";
  }

  if (normalized.includes("eta")) {
    return "ETA için temel formül: mesafe / hız. Örneğin 1200 nm ve 15 knot hız yaklaşık 80 saat eder.";
  }

  return "Bu prototipte kısa denizcilik cevapları veriyorum. Sorunu laytime, demurrage, COLREGS, ETA veya bunker olarak yazarsan daha net hesaplarım.";
}

shipButtons.forEach((button) => {
  button.addEventListener("click", () => setVessel(button.dataset.ship));
});

document.querySelector("#resetSimulation").addEventListener("click", resetSimulation);

document.querySelectorAll(".tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tabs button").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderCalculator(button.dataset.calc);
  });
});

calculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(calculatorForm);
  const values = Object.fromEntries([...formData.entries()].map(([key, value]) => [key, Number(value)]));
  calculatorResult.textContent = calculators[calculatorForm.dataset.calc].calculate(values);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;

  const userMessage = document.createElement("div");
  userMessage.className = "user-message";
  userMessage.textContent = question;
  chatWindow.append(userMessage);

  const botMessage = document.createElement("div");
  botMessage.className = "bot-message";
  botMessage.textContent = answerQuestion(question);
  chatWindow.append(botMessage);

  chatInput.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

renderScenario();
renderCalculator("eta");
