module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js"
    },
    watch: true,
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    }
}