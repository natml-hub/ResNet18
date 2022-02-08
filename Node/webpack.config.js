const path = require("path");

// Create a UMD bundle for the browser, for loading the predictor in a <script>
// tag. This bundle will assume that the natml sdk is available at a global
// variable `natml`.
module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "resnet18.umd.js",
    library: {
      type: "umd",
      name: "ResNet18HubPredictor",
      export: "default",
    },
    globalObject: "this",
    path: path.resolve(__dirname, "dist"),
  },
  externals: {
    natml: "natml",
  },
};
