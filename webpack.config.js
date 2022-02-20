module.exports = {
  entry: `${__dirname}/main.js`,
  mode: "development",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
  },
  resolve: {
    modules: ["node_modules"],
  },
  target: "node",
};
