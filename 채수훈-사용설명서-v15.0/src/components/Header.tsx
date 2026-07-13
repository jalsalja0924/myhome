import React, { useState, useEffect } from "react";
import { navigationItems } from "../data";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // 스크롤 시 현재 활성화된 섹션을 감지하여 하이라이트 (Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // 오프셋 설정

      // 각 섹션의 top 위치 파악
      for (const item of navigationItems) {
        const targetId = item.href.substring(1);
        const element = document.getElementById(targetId);
        
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(targetId);
            return;
          }
        }
      }

      // 디폴트는 첫 섹션인 home
      if (window.scrollY < 200) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-[12px] md:top-[16px] left-[12px] md:left-[16px] right-[12px] md:right-[16px] z-50 bg-[#0B0B0B]/90 backdrop-blur-md border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 로고 영역 */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block bg-[#FFD600] text-black px-2 py-0.5 font-bold text-[10px] tracking-tighter uppercase italic">
            System Status: Stable
          </div>
          <a 
            href="#home" 
            className="flex items-center gap-2 group font-mono focus-ring focus:outline-none"
            aria-label="채수훈 사용설명서 홈으로"
          >
            <span className="w-2 h-2 rounded-full bg-brand-yellow led-blink" />
            <span className="text-brand-white font-black tracking-widest text-sm sm:text-base group-hover:text-brand-yellow transition-colors">
              CHAE <span className="text-brand-yellow">v15.0_</span>
            </span>
          </a>
        </div>

        {/* 데스크톱 내비게이션 링크 */}
        <nav className="hidden lg:flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest">
          {navigationItems.map((item, index) => {
            const targetId = item.href.substring(1);
            const isActive = activeSection === targetId;
            return (
              <a
                key={index}
                href={item.href}
                className={`transition-all focus-ring focus:outline-none text-[11px] font-bold tracking-widest ${
                  isActive ? "text-[#FFD600]" : "text-[#A0A0A0] hover:text-white"
                }`}
              >
                [ {item.label} ]
              </a>
            );
          })}
        </nav>

        {/* 연결 통계 인디케이터 */}
        <div className="text-[10px] font-mono text-[#37FF8B] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#37FF8B] animate-pulse"></div>
          <span className="hidden sm:inline">CONNECTING_TO_LAB_02</span>
        </div>

        {/* 모바일 햄버거 토글 버튼 */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-brand-gray hover:text-brand-white focus-ring focus:outline-none rounded transition-colors"
          aria-expanded={mobileMenuOpen}
          aria-label="전체 내비게이션 메뉴 열기"
          style={{ minWidth: "44px", minHeight: "44px" }}
        >
          {mobileMenuOpen ? (
            // Close icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 모바일 전체화면 드롭다운 메뉴 */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-brand-bg border-b border-brand-white/10 px-4 pt-2 pb-6 space-y-1 animate-fade-in focus-ring" tabIndex={0}>
          {navigationItems.map((item, index) => {
            const targetId = item.href.substring(1);
            const isActive = activeSection === targetId;
            return (
              <a
                key={index}
                href={item.href}
                onClick={handleMobileLinkClick}
                className={`block px-4 py-3 text-sm font-sans font-bold tracking-wider transition-colors border-l-2 focus-ring focus:outline-none ${
                  isActive 
                    ? "text-brand-yellow bg-brand-yellow/5 border-brand-yellow" 
                    : "text-brand-gray border-transparent hover:text-brand-white"
                }`}
                style={{ minHeight: "44px" }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
};
