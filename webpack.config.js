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
        ],
        map: ['./pages/map/script.ts'],

        panda: [
            './pages/panda/script.ts',

            './pages/panda/animal-info-section.css',
            './pages/panda/animal-list.css',
            './pages/panda/base.css',
            './pages/panda/card-button.css',
            './pages/panda/did-you-know-section.css',
            './pages/panda/header-button.css',
            './pages/panda/main-layout.css',
            './pages/panda/page-images.css',
            './pages/panda/popup.css',

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

            './pages/panda/responsive.css',

            './pages/panda/sidebar.css',
            './pages/panda/sidebar-header.css',
            './pages/panda/style.css',
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
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
            chunks: ['landing'],
        }),
        new HtmlWebpackPlugin({
            template: './pages/map/index.html',
            filename: 'map.html',
            chunks: ['map'],
        }),
        new HtmlWebpackPlugin({
            template: './pages/panda/index.html',
            filename: 'panda.html',
            chunks: ['panda'],
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
