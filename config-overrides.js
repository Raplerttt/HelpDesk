const path = require('path');

module.exports = {
  webpack: function (config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'src/components'),
    };
    return config;
  },
};
