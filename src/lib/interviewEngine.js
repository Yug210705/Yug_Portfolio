// Yug Pathak - AI Virtual Interview Knowledge & Speech Engine
import { CHAPTERS, PROJECTS, RECRUITER } from "@/data/content";

// Dynamic greeting based on current hour of the day
export function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  return "Good evening";
}

// Comprehensive self-introduction verbatim with dynamic time-of-day greeting
export function getIntroductionText() {
  const greeting = getTimeGreeting();
  return `${greeting}, and thank you for giving me this opportunity to introduce myself.

I'm Yug Pathak, a third-year B.Tech Computer Science and Engineering student at Poornima University, Jaipur, originally from Gurgaon.

I would describe myself as someone who is driven by curiosity, practical problem-solving, and the desire to build technology that creates real-world impact.

My journey in technology started much earlier than my formal engineering education. I have always been fascinated by computers and the possibilities they offer. Over time, that curiosity evolved into a serious interest in software development, where I started exploring programming, building projects, participating in hackathons, and learning technologies beyond my academic curriculum.

Technically, my primary programming language is C++, and I have been strengthening my foundations in Data Structures and Algorithms. Alongside that, I have explored frontend and full-stack development, backend engineering, and DevOps. I've also gained practical exposure to technologies such as Jenkins, Docker, Kubernetes, SonarQube, Maven, and AWS, particularly around CI/CD pipelines, application deployment, and software quality.

I've also had professional exposure as a Frontend Developer Intern at Mittal Alliance, where I worked on real-world development requirements, including building websites for international clients. Additionally, my involvement with Deccan AI has given me exposure to areas such as Reinforcement Learning from Human Feedback and Supervised Fine-Tuning.

Beyond technical development, leadership has played a significant role in shaping my personality. I served as an organiser and student leader for Google Developer Groups on Campus at Poornima University, where I contributed to growing the community from approximately 1,100 to over 2,300 members. I also led and coordinated more than 15 technical events, workshops, and learning initiatives, engaging over 2,500 students.

This experience taught me something important: leadership is not just about managing people; it's about taking ownership, solving problems under pressure, building teams, and ensuring that things get delivered.

I've also participated in competitive hackathons, where I was a finalist at SAP HackFest 2026 and a semifinalist at the SCPC National Hackathon. These experiences strengthened my ability to work with ambiguity, collaborate with teams, and translate ideas into practical solutions.

One thing that particularly defines my approach is that I don't like limiting my learning to what is assigned to me. If I encounter a technology or problem I don't understand, I take the initiative to explore it, experiment with it, and figure out how to implement it.

At this stage, I'm looking for an opportunity where I can apply my existing technical knowledge, learn from experienced engineers, contribute to meaningful projects, and grow into an engineer who can take end-to-end ownership of software systems.

I believe I'm not just looking for a position where I can write code; I'm looking for an environment where I can develop the ability to solve meaningful engineering problems and create measurable impact.

Thank you.`;
}

export const PRESET_QUESTIONS = [
  {
    id: "intro",
    label: "Tell me about yourself & your journey",
    query: "Can you introduce yourself and walk me through your background and journey in tech?",
  },
  {
    id: "linqchain",
    label: "Explain LinqChain (Resilience OS) Architecture",
    query: "Can you explain the architecture and tech stack of LinqChain (Resilience OS)?",
    project: "resilience",
  },
  {
    id: "obs",
    label: "Explain OBS (Oracle Before Signing) Architecture",
    query: "Can you walk me through the architecture and tech stack of OBS (Oracle Before Signing)?",
    project: "obs",
  },
  {
    id: "campus_os",
    label: "Explain Campus OS Architecture & RAG",
    query: "Can you explain the architecture, tech stack, and RAG document search in Campus OS?",
    project: "campus",
  },
  {
    id: "finassist",
    label: "Explain FinAssist AI Financial Copilot",
    query: "What is the architecture and tech stack of your FinAssist / FinAI project?",
    project: "finassist",
  },
  {
    id: "freight",
    label: "Explain Freight Cost Predictor (Volkswagen)",
    query: "Can you explain the architecture, ML algorithms, and tech stack of Freight Cost Predictor for Volkswagen?",
    project: "freight",
  },
  {
    id: "pravah",
    label: "Explain Project Pravah (SIH / Oil India)",
    query: "Can you explain the architecture and IoT telemetry pipeline of Project Pravah?",
    project: "pravah",
  },
  {
    id: "intervyo",
    label: "Explain Intervyo AI Mock Interviewer",
    query: "Can you walk me through the architecture and tech stack of your Intervyo project?",
    project: "intervyo",
  },
  {
    id: "github_all",
    label: "Overview of your GitHub Projects",
    query: "Tell me about all your projects listed on GitHub and how they demonstrate your engineering range.",
  },
  {
    id: "devops_stack",
    label: "DevOps, CI/CD & Systems Foundations",
    query: "What is your hands-on exposure to DevOps, CI/CD pipelines, Docker, Kubernetes, and C++?",
  },
  {
    id: "gdg",
    label: "Leadership at GDG On Campus (2,300+ Members)",
    query: "What was your role leading Google Developer Groups on Campus at Poornima University?",
  },
  {
    id: "speaking",
    label: "Why was this site built by speaking?",
    query: "Why do you emphasize building by speaking with Wispr Flow?",
  },
];

