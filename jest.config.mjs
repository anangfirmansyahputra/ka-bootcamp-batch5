import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/**@type {import('jest').Config} */
const config = {
  modulePaths: ["<rootDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/*.type.ts",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
  ],
  testEnvironment: "jest-environment-jsdom",
};

export default createJestConfig(config);
