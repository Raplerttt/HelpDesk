module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest", // Untuk menggunakan Babel untuk transformasi file JS/JSX
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)", // Agar Jest tetap meng-transform kode dari Axios
    ],
  };
  