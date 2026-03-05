const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        landing: './pages/landing/script.ts', // take individual pages ts file separatly, because on each page we need separate js bundle
        // panda: './pages/panda/script.ts',
        map: './pages/map/script.ts',
    },
    output: {
        filename: '[name].bundle.js', // in the [name] will be landing, panda and so on from the entry key
        path: path.resolve(__dirname, 'dist'), // all of them will be passed in the dist folder
        clean: true,
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }, // here use the "ts-loader" to compile .ts files into javascript files
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // load css files into the one css file
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './pages/landing/index.html',
            filename: 'landing.html',
            chunks: ['landing'], // it is important to tell webpack, in the landing.html pass only the landing.bundle.js, without it all .bundle.js will be inthe all html files not needed
        }),
        // new HtmlWebpackPlugin({
        //     template: './pages/panda/index.html',
        //     filename: 'panda.html',
        //     chunks: ['panda'], // pass panda.bundle.js in the pande/index.html
        // }),
        new HtmlWebpackPlugin({
            template: './pages/map/index.html',
            filename: 'map.html', // output file name
            chunks: ['map'], // pass panda.bundle.js in the pande/index.html
        }),
        new ESLintPlugin({ extensions: ['ts'] }),
    ],
    devServer: {
        // it is just dev server so exists only during development, we will use dist folder for deployment
        // dist folder will be deployed only
        static: './dist',
        open: '/landing.html',
    },
};
