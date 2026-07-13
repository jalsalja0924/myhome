import { NavItem, Ability, SkillCategory, ProjectItem, ReviewItem, PatchNoteItem, ContactInfo } from "./types";

// 내비게이션 메뉴 데이터
export const navigationItems: NavItem[] = [
  { label: "제품 정보", href: "#about" },
  { label: "능력치", href: "#abilities" },
  { label: "스킬", href: "#skills" },
  { label: "프로젝트", href: "#projects" },
  { label: "사용자 후기", href: "#reviews" },
  { label: "패치노트", href: "#patch-note" },
  { label: "소환하기", href: "#contact" },
];

// 연락처 정보 데이터 (여기서 정보를 수정하면 사이트 전체에 반영됩니다)
export const contactInformation: ContactInfo = {
  name: "채수훈",
  email: "이메일 주소 입력", // 실제 이메일이 입력되면 mailto 링크 작동
  phone: "전화번호 입력",   // 실제 전화번호가 입력되면 tel 링크 작동
  location: "광주광역시",
  instagram: "이메일 주소 입력", // SNS 등 필요 시 수정 가능
  youtube: "유튜브 주소 입력",
};

// 제품 주요 기능 리스트 (Hero 영역 등)
export const mainFeatures = [
  "디자인 교육",
  "생성형 AI 교육",
  "영상 콘텐츠 제작",
  "브랜딩",
  "홍보 콘텐츠 제작",
  "교육과정 기획",
  "웹페이지 제작",
  "초보자 설명",
  "결과물 완성 지원",
];

// 경고/주의 사항 데이터 (About 섹션)
export const warningItems = [
  "새로운 AI 도구를 보여주면 직접 테스트할 가능성이 높습니다.",
  "“이거 수업에 쓸 수 있겠는데?”라는 말을 자주 합니다.",
  "간단한 수업자료를 만들다가 분량이 크게 늘어날 수 있습니다.",
  "포토샵 수업이 유튜브 채널 개설과 웹 배포로 이어질 수 있습니다.",
  "“적당히”보다 “제대로”를 선호합니다.",
  "결과물이 나오지 않는 실습을 싫어합니다.",
  "설명은 쉽게 하지만 준비 과정은 쉽지 않습니다.",
];

// 5가지 핵심 역할 카드
export const roleCards = [
  {
    title: "디자인 강사",
    description: "포토샵과 일러스트레이터의 버튼 위치만 알려주지 않습니다. 포스터, 로고, 상세페이지, 카드뉴스처럼 실제 결과물을 완성하게 합니다.",
  },
  {
    title: "AI 활용 교육자",
    description: "프롬프트만 복사하게 하지 않습니다. 기획하고, 생성하고, 수정하고, 디자인 프로그램으로 완성하는 과정을 가르칩니다.",
  },
  {
    title: "영상 콘텐츠 제작자",
    description: "프리미어와 애프터이펙트를 활용해 숏폼, 광고영상, 자기소개 영상과 AI 애니메이션을 제작합니다.",
  },
  {
    title: "실무 디자이너",
    description: "브랜딩, 지역 축제, 홍보물, 편집디자인과 패키지 등 실제 프로젝트 경험을 수업에 연결합니다.",
  },
  {
    title: "정체불명의 웹 제작자",
    description: "Google AI Studio에서 페이지를 만들고 GitHub에 올린 뒤 Vercel로 배포하는 방법까지 알려줍니다.",
  },
];

// 능력치 측정 결과 데이터
export const abilitiesData: Ability[] = [
  { name: "디자인 실무력", value: 92, description: "15년 이상의 디자인 실무 경험" },
  { name: "초보자 설명력", value: 95, description: "어려운 기능을 사람이 이해할 수 있는 말로 번역" },
  { name: "새로운 툴 적응력", value: 97, description: "일단 직접 눌러보고 수업에 적용" },
  { name: "수업자료 생성력", value: 99, description: "자료가 계속 늘어남" },
  { name: "AI 활용력", value: 94, description: "기획, 이미지, 영상, 웹까지 연결" },
  { name: "멀티태스킹", value: 96, description: "디자인하면서 홍보하고 상담도 함" },
  { name: "적당히 끝내기", value: 14, description: "수정할 부분이 계속 보임" },
  { name: "휴식 능력", value: 0, description: "측정 실패 (유효한 데이터를 찾을 수 없음)" },
];

