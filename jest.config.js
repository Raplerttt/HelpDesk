module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // This allows axios to be transformed by Babel
  ],
};
