import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { 
  Hero, 
  WarningSection, 
  RoleSection, 
  AbilitySection, 
  SkillSection, 
  FormulaSection, 
  CommandSection, 
  ProjectSection, 
  InterestSection, 
  ReviewSection, 
  PatchNoteSection, 
  ExtraModeSection, 
  ContactSection, 
  Footer 
} from "./components/Sections";
import { ToastContainer, PlantEasterEgg, WarningTape, ToastMessage } from "./components/UIComponents";

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 토스트 메시지 생성 트리거
  const handleTriggerToast = (text: string, type: "info" | "warning" | "success" = "info") => {
    const newToast: ToastMessage = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  // 토스트 강제 닫기
  const handleRemoveToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // 자동 토스트 만료 스케줄링 (가장 오래된 토스트 4초 후 순차 삭제)
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  // 첫 진입 시 환영 시스템 노티스
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      handleTriggerToast(
        "채수훈 사용설명서 v15.0 제품 규격 시트가 무사히 로드되었습니다. 환영합니다!",
        "success"
      );
    }, 1000);
    return () => clearTimeout(welcomeTimer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-brand-white selection:bg-[#FFD600] selection:text-[#111111] flex flex-col relative overflow-x-hidden border-[12px] md:border-[16px] border-[#151515]">
      
      {/* 1. 상단 글로벌 고정 헤더 내비게이션 */}
      <Header />

      {/* 2. 메인 콘텐츠 에어리어 */}
      <main className="flex-1">
        
        {/* 히어로 섹션 (#home) */}
        <Hero onTriggerToast={handleTriggerToast} />

        {/* 첫 번째 경고 주의 테이프 */}
        <WarningTape text="ATTENTION: EXCESSIVE MULTITOOL DESIGN CAPACITY SPECIFIED" />

        {/* 주의사항/소개 섹션 (#about) */}
        <WarningSection />

        {/* 도대체 무슨 일을 하는 사람인가? 역할 소개 */}
        <RoleSection />

        {/* 두 번째 주의 테이프 */}
        <WarningTape text="RPG STATS SYSTEM DETECTED // OPTIMAL LEARNING FLOW ACTIVATED" />

        {/* 성능/능력치 측정 섹션 (#abilities) */}
        <AbilitySection />

        {/* 현재 장착된 스킬 목록 섹션 (#skills) */}
        <SkillSection />

        {/* 채수훈식 결과물 생성 공식 */}
        <FormulaSection />

        {/* 세 번째 주의 테이프 */}
        <WarningTape text="COMPILER TERMINAL READY // EXTREME EDUCATION SUPPORT" />

        {/* 최근 입력된 피드백 명령어 로그 */}
        <CommandSection />

        {/* 완료 사건 파일 (포트폴리오 프로젝트) (#projects) */}
        <ProjectSection />

        {/* 실제 수강생들의 체감상 관심사 통계 */}
        <InterestSection />

        {/* 실제 사용자 반응 수강 평론 (#reviews) */}
        <ReviewSection />

        {/* 채수훈 시스템 패치노트 (#patch-note) */}
        <PatchNoteSection />

        {/* 업무 외 추가 보조 모듈 */}
        <ExtraModeSection />

        {/* 네 번째 주의 테이프 */}
        <WarningTape text="READY FOR LAUNCH // INITIATING SUMMON PROCEDURES" />

        {/* 연락 및 의뢰 (소환 콘솔) (#contact) */}
        <ContactSection onTriggerToast={handleTriggerToast} />

      </main>

      {/* 3. 하단 저작권 푸터 */}
      <Footer />

      {/* 4. 우하단 플로팅 화분 식집사 이스터에그 */}
      <PlantEasterEgg onTriggerToast={handleTriggerToast} />

      {/* 5. 비동기 상주형 플로팅 토스트 컨테이너 */}
      <ToastContainer toasts={toasts} onRemove={handleRemoveToast} />

    </div>
  );
}
