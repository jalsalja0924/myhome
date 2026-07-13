import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, Terminal as TerminalIcon, Cpu, Layers, Settings, Code, Sparkles, 
  Activity, FileText, CheckCircle2, ArrowRight, ChevronRight, ChevronDown, 
  GitBranch, Github, ExternalLink, Mail, Globe, Search, HelpCircle, Info, 
  X, FileCode2, ArrowLeftRight, Copy, Check, CornerDownRight, Menu, Command,
  ArrowUpRight, BookOpenCheck, Bookmark, TerminalSquare, AlertTriangle, AlertCircle
} from "lucide-react";

import { 
  profileData, quickStartData, operatingPrinciples, timelineData, 
  skillsData, projectsData, troubleshootingData, faqData, 
  contactData, manualMetadata 
} from "./data/manualData";

import DeveloperTerminal from "./components/DeveloperTerminal";
import CommandPalette from "./components/CommandPalette";

export default function App() {
  // Modal & Interactive states
  const [showTerminal, setShowTerminal] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [versionClicks, setVersionClicks] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Principles section interactive states
  const [expandedPrinciple, setExpandedPrinciple] = useState<number | null>(null);

  // Projects interactive tabs
  const [projectTabs, setProjectTabs] = useState<Record<string, "overview" | "challenge" | "resolution" | "learnings">>({
    "project-1": "overview",
    "project-2": "overview"
  });

  // Workflow current active step
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  // FAQ accordion open states
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Code Diff active tab (Troubleshooting)
  const [diffMode, setDiffMode] = useState<"side" | "before" | "after">("side");

  const workflowSteps = [
    { title: "Idea & Planning", desc: "기획 및 유저 가치 정의", detail: "비즈니스 요건을 분석하고 유저 시나리오를 고립시킵니다. 엣지 케이스 유저 스토리를 설계 단계에서 90% 이상 정의해 요구사항 누수를 방지합니다." },
    { title: "Architecture", desc: "구조 설계 & UI 모델링", detail: "FSD(Feature-Driven) 폴더 구조를 수립하고, Figma 가이드를 보며 CSS 토큰 및 공통 디자인 시스템 컴포넌트 규격을 선언합니다." },
    { title: "Coding", desc: "본격 고성능 개발", detail: "타입 안정성을 보장하며 코딩을 진행합니다. 불필요한 상태 리렌더링을 방지하기 위해 미세 상태 관리와 렌더 트리 고립을 기획 단계부터 반영합니다." },
    { title: "Testing", desc: "검증 & 반응형 최적화", detail: "모바일 해상도 터치 엣지, 키보드 접근성 가이드를 만족하는지 검사하고 Playwright를 통해 렌더 결함을 사전에 탐지합니다." },
    { title: "CI/CD & Deploy", desc: "지속 통합 및 Vercel 배포", detail: "Git PR 단위로 빌드 정적 오류를 차단하고, 배포 직후 코어 성능 측정 파이프라인(Lighthouse CI)을 자동으로 트리거해 점수를 측정합니다." },
    { title: "Metric Analysis", desc: "모니터링 & 피드백 반영", detail: "Sentry 및 Real-user Web Vitals 모니터링을 돌려 사용자 이탈 지표와 렌더 병목을 추적하고 주기적으로 청소합니다." }
  ];

  // List of all sections for scroll spy and sidebar navigation
  const sections = [
    { id: "hero", label: "01. Introduction" },
    { id: "quick-start", label: "02. Quick Start" },
    { id: "about-me", label: "03. Story (About Me)" },
    { id: "principles", label: "04. Operating Principles" },
    { id: "timeline", label: "05. Version History" },
    { id: "skills", label: "06. Technical Skills" },
    { id: "projects", label: "07. Production Projects" },
    { id: "troubleshooting", label: "08. Troubleshooting" },
    { id: "workflow", label: "09. System Workflow" },
    { id: "faq", label: "10. System FAQ" },
    { id: "diagnostics", label: "11. Diagnostics & Release" },
    { id: "contact", label: "12. Contact Channels" }
  ];

  // Handle Toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Easter egg click counter on Build Version
  const handleVersionClick = () => {
    const clicks = versionClicks + 1;
    setVersionClicks(clicks);
    if (clicks === 3) {
      setShowTerminal(true);
      setVersionClicks(0);
      triggerToast("🔓 이스터 에그 터미널 쉘이 가동되었습니다! (exit 또는 ESC로 닫기)");
    } else {
      triggerToast(`터미널 시스템 가동 점검 중... (${clicks}/3)`);
    }
  };

  // Jump to specific element
  const handleJump = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K opens Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowPalette(prev => !prev);
      }
      
      // ESC closes active overlays
      if (e.key === "Escape") {
        setShowTerminal(false);
        setShowPalette(false);
      }

      // 1-9 to jump to sections 1 to 9
      if (!showTerminal && !showPalette && e.key >= "1" && e.key <= "9") {
        // Prevent if user is typing (though we don't have inputs outside modal, safe check)
        if (document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
          e.preventDefault();
          const idx = parseInt(e.key) - 1;
          if (sections[idx]) {
            handleJump(sections[idx].id);
          }
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeys);
    return () => window.removeEventListener("keydown", handleGlobalKeys);
  }, [showTerminal, showPalette]);

  // Scrollspy to update active left link based on current viewport
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -75% 0px", // Detect when section is at the top of viewport
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Quick Copy Action
  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`📋 ${label} 클립보드 복사 완료!`);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-slate-300 font-sans antialiased selection:bg-blue-600/35 selection:text-white flex flex-col">
      
      {/* Top Warning/Status Bar */}
      <div className="w-full bg-brand-bg/95 border-b border-brand-border/50 sticky top-0 z-30 backdrop-blur-md px-4 py-2.5 flex items-center justify-between text-[11px] font-mono tracking-wider select-none">
        <div className="flex items-center space-x-3.5">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-bold">kmj-docs-server: online</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 hidden sm:inline">ENV: Node.js 22 + React 19 + Tailwind v4</span>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={handleVersionClick}
            className="text-slate-400 hover:text-blue-400 font-medium cursor-pointer transition-colors"
            title="Click 3 times to launch Easter Egg Shell!"
          >
            BUILD: {profileData.buildVersion}
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">LAST UPDATED: {profileData.lastUpdated}</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto relative px-0 sm:px-4 md:px-6 lg:px-8">
        
        {/* Sticky Left Sidebar (Manual Navigation) - Desktop Only */}
        <aside className="w-64 shrink-0 hidden md:flex flex-col sticky top-[52px] h-[calc(100vh-52px)] overflow-y-auto py-8 pr-4 border-r border-brand-border/40 scrollbar-thin scrollbar-thumb-slate-900 bg-brand-sidebar/20">
          
          {/* Logo Brand info */}
          <div className="mb-6 px-3">
            <div className="flex items-center gap-2 mb-1.5">
              <BookOpen className="w-5 h-5 text-brand-accent" />
              <span className="text-xs font-bold text-white tracking-widest font-mono uppercase">Developer Manual</span>
            </div>
            <p className="text-[10px] text-brand-text-muted font-mono tracking-tight leading-relaxed">
              Minjae Kim // Frontend Engineer Core Docs. Fully responsive and keyboard controllable guide.
            </p>
          </div>

          {/* Quick Search Shortcut trigger */}
          <button 
            onClick={() => setShowPalette(true)}
            className="mb-6 w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg border border-brand-border bg-brand-card/40 hover:bg-brand-card hover:border-brand-accent transition-all text-slate-500 hover:text-slate-300 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-brand-text-muted" />
              <span>검색 또는 커맨드...</span>
            </div>
            <kbd className="text-[9px] font-mono bg-brand-bg px-1.5 py-0.5 rounded border border-brand-border flex items-center gap-0.5 uppercase tracking-normal">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          {/* Nav List */}
          <nav className="space-y-1.5 flex-1 select-none">
            <span className="px-3 text-[10px] font-mono uppercase text-slate-600 tracking-widest block mb-2">
              Manual Index
            </span>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleJump(sec.id)}
                className={`w-full text-left px-3 py-1.5 text-xs rounded transition-all font-mono flex items-center justify-between cursor-pointer ${
                  activeSection === sec.id 
                    ? "bg-brand-card text-brand-accent font-bold border-l-2 border-brand-accent pl-2.5" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-brand-card/30"
                }`}
              >
                <span>{sec.label}</span>
                {activeSection === sec.id && <ChevronRight className="w-3 h-3 text-brand-accent" />}
              </button>
            ))}
          </nav>

          {/* Sidebar footer / quick utility */}
          <div className="mt-auto pt-6 border-t border-brand-border/40 px-3 font-mono text-[10px] text-brand-text-muted space-y-1.5">
            <div className="flex items-center gap-1.5">
              <TerminalIcon className="w-3 h-3 text-emerald-500" />
              <button 
                onClick={() => setShowTerminal(true)}
                className="hover:text-emerald-400 font-bold transition-colors cursor-pointer"
              >
                Launch kmj-shell
              </button>
            </div>
            <p>Hotkeys: [1-9] to jump sections. [Esc] to exit overlays.</p>
          </div>
        </aside>

        {/* Mobile Navigation Drawer Trigger */}
        <div className="md:hidden w-full px-4 py-3 bg-brand-sidebar/95 sticky top-[41px] z-20 backdrop-blur border-b border-brand-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-accent" />
            <span className="text-xs font-bold text-white tracking-widest font-mono uppercase">Developer Manual</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowPalette(true)}
              className="p-1 text-slate-400 hover:text-white"
              title="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-slate-400 hover:text-white"
              title="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu sheet */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[94px] bg-brand-bg z-40 p-4 border-b border-brand-border flex flex-col overflow-y-auto font-sans">
            <div className="space-y-2 mb-6">
              <span className="text-[10px] font-mono uppercase text-brand-text-muted tracking-widest block mb-2 font-bold">
                Manual Index
              </span>
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    handleJump(sec.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs rounded font-mono cursor-pointer ${
                    activeSection === sec.id 
                      ? "bg-brand-card text-brand-accent font-bold border-l-2 border-brand-accent" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            <div className="mt-auto border-t border-slate-900 pt-4 space-y-3 font-mono text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-emerald-500" />
                <button 
                  onClick={() => {
                    setShowTerminal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="hover:text-emerald-400 font-bold transition-colors cursor-pointer"
                >
                  Launch kmj-shell (Terminal Console)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Side Content Pane */}
        <main className="flex-1 min-w-0 py-8 md:py-12 px-4 sm:px-6 md:pl-10 space-y-20 md:space-y-32">
          
          {/* Section 1: Hero */}
          <section id="hero" className="scroll-mt-24 space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-brand-card border border-brand-border text-brand-accent text-[10px] font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                {profileData.englishName} // Developer Manual Core
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
                안녕하세요. 사용자 경험을 고민하며 <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white">
                  문제를 적극적으로 해결하는
                </span> <br className="hidden sm:inline" />
                프론트엔드 엔지니어입니다.
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
                {profileData.oneLineIntro} {profileData.detailedIntro.split('\n\n')[1]}
              </p>
            </div>

            {/* Micro Stats & Action buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-slate-900/60">
              {/* Profile details */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-600" />
                  Seoul, South Korea
                </span>
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-slate-600" />
                  Status: Available for opportunities
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-2.5 sm:ml-auto">
                <button 
                  onClick={() => handleJump("contact")}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-brand-accent text-white hover:bg-brand-accent-hover hover:shadow-lg hover:shadow-blue-900/10 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact
                </button>
                <a 
                  href={contactData.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-brand-border bg-brand-card/70 text-slate-300 hover:bg-brand-card hover:text-white hover:border-brand-border/85 transition-all flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
                <a 
                  href={contactData.resume} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-brand-border bg-brand-card/70 text-slate-300 hover:bg-brand-card hover:text-white hover:border-brand-border/85 transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Resume
                </a>
              </div>
            </div>

            {/* Fun Tip Overlay */}
            <div className="p-3 bg-brand-card/45 rounded-lg border border-brand-border text-[11px] font-mono text-slate-500 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-bold">Quick Command Tip:</span> 이 사이트는 채용 담당자의 소중한 시간을 절약하기 위해 <span className="text-slate-300">키보드 단축키</span> 및 <span className="text-slate-300">커맨드 팔레트</span>를 탑재했습니다. 아무 곳에서나 <kbd className="bg-brand-bg px-1 py-0.5 rounded border border-brand-border">⌘K</kbd> 또는 <kbd className="bg-brand-bg px-1 py-0.5 rounded border border-brand-border">/</kbd> 키를 눌러 매뉴얼 전체를 초고속 탐색해 보세요.
              </div>
            </div>
          </section>

          {/* Section 2: Quick Start */}
          <section id="quick-start" className="scroll-mt-24 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">02. Quick Start</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">이 개발자를 빠르게 이해하기</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                핵심 엔지니어링 역량을 압축적으로 구성한 매뉴얼 퀵 스타트 가이드입니다. 
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickStartData.map((item) => (
                <div 
                  key={item.id}
                  className="p-5 rounded-lg border border-brand-border bg-brand-card/40 hover:border-brand-border/80 hover:bg-brand-card/80 transition-all group hover:-translate-y-0.5 duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-brand-accent transition-colors">
                      // {item.title}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium mb-3">
                    {item.description}
                  </p>
                  <ul className="space-y-1.5 border-t border-brand-border/40 pt-3">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                        <CornerDownRight className="w-3 h-3 text-slate-700 shrink-0 mt-0.5" />
                        <span className="group-hover:text-slate-400 transition-colors">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: About Me (Story) */}
          <section id="about-me" className="scroll-mt-24 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">03. Story</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">왜 개발을 하고 무엇을 추구하는가</h2>
            </div>

            <div className="p-6 rounded-lg border border-brand-border bg-brand-card/25 space-y-6 text-sm sm:text-base leading-relaxed text-slate-300 font-serif">
              <div className="border-l-2 border-brand-border/65 pl-4 space-y-4">
                <p>
                  <span className="text-white font-sans font-bold block mb-1 text-sm">// 시작: 왜 프론트엔드인가</span>
                  "제가 타이핑한 레이아웃과 이펙트 하나하나가 실시간으로 사용자의 눈을 즐겁게 하고 손을 편안하게 해주는 그 즉각성(Immediacy)이 좋아서 첫 코딩을 시작했습니다. 단순히 화려한 이벤트를 넣는 것을 넘어, 로딩 스피너를 제거하고 레이턴시를 0ms에 가깝게 당길 때 서비스의 가치가 얼마나 도약하는지 목격하면서 점차 프론트엔드 성능 엔지니어링의 세계에 몰두하게 되었습니다."
                </p>
                <p>
                  <span className="text-white font-sans font-bold block mb-1 text-sm">// 신조: 무엇이 좋은 프론트엔드인가</span>
                  "사용자의 주의력은 아주 희소한 자원입니다. 복잡한 UI 요소를 비틀어서 직관적으로 정리하는 일, 네트워크 속도가 지연되거나 오프라인일 때조차 자연스럽게 동기화가 이뤄지게 만드는 일, 그것이 시니어 엔지니어가 비즈니스 단에서 기여해야 하는 진짜 프론트엔드의 가치라고 굳게 믿고 있습니다."
                </p>
                <p>
                  <span className="text-white font-sans font-bold block mb-1 text-sm">// 가치관: 어떤 협업을 선호하는가</span>
                  "어떤 기술을 채택하기 전에, 이 결정이 다른 디렉터, 백엔드 엔지니어, 그리고 신입 엔지니어에게 어떤 영향을 줄지 사전에 헤아립니다. 소통은 짧고 확실하게 문서화하여 싱크를 맞추는 편을 선호하며, 버그나 크래시가 났을 때 책임을 묻는 대신 '이런 장애를 영구 방지할 수 있는 시스템적 보완책'을 먼저 의논하는 열린 개발 문화를 만듭니다."
                </p>
              </div>

              {/* Signature Quote */}
              <div className="pt-4 border-t border-slate-900/60 font-sans text-xs text-slate-500 flex items-center justify-between">
                <span>- Minjae Kim, Senior Web Architect</span>
                <span className="italic font-mono text-[10px]">class DeveloperPhilosophy implements HumanCenter</span>
              </div>
            </div>
          </section>

          {/* Section 4: Operating Principles */}
          <section id="principles" className="scroll-mt-24 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">04. Operating Principles</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">타협하지 않는 5가지 개발 규칙</h2>
              <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                각 규칙 카드를 클릭하면 시니어로서 코딩에 녹여내는 구체적 해석과 <span className="text-brand-accent">코드 설계 가이드</span>를 확인할 수 있습니다.
              </p>
            </div>

            <div className="space-y-3.5">
              {operatingPrinciples.map((rule) => {
                const isExpanded = expandedPrinciple === rule.number;
                return (
                  <div 
                    key={rule.number}
                    className={`rounded-lg border transition-all ${
                      isExpanded 
                        ? "border-brand-accent/50 bg-brand-card/90" 
                        : "border-brand-border bg-brand-card/30 hover:border-brand-border/80"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedPrinciple(isExpanded ? null : rule.number)}
                      className="w-full text-left p-4 sm:p-5 flex items-start gap-4 cursor-pointer select-none"
                    >
                      <span className="font-mono text-xs text-brand-text-muted shrink-0 mt-1">
                        [{String(rule.number).padStart(2, "0")}]
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-white text-sm sm:text-base">
                            {rule.title}
                          </h3>
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tight">
                            // {rule.englishTitle}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                          {rule.description}
                        </p>
                      </div>
                      <span className={`p-1 rounded text-slate-500 transition-transform duration-200 mt-0.5 shrink-0 ${isExpanded ? "rotate-180 text-brand-accent" : ""}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 border-t border-brand-border bg-brand-card text-xs text-slate-300 space-y-3 font-mono">
                        <span className="text-[10px] text-slate-500 block uppercase tracking-wider">
                          // CODE PATTERN EXAMPLE IN MY MANUAL PRACTICE:
                        </span>
                        <pre className="p-4 rounded-lg bg-brand-bg text-slate-300 overflow-x-auto text-[11px] leading-relaxed border border-brand-border">
                          <code>{rule.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 5: Timeline (Version History) */}
          <section id="timeline" className="scroll-mt-24 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">05. Version History</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">연도별 커리어 성장 타임라인</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                패키지 릴리즈 이력처럼 표현한 개발 경험 및 성장 궤적입니다.
              </p>
            </div>

            <div className="relative border-l-2 border-brand-border/40 ml-3.5 pl-6 space-y-10 py-2">
              {timelineData.map((item) => (
                <div key={item.version} className="relative">
                  {/* Timeline Node Badge */}
                  <div className="absolute -left-[35px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-bg border-2 border-brand-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent-hover" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-card text-brand-accent border border-brand-border">
                        {item.version}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        ({item.period})
                      </span>
                      <h3 className="text-sm font-bold text-white tracking-tight sm:text-base">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 py-1 leading-relaxed">
                      {item.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-2 border-t border-brand-border/40">
                      {item.milestones.map((ms, idx) => (
                        <li key={idx} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
                          <span>{ms}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Technical Skills */}
          <section id="skills" className="scroll-mt-24 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">06. Technical Skills</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">실무 기술 생태계 스택</h2>
              <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                이론을 아는 것에 그치지 않고, <span className="text-slate-100 font-semibold">실무 프로덕션 및 전사 레벨</span>에서 이중 검증하여 이점을 도출했던 스택 위주로 서술합니다.
              </p>
            </div>

            <div className="space-y-6">
              {skillsData.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-3 p-5 rounded-lg border border-brand-border bg-brand-card/25">
                  <div className="flex items-start justify-between border-b border-brand-border/60 pb-2.5">
                    <h3 className="font-mono text-xs font-bold text-brand-accent flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" /> {cat.category}
                    </h3>
                    <p className="text-[10px] text-brand-text-muted leading-none">{cat.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {cat.items.map((skill, sIdx) => (
                      <div 
                        key={sIdx}
                        className="p-3 rounded bg-brand-card border border-brand-border flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <span className="text-xs text-slate-200 font-semibold block">{skill.name}</span>
                          <span className="text-[9px] text-slate-500 block font-mono">Experience: {skill.experience}</span>
                        </div>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider ${
                          skill.level === "Expert" 
                            ? "bg-brand-card text-brand-accent border border-brand-border" 
                            : skill.level === "Advanced"
                              ? "bg-brand-bg text-slate-300 border border-brand-border/80"
                              : "bg-brand-bg text-slate-500 border border-brand-border/40"
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Production Projects */}
          <section id="projects" className="scroll-mt-24 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">07. Production Projects</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">실리적인 개발 성과 프로젝트</h2>
              <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                각 프로젝트 카드 안의 탭(<span className="text-brand-accent">어려웠던 점</span>, <span className="text-brand-accent">해결 과정</span>, <span className="text-brand-accent">배운 점</span>)을 클릭하면 심화 엔지니어링 분석을 보실 수 있습니다.
              </p>
            </div>

            <div className="space-y-8">
              {projectsData.map((project) => {
                const activeTab = projectTabs[project.id];
                return (
                  <div 
                    key={project.id}
                    className="p-5 sm:p-6 rounded-lg border border-brand-border bg-brand-card/40 space-y-5 hover:border-brand-border/80 transition-all duration-300"
                  >
                    {/* Project Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between border-b border-slate-900 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base sm:text-lg">
                            {project.title}
                          </h3>
                          <span className="text-[10px] font-mono text-slate-500">
                            {project.period}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {project.intro}
                        </p>
                      </div>

                      {/* Outbound Links */}
                      {project.links && (
                        <div className="flex gap-2 shrink-0">
                          {project.links.github && (
                            <a 
                              href={project.links.github}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded transition-all text-xs flex items-center gap-1"
                              title="GitHub Repo"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-mono">Repo</span>
                            </a>
                          )}
                          {project.links.demo && (
                            <a 
                              href={project.links.demo}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded transition-all text-xs flex items-center gap-1"
                              title="Live Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-mono">Demo</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Meta specifics */}
                    <div className="space-y-2">
                      <div className="text-xs">
                        <span className="text-slate-500 font-mono inline-block w-20">My Role:</span>
                        <span className="text-slate-300 font-semibold">{project.role}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 items-center pt-1.5">
                        <span className="text-[10px] font-mono text-slate-500 mr-2 uppercase tracking-wider">Engine:</span>
                        {project.techStack.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Expansion Tabs */}
                    <div className="border border-brand-border rounded-lg overflow-hidden bg-brand-card/85">
                      {/* Tabs Bar */}
                      <div className="flex border-b border-brand-border text-[11px] font-mono divide-x divide-brand-border select-none">
                        <button
                          onClick={() => setProjectTabs(prev => ({ ...prev, [project.id]: "overview" }))}
                          className={`flex-1 py-2 text-center transition-all cursor-pointer ${activeTab === "overview" ? "bg-brand-bg text-white font-bold" : "text-slate-500 hover:text-slate-300"}`}
                        >
                          // Overview
                        </button>
                        <button
                          onClick={() => setProjectTabs(prev => ({ ...prev, [project.id]: "challenge" }))}
                          className={`flex-1 py-2 text-center transition-all cursor-pointer ${activeTab === "challenge" ? "bg-brand-bg text-red-400 font-bold" : "text-slate-500 hover:text-slate-300"}`}
                        >
                          // Challenge
                        </button>
                        <button
                          onClick={() => setProjectTabs(prev => ({ ...prev, [project.id]: "resolution" }))}
                          className={`flex-1 py-2 text-center transition-all cursor-pointer ${activeTab === "resolution" ? "bg-brand-bg text-emerald-400 font-bold" : "text-slate-500 hover:text-slate-300"}`}
                        >
                          // Resolution
                        </button>
                        <button
                          onClick={() => setProjectTabs(prev => ({ ...prev, [project.id]: "learnings" }))}
                          className={`flex-1 py-2 text-center transition-all cursor-pointer ${activeTab === "learnings" ? "bg-brand-bg text-brand-accent font-bold" : "text-slate-500 hover:text-slate-300"}`}
                        >
                          // Learnings
                        </button>
                      </div>

                      {/* Tabs Content */}
                      <div className="p-4 text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[90px]">
                        {activeTab === "overview" && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-slate-500 block mb-1 uppercase">// PROJECT SUMMARY & BUSINESS IMPACT:</span>
                            <p>{project.intro}</p>
                            <p className="text-[11px] text-slate-400 mt-2">
                              이 프로젝트는 가맹점의 비즈니스 생산성을 제고하기 위해 직관적인 대화형 UI 요소와 지연시간 최소화를 축으로 삼아 제작되었습니다.
                            </p>
                          </div>
                        )}
                        {activeTab === "challenge" && (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-red-400 font-mono text-[10px] uppercase">
                              <AlertTriangle className="w-3.5 h-3.5" /> // CRITICAL BOTTLENECK DETECTED:
                            </div>
                            <p className="font-semibold text-slate-200">{project.difficulties}</p>
                          </div>
                        )}
                        {activeTab === "resolution" && (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] uppercase">
                              <CheckCircle2 className="w-3.5 h-3.5" /> // TECHNICAL IMPLEMENTATION:
                            </div>
                            <p className="font-semibold text-slate-200">{project.resolution}</p>
                          </div>
                        )}
                        {activeTab === "learnings" && (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-blue-400 font-mono text-[10px] uppercase">
                              <BookOpenCheck className="w-3.5 h-3.5" /> // INSIGHTS & ENGINEERING TAKEAWAYS:
                            </div>
                            <p className="font-semibold text-slate-200">{project.learnings}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 8: Troubleshooting (Highly detailed!) */}
          <section id="troubleshooting" className="scroll-mt-24 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> 08. Real Troubleshooting Case Study
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">가장 강조하는 장애 디버깅 사례</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                단순히 '코드를 바꿨다'가 아닌, 크롬 프로파일러 계측을 기반으로 장애 원인을 정밀 규명하고 <span className="text-emerald-400">LCP 지표를 75% 단축</span>시킨 비즈니스 최적화 성과 사례입니다.
              </p>
            </div>

            {troubleshootingData.map((trouble) => (
              <div 
                key={trouble.id}
                className="rounded-lg border border-brand-border/80 bg-brand-card/90 overflow-hidden divide-y divide-brand-border/60"
              >
                {/* Case Title block */}
                <div className="p-4 sm:p-5 bg-red-950/10 flex items-start gap-3.5">
                  <TerminalIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      {trouble.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mt-0.5">
                      Case ID: {trouble.id} // System Core Performance Optimizing
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-4 text-xs sm:text-sm">
                  {/* Step 1: Problem */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block font-bold">
                      [1] Problem (현상)
                    </span>
                    <p className="text-slate-300 pl-4 border-l-2 border-red-900/60 leading-relaxed">
                      {trouble.problem}
                    </p>
                  </div>

                  {/* Step 2: Cause */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block font-bold">
                      [2] Cause (근본 원인 분석)
                    </span>
                    <div className="text-slate-300 pl-4 border-l-2 border-amber-900/60 leading-relaxed whitespace-pre-wrap">
                      {trouble.cause}
                    </div>
                  </div>

                  {/* Step 3: Solution */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                      [3] Solution & Implementation (해결책)
                    </span>
                    <div className="text-slate-300 pl-4 border-l-2 border-emerald-900/60 leading-relaxed whitespace-pre-wrap">
                      {trouble.solution}
                    </div>
                  </div>

                  {/* Step 4: Result */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">
                      [4] Quantitative Result (수치적 개선 성과)
                    </span>
                    <p className="text-slate-200 pl-4 border-l-2 border-blue-900/60 leading-relaxed font-semibold">
                      {trouble.result}
                    </p>
                  </div>

                  {/* Step 5: What I Learned */}
                  <div className="space-y-1 bg-brand-bg/40 p-4 rounded-lg border border-brand-border">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold mb-1">
                      [5] Learnings (시니어의 교훈)
                    </span>
                    <p className="text-slate-400 leading-relaxed font-sans text-xs">
                      {trouble.learnings}
                    </p>
                  </div>
                </div>

                {/* Code Diff Display Section */}
                {trouble.codeDiff && (
                  <div className="p-4 sm:p-5 bg-brand-bg/20 border-t border-brand-border/60">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                        <FileCode2 className="w-4 h-4 text-brand-accent" /> CODE COMPARISON MANUAL:
                      </span>

                      {/* Diff Mode Selector buttons */}
                      <div className="flex rounded-md border border-brand-border p-0.5 bg-brand-bg text-[10px] font-mono divide-x divide-brand-border">
                        <button 
                          onClick={() => setDiffMode("side")}
                          className={`px-2 py-0.5 rounded cursor-pointer ${diffMode === "side" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"}`}
                        >
                          Side-by-Side (PC)
                        </button>
                        <button 
                          onClick={() => setDiffMode("before")}
                          className={`px-2 py-0.5 rounded cursor-pointer ${diffMode === "before" ? "bg-red-950/50 text-red-400 font-bold" : "text-slate-400 hover:text-white"}`}
                        >
                          AS-IS Only
                        </button>
                        <button 
                          onClick={() => setDiffMode("after")}
                          className={`px-2 py-0.5 rounded cursor-pointer ${diffMode === "after" ? "bg-emerald-950/50 text-emerald-400 font-bold" : "text-slate-400 hover:text-white"}`}
                        >
                          TO-BE Only
                        </button>
                      </div>
                    </div>

                    {/* Diff Terminal */}
                    <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-950 font-mono text-[10px] sm:text-[11px] leading-relaxed">
                      
                      {/* Interactive split rendering */}
                      {diffMode === "side" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
                          {/* AS-IS */}
                          <div className="p-3 space-y-1.5 bg-red-950/5">
                            <div className="text-[9px] text-red-400 font-bold bg-red-950/30 px-2 py-0.5 rounded w-fit border border-red-900/40">
                              - AS-IS (LCP: 4.8s)
                            </div>
                            <pre className="overflow-x-auto text-slate-400 py-1 font-mono leading-normal">
                              <code>{trouble.codeDiff.before}</code>
                            </pre>
                          </div>

                          {/* TO-BE */}
                          <div className="p-3 space-y-1.5 bg-emerald-950/5">
                            <div className="text-[9px] text-emerald-400 font-bold bg-emerald-950/30 px-2 py-0.5 rounded w-fit border border-emerald-900/40">
                              + TO-BE (LCP: 1.2s // Opt-in Priority)
                            </div>
                            <pre className="overflow-x-auto text-slate-300 py-1 font-mono leading-normal">
                              <code>{trouble.codeDiff.after}</code>
                            </pre>
                          </div>
                        </div>
                      )}

                      {diffMode === "before" && (
                        <div className="p-4 bg-red-950/5">
                          <pre className="overflow-x-auto text-slate-400 font-mono leading-normal">
                            <code>{trouble.codeDiff.before}</code>
                          </pre>
                        </div>
                      )}

                      {diffMode === "after" && (
                        <div className="p-4 bg-emerald-950/5">
                          <pre className="overflow-x-auto text-slate-300 font-mono leading-normal">
                            <code>{trouble.codeDiff.after}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Section 9: System Workflow */}
          <section id="workflow" className="scroll-mt-24 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">09. System Workflow</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">작업 파이프라인 (Workflow Process)</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                아이디어 기획부터 배포, 사후 모니터링 분석까지 시니어 수준에서 밟아 나가는 체계적인 체크리스트 워크플로우를 대변합니다.
              </p>
            </div>

            <div className="space-y-4">
              {/* Process Bar Flow for Desktop */}
              <div className="hidden sm:flex items-center rounded-lg border border-brand-border bg-brand-card divide-x divide-brand-border overflow-hidden font-mono text-[10px] tracking-wider select-none">
                {workflowSteps.map((step, idx) => {
                  const isActive = idx === activeWorkflowStep;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveWorkflowStep(idx)}
                      className={`flex-1 py-3 text-center transition-all cursor-pointer ${
                        isActive 
                          ? "bg-brand-bg text-brand-accent font-bold border-b-2 border-brand-accent" 
                          : "text-slate-500 hover:text-slate-300 hover:bg-brand-bg/40"
                      }`}
                    >
                      {idx + 1}. {step.title}
                    </button>
                  );
                })}
              </div>

              {/* Mobile workflow step indicators */}
              <div className="flex sm:hidden overflow-x-auto py-1 gap-1.5 no-scrollbar font-mono text-[10px]">
                {workflowSteps.map((step, idx) => {
                  const isActive = idx === activeWorkflowStep;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveWorkflowStep(idx)}
                      className={`px-3 py-1.5 rounded-full whitespace-nowrap border shrink-0 transition-all cursor-pointer ${
                        isActive 
                          ? "bg-brand-card text-brand-accent border-brand-border font-bold" 
                          : "bg-brand-bg text-slate-500 border-brand-border/60"
                      }`}
                    >
                      {idx + 1}. {step.title}
                    </button>
                  );
                })}
              </div>

              {/* Active Step Content box */}
              <div className="p-5 rounded-lg border border-brand-border bg-brand-card/65 min-h-[140px] flex flex-col justify-between font-sans">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-brand-bg text-brand-accent border border-brand-border uppercase font-bold">
                      Active Step {activeWorkflowStep + 1} // Checklist
                    </span>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      {workflowSteps[activeWorkflowStep].title} : {workflowSteps[activeWorkflowStep].desc}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1.5">
                    {workflowSteps[activeWorkflowStep].detail}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-4 border-t border-brand-border/40 mt-4 select-none">
                  <span>Manual Workflow v1.0</span>
                  <button 
                    onClick={() => setActiveWorkflowStep(prev => (prev + 1) % workflowSteps.length)}
                    className="text-brand-accent hover:text-brand-accent-hover flex items-center gap-1.5 transition-colors cursor-pointer font-bold"
                  >
                    Next checklist step <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10: Currently Learning */}
          <section id="skills-learning" className="scroll-mt-24 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">10. Currently Learning</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">지속적 성장을 위한 러닝 마일스톤</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                어제보다 진화한 내일을 위해 현재 연구하고 도입을 준비 중인 지식 스페이스 목록입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 font-sans">
              <div className="p-4 rounded-lg bg-brand-card/40 border border-brand-border space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">// Infra Sandbox</span>
                <h4 className="text-xs font-bold text-slate-200 font-sans">Docker & Containerization</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  프로덕션과 완벽히 동기화된 가상 개발 샌드박스를 구축하고 프론트엔드 빌드 레이어를 격리하는 인프라를 실습합니다.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-brand-card/40 border border-brand-border space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">// Cloud Integration</span>
                <h4 className="text-xs font-bold text-slate-200 font-sans">AWS CloudFront & Edge Routing</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  전 세계에 분산 배포되는 정적 애셋의 CDN 캐싱 및 헤더 최적화를 구현하여 글로벌 레이턴시 극복 실험을 진행합니다.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-brand-card/40 border border-brand-border space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">// Quality Assurance</span>
                <h4 className="text-xs font-bold text-slate-200 font-sans">Testing & Playwright End-to-End</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  사용자 시나리오 기반의 브라우저 인터랙션 회귀 테스트 자동화를 통해 제품 빌드의 무결성을 보존합니다.
                </p>
              </div>
            </div>
          </section>

          {/* Section 11: System FAQ */}
          <section id="faq" className="scroll-mt-24 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">11. System FAQ</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">자주 묻는 질문 (FAQ Accordion)</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                채용 담당자들이 사전에 면접 및 서류 평가 과정에서 가장 많이 검증하고자 하시는 단골 질문들을 가감 없이 모았습니다.
              </p>
            </div>

            <div className="space-y-2 font-sans">
              {faqData.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div 
                    key={idx}
                    className={`rounded-lg border transition-all ${
                      isOpen 
                        ? "border-brand-accent bg-brand-card" 
                        : "border-brand-border bg-brand-card/15 hover:border-brand-border/80"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full text-left p-4 flex items-center justify-between cursor-pointer select-none"
                    >
                      <h3 className="text-xs sm:text-sm font-bold text-slate-200 flex items-start gap-2 font-sans">
                        <HelpCircle className="w-4.5 h-4.5 text-brand-accent shrink-0 mt-0.5" />
                        <span>{item.question}</span>
                      </h3>
                      <span className={`p-1 rounded text-slate-500 transition-transform ${isOpen ? "rotate-180 text-brand-accent" : ""}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-10 pb-4 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans border-t border-brand-border/60">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 12: Manual Diagnostics & System metadata */}
          <section id="diagnostics" className="scroll-mt-24 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">12. Diagnostics & Release</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">매뉴얼 시스템 진단 정보</h2>
              <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                Developer Manual 컨셉의 디테일을 채우는 문서 메타 및 유지보수 로그입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
              {/* Known Issues */}
              <div className="p-4 rounded-lg border border-brand-border bg-brand-card/45 space-y-2 text-xs">
                <span className="font-mono text-[10px] text-red-400 font-bold block uppercase tracking-wide">
                  ● Known Issues (인지된 빌드 결함)
                </span>
                <ul className="space-y-1.5 text-[11px] text-slate-400 list-disc list-inside font-sans">
                  {manualMetadata.knownIssues.map((issue, idx) => (
                    <li key={idx} className="leading-relaxed font-sans">{issue}</li>
                  ))}
                </ul>
              </div>

              {/* Future Update / Roadmap */}
              <div className="p-4 rounded-lg border border-brand-border bg-brand-card/45 space-y-2 text-xs">
                <span className="font-mono text-[10px] text-emerald-400 font-bold block uppercase tracking-wide">
                  ● Future Updates (다음 패치 로드맵)
                </span>
                <ul className="space-y-1.5 text-[11px] text-slate-400 list-disc list-inside font-sans">
                  {manualMetadata.futureUpdates.map((update, idx) => (
                    <li key={idx} className="leading-relaxed font-sans">{update}</li>
                  ))}
                </ul>
              </div>

              {/* Release Logs table */}
              <div className="p-4 rounded-lg border border-brand-border bg-brand-card/45 space-y-3 text-xs md:col-span-2">
                <span className="font-mono text-[10px] text-brand-accent font-bold block uppercase tracking-wide">
                  ● Changelogs & Release Logs
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-[10px] border-collapse">
                    <thead>
                      <tr className="border-b border-brand-border text-slate-500">
                        <th className="py-1.5 font-bold">VERSION</th>
                        <th className="py-1.5 font-bold">RELEASE DATE</th>
                        <th className="py-1.5 font-bold">MODIFICATIONS SUMMARY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/60 text-slate-400">
                      {manualMetadata.releaseNotes.map((note, idx) => (
                        <tr key={idx} className="hover:bg-brand-bg/50">
                          <td className="py-2 text-white font-bold">{note.version}</td>
                          <td className="py-2">{note.date}</td>
                          <td className="py-2">{note.changes.join(", ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Section 13: Contact Channels */}
          <section id="contact" className="scroll-mt-24 space-y-6 pb-20">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">13. Contact Channels</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">개발자 매뉴얼 수신 채널 (Contact)</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                궁금한 사항이 있으시거나 커피챗/협업을 제안하시려면 아래 수신 신호 채널로 시그널을 전달해 주세요.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              {/* Copy Email Card */}
              <div className="p-5 rounded-lg border border-brand-border bg-brand-card/60 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">// Target Channel</span>
                  <h4 className="text-xs font-bold text-slate-200 font-sans">Email Address</h4>
                  <p className="text-sm font-mono text-brand-accent font-bold pt-1">{contactData.email}</p>
                </div>
                <button 
                  onClick={() => copyText(contactData.email, "이메일 주소")}
                  className="w-full py-1.5 bg-brand-bg hover:bg-brand-card text-brand-accent hover:text-white transition-all text-xs font-mono font-semibold rounded border border-brand-border flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Signal Address
                </button>
              </div>

              {/* Links List Box */}
              <div className="p-5 rounded-lg border border-brand-border bg-brand-card/60 divide-y divide-brand-border/85">
                <div className="py-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono flex items-center gap-1.5">
                    <Github className="w-4.5 h-4.5 text-slate-500" /> GitHub Repo
                  </span>
                  <a href={contactData.github} target="_blank" rel="noreferrer" className="text-brand-accent hover:underline flex items-center gap-1 font-mono text-[11px]">
                    github.com/jalsalja <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="py-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono flex items-center gap-1.5">
                    <BookOpen className="w-4.5 h-4.5 text-slate-500" /> Tech Blog
                  </span>
                  <a href={contactData.blog} target="_blank" rel="noreferrer" className="text-brand-accent hover:underline flex items-center gap-1 font-mono text-[11px]">
                    velog.io/@jalsalja <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="py-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono flex items-center gap-1.5">
                    <FileText className="w-4.5 h-4.5 text-slate-500" /> Full Resume
                  </span>
                  <a href={contactData.resume} target="_blank" rel="noreferrer" className="text-brand-accent hover:underline flex items-center gap-1 font-mono text-[11px]">
                    resume.notion.site <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="py-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono flex items-center gap-1.5">
                    <Globe className="w-4.5 h-4.5 text-slate-500" /> LinkedIn
                  </span>
                  <a href={contactData.linkedin} target="_blank" rel="noreferrer" className="text-brand-accent hover:underline flex items-center gap-1 font-mono text-[11px]">
                    linkedin.com/in/kminjae <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* Manual Global Footer */}
      <footer className="w-full bg-brand-bg border-t border-brand-border py-6 px-4 font-mono text-[10px] text-slate-500 text-center select-none space-y-1">
        <p>Developer Manual System v1.4.2 // Designed & Programmed by Minjae Kim</p>
        <p className="text-slate-600">Built using React 19 + Tailwind v4 + Lucide. Sandbox Deployment Host authorized.</p>
      </footer>

      {/* Interactive Command Palette Overlay */}
      {showPalette && (
        <CommandPalette 
          onClose={() => setShowPalette(false)}
          onJump={handleJump}
          onOpenTerminal={() => setShowTerminal(true)}
          contact={contactData}
        />
      )}

      {/* Interactive Easter Egg Shell Overlay */}
      {showTerminal && (
        <DeveloperTerminal onClose={() => setShowTerminal(false)} />
      )}

      {/* Floating System Signal Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg border border-brand-border bg-brand-card/95 shadow-xl flex items-center gap-2 font-mono text-xs text-white animate-fade-in select-none">
          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-brand-bg rounded text-slate-500 hover:text-white cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

    </div>
  );
}
