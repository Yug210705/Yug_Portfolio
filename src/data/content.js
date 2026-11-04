export const LINKS = {
  github: "https://github.com/Yug210705",
  linkedin: "https://www.linkedin.com/in/yug-pathak-94b7b225b",
  email: "yugpathak2005@gmail.com",
  resume:
    "/assets/resume.pdf",
};

export const BOOT_LINES = [
  "YUG-BIOS (C) 1999 — MEMORY CHECK: 640K CHILDHOOD .......... OK",
  "DETECTING FIRST COMPUTER .................. [OLD XP LAPTOP]",
  "MOUNTING C:\\MS_PAINT ...................... CAR.DRV LOADED",
  "LOADING QBASIC ............................ 0 AND 1 ...... OK",
  "COMPILING STARS.CPP ....................... TRIANGLE ..... OK",
  "LINKING ARDUINO.SYS ....................... CARDBOARD .... OK",
  "SCHEDULING HACKATHONS ..................... 72H .......... OK",
  "LOADING YUG.EXE ........................... MEMORY FULL .. OK",
  "STARTING YUG.EXE ...",
];

export const MODES = [
  {
    id: "curious",
    label: "I'M CURIOUS",
    sub: "Story mode",
    desc: "Scroll through the machine. Eleven chapters, one cause and effect chain, zero polish on the failures.",
  },
  {
    id: "recruiter",
    label: "I'M A RECRUITER",
    sub: "60-second mode",
    desc: "The facts, the numbers, the projects, the links. Under a minute. No scrolling story.",
  },
  {
    id: "builder",
    label: "I'M A BUILDER",
    sub: "Engineering mode",
    desc: "The lab. Architecture, decisions, what broke and what it taught me — for the systems I run.",
  },
  {
    id: "interview",
    label: "I'M AN INTERVIEWER",
    sub: "Live 3D Video Call",
    desc: "Interactive 3D mock interview with Yug. Ask anything about projects, architecture, tech stack, and story.",
  },
];

export const MEMORY_OBJECTS = [
  {
    id: "laptop",
    lucide: "Laptop",
    file: "MEM_0001.LAP",
    name: "OLD LAPTOP",
    era: "THE WINDOWS XP YEARS",
    art: "laptop",
    memory:
      "My father had a PC and an HP laptop, both running Windows XP. The boot sound is still engraved somewhere in my head. They were the first objects I ever saw that felt like places, not machines.",
    caused: "A place you can live in deserves a map → CH01",
  },
  {
    id: "paint",
    lucide: "Palette",
    file: "MEM_0002.PAI",
    name: "MS PAINT",
    era: "THE WINDOWS XP YEARS",
    art: "paint",
    memory:
      "I designed cars in MS Paint. Badly. Symmetry optional. It was my first CAD software and I didn't know it — I just knew I wanted the machine I drew to exist.",
    caused: "Drawing it wasn't enough. I wanted it to run → CH01",
  },
  {
    id: "games",
    lucide: "Gamepad2",
    file: "MEM_0003.GAM",
    name: "FFX RUNNER · UPHILL FARMER",
    era: "THE FLASH GAME YEARS",
    art: "game",
    memory:
      "FFX Runner and Uphill Farmer. I wasn't just playing — I was interviewing the game. How does it know I crashed? Who decided that? Who wrote the crash?",
    caused: "Somebody wrote the crash. Why not me → CH01",
  },
  {
    id: "qbasic",
    lucide: "Terminal",
    file: "MEM_0004.QBA",
    name: "QBASIC",
    era: "THE 0 AND 1 YEARS",
    art: "qbasic",
    memory:
      "My first conversation with 0 and 1. It answered exactly what I asked — nothing more, nothing less. The hardest honesty lesson I've ever had, at typing speed.",
    caused: "Precision needed a friendlier door → CH01",
  },
  {
    id: "scratch",
    lucide: "Blocks",
    file: "MEM_0005.SCR",
    name: "SCRATCH",
    era: "THE FIRST GAMES",
    art: "scratch",
    memory:
      "Drag blocks, press the green flag, something I imagined starts running. My first shipped games lived here — the syntax-free bridge from player to maker.",
    caused: "Maker felt right. Time for the real syntax → CH01",
  },
  {
    id: "cpp",
    lucide: "Code2",
    file: "MEM_0006.CPP",
    name: "C++ STAR TRIANGLE",
    era: "THE NESTED LOOPS",
    art: "cpp",
    memory:
      "I resented every asterisk of that triangle. Until the day I saw it wasn't about stars — it was loops, patterns, control. Logic hiding inside something pretty.",
    caused: "Patterns got interesting. Exams got serious → CH02",
  },
  {
    id: "arduino",
    lucide: "Cpu",
    file: "MEM_0007.ARD",
    name: "CARDBOARD ROBOT",
    era: "THE SELF-DIRECTED YEARS",
    art: "arduino",
    memory:
      "Cardboard, Arduino, borrowed courage. I used AI to help write the code and felt like a fraud — then like a sign of the times. It moved. I didn't sleep.",
    caused: "If I can build this, what else → CH03",
  },
  {
    id: "aws",
    lucide: "Banknote",
    file: "MEM_0008.AWS",
    name: "THE ₹3,000 BILL",
    era: "THE SELF-DIRECTED YEARS",
    art: "aws",
    memory:
      "Vice captain of the AWS community while barely knowing AWS. My captain said learn the basics — so I did, enthusiastically enough to leave an instance running. Bill: ₹3,000. The cheapest lesson I never wanted: billing alarms on everything, forever.",
    caused: "Cloud is real money. Respect acquired → CH03",
  },
  {
    id: "lnmhacks",
    lucide: "Timer",
    file: "MEM_0009.HACK",
    name: "LNMHACKS 8.0 — 72 HOURS",
    era: "THE HACKATHON YEARS",
    art: "timer",
    memory:
      "72 hours on the clock — and Top 5 among 100+ teams, at the blockchain-themed edition I entered knowing nothing about. Hour 51 is where the real product decisions happen: the ones made by whoever is still awake and still kind to their teammates.",
    caused: "Weekend systems demanded permanent systems → CH09",
  },
  {
    id: "gdg",
    lucide: "Users",
    file: "MEM_0010.GDG",
    name: "GDG ON CAMPUS",
    era: "THE COMMUNITY YEARS",
    art: "gdg",
    photos: [
      "/assets/gdg_on_campus.png",
      "/assets/lnm_hack.png",
      "/assets/gdg_hack.png",
    ],
    photo: "/assets/gdg_on_campus.png",
    memory:
      "Selected as the official Google Developer Groups On Campus Organiser of my university. I went from the back row to running the sessions as Lead — and watching a first-timer ship their first demo does something permanent to you.",
    caused: "Teaching it multiplied knowing it → CH08",
  },
  {
    id: "mittal",
    lucide: "Briefcase",
    file: "MEM_0011.MITT",
    name: "MITTAL ALLIANCE",
    era: "THE CLIENT YEARS",
    art: "mittal",
    memory:
      "Frontend developer intern on real client missions: 3 international clients, 10+ REST APIs in production, route optimization that cut travel distance by 22%. Software was the easy half. The other half is people.",
    caused: "Real users raise the bar → CH09",
  },
  {
    id: "resilience",
    lucide: "ShieldAlert",
    file: "MEM_0012.RSOS",
    name: "RESILIENCE OS",
    era: "THE SYSTEM YEARS",
    art: "resilience",
    photo: "/assets/sap_hackfest_cheque.jpg",
    memory:
      "My command center: an AI-powered supply chain disruption control and simulation platform. The dashboard that had to survive national hackathon judges — and became my SAP HackFest finalist project.",
    caused: "Systems that run you are worth engineering → CH09",
  },
  {
    id: "obs",
    lucide: "Eye",
    file: "MEM_0013.OBS",
    name: "OBS · ORACLE BEFORE SIGNING",
    era: "THE SYSTEM YEARS",
    art: "obs",
    memory:
      "A security console for blockchain transactions: permission-first validation, MetaMask authentication, adversarial checks. I entered blockchain knowing nothing about blockchain — and shipped this while learning.",
    caused: "Awareness is a design problem → CH09",
  },
];

