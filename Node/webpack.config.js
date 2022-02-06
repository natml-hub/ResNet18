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
    // make the predictor add its class to the existing natml global, while
    // still being a umd bundle (as opposed to using webpack's assign-properties
    // type), to ensure it works with unpkg. This leads to a little less global
    // pollution, and a little better DX (without it, some things are looked up
    // on the natml global, while others aren't, which is confusing). The
    // downside of this is that the predictor can't be loaded in parallel with
    // the natml library, but we don't care. This umd setup is for people who
    // want something simple; it's not for optimal performance.
    globalObject: "natml",
    path: path.resolve(__dirname, "dist"),
  },
  externals: {
    natml: "natml",
  },
};
