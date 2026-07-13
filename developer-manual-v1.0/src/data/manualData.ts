export interface Profile {
  name: string;
  englishName: string;
  title: string;
  oneLineIntro: string;
  detailedIntro: string;
  currentStatus: string;
  buildVersion: string;
  lastUpdated: string;
  environment: {
    node: string;
    react: string;
    tailwind: string;
  };
}

export interface QuickStartItem {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export interface OperatingPrinciple {
  number: number;
  title: string;
  englishTitle: string;
  description: string;
  codeSnippet: string;
}

export interface TimelineItem {
  version: string;
  period: string;
  title: string;
  description: string;
  milestones: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  items: { name: string; level: 'Expert' | 'Advanced' | 'Intermediate'; experience: string }[];
}

export interface Project {
  id: string;
  title: string;
  period: string;
  intro: string;
  role: string;
  techStack: string[];
  difficulties: string;
  resolution: string;
  learnings: string;
  links?: {
    demo?: string;
    github?: string;
  };
}

export interface TroubleshootingCase {
  id: string;
  title: string;
  problem: string;
  cause: string;
  solution: string;
  result: string;
  learnings: string;
  codeDiff?: {
    before: string;
    after: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  email: string;
  github: string;
  blog: string;
  resume: string;
  linkedin: string;
}

export interface ManualMetadata {
  knownIssues: string[];
  futureUpdates: string[];
  releaseNotes: { version: string; date: string; changes: string[] }[];
}

export const profileData: Profile = {
  name: "김민재",
  englishName: "Minjae Kim",
  title: "Frontend Engineer & UI/UX Specialist",
  oneLineIntro: "기능 구현을 넘어 사용자 경험의 레이턴시를 단축하고, 직관적인 인터페이스를 설계하는 10년 차 개발자입니다.",
  detailedIntro: `안녕하세요. 사용자 경험을 고민하며 최전선에서 문제를 해결하는 프론트엔드 개발자입니다.

단순히 동작하는 기능을 만드는 것보다, 사용자가 편리함을 느끼고 감탄하는 '좋은 경험'을 설계하는 것을 좋아합니다. 
웹 표준과 웹 접근성(WAI-ARIA)을 수호하며, 프레임워크와 아키텍처의 유연성을 끊임없이 실험하고 최적화하고 있습니다.`,
  currentStatus: "Available (Seoul, South Korea / Remote)",
  buildVersion: "v1.4.2",
  lastUpdated: "2026-07-13",
  environment: {
    node: "v22.14.0",
    react: "v19.0.1",
    tailwind: "v4.1.14"
  }
};

export const quickStartData: QuickStartItem[] = [
  {
    id: "fe",
    title: "Core Frontend",
    description: "리액트 및 모던 자바스크립트 생태계의 코어 스택에 매우 숙련되어 있습니다.",
    details: ["React 19 & Next.js App Router 완벽 대응", "TypeScript 기반 안정적 타입 시스템 설계", "웹 렌더링 성능 최적화 (LCP/FID/CLS)"]
  },
  {
    id: "architecture",
    title: "Architecture & DX",
    description: "확장 가능하고 협업하기 유연한 폴더/컴포넌트 구조를 선호합니다.",
    details: ["Feature-Driven 아키텍처 (FSD) 적용 경험", "Zustand & React Query 조합의 상태 동기화", "모노레포 구축 및 공통 디자인 시스템 컴포넌트화"]
  },
  {
    id: "ui-ux",
    title: "Creative UI/UX",
    description: "Stripe, Apple, Vercel의 디자인 감성을 웹 표준에 어긋나지 않게 담아냅니다.",
    details: ["TailwindCSS 유틸리티 클래스 마스터", "Framer Motion을 통한 고도화된 인터랙션 구현", "디자이너와 개발자 간의 피그마 컴포넌트 싱크"]
  },
  {
    id: "solving",
    title: "Problem Solving",
    description: "로그와 데이터 분석을 바탕으로 장애의 근본 원인을 추적합니다.",
    details: ["Chrome DevTools를 이용한 메모리 누수 및 병목 진정", "Sentry 장애 모니터링 실시간 추적 및 조치", "복잡한 정규식, 알고리즘 기반 데이터 전처리"]
  }
];

export const operatingPrinciples: OperatingPrinciple[] = [
  {
    number: 1,
    title: "사용자가 먼저다",
    englishTitle: "User Experience First",
    description: "모든 기술적 결정의 최종 목적지는 사용자 경험(UX)입니다. 100ms의 레이턴시 단축과 부드러운 레이아웃 전환은 제품의 본질적인 신뢰도를 구축합니다.",
    codeSnippet: `// 💡 안좋은 경험: 로딩 완료 시 갑자기 레이아웃이 튀며 클릭 실수 발생 (CLS)
// 👍 좋은 경험: 스켈레톤 홀더 또는 안정적인 컨테이너 비율 유지를 통한 가독성 수호`
  },
  {
    number: 2,
    title: "읽기 쉬운 코드가 좋은 코드다",
    englishTitle: "Readable is Maintainable",
    description: "코드는 기계가 아닌 사람이 읽기 위해 작성됩니다. 명확한 도메인 네이밍, 단일 책임 원칙(SRP) 준수, 그리고 주석 없이도 동작이 전달되는 자가 문서화 코드를 지향합니다.",
    codeSnippet: `// 💡 BAD: const x = (a, b) => a ? b.filter(i => i.is_active) : [];
// ✅ GOOD: function getActiveSubscribers(users, hasFilterEnabled) { ... }`
  },
  {
    number: 3,
    title: "재사용 가능한 구조를 선호한다",
    englishTitle: "Flexible & Reusable Components",
    description: "반복되는 패턴을 공통 추상화 레이어로 정밀하게 분리하되, 과도한 조기 추상화(Premature Abstraction)를 경계하며 유연하고 결합성이 뛰어난 headless 패턴을 주로 채택합니다.",
    codeSnippet: `// Compound Component 패턴을 활용해 자율도가 높으면서도 
// UI 마크업에 제한이 없는 Dropdown, Tab, Modal 시스템 구축`
  },
  {
    number: 4,
    title: "작게 만들고 꾸준히 개선한다",
    englishTitle: "Build Small, Iterate Rapidly",
    description: "완벽한 은빛 탄환 설계란 존재하지 않습니다. 먼저 최소 가치 제품(MVP)을 신속히 배포하고, 실사용자의 피드백과 모니터링 데이터를 관측하여 점진적 최적화를 거칩니다.",
    codeSnippet: `// Feature Flags를 통해 배포 리스크를 제어하고, 
// 부분적 점진 배포(Canary)로 실시간 크래시 레이트를 관측`
  },
  {
    number: 5,
    title: "문제의 원인을 먼저 찾는다",
    englishTitle: "Root Cause Investigation First",
    description: "현상에만 대응하는 임시방편식 패치는 기술 부채를 가중할 뿐입니다. 재현 케이스를 우선 고립시키고 메모리 프로파일링, 네트워크 시뮬레이션 등을 통해 근본 원인을 파악하여 견고한 대안을 수립합니다.",
    codeSnippet: `// 1. 메모리 스냅샷 촬영 -> 2. 리렌더링 유발 컴포넌트 색출
// 3. useCallback/useMemo 또는 State Lift-down을 통한 해결`
  }
];

export const timelineData: TimelineItem[] = [
  {
    version: "v1.0",
    period: "2016 - 2018",
    title: "웹 개발 입문 & 기초 수호",
    description: "HTML5/CSS3 웹 표준, 시맨틱 웹, 그리고 바닐라 자바스크립트(ES6)의 단단한 주춧돌을 세웠습니다.",
    milestones: [
      "웹 접근성 가이드를 충실히 이행하는 반응형 퍼블리싱 기술 체득",
      "CSS Flexbox, Grid 아키텍처 및 자바스크립트 DOM 제어 마스터",
      "네이티브 브라우저 API에 대한 깊은 이해"
    ]
  },
  {
    version: "v2.0",
    period: "2018 - 2021",
    title: "React 컴포넌트 생태계 개막",
    description: "선언형 UI 프로그래밍과 컴포넌트 기반 아키텍처에 매료되어 프론트엔드 전문성을 가속화했습니다.",
    milestones: [
      "클래스 컴포넌트에서 React Hooks 기반 함수형 컴포넌트로의 대전환 경험",
      "Redux, MobX를 활용한 복잡한 클라이언트 전역 상태 관리 구현",
      "첫 상용 웹 서비스 프로덕션 런칭 및 유지 보수 총괄"
    ]
  },
  {
    version: "v3.0",
    period: "2021 - 2024",
    title: "엔터프라이즈 아키텍처 및 DX 고도화",
    description: "대규모 트래픽 속에서도 견고히 버틸 수 있는 설계 구조와 개발자 생산성 향상에 몰두했습니다.",
    milestones: [
      "모노레포(Yarn Berry, Turborepo) 환경 구축을 통한 멀티 프로젝트 시너지 확보",
      "Zustand와 TanStack Query(React Query)를 조합하여 서버-클라이언트 상태의 완벽 분리",
      "자체 컴포넌트 라이브러리(Design System) 개발 및 패키지화 배포"
    ]
  },
  {
    version: "v4.0",
    period: "2024 - 2025",
    title: "Next.js App Router & Full-Stack Synergy",
    description: "리액트 서버 컴포넌트(RSC) 패러다임을 신속히 통합하고, 서버-클라이언트 하이브리드 최적화를 수행했습니다.",
    milestones: [
      "Next.js App Router 마이그레이션 주도 및 검색엔진 최적화(SEO) 지표 200% 개선",
      "서버사이드 렌더링(SSR) 및 정적 사이트 생성(ISR)을 활용한 첫 페이지 페인트 단축",
      "Node.js 기반 백엔드 API 연동 프록시 구현 및 보안 헤더 수립"
    ]
  },
  {
    version: "Current",
    period: "2026 - Present",
    title: "Senior Lead Frontend Engineer",
    description: "비즈니스의 목표를 우아한 기술 아키텍처로 변환하고, 시니어로서 팀의 코딩 스탠다드를 리드합니다.",
    milestones: [
      "웹앱 핵심 지표(Core Web Vitals) 정량 평가 모델 수립 및 정기 최적화 리팩터링",
      "신입 엔지니어 코드 리뷰 및 디자인 설계 멘토링 프로그램 운영",
      "완벽한 CI/CD 자동 테스트 커버리지를 통한 배포 안정성 확보"
    ]
  }
];

export const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    description: "실무에서 막힘 없이 견고하고 미려한 화면을 구현하며, 다양한 최적화 패턴을 사용합니다.",
    items: [
      { name: "React 19 / Hooks", level: "Expert", experience: "8+ Years" },
      { name: "Next.js (App Router)", level: "Expert", experience: "4+ Years" },
      { name: "TypeScript", level: "Expert", experience: "7+ Years" },
      { name: "TailwindCSS", level: "Expert", experience: "6+ Years" },
      { name: "Zustand / Redux", level: "Expert", experience: "6+ Years" },
      { name: "TanStack Query", level: "Expert", experience: "5+ Years" }
    ]
  },
  {
    category: "Backend & Integration",
    description: "서버와 유연하게 데이터를 교환하고 간단한 RESTful API를 직접 구축/서빙할 수 있습니다.",
    items: [
      { name: "Node.js (Express)", level: "Advanced", experience: "5+ Years" },
      { name: "RESTful API / GraphQL", level: "Expert", experience: "6+ Years" },
      { name: "SSE / WebSockets", level: "Advanced", experience: "3+ Years" }
    ]
  },
  {
    category: "Database & Storage",
    description: "데이터 모델링 및 프론트엔드 측 캐싱 레이어를 세밀하게 정의합니다.",
    items: [
      { name: "PostgreSQL", level: "Intermediate", experience: "3+ Years" },
      { name: "Firebase (Firestore)", level: "Advanced", experience: "4+ Years" },
      { name: "Redis Caching", level: "Intermediate", experience: "2+ Years" }
    ]
  },
  {
    category: "DevOps & Deployment",
    description: "프론트엔드 배포 자동화 및 클라우드 호스팅에 자신감이 있습니다.",
    items: [
      { name: "Docker", level: "Advanced", experience: "3+ Years" },
      { name: "Vercel / Netlify", level: "Expert", experience: "6+ Years" },
      { name: "AWS (S3 / CloudFront)", level: "Advanced", experience: "4+ Years" },
      { name: "GitHub Actions CI/CD", level: "Advanced", experience: "4+ Years" }
    ]
  },
  {
    category: "Performance & Tools",
    description: "프로덕션의 완성도와 성능 계측, 디자인 통일성을 견인하는 툴을 씁니다.",
    items: [
      { name: "Chrome DevTools Profiler", level: "Expert", experience: "7+ Years" },
      { name: "Figma (Developer-Designer-Link)", level: "Expert", experience: "5+ Years" },
      { name: "Jest / Playwright", level: "Advanced", experience: "3+ Years" }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "project-1",
    title: "Stripe-inspired Payment Console",
    period: "2024.03 - 2024.10",
    intro: "가맹점들이 결제 통계 및 매출 데이터를 실시간 차트로 관측하고 정산 상태를 관리하는 고성능 비즈니스 모니터링 대시보드 콘솔입니다.",
    role: "Lead Frontend Architecture (Framer Motion 마스터, 시각 차트 엔지니어링, 전역 상태 및 데이터 스토어 수립)",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Recharts", "Zustand", "Sentry"],
    difficulties: "수만 건의 실시간 트랜잭션이 초당 수십 개 단위로 실시간 폴링 유입될 때 대형 Recharts 차트가 반복 리렌더링되며 프레임 드랍이 12 FPS까지 폭락.",
    resolution: "Zustand의 Selector 방식을 채택하여 최상위 UI 컴포넌트의 리렌더링 경로를 완전히 차단하고 실시간 유입 트랜잭션 데이터를 Web Worker 레이어에서 전처리하여 메인 스레드 부담 감소. 데이터 시각 업데이트에 lodash/throttle을 적용해 렌더링 빈도를 초당 2회로 제한함으로써 부드러운 60 FPS 스크롤 및 모션 복구.",
    learnings: "웹 스레드 간 데이터 파티셔닝과 상태 변화 범위의 최소화가 대규모 실시간 대시보드 성능에 절대적인 키를 쥐고 있음을 입증했습니다.",
    links: {
      demo: "https://console.payment-example.dev",
      github: "https://github.com/example/payment-console"
    }
  },
  {
    id: "project-2",
    title: "Hyper-Doc Workspace (실시간 협업 도큐먼트)",
    period: "2023.01 - 2023.11",
    intro: "다중 사용자가 동시 편집 및 마크다운 익스포트를 할 수 있으며, 로컬 파일 시스템 마운팅을 완벽 지원하는 차세대 문서 저작 도구입니다.",
    role: "Frontend Developer (Core Slate.js 위지윅 커스터마이징, 동시성 OT 병합 알고리즘 연동)",
    techStack: ["React", "TypeScript", "Slate.js", "TailwindCSS", "WebSockets", "Vite"],
    difficulties: "네트워크 불안정 상태 및 대형 문서 동시 동기화 시 커서 밀림 현상과 입력 버퍼 지연 발생.",
    resolution: "SlateJS 에디터의 네이티브 오퍼레이션을 오프라인 버퍼 저장소에 선 저장하고, 오프라인 상태일 때는 LocalForage에 변경점을 자동 큐잉(Queueing)했다가 회복 시 일괄 전송하는 낙관적 병합 알고리즘 구현. 동시 입력 레이턴시 체감 시간을 0ms로 단축.",
    learnings: "실시간 동기화 시스템에서 네트워크 지연을 사용자 인터페이스 뒤로 감추는 캐시 레이어 설계의 가치를 절감했습니다.",
    links: {
      demo: "https://workspace.hyper-doc-example.dev",
      github: "https://github.com/example/hyper-doc"
    }
  }
];

export const troubleshootingData: TroubleshootingCase[] = [
  {
    id: "trouble-1",
    title: "대형 히어로 렌더링 속도 개선을 통한 LCP 지표 75% 단축",
    problem: "모바일 환경의 메인 대시보드 및 상업 랜딩 페이지 진입 시 LCP(Largest Contentful Paint) 속도가 4.8초를 초과하여 구글 검색 노출 랭크가 하락하고 초기 유입자 이탈률이 18.5% 증가.",
    cause: `1) 원본 2.8MB 크기의 히어로 PNG 이미지가 초기 크리티컬 렌더링 경로(Critical Rendering Path)를 블로킹함.
2) 대형 라이브러리(미사용 차트 및 수식 분석 툴)가 메인 번들에 통째로 포장되어 초기 브라우저 로딩 시 1.6MB 분량의 JS 다운로드를 강제함.`,
    solution: `1) Next.js의 내장 Image 컴포넌트를 활용하여 차세대 이미지 포맷인 WebP(크기 140KB)로 경량 압축 및 'priority' 속성을 할당해 로드 선순위 부여.
2) @next/bundle-analyzer를 구동해 미사용 모듈을 식별하고, react-lazy와 next/dynamic을 사용해 해당 차트 및 대형 라이브러리를 사용자가 실제 동작시킬 때만 비동기로 로딩하는 동적 코드 스플리팅(Dynamic Import) 적용.`,
    result: "초기 자바스크립트 번들 사이즈 72% 감소(1.6MB -> 440KB), LCP가 4.8초에서 1.2초로 획기적으로 감축되어 코어 웹 바이탈 통과 등급 획득. 유저 초기 이탈률 14% 회복.",
    learnings: "성능 지표가 곧 비즈니스 전환율이자 고객 경험이라는 공식이 단지 이론이 아닌 실제 데이터 수치로 입증되는 과정을 목격한 소중한 경험이었습니다.",
    codeDiff: {
      before: `// ❌ AS-IS: 비효율적 배너 로드 및 거대 라이브러리 다이렉트 임포트
import React from 'react';
import { LargeHeavyChart } from 'heavy-chart-library';
import HeroImage from '/assets/hero-banner-large.png';

export default function Dashboard() {
  return (
    <div>
      <img src={HeroImage} alt="Hero Banner" />
      <LargeHeavyChart data={[]} />
    </div>
  );
}`,
      after: `// ✅ TO-BE: WebP 적용, priority 설정 및 lazy-loading 적용
import React, { Suspense, lazy } from 'react';
import Image from 'next/image';

const LazyHeavyChart = lazy(() => 
  import('heavy-chart-library').then(mod => ({ default: mod.LargeHeavyChart }))
);

export default function Dashboard() {
  return (
    <div>
      <Image 
        src="/assets/hero-banner-large.webp" 
        alt="Hero Banner" 
        width={1200} 
        height={600} 
        priority 
        placeholder="blur" 
        blurDataURL="data:image/png;base64,..."
      />
      <Suspense fallback={<div className="h-[300px] animate-pulse bg-slate-800 rounded" />}>
        <LazyHeavyChart data={[]} />
      </Suspense>
    </div>
  );
}`
    }
  }
];

export const faqData: FAQItem[] = [
  {
    question: "왜 프론트엔드 포지션을 선택하셨나요?",
    answer: "사용자와 기술이 충돌하고 맞닿는 최첨단 인터페이스이기 때문입니다. 논리적으로 치밀하게 짠 시스템과 성능 개선 노력(메모리 절약, 레이턴시 단축)이 사용자 입장에서 즉각적인 시각적 쾌적함과 감동으로 전환되는 이 과정에서 엄청난 보람을 느낍니다."
  },
  {
    question: "다른 직군과의 협업 스타일은 어떤가요?",
    answer: "철저한 문서화와 싱크(Sync) 회의 최소화를 선호합니다. 기획 단계에서 엣지 케이스 유저 스토리 목록을 먼저 뽑아 질문하여 요구사항 공백을 사전에 메웁니다. 디자이너와는 피그마 스타일 가이드를 준수하며 CSS 토큰을 함께 맞추고, 백엔드 엔지니어와는 API 컨트랙트 명세서(Swagger 등)를 가장 먼저 수립해 병렬 작업을 진행합니다."
  },
  {
    question: "새로운 기술을 도입할 때의 기준은 무엇인가요?",
    answer: "팀의 생태계 호환성, 학습 곡선, 그리고 커뮤니티의 건강성을 복합 검증합니다. 단지 유행이라는 이유로 프로덕션에 즉시 투입하지 않으며, 자체 샌드박스에서 사이드 이펙트 테스트를 완료한 뒤 확실한 비즈니스상 이점(DX 향상, 번들 경량화, 렌더 속도 단축 등)이 있을 때 점진적으로 통합합니다."
  },
  {
    question: "동료들로부터 어떤 개발자로 평가받으시나요?",
    answer: "'설계가 깔끔하고 예외 처리가 집요한 시니어'라는 말을 자주 듣습니다. 버그 발생 시 '이게 왜 안 될까'를 넘어 '어떤 구조적 허점이 이 오류를 허용했을까'에 대해 고민하고, 문제 발생 경로 자체를 컴파일 타임에 봉쇄하는 설계 규칙을 선호하기 때문입니다."
  }
];

export const contactData: ContactInfo = {
  email: "jalsalja0924@gmail.com",
  github: "https://github.com/jalsalja",
  blog: "https://velog.io/@jalsalja",
  resume: "https://resume-kminjae.notion.site",
  linkedin: "https://linkedin.com/in/kminjae-developer"
};

export const manualMetadata: ManualMetadata = {
  knownIssues: [
    "Easter egg trigger requires exactly 3 rapid clicks on the 'Build Version' label.",
    "Mobile landscape layout displays a minimized, high-efficiency navigation bar for wider reading space.",
    "Known dark mode is default system. Pure white theme is currently unsupported per developer visual health protocols."
  ],
  futureUpdates: [
    "v1.5.0: Next.js 15 Server Action security auditing automation manual integration.",
    "v1.6.0: Rust/Wasm based local file formatting engine benchmark tooling addition."
  ],
  releaseNotes: [
    { version: "v1.4.2", date: "2026-07-13", changes: ["React 19 Hooks stability testing complete", "Optimized CLI Command Palette indexer loading speed"] },
    { version: "v1.4.0", date: "2026-04-20", changes: ["Added Troubleshooting Code-Diff comparison screen", "Polished Keyboard Short-cut routing logic"] },
    { version: "v1.1.0", date: "2025-11-05", changes: ["Introduced Interactive System Workflow visual flow", "Set dark color palette to slate base"] }
  ]
};
