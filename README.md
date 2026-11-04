# Yug_Portfolio — Interactive Multi-OS Engineering Portfolio

Built as an authentic multi-OS interactive portfolio celebrating Yug Pathak's software engineering journey — from MS Paint and QBasic to hackathon victories (SAP HackFest 2026 Winner ₹75k, LNM Hacks, IQOO Regional Finals, GDG On Campus Lead) and production systems (Resilience OS / LinqChain, OBS, Campus OS, FinAssist, Freight Cost Predictor).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
npm install
```

### Running Locally (Development Mode)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
```
The optimized production bundle will be created in the `dist/` directory.

### Previewing the Production Build
```bash
npm run preview
```

---

## 🖥️ Operating System Modes & Features

1. **BIOS Boot Sequence (`Boot.jsx`)**:
   - Retro BIOS memory test checking childhood memories, mounting MS Paint, compiling QBasic and C++.
   - CRT overlay with scanlines, phosphor blinking cursor, progress indicator, and skip hotkey.

2. **Windows Desktop (`Desktop.jsx`)**:
   - Interactive desktop with drag/click icons: `MEET_YUG.EXE`, `ASK_YUG.EXE`, `STORY_MODE`, `RECRUITER.TXT`, `BUILDER_LAB`, `ABOUT_YUG.TXT`.
   - Windows 98 memory viewer windows (`MemoryWindow.jsx`) for inspecting early hardware and software artifacts.
   - Dynamic OS themes: **Windows XP** (Bliss wallpaper), **Windows 7**, **Windows 8**, **Windows 10**, **Windows 11**, and **Ubuntu**.

3. **Story Mode (`StoryMode.jsx`)**:
   - 3D parallax scroll journey through 11 chapters powered by Lenis smooth scrolling and Framer Motion 3D transforms.
   - Interactive memory object cards, authentic hackathon photos, and quote blocks.

4. **Recruiter Mode (`RecruiterMode.jsx`)**:
   - Fast 60-second executive summary inside a classic Win98 notepad/dossier window.
   - Direct links to GitHub, LinkedIn, Email, and local download of `Yug_Backend_Resume.pdf`.

5. **Builder Lab (`BuilderMode.jsx`)**:
   - Detailed engineering dossiers for Resilience OS, OBS (Oracle Before Signing), and Campus OS.
   - Simplified ASCII/box architecture diagrams, engineering decisions, and failure postmortems.

6. **Interactive Phosphor Terminal (`Terminal.jsx`)**:
   - CRT green phosphor AI agent terminal (`ASK_YUG.EXE`).
   - Supports local terminal commands: `help`, `whoami`, `projects`, `contact`, `clear`, `sudo hire yug`.

7. **Voice Layer Modal (`VoiceLayer.jsx`)**:
   - "How this site was made" modal showing real-time Wispr Flow voice dictation logs, WPM statistics, and day-1 screenshots.

8. **Windows Taskbar & Start Menu (`Taskbar.jsx`)**:
   - Classic Start Menu with shortcuts to all modes, reboot, and easter egg shutdown.
   - Live system clock and instant theme toggle.

---

## 📁 Project Structure

```
Portfolio/
├── public/
│   ├── assets/              # Downloaded local assets (photos, wallpapers, resume PDF)
│   ├── favicon.svg          # Retro floppy / computer SVG icon
│   └── manifest.json        # Web app manifest
├── src/
│   ├── components/
│   │   ├── Boot.jsx         # BIOS boot sequence
│   │   ├── BuilderMode.jsx  # Engineering lab & architecture diagrams
│   │   ├── Desktop.jsx      # Desktop environment & icons
│   │   ├── ErrorBoundary.jsx# Retro styled crash recovery
│   │   ├── Marquee.jsx      # Ticker marquee
│   │   ├── MemoryWindow.jsx # Win98 window for memory items
│   │   ├── PixelScene.jsx   # SVG pixel art scenes
│   │   ├── RecruiterMode.jsx# 60-second recruiter sheet
│   │   ├── StoryBits.jsx    # Marquee & quote helpers
│   │   ├── StoryMode.jsx    # 3D parallax scroll story
│   │   ├── Taskbar.jsx      # Taskbar & Start Menu
│   │   ├── Terminal.jsx     # AI Phosphor terminal
│   │   ├── VoiceLayer.jsx   # Wispr Flow dictation layer
│   │   └── Win98.jsx        # Windows 98 bevels, buttons, & titlebars
│   ├── data/
│   │   └── content.js       # Complete portfolio content & dossiers
│   ├── lib/
│   │   └── utils.js         # cn utility
│   ├── App.css
│   ├── App.jsx              # Main phase switcher & state
│   ├── index.css            # CRT overlay, scanlines, Win98/XP CSS
│   └── main.jsx             # React entry point
├── dist/                    # Static production build
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```
