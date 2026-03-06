const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        landing: [
            './pages/landing/script.ts',

            './pages/landing/style.css',
            './pages/landing/banner.css',
            './pages/landing/section-description.css',
            './pages/landing/donation.css',
            './pages/landing/section-animals-cards.css',
            './pages/landing/section-pay-and-feed.css',
            './pages/landing/section-feedback.css',
            './pages/landing/section-animal-care.css',
            './pages/landing/section-footer.css',
            './pages/shared-resources/styles/navigation.css',
            './pages/shared-resources/styles/grid-layout.css',
            './pages/shared-resources/styles/variables.css',
            './pages/shared-resources/styles/shared-classes.css',
            './pages/shared-resources/styles/reset.css',
            './pages/shared-resources/styles/flex-layout.css',
            './pages/shared-resources/styles/buttons.css',
            './pages/landing/animal-card.css',
            './pages/landing/buttons.css',
            './pages/panda/popup.css',
        ], // take individual pages ts file separatly, because on each page we need separate js bundle
        map: ['./pages/map/script.ts'],
    },
    output: {
        filename: '[name].bundle.js', // in the [name] will be landing, panda and so on from the entry key
        path: path.resolve(__dirname, 'dist'), // all of them will be passed in the dist folder
        clean: true,
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }, // here use the "ts-loader" to compile .ts files into javascript files
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }, // load css files into the one css file
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
        new HtmlWebpackPlugin({
            template: './pages/map/index.html',
            filename: 'map.html',
            chunks: ['map'],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new ESLintPlugin({ extensions: ['ts'] }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'assets',
                    to: 'assets',
                },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
        open: '/landing.html',
        hot: true,
        watchFiles: ['./pages/**/*.html'],
    },
};