export const CHAPTERS = [
  {
    id: "ch00",
    num: "00",
    label: "CURIOUS CHILD",
    era: "THE WINDOWS XP YEARS",
    lines: ["The first computer I touched", "was not mine."],
    paras: [
      "An old laptop in the house. Windows XP taking its sweet time. I didn't know what an operating system was — I just knew this beige box could open worlds.",
      "So I lived there. I drew cars in MS Paint one wobbly pixel at a time. I played FFX Runner and Uphill Farmer and quietly wondered how a game decides that you crashed.",
    ],
    quote: {
      text: "Why can't I just tell the computer what I want in simple English?",
      by: "me, a kid, to nobody in particular",
    },
    objects: ["laptop", "paint", "games"],
    error: false,
    effect: "Wonder needed a tool. The tool was code →",
  },
  {
    id: "ch01",
    num: "01",
    label: "BEGINNER CODER",
    era: "QBASIC → SCRATCH → C++",
    lines: ["I met 0 and 1", "and logic never left."],
    paras: [
      "QBasic was my first conversation with a machine. It answered exactly what I typed — nothing more, nothing less. Scratch then let me ship my first games without syntax fighting back.",
      "Then C++ arrived and asked me to print star triangles. I obeyed, resentfully.",
    ],
    quote: {
      text: "I thought printing stars was useless.",
      by: "me, before I saw the triangle was loops wearing a costume",
    },
    objects: ["qbasic", "scratch", "cpp"],
    error: false,
    effect: "Patterns got interesting. Exams got serious →",
  },
  {
    id: "ch02",
    num: "02",
    label: "FAILED EXPECTATION",
    era: "THE JEE YEARS",
    lines: ["The approved path failed.", "So I changed the question."],
    paras: [
      "The plan was JEE. The plan was supposed to work. It didn't — and for a while that felt like the end of the story instead of a fork in it.",
      "I stopped asking how do I crack the exam and started asking how do I actually build things. Nobody signed off on that pivot. That was the point.",
    ],
    quote: {
      text: "JEE path failed → I changed the question.",
      by: "the fork everything else grew from",
    },
    objects: [],
    error: true,
    effect: "A new question needed a new kind of classroom →",
  },
  {
    id: "ch03",
    num: "03",
    label: "SELF-DIRECTED BUILDER",
    era: "CARDBOARD & CODE",
    lines: ["If he can make it,", "why can't I?"],
    paras: [
      "I watched someone on the internet build a robot and asked the only question that matters. My version was cardboard, an Arduino, and a lot of optimism. I used AI to help write the code — it felt like cheating, until it felt like the future.",
      "That same stretch of life handed me my first ₹3,000 from tech. Small money. Enormous signal: things I make can be worth something to someone. Then AWS handed me a different ₹3,000 — a bill for a server I forgot was running. Both lessons cost the same. Only one was planned.",
    ],
    quote: {
      text: "If he can make it, why can't I?",
      by: "the question that became a method",
    },
    objects: ["arduino", "aws"],
    error: false,
    effect: "Building alone needed real-world pressure →",
  },
  {
    id: "ch04",
    num: "04",
    label: "INTERN",
    era: "WHAT I DON'T WANT",
    lines: ["Some chapters teach you", "what you want.", "Mine taught me", "what I don't."],
    paras: [
      "Internships are sold as answers. Mine worked better as diagnostics. Codebases, rooms, rhythms of work — I came out of each one with a sharper list of what I refuse to build and how I refuse to build it.",
      "Wrong rooms are still information.",
    ],
    quote: {
      text: "Internships that clarified what I didn't want.",
      by: "an underrated genre of education",
    },
    objects: ["mittal"],
    error: true,
    effect: "Clarity about 'not this' made the right room obvious →",
  },
  {
    id: "ch05",
    num: "05",
    label: "AI EVALUATOR",
    era: "DECCAN AI",
    lines: ["Then I got paid", "to grade the machines."],
    paras: [
      "At Deccan AI I work as an RLHF and SFT AI trainer — judging model outputs for factuality, relevance and instruction-following, and reviewing LLM-generated Python and ML code for correctness.",
      "Close-up time with failure modes changes how you build with the thing. You stop worshipping it and start wielding it.",
    ],
    quote: {
      text: "I stopped asking 'can AI do this?' and started asking 'where does it break?'",
      by: "field notes, Deccan AI",
    },
    objects: [],
    error: false,
    effect: "Knowing where it breaks → knowing how to build with it →",
  },
  {
    id: "ch06",
    num: "06",
    label: "ENGINEER",
    era: "BLOCKCHAIN, BLIND",
    lines: ["I said yes to a build", "I didn't understand yet."],
    paras: [
      "A blockchain project landed in front of me. I had no clue about blockchain. So I learned it the only way I trust: while building — and it became Oracle Before Signing, a transaction security system with its own smart contracts.",
      "I'm not a blockchain developer because of that project. I'm an engineer because of it.",
    ],
    quote: {
      text: "I had no clue about blockchain — so I learned while building.",
      by: "the only study method that has never failed me",
    },
    objects: ["obs"],
    error: false,
    effect: "Shipped it. Next: convince other people to build →",
  },
  {
    id: "ch07",
    num: "07",
    label: "COMMUNITY LEADER",
    era: "GDG ON CAMPUS",
    lines: ["I moved from the back row", "to running the room."],
    paras: [
      "As GDG On Campus Lead, I ran the sessions I used to sit in the back of. Demos, first-timers, the kid who asks the question everyone wanted to ask.",
      "At home the same law held: my brother — third-year AI/ML back then — watched me build, caught the bug, and started building too. One builder, two builders. Building becomes contagious. That is the whole community thesis.",
      "And it took me further than campus: the Rajasthan Global Investor Summit, where I met the Prime Minister, the Chief Minister, and delegates from 33 countries. Networking stopped being a scary word.",
    ],
    quote: {
      text: "If he can make it, why can't I? — became the thing I tell other people.",
      by: "GDG On Campus, every session",
    },
    objects: ["gdg"],
    photo: {
      src: "/assets/gdg_on_campus.png",
      caption: "THE ROOM I NOW RUN — MY CAMPUS, MY PEOPLE",
    },
    error: false,
    effect: "Community gave me a taste for pressure →",
  },
  {
    id: "ch08",
    num: "08",
    label: "HACKATHON BUILDER",
    era: "72 HOURS, REPEAT",
    lines: ["Seventy-two hours.", "No plan B."],
    paras: [
      "LNMHacks taught me what my brain does at hour 51 of 72 — Top 5 among 100+ teams. And at SAP HackFest 26, my team CodeHens emerged as National Finalists with LinqChain (Resilience OS). Hackathons are where my whole story compresses into a weekend.",
    ],
    quote: {
      text: "72 hours is enough to become a slightly different person.",
      by: "verified, multiple times",
    },
    objects: ["lnmhacks"],
    photo: {
      src: "/assets/sap_hackfest_cheque.jpg",
      caption: "SAP HACKFEST 26 · NATIONAL FINALIST · TEAM CODEHENS · CHANDIGARH UNIVERSITY",
    },
    error: false,
    effect: "Weekend systems demanded permanent systems →",
  },
  {
    id: "ch09",
    num: "09",
    label: "SYSTEM BUILDER",
    era: "RESILIENCE OS · OBS · CAMPUS OS",
    lines: ["Then I stopped building projects", "and started building systems."],
    paras: [
      "Resilience OS — an AI-powered supply chain disruption command center. OBS — a security console for blockchain transactions. Campus OS — for the campus I actually live in.",
      "Each one exists because some earlier chapter annoyed me enough. That is my whole product philosophy: no roadmap, just friction I refused to keep living with.",
    ],
    quote: {
      text: "A project ends. A system keeps running.",
      by: "why this chapter has no finish line",
    },
    objects: ["resilience"],
    error: false,
    effect: "Every system points at the same old question →",
  },
];

