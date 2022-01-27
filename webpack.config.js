const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {
    const isProd = argv.mode === 'development'
    const isDev = !isProd

    const filename = ext =>  isProd?`[name].[contenthash].bundle.${ext}`:`[name].bundle.${ext}`

    return {
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: './index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename:filename('js'),
            clean: true
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        devServer: {
            port: 3000,
            open: true,
            // hot: true,
            watchFiles: './'
        },
        plugins: [
            // new ESLintPlugin(),
            new HtmlWebpackPlugin({
                template: "./index.html"
            }),
            new FaviconsWebpackPlugin('./favicon.ico'),
            new MiniCssExtractPlugin({filename: filename('css')})
        ]
    }
}