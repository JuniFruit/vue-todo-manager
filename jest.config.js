module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFiles: ["./tests/setup.ts"],
  // verbose: true,
  // collectCoverage: false,
  // collectCoverageFrom: ["src/**/*.{ts,js,vue}"],
  // coveragePathIgnorePatterns: [
  //   "!src/main.ts",
  //   "!src/router.ts",
  //   "!src/plugins/*",
  //   "!src/types/*",
  //   "!src/model/*",
  //   "!*.d.ts",
  // ],

  // coverageReporters: ["html", "text", "lcov"],
  // rootDir: "./",
  // moduleFileExtensions: ["js", "json", "ts", "vue"],
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest",
  //   "^.+\\.jsx?$": "babel-jest",
  //   "^.+\\.js$": "babel-jest",
  //   "^.+\\.vue$": "vue-jest",
  // },
  // moduleNameMapper: {
  //   "^@/(.*)$": "<rootDir>/src/$1",
  // },
};
