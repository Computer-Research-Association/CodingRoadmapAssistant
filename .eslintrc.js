module.exports = {
  env: {
    browser: true, // 브라우저 환경 지원
    es2021: true, // 최신 ECMAScript 기능 사용
    node: true, // Node.js 환경 지원
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // TypeScript ESLint 권장 설정
    "plugin:prettier/recommended", // Prettier와 ESLint 통합
  ],
  parser: "@typescript-eslint/parser", // TypeScript 코드 파서
  parserOptions: {
    ecmaVersion: 2022, // ECMAScript 최신 버전
    sourceType: "module", // ESM 지원
  },
  plugins: ["@typescript-eslint", "prettier"], // 필요한 ESLint 플러그인
  rules: {
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "import",
        format: ["camelCase", "PascalCase"], // import 네이밍 규칙
      },
    ],
    curly: "warn", // 중괄호 사용 권고
    eqeqeq: "warn", // 엄격한 동등 비교 권고
    "no-throw-literal": "warn", // 리터럴 throw 방지
    semi: "warn", // 세미콜론 사용 권고
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, // 문자열은 작은따옴표 사용
        semi: false, // 세미콜론 사용
      },
    ],
  },
};
