import React, { useState, useEffect, useRef } from "react";
import { Search, Globe, Mail, FileText, Github, Command, Sparkles, X, Activity } from "lucide-react";

interface CommandPaletteProps {
  onClose: () => void;
  onJump: (sectionId: string) => void;
  onOpenTerminal: () => void;
  contact: {
    email: string;
    github: string;
    blog: string;
    resume: string;
  };
}

interface PaletteItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette({ onClose, onJump, onOpenTerminal, contact }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const items: PaletteItem[] = [
    {
      id: "hero",
      title: "매뉴얼 시작하기 (Hero / Overview)",
      category: "문서 바로가기",
      icon: <Sparkles className="w-4 h-4 text-slate-400" />,
      action: () => { onJump("hero"); onClose(); }
    },
    {
      id: "quick-start",
      title: "빠른 요약 (Quick Start - 핵심 역량)",
      category: "문서 바로가기",
      icon: <Globe className="w-4 h-4 text-slate-400" />,
      action: () => { onJump("quick-start"); onClose(); }
    },
    {
      id: "about-me",
      title: "스토리 & 자기소개 (About Me)",
      category: "문서 바로가기",
      icon: <FileText className="w-4 h-4 text-slate-400" />,
      action: () => { onJump("about-me"); onClose(); }
    },
    {
      id: "principles",
      title: "개발 핵심 원칙 (Operating Principles)",
      category: "문서 바로가기",
      icon: <Command className="w-4 h-4 text-slate-400" />,
      action: () => { onJump("principles"); onClose(); }
    },
    {
      id: "timeline",
      title: "성장 이력 (Timeline / Version History)",
      category: "문서 바로가기",
      icon: <Activity className="w-4 h-4 text-slate-400" />,
      action: () => { onJump("timeline"); onClose(); }
    },
    {
      id: "skills",
      title: "보유 기술 명세 (Technical Skills)",
      category: "문서 바로가기",
      icon: <Globe className="w-4 h-4 text-slate-400" />,
      action: () => { onJump("skills"); onClose(); }
    },
    {
      id: "projects",
      title: "프로젝트 분석서 (Production Projects)",
      category: "문서 바로가기",
      icon: <FileText className="w-4 h-4 text-slate-400" />,
      action: () => { onJump("projects"); onClose(); }
    },
    {
      id: "troubleshooting",
      title: "가장 중요한 장애 해결 사례 (Troubleshooting)",
      category: "문서 바로가기",
      icon: <Activity className="w-4 h-4 text-red-400" />,
      action: () => { onJump("troubleshooting"); onClose(); }
    },
    {
      id: "workflow",
      title: "프론트엔드 작업 프로세스 (System Workflow)",
      category: "문서 바로가기",
      icon: <Command className="w-4 h-4 text-slate-400" />,
      action: () => { onJump("workflow"); onClose(); }
    },
    {
      id: "faq",
      title: "자주 묻는 질문 (FAQ Accordion)",
      category: "문서 바로가기",
      icon: <Search className="w-4 h-4 text-slate-400" />,
      action: () => { onJump("faq"); onClose(); }
    },
    {
      id: "terminal",
      title: "이스터에그 대화형 터미널 열기 (Launch Shell)",
      category: "개발자 유틸리티",
      icon: <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />,
      action: () => { onOpenTerminal(); onClose(); }
    },
    {
      id: "action-email",
      title: "이메일 복사하기 (Copy: jalsalja0924@gmail.com)",
      category: "빠른 액션",
      icon: <Mail className="w-4 h-4 text-brand-accent" />,
      action: () => {
        navigator.clipboard.writeText(contact.email);
        onClose();
      }
    },
    {
      id: "action-resume",
      title: "노션 상세 이력서 열기 (Open Notion Resume)",
      category: "빠른 액션",
      icon: <FileText className="w-4 h-4 text-indigo-400" />,
      action: () => { window.open(contact.resume, "_blank"); onClose(); }
    },
    {
      id: "action-github",
      title: "깃허브 프로필 방문하기 (Visit GitHub)",
      category: "빠른 액션",
      icon: <Github className="w-4 h-4 text-slate-300" />,
      action: () => { window.open(contact.github, "_blank"); onClose(); }
    }
  ];

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems]);

  useEffect(() => {
    // Scroll selected item into view if necessary
    const selectedEl = itemsContainerRef.current?.children[selectedIndex] as HTMLElement;
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-xl overflow-hidden rounded-xl border border-brand-border bg-brand-card/95 shadow-2xl text-slate-300 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-brand-border bg-brand-bg/50">
          <Search className="w-5 h-5 mr-3 text-slate-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="원하는 문서 섹션 혹은 링크를 검색하세요... (예: 기술, 트러블, 이메일)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-slate-100 text-sm focus:ring-0 placeholder-slate-500 p-0"
            spellCheck={false}
          />
          <span className="text-[10px] bg-brand-bg px-2 py-1 rounded text-slate-400 border border-brand-border uppercase">
            ESC
          </span>
        </div>

        {/* Search Results List */}
        <div 
          ref={itemsContainerRef}
          className="max-h-[320px] overflow-y-auto py-2 divide-y divide-brand-border/10"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected 
                      ? "bg-brand-bg text-white" 
                      : "hover:bg-brand-bg/30 text-slate-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`${isSelected ? "text-brand-accent" : "text-slate-500"}`}>
                      {item.icon}
                    </span>
                    <div>
                      <span className="text-xs font-medium block">{item.title}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono bg-brand-bg/35 px-1.5 py-0.5 rounded border border-brand-border">
                    {item.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-500 text-xs">
              검색 결과가 없습니다. 다른 단어를 입력해 주세요.
            </div>
          )}
        </div>

        {/* Palette Footer */}
        <div className="px-4 py-2.5 bg-brand-bg/70 border-t border-brand-border/60 text-[10px] text-slate-500 flex items-center justify-between select-none font-mono">
          <div className="flex items-center space-x-4">
            <span>↑↓ 이동</span>
            <span>[Enter] 선택</span>
          </div>
          <span>v1.4.2 Command Router</span>
        </div>
      </div>
    </div>
  );
}��다. 다른 단어를 입력해 주세요.
            </div>
          )}
        </div>

        {/* Palette Footer */}
        <div className="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800/60 text-[10px] text-slate-500 flex items-center justify-between select-none">
          <div className="flex items-center space-x-4">
            <span>↑↓ 이동</span>
            <span>[Enter] 선택</span>
          </div>
          <span>v1.4.2 Command Router</span>
        </div>
      </div>
    </div>
  );
}
