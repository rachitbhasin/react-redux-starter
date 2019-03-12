const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

// HTML
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});

// css
const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
    filename: '[name].bundle.[hash:10].css',
    allChunks: true
});

module.exports = {
    mode: 'development',
    entry: ['./src/js/index.js','./src/scss/index.scss'],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.[hash:10].js",
        publicPath: '/',
        sourceMapFilename: '[name].[hash:10].map'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(eot|[ot]tf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    devServer: {
        port: 8000,
        historyApiFallback: { htmlAcceptHeaders:['text/css', '*/*'], index: '/' },
        hot: true
    },
    plugins: [
        HtmlWebpackPluginConfig,
        MiniCssExtractPluginConfig,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    optimization: {
        namedModules: true, // NamedModulesPlugin()
    }
};
