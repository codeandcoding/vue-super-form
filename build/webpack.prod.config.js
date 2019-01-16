const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.config');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: 'vue-super-form.js',
        library: 'vue-super-form',
        libraryTarget: 'umd'
    },
});

module.exports = webpackConfig