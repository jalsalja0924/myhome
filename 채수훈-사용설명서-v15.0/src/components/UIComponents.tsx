import React, { useState, useEffect } from "react";

// 토스트 알림 타입
export interface ToastMessage {
  id: string;
  text: string;
  type?: "info" | "warning" | "success";
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

// 1. 토스트 알림 컴포넌트
export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 bg-brand-dark/95 border border-brand-yellow/50 text-brand-white p-4 shadow-xl font-mono text-xs clipped-corner-sm shimmer overflow-hidden animate-slide-in"
          style={{
            borderLeft: `4px solid ${
              toast.type === "warning" ? "#FF3B30" : toast.type === "success" ? "#37FF8B" : "#FFD600"
            }`,
          }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2 h-2 rounded-full led-blink"
                style={{
                  backgroundColor:
                    toast.type === "warning" ? "#FF3B30" : toast.type === "success" ? "#37FF8B" : "#FFD600",
                }}
              />
              <span className="font-bold uppercase tracking-wider text-[10px] text-brand-gray">
                {toast.type === "warning" ? "Caution" : toast.type === "success" ? "Success" : "System Notification"}
              </span>
            </div>
            <p className="text-brand-white leading-relaxed">{toast.text}</p>
          </div>
          <button
            onClick={() => onRemove(toast.id)}
            className="text-brand-gray hover:text-brand-yellow transition-colors focus:outline-none p-1"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

// 2. 이스터에그 플로팅 화분 버튼 컴포넌트
interface PlantEasterEggProps {
  onTriggerToast: (text: string, type?: "info" | "warning" | "success") => void;
}

export const PlantEasterEgg: React.FC<PlantEasterEggProps> = ({ onTriggerToast }) => {
  const [clickCount, setClickCount] = useState(0);

  const handlePlantClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount === 1) {
      onTriggerToast("작은 테이블 야자 화분입니다. 채수훈 강사가 소중히 가꾸는 중입니다.", "success");
    } else if (nextCount === 3) {
      onTriggerToast("조금만 더 만지면 과습할 것 같습니다.", "info");
    } else if (nextCount >= 5) {
      onTriggerToast("물을 너무 자주 주지 마십시오. (뿌리 썩음 주의)", "warning");
      setClickCount(0); // 5번 클릭 완료 후 카운터 리셋
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handlePlantClick}
        className="w-12 h-12 rounded-full bg-brand-card hover:bg-brand-dark border-2 border-brand-green text-brand-green flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 group focus-ring relative pulse-glow-green"
        aria-label="관상용 화물 및 식물 모듈"
        title="식물 관리 모듈"
      >
        {/* 화분 이파리 SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 transition-transform group-hover:rotate-12"
          aria-hidden="true"
        >
          <path d="M12 22v-8" />
          <path d="M12 14c-1.5-1.5-3.5-2-5.5-2a9 9 0 0 0-4.5 1" />
          <path d="M12 14c1.5-1.5 3.5-2 5.5-2a9 9 0 0 1 4.5 1" />
          <path d="M12 10c-1.5-1.5-3.5-2-5.5-2a9 9 0 0 0-4.5 1" />
          <path d="M12 10c1.5-1.5 3.5-2 5.5-2a9 9 0 0 1 4.5 1" />
          <path d="M12 6c-1.5-1.5-3.5-2-5.5-2a9 9 0 0 0-4.5 1" />
          <path d="M12 6c1.5-1.5 3.5-2 5.5-2a9 9 0 0 1 4.5 1" />
        </svg>
        <span className="absolute -top-1 -right-1 bg-brand-green text-brand-dark font-mono text-[9px] font-bold px-1 rounded">
          H2O
        </span>
      </button>
    </div>
  );
};

// 3. 바코드 데코레이션 SVG
export const BarcodeDecorator: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-end gap-[2px] opacity-60 font-mono text-[8px] text-brand-gray ${className}`}>
      <div className="w-[2px] h-6 bg-brand-white"></div>
      <div className="w-[1px] h-6 bg-brand-white"></div>
      <div className="w-[3px] h-6 bg-brand-white"></div>
      <div className="w-[1px] h-6 bg-brand-white"></div>
      <div className="w-[4px] h-6 bg-brand-white"></div>
      <div className="w-[1px] h-6 bg-brand-white"></div>
      <div className="w-[2px] h-6 bg-brand-white"></div>
      <div className="w-[1px] h-6 bg-brand-white"></div>
      <div className="w-[3px] h-6 bg-brand-white"></div>
      <span className="ml-1 tracking-widest leading-none self-center">CHAE-15.0-GJW</span>
    </div>
  );
};

// 4. 산업용 주의 테이프 / 경고 바
export const WarningTape: React.FC<{ text?: string }> = ({ text = "WARNING: HIGH DENSITY MULTITOOL CAPACITY" }) => {
  return (
    <div className="w-full bg-brand-yellow text-brand-dark font-mono text-[10px] font-bold py-1 overflow-hidden whitespace-nowrap flex select-none border-y border-brand-dark uppercase tracking-wider">
      <div className="animate-marquee inline-flex gap-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="inline-block">
            /// {text} /// WARNING: NO REST MODE DETECTED ///
          </span>
        ))}
      </div>
    </div>
  );
};

// 5. 제품 검수 승인 도장 (QC Approved Stamp)
export const InspectionStamp: React.FC = () => {
  return (
    <div className="stamp border-brand-green text-brand-green opacity-80 inline-flex flex-col items-center p-2 rounded-sm rotate-[-6deg] text-center select-none max-w-[120px] bg-brand-bg/40 backdrop-blur-xs">
      <span className="text-[9px] font-mono tracking-widest uppercase">QUALITY OK</span>
      <span className="text-sm font-sans font-black border-y border-dashed border-brand-green/50 my-1 py-[2px] px-2">
        채 수 훈
      </span>
      <span className="text-[8px] font-mono tracking-tighter">VER 15.0 DETECTED</span>
    </div>
  );
};

// 6. 프로젝트 커스텀 추상 그래픽 썸네일
export const ProjectThumbnail: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case "001": // BI / 브랜드
      return (
        <div className="w-full h-40 bg-brand-card flex items-center justify-center relative overflow-hidden border-b border-brand-yellow/20">
          <div className="absolute inset-0 bg-dot-grid opacity-30" />
          <svg className="w-24 h-24 text-brand-yellow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <rect x="35" y="35" width="30" height="30" stroke="#37FF8B" strokeWidth="1" />
            <path d="M10 20 L25 10 L40 20" stroke="currentColor" strokeWidth="1" />
          </svg>
          <div className="absolute bottom-2 left-2 font-mono text-[9px] text-brand-gray bg-brand-bg/80 px-1 border border-brand-gray/30">
            SCHEMATIC: BRANDING_001
          </div>
        </div>
      );
    case "002": // 축제 디자인
      return (
        <div className="w-full h-40 bg-brand-card flex items-center justify-center relative overflow-hidden border-b border-brand-yellow/20">
          <div className="absolute inset-0 bg-dot-grid opacity-30" />
          <svg className="w-24 h-24 text-brand-green" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50 Q30 20 50 50 T90 50" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M10 60 Q30 80 50 60 T90 60" stroke="#FFD600" strokeWidth="1" fill="none" />
            <circle cx="30" cy="35" r="4" fill="currentColor" />
            <circle cx="70" cy="65" r="4" fill="#FF3B30" className="led-blink" />
            <rect x="15" y="15" width="70" height="70" stroke="currentColor" strokeWidth="0.5" />
            <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>
          <div className="absolute bottom-2 left-2 font-mono text-[9px] text-brand-gray bg-brand-bg/80 px-1 border border-brand-gray/30">
            WAVEFORM: VISUAL_FEST
          </div>
        </div>
      );
    case "003": // 기업 홍보 디자인
      return (
        <div className="w-full h-40 bg-brand-card flex items-center justify-center relative overflow-hidden border-b border-brand-yellow/20">
          <div className="absolute inset-0 bg-dot-grid opacity-30" />
          <svg className="w-24 h-24 text-brand-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="20" width="50" height="60" stroke="currentColor" strokeWidth="2" />
            <line x1="30" y1="30" x2="70" y2="30" stroke="#FFD600" strokeWidth="3" />
            <line x1="30" y1="42" x2="60" y2="42" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="52" x2="65" y2="52" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="62" x2="55" y2="62" stroke="currentColor" strokeWidth="1" />
            <circle cx="70" cy="70" r="5" fill="#37FF8B" />
            <path d="M75 15 L85 25 L65 45" stroke="#FF3B30" strokeWidth="1" />
          </svg>
          <div className="absolute bottom-2 left-2 font-mono text-[9px] text-brand-gray bg-brand-bg/80 px-1 border border-brand-gray/30">
            LAYOUT: COM_TEMPLATE
          </div>
        </div>
      );
    case "004": // AI 숏폼 교육
      return (
        <div className="w-full h-40 bg-brand-card flex items-center justify-center relative overflow-hidden border-b border-brand-yellow/20">
          <div className="absolute inset-0 bg-dot-grid opacity-30" />
          <svg className="w-24 h-24 text-brand-yellow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="15" width="30" height="70" rx="5" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="78" r="3" fill="currentColor" />
            <polygon points="45,40 45,60 60,50" fill="#37FF8B" />
            <path d="M20 30 Q30 35 30 20" stroke="#FF3B30" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M80 50 Q70 65 80 80" stroke="#37FF8B" strokeWidth="1.5" />
            <circle cx="20" cy="30" r="2" fill="#FF3B30" />
            <circle cx="80" cy="50" r="2.5" fill="#37FF8B" />
          </svg>
          <div className="absolute bottom-2 left-2 font-mono text-[9px] text-brand-gray bg-brand-bg/80 px-1 border border-brand-gray/30">
            TIMELINE: AI_SHORTFORM
          </div>
        </div>
      );
    case "005": // AI CBT 웹앱
      return (
        <div className="w-full h-40 bg-brand-card flex items-center justify-center relative overflow-hidden border-b border-brand-yellow/20">
          <div className="absolute inset-0 bg-dot-grid opacity-30" />
          <svg className="w-24 h-24 text-brand-green" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="20" width="70" height="50" rx="3" stroke="currentColor" strokeWidth="2" />
            <rect x="35" y="70" width="30" height="10" stroke="currentColor" strokeWidth="1.5" />
            <line x1="25" y1="80" x2="75" y2="80" stroke="currentColor" strokeWidth="2" />
            <text x="25" y="45" fill="#FFD600" fontSize="10" fontFamily="monospace" fontWeight="bold">&gt; RUN CBT</text>
            <rect x="25" y="52" width="40" height="6" fill="#37FF8B" />
            <circle cx="75" cy="28" r="2" fill="#FF3B30" className="led-blink" />
          </svg>
          <div className="absolute bottom-2 left-2 font-mono text-[9px] text-brand-gray bg-brand-bg/80 px-1 border border-brand-gray/30">
            COMPILER: CBT_ENGINE
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full h-40 bg-brand-card flex items-center justify-center relative overflow-hidden border-b border-brand-yellow/20">
          <div className="absolute inset-0 bg-dot-grid opacity-30" />
          <div className="font-mono text-xs text-brand-gray">N/A GRAPHIC</div>
        </div>
      );
  }
};