export const MARQUEE_ITEMS = [
  'PRINT "HELLO"',
  "0 and 1",
  "star triangles",
  "₹3,000 — earned",
  "₹3,000 — burned, lesson kept",
  "72:00:00",
  "cardboard + Arduino",
  "no clue about blockchain",
  "GDG back row → Lead",
  "I kept moving.",
];

export const VOICE_STEPS = [
  { step: "THOUGHT", line: "Decide what this section should actually say. Before any tool." },
  { step: "VOICE", line: "Speak it to Wispr Flow — messy, human, at the speed of thinking." },
  { step: "PROMPT", line: "The spoken paragraph becomes a structured prompt." },
  { step: "GENERATED BUILD", line: "Emergent turns the prompt into code I can actually run." },
  { step: "REFINEMENT", line: "I test it, break it, and speak the fix instead of typing it." },
  { step: "SHIP", line: "Small, honest increments. This site is the log of that loop." },
];

export const STILL_FIGURING = [
  { area: "Distributed systems", note: "Reading the classics. Breaking small clusters so big ones scare me less." },
  { area: "Large-scale AI systems", note: "Evaluation was my front row seat. Scaling the harness is the homework." },
  { area: "Better system design", note: "Every build teaches one pattern. I collect them on purpose now." },
  { area: "Deeper cloud architecture", note: "The ₹3,000 bill was lesson one. There is clearly a lesson two." },
  { area: "Production security", note: "OBS taught me awareness. Hardening it properly is the next stretch." },
];

