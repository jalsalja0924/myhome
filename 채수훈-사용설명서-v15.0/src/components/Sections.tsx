import React, { useState, useEffect, useRef } from "react";
import { 
  navigationItems, 
  contactInformation, 
  mainFeatures, 
  warningItems, 
  roleCards, 
  abilitiesData, 
  skillCategories, 
  systemCommands, 
  projectItems, 
  systemUsageData, 
  reviewItems, 
  patchNoteData, 
  knownBugs 
} from "../data";
import { ProjectThumbnail, BarcodeDecorator, InspectionStamp, WarningTape } from "./UIComponents";

interface SectionProps {
  onTriggerToast: (text: string, type?: "info" | "warning" | "success") => void;
}

// 1. HERO SECTION (#home)
export const Hero: React.FC<SectionProps> = ({ onTriggerToast }) => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  // 주요 기능 순환 효과
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % mainFeatures.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleDecorativeButtonClick = () => {
    onTriggerToast("왜 눌렀습니까? 역시 호기심이 많으시군요.", "warning");
  };

  return (
    <section id="home" className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto bg-dot-grid relative min-h-screen flex flex-col justify-center">
      {/* 장식용 스티커 */}
      <div className="absolute top-28 right-8 hidden xl:block">
        <InspectionStamp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 왼쪽: 메인 제품 설명 */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/10 border border-brand-yellow text-brand-yellow rounded-sm font-mono text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-yellow led-blink" />
              SYSTEM ACTIVE: CHAE v15.0
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-brand-white leading-tight tracking-tight">
              채수훈 <span className="text-brand-yellow">v15.0</span>
            </h1>

            <p className="text-xl sm:text-2xl font-sans font-bold text-brand-green leading-snug border-l-4 border-brand-green pl-4">
              디자인 강사인 줄 알았는데
              <br className="sm:hidden" /> AI·영상·웹까지 하고 있음
            </p>

            <p className="text-base text-brand-gray leading-relaxed max-w-xl">
              포토샵부터 생성형 AI, 영상, 유튜브, 웹 배포까지.
              <br />
              지루한 이론 습득 대신, 초보자도 기획 단계부터 완성형 배포 단계까지 직접 결과물을 만들 수 있도록 지원하는 <strong>‘인간형 멀티툴 교육 하드웨어’</strong>입니다.
            </p>

            {/* 주의 문구 */}
            <div className="p-3 bg-brand-red/10 border border-brand-red/30 rounded-sm text-brand-red font-mono text-xs max-w-xl">
              ※ 새로운 기능이 지나치게 자주 추가됩니다. (업데이트 피로 조심)
            </div>

            {/* 현재 활성화된 기능 로더 */}
            <div className="flex items-center gap-3 py-2">
              <span className="font-mono text-xs text-brand-gray uppercase">Active Module:</span>
              <div className="px-2.5 py-1 bg-brand-card border border-brand-white/10 text-brand-white text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 rounded">
                <span className="w-1.5 h-1.5 bg-brand-green rounded-full led-blink" />
                {mainFeatures[activeFeatureIndex]}
              </div>
            </div>
          </div>

          {/* 주요 상호작용 버튼 */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#about"
              className="px-6 py-3 bg-brand-light hover:bg-brand-white text-brand-dark font-sans font-bold text-sm transition-all focus-ring focus:outline-none flex items-center gap-2 hover:scale-102 cursor-pointer clipped-corner-sm"
              style={{ minHeight: "44px" }}
            >
              사용설명서 열기
              <span className="font-mono">&gt;</span>
            </a>
            <a
              href="#abilities"
              className="px-6 py-3 bg-brand-card hover:bg-brand-dark text-brand-yellow border border-brand-yellow/30 hover:border-brand-yellow font-sans font-bold text-sm transition-all focus-ring focus:outline-none flex items-center gap-2 cursor-pointer"
              style={{ minHeight: "44px" }}
            >
              능력치 확인
            </a>
            <a
              href="#projects"
              className="px-6 py-3 bg-brand-card hover:bg-brand-dark text-brand-white border border-brand-white/10 hover:border-brand-white font-sans font-semibold text-sm transition-all focus-ring focus:outline-none flex items-center gap-2 cursor-pointer"
              style={{ minHeight: "44px" }}
            >
              작업물 몰래 보기
            </a>
            <button
              onClick={handleDecorativeButtonClick}
              className="px-4 py-3 bg-brand-red/10 hover:bg-brand-red/20 text-brand-red border border-brand-red/30 font-mono text-xs transition-all focus-ring focus:outline-none"
              style={{ minHeight: "44px" }}
            >
              아무 기능 없는 버튼
            </button>
          </div>
        </div>

        {/* 오른쪽: RPG 캐릭터 스타일 사용 설명서 명판 */}
        <div className="lg:col-span-5">
          <div className="bg-brand-card border-2 border-brand-white/10 p-6 rounded-md shadow-2xl relative overflow-hidden focus-ring scanlines" tabIndex={0}>
            {/* 가짜 스캔 라인 및 상단 장식바 */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-yellow" />
            <div className="flex justify-between items-center mb-6 border-b border-brand-white/10 pb-4">
              <span className="font-mono text-xs text-brand-yellow font-bold uppercase tracking-widest">
                UNIT SPECIFICATIONS
              </span>
              <span className="font-mono text-[10px] text-brand-gray">ID: CHAE-150-SYS</span>
            </div>

            {/* 제품 정보 리스트 */}
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between border-b border-brand-white/5 py-1.5">
                <span className="text-brand-gray">이름 (Name)</span>
                <span className="text-brand-white font-bold">{contactInformation.name}</span>
              </div>
              <div className="flex justify-between border-b border-brand-white/5 py-1.5">
                <span className="text-brand-gray">제품 유형 (Type)</span>
                <span className="text-brand-yellow font-bold text-right">인간형 디자인·AI 교육 멀티툴</span>
              </div>
              <div className="flex justify-between border-b border-brand-white/5 py-1.5">
                <span className="text-brand-gray">공식 직업 (Class)</span>
                <span className="text-brand-white">디자인 전문강사</span>
              </div>
              <div className="flex justify-between border-b border-brand-white/5 py-1.5">
                <span className="text-brand-gray">실제 업무 (Actual Role)</span>
                <span className="text-brand-green font-bold">쉽게 설명하기 & 완성시키기</span>
              </div>
              <div className="flex justify-between border-b border-brand-white/5 py-1.5">
                <span className="text-brand-gray">활동 지역 (Region)</span>
                <span className="text-brand-white">{contactInformation.location}</span>
              </div>
              <div className="flex justify-between border-b border-brand-white/5 py-1.5">
                <span className="text-brand-gray">현재 상태 (Status)</span>
                <span className="text-brand-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-green led-blink" />
                  또 새로운 툴 배우는 중
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-brand-gray">휴식 기능 (Sleep Mode)</span>
                <span className="text-brand-red font-semibold animate-pulse">아직 지원되지 않음 (미구현)</span>
              </div>
            </div>

            {/* 하단 데코레이터 */}
            <div className="mt-6 pt-4 border-t border-brand-white/10 flex justify-between items-center">
              <BarcodeDecorator />
              <div className="w-16 h-4 border border-brand-white/20 flex items-center justify-around px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gray" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 2. WARNING SECTION (#about)
export const WarningSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-brand-card/30 border-y border-brand-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-block px-3 py-1 bg-brand-red/15 border border-brand-red/30 text-brand-red font-mono text-[10px] uppercase tracking-wider rounded-xs font-bold">
            CAUTION: OPERATIONAL SAFETY MANUAL
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
            사용 전 반드시 읽어주세요
          </h2>
          <p className="text-base text-brand-gray max-w-xl mx-auto">
            작동 중 고장이나 에러로 오해하기 쉬운 대표적인 <strong>정상 작동 패턴</strong>입니다.
          </p>
        </div>

        {/* 주의 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warningItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-brand-card border border-brand-white/15 hover:border-brand-yellow/40 p-5 rounded-md transition-all group relative focus-ring"
              tabIndex={0}
            >
              <div className="absolute top-4 right-4 font-mono text-xs text-brand-red font-semibold group-hover:scale-110 transition-transform">
                ⚠️ C-{String(index + 1).padStart(3, "0")}
              </div>
              <div className="flex items-start gap-3 mt-4">
                <span className="font-mono text-lg font-bold text-brand-yellow leading-none">0{index + 1}.</span>
                <p className="text-sm text-brand-white font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            </div>
          ))}

          {/* 한 가지 일을 하다가 프로젝트... 특별 카드 */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-brand-yellow text-brand-dark p-6 rounded-md relative overflow-hidden focus-ring">
            <div className="absolute top-0 right-0 h-full w-24 bg-brand-dark/5 flex items-center justify-center font-mono text-6xl font-black select-none pointer-events-none uppercase">
              FACT
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold bg-brand-dark text-brand-yellow px-2 py-0.5 rounded uppercase">
                  CORE SYSTEM BEHAVIOR
                </span>
                <h3 className="text-lg sm:text-xl font-sans font-black leading-tight mt-1">
                  한 가지 일을 하다가 갑자기 새로운 프로젝트를 시작합니다.
                </h3>
                <p className="text-sm font-semibold opacity-90 font-mono">
                  &gt; 고장 코드가 아닌 채수훈 멀티툴 시스템의 ‘기본 내장 속성’입니다.
                </p>
              </div>
              <div className="inline-block shrink-0 px-4 py-2 border-2 border-brand-dark font-mono text-xs font-black rotate-[-2deg] bg-brand-yellow">
                CORE STATUS: NOMINAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 3. ROLE SECTION ("도대체 무슨 일을 하는 사람인가?")
export const RoleSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
          도대체 무슨 일을 하는 사람인가?
        </h2>
        <p className="text-lg text-brand-green font-bold max-w-2xl mx-auto leading-relaxed">
          “디자인을 가르치지만, 실제로는 사람들이 아이디어를 결과물로 만들도록 돕습니다.”
        </p>
      </div>

      {/* 역할 설명 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roleCards.map((card, index) => (
          <div 
            key={index} 
            className="bg-brand-card/50 border border-brand-white/10 hover:bg-brand-card p-6 rounded-md hover:border-brand-green/30 transition-all flex flex-col justify-between group focus-ring relative overflow-hidden"
            tabIndex={0}
          >
            {/* 좌상단 기하학 라인 */}
            <div className="absolute top-0 left-0 w-8 h-1 bg-brand-green/40 group-hover:w-full transition-all duration-300" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-brand-gray font-semibold">MODULE_0{index + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              </div>
              <h3 className="text-xl font-sans font-black text-brand-white group-hover:text-brand-green transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-brand-gray leading-relaxed font-sans">
                {card.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-brand-gray border-t border-brand-white/5 pt-4">
              <span>SYS_CODE: ACTIVE</span>
              <span>VER 15.0</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 4. ABILITY SECTION (#abilities)
export const AbilitySection: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="abilities" ref={sectionRef} className="py-20 px-4 md:px-8 bg-brand-card/20 border-y border-brand-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-block px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow font-mono text-[10px] uppercase tracking-widest rounded-xs">
            HARDWARE PERFORMANCE BENCHMARK
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
            제품 성능 측정 결과
          </h2>
          <p className="text-base text-brand-gray max-w-xl mx-auto">
            RPG 게임의 영웅 능력치 창 형식으로 검증된 채수훈 시스템의 리소스 성능 상태를 나타냅니다.
          </p>
        </div>

        {/* RPG 스타일 스태츠 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {abilitiesData.map((stat, index) => {
            const isRest = stat.name === "휴식 능력";
            const isLimit = stat.name === "적당히 끝내기";
            
            return (
              <div 
                key={index} 
                className="bg-brand-card border border-brand-white/10 p-5 rounded-md flex flex-col justify-between focus-ring hover:bg-brand-card/80 transition-all"
                tabIndex={0}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="space-y-1">
                    <span className="text-sm font-mono text-brand-gray uppercase tracking-wider block">
                      STAT_0{index + 1}
                    </span>
                    <h3 className="text-base font-sans font-black text-brand-white">
                      {stat.name}
                    </h3>
                  </div>
                  <div className="font-mono text-lg font-bold">
                    {isRest ? (
                      <span className="text-brand-red text-xs px-2 py-0.5 bg-brand-red/10 border border-brand-red/20 uppercase animate-pulse">
                        측정 실패
                      </span>
                    ) : (
                      <span className={isLimit ? "text-brand-red" : "text-brand-yellow"}>
                        {stat.value} <span className="text-xs text-brand-gray">/ 100</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 프로그레스 바 */}
                <div className="w-full bg-brand-dark h-3 rounded-full overflow-hidden border border-brand-white/5 relative my-3">
                  <div 
                    className="h-full rounded-full transition-all duration-1200 ease-out"
                    style={{ 
                      width: animate ? `${stat.value}%` : "0%",
                      backgroundColor: isRest ? "#FF3B30" : isLimit ? "#FF3B30" : "#FFD600"
                    }}
                  />
                  {isRest && (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-brand-red uppercase font-semibold">
                      ERROR_NOT_FOUND
                    </div>
                  )}
                </div>

                <p className="text-xs text-brand-gray font-mono mt-1 leading-relaxed">
                  // {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// 5. SKILL SECTION (#skills)
export const SkillSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; description: string } | null>(null);

  const handleSkillHover = (name: string, description: string) => {
    setSelectedSkill({ name, description });
  };

  return (
    <section id="skills" className="py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-block px-3 py-1 bg-brand-green/10 border border-brand-green/30 text-brand-green font-mono text-[10px] uppercase tracking-widest rounded-xs">
          PRE-INSTALLED PLUGINS
        </div>
        <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
          현재 설치된 기능
        </h2>
        <p className="text-base text-brand-gray max-w-xl mx-auto">
          마우스를 올리거나 터치하여 하드웨어 모듈에 수록된 각 소프트웨어 기능에 대한 상세 명세서를 읽을 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 왼쪽: 카테고리별 스킬 칩 리스트 */}
        <div className="lg:col-span-8 space-y-8">
          {skillCategories.map((category, catIdx) => (
            <div key={catIdx} className="bg-brand-card/40 border border-brand-white/5 p-6 rounded-md space-y-4">
              <h3 className="font-mono text-xs text-brand-green font-bold uppercase tracking-wider border-b border-brand-white/10 pb-2">
                &gt; {category.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, skillIdx) => {
                  const isHovered = selectedSkill?.name === skill.name;
                  return (
                    <button
                      key={skillIdx}
                      onMouseEnter={() => handleSkillHover(skill.name, skill.description)}
                      onFocus={() => handleSkillHover(skill.name, skill.description)}
                      onClick={() => handleSkillHover(skill.name, skill.description)}
                      className={`px-3 py-2 border transition-all text-sm font-mono text-left focus-ring rounded focus:outline-none ${
                        isHovered 
                          ? "bg-brand-green text-brand-dark border-brand-green font-bold scale-102" 
                          : "bg-brand-card border-brand-white/10 hover:border-brand-green/50 text-brand-white"
                      }`}
                      style={{ minHeight: "44px" }}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽: 스킬 툴팁 설명 패널 (Sticky) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-brand-card border-2 border-brand-green/30 p-6 rounded-md shadow-xl relative min-h-[220px] flex flex-col justify-between focus-ring" tabIndex={0}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-brand-white/10 pb-3">
                <span className="font-mono text-[10px] text-brand-green uppercase tracking-widest font-bold">
                  MODULE EXPLAINER
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-green led-blink" />
              </div>

              {selectedSkill ? (
                <div className="space-y-3">
                  <h4 className="text-xl font-sans font-black text-brand-white">
                    {selectedSkill.name}
                  </h4>
                  <p className="text-sm text-brand-gray leading-relaxed font-sans">
                    {selectedSkill.description}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 py-6 text-center lg:text-left">
                  <p className="text-sm text-brand-gray font-mono italic">
                    스킬 칩을 클릭하거나 마우스를 올려 사양서를 로드하십시오.
                  </p>
                  <p className="text-[11px] text-brand-gray font-mono">
                    (모바일 환경에서는 칩을 터치하면 상세 내용이 이곳에 상주합니다.)
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-brand-white/10 text-[10px] font-mono text-brand-gray">
              SYS STATUS: REAL-TIME_LOAD_NOMINAL
            </div>
          </div>
        </div>
      </div>

      {/* 하단 문구 */}
      <div className="bg-brand-card border border-dashed border-brand-white/15 p-4 rounded text-center">
        <p className="text-xs text-brand-gray font-mono leading-relaxed">
          스킬은 계속 추가되고 있으며, 강사 본인도 가끔 설치된 전체 리스트를 정확히 파악하지 못할 만큼 학습 루프가 빠릅니다.
        </p>
      </div>
    </section>
  );
};

// 6. FORMULA SECTION ("채수훈식 수업 공식" & 알고리즘)
export const FormulaSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-brand-card/10 border-y border-brand-white/5">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
            채수훈식 결과물 생성 공식
          </h2>
          <p className="text-base text-brand-gray">
            복잡하게 생각할 필요 없습니다. 공식에 맞춰서 밀고 나가면 어떻게든 나오게 되어 있습니다.
          </p>
        </div>

        {/* 터미널 코드 블록 */}
        <div className="bg-brand-dark border-2 border-brand-white/10 rounded-md overflow-hidden focus-ring shadow-2xl scanlines" tabIndex={0}>
          {/* 터미널 헤더 */}
          <div className="bg-brand-card px-4 py-2 flex items-center justify-between border-b border-brand-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-brand-red/70" />
              <span className="w-3 h-3 rounded-full bg-brand-yellow/70" />
              <span className="w-3 h-3 rounded-full bg-brand-green/70" />
            </div>
            <span className="font-mono text-xs text-brand-gray">ALGORITHM_COMPILER.cpp</span>
            <div className="w-4" />
          </div>

          {/* 터미널 본문 */}
          <div className="p-6 font-mono text-sm space-y-6">
            <div className="space-y-2 border-b border-brand-white/5 pb-4">
              <p className="text-brand-gray">// INPUT STATE (수업 시작 시 상태)</p>
              <p className="text-brand-red font-bold">const userState = &quot;막막함&quot;;</p>
            </div>

            <div className="space-y-2 border-b border-brand-white/5 pb-4">
              <p className="text-brand-gray">// CHAE_SOO_HOON SYSTEM FUNCTION</p>
              <div className="text-brand-white pl-4 space-y-1.5 border-l-2 border-brand-yellow/40">
                <p>+ 쉬운 설명</p>
                <p>+ 바로 따라 하는 실습</p>
                <p>+ 반복 수정 (피드백 루프)</p>
                <p>+ AI 조금 (생성형 AI 어시스턴트)</p>
                <p>+ 디자인 프로그램 많이 (Photoshop, Illustrator 등)</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-brand-gray">// COMPILED OUTPUT (결과물 출하 완료)</p>
              <p className="text-brand-green text-lg font-black tracking-wide">
                = &quot;내가 만든 실제 결과물&quot; <span className="text-xs font-normal text-brand-gray">(OUTPUT_SUCCESS)</span>
              </p>
            </div>
          </div>
        </div>

        {/* 알고리즘 순서 (1-7) */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs text-brand-gray font-bold uppercase tracking-wider text-center">
            &gt; 수업 진행 메커니즘 (알고리즘)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {[
              "완성 결과물을 먼저 보여준다.",
              "“이걸 어떻게 만들지?” 생각 유도.",
              "기능을 가장 쉽게 설명한다.",
              "다 같이 직접 만들어본다.",
              "안 되면 다시 설명한다.",
              "그래도 안 되면 옆에서 1:1 보조.",
              "결국 무조건 완성시킨다."
            ].map((step, idx) => (
              <div 
                key={idx} 
                className="bg-brand-card border border-brand-white/5 p-4 rounded-md relative text-center focus-ring hover:border-brand-yellow/30 transition-all flex flex-col justify-between"
                tabIndex={0}
              >
                <span className="font-mono text-xs font-bold text-brand-yellow block mb-2">0{idx + 1}</span>
                <p className="text-xs text-brand-white leading-relaxed font-sans">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 경고 문구 */}
        <div className="text-center font-mono text-xs text-brand-red bg-brand-red/5 p-3 border border-brand-red/10 rounded-sm">
          ※ 해당 교육과정에서 &apos;포기&apos; 버튼은 아예 구현하지 않았습니다. 끝장을 봅니다.
        </div>
      </div>
    </section>
  );
};

// 7. COMMAND SECTION ("최근 입력된 주요 명령어")
export const CommandSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
          최근 입력된 주요 명령어
        </h2>
        <p className="text-base text-brand-gray">
          클라이언트(수강생/의뢰인)의 다소 추상적인 피드백 명령을 수신하여 실시간 보정하는 내장 통역 모듈 로그입니다.
        </p>
      </div>

      {/* 대화 터미널 창 */}
      <div className="bg-brand-card border border-brand-white/10 rounded-md overflow-hidden font-mono text-xs sm:text-sm focus-ring shadow-xl" tabIndex={0}>
        <div className="bg-brand-dark/50 px-4 py-3 border-b border-brand-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-green led-blink" />
            <span className="text-[10px] text-brand-gray font-bold tracking-wider">FEEDBACK_PARSER.LOG</span>
          </div>
          <span className="text-[9px] text-brand-gray">STATUS: STREAMING...</span>
        </div>

        <div className="p-5 space-y-4 divide-y divide-brand-white/5">
          {systemCommands.map((item, index) => (
            <div key={index} className="pt-3 first:pt-0 space-y-1.5 animate-fade-in">
              <div className="flex items-start gap-2 text-brand-yellow font-bold">
                <span className="text-brand-gray shrink-0">[USER]</span>
                <span>&quot;{item.user}&quot;</span>
              </div>
              <div className="flex items-start gap-2 text-brand-green pl-4">
                <span className="text-brand-gray shrink-0">[SYSTEM]</span>
                <span className="leading-relaxed">&gt; {item.system}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 8. PROJECT SECTION (#projects)
export const ProjectSection: React.FC = () => {
  return (
    <section id="projects" className="py-20 px-4 md:px-8 bg-brand-card/20 border-y border-brand-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-block px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow font-mono text-[10px] uppercase tracking-widest rounded-xs">
            SECURITY CLASSIFIED: INCIDENT FILES
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
            처리 완료된 주요 사건
          </h2>
          <p className="text-base text-brand-gray max-w-xl mx-auto">
            채수훈 멀티툴을 가동하여 안전하고 높은 만족도로 완결한 핵심 실무 및 교육 설계 사건 일지입니다.
          </p>
        </div>

        {/* 프로젝트 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectItems.map((project) => (
            <div 
              key={project.id} 
              className="bg-brand-card border border-brand-white/10 hover:border-brand-yellow/40 transition-all rounded-md overflow-hidden flex flex-col justify-between group focus-ring relative"
              tabIndex={0}
            >
              {/* 사건 파일 넘버링 및 기밀 스탬프 */}
              <div className="absolute top-2 right-2 z-20 font-mono text-[9px] bg-brand-dark/80 text-brand-yellow px-2 py-0.5 rounded border border-brand-yellow/30">
                CASE #{project.id}
              </div>

              {/* 추상 그래픽 썸네일 */}
              <ProjectThumbnail type={project.id} />

              {/* 사건 세부 내용 */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-brand-green font-bold uppercase tracking-wider block">
                    {project.type}
                  </span>
                  <h3 className="text-lg font-sans font-black text-brand-white group-hover:text-brand-yellow transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-brand-gray leading-relaxed font-sans">
                    {project.content}
                  </p>
                </div>

                {/* 관련 작업 / 담당 기능 */}
                {project.details && project.details.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-brand-white/5">
                    <span className="font-mono text-[9px] text-brand-gray font-semibold block">
                      [사건 기록 / 내역]
                    </span>
                    <ul className="text-xs text-brand-white font-mono space-y-1 pl-3.5 list-disc">
                      {project.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 프로젝트 태그 */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="bg-brand-dark font-mono text-[9px] text-brand-gray px-2 py-0.5 border border-brand-white/5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 하단 상태바 */}
              <div className="bg-brand-dark px-4 py-2 flex justify-between items-center border-t border-brand-white/5">
                <span className="font-mono text-[9px] text-brand-gray uppercase">File Status:</span>
                <span className="font-mono text-[10px] font-black text-brand-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green led-blink" />
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 9. INTEREST SECTION ("체감상 관심사 분석" - 시스템 사용량 그래프)
export const InterestSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
          최근 채수훈 시스템 사용량
        </h2>
        <p className="text-base text-brand-gray">
          ※ 주의: 과학적인 서버 정밀 계측이 아닌, 운영자의 지극히 주관적인 <strong>체감 작동 수치</strong>를 나타냅니다.
        </p>
      </div>

      {/* 가로 그래프 목록 */}
      <div className="bg-brand-card border border-brand-white/10 p-6 rounded-md space-y-5 focus-ring" tabIndex={0}>
        <div className="flex justify-between items-center border-b border-brand-white/5 pb-3">
          <span className="font-mono text-xs text-brand-gray">SYSTEM METRICS</span>
          <span className="font-mono text-[10px] text-brand-green uppercase font-bold">ESTIMATED ACCURACY: ~98.9%</span>
        </div>

        <div className="space-y-4">
          {systemUsageData.map((data, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-brand-white font-bold">{data.item}</span>
                <span className="text-brand-yellow font-semibold">{data.status}</span>
              </div>
              <div className="w-full h-3.5 bg-brand-dark border border-brand-white/5 rounded-sm overflow-hidden relative">
                <div 
                  className="h-full bg-brand-yellow" 
                  style={{ width: `${data.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-brand-white/5 pt-3 text-center">
          <p className="text-xs text-brand-gray font-mono italic">
            &quot;해당 통계는 공식적 과학 근거가 전무하지만 신기하게도 대단히 정확합니다.&quot;
          </p>
        </div>
      </div>
    </section>
  );
};

// 10. REVIEW SECTION (#reviews)
export const ReviewSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 px-4 md:px-8 bg-brand-card/20 border-y border-brand-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-block px-3 py-1 bg-brand-green/10 border border-brand-green/30 text-brand-green font-mono text-[10px] uppercase tracking-widest rounded-xs">
            USER TESTIMONIALS
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
            실제 사용자 반응
          </h2>
          <p className="text-base text-brand-gray max-w-xl mx-auto">
            강의를 직접 거친 수강생들이 몸소 체험한 성능 검증 피드백입니다. 익명으로 기록되었습니다.
          </p>
        </div>

        {/* 후기 카드 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviewItems.map((review, index) => (
            <div 
              key={index} 
              className="bg-brand-card border border-brand-white/10 hover:border-brand-green/40 transition-all p-6 rounded-md flex flex-col justify-between space-y-4 focus-ring"
              tabIndex={0}
            >
              <div className="space-y-3">
                {/* 쿼트 인포 */}
                <div className="text-brand-yellow text-2xl font-serif leading-none">&ldquo;</div>
                <p className="text-sm text-brand-white font-medium leading-relaxed font-sans">
                  {review.content}
                </p>
              </div>

              <div className="flex justify-between items-end border-t border-brand-white/5 pt-4">
                <span className="font-mono text-xs text-brand-gray">
                  - {review.author}
                </span>
                {/* 상태 표시 잠금 해제 레이블 */}
                <div className="px-2.5 py-1 bg-brand-green/10 border border-brand-green/30 text-brand-green font-mono text-[10px] uppercase tracking-wider rounded">
                  ★ {review.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 11. PATCH NOTE SECTION (#patch-note)
export const PatchNoteSection: React.FC = () => {
  return (
    <section id="patch-note" className="py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-block px-3 py-1 bg-brand-red/10 border border-brand-red/30 text-brand-red font-mono text-[10px] uppercase tracking-widest rounded-xs">
          RELEASE LOGS
        </div>
        <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
          CHAE SYSTEM PATCH NOTE
        </h2>
        <p className="text-base text-brand-gray max-w-xl mx-auto">
          인간 멀티툴 채수훈은 정체되어 있지 않으며, 쉬지 않고 끊임없이 새로운 스펙이 마이너/메이저 패치로 릴리즈되고 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 왼쪽: 세로 타임라인 패치노트 */}
        <div className="lg:col-span-8 space-y-8 relative">
          {/* 타임라인 가이드 선 */}
          <div className="absolute left-4 top-2 bottom-2 w-[2px] bg-brand-white/10 hidden sm:block" />

          {patchNoteData.map((note, index) => (
            <div key={index} className="relative sm:pl-10 space-y-3 group">
              {/* 타임라인 노드 포인트 */}
              <div className="absolute left-3 top-1.5 w-2.5 h-2.5 rounded-full bg-brand-yellow border-2 border-brand-bg transition-transform group-hover:scale-125 hidden sm:block" />

              <div className="bg-brand-card border border-brand-white/10 p-5 rounded-md focus-ring" tabIndex={0}>
                <div className="flex justify-between items-center border-b border-brand-white/10 pb-2 mb-3">
                  <h3 className="text-lg font-mono font-black text-brand-yellow uppercase">
                    {note.version}
                  </h3>
                  <span className="font-mono text-xs text-brand-gray">RELEASE_SUCCESS</span>
                </div>
                <ul className="space-y-2 text-sm text-brand-white pl-4 list-disc font-sans">
                  {note.updates.map((update, uIdx) => (
                    <li key={uIdx} className="leading-relaxed">{update}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽: 알려진 버그 / 미결 사항 */}
        <div className="lg:col-span-4">
          <div className="bg-brand-red/5 border-2 border-brand-red/30 p-6 rounded-md space-y-4 focus-ring pulse-glow-red" tabIndex={0}>
            <div className="flex justify-between items-center border-b border-brand-red/20 pb-2">
              <span className="font-mono text-[10px] text-brand-red uppercase font-black tracking-widest flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-brand-red led-blink" />
                KNOWN BUG LOGS
              </span>
              <span className="font-mono text-[10px] text-brand-red font-semibold">VER 15.0</span>
            </div>

            <p className="text-xs text-brand-gray font-mono">
              // 수정하기 어려운 만성적인 시스템적 내장 버그 정보입니다.
            </p>

            <ul className="space-y-3.5 text-xs text-brand-white/90 pl-4 list-disc font-sans leading-relaxed">
              {knownBugs.map((bug, index) => (
                <li key={index} className="hover:text-brand-red transition-colors">{bug}</li>
              ))}
            </ul>

            <div className="pt-2 border-t border-brand-red/10 text-[9px] font-mono text-brand-red">
              RESOLUTION STATUS: HARD_TO_FIX
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 12. EXTRA MODE SECTION ("업무 외 작동 모드")
export const ExtraModeSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-brand-card/10 border-y border-brand-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
            업무 외 추가 모듈
          </h2>
          <p className="text-base text-brand-gray max-w-xl mx-auto">
            생산성 루프가 멈췄을 때 한정된 주파수 안에서 작동되는 비공식 보조 기능 모음입니다.
          </p>
        </div>

        {/* 세 가지 추가 모듈 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 보드게임 모드 */}
          <div className="bg-brand-card border border-brand-white/10 p-6 rounded-md flex flex-col justify-between space-y-4 focus-ring" tabIndex={0}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-brand-yellow font-bold uppercase tracking-widest">
                  MODULE_OFF_01
                </span>
                <span className="px-1.5 py-0.5 bg-brand-yellow/10 border border-brand-yellow/20 rounded font-mono text-[9px] text-brand-yellow">
                  BOARD GAME
                </span>
              </div>
              <h3 className="text-xl font-sans font-black text-brand-white">보드게임 모드</h3>
              <p className="text-sm text-brand-gray leading-relaxed font-sans">
                10년 이상 보드게임 모임을 운영하며 사람들이 어색하지 않게 참여하고 함께 몰입하는 방식을 배웠습니다.
              </p>
            </div>
            <div className="pt-4 border-t border-brand-white/5">
              <p className="text-xs text-brand-yellow font-sans font-semibold">
                &quot;수업도 결국 사람들이 자연스럽게 참여하게 만드는 일종의 정교한 게임 설계와 비슷합니다.&quot;
              </p>
            </div>
          </div>

          {/* 식집사 모드 */}
          <div className="bg-brand-card border border-brand-white/10 p-6 rounded-md flex flex-col justify-between space-y-4 focus-ring" tabIndex={0}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-brand-green font-bold uppercase tracking-widest">
                  MODULE_OFF_02
                </span>
                <span className="px-1.5 py-0.5 bg-brand-green/10 border border-brand-green/20 rounded font-mono text-[9px] text-brand-green">
                  PLANT CARE
                </span>
              </div>
              <h3 className="text-xl font-sans font-black text-brand-white">식집사 모드</h3>
              <p className="text-sm text-brand-gray leading-relaxed font-sans">
                키우는 식물이 조금만 힘이 없어 보여도 과습, 일조량, 통풍과 뿌리 결합 상태를 전면 분석해 냅니다.
              </p>
            </div>
            <div className="pt-4 border-t border-brand-white/5">
              <p className="text-xs text-brand-green font-sans font-semibold">
                &quot;피드백도 비슷합니다. 상태를 먼저 정밀 파악하고 적절한 원인을 찾은 뒤 무리하지 않게 한 단계씩 짚어갑니다.&quot;
              </p>
            </div>
          </div>

          {/* 새로운 기술 탐색 모드 */}
          <div className="bg-brand-card border border-brand-white/10 p-6 rounded-md flex flex-col justify-between space-y-4 focus-ring" tabIndex={0}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-brand-gray font-bold uppercase tracking-widest">
                  MODULE_OFF_03
                </span>
                <span className="px-1.5 py-0.5 bg-brand-white/10 border border-brand-white/20 rounded font-mono text-[9px] text-brand-white">
                  AUTO DISCOVERY
                </span>
              </div>
              <h3 className="text-xl font-sans font-black text-brand-white">새로운 기술 탐색 모드</h3>
              
              <div className="space-y-1 font-mono text-xs text-brand-gray">
                <p>1. 새로운 AI 도구의 돌발적 발견</p>
                <p>2. 즉각적인 회원 가입 및 직접 탐색</p>
                <p>3. 장단점과 렌더링 한계 확인</p>
                <p>4. 수업 실무에 접목 가능한가 고찰</p>
                <p>5. 결국 한밤중에 새 커리큘럼 자료 제작</p>
              </div>
            </div>
            <div className="pt-4 border-t border-brand-white/5 flex justify-between items-center">
              <span className="text-xs text-brand-white font-bold font-mono">STATUS: INFINITE_LOOP</span>
              <span className="w-2 h-2 rounded-full bg-brand-red led-blink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 13. CONTACT SECTION (#contact)
export const ContactSection: React.FC<SectionProps> = ({ onTriggerToast }) => {
  const [copied, setCopied] = useState(false);

  // 이메일과 전화번호가 기본 안내 문구(안 채워진 상태)인지 판별하는 플래그
  const isDefaultEmail = contactInformation.email.includes("입력");
  const isDefaultPhone = contactInformation.phone.includes("입력");

  const handleActionClick = (e: React.MouseEvent<HTMLAnchorElement>, type: "email" | "phone" | "counsel") => {
    if (type === "email" && isDefaultEmail) {
      e.preventDefault();
      onTriggerToast("연락처 정보를 입력하면 기능이 활성화됩니다.", "warning");
    } else if (type === "phone" && isDefaultPhone) {
      e.preventDefault();
      onTriggerToast("연락처 정보를 입력하면 기능이 활성화됩니다.", "warning");
    } else if (type === "counsel" && (isDefaultEmail || isDefaultPhone)) {
      e.preventDefault();
      onTriggerToast("연락처 정보를 입력하면 기능이 활성화됩니다.", "warning");
    }
  };

  const handleCopyContact = () => {
    const textToCopy = `이름: ${contactInformation.name} | 이메일: ${contactInformation.email} | 전화번호: ${contactInformation.phone}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopied(true);
          onTriggerToast("연락처 정보가 클립보드에 무사히 복사되었습니다.", "success");
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          onTriggerToast("복사에 실패했습니다. 브라우저 설정을 확인해 주십시오.", "warning");
        });
    } else {
      // Fallback
      onTriggerToast(`클립보드 API가 지원되지 않습니다. 정보: ${textToCopy}`, "info");
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-block px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow font-mono text-[10px] uppercase tracking-widest rounded-xs">
          CALL FOR SUMMONS
        </div>
        <h2 className="text-3xl sm:text-4xl font-sans font-black text-brand-white tracking-tight">
          채수훈을 소환할 수 있는 상황
        </h2>
        <p className="text-base text-brand-gray max-w-xl mx-auto">
          아래 시나리오 중 하나라도 탐지되는 경우, 높은 기동력의 채수훈 멀티툴 소환을 고려하십시오.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* 왼쪽: 소환 사유 체크리스트 */}
        <div className="md:col-span-7 bg-brand-card border border-brand-white/10 p-6 rounded-md space-y-4">
          <h3 className="font-mono text-xs text-brand-yellow font-bold uppercase tracking-wider border-b border-brand-white/10 pb-2">
            &gt; SUMMON DETECTOR CONDITIONS
          </h3>
          <ul className="space-y-3.5 text-sm text-brand-white/90">
            {[
              "디자인 또는 AI 강의가 필요할 때",
              "디자인 왕초보자도 무서워하지 않고 쉽게 따라갈 수 있는 커리큘럼이 필요할 때",
              "생성형 AI 이론을 넘어, 실제 작동하는 눈앞의 결과물로 완성하여 배포시키고 싶을 때",
              "기관이나 학원의 수강 조건과 트렌드에 딱 맞춘 단독형 맞춤식 교육과정이 필요할 때",
              "디자인, 영상 편집, AI 프롬프팅, 웹 호스팅을 각각 따로 구하지 않고 한 사람에게 맡겨 설명해야 할 때",
              "다들 외래어와 전문 용어를 쓰며 어렵게 설명하는 내용을, 누구나 알아듣는 쉬운 언어로 풀어낼 강사가 필요할 때"
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-brand-yellow font-bold font-mono shrink-0">√</span>
                <span className="leading-relaxed font-sans">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 오른쪽: 소환 콘솔 (액션 링크) */}
        <div className="md:col-span-5 bg-brand-card border-2 border-brand-yellow/30 p-6 rounded-md flex flex-col justify-between relative focus-ring" tabIndex={0}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-yellow" />
          
          <div className="space-y-5">
            <div className="flex justify-between items-center border-b border-brand-white/10 pb-3">
              <span className="font-mono text-[10px] text-brand-yellow uppercase tracking-widest font-bold">
                SUMMON CONTROLLER
              </span>
              <span className="w-2 h-2 rounded-full bg-brand-yellow led-blink" />
            </div>

            {/* 현재 연락처 상태 표시 */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-brand-white/5">
                <span className="text-brand-gray">TARGET NAME</span>
                <span className="text-brand-white">{contactInformation.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-white/5">
                <span className="text-brand-gray">SYS EMAIL</span>
                <span className={isDefaultEmail ? "text-brand-red italic" : "text-brand-white"}>
                  {contactInformation.email}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-brand-gray">SYS PHONE</span>
                <span className={isDefaultPhone ? "text-brand-red italic" : "text-brand-white"}>
                  {contactInformation.phone}
                </span>
              </div>
            </div>

            {/* 액션 버튼 그리드 */}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href={isDefaultEmail ? "#" : `mailto:${contactInformation.email}`}
                onClick={(e) => handleActionClick(e, "email")}
                className="w-full py-2.5 bg-brand-light hover:bg-brand-white text-brand-dark font-sans font-bold text-xs text-center rounded transition-all flex items-center justify-center gap-1.5 focus-ring"
                style={{ minHeight: "44px" }}
              >
                📥 강의 문의하기
              </a>
              <a
                href={isDefaultEmail ? "#" : `mailto:${contactInformation.email}?subject=[프로젝트의뢰]`}
                onClick={(e) => handleActionClick(e, "email")}
                className="w-full py-2.5 bg-brand-card hover:bg-brand-dark text-brand-yellow border border-brand-yellow/30 hover:border-brand-yellow font-sans font-bold text-xs text-center rounded transition-all flex items-center justify-center gap-1.5 focus-ring"
                style={{ minHeight: "44px" }}
              >
                🛠️ 프로젝트 의뢰
              </a>
              <a
                href={isDefaultPhone ? "#" : `tel:${contactInformation.phone}`}
                onClick={(e) => handleActionClick(e, "phone")}
                className="w-full py-2.5 bg-brand-card hover:bg-brand-dark text-brand-white border border-brand-white/10 hover:border-brand-white font-sans font-semibold text-xs text-center rounded transition-all flex items-center justify-center gap-1.5 focus-ring"
                style={{ minHeight: "44px" }}
              >
                💬 실시간 커리큘럼 상담
              </a>
              <button
                onClick={handleCopyContact}
                className="w-full py-2.5 bg-brand-dark/40 hover:bg-brand-dark text-brand-gray hover:text-brand-white border border-dashed border-brand-white/20 hover:border-brand-white/40 font-mono text-xs text-center rounded transition-all flex items-center justify-center gap-1.5 focus-ring"
                style={{ minHeight: "44px" }}
              >
                {copied ? "✓ 복사되었습니다" : "📋 연락처 텍스트 복사"}
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-white/10 text-[9px] font-mono text-brand-gray leading-relaxed">
            * 호출 요청이 접수되면 강사는 높은 확률로 질문보다 훨씬 더 많은 아이디어와 준비물을 들고 나타납니다.
          </div>
        </div>
      </div>
    </section>
  );
};

// 14. FOOTER (푸터)
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark border-t border-brand-white/10 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* 왼쪽: 저작권 및 제품명 */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="font-mono text-sm font-black text-brand-white tracking-widest uppercase">
            CHAE SOO HOON <span className="text-brand-yellow">v15.0</span>
          </div>
          <p className="text-xs text-brand-gray font-mono">
            Design &bull; Education &bull; AI &bull; Video &bull; Web Dev
          </p>
          <p className="text-[10px] text-brand-gray">
            &copy; {currentYear} Chae Soo Hoon User Manual. Crafted under B-grade manual theme.
          </p>
        </div>

        {/* 중앙/오른쪽: 상태 도장 및 고장 안내 */}
        <div className="flex flex-col items-center md:items-end gap-1 font-mono text-[10px] text-brand-gray text-center md:text-right">
          <span>RUNNING ENVIRONMENT: VERCEL CLOUD SPA PORT</span>
          <span className="text-brand-green font-bold">● SYSTEM STATUS: ONLINE & CONTINUOUS PATCHING</span>
          <span className="italic text-brand-yellow">※ 본 제품은 멈추지 않고 계속 원격 업데이트됩니다.</span>
        </div>
      </div>
    </footer>
  );
};
