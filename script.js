const vessels = {
  orion: {
    name: "MV Orion",
    speed: "17.8 kn",
    flag: "Panama",
    imo: "9387421",
    destination: "Singapore",
    eta: "14 days",
    cargo: "5,400 TEU",
    risk: "Weather watch"
  },
  atlas: {
    name: "MT Atlas",
    speed: "13.2 kn",
    flag: "Marshall Islands",
    imo: "9441186",
    destination: "Rotterdam",
    eta: "8 days",
    cargo: "Crude oil",
    risk: "Low"
  },
  nova: {
    name: "LNG Nova",
    speed: "19.4 kn",
    flag: "Liberia",
    imo: "9734507",
    destination: "Istanbul",
    eta: "5 days",
    cargo: "LNG",
    risk: "Port congestion"
  }
};

const ports = {
  istanbul: {
    name: "Istanbul Port",
    country: "Turkiye",
    type: "Container, general cargo, Ro-Ro",
    depth: "14 m",
    pilotage: "Compulsory",
    berth: "8 active berths",
    cranes: "STS, mobile harbor crane",
    fuel: "Available",
    weather: "North wind 18 kn",
    vhf: "VHF 12 / 16",
    documents: ["Crew list", "Cargo manifest", "Port clearance", "ISPS declaration"],
    services: ["Pilotage", "Towage", "Fresh water", "Bunker", "Waste reception", "Ship repair"],
    risks: ["Bosphorus traffic", "Anchorage waiting", "Strong current"],
    costs: { pilotage: 8400, tug: 12600, berth: 18500, portDues: 9400 },
    productivity: "42 moves/hour",
    note: "Bosphorus traffic density must be checked before arrival."
  },
  ambarli: {
    name: "Ambarli / Kumport",
    country: "Turkiye",
    type: "Container, Ro-Ro, general cargo",
    depth: "16 m",
    pilotage: "Compulsory",
    berth: "Marmara container and Ro-Ro terminals",
    cranes: "STS cranes, RTG yard, Ro-Ro ramps",
    fuel: "Available by arrangement",
    weather: "Marmara northerly wind / fog watch",
    vhf: "VHF 12 / 16",
    documents: ["Cargo manifest", "Crew list", "Port clearance", "ISPS declaration", "Customs filing"],
    services: ["Container terminal", "Ro-Ro", "Bunker by arrangement", "Agency", "Truck gate", "Reefer support"],
    risks: ["Marmara traffic", "Terminal cut-off", "Truck gate congestion", "Winter fog"],
    costs: { pilotage: 7800, tug: 13200, berth: 21200, portDues: 10400 },
    productivity: "92 moves/hour",
    note: "Primary Marmara container gateway; gate and berth windows should be checked before fixing."
  },
  mersin: {
    name: "Mersin International Port",
    country: "Turkiye",
    type: "Container, dry bulk, Ro-Ro, project cargo",
    depth: "15.5 m",
    pilotage: "Compulsory",
    berth: "Container, bulk and general cargo berths",
    cranes: "STS cranes, mobile harbor cranes, bulk equipment",
    fuel: "Available by arrangement",
    weather: "Eastern Mediterranean wind / summer heat watch",
    vhf: "VHF 12 / 16",
    documents: ["Cargo manifest", "Customs declaration", "Crew list", "Port clearance", "ISPS declaration"],
    services: ["Container terminal", "Rail connection", "Ro-Ro", "Bulk handling", "Project cargo", "Warehousing"],
    risks: ["Gate congestion", "Customs cut-off", "Heat operations", "Eastern Med weather"],
    costs: { pilotage: 7600, tug: 12900, berth: 20600, portDues: 10200 },
    productivity: "88 moves/hour",
    note: "Key Eastern Mediterranean gateway for Anatolia, Iraq/Syria transit and container/bulk cargo."
  },
  izmir: {
    name: "Izmir / Alsancak",
    country: "Turkiye",
    type: "Container, general cargo, cruise",
    depth: "11 m",
    pilotage: "Compulsory",
    berth: "Alsancak general cargo, container and passenger berths",
    cranes: "STS cranes, mobile cranes",
    fuel: "Available by arrangement",
    weather: "Aegean wind watch",
    vhf: "VHF 12 / 16",
    documents: ["Cargo manifest", "Customs declaration", "Crew list", "Port clearance", "Passenger documents if applicable"],
    services: ["Container handling", "General cargo", "Cruise support", "Agency", "Bunker by arrangement", "Warehousing"],
    risks: ["Draft limitation", "Urban port traffic", "Aegean wind", "Terminal schedule pressure"],
    costs: { pilotage: 6900, tug: 11800, berth: 18800, portDues: 9100 },
    productivity: "55 moves/hour",
    note: "Useful Aegean gateway; draft and berth window should be checked carefully."
  },
  aliaga: {
    name: "Aliaga / Nemrut Bay",
    country: "Turkiye",
    type: "Tanker, dry bulk, container, petrochemical",
    depth: "20 m",
    pilotage: "Compulsory",
    berth: "Industrial jetties, tanker terminals and bulk/container berths",
    cranes: "Bulk grabs, shore cranes, liquid cargo arms",
    fuel: "Available by arrangement",
    weather: "Aegean northerly wind watch",
    vhf: "VHF 12 / 16",
    documents: ["Terminal safety checklist", "Cargo manifest", "Dangerous goods declaration", "Crew list", "Port clearance"],
    services: ["Liquid bulk", "Dry bulk", "Container feeder", "Agency", "Survey", "Industrial logistics"],
    risks: ["Terminal-specific rules", "Dangerous cargo controls", "Wind delay", "Draft/berth compatibility"],
    costs: { pilotage: 8300, tug: 14600, berth: 22400, portDues: 11600 },
    productivity: "62 moves/hour",
    note: "Industrial Aegean cluster; terminal approval and cargo compatibility matter before fixing."
  },
  gemlik: {
    name: "Gemlik",
    country: "Turkiye",
    type: "Container, Ro-Ro, automotive, general cargo",
    depth: "14 m",
    pilotage: "Compulsory",
    berth: "Gemlik Bay container, Ro-Ro and general cargo terminals",
    cranes: "STS cranes, mobile harbor cranes, Ro-Ro ramps",
    fuel: "Available by arrangement",
    weather: "Marmara wind / fog watch",
    vhf: "VHF 12 / 16",
    documents: ["Cargo manifest", "Customs declaration", "Crew list", "Port clearance", "ISPS declaration"],
    services: ["Automotive Ro-Ro", "Container terminal", "General cargo", "Agency", "Warehousing", "Truck gate"],
    risks: ["Automotive peak pressure", "Berth window", "Fog", "Truck gate congestion"],
    costs: { pilotage: 7200, tug: 12600, berth: 19800, portDues: 9600 },
    productivity: "74 moves/hour",
    note: "Strong Marmara automotive and container cluster; Ro-Ro schedule should be protected."
  },
  izmit: {
    name: "Kocaeli / Izmit Gulf",
    country: "Turkiye",
    type: "Container, tanker, dry bulk, Ro-Ro, industrial",
    depth: "20 m",
    pilotage: "Compulsory",
    berth: "Industrial terminals, container berths and liquid bulk jetties",
    cranes: "STS cranes, mobile cranes, grabs, liquid cargo arms",
    fuel: "Available by arrangement",
    weather: "Marmara wind / visibility watch",
    vhf: "VHF 12 / 16",
    documents: ["Cargo manifest", "Terminal safety checklist", "Dangerous goods declaration", "Crew list", "Port clearance"],
    services: ["Industrial cargo", "Container terminal", "Liquid bulk", "Dry bulk", "Agency", "Survey"],
    risks: ["Terminal allocation", "Dangerous cargo compliance", "Marmara traffic", "Draft/berth match"],
    costs: { pilotage: 8600, tug: 15200, berth: 23600, portDues: 12200 },
    productivity: "82 moves/hour",
    note: "Major industrial port zone; exact terminal, cargo class and berth compatibility drive the estimate."
  },
  tekirdag: {
    name: "Tekirdag",
    country: "Turkiye",
    type: "Dry bulk, Ro-Ro, container, general cargo",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Bulk, general cargo, Ro-Ro and container berths",
    cranes: "Mobile harbor cranes, grabs, Ro-Ro ramps",
    fuel: "Available by arrangement",
    weather: "Marmara northerly wind watch",
    vhf: "VHF 12 / 16",
    documents: ["Cargo manifest", "Crew list", "Port clearance", "Customs declaration", "ISPS declaration"],
    services: ["Bulk cargo", "Ro-Ro", "Container handling", "Agency", "Truck gate", "Warehousing"],
    risks: ["Wind delay", "Gate/road pressure", "Berth window", "Marmara traffic"],
    costs: { pilotage: 6500, tug: 11200, berth: 17400, portDues: 8700 },
    productivity: "58 moves/hour",
    note: "Useful Thrace/Marmara alternative for bulk, Ro-Ro and container operations."
  },
  iskenderun: {
    name: "Iskenderun",
    country: "Turkiye",
    type: "Container, steel, dry bulk, project cargo",
    depth: "15.5 m",
    pilotage: "Compulsory",
    berth: "Container, bulk and steel cargo berths",
    cranes: "STS cranes, mobile cranes, bulk grabs",
    fuel: "Available by arrangement",
    weather: "Eastern Mediterranean wind / heat watch",
    vhf: "VHF 12 / 16",
    documents: ["Cargo manifest", "Customs declaration", "Crew list", "Port clearance", "ISPS declaration"],
    services: ["Container handling", "Steel cargo", "Dry bulk", "Project cargo", "Agency", "Survey"],
    risks: ["Earthquake resilience checks", "Terminal availability", "Heat operations", "Cargo damage survey"],
    costs: { pilotage: 7200, tug: 13100, berth: 20100, portDues: 9900 },
    productivity: "70 moves/hour",
    note: "Eastern Mediterranean steel/bulk gateway; terminal status and survey evidence should be checked."
  },
  samsun: {
    name: "Samsun",
    country: "Turkiye",
    type: "Dry bulk, Ro-Ro, general cargo, container feeder",
    depth: "12 m",
    pilotage: "Compulsory",
    berth: "Black Sea bulk, general cargo and ferry/Ro-Ro berths",
    cranes: "Mobile cranes, grabs, Ro-Ro ramps",
    fuel: "Available by arrangement",
    weather: "Black Sea swell / winter wind watch",
    vhf: "VHF 12 / 16",
    documents: ["Cargo manifest", "Crew list", "Port clearance", "Customs declaration", "ISPS declaration"],
    services: ["Bulk cargo", "Ro-Ro/ferry", "General cargo", "Agency", "Warehousing", "Rail/road link"],
    risks: ["Black Sea weather", "Draft limitation", "Winter swell", "Berth window"],
    costs: { pilotage: 6100, tug: 10400, berth: 16200, portDues: 7900 },
    productivity: "44 moves/hour",
    note: "Black Sea gateway; weather and draft should be included in voyage estimates."
  },
  singapore: {
    name: "Singapore",
    country: "Singapore",
    type: "Container, tanker, LNG, bunkering hub",
    depth: "16 m",
    pilotage: "Compulsory",
    berth: "34 active berths",
    cranes: "Mega-ship STS cranes, automated yard",
    fuel: "VLSFO, MGO, LNG",
    weather: "Thunderstorm risk",
    vhf: "VHF 12 / 14 / 16",
    documents: ["Pre-arrival notification", "Maritime declaration of health", "Dangerous goods declaration", "Bunker delivery note"],
    services: ["24/7 bunkering", "Crew change", "Stores", "Sludge disposal", "Underwater inspection", "LNG bunkering"],
    risks: ["High anchorage congestion", "Squall lines", "Strict port state control"],
    costs: { pilotage: 11200, tug: 18800, berth: 26400, portDues: 15100 },
    productivity: "135 moves/hour",
    note: "High bunker availability, high anchorage congestion."
  },
  rotterdam: {
    name: "Rotterdam",
    country: "Netherlands",
    type: "Deep sea container, tanker, dry bulk",
    depth: "23 m",
    pilotage: "Compulsory for large vessels",
    berth: "Deep sea terminals",
    cranes: "Automated container cranes, bulk unloaders",
    fuel: "Available",
    weather: "Good visibility",
    vhf: "VHF 11 / 14 / 16",
    documents: ["EU customs declaration", "Cargo manifest", "Waste notification", "Security declaration"],
    services: ["Deep sea terminal", "Bunker", "Repair yard", "Customs", "Rail connection", "Cold ironing"],
    risks: ["Tidal window", "Dense terminal schedule", "Winter wind delay"],
    costs: { pilotage: 9800, tug: 17200, berth: 23800, portDues: 13200 },
    productivity: "110 moves/hour",
    note: "Strong option for container, tanker and dry bulk operations."
  },
  shanghai: {
    name: "Shanghai Yangshan",
    country: "China",
    type: "Ultra large container hub",
    depth: "15.5 m",
    pilotage: "Compulsory",
    berth: "Deep-water automated berths",
    cranes: "Remote STS cranes, automated yard",
    fuel: "VLSFO, MGO",
    weather: "Typhoon season watch",
    vhf: "VHF 09 / 16",
    documents: ["China customs manifest", "Pre-arrival report", "Dangerous goods declaration", "Crew list"],
    services: ["Mega vessel handling", "Bunker", "Cold chain", "Rail/barge connection", "Stores", "Waste reception"],
    risks: ["Typhoon closure", "High terminal density", "Customs cut-off pressure"],
    costs: { pilotage: 10400, tug: 18100, berth: 29600, portDues: 16400 },
    productivity: "145 moves/hour",
    note: "Best for Asia mainline container operations; weather windows matter in typhoon season."
  },
  busan: {
    name: "Busan New Port",
    country: "South Korea",
    type: "Container transshipment hub",
    depth: "17 m",
    pilotage: "Compulsory",
    berth: "23 container berths",
    cranes: "Post-panamax STS cranes",
    fuel: "VLSFO, MGO, LNG by arrangement",
    weather: "Winter wind / typhoon watch",
    vhf: "VHF 12 / 16",
    documents: ["Korea customs declaration", "Cargo manifest", "Port entry report", "ISPS declaration"],
    services: ["Transshipment", "Bunker", "Ship supply", "Repair", "Crew change", "Reefer support"],
    risks: ["Berth window pressure", "Winter swell", "Terminal cut-off"],
    costs: { pilotage: 8900, tug: 15100, berth: 22400, portDues: 11800 },
    productivity: "118 moves/hour",
    note: "Strong transshipment port for North Asia loops."
  },
  jebelali: {
    name: "Jebel Ali",
    country: "United Arab Emirates",
    type: "Container, Ro-Ro, project cargo",
    depth: "17 m",
    pilotage: "Compulsory",
    berth: "67+ berths",
    cranes: "STS, mobile, heavy lift",
    fuel: "VLSFO, MGO",
    weather: "Heat and dust visibility watch",
    vhf: "VHF 13 / 16",
    documents: ["Dubai trade documents", "Cargo manifest", "Delivery order", "Dangerous goods note"],
    services: ["Free zone logistics", "Bunker", "Project cargo", "Warehousing", "Repair", "Crew services"],
    risks: ["Heat stress", "Gate congestion", "Documentation cut-off"],
    costs: { pilotage: 7600, tug: 14200, berth: 21200, portDues: 10800 },
    productivity: "105 moves/hour",
    note: "Excellent Middle East hub with strong logistics and free-zone connectivity."
  },
  losangeles: {
    name: "Los Angeles / Long Beach",
    country: "United States",
    type: "Container, breakbulk, Ro-Ro",
    depth: "16 m",
    pilotage: "Compulsory",
    berth: "Multiple container terminals",
    cranes: "Super-post-panamax STS cranes",
    fuel: "VLSFO, MGO, shore power",
    weather: "Fog watch",
    vhf: "VHF 14 / 16",
    documents: ["CBP manifest", "AMS filing", "ISF", "EPA / waste notice"],
    services: ["Shore power", "Rail intermodal", "Bunker", "Cold chain", "Truck gates", "Repair"],
    risks: ["Labor disruption", "Truck/rail congestion", "Emissions compliance"],
    costs: { pilotage: 12500, tug: 22100, berth: 31800, portDues: 18600 },
    productivity: "92 moves/hour",
    note: "Key US West Coast gateway; inland rail and appointment windows drive schedule risk."
  },
  antwerp: {
    name: "Antwerp-Bruges",
    country: "Belgium",
    type: "Container, chemical tanker, breakbulk",
    depth: "16 m",
    pilotage: "Compulsory",
    berth: "Container and petrochemical terminals",
    cranes: "STS cranes, liquid cargo arms",
    fuel: "VLSFO, MGO, LNG, methanol trials",
    weather: "River/tidal planning",
    vhf: "VHF 12 / 16",
    documents: ["EU customs", "Port community filing", "Waste notification", "Safety checklist"],
    services: ["Petrochemical logistics", "Bunker", "Rail/barge", "Repair", "Cold ironing", "Warehousing"],
    risks: ["Lock schedule", "Tidal windows", "Inland congestion"],
    costs: { pilotage: 10300, tug: 16700, berth: 24700, portDues: 13900 },
    productivity: "100 moves/hour",
    note: "Strong European gateway for containers and chemicals."
  },
  hamburg: {
    name: "Hamburg",
    country: "Germany",
    type: "Container, project cargo, bulk",
    depth: "14.5 m tidal",
    pilotage: "Compulsory",
    berth: "Elbe river terminals",
    cranes: "STS cranes, heavy lift",
    fuel: "VLSFO, MGO, shore power",
    weather: "Fog and river level watch",
    vhf: "VHF 74 / 16",
    documents: ["EU customs", "Port order", "Waste declaration", "Cargo manifest"],
    services: ["Rail hub", "Barge", "Bunker", "Heavy lift", "Repair", "Cold chain"],
    risks: ["Tidal draft window", "River traffic", "Fog delay"],
    costs: { pilotage: 9600, tug: 15800, berth: 23100, portDues: 12600 },
    productivity: "88 moves/hour",
    note: "High inland connectivity, but Elbe tide planning is important."
  },
  piraeus: {
    name: "Piraeus",
    country: "Greece",
    type: "Container, ferry, cruise",
    depth: "18 m",
    pilotage: "Compulsory for large vessels",
    berth: "Container piers and passenger terminals",
    cranes: "STS cranes, Ro-Ro ramps",
    fuel: "VLSFO, MGO",
    weather: "Meltemi wind watch",
    vhf: "VHF 12 / 16",
    documents: ["EU customs", "Passenger/crew list", "Cargo manifest", "Port clearance"],
    services: ["Transshipment", "Ferry links", "Bunker", "Stores", "Repair", "Cruise support"],
    risks: ["Strong wind", "Ferry traffic", "Peak season berth pressure"],
    costs: { pilotage: 7100, tug: 13200, berth: 19800, portDues: 9700 },
    productivity: "82 moves/hour",
    note: "Strategic Eastern Mediterranean transshipment and passenger hub."
  },
  santos: {
    name: "Santos",
    country: "Brazil",
    type: "Container, sugar, coffee, bulk",
    depth: "15 m",
    pilotage: "Compulsory",
    berth: "Container and bulk terminals",
    cranes: "STS cranes, grabs, conveyors",
    fuel: "Available",
    weather: "Rain delay watch",
    vhf: "VHF 16 / local port channel",
    documents: ["Brazil customs", "Cargo manifest", "Phytosanitary documents", "Port clearance"],
    services: ["Bulk loading", "Container terminal", "Bunker", "Truck/rail", "Warehousing", "Survey"],
    risks: ["Channel draft", "Rain stoppage", "Truck queue"],
    costs: { pilotage: 9200, tug: 16400, berth: 21900, portDues: 12100 },
    productivity: "64 moves/hour",
    note: "Major South American export gateway; weather and truck gates affect ETD."
  },
  capetown: {
    name: "Cape Town",
    country: "South Africa",
    type: "Container, reefer, offshore support",
    depth: "15.9 m",
    pilotage: "Compulsory",
    berth: "Container and repair berths",
    cranes: "STS cranes, mobile cranes",
    fuel: "VLSFO, MGO",
    weather: "South Atlantic swell / wind watch",
    vhf: "VHF 14 / 16",
    documents: ["Customs declaration", "Cargo manifest", "Health declaration", "Port clearance"],
    services: ["Reefer cargo", "Bunker", "Ship repair", "Offshore support", "Fresh water", "Stores"],
    risks: ["Strong wind", "Swell delay", "Berth congestion"],
    costs: { pilotage: 7900, tug: 14500, berth: 20500, portDues: 10400 },
    productivity: "58 moves/hour",
    note: "Useful South Atlantic call with weather-sensitive berth operations."
  },
  ningbo: {
    name: "Ningbo-Zhoushan",
    country: "China",
    type: "Container, dry bulk, tanker",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Deep-water container, ore and liquid bulk terminals",
    cranes: "Mega STS cranes, grabs, conveyors, liquid cargo arms",
    fuel: "VLSFO, MGO by arrangement",
    weather: "Typhoon and fog watch",
    vhf: "VHF 09 / 16",
    documents: ["China customs manifest", "Dangerous goods declaration", "Crew list", "Port entry report"],
    services: ["Container terminal", "Ore handling", "Liquid bulk", "Bunker", "Reefer plugs", "Rail/barge connection"],
    risks: ["Typhoon closure", "Channel traffic density", "Terminal cut-off pressure"],
    costs: { pilotage: 10600, tug: 18400, berth: 30200, portDues: 16800 },
    productivity: "138 moves/hour",
    note: "Major China gateway for containers and bulk; weather windows should be watched in typhoon season."
  },
  qingdao: {
    name: "Qingdao",
    country: "China",
    type: "Container, reefer, dry bulk",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Container, ore and general cargo terminals",
    cranes: "STS cranes, bulk unloaders, cold chain yard",
    fuel: "VLSFO, MGO",
    weather: "Fog / winter wind watch",
    vhf: "VHF 10 / 16",
    documents: ["China customs manifest", "Cargo declaration", "Crew list", "ISPS declaration"],
    services: ["Container handling", "Reefer cargo", "Bulk discharge", "Bunker", "Stores", "Rail connection"],
    risks: ["Fog delay", "Cold chain cut-off", "Terminal schedule density"],
    costs: { pilotage: 9400, tug: 16600, berth: 24500, portDues: 13300 },
    productivity: "112 moves/hour",
    note: "Strong North China gateway with good reefer and container coverage."
  },
  portklang: {
    name: "Port Klang",
    country: "Malaysia",
    type: "Container, bulk, regional transshipment",
    depth: "17 m",
    pilotage: "Compulsory",
    berth: "Northport and Westports terminals",
    cranes: "Post-panamax STS cranes, mobile harbor cranes",
    fuel: "VLSFO, MGO by arrangement",
    weather: "Monsoon squall watch",
    vhf: "VHF 12 / 16",
    documents: ["Malaysia customs declaration", "Cargo manifest", "Dangerous goods note", "Port clearance"],
    services: ["Transshipment", "Bunker", "Warehouse", "Reefer support", "Feeder links", "Truck gate"],
    risks: ["Monsoon rain delay", "Feeder connection pressure", "Gate congestion"],
    costs: { pilotage: 6900, tug: 12800, berth: 19800, portDues: 9600 },
    productivity: "86 moves/hour",
    note: "Useful Southeast Asia hub for feeder networks and regional cargo consolidation."
  },
  colombo: {
    name: "Colombo",
    country: "Sri Lanka",
    type: "Container transshipment, feeder hub",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Deep-water container terminals",
    cranes: "STS cranes, automated yard support",
    fuel: "VLSFO, MGO",
    weather: "Monsoon swell watch",
    vhf: "VHF 12 / 16",
    documents: ["Pre-arrival notice", "Cargo manifest", "Crew list", "Port clearance"],
    services: ["Transshipment", "Bunker", "Crew change", "Stores", "Reefer support", "Feeder connection"],
    risks: ["Monsoon swell", "Connection window pressure", "Berth congestion"],
    costs: { pilotage: 7200, tug: 13600, berth: 21000, portDues: 10100 },
    productivity: "94 moves/hour",
    note: "Indian Ocean transshipment hub; connection timing and swell conditions drive schedule risk."
  },
  nhavasheva: {
    name: "Nhava Sheva / JNPT",
    country: "India",
    type: "Container, coastal feeder, logistics hub",
    depth: "15 m",
    pilotage: "Compulsory",
    berth: "Container terminals and logistics park links",
    cranes: "STS cranes, RTG yard, rail interface",
    fuel: "Available by arrangement",
    weather: "Monsoon rain watch",
    vhf: "VHF 12 / 16",
    documents: ["India customs filing", "Import/export manifest", "Port clearance", "Crew list"],
    services: ["Container terminal", "Rail ICD link", "Bunker", "Customs", "Warehousing", "Reefer support"],
    risks: ["Monsoon delay", "Truck/rail queue", "Documentation cut-off"],
    costs: { pilotage: 7600, tug: 13900, berth: 20600, portDues: 11200 },
    productivity: "72 moves/hour",
    note: "Main container gateway for Mumbai region; inland connection and monsoon timing matter."
  },
  felixstowe: {
    name: "Felixstowe",
    country: "United Kingdom",
    type: "Deep sea container, Ro-Ro support",
    depth: "16 m",
    pilotage: "Compulsory for large vessels",
    berth: "Deep-water container berths",
    cranes: "Ship-to-shore cranes, automated gate support",
    fuel: "VLSFO, MGO by arrangement",
    weather: "North Sea wind / fog watch",
    vhf: "VHF 12 / 16",
    documents: ["UK customs entry", "ENS / import declaration", "Cargo manifest", "Port clearance"],
    services: ["Container terminal", "Rail intermodal", "Bunker", "Truck gate", "Reefer support", "Customs"],
    risks: ["North Sea weather", "Rail/truck peak", "Customs cut-off"],
    costs: { pilotage: 10100, tug: 16900, berth: 24800, portDues: 14300 },
    productivity: "86 moves/hour",
    note: "Major UK container gateway; inland appointments and North Sea weather should be planned."
  },
  valencia: {
    name: "Valencia",
    country: "Spain",
    type: "Container, Ro-Ro, reefer",
    depth: "17 m",
    pilotage: "Compulsory",
    berth: "Container and Ro-Ro terminals",
    cranes: "STS cranes, Ro-Ro ramps, reefer yard",
    fuel: "VLSFO, MGO",
    weather: "Mediterranean wind watch",
    vhf: "VHF 13 / 16",
    documents: ["EU customs", "Cargo manifest", "Dangerous goods note", "Port clearance"],
    services: ["Container terminal", "Ro-Ro", "Reefer cargo", "Rail", "Bunker", "Warehousing"],
    risks: ["Yard density", "Gate appointment pressure", "Seasonal wind"],
    costs: { pilotage: 8300, tug: 14900, berth: 21800, portDues: 11900 },
    productivity: "90 moves/hour",
    note: "Strong Western Mediterranean gateway with container and Ro-Ro coverage."
  },
  algeciras: {
    name: "Algeciras",
    country: "Spain",
    type: "Container transshipment, bunker, Strait gateway",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Deep-water container and bunker berths",
    cranes: "Mega STS cranes, bunker barges",
    fuel: "VLSFO, MGO, bunkering hub",
    weather: "Strait wind and traffic watch",
    vhf: "VHF 12 / 16",
    documents: ["EU customs", "Bunker delivery note", "Cargo manifest", "Port clearance"],
    services: ["Transshipment", "Bunker", "Crew change", "Stores", "Feeder links", "Repair"],
    risks: ["Strait traffic", "Levante wind", "Connection pressure"],
    costs: { pilotage: 8200, tug: 15100, berth: 22400, portDues: 12100 },
    productivity: "98 moves/hour",
    note: "Strategic Strait of Gibraltar call; useful for transshipment and bunker planning."
  },
  tangermed: {
    name: "Tanger Med",
    country: "Morocco",
    type: "Container, Ro-Ro, transshipment",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Container and Ro-Ro terminals",
    cranes: "STS cranes, Ro-Ro ramps, logistics zone equipment",
    fuel: "Available by arrangement",
    weather: "Strait wind watch",
    vhf: "VHF 12 / 16",
    documents: ["Cargo manifest", "Customs declaration", "Port clearance", "Crew list"],
    services: ["Transshipment", "Ro-Ro", "Logistics zone", "Bunker", "Truck gate", "Feeder links"],
    risks: ["Strait weather", "Connection window", "Gate congestion"],
    costs: { pilotage: 6400, tug: 12100, berth: 18800, portDues: 9100 },
    productivity: "92 moves/hour",
    note: "Fast-growing hub for West Med, Atlantic and Africa-Europe cargo flows."
  },
  yokohama: {
    name: "Yokohama",
    country: "Japan",
    type: "Container, Ro-Ro, automotive",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Container and car carrier terminals",
    cranes: "STS cranes, Ro-Ro ramps, reefer support",
    fuel: "VLSFO, MGO",
    weather: "Typhoon season watch",
    vhf: "VHF 12 / 16",
    documents: ["Japan customs", "Cargo manifest", "Port entry report", "Crew list"],
    services: ["Container handling", "Automotive Ro-Ro", "Bunker", "Stores", "Repair", "Cold chain"],
    risks: ["Typhoon closure", "Berth window pressure", "Strict documentation"],
    costs: { pilotage: 9700, tug: 17100, berth: 24600, portDues: 13700 },
    productivity: "84 moves/hour",
    note: "Key Tokyo Bay port for containers and automotive cargo."
  },
  kaohsiung: {
    name: "Kaohsiung",
    country: "Taiwan",
    type: "Container, breakbulk, regional hub",
    depth: "16 m",
    pilotage: "Compulsory",
    berth: "Container and multipurpose terminals",
    cranes: "STS cranes, mobile harbor cranes",
    fuel: "VLSFO, MGO",
    weather: "Typhoon watch",
    vhf: "VHF 12 / 16",
    documents: ["Customs declaration", "Cargo manifest", "Dangerous goods note", "Port clearance"],
    services: ["Container terminal", "Transshipment", "Bunker", "Stores", "Reefer support", "Repair"],
    risks: ["Typhoon closure", "Terminal density", "Feeder connection pressure"],
    costs: { pilotage: 8100, tug: 14700, berth: 21500, portDues: 10900 },
    productivity: "88 moves/hour",
    note: "Important Taiwan container hub with weather-sensitive summer operations."
  },
  newyork: {
    name: "New York / New Jersey",
    country: "United States",
    type: "Container, Ro-Ro, reefer",
    depth: "15 m",
    pilotage: "Compulsory",
    berth: "Container, Ro-Ro and breakbulk terminals",
    cranes: "Super-post-panamax STS cranes, Ro-Ro ramps",
    fuel: "VLSFO, MGO, shore power by terminal",
    weather: "Winter storm / fog watch",
    vhf: "VHF 13 / 16",
    documents: ["CBP manifest", "AMS filing", "ISF", "EPA / waste notice"],
    services: ["Container terminal", "Rail intermodal", "Reefer cargo", "Ro-Ro", "Bunker", "Customs"],
    risks: ["Air draft / channel planning", "Truck gate congestion", "Winter disruption"],
    costs: { pilotage: 13200, tug: 23600, berth: 34200, portDues: 19800 },
    productivity: "82 moves/hour",
    note: "US East Coast gateway; bridge, channel and inland logistics should be checked early."
  },
  savannah: {
    name: "Savannah",
    country: "United States",
    type: "Container, Ro-Ro, project cargo",
    depth: "14 m",
    pilotage: "Compulsory",
    berth: "Container and Ro-Ro terminals",
    cranes: "STS cranes, rail-mounted yard cranes",
    fuel: "VLSFO, MGO by arrangement",
    weather: "Hurricane season watch",
    vhf: "VHF 13 / 16",
    documents: ["CBP manifest", "AMS filing", "ISF", "Port clearance"],
    services: ["Container terminal", "Rail intermodal", "Ro-Ro", "Cold chain", "Bunker", "Warehousing"],
    risks: ["River transit window", "Hurricane season", "Rail gate pressure"],
    costs: { pilotage: 11200, tug: 20400, berth: 29800, portDues: 16700 },
    productivity: "88 moves/hour",
    note: "High-volume US Southeast container gateway with strong inland rail connections."
  },
  houston: {
    name: "Houston",
    country: "United States",
    type: "Container, tanker, project cargo",
    depth: "14 m",
    pilotage: "Compulsory",
    berth: "Container, liquid bulk and project cargo terminals",
    cranes: "STS cranes, liquid cargo arms, heavy lift cranes",
    fuel: "VLSFO, MGO, barge supply",
    weather: "Gulf thunderstorm / hurricane watch",
    vhf: "VHF 11 / 16",
    documents: ["CBP manifest", "AMS filing", "Dangerous goods declaration", "Port clearance"],
    services: ["Liquid bulk", "Container terminal", "Project cargo", "Bunker", "Repair", "Agency services"],
    risks: ["Channel traffic", "Hurricane season", "Chemical/tanker documentation"],
    costs: { pilotage: 12100, tug: 22600, berth: 32100, portDues: 18200 },
    productivity: "76 moves/hour",
    note: "Important US Gulf port for energy, chemicals, containers and project cargo."
  },
  vancouver: {
    name: "Vancouver",
    country: "Canada",
    type: "Container, grain, coal, bulk",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Container, grain, coal and multipurpose terminals",
    cranes: "STS cranes, grain loaders, bulk conveyors",
    fuel: "VLSFO, MGO by arrangement",
    weather: "Fog / Pacific storm watch",
    vhf: "VHF 12 / 16",
    documents: ["Canada customs", "Cargo manifest", "Phytosanitary documents", "Port clearance"],
    services: ["Grain loading", "Container terminal", "Bulk terminal", "Bunker", "Rail connection", "Reefer support"],
    risks: ["Rail congestion", "Fog delay", "Weather berth interruption"],
    costs: { pilotage: 11800, tug: 21700, berth: 30900, portDues: 17600 },
    productivity: "70 moves/hour",
    note: "Pacific Canada gateway for grain, coal, bulk and container trades."
  },
  durban: {
    name: "Durban",
    country: "South Africa",
    type: "Container, bulk, automotive",
    depth: "16 m",
    pilotage: "Compulsory",
    berth: "Container, automotive and multipurpose terminals",
    cranes: "STS cranes, Ro-Ro ramps, mobile cranes",
    fuel: "VLSFO, MGO",
    weather: "Indian Ocean swell watch",
    vhf: "VHF 12 / 16",
    documents: ["Customs declaration", "Cargo manifest", "Health declaration", "Port clearance"],
    services: ["Container terminal", "Automotive Ro-Ro", "Bunker", "Ship repair", "Rail/truck link", "Stores"],
    risks: ["Berth congestion", "Swell delay", "Truck queue"],
    costs: { pilotage: 8500, tug: 15300, berth: 22500, portDues: 11300 },
    productivity: "62 moves/hour",
    note: "Major Southern Africa gateway; queue and weather risk need active monitoring."
  },
  richardsbay: {
    name: "Richards Bay",
    country: "South Africa",
    type: "Coal, dry bulk, heavy minerals",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Bulk and coal export terminals",
    cranes: "Conveyors, shiploaders, grabs",
    fuel: "Limited / by arrangement",
    weather: "Swell and wind watch",
    vhf: "VHF 12 / 16",
    documents: ["Bulk cargo declaration", "Cargo manifest", "Draft survey", "Port clearance"],
    services: ["Coal loading", "Bulk terminal", "Survey", "Agency", "Fresh water", "Stores"],
    risks: ["Cargo moisture", "Draft survey dispute", "Weather interruption"],
    costs: { pilotage: 7700, tug: 14100, berth: 21400, portDues: 10700 },
    productivity: "95,000 mt/day coal",
    note: "Bulk export specialist; draft survey and cargo moisture documentation are critical."
  },
  alexandria: {
    name: "Alexandria",
    country: "Egypt",
    type: "Container, general cargo, grain",
    depth: "14 m",
    pilotage: "Compulsory",
    berth: "Container, grain and general cargo berths",
    cranes: "STS cranes, grabs, mobile cranes",
    fuel: "VLSFO, MGO by arrangement",
    weather: "Mediterranean swell watch",
    vhf: "VHF 12 / 16",
    documents: ["Egypt customs", "Cargo manifest", "Health declaration", "Port clearance"],
    services: ["Container terminal", "Grain discharge", "Bunker", "Agency", "Warehousing", "Survey"],
    risks: ["Berth congestion", "Documentation queue", "Swell delay"],
    costs: { pilotage: 7200, tug: 13400, berth: 20100, portDues: 9800 },
    productivity: "52 moves/hour",
    note: "North Africa gateway with mixed cargo operations and documentation-sensitive port calls."
  },
  portsaid: {
    name: "Port Said",
    country: "Egypt",
    type: "Container, Suez Canal gateway, transshipment",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Container terminals and canal-related services",
    cranes: "STS cranes, feeder handling, service craft",
    fuel: "Available by arrangement",
    weather: "Canal convoy / wind watch",
    vhf: "VHF 12 / 16",
    documents: ["Canal transit documents", "Cargo manifest", "Crew list", "Port clearance"],
    services: ["Transshipment", "Canal support", "Bunker", "Crew change", "Stores", "Agency"],
    risks: ["Convoy timing", "Canal disruption", "Connection window pressure"],
    costs: { pilotage: 8200, tug: 15100, berth: 22800, portDues: 12400 },
    productivity: "88 moves/hour",
    note: "Useful for Suez-linked routing, transshipment and canal schedule monitoring."
  },
  sohar: {
    name: "Sohar",
    country: "Oman",
    type: "Container, bulk, liquid bulk, industrial",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Container, dry bulk and liquid bulk berths",
    cranes: "STS cranes, grabs, liquid cargo arms",
    fuel: "VLSFO, MGO by arrangement",
    weather: "Heat / dust visibility watch",
    vhf: "VHF 12 / 16",
    documents: ["Cargo manifest", "Customs declaration", "Dangerous goods note", "Port clearance"],
    services: ["Industrial logistics", "Container terminal", "Bulk handling", "Liquid bulk", "Bunker", "Warehousing"],
    risks: ["Heat stress", "Industrial cargo documentation", "Dust visibility"],
    costs: { pilotage: 6900, tug: 13100, berth: 19700, portDues: 9400 },
    productivity: "68 moves/hour",
    note: "Industrial port with flexible container, bulk and liquid cargo capability."
  },
  khalifa: {
    name: "Khalifa Port Abu Dhabi",
    country: "United Arab Emirates",
    type: "Container, industrial, Ro-Ro",
    depth: "16 m",
    pilotage: "Compulsory",
    berth: "Container and industrial terminals",
    cranes: "Automated STS cranes, Ro-Ro ramps",
    fuel: "VLSFO, MGO by arrangement",
    weather: "Heat and dust visibility watch",
    vhf: "VHF 12 / 16",
    documents: ["UAE customs filing", "Cargo manifest", "Dangerous goods note", "Port clearance"],
    services: ["Container terminal", "Industrial zone", "Ro-Ro", "Bunker", "Warehousing", "Truck gate"],
    risks: ["Gate cut-off", "Heat stress", "Industrial cargo permits"],
    costs: { pilotage: 7200, tug: 13600, berth: 20500, portDues: 10100 },
    productivity: "96 moves/hour",
    note: "Modern UAE gateway with strong industrial-zone connectivity."
  },
  kingabdullah: {
    name: "King Abdullah Port",
    country: "Saudi Arabia",
    type: "Container, Ro-Ro, Red Sea gateway",
    depth: "18 m",
    pilotage: "Compulsory",
    berth: "Deep-water container and Ro-Ro berths",
    cranes: "STS cranes, Ro-Ro ramps, yard automation",
    fuel: "Available by arrangement",
    weather: "Red Sea wind / heat watch",
    vhf: "VHF 12 / 16",
    documents: ["Saudi customs", "Cargo manifest", "Delivery order", "Port clearance"],
    services: ["Container terminal", "Ro-Ro", "Logistics zone", "Bunker", "Warehousing", "Truck gate"],
    risks: ["Customs cut-off", "Heat stress", "Red Sea route disruption"],
    costs: { pilotage: 7600, tug: 14300, berth: 21600, portDues: 10800 },
    productivity: "100 moves/hour",
    note: "Red Sea container gateway with modern terminal operations and logistics-zone access."
  }
};

const lessons = {
  Laytime: "Laytime dersi: NOR, allowed time, used time, demurrage/dispatch örnekleri. Mini quiz: 10 soru.",
  "Charter Party": "Charter Party dersi: fixture recap, clauses, laycan, freight, demurrage ve owner/charterer sorumlulukları.",
  COLREGS: "COLREGS dersi: crossing, head-on, overtaking, restricted visibility ve radar kararları.",
  Stability: "Stability dersi: GM, trim, list, free surface effect ve cargo distribution.",
  "Cargo Planning": "Cargo Planning dersi: bay plan, IMDG segregation, reefer, heavy units and lashing.",
  "Port Operations": "Port Operations dersi: pilotage, towage, berth plan, documents, port call cost and waiting risk."
};

const lessonQuizzes = {
  Laytime: [
    {
      question: "NOR hangi amaçla verilir?",
      options: ["Geminin yükleme/tahliye için hazır olduğunu bildirmek", "Yakıt fiyatını sabitlemek", "Kaptan değişimini onaylamak"],
      answer: 0,
      explanation: "NOR, geminin hukuken ve fiilen hazır olduğunu bildirir; laytime başlangıcı için kritik kayıttır."
    },
    {
      question: "Allowed laytime aşılırsa genelde hangi kalem doğar?",
      options: ["Dispatch", "Demurrage", "Deadfreight"],
      answer: 1,
      explanation: "İzin verilen süre aşılırsa gecikme bedeli olarak demurrage gündeme gelir."
    },
    {
      question: "Yağmur duruşu laytime hesabında nasıl ele alınır?",
      options: ["Her zaman sayılır", "CP clause'a göre istisna/deduction olabilir", "Sadece kaptan isterse düşülür"],
      answer: 1,
      explanation: "Weather exception veya SHEX/SHINC gibi ifadeler sözleşmeye göre değerlendirilmelidir."
    },
    {
      question: "Laytime genelde hangi olaydan sonra saymaya başlar?",
      options: ["Geçerli NOR verilip CP'deki bekleme süresi dolduktan sonra", "Geminin açık denize çıkmasıyla", "Bunker stem onaylanınca"],
      answer: 0,
      explanation: "Laytime başlangıcı CP'ye bağlıdır; geçerli NOR, readiness ve varsa notice time beraber kontrol edilir."
    },
    {
      question: "Reversible laytime ne demektir?",
      options: ["Sadece yükleme süresinin sayılması", "Yükleme ve tahliye süresinin tek toplam havuz gibi kullanılması", "Laytime'ın her gün sıfırlanması"],
      answer: 1,
      explanation: "Reversible laytime'da load ve discharge süreleri birlikte değerlendirilir; bir tarafta kazanılan süre diğer tarafta kullanılabilir."
    },
    {
      question: "Dispatch hangi durumda gündeme gelir?",
      options: ["Operasyon allowed laytime'dan erken biterse", "Gemi gecikirse", "Cargo quantity artarsa"],
      answer: 0,
      explanation: "Dispatch, CP'de kararlaştırıldıysa tasarruf edilen süre için charterer lehine ödeme doğurabilir."
    },
    {
      question: "SHINC ifadesi neyi anlatır?",
      options: ["Sundays and Holidays Included", "Ship in New Charter", "Safe Harbor Inspection Notice"],
      answer: 0,
      explanation: "SHINC, pazar ve tatil günlerinin laytime hesabına dahil edileceğini ifade eder."
    },
    {
      question: "WIBON clause broker için neden önemlidir?",
      options: ["Geminin rıhtımda olmasa bile NOR verebilmesini etkileyebilir", "Sadece draft hesabını değiştirir", "Crew maaşını belirler"],
      answer: 0,
      explanation: "WIBON, berth bekleme süresinin laytime'a sayılıp sayılmayacağı tartışmasında kritik olabilir."
    },
    {
      question: "Demurrage claim time bar ne demektir?",
      options: ["Geminin maksimum hızı", "Claim dokümanlarının belirli süre içinde sunulması şartı", "Limanın gece çalışma limiti"],
      answer: 1,
      explanation: "Time bar kaçırılırsa güçlü bir demurrage claim bile sözleşmesel olarak reddedilebilir."
    },
    {
      question: "Statement of Facts hangi işe yarar?",
      options: ["Operasyon olaylarını zaman sırasıyla kanıtlamak", "Freight rate'i otomatik artırmak", "Bayrak sicilini değiştirmek"],
      answer: 0,
      explanation: "SOF; NOR, berthing, start/stop, completion ve gecikme olaylarını laytime hesabına temel olacak şekilde gösterir."
    }
  ],
  "Charter Party": [
    {
      question: "Fixture recap'te en kritik ticari alanlardan biri hangisidir?",
      options: ["Freight, demurrage ve laycan", "Geminin boya rengi", "Personel yemek listesi"],
      answer: 0,
      explanation: "Freight, laycan, demurrage, commission ve subjects ticari riskin ana parçalarıdır."
    },
    {
      question: "Subjects ne anlama gelir?",
      options: ["Teklifin bazı onaylara bağlı olması", "Geminin limana girmiş olması", "Yükün boşaltılmış olması"],
      answer: 0,
      explanation: "Subjects kalkmadan fixture genelde tam bağlayıcı hale gelmez."
    },
    {
      question: "NOR clause neden dikkat ister?",
      options: ["Laytime'ın ne zaman başlayacağını etkiler", "Sadece gemi adını değiştirir", "Yakıt tipini otomatik seçer"],
      answer: 0,
      explanation: "WIBON/WIPON/time lost waiting gibi ifadeler bekleme süresini kimin taşıyacağını değiştirebilir."
    },
    {
      question: "Laycan neyi ifade eder?",
      options: ["Geminin yükleme için kabul edilebilir varış penceresini", "Geminin yıllık sigorta bedelini", "Yükün paketleme ölçüsünü"],
      answer: 0,
      explanation: "Laycan, laydays/cancelling penceresidir; geç kalma cancellation ve ticari risk yaratabilir."
    },
    {
      question: "Deadfreight hangi durumda doğabilir?",
      options: ["Charterer taahhüt edilen yük miktarını sağlayamazsa", "Owner gemiyi boyatırsa", "Broker komisyonu düşerse"],
      answer: 0,
      explanation: "Eksik yükleme nedeniyle geminin boş kapasitesi kalırsa CP'ye göre deadfreight talebi gündeme gelebilir."
    },
    {
      question: "Brokerage commission genelde ne üzerinden hesaplanır?",
      options: ["Freight/hire gibi ticari gelir üzerinden", "Geminin yaşına göre", "Kaptanın sertifikasına göre"],
      answer: 0,
      explanation: "Komisyon çoğunlukla freight, hire veya demurrage gibi kararlaştırılmış gelir kalemlerinden hesaplanır."
    },
    {
      question: "Safe port warranty neyi hedefler?",
      options: ["Limanın gemi için emniyetli olmasını", "Freight'in peşin ödenmesini", "Yükün mutlaka konteyner olmasını"],
      answer: 0,
      explanation: "Safe port/berth yükümlülüğü, geminin limana girip çıkarken olağan dikkatle emniyette kalabilmesiyle ilgilidir."
    },
    {
      question: "Off-hire clause daha çok hangi sözleşmede önemlidir?",
      options: ["Time charter", "Sale contract", "Crew list"],
      answer: 0,
      explanation: "Time charter'da gemi charterer hizmetinde kullanılamadığında hire'ın durup durmayacağı off-hire clause ile okunur."
    },
    {
      question: "Lien clause owner'a hangi imkanı verebilir?",
      options: ["Ödenmeyen freight/hire için yük veya alt gelir üzerinde hak iddiası", "Geminin bayrağını değiştirme", "Laycan'ı otomatik uzatma"],
      answer: 0,
      explanation: "Lien, ödeme güvenliği için owner lehine önemli bir sözleşmesel koruma olabilir."
    },
    {
      question: "Recap kontrolünde broker ilk neyi aramalı?",
      options: ["Eksik ticari şart ve çelişkili clause olup olmadığını", "Logo rengini", "Geminin sosyal medya hesabını"],
      answer: 0,
      explanation: "Vessel, cargo, ports, laycan, freight, demurrage, commission, subjects ve law/arbitration net olmalıdır."
    }
  ],
  COLREGS: [
    {
      question: "Karşıdan karşıya geçişte diğer gemi senin sancak tarafındaysa genelde ne olursun?",
      options: ["Give-way vessel", "Stand-on vessel", "Not under command"],
      answer: 0,
      explanation: "Sancak taraftaki gemiye yol vermek için erken ve belirgin manevra gerekir."
    },
    {
      question: "Head-on durumda güvenli genel hareket nedir?",
      options: ["Her iki geminin de sancağa dönmesi", "İkisi de iskeleye dönmesi", "Hız artırılması"],
      answer: 0,
      explanation: "Head-on riskinde her iki gemi de sancağa alarak iskele-iskele geçiş sağlar."
    },
    {
      question: "Radar plot ne için kullanılır?",
      options: ["CPA/TCPA ve çarpışma riskini okumak", "Yakıt kalitesini ölçmek", "Cargo manifest hazırlamak"],
      answer: 0,
      explanation: "CPA/TCPA, hedefle en yakın yaklaşma mesafesi ve zamanını gösterir."
    },
    {
      question: "Stand-on vessel ne yapmalıdır?",
      options: ["Rotasını ve hızını korumalı, gerekirse emniyet için müdahale etmeli", "Her zaman tam yol ileri gitmeli", "AIS'i kapatmalı"],
      answer: 0,
      explanation: "Stand-on vessel kural olarak course/speed korur; çarpışma riski sürerse uygun manevra yapma sorumluluğu devam eder."
    },
    {
      question: "Overtaking durumda kim yol vermelidir?",
      options: ["Arkadan yetişen/overtaking gemi", "Öndeki gemi", "Her zaman küçük tonajlı gemi"],
      answer: 0,
      explanation: "Arkadan yetişen gemi, geçilen gemiden neta kalacak şekilde manevra yapmakla yükümlüdür."
    },
    {
      question: "Restricted visibility'de hangi araç özellikle önem kazanır?",
      options: ["Radar ve uygun gözcülük", "Sadece siren listesi", "Cargo planı"],
      answer: 0,
      explanation: "Kısıtlı görüşte radar, güvenli hız, ses işaretleri ve etkin lookout beraber yürütülmelidir."
    },
    {
      question: "CPA çok küçük ve TCPA kısa ise ne anlaşılır?",
      options: ["Yakın çarpışma riski olabilir", "Bunker kalitesi iyidir", "Liman masrafı düşmüştür"],
      answer: 0,
      explanation: "Küçük CPA ve kısa TCPA erken, belirgin ve COLREGS'e uygun manevra ihtiyacını gösterir."
    },
    {
      question: "Traffic Separation Scheme içinde genel prensip nedir?",
      options: ["Şerit akış yönüne uymak ve mümkünse dik açıyla geçmek", "Şerit içinde demirlemek", "Ters yönde seyretmek"],
      answer: 0,
      explanation: "TSS içinde şerit düzenine uyulur; karşıya geçiş mümkün olduğunca dik açıya yakın yapılır."
    },
    {
      question: "Dar kanalda küçük tekne hangi geminin geçişini engellememelidir?",
      options: ["Sadece kanal içinde güvenle seyredebilen büyük geminin", "Her zaman balıkçı teknesinin", "Sadece boş geminin"],
      answer: 0,
      explanation: "Narrow channel kuralları, kanal içinde kısıtlı manevra alanı olan gemilerin emniyetli geçişini korur."
    },
    {
      question: "COLREGS'te iyi gözcülük neyi kapsar?",
      options: ["Görsel, işitsel ve mevcut tüm uygun araçlarla takip", "Sadece AIS ekranı", "Sadece vardiya defteri"],
      answer: 0,
      explanation: "Lookout; görsel, işitsel, radar/AIS gibi uygun tüm araçlarla durum farkındalığı sağlamaktır."
    }
  ],
  Stability: [
    {
      question: "GM neyi gösterir?",
      options: ["Başlangıç stabilitesini", "Bunker fiyatını", "Liman masrafını"],
      answer: 0,
      explanation: "GM, geminin ilk yatma hareketlerine karşı stabilite karakterini gösteren temel değerdir."
    },
    {
      question: "Free surface effect genelde ne yapar?",
      options: ["Stabiliteyi azaltır", "Draftı sıfırlar", "Demurrage'ı artırır"],
      answer: 0,
      explanation: "Sıvının serbest yüzey hareketi sanal GM kaybı yaratabilir."
    },
    {
      question: "Trim hesabı hangi farkla ilgilidir?",
      options: ["Baş ve kıç draft farkı", "Freight ve hire farkı", "Laycan ve ETA farkı"],
      answer: 0,
      explanation: "Trim, forward ve aft draft farkıyla okunur."
    },
    {
      question: "List neyi ifade eder?",
      options: ["Geminin sancak veya iskeleye yatmasını", "Geminin hız kaybını", "Kargo navlun oranını"],
      answer: 0,
      explanation: "List, geminin enine yönde kalıcı yatmasıdır; yük dağılımı, ballast veya sıvı hareketiyle oluşabilir."
    },
    {
      question: "Yük ağırlık merkezi yükselirse stabilite genelde nasıl etkilenir?",
      options: ["Azalır", "Her zaman artar", "Değişmez"],
      answer: 0,
      explanation: "KG yükseldikçe GM azalabilir; bu da geminin ilk stabilitesini zayıflatabilir."
    },
    {
      question: "Ballast operasyonu neden dikkat ister?",
      options: ["Draft, trim, stress ve stabiliteyi etkiler", "Sadece gemi adını değiştirir", "Freight'i otomatik artırır"],
      answer: 0,
      explanation: "Ballast planı geminin emniyetli draft/trim/stress sınırlarında kalması için kritiktir."
    },
    {
      question: "Free surface effect hangi durumda artar?",
      options: ["Tanklar kısmen doluyken", "Tanklar tamamen boşken", "Tanklar tamamen solid doluyken"],
      answer: 0,
      explanation: "Kısmi dolu tanklarda sıvı yüzeyi hareket eder ve sanal stabilite kaybı yaratabilir."
    },
    {
      question: "Bending moment ve shear force hangi alanda kontrol edilir?",
      options: ["Longitudinal strength", "Broker commission", "VHF haberleşmesi"],
      answer: 0,
      explanation: "Yük ve ballast dağılımı gemi boyuna mukavemet limitlerini aşmamalıdır."
    },
    {
      question: "Draft survey hangi amaçla kullanılır?",
      options: ["Yük miktarını draft değişiminden tahmin etmek", "Radar hedefini takip etmek", "Crew sertifikası düzenlemek"],
      answer: 0,
      explanation: "Draft survey, deplasman farkı ve düzeltmelerle yüklenen/boşaltılan miktarı hesaplamaya yarar."
    },
    {
      question: "Stability booklet neden önemlidir?",
      options: ["Geminin izinli yükleme ve stabilite sınırlarını gösterir", "Freight market haberlerini listeler", "Port dues faturasını keser"],
      answer: 0,
      explanation: "Stability booklet ve loading computer, operasyonun gemi limitleri içinde kalmasını sağlar."
    }
  ],
  "Cargo Planning": [
    {
      question: "IMDG cargo planında neye özellikle bakılır?",
      options: ["Segregation ve tehlikeli yük uyumu", "Sadece konteyner rengi", "Crew milliyeti"],
      answer: 0,
      explanation: "Tehlikeli yüklerin ayrımı, sınıfı ve istif lokasyonu kritik güvenlik konusudur."
    },
    {
      question: "Hold cleanliness neden önemlidir?",
      options: ["Yük kontaminasyonu ve claim riskini azaltır", "Gemiyi hızlandırır", "Bunker tüketimini otomatik düşürür"],
      answer: 0,
      explanation: "Özellikle grain, coal, chemicals ve project cargo için temizlik/uygunluk claim riskini etkiler."
    },
    {
      question: "Heavy lift yüklerde ana kontrol nedir?",
      options: ["Crane capacity, lashing ve deck strength", "Sadece ETA", "Sadece bayrak"],
      answer: 0,
      explanation: "Ağır yükte kaldırma kapasitesi, bağlama ve lokal mukavemet planın merkezidir."
    },
    {
      question: "Bulk cargo için hold hazırlığında ne kritik olabilir?",
      options: ["Temizlik, kuru ambar ve önceki yük kalıntısı kontrolü", "Sadece konteyner numarası", "Crew pasaport rengi"],
      answer: 0,
      explanation: "Tahıl, kömür, mineral ve hassas yüklerde ambar kondisyonu claim riskini doğrudan etkiler."
    },
    {
      question: "Reefer konteyner planında hangi bilgi gerekir?",
      options: ["Set temperature ve power plug uygunluğu", "Sadece freight rate", "Sadece demurrage oranı"],
      answer: 0,
      explanation: "Reefer yüklerde sıcaklık, havalandırma ve enerji bağlantısı operasyonun temel kontrolüdür."
    },
    {
      question: "Container bay plan neyi düzenler?",
      options: ["Konteynerlerin gemideki istif pozisyonlarını", "Crew vardiya listesini", "Liman faturasını"],
      answer: 0,
      explanation: "Bay plan; ağırlık, varış limanı, IMDG, reefer ve stabilite dengesiyle hazırlanır."
    },
    {
      question: "Cargo compatibility neyi kontrol eder?",
      options: ["Yükün gemi tipi, tank/ambar ve operasyon şartlarıyla uyumunu", "Logo dosyasının boyutunu", "Sadece AIS sinyalini"],
      answer: 0,
      explanation: "Uygun gemi, coating, hold cleanliness, heating, IMDG ve nem riski birlikte değerlendirilir."
    },
    {
      question: "Moisture content hangi yüklerde kritik claim riski yaratabilir?",
      options: ["Bazı bulk/mineral cargo yüklerinde", "Sadece boş konteynerde", "Sadece passenger baggage'da"],
      answer: 0,
      explanation: "Nem ve TML/flow moisture limit aşımı liquefaction gibi ciddi emniyet riskleri yaratabilir."
    },
    {
      question: "Lashing plan neyi hedefler?",
      options: ["Yükün deniz şartlarında emniyetli sabitlenmesini", "Navlunun peşin ödenmesini", "Pilot saatini değiştirmeyi"],
      answer: 0,
      explanation: "Lashing/securing planı kayma, devrilme ve hasar riskini azaltır."
    },
    {
      question: "Stowage factor broker için neden önemlidir?",
      options: ["Yükün hacim/ağırlık ilişkisiyle gemiye sığıp sığmayacağını gösterir", "Kaptanın rotasını seçer", "Bunker fiyatını belirler"],
      answer: 0,
      explanation: "Stowage factor, deadweight ve cubic capacity uyumunu anlamak için kullanılır."
    }
  ],
  "Port Operations": [
    {
      question: "Pilotage bilgisi broker için neden önemlidir?",
      options: ["ETA, masraf ve operasyon planını etkiler", "Freight birimini değiştirir", "Cargo tipini değiştirir"],
      answer: 0,
      explanation: "Pilot bekleme, zorunluluk ve saat kısıtları port call süresini ve maliyeti etkiler."
    },
    {
      question: "Port congestion hangi sonucu doğurabilir?",
      options: ["Bekleme, laycan riski ve demurrage exposure", "Geminin IMO numarası değişir", "Cargo miktarı otomatik artar"],
      answer: 0,
      explanation: "Yoğun limanlar ETA/ETD gecikmesi, waiting cost ve laytime tartışması yaratabilir."
    },
    {
      question: "Port cost estimate içinde hangisi beklenir?",
      options: ["Pilotage, towage, berth ve port dues", "Crew playlist", "Logo dosyası"],
      answer: 0,
      explanation: "Liman masrafı broker estimate'inde voyage karlılığını doğrudan etkiler."
    },
    {
      question: "Towage hangi durumda önemli maliyet kalemi olur?",
      options: ["Römorkör zorunlu liman manevralarında", "Açık denizde rota çiziminde", "Email konu satırında"],
      answer: 0,
      explanation: "Büyük gemiler, dar limanlar ve yerel kurallar tug kullanımını zorunlu kılabilir."
    },
    {
      question: "Berth productivity neyi etkiler?",
      options: ["Yükleme/tahliye süresi ve ETD'yi", "Geminin IMO numarasını", "Bayrak devletini"],
      answer: 0,
      explanation: "Saatlik hareket/ton verimliliği port stay ve demurrage exposure hesabının ana girdisidir."
    },
    {
      question: "Port documentation eksikliği neye yol açabilir?",
      options: ["Clearance gecikmesi ve operasyon duruşu", "Bunker fiyatının düşmesine", "Draftın artmasına"],
      answer: 0,
      explanation: "Manifest, customs, health, cargo docs ve agency evrakları gecikirse gemi bekleyebilir."
    },
    {
      question: "Tide window hangi operasyonu etkileyebilir?",
      options: ["Draftı yüksek geminin giriş/çıkış zamanını", "Broker komisyon oranını", "Crew sertifika süresini"],
      answer: 0,
      explanation: "Gelgit penceresi özellikle draft kısıtlı limanlarda ETA/ETD planını belirler."
    },
    {
      question: "Port holiday bilgisi neden önemlidir?",
      options: ["Çalışma duruşu, overtime ve laytime hesabını etkileyebilir", "Geminin hızını artırır", "Cargo type'ı değiştirir"],
      answer: 0,
      explanation: "Tatil günleri CP'deki SHINC/SHEX ve local overtime kurallarına göre ticari sonuç doğurabilir."
    },
    {
      question: "Agency appointment ne sağlar?",
      options: ["Yerel liman işlemleri ve koordinasyon için temsilci", "Geminin satışını", "Piyasa endeksinin lisansını"],
      answer: 0,
      explanation: "Agent; berth, pilot, tug, evrak, local charges ve haberleşmeyi koordine eder."
    },
    {
      question: "Waiting at anchorage hangi hesapta kritik olur?",
      options: ["Laytime, demurrage ve voyage days hesabında", "Logo tasarımında", "Crew yemek bütçesinde"],
      answer: 0,
      explanation: "Anchorage beklemesi CP clause'a göre laytime'a sayılabilir ve TCE'yi düşürebilir."
    }
  ]
};

const globalPortSeedText = `
CNSHA|Shanghai Yangshan|China|Asia|Container|15.5
CNNGB|Ningbo-Zhoushan|China|Asia|Container / Bulk|18
CNSZX|Shenzhen|China|Asia|Container|16
CNGGZ|Guangzhou Nansha|China|Asia|Container / Ro-Ro|15
CNTAO|Qingdao|China|Asia|Container / Bulk|18
CNTXG|Tianjin Xingang|China|Asia|Container / Bulk|19
CNXMN|Xiamen|China|Asia|Container|15
HKHKG|Hong Kong|Hong Kong|Asia|Container|15
SGSIN|Singapore|Singapore|Asia|Container / Tanker / LNG|16
KRPUS|Busan New Port|South Korea|Asia|Container|17
JPTYO|Tokyo|Japan|Asia|Container|15
JPYOK|Yokohama|Japan|Asia|Container / Ro-Ro|18
JPUKB|Kobe|Japan|Asia|Container|15
JPNGO|Nagoya|Japan|Asia|Container / Ro-Ro|16
TWKHH|Kaohsiung|Taiwan|Asia|Container|16
MYPKG|Port Klang|Malaysia|Asia|Container|17
MYTPP|Tanjung Pelepas|Malaysia|Asia|Container|18
THLCH|Laem Chabang|Thailand|Asia|Container / Ro-Ro|16
IDTPP|Tanjung Priok Jakarta|Indonesia|Asia|Container|14
PHMNL|Manila|Philippines|Asia|Container|13
VNSGN|Ho Chi Minh Cat Lai|Vietnam|Asia|Container|14
VNHPH|Hai Phong|Vietnam|Asia|Container|14
LKCMB|Colombo|Sri Lanka|Asia|Container|18
INMUN|Mundra|India|Asia|Container / Bulk|17
INNSA|Nhava Sheva / JNPT|India|Asia|Container|15
INMAA|Chennai|India|Asia|Container / Ro-Ro|16
INENR|Ennore / Kamarajar|India|Asia|Bulk / Ro-Ro|16
BDCGP|Chittagong|Bangladesh|Asia|Container / Breakbulk|10
PKKHI|Karachi|Pakistan|Asia|Container / Bulk|13
PKBQM|Port Qasim|Pakistan|Asia|Container / Bulk|13
AEJEA|Jebel Ali|United Arab Emirates|Middle East|Container / Ro-Ro|17
AEKHL|Khalifa Port Abu Dhabi|United Arab Emirates|Middle East|Container / Industrial|16
SADMM|Dammam King Abdulaziz|Saudi Arabia|Middle East|Container|14
SAJUB|Jubail|Saudi Arabia|Middle East|Tanker / Industrial|18
OMSLL|Salalah|Oman|Middle East|Container / Transshipment|18
OMSOH|Sohar|Oman|Middle East|Container / Bulk|18
OMDQM|Duqm|Oman|Middle East|Multipurpose|18
QAHMD|Hamad Port|Qatar|Middle East|Container / Ro-Ro|17
KWSWK|Shuwaikh|Kuwait|Middle East|Container / General cargo|12
BHKBS|Khalifa Bin Salman|Bahrain|Middle East|Container|15
TRIST|Istanbul Port|Turkiye|Turkiye|Container / General cargo / Ro-Ro|14
TRAMR|Ambarli / Kumport|Turkiye|Turkiye|Container / Ro-Ro|16
TRMER|Mersin International Port|Turkiye|Turkiye|Container / Bulk / Ro-Ro|15.5
TRIZM|Izmir Alsancak|Turkiye|Turkiye|Container / General cargo / Cruise|11
TRALI|Aliaga / Nemrut Bay|Turkiye|Turkiye|Tanker / Bulk / Container|20
TRGEM|Gemlik|Turkiye|Turkiye|Container / Ro-Ro / Automotive|14
TRIZT|Kocaeli / Izmit Gulf|Turkiye|Turkiye|Container / Tanker / Industrial|20
TRTEK|Tekirdag|Turkiye|Turkiye|Bulk / Ro-Ro / Container|18
TRBAN|Bandirma|Turkiye|Turkiye|Bulk / General cargo / Ro-Ro|12
TRDRC|Derince|Turkiye|Turkiye|Ro-Ro / Bulk / General cargo|14
TRISK|Iskenderun|Turkiye|Turkiye|Container / Steel / Bulk|15.5
TRSSX|Samsun|Turkiye|Turkiye|Bulk / Ro-Ro / General cargo|12
TRTZX|Trabzon|Turkiye|Turkiye|General cargo / Ro-Ro / Bulk|10
TRAYT|Antalya|Turkiye|Turkiye|Cruise / General cargo / Ro-Ro|10
TRGUL|Gulluk|Turkiye|Turkiye|Bulk / General cargo|12
TRERE|Eregli|Turkiye|Turkiye|Steel / Bulk / General cargo|12
TRZON|Zonguldak|Turkiye|Turkiye|Bulk / General cargo|10
TRCEY|Ceyhan / Yumurtalik|Turkiye|Turkiye|Tanker / Oil terminal|18
TRHAY|Haydarpasa|Turkiye|Turkiye|General cargo / Ro-Ro / Rail link|12
TRHOP|Hopa|Turkiye|Turkiye|General cargo / Bulk|9
TRYAL|Yalova|Turkiye|Turkiye|Ro-Ro / Shipyard / General cargo|10
NLRTM|Rotterdam|Netherlands|Europe|Container / Tanker / Bulk|23
BEANR|Antwerp-Bruges|Belgium|Europe|Container / Chemical|16
DEHAM|Hamburg|Germany|Europe|Container / Project|14.5
DEBRV|Bremerhaven|Germany|Europe|Container / Ro-Ro|15
DEWVN|Wilhelmshaven|Germany|Europe|Container|18
GBFXT|Felixstowe|United Kingdom|Europe|Container|16
GBSOU|Southampton|United Kingdom|Europe|Container / Cruise|15
GBLGP|London Gateway|United Kingdom|Europe|Container|17
FRLEH|Le Havre|France|Europe|Container / Tanker|16
FRFOS|Marseille Fos|France|Europe|Container / Tanker|16
ESBCN|Barcelona|Spain|Europe|Container / Ro-Ro|16
ESVLC|Valencia|Spain|Europe|Container|17
ESALG|Algeciras|Spain|Europe|Container / Bunker|18
ESBIO|Bilbao|Spain|Europe|Container / Breakbulk|21
ITGOA|Genoa|Italy|Europe|Container / Ro-Ro|15
ITTRS|Trieste|Italy|Europe|Container / Tanker|18
ITGIT|Gioia Tauro|Italy|Europe|Container|18
GRPIR|Piraeus|Greece|Europe|Container / Ferry|18
ROCND|Constanta|Romania|Europe|Container / Bulk|19
PLGDN|Gdansk|Poland|Europe|Container / Bulk|17
SEGOT|Gothenburg|Sweden|Europe|Container / Ro-Ro|20
DKAAR|Aarhus|Denmark|Europe|Container|14
NOOSL|Oslo|Norway|Europe|Container / Ferry|12
FIHEL|Helsinki|Finland|Europe|Container / Ro-Ro|12
EETLL|Tallinn|Estonia|Europe|Ferry / Ro-Ro|14
LVRIX|Riga|Latvia|Europe|Bulk / Container|14
LTKLJ|Klaipeda|Lithuania|Europe|Container / Ro-Ro|14.5
IEDUB|Dublin|Ireland|Europe|Container / Ro-Ro|11
BEZEE|Zeebrugge|Belgium|Europe|Ro-Ro / Container|16
FRDKK|Dunkirk|France|Europe|Bulk / Ferry|20
NLAMS|Amsterdam|Netherlands|Europe|Bulk / Tanker|14
USLAX|Los Angeles|United States|North America|Container|16
USLGB|Long Beach|United States|North America|Container|16
USOAK|Oakland|United States|North America|Container|15
USSEA|Seattle|United States|North America|Container|15
USTIW|Tacoma|United States|North America|Container / Ro-Ro|15
CAVAN|Vancouver|Canada|North America|Container / Bulk|18
CAPRR|Prince Rupert|Canada|North America|Container|18
USNYC|New York / New Jersey|United States|North America|Container / Ro-Ro|15
USSAV|Savannah|United States|North America|Container|14
USCHS|Charleston|United States|North America|Container|16
USORF|Norfolk|United States|North America|Container / Naval|15
USHOU|Houston|United States|North America|Container / Tanker|14
USMSY|New Orleans|United States|North America|Bulk / Breakbulk|14
USMOB|Mobile|United States|North America|Container / Bulk|13
USMIA|Miami|United States|North America|Container / Cruise|12
USJAX|Jacksonville|United States|North America|Container / Ro-Ro|12
USBAL|Baltimore|United States|North America|Ro-Ro / Bulk|15
USPHL|Philadelphia|United States|North America|Container / Reefer|13
USBOS|Boston|United States|North America|Container|12
CAHAL|Halifax|Canada|North America|Container|16
CAMTR|Montreal|Canada|North America|Container|11
CAQUE|Quebec|Canada|North America|Bulk / General cargo|15
MXVER|Veracruz|Mexico|North America|Container / Ro-Ro|15
MXZLO|Manzanillo Mexico|Mexico|North America|Container|16
MXLZC|Lazaro Cardenas|Mexico|North America|Container / Bulk|18
MXATM|Altamira|Mexico|North America|Container / Industrial|12
MXESE|Ensenada|Mexico|North America|Container / Cruise|12
BRSSZ|Santos|Brazil|South America|Container / Bulk|15
BRPNG|Paranagua|Brazil|South America|Bulk / Container|13
BRRIG|Rio Grande|Brazil|South America|Container / Bulk|14
BRITJ|Itajai|Brazil|South America|Container|14
BRRIO|Rio de Janeiro|Brazil|South America|Container / Cruise|14
BRVIX|Vitoria|Brazil|South America|Bulk / General cargo|13
BRSUA|Suape|Brazil|South America|Container / Tanker|15.5
ARBUE|Buenos Aires|Argentina|South America|Container|10
UYMVD|Montevideo|Uruguay|South America|Container / Ro-Ro|13
ARROS|Rosario|Argentina|South America|Bulk|10
CLVAP|Valparaiso|Chile|South America|Container|13
CLSAI|San Antonio|Chile|South America|Container / Bulk|14
PECLL|Callao|Peru|South America|Container / Bulk|16
ECGYE|Guayaquil|Ecuador|South America|Container / Banana|12
COCTG|Cartagena Colombia|Colombia|South America|Container / Cruise|16
COBUN|Buenaventura|Colombia|South America|Container / Bulk|14
COBAQ|Barranquilla|Colombia|South America|Bulk / Container|11
VEPBL|Puerto Cabello|Venezuela|South America|Container / General cargo|12
VELAG|La Guaira|Venezuela|South America|Container|12
ECMEC|Manta|Ecuador|South America|Multipurpose|12
TTPTS|Port of Spain|Trinidad and Tobago|Caribbean|Container / General cargo|12
JMKIN|Kingston Jamaica|Jamaica|Caribbean|Container|15
BSFPO|Freeport Bahamas|Bahamas|Caribbean|Container / Transshipment|16
DOCAU|Caucedo|Dominican Republic|Caribbean|Container|15
ZADUR|Durban|South Africa|Africa|Container / Bulk|16
ZACPT|Cape Town|South Africa|Africa|Container / Reefer|15.9
ZANGQ|Ngqura|South Africa|Africa|Container / Transshipment|18
ZAPLZ|Port Elizabeth|South Africa|Africa|Container / Ro-Ro|12
ZARCB|Richards Bay|South Africa|Africa|Bulk / Coal|18
MZMPM|Maputo|Mozambique|Africa|Bulk / Container|14
MZBEW|Beira|Mozambique|Africa|Bulk / Container|12
MZMNC|Nacala|Mozambique|Africa|Bulk / Container|14
TZDAR|Dar es Salaam|Tanzania|Africa|Container / Bulk|12
KEMBA|Mombasa|Kenya|Africa|Container / Bulk|15
DJJIB|Djibouti|Djibouti|Africa|Container / Transshipment|18
SOBBO|Berbera|Somalia|Africa|Container / General cargo|12
SOMGQ|Mogadishu|Somalia|Africa|General cargo|11
SDPZU|Port Sudan|Sudan|Africa|Container / Bulk|14
NGAPP|Lagos Apapa|Nigeria|Africa|Container|13
NGTIN|Tin Can Island|Nigeria|Africa|Container / General cargo|12
GHTEM|Tema|Ghana|Africa|Container|16
GHTKD|Takoradi|Ghana|Africa|Bulk / Offshore|14
CIABJ|Abidjan|Cote d'Ivoire|Africa|Container / Cocoa|15
SNDKR|Dakar|Senegal|Africa|Container / Bulk|13
MAPTM|Tangier Med|Morocco|Africa|Container / Ro-Ro|18
MACAS|Casablanca|Morocco|Africa|Container / Bulk|12
MAAGA|Agadir|Morocco|Africa|Reefer / General cargo|12
TNRDS|Rades Tunis|Tunisia|Africa|Container / Ro-Ro|10
DZALG|Algiers|Algeria|Africa|Container / Ferry|12
DZORN|Oran|Algeria|Africa|Container / Bulk|13
DZBJA|Bejaia|Algeria|Africa|Bulk / Tanker|13
LYTIP|Tripoli|Libya|Africa|Container / General cargo|12
LYMRA|Misrata|Libya|Africa|Container / Steel|13
EGALY|Alexandria|Egypt|Africa|Container / General cargo|14
EGDAM|Damietta|Egypt|Africa|Container / LNG|15
EGPSD|Port Said|Egypt|Africa|Container / Canal|18
EGSUZ|Suez|Egypt|Africa|Canal / Tanker|16
NAWVB|Walvis Bay|Namibia|Africa|Container / Bulk|14
AOLAD|Luanda|Angola|Africa|Container / Offshore|13
AOLOB|Lobito|Angola|Africa|Bulk / General cargo|12
CGPNR|Pointe-Noire|Congo|Africa|Container / Offshore|15
AUSYD|Port Botany Sydney|Australia|Oceania|Container|15
AUMEL|Melbourne|Australia|Oceania|Container / Ro-Ro|14
AUBNE|Brisbane|Australia|Oceania|Container / Bulk|14
AUFRE|Fremantle|Australia|Oceania|Container / Bulk|14.7
AUADL|Adelaide|Australia|Oceania|Container / Bulk|13
AUDRW|Darwin|Australia|Oceania|LNG / General cargo|14
NZAUK|Auckland|New Zealand|Oceania|Container|13
NZTRG|Tauranga|New Zealand|Oceania|Container / Logs|14.5
NZLYT|Lyttelton|New Zealand|Oceania|Container / Bulk|12
NZWLG|Wellington|New Zealand|Oceania|Ferry / Container|11
NZNPE|Napier|New Zealand|Oceania|Container / Logs|13
NZPOE|Port Chalmers|New Zealand|Oceania|Container / Reefer|13
FJSUV|Suva|Fiji|Oceania|Container / General cargo|11
PGPOM|Port Moresby|Papua New Guinea|Oceania|Container / General cargo|12
`.trim();

const verifiedBunkerSnapshot = {
  sourceName: "Ship & Bunker World Bunker Prices",
  sourceUrl: "https://shipandbunker.com/prices",
  checkedAt: "2026-07-02",
  product: "VLSFO",
  unit: "$/mt",
  ports: {
    singapore: { label: "Singapore", vlsfo: 686.5, vlsfoChange: -4.5, mgo: 896.5, mgoChange: -5.5, hfo380: 451.5, hfo380Change: -6.5 },
    rotterdam: { label: "Rotterdam", vlsfo: 599.5, vlsfoChange: 2, mgo: 929, mgoChange: 30, hfo380: 454, hfo380Change: 0.5 },
    houston: { label: "Houston", vlsfo: 576.5, vlsfoChange: -5, mgo: 936.5, mgoChange: -0.5, hfo380: 467.5, hfo380Change: -4.5 },
    fujairah: { label: "Fujairah", vlsfo: 759, vlsfoChange: -90, mgo: 1199.5, mgoChange: -81, hfo380: 480.5, hfo380Change: -29.5 },
    laLongBeach: { label: "LA / Long Beach", vlsfo: 658.5, vlsfoChange: 5 },
    hongKong: { label: "Hong Kong", vlsfo: 687.5, vlsfoChange: 1 },
    newYork: { label: "New York", vlsfo: 606.5, vlsfoChange: 6 },
    santos: { label: "Santos", vlsfo: 623.5, vlsfoChange: 0 }
  },
  averages: {
    global20Vlsfo: 690.5,
    global4Vlsfo: 655,
    globalAverageVlsfo: 765
  }
};

const liveFeedState = {
  vessels: 84219,
  congestion: 37,
  bunker: verifiedBunkerSnapshot.ports.singapore.vlsfo,
  weather: 9,
  pnl: 148,
  co2: 1420,
  containerIndex: 2184,
  bdi: 1840,
  bci: 2960,
  bpi: 1680,
  bsi: 1215,
  bhsi: 705,
  bdti: 1045,
  bcti: 815,
  vlccTd3c: 72,
  aframaxWs: 162,
  mrAtlantic: 186,
  scfi: 2230,
  ccfi: 1460,
  wci: 3180,
  fbx: 2940,
  transpacificSpot: 4680,
  vlsfoSingapore: verifiedBunkerSnapshot.ports.singapore.vlsfo,
  vlsfoRotterdam: verifiedBunkerSnapshot.ports.rotterdam.vlsfo,
  vlsfoFujairah: verifiedBunkerSnapshot.ports.fujairah.vlsfo,
  mgoSingapore: verifiedBunkerSnapshot.ports.singapore.mgo,
  hi5Spread: verifiedBunkerSnapshot.ports.singapore.vlsfo - verifiedBunkerSnapshot.ports.singapore.hfo380,
  bunkerAdjustment: 48,
  lngSpot: 84500,
  lngQueue: 63,
  jkmMarker: 11.8,
  lpgBaltic: 78,
  eua: 72.4,
  co2CostIndex: 64,
  ciiRisk: 61,
  fueleuExposure: 38,
  singaporeQueue: 43,
  panamaWait: 31,
  suezWatch: 22,
  weatherDisruption: 34,
  securityRisk: 28,
  coalRoute: 96,
  grainFreight: 238,
  ironOreCape: 104,
  crudeRouteRisk: 81,
  chemicalTanker: 112,
  projectCargoDemand: 67,
  usdIndex: 106.2,
  sofr: 5.1,
  dryBulkStates: ["Soft", "Neutral", "Firm", "Bullish"],
  lngStates: ["Low", "Medium", "High"],
  securityAreas: ["GoA", "Malacca", "W. Africa", "Med"]
};

const marketIndexDefinitions = [
  { id: "bdi", short: "BDI", name: "Baltic Dry Index", sector: "Dry Bulk", key: "bdi", unit: "pts", source: "licensed", note: "Overall dry bulk freight benchmark for major vessel classes.", brokerUse: "Voyage estimate sentiment, freight rate direction, TCE sensitivity.", volatility: 18, min: 900, max: 3600 },
  { id: "bci", short: "BCI", name: "Baltic Capesize Index", sector: "Dry Bulk", key: "bci", unit: "pts", source: "licensed", note: "Capesize market pulse, especially iron ore and long-haul coal.", brokerUse: "Cape cargo pricing, ballast-leg decision, Atlantic/Pacific balance.", volatility: 32, min: 1200, max: 5200 },
  { id: "bpi", short: "BPI", name: "Baltic Panamax Index", sector: "Dry Bulk", key: "bpi", unit: "pts", source: "licensed", note: "Panamax/Kamsarmax benchmark for coal and grain fixtures.", brokerUse: "Coal/grain rate matrix and laycan risk decisions.", volatility: 22, min: 800, max: 3300 },
  { id: "bsi", short: "BSI", name: "Baltic Supramax Index", sector: "Dry Bulk", key: "bsi", unit: "pts", source: "licensed", note: "Supramax/Ultramax spot market reference.", brokerUse: "Minor bulk, fertilizer, steel and regional cargo pricing.", volatility: 14, min: 550, max: 2400 },
  { id: "bhsi", short: "BHSI", name: "Baltic Handysize Index", sector: "Dry Bulk", key: "bhsi", unit: "pts", source: "licensed", note: "Handysize benchmark for smaller parcels and shallow ports.", brokerUse: "Short-sea cargo matching and port restriction screening.", volatility: 9, min: 350, max: 1300 },
  { id: "bdti", short: "BDTI", name: "Baltic Dirty Tanker Index", sector: "Tanker", key: "bdti", unit: "pts", source: "licensed", note: "Dirty petroleum tanker market direction.", brokerUse: "Crude voyage estimate, WS sensitivity and demurrage exposure.", volatility: 16, min: 600, max: 1800 },
  { id: "bcti", short: "BCTI", name: "Baltic Clean Tanker Index", sector: "Tanker", key: "bcti", unit: "pts", source: "licensed", note: "Clean products tanker benchmark.", brokerUse: "CPP fixture guidance, MR/LR2 rate direction and bunker exposure.", volatility: 12, min: 450, max: 1400 },
  { id: "vlcc-td3c", short: "TD3C", name: "VLCC Middle East Gulf / China", sector: "Tanker", key: "vlccTd3c", unit: "WS", source: "licensed", note: "Indicative Worldscale pulse for VLCC MEG / China route.", brokerUse: "Crude route risk, bunker sensitivity and rate negotiation.", volatility: 1.8, min: 38, max: 115, decimals: 1 },
  { id: "aframax-ws", short: "Aframax WS", name: "Aframax Worldscale Watch", sector: "Tanker", key: "aframaxWs", unit: "WS", source: "simulated", note: "Internal tanker watch score for Aframax fixtures.", brokerUse: "Regional crude and fuel oil fixture comparison.", volatility: 3.4, min: 80, max: 260 },
  { id: "mr-atlantic", short: "MR Atl", name: "MR Atlantic Clean Tanker Pulse", sector: "Tanker", key: "mrAtlantic", unit: "WS", source: "simulated", note: "MR clean-product pulse for Atlantic basin negotiation.", brokerUse: "Clean tanker recap and freight counter-offer support.", volatility: 3.2, min: 90, max: 280 },
  { id: "scfi", short: "SCFI", name: "Shanghai Containerized Freight Index", sector: "Container", key: "scfi", unit: "pts", source: "api-ready", note: "China export container spot freight benchmark.", brokerUse: "Container spot market trend and surcharge watch.", volatility: 24, min: 1200, max: 4300 },
  { id: "ccfi", short: "CCFI", name: "China Containerized Freight Index", sector: "Container", key: "ccfi", unit: "pts", source: "api-ready", note: "Broader China container freight benchmark.", brokerUse: "Contract vs spot comparison and container sentiment.", volatility: 14, min: 850, max: 2400 },
  { id: "wci", short: "WCI", name: "Drewry World Container Index", sector: "Container", key: "wci", unit: "$/FEU", source: "api-ready", note: "Global composite container freight benchmark.", brokerUse: "Container rate check and customer quote positioning.", volatility: 42, min: 1400, max: 6200 },
  { id: "fbx", short: "FBX", name: "Freightos Baltic Index", sector: "Container", key: "fbx", unit: "$/FEU", source: "api-ready", note: "Digital freight marketplace container benchmark.", brokerUse: "Spot quote confidence and lane comparison.", volatility: 36, min: 1300, max: 5900 },
  { id: "transpacific-spot", short: "TP Spot", name: "Transpacific Eastbound Spot", sector: "Container", key: "transpacificSpot", unit: "$/FEU", source: "simulated", note: "Internal lane pulse for Asia / US container spot rates.", brokerUse: "Transpacific quote timing and rate movement alert.", volatility: 58, min: 1800, max: 7800 },
  { id: "vlsfo-singapore", short: "VLSFO SG", name: "Singapore VLSFO", sector: "Bunker", key: "vlsfoSingapore", unit: "$/t", source: "verified", note: "Source-backed VLSFO bunker stem benchmark.", brokerUse: "Voyage estimate bunker cost and speed optimization.", bunkerPort: "singapore", bunkerProduct: "vlsfo", decimals: 2 },
  { id: "vlsfo-rotterdam", short: "VLSFO RTM", name: "Rotterdam VLSFO", sector: "Bunker", key: "vlsfoRotterdam", unit: "$/t", source: "verified", note: "Source-backed North Europe VLSFO bunker benchmark.", brokerUse: "Bunker port selection and ROB planning.", bunkerPort: "rotterdam", bunkerProduct: "vlsfo", decimals: 2 },
  { id: "vlsfo-fujairah", short: "VLSFO FUJ", name: "Fujairah VLSFO", sector: "Bunker", key: "vlsfoFujairah", unit: "$/t", source: "verified", note: "Source-backed Middle East VLSFO bunker benchmark.", brokerUse: "MEG route estimate, bunker spread and deviation economics.", bunkerPort: "fujairah", bunkerProduct: "vlsfo", decimals: 2 },
  { id: "mgo-singapore", short: "MGO SG", name: "Singapore MGO", sector: "Bunker", key: "mgoSingapore", unit: "$/t", source: "verified", note: "Source-backed marine gasoil reference for ECA and special operations.", brokerUse: "ECA exposure, port consumption and voyage cost model.", bunkerPort: "singapore", bunkerProduct: "mgo", decimals: 2 },
  { id: "hi5-spread", short: "Hi5", name: "Singapore VLSFO / IFO380 Hi5 Spread", sector: "Bunker", key: "hi5Spread", unit: "$/t", source: "verified", note: "Source-backed Singapore VLSFO minus IFO380 spread proxy for scrubber economics.", brokerUse: "Scrubber vessel comparison and owner counter logic.", bunkerPort: "singapore", bunkerProduct: "hi5Spread", decimals: 2 },
  { id: "baf", short: "BAF", name: "Bunker Adjustment Factor Pulse", sector: "Bunker", key: "bunkerAdjustment", unit: "idx", source: "simulated", note: "Internal surcharge pressure index.", brokerUse: "Container surcharge discussion and freight escalation clauses.", volatility: 1.4, min: 20, max: 90 },
  { id: "lng-spot", short: "LNG Spot", name: "LNG Carrier Spot Charter Rate", sector: "LNG / Gas", key: "lngSpot", unit: "$/day", source: "api-ready", note: "Indicative LNG carrier charter market pulse.", brokerUse: "LNG voyage economics and time charter comparison.", volatility: 950, min: 42000, max: 190000 },
  { id: "lng-queue", short: "LNG Queue", name: "LNG Terminal Queue Pressure", sector: "LNG / Gas", key: "lngQueue", unit: "idx", source: "simulated", note: "Terminal waiting and slot pressure score.", brokerUse: "Laycan risk, demurrage exposure and discharge planning.", volatility: 1.8, min: 18, max: 92 },
  { id: "jkm", short: "JKM", name: "JKM Gas Marker Watch", sector: "LNG / Gas", key: "jkmMarker", unit: "$/MMBtu", source: "api-ready", note: "Gas price context that can influence LNG shipping demand.", brokerUse: "LNG demand signal and cargo timing discussion.", volatility: 0.16, min: 6, max: 24, decimals: 2 },
  { id: "lpg-baltic", short: "VLGC", name: "Baltic LPG / VLGC Pulse", sector: "LNG / Gas", key: "lpgBaltic", unit: "idx", source: "api-ready", note: "LPG carrier market watch for VLGC routes.", brokerUse: "Gas carrier sentiment and tonnage balance.", volatility: 1.5, min: 35, max: 145 },
  { id: "eua", short: "EUA", name: "EU ETS Allowance", sector: "Carbon / Green", key: "eua", unit: "EUR/t", source: "api-ready", note: "Carbon allowance price input for EU ETS voyage cost.", brokerUse: "EU ETS surcharge, green route cost and charter party clause review.", volatility: 0.38, min: 45, max: 110, decimals: 2 },
  { id: "co2-cost", short: "CO2 Cost", name: "CO2 Cost Index", sector: "Carbon / Green", key: "co2CostIndex", unit: "idx", source: "simulated", note: "Internal cost pressure score from bunker, distance and ETS assumptions.", brokerUse: "Green voyage comparison and margin protection.", volatility: 1.2, min: 25, max: 95 },
  { id: "cii-risk", short: "CII", name: "CII Risk Index", sector: "Carbon / Green", key: "ciiRisk", unit: "idx", source: "simulated", note: "Operational efficiency risk score for speed and consumption choices.", brokerUse: "Speed recommendation and vessel suitability screen.", volatility: 1.1, min: 20, max: 92 },
  { id: "fueleu", short: "FuelEU", name: "FuelEU Maritime Exposure", sector: "Carbon / Green", key: "fueleuExposure", unit: "idx", source: "api-ready", note: "FuelEU compliance exposure placeholder for European voyages.", brokerUse: "Clause warning and cost allocation discussion.", volatility: 0.9, min: 10, max: 88 },
  { id: "global-congestion", short: "Congestion", name: "Global Port Congestion Index", sector: "Port / Risk", key: "congestion", unit: "%", source: "simulated", note: "Global waiting pressure generated from the app's live risk model.", brokerUse: "Port days, demurrage exposure and laycan risk.", volatility: 1.4, min: 18, max: 82 },
  { id: "singapore-queue", short: "SIN Queue", name: "Singapore Anchorage Queue", sector: "Port / Risk", key: "singaporeQueue", unit: "idx", source: "simulated", note: "Singapore anchorage delay pressure.", brokerUse: "Bunker call planning and ETA buffer.", volatility: 1.5, min: 15, max: 88 },
  { id: "panama-wait", short: "Panama", name: "Panama Canal Waiting Pressure", sector: "Port / Risk", key: "panamaWait", unit: "idx", source: "api-ready", note: "Canal queue risk placeholder.", brokerUse: "Canal routing, alternative route and delivery window discussion.", volatility: 1.2, min: 8, max: 90 },
  { id: "suez-watch", short: "Suez", name: "Suez Transit Watch", sector: "Port / Risk", key: "suezWatch", unit: "idx", source: "api-ready", note: "Suez route disruption and transit watch placeholder.", brokerUse: "Route risk, war risk and insurance clause review.", volatility: 1.1, min: 5, max: 82 },
  { id: "weather-disruption", short: "Weather", name: "Weather Disruption Index", sector: "Port / Risk", key: "weatherDisruption", unit: "idx", source: "api-ready", note: "Weather routing and delay pressure score.", brokerUse: "ETA buffer, speed adjustment and laytime exception watch.", volatility: 1.6, min: 12, max: 90 },
  { id: "security-risk", short: "Security", name: "Maritime Security Risk Index", sector: "Port / Risk", key: "securityRisk", unit: "idx", source: "api-ready", note: "Piracy, conflict and war-risk watch placeholder.", brokerUse: "War risk clause, deviation, premium and route recommendation.", volatility: 1.2, min: 6, max: 86 },
  { id: "coal-route", short: "Coal", name: "Coal Route Freight Index", sector: "Cargo", key: "coalRoute", unit: "idx", source: "simulated", note: "Coal cargo freight pressure by route.", brokerUse: "Coal fixture rate matrix and discharge delay risk.", volatility: 1.8, min: 40, max: 165 },
  { id: "grain-freight", short: "Grain", name: "Grain Freight Sentiment", sector: "Cargo", key: "grainFreight", unit: "idx", source: "simulated", note: "Grain movement and seasonality pressure score.", brokerUse: "Grain voyage estimate, fumigation/clean hold watch and laycan timing.", volatility: 2.5, min: 120, max: 360 },
  { id: "iron-ore-cape", short: "Iron Ore", name: "Iron Ore Cape Demand Index", sector: "Cargo", key: "ironOreCape", unit: "idx", source: "api-ready", note: "Iron ore cargo pull for Capesize market.", brokerUse: "Cape rate negotiation and ballast-leg positioning.", volatility: 1.7, min: 45, max: 185 },
  { id: "crude-route-risk", short: "Crude", name: "Crude Route Risk Index", sector: "Cargo", key: "crudeRouteRisk", unit: "idx", source: "simulated", note: "Crude cargo route exposure from tanker, security and bunker signals.", brokerUse: "Tanker risk premium and charter party wording.", volatility: 1.5, min: 30, max: 150 },
  { id: "chemical-tanker", short: "Chemicals", name: "Chemical Tanker Sentiment", sector: "Cargo", key: "chemicalTanker", unit: "idx", source: "simulated", note: "Chemical parcel/tanker market score.", brokerUse: "Tank coating, IMDG and freight premium discussion.", volatility: 1.4, min: 55, max: 175 },
  { id: "project-cargo", short: "Project", name: "Project Cargo Heavy-Lift Demand", sector: "Cargo", key: "projectCargoDemand", unit: "idx", source: "simulated", note: "Heavy-lift and project cargo demand pressure.", brokerUse: "Special gear vessel matching, port restriction and premium quote.", volatility: 1.2, min: 25, max: 120 },
  { id: "usd-index", short: "DXY", name: "US Dollar Index Watch", sector: "Finance", key: "usdIndex", unit: "idx", source: "api-ready", note: "FX context for dollar-denominated shipping costs.", brokerUse: "FX sensitivity and invoice exposure.", volatility: 0.18, min: 92, max: 118, decimals: 2 },
  { id: "sofr", short: "SOFR", name: "SOFR Funding Rate Watch", sector: "Finance", key: "sofr", unit: "%", source: "api-ready", note: "Funding and lease cost context.", brokerUse: "Time charter finance, working capital and credit exposure.", volatility: 0.03, min: 2.4, max: 6.2, decimals: 2 }
];

const balticIndexIds = ["bdi", "bci", "bpi", "bsi", "bhsi", "bdti", "bcti"];
const balticFeedState = {
  endpoint: "",
  connected: false,
  lastChecked: "",
  lastSource: "Baltic Exchange licensed API required",
  lastError: "",
  polls: 0
};

const verifiedNewsFallback = [
  {
    title: "Around $125 Billion of Vessels, Cargo Remain Stranded in Persian Gulf, Allianz Says",
    source: "The Times / WSJ",
    link: "https://www.thetimes.com/business/wsj/article/125-billion-of-vessels-remain-persian-gulf-allianz-bn5wrqp2v",
    date: new Date("2026-06-25T12:00:00")
  },
  {
    title: "Iran, Oman will start large-scale evacuation of ships through Strait of Hormuz, says IMO",
    source: "New York Post",
    link: "https://nypost.com/2026/06/24/business/iran-oman-will-start-large-scale-evacuation-of-ships-through-strait-of-hormuz-says-imo/",
    date: new Date("2026-06-25T11:00:00")
  },
  {
    title: "Oil tankers use new route through Strait of Hormuz despite Iranian threats",
    source: "Associated Press",
    link: "https://apnews.com/article/862164c2aecbdc376dea434198eaf75f",
    date: new Date("2026-06-25T10:00:00")
  }
];

const vesselDatabase = {
  "9387421": {
    name: "MV Orion",
    type: "Container Ship",
    built: "2011",
    loa: "294 m",
    tonnage: "72,400 GT",
    engine: "MAN B&W 8K90MC",
    flag: "Panama"
  },
  "9441186": {
    name: "MT Atlas",
    type: "Oil Tanker",
    built: "2013",
    loa: "249 m",
    tonnage: "62,180 GT",
    engine: "Sulzer 7RTA",
    flag: "Marshall Islands"
  },
  "9734507": {
    name: "LNG Nova",
    type: "LNG Carrier",
    built: "2018",
    loa: "299 m",
    tonnage: "115,900 GT",
    engine: "Dual fuel diesel electric",
    flag: "Liberia"
  }
};

const wikiTerms = {
  demurrage: {
    title: "Demurrage",
    body: "Laytime süresi aşıldığında kiracıya yansıyan gecikme bedelidir. Genellikle günlük rate üzerinden hesaplanır."
  },
  laytime: {
    title: "Laytime",
    body: "Charter party içinde yükleme ve tahliye için izin verilen toplam süredir. Notice of Readiness sonrası başlar."
  },
  incoterms: {
    title: "INCOTERMS",
    body: "Alıcı ve satıcının taşıma, sigorta, teslim ve risk sorumluluklarını tanımlayan uluslararası ticaret kurallarıdır."
  },
  "charter party": {
    title: "Charter Party",
    body: "Gemi sahibi ve kiracı arasında navlun, laytime, limanlar, yük ve sorumlulukları düzenleyen sözleşmedir."
  },
  dispatch: {
    title: "Dispatch",
    body: "Laytime izinli süreden daha erken tamamlanırsa armatörün kiracıya ödediği tasarruf bedelidir. Çoğu fixture'da demurrage rate'in yarısı olarak geçer."
  },
  tce: {
    title: "TCE",
    body: "Time Charter Equivalent, voyage gelirinden brokerage, bunker, liman ve kanal masrafları düşüldükten sonra günlük kazancı gösterir."
  },
  "voyage estimate": {
    title: "Voyage Estimate",
    body: "Bir seferin freight geliri, bunker, liman, kanal, hire ve komisyon maliyetleriyle tahmini kâr/zararını hesaplayan ticari tablodur."
  },
  fixture: {
    title: "Fixture Recap",
    body: "Fixture recap; gemi, yük, liman, laycan, freight, demurrage, dispatch, commission ve özel clause'ların kısa ticari özetidir."
  },
  laycan: {
    title: "Laycan",
    body: "Laydays/Cancelling aralığıdır. Gemi bu pencere içinde yüklemeye hazır olmazsa charterer sözleşmeyi iptal hakkı kazanabilir."
  },
  nor: {
    title: "NOR",
    body: "Notice of Readiness, geminin yükleme veya tahliye için hukuken ve fiilen hazır olduğunu bildiren notice'tır. Laytime başlangıcı için kritiktir."
  },
  hire: {
    title: "Hire",
    body: "Time charter'da geminin günlük kira bedelidir. Off-hire, komisyon ve süre hesabı net hire sonucunu değiştirir."
  },
  "off hire": {
    title: "Off-Hire",
    body: "Geminin charterer hizmetinde kullanılamadığı süre için hire'ın işlememesi veya düşülmesidir. Arıza, eksik performans veya operasyonel engel kaynaklı olabilir."
  },
  freight: {
    title: "Freight",
    body: "Taşınan yük miktarı ve agreed freight rate üzerinden oluşan navlun geliridir. Broker commission düşülerek net freight bulunur."
  }
};

const cargoProfiles = {
  grain: {
    label: "Tahıl / Grain",
    unit: "mt",
    baseFreight: 18.5,
    freightMultiplier: 1,
    demurrageMultiplier: 1,
    portCostMultiplier: 1,
    bunkerMultiplier: 1,
    risk: 42,
    vessel: "Handymax / Panamax bulk carrier",
    note: "Seasonal demand, fumigation, moisture and berth productivity matter."
  },
  coal: {
    label: "Kömür / Coal",
    unit: "mt",
    baseFreight: 16.8,
    freightMultiplier: 0.92,
    demurrageMultiplier: 1.08,
    portCostMultiplier: 1.05,
    bunkerMultiplier: 1.02,
    risk: 48,
    vessel: "Supramax / Panamax bulk carrier",
    note: "Self-heating, dust control and terminal queue risk should be priced."
  },
  container: {
    label: "Konteyner / Container",
    unit: "TEU",
    baseFreight: 1450,
    freightMultiplier: 1.18,
    demurrageMultiplier: 1.25,
    portCostMultiplier: 1.22,
    bunkerMultiplier: 1.08,
    risk: 54,
    vessel: "Container ship",
    note: "Freight is usually TEU-based; reefer, D&D and slot availability move pricing."
  },
  ironOre: {
    label: "Demir Cevheri / Iron Ore",
    unit: "mt",
    baseFreight: 14.2,
    freightMultiplier: 0.86,
    demurrageMultiplier: 1.12,
    portCostMultiplier: 1.08,
    bunkerMultiplier: 1.04,
    risk: 46,
    vessel: "Capesize / Newcastlemax bulk carrier",
    note: "High-volume cargo; draft, loading rate and terminal reliability dominate."
  },
  crudeOil: {
    label: "Crude Oil",
    unit: "mt",
    baseFreight: 24,
    freightMultiplier: 1.28,
    demurrageMultiplier: 1.45,
    portCostMultiplier: 1.26,
    bunkerMultiplier: 1.1,
    risk: 66,
    vessel: "Aframax / Suezmax / VLCC",
    note: "Worldscale, vetting, sanctions, heating and terminal delay risks must be checked."
  },
  lng: {
    label: "LNG",
    unit: "cbm",
    baseFreight: 3.8,
    freightMultiplier: 1.55,
    demurrageMultiplier: 1.7,
    portCostMultiplier: 1.45,
    bunkerMultiplier: 1.18,
    risk: 74,
    vessel: "LNG carrier",
    note: "Boil-off, terminal window, compatibility and hire market drive the economics."
  },
  chemicals: {
    label: "Chemicals",
    unit: "mt",
    baseFreight: 36,
    freightMultiplier: 1.35,
    demurrageMultiplier: 1.35,
    portCostMultiplier: 1.3,
    bunkerMultiplier: 1.04,
    risk: 68,
    vessel: "Chemical tanker",
    note: "Tank coating, previous cargo, cleaning, segregation and IMO class affect price."
  },
  projectCargo: {
    label: "Project Cargo",
    unit: "lot",
    baseFreight: 185000,
    freightMultiplier: 1.5,
    demurrageMultiplier: 1.22,
    portCostMultiplier: 1.4,
    bunkerMultiplier: 1.06,
    risk: 72,
    vessel: "MPP / Heavy-lift vessel",
    note: "Lift plan, lashing, permits, crane capacity and weather window create premium."
  }
};

const calculators = {
  eta: {
    fields: [
      { id: "distance", label: "Mesafe (nautical mile)", value: 1200 },
      { id: "speed", label: "Hız (knot)", value: 15 }
    ],
    calculate: ({ distance, speed }) => {
      if (!speed) return "Hız 0 olamaz.";
      const hours = distance / speed;
      return `Tahmini varış: ${hours.toFixed(1)} saat (${(hours / 24).toFixed(1)} gün).`;
    }
  },
  laytime: {
    fields: [
      { id: "cargoQty", label: "Yük miktarı (mt)", value: 52000 },
      { id: "loadRate", label: "Yükleme hızı (mt/gün)", value: 12000 },
      { id: "dischargeRate", label: "Tahliye hızı (mt/gün)", value: 10000 },
      { id: "allowedHours", label: "İzinli laytime (saat)", value: 144 },
      { id: "interruptions", label: "Kesintiler / istisnalar (saat)", value: 8 }
    ],
    calculate: ({ cargoQty, loadRate, dischargeRate, allowedHours, interruptions }) => {
      if (!loadRate || !dischargeRate) return "Yükleme ve tahliye hızı 0 olamaz.";
      const loadHours = (cargoQty / loadRate) * 24;
      const dischargeHours = (cargoQty / dischargeRate) * 24;
      const usedHours = Math.max(loadHours + dischargeHours - interruptions, 0);
      const balance = allowedHours - usedHours;
      const status = balance >= 0 ? `${balance.toFixed(1)} saat laytime kaldı.` : `${Math.abs(balance).toFixed(1)} saat demurrage riski.`;
      return `Tahmini kullanılan laytime: ${usedHours.toFixed(1)} saat. Yükleme ${loadHours.toFixed(1)}h, tahliye ${dischargeHours.toFixed(1)}h. ${status}`;
    }
  },
  bunker: {
    fields: [
      { id: "seaDays", label: "Seyir süresi (gün)", value: 12 },
      { id: "seaCons", label: "Seyir tüketimi (mt/gün)", value: 28 },
      { id: "portDays", label: "Liman süresi (gün)", value: 4 },
      { id: "portCons", label: "Liman tüketimi (mt/gün)", value: 4 },
      { id: "price", label: "Bunker fiyatı ($/mt)", value: verifiedBunkerSnapshot.ports.singapore.vlsfo },
      { id: "margin", label: "Emniyet payı (%)", value: 5 }
    ],
    calculate: ({ seaDays, seaCons, portDays, portCons, price, margin }) => {
      const tons = (seaDays * seaCons + portDays * portCons) * (1 + margin / 100);
      const total = tons * price;
      return `Bunker ihtiyacı: ${tons.toFixed(1)} mt. Tahmini maliyet: ${money(total)}.`;
    }
  },
  demurrage: {
    fields: [
      { id: "allowedHours", label: "İzinli laytime (saat)", value: 72 },
      { id: "usedHours", label: "Kullanılan süre (saat)", value: 86 },
      { id: "demurrageRate", label: "Demurrage günlük ($)", value: 15000 },
      { id: "dispatchRate", label: "Dispatch günlük ($)", value: 7500 }
    ],
    calculate: ({ allowedHours, usedHours, demurrageRate, dispatchRate }) => {
      const balance = usedHours - allowedHours;
      if (balance > 0) return `Demurrage: ${balance.toFixed(1)} saat aşım · ${money((balance / 24) * demurrageRate)}.`;
      if (balance < 0) return `Dispatch: ${Math.abs(balance).toFixed(1)} saat tasarruf · ${money((Math.abs(balance) / 24) * dispatchRate)}.`;
      return "Laytime tam kullanıldı. Demurrage veya dispatch yok.";
    }
  },
  dispatch: {
    fields: [
      { id: "savedHours", label: "Tasarruf edilen süre (saat)", value: 18 },
      { id: "dispatchRate", label: "Dispatch günlük ($)", value: 7500 },
      { id: "commission", label: "Brokerage / komisyon (%)", value: 2.5 }
    ],
    calculate: ({ savedHours, dispatchRate, commission }) => {
      const gross = (savedHours / 24) * dispatchRate;
      const net = gross * (1 - commission / 100);
      return `Gross dispatch: ${money(gross)}. Komisyon sonrası net: ${money(net)}.`;
    }
  },
  freight: {
    fields: [
      {
        id: "cargoType",
        label: "Yük tipi",
        type: "select",
        value: "coal",
        options: [
          ["grain", "Tahıl / Grain"],
          ["coal", "Kömür / Coal"],
          ["container", "Konteyner / Container"],
          ["ironOre", "Demir Cevheri"],
          ["crudeOil", "Crude Oil"],
          ["lng", "LNG"],
          ["chemicals", "Chemicals"],
          ["projectCargo", "Project Cargo"]
        ]
      },
      { id: "quantity", label: "Yük miktarı (ton)", value: 52000 },
      { id: "rate", label: "Freight rate ($/ton)", value: 18.5 },
      { id: "commission", label: "Komisyon (%)", value: 2.5 }
    ],
    calculate: ({ cargoType, quantity, rate, commission }) => {
      const cargo = getCargoProfile(cargoType);
      const adjustedRate = (rate || cargo.baseFreight) * cargo.freightMultiplier;
      const gross = quantity * adjustedRate;
      const net = gross * (1 - commission / 100);
      return `${cargo.label}: adjusted freight ${money(adjustedRate, 2)}/${cargo.unit}. Brüt freight: ${money(gross)}; broker commission sonrası net: ${money(net)}.`;
    }
  },
  hire: {
    fields: [
      { id: "dailyHire", label: "Daily hire ($/gün)", value: 14500 },
      { id: "days", label: "Charter süresi (gün)", value: 18 },
      { id: "offhireHours", label: "Off-hire (saat)", value: 6 },
      { id: "commission", label: "Commission (%)", value: 2.5 }
    ],
    calculate: ({ dailyHire, days, offhireHours, commission }) => {
      const gross = dailyHire * days;
      const offhire = (offhireHours / 24) * dailyHire;
      const net = (gross - offhire) * (1 - commission / 100);
      return `Gross hire: ${money(gross)}. Off-hire deduction: ${money(offhire)}. Net hire: ${money(net)}.`;
    }
  },
  tce: {
    fields: [
      { id: "grossFreight", label: "Gross freight ($)", value: 962000 },
      { id: "brokerage", label: "Brokerage (%)", value: 2.5 },
      { id: "bunkerCost", label: "Bunker cost ($)", value: 298000 },
      { id: "portCost", label: "Port cost ($)", value: 68000 },
      { id: "canalCost", label: "Canal / other cost ($)", value: 0 },
      { id: "voyageDays", label: "Voyage days", value: 22.5 }
    ],
    calculate: ({ grossFreight, brokerage, bunkerCost, portCost, canalCost, voyageDays }) => {
      if (!voyageDays) return "Voyage days 0 olamaz.";
      const commission = grossFreight * (brokerage / 100);
      const netRevenue = grossFreight - commission - bunkerCost - portCost - canalCost;
      const tce = netRevenue / voyageDays;
      return `Net voyage revenue: ${money(netRevenue)}. TCE: ${money(tce)}/gün. Brokerage: ${money(commission)}.`;
    }
  },
  voyage: {
    fields: [
      {
        id: "cargoType",
        label: "Yük tipi",
        type: "select",
        value: "coal",
        options: [
          ["grain", "Tahıl / Grain"],
          ["coal", "Kömür / Coal"],
          ["container", "Konteyner / Container"],
          ["ironOre", "Demir Cevheri"],
          ["crudeOil", "Crude Oil"],
          ["lng", "LNG"],
          ["chemicals", "Chemicals"],
          ["projectCargo", "Project Cargo"]
        ]
      },
      { id: "distance", label: "Distance (nm)", value: 5820 },
      { id: "speed", label: "Speed (kn)", value: 13.5 },
      { id: "cargoQty", label: "Cargo qty (mt)", value: 52000 },
      { id: "freightRate", label: "Freight rate ($/mt)", value: 18.5 },
      { id: "seaCons", label: "Sea cons (mt/day)", value: 28 },
      { id: "portCons", label: "Port cons (mt/day)", value: 4 },
      { id: "portDays", label: "Port days", value: 4.5 },
      { id: "bunkerPrice", label: "Bunker price ($/mt)", value: verifiedBunkerSnapshot.ports.singapore.vlsfo },
      { id: "portCosts", label: "Port costs ($)", value: 68000 },
      { id: "canalCosts", label: "Canal costs ($)", value: 0 },
      { id: "dailyHire", label: "Daily hire ($)", value: 14500 },
      { id: "commission", label: "Commission (%)", value: 2.5 }
    ],
    calculate: (values) => {
      const estimate = calculateVoyageEstimate(values);
      return `${estimate.cargo.label}: adjusted rate ${money(estimate.adjustedFreightRate, 2)}/${estimate.cargo.unit} · Sea ${estimate.seaDays.toFixed(1)} gün · Total ${estimate.totalDays.toFixed(1)} gün · TCE ${money(estimate.tce)}/gün · Net P&L ${money(estimate.netPnl)}.`;
    }
  }
};

const vesselInfo = document.querySelector("#vesselInfo");
const shipButtons = document.querySelectorAll(".ship");
const portButtons = document.querySelectorAll(".port, [data-port-card]");
const calculatorForm = document.querySelector("#calculatorForm");
const calculatorResult = document.querySelector("#calculatorResult");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatWindow = document.querySelector("#chatWindow");
const aiActions = document.querySelector("#aiActions");
const aiMiniForm = document.querySelector("#aiMiniForm");
const aiResult = document.querySelector("#aiResult");
const routeForm = document.querySelector("#routeForm");
const routeResult = document.querySelector("#routeResult");
const cvForm = document.querySelector("#cvForm");
const cvPreview = document.querySelector("#cvPreview");
const portDetail = document.querySelector("#portDetail");
const globalPortSearchForm = document.querySelector("#globalPortSearchForm");
const globalPortRegionFilter = document.querySelector("#globalPortRegionFilter");
const globalPortStats = document.querySelector("#globalPortStats");
const globalPortList = document.querySelector("#globalPortList");
const globalPortDetail = document.querySelector("#globalPortDetail");
const globalPortImportForm = document.querySelector("#globalPortImportForm");
const globalPortImportResult = document.querySelector("#globalPortImportResult");
const finderForm = document.querySelector("#finderForm");
const finderResult = document.querySelector("#finderResult");
const wikiForm = document.querySelector("#wikiForm");
const wikiSearch = document.querySelector("#wikiSearch");
const wikiResult = document.querySelector("#wikiResult");
const lessonDetail = document.querySelector("#lessonDetail");
const downloadCv = document.querySelector("#downloadCv");
const newsGrid = document.querySelector("#newsGrid");
const newsStatus = document.querySelector("#newsStatus");
const refreshNews = document.querySelector("#refreshNews");
const smartSearchForm = document.querySelector("#smartSearchForm");
const smartSearchInput = document.querySelector("#smartSearchInput");
const smartSearchResults = document.querySelector("#smartSearchResults");
const readinessChecklist = document.querySelector("#readinessChecklist");
const readinessScore = document.querySelector("#readinessScore");
const readinessBar = document.querySelector("#readinessBar");
const opsReport = document.querySelector("#opsReport");
const opsRiskLevel = document.querySelector("#opsRiskLevel");
const downloadOpsReport = document.querySelector("#downloadOpsReport");
const commandDeckPanel = document.querySelector("#commandDeck");
const commandDeckScore = document.querySelector("#commandDeckScore");
const commandDeckDecision = document.querySelector("#commandDeckDecision");
const commandDeckPnl = document.querySelector("#commandDeckPnl");
const commandDeckPnlNote = document.querySelector("#commandDeckPnlNote");
const commandDeckTce = document.querySelector("#commandDeckTce");
const commandDeckTceNote = document.querySelector("#commandDeckTceNote");
const commandDeckEta = document.querySelector("#commandDeckEta");
const commandDeckEtaNote = document.querySelector("#commandDeckEtaNote");
const commandDeckDocCount = document.querySelector("#commandDeckDocCount");
const commandDeckDocNote = document.querySelector("#commandDeckDocNote");
const commandDeckTimeline = document.querySelector("#commandDeckTimeline");
const commandDeckBrief = document.querySelector("#commandDeckBrief");
const commandDeckDocuments = document.querySelector("#commandDeckDocuments");
const commandScenarioButtons = document.querySelectorAll("[data-command-scenario]");
const downloadCommandDeckReport = document.querySelector("#downloadCommandDeckReport");
const startPresentationMode = document.querySelector("#startPresentationMode");
const commandPresentationButtons = document.querySelectorAll("[data-command-presentation]");
const presentationStrip = document.querySelector("#presentationStrip");
const fixtureForm = document.querySelector("#fixtureForm");
const fixtureResult = document.querySelector("#fixtureResult");
const voyageEstimateForm = document.querySelector("#voyageEstimateForm");
const voyageEstimateResult = document.querySelector("#voyageEstimateResult");
const laytimeStatementForm = document.querySelector("#laytimeStatementForm");
const laytimeStatementResult = document.querySelector("#laytimeStatementResult");
const negotiationForm = document.querySelector("#negotiationForm");
const negotiationResult = document.querySelector("#negotiationResult");
const clauseForm = document.querySelector("#clauseForm");
const clauseResult = document.querySelector("#clauseResult");
const laytimeGeneratorForm = document.querySelector("#laytimeGeneratorForm");
const laytimeGeneratorResult = document.querySelector("#laytimeGeneratorResult");
const printLaytime = document.querySelector("#printLaytime");
const downloadBrokerMail = document.querySelector("#downloadBrokerMail");
const voyageProForm = document.querySelector("#voyageProForm");
const voyageProResult = document.querySelector("#voyageProResult");
const cargoMatchForm = document.querySelector("#cargoMatchForm");
const cargoMatchResult = document.querySelector("#cargoMatchResult");
const portCostForm = document.querySelector("#portCostForm");
const portCostResult = document.querySelector("#portCostResult");
const offerTrackerForm = document.querySelector("#offerTrackerForm");
const offerTrackerResult = document.querySelector("#offerTrackerResult");
const rateMatrixForm = document.querySelector("#rateMatrixForm");
const rateMatrixResult = document.querySelector("#rateMatrixResult");
const sensitivityForm = document.querySelector("#sensitivityForm");
const sensitivityResult = document.querySelector("#sensitivityResult");
const robPlannerForm = document.querySelector("#robPlannerForm");
const robPlannerResult = document.querySelector("#robPlannerResult");
const restrictionForm = document.querySelector("#restrictionForm");
const restrictionResult = document.querySelector("#restrictionResult");
const complianceForm = document.querySelector("#complianceForm");
const complianceResult = document.querySelector("#complianceResult");
const etsForm = document.querySelector("#etsForm");
const etsResult = document.querySelector("#etsResult");
const cpTemplateForm = document.querySelector("#cpTemplateForm");
const cpTemplateResult = document.querySelector("#cpTemplateResult");
const crmForm = document.querySelector("#crmForm");
const crmResult = document.querySelector("#crmResult");
const dailyBriefForm = document.querySelector("#dailyBriefForm");
const dailyBriefResult = document.querySelector("#dailyBriefResult");
const emailGeneratorForm = document.querySelector("#emailGeneratorForm");
const emailGeneratorResult = document.querySelector("#emailGeneratorResult");
const downloadOpsEmail = document.querySelector("#downloadOpsEmail");
const documentVaultForm = document.querySelector("#documentVaultForm");
const documentVaultResult = document.querySelector("#documentVaultResult");
const sofAnalyzerForm = document.querySelector("#sofAnalyzerForm");
const sofAnalyzerResult = document.querySelector("#sofAnalyzerResult");
const disputeRiskForm = document.querySelector("#disputeRiskForm");
const disputeRiskResult = document.querySelector("#disputeRiskResult");
const compatibilityForm = document.querySelector("#compatibilityForm");
const compatibilityResult = document.querySelector("#compatibilityResult");
const profileForm = document.querySelector("#profileForm");
const saveWorkspace = document.querySelector("#saveWorkspace");
const loadWorkspace = document.querySelector("#loadWorkspace");
const clearWorkspace = document.querySelector("#clearWorkspace");
const workspaceStatus = document.querySelector("#workspaceStatus");
const exportResult = document.querySelector("#exportResult");
const kanbanBoard = document.querySelector("#kanbanBoard");
const notificationCenter = document.querySelector("#notificationCenter");
const databaseForm = document.querySelector("#databaseForm");
const databaseResult = document.querySelector("#databaseResult");
const analyticsResult = document.querySelector("#analyticsResult");
const adminForm = document.querySelector("#adminForm");
const adminResult = document.querySelector("#adminResult");
const refreshDataSources = document.querySelector("#refreshDataSources");
const dataSourcesResult = document.querySelector("#dataSourcesResult");
const brokerCopilotForm = document.querySelector("#brokerCopilotForm");
const brokerCopilotResult = document.querySelector("#brokerCopilotResult");
const applyCopilotToOffer = document.querySelector("#applyCopilotToOffer");
const offerParserForm = document.querySelector("#offerParserForm");
const offerParserResult = document.querySelector("#offerParserResult");
const applyParsedOffer = document.querySelector("#applyParsedOffer");
const tceOptimizerForm = document.querySelector("#tceOptimizerForm");
const tceOptimizerResult = document.querySelector("#tceOptimizerResult");
const riskRadarForm = document.querySelector("#riskRadarForm");
const riskRadarResult = document.querySelector("#riskRadarResult");
const refreshMarketBrief = document.querySelector("#refreshMarketBrief");
const marketBriefResult = document.querySelector("#marketBriefResult");
const marketIndexForm = document.querySelector("#marketIndexForm");
const marketIndexGrid = document.querySelector("#marketIndexGrid");
const marketIndexDetail = document.querySelector("#marketIndexDetail");
const balticFeedForm = document.querySelector("#balticFeedForm");
const balticFeedResult = document.querySelector("#balticFeedResult");
const dataTrustLayer = document.querySelector("#dataTrustLayer");
const securityScanForm = document.querySelector("#securityScanForm");
const securityShieldResult = document.querySelector("#securityShieldResult");
const redFlagForm = document.querySelector("#redFlagForm");
const redFlagResult = document.querySelector("#redFlagResult");
const recapBuilderForm = document.querySelector("#recapBuilderForm");
const recapBuilderResult = document.querySelector("#recapBuilderResult");
const evidencePackForm = document.querySelector("#evidencePackForm");
const evidencePackResult = document.querySelector("#evidencePackResult");
const companyIntelForm = document.querySelector("#companyIntelForm");
const companyIntelResult = document.querySelector("#companyIntelResult");
const cargoIntelForm = document.querySelector("#cargoIntelForm");
const cargoIntelResult = document.querySelector("#cargoIntelResult");
const dealRoomForm = document.querySelector("#dealRoomForm");
const dealRoomResult = document.querySelector("#dealRoomResult");
const importForm = document.querySelector("#importForm");
const importResult = document.querySelector("#importResult");
const pushImportToInbox = document.querySelector("#pushImportToInbox");
const brokerInboxForm = document.querySelector("#brokerInboxForm");
const brokerInboxResult = document.querySelector("#brokerInboxResult");
const recapCheckerForm = document.querySelector("#recapCheckerForm");
const recapCheckerResult = document.querySelector("#recapCheckerResult");
const clauseLibraryForm = document.querySelector("#clauseLibraryForm");
const clauseLibraryResult = document.querySelector("#clauseLibraryResult");
const claimBuilderForm = document.querySelector("#claimBuilderForm");
const claimBuilderResult = document.querySelector("#claimBuilderResult");
const portIntelProForm = document.querySelector("#portIntelProForm");
const portIntelProResult = document.querySelector("#portIntelProResult");
const turkiyePortIntelForm = document.querySelector("#turkiyePortIntelForm");
const turkiyePortIntelResult = document.querySelector("#turkiyePortIntelResult");
const turkiyeSofNorForm = document.querySelector("#turkiyeSofNorForm");
const turkiyeSofNorResult = document.querySelector("#turkiyeSofNorResult");
const turkiyeCostForm = document.querySelector("#turkiyeCostForm");
const turkiyeCostResult = document.querySelector("#turkiyeCostResult");
const cabotageForm = document.querySelector("#cabotageForm");
const cabotageResult = document.querySelector("#cabotageResult");
const officialImportProForm = document.querySelector("#officialImportProForm");
const officialImportProResult = document.querySelector("#officialImportProResult");
const cargoPortSuitabilityForm = document.querySelector("#cargoPortSuitabilityForm");
const cargoPortSuitabilityResult = document.querySelector("#cargoPortSuitabilityResult");
const cargoPlaybookForm = document.querySelector("#cargoPlaybookForm");
const cargoPlaybookResult = document.querySelector("#cargoPlaybookResult");
const tceOptimizer2Form = document.querySelector("#tceOptimizer2Form");
const tceOptimizer2Result = document.querySelector("#tceOptimizer2Result");
const refreshTerminalAlarms = document.querySelector("#refreshTerminalAlarms");
const terminalAlarmResult = document.querySelector("#terminalAlarmResult");
const backendWorkspaceForm = document.querySelector("#backendWorkspaceForm");
const backendWorkspaceResult = document.querySelector("#backendWorkspaceResult");
const adminProForm = document.querySelector("#adminProForm");
const adminProResult = document.querySelector("#adminProResult");
const pageNavLinks = document.querySelectorAll("[data-page-link]");
const timelineForm = document.querySelector("#timelineForm");
const timelineResult = document.querySelector("#timelineResult");
const fixtureImportProForm = document.querySelector("#fixtureImportProForm");
const fixtureImportProResult = document.querySelector("#fixtureImportProResult");
const pushFixtureProToInbox = document.querySelector("#pushFixtureProToInbox");
const clauseNegotiationForm = document.querySelector("#clauseNegotiationForm");
const clauseNegotiationResult = document.querySelector("#clauseNegotiationResult");
const profitRadarForm = document.querySelector("#profitRadarForm");
const profitRadarResult = document.querySelector("#profitRadarResult");
const refreshMarketConfidence = document.querySelector("#refreshMarketConfidence");
const marketConfidenceResult = document.querySelector("#marketConfidenceResult");
const documentAiForm = document.querySelector("#documentAiForm");
const documentAiResult = document.querySelector("#documentAiResult");
const counterpartyIntelForm = document.querySelector("#counterpartyIntelForm");
const counterpartyIntelResult = document.querySelector("#counterpartyIntelResult");
const pricingEngineForm = document.querySelector("#pricingEngineForm");
const pricingEngineResult = document.querySelector("#pricingEngineResult");
const emailGeneratorProForm = document.querySelector("#emailGeneratorProForm");
const emailGeneratorProResult = document.querySelector("#emailGeneratorProResult");
const dealComparisonForm = document.querySelector("#dealComparisonForm");
const dealComparisonResult = document.querySelector("#dealComparisonResult");
const refreshEdgeAlarms = document.querySelector("#refreshEdgeAlarms");
const edgeAlarmResult = document.querySelector("#edgeAlarmResult");
const refreshDailyBriefPro = document.querySelector("#refreshDailyBriefPro");
const dailyBriefProResult = document.querySelector("#dailyBriefProResult");
const charteringCrmProForm = document.querySelector("#charteringCrmProForm");
const charteringCrmProResult = document.querySelector("#charteringCrmProResult");
const claimDisputeCenterForm = document.querySelector("#claimDisputeCenterForm");
const claimDisputeCenterResult = document.querySelector("#claimDisputeCenterResult");
const portAgencyWorkspaceForm = document.querySelector("#portAgencyWorkspaceForm");
const portAgencyWorkspaceResult = document.querySelector("#portAgencyWorkspaceResult");
const complianceTerminalForm = document.querySelector("#complianceTerminalForm");
const complianceTerminalResult = document.querySelector("#complianceTerminalResult");
const financeDeskForm = document.querySelector("#financeDeskForm");
const financeDeskResult = document.querySelector("#financeDeskResult");
const documentHubForm = document.querySelector("#documentHubForm");
const documentHubResult = document.querySelector("#documentHubResult");
const certificateModeForm = document.querySelector("#certificateModeForm");
const certificateModeResult = document.querySelector("#certificateModeResult");
const cargoIntelligenceProForm = document.querySelector("#cargoIntelligenceProForm");
const cargoIntelligenceProResult = document.querySelector("#cargoIntelligenceProResult");
const sustainabilityDeskForm = document.querySelector("#sustainabilityDeskForm");
const sustainabilityDeskResult = document.querySelector("#sustainabilityDeskResult");
const clientPortalForm = document.querySelector("#clientPortalForm");
const clientPortalResult = document.querySelector("#clientPortalResult");
const runBrokerOs = document.querySelector("#runBrokerOs");
const brokerOsHeadline = document.querySelector("#brokerOsHeadline");
const brokerOsSummary = document.querySelector("#brokerOsSummary");
const osDealRoomForm = document.querySelector("#osDealRoomForm");
const osDealRoomResult = document.querySelector("#osDealRoomResult");
const osParserForm = document.querySelector("#osParserForm");
const osParserResult = document.querySelector("#osParserResult");
const osPushParserToKanban = document.querySelector("#osPushParserToKanban");
const osSofEngineForm = document.querySelector("#osSofEngineForm");
const osSofEngineResult = document.querySelector("#osSofEngineResult");
const osKanbanForm = document.querySelector("#osKanbanForm");
const osKanbanResult = document.querySelector("#osKanbanResult");
const osCounterpartyForm = document.querySelector("#osCounterpartyForm");
const osCounterpartyResult = document.querySelector("#osCounterpartyResult");
const osCargoPlaybookForm = document.querySelector("#osCargoPlaybookForm");
const osCargoPlaybookResult = document.querySelector("#osCargoPlaybookResult");
const osRiskRadarForm = document.querySelector("#osRiskRadarForm");
const osRiskRadarResult = document.querySelector("#osRiskRadarResult");
const osExportCenterResult = document.querySelector("#osExportCenterResult");
const osAdminPanelForm = document.querySelector("#osAdminPanelForm");
const osAdminPanelResult = document.querySelector("#osAdminPanelResult");
const osClientPortalForm = document.querySelector("#osClientPortalForm");
const osClientPortalResult = document.querySelector("#osClientPortalResult");
const runAutopilot = document.querySelector("#runAutopilot");
const autopilotHeadline = document.querySelector("#autopilotHeadline");
const autopilotSummary = document.querySelector("#autopilotSummary");
const autopilotInboxForm = document.querySelector("#autopilotInboxForm");
const autopilotInboxResult = document.querySelector("#autopilotInboxResult");
const autopilotPushInbox = document.querySelector("#autopilotPushInbox");
const autopilotDealRoomForm = document.querySelector("#autopilotDealRoomForm");
const autopilotDealRoomResult = document.querySelector("#autopilotDealRoomResult");
const autopilotDocumentPackForm = document.querySelector("#autopilotDocumentPackForm");
const autopilotDocumentPackResult = document.querySelector("#autopilotDocumentPackResult");
const autopilotVoyageOptimizerForm = document.querySelector("#autopilotVoyageOptimizerForm");
const autopilotVoyageOptimizerResult = document.querySelector("#autopilotVoyageOptimizerResult");
const autopilotCarbonForm = document.querySelector("#autopilotCarbonForm");
const autopilotCarbonResult = document.querySelector("#autopilotCarbonResult");
const autopilotWeatherForm = document.querySelector("#autopilotWeatherForm");
const autopilotWeatherResult = document.querySelector("#autopilotWeatherResult");
const autopilotPortAgencyForm = document.querySelector("#autopilotPortAgencyForm");
const autopilotPortAgencyResult = document.querySelector("#autopilotPortAgencyResult");
const autopilotCounterpartyForm = document.querySelector("#autopilotCounterpartyForm");
const autopilotCounterpartyResult = document.querySelector("#autopilotCounterpartyResult");
const autopilotClauseBattleForm = document.querySelector("#autopilotClauseBattleForm");
const autopilotClauseBattleResult = document.querySelector("#autopilotClauseBattleResult");
const autopilotClientPortalForm = document.querySelector("#autopilotClientPortalForm");
const autopilotClientPortalResult = document.querySelector("#autopilotClientPortalResult");
const runDealIq = document.querySelector("#runDealIq");
const dealIqHeadline = document.querySelector("#dealIqHeadline");
const dealIqSummary = document.querySelector("#dealIqSummary");
const warRoomForm = document.querySelector("#warRoomForm");
const warRoomResult = document.querySelector("#warRoomResult");
const comparableFixtureForm = document.querySelector("#comparableFixtureForm");
const comparableFixtureResult = document.querySelector("#comparableFixtureResult");
const addComparableFixture = document.querySelector("#addComparableFixture");
const timeBarCalendarForm = document.querySelector("#timeBarCalendarForm");
const timeBarCalendarResult = document.querySelector("#timeBarCalendarResult");
const cpDiffForm = document.querySelector("#cpDiffForm");
const cpDiffResult = document.querySelector("#cpDiffResult");
const vesselSuitabilityForm = document.querySelector("#vesselSuitabilityForm");
const vesselSuitabilityResult = document.querySelector("#vesselSuitabilityResult");
const negotiationScoreForm = document.querySelector("#negotiationScoreForm");
const negotiationScoreResult = document.querySelector("#negotiationScoreResult");
const portCallTimelineForm = document.querySelector("#portCallTimelineForm");
const portCallTimelineResult = document.querySelector("#portCallTimelineResult");
const claimEvidenceForm = document.querySelector("#claimEvidenceForm");
const claimEvidenceResult = document.querySelector("#claimEvidenceResult");
const marketAlertForm = document.querySelector("#marketAlertForm");
const marketAlertResult = document.querySelector("#marketAlertResult");
const reportCenterResult = document.querySelector("#reportCenterResult");
const runDecisionLab = document.querySelector("#runDecisionLab");
const decisionLabHeadline = document.querySelector("#decisionLabHeadline");
const decisionLabSummary = document.querySelector("#decisionLabSummary");
const autoDealProcessorForm = document.querySelector("#autoDealProcessorForm");
const autoDealProcessorResult = document.querySelector("#autoDealProcessorResult");
const applyAutoDealToTracker = document.querySelector("#applyAutoDealToTracker");
const fixtureDoctorForm = document.querySelector("#fixtureDoctorForm");
const fixtureDoctorResult = document.querySelector("#fixtureDoctorResult");
const cpBattleForm = document.querySelector("#cpBattleForm");
const cpBattleResult = document.querySelector("#cpBattleResult");
const timeBarForm = document.querySelector("#timeBarForm");
const timeBarResult = document.querySelector("#timeBarResult");
const rateMemoryForm = document.querySelector("#rateMemoryForm");
const rateMemoryResult = document.querySelector("#rateMemoryResult");
const addRateMemory = document.querySelector("#addRateMemory");
const performanceForm = document.querySelector("#performanceForm");
const performanceResult = document.querySelector("#performanceResult");
const emailInboxSimulatorForm = document.querySelector("#emailInboxSimulatorForm");
const emailInboxSimulatorResult = document.querySelector("#emailInboxSimulatorResult");
const pushSimulatedEmail = document.querySelector("#pushSimulatedEmail");
const recapToCpForm = document.querySelector("#recapToCpForm");
const recapToCpResult = document.querySelector("#recapToCpResult");
const whatIfForm = document.querySelector("#whatIfForm");
const whatIfResult = document.querySelector("#whatIfResult");
const disputeSimulatorForm = document.querySelector("#disputeSimulatorForm");
const disputeSimulatorResult = document.querySelector("#disputeSimulatorResult");
const watchlistForm = document.querySelector("#watchlistForm");
const watchlistResult = document.querySelector("#watchlistResult");
const addWatchlistCompany = document.querySelector("#addWatchlistCompany");
const portHeatmapForm = document.querySelector("#portHeatmapForm");
const portHeatmapResult = document.querySelector("#portHeatmapResult");
const brokerExamForm = document.querySelector("#brokerExamForm");
const brokerExamResult = document.querySelector("#brokerExamResult");
const runSuperSuite = document.querySelector("#runSuperSuite");
const superSuiteHeadline = document.querySelector("#superSuiteHeadline");
const superSuiteSummary = document.querySelector("#superSuiteSummary");
const superSuiteForm = document.querySelector("#superSuiteForm");
const superSuiteResult = document.querySelector("#superSuiteResult");
const superTerminalNoteForm = document.querySelector("#superTerminalNoteForm");
const superTerminalNotesResult = document.querySelector("#superTerminalNotesResult");
const clearSuperNotes = document.querySelector("#clearSuperNotes");
const superReportHistory = document.querySelector("#superReportHistory");
const superFeatureGrid = document.querySelector("#superFeatureGrid");
const superBuildQueue = document.querySelector("#superBuildQueue");
const theaterScenarioButtons = document.querySelectorAll("[data-theater-scenario]");
const theaterHeadline = document.querySelector("#theaterHeadline");
const theaterSummary = document.querySelector("#theaterSummary");
const theaterScore = document.querySelector("#theaterScore");
const theaterDecision = document.querySelector("#theaterDecision");
const theaterStory = document.querySelector("#theaterStory");
const theaterRadar = document.querySelector("#theaterRadar");
const theaterProof = document.querySelector("#theaterProof");
const theaterScript = document.querySelector("#theaterScript");
const theaterMatrix = document.querySelector("#theaterMatrix");
const workflowGateForm = document.querySelector("#workflowGateForm");
const workflowGateResult = document.querySelector("#workflowGateResult");
const dealGraphResult = document.querySelector("#dealGraphResult");
const marketMemoryForm = document.querySelector("#marketMemoryForm");
const marketMemoryResult = document.querySelector("#marketMemoryResult");
const saveMarketMemory = document.querySelector("#saveMarketMemory");
const clearMarketMemory = document.querySelector("#clearMarketMemory");
const documentRedTeamForm = document.querySelector("#documentRedTeamForm");
const documentRedTeamResult = document.querySelector("#documentRedTeamResult");
const portRealityForm = document.querySelector("#portRealityForm");
const portRealityResult = document.querySelector("#portRealityResult");
const weatherLaytimeForm = document.querySelector("#weatherLaytimeForm");
const weatherLaytimeResult = document.querySelector("#weatherLaytimeResult");
const carbonDeskForm = document.querySelector("#carbonDeskForm");
const carbonDeskResult = document.querySelector("#carbonDeskResult");
const workflowClientPortalForm = document.querySelector("#workflowClientPortalForm");
const workflowClientPortalResult = document.querySelector("#workflowClientPortalResult");
const negotiationProForm = document.querySelector("#negotiationProForm");
const negotiationProResult = document.querySelector("#negotiationProResult");
const workflowConfidenceResult = document.querySelector("#workflowConfidenceResult");
const workflowInboxForm = document.querySelector("#workflowInboxForm");
const workflowInboxResult = document.querySelector("#workflowInboxResult");
const saveWorkflowInbox = document.querySelector("#saveWorkflowInbox");
const clearWorkflowInbox = document.querySelector("#clearWorkflowInbox");
const workflowDealRoomForm = document.querySelector("#workflowDealRoomForm");
const workflowDealRoomResult = document.querySelector("#workflowDealRoomResult");
const workflowOcrForm = document.querySelector("#workflowOcrForm");
const workflowOcrResult = document.querySelector("#workflowOcrResult");
const workflowTimeBarForm = document.querySelector("#workflowTimeBarForm");
const workflowTimeBarResult = document.querySelector("#workflowTimeBarResult");
const workflowVettingForm = document.querySelector("#workflowVettingForm");
const workflowVettingResult = document.querySelector("#workflowVettingResult");
const workflowClauseVersionForm = document.querySelector("#workflowClauseVersionForm");
const workflowClauseVersionResult = document.querySelector("#workflowClauseVersionResult");
const workflowCounterForm = document.querySelector("#workflowCounterForm");
const workflowCounterResult = document.querySelector("#workflowCounterResult");
const workflowWhatIfForm = document.querySelector("#workflowWhatIfForm");
const workflowWhatIfResult = document.querySelector("#workflowWhatIfResult");
const refreshWorkflowMission = document.querySelector("#refreshWorkflowMission");
const workflowMissionResult = document.querySelector("#workflowMissionResult");
const workflowCommunityForm = document.querySelector("#workflowCommunityForm");
const workflowCommunityResult = document.querySelector("#workflowCommunityResult");
const saveWorkflowCommunity = document.querySelector("#saveWorkflowCommunity");
const clearWorkflowCommunity = document.querySelector("#clearWorkflowCommunity");
const workflowScoreResult = document.querySelector("#workflowScoreResult");
const workflowSofForm = document.querySelector("#workflowSofForm");
const workflowSofResult = document.querySelector("#workflowSofResult");
const workflowReportCenterResult = document.querySelector("#workflowReportCenterResult");
const saveWorkflowReport = document.querySelector("#saveWorkflowReport");
const clearWorkflowReports = document.querySelector("#clearWorkflowReports");
const workflowPortalProForm = document.querySelector("#workflowPortalProForm");
const workflowPortalProResult = document.querySelector("#workflowPortalProResult");
const workflowCounterpartyForm = document.querySelector("#workflowCounterpartyForm");
const workflowCounterpartyResult = document.querySelector("#workflowCounterpartyResult");
const workflowAgencyForm = document.querySelector("#workflowAgencyForm");
const workflowAgencyResult = document.querySelector("#workflowAgencyResult");
const workflowMailStudioForm = document.querySelector("#workflowMailStudioForm");
const workflowMailStudioResult = document.querySelector("#workflowMailStudioResult");
const workflowComparisonForm = document.querySelector("#workflowComparisonForm");
const workflowComparisonResult = document.querySelector("#workflowComparisonResult");
const workflowTrustLedgerResult = document.querySelector("#workflowTrustLedgerResult");
const workflowBackendConnectorResult = document.querySelector("#workflowBackendConnectorResult");
const runSaasCore = document.querySelector("#runSaasCore");
const saasAccountForm = document.querySelector("#saasAccountForm");
const saasAccountResult = document.querySelector("#saasAccountResult");
const clearSaasWorkspace = document.querySelector("#clearSaasWorkspace");
const saasDocumentForm = document.querySelector("#saasDocumentForm");
const saasDocumentResult = document.querySelector("#saasDocumentResult");
const refreshSaasDealRoom = document.querySelector("#refreshSaasDealRoom");
const saasDealRoomResult = document.querySelector("#saasDealRoomResult");
const saasAlarmForm = document.querySelector("#saasAlarmForm");
const saasAlarmResult = document.querySelector("#saasAlarmResult");
const saasEmailForm = document.querySelector("#saasEmailForm");
const saasEmailResult = document.querySelector("#saasEmailResult");
const saasAdminForm = document.querySelector("#saasAdminForm");
const saasAdminResult = document.querySelector("#saasAdminResult");
const saasMarketSourceForm = document.querySelector("#saasMarketSourceForm");
const saasMarketSourceResult = document.querySelector("#saasMarketSourceResult");
const saasContractMemoryForm = document.querySelector("#saasContractMemoryForm");
const saasContractMemoryResult = document.querySelector("#saasContractMemoryResult");
const saveSaasContract = document.querySelector("#saveSaasContract");
const clearSaasContracts = document.querySelector("#clearSaasContracts");
const saasClientPortalForm = document.querySelector("#saasClientPortalForm");
const saasClientPortalResult = document.querySelector("#saasClientPortalResult");
const refreshSaasAnalytics = document.querySelector("#refreshSaasAnalytics");
const saasAnalyticsResult = document.querySelector("#saasAnalyticsResult");
const saasSecurityResult = document.querySelector("#saasSecurityResult");
const saasBackendBlueprintResult = document.querySelector("#saasBackendBlueprintResult");
const runAiCore = document.querySelector("#runAiCore");
const aiAutopilotForm = document.querySelector("#aiAutopilotForm");
const aiAutopilotResult = document.querySelector("#aiAutopilotResult");
const aiKnowledgeGraphResult = document.querySelector("#aiKnowledgeGraphResult");
const aiDealTwinForm = document.querySelector("#aiDealTwinForm");
const aiDealTwinResult = document.querySelector("#aiDealTwinResult");
const aiExplainResult = document.querySelector("#aiExplainResult");
const aiCopilotForm = document.querySelector("#aiCopilotForm");
const aiCopilotResult = document.querySelector("#aiCopilotResult");
const aiRolePortalForm = document.querySelector("#aiRolePortalForm");
const aiRolePortalResult = document.querySelector("#aiRolePortalResult");
const addAiAuditEvent = document.querySelector("#addAiAuditEvent");
const clearAiAudit = document.querySelector("#clearAiAudit");
const aiAuditResult = document.querySelector("#aiAuditResult");
const aiPwaResult = document.querySelector("#aiPwaResult");
const aiDocumentVaultForm = document.querySelector("#aiDocumentVaultForm");
const saveAiVaultDoc = document.querySelector("#saveAiVaultDoc");
const clearAiVault = document.querySelector("#clearAiVault");
const aiDocumentVaultResult = document.querySelector("#aiDocumentVaultResult");
const aiClauseBattleForm = document.querySelector("#aiClauseBattleForm");
const aiClauseBattleResult = document.querySelector("#aiClauseBattleResult");
const aiFixtureSimulatorForm = document.querySelector("#aiFixtureSimulatorForm");
const aiFixtureSimulatorResult = document.querySelector("#aiFixtureSimulatorResult");
const toggleAiPresentation = document.querySelector("#toggleAiPresentation");
const aiPresentationResult = document.querySelector("#aiPresentationResult");
const runProOps = document.querySelector("#runProOps");
const proOpsInboxForm = document.querySelector("#proOpsInboxForm");
const proOpsInboxResult = document.querySelector("#proOpsInboxResult");
const saveProOpsOffer = document.querySelector("#saveProOpsOffer");
const clearProOpsMemory = document.querySelector("#clearProOpsMemory");
const refreshProOpsDealRoom = document.querySelector("#refreshProOpsDealRoom");
const proOpsDealRoomResult = document.querySelector("#proOpsDealRoomResult");
const proOpsAskForm = document.querySelector("#proOpsAskForm");
const proOpsAskResult = document.querySelector("#proOpsAskResult");
const proOpsOcrForm = document.querySelector("#proOpsOcrForm");
const proOpsOcrResult = document.querySelector("#proOpsOcrResult");
const proOpsPortForm = document.querySelector("#proOpsPortForm");
const proOpsPortResult = document.querySelector("#proOpsPortResult");
const proOpsClaimForm = document.querySelector("#proOpsClaimForm");
const proOpsClaimResult = document.querySelector("#proOpsClaimResult");
const proOpsMarketAlarmForm = document.querySelector("#proOpsMarketAlarmForm");
const proOpsMarketAlarmResult = document.querySelector("#proOpsMarketAlarmResult");
const proOpsLoadicatorForm = document.querySelector("#proOpsLoadicatorForm");
const proOpsLoadicatorResult = document.querySelector("#proOpsLoadicatorResult");
const proOpsClientForm = document.querySelector("#proOpsClientForm");
const proOpsClientResult = document.querySelector("#proOpsClientResult");
const proOpsScoreResult = document.querySelector("#proOpsScoreResult");
let activeNewsQuery = "maritime shipping";
let generatedOpsEmailText = "";
let selectedCommandScenarioId = "coal";
let selectedTheaterScenario = "broker";
let commandDeckPresentationActive = false;
let lastCommandDeckReport = "";
let lastTheaterReport = null;
let lastWorkflowGate = null;
let lastDocumentRedTeam = null;
let lastPortReality = null;
let lastWeatherLaytime = null;
let lastCarbonDesk = null;
let lastWorkflowClientPortal = null;
let lastNegotiationPro = null;
let lastWorkflowInbox = null;
let lastWorkflowDealRoom = null;
let lastWorkflowOcr = null;
let lastWorkflowTimeBar = null;
let lastWorkflowVetting = null;
let lastWorkflowClauseVersion = null;
let lastWorkflowCounter = null;
let lastWorkflowWhatIf = null;
let lastWorkflowMission = null;
let lastWorkflowCommunity = null;
let lastFocuseaScore = null;
let lastWorkflowSof = null;
let lastWorkflowPortalPro = null;
let lastWorkflowCounterparty = null;
let lastWorkflowAgency = null;
let lastWorkflowMailStudio = null;
let lastWorkflowComparison = null;
let lastWorkflowTrustLedger = null;
let lastWorkflowBackendConnector = null;
let lastSaasAccount = null;
let lastSaasDocument = null;
let lastSaasDealRoom = null;
let lastSaasAlarm = null;
let lastSaasEmail = null;
let lastSaasAdmin = null;
let lastSaasMarketSource = null;
let lastSaasContractMemory = null;
let lastSaasClientPortal = null;
let lastSaasAnalytics = null;
let lastSaasSecurity = null;
let lastSaasBackendBlueprint = null;
let lastAiAutopilot = null;
let lastAiDealTwin = null;
let lastAiCopilot = null;
let lastAiRolePortal = null;
let lastAiClauseBattle = null;
let lastAiFixtureSimulator = null;
let lastAiPresentation = null;
let lastProOpsOffer = null;
let lastProOpsDealRoom = null;
let lastProOpsAsk = null;
let lastProOpsOcr = null;
let lastProOpsPort = null;
let lastProOpsClaim = null;
let lastProOpsMarketAlarm = null;
let lastProOpsLoadicator = null;
let lastProOpsClient = null;
let lastProOpsScore = null;
let lastParsedOffer = null;
let lastCopilotReport = null;
let lastTceOptimization = null;
let lastRiskRadar = null;
let lastMarketBrief = null;
let selectedMarketIndexId = "bdi";
let lastRedFlagReport = null;
let lastRecapReport = null;
let lastEvidencePack = null;
let lastCompanyIntel = null;
let lastCargoIntel = null;
let lastDealRoom = null;
let lastImportReport = null;
let lastRecapCheck = null;
let lastClaimBuilder = null;
let lastTceOptimizer2 = null;
let lastTurkiyePortIntel = null;
let lastTurkiyeSofNor = null;
let lastTurkiyeCost = null;
let lastCabotage = null;
let lastOfficialImportPro = null;
let lastCargoPortSuitability = null;
let lastBackendWorkspace = null;
let lastAdminPro = null;
let lastFixtureImportPro = null;
let lastClauseNegotiation = null;
let lastProfitRadar = null;
let lastDocumentAi = null;
let lastEmailGeneratorPro = null;
let lastDailyBriefPro = null;
let lastCommercialClaimReport = "";
let lastCertificateReport = "";
let lastClientPortalReport = "";
let lastBrokerOsDealRoom = null;
let lastBrokerOsParsedOffer = null;
let lastBrokerOsSof = null;
let lastBrokerOsCounterparty = null;
let lastBrokerOsCargo = null;
let lastBrokerOsRisk = null;
let lastBrokerOsAdmin = null;
let lastBrokerOsClient = null;
let lastAutopilotInbox = null;
let lastAutopilotDealRoom = null;
let lastAutopilotDocumentPack = null;
let lastAutopilotVoyage = null;
let lastAutopilotCarbon = null;
let lastAutopilotWeather = null;
let lastAutopilotPortAgency = null;
let lastAutopilotCounterparty = null;
let lastAutopilotClause = null;
let lastAutopilotClient = null;
let lastWarRoom = null;
let lastComparableFixtures = null;
let lastTimeBarCalendar = null;
let lastCpDiff = null;
let lastVesselSuitability = null;
let lastNegotiationScore = null;
let lastPortCallTimeline = null;
let lastClaimEvidence = null;
let lastMarketAlert = null;
let lastAutoDealProcessor = null;
let lastFixtureDoctor = null;
let lastCpBattle = null;
let lastTimeBar = null;
let lastRateMemory = null;
let lastPerformance = null;
let lastEmailInboxSimulation = null;
let lastRecapToCp = null;
let lastWhatIf = null;
let lastDisputeSimulation = null;
let lastWatchlist = null;
let lastPortHeatmap = null;
let lastBrokerExam = null;
let lastSuperSuite = null;
let activeSuperFilter = "All";
let decisionRateMemory = [
  { cargoType: "coal", route: "Indonesia / India", freightRate: 18.5, demurrageRate: 18000, fixtureStatus: "Fixed", tce: 21400 },
  { cargoType: "grain", route: "Black Sea / Egypt", freightRate: 24.2, demurrageRate: 16500, fixtureStatus: "On subjects", tce: 18800 },
  { cargoType: "container", route: "Shanghai / Los Angeles", freightRate: 1550, demurrageRate: 32000, fixtureStatus: "Failed", tce: 27600 }
];
let decisionWatchlist = [
  { company: "Northern Bulk Receiver", issue: "Dispute history", severity: "Medium", note: "Late demurrage response and repeated deductions." },
  { company: "Delta Trading House", issue: "Payment delay", severity: "High", note: "Commission invoice paid late twice." }
];
let selectedVesselId = "orion";
let selectedPortId = "istanbul";
let focuseaDb = {
  companies: [
    { name: "Atlas Commodities", type: "Charterer" },
    { name: "BlueSea Owners", type: "Owner" },
    { name: "Focus Maritime", type: "Broker" }
  ],
  fixtures: [
    { cargo: "Coal", route: "Santos / Singapore", tce: 21611, risk: 54 },
    { cargo: "Grain", route: "Odessa / Rotterdam", tce: 18420, risk: 46 },
    { cargo: "Container", route: "Shanghai / LA", tce: 28450, risk: 62 }
  ]
};

const terminalInboxItems = [
  {
    id: "INB-1042",
    status: "New offer",
    priority: "High",
    cargo: "Coal",
    route: "Indonesia / India",
    laycan: "10-15 Jul",
    freight: "$18.50/mt",
    demurrage: "$18,000/day",
    subject: "Stem + receiver approval",
    note: "Narrow laycan, ask owner for clean recap wording."
  },
  {
    id: "INB-1043",
    status: "Counter needed",
    priority: "Medium",
    cargo: "Grain",
    route: "Black Sea / Egypt",
    laycan: "18-22 Jul",
    freight: "$24.20/mt",
    demurrage: "$16,500/day",
    subject: "Board approval",
    note: "Counter freight and clarify weather exception."
  },
  {
    id: "INB-1044",
    status: "Subjects deadline",
    priority: "High",
    cargo: "Container",
    route: "Shanghai / Los Angeles",
    laycan: "05-09 Aug",
    freight: "$1,550/TEU",
    demurrage: "$32,000/day",
    subject: "Terminal window",
    note: "Port congestion and D&D exposure need owner confirmation."
  },
  {
    id: "INB-1045",
    status: "Fixed",
    priority: "Low",
    cargo: "Chemicals",
    route: "Jebel Ali / Rotterdam",
    laycan: "12-16 Aug",
    freight: "$41.00/mt",
    demurrage: "$24,000/day",
    subject: "Subjects lifted",
    note: "Keep tank cleaning certificate in document vault."
  }
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function money(value, maximumFractionDigits = 0) {
  const amount = Number(value || 0);
  const sign = amount < 0 ? "-" : "";
  return `${sign}$${Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: maximumFractionDigits, maximumFractionDigits })}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeExternalUrl(value = "") {
  try {
    const url = new URL(String(value || ""), window.location.href);
    if (["http:", "https:"].includes(url.protocol)) return url.href;
  } catch (error) {
    return "#";
  }
  return "#";
}

function securityFindingsForText(value = "") {
  const text = String(value || "").trim();
  const checks = [
    { label: "Script injection pattern", level: "high", pattern: /<\s*script|onerror\s*=|onload\s*=|javascript:/i },
    { label: "Executable or script file", level: "high", pattern: /\.(exe|scr|bat|cmd|ps1|vbs|js|jar|msi|dll|com)(\?|#|$)/i },
    { label: "Encoded HTML/data URL", level: "medium", pattern: /data:text\/html|%3cscript|base64,/i },
    { label: "Suspicious shortened link", level: "medium", pattern: /\b(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|rebrand\.ly)\b/i },
    { label: "Credential or wallet lure", level: "medium", pattern: /\b(password|seed phrase|private key|login urgently|verify account)\b/i },
    { label: "Macro-enabled office file", level: "medium", pattern: /\.(docm|xlsm|pptm)(\?|#|$)/i }
  ];
  return checks.filter((check) => check.pattern.test(text));
}

function securityVerdict(value = "") {
  const findings = securityFindingsForText(value);
  const high = findings.filter((item) => item.level === "high").length;
  const medium = findings.filter((item) => item.level === "medium").length;
  const score = clamp(100 - high * 38 - medium * 18, 0, 100);
  const verdict = high ? "BLOCK" : medium ? "REVIEW" : "PASS";
  return { findings, score, verdict };
}

function renderSecurityShield(scanText = "") {
  if (!securityShieldResult) return;
  const verdict = securityVerdict(scanText);
  const badge = verdict.verdict === "PASS" ? "verified" : verdict.verdict === "REVIEW" ? "licensed" : "simulated";
  securityShieldResult.innerHTML = `
    ${metricCards([
      { label: "CSP", value: "active" },
      { label: "External scripts", value: "blocked" },
      { label: "Object/embed", value: "blocked" },
      { label: "Scan verdict", value: verdict.verdict }
    ])}
    <article class="data-trust-card">
      <div><strong>Security score</strong><em class="source-badge ${badge}">${escapeHtml(verdict.verdict)}</em></div>
      <span>${verdict.score}/100 browser-side risk check</span>
      <b>${scanText ? escapeHtml(scanText.slice(0, 120)) : "Paste a URL, file name or suspicious text to scan."}</b>
      <div class="trust-meter"><span style="width:${verdict.score}%"></span></div>
      <small>${verdict.findings.length ? verdict.findings.map((item) => escapeHtml(item.label)).join(" / ") : "No browser-side malware pattern detected. Server-side antivirus still needs backend hosting."}</small>
    </article>
  `;
}

function handleSecurityScan(event) {
  event.preventDefault();
  const values = collectFormValues(securityScanForm);
  renderSecurityShield(values.securityTarget || "");
}

function handleSafeLinkClick(event) {
  const anchor = event.target.closest?.("a[href]");
  if (!anchor) return;
  const href = anchor.getAttribute("href") || "";
  const verdict = securityVerdict(href);
  if (verdict.verdict !== "BLOCK") return;
  event.preventDefault();
  renderSecurityShield(href);
  const timestamp = document.querySelector("#liveTimestamp");
  if (timestamp) timestamp.textContent = "Security Shield blocked a suspicious link pattern. Review the scan panel before opening.";
}

function applyVerifiedBunkerSnapshot() {
  const ports = verifiedBunkerSnapshot.ports;
  const singapore = ports.singapore;
  liveFeedState.bunker = singapore.vlsfo;
  liveFeedState.vlsfoSingapore = singapore.vlsfo;
  liveFeedState.vlsfoRotterdam = ports.rotterdam.vlsfo;
  liveFeedState.vlsfoFujairah = ports.fujairah.vlsfo;
  liveFeedState.mgoSingapore = singapore.mgo;
  liveFeedState.hi5Spread = Number((singapore.vlsfo - singapore.hfo380).toFixed(2));
}

function bunkerPriceLabel(value) {
  return `${money(value, 2)}/t`;
}

function bunkerChangeForDefinition(definition) {
  if (!definition?.bunkerPort || !definition?.bunkerProduct) return null;
  const port = verifiedBunkerSnapshot.ports[definition.bunkerPort];
  if (!port) return null;
  if (definition.bunkerProduct === "hi5Spread") {
    return Number(((port.vlsfoChange || 0) - (port.hfo380Change || 0)).toFixed(2));
  }
  return port[`${definition.bunkerProduct}Change`] ?? null;
}

function bunkerSourceNote() {
  return `${verifiedBunkerSnapshot.sourceName} · checked ${verifiedBunkerSnapshot.checkedAt}`;
}

function bunkerSpreadNote() {
  const ports = verifiedBunkerSnapshot.ports;
  return `VLSFO: SG ${bunkerPriceLabel(ports.singapore.vlsfo)} · RTM ${bunkerPriceLabel(ports.rotterdam.vlsfo)} · FUJ ${bunkerPriceLabel(ports.fujairah.vlsfo)}`;
}

function applyBunkerDefaultsToForms() {
  const defaultPrice = String(verifiedBunkerSnapshot.ports.singapore.vlsfo);
  document.querySelectorAll('input[name="bunkerPrice"], input[name="defaultBunker"], input[name="bunkerDefault"], input[name="bunker"]').forEach((input) => {
    if (!input.dataset.bunkerVerifiedDefault && (!input.value || input.value === "620")) {
      input.value = defaultPrice;
      input.dataset.bunkerVerifiedDefault = "true";
    }
  });
}

const pageGroups = {
  dashboard: ["#command", ".dashboard-strip", ".ops-board", "#commandDeck", "#smartOps"],
  theater: ["#commandTheaterPanel"],
  saasCore: ["#saasCorePanel"],
  aiCore: ["#aiCorePanel"],
  proOps: ["#proOpsPanel"],
  broker: ["#brokerDesk", "#brokerPro", "#brokerOps"],
  terminal: ["#platformCore", "#brokerIntelligence", "#commandTerminal"],
  edge: ["#edgeSuite"],
  commercial: ["#commercialWorkspace"],
  brokerOS: ["#brokerOsSuite"],
  autopilot: ["#autopilotSuite"],
  dealIQ: ["#dealIqSuite"],
  decisionLab: ["#decisionLabSuite"],
  superSuite: ["#superSuitePanel"],
  pythonEngine: ["#pythonEngineSuite"],
  market: ["#intelligence", "#newsBulletin"],
  tools: ["#route", "#assistantCareer", "#vesselFinder"],
  academyPage: ["#academyCenter", "#academicLibrary", "#accountCenter"],
  portsPage: ["#academy"]
};

const commandDeckScenarios = {
  coal: {
    label: "Coal Fixture",
    cargo: "55,000 mt coal",
    route: "Indonesia -> India",
    counterparty: "Atlas Commodities",
    quantity: 55000,
    freight: 18.8,
    unit: "pmt",
    fuel: 610,
    bunkerBase: 620,
    bunkerExposure: 1.15,
    portCost: 98000,
    dailyHire: 15200,
    days: 21.5,
    delayBase: 1.2,
    baseRisk: 44,
    commission: 26000,
    eta: "21d",
    docs: ["Fixture recap", "Voyage estimate", "Laytime basis", "Demurrage exposure", "Cargo compatibility"],
    timeline: ["Offer parsed", "Counter wording prepared", "Voyage estimate checked", "Risk radar scored", "Recap and mail generated"],
    actions: ["Ask owner to confirm discharge port rotation.", "Protect NOR and weather exceptions in recap.", "Check India port waiting time before subjects lifted."]
  },
  grain: {
    label: "Grain Voyage",
    cargo: "52,000 mt grain",
    route: "Santos -> Singapore",
    counterparty: "Pacific Grain Desk",
    quantity: 52000,
    freight: 21.4,
    unit: "pmt",
    fuel: 720,
    bunkerBase: 612,
    bunkerExposure: 0.9,
    portCost: 116000,
    dailyHire: 14600,
    days: 29.2,
    delayBase: 1.7,
    baseRisk: 52,
    commission: 27800,
    eta: "29d",
    docs: ["Fixture recap", "Phytosanitary document list", "SOF checklist", "Rain letter reminder", "Client summary"],
    timeline: ["Cargo terms extracted", "Rain risk detected", "Draft/port limits checked", "Client brief generated", "Follow-up deadline created"],
    actions: ["Request fumigation and phytosanitary document status.", "Add rain stoppage evidence note to SOF checklist.", "Compare Santos lineup before confirming laycan."]
  },
  container: {
    label: "Container Spot",
    cargo: "2,400 TEU containers",
    route: "Shanghai -> Istanbul",
    counterparty: "EastWest Line",
    quantity: 2400,
    freight: 1180,
    unit: "per TEU",
    fuel: 940,
    bunkerBase: 640,
    bunkerExposure: 1.35,
    portCost: 184000,
    dailyHire: 23800,
    days: 25.8,
    delayBase: 1.4,
    baseRisk: 49,
    commission: 42000,
    eta: "26d",
    docs: ["Slot summary", "Bunker sensitivity", "Port congestion note", "Client ETA brief", "Ops alarm pack"],
    timeline: ["Spot rate captured", "Bunker spread checked", "ETA risk scored", "Client portal summary staged", "Ops alarm created"],
    actions: ["Watch Shanghai cut-off and transshipment window.", "Re-price if VLSFO moves above trigger.", "Send client ETA brief with source/confidence label."]
  },
  lng: {
    label: "LNG Risk",
    cargo: "145,000 cbm LNG",
    route: "Qatar -> Rotterdam",
    counterparty: "NorthSea Energy",
    quantity: 145000,
    freight: 1.42,
    unit: "per cbm",
    fuel: 860,
    bunkerBase: 650,
    bunkerExposure: 1.6,
    portCost: 238000,
    dailyHire: 82000,
    days: 18.4,
    delayBase: 2.1,
    baseRisk: 61,
    commission: 54000,
    eta: "18d",
    docs: ["Terminal compatibility", "Vetting checklist", "ETS/CO2 note", "Weather delay model", "CP red flag list"],
    timeline: ["Terminal window checked", "Vetting risk reviewed", "ETS exposure estimated", "Weather delay linked", "Counter wording drafted"],
    actions: ["Confirm terminal acceptance window before firming.", "Add vetting and boil-off wording to recap.", "Run EU ETS sensitivity before final counter."]
  }
};

function evaluateCommandDeck(scenarioId = selectedCommandScenarioId) {
  const scenario = commandDeckScenarios[scenarioId] || commandDeckScenarios.coal;
  const bunker = Number(liveFeedState?.bunker || scenario.bunkerBase);
  const congestion = Number(liveFeedState?.congestion || 37);
  const weather = Number(liveFeedState?.weather || 9);
  const delayDays = Number((scenario.delayBase + congestion / 46 + weather / 18).toFixed(1));
  const revenue = scenario.quantity * scenario.freight;
  const bunkerCost = scenario.fuel * bunker;
  const delayCost = delayDays * scenario.dailyHire * 0.62;
  const hireCost = scenario.days * scenario.dailyHire;
  const netPnl = revenue - bunkerCost - scenario.portCost - hireCost - scenario.commission - delayCost;
  const tce = (revenue - bunkerCost - scenario.portCost - scenario.commission - delayCost) / Math.max(scenario.days + delayDays, 1);
  const bunkerShock = Math.max(0, bunker - scenario.bunkerBase) * scenario.bunkerExposure;
  const risk = clamp(Math.round(scenario.baseRisk + congestion * 0.14 + weather * 1.2 + bunkerShock / 8), 0, 100);
  const decision = risk >= 74 ? "WATCH / protect subjects" : risk >= 58 ? "FIX with guards" : "FIX candidate";
  const confidence = risk >= 74 ? "62%" : risk >= 58 ? "74%" : "86%";
  const docs = scenario.docs.map((doc, index) => ({
    name: doc,
    status: index < 2 ? "ready" : index < 4 ? "drafted" : "queued"
  }));
  return { scenario, bunker, congestion, weather, delayDays, revenue, bunkerCost, delayCost, hireCost, netPnl, tce, risk, decision, confidence, docs };
}

function buildCommandDeckReport(result) {
  const { scenario } = result;
  return [
    "FOCUSEA COMMAND DECK REPORT",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    `Scenario: ${scenario.label}`,
    `Cargo: ${scenario.cargo}`,
    `Route: ${scenario.route}`,
    `Counterparty: ${scenario.counterparty}`,
    `Decision: ${result.decision}`,
    `Risk score: ${result.risk}/100`,
    `Confidence: ${result.confidence}`,
    "",
    "Commercial",
    `Gross freight: ${money(result.revenue)}`,
    `Bunker cost: ${money(result.bunkerCost)}`,
    `Port cost: ${money(scenario.portCost)}`,
    `Hire cost: ${money(result.hireCost)}`,
    `Delay exposure: ${money(result.delayCost)}`,
    `Net P&L: ${money(result.netPnl)}`,
    `TCE: ${money(result.tce)}/day`,
    "",
    "Workflow",
    ...scenario.timeline.map((item, index) => `${index + 1}. ${item}`),
    "",
    "Documents",
    ...result.docs.map((doc) => `- ${doc.name}: ${doc.status}`),
    "",
    "Next actions",
    ...scenario.actions.map((action) => `- ${action}`),
    "",
    "Note: Planning/demo output. Verify with licensed market data, CP wording and approved operational documents before commercial use."
  ].join("\n");
}

function renderCommandDeck(scenarioId = selectedCommandScenarioId) {
  if (!commandDeckPanel) return;
  selectedCommandScenarioId = scenarioId;
  const result = evaluateCommandDeck(scenarioId);
  const { scenario } = result;
  const score = 100 - result.risk;
  commandDeckScore.textContent = String(score);
  commandDeckDecision.textContent = result.decision;
  commandDeckPnl.textContent = money(result.netPnl);
  commandDeckPnlNote.textContent = `${scenario.cargo} / ${scenario.route}`;
  commandDeckTce.textContent = `${money(result.tce)}/d`;
  commandDeckTceNote.textContent = `${scenario.freight.toLocaleString("en-US")} ${scenario.unit} freight`;
  commandDeckEta.textContent = `${scenario.eta} +${result.delayDays}d`;
  commandDeckEtaNote.textContent = `Congestion ${result.congestion}% / weather ${result.weather}`;
  commandDeckDocCount.textContent = `${result.docs.length}/5`;
  commandDeckDocNote.textContent = `${result.docs.filter((doc) => doc.status === "ready").length} ready, ${result.docs.filter((doc) => doc.status === "drafted").length} drafted`;

  commandScenarioButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.commandScenario === selectedCommandScenarioId);
  });

  commandDeckTimeline.innerHTML = scenario.timeline.map((item, index) => `
    <div>
      <b>${index + 1}</b>
      <p><span>${escapeHtml(index === 0 ? scenario.label : "Workflow")}</span><strong>${escapeHtml(item)}</strong><small>${escapeHtml(index === 0 ? scenario.route : "Auto-generated from scenario and live risk layer")}</small></p>
    </div>
  `).join("");

  commandDeckBrief.innerHTML = `
    <div><span>Decision</span><strong>${escapeHtml(result.decision)}</strong><small>Risk ${result.risk}/100, confidence ${result.confidence}. Lower score on radar means more risk to protect.</small></div>
    <div><span>Commercial exposure</span><strong>${money(result.delayCost)} delay cost</strong><small>Bunker ${money(result.bunkerCost)} at ${money(result.bunker)}/t, port cost ${money(scenario.portCost)}.</small></div>
    <div><span>Next best action</span><strong>${escapeHtml(scenario.actions[0])}</strong><small>Focusea converts the scenario into broker action, not just a static calculation.</small></div>
  `;
  if (commandDeckPresentationActive) {
    commandDeckBrief.insertAdjacentHTML("beforeend", `
      <div><span>Demo narrative</span><strong>Broker workflow özeti</strong><small>Bu panel Focusea'nın farkını gösterir: veri, hesap, risk, evrak ve aksiyon tek akışta birleşiyor.</small></div>
    `);
  }

  commandDeckDocuments.innerHTML = result.docs.map((doc) => `
    <div><span>${escapeHtml(doc.status)}</span><strong>${escapeHtml(doc.name)}</strong><small>Included in Command Report PDF.</small></div>
  `).join("");

  lastCommandDeckReport = buildCommandDeckReport(result);
}

function startCommandDeckPresentation() {
  if (!commandDeckPanel || !presentationStrip) return;
  commandDeckPresentationActive = true;
  presentationStrip.hidden = false;
  commandDeckPanel.classList.add("presentation-active");
  renderCommandDeck(selectedCommandScenarioId);
  commandDeckPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function pageFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (pageGroups[hash]) return hash;
  const match = Object.entries(pageGroups).find(([, selectors]) => (
    selectors.some((selector) => selector.startsWith("#") && selector.slice(1) === hash)
  ));
  return match?.[0] || "dashboard";
}

function setupPageSections() {
  const grouped = new Set(Object.values(pageGroups).flat().flatMap((selector) => (
    [...document.querySelectorAll(selector)]
  )));
  grouped.forEach((section) => section.classList.add("page-section"));
}

function activatePage(pageName = "dashboard", updateHash = true) {
  const activePage = pageGroups[pageName] ? pageName : "dashboard";
  const activeSections = new Set(pageGroups[activePage].flatMap((selector) => (
    [...document.querySelectorAll(selector)]
  )));
  document.querySelectorAll("main > section").forEach((section) => {
    section.hidden = !activeSections.has(section);
    section.classList.add("page-section");
  });
  pageNavLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === activePage);
  });
  document.body.dataset.activePage = activePage;
  if (updateHash && window.location.hash !== `#${activePage}`) {
    history.pushState(null, "", `#${activePage}`);
  }
  window.scrollTo({ top: 0, behavior: "auto" });
}

function formNumber(formData, key, fallback = 0) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : fallback;
}

function getCargoProfile(type) {
  return cargoProfiles[type] || cargoProfiles.grain;
}

function collectFormValues(form) {
  return Object.fromEntries([...new FormData(form).entries()].map(([key, value]) => {
    const numberValue = Number(value);
    return [key, value !== "" && Number.isFinite(numberValue) ? numberValue : value];
  }));
}

function writeFormValues(form, values = {}) {
  if (!form) return;
  Object.entries(values).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field) field.value = value;
  });
}

function safeLocalGet(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function safeLocalSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function metricCards(items) {
  return `<div class="broker-metrics">${items.map((item) => `
    <div>
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `).join("")}</div>`;
}

function calculateVoyageEstimate(values) {
  const cargo = getCargoProfile(values.cargoType);
  const speed = Number(values.speed) || 1;
  const distance = Number(values.distance) || 0;
  const portDays = Number(values.portDays) || 0;
  const seaDays = distance / speed / 24;
  const totalDays = seaDays + portDays;
  const bunkerTons = (seaDays * (Number(values.seaCons) || 0) + portDays * (Number(values.portCons) || 0)) * cargo.bunkerMultiplier;
  const bunkerCost = bunkerTons * (Number(values.bunkerPrice) || 0);
  const baseFreightRate = Number(values.freightRate) || cargo.baseFreight;
  const adjustedFreightRate = baseFreightRate * cargo.freightMultiplier;
  const grossFreight = (Number(values.cargoQty) || 0) * adjustedFreightRate;
  const brokerage = grossFreight * ((Number(values.commission) || 0) / 100);
  const portCosts = (Number(values.portCosts) || 0) * cargo.portCostMultiplier;
  const canalCosts = Number(values.canalCosts) || 0;
  const dailyHire = Number(values.dailyHire) || 0;
  const hireCost = totalDays * dailyHire;
  const netRevenueBeforeHire = grossFreight - brokerage - bunkerCost - portCosts - canalCosts;
  const tce = totalDays ? netRevenueBeforeHire / totalDays : 0;
  const netPnl = netRevenueBeforeHire - hireCost;

  return {
    cargo,
    baseFreightRate,
    adjustedFreightRate,
    seaDays,
    totalDays,
    bunkerTons,
    bunkerCost,
    grossFreight,
    brokerage,
    portCosts,
    canalCosts,
    hireCost,
    netRevenueBeforeHire,
    tce,
    netPnl
  };
}

function setVessel(id) {
  const vessel = vessels[id];
  if (!vessel) return;
  selectedVesselId = id;
  shipButtons.forEach((button) => button.classList.toggle("selected", button.dataset.ship === id));
  if (!vesselInfo) {
    renderOpsWorkspace();
    return;
  }
  vesselInfo.innerHTML = `
    <p class="eyebrow">Selected Vessel</p>
    <h2>${vessel.name}</h2>
    <div class="metric-list">
      <div><span>Speed</span><strong>${vessel.speed}</strong></div>
      <div><span>Flag</span><strong>${vessel.flag}</strong></div>
      <div><span>IMO</span><strong>${vessel.imo}</strong></div>
      <div><span>Destination</span><strong>${vessel.destination}</strong></div>
      <div><span>ETA</span><strong>${vessel.eta}</strong></div>
      <div><span>Cargo</span><strong>${vessel.cargo}</strong></div>
      <div><span>Risk</span><strong>${vessel.risk}</strong></div>
    </div>
  `;
  renderOpsWorkspace();
}

function renderFixtureRecap() {
  if (!fixtureForm || !fixtureResult) return;
  const data = new FormData(fixtureForm);
  const cargo = getCargoProfile(data.get("cargoType"));
  const quantity = formNumber(data, "quantity");
  const freightRate = formNumber(data, "freightRate", cargo.baseFreight);
  const adjustedFreightRate = freightRate * cargo.freightMultiplier;
  const demurrageRate = formNumber(data, "demurrageRate") * cargo.demurrageMultiplier;
  const commission = formNumber(data, "commission");
  const grossFreight = quantity * adjustedFreightRate;
  const brokerage = grossFreight * (commission / 100);
  const netFreight = grossFreight - brokerage;

  fixtureResult.innerHTML = `
    <div class="broker-recap">
      <strong>${data.get("vessel") || "Vessel"} · ${data.get("cargo") || cargo.label}</strong>
      <p>${data.get("loadPort") || "Load port"} → ${data.get("dischargePort") || "Discharge port"} · Laycan ${data.get("laycan") || "-"}</p>
    </div>
    ${metricCards([
      { label: "Cargo type", value: cargo.label },
      { label: "Gross freight", value: money(grossFreight) },
      { label: "Brokerage", value: `${money(brokerage)} (${commission}%)` },
      { label: "Net freight", value: money(netFreight) },
      { label: "Adjusted rate", value: `${money(adjustedFreightRate, 2)}/${cargo.unit}` },
      { label: "Quantity", value: `${quantity.toLocaleString("en-US")} ${cargo.unit}` },
      { label: "Demurrage", value: `${money(demurrageRate)}/day` }
    ])}
    <small>${cargo.note} Recap check: freight, quantity, laycan, demurrage, commission ve özel clause'lar fixture öncesi ayrıca teyit edilmeli.</small>
  `;
}

function renderBrokerVoyageEstimate() {
  if (!voyageEstimateForm || !voyageEstimateResult) return;
  const values = collectFormValues(voyageEstimateForm);
  const estimate = calculateVoyageEstimate(values);
  const profitClass = estimate.netPnl >= 0 ? "positive" : "negative";

  voyageEstimateResult.innerHTML = `
    ${metricCards([
      { label: "Cargo type", value: estimate.cargo.label },
      { label: "Adjusted rate", value: `${money(estimate.adjustedFreightRate, 2)}/${estimate.cargo.unit}` },
      { label: "Sea / total days", value: `${estimate.seaDays.toFixed(1)} / ${estimate.totalDays.toFixed(1)}` },
      { label: "Gross freight", value: money(estimate.grossFreight) },
      { label: "TCE", value: `${money(estimate.tce)}/day` },
      { label: "Bunker", value: `${estimate.bunkerTons.toFixed(1)} mt · ${money(estimate.bunkerCost)}` },
      { label: "Hire cost", value: money(estimate.hireCost) },
      { label: "Net P&L", value: `<em class="${profitClass}">${money(estimate.netPnl)}</em>` }
    ])}
    <small>${estimate.cargo.note} Broker bakışı: TCE, daily hire üstünde kalıyorsa fixture ticari olarak daha anlamlıdır. Net P&L hesabı hire maliyetini ayrıca düşer.</small>
  `;
}

function renderLaytimeStatement() {
  if (!laytimeStatementForm || !laytimeStatementResult) return;
  const data = new FormData(laytimeStatementForm);
  const allowedHours = formNumber(data, "allowedHours");
  const loadHours = formNumber(data, "loadHours");
  const dischargeHours = formNumber(data, "dischargeHours");
  const deductions = formNumber(data, "deductions");
  const demurrageRate = formNumber(data, "demurrageRate");
  const dispatchRate = formNumber(data, "dispatchRate");
  const usedHours = Math.max(loadHours + dischargeHours - deductions, 0);
  const balance = usedHours - allowedHours;
  const demurrage = balance > 0 ? (balance / 24) * demurrageRate : 0;
  const dispatch = balance < 0 ? (Math.abs(balance) / 24) * dispatchRate : 0;
  const status = balance > 0 ? "Demurrage" : balance < 0 ? "Dispatch" : "Even";

  laytimeStatementResult.innerHTML = `
    ${metricCards([
      { label: "Allowed", value: `${allowedHours.toFixed(1)}h` },
      { label: "Used", value: `${usedHours.toFixed(1)}h` },
      { label: "Balance", value: `${balance.toFixed(1)}h` },
      { label: "Status", value: status },
      { label: "Demurrage due", value: money(demurrage) },
      { label: "Dispatch due", value: money(dispatch) }
    ])}
    <small>Statement mantığı: load + discharge - allowed deductions. Weather, shifting, NOR validity ve reversible/non-reversible clause sonucu değiştirebilir.</small>
  `;
}

function hoursBetween(start, end) {
  const from = new Date(start);
  const to = new Date(end);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return 0;
  return Math.max((to - from) / 36e5, 0);
}

function renderNegotiationSimulator() {
  if (!negotiationForm || !negotiationResult) return;
  const values = collectFormValues(negotiationForm);
  const cargo = getCargoProfile(values.cargoType);
  const ownerRate = (Number(values.ownerRate) || cargo.baseFreight) * cargo.freightMultiplier;
  const chartererRate = (Number(values.chartererRate) || cargo.baseFreight) * cargo.freightMultiplier;
  const midpoint = (ownerRate + chartererRate) / 2;
  const quantity = Number(values.quantity) || 0;
  const commission = Number(values.commission) || 0;
  const demurrage = (Number(values.demurrageRate) || 0) * cargo.demurrageMultiplier;
  const spread = ownerRate - chartererRate;
  const grossAtMid = quantity * midpoint;
  const brokerage = grossAtMid * (commission / 100);
  const recommendation = spread <= midpoint * 0.06 ? "Close to fix" : spread <= midpoint * 0.14 ? "Counter with midpoint" : "Wide gap";

  negotiationResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: `${cargo.label} · ${cargo.vessel}` },
      { label: "Owner adjusted", value: `${money(ownerRate, 2)}/${cargo.unit}` },
      { label: "Charterer adjusted", value: `${money(chartererRate, 2)}/${cargo.unit}` },
      { label: "Suggested counter", value: `${money(midpoint, 2)}/${cargo.unit}` },
      { label: "Freight at midpoint", value: money(grossAtMid) },
      { label: "Brokerage", value: money(brokerage) },
      { label: "Demurrage cargo-adj.", value: `${money(demurrage)}/day` },
      { label: "Recommendation", value: recommendation }
    ])}
    <small>${cargo.note} Spread ${money(spread, 2)}/${cargo.unit}; yük tipi rate ve demurrage'ı otomatik etkiledi.</small>
  `;
}

function analyzeClauseText(text) {
  const normalized = text.toLowerCase();
  const findings = [];
  const dangerousSentences = [];
  let ownerRisk = 35;
  let chartererRisk = 35;
  let laytimeStops = "Belirsiz";
  let demurrageLikely = "Orta";
  const sentences = text.split(/(?<=[.!?])\s+|\n+/).map((sentence) => sentence.trim()).filter(Boolean);

  if (normalized.includes("wibon") || normalized.includes("whether in berth") || normalized.includes("time lost waiting")) {
    chartererRisk += 22;
    demurrageLikely = "Yüksek";
    findings.push("Waiting time laytime'a sayılabilir; charterer açısından demurrage riski artıyor.");
  }
  if (normalized.includes("weather") && (normalized.includes("excepted") || normalized.includes("excluded"))) {
    ownerRisk += 14;
    laytimeStops = "Weather sırasında durabilir";
    findings.push("Weather exception var; rain/port weather saatleri laytime'dan düşülebilir.");
  }
  if (normalized.includes("shinc")) {
    chartererRisk += 12;
    findings.push("SHINC varsa Sunday/holiday dahil çalışır; charterer'ın süre tüketimi hızlanır.");
  }
  if (normalized.includes("unless used")) {
    chartererRisk += 8;
    findings.push("Unless used ifadesi fiili kullanımı charterer aleyhine sayabilir.");
  }
  if (normalized.includes("reachable on arrival") || normalized.includes("always accessible")) {
    ownerRisk += 20;
    findings.push("Reachable/always accessible berth taahhüdü owner üzerinde liman erişim riski yaratır.");
  }
  if (normalized.includes("nor") && normalized.includes("valid")) {
    findings.push("NOR validity açıkça kontrol edilmeli; free pratique/customs readiness sonucu değiştirebilir.");
  }

  sentences.forEach((sentence) => {
    const lower = sentence.toLowerCase();
    const hits = [];
    if (lower.includes("whether in berth") || lower.includes("wibon")) hits.push("berth waiting");
    if (lower.includes("time lost waiting")) hits.push("waiting counts");
    if (lower.includes("weather") && (lower.includes("excepted") || lower.includes("excluded"))) hits.push("weather exception");
    if (lower.includes("reachable on arrival")) hits.push("reachable berth");
    if (lower.includes("unless used")) hits.push("unless used");
    if (hits.length) dangerousSentences.push({ sentence, hits });
  });

  const riskOwner = ownerRisk > chartererRisk + 8 ? "Owner" : chartererRisk > ownerRisk + 8 ? "Charterer" : "Balanced / clause'a bağlı";
  return {
    riskOwner,
    laytimeStops,
    demurrageLikely,
    ownerRisk: clamp(ownerRisk, 0, 100),
    chartererRisk: clamp(chartererRisk, 0, 100),
    dangerousSentences,
    findings: findings.length ? findings : ["Clause kısa veya belirsiz; NOR, exceptions, demurrage ve berth waiting ifadeleri netleştirilmeli."]
  };
}

function renderClauseAnalyzer() {
  if (!clauseForm || !clauseResult) return;
  const text = new FormData(clauseForm).get("clauseText") || "";
  const analysis = analyzeClauseText(text);
  clauseResult.innerHTML = `
    ${metricCards([
      { label: "Risk ağırlığı", value: analysis.riskOwner },
      { label: "Laytime stops?", value: analysis.laytimeStops },
      { label: "Demurrage ihtimali", value: analysis.demurrageLikely },
      { label: "Owner risk", value: `${analysis.ownerRisk}/100` },
      { label: "Charterer risk", value: `${analysis.chartererRisk}/100` },
      { label: "Action", value: analysis.demurrageLikely === "Yüksek" ? "Demurrage clause teyit et" : "NOR/exception teyit et" }
    ])}
    <ul class="compact-list">${analysis.findings.map((item) => `<li>${item}</li>`).join("")}</ul>
    ${analysis.dangerousSentences.length ? `<div class="danger-box"><strong>Riskli cümleler</strong>${analysis.dangerousSentences.map((item) => `<p>${item.sentence}<br><span>${item.hits.join(", ")}</span></p>`).join("")}</div>` : ""}
  `;
}

function calculateDetailedLaytime() {
  const values = collectFormValues(laytimeGeneratorForm);
  const waitingHours = hoursBetween(values.norTime, values.berthingTime);
  const loadHours = hoursBetween(values.loadStart, values.loadComplete);
  const dischargeHours = hoursBetween(values.dischargeStart, values.dischargeComplete);
  const deductions = (Number(values.rainHours) || 0) + (Number(values.shiftingHours) || 0);
  const usedHours = Math.max(waitingHours + loadHours + dischargeHours - deductions, 0);
  const allowedHours = Number(values.allowedHours) || 0;
  const balance = usedHours - allowedHours;
  const demurrage = balance > 0 ? (balance / 24) * (Number(values.demurrageRate) || 0) : 0;
  const dispatch = balance < 0 ? (Math.abs(balance) / 24) * (Number(values.dispatchRate) || 0) : 0;
  return { values, waitingHours, loadHours, dischargeHours, deductions, usedHours, allowedHours, balance, demurrage, dispatch };
}

function renderLaytimeGenerator() {
  if (!laytimeGeneratorForm || !laytimeGeneratorResult) return;
  const statement = calculateDetailedLaytime();
  laytimeGeneratorResult.innerHTML = `
    ${metricCards([
      { label: "Waiting after NOR", value: `${statement.waitingHours.toFixed(1)}h` },
      { label: "Loading", value: `${statement.loadHours.toFixed(1)}h` },
      { label: "Discharge", value: `${statement.dischargeHours.toFixed(1)}h` },
      { label: "Deductions", value: `${statement.deductions.toFixed(1)}h` },
      { label: "Used / allowed", value: `${statement.usedHours.toFixed(1)}h / ${statement.allowedHours.toFixed(1)}h` },
      { label: "Balance", value: `${statement.balance.toFixed(1)}h` },
      { label: "Demurrage", value: money(statement.demurrage) },
      { label: "Dispatch", value: money(statement.dispatch) }
    ])}
    <small>NOR to berthing waiting, loading and discharge periods included. Rain/shifting deductions are subtracted.</small>
  `;
}

function buildBrokerMailText() {
  const statement = laytimeGeneratorForm ? calculateDetailedLaytime() : null;
  const voyage = voyageEstimateForm ? calculateVoyageEstimate(collectFormValues(voyageEstimateForm)) : null;
  return [
    "FOCUSEA BROKER DAILY MAIL DRAFT",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    "Fixture / Voyage Summary",
    voyage ? `Cargo: ${voyage.cargo.label}` : "Cargo: -",
    voyage ? `TCE: ${money(voyage.tce)}/day` : "TCE: -",
    voyage ? `Net P&L: ${money(voyage.netPnl)}` : "Net P&L: -",
    "",
    "Laytime Statement",
    statement ? `Used/Allowed: ${statement.usedHours.toFixed(1)}h / ${statement.allowedHours.toFixed(1)}h` : "No statement",
    statement ? `Demurrage: ${money(statement.demurrage)} | Dispatch: ${money(statement.dispatch)}` : "",
    "",
    "Broker Notes",
    "- Confirm cargo-specific rate, demurrage and port cost assumptions.",
    "- Re-check NOR validity, weather exceptions and waiting time clause before recap."
  ].join("\n");
}

function downloadBlob(filename, blob) {
  window.focuseaLastDownload = {
    filename,
    type: blob.type,
    size: blob.size,
    at: new Date().toISOString()
  };
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.append(link);
  link.click();
  window.dispatchEvent(new CustomEvent("focusea-download", { detail: window.focuseaLastDownload }));
  setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 1000);
}

function downloadTextFile(filename, content) {
  downloadBlob(filename, new Blob([content], { type: "text/plain;charset=utf-8" }));
}

function downloadJsonFile(filename, data) {
  downloadBlob(filename, new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" }));
}

function downloadCsvFile(filename, rows) {
  const csv = rows.map((row) => row.map((cell) => {
    const value = String(cell ?? "");
    return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  }).join(",")).join("\n");
  downloadBlob(filename, new Blob([csv], { type: "text/csv;charset=utf-8" }));
}

function sanitizePdfText(value) {
  return String(value ?? "")
    .replace(/ğ/g, "g").replace(/Ğ/g, "G")
    .replace(/ı/g, "i").replace(/İ/g, "I")
    .replace(/ş/g, "s").replace(/Ş/g, "S")
    .replace(/ü/g, "u").replace(/Ü/g, "U")
    .replace(/ö/g, "o").replace(/Ö/g, "O")
    .replace(/ç/g, "c").replace(/Ç/g, "C")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "?");
}

function escapePdfText(value) {
  return sanitizePdfText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapPlainText(text, width = 88) {
  return sanitizePdfText(text).split("\n").flatMap((line) => {
    const words = line.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [""];
    const lines = [];
    let current = "";
    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word;
      if (next.length > width) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    });
    if (current) lines.push(current);
    return lines;
  });
}

function createPdfBlob(title, body) {
  const pageLines = wrapPlainText(`${title}\nGenerated: ${new Date().toLocaleString()}\n\n${body}`, 90);
  const pages = [];
  const linesPerPage = 46;
  for (let index = 0; index < pageLines.length; index += linesPerPage) {
    pages.push(pageLines.slice(index, index + linesPerPage));
  }

  const objects = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  const fontObjectId = 3 + pages.length * 2;
  const kids = pages.map((_, index) => `${3 + index * 2} 0 R`).join(" ");
  objects.push(`<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`);
  pages.forEach((lines, index) => {
    const pageObjectId = 3 + index * 2;
    const contentObjectId = pageObjectId + 1;
    const content = [
      "BT",
      "/F1 10 Tf",
      "50 800 Td",
      "14 TL",
      ...lines.map((line) => `(${escapePdfText(line)}) Tj T*`),
      "ET"
    ].join("\n");
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>`);
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  });
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets[index + 1] = pdf.length;
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefPosition = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

function downloadPdfFile(filename, title, body) {
  downloadBlob(filename, createPdfBlob(title, body));
}

function renderVoyagePro() {
  if (!voyageProForm || !voyageProResult) return;
  const values = collectFormValues(voyageProForm);
  const cargo = getCargoProfile(values.cargoType);
  const speed = Number(values.speed) || 1;
  const ballastDays = (Number(values.ballastDistance) || 0) / speed / 24;
  const ladenDays = (Number(values.ladenDistance) || 0) / speed / 24;
  const weatherDays = (Number(values.weatherDelay) || 0) / 24;
  const seaDays = ballastDays + ladenDays + weatherDays;
  const portDays = Number(values.portDays) || 0;
  const totalDays = seaDays + portDays;
  const portCons = cargo.unit === "TEU" ? 8 : cargo.unit === "cbm" ? 11 : 4;
  const bunkerNeed = (seaDays * (Number(values.seaCons) || 0) + portDays * portCons) * cargo.bunkerMultiplier;
  const bunkerToBuy = Math.max(bunkerNeed - (Number(values.rob) || 0), 0);
  const bunkerCost = bunkerToBuy * (Number(values.bunkerPrice) || 0);
  const adjustedRate = (Number(values.freightRate) || cargo.baseFreight) * cargo.freightMultiplier;
  const grossFreight = (Number(values.cargoQty) || 0) * adjustedRate;
  const portCosts = 68000 * cargo.portCostMultiplier;
  const hireCost = totalDays * (Number(values.dailyHire) || 0);
  const netRevenue = grossFreight - bunkerCost - portCosts - (Number(values.canalCosts) || 0);
  const tce = totalDays ? netRevenue / totalDays : 0;
  const pnl = netRevenue - hireCost;
  const risk = clamp(cargo.risk + (weatherDays * 3) + (portDays > 5 ? 8 : 0) + (bunkerToBuy > 500 ? 6 : 0), 0, 100);
  const profitClass = pnl >= 0 ? "positive" : "negative";

  voyageProResult.innerHTML = `
    ${metricCards([
      { label: "Cargo adjusted rate", value: `${money(adjustedRate, 2)}/${cargo.unit}` },
      { label: "Ballast / laden", value: `${ballastDays.toFixed(1)}d / ${ladenDays.toFixed(1)}d` },
      { label: "Total days", value: `${totalDays.toFixed(1)}d` },
      { label: "Bunker to buy", value: `${bunkerToBuy.toFixed(1)} mt · ${money(bunkerCost)}` },
      { label: "TCE", value: `${money(tce)}/day` },
      { label: "Net P&L", value: `<em class="${profitClass}">${money(pnl)}</em>` },
      { label: "Risk score", value: `${Math.round(risk)}/100` },
      { label: "Best vessel", value: cargo.vessel }
    ])}
    <small>${cargo.note}</small>
  `;
}

function renderCargoMatching() {
  if (!cargoMatchForm || !cargoMatchResult) return;
  const values = collectFormValues(cargoMatchForm);
  const cargo = getCargoProfile(values.cargoType);
  const quantity = Number(values.quantity) || 0;
  const urgency = Number(values.urgency) || 1;
  const maxDraft = Number(values.draft) || 99;
  const candidates = [
    { name: "MV Orion", type: "container", capacity: 5400, unit: "TEU", draft: 12.8, open: "3 days", risk: 14 },
    { name: "MV Baltic Trader", type: "bulk", capacity: 56000, unit: "mt", draft: 12.6, open: "5 days", risk: 18 },
    { name: "MV Cape Horizon", type: "bulk", capacity: 175000, unit: "mt", draft: 18.1, open: "9 days", risk: 20 },
    { name: "MT Atlas", type: "tanker", capacity: 105000, unit: "mt", draft: 14.7, open: "4 days", risk: 16 },
    { name: "LNG Nova", type: "lng", capacity: 170000, unit: "cbm", draft: 11.9, open: "6 days", risk: 22 },
    { name: "MPP Meridian", type: "project", capacity: 24000, unit: "lot", draft: 9.4, open: "2 days", risk: 26 }
  ];
  const preferredType = cargo.unit === "TEU" ? "container" : cargo.unit === "cbm" ? "lng" : cargo.label.includes("Crude") || cargo.label.includes("Chemicals") ? "tanker" : cargo.label.includes("Project") ? "project" : "bulk";
  const matches = candidates.map((candidate) => {
    let score = 35;
    if (candidate.type === preferredType) score += 35;
    if (candidate.capacity >= quantity) score += 15;
    if (candidate.draft <= maxDraft) score += 10;
    score += Math.max(0, 10 - Math.abs(urgency - Number.parseInt(candidate.open, 10)));
    score -= candidate.risk / 3;
    return { ...candidate, score: clamp(Math.round(score), 0, 100) };
  }).sort((a, b) => b.score - a.score).slice(0, 3);

  cargoMatchResult.innerHTML = `
    <div class="match-list">${matches.map((item) => `
      <div>
        <strong>${item.name} · ${item.score}% match</strong>
        <span>${item.capacity.toLocaleString("en-US")} ${item.unit} · draft ${item.draft} m · open ${item.open}</span>
      </div>
    `).join("")}</div>
    <small>${cargo.label} için ideal gemi: ${cargo.vessel}. Draft ve laycan uyumu skorun ana belirleyicisi.</small>
  `;
}

function renderPortCostRisk() {
  if (!portCostForm || !portCostResult) return;
  const values = collectFormValues(portCostForm);
  const cargo = getCargoProfile(values.cargoType);
  const port = ports[values.portId] || ports.singapore;
  const vesselMultipliers = { handymax: 0.85, panamax: 1, cape: 1.35, tanker: 1.25, container: 1.22, lng: 1.45 };
  const vesselMultiplier = vesselMultipliers[values.vesselType] || 1;
  const basePortCost = Object.values(port.costs).reduce((sum, value) => sum + value, 0);
  const adjustedPortCost = basePortCost * cargo.portCostMultiplier * vesselMultiplier;
  const waitingCost = (Number(values.waitingDays) || 0) * (Number(values.dailyHire) || 0);
  const total = adjustedPortCost + waitingCost;
  const risk = clamp(cargo.risk + (port.risks.length * 6) + (Number(values.waitingDays) || 0) * 5 + (liveFeedState.congestion > 50 ? 10 : 0), 0, 100);
  const watch = risk > 70 ? "High attention" : risk > 48 ? "Watch closely" : "Normal";

  portCostResult.innerHTML = `
    ${metricCards([
      { label: "Port", value: port.name },
      { label: "Cargo", value: cargo.label },
      { label: "Base port cost", value: money(basePortCost) },
      { label: "Cargo/vessel adjusted", value: money(adjustedPortCost) },
      { label: "Waiting cost", value: money(waitingCost) },
      { label: "Total estimate", value: money(total) },
      { label: "Risk score", value: `${Math.round(risk)}/100` },
      { label: "Daily dashboard", value: watch }
    ])}
    <small>Market watch: bunker ${bunkerPriceLabel(liveFeedState.bunker)}, congestion ${liveFeedState.congestion}%, cargo note: ${cargo.note}</small>
  `;
}

function marketRate(cargo, marketMood = "neutral") {
  const mood = { soft: 0.94, neutral: 1, firm: 1.08, hot: 1.16 }[marketMood] || 1;
  return cargo.baseFreight * cargo.freightMultiplier * mood;
}

function portDepthMeters(port) {
  return Number.parseFloat(port?.depth || "0") || 0;
}

function renderOfferTracker() {
  if (!offerTrackerForm || !offerTrackerResult) return;
  const values = collectFormValues(offerTrackerForm);
  const cargo = getCargoProfile(values.cargoType);
  const ownerRate = (Number(values.ownerRate) || cargo.baseFreight) * cargo.freightMultiplier;
  const counterRate = (Number(values.counterRate) || cargo.baseFreight) * cargo.freightMultiplier;
  const spread = ownerRate - counterRate;
  const spreadPct = ownerRate ? (spread / ownerRate) * 100 : 0;
  const status = spreadPct <= 4 ? "Near fixture" : spreadPct <= 11 ? "Negotiable" : "Wide spread";

  offerTrackerResult.innerHTML = `
    ${metricCards([
      { label: "Parties", value: `${values.owner} / ${values.charterer}` },
      { label: "Cargo", value: cargo.label },
      { label: "Route", value: values.route },
      { label: "Owner vs counter", value: `${money(ownerRate, 2)} / ${money(counterRate, 2)}` },
      { label: "Spread", value: `${money(spread, 2)} (${spreadPct.toFixed(1)}%)` },
      { label: "Laycan", value: values.laycan },
      { label: "Status", value: values.status },
      { label: "Next action", value: status }
    ])}
    <small>Offer snapshot saved in this session view. Use status to follow firm offer, counter, subjects and fixture stage.</small>
  `;
}

function renderRateMatrix() {
  if (!rateMatrixForm || !rateMatrixResult) return;
  const values = collectFormValues(rateMatrixForm);
  const cargo = getCargoProfile(values.cargoType);
  const mid = marketRate(cargo, values.marketMood);
  const quantity = Number(values.quantity) || 0;
  const rows = [
    ["Low", mid * 0.92],
    ["Mid", mid],
    ["High", mid * 1.1]
  ];

  rateMatrixResult.innerHTML = `
    <table class="mini-table">
      <thead><tr><th>Band</th><th>Rate</th><th>Gross freight</th></tr></thead>
      <tbody>${rows.map(([band, rate]) => `<tr><td>${band}</td><td>${money(rate, 2)}/${cargo.unit}</td><td>${money(rate * quantity)}</td></tr>`).join("")}</tbody>
    </table>
    <small>${cargo.label} · ${values.marketMood} market · ${cargo.note}</small>
  `;
}

function sensitivityScenario(values, overrides = {}) {
  const scenario = {
    cargoType: values.cargoType,
    distance: Number(values.distance) || 0,
    speed: Number(values.speed) || 1,
    cargoQty: Number(values.cargoQty) || 0,
    freightRate: Number(values.freightRate) || 0,
    seaCons: 28,
    portCons: 4,
    portDays: 4,
    bunkerPrice: Number(values.bunkerPrice) || 0,
    portCosts: 68000,
    canalCosts: 0,
    dailyHire: 14500,
    commission: 2.5,
    ...overrides
  };
  return calculateVoyageEstimate(scenario);
}

function renderSensitivity() {
  if (!sensitivityForm || !sensitivityResult) return;
  const values = collectFormValues(sensitivityForm);
  const base = sensitivityScenario(values);
  const scenarios = [
    ["Base", base],
    ["Freight +5%", sensitivityScenario(values, { freightRate: Number(values.freightRate) * 1.05 })],
    ["Freight -5%", sensitivityScenario(values, { freightRate: Number(values.freightRate) * 0.95 })],
    ["Speed -1 kn", sensitivityScenario(values, { speed: Math.max(Number(values.speed) - 1, 1) })],
    ["Bunker +$50", sensitivityScenario(values, { bunkerPrice: Number(values.bunkerPrice) + 50 })]
  ];

  sensitivityResult.innerHTML = `
    <table class="mini-table">
      <thead><tr><th>Scenario</th><th>TCE/day</th><th>Net P&L</th></tr></thead>
      <tbody>${scenarios.map(([name, item]) => `<tr><td>${name}</td><td>${money(item.tce)}</td><td>${money(item.netPnl)}</td></tr>`).join("")}</tbody>
    </table>
    <small>Highest sensitivity: compare freight, speed and bunker moves before sending counter offer.</small>
  `;
}

function renderRobPlanner() {
  if (!robPlannerForm || !robPlannerResult) return;
  const values = collectFormValues(robPlannerForm);
  const required = ((Number(values.seaDays) || 0) * (Number(values.seaCons) || 0) + (Number(values.portDays) || 0) * 4) * (1 + (Number(values.margin) || 0) / 100);
  const available = (Number(values.startRob) || 0) + (Number(values.stem) || 0);
  const arrivalRob = available - required;
  const status = arrivalRob < 0 ? "Short stem" : arrivalRob < 60 ? "Tight ROB" : "Comfortable";

  robPlannerResult.innerHTML = `
    ${metricCards([
      { label: "Available", value: `${available.toFixed(1)} mt` },
      { label: "Required incl. margin", value: `${required.toFixed(1)} mt` },
      { label: "Arrival ROB", value: `${arrivalRob.toFixed(1)} mt` },
      { label: "Status", value: status }
    ])}
    <small>Planner includes sea consumption, port consumption and safety margin. Recheck with actual speed/cons curve.</small>
  `;
}

function renderRestrictionChecker() {
  if (!restrictionForm || !restrictionResult) return;
  const values = collectFormValues(restrictionForm);
  const port = ports[values.portId] || ports.singapore;
  const cargo = getCargoProfile(values.cargoType);
  const depth = portDepthMeters(port);
  const draft = Number(values.draft) || 0;
  const loa = Number(values.loa) || 0;
  const beam = Number(values.beam) || 0;
  const draftClearance = depth - draft;
  let score = 100;
  if (draftClearance < 1) score -= 42;
  if (loa > 330) score -= 18;
  if (beam > 50) score -= 12;
  if (cargo.risk > 65) score -= 12;
  const verdict = score >= 76 ? "Suitable" : score >= 48 ? "Riskli / check terminal" : "Not suitable";

  restrictionResult.innerHTML = `
    ${metricCards([
      { label: "Port", value: port.name },
      { label: "Depth / draft", value: `${depth} m / ${draft} m` },
      { label: "Clearance", value: `${draftClearance.toFixed(1)} m` },
      { label: "LOA / beam", value: `${loa} m / ${beam} m` },
      { label: "Cargo risk", value: `${cargo.risk}/100` },
      { label: "Verdict", value: verdict }
    ])}
    <small>Terminal restrictions, tide window and pilotage limits must be confirmed with port agent.</small>
  `;
}

function complianceRiskValue(value) {
  return { low: 8, medium: 22, high: 42, no: 0, watch: 35, yes: 80 }[value] || 0;
}

function renderComplianceChecklist() {
  if (!complianceForm || !complianceResult) return;
  const values = collectFormValues(complianceForm);
  const cargo = getCargoProfile(values.cargoType);
  const risk = clamp(
    complianceRiskValue(values.flagRisk) +
    complianceRiskValue(values.ownerRisk) +
    complianceRiskValue(values.originRisk) +
    complianceRiskValue(values.sanctionHit) +
    (cargo.risk > 65 ? 14 : 4),
    0,
    100
  );
  const action = risk > 75 ? "Do not fix before compliance clearance" : risk > 45 ? "Enhanced due diligence" : "Standard KYC";

  complianceResult.innerHTML = `
    ${metricCards([
      { label: "Compliance score", value: `${risk}/100` },
      { label: "Action", value: action },
      { label: "Cargo", value: cargo.label },
      { label: "Sanctions", value: values.sanctionHit }
    ])}
    <ul class="compact-list"><li>Check OFAC/EU/UN parties and ownership.</li><li>Verify cargo origin, destination and payment route.</li><li>Keep audit trail before lifting subjects.</li></ul>
  `;
}

function renderEtsCalculator() {
  if (!etsForm || !etsResult) return;
  const values = collectFormValues(etsForm);
  const fuel = Number(values.fuelTons) || 0;
  const co2 = fuel * 3.114;
  const accountable = co2 * ((Number(values.euPercent) || 0) / 100);
  const etsCost = accountable * (Number(values.etsPrice) || 0);
  const intensity = co2 / (Number(values.cargoQty) || 1);
  const cii = intensity < 0.025 ? "A/B" : intensity < 0.045 ? "C" : "D/E";

  etsResult.innerHTML = `
    ${metricCards([
      { label: "CO2", value: `${co2.toFixed(0)} t` },
      { label: "EU accountable", value: `${accountable.toFixed(0)} t` },
      { label: "ETS cost", value: money(etsCost) },
      { label: "CII estimate", value: cii }
    ])}
    <small>Uses 3.114 tCO2 per mt fuel. Treat as commercial estimate, not verified compliance filing.</small>
  `;
}

function renderCpTemplate() {
  if (!cpTemplateForm || !cpTemplateResult) return;
  const values = collectFormValues(cpTemplateForm);
  const cargo = getCargoProfile(values.cargoType);
  const template = [
    `${values.templateType} RECAP DRAFT`,
    `Owners: ${values.owner}`,
    `Charterers: ${values.charterer}`,
    `Vessel: ${values.vessel}`,
    `Cargo: ${cargo.label}`,
    `Freight: ${values.freight}`,
    "Laytime: As per agreed recap, reversible unless otherwise stated.",
    "Demurrage/Dispatch: As agreed, cargo adjusted where applicable.",
    "Subjects: Stem/receivers/management approval and compliance clearance."
  ].join("\n");

  cpTemplateResult.innerHTML = `<pre class="template-preview">${template}</pre>`;
}

function renderCrmCard() {
  if (!crmForm || !crmResult) return;
  const values = collectFormValues(crmForm);
  crmResult.innerHTML = `
    ${metricCards([
      { label: "Company", value: values.company },
      { label: "Contact", value: values.contact },
      { label: "Role", value: values.role },
      { label: "Follow-up", value: values.followDate },
      { label: "Next note", value: values.note }
    ])}
    <small>CRM reminder: follow up before market moves or laycan narrows.</small>
  `;
}

function renderDailyBrief() {
  if (!dailyBriefForm || !dailyBriefResult) return;
  const values = collectFormValues(dailyBriefForm);
  const congestionNote = liveFeedState.congestion > 55 ? "port delay risk high" : "port delay manageable";
  dailyBriefResult.innerHTML = `
    ${metricCards([
      { label: "Focus", value: values.focusMarket },
      { label: "Open offers", value: values.openOffers },
      { label: "Bunker", value: `${bunkerPriceLabel(liveFeedState.bunker)}` },
      { label: "Congestion", value: `${liveFeedState.congestion}% · ${congestionNote}` },
      { label: "Weather alerts", value: liveFeedState.weather },
      { label: "Next move", value: "Review counters, chase subjects, check news" }
    ])}
    <small>Daily brief updates with the simulated live market strip.</small>
  `;
}

function buildOpsEmailText() {
  if (!emailGeneratorForm) return "";
  const values = collectFormValues(emailGeneratorForm);
  const subject = {
    firm: "Firm offer",
    counter: "Counter offer",
    recap: "Fixture recap",
    subjects: "Subjects lifted"
  }[values.emailType] || "Broker message";
  const actionLine = {
    firm: "We are pleased to put forward the following firm offer:",
    counter: "Many thanks. Charterers counter as follows:",
    recap: "Please find below recap for your review:",
    subjects: "Please be advised subjects are lifted and fixture is clean:"
  }[values.emailType] || "Please review:";

  return [
    values.recipient,
    "",
    `${subject} - ${values.route}`,
    "",
    actionLine,
    `Route: ${values.route}`,
    `Rate: ${values.rate}`,
    "Laycan / demurrage / subjects: as per latest negotiation.",
    "",
    "Kind regards,",
    "Focusea Broker Desk"
  ].join("\n");
}

function renderEmailGenerator() {
  if (!emailGeneratorForm || !emailGeneratorResult) return;
  generatedOpsEmailText = buildOpsEmailText();
  emailGeneratorResult.innerHTML = `<pre class="template-preview">${generatedOpsEmailText}</pre>`;
}

function renderDocumentVault() {
  if (!documentVaultForm || !documentVaultResult) return;
  const values = collectFormValues(documentVaultForm);
  const urgency = values.docStatus === "Missing" ? "Chase today" : values.docStatus === "Needs review" ? "Review before fixture" : "Filed";
  documentVaultResult.innerHTML = `
    ${metricCards([
      { label: "Document", value: values.docType },
      { label: "Reference", value: values.reference },
      { label: "Due", value: values.dueDate },
      { label: "Status", value: values.docStatus },
      { label: "Action", value: urgency }
    ])}
    <small>Vault tracks recap, CP, SOF, NOR, LOI, invoice and laytime support documents.</small>
  `;
}

const sofMonthMap = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11
};

function sofLines(text = "") {
  return String(text)
    .replace(/\.\s+/g, ".\n")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSofDateTime(line = "") {
  const monthDate = line.match(/(\d{1,2})\s*([A-Za-z]{3,9})\.?\s*(?:(20\d{2})\s*)?([0-2]\d)([0-5]\d)/i);
  if (monthDate) {
    const month = sofMonthMap[monthDate[2].toLowerCase()];
    if (month !== undefined) {
      return new Date(Number(monthDate[3] || 2026), month, Number(monthDate[1]), Number(monthDate[4]), Number(monthDate[5]));
    }
  }
  const numericDate = line.match(/(\d{1,2})[./-](\d{1,2})(?:[./-](20\d{2}))?\s*([0-2]\d)([0-5]\d)/);
  if (numericDate) {
    return new Date(Number(numericDate[3] || 2026), Number(numericDate[2]) - 1, Number(numericDate[1]), Number(numericDate[4]), Number(numericDate[5]));
  }
  return null;
}

function parseSofRangeHours(line = "") {
  const explicit = line.match(/(?:rain|stop|stoppage|delay|weather)[^\d]*(\d+(?:\.\d+)?)\s*h/i);
  if (explicit) return Number(explicit[1]) || 0;

  const range = line.match(/(\d{1,2})\s*([A-Za-z]{3,9})\.?\s*(?:(20\d{2})\s*)?([0-2]\d)([0-5]\d)\s*[-/]\s*([0-2]\d)([0-5]\d)/i);
  if (!range) return 0;
  const month = sofMonthMap[range[2].toLowerCase()];
  if (month === undefined) return 0;
  const start = new Date(Number(range[3] || 2026), month, Number(range[1]), Number(range[4]), Number(range[5]));
  const end = new Date(Number(range[3] || 2026), month, Number(range[1]), Number(range[6]), Number(range[7]));
  if (end < start) end.setDate(end.getDate() + 1);
  return Math.max(0, (end - start) / 36e5);
}

function classifySofLine(line = "") {
  const lower = line.toLowerCase();
  if (/rain|weather|stoppage|stopped|delay|strike|shifting|breakdown/.test(lower)) return "Deduction / stoppage";
  if (/completed|completion|finished|all fast off|loading complete|discharging complete/.test(lower)) return "Completed";
  if (/loading commenced|loading started|commenced loading|discharging commenced|discharging started|commenced discharging/.test(lower)) return "Operations started";
  if (/berthed|all fast|alongside/.test(lower)) return "Berthed";
  if (/nor|notice of readiness/.test(lower)) return "NOR tendered";
  return "Other";
}

function formatSofDate(date) {
  if (!date) return "-";
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function parseSofStatement(text = "", allowedInput = 72, demurrageInput = 18000) {
  const allowedHours = Number(allowedInput) || 72;
  const demurrageRate = Number(demurrageInput) || 18000;
  const events = sofLines(text).map((line) => {
    const type = classifySofLine(line);
    return {
      type,
      line,
      time: parseSofDateTime(line),
      deductionHours: type === "Deduction / stoppage" ? parseSofRangeHours(line) : 0
    };
  });
  const operationsStart = events.find((event) => event.type === "Operations started" && event.time);
  const berth = events.find((event) => event.type === "Berthed" && event.time);
  const nor = events.find((event) => event.type === "NOR tendered" && event.time);
  const completion = [...events].reverse().find((event) => event.type === "Completed" && event.time);
  const start = operationsStart?.time || berth?.time || nor?.time || null;
  const deductions = events.reduce((sum, event) => sum + event.deductionHours, 0);
  const grossHours = start && completion?.time ? Math.max(0, (completion.time - start) / 36e5) : 0;
  const fallbackUsed = Math.max(events.filter((event) => event.type !== "Other").length * 18 - deductions, 0);
  const usedHours = grossHours ? Math.max(0, grossHours - deductions) : fallbackUsed;
  const balanceHours = usedHours - allowedHours;
  const demurrageAmount = balanceHours > 0 ? (balanceHours / 24) * demurrageRate : 0;
  const dispatchAmount = balanceHours < 0 ? (Math.abs(balanceHours) / 24) * demurrageRate * 0.5 : 0;
  const status = balanceHours > 0.25 ? "Demurrage" : balanceHours < -0.25 ? "Dispatch" : "Even";
  return {
    events,
    start,
    completion: completion?.time || null,
    startBasis: operationsStart ? "Operations start" : berth ? "Berth time" : nor ? "NOR time" : "Estimated",
    allowedHours,
    demurrageRate,
    grossHours,
    deductions,
    usedHours,
    balanceHours,
    demurrageAmount,
    dispatchAmount,
    status
  };
}

function renderSofAnalyzer() {
  if (!sofAnalyzerForm || !sofAnalyzerResult) return;
  const values = collectFormValues(sofAnalyzerForm);
  const statement = parseSofStatement(values.sofText, values.allowedHours, values.demurrageRate);

  sofAnalyzerResult.innerHTML = `
    ${metricCards([
      { label: "Events detected", value: statement.events.length },
      { label: "Start basis", value: statement.startBasis },
      { label: "Gross window", value: statement.grossHours ? `${statement.grossHours.toFixed(1)}h` : "estimated" },
      { label: "Deductions", value: `${statement.deductions.toFixed(1)}h` },
      { label: "Used laytime", value: `${statement.usedHours.toFixed(1)}h` },
      { label: statement.status, value: statement.status === "Demurrage" ? money(statement.demurrageAmount) : statement.status === "Dispatch" ? money(statement.dispatchAmount) : "$0" }
    ])}
    <table class="mini-table">
      <thead><tr><th>Event</th><th>Time</th><th>Deduction</th><th>Raw SOF line</th></tr></thead>
      <tbody>${statement.events.map((event) => `<tr><td>${escapeHtml(event.type)}</td><td>${formatSofDate(event.time)}</td><td>${event.deductionHours ? `${event.deductionHours.toFixed(1)}h` : "-"}</td><td>${escapeHtml(event.line)}</td></tr>`).join("")}</tbody>
    </table>
    <small>Engine reads NOR, berth, operations start, stoppage ranges and completion. Broker should still check CP exceptions and whether NOR or operations start is the agreed counting basis.</small>
  `;
}

function renderDisputeRisk() {
  if (!disputeRiskForm || !disputeRiskResult) return;
  const values = collectFormValues(disputeRiskForm);
  const clause = { low: 12, medium: 28, high: 45 }[values.clauseRisk] || 0;
  const docs = { yes: 0, partial: 16, no: 32 }[values.docsReady] || 0;
  const risk = clamp(clause + (Number(values.sofDelay) || 0) * 1.2 + (Number(values.deductionDispute) || 0) * 2 + docs + ((Number(values.amount) || 0) > 25000 ? 10 : 0), 0, 100);
  const action = risk > 70 ? "Prepare claim file" : risk > 45 ? "Negotiate deductions" : "Low dispute risk";

  disputeRiskResult.innerHTML = `
    ${metricCards([
      { label: "Dispute risk", value: `${Math.round(risk)}/100` },
      { label: "Action", value: action },
      { label: "SOF delay", value: `${values.sofDelay}h` },
      { label: "Amount", value: money(values.amount) }
    ])}
    <small>Risk combines clause ambiguity, SOF delay, disputed deductions, document readiness and claim amount.</small>
  `;
}

function renderCargoCompatibility() {
  if (!compatibilityForm || !compatibilityResult) return;
  const values = collectFormValues(compatibilityForm);
  const cargo = getCargoProfile(values.cargoType);
  const preferred = cargo.unit === "TEU" ? "container" : cargo.unit === "cbm" ? "lng" : cargo.label.includes("Crude") || cargo.label.includes("Chemicals") ? "tanker" : cargo.label.includes("Project") ? "mpp" : "bulk";
  let score = values.vesselType === preferred ? 82 : 42;
  if (values.condition === "minor") score -= 12;
  if (values.condition === "poor") score -= 34;
  const verdict = score >= 70 ? "Compatible" : score >= 45 ? "Conditional" : "Not recommended";
  const requirements = {
    coal: "Hold cleanliness, self-heating monitoring, dust control.",
    grain: "Grain clean holds, fumigation, moisture checks.",
    container: "Cell guides/slots, reefer plugs if needed, lashing plan.",
    crudeOil: "Vetting, tank suitability, heating and cargo docs.",
    lng: "Terminal compatibility, boil-off plan, cargo containment.",
    chemicals: "Tank coating, previous cargo and cleaning certificate.",
    projectCargo: "Lift plan, crane capacity, sea fastening and permits."
  }[values.cargoType] || cargo.note;

  compatibilityResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: cargo.label },
      { label: "Preferred vessel", value: cargo.vessel },
      { label: "Selected vessel type", value: values.vesselType },
      { label: "Score", value: `${score}/100` },
      { label: "Verdict", value: verdict }
    ])}
    <small>${requirements}</small>
  `;
}

function workspaceForms() {
  return {
    profile: collectFormValues(profileForm),
    offer: collectFormValues(offerTrackerForm),
    crm: collectFormValues(crmForm),
    vault: collectFormValues(documentVaultForm),
    laytime: collectFormValues(laytimeGeneratorForm),
    admin: collectFormValues(adminForm),
    db: focuseaDb
  };
}

function saveWorkspaceState() {
  const ok = safeLocalSet("focusea-workspace-v2", workspaceForms());
  renderWorkspaceStatus(ok ? "Workspace saved locally." : "Local storage unavailable.");
}

function loadWorkspaceState() {
  const data = safeLocalGet("focusea-workspace-v2");
  if (!data) {
    renderWorkspaceStatus("No saved workspace found yet.");
    return;
  }
  writeFormValues(profileForm, data.profile);
  writeFormValues(offerTrackerForm, data.offer);
  writeFormValues(crmForm, data.crm);
  writeFormValues(documentVaultForm, data.vault);
  writeFormValues(laytimeGeneratorForm, data.laytime);
  writeFormValues(adminForm, data.admin);
  focuseaDb = data.db || focuseaDb;
  renderAllPlatformCore();
  renderWorkspaceStatus("Saved workspace loaded.");
}

function clearWorkspaceState() {
  try {
    localStorage.removeItem("focusea-workspace-v2");
  } catch {
    // Ignore restricted storage modes.
  }
  renderWorkspaceStatus("Saved workspace cleared from this browser.");
}

function renderWorkspaceStatus(message = "Local account ready.") {
  if (!workspaceStatus) return;
  const profile = profileForm ? collectFormValues(profileForm) : {};
  workspaceStatus.innerHTML = `
    ${metricCards([
      { label: "User", value: profile.profileName || "No profile" },
      { label: "Company", value: profile.profileCompany || "-" },
      { label: "Role", value: profile.profileRole || "-" },
      { label: "Status", value: message }
    ])}
    <small>Data is saved in this browser with localStorage. Backend login can be added later.</small>
  `;
}

function buildExportReport(type) {
  const fixture = fixtureResult?.textContent.trim() || "";
  const voyage = voyageEstimateResult?.textContent.trim() || "";
  const laytime = laytimeGeneratorResult?.textContent.trim() || "";
  const cp = cpTemplateResult?.textContent.trim() || "";
  const daily = dailyBriefResult?.textContent.trim() || "";
  const dispute = disputeRiskResult?.textContent.trim() || "";
  const reports = {
    fixture: ["Fixture Recap", fixture],
    voyage: ["Voyage Estimate", voyage],
    laytime: ["Laytime Statement", laytime],
    demurrage: ["Demurrage Claim", `${laytime}\n\nDispute Risk\n${dispute}`],
    cp: ["Charter Party Draft", cp],
    daily: ["Broker Daily Report", `${daily}\n\nOffer\n${offerTrackerResult?.textContent.trim() || ""}\n\nNotifications\n${notificationCenter?.textContent.trim() || ""}`]
  };
  const [title, body] = reports[type] || reports.daily;
  return { title, body };
}

function exportReport(type) {
  const report = buildExportReport(type);
  const filename = `focusea-${type}-report.pdf`;
  downloadPdfFile(filename, report.title, report.body || "No report data available yet.");
  if (exportResult) exportResult.textContent = `${report.title} downloaded as ${filename}.`;
}

function renderKanbanBoard() {
  if (!kanbanBoard) return;
  const offer = offerTrackerForm ? collectFormValues(offerTrackerForm) : {};
  const columns = ["New offer", "Counter sent", "On subjects", "Fixed", "Failed"];
  const active = String(offer.status || "On subjects").toLowerCase();
  kanbanBoard.innerHTML = columns.map((column) => {
    const isActive = active.includes(column.toLowerCase().split(" ")[0]) || (column === "On subjects" && active.includes("subject"));
    return `
      <div class="${isActive ? "active" : ""}">
        <span>${column}</span>
        ${isActive ? `<strong>${offer.owner || "Owner"} / ${offer.charterer || "Charterer"}</strong><small>${offer.route || "Route"} · ${offer.laycan || "Laycan"}</small>` : "<small>No active card</small>"}
      </div>
    `;
  }).join("");
}

function renderNotifications() {
  if (!notificationCenter) return;
  const offer = offerTrackerForm ? collectFormValues(offerTrackerForm) : {};
  const risk = disputeRiskForm ? collectFormValues(disputeRiskForm) : {};
  const notifications = [
    { level: "watch", text: `Laycan ${offer.laycan || "window"} takipte.` },
    { level: liveFeedState.bunker > 650 ? "high" : "normal", text: `Bunker ${bunkerPriceLabel(liveFeedState.bunker)} seviyesinde.` },
    { level: liveFeedState.congestion > 55 ? "high" : "normal", text: `Port congestion ${liveFeedState.congestion}%.` },
    { level: Number(risk.sofDelay || 0) > 12 ? "high" : "watch", text: `SOF delay ${risk.sofDelay || 0}h; demurrage claim kontrol et.` },
    { level: "watch", text: `News query: ${activeNewsQuery}.` }
  ];
  notificationCenter.innerHTML = notifications.map((item) => `
    <div class="${item.level}">
      <strong>${item.level.toUpperCase()}</strong>
      <span>${item.text}</span>
    </div>
  `).join("");
}

function renderDatabase() {
  if (!databaseResult) return;
  const cargoRows = Object.entries(cargoProfiles).slice(0, 5).map(([, cargo]) => `${cargo.label}: ${money(cargo.baseFreight, 2)}/${cargo.unit}`).join("<br>");
  databaseResult.innerHTML = `
    ${metricCards([
      { label: "Companies", value: focuseaDb.companies.length },
      { label: "Vessels", value: Object.keys(vessels).length },
      { label: "Ports", value: Object.keys(ports).length },
      { label: "Cargo profiles", value: Object.keys(cargoProfiles).length }
    ])}
    <small>${cargoRows}</small>
  `;
}

function renderAnalytics() {
  if (!analyticsResult) return;
  const fixtures = focuseaDb.fixtures || [];
  const avgTce = fixtures.reduce((sum, item) => sum + item.tce, 0) / Math.max(fixtures.length, 1);
  const best = fixtures.reduce((winner, item) => item.tce > winner.tce ? item : winner, fixtures[0] || { cargo: "-", tce: 0, risk: 0 });
  analyticsResult.innerHTML = `
    ${metricCards([
      { label: "Fixtures", value: fixtures.length },
      { label: "Average TCE", value: `${money(avgTce)}/day` },
      { label: "Best cargo", value: `${best.cargo} · ${money(best.tce)}/day` },
      { label: "Highest risk", value: `${Math.max(...fixtures.map((item) => item.risk), 0)}/100` }
    ])}
    <div class="analytics-bars">${fixtures.map((item) => `<div><span>${item.cargo}</span><em style="width:${clamp(item.tce / 350, 8, 100)}%"></em><strong>${money(item.tce)}</strong></div>`).join("")}</div>
  `;
}

function renderAdminPanel(message = "Admin settings ready.") {
  if (!adminResult) return;
  const values = adminForm ? collectFormValues(adminForm) : {};
  adminResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: getCargoProfile(values.adminCargoType).label },
      { label: "Freight multiplier", value: values.freightMultiplier || "-" },
      { label: "Default bunker", value: money(values.defaultBunker) },
      { label: "News query", value: values.newsQuery || activeNewsQuery }
    ])}
    <small>${message}</small>
  `;
}

function applyAdminSettings() {
  if (!adminForm) return;
  const values = collectFormValues(adminForm);
  const cargo = getCargoProfile(values.adminCargoType);
  cargo.freightMultiplier = Number(values.freightMultiplier) || cargo.freightMultiplier;
  liveFeedState.bunker = Number(values.defaultBunker) || liveFeedState.bunker;
  activeNewsQuery = values.newsQuery || activeNewsQuery;
  renderAdminPanel("Settings applied to current browser session.");
  renderFixtureRecap();
  renderBrokerVoyageEstimate();
  renderRateMatrix();
  renderDataSources();
}

function renderDataSources() {
  if (!dataSourcesResult) return;
  const rows = dataTrustRows();
  dataSourcesResult.innerHTML = `
    <table class="mini-table">
      <thead><tr><th>Source</th><th>Provider</th><th>Status</th><th>Confidence</th></tr></thead>
      <tbody>${rows.map((row) => `<tr><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.provider)}</td><td><em class="source-badge ${row.badge}">${sourceBadgeText(row.badge)}</em></td><td>${row.confidence}%</td></tr>`).join("")}</tbody>
    </table>
    <small>External paid/licensed APIs can replace simulated rows without changing the UI structure. This table separates source truth from calculation demos.</small>
  `;
}

function dataTrustRows() {
  const now = new Date().toLocaleTimeString();
  const licensedCount = marketIndexDefinitions.filter((item) => item.source === "licensed").length;
  const apiReadyCount = marketIndexDefinitions.filter((item) => item.source === "api-ready").length;
  return [
    {
      name: "Maritime news bulletin",
      provider: "Google News RSS / GDELT fallback",
      badge: "verified",
      confidence: 88,
      updated: now,
      value: activeNewsQuery,
      usage: "Source links are shown with every news card."
    },
    {
      name: "Market indexes",
      provider: `${licensedCount} licensed benchmarks, ${apiReadyCount} API-ready feeds; Baltic connector ${balticFeedState.connected ? "connected" : "locked"}`,
      badge: "licensed",
      confidence: balticFeedState.connected ? 86 : 62,
      updated: balticFeedState.lastChecked || now,
      value: `BDI ${liveFeedState.bdi.toLocaleString("en-US")} / SCFI ${liveFeedState.scfi.toLocaleString("en-US")}`,
      usage: "Baltic-style values are marked as licensed placeholders until a paid feed is connected."
    },
    {
      name: "Bunker prices",
      provider: verifiedBunkerSnapshot.sourceName,
      badge: "verified",
      confidence: 94,
      updated: verifiedBunkerSnapshot.checkedAt,
      value: `Singapore VLSFO ${bunkerPriceLabel(liveFeedState.vlsfoSingapore)}`,
      usage: "Source-backed snapshot used in TCE, voyage estimate, ROB and speed sensitivity."
    },
    {
      name: "Weather routing",
      provider: "NWS / Copernicus-ready weather layer",
      badge: "api-ready",
      confidence: 70,
      updated: now,
      value: `${liveFeedState.weather} alerts / index ${liveFeedState.weatherDisruption}`,
      usage: "Used for ETA buffer, route warnings and laytime exception watch."
    },
    {
      name: "Port intelligence",
      provider: "NGA World Port Index-ready + local model",
      badge: "api-ready",
      confidence: 74,
      updated: now,
      value: `Congestion ${liveFeedState.congestion}%`,
      usage: "Depth, docs, productivity, port cost and waiting risk."
    },
    {
      name: "Port congestion",
      provider: "Internal simulated queue model",
      badge: "simulated",
      confidence: 55,
      updated: now,
      value: `${liveFeedState.congestion}% global watch`,
      usage: "Feeds demurrage exposure, schedule risk and port cost estimate."
    },
    {
      name: "Fixture terms",
      provider: "User pasted broker mail / recap / SOF",
      badge: "input",
      confidence: 92,
      updated: "on edit",
      value: "Offer, CP, SOF, laytime and claim forms",
      usage: "Highest-confidence source for deal-specific calculations."
    },
    {
      name: "SOF / laytime engine",
      provider: "Local parser + user evidence",
      badge: "input",
      confidence: lastClaimBuilder?.strength || 78,
      updated: now,
      value: lastClaimBuilder?.claim ? `Claim ${money(lastClaimBuilder.claim.amount)}` : "Ready for SOF text",
      usage: "Extracts NOR, berthing, loading, stoppage, completion and demurrage balance."
    }
  ];
}

function renderDataTrustLayer() {
  if (!dataTrustLayer) return;
  const rows = dataTrustRows();
  dataTrustLayer.innerHTML = rows.map((row) => `
    <article class="data-trust-card">
      <div>
        <strong>${escapeHtml(row.name)}</strong>
        <em class="source-badge ${row.badge}">${sourceBadgeText(row.badge)}</em>
      </div>
      <span>${escapeHtml(row.provider)}</span>
      <b>${escapeHtml(row.value)}</b>
      <div class="trust-meter"><span style="width:${clamp(row.confidence, 0, 100)}%"></span></div>
      <small>${row.confidence}% confidence · updated ${escapeHtml(row.updated)} · ${escapeHtml(row.usage)}</small>
    </article>
  `).join("");
}

function renderAllPlatformCore() {
  renderWorkspaceStatus();
  renderKanbanBoard();
  renderNotifications();
  renderDatabase();
  renderAnalytics();
  renderAdminPanel();
  renderDataSources();
}

function parseMoneyNumber(value) {
  const number = Number(String(value ?? "").replace(/,/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function detectCargoTypeFromText(text = "") {
  const normalized = text.toLowerCase();
  const pairs = [
    ["container", ["container", "teu", "konteyner"]],
    ["coal", ["coal", "komur", "kömür"]],
    ["grain", ["grain", "wheat", "corn", "barley", "tahil", "tahıl"]],
    ["ironOre", ["iron ore", "ore", "demir cevheri"]],
    ["crudeOil", ["crude", "oil", "dirty tanker"]],
    ["lng", ["lng", "gas carrier"]],
    ["chemicals", ["chemical", "chemicals", "imo class"]],
    ["projectCargo", ["project", "heavy lift", "mpp"]]
  ];
  return pairs.find(([, words]) => words.some((word) => normalized.includes(word)))?.[0] || "grain";
}

function cleanPlaceName(value = "") {
  return value
    .replace(/\b(laycan|lc|freight|frt|rate|demurrage|dem|dmg|pmt|pdpr|fiost|fio|subject|subjects)\b.*$/i, "")
    .replace(/[,.]+$/g, "")
    .trim();
}

function extractRouteFromText(text = "") {
  const patterns = [
    /\bfrom\s+([A-Za-z][A-Za-z\s.'-]{2,44})\s+(?:to|\/)\s+([A-Za-z][A-Za-z\s.'-]{2,44})(?=\s+(?:laycan|lc|freight|frt|rate|dem|dmg|subject|subjects)|[,.;]|$)/i,
    /\b(?:coal|grain|wheat|corn|ore|lng|container|crude|chemicals?|cargo)\s+([A-Za-z][A-Za-z\s.'-]{2,44})\s+(?:to|\/)\s+([A-Za-z][A-Za-z\s.'-]{2,44})(?=\s+(?:laycan|lc|freight|frt|rate|dem|dmg|subject|subjects)|[,.;]|$)/i,
    /\bload(?:ing)?(?: port)?\s*[:/-]\s*([A-Za-z][A-Za-z\s.'-]{2,44}).*?\b(?:discharge|disport)(?: port)?\s*[:/-]\s*([A-Za-z][A-Za-z\s.'-]{2,44})/i
  ];
  const match = patterns.map((pattern) => text.match(pattern)).find(Boolean);
  if (!match) return { loadPort: "", dischargePort: "", route: "" };
  const loadPort = cleanPlaceName(match[1]);
  const dischargePort = cleanPlaceName(match[2]);
  return { loadPort, dischargePort, route: loadPort && dischargePort ? `${loadPort} / ${dischargePort}` : "" };
}

function extractLaycan(text = "") {
  return text.match(/(?:laycan|lc)\s*[:/-]?\s*([0-9]{1,2}\s*(?:\/|-|to)\s*[0-9]{1,2}\s*(?:[A-Za-z]{3,9})?)/i)?.[1]?.replace(/\s+/g, " ").trim()
    || text.match(/\b([0-9]{1,2}\s*(?:\/|-)\s*[0-9]{1,2}\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*)\b/i)?.[1]
    || "";
}

function laycanWindowDays(laycan = "") {
  const numbers = laycan.match(/[0-9]{1,2}/g)?.map(Number) || [];
  if (numbers.length < 2) return 0;
  return Math.max(1, Math.abs(numbers[1] - numbers[0]) + 1);
}

function extractQuantity(text = "", cargoType = "grain") {
  const unit = getCargoProfile(cargoType).unit;
  const match = text.match(/\b([0-9]+(?:[.,][0-9]+)?)\s*(k|m)?\s*(?:mt|mts|tons?|teu|cbm|dwt)?\b/i);
  if (!match) return { quantity: 0, unit };
  let quantity = parseMoneyNumber(match[1]);
  if ((match[2] || "").toLowerCase() === "k") quantity *= 1000;
  if ((match[2] || "").toLowerCase() === "m") quantity *= 1000000;
  return { quantity, unit };
}

function extractCommercialNumber(text = "", labels = []) {
  const labelPattern = labels.join("|");
  const direct = text.match(new RegExp(`(?:${labelPattern})[^0-9$]*(?:usd|us\\$|\\$)?\\s*([0-9]+(?:[.,][0-9]+)?)`, "i"));
  if (direct) return parseMoneyNumber(direct[1]);
  return 0;
}

function parseOfferText(text = "") {
  const cargoType = detectCargoTypeFromText(text);
  const cargo = getCargoProfile(cargoType);
  const route = extractRouteFromText(text);
  const freight = extractCommercialNumber(text, ["freight", "frt", "rate"]) || parseMoneyNumber(text.match(/(?:usd|us\$|\$)\s*([0-9]+(?:[.,][0-9]+)?)\s*(?:pmt|\/mt|per mt|teu|cbm)/i)?.[1]);
  const demurrage = extractCommercialNumber(text, ["demurrage", "dem", "dmg"]) || parseMoneyNumber(text.match(/([0-9][0-9,]{3,})\s*(?:pdpr|per day|\/day)/i)?.[1]);
  const laycan = extractLaycan(text);
  const { quantity, unit } = extractQuantity(text, cargoType);
  const commission = parseMoneyNumber(text.match(/([0-9]+(?:[.,][0-9]+)?)\s*(?:pct|%|percent)(?:\s+total)?(?:\s+commission|\s+comm)?/i)?.[1]);
  const vesselSize = text.match(/\b(handymax|supramax|ultramax|panamax|kamsarmax|cape(?:size)?|aframax|suezmax|vlcc|lng carrier|container|bulk carrier|[0-9]{2,3}k\s*dwt)\b/i)?.[0] || cargo.vessel;
  const subjects = text.match(/\bsubject[s]?\s+(.+)$/i)?.[1]?.trim() || (text.toLowerCase().includes("subject") ? "Subjects mentioned; details to confirm" : "");
  const missing = [
    !route.route && "load/discharge port",
    !quantity && "cargo quantity",
    !freight && "freight rate",
    !laycan && "laycan",
    !demurrage && "demurrage",
    !commission && "commission"
  ].filter(Boolean);
  return {
    rawText: text,
    cargoType,
    cargoLabel: cargo.label,
    cargoNote: cargo.note,
    quantity,
    unit,
    freight,
    demurrage,
    laycan,
    laycanDays: laycanWindowDays(laycan),
    commission,
    vesselSize,
    subjects,
    missing,
    ...route
  };
}

function scoreParsedOffer(parsed) {
  const cargo = getCargoProfile(parsed.cargoType);
  const factors = [];
  let score = Math.round(cargo.risk * 0.45);
  if (parsed.missing.length) {
    score += parsed.missing.length * 7;
    factors.push(`Missing fields: ${parsed.missing.join(", ")}`);
  }
  if (parsed.laycanDays && parsed.laycanDays <= 3) {
    score += 14;
    factors.push("Very narrow laycan window.");
  }
  if (parsed.laycanDays >= 7) {
    score -= 5;
    factors.push("Laycan has workable buffer.");
  }
  if (parsed.freight && parsed.freight < cargo.baseFreight * 0.92) {
    score += 10;
    factors.push("Freight is under cargo model mid-market.");
  }
  if (!parsed.demurrage) {
    score += 6;
    factors.push("Demurrage rate should be fixed before recap.");
  }
  if (/iran|russia|syria|north korea|venezuela|crimea/i.test(parsed.rawText)) {
    score += 18;
    factors.push("Sanctions/compliance keyword detected.");
  }
  if (/subject|subs/i.test(parsed.rawText)) {
    score += 4;
    factors.push("Deal still on subjects.");
  }
  return {
    score: clamp(Math.round(score), 0, 100),
    label: score >= 70 ? "High" : score >= 45 ? "Medium" : "Low",
    factors: factors.length ? factors : ["No major red flag detected from the pasted text."]
  };
}

function parsedOfferReport(parsed) {
  const risk = scoreParsedOffer(parsed);
  return [
    "FOCUSEA SMART OFFER REPORT",
    `Cargo: ${parsed.cargoLabel}`,
    `Quantity: ${parsed.quantity ? parsed.quantity.toLocaleString("en-US") : "-"} ${parsed.unit}`,
    `Route: ${parsed.route || "-"}`,
    `Laycan: ${parsed.laycan || "-"} (${parsed.laycanDays || "-"} days)`,
    `Freight: ${parsed.freight ? money(parsed.freight, 2) : "-"} / ${parsed.unit}`,
    `Demurrage: ${parsed.demurrage ? money(parsed.demurrage) : "-"} / day`,
    `Vessel size: ${parsed.vesselSize}`,
    `Commission: ${parsed.commission ? `${parsed.commission}%` : "-"}`,
    `Subjects: ${parsed.subjects || "-"}`,
    `Risk: ${risk.label} (${risk.score}/100)`,
    "",
    "Risk factors:",
    ...risk.factors.map((item) => `- ${item}`),
    "",
    `Missing: ${parsed.missing.length ? parsed.missing.join(", ") : "None"}`
  ].join("\n");
}

function renderParsedOfferOutput(element, parsed, title = "Parsed offer") {
  const risk = scoreParsedOffer(parsed);
  if (!element) return;
  element.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: parsed.cargoLabel },
      { label: "Quantity", value: `${parsed.quantity ? parsed.quantity.toLocaleString("en-US") : "-"} ${parsed.unit}` },
      { label: "Route", value: parsed.route || "-" },
      { label: "Laycan", value: parsed.laycan || "-" },
      { label: "Freight", value: parsed.freight ? `${money(parsed.freight, 2)}/${parsed.unit}` : "-" },
      { label: "Demurrage", value: parsed.demurrage ? `${money(parsed.demurrage)}/day` : "-" },
      { label: "Vessel", value: parsed.vesselSize },
      { label: "Risk", value: `<span class="risk-${risk.label.toLowerCase()}">${risk.score}/100 ${risk.label}</span>` }
    ])}
    <div class="score-meter"><span style="width:${risk.score}%"></span></div>
    <ul class="compact-list">${risk.factors.map((item) => `<li>${item}</li>`).join("")}</ul>
    <small>${title}: ${parsed.missing.length ? `Eksik alanlar: ${parsed.missing.join(", ")}` : "Offer karti recap icin yeterli gorunuyor."}</small>
  `;
}

function applyParsedOfferToTracker(parsed) {
  if (!parsed || !offerTrackerForm) return false;
  writeFormValues(offerTrackerForm, {
    cargoType: parsed.cargoType,
    route: parsed.route || offerTrackerForm.elements.route?.value || "",
    ownerRate: parsed.freight || getCargoProfile(parsed.cargoType).baseFreight,
    counterRate: parsed.freight ? (parsed.freight * 0.97).toFixed(2) : getCargoProfile(parsed.cargoType).baseFreight,
    laycan: parsed.laycan || "",
    status: "Firm offer"
  });
  renderOfferTracker();
  renderKanbanBoard();
  renderNotifications();
  return true;
}

function buildCopilotCounterWording(parsed, risk) {
  const cargo = getCargoProfile(parsed.cargoType);
  const freight = parsed.freight || cargo.baseFreight;
  const counterRate = freight * (risk.score >= 65 ? 1.04 : risk.score >= 45 ? 1.02 : 1);
  const demurrage = parsed.demurrage || cargo.baseFreight * 850;
  return [
    `We can counter at ${money(counterRate, 2)}/${parsed.unit} basis ${parsed.route || "load/discharge ports TBC"}, subject clean recap and final CP approval.`,
    `Demurrage to be no less than ${money(demurrage)}/day pro rata, despatch if any to be half demurrage unless otherwise agreed.`,
    "NOR, weather exceptions, waiting time and commission to be expressly stated in recap before subjects are lifted."
  ];
}

function buildCopilotMailDraft(parsed, risk, questions) {
  const greeting = "Dear Sirs,";
  const route = parsed.route || "[load port] / [discharge port]";
  const freight = parsed.freight ? `${money(parsed.freight, 2)}/${parsed.unit}` : "[freight TBC]";
  const demurrage = parsed.demurrage ? `${money(parsed.demurrage)}/day` : "[demurrage TBC]";
  return [
    greeting,
    "",
    `Many thanks. We note ${parsed.quantity ? parsed.quantity.toLocaleString("en-US") : "[qty]"} ${parsed.unit} ${parsed.cargoLabel} ${route}, laycan ${parsed.laycan || "[laycan TBC]"}, freight ${freight}, demurrage ${demurrage}.`,
    "",
    risk.score >= 65
      ? "Before we can treat this as workable, please confirm the below points and improve the commercial protection around laycan, NOR and subjects."
      : "This looks workable subject to the below confirmations and clean recap wording.",
    "",
    ...questions.map((item) => `- ${item}`),
    "",
    "Best regards,"
  ].join("\n");
}

function renderBrokerCopilot() {
  if (!brokerCopilotForm || !brokerCopilotResult) return;
  const parsed = parseOfferText(new FormData(brokerCopilotForm).get("fixtureText") || "");
  const risk = scoreParsedOffer(parsed);
  const questions = parsed.missing.map((field) => `Confirm ${field} before firm recap.`);
  if (!questions.length) questions.push("Ask whether freight is subject to berth terms, taxes and final CP details.");
  questions.push("Check NOR validity, weather exceptions, demurrage/despatch and commission wording.");
  const counterWording = buildCopilotCounterWording(parsed, risk);
  const mailDraft = buildCopilotMailDraft(parsed, risk, questions);
  lastCopilotReport = {
    parsed,
    risk,
    questions,
    counterWording,
    mailDraft,
    reportText: [
      parsedOfferReport(parsed),
      "",
      "Copilot action points:",
      ...questions.map((item) => `- ${item}`),
      "",
      "Counter wording:",
      ...counterWording.map((item) => `- ${item}`),
      "",
      "Mail draft:",
      mailDraft
    ].join("\n")
  };
  renderParsedOfferOutput(brokerCopilotResult, parsed, "Broker Copilot");
  brokerCopilotResult.insertAdjacentHTML("beforeend", `
    <div class="danger-box">
      ${questions.map((item) => `<p><span>Action</span>${item}</p>`).join("")}
    </div>
    <div class="copilot-output-grid">
      <div>
        <strong>Counter wording</strong>
        <ul class="compact-list">${counterWording.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
      <div>
        <strong>Broker mail draft</strong>
        <pre class="template-preview">${escapeHtml(mailDraft)}</pre>
      </div>
    </div>
  `);
}

function renderOfferParser() {
  if (!offerParserForm || !offerParserResult) return;
  lastParsedOffer = parseOfferText(new FormData(offerParserForm).get("offerText") || "");
  renderParsedOfferOutput(offerParserResult, lastParsedOffer, "Smart Offer Parser");
}

function calculateTceOptimization(values) {
  const cargo = getCargoProfile(values.cargoType);
  const speeds = [11, 12, 13, 14];
  const rows = speeds.map((speed) => {
    const seaDays = (Number(values.distance) || 0) / speed / 24;
    const speedFactor = Math.pow(speed / 13, 2.7);
    const seaCons = (Number(values.seaCons) || 0) * speedFactor * cargo.bunkerMultiplier;
    const bunkerCost = seaDays * seaCons * (Number(values.bunkerPrice) || 0);
    const portDays = Number(values.portDays) || 0;
    const totalDays = seaDays + portDays;
    const rate = (Number(values.freightRate) || cargo.baseFreight) * cargo.freightMultiplier;
    const gross = (Number(values.cargoQty) || 0) * rate;
    const portCost = 68000 * cargo.portCostMultiplier;
    const netRevenue = gross - bunkerCost - portCost;
    const hire = totalDays * (Number(values.dailyHire) || 0);
    const tce = totalDays ? netRevenue / totalDays : 0;
    const pnl = netRevenue - hire;
    return { speed, seaDays, totalDays, seaCons, bunkerCost, rate, gross, tce, pnl };
  });
  const best = rows.reduce((winner, row) => row.pnl > winner.pnl ? row : winner, rows[0]);
  const fastest = rows[rows.length - 1];
  const recommendation = best.speed < fastest.speed
    ? `Best economics at ${best.speed} kn: lower bunker burn improves P&L by ${money(best.pnl - fastest.pnl)} versus 14 kn.`
    : `Fast speed is commercially justified: ${best.speed} kn gives best P&L while keeping ETA tight.`;
  return { cargo, rows, best, recommendation };
}

function renderTceOptimizer() {
  if (!tceOptimizerForm || !tceOptimizerResult) return;
  const values = collectFormValues(tceOptimizerForm);
  lastTceOptimization = calculateTceOptimization(values);
  const { cargo, rows, best, recommendation } = lastTceOptimization;
  tceOptimizerResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: cargo.label },
      { label: "Best speed", value: `${best.speed} kn` },
      { label: "Best TCE", value: `${money(best.tce)}/day` },
      { label: "Best P&L", value: money(best.pnl) },
      { label: "Bunker cost", value: money(best.bunkerCost) },
      { label: "Total days", value: `${best.totalDays.toFixed(1)}d` }
    ])}
    <table class="mini-table">
      <thead><tr><th>Speed</th><th>Days</th><th>Bunker</th><th>TCE</th><th>P&L</th></tr></thead>
      <tbody>${rows.map((row) => `<tr><td>${row.speed} kn</td><td>${row.totalDays.toFixed(1)}</td><td>${money(row.bunkerCost)}</td><td>${money(row.tce)}</td><td>${money(row.pnl)}</td></tr>`).join("")}</tbody>
    </table>
    <small>${recommendation}</small>
  `;
}

function renderRiskRadar() {
  if (!riskRadarForm || !riskRadarResult) return;
  const values = collectFormValues(riskRadarForm);
  const cargo = getCargoProfile(values.cargoType);
  const clauseRisk = { low: 6, medium: 16, high: 30 }[values.clauseRisk] || 12;
  const sanctionsRisk = { low: 2, medium: 12, high: 28 }[values.sanctionsRisk] || 2;
  const laycanRisk = Number(values.laycanDays) <= 3 ? 18 : Number(values.laycanDays) <= 5 ? 9 : 3;
  const tceRisk = Number(values.tce) < 16000 ? 18 : Number(values.tce) < 22000 ? 8 : 2;
  const congestionRisk = (Number(values.portCongestion) || 0) * 0.24;
  const bunkerRisk = liveFeedState.bunker > 660 ? 8 : liveFeedState.bunker > 620 ? 4 : 1;
  const score = clamp(Math.round(cargo.risk * 0.22 + clauseRisk + sanctionsRisk + laycanRisk + tceRisk + congestionRisk + bunkerRisk), 0, 100);
  const label = score >= 70 ? "High" : score >= 45 ? "Medium" : "Low";
  const verdict = score >= 72 || Number(values.tce) < 14000 ? "Avoid" : score >= 46 ? "Watch" : "Fix";
  const exposure = Math.round((Number(values.portCongestion) || 0) * cargo.demurrageMultiplier * 280 + bunkerRisk * 1200 + laycanRisk * 900);
  const factors = [
    `Cargo baseline risk ${cargo.risk}/100 (${cargo.label}).`,
    `Laycan contributes ${laycanRisk} risk points.`,
    `Clause risk contributes ${clauseRisk} risk points.`,
    `Port congestion ${values.portCongestion}% contributes ${congestionRisk.toFixed(1)} risk points.`,
    `Sanctions/compliance contributes ${sanctionsRisk} risk points.`,
    `TCE check contributes ${tceRisk} risk points.`
  ];
  const redFlags = [
    laycanRisk >= 18 && "Narrow laycan: cancellation and failed-subject risk.",
    clauseRisk >= 30 && "High clause risk: NOR/laytime wording needs counter language.",
    sanctionsRisk >= 28 && "Compliance high: screen cargo origin, owner, charterer and payment.",
    tceRisk >= 18 && "Low TCE: economics are weak before operational risk.",
    congestionRisk >= 14 && "Port delay risk: add waiting cost and demurrage exposure."
  ].filter(Boolean);
  const recommendation = verdict === "Fix"
    ? "Fixable: keep evidence clean and confirm recap basics before lifting subjects."
    : verdict === "Watch"
      ? "Watch: proceed only after clause, port and cost exposure are tightened."
      : "Avoid: renegotiate freight/laycan/clauses or keep subjects open.";
  lastRiskRadar = {
    values,
    cargo: cargo.label,
    score,
    label,
    verdict,
    exposure,
    factors,
    redFlags,
    reportText: [
      "FOCUSEA FIXTURE RISK RADAR 2.0",
      `Cargo: ${cargo.label}`,
      `Verdict: ${verdict}`,
      `Risk score: ${score}/100 ${label}`,
      `Estimated exposure: ${money(exposure)}`,
      "",
      ...factors.map((item) => `- ${item}`),
      "",
      "Red flags:",
      ...(redFlags.length ? redFlags.map((item) => `- ${item}`) : ["- No hard red flag detected."]),
      "",
      "Broker recommendation:",
      recommendation
    ].join("\n")
  };
  riskRadarResult.innerHTML = `
    ${metricCards([
      { label: "Verdict", value: `<span class="verdict-${verdict.toLowerCase()}">${verdict}</span>` },
      { label: "Risk score", value: `${score}/100 ${label}` },
      { label: "Exposure", value: money(exposure) },
      { label: "Cargo", value: cargo.label },
      { label: "TCE", value: `${money(values.tce)}/day` },
      { label: "Bunker", value: `${bunkerPriceLabel(liveFeedState.bunker)}` }
    ])}
    <div class="score-meter"><span style="width:${score}%"></span></div>
    <div class="risk-radar-grid">
      <div>
        <strong>Decision</strong>
        <p>${recommendation}</p>
      </div>
      <div>
        <strong>Red flags</strong>
        <ul class="compact-list">${(redFlags.length ? redFlags : ["No hard red flag detected."]).map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
    </div>
    <ul class="compact-list">${factors.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

function renderMarketBrief() {
  if (!marketBriefResult) return;
  const seconds = new Date().getSeconds();
  const dryBulk = liveFeedState.dryBulkStates[seconds % liveFeedState.dryBulkStates.length];
  const lngWatch = liveFeedState.lngStates[Math.floor(seconds / 20) % liveFeedState.lngStates.length];
  const security = liveFeedState.securityAreas[Math.floor(seconds / 15) % liveFeedState.securityAreas.length];
  const brief = [
    `Bunker: ${bunkerPriceLabel(liveFeedState.bunker)} (${liveFeedState.bunker > 650 ? "expensive" : "normal watch"}).`,
    `Port congestion: ${liveFeedState.congestion}% (${liveFeedState.congestion > 55 ? "delay risk high" : "manageable"}).`,
    `BDI: ${liveFeedState.bdi.toLocaleString("en-US")} (${liveFeedState.bdi > 2200 ? "dry bulk firming" : "dry bulk watch"}).`,
    `BDTI: ${liveFeedState.bdti.toLocaleString("en-US")} (${liveFeedState.bdti > 1150 ? "dirty tanker premium rising" : "dirty tanker balanced"}).`,
    `Dry bulk: ${dryBulk}.`,
    `Container index: ${liveFeedState.containerIndex.toLocaleString("en-US")} / SCFI ${liveFeedState.scfi.toLocaleString("en-US")}.`,
    `Carbon: EUA ${formatMarketIndexValue(marketIndexDefinitions.find((item) => item.id === "eua"), liveFeedState.eua)}.`,
    `LNG watch: ${lngWatch}.`,
    `Security: ${security}.`,
    `Weather alerts: ${liveFeedState.weather}.`
  ];
  lastMarketBrief = {
    title: "Focusea Live Market Brief",
    brief,
    reportText: ["FOCUSEA LIVE MARKET BRIEF", `Generated: ${new Date().toLocaleString()}`, "", ...brief.map((item) => `- ${item}`)].join("\n")
  };
  marketBriefResult.innerHTML = `
    ${metricCards([
      { label: "Bunker", value: `${bunkerPriceLabel(liveFeedState.bunker)}` },
      { label: "BDI", value: liveFeedState.bdi.toLocaleString("en-US") },
      { label: "SCFI", value: liveFeedState.scfi.toLocaleString("en-US") },
      { label: "EUA", value: `${liveFeedState.eua.toFixed(2)} EUR/t` }
    ])}
    <ul class="compact-list">${brief.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

function formatMarketIndexValue(definition, rawValue) {
  const value = Number(rawValue || 0);
  const digits = definition?.decimals ?? (Math.abs(value) < 20 && !Number.isInteger(value) ? 2 : 0);
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
  const unit = definition?.unit || "idx";

  if (unit === "$/t") return `${money(value, digits)}/t`;
  if (unit === "$/FEU") return `${money(value, digits)}/FEU`;
  if (unit === "$/day") return `${money(value, digits)}/day`;
  if (unit === "$/MMBtu") return `${money(value, digits)}/MMBtu`;
  if (unit === "EUR/t") return `EUR ${formatted}/t`;
  if (unit === "%") return `${formatted}%`;
  if (unit === "WS") return `WS ${formatted}`;
  return `${formatted} ${unit}`;
}

function sourceBadgeText(source) {
  return {
    verified: "verified",
    "api-ready": "API-ready",
    licensed: "licensed",
    simulated: "simulated",
    input: "user input"
  }[source] || source;
}

function marketIndexValue(definition) {
  return liveFeedState[definition.key] ?? 0;
}

function isBalticIndex(definition) {
  return !!definition && balticIndexIds.includes(definition.id);
}

function balticDefinitions() {
  return balticIndexIds
    .map((id) => marketIndexDefinitions.find((definition) => definition.id === id))
    .filter(Boolean);
}

function setBalticEndpoint(endpoint) {
  balticFeedState.endpoint = String(endpoint || "").trim();
  safeLocalSet("focusea-baltic-feed-endpoint-v1", balticFeedState.endpoint);
}

function loadBalticEndpoint() {
  balticFeedState.endpoint = safeLocalGet("focusea-baltic-feed-endpoint-v1", "") || "";
  const input = balticFeedForm?.querySelector('[name="feedUrl"]');
  if (input) input.value = balticFeedState.endpoint;
}

function readBalticValue(payload, definition) {
  const keys = [definition.id, definition.id.toUpperCase(), definition.short, definition.key];
  for (const key of keys) {
    const value = Number(payload?.[key]);
    if (Number.isFinite(value)) return value;
  }
  return null;
}

function applyBalticPayload(payload = {}) {
  const rows = balticDefinitions();
  rows.forEach((definition) => {
    const next = readBalticValue(payload, definition);
    if (next !== null) liveFeedState[definition.key] = next;
  });
  balticFeedState.connected = true;
  balticFeedState.lastError = "";
  balticFeedState.lastSource = payload.source || "Licensed Baltic feed";
  balticFeedState.lastChecked = payload.timestamp || new Date().toLocaleTimeString();
}

async function refreshBalticLicensedFeed() {
  balticFeedState.polls += 1;
  balticFeedState.lastChecked = new Date().toLocaleTimeString();
  if (!balticFeedState.endpoint) {
    balticFeedState.connected = false;
    balticFeedState.lastSource = "Baltic Exchange licensed API required";
    balticFeedState.lastError = "No licensed endpoint connected.";
    renderBalticFeedPanel();
    return;
  }

  try {
    const response = await fetchWithTimeout(balticFeedState.endpoint, 900);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    applyBalticPayload(payload);
  } catch (error) {
    balticFeedState.connected = false;
    balticFeedState.lastError = error.message || "Feed failed.";
  }
  renderBalticFeedPanel();
}

function renderBalticFeedPanel() {
  if (!balticFeedResult) return;
  const rows = balticDefinitions();
  const status = balticFeedState.connected ? "connected" : "licensed required";
  const badge = balticFeedState.connected ? "verified" : "licensed";
  balticFeedResult.innerHTML = `
    ${metricCards([
      { label: "Status", value: `<em class="source-badge ${badge}">${sourceBadgeText(badge)}</em>` },
      { label: "Refresh", value: "1s" },
      { label: "Polls", value: balticFeedState.polls },
      { label: "Last check", value: escapeHtml(balticFeedState.lastChecked || "waiting") }
    ])}
    <div class="confidence-list">
      ${rows.map((definition) => `
        <div class="confidence-row">
          <strong>${escapeHtml(definition.short)}</strong>
          <span>${formatMarketIndexValue(definition, marketIndexValue(definition))}</span>
          <em class="source-badge ${badge}">${status}</em>
        </div>
      `).join("")}
    </div>
    <small>${escapeHtml(balticFeedState.lastSource)} / ${escapeHtml(balticFeedState.lastError || "Licensed feed is active.")}</small>
  `;
}

function marketIndexDelta(definition) {
  const bunkerChange = bunkerChangeForDefinition(definition);
  if (bunkerChange !== null) return Number(bunkerChange.toFixed(definition.decimals ?? 1));
  if (isBalticIndex(definition) && !balticFeedState.connected) return 0;
  const seconds = Date.now() / 1000;
  const seed = definition.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const swing = Math.sin((seconds + seed) / 18) * (definition.volatility || 1);
  const congestionBias = definition.sector === "Port / Risk" ? (liveFeedState.congestion - 40) * 0.08 : 0;
  const bunkerBias = definition.sector === "Bunker" ? (liveFeedState.bunker - 620) * 0.018 : 0;
  const delta = swing * 0.35 + congestionBias + bunkerBias;
  return Number(delta.toFixed(definition.decimals ?? 1));
}

function marketIndexInsight(definition, value, delta) {
  const sign = delta > 0 ? "rising" : delta < 0 ? "easing" : "flat";
  const feedName = definition.source === "verified"
    ? `verified ${verifiedBunkerSnapshot.sourceName} snapshot`
    : definition.source === "licensed"
      ? "licensed source layer"
      : "demo feed";
  const riskTone = definition.sector === "Port / Risk" && value > 65
    ? "High operational risk; add buffer before fixing."
    : definition.sector === "Bunker" && value > 680
      ? "Bunker pressure is high; speed and ROB sensitivity matter."
      : definition.sector === "Carbon / Green" && value > 70
        ? "Carbon cost is material; clarify ETS/FuelEU allocation."
        : "Use as a directional signal, not as a final rate.";
  return `${definition.short} is ${sign} in the ${feedName}. ${riskTone}`;
}

function filteredMarketIndexes() {
  const formData = marketIndexForm ? new FormData(marketIndexForm) : new FormData();
  const sector = String(formData.get("sectorFilter") || "all");
  const source = String(formData.get("sourceFilter") || "all");
  const query = String(formData.get("indexQuery") || "").trim().toLowerCase();
  return marketIndexDefinitions.filter((definition) => {
    const matchesSector = sector === "all" || definition.sector === sector;
    const matchesSource = source === "all" || definition.source === source;
    const haystack = `${definition.short} ${definition.name} ${definition.sector} ${definition.note} ${definition.brokerUse}`.toLowerCase();
    return matchesSector && matchesSource && (!query || haystack.includes(query));
  });
}

function renderMarketIndexes(focusId = "") {
  if (!marketIndexGrid || !marketIndexDetail) return;
  const indexes = filteredMarketIndexes();
  if (focusId) selectedMarketIndexId = focusId;
  if (!indexes.some((definition) => definition.id === selectedMarketIndexId)) {
    selectedMarketIndexId = indexes[0]?.id || "";
  }

  if (!indexes.length) {
    marketIndexGrid.innerHTML = "";
    marketIndexDetail.innerHTML = `
      <div class="empty-state">
        <strong>No index found</strong>
        <p>Try another sector, source status or search term.</p>
      </div>
    `;
    return;
  }

  marketIndexGrid.innerHTML = indexes.map((definition) => {
    const value = marketIndexValue(definition);
    const delta = marketIndexDelta(definition);
    const trendClass = delta > 0.2 ? "positive" : delta < -0.2 ? "negative" : "neutral";
    const trendText = delta > 0 ? `+${delta}` : `${delta}`;
    const trendSource = definition.source === "verified" ? "source" : definition.source === "licensed" ? "licensed" : "demo";
    return `
      <button class="market-index-card ${definition.id === selectedMarketIndexId ? "active" : ""}" type="button" data-market-index="${definition.id}">
        <span>${escapeHtml(definition.sector)}</span>
        <em class="source-badge ${definition.source}">${sourceBadgeText(definition.source)}</em>
        <strong>${escapeHtml(definition.short)}</strong>
        <small>${escapeHtml(definition.name)}</small>
        <b>${formatMarketIndexValue(definition, value)}</b>
        <i class="index-change ${trendClass}">${trendText} ${trendSource}</i>
      </button>
    `;
  }).join("");

  const selected = marketIndexDefinitions.find((definition) => definition.id === selectedMarketIndexId) || indexes[0];
  const selectedValue = marketIndexValue(selected);
  const selectedDelta = marketIndexDelta(selected);
  const related = marketIndexDefinitions
    .filter((definition) => definition.sector === selected.sector && definition.id !== selected.id)
    .slice(0, 4);
  marketIndexDetail.innerHTML = `
    ${metricCards([
      { label: "Selected", value: escapeHtml(selected.short) },
      { label: "Value", value: formatMarketIndexValue(selected, selectedValue) },
      { label: "Sector", value: escapeHtml(selected.sector) },
      { label: "Source", value: `<em class="source-badge ${selected.source}">${sourceBadgeText(selected.source)}</em>` }
    ])}
    <div class="market-index-detail-body">
      <div>
        <h3>${escapeHtml(selected.name)}</h3>
        <p>${escapeHtml(selected.note)}</p>
        <p><strong>Broker use:</strong> ${escapeHtml(selected.brokerUse)}</p>
      </div>
      <div>
        <h3>Decision note</h3>
        <p>${escapeHtml(marketIndexInsight(selected, selectedValue, selectedDelta))}</p>
        <small>${selected.source === "verified" ? `Source: ${escapeHtml(bunkerSourceNote())}` : selected.source === "licensed" ? "Licensed market data stays locked until a paid/source-approved feed is connected." : "Values marked simulated/API-ready are demo signals until a verified market data source is connected."}</small>
      </div>
    </div>
    <div class="related-indexes">
      ${related.map((definition) => `<button type="button" data-market-index="${definition.id}">${escapeHtml(definition.short)} · ${formatMarketIndexValue(definition, marketIndexValue(definition))}</button>`).join("")}
    </div>
  `;
}

function renderRedFlagSystem() {
  if (!redFlagForm || !redFlagResult) return;
  const text = new FormData(redFlagForm).get("clauseText") || "";
  const analysis = analyzeClauseText(text);
  const riskScore = clamp(Math.round(analysis.ownerRisk * 0.8 + analysis.chartererRisk * 0.6 + analysis.dangerousSentences.length * 8), 0, 100);
  const side = analysis.ownerRisk > analysis.chartererRisk + 8 ? "Owner lehine" : analysis.chartererRisk > analysis.ownerRisk + 8 ? "Charterer lehine" : "Dengeli / yorum gerektirir";
  const recommendations = [
    analysis.dangerousSentences.length ? "Riskli cumleleri recap icinde ayrica qualify et." : "Major red flag yok; yine de NOR ve exceptions teyit edilmeli.",
    analysis.laytimeStops === "Evet" ? "Weather/exception wording laytime'i durdurabilir; evidence pack temiz tutulmali." : "Laytime interruption hakkinda acik exception yoksa pazarlikta netlestir.",
    analysis.demurrageLikely === "Yuksek" || analysis.demurrageLikely === "Yüksek" ? "Demurrage claim gucu yuksek olabilir; SOF ve NOR zamanlarini koru." : "Demurrage claim icin causation ve allowed time kontrol edilmeli."
  ];
  lastRedFlagReport = {
    text,
    analysis,
    side,
    riskScore,
    recommendations,
    reportText: [
      "FOCUSEA CLAUSE RED FLAG REPORT",
      `Bias: ${side}`,
      `Risk score: ${riskScore}/100`,
      `Risk owner: ${analysis.riskOwner}`,
      `Laytime stops: ${analysis.laytimeStops}`,
      `Demurrage likely: ${analysis.demurrageLikely}`,
      "",
      "Recommendations:",
      ...recommendations.map((item) => `- ${item}`),
      "",
      "Dangerous sentences:",
      ...(analysis.dangerousSentences.length ? analysis.dangerousSentences.map((item) => `- ${item.sentence} (${item.reason})`) : ["- None detected"])
    ].join("\n")
  };
  redFlagResult.innerHTML = `
    ${metricCards([
      { label: "Bias", value: side },
      { label: "Risk score", value: `${riskScore}/100` },
      { label: "Risk owner", value: analysis.riskOwner },
      { label: "Demurrage", value: analysis.demurrageLikely }
    ])}
    <div class="score-meter"><span style="width:${riskScore}%"></span></div>
    <div class="danger-box">${(analysis.dangerousSentences.length ? analysis.dangerousSentences : [{ sentence: "No specific dangerous sentence detected.", reason: "Still confirm NOR, laytime and exceptions." }]).map((item) => `<p><span>${item.reason}</span>${item.sentence}</p>`).join("")}</div>
    <ul class="compact-list">${recommendations.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

function buildRecapText(values) {
  return [
    "FIXTURE RECAP",
    "",
    `Vessel: ${values.vessel}`,
    `Cargo: ${values.cargo}`,
    `Load / Discharge: ${values.route}`,
    `Laycan: ${values.laycan}`,
    `Freight: ${values.freight}`,
    `Demurrage / Despatch: ${values.demurrage}`,
    `Commission: ${values.commission}`,
    `Subjects: ${values.subjects}`,
    "",
    "Main checks:",
    "- Vessel nomination and cargo quantity tolerance to be confirmed.",
    "- NOR validity, laytime, weather exceptions and demurrage wording to be aligned with CP.",
    "- Taxes, port costs, agency, canal dues and sanctions compliance to be checked before subjects lifted."
  ].join("\n");
}

function renderRecapBuilder() {
  if (!recapBuilderForm || !recapBuilderResult) return;
  const values = collectFormValues(recapBuilderForm);
  const reportText = buildRecapText(values);
  lastRecapReport = { values, reportText };
  recapBuilderResult.innerHTML = `<pre class="template-preview">${reportText}</pre>`;
}

function classifyEvidenceLine(line) {
  if (/nor/i.test(line)) return "NOR";
  if (/berth|berthed/i.test(line)) return "Berthing";
  if (/load|discharge|pump/i.test(line)) return "Cargo operation";
  if (/rain|stop|delay|weather/i.test(line)) return "Deduction / stoppage";
  if (/complete|finished|completion/i.test(line)) return "Completion";
  if (/doc|signed|log|invoice|statement/i.test(line)) return "Document";
  return "Note";
}

function renderEvidencePack() {
  if (!evidencePackForm || !evidencePackResult) return;
  const text = new FormData(evidencePackForm).get("evidenceText") || "";
  const lines = text.split(/\n|(?<=\.)\s+/).map((line) => line.trim()).filter(Boolean);
  const events = lines.map((line) => ({ type: classifyEvidenceLine(line), text: line }));
  const missingDocs = [
    !/nor.*signed|signed.*nor/i.test(text) && "signed NOR",
    !/sof.*signed|signed.*sof/i.test(text) && "signed SOF",
    !/rain log|weather log/i.test(text) && "weather/rain log",
    !/invoice|claim/i.test(text) && "demurrage invoice/claim cover"
  ].filter(Boolean);
  const readiness = clamp(100 - missingDocs.length * 18 + events.length * 2, 0, 100);
  lastEvidencePack = {
    events,
    missingDocs,
    readiness,
    reportText: [
      "FOCUSEA DEMURRAGE EVIDENCE PACK",
      `Readiness: ${readiness}/100`,
      "",
      "Events:",
      ...events.map((item) => `- ${item.type}: ${item.text}`),
      "",
      "Missing / weak evidence:",
      ...(missingDocs.length ? missingDocs.map((item) => `- ${item}`) : ["- None detected from pasted text"]),
      "",
      "Claim note:",
      readiness >= 75 ? "Evidence package looks strong enough for first claim draft." : "Evidence package needs stronger signed docs before claim escalation."
    ].join("\n")
  };
  evidencePackResult.innerHTML = `
    ${metricCards([
      { label: "Events", value: events.length },
      { label: "Readiness", value: `${readiness}/100` },
      { label: "Weak docs", value: missingDocs.length },
      { label: "Claim posture", value: readiness >= 75 ? "Strong" : "Needs work" }
    ])}
    <div class="event-list">${events.map((item) => `<div><strong>${item.type}</strong><span>${item.text}</span></div>`).join("")}</div>
    <small>${missingDocs.length ? `Eksik: ${missingDocs.join(", ")}` : "Core evidence items detected."}</small>
  `;
}

function renderCompanyIntel() {
  if (!companyIntelForm || !companyIntelResult) return;
  const values = collectFormValues(companyIntelForm);
  const relatedFixtures = focuseaDb.fixtures.slice(0, 3);
  let trust = 72;
  if (values.payment === "good") trust += 13;
  if (values.payment === "watch") trust -= 9;
  if (values.payment === "poor") trust -= 26;
  if (values.role === "Owner") trust += 3;
  if (values.role === "Charterer") trust -= 2;
  trust = clamp(trust, 0, 100);
  const paymentRisk = values.payment === "poor" ? "High payment risk" : values.payment === "watch" ? "Watch payment timing" : "Payment history acceptable";
  lastCompanyIntel = {
    values,
    trust,
    paymentRisk,
    reportText: [
      "FOCUSEA COMPANY INTELLIGENCE",
      `Company: ${values.companyName}`,
      `Role: ${values.role}`,
      `Trust score: ${trust}/100`,
      `Payment: ${paymentRisk}`,
      `Last contact: ${values.lastContact}`,
      "",
      "Past fixture sample:",
      ...relatedFixtures.map((item) => `- ${item.cargo} ${item.route}, TCE ${money(item.tce)}/day, risk ${item.risk}/100`),
      "",
      "Broker note:",
      trust < 55 ? "Keep subjects tight, request references and avoid releasing docs without payment clarity." : "Counterparty is workable; keep fixture history and recap trail updated."
    ].join("\n")
  };
  companyIntelResult.innerHTML = `
    ${metricCards([
      { label: "Company", value: values.companyName },
      { label: "Role", value: values.role },
      { label: "Trust score", value: `${trust}/100` },
      { label: "Payment", value: paymentRisk }
    ])}
    <div class="analytics-bars">${relatedFixtures.map((item) => `<div><span>${item.cargo}</span><em style="width:${clamp(item.tce / 320, 8, 100)}%"></em><strong>${money(item.tce)}</strong></div>`).join("")}</div>
  `;
}

function renderCargoIntel() {
  if (!cargoIntelForm || !cargoIntelResult) return;
  const values = collectFormValues(cargoIntelForm);
  const cargo = getCargoProfile(values.cargoType);
  const details = {
    coal: ["Hold cleanliness and moisture limits", "Self-heating watch", "Draft and load rate sensitivity"],
    grain: ["Fumigation and phytosanitary docs", "Rain exposure", "Stowage factor and trimming"],
    container: ["Slot cost, reefer plugs and index direction", "Port productivity", "Blank sailing sensitivity"],
    ironOre: ["High density cargo stability", "Deep draft ports", "Cape/Panamax spread"],
    crudeOil: ["Vetting, heating and terminal approval", "War risk and sanctions", "Tank cleaning / previous cargo"],
    lng: ["Terminal compatibility", "Boil-off and heel plan", "High demurrage sensitivity"],
    chemicals: ["Tank coating and IMO class", "Previous cargo restrictions", "Cleaning certificate"],
    projectCargo: ["Lifting plan and lashing", "Deck strength", "Port gear and permits"]
  }[values.cargoType] || [cargo.note];
  const marketRateValue = marketRate(cargo, liveFeedState.congestion > 55 ? "firm" : "neutral");
  lastCargoIntel = {
    values,
    cargo: cargo.label,
    details,
    marketRateValue,
    reportText: [
      "FOCUSEA CARGO INTELLIGENCE",
      `Cargo: ${cargo.label}`,
      `Market: ${values.market}`,
      `Preferred vessel: ${cargo.vessel}`,
      `Indicative rate: ${money(marketRateValue, 2)}/${cargo.unit}`,
      `Risk: ${cargo.risk}/100`,
      "",
      "Broker checklist:",
      ...details.map((item) => `- ${item}`),
      "",
      `Note: ${cargo.note}`
    ].join("\n")
  };
  cargoIntelResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: cargo.label },
      { label: "Preferred vessel", value: cargo.vessel },
      { label: "Indicative rate", value: `${money(marketRateValue, 2)}/${cargo.unit}` },
      { label: "Risk", value: `${cargo.risk}/100` }
    ])}
    <ul class="compact-list">${details.map((item) => `<li>${item}</li>`).join("")}</ul>
    <small>${cargo.note}</small>
  `;
}

function intelligenceCsvRows(kind) {
  if (kind === "offer" && lastParsedOffer) {
    return [
      ["field", "value"],
      ["cargo", lastParsedOffer.cargoLabel],
      ["quantity", lastParsedOffer.quantity],
      ["unit", lastParsedOffer.unit],
      ["route", lastParsedOffer.route],
      ["laycan", lastParsedOffer.laycan],
      ["freight", lastParsedOffer.freight],
      ["demurrage", lastParsedOffer.demurrage],
      ["vessel", lastParsedOffer.vesselSize]
    ];
  }
  if (kind === "tce" && lastTceOptimization) {
    return [
      ["speed", "total_days", "bunker_cost", "tce", "pnl"],
      ...lastTceOptimization.rows.map((row) => [row.speed, row.totalDays.toFixed(2), row.bunkerCost.toFixed(2), row.tce.toFixed(2), row.pnl.toFixed(2)])
    ];
  }
  return [["status", "No data"]];
}

function setIntelDownloadNotice(type, filename) {
  const prefix = type.split("-")[0];
  const targets = {
    copilot: brokerCopilotResult,
    offer: offerParserResult,
    tce: tceOptimizerResult,
    risk: riskRadarResult,
    market: marketBriefResult,
    clause: redFlagResult,
    recap: recapBuilderResult,
    evidence: evidencePackResult,
    company: companyIntelResult,
    cargo: cargoIntelResult
  };
  const target = targets[prefix];
  if (!target) return;
  target.querySelector(".download-confirm")?.remove();
  target.insertAdjacentHTML("beforeend", `<small class="download-confirm">Downloaded: ${filename}</small>`);
}

function handleIntelDownload(type) {
  if (type.startsWith("copilot") && !lastCopilotReport) renderBrokerCopilot();
  if (type.startsWith("offer") && !lastParsedOffer) renderOfferParser();
  if (type.startsWith("tce") && !lastTceOptimization) renderTceOptimizer();
  if (type.startsWith("risk") && !lastRiskRadar) renderRiskRadar();
  if (type.startsWith("market") && !lastMarketBrief) renderMarketBrief();
  if (type.startsWith("clause") && !lastRedFlagReport) renderRedFlagSystem();
  if (type.startsWith("recap") && !lastRecapReport) renderRecapBuilder();
  if (type.startsWith("evidence") && !lastEvidencePack) renderEvidencePack();
  if (type.startsWith("company") && !lastCompanyIntel) renderCompanyIntel();
  if (type.startsWith("cargo") && !lastCargoIntel) renderCargoIntel();

  const actions = {
    "copilot-pdf": () => downloadPdfFile("focusea-broker-copilot.pdf", "Focusea Broker Copilot", lastCopilotReport.reportText),
    "copilot-json": () => downloadJsonFile("focusea-broker-copilot.json", lastCopilotReport),
    "offer-json": () => downloadJsonFile("focusea-smart-offer.json", lastParsedOffer),
    "offer-csv": () => downloadCsvFile("focusea-smart-offer.csv", intelligenceCsvRows("offer")),
    "tce-pdf": () => downloadPdfFile("focusea-tce-optimizer.pdf", "Focusea TCE Optimizer", [
      lastTceOptimization.recommendation,
      "",
      ...lastTceOptimization.rows.map((row) => `${row.speed} kn | days ${row.totalDays.toFixed(1)} | bunker ${money(row.bunkerCost)} | TCE ${money(row.tce)} | P&L ${money(row.pnl)}`)
    ].join("\n")),
    "tce-csv": () => downloadCsvFile("focusea-tce-optimizer.csv", intelligenceCsvRows("tce")),
    "risk-pdf": () => downloadPdfFile("focusea-fixture-risk-radar.pdf", "Focusea Fixture Risk Radar", lastRiskRadar.reportText),
    "risk-json": () => downloadJsonFile("focusea-fixture-risk-radar.json", lastRiskRadar),
    "market-pdf": () => downloadPdfFile("focusea-market-brief.pdf", "Focusea Market Brief", lastMarketBrief.reportText),
    "market-txt": () => downloadTextFile("focusea-market-brief.txt", lastMarketBrief.reportText),
    "clause-pdf": () => downloadPdfFile("focusea-clause-red-flags.pdf", "Focusea Clause Red Flags", lastRedFlagReport.reportText),
    "clause-json": () => downloadJsonFile("focusea-clause-red-flags.json", lastRedFlagReport),
    "recap-pdf": () => downloadPdfFile("focusea-fixture-recap.pdf", "Focusea Fixture Recap", lastRecapReport.reportText),
    "recap-txt": () => downloadTextFile("focusea-fixture-recap.txt", lastRecapReport.reportText),
    "evidence-pdf": () => downloadPdfFile("focusea-demurrage-evidence-pack.pdf", "Focusea Demurrage Evidence Pack", lastEvidencePack.reportText),
    "evidence-json": () => downloadJsonFile("focusea-demurrage-evidence-pack.json", lastEvidencePack),
    "company-pdf": () => downloadPdfFile("focusea-company-intelligence.pdf", "Focusea Company Intelligence", lastCompanyIntel.reportText),
    "company-json": () => downloadJsonFile("focusea-company-intelligence.json", lastCompanyIntel),
    "cargo-pdf": () => downloadPdfFile("focusea-cargo-intelligence.pdf", "Focusea Cargo Intelligence", lastCargoIntel.reportText),
    "cargo-json": () => downloadJsonFile("focusea-cargo-intelligence.json", lastCargoIntel)
  };
  actions[type]?.();
  if (window.focuseaLastDownload?.filename) {
    setIntelDownloadNotice(type, window.focuseaLastDownload.filename);
  }
}

function renderAllBrokerIntelligence() {
  renderBrokerCopilot();
  renderOfferParser();
  renderTceOptimizer();
  renderRiskRadar();
  renderMarketBrief();
  renderRedFlagSystem();
  renderRecapBuilder();
  renderEvidencePack();
  renderCompanyIntel();
  renderCargoIntel();
}

const terminalDealData = {
  "coal-india": {
    ref: "FX-COAL-0726",
    vessel: "MV Baltic Trader",
    cargoType: "coal",
    cargo: "50,000 mt coal",
    route: "Indonesia / India",
    laycan: "10-15 Jul",
    freight: 18.5,
    demurrage: 18000,
    allowedHours: 72,
    usedHours: 89,
    baseRisk: 62,
    sections: {
      Offer: "Owner firm at USD 18.50 pmt FIOST, 2.5 pct commission. Charterer counter target USD 17.90 pmt.",
      Recap: "Need clean recap: vessel, cargo tolerance, laycan, demurrage/despatch, commission, subjects and governing CP.",
      CP: "GENCON-style terms. Watch NOR WIPON/WIBON, weather exception and berth waiting language.",
      SOF: "NOR 10 Jul 0800, berthed 10 Jul 1800, loading 11 Jul 0600, completed 14 Jul 2200.",
      Laytime: "Allowed 72h, estimated used 89h after deductions. Demurrage likely unless weather exception applies.",
      Demurrage: "Estimated exposure 17h x USD 18,000/day. Evidence pack should include NOR, SOF, rain log and terminal statement.",
      Emails: "Owner: firm offer. Charterer: stem subject. Broker: receiver approval and NOR wording pending.",
      Notes: "Receiver approval is the main close-out item."
    }
  },
  "grain-egypt": {
    ref: "FX-GRAIN-0826",
    vessel: "MV Danube Star",
    cargoType: "grain",
    cargo: "35,000 mt wheat",
    route: "Black Sea / Egypt",
    laycan: "18-22 Jul",
    freight: 24.2,
    demurrage: 16500,
    allowedHours: 96,
    usedHours: 88,
    baseRisk: 44,
    sections: {
      Offer: "Charterer bid USD 24.20 pmt. Owner asking USD 25.10 pmt with board approval subject.",
      Recap: "Confirm fumigation, phytosanitary docs, draft restriction and discharge rate.",
      CP: "GENCON grain rider with rain exception and shifting time treatment to be checked.",
      SOF: "Draft SOF clean. Await final port log from discharge agent.",
      Laytime: "Allowed 96h, model used 88h. Dispatch possible if docs remain clean.",
      Demurrage: "No current demurrage claim; monitor weather exception wording.",
      Emails: "Counter sent. Owner to revert with stem and board approval.",
      Notes: "Good candidate for quick fixture if rate gap closes."
    }
  },
  "container-la": {
    ref: "FX-CONT-0926",
    vessel: "MV Orion",
    cargoType: "container",
    cargo: "1,400 TEU mixed containers",
    route: "Shanghai / Los Angeles",
    laycan: "05-09 Aug",
    freight: 1550,
    demurrage: 32000,
    allowedHours: 54,
    usedHours: 69,
    baseRisk: 58,
    sections: {
      Offer: "Slot package at USD 1,550/TEU. Reefer plugs, D&D and terminal window still subject.",
      Recap: "Need reefer count, hazardous cargo list, free time and terminal cut-off.",
      CP: "Service contract plus addendum. Clarify port omission and congestion surcharge.",
      SOF: "Terminal appointment pending; ETA window tied to berth congestion.",
      Laytime: "Port time pressure high. Waiting exposure can erase rate upside.",
      Demurrage: "D&D risk high if terminal window moves. Ask for free time and storage carve-outs.",
      Emails: "Line asked for final commodity list. Charterer checking receiver readiness.",
      Notes: "Index movement and LA queue should be watched hourly."
    }
  }
};

function buildDealFileSections(deal, cargo, note, balanceHours, riskScore, demurrageExposure) {
  const sectionText = {
    Offer: deal.sections.Offer,
    Counter: `Counter idea: protect ${money(deal.freight * 0.98, cargo.unit === "TEU" ? 0 : 2)}/${cargo.unit} minimum, keep demurrage at ${money(deal.demurrage)}/day and ask for clean NOR wording.`,
    Recap: deal.sections.Recap,
    CP: deal.sections.CP,
    SOF: deal.sections.SOF,
    Laytime: `${deal.sections.Laytime} Allowed ${deal.allowedHours}h, used ${deal.usedHours}h, balance ${balanceHours}h.`,
    Claim: balanceHours > 0 ? `Claim posture: prepare demurrage claim for ${money(demurrageExposure)} with NOR, SOF, rain log and timesheet.` : `Claim posture: no demurrage claim. Potential dispatch/saved time to check against CP.`,
    Invoice: demurrageExposure > 0 ? `Draft invoice: ${money(demurrageExposure)} demurrage, payable as per CP/recap after supporting docs.` : "Invoice: no demurrage invoice required unless later port records change.",
    "Mail History": deal.sections.Emails,
    Notes: `${deal.sections.Notes} Broker note: ${note || "No additional note."}`
  };
  return Object.entries(sectionText).map(([name, text]) => {
    const status = name === "Offer" || name === "Recap" ? "Ready"
      : name === "Claim" || name === "Invoice" ? (demurrageExposure > 0 ? "Action" : "Standby")
        : riskScore >= 70 && ["CP", "SOF", "Laytime"].includes(name) ? "Review"
          : "Watch";
    return { name, text, status };
  });
}

function renderDealRoom() {
  if (!dealRoomForm || !dealRoomResult) return;
  const values = collectFormValues(dealRoomForm);
  const deal = terminalDealData[values.dealId] || terminalDealData["coal-india"];
  const cargo = getCargoProfile(deal.cargoType);
  const balanceHours = deal.usedHours - deal.allowedHours;
  const demurrageExposure = Math.max(0, balanceHours / 24) * deal.demurrage;
  const riskScore = clamp(Math.round(deal.baseRisk + liveFeedState.congestion * 0.16 + (balanceHours > 0 ? 8 : -5)), 0, 100);
  const fileSections = buildDealFileSections(deal, cargo, String(values.dealNote || "").trim(), balanceHours, riskScore, demurrageExposure);
  const activeSection = fileSections.find((section) => section.name === values.dealTab) || fileSections[0];
  const activeText = activeSection.text;
  const note = String(values.dealNote || "").trim();
  lastDealRoom = {
    deal,
    activeTab: values.dealTab,
    note,
    riskScore,
    demurrageExposure,
    fileSections,
    reportText: [
      "FOCUSEA DEAL ROOM",
      `Reference: ${deal.ref}`,
      `Vessel: ${deal.vessel}`,
      `Cargo: ${deal.cargo}`,
      `Route: ${deal.route}`,
      `Laycan: ${deal.laycan}`,
      `Freight: ${money(deal.freight, cargo.unit === "TEU" ? 0 : 2)}/${cargo.unit}`,
      `Demurrage: ${money(deal.demurrage)}/day`,
      `Active tab: ${values.dealTab}`,
      `Risk score: ${riskScore}/100`,
      `Demurrage exposure: ${money(demurrageExposure)}`,
      "",
      "Fixture file:",
      ...fileSections.map((section) => `- ${section.name} [${section.status}]: ${section.text}`),
      "",
      `Broker note: ${note || "-"}`
    ].join("\n")
  };
  dealRoomResult.innerHTML = `
    ${metricCards([
      { label: "Fixture", value: deal.ref },
      { label: "Route", value: deal.route },
      { label: "Freight", value: `${money(deal.freight, cargo.unit === "TEU" ? 0 : 2)}/${cargo.unit}` },
      { label: "Demurrage", value: `${money(deal.demurrage)}/day` },
      { label: "Laytime balance", value: balanceHours > 0 ? `${balanceHours}h over` : `${Math.abs(balanceHours)}h saved` },
      { label: "Risk", value: `<span class="risk-${riskScore >= 70 ? "high" : riskScore >= 45 ? "medium" : "low"}">${riskScore}/100</span>` }
    ])}
    <div class="score-meter"><span style="width:${riskScore}%"></span></div>
    <div class="deal-file-layout">
      <div class="deal-stage-strip">
        ${fileSections.map((section) => `<span class="${section.name === activeSection.name ? "active" : ""}">${escapeHtml(section.name)}<em>${escapeHtml(section.status)}</em></span>`).join("")}
      </div>
      <div class="deal-section-card">
        <strong>${escapeHtml(activeSection.name)} file</strong>
        <p>${escapeHtml(activeText)}</p>
      </div>
      <div class="deal-file-grid">
        ${fileSections.map((section) => `
          <article class="${section.status.toLowerCase()}">
            <span>${escapeHtml(section.status)}</span>
            <strong>${escapeHtml(section.name)}</strong>
            <p>${escapeHtml(section.text)}</p>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function renderImport() {
  if (!importForm || !importResult) return;
  const text = new FormData(importForm).get("importText") || "";
  const parsed = parseOfferText(text);
  const risk = scoreParsedOffer(parsed);
  lastImportReport = {
    parsed,
    risk,
    reportText: parsedOfferReport(parsed)
  };
  renderParsedOfferOutput(importResult, parsed, "Email / WhatsApp Import");
  importResult.insertAdjacentHTML("beforeend", `
    <small>Inbox status suggestion: ${risk.score >= 65 ? "Subjects deadline" : parsed.missing.length ? "Counter needed" : "New offer"}.</small>
  `);
}

function pushImportedOfferToInbox() {
  if (!lastImportReport) renderImport();
  if (!lastImportReport || !brokerInboxResult) return;
  const parsed = lastImportReport.parsed;
  const risk = lastImportReport.risk;
  const cargo = getCargoProfile(parsed.cargoType);
  terminalInboxItems.unshift({
    id: `INB-${1100 + terminalInboxItems.length}`,
    status: risk.score >= 65 ? "Subjects deadline" : parsed.missing.length ? "Counter needed" : "New offer",
    priority: risk.score >= 65 ? "High" : risk.score >= 42 ? "Medium" : "Low",
    cargo: parsed.cargoLabel,
    route: parsed.route || "Route TBC",
    laycan: parsed.laycan || "Laycan TBC",
    freight: parsed.freight ? `${money(parsed.freight, 2)}/${parsed.unit}` : `${money(cargo.baseFreight, 2)}/${cargo.unit} model`,
    demurrage: parsed.demurrage ? `${money(parsed.demurrage)}/day` : "TBC",
    subject: parsed.subjects || "Subjects TBC",
    note: risk.factors[0] || "Imported from message."
  });
  renderBrokerInbox();
  if (importResult) {
    importResult.querySelector(".download-confirm")?.remove();
    importResult.insertAdjacentHTML("beforeend", `<small class="download-confirm">Imported to Broker Inbox as ${terminalInboxItems[0].id}</small>`);
  }
}

function renderBrokerInbox() {
  if (!brokerInboxForm || !brokerInboxResult) return;
  const values = collectFormValues(brokerInboxForm);
  const items = terminalInboxItems.filter((item) => (
    (values.statusFilter === "All" || item.status === values.statusFilter)
    && (values.priorityFilter === "All" || item.priority === values.priorityFilter)
  ));
  const highCount = terminalInboxItems.filter((item) => item.priority === "High").length;
  const deadlineCount = terminalInboxItems.filter((item) => item.status === "Subjects deadline").length;
  brokerInboxResult.innerHTML = `
    ${metricCards([
      { label: "Inbox", value: terminalInboxItems.length },
      { label: "Filtered", value: items.length },
      { label: "High priority", value: highCount },
      { label: "Subject deadlines", value: deadlineCount }
    ])}
    <div class="ops-list">
      ${items.map((item) => `
        <div>
          <strong>${escapeHtml(item.id)} · ${escapeHtml(item.cargo)}</strong>
          <span>${escapeHtml(item.status)} / ${escapeHtml(item.priority)} · ${escapeHtml(item.route)} · ${escapeHtml(item.laycan)}</span>
          <small>${escapeHtml(item.freight)} · ${escapeHtml(item.demurrage)} · ${escapeHtml(item.note)}</small>
        </div>
      `).join("") || "<small>No offer matches this filter.</small>"}
    </div>
  `;
}

function renderRecapChecker() {
  if (!recapCheckerForm || !recapCheckerResult) return;
  const text = String(new FormData(recapCheckerForm).get("recapText") || "");
  const parsed = parseOfferText(text);
  const clause = analyzeClauseText(text);
  const checks = [
    { label: "Commission missing", hit: !parsed.commission, severity: "High", advice: "Add exact commission pct and payable party." },
    { label: "Demurrage unclear", hit: !parsed.demurrage, severity: "High", advice: "State demurrage rate, currency, per day and pro rata." },
    { label: "Laycan narrow", hit: parsed.laycanDays > 0 && parsed.laycanDays <= 4, severity: "Medium", advice: "Ask for wider laycan or clear cancelling right." },
    { label: "NOR / berth waiting risk", hit: /wibon|wipon|time lost waiting|whether in berth/i.test(text), severity: "High", advice: "Clarify when time starts and whether waiting counts." },
    { label: "Subjects open", hit: /subject|subs/i.test(text), severity: "Medium", advice: "Set subject deadline and who can lift it." },
    { label: "Route or cargo incomplete", hit: Boolean(parsed.missing.find((item) => /load|cargo quantity/i.test(item))), severity: "Medium", advice: "Confirm load/disport, cargo qty and tolerance." }
  ];
  const hits = checks.filter((item) => item.hit);
  const score = clamp(22 + hits.reduce((sum, item) => sum + (item.severity === "High" ? 18 : 10), 0) + clause.ownerRisk * 0.08 + clause.chartererRisk * 0.08, 0, 100);
  lastRecapCheck = {
    parsed,
    hits,
    score,
    reportText: [
      "FOCUSEA AI RECAP CHECKER",
      `Cargo: ${parsed.cargoLabel}`,
      `Route: ${parsed.route || "-"}`,
      `Laycan: ${parsed.laycan || "-"}`,
      `Risk score: ${Math.round(score)}/100`,
      "",
      "Findings:",
      ...(hits.length ? hits.map((item) => `- ${item.severity}: ${item.label}. ${item.advice}`) : ["- Recap looks commercially workable; still verify final CP terms."]),
      "",
      "Clause signals:",
      ...clause.findings.map((item) => `- ${item}`)
    ].join("\n")
  };
  recapCheckerResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: parsed.cargoLabel },
      { label: "Route", value: parsed.route || "-" },
      { label: "Missing", value: parsed.missing.length },
      { label: "Risk", value: `${Math.round(score)}/100` }
    ])}
    <div class="score-meter"><span style="width:${score}%"></span></div>
    <ul class="compact-list">${(hits.length ? hits : [{ label: "No hard red flag", severity: "Low", advice: "Keep evidence and CP wording clean." }]).map((item) => `<li><strong>${item.severity}</strong> ${item.label}: ${item.advice}</li>`).join("")}</ul>
  `;
}

const clauseLibraryData = {
  GENCON: {
    NOR: {
      sample: "NOR may be tendered WIPON/WIBON/WECCON and time lost waiting for berth to count as laytime.",
      risk: "High",
      bias: "Owner-leaning",
      note: "Strong for owner demurrage position, risky for charterer if berth is congested.",
      alternative: "NOR valid on arrival only if vessel is legally and physically ready, with exceptions clearly listed."
    },
    Laytime: {
      sample: "Laytime to commence 6 hours after valid NOR, SHINC unless otherwise stated.",
      risk: "Medium",
      bias: "Owner-leaning",
      note: "SHINC burns laytime through holidays and Sundays.",
      alternative: "Laytime to count SHEX unless used, with weather and port stoppages carved out."
    },
    Demurrage: {
      sample: "Demurrage payable at agreed daily rate pro rata for part of a day.",
      risk: "Medium",
      bias: "Balanced",
      note: "Good if rate, currency, time bar and documents are clear.",
      alternative: "Add invoice due date, supporting documents and claim time bar."
    },
    Weather: {
      sample: "Weather delays excepted from laytime.",
      risk: "Medium",
      bias: "Charterer-leaning",
      note: "Needs clear evidence standard and whether rain before/after work counts.",
      alternative: "Define rain, wind and terminal stoppage evidence by SOF and port log."
    },
    Sanctions: {
      sample: "Either party may refuse performance if sanctions exposure is identified.",
      risk: "High",
      bias: "Balanced",
      note: "Useful but must define owners, charterers, cargo origin and payment screening.",
      alternative: "Add OFAC/EU/UN screening, beneficial ownership and cargo origin warranties."
    }
  },
  NYPE: {
    NOR: {
      sample: "Vessel to be ready in all respects before delivery and hire commencement.",
      risk: "Medium",
      bias: "Charterer-leaning",
      note: "Readiness and delivery documents affect hire start.",
      alternative: "State exact delivery place, survey, bunkers and off-hire treatment."
    },
    Laytime: {
      sample: "Time charter operations under charterers' orders, with off-hire exceptions.",
      risk: "Medium",
      bias: "Balanced",
      note: "Laytime is less central than hire/off-hire, but port delays still affect voyage result.",
      alternative: "Clarify off-hire events, waiting time and speed/consumption warranties."
    },
    Demurrage: {
      sample: "Detention or damages may apply outside charter period obligations.",
      risk: "High",
      bias: "Clause-dependent",
      note: "NYPE needs careful detention/off-hire wording.",
      alternative: "Separate off-hire, detention and damages language."
    },
    Weather: {
      sample: "Weather routing and safe navigation remain master's responsibility.",
      risk: "Medium",
      bias: "Owner-leaning",
      note: "Connect to performance warranties and good weather periods.",
      alternative: "Define good weather, Beaufort limits and current factors."
    },
    Sanctions: {
      sample: "Charterers shall not order vessel to sanctioned trade.",
      risk: "High",
      bias: "Owner-leaning",
      note: "Owner needs refusal rights and indemnity.",
      alternative: "Add trade, cargo, payment and counterparty compliance warranties."
    }
  },
  SHELLVOY: {
    NOR: {
      sample: "NOR tendering subject to terminal readiness, free pratique and documentation.",
      risk: "Medium",
      bias: "Balanced",
      note: "Tankers need terminal-specific NOR validity checks.",
      alternative: "Tie NOR to terminal acceptance and documentary readiness."
    },
    Laytime: {
      sample: "Laytime counts per terminal pumping/loading provisions and agreed exceptions.",
      risk: "Medium",
      bias: "Balanced",
      note: "Pumping rate, hoses, shifting and inspection periods matter.",
      alternative: "Define pumping warranty and stoppage allocation."
    },
    Demurrage: {
      sample: "Demurrage at agreed rate after laytime expiry, subject to claim documents.",
      risk: "High",
      bias: "Owner-leaning",
      note: "Time bar and claim evidence are critical.",
      alternative: "List SOF, NOR, pumping log, berth log and invoice deadline."
    },
    Weather: {
      sample: "Terminal weather stoppages excluded if supported by terminal records.",
      risk: "Medium",
      bias: "Charterer-leaning",
      note: "Terminal record standard prevents disputes.",
      alternative: "State whether weather before all fast, shifting or hose connection counts."
    },
    Sanctions: {
      sample: "No cargo, port, party or payment shall expose either party to sanctions.",
      risk: "High",
      bias: "Balanced",
      note: "For oil/chemicals this is non-negotiable.",
      alternative: "Add audit trail, origin certificate and substitution/refusal rights."
    }
  }
};

function renderClauseLibrary() {
  if (!clauseLibraryForm || !clauseLibraryResult) return;
  const values = collectFormValues(clauseLibraryForm);
  const item = clauseLibraryData[values.template]?.[values.topic] || clauseLibraryData.GENCON.NOR;
  clauseLibraryResult.innerHTML = `
    ${metricCards([
      { label: "Template", value: values.template },
      { label: "Topic", value: values.topic },
      { label: "Risk", value: item.risk },
      { label: "Bias", value: item.bias }
    ])}
    <ul class="compact-list">
      <li><strong>Sample:</strong> ${escapeHtml(item.sample)}</li>
      <li><strong>Broker note:</strong> ${escapeHtml(item.note)}</li>
      <li><strong>Alternative wording:</strong> ${escapeHtml(item.alternative)}</li>
    </ul>
  `;
}

function parseClaimFacts(text = "") {
  const allowedHours = parseMoneyNumber(text.match(/allowed laytime\s*([0-9.,]+)\s*h/i)?.[1]) || 72;
  const demurrageRate = parseMoneyNumber(text.match(/demurrage\s*(?:usd|us\$|\$)?\s*([0-9,]+)(?:\/day| per day|\/d| day)?/i)?.[1]) || 18000;
  const statement = parseSofStatement(text, allowedHours, demurrageRate);
  return {
    allowedHours,
    demurrageRate,
    rainHours: statement.deductions,
    estimatedUsedHours: statement.usedHours,
    overHours: Math.max(0, statement.balanceHours),
    amount: statement.demurrageAmount,
    dispatchAmount: statement.dispatchAmount,
    statement
  };
}

function renderClaimBuilder() {
  if (!claimBuilderForm || !claimBuilderResult) return;
  const facts = String(new FormData(claimBuilderForm).get("claimFacts") || "");
  const claim = parseClaimFacts(facts);
  const strength = clamp(Math.round(50 + (claim.overHours > 0 ? 18 : -10) + (claim.rainHours ? 6 : 0) + (/nor/i.test(facts) ? 8 : 0) + (/sof|statement of facts/i.test(facts) ? 6 : 0)), 0, 100);
  const letter = [
    "DEMURRAGE CLAIM DRAFT",
    "",
    "Dear Sirs,",
    "",
    `Based on the available SOF/NOR record, laytime used is estimated at ${claim.estimatedUsedHours.toFixed(1)} hours against allowed laytime of ${claim.allowedHours.toFixed(1)} hours.`,
    `The counting basis detected is ${claim.statement.startBasis}, from ${formatSofDate(claim.statement.start)} to ${formatSofDate(claim.statement.completion)}, with ${claim.rainHours.toFixed(1)} hours of deductions.`,
    `The balance is ${claim.overHours.toFixed(1)} hours on demurrage at ${money(claim.demurrageRate)}/day, giving an estimated claim amount of ${money(claim.amount)}.`,
    "",
    "Supporting documents requested: NOR, Statement of Facts, rain/stop log, berth log, timesheet and invoice.",
    "",
    "This draft is generated by Focusea for broker review before legal/commercial submission."
  ].join("\n");
  lastClaimBuilder = { facts, claim, strength, reportText: letter };
  claimBuilderResult.innerHTML = `
    ${metricCards([
      { label: "Allowed", value: `${claim.allowedHours.toFixed(1)}h` },
      { label: "Used", value: `${claim.estimatedUsedHours.toFixed(1)}h` },
      { label: "Overtime", value: `${claim.overHours.toFixed(1)}h` },
      { label: "Deductions", value: `${claim.rainHours.toFixed(1)}h` },
      { label: "Claim", value: money(claim.amount) },
      { label: "Evidence strength", value: `${strength}/100` }
    ])}
    <pre>${escapeHtml(letter)}</pre>
  `;
}

function renderPortIntelPro() {
  if (!portIntelProForm || !portIntelProResult) return;
  const values = collectFormValues(portIntelProForm);
  const port = ports[values.portId] || ports.singapore;
  const baseCost = Object.values(port.costs || {}).reduce((sum, value) => sum + Number(value || 0), 0);
  const waitingCost = (Number(values.waitingDays) || 0) * (Number(values.dailyHire) || 0);
  const totalCost = baseCost + waitingCost;
  const depth = parseFloat(String(port.depth).replace(",", "."));
  const draftMargin = Number.isFinite(depth) ? depth - (Number(values.draft) || 0) : 0;
  const risk = clamp(Math.round((draftMargin < 1 ? 28 : draftMargin < 2 ? 14 : 4) + liveFeedState.congestion * 0.55 + (Number(values.waitingDays) || 0) * 5), 0, 100);
  const holidayRisk = /China|Turkey|UAE|Germany|Netherlands|Singapore/i.test(port.country) ? "Check local holidays / terminal cut-off" : "Check agency calendar";
  const productivity = port.productivity || (port.type.includes("Container") ? "85-115 moves/hour" : port.type.includes("Bulk") ? "18,000-32,000 mt/day" : "Terminal dependent");
  const berthWindow = risk >= 70 ? "Tight berth window; keep laycan flexible" : risk >= 45 ? "Moderate waiting risk; add ETA buffer" : "Berth window workable";
  const sourceConfidence = risk >= 70 ? 68 : 78;
  portIntelProResult.innerHTML = `
    ${metricCards([
      { label: "Port", value: port.name },
      { label: "Depth / draft", value: `${port.depth} / ${values.draft} m` },
      { label: "Draft margin", value: `${draftMargin.toFixed(1)} m` },
      { label: "Total cost", value: money(totalCost) },
      { label: "Risk", value: `${risk}/100` },
      { label: "Source trust", value: `${sourceConfidence}%` }
    ])}
    <div class="port-intel-grid">
      <div><strong>Berth productivity</strong><span>${escapeHtml(productivity)}</span></div>
      <div><strong>Waiting cost</strong><span>${money(waitingCost)} (${values.waitingDays} days)</span></div>
      <div><strong>Holiday / cut-off</strong><span>${escapeHtml(holidayRisk)}</span></div>
      <div><strong>Berth window</strong><span>${escapeHtml(berthWindow)}</span></div>
    </div>
    <ul class="compact-list">
      <li><strong>Required docs:</strong> ${port.documents.map(escapeHtml).join(", ")}, agency appointment, cargo declaration, terminal nomination.</li>
      <li><strong>Services:</strong> ${port.services.map(escapeHtml).join(", ")}</li>
      <li><strong>Local charges:</strong> Pilotage ${money(port.costs.pilotage)}, tug ${money(port.costs.tug)}, berth ${money(port.costs.berth)}, port dues ${money(port.costs.portDues)}.</li>
      <li><strong>Risks:</strong> ${port.risks.map(escapeHtml).join(", ")}</li>
      <li><strong>Source:</strong> <em class="source-badge api-ready">API-ready</em> NGA World Port Index-ready + local broker model. ${escapeHtml(port.note)}</li>
    </ul>
  `;
}

const turkiyePortIds = ["istanbul", "ambarli", "mersin", "izmir", "aliaga", "gemlik", "izmit", "tekirdag", "iskenderun", "samsun"];

const turkiyePortOpsData = {
  istanbul: {
    zone: "Marmara / Bosphorus",
    maxLoa: 260,
    waitingBase: 44,
    customs: "Transit, Bosphorus traffic and terminal slot must be aligned before NOR.",
    agency: "Pre-arrival agency appointment, customs broker and traffic clearance should be closed early.",
    localDocs: ["Pre-arrival notice", "Crew list", "Cargo manifest", "Port clearance", "Customs declaration", "ISPS"],
    opsNotes: ["Check Bosphorus traffic window", "Protect anchorage waiting evidence", "Keep pilot / VTS updates in SOF"],
    costFactor: 1.06
  },
  ambarli: {
    zone: "Marmara container gateway",
    maxLoa: 370,
    waitingBase: 56,
    customs: "Container gate cut-off, customs filing and terminal nomination drive the schedule.",
    agency: "Confirm terminal appointment, truck gate status, reefer/DG list and berth window.",
    localDocs: ["Manifest", "Customs declaration", "ISPS", "DG list if any", "Reefer list", "Terminal nomination"],
    opsNotes: ["Track gate congestion", "Confirm terminal cut-off", "Price waiting if berth window is tight"],
    costFactor: 1.14
  },
  mersin: {
    zone: "Eastern Mediterranean",
    maxLoa: 366,
    waitingBase: 48,
    customs: "Customs cut-off, rail/truck program and terminal stack planning should be checked.",
    agency: "Agency should confirm container/bulk terminal, berth productivity and customs document deadline.",
    localDocs: ["Cargo manifest", "Customs declaration", "Crew list", "ISPS", "Port clearance", "Terminal nomination"],
    opsNotes: ["Check heat and gate productivity", "Watch export/import customs deadline", "Add berth waiting buffer"],
    costFactor: 1.1
  },
  izmir: {
    zone: "Aegean urban port",
    maxLoa: 240,
    waitingBase: 38,
    customs: "Draft, urban port traffic and berth window should be checked before fixing.",
    agency: "Agency should confirm exact berth, draft allowance, customs schedule and pilot booking.",
    localDocs: ["Cargo manifest", "Customs declaration", "Crew list", "Port clearance", "ISPS"],
    opsNotes: ["Verify draft margin", "Protect rain/wind stoppage evidence", "Check cruise/passenger conflict if relevant"],
    costFactor: 0.98
  },
  aliaga: {
    zone: "Aegean industrial terminals",
    maxLoa: 340,
    waitingBase: 46,
    customs: "Terminal-specific safety rules, DG controls and cargo compatibility are central.",
    agency: "Pre-clear terminal acceptance, safety checklist, vetting if tanker and cargo documents.",
    localDocs: ["Terminal safety checklist", "Cargo manifest", "DG declaration", "Crew list", "Port clearance", "Customs declaration"],
    opsNotes: ["Confirm terminal acceptance", "Screen DG / tanker compatibility", "Price wind delay into laytime"],
    costFactor: 1.18
  },
  gemlik: {
    zone: "Marmara automotive / Ro-Ro",
    maxLoa: 300,
    waitingBase: 42,
    customs: "Ro-Ro schedule, automotive program and gate flow affect berth availability.",
    agency: "Confirm terminal sequence, customs cut-off, cargo unit list and truck gate status.",
    localDocs: ["Cargo manifest", "Unit list", "Customs declaration", "Crew list", "ISPS", "Port clearance"],
    opsNotes: ["Watch automotive peak periods", "Protect Ro-Ro ramp window", "Check fog delays"],
    costFactor: 1.04
  },
  izmit: {
    zone: "Marmara industrial gulf",
    maxLoa: 380,
    waitingBase: 52,
    customs: "Exact terminal, cargo class and berth compatibility change the whole port call.",
    agency: "Agency must confirm terminal allocation, safety checklist, DG permissions and survey plan.",
    localDocs: ["Terminal safety checklist", "Customs declaration", "Cargo manifest", "DG declaration", "Crew list", "Port clearance"],
    opsNotes: ["Confirm terminal allocation", "Screen liquid/DG cargo", "Keep survey and sampling events in SOF"],
    costFactor: 1.2
  },
  tekirdag: {
    zone: "Marmara / Thrace",
    maxLoa: 250,
    waitingBase: 34,
    customs: "Road/gate pressure and wind window can affect bulk/Ro-Ro operations.",
    agency: "Confirm berth, customs cut-off, truck gate plan and pilot booking.",
    localDocs: ["Cargo manifest", "Customs declaration", "Crew list", "Port clearance", "ISPS"],
    opsNotes: ["Watch northerly wind", "Check road/gate queue", "Keep stoppage reason in SOF"],
    costFactor: 0.94
  },
  iskenderun: {
    zone: "Eastern Mediterranean steel / bulk",
    maxLoa: 300,
    waitingBase: 45,
    customs: "Terminal status, steel/bulk survey and heat operations need early confirmation.",
    agency: "Confirm terminal acceptance, surveyor attendance, cargo damage protocol and customs timing.",
    localDocs: ["Cargo manifest", "Customs declaration", "Crew list", "Survey appointment", "ISPS", "Port clearance"],
    opsNotes: ["Check terminal status", "Keep damage survey records", "Add heat/weather buffer"],
    costFactor: 1.08
  },
  samsun: {
    zone: "Black Sea gateway",
    maxLoa: 220,
    waitingBase: 36,
    customs: "Black Sea swell, winter weather and draft limits are the main operational checks.",
    agency: "Confirm pilot window, berth depth, cargo docs and weather exposure.",
    localDocs: ["Cargo manifest", "Customs declaration", "Crew list", "Port clearance", "ISPS"],
    opsNotes: ["Watch Black Sea swell", "Check draft limit", "Add weather buffer for winter calls"],
    costFactor: 0.9
  }
};

const turkiyeCoastalZones = {
  istanbul: "marmara",
  ambarli: "marmara",
  tekirdag: "marmara",
  izmit: "marmara",
  gemlik: "marmara",
  izmir: "aegean",
  aliaga: "aegean",
  mersin: "eastmed",
  iskenderun: "eastmed",
  samsun: "blacksea"
};

const turkiyeCoastalDistances = {
  "ambarli-mersin": 920,
  "ambarli-iskenderun": 980,
  "ambarli-samsun": 520,
  "ambarli-izmir": 330,
  "ambarli-aliaga": 300,
  "ambarli-izmit": 75,
  "ambarli-gemlik": 85,
  "ambarli-tekirdag": 70,
  "izmit-mersin": 900,
  "izmit-iskenderun": 960,
  "izmit-samsun": 500,
  "gemlik-mersin": 850,
  "tekirdag-mersin": 950,
  "izmir-mersin": 560,
  "izmir-iskenderun": 640,
  "aliaga-mersin": 590,
  "aliaga-iskenderun": 670,
  "mersin-iskenderun": 95,
  "mersin-samsun": 1010,
  "iskenderun-samsun": 1080,
  "izmir-samsun": 780,
  "aliaga-samsun": 800
};

function turkiyePortOptionLabel(id) {
  return ports[id]?.name || id;
}

function turkiyePortProfile(id = "mersin") {
  const safeId = turkiyePortIds.includes(String(id)) ? String(id) : "mersin";
  return {
    id: safeId,
    port: ports[safeId] || ports.mersin,
    ops: turkiyePortOpsData[safeId] || turkiyePortOpsData.mersin
  };
}

function portCostBase(port) {
  return Object.values(port?.costs || {}).reduce((sum, value) => sum + Number(value || 0), 0);
}

function reportLines(title, lines = []) {
  return [
    title,
    `Generated: ${new Date().toLocaleString()}`,
    "",
    ...lines
  ].join("\n");
}

function turkiyeDraftMargin(port, draft) {
  return portDepthMeters(port) - (Number(draft) || 0);
}

function turkiyeWaitingRisk(portId, waitingDays = 0, cargoRisk = 0) {
  const ops = turkiyePortOpsData[portId] || turkiyePortOpsData.mersin;
  return clamp(Math.round(ops.waitingBase + Number(waitingDays || 0) * 8 + cargoRisk * 0.18 + liveFeedState.congestion * 0.18), 0, 100);
}

function turkiyeStatusFromScore(score) {
  if (score >= 78) return "NO-GO / fix only with protection";
  if (score >= 58) return "CONDITIONAL / protect subjects";
  return "SUITABLE / workable";
}

function renderTurkiyePortIntel() {
  if (!turkiyePortIntelForm || !turkiyePortIntelResult) return;
  const values = collectFormValues(turkiyePortIntelForm);
  const { id, port, ops } = turkiyePortProfile(values.turkiyePortId);
  const cargo = getCargoProfile(values.cargoType);
  const margin = turkiyeDraftMargin(port, values.draft);
  const baseCost = portCostBase(port) * ops.costFactor * cargo.portCostMultiplier;
  const waitingCost = (Number(values.waitingDays) || 0) * (Number(values.dailyHire) || 0);
  const total = baseCost + waitingCost;
  const risk = clamp(turkiyeWaitingRisk(id, values.waitingDays, cargo.risk) + (margin < 0 ? 30 : margin < 1 ? 14 : 0), 0, 100);
  const decision = turkiyeStatusFromScore(risk);
  const action = margin < 0
    ? "Draft exceeds model depth. Ask agency for berth-specific max draft before fixing."
    : risk >= 58
      ? "Keep subject to terminal confirmation, agency proforma and clean SOF/NOR evidence."
      : "Workable call; still confirm terminal nomination and local document cut-off.";
  lastTurkiyePortIntel = {
    values,
    portId: id,
    port: port.name,
    cargo: cargo.label,
    margin,
    risk,
    decision,
    total,
    reportText: reportLines("FOCUSEA TURKIYE PORT INTELLIGENCE PRO", [
      `Port: ${port.name} / ${ops.zone}`,
      `Cargo: ${cargo.label}`,
      `Draft margin: ${margin.toFixed(1)} m`,
      `Estimated port + waiting cost: ${money(total)}`,
      `Risk: ${risk}/100 - ${decision}`,
      "",
      "Local documents:",
      ...ops.localDocs.map((item) => `- ${item}`),
      "",
      "Agency / operations:",
      `- ${ops.agency}`,
      `- ${ops.customs}`,
      ...ops.opsNotes.map((item) => `- ${item}`),
      "",
      `User agency note: ${values.agencyNote || "-"}`
    ])
  };
  turkiyePortIntelResult.innerHTML = `
    ${metricCards([
      { label: "Port", value: escapeHtml(port.name) },
      { label: "Zone", value: escapeHtml(ops.zone) },
      { label: "Draft margin", value: `${margin.toFixed(1)} m` },
      { label: "Cost estimate", value: money(total) },
      { label: "Risk", value: `${risk}/100` },
      { label: "Decision", value: escapeHtml(decision) }
    ])}
    <div class="port-intel-grid turkiye-flow">
      <div><strong>Agency note</strong><span>${escapeHtml(ops.agency)}</span></div>
      <div><strong>Customs / cut-off</strong><span>${escapeHtml(ops.customs)}</span></div>
      <div><strong>Local model</strong><span><em class="source-badge simulated">estimated</em> Costs are planning estimates, not tariff advice.</span></div>
      <div><strong>Next action</strong><span>${escapeHtml(action)}</span></div>
    </div>
    <ul class="compact-list">
      <li><strong>Documents:</strong> ${ops.localDocs.map(escapeHtml).join(", ")}</li>
      <li><strong>Port services:</strong> ${port.services.map(escapeHtml).join(", ")}</li>
      <li><strong>Operational risks:</strong> ${port.risks.map(escapeHtml).join(", ")}</li>
      <li><strong>User note:</strong> ${escapeHtml(values.agencyNote || "-")}</li>
    </ul>
  `;
}

function renderTurkiyeSofNor() {
  if (!turkiyeSofNorForm || !turkiyeSofNorResult) return;
  const values = collectFormValues(turkiyeSofNorForm);
  const { port, ops } = turkiyePortProfile(values.turkiyePortId);
  const allowedHours = Number(values.allowedHours) || 72;
  const demurrageRate = Number(values.demurrageRate) || 0;
  const timeBarDays = Number(values.timeBarDays) || 90;
  const timeBarDate = new Date(Date.now() + timeBarDays * 86400000);
  const exposurePerHour = demurrageRate / 24;
  const norTemplate = [
    `NOTICE OF READINESS - ${port.name}`,
    "To: Charterers / Receivers / Agents",
    `Vessel hereby tenders NOR for ${values.operation} at ${port.name}, subject to charter party terms.`,
    "Vessel is in all respects ready, with cargo spaces / tanks prepared as applicable.",
    `Weather clause to check: ${values.weatherClause}.`,
    "Please acknowledge receipt with date, time and signatory."
  ].join("\n");
  const sofTemplate = [
    `STATEMENT OF FACTS - ${port.name}`,
    "Arrived / NOR tendered / NOR accepted / Free pratique / Pilot on board / All fast / Operation started / Stoppages / Completed / Documents on board / Sailed.",
    "Every stoppage should state start time, finish time, reason, responsible party and supporting evidence.",
    `Allowed laytime model: ${allowedHours}h. Demurrage: ${money(demurrageRate)}/day (${money(exposurePerHour, 2)}/h).`
  ].join("\n");
  const evidence = ["Signed NOR", "Signed SOF", "Terminal log", "Rain/wind stoppage record", "Cargo operation log", "Photos if cargo damage", "Agency statement", "Invoice support"];
  lastTurkiyeSofNor = {
    values,
    port: port.name,
    reportText: reportLines("FOCUSEA TURKIYE SOF / NOR TEMPLATE PACK", [
      `Port: ${port.name}`,
      `Operation: ${values.operation}`,
      `Allowed laytime: ${allowedHours}h`,
      `Demurrage: ${money(demurrageRate)}/day`,
      `Claim time bar watch date: ${timeBarDate.toLocaleDateString()}`,
      "",
      norTemplate,
      "",
      sofTemplate,
      "",
      "Evidence checklist:",
      ...evidence.map((item) => `- ${item}`),
      "",
      `Local agency note: ${ops.agency}`
    ])
  };
  turkiyeSofNorResult.innerHTML = `
    ${metricCards([
      { label: "Port", value: escapeHtml(port.name) },
      { label: "Operation", value: escapeHtml(values.operation) },
      { label: "Allowed", value: `${allowedHours}h` },
      { label: "Demurrage", value: `${money(demurrageRate)}/day` },
      { label: "Exposure", value: `${money(exposurePerHour, 2)}/h` },
      { label: "Time bar watch", value: timeBarDate.toLocaleDateString() }
    ])}
    <div class="template-grid">
      <pre>${escapeHtml(norTemplate)}</pre>
      <pre>${escapeHtml(sofTemplate)}</pre>
    </div>
    <ul class="compact-list">${evidence.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  `;
}

function turkiyeCostEstimate(values) {
  const { id, port, ops } = turkiyePortProfile(values.turkiyePortId);
  const cargo = getCargoProfile(values.cargoType);
  const vesselMultipliers = { handymax: 0.86, panamax: 1, cape: 1.36, container: 1.22, tanker: 1.28, lng: 1.48 };
  const vesselMultiplier = vesselMultipliers[values.vesselType] || 1;
  const portStayDays = Number(values.portStayDays) || 0;
  const tugCount = Number(values.tugCount) || 0;
  const lines = [
    { item: "Pilotage", amount: port.costs.pilotage * vesselMultiplier * ops.costFactor },
    { item: "Towage", amount: port.costs.tug * Math.max(tugCount, 1) / 2 * vesselMultiplier * ops.costFactor },
    { item: "Berth / quay", amount: port.costs.berth * Math.max(portStayDays, 0.5) / 3 * cargo.portCostMultiplier * ops.costFactor },
    { item: "Port dues", amount: port.costs.portDues * vesselMultiplier * cargo.portCostMultiplier },
    { item: "Agency fee", amount: Number(values.agencyFee) || 0 },
    { item: "Docs / customs buffer", amount: 1800 * cargo.portCostMultiplier },
    { item: "Operational contingency", amount: portCostBase(port) * 0.08 * ops.costFactor }
  ].map((line) => ({ ...line, amount: Math.round(line.amount) }));
  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  const confidence = Math.round(clamp(76 - cargo.risk * 0.12 + (turkiyePortIds.includes(id) ? 8 : 0), 50, 92));
  return { id, port, ops, cargo, vesselMultiplier, lines, total, confidence };
}

function renderTurkiyeCost() {
  if (!turkiyeCostForm || !turkiyeCostResult) return;
  const values = collectFormValues(turkiyeCostForm);
  const estimate = turkiyeCostEstimate(values);
  lastTurkiyeCost = {
    values,
    ...estimate,
    reportText: reportLines("FOCUSEA PORT COST ESTIMATOR TURKIYE", [
      `Port: ${estimate.port.name}`,
      `Vessel type: ${values.vesselType}`,
      `Cargo: ${estimate.cargo.label}`,
      `Estimated total: ${money(estimate.total)}`,
      `Confidence: ${estimate.confidence}%`,
      "",
      "Line items:",
      ...estimate.lines.map((line) => `- ${line.item}: ${money(line.amount)}`),
      "",
      "Note: Planning estimate. Replace with official proforma/tariff before commercial submission."
    ])
  };
  turkiyeCostResult.innerHTML = `
    ${metricCards([
      { label: "Port", value: escapeHtml(estimate.port.name) },
      { label: "Cargo", value: escapeHtml(estimate.cargo.label) },
      { label: "Total", value: money(estimate.total) },
      { label: "Confidence", value: `${estimate.confidence}%` }
    ])}
    <table class="mini-table">
      <thead><tr><th>Item</th><th>Estimate</th></tr></thead>
      <tbody>${estimate.lines.map((line) => `<tr><td>${escapeHtml(line.item)}</td><td>${money(line.amount)}</td></tr>`).join("")}</tbody>
    </table>
    <small><em class="source-badge simulated">estimated</em> Use this for broker screening; final port disbursement needs agency proforma.</small>
  `;
}

function turkiyeCostCsvRows() {
  if (!lastTurkiyeCost) renderTurkiyeCost();
  return [
    ["item", "amount_usd"],
    ...(lastTurkiyeCost?.lines || []).map((line) => [line.item, line.amount]),
    ["total", lastTurkiyeCost?.total || 0]
  ];
}

function coastalDistance(loadPortId, dischargePortId) {
  if (loadPortId === dischargePortId) return 0;
  const key = `${loadPortId}-${dischargePortId}`;
  const reverse = `${dischargePortId}-${loadPortId}`;
  if (turkiyeCoastalDistances[key]) return turkiyeCoastalDistances[key];
  if (turkiyeCoastalDistances[reverse]) return turkiyeCoastalDistances[reverse];
  const zoneA = turkiyeCoastalZones[loadPortId] || "marmara";
  const zoneB = turkiyeCoastalZones[dischargePortId] || "marmara";
  if (zoneA === zoneB) return 120;
  const fallback = {
    "marmara-aegean": 340,
    "marmara-eastmed": 920,
    "marmara-blacksea": 520,
    "aegean-eastmed": 610,
    "aegean-blacksea": 790,
    "eastmed-blacksea": 1040
  };
  return fallback[`${zoneA}-${zoneB}`] || fallback[`${zoneB}-${zoneA}`] || 650;
}

function renderCabotage() {
  if (!cabotageForm || !cabotageResult) return;
  const values = collectFormValues(cabotageForm);
  const load = turkiyePortProfile(values.loadPortId);
  const discharge = turkiyePortProfile(values.dischargePortId);
  const cargo = getCargoProfile(values.cargoType);
  const distance = coastalDistance(load.id, discharge.id);
  const speed = Number(values.speed) || 1;
  const seaDays = distance / speed / 24;
  const portDays = 2.2 + (load.ops.waitingBase + discharge.ops.waitingBase) / 120;
  const consumption = cargo.unit === "TEU" ? 34 : cargo.label.includes("Chemicals") ? 24 : cargo.label.includes("Project") ? 20 : 18;
  const portCons = cargo.unit === "TEU" ? 6 : 3.2;
  const bunkerTons = (seaDays * consumption + portDays * portCons) * cargo.bunkerMultiplier;
  const bunkerCost = bunkerTons * (Number(values.bunkerPrice) || liveFeedState.bunker);
  const loadCost = portCostBase(load.port) * load.ops.costFactor * cargo.portCostMultiplier * 0.72;
  const dischargeCost = portCostBase(discharge.port) * discharge.ops.costFactor * cargo.portCostMultiplier * 0.72;
  const coastalRate = cargo.unit === "TEU"
    ? 185 * cargo.freightMultiplier
    : cargo.unit === "lot"
      ? cargo.baseFreight * 0.34
      : cargo.baseFreight * cargo.freightMultiplier * 0.48;
  const revenue = (Number(values.quantity) || 0) * coastalRate;
  const totalCost = bunkerCost + loadCost + dischargeCost;
  const margin = revenue - totalCost;
  const risk = clamp(Math.round((load.ops.waitingBase + discharge.ops.waitingBase) / 2 + cargo.risk * 0.22 + (distance > 900 ? 8 : 0)), 0, 100);
  lastCabotage = {
    values,
    load: load.port.name,
    discharge: discharge.port.name,
    cargo: cargo.label,
    distance,
    seaDays,
    portDays,
    bunkerTons,
    bunkerCost,
    revenue,
    totalCost,
    margin,
    risk,
    reportText: reportLines("FOCUSEA CABOTAGE & COASTAL TRADE TURKIYE", [
      `Route: ${load.port.name} -> ${discharge.port.name}`,
      `Distance: ${distance} nm`,
      `Cargo: ${cargo.label}`,
      `Sea / port days: ${seaDays.toFixed(1)} / ${portDays.toFixed(1)}`,
      `Bunker: ${bunkerTons.toFixed(1)} t / ${money(bunkerCost)}`,
      `Revenue model: ${money(revenue)}`,
      `Cost model: ${money(totalCost)}`,
      `Estimated margin: ${money(margin)}`,
      `Risk: ${risk}/100`,
      "",
      "Cabotage checklist:",
      "- Confirm flag / cabotage eligibility with legal/agency advice.",
      "- Confirm local cargo docs, customs status and port proforma.",
      "- Track weather window and pilot/tug availability at both ports."
    ])
  };
  cabotageResult.innerHTML = `
    ${metricCards([
      { label: "Route", value: `${escapeHtml(load.port.name)} -> ${escapeHtml(discharge.port.name)}` },
      { label: "Distance", value: `${distance} nm` },
      { label: "Voyage days", value: `${(seaDays + portDays).toFixed(1)}d` },
      { label: "Bunker", value: `${bunkerTons.toFixed(1)} t` },
      { label: "Margin", value: `<em class="${margin >= 0 ? "positive" : "negative"}">${money(margin)}</em>` },
      { label: "Risk", value: `${risk}/100` }
    ])}
    <ul class="compact-list">
      <li><strong>Commercial:</strong> rate model ${money(coastalRate, cargo.unit === "TEU" ? 0 : 2)}/${cargo.unit}, revenue ${money(revenue)}, cost ${money(totalCost)}.</li>
      <li><strong>Cabotage note:</strong> confirm flag, trade permission and local agency advice before fixing.</li>
      <li><strong>Operational:</strong> ${escapeHtml(load.ops.opsNotes[0])}; ${escapeHtml(discharge.ops.opsNotes[0])}.</li>
    </ul>
  `;
}

function renderOfficialImportPro(commit = false) {
  if (!officialImportProForm || !officialImportProResult) return;
  const values = collectFormValues(officialImportProForm);
  const records = parseGlobalPortCsv(values.officialCsv || "").map((record, index) => ({
    ...record,
    id: `official-${Date.now()}-${index}`,
    source: values.sourceLabel || "Official/user CSV"
  }));
  const invalid = String(values.officialCsv || "").split(/\r?\n/).filter((line) => line.trim()).length - records.length - 1;
  let saved = false;
  if (commit && records.length) {
    const existing = getImportedGlobalPorts();
    const map = new Map();
    [...existing, ...records].forEach((record) => {
      const key = record.code || `${record.name}-${record.country}`;
      map.set(key, record);
    });
    saved = setImportedGlobalPorts([...map.values()]);
    renderGlobalPortAtlas(records[0]?.id);
  }
  lastOfficialImportPro = {
    sourceLabel: values.sourceLabel,
    records,
    invalid: Math.max(0, invalid),
    saved,
    reportText: reportLines("FOCUSEA OFFICIAL DATA IMPORT PRO", [
      `Source label: ${values.sourceLabel}`,
      `Valid records: ${records.length}`,
      `Invalid/ignored lines: ${Math.max(0, invalid)}`,
      `Saved to atlas: ${saved ? "yes" : "preview only"}`,
      "",
      ...records.slice(0, 20).map((record) => `- ${record.code} | ${record.name} | ${record.country} | ${record.type} | ${record.depth}`)
    ])
  };
  officialImportProResult.innerHTML = `
    ${metricCards([
      { label: "Valid records", value: records.length },
      { label: "Ignored lines", value: Math.max(0, invalid) },
      { label: "Source", value: escapeHtml(values.sourceLabel) },
      { label: "Atlas write", value: commit ? (saved ? "Saved" : "Failed") : "Preview" }
    ])}
    <div class="ops-list">
      ${records.slice(0, 8).map((record) => `<div><strong>${escapeHtml(record.code || "N/A")} - ${escapeHtml(record.name)}</strong><span>${escapeHtml(record.country)} / ${escapeHtml(record.region)} / ${escapeHtml(record.type)} / ${escapeHtml(record.depth)}</span></div>`).join("") || "<small>No valid records. Use UNLOCODE,Name,Country,Region,Type,Depth.</small>"}
    </div>
    <small><em class="source-badge ${commit && saved ? "verified" : "api-ready"}">${commit && saved ? "imported" : "preview"}</em> Data is stored locally in this browser and appears in Global Port Atlas after import.</small>
  `;
}

function renderCargoPortSuitability() {
  if (!cargoPortSuitabilityForm || !cargoPortSuitabilityResult) return;
  const values = collectFormValues(cargoPortSuitabilityForm);
  const { id, port, ops } = turkiyePortProfile(values.turkiyePortId);
  const cargo = getCargoProfile(values.cargoType);
  const typeText = `${port.type} ${port.services.join(" ")}`.toLowerCase();
  const typeRules = {
    coal: /bulk|coal|general/,
    grain: /bulk|grain|general/,
    container: /container/,
    ironOre: /bulk|steel|ore|general/,
    crudeOil: /tanker|liquid|petrochemical/,
    lng: /lng|tanker|liquid/,
    chemicals: /chemical|tanker|liquid|petrochemical/,
    projectCargo: /project|general|ro-ro|bulk|heavy/
  };
  const typeMatch = (typeRules[values.cargoType] || /general/).test(typeText);
  const margin = turkiyeDraftMargin(port, values.draft);
  const loaRisk = (Number(values.loa) || 0) > ops.maxLoa ? 18 : 0;
  const draftRisk = margin < 0 ? 35 : margin < 1 ? 16 : margin < 2 ? 7 : 0;
  const cargoMismatchRisk = typeMatch ? 0 : 28;
  const imdgRisk = values.imdg === "yes" && !/dangerous|dg|terminal safety|liquid|tanker|petrochemical/i.test(`${port.documents.join(" ")} ${port.type}`) ? 12 : values.imdg === "yes" ? 6 : 0;
  const cleanlinessRisk = { clean: 0, minor: 10, dirty: 32 }[values.cleanliness] || 0;
  const risk = clamp(Math.round(18 + cargo.risk * 0.24 + draftRisk + loaRisk + cargoMismatchRisk + imdgRisk + cleanlinessRisk), 0, 100);
  const decision = risk >= 75 ? "NO-GO" : risk >= 50 ? "CONDITIONAL" : "SUITABLE";
  const blockers = [
    !typeMatch && "Cargo/terminal type mismatch",
    draftRisk >= 16 && "Draft margin is tight or negative",
    loaRisk && "LOA exceeds local model allowance",
    imdgRisk >= 12 && "IMDG/DG needs terminal-specific approval",
    cleanlinessRisk >= 32 && "Hold/tank is not ready"
  ].filter(Boolean);
  lastCargoPortSuitability = {
    values,
    port: port.name,
    cargo: cargo.label,
    risk,
    decision,
    blockers,
    reportText: reportLines("FOCUSEA CARGO + PORT SUITABILITY", [
      `Port: ${port.name}`,
      `Cargo: ${cargo.label}`,
      `Decision: ${decision}`,
      `Risk: ${risk}/100`,
      `Draft margin: ${margin.toFixed(1)} m`,
      `LOA check: ${values.loa} m / local model ${ops.maxLoa} m`,
      "",
      "Blockers / watch items:",
      ...(blockers.length ? blockers.map((item) => `- ${item}`) : ["- No hard blocker in the local model."]),
      "",
      "Cargo requirements:",
      `- Best vessel: ${cargo.vessel}`,
      `- Cargo note: ${cargo.note}`,
      `- Local docs: ${ops.localDocs.join(", ")}`
    ])
  };
  cargoPortSuitabilityResult.innerHTML = `
    ${metricCards([
      { label: "Port", value: escapeHtml(port.name) },
      { label: "Cargo", value: escapeHtml(cargo.label) },
      { label: "Decision", value: escapeHtml(decision) },
      { label: "Risk", value: `${risk}/100` },
      { label: "Draft margin", value: `${margin.toFixed(1)} m` },
      { label: "Type match", value: typeMatch ? "yes" : "no" }
    ])}
    <div class="score-meter"><span style="width:${risk}%"></span></div>
    <ul class="compact-list">
      ${(blockers.length ? blockers : ["No hard blocker in the local model."]).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      <li><strong>Required:</strong> ${ops.localDocs.map(escapeHtml).join(", ")}</li>
      <li><strong>Cargo note:</strong> ${escapeHtml(cargo.note)}</li>
    </ul>
  `;
}

const cargoPlaybookData = {
  coal: {
    docs: ["Cargo declaration", "Moisture certificate", "IMSBC declaration", "Terminal loading plan"],
    risks: ["Self-heating", "Dust", "Moisture limit", "Draft and berth queue"],
    handling: ["Check TML/FMP", "Keep holds clean and dry", "Price terminal queue into demurrage"],
    market: "Sensitive to Pacific tonnage balance and India/China demand."
  },
  grain: {
    docs: ["Phytosanitary certificate", "Fumigation certificate", "Clean holds certificate", "Quality certificate"],
    risks: ["Rain exposure", "Infestation", "Hold cleanliness", "Seasonal program changes"],
    handling: ["Survey holds early", "Track rain clauses", "Confirm fumigation time and port docs"],
    market: "Moves with crop season, Black Sea risk and receiver program."
  },
  container: {
    docs: ["Manifest", "Dangerous goods list", "Reefer list", "Bill of lading instructions"],
    risks: ["Port omission", "D&D exposure", "Reefer plug shortage", "Blank sailing"],
    handling: ["Confirm free time", "Get terminal cut-off", "Track container index direction"],
    market: "Rate follows spot index, service reliability and port congestion."
  },
  ironOre: {
    docs: ["IMSBC declaration", "Moisture / TML certificate", "Draft survey", "Loading sequence"],
    risks: ["High density stability", "Deep draft restriction", "Cape queue", "Loading rate underperformance"],
    handling: ["Check GM and draft", "Confirm terminal depth", "Price cape/panamax spread"],
    market: "China steel demand and Brazil/Australia weather move rates."
  },
  crudeOil: {
    docs: ["Cargo origin", "Vetting approval", "Q88", "Terminal acceptance", "Sanctions screening"],
    risks: ["Sanctions", "War risk", "Heating", "Terminal delay", "Vetting failure"],
    handling: ["Screen counterparties", "Confirm previous cargo", "Define NOR and pumping logs"],
    market: "Driven by Worldscale, refinery demand and geopolitical risk."
  },
  lng: {
    docs: ["Terminal compatibility", "Heel plan", "Boil-off terms", "Vetting approval"],
    risks: ["Terminal window", "Boil-off", "High hire", "Compatibility"],
    handling: ["Confirm berth slot", "Model boil-off", "Keep demurrage wording precise"],
    market: "Highly sensitive to seasonal demand and terminal queue."
  },
  chemicals: {
    docs: ["MSDS", "IMO class", "Tank coating approval", "Cleaning certificate", "Previous cargo list"],
    risks: ["Tank contamination", "Segregation", "Cleaning time", "IMDG/IMO restrictions"],
    handling: ["Approve coating", "Check previous cargo", "Price cleaning and heating"],
    market: "Premium depends on parcel complexity and tank availability."
  },
  projectCargo: {
    docs: ["Lift plan", "Method statement", "Sea fastening plan", "Permits", "Cargo drawings"],
    risks: ["Crane capacity", "Weather window", "Deck strength", "Lashing failure"],
    handling: ["Approve lifting plan", "Check gear SWL", "Price waiting for weather"],
    market: "Premium follows offshore, wind and infrastructure project timing."
  }
};

function renderCargoPlaybook() {
  if (!cargoPlaybookForm || !cargoPlaybookResult) return;
  const values = collectFormValues(cargoPlaybookForm);
  const cargo = getCargoProfile(values.cargoType);
  const data = cargoPlaybookData[values.cargoType] || cargoPlaybookData.grain;
  const rate = marketRate(cargo, liveFeedState.congestion > 55 ? "firm" : "neutral");
  cargoPlaybookResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: cargo.label },
      { label: "Trade", value: values.trade },
      { label: "Best vessel", value: cargo.vessel },
      { label: "Indicative rate", value: `${money(rate, 2)}/${cargo.unit}` },
      { label: "Risk", value: `${cargo.risk}/100` }
    ])}
    <ul class="compact-list">
      <li><strong>Documents:</strong> ${data.docs.map(escapeHtml).join(", ")}</li>
      <li><strong>Risks:</strong> ${data.risks.map(escapeHtml).join(", ")}</li>
      <li><strong>Handling:</strong> ${data.handling.map(escapeHtml).join(", ")}</li>
      <li><strong>Market note:</strong> ${escapeHtml(data.market)}</li>
    </ul>
  `;
}

function renderTceOptimizer2() {
  if (!tceOptimizer2Form || !tceOptimizer2Result) return;
  const values = collectFormValues(tceOptimizer2Form);
  const cargo = getCargoProfile(values.cargoType);
  const quantity = Number(values.cargoQty) || 0;
  const adjustedRate = (Number(values.freightRate) || cargo.baseFreight) * cargo.freightMultiplier;
  const grossFreight = quantity * adjustedRate;
  const commission = grossFreight * 0.025;
  const weatherDays = (Number(values.weatherDelay) || 0) / 24;
  const baseCons = cargo.unit === "TEU" ? 68 : cargo.unit === "cbm" ? 92 : cargo.label.includes("Crude") ? 46 : 28;
  const rows = [10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5].map((speed) => {
    const seaDays = (Number(values.distance) || 0) / speed / 24;
    const portDays = 3.2 + liveFeedState.congestion / 28;
    const totalDays = seaDays + portDays + weatherDays;
    const seaCons = baseCons * Math.pow(speed / 12, 3) * cargo.bunkerMultiplier;
    const portCons = cargo.unit === "TEU" ? 9 : cargo.unit === "cbm" ? 14 : 4;
    const bunkerCost = ((seaDays * seaCons) + (portDays * portCons)) * (Number(values.bunkerPrice) || liveFeedState.bunker);
    const cost = bunkerCost + (Number(values.portCost) || 0) * cargo.portCostMultiplier + (Number(values.canalDues) || 0) + commission;
    const netRevenue = grossFreight - cost;
    const tce = totalDays ? netRevenue / totalDays : 0;
    const hireCost = totalDays * 14500;
    const pnl = netRevenue - hireCost;
    return { speed, seaDays, portDays, totalDays, bunkerCost, tce, pnl };
  });
  const best = rows.reduce((winner, row) => (row.pnl > winner.pnl ? row : winner), rows[0]);
  lastTceOptimizer2 = {
    values,
    rows,
    best,
    reportText: [
      "FOCUSEA TCE OPTIMIZER 2.0",
      `Cargo: ${cargo.label}`,
      `Quantity: ${quantity.toLocaleString("en-US")} ${cargo.unit}`,
      `Adjusted rate: ${money(adjustedRate, 2)}/${cargo.unit}`,
      `Best speed: ${best.speed} kn`,
      `Best TCE: ${money(best.tce)}/day`,
      `Best P&L: ${money(best.pnl)}`,
      "",
      "Scenario rows:",
      ...rows.map((row) => `${row.speed} kn | ${row.totalDays.toFixed(1)} days | bunker ${money(row.bunkerCost)} | TCE ${money(row.tce)}/day | P&L ${money(row.pnl)}`)
    ].join("\n")
  };
  tceOptimizer2Result.innerHTML = `
    ${metricCards([
      { label: "Best speed", value: `${best.speed} kn` },
      { label: "Best TCE", value: `${money(best.tce)}/day` },
      { label: "Best P&L", value: `<em class="${best.pnl >= 0 ? "positive" : "negative"}">${money(best.pnl)}</em>` },
      { label: "Bunker at best", value: money(best.bunkerCost) }
    ])}
    <div class="analytics-bars">${rows.map((row) => `<div><span>${row.speed} kn</span><em style="width:${clamp((row.pnl - Math.min(...rows.map((item) => item.pnl))) / Math.max(1, Math.max(...rows.map((item) => item.pnl)) - Math.min(...rows.map((item) => item.pnl))) * 100, 6, 100)}%"></em><strong>${money(row.tce)}</strong></div>`).join("")}</div>
    <small>Recommendation: ${best.speed <= 11.5 ? "Slow steaming protects bunker cost; watch laycan." : best.speed >= 13.5 ? "Higher speed protects schedule; bunker exposure rises." : "Balanced speed keeps TCE and schedule in range."}</small>
  `;
}

function renderTerminalAlarms() {
  if (!terminalAlarmResult) return;
  const alarms = [
    liveFeedState.bunker > 660 && { level: "High", text: `Bunker above ${bunkerPriceLabel(liveFeedState.bunker)}; rerun TCE sensitivity.` },
    liveFeedState.congestion > 55 && { level: "High", text: `Port congestion at ${liveFeedState.congestion}%; add waiting cost to recap.` },
    terminalInboxItems.some((item) => item.status === "Subjects deadline") && { level: "High", text: "Subject deadline exists in Broker Inbox." },
    terminalInboxItems.some((item) => item.priority === "High") && { level: "Medium", text: "High priority offer requires broker action." },
    lastRecapCheck?.score > 65 && { level: "High", text: `Latest recap check risk ${Math.round(lastRecapCheck.score)}/100.` },
    lastClaimBuilder?.claim?.amount > 0 && { level: "Medium", text: `Open demurrage draft amount ${money(lastClaimBuilder.claim.amount)}.` }
  ].filter(Boolean);
  if (!alarms.length) alarms.push({ level: "Low", text: "No urgent alarm. Keep market feed and inbox open." });
  terminalAlarmResult.innerHTML = `
    ${metricCards([
      { label: "Alarms", value: alarms.length },
      { label: "Bunker", value: `${bunkerPriceLabel(liveFeedState.bunker)}` },
      { label: "Congestion", value: `${liveFeedState.congestion}%` },
      { label: "Inbox high", value: terminalInboxItems.filter((item) => item.priority === "High").length }
    ])}
    <ul class="compact-list">${alarms.map((alarm) => `<li><strong>${alarm.level}</strong> ${escapeHtml(alarm.text)}</li>`).join("")}</ul>
  `;
}

function renderBackendWorkspace() {
  if (!backendWorkspaceForm || !backendWorkspaceResult) return;
  const values = collectFormValues(backendWorkspaceForm);
  const workspace = {
    ...values,
    savedAt: new Date().toISOString(),
    dealRoom: lastDealRoom,
    inbox: terminalInboxItems,
    recapCheck: lastRecapCheck,
    claim: lastClaimBuilder,
    tceOptimizer2: lastTceOptimizer2
  };
  const ok = safeLocalSet("focusea-command-workspace-v1", workspace);
  lastBackendWorkspace = workspace;
  backendWorkspaceResult.innerHTML = `
    ${metricCards([
      { label: "User", value: values.userName },
      { label: "Mode", value: values.mode },
      { label: "Scope", value: values.scope },
      { label: "Status", value: ok ? "Saved" : "Storage blocked" }
    ])}
    <ul class="compact-list">
      <li>Local workspace saved with ${terminalInboxItems.length} inbox items and current reports.</li>
      <li>API contract ready for <strong>${escapeHtml(values.endpoint)}</strong>; a real backend endpoint is still required for multi-user cloud login.</li>
    </ul>
  `;
}

function renderAdminPro() {
  if (!adminProForm || !adminProResult) return;
  const values = collectFormValues(adminProForm);
  const cargo = getCargoProfile(values.cargoType);
  const previousMultiplier = cargo.freightMultiplier;
  cargo.freightMultiplier = Number(values.rateMultiplier) || cargo.freightMultiplier;
  liveFeedState.congestion = clamp(Number(values.waitingIndex) || liveFeedState.congestion, 0, 100);
  lastAdminPro = {
    values,
    previousMultiplier,
    newMultiplier: cargo.freightMultiplier,
    reportText: [
      "FOCUSEA ADMIN PARAMETER UPDATE",
      `Cargo: ${cargo.label}`,
      `Rate multiplier: ${previousMultiplier} -> ${cargo.freightMultiplier}`,
      `Port waiting index: ${liveFeedState.congestion}%`,
      `Port: ${values.portId}`
    ].join("\n")
  };
  adminProResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: cargo.label },
      { label: "Old multiplier", value: previousMultiplier.toFixed(2) },
      { label: "New multiplier", value: cargo.freightMultiplier.toFixed(2) },
      { label: "Waiting index", value: `${liveFeedState.congestion}%` }
    ])}
    <small>Applied to cargo rate matrix, playbook, TCE optimizer and alarm calculations.</small>
  `;
  renderRateMatrix();
  renderCargoPlaybook();
  renderTceOptimizer2();
  renderPortIntelPro();
  renderMarketBrief();
  renderTerminalAlarms();
}

function setTerminalDownloadNotice(type, filename) {
  const target = type.startsWith("turkiye-port") ? turkiyePortIntelResult
    : type.startsWith("turkiye-sof") ? turkiyeSofNorResult
      : type.startsWith("turkiye-cost") ? turkiyeCostResult
        : type.startsWith("cabotage") ? cabotageResult
          : type.startsWith("official-import") ? officialImportProResult
            : type.startsWith("suitability") ? cargoPortSuitabilityResult
              : {
                  deal: dealRoomResult,
                  import: importResult,
                  recap: recapCheckerResult,
                  claim: claimBuilderResult,
                  tce2: tceOptimizer2Result
                }[type.split("-")[0]];
  if (!target) return;
  target.querySelector(".download-confirm")?.remove();
  target.insertAdjacentHTML("beforeend", `<small class="download-confirm">Downloaded: ${filename}</small>`);
}

function tceOptimizer2CsvRows() {
  if (!lastTceOptimizer2) renderTceOptimizer2();
  return [
    ["speed", "total_days", "bunker_cost", "tce", "pnl"],
    ...(lastTceOptimizer2?.rows || []).map((row) => [row.speed, row.totalDays.toFixed(2), row.bunkerCost.toFixed(2), row.tce.toFixed(2), row.pnl.toFixed(2)])
  ];
}

function handleTerminalDownload(type) {
  if (type.startsWith("deal") && !lastDealRoom) renderDealRoom();
  if (type.startsWith("import") && !lastImportReport) renderImport();
  if (type.startsWith("recap") && !lastRecapCheck) renderRecapChecker();
  if (type.startsWith("claim") && !lastClaimBuilder) renderClaimBuilder();
  if (type.startsWith("tce2") && !lastTceOptimizer2) renderTceOptimizer2();
  if (type.startsWith("turkiye-port") && !lastTurkiyePortIntel) renderTurkiyePortIntel();
  if (type.startsWith("turkiye-sof") && !lastTurkiyeSofNor) renderTurkiyeSofNor();
  if (type.startsWith("turkiye-cost") && !lastTurkiyeCost) renderTurkiyeCost();
  if (type.startsWith("cabotage") && !lastCabotage) renderCabotage();
  if (type.startsWith("official-import") && !lastOfficialImportPro) renderOfficialImportPro(false);
  if (type.startsWith("suitability") && !lastCargoPortSuitability) renderCargoPortSuitability();
  const actions = {
    "deal-pdf": () => downloadPdfFile("focusea-deal-room.pdf", "Focusea Deal Room", lastDealRoom?.reportText || "No deal room data."),
    "deal-json": () => downloadJsonFile("focusea-deal-room.json", lastDealRoom || {}),
    "import-json": () => downloadJsonFile("focusea-imported-offer.json", lastImportReport || {}),
    "recap-check-pdf": () => downloadPdfFile("focusea-recap-checker.pdf", "Focusea AI Recap Checker", lastRecapCheck?.reportText || "No recap check data."),
    "claim-pdf": () => downloadPdfFile("focusea-demurrage-claim.pdf", "Focusea Demurrage Claim", lastClaimBuilder?.reportText || "No claim data."),
    "claim-txt": () => downloadTextFile("focusea-demurrage-claim.txt", lastClaimBuilder?.reportText || "No claim data."),
    "tce2-csv": () => downloadCsvFile("focusea-tce-optimizer-2.csv", tceOptimizer2CsvRows()),
    "tce2-pdf": () => downloadPdfFile("focusea-tce-optimizer-2.pdf", "Focusea TCE Optimizer 2.0", lastTceOptimizer2?.reportText || "No TCE data."),
    "turkiye-port-pdf": () => downloadPdfFile("focusea-turkiye-port-intelligence.pdf", "Focusea Turkiye Port Intelligence", lastTurkiyePortIntel?.reportText || "No Turkiye port data."),
    "turkiye-port-json": () => downloadJsonFile("focusea-turkiye-port-intelligence.json", lastTurkiyePortIntel || {}),
    "turkiye-sof-pdf": () => downloadPdfFile("focusea-turkiye-sof-nor-pack.pdf", "Focusea Turkiye SOF NOR Pack", lastTurkiyeSofNor?.reportText || "No SOF/NOR data."),
    "turkiye-sof-txt": () => downloadTextFile("focusea-turkiye-sof-nor-pack.txt", lastTurkiyeSofNor?.reportText || "No SOF/NOR data."),
    "turkiye-cost-csv": () => downloadCsvFile("focusea-turkiye-port-cost.csv", turkiyeCostCsvRows()),
    "turkiye-cost-pdf": () => downloadPdfFile("focusea-turkiye-port-cost.pdf", "Focusea Turkiye Port Cost", lastTurkiyeCost?.reportText || "No cost data."),
    "cabotage-pdf": () => downloadPdfFile("focusea-cabotage-turkiye.pdf", "Focusea Cabotage Turkiye", lastCabotage?.reportText || "No cabotage data."),
    "cabotage-json": () => downloadJsonFile("focusea-cabotage-turkiye.json", lastCabotage || {}),
    "official-import-json": () => downloadJsonFile("focusea-official-port-import.json", lastOfficialImportPro || {}),
    "suitability-pdf": () => downloadPdfFile("focusea-cargo-port-suitability.pdf", "Focusea Cargo Port Suitability", lastCargoPortSuitability?.reportText || "No suitability data.")
  };
  actions[type]?.();
  if (window.focuseaLastDownload?.filename) {
    setTerminalDownloadNotice(type, window.focuseaLastDownload.filename);
  }
}

function renderAllCommandTerminal() {
  renderDealRoom();
  renderImport();
  renderBrokerInbox();
  renderRecapChecker();
  renderClauseLibrary();
  renderClaimBuilder();
  renderPortIntelPro();
  renderTurkiyePortIntel();
  renderTurkiyeSofNor();
  renderTurkiyeCost();
  renderCabotage();
  renderOfficialImportPro(false);
  renderCargoPortSuitability();
  renderCargoPlaybook();
  renderTceOptimizer2();
  renderTerminalAlarms();
  renderBackendWorkspace();
  renderAdminPro();
}

const dealStages = ["Offer", "Counter", "Subjects", "Recap", "CP", "SOF", "Laytime", "Claim"];

function dealQuantity(deal) {
  const value = String(deal.cargo || "").match(/[0-9][0-9,]*/)?.[0]?.replace(/,/g, "");
  return Number(value) || (deal.cargoType === "container" ? 1400 : 50000);
}

function dealEconomics(deal) {
  const cargo = getCargoProfile(deal.cargoType);
  const quantity = dealQuantity(deal);
  const gross = quantity * deal.freight;
  const voyageDays = 18 + liveFeedState.congestion / 16 + (cargo.risk / 18);
  const bunkerCost = voyageDays * (cargo.unit === "TEU" ? 68 : cargo.unit === "cbm" ? 92 : 30) * liveFeedState.bunker * cargo.bunkerMultiplier;
  const portCost = 72000 * cargo.portCostMultiplier;
  const demurrageExposure = Math.max(0, (deal.usedHours - deal.allowedHours) / 24) * deal.demurrage;
  const net = gross - bunkerCost - portCost - demurrageExposure;
  const tce = voyageDays ? net / voyageDays : 0;
  const pnl = net - voyageDays * 14500;
  return { cargo, quantity, gross, voyageDays, bunkerCost, portCost, demurrageExposure, net, tce, pnl };
}

function renderTimeline() {
  if (!timelineForm || !timelineResult) return;
  const values = collectFormValues(timelineForm);
  const deal = terminalDealData[values.dealId] || terminalDealData["coal-india"];
  const activeIndex = Math.max(0, dealStages.indexOf(values.stage));
  const deadline = Number(values.deadlineHours) || 0;
  const nextAction = deadline <= 6 ? "Escalate now" : deadline <= 24 ? "Chase today" : "Monitor";
  timelineResult.innerHTML = `
    ${metricCards([
      { label: "Fixture", value: deal.ref },
      { label: "Current stage", value: values.stage },
      { label: "Deadline", value: `${deadline}h` },
      { label: "Next action", value: nextAction }
    ])}
    <div class="timeline-track">
      ${dealStages.map((stage, index) => `
        <div class="timeline-step ${index === activeIndex ? "active" : ""}">
          <strong>${stage}</strong>
          <span>${index < activeIndex ? "Done" : index === activeIndex ? "Now active" : "Pending"}</span>
          <small>${index === activeIndex ? nextAction : index < activeIndex ? "Closed" : "Queued"}</small>
        </div>
      `).join("")}
    </div>
  `;
}

function renderFixtureImportPro() {
  if (!fixtureImportProForm || !fixtureImportProResult) return;
  const text = String(new FormData(fixtureImportProForm).get("fixtureText") || "");
  const parsed = parseOfferText(text);
  const risk = scoreParsedOffer(parsed);
  const recap = [
    "FIXTURE RECAP DRAFT",
    `Cargo: ${parsed.quantity ? parsed.quantity.toLocaleString("en-US") : "-"} ${parsed.unit} ${parsed.cargoLabel}`,
    `Route: ${parsed.route || "-"}`,
    `Laycan: ${parsed.laycan || "-"}`,
    `Freight: ${parsed.freight ? `${money(parsed.freight, 2)}/${parsed.unit}` : "-"}`,
    `Demurrage: ${parsed.demurrage ? `${money(parsed.demurrage)}/day` : "-"}`,
    `Vessel size: ${parsed.vesselSize}`,
    `Commission: ${parsed.commission ? `${parsed.commission}%` : "-"}`,
    `Subjects: ${parsed.subjects || "-"}`
  ].join("\n");
  lastFixtureImportPro = { parsed, risk, recap, reportText: `${parsedOfferReport(parsed)}\n\n${recap}` };
  fixtureImportProResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: parsed.cargoLabel },
      { label: "Route", value: parsed.route || "-" },
      { label: "Risk", value: `${risk.score}/100 ${risk.label}` },
      { label: "Missing", value: parsed.missing.length }
    ])}
    <ul class="compact-list">
      ${risk.factors.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      <li><strong>Recap draft ready.</strong> Missing: ${parsed.missing.length ? parsed.missing.map(escapeHtml).join(", ") : "none"}</li>
    </ul>
  `;
}

function pushFixtureImportProToInbox() {
  if (!lastFixtureImportPro) renderFixtureImportPro();
  if (!lastFixtureImportPro) return;
  const { parsed, risk } = lastFixtureImportPro;
  terminalInboxItems.unshift({
    id: `INB-${1200 + terminalInboxItems.length}`,
    status: risk.score >= 65 ? "Subjects deadline" : parsed.missing.length ? "Counter needed" : "New offer",
    priority: risk.score >= 65 ? "High" : risk.score >= 42 ? "Medium" : "Low",
    cargo: parsed.cargoLabel,
    route: parsed.route || "Route TBC",
    laycan: parsed.laycan || "Laycan TBC",
    freight: parsed.freight ? `${money(parsed.freight, 2)}/${parsed.unit}` : "TBC",
    demurrage: parsed.demurrage ? `${money(parsed.demurrage)}/day` : "TBC",
    subject: parsed.subjects || "Subjects TBC",
    note: "Created by Mail / WhatsApp to Fixture."
  });
  renderBrokerInbox();
  renderEdgeAlarms();
  fixtureImportProResult?.insertAdjacentHTML("beforeend", `<small class="download-confirm">Added to Broker Inbox as ${terminalInboxItems[0].id}</small>`);
}

function renderClauseNegotiation() {
  if (!clauseNegotiationForm || !clauseNegotiationResult) return;
  const values = collectFormValues(clauseNegotiationForm);
  const text = String(values.clauseText || "");
  const analysis = analyzeClauseText(text);
  const actingFor = values.side;
  const chartererCounter = "Counter: NOR to be valid only when vessel is arrived, legally and physically ready, with free pratique/customs formalities completed where required. Time lost waiting for berth to count only if expressly agreed and not caused by owner's default.";
  const ownerCounter = "Counter: NOR may be tendered WIPON/WIBON/WECCON upon arrival at customary waiting place, and time lost waiting for berth to count as laytime/demurrage if vessel is otherwise ready.";
  const balanced = "Broker note: split waiting time, define valid NOR evidence, list weather/port exceptions, and add document standard to reduce dispute risk.";
  const recommendation = actingFor === "Charterer" ? chartererCounter : actingFor === "Owner" ? ownerCounter : balanced;
  lastClauseNegotiation = {
    values,
    analysis,
    recommendation,
    reportText: [
      "FOCUSEA CLAUSE NEGOTIATION ASSISTANT",
      `Acting for: ${actingFor}`,
      `Risk owner: ${analysis.riskOwner}`,
      `Demurrage likely: ${analysis.demurrageLikely}`,
      "",
      "Findings:",
      ...analysis.findings.map((item) => `- ${item}`),
      "",
      recommendation
    ].join("\n")
  };
  clauseNegotiationResult.innerHTML = `
    ${metricCards([
      { label: "Acting for", value: actingFor },
      { label: "Risk owner", value: analysis.riskOwner },
      { label: "Owner risk", value: `${analysis.ownerRisk}/100` },
      { label: "Charterer risk", value: `${analysis.chartererRisk}/100` }
    ])}
    <ul class="compact-list">
      <li>${escapeHtml(recommendation)}</li>
      ${analysis.findings.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderProfitRadar() {
  if (!profitRadarForm || !profitRadarResult) return;
  const values = collectFormValues(profitRadarForm);
  const cargo = getCargoProfile(values.cargoType);
  const quantity = Number(values.quantity) || 0;
  const freightRate = (Number(values.freightRate) || cargo.baseFreight) * cargo.freightMultiplier;
  const gross = quantity * freightRate;
  const seaDays = (Number(values.distance) || 0) / 12.5 / 24;
  const totalDays = seaDays + (Number(values.portDelay) || 0) + 4;
  const bunkerSensitivity = totalDays * (cargo.unit === "TEU" ? 68 : 30) * cargo.bunkerMultiplier * 15;
  const bunkerCost = totalDays * (cargo.unit === "TEU" ? 68 : 30) * cargo.bunkerMultiplier * liveFeedState.bunker;
  const portDelayRisk = Math.min(100, liveFeedState.congestion + (Number(values.portDelay) || 0) * 8);
  const complianceRisk = { low: 8, medium: 22, high: 42 }[values.complianceRisk] || 18;
  const demurrageExposure = Math.max(0, Number(values.portDelay) || 0) * 0.35 * 18000 * cargo.demurrageMultiplier;
  const net = gross - bunkerCost - 72000 * cargo.portCostMultiplier - demurrageExposure;
  const tce = totalDays ? net / totalDays : 0;
  const pnl = net - totalDays * 14500;
  const score = clamp(Math.round(60 + pnl / 18000 - portDelayRisk * 0.18 - complianceRisk * 0.45 - cargo.risk * 0.12), 0, 100);
  const verdict = score >= 68 ? "Fix" : score >= 42 ? "Watch" : "Avoid";
  lastProfitRadar = {
    values,
    cargo: cargo.label,
    verdict,
    score,
    tce,
    pnl,
    demurrageExposure,
    bunkerSensitivity,
    portDelayRisk,
    complianceRisk,
    reportText: [
      "FOCUSEA FIXTURE PROFIT RADAR",
      `Cargo: ${cargo.label}`,
      `Verdict: ${verdict}`,
      `Score: ${score}/100`,
      `TCE: ${money(tce)}/day`,
      `Net P&L: ${money(pnl)}`,
      `Demurrage exposure: ${money(demurrageExposure)}`,
      `Bunker sensitivity per $15/t: ${money(bunkerSensitivity)}`,
      `Port delay risk: ${Math.round(portDelayRisk)}/100`,
      `Compliance risk: ${complianceRisk}/100`
    ].join("\n")
  };
  profitRadarResult.innerHTML = `
    ${metricCards([
      { label: "Verdict", value: verdict },
      { label: "Score", value: `${score}/100` },
      { label: "TCE", value: `${money(tce)}/day` },
      { label: "Net P&L", value: `<em class="${pnl >= 0 ? "positive" : "negative"}">${money(pnl)}</em>` },
      { label: "Demurrage exposure", value: money(demurrageExposure) },
      { label: "Bunker sensitivity", value: money(bunkerSensitivity) }
    ])}
    <div class="score-meter"><span style="width:${score}%"></span></div>
    <small>${verdict === "Fix" ? "Commercially attractive, keep evidence and subjects clean." : verdict === "Watch" ? "Workable but needs clause/port/compliance cleanup." : "Risk-adjusted economics are weak; renegotiate before fixing."}</small>
  `;
}

function renderMarketConfidence() {
  if (!marketConfidenceResult) return;
  const now = new Date().toLocaleTimeString();
  const rows = [
    { label: "Maritime news bulletin", value: "Live/fallback source links", badge: "verified", time: now },
    { label: "Dry bulk indexes", value: `BDI ${liveFeedState.bdi.toLocaleString("en-US")} · BPI ${liveFeedState.bpi.toLocaleString("en-US")}`, badge: "licensed", time: now },
    { label: "Tanker indexes", value: `BDTI ${liveFeedState.bdti.toLocaleString("en-US")} · BCTI ${liveFeedState.bcti.toLocaleString("en-US")}`, badge: "licensed", time: now },
    { label: "Container indexes", value: `SCFI ${liveFeedState.scfi.toLocaleString("en-US")} · WCI ${formatMarketIndexValue(marketIndexDefinitions.find((item) => item.id === "wci"), liveFeedState.wci)}`, badge: "api-ready", time: now },
    { label: "Bunker indexes", value: `SG VLSFO ${bunkerPriceLabel(liveFeedState.vlsfoSingapore)} · Hi5 ${bunkerPriceLabel(liveFeedState.hi5Spread)}`, badge: "verified", time: verifiedBunkerSnapshot.checkedAt },
    { label: "Carbon / green indexes", value: `EUA ${liveFeedState.eua.toFixed(2)} EUR/t · CII ${liveFeedState.ciiRisk}`, badge: "api-ready", time: now },
    { label: "Port congestion", value: `${liveFeedState.congestion}%`, badge: "simulated", time: now },
    { label: "Cargo route scores", value: `Coal ${liveFeedState.coalRoute} · Grain ${liveFeedState.grainFreight} · Crude ${liveFeedState.crudeRouteRisk}`, badge: "simulated", time: now },
    { label: "Fixture terms", value: "User pasted / form input", badge: "input", time: "on edit" }
  ];
  marketConfidenceResult.innerHTML = `
    ${metricCards([
      { label: "Verified", value: rows.filter((row) => row.badge === "verified").length },
      { label: "API-ready", value: rows.filter((row) => row.badge === "api-ready").length },
      { label: "Licensed", value: rows.filter((row) => row.badge === "licensed").length },
      { label: "Simulated", value: rows.filter((row) => row.badge === "simulated").length },
    ])}
    <div class="confidence-list">
      ${rows.map((row) => `
        <div class="confidence-row">
          <strong>${escapeHtml(row.label)}</strong>
          <span>${escapeHtml(row.value)}</span>
          <em class="source-badge ${row.badge}">${row.badge}</em>
        </div>
      `).join("")}
    </div>
    <small>Badge sistemi uydurma veri hissini azaltmak icin her kalemin kaynagini acik ayirir.</small>
  `;
}

function renderDocumentAi() {
  if (!documentAiForm || !documentAiResult) return;
  const text = String(new FormData(documentAiForm).get("documentText") || "");
  const clause = analyzeClauseText(text);
  const claim = parseClaimFacts(text);
  const events = [
    text.match(/NOR tendered[^.]*\./i)?.[0],
    text.match(/berthed[^.]*\./i)?.[0],
    text.match(/Loading started[^.]*\./i)?.[0],
    text.match(/Rain[^.]*\./i)?.[0],
    text.match(/completed[^.]*\./i)?.[0]
  ].filter(Boolean);
  lastDocumentAi = {
    text,
    clause,
    claim,
    events,
    reportText: [
      "FOCUSEA DOCUMENT AI",
      "",
      "Extracted events:",
      ...(events.length ? events.map((item) => `- ${item}`) : ["- No structured events detected."]),
      "",
      `NOR detected: ${/nor/i.test(text) ? "yes" : "no"}`,
      `Claim estimate: ${money(claim.amount)}`,
      `Clause risk owner: ${clause.riskOwner}`,
      "",
      "Claim draft:",
      ...(lastClaimBuilder?.reportText ? [lastClaimBuilder.reportText] : ["Use Demurrage Claim Builder for final letter."])
    ].join("\n")
  };
  documentAiResult.innerHTML = `
    ${metricCards([
      { label: "Events", value: events.length },
      { label: "NOR", value: /nor/i.test(text) ? "Detected" : "Missing" },
      { label: "Claim estimate", value: money(claim.amount) },
      { label: "Clause risk", value: clause.riskOwner }
    ])}
    <ul class="compact-list">
      ${events.map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>No structured events detected.</li>"}
      ${clause.findings.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderCounterpartyIntel() {
  if (!counterpartyIntelForm || !counterpartyIntelResult) return;
  const values = collectFormValues(counterpartyIntelForm);
  const paymentPenalty = { low: 4, medium: 18, high: 34 }[values.paymentRisk] || 12;
  const disputePenalty = { clean: 0, watch: 16, bad: 32 }[values.disputeHistory] || 10;
  const related = focuseaDb.fixtures.filter((fixture) => fixture.risk >= 45);
  const trust = clamp(88 - paymentPenalty - disputePenalty + (values.role === "Broker" ? 4 : 0), 0, 100);
  const verdict = trust >= 72 ? "Preferred" : trust >= 48 ? "Watch" : "High risk";
  counterpartyIntelResult.innerHTML = `
    ${metricCards([
      { label: "Company", value: values.companyName },
      { label: "Role", value: values.role },
      { label: "Trust score", value: `${trust}/100` },
      { label: "Verdict", value: verdict }
    ])}
    <ul class="compact-list">
      <li>Payment risk: ${values.paymentRisk}; dispute history: ${values.disputeHistory}.</li>
      <li>Past fixture pattern: ${related.map((item) => `${item.cargo} ${item.route}`).join("; ")}.</li>
      <li>Broker note: ${verdict === "Preferred" ? "Can move fast with standard subjects." : verdict === "Watch" ? "Keep docs, payment and CP wording tight." : "Require references, strong subjects and payment clarity."}</li>
    </ul>
  `;
}

function renderPricingEngine() {
  if (!pricingEngineForm || !pricingEngineResult) return;
  const values = collectFormValues(pricingEngineForm);
  const cargo = getCargoProfile(values.cargoType);
  const rate = marketRate(cargo, values.marketState);
  const gross = (Number(values.quantity) || 0) * rate;
  const demurrage = 15000 * cargo.demurrageMultiplier * (values.marketState === "firm" ? 1.12 : values.marketState === "soft" ? 0.92 : 1);
  pricingEngineResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: cargo.label },
      { label: "Vessel", value: cargo.vessel },
      { label: "Indicative rate", value: `${money(rate, 2)}/${cargo.unit}` },
      { label: "Gross freight", value: money(gross) },
      { label: "Demurrage model", value: `${money(demurrage)}/day` },
      { label: "Risk multiplier", value: `${cargo.risk}/100` }
    ])}
    <ul class="compact-list">
      <li>Port cost multiplier: ${cargo.portCostMultiplier.toFixed(2)}.</li>
      <li>Bunker multiplier: ${cargo.bunkerMultiplier.toFixed(2)}.</li>
      <li>Market sentiment: ${values.marketState}; ${cargo.note}</li>
    </ul>
  `;
}

function renderEmailGeneratorPro() {
  if (!emailGeneratorProForm || !emailGeneratorProResult) return;
  const values = collectFormValues(emailGeneratorProForm);
  const subject = `${values.emailType} - ${values.fixtureRef}`;
  const body = [
    `Subject: ${subject}`,
    "",
    "Dear Sirs,",
    "",
    `Please note ${values.emailType.toLowerCase()} for ${values.fixtureRef}.`,
    values.mainPoint,
    "",
    "Kindly confirm by return so we can keep the fixture moving without delay.",
    "",
    "Best regards,"
  ].join("\n");
  lastEmailGeneratorPro = { values, subject, body, reportText: body };
  emailGeneratorProResult.innerHTML = `
    ${metricCards([
      { label: "Type", value: values.emailType },
      { label: "Fixture", value: values.fixtureRef },
      { label: "Language", value: "Professional EN" },
      { label: "Status", value: "Ready" }
    ])}
    <pre>${escapeHtml(body)}</pre>
  `;
}

function renderDealComparison() {
  if (!dealComparisonForm || !dealComparisonResult) return;
  const values = collectFormValues(dealComparisonForm);
  const ids = [values.dealA, values.dealB, values.dealC];
  const rows = ids.map((id) => {
    const deal = terminalDealData[id] || terminalDealData["coal-india"];
    const economics = dealEconomics(deal);
    const speedToFix = deal.baseRisk < 50 ? "Fast" : deal.baseRisk < 62 ? "Medium" : "Slow";
    const rankScore = economics.pnl / 10000 - deal.baseRisk * 0.7 + (speedToFix === "Fast" ? 12 : 0);
    return { id, deal, economics, speedToFix, rankScore };
  });
  const best = rows.reduce((winner, row) => row.rankScore > winner.rankScore ? row : winner, rows[0]);
  dealComparisonResult.innerHTML = `
    ${metricCards([
      { label: "Best deal", value: best.deal.ref },
      { label: "Best P&L", value: money(best.economics.pnl) },
      { label: "Best TCE", value: `${money(best.economics.tce)}/day` },
      { label: "Fix speed", value: best.speedToFix }
    ])}
    <div class="analytics-bars">
      ${rows.map((row) => `<div><span>${row.deal.ref}</span><em style="width:${clamp(row.rankScore + 70, 8, 100)}%"></em><strong>${money(row.economics.pnl)}</strong></div>`).join("")}
    </div>
    <small>Recommendation: choose ${best.deal.ref} unless strategic cargo/relationship priority overrides economics.</small>
  `;
}

function renderMarketConfidence() {
  if (!marketConfidenceResult) return;
  const now = new Date().toLocaleTimeString();
  const rows = [
    { label: "Maritime news bulletin", value: "Live/fallback source links", badge: "verified", time: now },
    { label: "Dry bulk indexes", value: `BDI ${liveFeedState.bdi.toLocaleString("en-US")} / BPI ${liveFeedState.bpi.toLocaleString("en-US")}`, badge: "licensed", time: now },
    { label: "Tanker indexes", value: `BDTI ${liveFeedState.bdti.toLocaleString("en-US")} / BCTI ${liveFeedState.bcti.toLocaleString("en-US")}`, badge: "licensed", time: now },
    { label: "Container indexes", value: `SCFI ${liveFeedState.scfi.toLocaleString("en-US")} / WCI ${formatMarketIndexValue(marketIndexDefinitions.find((item) => item.id === "wci"), liveFeedState.wci)}`, badge: "api-ready", time: now },
    { label: "Bunker indexes", value: `SG VLSFO ${bunkerPriceLabel(liveFeedState.vlsfoSingapore)} / Hi5 ${bunkerPriceLabel(liveFeedState.hi5Spread)}`, badge: "verified", time: verifiedBunkerSnapshot.checkedAt },
    { label: "Carbon / green indexes", value: `EUA ${liveFeedState.eua.toFixed(2)} EUR/t / CII ${liveFeedState.ciiRisk}`, badge: "api-ready", time: now },
    { label: "Port congestion", value: `${liveFeedState.congestion}%`, badge: "simulated", time: now },
    { label: "Cargo route scores", value: `Coal ${liveFeedState.coalRoute} / Grain ${liveFeedState.grainFreight} / Crude ${liveFeedState.crudeRouteRisk}`, badge: "simulated", time: now },
    { label: "Fixture terms", value: "User pasted / form input", badge: "input", time: "on edit" }
  ];
  marketConfidenceResult.innerHTML = `
    ${metricCards([
      { label: "Verified", value: rows.filter((row) => row.badge === "verified").length },
      { label: "API-ready", value: rows.filter((row) => row.badge === "api-ready").length },
      { label: "Licensed", value: rows.filter((row) => row.badge === "licensed").length },
      { label: "Simulated", value: rows.filter((row) => row.badge === "simulated").length },
    ])}
    <div class="confidence-list">
      ${rows.map((row) => `
        <div class="confidence-row">
          <strong>${escapeHtml(row.label)}</strong>
          <span>${escapeHtml(row.value)}</span>
          <em class="source-badge ${row.badge}">${sourceBadgeText(row.badge)}</em>
        </div>
      `).join("")}
    </div>
    <small>Bunker prices use ${escapeHtml(bunkerSourceNote())}; simulated rows are still clearly separated.</small>
  `;
}

function renderEdgeAlarms() {
  if (!edgeAlarmResult) return;
  const alarms = [
    terminalInboxItems.some((item) => item.status === "Subjects deadline") && "Subject deadline is open in inbox.",
    liveFeedState.bunker > 660 && `Bunker high at ${bunkerPriceLabel(liveFeedState.bunker)}.`,
    liveFeedState.congestion > 55 && `Port delay rising: ${liveFeedState.congestion}%.`,
    lastProfitRadar?.verdict === "Avoid" && "Latest profit radar says Avoid.",
    lastDocumentAi?.claim?.amount > 0 && `Document AI found possible demurrage claim ${money(lastDocumentAi.claim.amount)}.`,
    lastClaimBuilder?.claim?.amount > 0 && "Demurrage claim time bar should be checked."
  ].filter(Boolean);
  if (!alarms.length) alarms.push("No critical alarm; keep monitoring live feed and inbox.");
  edgeAlarmResult.innerHTML = `
    ${metricCards([
      { label: "Alarms", value: alarms.length },
      { label: "Bunker", value: `${bunkerPriceLabel(liveFeedState.bunker)}` },
      { label: "Congestion", value: `${liveFeedState.congestion}%` },
      { label: "High inbox", value: terminalInboxItems.filter((item) => item.priority === "High").length }
    ])}
    <ul class="compact-list">${alarms.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  `;
}

function renderDailyBriefPro() {
  if (!dailyBriefProResult) return;
  const items = [
    `Open offers: ${terminalInboxItems.length}; high priority: ${terminalInboxItems.filter((item) => item.priority === "High").length}.`,
    `Subject deadline: ${terminalInboxItems.find((item) => item.status === "Subjects deadline")?.id || "none"}.`,
    `Bunker watch: ${bunkerPriceLabel(liveFeedState.bunker)}.`,
    `Port delay index: ${liveFeedState.congestion}%.`,
    `Market pulse: dry bulk ${liveFeedState.dryBulkStates[new Date().getSeconds() % liveFeedState.dryBulkStates.length]}.`,
    `Latest profit radar: ${lastProfitRadar ? `${lastProfitRadar.verdict} (${lastProfitRadar.score}/100)` : "run radar for current deal"}.`,
    `Document/claim watch: ${lastDocumentAi?.claim?.amount ? money(lastDocumentAi.claim.amount) : "no open document AI claim"}.`
  ];
  lastDailyBriefPro = {
    items,
    reportText: ["FOCUSEA BROKER DAILY BRIEF", `Generated: ${new Date().toLocaleString()}`, "", ...items.map((item) => `- ${item}`)].join("\n")
  };
  dailyBriefProResult.innerHTML = `
    ${metricCards([
      { label: "Brief items", value: items.length },
      { label: "High priority", value: terminalInboxItems.filter((item) => item.priority === "High").length },
      { label: "Bunker", value: `${bunkerPriceLabel(liveFeedState.bunker)}` },
      { label: "Port delay", value: `${liveFeedState.congestion}%` }
    ])}
    <ul class="compact-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  `;
}

function commercialRiskWeight(value) {
  return {
    low: 8,
    medium: 24,
    high: 46,
    no: 0,
    watch: 34,
    yes: 92,
    ready: 6,
    partial: 26,
    missing: 52
  }[value] || 14;
}

function daysUntilDate(value) {
  const target = new Date(value);
  if (Number.isNaN(target.getTime())) return null;
  return Math.ceil((target - new Date()) / 86400000);
}

function renderCharteringCrmPro() {
  if (!charteringCrmProForm || !charteringCrmProResult) return;
  const values = collectFormValues(charteringCrmProForm);
  const days = daysUntilDate(values.followDate);
  const urgency = values.priority === "Critical" || (days !== null && days <= 1) ? "Call today" : values.priority === "High" ? "Chase within 24h" : "Standard follow-up";
  charteringCrmProResult.innerHTML = `
    ${metricCards([
      { label: "Company", value: escapeHtml(values.company) },
      { label: "Role", value: escapeHtml(values.role) },
      { label: "Open offer", value: escapeHtml(values.openOffer) },
      { label: "Follow-up", value: days === null ? escapeHtml(values.followDate) : `${days} days` },
      { label: "Priority", value: escapeHtml(values.priority) },
      { label: "Next action", value: urgency }
    ])}
    <ul class="compact-list"><li>Save latest counter and subjects deadline.</li><li>Keep last contact note attached to the fixture file.</li><li>Move to Deal Room if terms are close to fixed.</li></ul>
  `;
}

function renderClaimDisputeCenter() {
  if (!claimDisputeCenterForm || !claimDisputeCenterResult) return;
  const values = collectFormValues(claimDisputeCenterForm);
  const days = daysUntilDate(values.timeBarDate);
  const docsRisk = commercialRiskWeight(values.docsReady);
  const positionRisk = values.counterPosition === "Rejecting claim" ? 38 : values.counterPosition === "Disputing deductions" ? 24 : 8;
  const timeRisk = days === null ? 20 : days <= 3 ? 42 : days <= 10 ? 24 : 8;
  const amountRisk = Number(values.claimAmount) > 75000 ? 20 : Number(values.claimAmount) > 25000 ? 12 : 5;
  const risk = clamp(docsRisk + positionRisk + timeRisk + amountRisk, 0, 100);
  const posture = risk >= 72 ? "High dispute risk" : risk >= 48 ? "Negotiate with evidence pack" : "Recoverable / controlled";
  lastCommercialClaimReport = [
    "FOCUSEA CLAIM & DISPUTE REPORT",
    `Claim type: ${values.claimType}`,
    `Amount: ${money(values.claimAmount)}`,
    `Time bar: ${values.timeBarDate} (${days === null ? "unknown" : `${days} days`})`,
    `Documents: ${values.docsReady}`,
    `Counterparty: ${values.counterPosition}`,
    `Risk: ${risk}/100`,
    `Posture: ${posture}`,
    "",
    "Action list:",
    "- Verify NOR validity, SOF signatures and stoppage evidence.",
    "- Check CP time bar wording before sending final claim.",
    "- Prepare claim letter, invoice and supporting pack."
  ].join("\n");

  claimDisputeCenterResult.innerHTML = `
    ${metricCards([
      { label: "Claim", value: escapeHtml(values.claimType) },
      { label: "Amount", value: money(values.claimAmount) },
      { label: "Time bar", value: days === null ? "Unknown" : `${days} days` },
      { label: "Risk", value: `${risk}/100` },
      { label: "Posture", value: posture }
    ])}
    <ul class="compact-list"><li>Documents drive claim strength more than amount alone.</li><li>Time bar should be treated as hard deadline.</li><li>Export the TXT report before negotiating.</li></ul>
  `;
}

function renderPortAgencyWorkspace() {
  if (!portAgencyWorkspaceForm || !portAgencyWorkspaceResult) return;
  const values = collectFormValues(portAgencyWorkspaceForm);
  const port = ports[values.portId] || ports.singapore;
  const docDelay = values.docsStatus === "Missing" ? 18 : values.docsStatus === "Partial" ? 8 : 0;
  const tugCount = Number(String(values.tugPlan).match(/\d+/)?.[0] || 1);
  const totalCost = (port.costs?.pilotage || 0) + (port.costs?.tug || 0) * (tugCount / 2) + (port.costs?.berth || 0) + (port.costs?.portDues || 0);
  const timeline = [
    `ETA ${String(values.eta).replace("T", " ")}`,
    `Pre-arrival docs: ${values.docsStatus}`,
    `Pilot window: ${values.pilotWindow}`,
    `Tug plan: ${values.tugPlan}`,
    `Agency PDA estimate: ${money(totalCost)}`
  ];
  portAgencyWorkspaceResult.innerHTML = `
    ${metricCards([
      { label: "Port", value: escapeHtml(port.name) },
      { label: "Pilotage", value: escapeHtml(port.pilotage) },
      { label: "Docs delay risk", value: `${docDelay}h` },
      { label: "Cost estimate", value: money(totalCost) },
      { label: "Weather", value: escapeHtml(port.weather) }
    ])}
    <ul class="compact-list">${timeline.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  `;
}

function renderComplianceTerminal() {
  if (!complianceTerminalForm || !complianceTerminalResult) return;
  const values = collectFormValues(complianceTerminalForm);
  const score = clamp(
    commercialRiskWeight(values.counterpartyRisk) +
    commercialRiskWeight(values.flagRisk) +
    commercialRiskWeight(values.originRisk) +
    commercialRiskWeight(values.paymentRisk) +
    commercialRiskWeight(values.sanctionHit),
    0,
    100
  );
  const verdict = score >= 75 ? "Stop / escalate compliance" : score >= 45 ? "Enhanced due diligence" : "Standard KYC";
  complianceTerminalResult.innerHTML = `
    ${metricCards([
      { label: "Compliance score", value: `${score}/100` },
      { label: "Verdict", value: verdict },
      { label: "Sanctions", value: escapeHtml(values.sanctionHit) },
      { label: "Payment", value: escapeHtml(values.paymentRisk) }
    ])}
    <ul class="compact-list"><li>Screen parties and beneficial ownership against OFAC/EU/UN sources.</li><li>Confirm cargo origin, end user and payment route.</li><li>Keep screenshot/audit trail before subjects are lifted.</li></ul>
  `;
}

function renderFinanceDesk() {
  if (!financeDeskForm || !financeDeskResult) return;
  const values = collectFormValues(financeDeskForm);
  const commissionAmount = Number(values.freightIncome || 0) * (Number(values.commission || 0) / 100);
  const voyageCost = Number(values.hireCost || 0) + Number(values.bunkerCost || 0) + Number(values.portCost || 0) + commissionAmount;
  const netPnl = Number(values.freightIncome || 0) - voyageCost + Number(values.claimAmount || 0);
  const margin = Number(values.freightIncome) ? (netPnl / Number(values.freightIncome)) * 100 : 0;
  const cashStatus = netPnl > 120000 ? "Strong cashflow" : netPnl > 0 ? "Positive but watch costs" : "Loss / renegotiate";
  financeDeskResult.innerHTML = `
    ${metricCards([
      { label: "Freight invoice", value: money(values.freightIncome) },
      { label: "Commission", value: money(commissionAmount) },
      { label: "Voyage cost", value: money(voyageCost) },
      { label: "Claim impact", value: money(values.claimAmount) },
      { label: "Net P&L", value: money(netPnl) },
      { label: "Margin", value: `${margin.toFixed(1)}%` }
    ])}
    <small>${cashStatus}. Use this desk before sending final counter or recap.</small>
  `;
}

function renderDocumentHub() {
  if (!documentHubForm || !documentHubResult) return;
  const values = collectFormValues(documentHubForm);
  const text = String(values.documentText || "");
  const lower = text.toLowerCase();
  const findings = [
    /time lost waiting|wibon|wipon/.test(lower) && "NOR / berth waiting language may shift laytime risk.",
    /weather.*except|rain|stoppage/.test(lower) && "Weather exception must be matched against SOF stoppages.",
    /loi|letter of indemnity/.test(lower) && "LOI found: check wording, issuer and P&I position.",
    /demurrage|dispatch/.test(lower) && "Demurrage/dispatch rate should be tied to laytime statement.",
    /sanction|origin|beneficial owner/.test(lower) && "Compliance wording found: keep KYC audit trail."
  ].filter(Boolean);
  if (!findings.length) findings.push("No major keyword risk found; still review CP clauses manually.");
  const action = findings.length >= 3 ? "Legal/commercial review before fixing" : "Broker review sufficient";
  documentHubResult.innerHTML = `
    ${metricCards([
      { label: "Document", value: escapeHtml(values.docType) },
      { label: "Findings", value: findings.length },
      { label: "Action", value: action }
    ])}
    <ul class="compact-list">${findings.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  `;
}

function renderCertificateMode() {
  if (!certificateModeForm || !certificateModeResult) return;
  const values = collectFormValues(certificateModeForm);
  const score = Number(values.quizScore) || 0;
  const lessons = Number(values.completedLessons) || 0;
  const months = Number(values.experienceMonths) || 0;
  const levelScore = clamp(score * 0.55 + lessons * 1.4 + months * 1.1, 0, 100);
  const level = levelScore >= 85 ? "Professional" : levelScore >= 65 ? "Operational" : levelScore >= 45 ? "Foundation" : "Starter";
  const badge = score >= 85 ? "Gold Badge" : score >= 70 ? "Silver Badge" : "Practice Badge";
  lastCertificateReport = [
    "FOCUSEA TRAINING CERTIFICATE",
    `Learner: ${values.learner}`,
    `Module: ${values.module}`,
    `Quiz score: ${score}%`,
    `Completed lessons: ${lessons}`,
    `Experience months: ${months}`,
    `Level: ${level}`,
    `Badge: ${badge}`,
    "",
    "This certificate is a Focusea training record, not an official STCW or flag-state certificate."
  ].join("\n");
  certificateModeResult.innerHTML = `
    ${metricCards([
      { label: "Learner", value: escapeHtml(values.learner) },
      { label: "Module", value: escapeHtml(values.module) },
      { label: "Level", value: level },
      { label: "Badge", value: badge },
      { label: "Readiness", value: `${Math.round(levelScore)}/100` }
    ])}
    <small>Sertifika PDF'i eğitim kaydıdır; resmi STCW/flag certificate yerine geçmez.</small>
  `;
}

function renderCargoIntelligencePro() {
  if (!cargoIntelligenceProForm || !cargoIntelligenceProResult) return;
  const values = collectFormValues(cargoIntelligenceProForm);
  const cargo = getCargoProfile(values.cargoType);
  const toneMultiplier = values.marketTone === "Firm" ? 1.08 : values.marketTone === "Soft" ? 0.94 : 1;
  const indicativeRate = cargo.baseFreight * cargo.freightMultiplier * toneMultiplier;
  const exposure = cargo.risk + (Number(values.quantity) > 70000 ? 8 : 0) + (values.marketTone === "Firm" ? 5 : 0);
  const docs = {
    coal: "IMSBC declaration, moisture/TML, hold cleanliness, self-heating watch.",
    grain: "Phytosanitary, fumigation, clean holds, quality certificate.",
    container: "Booking list, dangerous goods declaration, reefer manifest.",
    ironOre: "IMSBC, TML/moisture, draft survey, loading sequence.",
    crudeOil: "MSDS, cargo nomination, vetting, terminal compatibility.",
    lng: "Terminal compatibility, cargo quality, boil-off plan.",
    chemicals: "MSDS, tank coating approval, cleaning certificate.",
    projectCargo: "Lift plan, method statement, lashing certificate, permits."
  }[values.cargoType] || cargo.note;
  cargoIntelligenceProResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: cargo.label },
      { label: "Suitable vessel", value: cargo.vessel },
      { label: "Indicative rate", value: `${money(indicativeRate, 2)}/${cargo.unit}` },
      { label: "Exposure", value: `${Math.round(exposure)}/100` },
      { label: "Route", value: escapeHtml(values.route) }
    ])}
    <ul class="compact-list"><li>${escapeHtml(docs)}</li><li>Market tone: ${escapeHtml(values.marketTone)}.</li><li>${escapeHtml(cargo.note)}</li></ul>
  `;
}

function renderSustainabilityDesk() {
  if (!sustainabilityDeskForm || !sustainabilityDeskResult) return;
  const values = collectFormValues(sustainabilityDeskForm);
  const fuel = Number(values.fuelTons) || 0;
  const co2 = fuel * 3.114;
  const euCo2 = co2 * ((Number(values.euShare) || 0) / 100);
  const etsCost = euCo2 * (Number(values.euaPrice) || 0);
  const intensity = co2 / (Number(values.cargoQty) || 1);
  const cii = intensity < 0.025 ? "A/B" : intensity < 0.045 ? "C" : "D/E";
  const greenPremium = etsCost + Math.max(0, Number(values.distance || 0) - 4000) * 4.2;
  sustainabilityDeskResult.innerHTML = `
    ${metricCards([
      { label: "CO2", value: `${co2.toFixed(0)} t` },
      { label: "EU accountable", value: `${euCo2.toFixed(0)} t` },
      { label: "ETS cost", value: money(etsCost) },
      { label: "CII estimate", value: cii },
      { label: "Green premium", value: money(greenPremium) }
    ])}
    <small>Commercial estimate only. Final ETS/FuelEU allocation must follow the charter party and verified emissions data.</small>
  `;
}

function renderClientPortal() {
  if (!clientPortalForm || !clientPortalResult) return;
  const values = collectFormValues(clientPortalForm);
  const visibility = values.status === "Claim stage" || values.claimStatus !== "No claim" ? "Client should see claim watch" : "Standard voyage update";
  lastClientPortalReport = [
    "FOCUSEA CLIENT PORTAL REPORT",
    `Client: ${values.client}`,
    `Fixture: ${values.fixtureRef}`,
    `Status: ${values.status}`,
    `ETA: ${values.eta}`,
    `Voyage P&L: ${money(values.pnl)}`,
    `Claim status: ${values.claimStatus}`,
    `Portal note: ${visibility}`,
    "",
    "Visible sections:",
    "- Fixture recap",
    "- Voyage status and ETA",
    "- Claim / document status",
    "- Downloadable commercial summary"
  ].join("\n");
  clientPortalResult.innerHTML = `
    ${metricCards([
      { label: "Client", value: escapeHtml(values.client) },
      { label: "Fixture", value: escapeHtml(values.fixtureRef) },
      { label: "Status", value: escapeHtml(values.status) },
      { label: "ETA", value: escapeHtml(values.eta) },
      { label: "P&L", value: money(values.pnl) },
      { label: "Portal", value: visibility }
    ])}
    <small>Client report is ready for PDF/TXT download.</small>
  `;
}

function setCommercialDownloadNotice(type, filename) {
  const target = type.startsWith("claim") ? claimDisputeCenterResult
    : type.startsWith("certificate") ? certificateModeResult
      : clientPortalResult;
  if (!target) return;
  target.querySelector(".download-confirm")?.remove();
  target.insertAdjacentHTML("beforeend", `<small class="download-confirm">Downloaded: ${filename}</small>`);
}

function handleCommercialDownload(type) {
  if (type.startsWith("claim") && !lastCommercialClaimReport) renderClaimDisputeCenter();
  if (type.startsWith("certificate") && !lastCertificateReport) renderCertificateMode();
  if (type.startsWith("client") && !lastClientPortalReport) renderClientPortal();
  const actions = {
    "claim-report": () => downloadTextFile("focusea-claim-dispute-report.txt", lastCommercialClaimReport || "No claim report."),
    "certificate-pdf": () => downloadPdfFile("focusea-training-certificate.pdf", "Focusea Training Certificate", lastCertificateReport || "No certificate data."),
    "client-report-pdf": () => downloadPdfFile("focusea-client-portal-report.pdf", "Focusea Client Portal Report", lastClientPortalReport || "No client report."),
    "client-report-txt": () => downloadTextFile("focusea-client-portal-report.txt", lastClientPortalReport || "No client report.")
  };
  actions[type]?.();
  setCommercialDownloadNotice(type, `${type}`);
}

const osStages = ["Offer", "Counter", "On subjects", "Fixed", "SOF", "Laytime", "Claim"];
const osKanbanStages = ["New offer", "Counter sent", "On subjects", "Fixed", "Failed", "Claim stage"];

function osStageLabel(value = "") {
  const text = String(value).toLowerCase();
  if (text.includes("claim")) return "Claim stage";
  if (text.includes("fixed")) return "Fixed";
  if (text.includes("subject")) return "On subjects";
  if (text.includes("counter")) return "Counter sent";
  if (text.includes("fail")) return "Failed";
  return "New offer";
}

function osRiskWeight(value) {
  return { low: 8, medium: 24, high: 46, clean: 4, watch: 24, bad: 52 }[value] || 14;
}

function osMonthIndex(monthName = "jul") {
  const key = String(monthName).slice(0, 3).toLowerCase();
  return {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11
  }[key] ?? 0;
}

function osParseDate(day, month, time) {
  const rawTime = String(time || "0000").padStart(4, "0");
  const hour = Number(rawTime.slice(0, 2)) || 0;
  const minute = Number(rawTime.slice(2, 4)) || 0;
  return new Date(2026, osMonthIndex(month), Number(day) || 1, hour, minute);
}

function osFormatDate(date) {
  if (!date || Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

function osExtractSofEvents(text = "") {
  const source = String(text);
  const eventPatterns = [
    { key: "nor", label: "NOR tendered", pattern: /nor\s+tendered[^0-9]*(\d{1,2})\s+([a-z]{3,})\s+(\d{4})/i },
    { key: "berthed", label: "Berthed", pattern: /berth(?:ed)?[^0-9]*(\d{1,2})\s+([a-z]{3,})\s+(\d{4})/i },
    { key: "started", label: "Operation started", pattern: /(loading|discharging|operation)[^\n.]*started[^0-9]*(\d{1,2})\s+([a-z]{3,})\s+(\d{4})/i },
    { key: "completed", label: "Completed", pattern: /(?:completed|completion|loading completed|discharging completed)[^0-9]*(\d{1,2})\s+([a-z]{3,})\s+(\d{4})/i }
  ];
  const events = eventPatterns.map((event) => {
    const match = source.match(event.pattern);
    if (!match) return null;
    const offset = event.key === "started" ? 1 : 0;
    return {
      key: event.key,
      label: event.label,
      date: osParseDate(match[1 + offset], match[2 + offset], match[3 + offset])
    };
  }).filter(Boolean);
  const rainEvents = [];
  const rainPattern = /rain\s*(?:stop|stopped|delay|period)?[^0-9]*(\d{1,2})\s+([a-z]{3,})\s+(\d{4})\s*-\s*(\d{4})/gi;
  let rainMatch = rainPattern.exec(source);
  while (rainMatch) {
    const start = osParseDate(rainMatch[1], rainMatch[2], rainMatch[3]);
    const end = osParseDate(rainMatch[1], rainMatch[2], rainMatch[4]);
    rainEvents.push({ key: "rain", label: "Rain stoppage", start, end, hours: Math.max(0, (end - start) / 3600000) });
    rainMatch = rainPattern.exec(source);
  }
  return { events, rainEvents };
}

function osBuildPackReport() {
  return [
    "FOCUSEA BROKER OS PACK",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    lastBrokerOsDealRoom?.reportText || "Deal Room: not generated.",
    "",
    lastBrokerOsParsedOffer ? parsedOfferReport(lastBrokerOsParsedOffer.parsed) : "Parsed Offer: not generated.",
    "",
    lastBrokerOsSof?.reportText || "SOF Engine: not generated.",
    "",
    lastBrokerOsCounterparty?.reportText || "Counterparty: not generated.",
    "",
    lastBrokerOsCargo?.reportText || "Cargo Playbook: not generated.",
    "",
    lastBrokerOsRisk?.reportText || "Risk Radar: not generated.",
    "",
    lastBrokerOsClient?.reportText || "Client Portal: not generated."
  ].join("\n");
}

function osUpdateHero() {
  if (!brokerOsHeadline || !brokerOsSummary) return;
  const deal = lastBrokerOsDealRoom;
  const risk = lastBrokerOsRisk;
  const sof = lastBrokerOsSof;
  if (!deal) return;
  brokerOsHeadline.textContent = `${deal.values.fixtureRef} / ${deal.cargo.label} ${deal.values.route}`;
  brokerOsSummary.textContent = `${deal.values.stage} | ${risk ? risk.verdict : "Risk pending"} | ${sof ? sof.claimLabel : "SOF pending"} | ${deal.values.laycan}`;
}

function renderOsDealRoom() {
  if (!osDealRoomForm || !osDealRoomResult) return;
  const values = collectFormValues(osDealRoomForm);
  const cargo = getCargoProfile(values.cargoType);
  const stageIndex = Math.max(0, osStages.findIndex((stage) => stage.toLowerCase() === String(values.stage).toLowerCase()));
  const freight = Number(values.freight) || cargo.baseFreight;
  const quantity = Number(osCargoPlaybookForm?.elements.quantity?.value) || 50000;
  const gross = quantity * freight * cargo.freightMultiplier;
  const stageCards = ["Offer", "Counter", "Recap", "CP", "SOF", "Laytime", "Claim", "Invoice", "Mail", "Notes"];
  lastBrokerOsDealRoom = {
    values,
    cargo,
    gross,
    reportText: [
      "FOCUSEA DEAL ROOM 2.0",
      `Fixture: ${values.fixtureRef}`,
      `Stage: ${values.stage}`,
      `Cargo: ${cargo.label}`,
      `Route: ${values.route}`,
      `Laycan: ${values.laycan}`,
      `Freight: ${money(freight, 2)}/${cargo.unit}`,
      `Gross estimate: ${money(gross)}`,
      `Broker note: ${values.note}`
    ].join("\n")
  };
  osDealRoomResult.innerHTML = `
    ${metricCards([
      { label: "Fixture", value: escapeHtml(values.fixtureRef) },
      { label: "Stage", value: escapeHtml(values.stage) },
      { label: "Cargo", value: cargo.label },
      { label: "Gross est.", value: money(gross) },
      { label: "Laycan", value: escapeHtml(values.laycan) },
      { label: "Rate", value: `${money(freight, 2)}/${cargo.unit}` }
    ])}
    <div class="os-timeline">${osStages.map((stage, index) => `<span class="${index === stageIndex ? "active" : ""}">${stage}</span>`).join("")}</div>
    <div class="deal-file-grid">
      ${stageCards.map((name) => `<article class="${["SOF", "Laytime", "Claim"].includes(name) ? "review" : ""}"><span>${name}</span><strong>${name === values.stage ? "Active" : "Ready"}</strong><p>${name === "Claim" ? "Claim file follows SOF engine." : "Attached to fixture file."}</p></article>`).join("")}
    </div>
  `;
  osUpdateHero();
  renderOsExportCenter();
}

function renderOsParser() {
  if (!osParserForm || !osParserResult) return;
  const parsed = parseOfferText(new FormData(osParserForm).get("message") || "");
  const risk = scoreParsedOffer(parsed);
  lastBrokerOsParsedOffer = { parsed, risk };
  renderParsedOfferOutput(osParserResult, parsed, "Broker OS Parser");
  osParserResult.insertAdjacentHTML("beforeend", `
    <div class="broker-os-score">
      <div><span>Risk</span><strong>${risk.score}/100 ${escapeHtml(risk.label)}</strong></div>
      <div><span>Missing</span><strong>${parsed.missing.length || "None"}</strong></div>
      <div><span>Action</span><strong>${risk.score >= 65 ? "Clarify before fixing" : parsed.missing.length ? "Ask missing fields" : "Recap ready"}</strong></div>
    </div>
  `);
}

function pushOsParserToKanban() {
  if (!lastBrokerOsParsedOffer) renderOsParser();
  if (!lastBrokerOsParsedOffer) return;
  const { parsed, risk } = lastBrokerOsParsedOffer;
  terminalInboxItems.unshift({
    id: `OS-${2000 + terminalInboxItems.length}`,
    status: risk.score >= 65 ? "Subjects deadline" : parsed.missing.length ? "Counter needed" : "New offer",
    priority: risk.score >= 65 ? "High" : risk.score >= 42 ? "Medium" : "Low",
    cargo: parsed.cargoLabel,
    route: parsed.route || "Route TBC",
    laycan: parsed.laycan || "Laycan TBC",
    freight: parsed.freight ? `${money(parsed.freight, 2)}/${parsed.unit}` : "TBC",
    demurrage: parsed.demurrage ? `${money(parsed.demurrage)}/day` : "TBC",
    subject: parsed.subjects || "Subjects TBC",
    note: "Created by Broker OS parser."
  });
  renderOsKanban();
  renderBrokerInbox();
  osParserResult?.insertAdjacentHTML("beforeend", `<small class="download-confirm">Added to Broker OS Kanban as ${terminalInboxItems[0].id}</small>`);
}

function renderOsSofEngine() {
  if (!osSofEngineForm || !osSofEngineResult) return;
  const values = collectFormValues(osSofEngineForm);
  const { events, rainEvents } = osExtractSofEvents(values.sofText);
  const start = events.find((event) => event.key === "started")?.date || events.find((event) => event.key === "berthed")?.date || events.find((event) => event.key === "nor")?.date;
  const end = events.find((event) => event.key === "completed")?.date;
  const usedHours = start && end ? Math.max(0, (end - start) / 3600000) : 0;
  const rainHours = rainEvents.reduce((total, event) => total + event.hours, 0);
  const netHours = Math.max(0, usedHours - rainHours);
  const allowed = Number(values.allowedHours) || 0;
  const balance = netHours - allowed;
  const demurrageAmount = balance > 0 ? (balance / 24) * (Number(values.demurrageRate) || 0) : 0;
  const dispatchAmount = balance < 0 ? (Math.abs(balance) / 24) * (Number(values.dispatchRate) || 0) : 0;
  const claimLabel = demurrageAmount > 0 ? `Demurrage ${money(demurrageAmount)}` : dispatchAmount > 0 ? `Dispatch ${money(dispatchAmount)}` : "Laytime balanced";
  const eventLines = [
    ...events.map((event) => `${event.label}: ${osFormatDate(event.date)}`),
    ...rainEvents.map((event) => `${event.label}: ${osFormatDate(event.start)}-${osFormatDate(event.end)} (${event.hours.toFixed(1)}h)`)
  ];
  lastBrokerOsSof = {
    values,
    events,
    rainEvents,
    usedHours,
    rainHours,
    netHours,
    balance,
    demurrageAmount,
    dispatchAmount,
    claimLabel,
    reportText: [
      "FOCUSEA SOF TO LAYTIME TO CLAIM",
      ...eventLines,
      `Used hours: ${usedHours.toFixed(1)}`,
      `Deductions: ${rainHours.toFixed(1)}`,
      `Net used: ${netHours.toFixed(1)}`,
      `Allowed: ${allowed.toFixed(1)}`,
      `Balance: ${balance.toFixed(1)}h`,
      `Result: ${claimLabel}`,
      `Time bar: ${values.timeBarDays} days from completion unless CP says otherwise.`
    ].join("\n")
  };
  osSofEngineResult.innerHTML = `
    ${metricCards([
      { label: "Events found", value: events.length + rainEvents.length },
      { label: "Used", value: `${usedHours.toFixed(1)}h` },
      { label: "Rain deduct", value: `${rainHours.toFixed(1)}h` },
      { label: "Net", value: `${netHours.toFixed(1)}h` },
      { label: "Balance", value: `${balance.toFixed(1)}h` },
      { label: "Result", value: claimLabel }
    ])}
    <div class="event-list">${eventLines.map((line) => `<div><strong>SOF event</strong><span>${escapeHtml(line)}</span></div>`).join("") || "<small>No SOF events found.</small>"}</div>
    <small>Claim letter and laytime CSV are ready in the document center.</small>
  `;
  osUpdateHero();
  renderOsExportCenter();
}

function osKanbanSourceItems() {
  const deal = lastBrokerOsDealRoom;
  const dealItem = deal && {
    id: deal.values.fixtureRef,
    status: osStageLabel(deal.values.stage),
    priority: lastBrokerOsRisk?.score >= 70 ? "High" : "Medium",
    cargo: deal.cargo.label,
    route: deal.values.route,
    laycan: deal.values.laycan,
    freight: `${money(deal.values.freight, 2)}/${deal.cargo.unit}`,
    note: deal.values.note
  };
  return [dealItem, ...terminalInboxItems.map((item) => ({ ...item, status: osStageLabel(item.status) }))].filter(Boolean);
}

function renderOsKanban() {
  if (!osKanbanForm || !osKanbanResult) return;
  const values = collectFormValues(osKanbanForm);
  const items = osKanbanSourceItems().filter((item) => (
    (values.status === "All" || item.status === values.status)
    && (values.priority === "All" || item.priority === values.priority)
  ));
  osKanbanResult.innerHTML = `
    ${metricCards([
      { label: "Cards", value: items.length },
      { label: "High priority", value: items.filter((item) => item.priority === "High").length },
      { label: "On subjects", value: items.filter((item) => item.status === "On subjects").length },
      { label: "Claim stage", value: items.filter((item) => item.status === "Claim stage").length }
    ])}
    <div class="os-kanban">
      ${osKanbanStages.map((stage) => {
        const columnItems = items.filter((item) => item.status === stage);
        return `<div class="os-kanban-column"><strong>${stage}</strong>${columnItems.map((item) => `<div class="os-kanban-card"><b>${escapeHtml(item.id)} / ${escapeHtml(item.cargo)}</b><small>${escapeHtml(item.route)} | ${escapeHtml(item.laycan)} | ${escapeHtml(item.priority)}</small></div>`).join("") || "<small>No cards</small>"}</div>`;
      }).join("")}
    </div>
  `;
}

function renderOsCounterparty() {
  if (!osCounterpartyForm || !osCounterpartyResult) return;
  const values = collectFormValues(osCounterpartyForm);
  const score = clamp(86 - osRiskWeight(values.paymentRisk) - osRiskWeight(values.disputeHistory) + Math.min(Number(values.pastFixtures) || 0, 20), 0, 100);
  const verdict = score >= 72 ? "Preferred" : score >= 48 ? "Watch" : "High risk";
  lastBrokerOsCounterparty = {
    values,
    score,
    verdict,
    reportText: [
      "FOCUSEA COUNTERPARTY INTELLIGENCE",
      `Company: ${values.company}`,
      `Role: ${values.role}`,
      `Payment risk: ${values.paymentRisk}`,
      `Dispute history: ${values.disputeHistory}`,
      `Past fixtures: ${values.pastFixtures}`,
      `Trust score: ${score}/100`,
      `Verdict: ${verdict}`
    ].join("\n")
  };
  osCounterpartyResult.innerHTML = `
    ${metricCards([
      { label: "Company", value: escapeHtml(values.company) },
      { label: "Role", value: escapeHtml(values.role) },
      { label: "Trust", value: `${score}/100` },
      { label: "Verdict", value: verdict }
    ])}
    <ul class="compact-list"><li>Check payment route and beneficial ownership before subjects lifted.</li><li>Attach last communication note to Deal Room.</li><li>${score < 50 ? "Ask for stronger security before fixing." : "Relationship is workable with normal controls."}</li></ul>
  `;
}

function renderOsCargoPlaybook() {
  if (!osCargoPlaybookForm || !osCargoPlaybookResult) return;
  const values = collectFormValues(osCargoPlaybookForm);
  const cargo = getCargoProfile(values.cargoType);
  const data = cargoPlaybookData[values.cargoType] || cargoPlaybookData.grain;
  const rate = marketRate(cargo, liveFeedState.congestion > 55 ? "firm" : "neutral");
  lastBrokerOsCargo = {
    values,
    cargo,
    data,
    rate,
    reportText: [
      "FOCUSEA CARGO PLAYBOOK PRO",
      `Cargo: ${cargo.label}`,
      `Trade: ${values.trade}`,
      `Quantity: ${values.quantity}`,
      `Suitable vessel: ${cargo.vessel}`,
      `Indicative rate: ${money(rate, 2)}/${cargo.unit}`,
      `Docs: ${data.docs.join(", ")}`,
      `Risks: ${data.risks.join(", ")}`,
      `Handling: ${data.handling.join(", ")}`
    ].join("\n")
  };
  osCargoPlaybookResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: cargo.label },
      { label: "Vessel", value: cargo.vessel },
      { label: "Rate", value: `${money(rate, 2)}/${cargo.unit}` },
      { label: "Risk", value: `${cargo.risk}/100` }
    ])}
    <ul class="compact-list">
      <li><strong>Docs:</strong> ${data.docs.map(escapeHtml).join(", ")}</li>
      <li><strong>Risks:</strong> ${data.risks.map(escapeHtml).join(", ")}</li>
      <li><strong>Handling:</strong> ${data.handling.map(escapeHtml).join(", ")}</li>
    </ul>
  `;
}

function renderOsRiskRadar() {
  if (!osRiskRadarForm || !osRiskRadarResult) return;
  const values = collectFormValues(osRiskRadarForm);
  const tce = Number(values.tce) || 0;
  const score = clamp(
    100
      - (tce < 15000 ? 28 : tce < 22000 ? 14 : 4)
      - (Number(values.bunker) > 700 ? 18 : Number(values.bunker) > 640 ? 9 : 3)
      - (Number(values.laycanDays) <= 3 ? 18 : Number(values.laycanDays) <= 5 ? 8 : 2)
      - (Number(values.portDelay) * 4)
      - osRiskWeight(values.clauseRisk)
      - osRiskWeight(values.complianceRisk),
    0,
    100
  );
  const verdict = score >= 68 ? "FIX" : score >= 42 ? "WATCH" : "AVOID";
  const reasons = [
    tce < 22000 && "TCE is below target band.",
    Number(values.bunker) > 640 && "Bunker exposure is elevated.",
    Number(values.laycanDays) <= 5 && "Laycan is narrow.",
    Number(values.portDelay) >= 2 && "Port delay can eat margin.",
    values.clauseRisk !== "low" && "Clause risk needs counter wording.",
    values.complianceRisk !== "low" && "Compliance check required."
  ].filter(Boolean);
  lastBrokerOsRisk = {
    values,
    score,
    verdict,
    reasons,
    reportText: [
      "FOCUSEA FIXTURE RISK RADAR",
      `Score: ${score}/100`,
      `Verdict: ${verdict}`,
      ...reasons.map((item) => `- ${item}`)
    ].join("\n")
  };
  osRiskRadarResult.innerHTML = `
    ${metricCards([
      { label: "Verdict", value: `<em class="${verdict === "FIX" ? "positive" : verdict === "AVOID" ? "negative" : ""}">${verdict}</em>` },
      { label: "Score", value: `${score}/100` },
      { label: "TCE", value: `${money(tce)}/day` },
      { label: "Reasons", value: reasons.length }
    ])}
    <ul class="compact-list">${reasons.map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>Commercial risk is controlled.</li>"}</ul>
  `;
  osUpdateHero();
}

function renderOsExportCenter() {
  if (!osExportCenterResult) return;
  const ready = [
    ["Deal Room", Boolean(lastBrokerOsDealRoom)],
    ["Parsed Offer", Boolean(lastBrokerOsParsedOffer)],
    ["SOF / Claim", Boolean(lastBrokerOsSof)],
    ["Risk Radar", Boolean(lastBrokerOsRisk)],
    ["Client Portal", Boolean(lastBrokerOsClient)]
  ];
  osExportCenterResult.innerHTML = `
    ${metricCards([
      { label: "Ready docs", value: ready.filter(([, ok]) => ok).length },
      { label: "Pack", value: "PDF / JSON / CSV" },
      { label: "Download", value: "Real browser file" }
    ])}
    <div class="deal-file-grid">${ready.map(([name, ok]) => `<article class="${ok ? "" : "review"}"><span>${name}</span><strong>${ok ? "Ready" : "Pending"}</strong><p>${ok ? "Can be exported now." : "Run this module first."}</p></article>`).join("")}</div>
  `;
}

function renderOsAdminPanel() {
  if (!osAdminPanelForm || !osAdminPanelResult) return;
  const values = collectFormValues(osAdminPanelForm);
  const cargoType = osDealRoomForm?.elements.cargoType?.value || "coal";
  const cargo = getCargoProfile(cargoType);
  cargo.freightMultiplier = Number(values.cargoMultiplier) || cargo.freightMultiplier;
  liveFeedState.congestion = clamp(Number(values.portDelayIndex) || liveFeedState.congestion, 0, 100);
  liveFeedState.bunker = Math.max(0, Number(values.bunkerDefault) || liveFeedState.bunker);
  lastBrokerOsAdmin = {
    values,
    cargoType,
    reportText: [
      "FOCUSEA BROKER OS ADMIN UPDATE",
      `Cargo multiplier: ${cargo.freightMultiplier}`,
      `Port delay index: ${liveFeedState.congestion}`,
      `Bunker default: ${liveFeedState.bunker}`,
      `Data mode: ${values.dataMode}`
    ].join("\n")
  };
  safeLocalSet("focusea-broker-os-admin-v1", lastBrokerOsAdmin);
  osAdminPanelResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: cargo.label },
      { label: "Multiplier", value: cargo.freightMultiplier.toFixed(2) },
      { label: "Port delay", value: `${liveFeedState.congestion}%` },
      { label: "Bunker", value: `${bunkerPriceLabel(liveFeedState.bunker)}` },
      { label: "Mode", value: escapeHtml(values.dataMode) }
    ])}
    <small>Admin parameters applied to Broker OS, cargo playbook, risk radar and market widgets.</small>
  `;
  renderOsCargoPlaybook();
  renderOsExportCenter();
}

function renderOsClientPortal() {
  if (!osClientPortalForm || !osClientPortalResult) return;
  const values = collectFormValues(osClientPortalForm);
  const deal = lastBrokerOsDealRoom;
  const risk = lastBrokerOsRisk;
  const sof = lastBrokerOsSof;
  const portalNote = values.claimStatus !== "No claim" || values.status === "Claim stage" ? "Show claim watch to client" : "Standard voyage update";
  lastBrokerOsClient = {
    values,
    reportText: [
      "FOCUSEA CLIENT PORTAL",
      `Client: ${values.client}`,
      `Fixture: ${deal?.values.fixtureRef || "FX-2026-001"}`,
      `Status: ${values.status}`,
      `ETA: ${values.eta}`,
      `Cargo/route: ${deal ? `${deal.cargo.label} ${deal.values.route}` : "Run Deal Room"}`,
      `Risk: ${risk ? `${risk.verdict} ${risk.score}/100` : "Run Risk Radar"}`,
      `Claim: ${sof ? sof.claimLabel : values.claimStatus}`,
      `Portal note: ${portalNote}`
    ].join("\n")
  };
  osClientPortalResult.innerHTML = `
    ${metricCards([
      { label: "Client", value: escapeHtml(values.client) },
      { label: "Status", value: escapeHtml(values.status) },
      { label: "ETA", value: escapeHtml(values.eta) },
      { label: "Risk", value: risk ? `${risk.verdict} ${risk.score}/100` : "Pending" },
      { label: "Claim", value: sof ? sof.claimLabel : escapeHtml(values.claimStatus) }
    ])}
    <small>${portalNote}. Client PDF/TXT is ready.</small>
  `;
  renderOsExportCenter();
}

function osLaytimeCsvRows() {
  if (!lastBrokerOsSof) renderOsSofEngine();
  const sof = lastBrokerOsSof;
  return [
    ["event", "start", "end", "hours"],
    ...(sof?.events || []).map((event) => [event.label, osFormatDate(event.date), "", ""]),
    ...(sof?.rainEvents || []).map((event) => [event.label, osFormatDate(event.start), osFormatDate(event.end), event.hours.toFixed(2)]),
    ["net_used_hours", "", "", sof?.netHours?.toFixed(2) || "0"],
    ["balance_hours", "", "", sof?.balance?.toFixed(2) || "0"]
  ];
}

function setBrokerOsDownloadNotice(filename) {
  if (!osExportCenterResult) return;
  osExportCenterResult.querySelector(".download-confirm")?.remove();
  osExportCenterResult.insertAdjacentHTML("beforeend", `<small class="download-confirm">Downloaded: ${escapeHtml(filename)}</small>`);
}

function handleBrokerOsDownload(type) {
  if (!lastBrokerOsDealRoom) renderOsDealRoom();
  if (!lastBrokerOsParsedOffer) renderOsParser();
  if (!lastBrokerOsSof) renderOsSofEngine();
  if (!lastBrokerOsRisk) renderOsRiskRadar();
  if (!lastBrokerOsClient) renderOsClientPortal();
  const packText = osBuildPackReport();
  const actions = {
    "deal-room-pdf": () => downloadPdfFile("focusea-broker-os-deal-room.pdf", "Focusea Broker OS Deal Room", lastBrokerOsDealRoom?.reportText || packText),
    "deal-room-json": () => downloadJsonFile("focusea-broker-os-deal-room.json", lastBrokerOsDealRoom || {}),
    "parsed-offer-json": () => downloadJsonFile("focusea-broker-os-parsed-offer.json", lastBrokerOsParsedOffer || {}),
    "sof-claim-pdf": () => downloadPdfFile("focusea-broker-os-sof-claim.pdf", "Focusea SOF Laytime Claim", lastBrokerOsSof?.reportText || packText),
    "laytime-csv": () => downloadCsvFile("focusea-broker-os-laytime.csv", osLaytimeCsvRows()),
    "fixture-recap-pdf": () => downloadPdfFile("focusea-fixture-recap.pdf", "Focusea Fixture Recap", lastBrokerOsDealRoom?.reportText || packText),
    "voyage-estimate-pdf": () => downloadPdfFile("focusea-voyage-estimate.pdf", "Focusea Voyage Estimate", `${lastBrokerOsDealRoom?.reportText || ""}\n\n${lastBrokerOsRisk?.reportText || ""}`),
    "laytime-statement-pdf": () => downloadPdfFile("focusea-laytime-statement.pdf", "Focusea Laytime Statement", lastBrokerOsSof?.reportText || packText),
    "demurrage-claim-pdf": () => downloadPdfFile("focusea-demurrage-claim.pdf", "Focusea Demurrage Claim", lastBrokerOsSof?.reportText || packText),
    "invoice-pdf": () => downloadPdfFile("focusea-commercial-invoice.pdf", "Focusea Commercial Invoice", `${lastBrokerOsDealRoom?.reportText || ""}\n\nClaim: ${lastBrokerOsSof?.claimLabel || "N/A"}`),
    "client-portal-pdf": () => downloadPdfFile("focusea-client-portal.pdf", "Focusea Client Portal", lastBrokerOsClient?.reportText || packText),
    "client-portal-txt": () => downloadTextFile("focusea-client-portal.txt", lastBrokerOsClient?.reportText || packText),
    "full-pack-json": () => downloadJsonFile("focusea-broker-os-full-pack.json", {
      dealRoom: lastBrokerOsDealRoom,
      parsedOffer: lastBrokerOsParsedOffer,
      sof: lastBrokerOsSof,
      counterparty: lastBrokerOsCounterparty,
      cargo: lastBrokerOsCargo,
      risk: lastBrokerOsRisk,
      admin: lastBrokerOsAdmin,
      client: lastBrokerOsClient
    })
  };
  actions[type]?.();
  setBrokerOsDownloadNotice(window.focuseaLastDownload?.filename || type);
}

function runAllBrokerOs() {
  renderOsDealRoom();
  renderOsParser();
  renderOsSofEngine();
  renderOsKanban();
  renderOsCounterparty();
  renderOsCargoPlaybook();
  renderOsRiskRadar();
  renderOsAdminPanel();
  renderOsClientPortal();
  renderOsExportCenter();
}

function bindBrokerOsDownloadButtons() {
  const buttons = document.querySelectorAll("[data-download-os]");
  document.body.dataset.osDownloadBound = String(buttons.length);
  buttons.forEach((button) => {
    button.dataset.osBound = "true";
    button.onclick = (event) => {
      event.preventDefault();
      handleBrokerOsDownload(button.dataset.downloadOs);
    };
    button.addEventListener("click", (event) => {
      if (event.defaultPrevented) return;
      event.preventDefault();
      handleBrokerOsDownload(button.dataset.downloadOs);
    });
  });
}

window.focuseaBrokerOs = {
  run: runAllBrokerOs,
  download: handleBrokerOsDownload
};

const autopilotStageFlow = ["Offer", "Counter", "Subjects", "Fixed", "SOF", "Laytime", "Invoice", "Claim"];

function autopilotDealRef(parsed) {
  const cargo = (parsed.cargoType || "deal").replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 6) || "DEAL";
  const suffix = String(1000 + terminalInboxItems.length + (safeLocalGet("focusea-autopilot-deal-rooms-v1", []) || []).length);
  return `AP-${cargo}-${suffix}`;
}

function classifyAutopilotInbox(values = {}) {
  const text = String(values.message || "");
  const parsed = parseOfferText(text);
  const offerRisk = scoreParsedOffer(parsed);
  const clause = analyzeClauseText(text);
  const claim = parseClaimFacts(text);
  const categories = [];
  if (/counter|bid|improve|last|quickly|can you do/i.test(text)) categories.push("Counter needed");
  if (/subject|subs|deadline|approval|stem|receiver/i.test(text)) categories.push("Subjects deadline");
  if (/claim|demurrage|invoice|time bar|deduction|sof|nor/i.test(text) || claim.amount > 0) categories.push("Claim risk");
  if (/market|index|bunker|bdi|bdti|bcti|scfi|congestion|weather alert/i.test(text)) categories.push("Market alert");
  if (!categories.length) categories.push("New offer");
  const status = categories.includes("Claim risk") ? "Claim risk"
    : categories.includes("Subjects deadline") ? "Subjects deadline"
      : categories.includes("Counter needed") ? "Counter needed"
        : categories.includes("Market alert") ? "Market alert"
          : "New offer";
  const priorityScore = offerRisk.score + (clause.dangerousSentences.length * 8) + (claim.amount > 0 ? 18 : 0) + (Number(values.deadlineHours) <= 24 ? 10 : 0);
  const priority = priorityScore >= 72 ? "High" : priorityScore >= 48 ? "Medium" : "Low";
  const dealRef = autopilotDealRef(parsed);
  const room = {
    dealRef,
    createdAt: new Date().toISOString(),
    owner: values.owner || "Owner TBC",
    charterer: values.charterer || "Charterer TBC",
    status,
    categories,
    priority,
    parsed,
    offerRisk,
    clause,
    claim,
    deadlineHours: Number(values.deadlineHours) || 0,
    nextActions: [
      status === "Counter needed" ? "Prepare counter freight and clarify demurrage/NOR wording." : "Create recap draft and confirm missing commercial fields.",
      status === "Subjects deadline" ? `Chase subjects before ${values.deadlineHours || 0}h deadline.` : "Set follow-up alarm.",
      clause.dangerousSentences.length ? "Send clause counter wording before clean fixture." : "Keep CP wording under review.",
      claim.amount > 0 ? "Open demurrage evidence checklist from SOF/NOR." : "No claim amount detected yet."
    ]
  };
  room.reportText = [
    "FOCUSEA BROKER INBOX AUTOPILOT",
    `Deal ref: ${dealRef}`,
    `Status: ${status}`,
    `Priority: ${priority}`,
    `Owner / Charterer: ${room.owner} / ${room.charterer}`,
    "",
    parsedOfferReport(parsed),
    "",
    "Categories:",
    ...categories.map((item) => `- ${item}`),
    "",
    "Next actions:",
    ...room.nextActions.map((item) => `- ${item}`)
  ].join("\n");
  return room;
}

function renderAutopilotHeader() {
  if (!autopilotHeadline || !autopilotSummary) return;
  const inbox = lastAutopilotInbox;
  const voyage = lastAutopilotVoyage;
  const doc = lastAutopilotDocumentPack;
  autopilotHeadline.textContent = inbox
    ? `${inbox.dealRef} | ${inbox.status} | ${inbox.priority} priority`
    : "Paste a fixture message and Focusea builds the desk.";
  autopilotSummary.textContent = [
    inbox ? `${inbox.parsed.cargoLabel} ${inbox.parsed.route || "route TBC"}` : "Inbox waiting",
    voyage ? `Best speed ${voyage.best.speed} kn / ${money(voyage.best.pnl)} P&L` : "optimizer pending",
    doc ? `${doc.findings.length} document findings` : "document pack pending"
  ].join(" | ");
}

function renderAutopilotInbox() {
  if (!autopilotInboxForm || !autopilotInboxResult) return;
  lastAutopilotInbox = classifyAutopilotInbox(collectFormValues(autopilotInboxForm));
  const item = lastAutopilotInbox;
  const riskClass = item.priority === "High" ? "risk-high" : item.priority === "Medium" ? "risk-medium" : "risk-low";
  autopilotInboxResult.innerHTML = `
    ${metricCards([
      { label: "Deal ref", value: item.dealRef },
      { label: "Folder", value: item.status },
      { label: "Priority", value: `<span class="${riskClass}">${item.priority}</span>` },
      { label: "Cargo", value: item.parsed.cargoLabel },
      { label: "Route", value: item.parsed.route || "TBC" },
      { label: "Risk", value: `${item.offerRisk.score}/100 ${item.offerRisk.label}` }
    ])}
    <div class="auto-deal-market">
      ${item.categories.map((category) => `<article><span>${escapeHtml(category)}</span><strong>${escapeHtml(item.dealRef)}</strong><em class="source-badge input">User input</em></article>`).join("")}
      <article><span>Deal room</span><strong>Auto-created preview</strong><em class="source-badge simulated">Local workflow</em></article>
      <article><span>Clause watch</span><strong>${escapeHtml(item.clause.riskOwner)}</strong><em class="source-badge input">Pasted text</em></article>
    </div>
    <div class="deal-file-grid">
      <article class="action"><span>Offer</span><strong>${escapeHtml(item.parsed.freight ? `${money(item.parsed.freight, 2)}/${item.parsed.unit}` : "TBC")}</strong><p>${escapeHtml(item.parsed.laycan || "Laycan TBC")}</p></article>
      <article class="review"><span>Counter</span><strong>${item.status === "Counter needed" ? "Needed" : "Watch"}</strong><p>Freight, demurrage and NOR wording to be tightened.</p></article>
      <article class="review"><span>Claim</span><strong>${item.claim.amount > 0 ? money(item.claim.amount) : "No amount"}</strong><p>SOF/NOR evidence checklist ready if needed.</p></article>
    </div>
    <ul class="compact-list">${item.nextActions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}</ul>
  `;
  renderAutopilotHeader();
}

function pushAutopilotInboxToDesk() {
  if (!lastAutopilotInbox) renderAutopilotInbox();
  if (!lastAutopilotInbox) return;
  const item = lastAutopilotInbox;
  terminalInboxItems.unshift({
    id: item.dealRef,
    status: item.status,
    priority: item.priority,
    cargo: item.parsed.cargoLabel,
    route: item.parsed.route || "TBC",
    laycan: item.parsed.laycan || "TBC",
    freight: item.parsed.freight ? `${money(item.parsed.freight, 2)}/${item.parsed.unit}` : "TBC",
    demurrage: item.parsed.demurrage ? `${money(item.parsed.demurrage)}/day` : "TBC",
    subject: item.parsed.subjects || item.status,
    note: item.nextActions.join(" ")
  });
  const rooms = safeLocalGet("focusea-autopilot-deal-rooms-v1", []) || [];
  safeLocalSet("focusea-autopilot-deal-rooms-v1", [item, ...rooms.filter((room) => room.dealRef !== item.dealRef)].slice(0, 25));
  renderBrokerInbox();
  renderOsKanban();
  autopilotInboxResult?.insertAdjacentHTML("beforeend", `<small class="download-confirm">Added to Broker Inbox and Deal Room memory as ${escapeHtml(item.dealRef)}.</small>`);
}

function renderAutopilotDealRoom() {
  if (!autopilotDealRoomForm || !autopilotDealRoomResult) return;
  const values = collectFormValues(autopilotDealRoomForm);
  const stage = String(values.stage || "Offer");
  const activeIndex = Math.max(0, autopilotStageFlow.indexOf(stage));
  const claimRisk = Number(values.claimExposure) > 25000 ? "High claim exposure" : Number(values.claimExposure) > 0 ? "Claim watch" : "No claim exposure";
  const deadlineLabel = Number(values.deadlineHours) <= 12 ? "Critical deadline" : Number(values.deadlineHours) <= 24 ? "Close deadline" : "Normal follow-up";
  const files = ["Offer", "Counter", "Recap", "CP", "SOF", "Laytime", "Invoice", "Claim", "Mail History"].map((name, index) => ({
    name,
    state: index <= activeIndex ? "Ready" : "Pending",
    review: ["CP", "SOF", "Claim"].includes(name) || index === activeIndex
  }));
  lastAutopilotDealRoom = {
    values,
    activeIndex,
    claimRisk,
    deadlineLabel,
    files,
    reportText: [
      "FOCUSEA DEAL ROOM TIMELINE 2.0",
      `Fixture: ${values.fixtureRef}`,
      `Stage: ${stage}`,
      `Subject deadline: ${values.deadlineHours}h / ${deadlineLabel}`,
      `Claim exposure: ${money(values.claimExposure)} / ${claimRisk}`,
      "",
      values.note || "",
      "",
      "Files:",
      ...files.map((file) => `- ${file.name}: ${file.state}`)
    ].join("\n")
  };
  autopilotDealRoomResult.innerHTML = `
    <div class="os-timeline">
      ${autopilotStageFlow.map((step, index) => `<span class="${index <= activeIndex ? "active" : ""}">${escapeHtml(step)}</span>`).join("")}
    </div>
    ${metricCards([
      { label: "Fixture", value: values.fixtureRef },
      { label: "Stage", value: stage },
      { label: "Deadline", value: deadlineLabel },
      { label: "Claim exposure", value: money(values.claimExposure) }
    ])}
    <div class="deal-file-grid">
      ${files.map((file) => `<article class="${file.review ? "review" : ""}"><span>${escapeHtml(file.name)}</span><strong>${escapeHtml(file.state)}</strong><p>${file.review ? "Broker review required before clean status." : "Stored in fixture file."}</p></article>`).join("")}
    </div>
  `;
  renderAutopilotHeader();
}

function extractAutopilotRates(text = "", label = "demurrage") {
  const pattern = new RegExp(`(?:${label}|dem|dmg)[^0-9$]*(?:usd|us\\$|\\$)?\\s*([0-9][0-9,]*(?:\\.\\d+)?)`, "ig");
  return [...String(text).matchAll(pattern)].map((match) => parseMoneyNumber(match[1])).filter(Boolean);
}

function renderAutopilotDocumentPack() {
  if (!autopilotDocumentPackForm || !autopilotDocumentPackResult) return;
  const values = collectFormValues(autopilotDocumentPackForm);
  const text = String(values.documentPack || "");
  const parsed = parseOfferText(text);
  const clause = analyzeClauseText(text);
  const statement = parseSofStatement(text, 72, parsed.demurrage || 18000);
  const rates = extractAutopilotRates(text, "demurrage");
  const norLines = sofLines(text).filter((line) => /nor|notice of readiness/i.test(line));
  const norTimes = norLines.map(parseSofDateTime).filter(Boolean).map((date) => date.getTime());
  const uniqueRates = [...new Set(rates.map((rate) => Math.round(rate)))];
  const uniqueNor = [...new Set(norTimes)];
  const findings = [
    uniqueRates.length > 1 && { level: "High", text: `Demurrage mismatch detected: ${uniqueRates.map((rate) => money(rate)).join(" vs ")}.` },
    uniqueNor.length > 1 && { level: "High", text: "NOR time mismatch between recap/SOF lines." },
    /weather delays excepted/i.test(text) && /unless used/i.test(text) && { level: "Medium", text: "Weather exception and 'unless used' wording should be reconciled." },
    statement.status === "Demurrage" && { level: "Medium", text: `SOF engine estimates demurrage: ${money(statement.demurrageAmount)}.` },
    parsed.missing.length && { level: "Medium", text: `Missing commercial fields: ${parsed.missing.join(", ")}.` },
    clause.dangerousSentences.length && { level: "Medium", text: `${clause.dangerousSentences.length} clause sentence(s) need broker review.` }
  ].filter(Boolean);
  if (!findings.length) findings.push({ level: "Low", text: "No major contradiction detected from pasted text." });
  lastAutopilotDocumentPack = {
    parsed,
    clause,
    statement,
    findings,
    reportText: [
      "FOCUSEA MULTI-DOCUMENT AI PACK",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "Findings:",
      ...findings.map((item) => `- [${item.level}] ${item.text}`),
      "",
      `Used laytime: ${statement.usedHours.toFixed(1)}h`,
      `Balance: ${statement.balanceHours.toFixed(1)}h`,
      `Clause risk owner: ${clause.riskOwner}`
    ].join("\n")
  };
  autopilotDocumentPackResult.innerHTML = `
    ${metricCards([
      { label: "Findings", value: findings.length },
      { label: "Dem rates", value: uniqueRates.length ? uniqueRates.map((rate) => money(rate)).join(" / ") : "Not found" },
      { label: "NOR lines", value: norLines.length },
      { label: "SOF result", value: statement.status },
      { label: "Laytime balance", value: `${statement.balanceHours.toFixed(1)}h` },
      { label: "Clause owner", value: clause.riskOwner }
    ])}
    <div class="danger-box">
      ${findings.map((item) => `<p><span>${escapeHtml(item.level)}</span>${escapeHtml(item.text)}</p>`).join("")}
    </div>
  `;
  renderAutopilotHeader();
}

function renderAutopilotVoyageOptimizer() {
  if (!autopilotVoyageOptimizerForm || !autopilotVoyageOptimizerResult) return;
  const values = collectFormValues(autopilotVoyageOptimizerForm);
  const cargo = getCargoProfile(values.cargoType);
  const canal = {
    none: { factor: 1, cost: 0, note: "Base route" },
    suez: { factor: 0.88, cost: 240000, note: "Faster, canal cost added" },
    panama: { factor: 0.9, cost: 220000, note: "Faster, canal cost added" },
    cape: { factor: 1.18, cost: 0, note: "Longer, no canal dues" }
  }[values.canalRoute] || { factor: 1, cost: 0, note: "Base route" };
  const speeds = [11, 12, 13, 14];
  const rows = speeds.map((speed) => {
    const speedFactor = Math.pow(speed / 13, 2.7);
    const estimate = calculateVoyageEstimate({
      cargoType: values.cargoType,
      distance: Number(values.distance) * canal.factor,
      speed,
      cargoQty: values.cargoQty,
      freightRate: values.freightRate,
      seaCons: (values.cargoType === "container" ? 42 : ["crudeOil", "lng", "chemicals"].includes(values.cargoType) ? 36 : 28) * speedFactor,
      portCons: values.cargoType === "lng" ? 9 : values.cargoType === "container" ? 7 : 4,
      portDays: 4.5 + Number(values.portDelay || 0),
      bunkerPrice: values.bunkerPrice,
      portCosts: autoDealPortCost(values.cargoType),
      canalCosts: canal.cost,
      dailyHire: values.dailyHire,
      commission: 2.5
    });
    const laycanRisk = speed <= 11 && Number(values.portDelay) > 1.5 ? "High" : speed <= 12 ? "Medium" : "Low";
    return { speed, estimate, laycanRisk };
  });
  const best = rows.reduce((winner, row) => row.estimate.netPnl > winner.estimate.netPnl ? row : winner, rows[0]);
  const fastest = rows[rows.length - 1];
  const recommendation = best.speed < fastest.speed
    ? `${best.speed} knot en karlisi; bunker tasarrufu var ama laycan riski ${best.laycanRisk.toLowerCase()}.`
    : `${best.speed} knot hiz ticari olarak mantikli; ETA buffer kaybi dusuk.`;
  lastAutopilotVoyage = {
    cargo,
    rows: rows.map((row) => ({ speed: row.speed, pnl: row.estimate.netPnl, tce: row.estimate.tce, days: row.estimate.totalDays, laycanRisk: row.laycanRisk })),
    best: { speed: best.speed, pnl: best.estimate.netPnl, tce: best.estimate.tce, days: best.estimate.totalDays },
    recommendation,
    reportText: [
      "FOCUSEA VOYAGE OPTIMIZER PRO",
      `Cargo: ${cargo.label}`,
      `Canal route: ${values.canalRoute} / ${canal.note}`,
      `Best speed: ${best.speed} kn`,
      `Best TCE: ${money(best.estimate.tce)}/day`,
      `Best P&L: ${money(best.estimate.netPnl)}`,
      `Recommendation: ${recommendation}`
    ].join("\n")
  };
  autopilotVoyageOptimizerResult.innerHTML = `
    ${metricCards([
      { label: "Cargo", value: cargo.label },
      { label: "Best speed", value: `${best.speed} kn` },
      { label: "Best TCE", value: `${money(best.estimate.tce)}/day` },
      { label: "Best P&L", value: money(best.estimate.netPnl) },
      { label: "Route mode", value: canal.note }
    ])}
    <table class="mini-table">
      <thead><tr><th>Speed</th><th>Total days</th><th>TCE</th><th>P&L</th><th>Laycan</th></tr></thead>
      <tbody>${rows.map((row) => `<tr><td>${row.speed} kn</td><td>${row.estimate.totalDays.toFixed(1)}</td><td>${money(row.estimate.tce)}</td><td>${money(row.estimate.netPnl)}</td><td>${row.laycanRisk}</td></tr>`).join("")}</tbody>
    </table>
    <small>${escapeHtml(recommendation)}</small>
  `;
  renderAutopilotHeader();
}

function renderAutopilotCarbon() {
  if (!autopilotCarbonForm || !autopilotCarbonResult) return;
  const values = collectFormValues(autopilotCarbonForm);
  const phase = Number(values.year) >= 2027 ? 1 : Number(values.year) === 2026 ? 0.7 : 0.4;
  const inScope = Number(values.gt) >= 5000;
  const co2 = Number(values.fuelTons || 0) * 3.114;
  const euScope = co2 * (Number(values.euShare || 0) / 100);
  const surrenderTons = inScope ? euScope * phase : 0;
  const cost = surrenderTons * Number(values.euaPrice || 0);
  lastAutopilotCarbon = {
    values,
    inScope,
    co2,
    euScope,
    surrenderTons,
    cost,
    reportText: [
      "FOCUSEA EU ETS / CARBON DESK",
      `GT: ${values.gt} / ${inScope ? "in large ship scope" : "below 5,000 GT model scope"}`,
      `CO2: ${co2.toFixed(0)} t`,
      `EU scope: ${euScope.toFixed(0)} t`,
      `Surrender phase ${values.year}: ${(phase * 100).toFixed(0)}%`,
      `Estimated ETS cost: EUR ${cost.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
    ].join("\n")
  };
  autopilotCarbonResult.innerHTML = `
    ${metricCards([
      { label: "Scope", value: inScope ? "5,000 GT+ covered" : "Below 5,000 GT" },
      { label: "CO2", value: `${co2.toFixed(0)} t` },
      { label: "EU scope", value: `${euScope.toFixed(0)} t` },
      { label: "Surrender", value: `${(phase * 100).toFixed(0)}%` },
      { label: "ETS cost", value: `EUR ${cost.toLocaleString("en-US", { maximumFractionDigits: 0 })}` }
    ])}
    <div class="confidence-row"><span>European Commission maritime ETS</span><em class="source-badge verified">Verified source</em><a href="https://climate.ec.europa.eu/eu-action/transport-decarbonisation/reducing-emissions-shipping-sector_en" target="_blank" rel="noopener noreferrer">Source</a></div>
    <small>Commercial estimate only: CO2 factor 3.114 tCO2/mt fuel, EUA price user input.</small>
  `;
}

function renderAutopilotWeather() {
  if (!autopilotWeatherForm || !autopilotWeatherResult) return;
  const values = collectFormValues(autopilotWeatherForm);
  const delay = Number(values.delayHours) || 0;
  const clauseWeight = values.weatherClause === "No clear exception" ? 28 : values.weatherClause === "Unless used" ? 18 : 8;
  const laytimeWeight = values.laytimeStatus === "On demurrage" ? 30 : values.laytimeStatus === "After NOR" ? 18 : 6;
  const risk = clamp(Math.round(delay * 1.4 + clauseWeight + laytimeWeight + liveFeedState.weather * 2), 0, 100);
  const exposure = values.laytimeStatus === "Before NOR" ? 0 : (delay / 24) * 18000;
  const endpoint = `https://api.weather.gov/alerts/active?area=${values.area}`;
  const action = risk >= 70 ? "Preserve weather evidence and reserve rights" : risk >= 45 ? "Add ETA/laytime buffer and ask agent for logs" : "Monitor forecast";
  lastAutopilotWeather = {
    values,
    risk,
    exposure,
    endpoint,
    action,
    reportText: [
      "FOCUSEA WEATHER DELAY & ALERT ENGINE",
      `Route: ${values.route}`,
      `NWS endpoint: ${endpoint}`,
      `Risk: ${risk}/100`,
      `Estimated laytime exposure: ${money(exposure)}`,
      `Action: ${action}`
    ].join("\n")
  };
  autopilotWeatherResult.innerHTML = `
    ${metricCards([
      { label: "Weather risk", value: `${risk}/100` },
      { label: "Delay", value: `${delay}h` },
      { label: "Laytime exposure", value: money(exposure) },
      { label: "Action", value: action }
    ])}
    <div class="confidence-row"><span>NWS active alerts endpoint</span><em class="source-badge api-ready">API-ready</em><a href="${endpoint}" target="_blank" rel="noopener noreferrer">Endpoint</a></div>
    <div class="confidence-row"><span>NWS API documentation</span><em class="source-badge verified">Verified docs</em><a href="https://www.weather.gov/documentation/services-web-api" target="_blank" rel="noopener noreferrer">Docs</a></div>
  `;
}

function renderAutopilotPortAgency() {
  if (!autopilotPortAgencyForm || !autopilotPortAgencyResult) return;
  const values = collectFormValues(autopilotPortAgencyForm);
  const port = ports[values.portId] || ports.singapore;
  const depth = parseFloat(port.depth) || 14;
  const margin = depth - Number(values.draft || 0);
  const risk = clamp(
    (margin < 0 ? 55 : margin < 1 ? 35 : margin < 2 ? 18 : 6)
    + (Number(values.loa) > 300 ? 14 : 4)
    + (Number(values.beam) > 45 ? 12 : 3)
    + (values.cargoRisk.includes("IMDG") || values.cargoRisk.includes("Chemicals") ? 16 : 4)
    + (values.docsRisk === "Docs missing" ? 28 : values.docsRisk.includes("Holiday") ? 14 : 2),
    0,
    100
  );
  const verdict = risk >= 70 ? "Do not nominate without agency clearance" : risk >= 45 ? "Conditional / agent confirmation needed" : "Operationally workable";
  lastAutopilotPortAgency = {
    values,
    port,
    margin,
    risk,
    verdict,
    reportText: [
      "FOCUSEA PORT RESTRICTION + AGENCY NOTES",
      `Port: ${port.name}`,
      `Draft margin: ${margin.toFixed(1)} m`,
      `Risk: ${risk}/100`,
      `Verdict: ${verdict}`,
      `Agency note: ${values.agencyNote}`
    ].join("\n")
  };
  autopilotPortAgencyResult.innerHTML = `
    ${metricCards([
      { label: "Port", value: port.name },
      { label: "Published depth", value: port.depth },
      { label: "Draft margin", value: `${margin.toFixed(1)} m` },
      { label: "Risk", value: `${risk}/100` },
      { label: "Verdict", value: verdict }
    ])}
    <ul class="compact-list">
      <li>Pilotage: ${escapeHtml(port.pilotage)} / tug: ${escapeHtml(port.services.includes("Towage") ? "available" : "check local agent")}.</li>
      <li>Required docs: ${port.documents.map(escapeHtml).join(", ")}.</li>
      <li>Agency note: ${escapeHtml(values.agencyNote)}</li>
    </ul>
  `;
}

function renderAutopilotCounterparty() {
  if (!autopilotCounterpartyForm || !autopilotCounterpartyResult) return;
  const values = collectFormValues(autopilotCounterpartyForm);
  const paymentPenalty = { none: 0, minor: 12, major: 32 }[values.paymentDelay] || 0;
  const disputePenalty = { clean: 0, watch: 16, bad: 36 }[values.disputeHistory] || 0;
  const trust = clamp(84 + Math.min(Number(values.pastFixtures) || 0, 20) * 0.8 - paymentPenalty - disputePenalty, 0, 100);
  const action = trust >= 75 ? "Can proceed with standard controls" : trust >= 52 ? "Enhanced payment / claim controls" : "Require management approval";
  const record = {
    company: values.company,
    role: values.role,
    paymentDelay: values.paymentDelay,
    disputeHistory: values.disputeHistory,
    pastFixtures: values.pastFixtures,
    trust,
    action,
    updatedAt: new Date().toISOString()
  };
  const memory = safeLocalGet("focusea-counterparty-risk-memory-v1", []) || [];
  safeLocalSet("focusea-counterparty-risk-memory-v1", [record, ...memory.filter((item) => item.company !== record.company)].slice(0, 30));
  lastAutopilotCounterparty = {
    record,
    reportText: [
      "FOCUSEA COUNTERPARTY RISK MEMORY",
      `Company: ${record.company}`,
      `Role: ${record.role}`,
      `Trust score: ${trust}/100`,
      `Action: ${action}`
    ].join("\n")
  };
  autopilotCounterpartyResult.innerHTML = `
    ${metricCards([
      { label: "Company", value: values.company },
      { label: "Trust score", value: `${trust}/100` },
      { label: "Payment", value: values.paymentDelay },
      { label: "Dispute", value: values.disputeHistory },
      { label: "Action", value: action }
    ])}
    <small>Saved to local counterparty risk memory. Data source: user input / local workspace.</small>
  `;
}

function renderAutopilotClauseBattle() {
  if (!autopilotClauseBattleForm || !autopilotClauseBattleResult) return;
  const values = collectFormValues(autopilotClauseBattleForm);
  const sample = {
    "NOR / waiting time": "NOR valid whether in berth or not and time lost waiting for berth shall count as laytime.",
    "Weather exception": "Weather delays excepted unless used.",
    "Demurrage time bar": "Demurrage claim with all supporting documents to be submitted within 90 days.",
    Sanctions: "Either party may terminate if performance would expose it to sanctions.",
    "Safe berth": "Charterers to nominate one safe berth always afloat and accessible."
  }[values.topic] || "Clause to be mutually agreed.";
  const analysis = analyzeClauseText(sample);
  const ownerWording = "Owners counter: waiting time to count once vessel is ready in all respects and berth unavailable, with documented exceptions only.";
  const chartererWording = "Charterers counter: laytime to count only after valid NOR and berth/terminal readiness; weather, authority and congestion delays excluded unless expressly used.";
  const balanced = "Balanced broker wording: define valid NOR, berth readiness, exceptions, evidence log and time-bar documents clearly in recap.";
  const suggestion = values.side === "Owner" ? ownerWording : values.side === "Charterer" ? chartererWording : balanced;
  lastAutopilotClause = {
    values,
    sample,
    analysis,
    suggestion,
    reportText: [
      "FOCUSEA CLAUSE BATTLE LIBRARY",
      `Template: ${values.template}`,
      `Topic: ${values.topic}`,
      `Acting for: ${values.side}`,
      `Risk owner: ${analysis.riskOwner}`,
      "",
      "Suggested wording:",
      suggestion
    ].join("\n")
  };
  autopilotClauseBattleResult.innerHTML = `
    ${metricCards([
      { label: "Template", value: values.template },
      { label: "Topic", value: values.topic },
      { label: "Risk owner", value: analysis.riskOwner },
      { label: "Owner risk", value: `${analysis.ownerRisk}/100` },
      { label: "Charterer risk", value: `${analysis.chartererRisk}/100` }
    ])}
    <pre class="template-preview">${escapeHtml(suggestion)}</pre>
  `;
}

function renderAutopilotClientPortal() {
  if (!autopilotClientPortalForm || !autopilotClientPortalResult) return;
  const values = collectFormValues(autopilotClientPortalForm);
  const token = String(values.fixtureRef || "AP-2026-001").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const portalLink = `https://portal.focusea.local/${token}`;
  const visiblePnl = values.pnlMode === "Hide P&L" ? "Hidden from client" : values.pnlMode;
  lastAutopilotClient = {
    values,
    portalLink,
    visiblePnl,
    reportText: [
      "FOCUSEA CLIENT PORTAL",
      `Client: ${values.client}`,
      `Fixture: ${values.fixtureRef}`,
      `Status: ${values.status}`,
      `ETA: ${values.eta}`,
      `P&L visibility: ${visiblePnl}`,
      `Portal link: ${portalLink}`
    ].join("\n")
  };
  autopilotClientPortalResult.innerHTML = `
    ${metricCards([
      { label: "Client", value: values.client },
      { label: "Fixture", value: values.fixtureRef },
      { label: "Status", value: values.status },
      { label: "ETA", value: values.eta },
      { label: "Portal", value: `<a href="${portalLink}" target="_blank" rel="noopener noreferrer">Client link</a>` }
    ])}
    <small>Client portal is generated as a product-ready link pattern. Real deployment needs backend auth and signed URL tokens.</small>
  `;
}

function buildAutopilotFullPack() {
  return {
    inbox: lastAutopilotInbox,
    dealRoom: lastAutopilotDealRoom,
    documentPack: lastAutopilotDocumentPack,
    voyage: lastAutopilotVoyage,
    carbon: lastAutopilotCarbon,
    weather: lastAutopilotWeather,
    portAgency: lastAutopilotPortAgency,
    counterparty: lastAutopilotCounterparty,
    clause: lastAutopilotClause,
    client: lastAutopilotClient,
    generatedAt: new Date().toISOString()
  };
}

function autopilotFullReportText() {
  const pack = buildAutopilotFullPack();
  return [
    "FOCUSEA BROKER AUTOPILOT PRO PACK",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    pack.inbox?.reportText || "Inbox not run.",
    "",
    pack.dealRoom?.reportText || "Deal room not run.",
    "",
    pack.documentPack?.reportText || "Document pack not run.",
    "",
    pack.voyage?.reportText || "Voyage optimizer not run.",
    "",
    pack.carbon?.reportText || "Carbon desk not run.",
    "",
    pack.weather?.reportText || "Weather engine not run.",
    "",
    pack.portAgency?.reportText || "Port agency not run.",
    "",
    pack.counterparty?.reportText || "Counterparty memory not run.",
    "",
    pack.clause?.reportText || "Clause battle not run.",
    "",
    pack.client?.reportText || "Client portal not run."
  ].join("\n");
}

function runAllAutopilot() {
  renderAutopilotInbox();
  renderAutopilotDealRoom();
  renderAutopilotDocumentPack();
  renderAutopilotVoyageOptimizer();
  renderAutopilotCarbon();
  renderAutopilotWeather();
  renderAutopilotPortAgency();
  renderAutopilotCounterparty();
  renderAutopilotClauseBattle();
  renderAutopilotClientPortal();
  renderAutopilotHeader();
}

function handleAutopilotDownload(type) {
  if (!lastAutopilotInbox) renderAutopilotInbox();
  if (!lastAutopilotDealRoom) renderAutopilotDealRoom();
  if (!lastAutopilotDocumentPack) renderAutopilotDocumentPack();
  if (!lastAutopilotVoyage) renderAutopilotVoyageOptimizer();
  if (!lastAutopilotCarbon) renderAutopilotCarbon();
  if (!lastAutopilotWeather) renderAutopilotWeather();
  if (!lastAutopilotPortAgency) renderAutopilotPortAgency();
  if (!lastAutopilotCounterparty) renderAutopilotCounterparty();
  if (!lastAutopilotClause) renderAutopilotClauseBattle();
  if (!lastAutopilotClient) renderAutopilotClientPortal();
  const actions = {
    "inbox-json": () => downloadJsonFile("focusea-autopilot-inbox.json", lastAutopilotInbox || {}),
    "document-pdf": () => downloadPdfFile("focusea-autopilot-document-pack.pdf", "Focusea Multi-Document AI Pack", lastAutopilotDocumentPack?.reportText || autopilotFullReportText()),
    "document-txt": () => downloadTextFile("focusea-autopilot-document-findings.txt", lastAutopilotDocumentPack?.reportText || "No document pack."),
    "client-pdf": () => downloadPdfFile("focusea-client-portal-pack.pdf", "Focusea Client Portal", lastAutopilotClient?.reportText || autopilotFullReportText()),
    "full-json": () => downloadJsonFile("focusea-autopilot-full-pack.json", buildAutopilotFullPack())
  };
  actions[type]?.();
}

function dealIqComparableMemory() {
  return safeLocalGet("focusea-deal-iq-comparables-v1", []) || [];
}

function dealIqDefaultComparables() {
  return [
    ...decisionRateMemory,
    { cargoType: "coal", route: "Indonesia / India", freightRate: 18.9, demurrageRate: 18500, fixtureStatus: "Fixed", tce: 22600 },
    { cargoType: "coal", route: "Australia / China", freightRate: 16.7, demurrageRate: 17500, fixtureStatus: "Fixed", tce: 20900 },
    { cargoType: "grain", route: "Santos / Egypt", freightRate: 25.4, demurrageRate: 16500, fixtureStatus: "On subjects", tce: 19300 }
  ];
}

function dealIqAllComparables() {
  return [...dealIqComparableMemory(), ...dealIqDefaultComparables()];
}

function dealIqDateDiff(dateValue) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateValue);
  date.setHours(0, 0, 0, 0);
  if (Number.isNaN(date.getTime())) return 999;
  return Math.round((date - today) / 86400000);
}

function dealIqUrgency(days) {
  if (days < 0) return { label: "Overdue", cls: "risk-high" };
  if (days <= 3) return { label: "Critical", cls: "risk-high" };
  if (days <= 10) return { label: "Watch", cls: "risk-medium" };
  return { label: "Open", cls: "risk-low" };
}

function renderDealIqHeader() {
  if (!dealIqHeadline || !dealIqSummary) return;
  dealIqHeadline.textContent = lastWarRoom
    ? `${lastWarRoom.decision} | ${lastWarRoom.parsed.cargoLabel} ${lastWarRoom.parsed.route || "route TBC"}`
    : "Open a deal war room and let the desk score it.";
  dealIqSummary.textContent = [
    lastWarRoom ? `Risk ${lastWarRoom.riskScore}/100` : "war room pending",
    lastComparableFixtures ? `${lastComparableFixtures.matches.length} comparables` : "comparables pending",
    lastTimeBarCalendar ? `${lastTimeBarCalendar.criticalCount} urgent dates` : "calendar pending",
    lastVesselSuitability ? `${lastVesselSuitability.verdict}` : "vessel pending"
  ].join(" | ");
}

function renderWarRoom() {
  if (!warRoomForm || !warRoomResult) return;
  const values = collectFormValues(warRoomForm);
  const parsed = parseOfferText(values.dealText || "");
  const clause = analyzeClauseText(values.dealText || "");
  const claim = parseClaimFacts(values.dealText || "");
  const cargo = getCargoProfile(parsed.cargoType);
  const distance = estimateAutoDealDistance(parsed, values.dealText || "");
  const estimate = calculateVoyageEstimate({
    cargoType: parsed.cargoType,
    distance,
    speed: autoDealSpeedFor(parsed.cargoType),
    cargoQty: parsed.quantity || 50000,
    freightRate: parsed.freight || cargo.baseFreight,
    seaCons: parsed.cargoType === "container" ? 42 : 28,
    portCons: parsed.cargoType === "container" ? 7 : 4,
    portDays: 5,
    bunkerPrice: liveFeedState.bunker || 620,
    portCosts: autoDealPortCost(parsed.cargoType),
    canalCosts: /suez|panama|canal/i.test(values.dealText || "") ? 220000 : 0,
    dailyHire: autoDealDailyHire(parsed.cargoType),
    commission: parsed.commission || 2.5
  });
  const tceGap = Number(values.targetTce || 0) - estimate.tce;
  const missingRisk = parsed.missing.length * 7;
  const clauseRisk = Math.max(clause.ownerRisk, clause.chartererRisk) * 0.22;
  const deadlineRisk = Number(values.deadlineHours) <= 12 ? 18 : Number(values.deadlineHours) <= 24 ? 10 : 2;
  const claimRisk = Number(values.claimExposure) > 30000 || claim.amount > 0 ? 14 : 4;
  const tceRisk = tceGap > 0 ? clamp(tceGap / 450, 0, 24) : -4;
  const riskScore = clamp(Math.round(cargo.risk * 0.22 + missingRisk + clauseRisk + deadlineRisk + claimRisk + tceRisk), 0, 100);
  const decision = riskScore >= 72 ? "AVOID / REWORK" : riskScore >= 46 ? "WATCH" : "FIXABLE";
  const counterRate = (parsed.freight || cargo.baseFreight) * (riskScore >= 72 ? 1.06 : riskScore >= 46 ? 1.03 : 1.01);
  const actions = [
    parsed.missing.length ? `Close missing fields: ${parsed.missing.join(", ")}.` : "Commercial recap fields look usable.",
    tceGap > 0 ? `Counter freight toward ${money(counterRate, 2)}/${parsed.unit}; TCE gap is ${money(tceGap)}/day.` : "TCE is above target on current assumptions.",
    clause.dangerousSentences.length ? "Counter NOR/waiting/weather wording before subjects lifted." : "Clause risk acceptable but keep CP review.",
    Number(values.deadlineHours) <= 24 ? "Subject deadline close: send chase and escalation now." : "Set normal follow-up alarm.",
    Number(values.claimExposure) > 0 ? "Prepare evidence checklist for claim exposure." : "No claim exposure entered."
  ];
  lastWarRoom = {
    values,
    parsed,
    clause,
    claim,
    estimate,
    riskScore,
    decision,
    counterRate,
    actions,
    reportText: [
      "FOCUSEA FIXTURE WAR ROOM",
      `Decision: ${decision}`,
      `Risk score: ${riskScore}/100`,
      `Cargo/route: ${parsed.cargoLabel} / ${parsed.route || "TBC"}`,
      `TCE: ${money(estimate.tce)}/day`,
      `Net P&L: ${money(estimate.netPnl)}`,
      `Suggested counter: ${money(counterRate, 2)}/${parsed.unit}`,
      "",
      "Actions:",
      ...actions.map((item) => `- ${item}`)
    ].join("\n")
  };
  warRoomResult.innerHTML = `
    ${metricCards([
      { label: "Decision", value: `<span class="${riskScore >= 72 ? "risk-high" : riskScore >= 46 ? "risk-medium" : "risk-low"}">${decision}</span>` },
      { label: "Risk score", value: `${riskScore}/100` },
      { label: "TCE", value: `${money(estimate.tce)}/day` },
      { label: "Net P&L", value: money(estimate.netPnl) },
      { label: "Counter rate", value: `${money(counterRate, 2)}/${parsed.unit}` },
      { label: "Claim exposure", value: money(values.claimExposure) }
    ])}
    <div class="score-meter"><span style="width:${riskScore}%"></span></div>
    <div class="auto-deal-grid">
      <section><strong>Open risks</strong><ul class="compact-list">${scoreParsedOffer(parsed).factors.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}<li>${escapeHtml(clause.riskOwner)}</li></ul></section>
      <section><strong>Counter idea</strong><p>${escapeHtml(`Counter around ${money(counterRate, 2)}/${parsed.unit}, keep demurrage at least ${parsed.demurrage ? money(parsed.demurrage) : "TBC"}/day and clean NOR/weather wording.`)}</p></section>
      <section><strong>Todo</strong><ul class="compact-list">${actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
    </div>
  `;
  renderDealIqHeader();
}

function renderComparableFixtures() {
  if (!comparableFixtureForm || !comparableFixtureResult) return;
  const values = collectFormValues(comparableFixtureForm);
  const currentRate = Number(values.freightRate) || 0;
  const routeNeedle = String(values.route || "").toLowerCase();
  const all = dealIqAllComparables();
  const matches = all.filter((item) => (
    item.cargoType === values.cargoType
    && (!routeNeedle || String(item.route || "").toLowerCase().includes(routeNeedle.split("/")[0].trim()) || routeNeedle.includes(String(item.route || "").split("/")[0].trim().toLowerCase()))
  ));
  const useful = matches.length ? matches : all.filter((item) => item.cargoType === values.cargoType);
  const avg = useful.reduce((sum, item) => sum + Number(item.freightRate || 0), 0) / Math.max(useful.length, 1);
  const spread = currentRate - avg;
  const recommendation = spread >= 0.7 ? "Current rate is above memory average; protect relationship or justify premium."
    : spread <= -0.7 ? "Current rate is below memory average; counter up or reduce exposure."
      : "Current rate is close to memory average.";
  lastComparableFixtures = {
    values,
    matches: useful,
    avg,
    spread,
    recommendation,
    reportText: [
      "FOCUSEA COMPARABLE FIXTURES",
      `Cargo/route: ${values.cargoType} / ${values.route}`,
      `Current rate: ${money(currentRate, 2)}`,
      `Average comparable: ${money(avg, 2)}`,
      `Spread: ${money(spread, 2)}`,
      recommendation
    ].join("\n")
  };
  comparableFixtureResult.innerHTML = `
    ${metricCards([
      { label: "Comparables", value: useful.length },
      { label: "Avg rate", value: `${money(avg, 2)}/${getCargoProfile(values.cargoType).unit}` },
      { label: "Current spread", value: `${money(spread, 2)}` },
      { label: "Read", value: recommendation }
    ])}
    <table class="mini-table">
      <thead><tr><th>Route</th><th>Rate</th><th>Dem</th><th>Status</th><th>TCE</th></tr></thead>
      <tbody>${useful.slice(0, 8).map((item) => `<tr><td>${escapeHtml(item.route)}</td><td>${money(item.freightRate, 2)}</td><td>${money(item.demurrageRate)}</td><td>${escapeHtml(item.fixtureStatus)}</td><td>${money(item.tce || 0)}</td></tr>`).join("")}</tbody>
    </table>
    <small>${escapeHtml(recommendation)}</small>
  `;
  renderDealIqHeader();
}

function addComparableFixtureEntry() {
  if (!comparableFixtureForm) return;
  const values = collectFormValues(comparableFixtureForm);
  const memory = dealIqComparableMemory();
  const cargo = getCargoProfile(values.cargoType);
  const entry = {
    cargoType: values.cargoType,
    route: values.route,
    freightRate: Number(values.freightRate) || cargo.baseFreight,
    demurrageRate: Number(values.demurrageRate) || 0,
    fixtureStatus: values.fixtureStatus,
    tce: Math.round((Number(values.freightRate) || cargo.baseFreight) * 1100),
    savedAt: new Date().toISOString()
  };
  safeLocalSet("focusea-deal-iq-comparables-v1", [entry, ...memory].slice(0, 80));
  renderComparableFixtures();
  comparableFixtureResult?.insertAdjacentHTML("beforeend", `<small class="download-confirm">Comparable saved to local market memory.</small>`);
}

function renderTimeBarCalendar() {
  if (!timeBarCalendarForm || !timeBarCalendarResult) return;
  const values = collectFormValues(timeBarCalendarForm);
  const rows = [
    { type: "Subject deadline", date: values.subjectDate, action: "Chase subjects / management approval" },
    { type: "Laycan canceling", date: values.laycanDate, action: "Warn owner and charterer before canceling window" },
    { type: "Invoice due", date: values.invoiceDate, action: "Send freight/hire/commission invoice reminder" },
    { type: "Claim time bar", date: values.claimDate, action: "Submit full demurrage claim pack before time bar" }
  ].map((row) => {
    const days = dealIqDateDiff(row.date);
    const urgency = dealIqUrgency(days);
    return { ...row, days, urgency };
  });
  const criticalCount = rows.filter((row) => row.days <= 3).length;
  lastTimeBarCalendar = {
    values,
    rows,
    criticalCount,
    reportText: [
      "FOCUSEA TIME BAR CALENDAR",
      `Fixture: ${values.fixtureRef}`,
      ...rows.map((row) => `${row.type}: ${row.date} / ${row.days} days / ${row.urgency.label}`)
    ].join("\n")
  };
  timeBarCalendarResult.innerHTML = `
    ${metricCards([
      { label: "Fixture", value: values.fixtureRef },
      { label: "Critical dates", value: criticalCount },
      { label: "Next date", value: rows.sort((a, b) => a.days - b.days)[0]?.type || "-" }
    ])}
    <div class="timeline-track">
      ${rows.map((row) => `<div class="timeline-step ${row.days <= 3 ? "active" : ""}"><span>${escapeHtml(row.type)}</span><strong>${escapeHtml(row.date)} / ${row.days}d</strong><em class="${row.urgency.cls}">${row.urgency.label}</em><small>${escapeHtml(row.action)}</small></div>`).join("")}
    </div>
  `;
  renderDealIqHeader();
}

function normalizeCpSentences(text = "") {
  return String(text)
    .split(/(?<=[.!?])\s+|\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderCpDiff() {
  if (!cpDiffForm || !cpDiffResult) return;
  const values = collectFormValues(cpDiffForm);
  const original = normalizeCpSentences(values.originalText);
  const revised = normalizeCpSentences(values.revisedText);
  const originalSet = new Set(original.map((item) => item.toLowerCase()));
  const revisedSet = new Set(revised.map((item) => item.toLowerCase()));
  const added = revised.filter((item) => !originalSet.has(item.toLowerCase()));
  const removed = original.filter((item) => !revisedSet.has(item.toLowerCase()));
  const originalRisk = analyzeClauseText(values.originalText || "");
  const revisedRisk = analyzeClauseText(values.revisedText || "");
  const riskDelta = Math.max(revisedRisk.ownerRisk, revisedRisk.chartererRisk) - Math.max(originalRisk.ownerRisk, originalRisk.chartererRisk);
  const bias = revisedRisk.chartererRisk > originalRisk.chartererRisk + 10 ? "Owner-leaning change"
    : revisedRisk.ownerRisk > originalRisk.ownerRisk + 10 ? "Charterer-leaning protection"
      : "Mixed / balanced change";
  lastCpDiff = {
    values,
    added,
    removed,
    originalRisk,
    revisedRisk,
    riskDelta,
    bias,
    reportText: [
      "FOCUSEA CP DIFF TOOL",
      `Bias: ${bias}`,
      `Risk delta: ${riskDelta}`,
      "",
      "Added:",
      ...added.map((item) => `+ ${item}`),
      "",
      "Removed:",
      ...removed.map((item) => `- ${item}`)
    ].join("\n")
  };
  cpDiffResult.innerHTML = `
    ${metricCards([
      { label: "Added clauses", value: added.length },
      { label: "Removed clauses", value: removed.length },
      { label: "Risk delta", value: riskDelta >= 0 ? `+${riskDelta}` : riskDelta },
      { label: "Bias", value: bias }
    ])}
    <div class="copilot-output-grid">
      <div><strong>Added / changed</strong><ul class="compact-list">${added.map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>No added clauses.</li>"}</ul></div>
      <div><strong>Removed protection</strong><ul class="compact-list">${removed.map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>No removed clauses.</li>"}</ul></div>
    </div>
  `;
}

function renderVesselSuitability() {
  if (!vesselSuitabilityForm || !vesselSuitabilityResult) return;
  const values = collectFormValues(vesselSuitabilityForm);
  const cargo = getCargoProfile(values.cargoType);
  const port = ports[values.portId] || ports.singapore;
  const depth = parseFloat(port.depth) || 14;
  const preferred = cargo.unit === "TEU" ? "container" : cargo.label.includes("Crude") || cargo.label.includes("Chemicals") ? "tanker" : cargo.label.includes("LNG") ? "lng" : cargo.label.includes("Project") ? "mpp" : "bulk";
  let score = 86;
  if (values.vesselType !== preferred) score -= 30;
  if (depth - Number(values.draft) < 1) score -= 22;
  if (Number(values.age) > 20) score -= 12;
  if (values.classStatus === "Minor remarks") score -= 9;
  if (values.classStatus === "Class/vetting concern") score -= 28;
  if (values.condition === "Needs inspection") score -= 10;
  if (values.condition === "Poor / cleaning required") score -= 30;
  score = clamp(Math.round(score), 0, 100);
  const verdict = score >= 72 ? "Suitable" : score >= 48 ? "Conditional" : "Not suitable";
  const requirements = [
    cargo.note,
    `Preferred vessel: ${cargo.vessel}.`,
    `Port depth ${port.depth}, draft margin ${(depth - Number(values.draft)).toFixed(1)} m.`,
    values.cargoType === "grain" && "Grain clean holds, fumigation and moisture evidence required.",
    values.cargoType === "chemicals" && "Tank coating, previous cargo and cleaning certificate required.",
    values.cargoType === "container" && "Lashing, reefer and IMDG segregation to be checked."
  ].filter(Boolean);
  lastVesselSuitability = { values, cargo, port, score, verdict, requirements, reportText: ["FOCUSEA VESSEL SUITABILITY", `Verdict: ${verdict}`, `Score: ${score}/100`, ...requirements.map((item) => `- ${item}`)].join("\n") };
  vesselSuitabilityResult.innerHTML = `
    ${metricCards([
      { label: "Verdict", value: `<span class="${score >= 72 ? "risk-low" : score >= 48 ? "risk-medium" : "risk-high"}">${verdict}</span>` },
      { label: "Score", value: `${score}/100` },
      { label: "Preferred", value: cargo.vessel },
      { label: "Port", value: port.name }
    ])}
    <ul class="compact-list">${requirements.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  `;
  renderDealIqHeader();
}

function renderNegotiationScore() {
  if (!negotiationScoreForm || !negotiationScoreResult) return;
  const values = collectFormValues(negotiationScoreForm);
  const cargo = getCargoProfile(values.cargoType);
  const owner = Number(values.ownerRate) || cargo.baseFreight;
  const charterer = Number(values.chartererRate) || cargo.baseFreight;
  const market = Number(values.marketRate) || marketRate(cargo, "neutral");
  const midpoint = (owner + charterer) / 2;
  const spread = owner - charterer;
  const counterPower = clamp(Math.round(68 - Math.abs(charterer - market) * 10 + (values.relationship === "Strategic client" ? 8 : values.relationship === "Weak counterparty" ? -10 : 0)), 0, 100);
  const suggested = clamp((market + midpoint) / 2, Math.min(owner, charterer), Math.max(owner, charterer));
  const upside = (suggested - charterer) * Number(values.quantity || 0);
  const verdict = counterPower >= 70 ? "Acceptable counter" : counterPower >= 45 ? "Counter once more" : "Weak counter / rework";
  lastNegotiationScore = { values, cargo, spread, counterPower, suggested, upside, verdict, reportText: ["FOCUSEA BROKER NEGOTIATION SCORE", `Verdict: ${verdict}`, `Score: ${counterPower}/100`, `Suggested: ${money(suggested, 2)}/${cargo.unit}`, `Upside: ${money(upside)}`].join("\n") };
  negotiationScoreResult.innerHTML = `
    ${metricCards([
      { label: "Score", value: `${counterPower}/100` },
      { label: "Verdict", value: verdict },
      { label: "Spread", value: `${money(spread, 2)}/${cargo.unit}` },
      { label: "Suggested", value: `${money(suggested, 2)}/${cargo.unit}` },
      { label: "Upside", value: money(upside) }
    ])}
    <small>${counterPower >= 70 ? "Counter is close to market and can be accepted if subjects are clean." : "Use comparables and deadline pressure before lifting subjects."}</small>
  `;
}

function addHours(date, hours) {
  const next = new Date(date);
  next.setHours(next.getHours() + Number(hours || 0));
  return next;
}

function renderPortCallTimeline() {
  if (!portCallTimelineForm || !portCallTimelineResult) return;
  const values = collectFormValues(portCallTimelineForm);
  const port = ports[values.portId] || ports.singapore;
  const eta = new Date(values.eta);
  const rows = [
    { step: "ETA / anchorage", time: eta, note: "Master sends arrival notice and agent confirms port lineup." },
    { step: "Free pratique / docs", time: addHours(eta, 2), note: "Health, customs, crew/cargo documents checked." },
    { step: "NOR tendered", time: addHours(eta, 3), note: "Confirm valid NOR basis and readiness." },
    { step: "Pilot / berth", time: addHours(eta, Number(values.waitingHours) || 0), note: `${port.pilotage}; berth window and tug plan monitored.` },
    { step: "Cargo operations", time: addHours(eta, Number(values.waitingHours) + 4), note: "Start loading/discharge; keep stop/start and weather evidence." },
    { step: "Completion", time: addHours(eta, Number(values.waitingHours) + 4 + Number(values.operationHours)), note: "Completion time drives laytime statement." },
    { step: "Docs / sailing", time: addHours(eta, Number(values.waitingHours) + 4 + Number(values.operationHours) + Number(values.docsDelay)), note: "Cargo docs, port clearance and sailing." }
  ];
  lastPortCallTimeline = { values, port, rows, reportText: ["FOCUSEA PORT CALL TIMELINE", `Port: ${port.name}`, ...rows.map((row) => `${row.step}: ${row.time.toLocaleString()} - ${row.note}`)].join("\n") };
  portCallTimelineResult.innerHTML = `
    ${metricCards([
      { label: "Port", value: port.name },
      { label: "ETA", value: eta.toLocaleString() },
      { label: "Waiting", value: `${values.waitingHours}h` },
      { label: "Ops", value: `${values.operationHours}h` }
    ])}
    <div class="timeline-track">
      ${rows.map((row, index) => `<div class="timeline-step ${index === 2 || index === 5 ? "active" : ""}"><span>${escapeHtml(row.step)}</span><strong>${row.time.toLocaleString()}</strong><small>${escapeHtml(row.note)}</small></div>`).join("")}
    </div>
  `;
}

function renderClaimEvidence() {
  if (!claimEvidenceForm || !claimEvidenceResult) return;
  const values = collectFormValues(claimEvidenceForm);
  const available = String(values.docs || "").toLowerCase();
  const requiredMap = {
    Demurrage: ["NOR", "SOF", "rain log", "cargo operation log", "invoice", "CP recap", "laytime statement"],
    "Off-hire": ["notice", "engine log", "deck log", "charter party", "off-hire calculation", "invoice"],
    "Cargo damage": ["photos", "survey report", "mate receipt", "cargo docs", "notice of claim", "invoice"],
    Deadfreight: ["booking/recap", "stowage plan", "short shipment evidence", "notice", "invoice"]
  };
  const required = requiredMap[values.claimType] || requiredMap.Demurrage;
  const rows = required.map((doc) => ({ doc, ready: available.includes(doc.toLowerCase()) }));
  const readyCount = rows.filter((row) => row.ready).length;
  const strength = clamp(Math.round((readyCount / required.length) * 100 - (Number(values.claimAmount) > 50000 ? 6 : 0)), 0, 100);
  const verdict = strength >= 75 ? "Strong evidence pack" : strength >= 50 ? "Usable but incomplete" : "Weak claim file";
  lastClaimEvidence = { values, required, rows, strength, verdict, reportText: ["FOCUSEA CLAIM EVIDENCE CHECKLIST", `Claim: ${values.claimType}`, `Strength: ${strength}/100`, `Verdict: ${verdict}`, ...rows.map((row) => `${row.ready ? "[OK]" : "[MISSING]"} ${row.doc}`)].join("\n") };
  claimEvidenceResult.innerHTML = `
    ${metricCards([
      { label: "Strength", value: `${strength}/100` },
      { label: "Verdict", value: verdict },
      { label: "Ready docs", value: `${readyCount}/${required.length}` },
      { label: "Amount", value: money(values.claimAmount) }
    ])}
    <div class="deal-file-grid">
      ${rows.map((row) => `<article class="${row.ready ? "" : "review"}"><span>${row.ready ? "Ready" : "Missing"}</span><strong>${escapeHtml(row.doc)}</strong><p>${row.ready ? "Attached / mentioned." : "Needed before formal claim."}</p></article>`).join("")}
    </div>
  `;
}

function renderMarketAlert() {
  if (!marketAlertForm || !marketAlertResult) return;
  const values = collectFormValues(marketAlertForm);
  const score = clamp(Math.round(Math.abs(Number(values.bunkerChange)) * 0.7 + Math.abs(Number(values.indexMove)) * 5 + Math.abs(Number(values.delayChange)) * 0.9 + (values.newsHit === "Yes" ? 18 : 0)), 0, 100);
  const verdict = score >= 70 ? "Deal is materially changed" : score >= 42 ? "Watch and re-price" : "Monitor only";
  const action = score >= 70 ? "Re-run voyage estimate and send counter/reservation immediately."
    : score >= 42 ? "Update broker daily brief and warn client on exposure."
      : "No immediate commercial action required.";
  lastMarketAlert = { values, score, verdict, action, reportText: ["FOCUSEA MARKET COMPARABLE ALERT", `Deal: ${values.dealName}`, `Score: ${score}/100`, `Verdict: ${verdict}`, `Action: ${action}`].join("\n") };
  marketAlertResult.innerHTML = `
    ${metricCards([
      { label: "Alert score", value: `${score}/100` },
      { label: "Verdict", value: verdict },
      { label: "Bunker", value: `${Number(values.bunkerChange) >= 0 ? "+" : ""}${values.bunkerChange}/t` },
      { label: "Index", value: `${values.indexMove}%` },
      { label: "Delay", value: `${values.delayChange}h` }
    ])}
    <div class="confidence-row"><span>Market values are user input / simulated live state</span><em class="source-badge input">User input</em><em class="source-badge simulated">Live strip</em></div>
    <small>${escapeHtml(action)}</small>
  `;
}

function dealIqPack() {
  return {
    warRoom: lastWarRoom,
    comparableFixtures: lastComparableFixtures,
    timeBarCalendar: lastTimeBarCalendar,
    cpDiff: lastCpDiff,
    vesselSuitability: lastVesselSuitability,
    negotiationScore: lastNegotiationScore,
    portCallTimeline: lastPortCallTimeline,
    claimEvidence: lastClaimEvidence,
    marketAlert: lastMarketAlert,
    generatedAt: new Date().toISOString()
  };
}

function dealIqReportText() {
  const pack = dealIqPack();
  return [
    "FOCUSEA PROFESSIONAL DEAL IQ REPORT",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    pack.warRoom?.reportText || "War Room not run.",
    "",
    pack.comparableFixtures?.reportText || "Comparables not run.",
    "",
    pack.timeBarCalendar?.reportText || "Time bar calendar not run.",
    "",
    pack.cpDiff?.reportText || "CP diff not run.",
    "",
    pack.vesselSuitability?.reportText || "Vessel suitability not run.",
    "",
    pack.negotiationScore?.reportText || "Negotiation score not run.",
    "",
    pack.portCallTimeline?.reportText || "Port call timeline not run.",
    "",
    pack.claimEvidence?.reportText || "Claim evidence not run.",
    "",
    pack.marketAlert?.reportText || "Market alert not run."
  ].join("\n");
}

function renderReportCenter() {
  if (!reportCenterResult) return;
  const completed = Object.values(dealIqPack()).filter(Boolean).length - 1;
  reportCenterResult.innerHTML = `
    ${metricCards([
      { label: "Modules ready", value: `${Math.max(completed, 0)}/9` },
      { label: "Primary decision", value: lastWarRoom?.decision || "Run War Room" },
      { label: "Claim file", value: lastClaimEvidence?.verdict || "Pending" },
      { label: "Market alert", value: lastMarketAlert?.verdict || "Pending" }
    ])}
    <small>Report Center combines the current Deal IQ module outputs into downloadable professional packs.</small>
  `;
}

function runAllDealIq() {
  renderWarRoom();
  renderComparableFixtures();
  renderTimeBarCalendar();
  renderCpDiff();
  renderVesselSuitability();
  renderNegotiationScore();
  renderPortCallTimeline();
  renderClaimEvidence();
  renderMarketAlert();
  renderReportCenter();
  renderDealIqHeader();
}

function handleDealIqDownload(type) {
  if (!lastWarRoom) renderWarRoom();
  if (!lastComparableFixtures) renderComparableFixtures();
  if (!lastTimeBarCalendar) renderTimeBarCalendar();
  if (!lastCpDiff) renderCpDiff();
  if (!lastVesselSuitability) renderVesselSuitability();
  if (!lastNegotiationScore) renderNegotiationScore();
  if (!lastPortCallTimeline) renderPortCallTimeline();
  if (!lastClaimEvidence) renderClaimEvidence();
  if (!lastMarketAlert) renderMarketAlert();
  const actions = {
    "war-room-pdf": () => downloadPdfFile("focusea-fixture-war-room.pdf", "Focusea Fixture War Room", lastWarRoom?.reportText || dealIqReportText()),
    "war-room-json": () => downloadJsonFile("focusea-fixture-war-room.json", lastWarRoom || {}),
    "comparables-json": () => downloadJsonFile("focusea-comparable-fixtures.json", lastComparableFixtures || {}),
    "cp-diff-pdf": () => downloadPdfFile("focusea-cp-diff.pdf", "Focusea CP Diff Tool", lastCpDiff?.reportText || dealIqReportText()),
    "cp-diff-txt": () => downloadTextFile("focusea-cp-diff.txt", lastCpDiff?.reportText || "No CP diff."),
    "full-pdf": () => downloadPdfFile("focusea-professional-deal-iq.pdf", "Focusea Professional Deal IQ", dealIqReportText()),
    "full-json": () => downloadJsonFile("focusea-professional-deal-iq.json", dealIqPack()),
    "client-summary": () => downloadTextFile("focusea-client-summary.txt", [lastWarRoom?.reportText, lastPortCallTimeline?.reportText, lastMarketAlert?.reportText].filter(Boolean).join("\n\n") || dealIqReportText()),
    "claim-pack": () => downloadPdfFile("focusea-claim-evidence-pack.pdf", "Focusea Claim Evidence Pack", [lastClaimEvidence?.reportText, lastTimeBarCalendar?.reportText, lastCpDiff?.reportText].filter(Boolean).join("\n\n") || dealIqReportText()),
    "market-brief": () => downloadTextFile("focusea-market-comparable-brief.txt", [lastComparableFixtures?.reportText, lastMarketAlert?.reportText].filter(Boolean).join("\n\n") || dealIqReportText())
  };
  actions[type]?.();
  renderReportCenter();
}

function decisionSeverityWeight(value) {
  return { Low: 8, Medium: 24, High: 48, low: 8, medium: 24, high: 48 }[value] || 14;
}

function estimateAutoDealDistance(parsed, text = "") {
  const haystack = `${parsed.route || ""} ${text}`.toLowerCase();
  const routeMap = [
    { pattern: /indonesia.*india|india.*indonesia/, distance: 3150 },
    { pattern: /brazil.*china|santos.*china|santos.*singapore/, distance: 10800 },
    { pattern: /australia.*china|newcastle.*qingdao|port hedland.*china/, distance: 4100 },
    { pattern: /black sea.*egypt|odessa.*egypt|constanta.*egypt/, distance: 1650 },
    { pattern: /shanghai.*los angeles|china.*los angeles/, distance: 5700 },
    { pattern: /rotterdam.*singapore|singapore.*rotterdam/, distance: 8280 },
    { pattern: /istanbul.*singapore|turkey.*singapore/, distance: 5820 },
    { pattern: /fujairah.*singapore|middle east.*singapore/, distance: 3400 },
    { pattern: /us gulf.*europe|houston.*rotterdam/, distance: 4900 },
    { pattern: /persian gulf.*china|ras tanura.*ningbo/, distance: 6200 }
  ];
  const match = routeMap.find((item) => item.pattern.test(haystack));
  if (match) return match.distance;
  if (parsed.cargoType === "container") return 5200;
  if (["crudeOil", "lng", "chemicals"].includes(parsed.cargoType)) return 6100;
  return 4200;
}

function extractAutoDealAllowedHours(text = "") {
  const direct = text.match(/allowed\s+laytime[^0-9]*([0-9]+(?:[.,][0-9]+)?)\s*h/i)
    || text.match(/laytime[^0-9]*([0-9]+(?:[.,][0-9]+)?)\s*h/i)
    || text.match(/([0-9]+(?:[.,][0-9]+)?)\s*(?:hours|hrs|h)\s*(?:allowed|laytime)/i);
  return parseMoneyNumber(direct?.[1]) || 72;
}

function autoDealSpeedFor(cargoType) {
  if (cargoType === "container") return 16;
  if (cargoType === "lng") return 15;
  if (["crudeOil", "chemicals"].includes(cargoType)) return 13.2;
  return 12.5;
}

function autoDealDailyHire(cargoType) {
  if (cargoType === "container") return 23500;
  if (cargoType === "lng") return 62000;
  if (cargoType === "crudeOil") return 36000;
  if (cargoType === "chemicals") return 28500;
  if (cargoType === "ironOre") return 21000;
  return 14500;
}

function autoDealPortCost(cargoType) {
  if (cargoType === "container") return 98000;
  if (cargoType === "lng") return 185000;
  if (["crudeOil", "chemicals"].includes(cargoType)) return 132000;
  if (cargoType === "projectCargo") return 115000;
  return 68000;
}

function buildAutoDealRecap(parsed, estimate, riskLabel) {
  return [
    "FIXTURE RECAP DRAFT",
    "",
    `Vessel: ${parsed.vesselSize || "TBN"}`,
    `Cargo: ${parsed.quantity ? parsed.quantity.toLocaleString("en-US") : "TBC"} ${parsed.unit} ${parsed.cargoLabel}`,
    `Load / Discharge: ${parsed.route || "TBC"}`,
    `Laycan: ${parsed.laycan || "TBC"}`,
    `Freight: ${parsed.freight ? `${money(parsed.freight, 2)}/${parsed.unit}` : "TBC"}`,
    `Demurrage: ${parsed.demurrage ? `${money(parsed.demurrage)}/day pro rata` : "TBC"}`,
    `Commission: ${parsed.commission ? `${parsed.commission}% total` : "TBC"}`,
    `Subjects: ${parsed.subjects || "TBC"}`,
    "",
    "Commercial read:",
    `- Estimated TCE: ${money(estimate.tce)}/day`,
    `- Net voyage P&L: ${money(estimate.netPnl)}`,
    `- Deal decision: ${riskLabel}`,
    "",
    "Open points before subjects lifted:",
    "- Confirm NOR validity, weather exceptions, waiting time and laytime basis.",
    "- Confirm port costs, agency, taxes, sanctions/compliance and receiver approval.",
    "- Attach SOF/NOR evidence pack if demurrage exposure exists."
  ].join("\n");
}

function buildAutoDealMail(parsed, estimate, risk, questions) {
  return [
    "Dear Sirs,",
    "",
    `Many thanks. We note ${parsed.quantity ? parsed.quantity.toLocaleString("en-US") : "[qty]"} ${parsed.unit} ${parsed.cargoLabel} ${parsed.route || "[load/discharge TBC]"}, laycan ${parsed.laycan || "[TBC]"}, freight ${parsed.freight ? `${money(parsed.freight, 2)}/${parsed.unit}` : "[TBC]"} and demurrage ${parsed.demurrage ? `${money(parsed.demurrage)}/day` : "[TBC]"}.`,
    "",
    risk.decision === "FIX"
      ? "Commercially this appears workable subject clean recap and final CP approval."
      : risk.decision === "WATCH"
        ? "Commercially this is workable only if the below points are tightened before subjects are lifted."
        : "At present we suggest reworking the offer before treating it as clean.",
    "",
    "Please confirm:",
    ...questions.map((item) => `- ${item}`),
    "",
    `Our current estimate indicates TCE about ${money(estimate.tce)}/day and net voyage P&L ${money(estimate.netPnl)} before final vessel-approved figures.`,
    "",
    "Best regards,"
  ].join("\n");
}

function buildAutoDealClaimLetter(parsed, claim, clause) {
  const amountLine = claim.amount > 0
    ? `The estimated demurrage amount is ${money(claim.amount)} at ${money(claim.demurrageRate)}/day.`
    : claim.dispatchAmount > 0
      ? `The estimated dispatch amount is ${money(claim.dispatchAmount)}.`
      : "No demurrage/dispatch balance is currently detected from the pasted text.";
  return [
    "DEMURRAGE / LAYTIME CLAIM DRAFT",
    "",
    "Dear Sirs,",
    "",
    `Based on the pasted NOR/SOF record for ${parsed.route || "the voyage"}, laytime used is estimated at ${claim.estimatedUsedHours.toFixed(1)} hours against allowed laytime of ${claim.allowedHours.toFixed(1)} hours.`,
    `Detected counting basis: ${claim.statement.startBasis}. Deductions detected: ${claim.rainHours.toFixed(1)} hours.`,
    amountLine,
    "",
    `Clause watch: ${clause.riskOwner}. ${clause.findings[0] || "NOR and laytime wording to be checked."}`,
    "",
    "Documents to attach: signed NOR, signed SOF, rain/weather log, cargo operation log, laytime statement, invoice and CP recap.",
    "",
    "This is a Focusea draft for broker review before legal/commercial submission."
  ].join("\n");
}

function buildAutoDealAnalysis(values) {
  const text = String(values.dealText || "");
  const parsed = parseOfferText(text);
  const cargo = getCargoProfile(parsed.cargoType);
  const parsedRisk = scoreParsedOffer(parsed);
  const clause = analyzeClauseText(text);
  const allowedHours = extractAutoDealAllowedHours(text);
  const claim = parseClaimFacts(text);
  claim.allowedHours = allowedHours || claim.allowedHours;
  const distance = Number(values.distanceOverride) > 0 ? Number(values.distanceOverride) : estimateAutoDealDistance(parsed, text);
  const targetTce = Number(values.targetTce) || 22000;
  const portDelay = Number(values.portDelay) || 0;
  const voyageValues = {
    cargoType: parsed.cargoType,
    distance,
    speed: autoDealSpeedFor(parsed.cargoType),
    cargoQty: parsed.quantity || (parsed.cargoType === "container" ? 1800 : 50000),
    freightRate: parsed.freight || cargo.baseFreight,
    seaCons: parsed.cargoType === "container" ? 42 : ["crudeOil", "lng", "chemicals"].includes(parsed.cargoType) ? 36 : 28,
    portCons: parsed.cargoType === "lng" ? 9 : parsed.cargoType === "container" ? 7 : 4,
    portDays: 4.5 + portDelay,
    bunkerPrice: liveFeedState.bunker || 620,
    portCosts: autoDealPortCost(parsed.cargoType),
    canalCosts: /suez|panama|canal/i.test(text) ? 240000 : 0,
    dailyHire: autoDealDailyHire(parsed.cargoType),
    commission: parsed.commission || 2.5
  };
  const estimate = calculateVoyageEstimate(voyageValues);
  const tceGap = targetTce - estimate.tce;
  const marketRisk = liveFeedState.congestion * 0.18 + (liveFeedState.bunker > 650 ? 8 : 3);
  const clauseRisk = Math.max(clause.ownerRisk, clause.chartererRisk) * 0.16 + clause.dangerousSentences.length * 5;
  const claimRisk = claim.amount > 0 ? 12 : claim.dispatchAmount > 0 ? 4 : 0;
  const tceRisk = tceGap > 0 ? clamp(tceGap / 500, 0, 24) : -6;
  const score = clamp(Math.round(parsedRisk.score * 0.36 + cargo.risk * 0.14 + marketRisk + clauseRisk + claimRisk + tceRisk), 0, 100);
  const decision = score >= 72 ? "REWORK" : score >= 46 ? "WATCH" : "FIX";
  const scoreLabel = score >= 72 ? "High" : score >= 46 ? "Medium" : "Low";
  const questions = [
    ...parsed.missing.map((field) => `Confirm ${field}.`),
    !/nor/i.test(text) && "Confirm NOR tender/validity basis.",
    !/weather|rain|exception/i.test(text) && "Confirm weather/rain exception wording.",
    !parsed.subjects && "Confirm subjects and deadline.",
    "Confirm sanctions/compliance, receiver approval and final CP wording."
  ].filter(Boolean);
  const nextActions = [
    decision === "FIX" ? "Prepare clean recap and keep subjects/evidence trail tidy." : "Do not lift subjects before missing terms are closed.",
    estimate.tce < targetTce ? `Counter freight or reduce cost: TCE is ${money(Math.abs(tceGap))}/day below target.` : "TCE meets target on current assumptions.",
    clause.dangerousSentences.length ? "Counter NOR/waiting/weather clause wording." : "Clause risk looks controllable but still confirm CP exceptions.",
    claim.amount > 0 ? "Generate demurrage claim pack from SOF/NOR evidence." : "No demurrage claim amount detected yet."
  ];
  const risk = { score, scoreLabel, decision, parsedRisk, tceGap, marketRisk, clauseRisk, claimRisk, tceRisk, nextActions };
  const recap = buildAutoDealRecap(parsed, estimate, decision);
  const mail = buildAutoDealMail(parsed, estimate, risk, questions);
  const claimLetter = buildAutoDealClaimLetter(parsed, claim, clause);
  const marketRows = [
    { label: "BDI", value: liveFeedState.bdi.toLocaleString("en-US"), source: "licensed" },
    { label: "BDTI", value: liveFeedState.bdti.toLocaleString("en-US"), source: "licensed" },
    { label: "SCFI", value: liveFeedState.scfi.toLocaleString("en-US"), source: "api-ready" },
    { label: "Bunker", value: `${bunkerPriceLabel(liveFeedState.bunker)}`, source: "api-ready" },
    { label: "Port congestion", value: `${liveFeedState.congestion}%`, source: "simulated" },
    { label: "Fixture terms", value: "pasted text", source: "input" }
  ];
  const reportText = [
    "FOCUSEA AUTO DEAL PROCESSOR",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    parsedOfferReport(parsed),
    "",
    "VOYAGE ESTIMATE",
    `Distance: ${distance} nm`,
    `Sea / total days: ${estimate.seaDays.toFixed(1)} / ${estimate.totalDays.toFixed(1)}`,
    `Gross freight: ${money(estimate.grossFreight)}`,
    `Bunker: ${estimate.bunkerTons.toFixed(1)} mt / ${money(estimate.bunkerCost)}`,
    `TCE: ${money(estimate.tce)}/day`,
    `Net P&L: ${money(estimate.netPnl)}`,
    "",
    "DEAL RISK",
    `Decision: ${decision}`,
    `Risk score: ${score}/100 ${scoreLabel}`,
    ...nextActions.map((item) => `- ${item}`),
    "",
    "CLAUSE / SOF",
    `Clause risk owner: ${clause.riskOwner}`,
    `Laytime stops: ${clause.laytimeStops}`,
    `Demurrage likely: ${clause.demurrageLikely}`,
    `Claim estimate: ${money(claim.amount)}`,
    "",
    recap,
    "",
    "BROKER MAIL",
    mail,
    "",
    claimLetter
  ].join("\n");
  return { text, parsed, cargo, clause, claim, estimate, voyageValues, risk, questions, nextActions, recap, mail, claimLetter, marketRows, reportText };
}

function renderAutoDealProcessor() {
  if (!autoDealProcessorForm || !autoDealProcessorResult) return;
  const values = collectFormValues(autoDealProcessorForm);
  lastAutoDealProcessor = buildAutoDealAnalysis(values);
  const { parsed, clause, claim, estimate, risk, questions, nextActions, recap, mail, claimLetter, marketRows, voyageValues } = lastAutoDealProcessor;
  autoDealProcessorResult.innerHTML = `
    ${metricCards([
      { label: "Decision", value: `<span class="verdict-${risk.decision === "FIX" ? "fix" : risk.decision === "WATCH" ? "watch" : "avoid"}">${risk.decision}</span>` },
      { label: "Risk score", value: `${risk.score}/100 ${risk.scoreLabel}` },
      { label: "Cargo", value: parsed.cargoLabel },
      { label: "Route", value: parsed.route || "TBC" },
      { label: "TCE", value: `${money(estimate.tce)}/day` },
      { label: "Net P&L", value: money(estimate.netPnl) },
      { label: "Claim estimate", value: money(claim.amount) },
      { label: "Clause owner", value: clause.riskOwner }
    ])}
    <div class="score-meter"><span style="width:${risk.score}%"></span></div>
    <div class="auto-deal-grid">
      <section>
        <strong>Extracted deal</strong>
        <ul class="compact-list">
          <li>${parsed.quantity ? parsed.quantity.toLocaleString("en-US") : "TBC"} ${parsed.unit} ${parsed.cargoLabel}</li>
          <li>${escapeHtml(parsed.route || "Load/discharge TBC")} / laycan ${escapeHtml(parsed.laycan || "TBC")}</li>
          <li>Freight ${parsed.freight ? `${money(parsed.freight, 2)}/${parsed.unit}` : "TBC"} / demurrage ${parsed.demurrage ? `${money(parsed.demurrage)}/day` : "TBC"}</li>
          <li>Vessel ${escapeHtml(parsed.vesselSize)} / commission ${parsed.commission ? `${parsed.commission}%` : "TBC"}</li>
        </ul>
      </section>
      <section>
        <strong>Voyage estimate</strong>
        <ul class="compact-list">
          <li>Distance ${voyageValues.distance.toLocaleString("en-US")} nm, speed ${voyageValues.speed} kn</li>
          <li>Sea ${estimate.seaDays.toFixed(1)}d / total ${estimate.totalDays.toFixed(1)}d</li>
          <li>Bunker ${estimate.bunkerTons.toFixed(1)} mt / cost ${money(estimate.bunkerCost)}</li>
          <li>Gross freight ${money(estimate.grossFreight)} / brokerage ${money(estimate.brokerage)}</li>
        </ul>
      </section>
      <section>
        <strong>Document AI</strong>
        <ul class="compact-list">
          <li>Clause risk owner: ${escapeHtml(clause.riskOwner)}</li>
          <li>Laytime stops: ${escapeHtml(clause.laytimeStops)}</li>
          <li>Demurrage likely: ${escapeHtml(clause.demurrageLikely)}</li>
          <li>Used laytime: ${claim.estimatedUsedHours.toFixed(1)}h / allowed ${claim.allowedHours.toFixed(1)}h</li>
        </ul>
      </section>
      <section>
        <strong>Next actions</strong>
        <ul class="compact-list">${nextActions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    </div>
    <div class="auto-deal-market">
      ${marketRows.map((row) => `<article><span>${escapeHtml(row.label)}</span><strong>${escapeHtml(row.value)}</strong><em class="source-badge ${row.source}">${sourceBadgeText(row.source)}</em></article>`).join("")}
    </div>
    <details class="auto-deal-docs" open>
      <summary>Recap / mail / claim drafts</summary>
      <div class="copilot-output-grid">
        <div><strong>Recap</strong><pre class="template-preview">${escapeHtml(recap)}</pre></div>
        <div><strong>Broker mail</strong><pre class="template-preview">${escapeHtml(mail)}</pre></div>
        <div><strong>Claim letter</strong><pre class="template-preview">${escapeHtml(claimLetter)}</pre></div>
        <div><strong>Missing / questions</strong><ul class="compact-list">${questions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
      </div>
    </details>
  `;
  renderDecisionHeader();
}

function applyAutoDealToOfferTracker() {
  if (!lastAutoDealProcessor) renderAutoDealProcessor();
  if (!lastAutoDealProcessor) return;
  const ok = applyParsedOfferToTracker(lastAutoDealProcessor.parsed);
  if (autoDealProcessorResult && ok) {
    autoDealProcessorResult.insertAdjacentHTML("beforeend", `<small class="download-confirm">Auto Deal pushed to Offer Tracker, Kanban and notification flow.</small>`);
  }
}

function renderDecisionHeader() {
  if (!decisionLabHeadline || !decisionLabSummary) return;
  const autoDeal = lastAutoDealProcessor;
  const doctor = lastFixtureDoctor;
  const timeBar = lastTimeBar;
  const whatIf = lastWhatIf;
  decisionLabHeadline.textContent = autoDeal
    ? `${autoDeal.risk.decision} | Auto Deal ${autoDeal.risk.score}/100 risk`
    : doctor ? `${doctor.verdict} | ${doctor.score}/100 commercial health` : "Run the lab to stress-test the fixture.";
  decisionLabSummary.textContent = [
    autoDeal ? `Auto workflow: ${autoDeal.parsed.cargoLabel} ${autoDeal.parsed.route || "route TBC"}` : "Auto Deal pending",
    doctor ? `Top issue: ${doctor.issues[0]?.title || "controlled"}` : "Fixture Doctor pending",
    timeBar ? `Time bar: ${timeBar.urgency}` : "Time Bar pending",
    whatIf ? `What-if P&L: ${money(whatIf.adjustedPnl)}` : "What-if pending"
  ].join(" | ");
}

function renderFixtureDoctor() {
  if (!fixtureDoctorForm || !fixtureDoctorResult) return;
  const values = collectFormValues(fixtureDoctorForm);
  const parsed = parseOfferText(values.dealText || "");
  const risk = scoreParsedOffer(parsed);
  const estimated = Number(values.estimatedTce) || 0;
  const target = Number(values.targetTce) || 0;
  const issues = [
    estimated < target && { title: "TCE below target", text: `Estimated TCE is ${money(target - estimated)} below target.` },
    (parsed.freight || 0) < (getCargoProfile(parsed.cargoType).baseFreight * 0.96) && { title: "Weak freight", text: "Freight is below cargo model band; counter or add protection." },
    (parsed.demurrage || 0) < 17000 && { title: "Low demurrage", text: "Demurrage may not cover hire and port delay exposure." },
    parsed.laycanDays > 0 && parsed.laycanDays <= 5 && { title: "Narrow laycan", text: "Laycan is tight; add cancellation and ETA buffer language." },
    /wibon|wipon|waiting|nor/i.test(values.dealText || "") && { title: "NOR waiting risk", text: "Clarify valid NOR and whether waiting time counts." },
    !parsed.commission && { title: "Commission missing", text: "Commission should be exact before recap is clean." },
    Number(values.portDelay) >= 2 && { title: "Port delay exposure", text: "Port delay can consume freight margin and trigger demurrage dispute." },
    values.clausePosture === "unclear" && { title: "Clause posture unclear", text: "Broker should identify owner/charterer risk before subjects lifted." },
    ...risk.factors.map((text) => ({ title: "Parser risk", text }))
  ].filter(Boolean);
  const score = clamp(100 - issues.length * 9 - Math.max(0, target - estimated) / 650, 0, 100);
  const verdict = score >= 72 ? "FIXABLE" : score >= 45 ? "WATCH" : "REWORK BEFORE FIX";
  lastFixtureDoctor = {
    values,
    parsed,
    score: Math.round(score),
    verdict,
    issues,
    reportText: [
      "FOCUSEA AI FIXTURE DOCTOR",
      `Verdict: ${verdict}`,
      `Health score: ${Math.round(score)}/100`,
      `Cargo: ${parsed.cargoLabel}`,
      `Route: ${parsed.route || "TBC"}`,
      `TCE: ${money(estimated)}/day vs target ${money(target)}/day`,
      "",
      "Issues:",
      ...issues.map((item) => `- ${item.title}: ${item.text}`)
    ].join("\n")
  };
  fixtureDoctorResult.innerHTML = `
    ${metricCards([
      { label: "Verdict", value: verdict },
      { label: "Health", value: `${Math.round(score)}/100` },
      { label: "Cargo", value: parsed.cargoLabel },
      { label: "Issues", value: issues.length },
      { label: "TCE gap", value: money(estimated - target) }
    ])}
    <div class="decision-list">${issues.map((item) => `<div><span>${escapeHtml(item.title)}</span><strong>${escapeHtml(item.text)}</strong></div>`).join("") || "<small>No major issue found.</small>"}</div>
  `;
  renderDecisionHeader();
}

function renderCpBattle() {
  if (!cpBattleForm || !cpBattleResult) return;
  const values = collectFormValues(cpBattleForm);
  const analysis = analyzeClauseText(values.clauseText || "");
  const ownerWording = "Owners counter: NOR valid upon arrival at customary waiting place, and time lost waiting for berth to count as laytime unless caused by owners' default.";
  const chartererWording = "Charterers counter: time to count only after valid NOR and when vessel is at berth/ready in all respects; weather and port authority delays to be excluded.";
  const balanced = "Balanced broker wording: valid NOR to be expressly defined, waiting time to count only if berth unavailable and vessel is ready, with documented weather/authority exceptions.";
  const recommendation = values.side === "Owner" ? ownerWording : values.side === "Charterer" ? chartererWording : balanced;
  lastCpBattle = {
    values,
    analysis,
    recommendation,
    reportText: [
      "FOCUSEA CHARTER PARTY BATTLE MODE",
      `Side: ${values.side}`,
      `Risk owner: ${analysis.riskOwner}`,
      `Owner risk: ${analysis.ownerRisk}/100`,
      `Charterer risk: ${analysis.chartererRisk}/100`,
      "",
      "Owner wording:",
      ownerWording,
      "",
      "Charterer wording:",
      chartererWording,
      "",
      "Recommended wording:",
      recommendation
    ].join("\n")
  };
  cpBattleResult.innerHTML = `
    ${metricCards([
      { label: "Risk owner", value: analysis.riskOwner },
      { label: "Owner risk", value: `${analysis.ownerRisk}/100` },
      { label: "Charterer risk", value: `${analysis.chartererRisk}/100` },
      { label: "Acting side", value: escapeHtml(values.side) }
    ])}
    <ul class="compact-list"><li><strong>Owner wording:</strong> ${escapeHtml(ownerWording)}</li><li><strong>Charterer wording:</strong> ${escapeHtml(chartererWording)}</li><li><strong>Recommended:</strong> ${escapeHtml(recommendation)}</li></ul>
  `;
}

function renderTimeBar() {
  if (!timeBarForm || !timeBarResult) return;
  const values = collectFormValues(timeBarForm);
  const completion = new Date(values.completionDate);
  const deadline = new Date(completion.getTime() + (Number(values.timeBarDays) || 0) * 86400000);
  const daysLeft = Math.ceil((deadline - new Date()) / 86400000);
  const docsRisk = values.docsStatus === "missing" ? 36 : values.docsStatus === "partial" ? 18 : 4;
  const urgency = daysLeft <= 0 ? "TIME BAR TODAY / OVERDUE" : daysLeft <= 7 ? "Critical" : daysLeft <= 30 ? "Watch" : "Normal";
  const score = clamp((daysLeft <= 0 ? 90 : daysLeft <= 7 ? 72 : daysLeft <= 30 ? 42 : 18) + docsRisk, 0, 100);
  lastTimeBar = {
    values,
    deadline,
    daysLeft,
    urgency,
    score,
    reportText: [
      "FOCUSEA TIME BAR ALARM",
      `Claim: ${values.claimType}`,
      `Completion: ${values.completionDate}`,
      `Deadline: ${deadline.toISOString().slice(0, 10)}`,
      `Days left: ${daysLeft}`,
      `Docs: ${values.docsStatus}`,
      `Urgency: ${urgency}`,
      `Risk score: ${score}/100`
    ].join("\n")
  };
  timeBarResult.innerHTML = `
    ${metricCards([
      { label: "Claim", value: escapeHtml(values.claimType) },
      { label: "Deadline", value: deadline.toISOString().slice(0, 10) },
      { label: "Days left", value: daysLeft },
      { label: "Urgency", value: urgency },
      { label: "Risk", value: `${score}/100` }
    ])}
    <small>${score >= 70 ? "Send claim pack and reserve rights immediately." : "Keep documents and reminders attached to Deal Room."}</small>
  `;
  renderDecisionHeader();
}

function renderRateMemory() {
  if (!rateMemoryForm || !rateMemoryResult) return;
  const values = collectFormValues(rateMemoryForm);
  const cargo = getCargoProfile(values.cargoType);
  const rows = decisionRateMemory.filter((item) => item.cargoType === values.cargoType || item.route.toLowerCase() === String(values.route).toLowerCase());
  const avgRate = rows.length ? rows.reduce((sum, item) => sum + Number(item.freightRate || 0), 0) / rows.length : cargo.baseFreight;
  const avgDem = rows.length ? rows.reduce((sum, item) => sum + Number(item.demurrageRate || 0), 0) / rows.length : cargo.baseFreight * 850;
  const fixed = decisionRateMemory.filter((item) => item.fixtureStatus === "Fixed").length;
  const fixRate = decisionRateMemory.length ? (fixed / decisionRateMemory.length) * 100 : 0;
  lastRateMemory = {
    values,
    avgRate,
    avgDem,
    fixRate,
    reportText: [
      "FOCUSEA FREIGHT RATE MEMORY",
      `Cargo: ${cargo.label}`,
      `Route: ${values.route}`,
      `Average rate: ${money(avgRate, 2)}/${cargo.unit}`,
      `Average demurrage: ${money(avgDem)}/day`,
      `Fix rate: ${fixRate.toFixed(1)}%`,
      `Samples: ${decisionRateMemory.length}`
    ].join("\n")
  };
  rateMemoryResult.innerHTML = `
    ${metricCards([
      { label: "Samples", value: decisionRateMemory.length },
      { label: "Avg rate", value: `${money(avgRate, 2)}/${cargo.unit}` },
      { label: "Avg demurrage", value: `${money(avgDem)}/day` },
      { label: "Fix rate", value: `${fixRate.toFixed(1)}%` }
    ])}
    <div class="decision-list">${decisionRateMemory.slice(0, 5).map((item) => `<div><span>${escapeHtml(item.fixtureStatus)}</span><strong>${escapeHtml(item.route)} | ${escapeHtml(getCargoProfile(item.cargoType).label)} | ${money(item.freightRate, 2)}</strong></div>`).join("")}</div>
  `;
}

function addRateMemoryEntry() {
  if (!rateMemoryForm) return;
  const values = collectFormValues(rateMemoryForm);
  decisionRateMemory.unshift({
    cargoType: values.cargoType,
    route: values.route,
    freightRate: Number(values.freightRate) || 0,
    demurrageRate: Number(values.demurrageRate) || 0,
    fixtureStatus: values.fixtureStatus,
    tce: Number(performanceForm?.elements.targetTce?.value) || 0
  });
  safeLocalSet("focusea-decision-rate-memory-v1", decisionRateMemory);
  renderRateMemory();
  renderPerformance();
}

function renderPerformance() {
  if (!performanceForm || !performanceResult) return;
  const values = collectFormValues(performanceForm);
  const target = Number(values.targetTce) || 0;
  const fixed = decisionRateMemory.filter((item) => item.fixtureStatus === "Fixed");
  const avgTce = decisionRateMemory.length ? decisionRateMemory.reduce((sum, item) => sum + Number(item.tce || 0), 0) / decisionRateMemory.length : 0;
  const fixRate = decisionRateMemory.length ? (fixed.length / decisionRateMemory.length) * 100 : 0;
  const cargoProfit = Object.entries(cargoProfiles).map(([key, cargo]) => ({
    key,
    cargo,
    avg: decisionRateMemory.filter((item) => item.cargoType === key).reduce((sum, item) => sum + Number(item.freightRate || 0), 0)
  })).sort((a, b) => b.avg - a.avg)[0];
  const score = clamp((avgTce / Math.max(target, 1)) * 55 + fixRate, 0, 100);
  lastPerformance = {
    values,
    avgTce,
    fixRate,
    score,
    reportText: [
      "FOCUSEA BROKER PERFORMANCE DASHBOARD",
      `Period: ${values.period}`,
      `Offers: ${decisionRateMemory.length}`,
      `Fixed: ${fixed.length}`,
      `Fix rate: ${fixRate.toFixed(1)}%`,
      `Average TCE: ${money(avgTce)}/day`,
      `Score: ${score.toFixed(0)}/100`
    ].join("\n")
  };
  performanceResult.innerHTML = `
    ${metricCards([
      { label: "Offers", value: decisionRateMemory.length },
      { label: "Fixed", value: fixed.length },
      { label: "Fix rate", value: `${fixRate.toFixed(1)}%` },
      { label: "Avg TCE", value: `${money(avgTce)}/day` },
      { label: "Score", value: `${score.toFixed(0)}/100` },
      { label: "Best cargo", value: cargoProfit?.cargo.label || "-" }
    ])}
    <small>${score >= 70 ? "Performance is strong; protect it with better data capture." : "Improve by logging every failed/countered offer and TCE reason."}</small>
  `;
}

function renderEmailInboxSimulator() {
  if (!emailInboxSimulatorForm || !emailInboxSimulatorResult) return;
  const values = collectFormValues(emailInboxSimulatorForm);
  const parsed = parseOfferText(values.emailText || "");
  const lower = String(values.emailText || "").toLowerCase();
  const folder = lower.includes("subject") || lower.includes("deadline") || lower.includes("lift") ? "Subjects expiring" : lower.includes("counter") ? "Counter needed" : lower.includes("claim") ? "Claim reminder" : "New offer";
  const priority = /today|1700|deadline|fail|urgent/.test(lower) ? "High" : "Medium";
  lastEmailInboxSimulation = {
    values,
    parsed,
    folder,
    priority,
    reportText: [
      "FOCUSEA AI EMAIL INBOX SIMULATOR",
      `Folder: ${folder}`,
      `Priority: ${priority}`,
      `Cargo: ${parsed.cargoLabel}`,
      `Route: ${parsed.route || "TBC"}`,
      `Action: ${folder === "Subjects expiring" ? "Chase subject deadline now." : "Create offer card and request missing fields."}`
    ].join("\n")
  };
  emailInboxSimulatorResult.innerHTML = `
    ${metricCards([
      { label: "Folder", value: folder },
      { label: "Priority", value: priority },
      { label: "Cargo", value: parsed.cargoLabel },
      { label: "Route", value: parsed.route || "-" }
    ])}
    <small>${folder === "Subjects expiring" ? "Escalate before the vessel fails." : "Inbox card ready."}</small>
  `;
}

function pushSimulatedEmailToInbox() {
  if (!lastEmailInboxSimulation) renderEmailInboxSimulator();
  if (!lastEmailInboxSimulation) return;
  const { parsed, folder, priority } = lastEmailInboxSimulation;
  terminalInboxItems.unshift({
    id: `SIM-${3000 + terminalInboxItems.length}`,
    status: folder === "Subjects expiring" ? "Subjects deadline" : folder,
    priority,
    cargo: parsed.cargoLabel,
    route: parsed.route || "Route TBC",
    laycan: parsed.laycan || "Laycan TBC",
    freight: parsed.freight ? `${money(parsed.freight, 2)}/${parsed.unit}` : "TBC",
    demurrage: parsed.demurrage ? `${money(parsed.demurrage)}/day` : "TBC",
    subject: parsed.subjects || "Subject TBC",
    note: "Created by Decision Lab inbox simulator."
  });
  renderBrokerInbox();
  renderEmailInboxSimulator();
  emailInboxSimulatorResult?.insertAdjacentHTML("beforeend", `<small class="download-confirm">Added to Broker Inbox as ${terminalInboxItems[0].id}</small>`);
}

function renderRecapToCp() {
  if (!recapToCpForm || !recapToCpResult) return;
  const values = collectFormValues(recapToCpForm);
  const parsed = parseOfferText(values.recapText || "");
  const draft = [
    `${values.template.toUpperCase()} CHARTER PARTY DRAFT`,
    `Fixture basis: ${parsed.quantity ? parsed.quantity.toLocaleString("en-US") : "[qty]"} ${parsed.unit} ${parsed.cargoLabel}.`,
    `Load/Discharge: ${parsed.route || "[load/discharge TBC]"}.`,
    `Laycan: ${parsed.laycan || "[laycan TBC]"}.`,
    `Freight: ${parsed.freight ? `${money(parsed.freight, 2)}/${parsed.unit}` : "[freight TBC]"}.`,
    `Demurrage: ${parsed.demurrage ? `${money(parsed.demurrage)}/day pro rata` : "[demurrage TBC]"}.`,
    `Commission: ${parsed.commission ? `${parsed.commission}% total` : "[commission TBC]"}.`,
    "NOR, weather exceptions, taxes, agency, cargo documents and sanctions compliance to be expressly agreed.",
    "All details remain subject to final CP review and clean recap confirmation."
  ].join("\n");
  lastRecapToCp = { values, parsed, draft, reportText: draft };
  recapToCpResult.innerHTML = `
    ${metricCards([
      { label: "Template", value: escapeHtml(values.template) },
      { label: "Cargo", value: parsed.cargoLabel },
      { label: "Route", value: parsed.route || "-" },
      { label: "Open fields", value: parsed.missing.length }
    ])}
    <pre class="template-preview">${escapeHtml(draft)}</pre>
  `;
}

function renderWhatIf() {
  if (!whatIfForm || !whatIfResult) return;
  const values = collectFormValues(whatIfForm);
  const freightImpact = (Number(values.freightChange) || 0) * (Number(values.quantity) || 0);
  const bunkerImpact = (Number(values.bunkerChange) || 0) * (Number(values.bunkerTons) || 0);
  const delayImpact = (Number(values.portDelay) || 0) * (Number(values.dailyHire) || 0);
  const adjustedPnl = (Number(values.basePnl) || 0) + freightImpact - bunkerImpact - delayImpact;
  const recommendation = adjustedPnl > Number(values.basePnl) ? "Freight counter improves the deal." : adjustedPnl > 0 ? "Deal stays positive but margin is thinner." : "Avoid unless freight or demurrage improves.";
  lastWhatIf = {
    values,
    freightImpact,
    bunkerImpact,
    delayImpact,
    adjustedPnl,
    recommendation,
    reportText: [
      "FOCUSEA VOYAGE WHAT-IF LAB",
      `Base P&L: ${money(values.basePnl)}`,
      `Freight impact: ${money(freightImpact)}`,
      `Bunker impact: -${money(bunkerImpact)}`,
      `Delay impact: -${money(delayImpact)}`,
      `Adjusted P&L: ${money(adjustedPnl)}`,
      `Recommendation: ${recommendation}`
    ].join("\n")
  };
  whatIfResult.innerHTML = `
    ${metricCards([
      { label: "Freight", value: money(freightImpact) },
      { label: "Bunker", value: `-${money(bunkerImpact)}` },
      { label: "Delay", value: `-${money(delayImpact)}` },
      { label: "Adjusted P&L", value: money(adjustedPnl) }
    ])}
    <small>${escapeHtml(recommendation)}</small>
  `;
  renderDecisionHeader();
}

function renderDisputeSimulator() {
  if (!disputeSimulatorForm || !disputeSimulatorResult) return;
  const values = collectFormValues(disputeSimulatorForm);
  const lower = String(values.disputeText || "").toLowerCase();
  const ownerStrength = clamp(45 + (lower.includes("waiting") ? 18 : 0) + (lower.includes("nor") ? 12 : 0) - (lower.includes("rain") ? 10 : 0), 0, 100);
  const chartererStrength = clamp(45 + (lower.includes("rain") ? 18 : 0) + (lower.includes("deduct") ? 12 : 0) - (lower.includes("waiting") ? 8 : 0), 0, 100);
  const settlement = values.style === "Owner aggressive"
    ? "Press full claim, but reserve fallback on rain deduction."
    : values.style === "Charterer defensive"
      ? "Reject berth waiting if NOR validity is weak; accept documented used time only."
      : "Settle by allowing documented rain deduction and splitting ambiguous waiting time.";
  lastDisputeSimulation = {
    values,
    ownerStrength,
    chartererStrength,
    settlement,
    reportText: [
      "FOCUSEA DISPUTE SIMULATOR",
      `Owner argument strength: ${ownerStrength}/100`,
      `Charterer defense strength: ${chartererStrength}/100`,
      `Broker settlement: ${settlement}`,
      "",
      "Owner argument:",
      "Waiting time and valid NOR language support demurrage if vessel was ready.",
      "",
      "Charterer defense:",
      "Weather/rain and NOR validity must be proven before all time can count."
    ].join("\n")
  };
  disputeSimulatorResult.innerHTML = `
    ${metricCards([
      { label: "Owner", value: `${ownerStrength}/100` },
      { label: "Charterer", value: `${chartererStrength}/100` },
      { label: "Style", value: escapeHtml(values.style) }
    ])}
    <ul class="compact-list"><li><strong>Owner:</strong> Waiting/NOR wording can support claim.</li><li><strong>Charterer:</strong> Rain and readiness evidence can reduce claim.</li><li><strong>Settlement:</strong> ${escapeHtml(settlement)}</li></ul>
  `;
}

function renderWatchlist() {
  if (!watchlistForm || !watchlistResult) return;
  const values = collectFormValues(watchlistForm);
  const high = decisionWatchlist.filter((item) => item.severity === "High").length;
  const score = clamp(decisionWatchlist.reduce((sum, item) => sum + decisionSeverityWeight(item.severity), 0) / Math.max(decisionWatchlist.length, 1), 0, 100);
  lastWatchlist = {
    values,
    score,
    reportText: [
      "FOCUSEA COMPANY WATCHLIST",
      `Entries: ${decisionWatchlist.length}`,
      `High severity: ${high}`,
      `Average risk: ${score.toFixed(0)}/100`,
      ...decisionWatchlist.map((item) => `- ${item.company}: ${item.issue} / ${item.severity} / ${item.note}`)
    ].join("\n")
  };
  watchlistResult.innerHTML = `
    ${metricCards([
      { label: "Entries", value: decisionWatchlist.length },
      { label: "High risk", value: high },
      { label: "Avg risk", value: `${score.toFixed(0)}/100` }
    ])}
    <div class="decision-list">${decisionWatchlist.slice(0, 6).map((item) => `<div><span>${escapeHtml(item.severity)} | ${escapeHtml(item.issue)}</span><strong>${escapeHtml(item.company)} - ${escapeHtml(item.note)}</strong></div>`).join("")}</div>
  `;
}

function addWatchlistEntry() {
  if (!watchlistForm) return;
  const values = collectFormValues(watchlistForm);
  decisionWatchlist.unshift({ company: values.company, issue: values.issue, severity: values.severity, note: values.note });
  safeLocalSet("focusea-decision-watchlist-v1", decisionWatchlist);
  renderWatchlist();
}

function renderPortHeatmap() {
  if (!portHeatmapForm || !portHeatmapResult) return;
  const values = collectFormValues(portHeatmapForm);
  const cargo = getCargoProfile(values.cargoType);
  const rows = Object.values(ports).slice(0, 10).map((port, index) => {
    const base = (port.risks?.length || 2) * 12 + liveFeedState.congestion * 0.35 + cargo.risk * 0.18 + index;
    return {
      port,
      delay: clamp(Math.round(base), 8, 92),
      waiting: Math.max(0.4, (base / 28)).toFixed(1)
    };
  }).sort((a, b) => b.delay - a.delay);
  lastPortHeatmap = {
    values,
    rows,
    reportText: [
      "FOCUSEA PORT DELAY HEATMAP",
      `Region: ${values.region}`,
      `Cargo: ${cargo.label}`,
      ...rows.map((row) => `${row.port.name}: ${row.delay}/100, wait ${row.waiting} days`)
    ].join("\n")
  };
  portHeatmapResult.innerHTML = `
    ${metricCards([
      { label: "Ports", value: rows.length },
      { label: "Highest risk", value: rows[0]?.port.name || "-" },
      { label: "Cargo", value: cargo.label }
    ])}
    <div class="heatmap-table">${rows.map((row) => `<div class="heatmap-row"><div><span>${escapeHtml(row.port.country)}</span><strong>${escapeHtml(row.port.name)}</strong></div><div><span>Delay</span><strong>${row.delay}/100</strong></div><div><span>Wait</span><strong>${row.waiting}d</strong></div><div class="heatmap-risk"><em style="width:${row.delay}%"></em></div></div>`).join("")}</div>
  `;
}

function renderBrokerExam() {
  if (!brokerExamForm || !brokerExamResult) return;
  const values = collectFormValues(brokerExamForm);
  const correct = {
    offer: "watch",
    clause: "counter",
    laytime: "watch",
    counter: "counter"
  }[values.scenario];
  const isCorrect = values.answer === correct;
  const scenarioText = {
    offer: "Freight is close, but laycan is narrow and receiver subject is open.",
    clause: "Clause shifts berth waiting to laytime without clean exception wording.",
    laytime: "Rain period is deducted, but NOR validity is not proven.",
    counter: "Mail is polite but misses demurrage and subject deadline."
  }[values.scenario];
  lastBrokerExam = {
    values,
    correct,
    isCorrect,
    reportText: [
      "FOCUSEA BROKER EXAM",
      `Scenario: ${values.scenario}`,
      `Question: ${scenarioText}`,
      `Answer: ${values.answer}`,
      `Correct: ${correct}`,
      `Result: ${isCorrect ? "Correct" : "Review needed"}`
    ].join("\n")
  };
  brokerExamResult.innerHTML = `
    ${metricCards([
      { label: "Scenario", value: escapeHtml(values.scenario) },
      { label: "Your answer", value: escapeHtml(values.answer) },
      { label: "Correct", value: correct },
      { label: "Result", value: isCorrect ? "Correct" : "Review" }
    ])}
    <small>${escapeHtml(scenarioText)} ${isCorrect ? "Good commercial instinct." : "Better answer: " + correct + "."}</small>
  `;
}

function decisionLabReportText() {
  return [
    "FOCUSEA DECISION LAB PACK",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    lastAutoDealProcessor?.reportText || "Auto Deal Processor not generated.",
    "",
    lastFixtureDoctor?.reportText || "Fixture Doctor not generated.",
    "",
    lastCpBattle?.reportText || "CP Battle not generated.",
    "",
    lastTimeBar?.reportText || "Time Bar not generated.",
    "",
    lastRecapToCp?.reportText || "CP Draft not generated.",
    "",
    lastWhatIf?.reportText || "What-If not generated.",
    "",
    lastDisputeSimulation?.reportText || "Dispute not generated.",
    "",
    lastWatchlist?.reportText || "Watchlist not generated.",
    "",
    lastPortHeatmap?.reportText || "Port Heatmap not generated.",
    "",
    lastBrokerExam?.reportText || "Broker Exam not generated."
  ].join("\n");
}

function handleDecisionLabDownload(type) {
  if (type.startsWith("auto-deal") && !lastAutoDealProcessor) renderAutoDealProcessor();
  if (!lastFixtureDoctor) renderFixtureDoctor();
  if (!lastCpBattle) renderCpBattle();
  if (!lastRecapToCp) renderRecapToCp();
  if (!lastDisputeSimulation) renderDisputeSimulator();
  const actions = {
    "auto-deal-pdf": () => downloadPdfFile("focusea-auto-deal-workflow.pdf", "Focusea Auto Deal Workflow", lastAutoDealProcessor?.reportText || decisionLabReportText()),
    "auto-deal-json": () => downloadJsonFile("focusea-auto-deal-workflow.json", lastAutoDealProcessor || {}),
    "auto-deal-txt": () => downloadTextFile("focusea-auto-deal-recap-mail.txt", [
      lastAutoDealProcessor?.recap || "No recap generated.",
      "",
      lastAutoDealProcessor?.mail || "No mail generated.",
      "",
      lastAutoDealProcessor?.claimLetter || "No claim letter generated."
    ].join("\n")),
    "doctor-pdf": () => downloadPdfFile("focusea-fixture-doctor.pdf", "Focusea Fixture Doctor", lastFixtureDoctor?.reportText || decisionLabReportText()),
    "doctor-json": () => downloadJsonFile("focusea-fixture-doctor.json", lastFixtureDoctor || {}),
    "cp-battle-txt": () => downloadTextFile("focusea-cp-battle.txt", lastCpBattle?.reportText || decisionLabReportText()),
    "cp-draft-pdf": () => downloadPdfFile("focusea-cp-draft.pdf", "Focusea CP Draft", lastRecapToCp?.reportText || decisionLabReportText()),
    "cp-draft-txt": () => downloadTextFile("focusea-cp-draft.txt", lastRecapToCp?.reportText || decisionLabReportText()),
    "dispute-pdf": () => downloadPdfFile("focusea-dispute-simulator.pdf", "Focusea Dispute Simulator", lastDisputeSimulation?.reportText || decisionLabReportText())
  };
  actions[type]?.();
  const target = type.startsWith("auto-deal") ? autoDealProcessorResult
    : type.startsWith("doctor") ? fixtureDoctorResult
    : type.startsWith("cp-battle") ? cpBattleResult
      : type.startsWith("cp-draft") ? recapToCpResult
        : disputeSimulatorResult;
  target?.insertAdjacentHTML("beforeend", `<small class="download-confirm">Downloaded: ${escapeHtml(window.focuseaLastDownload?.filename || type)}</small>`);
}

function runFullDecisionLab() {
  renderAutoDealProcessor();
  renderFixtureDoctor();
  renderCpBattle();
  renderTimeBar();
  renderRateMemory();
  renderPerformance();
  renderEmailInboxSimulator();
  renderRecapToCp();
  renderWhatIf();
  renderDisputeSimulator();
  renderWatchlist();
  renderPortHeatmap();
  renderBrokerExam();
  renderDecisionHeader();
}

const commandTheaterScenarios = {
  broker: {
    title: "Broker Intake",
    headline: "Fixture mailini al, Focusea ticari karari ve aksiyonu uretsin.",
    summary: "Tek bir offer metninden cargo, rota, freight, demurrage, risk, TCE, recap ve broker maili cikarilir.",
    score: 94,
    decision: "Fix with guards",
    metrics: [
      { label: "Workflow time", value: "42 sec", score: 92 },
      { label: "TCE confidence", value: "88%", score: 88 },
      { label: "Risk clarity", value: "91/100", score: 91 },
      { label: "Document output", value: "5 files", score: 96 }
    ],
    story: [
      "Kullanici WhatsApp/mail offer metnini yapistirir.",
      "Focusea cargo, laycan, load/disport, freight, demurrage ve subjects alanlarini ayiklar.",
      "Voyage estimate, P&L, TCE ve risk radari ayni ekranda hesaplanir.",
      "Sistem broker'a counter wording, recap ve client-safe mail taslagi verir."
    ],
    proof: [
      ["Data trust", "Bunker/index kartlari kaynak ve live/simulated etiketiyle ayrilir."],
      ["Commercial brain", "Cargo tipi rate, bunker, port cost ve demurrage katsayilarini degistirir."],
      ["Action layer", "PDF, JSON, TXT ve mail ciktisi tek tikla indirilebilir."],
      ["Memory", "Report history ve CRM mantigi kullanici hafizasi gibi calisir."]
    ],
    script: [
      "1. Bu ekranda sadece bilgi gostermiyoruz; bir broker'in is akisini bitiriyoruz.",
      "2. Offer paste ediliyor, sistem alanlari cikariyor ve eksikleri soyluyor.",
      "3. Sonra TCE, P&L, demurrage exposure ve risk radari olusuyor.",
      "4. En sonda recap, mail ve rapor indiriliyor. Yani site karar + belge + aksiyon uretiyor."
    ],
    matrix: [
      ["Fixture parser", "Offer metninden deal room olusturur", "Ready"],
      ["TCE/P&L engine", "Freight, bunker, hire, port cost hesabi", "Ready"],
      ["Broker mail studio", "Firm offer / counter / recap maili", "Ready"],
      ["Deal risk radar", "Fix / Watch / Avoid karari", "Ready"],
      ["Backend sync", "Kullanici hesabi ve kayitli fixture", "API-ready"]
    ]
  },
  turkiye: {
    title: "Turkiye Port Ops",
    headline: "Turk limanlari icin broker, acente ve operasyon zekasi.",
    summary: "Mersin, Ambarli, Izmir, Aliaga, Gemlik, Izmit, Tekirdag, Iskenderun ve Samsun uzerinden evrak, draft, bekleme ve cost riskleri okunur.",
    score: 91,
    decision: "Ops desk ready",
    metrics: [
      { label: "Port coverage", value: "9 TR hubs", score: 86 },
      { label: "Docs clarity", value: "93%", score: 93 },
      { label: "Waiting risk", value: "Live model", score: 84 },
      { label: "Cost desk", value: "PDA-ready", score: 90 }
    ],
    story: [
      "Broker limani secer ve cargo/draft bilgisi girer.",
      "Focusea draft margin, pilotage/tug ihtiyaci, local docs ve agency notlarini gosterir.",
      "SOF/NOR Turkiye sablonu ile rain letter, shifting, waiting ve time-bar takip edilir.",
      "Port cost estimator tahmini PDA mantigiyla ticari riske baglanir."
    ],
    proof: [
      ["Local intelligence", "Turkiye limanlari genel atlas degil, operasyon notlariyla verilir."],
      ["SOF/NOR workflow", "Claim icin gereken olaylar liman sablonuna baglanir."],
      ["Suitability", "Cargo + port + draft uygunluk karari uretilir."],
      ["Import layer", "UN/LOCODE veya resmi CSV ile atlas genisletmeye hazir."]
    ],
    script: [
      "1. Burada fark su: liman sadece haritada nokta degil, ticari karar motoru.",
      "2. Draft, docs, bekleme, pilotage ve local cost ayni workflow'a giriyor.",
      "3. Kullanici Turkiye limanlarini ders, broker is akisi ve operasyon raporu olarak kullanabiliyor."
    ],
    matrix: [
      ["Turkiye port profile", "Draft, docs, pilotage, tug, waiting risk", "Ready"],
      ["Port cost estimator", "Pilotage/towage/agency/port dues tahmini", "Ready"],
      ["Cabotage module", "Ic hat rota, sure, bunker, mevzuat notu", "Ready"],
      ["Agency notes", "Kullanici terminal hafizasi", "Ready"],
      ["Official import", "Resmi veriyle port atlas genisletme", "Ready"]
    ]
  },
  claim: {
    title: "Claim Control",
    headline: "SOF, NOR ve clause metninden demurrage savas dosyasi.",
    summary: "Statement of Facts olaylari zaman cizelgesine ayrilir, laytime/demurrage hesaplanir, evidence checklist ve claim letter uretilir.",
    score: 89,
    decision: "Claim pack strong",
    metrics: [
      { label: "SOF events", value: "Auto map", score: 87 },
      { label: "Evidence gaps", value: "Flagged", score: 90 },
      { label: "Clause risk", value: "Red/yellow", score: 88 },
      { label: "PDF claim", value: "1 click", score: 94 }
    ],
    story: [
      "Kullanici SOF/NOR/CP clause metnini yapistirir.",
      "Sistem NOR tendered, berth, loading, rain stop, completion olaylarini ayiklar.",
      "Allowed time, used time, demurrage/dispatch ve evidence riskleri hesaplanir.",
      "Claim letter, invoice taslagi ve time-bar alarmi uretilir."
    ],
    proof: [
      ["Legal workflow", "Owner/charterer lehine clause riski aciklanir."],
      ["Evidence checklist", "NOR, SOF, rain log, photos, invoice eksikleri gosterilir."],
      ["CP diff", "Iki charter party arasindaki kritik farklar yakalanir."],
      ["Time-bar calendar", "Claim ve invoice tarihleri kirmizi/sari/yesil izlenir."]
    ],
    script: [
      "1. Normal siteler demurrage tanimi verir; Focusea claim dosyasi uretir.",
      "2. SOF olaylari timeline'a doner, laytime hesabi yapilir.",
      "3. Eksik evidence gorunur ve PDF claim pack indirilebilir."
    ],
    matrix: [
      ["SOF analyzer", "Olaylari laytime timeline'a cevirir", "Ready"],
      ["Clause risk engine", "Owner/charterer lehine risk analizi", "Ready"],
      ["Claim letter", "Demurrage claim metni uretir", "Ready"],
      ["Evidence pack", "Eksik belgeleri listeler", "Ready"],
      ["Dispute score", "Claim gucu ve tartisma riski", "Ready"]
    ]
  },
  market: {
    title: "Market Risk",
    headline: "Index, bunker, haber ve port gecikmesini deal riskine bagla.",
    summary: "Market terminali BDI/BDTI/BCTI/SCFI alanlarini, bunker snapshot'ini, haberleri ve weather/port riskini tek karar skoruna baglar.",
    score: 87,
    decision: "Source-aware terminal",
    metrics: [
      { label: "Index lane", value: "BDI/SCFI", score: 82 },
      { label: "Bunker lane", value: "Verified tag", score: 88 },
      { label: "News lane", value: "Source links", score: 86 },
      { label: "Deal impact", value: "Auto alerts", score: 90 }
    ],
    story: [
      "Kullanici bir deal acikken market ve haber panelini gorur.",
      "Bunker artisi, port congestion, weather risk ve cargo sentiment deal kartina etki eder.",
      "Her veri kartinda source, last updated, live/simulated/licensed-required etiketi bulunur.",
      "Sistem broker'a 'bu fixture artik Watch' gibi aksiyon onerir."
    ],
    proof: [
      ["No fake-live rule", "Lisans gerektiren Baltic verisi acikca API/licensed-ready diye etiketlenir."],
      ["Bunker defaults", "Formlardaki bunker alanlari merkezi snapshot ile tutarli olur."],
      ["News bulletin", "Son dakika haberleri linkli kaynak mantigiyla listelenir."],
      ["Alert bridge", "Market olayi acik fixture riskine baglanir."]
    ],
    script: [
      "1. Bu kisim guven katmani: veri nereden geliyor, guncel mi, simule mi acikca gorunuyor.",
      "2. Market sadece tablo degil; bunker/index/haber hareketi deal kararina baglaniyor.",
      "3. Boylece broker 'bu bilgi benim fixture'imi nasil etkiler?' sorusuna cevap aliyor."
    ],
    matrix: [
      ["Market confidence badge", "Verified/API-ready/simulated/source label", "Ready"],
      ["Baltic panel", "BDI/BDTI/BCTI/SCFI veri alani", "API-ready"],
      ["Bunker snapshot", "Tek merkezden fiyat varsayimi", "Ready"],
      ["News bulletin", "Kaynak linkli denizcilik haberleri", "Ready"],
      ["Deal alert", "Market sokunu acik deal'e baglar", "Ready"]
    ]
  },
  loadicator: {
    title: "Load Plan Bridge",
    headline: "Yuk plani, trim, heel, GM, ballast ve rapor akisi sahnede.",
    summary: "Ana site ticari karari verir, yan Load-Stability Lab ise yuk dagilimi, sancak/iskele, ballast, SF/BM ve auto-balance mantigini gostermek icin acilir.",
    score: 90,
    decision: "Engineering bridge ready",
    metrics: [
      { label: "Views", value: "Side/top/iso", score: 88 },
      { label: "Cargo logic", value: "Multi cargo", score: 86 },
      { label: "Balance", value: "Auto advice", score: 91 },
      { label: "Report", value: "Load plan", score: 93 }
    ],
    story: [
      "Kullanici konteyner, coal, grain, ore veya project cargo secip holdlara koyar.",
      "Sistem agirlik, KG, port/stbd offset, trim, heel ve GM degisimini canli hesaplar.",
      "Ballast tanklari ve auto-balance onerileriyle plan duzeltilir.",
      "Load plan report indirip ana Super Suite raporuna baglanir."
    ],
    proof: [
      ["Engineering vocabulary", "GM, KG, KM, trim, heel, draft, SF/BM paneli vardir."],
      ["Port/stbd awareness", "Sancak-iskele offset heel hesabina girer."],
      ["Cargo slots", "Yukler hold bazli kalir, kullanici isterse siler."],
      ["Side-site bridge", "Yan site ayri pencere gibi muhendislik unitesi olur."]
    ],
    script: [
      "1. Focusea sadece broker terminali degil; yuk-stabilite tarafina da baglaniyor.",
      "2. Yuku nereye koyarsan trim, heel ve GM degisiyor.",
      "3. Auto balance onerisi ve PDF load plan raporu ile muhendislik gosterimi tamamlanir."
    ],
    matrix: [
      ["3D/load view", "Side/top/iso gemi perspektifi", "Ready"],
      ["Multi cargo plan", "Konteyner, bulk, ore, project cargo", "Ready"],
      ["Port/stbd heel", "Sancak-iskele dagilim hesabi", "Ready"],
      ["Ballast tanks", "Fore/aft/wing tank duzeltme mantigi", "Ready"],
      ["SF/BM chart", "Shear force ve bending moment paneli", "Ready"]
    ]
  },
  investor: {
    title: "Product Roadmap",
    headline: "Focusea'yi okul projesi degil, gercek urun gibi konumlandir.",
    summary: "Moduller tek urun diline baglanir: broker terminali, market intelligence, claim automation, port ops, loadicator bridge, academy ve backend-ready roadmap.",
    score: 96,
    decision: "Pitch ready",
    metrics: [
      { label: "Product pillars", value: "7", score: 96 },
      { label: "Exports", value: "PDF/JSON/TXT", score: 94 },
      { label: "Differentiator", value: "Paste -> action", score: 98 },
      { label: "Roadmap", value: "Backend ready", score: 92 }
    ],
    story: [
      "Focusea'nin farki tek modul degil, uctan uca is akisi olmasi.",
      "Kullanici metin yapistirir; sistem hesap, risk, belge, mail ve takip planini hazirlar.",
      "Market, port, claim ve loadicator birbirine baglanir.",
      "Backend, user account, OCR ve licensed data entegrasyonuna hazir product roadmap sunulur."
    ],
    proof: [
      ["Product depth", "40+ Super Suite modulu ayni deal context'inde calisir."],
      ["Download proof", "Raporlar gercek dosya olarak iner."],
      ["Trust layer", "Kaynak, guncelleme ve confidence etiketi kullanilir."],
      ["Scalability", "FastAPI/Python engine ayri deploy edilebilir."]
    ],
    script: [
      "1. Bu proje bir landing page degil; broker'in gunluk isini bitiren terminal.",
      "2. Farkimiz: kullanici metin giriyor, sistem hesapliyor, riskliyor, belge ve mail uretiyor.",
      "3. Sonraki seviye backend, hesapli kullanici, OCR ve lisansli veri kaynaklari.",
      "4. Yani Focusea hem egitim hem ticari operasyon hem de muhendislik araci olarak genisler."
    ],
    matrix: [
      ["Broker terminal", "Offer -> TCE -> risk -> mail", "Ready"],
      ["Claim automation", "SOF -> laytime -> claim pack", "Ready"],
      ["Market intelligence", "Index/bunker/news/source layer", "Ready"],
      ["Port ops", "TR/global port intelligence", "Ready"],
      ["Backend roadmap", "Accounts, OCR, reports, API", "API-ready"]
    ]
  }
};

function theaterStatusClass(status) {
  if (/api/i.test(status)) return "api-ready";
  if (/ready/i.test(status)) return "verified";
  return "simulated";
}

function theaterReportText(scenario = commandTheaterScenarios[selectedTheaterScenario]) {
  return reportLines("FOCUSEA WORKFLOW CONTROL REPORT", [
    `Scenario: ${scenario.title}`,
    `Decision: ${scenario.decision}`,
    `Workflow score: ${scenario.score}/100`,
    "",
    "Executive summary:",
    scenario.summary,
    "",
    "Storyline:",
    ...scenario.story.map((item, index) => `${index + 1}. ${item}`),
    "",
    "KPI radar:",
    ...scenario.metrics.map((item) => `- ${item.label}: ${item.value} (${item.score}/100)`),
    "",
    "Proof stack:",
    ...scenario.proof.map(([title, text]) => `- ${title}: ${text}`),
    "",
    "Action script:",
    ...scenario.script,
    "",
    "Feature matrix:",
    ...scenario.matrix.map(([name, output, status]) => `- ${name}: ${output} [${status}]`)
  ]);
}

function renderCommandTheater(id = selectedTheaterScenario) {
  const scenario = commandTheaterScenarios[id] || commandTheaterScenarios.broker;
  selectedTheaterScenario = Object.keys(commandTheaterScenarios).includes(id) ? id : "broker";
  theaterScenarioButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.theaterScenario === selectedTheaterScenario);
  });
  if (theaterHeadline) theaterHeadline.textContent = scenario.headline;
  if (theaterSummary) theaterSummary.textContent = scenario.summary;
  if (theaterScore) theaterScore.textContent = scenario.score;
  if (theaterDecision) theaterDecision.textContent = scenario.decision;
  if (theaterStory) {
    theaterStory.innerHTML = `
      ${metricCards([
        { label: "Scenario", value: escapeHtml(scenario.title) },
        { label: "Decision", value: escapeHtml(scenario.decision) },
        { label: "Workflow score", value: `${scenario.score}/100` },
        { label: "Export pack", value: "PDF / JSON / TXT" }
      ])}
      <div class="theater-timeline">${scenario.story.map((item, index) => `
        <div>
          <span>${String(index + 1).padStart(2, "0")}</span>
          <p>${escapeHtml(item)}</p>
        </div>
      `).join("")}</div>
    `;
  }
  if (theaterRadar) {
    theaterRadar.innerHTML = `
      ${metricCards(scenario.metrics.map((metric) => ({
        label: escapeHtml(metric.label),
        value: escapeHtml(metric.value)
      })))}
      <div class="theater-radar-bars">${scenario.metrics.map((metric) => `
        <div class="theater-radar-row">
          <span>${escapeHtml(metric.label)}</span>
          <div><i style="width:${clamp(metric.score, 0, 100)}%"></i></div>
          <strong>${metric.score}</strong>
        </div>
      `).join("")}</div>
    `;
  }
  if (theaterProof) {
    theaterProof.innerHTML = `<div class="theater-proof-grid">${scenario.proof.map(([title, text]) => `
      <div>
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(text)}</span>
      </div>
    `).join("")}</div>`;
  }
  if (theaterScript) {
    theaterScript.innerHTML = `<pre>${escapeHtml(scenario.script.join("\n"))}</pre>`;
  }
  if (theaterMatrix) {
    theaterMatrix.innerHTML = scenario.matrix.map(([name, output, status]) => `
      <article>
        <div>
          <span>${escapeHtml(name)}</span>
          <em class="source-badge ${theaterStatusClass(status)}">${escapeHtml(status)}</em>
        </div>
        <p>${escapeHtml(output)}</p>
      </article>
    `).join("");
  }
  lastTheaterReport = {
    id: selectedTheaterScenario,
    generatedAt: new Date().toLocaleString(),
    title: scenario.title,
    score: scenario.score,
    decision: scenario.decision,
    summary: scenario.summary,
    metrics: scenario.metrics,
    story: scenario.story,
    proof: scenario.proof,
    matrix: scenario.matrix,
    reportText: theaterReportText(scenario)
  };
}

function handleTheaterDownload(type) {
  if (!lastTheaterReport) renderCommandTheater(selectedTheaterScenario);
  const scenario = commandTheaterScenarios[selectedTheaterScenario] || commandTheaterScenarios.broker;
  const actions = {
    pdf: () => downloadPdfFile("focusea-workflow-control-report.pdf", "Focusea Workflow Control Report", lastTheaterReport.reportText),
    json: () => downloadJsonFile("focusea-workflow-control-report.json", lastTheaterReport),
    script: () => downloadTextFile("focusea-workflow-action-script.txt", scenario.script.join("\n"))
  };
  actions[type]?.();
  theaterStory?.querySelector(".download-confirm")?.remove();
  theaterStory?.insertAdjacentHTML("beforeend", `<small class="download-confirm">Downloaded: ${escapeHtml(window.focuseaLastDownload?.filename || type)}</small>`);
}

function defaultQuantityForCargo(cargo) {
  if (cargo.unit === "TEU") return 2400;
  if (cargo.unit === "cbm") return 145000;
  if (cargo.unit === "lot") return 1;
  return 50000;
}

function workflowGateContext(values = {}) {
  const parsed = parseOfferText(values.dealText || "");
  const cargoType = values.cargoType || parsed.cargoType || "coal";
  const cargo = getCargoProfile(cargoType);
  const { id: portId, port, ops } = turkiyePortProfile(values.portId || "mersin");
  const quantity = parsed.quantity || defaultQuantityForCargo(cargo);
  const freight = parsed.freight || cargo.baseFreight * cargo.freightMultiplier;
  const commission = parsed.commission || 2.5;
  const demurrageRate = parsed.demurrage || 15000 * cargo.demurrageMultiplier;
  const portDelay = Number(values.portDelay) || 0;
  const bunkerPrice = Number(values.bunkerPrice) || liveFeedState.bunker || verifiedBunkerSnapshot.ports.singapore.vlsfo;
  const dailyHire = Number(values.dailyHire) || 14500;
  const targetTce = Number(values.targetTce) || 22000;
  const subjectHours = Number(values.subjectHours) || 0;
  const voyageDays = Math.max(7, 17 + portDelay + cargo.risk / 28);
  const seaCons = cargo.unit === "TEU" ? 52 : cargo.unit === "cbm" ? 76 : cargo.unit === "lot" ? 18 : 28;
  const bunkerTons = voyageDays * seaCons * cargo.bunkerMultiplier;
  const grossFreight = quantity * freight;
  const brokerage = grossFreight * (commission / 100);
  const bunkerCost = bunkerTons * bunkerPrice;
  const portCost = portCostBase(port) * ops.costFactor * cargo.portCostMultiplier;
  const hireCost = voyageDays * dailyHire;
  const netPnl = grossFreight - brokerage - bunkerCost - portCost - hireCost;
  const tce = (grossFreight - brokerage - bunkerCost - portCost) / voyageDays;
  const draftMargin = turkiyeDraftMargin(port, values.draft);
  const parsedRisk = scoreParsedOffer({ ...parsed, cargoType });
  const portRisk = clamp(turkiyeWaitingRisk(portId, portDelay, cargo.risk) + (draftMargin < 0 ? 30 : draftMargin < 1 ? 14 : 0), 0, 100);
  const legalRisk = /wibon|wipon|time lost waiting|reachable on arrival|whether in berth|weather delays excepted unless used/i.test(values.dealText || "") ? 76 : /nor|laytime|demurrage/i.test(values.dealText || "") ? 42 : 34;
  const subjectRisk = subjectHours && subjectHours <= 12 ? 72 : subjectHours <= 24 ? 52 : 30;
  const commercialRisk = clamp(Math.round(52 + (targetTce - tce) / 450), 0, 100);
  const marketRisk = clamp(Math.round(cargo.risk + liveFeedState.congestion * 0.2 + Math.max(0, bunkerPrice - 620) * 0.07), 0, 100);
  const risk = clamp(Math.round(parsedRisk.score * 0.2 + portRisk * 0.2 + legalRisk * 0.2 + subjectRisk * 0.12 + commercialRisk * 0.18 + marketRisk * 0.1), 0, 100);
  const decision = risk >= 76 ? "AVOID until protected" : risk >= 58 ? "WATCH / counter first" : "FIX candidate";
  const blockers = [
    ...parsed.missing.map((item) => `Missing ${item}`),
    tce < targetTce && `TCE below target by ${money(targetTce - tce)}/day`,
    draftMargin < 0 && `Draft exceeds ${port.name} depth by ${Math.abs(draftMargin).toFixed(1)} m`,
    draftMargin >= 0 && draftMargin < 1 && `Draft margin only ${draftMargin.toFixed(1)} m`,
    portRisk >= 65 && `Port/delay risk high at ${port.name}`,
    legalRisk >= 65 && "NOR / waiting time wording can create demurrage exposure",
    subjectHours <= 12 && "Subject deadline is too close"
  ].filter(Boolean);
  const protections = [
    "Confirm full load/discharge port rotation, berth restrictions and agency PDA before lifting subjects.",
    "Counter with clear NOR, weather exception, waiting time and laytime commencement wording.",
    "Ask owner/charterer to confirm demurrage, dispatch, commission and time-bar language in recap.",
    "Keep bunker sensitivity open until fixture is fixed; rerun TCE if bunker changes materially.",
    draftMargin < 1 ? "Obtain berth-specific UKC/draft confirmation from agent before fixing." : "Keep draft margin note in recap and final voyage estimate."
  ];
  const documents = [
    "Fixture recap",
    "Voyage estimate",
    "Port/agency PDA request",
    "Clause comment list",
    "Subject deadline reminder",
    "Client action mail"
  ];
  const actionMail = [
    "Dear all,",
    "",
    `We have reviewed the proposed ${cargo.label} fixture basis ${parsed.loadPort || "load port TBC"} / ${parsed.dischargePort || "discharge port TBC"}.`,
    `Current Focusea gate decision: ${decision} (risk ${risk}/100).`,
    "",
    "Before we can recommend lifting subjects, please confirm:",
    ...[...blockers.slice(0, 5), ...protections.slice(0, 2)].map((item) => `- ${item}`),
    "",
    `Commercial snapshot: estimated TCE ${money(tce)}/day vs target ${money(targetTce)}/day, net P&L ${money(netPnl)}.`,
    "",
    "Best regards,"
  ].join("\n");
  return {
    generatedAt: new Date().toLocaleString(),
    values,
    parsed,
    cargoType,
    cargo,
    portId,
    port,
    quantity,
    freight,
    commission,
    demurrageRate,
    voyageDays,
    bunkerTons,
    bunkerCost,
    portCost,
    hireCost,
    grossFreight,
    brokerage,
    netPnl,
    tce,
    targetTce,
    draftMargin,
    parsedRisk,
    portRisk,
    legalRisk,
    subjectRisk,
    commercialRisk,
    marketRisk,
    risk,
    decision,
    blockers: blockers.length ? blockers : ["No hard blocker detected in the local model."],
    protections,
    documents,
    actionMail
  };
}

function workflowGateReportText(result = lastWorkflowGate) {
  if (!result) return "No workflow gate report generated.";
  return reportLines("FOCUSEA DEAL QUALITY GATE", [
    `Decision: ${result.decision}`,
    `Risk: ${result.risk}/100`,
    `Cargo: ${result.cargo.label}`,
    `Port: ${result.port.name}`,
    `Quantity / freight: ${result.quantity.toLocaleString("en-US")} ${result.cargo.unit} @ ${money(result.freight, result.cargo.unit === "TEU" ? 0 : 2)}`,
    `Demurrage basis: ${money(result.demurrageRate)}/day`,
    `Estimated TCE: ${money(result.tce)}/day vs target ${money(result.targetTce)}/day`,
    `Net P&L: ${money(result.netPnl)}`,
    `Draft margin: ${result.draftMargin.toFixed(1)} m`,
    "",
    "Risk gates:",
    `- Parsed offer risk: ${result.parsedRisk.score}/100 (${result.parsedRisk.label})`,
    `- Port / draft risk: ${result.portRisk}/100`,
    `- Clause risk: ${result.legalRisk}/100`,
    `- Subject risk: ${result.subjectRisk}/100`,
    `- Commercial risk: ${result.commercialRisk}/100`,
    `- Market risk: ${result.marketRisk}/100`,
    "",
    "Blockers / missing items:",
    ...result.blockers.map((item) => `- ${item}`),
    "",
    "Protections:",
    ...result.protections.map((item) => `- ${item}`),
    "",
    "Documents to prepare:",
    ...result.documents.map((item) => `- ${item}`),
    "",
    "Action mail:",
    result.actionMail
  ]);
}

function renderWorkflowGate() {
  if (!workflowGateForm || !workflowGateResult) return;
  const values = collectFormValues(workflowGateForm);
  const result = workflowGateContext(values);
  lastWorkflowGate = result;
  workflowGateResult.innerHTML = `
    ${metricCards([
      { label: "Decision", value: escapeHtml(result.decision) },
      { label: "Risk", value: `${result.risk}/100` },
      { label: "TCE", value: `${money(result.tce)}/day` },
      { label: "Net P&L", value: `<em class="${result.netPnl >= 0 ? "positive" : "negative"}">${money(result.netPnl)}</em>` },
      { label: "Draft margin", value: `${result.draftMargin.toFixed(1)} m` },
      { label: "Docs", value: result.documents.length }
    ])}
    <div class="workflow-gate-grid">
      <div>
        <span>Risk gates</span>
        ${[
          ["Offer", result.parsedRisk.score],
          ["Port", result.portRisk],
          ["Clause", result.legalRisk],
          ["Subjects", result.subjectRisk],
          ["Commercial", result.commercialRisk],
          ["Market", result.marketRisk]
        ].map(([label, score]) => `
          <div class="theater-radar-row"><span>${label}</span><div><i style="width:${clamp(score, 0, 100)}%"></i></div><strong>${score}</strong></div>
        `).join("")}
      </div>
      <div>
        <span>Blockers / missing</span>
        <ul class="compact-list">${result.blockers.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
      <div>
        <span>Protection actions</span>
        <ul class="compact-list">${result.protections.slice(0, 5).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
    </div>
    <pre>${escapeHtml(result.actionMail)}</pre>
  `;
  renderDealIntelligenceGraph();
  renderWorkflowClientPortal();
  renderWorkflowConfidence();
  renderWorkflowDealRoom();
  renderWorkflowWhatIf();
  renderWorkflowMission();
  renderFocuseaScore();
}

function handleWorkflowDownload(type) {
  if (!lastWorkflowGate) renderWorkflowGate();
  const actions = {
    pdf: () => downloadPdfFile("focusea-deal-quality-gate.pdf", "Focusea Deal Quality Gate", workflowGateReportText(lastWorkflowGate)),
    json: () => downloadJsonFile("focusea-deal-quality-gate.json", lastWorkflowGate || {}),
    mail: () => downloadTextFile("focusea-deal-action-mail.txt", lastWorkflowGate?.actionMail || "No action mail generated.")
  };
  actions[type]?.();
  workflowGateResult?.querySelector(".download-confirm")?.remove();
  workflowGateResult?.insertAdjacentHTML("beforeend", `<small class="download-confirm">Downloaded: ${escapeHtml(window.focuseaLastDownload?.filename || type)}</small>`);
}

function riskBand(score) {
  if (score >= 72) return "high";
  if (score >= 52) return "medium";
  return "low";
}

function riskBandLabel(score) {
  if (score >= 72) return "High";
  if (score >= 52) return "Watch";
  return "Workable";
}

function renderDealIntelligenceGraph() {
  if (!dealGraphResult) return;
  if (!lastWorkflowGate) lastWorkflowGate = workflowGateContext(workflowGateForm ? collectFormValues(workflowGateForm) : {});
  const g = lastWorkflowGate;
  const nodes = [
    { name: "Offer", score: g.parsedRisk.score, note: g.parsed.missing.length ? `${g.parsed.missing.length} missing fields` : "Core terms readable" },
    { name: "Cargo", score: g.cargo.risk, note: g.cargo.note },
    { name: "Port", score: g.portRisk, note: `${g.port.name} / draft margin ${g.draftMargin.toFixed(1)} m` },
    { name: "Clause", score: g.legalRisk, note: g.legalRisk >= 65 ? "NOR / waiting wording protected badly" : "Clause watch required" },
    { name: "Claim", score: Math.round((g.legalRisk + g.subjectRisk) / 2), note: "SOF, NOR, rain log and time bar must match" },
    { name: "Payment", score: Math.round((g.commercialRisk + g.parsedRisk.score) / 2), note: g.tce < g.targetTce ? "Commercial gap affects payment confidence" : "Commercials above target" },
    { name: "Market", score: g.marketRisk, note: "Bunker, congestion and cargo sentiment attached" },
    { name: "Client", score: Math.max(12, g.risk - 8), note: "Client portal summary can be sent after protections" }
  ];
  dealGraphResult.innerHTML = `
    <div class="workflow-graph-map">
      ${nodes.map((node, index) => `
        <div class="workflow-node ${riskBand(node.score)}" style="--node-index:${index}">
          <strong>${escapeHtml(node.name)}</strong>
          <span>${node.score}/100</span>
          <small>${escapeHtml(node.note)}</small>
        </div>
      `).join("")}
    </div>
    <div class="workflow-link-list">
      ${nodes.slice(0, -1).map((node, index) => `
        <div><span>${escapeHtml(node.name)} -> ${escapeHtml(nodes[index + 1].name)}</span><strong>${riskBandLabel(Math.max(node.score, nodes[index + 1].score))}</strong></div>
      `).join("")}
    </div>
  `;
}

function marketMemorySeed() {
  return [
    { cargoType: "coal", route: "Indonesia / India", freight: 18.5, tce: 21400, status: "Fixed", time: "Seed" },
    { cargoType: "grain", route: "Black Sea / Egypt", freight: 24.2, tce: 18800, status: "On subjects", time: "Seed" },
    { cargoType: "container", route: "Shanghai / Los Angeles", freight: 1550, tce: 27600, status: "Failed", time: "Seed" },
    ...decisionRateMemory.map((item) => ({ ...item, freight: item.freightRate, status: item.fixtureStatus, time: "Decision Lab" }))
  ];
}

function getMarketMemory() {
  const saved = safeLocalGet("focusea-private-market-memory-v1", null);
  return Array.isArray(saved) && saved.length ? saved : marketMemorySeed();
}

function setMarketMemory(items) {
  safeLocalSet("focusea-private-market-memory-v1", items);
}

function renderMarketMemory() {
  if (!marketMemoryResult) return;
  const items = getMarketMemory();
  const values = marketMemoryForm ? collectFormValues(marketMemoryForm) : { cargoType: lastWorkflowGate?.cargoType || "coal", route: lastWorkflowGate?.parsed?.route || "Indonesia / India" };
  const cargoType = values.cargoType || lastWorkflowGate?.cargoType || "coal";
  const routeText = String(values.route || lastWorkflowGate?.parsed?.route || "").toLowerCase();
  const matches = items.filter((item) => item.cargoType === cargoType && (!routeText || String(item.route || "").toLowerCase().includes(routeText.split("/")[0]?.trim() || "")));
  const basis = matches.length ? matches : items.filter((item) => item.cargoType === cargoType);
  const avgFreight = basis.reduce((sum, item) => sum + Number(item.freight || 0), 0) / Math.max(basis.length, 1);
  const avgTce = basis.reduce((sum, item) => sum + Number(item.tce || 0), 0) / Math.max(basis.length, 1);
  const currentFreight = lastWorkflowGate?.freight || Number(values.freight) || avgFreight;
  marketMemoryResult.innerHTML = `
    ${metricCards([
      { label: "Saved fixtures", value: items.length },
      { label: "Comparable count", value: basis.length },
      { label: "Avg freight", value: money(avgFreight, cargoType === "container" ? 0 : 2) },
      { label: "Avg TCE", value: `${money(avgTce)}/day` },
      { label: "Current vs memory", value: `${currentFreight >= avgFreight ? "+" : ""}${money(currentFreight - avgFreight, 2)}` }
    ])}
    <div class="ops-list">${basis.slice(0, 6).map((item) => `
      <div><strong>${escapeHtml(getCargoProfile(item.cargoType).label)} · ${escapeHtml(item.route)}</strong><span>${escapeHtml(item.status)} · freight ${money(item.freight, item.cargoType === "container" ? 0 : 2)} · TCE ${money(item.tce)}/day · ${escapeHtml(item.time || "")}</span></div>
    `).join("")}</div>
  `;
}

function addMarketMemoryEntry() {
  if (!marketMemoryForm) return;
  const values = collectFormValues(marketMemoryForm);
  const item = {
    cargoType: values.cargoType || "coal",
    route: values.route || "Unknown route",
    freight: Number(values.freight) || 0,
    tce: Number(values.tce) || 0,
    status: values.status || "Watch",
    time: new Date().toLocaleString()
  };
  setMarketMemory([item, ...getMarketMemory()].slice(0, 80));
  renderMarketMemory();
  renderWorkflowConfidence();
}

function redTeamFindings(text = "", side = "Broker neutral") {
  const tests = [
    [/wibon|wipon|whether in berth/i, "NOR validity", "High", "Clarify when NOR becomes valid and whether free pratique/customs clearance is required."],
    [/time lost waiting|waiting for berth.*count/i, "Waiting time", "High", "Define if waiting time counts as laytime or demurrage only after valid NOR."],
    [/weather delays excepted unless used/i, "Weather exception", "Medium", "Add evidence rule: terminal log, rain letter, stop/start times and whether work actually continued."],
    [/always accessible|reachable on arrival/i, "Berth warranty", "High", "Avoid broad berth warranty without berth-specific safe access and draft confirmation."],
    [/pumping|pressure|warranty/i, "Pumping warranty", "Medium", "State shore restrictions, back pressure, vessel capability and log evidence."],
    [/time.?bar|90 days|documents within/i, "Time bar", "High", "Insert exact claim document list and deadline owner/charterer must follow."],
    [/sanction|ofac|eu|un|russia|iran|syria|venezuela/i, "Compliance", "High", "Require sanctions screening for cargo origin, counterparties, vessel and banks."],
    [/loi|letter of indemnity/i, "LOI", "Medium", "Confirm P&I position and signed wording before accepting operational shortcut."],
    [/clean hold|hold cleanliness|previous cargo/i, "Cargo readiness", "Medium", "Add hold/tank cleanliness certificate and survey evidence before loading."],
    [/freight payable|deduct|net of/i, "Payment wording", "Medium", "Clarify freight due date, deductions, brokerage and bank charges."]
  ];
  return tests
    .filter(([pattern]) => pattern.test(text))
    .map(([, title, severity, advice]) => ({
      title,
      severity,
      side,
      advice,
      counter: `Counter wording: ${advice}`
    }));
}

function renderDocumentRedTeam() {
  if (!documentRedTeamForm || !documentRedTeamResult) return;
  const values = collectFormValues(documentRedTeamForm);
  const findings = redTeamFindings(values.documentText || "", values.side || "Broker neutral");
  const score = clamp(28 + findings.filter((item) => item.severity === "High").length * 18 + findings.filter((item) => item.severity === "Medium").length * 9, 0, 100);
  lastDocumentRedTeam = { values, findings, score };
  documentRedTeamResult.innerHTML = `
    ${metricCards([
      { label: "Red flags", value: findings.length },
      { label: "Risk score", value: `${score}/100` },
      { label: "Posture", value: score >= 70 ? "Hold subjects" : score >= 50 ? "Counter wording" : "Workable" }
    ])}
    <div class="workflow-redteam-list">${(findings.length ? findings : [{ title: "No strong red flag", severity: "Low", advice: "Still confirm NOR, laytime, demurrage, exceptions and evidence list.", counter: "Counter wording: keep standard protections in recap." }]).map((item) => `
      <div class="${riskBand(item.severity === "High" ? 82 : item.severity === "Medium" ? 58 : 30)}">
        <strong>${escapeHtml(item.title)} · ${escapeHtml(item.severity)}</strong>
        <span>${escapeHtml(item.advice)}</span>
        <small>${escapeHtml(item.counter)}</small>
      </div>
    `).join("")}</div>
  `;
  renderWorkflowConfidence();
}

function renderPortReality() {
  if (!portRealityForm || !portRealityResult) return;
  const values = collectFormValues(portRealityForm);
  const { id, port, ops } = turkiyePortProfile(values.portId || "mersin");
  const cargo = getCargoProfile(values.cargoType || "coal");
  const margin = turkiyeDraftMargin(port, values.draft);
  const waitingRisk = turkiyeWaitingRisk(id, values.waitingDays, cargo.risk);
  const cost = portCostBase(port) * ops.costFactor * cargo.portCostMultiplier + (Number(values.waitingDays) || 0) * 14500;
  const status = waitingRisk >= 70 || margin < 0 ? "NO-GO until confirmed" : waitingRisk >= 55 || margin < 1 ? "Conditional" : "Workable";
  lastPortReality = { values, id, port, cargo, margin, waitingRisk, cost, status };
  portRealityResult.innerHTML = `
    ${metricCards([
      { label: "Port status", value: escapeHtml(status) },
      { label: "Draft margin", value: `${margin.toFixed(1)} m` },
      { label: "Waiting risk", value: `${waitingRisk}/100` },
      { label: "Screening cost", value: money(cost) }
    ])}
    <div class="confidence-list">
      <div class="confidence-row"><span>UN/LOCODE import lane</span><em class="source-badge api-ready">API-ready</em><a href="https://unece.org/trade/cefact/UNLOCODE-Download" target="_blank" rel="noopener noreferrer">Source</a></div>
      <div class="confidence-row"><span>NGA World Port Index lane</span><em class="source-badge api-ready">API-ready</em><a href="https://msi.nga.mil/Publications/WPI" target="_blank" rel="noopener noreferrer">Source</a></div>
      <div class="confidence-row"><span>Local agency note</span><em class="source-badge input">User input</em><span>${escapeHtml(values.agencyNote || "No note")}</span></div>
    </div>
    <ul class="compact-list">
      ${(port.documents || []).slice(0, 5).map((doc) => `<li>${escapeHtml(doc)}</li>`).join("")}
      ${(port.risks || []).slice(0, 3).map((risk) => `<li>Risk: ${escapeHtml(risk)}</li>`).join("")}
    </ul>
  `;
  renderDealIntelligenceGraph();
  renderWorkflowConfidence();
}

function renderWeatherLaytime() {
  if (!weatherLaytimeForm || !weatherLaytimeResult) return;
  const values = collectFormValues(weatherLaytimeForm);
  const weatherHours = Number(values.weatherHours) || 0;
  const waitingHours = Number(values.waitingHours) || 0;
  const demurrageRate = Number(values.demurrageRate) || 0;
  const mode = values.clauseMode || "excepted";
  const chargeableWeather = mode === "counts" ? weatherHours : mode === "unless-used" ? Math.round(weatherHours * 0.5 * 10) / 10 : 0;
  const protectedHours = Math.max(0, weatherHours - chargeableWeather);
  const claimExposure = ((waitingHours + chargeableWeather) / 24) * demurrageRate;
  const recommendation = mode === "excepted"
    ? "Collect rain letter and terminal stop/start log to protect laytime deduction."
    : mode === "unless-used"
      ? "Prove whether work continued during weather period; split used vs stopped time."
      : "Treat weather as commercial exposure and price demurrage protection into counter.";
  lastWeatherLaytime = { values, chargeableWeather, protectedHours, claimExposure, recommendation };
  weatherLaytimeResult.innerHTML = `
    ${metricCards([
      { label: "Protected hours", value: `${protectedHours} h` },
      { label: "Chargeable hours", value: `${chargeableWeather} h` },
      { label: "Claim exposure", value: money(claimExposure) },
      { label: "Data lane", value: `<em class="source-badge api-ready">NWS API-ready</em>` }
    ])}
    <div class="confidence-list">
      <div class="confidence-row"><span>NWS alerts / forecast endpoint</span><em class="source-badge api-ready">API-ready</em><a href="https://www.weather.gov/documentation/services-web-api" target="_blank" rel="noopener noreferrer">Docs</a></div>
      <div class="confidence-row"><span>Laytime treatment</span><em class="source-badge input">Clause input</em><span>${escapeHtml(recommendation)}</span></div>
    </div>
  `;
  renderWorkflowConfidence();
}

function renderCarbonDesk() {
  if (!carbonDeskForm || !carbonDeskResult) return;
  const values = collectFormValues(carbonDeskForm);
  const fuelTons = Number(values.fuelTons) || 0;
  const co2 = fuelTons * 3.114;
  const accountable = co2 * ((Number(values.euShare) || 0) / 100) * ((Number(values.surrenderPct) || 0) / 100);
  const etsCost = accountable * (Number(values.euaPrice) || 0);
  const usdCost = etsCost * 1.08;
  lastCarbonDesk = { values, co2, accountable, etsCost, usdCost };
  carbonDeskResult.innerHTML = `
    ${metricCards([
      { label: "CO2", value: `${co2.toFixed(0)} t` },
      { label: "ETS accountable", value: `${accountable.toFixed(0)} t` },
      { label: "ETS cost", value: `EUR ${money(etsCost)}` },
      { label: "USD equiv.", value: money(usdCost) }
    ])}
    <div class="confidence-row"><span>EU maritime ETS / MRV source</span><em class="source-badge verified">Verified source</em><a href="https://climate.ec.europa.eu/eu-action/transport-decarbonisation/reducing-emissions-shipping-sector_en" target="_blank" rel="noopener noreferrer">European Commission</a></div>
    <small>Use as commercial screening. Final ETS/FuelEU treatment depends on voyage scope, ship size, verifier and contractual allocation.</small>
  `;
  renderWorkflowConfidence();
}

function renderWorkflowClientPortal() {
  if (!workflowClientPortalForm || !workflowClientPortalResult) return;
  if (!lastWorkflowGate) lastWorkflowGate = workflowGateContext(workflowGateForm ? collectFormValues(workflowGateForm) : {});
  const values = collectFormValues(workflowClientPortalForm);
  const g = lastWorkflowGate;
  const token = `${String(values.dealRef || "FX").replace(/[^a-z0-9]/gi, "").toLowerCase()}-${Math.abs(Math.round(g.netPnl))}`;
  const portalUrl = `https://captainemo03.github.io/focusea/#client-${token}`;
  const summary = [
    `Client: ${values.client}`,
    `Deal: ${values.dealRef}`,
    `Decision: ${g.decision} (${g.risk}/100)`,
    `ETA: ${values.eta}`,
    `Commercial: TCE ${money(g.tce)}/day, P&L ${money(g.netPnl)}`,
    `Next action: ${g.protections[0]}`
  ].join("\n");
  lastWorkflowClientPortal = { values, portalUrl, summary };
  workflowClientPortalResult.innerHTML = `
    ${metricCards([
      { label: "Client", value: escapeHtml(values.client || "-") },
      { label: "Deal ref", value: escapeHtml(values.dealRef || "-") },
      { label: "Portal status", value: "Share-ready pack" },
      { label: "Risk", value: `${g.risk}/100` }
    ])}
    <pre>${escapeHtml(summary)}</pre>
    <div class="confidence-row"><span>Portal link preview</span><em class="source-badge simulated">Static preview</em><a href="${portalUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(portalUrl)}</a></div>
  `;
}

function renderNegotiationPro() {
  if (!negotiationProForm || !negotiationProResult) return;
  const values = collectFormValues(negotiationProForm);
  const cargo = getCargoProfile(values.cargoType || "coal");
  const owner = Number(values.ownerOffer) || cargo.baseFreight;
  const charterer = Number(values.chartererCounter) || cargo.baseFreight;
  const modelMid = cargo.baseFreight * cargo.freightMultiplier;
  const spread = owner - charterer;
  const power = clamp(Math.round(55 + (modelMid - charterer) * 3 - cargo.risk * 0.18 + (lastWorkflowGate?.risk || 55) * 0.12), 0, 100);
  const suggested = Math.max(charterer, Math.min(owner, charterer + spread * (power >= 65 ? 0.35 : power >= 45 ? 0.55 : 0.72)));
  const posture = power >= 65 ? "Push harder" : power >= 45 ? "Balanced counter" : "Protect terms more than rate";
  const wording = `Counter ${money(suggested, 2)} ${cargo.unit === "TEU" ? "per TEU" : "pmt"} basis clean recap, demurrage confirmed, NOR/weather/waiting wording subject to review.`;
  lastNegotiationPro = { values, modelMid, spread, power, suggested, posture, wording };
  negotiationProResult.innerHTML = `
    ${metricCards([
      { label: "Negotiation power", value: `${power}/100` },
      { label: "Model mid", value: money(modelMid, 2) },
      { label: "Spread", value: money(spread, 2) },
      { label: "Suggested counter", value: money(suggested, 2) }
    ])}
    <div class="danger-box"><span>${escapeHtml(posture)}</span><p>${escapeHtml(wording)}</p></div>
  `;
}

function renderWorkflowConfidence() {
  if (!workflowConfidenceResult) return;
  const g = lastWorkflowGate;
  const rows = [
    ["Fixture text", "User pasted deal data", "input", g ? 88 : 50],
    ["Cargo pricing", "Local cargo multiplier and private market memory", "simulated", 70],
    ["Bunker default", `${bunkerSpreadNote()} / verified snapshot label`, "verified", 82],
    ["Baltic / index lane", "Licensed endpoint required for true live Baltic values", "licensed", balticFeedState.connected ? 86 : 58],
    ["Port data", "UN/LOCODE + NGA World Port Index import-ready", "api-ready", lastPortReality ? 80 : 66],
    ["Weather data", "NWS API forecast/alerts ready; clause treatment is user input", "api-ready", lastWeatherLaytime ? 78 : 62],
    ["EU ETS", "European Commission source linked; price is user input", "verified", lastCarbonDesk ? 82 : 64],
    ["Document red team", "Keyword/rule model until backend LLM/OCR is connected", "simulated", lastDocumentRedTeam ? 76 : 58],
    ["SOF laytime", "Rule engine over pasted SOF; signed evidence required", "input", lastWorkflowSof ? lastWorkflowSof.readiness : 54],
    ["Counterparty memory", "Local user input / fixture history", "input", lastWorkflowCounterparty ? 100 - lastWorkflowCounterparty.risk : 52],
    ["Report Center", "Browser PDF/TXT/JSON export plus backend PDF endpoint", "api-ready", workflowReportCenterResult ? 72 : 66]
  ];
  workflowConfidenceResult.innerHTML = `
    <div class="confidence-list">${rows.map(([name, usage, badge, confidence]) => `
      <div class="confidence-row">
        <span>${escapeHtml(name)}<small>${escapeHtml(usage)}</small></span>
        <em class="source-badge ${badge}">${sourceBadgeText(badge)}</em>
        <strong>${confidence}%</strong>
      </div>
    `).join("")}</div>
  `;
}

const workflowInboxKey = "focusea-workflow-inbox-v1";
const workflowCommunityKey = "focusea-workflow-community-notes-v1";
const workflowReportsKey = "focusea-workflow-report-history-v1";

function workflowDateAfter({ hours = 0, days = 0 } = {}) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + Math.round((Number(hours) || 0) * 60 + (Number(days) || 0) * 1440));
  return date;
}

function workflowDateLabel(date) {
  return date.toLocaleString(undefined, { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function workflowStatusBadge(score) {
  if (score >= 76) return "licensed";
  if (score >= 56) return "api-ready";
  return "verified";
}

function workflowCurrentGate() {
  if (!lastWorkflowGate) lastWorkflowGate = workflowGateContext(workflowGateForm ? collectFormValues(workflowGateForm) : {});
  return lastWorkflowGate;
}

function buildWorkflowInboxItem(values = {}) {
  const messageText = String(values.messageText || "");
  const parsed = parseOfferText(messageText);
  const risk = scoreParsedOffer(parsed);
  const source = values.source || "Inbox";
  const status = values.status || (risk.score >= 65 ? "Counter needed" : "New offer");
  const deadlineHours = Number(values.deadlineHours) || 0;
  const route = parsed.route || "Route TBC";
  return {
    id: `INB-${Date.now().toString().slice(-5)}`,
    source,
    status,
    messageText,
    cargoType: parsed.cargoType,
    cargoLabel: parsed.cargoLabel,
    route,
    quantity: parsed.quantity,
    unit: parsed.unit,
    freight: parsed.freight,
    demurrage: parsed.demurrage,
    laycan: parsed.laycan,
    vesselSize: parsed.vesselSize,
    missing: parsed.missing,
    riskScore: risk.score,
    riskLabel: risk.label,
    factors: risk.factors,
    deadlineHours,
    deadlineAt: deadlineHours ? workflowDateAfter({ hours: deadlineHours }).toISOString() : "",
    receivedAt: new Date().toLocaleString()
  };
}

function getWorkflowInbox() {
  const saved = safeLocalGet(workflowInboxKey, []);
  return Array.isArray(saved) ? saved : [];
}

function setWorkflowInbox(items) {
  safeLocalSet(workflowInboxKey, items);
}

function renderWorkflowInbox() {
  if (!workflowInboxResult) return;
  const values = workflowInboxForm ? collectFormValues(workflowInboxForm) : {};
  const preview = buildWorkflowInboxItem(values);
  const inbox = getWorkflowInbox();
  const savedPlusPreview = [preview, ...inbox].slice(0, 7);
  lastWorkflowInbox = { preview, inbox };
  workflowInboxResult.innerHTML = `
    ${metricCards([
      { label: "Preview status", value: escapeHtml(preview.status) },
      { label: "Risk", value: `${preview.riskScore}/100` },
      { label: "Cargo", value: escapeHtml(preview.cargoLabel) },
      { label: "Route", value: escapeHtml(preview.route) },
      { label: "Saved inbox", value: inbox.length }
    ])}
    <div class="workflow-inbox-list">
      ${savedPlusPreview.map((item, index) => `
        <div class="${index === 0 ? "preview" : ""}">
          <strong>${escapeHtml(item.id)} · ${escapeHtml(item.status)}</strong>
          <span>${escapeHtml(item.cargoLabel)} · ${escapeHtml(item.route)} · ${item.freight ? money(item.freight, 2) : "freight TBC"} · risk ${item.riskScore}/100</span>
          <small>${index === 0 ? "Preview from pasted text" : escapeHtml(item.receivedAt || "Saved")} ${item.missing?.length ? `· missing: ${escapeHtml(item.missing.join(", "))}` : ""}</small>
        </div>
      `).join("")}
    </div>
  `;
}

function saveWorkflowInboxEntry() {
  const values = workflowInboxForm ? collectFormValues(workflowInboxForm) : {};
  const item = buildWorkflowInboxItem(values);
  setWorkflowInbox([item, ...getWorkflowInbox()].slice(0, 60));
  renderWorkflowInbox();
  renderWorkflowDealRoom();
  renderWorkflowMission();
  renderFocuseaScore();
}

function clearWorkflowInboxEntries() {
  setWorkflowInbox([]);
  renderWorkflowInbox();
  renderWorkflowDealRoom();
  renderWorkflowMission();
  renderFocuseaScore();
}

function workflowLatestDeal() {
  return getWorkflowInbox()[0] || lastWorkflowInbox?.preview || null;
}

function renderWorkflowDealRoom() {
  if (!workflowDealRoomResult) return;
  const values = workflowDealRoomForm ? collectFormValues(workflowDealRoomForm) : {};
  const gate = workflowCurrentGate();
  const inboxDeal = workflowLatestDeal();
  const stage = values.stage || "Counter";
  const stageOrder = ["Offer", "Counter", "Subjects", "Fixed", "SOF", "Laytime", "Claim", "Invoice"];
  const activeIndex = Math.max(0, stageOrder.indexOf(stage));
  const documents = [
    ["Offer", inboxDeal ? "Captured from inbox" : "Use inbox parser"],
    ["Recap", gate.decision.includes("FIX") ? "Draft ready" : "Needs protection"],
    ["CP comments", lastWorkflowClauseVersion ? "Version diff ready" : "Pending diff"],
    ["SOF / NOR", lastWorkflowOcr ? "OCR lane scanned" : lastWorkflowSof ? "SOF engine ready" : "Pending upload"],
    ["Laytime", lastWorkflowSof ? `${lastWorkflowSof.verdict} / ${money(lastWorkflowSof.demurrageAmount || lastWorkflowSof.dispatchAmount)}` : lastWeatherLaytime ? "Weather linked" : "Need SOF"],
    ["Claim", lastDocumentRedTeam?.score >= 65 ? "High dispute watch" : "Evidence checklist"],
    ["Invoice", lastCarbonDesk ? "ETS note attached" : "Commercial pack"],
    ["Counterparty", lastWorkflowCounterparty ? lastWorkflowCounterparty.verdict : "Risk memory pending"],
    ["Client portal", lastWorkflowPortalPro ? "Share pack ready" : "Portal pending"]
  ];
  const todo = [
    ...(gate.blockers || []).slice(0, 3),
    inboxDeal?.deadlineHours ? `Subject deadline in ${inboxDeal.deadlineHours} h` : "Set subject deadline",
    lastWorkflowVetting?.verdict ? `Vetting: ${lastWorkflowVetting.verdict}` : "Run vessel vetting",
    lastWorkflowCounter?.wording ? "Send counter wording after review" : "Generate counter wording",
    lastWorkflowSof?.demurrageAmount ? `Demurrage exposure ${money(lastWorkflowSof.demurrageAmount)}` : "",
    lastWorkflowCounterparty?.risk >= 50 ? `Counterparty watch: ${lastWorkflowCounterparty.verdict}` : ""
  ].filter(Boolean).slice(0, 7);
  lastWorkflowDealRoom = { values, gate, inboxDeal, documents, todo, activeIndex };
  workflowDealRoomResult.innerHTML = `
    ${metricCards([
      { label: "Deal ref", value: escapeHtml(values.dealRef || "FX") },
      { label: "Stage", value: escapeHtml(stage) },
      { label: "Gate", value: escapeHtml(gate.decision) },
      { label: "Risk", value: `${gate.risk}/100` },
      { label: "Files", value: documents.length }
    ])}
    <div class="deal-room-timeline">
      ${stageOrder.map((item, index) => `<span class="${index <= activeIndex ? "active" : ""}">${escapeHtml(item)}</span>`).join("")}
    </div>
    <div class="workflow-two-col">
      <div class="ops-list">${documents.map(([title, status]) => `<div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(status)}</span></div>`).join("")}</div>
      <div class="ops-list">${todo.map((item) => `<div><strong>Action</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div>
    </div>
  `;
}

function workflowExtractEvents(text = "") {
  const rows = [
    ["NOR", /nor(?:\s+tendered)?[^0-9]*(\d{1,2}\s*[A-Za-z]{3,9}|\d{1,2}\/\d{1,2})?[^0-9]*(\d{3,4})?/i],
    ["All fast", /all\s+fast[^0-9]*(\d{1,2}\s*[A-Za-z]{3,9}|\d{1,2}\/\d{1,2})?[^0-9]*(\d{3,4})?/i],
    ["Loading started", /(?:loading|discharging|operation)\s+(?:commenced|started)[^0-9]*(\d{1,2}\s*[A-Za-z]{3,9}|\d{1,2}\/\d{1,2})?[^0-9]*(\d{3,4})?/i],
    ["Weather stop", /(?:rain|weather|swell|wind)[^0-9]*(?:stopped|stop|delay|delayed)?[^0-9]*(\d{1,2}\s*[A-Za-z]{3,9}|\d{1,2}\/\d{1,2})?[^0-9]*(\d{3,4})?/i],
    ["Completed", /(?:completed|completion|finished)[^0-9]*(\d{1,2}\s*[A-Za-z]{3,9}|\d{1,2}\/\d{1,2})?[^0-9]*(\d{3,4})?/i]
  ];
  return rows.map(([label, pattern]) => {
    const match = text.match(pattern);
    return {
      label,
      found: Boolean(match),
      detail: match ? [match[1], match[2]].filter(Boolean).join(" ") || "mentioned" : "missing"
    };
  });
}

function renderWorkflowOcrLane() {
  if (!workflowOcrForm || !workflowOcrResult) return;
  const values = collectFormValues(workflowOcrForm);
  const text = String(values.documentText || "");
  const file = values.documentFile;
  const events = workflowExtractEvents(text);
  const findings = redTeamFindings(text, "Broker neutral");
  const claimRate = parseMoneyNumber(text.match(/(?:demurrage|dem)[^0-9]*(?:usd|us\$|\$)?\s*([0-9,]+(?:\.[0-9]+)?)/i)?.[1]) || workflowCurrentGate().demurrageRate;
  const foundCount = events.filter((event) => event.found).length;
  const readiness = clamp(Math.round(foundCount * 16 + (findings.length ? 10 : 0) + (text.length > 80 ? 12 : 0)), 0, 100);
  lastWorkflowOcr = { text, fileName: file?.name || "", events, findings, readiness, claimRate };
  workflowOcrResult.innerHTML = `
    ${metricCards([
      { label: "OCR readiness", value: `${readiness}/100` },
      { label: "Events found", value: `${foundCount}/${events.length}` },
      { label: "Claim rate", value: `${money(claimRate)}/day` },
      { label: "File", value: escapeHtml(file?.name || "Pasted text") }
    ])}
    <div class="workflow-event-list">
      ${events.map((event) => `<div class="${event.found ? "found" : "missing"}"><strong>${escapeHtml(event.label)}</strong><span>${escapeHtml(event.detail)}</span></div>`).join("")}
    </div>
    <div class="confidence-row"><span>Static site note</span><em class="source-badge api-ready">Backend-ready</em><span>True OCR/PDF extraction needs Python backend endpoint.</span></div>
  `;
  renderWorkflowDealRoom();
  renderWorkflowMission();
  renderFocuseaScore();
}

function renderWorkflowTimeBar() {
  if (!workflowTimeBarForm || !workflowTimeBarResult) return;
  const values = collectFormValues(workflowTimeBarForm);
  const events = [
    { label: "Subject deadline", type: "hours", amount: Number(values.subjectHours) || 0, severity: Number(values.subjectHours) <= 12 ? 84 : Number(values.subjectHours) <= 24 ? 62 : 38 },
    { label: "Laycan opens", type: "days", amount: Number(values.laycanOpenDays) || 0, severity: Number(values.laycanOpenDays) <= 3 ? 78 : 44 },
    { label: "Canceling date", type: "days", amount: Number(values.cancelingDays) || 0, severity: Number(values.cancelingDays) <= 5 ? 82 : 42 },
    { label: "Demurrage time bar", type: "days", amount: Number(values.timeBarDays) || 90, severity: Number(values.timeBarDays) <= 30 ? 78 : 36 }
  ].map((item) => ({
    ...item,
    dueAt: workflowDateAfter(item.type === "hours" ? { hours: item.amount } : { days: item.amount })
  }));
  const urgent = events.filter((item) => item.severity >= 70).length;
  lastWorkflowTimeBar = { values, events, urgent };
  workflowTimeBarResult.innerHTML = `
    ${metricCards([
      { label: "Critical dates", value: events.length },
      { label: "Urgent", value: urgent },
      { label: "Next", value: workflowDateLabel(events[0].dueAt) }
    ])}
    <div class="timebar-list">
      ${events.map((item) => `
        <div class="${riskBand(item.severity)}">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${workflowDateLabel(item.dueAt)}</span>
          <em>${riskBandLabel(item.severity)}</em>
        </div>
      `).join("")}
    </div>
  `;
  renderWorkflowMission();
  renderFocuseaScore();
}

function renderWorkflowVetting() {
  if (!workflowVettingForm || !workflowVettingResult) return;
  const values = collectFormValues(workflowVettingForm);
  const gate = workflowCurrentGate();
  const cargo = getCargoProfile(values.cargoType || gate.cargoType);
  const { port } = turkiyePortProfile(gate.portId || "mersin");
  const margin = turkiyeDraftMargin(port, values.draft || gate.values.draft);
  const classRisk = values.classStatus === "Condition of class" ? 28 : values.classStatus === "Class due soon" ? 16 : 4;
  const risk = clamp(Math.round(
    (Number(values.age) || 0) * 1.1
    + (Number(values.psc) || 0) * 7
    + classRisk
    + cargo.risk * 0.28
    + (margin < 0 ? 32 : margin < 1 ? 18 : 0)
  ), 0, 100);
  const verdict = risk >= 72 ? "Risky / hold subjects" : risk >= 52 ? "Conditional acceptance" : "Suitable";
  const checks = [
    cargo.docs?.[0] || "Cargo documentation",
    cargo.handling?.[0] || "Cargo handling limits",
    `Draft margin ${margin.toFixed(1)} m at ${port.name}`,
    values.classStatus,
    `${values.psc} PSC deficiencies`
  ].filter(Boolean);
  lastWorkflowVetting = { values, cargo, port, margin, risk, verdict, checks };
  workflowVettingResult.innerHTML = `
    ${metricCards([
      { label: "Verdict", value: escapeHtml(verdict) },
      { label: "Risk", value: `${risk}/100` },
      { label: "Draft margin", value: `${margin.toFixed(1)} m` },
      { label: "Cargo", value: escapeHtml(cargo.label) }
    ])}
    <div class="ops-list">${checks.map((item) => `<div><strong>Check</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div>
  `;
  renderWorkflowDealRoom();
  renderWorkflowMission();
  renderFocuseaScore();
}

function renderWorkflowClauseVersion() {
  if (!workflowClauseVersionForm || !workflowClauseVersionResult) return;
  const values = collectFormValues(workflowClauseVersionForm);
  const oldLines = String(values.oldClause || "").split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const newLines = String(values.newClause || "").split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const removed = oldLines.filter((line) => !newLines.some((newLine) => newLine.toLowerCase() === line.toLowerCase()));
  const added = newLines.filter((line) => !oldLines.some((oldLine) => oldLine.toLowerCase() === line.toLowerCase()));
  const oldFindings = redTeamFindings(values.oldClause || "", "Old");
  const newFindings = redTeamFindings(values.newClause || "", "New");
  const riskShift = clamp(Math.round(newFindings.length * 12 + added.length * 8 - oldFindings.length * 6 + removed.length * 5), 0, 100);
  const verdict = riskShift >= 64 ? "Protection weakened" : riskShift >= 42 ? "Needs comment" : "Acceptable with review";
  lastWorkflowClauseVersion = { values, removed, added, oldFindings, newFindings, riskShift, verdict };
  workflowClauseVersionResult.innerHTML = `
    ${metricCards([
      { label: "Verdict", value: escapeHtml(verdict) },
      { label: "Risk shift", value: `${riskShift}/100` },
      { label: "Added", value: added.length },
      { label: "Removed", value: removed.length }
    ])}
    <div class="clause-diff-list">
      ${removed.map((line) => `<div class="removed"><strong>- Removed protection</strong><span>${escapeHtml(line)}</span></div>`).join("")}
      ${added.map((line) => `<div class="added"><strong>+ Added wording</strong><span>${escapeHtml(line)}</span></div>`).join("")}
      ${!removed.length && !added.length ? `<div><strong>No line change</strong><span>Still run red-team before subjects lifted.</span></div>` : ""}
    </div>
  `;
  renderWorkflowDealRoom();
  renderWorkflowCounter();
  renderWorkflowMission();
  renderFocuseaScore();
}

function renderWorkflowCounter() {
  if (!workflowCounterForm || !workflowCounterResult) return;
  const values = collectFormValues(workflowCounterForm);
  const gate = workflowCurrentGate();
  const clause = lastWorkflowClauseVersion;
  const side = values.side || "Broker neutral";
  const goal = values.goal || "Protect clauses";
  const rate = lastNegotiationPro?.suggested || gate.freight * (gate.risk >= 62 ? 1.03 : 1.01);
  const clauseLine = clause?.verdict === "Protection weakened"
    ? "Please reinstate valid NOR, weather exception and time-bar wording before subjects are lifted."
    : "Please confirm NOR validity, waiting time, weather exceptions, demurrage/dispatch and full document list in recap.";
  const wording = [
    `Many thanks. ${side} can counter commercially at ${money(rate, 2)}/${gate.cargo.unit} basis ${gate.parsed.route || "route TBC"}.`,
    clauseLine,
    goal === "Lift subjects safely" ? "Subjects can be lifted only after receiver/terminal, agency PDA and vessel suitability are confirmed." : "This remains subject to clean CP wording, management approval and final stem confirmation.",
    `Current commercial screen shows TCE ${money(gate.tce)}/day and risk ${gate.risk}/100.`
  ].join(" ");
  const posture = gate.risk >= 72 ? "Firm reservation" : gate.risk >= 55 ? "Commercial counter" : "Close to fix";
  lastWorkflowCounter = { values, wording, posture, rate };
  workflowCounterResult.innerHTML = `
    ${metricCards([
      { label: "Posture", value: escapeHtml(posture) },
      { label: "Counter rate", value: `${money(rate, 2)}/${gate.cargo.unit}` },
      { label: "Risk basis", value: `${gate.risk}/100` }
    ])}
    <pre>${escapeHtml(wording)}</pre>
  `;
  renderWorkflowDealRoom();
  renderWorkflowMission();
}

function renderWorkflowWhatIf() {
  if (!workflowWhatIfForm || !workflowWhatIfResult) return;
  const values = collectFormValues(workflowWhatIfForm);
  const gate = workflowCurrentGate();
  const freightDelta = Number(values.freightDelta) || 0;
  const bunkerDelta = Number(values.bunkerDelta) || 0;
  const delayDelta = Number(values.delayDelta) || 0;
  const speedSavingPct = Number(values.speedSavingPct) || 0;
  const newFreight = Math.max(0, gate.freight + freightDelta);
  const newGross = gate.quantity * newFreight;
  const newBrokerage = newGross * (gate.commission / 100);
  const adjustedBunkerTons = gate.bunkerTons * (1 - speedSavingPct / 100);
  const newBunker = adjustedBunkerTons * (Number(gate.values.bunkerPrice || liveFeedState.bunker) + bunkerDelta);
  const newVoyageDays = Math.max(1, gate.voyageDays + delayDelta + Math.max(0, speedSavingPct) * 0.04);
  const extraHire = newVoyageDays * (Number(gate.values.dailyHire) || 14500);
  const adjustedPnl = newGross - newBrokerage - newBunker - gate.portCost - extraHire;
  const adjustedTce = (newGross - newBrokerage - newBunker - gate.portCost) / newVoyageDays;
  const pnlDelta = adjustedPnl - gate.netPnl;
  const recommendation = adjustedTce >= gate.targetTce && adjustedPnl > gate.netPnl
    ? "Counter improves the deal; keep clause protections."
    : adjustedPnl > 0
      ? "Deal stays positive but margin is thinner; reduce delay or improve freight."
      : "Avoid unless freight, demurrage or port risk improves.";
  lastWorkflowWhatIf = { values, adjustedPnl, adjustedTce, pnlDelta, recommendation };
  workflowWhatIfResult.innerHTML = `
    ${metricCards([
      { label: "Adjusted P&L", value: `<em class="${adjustedPnl >= 0 ? "positive" : "negative"}">${money(adjustedPnl)}</em>` },
      { label: "P&L delta", value: `<em class="${pnlDelta >= 0 ? "positive" : "negative"}">${pnlDelta >= 0 ? "+" : ""}${money(pnlDelta)}</em>` },
      { label: "Adjusted TCE", value: `${money(adjustedTce)}/day` },
      { label: "New days", value: newVoyageDays.toFixed(1) }
    ])}
    <div class="danger-box"><span>Recommendation</span><p>${escapeHtml(recommendation)}</p></div>
  `;
  renderWorkflowMission();
  renderFocuseaScore();
}

function workflowMissionItems() {
  const gate = workflowCurrentGate();
  const inboxDeal = workflowLatestDeal();
  return [
    inboxDeal?.deadlineHours && `Chase ${inboxDeal.status.toLowerCase()} before subject deadline in ${inboxDeal.deadlineHours} h.`,
    gate.blockers?.[0] || "Run Deal Quality Gate and clear missing terms.",
    lastWorkflowClauseVersion?.verdict === "Protection weakened" && "Send CP comment: new clause weakens NOR/weather/time-bar protection.",
    lastWorkflowVetting?.risk >= 55 && `Resolve vessel suitability: ${lastWorkflowVetting.verdict}.`,
    lastWorkflowTimeBar?.urgent && `Calendar has ${lastWorkflowTimeBar.urgent} urgent deadline(s).`,
    lastWorkflowOcr?.readiness < 70 && "Upload/paste stronger SOF/NOR evidence before claim pack.",
    lastWorkflowSof?.demurrageAmount > 0 && `Prepare demurrage claim letter for ${money(lastWorkflowSof.demurrageAmount)}.`,
    !lastWorkflowPortalPro && "Generate client portal summary before sharing external update.",
    lastWorkflowCounterparty?.risk >= 50 && `Counterparty risk is ${lastWorkflowCounterparty.risk}/100; tighten payment and subject wording.`,
    lastWorkflowAgency?.waitingRisk >= 60 && `Agency workspace flags port waiting risk ${lastWorkflowAgency.waitingRisk}/100.`,
    lastWorkflowWhatIf?.pnlDelta < 0 && "What-if is hurting P&L; counter freight or reduce waiting.",
    lastPortReality?.status && `Port reality: ${lastPortReality.status} at ${lastPortReality.port.name}.`,
    lastCarbonDesk?.usdCost > 0 && `Attach ETS cost note: ${money(lastCarbonDesk.usdCost)} USD equivalent.`,
    "Send client-safe portal summary after risk notes are cleaned."
  ].filter(Boolean).slice(0, 7);
}

function renderWorkflowMission() {
  if (!workflowMissionResult) return;
  const items = workflowMissionItems();
  lastWorkflowMission = { items, generatedAt: new Date().toLocaleString() };
  workflowMissionResult.innerHTML = `
    ${metricCards([
      { label: "Mission items", value: items.length },
      { label: "Open inbox", value: getWorkflowInbox().length },
      { label: "Generated", value: escapeHtml(new Date().toLocaleTimeString()) }
    ])}
    <div class="mission-list">
      ${items.map((item, index) => `<div><span>${index + 1}</span><p>${escapeHtml(item)}</p></div>`).join("")}
    </div>
  `;
}

function getWorkflowCommunityNotes() {
  const saved = safeLocalGet(workflowCommunityKey, []);
  return Array.isArray(saved) ? saved : [];
}

function setWorkflowCommunityNotes(notes) {
  safeLocalSet(workflowCommunityKey, notes);
}

function renderWorkflowCommunity() {
  if (!workflowCommunityResult) return;
  const notes = getWorkflowCommunityNotes();
  lastWorkflowCommunity = { notes };
  workflowCommunityResult.innerHTML = `
    ${metricCards([
      { label: "Saved notes", value: notes.length },
      { label: "Source", value: `<em class="source-badge input">User input</em>` }
    ])}
    <div class="community-note-list">
      ${(notes.length ? notes : [{ portName: "No notes yet", category: "Start", note: "Save agency, rain letter, docs, waiting and cost notes here.", time: "" }]).slice(0, 8).map((item) => `
        <div>
          <strong>${escapeHtml(item.portName || item.portId || "Port")}</strong>
          <span>${escapeHtml(item.category || "Note")} · ${escapeHtml(item.note || "")}</span>
          <small>${escapeHtml(item.time || "Local browser memory")}</small>
        </div>
      `).join("")}
    </div>
  `;
  renderFocuseaScore();
}

function addWorkflowCommunityNote() {
  if (!workflowCommunityForm) return;
  const values = collectFormValues(workflowCommunityForm);
  const { port } = turkiyePortProfile(values.portId || "mersin");
  const note = {
    portId: values.portId || "mersin",
    portName: port.name,
    category: values.category || "Agency",
    note: values.note || "",
    time: new Date().toLocaleString()
  };
  setWorkflowCommunityNotes([note, ...getWorkflowCommunityNotes()].slice(0, 80));
  renderWorkflowCommunity();
  renderPortReality();
}

function clearWorkflowCommunityNotes() {
  setWorkflowCommunityNotes([]);
  renderWorkflowCommunity();
}

function renderFocuseaScore() {
  if (!workflowScoreResult) return;
  const gate = workflowCurrentGate();
  const penalties = [
    gate.risk * 0.28,
    (lastDocumentRedTeam?.score || 38) * 0.12,
    (lastPortReality?.waitingRisk || gate.portRisk) * 0.11,
    (lastWorkflowVetting?.risk || 42) * 0.12,
    (lastWorkflowClauseVersion?.riskShift || 30) * 0.1,
    (lastWorkflowCounterparty?.risk || 36) * 0.09,
    Math.max(0, gate.targetTce - gate.tce) * 0.0009,
    (lastWorkflowTimeBar?.urgent || 0) * 5
  ];
  const readinessBonus = [
    lastWorkflowInbox ? 4 : 0,
    lastWorkflowDealRoom ? 5 : 0,
    lastWorkflowOcr?.readiness >= 70 ? 5 : 0,
    lastWorkflowSof?.readiness >= 70 ? 5 : 0,
    lastWorkflowCounter ? 4 : 0,
    lastWorkflowMailStudio ? 3 : 0,
    lastWorkflowPortalPro ? 4 : 0,
    getWorkflowCommunityNotes().length ? 3 : 0
  ].reduce((sum, value) => sum + value, 0);
  const score = clamp(Math.round(100 - penalties.reduce((sum, value) => sum + value, 0) + readinessBonus), 0, 100);
  const verdict = score >= 78 ? "Fix-ready with guards" : score >= 58 ? "Workable / watch" : "Do not lift subjects";
  const reasons = [
    `Gate risk ${gate.risk}/100`,
    lastWorkflowVetting ? `Vetting ${lastWorkflowVetting.risk}/100` : "Vetting pending",
    lastWorkflowClauseVersion ? `Clause shift ${lastWorkflowClauseVersion.riskShift}/100` : "Clause version pending",
    lastWorkflowCounterparty ? `Counterparty risk ${lastWorkflowCounterparty.risk}/100` : "Counterparty pending",
    lastWorkflowSof ? `Laytime ${lastWorkflowSof.verdict}` : "SOF laytime pending",
    lastWorkflowTimeBar?.urgent ? `${lastWorkflowTimeBar.urgent} urgent deadline(s)` : "No urgent time-bar flag",
    gate.tce < gate.targetTce ? `TCE gap ${money(gate.targetTce - gate.tce)}/day` : "TCE meets target"
  ];
  lastFocuseaScore = { score, verdict, reasons };
  workflowScoreResult.innerHTML = `
    <div class="workflow-score-ring" style="--score:${score}%">
      <strong>${score}</strong>
      <span>${escapeHtml(verdict)}</span>
    </div>
    <div class="ops-list">${reasons.map((item) => `<div><strong>Signal</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div>
  `;
}

function workflowMonthIndex(value = "") {
  const months = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };
  return months[String(value).slice(0, 3).toLowerCase()] ?? 0;
}

function workflowSofDate(day, month, timeValue) {
  const raw = String(timeValue || "0000").replace(/\D/g, "").padStart(4, "0").slice(0, 4);
  return new Date(new Date().getFullYear(), workflowMonthIndex(month), Number(day), Number(raw.slice(0, 2)), Number(raw.slice(2)));
}

function workflowFindSofDate(text, patterns = []) {
  const match = patterns.map((pattern) => text.match(pattern)).find(Boolean);
  if (!match) return null;
  return {
    date: workflowSofDate(match[1], match[2], match[3]),
    display: `${match[1]} ${match[2]} ${match[3]}`
  };
}

function workflowExtractSof(text = "") {
  const source = String(text || "");
  const events = [
    ["NOR tendered", workflowFindSofDate(source, [/nor\s+tendered[^0-9]*(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{3,4})/i, /nor[^0-9]*(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{3,4})/i])],
    ["All fast", workflowFindSofDate(source, [/all\s+fast[^0-9]*(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{3,4})/i])],
    ["Operations started", workflowFindSofDate(source, [/(?:loading|discharging|operation)[^\n.]*?(?:commenced|started)[^0-9]*(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{3,4})/i])],
    ["Completed", workflowFindSofDate(source, [/(?:completed|completion|loading completed|discharging completed)[^0-9]*(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{3,4})/i])]
  ].map(([label, item]) => ({ label, ...item, found: Boolean(item) }));
  const stoppages = [];
  const stopPattern = /(rain|weather|wind|swell)[^\n.]*?(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{3,4})\s*(?:-|\/|to)\s*(\d{3,4})/gi;
  let match = stopPattern.exec(source);
  while (match) {
    const start = workflowSofDate(match[2], match[3], match[4]);
    const end = workflowSofDate(match[2], match[3], match[5]);
    const hours = Math.max(0, (end - start) / 3600000);
    stoppages.push({
      reason: match[1],
      start,
      end,
      hours,
      display: `${match[2]} ${match[3]} ${match[4]}-${match[5]}`
    });
    match = stopPattern.exec(source);
  }
  return { events, stoppages };
}

function workflowLaytimeReportText(result = lastWorkflowSof) {
  if (!result) return "No laytime report generated.";
  return reportLines("FOCUSEA LAYTIME / DEMURRAGE STATEMENT", [
    `Verdict: ${result.verdict}`,
    `Allowed laytime: ${result.allowedHours.toFixed(2)} h`,
    `Gross used time: ${result.grossHours.toFixed(2)} h`,
    `Excluded time: ${result.excludedHours.toFixed(2)} h`,
    `Net used time: ${result.netHours.toFixed(2)} h`,
    `Balance: ${result.balanceHours.toFixed(2)} h`,
    `Demurrage: ${money(result.demurrageAmount)}`,
    `Dispatch: ${money(result.dispatchAmount)}`,
    "",
    "Events:",
    ...result.events.map((event) => `- ${event.label}: ${event.display || "missing"}`),
    "",
    "Stoppages:",
    ...(result.stoppages.length ? result.stoppages.map((item) => `- ${item.reason}: ${item.display} (${item.hours.toFixed(2)} h)`) : ["- No stoppage extracted"]),
    "",
    "Evidence checklist:",
    ...result.evidence.map((item) => `- ${item}`)
  ]);
}

function workflowClaimLetterText(result = lastWorkflowSof) {
  const gate = workflowCurrentGate();
  const sof = result || lastWorkflowSof;
  return [
    "Dear all,",
    "",
    `Please find below our preliminary laytime position for ${gate.parsed.route || "the subject voyage"}.`,
    sof ? `Net laytime used is ${sof.netHours.toFixed(2)} hours against allowed ${sof.allowedHours.toFixed(2)} hours. Current position: ${sof.verdict}.` : "Laytime statement is pending final SOF verification.",
    sof?.demurrageAmount ? `Demurrage claimed: ${money(sof.demurrageAmount)} basis ${money(sof.demurrageRate)}/day pro rata.` : "",
    sof?.dispatchAmount ? `Dispatch calculation: ${money(sof.dispatchAmount)} basis ${money(sof.dispatchRate)}/day.` : "",
    "",
    "Kindly confirm agreement or provide comments together with signed SOF, NOR, rain/weather logs and terminal operation records.",
    "",
    "Best regards,"
  ].filter(Boolean).join("\n");
}

function renderWorkflowSofEngine() {
  if (!workflowSofForm || !workflowSofResult) return;
  const values = collectFormValues(workflowSofForm);
  const extracted = workflowExtractSof(values.sofText || "");
  const start = extracted.events.find((event) => event.label === "Operations started" && event.found)?.date
    || extracted.events.find((event) => event.label === "All fast" && event.found)?.date
    || extracted.events.find((event) => event.label === "NOR tendered" && event.found)?.date;
  const end = extracted.events.find((event) => event.label === "Completed" && event.found)?.date;
  const grossHours = start && end ? Math.max(0, (end - start) / 3600000) : 0;
  const excludedHours = extracted.stoppages.reduce((sum, item) => sum + item.hours, 0);
  const netHours = Math.max(0, grossHours - excludedHours);
  const allowedHours = Number(values.allowedHours) || 72;
  const demurrageRate = Number(values.demurrageRate) || workflowCurrentGate().demurrageRate;
  const dispatchRate = Number(values.dispatchRate) || demurrageRate / 2;
  const balanceHours = netHours - allowedHours;
  const demurrageAmount = balanceHours > 0 ? (balanceHours / 24) * demurrageRate : 0;
  const dispatchAmount = balanceHours < 0 ? (Math.abs(balanceHours) / 24) * dispatchRate : 0;
  const verdict = demurrageAmount > 0 ? "DEMURRAGE" : dispatchAmount > 0 ? "DISPATCH" : "BALANCED";
  const foundEvents = extracted.events.filter((event) => event.found).length;
  const readiness = clamp(Math.round(foundEvents * 18 + extracted.stoppages.length * 8 + (grossHours ? 18 : 0)), 0, 100);
  const evidence = [
    "Signed NOR with tender/acceptance time",
    "Signed SOF with all stoppages",
    "Rain/weather letter and terminal log",
    "Cargo operation log / pumping log",
    "Laytime statement, invoice and CP recap"
  ];
  lastWorkflowSof = {
    values,
    events: extracted.events,
    stoppages: extracted.stoppages,
    grossHours,
    excludedHours,
    netHours,
    allowedHours,
    balanceHours,
    demurrageRate,
    dispatchRate,
    demurrageAmount,
    dispatchAmount,
    verdict,
    readiness,
    evidence,
    reportText: ""
  };
  lastWorkflowSof.reportText = workflowLaytimeReportText(lastWorkflowSof);
  workflowSofResult.innerHTML = `
    ${metricCards([
      { label: "Verdict", value: escapeHtml(verdict) },
      { label: "Net used", value: `${netHours.toFixed(1)} h` },
      { label: "Balance", value: `${balanceHours.toFixed(1)} h` },
      { label: "Demurrage", value: money(demurrageAmount) },
      { label: "Dispatch", value: money(dispatchAmount) },
      { label: "Readiness", value: `${readiness}/100` }
    ])}
    <div class="workflow-two-col">
      <div class="workflow-event-list">
        ${extracted.events.map((event) => `<div class="${event.found ? "found" : "missing"}"><strong>${escapeHtml(event.label)}</strong><span>${escapeHtml(event.display || "missing")}</span></div>`).join("")}
      </div>
      <div class="ops-list">
        ${evidence.map((item) => `<div><strong>Evidence</strong><span>${escapeHtml(item)}</span></div>`).join("")}
      </div>
    </div>
  `;
  renderWorkflowDealRoom();
  renderWorkflowReportCenter();
  renderWorkflowMission();
  renderFocuseaScore();
}

function workflowDealRoomReportText() {
  const gate = workflowCurrentGate();
  const room = lastWorkflowDealRoom;
  return reportLines("FOCUSEA DEAL ROOM", [
    `Decision: ${gate.decision}`,
    `Risk: ${gate.risk}/100`,
    `Cargo: ${gate.cargo.label}`,
    `Route: ${gate.parsed.route || "TBC"}`,
    `TCE: ${money(gate.tce)}/day`,
    `Net P&L: ${money(gate.netPnl)}`,
    "",
    "Documents:",
    ...(room?.documents || []).map(([title, status]) => `- ${title}: ${status}`),
    "",
    "Actions:",
    ...(room?.todo || gate.blockers || []).map((item) => `- ${item}`)
  ]);
}

function workflowClientReportText() {
  const gate = workflowCurrentGate();
  const portal = lastWorkflowPortalPro;
  return reportLines("FOCUSEA CLIENT PORTAL SUMMARY", [
    `Client: ${portal?.values?.client || "Client TBC"}`,
    `Mode: ${portal?.values?.mode || "Client-safe summary"}`,
    `Deal status: ${gate.decision}`,
    `Route: ${gate.parsed.route || "TBC"}`,
    `ETA / stage: ${lastWorkflowDealRoom?.values?.stage || "Counter"}`,
    `Estimated TCE: ${money(gate.tce)}/day`,
    `Estimated P&L: ${money(gate.netPnl)}`,
    `Focusea Score: ${lastFocuseaScore?.score || "-"} / 100`,
    "",
    "Visible notes:",
    "- Commercial values are planning estimates and subject to final recap.",
    "- Live or licensed sources are labelled in the trust ledger.",
    "- Claim and laytime data depend on signed evidence."
  ]);
}

function workflowFullPack() {
  return {
    generatedAt: new Date().toLocaleString(),
    gate: lastWorkflowGate || workflowCurrentGate(),
    inbox: lastWorkflowInbox,
    dealRoom: lastWorkflowDealRoom,
    sof: lastWorkflowSof,
    portal: lastWorkflowPortalPro,
    counterparty: lastWorkflowCounterparty,
    agency: lastWorkflowAgency,
    mail: lastWorkflowMailStudio,
    comparison: lastWorkflowComparison,
    score: lastFocuseaScore,
    trust: lastWorkflowTrustLedger
  };
}

function getWorkflowReports() {
  const saved = safeLocalGet(workflowReportsKey, []);
  return Array.isArray(saved) ? saved : [];
}

function setWorkflowReports(items) {
  safeLocalSet(workflowReportsKey, items);
}

function saveWorkflowReportSnapshot() {
  const gate = workflowCurrentGate();
  const item = {
    time: new Date().toLocaleString(),
    title: gate.parsed.route || "Workflow pack",
    decision: gate.decision,
    score: lastFocuseaScore?.score || 0,
    pnl: gate.netPnl,
    reportText: workflowDealRoomReportText()
  };
  setWorkflowReports([item, ...getWorkflowReports()].slice(0, 50));
  renderWorkflowReportCenter();
}

function clearWorkflowReportHistory() {
  setWorkflowReports([]);
  renderWorkflowReportCenter();
}

function renderWorkflowReportCenter() {
  if (!workflowReportCenterResult) return;
  const reports = getWorkflowReports();
  const gate = workflowCurrentGate();
  const ready = [
    ["Deal Room PDF", Boolean(lastWorkflowDealRoom)],
    ["Laytime PDF", Boolean(lastWorkflowSof)],
    ["Client Portal PDF", Boolean(lastWorkflowPortalPro)],
    ["Mail TXT", Boolean(lastWorkflowMailStudio)],
    ["Full JSON", true]
  ];
  workflowReportCenterResult.innerHTML = `
    ${metricCards([
      { label: "Ready outputs", value: `${ready.filter((item) => item[1]).length}/${ready.length}` },
      { label: "History", value: reports.length },
      { label: "Current risk", value: `${gate.risk}/100` },
      { label: "Last score", value: lastFocuseaScore?.score || "-" }
    ])}
    <div class="workflow-two-col">
      <div class="ops-list">${ready.map(([title, ok]) => `<div><strong>${escapeHtml(title)}</strong><span>${ok ? "Ready to download" : "Run module first"}</span></div>`).join("")}</div>
      <div class="ops-list">${(reports.length ? reports : [{ title: "No saved report yet", time: "Use Save report history", decision: "Pending", score: "-" }]).slice(0, 6).map((item) => `<div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.time)} / ${escapeHtml(item.decision)} / score ${item.score}</span></div>`).join("")}</div>
    </div>
  `;
}

function renderWorkflowPortalPro() {
  if (!workflowPortalProForm || !workflowPortalProResult) return;
  const values = collectFormValues(workflowPortalProForm);
  const gate = workflowCurrentGate();
  const tokenBase = `${values.client || "client"}-${gate.parsed.route || gate.cargo.label}-${gate.risk}`;
  const token = tokenBase.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
  const expiry = workflowDateAfter({ days: Number(values.expiryDays) || 7 });
  const portalUrl = `https://captainemo03.github.io/focusea/#client-${token}`;
  const visible = [
    `Decision: ${gate.decision}`,
    `Route: ${gate.parsed.route || "TBC"}`,
    `TCE: ${money(gate.tce)}/day`,
    `P&L: ${money(gate.netPnl)}`,
    `Laytime: ${lastWorkflowSof?.verdict || "pending"}`,
    `Next action: ${workflowMissionItems()[0] || gate.protections[0]}`
  ];
  lastWorkflowPortalPro = { values, token, portalUrl, expiry, visible, reportText: "" };
  lastWorkflowPortalPro.reportText = workflowClientReportText();
  workflowPortalProResult.innerHTML = `
    ${metricCards([
      { label: "Portal", value: "Share-ready" },
      { label: "Access token", value: escapeHtml(token || "client") },
      { label: "Expires", value: workflowDateLabel(expiry) },
      { label: "Mode", value: escapeHtml(values.mode || "Client-safe summary") }
    ])}
    <div class="confidence-row"><span>Portal preview</span><em class="source-badge simulated">Static link</em><a href="${portalUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(portalUrl)}</a></div>
    <div class="ops-list">${visible.map((item) => `<div><strong>Client line</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div>
  `;
  renderWorkflowReportCenter();
  renderWorkflowMission();
  renderFocuseaScore();
}

function renderWorkflowCounterparty() {
  if (!workflowCounterpartyForm || !workflowCounterpartyResult) return;
  const values = collectFormValues(workflowCounterpartyForm);
  const paymentRisk = values.payment === "Dispute history" ? 34 : values.payment === "Slow payer" ? 22 : values.payment === "Unknown" ? 18 : 4;
  const claimRisk = (Number(values.openClaims) || 0) * 14;
  const experienceCredit = Math.min(18, (Number(values.pastFixtures) || 0) * 3);
  const risk = clamp(Math.round(34 + paymentRisk + claimRisk - experienceCredit), 0, 100);
  const trust = clamp(100 - risk, 0, 100);
  const verdict = risk >= 70 ? "Do not lift subjects without protection" : risk >= 50 ? "Tight subjects / references" : "Workable counterparty";
  const actions = [
    risk >= 50 ? "Ask for payment references and prior fixture performance." : "Keep normal payment and recap trail.",
    "Log last contact, claim history and final payment outcome.",
    "Add sanctions / bank / beneficial owner checklist before firm fixture.",
    Number(values.openClaims) ? "Keep claim documents and time-bar calendar visible in deal room." : "No open claim entered."
  ];
  lastWorkflowCounterparty = { values, risk, trust, verdict, actions };
  workflowCounterpartyResult.innerHTML = `
    ${metricCards([
      { label: "Trust", value: `${trust}/100` },
      { label: "Risk", value: `${risk}/100` },
      { label: "Verdict", value: escapeHtml(verdict) },
      { label: "Role", value: escapeHtml(values.role || "Counterparty") }
    ])}
    <div class="ops-list">${actions.map((item) => `<div><strong>Action</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div>
  `;
  renderWorkflowDealRoom();
  renderWorkflowMission();
  renderFocuseaScore();
}

function renderWorkflowAgency() {
  if (!workflowAgencyForm || !workflowAgencyResult) return;
  const values = collectFormValues(workflowAgencyForm);
  const { port, id, ops } = turkiyePortProfile(values.portId || "mersin");
  const eta = workflowDateAfter({ days: Number(values.etaDays) || 0 });
  const berthWindow = Number(values.berthWindow) || 0;
  const pda = Number(values.pda) || portCostBase(port) * ops.costFactor;
  const waitingRisk = turkiyeWaitingRisk(id, Math.max(0, berthWindow < 24 ? 2 : 1), workflowCurrentGate().cargo.risk);
  const timeline = [
    `ETA: ${workflowDateLabel(eta)}`,
    "Request PDA / berth window / terminal restrictions",
    "Confirm free pratique, customs, ISPS and cargo documents",
    "Pilot / tug / berth line-up",
    "NOR, SOF, rain letter and departure docs"
  ];
  const docs = [...(port.documents || []), ...(ops.localDocs || [])].slice(0, 7);
  lastWorkflowAgency = { values, port, eta, pda, waitingRisk, timeline, docs };
  workflowAgencyResult.innerHTML = `
    ${metricCards([
      { label: "Port", value: escapeHtml(port.name) },
      { label: "PDA screen", value: money(pda) },
      { label: "Waiting risk", value: `${waitingRisk}/100` },
      { label: "Berth window", value: `${berthWindow} h` }
    ])}
    <div class="workflow-two-col">
      <div class="ops-list">${timeline.map((item) => `<div><strong>Timeline</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div>
      <div class="ops-list">${docs.map((item) => `<div><strong>Document</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div>
    </div>
  `;
  renderWorkflowMission();
  renderFocuseaScore();
}

function workflowMailStudioText() {
  const values = workflowMailStudioForm ? collectFormValues(workflowMailStudioForm) : {};
  const gate = workflowCurrentGate();
  const subject = `${values.mailType || "Counter offer"} - ${gate.cargo.label} - ${gate.parsed.route || "route TBC"}`;
  const body = [
    `Subject: ${subject}`,
    "",
    `Dear ${values.recipient || "all"},`,
    "",
    values.mailType === "Claim reminder"
      ? `Please note our current laytime position is ${lastWorkflowSof?.verdict || "pending final calculation"}. Kindly provide signed SOF, NOR, rain/weather logs and terminal records.`
      : values.mailType === "CP comment"
        ? `Please review the CP wording. ${lastWorkflowClauseVersion?.verdict || "Clause version review pending"}. Our counter is to clarify NOR validity, waiting time, weather exceptions and time-bar wording.`
        : values.mailType === "Fixture recap"
          ? `Please find recap basis: ${gate.quantity.toLocaleString("en-US")} ${gate.cargo.unit} ${gate.cargo.label}, ${gate.parsed.route || "route TBC"}, freight ${money(gate.freight, 2)}/${gate.cargo.unit}, demurrage ${money(gate.demurrageRate)}/day.`
          : values.mailType === "Firm offer"
            ? `We can offer firm basis ${gate.parsed.route || "route TBC"} at ${money(gate.freight, 2)}/${gate.cargo.unit}, subject clean recap, receiver/terminal confirmation and management approval.`
            : `Charterers counter at ${lastWorkflowCounter?.rate ? money(lastWorkflowCounter.rate, 2) : money(gate.freight * 1.02, 2)}/${gate.cargo.unit}, subject clean NOR/weather/waiting wording, agency PDA and final approval.`,
    "",
    `Focusea screen: ${gate.decision}, risk ${gate.risk}/100, TCE ${money(gate.tce)}/day.`,
    "",
    "Best regards,"
  ];
  return body.join("\n");
}

function renderWorkflowMailStudio() {
  if (!workflowMailStudioForm || !workflowMailStudioResult) return;
  const values = collectFormValues(workflowMailStudioForm);
  const text = workflowMailStudioText();
  const riskNote = workflowCurrentGate().risk >= 60 ? "Keep wording firm and conditional." : "Commercial tone can stay open.";
  lastWorkflowMailStudio = { values, text, riskNote };
  workflowMailStudioResult.innerHTML = `
    ${metricCards([
      { label: "Mail type", value: escapeHtml(values.mailType || "Counter offer") },
      { label: "Tone", value: escapeHtml(values.tone || "Commercial") },
      { label: "Risk note", value: escapeHtml(riskNote) }
    ])}
    <pre>${escapeHtml(text)}</pre>
  `;
  renderWorkflowReportCenter();
  renderWorkflowMission();
  renderFocuseaScore();
}

function workflowCompareDeal(text = "", label = "Deal") {
  const parsed = parseOfferText(text);
  const cargo = getCargoProfile(parsed.cargoType);
  const quantity = parsed.quantity || defaultQuantityForCargo(cargo);
  const freight = parsed.freight || cargo.baseFreight * cargo.freightMultiplier;
  const demurrage = parsed.demurrage || 15000 * cargo.demurrageMultiplier;
  const risk = scoreParsedOffer(parsed);
  const voyageDays = 18 + cargo.risk / 30 + (parsed.laycanDays && parsed.laycanDays <= 3 ? 1.5 : 0);
  const gross = quantity * freight;
  const bunker = voyageDays * (cargo.unit === "TEU" ? 52 : cargo.unit === "cbm" ? 76 : 28) * cargo.bunkerMultiplier * (liveFeedState.bunker || verifiedBunkerSnapshot.ports.singapore.vlsfo);
  const tce = (gross - bunker - 65000 * cargo.portCostMultiplier) / voyageDays;
  const score = clamp(Math.round(100 - risk.score * 0.5 + Math.max(-20, (tce - 18000) / 900) + (demurrage / 1000)), 0, 100);
  return { label, parsed, cargo, quantity, freight, demurrage, risk, voyageDays, gross, bunker, tce, score };
}

function renderWorkflowComparison() {
  if (!workflowComparisonForm || !workflowComparisonResult) return;
  const values = collectFormValues(workflowComparisonForm);
  const deals = [
    workflowCompareDeal(values.dealA || "", "A"),
    workflowCompareDeal(values.dealB || "", "B"),
    workflowCompareDeal(values.dealC || "", "C")
  ].sort((a, b) => b.score - a.score);
  const winner = deals[0];
  lastWorkflowComparison = { values, deals, winner };
  workflowComparisonResult.innerHTML = `
    ${metricCards([
      { label: "Best deal", value: `Deal ${escapeHtml(winner.label)}` },
      { label: "Best score", value: `${winner.score}/100` },
      { label: "Best TCE", value: `${money(winner.tce)}/day` },
      { label: "Risk", value: `${winner.risk.score}/100` }
    ])}
    <div class="workflow-comparison-grid">
      ${deals.map((deal) => `
        <div>
          <strong>Deal ${escapeHtml(deal.label)} - ${escapeHtml(deal.cargo.label)}</strong>
          <span>${escapeHtml(deal.parsed.route || "Route TBC")}</span>
          <small>Freight ${money(deal.freight, 2)} / TCE ${money(deal.tce)}/day / risk ${deal.risk.score}/100 / score ${deal.score}</small>
        </div>
      `).join("")}
    </div>
  `;
  renderWorkflowMission();
  renderFocuseaScore();
}

function renderWorkflowTrustLedger() {
  if (!workflowTrustLedgerResult) return;
  const rows = [
    ["Fixture text", "User pasted offer / recap / SOF", "input", lastWorkflowInbox ? 90 : 65],
    ["Bunker", verifiedBunkerSnapshot.sourceName, "verified", 84],
    ["Baltic indices", balticFeedState.connected ? balticFeedState.lastSource : "Licensed endpoint required", balticFeedState.connected ? "verified" : "licensed", balticFeedState.connected ? 88 : 56],
    ["Weather", "NWS API-ready; static page uses user weather text", "api-ready", lastWeatherLaytime ? 78 : 62],
    ["Port", "UN/LOCODE + NGA WPI import-ready + local note", "api-ready", lastWorkflowAgency ? 82 : 66],
    ["SOF / laytime", "Rule engine over pasted SOF; signed docs required", "input", lastWorkflowSof ? lastWorkflowSof.readiness : 55],
    ["Counterparty", "Local risk memory / user input", "input", lastWorkflowCounterparty ? 76 : 52],
    ["Python backend", "FastAPI endpoints available when backend is running", "api-ready", 70]
  ];
  lastWorkflowTrustLedger = { rows, generatedAt: new Date().toLocaleString() };
  workflowTrustLedgerResult.innerHTML = `
    <div class="confidence-list">${rows.map(([name, source, badge, confidence]) => `
      <div class="confidence-row">
        <span>${escapeHtml(name)}<small>${escapeHtml(source)}</small></span>
        <em class="source-badge ${badge}">${sourceBadgeText(badge)}</em>
        <strong>${confidence}%</strong>
      </div>
    `).join("")}</div>
  `;
}

function renderWorkflowBackendConnector() {
  if (!workflowBackendConnectorResult) return;
  const endpoints = [
    ["POST /api/broker/parse-offer", "Mail / WhatsApp -> parsed offer + recap"],
    ["POST /api/laytime/sof", "SOF -> laytime / demurrage / dispatch"],
    ["POST /api/voyage/estimate", "Voyage estimate + TCE + P&L"],
    ["POST /api/charterparty/diff", "CP diff + risk + counter wording"],
    ["POST /api/stability/evaluate", "Loadicator calculation"],
    ["POST /api/reports/{type}/pdf", "Real PDF export"]
  ];
  lastWorkflowBackendConnector = { endpoints, generatedAt: new Date().toLocaleString() };
  workflowBackendConnectorResult.innerHTML = `
    ${metricCards([
      { label: "Backend", value: "FastAPI ready" },
      { label: "Endpoints", value: endpoints.length },
      { label: "Run", value: "uvicorn backend.main:app --reload" },
      { label: "Mode", value: `<em class="source-badge api-ready">API-ready</em>` }
    ])}
    <div class="workflow-two-col">
      <div class="ops-list">${endpoints.map(([path, use]) => `<div><strong>${escapeHtml(path)}</strong><span>${escapeHtml(use)}</span></div>`).join("")}</div>
      <pre>cd backend
pip install -r requirements.txt
uvicorn backend.main:app --reload</pre>
    </div>
  `;
}

function handleWorkflowProDownload(type) {
  if (!lastWorkflowSof) renderWorkflowSofEngine();
  if (!lastWorkflowPortalPro) renderWorkflowPortalPro();
  if (!lastWorkflowMailStudio) renderWorkflowMailStudio();
  const actions = {
    "laytime-pdf": () => downloadPdfFile("focusea-laytime-statement.pdf", "Focusea Laytime Statement", workflowLaytimeReportText()),
    "claim-txt": () => downloadTextFile("focusea-demurrage-claim-letter.txt", workflowClaimLetterText()),
    "deal-pdf": () => downloadPdfFile("focusea-deal-room.pdf", "Focusea Deal Room", workflowDealRoomReportText()),
    "client-pdf": () => downloadPdfFile("focusea-client-portal-summary.pdf", "Focusea Client Portal", workflowClientReportText()),
    "full-json": () => downloadJsonFile("focusea-workflow-full-pack.json", workflowFullPack()),
    "mail-txt": () => downloadTextFile("focusea-broker-mail.txt", lastWorkflowMailStudio?.text || workflowMailStudioText())
  };
  actions[type]?.();
  renderWorkflowReportCenter();
}

const saasWorkspaceKey = "focusea-saas-workspace-v1";
const saasContractsKey = "focusea-saas-contract-memory-v1";
const saasAdminKey = "focusea-saas-admin-v1";
const saasSourcesKey = "focusea-saas-market-sources-v1";

function saasWorkspace() {
  const fallback = {
    account: null,
    documents: [],
    alarms: [],
    emails: [],
    clientPortals: [],
    reports: [],
    updatedAt: ""
  };
  const saved = safeLocalGet(saasWorkspaceKey, fallback);
  return saved && typeof saved === "object" ? { ...fallback, ...saved } : fallback;
}

function saveSaasWorkspacePatch(patch = {}) {
  const workspace = { ...saasWorkspace(), ...patch, updatedAt: new Date().toLocaleString() };
  safeLocalSet(saasWorkspaceKey, workspace);
  return workspace;
}

function clearSaasWorkspaceState() {
  safeLocalSet(saasWorkspaceKey, {
    account: null,
    documents: [],
    alarms: [],
    emails: [],
    clientPortals: [],
    reports: [],
    updatedAt: new Date().toLocaleString()
  });
  renderAllSaasCore();
}

function saasToken(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 52) || "focusea";
}

function saasFileMeta(file) {
  if (!file || typeof file !== "object" || !("name" in file)) return null;
  if (!file.name) return null;
  const ext = String(file.name).split(".").pop()?.toLowerCase() || "";
  return {
    name: file.name,
    size: file.size || 0,
    ext,
    sizeLabel: `${((file.size || 0) / 1024 / 1024).toFixed(2)} MB`
  };
}

function renderSaasAccount() {
  if (!saasAccountForm || !saasAccountResult) return;
  const values = collectFormValues(saasAccountForm);
  const workspace = saveSaasWorkspacePatch({
    account: {
      ...values,
      userId: `USR-${saasToken(`${values.company}-${values.userName}`).slice(0, 20)}`,
      savedAt: new Date().toLocaleString()
    }
  });
  lastSaasAccount = workspace.account;
  const buckets = [
    ["Documents", workspace.documents.length],
    ["Alarms", workspace.alarms.length],
    ["Emails", workspace.emails.length],
    ["Client portals", workspace.clientPortals.length],
    ["Reports", getWorkflowReports().length]
  ];
  saasAccountResult.innerHTML = `
    ${metricCards([
      { label: "User ID", value: escapeHtml(workspace.account.userId) },
      { label: "Plan", value: escapeHtml(values.plan || "Broker Pro") },
      { label: "Role", value: escapeHtml(values.role || "Broker") },
      { label: "Workspace", value: `<em class="source-badge input">Local DB</em>` }
    ])}
    <div class="workflow-two-col">
      <div class="ops-list">${buckets.map(([name, count]) => `<div><strong>${escapeHtml(name)}</strong><span>${count} saved item(s)</span></div>`).join("")}</div>
      <div class="danger-box"><span>Backend upgrade path</span><p>LocalStorage simulates account persistence. FastAPI auth + database can replace this without changing the UI flow.</p></div>
    </div>
  `;
}

function saasSecurityScan(text = "", fileMeta = null) {
  const allowed = ["pdf", "doc", "docx", "txt", "eml", "png", "jpg", "jpeg"];
  const patterns = [
    [/javascript:/i, "javascript URL"],
    [/<script/i, "script tag"],
    [/\b(?:password|api[_-]?key|secret|token)\b/i, "possible secret"],
    [/\.(?:exe|bat|cmd|ps1|scr)\b/i, "executable reference"],
    [/data:text\/html/i, "inline HTML payload"],
    [/http:\/\/[^\s]+/i, "non-HTTPS link"]
  ];
  const findings = patterns.filter(([pattern]) => pattern.test(text)).map(([, label]) => label);
  if (fileMeta && !allowed.includes(fileMeta.ext)) findings.push(`blocked extension .${fileMeta.ext || "unknown"}`);
  if (fileMeta && fileMeta.size > 10 * 1024 * 1024) findings.push("file larger than 10 MB");
  const score = clamp(100 - findings.length * 18 - (fileMeta?.size > 5 * 1024 * 1024 ? 8 : 0), 0, 100);
  const verdict = score >= 82 ? "Clean for local parsing" : score >= 58 ? "Review before upload" : "Block / backend scan required";
  return { score, verdict, findings };
}

function renderSaasDocument() {
  if (!saasDocumentForm || !saasDocumentResult) return;
  const values = collectFormValues(saasDocumentForm);
  const fileMeta = saasFileMeta(values.documentFile);
  const text = String(values.documentText || "");
  const scan = saasSecurityScan(text, fileMeta);
  const parsedOffer = parseOfferText(text);
  const sof = workflowExtractSof(text);
  const clauseFindings = redTeamFindings(text, "Document upload");
  const record = {
    id: `DOC-${Date.now().toString().slice(-6)}`,
    file: fileMeta,
    type: fileMeta?.ext || "pasted-text",
    parsedRoute: parsedOffer.route || "",
    safetyScore: scan.score,
    verdict: scan.verdict,
    savedAt: new Date().toLocaleString()
  };
  lastSaasDocument = { values, fileMeta, scan, parsedOffer, sof, clauseFindings, record };
  saasDocumentResult.innerHTML = `
    ${metricCards([
      { label: "Safety", value: `${scan.score}/100` },
      { label: "Verdict", value: escapeHtml(scan.verdict) },
      { label: "File", value: escapeHtml(fileMeta?.name || "Pasted text") },
      { label: "SOF events", value: sof.events.filter((item) => item.found).length },
      { label: "Clause flags", value: clauseFindings.length }
    ])}
    <div class="workflow-two-col">
      <div class="ops-list">${(scan.findings.length ? scan.findings : ["No browser-side unsafe pattern found"]).map((item) => `<div><strong>Safety</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div>
      <div class="ops-list">
        <div><strong>Parsed route</strong><span>${escapeHtml(parsedOffer.route || "Route TBC")}</span></div>
        <div><strong>Backend note</strong><span>True OCR and antivirus scan require deployed backend worker.</span></div>
      </div>
    </div>
  `;
  renderSaasSecurity();
  renderSaasAnalytics();
}

function saasDealRoomText() {
  const gate = workflowCurrentGate();
  return reportLines("FOCUSEA FULL DEAL ROOM", [
    `Workspace user: ${lastSaasAccount?.userName || saasWorkspace().account?.userName || "Local user"}`,
    `Decision: ${gate.decision}`,
    `Cargo: ${gate.cargo.label}`,
    `Route: ${gate.parsed.route || "TBC"}`,
    `TCE: ${money(gate.tce)}/day`,
    `P&L: ${money(gate.netPnl)}`,
    `Laytime: ${lastWorkflowSof?.verdict || "Pending"}`,
    `Counterparty: ${lastWorkflowCounterparty?.verdict || lastSaasAccount?.company || "Pending"}`,
    "",
    "Deal room tabs:",
    "- Overview / Inbox / Recap / CP / SOF / Laytime / Claim / Invoice / Client Portal / Notes / Timeline",
    "",
    "Open actions:",
    ...workflowMissionItems().map((item) => `- ${item}`)
  ]);
}

function renderSaasDealRoom() {
  if (!saasDealRoomResult) return;
  const gate = workflowCurrentGate();
  const tabs = [
    ["Overview", gate.decision],
    ["Inbox", `${getWorkflowInbox().length} saved`],
    ["Recap", gate.parsed.missing.length ? "Missing terms" : "Ready"],
    ["CP", lastWorkflowClauseVersion?.verdict || "Diff pending"],
    ["SOF", lastWorkflowSof?.verdict || "Laytime pending"],
    ["Claim", lastWorkflowSof?.demurrageAmount ? money(lastWorkflowSof.demurrageAmount) : "No claim"],
    ["Invoice", lastCarbonDesk ? "ETS attached" : "Draft"],
    ["Client Portal", lastSaasClientPortal?.portalUrl ? "Live preview" : "Pending"],
    ["Notes", `${getWorkflowCommunityNotes().length} local`],
    ["Timeline", lastSaasAlarm ? `${lastSaasAlarm.alarms.length} alarms` : "Pending"]
  ];
  lastSaasDealRoom = { tabs, reportText: saasDealRoomText(), gate };
  saasDealRoomResult.innerHTML = `
    ${metricCards([
      { label: "Deal status", value: escapeHtml(gate.decision) },
      { label: "Focusea score", value: lastFocuseaScore?.score || "-" },
      { label: "Tabs", value: tabs.length },
      { label: "Client portal", value: lastSaasClientPortal ? "Ready" : "Pending" }
    ])}
    <div class="saas-tab-grid">${tabs.map(([name, status]) => `<div><strong>${escapeHtml(name)}</strong><span>${escapeHtml(status)}</span></div>`).join("")}</div>
  `;
}

function saasAlarmDate(hours = 0, days = 0) {
  return workflowDateAfter({ hours, days });
}

function saasIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function renderSaasAlarm() {
  if (!saasAlarmForm || !saasAlarmResult) return;
  const values = collectFormValues(saasAlarmForm);
  const alarms = [
    { title: "Subject deadline", date: saasAlarmDate(Number(values.subjectHours) || 0, 0), severity: Number(values.subjectHours) <= 12 ? "High" : "Watch" },
    { title: "Laycan canceling", date: saasAlarmDate(0, Number(values.cancelingDays) || 0), severity: Number(values.cancelingDays) <= 5 ? "High" : "Watch" },
    { title: "Demurrage time bar", date: saasAlarmDate(0, Number(values.timeBarDays) || 90), severity: Number(values.timeBarDays) <= 30 ? "High" : "Normal" },
    { title: "Invoice due", date: saasAlarmDate(0, Number(values.invoiceDays) || 21), severity: Number(values.invoiceDays) <= 7 ? "High" : "Normal" }
  ];
  lastSaasAlarm = { values, alarms };
  saasAlarmResult.innerHTML = `
    ${metricCards([
      { label: "Alarms", value: alarms.length },
      { label: "High", value: alarms.filter((item) => item.severity === "High").length },
      { label: "Next", value: workflowDateLabel(alarms[0].date) },
      { label: "Calendar", value: "ICS ready" }
    ])}
    <div class="timebar-list">${alarms.map((alarm) => `<div class="${alarm.severity === "High" ? "high" : "medium"}"><strong>${escapeHtml(alarm.title)}</strong><span>${workflowDateLabel(alarm.date)}</span><em>${escapeHtml(alarm.severity)}</em></div>`).join("")}</div>
  `;
  renderSaasAnalytics();
}

function saasIcsText() {
  const alarms = lastSaasAlarm?.alarms || [];
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Focusea//SaaS Core//EN"];
  alarms.forEach((alarm, index) => {
    const start = alarm.date;
    const end = new Date(start.getTime() + 30 * 60000);
    lines.push("BEGIN:VEVENT", `UID:focusea-${Date.now()}-${index}@focusea`, `DTSTAMP:${saasIcsDate(new Date())}`, `DTSTART:${saasIcsDate(start)}`, `DTEND:${saasIcsDate(end)}`, `SUMMARY:${alarm.title}`, `DESCRIPTION:Focusea ${alarm.severity} alarm`, "END:VEVENT");
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function renderSaasEmail() {
  if (!saasEmailForm || !saasEmailResult) return;
  const values = collectFormValues(saasEmailForm);
  const fileMeta = saasFileMeta(values.emailFile);
  const text = String(values.emailText || "");
  const from = text.match(/^From:\s*(.+)$/im)?.[1] || "sender TBC";
  const subject = text.match(/^Subject:\s*(.+)$/im)?.[1] || "subject TBC";
  const parsed = parseOfferText(text);
  const risk = scoreParsedOffer(parsed);
  const item = {
    id: `EML-${Date.now().toString().slice(-6)}`,
    from,
    subject,
    route: parsed.route || "Route TBC",
    cargoType: parsed.cargoType,
    risk: risk.score,
    file: fileMeta,
    savedAt: new Date().toLocaleString()
  };
  lastSaasEmail = { values, fileMeta, from, subject, parsed, risk, item };
  saasEmailResult.innerHTML = `
    ${metricCards([
      { label: "From", value: escapeHtml(from) },
      { label: "Subject", value: escapeHtml(subject) },
      { label: "Route", value: escapeHtml(parsed.route || "TBC") },
      { label: "Risk", value: `${risk.score}/100` }
    ])}
    <div class="ops-list">
      <div><strong>Extracted cargo</strong><span>${escapeHtml(parsed.cargoLabel)} / ${parsed.quantity || "qty TBC"} ${escapeHtml(parsed.unit)}</span></div>
      <div><strong>Next action</strong><span>${parsed.missing.length ? `Ask missing: ${parsed.missing.join(", ")}` : "Create deal room card and recap draft."}</span></div>
    </div>
  `;
  renderSaasAnalytics();
}

function renderSaasAdmin() {
  if (!saasAdminForm || !saasAdminResult) return;
  const values = collectFormValues(saasAdminForm);
  safeLocalSet(saasAdminKey, { ...values, savedAt: new Date().toLocaleString() });
  lastSaasAdmin = values;
  saasAdminResult.innerHTML = `
    ${metricCards([
      { label: "Cargo multiplier", value: Number(values.cargoMultiplier).toFixed(2) },
      { label: "Default bunker", value: money(values.defaultBunker, 2) },
      { label: "Market mode", value: escapeHtml(values.marketMode || "-") },
      { label: "News policy", value: escapeHtml(values.newsPolicy || "-") }
    ])}
    <div class="danger-box"><span>Admin note</span><p>These settings are saved locally now. Backend admin endpoint can promote them into real multi-user defaults.</p></div>
  `;
}

function renderSaasMarketSource() {
  if (!saasMarketSourceForm || !saasMarketSourceResult) return;
  const values = collectFormValues(saasMarketSourceForm);
  safeLocalSet(saasSourcesKey, { ...values, savedAt: new Date().toLocaleString() });
  const rows = [
    ["News", values.newsSource || "No source", "api-ready", values.newsSource ? 74 : 20],
    ["Baltic", values.balticEndpoint || "Licensed required", /licensed/i.test(values.balticEndpoint || "") ? "licensed" : "api-ready", /licensed/i.test(values.balticEndpoint || "") ? 55 : 78],
    ["Bunker", values.bunkerSource || "Verified snapshot", values.bunkerSource === "Verified snapshot" ? "verified" : "api-ready", values.bunkerSource === "Verified snapshot" ? 84 : 72],
    ["Refresh", `${values.refreshMin} min`, "input", 68]
  ];
  lastSaasMarketSource = { values, rows };
  saasMarketSourceResult.innerHTML = `
    <div class="confidence-list">${rows.map(([name, source, badge, confidence]) => `
      <div class="confidence-row"><span>${escapeHtml(name)}<small>${escapeHtml(source)}</small></span><em class="source-badge ${badge}">${sourceBadgeText(badge)}</em><strong>${confidence}%</strong></div>
    `).join("")}</div>
  `;
}

function getSaasContracts() {
  const saved = safeLocalGet(saasContractsKey, []);
  return Array.isArray(saved) ? saved : [];
}

function setSaasContracts(items) {
  safeLocalSet(saasContractsKey, items);
}

function clauseSimilarity(a = "", b = "") {
  const one = new Set(String(a).toLowerCase().split(/[^a-z0-9]+/).filter((item) => item.length > 3));
  const two = new Set(String(b).toLowerCase().split(/[^a-z0-9]+/).filter((item) => item.length > 3));
  const overlap = [...one].filter((item) => two.has(item)).length;
  return Math.round((overlap / Math.max(1, Math.min(one.size, two.size))) * 100);
}

function renderSaasContractMemory() {
  if (!saasContractMemoryForm || !saasContractMemoryResult) return;
  const values = collectFormValues(saasContractMemoryForm);
  const records = getSaasContracts();
  const matches = records
    .map((record) => ({ ...record, similarity: clauseSimilarity(values.clauseText, record.clauseText) }))
    .filter((record) => record.similarity >= 35)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);
  const redFlags = redTeamFindings(values.clauseText || "", "Contract memory");
  lastSaasContractMemory = { values, records, matches, redFlags };
  saasContractMemoryResult.innerHTML = `
    ${metricCards([
      { label: "Saved clauses", value: records.length },
      { label: "Similar found", value: matches.length },
      { label: "Current red flags", value: redFlags.length },
      { label: "Memory", value: `<em class="source-badge input">Local DB</em>` }
    ])}
    <div class="workflow-two-col">
      <div class="ops-list">${(matches.length ? matches : [{ fixtureRef: "No similar clause", outcome: "Save this clause to build memory", similarity: 0 }]).map((item) => `<div><strong>${escapeHtml(item.fixtureRef)}</strong><span>${escapeHtml(item.outcome)} / similarity ${item.similarity}%</span></div>`).join("")}</div>
      <div class="ops-list">${(redFlags.length ? redFlags : [{ title: "No strong flag", advice: "Still confirm NOR, weather and time-bar wording." }]).map((item) => `<div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.advice)}</span></div>`).join("")}</div>
    </div>
  `;
}

function saveSaasContractMemory() {
  if (!saasContractMemoryForm) return;
  const values = collectFormValues(saasContractMemoryForm);
  const record = { ...values, savedAt: new Date().toLocaleString(), id: `CL-${Date.now().toString().slice(-6)}` };
  setSaasContracts([record, ...getSaasContracts()].slice(0, 120));
  renderSaasContractMemory();
  renderSaasAnalytics();
}

function clearSaasContractMemory() {
  setSaasContracts([]);
  renderSaasContractMemory();
  renderSaasAnalytics();
}

function renderSaasClientPortal() {
  if (!saasClientPortalForm || !saasClientPortalResult) return;
  const values = collectFormValues(saasClientPortalForm);
  const gate = workflowCurrentGate();
  const token = saasToken(`${values.client}-${values.status}-${gate.risk}-${Date.now().toString().slice(-4)}`);
  const portalUrl = `https://captainemo03.github.io/focusea/#portal-${token}`;
  const expiry = workflowDateAfter({ days: Number(values.expiryDays) || 7 });
  const item = {
    client: values.client,
    access: values.access,
    status: values.status,
    token,
    portalUrl,
    expiry: expiry.toISOString(),
    updatedAt: new Date().toLocaleString()
  };
  lastSaasClientPortal = item;
  saasClientPortalResult.innerHTML = `
    ${metricCards([
      { label: "Client", value: escapeHtml(values.client || "-") },
      { label: "Status", value: escapeHtml(values.status || "-") },
      { label: "Access", value: escapeHtml(values.access || "-") },
      { label: "Expires", value: workflowDateLabel(expiry) }
    ])}
    <div class="confidence-row"><span>Signed link pattern</span><em class="source-badge simulated">Static preview</em><a href="${portalUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(portalUrl)}</a></div>
    <div class="ops-list">
      <div><strong>Client-visible</strong><span>${escapeHtml(gate.decision)} / ${escapeHtml(gate.parsed.route || "route TBC")} / TCE ${money(gate.tce)}/day</span></div>
      <div><strong>Backend note</strong><span>Production portal should use signed token, auth middleware and expiry validation.</span></div>
    </div>
  `;
  renderSaasDealRoom();
  renderSaasAnalytics();
}

function saasAnalyticsRows() {
  const workspace = saasWorkspace();
  const marketMemory = getMarketMemory();
  const inbox = getWorkflowInbox();
  const reports = getWorkflowReports();
  const avgTce = marketMemory.reduce((sum, item) => sum + Number(item.tce || 0), 0) / Math.max(1, marketMemory.length);
  const fixed = marketMemory.filter((item) => /fixed/i.test(item.status || "")).length;
  const failed = marketMemory.filter((item) => /failed/i.test(item.status || "")).length;
  const claimDocs = workspace.documents.filter((item) => item.verdict && !/clean/i.test(item.verdict)).length;
  return [
    ["Saved fixtures", marketMemory.length],
    ["Fix rate", `${Math.round((fixed / Math.max(1, fixed + failed)) * 100)}%`],
    ["Average TCE", `${money(avgTce)}/day`],
    ["Open inbox", inbox.length],
    ["Uploaded docs", workspace.documents.length],
    ["Doc safety watch", claimDocs],
    ["Alarms", workspace.alarms.length],
    ["Client portals", workspace.clientPortals.length],
    ["Report history", reports.length],
    ["Contract clauses", getSaasContracts().length]
  ];
}

function renderSaasAnalytics() {
  if (!saasAnalyticsResult) return;
  const rows = saasAnalyticsRows();
  lastSaasAnalytics = { rows, generatedAt: new Date().toLocaleString() };
  saasAnalyticsResult.innerHTML = `
    ${metricCards(rows.slice(0, 4).map(([label, value]) => ({ label, value })))}
    <div class="saas-analytics-bars">
      ${rows.slice(4).map(([label, value], index) => {
        const width = clamp(20 + Number.parseFloat(String(value)) * (index === 0 ? 5 : 7), 18, 100);
        return `<div><span>${escapeHtml(label)}</span><i style="width:${width}%"></i><strong>${escapeHtml(value)}</strong></div>`;
      }).join("")}
    </div>
  `;
}

function renderSaasSecurity() {
  if (!saasSecurityResult) return;
  const docScore = lastSaasDocument?.scan?.score ?? 100;
  const policies = [
    ["Allowed upload types", "pdf, doc, docx, txt, eml, png, jpg", "verified"],
    ["Max file size", "10 MB browser-side guard", "input"],
    ["Unsafe pattern scan", `${lastSaasDocument?.scan?.findings?.length || 0} finding(s)`, docScore >= 82 ? "verified" : "api-ready"],
    ["Backend antivirus", "ClamAV / cloud malware scan recommended", "api-ready"],
    ["Rate limit", "Per-user upload and API quotas required in production", "api-ready"],
    ["Auth", "Signed URLs + JWT/session cookies in backend", "api-ready"]
  ];
  lastSaasSecurity = { docScore, policies };
  saasSecurityResult.innerHTML = `
    ${metricCards([
      { label: "File safety", value: `${docScore}/100` },
      { label: "Policies", value: policies.length },
      { label: "Production", value: "Backend scan required" }
    ])}
    <div class="confidence-list">${policies.map(([name, detail, badge]) => `<div class="confidence-row"><span>${escapeHtml(name)}<small>${escapeHtml(detail)}</small></span><em class="source-badge ${badge}">${sourceBadgeText(badge)}</em></div>`).join("")}</div>
  `;
}

function renderSaasBackendBlueprint() {
  if (!saasBackendBlueprintResult) return;
  const modules = [
    ["Auth", "users, teams, roles, password/session/JWT"],
    ["Database", "fixtures, documents, alarms, CRM, reports, contract memory"],
    ["Object storage", "PDF/Word/image upload with signed URLs"],
    ["OCR worker", "PDF/image -> text extraction queue"],
    ["Security worker", "file scan, MIME check, size limit, quarantine"],
    ["Scheduler", "subject/time-bar/laycan/invoice alarms"],
    ["Market jobs", "news RSS, bunker snapshot, licensed index connector"],
    ["Client portal", "signed token, expiry, access scope, audit log"],
    ["Admin", "rates, ports, sources, default assumptions"],
    ["Audit", "who changed what, when, and why"]
  ];
  lastSaasBackendBlueprint = { modules };
  saasBackendBlueprintResult.innerHTML = `
    ${metricCards([
      { label: "Backend modules", value: modules.length },
      { label: "Current mode", value: "Static + local DB" },
      { label: "Upgrade", value: "FastAPI + DB + workers" }
    ])}
    <div class="saas-blueprint-grid">${modules.map(([name, detail]) => `<div><strong>${escapeHtml(name)}</strong><span>${escapeHtml(detail)}</span></div>`).join("")}</div>
  `;
}

function saasWorkspaceExport() {
  return {
    generatedAt: new Date().toLocaleString(),
    workspace: saasWorkspace(),
    admin: safeLocalGet(saasAdminKey, {}),
    sources: safeLocalGet(saasSourcesKey, {}),
    contracts: getSaasContracts(),
    analytics: lastSaasAnalytics,
    workflow: workflowFullPack()
  };
}

function saasDocumentReportText() {
  const doc = lastSaasDocument;
  if (!doc) return "No document scan generated.";
  return reportLines("FOCUSEA DOCUMENT SAFETY REPORT", [
    `File: ${doc.fileMeta?.name || "Pasted text"}`,
    `Safety score: ${doc.scan.score}/100`,
    `Verdict: ${doc.scan.verdict}`,
    `Parsed route: ${doc.parsedOffer.route || "TBC"}`,
    "",
    "Findings:",
    ...(doc.scan.findings.length ? doc.scan.findings : ["No browser-side unsafe pattern found"]).map((item) => `- ${item}`)
  ]);
}

function saasAnalyticsCsvRows() {
  return [["Metric", "Value"], ...saasAnalyticsRows()];
}

function handleSaasDownload(type) {
  if (!lastSaasAlarm) renderSaasAlarm();
  if (!lastSaasAnalytics) renderSaasAnalytics();
  const actions = {
    "workspace-json": () => downloadJsonFile("focusea-saas-workspace.json", saasWorkspaceExport()),
    "document-report": () => downloadTextFile("focusea-document-safety-report.txt", saasDocumentReportText()),
    "deal-room-pdf": () => downloadPdfFile("focusea-full-deal-room.pdf", "Focusea Full Deal Room", saasDealRoomText()),
    "alarms-ics": () => downloadTextFile("focusea-alarms.ics", saasIcsText()),
    "analytics-csv": () => downloadCsvFile("focusea-broker-performance-analytics.csv", saasAnalyticsCsvRows())
  };
  actions[type]?.();
}

function renderAllSaasCore() {
  renderSaasAccount();
  renderSaasDocument();
  renderSaasDealRoom();
  renderSaasAlarm();
  renderSaasEmail();
  renderSaasAdmin();
  renderSaasMarketSource();
  renderSaasContractMemory();
  renderSaasClientPortal();
  renderSaasAnalytics();
  renderSaasSecurity();
  renderSaasBackendBlueprint();
}

const aiAuditKey = "focusea-ai-audit-v1";
const aiVaultKey = "focusea-ai-vault-v1";

function aiRiskLabel(score) {
  if (score >= 72) return "Avoid / senior review";
  if (score >= 54) return "Watch / negotiate";
  return "Fixable with guards";
}

function aiRiskClass(score) {
  if (score >= 72) return "high";
  if (score >= 54) return "medium";
  return "low";
}

function aiCurrentContext() {
  const values = aiAutopilotForm ? collectFormValues(aiAutopilotForm) : {};
  const dealText = String(values.dealText || "50k coal Indonesia to India laycan 10/15 Jul freight USD 18.50 pmt demurrage USD 18,000/day");
  const parsed = parseOfferText(dealText);
  const parsedRisk = scoreParsedOffer(parsed);
  const gate = workflowCurrentGate();
  const cargo = getCargoProfile(parsed.cargoType || gate.cargoType || "coal");
  const targetTce = Number(values.targetTce) || 22000;
  const tceGap = (gate.tce || 0) - targetTce;
  const redFlags = redTeamFindings(dealText, "AI Core");
  const riskScore = clamp(Math.round((gate.risk || 45) * 0.46 + parsedRisk.score * 0.32 + redFlags.length * 7 + (tceGap < 0 ? 10 : -4)), 0, 100);
  const decision = riskScore >= 72 ? "AVOID / SENIOR REVIEW" : riskScore >= 54 ? "WATCH / COUNTER" : "FIX WITH GUARDS";
  return { values, dealText, parsed, parsedRisk, gate, cargo, targetTce, tceGap, redFlags, riskScore, decision };
}

function aiAutopilotReportText(result = lastAiAutopilot) {
  if (!result) return "No AI autopilot report generated.";
  return reportLines("FOCUSEA AI AUTOPILOT REPORT", [
    `Decision: ${result.decision}`,
    `Risk score: ${result.riskScore}/100`,
    `Cargo: ${result.parsed.cargoLabel}`,
    `Route: ${result.parsed.route || "TBC"}`,
    `Quantity: ${result.parsed.quantity || "TBC"} ${result.parsed.unit}`,
    `Freight: ${result.parsed.freight ? money(result.parsed.freight, 2) : "TBC"}`,
    `Demurrage: ${result.parsed.demurrage ? money(result.parsed.demurrage) : "TBC"}`,
    `TCE: ${money(result.gate.tce)}/day`,
    `P&L: ${money(result.gate.netPnl)}`,
    "",
    "Workflow actions:",
    ...result.actions.map((item) => `- ${item}`),
    "",
    "Explainability:",
    ...result.explanations.map((item) => `- ${item.label}: ${item.value} (${item.note})`),
    "",
    "Action mail:",
    aiActionMailText(result)
  ]);
}

function aiActionMailText(result = lastAiAutopilot) {
  if (!result) return "Run AI Autopilot first.";
  const parsed = result.parsed;
  const guards = result.actions.slice(0, 4).map((item) => `- ${item}`).join("\n");
  return [
    "Dear all,",
    "",
    `Re: ${parsed.quantity || "TBC"} ${parsed.unit || ""} ${parsed.cargoLabel || "cargo"} ${parsed.route || "route TBC"}`,
    "",
    `Focusea AI review indicates: ${result.decision} (${result.riskScore}/100 risk).`,
    `Freight basis: ${parsed.freight ? `${money(parsed.freight, 2)} per ${parsed.unit}` : "TBC"} | Demurrage: ${parsed.demurrage ? `${money(parsed.demurrage)} pdpr` : "TBC"} | Laycan: ${parsed.laycan || "TBC"}.`,
    "",
    "Before fixing, please confirm:",
    guards,
    "",
    "Suggested position: keep subjects until missing items, NOR wording and evidence trail are clean.",
    "",
    "Best regards,"
  ].join("\n");
}

function renderAiAutopilot() {
  if (!aiAutopilotResult) return;
  const ctx = aiCurrentContext();
  const missingActions = ctx.parsed.missing.map((item) => `Ask counterparty to confirm ${item}.`);
  const clauseActions = ctx.redFlags.slice(0, 3).map((item) => `Negotiate clause: ${item.advice || item.title}.`);
  const actions = [
    ...missingActions,
    ctx.tceGap < 0 ? `Counter freight or reduce cost; TCE is ${money(Math.abs(ctx.tceGap))}/day below target.` : `Commercials pass target by ${money(ctx.tceGap)}/day.`,
    ctx.parsed.laycanDays && ctx.parsed.laycanDays <= 3 ? "Laycan is narrow; add canceling/extension protection." : "Laycan buffer is workable; keep schedule watch.",
    ctx.gate.draftMargin < 1 ? "Draft margin is tight; require port/agent confirmation." : "Draft margin is not the main blocker.",
    ...(clauseActions.length ? clauseActions : ["Run CP wording check before recap is final."]),
    "Create recap, client summary, vault entry and audit event."
  ].slice(0, 8);
  const explanations = [
    { label: "Parsed fixture risk", value: `${ctx.parsedRisk.score}/100`, note: ctx.parsedRisk.factors[0] || "Core terms mostly readable." },
    { label: "Workflow gate risk", value: `${ctx.gate.risk}/100`, note: `${ctx.gate.decision} from commercial/port/legal gates.` },
    { label: "Commercial gap", value: money(ctx.tceGap), note: ctx.tceGap < 0 ? "TCE is under the target." : "TCE is above the target." },
    { label: "Clause flags", value: ctx.redFlags.length, note: ctx.redFlags[0]?.title || "No strong browser-side red flag." },
    { label: "Missing fields", value: ctx.parsed.missing.length, note: ctx.parsed.missing.join(", ") || "No critical missing term." }
  ];
  lastAiAutopilot = { ...ctx, actions, explanations, generatedAt: new Date().toLocaleString() };
  aiAutopilotResult.innerHTML = `
    ${metricCards([
      { label: "AI decision", value: escapeHtml(ctx.decision) },
      { label: "Risk", value: `${ctx.riskScore}/100` },
      { label: "Route", value: escapeHtml(ctx.parsed.route || "TBC") },
      { label: "TCE gap", value: money(ctx.tceGap) }
    ])}
    <div class="ai-flow-list">${actions.map((item, index) => `<div class="${index < 2 ? "priority" : ""}"><strong>${index + 1}. ${escapeHtml(item)}</strong><span>${index === 0 ? "Action first" : "AI workflow step"}</span></div>`).join("")}</div>
  `;
  renderAiKnowledgeGraph();
  renderAiExplain();
  renderAiPresentation();
}

function renderAiKnowledgeGraph() {
  if (!aiKnowledgeGraphResult) return;
  const ctx = lastAiAutopilot || aiCurrentContext();
  const graph = [
    { name: "Fixture", score: ctx.parsedRisk.score, note: ctx.parsed.missing.length ? `${ctx.parsed.missing.length} missing terms` : "Terms extracted" },
    { name: "Cargo", score: ctx.cargo.risk, note: ctx.cargo.note },
    { name: "Route", score: ctx.gate.marketRisk || 42, note: ctx.parsed.route || "Route TBC" },
    { name: "Port", score: ctx.gate.portRisk || 45, note: ctx.gate.port?.name || "Port profile pending" },
    { name: "Clause", score: Math.min(100, 32 + ctx.redFlags.length * 14), note: ctx.redFlags[0]?.title || "Clause battle ready" },
    { name: "Claim", score: lastWorkflowSof?.readiness ? 100 - lastWorkflowSof.readiness : 48, note: lastWorkflowSof?.verdict || "SOF not fully reviewed" },
    { name: "Client", score: ctx.riskScore, note: ctx.decision }
  ];
  aiKnowledgeGraphResult.innerHTML = `
    <div class="ai-graph-map">
      ${graph.map((node, index) => `
        <div class="ai-graph-node ${aiRiskClass(node.score)}" style="--node-index:${index}">
          <strong>${escapeHtml(node.name)}</strong>
          <span>${Math.round(node.score)}/100</span>
          <small>${escapeHtml(node.note)}</small>
        </div>
      `).join("")}
    </div>
    <div class="workflow-link-list">
      ${graph.slice(0, -1).map((node, index) => `<div><span>${escapeHtml(node.name)} -> ${escapeHtml(graph[index + 1].name)}</span><strong>${escapeHtml(aiRiskLabel(Math.max(node.score, graph[index + 1].score)))}</strong></div>`).join("")}
    </div>
  `;
}

function renderAiDealTwin() {
  if (!aiDealTwinForm || !aiDealTwinResult) return;
  const values = collectFormValues(aiDealTwinForm);
  const ctx = lastAiAutopilot || aiCurrentContext();
  const quantity = Number(ctx.parsed.quantity) || defaultQuantityForCargo(ctx.cargo);
  const freightDelta = Number(values.freightDelta) || 0;
  const bunkerShock = Number(values.bunkerShock) || 0;
  const delayDays = Number(values.delayDays) || 0;
  const clausePenalty = values.clauseRisk === "High" ? 24 : values.clauseRisk === "Low" ? 7 : 14;
  const freightUpside = quantity * freightDelta;
  const bunkerCost = bunkerShock * 280 * ctx.cargo.bunkerMultiplier;
  const delayCost = delayDays * ((ctx.parsed.demurrage || 18000) + 14500);
  const commercialTwin = freightUpside - bunkerCost - delayCost;
  const legalTwin = clamp(ctx.redFlags.length * 18 + clausePenalty, 0, 100);
  const opsTwin = clamp((ctx.gate.portRisk || 45) + delayDays * 9 + (ctx.gate.draftMargin < 1 ? 12 : 0), 0, 100);
  const claimTwin = clamp((lastWorkflowSof?.demurrageAmount ? 45 : 25) + legalTwin * 0.35 + delayDays * 8, 0, 100);
  const combined = clamp(Math.round((legalTwin + opsTwin + claimTwin + (commercialTwin < 0 ? 70 : 35)) / 4), 0, 100);
  lastAiDealTwin = { values, freightUpside, bunkerCost, delayCost, commercialTwin, legalTwin, opsTwin, claimTwin, combined, generatedAt: new Date().toLocaleString() };
  aiDealTwinResult.innerHTML = `
    ${metricCards([
      { label: "Commercial twin", value: `<em class="${commercialTwin >= 0 ? "positive" : "negative"}">${money(commercialTwin)}</em>` },
      { label: "Legal twin", value: `${Math.round(legalTwin)}/100` },
      { label: "Ops twin", value: `${Math.round(opsTwin)}/100` },
      { label: "Claim twin", value: `${Math.round(claimTwin)}/100` }
    ])}
    <div class="ai-twin-grid">
      <div><strong>Freight upside</strong><span>${money(freightUpside)}</span></div>
      <div><strong>Bunker shock</strong><span>${money(bunkerCost)}</span></div>
      <div><strong>Delay exposure</strong><span>${money(delayCost)}</span></div>
      <div class="${aiRiskClass(combined)}"><strong>Combined verdict</strong><span>${escapeHtml(aiRiskLabel(combined))}</span></div>
    </div>
  `;
  renderAiExplain();
}

function renderAiExplain() {
  if (!aiExplainResult) return;
  const ctx = lastAiAutopilot || aiCurrentContext();
  const twin = lastAiDealTwin;
  const rows = [
    ["Missing commercial terms", ctx.parsed.missing.length * 12, ctx.parsed.missing.join(", ") || "Core terms available"],
    ["Clause wording", Math.min(100, ctx.redFlags.length * 24), ctx.redFlags[0]?.advice || "Run CP battle before final recap"],
    ["TCE vs target", ctx.tceGap < 0 ? 66 : 24, ctx.tceGap < 0 ? `${money(Math.abs(ctx.tceGap))}/day short` : `${money(ctx.tceGap)}/day buffer`],
    ["Port / draft / ops", ctx.gate.portRisk || 40, ctx.gate.draftMargin < 1 ? "Draft margin tight" : "Operational risk controlled"],
    ["Deal twin stress", twin?.combined ?? 42, twin ? aiRiskLabel(twin.combined) : "Twin not stressed yet"]
  ].map(([label, score, note]) => ({ label, score: clamp(Math.round(score), 0, 100), note }));
  aiExplainResult.innerHTML = `
    <div class="ai-explain-list">
      ${rows.map((row) => `<div><span>${escapeHtml(row.label)}<small>${escapeHtml(row.note)}</small></span><i style="--bar:${row.score}%"></i><strong>${row.score}</strong></div>`).join("")}
    </div>
    <div class="danger-box"><span>Explainable AI note</span><p>Bu skorlar karar yerine gecmez; brokerin hangi noktaya dikkat edecegini gosteren kaynakli ve izlenebilir risk aciklamasidir.</p></div>
  `;
}

function renderAiCopilot() {
  if (!aiCopilotForm || !aiCopilotResult) return;
  const values = collectFormValues(aiCopilotForm);
  const question = String(values.question || "").toLowerCase();
  const ctx = lastAiAutopilot || aiCurrentContext();
  const answers = [];
  if (/fix|fixture|kabul|edelim|counter|wording/.test(question)) {
    answers.push(ctx.riskScore >= 72 ? "Ben bu deal'i direkt fix etmem; once senior review, clause counter ve eksik bilgiler lazim." : ctx.riskScore >= 54 ? "Fix edilebilir ama counter wording ve subject guard olmadan riskli." : "Fix with guards: recap temiz, NOR/laytime net, subject deadline takipte olsun.");
    answers.push(`Counter focus: freight ${ctx.parsed.freight ? money(ctx.parsed.freight + 0.5, 2) : "TBC"} / demurrage ${ctx.parsed.demurrage ? money(ctx.parsed.demurrage + 1500) : "TBC"} / NOR wording protected.`);
  } else if (/claim|demurrage|laytime|sof/.test(question)) {
    answers.push(`Claim view: ${lastWorkflowSof?.verdict || "SOF pending"}. NOR, berth, rain log and completion evidence must match before claim letter.`);
  } else if (/client|sunum|presentation|hoca/.test(question)) {
    answers.push("Use Presentation Mode: 1) paste mail, 2) show AI decision, 3) show graph, 4) show PDF/action mail export.");
  } else {
    answers.push(`Current AI view: ${ctx.decision}. Top blocker: ${ctx.explanations?.[0]?.note || ctx.parsedRisk.factors[0] || "commercial/ops evidence review"}.`);
  }
  lastAiCopilot = { question: values.question, answers, generatedAt: new Date().toLocaleString() };
  aiCopilotResult.innerHTML = `
    <div class="ai-chat-log">
      <div><strong>You</strong><span>${escapeHtml(values.question || "")}</span></div>
      <div class="bot"><strong>Focusea Copilot</strong><span>${answers.map(escapeHtml).join("<br>")}</span></div>
    </div>
  `;
}

function renderAiRolePortal() {
  if (!aiRolePortalForm || !aiRolePortalResult) return;
  const values = collectFormValues(aiRolePortalForm);
  const role = String(values.role || "Broker");
  const modulesByRole = {
    Broker: ["Offer parser", "TCE/P&L", "Counter mail", "Deal room", "Client portal", "Audit"],
    Owner: ["Vessel suitability", "Freight counter", "NOR guard", "Port risk", "Recap review"],
    Charterer: ["Cargo suitability", "Rate comparison", "Laycan risk", "Clause counter", "Client summary"],
    Operations: ["Port timeline", "Docs checklist", "SOF events", "Weather delay", "Agency notes"],
    Claims: ["SOF laytime", "Demurrage claim", "Evidence pack", "Time bar", "Clause battle"],
    Student: ["Guided scenario", "Explainable AI", "Quiz", "Academic links", "Presentation mode"],
    Admin: ["User roles", "Market sources", "Rate multipliers", "Audit logs", "Security policy"]
  };
  const modules = modulesByRole[role] || modulesByRole.Broker;
  lastAiRolePortal = { role, access: values.access, modules, generatedAt: new Date().toLocaleString() };
  aiRolePortalResult.innerHTML = `
    ${metricCards([
      { label: "Role", value: escapeHtml(role) },
      { label: "Access", value: escapeHtml(values.access || "Full deal") },
      { label: "Visible modules", value: modules.length },
      { label: "Data guard", value: role === "Admin" ? "Full" : "Scoped" }
    ])}
    <div class="ai-role-grid">${modules.map((item) => `<div><strong>${escapeHtml(item)}</strong><span>${role === "Student" ? "Training safe view" : "Operational view"}</span></div>`).join("")}</div>
  `;
}

function getAiAudit() {
  return safeLocalGet(aiAuditKey, []);
}

function setAiAudit(items) {
  safeLocalSet(aiAuditKey, items.slice(0, 40));
}

function pushAiAuditEvent(action = "AI Core updated", detail = "") {
  const ctx = lastAiAutopilot || aiCurrentContext();
  const item = {
    id: `AI-AUD-${Date.now().toString().slice(-6)}`,
    action,
    detail: detail || `${ctx.decision} / ${ctx.parsed.route || "route TBC"}`,
    risk: ctx.riskScore,
    at: new Date().toLocaleString()
  };
  setAiAudit([item, ...getAiAudit()]);
  return item;
}

function addAiAuditEventFromButton() {
  pushAiAuditEvent("Manual audit checkpoint", "User added an AI audit checkpoint.");
  renderAiAudit();
}

function clearAiAuditTrail() {
  setAiAudit([]);
  renderAiAudit();
}

function renderAiAudit() {
  if (!aiAuditResult) return;
  const items = getAiAudit();
  aiAuditResult.innerHTML = `
    ${metricCards([
      { label: "Audit events", value: items.length },
      { label: "Last risk", value: items[0]?.risk ?? "-" },
      { label: "Mode", value: `<em class="source-badge input">Local trail</em>` },
      { label: "Export", value: "Included in AI JSON" }
    ])}
    <div class="timebar-list">${(items.length ? items : [{ action: "No audit event yet", detail: "Run AI Core or add checkpoint.", at: "-", risk: 0 }]).map((item) => `<div class="${aiRiskClass(item.risk || 0)}"><strong>${escapeHtml(item.action)}</strong><span>${escapeHtml(item.detail)}</span><em>${escapeHtml(item.at)}</em></div>`).join("")}</div>
  `;
}

function renderAiPwa() {
  if (!aiPwaResult) return;
  const checks = [
    ["Manifest", "manifest.webmanifest linked", "verified", 92],
    ["Service worker", "service-worker.js registered on secure/local host", "api-ready", "serviceWorker" in navigator ? 86 : 42],
    ["Mobile install", "Standalone-ready theme and icons", "api-ready", window.matchMedia?.("(display-mode: standalone)")?.matches ? 94 : 72],
    ["Offline shell", "Static assets cached after first load", "api-ready", 76],
    ["Security", "CSP + no frame ancestors + upload guard", "verified", 88]
  ];
  aiPwaResult.innerHTML = `
    <div class="confidence-list">${checks.map(([name, detail, badge, confidence]) => `
      <div class="confidence-row"><span>${escapeHtml(name)}<small>${escapeHtml(detail)}</small></span><em class="source-badge ${badge}">${escapeHtml(sourceBadgeText(badge))}</em><strong>${confidence}%</strong></div>
    `).join("")}</div>
  `;
}

function getAiVault() {
  return safeLocalGet(aiVaultKey, []);
}

function setAiVault(items) {
  safeLocalSet(aiVaultKey, items.slice(0, 80));
}

function saveAiVaultDocument() {
  if (!aiDocumentVaultForm) return;
  const values = collectFormValues(aiDocumentVaultForm);
  const scan = saasSecurityScan(String(values.documentText || ""), null);
  const item = {
    id: `VAULT-${Date.now().toString().slice(-6)}`,
    type: values.documentType,
    reference: values.reference,
    note: values.documentText,
    safety: scan.score,
    verdict: scan.verdict,
    at: new Date().toLocaleString()
  };
  setAiVault([item, ...getAiVault()]);
  pushAiAuditEvent("Vault document saved", `${item.type} / ${item.reference}`);
  renderAiDocumentVault();
  renderAiAudit();
}

function clearAiVaultDocuments() {
  setAiVault([]);
  renderAiDocumentVault();
}

function renderAiDocumentVault() {
  if (!aiDocumentVaultResult) return;
  const items = getAiVault();
  aiDocumentVaultResult.innerHTML = `
    ${metricCards([
      { label: "Vault docs", value: items.length },
      { label: "Latest safety", value: items[0] ? `${items[0].safety}/100` : "-" },
      { label: "Storage", value: `<em class="source-badge input">Local DB</em>` },
      { label: "Backend path", value: "Object storage + OCR" }
    ])}
    <div class="ops-list">${(items.length ? items : [{ type: "No document", reference: "Save CP/SOF/NOR/LOI here", verdict: "Pending", at: "-" }]).map((item) => `<div><strong>${escapeHtml(item.type)}</strong><span>${escapeHtml(item.reference)} / ${escapeHtml(item.verdict)} / ${escapeHtml(item.at)}</span></div>`).join("")}</div>
  `;
}

function renderAiClauseBattle() {
  if (!aiClauseBattleForm || !aiClauseBattleResult) return;
  const values = collectFormValues(aiClauseBattleForm);
  const ownerText = String(values.ownerClause || "");
  const chartererText = String(values.chartererClause || "");
  const ownerFlags = redTeamFindings(ownerText, "Owner wording");
  const chartererFlags = redTeamFindings(chartererText, "Charterer wording");
  const ownerRisk = clamp(38 + ownerFlags.length * 15 + (/waiting.*berth.*count/i.test(ownerText) ? 16 : 0) - (/free pratique|reachable/i.test(ownerText) ? 8 : 0), 0, 100);
  const chartererRisk = clamp(32 + chartererFlags.length * 13 - (/free pratique|valid nor|reachable/i.test(chartererText) ? 12 : 0), 0, 100);
  const winner = ownerRisk > chartererRisk ? "Charterer counter is safer" : "Owner wording is stronger commercially";
  const counter = ownerRisk > chartererRisk
    ? "Counter: laytime to commence only after valid NOR, free pratique/customs clearance, berth reachable and vessel in all respects ready."
    : "Counter: preserve WIBON/WIPON but clarify weather exceptions, reachable berth and evidence trail.";
  lastAiClauseBattle = { values, ownerRisk, chartererRisk, winner, counter, generatedAt: new Date().toLocaleString() };
  aiClauseBattleResult.innerHTML = `
    ${metricCards([
      { label: "Owner risk", value: `${Math.round(ownerRisk)}/100` },
      { label: "Charterer risk", value: `${Math.round(chartererRisk)}/100` },
      { label: "Winner", value: escapeHtml(winner) },
      { label: "Flags", value: ownerFlags.length + chartererFlags.length }
    ])}
    <div class="danger-box"><span>Suggested counter wording</span><p>${escapeHtml(counter)}</p></div>
  `;
}

function renderAiFixtureSimulator() {
  if (!aiFixtureSimulatorForm || !aiFixtureSimulatorResult) return;
  const values = collectFormValues(aiFixtureSimulatorForm);
  const scenarioScores = {
    "Coal Indonesia India": { market: 68, ops: 55, claim: 58, cargo: "coal" },
    "Grain Brazil China": { market: 61, ops: 64, claim: 48, cargo: "grain" },
    "Container spot": { market: 72, ops: 52, claim: 35, cargo: "container" },
    "LNG terminal delay": { market: 76, ops: 78, claim: 62, cargo: "lng" },
    "Chemical parcel": { market: 58, ops: 74, claim: 66, cargo: "chemicals" }
  };
  const decisionDelta = {
    "Counter freight": 8,
    "Fix now": -5,
    "Ask more subjects": 6,
    Avoid: 14
  };
  const base = scenarioScores[values.scenario] || scenarioScores["Coal Indonesia India"];
  const score = clamp(Math.round((base.market + base.ops + base.claim) / 3 - (decisionDelta[values.decision] || 0)), 0, 100);
  const timeline = [
    ["Offer", `${values.scenario} received`],
    ["Decision", `${values.decision} selected`],
    ["Commercial", score < 54 ? "P&L controlled" : "Commercial guard needed"],
    ["Legal", base.claim > 60 ? "Claim/evidence wording tight" : "Standard clause review"],
    ["Outcome", aiRiskLabel(score)]
  ];
  lastAiFixtureSimulator = { values, score, base, timeline, generatedAt: new Date().toLocaleString() };
  aiFixtureSimulatorResult.innerHTML = `
    ${metricCards([
      { label: "Scenario score", value: `${score}/100` },
      { label: "Cargo", value: escapeHtml(getCargoProfile(base.cargo).label) },
      { label: "Market", value: `${base.market}/100` },
      { label: "Outcome", value: escapeHtml(aiRiskLabel(score)) }
    ])}
    <div class="theater-timeline">${timeline.map(([step, detail]) => `<div><strong>${escapeHtml(step)}</strong><span>${escapeHtml(detail)}</span></div>`).join("")}</div>
  `;
}

function renderAiPresentation() {
  if (!aiPresentationResult) return;
  const ctx = lastAiAutopilot || aiCurrentContext();
  const slides = [
    ["1", "Paste fixture mail", ctx.parsed.route || "Route TBC"],
    ["2", "AI decision", `${ctx.decision} / ${ctx.riskScore}/100`],
    ["3", "Explainable risk", ctx.redFlags[0]?.title || ctx.parsedRisk.factors[0] || "Commercial and ops gates"],
    ["4", "Knowledge graph", "Deal -> cargo -> port -> clause -> claim -> client"],
    ["5", "Export", "PDF, JSON, action mail, vault and audit trail"]
  ];
  lastAiPresentation = { slides, active: document.body.classList.contains("ai-presentation-mode"), generatedAt: new Date().toLocaleString() };
  aiPresentationResult.innerHTML = `
    <div class="ai-slide-strip">${slides.map(([number, title, detail]) => `<div><strong>${escapeHtml(number)}</strong><span>${escapeHtml(title)}</span><small>${escapeHtml(detail)}</small></div>`).join("")}</div>
    <div class="danger-box"><span>Presentation state</span><p>${lastAiPresentation.active ? "Presentation mode active: AI Core is highlighted for demo." : "Presentation mode passive. Click the button to highlight demo flow."}</p></div>
  `;
}

function toggleAiPresentationMode() {
  document.body.classList.toggle("ai-presentation-mode");
  pushAiAuditEvent("Presentation mode toggled", document.body.classList.contains("ai-presentation-mode") ? "Enabled" : "Disabled");
  renderAiPresentation();
  renderAiAudit();
}

function aiWorkspaceExport() {
  return {
    generatedAt: new Date().toLocaleString(),
    autopilot: lastAiAutopilot,
    dealTwin: lastAiDealTwin,
    copilot: lastAiCopilot,
    rolePortal: lastAiRolePortal,
    clauseBattle: lastAiClauseBattle,
    fixtureSimulator: lastAiFixtureSimulator,
    presentation: lastAiPresentation,
    audit: getAiAudit(),
    vault: getAiVault(),
    workflow: workflowFullPack()
  };
}

function aiPresentationScriptText() {
  const slides = lastAiPresentation?.slides || [];
  return reportLines("FOCUSEA AI CORE PRESENTATION SCRIPT", [
    "Demo goal: show Focusea as a maritime AI operating system, not a simple calculator.",
    "",
    ...slides.flatMap(([number, title, detail]) => [`Slide ${number}: ${title}`, `Talk track: ${detail}`, ""]),
    "Close: paste a fixture once; Focusea creates decision, risk, document, vault, audit and client-ready output."
  ]);
}

function handleAiDownload(type) {
  if (!lastAiAutopilot) renderAiAutopilot();
  if (!lastAiPresentation) renderAiPresentation();
  const actions = {
    "autopilot-pdf": () => downloadPdfFile("focusea-ai-autopilot.pdf", "Focusea AI Autopilot", aiAutopilotReportText()),
    "autopilot-json": () => downloadJsonFile("focusea-ai-core-workspace.json", aiWorkspaceExport()),
    "action-mail": () => downloadTextFile("focusea-ai-action-mail.txt", aiActionMailText()),
    "vault-json": () => downloadJsonFile("focusea-ai-vault.json", getAiVault()),
    "presentation-script": () => downloadTextFile("focusea-ai-presentation-script.txt", aiPresentationScriptText())
  };
  actions[type]?.();
}

function renderAllAiCore() {
  renderAiAutopilot();
  renderAiDealTwin();
  renderAiCopilot();
  renderAiRolePortal();
  renderAiAudit();
  renderAiPwa();
  renderAiDocumentVault();
  renderAiClauseBattle();
  renderAiFixtureSimulator();
  renderAiPresentation();
}

const proOpsInboxKey = "focusea-proops-inbox-v1";
const proOpsAuditKey = "focusea-proops-audit-v1";

function proOpsInbox() {
  return safeLocalGet(proOpsInboxKey, []);
}

function setProOpsInbox(items) {
  safeLocalSet(proOpsInboxKey, items.slice(0, 80));
}

function proOpsAudit() {
  return safeLocalGet(proOpsAuditKey, []);
}

function pushProOpsAudit(action, detail) {
  const item = {
    id: `AUD-${Date.now().toString().slice(-6)}`,
    action,
    detail,
    at: new Date().toLocaleString()
  };
  safeLocalSet(proOpsAuditKey, [item, ...proOpsAudit()].slice(0, 80));
  return item;
}

function proOpsRiskText(score) {
  if (score >= 76) return "AVOID";
  if (score >= 58) return "WATCH";
  return "FIX";
}

function proOpsDecision(score) {
  if (score >= 76) return "Avoid until protected";
  if (score >= 58) return "Watch / counter first";
  return "Fix candidate";
}

function proOpsCurrentOffer() {
  if (lastProOpsOffer) return lastProOpsOffer;
  const saved = proOpsInbox()[0];
  if (saved) return saved;
  return renderProOpsInbox(true);
}

function buildProOpsOffer(values = {}) {
  const dealText = String(values.dealText || "");
  const parsed = parseOfferText(dealText);
  const cargo = getCargoProfile(parsed.cargoType);
  const gate = workflowGateContext({
    dealText,
    cargoType: parsed.cargoType,
    portId: values.portId || "mersin",
    draft: values.draft || 12.4,
    targetTce: values.targetTce || 22000,
    subjectHours: values.subjectHours || 18,
    bunkerPrice: liveFeedState.bunker || verifiedBunkerSnapshot.ports.singapore.vlsfo
  });
  const offerRisk = scoreParsedOffer(parsed);
  const redFlags = redTeamFindings(dealText, "Pro Ops");
  const risk = clamp(Math.round(offerRisk.score * 0.28 + gate.risk * 0.45 + redFlags.length * 7 + (parsed.missing.length * 4)), 0, 100);
  const missing = parsed.missing.length ? parsed.missing : ["No critical missing term detected"];
  const dealRef = `FX-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`;
  const recap = [
    "FOCUSEA FIXTURE RECAP DRAFT",
    `Ref: ${dealRef}`,
    `Cargo: ${parsed.quantity || defaultQuantityForCargo(cargo)} ${parsed.unit} ${parsed.cargoLabel}`,
    `Route: ${parsed.route || "TBC"}`,
    `Laycan: ${parsed.laycan || "TBC"}`,
    `Freight: ${parsed.freight ? `${money(parsed.freight, 2)} per ${parsed.unit}` : "TBC"}`,
    `Demurrage: ${parsed.demurrage ? `${money(parsed.demurrage)}/day pro rata` : "TBC"}`,
    `Commission: ${parsed.commission || "TBC"} pct`,
    "Subjects: stem / receiver / management approval until confirmed"
  ].join("\n");
  const counterMail = [
    "Dear all,",
    "",
    `Many thanks for the offer. Basis ${parsed.route || "route TBC"} / ${parsed.cargoLabel}.`,
    `Our current Focusea position is ${proOpsDecision(risk)} (${risk}/100 risk).`,
    "",
    "Please counter/confirm:",
    ...missing.slice(0, 5).map((item) => `- ${item}`),
    redFlags[0] ? `- Clause guard: ${redFlags[0].advice}` : "- NOR, weather exceptions, waiting time and time-bar wording to be clean.",
    `- Commercials to be checked against target TCE ${money(values.targetTce || 22000)}/day.`,
    "",
    "Best regards,"
  ].join("\n");
  return {
    dealRef,
    savedAt: new Date().toLocaleString(),
    status: risk >= 76 ? "Avoid" : risk >= 58 ? "Counter needed" : "Fix candidate",
    dealText,
    parsed,
    cargo,
    gate,
    offerRisk,
    redFlags,
    risk,
    missing,
    recap,
    counterMail
  };
}

function renderProOpsInbox(silent = false) {
  if (!proOpsInboxForm || !proOpsInboxResult) return null;
  const values = collectFormValues(proOpsInboxForm);
  const offer = buildProOpsOffer(values);
  lastProOpsOffer = offer;
  if (!silent) {
    proOpsInboxResult.innerHTML = `
      ${metricCards([
        { label: "Deal ref", value: escapeHtml(offer.dealRef) },
        { label: "Status", value: escapeHtml(offer.status) },
        { label: "Risk", value: `${offer.risk}/100` },
        { label: "Missing", value: offer.missing.length }
      ])}
      <div class="pro-offer-card">
        <strong>${escapeHtml(offer.parsed.cargoLabel)} / ${escapeHtml(offer.parsed.route || "Route TBC")}</strong>
        <span>Freight ${offer.parsed.freight ? money(offer.parsed.freight, 2) : "TBC"} / Demurrage ${offer.parsed.demurrage ? money(offer.parsed.demurrage) : "TBC"} / Laycan ${escapeHtml(offer.parsed.laycan || "TBC")}</span>
        <small>${escapeHtml(offer.counterMail.split("\n").slice(0, 5).join(" "))}</small>
      </div>
      <div class="ops-list">${offer.missing.map((item) => `<div><strong>Missing / confirm</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div>
    `;
  }
  renderProOpsScore();
  return offer;
}

function saveProOpsOfferToInbox() {
  const offer = lastProOpsOffer || renderProOpsInbox(true);
  if (!offer) return;
  setProOpsInbox([offer, ...proOpsInbox()]);
  pushProOpsAudit("Offer saved", `${offer.dealRef} / ${offer.status}`);
  renderProOpsDealRoom();
  renderProOpsInbox();
}

function clearProOpsState() {
  setProOpsInbox([]);
  safeLocalSet(proOpsAuditKey, []);
  lastProOpsOffer = null;
  lastProOpsDealRoom = null;
  renderAllProOps();
}

function renderProOpsDealRoom() {
  if (!proOpsDealRoomResult) return;
  const offer = proOpsCurrentOffer();
  const audit = proOpsAudit();
  const tabs = [
    ["Offer", offer.status],
    ["Counter", offer.counterMail ? "Ready" : "Pending"],
    ["Recap", offer.recap ? "Draft ready" : "Pending"],
    ["CP", offer.redFlags.length ? `${offer.redFlags.length} flag(s)` : "Clause clean"],
    ["SOF", lastProOpsOcr?.sofEvents || "OCR pending"],
    ["Laytime", lastProOpsClaim?.verdict || "Pending"],
    ["Invoice", lastProOpsOcr?.invoiceAmount ? money(lastProOpsOcr.invoiceAmount) : "Draft"],
    ["Claim", lastProOpsClaim?.claimType || "Pending"],
    ["Client report", lastProOpsClient?.portalUrl ? "Link ready" : "Pending"],
    ["Audit log", `${audit.length} event(s)`]
  ];
  lastProOpsDealRoom = { offer, tabs, audit, generatedAt: new Date().toLocaleString(), reportText: proOpsDealRoomText(offer, tabs) };
  proOpsDealRoomResult.innerHTML = `
    ${metricCards([
      { label: "Deal", value: escapeHtml(offer.dealRef) },
      { label: "Tabs", value: tabs.length },
      { label: "Decision", value: escapeHtml(proOpsRiskText(offer.risk)) },
      { label: "Audit", value: audit.length }
    ])}
    <div class="pro-tabs-grid">${tabs.map(([name, status]) => `<div><strong>${escapeHtml(name)}</strong><span>${escapeHtml(status)}</span></div>`).join("")}</div>
  `;
}

function proOpsDealRoomText(offer = proOpsCurrentOffer(), tabs = []) {
  return reportLines("FOCUSEA PRO OPS DEAL ROOM", [
    `Deal ref: ${offer.dealRef}`,
    `Status: ${offer.status}`,
    `Cargo: ${offer.parsed.cargoLabel}`,
    `Route: ${offer.parsed.route || "TBC"}`,
    `Risk: ${offer.risk}/100`,
    `TCE: ${money(offer.gate.tce)}/day`,
    `P&L: ${money(offer.gate.netPnl)}`,
    "",
    "Tabs:",
    ...tabs.map(([name, status]) => `- ${name}: ${status}`),
    "",
    "Recap:",
    offer.recap,
    "",
    "Counter mail:",
    offer.counterMail
  ]);
}

function renderProOpsAsk() {
  if (!proOpsAskForm || !proOpsAskResult) return;
  const values = collectFormValues(proOpsAskForm);
  const question = String(values.question || "").toLowerCase();
  const offer = proOpsCurrentOffer();
  const answers = [];
  if (/fix|deal|kabul|counter/.test(question)) {
    answers.push(`${offer.dealRef}: ${proOpsDecision(offer.risk)}. ${offer.risk >= 58 ? "Counter wording ve eksik ticari alanlar kapanmadan subjects kaldirilmamali." : "Recap ve evidence guard ile fixture candidate."}`);
  }
  if (/clause|cp|lehine/.test(question)) {
    answers.push(offer.redFlags[0] ? `Clause red flag: ${offer.redFlags[0].title}. ${offer.redFlags[0].advice}` : "Clause tarafinda sert kirmizi bayrak yok; yine NOR/time-bar/weather wording kontrol edilmeli.");
  }
  if (/demurrage|claim|sof|laytime/.test(question)) {
    answers.push(lastProOpsClaim ? `Claim view: ${lastProOpsClaim.verdict}, amount ${money(lastProOpsClaim.amount)}.` : "SOF/claim modulu calistirilinca demurrage gucu hesaplanir.");
  }
  if (!answers.length) answers.push(`Focusea view: risk ${offer.risk}/100, top action: ${offer.missing[0]}.`);
  lastProOpsAsk = { question: values.question, answers, generatedAt: new Date().toLocaleString() };
  proOpsAskResult.innerHTML = `<div class="ai-chat-log"><div><strong>You</strong><span>${escapeHtml(values.question)}</span></div><div class="bot"><strong>Focusea</strong><span>${answers.map(escapeHtml).join("<br>")}</span></div></div>`;
}

function renderProOpsOcr() {
  if (!proOpsOcrForm || !proOpsOcrResult) return;
  const values = collectFormValues(proOpsOcrForm);
  const fileMeta = saasFileMeta(values.documentFile);
  const text = String(values.documentText || "");
  const sof = workflowExtractSof(text);
  const flags = redTeamFindings(text, "OCR lane");
  const invoiceAmount = Number(String(text.match(/(?:invoice|amount|claim)[^0-9]*(?:usd|us\$|\$)?\s*([0-9][0-9,]*(?:\.\d+)?)/i)?.[1] || "0").replace(/,/g, "")) || 0;
  const norFound = sof.events.some((event) => event.label === "NOR tendered" && event.found);
  const readiness = clamp(20 + sof.events.filter((event) => event.found).length * 15 + sof.stoppages.length * 10 + (invoiceAmount ? 10 : 0) + (norFound ? 10 : 0), 0, 100);
  lastProOpsOcr = { values, fileMeta, sof, flags, invoiceAmount, readiness, sofEvents: sof.events.filter((event) => event.found).length, generatedAt: new Date().toLocaleString() };
  proOpsOcrResult.innerHTML = `
    ${metricCards([
      { label: "File", value: escapeHtml(fileMeta?.name || "Pasted text") },
      { label: "SOF events", value: lastProOpsOcr.sofEvents },
      { label: "Invoice", value: invoiceAmount ? money(invoiceAmount) : "Not found" },
      { label: "Readiness", value: `${readiness}/100` }
    ])}
    <div class="workflow-two-col">
      <div class="ops-list">${sof.events.map((event) => `<div><strong>${escapeHtml(event.label)}</strong><span>${escapeHtml(event.display || "missing")}</span></div>`).join("")}</div>
      <div class="ops-list">${(flags.length ? flags : [{ title: "No strong CP flag", advice: "Still check signed docs." }]).map((flag) => `<div><strong>${escapeHtml(flag.title)}</strong><span>${escapeHtml(flag.advice)}</span></div>`).join("")}</div>
    </div>
  `;
  renderProOpsDealRoom();
}

function renderProOpsPort() {
  if (!proOpsPortForm || !proOpsPortResult) return;
  const values = collectFormValues(proOpsPortForm);
  const { id, port, ops } = turkiyePortProfile(values.portId || "mersin");
  const cargo = getCargoProfile(values.cargoType || "coal");
  const margin = turkiyeDraftMargin(port, values.draft);
  const pda = portCostBase(port) * ops.costFactor * cargo.portCostMultiplier;
  const waitingRisk = turkiyeWaitingRisk(id, values.waitingDays, cargo.risk);
  const risk = clamp(waitingRisk + (margin < 0 ? 30 : margin < 1 ? 14 : 0), 0, 100);
  const docs = port.documents || ["Cargo manifest", "Crew list", "Port clearance"];
  lastProOpsPort = { values, port, ops, cargo, margin, pda, waitingRisk, risk, decision: turkiyeStatusFromScore(risk) };
  proOpsPortResult.innerHTML = `
    ${metricCards([
      { label: "Decision", value: escapeHtml(lastProOpsPort.decision) },
      { label: "Draft margin", value: `${margin.toFixed(1)} m` },
      { label: "PDA estimate", value: money(pda) },
      { label: "Waiting risk", value: `${waitingRisk}/100` }
    ])}
    <div class="pro-port-grid">
      <div><strong>Pilotage / tug</strong><span>${escapeHtml(ops.pilotage || "Pilotage required")} / ${escapeHtml(ops.tug || "Tug by port order")}</span></div>
      <div><strong>Local agency note</strong><span>${escapeHtml(ops.agencyNote || "Confirm terminal nomination, documents and local holidays.")}</span></div>
      <div><strong>Docs</strong><span>${docs.slice(0, 5).map(escapeHtml).join(", ")}</span></div>
      <div><strong>Action</strong><span>${margin < 1 ? "Get berth-specific max draft and UKC before fixing." : "Keep PDA and terminal cut-off in recap."}</span></div>
    </div>
  `;
  renderProOpsScore();
}

function proOpsLaytimeFromText(text, allowedHours, demurrageRate) {
  const sof = workflowExtractSof(text);
  const start = sof.events.find((event) => event.label === "Operations started" && event.found)?.date
    || sof.events.find((event) => event.label === "All fast" && event.found)?.date
    || sof.events.find((event) => event.label === "NOR tendered" && event.found)?.date;
  const end = sof.events.find((event) => event.label === "Completed" && event.found)?.date;
  const grossHours = start && end ? Math.max(0, (end - start) / 3600000) : 0;
  const excludedHours = sof.stoppages.reduce((sum, item) => sum + item.hours, 0);
  const netHours = Math.max(0, grossHours - excludedHours);
  const balanceHours = netHours - allowedHours;
  const amount = balanceHours > 0 ? balanceHours / 24 * demurrageRate : 0;
  const dispatch = balanceHours < 0 ? Math.abs(balanceHours) / 24 * demurrageRate / 2 : 0;
  const verdict = amount ? "DEMURRAGE" : dispatch ? "DISPATCH" : "BALANCED";
  return { sof, grossHours, excludedHours, netHours, balanceHours, amount, dispatch, verdict };
}

function renderProOpsClaim() {
  if (!proOpsClaimForm || !proOpsClaimResult) return;
  const values = collectFormValues(proOpsClaimForm);
  const allowedHours = Number(values.allowedHours) || 72;
  const demurrageRate = Number(values.demurrageRate) || 18000;
  const calc = proOpsLaytimeFromText(values.sofText || "", allowedHours, demurrageRate);
  const evidence = [
    "Signed NOR",
    "Signed SOF",
    "Rain/weather letter",
    "Terminal operation log",
    "CP/recap laytime clause",
    "Invoice + claim letter"
  ];
  const readiness = clamp(calc.sof.events.filter((event) => event.found).length * 18 + calc.sof.stoppages.length * 8 + (calc.grossHours ? 18 : 0), 0, 100);
  const disputeRisk = clamp(80 - readiness + (calc.amount ? 8 : 0), 0, 100);
  lastProOpsClaim = { values, claimType: values.claimType, ...calc, allowedHours, demurrageRate, readiness, disputeRisk, evidence, generatedAt: new Date().toLocaleString() };
  proOpsClaimResult.innerHTML = `
    ${metricCards([
      { label: "Claim type", value: escapeHtml(values.claimType) },
      { label: "Verdict", value: escapeHtml(calc.verdict) },
      { label: "Amount", value: calc.amount ? money(calc.amount) : money(calc.dispatch) },
      { label: "Dispute risk", value: `${disputeRisk}/100` }
    ])}
    <div class="workflow-two-col">
      <div class="ops-list">${evidence.map((item) => `<div><strong>Evidence</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div>
      <pre>${escapeHtml(proOpsClaimLetterText())}</pre>
    </div>
  `;
  renderProOpsDealRoom();
  renderProOpsScore();
}

function proOpsClaimLetterText() {
  const claim = lastProOpsClaim;
  const offer = proOpsCurrentOffer();
  if (!claim) return "Run Claim Center first.";
  return [
    "Dear all,",
    "",
    `Re: ${offer.parsed.route || "subject voyage"} / ${claim.claimType} claim`,
    `Our preliminary laytime position is ${claim.verdict}. Net used time ${claim.netHours.toFixed(2)}h against allowed ${claim.allowedHours.toFixed(2)}h.`,
    claim.amount ? `Demurrage amount: ${money(claim.amount)} basis ${money(claim.demurrageRate)}/day pro rata.` : `Dispatch estimate: ${money(claim.dispatch)}.`,
    "",
    "Please confirm agreement or provide signed SOF, NOR, rain/weather logs and terminal operation records.",
    "",
    "Best regards,"
  ].join("\n");
}

function renderProOpsMarketAlarm() {
  if (!proOpsMarketAlarmForm || !proOpsMarketAlarmResult) return;
  const values = collectFormValues(proOpsMarketAlarmForm);
  const offer = proOpsCurrentOffer();
  const cachedNews = getCachedLiveNews();
  const bunker = liveFeedState.bunker || verifiedBunkerSnapshot.ports.singapore.vlsfo;
  const routeText = `${values.routeWatch || ""} ${offer.parsed.route || ""}`.toLowerCase();
  const newsHit = cachedNews?.items?.some((item) => `${item.title} ${item.source}`.toLowerCase().includes(routeText.split(/\s+/)[0] || "shipping"));
  const alerts = [
    bunker >= Number(values.bunkerAlert || 700) && ["Bunker", `Bunker ${money(bunker, 2)}/t crossed alert ${money(values.bunkerAlert, 2)}/t`, "High"],
    !balticFeedState.connected && ["Baltic", "Baltic live index needs licensed endpoint; do not label as live.", "Medium"],
    liveFeedState.congestion / 20 >= Number(values.portDelayAlert || 2) && ["Port delay", `Congestion implies port delay pressure near ${(liveFeedState.congestion / 20).toFixed(1)}d`, "Medium"],
    liveFeedState.weather >= Number(values.weatherAlert || 10) && ["Weather", `Weather alert index ${liveFeedState.weather}`, "Medium"],
    newsHit && ["News", "Route/cargo keyword appeared in last live maritime news cache.", "Watch"],
    offer.gate.tce < offer.gate.targetTce && ["TCE", `TCE below target by ${money(offer.gate.targetTce - offer.gate.tce)}/day`, "High"]
  ].filter(Boolean);
  lastProOpsMarketAlarm = { values, alerts, bunker, cachedNews, generatedAt: new Date().toLocaleString() };
  proOpsMarketAlarmResult.innerHTML = `
    ${metricCards([
      { label: "Alerts", value: alerts.length },
      { label: "Bunker", value: `${money(bunker, 2)}/t` },
      { label: "Baltic", value: balticFeedState.connected ? "Connected" : "Licensed required" },
      { label: "News cache", value: cachedNews?.items?.length || 0 }
    ])}
    <div class="timebar-list">${(alerts.length ? alerts : [["Clear", "No strong alarm on this deal right now.", "Low"]]).map(([name, detail, level]) => `<div class="${level === "High" ? "high" : level === "Medium" ? "medium" : "low"}"><strong>${escapeHtml(name)}</strong><span>${escapeHtml(detail)}</span><em>${escapeHtml(level)}</em></div>`).join("")}</div>
  `;
  renderProOpsScore();
}

function renderProOpsLoadicator() {
  if (!proOpsLoadicatorForm || !proOpsLoadicatorResult) return;
  const values = collectFormValues(proOpsLoadicatorForm);
  const cargoWeight = Number(values.cargoWeight) || 0;
  const displacement = 65000 + cargoWeight + Number(values.foreBallast || 0) + Number(values.aftBallast || 0) + Number(values.portBallast || 0) + Number(values.stbdBallast || 0);
  const km = 14.2;
  const kg = (Number(values.kg) || 0) + cargoWeight / Math.max(displacement, 1) * 0.45;
  const gm = km - kg;
  const trim = ((Number(values.lcg) || 0) * cargoWeight + (Number(values.aftBallast || 0) - Number(values.foreBallast || 0)) * 68) / Math.max(displacement, 1) / 6.4;
  const tcg = ((Number(values.tcg) || 0) * cargoWeight + (Number(values.stbdBallast || 0) - Number(values.portBallast || 0)) * 18) / Math.max(cargoWeight + Number(values.portBallast || 0) + Number(values.stbdBallast || 0), 1);
  const heel = Math.atan2(tcg, Math.max(gm, 0.2)) * 180 / Math.PI;
  const sf = Math.abs(Number(values.lcg) || 0) * cargoWeight / 100;
  const bm = sf * 0.42;
  const gzRows = [5, 10, 20, 30, 40].map((angle) => [angle, Math.max(0, Math.sin(angle * Math.PI / 180) * gm * 0.82)]);
  const status = gm < 0.8 || Math.abs(heel) > 5 || Math.abs(trim) > 2.5 ? "ALERT" : gm < 1.4 || Math.abs(heel) > 3 ? "WATCH" : "PASS";
  const advice = [
    Math.abs(trim) > 1.5 ? "Move cargo toward midship or adjust fore/aft ballast." : "Trim inside working band.",
    Math.abs(heel) > 2 ? `Correct ${heel > 0 ? "starboard" : "port"} heel with opposite wing ballast.` : "Port/stbd balance controlled.",
    gm < 1.2 ? "Lower high KG cargo or add low ballast before sailing." : "GM margin acceptable in demo hydrostatic model."
  ];
  lastProOpsLoadicator = { values, displacement, km, kg, gm, trim, heel, sf, bm, gzRows, status, advice, generatedAt: new Date().toLocaleString() };
  proOpsLoadicatorResult.innerHTML = `
    ${metricCards([
      { label: "Status", value: escapeHtml(status) },
      { label: "GM", value: `${gm.toFixed(2)} m` },
      { label: "Trim", value: `${trim.toFixed(2)} m` },
      { label: "Heel", value: `${heel.toFixed(2)} deg` }
    ])}
    <div class="pro-load-grid">
      <div><strong>Hydrostatic</strong><span>Disp ${Math.round(displacement).toLocaleString("en-US")} mt / KM ${km.toFixed(2)} / KG ${kg.toFixed(2)}</span></div>
      <div><strong>SF / BM proxy</strong><span>SF ${sf.toFixed(0)} / BM ${bm.toFixed(0)} with limit watch</span></div>
      <div><strong>GZ curve</strong><span>${gzRows.map(([a, gz]) => `${a}deg:${gz.toFixed(2)}m`).join(" | ")}</span></div>
      <div><strong>Bay-row-tier</strong><span>Container plan should lock heavy tiers low and avoid one-side row bias.</span></div>
    </div>
    <ul class="compact-list">${advice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <a class="ghost-button small" href="stability.html" target="_blank" rel="noopener">3D Load-Stability Lab'i Ac</a>
  `;
  renderProOpsScore();
}

function renderProOpsClient() {
  if (!proOpsClientForm || !proOpsClientResult) return;
  const values = collectFormValues(proOpsClientForm);
  const offer = proOpsCurrentOffer();
  const token = saasToken(`${values.client}-${offer.dealRef}-${Date.now().toString().slice(-4)}`);
  const portalUrl = `https://captainemo03.github.io/focusea/#client-${token}`;
  const summary = [
    `Client: ${values.client}`,
    `Deal: ${offer.dealRef}`,
    `Status: ${values.status}`,
    `ETA: ${values.eta}`,
    `Route: ${offer.parsed.route || "TBC"}`,
    `P&L: ${money(offer.gate.netPnl)} / TCE ${money(offer.gate.tce)}/day`,
    `Risk: ${offer.risk}/100 (${offer.status})`,
    `Claim: ${lastProOpsClaim?.verdict || "Pending"}`
  ];
  lastProOpsClient = { values, portalUrl, summary, generatedAt: new Date().toLocaleString(), reportText: reportLines("FOCUSEA CLIENT PORTAL", summary) };
  proOpsClientResult.innerHTML = `
    ${metricCards([
      { label: "Client", value: escapeHtml(values.client) },
      { label: "Status", value: escapeHtml(values.status) },
      { label: "Access", value: escapeHtml(values.access) },
      { label: "Risk", value: `${offer.risk}/100` }
    ])}
    <div class="confidence-row"><span>Client link</span><em class="source-badge simulated">Static preview</em><a href="${portalUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(portalUrl)}</a></div>
    <div class="ops-list">${summary.map((item) => `<div><strong>Client pack</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div>
  `;
  renderProOpsDealRoom();
}

function renderProOpsScore() {
  if (!proOpsScoreResult) return;
  const offer = lastProOpsOffer || proOpsCurrentOffer();
  const commercial = clamp(Math.round(100 - offer.gate.commercialRisk), 0, 100);
  const legal = clamp(Math.round(100 - Math.min(95, offer.redFlags.length * 20 + 28)), 0, 100);
  const ops = clamp(Math.round(100 - (lastProOpsPort?.risk ?? offer.gate.portRisk)), 0, 100);
  const claim = clamp(Math.round(lastProOpsClaim ? 100 - lastProOpsClaim.disputeRisk : 58), 0, 100);
  const market = clamp(Math.round(100 - (lastProOpsMarketAlarm?.alerts?.length || 1) * 14), 0, 100);
  const compliance = /sanction|ofac|iran|russia|syria|venezuela/i.test(offer.dealText) ? 36 : 82;
  const data = clamp(Math.round(45 + (offer.parsed.missing.length ? 10 : 25) + (lastProOpsOcr?.readiness || 0) * 0.2), 0, 100);
  const rows = [
    ["Commercial", commercial],
    ["Legal", legal],
    ["Ops", ops],
    ["Claim", claim],
    ["Market", market],
    ["Compliance", compliance],
    ["Data confidence", data]
  ];
  const score = Math.round(rows.reduce((sum, [, value]) => sum + value, 0) / rows.length);
  const verdict = score >= 74 ? "FIX" : score >= 55 ? "WATCH" : "AVOID";
  lastProOpsScore = { score, verdict, rows, generatedAt: new Date().toLocaleString() };
  proOpsScoreResult.innerHTML = `
    <div class="workflow-score-ring" style="--score:${score}%"><strong>${score}</strong><span>${escapeHtml(verdict)}</span></div>
    <div class="ai-explain-list">${rows.map(([label, value]) => `<div><span>${escapeHtml(label)}<small>${escapeHtml(value >= 70 ? "controlled" : value >= 50 ? "watch" : "weak")}</small></span><i style="--bar:${value}%"></i><strong>${value}</strong></div>`).join("")}</div>
  `;
}

function proOpsWorkspaceExport() {
  return {
    generatedAt: new Date().toLocaleString(),
    inbox: proOpsInbox(),
    offer: lastProOpsOffer,
    dealRoom: lastProOpsDealRoom,
    ask: lastProOpsAsk,
    ocr: lastProOpsOcr,
    port: lastProOpsPort,
    claim: lastProOpsClaim,
    marketAlarm: lastProOpsMarketAlarm,
    loadicator: lastProOpsLoadicator,
    client: lastProOpsClient,
    score: lastProOpsScore,
    audit: proOpsAudit()
  };
}

function handleProOpsDownload(type) {
  if (!lastProOpsOffer) renderProOpsInbox(true);
  if (!lastProOpsDealRoom) renderProOpsDealRoom();
  const actions = {
    "inbox-json": () => downloadJsonFile("focusea-proops-inbox.json", proOpsWorkspaceExport()),
    "counter-mail": () => downloadTextFile("focusea-proops-counter-mail.txt", lastProOpsOffer?.counterMail || "No counter mail."),
    "deal-room-pdf": () => downloadPdfFile("focusea-proops-deal-room.pdf", "Focusea Pro Ops Deal Room", lastProOpsDealRoom?.reportText || proOpsDealRoomText()),
    "claim-letter": () => downloadTextFile("focusea-proops-claim-letter.txt", proOpsClaimLetterText()),
    "client-pdf": () => downloadPdfFile("focusea-proops-client-portal.pdf", "Focusea Client Portal", lastProOpsClient?.reportText || "Run Client Portal first.")
  };
  actions[type]?.();
}

function renderAllProOps() {
  renderProOpsInbox();
  renderProOpsDealRoom();
  renderProOpsAsk();
  renderProOpsOcr();
  renderProOpsPort();
  renderProOpsClaim();
  renderProOpsMarketAlarm();
  renderProOpsLoadicator();
  renderProOpsClient();
  renderProOpsScore();
}

function renderAllWorkflowControl() {
  renderWorkflowGate();
  renderDealIntelligenceGraph();
  renderMarketMemory();
  renderDocumentRedTeam();
  renderPortReality();
  renderWeatherLaytime();
  renderCarbonDesk();
  renderWorkflowClientPortal();
  renderNegotiationPro();
  renderWorkflowConfidence();
  renderWorkflowInbox();
  renderWorkflowDealRoom();
  renderWorkflowOcrLane();
  renderWorkflowTimeBar();
  renderWorkflowVetting();
  renderWorkflowClauseVersion();
  renderWorkflowCounter();
  renderWorkflowWhatIf();
  renderWorkflowMission();
  renderWorkflowCommunity();
  renderFocuseaScore();
  renderWorkflowSofEngine();
  renderWorkflowPortalPro();
  renderWorkflowCounterparty();
  renderWorkflowAgency();
  renderWorkflowMailStudio();
  renderWorkflowComparison();
  renderWorkflowTrustLedger();
  renderWorkflowBackendConnector();
  renderWorkflowReportCenter();
}

const superSuiteFeatures = [
  { category: "Broker", title: "Fixture Autopilot", output: "Offer card, recap, risk, TCE, email and PDF", action: "Paste fixture mail and run all modules." },
  { category: "Broker", title: "Deal Room", output: "Offer, counter, recap, CP, SOF, laytime, claim, invoice", action: "Use Super report as deal-room cover sheet." },
  { category: "Broker", title: "Comparable Fixtures", output: "Route/cargo rate memory and market comparison", action: "Save comparable fixture after each real deal." },
  { category: "Broker", title: "Negotiation Coach", output: "Counter level, spread and acceptance posture", action: "Counter before subjects if spread is wide." },
  { category: "Broker", title: "Subject Deadline Alarm", output: "Subject, laycan and time-bar watch list", action: "Create alarm before lifting subjects." },
  { category: "Ops", title: "Port Call Timeline", output: "ETA, NOR, pilot, berth, loading, docs, sailing", action: "Send timeline to agent and receiver." },
  { category: "Ops", title: "Agency Proforma Builder", output: "Pilotage, tug, berth, port dues, agency estimate", action: "Replace estimate with official PDA when received." },
  { category: "Ops", title: "Port Delay Predictor", output: "Waiting risk from port, cargo, weather and congestion", action: "Add waiting cost to voyage estimate." },
  { category: "Ops", title: "Turkiye Port Desk", output: "Local docs, customs, cabotage and agency notes", action: "Keep terminal-specific notes in local database." },
  { category: "Ops", title: "Terminal Notes Database", output: "Personal port/agency memory stored in browser", action: "Record rain letter, docs and cost quirks." },
  { category: "Claim", title: "CP Clause Diff Tool", output: "Changed wording, deleted protection and risk bias", action: "Do not lift subjects before CP changes are checked." },
  { category: "Claim", title: "Demurrage Claim Pack", output: "SOF, NOR, rain log, invoice and claim letter", action: "Export claim PDF and evidence checklist." },
  { category: "Claim", title: "Time Bar Calendar", output: "Claim, invoice, CP comment and laycan dates", action: "Put red dates into broker daily brief." },
  { category: "Claim", title: "Evidence Checklist", output: "Missing NOR, SOF, logs, photos and invoice proof", action: "Ask agent for missing evidence immediately." },
  { category: "Claim", title: "Clause Battle Library", output: "Owner/charterer wording and counter language", action: "Use counter wording in recap/CP comments." },
  { category: "Market", title: "Market Confidence Badge", output: "Verified, simulated, input or licensed labels", action: "Never show fake live data as verified." },
  { category: "Market", title: "Cargo Market Pulse", output: "Coal, grain, container, LNG, crude and chemical pulse", action: "Attach cargo sentiment to negotiation note." },
  { category: "Market", title: "Bunker Sensitivity Alerts", output: "P&L impact when bunker changes", action: "Rerun TCE when bunker moves above trigger." },
  { category: "Market", title: "Baltic / SCFI / Tanker Index Panel", output: "Licensed-source-ready market panel", action: "Connect paid/licensed endpoint for true live feed." },
  { category: "Market", title: "Broker Daily Brief", output: "Today’s risks, market, inbox and port alarms", action: "Start each day from this panel." },
  { category: "Engineering", title: "Loadicator Pro 2.0", output: "GM, trim, heel, draft, ballast and SF/BM bridge", action: "Open side Load-Stability Lab for 3D plan." },
  { category: "Engineering", title: "Cargo Stowage Planner", output: "Container, coal, grain, ore and project cargo logic", action: "Check cargo-port suitability before loading." },
  { category: "Engineering", title: "Auto Balance", output: "Move cargo / ballast suggestions", action: "Apply recommendation in stability lab." },
  { category: "Engineering", title: "Loading Sequence", output: "Step-by-step loading plan with changing risk", action: "Export engineer report before final plan." },
  { category: "Engineering", title: "Engineer Report PDF", output: "Load plan, GM, trim, heel and warnings", action: "Keep report history for class presentation." },
  { category: "AI", title: "Document AI Hub", output: "CP, SOF, NOR, LOI and invoice parser", action: "Paste documents and find contradictions." },
  { category: "AI", title: "OCR Upload Ready", output: "Backend-ready PDF/photo extraction lane", action: "Add Python OCR endpoint when backend is deployed." },
  { category: "AI", title: "Broker Email Studio", output: "Firm offer, counter, recap, subjects lifted, claim reminder", action: "Generate client-safe English email." },
  { category: "AI", title: "AI Tutor", output: "Explains demurrage, laytime and clause reasons", action: "Use in academy and classroom mode." },
  { category: "AI", title: "CV + Career AI", output: "Professional seafarer CV and interview prep", action: "Export CV from Academy & Account." },
  { category: "Academy", title: "Interactive Case Studies", output: "Mersin rain stop, NOR and laytime scenarios", action: "Turn real cases into quizzes." },
  { category: "Academy", title: "Broker Exam Mode", output: "Scenario scoring, badges and certificate PDF", action: "Use exam mode for class demo." },
  { category: "Academy", title: "Charter Party Simulator", output: "Clause choices show commercial consequences", action: "Compare owner vs charterer wording." },
  { category: "Academy", title: "Port Operations Course", output: "Pilotage, tug, berth, docs, SOF and NOR modules", action: "Add port notes as lesson examples." },
  { category: "Academy", title: "Stability Academy", output: "GM, KG, KM, trim, heel and FSE learning path", action: "Link each lesson to 3D loadicator." },
  { category: "Product", title: "Client Portal", output: "Voyage estimate, ETA, P&L, claim and PDF link", action: "Export client summary from Super Suite." },
  { category: "Product", title: "Admin Panel", output: "Cargo multipliers, data sources, port defaults", action: "Tune demo defaults before presentation." },
  { category: "Product", title: "User Accounts Ready", output: "Offer tracker, CRM, reports and vault schema", action: "Move localStorage to backend auth later." },
  { category: "Product", title: "Report History", output: "Saved Super/Python/claim/load reports", action: "Use history as real product proof." },
  { category: "Product", title: "Mobile Broker Mode", output: "Inbox, risk, mail and report first layout", action: "Keep only critical controls on phone." }
];

function getSuperNotes() {
  return safeLocalGet("focusea-super-terminal-notes-v1", []) || [];
}

function setSuperNotes(notes) {
  safeLocalSet("focusea-super-terminal-notes-v1", notes);
}

function getSuperHistory() {
  return safeLocalGet("focusea-super-report-history-v1", []) || [];
}

function setSuperHistory(history) {
  safeLocalSet("focusea-super-report-history-v1", history);
}

function superFeatureRows() {
  return [
    ["category", "title", "output", "next_action"],
    ...superSuiteFeatures.map((feature) => [feature.category, feature.title, feature.output, feature.action])
  ];
}

function superSuiteContext(values) {
  const parsed = parseOfferText(values.dealText || "");
  const cargoType = values.cargoType || parsed.cargoType || "coal";
  const cargo = getCargoProfile(cargoType);
  const portProfile = turkiyePortProfile(values.turkiyePortId || "mersin");
  const quantity = parsed.quantity || (cargo.unit === "TEU" ? 2400 : cargo.unit === "cbm" ? 145000 : 50000);
  const freight = parsed.freight || cargo.baseFreight * cargo.freightMultiplier;
  const gross = quantity * freight;
  const portDelay = Number(values.portDelay) || 0;
  const bunkerPrice = Number(values.bunkerPrice) || liveFeedState.bunker;
  const bunkerTons = (18 + portDelay) * (cargo.unit === "TEU" ? 54 : cargo.unit === "cbm" ? 76 : 28) * cargo.bunkerMultiplier;
  const bunkerCost = bunkerTons * bunkerPrice;
  const portCost = portCostBase(portProfile.port) * portProfile.ops.costFactor * cargo.portCostMultiplier;
  const hireCost = (18 + portDelay + cargo.risk / 22) * (Number(values.dailyHire) || 14500);
  const netPnl = gross - bunkerCost - portCost - hireCost;
  const tce = netPnl / Math.max(1, 18 + portDelay);
  const targetTce = Number(values.targetTce) || 22000;
  const parsedRisk = scoreParsedOffer(parsed);
  const draftMargin = turkiyeDraftMargin(portProfile.port, values.draft);
  const portRisk = turkiyeWaitingRisk(portProfile.id, portDelay, cargo.risk);
  const legalRisk = /wibon|wipon|time lost waiting|weather delays excepted unless used/i.test(values.dealText || "") ? 72 : 38;
  const marketRisk = clamp(Math.round(cargo.risk + liveFeedState.congestion * 0.22 + (bunkerPrice - 620) * 0.08), 0, 100);
  const overallRisk = clamp(Math.round((parsedRisk.score + portRisk + legalRisk + marketRisk + cargo.risk) / 5), 0, 100);
  const decision = overallRisk >= 72 ? "WATCH / protect subjects" : overallRisk >= 52 ? "FIX with guards" : "FIX candidate";
  return { values, parsed, cargoType, cargo, portProfile, quantity, freight, gross, bunkerTons, bunkerCost, portCost, hireCost, netPnl, tce, targetTce, parsedRisk, draftMargin, portRisk, legalRisk, marketRisk, overallRisk, decision };
}

function superFeatureStatus(feature, context) {
  const base = {
    Broker: Math.round(100 - context.parsedRisk.score),
    Ops: Math.round(100 - context.portRisk),
    Claim: Math.round(100 - context.legalRisk),
    Market: Math.round(100 - context.marketRisk),
    Engineering: Math.round(context.draftMargin < 1 ? 48 : 78),
    AI: 82,
    Academy: 88,
    Product: 76
  }[feature.category] || 70;
  const readiness = clamp(base, 12, 98);
  const status = readiness >= 78 ? "Ready" : readiness >= 55 ? "Watch" : "Needs data";
  return { readiness, status };
}

function renderSuperFeatureGrid(filter = activeSuperFilter) {
  if (!superFeatureGrid) return;
  activeSuperFilter = filter || "All";
  const context = lastSuperSuite?.context || superSuiteContext(superSuiteForm ? collectFormValues(superSuiteForm) : {});
  const rows = superSuiteFeatures
    .filter((feature) => activeSuperFilter === "All" || feature.category === activeSuperFilter)
    .map((feature) => ({ ...feature, ...superFeatureStatus(feature, context) }));
  document.querySelectorAll("[data-super-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.superFilter === activeSuperFilter);
  });
  superFeatureGrid.innerHTML = rows.map((feature) => `
    <article class="super-feature-card">
      <div><span>${escapeHtml(feature.category)}</span><em class="source-badge ${feature.status === "Ready" ? "verified" : feature.status === "Watch" ? "api-ready" : "simulated"}">${escapeHtml(feature.status)}</em></div>
      <strong>${escapeHtml(feature.title)}</strong>
      <p>${escapeHtml(feature.output)}</p>
      <div class="trust-meter"><span style="width:${feature.readiness}%"></span></div>
      <small>${escapeHtml(feature.action)}</small>
    </article>
  `).join("");
}

function superSuiteReportText(result = lastSuperSuite) {
  if (!result) return "No Super Suite report generated.";
  const c = result.context;
  return reportLines("FOCUSEA SUPER SUITE REPORT", [
    `Mode: ${c.values.mode}`,
    `Decision: ${c.decision}`,
    `Overall risk: ${c.overallRisk}/100`,
    `Cargo: ${c.cargo.label}`,
    `Port: ${c.portProfile.port.name}`,
    `Quantity / freight: ${c.quantity.toLocaleString("en-US")} ${c.cargo.unit} @ ${money(c.freight, c.cargo.unit === "TEU" ? 0 : 2)}`,
    `Net P&L: ${money(c.netPnl)}`,
    `TCE: ${money(c.tce)}/day vs target ${money(c.targetTce)}/day`,
    `Draft margin: ${c.draftMargin.toFixed(1)} m`,
    "",
    "Activated feature families:",
    ...result.featureSummary.map((item) => `- ${item.category}: ${item.ready}/${item.total} ready, avg ${item.average}%`),
    "",
    "Next actions:",
    ...result.nextActions.map((item) => `- ${item}`),
    "",
    "Client summary:",
    result.clientText
  ]);
}

function saveSuperReportHistory(result) {
  const history = getSuperHistory();
  const item = {
    id: `SUP-${Date.now()}`,
    time: new Date().toLocaleString(),
    decision: result.context.decision,
    cargo: result.context.cargo.label,
    port: result.context.portProfile.port.name,
    risk: result.context.overallRisk,
    pnl: Math.round(result.context.netPnl)
  };
  setSuperHistory([item, ...history].slice(0, 20));
}

function renderSuperReportHistory() {
  if (!superReportHistory) return;
  const history = getSuperHistory();
  superReportHistory.innerHTML = history.length ? `
    <div class="ops-list">${history.slice(0, 8).map((item) => `
      <div>
        <strong>${escapeHtml(item.id)} · ${escapeHtml(item.decision)}</strong>
        <span>${escapeHtml(item.time)} · ${escapeHtml(item.cargo)} · ${escapeHtml(item.port)} · risk ${item.risk}/100 · P&L ${money(item.pnl)}</span>
      </div>
    `).join("")}</div>
  ` : `<small>No Super Suite report yet. Run the suite to create history.</small>`;
}

function renderSuperBuildQueue() {
  if (!superBuildQueue) return;
  const queue = [
    ["Backend auth", "Move localStorage offers, notes, reports and vault to user accounts."],
    ["Licensed market feed", "Connect Baltic/SCFI/tanker/bunker endpoints with source badges."],
    ["OCR pipeline", "Python OCR for PDF/photo SOF, NOR, invoice and CP uploads."],
    ["3D loadicator sync", "Send cargo plan from main site to side Load-Stability Lab."],
    ["Client portal links", "Generate shareable read-only client status links."],
    ["Notification worker", "Subject, laycan, time bar, bunker and port delay alarms."]
  ];
  superBuildQueue.innerHTML = `
    ${metricCards([
      { label: "Queued modules", value: queue.length },
      { label: "Current layer", value: "Frontend product demo" },
      { label: "Next serious step", value: "Backend + accounts" },
      { label: "Differentiator", value: "Paste -> calculate -> document -> action" }
    ])}
    <div class="ops-list">${queue.map(([title, text]) => `<div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></div>`).join("")}</div>
  `;
}

function renderSuperTerminalNotes() {
  if (!superTerminalNotesResult) return;
  const notes = getSuperNotes();
  superTerminalNotesResult.innerHTML = notes.length ? `
    ${metricCards([
      { label: "Saved notes", value: notes.length },
      { label: "Latest port", value: escapeHtml(notes[0]?.portName || "-") }
    ])}
    <div class="ops-list">${notes.slice(0, 8).map((note) => `
      <div>
        <strong>${escapeHtml(note.portName)} · ${escapeHtml(note.noteType)}</strong>
        <span>${escapeHtml(note.time)} · ${escapeHtml(note.noteText)}</span>
      </div>
    `).join("")}</div>
  ` : `<small>No terminal notes yet. Save one to build your own port memory.</small>`;
}

function addSuperTerminalNote(event) {
  event?.preventDefault();
  if (!superTerminalNoteForm) return;
  const values = collectFormValues(superTerminalNoteForm);
  const note = {
    ...values,
    time: new Date().toLocaleString()
  };
  setSuperNotes([note, ...getSuperNotes()].slice(0, 50));
  renderSuperTerminalNotes();
}

function renderSuperSuite() {
  if (!superSuiteForm || !superSuiteResult) return;
  const values = collectFormValues(superSuiteForm);
  const context = superSuiteContext(values);
  const featureRows = superSuiteFeatures.map((feature) => ({ ...feature, ...superFeatureStatus(feature, context) }));
  const categories = [...new Set(featureRows.map((feature) => feature.category))];
  const featureSummary = categories.map((category) => {
    const items = featureRows.filter((feature) => feature.category === category);
    return {
      category,
      total: items.length,
      ready: items.filter((feature) => feature.status === "Ready").length,
      average: Math.round(items.reduce((sum, feature) => sum + feature.readiness, 0) / Math.max(items.length, 1))
    };
  });
  const nextActions = [
    context.parsed.missing?.length ? `Close missing offer fields: ${context.parsed.missing.join(", ")}.` : "Offer fields are usable for a first recap draft.",
    context.tce < context.targetTce ? `TCE is below target by ${money(context.targetTce - context.tce)}/day; counter freight or reduce delay.` : "TCE beats target; protect legal and ops wording before fixing.",
    context.portRisk >= 60 ? `Port delay risk is ${context.portRisk}/100 at ${context.portProfile.port.name}; ask agent for berth/PDA confirmation.` : "Port risk is workable; keep agency updates in SOF.",
    context.legalRisk >= 60 ? "NOR/waiting/weather wording is risky; use Clause Battle before subjects lifted." : "Clause posture is not flashing red in the local model.",
    context.draftMargin < 1 ? `Draft margin ${context.draftMargin.toFixed(1)} m is tight; confirm berth-specific depth.` : `Draft margin ${context.draftMargin.toFixed(1)} m is acceptable in the local model.`,
    "Open Load-Stability Lab for 3D stowage/GM/trim/heel if cargo plan changes."
  ];
  const clientText = [
    `Fixture status: ${context.decision}`,
    `Cargo/port: ${context.cargo.label} / ${context.portProfile.port.name}`,
    `Commercial: estimated P&L ${money(context.netPnl)}, TCE ${money(context.tce)}/day.`,
    `Risk: overall ${context.overallRisk}/100, port ${context.portRisk}/100, market ${context.marketRisk}/100.`,
    `Next: ${nextActions[0]} ${nextActions[1]}`
  ].join("\n");
  lastSuperSuite = {
    generatedAt: new Date().toLocaleString(),
    context,
    featureRows,
    featureSummary,
    nextActions,
    clientText
  };
  if (superSuiteHeadline) superSuiteHeadline.textContent = `${context.decision}: ${context.cargo.label} / ${context.portProfile.port.name}`;
  if (superSuiteSummary) superSuiteSummary.textContent = `Risk ${context.overallRisk}/100, P&L ${money(context.netPnl)}, TCE ${money(context.tce)}/day. ${nextActions[0]}`;
  superSuiteResult.innerHTML = `
    ${metricCards([
      { label: "Decision", value: escapeHtml(context.decision) },
      { label: "Overall risk", value: `${context.overallRisk}/100` },
      { label: "Net P&L", value: `<em class="${context.netPnl >= 0 ? "positive" : "negative"}">${money(context.netPnl)}</em>` },
      { label: "TCE", value: `${money(context.tce)}/day` },
      { label: "Port", value: escapeHtml(context.portProfile.port.name) },
      { label: "Feature layer", value: `${superSuiteFeatures.length} modules` }
    ])}
    <div class="super-summary-grid">
      ${featureSummary.map((item) => `<div><span>${escapeHtml(item.category)}</span><strong>${item.ready}/${item.total} ready</strong><small>avg ${item.average}%</small></div>`).join("")}
    </div>
    <ul class="compact-list">${nextActions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <pre>${escapeHtml(clientText)}</pre>
  `;
  saveSuperReportHistory(lastSuperSuite);
  renderSuperFeatureGrid(activeSuperFilter);
  renderSuperReportHistory();
  renderSuperBuildQueue();
}

function superClientText() {
  if (!lastSuperSuite) renderSuperSuite();
  return lastSuperSuite?.clientText || "No Super Suite client report.";
}

function handleSuperDownload(type) {
  if (!lastSuperSuite) renderSuperSuite();
  const actions = {
    pdf: () => downloadPdfFile("focusea-super-suite-report.pdf", "Focusea Super Suite Report", superSuiteReportText(lastSuperSuite)),
    json: () => downloadJsonFile("focusea-super-suite-report.json", lastSuperSuite || {}),
    client: () => downloadTextFile("focusea-super-suite-client-summary.txt", superClientText()),
    matrix: () => downloadCsvFile("focusea-super-suite-feature-matrix.csv", superFeatureRows())
  };
  actions[type]?.();
  superSuiteResult?.querySelector(".download-confirm")?.remove();
  superSuiteResult?.insertAdjacentHTML("beforeend", `<small class="download-confirm">Downloaded: ${escapeHtml(window.focuseaLastDownload?.filename || type)}</small>`);
}

function renderAllSuperSuite() {
  renderSuperSuite();
  renderSuperTerminalNotes();
  renderSuperReportHistory();
  renderSuperFeatureGrid();
  renderSuperBuildQueue();
}

let lastPythonEngineResult = null;

const pythonEngineSamples = {
  "parse-offer": "50k coal Indonesia to India laycan 10/15 Jul freight 18.50 pmt demurrage USD 18,000/day Supramax. Subjects stem and receiver approval. Commission 2.5 pct total.",
  "sof-laytime": "NOR tendered 10 Jul 0800. Berthed 10 Jul 1800. Loading started 11 Jul 0600. Rain stop 12 Jul 0300-0900. Completed 14 Jul 2200. Allowed laytime 72h. Demurrage USD 18,000/day. Dispatch USD 9,000/day.",
  "voyage-estimate": "Cargo coal quantity 50000 mt, freight 18.50 pmt, distance 5800 nm, speed 13 kn, sea consumption 28 mt/day, port days 5, bunker 620 usd/mt, port cost 68000, daily hire 14500, commission 2.5 pct.",
  "cp-diff": "ORIGINAL: NOR valid only when vessel is in berth and free pratique granted. Weather delays to be excluded from laytime.\n---\nREVISED: NOR valid whether in berth or not. Time lost waiting for berth shall count as laytime. Weather delays excepted unless used.",
  stability: "LOADS: H1 coal 8500 mt x -72 y -1 kg 8.5; H2 coal 9500 mt x -36 y 1 kg 8.2; H3 containers 5200 mt x 0 y 3 kg 15.8; H4 grain 7800 mt x 35 y -2 kg 9.4; H5 project 2600 mt x 71 y 4 kg 13.5. BALLAST: fore peak 700 mt, aft peak 500 mt, port wing 350 mt."
};

function pythonEngineRunbookText() {
  return [
    "FOCUSEA PYTHON BACKEND RUNBOOK",
    "",
    "1. Install dependencies",
    "python -m pip install -r backend/requirements.txt",
    "",
    "2. Start API",
    "python -m uvicorn backend.main:app --reload",
    "",
    "3. Open docs",
    "http://127.0.0.1:8000/docs",
    "",
    "4. Use from Focusea",
    "Open #pythonEngine, keep API base as http://127.0.0.1:8000, then run a job.",
    "",
    "Production note: GitHub Pages is static, so deploy the backend separately on Render, Railway, Fly.io, VPS or another Python host."
  ].join("\n");
}

function pythonHistory() {
  return safeLocalGet("focusea-python-history-v1", []);
}

function savePythonHistory(entry) {
  const history = [entry, ...pythonHistory()].slice(0, 8);
  safeLocalSet("focusea-python-history-v1", history);
  renderPythonHistory();
}

function renderPythonHistory() {
  const target = document.querySelector("#pythonReportHistory");
  if (!target) return;
  const history = pythonHistory();
  if (!history.length) {
    target.innerHTML = "<small>Henüz Python Engine işi çalışmadı. API console'dan bir job başlat.</small>";
    return;
  }
  target.innerHTML = `
    <table class="mini-table">
      <thead><tr><th>Time</th><th>Job</th><th>Mode</th><th>Verdict</th></tr></thead>
      <tbody>${history.map((item) => `<tr><td>${escapeHtml(item.time)}</td><td>${escapeHtml(item.job)}</td><td>${escapeHtml(item.mode)}</td><td>${escapeHtml(item.verdict)}</td></tr>`).join("")}</tbody>
    </table>
  `;
}

function numberFromText(text, pattern, fallback = 0) {
  const match = String(text).match(pattern);
  if (!match) return fallback;
  return Number(String(match[1]).replace(/,/g, "")) || fallback;
}

function cargoTypeFromText(text) {
  const normalized = String(text).toLowerCase();
  if (normalized.includes("lng")) return "lng";
  if (normalized.includes("crude") || normalized.includes("oil")) return "crudeOil";
  if (normalized.includes("iron")) return "ironOre";
  if (normalized.includes("container") || normalized.includes("teu")) return "container";
  if (normalized.includes("grain") || normalized.includes("wheat")) return "grain";
  if (normalized.includes("chemical")) return "chemicals";
  if (normalized.includes("project")) return "projectCargo";
  return "coal";
}

function pythonPayloadForJob(jobType, inputText) {
  const cargoType = cargoTypeFromText(inputText);
  if (jobType === "parse-offer") {
    return { text: inputText };
  }
  if (jobType === "sof-laytime") {
    return {
      sof_text: inputText,
      allowed_hours: numberFromText(inputText, /allowed\s+laytime[^0-9]*(\d+(?:[.,]\d+)?)/i, 72),
      demurrage_rate: numberFromText(inputText, /demurrage[^0-9]*(\d+(?:[,\d]*)(?:\.\d+)?)/i, 18000),
      dispatch_rate: numberFromText(inputText, /dispatch[^0-9]*(\d+(?:[,\d]*)(?:\.\d+)?)/i, 9000)
    };
  }
  if (jobType === "voyage-estimate") {
    return {
      cargo_type: cargoType,
      cargo_qty: numberFromText(inputText, /(?:quantity|cargo)\D*(\d+(?:[,\d]*)(?:\.\d+)?)/i, 50000),
      freight_rate: numberFromText(inputText, /freight\D*(\d+(?:[.,]\d+)?)/i, 18.5),
      distance: numberFromText(inputText, /distance\D*(\d+(?:[,\d]*)(?:\.\d+)?)/i, 5800),
      speed: numberFromText(inputText, /speed\D*(\d+(?:[.,]\d+)?)/i, 13),
      sea_cons: numberFromText(inputText, /sea\s+consumption\D*(\d+(?:[.,]\d+)?)/i, 28),
      port_cons: 4,
      port_days: numberFromText(inputText, /port\s+days\D*(\d+(?:[.,]\d+)?)/i, 5),
      bunker_price: numberFromText(inputText, /bunker\D*(\d+(?:[,\d]*)(?:\.\d+)?)/i, 620),
      port_costs: numberFromText(inputText, /port\s+cost\D*(\d+(?:[,\d]*)(?:\.\d+)?)/i, 68000),
      canal_costs: numberFromText(inputText, /canal\D*(\d+(?:[,\d]*)(?:\.\d+)?)/i, 0),
      daily_hire: numberFromText(inputText, /daily\s+hire\D*(\d+(?:[,\d]*)(?:\.\d+)?)/i, 14500),
      commission: numberFromText(inputText, /commission\D*(\d+(?:[.,]\d+)?)/i, 2.5)
    };
  }
  if (jobType === "cp-diff") {
    const [original = inputText, revised = ""] = String(inputText).split(/\n---+\n/);
    return { original_clause: original.replace(/^ORIGINAL:\s*/i, ""), revised_clause: revised.replace(/^REVISED:\s*/i, "") || inputText };
  }
  return {
    vessel: { displacement: 65000, km: 14.2, lcf: 0, mct_1cm: 820, beam: 32.2 },
    loads_text: inputText
  };
}

function localSofLaytime(inputText) {
  const payload = pythonPayloadForJob("sof-laytime", inputText);
  const { events, rainEvents } = osExtractSofEvents(inputText);
  const start = events.find((event) => event.key === "started")?.date || events.find((event) => event.key === "berthed")?.date || events.find((event) => event.key === "nor")?.date;
  const end = events.find((event) => event.key === "completed")?.date;
  const usedHours = start && end ? Math.max(0, (end - start) / 3600000) : 0;
  const excludedHours = rainEvents.reduce((sum, item) => sum + item.hours, 0);
  const netHours = Math.max(0, usedHours - excludedHours);
  const balanceHours = netHours - payload.allowed_hours;
  const demurrage = balanceHours > 0 ? balanceHours / 24 * payload.demurrage_rate : 0;
  const dispatch = balanceHours < 0 ? Math.abs(balanceHours) / 24 * payload.dispatch_rate : 0;
  return {
    events: events.map((event) => ({ label: event.label, date: osFormatDate(event.date) })),
    stoppages: rainEvents.map((event) => ({ label: event.label, start: osFormatDate(event.start), end: osFormatDate(event.end), hours: Number(event.hours.toFixed(1)) })),
    allowed_hours: payload.allowed_hours,
    used_hours: Number(usedHours.toFixed(1)),
    excluded_hours: Number(excludedHours.toFixed(1)),
    net_hours: Number(netHours.toFixed(1)),
    balance_hours: Number(balanceHours.toFixed(1)),
    demurrage_amount: Math.round(demurrage),
    dispatch_amount: Math.round(dispatch),
    verdict: demurrage > 0 ? "DEMURRAGE" : dispatch > 0 ? "DISPATCH" : "BALANCED",
    source: "frontend-local-demo"
  };
}

function localVoyageEstimate(inputText) {
  const payload = pythonPayloadForJob("voyage-estimate", inputText);
  const result = calculateVoyageEstimate({
    cargoType: payload.cargo_type,
    cargoQty: payload.cargo_qty,
    freightRate: payload.freight_rate,
    distance: payload.distance,
    speed: payload.speed,
    seaCons: payload.sea_cons,
    portCons: payload.port_cons,
    portDays: payload.port_days,
    bunkerPrice: payload.bunker_price,
    portCosts: payload.port_costs,
    canalCosts: payload.canal_costs,
    dailyHire: payload.daily_hire,
    commission: payload.commission
  });
  return {
    ...result,
    verdict: result.pnl > 0 ? "PROFITABLE" : "LOSS WATCH",
    source: "frontend-local-demo"
  };
}

function localCpDiff(inputText) {
  const payload = pythonPayloadForJob("cp-diff", inputText);
  const original = payload.original_clause.toLowerCase();
  const revised = payload.revised_clause.toLowerCase();
  const findings = [
    revised.includes("whether in berth") && !original.includes("whether in berth") ? "NOR widened to WIBON style wording." : "",
    revised.includes("waiting for berth") && !original.includes("waiting for berth") ? "Waiting time now counts toward laytime; owner-favouring change." : "",
    revised.includes("unless used") && !original.includes("unless used") ? "Weather exception narrowed by unless-used wording." : ""
  ].filter(Boolean);
  return {
    findings,
    risk_score: clamp(28 + findings.length * 22, 0, 100),
    posture: findings.length >= 2 ? "Owner leaning / negotiate" : findings.length ? "Review wording" : "No major red flag",
    counter_wording: "Clarify NOR validity, waiting time and weather exceptions before subjects are lifted.",
    source: "frontend-local-demo"
  };
}

function localStabilityEvaluation(inputText) {
  const loadPattern = /(H\d)\s+([a-z]+)?\s*(\d+(?:[.,]\d+)?)\s*mt\s*x\s*(-?\d+(?:[.,]\d+)?)\s*y\s*(-?\d+(?:[.,]\d+)?)\s*kg\s*(\d+(?:[.,]\d+)?)/gi;
  const loads = [];
  let match = loadPattern.exec(inputText);
  while (match) {
    loads.push({
      hold: match[1],
      cargo: match[2] || "cargo",
      weight: Number(match[3].replace(",", ".")),
      x: Number(match[4].replace(",", ".")),
      y: Number(match[5].replace(",", ".")),
      kg: Number(match[6].replace(",", "."))
    });
    match = loadPattern.exec(inputText);
  }
  const fallbackLoads = loads.length ? loads : [
    { hold: "H1", cargo: "coal", weight: 8500, x: -72, y: -1, kg: 8.5 },
    { hold: "H2", cargo: "coal", weight: 9500, x: -36, y: 1, kg: 8.2 },
    { hold: "H3", cargo: "containers", weight: 5200, x: 0, y: 3, kg: 15.8 },
    { hold: "H4", cargo: "grain", weight: 7800, x: 35, y: -2, kg: 9.4 },
    { hold: "H5", cargo: "project", weight: 2600, x: 71, y: 4, kg: 13.5 }
  ];
  const totalWeight = fallbackLoads.reduce((sum, load) => sum + load.weight, 0);
  const lcg = fallbackLoads.reduce((sum, load) => sum + load.weight * load.x, 0) / Math.max(totalWeight, 1);
  const tcg = fallbackLoads.reduce((sum, load) => sum + load.weight * load.y, 0) / Math.max(totalWeight, 1);
  const kg = fallbackLoads.reduce((sum, load) => sum + load.weight * load.kg, 0) / Math.max(totalWeight, 1);
  const km = 14.2;
  const gm = km - kg;
  const trimMeters = lcg * totalWeight / 65000 / 6.8;
  const heelDegrees = Math.atan2(tcg, Math.max(gm, 0.2)) * 57.2958;
  const maxHold = fallbackLoads.reduce((winner, load) => load.weight > winner.weight ? load : winner, fallbackLoads[0]);
  const verdict = gm < 0.8 || Math.abs(heelDegrees) > 5 || Math.abs(trimMeters) > 2.5 ? "ALERT" : gm < 1.4 || Math.abs(heelDegrees) > 3 ? "WATCH" : "PASS";
  return {
    loads: fallbackLoads,
    total_weight: Math.round(totalWeight),
    kg: Number(kg.toFixed(2)),
    km,
    gm: Number(gm.toFixed(2)),
    lcg: Number(lcg.toFixed(2)),
    tcg: Number(tcg.toFixed(2)),
    trim_m: Number(trimMeters.toFixed(2)),
    heel_deg: Number(heelDegrees.toFixed(2)),
    shear_force_proxy: Math.round(Math.abs(lcg) * totalWeight / 100),
    bending_moment_proxy: Math.round(fallbackLoads.reduce((sum, load) => sum + Math.abs(load.x) * load.weight, 0) / 1000),
    verdict,
    recommendation: `${maxHold.hold} is the heaviest hold. Shift high KG cargo toward H3 and correct port/stbd offset with ballast before final load plan.`,
    source: "frontend-local-demo"
  };
}

function simulatePythonJob(jobType, inputText) {
  if (jobType === "parse-offer") {
    const parsed = parseOfferText(inputText);
    const risk = scoreParsedOffer(parsed);
    return { parsed, risk, verdict: risk.label, source: "frontend-local-demo" };
  }
  if (jobType === "sof-laytime") return localSofLaytime(inputText);
  if (jobType === "voyage-estimate") return localVoyageEstimate(inputText);
  if (jobType === "cp-diff") return localCpDiff(inputText);
  return localStabilityEvaluation(inputText);
}

function pythonEngineRoute(jobType) {
  return {
    "parse-offer": "/api/broker/parse-offer",
    "sof-laytime": "/api/laytime/sof",
    "voyage-estimate": "/api/voyage/estimate",
    "cp-diff": "/api/charterparty/diff",
    stability: "/api/stability/evaluate"
  }[jobType] || "/api/broker/parse-offer";
}

async function callPythonEngineApi(values) {
  const base = String(values.apiBase || "").replace(/\/+$/, "");
  if (!base) throw new Error("API base empty");
  const response = await fetch(`${base}${pythonEngineRoute(values.jobType)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pythonPayloadForJob(values.jobType, values.inputText || ""))
  });
  if (!response.ok) throw new Error(`Python API HTTP ${response.status}`);
  return response.json();
}

function pythonReportText(result) {
  return [
    "FOCUSEA PYTHON ENGINE REPORT",
    `Job: ${result.jobType}`,
    `Mode: ${result.mode}`,
    `Generated: ${result.generatedAt}`,
    "",
    JSON.stringify(result.data, null, 2)
  ].join("\n");
}

function renderPythonEngineOutput(result) {
  const target = document.querySelector("#pythonEngineResult");
  const headline = document.querySelector("#pythonEngineHeadline");
  const summary = document.querySelector("#pythonEngineSummary");
  if (!target) return;
  const data = result.data || {};
  const verdict = data.verdict || data.posture || data.risk?.label || data.risk?.score || "Ready";
  const source = data.source || result.mode;
  if (headline) headline.textContent = `${result.jobLabel} tamamlandi: ${verdict}`;
  if (summary) summary.textContent = result.mode === "api"
    ? "FastAPI backend cevap verdi. Bu akisi deploy edince statik site profesyonel hesap motoruna baglanir."
    : "Backend'e erisilemedi; ayni is lokal demo motoruyla calisti. API'yi baslatinca otomatik gercek backend'e gecer.";
  target.innerHTML = `
    ${metricCards([
      { label: "Job", value: escapeHtml(result.jobLabel) },
      { label: "Mode", value: result.mode === "api" ? "FastAPI" : "Local demo" },
      { label: "Verdict", value: escapeHtml(String(verdict)) },
      { label: "Source", value: escapeHtml(String(source)) }
    ])}
    <pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>
  `;
}

async function runPythonEngine(event) {
  event?.preventDefault();
  const form = document.querySelector("#pythonEngineForm");
  if (!form) return;
  const values = collectFormValues(form);
  const jobSelect = form.elements.jobType;
  const jobLabel = jobSelect?.selectedOptions?.[0]?.textContent || values.jobType;
  let mode = "api";
  let data;
  try {
    data = await callPythonEngineApi(values);
  } catch (error) {
    mode = "local-demo";
    data = simulatePythonJob(values.jobType, values.inputText || "");
    data.api_error = error.message;
  }
  lastPythonEngineResult = {
    jobType: values.jobType,
    jobLabel,
    mode,
    data,
    generatedAt: new Date().toLocaleString()
  };
  renderPythonEngineOutput(lastPythonEngineResult);
  savePythonHistory({
    time: lastPythonEngineResult.generatedAt,
    job: jobLabel,
    mode,
    verdict: data.verdict || data.posture || data.risk?.label || "Ready"
  });
}

function updatePythonSample() {
  const job = document.querySelector("#pythonEngineJob");
  const input = document.querySelector("#pythonEngineInput");
  if (!job || !input) return;
  input.value = pythonEngineSamples[job.value] || pythonEngineSamples["parse-offer"];
}

function handlePythonDownload(type) {
  if (!lastPythonEngineResult) {
    lastPythonEngineResult = {
      jobType: "parse-offer",
      jobLabel: "Broker Inbox Parser",
      mode: "local-demo",
      data: simulatePythonJob("parse-offer", pythonEngineSamples["parse-offer"]),
      generatedAt: new Date().toLocaleString()
    };
  }
  if (type === "json") {
    downloadJsonFile("focusea-python-engine-result.json", lastPythonEngineResult);
  } else if (type === "pdf") {
    downloadPdfFile("focusea-python-engine-report.pdf", "Focusea Python Engine Report", pythonReportText(lastPythonEngineResult));
  } else {
    downloadTextFile("focusea-python-backend-runbook.txt", pythonEngineRunbookText());
  }
  const target = document.querySelector("#pythonEngineResult");
  target?.insertAdjacentHTML("beforeend", `<small class="download-confirm">Downloaded: ${escapeHtml(window.focuseaLastDownload?.filename || type)}</small>`);
}

function setEdgeDownloadNotice(type, filename) {
  const prefix = type.split("-")[0];
  const targets = {
    fixture: fixtureImportProResult,
    clause: clauseNegotiationResult,
    profit: profitRadarResult,
    document: documentAiResult,
    email: emailGeneratorProResult,
    brief: dailyBriefProResult
  };
  const target = targets[prefix];
  if (!target) return;
  target.querySelector(".download-confirm")?.remove();
  target.insertAdjacentHTML("beforeend", `<small class="download-confirm">Downloaded: ${filename}</small>`);
}

function handleEdgeDownload(type) {
  if (type.startsWith("fixture") && !lastFixtureImportPro) renderFixtureImportPro();
  if (type.startsWith("clause") && !lastClauseNegotiation) renderClauseNegotiation();
  if (type.startsWith("profit") && !lastProfitRadar) renderProfitRadar();
  if (type.startsWith("document") && !lastDocumentAi) renderDocumentAi();
  if (type.startsWith("email") && !lastEmailGeneratorPro) renderEmailGeneratorPro();
  if (type.startsWith("brief") && !lastDailyBriefPro) renderDailyBriefPro();
  const actions = {
    "fixture-json": () => downloadJsonFile("focusea-fixture-import.json", lastFixtureImportPro || {}),
    "fixture-recap": () => downloadTextFile("focusea-fixture-recap-draft.txt", lastFixtureImportPro?.recap || "No recap data."),
    "clause-txt": () => downloadTextFile("focusea-clause-negotiation.txt", lastClauseNegotiation?.reportText || "No clause data."),
    "profit-pdf": () => downloadPdfFile("focusea-profit-radar.pdf", "Focusea Fixture Profit Radar", lastProfitRadar?.reportText || "No profit radar data."),
    "profit-json": () => downloadJsonFile("focusea-profit-radar.json", lastProfitRadar || {}),
    "document-pdf": () => downloadPdfFile("focusea-document-ai.pdf", "Focusea Document AI", lastDocumentAi?.reportText || "No document data."),
    "document-txt": () => downloadTextFile("focusea-document-ai.txt", lastDocumentAi?.reportText || "No document data."),
    "email-txt": () => downloadTextFile("focusea-broker-email-pro.txt", lastEmailGeneratorPro?.reportText || "No email data."),
    "brief-pdf": () => downloadPdfFile("focusea-daily-brief.pdf", "Focusea Broker Daily Brief", lastDailyBriefPro?.reportText || "No brief data."),
    "brief-txt": () => downloadTextFile("focusea-daily-brief.txt", lastDailyBriefPro?.reportText || "No brief data.")
  };
  actions[type]?.();
  if (window.focuseaLastDownload?.filename) {
    setEdgeDownloadNotice(type, window.focuseaLastDownload.filename);
  }
}

function renderAllEdgeSuite() {
  renderTimeline();
  renderFixtureImportPro();
  renderClauseNegotiation();
  renderProfitRadar();
  renderMarketConfidence();
  renderDocumentAi();
  renderCounterpartyIntel();
  renderPricingEngine();
  renderEmailGeneratorPro();
  renderDealComparison();
  renderEdgeAlarms();
  renderDailyBriefPro();
}

function portRegionFromCountry(country = "") {
  const normalized = country.toLowerCase();
  if (/turkiye|turkey|türkiye/.test(normalized)) return "Turkiye";
  if (/united states|canada|mexico/.test(normalized)) return "North America";
  if (/brazil|argentina|uruguay|chile|peru|ecuador|colombia|venezuela|trinidad|jamaica|bahamas|dominican/.test(normalized)) return "South America";
  if (/south africa|mozambique|tanzania|kenya|djibouti|somalia|sudan|nigeria|ghana|cote|senegal|morocco|tunisia|algeria|libya|egypt|namibia|angola|congo/.test(normalized)) return "Africa";
  if (/australia|new zealand|fiji|papua/.test(normalized)) return "Oceania";
  if (/united arab|saudi|oman|qatar|kuwait|bahrain/.test(normalized)) return "Middle East";
  if (/netherlands|belgium|germany|united kingdom|france|spain|italy|greece|romania|poland|sweden|denmark|norway|finland|estonia|latvia|lithuania|ireland/.test(normalized)) return "Europe";
  return "Asia";
}

function normalizePortType(type = "Multipurpose") {
  const normalized = String(type || "").toLowerCase();
  if (normalized.includes("lng")) return "LNG";
  if (normalized.includes("tanker") || normalized.includes("chemical")) return "Tanker";
  if (normalized.includes("bulk") || normalized.includes("coal") || normalized.includes("grain")) return "Bulk";
  if (normalized.includes("ro-ro") || normalized.includes("roro") || normalized.includes("ferry")) return "Ro-Ro";
  if (normalized.includes("container")) return "Container";
  return "Multipurpose";
}

function portRecordFromLine(line, index = 0) {
  const parts = line.split(/[|,;\t]/).map((part) => part.trim()).filter(Boolean);
  if (parts.length < 3) return null;
  const [code, name, country, regionRaw, typeRaw, depthRaw] = parts;
  const region = regionRaw && !/container|bulk|tanker|ro-ro|lng|multipurpose/i.test(regionRaw) ? regionRaw : portRegionFromCountry(country);
  const type = typeRaw || (regionRaw && /container|bulk|tanker|ro-ro|lng|multipurpose/i.test(regionRaw) ? regionRaw : "Multipurpose");
  const depthNumber = parseFloat(String(depthRaw || "").replace(",", "."));
  const depth = Number.isFinite(depthNumber) ? `${depthNumber} m` : depthRaw || "TBC";
  return {
    id: `global-${String(code || name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
    code: String(code || "").toUpperCase(),
    name,
    country,
    region,
    type,
    typeGroup: normalizePortType(type),
    depth,
    source: "Focusea global seed"
  };
}

function portRecordFromDetailed(id, port) {
  return {
    id: `detailed-${id}`,
    detailedId: id,
    code: {
      istanbul: "TRIST",
      ambarli: "TRAMR",
      mersin: "TRMER",
      izmir: "TRIZM",
      aliaga: "TRALI",
      gemlik: "TRGEM",
      izmit: "TRIZT",
      tekirdag: "TRTEK",
      iskenderun: "TRISK",
      samsun: "TRSSX",
      singapore: "SGSIN",
      rotterdam: "NLRTM",
      shanghai: "CNSHA",
      busan: "KRPUS",
      jebelali: "AEJEA",
      losangeles: "USLAX",
      antwerp: "BEANR",
      hamburg: "DEHAM",
      piraeus: "GRPIR",
      santos: "BRSSZ",
      capetown: "ZACPT",
      ningbo: "CNNGB",
      qingdao: "CNTAO",
      portklang: "MYPKG",
      colombo: "LKCMB",
      nhavasheva: "INNSA",
      felixstowe: "GBFXT",
      valencia: "ESVLC",
      algeciras: "ESALG",
      tangermed: "MAPTM",
      yokohama: "JPYOK",
      kaohsiung: "TWKHH",
      newyork: "USNYC",
      savannah: "USSAV",
      houston: "USHOU",
      vancouver: "CAVAN",
      durban: "ZADUR",
      richardsbay: "ZARCB",
      alexandria: "EGALY",
      portsaid: "EGPSD",
      sohar: "OMSOH",
      khalifa: "AEKHL",
      kingabdullah: "SAKAC"
    }[id] || id.toUpperCase(),
    name: port.name,
    country: port.country,
    region: portRegionFromCountry(port.country),
    type: port.type,
    typeGroup: normalizePortType(port.type),
    depth: port.depth,
    source: "Focusea detailed port guide"
  };
}

function getImportedGlobalPorts() {
  return safeLocalGet("focusea-global-ports-import-v1", []);
}

function setImportedGlobalPorts(records) {
  return safeLocalSet("focusea-global-ports-import-v1", records);
}

function getGlobalPorts() {
  const detailed = Object.entries(ports).map(([id, port]) => portRecordFromDetailed(id, port));
  const seed = globalPortSeedText.split("\n").map(portRecordFromLine).filter(Boolean);
  const imported = getImportedGlobalPorts().map((record, index) => ({ ...record, id: record.id || `imported-${index}`, source: record.source || "Imported official data" }));
  const map = new Map();
  [...detailed, ...seed, ...imported].forEach((record) => {
    const key = record.code || `${record.name}-${record.country}`;
    if (!map.has(key)) map.set(key, record);
  });
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function populateGlobalPortRegionFilter() {
  if (!globalPortRegionFilter) return;
  const current = globalPortRegionFilter.value || "All";
  const regions = [...new Set(getGlobalPorts().map((port) => port.region).filter(Boolean))].sort();
  globalPortRegionFilter.innerHTML = `<option value="All">All regions</option>${regions.map((region) => `<option value="${escapeHtml(region)}">${escapeHtml(region)}</option>`).join("")}`;
  globalPortRegionFilter.value = regions.includes(current) ? current : "All";
}

function filteredGlobalPorts() {
  const data = getGlobalPorts();
  if (!globalPortSearchForm) return data;
  const values = collectFormValues(globalPortSearchForm);
  const query = String(values.portQuery || "").toLowerCase().trim();
  const region = values.regionFilter || "All";
  const type = values.typeFilter || "All";
  return data.filter((port) => {
    const haystack = `${port.name} ${port.country} ${port.region} ${port.type} ${port.code}`.toLowerCase();
    return (!query || haystack.includes(query))
      && (region === "All" || port.region === region)
      && (type === "All" || port.typeGroup === type || port.type.toLowerCase().includes(String(type).toLowerCase()));
  });
}

function renderGlobalPortStats(allPorts, visiblePorts) {
  if (!globalPortStats) return;
  const countries = new Set(allPorts.map((port) => port.country));
  const regions = new Set(allPorts.map((port) => port.region));
  const importedCount = getImportedGlobalPorts().length;
  globalPortStats.innerHTML = `
    <div><span>Total atlas</span><strong>${allPorts.length.toLocaleString("en-US")}</strong></div>
    <div><span>Filtered</span><strong>${visiblePorts.length.toLocaleString("en-US")}</strong></div>
    <div><span>Countries</span><strong>${countries.size}</strong></div>
    <div><span>Imported official</span><strong>${importedCount.toLocaleString("en-US")}</strong></div>
  `;
  globalPortStats.title = `${regions.size} regions covered. Official full-world coverage can be imported from UN/LOCODE or World Port Index CSV.`;
}

function renderGlobalPortList(records) {
  if (!globalPortList) return;
  const rows = records.slice(0, 250);
  globalPortList.innerHTML = rows.map((port) => `
    <button type="button" class="global-port-card" data-global-port="${escapeHtml(port.id)}">
      <span>
        <strong>${escapeHtml(port.name)}</strong>
        <span>${escapeHtml(port.country)} · ${escapeHtml(port.region)} · ${escapeHtml(port.type)}</span>
        <small>Depth: ${escapeHtml(port.depth)} · Source: ${escapeHtml(port.source)}</small>
      </span>
      <em class="global-port-code">${escapeHtml(port.code || "N/A")}</em>
    </button>
  `).join("") || `<div class="global-port-card"><strong>No port found</strong><span>Search another name, country, UN/LOCODE or import official CSV.</span></div>`;
  if (records.length > rows.length) {
    globalPortList.insertAdjacentHTML("beforeend", `<div class="global-port-card"><strong>${records.length - rows.length} more ports hidden</strong><span>Use search or filters to narrow the list.</span></div>`);
  }
}

function renderGlobalPortDetail(record) {
  if (!globalPortDetail || !record) return;
  const detailed = record.detailedId ? ports[record.detailedId] : null;
  const services = detailed?.services || [
    `${record.typeGroup} terminal operations`,
    "Agency / customs support",
    "Bunker or stores by local arrangement"
  ];
  const documents = detailed?.documents || ["Cargo manifest", "Crew list", "Port clearance", "ISPS declaration"];
  const risks = detailed?.risks || ["Port congestion watch", "Local documentation cut-off", "Weather / berth window risk"];
  globalPortDetail.innerHTML = `
    <div class="port-title-row">
      <div>
        <strong>${escapeHtml(record.name)}</strong>
        <span>${escapeHtml(record.country)} · ${escapeHtml(record.region)} · ${escapeHtml(record.code || "UN/LOCODE TBC")}</span>
      </div>
      <em>${escapeHtml(record.typeGroup)}</em>
    </div>
    <div class="port-metrics">
      <div><span>Type</span><strong>${escapeHtml(record.type)}</strong></div>
      <div><span>Depth</span><strong>${escapeHtml(record.depth)}</strong></div>
      <div><span>Source</span><strong>${escapeHtml(record.source)}</strong></div>
      <div><span>Coverage</span><strong>${record.detailedId ? "Detailed" : "Atlas"}</strong></div>
    </div>
    <div class="port-columns">
      <div><h3>Services</h3><ul>${services.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
      <div><h3>Documents</h3><ul>${documents.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
      <div><h3>Risks</h3><ul>${risks.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
    </div>
    <p>${record.detailedId ? escapeHtml(detailed.note) : "Atlas entry is generated from global port seed/import data. Import official UN/LOCODE or World Port Index CSV for full verified coverage."}</p>
  `;
}

function renderGlobalPortAtlas(selectedId = "") {
  if (!globalPortList || !globalPortStats) return;
  populateGlobalPortRegionFilter();
  const allPorts = getGlobalPorts();
  const visiblePorts = filteredGlobalPorts();
  renderGlobalPortStats(allPorts, visiblePorts);
  renderGlobalPortList(visiblePorts);
  const selected = allPorts.find((port) => port.id === selectedId) || visiblePorts[0] || allPorts[0];
  renderGlobalPortDetail(selected);
  document.querySelectorAll("[data-global-port]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.globalPort === selected?.id);
  });
}

function parseGlobalPortCsv(text = "") {
  return text.split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !/^unlocode|^code,/i.test(line))
    .map((line, index) => {
      const record = portRecordFromLine(line, index);
      return record ? { ...record, id: `imported-${Date.now()}-${index}`, source: "Imported official/user CSV" } : null;
    })
    .filter(Boolean);
}

function importGlobalPorts(event) {
  event.preventDefault();
  if (!globalPortImportForm || !globalPortImportResult) return;
  const text = new FormData(globalPortImportForm).get("portCsv") || "";
  const records = parseGlobalPortCsv(text);
  if (!records.length) {
    globalPortImportResult.innerHTML = `<strong>Import failed</strong><span>Format: UNLOCODE,Name,Country,Region,Type,Depth</span>`;
    return;
  }
  const existing = getImportedGlobalPorts();
  const merged = [...existing, ...records];
  setImportedGlobalPorts(merged);
  globalPortImportResult.innerHTML = `<strong>${records.length} ports imported</strong><span>Total imported records: ${merged.length}. Data is saved locally in this browser.</span>`;
  renderGlobalPortAtlas(records[0].id);
}

function setPort(id) {
  const port = ports[id];
  if (!port || !portDetail) return;
  selectedPortId = id;
  const totalCost = Object.values(port.costs).reduce((sum, value) => sum + value, 0);
  document.querySelectorAll("[data-port]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.port === id);
  });
  document.querySelectorAll("[data-port-card]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.portCard === id);
  });
  portDetail.innerHTML = `
    <div class="port-title-row">
      <div>
        <strong>${port.name}</strong>
        <span>${port.country} · ${port.type}</span>
      </div>
      <em>${port.productivity}</em>
    </div>
    <div class="port-metrics">
      <div><span>Depth</span><strong>${port.depth}</strong></div>
      <div><span>Pilotage</span><strong>${port.pilotage}</strong></div>
      <div><span>Berths</span><strong>${port.berth}</strong></div>
      <div><span>Cranes</span><strong>${port.cranes}</strong></div>
      <div><span>Fuel</span><strong>${port.fuel}</strong></div>
      <div><span>VHF</span><strong>${port.vhf}</strong></div>
    </div>
    <div class="port-columns">
      <div>
        <h3>Services</h3>
        <ul>${port.services.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div>
        <h3>Documents</h3>
        <ul>${port.documents.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div>
        <h3>Risks</h3>
        <ul>${port.risks.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
    </div>
    <div class="port-costs">
      <h3>Estimated Port Call Cost</h3>
      <div>
        <span>Pilotage</span><strong>$${port.costs.pilotage.toLocaleString("en-US")}</strong>
        <span>Tug</span><strong>$${port.costs.tug.toLocaleString("en-US")}</strong>
        <span>Berth</span><strong>$${port.costs.berth.toLocaleString("en-US")}</strong>
        <span>Port dues</span><strong>$${port.costs.portDues.toLocaleString("en-US")}</strong>
        <span>Total</span><strong>$${totalCost.toLocaleString("en-US")}</strong>
      </div>
    </div>
    <p>${port.note}</p>
  `;
  renderOpsWorkspace();
}

function populatePortSelects() {
  const options = Object.entries(ports)
    .map(([id, port]) => `<option value="${escapeHtml(id)}">${escapeHtml(port.name)}</option>`)
    .join("");

  document.querySelectorAll('select[name="portId"]').forEach((select) => {
    const currentValue = select.value || "singapore";
    select.innerHTML = options;
    select.value = ports[currentValue] ? currentValue : "singapore";
  });
}

function renderLesson(name) {
  const questionCount = lessonQuizzes[name]?.length || 0;
  lessonDetail.dataset.activeLesson = name;
  lessonDetail.innerHTML = `
    <div class="lesson-summary">
      <span class="eyebrow">Academy Module</span>
      <strong>${escapeHtml(name)}</strong>
      <p>${escapeHtml(lessons[name] || "Bu ders için içerik hazırlanıyor.")}</p>
      <button type="button" data-mini-quiz="${escapeHtml(name)}">Mini Quiz Başlat (${questionCount} soru)</button>
    </div>
  `;
}

function renderMiniQuiz(name) {
  const quiz = lessonQuizzes[name] || [];
  lessonDetail.dataset.activeLesson = name;
  if (!quiz.length) {
    lessonDetail.innerHTML = `<strong>${escapeHtml(name)}</strong><p>Bu ders için quiz soruları hazırlanıyor.</p><button type="button" data-lesson-back="${escapeHtml(name)}">Derse Dön</button>`;
    return;
  }

  lessonDetail.innerHTML = `
    <form class="mini-quiz" data-quiz-form="${escapeHtml(name)}">
      <div class="mini-quiz-head">
        <span class="eyebrow">Mini Quiz</span>
        <strong>${escapeHtml(name)}</strong>
        <small>${quiz.length} soru · Broker karar refleksini ölçer</small>
      </div>
      ${quiz.map((item, questionIndex) => `
        <fieldset>
          <legend>${questionIndex + 1}. ${escapeHtml(item.question)}</legend>
          ${item.options.map((option, optionIndex) => `
            <label class="mini-quiz-option">
              <input type="radio" name="quiz-${questionIndex}" value="${optionIndex}" />
              <span>${escapeHtml(option)}</span>
            </label>
          `).join("")}
        </fieldset>
      `).join("")}
      <div class="mini-quiz-actions">
        <button type="submit">Sonucu Kontrol Et</button>
        <button type="button" data-lesson-back="${escapeHtml(name)}">Derse Dön</button>
      </div>
      <div class="mini-quiz-result" data-quiz-result aria-live="polite"></div>
    </form>
  `;
}

function checkMiniQuiz(name) {
  const quiz = lessonQuizzes[name] || [];
  const form = lessonDetail.querySelector("[data-quiz-form]");
  const result = lessonDetail.querySelector("[data-quiz-result]");
  if (!form || !result || !quiz.length) return;

  let score = 0;
  let answered = 0;
  const review = quiz.map((item, questionIndex) => {
    const selected = form.querySelector(`[name="quiz-${questionIndex}"]:checked`);
    const selectedIndex = selected ? Number(selected.value) : -1;
    const isCorrect = selectedIndex === item.answer;
    if (selected) answered += 1;
    if (isCorrect) score += 1;
    const selectedText = selectedIndex >= 0 ? item.options[selectedIndex] : "Cevap seçilmedi";
    return `
      <li class="${isCorrect ? "correct" : "wrong"}">
        <strong>${isCorrect ? "Doğru" : "Kontrol et"}:</strong>
        ${escapeHtml(item.question)}
        <span>Senin cevap: ${escapeHtml(selectedText)} · Doğru cevap: ${escapeHtml(item.options[item.answer])}</span>
        <small>${escapeHtml(item.explanation)}</small>
      </li>
    `;
  }).join("");

  const percentage = Math.round((score / quiz.length) * 100);
  result.innerHTML = `
    <div class="mini-quiz-score">
      <strong>${score}/${quiz.length}</strong>
      <span>${percentage}% skor · ${answered}/${quiz.length} cevaplandı</span>
    </div>
    <ul>${review}</ul>
  `;
}

function setLiveText(key, value) {
  const element = document.querySelector(`[data-live="${key}"]`);
  if (element) element.textContent = value;
}

function setLiveNote(key, value) {
  const element = document.querySelector(`[data-live-note="${key}"]`);
  if (element) element.textContent = value;
}

function updateLiveFeed() {
  const now = new Date();
  const wave = Math.sin(now.getSeconds() / 6);
  liveFeedState.vessels += Math.round(Math.random() * 14 - 5);
  liveFeedState.congestion = Math.max(18, Math.min(82, liveFeedState.congestion + Math.round(Math.random() * 4 - 2)));
  applyVerifiedBunkerSnapshot();
  liveFeedState.weather = Math.max(2, Math.min(18, liveFeedState.weather + Math.round(Math.random() * 2 - 1)));
  liveFeedState.pnl = Math.max(92, Math.min(220, liveFeedState.pnl + Math.round(Math.random() * 8 - 4)));
  liveFeedState.co2 = Math.max(1280, Math.min(1580, liveFeedState.co2 + Math.round(Math.random() * 12 - 6)));
  liveFeedState.containerIndex = Math.max(1900, Math.min(2550, liveFeedState.containerIndex + Math.round(wave * 8 + Math.random() * 8 - 4)));
  const moveIndex = (key, min, max, volatility, decimals = 0) => {
    const next = clamp(Number(liveFeedState[key] || 0) + wave * volatility + Math.random() * volatility - volatility / 2, min, max);
    liveFeedState[key] = Number(next.toFixed(decimals));
  };
  moveIndex("vlccTd3c", 38, 115, 1.8, 1);
  moveIndex("aframaxWs", 80, 260, 3.4);
  moveIndex("mrAtlantic", 90, 280, 3.2);
  liveFeedState.scfi = liveFeedState.containerIndex + 46;
  moveIndex("ccfi", 850, 2400, 14);
  moveIndex("wci", 1400, 6200, 42);
  moveIndex("fbx", 1300, 5900, 36);
  moveIndex("transpacificSpot", 1800, 7800, 58);
  moveIndex("bunkerAdjustment", 20, 90, 1.4);
  moveIndex("lngSpot", 42000, 190000, 950);
  moveIndex("lngQueue", 18, 92, 1.8);
  moveIndex("jkmMarker", 6, 24, 0.16, 2);
  moveIndex("lpgBaltic", 35, 145, 1.5);
  moveIndex("eua", 45, 110, 0.38, 2);
  moveIndex("co2CostIndex", 25, 95, 1.2);
  moveIndex("ciiRisk", 20, 92, 1.1);
  moveIndex("fueleuExposure", 10, 88, 0.9);
  liveFeedState.singaporeQueue = clamp(liveFeedState.congestion + Math.round(wave * 7), 15, 88);
  moveIndex("panamaWait", 8, 90, 1.2);
  moveIndex("suezWatch", 5, 82, 1.1);
  liveFeedState.weatherDisruption = clamp(liveFeedState.weather * 4 + Math.round(wave * 5), 12, 90);
  moveIndex("securityRisk", 6, 86, 1.2);
  moveIndex("coalRoute", 40, 165, 1.8);
  moveIndex("grainFreight", 120, 360, 2.5);
  moveIndex("ironOreCape", 45, 185, 1.7);
  moveIndex("crudeRouteRisk", 30, 150, 1.5);
  moveIndex("chemicalTanker", 55, 175, 1.4);
  moveIndex("projectCargoDemand", 25, 120, 1.2);
  moveIndex("usdIndex", 92, 118, 0.18, 2);
  moveIndex("sofr", 2.4, 6.2, 0.03, 2);

  const dryBulk = liveFeedState.dryBulkStates[Math.abs(now.getSeconds()) % liveFeedState.dryBulkStates.length];
  const lngWatch = liveFeedState.lngStates[Math.floor(now.getSeconds() / 20) % liveFeedState.lngStates.length];
  const security = liveFeedState.securityAreas[Math.floor(now.getSeconds() / 15) % liveFeedState.securityAreas.length];
  const delayLow = 14 + (now.getSeconds() % 8);
  const delayHigh = delayLow + 6;

  setLiveText("vessels", liveFeedState.vessels.toLocaleString("en-US"));
  setLiveText("congestion", `${liveFeedState.congestion}%`);
  setLiveText("bunker", bunkerPriceLabel(liveFeedState.bunker));
  setLiveText("weather", String(liveFeedState.weather));
  setLiveText("pnl", `$${liveFeedState.pnl}K`);
  setLiveText("co2", `${liveFeedState.co2.toLocaleString("en-US")} t`);
  setLiveText("scheduleRisk", liveFeedState.congestion > 55 ? "High" : liveFeedState.congestion > 35 ? "Medium" : "Low");
  setLiveText("containerIndex", liveFeedState.containerIndex.toLocaleString("en-US"));
  setLiveText("dryBulk", dryBulk);
  setLiveText("lngWatch", lngWatch);
  setLiveText("security", security);

  setLiveNote("vessels", `simulated AIS delta · ${now.toLocaleTimeString()}`);
  setLiveNote("congestion", liveFeedState.congestion > 55 ? "Singapore high queue" : "Singapore watch");
  setLiveNote("bunker", bunkerSourceNote());
  setLiveNote("weather", liveFeedState.weather > 12 ? "multi-region weather watch" : "Indian Ocean watch");
  setLiveNote("weatherRouting", `Bay of Bengal squall line · reroute advised in ${4 + (now.getSeconds() % 5)}h`);
  setLiveNote("anchorageDelay", `Singapore anchorage delay estimated ${delayLow}-${delayHigh}h`);
  setLiveNote("bunkerSpread", bunkerSpreadNote());
  setLiveNote("containerIndex", `Asia-Europe spot rate ${wave >= 0 ? "+" : "-"}${Math.abs(wave * 4.8).toFixed(1)}%`);
  setLiveNote("dryBulk", dryBulk === "Bullish" ? "Pacific grain demand rising" : "tonnage balance shifting");
  setLiveNote("lngWatch", `${lngWatch} terminal queue pressure`);
  setLiveNote("security", security === "GoA" ? "Enhanced watch recommended" : "route watch recommended");

  const timestamp = document.querySelector("#liveTimestamp");
  if (timestamp) timestamp.textContent = `Live board · bunker verified ${verifiedBunkerSnapshot.checkedAt}; AIS/weather/port signals are demo · last update ${now.toLocaleTimeString()}`;
  renderOpsWorkspace();
  renderCommandDeck(selectedCommandScenarioId);
  renderPortCostRisk();
  renderDailyBrief();
  renderNotifications();
  renderDataSources();
  renderDataTrustLayer();
  renderBalticFeedPanel();
  renderMarketBrief();
  renderTerminalAlarms();
  if (document.body.dataset.activePage === "market") {
    renderMarketIndexes();
  }
  if (document.body.dataset.activePage === "edge") {
    renderMarketConfidence();
    renderEdgeAlarms();
  }
  if (document.body.dataset.activePage === "brokerOS") {
    renderOsRiskRadar();
    renderOsExportCenter();
  }
  if (document.body.dataset.activePage === "decisionLab") {
    renderPortHeatmap();
    renderDecisionHeader();
  }
}

function getReadinessState() {
  try {
    return JSON.parse(localStorage.getItem("focusea-readiness-v1")) || {};
  } catch {
    return {};
  }
}

function saveReadinessState(state) {
  try {
    localStorage.setItem("focusea-readiness-v1", JSON.stringify(state));
  } catch {
    // Local storage can be unavailable in restricted browser modes.
  }
}

function getReadinessScore() {
  if (!readinessChecklist) return 0;
  const boxes = [...readinessChecklist.querySelectorAll("[data-readiness]")];
  if (!boxes.length) return 0;
  const checked = boxes.filter((box) => box.checked).length;
  return Math.round((checked / boxes.length) * 100);
}

function renderReadiness() {
  if (!readinessChecklist || !readinessScore || !readinessBar) return 0;
  const scoreValue = getReadinessScore();
  readinessScore.textContent = `${scoreValue}% ready`;
  readinessBar.style.width = `${scoreValue}%`;
  return scoreValue;
}

function buildSmartSearchIndex() {
  const vesselItems = Object.entries(vessels).map(([id, vessel]) => ({
    type: "Vessel",
    title: vessel.name,
    detail: `${vessel.imo} · ${vessel.flag} · ${vessel.destination} · ${vessel.cargo}`,
    action: "vessel",
    id
  }));

  const portItems = Object.entries(ports).map(([id, port]) => ({
    type: "Port",
    title: port.name,
    detail: `${port.country} · ${port.type} · ${port.depth} · ${port.productivity}`,
    action: "port",
    id
  }));

  const wikiItems = Object.entries(wikiTerms).map(([id, entry]) => ({
    type: "Wiki",
    title: entry.title,
    detail: entry.body,
    action: "wiki",
    id
  }));

  const calculatorItems = Object.keys(calculators).map((id) => ({
    type: "Calculator",
    title: id.toUpperCase(),
    detail: `${id.toUpperCase()} hesaplayıcısını aç ve değerleri gir.`,
    action: "calculator",
    id
  }));

  const cargoItems = Object.entries(cargoProfiles).map(([id, cargo]) => ({
    type: "Cargo",
    title: cargo.label,
    detail: `${cargo.vessel} · base ${money(cargo.baseFreight, 2)}/${cargo.unit} · risk ${cargo.risk}/100`,
    action: "brokerPro",
    id
  }));

  const proItems = [
    { type: "Broker Pro", title: "Negotiation Simulator", detail: "Owner offer ve charterer counter ile fixture spread hesapla.", action: "brokerPro", id: "negotiation" },
    { type: "Broker Pro", title: "Clause Analyzer", detail: "Charter party clause riskini owner/charterer tarafına ayır.", action: "brokerPro", id: "clause" },
    { type: "Broker Pro", title: "Cargo Matching Board", detail: "Yük tipine göre uygun gemi ve uyum skoru bul.", action: "brokerPro", id: "matching" }
  ];

  const opsItems = [
    ["Offer Tracker", "Owner offer, charterer counter, laycan and subject status."],
    ["Cargo Rate Matrix", "Low, mid and high cargo-aware freight bands."],
    ["Sensitivity Table", "Freight, speed and bunker impact on TCE."],
    ["Bunker ROB Planner", "Starting ROB, stem, consumption and arrival ROB."],
    ["Port Restriction Checker", "Draft, LOA, beam and cargo restriction check."],
    ["Sanctions Compliance", "OFAC/EU/UN style commercial checklist."],
    ["EU ETS CO2", "CO2 and ETS cost estimate."],
    ["CP Template Builder", "GENCON, NYPE and Shellvoyage recap draft."],
    ["Broker CRM", "Company, contact and follow-up tracker."],
    ["Daily Broker Brief", "Open offers, bunker, congestion and action list."],
    ["Email Generator", "Firm offer, counter, recap and subjects lifted emails."],
    ["Document Vault", "Recap, CP, SOF, NOR, LOI and invoice tracker."],
    ["SOF Analyzer", "Statement of Facts event extraction."],
    ["Dispute Risk Score", "Demurrage claim and dispute risk."],
    ["Cargo Compatibility", "Vessel and cargo compatibility checklist."]
  ].map(([title, detail]) => ({ type: "Broker Ops", title, detail, action: "brokerOps", id: title }));

  return [...vesselItems, ...portItems, ...wikiItems, ...calculatorItems, ...cargoItems, ...proItems, ...opsItems];
}

function renderSmartSearch(query = "") {
  if (!smartSearchResults) return;
  const normalized = query.trim().toLowerCase();
  const results = buildSmartSearchIndex()
    .filter((item) => !normalized || `${item.type} ${item.title} ${item.detail}`.toLowerCase().includes(normalized))
    .slice(0, 6);

  smartSearchResults.innerHTML = results.map((item) => `
    <button class="smart-result" type="button" data-smart-action="${item.action}" data-smart-id="${item.id}">
      <span>${item.type}</span>
      <strong>${item.title}</strong>
      <small>${item.detail}</small>
    </button>
  `).join("") || `<div class="smart-result"><span>No result</span><strong>Sonuç yok</strong><small>Başka bir gemi, liman, terim veya hesaplayıcı ara.</small></div>`;
}

function applySmartResult(action, id) {
  if (action === "port") {
    setPort(id);
    document.querySelector("#ports")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (action === "vessel") {
    setVessel(id);
    document.querySelector("#smartOps")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (action === "wiki") {
    if (wikiSearch) wikiSearch.value = id;
    const entry = wikiTerms[id];
    if (entry && wikiResult) wikiResult.innerHTML = `<strong>${entry.title}</strong><p>${entry.body}</p>`;
    document.querySelector("#vesselFinder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (action === "calculator") {
    renderCalculator(id);
    document.querySelectorAll(".tabs button").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.calc === id);
    });
    document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (action === "brokerPro") {
    document.querySelector("#brokerPro")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (action === "brokerOps") {
    document.querySelector("#brokerOps")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  renderOpsWorkspace();
}

function calculateOpsRisk(readiness) {
  const vessel = vessels[selectedVesselId];
  const port = ports[selectedPortId];
  let risk = 100 - readiness;
  if (vessel?.risk && vessel.risk.toLowerCase() !== "low") risk += 12;
  if ((port?.risks || []).length >= 3) risk += 8;
  if (liveFeedState.congestion > 50) risk += 10;
  if (liveFeedState.weather > 11) risk += 8;
  risk = clamp(risk, 0, 100);

  if (risk >= 62) return { level: "High Risk", score: risk, next: "Weather, port documents and bunker plan must be closed before sailing." };
  if (risk >= 36) return { level: "Medium Risk", score: risk, next: "Complete remaining checklist items and re-check ETA window." };
  return { level: "Ready / Low Risk", score: risk, next: "Voyage is operationally ready; monitor live feed and news." };
}

function renderOpsWorkspace() {
  if (!opsReport || !opsRiskLevel) return;
  const readiness = renderReadiness();
  const risk = calculateOpsRisk(readiness);
  const vessel = vessels[selectedVesselId];
  const port = ports[selectedPortId];
  const totalCost = port ? Object.values(port.costs).reduce((sum, value) => sum + value, 0) : 0;

  opsRiskLevel.textContent = `${risk.level} · ${risk.score}/100`;
  opsReport.innerHTML = `
    <div><span>Selected vessel</span><strong>${vessel?.name || "No vessel"} · ${vessel?.destination || "No destination"}</strong></div>
    <div><span>Selected port</span><strong>${port?.name || "No port"} · ${port?.productivity || "No productivity"}</strong></div>
    <div><span>Estimated port cost</span><strong>$${totalCost.toLocaleString("en-US")}</strong></div>
    <div><span>Next best action</span><strong>${risk.next}</strong></div>
  `;
}

function buildOpsReportText() {
  const readiness = getReadinessScore();
  const risk = calculateOpsRisk(readiness);
  const vessel = vessels[selectedVesselId];
  const port = ports[selectedPortId];
  const checklist = [...(readinessChecklist?.querySelectorAll("[data-readiness]") || [])]
    .map((box) => `${box.checked ? "[x]" : "[ ]"} ${box.parentElement.textContent.trim()}`)
    .join("\n");

  return [
    "FOCUSEA SMART OPS REPORT",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    `Vessel: ${vessel?.name} · IMO ${vessel?.imo} · ${vessel?.cargo}`,
    `Port: ${port?.name} · ${port?.country} · ${port?.type}`,
    `Port cost estimate: $${Object.values(port?.costs || {}).reduce((sum, value) => sum + value, 0).toLocaleString("en-US")}`,
    `Readiness: ${readiness}%`,
    `Risk: ${risk.level} (${risk.score}/100)`,
    `Next action: ${risk.next}`,
    "",
    "Checklist",
    checklist
  ].join("\n");
}

function initializeSmartOps() {
  if (readinessChecklist) {
    const state = getReadinessState();
    readinessChecklist.querySelectorAll("[data-readiness]").forEach((box) => {
      box.checked = Boolean(state[box.dataset.readiness]);
    });
  }
  renderSmartSearch(smartSearchInput?.value || "");
  renderOpsWorkspace();
}

function stripHtml(value) {
  const element = document.createElement("div");
  element.innerHTML = value || "";
  return element.textContent.trim();
}

function buildGoogleNewsRssUrl(query) {
  const params = new URLSearchParams({
    q: `${query} when:2d`,
    hl: "en-US",
    gl: "US",
    ceid: "US:en"
  });
  return `https://news.google.com/rss/search?${params.toString()}`;
}

const liveNewsCacheKey = "focusea-live-news-cache-v1";

function newsCacheBust(url) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}_=${Date.now()}`;
}

function normalizeNewsItem(item, sourcePrefix = "") {
  const rawTitle = stripHtml(item.title || "");
  const sourceFromTitle = rawTitle.includes(" - ") ? rawTitle.split(" - ").at(-1) : "";
  const source = item.source || item.author || item.domain || sourceFromTitle || "Live news";
  return {
    title: rawTitle.replace(/\s+-\s+[^-]+$/, ""),
    link: item.link || item.url || "",
    source: sourcePrefix ? `${sourcePrefix} - ${source}` : source,
    date: parseNewsDate(item.pubDate || item.pubdate || item.seendate || item.date)
  };
}

async function fetchNewsXml(query) {
  const feedUrl = buildGoogleNewsRssUrl(query);
  const direct = await fetchWithTimeout(newsCacheBust(feedUrl), 10000);
  if (direct.ok) return direct.text();
  throw new Error(`Direct RSS failed: ${direct.status}`);
}

async function fetchGoogleNewsJson(query) {
  const feedUrl = buildGoogleNewsRssUrl(query);
  const params = new URLSearchParams({ rss_url: feedUrl });
  const url = `https://api.rss2json.com/v1/api.json?${params.toString()}`;
  const response = await fetchWithTimeout(newsCacheBust(url), 10000);
  if (!response.ok) throw new Error(`rss2json failed: ${response.status}`);
  const text = await response.text();
  const parsed = JSON.parse(text);
  if (parsed.status !== "ok" || !Array.isArray(parsed.items) || !parsed.items.length) {
    throw new Error("rss2json returned no live items");
  }
  return JSON.stringify({ sourceType: "rss2json", items: parsed.items });
}

async function fetchNewsWithFallback(query) {
  const feedUrl = buildGoogleNewsRssUrl(query);
  try {
    return await fetchGoogleNewsJson(query);
  } catch (jsonError) {
    try {
      return await fetchNewsXml(query);
    } catch (directError) {
      try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;
        const proxied = await fetchWithTimeout(newsCacheBust(proxyUrl), 10000);
        if (!proxied.ok) throw new Error(`RSS proxy failed: ${proxied.status}`);
        return proxied.text();
      } catch (proxyError) {
        return fetchGdeltNews(query);
      }
    }
  }
}

async function fetchWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

function parseNewsItems(xmlText) {
  if (xmlText.trim().startsWith("{")) {
    const data = JSON.parse(xmlText);
    if (Array.isArray(data.items)) {
      return data.items.slice(0, 9).map((item) => normalizeNewsItem(item, "Google News")).filter((item) => item.title && item.link);
    }
    return (data.articles || []).slice(0, 9).map((item) => ({
      title: item.title,
      link: item.url,
      source: item.domain || item.sourceCountry || item.sourcecountry ? `GDELT · ${item.domain || item.sourceCountry || item.sourcecountry}` : "GDELT",
      date: parseNewsDate(item.seendate)
    })).filter((item) => item.title && item.link);
  }

  const xml = new DOMParser().parseFromString(xmlText, "application/xml");
  const items = [...xml.querySelectorAll("item")].slice(0, 9);
  return items.map((item) => {
    const title = stripHtml(item.querySelector("title")?.textContent || "");
    const link = item.querySelector("link")?.textContent || "";
    const source = item.querySelector("source")?.textContent || title.split(" - ").at(-1) || "Google News";
    const pubDate = item.querySelector("pubDate")?.textContent || "";
    const date = pubDate ? new Date(pubDate) : null;
    return { title, link, source, date };
  }).filter((item) => item.title && item.link);
}

function parseNewsDate(value) {
  if (!value) return null;
  const text = String(value);
  if (/^\d{14}$/.test(text)) {
    const iso = `${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6, 8)}T${text.slice(8, 10)}:${text.slice(10, 12)}:${text.slice(12, 14)}Z`;
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const date = new Date(text.replace(" ", "T"));
  return Number.isNaN(date.getTime()) ? null : date;
}

async function fetchGdeltNews(query) {
  const params = new URLSearchParams({
    query,
    mode: "artlist",
    format: "json",
    maxrecords: "9",
    sort: "datedesc"
  });
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;
  const response = await fetchWithTimeout(newsCacheBust(url), 10000);
  if (!response.ok) throw new Error(`GDELT failed: ${response.status}`);
  const text = await response.text();
  if (!text.trim().startsWith("{")) throw new Error("GDELT rate limited or returned non JSON");
  return text;
}

function getCachedLiveNews() {
  const cached = safeLocalGet(liveNewsCacheKey, null);
  if (!cached || !Array.isArray(cached.items) || !cached.items.length) return null;
  return {
    ...cached,
    items: cached.items.map((item) => ({ ...item, date: parseNewsDate(item.date) }))
  };
}

function setCachedLiveNews(query, items, sourceLabel) {
  safeLocalSet(liveNewsCacheKey, {
    query,
    sourceLabel,
    checkedAt: new Date().toISOString(),
    items: items.map((item) => ({ ...item, date: item.date ? item.date.toISOString() : "" }))
  });
}

function renderNews(items, query, meta = {}) {
  if (!newsGrid || !newsStatus) return;

  if (!items.length) {
    newsGrid.innerHTML = "";
    newsStatus.textContent = "Gerçek haber bulunamadı. Kaynak boş döndü, uydurma haber gösterilmiyor.";
    return;
  }

  newsGrid.innerHTML = items.map((item) => `
    <article class="news-card">
      <span>${escapeHtml(item.source)}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <small>${item.date ? item.date.toLocaleString() : "Date unavailable"}</small>
      <a href="${escapeHtml(safeExternalUrl(item.link))}" target="_blank" rel="noopener noreferrer">Haberi aç</a>
    </article>
  `).join("");

  const baseSourceLabel = meta.sourceLabel || (items.some((item) => item.source?.startsWith("GDELT")) ? "GDELT maritime news" : "Google News RSS");
  const modeLabel = meta.cached ? "son canlı cache" : meta.snapshot ? "verified snapshot" : "live";
  const sourceLabel = `${baseSourceLabel} / ${modeLabel}`;
  newsStatus.textContent = `${sourceLabel} · "${query}" · ${items.length} gerçek haber · son kontrol ${new Date().toLocaleTimeString()}`;
}

async function loadMaritimeNews(query = activeNewsQuery) {
  if (!newsGrid || !newsStatus) return;
  activeNewsQuery = query;
  newsStatus.textContent = `Gerçek haberler çekiliyor: ${query}...`;
  newsGrid.innerHTML = "";

  try {
    const xmlText = await fetchNewsWithFallback(query);
    const items = parseNewsItems(xmlText);
    if (!items.length) throw new Error("Live source returned zero parsed items");
    const sourceLabel = items.some((item) => item.source?.startsWith("GDELT")) ? "GDELT maritime news" : "Google News RSS via rss2json";
    setCachedLiveNews(query, items, sourceLabel);
    renderNews(items, query, { sourceLabel });
  } catch (error) {
    const cached = getCachedLiveNews();
    if (cached) {
      renderNews(cached.items, cached.query || query, { sourceLabel: cached.sourceLabel || "Last live maritime news", cached: true });
      return;
    }
    renderNews(verifiedNewsFallback, "verified maritime snapshot", { sourceLabel: "Verified maritime snapshot", snapshot: true });
    newsStatus.textContent = "Live RSS/API engellendi; uydurma haber yerine doğrulanmış haber snapshot'ı gösteriliyor. Yenile butonu canlı kaynağı tekrar dener.";
  }
}

function renderCalculator(type) {
  const calculator = calculators[type];
  calculatorForm.innerHTML = "";

  calculator.fields.forEach((field) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field";
    if (field.type === "select") {
      wrapper.innerHTML = `
        <label for="${field.id}">${field.label}</label>
        <select id="${field.id}" name="${field.id}">
          ${field.options.map(([value, label]) => `<option value="${value}" ${value === field.value ? "selected" : ""}>${label}</option>`).join("")}
        </select>
      `;
    } else {
      wrapper.innerHTML = `
        <label for="${field.id}">${field.label}</label>
        <input id="${field.id}" name="${field.id}" type="number" min="0" step="0.1" value="${field.value}" />
      `;
    }
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
    return "Laytime, yükleme veya tahliye için charter party içinde tanımlanan izinli süredir. Kullanılan süre izinli süreyi aşarsa demurrage doğar.";
  }

  if (normalized.includes("dispatch") || normalized.includes("despatch")) {
    return "Dispatch, laytime erken tamamlandığında charterer lehine oluşan tasarruf bedelidir. Formül: saved hours / 24 × dispatch daily rate.";
  }

  if (normalized.includes("tce")) {
    return "TCE hesabı: gross freight - brokerage - bunker - port/canal costs. Sonuç voyage days'e bölünür ve geminin günlük ticari kazancı görülür.";
  }

  if (normalized.includes("fixture") || normalized.includes("recap")) {
    return "Fixture recap içinde vessel, cargo, load/discharge port, laycan, freight rate, demurrage/dispatch, commission ve kritik clauses net yazılmalıdır.";
  }

  if (normalized.includes("cargo") || normalized.includes("yük") || normalized.includes("kömür") || normalized.includes("komur") || normalized.includes("container") || normalized.includes("konteyner") || normalized.includes("lng")) {
    return "Yük tipi freight'i doğrudan değiştirir: konteyner genelde TEU/slot mantığıyla, kömür ve tahıl mt bazında, crude/LNG daha yüksek risk ve demurrage çarpanıyla fiyatlanır. Focusea'daki cargo selector rate, port cost, bunker etkisi ve risk skorunu otomatik değiştirir.";
  }

  if (normalized.includes("broker")) {
    return "Bir broker çoğunlukla tonnage/cargo eşleştirir, freight pazarlığı yapar, fixture recap hazırlar, market haberini izler ve TCE/voyage estimate kontrol eder.";
  }

  if (normalized.includes("voyage estimate") || normalized.includes("p&l") || normalized.includes("profit")) {
    return "Voyage estimate için freight gelirinden brokerage, bunker, liman, kanal ve hire maliyetleri düşülür. TCE ile günlük performans, net P&L ile sefer kârlılığı okunur.";
  }

  if (normalized.includes("colreg")) {
    return "COLREGS denizde çatışmayı önleme kurallarıdır. Karşılıklı gelişte genellikle iki gemi de sancağa net ve erken manevra yapar.";
  }

  if (normalized.includes("eta")) {
    return "ETA için temel formül: mesafe / hız. Akıntı, hava, liman beklemesi ve kanal geçişleri ayrıca eklenmelidir.";
  }

  if (normalized.includes("bunker") || normalized.includes("yakıt")) {
    return "Bunker hesabı için günlük tüketim, seyir günü, liman tüketimi ve ton fiyatı çarpılır. Emniyet stoku ayrıca bırakılır.";
  }

  if (normalized.includes("charter")) {
    return "Charter party; navlun, laytime, demurrage, yükleme/tahliye limanları ve taraf sorumluluklarını belirleyen ana sözleşmedir.";
  }

  if (normalized.includes("cv")) {
    return "CV için en güçlü yapı: rank, certificates, sea service, vessel types, duties, software/tools, references. Focusea CV Builder bu alanları profesyonel summary haline getirebilir.";
  }

  if (normalized.includes("risk") || normalized.includes("rota")) {
    return "Rota riski için hava, korsan bölgesi, kanal geçişi, bunker alternatifi, liman yoğunluğu ve ETA buffer birlikte değerlendirilmelidir.";
  }

  return "Focusea asistanı şu an prototip modunda. Laytime, demurrage, COLREGS, ETA, bunker veya charter başlıklarından biriyle sorarsan daha net cevap veririm.";
}

function runAiAction(action, cargo = "Istanbul to Singapore container voyage", value = 18) {
  const numericValue = Number(value) || 0;
  const responses = {
    laytime: {
      title: "Laytime Analysis",
      body: `Input: ${cargo}. Used time ${numericValue}h. If allowed laytime is 24h, remaining time is ${Math.max(24 - numericValue, 0)}h. If exceeded, demurrage starts from the excess period.`
    },
    fixture: {
      title: "Fixture Recap Draft",
      body: `${cargo}: recap'e vessel/cargo, load-discharge ports, laycan, freight rate, demurrage, dispatch, brokerage, NOR, laytime terms and subjects eklenmeli. Open points: port costs, weather exceptions and cancellation clause.`
    },
    tce: {
      title: "TCE Commercial Read",
      body: `${cargo}: freight gelirinden brokerage, bunker, port/canal costs düş. Kalan net revenue'yu voyage days'e böl. Target daily hire ${money(numericValue * 1000)}/day ise TCE bunun üstünde kalmalı.`
    },
    route: {
      title: "Route Risk Brief",
      body: `${cargo}: weather risk medium, port congestion medium-high, piracy low unless route passes GoA. Add 8-12h ETA buffer and compare bunker at Singapore vs Fujairah.`
    },
    clause: {
      title: "Charter Clause Explainer",
      body: `"${cargo}" clause should be checked for who pays waiting time, when NOR is valid, whether weather exceptions stop laytime, and demurrage rate.`
    },
    cv: {
      title: "CV Upgrade",
      body: `Rewrite suggestion: "Motivated maritime professional with STCW certification, ${cargo} experience, strong bridge/deck operations awareness, and safety-first teamwork mindset."`
    },
    quiz: {
      title: "Mini Quiz",
      body: `Question: A vessel is crossing from starboard. Are you stand-on or give-way? Answer: usually give-way; take early and substantial action.`
    },
    weather: {
      title: "Weather Interpretation",
      body: `${cargo}: if wind rises above ${numericValue} kn, review speed, lashing, rolling risk, ETA buffer and nearest safe port options.`
    }
  };

  const result = responses[action] || responses.route;
  aiResult.innerHTML = `<strong>${result.title}</strong><p>${result.body}</p>`;
  return `${result.title}: ${result.body}`;
}

function analyzeRoute(origin, destination, speed) {
  const baseDistance = origin.toLowerCase().includes("istanbul") && destination.toLowerCase().includes("singapore") ? 5820 : 4200;
  const days = baseDistance / speed / 24;
  const fuel = days * 28;
  const cost = fuel * 620;
  const risk = days > 14 ? "Orta-yüksek" : "Orta";
  return `En kısa rota: ${baseDistance.toLocaleString("en-US")} nm · Tahmini süre: ${days.toFixed(1)} gün · Yakıt: ${fuel.toFixed(0)} t · Maliyet: $${cost.toLocaleString("en-US", { maximumFractionDigits: 0 })} · Risk: ${risk}`;
}

function bindBrokerForm(form, renderer) {
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderer();
  });
  form.addEventListener("input", renderer);
  form.addEventListener("change", renderer);
}

shipButtons.forEach((button) => {
  button.addEventListener("click", () => setVessel(button.dataset.ship));
});

portButtons.forEach((button) => {
  button.addEventListener("click", () => setPort(button.dataset.port || button.dataset.portCard));
});


document.querySelectorAll(".tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tabs button").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderCalculator(button.dataset.calc);
  });
});

calculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  calculatorResult.textContent = calculators[calculatorForm.dataset.calc].calculate(collectFormValues(calculatorForm));
});

bindBrokerForm(fixtureForm, renderFixtureRecap);
bindBrokerForm(voyageEstimateForm, renderBrokerVoyageEstimate);
bindBrokerForm(laytimeStatementForm, renderLaytimeStatement);
bindBrokerForm(negotiationForm, renderNegotiationSimulator);
bindBrokerForm(clauseForm, renderClauseAnalyzer);
bindBrokerForm(laytimeGeneratorForm, renderLaytimeGenerator);
bindBrokerForm(voyageProForm, renderVoyagePro);
bindBrokerForm(cargoMatchForm, renderCargoMatching);
bindBrokerForm(portCostForm, renderPortCostRisk);
bindBrokerForm(offerTrackerForm, renderOfferTracker);
bindBrokerForm(rateMatrixForm, renderRateMatrix);
bindBrokerForm(sensitivityForm, renderSensitivity);
bindBrokerForm(robPlannerForm, renderRobPlanner);
bindBrokerForm(restrictionForm, renderRestrictionChecker);
bindBrokerForm(complianceForm, renderComplianceChecklist);
bindBrokerForm(etsForm, renderEtsCalculator);
bindBrokerForm(cpTemplateForm, renderCpTemplate);
bindBrokerForm(crmForm, renderCrmCard);
bindBrokerForm(dailyBriefForm, renderDailyBrief);
bindBrokerForm(emailGeneratorForm, renderEmailGenerator);
bindBrokerForm(documentVaultForm, renderDocumentVault);
bindBrokerForm(sofAnalyzerForm, renderSofAnalyzer);
bindBrokerForm(disputeRiskForm, renderDisputeRisk);
bindBrokerForm(compatibilityForm, renderCargoCompatibility);
bindBrokerForm(profileForm, renderWorkspaceStatus);
bindBrokerForm(adminForm, applyAdminSettings);
bindBrokerForm(brokerCopilotForm, renderBrokerCopilot);
bindBrokerForm(offerParserForm, renderOfferParser);
bindBrokerForm(tceOptimizerForm, renderTceOptimizer);
bindBrokerForm(riskRadarForm, renderRiskRadar);
bindBrokerForm(redFlagForm, renderRedFlagSystem);
bindBrokerForm(recapBuilderForm, renderRecapBuilder);
bindBrokerForm(evidencePackForm, renderEvidencePack);
bindBrokerForm(companyIntelForm, renderCompanyIntel);
bindBrokerForm(cargoIntelForm, renderCargoIntel);
bindBrokerForm(dealRoomForm, renderDealRoom);
bindBrokerForm(importForm, renderImport);
bindBrokerForm(brokerInboxForm, renderBrokerInbox);
bindBrokerForm(recapCheckerForm, renderRecapChecker);
bindBrokerForm(clauseLibraryForm, renderClauseLibrary);
bindBrokerForm(claimBuilderForm, renderClaimBuilder);
bindBrokerForm(portIntelProForm, renderPortIntelPro);
bindBrokerForm(turkiyePortIntelForm, renderTurkiyePortIntel);
bindBrokerForm(turkiyeSofNorForm, renderTurkiyeSofNor);
bindBrokerForm(turkiyeCostForm, renderTurkiyeCost);
bindBrokerForm(cabotageForm, renderCabotage);
bindBrokerForm(cargoPortSuitabilityForm, renderCargoPortSuitability);
bindBrokerForm(cargoPlaybookForm, renderCargoPlaybook);
bindBrokerForm(tceOptimizer2Form, renderTceOptimizer2);
bindBrokerForm(backendWorkspaceForm, renderBackendWorkspace);
bindBrokerForm(adminProForm, renderAdminPro);
bindBrokerForm(timelineForm, renderTimeline);
bindBrokerForm(fixtureImportProForm, renderFixtureImportPro);
bindBrokerForm(clauseNegotiationForm, renderClauseNegotiation);
bindBrokerForm(profitRadarForm, renderProfitRadar);
bindBrokerForm(documentAiForm, renderDocumentAi);
bindBrokerForm(counterpartyIntelForm, renderCounterpartyIntel);
bindBrokerForm(pricingEngineForm, renderPricingEngine);
bindBrokerForm(emailGeneratorProForm, renderEmailGeneratorPro);
bindBrokerForm(dealComparisonForm, renderDealComparison);
bindBrokerForm(charteringCrmProForm, renderCharteringCrmPro);
bindBrokerForm(claimDisputeCenterForm, renderClaimDisputeCenter);
bindBrokerForm(portAgencyWorkspaceForm, renderPortAgencyWorkspace);
bindBrokerForm(complianceTerminalForm, renderComplianceTerminal);
bindBrokerForm(financeDeskForm, renderFinanceDesk);
bindBrokerForm(documentHubForm, renderDocumentHub);
bindBrokerForm(certificateModeForm, renderCertificateMode);
bindBrokerForm(cargoIntelligenceProForm, renderCargoIntelligencePro);
bindBrokerForm(sustainabilityDeskForm, renderSustainabilityDesk);
bindBrokerForm(clientPortalForm, renderClientPortal);
bindBrokerForm(osDealRoomForm, renderOsDealRoom);
bindBrokerForm(osParserForm, renderOsParser);
bindBrokerForm(osSofEngineForm, renderOsSofEngine);
bindBrokerForm(osKanbanForm, renderOsKanban);
bindBrokerForm(osCounterpartyForm, renderOsCounterparty);
bindBrokerForm(osCargoPlaybookForm, renderOsCargoPlaybook);
bindBrokerForm(osRiskRadarForm, renderOsRiskRadar);
bindBrokerForm(osAdminPanelForm, renderOsAdminPanel);
bindBrokerForm(osClientPortalForm, renderOsClientPortal);
bindBrokerForm(autopilotInboxForm, renderAutopilotInbox);
bindBrokerForm(autopilotDealRoomForm, renderAutopilotDealRoom);
bindBrokerForm(autopilotDocumentPackForm, renderAutopilotDocumentPack);
bindBrokerForm(autopilotVoyageOptimizerForm, renderAutopilotVoyageOptimizer);
bindBrokerForm(autopilotCarbonForm, renderAutopilotCarbon);
bindBrokerForm(autopilotWeatherForm, renderAutopilotWeather);
bindBrokerForm(autopilotPortAgencyForm, renderAutopilotPortAgency);
bindBrokerForm(autopilotCounterpartyForm, renderAutopilotCounterparty);
bindBrokerForm(autopilotClauseBattleForm, renderAutopilotClauseBattle);
bindBrokerForm(autopilotClientPortalForm, renderAutopilotClientPortal);
bindBrokerForm(warRoomForm, renderWarRoom);
bindBrokerForm(comparableFixtureForm, renderComparableFixtures);
bindBrokerForm(timeBarCalendarForm, renderTimeBarCalendar);
bindBrokerForm(cpDiffForm, renderCpDiff);
bindBrokerForm(vesselSuitabilityForm, renderVesselSuitability);
bindBrokerForm(negotiationScoreForm, renderNegotiationScore);
bindBrokerForm(portCallTimelineForm, renderPortCallTimeline);
bindBrokerForm(claimEvidenceForm, renderClaimEvidence);
bindBrokerForm(marketAlertForm, renderMarketAlert);
bindBrokerForm(autoDealProcessorForm, renderAutoDealProcessor);
bindBrokerForm(fixtureDoctorForm, renderFixtureDoctor);
bindBrokerForm(cpBattleForm, renderCpBattle);
bindBrokerForm(timeBarForm, renderTimeBar);
bindBrokerForm(rateMemoryForm, renderRateMemory);
bindBrokerForm(performanceForm, renderPerformance);
bindBrokerForm(emailInboxSimulatorForm, renderEmailInboxSimulator);
bindBrokerForm(recapToCpForm, renderRecapToCp);
bindBrokerForm(whatIfForm, renderWhatIf);
bindBrokerForm(disputeSimulatorForm, renderDisputeSimulator);
bindBrokerForm(watchlistForm, renderWatchlist);
bindBrokerForm(portHeatmapForm, renderPortHeatmap);
bindBrokerForm(brokerExamForm, renderBrokerExam);
bindBrokerForm(workflowGateForm, renderWorkflowGate);
bindBrokerForm(marketMemoryForm, renderMarketMemory);
bindBrokerForm(documentRedTeamForm, renderDocumentRedTeam);
bindBrokerForm(portRealityForm, renderPortReality);
bindBrokerForm(weatherLaytimeForm, renderWeatherLaytime);
bindBrokerForm(carbonDeskForm, renderCarbonDesk);
bindBrokerForm(workflowClientPortalForm, renderWorkflowClientPortal);
bindBrokerForm(negotiationProForm, renderNegotiationPro);
bindBrokerForm(workflowInboxForm, renderWorkflowInbox);
bindBrokerForm(workflowDealRoomForm, renderWorkflowDealRoom);
bindBrokerForm(workflowOcrForm, renderWorkflowOcrLane);
bindBrokerForm(workflowTimeBarForm, renderWorkflowTimeBar);
bindBrokerForm(workflowVettingForm, renderWorkflowVetting);
bindBrokerForm(workflowClauseVersionForm, renderWorkflowClauseVersion);
bindBrokerForm(workflowCounterForm, renderWorkflowCounter);
bindBrokerForm(workflowWhatIfForm, renderWorkflowWhatIf);
bindBrokerForm(workflowSofForm, renderWorkflowSofEngine);
bindBrokerForm(workflowPortalProForm, renderWorkflowPortalPro);
bindBrokerForm(workflowCounterpartyForm, renderWorkflowCounterparty);
bindBrokerForm(workflowAgencyForm, renderWorkflowAgency);
bindBrokerForm(workflowMailStudioForm, renderWorkflowMailStudio);
bindBrokerForm(workflowComparisonForm, renderWorkflowComparison);
bindBrokerForm(saasAccountForm, renderSaasAccount);
bindBrokerForm(saasDocumentForm, renderSaasDocument);
bindBrokerForm(saasAlarmForm, renderSaasAlarm);
bindBrokerForm(saasEmailForm, renderSaasEmail);
bindBrokerForm(saasAdminForm, renderSaasAdmin);
bindBrokerForm(saasMarketSourceForm, renderSaasMarketSource);
bindBrokerForm(saasContractMemoryForm, renderSaasContractMemory);
bindBrokerForm(saasClientPortalForm, renderSaasClientPortal);
bindBrokerForm(aiAutopilotForm, renderAiAutopilot);
bindBrokerForm(aiDealTwinForm, renderAiDealTwin);
bindBrokerForm(aiCopilotForm, renderAiCopilot);
bindBrokerForm(aiRolePortalForm, renderAiRolePortal);
bindBrokerForm(aiDocumentVaultForm, renderAiDocumentVault);
bindBrokerForm(aiClauseBattleForm, renderAiClauseBattle);
bindBrokerForm(aiFixtureSimulatorForm, renderAiFixtureSimulator);
bindBrokerForm(proOpsInboxForm, renderProOpsInbox);
bindBrokerForm(proOpsAskForm, renderProOpsAsk);
bindBrokerForm(proOpsOcrForm, renderProOpsOcr);
bindBrokerForm(proOpsPortForm, renderProOpsPort);
bindBrokerForm(proOpsClaimForm, renderProOpsClaim);
bindBrokerForm(proOpsMarketAlarmForm, renderProOpsMarketAlarm);
bindBrokerForm(proOpsLoadicatorForm, renderProOpsLoadicator);
bindBrokerForm(proOpsClientForm, renderProOpsClient);
bindBrokerForm(superSuiteForm, renderSuperSuite);

if (offerTrackerForm) {
  offerTrackerForm.addEventListener("input", renderKanbanBoard);
  offerTrackerForm.addEventListener("change", renderKanbanBoard);
}

if (disputeRiskForm) {
  disputeRiskForm.addEventListener("input", renderNotifications);
  disputeRiskForm.addEventListener("change", renderNotifications);
}

if (saveWorkspace) saveWorkspace.addEventListener("click", saveWorkspaceState);
if (loadWorkspace) loadWorkspace.addEventListener("click", loadWorkspaceState);
if (clearWorkspace) clearWorkspace.addEventListener("click", clearWorkspaceState);
if (pushImportToInbox) pushImportToInbox.addEventListener("click", pushImportedOfferToInbox);
if (refreshTerminalAlarms) refreshTerminalAlarms.addEventListener("click", renderTerminalAlarms);
if (pushFixtureProToInbox) pushFixtureProToInbox.addEventListener("click", pushFixtureImportProToInbox);
if (refreshMarketConfidence) refreshMarketConfidence.addEventListener("click", renderMarketConfidence);
if (refreshEdgeAlarms) refreshEdgeAlarms.addEventListener("click", renderEdgeAlarms);
if (refreshDailyBriefPro) refreshDailyBriefPro.addEventListener("click", renderDailyBriefPro);
if (runBrokerOs) runBrokerOs.addEventListener("click", runAllBrokerOs);
if (osPushParserToKanban) osPushParserToKanban.addEventListener("click", pushOsParserToKanban);
if (runAutopilot) runAutopilot.addEventListener("click", runAllAutopilot);
if (autopilotPushInbox) autopilotPushInbox.addEventListener("click", pushAutopilotInboxToDesk);
if (runDealIq) runDealIq.addEventListener("click", runAllDealIq);
if (addComparableFixture) addComparableFixture.addEventListener("click", addComparableFixtureEntry);
if (runDecisionLab) runDecisionLab.addEventListener("click", runFullDecisionLab);
if (applyAutoDealToTracker) applyAutoDealToTracker.addEventListener("click", applyAutoDealToOfferTracker);
if (addRateMemory) addRateMemory.addEventListener("click", addRateMemoryEntry);
if (pushSimulatedEmail) pushSimulatedEmail.addEventListener("click", pushSimulatedEmailToInbox);
if (addWatchlistCompany) addWatchlistCompany.addEventListener("click", addWatchlistEntry);
if (runSuperSuite) runSuperSuite.addEventListener("click", renderAllSuperSuite);
if (saveMarketMemory) saveMarketMemory.addEventListener("click", addMarketMemoryEntry);
if (clearMarketMemory) {
  clearMarketMemory.addEventListener("click", () => {
    setMarketMemory([]);
    renderMarketMemory();
    renderWorkflowConfidence();
  });
}
if (saveWorkflowInbox) saveWorkflowInbox.addEventListener("click", saveWorkflowInboxEntry);
if (clearWorkflowInbox) clearWorkflowInbox.addEventListener("click", clearWorkflowInboxEntries);
if (refreshWorkflowMission) refreshWorkflowMission.addEventListener("click", renderWorkflowMission);
if (saveWorkflowCommunity) saveWorkflowCommunity.addEventListener("click", addWorkflowCommunityNote);
if (clearWorkflowCommunity) clearWorkflowCommunity.addEventListener("click", clearWorkflowCommunityNotes);
if (saveWorkflowReport) saveWorkflowReport.addEventListener("click", saveWorkflowReportSnapshot);
if (clearWorkflowReports) clearWorkflowReports.addEventListener("click", clearWorkflowReportHistory);
document.querySelectorAll("[data-download-workflow-pro]").forEach((button) => {
  button.addEventListener("click", () => handleWorkflowProDownload(button.dataset.downloadWorkflowPro));
});
if (runSaasCore) runSaasCore.addEventListener("click", renderAllSaasCore);
if (clearSaasWorkspace) clearSaasWorkspace.addEventListener("click", clearSaasWorkspaceState);
if (refreshSaasDealRoom) refreshSaasDealRoom.addEventListener("click", renderSaasDealRoom);
if (refreshSaasAnalytics) refreshSaasAnalytics.addEventListener("click", renderSaasAnalytics);
if (saveSaasContract) saveSaasContract.addEventListener("click", saveSaasContractMemory);
if (clearSaasContracts) clearSaasContracts.addEventListener("click", clearSaasContractMemory);
document.querySelectorAll("[data-download-saas]").forEach((button) => {
  button.addEventListener("click", () => handleSaasDownload(button.dataset.downloadSaas));
});
if (runAiCore) {
  runAiCore.addEventListener("click", () => {
    renderAllAiCore();
    pushAiAuditEvent("AI Core run", "All AI modules refreshed.");
    renderAiAudit();
  });
}
if (addAiAuditEvent) addAiAuditEvent.addEventListener("click", addAiAuditEventFromButton);
if (clearAiAudit) clearAiAudit.addEventListener("click", clearAiAuditTrail);
if (saveAiVaultDoc) saveAiVaultDoc.addEventListener("click", saveAiVaultDocument);
if (clearAiVault) clearAiVault.addEventListener("click", clearAiVaultDocuments);
if (toggleAiPresentation) toggleAiPresentation.addEventListener("click", toggleAiPresentationMode);
document.querySelectorAll("[data-download-ai]").forEach((button) => {
  button.addEventListener("click", () => handleAiDownload(button.dataset.downloadAi));
});
if (runProOps) {
  runProOps.addEventListener("click", () => {
    renderAllProOps();
    pushProOpsAudit("Pro Ops run", "All Pro Ops modules refreshed.");
    renderProOpsDealRoom();
  });
}
if (saveProOpsOffer) saveProOpsOffer.addEventListener("click", saveProOpsOfferToInbox);
if (clearProOpsMemory) clearProOpsMemory.addEventListener("click", clearProOpsState);
if (refreshProOpsDealRoom) refreshProOpsDealRoom.addEventListener("click", renderProOpsDealRoom);
document.querySelectorAll("[data-download-proops]").forEach((button) => {
  button.addEventListener("click", () => handleProOpsDownload(button.dataset.downloadProops));
});
if (superTerminalNoteForm) superTerminalNoteForm.addEventListener("submit", addSuperTerminalNote);
if (clearSuperNotes) {
  clearSuperNotes.addEventListener("click", () => {
    setSuperNotes([]);
    renderSuperTerminalNotes();
  });
}
bindBrokerOsDownloadButtons();

theaterScenarioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderCommandTheater(button.dataset.theaterScenario);
  });
});

pageNavLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    activatePage(link.dataset.pageLink);
  });
});

window.addEventListener("popstate", () => activatePage(pageFromHash(), false));

document.querySelectorAll("[data-export-report]").forEach((button) => {
  button.addEventListener("click", () => exportReport(button.dataset.exportReport));
});

document.querySelectorAll("[data-download-terminal]").forEach((button) => {
  button.addEventListener("click", () => handleTerminalDownload(button.dataset.downloadTerminal));
});

document.querySelectorAll("[data-download-edge]").forEach((button) => {
  button.addEventListener("click", () => handleEdgeDownload(button.dataset.downloadEdge));
});

document.querySelectorAll("[data-download-commercial]").forEach((button) => {
  button.addEventListener("click", () => handleCommercialDownload(button.dataset.downloadCommercial));
});

document.querySelectorAll("[data-download-autopilot]").forEach((button) => {
  button.addEventListener("click", () => handleAutopilotDownload(button.dataset.downloadAutopilot));
});

document.querySelectorAll("[data-download-deal-iq]").forEach((button) => {
  button.addEventListener("click", () => handleDealIqDownload(button.dataset.downloadDealIq));
});

document.addEventListener("click", (event) => {
  if (event.defaultPrevented) return;
  const button = event.target.closest("[data-download-os]");
  if (!button) return;
  handleBrokerOsDownload(button.dataset.downloadOs);
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-download-lab]");
  if (!button) return;
  handleDecisionLabDownload(button.dataset.downloadLab);
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-download-super]");
  if (!button) return;
  handleSuperDownload(button.dataset.downloadSuper);
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-download-theater]");
  if (!button) return;
  handleTheaterDownload(button.dataset.downloadTheater);
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-download-workflow]");
  if (!button) return;
  handleWorkflowDownload(button.dataset.downloadWorkflow);
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-super-filter]");
  if (!button) return;
  renderSuperFeatureGrid(button.dataset.superFilter || "All");
});

const pythonEngineForm = document.querySelector("#pythonEngineForm");
const pythonEngineJob = document.querySelector("#pythonEngineJob");

if (pythonEngineForm) {
  pythonEngineForm.addEventListener("submit", runPythonEngine);
}

if (pythonEngineJob) {
  pythonEngineJob.addEventListener("change", updatePythonSample);
}

document.querySelectorAll("[data-download-python]").forEach((button) => {
  button.addEventListener("click", () => handlePythonDownload(button.dataset.downloadPython));
});

if (databaseForm) {
  databaseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = collectFormValues(databaseForm);
    if (values.newCompany) {
      focuseaDb.companies.push({ name: values.newCompany, type: values.newCompanyType });
      safeLocalSet("focusea-workspace-v2", workspaceForms());
    }
    renderDatabase();
    renderAnalytics();
  });
}

if (refreshDataSources) refreshDataSources.addEventListener("click", renderDataSources);
if (refreshMarketBrief) refreshMarketBrief.addEventListener("click", renderMarketBrief);

commandScenarioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderCommandDeck(button.dataset.commandScenario);
  });
});

if (downloadCommandDeckReport) {
  downloadCommandDeckReport.addEventListener("click", () => {
    if (!lastCommandDeckReport) renderCommandDeck(selectedCommandScenarioId);
    downloadPdfFile("focusea-command-deck-report.pdf", "Focusea Command Deck Report", lastCommandDeckReport);
  });
}

commandPresentationButtons.forEach((button) => {
  button.addEventListener("click", startCommandDeckPresentation);
});

if (marketIndexForm) {
  marketIndexForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderMarketIndexes();
  });
  marketIndexForm.addEventListener("input", () => renderMarketIndexes());
  marketIndexForm.addEventListener("change", () => renderMarketIndexes());
}

if (balticFeedForm) {
  balticFeedForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = collectFormValues(balticFeedForm);
    setBalticEndpoint(values.feedMode === "licensed" ? values.feedUrl : "");
    refreshBalticLicensedFeed();
  });
}

if (securityScanForm) {
  securityScanForm.addEventListener("submit", handleSecurityScan);
}

document.addEventListener("click", handleSafeLinkClick);

const handleMarketIndexSelect = (event) => {
  const button = event.target.closest("[data-market-index]");
  if (!button) return;
  renderMarketIndexes(button.dataset.marketIndex);
};

if (marketIndexGrid) marketIndexGrid.addEventListener("click", handleMarketIndexSelect);
if (marketIndexDetail) marketIndexDetail.addEventListener("click", handleMarketIndexSelect);

if (applyCopilotToOffer) {
  applyCopilotToOffer.addEventListener("click", () => {
    if (!lastCopilotReport) renderBrokerCopilot();
    const ok = applyParsedOfferToTracker(lastCopilotReport?.parsed);
    if (brokerCopilotResult && ok) brokerCopilotResult.insertAdjacentHTML("beforeend", "<small>Offer Tracker updated from Copilot output.</small>");
  });
}

if (applyParsedOffer) {
  applyParsedOffer.addEventListener("click", () => {
    if (!lastParsedOffer) renderOfferParser();
    const ok = applyParsedOfferToTracker(lastParsedOffer);
    if (offerParserResult && ok) offerParserResult.insertAdjacentHTML("beforeend", "<small>Parsed offer pushed to Offer Tracker.</small>");
  });
}

document.querySelectorAll("[data-download-intel]").forEach((button) => {
  button.addEventListener("click", () => handleIntelDownload(button.dataset.downloadIntel));
});

if (printLaytime) {
  printLaytime.addEventListener("click", () => window.print());
}

if (downloadBrokerMail) {
  downloadBrokerMail.addEventListener("click", () => {
    downloadTextFile("focusea-broker-mail-draft.txt", buildBrokerMailText());
  });
}

if (downloadOpsEmail) {
  downloadOpsEmail.addEventListener("click", () => {
    downloadTextFile("focusea-ops-email.txt", generatedOpsEmailText || buildOpsEmailText());
  });
}

routeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(routeForm);
  const origin = formData.get("origin").trim();
  const destination = formData.get("destination").trim();
  const speed = Number(formData.get("routeSpeed"));
  routeResult.textContent = analyzeRoute(origin, destination, speed || 1);
});

if (aiActions) {
  aiActions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-ai-action]");
    if (!button) return;

    aiActions.querySelectorAll("[data-ai-action]").forEach((actionButton) => actionButton.classList.remove("active"));
    button.classList.add("active");
    const formData = new FormData(aiMiniForm);
    const answer = runAiAction(button.dataset.aiAction, formData.get("cargo"), formData.get("value"));
    const botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.textContent = answer;
    chatWindow.append(botMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
}

if (aiMiniForm) {
  aiMiniForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(aiMiniForm);
    const activeAction = aiActions.querySelector("[data-ai-action].active")?.dataset.aiAction || "route";
    runAiAction(activeAction, formData.get("cargo"), formData.get("value"));
  });
}

cvForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(cvForm).entries());
  cvPreview.innerHTML = `
    <strong>${data.fullName}</strong>
    <span>${data.rank}</span>
    <span>Certificates: ${data.certificates}</span>
    <span>Sea Service: ${data.seaService}</span>
    <p>Professional maritime CV summary generated by Focusea.</p>
  `;
});

downloadCv.addEventListener("click", () => {
  const text = cvPreview.textContent.trim() || "Focusea maritime CV draft";
  downloadTextFile("focusea-cv-draft.txt", text);
});

finderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const imo = new FormData(finderForm).get("imoSearch").trim();
  const vessel = vesselDatabase[imo];

  if (!vessel) {
    finderResult.textContent = "Bu prototip veritabanında gemi bulunamadı. 9387421, 9441186 veya 9734507 deneyebilirsin.";
    return;
  }

  finderResult.innerHTML = `
    <strong>${vessel.name}</strong>
    <span>IMO: ${imo}</span>
    <span>Type: ${vessel.type}</span>
    <span>Built: ${vessel.built}</span>
    <span>LOA: ${vessel.loa}</span>
    <span>Tonnage: ${vessel.tonnage}</span>
    <span>Engine: ${vessel.engine}</span>
    <span>Flag: ${vessel.flag}</span>
  `;
});

wikiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = new FormData(wikiForm).get("wikiSearch").trim().toLowerCase();
  const key = Object.keys(wikiTerms).find((term) => query.includes(term));
  const entry = wikiTerms[key];

  if (!entry) {
    wikiResult.textContent = "Bu terim için kayıt yok. Demurrage, Laytime, INCOTERMS veya Charter Party arayabilirsin.";
    return;
  }

  wikiResult.innerHTML = `<strong>${entry.title}</strong><p>${entry.body}</p>`;
});

if (smartSearchForm) {
  smartSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderSmartSearch(new FormData(smartSearchForm).get("smartSearch"));
  });
}

if (smartSearchInput) {
  smartSearchInput.addEventListener("input", () => {
    renderSmartSearch(smartSearchInput.value);
  });
}

if (smartSearchResults) {
  smartSearchResults.addEventListener("click", (event) => {
    const result = event.target.closest("[data-smart-action]");
    if (!result) return;
    applySmartResult(result.dataset.smartAction, result.dataset.smartId);
  });
}

if (readinessChecklist) {
  readinessChecklist.addEventListener("change", () => {
    const state = {};
    readinessChecklist.querySelectorAll("[data-readiness]").forEach((box) => {
      state[box.dataset.readiness] = box.checked;
    });
    saveReadinessState(state);
    renderOpsWorkspace();
  });
}

if (downloadOpsReport) {
  downloadOpsReport.addEventListener("click", () => {
    downloadTextFile("focusea-smart-ops-report.txt", buildOpsReportText());
  });
}

document.querySelectorAll("[data-lesson]").forEach((button) => {
  button.addEventListener("click", () => renderLesson(button.dataset.lesson));
});

if (lessonDetail) {
  lessonDetail.addEventListener("click", (event) => {
    const quizButton = event.target.closest("[data-mini-quiz]");
    if (quizButton) {
      renderMiniQuiz(quizButton.dataset.miniQuiz);
      return;
    }

    const backButton = event.target.closest("[data-lesson-back]");
    if (backButton) {
      renderLesson(backButton.dataset.lessonBack);
    }
  });

  lessonDetail.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-quiz-form]");
    if (!form) return;
    event.preventDefault();
    checkMiniQuiz(form.dataset.quizForm);
  });
}

document.querySelectorAll("[data-news-query]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-news-query]").forEach((newsButton) => newsButton.classList.remove("active"));
    button.classList.add("active");
    loadMaritimeNews(button.dataset.newsQuery);
  });
});

if (refreshNews) {
  refreshNews.addEventListener("click", () => loadMaritimeNews(activeNewsQuery));
}

if (globalPortSearchForm) {
  globalPortSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderGlobalPortAtlas();
  });
  globalPortSearchForm.addEventListener("input", () => renderGlobalPortAtlas());
  globalPortSearchForm.addEventListener("change", () => renderGlobalPortAtlas());
}

if (globalPortList) {
  globalPortList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-global-port]");
    if (!button) return;
    renderGlobalPortAtlas(button.dataset.globalPort);
  });
}

if (globalPortImportForm) {
  globalPortImportForm.addEventListener("submit", importGlobalPorts);
}

if (officialImportProForm) {
  officialImportProForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderOfficialImportPro(true);
  });
  officialImportProForm.addEventListener("input", () => renderOfficialImportPro(false));
  officialImportProForm.addEventListener("change", () => renderOfficialImportPro(false));
}

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

applyVerifiedBunkerSnapshot();
applyBunkerDefaultsToForms();
loadBalticEndpoint();
populatePortSelects();
setPort("istanbul");
renderGlobalPortAtlas();
renderCalculator("eta");
renderFixtureRecap();
renderBrokerVoyageEstimate();
renderLaytimeStatement();
renderNegotiationSimulator();
renderClauseAnalyzer();
renderLaytimeGenerator();
renderVoyagePro();
renderCargoMatching();
renderPortCostRisk();
renderOfferTracker();
renderRateMatrix();
renderSensitivity();
renderRobPlanner();
renderRestrictionChecker();
renderComplianceChecklist();
renderEtsCalculator();
renderCpTemplate();
renderCrmCard();
renderDailyBrief();
renderEmailGenerator();
renderDocumentVault();
renderSofAnalyzer();
renderDisputeRisk();
renderCargoCompatibility();
renderAllPlatformCore();
renderAllBrokerIntelligence();
renderAllCommandTerminal();
renderAllEdgeSuite();
renderCharteringCrmPro();
renderClaimDisputeCenter();
renderPortAgencyWorkspace();
renderComplianceTerminal();
renderFinanceDesk();
renderDocumentHub();
renderCertificateMode();
renderCargoIntelligencePro();
renderSustainabilityDesk();
renderClientPortal();
runAllBrokerOs();
runFullDecisionLab();
renderCommandTheater();
renderAllWorkflowControl();
renderAllSaasCore();
renderAllAiCore();
renderAllProOps();
renderAllSuperSuite();
renderMarketIndexes();
renderDataTrustLayer();
renderBalticFeedPanel();
renderSecurityShield();
renderPythonHistory();
renderCommandDeck();
initializeSmartOps();
updateLiveFeed();
setupPageSections();
activatePage(pageFromHash(), false);
setInterval(updateLiveFeed, 1000);
setInterval(refreshBalticLicensedFeed, 1000);
refreshBalticLicensedFeed();
loadMaritimeNews();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