// Rich knowledge responses representing Yug Pathak
const KNOWLEDGE_RESPONSES = [
  {
    keywords: ["yourself", "who are you", "intro", "introduce", "background", "journey", "story", "morning", "afternoon", "evening", "tell me about"],
    getAnswer: () => getIntroductionText(),
    project: null,
  },
  {
    keywords: ["linqchain", "resilience", "resilience os", "supply chain", "control center", "sap cap", "hana", "xyflow"],
    answer:
      "LinqChain (Resilience OS) is an enterprise supply chain command center that deterministically simulates systemic disruptions, predicts multi-tier bottlenecks, and computes optimal recovery paths before catastrophic supply failure occurs. Architecturally, it features a Next.js 14 interactive dashboard utilizing dynamic directed network graphs (@xyflow/react) and Recharts. The computational core runs on Python with FastAPI and SQLAlchemy, hosting a high-throughput deterministic simulation engine. A custom AI Adapter interfaces with enterprise LLMs under deterministic bounds — the LLM can only suggest strategies within pre-calculated feasible simulation states, ensuring hallucination-proof recommendations. Supply telemetry and multi-tier bills of materials are managed on an enterprise SAP Cloud Application Programming Model (CAP) tier backed by SAP HANA Cloud, with automated PDF disruption reporting via jsPDF. This project was a National Finalist at SAP HackFest 2026 .",
    project: "resilience",
  },
  {
    keywords: ["obs", "oracle before signing", "signing", "blockchain", "monad", "metamask", "drainer", "blind signing"],
    answer:
      "OBS (Oracle Before Signing) is a Web3 transaction security protocol designed to eliminate blind-signing exploits on the Monad high-throughput EVM blockchain. Architecturally, when a transaction request is dispatched from MetaMask or any Web3 provider, OBS intercepts and dry-runs the call through an off-chain simulation oracle. It evaluates authorization controls against an adversarial pattern analyzer and executes on-chain validation smart contracts written in Solidity before final signature prompt. If safety cannot be mathematically proven, execution approval defaults to deny. Built with Monad Devnet/Testnet, Solidity, Hardhat/Foundry, Ethers.js/Viem, and Next.js, OBS reduced unsafe transactions by ~90% across 5+ deployed smart contracts.",
    project: "obs",
  },
  {
    keywords: ["campus", "campus os", "portal", "student management", "rag", "pgvector", "notices", "college operating"],
    answer:
      "Campus OS is a multi-tenant digital operating system designed for Poornima University's 2,300+ students and faculty. Architecturally, the platform features a Next.js and TypeScript frontend communicating with an Express/Node.js API gateway secured with role-based JWT authentication (Student, Organizer, Faculty, Admin). The persistence tier utilizes PostgreSQL managed via Prisma ORM, paired with a Redis caching and distributed lock cluster to eliminate race conditions during high-concurrency fest registrations. It integrates a conversational LLM assistant powered by LangChain and pgvector RAG, vectorizing campus circulars, academic syllabi, and notices for sub-100ms semantic question answering. The entire platform is containerized with Docker.",
    project: "campus",
  },
  {
    keywords: ["finassist", "finai", "finance", "portfolio", "wealth", "stock", "market", "copilot", "sharpe"],
    answer:
      "FinAssist (FinAI) is an intelligent personal financial copilot and market analytics platform. Architecturally, the frontend is built in Next.js and TypeScript with Recharts financial visualization, communicating with a Python FastAPI microservice backend. The engine ingests real-time market data from AlphaVantage and yfinance, feeds quantitative statistics into Pandas and NumPy models (computing Sharpe ratios, volatility, and Value at Risk), and runs time-series price trend forecasting. A LangChain RAG agent with strict financial guardrails parses corporate balance sheets and regulatory filings, answering complex portfolio questions in natural language while citing direct primary source documents.",
    project: "finassist",
  },
  {
    keywords: ["freight", "volkswagen", "imobilothon", "cost predictor", "logistics", "shipping", "tariff", "xgboost"],
    answer:
      "The Freight Cost Predictor is an end-to-end Machine Learning logistics platform developed for the Volkswagen i.Mobilothon. Architecturally, raw freight logs, distance metrics, vehicle payload specifications, and historical carrier rates pass through an automated feature-engineering pipeline calculating actual transport corridors, haversine distances, toll density, and dynamic fuel indices. The prediction core employs an ensemble of gradient-boosted decision trees using XGBoost and LightGBM with Huber loss optimization to handle logistics billing outliers. The ML models achieve a sub-5% Mean Absolute Percentage Error (MAPE) on cross-country freight estimates, feeding an optimization matrix that recommends the most cost-effective carriers.",
    project: "freight",
  },
  {
    keywords: ["pravah", "project pravah", "pipeline", "oil india", "sih", "leak", "telemetry", "mqtt"],
    answer:
      "Project Pravah is a real-time industrial IoT telemetry and pipeline integrity monitoring system developed for the Smart India Hackathon (Oil India problem statement). Architecturally, distributed edge sensors (pressure, flow rate, and acoustic sensors) stream data over MQTT to an ingestion broker. A Python backend analyzes pressure differential waves to localize crude oil leaks and unauthorized tapping in real time, projecting geo-coordinates onto an interactive GIS monitoring map built with React and Leaflet, complete with automated emergency valve isolation alerts.",
    project: "pravah",
  },
  {
    keywords: ["intervyo", "mock interview", "webrtc", "interview platform", "voice interview", "rubric"],
    answer:
      "Intervyo is an AI-powered multimodal technical and behavioral mock interview platform. Architecturally, browser client media streams audio and video via WebRTC and the MediaStream API, with speech transcription processed through Whisper and dynamic LLM interviewer personas powered by Google Gemini. The platform adapts question difficulty based on response depth, evaluates technical correctness, cadence, and vocabulary, and generates an automated end-of-session quantitative evaluation rubric and actionable improvement report.",
    project: "intervyo",
  },
  {
    keywords: ["github", "repositories", "all projects", "github projects", "what else have you built", "ecosystem"],
    answer:
      "On my GitHub (@Yug210705), you can explore my full project ecosystem: LinqChain (Resilience OS) for SAP supply chain simulation, OBS for Monad blockchain transaction security, Campus OS for multi-tenant college management, the Freight Cost Predictor for Volkswagen logistics ML, Project Pravah for SIH/Oil India pipeline IoT telemetry, FinAI for automated wealth analytics, and Intervyo for AI mock interviews, along with projects like PictoPy and Calyx. Across all my repositories, I focus on clean architecture, deterministic guardrails, and building software that solves concrete engineering problems.",
    project: null,
  },
  {
    keywords: ["devops", "cicd", "ci/cd", "docker", "kubernetes", "jenkins", "sonarqube", "maven", "aws", "pipeline"],
    answer:
      "My DevOps experience centers around building robust, automated CI/CD pipelines and infrastructure reliability. I work with Jenkins for continuous integration, Docker for multi-stage container builds, Kubernetes for container orchestration and autoscaling, Maven for build lifecycle management, and SonarQube for static code analysis, test coverage verification, and quality gates. On the cloud side, I deploy on AWS (EC2, S3, IAM, Lambda). Coupled with my C++ systems foundation, this hands-on exposure enables me to write code with deep awareness of memory, runtime constraints, and production deployment cycles.",
    project: null,
  },
  {
    keywords: ["gdg", "google developer", "community", "lead", "leadership", "organizer", "2300", "members"],
    answer:
      "As an organiser and student leader for Google Developer Groups on Campus at Poornima University, I helped grow the developer community from approximately 1,100 to over 2,300 active members. I led and coordinated more than 15 technical events, cloud study jams, and hackathons, directly engaging over 2,500 students. This leadership journey taught me that leadership is fundamentally about taking ownership under pressure, rallying cross-functional teams, demystifying complex technical topics, and consistently delivering high-impact initiatives.",
    project: null,
  },
  {
    keywords: ["c++", "dsa", "data structures", "algorithms", "competitive programming", "system"],
    answer:
      "C++ is my primary programming language and the core of my computational foundations. I actively practice Data Structures and Algorithms, with a focus on graph theory, dynamic programming, tree traversals, and memory-efficient data structures. Strengthening these foundations in C++ gives me a granular understanding of pointers, cache locality, time-space complexities, and Operating System primitives that directly inform how I architect full-stack and distributed web systems.",
    project: null,
  },
  {
    keywords: ["mittal", "deccan", "internship", "experience", "work", "professional", "industry"],
    answer:
      "Professionally, I worked as a Frontend Developer Intern at Mittal Alliance, building responsive web applications for international clients under strict production standards. Additionally, my involvement with Deccan AI gave me valuable exposure to advanced AI alignment techniques, specifically Reinforcement Learning from Human Feedback (RLHF) and Supervised Fine-Tuning (SFT). These experiences taught me how to deliver client-ready code and understand the full lifecycle of AI systems.",
    project: null,
  },
  {
    keywords: ["hackathon", "hackfest", "sap", "scpc", "awards", "achievements", "winner", "competition"],
    answer:
      "Competitive hackathons have been pivotal in shaping my speed, grit, and team collaboration. I was a National Finalist at SAP HackFest 2026  for building LinqChain (Resilience OS), and a semifinalist at the SCPC National Hackathon. Hackathons have taught me how to navigate ambiguity, synthesize complex domains into clear system architectures, and ship working prototypes under high pressure.",
    project: null,
  },
  {
    keywords: ["wispr", "speaking", "voice", "built by speaking", "flow"],
    answer:
      "This entire portfolio was built by speaking using Wispr Flow! Instead of typing slowly, I talk my thoughts out loud into voice dictation, convert them into precise architectural prompts, and rapidly iterate on code and designs. Speaking enables stream-of-consciousness engineering — thoughts flow 3 times faster than fingers can type on a keyboard, allowing me to focus on architectural decisions rather than syntax friction.",
    project: null,
  },
];