// 스킬 목록 데이터 (마우스 호버/터치 시 툴팁 등으로 설명 출력)
export const skillCategories: SkillCategory[] = [
  {
    title: "Adobe 기본 장비",
    skills: [
      { name: "Photoshop", description: "이미지 리터칭, 합성, 상세페이지 제작 등 시각 디자인의 핵심 툴" },
      { name: "Illustrator", description: "벡터 로고, 브랜딩, 일러스트, 레이아웃 제작 툴" },
      { name: "InDesign", description: "출판물, 브로슈어, 포트폴리오 등 다중 페이지 편집 툴" },
      { name: "Premiere Pro", description: "컷 편집, 오디오 믹싱, 자막 제작 등 영상 콘텐츠 제작 툴" },
      { name: "After Effects", description: "모션 그래픽, 특수 효과, 인트로 영상 제작 등 고급 영상 툴" },
    ],
  },
  {
    title: "확장 장비",
    skills: [
      { name: "Figma", description: "UI/UX 기획 및 프로토타이핑, 협업 디자인 도구" },
      { name: "Gamma", description: "AI 기반 프레젠테이션 및 문서 초고속 자동 생성기" },
      { name: "CapCut", description: "빠르고 감각적인 모바일/PC 숏폼 영상 제작 편집기" },
      { name: "Google AI Studio", description: "Gemini API 활용 및 웹앱 아이디어 기획/설계 도구" },
      { name: "GitHub", description: "코드 버전 관리 및 웹 협업을 위한 필수 개발자용 플랫폼" },
      { name: "Vercel", description: "정적/동적 웹 어플리케이션 즉시 배포 및 호스팅 클라우드" },
    ],
  },
  {
    title: "AI 과몰입 모듈",
    skills: [
      { name: "ChatGPT", description: "커리큘럼 기획, 문구 작성, 코드 생성을 위한 AI 파트너" },
      { name: "Gemini", description: "구글의 다중모달 AI, 빠른 정보 검색 및 브레인스토밍 지원" },
      { name: "Google Flow", description: "구글의 이미지 생성 AI 및 프롬프트 기반 고품질 이미지 생성 도구" },
      { name: "Midjourney", description: "최상급 예술적 퀄리티를 자랑하는 드로잉 중심 AI 이미지 생성기" },
      { name: "Runway", description: "비디오 생성 및 모션 특수효과 제작을 위한 대표 비디오 AI" },
      { name: "Kling", description: "고품질 카메라 무브먼트와 물리 법칙을 반영한 실사급 비디오 생성 AI" },
      { name: "SUNO", description: "프롬프트 입력만으로 보컬과 멜로디를 자동 작곡하는 음악 AI" },
    ],
  },
  {
    title: "예상하지 못한 추가 기능",
    skills: [
      { name: "유튜브 채널 개설", description: "수강생들이 수업 후 본인의 영상을 게시할 공간 빌드 지원" },
      { name: "숏폼 콘텐츠 제작", description: "틱톡, 릴스, 쇼츠 등 모바일 맞춤 고효율 영상 제작" },
      { name: "AI 웹앱 기획", description: "실제 돌아가는 결과물을 만들기 위한 아이디어 프로토타이핑" },
      { name: "CBT 학습 프로그램 기획", description: "자격증 수강생을 위한 맞춤형 기출문제 은행 프로그램 설계" },
      { name: "교육과정 홍보", description: "온/오프라인 수강생 유치를 위한 고효율 브랜딩 및 콘텐츠 배포" },
      { name: "막걸리 브랜드 디자인", description: "지역 막걸리 패키지 및 브랜딩을 기획하고 디자인함" },
      { name: "식물 상태 분석", description: "과습인지 영양부족인지 이파리 하나로 완벽히 진단하는 취미 모듈" },
    ],
  },
];

// 주요 입력 명령어 및 가상 로그 데이터
export const systemCommands = [
  { user: "좀 더 트렌디하게", system: "디자인 수정 중..." },
  { user: "너무 심심한데?", system: "자극 수치 35% 증가" },
  { user: "누가 봐도 쉽게", system: "전문용어 제거 중..." },
  { user: "학생들이 진짜 할 수 있는 걸로", system: "실습 난이도를 다시 계산합니다." },
  { user: "다시 제대로", system: "전체 디자인을 처음부터 재구성합니다." },
];

