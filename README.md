# Quest 웹사이트

Quest(대학생금융투자연합동아리) 학회 홈페이지. 순수 HTML/CSS/JS로 만든
정적 사이트라 빌드 과정이 없고, GitHub Pages에 그대로 올리면 무료로 호스팅됩니다.

## 폴더 구조

```
quest-site/
├── index.html        홈
├── about.html         소개
├── curriculum.html    커리큘럼
├── activities.html    활동/프로젝트 갤러리
├── apply.html         지원하기(모집공고)
├── css/style.css       공용 스타일 (라이트/다크 모드 포함)
├── js/main.js          다크모드 토글 + 모바일 메뉴
└── README.md
```

## 배포 방법 (GitHub Organization 사용, 추천)

1. github.com에서 본인 계정으로 로그인한 상태로 우측 상단 `+` → **New organization** 클릭 → 무료(Free) 플랜 선택.
2. Organization 이름을 정합니다. 예: `Quest-club` (이 이름이 나중에 URL 후보에 영향을 줄 수 있으니 신중하게. `Quest`만 쓰면 이미 다른 계정이 선점했을 가능성이 높으니 미리 중복 확인).
3. Organization 안에서 **New repository** 클릭 → 저장소 이름을 정확히 `<organization이름>.github.io` 로 입력합니다.
   (예: Organization 이름이 `Quest-club`이면 저장소 이름은 `Quest-club.github.io`)
4. Public으로 생성.
5. 이 폴더 안의 모든 파일을 방금 만든 저장소에 업로드합니다.
   - GitHub 웹사이트에서 "Add file → Upload files"로 드래그해서 올려도 되고,
   - 로컬에 git이 설치되어 있다면 아래처럼 커맨드로도 가능합니다:
     ```bash
     cd quest-site
     git init
     git remote add origin https://github.com/<organization이름>/<organization이름>.github.io.git
     git add .
     git commit -m "Quest 웹사이트 초기 버전"
     git branch -M main
     git push -u origin main
     ```
6. 저장소의 **Settings → Pages**로 이동 → Source를 `Deploy from a branch`, Branch를 `main` / `/(root)`로 설정 → Save.
7. 몇 분 기다리면 `https://<organization이름>.github.io` 주소로 사이트가 열립니다.

## 배포 방법 (개인 계정에서 빠르게 시작하고 싶을 때)

Organization 없이 지금 바로 올리고 싶다면, 본인 개인 계정에 저장소 이름을 아무거나(`quest`, `quest-site` 등)
정해서 만들고 위와 동일하게 업로드한 뒤 Pages를 켜면 됩니다. 이 경우 주소는
`https://<본인아이디>.github.io/quest` 형태가 됩니다. 나중에 Organization으로 옮기고 싶으면
같은 파일을 새 저장소에 다시 올리기만 하면 되니 지금 급하면 이 방법으로 먼저 시작해도 무방합니다.

## 올리기 전에 채워야 할 부분

- `apply.html`: *이탤릭체 [대괄호]* 표시된 부분(지원 마감일, 지원서 링크, 문의처 등)을 실제 정보로 교체.
- `activities.html`: 1기 활동이 진행되면 카드 내용을 실제 리포트/발표자료 링크로 교체.
- 로고/파비콘: 현재는 텍스트 로고("Quest")만 있습니다. 이미지 로고가 있다면 `assets/` 폴더를 만들어
  넣고 각 HTML의 `<head>`에 `<link rel="icon" href="assets/favicon.png">` 등을 추가하세요.

## 커스텀 도메인 (선택, 비용 발생)

`.github.io` 서브도메인을 그대로 쓰면 완전히 무료입니다. 만약 나중에 자체 도메인을
연결하고 싶다면 도메인 구매 비용(연 1만~3만원대)이 별도로 들고, Settings → Pages →
Custom domain에서 연결하면 됩니다. 지금 단계에서는 필요하지 않습니다.
