const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'production',
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/lib',
        filename: "vue-super-form.js",
        library: "vue-super-form",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname),
            path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.vue'],
        alias: {
            src: path.resolve(__dirname, 'src'),
            inputs: path.resolve(__dirname, 'src/inputs')
        },
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