// 프로젝트 사건 파일 데이터
export const projectItems: ProjectItem[] = [
  {
    id: "001",
    name: "지속가능광산 BI",
    type: "지역 브랜드 아이덴티티",
    content: "광주 광산구의 지속가능한 지역 가치를 하나의 브랜드 이미지 체계로 정리한 프로젝트",
    details: [
      "브랜드 방향 설정",
      "시각 아이덴티티 개발",
      "Illustrator 활용",
      "지역 이미지 시각화",
    ],
    tags: ["Branding", "Vector Design", "Local Project"],
    status: "처리 완료",
  },
  {
    id: "002",
    name: "지역 축제 디자인",
    type: "홍보 비주얼 & 페스티벌 디자인",
    content: "각 행사의 성격과 타깃에 맞는 메인 비주얼과 홍보 디자인 제작",
    details: [
      "양동통맥축제",
      "해남미남축제",
      "광주MBC 지오마라톤",
      "독서열차",
    ],
    tags: ["Festival Design", "Key Visual", "Core Design"],
    status: "생존 완료",
  },
  {
    id: "003",
    name: "기업 및 브랜드 홍보 디자인",
    type: "커머셜 홍보 & 편집디자인",
    content: "브랜드의 목적과 판매 환경에 맞춰 홍보물, 패키지, 상세페이지와 SNS 콘텐츠를 제작",
    details: [
      "삼성디지털프라자 판촉 디자인",
      "LG전자 SNS 콘텐츠",
      "건담샵 상세페이지 및 패키지",
      "천옥고 브랜딩",
      "하얀생활 세제 리뉴얼",
    ],
    tags: ["Commercial", "Package Design", "Detail Page"],
    status: "실무 데이터 확인됨",
  },
  {
    id: "004",
    name: "AI 숏폼 교육과정",
    type: "미디어 융합 교육 설계",
    content: "디자인 초보자가 AI 이미지 생성에서 끝나지 않고 실제 숏폼 영상까지 완성하도록 교육",
    details: [
      "ChatGPT 기획",
      "Google Flow 이미지 생성",
      "Photoshop 보정",
      "Premiere 편집",
      "YouTube 업로드",
    ],
    tags: ["AI Tools", "Video Production", "Curriculum Design"],
    status: "계속 업데이트 중",
  },
  {
    id: "005",
    name: "AI 학습 웹앱 및 CBT",
    type: "에듀테크 서비스 기획",
    content: "자격증 학습자가 반복적으로 문제를 풀고 합격 가능성을 높일 수 있도록 AI 기반 CBT 학습 도구를 기획",
    details: [
      "랜덤 문제 출제 기능",
      "문제 해설 및 오답 노트",
      "학습 통계 대시보드",
      "반응형 UI 설계",
      "Vercel 즉시 배포 가이드",
    ],
    tags: ["Web App", "UX/UI Planning", "EduTech"],
    status: "기능 개선 중",
  },
];

// 체감상 관심사 분석 (시스템 사용량) 데이터
export const systemUsageData = [
  { item: "디자인 교육", level: 95, status: "매우 많음" },
  { item: "생성형 AI", level: 88, status: "상당히 많음" },
  { item: "숏폼과 유튜브", level: 82, status: "계속 증가 중" },
  { item: "웹앱 제작", level: 78, status: "갑자기 증가" },
  { item: "인디자인", level: 70, status: "최근 업데이트됨" },
  { item: "식물", level: 65, status: "예상보다 많음" },
  { item: "인테리어", level: 50, status: "주기적으로 발생" },
  { item: "막걸리 브랜딩", level: 45, status: "가끔 매우 진지함" },
  { item: "“학생들이 쉽게 할 수 있어?”", level: 99, status: "거의 매일" },
];

// 수강생 실제 사용자 후기 데이터
export const reviewItems: ReviewItem[] = [
  {
    content: "포토샵을 처음 배웠는데 생각보다 따라갈 수 있었습니다.",
    author: "디자인 교육 수강생",
    status: "포토샵 공포증 완화",
  },
  {
    content: "AI로 이미지만 만드는 것이 아니라 포토샵으로 수정하는 방법까지 배워 좋았습니다.",
    author: "AI 콘텐츠 과정 수강생",
    status: "AI 결과물 수정 기능 해금",
  },
  {
    content: "설명을 여러 번 해주셔서 이해할 수 있었습니다.",
    author: "영상 편집 과정 수강생",
    status: "반복 설명 기능 정상 작동",
  },
  {
    content: "기능만 배우는 것이 아니라 실제 결과물을 만들 수 있어서 좋았습니다.",
    author: "직업훈련 수강생",
    status: "완성 경험 획득",
  },
];

// 패치노트 데이터
export const patchNoteData: PatchNoteItem[] = [
  {
    version: "v2026.07",
    updates: [
      "InDesign 교육 기능 추가",
      "AI 숏폼 및 광고 콘텐츠 과정 업데이트",
      "유튜브 채널 제작 교육 추가",
      "Google AI Studio 웹페이지 제작 기능 강화",
      "GitHub 및 Vercel 배포 기능 장착",
      "AI-POT CBT 시스템 개선",
      "식물 관리 데이터 지속 축적",
    ],
  },
  {
    version: "v2026.06",
    updates: [
      "생성형 AI 이미지 및 영상 수업 강화",
      "Photoshop, Illustrator, Premiere 통합 과정 운영",
      "AI 수업자료 대량 생성 기능 개선",
      "수강생 결과물 중심 수업 방식 강화",
    ],
  },
];

// 패치노트의 알려진 버그
export const knownBugs = [
  "일을 자꾸 추가함",
  "자료를 너무 자세히 만듦",
  "새로운 도구를 발견하면 기존 커리큘럼에 넣고 싶어 함",
  "쉬는 날에도 수업 아이디어가 떠오름",
  "“마지막 수정” 이후 수정이 추가될 수 있음",
];
