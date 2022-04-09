const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/front/index.ts',
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, '..', '..', 'dist', 'static')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            // { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }
            { test: /\.tsx?$/, loader: "ts-loader"}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
