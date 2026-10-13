# TETH 디자인 폴리싱 인수인계

마지막 업데이트: 2026-10-13
(VOILA는 별도 인수인계 문서로 분리됨. 지금은 TETH가 우선, 마감 ASAP)

## 개요
- TETH = AI 자동매매 웹앱. 대표(Black Ethereum)가 VOILA보다 먼저 요청. 기획·흐름·기능 범위는 확정 → **디자인만** 다듬기
- 기준: "슬지가 보고 소액 테스트해보고 싶어지면 통과". 모바일 1순위, PC 2순위
- 지금 HTML 사이트는 **프로토타입**. 실제 서비스는 개발자가 Flutter(앱)·React(웹)로 새로 만듦 → 내가 정한 값(색·글자·간격·효과)이 기준서가 됨
- 원본 사이트 디자인 기준 문서: 저장소의 `DESIGN_PROMPT.md` (대표 확정본, 바탕 #000 등). 내 변경이 이와 다른 부분은 의도한 것

## 저장소와 링크
- 원본: https://github.com/aresjoo/tesia-lab (내 계정 IOI-Yan 쓰기 권한 있음, main = 실제 공개 사이트)
- **내 포크**: https://github.com/IOI-Yan/tesia-lab
  - `design-polish` 브랜치: 작업 코드 (반영 요청 PR은 아직 안 보냄)
  - `design-notes` 브랜치: TETH 작업 메모 3개 (EDIT_NOTES 수정 기록 / COLOR_NOTES 색 / SCREEN_IDS 화면 ID) + 모바일 화면 PDF + 확인용 페이지 `_demo.html` + 미리보기 서버 `serve.ps1`
- **공유 링크(누구나 열람)**: https://ioi-yan.github.io/tesia-lab/ — design-polish에 올리면 1~2분 뒤 자동 반영
- 화면 ID 캡처(AS-IS): TETH Figma 권한이 없어 **임시로** VOILA Figma 파일 안 "AS-IS" 프레임에 둠 https://www.figma.com/design/80IPAc7yRP0pPoCyza1UJE/Volia?node-id=2352-509 (VOILA 작업과는 무관)

## 작업할 때 열어두는 것
- 로컬 미리보기(내 수정본): http://localhost:8080/
- **화면 찾아보기: http://localhost:8080/_screens.html** — 화면 모아보기 PDF와 같은 묶음·같은 이름으로 212개를 모아 둔 곳. 플로우를 처음부터 타지 않고 고치려는 화면을 바로 띄운다. **바뀐 내용 알림**: index.html이나 _screens.html이 바뀌면 아래에 "반영하기" 버튼이 뜸 → 누르면 확실히 최신으로 열림(저절로 깜빡이지 않음, Ctrl+F5 필요 없음, serve.ps1 최신본 필요)
- 원본 사이트(수정 전 비교용): https://aresjoo.github.io/tesia-lab/
- 공유용 수정본: https://ioi-yan.github.io/tesia-lab/
- 모바일 화면 모아보기 PDF: `design-notes` 브랜치의 `TETH 화면 모아보기 (모바일).pdf` (원본은 집 PC `Downloads\Telegram Desktop`)

## 다른 PC에서 이어서 하기
1. 저장소 받기: `git clone https://github.com/IOI-Yan/tesia-lab.git` → `git checkout design-polish`
2. 원본 연결: `git remote add origin-up https://github.com/aresjoo/tesia-lab.git` (원본 최신 내용 확인용)
3. 메모 받기: `git fetch origin design-notes` 후 별도 폴더에 체크아웃하거나 `git show origin/design-notes:EDIT_NOTES.md`로 확인
4. 미리보기: PC에 Python/Node가 없으면 PowerShell로 간단 서버를 띄움(Claude에게 "TETH 로컬 미리보기 켜줘"). **캐시 끄기(Cache-Control: no-store) 필수** — 안 그러면 예전 화면이 보여 혼란
5. 확인용 페이지: design-notes 브랜치의 `_screens.html` 을 tesia-lab 폴더 맨 위(index.html 옆)에 복사 → `.git/info/exclude` 에 `_screens.html` 한 줄 추가(저장소에 안 올라가게) → http://localhost:8080/_screens.html
   `git show origin/design-notes:_screens.html > _screens.html` 한 줄이면 된다. 글꼴 말고는 바깥에 기대는 것이 없어 파일 하나만 있으면 된다.
   미리보기 서버 파일 `serve.ps1` 도 design-notes 브랜치에 있음: `powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1 -Root <tesia-lab 폴더> -Port 8080`
   (예전 `_demo.html` 도 아직 남아 있지만 묶음이 PDF와 다르다. `_screens.html` 을 쓴다)
6. 작업 후: design-polish에 커밋·푸시 → 공유 링크 자동 반영. 메모도 design-notes 브랜치에 갱신

## 정한 규칙 (요약, 자세한 값은 메모 파일)
- 바탕 `#101113`, 메인색 `#00FEFF`, 글꼴 **Pretendard** (버튼 글자 세로 정렬 문제 해결)
- 주 버튼: 메인색 배경 + `#101113` 글자, 호버는 밝게 `#5CFEFF` (모든 버튼 호버 = 한 단계 밝게)
- 회색(보조) 버튼: 바탕 단계별로 한 단계 밝게 — 페이지·카드 위 `#313339`(호버 `#3A3D44`), 떠 있는 창 위 `#45484F`(호버 `#50535B`). 한 카드에 강조 버튼은 하나만
- 회색 계열(푸른 회색): 카드 `#17181B`, 칸·세그먼트 바탕 `#25272C`, 떠 있는 창 `#26282D`. 누런 회색 `#212121`은 전부 교체함
- 박스: 채운 박스 `#17181B` + 테두리 흰색 6% + 모서리 16px (토스증권 패널 방식)
- 손익 색: 수익 `#2FB98A`, 손실 `#F0566A` (+면 초록, −면 빨강 — 수익률 숫자는 모두 이 규칙)
- 상태 색: 답이 필요한 곳 = 메인색 점이 숨 쉼, 대기 = 샌드 골드 `#EBCB8B`, 완료 = 메인색
- **시그니처 효과 "스르륵 나타나기"**: 짧은 문구가 단어별로 흐림 → 선명(0.8초, 0.11초 간격). 홈 인사말·"조건 저장됨"에 씀. 코드 `tethIn('문구')`. 긴 문단·숫자에는 안 씀
- **열고 닫기는 모두 스르륵**: 펼치기는 높이 0.3초로 부드럽게, 내용은 서서히. 사이트의 모든 펼치기(details)에 자동 적용. 닫히는 창·카드도 스르륵 사라짐
- **세그먼트 고른 칸은 미끄러지듯 이동**(0.26초), **팝업 바탕은 모두 #1B1C1F**, **밑줄 글자 단추 #CFD2D6 → 호버 #E3E5EA**, **팝업은 닫힐 때도 스르륵**
- **뒤로 단추 페이지 여백(PC)**: 맨 위 = 화면 높이 9%(64~128px), 뒤로 단추 ↔ 내용 = 4%(24~56px). 뒤로 단추는 화살표+제목 알약
- 아이콘: **Lucide**, 선 1.6 (글자 ✕ ↑ 👁 쓰지 않기, 직접 그리지 않기)
- 글자 크기: .5px 금지(내림), 1px 차이처럼 애매한 크기 금지 → 같은 크기 + 굵기로 구분하거나 확실히 다르게
- 메모는 **최종 값만** 기록. 화면은 화면 ID(CO/CH/TR/MK/BT/EX/PL)로 부름

## 진행 현황 (2026-10-13)

### 10/12~13에 한 것 (design-polish)
- `ce59aed` 표 위아래 여백 20px, 메뉴 단추 스크롤해도 고정, 턴 사이 간격 PC 36px / 모바일 32px
- `37388c1` 대화 간격(질문→답변 24px, 글→아이콘 18px), 토스트 색·선·그림자, 피드백 창 여백과 호버, 생각 중 점 세 개 복구
- `ecae9f1` 사용량 배너 전체, 답변 아이콘 줄 32px, 햄버거 호버
- `05340d9` 전략 카드 표와 오류 카드 단추
- `f798a65` 중성 회색 → 푸른 회색 전부 교체
- `99f3afd` 가입 창, 시세 카드, 안 쓰는 라이트 테마 제거
- `a2bf312` 입력창 여백·단추, 가입 창 라벨 포커스 색

### 이번에 알게 된 것 (다시 헤매지 않게)
- **스레드 상자가 둘이다**: 대화는 `#g-thread`(gap 16px), 문서(전략·백테스트·리포트 등 아티팩트 화면)는 `#g-doc-thread`(gap 10px). 간격 규칙은 양쪽 다 손봐야 한다
- **표는 `.tblwrap` 없이 그려지는 경로가 있다**. 감싸개에 여백을 걸면 그 화면에서는 안 먹는다 → 여백은 `.g-amsg table` 자신에게
- **`.thinking .tdots`는 `.g-think` 안에서 안 걸린다**. 점 세 개가 0x0 투명으로 보이지 않던 원인
- **`body.g-dark .modal div{color:inherit}`** 가 떠 있는 창 안 div 색을 전부 덮는다. 창 안에서 글자색을 줄 때는 `body.g-dark .modal .클래스` 로 다시 써야 한다
- **밝은 테마용 변수가 남아 있다**: `var(--text)`, `var(--surface)`, `var(--shadow-2)`. 어두운 화면에서 뒤집어 쓰면 바탕과 같은 색이 나온다(토스트가 그랬다)
- **`.g-amsg` 등장 애니메이션(`gFadeUp`)** 때문에 그린 직후 재면 8px 밀려 나온다. 간격을 잴 때는 애니메이션이 끝난 뒤에
- 화면이 안 바뀌어 보이면 **탭이 옛 파일인지 먼저 확인**(Ctrl+Shift+R). 서버는 `Cache-Control: no-store` 를 보낸다

### 예전 현황 (2026-10-11)
- 완료: 전체 공통(바탕·글꼴·버튼·아이콘·툴팁·사이드바·푸터, `#212121` 회색 교체), 홈 PC·모바일 개편, 채팅(질문 카드·검증 결과·리포트·예약 카드 상태 3종·바뀔 조건 카드), 로그인·가입 창, **백테스트 준비·돌리는 중·결과 화면 전체**(토스증권식 박스, 세그먼트, 정렬 목록, 판단 기록·거래 내역·월별 수익률·자세한 지표)
- 확인용 페이지: http://localhost:8080/_demo.html (design-notes 브랜치에 사본 있음, design-polish에는 안 올림) — AI·가격 자료 없이 화면을 띄우는 버튼 모음. 백테스트 결과 화면은 가격 자료가 headless에서 안 불러와져 비슷한 내용으로 만들어 띄움
- 남은 후보: 공통 버튼 세트 정리(지금은 화면마다 버튼 스타일이 따로 약 250가지), 메인색 `#00F0FF` 남은 8곳 통일 여부, 나머지 화면(AI 트레이딩·전략 복사·거래소 연결·플랜) 순서대로 폴리싱. `#212121` 교체로 바뀐 다른 화면(플랜·터미널·인사이트·연구 기록·설정) 눈으로 확인 필요
- 대표님께 확인할 것: 홈 푸터 청록 배경의 의도, 모바일 홈 종목 선택 순서 변경(기능 → 종목), 모바일 백테스트 준비 단계에서 차트가 숨겨진 것(원래 설계)이 초보자에게 괜찮은지

## 작업 방식 (중요)
- **판단은 내가 먼저**: Claude가 먼저 문제 목록을 만들거나 앞서가지 않기. 내가 보고 말한 것만 고치기
- 고친 뒤에는 반드시 **실제 화면에서 측정해 확인**하고 말하기 (확인 없이 "됐다"고 하지 않기)
- 모바일 레이아웃 변경은 겹침·스크롤까지 확인
