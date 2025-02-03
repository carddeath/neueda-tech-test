import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import nextJest from "next/jest";

import { compilerOptions } from "./tsconfig.json";

const createNextJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  collectCoverage: false,
  coverageReporters: ["text", "lcov", "json", "html"],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),

  testEnvironment: "jsdom",

  roots: ["<rootDir>"],
  modulePaths: ["./"],

  //setupFilesAfterEnv: ["./jest.setup.ts"],

  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!*.{js,ts}",
    "!node_modules/**",
    "!.next/**",
  ],

  coveragePathIgnorePatterns: [],

  testTimeout: 10000,

  prettierPath: null,
};

const newConfig = createNextJestConfig(config);

export default newConfig;