// Fallback response for unmapped questions
const DEFAULT_RESPONSE =
  "That's a thoughtful question! In my engineering work, I focus on building systems that are simple, reliable, and observable. Feel free to ask me specifically about the architecture and tech stacks of LinqChain (Resilience OS), OBS on Monad, Campus OS, FinAssist, Freight Cost Predictor for Volkswagen, Project Pravah, or my leadership at GDG On Campus!";

export function getInterviewAnswer(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    return {
      answer: getIntroductionText(),
      project: null,
    };
  }

  // Find best match based on keyword hit count
  let bestMatch = null;
  let maxScore = 0;

  for (const item of KNOWLEDGE_RESPONSES) {
    let score = 0;
    for (const kw of item.keywords) {
      if (q.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 2) {
    const text = typeof bestMatch.getAnswer === "function" ? bestMatch.getAnswer() : bestMatch.answer;
    return {
      answer: text,
      project: bestMatch.project,
    };
  }

  return {
    answer: DEFAULT_RESPONSE,
    project: null,
  };
}

export async function getInterviewAnswerAsync(query) {
  const localMatch = getInterviewAnswer(query);
  // If we had a strong direct match from curated knowledge, return immediately
  if (localMatch.answer !== DEFAULT_RESPONSE) {
    return localMatch;
  }

  // Check OpenRouter API key
  const apiKey =
    process.env.OPEN_ROUTER_API_KEY ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_OPEN_ROUTER_API_KEY) ||
    "";

  if (!apiKey) {
    return localMatch;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://yug-portfolio.vercel.app",
        "X-Title": "Yug Pathak AI Interview",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "system",
            content: `You are Yug Pathak, a 3rd-year B.Tech CSE student at Poornima University, Jaipur (8.88 CGPA), originally from Gurgaon.
You are in a live technical interview speaking to an interviewer.
Answer directly as Yug in the first person ('I', 'my'). Be concise, sharp, and natural (2 to 4 sentences maximum, spoken aloud by speech synthesis).
Key facts to draw upon when relevant:
- Primary programming language: C++, strong foundations in Data Structures and Algorithms.
- Frontend & Full-Stack: React, Tailwind CSS, TypeScript, FastAPI, Node.js.
- Systems & DevOps: Jenkins, Docker, Kubernetes, SonarQube, Maven, AWS (CI/CD pipelines, container orchestration, quality gates).
- Professional: Frontend Developer Intern at Mittal Alliance (built websites for international clients, 10+ REST APIs), Deccan AI (RLHF & SFT AI model training).
- Leadership: Google Developer Groups on Campus Lead at Poornima University (scaled community from 1,100 to 2,300+ members, organized 15+ events).
- Hackathons: National Finalist at SAP HackFest 2026 for LinqChain (Resilience OS), semifinalist at SCPC National Hackathon, Top 5 at LNMHacks 8.0.
- Key projects: LinqChain (Resilience OS - SAP supply chain control room), OBS (Oracle Before Signing on Monad blockchain), Campus OS (multi-tenant university system), Freight Cost Predictor (Volkswagen logistics ML), Project Pravah (SIH/Oil India telemetry IoT).
Never break character. Do not use markdown fences, bullets, or asterisks; output conversational plain text that can be spoken directly.`,
          },
          {
            role: "user",
            content: query,
          },
        ],
        temperature: 0.7,
        max_tokens: 180,
      }),
    });

    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (reply) {
        return {
          answer: reply,
          project: null,
        };
      }
    }
  } catch (err) {
    // Graceful fallback to local response
  }

  return localMatch;
}

