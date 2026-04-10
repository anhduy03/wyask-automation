const common = [
  'src/tests/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require src/tests/**/*.ts', // Load step definitions
  '--format progress' // Load custom formatter
].join(' ');
/test/
module.exports = {
  default: common,
};