const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
    mode: 'development',
    entry:
    {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
        },
      },
    devtool: 'source-map',
    devServer: {
        static:
        {
            directory: path.resolve(__dirname, 'dist')
        },
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp"
        },
        port: 8082,
        open: true,
        hot: true,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                ],

            },
            { //https://webpack.js.org/loaders/css-loader/
                test: /\.css$/, 
                loader: "css-loader",
                options: {
                    url: false,
                }
            },
            {
                test: /\.(png|jpg|jpeg|webp)$/i,
                type: 'asset/resource'

            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin(
            {
                filename: "index.html",
                template: 'src/templates/index.html',
                favicon: "./src/assets/img/favicon.ico",
                inject: 'body',
            }
        ),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/assets/img/academyLogo.webp", to: ""},
                { from: "src/assets/img/OboCode.png", to: ""},
                { from: "src/SEO", to: ""},
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name][contenthash].css',
            
        }),
    ]
};

