module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy", // Mock styles
    "\\.svg$": "<rootDir>/src/__mocks__/svgMock.js", // Mock SVG imports
  },

  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Include all source files
    '!src/**/*.d.ts',          // Exclude TypeScript declaration files
    '!src/setupTests.ts',      // Exclude setup files
  ],
  coverageDirectory: 'coverage', // Directory where coverage reports will be saved
};
