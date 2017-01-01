const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const pathMap = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    publicPath: '/'
};

const config = {
    entry: {
        app: pathMap.src + '/index',
        vendor: [
            'react',
            'react-router',
            'react-dom',
            'rx'
        ]
    },
    output: {
        filename: 'bundles/[name].[chunkhash:8].js',
        chunkFilename: 'modules/[id].[name].[chunkhash:8].js',
        path: pathMap.dist,
        publicPath: pathMap.publicPath,
        pathinfo: true
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                include: pathMap.src,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    babelrc: false,
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                // include: pathMap.src,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
            }
        ],
        // noParse: [
            // /weui/
        // ]
    },
    resolve: {
        modulesDirectories: [
            'node_modules',
            'src'
        ],
        alias: {
            weui: path.join(__dirname, 'node_modules/weui/dist/style/weui.css')
        },
        extensions: ['', '.js', '.jsx', '.css', '.scss', '.json']
    },
    cache: true,
    devtool: 'source-map',
    postcss: [
        require('autoprefixer')({
            browsers: [
                '> 1%',
                'Last 5 versions'
            ]
        })
    ],
    plugins: [
        new ExtractTextPlugin('bundles/style.[contenthash:8].css', {
            allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactRouter: 'react-router',
            ReactDOM: 'react-dom',
            Rx: 'rx'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'bundles/vendor.js',
            minChunks: Infinity
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new CleanWebpackPlugin(['dist', 'build'], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
}

config.devServer = {
    inline: true,
    colors: true,
    host: '0.0.0.0',
    progress: true,
    port: 8080,
    historyApiFallback: true
}

module.exports = config;