export const RECRUITER = {
  name: "YUG PATHAK",
  education: "3rd-year B.Tech CSE, Poornima University",
  role: "Aspiring Software Developer",
  stats: [
    { k: "8.88", v: "CGPA" },
    { k: "170+", v: "LEETCODE" },
    { k: "10+", v: "PROD APIS" },
  ],
  highlights: [
    { org: "Deccan AI", what: "RLHF & SFT AI Trainer — judging model outputs up close" },
    { org: "Mittal Alliance", what: "Frontend Developer Intern — 10+ REST APIs, 3 international clients" },
    { org: "GDG On Campus Lead", what: "Official Organiser, Poornima University" },
    { org: "SAP HackFest 26", what: "National Finalist — Team CodeHens demonstrated LinqChain (Resilience OS)" },
    { org: "SCPC–Henkel", what: "National Semifinalist — finals at SP Jain, Mumbai" },
    { org: "LNMHacks 8.0", what: "Top 5 among 100+ teams" },
    { org: "OCI Certified", what: "Oracle Cloud Infrastructure Certified Developer Professional 2025" },
  ],
  projects: ["resilience", "obs", "campus", "finassist", "freight", "pravah", "intervyo"],
};

export const PROJECTS = [
  {
    id: "resilience",
    name: "LINQCHAIN · RESILIENCE OS",
    tag: "SUPPLY CHAIN CONTROL ROOM",
    live: "https://resilience-os.vercel.app/command-center",
    problem:
      "Modern global supply networks collapse under cascading tier-N disruptions. LinqChain (Resilience OS) is an enterprise control room that deterministically simulates systemic disruptions, predicts multi-tier bottlenecks, and computes optimal recovery paths before catastrophic supply failure occurs.",
    architecture:
      "Microservices control architecture. Client interactive UI with dynamic network topology graphs (@xyflow/react) communicates via REST/WebSocket to a high-throughput deterministic simulation engine (FastAPI + Python). A custom AI Adapter interfaces with enterprise LLMs under deterministic bounds. Supply telemetry and multi-tier bills of materials are managed on an enterprise SAP Cloud Application Programming Model (CAP) tier backed by SAP HANA Cloud.",
    arch_diagram: { top: "COMMAND CENTER (NEXT.JS + XYFLOW)", nodes: ["FASTAPI SIMULATION ENGINE", "AI ADAPTER GUARDRAILS", "SAP CAP + HANA CLOUD"] },
    stack: ["Next.js 14", "React", "Zustand", "FastAPI", "Python", "SQLAlchemy", "SAP CAP (Node.js)", "SAP HANA Cloud", "@xyflow/react", "Recharts", "jsPDF", "LLMs"],
    responsibility: "Solo. Architected and developed the platform end to end — engine, data layer, dashboard, AI adapter, PDF reporting.",
    decisions: [
      "Hallucination-protected AI Adapter: the LLM can only recommend pre-calculated feasible recovery options — AI suggests, the deterministic simulation verifies",
      "Enterprise SAP Cloud Application Programming Model (CAP) backend on SAP HANA for secure, scalable supply chain data",
      "Automated PDF report generation so a disruption review outlives the browser session",
    ],
    outcome: [
      "Live at resilience-os.vercel.app/command-center",
      "National Finalist at SAP HackFest 2026 with Team CodeHens",
      "Deterministic resilience verification across multi-tier supplier networks"
    ],
    broke: [
      "SAP HANA / CAP integration pain: authentication, connections and slow queries broke early sprints — enterprise SAP tech does not forgive beginner assumptions",
      "The LLM kept suggesting impossible recovery strategies — until connecting SAP technologies through the adapter forced the hallucination-protected guardrail into existence",
    ],
    learned:
      "AI belongs behind deterministic guardrails. The hallucination-protected adapter did more for trust than any amount of prompt tuning would have.",
  },
  {
    id: "obs",
    name: "OBS · ORACLE BEFORE SIGNING",
    tag: "BLOCKCHAIN TRANSACTION SECURITY",
    live: "https://obs-dev.vercel.app",
    problem:
      "Unsafe blockchain transactions happen when authorization is an afterthought and users blind-sign opaque payloads. OBS validates permission and simulates execution before signing — making 'no' the default and 'yes' a verified decision.",
    architecture:
      "Pre-execution security pipeline built on Monad EVM. When a transaction request is dispatched from MetaMask or any Web3 provider, OBS intercepts and dry-runs the call through an off-chain simulation oracle, evaluates authorization controls against an adversarial pattern analyzer, and executes on-chain validation contracts before final signature prompt.",
    arch_diagram: { top: "WALLET (METAMASK)", nodes: ["SIMULATION ORACLE", "ADVERSARIAL VALIDATION", "SMART CONTRACTS (MONAD)"] },
    stack: ["Monad blockchain", "Solidity", "Hardhat / Foundry", "Smart contracts", "MetaMask", "Ethers.js / Viem", "Web3 Security"],
    responsibility: "Solo. Contract design, adversarial validation logic, and the full Web3 transaction workflow.",
    decisions: [
      "Permission-first: every transaction must prove authorization before it can be signed",
      "Adversarial validation lives in the contract layer, not bolted onto the UI",
      "Default-deny policy preventing drainer signatures and malicious calldata approval",
    ],
    outcome: ["Live at obs-dev.vercel.app", "Reduced unsafe transactions by ~90% across 5+ shipped smart contracts"],
    broke: [
      "MetaMask transaction signing failed in real wallets — demo flows break the moment they leave the sandbox",
      "Smart contract reverts and gas pain on Monad ate iteration after iteration",
      "A transaction slipped past the validation checks — found the hole late, and the contracts got tightened because of it",
    ],
    learned:
      "In blockchain, the safe default is 'no'. Permissions aren't friction — they're the product. This is the chapter where I learned blockchain by building it.",
  },
  {
    id: "campus",
    name: "CAMPUS OS",
    tag: "COLLEGE OPERATING SYSTEM",
    live: "https://campus-os-beta.vercel.app",
    problem:
      "Campus information lived in too many inboxes and notice boards. I wanted one intelligent place for the campus I actually live in — built by someone who reads the notice boards.",
    architecture:
      "Multi-tenant platform with a role-aware API layer and an LLM + RAG assistant on top of campus documents. Client Next.js/React UI connects with Express/Node.js backend, PostgreSQL via Prisma, Redis high-concurrency event registration locks, and pgvector RAG document indexing.",
    arch_diagram: { top: "CAMPUS FEED & PORTAL", nodes: ["NOTICES & RBAC GATEWAY", "POSTGRES + REDIS LOCKS", "LLM + RAG (PGVECTOR) SEARCH"] },
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Prisma", "Redis", "Docker", "JWT RBAC", "LLM + RAG"],
    responsibility: "Solo build, with the GDG community as first users and loudest testers.",
    decisions: [
      "Multi-tenant architecture from day one instead of per-college forks",
      "RAG for document search rather than fine-tuning — campus data changes too fast",
      "JWT-based RBAC so student, organiser and admin views share one codebase",
      "Redis distributed locking for high-volume fest registrations preventing double-allocation",
    ],
    outcome: ["Live beta at campus-os-beta.vercel.app", "LLM + RAG assistant for intelligent document search and campus help", "Piloted with 2,300+ students"],
    broke: [
      "Mass fest registration spike hit PostgreSQL connection pool limits on day one; fixed with PgBouncer connection pooling and Redis queue buffering.",
      "Scanned circulars and irregular PDF formatting broke simple text chunkers, requiring OCR extraction before embedding."
    ],
    learned:
      "Building for people you see every day is the fastest feedback loop that exists. They will tell you. Immediately.",
  },
  {
    id: "finassist",
    name: "FINASSIST · AI FINANCIAL COPILOT",
    tag: "INTELLIGENT WEALTH & ANALYTICS",
    live: "https://github.com/Yug210705/FinAI",
    problem:
      "Retail investors and students struggle to navigate complex financial market data, personal portfolio risk, and macroeconomic signals without costly advisory services.",
    architecture:
      "Three-tiered AI & financial analytics engine. Next.js/React frontend with Recharts visualization communicates with a Python (FastAPI) microservice orchestrating market data ingestion (AlphaVantage, yfinance), statistical risk engines (Sharpe ratio, VaR), and LangChain RAG agent for conversational portfolio analysis.",
    arch_diagram: { top: "FINASSIST DASHBOARD (NEXT.JS + RECHARTS)", nodes: ["FASTAPI MARKET PIPELINE", "TIME-SERIES ML & RISK ENGINE", "LANGCHAIN RAG ADVISORY AGENT"] },
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "Pandas", "NumPy", "Scikit-Learn", "yfinance / AlphaVantage", "LangChain", "Recharts", "Tailwind CSS"],
    responsibility: "Designed financial mathematical models, time-series ETL pipelines, and conversational financial reasoning engine.",
    decisions: [
      "FastAPI computational backend for non-blocking asynchronous market data fetches across multi-asset tickers",
      "Strict hallucination guardrails forcing financial advisory prompts to cite direct source balance sheets and filings",
      "Client-side caching with SWR to minimize external API rate-limit throttling",
    ],
    outcome: [
      "Open source repository on GitHub: Yug210705/FinAI",
      "Real-time portfolio health metrics and automated risk diversification alerts",
      "Multi-asset price forecasting and natural language transaction analysis"
    ],
    broke: [
      "Free-tier financial API rate limits caused data drops during multi-ticker queries; resolved by caching historical closes in Redis and implementing exponential backoff.",
      "Irregular market closure dates broke time-series array alignments; handled with Pandas business day calendar re-indexing."
    ],
    learned:
      "Financial software demands precision over speculation. Clean ETL and mathematical validation matter far more than flashy UI.",
  },
  {
    id: "freight",
    name: "FREIGHT COST PREDICTOR",
    tag: "LOGISTICS ML ENGINE · VOLKSWAGEN",
    live: "https://github.com/Yug210705/Volkswagen",
    problem:
      "Global automotive supply chains face unpredictable shipping rate spikes, dynamic fuel surcharges, and inefficient carrier routing across multi-modal freight networks.",
    architecture:
      "End-to-end Machine Learning logistics platform developed for Volkswagen i.Mobilothon. Raw freight logs, distance metrics, vehicle payload specifications, and historical carrier rates pass through an automated feature-engineering pipeline (haversine distance, toll density, fuel indices). Ensembles of gradient boosted regressors (XGBoost + LightGBM) predict freight tariffs with sub-5% error, feeding into a route cost optimization matrix.",
    arch_diagram: { top: "PREDICTION & ROUTING UI (STREAMLIT / REACT)", nodes: ["DATA CLEANING & FEATURE PIPELINE", "XGBOOST & LIGHTGBM ENSEMBLES", "OPTIMAL ROUTE SELECTION MATRIX"] },
    stack: ["Python", "FastAPI / Streamlit", "Scikit-Learn", "XGBoost", "LightGBM", "Pandas", "NumPy", "Docker", "Geopy / OSRM"],
    responsibility: "Data pre-processing, outlier detection, ML model architecture, hyperparameter optimization, and API service packaging.",
    decisions: [
      "Ensemble model combining XGBoost and LightGBM to capture non-linear fuel rate surges and geographic logistics variations",
      "Domain-engineered spatial features: calculating actual transport corridor bottlenecks rather than simple Euclidean distance",
      "Containerized microservice packaging with Docker for deployment in automotive cloud infrastructures",
    ],
    outcome: [
      "Featured in Volkswagen i.Mobilothon Hackathon submission",
      "Sub-5% Mean Absolute Percentage Error on benchmark cross-country freight rate predictions",
      "Sub-second multi-carrier cost comparison and dynamic route planning"
    ],
    broke: [
      "Massive outliers in historical freight invoices (extreme demurrage fees) skewed initial MSE loss; addressed by switching to Huber Loss and robust IQR scaling.",
      "Overfitting to specific regional transport lanes during initial cross-validation; fixed with stratified k-fold grouping by transport corridor."
    ],
    learned:
      "Domain feature engineering trumps model complexity every single time. Understanding logistics economics made the models truly accurate.",
  },
  {
    id: "pravah",
    name: "PROJECT PRAVAH",
    tag: "PIPELINE TELEMETRY · SIH / OIL INDIA",
    live: "https://github.com/Yug210705/Project-Pravah",
    problem:
      "Crude oil transport pipelines suffer catastrophic leaks, illegal tapping, and structural degradation across thousands of kilometers of remote terrain.",
    architecture:
      "Real-time industrial IoT telemetry and spatial anomaly detection system developed for Smart India Hackathon (Oil India problem statement). IoT sensors (pressure, flow rate, acoustic sensors) stream data over MQTT to an ingestion broker. A Python backend analyzes pressure differential waves to localize leaks in real time, projecting geo-coordinates onto an interactive GIS monitoring map (Leaflet) with automated valve shutoff alerts.",
    arch_diagram: { top: "GIS PIPELINE COMMAND CONSOLE", nodes: ["MQTT TELEMETRY INGESTION BROKER", "PRESSURE DROP ANOMALY DETECTOR", "LEAFLET GEO-TELEMETRY & ALERTS"] },
    stack: ["React", "Python", "Flask / FastAPI", "MQTT / WebSockets", "Leaflet / GeoJSON", "Scikit-Learn", "PostgreSQL / TimescaleDB"],
    responsibility: "Pipeline simulation, telemetry ingestion, mathematical pressure-gradient leak localization, and GIS mapping interface.",
    decisions: [
      "Time-series database schema for high-frequency sensor readings with automated downsampling",
      "Dual-sensor differential comparison to distinguish legitimate pump valve switches from actual pipeline pressure drops",
    ],
    outcome: [
      "Developed for Smart India Hackathon / Oil India use-case",
      "Real-time sub-second leak identification and geographic coordinate pinpointing",
      "Simulated automated failsafe emergency valve isolation"
    ],
    broke: [
      "Sensor noise and transient pressure waves caused false leak triggers; resolved by implementing rolling Kalman filtering and moving average thresholds."
    ],
    learned:
      "High-stakes industrial systems need fail-safe redundancy. Every alert must be mathematically verifiable to prevent costly panic shutdowns.",
  },
  {
    id: "intervyo",
    name: "INTERVYO · AI MOCK INTERVIEWER",
    tag: "MULTIMODAL INTERVIEW COPILOT",
    live: "https://github.com/Yug210705/Intervyo",
    problem:
      "Students lack access to high-quality, objective, technical mock interviews with personalized behavioral and technical critique.",
    architecture:
      "Interactive voice-enabled multimodal interview platform. Browser client streams audio and video via WebRTC/MediaStream. Speech is transcribed and processed by LLM interviewer personas with dynamic follow-up logic. Real-time feedback engine evaluates technical depth, vocabulary, and communication clarity.",
    arch_diagram: { top: "WEBRTC AUDIO / VIDEO STREAM", nodes: ["WHISPER / STT RECOGNITION", "GEMINI / LLM DYNAMIC INTERVIEWER", "PERFORMANCE EVALUATION RUBRIC"] },
    stack: ["Next.js", "React", "TypeScript", "WebRTC / MediaStream API", "Google Gemini API", "FastAPI / Node.js", "Tailwind CSS"],
    responsibility: "Architected real-time interview flow, dynamic question generation, voice synthesis integration, and quantitative feedback rubrics.",
    decisions: [
      "Dynamic follow-up questions adapted to user response depth rather than rigid question trees",
      "Local browser-based speech processing fallbacks to maintain fluid conversational cadence",
    ],
    outcome: [
      "Open source repository on GitHub: Yug210705/Intervyo",
      "Conducted automated mock coding and behavioral interviews with comprehensive end-of-session evaluation reports"
    ],
    broke: [
      "Audio latency lag disrupted conversational turn-taking; solved by streaming chunked responses and optimistic UI feedback."
    ],
    learned:
      "Conversational UI is all about latency and rhythm. Natural pacing is what makes an AI interviewer feel human.",
  },
];

