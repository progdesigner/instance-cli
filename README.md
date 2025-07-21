# Instance CLI

AI 모델들과 통신할 수 있는 Node.js 기반 CLI 도구입니다. Gemini, Claude, Codex 모델을 지원합니다.

## 설치

### 글로벌 설치 (권장)

```bash
npm install -g .
```

### 로컬 설치

```bash
npm install
```

## 사용법

### 1. API 키 설정

먼저 사용할 AI 모델의 API 키를 설정해야 합니다:

```bash
instance setup
```

또는 `.env` 파일을 직접 생성하여 API 키를 설정할 수 있습니다:

```env
GEMINI_API_KEY=your_gemini_api_key_here
CLAUDE_API_KEY=your_claude_api_key_here
CODEX_API_KEY=your_codex_api_key_here
```

### 2. 기본 사용법

#### 단일 프롬프트 전송

```bash
# Gemini 사용 (기본값)
instance chat -p "안녕하세요, 오늘 날씨는 어때요?"

# 특정 모델 지정
instance chat -m claude -p "파이썬으로 간단한 계산기 만들기"
instance chat -m codex -p "JavaScript 배열 정렬 방법"
```

#### 대화형 모드

```bash
# 대화형 모드로 실행
instance chat -i

# 특정 모델로 대화형 모드 실행
instance chat -m claude -i
```

### 3. 명령어 옵션

- `-m, --model <model>`: 사용할 AI 모델 (gemini, claude, codex)
- `-p, --prompt <prompt>`: 전송할 프롬프트 텍스트
- `-i, --interactive`: 대화형 모드로 실행
- `--help`: 도움말 표시
- `--version`: 버전 정보 표시

## 지원하는 AI 모델

### 1. Gemini (Google)
- **API**: Google Generative AI
- **모델**: gemini-pro
- **무료 티어**: 있음
- **설정**: [Google AI Studio](https://makersuite.google.com/app/apikey)에서 API 키 발급

### 2. Claude (Anthropic)
- **API**: Anthropic Claude API
- **모델**: claude-3-sonnet-20240229
- **무료 티어**: 제한적
- **설정**: [Anthropic Console](https://console.anthropic.com/)에서 API 키 발급

### 3. Codex (OpenAI)
- **API**: OpenAI API
- **모델**: gpt-4
- **무료 티어**: 제한적
- **설정**: [OpenAI Platform](https://platform.openai.com/api-keys)에서 API 키 발급

## 예제

```bash
# 간단한 질문
instance chat -p "JavaScript에서 Promise란 무엇인가요?"

# 코드 생성 요청
instance chat -m claude -p "React로 간단한 할일 목록 앱을 만들어줘"

# 대화형 모드
instance chat -i
```

## 개발

### 의존성 설치

```bash
npm install
```

### 로컬 실행

```bash
npm start
```

## 라이선스

MIT License

## 기여

버그 리포트나 기능 제안은 이슈를 통해 해주세요. 