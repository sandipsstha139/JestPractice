module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.js"],
  // estTimeout: 10000,
};