export const WISPR_TIMELINE = ["QBasic", "C++", "Java", "Python", "JavaScript", "AI"];


export const FIELD_ARCHIVES = [
  {
    id: "sap-cheque",
    title: "SAP HackFest 2026: National Finalist Team CodeHens",
    date: "FEBRUARY 2026",
    badge: "SAP HackFest National Finalist",
    category: "Hackathons",
    image: "/assets/sap_hackfest_cheque.jpg",
    location: "Chandigarh University",
    story: "Team CodeHens at SAP HackFest 2026 National Finals at Chandigarh University. We pitched and demonstrated LinqChain (Resilience OS) — our deterministic SAP CAP + HANA Cloud supply chain disruption simulation platform.",
    stats: "National Finalist · Team CodeHens",
  },
  {
    id: "tech-solution-challenge",
    title: "Google Solution Challenge 2026: Keynote Lead",
    date: "2025 – 2026",
    badge: "Technical Speaker & Lead Organizer",
    category: "Leadership",
    image: "/assets/technical_event_solution_challenge.jpg",
    location: "Poornima University Main Auditorium",
    story: "Presenting on stage with mic to over 150 student developers, unveiling Google Solution Challenge 2026 (Build with AI). Walking the audience through Google Cloud architecture, generative AI, and high-impact sustainable software development.",
    stats: "150+ Attendees · Main Stage Keynote · GDG Lead",
  },
  {
    id: "tech-hack-classroom",
    title: "H2S: Let's Hack It — Hands-On Workshop",
    date: "2025",
    badge: "Technical Instructor & Mentor",
    category: "Leadership",
    image: "/assets/technical_event_hack_classroom.jpg",
    location: "Campus Smart Labs & Classrooms",
    story: "Leading an intensive, packed hackathon preparation workshop in front of the digital smart board. Guiding students through git team workflows, containerized architectures, and rapid MVP deployment strategies.",
    stats: "80+ Student Builders · Live Code Demo",
  },
  {
    id: "iqoo-hackathon",
    title: "iQOO Hackathon: Northern Regional Finals",
    date: "2024 – 2025",
    badge: "Regional Finalist",
    category: "Hackathons",
    image: "/assets/iqoo_hackathon_finals.jpg",
    location: "Northern Regional Innovation Hub",
    story: "Competing on the floor at the iQOO Hackathon Northern Regional Finals. Live rapid pitching under the 60-second prototype rubric and defending distributed architectural decisions before industry evaluators.",
    stats: "Northern Regional Finals · Rapid Sprint",
  },
  {
    id: "gcec-sms-stadium",
    title: "GCEC Hackathon: SMS Stadium Arena",
    date: "2024 – 2025",
    badge: "GCEC Hackathon Finalist Team",
    category: "Hackathons",
    image: "/assets/gcec_hackathon_sms_stadium.jpg",
    location: "SMS Stadium Arena, Jaipur",
    story: "Suited up in formals at SMS Stadium for the Global Center for Entrepreneurship and Commerce (GCEC) Hackathon. Designing enterprise software systems and pitching directly to business mentors and venture judges.",
    stats: "SMS Stadium Arena · Finalist Delegation",
  },
  {
    id: "gdg-core-team",
    title: "Google Developer Groups: Core Leadership Team",
    date: "2024 – PRESENT",
    badge: "GDG On Campus Core Team",
    category: "Leadership",
    image: "/assets/gdg_core_team.jpg",
    location: "Poornima University Campus",
    story: "The core organizing team behind Google Developer Groups on Campus. Together we scaled the community from 1,100 to over 2,300 active student developers and orchestrated 15+ hands-on technical workshops, study jams, and hackathons.",
    stats: "Core Organizers · 2,300+ Members · 15+ Events",
  },
  {
    id: "devfest-jaipur-team",
    title: "DevFest Jaipur 2025: Community Partner Delegation",
    date: "JANUARY 2025",
    badge: "Official Community Partner",
    category: "Leadership",
    image: "/assets/devfest_jaipur_team.jpg",
    location: "DevFest Jaipur Main Arena",
    story: "Representing our developer community as an official Community Partner at DevFest Jaipur 2025. Engaging with founders, Google Developer Experts, and tech leads across the country to bring production engineering opportunities to students.",
    stats: "Official Community Partner · DevFest 2025",
  },
  {
    id: "devfest-jaipur-partner",
    title: "DevFest Jaipur 2025: Community Ambassador",
    date: "JANUARY 2025",
    badge: "Community Ambassador",
    category: "Leadership",
    image: "/assets/devfest_jaipur_partner.jpg",
    location: "DevFest Jaipur Gate & Exhibition",
    story: "On ground at DevFest Jaipur representing student builders. Fostering cross-campus collaboration, open source adoption, and developer outreach across Rajasthan.",
    stats: "DevFest Jaipur · Tech Ambassador",
  },
  {
    id: "icscis-2025",
    title: "ICSCIS 2025: International Conference Honor",
    date: "2025",
    badge: "Conference Honor & Paper Presentation",
    category: "Conferences",
    image: "/assets/icscis_2025.jpg",
    location: "Poornima University & International Delegates",
    story: "Receiving honors and academic distinction at the International Conference on Smart Computing and Informatics (ICSCIS 2025). Bridging algorithmic research with practical systems engineering.",
    stats: "ICSCIS 2025 · Research Distinction",
  },
  {
    id: "iit-delhi-hackathon",
    title: "IIT Delhi: Sprint4Good National AI Hackathon",
    date: "2024 – 2025",
    badge: "National Finalist · IIT Delhi",
    category: "Hackathons",
    image: "/assets/iit_delhi_hackathon.jpg",
    location: "IIT Delhi Main Auditorium",
    story: "Hacking live on stage at the Indian Institute of Technology (IIT) Delhi. Sprint4Good AI Hackathon war room with the team, iterating on machine learning models and production prototypes under extreme weekend pressure.",
    stats: "IIT Delhi · Sprint4Good AI Finalist",
  },
  {
    id: "lnm-72h",
    title: "LNMHacks 8.0: Hour 51 of 72",
    date: "NOVEMBER 2024",
    badge: "Top 5 Finalist (100+ Teams)",
    category: "Hackathons",
    image: "/assets/lnm_hack.png",
    location: "LNMIIT Jaipur",
    story: "Building hardware and software through the night with red eyes and endless coffee. Finished in the Top 5 among 100+ teams from across India.",
    stats: "Top 5 · 72 Hours · 100+ Teams",
  },
    {
    id: "gdg-auditorium",
    title: "Running The Room: GDG On Campus",
    date: "AUGUST 2024 – PRESENT",
    badge: "2,300+ Community Members",
    category: "Leadership",
    image: "/assets/gdg_on_campus.png",
    location: "Poornima University Auditorium",
    story: "Addressing hundreds of student developers from the main auditorium stage. Grew our campus tech chapter from 1,100 to over 2,300 active members across 15+ hands-on technical workshops, cloud study jams, and hackathons.",
    stats: "2,300+ Members · 15+ Events · 2,500+ Impacted",
  },
  {
    id: "deccan-ai-dashboard",
    title: "Deccan AI Experts: RLHF & AI Safety Dashboard",
    date: "2024 – 2026",
    badge: "100% Score · Project Heimdall",
    category: "Work",
    image: "/assets/deccan_ai_dashboard.png",
    location: "Deccan AI Experts Platform",
    story: "Active RLHF, SFT, and AI Safety evaluator on Deccan AI Experts. Achieved 100% completion on Project Heimdall Assessment and Action Extensions V2, evaluating LLM factuality, instruction-following, and Python code correctness.",
    stats: "100% Score · RLHF & SFT Evaluator",
  },
  {
    id: "mittal-letter-completion",
    title: "Mittal Alliance: Official Letter of Completion",
    date: "27 APRIL 2026",
    badge: "Frontend Developer Intern",
    category: "Work",
    image: "/assets/mittal_alliance_completion.png",
    location: "Mittal Alliance (Remote / Indore)",
    story: "Official Letter of Completion certified by HR at Mittal Alliance. Developed and maintained responsive web interfaces using modern technologies, collaborated with design and backend teams, optimized performance, and debugged production websites.",
    stats: "Certified Completion · 27 April 2026 · HR Certified",
  },
  {
    id: "wispr-voice",
    title: "Voice-First Engineering with Wispr Flow",
    date: "2025 – PRESENT",
    badge: "3x Velocity by Speaking",
    category: "Voice AI",
    image: "/assets/wispr_transcript.png",
    location: "The Voice Lab",
    story: "Thinking out loud into Wispr Flow voice dictation, bypassing keyboard friction to iterate on system architectures 3x faster than typing.",
    stats: "3x Speed · Voice-to-Code Pipeline",
  },
];