// Phonetic analysis mapping spoken words to realistic mouth visemes and durations
export function getWordVisemePlan(rawWord) {
  if (!rawWord) return [{ viseme: "rest", duration: 180 }];

  const clean = rawWord.toLowerCase().replace(/[^a-z]/g, "");
  const hasComma = /,/.test(rawWord);
  const hasSentenceEnd = /[.!?]/.test(rawWord);

  if (!clean) {
    return [{ viseme: "rest", duration: hasSentenceEnd ? 340 : hasComma ? 180 : 120 }];
  }

  // Detect dominant vowel sounds
  const hasRound = /[ou]|oo|ow|ou|oi|oy|aw|au|wh/.test(clean);
  const hasWide = /[aei]|ay|ey|ai|ee|ea|ah/.test(clean);
  const startsBilabial = /^[mbp]/.test(clean);
  const endsBilabial = /[mbp]$/.test(clean);

  let primary = "slight";
  if (hasRound && !hasWide) {
    primary = "round";
  } else if (hasWide && !hasRound) {
    primary = "wide";
  } else if (hasRound && hasWide) {
    const firstRound = clean.search(/[ou]|oo|ow|ou|oi|oy|aw|au|wh/);
    const firstWide = clean.search(/[aei]|ay|ey|ai|ee|ea|ah/);
    primary = firstRound < firstWide ? "round" : "wide";
  }

  const steps = [];

  if (startsBilabial && clean.length > 2) {
    steps.push({ viseme: "rest", duration: 70 });
  }

  if (clean.length <= 3) {
    steps.push({ viseme: primary, duration: 180 });
    steps.push({ viseme: "slight", duration: 90 });
  } else if (clean.length <= 6) {
    steps.push({ viseme: primary, duration: 220 });
    steps.push({ viseme: "slight", duration: 110 });
  } else {
    const secondary =
      primary === "wide" && hasRound ? "round" : primary === "round" && hasWide ? "wide" : "slight";
    steps.push({ viseme: primary, duration: 200 });
    steps.push({ viseme: secondary, duration: 180 });
    steps.push({ viseme: "slight", duration: 110 });
  }

  if (endsBilabial) {
    steps.push({ viseme: "rest", duration: 80 });
  }

  if (hasSentenceEnd) {
    steps.push({ viseme: "rest", duration: 340 });
  } else if (hasComma) {
    steps.push({ viseme: "rest", duration: 180 });
  }

  return steps;
}

