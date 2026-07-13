import React, { useState, useRef, useEffect } from "react";
import { X, Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";

interface DeveloperTerminalProps {
  onClose: () => void;
}

export default function DeveloperTerminal({ onClose }: DeveloperTerminalProps) {
  const [history, setHistory] = useState<string[]>([
    "==================================================",
    "  DEVELOPER MANUAL INTERACTIVE TERMINAL v1.4.2   ",
    "  (c) 2026 Minjae Kim. All rights reserved.       ",
    "==================================================",
    "Type 'help' to view available commands.",
    ""
  ]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Auto-focus terminal input on load
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, `kmj-shell:~ recruiter$ ${trimmed}`];
    const args = trimmed.toLowerCase().split(" ");
    const primaryCmd = args[0];

    let response: string[] = [];

    switch (primaryCmd) {
      case "help":
        response = [
          "Available commands:",
          "  help     - Display this help message",
          "  skills   - Print key technical proficiencies and levels",
          "  contact  - Output email, blog, and portfolio URLs",
          "  about    - Print developer philosophy summary",
          "  secrets  - Access developer special easter egg information",
          "  clear    - Clear terminal history",
          "  exit     - Close this interactive terminal"
        ];
        break;
      case "skills":
        response = [
          "┌────────────────────────────────────────────────────────┐",
          "│ TECHNICAL SKILLS DIAGNOSTIC                            │",
          "├──────────────────────────┬─────────────────────────────┤",
          "│ Frontend Core            │ Expert (React 19, Next.js)  │",
          "│ Static Typing            │ Expert (TypeScript v5.8)    │",
          "│ State Syncer             │ Expert (Zustand, React Query)│",
          "│ Creative Styles          │ Expert (TailwindCSS, Motion)│",
          "│ DevOps / Host            │ Advanced (Docker, AWS, CI/CD)│",
          "└──────────────────────────┴─────────────────────────────┘"
        ];
        break;
      case "contact":
        response = [
          "CONTACT CHANNELS:",
          "  Email:      jalsalja0924@gmail.com (Fast response)",
          "  GitHub:     https://github.com/jalsalja",
          "  Blog:       https://velog.io/@jalsalja",
          "  Resume:     https://resume-kminjae.notion.site"
        ];
        break;
      case "about":
        response = [
          "\"기능을 구현하는 엔지니어를 넘어 사용자가 매끄러움에 감탄하는",
          " 사용자 중심의 완벽한 웹 인터페이스를 코딩합니다.\"",
          " - Minjae Kim, Senior Frontend Developer"
        ];
        break;
      case "secrets":
        response = [
          "🔓 [ACCESS GRANTED] EASTER EGG RECRUITER KEY FOUND!",
          "  Special Recruitment Coupon Code: 'HIRE_KIM_MINJAE_2026'",
          "  Status: Highly motivated to build high-performance web systems with your team.",
          "  Recommendation: Offer a coffee chat at jalsalja0924@gmail.com!"
        ];
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        onClose();
        return;
      default:
        response = [
          `Command not found: '${trimmed}'.`,
          "Type 'help' to see the list of valid commands."
        ];
    }

    setHistory([...newHistory, ...response, ""]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl overflow-hidden rounded-lg border border-brand-border bg-brand-bg/95 shadow-2xl font-mono text-xs text-slate-300"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-brand-border bg-brand-card select-none">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-brand-accent" /> kmj-shell (recruiter@manual)
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:bg-brand-bg hover:text-white transition-all cursor-pointer"
            title="Close terminal (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal History */}
        <div 
          ref={containerRef}
          className="p-4 h-[350px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-brand-border"
        >
          {history.map((line, idx) => (
            <div 
              key={idx} 
              className={`whitespace-pre-wrap ${
                line.startsWith("kmj-shell:~") 
                  ? "text-brand-accent font-bold" 
                  : line.includes("[ACCESS GRANTED]") 
                    ? "text-emerald-400 font-bold animate-pulse" 
                    : "text-slate-300"
              }`}
            >
              {line}
            </div>
          ))}

          {/* Terminal Input Line */}
          <div className="flex items-center pt-1 text-brand-accent font-bold">
            <span className="mr-2 select-none">kmj-shell:~ recruiter$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs focus:ring-0 p-0"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
            />
            <span className="ml-auto text-slate-500 select-none flex items-center gap-1 text-[10px]">
              press <CornerDownLeft className="w-2.5 h-2.5" /> to execute
            </span>
          </div>
        </div>

        {/* Status bar */}
        <div className="px-4 py-1.5 bg-brand-card border-t border-brand-border text-[10px] text-slate-500 flex items-center justify-between select-none">
          <span>Target: Senior Developer Evaluation Shell</span>
          <span>TTY: /dev/pts/1</span>
        </div>
      </div>
    </div>
  );
}
