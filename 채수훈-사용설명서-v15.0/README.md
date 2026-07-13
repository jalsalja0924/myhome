# 채수훈 사용설명서 v15.0

디자인 실무와 생성형 AI, 영상 제작, 웹 배포를 초보자의 언어로 유머러스하고 깊이 있게 가르치는 디자인 강사 **채수훈**의 B급 감성 반응형 개인 브랜딩 웹사이트입니다. 

‘정체불명의 전자제품 사용설명서 + RPG 캐릭터 정보창 + 고장 난 AI 연구소’ 콘셉트를 차용하여 세련되면서도 코믹하고 전문적인 레이아웃을 제공합니다.

---

## 1. 프로젝트 실행 방법

프로젝트를 실행하려면 개발 환경(Node.js v18 이상 권장)에서 다음 명령어를 차례대로 터미널에 입력하십시오.

```bash
# 의존성 패키지 설치
npm install

# 개발용 로컬 서버 실행 (포트 3000번 등 실행)
npm run dev
```

---

## 2. 빌드 및 배포 미리보기 확인 방법

프로젝트가 프로덕션에 적합하게 에러 없이 번들링 되는지 검증하고 미리 보려면 아래 명령어를 실행합니다.

```bash
# 프로덕션 빌드 (dist/ 폴더 생성)
npm run build

# 빌드된 정적 파일 로컬 실행 및 확인
npm run preview
```

---

## 3. GitHub 업로드 방법

웹사이트 소스 코드를 본인의 개인 GitHub 저장소에 업로드하려면 다음 단계를 진행하십시오.

1. **GitHub 저장소 생성**: GitHub 웹사이트에 로그인한 후, 우측 상단의 `New` 버튼을 눌러 새로운 저장소(Repository)를 생성합니다. (이름 예: `chae-soo-hoon-manual`)
2. **로컬 터미널 연동**:
   ```bash
   # 로컬 Git 초기화
   git init

   # 모든 소스 파일 추가
   git add .

   # 최초 커밋 진행
   git commit -m "feat: 채수훈 사용설명서 v15.0 출시 및 기능 완료"

   # 기본 브랜치 지정
   git branch -M main

   # 원격 저장소 주소(본인 GitHub 주소) 연결
   git remote add origin https://github.com/사용자이름/저장소이름.git

   # 원격 저장소로 업로드
   git push -u origin main
   ```

---

## 4. Vercel 정적 배포 방법

본 프로젝트는 백엔드, API 키, 외부 데이터베이스가 필요 없는 **완전 정적 SPA 방식**으로 동작하므로 Vercel을 통해 10초 내로 배포가 완료됩니다.

1. [Vercel](https://vercel.com/) 홈페이지에 로그인합니다. (GitHub 계정 연동 권장)
2. `Add New...` &gt; `Project` 버튼을 누르고 위에서 생성한 **GitHub 저장소**를 가져옵니다(`Import`).
3. 배포 설정 영역에서 다음과 같이 구성이 채워져 있는지 확인합니다:
   - **Framework Preset**: `Vite` (자동 감지됨)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. 하단의 `Deploy` 버튼을 클릭하면 수초 내에 안정적으로 무료 호스팅 도메인으로 배포가 완료됩니다.

---

## 5. 개인정보 및 텍스트 수정 위치

초보자나 비개발자분들도 소스 코드를 쉽게 편집할 수 있도록 모든 데이터 소스를 한 파일에 응축했습니다.

- **수정 대상 파일**: `/src/data.ts`
- **수정 가능한 위치**:
  - **기본 인적 사항 (이름, 이메일, 전화번호, 지역)**: `contactInformation` 객체의 값을 원하는 텍스트로 변경하십시오.
  - **프로젝트 목록 (사건 파일)**: `projectItems` 배열에서 사건 번호별 이름, 유형, 세부 내역, 상태 텍스트를 수정하거나 추가할 수 있습니다.
  - **수강생 후기**: `reviewItems` 배열에서 후기 인용문, 작성자, 스탬프 상태 텍스트를 업데이트하십시오.
  - **능력치 수치 및 스킬 목록**: `abilitiesData` 및 `skillCategories` 배열을 수정하여 강사/개발자의 스탯과 툴팁 설명을 원하는 대로 변경할 수 있습니다.

---

## 6. 이미지 추가 방법

현재 버전에서는 외부 깨진 이미지 링크로 인한 엑스박스(X-Box) 오류와 빌드 시점의 경로 오류를 차단하기 위해 **인라인 SVG 및 CSS 추상화 기술**로 기하학적인 카드 그래픽 썸네일을 처리하고 있습니다.

만약 나중에 실제 디자인 작업물이나 캡처 사진을 업로드하고 싶다면 아래 단계를 따르십시오:

1. 넣고 싶은 이미지 파일(예: `project01.jpg`, `project02.png`)을 `/public/` 폴더에 넣습니다. (Vite는 public 폴더 내의 에셋을 빌드 후 루트 경로에 매핑시킵니다.)
2. `/src/components/UIComponents.tsx` 파일에서 `ProjectThumbnail` 컴포넌트의 각 `case`별 반환 코드를 다음과 같이 교체합니다:
   ```tsx
   // 수정 예시
   case "001":
     return (
       <div className="w-full h-40 overflow-hidden border-b border-brand-yellow/20">
         <img 
           src="/project01.jpg" 
           alt="지속가능광산 BI" 
           className="w-full h-full object-cover" 
           referrerPolicy="no-referrer"
         />
       </div>
     );
   ```

---

## 7. 배포 오류가 발생했을 때 확인할 자가진단 항목

배포 진행 중에 에러가 나타나면 아래 리스트를 확인하여 손쉽게 해결하십시오.

- [ ] **로컬 빌드 확인**: 로컬 컴퓨터에서 `npm run build` 명령어가 빨간 에러 없이 녹색 `dist` 폴더를 문제없이 구워내는지 검토합니다.
- [ ] **파일명 대소문자 확인**: 리눅스/Vercel 서버는 대소문자를 엄격히 구분합니다. 예를 들어 `import { Header } from "./components/Header"`라고 적었는데 폴더의 실주소가 `header.tsx` 처럼 대소문자가 서로 다르지 않은지 점검합니다.
- [ ] **빈 링크/잘못된 경로 배포**: 소스 코드 전체에 존재하지 않는 `.png`나 `.jpg` 주소, 혹은 동작하지 않는 빈 해시태그(`#`) 버튼이 남아있는지 확인합니다.
- [ ] **Vercel 설정 체크**: Vercel의 빌드 명령어가 `npm run build`, 출력 디렉터리 경로가 `dist`로 올바르게 설정되어 있는지 검사합니다. (본 레포지토리는 Vite 표준 스펙을 그대로 준수하므로 기본 설정만으로 안전합니다.)