// Speech synthesis and viseme timeline engine
class InterviewSpeechManager {
  constructor() {
    this.synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.sequenceTimers = [];
    this.boundaryCheckTimer = null;
    this.fallbackWordTimer = null;
    this.hadBoundaryEvent = false;
    this.selectedVoice = null;
    this.soundEnabled = true;

    if (this.synth) {
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  findManlyVoice() {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    // Strict filter to exclude female voices across Windows, Edge, Android Chrome, and iOS
    const isStrictlyFemale = (v) => {
      const name = (v.name || "").toLowerCase();
      const uri = (v.voiceURI || "").toLowerCase();
      return (
        name.includes("female") || uri.includes("female") ||
        name.includes("woman") || name.includes("girl") ||
        name.includes("zira") || name.includes("neerja") || name.includes("heera") ||
        name.includes("swara") || name.includes("ananya") || name.includes("shruti") ||
        name.includes("priya") || name.includes("veena") || name.includes("samantha") ||
        name.includes("victoria") || name.includes("karen") || name.includes("susan") ||
        name.includes("hazel") || name.includes("catherine") || name.includes("linda") ||
        name.includes("jenny") || name.includes("aria") || name.includes("eva") ||
        name.includes("google us english") || name.includes("google english (india)") ||
        name.includes("google uk english female") ||
        uri.includes("en-in-x-end") || uri.includes("en-in-x-ene") || uri.includes("en-us-x-sfg")
      );
    };

    // Explicit male detection across Windows, Mac, Android, and iOS
    const isExplicitlyMale = (v) => {
      const name = (v.name || "").toLowerCase();
      const uri = (v.voiceURI || "").toLowerCase();
      return (
        name.includes("male") || uri.includes("male") ||
        name.includes("uk english male") ||
        name.includes("prabhat") ||
        name.includes("ravi") ||
        name.includes("mohan") ||
        name.includes("kunal") ||
        name.includes("aarav") ||
        name.includes("david") ||
        name.includes("mark") ||
        name.includes("guy") ||
        name.includes("christopher") ||
        name.includes("ryan") ||
        name.includes("george") ||
        name.includes("daniel") ||
        name.includes("oliver") ||
        name.includes("alex") ||
        name.includes("fred") ||
        name.includes("rishi") ||
        uri.includes("iom") ||
        uri.includes("cfl") ||
        uri.includes("iol") ||
        uri.includes("rjs")
      );
    };

    const isIndian = (v) => {
      const lang = (v.lang || "").toLowerCase().replace(/_/g, "-");
      const name = (v.name || "").toLowerCase();
      return (
        lang.includes("en-in") ||
        lang.includes("hi-in") ||
        name.includes("india") ||
        name.includes("prabhat") ||
        name.includes("ravi")
      );
    };

    // 1. Prioritize verified Indian male voice (e.g. Microsoft Prabhat, Ravi, en-in-x-cfl#male)
    const indianMale = voices.find((v) => isIndian(v) && isExplicitlyMale(v) && !isStrictlyFemale(v));
    if (indianMale) return indianMale;

    // 2. Prioritize verified English male voice (e.g. Google UK English Male, Microsoft David, Guy)
    const englishMale = voices.find(
      (v) => (v.lang || "").toLowerCase().startsWith("en") && isExplicitlyMale(v) && !isStrictlyFemale(v)
    );
    if (englishMale) return englishMale;

    // 3. Any voice explicitly tagged male
    const anyMale = voices.find((v) => isExplicitlyMale(v) && !isStrictlyFemale(v));
    if (anyMale) return anyMale;

    // 4. Any English voice that is strictly non-female
    const nonFemaleEnglish = voices.find(
      (v) => (v.lang || "").toLowerCase().startsWith("en") && !isStrictlyFemale(v)
    );
    if (nonFemaleEnglish) return nonFemaleEnglish;

    // 5. Fallback non-female voice
    return voices.find((v) => !isStrictlyFemale(v)) || voices[0];
  }

  initVoices() {
    this.selectedVoice = this.findManlyVoice();
  }

  clearTimers() {
    if (this.sequenceTimers && this.sequenceTimers.length > 0) {
      this.sequenceTimers.forEach((t) => clearTimeout(t));
      this.sequenceTimers = [];
    }
    if (this.boundaryCheckTimer) {
      clearTimeout(this.boundaryCheckTimer);
      this.boundaryCheckTimer = null;
    }
    if (this.fallbackWordTimer) {
      clearTimeout(this.fallbackWordTimer);
      this.fallbackWordTimer = null;
    }
  }

  playWordVisemes(word, onViseme) {
    if (!this.isSpeaking) return;

    if (this.sequenceTimers && this.sequenceTimers.length > 0) {
      this.sequenceTimers.forEach((t) => clearTimeout(t));
      this.sequenceTimers = [];
    }

    const plan = getWordVisemePlan(word);
    let cumulativeDelay = 0;

    plan.forEach((step, idx) => {
      if (idx === 0) {
        if (onViseme) onViseme(step.viseme);
      } else {
        const timer = setTimeout(() => {
          if (this.isSpeaking && onViseme) {
            onViseme(step.viseme);
          }
        }, cumulativeDelay);
        this.sequenceTimers.push(timer);
      }
      cumulativeDelay += step.duration;
    });

    const restTimer = setTimeout(() => {
      if (this.isSpeaking && onViseme) {
        onViseme("rest");
      }
    }, cumulativeDelay);
    this.sequenceTimers.push(restTimer);
  }

  runFallbackTimeline(text, onViseme, onCaption, onEnd) {
    this.clearTimers();
    const words = text.split(/\s+/).filter(Boolean);
    let wordIdx = 0;

    const stepWord = () => {
      if (!this.isSpeaking || wordIdx >= words.length) {
        this.stop();
        if (onViseme) onViseme("rest");
        if (onCaption) onCaption(text, "");
        if (onEnd) onEnd();
        return;
      }

      const word = words[wordIdx];
      const spokenSoFar = words.slice(0, wordIdx + 1).join(" ");
      wordIdx++;

      if (onCaption) onCaption(spokenSoFar, word);
      this.playWordVisemes(word, onViseme);

      const cleanLen = word.replace(/[^a-zA-Z]/g, "").length;
      let wordDuration = Math.max(260, Math.min(480, cleanLen * 45 + 160));
      if (/[.!?]/.test(word)) {
        wordDuration += 320;
      } else if (/,/.test(word)) {
        wordDuration += 160;
      }

      this.fallbackWordTimer = setTimeout(stepWord, wordDuration);
    };

    stepWord();
  }

  speak(text, { onStart, onViseme, onCaption, onEnd }) {
    this.stop();

    if (!text) {
      if (onEnd) onEnd();
      return;
    }

    const words = text.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      if (onEnd) onEnd();
      return;
    }

    if (!this.synth || !this.soundEnabled) {
      this.isSpeaking = true;
      if (onStart) onStart();
      this.runFallbackTimeline(text, onViseme, onCaption, onEnd);
      return;
    }

    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const manlyVoice = this.findManlyVoice();
      if (manlyVoice) {
        this.selectedVoice = manlyVoice;
        utterance.voice = manlyVoice;
      }
      utterance.rate = 0.96;
      // Heavy, deep, undeniably manly baritone voice (0.72)
      utterance.pitch = 0.72;

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.hadBoundaryEvent = false;
        if (onStart) onStart();

        this.boundaryCheckTimer = setTimeout(() => {
          if (this.isSpeaking && !this.hadBoundaryEvent) {
            this.runFallbackTimeline(text, onViseme, onCaption, onEnd);
          }
        }, 350);
      };

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          this.hadBoundaryEvent = true;
          if (this.boundaryCheckTimer) {
            clearTimeout(this.boundaryCheckTimer);
            this.boundaryCheckTimer = null;
          }

          const charIndex = event.charIndex;
          const remaining = text.substring(charIndex);
          const match = remaining.match(/^(\S+)/);
          const word = match ? match[1] : "";
          const wordsSpoken = text.substring(0, charIndex + word.length);

          if (onCaption) onCaption(wordsSpoken, word);
          this.playWordVisemes(word, onViseme);
        }
      };

      utterance.onend = () => {
        this.stop();
        if (onViseme) onViseme("rest");
        if (onCaption) onCaption(text, "");
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        if (e && e.error === "canceled") return;
        this.stop();
        if (onViseme) onViseme("rest");
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (e) {
      console.warn("SpeechSynthesis error, falling back to simulated speech:", e);
      this.soundEnabled = false;
      this.speak(text, { onStart, onViseme, onCaption, onEnd });
    }
  }

  stop() {
    this.isSpeaking = false;
    this.clearTimers();
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    this.currentUtterance = null;
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
    if (!enabled && this.isSpeaking) {
      this.stop();
    }
  }
}

export const speechManager = new InterviewSpeechManager();
