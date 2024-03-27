module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: [
      "<rootDir>/build/"
    ],
    transform: {
      "^.+\\.(js|ts)$": "babel-jest"
    },
  };