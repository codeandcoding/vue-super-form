const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.config');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    entry: {
        app: './example/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: '[name].js',
        publicPath: '/',
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 3000,
        hot: true,
		historyApiFallback: true,
        headers: { "Access-Control-Allow-Origin": "*" },
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },  
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './example/index.html',
            inject: true
        }),
    ]
});

module.exports = webpackConfig