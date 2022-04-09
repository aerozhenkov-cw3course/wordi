const path = require('path');
const http = require('http');

const nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        entry: './src/webapp/index.ts',
        output: {
            filename: "webapp.bundle.js",
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        // externals: [nodeExternals()],
        target: 'node',
        module: {
            rules: [
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                // { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }
                { test: /\.tsx?$/, loader: "ts-loader"}
            ]
        }
    },
    {
        entry: './src/translate/index.ts',
        output: {
            filename: "translate.bundle.js",
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        // externals: [nodeExternals()],
        target: 'node',
        module: {
            rules: [
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                // { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }
                { test: /\.tsx?$/, loader: "ts-loader"}
            ]
        }
    }
];
